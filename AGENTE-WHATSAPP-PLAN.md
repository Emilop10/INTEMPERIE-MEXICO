# Agente de WhatsApp en servidor: plan (Fase 1)

Pedido del dueño el 28 oct 2026 (MANUAL §129). Un agente en un servidor,
no en la Mac, que reciba los WhatsApp del +52 777 327 7340 por webhook,
conteste en segundos con Claude (`claude-sonnet-5-5`) siguiendo
`RESPONDEDOR-MENSAJES.md` y `GUIA-VENTAS-WHATSAPP.md`, consulte precio y
existencia en vivo, mande el link de pago directo y pase al dueño lo que
no le toca.

**Estado:** plan entregado. Espera el "sí" del dueño para la Fase 2
(código). No se ha creado ninguna cuenta ni se ha gastado nada.

---

## 1. Lo más importante: cómo conectar el número sin perder la app del celular

### La respuesta corta

- **Sí se puede** tener el mismo número en la app de WhatsApp Business del
  celular y en la API al mismo tiempo. Meta lo llama **coexistencia**.
- **México sí está permitido.** La lista de países excluidos empezó larga
  (UE, Reino Unido, Japón, India…) y desde 2026 solo excluye Nigeria y
  Sudáfrica. México nunca estuvo en ella.
- **Pero no se puede activar por cuenta propia.** Meta solo la ofrece a
  través del "registro integrado" (Embedded Signup) de un **proveedor
  técnico** aprobado por Meta (Tech Provider o Solution Partner). Volverse
  proveedor uno mismo exige verificar la empresa, pasar la revisión de la
  app de Meta y programar el registro integrado: semanas de trámite para
  un solo número. No vale la pena.
- **Ojo:** el camino de Business Suite → Ajustes → Cuentas de WhatsApp →
  "API de WhatsApp Business" que se vio el 24 oct (MANUAL §126) **no** es
  coexistencia: registra el número solo en la API y **lo desconecta del
  celular**. No usarlo.

### Qué cambia en el celular con la coexistencia

| Sigue igual | Cambia |
|---|---|
| El dueño ve y contesta todos los chats desde el celular | Se desvinculan los dispositivos vinculados (WhatsApp Web de la Mac). Se vuelven a vincular (hasta 4), menos WhatsApp para Windows |
| Etiquetas, respuestas rápidas, catálogo, mensaje de ausencia y llamadas en la app | Las **listas de difusión** quedan de solo lectura |
| Los mensajes que manda el dueño desde la app son **gratis** | Se apagan los mensajes temporales, "ver una vez" y la ubicación en tiempo real en chats 1 a 1 |
| | **Hay que abrir la app al menos cada 13 días**, o Meta desconecta la API. Si se desinstala la app, se pierde la conexión |
| | Los grupos no pasan a la API (el agente no los ve) |

El agente ve también lo que el dueño contesta desde el celular (evento
`smb_message_echoes`). Con eso, **cuando el dueño escribe en un chat, el
agente se calla en ese chat** (ver sección 4).

### Requisitos de la cuenta

- App de WhatsApp Business **versión 2.24.17 o mayor** en el celular del
  número.
- El número debe tener tiempo de uso y buena calidad de mensajes en la
  app. El nuestro se usa desde hace meses: cumple.
- Ser administrador del portafolio **Intemperie México**
  (business_id 1324138699447721).
- **Verificación del negocio: no hace falta para empezar.** La
  verificación clásica ni siquiera está disponible para números con
  coexistencia. Sin verificar hay límite de mensajes que **inicia el
  negocio** (250 al día), y el agente solo contesta: no le afecta.
- Una **tarjeta** en la cuenta de WhatsApp (WhatsApp Manager → Pagos).
  Desde el 1 oct 2026 Meta cobra las respuestas después de las primeras
  1,000 del mes; sin tarjeta, deja de entregarlas.

### Qué proveedor técnico usar

| Proveedor | Costo al mes | A favor | En contra |
|---|---|---|---|
| **Kapso** (recomendado) | **$0** hasta 2,000 mensajes (entrada + salida); **$25 USD** el plan Pro (100,000) | Hecho para programadores. Reenvía a nuestro servidor **el mismo webhook de Meta, sin cambios**, firmado con HMAC. Coexistencia por QR documentada. No cobra comisión sobre Meta | Al volumen de la prueba de anuncios (≈2,500 mensajes) se pasa del gratis: contar con $25 |
| YCloud | $0 plan gratis, sin tope declarado | Sin comisión sobre Meta | Su API tiene formato propio; la coexistencia en el plan gratis no está confirmada en su página; hay que prepagar un monedero |
| 360dialog | €49 por número | Muy usado, estable | El más caro |

