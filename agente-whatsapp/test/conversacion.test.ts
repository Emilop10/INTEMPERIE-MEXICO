import { describe, expect, it } from "vitest";
import { TEXTO_NO_LEIDO, TEXTOS } from "../src/conversacion";
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

  it("el texto del botón del anuncio cuenta como lead del anuncio aunque Meta no mande el dato", async () => {
    const claude = claudeConGuion([texto("¡Hola! Con gusto.")]);
    const { conv } = armarConversacion({ claude });
    await conv.recibir(mensaje("¡Hola! Quiero más información"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    const contexto = String(claude.llamadas[0].messages.at(-1)?.content);
    expect(contexto).toContain("llegó desde este anuncio");
    expect(contexto).toContain("texto del botón del anuncio");
    expect((await conv.resumen(MEDIODIA + ESPERA)).anuncio).toBe(true);
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

  it("en serie: el mensaje del cliente y la bienvenida automática del mismo segundo no se pisan", async () => {
    const { Serie } = await import("../src/util");
    const claude = claudeConGuion([texto("¡Hola! Con gusto.")]);
    const { conv, enviados } = armarConversacion({ claude });
    const ev = mensaje("¡Hola! Quiero más información");
    const eco = { tipo: "eco" as const, chat: ev.chat, id: "eco-bienvenida", ts: MEDIODIA + 300, texto: "¡Hola! Aquí Alcampo Cuernavaca. Cuéntanos qué viste." };
    // Como en el Durable Object: cada evento llega por su lado y se encola.
    const serie = new Serie();
    await Promise.all([serie.ejecutar(() => conv.recibir(ev, MEDIODIA)), serie.ejecutar(() => conv.recibir(eco, MEDIODIA + 300))]);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados).toHaveLength(1);
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

  it("rescate: si el dueño contestó pero el cliente vuelve a escribir y el dueño no responde en 10 min, el agente retoma", async () => {
    const claude = claudeConGuion([texto("Claro, el combo trae caña y carrete.")]);
    const { conv, enviados, almacen } = armarConversacion({ claude, config: config({ RESCATE_MINUTOS: "10" }) });
    await conv.recibir(mensaje("¿Las cañas vienen con carrete?"), MEDIODIA);
    await conv.recibir({ tipo: "eco", chat: "5217771112222", id: "eco1", ts: MEDIODIA + 60_000, texto: "¡Hola! Gracias por tu interés" }, MEDIODIA + 60_000);
    await conv.alarma(MEDIODIA + 60_000 + ESPERA);
    expect(claude.llamadas).toHaveLength(0); // el dueño tomó el chat
    await conv.recibir(mensaje("¿Y es para agua dulce?"), MEDIODIA + 5 * 60_000);
    expect(almacen.alarma).toBe(MEDIODIA + 15 * 60_000); // espera 10 min, no 8 s
    await conv.alarma(MEDIODIA + 15 * 60_000);
    expect(enviados.map((e) => e.texto)).toEqual(["Claro, el combo trae caña y carrete."]);
    // Si el dueño sí contesta dentro de esos 10 min, el agente no se mete.
    const claude2 = claudeConGuion([texto("x")]);
    const b = armarConversacion({ claude: claude2, config: config({ RESCATE_MINUTOS: "10" }) });
    await b.conv.recibir(mensaje("hola", undefined, "5217773334444"), MEDIODIA);
    await b.conv.recibir({ tipo: "eco", chat: "5217773334444", id: "e1", ts: MEDIODIA + 60_000, texto: "Hola, dime" }, MEDIODIA + 60_000);
    await b.conv.recibir(mensaje("¿precio?", undefined, "5217773334444"), MEDIODIA + 5 * 60_000);
    await b.conv.recibir({ tipo: "eco", chat: "5217773334444", id: "e2", ts: MEDIODIA + 7 * 60_000, texto: "$999" }, MEDIODIA + 7 * 60_000);
    await b.conv.alarma(MEDIODIA + 15 * 60_000);
    expect(b.enviados).toHaveLength(0);
    expect(claude2.llamadas).toHaveLength(0);
  });

  it("el seguimiento se programa aunque la última respuesta no haya consultado productos, y solo una vez por chat", async () => {
    const tienda = tiendaFalsa([producto({ handle: "kit" })]);
    const claude = claudeConGuion([
      herramienta("consultar_producto", { handle: "kit" }),
      texto("Te recomiendo el kit, está en $999."),
      texto("Sí, el envío es gratis."),
      texto("¿Te quedó alguna duda del kit? Si quieres te mando el link."),
      texto("Claro, aquí sigo."),
      texto("El kit sigue disponible; si no es el momento, no pasa nada 🎣"),
    ]);
    const { conv, enviados, almacen } = armarConversacion({ claude, tienda });
    await conv.recibir(mensaje("¿qué kit me recomiendas?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    await conv.recibir(mensaje("¿el envío es gratis?"), MEDIODIA + 10 * 60_000);
    await conv.alarma(MEDIODIA + 10 * 60_000 + ESPERA);
    // La última respuesta no usó herramientas, pero la plática fue de productos: seguimiento a las 3 h.
    expect(almacen.alarma).toBe(MEDIODIA + 10 * 60_000 + ESPERA + 3 * HORA);
    await conv.alarma(MEDIODIA + 10 * 60_000 + ESPERA + 3 * HORA);
    expect(enviados.at(-1)?.texto).toBe("¿Te quedó alguna duda del kit? Si quieres te mando el link.");
    // Otra respuesta después: ya no hay primer recordatorio; solo queda el de cierre, ~20 h después.
    await conv.recibir(mensaje("gracias, lo pienso"), MEDIODIA + 4 * HORA);
    await conv.alarma(MEDIODIA + 4 * HORA + ESPERA);
    expect(almacen.alarma).toBe(MEDIODIA + 4 * HORA + ESPERA + 20 * HORA);
    await conv.alarma(MEDIODIA + 4 * HORA + ESPERA + 20 * HORA);
    expect(enviados.at(-1)?.texto).toBe("El kit sigue disponible; si no es el momento, no pasa nada 🎣");
    expect(almacen.alarma).toBe(MEDIODIA + 4 * HORA + 30 * 24 * HORA); // solo queda el borrado a los 30 días
  });

  it("retomar con criterio: a las 2 h el agente evalúa; si decide no_responder(dueno) calla y nunca manda 'Déjame confirmarlo'", async () => {
    const claude = claudeConGuion([herramienta("no_responder", { motivo: "dueno" }), herramienta("pasar_al_dueno", { motivo: "descuento", resumen: "x", producto: "" })]);
    const { conv, enviados, almacen, avisos } = armarConversacion({ claude });
    await conv.recibir(mensaje("¿Manejan mayoreo?"), MEDIODIA);
    await conv.recibir({ tipo: "eco", chat: "5217771112222", id: "e1", ts: MEDIODIA + 60_000, texto: "Sí, sobre pedido; te armo cotización" }, MEDIODIA + 60_000);
    await conv.recibir(mensaje("Ok, te agradezco"), MEDIODIA + 5 * 60_000);
    expect(almacen.alarma).toBe(MEDIODIA + 5 * 60_000 + 120 * 60_000); // espera 2 h
    await conv.alarma(MEDIODIA + 125 * 60_000);
    expect(claude.llamadas).toHaveLength(1);
    expect(claude.llamadas[0].messages.at(-1)).toMatchObject({ role: "system", content: expect.stringContaining("RETOMAR") });
    expect(enviados).toHaveLength(0);
    // El cliente insiste; el agente vuelve a evaluar y, aunque Claude pidiera pasar al dueño, no manda nada.
    await conv.recibir(mensaje("¿Ya quedó la cotización?"), MEDIODIA + 200 * 60_000);
    await conv.alarma(MEDIODIA + 320 * 60_000);
    expect(enviados).toHaveLength(0);
    expect(avisos).toHaveLength(0);
  });

  it("retomar con criterio: si Claude decide contestar, retoma la venta", async () => {
    const claude = claudeConGuion([texto("Claro: el Kit Tundra está en $1,569 con envío gratis. ¿Te mando el link?")]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("¿Cuánto cuesta el kit Tundra?"), MEDIODIA);
    await conv.recibir({ tipo: "eco", chat: "5217771112222", id: "e1", ts: MEDIODIA + 60_000, texto: "Hola, ahorita te paso el precio" }, MEDIODIA + 60_000);
    await conv.recibir(mensaje("¿Y me lo puedes mandar con link para pagar?"), MEDIODIA + 5 * 60_000);
    await conv.alarma(MEDIODIA + 125 * 60_000);
    expect(enviados.map((e) => e.texto)).toEqual(["Claro: el Kit Tundra está en $1,569 con envío gratis. ¿Te mando el link?"]);
  });

  it("tomar: por orden del dueño el agente toma el chat aunque él acabe de escribir, y sigue atendiendo", async () => {
    const claude = claudeConGuion([texto("Claro, ¿qué pesca haces?"), texto("Jesús, gracias por tus datos: los pones en la pantalla de pago."), texto("Sí, con tarjeta también.")]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("Hola"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    await conv.recibir({ tipo: "eco", chat: "5217771112222", id: "eco1", ts: MEDIODIA + HORA, texto: "Perfecto Jesús" }, MEDIODIA + HORA);
    expect(await conv.tomar(MEDIODIA + HORA + 60_000)).toBe("enviado");
    expect(enviados.at(-1)?.texto).toBe("Jesús, gracias por tus datos: los pones en la pantalla de pago.");
    expect(claude.llamadas[1].messages.at(-2)).toMatchObject({ role: "user", content: expect.stringContaining("tomes este chat") });
    // Ya sin pausa: contesta el siguiente mensaje del cliente.
    await conv.recibir(mensaje("¿y con tarjeta?"), MEDIODIA + 2 * HORA);
    await conv.alarma(MEDIODIA + 2 * HORA + ESPERA);
    expect(enviados.at(-1)?.texto).toBe("Sí, con tarjeta también.");
  });

  it("un audio, sticker o mensaje no soportado solos: pide que lo escriba, sin Claude y una sola vez seguida", async () => {
    const claude = claudeConGuion([texto("¡Hola! Con gusto.")]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("[El cliente mandó un mensaje que no se puede leer]"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados.map((e) => e.texto)).toEqual([TEXTO_NO_LEIDO]);
    expect(claude.llamadas).toHaveLength(0);
    await conv.recibir(mensaje("[El cliente mandó un sticker]"), MEDIODIA + 60_000);
    await conv.alarma(MEDIODIA + 60_000 + ESPERA);
    expect(enviados).toHaveLength(1); // no insiste
    // Con texto junto, sí va a Claude.
    await conv.recibir(mensaje("[El cliente mandó un audio de voz que no puedes escuchar]"), MEDIODIA + 120_000);
    await conv.recibir(mensaje("¿tienen kits?"), MEDIODIA + 121_000);
    await conv.alarma(MEDIODIA + 121_000 + ESPERA);
    expect(claude.llamadas).toHaveLength(1);
    expect(enviados.at(-1)?.texto).toBe("¡Hola! Con gusto.");
  });

  it("anotar_promesa: avisa por ntfy sin datos y programa un recordatorio con las palabras del cliente dentro de las 24 h", async () => {
    const claude = claudeConGuion([
      herramienta("anotar_promesa", { promesa: "mañana lo paga cuando cobre", producto: "Combo Boundary" }),
      texto("Claro, sin prisa. Aquí queda el link 🎣"),
      texto("Quedamos en que hoy lo pagabas al cobrar; sigue disponible 🎣"),
    ]);
    const { conv, enviados, avisos, almacen } = armarConversacion({ claude });
    await conv.recibir(mensaje("mañana lo pago, cuando cobre"), MEDIODIA); // 14:00
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados.map((e) => e.texto)).toEqual(["Claro, sin prisa. Aquí queda el link 🎣"]);
    expect(avisos).toHaveLength(1);
    expect(avisos[0]).toMatchObject({ titulo: "Cliente caliente", soloNtfy: true });
    expect(avisos[0].resumen).toContain("mañana lo paga cuando cobre");
    // Recordatorio: 20 h después (10:00 del día siguiente), con la promesa, y es el único.
    expect(almacen.alarma).toBe(MEDIODIA + ESPERA + 20 * HORA);
    await conv.alarma(MEDIODIA + ESPERA + 20 * HORA);
    expect(enviados.at(-1)?.texto).toBe("Quedamos en que hoy lo pagabas al cobrar; sigue disponible 🎣");
    expect(claude.llamadas[2].messages.at(-2)).toMatchObject({ role: "user", content: expect.stringContaining("quedó en: «mañana lo paga cuando cobre") });
    expect(almacen.alarma).toBe(MEDIODIA + 30 * 24 * HORA);
  });

  it("el contexto dice si la transferencia está activa", async () => {
    const claude = claudeConGuion([texto("ok")]);
    const { conv } = armarConversacion({ claude, config: config({ TRANSFERENCIA: "si" }) });
    await conv.recibir(mensaje("¿número de cuenta?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(String(claude.llamadas[0].messages.at(-1)?.content)).toContain("SÍ está activa");
    const otra = armarConversacion({ claude: claudeConGuion([texto("ok")]) });
    await otra.conv.recibir(mensaje("¿número de cuenta?"), MEDIODIA);
    await otra.conv.alarma(MEDIODIA + ESPERA);
    const claude2 = otra.conv as unknown as { d: { llamar: { llamadas: unknown[] } } };
    expect(String((claude2.d.llamar.llamadas[0] as { messages: { content: unknown }[] }).messages.at(-1)?.content)).toContain("NO está activa");
  });

  it("un pase al dueño no tiene rescate: el agente sigue callado 12 h", async () => {
    const claude = claudeConGuion([herramienta("pasar_al_dueno", { motivo: "descuento", resumen: "Pide descuento", producto: "" })]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("¿me lo dejas en 850?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    await conv.recibir(mensaje("¿entonces?"), MEDIODIA + 30 * 60_000);
    await conv.alarma(MEDIODIA + 30 * 60_000 + 10 * 60_000);
    expect(enviados.map((e) => e.texto)).toEqual([TEXTOS.espera]);
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

  it("tras el primer recordatorio programa uno de cierre ~20 h después del último mensaje, de día, y solo uno", async () => {
    const link = "https://intemperiemexico.com/cart/111:1";
    const tienda = tiendaFalsa([producto({ handle: "combo" })]);
    const claude = claudeConGuion([
      herramienta("link_de_pago", { handle: "combo", variante_id: 0 }),
      texto(`Aquí está: ${link}`),
      texto("¿Te quedó alguna duda?"),
      texto("Sigue disponible; si no es el momento, no pasa nada 🎣"),
    ]);
    const { conv, enviados, almacen } = armarConversacion({ claude, tienda });
    await conv.recibir(mensaje("lo quiero"), MEDIODIA); // 14:00 de México
    await conv.alarma(MEDIODIA + ESPERA);
    await conv.alarma(MEDIODIA + ESPERA + 2 * HORA); // primer recordatorio
    expect(enviados).toHaveLength(2);
    // El de cierre: 20 h después del último mensaje del cliente = 10:00 del día siguiente.
    expect(almacen.alarma).toBe(MEDIODIA + 20 * HORA);
    await conv.alarma(MEDIODIA + 20 * HORA);
    expect(enviados.map((e) => e.texto).at(-1)).toBe("Sigue disponible; si no es el momento, no pasa nada 🎣");
    expect(claude.llamadas[3].messages.at(-2)).toMatchObject({ role: "user", content: expect.stringContaining("ÚLTIMO") });
    // Ya no hay más recordatorios programados.
    expect(almacen.alarma).toBeGreaterThan(MEDIODIA + 24 * HORA);
    expect(enviados).toHaveLength(3);
  });

  it("si el dueño no contesta un chat pasado en 3 h, se le recuerda; si ya contestó, no", async () => {
    const claude = claudeConGuion([herramienta("pasar_al_dueno", { motivo: "descuento", resumen: "Pide descuento", producto: "Kit Tundra" })]);
    const { conv, avisos, almacen } = armarConversacion({ claude });
    await conv.recibir(mensaje("¿me lo dejas en 1,200?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(almacen.alarma).toBe(MEDIODIA + ESPERA + 3 * HORA);
    await conv.alarma(MEDIODIA + ESPERA + 3 * HORA);
    expect(avisos.map((a) => a.titulo)).toEqual(["Atender: pide descuento o mayoreo", "Sigue sin respuesta: chat 52177***2222"]);

    const claude2 = claudeConGuion([herramienta("pasar_al_dueno", { motivo: "descuento", resumen: "Pide descuento", producto: "" })]);
    const otra = armarConversacion({ claude: claude2 });
    await otra.conv.recibir(mensaje("¿descuento?"), MEDIODIA);
    await otra.conv.alarma(MEDIODIA + ESPERA);
    await otra.conv.recibir({ tipo: "eco", chat: "5217771112222", id: "eco-d", ts: MEDIODIA + HORA, texto: "Claro, te lo dejo en 1,300" }, MEDIODIA + HORA);
    await otra.conv.alarma(MEDIODIA + ESPERA + 3 * HORA);
    expect(otra.avisos).toHaveLength(1);
  });

  it("un seguimiento que caería de noche se corre a la mañana siguiente (9:00 de México)", async () => {
    const link = "https://intemperiemexico.com/cart/111:1";
    const tienda = tiendaFalsa([producto({ handle: "combo" })]);
    const claude = claudeConGuion([herramienta("link_de_pago", { handle: "combo", variante_id: 0 }), texto(`Aquí está: ${link}`)]);
    const { conv, almacen } = armarConversacion({ claude, tienda });
    // NOCHE = 23:30 de México; 2 h después serían la 1:30.
    await conv.recibir(mensaje("lo quiero"), NOCHE);
    await conv.alarma(NOCHE + ESPERA);
    const { horaMexico } = await import("../src/util");
    expect(horaMexico(almacen.alarma!).hora).toBe(9);
    expect(almacen.alarma! - NOCHE).toBeGreaterThan(9 * HORA);
  });

  it("si preguntan si es bot, dice la verdad", async () => {
    const claude = claudeConGuion([herramienta("pasar_al_dueno", { motivo: "pide_persona", resumen: "Pregunta si es bot", producto: "" })]);
    const { conv, enviados } = armarConversacion({ claude });
    await conv.recibir(mensaje("¿eres un bot?"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(enviados[0].texto).toBe(TEXTOS.persona);
  });

  it("un seguimiento con criterio 2 horas después del link, solo si el cliente no volvió a escribir", async () => {
    const link = "https://intemperiemexico.com/cart/111:1";
    const tienda = tiendaFalsa([producto({ handle: "combo" })]);
    const claude = claudeConGuion([
      herramienta("link_de_pago", { handle: "combo", variante_id: 0 }),
      texto(`Aquí está: ${link}`),
      texto("¿Pudiste hacer el pago? Si prefieres OXXO, al pagar eliges Mercado Pago."),
    ]);
    const { conv, enviados, almacen } = armarConversacion({ claude, tienda });
    await conv.recibir(mensaje("lo quiero"), MEDIODIA);
    await conv.alarma(MEDIODIA + ESPERA);
    expect(almacen.alarma).toBe(MEDIODIA + ESPERA + 2 * HORA);
    await conv.alarma(MEDIODIA + ESPERA + 2 * HORA);
    expect(enviados.map((e) => e.texto)).toEqual([`Aquí está: ${link}`, "¿Pudiste hacer el pago? Si prefieres OXXO, al pagar eliges Mercado Pago."]);
    // Claude vio la nota del sistema, no un mensaje del cliente.
    expect(claude.llamadas[2].messages.at(-2)).toMatchObject({ role: "user", content: expect.stringContaining("[SISTEMA") });
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
