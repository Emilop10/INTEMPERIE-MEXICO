# Instructivo — Cuando un cambio "no se ve" en el sitio

Esta guía existe porque el 7 de agosto de 2026 un cambio de CSS aparentemente
trivial (hacer visible la barrita deslizable de la franja de subcategorías)
tomó **dos días y siete intentos fallidos**. El problema real nunca fue el que
parecía, y cada teoría equivocada costó una ronda completa de cambios a ciegas.

Aquí queda el método correcto para no repetirlo.

**Fecha:** 7 de agosto de 2026
**Síntoma original:** "la barra se ve de un solo color, no distingo la barrita"
**Causa real:** `base.css` ocultaba el elemento con `div:empty { display: none }`

---

## ⚡ La regla de oro

> **Antes de tocar una línea de código por un reporte visual, verifica qué
> está sirviendo el sitio.**

Se cambió el color de la barrita cuatro veces (verde → gris claro → gris más
claro → blanco) y el ancho tres veces (85% → 45% → 30%) **sin que ninguno de
esos cambios pudiera funcionar**, porque el elemento nunca se pintaba. Un
minuto de verificación al principio hubiera ahorrado todo eso.

---

## El árbol de diagnóstico

Sigue estos pasos **en orden**. Cada uno descarta una capa.

### Paso 1 — ¿El archivo llegó a la tienda?

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 \
(KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
curl -s -A "$UA" https://intemperiemexico.com/ | grep -o 'brand-experience.css?v=[0-9]*'
```

**Si el `?v=...` no cambió después de un deploy, el archivo no llegó.**
Commitear y pushear a GitHub **no** despliega nada por sí solo — ver
[`scripts/README-deploy.md`](./scripts/README-deploy.md).

> ⚠️ **El `User-Agent` no es opcional.** Sin él, Shopify sirve una variante de
> caché para bots que devuelve versiones viejas de forma consistente. Durante
> ~40 minutos pareció que un deploy correcto había fallado, solo por esto.

### Paso 2 — ¿El contenido del archivo es el correcto?

```bash
curl -s -A "$UA" "https://intemperiemexico.com/cdn/shop/t/5/assets/brand-experience.css?v=<el_v_del_paso_1>" \
  | grep -o '\.subcat-scrollbar-thumb{[^}]*}'
```

Compara contra lo que esperas. Si difiere, el deploy no aplicó.

### Paso 3 — ¿La tienda tiene guardado lo correcto? (fuente de verdad)

```bash
curl -s -G "https://wfuxvx-yn.myshopify.com/admin/api/2024-10/themes/147593723981/assets.json" \
  --data-urlencode "asset[key]=assets/brand-experience.css" \
  -H "X-Shopify-Access-Token: $SHOPIFY_ADMIN_TOKEN" \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['asset']['value'][:400])"
```

Esto es lo que Shopify tiene realmente. Si aquí está bien pero el Paso 2 está
mal, es caché (ver más abajo). Si aquí está mal, el deploy falló.

### Paso 4 — Si todo lo anterior está bien, el problema es de CSS/render

**Aquí es donde estuvo el bug real y donde más tiempo se perdió.** Ve a la
sección "Renderizar de verdad".

---

## Renderizar de verdad (lo que resolvió el caso)

Este entorno tiene Chromium preinstalado. **Renderizar la página y medirla
vence a cualquier teoría.**

```bash
pip install playwright   # el navegador ya está en /opt/pw-browsers
```

### ❌ El error que costó horas: probar el componente aislado

Se extrajo el bloque HTML de la barra y se probó con solo
`brand-experience.css`. **Funcionaba perfecto.** Eso llevó a concluir, una y
otra vez, que "el código está bien y debe ser caché".

El bug solo aparecía con **todos los CSS del tema cargados**, porque venía de
`base.css`.

### ✅ Lo correcto: renderizar la página completa

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    pg = b.new_page(viewport={"width": 1680, "height": 950})
    pg.goto("file:///ruta/a/page-local.html", wait_until="load")
    pg.wait_for_timeout(2000)
    pg.query_selector('.subcat-scrollbar').scroll_into_view_if_needed()  # ¡importante!
    pg.wait_for_timeout(1500)
    print(pg.evaluate("""() => {
      const t = document.querySelector('.subcat-scrollbar-thumb');
      const s = getComputedStyle(t);
      return {display: s.display, ancho: t.getBoundingClientRect().width};
    }"""))
```

Como el proxy del entorno bloquea la navegación directa al sitio, el método es:
descargar la página y sus assets con `curl`, reescribir las URLs a rutas
locales, y abrirla con `file://`.

