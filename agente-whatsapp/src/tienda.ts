// Consultas en vivo a la tienda (solo lectura, sin credenciales):
// /products/<handle>.js y /search/suggest.json de Shopify.

export const TIENDA = "https://intemperiemexico.com";

// Armas, municiones, diábolos y rifles o pistolas de aire no se venden por
// este canal sin el dueño (RESPONDEDOR-MENSAJES.md, sección 4).
const RESTRINGIDO =
  /\b(rifle|rifles|pistola|pistolas|carabina|diábolo|diabolo|diábolos|diabolos|munici[oó]n|municiones|balin|balín|balines|airsoft|aire comprimido|pcp|co2|escopeta|arma|armas)\b/i;

export interface Variante {
  id: number;
  titulo: string;
  precio: number; // pesos
  disponible: boolean;
}

export interface Producto {
  handle: string;
  titulo: string;
  precio: number; // pesos
  precioAntes: number | null;
  disponible: boolean;
  restringido: boolean;
  ficha: string;
  descripcion: string; // texto de la ficha, sin HTML, recortado
  variantes: Variante[];
  edadMin?: number; // si es una copia vieja porque Shopify no respondió
}

export interface Resultado {
  handle: string;
  titulo: string;
  precio: number;
  disponible: boolean;
  restringido: boolean;
}

export interface Tienda {
  consultar(handle: string): Promise<Producto | null>;
  buscar(consulta: string): Promise<Resultado[]>;
  /** Vuelve a leer una ficha aunque la caché esté fresca (para el cron). */
  refrescar(handle: string): Promise<Producto | null>;
  /** Descarga el catálogo completo (/products.json) y lo guarda como índice de búsqueda. */
  refrescarCatalogo(): Promise<number>;
}

/** Un producto del índice local (compacto: cabe el catálogo entero en la caché). */
export interface ItemCatalogo {
  h: string; // handle
  t: string; // título
  y: string; // tipo
  g: string; // etiquetas (recortadas)
  p: number; // precio mínimo
  a: boolean; // disponible
}
const CLAVE_CATALOGO = "catalogo";
export const CATALOGO_FRESCO_MS = 30 * 60_000;

/** Caché persistente del catálogo (vive en el Durable Object de control). */
export interface CacheCatalogo {
  get(clave: string): Promise<{ valor: unknown; ts: number } | undefined>;
  put(clave: string, valor: unknown, ts: number): Promise<void>;
}

export interface OpcionesTienda {
  fetchFn?: typeof fetch;
  cache?: CacheCatalogo;
  /** Token de administración de Shopify (`shpat_…`): vía sin límite por IP. */
  adminToken?: string;
  ahora?: () => number;
}

// Shopify limita por dirección IP, y las de salida de Cloudflare Workers son
// compartidas: a veces responde 403 (sin User-Agent) o 429 (demasiadas
// peticiones), incluso tras reintentos (verificado el 28 y 29 oct). Defensas:
// 1) User-Agent de navegador, reintentos con espera y el dominio
//    myshopify.com como segunda vía;
// 2) caché persistente del catálogo: fresca 2 min, y si Shopify falla se
//    usa la última copia (hasta 24 h) diciendo su edad;
// 3) si hay token de administración, la API de Shopify, que no limita por IP.
const ENCABEZADOS = {
  accept: "application/json",
  "accept-language": "es-MX,es;q=0.9",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
};
const MYSHOPIFY = "https://wfuxvx-yn.myshopify.com";
const DOMINIOS = [TIENDA, MYSHOPIFY];
const API_ADMIN = "2024-10";
const FRESCO_MS = 2 * 60_000;
const VIEJO_MAX_MS = 24 * 3600_000;
const ESPERAS_MS = [1500, 3000];

const HANDLE_VALIDO = /^[a-z0-9][a-z0-9-]{0,200}$/;

