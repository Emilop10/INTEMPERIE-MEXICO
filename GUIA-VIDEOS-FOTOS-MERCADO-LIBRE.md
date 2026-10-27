# Guía: grabar videos y tomar fotos para Mercado Libre

Mercado Libre pide un video en todas nuestras publicaciones ("Crea un video
para no perder ventas") y es lo que más le sube la exposición a una cuenta
nueva. Esta guía es para grabarlos todos en una tarde con el celular.
Contexto en MANUAL §125.

## Antes de empezar

- **Celular en vertical.** Limpia la lente.
- **Luz de día:** junto a una ventana o afuera a la sombra. Nada de foco
  amarillo ni de sol directo, que deja sombras duras.
- **Fondo limpio:** una mesa de madera, una lona o el pasto. Quita todo
  lo que no sea el producto.
- **Sin hablar, sin música y sin texto encima.** Solo el producto.
- Cada video dura **de 15 a 30 segundos**. Mejor uno corto y claro que uno
  largo.
- Graba **con el celular firme** (apoyado en algo o con las dos manos) y
  con movimientos lentos.

## Qué grabar en cada video (5 tomas, ~21 segundos)

| # | Toma | Duración |
|---|---|---|
| 1 | Todo junto sobre la mesa: caña, carrete y todo lo que incluye | 3 s |
| 2 | La caña armada, recorriéndola despacio de la punta al puño | 5 s |
| 3 | El carrete de cerca, girando la manivela | 5 s |
| 4 | Los accesorios del kit, uno por uno (hilo, caja, señuelos, anzuelos, plomos) | 5 s |
| 5 | Cierre: todo junto otra vez, o la caña con el carrete montado | 3 s |

En los combos (caña y carrete, sin accesorios), la toma 4 se cambia por
el puño con la etiqueta de la marca y el modelo.

## Orden de grabación (de más a menos importante)

| # | Publicación | MLM | Por qué |
|---|---|---|---|
| 1 | Kit Blue Fox Tolten 8' | MLM-3682621565 | ML ya lo pide |
| 2 | Kit Okuma Revenger 7' | MLM-3682581883 | ML ya lo pide |
| 3 | Combo Okuma Revenger 2.45 | MLM-6444730308 | Compite en el catálogo; su calidad bajó a 64 por falta de video |
| 4 | Kit Okuma Tundra Pro 7' | MLM-6444714326 | El de mayor precio |
| 5 | Kit Shimano Clarus 5'8" | MLM-6444779904 | |
| 6 | Kit Blue Fox Fresh 7' | MLM-3693474151 | |
| 7 | Combo Okuma Revenger 2.40 + RV-80 | MLM-6444798834 | |
| 8 | Combo Okuma Boundary 7' | MLM-6444801030 | |

Nombra cada video con el producto (por ejemplo, `tolten.mp4`) para que
la Mac sepa cuál es cuál.

## Fotos de los combos (aprovechando la misma sesión)

Los combos tienen pocas fotos (la meta es 6): Revenger 2.40 tiene 3, y
Boundary y Revenger 2.45 tienen 4. Toma **2 o 3 de cada uno**, con la
misma luz y el mismo fondo:

- El puño con la etiqueta de la marca y el modelo, de cerca.
- La caña desarmada, con sus 2 piezas una al lado de la otra.
- El carrete de lado, que se vea la bobina.
- (Opcional) La caña con el carrete montado, completa.

Las fotos van **sin texto encima** y en horizontal o cuadradas.

## Cuando termines

Pásale los archivos a la sesión de la Mac con este mensaje:

```text
Sube estos videos y fotos a sus publicaciones de Mercado Libre: cada video en la sección "Videos" de la publicación que dice su nombre, y las fotos nuevas de los combos después de las que ya tienen (no cambies la portada). No cambies precios, títulos, descripciones ni existencias. Confirma publicación por publicación y la calidad nueva que muestra ML, documenta en el MANUAL y haz commit y push.
```

---

## Motion graphics de los videos de Mercado Libre (edición, 27 oct)

Mercado Libre es mucho más estricto que Facebook. **Menos es más:** el
video debe mostrar el producto, no la tienda.

### Lo que NO puede llevar (Mercado Libre lo rechaza o castiga)

- Teléfono, WhatsApp, correo, página web, redes sociales ni códigos QR.
- Logo de la tienda o marca de agua. Por si acaso, ningún logo propio;
  los logos de Okuma, Shimano o Blue Fox que ya vienen en el producto sí
  están bien.
- Precios, "envío gratis", "oferta", "descuento" ni "meses sin
  intereses": eso lo muestra Mercado Libre y cambia.
- Menciones a otras tiendas o plataformas.

### Formato

- **1080 × 1920 (9:16)**, MP4, 30 fps, de 15 a 30 s.
- Sin voz.
- Música suave sin derechos de autor, o sin música.
- **Zonas seguras:** texto solo entre y = 250 y y = 1300 px; Mercado
  Libre pone sus controles arriba y abajo.

### Estilo

- Mismos colores y letra de la marca, pero discretos:
  - pastillas negras al 80%, con texto blanco `#F5F5F7` en Instrument
    Sans SemiBold, 44–52 px;
  - detalles en verde `#57B58A` (palomitas, línea fina bajo los títulos).
- Animación: fundido corto (0.25 s), sin rebotes ni efectos llamativos.

### Qué texto lleva cada toma (igual en los 7 videos)

| Toma | Tiempo | Motion graphics |
|---|---|---|
| 1. Todo junto | 0–3 s | Nombre del producto arriba (y ≈ 350), por ejemplo "Kit Blue Fox Tolten 8' · Mar y costa" o "Combo Okuma Boundary 7'". Línea verde fina debajo |
| 2. La caña | 3–8 s | Pastilla con el dato real de la caña, tomado de la ficha: "Caña 8' (2.44 m) · 2 piezas" |
| 3. El carrete | 8–13 s | Pastilla: modelo y talla del carrete, por ejemplo "Carrete Okuma talla 40" |
| 4. Accesorios (solo kits) | 13–18 s | Contador "Incluye 8 piezas" y el nombre de cada accesorio al aparecer: hilo, caja, señuelos, anzuelos, plomos, flotadores |
| 5. Cierre | últimos 3 s | Lista con palomitas verdes de lo que trae: "✓ Caña ✓ Carrete ✓ Hilo ✓ Accesorios"; en combos, solo caña y carrete. **Sin logo, sin precio y sin contacto** |

**Los datos de cada producto** (largo, piezas, talla del carrete y lista
de accesorios) se copian de la descripción de su publicación o de la
ficha de la tienda, sección "Incluye". No se inventa ninguno.

### Entrega

Un archivo por publicación, con el nombre del producto (`tolten.mp4`,
`kit-revenger.mp4`, `revenger-245.mp4`, `tundra.mp4`, `clarus.mp4`,
`fresh.mp4`, `boundary.mp4`). Pásalos a la Mac con el mensaje de esta
guía.
