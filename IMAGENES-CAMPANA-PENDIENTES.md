# Imágenes para los 5 productos de la campaña siguiente

**Creado:** 17 de septiembre de 2026. Arranca con los productos que van a
cargar la campaña siguiente, elegidos por **contribución por unidad**
(`MANUAL-PROYECTO.md` §60), no por lo que empujó la campaña anterior.

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
