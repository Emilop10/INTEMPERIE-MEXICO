# Instructivo — Preparar Meta Ads (Facebook/Instagram) para Intemperie México

Esta guía es para el dueño de la tienda. Claude no puede iniciar sesión en
Facebook (requiere 2FA y automatizar un login viola los términos de Meta),
así que estos pasos son los únicos que quedan de tu lado. Una vez hechos,
Claude arma y opera las campañas por API sin volver a pedirte nada de esto.

> Si usas la extensión de **Claude en Chrome**, puedes pegarle este
> documento completo y pedirle que vaya paso a paso, marcando qué ya
> encontró hecho y qué falta.

---

## ⚠️ Antes de empezar — qué SÍ y qué NO se puede anunciar

Meta prohíbe anunciar armas, munición y accesorios que modifiquen su
función ([política oficial](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/weapons-ammunitions-explosives/)).
Anunciar estos productos arriesga un **baneo permanente** de la cuenta
publicitaria y de la página de Facebook, no solo el rechazo de un anuncio.

| Departamento | ¿Se anuncia? |
|---|---|
| Pesca | ✅ Sí |
| Binoculares / ópticos (no miras) | ✅ Sí |
| Miras telescópicas | ❌ No |
| Diábolos y municiones | ❌ No |
| Rifles y pistolas de aire | ❌ No |

Esto **no** significa quitar nada del catálogo ni de la tienda — solo que
los anuncios en sí (imágenes, catálogo sincronizado con Meta, textos) van
a enfocarse en pesca y óptica. Quien llegue por el anuncio puede comprar
cualquier cosa una vez en la tienda.

---

## Paso 1 — Ubicar o crear el Business Manager

El sitio ya tiene una verificación de dominio de Meta hecha (`<meta
name="facebook-domain-verification">` en el código desde antes de este
proyecto), lo que significa que probablemente ya existe un **Business
Manager**. Antes de crear uno nuevo:

1. Entra a [business.facebook.com](https://business.facebook.com)
2. Revisa si ya administras algún negocio ahí, y si tiene conectado el
   dominio `intemperiemexico.com` (Configuración del negocio → Seguridad
   de la marca → Dominios).

Si no aparece nada, crea un Business Manager nuevo desde
[business.facebook.com/overview](https://business.facebook.com/overview)
con el nombre "Intemperie México".

## Paso 2 — Vincular la página de Facebook y abrir Instagram

1. Dentro del Business Manager: Configuración del negocio → Cuentas →
   Páginas → agrega la página ya existente
   (`facebook.com/people/Intemperie-México/61588253103964/`).
2. Si todavía no existe una cuenta de Instagram del negocio, créala y
   vincúlala ahí mismo (Cuentas → Cuentas de Instagram). Sin Instagram se
   pierden las mejores colocaciones de anuncios (Reels, Explorar).

## Paso 3 — Crear la cuenta publicitaria

1. Configuración del negocio → Cuentas → Cuentas publicitarias → Agregar
   → Crear una cuenta publicitaria nueva.
2. **Moneda: MXN.** Zona horaria: Ciudad de México.
3. Vincula un **método de pago** (tarjeta) — este paso solo lo puede
   hacer el dueño de la cuenta, no se puede delegar por API.

## Paso 4 — Crear el System User y el token permanente

Este es el paso que le da acceso a Claude, equivalente al que ya se hizo
para Shopify (`INSTRUCTIVO-APP-SHOPIFY.md`).

1. Configuración del negocio → Usuarios → Usuarios del sistema → Agregar.
2. Nombre: `Claude Integration`. Rol: **Administrador**.
3. Asígnale acceso de administrador a:
   - La cuenta publicitaria creada en el Paso 3
   - La página de Facebook
   - El catálogo de productos (una vez creado, Paso 5)
4. Botón **Generar nuevo token**. Selecciona la app (o crea una app nueva
   tipo "Business" en [developers.facebook.com](https://developers.facebook.com/apps) — no hace falta que pase
   revisión de Meta, con que el System User sea admin alcanza).
5. Marca los permisos: `ads_management`, `ads_read`, `business_management`,
   `catalog_management`.
6. Copia el token (empieza con letras/números largos, no expira mientras
   el System User exista). **No lo escribas en este repositorio** —
   pásaselo a Claude por chat o guárdalo en tu gestor de contraseñas.

## Paso 5 — Instalar el canal de ventas "Facebook & Instagram" en Shopify

Esto sí se puede hacer desde el admin de Shopify (no requiere Meta
directamente primero):

1. Shopify Admin → Aplicaciones → busca **"Facebook & Instagram"** (app
   oficial de Meta) → Instalar.
2. Conéctala al Business Manager y a la cuenta publicitaria del Paso 3.
3. Cuando pida elegir el **pixel**, créalo desde ahí mismo (o usa el
   existente si ya hay uno).
4. En "Catálogo", que sincronice **todos los productos** — el filtrado de
   las categorías prohibidas se hace por código, en la colección /
   metafield que arma Claude, no hace falta que lo hagas a mano aquí.
5. Copia el **Pixel ID** que te muestra la app.

## Paso 6 — Dale a Claude

Pásale en un solo mensaje:
- El **token** del Paso 4 (`META_ACCESS_TOKEN`)
- El **ID de la cuenta publicitaria** (`act_...`, se ve en la URL del
  Administrador de anuncios o en Configuración del negocio → Cuentas
  publicitarias)
- El **Pixel ID** del Paso 5 — Claude lo pega en Personalizar tema →
  Meta Ads, o te pide que lo pegues tú ahí mismo (Personalizar tema →
  el bloque ya existe, se llama "Meta Ads (Facebook / Instagram)")

Con eso Claude arma la primera campaña, la deja **pausada**, y te la
enseña antes de activarla.

---

## Resumen rápido

| Qué | Quién |
|---|---|
| Ubicar/crear Business Manager | Tú |
| Vincular página + abrir Instagram | Tú |
| Crear cuenta publicitaria + método de pago (MXN) | Tú |
| Crear System User + token | Tú (Claude no puede loguearse en Facebook) |
| Instalar canal Facebook & Instagram en Shopify + pixel | Tú |
| Pegar Pixel ID en el tema | Tú o Claude (con el ID que le des) |
| Armar y operar campañas | Claude, por API |
