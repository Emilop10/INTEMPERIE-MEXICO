# Pendientes — Intemperie México

Temas abiertos de la tienda. Casi todos requieren una decisión o datos tuyos;
el resto de la auditoría ya quedó implementado y en vivo.

## ⚠️ Este archivo llevaba desde el 15 de agosto sin actualizar

El bloque de abajo describía la campaña como "creada y en pausa,
$100/día, optimizada a Compra, 324 productos". Nada de eso es cierto
hoy. **Estado real, verificado el 22 de agosto de 2026** — detalle
completo en `MANUAL-PROYECTO.md`, secciones 33 y 35 (arranque y
primeros días), 37 (6 accesorios de arma que se colaron y se
excluyeron), 38-40 (reconstrucción completa: por qué no vendía, el
tope de gasto), y 41 (auditoría de conversión del sitio):

| | |
|---|---|
| Campaña | `IMX \| Ventas \| Pesca y Óptica \| Catálogo dinámico \| Ago26` |
| Estado | **En pausa** desde la Ola 8 (25 ago), a la espera de subir el tope de gasto — ver el recuadro rojo abajo |
| Conjunto vigente | `...AddToCart \| Hombres 45+ \| >=$500 \| Ago26 v3`, $55/día. Optimiza a **`ADD_TO_CART`** (no a Compra — con este presupuesto nunca sale de aprendizaje; y no a `CONTENT_VIEW`, que compró tráfico basura: sección 48) |
| Segmentación | México, **hombres 45-65**, solo Facebook feed y Marketplace (Instagram feed se cortó: 15% del gasto para 2% del resultado) |
| Conjunto de productos | **38 productos** ≥$500, en stock, sin accesorios de arma (no 324) — piso subido de $300 a $500 el 24 de agosto (sección 45), y +3 al publicar los combos nuevos de $999-$1,499 (sección 47) |
| Tope de gasto | a nivel de **cuenta**. ⚠️ **Se agota y apaga la entrega en silencio** — campaña y anuncios siguen diciendo "activo" y Meta no lo marca como incidencia. Ya costó 4 días de apagón (21-25 ago). Conviene ponerlo mensual, no semanal — secciones 40 y 48 |
| Resultado a la fecha | 0 compras. **Pero ese dato mide la tienda vieja**: los anuncios pararon el 21 de agosto y todas las mejoras se desplegaron del 22 al 25, así que ningún visitante de pago ha visto la tienda mejorada (sección 48) |

Seguimiento: `python3 scripts/meta-ads.py reporte --dias 7` (usa
`time_range` explícito, no `date_preset` — ver sección 34/35 del
manual sobre por qué).

**Shopify Payments está desactivado de forma definitiva** desde el 14
de agosto (aviso de Trust & Safety por los rifles de aire). **Decisión
cerrada el 25 de agosto:** el dueño conserva los rifles y pistolas de
aire en el catálogo y no vuelve a usar Shopify Payments. El checkout
se queda permanentemente en **PayPal + Mercado Pago**, que además
aportan meses sin intereses y pago en efectivo en OXXO y 7-Eleven —
medios que Shopify Payments no daba. Sección 30 del manual. **No hay
que volver a evaluarlo.**

---

