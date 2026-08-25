# Combos nuevos propuestos — Ola 7, bloque 4

> ## ✅ CREADOS Y PUBLICADOS — a la venta desde el 24 de agosto de 2026
>
> Creados por API con `scripts/crear-combos.py` y publicados el mismo
> día en **Online Store, Point of Sale y Facebook & Instagram** (los
> mismos canales que los combos que ya existían, verificado contra uno
> de referencia en vez de elegirlos a ojo).
>
> Verificado en vivo: los 3 dan HTTP 200, la colección `combos` pasó
> de 9 a 12, cada uno con su ficha técnica y el aviso de meses sin
> intereses, cero errores de Liquid.
>
> **Trampa encontrada al publicar:** poner `status: active` **no basta**
> — los productos creados por API no quedan publicados en ningún canal
> de venta, y seguían dando 404 aunque el admin los mostrara activos.
> Hay que publicarlos explícitamente con la mutación GraphQL
> `publishablePublish` (misma que usa `scripts/sincronizar-canal-meta.py`).
> Es el tipo de fallo que se ve como "el producto existe pero no
> aparece en la tienda".
>
> ### 🔴 Tarea manual permanente
>
> **Cada vez que se venda un combo hay que bajar a mano el stock de sus
> componentes.** Shopify no lo hace solo. Detalle y lista de
> componentes en `PENDIENTES.md`.
>
> | Combo | Precio | Stock | Handle |
> |---|---|---|---|
> | Okuma Revenger 8'0" | $999 | 1 | `combo-okuma-revenger-80-2-40m-cana-carrete` |
> | Blue Fox Power Boat 6'4" | $1,049 | 1 | `combo-blue-fox-power-boat-64-1-95m-cana-carrete` |
> | Rapala Corux 240 | $1,499 | 1 | `combo-rapala-corux-240-710-cana-carrete-caja` |
>
> Cada uno lleva las imágenes de sus componentes, su ficha técnica
> cargada, `product_type: Combos` (entra solo a la colección `combos`)
> y stock fijado en **1**, que es el máximo real: los componentes están
> a 1 unidad cada uno.
>
> Los tres entraron además al **conjunto anunciable de Meta**, que
> subió a 38 productos — que era justo el objetivo del bloque 4: sumar
> ticket alto al catálogo de anuncios.
>
> ### 🔴 Riesgo de sobreventa — decisión tomada, con tarea manual
>
> **Shopify NO descuenta el stock de los componentes cuando se vende un
> combo.** La misma caña está publicada suelta *y* dentro del combo,
> con 1 unidad real: si se venden las dos cosas, hay que cancelarle el
> pedido a un cliente.
>
> **Decisión del dueño (25 ago): descontar a mano.** Cada vez que se
> venda un combo hay que bajar el stock de sus componentes en Shopify.
>
> Se descartó despublicar los componentes porque **los 7 están dentro
> del conjunto anunciable de Meta** — quitarlos habría encogido ese
> catálogo alrededor de un 20%, lo contrario del objetivo. Una app de
> bundles lo resolvería de raíz, pero cuesta mensualidad; vale la pena
> reconsiderarla cuando suba el volumen de pedidos.

Detalle completo en `MANUAL-PROYECTO.md`, sección 47.

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

## Si en el futuro se quiere crear otro combo

El alta ya no se hace a mano: `scripts/crear-combos.py` la automatiza.
Para sumar uno nuevo, agregar una entrada a la lista `COMBOS` de ese
script (título, precio, vendor, tags, handles de los componentes,
descripción y ficha técnica) y correrlo con `--dry-run` primero.

El script se encarga solo de: tomar las imágenes de los componentes,
fijar el stock al **mínimo** de ellos, cargar la ficha técnica, y
poner `product_type: "Combos"` para que entre a la colección
automática sin asignarla a mano.

**Dos cosas que hay que hacer aparte, y son las que costaron una
vuelta la primera vez:**

1. **Publicarlo.** El script lo crea en borrador a propósito. Poner
   `status: "active"` **no basta** — un producto creado por API no
   queda publicado en ningún canal de venta y sigue dando 404. Hay que
   usar la mutación GraphQL `publishablePublish` sobre los mismos
   canales que los combos existentes (Online Store, Point of Sale,
   Facebook & Instagram).
2. **Entrar al conjunto de Meta es automático** si el precio queda
   ≥$500 y hay stock — la regla del `product_set` lo recoge sin tocar
   la campaña. Pero **la sincronización de Shopify hacia el catálogo
   es diferida**: puede tardar minutos. Consultar el conjunto justo
   después de publicar y no verlo ahí no significa que haya fallado.
