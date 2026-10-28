import { describe, expect, it } from "vitest";
import { Control } from "../src/control";
import { AlmacenMemoria, MEDIODIA } from "./ayudas";

const topes = { claudeMesUsd: 90, claudeDiaUsd: 5, mensajesKapsoMes: 1900, respuestasMetaMes: 950 };
const DIA = 24 * 3600_000;

describe("topes", () => {
  it("se detiene en el tope diario y vuelve al día siguiente", async () => {
    const c = new Control(new AlmacenMemoria(), topes);
    await c.registrar({ costoUsd: 5 }, MEDIODIA);
    expect(await c.verificar(MEDIODIA)).toEqual({ ok: false, motivo: expect.stringContaining("del día"), avisar: true });
    expect(await c.verificar(MEDIODIA + 1000)).toMatchObject({ ok: false, avisar: false });
    expect(await c.verificar(MEDIODIA + DIA)).toEqual({ ok: true });
  });

  it("cuenta los mensajes de Kapso (entran y salen) y las respuestas de Meta", async () => {
    const c = new Control(new AlmacenMemoria(), { ...topes, mensajesKapsoMes: 3, respuestasMetaMes: 2 });
    await c.registrar({ entradas: 1 }, MEDIODIA);
    await c.registrar({ salidas: 1 }, MEDIODIA);
    expect(await c.verificar(MEDIODIA)).toEqual({ ok: true });
    await c.registrar({ salidas: 1 }, MEDIODIA);
    expect(await c.verificar(MEDIODIA)).toMatchObject({ ok: false, motivo: expect.stringContaining("Kapso") });
  });

  it("empieza de cero el mes siguiente", async () => {
    const c = new Control(new AlmacenMemoria(), topes);
    await c.registrar({ costoUsd: 95 }, MEDIODIA);
    expect((await c.verificar(MEDIODIA)).ok).toBe(false);
    expect(await c.verificar(MEDIODIA + 5 * DIA)).toEqual({ ok: true }); // 2 de noviembre
  });
});
