# Imágenes para los 8 productos de la campaña siguiente

**Creado:** 17 de septiembre de 2026. **Ampliado el mismo día** con pesca,
por decisión del dueño: sostener las cañas mientras se escala la tienda,
aun sabiendo que su margen es delgado. Los productos se eligen por
**contribución por unidad** (`MANUAL-PROYECTO.md` §60), no por lo que
empujó la campaña anterior.

**8 productos: 4 de óptica y 4 de pesca.**

> 📌 **Lo que cambió al recalcular con guía típica.** El dueño señaló, con
> razón, que los $223 de la primera guía fueron a Quintana Roo —el extremo
> del país—, no el caso normal. Rehaciendo las cuentas con **$189** (lo que
> la propia tienda cobra por debajo del piso de $799), aparece algo que la
> tabla anterior escondía: **el problema nunca fue "cañas contra óptica",
> era el TICKET.**
>
> | Producto | Contribución | Equilibrio |
> |---|---|---|
> | Caña Shimano Sellus 5'8" — $1,290 | $366.17 | **3.52x** |
> | Carrete Shimano Sienna FG 4000 — $1,279 | $366.00 | **3.49x** |
> | Hilo Araty 0.70mm 1000m — $812 | $343.00 | **2.37x** |
> | Combo Okuma Revenger — $849 | $104.67 | 8.11x |
>
> La Sellus **es una caña**, paga su caja de $48.83, y aun así llega a
> 3.52x. El Revenger no es malo por ser caña: es malo por costar $849 con
> 40% de margen. **Por eso la pesca que entra a la lista es la de ticket
> alto, no la que recibió el gasto de la campaña pasada.**

Este documento es **la fuente de verdad**: `scripts/cargar-imagenes-productos.py`
lo lee y sube exactamente lo que está listado aquí. No se edita el script
para agregar una imagen — se edita este documento.

---

## Antes que nada: tres defectos encontrados al auditar las fotos actuales

Salieron de mirar las cinco imágenes de verdad, no de suponer. **Los tres
hay que resolverlos aunque no se genere ni una sola imagen nueva.**

### 🔴 1. Dos productos se llaman "Negro" y no son negros

Se midió el color promedio del cuerpo, ignorando el fondo blanco:

| Producto | Luminancia | Píxeles realmente negros | Color real |
|---|---|---|---|
| Binocular Simmons Venture 8x21 **Negro** | 125 | 7.4% | **gris grafito** |
| Binocular Bushnell PowerView 2 8x21 **Negro** | 128 | 6.7% | **gris con panel plata** |
| Binocular Kampak Visión Nocturna | 51 | 66.5% | negro de verdad ✅ |

Los dos primeros son **justo los de mejor contribución del catálogo** —
los que van a recibir el presupuesto. Un cliente que compra "Negro" y
recibe gris pide devolución, y con el margen de §59 una tanda de
devoluciones se come el año. **Corregir el título antes de mandarles
tráfico.** Propuesta: quitar "Negro" o cambiarlo por "Gris Grafito".

### 🟠 2. El héroe del Combo Revenger tiene una etiqueta de código de barras pegada

Se ve al acercarse al mango: una etiqueta blanca de almacén enrollada
sobre el blank. Lee a "sobrante de bodega", no a producto premium — y es
el único producto con venta real comprobada. **Retocar (quitar la
etiqueta) o volver a fotografiar.** Quitar una etiqueta de tienda de una
foto del producto real es retoque legítimo: no cambia el producto.

### 🟡 3. Dos imágenes no dan la resolución que Shopify necesita para el zoom

| Producto | Hoy | Necesario |
|---|---|---|
| Binocular Kampak | **640×640** | 2048×2048 |
| Binocular Simmons Venture | **850×850** | 2048×2048 |
| Binocular Gamo 8x40 | 1600×1600, pero **blanda** al acercar | renfocar o reemplazar |

Shopify amplía hasta 2048px en la ficha; por debajo de eso el zoom se ve
pixeleado. Bushnell (2048) y Revenger (1024) están aceptables.

### 🔴 4. La foto del Hilo Araty muestra un calibre distinto al que se vende

