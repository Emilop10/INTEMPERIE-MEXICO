# Análisis estratégico — qué hacer para que la tienda venda con ganancia

**30 de septiembre de 2026**, con la campaña ya pausada. Revisé todo el
historial (4 rondas, $2,096.82 en anuncios, 2,841 vistas de producto,
39 carritos, 1 venta). Además saqué datos nuevos de Meta, desglosados
por producto, edad, ubicación y dispositivo en las dos últimas rondas.
Crucé esos datos con el costo real de los 383 productos activos en
Shopify, revisé las fichas en un celular de verdad y comparé precios
contra Mercado Libre.

---

## Resumen en una página

**1. Lo que la gente compra son combos (caña + carrete), no piezas
sueltas.** De esto ya hay evidencia estadística:

| | Vistas | Carritos | Tasa | IC 95% |
|---|---|---|---|---|
| **Combos** (ronda 10-17 sep) | 422 | 15 | **3.6%** | 2.2%–5.8% |
| **Productos sueltos** (dos rondas juntas) | 666 | 5 | **0.75%** | 0.3%–1.8% |

Prueba exacta de Fisher: **p = 0.002**. Es una diferencia de casi 5 a 1.

**2. Las imágenes nuevas no fueron la causa de la caída.** La ronda del
25 sep sacó todos los combos del conjunto de productos. Si se comparan
sueltos contra sueltos, la ronda con fotos viejas dio 3/300 (1.0%) y la
de fotos nuevas 2/366 (0.55%). La diferencia no es significativa
(p = 0.66). **El corte de $225 salió mal porque cambió la mezcla de
productos, no por las imágenes.** Este desglose lo hice después de ver
el resultado, así que tómalo como explicación muy probable, no como
prueba de un experimento. Aun así, "combo contra suelto" es una
división natural del catálogo y no una que yo haya buscado a modo.

**3. El problema de fondo es económico, y ninguna foto lo arregla.**

- De los 347 productos con existencia, la mitad deja **$69 o menos**
  por venta (contribución, ya descontado el envío).
- Un comprador traído por Meta hoy cuesta mucho más que eso.
- Solo 35 productos dejan $300 o más, y **la mayoría son rifles,
  pistolas y miras, que Meta no permite anunciar** (§30, §37).

Por eso hay que **armar la oferta** para que cada venta deje lo
suficiente. Ajustar la campaña no alcanza.

**El plan:** armar "kits listos para pescar" de $1,199 o más. Cada kit
lleva caña, carrete e hilo, más relleno sacado de las 2,000+ piezas de
baja rotación: plomos, destorcedores, anzuelos y señuelos. También hay
que corregir cuatro fricciones de la ficha y del carrito, abrir los
canales gratuitos (Google y, quizá, Mercado Libre) y volver a Meta solo
con kits y óptica, a hombres de 55 años en adelante, con un criterio
fijado antes de encender.

---

## 1. El embudo completo, toda la historia

| | 16 ago – 17 sep | 25-30 sep | **Total** |
|---|---|---|---|
| Gasto | $1,847.97 | $248.85 | **$2,096.82** |
| Vistas de producto | 2,475 | 366 | **2,841** |
| Carritos | 37 | 2 | **39** (1.4%) |
| Inicios de pago | 18 | 0 | **18** (46% de los carritos) |
| Pantallas de pago | 7 | 0 | **7** (39% de los inicios) |
| Ventas | 1 | 0 | **1** ($849) |

**Traer gente es barato:** cada vista de producto cuesta **$0.68–0.73**,
el CTR va de 6.5% a 8.8% y el 87% de los clics carga la página. **Ahí no
está el problema.** Todo se pierde después del clic, en dos lugares:

1. **Vista → carrito** (1.4%). Depende del *tipo de producto*: combos
   3.6%, sueltos 0.75%.
2. **Carrito → venta** (1 de 39, 2.6%). En tiendas sanas este paso anda
   entre 20% y 30%. Con n tan chico el intervalo es enorme, pero de 7
   personas que llegaron a la pantalla de pago solo 1 pagó.

### La cuenta que decide si un producto se puede anunciar

Sea cual sea el producto, el costo por venta sale así:

> **costo por venta = $0.70 ÷ (vista→carrito × carrito→venta)**

| Escenario | Vista→carrito | Carrito→venta | **Costo por venta** |
|---|---|---|---|
| Hoy, producto suelto | 0.75% | 2.6% | **~$3,600** |
| Hoy, combo | 3.6% | 2.6% | **~$750** |
| Combo con el pago arreglado | 3.6% | 10% | **~$195** |
| Combo con el pago arreglado | 3.6% | 20% | **~$97** |

