# Instructivo — Mantener sincronizado el catálogo de Meta

Este documento explica cómo se mantiene el catálogo de anuncios de Meta
en espejo con la tienda, y cómo se garantiza que los productos que Meta
prohíbe anunciar **nunca** lleguen ahí.

**Por qué importa tanto:** Meta prohíbe anunciar armas, municiones y
accesorios que modifiquen su función. El riesgo no es que rechacen un
anuncio suelto — es el **baneo permanente de la cuenta publicitaria y del
Business Manager completo**, arrastrando la página de Facebook. Un solo
rifle visible en el catálogo puede costar toda la infraestructura de
publicidad.

**Resuelto el:** 15 de agosto de 2026 (ver sección 31 del manual para la
historia completa de cómo se descubrió y arregló).

---

## 1. Cómo funciona la cadena, en orden

```
Shopify (383 productos)
   │
   │  ← LA COMPUERTA: publicación al canal "Facebook & Instagram"
   │     324 publicados · 59 excluidos
   ▼
Catálogo de Meta  (324 productos, espejo exacto)
   │
   ▼
Campañas de catálogo dinámico
```

**Todo el control está en un solo lugar:** qué productos están publicados
al canal "Facebook & Instagram" dentro de Shopify. Lo que está publicado
llega al catálogo de Meta; lo que no, no llega. No hay filtros adicionales
del lado de Meta, y es deliberado — un solo punto de control es más fácil
de verificar que tres.

## 2. Qué se excluye y por qué

Se excluyen los productos que pertenecen a cualquiera de estas tres
colecciones de Shopify:

| Colección | Productos |
|---|---|
| Diábolos y Municiones | 31 |
| Rifles y Pistolas de Aire | 20 |
| Miras Telescópicas | 8 |
| **Total excluido** | **59** |

Ojo con dos detalles que ya causaron confusión antes:

- **"Miras y Binoculares" NO se excluye.** Los binoculares, monoculares y
  accesorios de óptica sí son anunciables. La prohibida es únicamente su
  subcolección "Miras Telescópicas".
- **Las subcolecciones no se listan aparte.** "Calibre 4.5mm", "Airsoft
  6mm", "Pistolas de Aire", "CO2 y Cartuchos", etc. cuelgan de las tres
  de arriba, y quedan cubiertas por pertenencia. No hace falta agregarlas
  a la regla.

## 3. El comando de mantenimiento

Cada vez que agregues, quites o recategorices productos en Shopify:

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...
python3 scripts/sincronizar-canal-meta.py
```

Qué hace:

- Lee los 383 productos de Shopify con sus colecciones
- Publica al canal todo lo anunciable que esté fuera
- Despublica todo lo prohibido que se haya colado
- **Es idempotente**: si ya está correcto, no toca nada y lo dice

Para ver qué haría sin ejecutar nada:

```bash
python3 scripts/sincronizar-canal-meta.py --dry-run
```

**El token necesita el scope `write_publications`.** La URL de
autorización "de referencia" que trae `INSTRUCTIVO-APP-SHOPIFY.md` **no lo
incluye** — hay que agregar `,read_publications,write_publications` al
parámetro `scope=` antes de abrirla.

## 4. Cuándo hace falta `--forzar-resync`

Shopify solo empuja al catálogo de Meta **cuando algo cambia**. Si un
producto ya estaba publicado desde antes, no se genera ningún evento y el
catálogo nunca se entera de que existe.

Eso se vuelve un problema en un caso concreto: **conectar un catálogo
nuevo**. Los productos ya estaban publicados, así que el catálogo recién
creado se queda vacío para siempre esperando eventos que no van a llegar.
Fue exactamente lo que pasó el 15 de agosto — el catálogo nuevo quedó en 0
productos y no había ningún botón de "sincronizar ahora" en la app de
Shopify que lo destrabara.

La solución:

```bash
python3 scripts/sincronizar-canal-meta.py --forzar-resync
```

Despublica y vuelve a publicar **todo lo anunciable**, aunque ya esté
correcto. Ese ciclo genera los eventos que faltaban, y el catálogo se
llena. Los 59 prohibidos no entran al ciclo en ningún momento.

**Solo úsalo cuando el catálogo esté desincronizado.** En operación normal
el comando sin banderas es suficiente, y hace ~650 llamadas menos a la API.

## 5. Verificar que quedó bien

Después de sincronizar, comprueba las dos puntas.

**Lado Shopify** — debe decir 324 anunciables / 59 prohibidos, sin
pendientes:

```bash
python3 scripts/sincronizar-canal-meta.py --dry-run
```

**Lado Meta** — el catálogo debe tener el mismo número de productos:

```bash
curl -sS -A "Mozilla/5.0" \
  "https://graph.facebook.com/v21.0/1746844133017649?fields=name,product_count&access_token=$META_ACCESS_TOKEN"
```

La sincronización **no es instantánea**: tarda de unos minutos a media
hora en reflejarse. Si acabas de correr el script y el número no cuadra,
espera y vuelve a consultar antes de asumir que algo falló.

**Comprobación de seguridad** — que no se haya colado ninguna categoría
prohibida en el catálogo (esta es la que de verdad protege la cuenta):

```bash
curl -sS -A "Mozilla/5.0" \
  "https://graph.facebook.com/v21.0/1746844133017649/products?fields=name,category&limit=200&access_token=$META_ACCESS_TOKEN" \
  | python3 -c "
import json,sys,collections
PROHIB={'3925':'Diábolos','3093':'Pistolas/rifles aire','1695':'Miras','499824':'Rifles','499840':'Rifle aire','3715':'Ballesta','499854':'Pavonadores'}
d=json.load(sys.stdin)['data']
mal=[p for p in d if p.get('category') in PROHIB]
print(f'{len(d)} productos revisados')
print('*** PROHIBIDOS:', [p['name'][:50] for p in mal], '***' if mal else '')
print('OK, ninguno prohibido' if not mal else 'REVISAR URGENTE')
"
```

## 6. Datos de referencia

| Dato | Valor |
|---|---|
| Canal en Shopify | `Facebook & Instagram` — publicación `163249258573` |
| Catálogo de Meta (vigente) | `1746844133017649` — creado 15 ago 2026 |
| Catálogo viejo (muerto, no usar) | `1230530145855635` — 56 productos huérfanos |
| Business Manager | `1324138699447721` — Intemperie México |
| Pixel | `2011984246408291` — Intemperie México Pixel |

> ⚠️ El catálogo viejo (`1230530145855635`) sigue existiendo en el Business
> Manager con 56 productos huérfanos, **varios de ellos rifles, pistolas y
> miras**. Ninguna campaña debe apuntar ahí. Conviene borrarlo desde
> Commerce Manager para que no quede como riesgo latente.

## 7. Lo que NO hay que hacer

- **No usar el botón "Publicar productos"** del panel de la app de
  Facebook & Instagram en Shopify. Abre una publicación masiva con
  **todos los productos preseleccionados**, incluidos los prohibidos —
  es exactamente como se publicaron armas al canal por accidente en
  febrero de 2026. Usa el script, que respeta las exclusiones.
- **No apuntar campañas al catálogo viejo** (`1230530145855635`).
- **No agregar filtros de "conjunto de productos" por categoría** en Meta
  como si fueran la protección. Se evaluó y se descartó: una lista blanca
  de categorías excluye en silencio productos legítimos cuando aparece una
  categoría nueva, y una lista negra no cubre productos con categoría
  vacía o inesperada. La compuerta por colección en Shopify es más
  confiable porque no depende de un campo que Shopify puede dejar vacío.
