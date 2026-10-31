// Punto de entrada en Cloudflare Workers: recibe el webhook y reparte cada
// mensaje al Durable Object de su chat. La lógica vive en conversacion.ts,
// agente.ts y control.ts, que se prueban sin Cloudflare.

import Anthropic from "@anthropic-ai/sdk";
import { DurableObject } from "cloudflare:workers";
import { crearAvisador } from "./avisos";
import { leerConfig, type Env } from "./config";
import { Control, type Registro } from "./control";
import { Conversacion } from "./conversacion";
import { HANDLES_GUIA } from "./generado/conocimiento";
import { CATALOGO_FRESCO_MS, crearTienda } from "./tienda";
import { extraerEventos, firmaValida, type Evento } from "./webhook";
import { crearEnviador } from "./whatsapp";

export default {
  // Cron (wrangler.toml): refresca las fichas de la guía para tenerlas en
  // caché aunque Shopify esté limitando.
  async scheduled(_evento: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    const ctrl = control(env);
    const tienda = tiendaDe(env, ctrl);
    // Una por una, con pausa: pedir las 8 a la vez provoca el 429 de Shopify.
    ctx.waitUntil(
      (async () => {
        // Índice del catálogo completo para buscar sin depender de Shopify.
        // Shopify limita por IP compartida (429). El cron pide poco y, en cuanto
        // ve un 429, se detiene hasta la siguiente corrida: insistir alarga el bloqueo.
        const indice = (await ctrl.cacheGet("catalogo")) as { ts: number } | undefined;
        if (!indice || Date.now() - indice.ts > CATALOGO_FRESCO_MS) {
          try {
            console.log(`cron: catálogo con ${await tienda.refrescarCatalogo()} productos`);
          } catch (e) {
            console.error(`cron: no se pudo refrescar el catálogo: ${String(e).slice(0, 120)}`);
            if (/429/.test(String(e))) return;
          }
          await new Promise((r) => setTimeout(r, 1500));
        }
        for (const h of HANDLES_GUIA) {
          // Solo las fichas con copia de más de 20 min (la caché sirve copias viejas hasta 24 h).
          const copia = (await ctrl.cacheGet(`producto:${h}`)) as { ts: number } | undefined;
          if (copia && Date.now() - copia.ts < 20 * 60_000) continue;
          try {
            await tienda.refrescar(h, true);
          } catch (e) {
            console.error(`cron: no se pudo refrescar ${h}: ${String(e).slice(0, 120)}`);
            if (/429/.test(String(e))) return;
          }
          await new Promise((r) => setTimeout(r, 1500));
        }
      })(),
    );
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const config = leerConfig(env);

    if (url.pathname === "/salud") {
      return Response.json({ ok: true, modo: config.modo, proveedor: config.proveedor });
    }

    // Administración (llave ADMIN_TOKEN): contadores del mes y reiniciar un chat.
    if (["/estado", "/reiniciar", "/diagnostico", "/enviar-borradores", "/reprocesar", "/chat"].includes(url.pathname)) {
      if (!env.ADMIN_TOKEN || request.headers.get("authorization") !== `Bearer ${env.ADMIN_TOKEN}`) {
        return new Response("No autorizado", { status: 401 });
      }
      if (url.pathname === "/estado") return Response.json(await control(env).resumen(Date.now()));
      if (url.pathname === "/chat") {
        // Metadatos de un chat (sin textos), para diagnóstico.
        const chat = (url.searchParams.get("chat") ?? "").replace(/[^\w.]/g, "");
        if (!chat) return new Response("GET /chat?chat=<número>", { status: 400 });
        if (request.method === "POST" && url.searchParams.get("accion") === "retomar") {
          // Quita la pausa y vuelve a atender; solo si el dueño no ha escrito en ese chat en la última hora.
          const r = (await conversacion(env, chat).resumen(Date.now())) as Record<string, unknown>;
          if (r.existe && typeof r.pausaMin === "number" && r.pausaMin > 0 && r.pausaMotivo === "dueno" && Number(r.pausaDesdeHaceMin ?? 999) < 60) {
            return Response.json({ chat, resultado: "el_dueno_contesto_hace_poco" }, { status: 409 });
          }
          return Response.json({ chat, resultado: await conversacion(env, chat).reprocesar(Date.now(), true) });
        }
        return Response.json(await conversacion(env, chat).resumen(Date.now()));
      }
      if (url.pathname === "/reprocesar") {
        // Bloqueado el 30 oct: contestó chats cerrados ("Gracias") y chats del
        // historial compartido. Solo lista; no envía.
        if (request.method === "POST") return Response.json({ error: "Desactivado: ver MANUAL §129 (30 oct)." }, { status: 403 });
        // Chats de Kapso cuyo último mensaje es del cliente (sin respuesta del
        // dueño) dentro de las 24 h. GET: lista; POST: los vuelve a atender.
        const ahora = Date.now();
        const r = await fetch(
          `${config.apiBase.replace(/\/meta\/whatsapp\/v[\d.]+$/, "")}/platform/v1/whatsapp/conversations?phone_number_id=${config.phoneNumberId}&last_active_after=${new Date(ahora - 24 * 3600_000).toISOString()}&per_page=100`,
          { headers: { "x-api-key": env.WHATSAPP_API_KEY } },
        );
        if (!r.ok) return Response.json({ error: `Kapso respondió ${r.status}` }, { status: 502 });
        const d = (await r.json()) as { data?: Array<{ phone_number?: string; kapso?: { last_inbound_at?: string; last_outbound_at?: string | null } }> };
        const candidatos = (d.data ?? [])
          .map((c) => {
            const chat = (c.phone_number ?? "").replace(/\D/g, "");
            const entrada = Date.parse(c.kapso?.last_inbound_at ?? "");
            const salida = c.kapso?.last_outbound_at ? Date.parse(c.kapso.last_outbound_at) : 0;
            return { chat, entrada, salida };
          })
          // Sin respuesta, o con una "respuesta" en los 5 s siguientes (el saludo automático de la app).
          .filter((c) => c.chat && c.chat !== "56920403095" && c.entrada && ahora - c.entrada < 24 * 3600_000 && (salida(c) < c.entrada || salida(c) - c.entrada < 5000));
        function salida(c: { salida: number }) {
          return c.salida;
        }
        const detalle = candidatos.map((c) => `${c.chat.slice(0, 5)}***${c.chat.slice(-4)}: hace ${Math.round((ahora - c.entrada) / 360_000) / 10} h`);
        if (request.method !== "POST") return Response.json({ candidatos: candidatos.length, detalle });
        const resultado: Record<string, number> = {};
        for (const c of candidatos) {
          // Kapso escribe los números de México sin el "1" (52777…); Meta los
          // manda con él (521777…) y así se nombran los chats. Se prueban ambos.
          const formas = [...new Set([c.chat, c.chat.replace(/^52(?!1)/, "521"), c.chat.replace(/^521/, "52")])];
          let res = "sin_estado";
          for (const f of formas) {
            res = await conversacion(env, f).reprocesar(ahora);
            if (res !== "sin_estado") break;
          }
          resultado[res] = (resultado[res] ?? 0) + 1;
        }
        return Response.json({ candidatos: candidatos.length, resultado });
      }
      if (url.pathname === "/enviar-borradores") {
        // Manda las respuestas que quedaron en borrador y aún se pueden enviar.
        // GET: solo cuenta. POST: envía.
        const ahora = Date.now();
        const borradores = await control(env).listarBorradores();
        const lista = Object.entries(borradores).map(([chat, ts]) => ({ chat, horas: Math.round((ahora - ts) / 360_000) / 10 }));
        if (request.method !== "POST") return Response.json({ pendientes: lista.length, detalle: lista.map((b) => `${b.chat.slice(0, 5)}***${b.chat.slice(-4)}: hace ${b.horas} h`) });
        const resultado: Record<string, number> = {};
        for (const { chat } of lista) {
          const r = await conversacion(env, chat).enviarBorrador(ahora);
          resultado[r] = (resultado[r] ?? 0) + 1;
        }
        return Response.json({ pendientes: lista.length, resultado });
      }
      if (url.pathname === "/diagnostico") {
        // Prueba desde este mismo Worker la tienda y ntfy (sin Claude).
        const salida: Record<string, unknown> = {};
        const tienda = tiendaDe(env, control(env));
        const resultados: string[] = [];
        if (url.searchParams.get("catalogo") === "si") {
          try {
            resultados.push(`catálogo: ${await tienda.refrescarCatalogo()} productos indexados`);
          } catch (e) {
            resultados.push(`catálogo: ${String(e).slice(0, 120)}`);
          }
        }
        const q = url.searchParams.get("buscar");
        if (q) {
          const b = await tienda.buscar(q);
          resultados.push(`buscar "${q}": ${b.map((x) => `${x.titulo} $${x.precio}${x.disponible ? "" : " (agotado)"}`).join(" | ") || "nada"}`);
        }
        for (const h of HANDLES_GUIA.slice(0, Number(url.searchParams.get("veces") ?? 3))) {
          const inicio = Date.now();
          try {
            const p = await tienda.consultar(h);
            resultados.push(`${h}: ${p ? `$${p.precio} ${p.disponible ? "hay" : "agotado"}${p.edadMin ? ` (copia de hace ${p.edadMin} min)` : ""}` : "no existe"} (${Date.now() - inicio} ms)`);
          } catch (e) {
            resultados.push(`${h}: ${String(e).slice(0, 120)} (${Date.now() - inicio} ms)`);
          }
        }
        try {
          const b = await tienda.buscar("kit");
          resultados.push(`buscar "kit": ${b.length} resultados`);
        } catch (e) {
          resultados.push(`buscar: ${String(e).slice(0, 120)}`);
        }
        salida.tienda = resultados;
        try {
          const r = await fetch(`https://ntfy.sh/${encodeURIComponent(env.NTFY_TEMA ?? "")}`, {
            method: "POST",
            headers: { Title: "Diagnostico", ...(env.NTFY_TOKEN ? { Authorization: `Bearer ${env.NTFY_TOKEN}` } : {}) },
            body: "Prueba de diagnostico del agente",
          });
          salida.ntfy = { status: r.status, conToken: Boolean(env.NTFY_TOKEN) };
        } catch (e) {
          salida.ntfy = `error: ${String(e).slice(0, 200)}`;
        }
        return Response.json(salida);
      }
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

function tiendaDe(env: Env, ctrl: DurableObjectStub<ControlDO>) {
  return crearTienda({
    cache: { get: (c) => ctrl.cacheGet(c), put: (c, v, t) => ctrl.cachePut(c, v, t) },
    adminToken: env.SHOPIFY_ADMIN_TOKEN,
  });
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
        anotarBorrador: (chat, ts) => ctrl.anotarBorrador(chat, ts),
        quitarBorrador: (chat) => ctrl.quitarBorrador(chat),
      },
      llamar: (params) => claude.beta.messages.create(params),
      tienda: tiendaDe(env, ctrl),
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

  async enviarBorrador(ahora: number) {
    return this.nucleo().enviarBorrador(ahora);
  }

  async reprocesar(ahora: number, forzar = false) {
    return this.nucleo().reprocesar(ahora, forzar);
  }

  async resumen(ahora: number) {
    return this.nucleo().resumen(ahora);
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

  async anotarBorrador(chat: string, ts: number): Promise<void> {
    await this.nucleo().anotarBorrador(chat, ts);
  }

  async quitarBorrador(chat: string): Promise<void> {
    await this.nucleo().quitarBorrador(chat);
  }

  async listarBorradores(): Promise<Record<string, number>> {
    return this.nucleo().listarBorradores();
  }

  async cacheGet(clave: string): Promise<{ valor: unknown; ts: number } | undefined> {
    return this.ctx.storage.get<{ valor: unknown; ts: number }>(`cat:${clave}`);
  }

  async cachePut(clave: string, valor: unknown, ts: number): Promise<void> {
    await this.ctx.storage.put(`cat:${clave}`, { valor, ts });
  }

  async resumen(ahora: number) {
    return this.nucleo().resumen(ahora);
  }
}
