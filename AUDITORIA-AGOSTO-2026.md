# Auditoría completa del sitio — 4 de agosto de 2026

Revisión exhaustiva de `https://intemperiemexico.com` recorriendo **todos**
los puntos del [`MANUAL-PROYECTO.md`](./MANUAL-PROYECTO.md), verificados
contra el sitio en vivo (no contra el código ni contra lo documentado).

**Resultado general:** el sitio está sólido. La gran mayoría de lo
documentado está funcionando exactamente como dice el manual. Se
encontraron **8 hallazgos**, de los cuales **1 es crítico y requiere
acción inmediata**.

---

## 🔴 CRÍTICO — ✅ Resuelto (4 de agosto)

Las 4 páginas duplicadas (`aviso-de-privacidad`, `terminos-y-condiciones`,
`politica-de-envios`, `politica-de-devoluciones`) fueron **borradas** vía
API tras ampliar el token con permiso `write_content` (ver
`INSTRUCTIVO-APP-SHOPIFY.md`). Verificado: las 4 URLs devuelven 404, las
páginas "Contacto" y "Quiénes Somos" siguen intactas, y las 5 políticas
oficiales en `/policies/*` siguen funcionando con normalidad.

### 1. Una página vieja está exponiendo públicamente el RFC y la ciudad

**Qué pasa:** existe una página antigua en
`https://intemperiemexico.com/pages/aviso-de-privacidad` que sigue
publicada y accesible, y que contiene textualmente:

> "INTEMPERIE MÉXICO, persona física con **RFC LOCE030903DX3**, con
> domicilio en **Cuernavaca, Morelos**, México."

Esto es exactamente lo que se pidió eliminar del sitio por privacidad, y
lo que sí se eliminó correctamente de la política nueva
(`/policies/privacy-policy`). El problema es que **la versión vieja
nunca se borró** y sigue viva en paralelo.

**Por qué es grave:** la página está incluida en el sitemap
(`/sitemap_pages_1.xml`) y `robots.txt` permite rastrearla, así que
Google la puede indexar y mostrar en resultados de búsqueda. El RFC
completo y la ciudad exacta quedan expuestos a cualquiera que busque.

**Cómo llegó ahí:** cuando se reescribieron las políticas, se trabajó
sobre las páginas oficiales de Shopify (`/policies/*`). Estas otras son
páginas normales (`/pages/*`) creadas antes del proyecto, que quedaron
como duplicados olvidados. No estaban enlazadas en ningún menú, por eso
no aparecieron en revisiones anteriores.

**Solución:** borrar (o despublicar) esa página desde
**Contenido → Páginas** en el Admin de Shopify.

---

## 🟠 ALTO

### 2. Cuatro páginas de política duplicadas conviviendo con las oficiales

Además de la del punto 1, existen estas páginas viejas, todas públicas e
indexables:

| Página vieja (obsoleta) | Versión oficial vigente |
|---|---|
| `/pages/aviso-de-privacidad` | `/policies/privacy-policy` |
| `/pages/terminos-y-condiciones` | `/policies/terms-of-service` |
| `/pages/politica-de-envios` | `/policies/shipping-policy` |
| `/pages/politica-de-devoluciones` | `/policies/refund-policy` |

**Dos problemas distintos:**

- **SEO:** contenido duplicado. Google ve dos versiones de la misma
  política y no sabe cuál priorizar, lo que diluye el posicionamiento de
  ambas.
- **Legal:** son versiones mucho más cortas y débiles que las que se
  redactaron. Por ejemplo, la política de devoluciones vieja no menciona
  la exclusión de municiones y cartuchos de CO2 abiertos — justamente la
  cláusula que protege al negocio. Un cliente podría citar la versión
  vieja en una disputa, y técnicamente está publicada por la tienda.

**Solución:** borrar las 4. El footer ya enlaza correctamente solo a las
versiones oficiales `/policies/*`, así que borrarlas no rompe ninguna
navegación.

### 3. Probable choque visual entre el botón de WhatsApp y la burbuja del chat

El botón flotante de WhatsApp está fijado con
`position:fixed; bottom:24px; right:24px` (60×60px). La burbuja de
Zipchat se coloca por defecto **en esa misma esquina**, así que es muy
probable que se estén encimando o quedando pegadas una junto a otra.