Encontrado al ampliar la etiqueta del **Hilo Araty 0.70mm 1000m Natural**:
la etiqueta del carrete dice, legible, **`0,25mm - 1000m` · `4,2 kg - 9,3 Lbt`**.
Un 0.25 mm que aguanta 4.2 kg no es ni remotamente un 0.70 mm.

Y no es un caso suelto. Agrupando los 55 productos Araty por su foto de
origen:

| Productos que comparten la foto | Diámetros a los que se le puso |
|---|---|
| 12 | 0.20 a 1.00 mm |
| 10 | 0.20 a 1.20 mm |
| 7 | 0.25 a 1.20 mm |
| 5 | 0.30, 0.35, 0.40, 0.45, **0.70** ← la inspeccionada |

**47 de 55 productos Araty comparten foto con al menos otro**, y esa foto
lleva un calibre legible que sólo puede ser correcto para uno de ellos.
Para quien pesca, el calibre y la resistencia **son** la especificación.

> 💡 **No hay que fotografiar 55 carretes.** Lo barato y honesto es una
> sola foto genérica **donde la etiqueta no sea legible** —el carrete de
> perfil, mostrando el hilo— reutilizada en toda la línea, con el calibre
> y la resistencia en la ficha técnica, que ya existe como metafield
> (`custom.especificaciones`, ver `scripts/cargar-fichas-tecnicas.py`).
> Una imagen genérica que no afirma nada es mejor que una específica que
> afirma algo falso.

---

## Especificaciones (aplican a TODAS las imágenes)

| | |
|---|---|
| **Formato** | JPG calidad 85, o PNG si hay transparencia |
| **Medidas** | **2048 × 2048 px, cuadrada** |
| **Por qué cuadrada** | El tema pinta las tarjetas con `--ratio-percent: 100%`. Una imagen no cuadrada se recorta sola y descuadra la cuadrícula |
| **Peso** | por debajo de 1 MB por imagen |
| **Fondo (fotos de producto)** | blanco o gris muy claro, **el mismo en las cinco** |
| **Nombre de archivo** | `{handle}-{n}-{tipo}.jpg` |
| **Carpeta** | `imagenes-productos/` en la raíz del repo |

> ⚠️ **Lo que NO se hace:** regenerar el producto con IA. Son productos
> de marca y la IA se equivoca en guías, perillas, logotipos y marcas de
> modelo. Público de 45-65 que pesca: lo nota. Además es publicidad
> engañosa ante PROFECO y causal de rechazo en Meta. **La IA se usa para
> el entorno; el producto siempre son los píxeles reales.**

### Los tres tipos de toma, y quién las hace

| Tipo | Qué es | Quién |
|---|---|---|
| 📷 **REAL** | Foto con el teléfono, luz de ventana, fondo blanco | El dueño — tiene las piezas |
| 🎨 **COMPOSICIÓN** | El producto **real recortado** puesto sobre un fondo generado | ChatGPT, con el prompt de abajo |
| 🩹 **RETOQUE** | La foto actual, limpiada (quitar etiqueta, normalizar fondo, subir a 2048) | ChatGPT o cualquier editor |

### Prompt base para las composiciones

Se sube la foto real del producto a ChatGPT y se pide esto. **La primera
frase es la que protege del error caro — no la quites:**

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

## 1. Binocular Simmons Venture 8x21 — $1,290

- **handle:** `binocular-simmons-venture-8x21-negro`
- **Por qué es el #1:** ROAS de equilibrio **1.81x**, el mejor del catálogo (§60)
- **Hoy:** 1 imagen, 850×850, compacto gris grafito con logo rojo SIMMONS
- ⚠️ Antes de subir imágenes: **corregir el título**, no es negro

```imagenes
binocular-simmons-venture-8x21-negro-1-hero.jpg | RETOQUE | Binocular Simmons Venture 8x21 gris grafito, vista frontal sobre fondo blanco
binocular-simmons-venture-8x21-negro-2-escala.jpg | REAL | Binocular Simmons Venture 8x21 sostenido en una mano para mostrar su tamaño compacto
binocular-simmons-venture-8x21-negro-3-detalle.jpg | REAL | Detalle de la rueda de enfoque central y los oculares del Simmons Venture 8x21
binocular-simmons-venture-8x21-negro-4-campo.jpg | COMPOSICION | Binocular Simmons Venture 8x21 sobre una piedra en un mirador de montaña al amanecer
binocular-simmons-venture-8x21-negro-5-incluye.jpg | REAL | Contenido de la caja del Simmons Venture 8x21: binocular, estuche, correa y paño
```

