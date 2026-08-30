# Instructivo — Operación de Meta Ads (Facebook/Instagram) de Intemperie México

Esta es la guía de referencia para **operar** la cuenta de Meta Ads —
comandos, reglas, convenciones y lecciones aprendidas. Para la
**configuración inicial** (Business Manager, cuenta publicitaria, System
User, token), ver `INSTRUCTIVO-META-ADS.md` — ese instructivo ya se
ejecutó completo el 12 de agosto de 2026 y no hace falta repetirlo salvo
que el token deje de servir.

---

## 1. Estado de la cuenta (referencia rápida)

| Dato | Valor |
|---|---|
| Cuenta publicitaria | `act_1264279685553718` — "Intemperie México Ads" |
| Moneda | MXN |
| Business Manager | ID `1324138699447721` — "Intemperie México" |
| Pixel de Meta | `2011984246408291` — "Intemperie México Pixel" |
| Catálogo de Meta | `1746844133017649` — **327 productos**, el único (desde 15 ago 2026) |
| Campaña vigente | `120249613902440175` — "IMX \| Ventas \| Pesca y Óptica...", **activa desde el 15 ago 2026** |
| Conjunto vigente | `120249759861080175` — "...AddToCart \| Hombres 45+ \| >=$500 \| Ago26 v3", optimiza a **`ADD_TO_CART`**, $55/día, **en PAUSA** desde su creación el 25 ago. Anuncio `120249759862720175`, creativo `1005168512560752`. Los conjuntos v1 y v2 quedaron en pausa, no borrados |
| Conjunto de productos | `1455189226500365` — **38 productos ≥$500**, en stock, sin accesorios de arma (piso subido de $300 el 24 ago) |
| Tope de gasto | **a nivel de CUENTA**, `$285` y **consumido al 100%** — la entrega está detenida desde el 21 ago. ⚠️ Ver §6-bis: se apaga en silencio |
| App del System User | "Claude Integration" — ID `1038516402111748` |
| Canal en Shopify | App oficial "Facebook & Instagram", instalada desde el 16 feb 2026 |

**El pixel corre por el canal oficial de Shopify, no por el snippet
manual del tema.** El tema tiene un setting "Meta Ads (Facebook /
Instagram)" en Personalizar tema con un campo `meta_pixel_id` — **debe
quedar vacío**. Si se llena, se duplican los eventos (el canal oficial ya
inyecta el pixel automáticamente) y se arruina la atribución. Ese código
es un plan B para el día que se decida migrar fuera del canal oficial de
Shopify, no algo que activar ahora.

---

## 2. Qué SÍ y qué NO se puede anunciar

Meta prohíbe por política armas, munición y accesorios que modifiquen la
función de un arma ([política
oficial](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/weapons-ammunitions-explosives/)).
El riesgo no es que rechacen un anuncio: es el **baneo permanente** de
toda la cuenta publicitaria y el Business Manager.

**Excluido del canal "Facebook & Instagram" en Shopify (confirmado el 12
de agosto):**
- Colección "Rifles y Pistolas de Aire" completa
- Colección "Diábolos y Municiones" completa
- Subcolección "Miras Telescópicas" (dentro de "Miras y Binoculares" —
  Binoculares, Monoculares y Accesorios de Óptica sí quedan incluidos)

**Antes de crear cualquier campaña o conjunto de anuncios nuevo**,
verificar que apunte al catálogo `1746844133017649` — el único que
existe, ya filtrado desde Shopify, con solo los 327 productos
anunciables. (El catálogo viejo `1230530145855635`, que tenía 56
huérfanos incluidas armas, se borró el 15 de agosto.)

La verificación de que el catálogo está limpio (0 categorías prohibidas)
está en `INSTRUCTIVO-CATALOGO-META.md`, sección 5.

