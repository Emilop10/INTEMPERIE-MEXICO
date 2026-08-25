# Pendientes — Intemperie México

Temas abiertos de la tienda. Casi todos requieren una decisión o datos tuyos;
el resto de la auditoría ya quedó implementado y en vivo.

## ⚠️ Este archivo llevaba desde el 15 de agosto sin actualizar

El bloque de abajo describía la campaña como "creada y en pausa,
$100/día, optimizada a Compra, 324 productos". Nada de eso es cierto
hoy. **Estado real, verificado el 22 de agosto de 2026** — detalle
completo en `MANUAL-PROYECTO.md`, secciones 33 y 35 (arranque y
primeros días), 37 (6 accesorios de arma que se colaron y se
excluyeron), 38-40 (reconstrucción completa: por qué no vendía, el
tope de gasto), y 41 (auditoría de conversión del sitio):

| | |
|---|---|
| Campaña | `IMX \| Ventas \| Pesca y Óptica \| Catálogo dinámico \| Ago26` |
| Estado | **Activa**, entregando |
| Conjunto vigente | optimiza a `CONTENT_VIEW` (no a Compra — con este presupuesto, optimizar a Compra nunca sale de aprendizaje), $55/día |
| Conjunto de productos | **38 productos** ≥$500, en stock, sin accesorios de arma (no 324) — piso subido de $300 a $500 el 24 de agosto (sección 45), y +3 al publicar los combos nuevos de $999-$1,499 (sección 47) |
| Tope de gasto | a nivel de **cuenta**, se ajusta cada semana — ver sección 40 del manual |
| Resultado a la fecha | 0 compras, 1 carrito real en 6 días — la sección 41 documenta la auditoría completa de por qué |

Seguimiento: `python3 scripts/meta-ads.py reporte --dias 7` (usa
`time_range` explícito, no `date_preset` — ver sección 34/35 del
manual sobre por qué).

**Shopify Payments está desactivado de forma definitiva** desde el 14
de agosto (aviso de Trust & Safety por los rifles de aire). **Decisión
cerrada el 25 de agosto:** el dueño conserva los rifles y pistolas de
aire en el catálogo y no vuelve a usar Shopify Payments. El checkout
se queda permanentemente en **PayPal + Mercado Pago**, que además
aportan meses sin intereses y pago en efectivo en OXXO y 7-Eleven —
medios que Shopify Payments no daba. Sección 30 del manual. **No hay
que volver a evaluarlo.**

---

