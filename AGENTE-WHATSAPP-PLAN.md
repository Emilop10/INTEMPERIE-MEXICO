# Agente de WhatsApp en servidor: plan (Fase 1)

Pedido del dueño el 28 oct 2026 (MANUAL §129). Un agente en un servidor,
no en la Mac, que reciba los WhatsApp del +52 777 327 7340 por webhook,
conteste en segundos con Claude (`claude-sonnet-5-5`) siguiendo
`RESPONDEDOR-MENSAJES.md` y `GUIA-VENTAS-WHATSAPP.md`, consulte precio y
existencia en vivo, mande el link de pago directo y pase al dueño lo que
no le toca.

**Condición del dueño (28 oct): costo extra $0.** Solo se gastan los
$100 USD al mes de créditos de la API de Claude. Llegan pocos mensajes.
Todo lo demás (servidor, proveedor, Meta) va en planes gratis, sin
tarjeta donde se pueda, y el agente se detiene solo antes de llegar a
cualquier cobro.

**Estado (28 oct):** Fase 2 terminada, con búsqueda en internet: código
en `agente-whatsapp/`, 45 pruebas pasando, probado de punta a punta en local. Espera el "sí" del
dueño para la Fase 3 (cuentas y despliegue). No se ha creado ninguna
cuenta ni se ha gastado nada.

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
- **Verificación del negocio: no hace falta.** La verificación clásica ni
  siquiera está disponible para números con coexistencia. Sin verificar
  hay límite de mensajes que **inicia el negocio** (250 al día), y el
  agente solo contesta: no le afecta.
- **Tarjeta en la cuenta de WhatsApp: no se pone.** Desde el 1 oct 2026
  Meta cobra las respuestas después de las primeras **1,000 del mes**.
  Sin tarjeta, Meta no cobra nada: solo deja de entregar respuestas de la
  API pasadas las 1,000. El agente se detiene antes (sección 3).

### Qué proveedor técnico usar

| Proveedor | Plan gratis | A favor | En contra |
|---|---|---|---|
| **Kapso** (recomendado) | **$0**, 2,000 mensajes al mes (cuentan los que entran y los que salen), 1 número | Hecho para programadores. Reenvía a nuestro servidor **el mismo webhook de Meta, sin cambios**, firmado con HMAC. Coexistencia por QR documentada | El tope de 2,000. Con pocos mensajes alcanza (≈ 80 conversaciones de 12 mensajes al mes) |
| YCloud (respaldo) | $0, sin tope declarado | Sin comisión sobre Meta | API con formato propio; la coexistencia en el plan gratis no está confirmada en su página |

360dialog (€49 al mes) queda descartado por costo.

**Recomendación: Kapso, plan gratis.** El agente cuenta los mensajes del
mes y se detiene en **1,900** (sección 3). El código habla el formato de
Meta con una capa delgada para enviar: si un día hace falta cambiar a
YCloud, se cambia esa capa, no el agente.

**A confirmar en la Fase 2** (no lo dice la documentación pública de
Kapso):

- la ruta exacta para **enviar** mensajes;
- que reenvíe los `smb_message_echoes` (si no, el agente detecta la
  intervención del dueño con su propio registro);
- qué pasa al llegar a 2,000 (bloqueo o cobro) y si el plan gratis pide
  tarjeta. Si pidiera tarjeta o cobrara solo, se usa YCloud.

### Cuánto cobra Meta: $0

| Mensaje | Costo |
|---|---|
| Lo que escribe el cliente | Gratis |
| Lo que contesta el dueño desde la app | Gratis, sin límite |
| Respuestas del agente en las 24 h después del mensaje del cliente | **Primeras 1,000 al mes gratis.** El agente se detiene en 950 |
| Chats que llegan por un anuncio de "Enviar mensaje de WhatsApp" | Gratis mientras dure la ventana del anuncio |
| Mensajes fuera de las 24 h (plantillas) | Se cobran. **El agente no los usa nunca** |

### Política de Meta sobre IA (vigente desde el 15 ene 2026)

Meta prohíbe en WhatsApp los asistentes de IA **de propósito general**
(tipo ChatGPT). Los bots de **atención y venta de un negocio** están
permitidos. El agente se limita a la tienda, dice que es asistente si le
preguntan y pasa a una persona cuando el cliente lo pide: cumple.

---

## 2. Servidor gratis: Cloudflare Workers

El agente necesita estar siempre encendido, una dirección HTTPS para el
webhook y una base de datos chica para las conversaciones activas.

