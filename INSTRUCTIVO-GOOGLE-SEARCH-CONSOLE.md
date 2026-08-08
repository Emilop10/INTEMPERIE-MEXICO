# Instructivo — Dar de alta intemperiemexico.com en Google Search Console

Este documento existe porque el 8 de agosto de 2026 se confirmó que el sitio
**no aparece en Google** (`site:intemperiemexico.com` da 0 resultados), y la
causa no es ningún error técnico — el sitio nunca se dio de alta en Search
Console. Sin eso, Google puede tardar semanas en encontrarlo solo.

Claude (esta sesión, la que edita la tienda) no puede hacer estos pasos por
su cuenta: requieren iniciar sesión en una cuenta de Google, y el entorno
donde corre bloquea la navegación a Google por completo (se intentó,
`net::ERR_CONNECTION_RESET` incluso con un navegador real, sin importar
tener credenciales). Por eso está pensado para **Claude en Chrome** — la
extensión que sí controla un navegador real en tu computadora.

**Fecha en que se detectó el problema:** 8 de agosto de 2026
**Cuenta a usar:** `admin@intemperiemexico.com` (la de Google Workspace que
ya existe para el correo — ver sección 9 del manual). No usar una cuenta
personal, para que el acceso quede a nombre del negocio.

---

## 🤖 Prompt para pegarle a Claude en Chrome

Copia y pega todo el bloque de abajo, tal cual, en una conversación nueva
con la extensión de Claude en Chrome (con tu sesión de Google ya iniciada
en el navegador, idealmente en `admin@intemperiemexico.com`):

> Necesito que des de alta el sitio **intemperiemexico.com** en Google
> Search Console. Sigue estos pasos en orden, uno a la vez, y no avances al
> siguiente hasta terminar el anterior. Si algo no coincide exactamente con
> lo que describo (un botón con otro texto, una pantalla distinta), intenta
> lo más parecido 1-2 veces; si no lo logras, anótalo y sigue con el
> siguiente paso en vez de quedarte atorado.
>
> **Paso 1 — Crear la propiedad**
> Ve a `search.google.com/search-console`. Si no hay sesión iniciada,
> detente y dime que inicie sesión yo mismo. Una vez dentro, haz clic en
> "Agregar propiedad". Vas a ver dos opciones (Dominio / Prefijo de URL) —
> elige **"Prefijo de URL"** (no "Dominio") y escribe
> `https://intemperiemexico.com`. Confirma.
>
> **Paso 2 — Verificación (checkpoint, necesito tu ayuda aquí)**
> Google va a ofrecer varios métodos de verificación. Elige **"Etiqueta
> HTML"**. Te va a mostrar una línea como
> `<meta name="google-site-verification" content="ALGO_ASI" />`.
> **No hagas clic en "Verificar" todavía.** Copia esa línea completa (o
> solo el valor de `content="..."`) y muéstramela en tu respuesta — la
> necesito para pegarla en el sitio antes de que la verificación pueda
> funcionar. Espera a que yo te confirme que ya está en vivo antes de
> continuar al paso 3.
>
> **Paso 3 — Confirmar verificación**
> Cuando te confirme que la etiqueta ya está desplegada, vuelve a Search
> Console y haz clic en "Verificar". Si falla, espera 1 minuto e
> inténtalo de nuevo (a veces tarda en propagar). Si falla más de 3 veces,
> anótalo en tu informe final y sigue con el paso 4 de todos modos (a
> veces el sitemap se puede enviar aunque la verificación tarde un poco
> más en confirmar).
>
> **Paso 4 — Enviar el sitemap**
> En el menú lateral de Search Console, ve a "Sitemaps". En el campo de
> texto escribe `sitemap.xml` y haz clic en "Enviar". Confirma que el
> estado quede en "Correcto" o "Procesando" (no "Error").
>
> **Paso 5 — Solicitar indexación de las páginas clave**
> Usa la barra de búsqueda superior que dice "Inspeccionar cualquier URL".
> Para cada una de estas URLs, pégala, espera el resultado ("La URL no
> está en Google" es lo esperado), haz clic en "Solicitar indexación", y
> espera a que la prueba termine antes de pasar a la siguiente:
> ```
> https://intemperiemexico.com/
> https://intemperiemexico.com/collections/todo-pesca
> https://intemperiemexico.com/collections/miras-y-binoculares
> https://intemperiemexico.com/collections/diabolos-y-municiones
> https://intemperiemexico.com/collections/rifles-y-pistolas-de-aire
> https://intemperiemexico.com/products/senuelo-rapala-countdown-07-ayu-minnow
> ```
> Si Google bloquea por límite diario de solicitudes antes de terminar la
> lista, detente ahí y anota cuáles sí alcanzaste a pedir y cuáles no.
>
> **Al terminar (o si te quedas atorado en algún paso), dame un informe
> con este formato exacto:**
> - ✅ Lo que sí lograste hacer, paso por paso
> - ❌ Lo que no pudiste hacer, y por qué (mensaje de error exacto si lo
>   hubo, o descripción de qué viste en pantalla)
> - 📋 El código de verificación del Paso 2, si llegaste a obtenerlo
> - ⏳ Cualquier paso que quedó a medias esperando algo (por ejemplo, el
>   Paso 3 esperando que yo confirme el deploy)

---

## Qué hacer con el resultado

Cuando Claude en Chrome te dé el informe:

1. Si llegó al **Paso 2** y te dio el código de verificación, pásamelo a
   mí (esta conversación) tal cual — lo subo al `<head>` del tema en
   2 minutos y te aviso.
2. Con eso desplegado, dile a Claude en Chrome (en la misma conversación
   con él) que continúe desde el **Paso 3**.
3. Si el informe muestra que se atoró en algo (login con 2FA, un captcha,
   una pantalla que no reconoció), cuéntamelo y ajustamos el instructivo
   o lo terminamos a mano juntos.

## Por qué está partido en dos agentes

Claude en Chrome controla tu navegador real, así que sí puede llegar a
Google (yo no puedo desde este entorno). Pero no tiene acceso al código de
la tienda ni puede desplegar cambios al tema — eso solo lo puedo hacer yo.
Por eso el Paso 2 es un punto de entrega obligatorio entre los dos: él
consigue el código, yo lo publico, y desde ahí él termina el resto solo.

## Qué esperar después de completado

- **Home y departamentos**: normalmente se indexan en **horas a 2-3 días**
  después de "Solicitar indexación".
- **Resto del catálogo**: Google lo va encontrando solo, siguiendo enlaces
  internos, en **1-3 semanas** aproximadamente.
- **Cómo confirmar que ya funcionó**: busca `site:intemperiemexico.com` en
  Google — cuando empiece a aparecer, ya está indexando. También se puede
  revisar **Search Console → Indexación → Páginas**, que muestra cuántas
  URLs están indexadas y la razón si alguna falla.
- Si después de una semana el reporte de "Páginas" muestra errores raros
  (no debería, el sitio ya se auditó técnicamente — ver sección 27 del
  manual), mándame captura y lo reviso.