**Recomendación: Kapso.** El código de la Fase 2 hablará el formato de
Meta y tendrá una capa delgada para enviar. Si Kapso falla o sube de
precio, cambiar a otro proveedor (o a Meta directo, si algún día nos
volvemos proveedor técnico) es cambiar esa capa, no el agente.

**A confirmar en la Fase 2** (no lo dice la documentación pública):
la ruta exacta de Kapso para **enviar** mensajes y que reenvíe los
`smb_message_echoes`. Si no los reenviara, el agente detecta la
intervención del dueño con su propio registro (ver sección 4).

### Cuánto cobra Meta

| Mensaje | Costo |
|---|---|
| Lo que escribe el cliente | Gratis |
| Lo que contesta el dueño desde la app | Gratis |
| Respuestas del agente en las 24 h después del mensaje del cliente | **Primeras 1,000 al mes gratis**; después ≈ US$0.0085 c/u (México, cifra de terceros; la oficial está en la tabla en MXN de Meta) |
| Chats que llegan por un anuncio de "Enviar mensaje de WhatsApp" | Gratis mientras dure la ventana de anuncio (Meta: hasta 7 días) |
| Mensajes fuera de las 24 h (plantillas) | Se cobran. **El agente no los usa** |

Con el volumen de hoy: **$0 a $7 USD al mes.**

### Política de Meta sobre IA (vigente desde el 15 ene 2026)

Meta prohíbe en WhatsApp los asistentes de IA **de propósito general**
(tipo ChatGPT). Los bots de **atención y venta de un negocio** están
permitidos. El agente se limita a la tienda, dice que es asistente si le
preguntan y pasa a una persona cuando el cliente lo pide: cumple.

---

## 2. Servidor: dos opciones

El agente necesita: estar siempre encendido, una dirección HTTPS para el
webhook, unos 256 MB de memoria y un disco chico para guardar las
conversaciones activas.

| | **A. Render (recomendada)** | B. VPS (Hetzner CX23 o DigitalOcean) |
|---|---|---|
| Costo | **$7 USD** (Starter, 512 MB) + $0.25 por 1 GB de disco ≈ **$7.25 USD** | Hetzner ≈ €4.49 con IPv4 (si hay disponibilidad; en 2026 la limitaron); DigitalOcean ≈ $6 USD |
| HTTPS | Automático (`…onrender.com`) | Hay que instalar Caddy y apuntar un subdominio |
| Despliegue | Se conecta al repositorio de GitHub y se actualiza solo al hacer push | Por SSH; actualizaciones a mano |
| Mantenimiento | Ninguno | Parches del sistema, firewall y respaldos son nuestros |
| Secretos | Variables de entorno en su panel (las captura el dueño) | Archivo `.env` en el servidor |

**Recomendación: Render.** Cuesta $2 más que un VPS y quita todo el
mantenimiento. El plan gratis de Render **no sirve**: se duerme y el
primer mensaje tardaría ~1 minuto.

---

## 3. Costo de la API de Claude

**Precios de `claude-sonnet-5-5`** (por millón de tokens): entrada $2,
salida $10, lectura de caché $0.20, escritura de caché $2.50.

**Cómo se calculó:**

- Instrucciones fijas (reglas, guion, tabla de productos y herramientas):
  ≈ 7,000 tokens, **en caché**: se pagan a $0.20 en vez de $2.
- Cada mensaje del cliente: ≈ 1.6 llamadas (algunas consultan el
  producto en vivo), historial ≈ 1,500 tokens, respuesta ≈ 400 tokens con
  esfuerzo bajo.
- ≈ **$0.014 USD por mensaje contestado**, más ≈ $0.035 por conversación
  para volver a cargar la caché.

| Escenario | Conversaciones al día | Claude al mes |
|---|---|---|
| Hoy (prueba de anuncios: 20 en 3 días, más orgánicos) | ~7 | **≈ $25 USD** |
| Con más anuncios | ~20 | ≈ $70 USD |
| Límite de los $100 | ~28 | $100 USD |

**Candados para no pasar de $100:**

1. En la consola de Anthropic, una llave solo para el agente y un **tope
   de gasto mensual de $100**. Si se llega, la API deja de contestar.
2. En el agente, un contador diario. Si pasa de **$4 USD en el día**,
   deja de contestar con IA, manda a los clientes el mensaje de "te
   escribo en un momento" y avisa al dueño.
3. Respuestas cortas (máximo ~600 tokens) y esfuerzo bajo.

