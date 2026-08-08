# Skills utilizadas en este proyecto

Documento de referencia sobre qué capacidades especializadas de Claude
("skills") se usaron para construir Intemperie México, y cuáles siguen
disponibles para trabajo futuro. Una skill es un paquete de
conocimiento/herramientas específico que Claude puede invocar para
tareas de un dominio concreto (en vez de improvisar desde cero cada vez).

---

## Usada activamente en este proyecto

### `ui-ux-pro-max`
**Para qué se usó:** definir toda la dirección visual y de diseño del
rediseño — la paleta de color, el sistema tipográfico, el estilo
general ("Apple × Gymshark"), y las reglas de espaciado/movimiento que
se documentaron en
[`design-system/intemperie-mexico/MASTER.md`](./design-system/intemperie-mexico/MASTER.md).

Esa skill trae una base de datos consultable de 84 estilos visuales, 192
paletas de color, 74 combinaciones tipográficas y guías de UX — el
`MASTER.md` del proyecto es literalmente su salida (se nota en el
archivo por las referencias a búsquedas `--domain style/color/typography`
y al mecanismo de `--design-system auto-match`, que son propios de esta
skill). La dirección final no fue un match automático literal de la
base de datos, sino síntesis manual a partir de búsquedas dirigidas más
la instrucción explícita del cliente ("estilo Apple, enfocado al
outdoor, con mucho movimiento en pantalla").

**Sigue vigente para:** cualquier ajuste futuro de diseño — nuevas
secciones, nuevos componentes, revisiones de paleta — debería consultarse
primero contra las reglas ya establecidas en el `MASTER.md` antes de
improvisar estilos nuevos, para no romper la consistencia visual lograda.

### `playwright` + Chromium — usada el 7 de agosto de 2026
**Qué es:** control de un navegador real desde Python, para renderizar
páginas y medirlas de verdad en vez de deducir desde capturas.

**Descubrimiento importante:** se había concluido (al descartar Browser
Harness) que este entorno no tenía navegador. **Es incorrecto** — Chromium
viene preinstalado en `/opt/pw-browsers/chromium-1194/`, y basta
`pip install playwright` para usarlo. Lo que sí está bloqueado es la
navegación a sitios externos (el proxy corta con `ERR_CONNECTION_RESET`),
pero se rodea descargando la página con `curl`, reescribiendo las URLs de
CSS/JS a rutas locales, y abriéndola con `file://`.

**Para qué se usó:** encontrar por qué la barrita deslizable de la franja
de subcategorías era invisible, después de que tres teorías equivocadas
(caché de Shopify, caché del navegador, deploy fallido) costaran dos días.
Renderizando la página completa se vio que el thumb tenía `display: none`,
y consultando la cascada real con **CDP** (`CSS.getMatchedStylesForNode`)
apareció el culpable: `base.css` trae `div:empty { display: none }` y el
thumb es un div sin contenido.

**Dos trampas que hay que conocer:**
- Hay que hacer `scroll_into_view_if_needed()` antes de medir: Chrome no
  renderiza lo que está fuera de pantalla y `getComputedStyle` devuelve
  `display: none` para esos elementos (produjo una pista falsa).
- Recorrer `document.styleSheets` desde `file://` **no sirve**: Chrome
  bloquea leer `cssRules` de hojas externas, y saltarlas con `try/catch`
  devuelve "ninguna regla aplica" — un falso negativo. Usar CDP.

Método completo en
[`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md).

---

### `graphify` (Graphify Labs) — instalada el 6 de agosto de 2026
**Qué es:** convierte una base de código en un grafo de conocimiento
consultable, usando análisis AST local (tree-sitter, sin enviar código a
ningún servidor) — repo:
[`Graphify-Labs/graphify`](https://github.com/Graphify-Labs/graphify).

**Para qué se usó:** el tema real de la tienda (secciones, snippets,
templates, JS, CSS) vive en los servidores de Shopify, no en este
repositorio de GitHub — se edita vía API hacia una carpeta temporal que
nunca se guardaba. Antes de instalar Graphify hacía falta darle algo
real que mapear, así que primero se **descargaron los 364 archivos del
tema en vivo** a la carpeta [`tema-shopify/`](./tema-shopify/) (esto
además sirve como respaldo versionado del tema, algo que no existía
antes). Con eso, se corrió Graphify y generó:

- **452 nodos, 697 conexiones, 37 comunidades** de código relacionado
  (en la primera corrida; ver "Estado" más abajo para la cifra vigente)
- `tema-shopify/graphify-out/graph.json` — el grafo completo
- `tema-shopify/graphify-out/GRAPH_REPORT.md` — resumen legible con los
  "god nodes" (componentes más conectados/importantes de la
  arquitectura): `PredictiveSearch`, `FacetFiltersForm`,
  `SlideshowComponent`, `CartItems`, `CartDrawer`, `MenuDrawer`, entre
  otros
- `tema-shopify/graphify-out/graph.html` — visualización interactiva
  generada por Graphify (2D, la que trae la herramienta por defecto)

**Visualización 3D a la medida (6 de agosto de 2026):** además de la
visualización estándar de Graphify, se construyó una versión propia —
`tema-shopify/graphify-out/intemperie-mapa-codigo-3d.html` — con
renderizado 3D estilo "red neuronal": los 452 nodos flotan en el
espacio agrupados por comunidad (simulación de física con repulsión +
resortes + cohesión de grupo), con rotación libre, zoom, búsqueda en
vivo, y un panel de detalle al hacer clic en cualquier nodo. Usa las
mismas fuentes y paleta de marca del sitio (Instrument Sans, Geist Mono,
negro/verde). Es un archivo HTML autocontenido — se puede abrir
directo en cualquier navegador sin instalar nada. También publicado
como Artifact privado para verlo sin descargar nada.

**Cómo usarla en el futuro:**
```bash
cd tema-shopify
graphify explain "NombreDelComponente"      # qué es y con qué conecta
graphify path "A" "B"                        # camino entre dos piezas de código
graphify query "pregunta en lenguaje natural"
graphify god-nodes --top 15                  # los archivos/componentes más centrales
```

**Mantenerlo al día (agregado el 7 de agosto de 2026):** el grafo se
queda viejo en cuanto se toca el código. `GRAPH_REPORT.md` indica el
commit desde el que se construyó, para detectarlo. Para refrescar todo:

```bash
cd tema-shopify && graphify update .        # reconstruye el grafo (sin costo de API)
cd .. && python3 scripts/rebuild-mapa-3d.py # actualiza el mapa 3D
```

El mapa 3D lleva los datos embebidos en un `var DATA = {...}` y se había
construido a mano, así que no había forma práctica de refrescarlo.
`scripts/rebuild-mapa-3d.py` lee `graph.json` y reescribe **solo** ese
bloque, dejando intacto el resto del HTML.

**Estado al 7 de agosto de 2026:** 459 nodos, 705 conexiones, 39
comunidades (topología construida en el commit `bc436f3`).

Dos avisos normales de `graphify update` que **no son errores**:
- *"72 source files produced zero nodes"* — son los `.json` de `locales/`
  y `config/`, que no tienen estructura de código.
- *"No code-graph topology changes detected; outputs left untouched"* —
  aparece cuando los cambios fueron solo de CSS, comentarios o textos.
  Esas ediciones no crean ni eliminan nodos ni conexiones, así que el
  grafo sigue siendo exacto aunque el commit estampado sea anterior.

⚠️ **Importante:** el grafo es una fotografía del código al momento de
generarlo (commit `7e40cffa`). Si se vuelve a descargar el tema después
de más cambios en Shopify, hay que correr `graphify update tema-shopify`
para que el grafo no quede desactualizado.

**Nota sobre comunidades sin nombre:** las 37 comunidades detectadas
quedaron como "Community 0", "Community 1", etc. — nombrarlas con
lenguaje natural (`graphify label`) requiere un backend de LLM
configurado (API key de Gemini/Claude/OpenAI), que no se configuró en
esta corrida para no generar costo sin confirmarlo primero. Los nodos
individuales y sus conexiones sí tienen nombres reales y son
consultables tal como están.

---

## Disponibles pero no usadas todavía (relevantes para este proyecto)

Estas skills están disponibles en el entorno y podrían aplicar a trabajo
futuro de la tienda:

| Skill | Para qué serviría aquí |
|---|---|
| `design` | Generación de logos, banners, íconos, mockups de identidad — útil si se necesitan más variantes de Cartucho o assets de marca nuevos |
| `banner-design` | Banners para redes sociales/ads si se activa Instagram/TikTok o campañas pagadas |
| `dataviz` | Si en algún momento se quiere mostrar gráficas de ventas/tráfico en algún dashboard o reporte |
| `artifact-design` / `artifact-diagramming` | Para construir páginas o diagramas visuales que se comparten como link (no aplica al tema de Shopify en sí, sí a reportes internos) |

---

## Investigadas — no instaladas

| Nombre | Repositorio | Para qué serviría | Estado |
|---|---|---|---|
| **Browser Harness** | [`browser-use/browser-harness`](https://github.com/browser-use/browser-harness) | Que Claude controle un navegador real directamente vía protocolo CDP (con "auto-sanación": escribe y mejora su propio código auxiliar en ejecución), en vez de pasar prompts a la extensión "Claude en Chrome" | ❌ **No instalada.** CDP funciona sobre WebSocket, y el proxy de red de este entorno de trabajo tiene las conexiones WebSocket explícitamente marcadas como no soportadas ("Not supported through the proxy — report, do not work around"). No es un problema de configuración resoluble instalando la herramienta; requeriría correrla en una máquina con acceso de red real (como la computadora del cliente), no en este entorno remoto. Revisar de nuevo si en el futuro se trabaja desde un entorno sin esa restricción. |
