import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
// @ts-expect-error: script .mjs sin tipos
import { armarConocimiento } from "../scripts/generar-conocimiento.mjs";
import { HANDLES_GUIA, INSTRUCCIONES } from "../src/generado/conocimiento";
import { esRestringido } from "../src/tienda";

describe("conocimiento del agente", () => {
  it("el archivo generado está al día con INSTRUCCIONES-AGENTE.md y la guía de ventas", () => {
    const actual = readFileSync("src/generado/conocimiento.ts", "utf8");
    expect(actual, "Corre `npm run conocimiento`").toBe(armarConocimiento());
  });

  it("lleva las reglas clave y los productos de la guía", () => {
    expect(INSTRUCCIONES).toContain("pasar_al_dueno");
    expect(INSTRUCCIONES).toContain("Envío:** gratis a todo México desde $799");
    expect(HANDLES_GUIA.length).toBeGreaterThanOrEqual(8);
    for (const h of HANDLES_GUIA) expect(h).toMatch(/^[a-z0-9-]+$/);
  });

  it("reconoce armas y diábolos, no cañas ni ópticas", () => {
    expect(esRestringido("Rifle Gamo Black 1000", "Rifles de Aire")).toBe(true);
    expect(esRestringido("Diábolo Gamo Rocket 4.5mm", "Diábolos y Municiones")).toBe(true);
    expect(esRestringido("Pistola Airsoft Walther P99 CO2", "Pistolas de Aire")).toBe(true);
    expect(esRestringido("Kit Listo para Pescar Okuma Revenger 7'0\"", "Kits")).toBe(false);
    expect(esRestringido("Mira Telescópica Nakashi 3-9x40", "Miras Telescópicas")).toBe(false);
    expect(esRestringido("Caña Okuma armada")).toBe(false);
  });
});
