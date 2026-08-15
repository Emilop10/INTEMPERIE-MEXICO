# Instructivo — Conciliar inventario físico contra Shopify

Este documento existe porque el conteo físico de la tienda (piso de venta)
y la tienda online **no están conectados entre sí**: cada venta o entrada
de mercancía en la tienda física hay que reflejarla a mano en Shopify. Como
esto se va a hacer casi a diario, aquí queda el proceso exacto para no
tener que reexplicarlo cada vez.

**Primera vez que se hizo:** 10 de agosto de 2026 (ver sección 28 del
manual para el detalle completo de esa corrida). Desde el 12 de agosto
el proceso corre con un script guardado en el repo
(`scripts/conciliar-inventario.py`), no a mano cada vez.

---

## Las dos llaves del cruce (lo más importante de este documento)

El conteo y Shopify se emparejan por **dos identificadores exactos**, en
este orden de prioridad:

| # | Llave | En el Excel | En Shopify | Cobertura |
|---|---|---|---|---|
| 1 | SKU | `No Parte` | `variant.sku` | 371/383 |
| 2 | Código interno | `Codigo B1` | `variant.barcode` | 371/383 |

**Por qué hacen falta las dos:** el `No Parte` falta en ~88 filas del
conteo, y hay 12 productos cuyo SKU en Shopify viene del catálogo del
fabricante (`632252557`) en vez del código interno del POS
(`15ANZUEL658EC`). El `Codigo B1` sí está en el **100%** de las filas y
sin duplicados, así que cierra esos huecos.

El `Codigo B1` se guarda en el campo **"Código de barras"** de Shopify —
que estaba completamente vacío y no se usa para nada más. Se pobló el 15
de agosto de 2026 con `scripts/vincular-codigo-b1.py`.

> **Al dar de alta un producto nuevo en Shopify**, ponle su `Codigo B1`
> en el campo "Código de barras". Con eso se concilia solo desde el primer
> día, sin importar qué SKU le pongas.

Hay un tercer cruce, **por nombre**, como último recurso — pero resuelve
muy poco (1 de 87 en la prueba real) y es deliberadamente estricto. Ver
la sección "Cruce por nombre" más abajo.

---

## Qué necesitas de tu lado

1. El **Excel del conteo físico** del día, exportado del sistema de la
   tienda, con al menos estas columnas (no importa el orden):
   `Codigo B1` (el código interno), `No Parte` (el SKU) y `Existencia`
   (la cantidad contada hoy). El resto (`Departamento`, `Descripción`,
   `proveedor`, `ConstoN`, `Ubicacion`) se conservan pero casi no se usan
   — `Descripción` solo entra en el cruce por nombre de último recurso.

   ⚠️ **Asegúrate de exportar con la columna `Codigo B1`.** Sin ella el
   script sigue funcionando, pero pierde la segunda llave y vuelven a
   quedar filas sin conciliar.
2. Un token de **Shopify Admin API** con los scopes `read_products`,
   `write_products`, `read_inventory`, `write_inventory`. Si el token
   activo ya los tiene (revisado la primera vez, 10 de agosto de 2026),
   no hace falta generarlo de nuevo — solo si expiró o se agregó un scope
   nuevo, repite el flujo de
   [`INSTRUCTIVO-APP-SHOPIFY.md`](./INSTRUCTIVO-APP-SHOPIFY.md) pidiendo
   estos 4 scopes (más los que ya tenía la app: legal policies,
   navigation, themes).

   ⚠️ **Fricción del 14 de agosto:** la URL de autorización "de referencia"
   que trae `INSTRUCTIVO-APP-SHOPIFY.md` **no incluye** `read_inventory`
   ni `write_inventory` — ese instructivo documenta el flujo genérico, no
   los scopes de este proceso en particular. Si el token se generó con esa
   URL tal cual, la conciliación falla al ajustar inventario. Hay que
   agregar `,read_inventory,write_inventory` al parámetro `scope=` de la
   URL antes de abrirla.

## Qué le tienes que decir a Claude

Simplemente adjunta el Excel del conteo del día y pide algo como:

> Aquí está el inventario que acabo de contar hoy en la tienda. Actualiza
> Shopify para que coincida, y márcame en el Excel qué está bien, qué
> tuvo movimiento y qué está agotado o no existe en la tienda online.

Si el token de Shopify no está activo en la sesión (contenedores nuevos no
lo conservan de una sesión a otra), Claude te va a pedir que repitas el
OAuth manual — son los mismos 7 pasos de siempre, 5 minutos.

## Qué va a hacer Claude (para que sepas qué esperar)

