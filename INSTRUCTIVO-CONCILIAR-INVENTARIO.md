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

## Qué necesitas de tu lado

1. El **Excel del conteo físico** del día, exportado del sistema de la
   tienda, con al menos estas columnas (no importa el orden):
   `No Parte` (el SKU/código de cada artículo) y `Existencia` (la
   cantidad contada hoy). El resto de columnas (`Departamento`,
   `Descripción`, `proveedor`, `ConstoN`, `Ubicacion`) se conservan pero
   no se usan para la conciliación.
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

1. Lee el Excel y lo cruza por `No Parte` contra el SKU de cada variante
   de producto en Shopify.
2. Clasifica cada fila:
   - 🟢 **Verde** — coincide, no se toca nada.
   - 🟡 **Amarillo** — hay diferencia, se actualiza Shopify al conteo de
     hoy.
   - 🔴 **Rojo** — el conteo está en 0 (agotado) o el código no existe
     como producto en la tienda online.
   - ⬜ **Gris** — no se puede vincular con certeza (fila sin código, o
     código repetido en el Excel apuntando a productos distintos). Estas
     **no se tocan en Shopify** — quedan para que las revises tú a mano,
     con una nota explicando el motivo en cada una.
3. Sube los cambios a Shopify vía API (verde y gris no generan ningún
   cambio; solo amarillo y el rojo-que-tenía-existencia-previa).
4. Te regresa el mismo Excel con:
   - Cada fila coloreada.
   - Tres columnas nuevas: `Existencia Shopify (antes)`, `Estatus`, `Nota`.
   - Una pestaña **Resumen** con los totales.

## Qué revisar tú al final

- Las filas **grises** — son las únicas que Claude no pudo resolver solo.
  Casi siempre son de dos tipos: artículos sin código de parte en tu
  sistema, o un mismo código usado para más de un producto (error de
  captura en el POS que vale la pena corregir ahí, no solo en Shopify).
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

Lee el Excel, cruza por SKU contra Shopify, sube los cambios, y escribe
`resultado.xlsx` con las 3 columnas nuevas, cada fila coloreada, y una
pestaña "Resumen" con los totales por estatus.

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
- Con ~140 actualizaciones, calcula medio segundo entre llamada y llamada
  para no chocar con el límite de la API (2 req/s en el bucket estándar).

## Historial de corridas

| Fecha | Filas conteo | Verde | Amarillo | Rojo | Gris | Actualizaciones |
|---|---|---|---|---|---|---|
| 10 ago 2026 | 1,207 | 228 | 109 | 766 | 104 | 143 |
| 12 ago 2026 | 1,175 | 306 | 20 | 746 | 103 | 23 |
| 13 ago 2026 | 1,204 | 319 | 12 | 769 | 104 | 12 |
| 14 ago 2026 | 1,178 | 310 | 16 | 748 | 104 | 17 |
