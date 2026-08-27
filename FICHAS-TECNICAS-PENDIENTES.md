# Fichas técnicas — borrador para los 35 productos del conjunto de Meta

Este documento es el borrador de la Ola 7, bloque 3 (`MANUAL-PROYECTO.md`,
sección 47). El mecanismo de código ya está desplegado: cualquier producto
con el metafield `custom.especificaciones` poblado muestra automáticamente
una tabla de "Ficha técnica" en su página; sin el metafield, no cambia nada.

**Nada de lo de abajo se inventó.** Cada línea sale literal de la
descripción ya publicada del producto, o de la notación estándar del
título (ej. "8x21" en binoculares = 8x de aumento × 21mm de objetivo,
convención universal de la industria óptica, no una inferencia). Donde
la descripción no trae un dato, se marca `[FALTA]` en vez de adivinarlo
— en municiones y óptica un dato equivocado es peor que no tener nada.

## Cómo capturarlo (una vez, en el admin)

1. Configuración → Metacampos → Productos → Agregar definición.
   - Namespace y clave: `custom.especificaciones`
   - Nombre: `Ficha técnica`
   - Tipo: **Texto de una línea → Lista de valores**
   - Acceso de Storefront: **activado** (si no, el tema no lo va a mostrar
     aunque el dato esté capturado — es la causa nº1 de "lo llené y no se ve").
2. En cada producto de abajo, agregar el metafield "Ficha técnica" y pegar
   las líneas de la columna correspondiente, una por renglón (el editor de
   listas de Shopify ya da un campo "+ Agregar" por línea).
3. Guardar. Verificar esa ficha en el sitio — debe aparecer una tabla
   "Ficha técnica" debajo de los tabs de Envíos/Devoluciones/Garantía.

---

## Cañas de pescar (12) — descripción ya trae datos estructurados

### Caña de Pescar Storm Maupiti Tele Surf 14'0" (4.20m)
`/products/cana-de-pescar-storm-maupiti-tele-surf-140-4-20m`
```
Longitud extendida: 4.20 m (14 pies)
Longitud retraída: 1.30 m
Material: high carbon
Mango: EVA
Secciones: 4 (telescópica)
Capacidad de lance: 100-200 g
```

### Caña de Pescar Shimano Stimula Spinning 6'0" Medium
`/products/cana-de-pescar-shimano-stimula-spinning-60-medium`
```
Longitud: 183 cm (6 pies)
Peso: 105 g
Acción: Medium
Resistencia: 8-20 lb
Material: grafito
Mango: corcho
Secciones: 2 (desmontables)
```

### Caña de Pescar Shimano Clarus Spinning 6'3"
`/products/cana-de-pescar-shimano-clarus-spinning-63`
```
Longitud: 6'3"
Acción: X-Fast
Material: grafito ligero
Guías: óxido de aluminio
Uso recomendado: pesca de precisión, finesse
```

### Caña de Pescar Shimano Clarus Spinning 5'8"
`/products/cana-de-pescar-shimano-clarus-spinning-58`
```
Longitud: 5'8"
Acción: X-Fast
Material: grafito ligero
Guías: óxido de aluminio
Uso recomendado: pesca de precisión, finesse
```

### Caña de Pescar Rapala Corux 240 (7'10")
`/products/cana-de-pescar-rapala-corux-240-710`
```
Longitud: 2.40 m
Material: carbono
Mango: corcho
Secciones: 2
Acción: media
Uso recomendado: agua dulce, orilla y playa
```

### Caña de Pescar Okuma Tundra Pro SP 7'0" (2.10m)
`/products/cana-de-pescar-okuma-tundra-pro-sp-70-2-10m`
```
Longitud: 2.10 m (7 pies)
Peso: 218 g
Acción: medium
Resistencia de línea: 10-20 lb
Capacidad de lance: 15-60 g
Material: fibra de vidrio
Mango: espuma EVA
Secciones: 2
```

### Caña de Pescar Okuma Revenger Spinning 8'0" (2.40m)
`/products/cana-de-pescar-okuma-revenger-spinning-80-2-40m`
```
Longitud: 2.40 m (8 pies)
Secciones: 2
Acción: medium
Uso recomendado: pesca general, spinning
```

### Caña de Pescar Okuma Revenger Spinning 7'0" (2.10m)
`/products/cana-de-pescar-okuma-revenger-spinning-70-2-10m`
```
Longitud: 2.10 m (7 pies)
Secciones: 2
Acción: medium
Uso recomendado: pesca general, spinning
```

### Caña de Pescar Blue Fox Power Boat Spinning 6'4" (1.95m)
`/products/cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m`
```
Longitud: 1.95 m
Material: fibra de vidrio
Mango: EVA
Secciones: 2
Acción: heavy
Uso recomendado: pesca en bote/embarcación
```

### Caña de Pescar Blue Fox Portada SP 11'0" (3.30m)
`/products/cana-de-pescar-blue-fox-portada-sp-110-3-30m`
```
Longitud: 3.30 m (11 pies)
Material: fibra de vidrio
Mango: EVA ergonómico
Secciones: 3
Acción: extra heavy
Capacidad de lance: 80-150 g
```