export function esRestringido(...textos: (string | undefined)[]): boolean {
  return textos.some((t) => t && RESTRINGIDO.test(t));
}

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Minúsculas, sin acentos, solo letras y números. */
export function normalizarTexto(t: string): string {
  return t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/(\d)[.,](\d)/g, "$1$2") // 0.40 y 0,40 -> 040, para que "0.40mm" case con "0.40"
    .replace(/[^a-z0-9ñ]+/g, " ")
    .trim();
}

const raiz = (palabra: string) => palabra.replace(/(es|s)$/, "");

/**
 * Búsqueda local en el índice: cada palabra de la consulta suma puntos si
 * aparece en el título (3), el tipo (2), las etiquetas o el handle (1), con
 * tolerancia a plural y a prefijos (desde 4 letras). Disponibles primero.
 */
export function buscarEnIndice(items: ItemCatalogo[], consulta: string, limite = 6): Resultado[] {
  const palabras = normalizarTexto(consulta)
    .split(" ")
    .filter((w) => w.length >= 2 && !["de", "la", "el", "para", "un", "una", "con", "y", "o", "en"].includes(w))
    .map(raiz);
  if (!palabras.length) return [];
  const puntuados = items
    .map((it) => {
      const campos: [string, number][] = [
        [normalizarTexto(it.t), 3],
        [normalizarTexto(it.y), 2],
        [normalizarTexto(`${it.g} ${it.h}`), 1],
      ];
      let puntos = 0;
      for (const w of palabras) {
        for (const [texto, valor] of campos) {
          const tokens = texto.split(" ").map(raiz);
          if (tokens.includes(w)) puntos += valor;
          else if (w.length >= 4 && tokens.some((tk) => tk.startsWith(w) || w.startsWith(tk) && tk.length >= 4)) puntos += valor / 2;
        }
      }
      return { it, puntos };
    })
    .filter((x) => x.puntos > 0)
    .sort((x, y) => Number(y.it.a) - Number(x.it.a) || y.puntos - x.puntos || x.it.p - y.it.p);
  return puntuados.slice(0, limite).map(({ it }) => ({
    handle: it.h,
    titulo: it.t,
    precio: it.p,
    disponible: it.a,
    restringido: esRestringido(it.t, it.y, it.g),
  }));
}