**✅ Cerrado el 24 de agosto — el checkout sí funciona y sí se mide.**
La revisión de los 3 puntos bloqueantes antes de la siguiente campaña
encontró que la tienda llevaba 6+ meses sin una compra completada, y
el dueño hizo una compra de prueba real (pedido #1005, $190.95 MXN,
"Pagado") para confirmarlo de punta a punta. El pixel de Meta sí
recibió el evento Compra — calidad 9.3/10, el mejor de todo el sitio —
la Conversions API está activa ("Comparte datos" ya en Máximo). Las
capturas que mostraban cero compras eran por tener seleccionado el
portafolio de negocio equivocado en Meta Business Suite ("Alcampo
Cuernavaca" en vez de "Intemperie México"), no un problema real.
**Ningún bloqueante queda para la siguiente campaña.** Detalle
completo en la sección 46 del manual.

**Abiertos ahora mismo:** cerrar los productos de
[`PRODUCTOS-PENDIENTES.md`](./PRODUCTOS-PENDIENTES.md) y TikTok cuando
exista la cuenta. (La decisión sobre Shopify Payments que aparecía
aquí ya se cerró el 25 de agosto — ver arriba. El recorrido
interactivo del checkout también se completó — ver "Estado al 22 de
agosto" en la sección
45 del manual; esta línea estaba desactualizada.)

---

## ⚠️ Los 3 combos nuevos ya están a la venta — hay una tarea manual asociada

Publicados el 24 de agosto de 2026 en Online Store, Point of Sale y
Facebook & Instagram (mismos canales que los combos que ya existían).
Verificado en vivo: los 3 dan HTTP 200, la colección `combos` pasó de
9 a 12 productos, cada uno con ficha técnica y sin errores de Liquid.

| Combo | Precio | Stock |
|---|---|---|
| Okuma Revenger 8'0" | $999 | 1 |
| Blue Fox Power Boat 6'4" | $1,049 | 1 |
| Rapala Corux 240 | $1,499 | 1 |

### 🔴 Tarea manual permanente: descontar componentes al vender un combo

**Shopify NO resta el stock de la caña ni del carrete cuando se vende
un combo.** Los componentes están a 1 unidad cada uno y siguen
publicados por separado, así que:

> **Cada vez que se venda un combo, hay que entrar a Shopify y bajar a
> 0 el stock de sus componentes** (o restar la cantidad vendida).

Si no se hace, se puede vender la misma caña dos veces y hay que
cancelarle el pedido a un cliente — caro en una tienda que apenas
registró su primera compra.

Componentes de cada combo:
- **Okuma Revenger** → `cana-de-pescar-okuma-revenger-spinning-80-2-40m` + `carrete-okuma-revenger-rv-80-spinning`
- **Blue Fox** → `cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m` + `carrete-blue-fox-ranco-3000sp-spinning`
- **Rapala Corux** → `cana-de-pescar-rapala-corux-240-710` + `carrete-gimbel-jl4000-spinning` + `caja-rapala-utility-box-chica`

**Por qué se eligió esta vía y no otra** (decisión del dueño, 24 ago):
despublicar los componentes era más seguro pero **los 7 están dentro
del conjunto anunciable de Meta** — quitarlos
habría reducido el catálogo anunciable un 20%, justo lo contrario de
lo que se buscaba. Una app de bundles lo resolvería de raíz pero
cuesta mensualidad. Con el volumen actual de pedidos el riesgo de
colisión es bajo, así que se optó por lo manual. **Revisar esta
decisión cuando suba el volumen de pedidos.**

### Stock: solo alcanza para 1 pieza de cada combo

Dato que la propuesta original no tenía: los componentes están a 1
unidad, así que cada combo se creó con stock 1. Para vender más hay
que reabastecer los componentes.

**Resuelto el 13-15 de agosto:** señales de confianza en la homepage
([3](#3-señales-de-confianza-ausentes--resuelto-13-agosto-2026)), el deploy
automático ([5](#5-activar-el-deploy-automático--resuelto-13-agosto-2026)),
e Instagram creado y vinculado ([2](#2-redes-sociales--parcialmente-resuelto-28-jul)).

**Resuelto el 22-23 de agosto:** auditoría de conversión completa —
ficha de producto, carrito, umbral de envío único, métodos de pago
visibles ([sección 41 del manual](./MANUAL-PROYECTO.md)) — e
integración de reseñas reales de Judge.me
([9](#9-judgeme-reseñas-reales--resuelto-23-agosto-2026)).

**Resuelto el 24 de agosto (Ola 6):** con dos agentes especializados
(Persona Walkthrough + Paid Social Strategist), verificado hallazgo
por hallazgo antes de actuar — piso de precio del conjunto de Meta
subido de $300 a $500 (72→35 productos, con datos reales de la API en
vez de la recomendación cruda del agente que hubiera dejado solo 23),
y productos agotados ya no se destacan en el home. Ver sección 45 del
manual, incluye un pendiente propio no reportado por ningún agente
(`inventory_threshold` causando "Bajas existencias" en el 87% del
catálogo) y una alerta de drift evitada a tiempo (casi se sube
`templates/product.json` sin los App Blocks de Judge.me que el
personalizador agregó hoy).

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
**Última actualización:** 22 de agosto de 2026

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
productos de aire comprimido. Si se necesita volver a tocar permisos de la
app para editarlas de nuevo, ver
[`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md)
— ahí vive la **lista vigente de scopes** (la de `INSTRUCTIVO-APP-SHOPIFY.md`
quedó desactualizada y reautorizar con ella degrada el token).

---

## ~~1. Dos productos sin subcategoría~~ ✅ Resuelto (28 jul)

Se crearon dos colecciones nuevas, con portada y descripción, conectadas en la
homepage y en el mega-menú (este último ya es visible en el sitio en vivo):

- **Calibre 6.35mm** — Diábolo Gamo Hunter Metal Impact
- **CO2 y Cartuchos** — Cartucho de Gas CO2 12 Gramos

"Diábolos y Municiones" queda al 100% de cobertura, igual que los otros 3 departamentos.

---

## 2. Redes sociales — parcialmente resuelto (28 jul, Instagram 14 ago)

✅ **Facebook conectado**: `https://www.facebook.com/people/Intemperie-México/61588253103964/`
ya aparece como ícono en el footer del tema de trabajo.

✅ **Instagram creado y vinculado (14 agosto 2026):** cuenta `@intemperiemexico`,
tipo Empresa, creada por el cliente y vinculada al Business Manager desde
Meta Business Suite. El camino que proponía originalmente
`INSTRUCTIVO-META-ADS.md` (crear directo desde Business Suite) resultó
incorrecto — se corrigió el instructivo con el camino real (crear en
instagram.com primero, vincular después). Detalle completo en la sección
29 del `MANUAL-PROYECTO.md`.

⏳ **Pendiente:** TikTok — cuando se abra esa cuenta, mandar el link y se
conecta igual de rápido.

---

## 3. Señales de confianza ausentes — 🟡 resuelto en homepage, ampliado 22 ago

> **Actualización 22 de agosto:** este ítem se cerró resolviendo solo la
> homepage. La ficha de producto — que es donde de verdad se decide la
> compra — siguió sin devoluciones, garantía visible ni tiempo de entrega
> estructurado hasta la auditoría de conversión (sección 41 del manual),
> que agregó tres pestañas colapsables a la ficha y llevó las mismas
> señales al carrito. Se deja el registro original abajo tal cual, porque
> la lección importa: un ✅ prematuro puede tapar la mitad del problema.

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
> la app), el procedimiento completo está en
> [`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md):
> **empieza por su diagnóstico de 4 pasos** — más de una vez el token
> resultó estar vivo y el problema era otro. Regenerarlo toma 5 minutos,
> y después hay que actualizar este mismo secret o el deploy automático
> deja de funcionar **en silencio**.

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

## 8. Meta Ads (Facebook/Instagram) — 🟡 activa, reconstruida (ver arriba)

> **Actualización 22 de agosto:** todo lo que sigue describe el arranque
> del 15 de agosto (correcto en su momento). La campaña se reconstruyó
> por completo entre el 18 y el 20 de agosto — ver el recuadro de estado
> real al principio de este archivo y `MANUAL-PROYECTO.md` secciones
> 37-40. Se deja el registro original abajo porque documenta bien la
> puesta en marcha inicial (System User, catálogo, Instagram), que sigue
> siendo válida.


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
  presupuesto — y (agregado 14 agosto) `activos` para descubrir
  página/Instagram/catálogo/pixel, y `crear-campania` para armar la
  campaña completa (siempre en pausa).
- Token de System User creado, verificado y funcionando (`ads_management`,
  `ads_read`, `business_management`, `catalog_management`).
- Cuenta publicitaria limpia, catálogo corregido, pixel confirmado activo.
- Instagram creado y vinculado (ver sección 2 de arriba).
- `INSTRUCTIVO-FACEBOOK-ADS.md` — guía operativa completa (cómo se opera
  la cuenta, convenciones de nombres, reglas de presupuesto, comandos del
  script, lecciones aprendidas de esta puesta en marcha).

**Ya no hay bloqueos.** La primera campaña se creó el 15 de agosto y
está en pausa esperando revisión — ver el recuadro ✅ al principio de
este archivo para el ID y el comando de activación.

En el camino se resolvieron tres obstáculos que no estaban previstos, los
tres documentados en la sección 33 del manual: el "API access blocked"
(era el User-Agent del script, no la red), el catálogo de Meta muerto
desde febrero, y que la app tenía que pasar a modo Público para poder
crear anuncios.

---

## ~~9. Judge.me (reseñas reales)~~ ✅ Resuelto (23 agosto 2026)

Instalado con la cuenta existente del dueño: **8 reseñas reales**, 4 de
producto (5.0★ promedio, 3 de 4 emparejadas con productos activos) y 4
de tienda sin producto asociado. Conectado al tema en la ficha de
producto (badge + listado completo) y en las tarjetas de producto,
usando el namespace propio de Judge.me
(`product.metafields.judgeme.badge`/`.widget` — Judge.me no usa el
metafield genérico de Dawn). Verificado en vivo con `curl` contra
producción tras dos rondas de despliegue: el HTML trae el markup
correcto (`div.jdgm-widget` con `data-id`), sin errores de Liquid en
productos con y sin reseñas, sin regresión de velocidad. Detalle
completo, incluida la causa raíz de por qué no se veía nada al
principio (el metafield necesita su `div`, no basta imprimirlo solo),
en la sección 42 del `MANUAL-PROYECTO.md`.

> **Actualización 22 de agosto, tarde:** el fix de código (envolver el
> metafield en su `div`, arriba) no fue suficiente — el dueño confirmó
> con capturas reales que seguía sin verse nada. Causa real encontrada
> leyendo el código fuente de Judge.me en vivo: esta tienda ya está
> migrada a su arquitectura nueva de widgets ("revamp"), que exige
> atributos `data-entry-point`/`data-entry-key` que solo genera el
> propio Judge.me al instalar desde su panel — no algo que se pueda
> escribir a mano. El único camino que queda es instalar "Fragmentos
> de reseñas" desde Judge.me. Detalle completo en la sección 42 del
> manual (Ola 5c).

> **Actualización 22 de agosto, noche:** instalado. El botón "Instalar"
> de Judge.me resultó tener un bug (abría el editor sobre el tema Dawn
> en borrador sin importar el tema seleccionado). Se agregó el bloque
> "Review Snippets" a mano desde el personalizador del tema en vivo
> (Apps → Judge.me Reviews). Verificado con `curl`: los tres productos
> con reseñas reales ya traen el markup correcto
> (`data-entry-point="review_snippet.js"`). Detalle en sección 42 del
> manual (Ola 5d).

> **Actualización 22 de agosto, más noche:** con "Review Snippets" ya
> instalado, seguía sin verse nada — resultó que **los 4 productos
> originales de las 4 reseñas de producto ya no existen** (404 los
> cuatro, no solo el Okuma). Judge.me no ofrece reasignar reseñas a
> otro producto desde su panel, y el reimport de CSV habría duplicado
> las 8 reseñas en vez de corregirlas (detalle en sección 43 del
> manual). Se resolvió rodeando el problema: se instaló también el
> bloque **"Cards Carousel"** (reseñas de tienda, sin filtrar por
> producto) en el home y en la ficha de producto — verificado con
> `curl`, ya trae "5.00 ★ (8)" real en el HTML. Se encontró y corrigió
> además un problema de contraste (texto negro fijo sobre el fondo
> negro del sitio) en `assets/brand-tokens.css`. Detalle en sección 44
> del manual (Ola 5e).

> **Actualización 23 de agosto, madrugada:** con capturas reales en
> mano, el dueño señaló dos problemas más — el fix de contraste
> anterior se pasó y dejó el texto DENTRO de las tarjetas casi
> invisible (corregido, solo se tocan `--header-color`/`--arrows-color`
> ahora, no `--text-color`), y el bloque en la ficha de producto se
> veía apretado por estar en la columna angosta del precio (movido a
> la sección "Aplicaciones" de ancho completo, después de "Productos
> relacionados"). Ambos verificados con `curl` en producción. Detalle
> en sección 44 del manual (Ola 5f).

> **Actualización 23 de agosto, madrugada (2):** dos ajustes finales de
> pulido, confirmados con `curl` — la sección "Aplicaciones" se movió
> a **antes** de "Productos relacionados" (reseñas justo después de
> toda la info de compra, no al fondo), y el título del carrusel se
> tradujo de "Customers are saying" a "Lo que dicen nuestros clientes"
> en las dos instancias (home y ficha, es un ajuste por bloque, no
> global — está en el campo "Header text" del propio bloque, no en el
> panel de Judge.me). Con esto, la parte visual y funcional del
> carrusel queda resuelta. Detalle en sección 44 del manual (Ola 5g).

> **Cierre, 23 de agosto:** el dueño confirmó las dos últimas dudas —
> solo existe una plantilla de producto (no hay "otras plantillas" a
> las que agregar el bloque), y que las reseñas se muestren de forma
> aleatoria sin filtrar por producto **no es un problema**, es
> justamente lo que resuelve el Cards Carousel. Con eso, reasignar las
> 4 reseñas huérfanas deja de ser un pendiente — el mensaje para
> soporte de Judge.me queda redactado y disponible si algún día se
> quiere retomar, sin bloquear nada. Badge de estrellas + carrusel de
> reseñas de tienda, legibles y bien ubicados, en home y ficha de
> producto. Detalle completo en la sección 44 del `MANUAL-PROYECTO.md`.

**Mantenimiento (no bloqueante):**
- Bajar `templates/product.json` vivo y anotar el ID real de los dos
  App Blocks (Review Snippets + Cards Carousel), para que un futuro
  deploy de código no los pise sin darse cuenta.

---

## ~~10. Ola 6 — punch list post-auditoría (con agentes especializados)~~ ✅ Resuelto (24 agosto 2026)

Detalle completo en la sección 45 del `MANUAL-PROYECTO.md`. Resuelto y
verificado en producción: productos agotados fuera del escaparate del
home, piso de precio de Meta subido a $500 (35 productos), umbral de
inventario honesto activado, política de envío con los montos reales,
5 correos de contacto unificados a 3 (incluyendo un bug real de correo
duplicado que apareció al unificar, corregido y verificado con
`curl`).

**Los 4 diferidos, cerrados o con siguiente paso resuelto el 24 de
agosto (Ola 7, sección 47 del manual):**
- ✅ **MSI/OXXO visibles** — código desplegado y verificado. La ficha
  y el carrito ya muestran "También en efectivo: OXXO y 7-Eleven" y,
  en productos ≥$300, "Meses sin intereses con tarjetas
  participantes".
- ✅ **Cross-sell bajo la barra de envío gratis** — código desplegado
  y verificado con carrito real: sugiere hasta 3 productos del mismo
  departamento, disponibles, con precio que cierra la brecha, en el
  cajón del carrito y en `/cart`.
- ✅ **Fichas técnicas** — cargadas por API en los **35 productos**
  del conjunto de Meta (`scripts/cargar-fichas-tecnicas.py`), las 35
  verificadas por relectura y confirmadas en vivo con `curl`. Los
  productos sin datos siguen sin mostrar nada.
- ✅ **3 combos nuevos** — creados por API
  (`scripts/crear-combos.py`) y **publicados** el 24 de agosto en los
  3 canales, verificados en vivo. Llevan una **tarea manual asociada**
  (descontar componentes al vender) — ver el recuadro al principio de
  este archivo.

**Los 3 puntos bloqueantes antes de la siguiente campaña, cerrados el
24 de agosto (detalle en la sección 46 del manual):**
- ✅ **Evento Purchase de Meta** — el dueño hizo una compra de prueba
  real (pedido #1005, $190.95 MXN, "Pagado"). El pixel sí recibió el
  evento Compra con calidad 9.3/10 (el mejor del sitio) vía píxel +
  Conversions API ("Comparte datos" ya en Máximo). El "cero compras"
  que se veía antes era por tener seleccionado el portafolio de
  negocio equivocado en Meta Business Suite, no un problema real.
  **Ningún bloqueante pendiente.**
- ✅ 5 de 9 combos agotados — el dueño ya tiene plan de reabastecerlos,
  se quedan publicados tal cual.
- ✅ MSI/OXXO — confirmado con evidencia real del checkout que sí están
  disponibles.

---

## Datos de contacto ya integrados

Por si se necesitan para otros usos:

- **WhatsApp:** +52 777 327 7340
- **Correo:** ventas@intemperiemexico.com

Nota: por decisión explícita, el footer **no menciona la ciudad de origen de los
envíos** (Cuernavaca, Morelos) — solo dice "Envíos a todo México", para no exponer
la ubicación del negocio.

**Actualización (14 agosto 2026):** Shopify exige calle, código postal y
ciudad como obligatorios en Configuración → General → "Dirección de la
tienda" (el campo visible para clientes, distinto de la entidad legal
para impuestos) — no se puede dejar vacío. Se quitó la calle y número de
casa real (domicilio personal del dueño) y se dejó solo "S/N, 62120
Cuernavaca Morelos, México". Esto sí expone la ciudad/CP en ese campo
puntual — trade-off aceptado explícitamente por el cliente para no
mostrar el domicilio exacto, aunque no es 100% consistente con la
decisión de arriba de ocultar la ciudad en el footer. Detalle completo
en la sección 31 del `MANUAL-PROYECTO.md`.
