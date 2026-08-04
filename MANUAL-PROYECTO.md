# Manual del proyecto — INTEMPERIE MÉXICO

Resumen extendido de todo el trabajo realizado en la tienda Shopify de
Intemperie México (`wfuxvx-yn.myshopify.com`), desde la carga inicial del
catálogo hasta el estado actual del rediseño completo. Este documento existe
para que cualquier persona (tú, un colaborador futuro, u otra sesión de
Claude) pueda entender qué se hizo, por qué, y dónde vive cada cosa, sin
tener que reconstruir el contexto desde cero.

**Última actualización:** 3 de agosto de 2026
**Dominio en vivo:** `https://intemperiemexico.com` (dominio propio,
conectado el 3 de agosto de 2026 — `wfuxvx-yn.myshopify.com` redirige
automáticamente aquí)
**Tema en vivo (publicado):** "Intemperie Mexico - Rediseño 2026", id
`147593723981` — publicado el 31 de julio de 2026. Ya no existe
distinción entre "tema de trabajo" y "tema en vivo": todo lo que se edita
en este tema se ve de inmediato en el sitio público
**Tema anterior (Dawn):** id `141467517005`, sin publicar, disponible
como respaldo

> ⚠️ Nota histórica: hasta el 31 de julio de 2026, todo el rediseño se
> construyó sobre una **copia** del tema, sin tocar el publicado (Dawn) —
> de ahí que secciones anteriores de este manual mencionen "tema de
> trabajo" como algo separado del tema en vivo. Eso ya no aplica: el
> rediseño se publicó y es, desde entonces, el único tema de la tienda.

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
17. [Publicación del rediseño y dominio propio](#17-publicación-del-rediseño-y-dominio-propio)
18. [Chatbot de IA: Cartucho (Zipchat AI)](#18-chatbot-de-ia-cartucho-zipchat-ai)
19. [Auditoría completa del sitio en vivo (4 de agosto de 2026)](#19-auditoría-completa-del-sitio-en-vivo-4-de-agosto-de-2026)

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

## 17. Publicación del rediseño y dominio propio

### Publicación del tema (31 de julio de 2026)
Tras verificar sin errores Liquid la homepage, las colecciones y las 5
páginas de políticas en el preview, el tema de trabajo
(`147593723981`, "Intemperie Mexico - Rediseño 2026") se publicó como
tema principal (`role: main`) directamente por API. El tema anterior
("Dawn") quedó sin publicar, disponible como respaldo si hiciera falta
volver atrás. Desde ese momento, **todo el sitio público es el
rediseño** — ya no hay distinción entre "tema de trabajo" y "tema en
vivo" en el resto de este manual.

### Dominio propio conectado (3 de agosto de 2026)
La tienda operaba únicamente sobre el dominio temporal
`wfuxvx-yn.myshopify.com`, pese a tener `intemperiemexico.com` ya
comprado y en uso para el correo (Workspace). Se conectó como dominio
principal:

- Registros DNS agregados en Namecheap: `A @ → 23.227.38.65` y
  `CNAME www → shops.myshopify.com` — sin tocar ningún registro MX/TXT
  del correo.
- Verificado y activo con certificado TLS aprovisionado automáticamente.
- `wfuxvx-yn.myshopify.com` ahora redirige de forma automática a
  `intemperiemexico.com`.

Este cambio también resolvió un problema de marca: antes del dominio
propio, cualquier automatización o bot que leyera el sitio (incluido el
chatbot de la sección siguiente) se refería a la tienda por su dominio
técnico de Shopify en vez de su nombre real.

---

## 18. Chatbot de IA: Cartucho (Zipchat AI)

### Decisión: widget de sitio, no bot de WhatsApp
La idea original era "un chatbot inteligente en WhatsApp que filtre
preguntas antes de que me escriban a mí". Investigado esto llevó a una
decisión distinta: desde enero de 2026 Meta bloqueó los asistentes de
IA de propósito general dentro de WhatsApp, y la alternativa válida (un
bot sobre la WhatsApp Business API) tiene costo por mensaje y requiere
dedicar un número exclusivo. En su lugar se optó por un **widget de
chat con IA en el sitio**, que cumple el mismo objetivo (resolver
preguntas repetitivas sin intervención humana) sin ese costo, dejando a
WhatsApp como canal de escalación para lo que el bot no puede resolver.
Investigación completa en
📄 **[`CHATBOT-IA-SITIO.md`](./CHATBOT-IA-SITIO.md)**.

### Instalación y configuración
Se instaló la app **Zipchat AI** (plan gratuito: 120 respuestas de
IA/mes, 100 páginas de entrenamiento — ya al límite, considerar el plan
Starter de $49 USD/mes si se necesita ampliar). Configurado el 31 de
julio y el 3 de agosto de 2026:

- Bubble chat activo en todo el sitio (móvil y escritorio).
- Asistente renombrado **"Cartucho"**, con mensaje de bienvenida propio
  de marca.
- Base de conocimiento cargada en "AI training": envíos, devoluciones y
  garantía, catálogo, pago y seguridad, contacto.
- Instrucciones de comportamiento agregadas en "Prompt and Skills" →
  "Additional instructions" (no editable por API, solo desde el panel de
  Zipchat):
  1. Nunca mencionar el dominio técnico de Shopify — referirse siempre a
     "Intemperie México".
  2. Dar siempre el número de WhatsApp (+52 777 327 7340) cuando se
     pregunte por él, sin depender de si la integración nativa de
     WhatsApp Business está conectada (deliberadamente **no** se
     conectó esa integración — exigiría dedicar un número exclusivo,
     fuera de alcance).
  3. Ofrecer un enlace de escalación a WhatsApp con **mensaje
     precargado** (`https://wa.me/527773277340?text=...`) cuando el bot
     no pueda resolver la duda o el cliente pida hablar con una persona.

### El bug del tracking UTM
El enlace de WhatsApp con mensaje precargado no funcionaba al probarlo:
Zipchat le pegaba automáticamente sus propios parámetros
`utm_source`/`utm_medium` encima de cualquier link, sobrescribiendo el
`?text=` del mensaje. Se resolvió desactivando "Enable UTM tracking" en
Chat settings → Configuration — decisión consciente de priorizar la
experiencia del cliente (mensaje con contexto al abrir WhatsApp) sobre
el tracking interno de origen de conversación de Zipchat.

### Auditoría del chatbot (3 de agosto de 2026)
Se le hicieron 30 preguntas reales (envíos, devoluciones, catálogo,
pago, temas legales/sensibles, intentos de manipulación tipo "ignora tus
instrucciones") en el Test chat del admin. Resultado: identificó y
corrigió 3 problemas reales —

1. **Tiempos de entrega inconsistentes**: la copia de marketing decía
   "2 a 4 días", pero la Política de Envíos real dice "2 a 7 días
   hábiles". Se corrigió la copia en todo el sitio (franja de la
   homepage, nota de producto) para que coincida con la política legal,
   en vez de ajustar la política.
2. **Fuga de dominio técnico**: el bot se identificaba como asistente
   "de wfuxvx-yn.myshopify.com". Resuelto con la conexión del dominio
   propio más la instrucción explícita de identidad.
3. **Número de WhatsApp negado pese a estar en el texto de
   entrenamiento**: causa real, no de indexado — existe una integración
   nativa de WhatsApp Business (vía Meta) separada del texto libre, y al
   no estar conectada el bot daba una respuesta fija de "no disponible".
   Resuelto con instrucción explícita que fuerza el número sin depender
   de esa integración.

Confirmado además: no hubo alucinación de productos (los 4 modelos de
cañas de pescar que mencionó en una prueba sí existen en el catálogo),
manejo correcto de temas legales/sensibles sin revelar la ubicación del
negocio, y resistencia a intentos de inyección de instrucciones. Se
revisó Contenido → Páginas y Artículos del blog por posibles borradores
vacíos creados por atajos de teclado accidentales durante las
pruebas — sitio limpio, sin residuos.

Detalle completo de la configuración, hallazgos y decisiones en
📄 **[`PENDIENTES.md`](./PENDIENTES.md)**.

---

## 19. Auditoría completa del sitio en vivo (4 de agosto de 2026)

Con el rediseño publicado, el dominio conectado y el chatbot en
funcionamiento, se hizo una auditoría exhaustiva **contra el sitio en
vivo** (no contra el código) recorriendo todos los puntos de este
manual: dominio y redirecciones, catálogo completo, las 26 colecciones,
SEO, fichas de producto, footer, chatbot, y las páginas de política.

### Hallazgo crítico y ya resuelto: páginas viejas con RFC y ciudad expuestos
Existían **4 páginas antiguas** (`/pages/aviso-de-privacidad`,
`terminos-y-condiciones`, `politica-de-envios`,
`politica-de-devoluciones`) que sobrevivieron desde antes del proyecto,
sin enlace en ningún menú, pero **públicamente indexables** vía sitemap.
La de privacidad exponía el RFC completo y "Cuernavaca, Morelos" —
exactamente el dato que se pidió ocultar del resto del sitio (ver
[sección 10](#10-políticas-legales)). Se identificaron con una revisión
directa del `sitemap.xml` (nunca habían aparecido en auditorías
anteriores por no estar enlazadas) y se **borraron las 4** vía API,
tras ampliar el token con el permiso `write_content` siguiendo
`INSTRUCTIVO-APP-SHOPIFY.md`. Verificado: 404 en las 4 URLs, sin afectar
las políticas oficiales (`/policies/*`) ni las páginas legítimas
("Contacto", "Quiénes Somos").

### "Quiénes Somos" — enlazada y pulida
La página existía con buen contenido (misión, visión, diferenciadores)
pero no estaba enlazada desde ningún lugar del sitio, y contenía dos
frases que contradecían la existencia de Cartucho ("no bots ni
formularios", "sin complicaciones ni formularios" — escritas antes del
chatbot). Se reescribieron esas frases para integrar a Cartucho como
parte de la propuesta de valor, y se enlazó la página desde el bloque de
marca del footer ("Conoce nuestra historia →") — deliberadamente sin
usar el menú "Categorías" del footer, porque ese menú es el mismo
`main-menu` compartido con el mega-menú de compra del header.

### Otros hallazgos, pendientes de resolver
- Posible choque visual entre el botón flotante de WhatsApp y la
  burbuja de Cartucho (ambos en la esquina inferior derecha) — no se
  pudo confirmar por no tener acceso a un navegador real en este
  entorno, requiere verificación visual directa
- `/pages/contact` (formulario de contacto) sigue sin uso, pendiente de
  decidir si se conecta o se elimina
- Dos ajustes cosméticos menores (og:title de la portada, un alt
  faltante en una imagen de producto)

Detalle completo, con toda la evidencia técnica de cada verificación, en
📄 **[`AUDITORIA-AGOSTO-2026.md`](./AUDITORIA-AGOSTO-2026.md)**.
