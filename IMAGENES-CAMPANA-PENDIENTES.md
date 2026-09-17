# Imágenes de producto para la campaña siguiente

**Versión definitiva — 17 de septiembre de 2026.** Reemplaza el borrador
del mismo día, que priorizaba mal porque le cargaba el costo de envío a
productos que están **debajo** del piso de $799, donde lo paga el cliente.
Corregido y verificado contra la tienda en vivo.

`scripts/cargar-imagenes-productos.py` **lee este documento** y sube
exactamente lo que está listado. Para agregar una toma se edita este
archivo, nunca el script.

---

## Cómo se eligieron estos productos

Se cruzaron tres cosas, todas medidas, ninguna supuesta:

1. **Demanda real** — vistas de producto atribuidas a la campaña
   (`breakdowns=product_id`, acción `onsite_web_view_content`), 16 ago – 17 sep.
2. **Contribución real por unidad** — precio − costo (`inventory_items.cost`
   de Shopify) − envío, con el régimen correcto del piso de $799.
3. **Existencias** — porque no se puede escalar una campaña sobre una pieza.

### El régimen de envío, verificado en vivo

Consultado con `/cart/shipping_rates.json` sobre carritos reales:

| Precio | Qué paga el cliente | Costo neto para la tienda |
|---|---|---|
| **≥ $799** | $0 (envío gratis) | **−$189**, o **−$237.83** si es voluminoso (caja de caña $48.83) |
| **< $799** | **$189 fijos** (igual a Quintana Roo, Morelos o Nuevo León) | **$0**, o **−$48.83** si es voluminoso |

> ⚠️ **La zona muerta de $799 a $987.** Cruzar el piso cuesta exactamente
> $189 de contribución, así que un producto sólo conviene arriba del piso
> si vale **$988 o más**. Cuatro productos con existencia están hoy en esa
> zona ganando menos que si costaran $798 — el **Hilo Araty 0.70mm** está
> $13 arriba del piso y eso le cuesta **$175 por unidad**. Es decisión de
> precio, no de fotografía; queda anotado en `PENDIENTES.md`.

### El filtro que más duele

De todo el catálogo, **sólo 4 productos combinan buena economía
(equilibrio ≤ 3.5x) con existencias suficientes (≥ 2 piezas)**. Ese es el
verdadero techo de la campaña siguiente, y ninguna foto lo arregla.

---

## Grupo A — listos para escalar · fotografiar primero

Buena economía **y** más de una pieza. Son los únicos cuatro.

| Producto | Precio | Contribución | Equilibrio | Stock | Vistas |
|---|---|---|---|---|---|
| Hilo Araty 0.45mm 1000m | $436 | $285.78 | **1.53x** | 2 | 37 |
| Hilo Araty 0.70mm 1000m | $812 | $342.86 | **2.37x** | 3 | 91 |
| Binocular Kampak Visión Nocturna | $2,900 | $1,145.00 | **2.53x** | 2 | 72 |
| Caña Okuma Revenger Spinning 8'0" | $549 | $195.57 | **2.81x** | 2 | 41 |

## Grupo B — buena economía, una sola pieza

Vale fotografiarlos porque la ficha sirve igual, **pero hay que
reabastecer antes de anunciarlos.** Tres tomas cada uno, no cinco.

| Producto | Precio | Contribución | Equilibrio | Vistas | ATC |
|---|---|---|---|---|---|
| Binocular Simmons Venture 8x21 | $1,290 | $747.20 | **1.73x** | 3 | 0 |
| Binocular Bushnell PowerView 2 8x21 | $1,450 | $812.08 | **1.79x** | 2 | 0 |
| Caja Rapala Utility Box Chica | $549 | $273.86 | **2.00x** | 80 | 0 |
| Binocular Gamo 8x40 AF | $1,970 | $839.08 | **2.35x** | 5 | 0 |
| Caña Blue Fox Power Boat 6'4" | $549 | $165.28 | **3.32x** | 59 | **3 (5.1%)** |
| Carrete Shimano Sienna FG 4000 | $1,279 | $366.28 | **3.49x** | 110 | 3 |
| Caña Shimano Sellus 5'8" | $1,290 | $365.97 | **3.52x** | 68 | 0 |