> ⚠️ **Hay que hacer scroll hasta el elemento antes de medir.** Chrome no
> renderiza lo que está fuera de pantalla, y `getComputedStyle` devuelve
> `display: none` para esos elementos. Eso produjo una pista falsa: el primer
> `display:none` medido era un artefacto, no el bug.

### Encontrar QUÉ regla aplica: usar CDP, no `document.styleSheets`

Recorrer `document.styleSheets` desde una página `file://` **no sirve**: Chrome
bloquea el acceso a `cssRules` de hojas externas y lanza excepción. Si el
código las salta con `try/catch`, el resultado es una lista vacía — un **falso
negativo** que hace creer que ninguna regla aplica.

Lo correcto es preguntarle al navegador por la cascada real:

```python
cdp = pg.context.new_cdp_session(pg)
cdp.send("DOM.enable"); cdp.send("CSS.enable")
doc = cdp.send("DOM.getDocument")
nid = cdp.send("DOM.querySelector", {"nodeId": doc["root"]["nodeId"],
                                     "selector": ".subcat-scrollbar-thumb"})["nodeId"]
for entry in cdp.send("CSS.getMatchedStylesForNode", {"nodeId": nid})["matchedCSSRules"]:
    props = {p["name"]: p["value"] for p in entry["rule"]["style"]["cssProperties"]}
    if "display" in props:
        print(entry["rule"]["selectorList"]["text"], "->", props["display"])
```

Esto devolvió el culpable en un segundo:

```
a:empty, ul:empty, dl:empty, div:empty, section:empty, ... -> none
```

---

## La causa raíz

`assets/base.css`, líneas 468-481 (viene del tema Dawn original):

```css
a:empty, ul:empty, dl:empty, div:empty, section:empty, article:empty,
p:empty, h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty {
  display: none;
}
```

La barrita es un div sin contenido:

```html
<div class="subcat-scrollbar-thumb" data-subcat-thumb></div>
```

Por lo tanto **estaba oculta siempre**, desde la primera versión. Solo se veía
la pista: una barra de un color de lado a lado. Ningún ajuste de color ni de
ancho podía cambiar nada, porque el elemento no se pintaba.

### El arreglo

```css
.brand-exp .subcat-scrollbar-thumb {
  display: block;   /* ← obligatorio, no cosmético */
  ...
}
```

Nuestro selector ya ganaba por especificidad (`0,2,0` contra el `0,1,1` de
`div:empty`), **pero la especificidad solo decide entre reglas que declaran la
misma propiedad**. Como nunca declaramos `display`, la única declaración que
existía era la de `base.css`, y ganaba por default.

### Cuándo te va a volver a morder

Cualquier elemento decorativo sin contenido en este tema: barras de progreso,
separadores, indicadores, puntos de carrusel, overlays. **Si creas un
`<div>` vacío y no se ve, es esto.** Dale `display` explícito o mete algo
dentro (`&nbsp;`, un `<span>`, o `content` vía pseudo-elemento).

---

## Las capas de caché de Shopify (todas reales, todas distintas)

Se confundieron entre sí varias veces. Son cuatro:

| Capa | Cómo se detecta | Cómo se resuelve |
|---|---|---|
| **Caché del navegador** | Solo te pasa a ti; en otro navegador se ve bien | `Cmd+Shift+R`, o una URL con parámetro único |
| **Caché de página de Shopify** | El `?v=` del asset no cambia aunque el tema sí | Guardar un `.liquid` (guardar un asset **no** basta). Republicar el tema **no** funciona |
| **Variante para bots** | `curl` sin User-Agent da versiones viejas | Mandar siempre User-Agent de navegador |
| **CDN del asset** | La URL con `?v=` es inmutable, `max-age` de 1 año | No hay nada que hacer: cada versión nueva genera una URL nueva |

### Ver el sitio sin ninguna caché de página

```
https://intemperiemexico.com/?preview_theme_id=147593723981
```

Verificado: **8 de 8 peticiones** devuelven la versión más reciente. Es la
forma confiable de comprobar un cambio recién subido.

Si el navegador insiste en mostrar algo viejo, agrega un parámetro cualquiera
para forzar una URL que nunca haya visto:

```
https://intemperiemexico.com/?preview_theme_id=147593723981&v=778899
```

---

## Errores de diagnóstico cometidos (para no repetirlos)

1. **Asumir caché tres veces seguidas.** Nunca lo fue. La señal de que **no**
   es caché: el `?v=` del asset cambia y el contenido servido es el nuevo.
2. **Probar el componente aislado y concluir que "el código está bien".**
   El entorno de prueba tiene que incluir todo el CSS del sitio.
3. **Pedir capturas de pantalla para diagnosticar.** Mandaron la
   investigación por el camino equivocado varias veces. Los headers y el
   contenido real de los archivos resolvieron en minutos lo que las capturas
   no aclararon en horas.
