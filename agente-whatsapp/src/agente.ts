// El agente: una vuelta de conversación con Claude y sus herramientas.
// No envía nada; devuelve qué hacer (responder, pasar al dueño o callarse)
// para que la conversación decida según el modo.

import type Anthropic from "@anthropic-ai/sdk";
import { INSTRUCCIONES } from "./generado/conocimiento";
import { linkDePago, type Tienda } from "./tienda";

type Beta = Anthropic.Beta.Messages.BetaMessage;
export type ParamsMensaje = Anthropic.Beta.Messages.MessageCreateParamsNonStreaming;
export type MensajeHistorial = Anthropic.Beta.Messages.BetaMessageParam;
export type LlamarClaude = (params: ParamsMensaje) => Promise<Beta>;

export const MOTIVOS = [
  "descuento",
  "apartado_o_tienda_fisica",
  "producto_no_en_linea",
  "pedido_o_queja",
  "ya_pago",
  "armas",
  "pide_persona",
  "otro",
] as const;
export type Motivo = (typeof MOTIVOS)[number];

export type Resultado =
  | { accion: "responder"; texto: string; linksPago: string[] }
  | { accion: "pasar"; motivo: Motivo; resumen: string; producto: string }
  | { accion: "nada"; motivo: string };

export interface Vuelta {
  resultado: Resultado;
  costoUsd: number;
  llamadas: number;
}

const HERRAMIENTAS: Anthropic.Beta.Messages.BetaTool[] = [
  {
    name: "consultar_producto",
    description:
      "Precio, existencia, variantes y link de ficha de un producto, leídos en vivo de intemperiemexico.com. Úsala antes de dar cualquier precio o decir que hay.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        handle: { type: "string", description: "Handle del producto, p. ej. combo-okuma-boundary-70-spinning" },
      },
      required: ["handle"],
      additionalProperties: false,
    },
  },
  {
    name: "buscar_producto",
    description:
      "Busca productos en la tienda en línea por palabra (señuelos, carretes, cañas, ópticas…). Devuelve hasta 6 con handle, precio y si hay.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { consulta: { type: "string", description: "Palabras de búsqueda en español" } },
      required: ["consulta"],
      additionalProperties: false,
    },
  },
  {
    name: "link_de_pago",
    description:
      "Arma el link de pago directo de un producto disponible, verificado en vivo. Es la única forma válida de obtener un link /cart/.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        handle: { type: "string" },
        variante_id: {
          type: "integer",
          description: "ID de la variante si el producto tiene varias; 0 si tiene una sola.",
        },
      },
      required: ["handle", "variante_id"],
      additionalProperties: false,
    },
  },
  {
    name: "pasar_al_dueno",
    description:
      "Pasa el chat a Emiliano (el dueño). El sistema le manda al cliente el mensaje de espera y avisa al dueño; tú ya no escribes nada más.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        motivo: { type: "string", enum: [...MOTIVOS] },
        resumen: {
          type: "string",
          description: "Una línea para el dueño: qué quiere el cliente. Sin nombres ni teléfonos.",
        },
        producto: { type: "string", description: "Producto del que se habla, o cadena vacía." },
      },
      required: ["motivo", "resumen", "producto"],
      additionalProperties: false,
    },
  },
  {
    name: "no_responder",
    description: "No contestar este mensaje: spam, groserías, sin sentido, o un cierre que no pide respuesta.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { motivo: { type: "string", enum: ["spam", "groseria", "sin_sentido", "cierre"] } },
      required: ["motivo"],
      additionalProperties: false,
    },
  },
];

