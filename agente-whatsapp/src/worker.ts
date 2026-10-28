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

    // Administración (llave ADMIN_TOKEN): contadores del mes y reiniciar un chat.
    if (url.pathname === "/estado" || url.pathname === "/reiniciar") {
      if (!env.ADMIN_TOKEN || request.headers.get("authorization") !== `Bearer ${env.ADMIN_TOKEN}`) {
        return new Response("No autorizado", { status: 401 });
      }
      if (url.pathname === "/estado") return Response.json(await control(env).resumen(Date.now()));
      const chat = (url.searchParams.get("chat") ?? "").replace(/[^\w.]/g, "");
      if (request.method !== "POST" || !chat) return new Response("POST /reiniciar?chat=<número>", { status: 400 });
      await conversacion(env, chat).reiniciar();
      return Response.json({ ok: true, chat });
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
        ntfyToken: env.NTFY_TOKEN,
      }),
    });
  }

  async recibir(ev: Evento, ahora: number): Promise<void> {
    await this.nucleo().recibir(ev, ahora);
  }

  async alarm(): Promise<void> {
    await this.nucleo().alarma(Date.now());
  }

  /** Borra el chat (historial, pausa y pendientes). Para pruebas. */
  async reiniciar(): Promise<void> {
    await this.ctx.storage.deleteAll();
    await this.ctx.storage.deleteAlarm();
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
