# Instructivo — Dar de alta intemperiemexico.com en Google Search Console

Esta guía existe porque el 8 de agosto de 2026 se confirmó que el sitio
**no aparece en Google** (`site:intemperiemexico.com` da 0 resultados), y
la causa no es ningún error técnico — el sitio nunca se dio de alta en
Search Console. Sin eso, Google puede tardar semanas en encontrarlo solo.

Claude no puede hacer estos pasos por su cuenta: requieren iniciar sesión
en una cuenta de Google, y el entorno donde corre bloquea la navegación a
Google por completo (se intentó, `net::ERR_CONNECTION_RESET` incluso con
Chromium real). Por eso este instructivo es para que **tú** lo hagas —
toma unos 10 minutos, y avísame en cuanto tengas el código del Paso 2 para
que yo lo suba de inmediato.

**Fecha en que se detectó el problema:** 8 de agosto de 2026
**Cuenta recomendada:** `admin@intemperiemexico.com` (la de Google
Workspace que ya existe para el correo — ver sección 9 del manual). Usar
esa y no una personal, para que el acceso quede a nombre del negocio.

---

## Paso 1 — Crear la propiedad en Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Inicia sesión con `admin@intemperiemexico.com`
3. Clic en **"Agregar propiedad"**
4. Vas a ver dos tipos de propiedad — elige el de la derecha, **"Prefijo de
   URL"** (no "Dominio"), y escribe:
   ```
   https://intemperiemexico.com
   ```
5. Clic en **"Continuar"**

> ⚠️ **Por qué "Prefijo de URL" y no "Dominio":** el tipo "Dominio" pide
> verificar por registro DNS (TXT) en Namecheap — funciona, pero es un
> paso extra fuera de Shopify. "Prefijo de URL" se puede verificar con una
> etiqueta HTML que yo mismo subo al tema en el momento, sin tocar DNS.

## Paso 2 — Verificar la propiedad (etiqueta HTML)

1. En las opciones de verificación, elige **"Etiqueta HTML"** (HTML tag)
2. Google te va a mostrar una línea parecida a esta:
   ```html
   <meta name="google-site-verification" content="AbCdEfGhIjKlMnOpQrStUvWxYz1234567890" />
   ```
3. **Copia esa línea completa** (o solo el valor de `content="..."`) y
   pásamela por chat — la subo directo al `<head>` del tema
   (`layout/theme.liquid`) y la despliego. Te aviso en cuanto esté en vivo
   (toma 1-2 minutos).
4. Vuelve a Search Console y haz clic en **"Verificar"**.

> Si haces clic en "Verificar" antes de avisarme o antes de que yo
> confirme que ya está desplegada, va a fallar — no pasa nada, solo
> espera mi confirmación e inténtalo de nuevo.

## Paso 3 — Enviar el sitemap

Ya verificada la propiedad:

1. En el menú lateral, ve a **"Sitemaps"**
2. En el campo de texto, escribe:
   ```
   sitemap.xml
   ```
3. Clic en **"Enviar"**

Deberías ver el estado pasar a "Correcto" (puede tardar unos minutos en
procesar). El sitemap ya existe y está bien formado — lo gestiona Shopify
automáticamente, no hay que subir nada a mano.

## Paso 4 — Pedir indexación inmediata de las páginas clave

Esto es lo que de verdad acelera todo: en vez de esperar a que Google
rastree el sitio solo (puede tardar semanas), le pides que indexe páginas
específicas ahora mismo.

1. Arriba, en la barra de búsqueda que dice **"Inspeccionar cualquier URL"**,
   pega cada una de estas URLs (una por una) y presiona Enter:
   ```
   https://intemperiemexico.com/
   https://intemperiemexico.com/collections/todo-pesca
   https://intemperiemexico.com/collections/miras-y-binoculares
   https://intemperiemexico.com/collections/diabolos-y-municiones
   https://intemperiemexico.com/collections/rifles-y-pistolas-de-aire
   ```
2. Para cada una, Google va a decir **"La URL no está en Google"** (normal,
   es justo lo que estamos resolviendo). Haz clic en **"Solicitar
   indexación"**.
3. Espera a que termine la prueba (unos 30-60 segundos) y confirma.
4. Repite con 3-5 productos que quieras destacar (los más vendidos, o los
   de precio más alto). Ejemplo de cómo se ve la URL de un producto:
   ```
   https://intemperiemexico.com/products/senuelo-rapala-countdown-07-ayu-minnow
   ```

> Google limita cuántas solicitudes de indexación se pueden hacer por día
> (varía, pero suelen ser docenas). Con la home + 4 departamentos + un
> puñado de productos es más que suficiente para arrancar — el resto del
> catálogo lo va descubriendo solo siguiendo los enlaces internos, ahora
> que ya sabe que el sitio existe.

## Qué esperar después

- **Home y departamentos**: normalmente se indexan en **horas a 2-3 días**
  después de "Solicitar indexación".
- **Resto del catálogo**: Google lo va encontrando solo, siguiendo enlaces,
  en **1-3 semanas** aproximadamente.
- **Cómo confirmar que ya funcionó**: busca `site:intemperiemexico.com` en
  Google — cuando empiece a aparecer, ya está indexando. También puedes
  revisar **Search Console → Indexación → Páginas**, que muestra cuántas
  URLs están indexadas y cuántas no, con la razón si alguna falla.
- Si después de una semana el reporte de "Páginas" muestra errores
  raros (no debería, el sitio ya se auditó técnicamente), mándame captura
  y lo reviso.

---

## Resumen rápido (para cuando ya sepas el proceso)

1. [search.google.com/search-console](https://search.google.com/search-console) → Agregar propiedad → **Prefijo de URL** → `https://intemperiemexico.com`
2. Verificación → **Etiqueta HTML** → me pasas el código → yo lo despliego → tú das clic en "Verificar"
3. Sitemaps → enviar `sitemap.xml`
4. Inspeccionar cualquier URL → pegar home + 4 departamentos + varios productos → "Solicitar indexación" en cada una
5. Esperar horas/días (home) o semanas (catálogo completo) y confirmar con `site:intemperiemexico.com`