## Costo total al mes

| Concepto | Hoy | Con más volumen |
|---|---|---|
| Claude | ~$25 | ~$70 |
| Kapso | $0–25 | $25 |
| Render | $7.25 | $7.25 |
| Meta | $0–7 | ~$10 |
| **Total** | **≈ $32–64 USD** | **≈ $112 USD** |

---

## 4. Cómo va a funcionar el agente (diseño de la Fase 2)

**Lenguaje:** Python, como los scripts del repositorio. Carpeta
`agente-whatsapp/`. Ningún secreto en el repositorio: todo por variables
de entorno (`ANTHROPIC_API_KEY`, `KAPSO_API_KEY`, `WEBHOOK_SECRET`,
`NUMERO_DUENO`, etc.).

**Flujo de un mensaje:**

1. Meta → Kapso → `POST /webhook` en el servidor. Se verifica la firma
   HMAC y se contesta 200 de inmediato.
2. Se esperan ~8 segundos por si el cliente manda varios mensajes
   seguidos, y se contestan juntos.
3. Claude recibe las reglas (caché) y el historial del chat, y puede usar
   **solo tres herramientas**:
   - `consultar_producto(handle)`: lee
     `intemperiemexico.com/products/<handle>.js` (precio, disponible,
     variante);
   - `buscar_producto(palabra)`: busca en la tienda en vivo;
   - `pasar_al_dueno(tema)`: descuentos, pedidos, quejas, productos que
     no están en línea, armas, "ya pagué", "¿eres bot?", o cualquier duda.
4. **Los links de pago los arma el código, no la IA:**
   `https://intemperiemexico.com/cart/<variante>:1` solo con una variante
   que la tienda acaba de confirmar disponible. La IA no puede inventar
   precios, links ni descuentos.
5. Se manda la respuesta (2 a 4 líneas, de "tú").

**Cuando se pasa al dueño:**

- Al cliente: "Déjame confirmarlo y te escribo en un momento 🙌".
- El chat queda **en pausa para el agente**.
- Aviso al dueño **sin nombre ni teléfono en el texto**: canal, tema y un
  enlace `wa.me` al chat. Dos opciones, decide el dueño:
  - correo a admin@intemperiemexico.com (gratis);
  - notificación al celular con ntfy (gratis, app aparte).
  
  La etiqueta "Atender Emiliano" de la app **no se puede poner por API**.
  El dueño la pone al abrir el chat, si quiere.

**Cuando el dueño contesta él mismo** desde el celular, el agente se
calla en ese chat por **12 horas** (ajustable). Así nunca hablan los dos
a la vez.

**Modos** (variable `AGENTE_MODO`):

| Modo | Qué hace |
|---|---|
| `borrador` | No envía nada. Escribe la respuesta propuesta en el registro y en el aviso al dueño |
| `prueba` | Contesta solo a los números de `NUMEROS_PRUEBA` (el del dueño). A los demás, nada |
| `activo` | Contesta a todos |

**Horario:** contesta las 24 horas. Fuera de 9:00–22:00 los pases al
dueño dicen "mañana a primera hora".

**Datos personales:** las conversaciones viven solo en el disco del
servidor (SQLite), se borran a los 30 días y nunca van al repositorio.
Los registros guardan el teléfono enmascarado (`52777***7340`).

**Pruebas locales:** `pytest` con mensajes simulados en el formato del
webhook de Meta y la tienda y Claude simulados: precio en vivo, producto
agotado, descuento, "ya pagué", armas, cliente que manda 3 mensajes
seguidos, dueño que interviene, firma inválida y tope diario. Además, un
script `simular.py "¿tienen kits para presa?"` que llama a Claude de
verdad y muestra la respuesta sin enviarla.

**Al encender el agente** se apaga el respondedor de la Mac (`/loop 3m`,
MANUAL §128) en WhatsApp, para que no contesten los dos. El de Messenger
e Instagram sigue en la Mac hasta la Fase 4.

---

## 5. Lo que te toca a ti (dueño), paso a paso

**Cuándo:** al empezar la Fase 3, con el código ya probado. Mientras no
haya webhook, conectar el número no cambia nada para los clientes. Ten el
celular del número a la mano.

### A. Antes de empezar (5 minutos)

1. En el celular: actualiza **WhatsApp Business** desde la tienda de apps.
   Debe ser 2.24.17 o más nueva (Ajustes → Ayuda → Info. de la app).
2. Ten a la mano una tarjeta para los cobros de Meta.

### B. Conectar el número en Kapso (15 minutos)

