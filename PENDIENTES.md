# Pendientes — Intemperie México

Temas abiertos de la tienda. Casi todos requieren una decisión o datos tuyos;
el resto de la auditoría ya quedó implementado y en vivo.

**Abiertos ahora mismo:** crear y vincular Instagram ([2](#2-redes-sociales--parcialmente-resuelto-28-jul)),
TikTok cuando exista, y lanzar la primera campaña de Meta Ads
([8](#8-meta-ads-facebookinstagram--infraestructura-lista-12-ago)) — la
infraestructura ya está lista, solo falta Instagram y que el cliente
confirme sus pendientes antes de invertir presupuesto real.

**Resuelto el 13 de agosto:** señales de confianza en la homepage
([3](#3-señales-de-confianza-ausentes--resuelto-13-agosto-2026)) y el deploy
automático ([5](#5-activar-el-deploy-automático--resuelto-13-agosto-2026)).

> 📌 **Nota de trabajo (4 de agosto):** al redactar prompts para Claude en
> Chrome, ser conciso y pedirle explícitamente que si no encuentra algo en
> 1-2 lugares razonables de la interfaz, lo reporte directo en vez de seguir
> buscando — evita gastar tokens de más explorando pantallas.

**Tema en vivo:** "Intemperie Mexico - Rediseño 2026" — publicado el 31 de
julio de 2026. Ya no hay tema de trabajo separado; todo cambio se ve en
vivo de inmediato.
**Dominio principal:** `https://intemperiemexico.com` — conectado y
verificado el 3 de agosto de 2026. `wfuxvx-yn.myshopify.com` ahora
redirige automáticamente al dominio propio.
**Última actualización:** 13 de agosto de 2026

**Correo profesional:** Google Workspace reactivado con `admin@intemperiemexico.com`
como cuenta principal. DNS (MX, SPF, DKIM) verificado y propagado. 6 alias activos
para recibir y para "enviar como": `ventas@`, `contacto@`, `info@`, `soporte@`,
`pedidos@`, `facturacion@`. El footer del sitio ya muestra `ventas@` como contacto
y `facturacion@` para solicitudes de factura.

**Políticas legales:** las 5 páginas (Términos, Privacidad, Envíos, Devoluciones,
Contacto) se reescribieron por completo y ya están **en vivo** (a diferencia del
resto del rediseño, las políticas legales no viven en el tema de copia — son
configuración a nivel tienda). Sin RFC ni ciudad expuestos, sin requisito de
mayoría de edad (por decisión explícita), con cláusulas de uso responsable para
productos de aire comprimido. Ver `INSTRUCTIVO-APP-SHOPIFY.md` si se necesita
volver a tocar permisos de la app para editarlas de nuevo.

---

## ~~1. Dos productos sin subcategoría~~ ✅ Resuelto (28 jul)

Se crearon dos colecciones nuevas, con portada y descripción, conectadas en la
homepage y en el mega-menú (este último ya es visible en el sitio en vivo):

- **Calibre 6.35mm** — Diábolo Gamo Hunter Metal Impact
- **CO2 y Cartuchos** — Cartucho de Gas CO2 12 Gramos

"Diábolos y Municiones" queda al 100% de cobertura, igual que los otros 3 departamentos.

---

## 2. Redes sociales — parcialmente resuelto (28 jul)

✅ **Facebook conectado**: `https://www.facebook.com/people/Intemperie-México/61588253103964/`
ya aparece como ícono en el footer del tema de trabajo.

⏳ **Pendiente — Instagram (13 agosto 2026):** todavía no existe cuenta de
Instagram del negocio (confirmado: "No se ha añadido ninguna cuenta de
Instagram" en el Business Manager). Sin ella, los anuncios de Meta solo
pueden salir en Facebook, perdiendo las colocaciones que mejor suelen
rendir (Reels, Explorar). **Lo tienes que crear tú** — requiere
verificación por teléfono/correo, no se puede delegar. Pasos exactos ya
documentados en [`INSTRUCTIVO-META-ADS.md`](./INSTRUCTIVO-META-ADS.md)
(Paso 2): se crea directo desde Meta Business Suite, ya vinculada a la
página de Facebook existente, sin pasar por la app de Instagram.

⏳ **Pendiente:** TikTok — cuando se abra esa cuenta, mandar el link y se
conecta igual de rápido.

---

## 3. Señales de confianza ausentes — ✅ resuelto (13 agosto 2026)

La tienda vende rifles y ópticas de precio alto, pero la página no comunicaba
en ningún lado tiempos de entrega, garantía ni política de devoluciones (las
políticas legales existen, link en el footer, pero prácticamente nadie las
abre).

Se agregó una franja de confianza en la homepage, justo antes de la sección
de cierre, con los 3 puntos confirmados por el cliente:

- Envío: "Entrega en 2 a 7 días hábiles a todo México"
- Garantía: "Garantía de compra — si algo llega mal, lo resolvemos." (mismo
  texto ya usado en la ficha de producto, para no crear otra inconsistencia
  de copy)
- Devoluciones: "7 días para cambios o devoluciones", con link directo a la
  política de devoluciones real (`shop.refund_policy.url`)

Implementado en `sections/brand-experience.liquid` (nueva sección +
settings `trust_*` editables desde Personalizar tema) y
`assets/brand-tokens.css` (`.im-trust-band`), reutilizando el componente
`.im-trust-item` que ya existía en la ficha de producto.

---

## 5. Activar el deploy automático — ✅ resuelto (13 agosto 2026)

Hasta el 7 de agosto, guardar código en GitHub **no lo subía a la tienda**.
Eran dos cajones separados. Eso hizo que tres arreglos seguidos de la barra
deslizable parecieran no funcionar: estaban guardados, pero nunca habían
llegado a Shopify (ver sección 25 del manual).

El mecanismo (`.github/workflows/deploy-shopify.yml`) ya existía desde el 7
de agosto pero le faltaba el secret `SHOPIFY_ADMIN_TOKEN` en GitHub —
llevaba fallando en silencio varios commits sin que nadie lo notara. El
cliente lo configuró el 13 de agosto (GitHub → Settings → Secrets and
variables → Actions). Verificado reintentando la corrida fallida más
reciente: terminó en éxito.

Desde ahora, cualquier push que toque `tema-shopify/` se despliega solo,
sin pasos manuales.

> Si el token deja de servir en el futuro (expira o cambian los scopes de
> la app), regenerarlo toma 5 minutos con `INSTRUCTIVO-APP-SHOPIFY.md`, y
> solo hay que actualizar este mismo secret.

---

## ~~6. Barra deslizable de subcategorías~~ ✅ Resuelto (7 ago)

Confirmado funcionando por el cliente. Diseño final: pista `#2C2C2E` de 10px
con thumb `#F5F5F7` casi blanco, tope del 30% del ancho.

**La causa nunca fue el color ni el ancho.** `base.css` trae
`div:empty { display: none }`, y el thumb es un div sin contenido — estaba
oculto desde la primera versión. Se corrigió declarándole `display: block`.

> ⚠️ **Trampa para el futuro:** cualquier elemento decorativo sin contenido en
> este tema queda invisible por esa misma regla. Método de diagnóstico completo
> en [`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md).

---

## ~~7. Alta en Google Search Console~~ ✅ Ejecutado (9 ago) — ahora solo esperar

El sitio no aparecía en Google. Confirmado que **no era un problema
técnico**: robots.txt, sitemap, canonical y meta description ya estaban
bien. La causa real era que nunca se dio de alta en Search Console — ya
se resolvió.

Ya se hizo todo lo que se podía por código (sección 27 del manual):
`BreadcrumbList`, Organization ampliado, `og:locale`, `og:image` genérico
en páginas sin foto propia.

**Lo que se hizo** (vía Claude en Chrome, instructivo en
[`INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md`](./INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md)):
resultó que ya existía una propiedad verificada de tipo Dominio desde
mayo — se saltó la verificación y se fue directo a enviar el sitemap
(415 páginas descubiertas) y pedir indexación manual de la home + 4
departamentos + un producto.

**Verificado después, no solo confiando en el reporte:** la home ya está
indexada de verdad (confirmado con el texto exacto de Search Console). De
36 páginas evaluadas por Google, 29 marcaban algún error — se revisaron
todas en vivo con `curl` y **ninguna es un problema actual**: son
nombres de colecciones de antes de la reorganización en departamentos,
productos ya retirados del catálogo, o ruido de rastreo. Detalle completo
en la sección 27 del manual.

**No queda nada por hacer** — ni de tu lado ni del mío. Solo esperar a
que Google termine de evaluar el resto de las 415 páginas del sitemap
(normal que tome de días a un par de semanas).

---

## Nota aparte — categorización de Airsoft

Los 4 productos de **Airsoft 6mm** viven dentro de "Diábolos y Municiones", pero
técnicamente son balines de airsoft, no diábolos de aire comprimido. Funcionan
bien ahí por ahora; si esa línea crece, conviene separarla como su propio
departamento.

---

## ~~4a. Publicar el rediseño~~ ✅ Resuelto (31 jul)

**El tema "Intemperie Mexico - Rediseño 2026" ya es el tema en vivo** (rol
`main`), publicado directamente por API tras verificar que homepage,
colecciones y las 5 páginas de políticas cargan sin errores Liquid.
"Dawn" (el diseño anterior) quedó como tema sin publicar, disponible como
respaldo. A partir de este momento **todo lo que se edite en el tema de
trabajo se ve en vivo de inmediato** — ya no hay distinción entre "tema de
trabajo" y "tema en vivo".

## ~~4b. Chatbot de IA (Zipchat)~~ ✅ Resuelto (31 jul)

Se instaló y configuró por completo la app **Zipchat AI** como widget de
chat del sitio (no WhatsApp, ver `CHATBOT-IA-SITIO.md` para el porqué):
Bubble chat visible en todo el sitio (móvil y escritorio), asistente
renombrado a **"Cartucho"** con mensaje de bienvenida en la voz de
marca, y base de conocimiento (envíos, devoluciones, catálogo, pago,
contacto) cargada en "AI training". Probado con preguntas reales
("¿cuánto cuesta el envío?", "¿aceptan devoluciones de municiones?") y
responde correctamente.

⚠️ **Plan gratuito casi al límite**: 100/100 páginas de entrenamiento
usadas (más las 120 respuestas de IA/mes incluidas). Si en el futuro se
necesita indexar más contenido, hay que subir al plan Starter ($49
USD/mes).

**Prueba exhaustiva realizada (3 de agosto)**: 30 preguntas reales
cubriendo envíos, devoluciones, catálogo, pago, temas legales/sensibles
e intentos de manipulación del bot. Se detectaron y corrigieron 3
problemas:
- Tiempo de entrega inconsistente (la copia de marketing decía "2 a 4
  días", la política real dice "2 a 7 días hábiles") → corregido en el
  sitio (homepage, ficha de producto) y en el entrenamiento del bot,
  ahora todo coincide.
- El bot se identificaba con el dominio técnico
  (`wfuxvx-yn.myshopify.com`) en vez de "Intemperie México" → corregido
  con una instrucción explícita en "Additional instructions" (Prompt and
  Skills).
- El bot negaba tener número de WhatsApp pese a que sí estaba en el
  texto de entrenamiento — causa real: Zipchat tiene una integración
  dedicada de WhatsApp Business (vía Meta) que exige conectar un número
  exclusivo; como no está conectada, el bot daba esa respuesta fija sin
  importar el texto. Se decidió **no conectar esa integración** (fuera
  de alcance, requeriría dedicar un número solo a eso) y en su lugar se
  agregó una instrucción explícita que fuerza al bot a dar el número de
  WhatsApp de todos modos.
- Se verificó que no existan las 4 cañas de pescar mencionadas por el
  bot fueran alucinación — sí existen en el catálogo real, sin problema.
- Se revisó Contenido → Páginas y Artículos del blog por si los atajos
  de teclado accidentales durante la prueba habían creado borradores
  vacíos — no se encontró nada, sitio limpio.

✅ **Dominio propio conectado (3 de agosto)**: `intemperiemexico.com` ya
es el dominio principal de la tienda, con DNS verificado en Namecheap
(registro A y CNAME agregados sin tocar los registros de correo de
Workspace) y certificado TLS activo.

✅ **Escalación a WhatsApp agregada (3 de agosto)**: no existe una
función nativa de "handoff a humano con enlace" en Zipchat (el único
skill relacionado solo notifica internamente al equipo, no le muestra
nada al cliente), así que se resolvió con una instrucción explícita en
"Additional instructions": cuando Cartucho no puede resolver la duda, o
el cliente pide hablar con una persona, incluye el link
`https://wa.me/527773277340`. Confirmado en el widget público (no solo
en el Test chat del admin, que renderiza distinto) que el link aparece
como hipervínculo clicable real y abre WhatsApp correctamente.

El enlace además lleva un **mensaje precargado** ("Hola, vengo del chat
de Cartucho en la página y tengo una duda que no pude resolver.") vía el
parámetro `?text=` de wa.me, para que el cliente no llegue a un chat
vacío. Esto obligó a **desactivar "Enable UTM tracking"** en Chat
settings → Configuration, porque Zipchat sobreescribía cualquier query
string del link con sus propios parámetros UTM — decisión consciente:
se prioriza la experiencia del cliente (mensaje con contexto) sobre el
tracking interno de origen de conversación de Zipchat.

---

## 8. Meta Ads (Facebook/Instagram) — infraestructura lista, 12 ago

Arrancó el proyecto de publicidad en Meta. Antes de gastar un peso se
verificó algo importante: **Meta prohíbe anunciar armas, municiones y
accesorios de armas** (política oficial, riesgo real de baneo permanente
de la cuenta publicitaria). Del catálogo, pesca y binoculares (~84%) sí
se pueden anunciar; miras, diábolos/municiones y rifles/pistolas de aire
(~16%) no. Esto no cambia nada en la tienda — solo qué se muestra en los
anuncios.

**Sorpresa al revisar la cuenta (vía Claude en Chrome guiando al
cliente):** no partíamos de cero. Ya existía todo desde el 16 de febrero
— cuenta publicitaria, pixel activo, canal de Shopify instalado, y
$1,823 MXN de gasto real entre febrero y abril. Quedaban 6 campañas
"activas" pero sin entregar nada desde hace 4 meses (config de
prueba/agencia abandonada) — **se eliminaron por instrucción del
cliente**. También se corrigió el catálogo de Meta: estaba desactualizado
(solo 56 de 250+ productos) y al republicar todo por error quedaron
incluidas armas y municiones — **ya se excluyeron 59 productos
prohibidos** del canal, confirmado en vivo. Detalle completo de todo el
proceso en la sección 29 del `MANUAL-PROYECTO.md`.

**Ya hecho:**
- Setting del tema, snippet del pixel (`meta-pixel.liquid`) y JS
  (`meta-pixel.js`) — quedan **inactivos a propósito**: el pixel real ya
  corre vía el canal oficial de Shopify desde febrero, activar el manual
  duplicaría eventos.
- `scripts/meta-ads.py` para listar, reportar, pausar/activar campañas y
  presupuesto.
- Token de System User creado, verificado y funcionando (`ads_management`,
  `ads_read`, `business_management`, `catalog_management`).
- Cuenta publicitaria limpia, catálogo corregido, pixel confirmado activo.
- `INSTRUCTIVO-FACEBOOK-ADS.md` — guía operativa completa (cómo se opera
  la cuenta, convenciones de nombres, reglas de presupuesto, comandos del
  script, lecciones aprendidas de esta puesta en marcha).

**A petición del cliente, el lanzamiento de la primera campaña queda en
pausa** hasta que confirme una lista de pendientes adicionales antes de
invertir presupuesto real. En cuanto la dé, se arma la campaña — solo
pesca — y se deja **pausada para su revisión** antes de activarla.

---

## Datos de contacto ya integrados

Por si se necesitan para otros usos:

- **WhatsApp:** +52 777 327 7340
- **Correo:** ventas@intemperiemexico.com

Nota: por decisión explícita, el footer **no menciona la ciudad de origen de los
envíos** (Cuernavaca, Morelos) — solo dice "Envíos a todo México", para no exponer
la ubicación del negocio.