**Si en algún momento se agrega un producto nuevo a esas 3 categorías
prohibidas**, ya no hay que excluirlo a mano (actualizado 15 ago 2026).
Correr:

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...   # necesita scope write_publications
python3 scripts/sincronizar-canal-meta.py
```

Publica lo anunciable, excluye lo prohibido, y no toca lo que ya está
bien. Detalle completo en
📄 **[`INSTRUCTIVO-CATALOGO-META.md`](./INSTRUCTIVO-CATALOGO-META.md)**.

---

## 3. Comandos — `scripts/meta-ads.py`

```bash
export META_ACCESS_TOKEN=...          # token del System User (no expira, no se commitea)
export META_AD_ACCOUNT_ID=act_1264279685553718

python3 scripts/meta-ads.py listar                       # campañas y su estado
python3 scripts/meta-ads.py reporte --dias 7              # métricas por campaña
python3 scripts/meta-ads.py activos                       # página/IG/catálogo/pixel (solo lectura)
python3 scripts/meta-ads.py crear-campania --presupuesto 100   # crea todo en PAUSA. MXN por DÍA
python3 scripts/meta-ads.py activar --campania <id>       # enciende los 3 niveles
python3 scripts/meta-ads.py pausar --campania <id>        # detiene entrega y gasto
python3 scripts/meta-ads.py presupuesto --campania <id> --monto 100   # MXN/día
```

El token se pide siempre por variable de entorno, nunca se escribe en
ningún archivo del repo (mismo patrón que `SHOPIFY_ADMIN_TOKEN`).

Desde el 18 de agosto de 2026, `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`
y `SHOPIFY_ADMIN_TOKEN` están configurados como **variables de entorno
del entorno de Claude Code** (claude.ai/code → configuración del
entorno), así que se cargan solas en cada sesión nueva. Si algún comando
falla por token ausente, ver la **sección 34 del manual** antes de pedir
uno por chat. Un secret de GitHub **no** sirve para esto: solo es
legible dentro de un workflow, no desde una sesión de Claude.

> ⚠️ **Esa tabla describe la intención, no un estado verificado en cada
> sesión.** El 24 de agosto de 2026 `SHOPIFY_ADMIN_TOKEN` **no estaba
> presente** en la sesión, aunque figuraba aquí como configurado desde
> el 18 (las dos de Meta sí estaban). No asumas que está disponible:
> compruébalo con `env | grep -oE '^(SHOPIFY|META)[A-Z_]*'`.
>
> Para el token de Shopify en concreto, el procedimiento completo está
> en [`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md).

> ⚠️ `reporte --dias N` **incluye el día en curso** y calcula las fechas
> en `America/Chihuahua`, la zona de la cuenta. No siempre fue así: usaba
> `date_preset=last_7d`, que excluye el día de hoy, y eso produjo un
> falso *"no hay impresiones"* el 17 de agosto de 2026. Si en el futuro
> se agregan comandos que consulten `/insights`, usar `time_range`
> explícito, nunca un preset.

> ⚠️ **`--presupuesto` y `--monto` son MXN por DÍA, no por semana.** El
> presupuesto acordado con el cliente son **$700 MXN/semana = $100/día**.
> Antes de correr cualquiera de los dos comandos, reconfirma la cifra:
> una vez se arrastró "$600/día" durante días en la documentación, que
> era seis veces el presupuesto real.

### Los tres niveles de Meta (la trampa más importante)

Una campaña de Meta tiene tres niveles anidados, y **los tres deben estar
en `ACTIVE` para que se entregue un solo anuncio**:

```
Campaña  →  Conjunto de anuncios  →  Anuncio
```

Con cualquiera de ellos en `PAUSED`, no se muestra nada. Esto causó un
bug real el 15 de agosto: `activar` solo encendía la campaña, imprimía
"Campaña activada" y dejaba los otros dos pausados — éxito aparente, cero
entrega. Ya está corregido (enciende de adentro hacia afuera), pero
**verifica siempre los tres** después de activar:

```bash
for id in <campania> <conjunto> <anuncio>; do
  curl -sS -A "Mozilla/5.0" \
    "https://graph.facebook.com/v21.0/$id?fields=name,status,effective_status&access_token=$META_ACCESS_TOKEN"
done
```