**Conclusión: solo se debe pagar publicidad para productos que dejen
$300 o más por venta, y además hay que subir el carrito→venta al menos
a 10%.** Con menos margen, cada venta anunciada pierde dinero aunque
todo lo demás salga bien.

---

## 2. Hallazgos, uno por uno

### A. Los combos venden; los sueltos casi no (p = 0.002)

Carritos de la ronda del 10-17 sep, la última que tuvo combos:

| Producto | Vistas | Carritos |
|---|---|---|
| Combo Okuma Revenger 8'0" (2.45m) | 190 | **11** (5.8%) |
| Combo Okuma Boundary 7'0" | 73 | 2 |
| Combo Level Rapala Verde 6'6" | 62 | 2 |
| Carrete Shimano Sienna FG 4000 | 65 | 3 |
| Todos los demás sueltos | ~235 | 0 |

La explicación es de sentido común. Un señor de 55 años que va a salir
a pescar quiere **resolver todo en una sola compra**. No va a armar el
equipo pieza por pieza en una tienda que no conoce. El combo le
resuelve eso.

**El problema es que los combos, como están hoy, dejan muy poco:**

| Combo | Precio | Contribución | Stock |
|---|---|---|---|
| Okuma Revenger 8'0" (2.45m) | $849 | $105 | 1 |
| Okuma Elite Pro 7'0" | $920 | $78 | **0** |
| Okuma Boundary 7'0" | $949 | $155 | 2 |
| Okuma Revenger 8'0" (2.40m, armado) | $999 | $95 | 1 |
| Blue Fox Power Boat (armado) | $1,049 | $121 | 1 |
| Level Rapala Verde | $995 | $151 | 3 |
| Level Rapala Rojo | $1,095 | $219 | 1 |
| Rapala Corux (armado, con caja) | $1,499 | $232 | 1 |
| Okuma Cascade II 6'0" | $695 | **$314** | **0** |
| Okuma Steeler XP 6'0" | $675 | **$294** | **0** |

Hay dos cosas que llaman la atención:

- **Los que más venden caen en la "zona muerta" de $799 a $987.** Ahí la
  tienda regala el envío ($189 más la caja de $48.83) y la ganancia se
  va.
- **Los combos de menos de $799 (Cascade, Steeler) son los que más
  dejan**, porque el envío lo paga el cliente. Pero están agotados, así
  que no hay datos de cómo convierten.

### B. Hay inventario de sobra para armar kits

| Tipo | Piezas en existencia | Precio mediano |
|---|---|---|
| Destorcedores | 807 | $10 |
| Plomos y lastres | 510 | $6.60 |
| Anzuelos | 200 | $65 |
| Hilos (carretes chicos) | 200 | $59 |
| Flotadores | 100 | $37 |
| Señuelos | 99 | $113 |

Son más de 2,000 piezas que casi no se venden solas y que cuestan poco.
**Metidas en un kit, suben mucho lo que el cliente percibe que recibe y
casi nada el costo.** Además sacan inventario parado. Es la palanca más
grande que tiene la tienda.

### C. La edad: 45-54 casi no compra

| Edad | Vistas | Carritos | Tasa |
|---|---|---|---|
| 45-54 | 269 | 1 | 0.4% |
| 55-64 | 425 | 12 | 2.8% |
| 65+ | 394 | 7 | 1.8% |

55 años o más contra 45-54: p = 0.04. Este corte también es posterior al
dato, así que tómalo como señal fuerte y no como prueba. Aun así,
**45-54 se llevó el 28% del gasto y dio 1 carrito en dos rondas.**
Quitarlo es un cambio barato y con buen fundamento.

Otros datos del mismo desglose:

- El 99% del tráfico llega **desde la app de Facebook** (su navegador
  interno).
- Todo salió en Facebook (feed y un poco de Marketplace); Instagram
  no entregó.

Ninguno de los dos pide cambios, pero el primero explica en parte el
carrito→venta bajo (ver E).

### D. Precios contra Mercado Libre

Este público compara precios, y Mercado Libre está a un clic. Lo que
pude verificar (Mercado Libre bloquea las consultas automáticas, así que
es parcial):

| Producto | Nosotros | Mercado Libre |
|---|---|---|
| Carrete Shimano Sienna FG 4000 | $1,279 | **$1,117–1,295**, envío gratis y hasta 24 meses |
| Binocular Simmons Venture 8x21 | $1,290 | **$950–1,320**, envío gratis y meses sin intereses |
| Hilo Araty 1000m | $436 (0.45mm) **+ $189 de envío = $625** | 0.30mm a **$379 con envío gratis**; 0.40mm desde **$170** |

**En los productos sueltos no somos más baratos, y en el hilo estamos
muy por encima una vez que se suma el envío.** Eso explica bien las 0 de
71 vistas del hilo multicolor. En un combo o kit armado por nosotros la
comparación directa no existe, y **esa es otra razón a favor de los
kits.**

