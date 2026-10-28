import { describe, expect, it } from "vitest";
import { atender, costoDeUso, revisarLinks } from "../src/agente";
import { claudeConGuion, herramienta, producto, texto, tiendaFalsa } from "./ayudas";

const boundary = producto({
  handle: "combo-okuma-boundary-70-spinning",
  titulo: 'Combo Okuma Boundary 7\'0" Spinning',
  precio: 999,
  variantes: [{ id: 43219563085901, titulo: "Default Title", precio: 999, disponible: true }],
});
const agotado = producto({
  handle: "combo-okuma-revenger-80-2-40m-cana-carrete",
  precio: 1169,
  disponible: false,
  variantes: [{ id: 43510764634189, titulo: "Default Title", precio: 1169, disponible: false }],
});
const rifle = producto({ handle: "rifle-gamo-black-1000", titulo: "Rifle Gamo Black 1000", restringido: true });
const tienda = tiendaFalsa([boundary, agotado, rifle]);
const entrada = { historial: [], nuevos: "Hola, ¿cuánto cuesta el combo Boundary?", contexto: "Ahora: martes." };

describe("atender", () => {
  it("consulta el precio en vivo y contesta; la llamada usa Sonnet 5.5 con caché y esfuerzo bajo", async () => {
    const claude = claudeConGuion([
      herramienta("consultar_producto", { handle: boundary.handle }),
      texto("¡Hola! El Combo Boundary está en $999 con envío gratis 🎣 ¿Es para presa o río?"),
    ]);
    const v = await atender({ llamar: claude, tienda, modelo: "claude-sonnet-5-5" }, entrada);
    expect(v.resultado).toEqual({
      accion: "responder",
      texto: "¡Hola! El Combo Boundary está en $999 con envío gratis 🎣 ¿Es para presa o río?",
      linksPago: [],
    });
    expect(v.llamadas).toBe(2);
    const p = claude.llamadas[0];
    expect(p.model).toBe("claude-sonnet-5-5");
    expect(p.output_config).toEqual({ effort: "low" });
    expect(p.thinking).toEqual({ type: "adaptive" });
    expect(p.cache_control).toEqual({ type: "ephemeral" });
    expect(p.fallbacks).toBe("default");
    expect(p.betas).toContain("server-side-fallback-2026-07-01");
    expect(Array.isArray(p.system) && p.system[0].cache_control).toEqual({ type: "ephemeral" });
    // El contexto va como mensaje de sistema al final, después del cliente.
    expect(p.messages.at(-1)).toEqual({ role: "system", content: "Ahora: martes." });
    // La segunda llamada lleva el resultado de la tienda.
    const resultado = JSON.parse((claude.llamadas[1].messages.at(-1)!.content as any)[0].content);
    expect(resultado).toMatchObject({ encontrado: true, precio: 999, disponible: true, envio: "gratis" });
  });

  it("manda el link de pago que dio la herramienta", async () => {
    const link = "https://intemperiemexico.com/cart/43219563085901:1";
    const claude = claudeConGuion([
      herramienta("link_de_pago", { handle: boundary.handle, variante_id: 0 }),
      texto(`Va, aquí está tu link para pagar: ${link}`),
    ]);
    const v = await atender({ llamar: claude, tienda, modelo: "claude-sonnet-5-5" }, entrada);
    expect(v.resultado).toEqual({ accion: "responder", texto: `Va, aquí está tu link para pagar: ${link}`, linksPago: [link] });
  });

  it("un link de pago inventado o de otro dominio se pasa al dueño en vez de enviarse", async () => {
    for (const malo of [
      "Paga aquí: https://intemperiemexico.com/cart/99999:1",
      "Mejor cómpralo en https://articulo.mercadolibre.com.mx/MLM-123",
    ]) {
      const v = await atender({ llamar: claudeConGuion([texto(malo)]), tienda, modelo: "claude-sonnet-5-5" }, entrada);
      expect(v.resultado.accion).toBe("pasar");
    }
  });

  it("un producto agotado no da link; un rifle no se vende por aquí", async () => {
    const claude = claudeConGuion([
      herramienta("link_de_pago", { handle: agotado.handle, variante_id: 0 }),
      herramienta("link_de_pago", { handle: rifle.handle, variante_id: 0 }),
      texto("Ese ya se agotó, pero te recomiendo el Boundary."),
    ]);
    await atender({ llamar: claude, tienda, modelo: "claude-sonnet-5-5" }, entrada);
    const r1 = JSON.parse((claude.llamadas[1].messages.at(-1)!.content as any)[0].content);
    const r2 = JSON.parse((claude.llamadas[2].messages.at(-1)!.content as any)[0].content);
    expect(r1.error).toMatch(/Agotado/);
    expect(r2.error).toMatch(/armas/);
  });

  it("pasar al dueño, no responder y negativa", async () => {
    const pasar = await atender(
      {
        llamar: claudeConGuion([herramienta("pasar_al_dueno", { motivo: "descuento", resumen: "Pide 10% en el Boundary", producto: "Combo Boundary" })]),
        tienda,
        modelo: "claude-sonnet-5-5",
      },
      entrada,
    );
    expect(pasar.resultado).toEqual({ accion: "pasar", motivo: "descuento", resumen: "Pide 10% en el Boundary", producto: "Combo Boundary" });

    const nada = await atender(
      { llamar: claudeConGuion([herramienta("no_responder", { motivo: "spam" })]), tienda, modelo: "claude-sonnet-5-5" },
      entrada,
    );
    expect(nada.resultado).toEqual({ accion: "nada", motivo: "spam" });

    const negativa = await atender(
      { llamar: claudeConGuion([{ stop_reason: "refusal", content: [] }]), tienda, modelo: "claude-sonnet-5-5" },
      entrada,
    );
    expect(negativa.resultado.accion).toBe("pasar");
  });

  it("si la tienda falla, Claude recibe el error y puede seguir", async () => {
    const rota = { ...tienda, consultar: async () => { throw new Error("503"); } };
    const claude = claudeConGuion([
      herramienta("consultar_producto", { handle: boundary.handle }),
      herramienta("pasar_al_dueno", { motivo: "otro", resumen: "La tienda no respondió", producto: "" }),
    ]);
    const v = await atender({ llamar: claude, tienda: rota, modelo: "claude-sonnet-5-5" }, entrada);
    const tr = (claude.llamadas[1].messages.at(-1)!.content as any)[0];
    expect(tr.is_error).toBe(true);
    expect(v.resultado.accion).toBe("pasar");
  });

  it("no da más de 5 vueltas", async () => {
    const claude = claudeConGuion(Array.from({ length: 6 }, () => herramienta("buscar_producto", { consulta: "x" })));
    const v = await atender({ llamar: claude, tienda, modelo: "claude-sonnet-5-5" }, entrada);
    expect(v.llamadas).toBe(5);
    expect(v.resultado.accion).toBe("pasar");
  });
});

describe("costo y links", () => {
  it("calcula el costo de Sonnet 5.5 con caché", () => {
    const usd = costoDeUso("claude-sonnet-5-5", {
      input_tokens: 1_000_000,
      output_tokens: 100_000,
      cache_read_input_tokens: 1_000_000,
      cache_creation_input_tokens: 100_000,
    } as any);
    expect(usd).toBeCloseTo(2 + 1 + 0.2 + 0.25, 6);
  });

  it("acepta fichas de la tienda y wa.me", () => {
    expect(revisarLinks("Mira: https://intemperiemexico.com/products/kit-x y wa.me/527773277340.", new Set())).toBeNull();
  });
});