## Grupo C — demanda probada, economía mala

No se fotografían todavía. Se incluyen aquí para que quede escrito por qué.

| Producto | Precio | Contribución | Equilibrio | Vistas | ATC | Nota |
|---|---|---|---|---|---|---|
| Combo Okuma Revenger 8'0" | $849 | $104.66 | 8.11x | **261** | **12** | La mejor demanda del catálogo, en zona muerta |
| Combo Okuma Elite Pro 7'0" | $920 | $77.69 | 11.84x | **290** | 8 | **AGOTADO** desde el 4-sep |

> 💡 **El Elite Pro y el Revenger tienen la demanda más alta y la peor
> economía del catálogo, y no es coincidencia: los dos están en la zona
> muerta del piso de $799.** Antes de gastarles fotos conviene resolver el
> precio. Si el Revenger bajara a $798 pasaría de $104.66 a $242.66 de
> contribución.

> 📌 **Sobre las vistas de los binoculares.** Simmons (3 vistas), Bushnell
> (2) y Gamo (5) parecen no tener demanda, pero recibieron **$6.06, $2.15 y
> $5.96** de gasto en toda la campaña. No es falta de interés, es falta de
> oportunidad: el Kampak, con $44, llegó a 72 vistas. **Son las mejores
> economías del catálogo y están sin probar.**

---

## Cuatro defectos que arreglar aunque no se genere ninguna imagen

### 🔴 1. Dos productos se llaman "Negro" y no son negros

Medido sobre la imagen, ignorando el fondo:

| Producto | Luminancia | Píxeles realmente negros | Color real |
|---|---|---|---|
| Simmons Venture 8x21 **Negro** | 125 | 7.4% | **gris grafito** |
| Bushnell PowerView 2 8x21 **Negro** | 128 | 6.7% | **gris con panel plata** |
| Kampak (referencia) | 51 | 66.5% | negro ✅ |

Son los dos de mejor economía del catálogo. Vender "Negro" y entregar gris
es devolución segura. **Corregir el título antes de anunciarlos.**

### 🔴 2. La foto del Hilo Araty anuncia otro calibre

La del **0.70mm** muestra una etiqueta legible que dice
`0,25mm - 1000m · 4,2 kg - 9,3 Lbt`. Agrupando los 55 productos Araty por
foto de origen, **47 comparten imagen con al menos otro**, y esa imagen
lleva un calibre que sólo puede ser correcto para uno. Para quien pesca,
el calibre **es** la especificación.

> 💡 **No hay que fotografiar 55 carretes.** Una sola foto genérica **donde
> la etiqueta no sea legible** —el carrete de perfil, mostrando el hilo—
> reutilizada en toda la línea, con el calibre en la ficha técnica que ya
> existe como metafield. Una imagen que no afirma nada es mejor que una que
> afirma algo falso. **Y los dos Araty son Grupo A**, así que esto es
> urgente.

### 🟠 3. Etiqueta de código de barras en el héroe del Combo Revenger

Pegada en el mango, visible al acercarse. Quitarla es retoque legítimo.

### 🟡 4. Resolución por debajo de lo que Shopify necesita para el zoom

| Producto | Hoy | Necesario |
|---|---|---|
| Binocular Kampak | **640×640** | 2048×2048 |
| Binocular Simmons Venture | **850×850** | 2048×2048 |
| Binocular Gamo 8x40 | 1600×1600 pero **blanda** al acercar | renfocar |

---

## Especificaciones (todas las imágenes)