> ❓ En la búsqueda salió un vendedor **"intemperie.mx"** en Mercado
> Libre vendiendo el Simmons Venture a $1,319.54. **¿Es tuyo?** Si lo
> es, parte de la gente que ve el anuncio podría estar comprando allá,
> y esa venta no aparece en el pixel.

### E. El paso de pago pierde a casi todos

De 18 inicios de pago, 7 llegaron a la pantalla de pago y 1 pagó. Lo
que ya se descartó (§62): el checkout funciona de punta a punta, y hay
PayPal, Mercado Pago, tarjetas, OXXO y meses sin intereses.

Lo que falta revisar:

- **El 99% llega desde el navegador interno de Facebook**, donde la
  gente no tiene sesión iniciada en Mercado Pago ni en PayPal y no se
  autocompletan los datos de la tarjeta. Es la fricción clásica de este
  canal.
- **La recuperación de carritos abandonados** (el correo automático de
  Shopify). No lo puedo leer porque el token no tiene `read_orders`
  (§58). **Revísalo en Configuración → Notificaciones.**
- **Cerrar la venta por WhatsApp.** Ya existe el botón, pero no se le
  ofrece a quien abandona el pago. A este público le da más confianza
  cerrar hablando con una persona.

### F. La ficha del producto: cuatro fricciones concretas

Revisada en un iPhone simulado, con la ventana del navegador de
Facebook:

1. **Junto al precio dice "Los gastos de envío se calculan en la
   pantalla de pago"** (texto por defecto de Shopify). El aviso claro,
   "Envío gratis desde $799, pedidos menores $189", está **unos 1,500px
   más abajo**. En un producto de $436, el cliente no sabe que pagará
   $625 hasta el checkout. **Es la corrección más barata y de más
   impacto.** Es una línea en `tema-shopify/locales/es.json`
   (`shipping_policy_html`).
2. **El botón "Agregar al carrito" queda fuera de la pantalla** (entre
   1,080 y 1,200px, en una pantalla de 844px). Falta un botón fijo
   abajo, que siga visible al bajar.
3. **Las burbujas de WhatsApp y de Cartucho tapan** justo la línea de
   "Últimas existencias: quedan 1" y parte del texto.
4. **Errores de confianza en el hilo Araty:** el héroe generado con IA
   dice **"Araly"** en la etiqueta (la marca mal escrita), y arriba del
   título aparece la marca **"GIMBEL"** en vez de Araty. Un pescador lo
   nota. Hay que revisar a ojo todas las imágenes de IA que traen texto.

---

## 3. Qué NO hacer

- **No volver a encender Meta con productos sueltos de bajo margen.**
  Aunque la ficha mejore al doble, cada venta sigue perdiendo dinero
  (ver la cuenta de la sección 1).
- **No gastar en un anuncio de video por ahora.** El anuncio ya atrae;
  el freno está después del clic.
- **No reabastecer combos para venderlos al mismo precio.** Primero hay
  que fijarles precio y contenido (sección 4, fase 1).
- **No cambiar varias cosas a la vez en la próxima ronda** sin un grupo
  de comparación. Es lo que dejó el corte de $225 sin poder explicarse.

---

## 4. El plan, por fases

### Fase 0 — Esta semana, sin gastar en anuncios

| # | Qué | Quién | Esfuerzo |
|---|---|---|---|
| 0.1 | Cambiar el texto junto al precio por el costo real: "+ $189 de envío · Gratis desde $799" (y "Envío gratis" cuando aplique) | Yo | 1 h |
| 0.2 | Botón de compra fijo abajo en celular | Yo | 2-3 h |
| 0.3 | Mover las burbujas de WhatsApp y Cartucho para que no tapen el contenido | Yo | 1 h |
| 0.4 | Corregir la marca "GIMBEL" a "Araty" en la línea de hilos y quitar o reemplazar el héroe que dice "Araly" | Yo, con visto bueno del dueño | 1 h |
| 0.5 | Revisar a ojo el texto de las 59 imágenes de IA | Dueño | 30 min |
| 0.6 | Confirmar que el correo de carrito abandonado está activo, y agregar un mensaje de WhatsApp | Dueño (admin) | 15 min |
| 0.7 | Comparar en Mercado Libre el precio de los 12 productos de la campaña | Dueño | 30 min |

### Fase 1 — Armar la oferta: kits con ganancia (1-2 semanas)

Crear **3 o 4 kits "listos para pescar"** con estas reglas:

- **Precio de $1,199 o más**, lejos de la zona muerta.
- **Contribución de $300 o más** después de envío y caja.
- Base de caña + carrete + hilo (bajo pedido, con los que tengan fondo
  de inventario), **más relleno de baja rotación**: plomos, destorcedores,
  anzuelos, 1 o 2 señuelos y una caja.