4. **Insistir en que era el navegador del cliente.** Cuando Safari (sin caché
   alguna) mostró exactamente lo mismo, esa teoría quedó descartada — y ahí
   había que cambiar de enfoque, no dar más instrucciones de limpieza.
5. **Recomendar republicar el tema.** No invalida los renders ya cacheados.
   Se probó y no sirvió de nada.

### El caso contrario: el código llegó y aun así se ve mal (25 ago 2026)

Los cinco de arriba son "lo cambié y no llega". Existe el reverso, y es
más traicionero porque el despliegue sale limpio: **el código llegó, el
`?v=` cambió, y el resultado en pantalla sigue mal.** Ahí no hay nada
que buscar en las capas de caché — el problema está en el CSS mismo.

**Caso real: `flex` se come los espacios.** La barra de promesas mostraba
**"Envíogratisdesde $799"**, todo pegado. No faltaba ningún espacio en el
Liquid. El elemento estaba en `display: inline-flex`, y en un contenedor
flex cada corrida de texto se envuelve en un *ítem anónimo*: **las
secuencias de solo espacios entre ítems no se renderizan.** Como ese
texto llevaba `<strong>gratis</strong>` adentro, quedaba partido en tres
ítems y los espacios desaparecían.

> **Regla:** nunca poner en `flex` ni `inline-flex` un elemento cuyo
> texto lleve etiquetas inline adentro. Si hay que alinear, se alinea el
> contenedor, no el elemento que contiene la frase.

Lo que delató la causa fue **comparar con los hermanos**: los otros
cuatro textos de la misma barra sí tenían sus espacios, y eran justo los
que no llevaban `<strong>`. Cuando un elemento falla y sus hermanos no,
la diferencia entre ellos **es** el diagnóstico.

**Caso real: un token de color que no aplica en modo claro.** El acento
usaba `var(--brand-accent)`, que en este tema vale `#234D3B` (verde muy
oscuro) y solo pasa a `#57B58A` dentro de
`@media (prefers-color-scheme: dark)`. Como el sitio es negro **siempre**,
un visitante con el sistema operativo en modo claro habría visto verde
oscuro sobre negro. Se detectó leyendo el CSS, no en pantalla — con la
máquina en modo oscuro se ve perfecto.

> **Regla:** los tokens que cambian con `prefers-color-scheme` no sirven
> para elementos que viven siempre sobre el fondo oscuro del sitio. Este
> tema es oscuro **por diseño**, no por preferencia del visitante.

### Verificar mal es peor que no verificar

Cuatro veces en este proyecto una verificación dio negativo y el código
estaba bien. La causa siempre fue la misma clase de error:

| Lo que se buscó | Por qué falló |
|---|---|
| `"Ver todos los detalles"` en el HTML | Existía, pero con `display:none` |
| `"Agotado"` en la ficha | Existía 2 veces: un badge oculto por CSS y una cadena de JS |
| `"envío gratis"` en `/cart` | El copy real es **"Tu envío es GRATIS"** |
| `im-xsell` en el HTML | La clase real es **`imx-crosssell`** |
| `grep -c im-promesas` en el CSS servido | Dio 1: **Shopify minifica a una sola línea** y `grep -c` cuenta líneas, no coincidencias. Usar `grep -o \| wc -l` |

**La forma general:** buscar el texto o la clase que uno *recuerda* no es
verificación — es poner a prueba la propia memoria. Hay que partir del
mecanismo (el snippet que lo emite, la clase que declara, lo que la
herramienta cuenta de verdad) y de ahí derivar qué buscar.

---

## Resumen ejecutable

```bash
# 1. ¿Cambió la huella del asset?
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
curl -s -A "$UA" https://intemperiemexico.com/ | grep -o 'brand-experience.css?v=[0-9]*'

# 2. Si no cambió -> desplegar
export SHOPIFY_ADMIN_TOKEN=shpat_...
python3 scripts/deploy-shopify.py

# 3. Invalidar el caché de página (guardar un .liquid, no un asset)
#    editar la línea "rev AAAA-MM-DD" en sections/brand-experience.liquid
python3 scripts/deploy-shopify.py sections/brand-experience.liquid

# 4. Verificar sin caché
curl -s -A "$UA" -c /tmp/cj -L "https://intemperiemexico.com/?preview_theme_id=147593723981" -o /tmp/pv.html
grep -o 'brand-experience.css?v=[0-9]*' /tmp/pv.html

# 5. Si el archivo es correcto y aun así no se ve -> renderizar la página
#    completa en Chromium y consultar la cascada con CDP (ver arriba)
```
