# Chatbot de IA en el sitio — investigación y guía de instalación

## Por qué esto y no un bot de WhatsApp

Investigado en julio 2026. Desde enero 2026, Meta bloqueó a los asistentes
de IA de propósito general (como ChatGPT) dentro de WhatsApp — solo
sobreviven los bots de negocio construidos sobre la **WhatsApp Business
API**, que tiene costo por mensaje (~$0.05–0.11 USD c/u) y requiere
registrar y verificar el número como cuenta de negocio.

Para el objetivo real ("que filtre preguntas antes de que me escriban a mí
por WhatsApp"), un **widget de chat con IA en el sitio** cumple lo mismo
sin ese costo ni esa fricción: resuelve la mayoría de preguntas repetitivas
(stock, envíos, garantía, devoluciones) y el cliente sigue teniendo el
botón de WhatsApp disponible para hablar contigo directamente si de verdad
lo necesita. Si en unas semanas el volumen lo justifica, ahí se evalúa
sumar WhatsApp — no antes.

## Opción elegida: Zipchat AI

App nativa de Shopify (no requiere código). Se conecta directo al catálogo
de la tienda (stock, precios, variantes) y corre sobre GPT o Claude por
debajo.

- **Plan gratuito**: 120 respuestas de IA/mes, 100 páginas de
  entrenamiento — suficiente para probarlo sin gastar nada.
- **Plan Starter**: $49 USD/mes si se supera el límite gratuito.
- Prueba de 7 días + garantía de devolución de 30 días en planes pagos.
- Se factura junto con la suscripción de Shopify (aparece en la misma
  factura).

## Instalación (5–10 minutos, requiere iniciar sesión como dueño de la
tienda — esto no se puede hacer por API, necesita tu aprobación manual)

1. Entra al Admin de Shopify → **Aplicaciones** → **Shopify App Store**.
2. Busca **"Zipchat AI"** e instala (botón "Agregar aplicación").
3. Acepta los permisos que pide (lectura de productos/pedidos — es lo que
   necesita para responder con datos reales del catálogo).
4. En el panel de Zipchat, activa el modo **"Widget de sitio"**
   (déjalo desactivado para WhatsApp por ahora).
5. En "Entrenamiento" / "Knowledge base", sube o pega el contenido de la
   sección siguiente de este documento — así el bot no inventa nada, responde
   con la información real de la tienda desde el primer día.
6. Activa el widget y pruébalo tú mismo antes de dejarlo visible a
   clientes.

## Base de conocimiento lista para pegar en el entrenamiento del bot

```
ENVÍOS
- Envío estándar: $189 MXN a todo México.
- Envío gratis en pedidos desde $799 MXN.
- Tiempo de entrega estimado: 2 a 7 días hábiles (según destino), más 1 a
  2 días hábiles de procesamiento antes del envío. Coincide con la
  Política de Envíos oficial del sitio.
- Empaque neutro, sin marcas visibles por fuera.
- WhatsApp para dudas antes o después de comprar: +52 777 327 7340.

DEVOLUCIONES Y GARANTÍA
- Ventana de 7 días para devolución o cambio desde que se recibe el
  pedido.
- Municiones, diábolos y cartuchos de CO2 abiertos NO admiten devolución
  (higiene y seguridad).
- Si el producto llega defectuoso, la tienda cubre el costo de envío de
  la devolución.
- Si es cambio de opinión (no defecto), el costo de envío lo cubre el
  cliente.

CATÁLOGO
- Categorías: Pesca (cañas, carretes, señuelos, anzuelos, hilos y
  líneas), Miras y Binoculares, Diábolos y Municiones, Rifles y Pistolas
  de Aire (incluye subcategorías de Diábolos por calibre y CO2/cartuchos).
- Las imágenes de producto son ilustrativas: el producto entregado es el
  que se describe en título y descripción; el diseño/color del empaque
  puede variar respecto a la foto.

PAGO Y SEGURIDAD
- Pagos procesados de forma segura a través de la plataforma de Shopify.
- No se comparten datos de tarjeta con la tienda directamente.

CONTACTO
- Si el bot no puede resolver la duda, debe invitar al cliente a escribir
  por WhatsApp al +52 777 327 7340, o dejar su correo para seguimiento.
- No mencionar ninguna dirección física ni ciudad de operación — la
  tienda opera de forma remota y esa información no se publica por
  privacidad.

IDENTIDAD DEL ASISTENTE
- El asistente se llama "Cartucho" y trabaja para INTEMPERIE MÉXICO.
- Nunca debe referirse a la tienda por su dominio técnico
  (wfuxvx-yn.myshopify.com o similar) — siempre como "Intemperie México"
  o "la tienda".
```

## Siguiente paso

Una vez instalado y probado unas semanas, evaluar con datos reales
(cuántas conversaciones resolvió sin que el dueño interviniera) si vale la
pena sumar la integración de WhatsApp Business API — con su costo
adicional por mensaje.
