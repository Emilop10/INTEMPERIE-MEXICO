# Instructivo — Credenciales de Shopify: cómo darle acceso a Claude sin perder una hora

**Este es el documento de referencia único para el token de Shopify.**
Si estás leyendo esto porque un comando falló con "Falta
`SHOPIFY_ADMIN_TOKEN`", empieza por el [Diagnóstico rápido](#diagnóstico-rápido-hazlo-antes-de-pedirle-nada-al-dueño)
y no le pidas nada al dueño hasta terminarlo.

Existe porque el 24 de agosto de 2026 se perdió tiempo real por no
consultar lo que el repositorio ya tenía escrito. El incidente completo
está al final, en [Qué salió mal el 24 de agosto](#qué-salió-mal-el-24-de-agosto-de-2026-y-por-qué-existe-este-documento),
y vale la pena leerlo: el error no fue técnico, fue de procedimiento.

**Relación con los otros documentos:**
- [`INSTRUCTIVO-APP-SHOPIFY.md`](./INSTRUCTIVO-APP-SHOPIFY.md) — cómo
  navegar el Dev Dashboard de Shopify (los caminos que no funcionan).
  Sigue siendo válido para eso, **pero su lista de scopes está
  desactualizada**; la lista correcta vive aquí.
- `MANUAL-PROYECTO.md` sección 34 — por qué las credenciales nunca van
  en el repo. La política, no el procedimiento.
- Este documento — el procedimiento operativo completo.

---

## Datos fijos del proyecto

Estos no cambian. Cópialos de aquí en vez de buscarlos.

| Dato | Valor |
|---|---|
| Tienda (dominio myshopify) | `wfuxvx-yn.myshopify.com` |
| Tienda (dominio público) | `intemperiemexico.com` |
| App | **Claude Integration** |
| `client_id` | `34956e1ca24e94b27c531d85cb898e99` |
| Organización Dev Dashboard | `194474044` |
| URL del Dev Dashboard | https://dev.shopify.com/dashboard/194474044/apps |
| Variable de entorno | `SHOPIFY_ADMIN_TOKEN` |
| Formato del token | `shpat_...` |
| Formato del secreto de la app | `shpss_...` |

**La app YA EXISTE desde el 28 de julio de 2026.** Nunca hay que crear
una nueva. Si alguien te dice "crea una app personalizada", está
equivocado — ver [errores comunes](#errores-comunes-y-por-qué-cuestan-tiempo).

---

## Diagnóstico rápido (hazlo ANTES de pedirle nada al dueño)

Cuatro comprobaciones, en orden. La mayoría de las veces el problema se
resuelve en la 1 o la 2 y no hace falta molestar a nadie.

### 1. ¿Está la variable en esta sesión?

```bash
env | grep -oE '^(SHOPIFY|META)[A-Z_]*'
```

- **Aparece `SHOPIFY_ADMIN_TOKEN`** → hay token, el problema es otro
  (scopes insuficientes, token revocado, o un bug del script). Salta al
  paso 3.
- **No aparece** → sigue al paso 2. Ojo: las variables se cargan **al
  iniciar la sesión**. Si el dueño la agregó hace un minuto en
  claude.ai/code, no va a aparecer aquí hasta abrir una sesión nueva.

### 2. ¿El token existe y sirve, aunque no lo tengas tú?

Esto es clave y es lo que se pasó por alto el 24 de agosto: **que no
esté en tu entorno no significa que no exista.** El mismo token vive
como secret de GitHub y lo usa el workflow de deploy.

Revisa si los deploys recientes pasaron:

```bash
# Con las herramientas de GitHub MCP, o mirando la pestaña Actions del repo
# Workflow: .github/workflows/deploy-shopify.yml
```

- **Los deploys recientes dieron `success`** → el token está **vivo y
  con permisos suficientes para temas**. No está expirado. Solo te
  falta a ti. Ve al paso 4.
- **Fallan con "Falta SHOPIFY_ADMIN_TOKEN"** → el secret de GitHub no
  está configurado. Ver [Después de regenerar](#después-de-regenerar-tres-cosas-que-no-se-pueden-olvidar),
  punto 1.
- **Fallan con 401/403** → el token sí está pero fue revocado o perdió
  permisos. Hay que regenerarlo: ve a [Regenerar el token](#regenerar-el-token-flujo-oauth-manual).

> **Un secret de GitHub NO es legible desde una sesión de Claude.** Solo
> se descifra dentro de un workflow corriendo en servidores de GitHub.
> Verificado en vivo. No intentes leerlo ni le pidas al dueño que lo
> copie de ahí: **GitHub no vuelve a mostrar el valor de un secret una
> vez guardado.** Si él no lo tiene anotado en otro lado, la única
> salida es regenerarlo.

### 3. ¿El token tiene los scopes que necesitas?

Un token puede ser válido para temas y aun así devolver 403 al escribir
productos. Compara lo que vas a hacer contra la
[tabla de scopes](#tabla-de-scopes-la-lista-correcta-y-completa).

Prueba de humo barata (lectura, no escribe nada):

```bash
SHOPIFY_ADMIN_TOKEN=shpat_... curl -s -o /dev/null -w '%{http_code}\n' \
  -H "X-Shopify-Access-Token: $SHOPIFY_ADMIN_TOKEN" \
  "https://wfuxvx-yn.myshopify.com/admin/api/2024-10/products.json?limit=1"
```

`200` = el token sirve para leer productos. `401` = token inválido.
`403` = token válido pero sin ese scope.

### 4. ¿Cómo se lo pides al dueño?

Solo si los pasos 1-3 no lo resolvieron. Dos rutas, y **la elección es
del dueño, no tuya**:

| Ruta | Cuándo conviene | Costo |
|---|---|---|
| **Variable de entorno** (claude.ai/code → configuración del entorno) | Es la solución durable. Si él ya tiene el token anotado. | Hay que **abrir sesión nueva** — se pierde el contexto de la actual. |
| **Regenerar por OAuth** ([abajo](#regenerar-el-token-flujo-oauth-manual)) | Si no tiene el token guardado, o si hace falta ampliar scopes. | ~5 min, y el secreto pasa por el chat (se rota después). Funciona en la sesión actual. |

**Nunca le pidas que pegue el token `shpat_...` directamente en el
chat si puedes evitarlo.** En el flujo OAuth el token lo obtienes tú de
la respuesta de la API — nunca aparece escrito por él. Es estrictamente
mejor.

---

## Tabla de scopes (la lista correcta y completa)

Esta tabla es la fuente de verdad. **La lista que aparece en
`INSTRUCTIVO-APP-SHOPIFY.md` está incompleta** (quedó congelada en los
8 scopes de julio; después se agregaron publicaciones e inventario).

| Scope | Quién lo usa | Endpoint concreto |
|---|---|---|
| `read_themes`, `write_themes` | `scripts/deploy-shopify.py` | `GET/PUT /themes/{id}/assets.json` |
| `read_products`, `write_products` | metafields, `scripts/vincular-codigo-b1.py`, alta de combos | `GET /products.json`, `PUT /variants/{id}.json`, `POST /products/{id}/metafields.json` |
| `read_publications`, `write_publications` | `scripts/sincronizar-canal-meta.py` | `POST /graphql.json` (`publishablePublish`) |
| `read_inventory`, `write_inventory` | `scripts/conciliar-inventario.py` | `POST /inventory_levels/set.json` |
| `read_locations` | `conciliar-inventario.py` (robustez) | hoy toma `primary_location_id` de `/shop.json` |
| `read_legal_policies`, `write_legal_policies` | políticas de la tienda | páginas de política |
| `read_online_store_navigation`, `write_online_store_navigation` | menús de navegación | — |

### ⚠️ La regla que evita el desastre

**Pedir MÁS scopes de los concedidos es seguro; pedir MENOS es lo que
rompe.** Al reautorizar, Shopify concede exactamente la lista que va en
la URL — no hace unión con lo que ya tenía. Si autorizas con la lista
vieja de 8 scopes:

- `sincronizar-canal-meta.py` deja de poder publicar al canal de Meta
- `conciliar-inventario.py` deja de poder escribir inventario

y el fallo aparece **días después**, cuando alguien corra esos scripts,
sin relación aparente con el token. Por eso **siempre se autoriza con
la lista completa de arriba**, aunque en el momento solo necesites
escribir productos.

Si agregas un scope nuevo al proyecto, **agrégalo también a esta tabla
y a la URL de abajo, en el mismo commit.**

---

## Regenerar el token (flujo OAuth manual)

Es el método que funciona en esta tienda. Toma menos de 5 minutos.
Requiere al dueño en el navegador (nadie más puede autorizar la app).

### Por qué este flujo y no el botón de "Instalar app"

`INSTRUCTIVO-APP-SHOPIFY.md` documenta tres caminos que **no**
funcionan aquí. El resumen: Shopify migró esta tienda al Dev Dashboard,
el botón de instalar redirige al storefront público sin completar nada,
y el "token de automatización" del Dev Dashboard es de otro tipo
(CI/CD) y no tiene relación con los scopes de Admin API.

La app tiene activado **"Usar flujo de instalación heredado"**, que es
lo que permite hacer el OAuth a mano.

### Paso 1 — El dueño revela el secreto

Dev Dashboard → app **Claude Integration** → **Configuración →
Credenciales** → ícono del ojo en el campo **"Secreto"** → copiar
(empieza con `shpss_`).

### Paso 2 — Claude arma la URL de autorización

Con **la lista completa de scopes**. Esta es la URL vigente, lista para
copiar:

```
https://wfuxvx-yn.myshopify.com/admin/oauth/authorize?client_id=34956e1ca24e94b27c531d85cb898e99&scope=read_legal_policies,write_legal_policies,read_online_store_navigation,write_online_store_navigation,read_products,write_products,read_themes,write_themes,read_publications,write_publications,read_inventory,write_inventory,read_locations&redirect_uri=https%3A%2F%2Fexample.com&state=intemperie2026
```

### Paso 3 — El dueño la abre y autoriza

Con la sesión de `admin.shopify.com` ya iniciada. Aparece la pantalla
oficial de permisos de Shopify → **"Instalar app"**.

### Paso 4 — El dueño copia la URL de la página en blanco

Aterriza en una página que dice **"Example Domain"** y se ve rota.
**Es normal, así funciona.** No cerrarla. Copiar la URL **completa** de
la barra de direcciones:

```
https://example.com/?code=XXXXXXXX&hmac=...&host=...&shop=wfuxvx-yn.myshopify.com&state=intemperie2026&timestamp=...
```

> ⏱️ El `code` **expira en pocos minutos y es de un solo uso.** Hay que
> mandarlo enseguida. Si expira no pasa nada: se repite el paso 3.

### Paso 5 — El dueño manda secreto + URL en UN SOLO mensaje

Los dos juntos, porque el `code` corre contra reloj.

### Paso 6 — Claude hace el intercambio

```bash
curl -s -X POST "https://wfuxvx-yn.myshopify.com/admin/oauth/access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "34956e1ca24e94b27c531d85cb898e99",
    "client_secret": "shpss_...",
    "code": "XXXXXXXX"
  }'
```

Respuesta:

```json
{"access_token":"shpat_...","scope":"read_legal_policies,write_legal_policies,..."}
```

**Verifica el campo `scope` de la respuesta contra la tabla de arriba
antes de dar por bueno el token.** Si falta alguno, la URL del paso 2
estaba mal y hay que repetir el flujo — es el momento barato de
detectarlo, no tres días después.

---

## Después de regenerar: tres cosas que NO se pueden olvidar

Saltarse cualquiera de las tres deja el proyecto a medias, y el síntoma
aparece más tarde y desconectado de la causa.

### 1. Actualizar el secret de GitHub

**Si no se hace, el deploy automático del tema deja de funcionar** —
y falla en silencio: el código queda en el repo y la tienda sigue
sirviendo la versión anterior. Ya pasó antes (8 al 13 de agosto de
2026, nadie lo notó en 5 días).

GitHub → repo → **Settings → Secrets and variables → Actions** →
`SHOPIFY_ADMIN_TOKEN` → **Update** → pegar el `shpat_...` nuevo.

Verificar: hacer cualquier push que toque `tema-shopify/` y confirmar
que el workflow "Desplegar tema a Shopify" termina en `success`.

### 2. Guardar el token como variable de entorno

Para que las **sesiones futuras** lo tengan sin repetir todo esto:
claude.ai/code → configuración del entorno del proyecto → agregar
`SHOPIFY_ADMIN_TOKEN`.

> Se carga al **iniciar** sesión. No aparece en la que ya está corriendo.

### 3. Rotar el secreto de la app

Como el secreto pasó por el chat, conviene rotarlo:
Dev Dashboard → Credenciales → botón **"Rotar"**.

**Rotar el secreto NO invalida el token de acceso ya generado.** Se
puede hacer sin miedo a romper nada, una vez completado el paso 6.

---

## Cómo se usa el token dentro de una sesión de Claude

**El `export` no persiste entre llamadas de Bash.** El entorno reinicia
el shell en cada comando, así que esto NO funciona:

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...   # se pierde al terminar el comando
python3 scripts/deploy-shopify.py      # falla: "Falta SHOPIFY_ADMIN_TOKEN"
```

Usa el prefijo inline, que es el patrón que ya documentan todos los
scripts del proyecto:

```bash
SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/deploy-shopify.py
```

(Los `export ...` que aparecen en los otros instructivos son para
cuando **el dueño** corre los scripts en su propia máquina, donde el
shell sí persiste. No son para las sesiones de Claude.)

---

## Versiones de la API (no unificadas, a propósito de nadie)

Los scripts no usan la misma versión. Al escribir uno nuevo, revisa
cuál usa el script del que te estés basando:

| Script | `API_VERSION` |
|---|---|
| `deploy-shopify.py` | `2024-10` |
| `conciliar-inventario.py` | `2024-01` |
| `vincular-codigo-b1.py` | `2024-01` |
| `sincronizar-canal-meta.py` | `2024-01` |

No es una decisión de diseño, es deriva histórica. Unificarlas es una
mejora pendiente, pero **no se cambian sin probar**: cambiar de versión
puede alterar el formato de respuesta de un endpoint.

---

## Errores comunes (y por qué cuestan tiempo)

| Error | Por qué es un error | Qué hacer |
|---|---|---|
| "Crea una app personalizada nueva" | La app ya existe desde julio. Crear otra deja dos apps y confusión sobre cuál token es cuál. | Usar **Claude Integration** |
| "Ve a Configuración → Apps → Desarrollar apps" | Ese camino **ya no existe** en esta tienda. Shopify la migró al Dev Dashboard. | Dev Dashboard, flujo OAuth |
| Reautorizar con la lista de scopes de `INSTRUCTIVO-APP-SHOPIFY.md` | Está incompleta → degrada el token → rompe canal de Meta e inventario, días después | Usar la [URL de este documento](#paso-2--claude-arma-la-url-de-autorización) |
| "Copia el token del secret de GitHub" | GitHub **no muestra** el valor de un secret una vez guardado | Regenerar por OAuth |
| Asumir que el token no existe porque no está en `env` | Puede estar vivo en GitHub y funcionando | Correr el [diagnóstico](#diagnóstico-rápido-hazlo-antes-de-pedirle-nada-al-dueño) |
| Usar el "token de automatización" del Dev Dashboard | Es de CI/CD (`shopify app deploy`), sin relación con scopes de Admin API | Flujo OAuth |
| `export SHOPIFY_ADMIN_TOKEN=...` en una sesión de Claude | No persiste entre comandos | Prefijo inline |

---

## Qué salió mal el 24 de agosto de 2026 (y por qué existe este documento)

Al terminar la Ola 7 quedaron dos tareas que requerían escribir en
Shopify (cargar metafields en 35 productos, dar de alta 3 combos). El
dueño preguntó, con razón, si no había forma de automatizarlas en vez
de hacerlas a mano con Claude en Chrome.

**La respuesta que di fue incorrecta en cuatro puntos a la vez**, y
ninguno era un problema técnico difícil — los cuatro estaban ya
resueltos y escritos en el repositorio:

1. Dije que había que **crear una app personalizada nueva**. Ya existía
   una desde el 28 de julio.
2. Dije que había que **agregarle los scopes `read_products` /
   `write_products`**. Ya los tenía.
3. Di una ruta de navegación (**Configuración → Apps → Desarrollar
   apps**) que `INSTRUCTIVO-APP-SHOPIFY.md` documenta explícitamente
   como el **fallo nº 3**, con la explicación de por qué no funciona en
   esta tienda. Es decir, mandé al dueño exactamente al laberinto que
   ese documento existe para evitar.
4. Afirmé que **no había token**, cuando el token estaba vivo y lo
   habían usado con éxito los tres deploys de esa misma tarde.

Además, al proponer la corrección, **planteé mal el flujo**: presenté
la variable de entorno como si fuera la única vía, cuando el dueño
recordaba correctamente que existía un flujo (secreto → URL → `code` →
token) documentado desde julio. Él insistió tres veces en que revisara
el repositorio antes de que yo encontrara lo que ya estaba escrito.

**La causa raíz no fue técnica: fue no leer el repositorio antes de
hablar.** Toda la información necesaria llevaba semanas commiteada.

Un hallazgo valioso salió de esa revisión, y es la razón principal de
que este documento exista: **la lista de scopes del instructivo estaba
desactualizada**. Si el dueño hubiera seguido esas instrucciones al pie
de la letra, habría degradado el token y roto dos scripts, con un
fallo que habría aparecido días después sin relación aparente.

### Las reglas que quedan de esto

1. **Antes de pedir una credencial, busca en el repositorio.** No solo
   los `.md` de la raíz: `grep -rn` sobre todo, incluyendo `scripts/` y
   `.github/`.
2. **Que una credencial no esté en tu entorno no significa que no
   exista.** Comprueba si los workflows recientes pasaron.
3. **Cuando el dueño diga "creo que ya teníamos esto documentado",
   créele y ve a buscarlo.** Acertó las tres veces.
4. **Cualquier lista de permisos, scopes o configuración duplicada en
   dos documentos va a desincronizarse.** Si tienes que duplicarla,
   deja escrito cuál es la fuente de verdad — como hace este documento
   con la tabla de scopes.
