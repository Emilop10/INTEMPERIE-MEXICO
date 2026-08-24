# Combos nuevos propuestos — Ola 7, bloque 4

No requiere código: es una alta de producto en el admin de Shopify (no
hay `SHOPIFY_ADMIN_TOKEN` en este entorno de ejecución, así que esto lo
da de alta el dueño o Claude en Chrome). Detalle completo en
`MANUAL-PROYECTO.md`, sección 47.

## Hallazgo que cambió el planteamiento

Este pendiente estaba catalogado como "decisión de compra" (comprar
inventario nuevo). No hace falta: de los 9 combos que ya vende la
tienda, 5 están agotados como SKU — pero **sus componentes por
separado sí están en stock**. El caso más claro: "Combo Okuma Revenger
8'0"" está agotado a $849, mientras la caña y el carrete que lo
componen están ambos disponibles hoy por separado. Es una alta de
producto (empaquetar lo que ya existe), no una compra.

Catálogo real verificado vía `products.json` (24 ago 2026): 381
productos, 337 disponibles. Distribución de precio de lo disponible:
180 productos <$150, 57 de $150-299, 41 de $300-499, **13 de
$500-798**, 46 ≥$799. La franja $500-798 es la cantera de anclas para
combos — son las 13 cañas/carretes de esa franja.

## Los 3 combos propuestos

Todos con componentes verificados disponibles hoy, y precio de combo
por debajo de la suma de partes — mismo patrón que los combos que ya
vende la tienda (ej. el "Combo Okuma Elite Pro" vende junto lo que por
separado costaría más).

### Combo A — Okuma Revenger 8'0" (rearme del combo agotado)

| Componente | Handle | Precio suelto |
|---|---|---|
| Caña Okuma Revenger Spinning 8'0" (2.40m) | `cana-de-pescar-okuma-revenger-spinning-80-2-40m` | $549 |
| Carrete Okuma Revenger RV-80 Spinning | `carrete-okuma-revenger-rv-80-spinning` | $599 |

Suma de partes: **$1,148**. Precio de combo sugerido: **$999**
(ahorro de $149, ~13%). Es el mismo combo que ya existía
(`combo-okuma-revenger-80-2-45m`, agotado) — se puede reactivar ese
SKU si el inventario del fabricante lo permite, o crear uno nuevo si
las medidas no coinciden exactamente (2.40m vs. 2.45m del título
anterior — verificar con el dueño cuál es la medida real).

### Combo B — Blue Fox Power Boat + Ranco

| Componente | Handle | Precio suelto |
|---|---|---|
| Caña Blue Fox Power Boat Spinning 6'4" (1.95m) | `cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m` | $549 |
| Carrete Blue Fox Ranco 3000SP Spinning | `carrete-blue-fox-ranco-3000sp-spinning` | $549 |

Suma de partes: **$1,098**. Precio de combo sugerido: **$1,049**
(ahorro de $49, ~4.5% — más ajustado porque los componentes ya son
económicos). Marca-coherente (misma línea Blue Fox), pensado para
pesca en bote/embarcación (acción heavy de la caña).

### Combo C — Rapala Corux + Gimbel + caja

| Componente | Handle | Precio suelto |
|---|---|---|
| Caña Rapala Corux 240 (7'10") | `cana-de-pescar-rapala-corux-240-710` | $599 |
| Carrete Gimbel JL4000 Spinning | `carrete-gimbel-jl4000-spinning` | $649 |
| Caja Rapala Utility Box Chica | `caja-rapala-utility-box-chica` | $549 |

Suma de partes: **$1,797**. Precio de combo sugerido: **$1,499**
(ahorro de $298, ~17%). El de mayor ticket de los tres, con la caja
como diferenciador ("todo lo que necesitas para empezar") — mismo
patrón que los combos "Level Rapala + Accesorios" que ya vende la
tienda.

## Por qué estos tres y no otros

- Los tres cruzan el umbral de envío gratis ($799) con holgura clara
  — que es justo el problema que este pendiente venía a resolver: hoy
  solo 46 de 337 productos disponibles ($799+) llegan solos a ese
  umbral.
- A y B son marca-coherentes (caña y carrete de la misma línea), que
  es el patrón visual y de marketing de los combos que ya existen.
- Ninguno requiere comprar inventario nuevo — los tres se arman con
  stock ya disponible hoy.

## Pasos para dar de alta (Claude en Chrome o el dueño)

1. Crear el producto combo en Shopify Admin (título, precio del
   combo, imágenes — se pueden reusar las de los componentes o tomar
   una foto conjunta).
2. Asignarlo a la colección "Combos" (`combos`) para que aparezca
   junto a los demás.
3. Decidir manejo de inventario: lo más simple es un producto
   independiente con su propio stock (descontarlo a mano de los
   componentes al vender), o usar `product bundles` si la tienda ya
   tiene esa app instalada — no verificado en este documento, requiere
   revisar el admin.
4. Publicarlo también en el canal de Meta si el precio queda ≥$500
   (el piso actual del conjunto anunciable) — se agregaría solo al
   conjunto dinámico por regla si cumple el filtro de precio y
   disponibilidad, sin tocar la campaña.