| | |
|---|---|
| **Formato** | JPG calidad 85 |
| **Medidas** | **2048 × 2048 px, cuadrada** |
| **Por qué cuadrada** | El tema pinta las tarjetas con `--ratio-percent: 100%`; una no cuadrada se recorta sola y descuadra la cuadrícula |
| **Peso** | menos de 1 MB |
| **Fondo** | blanco o gris muy claro, **el mismo en todas** |
| **Nombre** | `{handle}-{n}-{tipo}.jpg`, exactamente como dice cada bloque |
| **Carpeta** | `imagenes-productos/` |

### Los tres tipos de toma

| Tipo | Qué es | Quién |
|---|---|---|
| 📷 **REAL** | Foto con el teléfono, luz de ventana, fondo blanco | El dueño |
| 🎨 **COMPOSICION** | El producto **real recortado** sobre un fondo generado | ChatGPT |
| 🩹 **RETOQUE** | La foto actual limpiada y subida a 2048 | ChatGPT o cualquier editor |

> ⚠️ **Nunca regenerar el producto con IA.** Son productos de marca —Okuma,
> Shimano, Rapala, Bushnell, Simmons, Gamo— y la IA se equivoca en guías,
> perillas, logotipos y marcas de modelo, ante un público de 45-65 que
> pesca y lo nota. Además es publicidad engañosa ante PROFECO y causal de
> rechazo en Meta. **La IA hace el entorno; el producto son siempre los
> píxeles reales.**

### Prompt base para composiciones

Se sube la foto real a ChatGPT. **La primera frase es la que protege del
error caro — no quitarla:**

```
Adjunto la foto real de un producto que vendo. NO modifiques el producto:
ni su forma, ni su color, ni sus logotipos, ni sus texturas, ni ninguna
marca impresa. Consérvalo pixel a pixel tal como está, recortado del
fondo blanco.

Lo único que quiero que generes es el ENTORNO detrás y debajo de él:
<ESCENA>

Requisitos:
- Imagen cuadrada 2048x2048.
- El producto ocupa entre 55% y 70% del encuadre, centrado.
- Luz del entorno coherente con el producto: <LUZ>
- Sombra de contacto realista bajo el producto.
- Sin texto, sin logotipos inventados, sin marcas de agua, sin personas
  reconocibles.
- Fotorrealista, como foto de catálogo de producto en exteriores.
```

---

# GRUPO A — cinco tomas cada uno

## 1. Hilo Araty 0.45mm 1000m Multicolor — $436

- **handle:** `hilo-araty-0-45mm-1000m-multicolor`
- **Equilibrio 1.53x — el mejor del catálogo.** Stock 2. Consumible: recompra
- 🔴 Aplica el defecto 2: la foto actual puede anunciar otro calibre

```imagenes
hilo-araty-0-45mm-1000m-multicolor-1-hero.jpg | REAL | Carrete de hilo Araty 0.45mm 1000m multicolor sobre fondo blanco
hilo-araty-0-45mm-1000m-multicolor-2-perfil.jpg | REAL | Carrete de hilo Araty multicolor de perfil, mostrando el hilo enrollado
hilo-araty-0-45mm-1000m-multicolor-3-grosor.jpg | REAL | Detalle del hilo Araty 0.45mm entre los dedos para apreciar su grosor
hilo-araty-0-45mm-1000m-multicolor-4-escala.jpg | REAL | Carrete de hilo Araty 1000m en una mano, para mostrar su tamaño
hilo-araty-0-45mm-1000m-multicolor-5-carrete.jpg | REAL | Hilo Araty multicolor cargado en un carrete de pesca
```

> Sin composición y sin IA: es justo el producto donde una imagen inventada
> haría daño. **La #1 debe ser el carrete real, o un encuadre donde la
> etiqueta no se lea** — si se opta por lo segundo, sirve de foto genérica
> para toda la línea Araty y resuelve los 47 productos de un golpe.