1. Entra a **kapso.ai** y crea la cuenta con
   admin@intemperiemexico.com. Proyecto: "Intemperie México". Plan
   gratis para empezar.
2. **Connected numbers → Connect new number → WhatsApp Business App.**
   No elijas "Display name only": crea un número de EE. UU. que no
   queremos.
3. Se abre la ventana de Meta: **Continuar** e inicia sesión con tu
   Facebook (el que administra el portafolio).
4. **Portafolio:** elige **Intemperie México**. **No** elijas "Alcampo
   Cuernavaca".
5. **Cuenta de WhatsApp:** crea una nueva llamada "Intemperie México".
   **No** uses la cuenta "Alcampo Cuernavaca" que aparece en ese
   portafolio. Zona horaria: Ciudad de México. Moneda: **MXN** si la
   ofrece (no se puede cambiar después).
6. Número: +52 777 327 7340. Revisa que el nombre y la foto coincidan con
   la app → Siguiente.
7. Sale un **código QR** en la pantalla. En el celular: WhatsApp Business
   → Chats → ícono de cámara → escanea el QR.
8. En el celular: **Continuar → Conectar a la plataforma empresarial.**
9. Te pregunta si compartir los chats anteriores. **Recomiendo "No
   compartir chats"**: el agente no los necesita y así no sale
   información de clientes. **No se puede cambiar después.**
10. Confirma permisos → **Finalizar**. Si en algún momento Meta pide un
    código por SMS en vez del QR, **detente** y mándame captura.

### C. Pagos en Meta (5 minutos)

1. **business.facebook.com/wa/manage** → elige la cuenta nueva
   "Intemperie México" → **Ajustes de pago** → agrega la tarjeta.

### D. Llaves para el servidor (10 minutos)

Estas llaves **no me las pegues en el chat**. Las capturas tú en el panel
de Render cuando te diga, en la Fase 3.

1. **Kapso:** API Keys → crear "agente-servidor". Guárdala.
2. **Anthropic** (console.anthropic.com): API Keys → crear
   "agente-whatsapp". En **Limits / Spend limits**, pon tope de **$100
   USD al mes**.
3. **Render** (render.com): crea la cuenta con GitHub y autoriza el
   repositorio INTEMPERIE-MEXICO. Plan de pago con tarjeta (~$7.25 USD).

### E. Después de conectar

1. WhatsApp Web en la Mac se habrá desconectado: vuelve a vincularlo si
   lo usas.
2. **Abre WhatsApp Business en el celular al menos cada 13 días** y no la
   desinstales.
3. Las listas de difusión quedan de solo lectura.

---

## 6. Fases

| Fase | Qué | Quién | Cuándo |
|---|---|---|---|
| 1 | Este plan | Nube | ✅ 28 oct |
| 2 | Código en `agente-whatsapp/`, pruebas locales y modo borrador | Nube | Con tu "sí" |
| 3 | Kapso y Render (sección 5), despliegue, 1–2 días en `borrador`, luego `prueba` con tu número, luego `activo` | Tú (cuentas y llaves) + nube | Después de la 2 |
| 4 | Messenger e Instagram | Nube | Cuando Meta apruebe la app |

**Para la Fase 4:** Messenger e Instagram sí van con nuestra propia app de
Meta, sin proveedor. La app necesita los permisos `pages_messaging` e
`instagram_manage_messages` con **acceso avanzado**, que pide revisión de
Meta y **verificación del negocio** (RFC y comprobante de domicilio). Se
puede iniciar esa verificación mientras avanzan las fases 2 y 3.

## 7. Decisiones que te tocan

1. **Proveedor:** Kapso (recomendado), YCloud o 360dialog.
2. **Servidor:** Render (recomendado) o VPS.
3. **Avisos de pase al dueño:** correo, ntfy o los dos.
4. **Pausa del agente cuando contestas tú:** 12 horas (propuesta) u otra.
5. **Chats anteriores:** no compartir (recomendado) o compartir.

---

**Fuentes** (consultadas el 28 oct 2026):

- Meta, coexistencia: developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users
- Meta, precios: developers.facebook.com/documentation/business-messaging/whatsapp/pricing
- 360dialog, coexistencia: docs.360dialog.com/partner/onboarding/whatsapp-coexistence
- Kapso: kapso.com/pricing, docs.kapso.ai (connect-whatsapp, receive-messages, pricing-faq)
- YCloud: ycloud.com/pricing
- Países excluidos (2026): github.com/orgs/chatwoot/discussions/11216
- Política de IA de Meta: techcrunch.com, 18 oct 2025
- Render y Hetzner: páginas de precios de terceros (temps.sh, findstack.com)