### Caña de Pescar Shimano Sellus Spinning 5'8"
`/products/cana-shimano-sellus-spinning-5-8`
```
Longitud: 5'8"
Acción: rápida (fast)
Mango: EVA de agarre dividido (split-grip)
Guías: Titanium Oxide
Uso recomendado: pesca deportiva de precisión con señuelo
Disponibilidad: pieza única en existencia
```

### Combo Okuma Boundary 7'0" Spinning
(combo, va junto con carretes abajo — incluido aquí porque la caña
es el componente principal)
`/products/combo-okuma-boundary-70-spinning`
```
Longitud: 7'0"
Acción: Medium
Secciones: 2
Carrete incluido: tamaño 40, relación 5.2:1
```

---

## Carretes (4)

### Carrete Gimbel JL4000 Spinning
`/products/carrete-gimbel-jl4000-spinning`
```
Relación de transmisión: 5.0:1
Peso: 280 g
Capacidad de línea: 0.40mm / 200m
Baleros: 4+1 (4 + 1 unidireccional)
```

### Carrete Gimbel AFR230 Spinning
`/products/carrete-gimbel-afr230-spinning`
```
Peso: 198 g
Capacidad de línea: 0.18mm / 170m
```

### Carrete Okuma Revenger RV-80 Spinning
`/products/carrete-okuma-revenger-rv-80-spinning`
```
Relación de transmisión: 4.8:1
Arrastre máximo: 12 kg
Peso: 486 g
Sistema de alarma de pique: sí
```

### Carrete Blue Fox Ranco 3000SP Spinning
`/products/carrete-blue-fox-ranco-3000sp-spinning`
```
Relación de transmisión: 5.1:1
Baleros: 4
Cuerpo: grafito
Freno: delantero
Sistema de alarma de pique: sí
```

### Carrete Shimano Sienna FG 4000 Spinning
`/products/carrete-shimano-sienna-fg-4000-spinning`
```
Relación de transmisión: 5.2:1
Baleros: 4
Arrastre máximo: 19 lb
Uso recomendado: agua dulce y salada ligera
```

---

## Combos (4 — caña+carrete)

### Combo Okuma Revenger 8'0" (2.45m)
`/products/combo-okuma-revenger-80-2-45m`

> Agregado el 25 de agosto. Este combo estaba agotado cuando se armó el
> borrador original, así que quedó fuera de los 35. La conciliación de
> inventario de ese día lo devolvió a stock (3 unidades) y pasó a ser el
> **combo más barato del aterrizaje pagado** — la primera tarjeta que ve
> quien llega del anuncio. Era el único de los 7 sin ficha técnica.

```
Longitud: 2.45 m (8 pies)
Material: fibra de vidrio
Guías: cerámicas
Resistencia de línea: 11-20 lb
Carrete incluido: tamaño 40, relación 5.0:1
Línea preinstalada: sí
Secciones: 2
```

### Combo Level Rapala Verde 6'6" + Accesorios
`/products/combo-level-rapala-verde-66-accesorios`
```
Longitud: 1.95 m (6'6")
Carrete incluido: tamaño 2500
Alarma de pique: sí
Accesorios incluidos: señuelos, cucharas, flotador, anzuelos, seguros (2 piezas)
```

### Combo Level Rapala Rojo 7'0" + Accesorios
`/products/combo-level-rapala-rojo-70-accesorios`
```
Longitud: 2.10 m (7 pies)
Carrete incluido: tamaño 4000, relación 5.2:1
Alarma de pique: sí
Accesorios incluidos: 1 señuelo con plomo, 3 señuelos suaves, 2 cucharas, 1 flotador, 8 anzuelos, 3 seguros (2 piezas)
```

### Combo Okuma Elite Pro 7'0" Medium Heavy
`/products/combo-okuma-elite-pro-70-medium-heavy`
```
Longitud: 7'0" (210 cm)
Acción: Medium Heavy
Peso: 360 g
Carrete incluido: tamaño 40, relación 5.2:1
```

---

## Binoculares y monoculares (13) — datos del título (notación estándar de óptica)

El formato "AxBB" del título es la convención universal de la industria
(aumento × diámetro del objetivo en mm) — no es una inferencia, es cómo
el propio fabricante nombra el modelo. Donde la descripción agrega algo
más (recubrimiento, resistencia al agua), se incluye también.

### Binocular Mendoza MODS-003 8x21
`/products/binocular-mendoza-mods-003-8x21`
```
Aumento: 8x
Diámetro de objetivo: 21 mm
Prismas: BAK-4, recubrimiento multicapa FMC
Resistente al agua: sí
Incluye: funda de transporte
```

### Monocular Konus KonuSmall-3 Zoom 8-24x40
`/products/monocular-konus-konusmall-3-zoom-8-24x40`
```
Aumento: 8x-24x (zoom variable)
Diámetro de objetivo: 40 mm
Incluye: adaptador para smartphone
Enfoque: doble sistema (rápido y fino)
```

