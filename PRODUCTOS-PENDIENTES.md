# Productos pendientes de vincular

Lista viva de productos de Shopify que **no se concilian automáticamente**
contra el conteo físico, y qué hace falta para cerrarlos.

Mientras estén aquí, su inventario en la tienda online **no se actualiza
solo** — hay que ajustarlo a mano si cambia, o resolver el vínculo.

**Última revisión:** 15 de agosto de 2026

---

## Por qué quedan pendientes

El conteo físico y Shopify se cruzan por dos llaves exactas (ver
[`INSTRUCTIVO-CONCILIAR-INVENTARIO.md`](./INSTRUCTIVO-CONCILIAR-INVENTARIO.md)):

1. **SKU** — `No Parte` del POS contra `variant.sku` de Shopify
2. **Código B1** — `Codigo B1` del POS contra `variant.barcode` de Shopify

Estos 12 productos fallan las dos: su SKU en Shopify viene del catálogo
del fabricante (`632252557`, `MAGENERGY55-250`) en vez del código interno
del POS, y su `barcode` está vacío porque no se pudo determinar con
certeza cuál fila del conteo les corresponde.

**No se llenaron automáticamente a propósito.** El emparejamiento por
parecido de nombre produce falsos positivos peligrosos en este catálogo:
productos que solo difieren en calibre, talla o cantidad de piezas se
confunden entre sí. Un error aquí no se nota — simplemente el inventario
de un producto se actualiza con el conteo de otro.

---

## Los 12 pendientes

### Grupo A — candidato claro, falta que el dueño lo confirme (8)

Para cada uno, el `Codigo B1` propuesto sale de la fila del conteo cuya
descripción más se parece. Antes de escribirlo hay que verificar en el
sistema de la tienda que sea el artículo correcto.

| Producto en Shopify | SKU actual | Código B1 propuesto | Fila del conteo | Exist. |
|---|---|---|---|---|
| Diábolo Gamo Expander 5.5mm 250 Piezas | `632252557` | `793676021461` | DIABOLO GAMO EXPANDER 5.5 250 PZAS GAMO | 6 |
| Diábolo Gamo Hollow Point 10X 5.5mm 250 Piezas | `632254757` | `5089` | DIABOLO 10X HOLLOW POINT 5.5 250 PIEZAS GAMO | 7 |
| Diábolo Gamo Hunter Metal Impact 6.35mm 200 Piezas | `632056657` | `5666` | DIABOLO GAMO HUNTER METAL IMPACT CAL 6.35 GAMO | 6 |
| Diábolo Gamo Magnum Energy 5.5mm 250 Piezas | `MAGENERGY55-250` | `4529` | DIABOLO GAMO MAGNUM METAL ENERGY 5.5 250 PZAS | 1 |
| Diábolo Gamo ProHunter 5.5mm 250 Piezas | `632192557` | `793676003979` | DIABOLO GAMO PROHUNTER 5.5 250 PZAS GAMO | 2 |
| Diábolo Gamo ProMatch 4.5mm 500 Piezas | `632183457` | `793676003917` | DIABOLO GAMO PROMATCH 4.5 500 PZAS GAMO | 1 |
| Diábolo Gamo TS-22 Target 5.5mm 200 Piezas | `632176857` | `793676025438` | DIABOLO GAMO TS22 TARGET 5.5 200 PZAS GAMO | 5 |
| Rifle Gamo Black 1000 Winter Cal 5.5 con Mira 4x32 | `6110029755-W57` | `4033` | RIFLE BLACK 1000 WINTER 5.5 CON MIRA 4X32WR GAMO | 0 |

### Grupo B — requieren decisión, el candidato automático es dudoso (4)

| Producto en Shopify | SKU actual | Problema |
|---|---|---|
| Diábolo Gamo ProMatch 5.5mm **125** Piezas | `6321825E57` | El algoritmo asigna `793676051574` a este **y** al Competition de 250 — el mismo código para dos productos, imposible que ambos sean correctos. En el conteo solo hay una fila "PROMATCH 5.5 125 PIEZAS". |
| Diábolo Gamo ProMatch Competition 5.5mm **250** Piezas | `PROMATCH55-250` | Mismo caso de arriba. Hay que averiguar si este producto siquiera aparece en el conteo, y con qué nombre. |
| Diábolo Gamo Rocket 4.5mm **150** Piezas | `632128457` | El candidato del conteo ("DIABOLO GAMO ROCKET 4.5 GAMO") no dice cantidad de piezas — podría ser otra presentación del mismo diábolo. |
| Diábolo Punta Plana Daisy Mod-257 4.5mm 250 Piezas | `257` | Sin candidato confiable. Existe una fila `990257-612` "DIABOLO PUNTA PLANA CAL 4.5 C/250 PZAS" que podría ser, pero el parecido fue bajo (0.65). |

---

## Cómo cerrar un pendiente

1. Ubica el producto en el sistema de la tienda y confirma cuál es su
   `Codigo B1` real.
2. Shopify Admin → Productos → el producto → sección **Inventario** →
   campo **"Código de barras"** → pega ahí el `Codigo B1`.
3. Bórralo de este archivo.
4. En la siguiente conciliación ya se cruza solo.

Alternativa si son varios: pásale la lista corregida a Claude y los
escribe por API con `scripts/vincular-codigo-b1.py`.

---

## Nota de contexto

Los 12 son diábolos, un rifle y una mira — categorías que **no se anuncian
en Meta** (ver [`INSTRUCTIVO-CATALOGO-META.md`](./INSTRUCTIVO-CATALOGO-META.md)),
así que esto no afecta las campañas. Solo afecta la exactitud del
inventario mostrado en la tienda online para esos productos.

Cobertura actual de la conciliación automática: **371 de 383 productos
(97%)**.
