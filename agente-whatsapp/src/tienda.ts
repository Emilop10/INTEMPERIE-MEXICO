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

const HANDLE_VALIDO = /^[a-z0-9][a-z0-9-]{0,200}$/;

export function esRestringido(...textos: (string | undefined)[]): boolean {
  return textos.some((t) => t && RESTRINGIDO.test(t));
}

export function crearTienda(fetchFn: typeof fetch = fetch): Tienda {
  return {
    async consultar(handle) {
      handle = handle.trim().toLowerCase();
      if (!HANDLE_VALIDO.test(handle)) return null;
      const r = await fetchFn(`${TIENDA}/products/${handle}.js`, {
        headers: { accept: "application/json" },
      });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error(`La tienda respondió ${r.status} para ${handle}`);
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
      const url =
        `${TIENDA}/search/suggest.json?q=${encodeURIComponent(q)}` +
        "&resources%5Btype%5D=product&resources%5Blimit%5D=6";
      const r = await fetchFn(url, { headers: { accept: "application/json" } });
      if (!r.ok) throw new Error(`La búsqueda respondió ${r.status}`);
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