Para **pausar** sí basta con la campaña: nada de lo que cuelga de ella se
entrega.

### Estados que vas a ver

| Estado | Qué significa |
|---|---|
| `ACTIVE` | Entregando normal |
| `PAUSED` | Detenido a propósito, no gasta |
| `IN_PROCESS` | Revisión automática de Meta sobre el creativo. Normal al crear o activar un anuncio, se resuelve solo en minutos. **No hay que hacer nada.** |
| `DISAPPROVED` | Meta rechazó el anuncio. Avisa por correo con el motivo. Revisar que no haya productos prohibidos en el catálogo. |
| `WITH_ISSUES` | Problema de cuenta o pago, revisar en el Administrador de anuncios |

---

## 4. Convenciones para campañas nuevas

Las 6 campañas encontradas el 12 de agosto (`"Test"`, `"Test 3D"`,
`"Nueva campaña de Interacción"`, `"PAGINA DE FACEBOOK"`, etc.) se
eliminaron por no seguir ningún criterio claro y llevar 4 meses activas
sin entregar nada. Toda campaña nueva sigue este formato de nombre:

```
IMX | <objetivo> | <categoría> | <detalle> | <mes-año>
```

Ejemplos: `IMX | Ventas | Pesca | Carretes Shimano | Ago26`

- **Objetivo inicial recomendado:** Ventas/Conversiones (`OUTCOME_SALES`),
  apoyado en el pixel ya activo.
- **Alcance:** México, sin segmentar por ciudad (decisión del negocio de
  no exponer que opera desde Cuernavaca).
- **Toda campaña nueva se crea en estado `PAUSED`** y se deja así hasta
  que el cliente la revise y confirme activarla explícitamente.

---

## 4-bis. La campaña vigente y su seguimiento

**Activa desde el 15 de agosto de 2026.**

| | |
|---|---|
| Campaña | `IMX \| Ventas \| Pesca y Óptica \| Catálogo dinámico \| Ago26` |
| ID | `120249613902440175` |
| Conjunto | `120249613902510175` |
| Anuncio | `120249614071740175` |
| Presupuesto | $100 MXN/día ($700/semana) |
| Optimización | Conversiones → evento Compra |

### Calendario de revisión

| Cuándo | Qué hacer |
|---|---|
| **Primeras 48-72 h** | **No tocar nada.** Editar presupuesto o segmentación reinicia la fase de aprendizaje de Meta. Solo verificar que el anuncio salió de `IN_PROCESS`. |
| Día 7 | Primer reporte real: `meta-ads.py reporte --dias 7` |
| Semanal | Gasto, CPM, CTR, compras y costo por compra |

### Qué esperar de verdad con este presupuesto

$100 MXN/día son unos ~5 USD. Meta necesita del orden de **50
conversiones por semana** para que una campaña salga de la fase de
aprendizaje y el algoritmo optimice bien. Con este presupuesto es
previsible ver **1-3 ventas por semana**.

Eso no significa que la campaña esté mal configurada: significa que es un
**test de validación del embudo**, no una campaña optimizada. Sirve para
comprobar que el pixel registra, que el catálogo se muestra bien y que
hay tráfico que convierte. Juzgarla con las métricas de una campaña
madura llevaría a conclusiones equivocadas.

Si tras 2-3 semanas hay señales de que convierte, el camino es subir
presupuesto **gradualmente** (no más de ~20% por ajuste, ver sección 5)
para no reiniciar el aprendizaje.

---

## 4-ter. El texto del anuncio (copy)

**Vigente desde el 15 de agosto de 2026** (creativo `1514670357100398`):

> 🎣 El pez de tu vida no se escapó por mala suerte.
>
> Cañas, carretes y señuelos probados en agua real — no en catálogo.
>
> ⚡ ENVÍO GRATIS desde $799 · Entrega en 2-7 días a todo México

CTA: **Comprar ahora** (`SHOP_NOW`).

### Qué pesa y qué no en un anuncio de catálogo

Lo que ve el cliente son **dos capas**:

