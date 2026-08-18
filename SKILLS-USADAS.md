# Skills utilizadas en este proyecto

Documento de referencia sobre qué capacidades especializadas de Claude
("skills") se usaron para construir Intemperie México, y cuáles siguen
disponibles para trabajo futuro. Una skill es un paquete de
conocimiento/herramientas específico que Claude puede invocar para
tareas de un dominio concreto (en vez de improvisar desde cero cada vez).

Incluye también los **plugins de terceros** instalados desde marketplaces
de la comunidad (sección "Plugins instalados"), que son código externo y
por eso se documentan con su origen, versión y qué se revisó antes de
instalarlos.

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

### "Claude en Chrome" (extensión de navegador) — usada intensivamente el 11-12 de agosto de 2026
**Qué es:** extensión que deja a Claude navegar y hacer clics en un
navegador real con la sesión del usuario ya iniciada, a partir de un
prompt de texto — no es una skill instalable, es una superficie
distinta de Claude con su propio criterio de qué ejecutar y qué no.

**Para qué se usó:** todo el proceso de configurar Meta Business
Manager para Intemperie México (ver `INSTRUCTIVO-META-ADS.md` e
`INSTRUCTIVO-FACEBOOK-ADS.md`) — vincular la página, revisar la cuenta
publicitaria existente, instalar el canal de Shopify, corregir el
catálogo, y crear la app/usuario del sistema necesarios para el token.
Fue la primera vez en el proyecto que se usó para un flujo largo de
varias idas y vueltas (más de 10 prompts encadenados), no para una
tarea puntual.

**Patrón de trabajo que funcionó (y por qué):**
- **Prompts concisos, con pasos numerados y qué reportar al final** —
  ya estaba anotado como buena práctica desde el 4 de agosto
  (`PENDIENTES.md`), y se confirmó aquí a mayor escala.
- **Modo "guía, no ejecutes"** para las acciones sensibles: se le pidió
  explícitamente que navegara y describiera qué botón tenía enfrente,
  pero que los clics de crear el usuario del sistema, asignar activos y
  generar el token los hiciera el dueño de la cuenta con su propio
  mouse. Esto se volvió necesario porque **Claude en Chrome se negó por
  su cuenta** a crear el usuario del sistema y generar el token la
  primera vez que se le pidió completo — juicio correcto: son acciones
  que otorgan acceso administrativo y una credencial capaz de gastar
  dinero real, del tipo que no debería ejecutar un agente sin que el
  dueño confirme cada clic. Esa misma línea (navegación y acciones de
  bajo riesgo sí, acceso/credenciales/pagos no) se mantuvo el resto del
  proceso sin que hiciera falta repetir la instrucción cada vez.
- **Freno explícito para verificación de identidad/negocio:** en un
  prompt se le pidió detenerse si aparecía cualquier paso de
  "Verificación de la empresa" (documentos legales, RFC) — apareció, y
  se detuvo ahí tal como se le pidió, sin intentar completarlo ni
  rodearlo.
- **Diagnóstico antes de actuar en masa:** cuando el catálogo de Meta
  apareció desactualizado, primero se le pidió confirmar la causa
  (filtrar y contar productos sin publicar) antes de ejecutar una
  acción sobre 250+ productos a ciegas.

**Limitación real encontrada:** al ejecutar una corrección masiva
("publicar todos los productos al canal") sin filtrar por categoría
primero, se publicaron también productos prohibidos (armas, munición)
al catálogo de Meta — tuvo que corregirse con una segunda pasada
explícita de exclusión. Lección para prompts futuros: cuando una
acción masiva puede tocar categorías con reglas distintas, hay que
decir explícitamente qué excluir en el mismo prompt, no asumir que se
va a inferir solo.

**Vigente para:** cualquier tarea futura que requiera tocar una cuenta
externa con sesión de navegador (Meta, Google, cualquier plataforma sin
API accesible desde este entorno) — usar el mismo patrón de prompts
numerados + modo guía para lo sensible.

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

## Plugins instalados

Además de las skills del entorno, el proyecto tiene plugins de terceros
instalados desde marketplaces de la comunidad. A diferencia de las skills
integradas, estos son **código de terceros que se ejecuta con los mismos
permisos que Claude**, así que cada uno se revisa antes de instalarlo y
se anota aquí qué es y de dónde viene.

### `the-architect` — diseño de arquitectura antes de construir

