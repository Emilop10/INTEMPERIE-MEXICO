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
}

export interface Tienda {
  consultar(handle: string): Promise<Producto | null>;
  buscar(consulta: string): Promise<
    { handle: string; titulo: string; precio: number; disponible: boolean; restringido: boolean }[]
  >;
}

// Shopify limita por dirección IP, y las de salida de Cloudflare Workers son
// compartidas: a veces responde 403 (sin User-Agent) o 429 (demasiadas
// peticiones). Verificado el 28 y 29 oct. Defensas: User-Agent de navegador,
// reintentos con espera, el dominio myshopify.com como segunda vía y caché
// de 2 minutos por URL en Cloudflare.
const ENCABEZADOS = {
  accept: "application/json",
  "accept-language": "es-MX,es;q=0.9",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
};
const DOMINIOS = [TIENDA, "https://wfuxvx-yn.myshopify.com"];
const CACHE_SEGUNDOS = 120;
const ESPERAS_MS = [1500, 3000];

const HANDLE_VALIDO = /^[a-z0-9][a-z0-9-]{0,200}$/;

export function esRestringido(...textos: (string | undefined)[]): boolean {
  return textos.some((t) => t && RESTRINGIDO.test(t));
}

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Pide una ruta de la tienda (`/products/x.js`, `/search/suggest.json?…`)
 * con caché, reintentos y dominio alterno. Devuelve la respuesta o lanza.
 */
async function pedir(fetchFn: typeof fetch, ruta: string): Promise<Response> {
  const cache = (globalThis as { caches?: { default: Cache } }).caches?.default;
  const llave = new Request(`${TIENDA}${ruta}`);
  if (cache) {
    const guardada = await cache.match(llave);
    if (guardada) return guardada;
  }
  let ultimo = 0;
  for (const dominio of DOMINIOS) {
    for (let intento = 0; intento <= ESPERAS_MS.length; intento++) {
      const r = await fetchFn(`${dominio}${ruta}`, { headers: ENCABEZADOS });
      if (r.ok || r.status === 404) {
        if (r.ok && cache) {
          const copia = new Response(await r.clone().arrayBuffer(), {
            status: 200,
            headers: { "content-type": "application/json", "cache-control": `public, max-age=${CACHE_SEGUNDOS}` },
          });
          await cache.put(llave, copia);
        }
        return r;
      }
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

export function crearTienda(fetchFn: typeof fetch = fetch): Tienda {
  return {
    async consultar(handle) {
      handle = handle.trim().toLowerCase();
      if (!HANDLE_VALIDO.test(handle)) return null;
      const r = await pedir(fetchFn, `/products/${handle}.js`);
      if (r.status === 404) return null;
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const p: any = await r.json();
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
    },

    async buscar(consulta) {
      const q = consulta.trim().slice(0, 80);
      if (!q) return [];
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