## 2. Hilo Araty 0.70mm 1000m Natural — $812

- **handle:** `hilo-araty-0-70mm-1000m-natural`
- **Equilibrio 2.37x.** Stock 3 — el mejor surtido del Grupo A. 91 vistas
- 🔴 Es el caso confirmado del defecto 2: su foto dice `0,25mm`
- ⚠️ Está en la zona muerta: $13 arriba del piso le cuestan $175 por unidad

```imagenes
hilo-araty-0-70mm-1000m-natural-1-hero.jpg | REAL | Carrete de hilo Araty 0.70mm 1000m natural sobre fondo blanco
hilo-araty-0-70mm-1000m-natural-2-perfil.jpg | REAL | Carrete de hilo Araty natural de perfil, mostrando el hilo enrollado
hilo-araty-0-70mm-1000m-natural-3-grosor.jpg | REAL | Detalle del hilo Araty 0.70mm entre los dedos para apreciar su grosor
hilo-araty-0-70mm-1000m-natural-4-escala.jpg | REAL | Carrete de hilo Araty 1000m en una mano, para mostrar su tamaño
hilo-araty-0-70mm-1000m-natural-5-comparativa.jpg | REAL | Hilo Araty 0.70mm junto a un calibre más delgado, para comparar grosor
```

## 3. Binocular Kampak Visión Nocturna Digital — $2,900

- **handle:** `binocular-kampak-vision-nocturna-digital`
- **Equilibrio 2.53x** y **$1,145 de contribución — la más alta del catálogo.**
  Stock 2. 72 vistas con sólo $44 de gasto
- 🟡 Defecto 4: hoy está a **640×640**, hay que rehacerla sí o sí
- 🔴 **La pantalla actual muestra un lémur.** No hay lémures en México: delata
  imagen de catálogo genérica. En la foto nueva debe mostrar **algo real
  capturado con el aparato**, o quedar apagada

```imagenes
binocular-kampak-vision-nocturna-digital-1-hero.jpg | REAL | Binocular Kampak de visión nocturna digital negro, vista frontal sobre fondo blanco
binocular-kampak-vision-nocturna-digital-2-escala.jpg | REAL | Binocular Kampak de visión nocturna sostenido en las manos para mostrar su tamaño
binocular-kampak-vision-nocturna-digital-3-pantalla.jpg | REAL | Pantalla del Kampak mostrando una captura real tomada con el aparato
binocular-kampak-vision-nocturna-digital-4-controles.jpg | REAL | Detalle de los botones de control y el puerto de carga del Kampak
binocular-kampak-vision-nocturna-digital-5-incluye.jpg | REAL | Contenido de la caja del Kampak: binocular, estuche, correa y cable
```

> Único sin composición a propósito: un aparato de visión nocturna en una
> escena diurna generada se ve falso, y en una nocturna generada se
> parecería a prometer un rendimiento que no se ha medido.

## 4. Caña de Pescar Okuma Revenger Spinning 8'0" (2.40m) — $549

- **handle:** `cana-de-pescar-okuma-revenger-spinning-80-2-40m`
- **Equilibrio 2.81x.** Stock 2. Debajo del piso, así que **el cliente paga
  el envío** y la caña sólo cuesta la caja
- Mide 2.40 m: **la toma de escala es la más importante**

```imagenes
cana-de-pescar-okuma-revenger-spinning-80-2-40m-1-hero.jpg | RETOQUE | Caña Okuma Revenger Spinning 8 pies sobre fondo blanco, sin etiquetas
cana-de-pescar-okuma-revenger-spinning-80-2-40m-2-escala.jpg | REAL | Caña Okuma Revenger de 2.40 metros completa junto a una persona, para dar escala
cana-de-pescar-okuma-revenger-spinning-80-2-40m-3-guias.jpg | REAL | Detalle de las guías y el puntero de la caña Okuma Revenger
cana-de-pescar-okuma-revenger-spinning-80-2-40m-4-mango.jpg | REAL | Detalle del mango de EVA y el portacarrete de la caña Okuma Revenger
cana-de-pescar-okuma-revenger-spinning-80-2-40m-5-orilla.jpg | COMPOSICION | Caña Okuma Revenger recargada en la orilla de una presa al atardecer
```