| | |
|---|---|
| Marketplace | `soyenriquerocha` — [`Hainrixz/the-architect`](https://github.com/Hainrixz/the-architect) |
| Versión | 2.5.0 |
| Licencia | MIT |
| Instalado | 18 de agosto de 2026 |
| Alcance | Usuario (disponible en todas las sesiones, no solo este repo) |

```bash
claude plugin marketplace add Hainrixz/the-architect
claude plugin install the-architect@soyenriquerocha
```

**Qué hace.** Es un meta-agente de arquitectura: entrevista sobre lo que
se quiere construir y genera un *blueprint* autocontenido —
suficientemente detallado como para que otra sesión de Claude lo
construya sin volver a preguntar nada. Escribe en `./blueprints/` del
directorio de trabajo.

**Comandos que agrega:**

| Comando | Para qué |
|---|---|
| `/architect` | Entrevista completa en cuatro fases → blueprint |
| `/architect-quick` | Versión de tres preguntas con valores por defecto (~10 min) |
| `/architect-brownfield` | Diseña cambios sobre un repo que ya existe; mapea el código antes de preguntar |
| `/architect-next` | Retoma una construcción interrumpida: devuelve el siguiente paso desbloqueado |
| `/architect-refresh` | Revalida versiones de dependencias contra los registros en vivo |
| `/architect-audit` | Audita un blueprint existente y marca criterios de aceptación faltantes |

Trae además tres subagentes propios (`stack-researcher`,
`blueprint-writer`, `blueprint-validator`), y funciona en español.

**Dónde encaja en este proyecto.** El trabajo de la tienda hasta ahora ha
sido incremental — arreglar el carrito, conciliar inventario, lanzar una
campaña — y para eso no hace falta un blueprint. Donde sí serviría es en
lo que aún no existe y es de tamaño considerable: por ejemplo un panel
propio de métricas de tienda + campañas, o automatizar la conciliación de
inventario de punta a punta contra el POS. Ahí el patrón de "diseñar
completo antes de escribir código" evita justo el tipo de error que ya
costó caro en este proyecto (la allowlist de categorías diseñada sobre un
catálogo obsoleto, sección 32 del manual).

**Lo que hay que saber antes de usarlo.** Los blueprints que genera
incluyen un campo `Verify` con **comandos de bash pensados para
ejecutarse solos** (correr pruebas, consultar la base de datos, hacer
tags de git). Eso es potente y también es la parte a revisar: conviene
leer los comandos antes de dejar que una sesión los ejecute en
automático, sobre todo en un repo conectado a una tienda con ventas
reales.

**Antes de instalar se verificó:** repositorio público con 462 estrellas
y 86 forks, licencia MIT, autor identificable (Enrique Rocha,
tododeia.com). No es una recomendación permanente — si el plugin deja de
mantenerse o cambia de manos, hay que volver a evaluarlo. Se desinstala
con `claude plugin uninstall the-architect@soyenriquerocha`.

---

## Agentes instalados: The Agency (`agency-agents`)

| | |
|---|---|
| Repositorio | [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) |
| Licencia | MIT |
| Instalado | 18 de agosto de 2026 |
| Cantidad | **270 agentes** en `/root/.claude/agents/` |

```bash
git clone --depth 1 https://github.com/msitarzewski/agency-agents
cd agency-agents && ./scripts/install.sh --tool claude-code --no-interactive
```

**No es un plugin ni un marketplace.** Es una colección de definiciones de
agentes en Markdown (personalidad, alcance, entregables) que un script
copia a `~/.claude/agents/`. No instala código ejecutable: los archivos
que quedan son `.md` con instrucciones. El único código que corre es el
propio `install.sh`, y lo que hace es copiar archivos — se revisó antes
de ejecutarlo.

Se instaló completo (270 agentes, 17 divisiones). Si la lista estorba,
`install.sh` acepta `--division a,b` y `--agent slug` para instalar solo
una parte.

### Los que aplican a esta tienda

La división que más encaja con el trabajo actual es **`paid-media`**, que
es exactamente el terreno de la campaña de Meta (secciones 33 y 35 del
manual):

| Agente | Para qué aquí |
|---|---|
| `paid-media-paid-social-strategist` | Estrategia de embudo completo en Meta — el problema abierto de prospección → retargeting |
| `paid-media-tracking-specialist` | Medición y eventos del pixel; útil para el tema de optimizar a `PURCHASE` sin compras |
| `paid-media-creative-strategist` | Iteración de creativos y copy más allá de la v2 actual |
| `paid-media-auditor` | Revisión de cuenta cuando haya datos suficientes (día 7 en adelante) |

También hay 36 agentes de `marketing` (SEO, contenido, growth) y 10 de
`design`, que se cruzan con trabajo ya hecho — conviene compararlos
contra lo que ya está documentado en este proyecto antes de darles peso:
lo que aquí está escrito salió de la tienda real, no de un manual
genérico.

### Advertencias

> ⚠️ **Los agentes traen `tools: ... Bash` en su definición.** Son
> personalidades con permiso de ejecutar comandos, no solo texto. En un
> repositorio conectado a una tienda con ventas reales y a una cuenta
> publicitaria que gasta dinero, conviene revisar qué propone un agente
> antes de dejarlo actuar solo.

> ⚠️ **Consejos genéricos contra hechos verificados.** Estos agentes
> traen buenas prácticas generales; este repositorio tiene hallazgos
> específicos y comprobados de *esta* tienda (que Meta prohíbe anunciar
> armas de aire, que el presupuesto real son $700/semana, que el catálogo
> estuvo muerto medio año). Cuando se contradigan, gana lo documentado
> aquí.

> ⚠️ **Se instalaron en el contenedor, no en el repositorio.**
> `/root/.claude/agents/` vive en el entorno remoto, que es efímero. Si
> en una sesión futura los agentes no aparecen, hay que volver a correr
> el `install.sh` — no es un fallo, es dónde quedan los archivos.

---

## Investigadas — no instaladas

| Nombre | Repositorio | Para qué serviría | Estado |
|---|---|---|---|
| **Browser Harness** | [`browser-use/browser-harness`](https://github.com/browser-use/browser-harness) | Que Claude controle un navegador real directamente vía protocolo CDP (con "auto-sanación": escribe y mejora su propio código auxiliar en ejecución), en vez de pasar prompts a la extensión "Claude en Chrome" | ❌ **No instalada.** CDP funciona sobre WebSocket, y el proxy de red de este entorno de trabajo tiene las conexiones WebSocket explícitamente marcadas como no soportadas ("Not supported through the proxy — report, do not work around"). No es un problema de configuración resoluble instalando la herramienta; requeriría correrla en una máquina con acceso de red real (como la computadora del cliente), no en este entorno remoto. Revisar de nuevo si en el futuro se trabaja desde un entorno sin esa restricción. |
