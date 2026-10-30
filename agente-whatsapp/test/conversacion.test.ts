import { describe, expect, it } from "vitest";
import { TEXTOS } from "../src/conversacion";
import {
  AlmacenMemoria,
  armarConversacion,
  claudeConGuion,
  config,
  herramienta,
  MEDIODIA,
  mensaje,
  NOCHE,
  producto,
  texto,
  tiendaFalsa,
} from "./ayudas";

const ESPERA = 8_000;
const HORA = 3600_000;

describe("conversación", () => {
  it("junta 3 mensajes seguidos y contesta una sola vez", async () => {
    const claude = claudeConGuion([texto("¡Hola! ¿Qué tipo de pesca haces?")]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("Hola"), MEDIODIA);
    await conv.recibir(mensaje("buenas tardes"), MEDIODIA + 2000);
    await conv.recibir(mensaje("info del kit"), MEDIODIA + 4000);
    await conv.alarma(MEDIODIA + 4000 + ESPERA);
    expect(claude.llamadas).toHaveLength(1);
    const ultimoCliente = claude.llamadas[0].messages.at(-2);
    expect(ultimoCliente).toEqual({ role: "user", content: "Hola\nbuenas tardes\ninfo del kit" });
    expect(enviados).toEqual([{ destino: { to: "5217771112222" }, texto: "¡Hola! ¿Qué tipo de pesca haces?" }]);
  });

  it("no contesta antes de que pase la espera ni dos veces el mismo mensaje", async () => {
    const claude = claudeConGuion([texto("Hola")]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("Hola", "id-1"), MEDIODIA);
    await conv.recibir(mensaje("Hola", "id-1"), MEDIODIA + 1000); // reintento de Meta
    await conv.alarma(MEDIODIA + 1000);
    expect(enviados).toHaveLength(0);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(claude.llamadas[0].messages.at(-2)).toEqual({ role: "user", content: "Hola" });
    expect(enviados).toHaveLength(1);
  });

  it("en modo borrador no envía nada y manda la propuesta al dueño", async () => {
    const claude = claudeConGuion([texto("Te recomiendo el Kit Revenger")]);
    const { conv, enviados, avisos } = armarConversacion({ claude, config: config({ AGENTE_MODO: "borrador" }) });
    await conv.recibir(mensaje("¿Qué kit me recomiendas?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados).toHaveLength(0);
    expect(avisos).toHaveLength(1);
    expect(avisos[0].titulo).toBe("Borrador de respuesta");
    expect(avisos[0].detalle).toContain("Te recomiendo el Kit Revenger");
    expect(avisos[0].detalle).toContain("https://wa.me/5217771112222");
    // Por ntfy no va el teléfono completo ni el texto del cliente.
    expect(avisos[0].resumen).not.toContain("5217771112222");
    expect(avisos[0].resumen).not.toContain("kit");
  });

  it("en borrador la respuesta se anota como no enviada y se puede mandar al activar", async () => {
    const claude = claudeConGuion([texto("Te recomiendo el Kit Revenger")]);
    const almacenControl = new AlmacenMemoria();
    const b = armarConversacion({ claude, config: config({ AGENTE_MODO: "borrador" }), almacenControl });
    await b.conv.recibir(mensaje("¿Qué kit me recomiendas?"), MEDIODIA);
    await b.conv.alarma(MEDIODIA + ESPERA);
    expect(b.enviados).toHaveLength(0);
    expect((await b.almacen.get<any>("estado")).historial.at(-1).content).toMatch(/^\[Borrador, no enviado\]/);
    expect(Object.keys(await b.control.listarBorradores())).toEqual(["5217771112222"]);
    // Se activa: el mismo chat (mismo almacén) manda el borrador dentro de las 24 h.
    const a = armarConversacion({ claude, config: config({ AGENTE_MODO: "activo" }), almacenControl });
    (a as any).almacen = b.almacen;
    const activa = new (await import("../src/conversacion")).Conversacion({ ...(a.conv as any).d, almacen: b.almacen, control: a.control, enviar: async (d: any, t: string) => void a.enviados.push({ destino: d, texto: t }) });
    expect(await activa.enviarBorrador(MEDIODIA + 3 * HORA)).toBe("enviado");
    expect(a.enviados.map((x) => x.texto)).toEqual(["Te recomiendo el Kit Revenger"]);
    expect((await b.almacen.get<any>("estado")).historial.at(-1).content).toBe("Te recomiendo el Kit Revenger");
    expect(await a.control.listarBorradores()).toEqual({});
    // Fuera de 24 h no se manda.
    const c = armarConversacion({ claude: claudeConGuion([texto("Hola")]), config: config({ AGENTE_MODO: "borrador" }), almacenControl });
    await c.conv.recibir(mensaje("hola", undefined, "5217779998888"), MEDIODIA);
    await c.conv.alarma(MEDIODIA + ESPERA);
    const tarde = new (await import("../src/conversacion")).Conversacion({ ...(c.conv as any).d, config: config({ AGENTE_MODO: "activo" }) });
    expect(await tarde.enviarBorrador(MEDIODIA + 30 * HORA)).toBe("fuera_de_ventana");
  });

  it("en modo prueba solo contesta a los números de prueba", async () => {
    const claude = claudeConGuion([texto("Hola dueño"), texto("Hola cliente")]);
    const cfg = config({ AGENTE_MODO: "prueba", NUMEROS_PRUEBA: "52 1 777 999 0000" });
    const dueno = armarConversacion({ claude, config: cfg });
    await dueno.conv.recibir(mensaje("prueba", undefined, "5217779990000"), MEDIODIA);
    await dueno.conv.alarma(MEDIODIA + ESPERA);
    expect(dueno.enviados).toHaveLength(1);
    const cliente = armarConversacion({ claude, config: cfg });
    await cliente.conv.recibir(mensaje("hola"), MEDIODIA);
    await cliente.conv.alarma(MEDIODIA + ESPERA);
    expect(cliente.enviados).toHaveLength(0);
    expect(cliente.avisos[0].titulo).toBe("Borrador de respuesta");
  });

  it("cuando el dueño contesta desde el celular, el agente se calla 12 horas", async () => {
    const claude = claudeConGuion([texto("Claro, ¿qué pesca haces?")]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("Hola"), MEDIODIA);
    await conv.recibir({ tipo: "eco", chat: "5217771112222", id: "eco1", ts: 0, texto: "Hola, soy Emiliano" }, MEDIODIA + 3000);
    await conv.alarma(MEDIODIA + ESPERA);
    await conv.recibir(mensaje("¿y el precio?"), MEDIODIA + HORA);
    await conv.alarma(MEDIODIA + HORA + ESPERA);
    expect(claude.llamadas).toHaveLength(0);
    expect(enviados).toHaveLength(0);
    // 12 horas después vuelve a contestar, con la plática del dueño en el historial.
    const despues = MEDIODIA + 3000 + 12 * HORA + 1000;
    await conv.recibir(mensaje("¿siguen ahí?"), despues);
    await conv.alarma(despues + ESPERA);
    expect(enviados).toHaveLength(1);
    const msgs = claude.llamadas[0].messages;
    expect(msgs).toContainEqual({ role: "assistant", content: "[Emiliano contestó desde el celular]: Hola, soy Emiliano" });
  });

  it("el mensaje de bienvenida automático de la app no pausa al agente", async () => {
    const claude = claudeConGuion([texto("¡Hola! 🎣 ¿Qué tipo de pesca haces?")]);
    const cfg = config({ MENSAJES_AUTOMATICOS: "¡Hola! Aquí Alcampo Cuernavaca. Cuéntanos qué viste." });
    const { conv, enviados } = armarConversacion({ claude, config: cfg });
    const ev = mensaje("¡Hola! Quiero más información");
    await conv.recibir({ ...ev, ts: MEDIODIA }, MEDIODIA);
    // Eco con el texto configurado (llega 20 s después, para que no cuente el tiempo).
    await conv.recibir({ tipo: "eco", chat: ev.chat, id: "eco-bienvenida", ts: MEDIODIA + 20_000, texto: "¡Hola! Aquí Alcampo Cuernavaca. Cuéntanos qué viste." }, MEDIODIA + 20_000);
    // Eco de texto desconocido pero 2 s después del cliente: también automático.
    await conv.recibir({ tipo: "eco", chat: ev.chat, id: "eco-rapido", ts: MEDIODIA + 2000, texto: "Gracias por escribirnos" }, MEDIODIA + 2000);
    await conv.alarma(MEDIODIA + 21_000);
    expect(enviados).toHaveLength(1);
    // Un eco humano sí pausa.
    await conv.recibir({ tipo: "eco", chat: ev.chat, id: "eco-humano", ts: MEDIODIA + 60_000, texto: "Hola, soy Emiliano" }, MEDIODIA + 60_000);
    await conv.recibir(mensaje("¿y el precio?", undefined, ev.chat), MEDIODIA + 90_000);
    await conv.alarma(MEDIODIA + 90_000 + ESPERA);
    expect(claude.llamadas).toHaveLength(1);
  });

  it("pasa al dueño: espera para el cliente, aviso y pausa", async () => {
    const claude = claudeConGuion([
      herramienta("pasar_al_dueno", { motivo: "descuento", resumen: "Pide descuento", producto: "Kit Tundra" }),
    ]);
    const { conv, enviados, avisos } = armarConversacion({ claude });
    await conv.recibir(mensaje("¿me lo dejas en 1,200?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados.map((e) => e.texto)).toEqual([TEXTOS.espera]);
    expect(avisos[0].titulo).toBe("Atender: pide descuento o mayoreo");
    expect(avisos[0].resumen).toContain("52177***2222");
    await conv.recibir(mensaje("¿entonces?"), MEDIODIA + HORA);
    await conv.alarma(MEDIODIA + HORA + ESPERA);
    expect(claude.llamadas).toHaveLength(1);
  });

  it("fuera de horario dice 'mañana'; si ya pagó, aviso urgente de venta", async () => {
    const claude = claudeConGuion([herramienta("pasar_al_dueno", { motivo: "ya_pago", resumen: "Dice que pagó", producto: "Combo Boundary" })]);
    const { conv, enviados, avisos } = armarConversacion({ claude });
    await conv.recibir(mensaje("ya pagué"), NOCHE);
    await conv.alarma(NOCHE + ESPERA);
    expect(enviados[0].texto).toBe(TEXTOS.esperaManana);
    expect(avisos[0]).toMatchObject({ titulo: "POSIBLE VENTA: Combo Boundary", urgente: true });
  });

  it("cliente de Alcampo (otro negocio): no contesta, no avisa y se calla 12 h", async () => {
    const claude = claudeConGuion([herramienta("pasar_al_dueno", { motivo: "otro_negocio", resumen: "Pregunta por Alcampo", producto: "" })]);
    const { conv, enviados, avisos } = armarConversacion({ claude });
    await conv.recibir(mensaje("Hola, ¿a qué hora abren en Alcampo?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados).toHaveLength(0);
    expect(avisos).toHaveLength(0);
    await conv.recibir(mensaje("¿hola?"), MEDIODIA + HORA);
    await conv.alarma(MEDIODIA + HORA + ESPERA);
    expect(claude.llamadas).toHaveLength(1);
  });

  it("si preguntan si es bot, dice la verdad", async () => {
    const claude = claudeConGuion([herramienta("pasar_al_dueno", { motivo: "pide_persona", resumen: "Pregunta si es bot", producto: "" })]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("¿eres un bot?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados[0].texto).toBe(TEXTOS.persona);
  });

  it("un seguimiento 2 horas después del link, solo si el cliente no volvió a escribir", async () => {
    const link = "https://intemperiemexico.com/cart/111:1";
    const tienda = tiendaFalsa([producto({ handle: "combo" })]);
    const claude = claudeConGuion([herramienta("link_de_pago", { handle: "combo", variante_id: 0 }), texto(`Aquí está: ${link}`)]);
    const { conv, enviados, almacen } = armarConversacion({ claude, tienda });
    await conv.recibir(mensaje("lo quiero"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(almacen.alarma).toBe(MEDIODIA + ESPERA + 2 * HORA);
    await conv.alarma(MEDIODIA + ESPERA + 2 * HORA);
    expect(enviados.map((e) => e.texto)).toEqual([`Aquí está: ${link}`, TEXTOS.seguimiento]);
    await conv.alarma(MEDIODIA + ESPERA + 3 * HORA);
    expect(enviados).toHaveLength(2); // uno solo

    const claude2 = claudeConGuion([herramienta("link_de_pago", { handle: "combo", variante_id: 0 }), texto(`Aquí está: ${link}`), texto("¡Gracias!")]);
    const otra = armarConversacion({ claude: claude2, tienda });
    await otra.conv.recibir(mensaje("lo quiero"), MEDIODIA);
    await otra.conv.alarma(MEDIODIA + ESPERA);
    await otra.conv.recibir(mensaje("listo, ya quedó"), MEDIODIA + HORA);
    await otra.conv.alarma(MEDIODIA + HORA + ESPERA);
    await otra.conv.alarma(MEDIODIA + ESPERA + 2 * HORA);
    expect(otra.enviados.map((e) => e.texto)).not.toContain(TEXTOS.seguimiento);
  });

  it("al llegar a un tope no llama a Claude y avisa una sola vez", async () => {
    const almacenControl = new AlmacenMemoria();
    await almacenControl.put("estado", {
      mes: "2026-10",
      costoUsd: 90,
      mensajesKapso: 0,
      respuestasMeta: 0,
      costoDia: {},
      avisados: [],
    });
    const claude = claudeConGuion([]);
    const { conv, enviados, avisos } = armarConversacion({ claude, almacenControl });
    await conv.recibir(mensaje("hola"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    await conv.recibir(mensaje("¿hay alguien?"), MEDIODIA + HORA);
    await conv.alarma(MEDIODIA + HORA + ESPERA);
    expect(claude.llamadas).toHaveLength(0);
    expect(enviados).toHaveLength(0);
    expect(avisos).toHaveLength(1);
    expect(avisos[0].titulo).toBe("El agente se detuvo");
  });

  it("si WhatsApp rechaza el envío, avisa al dueño y no reintenta (no vuelve a cobrar Claude)", async () => {
    const claude = claudeConGuion([texto("Hola")]);
    const { conv, avisos } = armarConversacion({ claude, fallaEnvio: true });
    await conv.recibir(mensaje("hola"), MEDIODIA);
    await expect(conv.alarma(MEDIODIA + ESPERA)).resolves.toBeUndefined();
    expect(avisos[0].titulo).toBe("No se pudo enviar una respuesta");
  });

  it("si Claude falla (p. ej. sin créditos), avisa una sola vez al día", async () => {
    const claude = claudeConGuion([]); // sin respuestas: lanza error
    const almacenControl = new AlmacenMemoria();
    const a = armarConversacion({ claude, almacenControl });
    await a.conv.recibir(mensaje("hola"), MEDIODIA);
    await a.conv.alarma(MEDIODIA + ESPERA);
    expect(a.enviados).toHaveLength(0);
    expect(a.avisos.map((x) => x.titulo)).toEqual(["El agente no pudo usar Claude"]);
    // Otro chat el mismo día: no vuelve a avisar.
    const b = armarConversacion({ claude, almacenControl });
    await b.conv.recibir(mensaje("buenas", undefined, "5217773334444"), MEDIODIA + HORA);
    await b.conv.alarma(MEDIODIA + HORA + ESPERA);
    expect(b.avisos).toHaveLength(0);
    // Al día siguiente, sí.
    const c = armarConversacion({ claude, almacenControl });
    await c.conv.recibir(mensaje("hola", undefined, "5217775556666"), MEDIODIA + 24 * HORA);
    await c.conv.alarma(MEDIODIA + 24 * HORA + ESPERA);
    expect(c.avisos).toHaveLength(1);
  });

  it("borra la conversación a los 30 días sin actividad", async () => {
    const claude = claudeConGuion([texto("Hola")]);
    const { conv, almacen } = armarConversacion({ claude });
    await conv.recibir(mensaje("hola"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(almacen.alarma).toBe(MEDIODIA + 30 * 24 * HORA);
    await conv.alarma(MEDIODIA + 30 * 24 * HORA);
    expect(almacen.datos.size).toBe(0);
  });

  it("cuenta mensajes y costo para los topes", async () => {
    const claude = claudeConGuion([texto("Hola")]);
    const { conv, control } = armarConversacion({ claude });
    await conv.recibir(mensaje("hola"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    const e = await control.resumen(MEDIODIA);
    expect(e.mensajesKapso).toBe(2); // 1 que entra + 1 que sale
    expect(e.respuestasMeta).toBe(1);
    expect(e.costoUsd).toBeCloseTo((1000 * 2 + 100 * 10 + 3000 * 0.2) / 1e6, 9);
  });
});