- **Una foto real del kit completo extendido sobre una mesa.** Es la
  imagen que más vende un kit, y la IA no la puede hacer con precisión.
- **Al menos 3 piezas de cada kit.** Con 1 pieza se repite lo del Elite
  Pro: se agota y la campaña pierde su mejor producto.

Ejemplo de la cuenta, con el Revenger (costos reales):

| | |
|---|---|
| Caña + carrete Revenger | $665.82 |
| Relleno: hilo, 10 plomos, 10 destorcedores, 20 anzuelos, 2 señuelos, caja chica | ~$200 (costo) |
| Envío + caja | $237.83 |
| **Costo total** | **~$1,104** |
| Precio del kit | **$1,449** |
| **Contribución** | **~$345** |

*(El costo del relleno es una estimación: hay que tomarlo del costo real
de cada pieza al armarlo; `econ.json` ya los tiene.)*

**Reabastecer:** el Combo Elite Pro (el más visto de toda la historia) y
el Revenger, pero **para convertirlos en kits**, no para venderlos solos
a $849-920.

Probar también **un combo de menos de $799** (tipo Cascade o Steeler).
Ahí el envío lo paga el cliente y la contribución es de ~$300. Es la
otra forma de salir de la zona muerta, y hoy no hay datos de cómo vende.

### Fase 2 — Canales gratis o baratos (en paralelo)

- **Google (listados gratuitos de Shopping):** gente que busca
  exactamente "Shimano Sienna 4000" tiene intención de compra y no cuesta
  nada. Se conecta con el canal de Google en Shopify y Merchant Center.
  **Ojo con los rifles y pistolas, que tienen reglas propias en Google.**
- **Mercado Libre:** si "intemperie.mx" es tuyo, es probablemente el
  canal más fuerte para piezas sueltas con este público, y ahí sí se
  pueden vender algunos productos de aire (hay que revisar las reglas de
  cada categoría). **Si no es tuyo, conviene saber quién es.**
- **Rifles, pistolas y miras** (la mayoría de los 35 productos que dejan
  $300 o más) **no se pueden anunciar en Meta.** Su canal es el
  buscador, Mercado Libre y el trato directo por WhatsApp.

### Fase 3 — Volver a Meta, con reglas

Solo cuando las fases 0 y 1 estén listas:

| | |
|---|---|
| Productos | **Solo kits y óptica con contribución de $300 o más** (Kampak, Gamo, Bushnell, Simmons, Konus) y carrete o caña Shimano de ticket alto |
| Edad | **55+** (quitar 45-54) |
| Un solo cambio medible | Kits contra lo ya medido: combos al 3.6% de vista→carrito |
| Retargeting chico | Quienes vieron un producto en los últimos 30 días, con el mismo catálogo, $10-15/día (el público será de cientos de personas, no de miles) |
| Criterio fijado antes de encender | Vista→carrito ≥ 3% **y** al menos 1 venta cada $600 gastados; si a los $600 no hay venta, pausar |

---

## 5. Lo que necesito de ti

1. **¿El vendedor "intemperie.mx" de Mercado Libre es tuyo?**
2. **¿Se pueden reabastecer los combos Okuma** (Elite Pro, Revenger,
   Cascade, Steeler), a qué costo y en cuánto tiempo?
3. **¿Te late la idea de los kits?** Si sí, te armo las 3-4 propuestas
   con costo real pieza por pieza y precio sugerido.
4. **¿Arranco ya con la fase 0** (puntos 0.1 a 0.4)? Son cambios del
   tema, reversibles, y no necesitan campaña.

---

**Fuentes de precios de Mercado Libre** (consultadas el 30 sep 2026,
parciales):
[Reel Shimano Sienna FG SN4000FG](https://www.mercadolibre.com.mx/reel-frontal-shimano-sienna-fg-sn4000fg-derechoizquierdo-color-negro/p/MLM15800548) ·
[listado Shimano Sienna 4000](https://listado.mercadolibre.com.mx/shimano-sienna-4000) ·
[listado Simmons 8x21](https://listado.mercadolibre.com.mx/binoculares-simmons-8x21) ·
[intemperie.mx – Simmons Venture 8x21](https://www.intemperie.mx/MLM-687810189-binoculares-simmons-venture-8x21-compactos-y-contra-agua--_JM) ·
[Araty 0.40mm x 1000m](https://articulo.mercadolibre.com.mx/MLM-677748496-hilo-araty-monofilamento-040mm-x-1000mts-_JM) ·
[Araty Superflex 0.30mm 1000m](https://www.deportesgamboa.com/MLM-636920837-hilo-para-pesca-araty-superflex-030mm-1000m-envio-gratis-_JM)