**No pude confirmarlo con certeza** — el entorno donde trabajo bloquea
la ejecución de un navegador real, y esto solo se ve renderizando la
página. Necesita una comprobación visual de 5 segundos.

**Cómo verificarlo:** abre `intemperiemexico.com` en tu celular y en la
computadora, y mira la esquina inferior derecha. Si los dos botones se
encaman o se ven amontonados, se corrige subiendo el de WhatsApp (por
ejemplo a `bottom:100px`) para que queden apilados y ambos sean
clicables.

---

## 🟡 MEDIO

### 4. La página "Quiénes Somos" existe, está bien escrita, y nadie puede llegar a ella

`/pages/quienessomos` tiene contenido genuinamente bueno y alineado con
la voz de marca (misión, visión, "selección honesta", garantía de
compra). Pero **no está enlazada desde ningún lugar del sitio** — ni el
menú, ni el footer. Solo llega quien la encuentre por Google de
casualidad.

Es contenido de confianza ya escrito y desaprovechado, justo del tipo
que el manual señala como pendiente en la sección de "señales de
confianza".

**Solución sugerida:** enlazarla desde el footer (y opcionalmente desde
el menú principal).

### 5. Esa misma página contradice al chatbot

El texto de "Quiénes Somos" dice literalmente:

> "Atención real por WhatsApp, **no bots ni formularios**"

Eso se escribió antes de que existiera Cartucho. Ahora el sitio tiene un
chatbot y un formulario de contacto, así que la frase quedó desactualizada
y contradice la experiencia real del cliente.

**Solución:** reescribir esa línea antes de enlazar la página. Algo como
"Atención real por WhatsApp cuando la necesitas" mantiene el espíritu sin
contradecirse.

### 6. La página de formulario de contacto también está huérfana

`/pages/contact` tiene un formulario de contacto funcional (nombre,
correo, teléfono, comentario). El footer solo enlaza a
`/policies/contact-information`, que es texto plano sin formulario.

Un formulario le da al cliente una vía de contacto que no requiere abrir
WhatsApp — útil para quien prefiere no dar su teléfono, o para consultas
fuera de horario.

**Solución sugerida:** decidir si se quiere y, en tal caso, enlazarla
desde el footer. Si no se quiere, borrarla para no dejarla suelta.

---

## 🟢 BAJO / cosmético

### 7. El título para compartir en redes pierde el descriptor

El `<title>` de la home es **"INTEMPERIE MÉXICO | Pesca, Óptica y Tiro
Deportivo"** (correcto, como dice el manual), pero el `og:title` — el que
se ve al compartir el link en WhatsApp, Facebook o X — es solo
**"INTEMPERIE MÉXICO"**, sin decir qué se vende.

En las fichas de producto sí está correcto (usa el nombre del producto).
Solo afecta a la portada.

### 8. Una imagen sin texto alternativo

En la ficha de producto hay 1 imagen (de 25) sin atributo `alt`. Es un
archivo del CDN, probablemente de una app instalada, no del tema. Impacto
mínimo en accesibilidad, pero vale anotarlo.

---

## ✅ Todo lo que se verificó y está correcto

Esta es la parte larga: la enorme mayoría del proyecto está impecable.

### Infraestructura y dominio
- `intemperiemexico.com` responde 200 con certificado TLS válido
- `http://` → `https://` (301), `www.` → raíz (301),
  `wfuxvx-yn.myshopify.com` → dominio propio (301). Sin cadenas de
  redirección ni bucles
- Certificado renovándose automáticamente (vence 3 sep 2026, es el ciclo
  normal de Shopify — no requiere acción)
- URL canónica correcta apuntando al dominio propio en todas las páginas

### Catálogo (sección 1 y 8 del manual)
- **383 productos**, todos activos y publicados
- **0 productos sin imagen**, **0 sin precio**, **0 agotados sin poder
  comprarse**
- Las **26 colecciones** (22 subcategorías + 4 departamentos) responden
  200 y todas tienen productos — incluidas `diabolos-calibre-6-35mm` y
  `co2-y-cartuchos`, las dos que se crearon al final y que en su momento
  dieron problemas de publicación

