# Instructivo — Carta de bienvenida para cada envío

Este documento existe porque la carta va a cambiar con el tiempo (precio
de un producto que se menciona, número de WhatsApp, alguna promoción de
temporada) y porque **el PDF nunca se edita a mano** — se edita el texto
en el script y se vuelve a generar, igual que cualquier otro material de
este repositorio.

**Creada:** 14 de septiembre de 2026, a pedido del dueño: una carta
física en cada envío, bienvenida a la "familia Intemperie México",
pedir una reseña, logo real y firma "E.L.C., CEO Intemperie México".
Detalle completo de por qué se redactó así (dos pasadas: primero neutra,
luego "más emocional" y sin mencionar ubicación) en
[`PENDIENTES.md`](./PENDIENTES.md#carta-de-bienvenida-para-cada-envío--lista-para-imprimir-14-sep).

---

## Qué genera

```bash
python3 scripts/generar-carta-bienvenida.py
```

No necesita ningún token — ni de Shopify ni de Meta. Es generación local
pura: toma el texto que vive dentro del propio script, el logo y las
fuentes que están en `scripts/assets/`, y produce dos PDFs en
`materiales-impresos/`:

| Archivo | Para qué |
|---|---|
| `carta-bienvenida.pdf` | Media carta (5.5" × 8.5") suelta — la pieza de referencia |
| `carta-bienvenida-imprimible.pdf` | Carta horizontal (11" × 8.5") con **dos copias lado a lado** — esta es la que se imprime de verdad |

**Cómo imprimir:** la imprimible, en orientación horizontal, papel
tamaño carta normal. Se corta justo a la mitad (línea de corte a las
5.5"). Cada hoja da 2 cartas — 50 cartas son 25 hojas.

## Cómo cambiar el texto

Todo el contenido vive en el diccionario `CONTENIDO` dentro de
`scripts/generar-carta-bienvenida.py` — título, los cinco párrafos, la
firma y el Instagram. Se edita ahí, en español plano, y se vuelve a
correr el script; no hace falta tocar nada de la maquetación.

Si algún día cambia el WhatsApp, el correo o el usuario de Instagram,
también se edita ahí — **no están enlazados a ningún otro archivo del
tema**, así que un cambio en el pie del sitio no se refleja solo aquí.

## Cómo cambiar el diseño

- **Logo:** `scripts/assets/logo-intemperie.png` — descargado en alta
  resolución (1024×1024) desde el CDN de Shopify
  (`cdn/shop/files/Logo_Sin_Fondo.png`). Si el dueño cambia el logo de la
  tienda, hay que volver a descargarlo desde ahí y reemplazar este
  archivo.
- **Tipografía:** Instrument Sans, embebida en
  `scripts/assets/fonts/` (licencia SIL OFL 1.1, incluida en
  `InstrumentSans-OFL.txt` — no se puede quitar ese archivo si se
  redistribuye la fuente). Es la misma familia que usa el sitio.
- **Colores:** verde bosque `#234D3B` como único acento — mismo token
  que `design-system/intemperie-mexico/MASTER.md`. Se usa poco a
  propósito (el nombre de la marca y dos líneas divisoras), para que se
  siga leyendo bien en una impresora en blanco y negro.
- **Tamaño de página:** las constantes `TARJETA_ANCHO` / `TARJETA_ALTO`
  al inicio del script. Si se cambia el tamaño de la tarjeta, verificar
  de nuevo que el contenido quepa en una sola página — la primera
  versión se desbordaba a una segunda página solo por la línea del
  Instagram, y no es evidente a simple vista sin revisar el PDF
  generado (ver "Qué revisar" abajo).

## Qué revisar después de generar

**No basta con que el script corra sin error** — hay que confirmar que
el PDF resultante quedó bien, porque un desborde de una sola línea no
lanza ninguna excepción, solo agrega una página de más:

```bash
python3 -c "
import fitz
for f in ['materiales-impresos/carta-bienvenida.pdf',
          'materiales-impresos/carta-bienvenida-imprimible.pdf']:
    print(f, '->', len(fitz.open(f)), 'pagina(s)')
"
```

Debe decir **1 página** en los dos casos. Si dice 2, algo se desbordó —
revisar el texto de `CONTENIDO` (probablemente creció) o achicar los
espaciados (`Spacer`) del script.

Después, renderizar la primera página a imagen y mirarla de verdad antes
de entregarla — contar páginas no confirma que el logo se vea nítido ni
que el texto no quede pegado a un borde:

```bash
python3 -c "
import fitz
doc = fitz.open('materiales-impresos/carta-bienvenida.pdf')
doc[0].get_pixmap(matrix=fitz.Matrix(2.5,2.5)).save('/tmp/preview.png')
"
```

## Historial de corridas

| Fecha | Qué cambió | Grafo de `scripts/` |
|---|---|---|
| 14 sep 2026 | Primera versión — carta emocional, sin ubicación | 101/163/11 → **111/178/12** |

> El grafo de `scripts/` se movió esta vez porque el script es código
> nuevo de verdad — a diferencia de las olas de solo-documentación o
> solo-API de septiembre, donde correr Graphify servía para *confirmar*
> que nada había cambiado. Aquí se esperaba el movimiento, y se
> verificó contando en `graph.json`, no asumiendo la cifra.
