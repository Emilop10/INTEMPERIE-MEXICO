// Prueba el agente con Claude real y la tienda en vivo, sin WhatsApp: no
// envía nada a nadie. Cada argumento es un mensaje del cliente, en orden.
//
//   ANTHROPIC_API_KEY=... npm run simular -- "Hola" "¿Tienen kits para presa?" "¿Me mandas el link?"
//
// Gasta créditos de Claude (≈ $0.01–0.02 USD por mensaje).

import Anthropic from "@anthropic-ai/sdk";
import { atender, type MensajeHistorial } from "../src/agente";
import { crearTienda } from "../src/tienda";
import { enHorario, horaMexico } from "../src/util";

const mensajes = process.argv.slice(2);
if (mensajes.length === 0) {
  console.error('Uso: npm run simular -- "mensaje 1" "mensaje 2" ...');
  process.exit(1);
}

const claude = new Anthropic();
const modelo = process.env.MODELO || "claude-sonnet-5-5";
const historial: MensajeHistorial[] = [];
let total = 0;

for (const nuevos of mensajes) {
  const ahora = Date.now();
  const contexto = `Ahora: ${horaMexico(ahora).texto} (hora de Ciudad de México). ${
    enHorario(ahora) ? "Emiliano atiende hoy hasta las 22:00." : "Fuera del horario de Emiliano (9:00 a 22:00)."
  }`;
  const inicio = Date.now();
  const v = await atender(
    { llamar: (p) => claude.beta.messages.create(p), tienda: crearTienda(), modelo },
    { historial, nuevos, contexto },
  );
  total += v.costoUsd;
  const segundos = ((Date.now() - inicio) / 1000).toFixed(1);
  console.log(`\n👤 ${nuevos}`);
  const r = v.resultado;
  if (r.accion === "responder") {
    console.log(`🤖 ${r.texto}`);
    historial.push({ role: "user", content: nuevos }, { role: "assistant", content: r.texto });
  } else if (r.accion === "pasar") {
    console.log(`🙋 PASA AL DUEÑO (${r.motivo}): ${r.resumen}${r.producto ? ` — ${r.producto}` : ""}`);
    historial.push({ role: "user", content: nuevos });
  } else {
    console.log(`🤐 No contesta (${r.motivo})`);
    historial.push({ role: "user", content: nuevos });
  }
  console.log(`   ${v.llamadas} llamada(s), $${v.costoUsd.toFixed(4)} USD, ${segundos} s`);
}
console.log(`\nTotal: $${total.toFixed(4)} USD`);