/** Pide una ruta pública de la tienda con reintentos y dominio alterno. */
async function pedir(fetchFn: typeof fetch, ruta: string): Promise<Response> {
  let ultimo = 0;
  for (const dominio of DOMINIOS) {
    for (let intento = 0; intento <= ESPERAS_MS.length; intento++) {
      const r = await fetchFn(`${dominio}${ruta}`, { headers: ENCABEZADOS });
      if (r.ok || r.status === 404) return r;
      ultimo = r.status;
      if (r.status !== 429 && r.status !== 403 && r.status < 500) break;
      if (intento < ESPERAS_MS.length) {
        const retryAfter = Number(r.headers.get("retry-after")) * 1000;
        await dormir(Math.min(Math.max(ESPERAS_MS[intento], retryAfter || 0), 5000));
      }
    }
  }
  throw new Error(`La tienda respondió ${ultimo} para ${ruta.split("?")[0]}`);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function productoDeJs(p: any): Producto {
  const tags: string = Array.isArray(p.tags) ? p.tags.join(" ") : String(p.tags ?? "");
  return {
    handle: p.handle,
    titulo: p.title,
    precio: p.price / 100,
    precioAntes: p.compare_at_price ? p.compare_at_price / 100 : null,
    disponible: Boolean(p.available),
    restringido: esRestringido(p.title, p.type, tags),
    ficha: `${TIENDA}/products/${p.handle}`,
    descripcion: textoPlano(String(p.description ?? "")).slice(0, 1500),
    variantes: (p.variants ?? []).map((v: any) => ({
      id: Number(v.id),
      titulo: v.title,
      precio: v.price / 100,
      disponible: Boolean(v.available),
    })),
  };
}

/** Producto de la API de administración (REST). */
function productoDeAdmin(p: any): Producto {
  const activo = p.status === "active";
  const variantes: Variante[] = (p.variants ?? []).map((v: any) => ({
    id: Number(v.id),
    titulo: v.title,
    precio: Number(v.price),
    disponible:
      activo && (v.inventory_management == null || v.inventory_policy === "continue" || Number(v.inventory_quantity ?? 0) > 0),
  }));
  const primera = variantes[0];
  const antes = Number((p.variants ?? [])[0]?.compare_at_price ?? 0);
  return {
    handle: p.handle,
    titulo: p.title,
    precio: primera ? Math.min(...variantes.map((v) => v.precio)) : 0,
    precioAntes: antes > 0 ? antes : null,
    disponible: variantes.some((v) => v.disponible),
    restringido: esRestringido(p.title, p.product_type, String(p.tags ?? "")),
    ficha: `${TIENDA}/products/${p.handle}`,
    descripcion: textoPlano(String(p.body_html ?? "")).slice(0, 1500),
    variantes,
  };
}

async function consultarAdmin(fetchFn: typeof fetch, token: string, handle: string): Promise<Producto | null> {
  const r = await fetchFn(
    `${MYSHOPIFY}/admin/api/${API_ADMIN}/products.json?handle=${encodeURIComponent(handle)}&fields=id,title,handle,body_html,product_type,tags,status,variants`,
    { headers: { "X-Shopify-Access-Token": token, accept: "application/json" } },
  );
  if (!r.ok) throw new Error(`La API de Shopify respondió ${r.status}`);
  const d: any = await r.json();
  const p = (d.products ?? [])[0];
  return p ? productoDeAdmin(p) : null;
}

async function buscarAdmin(fetchFn: typeof fetch, token: string, q: string): Promise<Resultado[]> {
  const consulta = q.replace(/["\\]/g, " ");
  const r = await fetchFn(`${MYSHOPIFY}/admin/api/${API_ADMIN}/graphql.json`, {
    method: "POST",
    headers: { "X-Shopify-Access-Token": token, "content-type": "application/json" },
    body: JSON.stringify({
      query: `{ products(first: 6, query: ${JSON.stringify(consulta)}) { edges { node { handle title status productType totalInventory variants(first: 1) { edges { node { price availableForSale } } } } } } }`,
    }),
  });
  if (!r.ok) throw new Error(`La API de Shopify respondió ${r.status}`);
  const d: any = await r.json();
  return (d?.data?.products?.edges ?? []).map(({ node: n }: any) => {
    const v = n.variants?.edges?.[0]?.node;
    return {
      handle: n.handle,
      titulo: n.title,
      precio: Number(v?.price ?? 0),
      disponible: n.status === "ACTIVE" && Boolean(v?.availableForSale),
      restringido: esRestringido(n.title, n.productType),
    };
  });
}

export function crearTienda(opciones: OpcionesTienda | typeof fetch = {}): Tienda {
  const o: OpcionesTienda = typeof opciones === "function" ? { fetchFn: opciones } : opciones;
  const fetchFn = o.fetchFn ?? fetch;
  const ahora = o.ahora ?? (() => Date.now());
  const adminToken = o.adminToken?.startsWith("shpat_") ? o.adminToken : undefined;

  /** Fresco de caché → en vivo → API con token → copia vieja (con edad). */
  async function conCache<T>(clave: string, enVivo: () => Promise<T>, admin?: () => Promise<T>, forzar = false): Promise<T> {
    const t = ahora();
    const guardado = o.cache ? await o.cache.get(clave) : undefined;
    if (guardado && !forzar && t - guardado.ts < FRESCO_MS) return guardado.valor as T;
    const fuentes = [enVivo, ...(admin ? [admin] : [])];
    let error: unknown = new Error("sin fuente");
    for (const fuente of fuentes) {
      try {
        const valor = await fuente();
        if (o.cache) await o.cache.put(clave, valor, t);
        return valor;
      } catch (e) {
        error = e;
      }
    }
    if (guardado && t - guardado.ts < VIEJO_MAX_MS) {
      const valor = guardado.valor as T;
      const edadMin = Math.round((t - guardado.ts) / 60_000);
      console.error(`Tienda sin respuesta (${String(error).slice(0, 80)}); se usa copia de hace ${edadMin} min para ${clave}`);
      return valor && typeof valor === "object" && !Array.isArray(valor) ? ({ ...(valor as object), edadMin } as T) : valor;
    }
    throw error;
  }

  async function consultar(handle: string, forzar: boolean): Promise<Producto | null> {
    handle = handle.trim().toLowerCase();
    if (!HANDLE_VALIDO.test(handle)) return null;
    return conCache<Producto | null>(
      `producto:${handle}`,
      async () => {
        const r = await pedir(fetchFn, `/products/${handle}.js`);
        return r.status === 404 ? null : productoDeJs(await r.json());
      },
      adminToken ? () => consultarAdmin(fetchFn, adminToken, handle) : undefined,
      forzar,
    );
  }

  return {
    consultar: (h) => consultar(h, false),
    refrescar: (h) => consultar(h, true),

    async refrescarCatalogo() {
      const items: ItemCatalogo[] = [];
      for (let pagina = 1; pagina <= 4; pagina++) {
        const r = await pedir(fetchFn, `/products.json?limit=250&page=${pagina}`);
        if (r.status === 404) break;
        const d: any = await r.json();
        const productos: any[] = d?.products ?? [];
        for (const p of productos) {
          const variantes: any[] = p.variants ?? [];
          items.push({
            h: p.handle,
            t: p.title,
            y: p.product_type ?? "",
            g: (Array.isArray(p.tags) ? p.tags.join(" ") : String(p.tags ?? "")).slice(0, 80),
            p: variantes.length ? Math.min(...variantes.map((v) => Number(v.price))) : 0,
            a: variantes.some((v) => v.available),
          });
        }
        if (productos.length < 250) break;
        await dormir(1500);
      }
      if (items.length && o.cache) await o.cache.put(CLAVE_CATALOGO, items, ahora());
      return items.length;
    },

    async buscar(consulta) {
      const q = consulta.trim().slice(0, 80);
      if (!q) return [];
      // Primero el índice local (no depende de Shopify en el momento).
      const indice = o.cache ? await o.cache.get(CLAVE_CATALOGO) : undefined;
      if (indice && ahora() - indice.ts < VIEJO_MAX_MS) {
        const encontrados = buscarEnIndice(indice.valor as ItemCatalogo[], q);
        if (encontrados.length) return encontrados;
      }
      return conCache<Resultado[]>(
        `buscar:${q.toLowerCase()}`,
        async () => {
          const r = await pedir(
            fetchFn,
            `/search/suggest.json?q=${encodeURIComponent(q)}&resources%5Btype%5D=product&resources%5Blimit%5D=6`,
          );
          if (r.status === 404) return [];
          const d: any = await r.json();
          return (d?.resources?.results?.products ?? []).map((p: any) => ({
            handle: p.handle,
            titulo: p.title,
            precio: Number(p.price),
            disponible: Boolean(p.available),
            restringido: esRestringido(p.title, p.type),
          }));
        },
        adminToken ? () => buscarAdmin(fetchFn, adminToken, q) : undefined,
      );
    },
  };
}

/** HTML de la ficha a texto simple. */
export function textoPlano(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|li|h[1-6]|div|tr)>|<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

/** Link de pago directo (GUIA-VENTAS-WHATSAPP.md, sección 3). */
export function linkDePago(varianteId: number): string {
  return `${TIENDA}/cart/${varianteId}:1`;
}