1. **Cruce por SKU** — `No Parte` contra `variant.sku`. Es la llave
   principal, resuelve la gran mayoría.
2. **Cruce por Código B1** — si la fila no trae `No Parte`, o su SKU no
   existe en Shopify, busca el `Codigo B1` en el campo `barcode`. Exacto
   también, sin adivinar nada.
3. **Cruce por nombre** — solo si fallaron las dos anteriores. Compara la
   `Descripción` contra el título del producto. Únicamente cuenta como
   confiable si:
   - Coincide **exacto** tras normalizar (mayúsculas, sin acentos, sin
     puntuación) y hay un solo producto con ese nombre, o
   - Coincide **por encima del 90%** de parecido, sin empate con otro.

   Si hay ambigüedad, la fila se queda gris — nunca elige entre
   candidatos parecidos.

   **Por qué el umbral es tan alto:** se probó bajarlo y aparecieron
   coincidencias peligrosas, no solo imprecisas. Por ejemplo
   *"ANZUELO MUSTAD #2 94151-NI"* se parece en un 77% a *"Anzuelo Mustad
   94151-NI Live Bait #8"* — es el mismo anzuelo, pero de **talla
   distinta**. Con un catálogo donde decenas de productos se diferencian
   solo por un número (calibre, talla, piezas), un umbral bajo
   actualizaría el inventario del producto equivocado en silencio.

   **No esperes gran cosa de este tercer cruce:** en la prueba real
   resolvió 1 de 87 filas. Las descripciones del POS
   (`"BOLSA CON 500 BULLETS"`) y los títulos de Shopify
   (`"Diábolo Mendoza Combate..."`) usan vocabulario distinto, no son el
   mismo texto con otro formato. La solución de fondo no es mejorar el
   algoritmo: es tener el `Codigo B1` en el campo "Código de barras" del
   producto (paso 2), que sí es exacto.
4. Clasifica cada fila:
   - 🟢 **Verde** — coincide, no se toca nada.
   - 🟡 **Amarillo** — hay diferencia, se actualiza Shopify al conteo de
     hoy.
   - 🔴 **Rojo** — el conteo está en 0 (agotado) o el código no existe
     como producto en la tienda online.
   - ⬜ **Gris** — no se puede vincular con certeza (sin código y sin
     coincidencia confiable por nombre, o código repetido en el Excel
     apuntando a productos distintos). Estas **no se tocan en Shopify** —
     quedan para que las revises tú a mano, con una nota explicando el
     motivo en cada una.
5. Sube los cambios a Shopify vía API (verde y gris no generan ningún
   cambio; solo amarillo y el rojo-que-tenía-existencia-previa).
6. Te regresa el mismo Excel con:
   - Cada fila coloreada.
   - Tres columnas nuevas: `Existencia Shopify (antes)`, `Estatus`, `Nota`
     (la nota dice con qué llave se vinculó cada fila cuando no fue por
     SKU, y con qué producto).
   - Una pestaña **Resumen** con los totales, incluido cuántas filas se
     vincularon por código B1 y cuántas por nombre.

## Qué revisar tú al final

- Las filas **grises** — son las únicas que Claude no pudo resolver solo.
  La nota de cada una dice el motivo exacto: sin ninguna de las dos llaves
  y sin coincidencia de nombre confiable, nombre parecido a **más de un**
  producto, o un mismo `No Parte` usado para más de un producto (error de
  captura en el POS que vale la pena corregir ahí, no solo en Shopify).
- La mayoría de las grises son de artículos que **solo existen en la
  tienda física**, no en la web — ahí no hay nada que hacer, es normal.
  Si una gris corresponde a un producto que sí vendes online, la solución
  es ponerle su `Codigo B1` en el campo "Código de barras" del producto en
  Shopify; a partir de ahí se concilia solo.
- 📄 **[`PRODUCTOS-PENDIENTES.md`](./PRODUCTOS-PENDIENTES.md)** — lista
  viva de los productos de Shopify que todavía no tienen su `Codigo B1`
  asignado y por eso no se concilian solos. Ahí está cada uno con su
  candidato propuesto, para irlos cerrando.
- Si ves muchas filas en **rojo por "no existe en Shopify"**, probablemente
  sea normal — la tienda física maneja más SKUs de los que están puestos
  a la venta online. Pero si esperabas ver alguno ahí y no aparece, dilo.
- Si el conteo trae algún **número negativo**, Claude lo va a tratar como
  agotado (0) en vez de subirlo tal cual — pero vale la pena revisar el
  POS, porque un conteo negativo casi siempre significa que se vendió
  algo sin existencia suficiente registrada.

