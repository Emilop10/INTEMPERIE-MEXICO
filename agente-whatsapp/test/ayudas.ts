// Dobles de prueba: almacén en memoria, tienda falsa, Claude con guion,
// WhatsApp y avisos que solo anotan.

import type { LlamarClaude, ParamsMensaje } from "../src/agente";
import type { Aviso } from "../src/avisos";
import { leerConfig, type Config, type Env } from "../src/config";
import { Control, type Almacen } from "../src/control";
import { Conversacion } from "../src/conversacion";
import type { Producto, Tienda } from "../src/tienda";
import type { Destino } from "../src/webhook";

export class AlmacenMemoria implements Almacen {
  datos = new Map<string, unknown>();
  alarma: number | null = null;
  async get<T>(k: string) {
    const v = this.datos.get(k);
    return v === undefined ? undefined : (structuredClone(v) as T);
  }
  async put<T>(k: string, v: T) {
    this.datos.set(k, structuredClone(v));
  }
  async deleteAll() {
    this.datos.clear();
  }
  async setAlarm(t: number) {
    this.alarma = t;
  }
  async deleteAlarm() {
    this.alarma = null;
  }
}

export function producto(p: Partial<Producto> & { handle: string }): Producto {
  return {
    titulo: p.handle,
    precio: 999,
    precioAntes: null,
    disponible: true,
    restringido: false,
    ficha: `https://intemperiemexico.com/products/${p.handle}`,
    descripcion: "",
    variantes: [{ id: 111, titulo: "Default Title", precio: p.precio ?? 999, disponible: p.disponible ?? true }],
    ...p,
  };
}

export function tiendaFalsa(productos: Producto[]): Tienda {
  return {
    async consultar(h) {
      return productos.find((p) => p.handle === h) ?? null;
    },
    async refrescar(h) {
      return productos.find((p) => p.handle === h) ?? null;
    },
    async buscar(q) {
      return productos
        .filter((p) => p.titulo.toLowerCase().includes(q.toLowerCase()))
        .map((p) => ({ handle: p.handle, titulo: p.titulo, precio: p.precio, disponible: p.disponible, restringido: p.restringido }));
    },
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let contador = 0;
export function texto(t: string): any {
  return { stop_reason: "end_turn", content: [{ type: "text", text: t }] };
}
export function herramienta(name: string, input: unknown): any {
  return { stop_reason: "tool_use", content: [{ type: "tool_use", id: `tu_${++contador}`, name, input }] };
}

/** Claude con respuestas en orden. Anota los parámetros de cada llamada. */
export function claudeConGuion(respuestas: any[]): LlamarClaude & { llamadas: ParamsMensaje[] } {
  const llamadas: ParamsMensaje[] = [];
  const fn = (async (params: ParamsMensaje) => {
    llamadas.push(structuredClone(params));
    const r = respuestas.shift();
    if (!r) throw new Error("Claude falso sin más respuestas");
    return {
      id: "msg",
      type: "message",
      role: "assistant",
      model: params.model,
      usage: { input_tokens: 1000, output_tokens: 100, cache_read_input_tokens: 3000, cache_creation_input_tokens: 0 },
      ...r,
    };
  }) as LlamarClaude & { llamadas: ParamsMensaje[] };
  fn.llamadas = llamadas;
  return fn;
}

export function config(extra: Partial<Env> = {}): Config {
  return leerConfig({ AGENTE_MODO: "activo", WHATSAPP_PHONE_NUMBER_ID: "123", ...extra } as Env);
}

export function armarConversacion(opts: {
  config?: Config;
  claude: LlamarClaude;
  tienda?: Tienda;
  almacenControl?: AlmacenMemoria;
  fallaEnvio?: boolean;
}) {
  const cfg = opts.config ?? config();
  const almacen = new AlmacenMemoria();
  const almacenControl = opts.almacenControl ?? new AlmacenMemoria();
  const control = new Control(almacenControl, cfg.topes);
  const enviados: { destino: Destino; texto: string }[] = [];
  const avisos: Aviso[] = [];
  const conv = new Conversacion({
    config: cfg,
    almacen,
    control,
    llamar: opts.claude,
    tienda: opts.tienda ?? tiendaFalsa([]),
    enviar: async (destino, t) => {
      if (opts.fallaEnvio) throw new Error("401 token inválido");
      enviados.push({ destino, texto: t });
    },
    avisar: async (a) => {
      avisos.push(a);
    },
  });
  return { conv, almacen, almacenControl, control, enviados, avisos };
}

// 28 oct 2026 14:00 en Ciudad de México (UTC-6)
export const MEDIODIA = Date.UTC(2026, 9, 28, 20, 0, 0);
// 28 oct 2026 23:30 en Ciudad de México
export const NOCHE = Date.UTC(2026, 9, 29, 5, 30, 0);

export function mensaje(texto: string, id = `wamid.${++contador}`, chat = "5217771112222") {
  return { tipo: "mensaje" as const, chat, destino: { to: chat }, id, ts: 0, texto };
}
