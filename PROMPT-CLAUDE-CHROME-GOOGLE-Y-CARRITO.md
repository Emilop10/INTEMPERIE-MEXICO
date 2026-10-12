# Prompt para Claude in Chrome — Google & YouTube + carrito abandonado

Fase 2 de [`GUIA-POR-FASES.md`](./GUIA-POR-FASES.md), pasos 2.1 y 2.6
(MANUAL §76). **Cómo se usa:** el dueño abre Claude in Chrome con su
sesión de Shopify ya iniciada y pega el bloque de abajo, completo. En
cada **PUNTO DE CONTROL**, Claude in Chrome se detiene y entrega un
reporte. El dueño lo revisa, se lo pasa a Claude Code, y solo cuando le
dan el visto bueno sigue con el siguiente bloque.

---

```text
Vas a ayudarme a configurar dos cosas en mi tienda Shopify "Intemperie México".
Trabaja con cuidado y en orden. Las reglas de abajo son obligatorias.

DATOS DE LA TIENDA (úsalos tal cual, no inventes otros)
- Admin de Shopify: https://admin.shopify.com/store/wfuxvx-yn
- Sitio: https://intemperiemexico.com   (dominio myshopify: wfuxvx-yn.myshopify.com)
- País: México · Idioma: español · Moneda: MXN · Precios con impuestos incluidos
- Envío: tarifa fija de $189 MXN a todo México; GRATIS en pedidos desde $799 MXN.
  Entrega: 2 a 7 días hábiles en total.
- Devoluciones (política publicada en https://intemperiemexico.com/policies/refund-policy):
  7 días naturales desde que se recibe; producto sin uso, en empaque original;
  si es cambio de opinión, el cliente paga el envío de regreso; si es defectuoso
  o error nuestro, lo pagamos nosotros. Correo: soporte@intemperiemexico.com
- Hay 63 productos (rifles y pistolas de aire, municiones, miras, monturas y una
  linterna táctica) que NO deben estar en Google. Ya los saqué del canal de Google
  desde Shopify. Tú no los publiques ni los vuelvas a meter.

REGLAS (NO NEGOCIABLES)
1. Nunca escribas contraseñas, códigos de verificación ni datos de tarjeta. Si una
   pantalla pide iniciar sesión, verificar identidad o pagar, DETENTE y pídeme que
   lo haga yo.
2. No actives campañas pagadas de ningún tipo (Performance Max, Google Ads, "campaña
   inteligente", "empieza con $X de crédito"). Si un asistente lo ofrece, elige
   "Omitir", "Ahora no" o la opción equivalente. No agregues forma de pago.
3. No cambies precios, productos, inventario, el tema ni otras apps.
4. No hagas compras ni pedidos de prueba.
5. Antes de GUARDAR cualquier cambio, dime exactamente qué vas a guardar y espera
   a que te diga "sí".
6. Si algo no coincide con estas instrucciones (otra pantalla, otro menú, un error),
   no improvises: describe lo que ves y espera.
7. En cada PUNTO DE CONTROL detente por completo y entrégame el reporte con el
   formato que te indico. No sigas hasta que yo te diga "continúa".

=====================================================================
BLOQUE A — Revisar la app "Google & YouTube" (solo mirar, no cambiar nada)
=====================================================================
A1. Abre "Google & YouTube" desde Configuración → Canales de ventas
    (https://admin.shopify.com/store/wfuxvx-yn/settings/apps no la lista: es un canal, no una app).
A2. Revisa y anota:
    - ¿Hay una cuenta de Google conectada? ¿Cuál correo? (solo el correo, nada más)
    - ¿Hay una cuenta de Merchant Center conectada? ¿Cuál es su número (ID)?
    - ¿La configuración inicial está completa, o hay pasos pendientes ("Completar
      configuración", "Terminar", avisos en rojo o amarillo)? Lista cada uno.
    - Estado de los productos: cuántos aparecen como aprobados, pendientes, con
      problemas o no aprobados (o como lo muestre la app).
    - ¿Dice algo de "listados gratuitos" / "fichas gratuitas" / "free listings"?
      ¿Activos o no?
    - Cualquier otro aviso o error que muestre.

>>> PUNTO DE CONTROL 1 — Detente y entrégame:
REPORTE PARA CLAUDE CODE — PC1
- Cuenta de Google conectada: (sí/no, correo)
- Merchant Center conectado: (sí/no, ID)
- Configuración inicial: (completa / pendiente: lista de pasos)
- Productos: (aprobados / pendientes / con problemas / no aprobados)
- Listados gratuitos: (activos / no activos / no lo muestra)
- Avisos o errores: (texto exacto)

=====================================================================
BLOQUE B — Completar la configuración (solo con mi "continúa")
=====================================================================
B1. Si la app pide conectar una cuenta de Google o crear o enlazar Merchant
    Center: avísame. El inicio de sesión lo hago yo. Al crear Merchant Center usa:
    país México, idioma español, moneda MXN, nombre del negocio "Intemperie México",
    sitio https://intemperiemexico.com.
B2. Si pide verificar o reclamar el sitio web, acepta la opción que ofrece la
    propia app de Shopify (es automática). Si pide otro método, detente y avísame.
B3. Envío (en la app o en Merchant Center → Envío y devoluciones):
    - Servicio: "Envío estándar", a México, en MXN.
    - Tiempo: manejo 1 día hábil + tránsito 1 a 6 días hábiles (total 2 a 7).
    - Costo: $189 MXN fijo, y GRATIS desde $799 MXN (umbral de envío gratis).
    Antes de guardar, muéstrame el resumen y espera mi "sí".
B4. Devoluciones (Merchant Center → Envío y devoluciones → Políticas de devolución):
    usa los datos de DEVOLUCIONES de arriba (7 días; el cliente paga el regreso si
    es cambio de opinión; enlace a la política). Antes de guardar, muéstrame el
    resumen y espera mi "sí".
B5. Impuestos: en México los precios ya incluyen impuestos. Solo revisa que no
    haya nada pidiendo configurar impuestos. Si lo hay, detente y avísame.
B6. Listados gratuitos: confirma que estén ACTIVOS (en Merchant Center suele estar
    en "Crecimiento" / "Administrar programas" / "Fichas gratuitas", o en la app).
    Si no lo están y hay un botón para activarlos, dime qué vas a activar y espera
    mi "sí". Recuerda: nada de campañas pagadas.

>>> PUNTO DE CONTROL 2 — Detente y entrégame:
REPORTE PARA CLAUDE CODE — PC2
- Merchant Center (ID): 
- Sitio verificado y reclamado: (sí/no/pendiente)
- Envío guardado: (servicio, tiempos, costo, umbral gratis — tal como quedó)
- Devoluciones guardadas: (tal como quedó)
- Impuestos: (sin pendientes / qué pide)
- Listados gratuitos: (activos/no)
- Algo que no pudiste hacer y por qué:

=====================================================================
BLOQUE C — Diagnóstico de productos en Merchant Center (solo mirar)
=====================================================================
C1. Entra a Merchant Center (https://merchants.google.com) con la cuenta del PC2,
    sección Productos → Diagnóstico (o "Necesitan atención").
C2. Anota cuántos productos hay en total y cuántos están aprobados, limitados,
    pendientes y no aprobados.
C3. Lista los problemas en orden de cuántos productos afectan, con su texto exacto.
    Es NORMAL ver "GTIN no válido" o "falta identificador": los códigos de barras de
    la tienda son códigos internos. No intentes corregirlos.
C4. Revisa si aparece algún producto rechazado por "armas", "productos peligrosos"
    o "política de armas". Si aparece alguno, anota su nombre exacto.
C5. Revisa si hay avisos a nivel de CUENTA (suspensión, advertencia, "información
    del negocio incompleta", "envío incorrecto"). Anota el texto exacto.
    Si los productos todavía dicen "pendiente" o aún no aparecen, es normal: tardan
    de 1 a 3 días. Solo dime cuántos hay.

>>> PUNTO DE CONTROL 3 — Detente y entrégame:
REPORTE PARA CLAUDE CODE — PC3
- Productos en Merchant Center: total / aprobados / limitados / pendientes / no aprobados
- Problemas (texto exacto · cuántos productos):
- Productos rechazados por armas o productos peligrosos: (ninguno / lista)
- Avisos a nivel de cuenta: (ninguno / texto exacto)

=====================================================================
BLOQUE D — Correo de carrito abandonado en Shopify (revisar; cambiar solo con mi "sí")
=====================================================================
D1. Revisa los DOS lugares donde puede estar, porque Shopify lo cambió de sitio:
    a) https://admin.shopify.com/store/wfuxvx-yn/settings/notifications →
       Notificaciones al cliente → "Pago abandonado" (Abandoned checkout).
    b) https://admin.shopify.com/store/wfuxvx-yn/marketing/automations →
       automatización "Recuperar pago abandonado" (o "Abandoned checkout").
D2. En cada uno anota:
    - ¿Existe? ¿Está ACTIVO o desactivado?
    - ¿Cuánto tiempo después del abandono se envía? (1 h, 6 h, 10 h, 24 h…)
    - ¿A quién se envía? (todos los que abandonaron / solo suscritos a marketing)
    - ¿El correo está en español y lleva el logo de la tienda? (abre la vista
      previa; no edites el texto)
D3. Si NINGUNO está activo: propón activar el de "Marketing → Automatizaciones" con
    envío a las 10 horas (lo que recomienda Shopify) y a TODOS los clientes que
    abandonaron (no solo a los suscritos), si esa opción existe. Dime exactamente
    qué vas a activar y espera mi "sí". No actives los dos a la vez: si uno ya está
    activo, no actives el otro (el cliente recibiría dos correos).

>>> PUNTO DE CONTROL 4 — Detente y entrégame:
REPORTE PARA CLAUDE CODE — PC4
- Notificación "Pago abandonado" (Configuración): (existe/no · activa/no · tiempo · a quién)
- Automatización "Recuperar pago abandonado" (Marketing): (existe/no · activa/no · tiempo · a quién)
- Idioma y logo en la vista previa: 
- Qué quedó activo al final (solo uno):
- Cambios que hiciste (con mi "sí"):

Cuando termines el PC4, ya acabaste. No hagas nada más.
```

---

## Cómo responde Claude Code a cada reporte

| Reporte | Qué revisa Claude Code | Señal de alto |
|---|---|---|
| PC1 | Si ya había Merchant Center conectado desde agosto, y qué falta | Una cuenta de Google o un Merchant Center que no sean del negocio |
| PC2 | Que el envío sea **$189 / gratis desde $799 / 2-7 días** y las devoluciones **7 días**, idénticos a la tienda | Cualquier diferencia con la tienda: Google rechaza por "envío no coincide" |
| PC3 | Diagnóstico: "GTIN no válido" es esperado; **cero productos de armas** | Algún producto prohibido en Merchant Center o un aviso de cuenta: se corrige antes de nada |
| PC4 | Que quede **un solo** correo de recuperación activo | Dos activos a la vez (el cliente recibe doble) o ninguno |