- **ESCENA (#4):** *una piedra plana en un mirador de montaña mexicano al amanecer; al fondo, desenfocado, un valle con niebla baja y encinos*
- **LUZ:** *sol bajo y cálido de amanecer, viniendo de la izquierda*

## 2. Binocular Bushnell PowerView 2 8x21 — $1,450

- **handle:** `binocular-bushnell-powerview-2-8x21-negro`
- **Por qué:** ROAS de equilibrio **1.86x**
- **Hoy:** 1 imagen, 2048×2048 (la mejor que tenemos), gris con panel plata
- ⚠️ **Corregir el título**, tampoco es negro

```imagenes
binocular-bushnell-powerview-2-8x21-negro-1-hero.jpg | RETOQUE | Binocular Bushnell PowerView 2 8x21 gris y plata, vista frontal sobre fondo blanco
binocular-bushnell-powerview-2-8x21-negro-2-escala.jpg | REAL | Binocular Bushnell PowerView 2 8x21 plegado en una mano para mostrar su tamaño de bolsillo
binocular-bushnell-powerview-2-8x21-negro-3-detalle.jpg | REAL | Detalle del panel plateado y la rueda de enfoque del Bushnell PowerView 2
binocular-bushnell-powerview-2-8x21-negro-4-campo.jpg | COMPOSICION | Binocular Bushnell PowerView 2 8x21 sobre la borda de una lancha frente a una presa
binocular-bushnell-powerview-2-8x21-negro-5-incluye.jpg | REAL | Contenido de la caja del Bushnell PowerView 2: binocular, estuche y correa
```

- **ESCENA (#4):** *la borda de aluminio de una lancha de pesca; al fondo, desenfocada, el agua abierta de una presa mexicana a media mañana*
- **LUZ:** *luz de día clara y neutra, ligeramente cenital*

## 3. Binocular Gamo 8x40 AF Autoenfoque — $1,970

- **handle:** `binocular-gamo-8x40-af-autoenfoque`
- **Por qué:** ROAS de equilibrio **2.45x**
- **Hoy:** 1 imagen, 1600×1600 pero **blanda al acercar**; porro verde olivo
- Es el más grande de los cuatro: **la toma de escala importa más aquí**

```imagenes
binocular-gamo-8x40-af-autoenfoque-1-hero.jpg | RETOQUE | Binocular Gamo 8x40 AF verde olivo, vista frontal sobre fondo blanco
binocular-gamo-8x40-af-autoenfoque-2-escala.jpg | REAL | Binocular Gamo 8x40 AF sostenido con las dos manos para mostrar su tamaño
binocular-gamo-8x40-af-autoenfoque-3-detalle.jpg | REAL | Detalle de los objetivos de 40 mm y el cuerpo texturizado del Gamo 8x40 AF
binocular-gamo-8x40-af-autoenfoque-4-campo.jpg | COMPOSICION | Binocular Gamo 8x40 AF colgado de una rama en un encinar
binocular-gamo-8x40-af-autoenfoque-5-incluye.jpg | REAL | Contenido de la caja del Gamo 8x40 AF: binocular, estuche, correa y paños
```

- **ESCENA (#4):** *una rama gruesa de encino en un bosque de encino-pino mexicano; al fondo, desenfocado, el monte con luz filtrada entre las hojas*
- **LUZ:** *luz difusa de bosque, media tarde, con manchas de sol suaves*

## 4. Binocular Kampak Visión Nocturna Digital — $2,900

- **handle:** `binocular-kampak-vision-nocturna-digital`
- **Por qué:** ROAS de equilibrio **2.61x**, y es el ticket más alto de los cuatro
- **Hoy:** 1 imagen, **640×640** — la peor del grupo, hay que rehacerla sí o sí
- 🔴 **Nota sobre la pantalla:** la imagen actual muestra un **lémur** en la
  pantalla del aparato. Un lémur no existe en México y delata que es una
  imagen de catálogo genérica. En la foto nueva, **la pantalla debe mostrar
  algo real capturado con el aparato** — o quedar apagada. No inventar una
  captura con IA: eso sí sería prometer un rendimiento que no se ha medido.

```imagenes
binocular-kampak-vision-nocturna-digital-1-hero.jpg | REAL | Binocular Kampak de visión nocturna digital negro, vista frontal sobre fondo blanco
binocular-kampak-vision-nocturna-digital-2-escala.jpg | REAL | Binocular Kampak de visión nocturna sostenido en las manos para mostrar su tamaño
binocular-kampak-vision-nocturna-digital-3-pantalla.jpg | REAL | Pantalla del Kampak mostrando una captura real tomada con el aparato
binocular-kampak-vision-nocturna-digital-4-controles.jpg | REAL | Detalle de los botones de control y el puerto de carga del Kampak
binocular-kampak-vision-nocturna-digital-5-incluye.jpg | REAL | Contenido de la caja del Kampak: binocular, estuche, correa y cable
```

> Este es el único de los cinco **sin toma de composición**, a propósito:
> un aparato de visión nocturna puesto en una escena diurna generada se
> ve falso, y en una nocturna generada se parecería demasiado a prometer
> un resultado. Aquí conviene fotografía real y nada más.

## 5. Combo Okuma Revenger 8'0" (2.45m) — $849

- **handle:** `combo-okuma-revenger-80-2-45m`
- **Por qué está en la lista pese a su margen delgado:** es el **único
  producto con una venta real comprobada** (§58)
- **Hoy:** 1 imagen, 1024×1024, **con la etiqueta de código de barras visible**
- La caña mide 2.45 m: **la toma de escala es la más importante de todas**

```imagenes
combo-okuma-revenger-80-2-45m-1-hero.jpg | RETOQUE | Combo Okuma Revenger 8 pies: caña y carrete sobre fondo blanco, sin etiquetas
combo-okuma-revenger-80-2-45m-2-carrete.jpg | REAL | Detalle del carrete Okuma Revenger con su bobina y la perilla del freno
combo-okuma-revenger-80-2-45m-3-mango.jpg | REAL | Detalle del mango de EVA y el portacarrete de la caña Okuma Revenger
combo-okuma-revenger-80-2-45m-4-escala.jpg | REAL | Caña Okuma Revenger de 2.45 metros completa, junto a una persona para dar escala
combo-okuma-revenger-80-2-45m-5-orilla.jpg | COMPOSICION | Combo Okuma Revenger recargado en la orilla de una presa al atardecer
```

- 🩹 **Para #1:** el retoque obligatorio es **quitar la etiqueta blanca de
  código de barras del mango**. Nada más. No cambiar el producto.
- **ESCENA (#5):** *la orilla de una presa mexicana al atardecer, con el
  combo recargado sobre una piedra y el agua en calma desenfocada al fondo*
- **LUZ:** *luz dorada de atardecer, baja, viniendo de atrás a la derecha*

---

## Cómo subirlas cuando estén listas

1. Poner los archivos en `imagenes-productos/` con **exactamente** el
   nombre que dice este documento.
2. Ensayo, que no sube nada:
   ```bash
   python3 scripts/cargar-imagenes-productos.py --dry-run
   ```
3. Subir de verdad (necesita el token, ver `INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`):
   ```bash
   SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-imagenes-productos.py
   ```

El script respeta el orden de este documento, **no borra las imágenes que
ya existen**, y salta las que ya subió antes (compara por nombre de
archivo en el `alt`), así que se puede correr varias veces sin duplicar.

## Cuando estén arriba

Volver a medir el tramo que importa: **vistas de producto → agregar al
carrito**, que hoy está en **2.5%** contra un 3-8% normal (§62). Es la
única forma de saber si esto sirvió. Fijar el corte **antes** de mirar los
datos, no después — la lección de §62.

---

## 6. Caña de Pescar Shimano Sellus Spinning 5'8" — $1,290

- **handle:** `cana-shimano-sellus-spinning-5-8`
- **Por qué:** equilibrio **3.52x** — la mejor pesca del catálogo, y es caña
- **Hoy:** **3 imágenes** (1024×1024), de los 5 productos mejor surtidos de
  la tienda. Pero las tres son la caña azul sobre fondo blanco en distintos
  ángulos: **sigue sin haber escala, detalle ni contexto**
- Por eso aquí sólo van 4 tomas nuevas: las de fondo blanco ya están

```imagenes
cana-shimano-sellus-spinning-5-8-4-escala.jpg | REAL | Caña Shimano Sellus 5'8" completa sostenida por una persona, para dar escala
cana-shimano-sellus-spinning-5-8-5-guias.jpg | REAL | Detalle de las guías y el puntero de la caña Shimano Sellus
cana-shimano-sellus-spinning-5-8-6-mango.jpg | REAL | Detalle del mango de EVA y el portacarrete de la Shimano Sellus
cana-shimano-sellus-spinning-5-8-7-orilla.jpg | COMPOSICION | Caña Shimano Sellus recargada en la orilla de un río al amanecer
```

- **ESCENA (#7):** *la orilla de un río mexicano al amanecer, con piedras
  de canto rodado y el agua corriendo desenfocada al fondo*
- **LUZ:** *luz fría y suave de amanecer, viniendo de la derecha*

## 7. Carrete Shimano Sienna FG 4000 Spinning — $1,279

- **handle:** `carrete-shimano-sienna-fg-4000-spinning`
- **Por qué:** equilibrio **3.49x**, prácticamente igual que la Sellus — y
  **no necesita caja de caña**, así que su envío se parece al de un
  binocular
- **Hoy:** 1 imagen, 1000×1000, carrete negro con bobina roja. Limpia

```imagenes
carrete-shimano-sienna-fg-4000-spinning-1-hero.jpg | RETOQUE | Carrete Shimano Sienna FG 4000 negro con bobina roja, sobre fondo blanco
carrete-shimano-sienna-fg-4000-spinning-2-escala.jpg | REAL | Carrete Shimano Sienna FG 4000 sostenido en una mano para mostrar su tamaño
carrete-shimano-sienna-fg-4000-spinning-3-bobina.jpg | REAL | Detalle de la bobina roja y el freno delantero del Shimano Sienna FG 4000
carrete-shimano-sienna-fg-4000-spinning-4-manivela.jpg | REAL | Detalle de la manivela y el pie del carrete Shimano Sienna FG 4000
carrete-shimano-sienna-fg-4000-spinning-5-montado.jpg | REAL | Carrete Shimano Sienna FG 4000 montado en una caña, listo para pescar
```

> La #5 es la más útil de todas para este producto: un carrete suelto sobre
> fondo blanco no le dice nada a quien duda si le queda a su caña. **Montado
> se entiende solo**, y además abre la venta cruzada con la Sellus.

## 8. Hilo Araty 0.70mm 1000m Natural — $812

- **handle:** `hilo-araty-0-70mm-1000m-natural`
- **Por qué:** equilibrio **2.37x**, el mejor de toda la pesca. Además tiene
  **stock 3** y es **consumible**: se acaba y se vuelve a comprar, que es
  justo lo que le falta a una tienda que empieza
- 🔴 **Hoy:** 1 imagen, 1000×1000, **con la etiqueta de otro calibre**
  (`0,25mm`). Ver el defecto 4 arriba. **Esta foto no se puede seguir usando
  tal cual**

```imagenes
hilo-araty-0-70mm-1000m-natural-1-hero.jpg | REAL | Carrete de hilo Araty 0.70mm 1000m natural sobre fondo blanco
hilo-araty-0-70mm-1000m-natural-2-perfil.jpg | REAL | Carrete de hilo Araty visto de perfil, mostrando el hilo enrollado
hilo-araty-0-70mm-1000m-natural-3-grosor.jpg | REAL | Detalle del hilo Araty 0.70mm entre los dedos, para apreciar su grosor
hilo-araty-0-70mm-1000m-natural-4-escala.jpg | REAL | Carrete de hilo Araty 1000m en una mano, para mostrar su tamaño
```

> Sin toma de composición, y sin IA en ninguna de las cuatro: **este es
> justo el producto donde una imagen inventada haría daño.** La #1 tiene
> que ser el carrete real de 0.70mm con su etiqueta correcta, o bien un
> encuadre donde la etiqueta no se lea. Si se opta por lo segundo, sirve
> como foto genérica para toda la línea Araty y resuelve los 47 productos
> de un golpe.