## Cómo se corre (script)

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...
python3 scripts/conciliar-inventario.py conteo-de-hoy.xlsx resultado.xlsx
```

Lee el Excel, cruza por SKU → código B1 → nombre (ver arriba), sube los
cambios, y escribe `resultado.xlsx` con las 3 columnas nuevas, cada fila
coloreada, y una pestaña "Resumen" con los totales por estatus y con qué
llave se vinculó cada grupo.

### Vincular códigos B1 (solo cuando haga falta)

Este segundo script escribe el `Codigo B1` del conteo en el campo
`barcode` de Shopify. **Ya se corrió el 15 de agosto de 2026** (371
productos), así que normalmente no hay que volver a usarlo — solo si
entran muchos productos nuevos de golpe:

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...        # necesita write_products
python3 scripts/vincular-codigo-b1.py conteo-de-hoy.xlsx --dry-run
python3 scripts/vincular-codigo-b1.py conteo-de-hoy.xlsx
```

Solo escribe donde el producto ya casa por SKU (ahí el vínculo es
seguro). Los que no casan los reporta al final para revisión manual —
esos son los que viven en
[`PRODUCTOS-PENDIENTES.md`](./PRODUCTOS-PENDIENTES.md).

## Notas técnicas (por si la sesión de Claude cambia y hay que retomar)

- Traer productos: `GET /admin/api/2024-01/products.json?limit=250` con
  paginación por el header `Link` — **nunca uses `status=any`**, ese
  parámetro específico devuelve 0 productos sin error visible. Sin el
  parámetro `status` trae todos los estados igual.
- El `location_id` para ajustar inventario se saca de
  `GET /shop.json → primary_location_id`, no de `/locations.json` (ese
  endpoint pide el scope protegido `read_locations`, que necesita
  aprobación manual de Shopify y no sirve para este flujo).
- Ajuste de existencia: `POST /admin/api/2024-01/inventory_levels/set.json`
  con `{location_id, inventory_item_id, available}` — el
  `inventory_item_id` viene en cada variante del producto.
- Escribir el código B1: `PUT /admin/api/2024-01/variants/{id}.json` con
  `{"variant": {"id": ..., "barcode": "..."}}`. Requiere `write_products`
  (no basta con los scopes de inventario).
- El `Codigo B1` mezcla dos formatos y **ambos son válidos**: ~1045
  códigos internos de 4 dígitos (`4747`) y ~162 códigos de barras reales
  EAN-13/UPC-A (`793676021461`). Lo importante es que es único y está en
  el 100% de las filas — no hay que normalizarlo ni validarlo.
- Matching por nombre (`build_title_index` / `find_by_name` en el
  script): solo indexa productos con **exactamente 1 variante** — con
  más de una no hay forma de saber a cuál aplicar el conteo, así que se
  excluyen del cruce por nombre (siguen resolviéndose por SKU o código B1
  si los traen). Normalización: mayúsculas, sin acentos (`unicodedata`),
  sin puntuación, espacios colapsados. Umbral de coincidencia aproximada:
  `difflib.get_close_matches(..., cutoff=0.90)` — no bajar este número,
  ver la sección de arriba sobre por qué es peligroso.
- Con ~140 actualizaciones, calcula medio segundo entre llamada y llamada
  para no chocar con el límite de la API (2 req/s en el bucket estándar).

## Historial de corridas

| Fecha | Filas conteo | Verde | Amarillo | Rojo | Gris | Actualizaciones |
|---|---|---|---|---|---|---|
| 10 ago 2026 | 1,207 | 228 | 109 | 766 | 104 | 143 |
| 12 ago 2026 | 1,175 | 306 | 20 | 746 | 103 | 23 |
| 13 ago 2026 | 1,204 | 319 | 12 | 769 | 104 | 12 |
| 14 ago 2026 | 1,178 | 310 | 16 | 748 | 104 | 17 |
| 15 ago 2026 | 1,178 | 301 | 22 | 751 | 104 | 25 |

> **15 de agosto, más tarde:** se agregó el cruce por `Codigo B1` y se
> poblaron 371 códigos de barras en Shopify (0 errores). La cobertura de
> conciliación automática pasó de 366 a **371 de 383 productos (97%)**.
> Los 12 restantes están en
> [`PRODUCTOS-PENDIENTES.md`](./PRODUCTOS-PENDIENTES.md).
>
> El cruce por nombre, agregado el mismo día, resolvió 1 de 87 filas —
> quedó como último recurso, ver la sección 3 de "Qué va a hacer Claude".
