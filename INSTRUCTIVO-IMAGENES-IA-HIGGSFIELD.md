# Instructivo — Imágenes de producto con IA (Higgsfield)

Cómo se hacen las imágenes de ambiente de la tienda: combos, kits, óptica
y, de ahí en adelante, una categoría a la vez. Es la receta que se usó el
16 oct (MANUAL §82-§86). Si se sigue tal cual, las imágenes salen igual
de buenas y **fieles al producto real**.

---

## 0. Antes de empezar

| Qué | Cómo |
|---|---|
| Conector | **Higgsfield**, conectado por el dueño en claude.ai/customize/connectors con la URL `https://mcp.higgsfield.ai/mcp` (OAuth, sin claves). Sus herramientas son `mcp__HIGGSFIELD__*` |
| Créditos | `balance`: plan Plus. Cada imagen de Nano Banana 2.1 a 2k cuesta **2 créditos**. Cada producto aprobado sale en 2-3 créditos, contando las rechazadas |
| Token de Shopify | `SHOPIFY_ADMIN_TOKEN` en las variables de entorno. Se necesita para leer productos y subir imágenes |
| Proyecto en Higgsfield | No hace falta (`get_preferences` → `auto_create_project: false`). Se genera sin carpeta |

---

## 1. Reglas que no se negocian

1. **Fidelidad al producto.** La IA pone el producto **real** en un
   ambiente. No lo rediseña. Se pierde la imagen si cambia la marca, el
   color, la forma, el modelo de carrete o el número de piezas.
2. **No mostrar lo que no se vende.**
   - Una **caña sola va sin carrete**, y un **carrete solo va sin caña**.
     Si el cliente ve la otra pieza, cree que viene incluida.
   - En un "todo lo que incluye" va **exactamente** lo que trae el kit.
     Ni un carrete de hilo de más.
3. **Nada de armas ni sus accesorios** (diábolos, miras, monturas,
   linternas tácticas). Meta y Google los rechazan.
4. **Revisión obligatoria, imagen por imagen**, antes de subir (ver §5).
5. **Nunca se borra nada** de Shopify. Las imágenes se agregan; si una no
   sirve, se cambia de posición.
6. **Sin texto ni logos inventados.** Todos los prompts terminan con
   "No added text, no watermark, no extra logos."

---

## 2. Modelo y ajustes

| Ajuste | Valor | Por qué |
|---|---|---|
| Modelo | **`nano_banana_2_1`** | En la prueba (§82) fue el más fiel al producto y cuesta un tercio que GPT Image 2. GPT Image 2 le quitó la manivela al carrete |
| Resolución | `2k` (2048×2048) | Nítida para el zoom de la ficha; Shopify la optimiza solo |
| Proporción | `1:1` | Galería de la tienda y feed de Facebook |
| Referencia | `medias: [{value: <media_id>, role: "image_references"}]` | La foto real del producto |

---

## 3. Referencias (la foto real)

- **Producto de una sola foto** (caña, binocular, carrete): importar la
  foto de Shopify con `media_import_url` (URL del CDN, `type: image`).
  Regresa el `media_id`. Es lo más simple y la respuesta es corta.
- **Producto de varias piezas** (combo, kit): armar **un collage** en el
  scratchpad con PIL. La caña va arriba a todo lo ancho y abajo, en fila,
  el carrete, el hilo, la caja y uno o dos señuelos. Luego:
  - `media_upload` con `files[]` (máximo 20 por llamada). ⚠️ La respuesta
    es **enorme**: trae URLs firmadas muy largas. Con muchos archivos se
    guarda sola en un archivo; leerla con `jq`.
  - Hacer `curl -X PUT -H "Content-Type: image/jpeg" --data-binary @archivo <upload_url>`
    por cada archivo y esperar HTTP 200.
  - Terminar con `media_confirm` (`type: image`, `media_ids: [...]`).