| Capa | Quién la controla |
|---|---|
| Texto superior | Tú (este copy, es fijo para todos) |
| Tarjetas de producto (foto, nombre, precio) | **Meta**, individualmente por usuario |

Meta arma la vitrina de cada persona según lo que vio en el sitio (pixel)
y su comportamiento: al que anduvo viendo cañas le muestra cañas. **No se
elige qué producto ve cada quien**, y eso es deseable — el algoritmo
acierta más que una selección manual.

Consecuencia práctica: **el copy importa menos de lo que parece.** Lo que
vende es la tarjeta del producto. Vale la pena tener un buen texto, pero
no es donde está la palanca principal de rendimiento.

### Reglas al cambiar el copy

- **Cambiar el creativo reinicia parte de la fase de aprendizaje.** En
  una campaña recién lanzada da igual; en una madura y funcionando, tiene
  costo real. No lo toques por gusto.
- El texto actual **está sesgado a pesca a propósito** (252 de 324
  productos). Si algún día se separan campañas por categoría, cada una
  necesita su propio copy.
- Nada de afirmaciones exageradas o falsas urgencias: Meta las sanciona,
  y esta cuenta ya arrastra dos señalamientos por armas (uno del banco de
  Shopify, otro de la política de anuncios). No conviene sumar un tercero.

### Cómo cambiarlo

El texto por defecto de campañas nuevas vive en `scripts/meta-ads.py`,
dentro de `cmd_crear_campania` (campo `message` de `template_data`). Para
cambiarlo en un anuncio ya existente hay que crear un creativo nuevo y
asignarlo — un creativo no se edita en su lugar:

```bash
# 1. crear el creativo nuevo (POST /act_<id>/adcreatives)
# 2. asignarlo al anuncio:
curl -X POST "https://graph.facebook.com/v21.0/<ad_id>" \
  --data-urlencode 'creative={"creative_id":"<nuevo_id>"}' \
  -d "access_token=$META_ACCESS_TOKEN"
```

---

## 5. Reglas de presupuesto y optimización (para operación día a día)

- Nunca exceder el presupuesto mensual que el cliente fije.
- No escalar el presupuesto diario de una campaña más de ~20% en un solo
  ajuste sin que el cliente lo apruebe.
- Pausar automáticamente cualquier conjunto de anuncios con gasto
  significativo (definir umbral con el cliente) y cero conversiones
  después de un periodo razonable de aprendizaje (Meta recomienda no
  editar en las primeras 48-72h para no reiniciar el "learning phase").
- Reportar semanalmente: gasto, CPM, CTR, compras, costo por compra —
  usando `meta-ads.py reporte`.

---

## 5-bis. 🔴 No pruebes el checkout con la campaña activa

Comprobado el 25 de agosto de 2026, y costó seis meses de diagnóstico
equivocado.

**Los 4 checkouts abandonados de toda la historia de la tienda son del
propio dueño** ($302, $499, $738, $257), más el pedido de prueba #1005.
El pixel los registró como `add_payment_info` igual que a cualquier
visitante: **7 eventos, de los cuales ~5 eran pruebas propias.**

Durante meses se leyó eso como *"7 personas llegaron a pagar y ninguna
compró — algo pasa en el checkout"*, y se persiguió un problema que no
existía. **Ningún cliente real había llegado nunca a esa pantalla.**

**La regla:**

1. **No hagas compras ni checkouts de prueba mientras la campaña
   entregue.** Si la campaña está en pausa, adelante.
2. **Si es imprescindible, anota en el momento**: día, hora, monto y
   pasarela. Sin eso, el evento se vuelve indistinguible de un cliente.
3. Al leer el embudo, **cruza siempre Meta contra Shopify Admin →
   Pedidos → Pedidos abandonados**. Si los nombres son tuyos, el evento
   es tuyo.

> Shopify solo crea registro de checkout abandonado cuando el visitante
> deja datos de contacto. Los `initiate_checkout` que abandonan antes de
> escribir su correo **no dejan rastro en el admin** — por eso el cruce
> Meta↔Shopify no cuadra en número, y por eso los únicos que aparecen
> suelen ser las pruebas propias, que sí llegan lejos.

