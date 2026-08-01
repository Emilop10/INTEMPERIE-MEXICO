# Pendientes — Intemperie México

Temas abiertos de la auditoría de la tienda. Los tres requieren una decisión o
datos tuyos; el resto de la auditoría ya quedó implementado en el tema de trabajo.

**Tema en vivo:** "Intemperie Mexico - Rediseño 2026" — publicado el 31 de
julio de 2026. Ya no hay tema de trabajo separado; todo cambio se ve en
vivo de inmediato en `https://wfuxvx-yn.myshopify.com/`.
**Última actualización:** 31 de julio de 2026

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
productos de aire comprimido. Ver `INSTRUCTIVO-APP-SHOPIFY.md` si se necesita
volver a tocar permisos de la app para editarlas de nuevo.

---

## ~~1. Dos productos sin subcategoría~~ ✅ Resuelto (28 jul)

Se crearon dos colecciones nuevas, con portada y descripción, conectadas en la
homepage y en el mega-menú (este último ya es visible en el sitio en vivo):

- **Calibre 6.35mm** — Diábolo Gamo Hunter Metal Impact
- **CO2 y Cartuchos** — Cartucho de Gas CO2 12 Gramos

"Diábolos y Municiones" queda al 100% de cobertura, igual que los otros 3 departamentos.

---

## 2. Redes sociales — parcialmente resuelto (28 jul)

✅ **Facebook conectado**: `https://www.facebook.com/people/Intemperie-México/61588253103964/`
ya aparece como ícono en el footer del tema de trabajo.

⏳ **Pendiente**: Instagram y TikTok — de momento solo existe la página de
Facebook. Cuando se abran esas cuentas, mandar el link y se conecta igual de
rápido.

---

## 3. Señales de confianza ausentes

La tienda vende rifles y ópticas de precio alto, pero la página **no comunica en
ningún lado**:

- Tiempos de entrega
- Política de garantía
- Si hay devoluciones o cambios

Las políticas legales existen (link en el footer) pero prácticamente nadie las abre.

**Propuesta:** una franja discreta antes de la sección de cierre con 3 puntos, por
ejemplo: *"Envío en 24-48h · Garantía de fábrica · Producto verificado"*.

**Qué se necesita:** confirmar los datos reales (¿cuántos días de envío? ¿qué
garantía se ofrece? ¿se aceptan devoluciones?). El diseño y el montaje ya están
resueltos, solo faltan los datos.

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

---

## Datos de contacto ya integrados

Por si se necesitan para otros usos:

- **WhatsApp:** +52 777 327 7340
- **Correo:** ventas@intemperiemexico.com

Nota: por decisión explícita, el footer **no menciona la ciudad de origen de los
envíos** (Cuernavaca, Morelos) — solo dice "Envíos a todo México", para no exponer
la ubicación del negocio.
