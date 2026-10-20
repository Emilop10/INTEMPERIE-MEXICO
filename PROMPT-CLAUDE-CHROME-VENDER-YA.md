# Prompt para Claude in Chrome — "Vender ya" (20 oct 2026)

Cierra los pendientes de MANUAL §106 que desde Claude Code no se pueden
hacer (la sesión bloquea encender anuncios y la API de Shopify no tiene
permisos de envíos, clientes ni descuentos). **Cómo se usa:** el dueño
abre Claude in Chrome con sus sesiones de **Facebook (Administrador de
anuncios)**, **Shopify** y, si va a hacer el bloque E, **Mercado Libre**
ya iniciadas, y pega el bloque de abajo completo. En cada **PUNTO DE
CONTROL** Claude in Chrome se detiene y entrega un reporte; el dueño lo
revisa, se lo pasa a Claude Code y sigue con "continúa".

---

```text
Vas a ayudarme a cerrar cinco tareas de mi tienda "Intemperie México" (pesca y
óptica, México). Trabaja en orden, con cuidado. Las reglas de abajo son obligatorias.

DATOS (úsalos tal cual, no inventes otros)
- Administrador de anuncios de Meta, cuenta act_1264279685553718:
  https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=1264279685553718
- Admin de Shopify: https://admin.shopify.com/store/wfuxvx-yn
- Sitio: https://intemperiemexico.com
- Envío real: 1 día hábil de manejo + 1 a 6 días hábiles de tránsito = 2 a 7 días
  hábiles. Tarifa $189 MXN a todo México; GRATIS desde $799 MXN.
- Lanzamiento vigente: los 5 "Kit Listo para Pescar" tienen 10% menos hasta el
  31 de octubre (ya está aplicado en los precios; tú no cambies precios).

REGLAS (NO NEGOCIABLES)
1. Nunca escribas contraseñas, códigos de verificación ni datos de tarjeta. Si una
   pantalla lo pide, DETENTE y pídeme que lo haga yo.
2. No crees campañas, conjuntos ni anuncios nuevos en Meta. No cambies presupuestos,
   públicos ni textos. Solo enciende/apaga lo que te indico, por su nombre exacto.
3. No cambies precios, productos, inventario, el tema ni apps en Shopify.
4. No hagas compras ni pedidos de prueba. No agregues formas de pago.
5. Antes de GUARDAR, PUBLICAR o ENVIAR cualquier cosa, dime exactamente qué vas a
   hacer y espera a que te diga "sí".
6. Si algo no coincide con estas instrucciones (otra pantalla, un aviso, un error),
   no improvises: describe lo que ves y espera.
7. En cada PUNTO DE CONTROL detente por completo y entrégame el reporte con el
   formato indicado. No sigas hasta que yo te diga "continúa".

=====================================================================
BLOQUE A — Meta: encender lo que ya está creado (Administrador de anuncios)
=====================================================================
A1. Abre el Administrador de anuncios (enlace de arriba). Arriba a la derecha pon el
    rango de fechas en "Hoy".
A2. Pestaña "Campañas": localiza "IMX | Ventas | Retargeting | Oct20". Debe estar
    apagada. Dime que la ves y espera mi "sí"; entonces enciende su palomita.
A3. Pestaña "Anuncios" (todas las campañas). Localiza estos 4 anuncios y, con mi
    "sí", enciende cada uno:
      - IMX | tundra-lanz | Oct20
      - IMX | revenger-lanz | Oct20
      - IMX | carrusel-lanz | Oct20
      - IMX | lanzamiento-rt | Oct20
A4. Con mi "sí", APAGA estos 3 (tienen precios viejos):
      - IMX | tundra-valor | Oct19
      - IMX | revenger-presa-rio | Oct19
      - IMX | carrusel-kits | Oct19
    NO apagues "IMX | combo-999 | Oct19" ni ningún otro.
A5. Vuelve a cargar y anota el estado de cada uno de los 8 anuncios mencionados
    (Activo / En revisión / Apagado / Rechazado) y el de la campaña de retargeting.

PUNTO DE CONTROL 1 — entrega:
REPORTE PARA CLAUDE CODE — PC1
- Campaña Retargeting Oct20: <estado>
- tundra-lanz / revenger-lanz / carrusel-lanz / lanzamiento-rt: <estados>
- tundra-valor / revenger-presa-rio / carrusel-kits: <estados>
- combo-999 / objeciones / combo-999-rt: <estados>
- Avisos o rechazos que viste: <texto literal o "ninguno">

=====================================================================
BLOQUE B — Shopify: tiempos de entrega (para que el checkout diga lo mismo que la ficha)
=====================================================================
B1. Abre https://admin.shopify.com/store/wfuxvx-yn/settings/shipping
B2. Entra al perfil de envío general ("Tarifas generales" o como se llame) y abre la
    zona de México. Anota qué tarifas hay (nombre, precio, condición) y si cada tarifa
    tiene "tiempo de entrega" / "tiempo de tránsito" configurado y con qué valores.
    Busca también el "tiempo de procesamiento" / "tiempo de manejo" del perfil o de la
    ubicación (puede estar en Configuración → Envíos → "Procesamiento" o en la
    ubicación de Cuernavaca).
B3. Objetivo: procesamiento = 1 día hábil; tránsito = 1 a 6 días hábiles (en cada
    tarifa, la de $189 y la gratis). Dime qué valores vas a poner en qué pantalla y
    espera mi "sí" antes de guardar.
B4. Después de guardar, abre https://intemperiemexico.com/products/combo-okuma-boundary-70-spinning,
    agrega al carrito, ve a la pantalla de pago, llena SOLO el correo
    prueba-claude@example.com y una dirección en Cuernavaca, Morelos, CP 62000, y
    lee la fecha de entrega que muestra el método de envío. NO pagues. Anótala y
    cierra la pestaña.

PUNTO DE CONTROL 2 — entrega:
REPORTE PARA CLAUDE CODE — PC2
- Tarifas encontradas y sus tiempos antes: <lista>
- Valores guardados: <lista>
- Fecha que muestra ahora el checkout: <texto literal>

=====================================================================
BLOQUE C — Shopify Email: correo a suscriptores
=====================================================================
C1. Abre https://admin.shopify.com/store/wfuxvx-yn/marketing y crea una campaña de
    Shopify Email. Si pide instalar o activar Shopify Email, dime y espera mi "sí".
C2. Asunto: "Kits listos para pescar: 10% menos hasta el 31 de octubre"
    Texto de apertura (cópialo tal cual):
      "Armamos cinco kits con caña, carrete, hilo y los accesorios que se acaban
       primero, elegidos para trabajar juntos. Hasta el 31 de octubre tienen 10%
       menos. Envío gratis a todo México, llega en 2 a 7 días hábiles. Paga con
       tarjeta a meses sin intereses (tarjetas participantes), con PayPal o en
       efectivo en OXXO y 7-Eleven eligiendo Mercado Pago al pagar."
    Agrega los 5 productos "Kit Listo para Pescar ..." con el bloque de productos.
    Botón: "Ver los kits" → https://intemperiemexico.com/collections/combos
    Cierre: "Si tienes dudas, escríbenos por WhatsApp antes de pagar.
             — Intemperie México, Cuernavaca, Morelos."
C3. Destinatarios: todos los suscriptores (los que aceptaron correos). Anota cuántos
    son. Envíame una vista previa descrita (asunto, productos, precios que muestra).
C4. Espera mi "sí" para enviar. Envía.

PUNTO DE CONTROL 3 — entrega:
REPORTE PARA CLAUDE CODE — PC3
- Suscriptores: <número>
- Precios que mostró el correo por kit: <lista>
- Enviado: sí/no, hora

=====================================================================
BLOQUE D — Pagos abandonados: mensaje personal
=====================================================================
D1. Abre https://admin.shopify.com/store/wfuxvx-yn/checkouts (Pedidos → Pagos
    abandonados). Lista los que tengan correo, EXCEPTO los de dominio
    ilovemyemail.net y el de prueba-claude@example.com.
D2. Para cada uno, abre el detalle y usa "Enviar correo de recuperación" (o el
    botón equivalente) con este texto, poniendo el nombre y el producto reales:
      "Hola [nombre], soy Emiliano de Intemperie México. Vi que dejaste
       [producto] a medio pedido. Si tuviste algún problema o duda con el pago o
       el envío, dime y lo resolvemos: el envío es gratis y puedes pagar con
       tarjeta, a meses, con PayPal o en efectivo en OXXO. Aquí puedes terminarlo
       cuando quieras."
    Antes de enviar cada uno, dime nombre y producto y espera mi "sí".
D3. Anota los que tengan teléfono: me los pasas para que yo les escriba por
    WhatsApp (tú no mandes WhatsApp).

PUNTO DE CONTROL 4 — entrega:
REPORTE PARA CLAUDE CODE — PC4
- Correos enviados: <número y lista de nombre + producto>
- Con teléfono (para WhatsApp): <nombre + producto, sin el número>

=====================================================================
BLOQUE E — Mercado Libre: publicar kits y combos (solo si tengo cuenta e inicio sesión yo)
=====================================================================
E1. Con mi sesión de Mercado Libre abierta, ve a "Vender". Vas a publicar los 8
    productos del archivo MERCADO-LIBRE-LISTADOS.md (te pego cada uno cuando toque).
E2. Para CADA producto, antes de publicar:
    - Tipo de publicación: "Clásica". NUNCA "Premium".
    - Categoría: Deportes y Fitness › Pesca.
    - Condición: Nuevo. Cantidad: la que te indico.
    - Envío: usa el simulador de costo de envío de Mercado Libre con el peso y
      medidas que te doy (caña de 2 piezas: ~1.5 kg, 110 × 15 × 10 cm; kit con
      caja: ~2.5 kg, 110 × 25 × 15 cm) y dime cuánto cobra. Si el costo supera
      $190, dime cuánto y espera: yo decido el precio final.
    - Dime el precio final, la comisión que muestra ML y lo que quedaría, y
      espera mi "sí" para publicar.
E3. Fotos: sube primero la foto de portada de la ficha de la tienda (te paso el
    enlace de cada una) y después las fotos de las piezas.

PUNTO DE CONTROL 5 — entrega, después de cada 4 publicaciones:
REPORTE PARA CLAUDE CODE — PC5
- Por producto: título, precio publicado, costo de envío que ML descuenta,
  comisión, estado (activo / en revisión) y enlace.
```

