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

describe("caché persistente y API con token", () => {
  function cacheMemoria() {
    const m = new Map<string, { valor: unknown; ts: number }>();
    return { get: async (c: string) => m.get(c), put: async (c: string, valor: unknown, ts: number) => void m.set(c, { valor, ts }), m };
  }
  const ficha = { handle: "x", title: "X", price: 99900, available: true, variants: [{ id: 1, title: "D", price: 99900, available: true }] };

  it("sirve de la caché 2 min y luego vuelve a consultar", async () => {
    let t = 1_000_000;
    const pedidas: string[] = [];
    const fn = (async (url: string) => (pedidas.push(url), new Response(JSON.stringify(ficha)))) as unknown as typeof fetch;
    const tienda = crearTienda({ fetchFn: fn, cache: cacheMemoria(), ahora: () => t });
    await tienda.consultar("x");
    await tienda.consultar("x");
    expect(pedidas).toHaveLength(1);
    t += 3 * 60_000;
    await tienda.consultar("x");
    expect(pedidas).toHaveLength(2);
  });

  it("si Shopify falla, usa la copia vieja y dice su edad", async () => {
    let t = 1_000_000;
    let falla = false;
    const fn = (async () => (falla ? new Response("", { status: 429, headers: { "retry-after": "0" } }) : new Response(JSON.stringify(ficha)))) as unknown as typeof fetch;
    const tienda = crearTienda({ fetchFn: fn, cache: cacheMemoria(), ahora: () => t });
    await tienda.consultar("x");
    falla = true;
    t += 10 * 60_000;
    const p = await tienda.consultar("x");
    expect(p?.precio).toBe(999);
    expect(p?.edadMin).toBe(10);
  }, 30000);

  it("con token shpat_, al fallar la tienda usa la API de administración", async () => {
    const pedidas: string[] = [];
    const fn = (async (url: string, init?: RequestInit) => {
      pedidas.push(url);
      if (url.includes("/admin/api/")) {
        expect(new Headers(init?.headers).get("x-shopify-access-token")).toBe("shpat_abc");
        return new Response(JSON.stringify({ products: [{ handle: "x", title: "X admin", status: "active", product_type: "Combos", tags: "", body_html: "<p>Hola</p>", variants: [{ id: 7, title: "D", price: "999.00", compare_at_price: null, inventory_quantity: 2, inventory_management: "shopify", inventory_policy: "deny" }] }] }));
      }
      return new Response("", { status: 429, headers: { "retry-after": "0" } });
    }) as unknown as typeof fetch;
    const p = await crearTienda({ fetchFn: fn, adminToken: "shpat_abc" }).consultar("x");
    expect(p).toMatchObject({ titulo: "X admin", precio: 999, disponible: true, descripcion: "Hola", variantes: [{ id: 7, precio: 999, disponible: true }] });
    expect(pedidas.at(-1)).toContain("/admin/api/");
  }, 30000);

  it("un token que no es shpat_ no se usa", async () => {
    const fn = (async () => new Response("", { status: 429, headers: { "retry-after": "0" } })) as unknown as typeof fetch;
    await expect(crearTienda({ fetchFn: fn, adminToken: "shpss_secreto" }).consultar("x")).rejects.toThrow("429");
  }, 30000);
});

describe("índice local del catálogo", () => {
  const items = [
    { h: "kit-listo-para-pescar-okuma-tundra-pro-7-topaz-pro", t: "Kit Listo para Pescar Okuma Tundra Pro 7'0\" + Topaz Pro 40", y: "Combos", g: "kit presa lobina", p: 1569, a: true },
    { h: "cana-blue-fox-portada-11", t: "Caña de Pescar Blue Fox Portada SP 11'0\" (3.30m)", y: "Cañas", g: "mar costa", p: 649, a: true },
    { h: "carrete-gimbel-s500", t: "Carrete Gimbel S500 Spinning", y: "Carretes", g: "", p: 419, a: false },
    { h: "rifle-gamo", t: "Rifle Gamo Black 1000", y: "Rifles de Aire", g: "", p: 3999, a: true },
  ];

  it("busca por palabras con tolerancia a acentos y plurales; disponibles primero", async () => {
    const { buscarEnIndice } = await import("../src/tienda");
    expect(buscarEnIndice(items, "cañas para mar").map((r) => r.handle)).toEqual(["cana-blue-fox-portada-11"]);
    expect(buscarEnIndice(items, "carretes spinning")[0]).toMatchObject({ handle: "carrete-gimbel-s500", disponible: false });
    expect(buscarEnIndice(items, "kit lobina")[0].handle).toBe("kit-listo-para-pescar-okuma-tundra-pro-7-topaz-pro");
    expect(buscarEnIndice(items, "rifle")[0]).toMatchObject({ restringido: true });
    expect(buscarEnIndice(items, "zapatos")).toEqual([]);
  });

  it("refrescarCatalogo descarga /products.json y buscar usa el índice sin pedir a Shopify", async () => {
    const pedidas: string[] = [];
    const fn = (async (url: string) => {
      pedidas.push(url);
      if (url.includes("/products.json")) {
        return new Response(JSON.stringify({ products: [{ handle: "x", title: "Caña Mar X", product_type: "Cañas", tags: ["mar"], variants: [{ price: "500.00", available: true }] }] }));
      }
      return new Response("", { status: 429, headers: { "retry-after": "0" } });
    }) as unknown as typeof fetch;
    const m = new Map<string, { valor: unknown; ts: number }>();
    const cache = { get: async (c: string) => m.get(c), put: async (c: string, valor: unknown, ts: number) => void m.set(c, { valor, ts }) };
    const tienda = crearTienda({ fetchFn: fn, cache });
    expect(await tienda.refrescarCatalogo()).toBe(1);
    const antes = pedidas.length;
    expect((await tienda.buscar("caña de mar")).map((r) => r.handle)).toEqual(["x"]);
    expect(pedidas.length).toBe(antes); // no salió a Shopify
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
