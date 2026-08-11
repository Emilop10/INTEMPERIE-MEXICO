# Manual del proyecto — INTEMPERIE MÉXICO

Resumen extendido de todo el trabajo realizado en la tienda Shopify de
Intemperie México (`wfuxvx-yn.myshopify.com`), desde la carga inicial del
catálogo hasta el estado actual del rediseño completo. Este documento existe
para que cualquier persona (tú, un colaborador futuro, u otra sesión de
Claude) pueda entender qué se hizo, por qué, y dónde vive cada cosa, sin
tener que reconstruir el contexto desde cero.

**Última actualización:** 10 de agosto de 2026
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
20. [Identidad visual de Cartucho: mascota y avatar del chat](#20-identidad-visual-de-cartucho-mascota-y-avatar-del-chat)
21. [Herramientas de desarrollo: Graphify y respaldo del código del tema](#21-herramientas-de-desarrollo-graphify-y-respaldo-del-código-del-tema)
22. [Diversidad en "También te interese"](#22-diversidad-en-también-te-interese)
23. [Botones del hero: texto claro y scroll que sí funciona](#23-botones-del-hero-texto-claro-y-scroll-que-sí-funciona)
24. [Flechas en la franja de subcategorías](#24-flechas-en-la-franja-de-subcategorías)
25. [Deploy del tema a Shopify](#25-deploy-del-tema-a-shopify)
26. [Rediseño del carrito: panel lateral, botón y carrito vacío](#26-rediseño-del-carrito-panel-lateral-botón-y-carrito-vacío)
27. [Indexación en Google: SEO técnico y alta en Search Console](#27-indexación-en-google-seo-técnico-y-alta-en-search-console)
28. [Conciliación de inventario físico contra Shopify](#28-conciliación-de-inventario-físico-contra-shopify)

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
- **Commitear NO despliega.** El repo y la tienda son dos cosas separadas:
  hay que correr `scripts/deploy-shopify.py` (o dejar que lo haga el
  workflow) — ver [sección 25](#25-deploy-del-tema-a-shopify)
- Verificación constante con `curl` (con cookies frescas y User-Agent único
  por request para evitar caché de CDN) contra el preview del tema de
  trabajo, comparado contra el tema en vivo para confirmar que no se tocó

### Archivos clave del rediseño
- `sections/brand-experience.liquid` — sección custom de la homepage
- `assets/brand-experience.css` / `.js` — estilos y comportamiento
  exclusivos de la homepage
- `scripts/deploy-shopify.py` — sube el tema a la tienda (fuera de
  `tema-shopify/`, porque es herramienta del repo, no parte del tema)
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

### Cuando un cambio "no se ve" en el sitio
Antes de tocar código por un reporte visual, seguir el árbol de diagnóstico
documentado (verificar qué sirve el sitio, las 4 capas de caché de Shopify que
son distintas entre sí, y cómo renderizar la página en Chromium para encontrar
qué regla CSS está ganando):

📄 **[`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md)**

> ⚠️ **Trampa conocida del tema:** `base.css` trae
> `div:empty { display: none }`. Cualquier elemento decorativo sin contenido
> queda invisible salvo que se le declare `display` explícito.

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

> ✅ **Estado: cerrada.** Los 8 hallazgos quedaron resueltos y
> verificados en vivo el mismo día — ver
> [`AUDITORIA-COMPLETADA-Y-CORREGIDA-4-AGOSTO-2026.md`](./AUDITORIA-COMPLETADA-Y-CORREGIDA-4-AGOSTO-2026.md).

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

### Estado final: los 8 hallazgos resueltos
Confirmado (sí chocaban): se **eliminó por completo** el botón flotante
de WhatsApp de `layout/theme.liquid` — quedaba redundante porque
Cartucho ya ofrece el mismo enlace a WhatsApp cuando hace falta.
`/pages/contact` se conectó desde el bloque de contacto del footer
("¿Prefieres un formulario? Escríbenos aquí"). Los dos ajustes
cosméticos (`og:title` de la portada, alt faltante en una imagen de
producto) también se corrigieron de raíz. **Los 8 hallazgos de la
auditoría quedaron cerrados el mismo día.**

Detalle completo, con toda la evidencia técnica de cada verificación, en
📄 **[`AUDITORIA-COMPLETADA-Y-CORREGIDA-4-AGOSTO-2026.md`](./AUDITORIA-COMPLETADA-Y-CORREGIDA-4-AGOSTO-2026.md)**.

---

## 20. Identidad visual de Cartucho: mascota y avatar del chat

### El widget "Ask AI" no deseado
Al revisar el sitio se encontró una barra de búsqueda "Ask AI..."
superpuesta en medio del hero de la home — no era nuestra, era el
widget **"AI search"** de Zipchat (activo por defecto desde la
instalación, distinto de "Bubble chat"). Se desactivó por completo
desde Chat settings → Channels, dejando solo la burbuja normal.

### De caja de texto a solo ícono
La burbuja mostraba un "Placeholder message" en una píldora de texto
("¿Dudas? Pregúntale a Cartucho") que se cortaba visualmente sin
importar qué tan corto fuera el texto — el ancho del contenedor es fijo.
No existe un toggle de "solo ícono", pero sí un selector de **"Chat
bubble type"** con 4 estilos; se cambió de "Type bar" (la píldora con
texto) a **"Modern bubble"**, que muestra solo un círculo con ícono —
resultado limpio, y el punto verde de notificación de Zipchat combina
de forma natural con el acento de marca.

### Diseño de la mascota
Decisión explícita del cliente: un personaje de cartucho de escopeta
antropomorfizado (ojos, brazos, piernas), estilo cálido y carismático —
"que genere amor hacia la gente", pensado como el amigo que ayuda con
las compras. Se decidió **rojo como color de identidad propio de
Cartucho** (deliberadamente distinto de la paleta negro/verde del resto
del sitio — es un acento de personaje, no del sitio).

El cliente generó las imágenes con una herramienta externa de IA a
partir de prompts detallados (estilo render 3D suave, banda verde de
marca `#57B58A` como detalle, base dorada). Quedaron 2 versiones madre
en `diseno-cartucho/`:
- `CON ACCESORIOS.png` — con caña de pescar y binoculares (referencia a
  Pesca y Miras), para usos grandes/marketing a futuro
- `SIN ACCESORIOS.png` — cuerpo completo neutral, ya con fondo
  transparente

### Ícono del avatar del chat
Primer intento: recortar solo cabeza/hombros para simplificar a tamaño
pequeño — el cliente lo corrigió, pidiendo que se viera el **personaje
completo**, no cortado. Se generó `cartucho-icono-512.png` (512×512,
fondo transparente) recortando el bounding box completo del personaje
de `SIN ACCESORIOS.png` con margen de aire alrededor, verificado
legible incluso a 60px (el tamaño real del ícono en el sitio). Subido
manualmente por el cliente al campo "Avatar of your AI Agent" en
Bubble chat → Edit — confirmado visible en el sitio en vivo.

### Página "Conoce a Cartucho" en el menú principal (6 de agosto)
Se creó la página `/pages/conoce-a-cartucho` con la presentación del
personaje (quién es, qué puede resolver: producto, envíos, devoluciones,
escalar a WhatsApp con contexto) y la foto `CON ACCESORIOS.png` — subida
a Shopify Files vía `stagedUploadsCreate` + `fileCreate` (mismo patrón
usado para las fotos e imágenes generadas de la homepage). Se agregó
como sexto elemento del `main-menu` (junto a Inicio, Pesca, Miras y
Binoculares, Diábolos y Municiones, Rifles y Pistolas de Aire) vía la
mutación GraphQL `menuUpdate`.

> ⚠️ **El mega-menú es un recurso compartido con el tema en vivo** — a
> diferencia de la mayoría del código del sitio, este cambio se ve
> reflejado de inmediato en la tienda publicada (igual que la nota de la
> [sección 8](#8-nuevas-subcategorías-y-menú)).

Gotcha técnico encontrado: la mutación `menuUpdate` requiere reenviar el
árbol **completo** de items del menú (no solo el nuevo), y cada item —
incluidos los sub-items anidados— necesita su `resourceId` real
consultado explícitamente vía GraphQL; si se omite, Shopify rechaza la
mutación completa con un error de "collection not found" en el primer
sub-item, aunque la colección exista y funcione perfectamente.

### Botón de enviar invisible — resuelto (6 de agosto)
En el chat público, el botón circular de "enviar mensaje" se veía
prácticamente blanco sobre blanco, casi invisible. Causa: el campo
**"Primary color"** en Zipchat → Bubble chat → Edit → Look & feel
(el color de acento que controla ese botón) estaba en `#FFFFFF`. Se
cambió a `#57B58A`, el verde de la marca. Confirmado en el sitio en
vivo que el botón ya no es blanco.

### Persistencia de conversación entre recargas — investigado, sin acción
Se probó si Cartucho debía "olvidar" la conversación al recargar la
página. Se revisó a fondo el panel de Zipchat (Look & feel, Configuration,
Integrations, Account) y **no existe ningún campo expuesto** para
controlar esto — el historial vive en el navegador del visitante
(localStorage/cookie de sesión), sin toggle en el admin. Confirmado en
vivo: recargar la página sí mantiene la conversación visible. Decisión
del cliente: **no hace falta resolverlo** — se observó que el historial
sí se limpia solo pasado un tiempo, comportamiento por defecto de
Zipchat que es aceptable tal cual.

### Pendiente para más adelante
- Versión para redes sociales (fondo sólido, 1080×1080) — cuando se
  conecten Instagram/TikTok
- Variantes temáticas de Cartucho por departamento (con caña para
  Pesca, con binoculares para Miras, etc.) — reservado para cuando se
  decida si se ilustra cada capítulo de la home con el personaje

---

## 21. Herramientas de desarrollo: Graphify y respaldo del código del tema

### Browser Harness — investigado, descartado
El cliente pidió instalar
[`browser-use/browser-harness`](https://github.com/browser-use/browser-harness),
una herramienta que permite a Claude controlar un navegador real
directo vía protocolo CDP (con "auto-sanación": escribe y mejora su
propio código auxiliar en ejecución) — en teoría, un reemplazo más
autónomo de "Claude en Chrome". **No se instaló**: CDP funciona sobre
WebSocket, y el proxy de red de este entorno de trabajo tiene las
conexiones WebSocket explícitamente marcadas como no soportadas. No es
un problema de configuración — requeriría correrla en una máquina con
acceso de red real (como la computadora del cliente), no en este
entorno remoto. Documentado en
[`SKILLS-USADAS.md`](./SKILLS-USADAS.md).

### Chromium + Playwright — sí funciona (7 de agosto de 2026)
La conclusión de arriba ("no hay navegador real disponible en este
entorno") resultó **parcialmente equivocada**, y esa creencia costó horas
de diagnóstico a ciegas sobre la barra deslizable. El entorno **sí trae
Chromium preinstalado** en `/opt/pw-browsers/`, y con `pip install
playwright` se puede renderizar y medir de verdad.

La limitación real es más acotada: el proxy bloquea que el navegador
**navegue a sitios externos** (`ERR_CONNECTION_RESET`). Pero eso se
resuelve fácil:

1. Descargar la página y sus assets con `curl`
2. Reescribir las URLs de CSS/JS a rutas locales
3. Abrirla con `file://` en Chromium

Con eso se puede inspeccionar la cascada CSS real, medir elementos,
detectar qué regla está ganando, y tomar capturas. Fue lo que encontró el
bug de `div:empty` que ninguna otra técnica había detectado.

📄 Método completo:
**[`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md)**

### Respaldo completo del tema en el repositorio
Hasta este punto, el código real del tema (secciones, snippets,
templates, JS, CSS) vivía únicamente en los servidores de Shopify —
se editaba vía API hacia una carpeta temporal que nunca se guardaba en
GitHub. Se descargaron los **364 archivos** del tema en vivo a
[`tema-shopify/`](./tema-shopify/), que ahora sirve como **respaldo
versionado real** del tema — algo que no existía antes en el proyecto.

### Graphify — instalado y en uso
El cliente pidió investigar e instalar
[`Graphify-Labs/graphify`](https://github.com/Graphify-Labs/graphify),
que convierte una base de código en un grafo de conocimiento
consultable (análisis AST local, sin mandar código a ningún servidor).
A diferencia de Browser Harness, no depende de WebSocket, así que sí se
pudo instalar en este entorno. Corrido sobre `tema-shopify/`, generó:

- **459 nodos, 705 conexiones, 39 comunidades** de código relacionado
  (cifra al 7 de agosto de 2026; era 452/697/37 en la primera corrida)
- Los "god nodes" (componentes más centrales de la arquitectura del
  tema): `PredictiveSearch`, `FacetFiltersForm`, `SlideshowComponent`,
  `CartItems`, `CartDrawer`, `MenuDrawer`, entre otros
- Consultable por comandos (`graphify explain "X"`, `graphify path "A"
  "B"`, `graphify query "pregunta"`) para entender rápido qué toca qué
  en el código, sin tener que releer todo el tema

Detalle completo de instalación y uso en
[`SKILLS-USADAS.md`](./SKILLS-USADAS.md).

### Mapa 3D interactivo del código (a la medida)
Petición explícita del cliente: visualizar el grafo "como una red
neuronal, en 3D" — más allá de la visualización 2D estándar que trae
Graphify por defecto. Se construyó una pieza propia desde cero
(físicas de repulsión + resortes + cohesión por comunidad, calculadas y
verificadas con Node.js antes de integrarlas, proyección 3D con cámara
orbital, todo renderizado en Canvas 2D sin librerías externas), usando
las fuentes y paleta de marca del sitio.

- Archivo autocontenido, abre directo en cualquier navegador:
  [`tema-shopify/graphify-out/intemperie-mapa-codigo-3d.html`](./tema-shopify/graphify-out/intemperie-mapa-codigo-3d.html)
- **Cómo mantenerlo al día** (agregado el 7 de agosto de 2026): el mapa
  lleva los datos embebidos en un `var DATA = {...}`, y al haberse
  construido a mano quedaba desactualizado sin forma práctica de
  refrescarlo. Ahora se regenera con:

  ```bash
  cd tema-shopify && graphify update .    # reconstruye el grafo
  cd .. && python3 scripts/rebuild-mapa-3d.py
  ```

  El script reescribe **solo** el bloque de datos y deja intacto el resto
  del HTML (motor de físicas, cámara, estilos, panel lateral) — verificado
  comparando todo lo que no es el bloque `DATA` contra la versión anterior
- También publicado como Artifact privado para verlo sin descargar nada
- Interacción: arrastrar para rotar, rueda para zoom, búsqueda en vivo
  que vuela la cámara hasta el nodo encontrado, clic en cualquier nodo
  para ver sus conexiones reales en un panel lateral

> Nota técnica: antes de integrar el motor de físicas y la proyección
> 3D al HTML final, ambos se probaron por separado con Node.js contra
> los datos reales del grafo (sin coordenadas inválidas, sin explosión
> de la simulación, matemática de proyección verificada con casos de
> prueba) — reduce el riesgo de bugs invisibles en una pieza que no se
> puede probar visualmente en este entorno (sin navegador real
> disponible, ver limitación de Browser Harness arriba).

---

## 22. Diversidad en "También te interese"

### El problema
La sección de productos relacionados en la ficha de producto usaba el
motor nativo de recomendaciones de Shopify
(`routes.product_recommendations_url`), cuyo algoritmo tendía a repetir
siempre el mismo subtipo de producto — abrir un señuelo mostraba más
señuelos, abrir un rifle mostraba más rifles, en vez de sugerir cosas
relacionadas pero distintas (anzuelos, cañas, miras, diábolos, etc.).

### Intento fallido y causa real
Primer intento: reemplazar las recomendaciones nativas por un pool de
productos tomado directo de la colección grande del departamento
(`todo-pesca`, `miras-y-binoculares`, etc.) con `limit: 60`, dejando que
JS eligiera diversidad de tipo. **No funcionó**: el orden por defecto
("más relevante") de esas colecciones grandes agrupa los productos por
subtipo consecutivo — los primeros 60 de `todo-pesca` resultaron ser
puros señuelos, así que no había nada diverso de dónde elegir.

### Solución final
En vez de depender del orden de la colección grande, el pool se arma
tomando **5 productos de cada subcategoría** del departamento
(`canas`, `anzuelos`, `carretes`... para Pesca; `binoculares`,
`miras-telescopicas`... para Miras; etc. — mapeo fijo por departamento
en el Liquid), garantizando diversidad real desde el servidor. Luego
`imx-related-diversify.js` elige, priorizando que cada producto
mostrado sea de un tipo distinto al del producto actual (ronda-robin
por tipo, con relleno del mismo tipo solo como último recurso si el
departamento es muy chico).

- `sections/related-products.liquid` — reescrito por completo;
  deliberadamente ya **no** usa la etiqueta `<product-recommendations>`
  nativa de Dawn, porque ese elemento reemplaza su propio contenido vía
  fetch al cargar (`global.js`) y hubiera sobrescrito el pool
- `assets/imx-related-diversify.js` — nuevo, sigue el mismo patrón de
  `imx-shuffle.js` (pool + JS elige y reordena) ya usado en la homepage
- El motor de selección (`pickDiverse`) se probó con Node.js contra
  casos reales y casos límite (departamento chico, todo un mismo tipo,
  pool vacío) antes de subirlo — mismo enfoque de verificación previa
  que se usó en el mapa 3D de la sección 21
- Verificado en vivo en los 4 departamentos: Pesca (10 subcategorías,
  54 productos en el pool), Rifles y Pistolas de Aire (2 subcategorías,
  9 productos), Miras y Binoculares (4 subcategorías, 16 productos) —
  sin errores Liquid, sin afectar el resto de la ficha de producto
  (nota de envío, insignias de confianza, chatbot siguen intactos)

---

## 23. Botones del hero: texto claro y scroll que sí funciona

### Aclarar el botón principal
"Explorar catálogo" se cambió a **"Explorar catálogo de pesca"** — el
botón lleva específicamente a la sección de Pesca (`#pesca`), y el
texto genérico generaba confusión (parecía llevar a todo el catálogo).

### Botón secundario ilegible sobre la foto
"Rifles y pistolas de aire" era solo texto plano (`.btn-link`, sin
fondo) sobre la foto del hero — dependiendo de qué parte de la imagen
quedaba detrás, el contraste era inconsistente. Se creó una clase nueva,
`.btn-secondary` (fondo oscuro semitransparente + blur + borde claro,
mismo estilo "vidrio esmerilado" ya usado en el header), para que se lea
bien sin importar qué haya de fondo. **No se tocó `.btn-link`** — esa
clase se sigue usando tal cual en "Ver producto" y "Ver todo
[colección]", donde sí funciona bien por tener un fondo sólido detrás.

### El scroll no bajaba a la sección
Al hacer clic en los botones del hero, la URL cambiaba a `#pesca` pero
la página no se movía. Causa: es un comportamiento conocido de los
navegadores — si la URL ya tiene ese mismo `#ancla` (por ejemplo, el
visitante ya había hecho clic antes y volvió arriba con el scroll), un
clic nuevo en el mismo enlace no dispara el salto porque el hash no
"cambió". Se agregó una interceptación de clics en `brand-experience.js`
para todos los enlaces internos (`a[href^="#"]`) que hace el scroll
manualmente (`scrollIntoView` suave, respetando "reducir movimiento"),
sin depender de que el hash cambie. También se agregó
`scroll-margin-top: 108px` a las secciones de capítulo, para que el
destino no quede tapado por el header fijo (mismo alto que ya usaba el
propio hero).

### Ajuste final: mismo estilo en los dos botones
Tras ver el resultado en vivo, el cliente pidió que el botón principal
("Explorar catálogo de pesca") usara el mismo estilo "vidrio
esmerilado" del secundario en vez del verde sólido — los dos botones del
hero ahora comparten exactamente la misma clase (`.btn.btn-secondary`).
La clase `.btn-primary` quedó sin uso en este archivo (no se borró del
CSS por si se retoma en otro contexto, no genera ningún problema
mantenerla ahí sin usar).

### "DESLIZA" se perdía contra el video
El indicador de scroll al pie del hero (texto "DESLIZA" + línea
vertical animada) usaba gris apagado (`#98989D`) a 10px, sin sombra —
se perdía contra el video del hero (fondo claro/brumoso en varias
escenas). Se aumentó a blanco casi puro (`#F5F5F7`), 11px, con el mismo
`text-shadow` que ya usa el resto del texto del hero para legibilidad
sobre foto/video, y la línea se hizo más gruesa (1px → 2px) con una
sombra propia para que se distinga incluso sobre fondos claros.

---

## 24. Flechas en la franja de subcategorías

La fila horizontal de subcategorías dentro de cada capítulo (Cañas,
Anzuelos, Carretes... debajo del producto destacado) tenía el scroll
oculto a propósito (`scrollbar-width: none`), pensado para arrastre
táctil en móvil — pero en escritorio, sin trackpad, no había ninguna
forma visible de moverla. El cliente reportó "no se puede mover".

### Primer intento: flechas
Se agregaron flechas de navegación (◀ ▶) a los lados de la franja, con
estilo "vidrio esmerilado". El cliente las vio y pidió algo más visible
— prefería una barra de scroll de verdad, abajo de la franja.

### Solución final: barra deslizable propia
Se reemplazaron las flechas por una **barra deslizable construida a
mano** debajo de cada franja (no el scrollbar nativo del navegador,
que no se puede estilizar igual en todos — Safari en particular no
soporta personalizarlo como Chrome):

- `sections/brand-experience.liquid` — cada franja tiene ahora
  `.subcat-scrollbar` (la pista) con `.subcat-scrollbar-thumb` (la
  barrita verde que se arrastra) debajo de `.subcat-grid`
- `assets/brand-experience.js`:
  - El ancho y posición de la barrita se calculan en proporción a
    cuánto contenido hay visible vs. total (`clientWidth / scrollWidth`)
  - Se puede **arrastrar directamente con el mouse** (eventos
    `pointerdown`/`pointermove`/`pointerup`)
  - Clic en cualquier parte de la pista (fuera de la barrita) salta
    directo a ese punto de la franja
  - La barra se oculta sola si no hay suficiente contenido para
    necesitar scroll
- Verificado en vivo: las 22 subcategorías siguen intactas en los 4
  departamentos, sin errores Liquid

### Ajuste de contraste: "se ve como una barra gris completa"
El cliente reportó que no distinguía la barrita verde de la pista — solo
veía gris uniforme.

> ⚠️ **Corrección (ver "La causa real" al final de esta sección).** En su
> momento se atribuyó el síntoma al caché de la home. Era falso. La causa
> real era doble: el thumb ocupaba ~97% de la pista, y ninguno de los
> cambios de contraste había llegado siquiera a la tienda. Se deja
> registrado el diagnóstico equivocado a propósito, porque perseguirlo
> costó tres rondas de cambios a ciegas.

Aun así, se subió el contraste de forma preventiva, sin depender del
timing:
- Pista más oscura (`rgba(255,255,255,.07)` en vez de `.12`) con borde
  sutil propio, para que se lea claramente como "vacío"
- Thumb con sombra/borde oscuro alrededor (`box-shadow`), para que
  destaque incluso si el verde se pierde contra el fondo
- **Tope de 85% en el ancho del thumb**: en departamentos con pocas
  subcategorías (como Pesca en pantallas anchas, donde casi todo el
  contenido ya es visible), el thumb proporcional real ocuparía ~93% de
  la pista — casi indistinguible de la pista completa. Con el tope,
  siempre queda un tramo de pista vacía visible, aunque no represente
  matemáticamente exacto cuánto falta por recorrer

### Rediseño a máximo contraste (pista negra, thumb gris)
Después de ~10 minutos el cliente seguía sin ver diferencia — para
entonces ya no era solo cuestión de caché. Se rediseñó a los colores
más simples y contrastantes posibles, por petición explícita del
cliente: **pista negra pura (`#000000`) con thumb gris claro
(`#B8B8BD`)**, sin depender de que el verde de marca se note bien
contra el fondo. Se agregó también un borde sutil claro a la pista
(`rgba(255,255,255,.18)`) para que se distinga del fondo negro de la
página, no solo del thumb.

### Diagnóstico real del retraso de caché
Se investigaron los headers de respuesta para entender por qué esta
vez tardaba tanto (mucho más que otros cambios del mismo día):
- El archivo CSS tiene `Cache-Control: max-age=31557600` (1 año) — esto
  es normal y correcto para archivos con huella de versión en la URL
  (`?v=...`), Cloudflare lo cachea agresivamente pero cada versión
  nueva debería generar una URL distinta
- La home en sí muestra `cf-cache-status: DYNAMIC` — Cloudflare **no**
  está cacheando el HTML de la página
- Conclusión de entonces: el retraso está en la **caché interna de
  Shopify** (`page_cache`, visible en el header `etag`), que tardó más
  de lo habitual en invalidarse tras varios cambios seguidos

> ⚠️ **Esa conclusión era incorrecta**, en particular la parte de "no es
> nada que se pueda forzar desde la API — solo esperar". Sí se puede
> forzar (guardando un `.liquid`, no un asset), y de todos modos no era
> el problema. Ver abajo.

### Primera causa encontrada: el código nunca llegó a la tienda
Al día siguiente el cliente seguía viendo la barra igual, ya en
incógnito. En vez de tocar más CSS se consultó **qué estaba sirviendo
el sitio en vivo**, y ahí apareció todo:

```
# lo que servía intemperiemexico.com
.subcat-scrollbar-thumb{background:#57b58a}          ← thumb VERDE
thumbWidth=Math.max(32,ratio*bar.clientWidth)        ← sin tope
```

Eso corresponde al commit `b903ee3`, es decir **tres commits atrás**.
Ni el gris `#B8B8BD` ni el tope del 85% habían llegado nunca a Shopify.

Dos problemas encadenados, ninguno de ellos el color:

1. **El thumb ocupaba ~97% de la pista.** Sin tope, el ancho sale
   proporcional al contenido. La franja tiene 8 tiles (~1140px) en un
   contenedor de ~1116px visibles: desborda apenas 24px, así que el
   thumb proporcional era casi toda la barra. Por eso se leía como una
   sola barra sólida. **El reporte del cliente era correcto desde el
   principio.**
2. **Nada desplegaba a la tienda.** El repo no tiene `main` ni GitHub
   Actions, y la integración nativa de Shopify con GitHub no estaba
   conectada. Los commits se quedaban en GitHub. Se resolvió creando un
   deploy propio — ver **[sección 25](#25-deploy-del-tema-a-shopify)**.

Corrección aplicada (`6a968af`): tope del thumb bajado de 85% a **45%**,
pista discreta (`rgba(255,255,255,.13)`) y thumb sólido `#C7C7CC` de
10px de alto, al estilo del scrollbar de macOS.

Corregido el deploy, el cliente **seguía viendo lo mismo** — y con razón.
Faltaba el problema de fondo.

### La causa raíz de verdad: `base.css` ocultaba el thumb

El tema (heredado de Dawn) trae en `assets/base.css`, líneas 468-481:

```css
a:empty, ul:empty, dl:empty, div:empty, section:empty, article:empty,
p:empty, h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty {
  display: none;
}
```

Y la barrita es un div sin contenido:

```html
<div class="subcat-scrollbar-thumb" data-subcat-thumb></div>
```

**Estaba oculta desde la primera versión.** Lo único visible era la pista: una
barra de un solo color de lado a lado — exactamente lo que el cliente reportó
desde el principio, en todas las rondas. Ningún ajuste de color (verde → gris
claro → blanco) ni de ancho (85% → 45% → 30%) podía cambiar nada, porque el
elemento nunca se pintaba.

**El arreglo** (`fd26ba8`) es declarar `display: block` en la regla del thumb.
El selector `.brand-exp .subcat-scrollbar-thumb` ya ganaba por especificidad
(`0,2,0` contra el `0,1,1` de `div:empty`), pero **la especificidad solo decide
entre reglas que declaran la misma propiedad**: como nunca se declaró
`display`, la única declaración existente era la de `base.css`.

> 💡 **Esto va a volver a pasar.** Cualquier elemento decorativo sin contenido
> en este tema (barras de progreso, separadores, indicadores, puntos de
> carrusel, overlays) queda oculto por la misma regla. Si creas un `<div>`
> vacío y no se ve, es esto.

### Cómo se encontró (y por qué tardó tanto)

Se instaló Playwright y se renderizó la página con Chromium, en vez de seguir
teorizando sobre capturas de pantalla. Dos detalles fueron decisivos:

- **Probar el componente aislado no sirve.** Se extrajo el bloque HTML de la
  barra y se probó con solo `brand-experience.css`: funcionaba perfecto. Eso
  llevó a concluir varias veces que "el código está bien, debe ser caché". El
  bug solo aparece con **todos los CSS del tema** cargados.
- **`document.styleSheets` da falsos negativos en `file://`.** Chrome bloquea
  el acceso a `cssRules` de hojas externas; el código las saltaba con
  `try/catch` y devolvía "ninguna regla aplica". Consultar la cascada real con
  **CDP** (`CSS.getMatchedStylesForNode`) mostró el culpable de inmediato.

### Lecciones de método (esto es lo que más costó)
- **Antes de cambiar código por un reporte visual, verificar qué está
  sirviendo el sitio**, y si el archivo es correcto, **renderizar la página
  completa** en un navegador real.
- **Un cambio que "no se ve" no siempre es caché.** Se asumió caché tres
  veces seguidas; nunca lo fue.
- **Si otro navegador sin caché muestra lo mismo, la teoría del caché está
  muerta.** Safari mostró idéntico resultado y aun así se insistió en limpiar
  el navegador del cliente. Ahí había que cambiar de enfoque.
- **No pedir capturas para diagnosticar lo que se puede consultar.**
- **El cliente tenía razón desde el primer reporte.** "Se ve una sola barra"
  era una descripción exacta de lo que pasaba.

📄 Método completo de diagnóstico, con comandos:
**[`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md)**

### Diseño final (en vivo)
- Pista `#2C2C2E` (gris oscuro sólido) de 10px de alto
- Thumb `#F5F5F7` casi blanco, con tope del **30%** del ancho de la pista
- Al pasar el mouse o arrastrar, el thumb pasa a blanco puro
- Variante clara: pista `#D1D1D6`, thumb `#1D1D1F`

---

## 25. Deploy del tema a Shopify

### El problema que resolvió
Hasta el 7 de agosto de 2026 **nada desplegaba automáticamente**. El repo
no tiene rama `main`, no tenía GitHub Actions, y la integración nativa de
Shopify con GitHub nunca se conectó. Los cambios se commiteaban, se
pusheaban, y la tienda seguía sirviendo la versión anterior — sin ningún
aviso de que algo faltaba.

Eso hizo que tres correcciones seguidas de la barra deslizable parecieran
no surtir efecto (ver [sección 24](#24-flechas-en-la-franja-de-subcategorías)),
y mandó el diagnóstico por el camino equivocado durante dos sesiones.

### Cómo desplegar ahora

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...        # token Admin API con write_themes
python3 scripts/deploy-shopify.py           # sube lo cambiado en git
```

| Comando | Qué hace |
|---|---|
| `deploy-shopify.py` | Lo cambiado en el último commit + working tree |
| `deploy-shopify.py --since origin/main` | Todo lo cambiado desde ese ref |
| `deploy-shopify.py --all` | El tema completo |
| `deploy-shopify.py assets/x.css` | Solo los archivos indicados |
| `deploy-shopify.py --dry-run` | Muestra qué haría, sin subir nada |

El script descarga cada archivo de la tienda y **compara el contenido real**
antes de subirlo, así que correrlo dos veces seguidas no hace nada la
segunda vez. Detalle completo en
[`scripts/README-deploy.md`](./scripts/README-deploy.md).

### Automático en cada push
`.github/workflows/deploy-shopify.yml` corre el script en cada push que
toque `tema-shopify/`. Requiere **un paso manual, una sola vez**: agregar
el secret `SHOPIFY_ADMIN_TOKEN` en GitHub → Settings → Secrets and
variables → Actions.

### Qué NO sube, a propósito
`config/settings_data.json` guarda lo que se edita en el personalizador de
Shopify. Subirlo desde el repo **borraría** los cambios hechos en el admin,
así que está excluido. Existe `--include-settings` para forzarlo, pero
casi nunca es lo que se quiere.

### Tres trampas verificadas (no volver a caer)

**1. El campo `checksum` de la API no es el MD5 del contenido.**
La primera versión del script comparaba contra él y marcaba ~60 archivos
de idioma como distintos siendo byte a byte idénticos. Comprobado con
`locales/es.json`: mismo MD5 local y remoto (`4d30b7f6...`), mismos 21826
bytes, y aun así `checksum` reportaba `8b2b6a4d...`. Por eso el script
descarga y compara el contenido real.

**2. Guardar solo assets NO invalida el caché de página del storefront.**
Los visitantes siguen recibiendo el HTML viejo, que apunta a las URLs de
assets anteriores — aunque los assets nuevos ya existan. Un cambio real
en un `.liquid` sí fuerza la regeneración. Ojo: re-guardar un archivo con
contenido **idéntico** no sirve, Shopify lo detecta y no bumpea nada
(`updated_at` no cambia).

**3. Verificar con `curl` sin `User-Agent` engaña.**
Shopify sirve una variante de caché distinta al tráfico que parece bot:
devuelve versiones viejas de forma consistente aunque los navegadores
reales ya reciban las nuevas. Durante ~40 minutos pareció que el deploy
no había funcionado; en cuanto se mandó un User-Agent de Chrome, el sitio
devolvió el asset nuevo al primer intento. **Al verificar, siempre mandar
User-Agent de navegador:**

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 \
(KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
curl -s -A "$UA" https://intemperiemexico.com/ | grep -o 'brand-experience.css?v=[0-9]*'
```

Si el `?v=...` no cambia después de un deploy, el archivo no llegó.

**4. Republicar el tema NO invalida el caché de página.**
Se probó: los renders ya cacheados siguen sirviéndose igual. Lo único que los
invalida es guardar un `.liquid` con contenido **realmente distinto** (volver a
guardar un archivo idéntico no bumpea nada, Shopify lo detecta).

📄 Árbol de diagnóstico completo, con las 4 capas de caché y cómo distinguirlas:
**[`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md)**

### Credenciales
El token vive como variable de entorno o como secret de GitHub Actions —
**nunca en el repo**. El `.gitignore` está blindado contra archivos de
credenciales (`.env`, `*token*.txt`, `*token*.json`, `shopify-token*`).
Para regenerarlo, ver
[`INSTRUCTIVO-APP-SHOPIFY.md`](./INSTRUCTIVO-APP-SHOPIFY.md).

---

## 26. Rediseño del carrito: panel lateral, botón y carrito vacío

Tras activar el deploy automático (sección 25), esta fue la primera tanda de
cambios visuales hecha con el ciclo completo funcionando: código → deploy →
verificación en el sitio real en minutos, en vez de rondas a ciegas.

### Botón "Comprar con Shop" eliminado
El botón dinámico de Shop Pay (morado, fuera de la identidad de marca) se
apagó con el setting nativo del tema:
`templates/product.json` → bloque `buy_buttons` →
`show_dynamic_checkout: false`. Al desactivarlo, "Agregar al carrito" pasa
automáticamente de botón secundario a primario (lógica ya existente en
`snippets/buy-buttons.liquid`), quedando como botón sólido único.

> El texto del botón se probó primero como "Comprar ahora" (petición
> explícita), pero al verlo en vivo el cliente prefirió volver a
> "Agregar al carrito" — es el mismo botón, solo cambia el texto
> (`locales/es.json`, clave `add_to_cart`).

### Carrito activado como panel lateral (drawer)
El tema (Dawn) ya traía todo el código del panel de carrito, apagado por
setting: `config/settings_data.json` → `cart_type: "notification"` →
`"drawer"`. Con eso, agregar un producto abre un panel sobre la misma
página en vez de navegar a `/cart`.

**Antes de subir `settings_data.json`** (que normalmente se protege porque
ahí vive lo que se edita en el personalizador de Shopify), se comparó la
copia local contra lo que la tienda ya tenía guardado, confirmando que las
únicas diferencias eran las que se querían cambiar — para no pisar nada
hecho desde el admin. Ese chequeo se repitió en cada cambio de settings de
esta sección.

### Carrito vacío: botones de categoría en vez de una colección gigante
La primera versión mostraba la colección "Todo Pesca" completa como una
tarjeta cuadrada a todo el ancho del panel — desproporcionada. Se reemplazó
por 4 botones de departamento (Pesca, Miras y Binoculares, Diábolos y
Municiones, Rifles y Pistolas de Aire), estilo Gymshark (sus botones
Hombre/Mujer en el carrito vacío), reusando el mismo patrón de handles que
`sections/related-products.liquid`. El setting `cart_drawer_collection`
quedó sin uso (se limpió a `""` para no dejar configuración fantasma).

**Posición vertical:** Dawn centra `.cart-drawer__warnings` dentro de todo
el alto del panel (pensado para cuando el contenido era solo un botón), así
que con las 4 categorías agregadas el conjunto quedaba muy abajo (~76% del
alto). Se quitó ese centrado y se ancló el bloque cerca de arriba.

### Barra de envío gratis: de verde genérico a on-brand
Estaba duplicada en 2 archivos (`snippets/cart-drawer.liquid` y
`sections/main-cart-items.liquid`, la página `/cart` completa), cada uno
con su propio verde claro tipo plugin (`#f0f9eb`/`#d4edda`) que no
combinaba con el negro/verde de marca. Se rediseñó como variante de
`.im-ship-note` (el mismo componente ya usado bajo el botón de compra en la
ficha de producto): fondo oscuro sutil, borde verde tenue, ícono de caja,
progreso real en verde de marca. El umbral ($799) no cambió.

### Bugs encontrados y corregidos durante la verificación

**1. `var(--brand-accent)` no es un verde fijo.** Ese token cambia a un
verde oscuro (`#234D3B`) casi invisible cuando el sistema operativo del
visitante está en modo claro — nada que ver con que el carrito en sí sea
oscuro. Se corrigió usando `#57B58A` fijo, igual que hace `.im-ship-note`,
que nunca depende de ese token porque su superficie siempre es oscura.
Detectado renderizando en Chromium con emulación de color-scheme por
default (light), no se hubiera visto en una revisión visual rápida.

**2. El mismo bug de `div:empty` otra vez, dos veces más.** `base.css` trae
`div:empty { display: none }` (documentado desde el episodio de la barra
de subcategorías, sección 24). Se volvió a caer en la misma trampa:

- El relleno de la barra de progreso es un `<div style="width:X%"></div>`
  vacío. La primera corrección (`.free-shipping-bar__progress-fill {
  display: block }`, un solo selector de clase) **no alcanzaba** — la
  especificidad de una clase (0,1,0) sigue perdiendo contra `div:empty`
  (elemento + pseudo-clase, 0,1,1). Hubo que calificar con el padre
  (`.free-shipping-bar__progress .free-shipping-bar__progress-fill`),
  mismo patrón que ya había funcionado para el thumb de la barra.
- El precio unitario bajo el título del producto en el carrito usa la
  clase genérica `.product-option` de Dawn, que trae
  `word-break: break-word` (necesario para texto de variante largo, tipo
  "Color: Rojo"). Esa misma propiedad partía el precio ("$" arriba,
  "3,300.00" abajo) en el espacio del `money_format` de la tienda
  (`"$ {{amount}}"`, con espacio). Se aisló dándole al div del precio una
  clase propia (`cart-item__unit-price`) y aplicando `nowrap` solo a esa
  clase y a `.cart-item__old-price`/`.cart-item__final-price` — sin tocar
  `.product-option` en general, para que las opciones de variante largas
  sigan pudiendo partirse cuando haga falta.

> 💡 **Patrón a vigilar:** cualquier `<div>` decorativo vacío en este tema
> (barras de progreso, separadores, indicadores) puede quedar oculto por
> `div:empty`. Un solo selector de clase no siempre gana en especificidad —
> verificar con las herramientas de desarrollo o CDP, no asumir.

**3. El precio de la columna total también se partía**, por una causa
distinta: la celda del grid móvil de Dawn ya era angosta (preexistente),
agravada por `brand-tokens.css` al ponerle Geist Mono (más ancho que la
fuente sans original) sin declarar `white-space`. Se agregó `nowrap` a la
regla `.price` ya existente.

### Método de verificación
Todo el ciclo de esta sección usó Chromium real (no capturas ni HTML
estático): se agregaron productos de verdad al carrito vía POST a
`/cart/add.js`, se descargó la página resultante con sus assets, y se
midió con `getBoundingClientRect()` — incluyendo reproducir cada bug en
aislamiento **antes** de tocar código, para confirmar la causa exacta antes
de escribir el fix. Detalle del método en
[`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md).

---

## 27. Indexación en Google: SEO técnico y alta en Search Console

**Fecha:** 8 de agosto de 2026
**Síntoma reportado:** el sitio no aparece al buscarlo en Google.

### Diagnóstico (verificado, no supuesto)
Se confirmó con evidencia externa antes de tocar nada: `site:intemperiemexico.com`
devuelve **0 resultados**, y una búsqueda genérica de la categoría solo
muestra competidores. Se revisó todo lo que suele bloquear indexación:

- `robots.txt` permite crawleo completo (sin bloqueos anómalos)
- `sitemap.xml` existe, bien formado, gestionado automáticamente por Shopify
- Sin contraseña de tienda, sin `noindex`, con `canonical`, title y meta
  description presentes
- **Sin ninguna verificación de Google en el sitio** — cero rastro de
  Search Console o Analytics en el código

**Conclusión: no hay ningún bloqueo técnico.** El sitio simplemente nunca
se dio de alta en Google — el dominio propio se conectó apenas el 3 de
agosto (sección 17), y sin una señal explícita a Google (vía Search
Console), el rastreo orgánico puede tardar semanas.

> Se intentó que Claude iniciara sesión en Google directamente para
> resolverlo de una — no se pudo: el entorno donde corre bloquea la
> navegación a Google por completo (`net::ERR_CONNECTION_RESET`, incluso
> con Chromium real, sin importar tener credenciales). Por eso esa parte
> quedó como instructivo para el cliente.

### Mejoras técnicas de SEO (código)
No eran la causa de la falta de indexación, pero sí importan para que
Google muestre bien el sitio una vez que lo indexe:

- **`BreadcrumbList`** (datos estructurados) nuevo en fichas de producto
  (Inicio → Departamento → Producto) y colecciones (Inicio → Departamento)
  — `sections/header.liquid`. Ayuda a que Google muestre la ruta en los
  resultados en vez de solo la URL.
- **Organization** ampliado con `priceRange` y `address` (solo país "MX",
  sin ciudad — respeta la decisión ya tomada de no exponer la ubicación
  exacta del negocio).
- **`og:locale`** agregado (`es_MX`).
- **`og:image` genérico extendido a todas las páginas**: ya existía una
  corrección para la home ("el logo se ve como una marca chiquita sobre
  fondo blanco al compartir en redes, usar la foto del hero en su lugar"),
  pero solo aplicaba ahí. Se descubrió que **cualquier página sin imagen
  propia** (políticas, cuenta) tenía el mismo problema sin que se notara
  en el código — Shopify les asigna automáticamente el logo como
  `page_image` en vez de dejarlo vacío. Se generalizó la misma corrección
  comparando `page_image == settings.logo`.

**Tres cosas que el plan original marcaba como huecos y NO se tocaron**,
tras revisar el código con más cuidado — para no deshacer decisiones ya
tomadas a propósito:
- El `<title>`/`og:title` hardcodeado de la home coincide a propósito
  (ya fue una corrección deliberada, ver sección 7).
- El `og:image` hardcodeado de la home también es deliberado — el propio
  comentario en el código explica el problema del logo.
- Las 4 imágenes con `alt=""` en `brand-experience.liquid` (hero + 2
  banners + cierre) son fondos decorativos con su texto real superpuesto
  en un `h1`/`h2` — `alt` vacío es el comportamiento correcto de
  accesibilidad ahí (evita que un lector de pantalla anuncie dos veces lo
  mismo), no un hueco a rellenar.

Verificado en el sitio real: JSON-LD válido (`json.loads` sin errores) en
producto y colección con la ruta de breadcrumb correcta; `og:image`
confirmado cambiando solo donde debía (política ahora usa la foto del
hero, producto sigue con su propia foto, home sin cambios).

### Alta en Google Search Console — pendiente del lado del cliente
Requiere una cuenta de Google del negocio (`admin@intemperiemexico.com`,
la de Workspace) y varios clics dentro de esa cuenta que esta sesión de
Claude no puede hacer (razones explicadas arriba). El documento está
escrito como un **prompt listo para pegarle a Claude en Chrome** — esa
extensión sí controla un navegador real y puede llegar a Google — con un
punto de entrega obligatorio a la mitad (el código de verificación tiene
que volver a esta sesión para desplegarlo) y un informe final de qué
logró hacer y qué no:

📄 **[`INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md`](./INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md)**

Resumen: Claude en Chrome verifica la propiedad hasta el punto de
conseguir la etiqueta HTML → se la pasa al cliente → el cliente se la da
a esta sesión → se despliega y se confirma → Claude en Chrome retoma para
enviar el sitemap y solicitar indexación manual de la home + 4
departamentos + varios productos (esto es lo que de verdad acelera el proceso de semanas
a horas/días).

### Ejecución (9 de agosto de 2026) — hallazgo que cambió el plan
Al ejecutar el Paso 1, Claude en Chrome encontró que **ya existía una
propiedad verificada** en la cuenta, de tipo **Dominio**
(`sc-domain:intemperiemexico.com`), con datos desde mayo de 2026. Ese tipo
de verificación es por registro DNS (TXT), invisible desde el código del
tema — por eso el diagnóstico original ("cero rastro de Google en el
código") no la detectó. No cambia el diagnóstico de fondo (el sitio seguía
sin indexar), pero sí simplificó el plan: se saltaron los pasos de
verificación y se fue directo a enviar el sitemap y pedir indexación,
usando la propiedad de Dominio ya existente (es además la mejor opción
posible — cubre `http`/`https`/con y sin `www` en una sola vista, mejor
que la propiedad de prefijo que se iba a crear).

**Resultado del primer informe de Claude en Chrome** (sitemap enviado con
estado "Correcto", indexación solicitada en las 6 URLs clave) incluía una
afirmación que no cuadraba: decía que las páginas ya aparecían como
"indexadas" *antes* de solicitar la indexación. Se verificó por cuenta
propia con una búsqueda `site:intemperiemexico.com` — seguía en 0
resultados. En vez de aceptar el reporte tal cual, se pidió una segunda
ronda con datos exactos de pantalla (no interpretación):

- **Home**: confirmada indexada de verdad — texto literal "La URL está en
  Google" / "La página está indexada", copiado por Claude en Chrome. La
  discrepancia con la búsqueda `site:` propia se debe a que esa búsqueda
  no siempre refleja el índice de Google en tiempo real — Search Console
  es la fuente autorizada, no ese atajo.
- **Reporte de Páginas**: 0 indexadas, 36 sin indexar de las 415 que el
  sitemap descubrió (el resto sigue en cola de evaluación). De esas 36,
  29 marcaban algún tipo de error (4xx/404/403) y 6 "rastreada, sin
  indexar todavía" (normal).
- **Sin acciones manuales** (sin penalización de Google).

**Verificación de las 29 URLs "con error" — hecha en vivo con `curl`, no
solo confiando en el reporte de Google:**

| Categoría | Veredicto tras verificar en vivo |
|---|---|
| `http://` → `https://` | Funciona perfecto, 4xx que vio Google era viejo |
| `/policies/terms-of-service` | 200, sin problema |
| 3 productos/colección "Shimano" | 404 reales — productos ya retirados del catálogo, normal |
| `/llms-full.txt` | 200 — archivo de Shopify para agentes de IA, el 403 fue puntual |
| Colecciones "hilos-de-pesca", "combos-de-pesca", "anzuelos-de-pesca", "tiro-deportivo-1" | 404 confirmado — son los **nombres de antes** de la reorganización en departamentos (hoy: `hilos-y-lineas`, `combos`, `anzuelos`) |
| `/v1/produce`, `/cdn`, `/b` | 404 — nunca fueron páginas reales, ruido de rastreo |
| `/collections/salva-con-diabolos` | 404 confirmado, rastreada el 7 de agosto (reciente). Sin coincidencias en el código del tema ni en el listado de colecciones de la tienda vía API — no viene de nada nuestro. Única sin explicación clara; no urgente, es una sola URL |

**Conclusión: nada de esto era un problema real del sitio en este
momento.** Casi todo era memoria vieja de Google — de antes del 3 de
agosto (cuando se conectó el dominio propio) o de antes de la
reorganización de colecciones en departamentos. No se necesitó ningún
cambio de código. Queda pendiente solo el tiempo: Google reevaluando el
resto de las 415 páginas del sitemap.

> 💡 **Lección de método:** un agente de navegador puede leer mal una UI
> ambigua (confundir "disponible para rastrear" con "ya indexada"). Pedir
> texto exacto de pantalla en vez de un resumen, y cruzarlo con
> verificación propia cuando se pueda (`curl`, búsquedas), evitó actuar
> sobre una conclusión equivocada.

---

## 28. Conciliación de inventario físico contra Shopify

**Fecha de la primera ejecución:** 10 de agosto de 2026

El cliente hace conteos físicos periódicos de la tienda (piso de venta) en
un Excel exportado de su sistema de punto de venta, y necesita que esa
cuenta real se refleje en las existencias de Shopify — el POS físico y la
tienda online no están conectados entre sí. Como esto se va a repetir casi
a diario, quedó documentado como proceso repetible, con un instructivo
aparte para ejecutarlo rápido las próximas veces:

📄 **[`INSTRUCTIVO-CONCILIAR-INVENTARIO.md`](./INSTRUCTIVO-CONCILIAR-INVENTARIO.md)**

### Cómo funciona

El Excel tiene columnas `No Parte` (SKU), `Departamento`, `Descripción`,
`proveedor`, `ConstoN`, `Ubicacion`, `Existencia` (el conteo físico de
hoy). Se cruza cada fila por `No Parte` contra el SKU de las variantes de
producto en Shopify (API Admin, `products.json` con paginación, 383
productos/variantes al momento de la primera corrida) y se clasifica:

- **Verde** — el conteo físico coincide con la existencia en Shopify. No
  se toca nada.
- **Amarillo** — hay diferencia (venta, entrada de mercancía, ajuste).
  Se actualiza Shopify al número del conteo físico vía
  `POST /admin/api/2024-01/inventory_levels/set.json` (requiere el
  `inventory_item_id` de la variante y el `location_id` de la tienda,
  que se obtiene de `shop.json → primary_location_id` — pedir el scope
  `read_locations` de por sí devuelve error de aprobación de Shopify, no
  hace falta para este flujo con una sola ubicación).
- **Rojo** — el conteo físico está en 0 (agotado) **o** el SKU no existe
  como producto en la tienda online. Si Shopify tenía existencia y el
  conteo dice 0, también se actualiza a 0.
- **Gris** — no se puede vincular con certeza, así que **no se toca
  Shopify**: filas sin `No Parte` (el POS a veces exporta líneas sin
  código), o códigos que se repiten en el mismo Excel apuntando a
  productos distintos (ej. `9291PS` correspondía a tres anzuelos VMC
  diferentes en la primera corrida). Cada fila gris trae una nota
  explicando el motivo exacto.

El archivo final se entrega con una pestaña **Resumen** (totales por
color) y la hoja original con tres columnas nuevas al final
(`Existencia Shopify (antes)`, `Estatus`, `Nota`) y cada fila coloreada.

### Detalles que costó descubrir en la primera corrida

- **Conteos en negativo** (ej. `-1`, `-4`) aparecen en el Excel del POS
  cuando se registra una venta sin existencia previa suficiente. No se
  suben tal cual a Shopify (un `available` negativo no tiene sentido ahí)
  — se tratan como agotado (0), con nota sugiriendo revisar el POS.
- **El endpoint `GET /admin/api/2024-01/products.json?status=any` devuelve
  0 productos** sin error visible (bug o comportamiento no documentado de
  esa versión de API) — hay que pedir sin el parámetro `status` (trae
  todos los estados) o con `status=active` explícito, nunca `status=any`.
- **`GET /locations.json` pide el scope protegido `read_locations`**, que
  requiere aprobación manual de Shopify y no se puede activar solo desde
  el Dev Dashboard. Se evita por completo usando
  `shop.json → primary_location_id`, válido mientras la tienda tenga una
  sola ubicación (es el caso).
- El token de la app necesita agregar los scopes **`read_inventory`** y
  **`write_inventory`** — los que ya tenía (`read_products`/
  `write_products`) no alcanzan para ajustar existencias.

### Resultado de la primera corrida (10 de agosto de 2026)

De 1,207 filas del conteo físico: 228 verde, 109 amarillo, 766 rojo (732
sin SKU coincidente en Shopify + 34 agotados), 104 gris (88 sin código +
16 por códigos duplicados). Se aplicaron 143 actualizaciones a Shopify
(109 ajustes de cantidad + 29 puestas en 0 partiendo de un valor previo
mayor a 0) — las 143 vía API, con 0 errores. Se detectaron además 12
productos activos en Shopify que no aparecían en el conteo del día (no se
tocaron, quedan para que el cliente confirme si es intencional).

---

## 29. Meta Ads (Facebook/Instagram): medición y catálogo anunciable

El cliente pidió empezar a invertir en publicidad de Meta, dándole a
Claude el manejo completo (crear, publicar, optimizar, reportar) y
poniendo él solo el presupuesto. Antes de tocar código se verificaron
tres cosas que cambiaron la forma del proyecto.

### Restricción real de catálogo, no interpretación

Meta prohíbe por política explícita anunciar armas, munición y accesorios
que modifiquen la función de un arma ([Transparency
Center](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/weapons-ammunitions-explosives/)),
incluyendo miras telescópicas. El riesgo de ignorarlo no es que se
rechace un anuncio puntual: es el **baneo permanente de la cuenta
publicitaria y del Business Manager completo**, arrastrando también la
página de Facebook.

Aplicado al catálogo: pesca (~303 productos) y binoculares/ópticos no
armamentísticos (~20) sí son anunciables — **~84% del catálogo**. Miras
telescópicas (~9), diábolos/municiones (~31) y rifles/pistolas de aire
(~20) no lo son. Esto no cambia nada en la tienda ni en lo que se puede
comprar — solo qué entra en los anuncios y en el catálogo sincronizado
con Meta.

### Estado de medición verificado en vivo

Se confirmó con `curl` sobre `intemperiemexico.com` que no existe ningún
rastro de `fbq` ni `connect.facebook.net` — no había píxel de Meta antes
de este trabajo. Sí existía ya un `<meta
name="facebook-domain-verification">` en `layout/theme.liquid`, sin
documentar en el repo, lo que indica que alguien ya abrió un Business
Manager de Meta antes — hay que ubicarlo antes de crear uno nuevo (ver
`INSTRUCTIVO-META-ADS.md`).

### Lo que se implementó

- **`config/settings_schema.json`**: nuevo grupo "Meta Ads (Facebook /
  Instagram)" con un campo de texto `meta_pixel_id`, editable desde
  Personalizar tema sin tocar código.
- **`snippets/meta-pixel.liquid`**: carga el pixel de Meta solo si
  `settings.meta_pixel_id` no está vacío. Eventos: `PageView` (todas las
  páginas), `ViewContent` (ficha de producto, con precio real),
  `InitiateCheckout` (página de carrito).
- **`assets/meta-pixel.js`**: se suscribe al pubsub `cart-update` del
  tema (el mismo que usa el carrito lateral) para disparar `AddToCart`
  con el precio real del ítem agregado, sin necesidad de recargar la
  página.
- **`Purchase` queda fuera de este mecanismo a propósito**: el checkout
  de Shopify (plan no-Plus) no usa `theme.liquid`, es una página aparte
  fuera del control del tema — no hay forma correcta de instrumentarlo
  desde aquí. Se resuelve instalando el canal de ventas oficial
  "Facebook & Instagram" de Shopify, que agrega el evento `Purchase` y
  la Conversions API del lado del servidor automáticamente.
- **`scripts/meta-ads.py`**: contra la Marketing API de Meta
  (`graph.facebook.com/v21.0`), mismas convenciones que
  `deploy-shopify.py` (librería estándar, token por variable de entorno,
  nunca commiteado). Comandos: `listar`, `reporte`, `pausar`, `activar`,
  `presupuesto`.
- **`INSTRUCTIVO-META-ADS.md`**: guía para el cliente — ubicar/crear
  Business Manager, vincular página + Instagram, crear cuenta
  publicitaria en MXN con método de pago, crear System User con token
  permanente (mismo patrón que `INSTRUCTIVO-APP-SHOPIFY.md`), instalar
  el canal Facebook & Instagram y obtener el Pixel ID.

### Por qué no se instaló el canal de Shopify directamente

Instalar una app de Shopify requiere el flujo OAuth completo por
navegador con la sesión del dueño ya iniciada (el mismo motivo por el
que el token de Shopify se generó a mano en `INSTRUCTIVO-APP-SHOPIFY.md`)
— no hay forma de completarlo por API. Por eso el pixel queda listo en
el código pero inactivo (el campo `meta_pixel_id` vacío no carga nada)
hasta que el cliente complete esa parte y dé el ID.

### Pendiente

Todo lo que requiere credenciales o acceso a la cuenta de Meta del
cliente — ver sección 8 de `PENDIENTES.md` y el instructivo. Una vez que
llegue el token del System User y el Pixel ID, la primera campaña
(solo pesca, presupuesto a definir) se arma y se deja **pausada** para
revisión antes de activarla.
