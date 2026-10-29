import { describe, expect, it } from "vitest";
import { crearTienda } from "../src/tienda";

function fetchFalso(rutas: Record<string, { status?: number; body?: unknown }>) {
  const pedidas: string[] = [];
  const fn = (async (url: string) => {
    pedidas.push(url);
    const r = Object.entries(rutas).find(([k]) => url.includes(k))?.[1];
    if (!r) return new Response("no", { status: 404 });
    return new Response(JSON.stringify(r.body ?? {}), { status: r.status ?? 200 });
  }) as unknown as typeof fetch;
  return { fn, pedidas };
}

describe("tienda en vivo", () => {
  it("lee precio, existencia y variantes del .js (precios en centavos)", async () => {
    const { fn } = fetchFalso({
      "/products/combo-okuma-boundary-70-spinning.js": {
        body: {
          handle: "combo-okuma-boundary-70-spinning",
          title: 'Combo Okuma Boundary 7\'0" Spinning',
          type: "Combos",
          tags: ["combo"],
          price: 99900,
          compare_at_price: null,
          available: true,
          description: "<p>Caña Boundary de 7&#39; y carrete <strong>BD-2000</strong>.</p><ul><li>Acción media</li><li>Línea 6–12 lb</li></ul>",
          variants: [{ id: 43219563085901, title: "Default Title", price: 99900, available: true }],
        },
      },
    });
    const p = await crearTienda(fn).consultar("combo-okuma-boundary-70-spinning");
    expect(p).toEqual({
      handle: "combo-okuma-boundary-70-spinning",
      titulo: 'Combo Okuma Boundary 7\'0" Spinning',
      precio: 999,
      precioAntes: null,
      disponible: true,
      restringido: false,
      ficha: "https://intemperiemexico.com/products/combo-okuma-boundary-70-spinning",
      descripcion: "Caña Boundary de 7' y carrete BD-2000 .\nAcción media\nLínea 6–12 lb",
      variantes: [{ id: 43219563085901, titulo: "Default Title", precio: 999, disponible: true }],
    });
  });

  it("marca los rifles de aire como restringidos", async () => {
    const { fn } = fetchFalso({
      "/products/rifle-x.js": { body: { handle: "rifle-x", title: "Rifle Mendoza Ventus", type: "Rifles de Aire", price: 1, available: true, variants: [] } },
    });
    expect((await crearTienda(fn).consultar("rifle-x"))?.restringido).toBe(true);
  });

  it("ante un 429 reintenta y luego prueba el dominio myshopify.com", async () => {
    const pedidas: string[] = [];
    const fn = (async (url: string) => {
      pedidas.push(url);
      if (url.includes("myshopify.com")) {
        return new Response(JSON.stringify({ handle: "x", title: "X", price: 100, available: true, variants: [] }), { status: 200 });
      }
      return new Response("Too Many Requests", { status: 429, headers: { "retry-after": "0" } });
    }) as unknown as typeof fetch;
    const p = await crearTienda(fn).consultar("x");
    expect(p?.titulo).toBe("X");
    expect(pedidas.filter((u) => u.includes("intemperiemexico.com"))).toHaveLength(3);
    expect(pedidas.at(-1)).toContain("wfuxvx-yn.myshopify.com/products/x.js");
  }, 15000);

  it("si todos los intentos fallan, lanza con el último código", async () => {
    const fn = (async () => new Response("", { status: 429, headers: { "retry-after": "0" } })) as unknown as typeof fetch;
    await expect(crearTienda(fn).consultar("x")).rejects.toThrow("429");
  }, 20000);

  it("un handle raro no sale a internet; un 404 es 'no existe'", async () => {
    const { fn, pedidas } = fetchFalso({});
    const t = crearTienda(fn);
    expect(await t.consultar("../admin")).toBeNull();
    expect(pedidas).toHaveLength(0);
    expect(await t.consultar("no-existe")).toBeNull();
  });

  it("busca con suggest.json", async () => {
    const { fn, pedidas } = fetchFalso({
      "/search/suggest.json": {
        body: { resources: { results: { products: [{ handle: "kit-a", title: "Kit A", price: "1439.00", available: true, type: "Kits" }] } } },
      },
    });
    expect(await crearTienda(fn).buscar("kit finesse")).toEqual([
      { handle: "kit-a", titulo: "Kit A", precio: 1439, disponible: true, restringido: false },
    ]);
    expect(pedidas[0]).toContain("q=kit%20finesse");
  });
});

describe("encabezados", () => {
  it("manda User-Agent (sin él Shopify responde 403 desde Cloudflare)", async () => {
    let ua = "";
    const fn = (async (_u: string, init: RequestInit) => {
      ua = new Headers(init.headers).get("user-agent") ?? "";
      return new Response("{}", { status: 404 });
    }) as unknown as typeof fetch;
    await crearTienda(fn).consultar("x");
    expect(ua).toMatch(/Mozilla/);
  });
});
