# Guía por fases — de la campaña pausada a vender con ganancia

Plan acordado el 30 de septiembre de 2026 (el porqué está en
[`ANALISIS-ESTRATEGICO-30-SEP.md`](./ANALISIS-ESTRATEGICO-30-SEP.md) y en
MANUAL §68-§69). **Se avanza una fase a la vez:** no se pasa a la
siguiente hasta cumplir la condición de "terminada".

| Fase | Qué | Estado |
|---|---|---|
| 0 | Arreglos de la ficha de producto | ✅ En vivo (30 sep) |
| **1** | **Kits a la venta** | 🟡 **EN CURSO**: esperando piezas y fotos |
| 2 | Canales gratis: Google, Mercado Libre y carrito abandonado | ⏳ |
| 3 | Reabasto y precios de la zona muerta | ⏳ |
| 4 | Encender Meta con criterio fijado | ⏳ Estructura lista y en pausa |

Leyenda: 👤 = lo hace el dueño · 🤖 = lo hago yo.

---

## Fase 0 — Ficha de producto ✅

Hecho y verificado en vivo el 30 sep:

- el costo real de envío aparece junto al precio;
- barra fija de compra en celular;
- las burbujas de WhatsApp y Cartucho ya no tapan;
- la marca "Araty" corregida en los 55 hilos.

---

## Fase 1 — Kits a la venta 🟡

**Objetivo:** que los 4 kits estén publicados, con fotos reales y el
inventario bien contado. Son el producto que se va a anunciar. Hoy
están en borrador, con precio y existencia de 2 cada uno.

| # | Paso | Quién | Detalle |
|---|---|---|---|
| 1.1 | **Apartar las piezas** de los 8 kits (2 de cada uno) | 👤 | La lista exacta, con cantidades, está en [`FOTOS-KITS.md`](./FOTOS-KITS.md). Si falta alguna pieza, avísame y cambio el kit por otra que sí haya |
| 1.2 | **Tomar 4 fotos por kit** (16 en total) | 👤 | Cómo y qué tomas, en [`FOTOS-KITS.md`](./FOTOS-KITS.md). Celular, luz de ventana, formato cuadrado, fondo oscuro |
| 1.3 | **Subir las fotos a su carpeta** | 👤 | `imagenes-productos/<kit>/`, con el nombre exacto de cada toma. Por GitHub web, igual que las 59 imágenes |
| 1.4 | Cargar las fotos a Shopify y revisarlas en celular | 🤖 | `scripts/cargar-imagenes-productos.py --doc FOTOS-KITS.md` |
| 1.5 | **Revisar cada kit en borrador** y dar el visto bueno | 👤 | Admin → Productos → buscar "Kit Listo". Revisar título, descripción, precio y lo que incluye |
| 1.6 | Publicar los 4 kits y verificar que entren al catálogo de Meta | 🤖 | Al publicarlos entran solos al conjunto de productos de la fase 4 |

**La regla de inventario de los kits.** Es la misma que ya aplica a los
combos manuales (§50):

- **Si se vende un kit:** descontar sus piezas a mano en el punto de
  venta y en Shopify.
- **Si se vende suelta una pieza que está en un kit** (por ejemplo, la
  caña Clarus): bajar la existencia de ese kit.
- La alternativa automática es la app gratuita "Shopify Bundles", pero
  obliga a rehacer los kits dentro de la app. Con 8 kits en total no
  vale la pena todavía.

**✅ Terminada cuando:** los 4 kits están publicados, con sus 4 fotos
reales, y aparecen en el conjunto de productos de Meta.

---

## Fase 2 — Canales gratis ⏳

**Objetivo:** vender sin pagar por clic, en los lugares donde la gente
ya busca.

| # | Paso | Quién | Detalle |
|---|---|---|---|
| 2.1 | **Instalar "Google & YouTube"** y crear Merchant Center | 👤 | 30 min. Pasos en [`INSTRUCTIVO-GOOGLE-Y-MERCADO-LIBRE.md`](./INSTRUCTIVO-GOOGLE-Y-MERCADO-LIBRE.md) |
| 2.2 | Sacar del canal de Google los 63 productos restringidos (armas de aire, municiones, miras, accesorios) | 🤖 | Necesita el permiso `write_publications` en el token |
| 2.3 | Revisar el diagnóstico de Merchant Center a la semana | 🤖 + 👤 | Los avisos de "GTIN no válido" son esperados; los rechazos no |
| 2.4 | **¿El vendedor "intemperie.mx" de Mercado Libre es tuyo?** | 👤 | Define todo lo que sigue con Mercado Libre |
| 2.5 | Si se va a Mercado Libre: archivo de carga y precio mínimo por producto | 🤖 | |
| 2.6 | **Confirmar que el correo de carrito abandonado está activo** | 👤 | Admin → Configuración → Notificaciones → "Pago abandonado" |

**✅ Terminada cuando:** los productos aparecen en Google Shopping, está
decidido qué pasa con Mercado Libre y el correo de carrito abandonado
está activo.

---

## Fase 3 — Reabasto y precios ⏳

**Objetivo:** tener fondo de inventario de lo que se va a anunciar, y
sacar los productos de la zona muerta de $799-$987.

| # | Paso | Quién | Detalle |
|---|---|---|---|
| 3.1 | **Cotizar el reabasto** de los combos Okuma más vistos (Elite Pro, Revenger) y de las cañas y carretes que se agotaron con los kits | 👤 | Me pasas el costo y armo los kits nuevos con la misma regla: contribución de $300 o más |
| 3.2 | Decidir el precio de los 4 productos de la zona muerta: Hilo Araty 0.70mm $812, Stimula $849, Combo Revenger $849, Boundary $949 | 👤, con mi propuesta | Salidas: subirlos a $988 o más, bajarlos a menos de $799, o meterlos a un kit |

**✅ Terminada cuando:** hay al menos 3 piezas de cada kit que se va a
anunciar, y ningún producto anunciado está en la zona muerta.

---

## Fase 4 — Meta con criterio fijado ⏳

**Ya preparado y en pausa** (§69):

- el conjunto de productos (kits y óptica que dejan $300 o más);
- el conjunto de anuncios para hombres de 55 años en adelante, a
  $55/día;
- el de retargeting, a $20/día;
- el creativo v7, con los anuncios ya en revisión.

| # | Paso | Quién | Detalle |
|---|---|---|---|
| 4.1 | **Fijar por escrito el criterio de corte**, antes de encender | 🤖 propongo, 👤 aprueba | Propuesta: vista→carrito ≥ 3% **y** 1 venta por cada $600 gastados; si no, pausar |
| 4.2 | Decidir el presupuesto (recarga del tope de la cuenta) | 👤 | Hoy quedan $326.66 disponibles |
| 4.3 | Encender los conjuntos v5 y v5-RT | 🤖 | Con autorización explícita |
| 4.4 | Leer los resultados **solo en los cortes fijados** | 🤖 | Nada de mirar día a día y cortar "cuando se ve bien" |

**✅ Terminada cuando:** la campaña llega a su corte y se decide con el
criterio escrito de antemano.
