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
| Catálogo de Meta | `1746844133017649` — 324 productos, el único (desde 15 ago 2026) |
| Campaña vigente | `120249613902440175` — "IMX \| Ventas \| Pesca y Óptica...", **en pausa** |
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
existe, ya filtrado desde Shopify, con solo los 324 productos
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
python3 scripts/meta-ads.py pausar --campania <id>
python3 scripts/meta-ads.py activar --campania <id>
python3 scripts/meta-ads.py presupuesto --campania <id> --monto 150   # MXN/día
```

El token se pide siempre por variable de entorno, nunca se escribe en
ningún archivo del repo (mismo patrón que `SHOPIFY_ADMIN_TOKEN`).

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

## 7. Si el token deja de funcionar

Los System User tokens no expiran por tiempo, pero pueden invalidarse si:
- Se revoca desde Configuración del negocio → Usuarios del sistema →
  "Revocar identificadores"
- Se elimina el usuario del sistema o la app "Claude Integration"

Para generar uno nuevo, repetir la sección 4 de `INSTRUCTIVO-META-ADS.md`
(ya no hace falta crear la app ni resolver el problema del caso de uso —
eso queda hecho permanentemente).
