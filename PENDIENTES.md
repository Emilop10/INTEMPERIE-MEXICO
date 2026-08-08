# Pendientes — Intemperie México

Temas abiertos de la tienda. Casi todos requieren una decisión o datos tuyos;
el resto de la auditoría ya quedó implementado y en vivo.

**Abiertos ahora mismo:** redes sociales pendientes ([2](#2-redes-sociales--parcialmente-resuelto-28-jul)),
señales de confianza ([3](#3-señales-de-confianza-ausentes)), activar el deploy
automático ([5](#5-activar-el-deploy-automático--1-minuto-y-es-lo-único-que-requiere-tus-manos))
y dar de alta el sitio en Google Search Console ([7](#7-alta-en-google-search-console--10-minutos-y-es-lo-único-que-requiere-tus-manos)).

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
**Última actualización:** 7 de agosto de 2026

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

⏳ **Pendiente**: Instagram y TikTok — de momento solo existe la página de
Facebook. Cuando se abran esas cuentas, mandar el link y se conecta igual de
rápido.

---

## 3. Señales de confianza ausentes

La tienda vende rifles y ópticas de precio alto, pero la página **no comunica en
ningún lado**:

- Tiempos de entrega
- Política de garantía
- Si hay devoluciones o cambios

Las políticas legales existen (link en el footer) pero prácticamente nadie las abre.

**Propuesta:** una franja discreta antes de la sección de cierre con 3 puntos, por
ejemplo: *"Envío en 24-48h · Garantía de fábrica · Producto verificado"*.

**Qué se necesita:** confirmar los datos reales (¿cuántos días de envío? ¿qué
garantía se ofrece? ¿se aceptan devoluciones?). El diseño y el montaje ya están
resueltos, solo faltan los datos.

---

## 5. Activar el deploy automático — **1 minuto, y es lo único que requiere tus manos**

Hasta el 7 de agosto, guardar código en GitHub **no lo subía a la tienda**.
Eran dos cajones separados. Eso hizo que tres arreglos seguidos de la barra
deslizable parecieran no funcionar: estaban guardados, pero nunca habían
llegado a Shopify (ver sección 25 del manual).

Ya quedó resuelto por dos vías: ahora los cambios se pueden subir por API en
el momento, y además hay un mecanismo que lo hace solo en cada guardado.

**Lo que falta (tú):** pegar el token para que el automático funcione.

1. GitHub → repositorio → **Settings → Secrets and variables → Actions**
2. **New repository secret**
3. Nombre: `SHOPIFY_ADMIN_TOKEN`
4. Valor: el token `shpat_...` (te lo pasé por chat; guárdalo en tu gestor
   de contraseñas — **no debe escribirse en este repositorio**)

**No es urgente.** Sin esto los cambios igual se pueden subir a mano con
`python3 scripts/deploy-shopify.py`. El secret solo evita tener que
acordarse de hacerlo.

> Si el token deja de servir en el futuro, regenerarlo toma 5 minutos con
> `INSTRUCTIVO-APP-SHOPIFY.md`, y solo hay que actualizar este secret.

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

## 7. Alta en Google Search Console — **10 minutos, y es lo único que requiere tus manos**

El sitio no aparece en Google (`site:intemperiemexico.com` da 0
resultados). Confirmado que **no es un problema técnico**: robots.txt,
sitemap, canonical y meta description ya estaban bien. La causa real es
que nunca se dio de alta en Search Console — sin eso, Google puede tardar
semanas en encontrarlo solo.

Ya se hizo todo lo que se podía por código (sección 27 del manual):
`BreadcrumbList`, Organization ampliado, `og:locale`, `og:image` genérico
en páginas sin foto propia.

**Lo que falta (tú):** dar de alta la propiedad en Search Console. Se
intentó que Claude lo hiciera directo iniciando sesión en Google — no se
puede, el entorno bloquea la navegación a Google por completo. Instructivo
paso a paso, 10 minutos:

📄 **[`INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md`](./INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md)**

En resumen: crear la propiedad con `admin@intemperiemexico.com` →
verificarla (me pasas el código, yo lo despliego en 2 minutos) → enviar
el sitemap → pedir indexación manual de la home + 4 departamentos +
varios productos. Eso último es lo que de verdad acelera todo, de semanas
a horas/días.

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

## Datos de contacto ya integrados

Por si se necesitan para otros usos:

- **WhatsApp:** +52 777 327 7340
- **Correo:** ventas@intemperiemexico.com

Nota: por decisión explícita, el footer **no menciona la ciudad de origen de los
envíos** (Cuernavaca, Morelos) — solo dice "Envíos a todo México", para no exponer
la ubicación del negocio.
