// Utilidades pequeñas: hora de México, enmascarar teléfonos y HMAC.

const ZONA = "America/Mexico_City";

/** Fecha y hora en Ciudad de México, para el contexto del agente y los topes. */
export function horaMexico(ahora: number): {
  fecha: string; // 2026-10-28
  mes: string; // 2026-10
  hora: number; // 0-23
  texto: string; // "martes 28 de octubre, 14:05"
} {
  const d = new Date(ahora);
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: ZONA,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  );
  const texto = new Intl.DateTimeFormat("es-MX", {
    timeZone: ZONA,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(d);
  return {
    fecha: `${partes.year}-${partes.month}-${partes.day}`,
    mes: `${partes.year}-${partes.month}`,
    hora: Number(partes.hour),
    texto,
  };
}

/** El dueño contesta de 9:00 a 22:00 (GUIA-VENTAS-WHATSAPP.md, sección 1). */
export function enHorario(ahora: number): boolean {
  const { hora } = horaMexico(ahora);
  return hora >= 9 && hora < 22;
}

/** 5217773277340 -> 52177***7340. Para registros y avisos por ntfy. */
export function enmascarar(id: string): string {
  if (id.length <= 6) return "***";
  return `${id.slice(0, 5)}***${id.slice(-4)}`;
}

export async function hmacSha256Hex(secreto: string, cuerpo: ArrayBuffer | Uint8Array): Promise<string> {
  const llave = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secreto),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const firma = await crypto.subtle.sign("HMAC", llave, cuerpo);
  return [...new Uint8Array(firma)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compara en tiempo constante dos cadenas hex. */
export function igualesSeguro(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}