**✅ Cerrado el 24 de agosto — el checkout sí funciona y sí se mide.**
La revisión de los 3 puntos bloqueantes antes de la siguiente campaña
encontró que la tienda llevaba 6+ meses sin una compra completada, y
el dueño hizo una compra de prueba real (pedido #1005, $190.95 MXN,
"Pagado") para confirmarlo de punta a punta. El pixel de Meta sí
recibió el evento Compra — calidad 9.3/10, el mejor de todo el sitio —
la Conversions API está activa ("Comparte datos" ya en Máximo). Las
capturas que mostraban cero compras eran por tener seleccionado el
portafolio de negocio equivocado en Meta Business Suite ("Alcampo
Cuernavaca" en vez de "Intemperie México"), no un problema real.
**Ningún bloqueante queda para la siguiente campaña.** Detalle
completo en la sección 46 del manual.

**✅ Corregido el 25 de agosto (sección 49):** los "7 que llegaron a la
pantalla de pago sin comprar" eran **el propio dueño**. Los 4 checkouts
abandonados de toda la historia son suyos, más el pedido #1005 — cinco
sesiones propias. **Ningún cliente real ha llegado ahí**, así que no hay
evidencia de problema en el checkout: el cuello de botella está arriba,
en vista → carrito. **Regla nueva: no probar el checkout con la campaña
activa**, o anotar día/monto/pasarela en el momento.

**✅ Corregido el 25 de agosto:** el destino del anuncio
(`/collections/combos`) tenía **5 de 12 combos agotados, el 42%**. Se
agregó una regla de disponibilidad a la colección: quedó en 7 productos,
todos disponibles y todos entre $920 y $1,499 (o sea, **todos cruzan los
$799**, así que la promesa de envío gratis del anuncio se cumple al
100%). Los agotados siguen publicados y vendibles por otras vías.

**🔴 Decisión pendiente antes de encender: dos combos Revenger compiten
en el aterrizaje pagado (25 ago, sección 50 del manual).**
La conciliación de inventario devolvió a stock el **Combo Okuma Revenger
8'0" (2.45m) a $849** (3 unidades) — el mismo que estaba agotado y por el
que armé el **Combo Okuma Revenger 8'0" (2.40m) a $999**. Ahora los dos
están disponibles y salen juntos en `/collections/combos`, que es la
página que paga el anuncio. Son productos distintos (distinto carrete,
5.0:1 contra 4.8:1, fábrica contra armado), pero en una cuadrícula de
colección se leen como el mismo combo a dos precios, y el de $999 es el
caro. Opciones, en orden de menos a más trabajo:

1. **Ocultar el de $999 de la colección** mientras haya stock del de
   $849, y volver a mostrarlo cuando se agote. Es reversible y no toca
   precios.
2. **Diferenciarlo en el título** (p. ej. "carrete RV-80, arrastre 12 kg")
   para que la diferencia real se vea sin abrir la ficha.
3. **Bajarle el precio** al de $999. Es la que toca margen, y no hay
   evidencia de demanda todavía para justificarla.

**✅ Resuelto el 25 de agosto con la opción 1.** Se agregó una tercera
regla a la colección smart (`tag not_equals "oculto-en-combos"`) y se
etiquetó el combo de $999. La colección quedó en **7 productos**, todos
disponibles y sobre $799; la ficha del $999 sigue activa y comprable por
enlace directo.

> 🔁 **Cuando se agoten las 3 unidades del combo de $849, quitarle la
> etiqueta `oculto-en-combos` al de $999** para devolverlo a la vitrina.
> Es un solo cambio, sin tocar reglas ni precios. Sección 50 del manual.

**✅ Cerrado el 25 de agosto — la foto del Combo Okuma Elite Pro sí
corresponde.** Se había marcado como dudosa porque su archivo
(`cana-saguaro-stimula-4-1-...webp`) es de la misma serie que el de la
Caña Shimano Stimula. El dueño la revisó a ojo y está bien: un nombre
de archivo heredado no es prueba de nada. Los 7 combos del aterrizaje
pagado quedan con su foto correcta.

**📈 RESULTADO DEL TRAMO NUEVO — 4 de septiembre.** El piso de $799
subió la tasa de carrito **de 1.32% a 2.24% (+70%)**, a la banda ambigua.
Con 7 carritos **no es estadísticamente significativo** (p=0.31): apunta
bien, no está probado.

El embudo completo se activó: **14 carritos · 7 checkouts · 3 pantallas
de pago · 0 compras** en 842 vistas.

> ⚠️ **Vamos 3 de 6 en el paro duro** (6+ pantallas de pago sin compra →
> detener). Si se llega a 6 sin venta, el problema está en el pago.

> 💸 **Quedan $98.94, menos de 2 días.** El experimento se agota solo. La
> decisión de qué sigue —fotos reales de producto o más presupuesto para
> medir— se plantea con los números completos al cerrar.

---

**📊 CORTE DE MEDICIÓN CUMPLIDO — 31 de agosto, 13:48 hora de Chihuahua.**

491 vistas de producto · **7 carritos (1.43%)** · 4 checkouts · 0 compras.
El resultado cayó **a un carrito** de la frontera de 1.5%, justo donde
§49 había anticipado por escrito que 500 vistas no pueden decidir.

**Novedad buena:** aparecieron los checkouts — **57% de los carritos
llegan a iniciar el pago**, donde dos días antes había cero. El cuello
está arriba (vista → carrito), no en el checkout.

**Decisión del dueño, aplicada el 31 ago 14:01:** subir el piso del
catálogo anunciable de $500 a **$799**. El conjunto pasó de 38 a **27
productos** ($812-$3,450, 0 agotados) y ahora el 100% de los aterrizajes
cumple la promesa de envío gratis del anuncio. No reinició el
aprendizaje: se tocó el product set, no el conjunto de anuncios.

> 📏 **Cómo se lee el tramo nuevo** (fijado antes del resultado, medido
> solo desde el 31 ago 14:01): **≥3%** = el envío era el problema,
> recargar y seguir · **≤1.5%** = el problema está en la ficha y más
> gasto no lo arregla · en medio = este presupuesto no alcanza para
> decidirlo. Quedan **$297** (~3.5 días, ~480 vistas).

---

**🎉 PRIMERA VENTA REAL — 12 de septiembre de 2026.** Un cliente que
llegó por el anuncio compró el **Combo Okuma Revenger 8'0" (2.45m) por
$849**. No es la compra de prueba del dueño: verificado por dos vías
independientes — el evento `purchase` de Meta ($849) y, sobre todo, el
**stock de ese combo bajó de 2 a 1** en Shopify, que es un hecho que
Meta no controla. Detalle completo en la
[sección 58 del manual](./MANUAL-PROYECTO.md#58-la-primera-venta-real-12-sep).

Estado del embudo al 12 de septiembre, con $276.25 de $600 gastados:

| | Ronda anterior | Esta ronda |
|---|---|---|
| Vistas de producto | 1,004 | 367 |
| **Carritos** | 16 — 1.59% | **12 — 3.27%** |
| Checkouts · pantallas de pago | 8 · 3 | 9 · 3 |
| **Compras** | **0** | **1 ($849)** |

> ⚖️ **La tasa de carrito se dobló, pero p = 0.052** — roza el umbral de
> significancia y no lo cruza. Apunta muy bien, no está probado. Y del
> cierre no se puede concluir nada con n=1: el intervalo de
> carrito→compra va de 1.5% a 35%.

> 🟡 **Pendiente del dueño, y decide si esto gana o pierde dinero:
> ¿cuánto cuesta REALMENTE enviar un paquete?** El combo costó $506.50 y
> se vendió en $849 → margen bruto $342.50. Pero al pasar el piso de
> $799 el envío es gratis y lo absorbe la tienda. Si el costo real de
> paquetería se acerca a los $189 que se cobran por debajo del piso,
> esta venta queda cerca de tablas. Sin ese dato no se puede saber si la
> campaña es rentable, aunque venda.

~~**Corte actualizado: vamos 3 de 6** en pantallas de pago sin compra.
Quedan **~$324** (~6 días a $55/día). No hay nada que cambiar por ahora.~~

---

**📉 REVISIÓN DEL 15 DE SEPTIEMBRE — el gasto se está yendo al peor
producto del catálogo.** Todo verificado en vivo contra la Marketing API
y corroborado por inventario de Shopify. Detalle completo en
[`MANUAL-PROYECTO.md` §60](./MANUAL-PROYECTO.md#60-meta-optimiza-por-conversión-no-por-margen-15-sep).

- **Quedan $170.61** de los $1,485 del tope → **2-3 días** de vida.
- **El paro duro se reinició solo:** desde la venta del 12-sep van
  **0 de 6** pantallas de pago sin compra, no 3 de 6. Nada que detener.
- **El arreglo del carrito se ve:** agregar → iniciar pago pasó de
  **44% a 77%** entre el tramo roto (1-9 sep) y el arreglado (10-15 sep).
  Con 9 y 13 eventos no es significativo, pero se movió el tramo correcto.
- **Adquirir tráfico NO es el problema:** CTR 6.63%, CPC $0.57.
- **El hallazgo:** el **35% del gasto** ($143.08 de $409.39) se fue a un
  solo producto, el Combo Revenger $849 — el de **peor contribución del
  catálogo**. Toda la óptica junta recibió $46.66 (11%). Meta optimiza
  por tasa de conversión y **no conoce nuestros márgenes**.
- **Con el costo de envío de §59 ya se puede calcular el ROAS de
  equilibrio:** el combo de cañas necesita **12.01x** y la campaña está
  en **2.07x** — cada venta de combo pierde después de publicidad. Dos
  binoculares (Simmons $1,290 y Bushnell $1,450) necesitan **1.81x-1.86x**
  y **ya serían rentables hoy** con esta misma campaña.

> ✅ **Decisión tomada: no se cambia nada con $170 y 2-3 días.**
> Reestructurar reinicia el aprendizaje y una muestra de $170 con una
> sola conversión no decide nada. La decisión que importa es qué hacer
> **al recargar**.

> 🆕 **Pendiente del dueño — al recargar, en este orden:** (1) separar
> óptica y pesca en dos conjuntos con presupuesto propio, para que el
> gasto lo reparta el margen y no el algoritmo; (2) revisar el piso de
> $799, que está por debajo del costo real de enviar una caña ($271.83
> con caja) — necesita las 3-5 guías de muestra que dejó pendientes §59;
> (3) fotografía, que sigue siendo el cuello de botella: 568 vistas de
> producto → 13 al carrito (**2.3%**, contra 3-8% normal).

> 🔧 **Arreglo menor pendiente:** el conjunto de productos se llama
> `IMX | Pesca y Optica | >=$500 en stock...` pero su filtro real es
> **`>= $799`**. El nombre quedó del diseño original y confunde al leer
> el panel. Corregirlo cuando se toque el conjunto.

---

**⏸️ PAUSADA — 17 de septiembre de 2026, 17:39 hora de Chihuahua.** A
propuesta de la revisión y por decisión del dueño, se pausó **con $56.92
sin gastar** en vez de dejar que el tope se agotara solo. Cierre completo
en [`MANUAL-PROYECTO.md` §62](./MANUAL-PROYECTO.md#62-cierre-de-la-ronda-se-pausa-con-57-sin-gastar-17-sep).

- **Por qué pausar teniendo saldo:** la próxima ronda separa óptica de
  pesca, y eso reinicia la fase de aprendizaje de todos modos. No había
  aprendizaje que preservar — solo $57 que se iban a gastar en la
  configuración que ya sabemos que pierde dinero.
- **Cierre:** vida completa $1,826.87 → 1 venta de $849 → **ROAS 0.46x**.
  Mejor ventana (10-17 sep): $522.87 → **ROAS 1.62x**, contra un
  equilibrio de **12x** con combos de caña.
- **Del 13 al 17:** $243.56, 0 ventas, 0 pantallas de pago.
- **Se descartó midiendo**, no opinando: el checkout funciona de punta a
  punta (sesión real de carrito con `curl`, sin JS, para no ensuciar el
  pixel); la mezcla de productos no cambió; y el cambio de CSS del 15 no
  fue —el bache empezó el 13—. Queda como explicación más probable el
  **desgaste de creativo**: un solo anuncio desde el 25 de agosto, con el
  CTR cayendo de 6.95% a 5.40%.
- **Nada borrado.** Los tres conjuntos siguen ahí; el v3 conserva su
  `status` ACTIVE y volvería a entregar solo si se reactiva la campaña.

> 🆕 **Se agrega una cuarta tarea a la lista del recargue: creativo
> nuevo.** Las otras tres siguen igual (separar óptica/pesca, revisar el
> piso de $799, fotografía). 23 días con un solo anuncio es lo que
> produjo la caída de CTR de la última semana.

---

**🟢 REACTIVADA — 9 de septiembre de 2026, 19:36 hora de Chihuahua.**
Se había detenido el 6 de septiembre porque se agotó el tope de cuenta
($885 de $885) — no fue una pausa a mano, fue el apagón silencioso de la
sección 48. Se sube el tope a **$1,485** (**$600 disponibles**), tras dos
arreglos de sitio que probablemente lastimaban el tramo carrito→pago
durante toda la ventana de entrega anterior: el cajón del carrito que no
mostraba productos (sección 55) y Mercado Pago Tarjetas, que quitó el
redirect del checkout (sección 54, confirmado por el dueño). Detalle
completo de la reactivación en la
[sección 56 del manual](./MANUAL-PROYECTO.md#56-reactivación-de-la-campaña-tras-dos-arreglos-de-sitio-9-10-sep).

**Cómo se lee esta ronda: distinto a las anteriores.** Las rondas
pasadas midieron vista→carrito, que ya se sabe que funciona (1.90% con
el piso de $799). Esta es la primera oportunidad real de medir
carrito→pago sin el bug del cajón de por medio — el dato viejo (3
pantallas de pago, 0 compras) no sirve de línea base porque se generó
con el checkout roto. **Corte:** 6 o más `add_payment_info` sin ninguna
compra → detener. Una sola compra real antes de eso prueba la campaña
viable a este nivel de gasto.

**Resumen del tramo anterior (27 ago - 6 sep) que llevó a estos
arreglos**, $600 en 10 días:

| | |
|---|---|
| Impresiones · CTR | 16,547 · **7.52%** (contra 3.66% y 2.90% de v1 y v2) |
| Vistas de producto | **1,004** |
| **Carritos** | **16 → 1.59%** · costo por carrito **$30.46** |
| Checkouts · pantallas de pago | 8 · 3 |
| **Compras** | **0** |
| Saldo pendiente de cobro | $281.87 |

**El corte de la sección 49 cayó en la banda ambigua** (1.59%, intervalo
[0.91%, 2.58%]): ni "alto" ni "funciona". Es el desenlace que §49
anticipó **por escrito, antes de ver el número**, al dejar dicho que 500
vistas no podían arbitrar la frontera de 1.5%.

**El piso de $799 sí ayudó**: la tasa de carrito pasó de 1.32% a 1.90%
(+44%) y cada carrito bajó de $46.55 a $30.46 (−35%). Con p = 0.47 no
alcanza significancia, pero las dos métricas se movieron juntas y una es
dinero directo. El CTR bajó de 8.28% a 6.76% — peor clic, mejor carrito:
salió a cuenta.

**Del fondo del embudo no se puede concluir nada.** Con 0 compras de 16
carritos, la tasa de cierre está entre 0% y 20.6%. Y **0 era un
resultado probable incluso con una tienda que convierte bien**: 16
carritos al 15% dan una esperanza de 2.4 ventas, y ver cero ocurre ~7%
de las veces. Lo que falta no es diagnóstico, es volumen.

**Los dos caminos, con precio:**

1. **Fotos reales de los productos de ticket alto** — ataca la tasa de
   carrito, que es donde está el cuello. **Recomendado.**
2. **~$1,500 más de presupuesto** para llegar a ~50 carritos y poder
   medir el cierre. A $30.46 por carrito, el negocio cierra a partir de
   ~15% de conversión y no cierra por debajo de 10%.

> ⚠️ **Trampa verificada al subir el tope: el `POST` de `spend_cap` no
> usa la misma escala que el `GET`.** El campo se lee siempre en
> centavos, pero se escribe en pesos — postear el monto en centavos deja
> un tope 100 veces mayor al pedido. Ya pasó una vez (sección 56 del
> manual) y se corrigió antes de gastar nada. **Siempre postear en pesos
> y releer de inmediato para confirmar.**

**Qué NO hacer:** no iterar creativos (el CTR de 7.52% no es el
problema) ni tocar la segmentación (validada por dos campañas). Los
conjuntos v1 y v2 siguen **en pausa** a propósito — regla de la casa:
pausar, nunca borrar.

**✅ Mercado Pago Tarjetas — activado y confirmado (9 sep).** Mercado
Pago ofreció el **checkout transparente**: cobrar con tarjeta **dentro
de la tienda** en vez de mandar al cliente a otra pantalla. El dueño lo
activó siguiendo un video. Detalle en la
[sección 54 del manual](./MANUAL-PROYECTO.md#54-mercado-pago-tarjetas-quitar-el-redirect-del-checkout-9-sep).

Quitó una fricción que este repositorio tenía anotada desde que se
desactivó Shopify Payments, y de paso permite mostrar los **meses sin
intereses en el checkout propio** en vez de solo después del redirect.
**No fue el arreglo de las cero ventas**: el embudo se cerró arriba
(1.59% de carrito), y abajo solo hubo 3 pantallas de pago — con ese
número no se puede concluir nada del checkout.

Las tres condiciones, cerradas:

1. ✅ **Confirmación por escrito de Mercado Pago de que el catálogo
   califica.** Confirmado por el dueño.
2. ✅ **PayPal y Checkout Pro siguen activos.** La tienda nunca se quedó
   sin forma de pago.
3. ✅ **Compra de prueba de punta a punta, hecha.** El dueño confirma que
   se cobró bien. **No se registró el número de pedido exacto** en esta
   ronda de documentación — anotarlo si se recupera, para tener el rastro
   completo como con el pedido #1005 de la prueba anterior.

**Pendiente, no bloqueante:** confirmar que el evento `Purchase` de Meta
se disparó para esa compra de prueba, y reemplazar el umbral inventado de
MSI (`msi_minimo_centavos`, sigue en $300) por el mínimo real si Mercado
Pago llega a confirmarlo — no se confirmó todavía, se sigue con el valor
conservador.

**🟡 Del lado del dueño, no se puede resolver por código:**
- **Fotografía** — **decisión tomada el 25 de agosto: se lanzó sin
  esto**, y sigue abierta. 34 de los 38 productos anunciables tienen una
  sola imagen, de catálogo de proveedor. Es el bloqueador dominante del
  recorrido de compra y el confusor conocido de la medición: con la tasa
  de carrito en 1.59% no se puede distinguir qué parte es el sitio y qué
  parte es la evidencia visual.
- **✅ Costo real de envío, resuelto en parte (14 sep).** La guía real
  del primer pedido (a Quintana Roo) costó **$223** — no los $189 que se
  cobran por debajo del piso de $799, y no la recarga de $500 a Skydropx
  (eso es saldo de cartera, no el costo del envío). Margen neto real de
  esa venta: **$70.67 (8.3%)** — no hay pérdida, pero el margen es
  delgado y **el envío sale más caro mientras más lejos esté el
  cliente**. Detalle completo en la
  [sección 59 del manual](./MANUAL-PROYECTO.md#59-el-costo-real-de-envío-guía-a-quintana-roo-223-14-sep).
  - **🆕 Pendiente más preciso que antes**: reunir el costo de guía de
    3-5 envíos más, a distintas distancias, para saber el rango real y
    decidir si el piso de $799 necesita ajustarse. Ya no es "no sabemos
    nada" — es "falta repetir la medición".
- **Reseñas de producto**: 8 a nivel tienda, 0 por producto. Meta: 30+
  con promedio real (4.5-4.8), no defender el 5.00 actual.
- **Umbral de envío**: se subió el piso del catálogo anunciable a $799 y
  funcionó; queda pendiente decidir si conviene bajar el umbral de envío
  gratis a $599/$99 para el resto de la tienda, cuya mediana es $149.
  Decisión de margen.
- **Filtros por tipo en las colecciones grandes**: `/collections/todo-pesca`
  tiene 306 productos en 20 páginas y solo dos filtros (disponibilidad y
  precio). Quien busca una caña no puede filtrar cañas — el recorrido de
  comprador simulado lo marcó como el punto donde casi abandona.
  **No se puede hacer por código**: en OS 2.0 los filtros salen de la app
  **Search & Discovery** en el admin de Shopify, no del tema. Detalle en
  la sección 48 del manual.

**Abiertos ahora mismo:** cerrar los productos de
[`PRODUCTOS-PENDIENTES.md`](./PRODUCTOS-PENDIENTES.md) y TikTok cuando
exista la cuenta. (La decisión sobre Shopify Payments que aparecía
aquí ya se cerró el 25 de agosto — ver arriba. El recorrido
interactivo del checkout también se completó — ver "Estado al 22 de
agosto" en la sección
45 del manual; esta línea estaba desactualizada.)

---

## ⚠️ Los 3 combos nuevos ya están a la venta — hay una tarea manual asociada

Publicados el 24 de agosto de 2026 en Online Store, Point of Sale y
Facebook & Instagram (mismos canales que los combos que ya existían).
Verificado en vivo: los 3 dan HTTP 200, la colección `combos` pasó de
9 a 12 productos, cada uno con ficha técnica y sin errores de Liquid.

| Combo | Precio | Stock |
|---|---|---|
| Okuma Revenger 8'0" | $999 | 1 |
| Blue Fox Power Boat 6'4" | $1,049 | 1 |
| Rapala Corux 240 | $1,499 | 1 |

> ✅ **Verificado el 10 de septiembre, tras conciliar inventario**: los
> tres siguen exactos al mínimo de sus componentes — sin sobreventa, sin
> stock de componente esperando a que se suba el combo. Detalle y
> método en la [sección 57 del manual](./MANUAL-PROYECTO.md#57-conciliación-del-10-de-septiembre-los-combos-manuales-pasan-la-prueba).
> De paso se encontraron **5 combos de fábrica** (de un solo SKU, no
> armados por nosotros) publicados con **stock 0**: Cascade II, Elite
> Pro, Fin Chaser X 6'6"/7'0", y Steeler XP — visibles pero no
> comprables hasta reabastecerlos.

### 🔴 Tarea manual permanente: descontar componentes al vender un combo

**Shopify NO resta el stock de la caña ni del carrete cuando se vende
un combo.** Los componentes están a 1 unidad cada uno y siguen
publicados por separado, así que:

> **Cada vez que se venda un combo, hay que entrar a Shopify y bajar a
> 0 el stock de sus componentes** (o restar la cantidad vendida).

Si no se hace, se puede vender la misma caña dos veces y hay que
cancelarle el pedido a un cliente — caro en una tienda que apenas
registró su primera compra.

Componentes de cada combo:
- **Okuma Revenger** → `cana-de-pescar-okuma-revenger-spinning-80-2-40m` + `carrete-okuma-revenger-rv-80-spinning`
- **Blue Fox** → `cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m` + `carrete-blue-fox-ranco-3000sp-spinning`
- **Rapala Corux** → `cana-de-pescar-rapala-corux-240-710` + `carrete-gimbel-jl4000-spinning` + `caja-rapala-utility-box-chica`

**Por qué se eligió esta vía y no otra** (decisión del dueño, 24 ago):
despublicar los componentes era más seguro pero **los 7 están dentro
del conjunto anunciable de Meta** — quitarlos
habría reducido el catálogo anunciable un 20%, justo lo contrario de
lo que se buscaba. Una app de bundles lo resolvería de raíz pero
cuesta mensualidad. Con el volumen actual de pedidos el riesgo de
colisión es bajo, así que se optó por lo manual. **Revisar esta
decisión cuando suba el volumen de pedidos.**

### Stock: solo alcanza para 1 pieza de cada combo

Dato que la propuesta original no tenía: los componentes están a 1
unidad, así que cada combo se creó con stock 1. Para vender más hay
que reabastecer los componentes.

**Resuelto el 13-15 de agosto:** señales de confianza en la homepage
([3](#3-señales-de-confianza-ausentes--resuelto-13-agosto-2026)), el deploy
automático ([5](#5-activar-el-deploy-automático--resuelto-13-agosto-2026)),
e Instagram creado y vinculado ([2](#2-redes-sociales--parcialmente-resuelto-28-jul)).

**Resuelto el 22-23 de agosto:** auditoría de conversión completa —
ficha de producto, carrito, umbral de envío único, métodos de pago
visibles ([sección 41 del manual](./MANUAL-PROYECTO.md)) — e
integración de reseñas reales de Judge.me
([9](#9-judgeme-reseñas-reales--resuelto-23-agosto-2026)).

**Resuelto el 24 de agosto (Ola 6):** con dos agentes especializados
(Persona Walkthrough + Paid Social Strategist), verificado hallazgo
por hallazgo antes de actuar — piso de precio del conjunto de Meta
subido de $300 a $500 (72→35 productos, con datos reales de la API en
vez de la recomendación cruda del agente que hubiera dejado solo 23),
y productos agotados ya no se destacan en el home. Ver sección 45 del
manual, incluye un pendiente propio no reportado por ningún agente
(`inventory_threshold` causando "Bajas existencias" en el 87% del
catálogo) y una alerta de drift evitada a tiempo (casi se sube
`templates/product.json` sin los App Blocks de Judge.me que el
personalizador agregó hoy).

> 📌 **Nota de trabajo (4 de agosto):** al redactar prompts para Claude en
> Chrome, ser conciso y pedirle explícitamente que si no encuentra algo en
> 1-2 lugares razonables de la interfaz, lo reporte directo en vez de seguir
> buscando — evita gastar tokens de más explorando pantallas.

**Tema en vivo:** "Intemperie Mexico - Rediseño 2026" — publicado el 31 de
julio de 2026. Ya no hay tema de trabajo separado; todo cambio se ve en
vivo de inmediato.
**Dominio principal:** `https://intemperiemexico.com` — conectado y
verificado el 3 de agosto de 2026. `wfuxvx-yn.myshopify.com` ahora
redirige automáticamente al dominio propio.
**Última actualización:** 22 de agosto de 2026

**Correo profesional:** Google Workspace reactivado con `admin@intemperiemexico.com`
como cuenta principal. DNS (MX, SPF, DKIM) verificado y propagado. 6 alias activos
para recibir y para "enviar como": `ventas@`, `contacto@`, `info@`, `soporte@`,
`pedidos@`, `facturacion@`. El footer del sitio ya muestra `ventas@` como contacto
y `facturacion@` para solicitudes de factura.

**Políticas legales:** las 5 páginas (Términos, Privacidad, Envíos, Devoluciones,
Contacto) se reescribieron por completo y ya están **en vivo** (a diferencia del
resto del rediseño, las políticas legales no viven en el tema de copia — son
configuración a nivel tienda). Sin RFC ni ciudad expuestos, sin requisito de
mayoría de edad (por decisión explícita), con cláusulas de uso responsable para
productos de aire comprimido. Si se necesita volver a tocar permisos de la
app para editarlas de nuevo, ver
[`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md)
— ahí vive la **lista vigente de scopes** (la de `INSTRUCTIVO-APP-SHOPIFY.md`
quedó desactualizada y reautorizar con ella degrada el token).

---

## ~~1. Dos productos sin subcategoría~~ ✅ Resuelto (28 jul)

Se crearon dos colecciones nuevas, con portada y descripción, conectadas en la
homepage y en el mega-menú (este último ya es visible en el sitio en vivo):

- **Calibre 6.35mm** — Diábolo Gamo Hunter Metal Impact
- **CO2 y Cartuchos** — Cartucho de Gas CO2 12 Gramos

"Diábolos y Municiones" queda al 100% de cobertura, igual que los otros 3 departamentos.

---

## 2. Redes sociales — parcialmente resuelto (28 jul, Instagram 14 ago)

✅ **Facebook conectado**: `https://www.facebook.com/people/Intemperie-México/61588253103964/`
ya aparece como ícono en el footer del tema de trabajo.

✅ **Instagram creado y vinculado (14 agosto 2026):** cuenta `@intemperiemexico`,
tipo Empresa, creada por el cliente y vinculada al Business Manager desde
Meta Business Suite. El camino que proponía originalmente
`INSTRUCTIVO-META-ADS.md` (crear directo desde Business Suite) resultó
incorrecto — se corrigió el instructivo con el camino real (crear en
instagram.com primero, vincular después). Detalle completo en la sección
29 del `MANUAL-PROYECTO.md`.

⏳ **Pendiente:** TikTok — cuando se abra esa cuenta, mandar el link y se
conecta igual de rápido.

---

## 3. Señales de confianza ausentes — 🟡 resuelto en homepage, ampliado 22 ago

> **Actualización 22 de agosto:** este ítem se cerró resolviendo solo la
> homepage. La ficha de producto — que es donde de verdad se decide la
> compra — siguió sin devoluciones, garantía visible ni tiempo de entrega
> estructurado hasta la auditoría de conversión (sección 41 del manual),
> que agregó tres pestañas colapsables a la ficha y llevó las mismas
> señales al carrito. Se deja el registro original abajo tal cual, porque
> la lección importa: un ✅ prematuro puede tapar la mitad del problema.

La tienda vende rifles y ópticas de precio alto, pero la página no comunicaba
en ningún lado tiempos de entrega, garantía ni política de devoluciones (las
políticas legales existen, link en el footer, pero prácticamente nadie las
abre).

Se agregó una franja de confianza en la homepage, justo antes de la sección
de cierre, con los 3 puntos confirmados por el cliente:

- Envío: "Entrega en 2 a 7 días hábiles a todo México"
- Garantía: "Garantía de compra — si algo llega mal, lo resolvemos." (mismo
  texto ya usado en la ficha de producto, para no crear otra inconsistencia
  de copy)
- Devoluciones: "7 días para cambios o devoluciones", con link directo a la
  política de devoluciones real (`shop.refund_policy.url`)

Implementado en `sections/brand-experience.liquid` (nueva sección +
settings `trust_*` editables desde Personalizar tema) y
`assets/brand-tokens.css` (`.im-trust-band`), reutilizando el componente
`.im-trust-item` que ya existía en la ficha de producto.

---

## 5. Activar el deploy automático — ✅ resuelto (13 agosto 2026)

Hasta el 7 de agosto, guardar código en GitHub **no lo subía a la tienda**.
Eran dos cajones separados. Eso hizo que tres arreglos seguidos de la barra
deslizable parecieran no funcionar: estaban guardados, pero nunca habían
llegado a Shopify (ver sección 25 del manual).

El mecanismo (`.github/workflows/deploy-shopify.yml`) ya existía desde el 7
de agosto pero le faltaba el secret `SHOPIFY_ADMIN_TOKEN` en GitHub —
llevaba fallando en silencio varios commits sin que nadie lo notara. El
cliente lo configuró el 13 de agosto (GitHub → Settings → Secrets and
variables → Actions). Verificado reintentando la corrida fallida más
reciente: terminó en éxito.

Desde ahora, cualquier push que toque `tema-shopify/` se despliega solo,
sin pasos manuales.

> Si el token deja de servir en el futuro (expira o cambian los scopes de
> la app), el procedimiento completo está en
> [`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md):
> **empieza por su diagnóstico de 4 pasos** — más de una vez el token
> resultó estar vivo y el problema era otro. Regenerarlo toma 5 minutos,
> y después hay que actualizar este mismo secret o el deploy automático
> deja de funcionar **en silencio**.

---

## ~~6. Barra deslizable de subcategorías~~ ✅ Resuelto (7 ago)

Confirmado funcionando por el cliente. Diseño final: pista `#2C2C2E` de 10px
con thumb `#F5F5F7` casi blanco, tope del 30% del ancho.

**La causa nunca fue el color ni el ancho.** `base.css` trae
`div:empty { display: none }`, y el thumb es un div sin contenido — estaba
oculto desde la primera versión. Se corrigió declarándole `display: block`.

> ⚠️ **Trampa para el futuro:** cualquier elemento decorativo sin contenido en
> este tema queda invisible por esa misma regla. Método de diagnóstico completo
> en [`INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md`](./INSTRUCTIVO-CAMBIOS-QUE-NO-SE-VEN.md).

---

## ~~7. Alta en Google Search Console~~ ✅ Ejecutado (9 ago) — ahora solo esperar

El sitio no aparecía en Google. Confirmado que **no era un problema
técnico**: robots.txt, sitemap, canonical y meta description ya estaban
bien. La causa real era que nunca se dio de alta en Search Console — ya
se resolvió.

Ya se hizo todo lo que se podía por código (sección 27 del manual):
`BreadcrumbList`, Organization ampliado, `og:locale`, `og:image` genérico
en páginas sin foto propia.

**Lo que se hizo** (vía Claude en Chrome, instructivo en
[`INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md`](./INSTRUCTIVO-GOOGLE-SEARCH-CONSOLE.md)):
resultó que ya existía una propiedad verificada de tipo Dominio desde
mayo — se saltó la verificación y se fue directo a enviar el sitemap
(415 páginas descubiertas) y pedir indexación manual de la home + 4
departamentos + un producto.

**Verificado después, no solo confiando en el reporte:** la home ya está
indexada de verdad (confirmado con el texto exacto de Search Console). De
36 páginas evaluadas por Google, 29 marcaban algún error — se revisaron
todas en vivo con `curl` y **ninguna es un problema actual**: son
nombres de colecciones de antes de la reorganización en departamentos,
productos ya retirados del catálogo, o ruido de rastreo. Detalle completo
en la sección 27 del manual.

**No queda nada por hacer** — ni de tu lado ni del mío. Solo esperar a
que Google termine de evaluar el resto de las 415 páginas del sitemap
(normal que tome de días a un par de semanas).

---

## Nota aparte — categorización de Airsoft

Los 4 productos de **Airsoft 6mm** viven dentro de "Diábolos y Municiones", pero
técnicamente son balines de airsoft, no diábolos de aire comprimido. Funcionan
bien ahí por ahora; si esa línea crece, conviene separarla como su propio
departamento.

---

## ~~4a. Publicar el rediseño~~ ✅ Resuelto (31 jul)

**El tema "Intemperie Mexico - Rediseño 2026" ya es el tema en vivo** (rol
`main`), publicado directamente por API tras verificar que homepage,
colecciones y las 5 páginas de políticas cargan sin errores Liquid.
"Dawn" (el diseño anterior) quedó como tema sin publicar, disponible como
respaldo. A partir de este momento **todo lo que se edite en el tema de
trabajo se ve en vivo de inmediato** — ya no hay distinción entre "tema de
trabajo" y "tema en vivo".

## ~~4b. Chatbot de IA (Zipchat)~~ ✅ Resuelto (31 jul)

Se instaló y configuró por completo la app **Zipchat AI** como widget de
chat del sitio (no WhatsApp, ver `CHATBOT-IA-SITIO.md` para el porqué):
Bubble chat visible en todo el sitio (móvil y escritorio), asistente
renombrado a **"Cartucho"** con mensaje de bienvenida en la voz de
marca, y base de conocimiento (envíos, devoluciones, catálogo, pago,
contacto) cargada en "AI training". Probado con preguntas reales
("¿cuánto cuesta el envío?", "¿aceptan devoluciones de municiones?") y
responde correctamente.

⚠️ **Plan gratuito casi al límite**: 100/100 páginas de entrenamiento
usadas (más las 120 respuestas de IA/mes incluidas). Si en el futuro se
necesita indexar más contenido, hay que subir al plan Starter ($49
USD/mes).

**Prueba exhaustiva realizada (3 de agosto)**: 30 preguntas reales
cubriendo envíos, devoluciones, catálogo, pago, temas legales/sensibles
e intentos de manipulación del bot. Se detectaron y corrigieron 3
problemas:
- Tiempo de entrega inconsistente (la copia de marketing decía "2 a 4
  días", la política real dice "2 a 7 días hábiles") → corregido en el
  sitio (homepage, ficha de producto) y en el entrenamiento del bot,
  ahora todo coincide.
- El bot se identificaba con el dominio técnico
  (`wfuxvx-yn.myshopify.com`) en vez de "Intemperie México" → corregido
  con una instrucción explícita en "Additional instructions" (Prompt and
  Skills).
- El bot negaba tener número de WhatsApp pese a que sí estaba en el
  texto de entrenamiento — causa real: Zipchat tiene una integración
  dedicada de WhatsApp Business (vía Meta) que exige conectar un número
  exclusivo; como no está conectada, el bot daba esa respuesta fija sin
  importar el texto. Se decidió **no conectar esa integración** (fuera
  de alcance, requeriría dedicar un número solo a eso) y en su lugar se
  agregó una instrucción explícita que fuerza al bot a dar el número de
  WhatsApp de todos modos.
- Se verificó que no existan las 4 cañas de pescar mencionadas por el
  bot fueran alucinación — sí existen en el catálogo real, sin problema.
- Se revisó Contenido → Páginas y Artículos del blog por si los atajos
  de teclado accidentales durante la prueba habían creado borradores
  vacíos — no se encontró nada, sitio limpio.

✅ **Dominio propio conectado (3 de agosto)**: `intemperiemexico.com` ya
es el dominio principal de la tienda, con DNS verificado en Namecheap
(registro A y CNAME agregados sin tocar los registros de correo de
Workspace) y certificado TLS activo.

✅ **Escalación a WhatsApp agregada (3 de agosto)**: no existe una
función nativa de "handoff a humano con enlace" en Zipchat (el único
skill relacionado solo notifica internamente al equipo, no le muestra
nada al cliente), así que se resolvió con una instrucción explícita en
"Additional instructions": cuando Cartucho no puede resolver la duda, o
el cliente pide hablar con una persona, incluye el link
`https://wa.me/527773277340`. Confirmado en el widget público (no solo
en el Test chat del admin, que renderiza distinto) que el link aparece
como hipervínculo clicable real y abre WhatsApp correctamente.

El enlace además lleva un **mensaje precargado** ("Hola, vengo del chat
de Cartucho en la página y tengo una duda que no pude resolver.") vía el
parámetro `?text=` de wa.me, para que el cliente no llegue a un chat
vacío. Esto obligó a **desactivar "Enable UTM tracking"** en Chat
settings → Configuration, porque Zipchat sobreescribía cualquier query
string del link con sus propios parámetros UTM — decisión consciente:
se prioriza la experiencia del cliente (mensaje con contexto) sobre el
tracking interno de origen de conversación de Zipchat.

---

## 8. Meta Ads (Facebook/Instagram) — 🎉 primera venta real el 12 sep (ver arriba)

> **Actualización 22 de agosto:** todo lo que sigue describe el arranque
> del 15 de agosto (correcto en su momento). La campaña se reconstruyó
> por completo entre el 18 y el 20 de agosto — ver el recuadro de estado
> real al principio de este archivo y `MANUAL-PROYECTO.md` secciones
> 37-40. Se deja el registro original abajo porque documenta bien la
> puesta en marcha inicial (System User, catálogo, Instagram), que sigue
> siendo válida.


Arrancó el proyecto de publicidad en Meta. Antes de gastar un peso se
verificó algo importante: **Meta prohíbe anunciar armas, municiones y
accesorios de armas** (política oficial, riesgo real de baneo permanente
de la cuenta publicitaria). Del catálogo, pesca y binoculares (~84%) sí
se pueden anunciar; miras, diábolos/municiones y rifles/pistolas de aire
(~16%) no. Esto no cambia nada en la tienda — solo qué se muestra en los
anuncios.

**Sorpresa al revisar la cuenta (vía Claude en Chrome guiando al
cliente):** no partíamos de cero. Ya existía todo desde el 16 de febrero
— cuenta publicitaria, pixel activo, canal de Shopify instalado, y
$1,823 MXN de gasto real entre febrero y abril. Quedaban 6 campañas
"activas" pero sin entregar nada desde hace 4 meses (config de
prueba/agencia abandonada) — **se eliminaron por instrucción del
cliente**. También se corrigió el catálogo de Meta: estaba desactualizado
(solo 56 de 250+ productos) y al republicar todo por error quedaron
incluidas armas y municiones — **ya se excluyeron 59 productos
prohibidos** del canal, confirmado en vivo. Detalle completo de todo el
proceso en la sección 29 del `MANUAL-PROYECTO.md`.

**Ya hecho:**
- Setting del tema, snippet del pixel (`meta-pixel.liquid`) y JS
  (`meta-pixel.js`) — quedan **inactivos a propósito**: el pixel real ya
  corre vía el canal oficial de Shopify desde febrero, activar el manual
  duplicaría eventos.
- `scripts/meta-ads.py` para listar, reportar, pausar/activar campañas y
  presupuesto — y (agregado 14 agosto) `activos` para descubrir
  página/Instagram/catálogo/pixel, y `crear-campania` para armar la
  campaña completa (siempre en pausa).
- Token de System User creado, verificado y funcionando (`ads_management`,
  `ads_read`, `business_management`, `catalog_management`).
- Cuenta publicitaria limpia, catálogo corregido, pixel confirmado activo.
- Instagram creado y vinculado (ver sección 2 de arriba).
- `INSTRUCTIVO-FACEBOOK-ADS.md` — guía operativa completa (cómo se opera
  la cuenta, convenciones de nombres, reglas de presupuesto, comandos del
  script, lecciones aprendidas de esta puesta en marcha).

**Ya no hay bloqueos.** La primera campaña se creó el 15 de agosto y
está en pausa esperando revisión — ver el recuadro ✅ al principio de
este archivo para el ID y el comando de activación.

En el camino se resolvieron tres obstáculos que no estaban previstos, los
tres documentados en la sección 33 del manual: el "API access blocked"
(era el User-Agent del script, no la red), el catálogo de Meta muerto
desde febrero, y que la app tenía que pasar a modo Público para poder
crear anuncios.

---

## ~~9. Judge.me (reseñas reales)~~ ✅ Resuelto (23 agosto 2026)

Instalado con la cuenta existente del dueño: **8 reseñas reales**, 4 de
producto (5.0★ promedio, 3 de 4 emparejadas con productos activos) y 4
de tienda sin producto asociado. Conectado al tema en la ficha de
producto (badge + listado completo) y en las tarjetas de producto,
usando el namespace propio de Judge.me
(`product.metafields.judgeme.badge`/`.widget` — Judge.me no usa el
metafield genérico de Dawn). Verificado en vivo con `curl` contra
producción tras dos rondas de despliegue: el HTML trae el markup
correcto (`div.jdgm-widget` con `data-id`), sin errores de Liquid en
productos con y sin reseñas, sin regresión de velocidad. Detalle
completo, incluida la causa raíz de por qué no se veía nada al
principio (el metafield necesita su `div`, no basta imprimirlo solo),
en la sección 42 del `MANUAL-PROYECTO.md`.

> **Actualización 22 de agosto, tarde:** el fix de código (envolver el
> metafield en su `div`, arriba) no fue suficiente — el dueño confirmó
> con capturas reales que seguía sin verse nada. Causa real encontrada
> leyendo el código fuente de Judge.me en vivo: esta tienda ya está
> migrada a su arquitectura nueva de widgets ("revamp"), que exige
> atributos `data-entry-point`/`data-entry-key` que solo genera el
> propio Judge.me al instalar desde su panel — no algo que se pueda
> escribir a mano. El único camino que queda es instalar "Fragmentos
> de reseñas" desde Judge.me. Detalle completo en la sección 42 del
> manual (Ola 5c).

> **Actualización 22 de agosto, noche:** instalado. El botón "Instalar"
> de Judge.me resultó tener un bug (abría el editor sobre el tema Dawn
> en borrador sin importar el tema seleccionado). Se agregó el bloque
> "Review Snippets" a mano desde el personalizador del tema en vivo
> (Apps → Judge.me Reviews). Verificado con `curl`: los tres productos
> con reseñas reales ya traen el markup correcto
> (`data-entry-point="review_snippet.js"`). Detalle en sección 42 del
> manual (Ola 5d).

> **Actualización 22 de agosto, más noche:** con "Review Snippets" ya
> instalado, seguía sin verse nada — resultó que **los 4 productos
> originales de las 4 reseñas de producto ya no existen** (404 los
> cuatro, no solo el Okuma). Judge.me no ofrece reasignar reseñas a
> otro producto desde su panel, y el reimport de CSV habría duplicado
> las 8 reseñas en vez de corregirlas (detalle en sección 43 del
> manual). Se resolvió rodeando el problema: se instaló también el
> bloque **"Cards Carousel"** (reseñas de tienda, sin filtrar por
> producto) en el home y en la ficha de producto — verificado con
> `curl`, ya trae "5.00 ★ (8)" real en el HTML. Se encontró y corrigió
> además un problema de contraste (texto negro fijo sobre el fondo
> negro del sitio) en `assets/brand-tokens.css`. Detalle en sección 44
> del manual (Ola 5e).

> **Actualización 23 de agosto, madrugada:** con capturas reales en
> mano, el dueño señaló dos problemas más — el fix de contraste
> anterior se pasó y dejó el texto DENTRO de las tarjetas casi
> invisible (corregido, solo se tocan `--header-color`/`--arrows-color`
> ahora, no `--text-color`), y el bloque en la ficha de producto se
> veía apretado por estar en la columna angosta del precio (movido a
> la sección "Aplicaciones" de ancho completo, después de "Productos
> relacionados"). Ambos verificados con `curl` en producción. Detalle
> en sección 44 del manual (Ola 5f).

> **Actualización 23 de agosto, madrugada (2):** dos ajustes finales de
> pulido, confirmados con `curl` — la sección "Aplicaciones" se movió
> a **antes** de "Productos relacionados" (reseñas justo después de
> toda la info de compra, no al fondo), y el título del carrusel se
> tradujo de "Customers are saying" a "Lo que dicen nuestros clientes"
> en las dos instancias (home y ficha, es un ajuste por bloque, no
> global — está en el campo "Header text" del propio bloque, no en el
> panel de Judge.me). Con esto, la parte visual y funcional del
> carrusel queda resuelta. Detalle en sección 44 del manual (Ola 5g).

> **Cierre, 23 de agosto:** el dueño confirmó las dos últimas dudas —
> solo existe una plantilla de producto (no hay "otras plantillas" a
> las que agregar el bloque), y que las reseñas se muestren de forma
> aleatoria sin filtrar por producto **no es un problema**, es
> justamente lo que resuelve el Cards Carousel. Con eso, reasignar las
> 4 reseñas huérfanas deja de ser un pendiente — el mensaje para
> soporte de Judge.me queda redactado y disponible si algún día se
> quiere retomar, sin bloquear nada. Badge de estrellas + carrusel de
> reseñas de tienda, legibles y bien ubicados, en home y ficha de
> producto. Detalle completo en la sección 44 del `MANUAL-PROYECTO.md`.

**Mantenimiento (no bloqueante):**
- Bajar `templates/product.json` vivo y anotar el ID real de los dos
  App Blocks (Review Snippets + Cards Carousel), para que un futuro
  deploy de código no los pise sin darse cuenta.

---

## ~~10. Ola 6 — punch list post-auditoría (con agentes especializados)~~ ✅ Resuelto (24 agosto 2026)

Detalle completo en la sección 45 del `MANUAL-PROYECTO.md`. Resuelto y
verificado en producción: productos agotados fuera del escaparate del
home, piso de precio de Meta subido a $500 (35 productos), umbral de
inventario honesto activado, política de envío con los montos reales,
5 correos de contacto unificados a 3 (incluyendo un bug real de correo
duplicado que apareció al unificar, corregido y verificado con
`curl`).

**Los 4 diferidos, cerrados o con siguiente paso resuelto el 24 de
agosto (Ola 7, sección 47 del manual):**
- ✅ **MSI/OXXO visibles** — código desplegado y verificado. La ficha
  y el carrito ya muestran "También en efectivo: OXXO y 7-Eleven" y,
  en productos ≥$300, "Meses sin intereses con tarjetas
  participantes".
- ✅ **Cross-sell bajo la barra de envío gratis** — código desplegado
  y verificado con carrito real: sugiere hasta 3 productos del mismo
  departamento, disponibles, con precio que cierra la brecha, en el
  cajón del carrito y en `/cart`.
- ✅ **Fichas técnicas** — cargadas por API en los **35 productos**
  del conjunto de Meta (`scripts/cargar-fichas-tecnicas.py`), las 35
  verificadas por relectura y confirmadas en vivo con `curl`. Los
  productos sin datos siguen sin mostrar nada.
- ✅ **3 combos nuevos** — creados por API
  (`scripts/crear-combos.py`) y **publicados** el 24 de agosto en los
  3 canales, verificados en vivo. Llevan una **tarea manual asociada**
  (descontar componentes al vender) — ver el recuadro al principio de
  este archivo.

**Los 3 puntos bloqueantes antes de la siguiente campaña, cerrados el
24 de agosto (detalle en la sección 46 del manual):**
- ✅ **Evento Purchase de Meta** — el dueño hizo una compra de prueba
  real (pedido #1005, $190.95 MXN, "Pagado"). El pixel sí recibió el
  evento Compra con calidad 9.3/10 (el mejor del sitio) vía píxel +
  Conversions API ("Comparte datos" ya en Máximo). El "cero compras"
  que se veía antes era por tener seleccionado el portafolio de
  negocio equivocado en Meta Business Suite, no un problema real.
  **Ningún bloqueante pendiente.**
- ✅ 5 de 9 combos agotados — el dueño ya tiene plan de reabastecerlos,
  se quedan publicados tal cual.
- ✅ MSI/OXXO — confirmado con evidencia real del checkout que sí están
  disponibles.

---

## Carta de bienvenida para cada envío — lista para imprimir (14 sep)

📄 [`materiales-impresos/carta-bienvenida-imprimible.pdf`](./materiales-impresos/carta-bienvenida-imprimible.pdf)
— dos cartas lado a lado en una hoja carta horizontal, imprimir y cortar
por la mitad (línea de corte justo a los 5.5"). También está la pieza
suelta en [`materiales-impresos/carta-bienvenida.pdf`](./materiales-impresos/carta-bienvenida.pdf).

Bienvenida a la familia Intemperie México, pide una reseña con una razón
concreta (no un genérico "califícanos 5 estrellas"), y va firmada
"E.L.C., CEO Intemperie México" con el logo real de la tienda. A
propósito **no menciona ninguna ubicación** — decisión del dueño.

**Si el texto necesita cambiar**: editar `CONTENIDO` en
[`scripts/generar-carta-bienvenida.py`](./scripts/generar-carta-bienvenida.py)
y volver a correr `python3 scripts/generar-carta-bienvenida.py` — no se
edita el PDF a mano. No usa ningún token (ni Shopify ni Meta), es
generación local pura. Instructivo completo, con cómo revisar que el PDF
no se haya desbordado a una segunda página, en
[`INSTRUCTIVO-CARTA-BIENVENIDA.md`](./INSTRUCTIVO-CARTA-BIENVENIDA.md).

**Graphify:** al ser código nuevo de verdad (no documentación ni una
llamada de API), el grafo de `scripts/` sí se movió esta vez —
**101/163/11 → 111/178/12**, verificado contando en `graph.json`.

## ⏸️ Campaña lista para relanzar — falta decidir el presupuesto (25 sep)

Todo armado y **en pausa**: conjunto de productos nuevo con los 12
productos de imágenes nuevas, creativo v5, conjunto de anuncios v4 y
anuncio v4. El v3 quedó en pausa para que no corran los dos. Títulos
"Negro" → "Gris" corregidos. Detalle e IDs en
[`MANUAL-PROYECTO.md` §65](./MANUAL-PROYECTO.md#65-la-campaña-se-prepara-para-las-imágenes-nuevas-sin-encenderla-25-sep).

**Falta, en este orden:**
0. ✅ **Inventario del 25 sep conciliado** (77 cambios, 0 errores, re-ensayo
   en 0). No tocó ningún producto del conjunto; los 12 siguen en existencia.
   ⚠️ **Dos productos del anuncio comparten su única pieza con un combo:**
   la Caña Blue Fox Power Boat (dentro del Combo Blue Fox) y la Caja Rapala
   Utility Box (dentro del Combo Corux). Si se vende uno suelto, **poner el
   combo en 0 de inmediato** — Shopify no descuenta componentes.
1. 💰 **Decisión del dueño: cuánto recargar.** Disponible hoy: $54.20.
   $225 detecta si vistas → carrito se duplica; $573 detecta un salto a
   4%; menos que eso no distingue una mejora chica del ruido.
2. ✅ Confirmar que Meta aprobó el anuncio v4 (estaba en revisión).
3. 📏 Fijar el criterio de corte **antes** de encender (§62).
4. ▶️ Encender: campaña + conjunto v4 + anuncio v4.

---

## ✅ Imágenes y videos con IA publicados en 12 productos (24 sep)

59 imágenes y 12 videos arriba en la tienda, con la imagen nueva como
principal y las originales detrás. La resistencia de los tres hilos Araty
se cargó en su ficha técnica **antes** de publicar sus imágenes.
Verificado en la tienda pública. Detalle en
[`MANUAL-PROYECTO.md` §64](./MANUAL-PROYECTO.md#64-imágenes-y-videos-con-ia-en-12-productos-y-la-resistencia-de-los-hilos-17-24-sep).

**Queda pendiente:**
- 📷 **33 fotos de teléfono** (escala, detalle, qué trae la caja) — listadas
  en `IMAGENES-CAMPANA-PENDIENTES.md` y en el `LEEME.md` de cada carpeta.
- 📊 **Medir vistas → carrito** antes y después, con el corte fijado antes
  de mirar.
- 🧵 La tabla de resistencia sirve para **las 55 referencias Araty**; hoy
  sólo 3 la tienen publicada.

---

## 🔴 Cambios de datos en vivo pendientes de visto bueno del dueño (17 sep)

Los tres salieron de auditar las fotos. **Ninguno está aplicado**: tocan
datos de producto en la tienda en vivo y esperan aprobación.

| # | Qué | Productos | Propuesta |
|---|---|---|---|
| 1 | Se titulan **"Negro"** y son **grises** (medido: 7.4% y 6.7% de píxeles realmente negros) | Simmons Venture 8x21, Bushnell PowerView 2 8x21 | Quitar "Negro" o cambiarlo por "Gris Grafito" |
| 2 | La foto anuncia un **calibre distinto** al que se vende (la del 0.70mm dice `0,25mm`) | **47 de 55** productos Hilo Araty | Una foto genérica sin etiqueta legible para toda la línea + calibre en la ficha técnica |
| 3 | Etiqueta de **código de barras** pegada en el mango, visible en el héroe | Combo Okuma Revenger $849 | Retocar (quitar la etiqueta) o volver a fotografiar |

El 1 y el 2 son los urgentes: **son los dos únicos que pueden provocar
una devolución**, y el 1 cae justo sobre los dos productos de mejor
contribución del catálogo.

---

## 📊 Productos más visitados en la campaña (16 ago – 17 sep)

Pedido del dueño para decidir a cuáles hacerles énfasis. Fuente: desglose
`breakdowns=product_id` de la Marketing API, acción `onsite_web_view_content`.
**2,475 vistas totales**; los 22 de abajo concentran el 83%.

| # | Producto | Vistas | % | ATC | Tasa | Contribución | Equilibrio | Stock |
|---|---|---|---|---|---|---|---|---|
| 1 | Combo Okuma Elite Pro 7'0" | **290** | 11.7% | 8 | 2.8% | $77.69 | 11.84x | **🔴 0** |
| 2 | Combo Okuma Revenger 8'0" | **261** | 10.5% | **12** | 4.6% | $104.66 | 8.11x | 🟡 1 |
| 3 | Combo Level Rapala Verde 6'6" | 129 | 5.2% | 2 | 1.6% | $150.58 | 6.61x | 3 |
| 4 | Combo Okuma Boundary 7'0" | 128 | 5.2% | 3 | 2.3% | $154.67 | 6.14x | 2 |
| 5 | Caña Shimano Stimula 6'0" | 122 | 4.9% | 1 | 0.8% | $167.24 | 5.08x | 🟡 1 |
| 6 | Caña Okuma Tundra Pro SP 7'0" | 117 | 4.7% | 0 | 0% | $139.11 | 7.18x | 🟡 1 |
| 7 | Combo Level Rapala Rojo 7'0" | 115 | 4.6% | 0 | 0% | $219.29 | 4.99x | 🟡 1 |
| 8 | **Carrete Shimano Sienna FG 4000** | 110 | 4.4% | 3 | 2.7% | **$366.28** | **3.49x** | 🟡 1 |
| 9 | **Hilo Araty 0.70mm 1000m** | 91 | 3.7% | 0 | 0% | **$342.86** | **2.37x** | 3 |
| 10 | Caja Rapala Utility Box Chica | 80 | 3.2% | 0 | 0% | $84.86 | 6.47x | 🟡 1 |
| 11 | **Binocular Kampak Visión Nocturna** | 72 | 2.9% | 0 | 0% | **$1,145.00** | **2.53x** | 2 |
| 12 | **Caña Shimano Sellus 5'8"** | 68 | 2.7% | 0 | 0% | **$365.97** | **3.52x** | 🟡 1 |
| 13 | Caña Blue Fox Power Boat 6'4" | 59 | 2.4% | 3 | **5.1%** | $165.28 | 3.32x | 🟡 1 |
| 14 | Monocular Konus KonuSmall-3 | 54 | 2.2% | 0 | 0% | — | — | — |
| 15 | Señuelo Rapala Floating Magnum 09 | 50 | 2.0% | 1 | 2.0% | — | — | — |
| 16-22 | Corux, Blue Fox combo, Lobo 20x50, Araty 0.45… | 37-48 c/u | | | | | | |

> ⚠️ **Una limitación de esta tabla:** la columna de compras del desglose
> por producto marca 0 en todas las filas, aunque la campaña sí tuvo una
> venta. La atribución de compra no baja al nivel de producto en esta
> cuenta. **Las vistas y los ATC sí son fiables; las compras por producto
> no.** Por eso se rankea por vistas y se mira el ATC como señal.

### Tres cosas que salieron al cruzar las visitas con el inventario

**🔴 1. El producto más visitado de toda la campaña está agotado.**
El Combo Okuma Elite Pro se llevó **290 vistas, 384 clics y $201.73**, con
**8 agregados al carrito** —el segundo mejor del catálogo—. Su inventario
está en **0** desde el 4 de septiembre, con política `deny` (no vende sin
existencia).

> ✅ **La buena noticia, verificada:** el filtro `availability: in stock`
> del conjunto de productos hizo su trabajo. Después del 4-sep solo se
> gastaron **$12.79** antes de que dejara de mostrarse. No fue un desastre
> de gasto — pero **la campaña perdió su mejor producto hace dos semanas y
> siguió sin él.**
>
> **Reabastecerlo es probablemente la decisión de inventario con mejor
> retorno que hay ahora mismo:** demanda ya demostrada con dinero real, sin
> tener que adivinar.

**🟡 2. Trece de los 22 más vistos están en la última pieza.**
No se puede escalar una campaña sobre inventario de una unidad: se agota
con la primera venta y se repite lo del Elite Pro. **Antes de recargar
presupuesto hay que decidir de qué productos habrá fondo.**

**🔴 3. La zona muerta de precios que crea el piso de $799.**

> ❌ **Corrección de un error propio, 17 sep.** La primera versión de esta
> sección decía que la Caña Blue Fox de $549 *"pierde $23.72 en cada
> venta"* y que *"por debajo de ~$800 una caña no puede pagar su propio
> envío"*. **Las dos afirmaciones eran falsas, y por la misma causa:** se
> le cargó el costo de envío a productos que están **por debajo** del piso
> de $799, donde el envío **lo paga el cliente**, no la tienda. Lo detectó
> el dueño.
>
> Verificado contra la tienda en vivo (`/cart/shipping_rates.json` con un
> carrito de $549): **$189 fijos a Quintana Roo, Morelos y Nuevo León por
> igual**, y $0 arriba de $799.

El modelo correcto:

| Régimen | Qué pasa | Costo neto de envío para la tienda |
|---|---|---|
| Precio **≥ $799** | envío gratis | **−$189** (−$237.83 si es voluminoso, por la caja) |
| Precio **< $799** | el cliente paga $189 | **$0** (−$48.83 si es voluminoso) |

Con eso, la Blue Fox de $549 deja **+$165.28** y equilibrio **3.32x** —
mejor que casi todos los combos. **Las cañas baratas no eran el problema:
eran de lo mejor de la tabla.**

**Lo que sí es un problema es el otro lado del piso.** Cruzar los $799
cuesta exactamente **$189 de contribución**, así que un producto sólo
conviene arriba del piso si vale **$799 + $189 = $988 o más**. Entre
**$799 y $987 hay una zona muerta**: ahí un producto gana *menos* que si
costara $798.

Cuatro productos con existencia están hoy en esa zona:

| Producto | Precio | Contribución hoy | Si costara $798 | Diferencia |
|---|---|---|---|---|
| **Hilo Araty 0.70mm 1000m** | $812 | $342.86 | **$517.86** | **+$175.00** |
| **Caña Shimano Stimula 6'0"** | $849 | $167.24 | **$305.24** | **+$138.00** |
| **Combo Okuma Revenger 8'0"** | $849 | $104.66 | **$242.66** | **+$138.00** |
| Combo Okuma Boundary 7'0" | $949 | $154.67 | $192.67 | +$38.00 |

El Hilo Araty está **$13 arriba del piso** y eso le cuesta $175 por unidad.

> ⚠️ **No es una recomendación de bajar precios sin más.** A $798 el
> cliente paga $987 en total ($798 + $189 de envío), más que los $812 de
> hoy — así que la conversión podría caer y eso no está medido. Lo que sí
> está medido es que **el piso de $799 está mal colocado respecto a estos
> precios**, y hay tres salidas: subir esos productos por encima de $988,
> bajarlos por debajo de $799, o mover el piso. **Decisión del dueño.**

> ✅ **Esto no cambia el análisis de §60.** Ahí todos los productos
> comparados (Simmons $1,290, Bushnell $1,450, Gamo $1,970, Kampak $2,900
> y el Revenger $849) están **arriba** del piso, donde la tienda sí
> absorbe el envío. Ese cálculo siempre fue correcto.

### A cuáles hacerles énfasis, entonces

Cruzando demanda demostrada con contribución real:

| Prioridad | Producto | Por qué |
|---|---|---|
| 1 | **Combo Okuma Elite Pro** | #1 en vistas y 8 ATC. **Primero reabastecer**, luego fotos |
| 2 | **Carrete Shimano Sienna FG 4000** | #8 en vistas con **3.49x** — la mejor mezcla de demanda y margen |
| 3 | **Hilo Araty 0.70mm** | #9 en vistas, **2.37x**, y consumible (recompra) |
| 4 | **Caña Shimano Sellus 5'8"** | **3.52x**, y ya tiene 3 fotos |
| 5 | **Binocular Kampak** | #11 en vistas pese a recibir casi nada de gasto; **$1,145** de contribución |
| 6 | Combo Okuma Revenger | #2 en vistas y **12 ATC**, el mejor del catálogo. Margen delgado, pero demanda probada |

Los tres primeros de **IMAGENES-CAMPANA-PENDIENTES.md** (Simmons, Bushnell,
Gamo) **no aparecen en el top 22 de vistas** — pero es porque casi no
recibieron gasto (§60: toda la óptica junta se llevó el 11%). No es falta
de demanda, es falta de oportunidad. El Kampak, con $44 de gasto, alcanzó
el puesto 11.

---

## 🆕 Mejorar las fichas antes de la siguiente campaña — imágenes y video (17 sep)

Idea del dueño, y va en la dirección correcta: **arreglar las fichas
antes de volver a pagar tráfico.** Seguir mandando gente a páginas que no
convencen es exactamente lo que se hizo las dos rondas anteriores. Plan
propuesto: generar imágenes con ChatGPT partiendo de las que ya están en
la página, y si quedan bien, animarlas con Higgsfield para la ficha y
eventualmente para los anuncios.

### El dato que hay que tener en la cabeza antes de empezar

Se auditó el catálogo completo el 17 de septiembre:

| Imágenes por producto | Productos |
|---|---|
| **1** | **245** |
| 2 | 3 |
| 3 | 2 |

**245 de 250 productos tienen exactamente una imagen.** El problema
principal no es que la foto sea fea — es que hay *una sola*, de catálogo,
sobre fondo blanco. Un comprador que llega a la ficha no tiene con qué
decidir: no ve la escala, ni el detalle, ni qué trae la caja, ni el
producto en uso.

**Ir de 1 a 4-5 imágenes en los productos prioritarios pesa más que
hacer más bonita esa única imagen.** La resolución, de hecho, casi
siempre alcanza (1024-2048px); las excepciones a corregir son el
Binocular Kampak (640×640) y el Simmons Venture (850×850).

### ⚠️ Qué NO hacer, y por qué

**No regenerar el producto con IA.** Son productos de marca —Okuma,
Shimano, Rapala, Bushnell, Simmons, Gamo, Konus— y la IA se equivoca en
los detalles: número de guías de una caña, la perilla del freno de un
carrete, los logotipos, las marcas de modelo. El público es hombres de
45-65 que pescan: **esa gente nota esos detalles.** Además:

- **Riesgo legal y comercial:** una imagen que no corresponde a lo que se
  envía es publicidad engañosa (PROFECO) y causal de rechazo de anuncios
  en Meta. Con márgenes tan delgados (§59), una tanda de devoluciones se
  come el año.
- **Riesgo de marca:** la carta que va en cada envío dice *"revisamos
  cada pieza con nuestras propias manos"* (§ carta de bienvenida). Fotos
  inventadas contradicen justo eso.

### ✅ La versión segura de la misma idea

1. **IA para la escena, no para el producto.** Recortar el producto
   **real** y componerlo sobre un fondo generado: el río, la lancha, el
   campo. Los píxeles del producto son los verdaderos; lo generado es el
   entorno. Esto es estándar y no engaña a nadie.
2. **IA para normalizar.** Fondo, luz y encuadre consistentes en los 250
   productos, que hoy se ven disparejos entre sí.
3. **Fotos reales para lo que la IA no puede inventar:** escala (el
   producto en la mano), detalle de cerca, y qué trae la caja. El dueño
   tiene 1-3 piezas de cada cosa — con un teléfono y luz de ventana
   alcanza.
4. **Antes que todo lo anterior: las bibliotecas de los fabricantes.**
   Okuma, Shimano, Rapala y Bushnell dan imágenes oficiales a sus
   distribuidores. Son gratis, son exactas y están permitidas. Es el
   primer lugar donde buscar, no el último.

### Video (Higgsfield)

Razonable, **después de las fotos y empezando por los 4-6 productos que
van a cargar la campaña**. Movimiento sutil sobre una foto real es de
bajo riesgo. Dos advertencias: en la ficha hay que cuidar el peso de
página (afecta Core Web Vitals) y en Meta el video suele rendir mejor que
el estático, así que ahí es donde más conviene probarlo.

### 🔴 Qué productos priorizar — ojo aquí

La tentación es partir de *"los que estamos recomendando en las campañas
de Facebook"*. **Cuidado: esos son justo los que hay que dejar de
empujar.** El gasto de la ronda que acaba de cerrar se fue a combos de
caña, y §60 mostró que esos necesitan un ROAS de equilibrio de 12x
mientras que la óptica de buen margen necesita 1.81x-1.86x.

Si se fotografía según la campaña pasada, se invierte el esfuerzo en los
productos de peor contribución. **La lista debe salir del plan nuevo, no
del viejo.**

| Prioridad | Producto | Imgs hoy | Por qué |
|---|---|---|---|
| 1 | Binocular Simmons Venture 8x21 ($1,290) | 1 (850px) | Equilibrio 1.81x, el mejor del catálogo |
| 2 | Binocular Bushnell PowerView 2 8x21 ($1,450) | 1 (2048px) | Equilibrio 1.86x |
| 3 | Binocular Gamo 8x40 AF ($1,970) | 1 (1600px) | Equilibrio 2.45x |
| 4 | Binocular Kampak Visión Nocturna ($2,900) | 1 (640px) | Equilibrio 2.61x; **resolución a corregir** |
| 5 | Combo Okuma Revenger $849 | 1 (1024px) | Único con venta real comprobada — vale la pena aunque su margen sea delgado |

### Qué puedo hacer yo y qué toca al dueño

**Del dueño:** ChatGPT y Higgsfield no los alcanzo desde este entorno, y
las fotos reales de escala y detalle solo las puede tomar quien tiene las
piezas en la mano.

**De este lado: ✅ hecho el 17 de septiembre.** Ver
[`IMAGENES-CAMPANA-PENDIENTES.md`](./IMAGENES-CAMPANA-PENDIENTES.md) —
**versión definitiva: 12 productos, 45 tomas**, elegidos cruzando demanda
medida, contribución real (ya con el régimen correcto del piso de $799) y
existencias. Trae especificaciones exactas, prompts redactados y
`scripts/cargar-imagenes-productos.py` para subirlas en lote.
**Le toca al dueño generar las imágenes.**

> 📌 **El hallazgo que salió al armar la lista: de todo el catálogo, sólo
> 5 productos combinan buena economía (equilibrio ≤ 3.5x) con más de una
> pieza en existencia** — los tres Hilo Araty (0.45 multicolor, 0.45 verde
> y 0.70 natural), el Binocular Kampak y la Caña Okuma Revenger de $549.
> Ese es el techo real de la campaña siguiente, y ninguna foto lo arregla:
> **hay que reabastecer.**

> 🔴 **Y salieron cuatro defectos al mirar las fotos actuales, que hay que
> arreglar aunque no se genere ni una imagen nueva:** el Simmons y el
> Bushnell se llaman **"Negro"** y son **grises** (medido: 7% de píxeles
> realmente negros) —y son justo los dos de mejor contribución—; el héroe
> del Combo Revenger tiene una **etiqueta de código de barras pegada en el
> mango**; el Kampak está a **640×640**, por debajo de lo que Shopify
> necesita para el zoom; y la foto del **Hilo Araty 0.70mm muestra una
> etiqueta que dice `0,25mm`** — con **47 de 55 productos Araty
> compartiendo foto**, casi toda la línea anuncia un calibre que no es el
> suyo, y el calibre es *la* especificación de un hilo.

> 📌 **Ampliado el 17 de septiembre a 8 productos (38 tomas), por decisión
> del dueño: sostener las cañas mientras se escala.** Al rehacer las
> cuentas con guía típica de $189 en vez de los $223 de Quintana Roo salió
> algo que la tabla anterior escondía: **el problema no era "cañas contra
> óptica", era el ticket.** La Caña Shimano Sellus ($1,290) llega a
> **3.52x** pagando su caja, y el Carrete Sienna a **3.49x**, contra 8.11x
> del Combo Revenger. Entra pesca de ticket alto —Sellus, Sienna e Hilo
> Araty 0.70mm (2.37x, y además consumible)—, no la que recibió el gasto
> de la campaña pasada.

---

## ~~Títulos encimados en la cuadrícula de colección (móvil)~~ ✅ Resuelto (15 sep)

El dueño lo vio en su teléfono en `/collections/combos`: los títulos de
dos tarjetas vecinas escritos uno encima del otro y un precio saliéndose
de la pantalla. Confirmado arreglado por él mismo el mismo día.

**La causa no estaba donde se veía.** Fallaban exactamente las dos
tarjetas con precio rebajado y ninguna de las otras cuatro: un
`white-space: nowrap` estaba puesto sobre `.price` y `.price__container`
—que son *contenedores*— y en un producto rebajado eso fusiona los dos
precios en una cadena indivisible de 293px dentro de una columna de
178px. El título heredaba ese ancho y envolvía mal. Detalle completo en
[`MANUAL-PROYECTO.md` §61](./MANUAL-PROYECTO.md#61-los-títulos-encimados-de-la-cuadrícula-el-síntoma-estaba-en-el-título-la-causa-en-el-precio-15-sep).

> 🧠 **Regla que queda para el tema:** `white-space: nowrap` va en las
> hojas (`.price-item` = un precio), nunca en los contenedores. En una
> rama no protege un precio — fusiona todos los que haya adentro.

> 🧰 **Herramienta nueva que se puede correr cuando quieras**, sin token
> y sin tocar nada:
> ```bash
> python3 scripts/prueba-tarjetas-coleccion.py
> python3 scripts/prueba-tarjetas-coleccion.py --coleccion binoculares
> ```
> Mide con un navegador real y avisa si alguna tarjeta se sale de su
> columna. Conviene correrla después de cualquier cambio de CSS que toque
> tarjetas, precios o tipografía.

---

## Datos de contacto ya integrados

Por si se necesitan para otros usos:

- **WhatsApp:** +52 777 327 7340
- **Correo:** ventas@intemperiemexico.com

Nota: por decisión explícita, el footer **no menciona la ciudad de origen de los
envíos** (Cuernavaca, Morelos) — solo dice "Envíos a todo México", para no exponer
la ubicación del negocio.

**Actualización (14 agosto 2026):** Shopify exige calle, código postal y
ciudad como obligatorios en Configuración → General → "Dirección de la
tienda" (el campo visible para clientes, distinto de la entidad legal
para impuestos) — no se puede dejar vacío. Se quitó la calle y número de
casa real (domicilio personal del dueño) y se dejó solo "S/N, 62120
Cuernavaca Morelos, México". Esto sí expone la ciudad/CP en ese campo
puntual — trade-off aceptado explícitamente por el cliente para no
mostrar el domicilio exacto, aunque no es 100% consistente con la
decisión de arriba de ocultar la ciudad en el footer. Detalle completo
en la sección 31 del `MANUAL-PROYECTO.md`.
