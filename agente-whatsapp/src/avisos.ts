// Avisos al dueño, gratis: correo (Resend, plan gratis) y notificación al
// celular (ntfy.sh). El tema de ntfy es público para quien sepa su nombre,
// así que por ntfy nunca va un teléfono completo, un nombre ni el texto del
// cliente: solo el tema y el número enmascarado. El correo sí lleva el
// enlace al chat, porque llega a la bandeja privada del dueño.

export interface Aviso {
  titulo: string; // corto, sin datos personales
  resumen: string; // para ntfy: sin datos personales
  detalle: string; // para el correo: puede llevar el enlace wa.me y el texto
  urgente?: boolean;
}

export type Avisar = (aviso: Aviso) => Promise<void>;

export function crearAvisador(
  opciones: { resendApiKey?: string; correo: string; ntfyTema?: string },
  fetchFn: typeof fetch = fetch,
): Avisar {
  return async (aviso) => {
    const tareas: Promise<unknown>[] = [];
    if (opciones.ntfyTema) {
      tareas.push(
        fetchFn(`https://ntfy.sh/${encodeURIComponent(opciones.ntfyTema)}`, {
          method: "POST",
          headers: {
            Title: encodeHeader(aviso.titulo),
            Priority: aviso.urgente ? "high" : "default",
            Tags: aviso.urgente ? "rotating_light" : "fishing_pole_and_fish",
          },
          body: aviso.resumen,
        }).then(revisar("ntfy")),
      );
    }
    if (opciones.resendApiKey) {
      tareas.push(
        fetchFn("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            authorization: `Bearer ${opciones.resendApiKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            // onboarding@resend.dev solo entrega al correo dueño de la cuenta
            // de Resend; por eso la cuenta se abre con admin@intemperiemexico.com.
            from: "Agente WhatsApp <onboarding@resend.dev>",
            to: [opciones.correo],
            subject: `[Agente WhatsApp] ${aviso.titulo}`,
            text: aviso.detalle,
          }),
        }).then(revisar("correo")),
      );
    }
    const resultados = await Promise.allSettled(tareas);
    for (const r of resultados) {
      if (r.status === "rejected") console.error("Aviso fallido:", String(r.reason));
    }
  };
}

function revisar(canal: string) {
  return (r: Response) => {
    if (!r.ok) throw new Error(`${canal} respondió ${r.status}`);
  };
}

/** Los encabezados HTTP no aceptan acentos ni emojis; ntfy acepta RFC 2047. */
function encodeHeader(texto: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x20-\x7e]*$/.test(texto)) return texto;
  const bytes = new TextEncoder().encode(texto);
  let binario = "";
  for (const b of bytes) binario += String.fromCharCode(b);
  return `=?UTF-8?B?${btoa(binario)}?=`;
}
