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

## Nota sobre "Browser Harness" (investigado, no instalado)

Se investigó `github.com/browser-use/browser-harness` como posible
herramienta para que Claude controle un navegador real de forma directa
(en vez de pasar prompts a la extensión "Claude en Chrome"). **No se
instaló**: la herramienta depende del protocolo CDP de Chrome, que
funciona sobre WebSocket — y el proxy de red de este entorno de trabajo
tiene las conexiones WebSocket explícitamente marcadas como no
soportadas ("Not supported through the proxy — report, do not work
around"). No es un problema de configuración resoluble instalando la
herramienta; sería necesario correrla en una máquina con acceso de red
real (como la computadora del cliente), no en este entorno remoto.