---

## 6. Fricciones ya resueltas (para no perder tiempo si se repiten)

Ver también sección 29 del `MANUAL-PROYECTO.md` para el relato completo.
Resumen accionable:

| Problema | Causa | Solución |
|---|---|---|
| "Para añadir un usuario del sistema, una app debe formar parte del portafolio" | Ninguna app registrada en el Business Manager | Crear una app sin caso de uso (Cuentas → Aplicaciones → Añadir) |
| Meta pide verificar la cuenta antes de crear la app | Requisito de Meta para cuentas nuevas creando su primera app | Verificar con teléfono, nunca con tarjeta |
| "Has elegido un nombre de usuario del sistema no válido" | El nombre incluía "System User" (redundante con el tipo de objeto) | Usar solo `Claude Integration` |
| "No hay permisos disponibles" al generar el token, aunque el rol ya era Administrador | La app se creó sin ningún caso de uso — sin producto Marketing API, no hay `ads_management` que ofrecer | Panel de la app → Casos de uso → Añadir → "Crea y administra anuncios con la API de marketing" |
| Catálogo de Meta desactualizado (56 de 250+ productos) | Los productos agregados después del alta inicial (feb 2026) nunca se publicaron al canal | Shopify Admin → Productos → seleccionar todos → "Incluir en los canales de venta" → Facebook & Instagram |
| Productos prohibidos apareciendo en el catálogo de Meta | La publicación masiva de arriba no filtra por categoría | Repetir el mismo flujo pero con "Excluir de los canales de venta", filtrando por las 3 colecciones prohibidas |
| El catálogo seguía en 56 productos pese a lo anterior (15 ago) | La app de Shopify llevaba desvinculada de Meta desde febrero: arreglar Shopify no servía de nada porque nadie empujaba los datos | Reconectar la app con un catálogo nuevo + `sincronizar-canal-meta.py --forzar-resync`. Ver sección 32 del manual |
| Catálogo nuevo recién conectado se queda en 0 productos | Shopify solo empuja cuando algo *cambia*; si los productos ya estaban publicados, no hay evento que enviar | `sincronizar-canal-meta.py --forzar-resync` (recicla la publicación para generar los eventos) |
| `"Se debe especificar Verdadero o Falso en el campo is_adset_budget_sharing_enabled"` al crear campaña | Campo obligatorio desde 2026 cuando el presupuesto vive en el conjunto y no en la campaña | Mandar `is_adset_budget_sharing_enabled=false` (ya está en el script) |
| `"Param instagram_actor_id must be a valid Instagram account id"` | El campo está deprecado — falla con cualquier ID, incluido el de la cuenta "page-backed" | Usar `instagram_user_id` con el ID de la cuenta real |
| El ID de Instagram sigue sin ser aceptado | Estar en el portafolio del negocio **no** es estar vinculado a la página; los anuncios exigen lo segundo | Vincular desde la página de Facebook → Configuración → Instagram. Verificar: `GET /{page_id}?fields=instagram_business_account` **con token de página** |
| `"...aplicación que se encuentra en modo de desarrollo"` al crear el creativo | Meta exige la app en modo Público para crear anuncios (el modo Desarrollo sí permite leer y gestionar) | Publicar la app: requiere política de privacidad, categoría ("Empresa y páginas") e ícono 1024×1024 |

**División de trabajo que funcionó:** Claude en Chrome navega, lee
pantallas y ejecuta acciones de bajo riesgo (crear la app sin caso de
uso, publicar/excluir productos en Shopify). Crear el usuario del
sistema, asignarle activos, y generar/copiar el token los hace el
dueño de la cuenta directamente — son las acciones que otorgan acceso
administrativo y una credencial capaz de gastar dinero real, y ese
límite se respeta siempre, sin excepción, incluso si se pide
explícitamente lo contrario.

---

## 6-bis. Presupuesto: Meta no entiende de semanas