---

## Cómo responde Claude Code a cada reporte

| Reporte | Claude Code revisa | Señal de alto |
|---|---|---|
| PC1 | Que los 4 "-lanz" y el retargeting estén activos y los 3 viejos apagados; que no se haya tocado nada más. Después corre `anuncios-lanzamiento-oct20.py --pausar-viejos` si quedó alguno activo | Un anuncio "Rechazado": se lee el motivo y se corrige el texto desde Claude Code, no desde Chrome |
| PC2 | Que la fecha del checkout coincida con "2 a 7 días hábiles" (hoy sería ~22–29 oct). Si coincide, la ficha y la barra ya dicen lo mismo | Si Shopify no permite tiempos por tarifa en el plan Basic: se cambia `settings.envio_tiempo` para que la ficha diga lo que dice el checkout |
| PC3 | Que los precios del correo sean los de lanzamiento ($1,569 / $1,439 / $1,389 / $1,209 / $1,079) | Si mostró precios viejos, no se envía: caché de Shopify Email; se vuelve a generar |
| PC4 | Que no se haya escrito a pruebas ni a quien ya compró (el del 12 sep) | — |
| PC5 | Que ningún precio deje menos de $150 después de envío y comisión; que la existencia en Shopify se baje a mano cuando algo se venda en ML | Publicación "Premium" por error: pausar y republicar en Clásica |
