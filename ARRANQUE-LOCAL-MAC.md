# Arranque de la sesión local en la Mac (20 oct 2026)

El dueño va a correr Claude Code en su Mac, sobre este mismo repositorio,
para que Claude maneje su Chrome con las sesiones ya iniciadas (Administrador
de anuncios, Shopify, Mercado Libre). La sesión en la nube sigue existiendo:
ahí viven las tareas programadas. Este archivo es lo primero que debe leer la
sesión local.

## 1. Instalar (una sola vez)

```bash
git clone https://github.com/emilop10/intemperie-mexico.git
cd intemperie-mexico
git checkout claude/intemperie-mexico-audit-n3yxbs   # es la rama principal del proyecto
bash scripts/instalar-entorno.sh                     # plugins y agentes que usa el proyecto
bash scripts/verificar-herramental.sh
```

Claude Code y Chrome:
- Claude Code instalado en la Mac (`npm install -g @anthropic-ai/claude-code`
  o la app de escritorio).
- Extensión **Claude in Chrome** instalada y con la sesión de claude.ai
  iniciada. Desde Claude Code se usa con la habilidad `chrome-browser`
  (o `/chrome` según la versión).
- Chrome con las sesiones iniciadas de: Facebook (Administrador de
  anuncios), Shopify admin (`admin.shopify.com/store/wfuxvx-yn`) y, si se va
  a usar, Mercado Libre.

## 2. Secretos (nunca al repo)

En `~/.zshrc` (o al arrancar la terminal):

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...        # INSTRUCTIVO-CREDENCIALES-SHOPIFY.md
export META_ACCESS_TOKEN=...                # token de System User (ads_management, ads_read)
export META_AD_ACCOUNT_ID=act_1264279685553718
```

Si no se tiene el token de Shopify a la mano, se regenera con el flujo
OAuth de `INSTRUCTIVO-CREDENCIALES-SHOPIFY.md` **con la URL vigente**, que ya
pide los permisos nuevos (`write_discounts`, `write_shipping`,
`read_customers`). Después hay que actualizar también la variable de entorno
de la sesión en la nube (claude.ai/code → configuración del entorno) y el
secret de GitHub, como dice ese instructivo.

## 3. Qué hacer primero (en este orden)

Todo está en [`PROMPT-CLAUDE-CHROME-VENDER-YA.md`](./PROMPT-CLAUDE-CHROME-VENDER-YA.md)
y en MANUAL §105–§106. La sesión local lo ejecuta con Chrome, pidiendo "sí"
al dueño antes de cada cambio:

1. **Bloque A** — Meta: encender la campaña "Retargeting | Oct20", encender
   los 4 anuncios `…-lanz`/`lanzamiento-rt`, apagar `tundra-valor`,
   `revenger-presa-rio` y `carrusel-kits`. Primero encender, luego apagar.
   Verificar después por API: `python3 scripts/meta-ads.py listar`.
2. **Bloque B** — Shopify → Configuración → Envíos: manejo 1 día hábil +
   tránsito 1 a 6 días hábiles, para que el checkout diga lo mismo que la
   ficha ("2 a 7 días hábiles"). Comprobar en un checkout de prueba sin pagar.
   (Si el token ya tiene `write_shipping`, se puede hacer por API con
   GraphQL `deliveryProfileUpdate`.)
3. **Bloque C** — Shopify Email a suscriptores: "Kits listos para pescar:
   10% menos hasta el 31 de octubre", con los 5 kits.
4. **Bloque D** — Correo de recuperación a los 8 pagos abandonados (la lista
   sale de Pedidos → Pagos abandonados; excluir `ilovemyemail.net` y
   `prueba-claude@example.com`).
5. **Bloque E** — Mercado Libre, con [`MERCADO-LIBRE-LISTADOS.md`](./MERCADO-LIBRE-LISTADOS.md).
   Regla de oro: simular el costo de envío en ML antes de fijar precio; solo
   publicación Clásica.

## 4. Reglas para no pisarse con la sesión en la nube

- **Antes de trabajar:** `git pull --rebase origin claude/intemperie-mexico-audit-n3yxbs`.
- **Commits chicos y push inmediato** después de cada bloque. La sesión en la
  nube hace `git pull` antes de escribir en MANUAL y PENDIENTES.
- **MANUAL y PENDIENTES:** cada sesión agrega su entrada; no se reescriben
  secciones ajenas. Sección nueva por bloque terminado (la siguiente libre es
  §107).
- **Las tareas programadas viven en la nube** y no se duplican desde la Mac:
  - cortes diarios 08:47 (`trig_01UxpqCyFokQncvr2kZr4mpQ`): reglas de $400
    y $900, pausa anuncios de productos agotados, reporta;
  - 1 nov 06:30 (`trig_01WGwf8uZX2iAgkSVBdRSBcm`): restaura los precios de
    los kits y vuelve a los anuncios con precios normales;
  - 22 oct (`trig_019cTdRcdy14uUrzCpTKXFkt`): Merchant Center.
- **No tocar desde la Mac:** presupuestos, públicos ni textos de las
  campañas (las reglas del corte se leen sobre lo que está corriendo);
  precios de productos (los del lanzamiento se restauran solos el 1 nov);
  el tema sin desplegar con `scripts/deploy-shopify.py`.
- **Pixel:** al probar fichas o checkout desde Chrome, no agregar al carrito
  ni iniciar pago salvo la prueba del Bloque B (que no se paga), porque el
  pixel lo cuenta como cliente.

## 5. Qué sigue en la nube mientras tanto

Nada que requiera la Mac: el corte diario, el restaurado del 1 nov y lo
que el dueño pida. Si la sesión local cambia algo en Meta o Shopify, lo
anota en MANUAL y la nube lo lee en el siguiente corte.