| Opción | Costo | Por qué sí / por qué no |
|---|---|---|
| **Cloudflare Workers (recomendada)** | **$0**, sin tarjeta | Siempre disponible, sin arranque en frío, HTTPS incluido (`…workers.dev`). Plan gratis: 100,000 peticiones al día (usaremos unas cuantas decenas). Base de datos D1 gratis. Se despliega con un comando |
| Google Cloud Run | $0 dentro del nivel gratis | Pide tarjeta para abrir la cuenta. Tarda 2–4 s en despertar |
| Render gratis | $0 | **No sirve:** se duerme a los 15 min y el primer mensaje tardaría ~1 minuto |
| Oracle Cloud "Always Free" | $0 | Pide tarjeta, la disponibilidad de máquinas es irregular y el mantenimiento es nuestro |

**Recomendación: Cloudflare Workers.** Lo único que cambia es el
lenguaje: Workers corre **TypeScript** (con el SDK oficial de Anthropic).
Los scripts del repositorio son Python, pero el agente es independiente
y vive en su carpeta.

**Cuidado con el tiempo de CPU:** el plan gratis da pocos milisegundos de
CPU por petición, pero **esperar** a Claude o a la tienda no cuenta como
CPU. Un agente que casi todo el tiempo espera respuestas de red cabe de
sobra. Se medirá en la Fase 3.

---

## 3. Costo de la API de Claude (lo único que se gasta)

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
- **Respuesta investigada en internet:** ≈ $0.03–0.08 USD (1 o 2
  búsquedas de $0.01 más el texto que lee). Si 1 de cada 5 respuestas
  investiga, suma ≈ $2–5 al mes.

| Escenario | Conversaciones al mes | Claude al mes |
|---|---|---|
| Pocos mensajes (orgánico) | ~60 | **≈ $9–12 USD** (con internet) |
| Tope del plan gratis de Kapso (1,900 mensajes) | ~80 | ≈ $18–20 USD |

Con los topes gratis de Kapso y Meta, **los $100 de Claude no se acaban**:
el límite real es el número de mensajes, no los créditos.

**Candados para que nunca haya un cobro:**

| Límite | Se detiene en | Qué hace al llegar |
|---|---|---|
| Créditos de Claude ($100) | **$90 en el mes** (y tope de $100 en la consola de Anthropic) | Deja de contestar con IA |
| Kapso gratis (2,000 mensajes) | **1,900** mensajes en el mes | Igual |
| Meta gratis (1,000 respuestas) | **950** respuestas en el mes | Igual |
| Gasto diario de Claude | **$5** en el día | Igual, hasta el día siguiente |

"Deja de contestar" quiere decir: el agente ya no responde, avisa al
dueño **una vez** y el dueño atiende desde la app del celular como
siempre, gratis y sin límite. El primer día del mes siguiente vuelve solo.

**Si se reactivan los anuncios de WhatsApp:** la prueba de octubre trajo
20 conversaciones en 3 días. A ese ritmo, el tope de Kapso se alcanza en
unas dos semanas y el resto del mes contesta el dueño. Para cubrir todo
el mes habría que pagar Kapso Pro ($25 USD); eso se decide solo si pasa.

## Costo total al mes

| Concepto | Costo |
|---|---|
| Claude | ≈ $9–20 de los $100 de créditos (con internet) |
| Kapso | $0 (plan gratis) |
| Cloudflare | $0 (plan gratis) |
| Meta | $0 (sin tarjeta; topes en el agente) |
| **Costo extra** | **$0** |

---

## 4. Cómo va a funcionar el agente (diseño de la Fase 2)

**Lenguaje:** TypeScript en Cloudflare Workers, carpeta
`agente-whatsapp/`. Ningún secreto en el repositorio: las llaves
(`ANTHROPIC_API_KEY`, `KAPSO_API_KEY`, `WEBHOOK_SECRET`, etc.) se guardan
como secretos de Cloudflare.

**Flujo de un mensaje:**

1. Meta → Kapso → `POST /webhook` en el Worker. Se verifica la firma HMAC
   y se contesta 200 de inmediato; lo demás sigue en segundo plano.
2. Se esperan unos segundos por si el cliente manda varios mensajes
   seguidos, y se contestan juntos.