// Internet: búsqueda y lectura de páginas, corridas por Anthropic. Sirven
// para investigar fichas técnicas, comparar modelos o explicar cómo se usa
// algo; precio y existencia salen solo de la tienda (INSTRUCCIONES-AGENTE.md).
// Mercado Libre se bloquea: aquí no se habla de él ni de sus precios.
const SIN_DOMINIOS = ["mercadolibre.com.mx", "mercadolibre.com", "mercadolibre.com.ar"];
export const HERRAMIENTAS_WEB: Anthropic.Beta.Messages.BetaToolUnion[] = [
  {
    type: "web_search_20260318",
    name: "web_search",
    max_uses: 3,
    blocked_domains: SIN_DOMINIOS,
    user_location: {
      type: "approximate",
      city: "Cuernavaca",
      region: "Morelos",
      country: "MX",
      timezone: "America/Mexico_City",
    },
    response_inclusion: "excluded",
  },
  {
    type: "web_fetch_20260209",
    name: "web_fetch",
    max_uses: 2,
    max_content_tokens: 8000,
    blocked_domains: SIN_DOMINIOS,
    citations: { enabled: true },
  },
];

const USD_POR_BUSQUEDA = 0.01; // $10 USD por 1,000 búsquedas

// USD por millón de tokens: entrada, salida, lectura de caché, escritura de caché (5 min).
const PRECIOS: Record<string, [number, number, number, number]> = {
  "claude-sonnet-5-5": [2, 10, 0.2, 2.5],
  "claude-sonnet-5": [2, 10, 0.2, 2.5],
  "claude-opus-5-5": [4, 20, 0.2, 5],
  "claude-haiku-5-5": [0.1, 0.5, 0.01, 0.125],
};

export function costoDeUso(modelo: string, uso: Beta["usage"]): number {
  const [ent, sal, lee, esc] = PRECIOS[modelo] ?? [5, 25, 0.5, 6.25];
  return (
    ((uso.input_tokens ?? 0) * ent +
      (uso.output_tokens ?? 0) * sal +
      (uso.cache_read_input_tokens ?? 0) * lee +
      (uso.cache_creation_input_tokens ?? 0) * esc) /
      1_000_000 +
    (uso.server_tool_use?.web_search_requests ?? 0) * USD_POR_BUSQUEDA
  );
}

const MAX_LLAMADAS = 5;
const DOMINIOS_PERMITIDOS = /^(https?:\/\/)?(www\.)?(intemperiemexico\.com|wa\.me)(\/|$)/i;