El presupuesto que se configura es **diario**. No existe un límite
semanal, y nada impide que la campaña siga gastando esa cifra
indefinidamente. Un "presupuesto de $700 a la semana" es una cuenta
mental hasta que se configura un tope.

**El tope de campaña no sirve en pesos mexicanos:** Meta exige un mínimo
de $1,500 MXN, más del doble del presupuesto semanal de esta tienda.

**El que sí funciona es el tope de cuenta:**

```bash
curl -X POST "https://graph.facebook.com/v21.0/act_1264279685553718" \
  -d "spend_cap=285" \
  -d "access_token=$META_ACCESS_TOKEN"
```

Dos trampas de la API, ambas comprobadas el 18 de agosto de 2026:

1. **`spend_cap` va en unidades de la moneda, no en centavos** — al revés
   que `daily_budget`. Enviar `252344` guarda `$252,344.00`. Verificar
   siempre lo que quedó guardado.
2. 🔴 **Cambiar el tope NO reinicia `amount_spent`.** Esta línea decía lo
   contrario y era falsa; se corrigió el 27 de agosto tras comprobarlo
   con dinero real (se liberó la mitad del presupuesto autorizado). El
   contador acumula, así que el cálculo es **aditivo**:

   ```
   tope nuevo = amount_spent actual + lo que se quiera liberar
   ```

   Leer `amount_spent` ANTES de calcular y releer el margen DESPUÉS de
   escribir. Nunca suponer el punto de partida.

> ⚠️ Es un tope de **cuenta**: cualquier campaña o publicación promocionada
> consume de la misma bolsa. Para continuar la semana siguiente hay que
> **subir el tope**, no basta con reactivar la campaña.

### Comparación avanzada del píxel — dónde está de verdad (27 ago 2026, noche)

Activada la noche del 27 de agosto. Antes estaba **apagada**, y con ella el ~41% de
los eventos (los del navegador) se emparejaban solo por cookie — justo
los que bloquea iOS, y el público de esta cuenta son hombres de 45-65.

**Los nombres del menú no son los que uno espera.** En la interfaz en
español de Meta:

| Lo que uno busca | Cómo se llama de verdad |
|---|---|
| "Comparación automática avanzada" | **"Activar coincidencias avanzadas automáticas"** |
| El interruptor | **"Coincidencias de sitio web automáticas"** |
| Dónde vive | **"Configuración del sitio web"**, entre "Uso de cookies" y "API de conversiones" |

No existe ningún bloque llamado "Configuración del conjunto de datos".
Ruta directa:
`https://business.facebook.com/events_manager2/list/dataset/<PIXEL_ID>/settings`
(redirige a `eventsmanager.facebook.com`).

**La pantalla guarda al instante, no hay botón de guardar.** Al encender
el interruptor principal, Meta activa los ocho subcampos solo. Verificado
por API después: `enable_automatic_matching: true` con 11 campos
(`em, fn, ln, ge, ph, ct, st, zp, db, country, external_id` — la interfaz
agrupa ciudad/estado/CP en uno).

> Dos ajustes vecinos que **no** hay que tocar: "Incluye automáticamente
> información más detallada de la página y los productos" va en **Sí**
> (alimenta el catálogo dinámico) y **"Eventos automáticos" va en No** —
> ese detecta clics y formularios por su cuenta y genera eventos basura
> que ensucian la medición.

### 🟡 Ver una compra dos veces en el píxel es NORMAL

Comprobado la noche del 27 de agosto de 2026, tras una falsa alarma.

La tienda manda **cada evento dos veces a propósito**: navegador +
Conversions API, con un `event_id` compartido para que Meta los una.
Medido: `SERVER 1134` contra `BROWSER 808` en una semana.

**`/<pixel_id>/stats` cuenta eventos RECIBIDOS, no deduplicados.** Dos
`Purchase` ahí = una venta por dos rutas. Para ventas reales hay que
mirar `insights` → `actions` del anuncio, o el Administrador de Eventos.

