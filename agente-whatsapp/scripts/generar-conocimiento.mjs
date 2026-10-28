// Arma src/generado/conocimiento.ts con las instrucciones del agente y el
// guion de venta (secciones 2 a 4 de GUIA-VENTAS-WHATSAPP.md). Se corre con
// `npm run conocimiento` cada vez que cambie cualquiera de los dos archivos;
// la prueba `conocimiento.test.ts` falla si el generado quedó viejo.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "..");

export function armarConocimiento() {
  const instrucciones = readFileSync(join(raiz, "INSTRUCCIONES-AGENTE.md"), "utf8").trim();
  const guia = readFileSync(join(raiz, "..", "GUIA-VENTAS-WHATSAPP.md"), "utf8");
  const inicio = guia.indexOf("## 2.");
  const fin = guia.indexOf("## 5.");
  if (inicio < 0 || fin < 0) throw new Error("GUIA-VENTAS-WHATSAPP.md ya no tiene las secciones 2 a 4");
  const guion = guia.slice(inicio, fin).trim();
  const handles = [...new Set([...guion.matchAll(/intemperiemexico\.com\/products\/([a-z0-9-]+)/g)].map((m) => m[1]))];
  const texto = `${instrucciones}\n\n# Guion de venta de la tienda (GUIA-VENTAS-WHATSAPP.md)\n\n${guion}\n`;
  return (
    "// Generado por scripts/generar-conocimiento.mjs. No editar a mano.\n" +
    `export const INSTRUCCIONES = ${JSON.stringify(texto)};\n` +
    `export const HANDLES_GUIA: readonly string[] = ${JSON.stringify(handles)};\n`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(join(raiz, "src", "generado", "conocimiento.ts"), armarConocimiento());
  console.log("src/generado/conocimiento.ts actualizado");
}