export async function atender(
  deps: { llamar: LlamarClaude; tienda: Tienda; modelo: string },
  entrada: { historial: MensajeHistorial[]; nuevos: string; contexto: string },
): Promise<Vuelta> {
  const mensajes: MensajeHistorial[] = [
    ...entrada.historial,
    { role: "user", content: entrada.nuevos },
    // Datos de esta vuelta (hora, horario, anuncio) como mensaje de sistema a
    // mitad de conversación: no rompe la caché de las instrucciones.
    { role: "system", content: entrada.contexto },
  ];
  const linksEmitidos = new Set<string>();
  let costoUsd = 0;
  let llamadas = 0;

  const fin = (resultado: Resultado): Vuelta => ({ resultado, costoUsd, llamadas });

  while (llamadas < MAX_LLAMADAS) {
    llamadas++;
    const r = await deps.llamar({
      model: deps.modelo,
      max_tokens: 4096,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      output_config: { effort: "low" },
      cache_control: { type: "ephemeral" },
      system: [{ type: "text", text: INSTRUCCIONES, cache_control: { type: "ephemeral" } }],
      tools: [...HERRAMIENTAS, ...HERRAMIENTAS_WEB],
      messages: mensajes,
    });
    costoUsd += costoDeUso(r.model ?? deps.modelo, r.usage);

    if (r.stop_reason === "refusal") {
      return fin({ accion: "pasar", motivo: "otro", resumen: "El asistente no pudo contestar este mensaje.", producto: "" });
    }

    // Una búsqueda larga puede pausar el turno: se reenvía tal cual y sigue.
    if (r.stop_reason === "pause_turn") {
      mensajes.push({ role: "assistant", content: r.content });
      continue;
    }

    const usos = r.content.filter((b) => b.type === "tool_use");
    if (r.stop_reason === "tool_use" && usos.length > 0) {
      const pasar = usos.find((b) => b.name === "pasar_al_dueno");
      if (pasar) {
        const i = pasar.input as { motivo: Motivo; resumen: string; producto: string };
        return fin({
          accion: "pasar",
          motivo: MOTIVOS.includes(i.motivo) ? i.motivo : "otro",
          resumen: String(i.resumen ?? "").slice(0, 300),
          producto: String(i.producto ?? "").slice(0, 120),
        });
      }
      const callar = usos.find((b) => b.name === "no_responder");
      if (callar) return fin({ accion: "nada", motivo: String((callar.input as { motivo: string }).motivo) });

      const resultados = await Promise.all(
        usos.map(async (b): Promise<Anthropic.Beta.Messages.BetaToolResultBlockParam> => {
          try {
            const salida = await ejecutarHerramienta(deps.tienda, b.name, b.input, linksEmitidos);
            return { type: "tool_result", tool_use_id: b.id, content: JSON.stringify(salida) };
          } catch (e) {
            return {
              type: "tool_result",
              tool_use_id: b.id,
              is_error: true,
              content: `No se pudo consultar la tienda: ${String(e).slice(0, 200)}`,
            };
          }
        }),
      );
      mensajes.push({ role: "assistant", content: r.content });
      mensajes.push({ role: "user", content: resultados });
      continue;
    }

    const texto = textoFinal(r.content);
    if (!texto) {
      return fin({ accion: "pasar", motivo: "otro", resumen: "El asistente no generó respuesta.", producto: "" });
    }
    const problema = revisarLinks(texto, linksEmitidos);
    if (problema) {
      return fin({ accion: "pasar", motivo: "otro", resumen: problema, producto: "" });
    }
    // Lo investigado en internet se atribuye a su fuente (sin link: no se
    // mandan links de otros sitios).
    const fuentes = fuentesCitadas(r.content);
    const conFuente = fuentes.length ? `${texto.slice(0, 1400)}\n\nFuente: ${fuentes.join(", ")}` : texto.slice(0, 1500);
    return fin({
      accion: "responder",
      texto: conFuente,
      linksPago: [...linksEmitidos].filter((l) => texto.includes(l)),
    });
  }
  return fin({
    accion: "pasar",
    motivo: "otro",
    resumen: "El asistente dio demasiadas vueltas sin contestar.",
    producto: "",
  });
}

type Bloque = Beta["content"][number];

/**
 * El texto para el cliente: lo que Claude escribió después de su última
 * búsqueda o lectura (antes suele haber un "déjame buscar…"). Las citas
 * parten el texto en varios bloques, así que se unen sin separador.
 */
export function textoFinal(contenido: Bloque[]): string {
  let desde = 0;
  contenido.forEach((b, i) => {
    if (b.type !== "text" && b.type !== "thinking" && b.type !== "redacted_thinking") desde = i + 1;
  });
  return contenido
    .slice(desde)
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
}

/** Dominios citados en la respuesta (máximo 2), p. ej. "okuma.com". */
export function fuentesCitadas(contenido: Bloque[]): string[] {
  const dominios = new Set<string>();
  for (const b of contenido) {
    if (b.type !== "text" || !b.citations) continue;
    for (const c of b.citations) {
      const url = "url" in c && typeof c.url === "string" ? c.url : null;
      if (!url) continue;
      try {
        const host = new URL(url).hostname.replace(/^www\./, "");
        if (!/intemperiemexico\.com$/.test(host)) dominios.add(host);
      } catch {
        // URL rara: se ignora
      }
    }
  }
  return [...dominios].slice(0, 2);
}

