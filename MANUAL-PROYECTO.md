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
29. [Meta Ads (Facebook/Instagram): medición y catálogo anunciable](#29-meta-ads-facebookinstagram-medición-y-catálogo-anunciable)
30. [Aviso de Shopify Trust & Safety: retención de pagos por "armas"](#30-aviso-de-shopify-trust--safety-retención-de-pagos-por-armas)
31. [Dirección de la tienda: quitar el domicilio personal del dueño](#31-dirección-de-la-tienda-quitar-el-domicilio-personal-del-dueño)
32. [El catálogo de Meta llevaba medio año muerto](#32-el-catálogo-de-meta-llevaba-medio-año-muerto)
33. [La primera campaña de Meta Ads](#33-la-primera-campaña-de-meta-ads)
34. [Dónde viven las credenciales (y por qué nunca en el repo)](#34-dónde-viven-las-credenciales-y-por-qué-nunca-en-el-repo)
35. [Los primeros días de la campaña: leer datos chicos sin engañarse](#35-los-primeros-días-de-la-campaña-leer-datos-chicos-sin-engañarse)
36. [Herramientas de terceros instaladas: plugins y agentes](#36-herramientas-de-terceros-instaladas-plugins-y-agentes)
37. [Los 6 accesorios de arma que se colaron al catálogo](#37-los-6-accesorios-de-arma-que-se-colaron-al-catálogo)
38. [La reconstrucción de la campaña: por qué no vendía](#38-la-reconstrucción-de-la-campaña-por-qué-no-vendía)
39. [Botón de WhatsApp y la trampa del deploy incremental](#39-botón-de-whatsapp-y-la-trampa-del-deploy-incremental)
40. [Control de presupuesto: cómo poner un tope real](#40-control-de-presupuesto-cómo-poner-un-tope-real)
41. [Auditoría de conversión: por qué 367 visitas no vendieron](#41-auditoría-de-conversión-por-qué-367-visitas-no-vendieron)
42. [Judge.me: instalación, y por qué el metafield solo no basta](#42-judgeme-instalación-y-por-qué-el-metafield-solo-no-basta)
43. [Judge.me: 4 reseñas huérfanas del catálogo anterior](#43-judgeme-4-reseñas-huérfanas-del-catálogo-anterior)
44. [Cards Carousel: reseñas de tienda sin depender del match de producto](#44-cards-carousel-reseñas-de-tienda-sin-depender-del-match-de-producto)
45. [Ola 6: punch list post-auditoría con agentes especializados](#45-ola-6-punch-list-post-auditoría-con-agentes-especializados)
46. [Cero compras en 6 meses: el hallazgo que nadie había medido](#46-cero-compras-en-6-meses-el-hallazgo-que-nadie-había-medido)
47. [Ola 7: cerrar los 4 pendientes diferidos](#47-ola-7-cerrar-los-4-pendientes-diferidos-24-ago)
48. [Ola 8: auditoría previa a campaña y sus correcciones](#48-ola-8-auditoría-previa-a-campaña-y-sus-correcciones-25-ago)
49. [Los 7 que "llegaron a pagar" eran el dueño](#49-los-7-que-llegaron-a-pagar-eran-el-dueño-25-ago)
50. [Conciliación de inventario del 25 de agosto y el choque de los dos combos Revenger](#50-conciliación-de-inventario-del-25-de-agosto-y-el-choque-de-los-dos-combos-revenger)
51. [Verificación final y la barra de promesas (25 ago)](#51-verificación-final-y-la-barra-de-promesas-25-ago)

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

### Comunicación en el sitio
- Franja en la homepage, justo después del hero
- Nota compacta en cada ficha de producto, debajo del botón de compra
- Desde la Ola 1 de la sección 41: también en un `collapsible_tab`
  "Envíos y entrega" dentro de la propia ficha, y en el pie del
  carrito (panel lateral y `/cart`)
- Texto real en vivo: *"Envío gratis desde $799 MXN. Pedidos menores,
  $189. Entrega en 2 a 7 días hábiles."* — corregido el párrafo de
  arriba, que llevaba semanas desactualizado ("2 a 4 días
  aproximados"). El tiempo de entrega se ajustó deliberadamente para
  no prometer de más (las cotizaciones reales dieron hasta 5-6 días
  hábiles en destinos lejanos), y en algún punto el código se corrigió
  a "2 a 7 días" sin que este párrafo se actualizara junto — verificado
  con `curl` en vivo el 22 de agosto de 2026 antes de tocar esta línea,
  no de memoria.

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
- **Franja de confianza en la homepage** (13 agosto 2026), antes de la
  sección de cierre: envío, garantía y devoluciones, reutilizando el
  componente `.im-trust-item` de la ficha de producto — ver
  `sections/brand-experience.liquid` (settings `trust_*`)
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
- `scripts/sincronizar-canal-meta.py` — mantiene correcto qué productos
  se publican al canal de Meta (ver [sección 32](#32-el-catálogo-de-meta-llevaba-medio-año-muerto))
- `scripts/conciliar-inventario.py` — concilia el conteo físico contra
  Shopify (ver [sección 28](#28-conciliación-de-inventario-físico-contra-shopify))
- `scripts/vincular-codigo-b1.py` — guarda el código interno del POS en
  el campo `barcode`, la segunda llave del cruce de inventario
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

Al momento de escribir este manual, queda abierto: crear y vincular la
cuenta de Instagram del negocio (pasos exactos en
`INSTRUCTIVO-META-ADS.md`, Paso 2 — lo tiene que hacer el dueño de la
cuenta) y, más adelante, TikTok. Las señales de confianza (franja de
envío/garantía/devoluciones en la homepage) se resolvieron el 13 de
agosto de 2026.

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

> ⚠️ **Esto dejó de ser cierto el 18 de agosto.** El botón se volvió a
> agregar por una razón de negocio distinta (el público de la campaña
> resultó ser gente de 35-65 años que prefiere preguntar antes de
> comprar) — ver la sección 39. No es una contradicción entre el manual
> y el código: son dos decisiones tomadas en momentos distintos, ambas
> correctas para su fecha. Se anota aquí para que nadie lea este párrafo
> aislado y concluya que hay un bug.

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

- **461 nodos, 705 conexiones, 41 comunidades** de código relacionado
  (cifra al 24 de agosto de 2026, Ola 7). Historia: 452/697/37 en la
  primera corrida, 459/705/39 al 7 de agosto, 460/705/40 al 13 de
  agosto. Se mantuvo en 460/705/40 durante toda la auditoría de
  conversión y la integración de Judge.me (Olas 1-5g) porque fueron
  marcado, estilos y bloques de app sobre secciones ya existentes, no
  componentes de JS nuevos — `graphify update` reportaba "sin cambios
  de topología". Lo mismo pasó con la franja de confianza del 13 de
  agosto. **La Ola 7 sí movió la cifra (+1 nodo, +1 comunidad)**, y por
  la razón esperada: `assets/imx-cross-sell.js` es el primer
  componente de JS propio que se agrega desde entonces (los snippets
  de Liquid nuevos no cuentan como nodos por sí solos)
- **La Ola 8 (25 ago) la dejó igual**: 461/705/41. Sus cambios fueron
  Liquid (`combo-sugerido.liquid`), CSS y JSON de configuración —
  ninguno genera nodos. Confirma la regla que ya se veía en las Olas
  1-5g: en este tema **solo los componentes de JavaScript mueven el
  grafo**
- **La Ola 10 (25 ago) los dejó igual**, en los **dos** grafos:
  461/705/41 y 87/144/9. Es el caso interesante, porque sí se tocó
  Python: `conciliar-inventario.py` ganó el modo `--dry-run`, pero
  dentro de `main()`, sin crear funciones nuevas. **Graphify mide
  estructura, no líneas** — un cambio de comportamiento dentro de una
  función existente no mueve el grafo, y eso es correcto, no un fallo
  de detección. Lo único que cambió fue la etiqueta de una comunidad,
  que Graphify renombró por su hub (`conciliar-inventario.py`)
- **La verificación final (sección 51) sí movió el grafo de `scripts/`,
  por primera vez desde el 24 de agosto: 87 → 89 nodos, 144 → 147
  aristas**, 9 comunidades. Los dos nodos nuevos son
  `deploy_shopify_orden_de_subida` (la función que corrige el orden de
  subida) y `deploy_shopify_rationale_162` — este último **no es
  código**: Graphify extrajo el *porqué* del docstring y lo guardó como
  nodo aparte. Es la diferencia práctica con la Ola 10: allá el cambio
  vivía dentro de una función existente, aquí nació una función nueva
  **con su razón escrita**. El grafo de `tema-shopify/` no se movió
  (Liquid, CSS y JSON de configuración), fiel a la regla de siempre
- **Segundo grafo, `scripts/`: 89 nodos, 147 aristas, 9 comunidades**
  (25 de agosto, tras sumar `orden_de_subida()` a `deploy-shopify.py`;
  antes fue 87/144/9 desde el 24). El repo lleva **dos** grafos
  independientes —
  `graphify update .` se corre por separado dentro de `tema-shopify/`
  y dentro de `scripts/`, no desde la raíz
- Los "god nodes" (componentes más centrales de la arquitectura del
  tema): `PredictiveSearch`, `FacetFiltersForm`, `SlideshowComponent`,
  `CartItems`, `CartDrawer`, `MenuDrawer`, entre otros
- Consultable por comandos (`graphify explain "X"`, `graphify path "A"
  "B"`, `graphify query "pregunta"`) para entender rápido qué toca qué
  en el código, sin tener que releer todo el tema

Detalle completo de instalación y uso en
[`SKILLS-USADAS.md`](./SKILLS-USADAS.md).

### Segundo grafo: las herramientas del repo (15 de agosto de 2026)

Durante meses el grafo cubrió **solo `tema-shopify/`**. Eso dejaba fuera
`scripts/`, que para entonces ya eran ~1,500 líneas de Python en 6
herramientas (deploy del tema, conciliación de inventario, sincronización
del canal de Meta, gestión de campañas, vinculación de códigos B1,
reconstrucción del mapa 3D). Cada vez que se corría `graphify update`
sobre el tema y reportaba "sin cambios de topología" tras tocar un
script, la respuesta correcta no era "Graphify no aplica" sino "ese
código está fuera del alcance del grafo".

Se construyó un segundo grafo con `cd scripts && graphify update .`. El
propio Graphify dictaminó que valía la pena (*"corpus is large enough
that graph structure adds value"*):

- **74 nodos, 125 conexiones, 10 comunidades** — cifra de esa **primera
  corrida**. Hoy es **87/144/9** tras sumar `cargar-fichas-tecnicas.py`
  y `crear-combos.py` (ver arriba, en la lista de cifras vigentes); esta
  se conserva como registro de cuándo se creó el grafo, no como estado
  actual
- God node principal: **`api_request()`** con 9 conexiones — es el patrón
  compartido entre casi todas las herramientas (petición HTTP con
  reintentos, backoff y manejo de errores contra Shopify o Meta). Que
  aparezca como el nodo más conectado confirma lo que ya se sabía por
  escrito: cada script reimplementa una variante de la misma función
- Cada script forma su propia comunidad, con `main()` como hub local

**Por qué dos grafos y no uno:** correr Graphify en la raíz del repo
arrastraría `.claude/skills/` y otras carpetas que no son código del
proyecto. Dos grafos acotados dan señal más limpia que uno ruidoso. Si
alguna vez se quiere una vista unificada, Graphify trae
`merge-graphs g1 g2` para combinarlos sin rehacer nada.

```bash
cd tema-shopify && graphify update .   # grafo del tema
cd scripts && graphify update .        # grafo de las herramientas
```

Del `.gitignore` se excluye `*/graphify-out/cache/ast/` (se regenera solo
y pesa más que el grafo) y las carpetas fechadas de respaldo. El grafo,
el reporte y la visualización sí se versionan.

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

### Automático en cada push — ✅ activo desde el 13 de agosto de 2026
`.github/workflows/deploy-shopify.yml` corre el script en cada push que
toque `tema-shopify/`. El secret `SHOPIFY_ADMIN_TOKEN` (GitHub →
Settings → Secrets and variables → Actions) llevaba varios commits sin
configurarse — el workflow fallaba en silencio con "Falta
SHOPIFY_ADMIN_TOKEN" desde el 8 de agosto sin que nadie lo notara, así
que el código quedaba en el repo pero no llegaba a la tienda hasta que
se corría el script a mano. El cliente lo configuró el 13 de agosto;
verificado reintentando la corrida fallida más reciente
(`rerun_failed_jobs`), que terminó en `success`.

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

### Segunda corrida (12 de agosto de 2026) — ya como script reutilizable

La primera vez se hizo con código ad-hoc dentro de la sesión, sin quedar
guardado. Esta vez se guardó como `scripts/conciliar-inventario.py`
(misma lógica documentada arriba, ahora reutilizable con dos argumentos:
Excel de entrada y de salida). Resultado de 1,175 filas del conteo: 306
verde, 20 amarillo, 746 rojo, 103 gris — 23 actualizaciones subidas a
Shopify, 0 errores. El token se generó de nuevo (los contenedores de
sesión no lo conservan entre sesiones distintas) con el mismo flujo OAuth
manual de `INSTRUCTIVO-APP-SHOPIFY.md`.

### El cruce por SKU dejaba productos fuera (15 de agosto de 2026)

Al revisar por qué había ~104 filas grises en cada corrida, apareció un
problema de fondo: el cruce por SKU (`No Parte` ↔ `variant.sku`) no
cubría todo el catálogo. Medido con precisión:

- **88 filas del conteo no traen `No Parte`** — el POS no les asignó
  código, así que nunca podían casar con nada.
- **17 productos de Shopify que el conteo nunca tocaba**, porque su SKU
  venía del catálogo del fabricante (`632252557`, `MAGENERGY55-250`) en
  vez del código interno del POS (`15ANZUEL658EC`). Se cargaron en
  momentos distintos, con criterios distintos.

Se intentó primero un **cruce por nombre** (descripción del conteo contra
título del producto). Fracasó como solución general —resolvió 1 de 87— y
más importante: al probar umbrales más bajos aparecieron coincidencias
**peligrosas**, no solo imprecisas. `"ANZUELO MUSTAD #2 94151-NI"` se
parece en un 77% a `"Anzuelo Mustad 94151-NI Live Bait #8"`: mismo
anzuelo, **talla distinta**. En un catálogo donde decenas de productos se
diferencian solo por un número (calibre, talla, piezas), un umbral
permisivo actualizaría el inventario del producto equivocado en silencio.
Quedó como último recurso con umbral del 90%.

### La solución real: una segunda llave exacta

El cliente hizo notar que su sistema maneja también un **código interno**
(`Codigo B1`) y mandó el export con esa columna. Los números lo
resolvieron todo:

| | |
|---|---|
| Filas del conteo con `Codigo B1` | **1207 / 1207 (100%)** |
| Filas sin `No Parte` que sí traen `Codigo B1` | **88 de 88** |
| Códigos B1 duplicados | **0** |

Y del lado de Shopify había un campo perfecto y **completamente vacío**:
`barcode` (0 de 383 usados). Se pobló con el `Codigo B1` mediante
`scripts/vincular-codigo-b1.py` — **371 productos escritos, 0 errores**.

El conciliador ahora cruza en tres niveles de prioridad: **SKU → código
B1 → nombre**, los dos primeros exactos.

> El script solo escribe el código B1 en productos que **ya casan por
> SKU**, donde el vínculo es seguro. Los que no casan los reporta para
> revisión manual, en vez de emparejarlos por parecido de nombre — que es
> justo la operación que se demostró peligrosa arriba.

**Detalle del campo `barcode`:** el `Codigo B1` mezcla dos formatos y
ambos son legítimos — ~1045 códigos internos de 4 dígitos (`4747`) y ~162
códigos de barras reales EAN-13/UPC-A (`793676021461`). Guardar un número
interno en un campo llamado "código de barras" es semánticamente
impreciso, pero es el único campo identificador libre que ofrece Shopify,
es visible y buscable en el admin, y para 162 productos es literalmente
correcto. Se prefirió sobre un metafield por simplicidad operativa.

### Estado y pendientes

Cobertura de conciliación automática: **371 de 383 productos (97%)**.

Los 12 restantes son diábolos Gamo, un rifle y una mira cuyo vínculo no
se pudo determinar con certeza. Quedaron listados con su candidato
propuesto en:

📄 **[`PRODUCTOS-PENDIENTES.md`](./PRODUCTOS-PENDIENTES.md)**

Separados en dos grupos: 8 con candidato claro que solo falta confirmar,
y 4 que requieren decisión del dueño (dos productos distintos reciben el
mismo código candidato, otro cuyo candidato no especifica cantidad de
piezas, etc.). No afectan las campañas de Meta — son todas categorías
prohibidas para anunciar — solo la exactitud del inventario online.

> **Para productos nuevos:** ponerles el `Codigo B1` en el campo "Código
> de barras" al darlos de alta en Shopify. Con eso se concilian solos
> desde el primer día, sin importar qué SKU tengan.

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

### Lo que apareció al ejecutar el instructivo (11-12 de agosto): nada partía de cero

El plan de arriba asumía una cuenta nueva. La realidad, descubierta paso a
paso vía Claude en Chrome guiando al cliente por Business Manager, fue
otra — **todo ya existía desde el 16 de febrero de 2026**, sin que
quedara documentado en ningún lado del proyecto:

- **Business Manager, página, cuenta publicitaria y canal de Shopify ya
  estaban conectados.** Cuenta publicitaria "Intemperie México Ads"
  (`act_1264279685553718`), moneda MXN, dos tarjetas cargadas
  (Amex ...8065, Visa ...6497).
- **Ya había gasto real:** $1,823.44 MXN entre el 17 de febrero y el 13
  de abril de 2026 (39 días con gasto). Desde mediados de abril, cero
  gasto — pero **6 campañas seguían marcadas "Activas"** cuatro meses
  después, sin entregar nada (`"Test"`, `"Test 3D"`, `"Nueva campaña de
  Interacción"`, `"PAGINA DE FACEBOOK"` — nombres de una configuración
  de prueba/agencia dejada a medias). **Se eliminaron las 6** por
  instrucción explícita del cliente, confirmada aparte por tratarse de
  una acción destructiva (el modo automático del harness la bloqueó
  hasta recibir esa confirmación).
- **El pixel de Meta ya estaba activo** ("Intemperie México Pixel", ID
  `2011984246408291`), inyectado automáticamente por la app oficial
  "Facebook & Instagram" de Shopify — instalada desde el 16 de febrero.
  Por eso el setting `meta_pixel_id` del tema (ver arriba) se deja
  **vacío a propósito**: si se llenara, se duplicarían los eventos
  (PageView, AddToCart, etc. contados dos veces por dos pixeles
  cargando el mismo ID), lo cual arruina la optimización de Meta. El
  snippet manual queda como plan B inerte, no en uso.
- **El catálogo de Meta estaba desactualizado y con productos
  prohibidos.** Solo 56 de 250+ productos activos estaban sincronizados
  (los del alta inicial de febrero; nada agregado después se había
  publicado nunca al canal). Se corrigió en dos pasadas desde Shopify
  Admin → Productos → Buscar y filtrar → seleccionar todos los
  resultados → "Más acciones":
  1. Publicar **todos** los productos al canal "Facebook & Instagram"
     (corrigió la desactualización, pero de paso publicó también las
     categorías prohibidas — riesgo real de baneo mientras estuvo así).
  2. Excluir del canal, de inmediato: colección "Rifles y Pistolas de
     Aire" completa (20), "Diábolos y Municiones" completa (31), y solo
     la subcolección "Miras Telescópicas" (8) — sin tocar Binoculares,
     Monoculares ni Accesorios de Óptica, que sí quedan anunciables.
     Total: 59 productos excluidos. Verificado en un producto de prueba
     ("Pistola Bullet's P30 Eléctrica Full-Auto H&K") que el canal
     "Facebook & Instagram" ya no aparece en su panel de publicación.

### Fricciones para generar el token del System User (para no repetirlas)

Documentado porque costó varias vueltas, igual que el instructivo de
Shopify documentó el flujo OAuth que sí funciona:

1. **Crear un Usuario del Sistema exige que el negocio tenga al menos
   una app registrada.** Sin eso, el botón "Añadir" queda inactivo con
   el aviso "una aplicación debe formar parte de este porfolio
   empresarial".
2. **Crear esa app exige verificar la cuenta personal** (teléfono o
   tarjeta) la primera vez — se usó el teléfono del cliente, nunca una
   tarjeta.
3. **El nombre "Claude Integration System User" fue rechazado** por Meta
   como "nombre no válido" (probablemente por la palabra "System User"
   duplicando el tipo de objeto) — se resolvió simplificando a "Claude
   Integration".
4. **Asignar activos al usuario del sistema no basta para generar el
   token.** El paso "Asignar permisos" del asistente de "Generar
   identificador" mostraba "No hay permisos disponibles" a pesar de que
   el usuario del sistema ya era Administrador de la app. Causa real: la
   app se había creado **sin ningún caso de uso** ("Crea una aplicación
   sin un caso de uso"), así que no existía ningún producto (Marketing
   API) del que ofrecer permisos. Se resolvió en Panel de la app →
   Casos de uso → Añadir → **"Crea y administra anuncios con la API de
   marketing"**. Tras eso, `ads_management`, `ads_read`,
   `business_management` y `catalog_management` aparecieron disponibles
   de inmediato.
5. **No hizo falta Verificación de la empresa (Business Verification).**
   Apareció como opción disponible ("Sin verificar" con botón "Iniciar
   verificación") pero **no se tocó** — la app quedó en modo Desarrollo
   ("Marketing API Access Tier: Limited"), suficiente para que un
   administrador del propio negocio use esos permisos sobre sus propios
   activos. Verificar la empresa (RFC, acta constitutiva, identificación)
   solo sería necesario para subir de nivel de acceso o publicar la app
   para terceros — no es el caso.

**División de responsabilidades que se mantuvo todo el proceso:**
navegación y verificación de estado (leer pantallas, confirmar qué
existe) sí las hizo Claude en Chrome; crear el usuario del sistema,
asignarle activos y el clic final de generar/copiar el token los hizo
el cliente directamente con su propio mouse — son las acciones que
otorgan acceso administrativo y una credencial capaz de gastar dinero,
y ese límite lo puso primero el propio Claude en Chrome al negarse a
ejecutarlas, con buen criterio.

### Estado al 12 de agosto de 2026

- Token de System User verificado por API: válido, tipo `SYSTEM_USER`,
  con los 4 scopes necesarios.
- Cuenta publicitaria confirmada: activa, MXN, sin campañas (feed
  limpio tras el borrado).
- Pixel confirmado activo (vía canal oficial, no vía el snippet manual).
- Catálogo corregido: sin armas, munición ni miras.
- **A petición del cliente, el lanzamiento de la primera campaña queda
  en pausa** hasta que confirme una lista adicional de pendientes antes
  de invertir presupuesto real.

### Instagram creado y vinculado (14 de agosto de 2026)

De los pendientes que bloqueaban el lanzamiento, faltaba crear la cuenta
de Instagram del negocio. Se intentó primero el camino que describía
`INSTRUCTIVO-META-ADS.md` (crear la cuenta directo desde Business Suite),
y resultó **incorrecto** — Business Suite → Cuentas de Instagram solo
tiene un botón "+ Añadir" que abre "Reclamar una cuenta de Instagram",
un flujo para **vincular una cuenta que ya existe** iniciando sesión, no
para crear una nueva. Se corrigió el instructivo (ver ahí, Paso 2) con
el camino real, en dos partes separadas:

1. Crear la cuenta en instagram.com — hecho por el cliente directamente
   (usuario `@intemperiemexico`, cuenta Empresa, categoría deportes al
   aire libre). Verificación por correo, es un paso que no se puede
   delegar (login/registro de Instagram automatizado viola sus términos).
2. Vincularla desde Business Suite → Configuración del negocio → Cuentas
   → Cuentas de Instagram → "+ Añadir" → "Reclamar una cuenta de
   Instagram" → login con la cuenta ya creada. Confirmado: *"@intemperiemexico
   was added to the business portfolio"*.

**División de trabajo:** igual que con el System User (ver arriba),
Claude en Chrome guió la navegación y verificó cada pantalla, pero los
formularios de registro/login los completó el cliente con su teclado.

### Bloqueo "API access blocked" — NO era de red/IP (corregido)

Al llamar a la Marketing API (`graph.facebook.com`) con `scripts/meta-ads.py`,
toda llamada con un token real devolvía `{"error": {"message": "API
access blocked.", "code": 200}}`. La primera hipótesis (documentada
aquí mismo, ahora corregida) fue un bloqueo anti-abuso por reputación de
IP de datacenter, igual que el ya conocido para Browser Harness/CDP
(sección 21) — **esa hipótesis era incorrecta**, descartada el 14 de
agosto cuando el cliente corrió el mismo script desde su propia Mac (IP
residencial) y obtuvo **el mismo error exacto**.

Diagnóstico real, paso a paso:
1. Se revisó la app "Claude Integration" y el Business Manager en busca
   de restricciones visibles (App Review, alertas de política,
   "Problemas recientes de la cuenta") — **nada**, todo limpio.
2. Se probó el mismo token en el **Graph API Explorer oficial de Meta**
   (`developers.facebook.com/tools/explorer`), que ejecuta la llamada
   desde la infraestructura de Meta, no desde nuestro cliente HTTP — la
   consulta `act_1264279685553718?fields=name,account_status` funcionó
   perfecto (`account_status: 1`, ACTIVE). Esto aisló el problema: no era
   el token, la cuenta ni los permisos — era específicamente cómo
   `meta-ads.py` arma la petición.
3. Causa real: `urllib` (librería estándar de Python) manda
   `User-Agent: Python-urllib/3.x` por defecto — una firma reconocida
   como bot que el sistema anti-abuso de Meta bloquea antes de evaluar
   el token, sin importar desde qué IP llegue. Se agregó un
   `User-Agent` de navegador real a `api_request()` en `meta-ads.py`, y
   el bloqueo desapareció — confirmado corriendo `activos` y `listar`
   sin el error "API access blocked".

**Lección para el futuro:** un error igual desde dos redes distintas
(este entorno remoto y la Mac del cliente) es evidencia de que **no es
de red** — hay que descartarlo probando la llamada por un canal
completamente distinto (herramienta oficial del proveedor, navegador)
antes de asumir un bloqueo de IP. La hipótesis de Browser Harness/CDP
(sección 21) sigue siendo válida — ahí sí se confirmó que es
específicamente el protocolo WebSocket lo que el proxy de este entorno
bloquea — pero no todo error de conexión hacia una API externa es del
mismo origen, y conviene no generalizar de un caso a otro sin
verificarlo de nuevo.

**Estado real tras el fix:** el script sí puede correr contra la cuenta
real, incluso desde este entorno — no hacía falta que el cliente lo
corriera desde su máquina por el motivo original que se pensó (aunque de
todas formas lo terminó corriendo él, y así se detectó el error real).

### `crear-campania`: agregado el 14 de agosto

`scripts/meta-ads.py` solo tenía comandos de gestión (`listar`, `reporte`,
`pausar`, `activar`, `presupuesto`) — nada para crear una campaña nueva.
Se agregaron dos comandos:

- **`activos`**: solo lectura. Descubre por API la página de Facebook, la
  cuenta de Instagram, el catálogo de productos y el pixel del negocio
  (vía `/{business_id}/owned_pages`, `/instagram_accounts`,
  `/owned_product_catalogs`, `/{account_id}/adspixels`), y aborta con un
  mensaje claro si encuentra más de un resultado en cualquiera de esos
  — nunca adivina cuál usar.
- **`crear-campania --presupuesto <monto>`**: arma campaña + conjunto de
  anuncios + creativo dinámico + anuncio, usando el catálogo de Shopify
  ya sincronizado y filtrado (excluye armas/municiones/miras desde el
  origen, no hace falta armar un conjunto de productos separado — si no
  existe ninguno todavía, el comando crea uno que cubre todo el catálogo,
  ya de por sí filtrado). Objetivo `OUTCOME_SALES`, targeting México,
  18+, Facebook + Instagram. **Todo se crea siempre con `status: PAUSED`**
  — no hay bandera para saltarse eso; activar requiere correr el comando
  `activar` aparte, a propósito, como capa extra antes de que se gaste
  presupuesto real.

Decisión del cliente (14 de agosto): formato catálogo dinámico (no
imagen única). El presupuesto se corrigió al crear la campaña: el
cliente aclaró que eran **$700 MXN por semana**, no $600 diarios —
seis veces menos de lo que se había anotado. Quedó en $100 MXN/día.

**Actualización tras el fix del User-Agent (arriba):** con `activos` ya
funcionando, se descubrió que el ID de página que se venía usando
(`61588253103964`, sacado de la URL pública de Facebook) **no es el ID
real de la página en la API** — el real es `924461404093150`. El
catálogo (`1230530145855635`) sí resolvió bien vía
`/{business_id}/owned_product_catalogs`. Pero `/instagram_accounts`
devuelve vacío pese a que la cuenta `@intemperiemexico` sí está agregada
al portfolio empresarial (confirmado visualmente en Business Suite,
sección 14 de este manual) — el token de System User generado el 14 de
agosto no incluye el permiso `instagram_basic`, necesario para leer
cuentas de Instagram por API aunque el usuario del sistema tenga acceso
total a ese activo en la interfaz. Pendiente regenerar el token una vez
más agregando ese permiso antes de poder correr `crear-campania` con
éxito (necesita el ID de la cuenta de Instagram para el creativo
dinámico).

### Pendiente

Ver sección 8 de `PENDIENTES.md`. Instagram ya está creado y vinculado
en Business Suite, pero falta regenerar el token con el permiso
`instagram_basic` para que `crear-campania` pueda leerlo por API. Una
vez con eso, el cliente corre `activos` (ya no falla) y
`crear-campania`, revisa lo creado (queda pausado) y decide cuándo
activar.

---

## 30. Aviso de Shopify Trust & Safety: retención de pagos por "armas"

### Qué pasó

El 15 de agosto de 2026 Shopify mandó un aviso de "Trust & Safety"
(PDF, Ticket ID `b724b907-5dbb-454c-aa07-1b32e2cdb3f7`): su socio bancario
identificó productos de "Air Guns" / "Air Rifles" (el departamento
"Rifles y Pistolas de Aire") como armas, y **retenía los payouts de
Shopify Payments** hasta resolverlo. Dos caminos que ofrecía el aviso:
quitar esos productos de todos los canales de venta, o dejar de usar
Shopify Payments. Plazo: 19 de agosto para responder el formulario de
revisión.

Es el mismo patrón de fondo que ya se había documentado con Meta Ads
(sección 29): rifles/pistolas de aire comprimido caen en zona gris de
"arma" para plataformas externas (bancos, redes), aunque en México sean
categoría deportiva no letal. Primero afectó a qué se puede anunciar;
ahora, a qué se puede cobrar.

### La solución encontrada: no hacía falta quitar nada

Antes de decidir entre las dos opciones del aviso, se verificó algo
importante en el checkout real: la tienda **ya tenía PayPal y Mercado
Pago Checkout Pro activos** además de Shopify Payments (visible en
Configuración → Pagos → "Proveedores de pagos adicionales" — nadie lo
había documentado en el proyecto hasta ahora). Eso cambió el problema:
en vez de "¿quito productos o cambio de proveedor para toda la tienda?",
la opción real era **desactivar solo Shopify Payments** y dejar que
PayPal + Mercado Pago sigan cubriendo el checkout — sin tocar el
catálogo ni las ventas.

Razonamiento (no confirmado directamente con Shopify, pero consistente
con el texto del aviso): la retención es específica de **"Shopify
Payments payouts"** — PayPal y Mercado Pago son procesadores
independientes, el dinero de esas ventas nunca pasa por el sistema de
payouts de Shopify, así que no deberían estar afectados por este aviso
en absoluto.

### Qué se hizo (14-15 de agosto de 2026)

1. Se confirmó con el cliente que la tienda no tiene ventas presenciales
   por Shopify POS — punto importante porque el modal de desactivación
   advierte que puede afectar "Facebook, Instagram y Tienda física"; sin
   POS físico, ese riesgo no aplicaba.
2. El cliente desactivó Shopify Payments desde Configuración → Pagos →
   Shopify Payments → "Gestionar" → menú "Más acciones" → "Desactivar
   Shopify Payments" (motivo seleccionado: **"El producto está
   prohibido"**, el más preciso de la lista — no había una opción
   literal de "uso otro proveedor").
3. Guiado por Claude en Chrome hasta el modal de confirmación final,
   pero **el clic de confirmar lo dio el cliente**, no Claude — mismo
   criterio de todo el proyecto: acciones que cambian cómo se recibe
   dinero las ejecuta el dueño, Claude en Chrome solo navega y reporta.
4. Confirmado después en la pantalla de Pagos: PayPal y Mercado Pago
   siguen activos, el checkout sigue funcionando.

**No se tocó ningún producto del catálogo** — la tienda sigue vendiendo
rifles y pistolas de aire comprimido normal, solo cambió por dónde se
procesa el pago de tarjeta.

### Qué vigilar después de esto

- **El dinero ya retenido antes de la desactivación sigue retenido** —
  desactivar Shopify Payments no libera fondos ya en revisión, solo
  evita que ventas *futuras* queden atrapadas ahí. En este caso no
  aplicaba: el cliente confirmó que no había ventas todavía, cero riesgo.
- **Conversión del checkout**: Shopify Payments procesaba tarjeta sin
  salir de la página; PayPal y Mercado Pago redirigen al cliente a otra
  pantalla ("Se te redirigirá a Mercado Pago para que completes la
  compra"). Vale la pena revisar la tasa de conversión las próximas
  semanas por si ese paso extra afecta las ventas — especialmente
  relevante justo ahora que se está por lanzar la primera campaña de
  Meta Ads (sección 29).
### El seguimiento del 19 de agosto: resolverlo no era suficiente

Esta sección afirmaba que llenar el formulario de Shopify *"dejó de ser
necesario"* al desactivar Shopify Payments. **Fue un error de criterio, y
Shopify lo demostró cuatro días después.**

El 19 de agosto de 2026 llegó un segundo correo sobre **el mismo ticket**
(`b724b907-5dbb-454c-aa07-1b32e2cdb3f7`):

> *"We recently contacted you about your Shopify store [...] and require
> you to take the necessary actions outlined in our previous
> communications [...] we have temporarily placed a hold on your Shopify
> Payments payouts while we complete our review."*

Plazo movido del 19 al **21 de agosto**, con la coletilla *"to avoid
further action"*.

No pedían nada nuevo. **Esperaban una respuesta que nunca llegó.** El
problema estaba resuelto en la tienda desde el 14 de agosto, pero el
sistema de Shopify solo veía un ticket abierto y sin contestar, y por eso
escalaba solo.

> **La lección, que aplica a cualquier plataforma:** resolver un problema
> operativamente **no lo cierra**. Un ticket se cierra respondiéndolo. Un
> proveedor no puede saber que actuaste si no se lo dices, y sus sistemas
> automáticos escalan por silencio, no por incumplimiento. Cuando una
> plataforma da un plazo, hay que responder aunque la respuesta sea "ya
> lo resolví por la otra vía que ustedes ofrecían".

**Lo que se detectó al revisar el aviso otra vez:** quitar los productos
era condición **solo para seguir usando Shopify Payments**
(*"To continue processing payments through Shopify Payments, we require
the identified products removed"*). Con Shopify Payments desactivado, no
aplicaba. Y la frase sobre retener payouts era texto automático: no hay
payouts que retener en una cuenta desactivada, y no había ventas.

**Qué se envió** (formulario "Respond to an action taken by Shopify", en
inglés, el 19 de agosto): que el 14 de agosto se eligió la segunda opción
del aviso —desactivar Shopify Payments en vez de quitar productos—, que
el checkout lo sirven PayPal y Mercado Pago como procesadores
independientes, que no hay fondos retenidos porque no hay ventas, y
—deliberadamente— que **se acepta la restricción y no se pide reactivar
Shopify Payments**. Ese último punto cierra el ciclo en vez de dejarlo
abierto a interpretación.

**Respuesta de Shopify:** *"Thank you for your submission. If any
additional information is required, we will be in touch."* Ticket
respondido dentro del plazo.

### Qué queda pendiente

- **Vigilar si Shopify vuelve a escribir.** El acuse es automático; si
  piden algo más, llegará por correo al mismo ticket.
- **Vigilar si Shopify vuelve a escribir** sobre el mismo ticket.

### ✅ Decisión de fondo cerrada (25 de agosto de 2026)

La disyuntiva era: quitar los ~20 rifles y pistolas de aire para
recuperar Shopify Payments, o conservarlos y quedarse con PayPal +
Mercado Pago.

**El dueño decidió conservar los productos y no volver a usar Shopify
Payments.** Textual: *"shopify payments no lo utilizaremos, ya que sí
quiero que se mantengan los rifles y esas cosas en nuestro catálogo"*.

**Qué significa en la práctica, y por qué no es una concesión grande:**

- El checkout se queda **permanentemente** en PayPal + Mercado Pago,
  con el salto de página que eso implica. Deja de ser una situación
  temporal a revisar: es la arquitectura de cobro definitiva de la
  tienda.
- Ese salto **ya se auditó y está sano** (Parte A del plan de
  conversión, secciones A2/A3): envío correcto, ambos procesadores en
  español, sin forzar creación de cuenta, sin cargos ocultos. Y el
  pedido #1005 confirmó de punta a punta que un cliente real puede
  pagar (sección 46).
- Mercado Pago aporta algo que Shopify Payments **no** daba: meses sin
  intereses y pago en efectivo en OXXO y 7-Eleven — dos medios que
  pesan mucho en México y que desde la Ola 7 se muestran en la ficha y
  el carrito (sección 47). La comparación "Shopify Payments es mejor
  porque no saca al cliente de la página" ignoraba esto.
- Los rifles y pistolas de aire siguen sin poder anunciarse en Meta
  (sección 29), pero eso es independiente: se venden por tráfico
  orgánico y por la tienda física.

**Consecuencia para el trabajo futuro:** no hay que volver a evaluar
esto ni juntar datos de conversión para decidirlo. Si alguna vez se
retoma, sería por un cambio de circunstancias del negocio, no porque
la decisión quedara pendiente.

---

## 31. Dirección de la tienda: quitar el domicilio personal del dueño

### El problema

Al revisar Configuración → General en el Admin (14 de agosto de 2026),
el cliente notó que **su domicilio personal** (calle "Colorín",
Cuernavaca) aparecía en la tarjeta "Detalles de contacto de la tienda" —
un campo explícitamente marcado por Shopify como *"Tus clientes pueden
ver esta información"*. Como la tienda es 100% en línea (sin local
físico), no había razón para exponer esa dirección en absoluto.

Es un campo **distinto** de "Información comercial" (arriba en la misma
página), que muestra la misma dirección pero como entidad legal para
impuestos — ese sí puede (y debe) tener la dirección real, porque no es
customer-facing y es lo que exige el registro fiscal ante el SAT. No se
tocó.

### Por qué no se pudo dejar en blanco

Se intentó vaciar los 3 campos de calle, código postal y ciudad, y
Shopify rechazó el guardado con validación obligatoria en los tres
(`"Street can't be blank"`, `"Zip can't be blank"`, `"City can't be
blank"`). No existe la opción de dejar la tienda sin ninguna dirección
de contacto pública — solo "Nombre de la empresa" y "Apartamento, local,
etc." son opcionales.

### Solución y trade-off aceptado

Se dejó **"S/N, 62120 Cuernavaca Morelos, México"** — sin la calle ni
número reales del domicilio del dueño, pero con ciudad/estado/CP
verdaderos (obligatorios). El cliente aceptó explícitamente el
trade-off: esto expone la ciudad de origen del negocio, algo que
**ya se había decidido ocultar antes** en el footer del sitio (ver
sección 11, "Envíos" — el footer dice solo "Envíos a todo México", sin
mencionar Cuernavaca/Morelos, por decisión consciente de no exponer la
ubicación).

**Nota para el futuro:** si el cliente consigue un apartado postal o
dirección de oficina virtual, se puede volver a este campo y reemplazar
"S/N" + la ciudad real por esa dirección alterna, cerrando del todo la
inconsistencia con la decisión del footer. Mientras tanto, es la mejor
opción posible sin domicilio de negocio propio: el nombre de la calle
exacta (lo más identificable de un domicilio personal) ya no aparece.

**División de trabajo:** Claude en Chrome navegó, probó el guardado en
blanco (fallido) y reportó los errores exactos; la decisión de qué datos
usar en su lugar la tomó el cliente (ver `AskUserQuestion` en el
historial de la sesión) antes de escribir nada.

---

## 32. El catálogo de Meta llevaba medio año muerto

### Cómo se descubrió

Al ir a crear por fin la primera campaña (15 de agosto de 2026), el paso
previo de descubrimiento (`meta-ads.py activos`) reportó un catálogo con
**56 productos**. La tienda tiene 383. Ese número no cuadraba con nada, y
peor: entre esos 56 había *"Pistola Deportiva Mendoza"*, *"Rifle Black
Hawk"*, *"Mira Telescópica NAKASHI"*, *"Diábolos Mendoza"* — justo las
categorías que la sección 29 daba por excluidas desde el 12 de agosto.

Se paró el armado de la campaña ahí mismo. Anunciar contra ese catálogo
habría puesto armas en los anuncios, con riesgo real de baneo permanente.

### El diagnóstico, en tres cruces de datos

1. **El lado de Shopify estaba impecable.** 383 productos, 324 publicados
   al canal "Facebook & Instagram", 59 excluidos — y los 59 eran
   exactamente los correctos (Diábolos y Municiones 31 + Rifles y Pistolas
   de Aire 20 + Miras Telescópicas 8). El trabajo del 12 de agosto sí
   había funcionado.
2. **Ninguno de los 56 productos del catálogo existía ya en Shopify.**
   Cruzando el `retailer_product_group_id` de cada uno contra la tienda:
   0 coincidencias, 56 huérfanos. Confirmado con un 404 directo a la API.
3. **Los rangos de ID no se tocaban.** Shopify iba de `7882022715469` a
   `7895371907149`; el catálogo, de `7658842488909` a `7756596412493`. En
   algún momento se borró y recreó el catálogo completo en Shopify, y Meta
   se quedó con la generación anterior.

O sea: la sincronización no estaba atrasada, estaba **cortada**. Desde
febrero. Todo lo que se hizo el 12 de agosto arregló Shopify, pero nunca
llegó a Meta porque no había quién lo empujara.

### La causa raíz

La app "Facebook & Instagram" de Shopify estaba **desvinculada de Meta**.
Su pantalla mostraba un widget promocional en vez del panel real, y en
lugar del nombre de la cuenta conectada ofrecía un enlace "Conectar cuenta
de Facebook". Ese enlace, además, **no hacía nada al pulsarlo** — Claude
en Chrome verificó en la consola de red que el clic solo generaba
telemetría de Shopify, sin ninguna petición hacia Facebook.

### La reparación

1. **Antes de tocar nada, la red de seguridad.** Se escribió
   `scripts/sincronizar-canal-meta.py`, que repone el estado de
   publicación por API. Con eso, reconectar o reinstalar la app dejaba de
   ser arriesgado: pasara lo que pasara con las publicaciones, se
   restauraban en un comando. Requirió agregar los scopes
   `read_publications` / `write_publications` al token de Shopify.
2. **Se reconectó la app** desde cero (el cliente hizo el login de
   Facebook y las selecciones). Business Manager "Intemperie México",
   modo **"Solo anuncios"** (no "Tienda y anuncios" — no hacía falta
   montar una tienda dentro de Facebook), pixel **existente**
   `2011984246408291`, y **catálogo nuevo** en vez de reconectar el viejo
   contaminado. Nuevo catálogo: `1746844133017649`.
3. **El catálogo nuevo se quedó en 0 productos.** Aquí apareció el
   segundo obstáculo, menos obvio: Shopify solo empuja al catálogo
   **cuando algo cambia**. Los 324 productos ya estaban publicados desde
   antes, así que no había ningún evento que empujar, y el catálogo nuevo
   se quedó esperando indefinidamente. La app de Shopify **no tiene
   ningún botón de "sincronizar ahora"** (se revisaron las 5 secciones de
   su pestaña Configuración; lo único disponible es "Desconectar").
4. **Se agregó `--forzar-resync` al script**: despublica y vuelve a
   publicar todo lo anunciable, aunque ya esté correcto, para generar los
   eventos faltantes. El resultado fue inmediato — el catálogo pasó de 0
   a 159, exactamente los productos que alcanzaron a reciclarse.

### El error que se cometió en el camino

La primera corrida de `--forzar-resync` **se cayó a media ejecución** con
`SSL: UNEXPECTED_EOF_WHILE_READING`, dejando **159 productos
despublicados**. El script no tenía reintentos ante cortes de red, y en
una corrida de ~650 mutaciones eso era cuestión de tiempo.

Dos cosas amortiguaron el golpe:

- **El orden de las operaciones.** El script despublica lo prohibido
  *antes* de publicar lo permitido, precisamente para que un corte a media
  corrida nunca deje un arma expuesta. Se verificó tras la caída: 0
  productos prohibidos publicados. La propiedad de seguridad aguantó.
- **El script era idempotente**, así que restaurar fue correrlo otra vez
  sin banderas: publicó los 159 faltantes, 0 errores.

Se agregó manejo de `URLError`/`OSError` con backoff antes de reintentar.
La segunda corrida completa terminó limpia: 324 despublicados, 324
publicados, 0 errores.

### Estado final verificado

| | |
|---|---|
| Productos en Shopify | 383 |
| Publicados al canal Meta | 324 |
| Excluidos (armas/municiones/miras) | 59 |
| Productos en el catálogo de Meta | **324** |
| Categorías prohibidas en el catálogo | **0** |
| Productos sin categoría | **0** |

### Una decisión de diseño que se revirtió

El plan original incluía una segunda red de seguridad del lado de Meta: un
"conjunto de productos" filtrado por una **lista blanca de categorías**
(taxonomía de Google), para que aunque algo se colara al catálogo, la
campaña no lo tocara. Se diseñó mirando el catálogo viejo, donde los 56
productos caían en 6 categorías limpias.

Con el catálogo real a la vista, ese diseño resultó **peor que no tener
nada**: los 324 productos se reparten en más de 12 categorías, y una lista
blanca dejaría fuera —en silencio— cualquier producto legítimo que llegue
con una categoría nueva. El cliente había pedido explícitamente que *"todos
los productos que sí se puedan anunciar se anuncien"*, y esto hacía justo
lo contrario. La variante inversa (lista negra) tampoco sirve: no cubre
productos con categoría vacía o inesperada.

Se descartó. La compuerta queda en un solo lugar —la publicación al canal
en Shopify, por pertenencia a colección— que es más confiable porque no
depende de un campo que Shopify puede dejar vacío, y porque se validó
contra la realidad: la regla del script marca exactamente los mismos 59
productos que estaban excluidos a mano.

### Mantenimiento

📄 **[`INSTRUCTIVO-CATALOGO-META.md`](./INSTRUCTIVO-CATALOGO-META.md)** —
el comando de mantenimiento, cuándo hace falta `--forzar-resync`, cómo
verificar ambas puntas, y qué no hay que hacer nunca (empezando por el
botón "Publicar productos" de la app, que preselecciona *todos* los
productos incluidos los prohibidos — así fue como se publicaron armas al
canal por accidente en febrero).

**El catálogo viejo se borró** (`1230530145855635`), el mismo 15 de
agosto y a petición del cliente, después de verificar por API que la
cuenta publicitaria no tenía ninguna campaña ni conjunto de anuncios que
dependiera de él. Queda un solo catálogo en el negocio, así que ya no
existe la posibilidad de apuntar una campaña por error a los 56
huérfanos —varios de ellos armas— que contenía.


---

## 33. La primera campaña de Meta Ads

Creada el **15 de agosto de 2026**, después de resolver los tres
obstáculos de las secciones 29 y 32. Nació en pausa y el cliente la
activó ese mismo día tras revisarla. Los primeros resultados están en la
**sección 35**.

### Configuración final

| | |
|---|---|
| Campaña | `IMX \| Ventas \| Pesca y Óptica \| Catálogo dinámico \| Ago26` |
| ID | `120249613902440175` |
| Objetivo | `OUTCOME_SALES`, optimizado a `OFFSITE_CONVERSIONS` / `PURCHASE` |
| Presupuesto | **$100 MXN/día** (a nivel conjunto de anuncios) |
| Catálogo | `1746844133017649` — conjunto "All Products", 324 productos, 0 prohibidos |
| Pixel | `2011984246408291` |
| Público | México, 18-65 |
| Colocaciones | Facebook + Instagram |
| Estado | **`ACTIVE`** — activada el 15 de agosto de 2026 tras revisión del cliente |

### El presupuesto: una corrección importante

Durante días se trabajó con la cifra de **$600 MXN/día**, anotada así en
`PENDIENTES.md` y en la sección 29. Al momento de crear la campaña el
cliente aclaró que su presupuesto real era **$700 MXN por semana** — es
decir, **$100 MXN/día**. La cifra que se traía era **seis veces mayor**
que la real ($4,200/semana contra $700).

Vale la pena registrarlo porque el error sobrevivió varias sesiones sin
que nadie lo detectara: quedó escrito una vez, se citó de vuelta en cada
resumen posterior, y así se fue confirmando solo. Una cifra que va a
gastar dinero real conviene reconfirmarla justo antes de ejecutar, no
darla por buena porque ya está en el documento.

**Sobre la expectativa de rendimiento**, se le dijo al cliente sin
adornos: $100 MXN/día (~$5 USD) optimizando a compra es un presupuesto de
prueba. Meta necesita del orden de 50 conversiones semanales para salir
de la fase de aprendizaje; con este monto es previsible ver 1-3 ventas
por semana. Sirve para validar que el embudo funciona de punta a punta,
no para esperar rendimiento optimizado desde el arranque.

### Dos trampas de la API que costaron el intento

**1. `instagram_actor_id` está deprecado.** Devolvía
`"must be a valid Instagram account id"` con *cualquier* valor: con el ID
de la cuenta real (`17841434418853671`) y también con el de la cuenta
"page-backed" que Meta autogenera (`17841444307092124`). Se resolvió
probando ambos campos contra la API real: el vigente es
**`instagram_user_id`**, y funciona con el ID de la cuenta real.

**2. Estar en el portafolio del negocio ≠ estar vinculado a la página.**
Son dos relaciones distintas, y para anuncios hace falta la segunda. La
cuenta llevaba desde el 14 de agosto en el portafolio, pero la página no
la tenía conectada. Se detecta así — y hay que usar un **token de
página**, el del System User no puede leer ese campo:

```bash
GET /{page_id}?fields=instagram_business_account
```

**3. La app tenía que estar en modo Público.** La sección 29 daba por
bueno que el modo Desarrollo bastaba "para que un administrador use esos
permisos sobre sus propios activos". Es cierto para leer y gestionar,
pero **no para crear creativos de anuncios** — ahí Meta responde
`"La publicación del laboratorio de contenidos se ha realizado con una
aplicación que se encuentra en modo de desarrollo"`. Pasarla a Público
requirió tres campos: URL de política de privacidad (se usó la del
sitio), categoría ("Empresa y páginas") e ícono de 1024×1024 (se tomó el
logo de la tienda, que ya existía en esa medida exacta en los archivos de
Shopify, y se le aplicó fondo sólido porque el original era transparente
y eso renderiza mal como ícono).

### La activación: un fallo silencioso que se atrapó a tiempo

La campaña se creó en pausa y se activó el mismo día, ya con el visto
bueno del cliente. Al ir a hacerlo apareció un bug en el propio script
que vale la pena registrar porque **no habría dado ningún error**.

`meta-ads.py activar --campania <id>` ponía en `ACTIVE` **únicamente la
campaña**, dejando el conjunto de anuncios y el anuncio en `PAUSED`. En
Meta los tres niveles tienen que estar activos para que haya entrega: con
cualquiera de ellos pausado no se muestra ni una impresión. El comando
habría impreso *"Campaña activada"*, todo se habría visto correcto, y la
campaña no habría entregado nada — el tipo de fallo que se descubre días
después preguntándose por qué no pasa nada y por qué el gasto sigue en
cero.

Se detectó al verificar el estado de los tres niveles por API antes de
activar, en vez de confiar en la salida del comando.

**La corrección:** `activar` ahora recorre los hijos de la campaña y los
enciende **de adentro hacia afuera** (anuncios → conjuntos → campaña).
Ese orden es deliberado: si el proceso se corta a la mitad, nunca queda
una campaña activa con hijos a medio encender. Salta lo que ya esté
activo, así que es idempotente.

`pausar` se dejó como estaba, y quedó documentado por qué no necesita el
mismo tratamiento: **pausar la campaña basta** para detener toda la
entrega y todo el gasto de lo que cuelga de ella.

### El anuncio en `IN_PROCESS`

Tanto al crear el anuncio como al activarlo, su `effective_status` pasa
por `IN_PROCESS`. Es la revisión automática de Meta sobre el creativo, no
un error: se resuelve solo en minutos y pasa a `ACTIVE`. Si Meta lo
rechazara, avisa por correo y el estado cambiaría a `DISAPPROVED` con el
motivo. No hay que hacer nada mientras esté en `IN_PROCESS`.

### El creativo: v1 → v2 el mismo día

El anuncio nació con este texto:

> Equipo verificado para pesca y óptica. Envío a todo México en 2 a 7 días
> hábiles.

Correcto pero plano. El cliente preguntó si convenía mejorarlo y de paso
si valía la pena **separar la campaña en pesca y óptica**. Se le dio una
respuesta razonada, no complaciente:

**Sobre separar: no, todavía no.** Con $100 MXN/día partir el
presupuesto en dos conjuntos de $50 daría **dos campañas que nunca salen
de la fase de aprendizaje** en vez de una que aprende despacio — Meta
pide del orden de 50 conversiones semanales *por conjunto*. Además ambos
competirían entre sí en la subasta por la misma audiencia mexicana,
encareciendo el propio inventario. Y el desbalance del catálogo lo agrava:
**252 de los 324 productos son de pesca** contra ~19 de óptica; un
conjunto de óptica con 19 productos y $50/día tiene muy poco con qué
trabajar. Separar tiene sentido cuando suba el presupuesto o cuando haya
2-3 semanas de datos que muestren comportamientos distintos por categoría.

**Sobre el texto: sí, pero sabiendo cuánto pesa.** En anuncios de
catálogo dinámico el texto es el párrafo superior; lo que vende es la
tarjeta del producto (foto, nombre, precio), que Meta arma
individualmente para cada usuario según su comportamiento y el pixel.
Mejorar el copy ayuda en el margen, no es la palanca principal. Se le
dijo así antes de cambiarlo.

Se ofrecieron tres versiones (dolor+prueba, marca+autoridad,
directo+oferta) y el cliente eligió la primera:

> 🎣 El pez de tu vida no se escapó por mala suerte.
>
> Cañas, carretes y señuelos probados en agua real — no en catálogo.
>
> ⚡ ENVÍO GRATIS desde $799 · Entrega en 2-7 días a todo México

Qué cambió y por qué:

- Abre con una **frustración concreta** del pescador en vez de una
  descripción de catálogo
- *"probados en agua real — no en catálogo"* aterriza el "equipo
  verificado" de la marca, que era abstracto
- **El envío gratis desde $799 pasa al frente**, en mayúsculas: es el
  gancho más fuerte del negocio y en la v1 estaba enterrado al final
- Emojis al inicio de línea, que suben el CTR en feed móvil

**Trade-off aceptado y anotado:** el texto le habla al pescador, no al
comprador de binoculares. Es deliberado — con el 78% del catálogo en
pesca, hablarle a ese cliente rinde más que un texto neutro que no le
hable a nadie. Es exactamente el escenario donde separar campañas sí
valdría la pena, el día que el presupuesto lo permita.

El creativo nuevo (`1514670357100398`) reemplazó al anterior en el
anuncio en vivo. El texto por defecto de `meta-ads.py crear-campania`
también se actualizó, para que las campañas futuras nazcan con la v2.

> ⚠️ Cambiar el creativo de un anuncio activo **reinicia parte de la fase
> de aprendizaje**. Se hizo el mismo día del lanzamiento, con la campaña
> aún sin datos, así que el costo fue nulo. Hacerlo con una campaña
> madura sí tiene precio.

### Recomendación operativa que se le dio al cliente

- **No tocar la campaña en 48-72 horas.** Editar presupuesto o
  segmentación reinicia la fase de aprendizaje de Meta.
- Revisar al día siguiente que el anuncio haya salido de `IN_PROCESS`.
- Primer reporte real a los 7 días: `meta-ads.py reporte --dias 7`.

### Operación

```bash
export META_ACCESS_TOKEN="..."
export META_AD_ACCOUNT_ID="act_1264279685553718"

python3 scripts/meta-ads.py activar --campania 120249613902440175
python3 scripts/meta-ads.py reporte --dias 7
python3 scripts/meta-ads.py presupuesto --campania <id> --monto 100
```

Convenciones de nombres, reglas de presupuesto y el resto de la operación
día a día están en
📄 **[`INSTRUCTIVO-FACEBOOK-ADS.md`](./INSTRUCTIVO-FACEBOOK-ADS.md)**.

---

## 34. Dónde viven las credenciales (y por qué nunca en el repo)

> 📘 **Procedimiento operativo completo:**
> [`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md)
> — diagnóstico paso a paso, lista vigente de scopes, flujo OAuth y
> errores comunes. Esta sección explica **la política** (por qué las
> credenciales no van en el repo); ese documento explica **qué hacer**
> cuando falta un token. Si un comando falla por credencial ausente,
> empieza por el diagnóstico de ahí antes de pedirle nada al dueño.

El 18 de agosto de 2026 el cliente preguntó, de forma razonable, si el
token de Meta no podía guardarse en un archivo `.md` del repositorio
para que Claude lo tomara cuando lo necesitara. La respuesta fue no, y
conviene dejar escrito el porqué junto con la alternativa que sí
resuelve el problema — porque la pregunta va a volver a surgir con la
siguiente credencial.

### Por qué un token en el repo no funciona

No es una objeción de estilo. Son tres problemas concretos, del más
práctico al más grave:

1. **GitHub lo detecta y el proveedor lo revoca.** El escaneo de
   secretos de GitHub avisa al proveedor cuando encuentra una credencial
   conocida, y los tokens de Meta están entre los tipos reconocidos. El
   token dejaría de servir en horas: la solución sería autodestructiva.
2. **En git nada se borra.** Un token subido y luego eliminado sigue en
   el historial para siempre. Revertirlo de verdad exige reescribir la
   historia del repo o rotar la credencial.
3. **Ese token gasta dinero real.** Lleva `ads_management` y
   `business_management`: quien lo tenga puede crear campañas contra la
   tarjeta del dueño y modificar el portafolio de negocio. No es una
   credencial de solo lectura.

### Por qué un secret de GitHub tampoco da acceso a Claude

Distinción que costó explicar y vale la pena fijar: **un secret de
GitHub no es legible desde una sesión de Claude.** Los secrets solo se
descifran dentro de un workflow corriendo en los servidores de GitHub.
Se verificó en vivo: `SHOPIFY_ADMIN_TOKEN` lleva meses guardado como
secret y usado por `deploy-shopify.yml`, y aun así **no aparece en el
entorno de una sesión interactiva**.

Los secrets sirven para automatizar (workflows), no para dar acceso a
Claude.

### Dónde van entonces

**Variables de entorno del entorno de Claude Code**, configuradas por el
dueño desde claude.ai/code → configuración del entorno del proyecto.
Esas sí se cargan en cada sesión nueva, sin pasar por el chat y sin
tocar el repositorio.

Configuradas el 18 de agosto de 2026:

| Variable | Para qué |
|---|---|
| `META_ACCESS_TOKEN` | Marketing API de Meta (`scripts/meta-ads.py`) |
| `META_AD_ACCOUNT_ID` | `act_1264279685553718` |
| `SHOPIFY_ADMIN_TOKEN` | Admin API de Shopify (deploy, inventario, canal Meta) |

> ⚠️ Las variables se cargan **al iniciar una sesión**. Agregarlas no las
> hace aparecer en la sesión que ya está corriendo — hay que abrir una
> nueva. No es un fallo, es cuándo se lee la configuración.

### El token de Meta no se puede volver a ver

Meta muestra un token de System User **una sola vez**, en el momento de
generarlo. No existe pantalla para consultarlo después. Si se perdió, no
se busca: **se genera uno nuevo** (Configuración del negocio → Usuarios
del sistema → `Claude Integration` → Generar nuevo token), con los
permisos `ads_management`, `ads_read`, `business_management`,
`catalog_management` y caducidad **Nunca**.

Generar uno nuevo puede invalidar el anterior de esa misma app. Como el
único consumidor es Claude, no rompe nada — pero hay que actualizar la
variable de entorno, o la siguiente sesión arranca con un token muerto.

### Regla permanente

`.gitignore` bloquea `.env`, `*token*.txt`, `*token*.json` y
`shopify-token*` justamente para que un descuido no llegue a un commit.
Cuando haga falta un token dentro de una sesión y no esté en el entorno,
se pide por chat y se usa en memoria o en el scratchpad
(fuera del repositorio), nunca dentro del árbol de trabajo.

---

## 35. Los primeros días de la campaña: leer datos chicos sin engañarse

La campaña de la sección 33 arrancó el 15 de agosto de 2026. Esta
sección registra los primeros cuatro días, pero sobre todo **los tres
errores de lectura** que aparecieron en el camino — que es lo que va a
volver a pasar con la siguiente campaña.

### Los números (corte: 18 de agosto, 12:52 CST, día en curso)

| Día | Gasto | Impres. | Clics | CTR | CPC | Frecuencia |
|---|---|---|---|---|---|---|
| 15 ago | $18.35 | 536 | 19 | 3.54% | $0.97 | 1.26 |
| 16 ago | $95.83 | 1,392 | 52 | 3.74% | $1.84 | 1.60 |
| 17 ago | $75.87 | 1,119 | 38 | 3.40% | $2.00 | 1.38 |
| 18 ago* | $40.61 | 615 | 28 | 4.55% | $1.45 | 1.19 |
| **Total** | **$230.66** | 3,662 | 137 | 3.74% | $1.68 | — |

Embudo acumulado: 137 clics → 73 clics de enlace → 52 vistas de página →
57 `ViewContent` → **1 carrito real** → **0 compras**.

Gasto contra presupuesto: $230.66 de $700 semanales. Dentro de lo
previsto.

### Error de lectura 1 — el preset que esconde el día de hoy

El 17 de agosto se reportó *"hoy no hay impresiones"*. Era falso: la
campaña llevaba horas entregando. La causa es que
`date_preset=last_7d` de la API de Meta **excluye el día en curso**.

Se corrigió en el código, no solo en la costumbre: `cmd_reporte` ahora
usa **siempre `time_range` explícito**, y calcula las fechas en
`America/Chihuahua` — porque la cuenta corta los días en esa zona y
`date.today()` corre en UTC, así que entre las 18:00 y la medianoche
locales el contenedor ya cree que es el día siguiente y pide un rango
que todavía no existe. Dos bugs distintos en la misma línea.

### Error de lectura 2 — el divisor equivocado

Se reportó una tasa de "clic → página cargada" del **39%**, con tono de
alarma. Estaba mal calculada: usaba `clicks` (137) como divisor, que
incluye reacciones, comentarios y clics en el nombre de la página.

El divisor correcto es `inline_link_clicks` — la gente que efectivamente
pulsó el enlace. Con ese: **52 de 73 = 71%**, una cifra sana para
tráfico móvil.

La lección es sobre el reflejo, no sobre la fórmula: se buscó un
culpable técnico (velocidad del sitio, checkout roto) antes de revisar
si la métrica que disparó la alarma estaba bien construida.

### Error de lectura 3 — la conversión que era del propio dueño

El 17 de agosto aparece **1 `AddPaymentInfo` por $738** sin compra
posterior. No es un cliente: es la prueba de checkout que el dueño hizo
desde su iPhone ese mismo día. El pixel registra las pruebas del dueño
igual que las de cualquier visitante.

Se identificó porque estaba anotado que la prueba se había hecho. **Al
probar el checkout en una tienda con campaña activa, hay que anotar el
día y el monto**, o esos eventos se cuentan después como señal real.

### El riesgo estructural: optimizar a un evento que no ocurre

Este es el hallazgo que importa de verdad, y no se ve en el gasto ni en
el CTR.

El conjunto optimiza a `OFFSITE_CONVERSIONS` / `PURCHASE`. Meta necesita
del orden de **50 conversiones semanales por conjunto** para salir de la
fase de aprendizaje. Con **0 compras en 4 días**, el algoritmo no está
recibiendo ninguna señal de la que aprender: no es que aprenda despacio,
es que no aprende.

No es un fallo de configuración — es el arranque normal de una tienda
sin historial. Pero tiene una salida conocida: **bajar temporalmente el
evento de optimización** a `ADD_TO_CART` o `VIEW_CONTENT`, que sí
ocurren con volumen suficiente, dejar que el algoritmo aprenda a quién
mostrar el anuncio, y subir a `PURCHASE` cuando haya historial.

Queda como la decisión a tomar el **jueves 21 de agosto (día 7)**, con
~250 clics acumulados. Antes no: cambiar el objetivo **reinicia la fase
de aprendizaje desde cero**, así que hacerlo dos veces en una semana
cuesta más de lo que resuelve.

### Lo que se descartó y no hay que volver a proponer

Verificado el 17 de agosto, para no repetir el diagnóstico:

- **El checkout funciona.** Probado de punta a punta por el dueño desde
  iPhone.
- **El sitio es rápido.** 0.86–0.92s en caliente para la ficha de
  producto. (La primera medición dio 4.4s: era la latencia del proxy de
  este entorno, no del sitio. Medir siempre en caliente y más de una vez.)
- **La entrega está sana.** Campaña, conjunto y anuncio en `ACTIVE`, sin
  advertencias, y la frecuencia entre 1.19 y 1.60 — muy lejos del ~3 que
  indicaría saturación de audiencia.

### La regla de fondo

Con 137 clics, a una tasa de conversión típica de 1-2%, lo *esperado*
son **1 a 3 compras**. Cero está dentro del rango de lo normal por pura
variación estadística. Ninguna decisión sobre esta campaña debe tomarse
con esta cantidad de datos, y revisar los números a diario sobre una
muestra así solo produce ansiedad y cambios prematuros que reinician el
aprendizaje.

**El punto de decisión es el día 7.** Hasta entonces, los movimientos
diarios son ruido.

---

## 36. Herramientas de terceros instaladas: plugins y agentes

El 18 de agosto de 2026 se instalaron dos paquetes de terceros que
amplían lo que Claude puede hacer en este proyecto. Se documentan aquí
porque no son parte de la tienda pero sí cambian cómo se trabaja sobre
ella — y porque tienen implicaciones de seguridad que conviene tener
escritas.

El detalle completo vive en
📄 **[`SKILLS-USADAS.md`](./SKILLS-USADAS.md)** y en
📄 **[`INVENTARIO-AGENTES.md`](./INVENTARIO-AGENTES.md)**.

### Qué se instaló

| | `the-architect` | The Agency (`agency-agents`) |
|---|---|---|
| Qué es | **Plugin** de Claude Code | **Colección de agentes** en Markdown |
| Origen | [`Hainrixz/the-architect`](https://github.com/Hainrixz/the-architect) | [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) |
| Licencia | MIT | MIT |
| Cómo se instala | `claude plugin marketplace add` + `claude plugin install` | `./scripts/install.sh --tool claude-code` |
| Qué aporta | 6 comandos `/architect*` + 3 subagentes | 270 agentes en 17 divisiones |
| Dónde queda | `~/.claude/plugins/` | `/root/.claude/agents/` |

**`the-architect`** entrevista sobre lo que se quiere construir y emite
un *blueprint* autocontenido que otra sesión puede ejecutar sin volver a
preguntar. Aplica a lo que todavía no existe y es de tamaño considerable
— por ejemplo un panel propio de métricas de tienda y campañas, o
automatizar la conciliación de inventario contra el POS. No aplica al
trabajo incremental que ha sido la norma hasta ahora.

**The Agency** son personalidades especializadas. La división que
importa aquí es `paid-media` (7 agentes), que cae exactamente sobre el
terreno de las secciones 33 y 35.

### Dos lecciones del proceso de instalación

**1. No todo lo que se instala en Claude Code es un plugin.** Los dos
paquetes se pidieron con la misma frase ("instala esto"), pero
`agency-agents` **no tiene** `.claude-plugin/marketplace.json`:
`claude plugin install` no habría funcionado. La forma de instalarlo
solo se supo abriendo el repositorio.

**2. Leer la página del repositorio no es verificarlo.** La primera
lectura de `agency-agents` reportó 146,000 estrellas — una cifra que no
cuadraba con un proyecto de ese tipo. En vez de darla por buena se clonó
el repositorio y se inspeccionó directamente. Bien que se hizo: fue así
como se descubrió que no era un marketplace, que es justo lo que
determinaba cómo instalarlo.

### Las advertencias que aplican

> ⚠️ **Un plugin o un agente es código de terceros que corre con los
> mismos permisos que Claude.** Este repositorio está conectado a una
> tienda con ventas reales y a una cuenta publicitaria que gasta dinero.
> Antes de instalar cualquier otro paquete: revisar qué hace, quién lo
> mantiene y qué ejecuta. Los dos de aquí se revisaron antes de correrse
> (`install.sh` solo copia archivos; los blueprints de `the-architect`
> traen comandos de bash pensados para ejecutarse solos).

> ⚠️ **Consejo genérico contra hallazgo verificado: gana lo verificado.**
> Estos agentes traen buenas prácticas de manual. Este repositorio tiene
> hechos comprobados de *esta* tienda — que Meta prohíbe anunciar armas
> de aire (sección 29), que el presupuesto real son $700/semana (sección
> 33), que el catálogo estuvo muerto medio año (sección 32). Cuando se
> contradigan, manda lo que está documentado aquí.

> ⚠️ **Todo vive en el contenedor, no en el repositorio.** Tanto
> `~/.claude/plugins/` como `/root/.claude/agents/` están en el entorno
> remoto, que es efímero. Si en una sesión futura no aparecen, hay que
> reinstalar — los comandos exactos están en `SKILLS-USADAS.md`. Es lo
> mismo que pasa con las credenciales (sección 34), por la misma razón.

### Lo que Graphify no cubre

Conviene tenerlo escrito, porque es fácil suponer que el grafo cubre más
de lo que cubre. Se verificó leyendo su propio manifiesto el 18 de agosto
de 2026:

| | ¿En el grafo? |
|---|---|
| `.js` de `tema-shopify/assets/` | ✅ Sí (37 archivos) |
| `.json` de configuración y plantillas | ✅ Sí (72) |
| `.svg` e imágenes | ✅ Sí (90) |
| `.py` de `scripts/` | ✅ Sí (grafo aparte) |
| **`.liquid` — secciones y snippets** | ❌ **No. Ninguno.** |
| `.md` de la raíz (manual, instructivos) | ❌ No |
| Plugins y agentes instalados | ❌ No (viven fuera del repo) |

**Graphify no tiene analizador de Liquid.** Su manifiesto del tema lista
199 archivos y **cero** `.liquid`. Eso significa que las secciones y
snippets —donde vive la mayor parte de la lógica del tema— **no están
representados**: ni `main-product.liquid`, ni `brand-experience.liquid`,
ni el `whatsapp-button.liquid` de la sección 39.

Si algún archivo `.liquid` aparece mencionado en el grafo (por ejemplo
`cart-drawer`), es porque un `.js` o un `.json` lo nombra — no porque el
archivo se haya analizado.

**Consecuencia práctica:** para "qué toca qué" en JavaScript y en los
scripts de Python, el grafo sirve. Para rastrear una dependencia entre
plantillas Liquid hay que usar `grep`. Y una pregunta como *"¿quién
invoca este snippet?"* el grafo **no la puede responder** — que es
exactamente el tipo de pregunta cuya respuesta faltante causó el incidente
del deploy incremental (sección 39).

---

## 37. Los 6 accesorios de arma que se colaron al catálogo

**18 de agosto de 2026.** Escaneando el catálogo de Meta aparecieron seis
productos que violan la política de armas de Meta, en un catálogo que
esta misma documentación declaraba **"324 productos, 0 prohibidos"**:

| Producto | Precio |
|---|---|
| Montura Universal Konus 11/22mm | $1,090 |
| Monturas p/Mira 11mm Alta Nakashi | $480 |
| Monturas p/Mira 22mm Alta Nakashi | $390 |
| Monturas Bajas Mendoza 11mm | $390 |
| Monturas Picatinny Bajas Mendoza 21mm | $390 |
| Linterna Táctica Konus (riel Picatinny/Weaver) | $3,180 |

**Tres de ellos ya se habían mostrado en anuncios** — 4 impresiones,
$0.22 de gasto. Poco, pero se sirvieron: la exposición fue real, no
hipotética.

### Por qué falló la verificación anterior

La sección 32 verificó el catálogo de dos formas: por **colección**
(excluyendo "Rifles y Pistolas de Aire", "Diábolos y Municiones",
"Miras Telescópicas") y por **palabras clave**. Ambas pasaron, y con eso
se dio el catálogo por limpio.

El error es de categoría, y es instructivo: **una montura no es un rifle,
ni una mira, ni una munición. Es la pieza que une la mira al rifle.** No
vivía en ninguna colección prohibida porque, en la taxonomía de la
tienda, es un accesorio de óptica. Y "montura" no estaba en la lista de
palabras clave porque nadie la pensó como arma.

Meta sí la piensa así. Su política prohíbe los *"accesorios que
modifiquen o mejoren la función de un arma"*, y una montura es
literalmente eso.

**La lección no es "faltó una palabra en la lista".** Es que una
verificación por lista cerrada solo encuentra lo que ya sabías buscar, y
declararla exhaustiva ("0 prohibidos") le dio a esa lista una autoridad
que no tenía. Cuando el costo del falso negativo es la cuenta completa,
la red tiene que ser deliberadamente más amplia que el riesgo conocido.

### La corrección

`scripts/sincronizar-canal-meta.py` ahora aplica **dos redes**:

1. La de colecciones, que ya existía.
2. Una nueva por **nombre y descripción** (`RE_ACCESORIO_ARMA`), que cubre
   monturas, rieles, Picatinny/Weaver, bípodes, silenciadores, culatas,
   gatillos, cargadores, diábolos, balines, municiones, postas, y las
   palabras rifle/carabina/pistola/PCP/CO2.

La descripción se revisa porque la linterna táctica **no dice nada
sospechoso en su nombre**: el riel Picatinny aparece solo en el texto.
Se leen los primeros 400 caracteres; más abajo suelen venir textos de
marca que disparan falsos positivos.

Hay una lista de **excepciones comprobadas** (`RE_EXCEPCIONES`) para los
falsos positivos reales: las cañas "Tele Surf" son telescópicas de pesca,
y "calibre" en una descripción de pesca es el grosor del hilo.

> **Regla de sesgo, escrita a propósito:** el filtro prefiere dejar fuera
> un producto legítimo a colar uno prohibido. Lo primero cuesta unas
> ventas; lo segundo cuesta la cuenta publicitaria y el Business Manager,
> de forma permanente. Si un producto legítimo cae en el filtro, se
> agrega a `RE_EXCEPCIONES` — **nunca se afloja el patrón**.

El filtro se probó contra los 6 casos reales más 6 productos legítimos
que debían pasar. Los 12 dieron el resultado esperado.

### Mitigación inmediata

No se pudo despublicar desde Shopify (no había token en la sesión), así
que la exposición se cortó por el lado de Meta: se creó un **conjunto de
productos** que los excluye por `retailer_id` y se apuntó la campaña ahí
(sección 38).

---

## 38. La reconstrucción de la campaña: por qué no vendía

Al cuarto día la campaña llevaba $234 gastados, CTR de 3.67% —por encima
del promedio mexicano— y **cero compras**. El diagnóstico encontró tres
causas, y ninguna era el anuncio.

### Causa 1 — El anuncio prometía algo que sus productos no cumplían

Cruzando el precio de cada producto que recibió gasto contra el umbral de
envío gratis:

| | Gasto | % |
|---|---|---|
| Productos **debajo de $799** (pagan $189 de envío) | $220.23 | **94%** |
| Productos de $799 o más (envío gratis) | $14.03 | 6% |

**Precio mediano del producto anunciado: $147.**

El recorrido real del cliente era: ve *"⚡ ENVÍO GRATIS desde $799"*, hace
clic en un señuelo de $147, y en el checkout el envío cuesta **$189 —
más que el producto**. Se va.

Es un efecto secundario del catálogo dinámico: Meta optimiza a clics, los
productos baratos generan más clics por peso, y sin restricción el
algoritmo deriva a lo barato. **$101.93 de $234 (43%) se fueron a un solo
señuelo de $310.**

El síntoma medible: **solo 1 de cada 52 visitantes agregaba al carrito
(1.9%)**, contra un rango sano de 5-10%.

### Causa 2 — Optimizar a compra era imposible, no lento

Meta necesita ~50 conversiones semanales del evento optimizado para salir
de fase de aprendizaje. A un CPA optimista de $250 MXN:

> 50 × $250 = **$12,500/semana = $1,785/día = 18 veces el presupuesto.**

No es que la campaña "todavía no aprendiera": con $100 MXN/día
optimizando a `PURCHASE` **nunca** iba a aprender. Se le pedía al
algoritmo encontrar un evento que jamás había visto ocurrir.

`ViewContent` sí tiene volumen: ~100 por semana, el doble del umbral.

> El reinicio de la fase de aprendizaje que provoca cambiar el evento
> **costó cero**, precisamente porque la campaña nunca había aprendido
> nada. Ese es el único momento en que conviene hacer todos los cambios
> grandes de una vez — más adelante cada uno tiene precio.

### Causa 3 — La atribución escondía clientes reales

El conjunto tenía `attribution_spec` de **solo clic de 7 días**, sin
ventana de visualización, porque `meta-ads.py` no lo mandaba explícito y
Meta lo resolvió así. Al pedir los datos con las dos ventanas apareció
lo que no se veía:

| | Por clic | Por visualización |
|---|---|---|
| Carritos | 1 ($310) | **2 ($9,127)** |
| Checkout iniciado | — | **1 ($9,127)** |

**Había una persona real con un carrito de $9,127 que llegó a la pantalla
de pago.** Doce veces el ticket promedio, invisible en todos los reportes.

Peor que el reporte: **el algoritmo tampoco usaba esas conversiones para
optimizar**.

### La reconstrucción

Se creó un conjunto de anuncios nuevo (el viejo quedó en pausa, no
borrado) con todo corregido de una sola vez:

| | Antes | Ahora |
|---|---|---|
| Evento optimizado | `PURCHASE` | **`CONTENT_VIEW`** |
| Conjunto de productos | 324 ("All Products") | **72** (≥$300, en stock, sin armas) |
| Precio medio anunciado | $147 | **$747** |
| Edad | 18-65 | **35-65** |
| Colocaciones | Automáticas | **Solo feeds** (FB feed, Marketplace, IG feed) |
| Dispositivo | Todos | **Solo móvil** |
| Atribución | Clic 7d | **Clic 7d + visualización 1d** |

**El umbral de $300 no es arbitrario:** es el corte donde el precio medio
del conjunto toca los $747, es decir el umbral de envío gratis. Con un
accesorio añadido, el carrito ya califica. Se probaron otros cortes —
≥$700 dejaba solo 24 productos en stock, muy poco para catálogo dinámico.

El copy también cambió: *"ENVÍO GRATIS desde $799"* → **"ENVÍO GRATIS en
este pedido"**, que ahora sí es cierto para la mayoría de lo que se
muestra.

### Las cifras que justificaron cada recorte

**Por colocación (4 días):**

| Colocación | Gasto | Vistas de página | Costo/vista |
|---|---|---|---|
| Facebook feed | $121.85 | 32 | **$3.81** |
| Instagram feed | $43.32 | 11 | $3.94 |
| Instagram stories | $33.36 | 3 | $11.12 |
| Facebook Reels | $17.84 | 3 | $5.95 |
| Instagram Reels | $8.92 | **0** | ∞ |

Reels y Stories: **$42 de $234 (18%) para 3 de 52 vistas (6%)**. La causa
es mecánica: el catálogo dinámico genera tarjetas cuadradas sobre fondo
blanco, que en formato vertical se recortan y compiten contra video
nativo.

**Por edad:** 55-64 dio CTR de **6.49%** contra 2.26% de 25-34, y la
vista de página más barata de la cuenta ($3.01). **Escritorio: $8.19
gastados, cero vistas de página.**

### Sobre WhatsApp como campaña: los números dicen que no

Se evaluó lanzar una campaña de mensajes (Click-to-WhatsApp), atractiva
en México por el uso del canal. El cálculo con el costo que casi nadie
incluye —el tiempo humano—:

- Costo por conversación iniciada: ~$15 MXN
- $700/semana ÷ $15 = ~47 conversaciones = **7 al día**
- Vender una caña son 8-10 min de conversación real → **70 min/día**
- A $150/hora de tiempo propio: **costo real por conversación $39**, no $15
- A 15% de cierre: **CPA real $262** contra un margen de $150-200

**Se pierde dinero en cada venta.** Se vuelve rentable con ticket ≥$1,200
(carretes, combos, binoculares) o con cierre ≥25%, no con señuelos.

Lo que sí se hizo, y cuesta $0, es el **botón de WhatsApp en el sitio**
(sección 39): captura la demanda que ya se está pagando, en vez de
comprar demanda nueva.

### Un error propio: el sobregasto del 18 de agosto

Al aplicar los cambios se **activó el conjunto nuevo antes de pausar el
viejo**. Durante unas horas corrieron los dos, cada uno con su propio
presupuesto diario, y el nuevo además arrancó acelerado como hace Meta
con un conjunto recién creado:

> 18 de agosto: **$224.57** contra un presupuesto de $100/día.
> (Conjunto viejo $48.87 + conjunto nuevo $175.70.)

**El orden correcto es pausar primero y activar después.** Es el reflejo
opuesto al de la sección 33 (activar de adentro hacia afuera), y por eso
se confundió: al *encender* una campaña se va de adentro hacia afuera,
pero al *sustituir* un conjunto por otro se apaga el viejo primero.

---

## 39. Botón de WhatsApp y la trampa del deploy incremental

### El botón

`tema-shopify/snippets/whatsapp-button.liquid`, invocado desde
`layout/theme.liquid` al final del `<body>`.

**Va abajo a la izquierda a propósito:** Cartucho (Zipchat) se monta
abajo a la derecha y dos burbujas encimadas no se pueden tocar en móvil.

En la ficha de producto el mensaje se rellena con el **nombre y el enlace
del producto**, para que la conversación no arranque con "¿de cuál me
hablas?". En móvil se muestra solo el ícono. Usa
`env(safe-area-inset-bottom)` para no quedar bajo la barra de gestos del
iPhone.

Número, textos y visibilidad son editables desde **Personalizar tema →
WhatsApp**, sin tocar código.

**Por qué existe:** el mejor público de la campaña resultó ser hombres de
35-65 años, que rara vez le dan su tarjeta a una tienda desconocida sin
preguntar antes. Y hubo un carrito de $9,127 que se cayó en la pantalla
de pago sin que nadie pudiera hablar con esa persona.

### Error 1 — Liquid partido en varias líneas

El deploy falló con `Unknown tag '| replace: ...'`. **Dentro de un bloque
`{% liquid %}` cada salto de línea CIERRA la etiqueta**, así que una
cadena de filtros repartida en varias líneas se lee como etiquetas
sueltas inválidas. Va en una sola línea, o partida en varios `assign`.

### Error 2 — La trampa del deploy incremental

Tras corregir lo anterior, **todo el sitio empezó a mostrar**:

```
Liquid error (layout/theme line 35):
Could not find asset snippets/meta-pixel.liquid
```

La causa: `scripts/deploy-shopify.py` sube **solo los archivos que
cambiaron** desde el commit anterior. `meta-pixel.liquid` se creó hace
meses y desde entonces no se tocó, así que **nunca entró en un push que
lo incluyera** — existía en el repo y no en la tienda. Mientras
`theme.liquid` tampoco se subiera, nadie lo notaba. Al subirlo por el
botón de WhatsApp, llegó con la llamada a un snippet inexistente.

> **La regla que sale de aquí:** con deploy incremental, un archivo puede
> desplegarse sin su dependencia. Al agregar un `render` a un archivo que
> sí cambia, hay que verificar que el destino **ya esté en la tienda**, no
> solo en el repo. El error únicamente aparece en vivo.

Queda documentada dentro del propio `meta-pixel.liquid`, junto con la
razón por la que ese snippet debe permanecer inerte (el pixel real lo
inyecta el canal oficial de Shopify; llenarlo duplicaría eventos).

### Verificación

Botón confirmado en ficha de producto, carrito, páginas, buscador,
políticas y colecciones. **En la home y en `/collections/todo-pesca` no
apareció** en las primeras horas; se descartó caché de Cloudflare y los
parámetros de bypass de Shopify, y el dueño lo confirmó visible desde su
teléfono poco después — era caché del lado del cliente.

---

## 40. Control de presupuesto: cómo poner un tope real

**Meta no entiende de presupuestos semanales.** El límite que se
configura es **diario**, y nada impide que la campaña siga gastando esa
cifra indefinidamente. Los "$700 a la semana" eran una cuenta mental, no
una regla configurada — y el 18 de agosto se gastaron $224 en un día sin
que nada lo impidiera.

### Lo que NO funcionó

**Tope a nivel de campaña** (`spend_cap` en la campaña): rechazado.

```
"El límite de gasto de la campaña debe ser de al menos $1500,00
 para esta divisa."
```

En pesos mexicanos el mínimo son $1,500 — más del doble del presupuesto
semanal de esta tienda. Inútil aquí.

### Lo que sí funcionó

**Tope a nivel de cuenta publicitaria**, que no tiene ese mínimo.

Dos comportamientos de la API que hay que conocer:

1. **El campo va en unidades de la moneda, no en centavos.** Enviar
   `252344` guardó `$252,344.00`, no `$2,523.44`. Esto es al revés que
   `daily_budget`, que sí va en centavos. Verificar siempre lo que quedó
   guardado.
2. **Cambiar el tope REINICIA el contador `amount_spent` a cero.** Es una
   ventaja: el tope pasa a medir solo lo que se gaste de ahí en adelante,
   sin tener que calcular el histórico.

Configuración vigente:

```
tope de la cuenta:  $285.00
consumido:          $  0.00   (reiniciado al fijar el tope)
```

$414.69 ya gastados + $285 de tope = **$699.69**, treinta y un centavos
por debajo del presupuesto. Al llegar, Meta deja de entregar sola.

El presupuesto diario se bajó de $100 a **$95**, que por tres días
(miércoles, jueves y viernes) da exactamente $285.

> ⚠️ **Es un tope de CUENTA, no de campaña.** Cualquier otra campaña o
> publicación promocionada consume de la misma bolsa y también se
> detendría. Para seguir la semana siguiente hay que **subir el tope**;
> no basta con reactivar la campaña.

### El contador de Meta va con retraso

`amount_spent` de la cuenta marcaba $2,013.56 mientras la suma real por
campaña daba $2,238.13. La diferencia era **exactamente el gasto del día
en curso**: ese contador se actualiza con el ciclo de facturación, no en
tiempo real.

Para cualquier cálculo de dinero, usar la suma de `insights` con
`time_range` explícito, no `amount_spent` ni `date_preset=maximum` (que
también devolvió una cifra desactualizada, $190.12 contra los $414.69
reales).

---

## 41. Auditoría de conversión: por qué 367 visitas no vendieron

**22 de agosto de 2026.** Con la campaña ya funcionando bien (367
visitas al sitio en 6 días, tráfico barato y del público correcto), el
problema seguía siendo el mismo: **1 solo carrito y cero compras.** El
dueño pidió una auditoría completa de la tienda para arreglarlo.

### El diagnóstico de fondo

Dos cifras explican casi todo:

- **94% del gasto publicitario fue a productos por debajo de $799**
  (mediana $147), donde el envío de $189 cuesta más que el producto.
- **Tasa de agregar al carrito: 1.9%**, contra un rango sano de 5-10%.

La ficha de producto no comunicaba devoluciones ni garantía de forma
visible, no tenía espacio activado para reseñas, y — el hallazgo más
concreto — **la descripción del producto iba después del botón de
compra**: el visitante decidía antes de leer qué compraba.

### Verificación antes de tocar código (Parte A del plan)

Con el método ya documentado en `INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`
(mirror de la página + Chromium local vía CDP, porque el entorno
bloquea navegación directa a sitios externos, checkout hospedado
incluido):

- **El botón "Agregar al carrito" ya queda fuera de pantalla en móvil**
  (980px de scroll en un viewport de 844px), incluso en el orden
  original. Este dato decidió cómo mover la descripción: se midió el
  largo real en 4 productos de alto gasto publicitario (212-517
  caracteres, muy por debajo de un umbral de 900) antes de decidir que
  subirla inline no empeoraba el problema de forma relevante.
- Se armó un carrito real vía `POST /cart/add.js` replicando los UTM
  exactos de la campaña, y se siguió hasta el checkout hospedado de
  Shopify (`GET /checkout` con redirecciones). El HTML inicial confirma
  **PayPal y Mercado Pago como opciones de pago visibles**, ambos en
  español. No se pudo completar el recorrido interactivo (información
  de envío, monto exacto de envío, flujo completo de cada pasarela)
  porque el checkout hospedado es una aplicación de JavaScript sin
  estado inicial embebido en el HTML, y este entorno no puede navegar
  un navegador real hasta `intemperiemexico.com` — ni siquiera al
  checkout. Se preparó un prompt de "Claude en Chrome, modo guía, no
  ejecutes" (`prompt-claude-chrome-verificar-checkout.md`, fuera del
  repo) para que el dueño complete esa verificación en paralelo a las
  Olas de código.
- Se confirmó que `/policies/refund-policy` responde 200 (no 404) antes
  de enlazarla en el tab de devoluciones.
- Se corrigieron tres falsos positivos del diagnóstico inicial antes de
  planear nada: el enlace "Ver todos los detalles" está oculto por CSS
  fuera del quick-add (`display: none`, no es un enlace muerto visible);
  ya existían badges de métodos de pago, en el footer
  (`shop.enabled_payment_types` + `payment_type_svg_tag`) — faltaba
  subirlos al punto de decisión, no crearlos; y el botón de WhatsApp no
  era una discrepancia manual-código, era una historia secuencial
  correcta (sección 19 vs sección 39, ver arriba).

### Ola 1 — Confianza y orden en la ficha de producto

`templates/product.json` + `sections/main-product.liquid`. Nuevo
`block_order`: `rating` sube bajo el título (no pinta nada hasta que
haya reseñas — queda listo para Judge.me sin tocar el archivo otra
vez), `inventory` se activa con umbral 3 sin mostrar cantidad exacta
(estado real, no urgencia fabricada), `description` sube antes de
`quantity_selector`/`buy_buttons`, y tres `collapsible_tab` nuevos
(Envíos, Devoluciones, Garantía) con copy ya validado en el proyecto —
el mismo texto que ya usaban `brand-experience.liquid` y
`.im-trust-note`, sin inventar nada. La nota "Imágenes ilustrativas...
el diseño puede variar" se quita del costado de la galería (sembraba
duda junto a la única prueba visual del cliente) y se reescribe en
positivo dentro del tab de Garantía.

`quantity_selector` se quedó donde estaba: no había evidencia de que
fuera la fricción, y moverlo rompe una clase CSS que depende del orden
(`product-form__quantity-top`).

### Ola 2 — Un solo umbral de envío, una sola barra

El umbral de $799 vivía hardcodeado (`79900` centavos) de forma
independiente en 3 archivos de código activo:
`snippets/cart-drawer.liquid`, `sections/main-cart-items.liquid`, y el
JS de `sections/announcement-bar.liquid` — el mismo riesgo que ya había
causado la desincronización de "2 a 4 días" vs "2 a 7 días" (arriba),
pero en un número que toca el carrito directamente.

Nuevo grupo **"Envíos"** en `config/settings_schema.json`
(`envio_umbral_centavos`, `envio_costo`, `envio_tiempo`), mismo patrón
ya probado del grupo "WhatsApp": funciona en vivo solo con sus
`default`, porque `config/settings_data.json` no se despliega
(`CUSTOMIZER_OWNED` en `deploy-shopify.py`). Nuevo snippet
`envio-gratis-barra.liquid` absorbe el HTML que estaba duplicado letra
por letra en los dos archivos del carrito. `announcement-bar.liquid` no
se borró — parecía código muerto (no está en ningún grupo de
header/footer hoy) pero es Dawn estándar y el dueño puede activarla
desde el personalizador en un clic — se conectó al mismo setting para
que no traiga un umbral fantasma si algún día se activa.

### Ola 3 — Pagos visibles y un carrito sin sorpresas

El hallazgo más grande de esta ola: **el monto real de envío ($189)
nunca aparecía en el carrito**, ni en el panel lateral ni en `/cart` —
solo el faltante para envío gratis ("Te faltan $489 MXN"), nunca el
costo en sí. El cliente lo descubría hasta el checkout de Shopify,
después de ya haber invertido sus datos personales.

Nuevo snippet `pagos-aceptados.liquid`, reusa
`shop.enabled_payment_types` + `payment_type_svg_tag` — la misma
técnica del footer, así es imposible que muestre un método
desactivado. **Verificado en vivo antes de escribir nada: esa lista
solo trae PayPal.** Mercado Pago Checkout Pro está activo (confirmado
por otra vía — aparece en el checkout hospedado real), pero Shopify no
lo clasifica dentro de ese enum. Sin acceso al admin para confirmar el
logo oficial vigente, no se fabricó un ícono de Mercado Pago a mano: se
completa con texto ("y Mercado Pago").

Se agregó en la ficha de producto (junto a `.im-trust-note`) y en el
pie del carrito (panel lateral y `/cart`), junto con la línea nueva del
costo real de envío, usando el umbral centralizado de la Ola 2.

**Hallazgo no anticipado, encontrado al implementar esta ola:** `/cart`
ya tenía un bloque de "Garantía de compra" con estilos en línea de
fondo claro (`#f8f9fa`, texto `#555`) — una caja blanca suelta sobre el
fondo negro del resto del sitio (`scheme-1`: `#000000` de fondo). Es
exactamente el mismo bug que `brand-tokens.css` documenta haber
corregido una vez en la ficha de producto; en `/cart` nadie lo había
notado porque esa página se visita menos que la ficha. Se reemplazó por
el mismo `.im-trust-note` que ya usan la ficha y el panel lateral, para
que las tres superficies compartan un solo patrón visual.

### Verificado en vivo, las tres olas

Con `curl` (UA de navegador real) contra la tienda en producción
después de cada despliegue, no solo leyendo el código: cero errores de
Liquid, los tres tabs y el bloque de inventario en la ficha, la línea
de envío mostrando "$189 MXN" para un carrito de $310 y "Gratis" al
cruzar $799 (confirmado en las tres superficies: ficha, panel lateral,
`/cart`), y el badge de PayPal + texto de Mercado Pago presentes.

### Lo que sigue pendiente

- **El recorrido interactivo del checkout** (información de envío,
  ambas pasarelas hasta el último paso) — el prompt para el dueño
  quedó preparado, falta que lo corra.
- **Parte C del plan — Judge.me**: instalar la app, importar las
  reseñas ya existentes en la cuenta del dueño, y conectar el bloque
  `rating` (ya agregado en la Ola 1, condicionado a que exista el
  metafield) y el widget completo en la sección `apps` vacía de
  `templates/product.json`.
- **Actualizar `PENDIENTES.md`**, que sigue describiendo la campaña de
  Meta como "creada y en pausa a $100/día" — desactualizado desde el 15
  de agosto, no refleja nada de las secciones 30 ni 37-41.

## 42. Judge.me: instalación, y por qué el metafield solo no basta

**22 de agosto de 2026.** El dueño ya tenía una cuenta de Judge.me con
reseñas reales guardadas de una integración anterior. Se instaló la
app desde el App Store, entró con esa cuenta existente (no una nueva —
el punto donde es fácil terminar con una cuenta vacía), y las reseñas
quedaron ahí: **8 reales, 4 de producto (5.0★ promedio) y 4 "reseñas de
tienda"** sin producto asociado. El dueño verificó el panel él mismo,
vía Claude en Chrome en modo solo-lectura: 3 de las 4 reseñas de
producto emparejan con productos reales del catálogo activo (Mira
Nakashi, Rifle Mendoza Quetzalcoatl, Caña Blue Fox Tolten); la cuarta
("Carrete Okuma Cascade CA-30") no tiene coincidencia — puede ser un
producto descontinuado o renombrado, decisión del dueño, no bloquea
nada.

### No existe un toggle de "sincronizar con metafields de Shopify"

Verificado en vivo antes de escribir código: `product.metafields.
reviews.rating` (el metafield genérico de Dawn, el mismo que ya
condiciona el bloque `rating` agregado en la Ola 1) **seguía vacío**
con reseñas reales ya cargadas. Judge.me no lo pobla. Usa su **propio**
namespace — `product.metafields.judgeme.badge` para el badge de
estrellas, `product.metafields.judgeme.widget` para el listado completo
— que es su forma estándar de integrarse en temas que no usan sus
app-blocks nativos de OS 2.0, independiente del toggle de "inserción de
aplicación" del personalizador.

### Ola 5: se conectó el metafield, pero no aparecía nada

Se agregó `{{ product.metafields.judgeme.badge }}` y `{{ product.
metafields.judgeme.widget }}` en `main-product.liquid` y `card-product.
liquid`, con `data-auto-install="false"` implícito en la intención (no
dejar que Judge.me meta su propia copia del widget en `templates/
product.json`). Desplegado, verificado que no rompía nada (0 errores de
Liquid en productos con y sin reseñas).

El dueño activó el app embed de Judge.me en el personalizador y le dio
Guardar — y preguntó por qué, aun así, no se veía ninguna estrella.

### Ola 5b: la causa raíz — el metafield necesita su `div`

Verificado con `curl` (UA de Chrome real) contra producción: el Core
Snippet de Judge.me **sí** cargaba (`<script class='jdgm-script'>`,
su CDN, ~9 KB de CSS) — el app embed estaba correctamente activo. Pero
un barrido del HTML por `<div class="...jdgm...">` no encontró **ni
un solo contenedor de widget**. Todas las apariciones de `jdgm-*` eran
nombres de clase dentro del `<style>` y del script de configuración.

Consultada la documentación oficial de Judge.me ([Liquid code for
Judge.me widgets](https://judge.me/help/en/articles/12058208-liquid-code-for-judge-me-widgets),
[Adding Judge.me widgets in Vintage themes](https://judge.me/help/en/articles/8205142-adding-judge-me-widgets-in-vintage-themes)):
el metafield no se imprime solo, va **dentro** de un `<div
class='jdgm-widget ...' data-id='...'>`. Son dos capas que trabajan
juntas, no alternativas:

1. **El metafield** — contenido pre-renderizado en el servidor
   (rápido, indexable).
2. **El `div` con `data-id`** — lo que el Core Snippet de Judge.me
   busca en el DOM para rellenarlo vía su API cuando el metafield
   viene vacío, que es exactamente lo que pasaba: la Ola 5 emitió el
   metafield desnudo, sin la capa 2, así que no había literalmente
   nada que pintar.

Se corrigió envolviendo los tres usos del metafield (badge en ficha,
badge en tarjetas, listado completo) en el `div` documentado por
Judge.me. El del listado lleva `data-auto-install="false"` — el
mecanismo real (no solo la intención) para que Judge.me no inyecte su
propia copia del widget dentro de `templates/product.json`.

**Verificado en vivo tras el segundo despliegue:** los tres `div`
aparecen ahora en el HTML de Nakashi y Mendoza, con `data-id` correcto
y `data-shop-reviews-count="4"`; un producto sin reseñas (Rifle
Munición Cal 4.5 Buck 105 Daisy) emite el mismo `div` vacío, sin error
de Liquid ni hueco raro — ahí es donde Judge.me va a mostrar "sé el
primero en escribir una reseña", que es señal de confianza válida por
sí sola. Tiempo de carga de la ficha en caliente: 0.31-0.90 s, dentro
del rango normal, sin regresión.

### Lección para no repetir

Cuando una app externa expone un metafield para integración manual,
**revisar su documentación oficial antes de imprimirlo solo** — casi
siempre hay un contrato de markup (clases, `data-*`) del que depende
que su JavaScript lo encuentre y lo use. Imprimir el metafield sin ese
contrato compila sin error y no rompe nada, así que el fallo es
silencioso: solo se nota como "no aparece nada", sin pista de por qué.

### Ola 5c: la causa real era otra — Judge.me cambió de arquitectura

**22 de agosto, tarde.** Con la Ola 5b ya desplegada, el dueño confirmó
con capturas de su propio navegador: seguía sin verse ninguna estrella
ni reseña en ningún lado. El `div` de la Ola 5b no fue suficiente.

Se investigó leyendo directamente el código que Judge.me sirve en
producción, no adivinando: `window.jdgmSettings` (inyectado en el HTML
real) trae `review_widget_revamp_enabled: true` y un campo
`review_widget_revamp_dual_publish_end_date: "2026-04-07"` — ya pasado.
Esta tienda quedó migrada a una arquitectura nueva de widgets de
Judge.me, y el período de convivencia con la arquitectura vieja ya
terminó.

Se descargó el `loader.js` real que carga esta tienda
(`cdn.shopify.com/extensions/.../judgeme-719/assets/loader.js`) y se
leyó su código: la arquitectura nueva busca en el DOM elementos
`.jdgm-widget[data-entry-point]` — un atributo `data-entry-point` (más
`data-entry-key`) que **no aparece en ningún artículo público de ayuda
de Judge.me**. Sin ese par de atributos, la función que carga el
contenido corta de inmediato (`if(!t||!r)return;`) sin hacer nada. El
`div` de la Ola 5b, con `data-widget="review"` — exactamente lo que
documenta Judge.me para integración manual — ni siquiera entra en el
`querySelectorAll` que dispara el renderizado, porque ese selector
exige `data-entry-point`, y el nuestro no lo tiene.

**Conclusión: no es un bug de nuestro código.** Es una app de terceros
que cambió de arquitectura y dejó su propio método de integración
manual documentado (el que seguimos en la Ola 5 y 5b) sin efecto para
las cuentas ya migradas al "revamp". `data-entry-point`/`data-entry-key`
son valores que solo genera el backend de Judge.me cuando el widget se
instala desde su panel o desde sus App Blocks nativos de OS 2.0 — no
se pueden escribir a mano ni adivinar. El `div` de la Ola 5b no se
retira: sigue siendo la forma correcta de exponer el metafield si
Judge.me revierte el cambio o si se usa en otro contexto — pero ya no
es lo que hace falta para que esta tienda muestre reseñas.

**El único camino que queda es instalar el widget desde el propio
panel de Judge.me** — Widgets → "Fragmentos de reseñas" → Instalar.
Ese botón es lo que genera el App Block de OS 2.0 con el
`data-entry-point`/`data-entry-key` correctos, y es el único método
soportado hoy para esta cuenta. Una vez instalado, hay que bajar
`templates/product.json` vivo por Admin API (nunca al revés, se
pierde la instalación real) y ver dónde quedó el bloque, reubicándolo
si Judge.me lo deja en la posición por defecto en vez de bajo el
título o en los tabs.

### Ola 5d: instalado por fin — el bloque nativo de Judge.me, a mano

**22 de agosto, más tarde.** El botón "Instalar ↗" de la propia página
de Widgets de Judge.me resultó tener un bug: sin importar qué tema
estuviera seleccionado en su selector (incluso con "Intemperie Mexico –
Rediseño 2026 (live)" ya elegido), siempre abría el editor de temas
sobre **Dawn (borrador)**, tema ID `141467517005`, y encima sobre la
plantilla de la página 404 en vez de una ficha de producto. Se detectó
esto en dos intentos independientes con Claude en Chrome (dando los
clics él mismo, a pedido del dueño) — el segundo intento confirmó que
no era un error de selección, el enlace del botón está fijo.

**Solución:** en vez de usar ese botón, se agregó el bloque a mano
desde el personalizador del tema en vivo — Editar tema →
"Agregar bloque" en la sección de producto → pestaña **Apps** → **Review
Snippets** (de Judge.me Reviews). Colocado debajo del título, arriba de
precio y calificación. Guardado y confirmado.

**Verificado en vivo con `curl` sobre las tres fichas con reseñas
reales** (Nakashi, Mendoza Quetzalcoatl, Blue Fox Tolten): el bloque
trae exactamente los atributos que la Ola 5c identificó como
faltantes —
```html
data-entry-point="review_snippet.js"
data-entry-key="review-snippet-widget/main.js"
```
Esto confirma la causa raíz de la Ola 5c: el bloque nativo de Shopify
(`shopify-app-block`) sí genera el contrato correcto; nuestro código
manual (Ola 5/5b) nunca podía hacerlo porque esos valores solo los
emite el propio backend de Judge.me al instalarse desde el
personalizador. Los `div` de la Ola 5b (badge y listado, con
`data-widget`) se quedan en el código — siguen vacíos e inofensivos,
un solo bloque real de Judge.me aparece por ficha, no hay duplicados.

El aviso amarillo "Falta la inserción de aplicación en el tema en
vivo" que sigue mostrando el panel de Judge.me **no aplica** — se
confirmó por `curl` que el Core Snippet (`jdgm-script`) sigue cargando
en las tres fichas, el mismo app embed que ya se había guardado en la
Ola 5b. Es un aviso desactualizado de su panel, no se tocó nada más.

## 43. Judge.me: 4 reseñas huérfanas del catálogo anterior

**22 de agosto, noche.** Con "Review Snippets" ya instalado
correctamente (sección 42, Ola 5d), el dueño confirmó con capturas
reales que seguía sin verse ninguna estrella en las fichas de
producto. Se investigó comparando los 4 productos reales que Judge.me
tiene vinculados a sus 4 reseñas de producto contra el catálogo activo
de Shopify — vía Claude en Chrome, entrando a cada reseña en el panel
de Judge.me y anotando el nombre/handle exacto del producto:

| Reseñador | Producto original en Judge.me | ¿Existe hoy? |
|---|---|---|
| Javier Valderrama | Carrete Okuma Cascade CA-30 Spinning | ❌ 404 |
| Marco Hernandez | Mira NAKASHI 3-9×40 Iluminada con Montura 11mm | ❌ 404 |
| Jorge Alberto López Carrillo | Combo Spinning Blue Fox Tolten 1.80m | ❌ 404 |
| Emiliano López | Rifle Mendoza Quetzalcoatl NitroPistón 5.5mm | ❌ 404 |

**Los 4 productos originales de las 4 reseñas de producto ya no
existen** (confirmado con `curl` directo a cada handle, 404 los
cuatro) — no era solo el caso del Okuma que ya se sabía. Quedaron
huérfanos de una versión anterior del catálogo, antes de que se
renombraran/reestructuraran productos. Judge.me mantiene su propio
registro interno de esos productos como "Activo" con sus IDs viejos,
desincronizado de Shopify.

**Intentado y descartado, con evidencia de por qué no funciona:**
- **Reasignar desde el panel de Judge.me**: no existe esa opción.
  "Editar reseña" solo permite cambios menores de texto (título,
  cuerpo con límite de 30 caracteres, archivos) — nunca el producto
  vinculado. Confirmado entrando al diálogo real, no adivinado.
- **CSV export/edit/reimport**: el asistente de Judge.me
  ("Importación manual de reseñas") es un flujo de **alta**, no de
  actualización — no tiene paso de "hacer match por ID y sobrescribir".
  Reimportar un CSV con las 8 reseñas y 4 handles corregidos
  probablemente habría duplicado a 16 reseñas en vez de corregir 8.
  Se detectó esto leyendo los 4 pasos del asistente antes de subir
  nada — no se llegó a ejecutar.
- Camino que sí funcionaría sin riesgo: pedirle a soporte de Judge.me
  que reasigne las 4 reseñas por su ID interno — quedó preparado
  (4 IDs de reseña recolectados) pero no se usó porque apareció una
  alternativa mejor (sección 44).

## 44. Cards Carousel: reseñas de tienda sin depender del match de producto

**22 de agosto, noche.** El dueño propuso rodear el problema de la
sección 43 por completo: en vez de perseguir la reasignación exacta de
cada reseña a su producto, mostrar un **carrusel de reseñas de tienda**
(no atado a un producto específico) tanto en el home como en las
fichas de producto — así ninguna reseña real queda invisible mientras
se resuelve la reasignación (o aunque nunca se resuelva).

Instalado el bloque **"Cards Carousel"** de Judge.me (evitando
"Reviews Carousel - Legacy", la arquitectura vieja que la sección 42
ya identificó como no funcional en esta cuenta) con el mismo método
confiable de las Olas 5c/5d — Personalizar tema → Agregar bloque →
Apps, nunca el botón "Instalar" del panel de Judge.me (roto, ver
sección 42) — en dos lugares: home (antes del footer) y ficha de
producto (después de "Review Snippets").

**Verificado con `curl`, contenido real ya en el HTML del servidor**
(no solo el contenedor vacío, como pasaba antes de entender la
arquitectura "revamp"): `5.00 ★ (8)` — el promedio real y las 8
reseñas de la tienda, sin filtrar por el producto de la página. Los
atributos correctos están presentes:
`data-entry-point="carousel_lightbox.js"`, `data-has-revamp="1"`.

**Hallazgo de contraste, encontrado antes de que el dueño tuviera que
reportarlo:** el widget trae `--header-color`/`--text-color`/
`--arrows-color` fijos en negro (`#000000`) como estilo **inline** en
el propio `div` — pensado para fondo claro. Se confirmó leyendo el CSS
real del widget (`carousels.css` descargado de su CDN): el título
"Customers are saying", el promedio de estrellas y las flechas de
navegación **no tienen fondo propio** — solo las tarjetas individuales
de cada reseña lo tienen (`--card-color: #F9F9F9`, clara y
autocontenida, se deja tal cual). Ese texto/iconos quedaban
directamente sobre el fondo negro del sitio (`scheme-1`) — negro sobre
negro, invisible.

Corregido en `assets/brand-tokens.css`: como el color problemático
viene de un estilo inline (gana sobre cualquier regla externa sin
`!important`), se sobreescriben esas tres variables con `!important`,
usando el token real de texto del scheme activo de Dawn
(`rgb(var(--color-foreground))`) — no un color inventado, así sigue
funcionando si el scheme del sitio cambia.

### Ola 5f: dos correcciones tras verlo en pantalla real

**22 de agosto, noche.** El dueño mandó capturas del home y de una
ficha de producto ya con el Cards Carousel visible — título y
estrellas ya legibles, el primer fix funcionó — pero señaló dos
problemas nuevos que solo se detectan viéndolo, no con `curl`:

1. **El texto dentro de las tarjetas casi no se leía** (gris muy claro
   sobre la tarjeta clara). Causa: el fix anterior sobreescribió
   `--text-color` además de `--header-color`/`--arrows-color` — pero
   Judge.me **reusa `--text-color` para el contenido de cada tarjeta**
   (nombre del reseñador, cuerpo de la reseña), que vive sobre
   `--card-color` (claro). Ponerlo claro ahí lo volvió casi invisible,
   por el problema contrario al que se venía corrigiendo. Se revirtió
   `--text-color` a su valor original (`#000000`, correcto sobre
   fondo claro) y el override quedó solo en `--header-color` y
   `--arrows-color` — los dos elementos que sí están sobre el fondo
   negro de la página.
2. **En la ficha de producto se veía apretado**, una sola tarjeta sin
   flechas — porque el bloque estaba dentro de la columna angosta de
   "Información de producto" (junto al precio), la misma limitación
   de ancho que tiene esa columna para todo lo demás. Se movió, vía
   Claude en Chrome, a la sección "Aplicaciones" que ya existía
   (vacía) en la plantilla de producto — quedó después de "Productos
   relacionados" y antes del footer, en ancho completo, igual que en
   la home.

También se agregó `padding-top/bottom: 56px` a
`.shopify-section:has(.jdgm-cards-carousel)` — la sección
"Aplicaciones" (`sections/apps.liquid`, genérica de Shopify) no trae
padding propio como sí tienen las secciones nativas de Dawn, así que
el carrusel quedaba pegado directo contra el hero de la home.

Verificado con `curl` tras cada uno de los dos despliegues: el CSS
corregido y el bloque reubicado ya están en producción; una sola
instancia real del carrusel en la ficha (no quedó duplicado al
moverlo).

### Ola 5g: orden final y traducción del título (23 ago, madrugada)

El dueño hizo dos últimos ajustes de pulido, verificados con `curl`
contra producción, ninguno tocó código del repo (ambos son
configuración del personalizador/Judge.me):

- **Reordenó las secciones** de la ficha de producto, vía Claude en
  Chrome: la sección "Aplicaciones" (Cards Carousel) pasó de estar
  después de "Productos relacionados" a estar **antes** — reseñas
  justo después de toda la info de compra (imagen, precio, botones,
  tabs de envío/devoluciones/garantía), no al fondo de la página tras
  "también te puede interesar". Verificado: el índice del carrusel en
  el HTML real es menor que el de `related-products`.
- **Tradujo el título del carrusel**: "Customers are saying" → "Lo que
  dicen nuestros clientes". No estaba en el panel de idioma de
  Judge.me (Configuraciones → General → Idioma — ese solo controla
  idioma global de admin/widgets/correos, sin editor de textos
  sueltos) ni en los ajustes de texto del "Widget de reseñas" (widget
  distinto, con su propio acordeón de Texto). El campo real es
  **"Header text"**, dentro del grupo HEADER de los ajustes del propio
  bloque Cards Carousel, en el editor de temas de Shopify — es un
  ajuste **por bloque**, no global: hubo que cambiarlo dos veces, una
  por cada instancia (home y ficha de producto). Confirmado con
  `curl`: el texto nuevo aparece en el HTML de ambas páginas en
  producción, "Customers are saying" ya no aparece en ninguna.

**Lección para no repetir**: cualquier Cards Carousel nuevo que se
agregue en el futuro nace con "Customers are saying" en inglés por
defecto — hay que traducirlo cada vez, en su propio campo "Header
text" dentro del editor de temas, no en el panel de Judge.me.

### Cierre (23 de agosto de 2026)

El dueño confirmó dos decisiones que cierran los últimos pendientes
abiertos:

1. **Solo existe una plantilla de producto** ("Producto
   predeterminado") — el punto de "agregar Review Snippets a otras
   plantillas" no aplica, no hay ninguna otra.
2. **Las reseñas mostradas de forma aleatoria (sin filtrar por
   producto) no son un problema** — es justo lo que resuelve el Cards
   Carousel de la Ola 5e. Con esto, reasignar las 4 reseñas de
   producto huérfanas (sección 43) deja de ser un pendiente: sigue
   siendo técnicamente correcto y el mensaje para soporte de Judge.me
   con los 4 IDs de reseña queda redactado y disponible si algún día
   se quiere retomar, pero no bloquea nada ni requiere seguimiento.

**Con esto, la integración de Judge.me queda cerrada**: badge de
estrellas junto al título (donde haya coincidencia de producto),
carrusel de reseñas de tienda visible y legible en home y ficha de
producto, ubicado justo después de la información de compra, con
título en español. Único pendiente real, de mantenimiento (no
bloqueante):

- Bajar `templates/product.json` vivo y confirmar dónde quedaron los
  dos App Blocks (Review Snippets + Cards Carousel), para que quede
  documentado el ID real y un futuro deploy de código no los pise sin
  darse cuenta — riesgo ya conocido de este archivo (sección 6/34 del
  manual).

## 45. Ola 6: punch list post-auditoría con agentes especializados

**23-24 de agosto de 2026.** Con Judge.me cerrado, el dueño pidió usar
agentes especializados para encontrar qué más hacía falta, basándose
en el hallazgo central de toda la auditoría (94% del gasto a productos
de ticket bajo con envío caro). Se lanzaron dos agentes en paralelo:

- **Persona Walkthrough Specialist** — simuló el recorrido cognitivo
  de un comprador mexicano real ("Ricardo, 43, Cuernavaca") por el
  sitio en vivo, usando marcos LIFT/Cialdini/Fogg.
- **Paid Social Strategist** — analizó la estrategia de anuncios y
  catálogo de Meta dado el problema de AOV bajo.

**Regla seguida, como con cualquier reporte de agente en este
proyecto: nada se acepta sin verificar.** Varios hallazgos necesitaron
corrección antes de actuar sobre ellos:

- El agente reportó "100% de productos con Bajas existencias" sobre
  una muestra de 5 — se repitió con una muestra aleatoria real de 15 y
  dio **87%** (13/15). Sigue siendo grave, pero el número correcto es
  otro.
- El agente reportó "3 correos de contacto distintos" — al revisar
  las 4 páginas de políticas (no solo las 2 que él miró), son
  **5 distintos**: `ventas@`, `soporte@`, `facturacion@`, `pedidos@`,
  `contacto@intemperiemexico.com`.
- La recomendación del Paid Social Strategist de subir el piso de
  precio del conjunto de Meta a $799 se probó contra el catálogo real
  vía API antes de aceptarla — a $799 solo quedan **23 productos**
  (bajando de 72), un recorte del 68% que arriesgaba el rendimiento
  del catálogo dinámico. Se probaron los cortes intermedios
  ($500→35, $700→24 — este último ya descartado en la reconstrucción
  de la sección 38 por "muy poco catálogo") y el dueño eligió **$500**
  con los números reales en mano, no la recomendación cruda del
  agente.

### Hallazgo propio, no reportado por ningún agente

**`inventory_threshold: 3`** (configurado en la Ola 1, sección 41) es
la causa raíz de que "Bajas existencias" apareciera en el 87% del
catálogo real. El stock de esta tienda vive mayormente en ≤3 unidades
por SKU (negocio chico, muchos SKUs), así que un umbral pensado para
señalar urgencia real terminó disparándose casi siempre — la señal se
volvió ruido. Es un problema que causamos nosotros mismos en una ola
anterior, no algo preexistente del sitio.

### Ejecutado directamente, verificado en vivo

**1. Productos agotados fuera del escaparate del home.**
`sections/brand-experience.liquid` armaba la sección "chapter-feature-pool"
tomando los primeros 5 productos de la colección sin filtrar
disponibilidad — el Rapala CountDown 07 apareció destacado en la
sección Pesca del home estando agotado (confirmado por el agente y
verificado de forma independiente). Se corrigió el loop para recorrer
hasta 20 productos de la colección buscando 5 disponibles de verdad
(`unless product.available … continue`). Desplegado y verificado: los
4 productos que ahora aparecen destacados en Pesca están disponibles
(`available: true` en `products.json`), el Rapala ya no es el primero.

Nota de proceso: mi primera verificación post-deploy dio un falso
positivo — grepear el texto "Agotado" en el HTML de los nuevos
destacados lo encontró en los 4, y pensé que el fix había fallado.
Era el mismo patrón ya documentado en este proyecto (como el enlace
"Ver todos los detalles"): el badge `price__badge-sold-out` de Dawn
vive siempre en el DOM, oculto por CSS salvo que el producto esté de
verdad agotado. La fuente correcta es el campo `available` de
`products.json`, no un grep de texto — con esa fuente, los 4
productos están disponibles.

**2. Piso de precio del conjunto de Meta a $500.** Con el token de
Meta disponible en este entorno, se actualizó el `filter` del
`product_set` `1455189226500365` de `price_amount.gte: 30000` a
`50000` (centavos) vía API directa. Verificado con una llamada de
lectura inmediata: el conjunto pasó de 72 a **35 productos**, exacto
al número calculado antes de aplicar el cambio. Se confirmó además que
la campaña (`120249613902440175`) y el conjunto de anuncios activo
(`120249666491620175`) siguen en `ACTIVE`/`ACTIVE` — el cambio de
filtro no rompió nada. Se renombró el conjunto de anuncios (que decía
"≥$300" en el nombre) para que refleje el piso real ("≥$500").

**Regla de seguridad aplicada, importante para el futuro:** antes de
tocar el bloque `inventory` de `templates/product.json` (para el punto
de "Bajas existencias"), se descubrió que la copia local del repo
**no tiene** los dos App Blocks de Judge.me (Review Snippets, Cards
Carousel) que se agregaron hoy vía el personalizador — exactamente el
riesgo de drift que el plan original advertía desde la sección 6/34.
Subir el archivo local habría **borrado esos dos bloques de
producción**. Se revirtió el cambio de código antes de desplegar nada
y se decidió resolver ese punto vía Claude en Chrome directamente en
el personalizador, no por `git push`.

### Vía Claude en Chrome (pendiente al cerrar esta sección)

**3. Umbral de inventario honesto**: activar `show_inventory_quantity`
en el bloque Inventario del personalizador (mismo efecto que el ajuste
de código revertido, sin el riesgo de pisar los App Blocks de
Judge.me). Cambia "Bajas existencias" genérico a "Bajas existencias:
quedan N" — honesto incluso cuando N es bajo.

**4. Política de envío y unificación de correos.** Texto a pegar en
`/policies/shipping-policy`: *"Envío gratis desde $799 MXN. Pedidos
menores: $189 MXN tarifa fija a todo México."* — hoy la política solo
dice que el costo "se calcula según peso y dimensiones", sin repetir
los montos reales que sí se muestran en la ficha y el carrito.

Para los correos: se le preguntó al dueño cuál usa de verdad y
respondió sin preferencia — criterio aplicado por mí, documentado para
que se pueda corregir después si no coincide con cómo opera de
verdad: **tres correos con función clara** en vez de cinco sin
patrón — `ventas@` (contacto general, hoy en privacidad/términos),
`soporte@` (devoluciones/postventa, hoy en envíos/reembolsos),
`facturacion@` (solo CFDI/factura). Se retiran `pedidos@` y
`contacto@`, que duplicaban roles ya cubiertos.

### Los 3 pasos vía Claude en Chrome, ejecutados y verificados (24 ago)

Claude en Chrome ejecutó los tres pasos directamente en el panel
(umbral de inventario, política de envío, unificación de correos) y
reportó **6 cambios de correo**: 1 en la política de envío
(`pedidos@` → `soporte@`), 0 en devoluciones (ya usaba `soporte@`), 3
en privacidad (`contacto@` → `ventas@`), 2 en términos de servicio
(`contacto@` → `ventas@`). No encontró ninguna mención de
`facturacion@` en las 4 políticas, así que no hubo nada que preservar
ahí.

**Verificado con `curl` contra producción, no solo por el reporte del
agente:** el texto de costos de envío ya dice exactamente "Envío
gratis desde $799 MXN. Pedidos menores: $189 MXN tarifa fija a todo
México." — correcto.

**La verificación encontró además un bug real, ya avisado por el
propio agente con honestidad antes de que yo lo revisara:** la
sección "9. Contacto" de la política de envío quedó con el correo
duplicado — *"escríbanos a soporte@intemperiemexico.com o a
soporte@intemperiemexico.com"* — porque el texto original decía
"soporte@ o pedidos@" y, al unificar ambos al mismo destino, quedó la
misma dirección repetida dos veces. Corregido con un prompt de una
línea para dejar la mención una sola vez.

**Sobre los dos criterios que el agente marcó como dudosos** (menciones
de derechos ARCO y datos fiscales/RFC mandadas a `ventas@` por
descarte, en vez de un correo de privacidad/legal dedicado, y la baja
de boletines también a `ventas@`): se mantiene `ventas@` como buzón
único para todo lo que no sea devoluciones o factura — abrir un correo
dedicado a privacidad/legal sería sobre-ingeniería para el tamaño
actual de la tienda. Decisión documentada, no queda como pendiente
abierto.

Con esto, los 4 puntos ejecutables de la Ola 6 (los 3 de código/API
más los 3 del personalizador, que en la práctica fueron 4 ediciones de
contenido) quedan cerrados y verificados en producción.

### Diferido a propósito — no se improvisa código a medias

- **Cross-sell bajo la barra "te faltan $X" del carrito**: necesita
  una colección curada de productos baratos para sugerir, que no
  existe hoy. Implementarlo sin esa colección sería frágil.
- **5 de 9 combos agotados** (los únicos productos que cruzan $799 sin
  combinar) — decisión de reabastecimiento/compra del dueño, no de
  código.
- **Verificar que el evento Purchase de Meta se dispare de verdad** —
  el pago sale del sitio (PayPal/Mercado Pago), riesgo real de que
  nunca se registre. Investigación técnica aparte (Conversions
  API/webhook de orden), no un arreglo de una tarde.
- **Fichas técnicas reales** (medidas, peso, calibre) — proyecto de
  contenido; empezar por los ~35 productos que quedan en el conjunto
  de Meta es el candidato lógico, pero falta decidirlo con el dueño.
- **2-3 combos nuevos de $899-$1,800** — decisión de catálogo/compra.
- **Meses sin intereses/OXXO visibles** — falta verificar primero qué
  ofrece de verdad Mercado Pago Checkout Pro en esta cuenta antes de
  prometerlo en la interfaz.

### Graphify

Corrido `graphify update .` sobre `tema-shopify/` tras el cambio de
`brand-experience.liquid`: sin cambios de topología (sigue 460/705/40)
— el fix fue lógica de filtrado dentro de un `for` ya existente, no un
componente nuevo. Consistente con el mismo patrón ya documentado en la
sección 21 para las Olas 1-5g.

## 46. Cero compras en 6 meses: el hallazgo que nadie había medido

**24 de agosto de 2026.** Antes de lanzar cualquier campaña nueva, se
revisaron los 3 puntos bloqueantes de la Ola 6 (sección 45). El punto
1 — "verificar que el evento Purchase de Meta se dispare" — llevó a
un hallazgo mucho más grande que un problema de configuración de
píxel.

### Lo que se encontró

Consulta de `insights` a nivel de cuenta con `date_preset: maximum`
(toda la vida de la cuenta, 17 de febrero al 23 de agosto de 2026,
$2,525.61 MXN gastados en total): **40 agregar-al-carrito, 23 inicios
de checkout, 7 personas que llegaron a `add_payment_info` (pantalla de
pago) — y cero acciones de tipo compra, en ningún nombre
(`purchase`, `omni_purchase`, `offsite_conversion.fb_pixel_purchase`),
en más de 6 meses.**

> ⚠️ **Corregido el 25 de agosto (sección 49):** los "7 que llegaron a
> `add_payment_info`" eran en su mayor parte **el propio dueño**. Los 4
> checkouts abandonados de toda la historia de la tienda son suyos, más
> el pedido #1005 — cinco sesiones propias. **Ningún cliente real llegó
> nunca a la pantalla de pago**, así que la lectura de "algo pasa en el
> checkout" que se desprende de este párrafo no tiene sustento. El
> cuello de botella está arriba, en vista → carrito.

Se le preguntó directamente al dueño si alguna vez ha habido un pedido
real completado en la tienda (aunque fuera antes de esta campaña, en
febrero-abril) — **la respuesta fue no, nunca.** Esto descarta la
hipótesis de "el pixel está roto pero sí hay ventas": es consistente
con los datos de Meta. El problema no es (solo) medición — es que el
checkout nunca se ha probado completo.

### Por qué nadie lo había detectado antes

La auditoría de checkout de la Parte A de este mismo plan (secciones
A2/A3, "Estado al 22 de agosto") se detuvo **a propósito antes de
pagar de verdad**, para no generar cargos reales — tanto en la parte
que hice yo por HTTP/Chromium como en el recorrido que hizo el dueño
con Claude en Chrome. Se verificó todo hasta la pantalla de pago:
envío correcto, PayPal y Mercado Pago en español, sin fricciones
raras — y con eso se declaró "checkout sano". Pero **nunca se
confirmó qué pasa después de dar clic en "Pagar"**: si el cobro se
procesa, si Shopify crea el pedido, si el pixel de Compra se dispara,
si llega el correo de confirmación. Es la única etapa del embudo que
nadie había probado de principio a fin — con toda intención, para no
gastar dinero real, pero con el costo de dejar sin verificar la parte
más importante.

### Decisión y siguiente paso

Se le propuso al dueño tres caminos (compra de prueba real hecha por
mí con datos que él me diera, hecha por Claude en Chrome, o investigar
configuración sin gastar dinero primero). **Eligió hacerla él mismo**,
con su propia tarjeta/PayPal, en un producto barato — y avisar el
resultado. En cuanto se confirme, se revisa en Meta si el evento de
Compra llegó.

**Este hallazgo cambia la prioridad de todo lo demás.** Antes de sacar
cualquier campaña nueva, evolucionar la actual, o invertir en
cualquiera de los pendientes diferidos de la sección 45 (fichas
técnicas, combos nuevos, cross-sell), lo único que importa es
confirmar que un cliente real puede completar una compra de principio
a fin. Todo el trabajo de conversión de las Olas 1-6 es, en el mejor
de los casos, necesario pero no comprobado suficiente hasta que este
punto se cierre.

### Los otros 2 puntos bloqueantes, resueltos en la misma revisión

- **MSI y OXXO sí están disponibles de verdad** en el checkout de
  Mercado Pago — confirmado con evidencia real, no supuesta: el HTML
  guardado de la auditoría de checkout anterior
  (`A2-paso5-checkout.html`) trae
  `"paymentBrands":["mercadopago","visa","master","american_express","oxxo","maestro","visaelectron","seveneleven"]`
  y componentes activos de meses sin intereses
  (`MsiInstallmentsSelect`, `InstallmentsModal`,
  `useVaultedMsiInstallments`). Queda pendiente, no bloqueante,
  mostrarlo visiblemente en la ficha/carrito (ya estaba en la lista de
  diferidos de la sección 45, punto 10).
- **Los 5 de 9 combos agotados se quedan publicados tal cual** — el
  dueño ya tiene plan de reabastecerlos pronto. No se toca nada por
  código ni se despublica.

### Cierre — el checkout sí funciona y el evento Compra sí llega (24 de agosto, tarde)

El dueño hizo la compra de prueba real (pedido #1005, $190.95 MXN,
Shopify lo marcó "Pagado"). Con eso confirmado, el siguiente paso era
verificar el pixel de Meta. Dos capturas del Administrador de eventos
no mostraban ningún evento de Compra — parecía confirmar el peor
escenario (checkout sano, medición rota). Se le dio a Claude en Chrome
un prompt de investigación dirigida al control "Comparte datos" del
canal Facebook e Instagram (Commerce Partner Hub), con la hipótesis —
sacada de documentación pública de Shopify/Meta — de que el evento
Compra se manda por Conversions API (servidor), no por el píxel del
navegador, y que ese envío requiere el nivel "Máximo" de intercambio
de datos.

**Resultado real, verificado por Claude en Chrome dentro del propio
Administrador de eventos de Meta:**

- **"Comparte datos" ya estaba en Máximo.** No había nada que subir —
  la tarjeta lo confirma explícitamente ("mediante el píxel de Meta,
  las coincidencias avanzadas y la API de conversiones"). No se
  modificó ni se guardó nada, porque no hacía falta.
- **El evento Compra sí está llegando.** En el pixel correcto
  (`2011984246408291`, *Intemperie México Pixel*): **Comprar — Activo
  — 2 eventos — calidad 9.3/10 — última recepción hace 29 minutos**
  (coincide en tiempo con el pedido #1005). Es, de hecho, **el evento
  con mejor puntuación de calidad de todo el sitio** — mejor que
  Añadir al carrito (4.4/10) o Finalización de compra iniciada
  (4.4/10). El diagnóstico de Meta en la pestaña Acciones confirma que
  la Conversions API está sumando ~14.9% más conversiones detectadas
  en los últimos 7 días junto con el píxel.
- **La causa de las dos capturas en cero: portafolio de negocio
  equivocado en Meta Business Suite.** Al entrar, la sesión estaba
  posicionada por defecto en otro portafolio ("Alcampo Cuernavaca"),
  no en "Intemperie México" — la cuenta de Meta del dueño administra
  varios portafolios (Alcampo Cuernavaca, Emiliano Lopez Costa,
  Intemperie México, y otros). El Administrador de eventos muestra
  datos del pixel del portafolio activo; con el portafolio equivocado
  seleccionado, cero compras es exactamente lo que se esperaría ver
  aunque todo funcione bien del otro lado. Causa secundaria posible,
  no descartada: el rango de fechas de la primera revisión (27 jul–23
  ago) no incluía el 24 de agosto, día real del pedido.

**Conclusión: no había ningún problema de medición que arreglar.** El
checkout completa pedidos reales, el pixel + Conversions API entregan
el evento de Compra con la mejor calidad de señal del sitio, y el
"cero compras" de las capturas fue un artefacto de estar viendo el
portafolio de Meta equivocado — no del sitio, no del pixel, no de la
configuración de Shopify. Este hallazgo cierra la sección 46
completa: **la tienda sí puede vender y sí se puede medir.** El
"hallazgo central" del título de esta sección (cero compras en 6
meses) se mantiene como diagnóstico correcto de *ese momento* — la
campaña llevaba 6 meses sin ninguna compra real porque nunca se había
probado el checkout de punta a punta — pero deja de ser un problema
abierto: ya se probó, y funciona.

**No se tocó ningún ajuste adicional.** Existe un control aparte,
distinto al de "Comparte datos", en Shopify → Configuración → Eventos
del cliente → acceso a datos, con las opciones "Optimizado" (activo
hoy) / "Siempre activo". Claude en Chrome identificó la opción pero
no la cambió por decisión propia — afecta privacidad de datos del
cliente y no era parte de lo pedido. Queda como posible mejora futura,
no como pendiente bloqueante.

**Único pendiente de verificación fina, opcional:** confirmar que el
`value` del evento Compra recibido es exactamente $190.95 MXN (el
monto real del pedido #1005) y no un valor por defecto o mal calculado
— se puede revisar abriendo "Ver detalles" del evento en el
Administrador de eventos. No bloquea nada; es una confirmación extra
de calidad del dato, no de que el evento exista.

### Con esto, los 3 puntos bloqueantes de la Ola 6 (sección 45) quedan cerrados

1. Umbral de inventario honesto — hecho.
2. Combos agotados — decisión del dueño tomada (reabastecer, no tocar código).
3. Evento Purchase de Meta — confirmado que se dispara con calidad 9.3/10.

No queda ningún bloqueante identificado para lanzar o escalar la
siguiente campaña. Los pendientes restantes eran los diferidos de la
sección 45 (cross-sell, fichas técnicas, combos nuevos, MSI/OXXO
visibles) — mejoras, no bloqueos, cerrados a su vez en la Ola 7
(sección 47, abajo).

## 47. Ola 7: cerrar los 4 pendientes diferidos (24 ago)

Con la sección 46 cerrada, el dueño pidió explícitamente "acabemos con
todos los pendientes" — los 4 diferidos de la Ola 6 (sección 45):
MSI/OXXO visibles, cross-sell en el carrito, fichas técnicas y combos
nuevos.

### Corrección de un hallazgo previo

La sección 46 dio por confirmado que "MSI y OXXO están disponibles",
citando `useVaultedMsiInstallments`/`MsiInstallmentsSelect` en el HTML
del checkout guardado. **Esa evidencia era débil**: esos bundles de JS
los precarga Shopify en todos los checkouts sin importar el gateway,
y `shop-pay-installments` es Shop Pay, que no opera en México. Como
Mercado Pago es *offsite*, los MSI se ofrecen dentro de su propia
página, que la auditoría nunca vio. Lo que sí está verificado con
evidencia dura, del `paymentBrands` que declara el propio gateway:
`["mercadopago","visa","master","american_express","oxxo","maestro","visaelectron","seveneleven"]`
— tarjetas, OXXO y 7-Eleven. Los MSI quedaron confirmados aparte, por
el dueño directamente ("sí tiene meses sin intereses, pago con
cualquier tarjeta y además pago en efectivo en diferentes puntos").

### Reparto de capacidades verificado en este entorno

No hay `SHOPIFY_ADMIN_TOKEN` en este entorno de ejecución (solo
`META_ACCESS_TOKEN`/`META_AD_ACCOUNT_ID`) — no se pueden crear
colecciones, productos ni metafields por API. Sí se pueden modificar
archivos de tema: el workflow `.github/workflows/deploy-shopify.yml`
corre en push de cualquier rama que toque `tema-shopify/`. Por eso
los bloques 1-3 son código directo, y el bloque 4 (combos) queda como
documento para Claude en Chrome o el dueño.

### Bloque 1 — MSI, tarjetas y efectivo visibles

`snippets/pagos-aceptados.liquid` ya se renderiza en los 3 puntos de
decisión (ficha, cajón del carrito, `/cart`) — un solo archivo cubrió
todo, sin tocar ningún `templates/*.json`. Se agregó "También en
efectivo: OXXO y 7-Eleven" (siempre visible) y "Meses sin intereses
con tarjetas participantes" (condicional a un nuevo setting
`msi_minimo_centavos`, default $300, porque no se conoce el mínimo
real que exige Mercado Pago para ofrecer MSI — se prefirió un umbral
propio conservador a prometerlo en un ticket bajo). Verificado en
vivo: ficha ≥$500 muestra ambas líneas, ficha <$300 solo efectivo.

### Bloque 2 — Cross-sell bajo la barra de envío gratis

El bloqueo histórico ("no existe una colección curada de productos
baratos") se disolvió: `sections/related-products.liquid` ya resuelve
producto→departamento→subcategorías con handles reales; el nuevo
snippet `cross-sell-carrito.liquid` reusa ese mismo mapa. Sugiere
hasta 3 productos disponibles, no repetidos, con precio entre 55%-125%
de la brecha hacia el umbral de envío gratis (para que de verdad la
cierren, ni un señuelo de $150 para una brecha de $489 ni un rifle de
$8,000 para $200).

**Corrección de diseño encontrada antes de escribir código** (un
agente de planeación lo detectó): un botón dentro de un `<form>` se
habría roto en `/cart`, porque la barra de envío ya vive dentro de
`<form id="cart">` y el navegador descarta un `<form>` anidado.
Solución: `<button data-imx-add="VARIANT_ID">` sin form, con un
listener delegado en `document` (`assets/imx-cross-sell.js`) en vez de
un script inline — el cajón del carrito se re-renderiza con
`innerHTML =`, que no ejecuta `<script>` inyectados.

Verificado en vivo con un carrito real (cookie jar + `cart/add.js`):
brecha calculada correcta ($776 con carrito de $23), 3 sugerencias del
departamento correcto y en rango de precio, deduplicado confirmado (el
producto agregado deja de sugerirse), y desaparición confirmada al
cruzar el umbral real ($1,221, clase `--achieved` aplicada). Los 22
handles de subcategoría se verificaron uno por uno con `curl` antes
del push — todos 200.

### Bloque 3 — Ficha técnica

Un solo metafield, `custom.especificaciones` (lista de texto, una
línea "Etiqueta: valor" por dato) en vez de metafields sueltos o un
metaobject: el catálogo es heterogéneo (cañas, miras, rifles,
municiones no comparten esquema) y quien captura es una persona en el
admin, no un script. Se renderiza en `sections/main-product.liquid`
**fuera** del `case` de bloques, mismo patrón y mismo motivo que el
widget de Judge.me — no se puede tocar `templates/product.json` desde
el repo. Sin el metafield poblado no imprime nada; verificado en vivo
que un producto sin datos da 0 coincidencias de `im-ficha` y cero
errores de Liquid.

**Entregable adicional**: `FICHAS-TECNICAS-PENDIENTES.md`, con el
borrador ya extraído (no inventado) de las descripciones reales de los
35 productos del conjunto de Meta — 34 de 35 con datos completos, 1
(Binocular Kampak Visión Nocturna) con dos datos marcados `[FALTA]`
porque no están publicados en ningún lado del catálogo.

### Bloque 4 — Combos nuevos

**Entregable**: `COMBOS-NUEVOS-PENDIENTES.md`. Hallazgo que cambió el
planteamiento: de los 9 combos que ya vende la tienda, 5 están
agotados como SKU, pero sus componentes por separado sí están en
stock — el pendiente pasa de ser "decisión de compra" a "alta de
producto" desde inventario existente. Tres combos propuestos con
componentes verificados disponibles hoy (Okuma Revenger 8'0" —
literalmente el combo agotado, rearmable; Blue Fox Power Boat +
Ranco; Rapala Corux + Gimbel + caja), todos con precio de combo por
debajo de la suma de partes, siguiendo el patrón de los combos
existentes.

### Cierre real: se recuperó el acceso por API y se ejecutó todo (24 ago, noche)

Los bloques 3 y 4 iban a quedar como tarea manual del dueño porque
`SHOPIFY_ADMIN_TOKEN` no estaba en el entorno. Él preguntó si no había
forma de automatizarlo — y al revisar el repositorio resultó que sí,
que llevaba semanas documentada, y que **mi respuesta inicial fue
incorrecta en cuatro puntos** (le dije que creara una app nueva, que le
agregara scopes que ya tenía, por una ruta de navegación que no existe
en esta tienda, y que no había token cuando estaba vivo y funcionando).
El incidente completo y las reglas que quedan están en
[`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md),
documento nuevo que es ahora la fuente de verdad para el token.

De esa revisión salió un riesgo real, no solo documental: **la lista de
scopes de `INSTRUCTIVO-APP-SHOPIFY.md` estaba congelada en los 8 de
julio.** Shopify concede exactamente lo que va en la URL de
autorización — no hace unión con lo ya concedido — así que reautorizar
con esa lista habría degradado el token y roto
`sincronizar-canal-meta.py` y `conciliar-inventario.py`, con un fallo
que habría aparecido días después sin causa aparente. Se corrigió la
URL (13 scopes) y se verificó que las dos copias del repo coinciden.

Con el token regenerado por el flujo OAuth documentado:

- **Bloque 3 completado**: `scripts/cargar-fichas-tecnicas.py` cargó el
  metafield en los **35 productos**, cada uno verificado por relectura
  tras escribir. El script parsea `FICHAS-TECNICAS-PENDIENTES.md` en
  vez de duplicar los datos, para que el documento que revisa el dueño
  y lo que se sube no puedan desincronizarse; y omite las líneas
  marcadas `[FALTA]`, así que el Binocular Kampak subió con sus 4 datos
  reales y sin inventar los dos que no están publicados. Verificado en
  vivo con `curl`, incluido el caso de valores con dos puntos
  (`Relación de transmisión: 5.0:1`), que el snippet parte
  correctamente.
- **Bloque 4 completado a medias, a propósito**:
  `scripts/crear-combos.py` creó los 3 combos **en borrador**, con
  imágenes de sus componentes, ficha técnica y stock. No se publicaron:
  un combo es un producto vendible con precio, y esa decisión es del
  dueño. Confirmado con `curl` que dan 404 en la tienda.

**Hallazgo del stock, que no estaba en la propuesta original:** los
componentes están a 1 unidad cada uno, así que cada combo admite
**1 sola pieza**, no las cantidades que sugería el documento. Y como
Shopify no descuenta componentes al vender un combo, publicarlos con
la caña también a la venta por separado crea riesgo de sobreventa real.
Documentado como aviso en `COMBOS-NUEVOS-PENDIENTES.md`.

### Cierre de la credencial (24 ago, noche)

Con el token regenerado quedaron tres tareas de higiene, de las cuales
dos se cerraron y una se descartó con conocimiento de causa:

- ✅ **Secret de GitHub verificado funcionando.** En vez de asumirlo, se
  disparó el workflow a mano (`workflow_dispatch`) y terminó en
  `success`. Se confirmó leyendo `deploy-shopify.py` que **autentica
  antes** de revisar qué archivos cambiaron (`resolve_theme` llama a
  `GET /themes.json`), así que el `success` no es un falso positivo por
  "no había nada que subir" — el token del secret sí autentica. Lo que
  ese test **no** puede distinguir es si el secret tiene el token nuevo
  o el viejo sigue siendo válido; para el deploy da igual, pero conviene
  no afirmar de más.
- ✅ **Secreto de la app rotado** por el dueño, ya que pasó por el chat.
  No invalida el token de acceso ya generado.
- ❌ **La variable de entorno en claude.ai/code no se configuró** — el
  dueño no encontró dónde. Se decidió no insistir: **la consecuencia
  real es que la próxima sesión no va a tener el token** y habrá que
  repetir el flujo OAuth (~5 min, documentado). Es un fallback válido,
  no un bloqueo.

> ⚠️ Se corrigió aquí una idea equivocada que conviene dejar por
> escrito: **el token no está en el instructivo.** Ahí vive el
> *procedimiento* para regenerarlo, nunca el valor — por la política de
> la sección 34. Si se quiere acceso instantáneo en la siguiente
> sesión, el token tiene que estar guardado fuera del repo (gestor de
> contraseñas del dueño o variable de entorno), no "sacarse del
> instructivo".

### Cierre de la Ola 7

Los 4 bloques quedaron ejecutados. Bloques 1-3 desplegados y
verificados en vivo con `curl` (cache-busting confirmado, cero errores
de Liquid, casos límite correctos). Bloques 3 y 4 ejecutados por API
tras recuperar el acceso, con verificación por relectura en cada
escritura.

`graphify update .` corrido en los dos grafos del repo:
- `tema-shopify/`: **461 nodos, 705 aristas, 41 comunidades** (sube de
  460/705/40 por los 2 snippets nuevos de las Olas 7).
- `scripts/`: **87 nodos, 144 aristas, 9 comunidades**, tras sumar
  `cargar-fichas-tecnicas.py` y `crear-combos.py`.
- Mapa 3D regenerado con `scripts/rebuild-mapa-3d.py` (460 → 461 nodos).

### Los combos, publicados (24 ago, cierre)

El dueño resolvió las dos decisiones abiertas y los 3 combos salieron
a la venta. Sobre el riesgo de sobreventa eligió **descontar los
componentes a mano**, y la razón por la que se descartó la alternativa
más segura es un dato que apareció al revisarlo: **los 7 componentes
están dentro del conjunto anunciable de Meta**,
así que despublicarlos habría encogido el catálogo anunciable un 20% —
justo lo contrario del objetivo con el que se subió el piso de precio
a $500. Con el volumen actual de pedidos el riesgo de colisión es
bajo; queda anotado en `PENDIENTES.md` como tarea manual permanente, a
revisar cuando suba el volumen.

**Trampa técnica que costó una vuelta:** poner `status: "active"` por
API **no publica** el producto. Los tres seguían dando 404 en la tienda
y sin aparecer en la colección, aunque el admin los mostrara activos —
porque un producto creado por API no queda publicado en ningún canal
de venta. Hay que publicarlo explícitamente con la mutación GraphQL
`publishablePublish`, la misma que ya usa
`scripts/sincronizar-canal-meta.py`. Los canales no se eligieron a
ojo: se consultó a cuáles estaba publicado un combo existente
(Online Store, Point of Sale, Facebook & Instagram) y se replicó.

Verificado en vivo tras publicar: los 3 dan HTTP 200, la colección
`combos` pasó de 9 a 12, cada uno con ficha técnica y aviso de MSI,
cero errores de Liquid.

**En Meta el conjunto anunciable pasó de 35 a 38 productos.** La
sincronización no fue instantánea — en la primera consulta solo había
entrado 1 de los 3 (35→36) y los otros dos aparecieron minutos
después, que es el comportamiento diferido normal de Shopify hacia el
catálogo (sección 32). Vale la pena anotarlo porque invita a un falso
diagnóstico: consultar el conjunto justo después de publicar y
concluir que la sincronización falló, cuando solo va con retraso.

Este es además el resultado que perseguía el bloque 4: los tres combos
son de ticket alto ($999-$1,499) y entran solos al conjunto por la
regla de precio ≥$500, sin tocar la campaña.

**No queda nada de código pendiente ni ninguna decisión bloqueante.**
Los pendientes restantes del proyecto son dos, y ambos por decisión
explícita del dueño de posponerlos: los 12 productos sin conciliar de
`PRODUCTOS-PENDIENTES.md` (son diábolos que no se anuncian y solo
afectan la exactitud del inventario mostrado) y TikTok cuando exista
la cuenta.

La decisión de negocio sobre Shopify Payments, que llevaba abierta
desde el 14 de agosto, **se cerró el 25 de agosto**: se conservan los
rifles y pistolas de aire y no se vuelve a usar Shopify Payments
(sección 30).

Con esto, los 4 pendientes diferidos de la Ola 6 quedan cerrados o
con su siguiente paso ya resuelto y documentado. No queda ningún
pendiente sin un dueño claro (código terminado, o documento listo
para ejecutar del lado del dueño).

---

## 48. Ola 8: auditoría previa a campaña y sus correcciones (25 ago)

El dueño pidió una auditoría con agentes especializados antes de invertir
en la siguiente campaña. Se lanzaron dos en paralelo — **Persona
Walkthrough** (recorrido cognitivo de un pescador de 48 años de
Cuernavaca llegando desde Instagram) y **Paid Social Strategist** — y
sus hallazgos se verificaron uno por uno antes de aceptarlos.

### El hallazgo que reordenó todo: los anuncios llevaban 4 días apagados

La cuenta publicitaria tiene un **tope de gasto de $285 MXN consumido al
100%**. Campaña, conjunto y anuncio reportaban `ACTIVE` y **cero
incidencias** — Meta no marca el tope de cuenta como problema a nivel de
anuncio, así que **se apaga en silencio**. Último día con impresiones:
21 de agosto.

Cruzando fechas apareció lo importante: **los anuncios pararon el 21 y
todas las mejoras se desplegaron del 22 al 25**. Es decir, **ningún
visitante de pago ha visto la tienda mejorada**, y la métrica que
usábamos como diagnóstico (721 vistas → 3 carritos, 0.4%) mide la tienda
*vieja*. El objetivo de la siguiente inversión no es vender: es obtener
la primera medición honesta.

> Esto ya estaba escrito en `INSTRUCTIVO-FACEBOOK-ADS.md` — que el tope
> hay que **subirlo**, no basta con reactivar la campaña — y no se
> aplicó. Segunda vez en este proyecto que una trampa documentada se
> repite por no releer la documentación propia.

### Tres correcciones a los agentes (y una a mí mismo)

Ninguna se aceptó sin verificar. Tres afirmaciones no sobrevivieron:

1. **«17 productos agotados por ficha»** → eran **8**. El agente contó
   dos elementos de badge por producto. El fondo seguía siendo válido y
   peor de lo que sonaba: **54 tarjetas** en el módulo de recomendados.
2. **«El campo de marca está mal: Gimbel en un producto Araty»** →
   **Rapala sí es dueño de Sufix**. El campo `vendor` es el
   distribuidor, no el fabricante; la convención es legítima aunque
   confunda.
3. **«No reviews aparece 3 veces por ficha»** — verificado que sí está
   en el HTML… **pero con `style='display:none'`**. Judge.me lo revela
   por JS solo cuando hay reseñas. **No es visible para el usuario y no
   había nada que arreglar.** Es el riesgo que el propio agente había
   advertido (analizó HTML sin ejecutar JavaScript) y que yo repetí en
   mi informe sin comprobarlo. Falso positivo de la misma familia que el
   de «Agotado» de la Ola 6 y el de «Ver todos los detalles» de la
   Parte A: **en este tema, la presencia de un texto en el HTML no
   significa que se vea.**
4. **Mi propio informe** afirmó que «el tráfico pagado aterriza en
   /todo-pesca». Es catálogo dinámico (`product_set_id` presente), así
   que **cada tarjeta enlaza a su ficha de producto**; solo la tarjeta
   final del carrusel iba a la colección. El hallazgo era real pero
   estaba sobredimensionado.

### Ejecutado en Meta (todo queda en PAUSA por decisión del dueño)

El dueño pidió explícitamente encender el gasto **al final**, con todo
pulido, en vez de ir corrigiendo en vivo.

- **Anuncio corregido**: el texto prometía «⚡ ENVÍO GRATIS en este
  pedido» y **12 de los 38 productos anunciables (32%) están por debajo
  de $799**, así que era falso para uno de cada tres clics. Nuevo texto
  honesto («Envío gratis desde $799») que además comunica meses sin
  intereses y pago en OXXO/7-Eleven. Destino del carrusel movido a
  `/collections/combos`, donde **los 7 productos disponibles cruzan
  $799** — la promesa sí se cumple.
- **Segmentación acotada**: fuera Instagram feed (consumía 14.7% del
  gasto para 2.1% de los resultados: $5.38 por vista contra $0.64 en
  Facebook feed), y público reducido a **hombres de 45 a 65** (las
  mujeres consumían 37% del gasto para 18% de las vistas; los hombres
  45+ cuestan $0.41-0.68 por vista).
- **Evento de optimización a `ADD_TO_CART`**: optimizar a
  `CONTENT_VIEW` hizo el tráfico 6 veces más barato y ~10 veces peor en
  tasa de carrito (0.4% contra 3.8% histórico). **Meta no permite
  cambiar el evento de un conjunto ya publicado**, así que se creó el
  conjunto v3 y se pausó el v2 — sin borrarlo, siguiendo la regla de
  «pausar, nunca borrar».

> Trampa de API documentada: crear un creativo de catálogo dinámico
> falla con «especificación no válida de la historia del objeto» si
> `template_data` no incluye `name` y `description` con los tokens
> `{{product.name}}` / `{{product.price}}`. El GET del creativo
> existente **no devuelve esos campos**, así que replicarlo tal cual no
> funciona.

### Ejecutado en el sitio

- **Combo sugerido en la ficha de los componentes.** Era el hallazgo de
  más impacto en ticket promedio y estaba invisible: la caña de $549
  está a $61 del envío gratis, y su combo cuesta $999 contra $1,148 de
  las piezas sueltas. Resuelto **con datos, no con texto fijo**: un
  metafield `custom.combo_sugerido` (referencia a producto) conecta cada
  componente con su combo, y el `compare_at_price` de los combos se fijó
  a la **suma real de sus partes** — comprobable comprándolas por
  separado. El snippet calcula diferencia, ahorro y si cruza el umbral,
  todo desde datos vivos, así que **ninguna cifra puede quedar
  mintiendo** si cambia un precio.
- **Escaparate del inicio con piso de precio.** Abría con un plomo de
  **$1.95**: el filtro de la Ola 6 solo miraba disponibilidad, y el
  plomo está disponible. Ahora hay un mínimo configurable —setting
  **`destacados_precio_minimo_centavos`**, default `30000` ($300), en
  el grupo "Envíos" del personalizador— y el escaparate de Pesca abre
  con los tres combos.
- **Recomendados recortados**: de **54 tarjetas a 12**, saltando
  agotados. La ficha bajó de **481 KB a 301 KB** (−37%) y los 8
  «Agotado» visibles desaparecieron.
- **Carrito vacío**: mostraba «Envío: $189 MXN» — anclaba en el costo
  antes de que el cliente tuviera nada. Ahora dice «Envío gratis desde
  $799».
- **Ubicación y redes**: el footer dice «Enviamos desde **Cuernavaca,
  Morelos**» (las palabras Cuernavaca y Morelos **no aparecían en
  ninguna página**, y el miedo central del comprador simulado era la
  tienda fantasma), y se agregó el enlace a **Instagram**, que faltaba
  pese a que el tráfico viene de ahí. El enlace se escribió
  directamente en el `settings_data.json` **vivo** por Admin API —
  lectura, modificación de una sola clave y escritura — porque ese
  archivo no se despliega desde el repo y el valor existía vacío, así
  que un `default` en el schema no habría surtido efecto.

### Verificado en producción tras desplegar

Cero errores de Liquid en home, ficha y carrito. Combo sugerido
renderizando con las cifras correctas («$999, ahorras $149, incluye
envío gratis»), escaparate abriendo con combos, recomendados en 12
tarjetas sin agotados, carrito vacío con el mensaje en positivo,
Cuernavaca e Instagram presentes.

### Una recomendación que quedó fuera de alcance a propósito

La auditoría pedía **filtros por tipo de producto en las colecciones
grandes**: `/collections/todo-pesca` tiene 306 productos en 20 páginas y
solo dos filtros (disponibilidad y precio), ninguno por tipo. El agente
lo señaló como el punto exacto donde el comprador simulado casi
abandona, buscando "cañas" sin encontrar cómo filtrarlas.

**No se implementó, y no por olvido:** en OS 2.0 los filtros de
colección **no se configuran en el tema**, salen de la app **Search &
Discovery** en el admin de Shopify. No hay forma de agregarlos por
código desde aquí. Verificado tras el despliegue que siguen siendo dos.

Queda anotado en `PENDIENTES.md` como tarea del dueño. Se deja escrito
aquí porque es el tipo de recomendación que se evapora entre una ola y
la siguiente: no aparecía en ningún lado hasta esta revisión.

### Lo que queda del lado del dueño

- **Subir el tope de gasto** y reanudar (decisión suya: al final, con
  todo pulido).
- **Filtros por tipo en las colecciones grandes** (app Search &
  Discovery) — ver arriba.
- **Fotografía**: 2 imágenes en el combo de $999, 1 en la caña de $549.
  Es el bloqueador dominante del recorrido de compra y no se puede
  resolver por código.
- **Reseñas de producto**: hay 8 a nivel tienda y 0 por producto. La
  meta correcta es volumen creíble (30+, promedio real 4.5-4.8), no
  defender el 5.00 actual.
- **Decisión de fondo abierta**: la mediana del catálogo es $149 y el
  umbral de envío gratis es $799. Bajarlo a $599 con $99 fijo alinearía
  la promesa con lo que la tienda vende de verdad. Es una decisión de
  margen, y con cero compras reales todavía no hay evidencia de dónde
  está la demanda.

---

## 49. Los 7 que "llegaron a pagar" eran el dueño (25 ago)

Antes de encender la campaña, el dueño aportó la captura de sus
**pedidos abandonados de Shopify** — el dato que yo no podía leer porque
el token no tiene `read_orders`. Corrige una interpretación que el
proyecto arrastraba desde la sección 46 y que yo mismo repetí en la
auditoría de la sección 48.

### El dato

En toda la historia de la tienda hay **4 checkouts abandonados**, y los
cuatro son de **Emiliano López Costa**, el dueño:

| Fecha | Monto |
|---|---|
| 29 jul | $302 |
| 14 ago | $499 |
| 17 ago | **$738** |
| 23 ago (sábado) | $257 |

El de $738 del 17 de agosto **ya estaba identificado** como prueba suya
en la sección 35 ("Error de lectura 3 — la conversión que era del propio
dueño"). Lo nuevo es que **los cuatro lo son**.

### Lo que corrige

Cruzado con Meta: el pixel registra **7 `add_payment_info`**, y Shopify
tiene **4 abandonos + el pedido #1005 = 5 sesiones del dueño** que
llegaron a esa pantalla.

**Ningún cliente real ha llegado nunca a la pantalla de pago**, o casi
ninguno. La narrativa que veníamos repitiendo — *"7 personas llegaron a
pagar y ninguna compró, algo pasa en el checkout"* — es en su mayor
parte un artefacto de las pruebas del dueño.

**No hay evidencia de que el checkout espante a nadie.** El cuello de
botella está arriba, en vista → carrito, que es exactamente lo que
atacan las Olas 1-8 y que nunca se ha medido con tráfico real.

> Por qué costó tanto verlo: Shopify solo crea registro de checkout
> abandonado cuando el visitante deja datos de contacto. Los ~19
> `initiate_checkout` restantes que reporta Meta abandonaron antes de
> escribir su correo, así que no dejaron rastro en el admin. Los únicos
> que sí llegaron a dejar datos fueron las pruebas del dueño.

### La regla operativa que sale de esto

**No hacer compras ni checkouts de prueba con la campaña activa.** Si es
imprescindible, anotar día, monto y pasarela en el momento. Seis meses
de lectura del embudo quedaron contaminados por cinco sesiones propias,
y eso nos hizo perseguir un problema de checkout que no existía.

Con esa regla en pie, el paro duro sí es válido hacia adelante: **6 o
más `add_payment_info` con 0 compras → detener**, porque esta vez sí
serían clientes reales.

### Segundo error corregido: el aterrizaje pagado estaba 42% muerto

Al mover el destino del carrusel a `/collections/combos` (Ola 8) **no se
reevaluó** la decisión de la sección 46 de dejar publicados los combos
agotados. Esa decisión era correcta cuando nada apuntaba ahí; dejó de
serlo al convertir esa colección en el aterrizaje de tráfico pagado:
**5 de 12 combos estaban agotados, el 42% de la página de destino**.

Corregido sumando una segunda regla a la colección *smart*
(`306265981005`): `variant_inventory greater_than 0`, en modo AND con
la de `type equals Combos`. Los agotados **siguen publicados y
vendibles** por otras vías — solo dejan de ocupar la vitrina que paga el
anuncio, que es lo que el dueño autorizó.

Verificado en vivo: la colección quedó en **7 productos, 0 agotados**,
todos entre $920 y $1,499 — es decir, **todos cruzan los $799**, así que
la promesa de envío gratis del anuncio ahora sí se cumple para el 100%
del aterrizaje.

> Lección general: **una decisión correcta en un contexto puede volverse
> incorrecta cuando cambia el contexto.** Al redirigir tráfico hacia
> cualquier página, hay que releer qué decisiones se tomaron sobre esa
> página cuando nadie la miraba.

### Decisión del dueño sobre fotografía, y su costo

34 de los 38 productos anunciables tienen **una sola imagen**, de
catálogo de proveedor, algunas de 400×400. Ningún producto de la tienda
tiene 5 o más. El agente adversarial lo señaló como el gate del
lanzamiento.

**El dueño decidió lanzar sin agregar fotos** — solo dispone de las
oficiales de sus proveedores. Queda escrito el costo concreto de esa
decisión, que no es un reproche sino lo que determina qué se podrá
concluir del resultado:

> Si la tasa de carrito sale por debajo de 1.5%, **no se va a poder
> distinguir** si fallaron las ocho olas de trabajo o si lo mató la
> evidencia visual. Se compra la medición con un confusor conocido
> dentro.

### Veredicto y protocolo de medición

Con lo anterior corregido, **el veredicto cambió a "encender"** — y lo
que lo cambió fue el dato de los checkouts abandonados, no un ajuste de
criterio. El consejo previo ("no lances hasta tener fotos") se apoyaba
en que había un problema grave sin explicar: siete personas en la
pantalla de pago y cero compras. **Ese problema no existía.**

Al no haber evidencia de falla en el checkout, lo que queda por medir es
justo el escalón que las Olas 1-8 arreglaron y que nunca se probó con
tráfico. Encender deja de ser un salto de fe y pasa a ser la medición
que faltaba.

**Qué se está comprando.** A $55/día no se compran ventas: se compra
**un número**, la tasa de carrito de la tienda mejorada.

- Ventas esperadas el mes 1: **entre 1 y 3**. Si la cadena es mediocre,
  0 o 1. **Cero ventas en 30 días es compatible con una tienda que
  funciona** a este presupuesto.
- El conjunto **no va a salir de fase de aprendizaje** (Meta quiere ~50
  eventos/semana; aquí saldrán 5-9 carritos). **La semana 1 no es
  señal.**

**Métrica de corte, a las ~500 vistas de producto** (~3 semanas,
~$1,100). Tasa de carrito = `add_to_cart` / `view_content`, solo del
conjunto v3, con `time_range` explícito (nunca `date_preset` ni
`amount_spent` — sección 40):

| Resultado | Lectura | Acción |
|---|---|---|
| **< 1.5%** | El trabajo de sitio no movió la parte alta | Alto. No iterar creativos: el problema es ficha y oferta |
| **1.5% – 3%** | Ambiguo | Continuar solo con un cambio específico decidido de antemano |
| **≥ 3.5%** | La parte alta funciona | Seguir y mover la atención al fondo del embudo |

**Paro duro, independiente de lo anterior:** 6 o más `add_payment_info`
con 0 compras → detener. Reproduciría el patrón 7→0 sobre la tienda
mejorada, y esta vez **sí serían clientes reales** (con la regla de no
probar el checkout con la campaña activa en pie). Más gasto no lo
diagnostica.

**Último paso, del dueño:** subir el tope de cuenta a **mensual**
(~$1,200-1,700), no semanal — un tope que se agota cada 7 días es un
apagón programado cada 7 días. Recordar que cambiarlo **reinicia
`amount_spent` a cero**.

### El informe visual de esta auditoría

El informe completo, con el veredicto, la corrección del error de
aterrizaje, la tabla de checkouts abandonados y el protocolo de
medición, vive publicado en:

> https://claude.ai/code/artifact/e7fed295-3b59-4bc3-bb59-f9036cc2055c

Es privado por defecto; se comparte desde el menú de la propia página.
**Se actualiza en el mismo URL** — republicar el archivo pasando esa
dirección como `url`, nunca publicar de nuevo sin ella, o nace un
informe aparte y el enlace que ya circula se queda viejo.


---

## 50. Conciliación de inventario del 25 de agosto y el choque de los dos combos Revenger

Primera conciliación desde el 15 de agosto — **10 días**, no uno, y se
nota: 87 actualizaciones contra las 12-25 de una corrida diaria. Corrida
con el `--dry-run` nuevo antes de escribir, y verificada contra
producción después. 0 errores.

| | |
|---|---|
| Filas del conteo | 1,183 |
| 🟢 Verde (sin cambios) | 254 |
| 🟡 Amarillo (actualizado) | 83 |
| 🔴 Rojo | 743 (714 no existen online + 29 agotados) |
| ⬜ Gris (sin tocar) | 103 |
| Escrituras aplicadas | **87, 0 errores** |

### `--dry-run`, agregado ese mismo día

`scripts/conciliar-inventario.py` calculaba la lista completa de cambios
y la escribía de inmediato: no había forma de revisar antes de tocar el
inventario. Como la lista ya está armada **antes** del primer `POST`, el
modo seco muestra exactamente lo que se escribiría, no una aproximación.
Imprime cada variante (`antes -> después`) y cuántas quedarían en 0 —
el dato que importa con campaña por encender.

### Lo que movió el conteo, del lado del anuncio

**4 productos a 0**, o sea fuera de la vitrina: Rifle Quetzalcoatl
($5,388), Caña Storm Maupiti Tele Surf ($749), Hilo Araty 0.40mm Red
Spider ($46) y Bullets Nakashi ($34). El Quetzalcoatl es uno de los 3
productos con reseña real de Judge.me — la reseña sigue visible, el
producto ya no se puede comprar.

**19 productos volvieron a estar disponibles**, entre ellos tres de
ticket alto: Rifle Black Hawk ($5,953.50), Telescopio Celestron ($3,400)
y el **Combo Okuma Revenger 8'0" (2.45m) a $849** — que es el que crea
el problema de abajo.

Conjunto anunciable de Meta: **38 → 39**. La colección `combos`, que es
el aterrizaje pagado, pasó de **7 a 8 productos**, todos disponibles y
todos por encima de $799 (la regla de disponibilidad de la sección 49
funcionó sola, sin intervención).

### 🔴 El choque: dos combos Revenger en la misma vitrina

El aterrizaje pagado ahora muestra, uno junto al otro:

| Producto | Precio | Qué es |
|---|---|---|
| Combo Okuma Revenger 8'0" **(2.45m)** | **$849** | Combo de fábrica, un solo SKU (`RV-S-802M-40`). Caña de fibra de vidrio, carrete talla 40, relación 5.0:1, línea preinstalada. **Volvió a stock hoy, 3 unidades** |
| Combo Okuma Revenger 8'0" **(2.40m)** — Caña + Carrete | **$999** | El que armé en la Ola 7-8 *porque el de arriba estaba agotado*. Caña `RV-S-802M` ($549) + carrete `RV-80` ($599), relación 4.8:1. `compare_at` $1,148 |

**Técnicamente son productos distintos** — distinto carrete, distinta
relación de transmisión, distinta construcción. **Comercialmente, en una
página de colección, se leen como el mismo combo a dos precios**, y el
mío es el caro. Es exactamente la fricción que nueve olas de trabajo
llevan quitando, y la reintroduje yo sin querer: el combo de $999 nació
como sustituto de uno agotado, y el original volvió.

**No lo resolví por cuenta propia** — es decisión de catálogo y margen
del dueño, no de código. **Decisión tomada el mismo día: ocultar el de
$999 de la colección** mientras haya stock del de $849.

### Cómo se ocultó (y por qué así)

La colección `combos` (`306265981005`) es **smart**, así que no admite
excluir un producto a mano — solo reglas. Se le agregó una tercera:

```
type equals "Combos"  AND  variant_inventory > 0  AND  tag not_equals "oculto-en-combos"
```

y se etiquetó el combo de $999 con `oculto-en-combos`. **Para devolverlo
a la vitrina basta con quitarle la etiqueta**, sin tocar reglas ni
precios — que es justo lo que hará falta cuando se agoten las 3 unidades
del de $849.

Se eligió la etiqueta en vez de cambiarle el `product_type`, que también
lo habría sacado de la colección: el `product_type` es "Combos" de
verdad, y cambiarlo por conveniencia de vitrina rompería el conjunto de
Meta, el escaparate del home y cualquier lógica futura que lea ese campo.
La etiqueta describe una decisión de merchandising, que es lo que
realmente es.

**Cuidado con la latencia.** Shopify recalcula la membresía de una
colección smart de forma **asíncrona**: al releer justo después del
cambio seguía diciendo 8 productos. Tardó cerca de **12 segundos**. No
es un fallo — hay que reconsultar, no repetir la escritura.

**Verificado en vivo:** la colección quedó en **7 productos**, todos
disponibles y todos por encima de $799. La ficha del combo de $999 sigue
en **HTTP 200, activa y comprable** por enlace directo — se ocultó de la
vitrina, no se despublicó.

### Un detalle que se deja a propósito

La ficha de la **Caña Okuma Revenger 8'0" ($549)** y la del **Carrete
RV-80 ($599)** siguen promoviendo el combo de $999 por el metafield
`custom.combo_sugerido`, y **eso está bien**: ese combo *es* exactamente
esas dos piezas, que por separado cuestan $1,148. Para quien ya está
viendo la caña, el de $999 sigue siendo la mejor oferta — el de $849
lleva otro carrete. El problema era la comparación lado a lado en la
cuadrícula de la colección, no el upsell.

### Los 103 grises

87 sin ninguna llave (artículos que solo existen en piso de venta, es lo
normal) y **16 por `No Parte` duplicado en el POS**, en 7 códigos:
`9291PS`, `IGT57`, `53003`, `MN094`, `10005701BZ00`, `P611004925557`,
`15SENUEL012QI`. Mientras un mismo código apunte a productos distintos,
esas filas no se conciliarán solas — se corrige en el POS, no en Shopify.

`Vinculados por código B1: 0` **no es un fallo**: significa que el cruce
por SKU resolvió todo lo que existe en Shopify y la segunda llave no tuvo
que rescatar nada.

---

## 51. Verificación final y la barra de promesas (25 ago)

Antes de reactivar el gasto, el dueño pidió una verificación de cierre
con agentes. Se lanzaron tres. **Uno entregó, dos se quedaron colgados**
(23 minutos sin escribir, sin aviso de término) — y conviene que quede
escrito, porque no dejó el trabajo a ciegas: esos dos cubrían el estado
del sitio y el de la cuenta de Meta, que ya se habían verificado en vivo
por cuenta propia. **Un agente que no responde no es una excusa para no
tener el dato.**

### Lo verificado en vivo (no contra el manual)

- **Tema sincronizado**: los 8 archivos clave del repo son idénticos al
  tema en vivo. El único que "difería" era `config/settings_schema.json`,
  y la diferencia es que Shopify serializa `\/` en vez de `/` dentro del
  JSON. **No es drift** — vale la pena recordarlo antes de perseguirlo
  otra vez.
- **Cero errores de Liquid** en home, colección, `/cart`, políticas y
  fichas. **Velocidad 0.36-0.47 s**, muy por debajo del techo de 1.3 s.
- **Carrito de punta a punta con cookie jar, en los dos lados del
  umbral**: a $849 dice "Tu envío es GRATIS"; a $225 dice "Te faltan
  $574 MXN" (resta exacta) más la línea de "$189 MXN" antes del
  checkout. MSI aparece a $849 y **no** a $225 — la condición de
  `msi_minimo_centavos` ($300) funciona.
- **Los 7 combos del aterrizaje** están disponibles y todos sobre $799.
  Se cargó la ficha técnica del de $849, que era el único sin ella
  (estaba agotado cuando se armó el borrador, por eso quedó fuera de
  los 35 originales; el documento pasó a 36).

### El hallazgo del agente que sí valía, y la parte que no

El agente de recorrido de comprador encontró algo real y verificable:
**en `/collections/combos` no era visible ninguna de las cuatro promesas
del anuncio.** Comprobado: los únicos `799` y `OXXO` del HTML viven
dentro de `<cart-drawer class="drawer is-empty">`, y
`component-cart-drawer.css:118` (`cart-drawer-items.is-empty +
.drawer__footer{display:none}`) oculta ese bloque con el carrito vacío.
Texto presente, invisible — el patrón de siempre.

**Su recomendación principal, en cambio, partía de una premisa falsa.**
Proponía "cambiar el destino del anuncio de la colección a la ficha"
como el cambio de mayor impacto. Ya era así: el creativo lleva
`product_set_id: 1455189226500365`, es catálogo dinámico, y cada tarjeta
enlaza a su propio producto con UTMs. La colección es solo el enlace de
la **tarjeta final** (`multi_share_end_card: true`). Verificado leyendo
los `url` reales del conjunto en la API de Meta.

Es exactamente el error que se cometió en este proyecto en agosto ("el
tráfico pagado aterriza en /todo-pesca") y que ya está documentado.
**Reaparece: un agente lo repitió sin conocerlo.** El hallazgo del
aterrizaje sigue siendo válido, pero su alcance es una fracción del
tráfico, no todo.

### El cambio: `sections/im-barra-promesas.liquid`

Franja fina arriba del header, en todas las páginas:

> Envío **gratis** desde $799 · Entrega en 2 a 7 días hábiles · Meses sin
> intereses · Efectivo en OXXO y 7-Eleven · **Enviamos desde Cuernavaca,
> Morelos**

Lee `settings.envio_umbral_centavos` y `settings.envio_tiempo`, así que
el umbral no se puede volver a desincronizar — el problema que la Ola 2
vino a resolver.

**No se reusó `sections/announcement-bar.liquid`**, que ya existía sin
estar en ningún grupo, por dos razones concretas: es `position:fixed`
con `z-index 99999` (taparía el header `sticky on-scroll-up`) y su fondo
es `#f0f9eb`, verde muy claro pensado para tema claro, mientras este
sitio es negro. Se deja intacta.

El origen "Cuernavaca, Morelos" se sube aquí a propósito: hasta hoy solo
aparecía en el footer, y es la señal de confianza más fuerte que tiene
la tienda frente a un comprador local que teme la tienda fantasma.

### Dos defectos propios, corregidos antes de dar el despliegue por bueno

**1. `deploy-shopify.py` subía en orden alfabético → HTTP 422.**
`sections/header-group.json` llegaba **antes** que
`sections/im-barra-promesas.liquid`, y Shopify rechaza un grupo que
referencia una sección que todavía no existe:

```
{"errors":{"asset":["Section type 'im-barra-promesas' does not refer to
an existing section file"]}}
```

Es la misma familia del incidente de `meta-pixel` (sección 39) —una
referencia que llega antes que su destino— pero **de orden, no de
omisión**: los dos archivos iban en el push, solo que en la secuencia
equivocada. Se arregló en el script, no a mano: `orden_de_subida()`
manda los `*-group.json` al final. **Regla ampliada:** si una ola agrega
un `{% render %}` o una sección nueva, el archivo va en el mismo push
**y antes** que quien lo referencia.

**2. El acento del origen habría sido invisible para media audiencia.**
Se usó `var(--brand-accent)`, que vale `#234D3B` (verde muy oscuro) y
solo pasa a `#57B58A` dentro de `@media (prefers-color-scheme: dark)`.
Como la franja está **siempre** sobre el fondo negro del sitio, un
visitante con el sistema operativo en modo claro habría visto verde
oscuro sobre negro. Fijado a `#57b58a`, que es lo que ya hacen
`.im-combo__kicker` y `.im-trust-item svg`.

> **Lección para cualquier CSS futuro de este tema:** los tokens que
> cambian con `prefers-color-scheme` **no** sirven para elementos que
> viven siempre sobre el fondo oscuro del sitio. El tema es oscuro por
> diseño, no por preferencia del visitante.

### Un cuarto falso negativo, este de método

Al verificar que el CSS llegara a producción se contó con `grep -c
im-promesas` y dio **1** — casi se concluyó que no se había desplegado.
**Shopify minifica el CSS a una sola línea**, y `grep -c` cuenta líneas,
no coincidencias. Con `grep -o | wc -l` salieron las 11 reglas.

Van cuatro instancias de la misma familia (texto en HTML que no se ve,
clase que no es la que uno recuerda, conteo que no mide lo que uno cree).
La forma general: **una búsqueda contra lo que uno recuerda no es
verificación, es una hipótesis sobre la propia memoria.** Hay que partir
del mecanismo —el snippet que lo emite, la clase que declara, lo que la
herramienta cuenta de verdad— y de ahí derivar qué buscar.

### La barra en movimiento, y el bug de CSS que se comió los espacios

El dueño mandó captura de la barra ya en producción y pidió dos cosas:
movimiento, y arreglar **"Envíogratisdesde $799"**, todo pegado.

**La causa no era un espacio faltante en el Liquid.**
`.im-promesas__item` estaba en `display: inline-flex`, y en un
contenedor flex cada corrida de texto se envuelve en un *ítem flex
anónimo*, de modo que **las secuencias de solo espacios entre ítems no
se renderizan**. Ese texto lleva `<strong>gratis</strong>` adentro, así
que quedaba partido en tres ítems y los espacios desaparecían.

> **La prueba del diagnóstico estaba en la misma captura:** los otros
> cuatro textos sí tenían sus espacios, y son justo los que **no**
> llevan `<strong>` — una sola corrida de texto, un solo ítem anónimo,
> nada que colapsar.

**Regla general que sale de aquí, reutilizable en todo el tema:** nunca
poner en `flex` (ni `inline-flex`) un elemento cuyo texto lleve
etiquetas inline adentro. Si hace falta alinear, se alinea el
contenedor, no el elemento que contiene la frase.

**El movimiento: marquesina CSS pura, sin JavaScript.** El track lleva
**dos grupos idénticos** y se anima hasta `translateX(-50%)`: al llegar
ahí el fotograma es idéntico al inicial, así que el bucle no tiene
costura. El segundo grupo va con `aria-hidden="true"` — es una copia
visual, y un lector de pantalla debe leer las condiciones **una** vez.

Dos detalles que hacen que funcione y que no son obvios:

- **La viñeta pasó de `::before` en "todos menos el primero" a `::after`
  en todos.** Es lo que hace invisible la costura: el ritmo
  texto·viñeta·texto se mantiene igual también en la unión entre el
  último ítem de un grupo y el primero del siguiente. Con la viñeta al
  frente quedaría un hueco justo ahí, una vez por vuelta.
- **`width: max-content` en el track.** Sin eso el track se encoge al
  ancho del viewport y aplasta los ítems en vez de dejarlos salir.

Pausa al pasar el cursor y con `:focus-within`, para poder leerla y
para que quien navega con teclado no persiga un objetivo en
movimiento. Respeta `prefers-reduced-motion` volviendo al layout
estático centrado —ocultando el grupo duplicado, o las condiciones
saldrían dos veces— con la misma convención de `imx-drift` e
`imx-word-in` (`assets/base.css:3750,3776`).

Se prefirió marquesina sobre un carrusel que rote mensajes porque el
carrusel **obliga a esperar** a que aparezca la condición que a uno le
importa, y aquí las cinco importan. Esto revierte a propósito una nota
que este mismo proyecto había dejado escrita en el CSS ("en móvil no se
hace scroll ni carrusel"): el dueño lo pidió viendo el resultado real,
y su criterio sobre su tienda gana sobre una nota previa. **El
comentario se actualizó en el mismo commit, en vez de dejarlo
contradiciendo al código** — que es el defecto que la sección 21 lleva
persiguiendo desde agosto.

### Pendiente para el dueño, de esta verificación

**La foto del "Combo Okuma Elite Pro" ($920) es sospechosa.** Su única
imagen es `cana-saguaro-stimula-4-1-...webp`, y la Caña Shimano Stimula
usa `cana-saguaro-stimula-2-...webp` — misma serie de fotos, marcas
distintas. Se revisaron las imágenes de los 7 combos y es **el único**
caso dudoso; los demás cuadran (`ranco1` para el Blue Fox Ranco, el SKU
`15CARRET117CH` para el Gimbel, `rapala-rubs-utility-box` para la caja).
Es evidencia de nombre de archivo, no del píxel: hay que confirmarlo a
ojo. **Resuelto el mismo día: el dueño la revisó y la foto sí
corresponde al producto.** Queda como registro de que el indicio se
persiguió hasta cerrarlo, y de que un nombre de archivo heredado no es
prueba de nada por sí solo.