3. Claude recibe las reglas (caché) y el historial del chat, y puede usar
   estas herramientas:
   - `consultar_producto(handle)`: lee
     `intemperiemexico.com/products/<handle>.js` (precio, disponible,
     variante);
   - `buscar_producto(palabra)`: busca en la tienda en vivo;
   - `pasar_al_dueno(tema)`: descuentos, pedidos, quejas, productos que
     no están en línea, armas, "ya pagué", "¿eres bot?", o cualquier duda;
   - **internet** (pedido del dueño, 28 oct): `web_search` y `web_fetch`
     de Anthropic, para investigar fichas técnicas, comparar modelos o
     explicar cómo se usa algo. Primero lee la descripción de la ficha de
     la tienda. Precio y existencia salen solo de la tienda; no menciona
     otras tiendas ni manda sus links; Mercado Libre está bloqueado. No
     pone fuentes (decisión del dueño).
4. **Los links de pago los arma el código, no la IA:**
   `https://intemperiemexico.com/cart/<variante>:1` solo con una variante
   que la tienda acaba de confirmar disponible. La IA no puede inventar
   precios, links ni descuentos.
5. Se manda la respuesta (cálida y natural; datos de producto con ✅ y
   negritas, como el ejemplo del dueño) y se suman los
   contadores del mes (sección 3).

**Cuando se pasa al dueño:**

- Al cliente: "Déjame confirmarlo y te escribo en un momento 🙌".
- El chat queda **en pausa para el agente**.
- Aviso gratis al dueño, **sin nombre ni teléfono en el texto**: canal,
  tema y un enlace `wa.me` al chat. Opciones:
  - correo a admin@intemperiemexico.com;
  - notificación al celular con ntfy (app gratis).
- La etiqueta "Atender Emiliano" de la app **no se puede poner por API**.
  El dueño la pone al abrir el chat, si quiere.

**Cuando el dueño contesta él mismo** desde el celular, el agente se
calla en ese chat por **12 horas** (ajustable). Así nunca hablan los dos
a la vez.

**Modos** (variable `AGENTE_MODO`):

| Modo | Qué hace |
|---|---|
| `borrador` | No envía nada. Manda al dueño la respuesta que habría dado |
| `prueba` | Contesta solo a los números de `NUMEROS_PRUEBA` (el del dueño). Con los demás, borrador |
| `activo` | Contesta a todos |

**Horario:** contesta las 24 horas. Fuera de 9:00–22:00 los pases al
dueño dicen "mañana a primera hora".

**Datos personales:** las conversaciones viven solo en la base D1 de
Cloudflare, se borran a los 30 días y nunca van al repositorio. Los
registros guardan el teléfono enmascarado (`52777***7340`).

**Pruebas locales:** pruebas automáticas con mensajes simulados en el
formato del webhook de Meta y la tienda y Claude simulados: precio en
vivo, producto agotado, descuento, "ya pagué", armas, cliente que manda 3
mensajes seguidos, dueño que interviene, firma inválida y cada uno de los
topes. Además, un comando `simular "¿tienen kits para presa?"` que llama
a Claude de verdad y muestra la respuesta sin enviarla.

**Al encender el agente** se apaga el respondedor de la Mac (`/loop 3m`,
MANUAL §128) en WhatsApp, para que no contesten los dos. El de Messenger
e Instagram sigue en la Mac hasta la Fase 4.

---

## 5. Lo que te toca a ti (dueño), paso a paso

**Cuándo:** al empezar la Fase 3, con el código ya probado. Mientras no
haya webhook, conectar el número no cambia nada para los clientes. Ten el
celular del número a la mano. **No se pone ninguna tarjeta en ningún
paso.**

### A. Antes de empezar (5 minutos)

1. En el celular: actualiza **WhatsApp Business** desde la tienda de apps.
   Debe ser 2.24.17 o más nueva (Ajustes → Ayuda → Info. de la app).

### B. Conectar el número en Kapso (15 minutos)

1. Entra a **kapso.ai** y crea la cuenta con
   admin@intemperiemexico.com. Proyecto: "Intemperie México". **Plan
   gratis.** Si pide tarjeta, detente y avísame.
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
9. Te pregunta si compartir los chats anteriores. **Decisión del dueño
   (28 oct): "Compartir todos los chats".** Ojo: los chats **no se
   pierden con ninguna de las dos opciones**; se quedan en el celular.
   Compartir solo copia a Kapso los últimos 6 meses. El agente ignora esa
   copia y no la guarda. **No se puede cambiar después.** El primer día,
   revisar en Kapso que la copia no se haya contado contra los 2,000
   mensajes gratis.
