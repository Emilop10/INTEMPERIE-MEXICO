// Configuración del agente. Todo llega por variables de entorno de
// Cloudflare: las públicas en wrangler.toml ([vars]) y las llaves como
// secretos (`npx wrangler secret put NOMBRE`). Nada de esto va al repositorio.

export interface Env {
  // Durable Objects (ver wrangler.toml)
  CONVERSACION: DurableObjectNamespace;
  CONTROL: DurableObjectNamespace;

  // Secretos
  ANTHROPIC_API_KEY: string;
  SHOPIFY_ADMIN_TOKEN?: string; // opcional, shpat_…: la tienda por la API de administración
  WHATSAPP_API_KEY: string; // llave de Kapso (o token de Meta si PROVEEDOR=meta)
  WEBHOOK_SECRET: string; // secret_key del webhook de Kapso (o App Secret de Meta)
  RESEND_API_KEY?: string;
  NTFY_TEMA?: string; // nombre secreto del tema de ntfy
  NTFY_TOKEN?: string; // token de la cuenta gratis de ntfy.sh (tk_...)
  ADMIN_TOKEN?: string; // para /estado y /reiniciar
  NUMEROS_PRUEBA?: string; // "5217771234567,52..." solo dígitos, separados por coma
  MENSAJES_AUTOMATICOS?: string; // textos automáticos de la app (bienvenida, ausencia), separados por " | "
  META_VERIFY_TOKEN?: string; // solo PROVEEDOR=meta

  // Variables públicas
  AGENTE_MODO?: string; // borrador | prueba | activo
  PROVEEDOR?: string; // kapso | meta
  WHATSAPP_API_BASE?: string;
  WHATSAPP_PHONE_NUMBER_ID?: string;
  AVISO_CORREO?: string;
  MODELO?: string;
  PAUSA_HORAS?: string;
  RESCATE_MINUTOS?: string; // si el cliente vuelve a escribir y el dueño no contesta en N min, el agente retoma
  ESPERA_SEGUNDOS?: string;
  SEGUIMIENTO?: string; // si | no
  TOPE_CLAUDE_MES_USD?: string;
  TOPE_CLAUDE_DIA_USD?: string;
  TOPE_MENSAJES_KAPSO_MES?: string;
  TOPE_RESPUESTAS_META_MES?: string;
}

export type Modo = "borrador" | "prueba" | "activo";

export interface Config {
  modo: Modo;
  proveedor: "kapso" | "meta";
  apiBase: string;
  phoneNumberId: string;
  modelo: string;
  pausaMs: number;
  rescateMs: number;
  esperaMs: number;
  seguimiento: boolean;
  numerosPrueba: Set<string>;
  mensajesAutomaticos: string[]; // normalizados
  avisoCorreo: string;
  topes: {
    claudeMesUsd: number;
    claudeDiaUsd: number;
    mensajesKapsoMes: number;
    respuestasMetaMes: number;
  };
}

/** Para comparar textos: minúsculas, sin acentos, sin emojis ni espacios dobles. */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9ñ¿?¡!.,:;()$%+-]+/g, " ")
    .trim();
}

function numero(valor: string | undefined, porDefecto: number): number {
  const n = Number(valor);
  return valor !== undefined && valor !== "" && Number.isFinite(n) ? n : porDefecto;
}

export function leerConfig(env: Env): Config {
  const modo = (env.AGENTE_MODO ?? "borrador").trim() as Modo;
  if (!["borrador", "prueba", "activo"].includes(modo)) {
    throw new Error(`AGENTE_MODO inválido: ${env.AGENTE_MODO}`);
  }
  const proveedor = (env.PROVEEDOR ?? "kapso").trim() === "meta" ? "meta" : "kapso";
  const apiBase =
    env.WHATSAPP_API_BASE?.trim() ||
    (proveedor === "kapso"
      ? "https://api.kapso.ai/meta/whatsapp/v24.0"
      : "https://graph.facebook.com/v24.0");
  return {
    modo,
    proveedor,
    apiBase: apiBase.replace(/\/+$/, ""),
    phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID?.trim() ?? "",
    modelo: env.MODELO?.trim() || "claude-sonnet-5-5",
    pausaMs: numero(env.PAUSA_HORAS, 12) * 3600_000,
    rescateMs: numero(env.RESCATE_MINUTOS, 120) * 60_000,
    esperaMs: numero(env.ESPERA_SEGUNDOS, 8) * 1000,
    seguimiento: (env.SEGUIMIENTO ?? "si").trim() !== "no",
    numerosPrueba: new Set(
      (env.NUMEROS_PRUEBA ?? "")
        .split(",")
        .map((n) => n.replace(/\D/g, ""))
        .filter(Boolean),
    ),
    mensajesAutomaticos: (env.MENSAJES_AUTOMATICOS ?? "")
      .split("|")
      .map(normalizar)
      .filter(Boolean),
    avisoCorreo: env.AVISO_CORREO?.trim() || "admin@intemperiemexico.com",
    topes: {
      claudeMesUsd: numero(env.TOPE_CLAUDE_MES_USD, 90),
      claudeDiaUsd: numero(env.TOPE_CLAUDE_DIA_USD, 5),
      mensajesKapsoMes: numero(env.TOPE_MENSAJES_KAPSO_MES, 1900),
      respuestasMetaMes: numero(env.TOPE_RESPUESTAS_META_MES, 950),
    },
  };
}
