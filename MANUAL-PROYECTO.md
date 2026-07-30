# Manual del proyecto — INTEMPERIE MÉXICO

Resumen extendido de todo el trabajo realizado en la tienda Shopify de
Intemperie México (`wfuxvx-yn.myshopify.com`), desde la carga inicial del
catálogo hasta el estado actual del rediseño completo. Este documento existe
para que cualquier persona (tú, un colaborador futuro, u otra sesión de
Claude) pueda entender qué se hizo, por qué, y dónde vive cada cosa, sin
tener que reconstruir el contexto desde cero.

**Última actualización:** 29 de julio de 2026
**Tienda:** `wfuxvx-yn.myshopify.com`
**Tema en vivo (publicado):** Dawn, id `141467517005` — **nunca se ha tocado**
**Tema de trabajo (copia, todo el rediseño vive aquí):** id `147593723981`
**Preview del tema de trabajo:** `https://wfuxvx-yn.myshopify.com/?preview_theme_id=147593723981`

> ⚠️ Regla de oro de todo el proyecto: **el rediseño se construyó siempre
> sobre una copia del tema**, nunca sobre el publicado. Las únicas
> excepciones — cosas que sí afectan la tienda en vivo de inmediato porque
> son configuración a nivel tienda, no del tema — están marcadas
> explícitamente en cada sección de abajo.

---

## Índice