10. Confirma permisos → **Finalizar**. Si en algún momento Meta pide un
    código por SMS en vez del QR, **detente** y mándame captura.
11. Si Meta te pide agregar un método de pago, **no lo agregues**: se
    puede omitir, y sin tarjeta Meta no cobra.

### C. Llaves (10 minutos)

Estas llaves **no me las pegues en el chat**. Las capturas tú en
Cloudflare cuando te diga, en la Fase 3.

1. **Kapso:** API Keys → crear "agente-servidor". Guárdala.
2. **Anthropic** (console.anthropic.com): API Keys → crear
   "agente-whatsapp". En **Limits / Spend limits**, pon tope de **$100
   USD al mes**.
3. **Cloudflare** (dash.cloudflare.com): crea la cuenta gratis con
   admin@intemperiemexico.com. Sin tarjeta.
4. **Resend** (resend.com), para los avisos por correo: crea la cuenta
   gratis **con admin@intemperiemexico.com** (solo puede mandar correos a
   la dirección de la cuenta) → API Keys → crear "agente-whatsapp".
   Plan gratis: 3,000 correos al mes, sin tarjeta.
5. **ntfy**, para los avisos al celular: ver la sección 5.D.

### D. ntfy: avisos al celular (5 minutos, gratis, sin cuenta)

ntfy es una app que recibe notificaciones de un "tema" (un canal con
nombre). El agente publica en un tema con nombre secreto y tu celular lo
escucha.

1. Instala **ntfy** desde la App Store o Google Play (el ícono es una
   campana verde con "ntfy").
2. Ábrela → **+** (abajo a la derecha) → en "Topic name" escribe el
   nombre del tema que te di en el chat (empieza con
   `intemperie-avisos-`). Deja el servidor en ntfy.sh → **Subscribe**.
3. En iPhone, acepta las notificaciones cuando lo pida. En Android, en la
   suscripción, activa "Instant delivery" para que lleguen al momento.
4. Listo. Cada aviso dice el tema ("Atender: pide descuento", "POSIBLE
   VENTA: …") y el chat con el número enmascarado. El detalle completo
   (mensaje del cliente y enlace para abrir el chat) llega por correo.

**El nombre del tema es como una contraseña:** quien lo sepa puede leer
los avisos. Por eso no está en el repositorio y los avisos de ntfy nunca
llevan nombres, teléfonos completos ni el texto del cliente. Si se filtra,
se cambia por otro.

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
| 1 | Este plan | Nube | ✅ 28 oct (ajustado a $0 el mismo día) |
| 2 | Código en `agente-whatsapp/`, pruebas locales y modo borrador | Nube | ✅ 28 oct |
| 3 | Kapso y Cloudflare (sección 5), despliegue, 1–2 días en `borrador`, luego `prueba` con tu número, luego `activo` | Tú (cuentas y llaves) + nube | Después de la 2 |
| 4 | Messenger e Instagram | Nube | Cuando Meta apruebe la app |

**Para la Fase 4:** Messenger e Instagram van con nuestra propia app de
Meta, sin proveedor y sin costo por mensaje. La app necesita los permisos
`pages_messaging` e `instagram_manage_messages` con **acceso avanzado**,
que pide revisión de Meta y **verificación del negocio** (RFC y
comprobante de domicilio; trámite gratis). Se puede iniciar esa
verificación mientras avanzan las fases 2 y 3.

## 7. Decisiones del dueño (28 oct)

1. **Avisos:** por correo y por la app ntfy.
2. **Pausa del agente cuando contesta el dueño:** 12 horas.
3. **Chats anteriores:** compartir.
4. Proveedor (Kapso gratis) y servidor (Cloudflare gratis), por la
   condición de $0.

---

**Fuentes** (consultadas el 28 oct 2026):

- Meta, coexistencia: developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users
- Meta, precios: developers.facebook.com/documentation/business-messaging/whatsapp/pricing
- 360dialog, coexistencia: docs.360dialog.com/partner/onboarding/whatsapp-coexistence
- Kapso: kapso.com/pricing, docs.kapso.ai (connect-whatsapp, receive-messages, pricing-faq)
- YCloud: ycloud.com/pricing
- Países excluidos (2026): github.com/orgs/chatwoot/discussions/11216
- Política de IA de Meta: techcrunch.com, 18 oct 2025
- Cloudflare, límites del plan gratis: eastondev.com (resumen de la documentación de Workers)
- Render: temps.sh (precios 2026)
