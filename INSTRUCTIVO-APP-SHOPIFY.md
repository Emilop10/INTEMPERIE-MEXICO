# Instructivo — Cómo instalar/renovar la app de Shopify para dar acceso a Claude

Esta guía existe porque la primera vez que intentamos agregar permisos a la app
("Claude Integration") nos tomó muchísimas vueltas por el navegador hasta
encontrar el camino correcto. Aquí queda documentado el método que **sí
funciona**, para no repetir el mismo laberinto.

**Fecha en que se resolvió:** 28 de julio de 2026
**Organización Dev Dashboard:** 194474044
**App:** Claude Integration (`client_id: 34956e1ca24e94b27c531d85cb898e99`)
**Tienda:** wfuxvx-yn.myshopify.com (INTEMPERIE MÉXICO)

---

## Contexto — por qué esto es necesario

El token que usa Claude para editar la tienda (tema, productos, políticas, etc.)
es un **Admin API access token** que expira o pierde permisos cuando:

- Se le agregan **nuevos scopes** (permisos) a la app
- Se publica una **nueva versión** de la app en el Dev Dashboard (esto puede
  invalidar el token anterior por completo, aunque los scopes no cambien)

Cuando eso pasa, hay que generar un token nuevo. **Esta guía es el método
correcto para hacerlo.**

---

## ❌ Lo que NO funciona (para no perder tiempo de nuevo)

1. **Botón "Instalar app" desde el Dev Dashboard** (Apps → Claude Integration →
   Información general → "Instalar app"): abre un selector de tienda, y al
   elegir la tienda, en vez de mostrar la pantalla de permisos dentro de
   `admin.shopify.com`, termina redirigiendo al **storefront público** de la
   tienda (la página de inicio normal, con parámetros `hmac`/`shop`/`host` en
   la URL que no sirven de nada visualmente). La instalación **no se completa**
   y el contador de "instalaciones" se queda en 0.

2. **"Token de automatización" (Configuración de la app en Dev Dashboard)**:
   parece prometedor porque tiene un token visible, pero es de **otro tipo**
   — está pensado para flujos de CI/CD (`shopify app deploy`), no tiene
   relación con los scopes de Admin API (productos, temas, políticas, etc.).
   No sirve para esto.

3. **Configuración → Apps → Desarrollo de apps (flujo clásico/heredado)**: ya
   no existe como opción independiente para esta tienda. Shopify migró todo
   al Dev Dashboard y solo deja un botón que dice "Desarrollar apps en Dev
   Dashboard" — no hay forma de crear/editar apps del modo clásico simple.

---

## ✅ El método que SÍ funciona: OAuth manual (flujo heredado)

La app tiene activada la opción **"Usar flujo de instalación heredado"**
(legacy install flow), lo que permite generar el token a mano con dos pasos:
uno en el navegador (para obtener un `code` de un solo uso) y uno por API
(para cambiar ese `code` por el token real). Tarda menos de 5 minutos.

### Paso 1 — Revelar el secreto de la app

1. Ve a [dev.shopify.com/dashboard/194474044/apps](https://dev.shopify.com/dashboard/194474044/apps)
2. Abre la app **"Claude Integration"**
3. Ve a **Configuración → Credenciales**
4. En el campo **"Secreto"** (Client secret) haz clic en el ícono del ojo para
   revelarlo, y cópialo (empieza con `shpss_`)

> Si usas la extensión de Claude en Chrome para hacer esto, puedes pedirle
> textualmente: *"Ve a dev.shopify.com/dashboard/194474044/apps, abre la app
> Claude Integration, entra a Configuración → Credenciales, revela el campo
> Secreto haciendo clic en el ícono del ojo, y dame el valor completo."*

### Paso 2 — Confirmar los scopes activos

En la misma sección de Configuración, confirma en **"Alcances de acceso"**
qué permisos están activos. Al momento de escribir esto, la app tiene:

```
read_legal_policies, write_legal_policies,
read_online_store_navigation, write_online_store_navigation,
read_products, write_products,
read_themes, write_themes
```

Si necesitas agregar un permiso nuevo en el futuro (por ejemplo
`write_files` para subir imágenes/videos), agrégalo ahí, publica una nueva
versión de la app, **y luego repite este instructivo completo desde el Paso 1**
— publicar una nueva versión invalida el token anterior.

### Paso 3 — Abrir la URL de autorización en el navegador

Con la sesión de **admin.shopify.com ya iniciada** (como dueño de la tienda),
pega esta URL completa en la barra de direcciones (ajusta la lista de
`scope` si cambiaste los permisos en el Paso 2):

```
https://wfuxvx-yn.myshopify.com/admin/oauth/authorize?client_id=34956e1ca24e94b27c531d85cb898e99&scope=read_legal_policies,write_legal_policies,read_online_store_navigation,write_online_store_navigation,read_products,write_products,read_themes,write_themes&redirect_uri=https%3A%2F%2Fexample.com&state=intemperie2026
```

Esto muestra la pantalla oficial de Shopify con la lista de permisos que la
app va a tener. Haz clic en **"Instalar app"**.

### Paso 4 — Copiar la URL de la página en blanco

Después de aceptar, el navegador aterriza en una página que dice
**"Example Domain"** (se ve vacía/rota — **es normal, así funciona**). No la
cierres. Haz clic en la barra de direcciones, selecciona toda la URL
(⌘+A) y cópiala completa. Va a verse algo así:

```
https://example.com/?code=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&hmac=...&host=...&shop=wfuxvx-yn.myshopify.com&state=intemperie2026&timestamp=...
```

Lo importante es el parámetro `code=...` — **expira en pocos minutos y es de
un solo uso**, así que hay que actuar rápido a partir de aquí.

### Paso 5 — Dárselo a Claude

Pásale a Claude, en el mismo mensaje:
1. El **secreto** del Paso 1
2. La **URL completa** del Paso 4 (con el `code`)

Claude hace el intercambio por API (usando el endpoint
`POST /admin/oauth/access_token` con `client_id`, `client_secret` y `code`)
y obtiene el token permanente (`shpat_...`) automáticamente. Este paso Claude
lo hace solo, no requiere nada más en el navegador.

Si el `code` expira antes de dárselo a Claude, no pasa nada — solo repite el
Paso 3 para generar uno nuevo.

### Paso 6 — Rotar el secreto (opcional, recomendado)

Como el secreto se comparte por chat, es buena práctica rotarlo después:
Dev Dashboard → Claude Integration → Configuración → Credenciales → botón
**"Rotar"** junto al campo Secreto. Rotar el secreto **no invalida** el
token de acceso ya generado, así que puedes hacerlo sin miedo a romper nada
después de completar el Paso 5.

---

## Resumen rápido (para copiar/pegar cuando ya sepas el proceso)

1. Revela el **Secreto** en Dev Dashboard → Configuración → Credenciales
2. Abre esta URL en el navegador (ya logueado en admin.shopify.com), ajustando `scope` si hace falta:
   `https://wfuxvx-yn.myshopify.com/admin/oauth/authorize?client_id=34956e1ca24e94b27c531d85cb898e99&scope=<lista_de_scopes>&redirect_uri=https%3A%2F%2Fexample.com&state=intemperie2026`
3. Clic en "Instalar app"
4. Copia la URL completa de la página "Example Domain" (trae el `code`)
5. Dale a Claude el Secreto + esa URL completa, en el mismo mensaje
6. (Opcional) Rota el secreto después