1. [Catálogo y colecciones](#1-catálogo-y-colecciones)
2. [Rediseño visual completo (dirección de marca)](#2-rediseño-visual-completo-dirección-de-marca)
3. [La página principal (homepage)](#3-la-página-principal-homepage)
4. [Header y navegación](#4-header-y-navegación)
5. [Videos en la página principal](#5-videos-en-la-página-principal)
6. [Rotación de productos y destacados](#6-rotación-de-productos-y-destacados)
7. [Auditoría completa y correcciones (SEO, accesibilidad, integración visual)](#7-auditoría-completa-y-correcciones)
8. [Nuevas subcategorías y menú](#8-nuevas-subcategorías-y-menú)
9. [Correo profesional (Google Workspace)](#9-correo-profesional-google-workspace)
10. [Políticas legales](#10-políticas-legales)
11. [Envíos](#11-envíos)
12. [Redes sociales](#12-redes-sociales)
13. [Insignias de confianza y otros ajustes finos](#13-insignias-de-confianza-y-otros-ajustes-finos)
14. [Divisores visuales en páginas de listado](#14-divisores-visuales-en-páginas-de-listado)
15. [Referencia técnica: cómo se edita esta tienda](#15-referencia-técnica-cómo-se-edita-esta-tienda)
16. [Pendientes](#16-pendientes)

---

## 1. Catálogo y colecciones

Fue el primer trabajo del proyecto, antes de que arrancara el rediseño
visual. Se subió el catálogo completo de productos a Shopify, organizado en
**4 departamentos principales**, cada uno como colección inteligente con sus
propias subcategorías (también colecciones inteligentes, filtradas por tipo
de producto y palabras clave del título):

| Departamento | Subcategorías | Productos aprox. |
|---|---|---|
| **Pesca** (`todo-pesca`) | Cañas, Anzuelos, Carretes, Combos, Cajas, Cucharillas, Señuelos, Destorcedores, Flotadores, Hilos y Líneas, Plomos y Lastres (11) | ~303 |
| **Miras y Binoculares** | Binoculares, Miras Telescópicas, Monoculares, Accesorios de Óptica (4) | ~29 |
| **Diábolos y Municiones** | Calibre 4.5mm, Calibre 5.5mm, Calibre 6.35mm, Airsoft 6mm, CO2 y Cartuchos (5) | ~31 |
| **Rifles y Pistolas de Aire** | Pistolas de Aire, Rifles de Aire (2) | ~20 |

Los 4 departamentos están al **100% de cobertura** — todo producto del
catálogo pertenece a alguna subcategoría (las últimas 2 subcategorías de
Diábolos, Calibre 6.35mm y CO2 y Cartuchos, se agregaron después, ver
[sección 8](#8-nuevas-subcategorías-y-menú)).

---

## 2. Rediseño visual completo (dirección de marca)

### Dirección aprobada
Estilo **"Apple × Gymshark"**: minimalista, dominantemente oscuro,
fotografía real (no ilustraciones), con movimiento/scroll marcado, timing y
curvas de animación tomadas de la producción real de apple.com
(`cubic-bezier(.4,0,.6,1)` y `cubic-bezier(.25,.1,.3,1)`, duraciones de
80–320ms).

### Sistema de tipografía
- **Instrument Sans** — encabezados y cuerpo de texto (self-hosted, subida
  como asset del tema)
- **Geist Mono** — precios, SKU, datos numéricos (tabular-nums)

### Paleta de color
- Fondo: negro puro `#000000` en todo el sitio (antes era una paleta clara
  crema/blanca del tema Dawn original)
- Acento de marca: verde `#57B58A` (modo oscuro) / `#234D3B` (variante clara,
  usada en botones y el cierre)
- Texto: `#F5F5F7` sobre fondo oscuro, `#98989D` para texto secundario/mudo
- Placas de producto: `#F2F1EC` — las fotos de producto están tomadas sobre
  fondo blanco; sin una placa clara detrás se verían como recortes flotando
  sobre el negro. Esta placa se usa consistentemente en tarjetas de
  producto, miniaturas, y la ficha de producto completa.

### Identidad de marca
- **Logo:** wordmark de texto limpio se descartó a favor del badge
  ilustrado original (venado/montaña/rifle/pez) por decisión explícita del
  cliente — vive en una placa blanca redondeada (no circular) para que se
  lea sobre cualquier fondo oscuro
- **Copy/voz de marca:** reescrito por completo alrededor de un tono
  "verificado, sin atajos, sin adivinar" — headline del hero contiene
  literalmente la palabra "outdoor" por pedido explícito

---

## 3. La página principal (homepage)

Construida como una sección custom de Shopify (`sections/brand-experience.liquid`,
`assets/brand-experience.css`, `assets/brand-experience.js`), reemplazando
por completo el `templates/index.json` original de Dawn.

### Estructura de la página
1. **Hero** — full-bleed, foto/video de fondo con parche, headline animado
   palabra por palabra, CTA primario y secundario
2. **Capítulos** (uno por departamento) — banner fotográfico integrado con
   texto superpuesto (mismo tratamiento que el hero), grid de productos
   reales rotativo, fila de fichas de subcategoría navegables, y un bloque
   "Destacado" rotativo
3. **Declaraciones cinéticas** ("statements") — texto grande que se anima
   según el scroll, entre capítulos, para dar ritmo
4. **Franja de envío gratis** — agregada después (ver [sección 11](#11-envíos))
5. **Cierre** — CTA final con foto de fondo propia

### Elementos descartados durante el proceso
Por decisión explícita del cliente, se removieron dos elementos que "le
quitaban estética" al conjunto:
- La tarjeta de producto estático flotando en el hero
- La sección de scroll-reveal con un rifle "pineado" en pantalla mientras
  rotaba

Todo el código muerto de ambos (Liquid, CSS, JS, y las opciones fantasma que
dejaban en el editor de temas) fue eliminado en la auditoría (ver
[sección 7](#7-auditoría-completa-y-correcciones)).

### Fotografía real
Se usaron 3 fotos reales preexistentes en Shopify Files (de pesca), más 4
imágenes fotorrealistas generadas por el cliente y subidas vía la API
(`stagedUploadsCreate` + PUT directo + `fileCreate`) para cubrir las
categorías que no tenían cobertura visual: Miras, Diábolos, Rifles, y el
cierre.

---

## 4. Header y navegación

- **Barra superior rediseñada por completo**: se quitó la barra de "envío
  gratis en pedidos mayores a $799" original (visualmente no encajaba), y
  se reconstruyó el header con fondo de vidrio esmerilado oscuro
  (`backdrop-filter: blur`), integrado al sistema de diseño del resto del
  sitio
- **Logo agrandado** (96px) con placa blanca para legibilidad
- **Mega-menús rediseñados**: las imágenes circulares del menú desplegable
  (que no encajaban con el resto del sitio, sin círculos en ningún otro
  lado) se cambiaron a placas redondeadas de 18px, igual que el resto de
  las tarjetas
- **Estado de la barra en la portada**: transparente/flotante sobre el
  video del hero al cargar, y se vuelve sólida (vidrio oscuro) al hacer
  scroll — mediante un `IntersectionObserver` que detecta sobre qué sección
  está el usuario
- **En el resto de páginas**: la barra siempre es sólida (vidrio oscuro),
  consistente con el fondo negro del resto del sitio

### Bugs de contraste encontrados y corregidos (patrón repetido)
Varias veces durante el proyecto apareció el mismo tipo de bug: **una regla
CSS que fija el color de texto directamente sobre un elemento siempre le
gana a un color heredado de un ancestro**, sin importar qué tan específico
sea el selector del ancestro. Esto causó texto invisible (oscuro sobre
oscuro, o casi-blanco sobre blanco) en varios momentos:
- Headlines del hero y capítulos sobre foto oscura
- El wordmark/logo del header al cambiar de tema claro a oscuro
- El disclaimer de "imágenes ilustrativas" en la ficha de producto (este no
  era nuestro, venía hardcodeado en `base.css` con colores para el tema
  claro original — se sobrescribió sin tocar ese archivo)

La solución siempre fue la misma: declarar el color explícitamente en la
regla más específica posible, sin depender de herencia.

---

## 5. Videos en la página principal

El cliente generó 7 videos cortos (uno por sección de fondo) con una
herramienta externa de IA, a partir de las fotos fijas existentes.

### Proceso
1. Los videos originales llegaron a **832×464**, resolución baja para uso
   de fondo a pantalla completa
2. Se reescalaron con `ffmpeg` (Lanczos + realce de nitidez) a **1920×1072**,
   codificados en h264 con bitrate controlado (~2.6–4 Mb/s) para balance
   calidad/peso
3. Se evaluó (y descartó, por indicación del usuario tras comparar
   costo/beneficio) hacer súper-resolución con IA para más detalle real —
   la mejora no justificaba el esfuerzo dado el uso como fondo con overlay
4. Se subieron a Shopify Files vía API (`stagedUploadsCreate` + PUT +
   `fileCreate`, como `GenericFile` para servir el MP4 tal cual, sin dejar
   que Shopify los re-procese)

### Integración en el sitio
- Cada video reemplaza su foto fija correspondiente como fondo, con
  `object-fit: cover` (igual que las fotos) para llenar el contenedor sin
  importar diferencias de aspecto
- `autoplay muted loop playsinline` — el hero carga eager (primero que se
  ve), el resto **carga diferido por scroll** (`IntersectionObserver`, con
  buffer de 600px) y se pausa al salir de pantalla, para no descargar los
  ~16MB totales de golpe
- Si el visitante tiene activado "reducir movimiento" en su sistema, los
  videos ni siquiera cargan — se queda la foto fija como respaldo
- Cada video conserva su foto original como atributo `poster`, por si
  tarda en cargar o falla

Archivos: `Imágenes a videos/` (originales) y `Imágenes a videos/HD/`
(reescalados) en este repositorio.

---

## 6. Rotación de productos y destacados

- **Grid de productos por capítulo**: el servidor renderiza un pool de 14
  productos reales por colección; JavaScript hace un shuffle (Fisher-Yates)
  y muestra solo 6 en cada carga de página — cada visita ve una selección
  distinta
- **Bloque "Destacado"**: mismo mecanismo, pool de 5 productos por
  colección, se muestra 1 al azar. Antes era un producto fijo elegido a
  mano por capítulo (y Pesca ni siquiera tenía uno) — ahora los 4
  departamentos tienen destacado rotativo automático

---

## 7. Auditoría completa y correcciones

Se hizo una revisión exhaustiva de toda la tienda (no solo la home) a
petición del cliente ("que sea la mejor y más segura tienda de México").
Hallazgos y correcciones:

### SEO / técnico
- El `<h1>` del hero estaba **vacío en el HTML** (el texto solo existía como
  atributo, inyectado por JS) — invisible para buscadores. Corregido: el
  texto ahora se renderiza en el servidor
- Había **dos `<h1>`** en la página (el del hero y el del logo del header) —
  el del logo se cambió a `<div>`
- El `<title>` era solo "INTEMPERIE MÉXICO" sin describir qué se vende —
  ahora dice "INTEMPERIE MÉXICO | Pesca, Óptica y Tiro Deportivo"
- La imagen para compartir en redes (`og:image`) era el logo sobre fondo
  blanco — ahora es la foto real del hero
- El HTML de la home pesaba 293 KB, con 92 tarjetas de producto renderizadas
  para mostrar solo 24 — se redujo el pool a 251 KB

### Integración visual (el motivo de casi todo el trabajo posterior a la auditoría)
La home se veía muy superior al resto del sitio porque **solo la home tenía
el sistema de diseño aplicado** — colecciones, fichas de producto, carrito,
búsqueda seguían con la paleta clara original de Dawn. Se unificó todo:
- Paleta negra en todo el sitio (no solo la portada)
- Placas claras en las fotos de producto en todas las páginas (mismo
  tratamiento que la home)
- Radios de esquina, botones tipo pill, tipografía — consistentes en toda
  la tienda

### Footer
Estaba casi vacío (solo políticas legales y "Tecnología de Shopify"). Se
agregó navegación de categorías, línea de marca, y bloque de contacto (ver
[sección 12](#12-redes-sociales) y [13](#13-insignias-de-confianza-y-otros-ajustes-finos)).

### Limpieza de código
Se eliminó ~60 líneas de código muerto de los dos elementos descartados
del hero (tarjeta estática, rifle pineado): Liquid, CSS, JS, y las opciones
fantasma que quedaban en el editor de temas de Shopify.

---

## 8. Nuevas subcategorías y menú

Se detectaron 2 productos sin subcategoría dentro de "Diábolos y
Municiones" (el único departamento que no estaba al 100%): el Cartucho de
Gas CO2 y el Diábolo Gamo Hunter Metal Impact 6.35mm. Se crearon 2
colecciones inteligentes nuevas para cubrirlos:

- **Calibre 6.35mm** — filtro por tipo + título contiene "6.35mm"
- **CO2 y Cartuchos** — filtro por tipo + título contiene "CO2"

Ambas con portada (foto real del producto) y descripción propia, conectadas
en la fila de fichas navegables de la home y **en el mega-menú del header**.

> ⚠️ El mega-menú es un recurso **compartido con el tema en vivo** — a
> diferencia de todo lo demás, agregar estas 2 subcategorías ahí **sí se ve
> ya en la tienda publicada**, con autorización explícita del cliente. Fue
> el único cambio de todo el proyecto que tocó el sitio en vivo antes de
> publicar el rediseño completo.

---

## 9. Correo profesional (Google Workspace)

- Se reactivó la suscripción de Google Workspace con `admin@intemperiemexico.com`
  como cuenta principal
- Se corrigieron los registros DNS del dominio (`intemperiemexico.com`,
  gestionado en Namecheap) para que Google verificara correctamente el
  correo: **MX** (`smtp.google.com`), **SPF** (TXT en `@`), y **DKIM** (TXT
  en `google._domainkey`) — verificado propagado correctamente
- Se crearon **6 alias** sobre la misma cuenta (gratis, sin licencias
  adicionales): `ventas@`, `contacto@`, `info@`, `soporte@`, `pedidos@`,
  `facturacion@` — todos configurados tanto para recibir como para
  "enviar como" desde Gmail

Ver [`INSTRUCTIVO-APP-SHOPIFY.md`](./INSTRUCTIVO-APP-SHOPIFY.md) — no
relacionado con Workspace, pero documentado en el mismo periodo del
proyecto, sobre cómo renovar el acceso de la app que usa Claude para editar
la tienda.

---

## 10. Políticas legales

Las 5 páginas de política (`/policies/...`) se reescribieron por completo:
**Términos y Condiciones, Aviso de Privacidad, Política de Envíos, Política
de Devoluciones y Reembolsos, e Información de Contacto.**

### Hallazgos antes de reescribir
La página de "Información de contacto" ya tenía expuestos el **RFC** y la
**ciudad exacta** (Cuernavaca, Morelos) del negocio — justo lo que el
cliente pidió ocultar del resto del sitio por privacidad.

### Enfoque adoptado
- **Identidad del responsable sin RFC ni ciudad visibles en ninguna página
  pública** — se declara que es persona física con domicilio fiscal dentro
  de México, y que esa información completa está disponible bajo solicitud
  formal (y aparece, como corresponde, en cada factura real emitida)
- **Aviso de Privacidad** conforme a la LFPDPPP: derechos ARCO, finalidades
  primarias/secundarias, transferencias internacionales (por usar
  infraestructura de Shopify), cookies
- **Términos y Condiciones**: cláusula de uso responsable para productos de
  aire comprimido y municiones (sin requisito de mayoría de edad, por
  decisión explícita del cliente), límite de responsabilidad, propiedad
  intelectual, derecho a cancelar pedidos por error evidente de precio
- **Política de Envíos**: empaque neutro sin marcas visibles (privacidad
  para el negocio y el comprador), protocolo de pérdida/daño en tránsito
- **Devoluciones**: se mantuvo la ventana de 7 días ya existente, pero se
  aclaró explícitamente que municiones/cartuchos CO2 abiertos no aplican
  (higiene/seguridad), y se separó "producto defectuoso" (la tienda cubre
  el envío) de "cambio de opinión" (lo cubre el cliente)

> ⚠️ **Las políticas legales son configuración a nivel tienda, no del
> tema** — a diferencia de casi todo lo demás en este proyecto, publicarlas
> las pone **en vivo de inmediato**. Ya están así, verificado.

> Nota: este contenido es un borrador sólido basado en LFPC, LFPDPPP y
> prácticas estándar de e-commerce en México — no reemplaza una revisión
> por un abogado, especialmente dado el rubro (tiro deportivo/aire
> comprimido).

---

## 11. Envíos

### Investigación de tarifas reales
Se usó **Skydropx** (agregador de paqueterías mexicano) para cotizar envíos
reales antes de fijar cualquier precio. Se cotizaron 4 tipos de paquete
representativos del catálogo (Pesca, Miras, Diábolos, Rifle) a 3 destinos
(CDMX, Guadalajara, Cancún), **repetido 3 veces** para verificar
consistencia.

Hallazgo importante: la primera cotización estaba inflada por una
promoción limitada de Skydropx ($50 MXN, cupo agotado) — las cotizaciones
2 y 3 (idénticas entre sí, por lo tanto confiables) dieron un costo real
de **$141–148 MXN** para productos estándar y **$172–213 MXN** para
rifles/pistolas, según destino.

### Tarifa configurada
Una sola tarifa para todo el catálogo (más simple que diferenciar por
categoría, y el precio mínimo real de un rifle en el catálogo, $930, ya
supera el umbral de envío gratis de todas formas):

- **$189 MXN** de envío estándar a todo México
- **Gratis desde $799 MXN** (umbral heredado de la tienda original, validado
  contra los precios reales del catálogo — está por encima del ticket
  típico de Pesca/Diábolos, por debajo del de Miras/Rifles)

Configurado directamente en **Configuración → Envío y entrega** del Admin
de Shopify (no es editable por API con el token actual). Esto **es
configuración de tienda, en vivo de inmediato**.

### Comunicación en el sitio (parte del tema de trabajo, no en vivo aún)
- Franja en la homepage, justo después del hero
- Nota compacta en cada ficha de producto, debajo del botón de compra
- Texto: *"Envío gratis desde $799 MXN. Pedidos menores, $189. Entrega en 2
  a 4 días aproximados."* — el tiempo de entrega se ajustó deliberadamente
  para no prometer de más (las cotizaciones reales dieron hasta 5-6 días
  hábiles en destinos lejanos)

---

## 12. Redes sociales

- **Facebook conectado**: `https://www.facebook.com/people/Intemperie-México/61588253103964/`,
  visible como ícono en el footer
- **Pendiente**: Instagram y TikTok — de momento la marca solo tiene
  Facebook

---

## 13. Insignias de confianza y otros ajustes finos

- **Bloque de "Pago 100% seguro / Garantía de compra / WhatsApp"** en la
  ficha de producto: existía ya, pero hardcodeado con estilos en línea
  (fondo gris claro, emojis) que no seguían el sistema de diseño —
  rediseñado con iconos de línea y la misma tarjeta oscura translúcida que
  el resto del sitio
- **WhatsApp de contacto**: `+52 777 327 7340`, botón flotante en todo el
  sitio (ya existía, preexistente al proyecto) y enlazado en el footer, la
  ficha de producto, y las páginas de políticas
- **Bug de scroll en la ficha de producto**: la imagen del producto se
  quedaba "atrás" al hacer scroll (no era sticky), y luego —al corregirlo—
  se descubrió que Dawn **ya tenía** su propia galería con
  `position: sticky` y `z-index: 2`, lo que hacía que la imagen se montara
  encima del aviso de "imágenes ilustrativas". Solución final: se anuló el
  sticky interno de Dawn y se aplicó a un contenedor que envuelve imagen +
  aviso juntos, para que se desplacen como una sola pieza

---

## 14. Divisores visuales en páginas de listado

Las páginas de colección, búsqueda, y la sección de "también te interesa"
en la ficha de producto se veían como una sola mancha negra sin jerarquía.
Se agregaron divisores deliberadamente visibles (no hairlines decorativos)
entre: encabezado de colección, barra de filtros/orden (que además ahora
tiene superficie propia, como una tarjeta), grid de productos, paginación,
y footer.

Los valores están centralizados como variables CSS al inicio de
`brand-tokens.css` (`--im-divider`, `--im-divider-strong`, `--im-surface`)
para poder ajustarlos desde un solo lugar.

---

## 15. Referencia técnica: cómo se edita esta tienda

### Arquitectura
- El rediseño vive casi por completo en el **tema de trabajo** (id
  `147593723981`), una copia del tema Dawn publicado, creada con la
  mutación GraphQL `themeDuplicate` (la API REST con `source_theme_id`
  crea temas vacíos — es un bug/gotcha conocido, no usar)
- Los cambios se aplican vía la Admin API de Shopify (REST para assets del
  tema, GraphQL para políticas, colecciones, menús, y subida de archivos)
- Verificación constante con `curl` (con cookies frescas y User-Agent único
  por request para evitar caché de CDN) contra el preview del tema de
  trabajo, comparado contra el tema en vivo para confirmar que no se tocó

### Archivos clave del rediseño
- `sections/brand-experience.liquid` — sección custom de la homepage
- `assets/brand-experience.css` / `.js` — estilos y comportamiento
  exclusivos de la homepage
- `assets/brand-tokens.css` — estilos **sitewide** (header, mega-menú,
  fichas de producto, colecciones, divisores) — la mayoría del trabajo de
  integración visual posterior a la auditoría vive aquí
- `sections/header.liquid`, `sections/main-product.liquid` — modificados
  puntualmente (clase condicional de nav-invert, disclaimer, sticky, nota
  de envío)
- `templates/index.json`, `templates/product.json` — configuración de
  bloques y ajustes de cada plantilla

### Acceso de la API (¡importante!)
El token de acceso que usa Claude para editar la tienda **pierde validez**
cada vez que se le agregan permisos nuevos o se publica una nueva versión
de la app en el Dev Dashboard de Shopify. El procedimiento correcto para
regenerarlo está documentado paso a paso, incluyendo los caminos que NO
funcionan, en:

📄 **[`INSTRUCTIVO-APP-SHOPIFY.md`](./INSTRUCTIVO-APP-SHOPIFY.md)**

---

## 16. Pendientes

Lista viva de temas abiertos que requieren una decisión o datos del
negocio (no del código) — ver:

📄 **[`PENDIENTES.md`](./PENDIENTES.md)**

Al momento de escribir este manual, quedan abiertos: señales de confianza
adicionales (garantía/tiempos de envío formalizados en el sitio) y ampliar
redes sociales (Instagram/TikTok) cuando existan.

---

## Publicación del tema

Ninguno de los cambios de diseño de este manual está publicado en la
tienda en vivo todavía (salvo las excepciones marcadas explícitamente:
mega-menú, políticas legales, y tarifas de envío, que son configuración de
tienda). El tema de trabajo (`147593723981`) sigue en revisión, esperando
aprobación final antes de publicarse como el tema activo de la tienda.
