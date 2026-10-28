// Enviar mensajes de texto. Kapso expone la misma API de Meta
// (https://api.kapso.ai/meta/whatsapp/v24.0/{phone_number_id}/messages)
// con la llave en X-API-Key; con Meta directo es un token Bearer.

import type { Config } from "./config";
import type { Destino } from "./webhook";

export type EnviarTexto = (destino: Destino, texto: string) => Promise<void>;

export function crearEnviador(config: Config, apiKey: string, fetchFn: typeof fetch = fetch): EnviarTexto {
  return async (destino, texto) => {
    if (!config.phoneNumberId) throw new Error("Falta WHATSAPP_PHONE_NUMBER_ID");
    const cuerpo: Record<string, unknown> = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      type: "text",
      text: { body: texto, preview_url: true },
    };
    if (destino.to) cuerpo.to = destino.to;
    else if (destino.recipient) cuerpo.recipient = destino.recipient;
    else throw new Error("Mensaje sin destinatario");

    const encabezados: Record<string, string> = { "content-type": "application/json" };
    if (config.proveedor === "kapso") encabezados["x-api-key"] = apiKey;
    else encabezados.authorization = `Bearer ${apiKey}`;

    const r = await fetchFn(`${config.apiBase}/${config.phoneNumberId}/messages`, {
      method: "POST",
      headers: encabezados,
      body: JSON.stringify(cuerpo),
    });
    if (!r.ok) {
      // El cuerpo de error de Meta no trae la llave; se recorta por si acaso.
      const detalle = (await r.text()).slice(0, 300);
      throw new Error(`WhatsApp respondió ${r.status}: ${detalle}`);
    }
  };
}
