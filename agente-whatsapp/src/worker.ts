// Punto de entrada en Cloudflare Workers: recibe el webhook y reparte cada
// mensaje al Durable Object de su chat. La lógica vive en conversacion.ts,
// agente.ts y control.ts, que se prueban sin Cloudflare.

import Anthropic from "@anthropic-ai/sdk";
import { DurableObject } from "cloudflare:workers";
import { crearAvisador } from "./avisos";
import { leerConfig, type Env } from "./config";
import { Control, type Registro } from "./control";
import { Conversacion } from "./conversacion";
import { crearTienda } from "./tienda";
import { extraerEventos, firmaValida, type Evento } from "./webhook";
import { crearEnviador } from "./whatsapp";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const config = leerConfig(env);

    if (url.pathname === "/salud") {
      return Response.json({ ok: true, modo: config.modo, proveedor: config.proveedor });
    }

    if (url.pathname === "/estado" && request.method === "GET") {
      if (request.headers.get("authorization") !== `Bearer ${env.WEBHOOK_SECRET}`) {
        return new Response("No autorizado", { status: 401 });
      }
      return Response.json(await control(env).resumen(Date.now()));
    }

    if (url.pathname !== "/webhook") return new Response("No encontrado", { status: 404 });

    // Verificación del webhook de Meta (solo si algún día se conecta directo).
    if (request.method === "GET") {
      const ok =
        config.proveedor === "meta" &&
        !!env.META_VERIFY_TOKEN &&
        url.searchParams.get("hub.mode") === "subscribe" &&
        url.searchParams.get("hub.verify_token") === env.META_VERIFY_TOKEN;
      return ok
        ? new Response(url.searchParams.get("hub.challenge") ?? "", { status: 200 })
        : new Response("Prohibido", { status: 403 });
    }

    if (request.method !== "POST") return new Response("Método no permitido", { status: 405 });

    const cuerpo = await request.arrayBuffer();
    if (!(await firmaValida(config.proveedor, env.WEBHOOK_SECRET, request.headers, cuerpo))) {
      return new Response("Firma inválida", { status: 401 });
    }
    let payload: unknown;
    try {
      payload = JSON.parse(new TextDecoder().decode(cuerpo));
    } catch {
      return new Response("JSON inválido", { status: 400 });
    }

    const ahora = Date.now();
    const eventos = extraerEventos(payload);
    // Un error aquí devuelve 500 y Kapso reintenta; los duplicados se descartan por id.
    await Promise.all(
      eventos.map((ev) => conversacion(env, ev.chat).recibir(ev, ahora)),
    );
    return new Response("ok", { status: 200 });
  },
};

function conversacion(env: Env, chat: string) {
  const ns = env.CONVERSACION as DurableObjectNamespace<ConversacionDO>;
  return ns.get(ns.idFromName(chat));
}

function control(env: Env) {
  const ns = env.CONTROL as DurableObjectNamespace<ControlDO>;
  return ns.get(ns.idFromName("global"));
}

export class ConversacionDO extends DurableObject<Env> {
  private nucleo(): Conversacion {
    const env = this.env;
    const config = leerConfig(env);
    const claude = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, timeout: 120_000 });
    const ctrl = control(env);
    return new Conversacion({
      config,
      almacen: this.ctx.storage,
      control: {
        verificar: (ahora) => ctrl.verificar(ahora),
        registrar: (r, ahora) => ctrl.registrar(r, ahora),
        primerAviso: (clave, ahora) => ctrl.primerAviso(clave, ahora),
      },
      llamar: (params) => claude.beta.messages.create(params),
      tienda: crearTienda(),
      enviar: crearEnviador(config, env.WHATSAPP_API_KEY),
      avisar: crearAvisador({
        resendApiKey: env.RESEND_API_KEY,
        correo: config.avisoCorreo,
        ntfyTema: env.NTFY_TEMA,
      }),
    });
  }

  async recibir(ev: Evento, ahora: number): Promise<void> {
    await this.nucleo().recibir(ev, ahora);
  }

  async alarm(): Promise<void> {
    await this.nucleo().alarma(Date.now());
  }
}

export class ControlDO extends DurableObject<Env> {
  private nucleo(): Control {
    return new Control(this.ctx.storage, leerConfig(this.env).topes);
  }

  async verificar(ahora: number) {
    return this.nucleo().verificar(ahora);
  }

  async registrar(r: Registro, ahora: number): Promise<void> {
    await this.nucleo().registrar(r, ahora);
  }

  async primerAviso(clave: string, ahora: number): Promise<boolean> {
    return this.nucleo().primerAviso(clave, ahora);
  }

  async resumen(ahora: number) {
    return this.nucleo().resumen(ahora);
  }
}
