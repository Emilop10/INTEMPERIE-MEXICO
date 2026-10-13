# Prompt para Claude in Chrome — pendientes antes de la fase 3

Del corte del 13 oct (MANUAL §78-§79). **Uso:** el dueño pega el bloque
completo en Claude in Chrome, con su sesión de Shopify iniciada. Cada
bloque termina en un punto de control: el dueño reenvía el reporte a
Claude Code y responde lo que haga falta.

```text
Vas a ayudarme con cinco pendientes chicos de mi tienda Shopify "Intemperie México".
Admin: https://admin.shopify.com/store/wfuxvx-yn

REGLAS (NO NEGOCIABLES)
1. Nunca escribas contraseñas, códigos ni datos de tarjeta. Si algo pide iniciar
   sesión o pagar, detente y pídeme que lo haga yo.
2. No instales apps, no actives campañas pagadas ni planes de pago.
3. Antes de guardar, borrar, archivar o activar CUALQUIER cosa, dime exactamente
   qué vas a hacer y espera mi "sí".
4. No cambies precios, productos (salvo lo que dice el bloque 3), inventario ni el tema.
5. Si algo no coincide con estas instrucciones, describe lo que ves y espera.
6. En cada PUNTO DE CONTROL detente y entrégame el reporte con el formato indicado.

=====================================================================
BLOQUE 1 — Archivar el pedido de prueba #1005
=====================================================================
1.1 Pedidos → abre el pedido #1005 (24 ago 2026, $190.95, un "Plomo Gimbel Bola 6.0mm").
    Es una compra de prueba del dueño; no hay nada que enviar.
1.2 Confírmame que es ese pedido (número, fecha, monto, producto) y que NO hay otro
    pedido pendiente distinto.
1.3 Propón "Archivar" (no "Cancelar" ni "Reembolsar": eso movería dinero). Espera mi "sí".

>>> PUNTO DE CONTROL 1:
REPORTE PARA CLAUDE CODE — P1
- Pedido #1005: (confirmado: fecha, monto, producto)
- Otros pedidos pendientes: (ninguno / cuáles)
- Acción hecha: (archivado con mi "sí" / nada)

=====================================================================
BLOQUE 2 — Canal "Shop" con "Acción necesaria" (solo mirar)
=====================================================================
2.1 Configuración → Canales de ventas → "Shop". Ábrelo.
2.2 Dime exactamente qué acción pide, con el texto literal, y qué pasa si no se hace.
    No hagas nada todavía, aunque parezca un solo clic.

>>> PUNTO DE CONTROL 2:
REPORTE PARA CLAUDE CODE — P2
- Texto exacto del aviso:
- Qué pide hacer y dónde:
- Qué dice que pasa si no se hace:

=====================================================================
BLOQUE 3 — Quitar la foto vieja del Combo Okuma Revenger 8'0" (2.45m)
=====================================================================
3.1 Productos → "Combo Okuma Revenger 8'0\" (2.45m)". Tiene 2 fotos:
    - Foto 1 (la buena): retocada, SIN la etiqueta blanca de código de barras en el mango.
    - Foto 2 (la vieja): la misma caña CON una etiqueta blanca de código de barras en el
      mango, abajo a la izquierda.
3.2 Confírmame cuál es cuál viéndolas. Propón borrar SOLO la foto 2, la de la etiqueta.
    Espera mi "sí". No toques la foto 1 ni nada más del producto.

>>> PUNTO DE CONTROL 3:
REPORTE PARA CLAUDE CODE — P3
- Foto 1: (sin etiqueta: sí/no)
- Foto 2: (con etiqueta: sí/no)
- Acción hecha: (borrada la foto 2 con mi "sí" / nada)

=====================================================================
BLOQUE 4 — Casilla de correos en la pantalla de pago (mirar; cambiar solo con mi "sí")
=====================================================================
4.1 Configuración → Pantalla de pago (Checkout) → sección "Marketing por correo
    electrónico" / "Opciones de marketing".
4.2 Dime: ¿está activada la casilla para que el cliente se suscriba? ¿Está
    "preseleccionada" (marcada de entrada) o no?
4.3 Si no está preseleccionada y yo te digo "sí, preselecciona", activa SOLO esa opción
    y guarda.

>>> PUNTO DE CONTROL 4:
REPORTE PARA CLAUDE CODE — P4
- Casilla de suscripción visible en el pago: (sí/no)
- Preseleccionada: (sí/no)
- Acción hecha: (preseleccionada con mi "sí" / nada)

=====================================================================
BLOQUE 5 — Correos de agradecimiento y bienvenida (Messaging)
=====================================================================
5.1 Marketing → Automatizaciones (Shopify Messaging). Abre:
    a) "Agradece a los clientes después de su compra"
    b) "Bienvenida INTEMPERIE"
5.2 De cada una dame: desencadenante, espera y condiciones (de Shopify Flow, solo mirar),
    y la vista previa del correo: asunto, texto de vista previa, título, cuerpo, botones
    y si trae el logo del venado.
5.3 Si no trae logo: cambia el encabezado a "Logo" y elige "Logo_Sin_Fondo.png" de los
    archivos de la tienda (como en el correo de pago abandonado), ~170 px y centrado.
5.4 NO actives nada todavía. Espera mi "sí, activa (a)", "sí, activa (b)" o ambos.
    No toques "Convierte la navegación de producto abandonada" ni
    "Recupera el carrito abandonado": se quedan en borrador.

>>> PUNTO DE CONTROL 5:
REPORTE PARA CLAUDE CODE — P5
- (a) Agradecimiento: desencadenante · espera · condiciones · asunto · resumen del cuerpo · logo
- (b) Bienvenida: desencadenante · espera · condiciones · asunto · resumen del cuerpo · logo
- Acción hecha: (logo agregado / activadas con mi "sí" / nada)

Al terminar el P5, ya acabaste. No hagas nada más.
```

## Qué revisa Claude Code en cada reporte

| Reporte | Revisión | Señal de alto |
|---|---|---|
| P1 | Que sea el #1005 y que la acción sea **Archivar** | Que proponga cancelar o reembolsar |
| P2 | Qué pide Shop. Casi siempre son datos de la tienda o aceptar términos nuevos | Algo que cambie pagos, precios o envíos |
| P3 | Que se borre la foto **con** etiqueta | Que vaya a borrar la retocada |
| P4 | Estado de la casilla; preseleccionar solo con el visto bueno del dueño | — |
| P5 | Que los correos coincidan con la tienda (envío desde $799, WhatsApp, garantía) y que no se encimen con el de pago abandonado | Promociones o descuentos que el dueño no autorizó |
