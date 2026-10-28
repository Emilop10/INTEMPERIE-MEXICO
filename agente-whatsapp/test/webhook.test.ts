import { describe, expect, it } from "vitest";
import { hmacSha256Hex } from "../src/util";
import { extraerEventos, firmaValida } from "../src/webhook";

const cuerpo = new TextEncoder().encode('{"hola":1}').buffer as ArrayBuffer;

describe("firma del webhook", () => {
  it("acepta la firma de Kapso y rechaza una alterada", async () => {
    const firma = await hmacSha256Hex("secreto", cuerpo);
    expect(await firmaValida("kapso", "secreto", new Headers({ "x-webhook-signature": firma }), cuerpo)).toBe(true);
    expect(await firmaValida("kapso", "otro", new Headers({ "x-webhook-signature": firma }), cuerpo)).toBe(false);
    expect(await firmaValida("kapso", "secreto", new Headers(), cuerpo)).toBe(false);
  });

  it("acepta la firma de Meta con prefijo sha256=", async () => {
    const firma = await hmacSha256Hex("app-secret", cuerpo);
    const h = new Headers({ "x-hub-signature-256": `sha256=${firma}` });
    expect(await firmaValida("meta", "app-secret", h, cuerpo)).toBe(true);
    expect(await firmaValida("kapso", "app-secret", h, cuerpo)).toBe(false);
  });

  it("sin secreto configurado, rechaza todo", async () => {
    expect(await firmaValida("kapso", "", new Headers({ "x-webhook-signature": "00".repeat(32) }), cuerpo)).toBe(false);
  });
});

function payload(field: string, value: unknown) {
  return { object: "whatsapp_business_account", entry: [{ id: "waba", changes: [{ field, value }] }] };
}

describe("eventos de Meta", () => {
  it("convierte un texto que llega de un anuncio", () => {
    const ev = extraerEventos(
      payload("messages", {
        messaging_product: "whatsapp",
        metadata: { phone_number_id: "123" },
        contacts: [{ profile: { name: "Juan" }, wa_id: "5217771112222" }],
        messages: [
          {
            from: "5217771112222",
            id: "wamid.A",
            timestamp: "1761660000",
            type: "text",
            text: { body: "¿Tienen kits para presa?" },
            referral: { source_type: "ad", headline: "Combo a $999", body: "Envío gratis" },
          },
        ],
      }),
    );
    expect(ev).toEqual([
      {
        tipo: "mensaje",
        chat: "5217771112222",
        destino: { to: "5217771112222" },
        id: "wamid.A",
        ts: 1761660000000,
        texto: "¿Tienen kits para presa?",
        nombre: "Juan",
        anuncio: "Combo a $999 — Envío gratis",
      },
    ]);
  });

  it("botones, audios y fotos se vuelven texto; reacciones y estados se ignoran", () => {
    const ev = extraerEventos(
      payload("messages", {
        contacts: [{ wa_id: "521" }],
        messages: [
          { from: "521", id: "1", type: "interactive", interactive: { type: "button_reply", button_reply: { title: "Sí, mándalo" } } },
          { from: "521", id: "2", type: "audio", audio: { id: "x" } },
          { from: "521", id: "3", type: "image", image: { caption: "¿esta caña?" } },
          { from: "521", id: "4", type: "reaction", reaction: { emoji: "👍" } },
        ],
        statuses: [{ id: "s", status: "delivered" }],
      }),
    );
    expect(ev.map((e) => e.texto)).toEqual([
      "Sí, mándalo",
      "[El cliente mandó un audio de voz que no puedes escuchar]",
      '[El cliente mandó una foto que no puedes ver: "¿esta caña?"]',
    ]);
  });

  it("lo que escribe el dueño desde el celular llega como eco", () => {
    const ev = extraerEventos(
      payload("smb_message_echoes", {
        message_echoes: [{ from: "527773277340", to: "5217771112222", id: "e1", timestamp: "1", type: "text", text: { body: "Hola, soy Emiliano" } }],
      }),
    );
    expect(ev).toEqual([{ tipo: "eco", chat: "5217771112222", id: "e1", ts: 1000, texto: "Hola, soy Emiliano" }]);
  });

  it("el historial compartido y la sincronización de la app se ignoran", () => {
    expect(extraerEventos(payload("history", { history: [{ threads: [] }] }))).toEqual([]);
    expect(extraerEventos(payload("smb_app_state_sync", { state_sync: [] }))).toEqual([]);
  });

  it("sin teléfono, contesta por BSUID", () => {
    const ev = extraerEventos(
      payload("messages", {
        contacts: [{ user_id: "MX.123" }],
        messages: [{ id: "b1", type: "text", text: { body: "hola" }, from_user_id: "MX.123" }],
      }),
    );
    expect(ev[0]).toMatchObject({ chat: "MX.123", destino: { recipient: "MX.123" } });
  });
});