### Homepage (secciones 3, 5, 6)
- Los **7 videos** cargan correctamente (200), ~15.7 MB en total
- Carga diferida funcionando: el video del hero tiene `preload="auto"`
  (carga inmediata) y los otros 6 `preload="none"` (esperan al scroll),
  exactamente como se diseñó
- Los 7 conservan su imagen `poster` de respaldo
- Franja de envío presente y con el texto correcto
- 27 enlaces a colecciones, todos válidos

### Header y navegación (sección 4)
- Las **22 subcategorías** están en el mega-menú y todas resuelven

### SEO (sección 7)
- **Un solo `<h1>`** por página, con texto real renderizado en el
  servidor (era uno de los bugs corregidos — sigue corregido)
- `<title>` descriptivo, meta description presente
- `og:image` es la foto real del hero, no el logo
- Datos estructurados correctos: `Organization` + `WebSite` en la home,
  `Organization` + `Product` en fichas de producto
- **121 imágenes en la home, todas con texto alternativo**
- `lang="es"` y viewport móvil correctos

### Fichas de producto (secciones 11, 13)
Se revisó una muestra aleatoria de 8 productos de distintas categorías.
En **los 8**, sin excepción:
- Nota de envío presente y con el texto correcto
- Insignias de confianza rediseñadas presentes
- Disclaimer de "imágenes ilustrativas" presente
- Contenedor sticky (`im-media-sticky`) presente — el bug de scroll sigue
  resuelto
- Un solo `<h1>`, sin errores de Liquid

### Diseño y consistencia visual (secciones 2, 14)
- `brand-tokens.css` sirviéndose correctamente (9.1 KB minificado)
- Las variables de divisores están correctas y centralizadas:
  `--im-divider`, `--im-divider-strong`, `--im-surface`
- Solo 2 bloques `:root` (el principal y el de modo oscuro) — la
  duplicación que hubo durante el desarrollo quedó bien consolidada
- Páginas de colección y búsqueda con su estructura de divisores intacta

### Páginas de sistema
Responden correctamente: las 5 políticas oficiales, búsqueda, carrito,
`/collections/all`, y el 404 devuelve 404 de verdad (no un 200 falso)

### Footer (secciones 7, 12)
- Navegación de categorías, bloque de contacto con WhatsApp y los dos
  correos, línea de marca, Facebook, formas de pago
- **No expone la ciudad** — dice solo "Envíos a todo México", como se
  pidió
- Enlaza solo a las políticas oficiales `/policies/*`

### Chatbot Cartucho (sección 18)
- El widget carga en **todos** los tipos de página verificados: home,
  colección, producto, políticas, búsqueda, carrito y páginas sueltas

### Rendimiento
- Home 265 KB, colección 218 KB, producto 169 KB — pesos razonables para
  un sitio con este nivel de contenido visual
- Ninguna imagen rota en la muestra revisada

---

## Resumen de acciones sugeridas

| # | Acción | Prioridad | Dónde |
|---|---|---|---|
| 1 | Borrar `/pages/aviso-de-privacidad` (expone RFC y ciudad) | 🔴 Ya | Admin → Contenido → Páginas |
| 2 | Borrar las otras 3 políticas viejas duplicadas | 🟠 Pronto | Admin → Contenido → Páginas |
| 3 | Verificar visualmente si WhatsApp y el chat se encaman | 🟠 Pronto | Abrir el sitio en celular |
| 4 | Reescribir la línea "no bots ni formularios" | 🟡 Cuando se pueda | Admin → Páginas → Quiénes Somos |
| 5 | Enlazar "Quiénes Somos" desde el footer | 🟡 Cuando se pueda | Tema |
| 6 | Decidir qué hacer con `/pages/contact` | 🟡 Cuando se pueda | Admin / Tema |
| 7 | Ajustar `og:title` de la portada | 🟢 Opcional | Tema |
| 8 | Alt faltante en 1 imagen de producto | 🟢 Opcional | Probablemente de una app |

---

*Auditoría realizada el 4 de agosto de 2026 contra el sitio en vivo. Los
puntos 1 y 2 requieren acceso al Admin de Shopify (borrar páginas no está
entre los permisos de la API que usa Claude). Los puntos 5, 7 y 8 sí son
editables por Claude directamente en el tema.*