- Dos productos con la misma foto (p. ej. Clarus 5'8" y 6'3") pueden
  usar el mismo `media_id`. Cambia la escena para que no se repitan.

---

## 4. Escenas que venden (público: hombres de 55+ en México)

**Dos imágenes por producto:**

| Tipo | Para qué | Ejemplos que funcionaron |
|---|---|---|
| **A. Héroe (va de portada)** | Que el producto se vea **grande y completo** en un lugar que antoje ir | Combo en el portacañas de una panga en el Mar de Cortés · lancha en Chapala con pelícanos · binocular sobre mochila en un mirador · Barrancas del Cobre |
| **B. Emoción o detalle** | Conectar o mostrar calidad | Abuelo y nieto en el muelle · padre e hijo riendo en la orilla · señor con su lobina · manos con trucha · close-up del mango y el portacarrete |

- **Kits:** la A es un **flat lay de "todo lo que incluye"** (cenital, en
  muelle, arena, batea de pickup o cubierta de lancha). Hay que escribir
  la cantidad exacta y "nothing else" (ver §6).
- **Cañas solas:** la A es la caña entera, sin carrete. La B es un
  close-up del mango, el portacarrete vacío y las guías.
- **Carretes solos:** la A es el carrete grande, sobre una roca, un
  muelle, una cubierta o la arena. La B, en manos de un señor (cargando
  hilo, revisando el freno) o junto a una lobina o trucha. Nunca montado
  en una caña.
- **Óptica:** la A es un bodegón en un paisaje. La B, un señor usándolo
  (ballenas, flamencos, venados, un velero frente a un faro).
- **Lugares mexicanos reales:** presas, Chapala, Mar de Cortés, Pacífico,
  manglares, Huasteca, Barrancas del Cobre, sierra, Baja, Yucatán.
- **Luz:** amanecer o atardecer (hora dorada) y niebla sobre el agua.

### Plantilla de prompt

```
<Tipo de foto> : the <descripción visual del producto> from the reference,
<cómo está colocado>, <lugar mexicano concreto> at <hora>, <2-3 objetos de
ambiente>. <El producto completo / el detalle> visible and sharp.
Keep every product exactly as shown in the reference image: same shapes,
colors, proportions, graphics and <reel model / logo>; do not redesign or
swap any item. [Para cañas: NO reel mounted on the rod and no reel anywhere
in the image.] Photorealistic, natural warm light, shot on a full-frame
camera. No added text, no watermark, no extra logos.
```

Describe el producto con lo que **se ve** en la foto: "silver Okuma
Boundary rod with silver reel with red accents", "olive-green Gamo
binocular". Así el modelo no adivina.

---

## 5. Revisión (obligatoria)

Se bajan las imágenes y se arma una hoja de contacto con PIL (2 por fila,
640 px, con el número de cada una). Luego se mira **cada** imagen:

- [ ] ¿Es la misma marca, color y forma? ¿Se lee el logo, sin espejear?
- [ ] ¿Es el mismo modelo de carrete, con su manivela?
- [ ] ¿Lleva las piezas correctas, ni más ni menos?
- [ ] En cañas solas: ¿no hay ningún carrete?
- [ ] ¿El producto se ve grande, o se perdió en la escena?
- [ ] ¿No hay texto raro, manos deformes ni objetos imposibles?

Si algo falla, **se rechaza** y se rehace con el prompt corregido. Nunca
se sube "porque casi".

---

## 6. Errores conocidos y cómo evitarlos

| Error | Solución |
|---|---|
| Flat lay con piezas duplicadas (3-4 carretes de hilo cuando son 2) | Escribir "showing exactly these items and nothing else: … exactly two spools …" |
| Logo de la caja Storm al revés | No pedir logos de cajas, o pedir la escena sin caja |
| El carrete se "rediseña" en close-ups | Encuadres donde el combo se vea completo |
| Color del blank cambiado (Clarus negro salió plateado) | Repetir el color en el prompt: "matte BLACK … not silver or grey" |
| Close-up que inventa gráficos (Maupiti) o cambia la manivela (AFR230 con doble perilla) | Si la foto real tiene poco detalle, no pedir close-up: pedir el producto entero. Nombrar los rasgos ("ONE handle knob only") |
| Monocular genérico, sin sus anillos verdes | Describir los rasgos distintivos en el prompt. Si sigue saliendo mal, dejar el producto con 1 imagen |
| `429 rate_limit_reached` | Máximo **8 trabajos a la vez** por modelo. Mandar tandas de 8 y esperar con `jobs_wait` antes de la siguiente. Los rechazados por límite no cobran |
| Marcado como `nsfw` sin razón | Reformular la escena con otras palabras y repetir |
| `failed` del lado de Higgsfield | Repetir igual |

---

## 7. Flujo completo, paso a paso

1. **Elegir la categoría** y listar **todos** sus productos activos
   desde la API de Shopify, incluidos los agotados. Así no queda ninguno
   sin imágenes cuando vuelvan a tener existencia.
2. **Ver las fotos reales:** bajar la foto 1 de cada uno y armar una hoja
   de contacto para describirlos bien.
3. **Referencias:** `media_import_url`, o collage con `media_upload`
   (§3).
4. **Generar** con `generate_image_batch` en tandas de 8. Usar índices
   estables por producto (p. ej. `300 + 10·i + escena`).
5. **Esperar** con `jobs_wait` (`timeout_seconds` de 15 o menos) hasta que
   todo esté en estado terminal.
6. **Revisar** con la hoja de contacto y la lista de §5. Rechazar y
   rehacer lo que falle.
7. **Registrar** las aprobadas en `imagenes/imagenes-ia-aprobadas.json`:
   `handle → [{escena, url}]`. **La primera de la lista es la portada.**
8. **Subir:**
   ```bash
   python3 scripts/subir-imagenes-ia.py            # ensayo
   python3 scripts/subir-imagenes-ia.py --aplicar  # sube
   ```
   Es idempotente: el sufijo `[ia:n]` en el `alt` evita duplicados. Pone
   las de IA en las posiciones 1..n y deja las fotos reales detrás.
9. **Verificar:** por API (`[ia:1]` en la posición 1 de cada producto) y
   en el sitio desde celular (Playwright).
10. **Mandar al dueño** las hojas de aprobadas con `SendUserFile`.
11. **Documentar** en el MANUAL (créditos, aprobadas y rechazadas con su
    motivo) y en PENDIENTES. Commit y push.
12. **Vigilar Google:** en el siguiente diagnóstico de Merchant Center,
    revisar que ninguna portada de IA salga marcada. Si sale, la foto
    real regresa a la posición 1.

---

## 8. Registro por categoría

| Fecha | Categoría | Productos | Aprobadas | Créditos | MANUAL |
|---|---|---|---|---|---|
| 16 oct | Prueba (Revenger 2.45) | 1 | 2 de 4 | 12.5 | §82 |
| 16 oct | Combos, kits y óptica | 20 | 39 de 44 | 84 | §83-§84 |
| 16 oct | Cañas (con existencia) | 10 | 20 de 21 | 42 | §86 |
| 16 oct | Cañas agotadas + Carretes | 7 + 8 | 29 de 32 | 64 | §87 |
| 16 oct | Óptica que faltaba (7 binoculares + 2ª del KonuSmall-2) | 8 | 15 de 15 | 30 | §89 |

Siguientes categorías sugeridas, en orden de venta: **cajas → señuelos
y cucharillas → flotadores**. Miras telescópicas, monturas y linterna
táctica no se trabajan (accesorios de arma). Hilos y anzuelos van al
final: sus fotos de catálogo ya son claras y son de bajo precio.
