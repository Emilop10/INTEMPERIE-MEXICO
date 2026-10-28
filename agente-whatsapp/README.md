# Agente de WhatsApp de Intemperie México

Contesta los WhatsApp del +52 777 327 7340 con Claude (`claude-sonnet-5-5`),
siguiendo `RESPONDEDOR-MENSAJES.md` y `GUIA-VENTAS-WHATSAPP.md`. Corre en
Cloudflare Workers (plan gratis); el número llega por Kapso (plan gratis)
con coexistencia, así que la app del celular sigue funcionando. Plan
completo y costos: `../AGENTE-WHATSAPP-PLAN.md`. Historia: MANUAL §129.

## Cómo funciona

```
Cliente → WhatsApp → Meta → Kapso → POST /webhook (firma HMAC)
  → Durable Object del chat: espera 8 s por si manda más mensajes
  → Claude + herramientas (precio en vivo, búsqueda, link de pago, pasar al dueño)
  → responde por Kapso, o pasa al dueño (correo + ntfy) y se calla 12 h
```

| Archivo | Qué hace |
|---|---|
| `INSTRUCCIONES-AGENTE.md` | Lo que lee Claude. Se junta con las secciones 2–4 de la guía de ventas |
| `src/agente.ts` | Una vuelta con Claude: herramientas, links verificados, costo |
| `src/conversacion.ts` | Un chat: espera, pausa cuando contesta el dueño, seguimiento, borrado a los 30 días |
| `src/control.ts` | Topes del mes para que nunca haya cobro |
| `src/webhook.ts` | Firma y formato de los webhooks de Meta |
| `src/tienda.ts` | `/products/<handle>.js` y búsqueda de la tienda, en vivo |
| `src/whatsapp.ts` / `src/avisos.ts` | Enviar mensajes; avisos por correo (Resend) y ntfy |
| `src/worker.ts` | Entrada de Cloudflare y los dos Durable Objects |

**Reglas que pone el código, no la IA:**

- Los links de pago solo salen de la herramienta `link_de_pago`, con una
  variante que la tienda acaba de confirmar disponible. Una respuesta con
  un link `/cart/` inventado, o con un link de otro sitio, no se envía: se
  pasa al dueño.
- Armas, diábolos, rifles y pistolas de aire: la tienda los marca como
  restringidos y no hay link de pago.
- Cuando el dueño escribe desde el celular, el agente se calla 12 horas en
  ese chat.
- Nunca manda mensajes fuera de las 24 h del último mensaje del cliente
  (esos los cobra Meta).

## Modos (`AGENTE_MODO` en `wrangler.toml`)

| Modo | Qué hace |
|---|---|
| `borrador` | No envía nada. Manda al correo del dueño lo que habría contestado |
| `prueba` | Contesta solo a `NUMEROS_PRUEBA`; con los demás, borrador |
| `activo` | Contesta a todos |

## Topes (para que el costo extra sea $0)

| Variable | Valor | Por qué |
|---|---|---|
| `TOPE_CLAUDE_MES_USD` | 90 | Créditos de $100 al mes |
| `TOPE_CLAUDE_DIA_USD` | 5 | Que un día raro no se coma el mes |
| `TOPE_MENSAJES_KAPSO_MES` | 1900 | Plan gratis de Kapso: 2,000 (entran + salen) |
| `TOPE_RESPUESTAS_META_MES` | 950 | Meta: 1,000 respuestas gratis al mes |

Al llegar a uno, el agente deja de contestar, avisa una vez y vuelve solo
el siguiente día o mes. Ver los contadores:

```bash
curl -H "authorization: Bearer $WEBHOOK_SECRET" https://<worker>.workers.dev/estado
```

## Trabajo local

```bash
npm install
npm test                 # 41 pruebas con WhatsApp, tienda y Claude simulados
npm run tipos            # revisión de TypeScript
npm run simular -- "Hola" "¿Tienen kits para presa?"   # Claude real, no envía nada (necesita ANTHROPIC_API_KEY)
```

Si cambia `INSTRUCCIONES-AGENTE.md` o `../GUIA-VENTAS-WHATSAPP.md`:
`npm run conocimiento` y volver a desplegar. La prueba
`conocimiento.test.ts` falla si se olvida.

## Despliegue (Fase 3)

1. `npx wrangler login` (cuenta de Cloudflare del dueño).
2. Secretos, uno por uno (los escribe el dueño; nunca van al repositorio):

   ```bash
   npx wrangler secret put ANTHROPIC_API_KEY
   npx wrangler secret put WHATSAPP_API_KEY     # llave de Kapso
   npx wrangler secret put WEBHOOK_SECRET       # el mismo secret_key del webhook en Kapso
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put NTFY_TEMA
   npx wrangler secret put NUMEROS_PRUEBA       # el WhatsApp personal del dueño
   ```

3. En `wrangler.toml`, `WHATSAPP_PHONE_NUMBER_ID` (lo da Kapso).
4. `npm run desplegar` (genera, revisa tipos, corre pruebas y despliega).
5. En Kapso, en el número: webhook de tipo **Meta**, URL
   `https://intemperie-agente-whatsapp.<cuenta>.workers.dev/webhook` y el
   mismo `secret_key`.
6. `borrador` 1–2 días → `prueba` → `activo`. Al pasar a `activo`, apagar
   el respondedor de la Mac en WhatsApp (MANUAL §128).
