// Webhook de WhatsApp: verificar la firma y convertir el formato de Meta
// (Kapso lo reenvía sin cambios) en eventos simples para el agente.

import { hmacSha256Hex, igualesSeguro } from "./util";

/** A quién se le contesta: por teléfono, o por BSUID si Meta no manda el número. */
export interface Destino {
  to?: string;
  recipient?: string;
}

export type Evento =
  | {
      tipo: "mensaje";
      chat: string;
      destino: Destino;
      id: string;
      ts: number;
      texto: string;
      nombre?: string;
      anuncio?: string;
    }
  | {
      // Lo que el dueño escribió desde la app del celular (coexistencia).
      tipo: "eco";
      chat: string;
      id: string;
      ts: number;
      texto: string;
    };

export async function firmaValida(
  proveedor: "kapso" | "meta",
  secreto: string,
  encabezados: Headers,
  cuerpo: ArrayBuffer,
): Promise<boolean> {
  if (!secreto) return false;
  const esperada = await hmacSha256Hex(secreto, cuerpo);
  if (proveedor === "kapso") {
    // Kapso: X-Webhook-Signature = HMAC-SHA256 en hex, sin prefijo.
    const firma = (encabezados.get("x-webhook-signature") ?? "").trim().toLowerCase();
    return igualesSeguro(firma, esperada);
  }
  // Meta directo: X-Hub-Signature-256 = "sha256=<hex>" con el App Secret.
  const firma = (encabezados.get("x-hub-signature-256") ?? "").trim().toLowerCase();
  return igualesSeguro(firma, `sha256=${esperada}`);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Json = any;

function textoDeMensaje(m: Json): string | null {
  const pie = (t?: string) => (t ? `: "${t}"` : "");
  switch (m?.type) {
    case "text":
      return m.text?.body ?? "";
    case "interactive": {
      const r = m.interactive?.button_reply ?? m.interactive?.list_reply;
      return r ? [r.title, r.description].filter(Boolean).join(" — ") : null;
    }
    case "button":
      return m.button?.text ?? null;
    case "image":
      return `[El cliente mandó una foto que no puedes ver${pie(m.image?.caption)}]`;
    case "video":
      return `[El cliente mandó un video que no puedes ver${pie(m.video?.caption)}]`;
    case "document":
      return `[El cliente mandó un documento que no puedes abrir${pie(m.document?.caption ?? m.document?.filename)}]`;
    case "audio":
      return "[El cliente mandó un audio de voz que no puedes escuchar]";
    case "sticker":
      return "[El cliente mandó un sticker]";
    case "location":
      return "[El cliente mandó una ubicación]";
    case "contacts":
      return "[El cliente mandó una tarjeta de contacto]";
    case "order":
      return "[El cliente mandó un pedido desde el catálogo de WhatsApp]";
    default:
      // reaction, request_welcome, system, unsupported, etc.: no se contestan.
      return null;
  }
}

function soloDigitos(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const d = v.replace(/\D/g, "");
  return d || undefined;
}

export function extraerEventos(payload: Json): Evento[] {
  // Formato propio de Kapso (webhook "kapso"; el Sandbox solo admite este).
  if (!payload?.entry && (payload?.message || payload?.batch)) {
    const items: Json[] = payload.batch ? payload.data ?? [] : [payload];
    return items.flatMap(eventoKapso);
  }
  const eventos: Evento[] = [];
  for (const entrada of payload?.entry ?? []) {
    for (const cambio of entrada?.changes ?? []) {
      const valor = cambio?.value ?? {};
      if (cambio?.field === "messages") {
        const contactos: Json[] = valor.contacts ?? [];
        for (const m of valor.messages ?? []) {
          const texto = textoDeMensaje(m);
          if (texto === null || texto.trim() === "") continue;
          const contacto =
            contactos.find((c) => c?.wa_id && c.wa_id === m.from) ?? contactos[0] ?? {};
          const telefono = soloDigitos(m.from) ?? soloDigitos(contacto.wa_id);
          const bsuid: string | undefined = m.from_user_id ?? contacto.user_id;
          const chat = telefono ?? bsuid;
          if (!chat) continue;
          const ref = m.referral;
          eventos.push({
            tipo: "mensaje",
            chat,
            destino: telefono ? { to: telefono } : { recipient: bsuid },
            id: String(m.id ?? `${chat}-${m.timestamp}`),
            ts: Number(m.timestamp ?? 0) * 1000,
            texto,
            nombre: contacto.profile?.name,
            anuncio: ref
              ? [ref.headline, ref.body].filter(Boolean).join(" — ") || "anuncio de Facebook"
              : undefined,
          });
        }
      } else if (cambio?.field === "smb_message_echoes") {
        for (const m of valor.message_echoes ?? []) {
          const chat = soloDigitos(m.to) ?? m.to_user_id;
          if (!chat) continue;
          eventos.push({
            tipo: "eco",
            chat,
            id: String(m.id ?? `${chat}-${m.timestamp}`),
            ts: Number(m.timestamp ?? 0) * 1000,
            texto: textoDeMensaje(m) ?? "[mensaje]",
          });
        }
      }
      // "history", "smb_app_state_sync", estados de entrega y demás: se ignoran.
    }
  }
  return eventos;
}

/**
 * Un mensaje en formato Kapso: el mensaje trae la misma forma que el de
 * Meta, más `message.kapso` (dirección y origen) y `conversation`.
 */
function eventoKapso(item: Json): Evento[] {
  const m = item?.message;
  const conv = item?.conversation ?? {};
  if (!m) return [];
  const direccion = m.kapso?.direction;
  const telefono = soloDigitos(m.from) ?? soloDigitos(conv.phone_number) ?? soloDigitos(m.to);
  const bsuid: string | undefined = m.from_user_id ?? conv.business_scoped_user_id;
  const chat = telefono ?? bsuid;
  if (!chat) return [];
  const texto = textoDeMensaje(m);
  if (direccion === "inbound") {
    if (texto === null || texto.trim() === "") return [];
    const ref = m.referral;
    return [
      {
        tipo: "mensaje",
        chat,
        destino: telefono ? { to: telefono } : { recipient: bsuid },
        id: String(m.id ?? `${chat}-${m.timestamp}`),
        ts: Number(m.timestamp ?? 0) * 1000,
        texto,
        nombre: conv.contact_name,
        anuncio: ref ? [ref.headline, ref.body].filter(Boolean).join(" — ") || "anuncio de Facebook" : undefined,
      },
    ];
  }
  // Lo que el dueño manda desde la app del celular (no lo que manda el agente por la API).
  if (direccion === "outbound" && /business_app|smb/i.test(String(m.kapso?.origin ?? ""))) {
    return [{ tipo: "eco", chat, id: String(m.id ?? `${chat}-${m.timestamp}`), ts: Number(m.timestamp ?? 0) * 1000, texto: texto ?? "[mensaje]" }];
  }
  return [];
}