- **ESCENA (#5):** *la orilla de una presa mexicana al atardecer, con la
  caña recargada sobre una piedra y el agua en calma desenfocada al fondo*
- **LUZ:** *luz dorada de atardecer, baja, viniendo de atrás a la derecha*

---

# GRUPO B — tres tomas cada uno

Sólo hero, escala y detalle. **Reabastecer antes de anunciarlos.**

## 5. Binocular Simmons Venture 8x21 — $1,290

- **handle:** `binocular-simmons-venture-8x21-negro`
- **Equilibrio 1.73x — la mejor economía de todo el catálogo.** Stock 1
- 🔴 Defecto 1: **corregir el título**, es gris. 🟡 Defecto 4: 850×850

```imagenes
binocular-simmons-venture-8x21-negro-1-hero.jpg | RETOQUE | Binocular Simmons Venture 8x21 gris grafito, vista frontal sobre fondo blanco
binocular-simmons-venture-8x21-negro-2-escala.jpg | REAL | Binocular Simmons Venture 8x21 sostenido en una mano para mostrar su tamaño compacto
binocular-simmons-venture-8x21-negro-3-detalle.jpg | REAL | Detalle de la rueda de enfoque central y los oculares del Simmons Venture
```

## 6. Binocular Bushnell PowerView 2 8x21 — $1,450

- **handle:** `binocular-bushnell-powerview-2-8x21-negro`
- **Equilibrio 1.79x.** Stock 1. Su foto actual es la mejor del catálogo (2048)
- 🔴 Defecto 1: **corregir el título**, es gris con panel plata

```imagenes
binocular-bushnell-powerview-2-8x21-negro-1-hero.jpg | RETOQUE | Binocular Bushnell PowerView 2 8x21 gris y plata, vista frontal sobre fondo blanco
binocular-bushnell-powerview-2-8x21-negro-2-escala.jpg | REAL | Binocular Bushnell PowerView 2 plegado en una mano para mostrar su tamaño de bolsillo
binocular-bushnell-powerview-2-8x21-negro-3-detalle.jpg | REAL | Detalle del panel plateado y la rueda de enfoque del Bushnell PowerView 2
```

## 7. Caja Rapala Utility Box Chica — $549

- **handle:** `caja-rapala-utility-box-chica`
- **Equilibrio 2.00x** y **80 vistas** — de los más vistos del catálogo. Stock 1
- Una caja de aparejos se vende por lo que le cabe: **la #3 es la clave**

```imagenes
caja-rapala-utility-box-chica-1-hero.jpg | RETOQUE | Caja Rapala Utility Box chica cerrada, sobre fondo blanco
caja-rapala-utility-box-chica-2-escala.jpg | REAL | Caja Rapala Utility Box sostenida en una mano para mostrar su tamaño
caja-rapala-utility-box-chica-3-abierta.jpg | REAL | Caja Rapala Utility Box abierta y con señuelos dentro, mostrando sus divisiones
```

## 8. Binocular Gamo 8x40 AF Autoenfoque — $1,970

- **handle:** `binocular-gamo-8x40-af-autoenfoque`
- **Equilibrio 2.35x.** Stock 1. El más grande: la escala importa
- 🟡 Defecto 4: 1600×1600 pero blanda al acercar

```imagenes
binocular-gamo-8x40-af-autoenfoque-1-hero.jpg | RETOQUE | Binocular Gamo 8x40 AF verde olivo, vista frontal sobre fondo blanco
binocular-gamo-8x40-af-autoenfoque-2-escala.jpg | REAL | Binocular Gamo 8x40 AF sostenido con las dos manos para mostrar su tamaño
binocular-gamo-8x40-af-autoenfoque-3-detalle.jpg | REAL | Detalle de los objetivos de 40 mm y el cuerpo texturizado del Gamo 8x40 AF
```

## 9. Caña de Pescar Blue Fox Power Boat Spinning 6'4" — $549

- **handle:** `cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m`
- **Equilibrio 3.32x**, y **la mejor tasa de carrito de toda la campaña: 5.1%**
  (3 de 59 vistas). Stock 1

```imagenes
cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m-1-hero.jpg | RETOQUE | Caña Blue Fox Power Boat 6'4" azul sobre fondo blanco, sin etiquetas
cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m-2-escala.jpg | REAL | Caña Blue Fox Power Boat de 1.95 metros junto a una persona, para dar escala
cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m-3-mango.jpg | REAL | Detalle del mango y el portacarrete de la caña Blue Fox Power Boat
```

## 10. Carrete Shimano Sienna FG 4000 Spinning — $1,279

- **handle:** `carrete-shimano-sienna-fg-4000-spinning`
- **Equilibrio 3.49x** y **110 vistas con 3 ATC.** Stock 1
- No necesita caja de caña: su envío se parece al de un binocular

```imagenes
carrete-shimano-sienna-fg-4000-spinning-1-hero.jpg | RETOQUE | Carrete Shimano Sienna FG 4000 negro con bobina roja, sobre fondo blanco
carrete-shimano-sienna-fg-4000-spinning-2-escala.jpg | REAL | Carrete Shimano Sienna FG 4000 sostenido en una mano para mostrar su tamaño
carrete-shimano-sienna-fg-4000-spinning-3-montado.jpg | REAL | Carrete Shimano Sienna FG 4000 montado en una caña, listo para pescar
```

> La #3 es la más útil: un carrete suelto sobre blanco no le dice nada a
> quien duda si le queda a su caña. **Montado se entiende solo**, y abre la
> venta cruzada.

## 11. Caña de Pescar Shimano Sellus Spinning 5'8" — $1,290

- **handle:** `cana-shimano-sellus-spinning-5-8`
- **Equilibrio 3.52x.** Stock 1. **Ya tiene 3 fotos** — de los 5 productos
  mejor surtidos de la tienda— pero las tres son la caña sobre fondo blanco
  en distintos ángulos. Por eso aquí sólo van dos tomas nuevas

```imagenes
cana-shimano-sellus-spinning-5-8-4-escala.jpg | REAL | Caña Shimano Sellus 5'8" completa sostenida por una persona, para dar escala
cana-shimano-sellus-spinning-5-8-5-guias.jpg | REAL | Detalle de las guías y el puntero de la caña Shimano Sellus
```

---

## Resumen del encargo

| Grupo | Productos | Tomas |
|---|---|---|
| A — listos para escalar | 4 | 20 |
| B — reabastecer antes de anunciar | 7 | 20 |
| **Total** | **11** | **40** |

De las 40, **38 son fotos con el teléfono** y sólo **2 son composiciones
con IA**. Las que más le faltan a la ficha —escala, detalle, qué trae la
caja— son justamente las que ninguna IA puede inventar.

## Cómo subirlas

```bash
# archivos en imagenes-productos/ con el nombre EXACTO de este documento
python3 scripts/cargar-imagenes-productos.py --dry-run            # revisa, no sube
SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-imagenes-productos.py
```

Respeta el orden de este documento, **no borra lo que ya existe** y salta
lo que ya subió (compara por nombre de archivo en el `alt`), así que se
puede correr varias veces sin duplicar.

## Cuando estén arriba

Volver a medir **vistas de producto → agregar al carrito**, hoy en **2.5%**
contra un 3-8% normal. **Fijar el corte antes de mirar los datos**, no
después — la lección de §62.
