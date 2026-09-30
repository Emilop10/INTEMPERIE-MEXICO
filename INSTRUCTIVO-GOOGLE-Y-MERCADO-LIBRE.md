# Instructivo — Google Shopping gratis y Mercado Libre

Fase 2 del plan del 30 de septiembre
([`ANALISIS-ESTRATEGICO-30-SEP.md`](./ANALISIS-ESTRATEGICO-30-SEP.md),
MANUAL §69). Son canales donde la gente **ya está buscando el producto**
y que no cuestan publicidad. Los dos necesitan que el dueño entre con su
cuenta: desde aquí no se pueden dar de alta.

---

## 1. Google — listados gratuitos de Shopping (~30 min)

Qué se gana: cuando alguien busca "Shimano Sienna 4000" o "binoculares
Bushnell 8x21" en Google, el producto sale en la pestaña **Shopping** y
en los resultados, con foto y precio, **sin pagar por clic**.

### Lo que ya está listo (verificado el 30 sep)

| Requisito | Estado |
|---|---|
| Página de producto con datos estructurados (`Product`, `Offer`, `Brand`) | ✅ |
| `sitemap.xml` y `robots.txt` | ✅ (sitio dado de alta en Search Console desde el 9 ago, §27) |
| Imagen y descripción en los 383 productos activos | ✅ 383/383 |
| Marca (`vendor`) en cada producto | ✅ (los 55 hilos Araty corregidos de "Gimbel" a "Araty" el 30 sep) |
| Políticas de envío, devoluciones y privacidad publicadas | ✅ (§10, §11) |

### Pasos (los hace el dueño en el admin de Shopify)

1. **Shopify admin → Configuración → Apps y canales de venta → Shopify
   App Store** → buscar e instalar **"Google & YouTube"** (es de Google,
   gratis).
2. Conectar con la cuenta de Google del negocio
   (`contacto@intemperiemexico.com` o la que administre Search Console).
3. Cuando lo pida, **crear la cuenta de Merchant Center** desde la misma
   app. País: México. Moneda: MXN.
4. **Envío** (lo pide la app): tarifa fija de **$189 MXN**, y **gratis
   en pedidos desde $799 MXN**. Tiempo de entrega: **2 a 7 días
   hábiles**. Tiene que coincidir con la tienda, o Google rechaza los
   productos.
5. **Impuestos:** incluidos en el precio.
6. Dejar activados los **"listados gratuitos"**. **No** activar
   campañas pagadas (Performance Max) por ahora.
7. Avisarme cuando esté instalado.

### ⚠️ Productos que NO deben ir a Google (63 productos)

Google no acepta en Shopping **armas (incluidas las de aire),
municiones, ni accesorios para armas**. En la tienda eso incluye:
Rifles de Aire (8), Pistolas de Aire (10), Diábolos y Municiones (31),
Miras Telescópicas (8) y Accesorios (6: monturas y linterna táctica).

Si se mandan, Merchant Center los rechaza y, si son muchos, **puede
suspender la cuenta entera**. Cuando la app esté instalada, **yo los saco
del canal de Google** por API. Eso necesita el permiso
`write_publications` en el token (ver
[`INSTRUCTIVO-CREDENCIALES-SHOPIFY.md`](./INSTRUCTIVO-CREDENCIALES-SHOPIFY.md)).
También se puede hacer a mano: en cada producto, "Canales de venta" →
quitar "Google & YouTube".

### ⚠️ El aviso de "GTIN no válido" es esperado, no es un error

El campo **código de barras** de Shopify guarda el **código B1 del punto
de venta**, no el código de barras del fabricante (solo 18 de 383 tienen
formato de GTIN). **No se debe borrar:** la conciliación de inventario
depende de él (`scripts/conciliar-inventario.py`, §28).

Google va a marcar muchos productos con "GTIN no válido". Casi siempre
eso **limita** el alcance, pero no rechaza el producto. Si en el
diagnóstico de Merchant Center aparecen **rechazos** (no solo avisos), se
resuelve moviendo el código B1 a un campo propio y ajustando el script
de conciliación. Es un cambio de un día que conviene hacer **solo si hace
falta**.

---

## 2. Mercado Libre

**Primero, una pregunta:** en las búsquedas del 30 sep apareció un
vendedor **"intemperie.mx"** en Mercado Libre, con el Binocular Simmons
Venture 8x21 a $1,319.54, envío gratis y meses sin intereses.

- **Si es tuyo:** conviene saber cuánto vende allá y a qué precios. Parte
  de la gente que ve los anuncios de Meta podría estar comprando en
  Mercado Libre, y el pixel no ve esas ventas. Eso cambia cómo se lee
  cualquier resultado de campaña.
- **Si no es tuyo:** alguien está usando un nombre casi igual al de la
  tienda. Hay que saber quién es, y quizá reclamarlo.

### Por qué Mercado Libre tiene sentido para esta tienda

- El público (hombres de 55 años en adelante) **ya compra ahí** y confía
  en la plataforma: compra protegida, reputación visible, envío gratis
  subsidiado y meses sin intereses. Todo eso es justo lo que le falta a
  una tienda nueva.
- **Las piezas sueltas de bajo margen** (hilos, señuelos, anzuelos), que
  no pueden pagar publicidad en Meta, sí se pueden vender ahí sin costo
  por clic. Mercado Libre cobra comisión por venta, no por visita.
- Varios productos de aire y miras que Meta y Google no aceptan tienen
  categoría en Mercado Libre. **Hay que revisar las reglas de cada
  categoría antes de publicarlos**; algunos requieren documentación.

### Lo que puedo hacer yo cuando haya cuenta

- Armar el archivo de carga masiva (título, precio, fotos, ficha técnica)
  a partir del catálogo de Shopify.
- Calcular el precio mínimo por producto con la comisión y el envío de
  Mercado Libre, para no publicar nada que pierda dinero.