Si de verdad fallara la deduplicación, **Meta lo avisaría** en
`/<pixel_id>/da_checks`. Consultarlo antes de dar por buena una sospecha
de doble conteo.

### 🔴 El tope apaga la entrega EN SILENCIO (comprobado el 25 ago 2026)

Esta es la trampa más cara de la cuenta, y esta misma sección ya la
advertía en una línea que no bastó. Cuando el tope se agota:

- La campaña, el conjunto y el anuncio **siguen reportando `ACTIVE` y
  `effective_status: ACTIVE`**.
- El conjunto **no reporta ninguna incidencia** (`issues_info` vacío).
- No llega ningún aviso.
- Simplemente **dejan de existir impresiones**.

El 21 de agosto la entrega se detuvo así y **nadie lo notó durante 4
días**, mientras todo el tablero decía "activo". Peor: en esos mismos
días se desplegaron todas las mejoras de conversión de las Olas 1-7, así
que ningún visitante de pago llegó a verlas (sección 48 del manual).

**Comprobar el tope es parte de leer cualquier métrica**, no un paso
aparte. Antes de concluir nada sobre rendimiento:

```bash
curl -sS "https://graph.facebook.com/v21.0/act_1264279685553718?fields=spend_cap,amount_spent&access_token=$META_ACCESS_TOKEN"
```

Si `amount_spent` == `spend_cap`, no estás midiendo la campaña: estás
midiendo un apagón.

> ⚠️ **Corregido el 29 de agosto.** Aquí decía que *"cambiar el tope
> reinicia `amount_spent`"*. **No lo hace** — ver la trampa 2 de arriba.
> El contador acumula, así que `amount_spent` **sí** se puede comparar
> contra el gasto histórico, y el tope nuevo se calcula sumando.

**Recomendación:** ponerlo mensual (~$1,700 para $55/día), no semanal.
Un tope que se agota cada 7 días es un apagón programado cada 7 días.

**Para calcular gasto, nunca uses `amount_spent` ni `date_preset=maximum`.**
El primero se actualiza con el ciclo de facturación (le faltaba el día en
curso) y el segundo devolvió $190.12 cuando el gasto real era $414.69.
Usa siempre `insights` con `time_range` explícito.

---

## 6-ter. Sustituir un conjunto: pausar primero, activar después

Es el orden **opuesto** al de encender una campaña (sección 4-bis:
anuncios → conjuntos → campaña, de adentro hacia afuera).

Al **sustituir** un conjunto por otro hay que **pausar el viejo antes de
activar el nuevo**. Si se hace al revés, ambos corren a la vez, cada uno
con su presupuesto diario completo, y el nuevo además arranca acelerado
porque Meta front-loadea los conjuntos recién creados.

Pasó el 18 de agosto: **$224.57 gastados en un día** con presupuesto de
$100 (viejo $48.87 + nuevo $175.70).

---

## 7. Si el token deja de funcionar

Los System User tokens no expiran por tiempo, pero pueden invalidarse si:
- Se revoca desde Configuración del negocio → Usuarios del sistema →
  "Revocar identificadores"
- Se elimina el usuario del sistema o la app "Claude Integration"

**Un token de Meta no se puede volver a consultar.** Meta lo muestra una
sola vez, al generarlo; no hay pantalla para verlo después. Si se
perdió, no se busca — se genera uno nuevo.

Ruta directa (la app y el usuario del sistema ya existen, no hay que
rehacer nada de eso):

1. https://business.facebook.com/settings/system-users?business_id=1324138699447721
2. Seleccionar **`Claude Integration`** → **Generar nuevo token**
3. App: `Claude Integration` · Caducidad: **Nunca**
4. Permisos: `ads_management`, `ads_read`, `business_management`,
   `catalog_management`
5. Copiarlo y **actualizar la variable de entorno** en claude.ai/code —
   si no, la siguiente sesión arranca con el token viejo, que puede
   haber quedado invalidado al generar el nuevo.

El detalle de por qué las credenciales van ahí y no en el repo está en la
**sección 34 del manual**.