### Monocular Konus KonuSmall-2 Zoom 7-17x30
`/products/monocular-konus-konusmall-2-zoom-7-17x30`
```
Aumento: 7x-17x (zoom variable)
Diámetro de objetivo: 30 mm
Enfoque: doble sistema (rápido y fino)
Cuerpo: recubierto de hule
Rosca para trípode: 1/4 estándar
```

### Binocular Kampak Visión Nocturna Digital
`/products/binocular-kampak-vision-nocturna-digital`
```
Tipo: visión nocturna digital
Pantalla: integrada
Zoom: digital
[FALTA] aumento óptico exacto
[FALTA] alcance de visión nocturna en metros
Recargable: sí
```

### Binocular Gamo 8x40 AF Autoenfoque
`/products/binocular-gamo-8x40-af-autoenfoque`
```
Aumento: 8x
Diámetro de objetivo: 40 mm
Prisma: Porro
Enfoque: automático (AF)
Cuerpo: hule verde militar, resistente a impactos
```

### Binocular Konus NewZoom 7-21x40
`/products/binocular-konus-newzoom-7-21x40`
```
Aumento: 7x-21x (zoom variable)
Diámetro de objetivo: 40 mm
Cuerpo: hule antigolpes
Enfoque: central
Rosca para trípode: adaptador universal
```

### Binocular Bushnell PowerView 2 8x21 Negro
`/products/binocular-bushnell-powerview-2-8x21-negro`
```
Aumento: 8x
Diámetro de objetivo: 21 mm
Chasis: aluminio recubierto de hule antiderrapante
Óptica: multicapa
Diseño: plegable, prisma de techo
```

### Binocular Simmons Venture 8x21 Negro
`/products/binocular-simmons-venture-8x21-negro`
```
Aumento: 8x
Diámetro de objetivo: 21 mm
Prisma: de techo
Resistente al agua: sí
Óptica: multicapa
```

### Binoculares Lobo 20x50
`/products/binoculares-lobo-20x50`
```
Aumento: 20x
Diámetro de objetivo: 50 mm
Cuerpo: ahulado antiderrapante
Lentes: recubrimiento multicapa
```

### Binoculares Lobo 16x50
`/products/binoculares-lobo-16x50`
```
Aumento: 16x
Diámetro de objetivo: 50 mm
Cuerpo: ahulado antiderrapante
Lentes: recubrimiento multicapa
```

### Binoculares Lobo 12x50
`/products/binoculares-lobo-12x50`
```
Aumento: 12x
Diámetro de objetivo: 50 mm
Cuerpo: ahulado antiderrapante
Lentes: recubrimiento multicapa
```

### Binoculares Lobo 10x60 Lente Rojo
`/products/binoculares-lobo-10x60-lente-rojo`
```
Aumento: 10x
Diámetro de objetivo: 60 mm
Lente: rojo
Cuerpo: ahulado antiderrapante
```

### Binoculares Lobo 10-30x50 Zoom
`/products/binoculares-lobo-10-30x50-zoom`
```
Aumento: 10x-30x (zoom variable)
Diámetro de objetivo: 50 mm
Cuerpo: ahulado antiderrapante
Lentes: recubrimiento multicapa
```

---

## Otros (2)

### Caja Rapala Utility Box Chica
`/products/caja-rapala-utility-box-chica`
```
Dimensiones: 12 x 10 x 5 cm aprox.
Cierre: hermético, sellado e impermeable
Clips: de compresión, alta resistencia
Interior: espuma ranurada
Uso recomendado: señuelos, jigs, plásticos suaves
```

### Hilo Araty 0.70mm 1000m Natural
`/products/hilo-araty-0-70mm-1000m-natural`
```
Diámetro: 0.70 mm
Longitud: 1000 m
Material: nylon monofilamento, 100% poliamida
Uso recomendado: agua dulce y salada
Protección UV: sí
```

---

## Resumen

| Categoría | Productos | Datos completos | Con algún [FALTA] |
|---|---|---|---|
| Cañas / combos con caña | 13 | 13 | 0 |
| Carretes | 4 | 4 | 0 |
| Combos (accesorios) | 4 | 4 | 0 |
| Binoculares / monoculares | 13 | 12 | 1 (Kampak visión nocturna) |
| Otros | 2 | 2 | 0 |
| **Total** | **36** | **35** | **1** |

> El total pasó de 35 a 36 el 25 de agosto, al sumar el Combo Okuma
> Revenger 8'0" (2.45m) cuando volvió a estar disponible.

Solo un producto (Binocular Kampak Visión Nocturna Digital) tiene datos
incompletos en su descripción actual — el aumento óptico y el alcance de
visión nocturna no están publicados en ningún lado del catálogo. Se puede
capturar igual con los campos disponibles y dejar esos dos `[FALTA]`
fuera de la lista (mejor omitirlos que inventarlos), o consultar la ficha
técnica del fabricante si el dueño la tiene a mano.