/** Ningún link de pago inventado y ningún dominio ajeno. */
export function revisarLinks(texto: string, linksEmitidos: Set<string>): string | null {
  const urls = texto.match(/(https?:\/\/[^\s)>\]]+|(?:www\.)?[a-z0-9-]+\.(?:com|mx|me|net|org)\/[^\s)>\]]*)/gi) ?? [];
  for (const crudo of urls) {
    const url = crudo.replace(/[.,;:!?]+$/, "");
    if (!DOMINIOS_PERMITIDOS.test(url)) return `La respuesta traía un link ajeno a la tienda (${url.slice(0, 60)}).`;
    if (/\/cart\//i.test(url)) {
      const normal = url.startsWith("http") ? url : `https://${url}`;
      if (!linksEmitidos.has(normal.replace("://www.", "://"))) {
        return "La respuesta traía un link de pago que no verificó la tienda.";
      }
    }
  }
  return null;
}

export async function ejecutarHerramienta(
  tienda: Tienda,
  nombre: string,
  entrada: unknown,
  linksEmitidos: Set<string>,
): Promise<unknown> {
  const i = (entrada ?? {}) as Record<string, unknown>;
  switch (nombre) {
    case "consultar_producto": {
      const p = await tienda.consultar(String(i.handle ?? ""));
      if (!p) return { encontrado: false, nota: "No existe en la tienda en línea con ese handle. Prueba buscar_producto." };
      if (p.restringido) {
        return { encontrado: true, restringido: true, nota: "No se ofrece por este canal: usa pasar_al_dueno con motivo armas." };
      }
      return {
        encontrado: true,
        titulo: p.titulo,
        precio: p.precio,
        precio_antes: p.precioAntes,
        disponible: p.disponible,
        ficha: p.ficha,
        descripcion: p.descripcion || undefined,
        envio: p.precio >= 799 ? "gratis" : "$189",
        variantes:
          p.variantes.length > 1
            ? p.variantes.map((v) => ({ id: v.id, titulo: v.titulo, precio: v.precio, disponible: v.disponible }))
            : undefined,
      };
    }
    case "buscar_producto": {
      const lista = await tienda.buscar(String(i.consulta ?? ""));
      return {
        resultados: lista.map((p) =>
          p.restringido
            ? { titulo: p.titulo, restringido: true }
            : { handle: p.handle, titulo: p.titulo, precio: p.precio, disponible: p.disponible },
        ),
        nota: lista.length === 0 ? "Sin resultados en la tienda en línea; puede estar en la tienda física (pasar_al_dueno)." : undefined,
      };
    }
    case "link_de_pago": {
      const p = await tienda.consultar(String(i.handle ?? ""));
      if (!p) return { error: "Ese producto no existe en la tienda en línea." };
      if (p.restringido) return { error: "No se vende por este canal: usa pasar_al_dueno con motivo armas." };
      const id = Number(i.variante_id ?? 0);
      let variante = id > 0 ? p.variantes.find((v) => v.id === id) : undefined;
      if (id > 0 && !variante) return { error: "Esa variante no es de este producto." };
      if (!variante) {
        const disponibles = p.variantes.filter((v) => v.disponible);
        if (p.variantes.length > 1 && disponibles.length > 1) {
          return {
            error: "Tiene varias variantes; pregunta cuál quiere y vuelve a pedir el link con su variante_id.",
            variantes: disponibles.map((v) => ({ id: v.id, titulo: v.titulo, precio: v.precio })),
          };
        }
        variante = disponibles[0] ?? p.variantes[0];
      }
      if (!variante || !variante.disponible) return { error: "Agotado: no lo ofrezcas; ofrece otro que sí haya." };
      const link = linkDePago(variante.id);
      linksEmitidos.add(link);
      return { link, titulo: p.titulo, variante: variante.titulo, precio: variante.precio, envio: variante.precio >= 799 ? "gratis" : "$189" };
    }
    default:
      return { error: `Herramienta desconocida: ${nombre}` };
  }
}

