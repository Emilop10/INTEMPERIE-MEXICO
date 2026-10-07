> ⚠️ **7 oct: las fotos de esta lista se cancelaron** (decisión del dueño). Los
> kits usan las fotos de sus piezas y una portada armada por
> `scripts/fotos-kits.py` (MANUAL §71). Lo que sigue vale como **lista de
> armado** de los primeros 4 kits.

# Fotos y armado de los 4 kits

Fase 1 de [`GUIA-POR-FASES.md`](./GUIA-POR-FASES.md). Este documento
tiene dos partes: **qué piezas apartar** para armar cada kit, y **qué
fotos tomar**. Las fotos se suben con:

```bash
SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-imagenes-productos.py --doc FOTOS-KITS.md --dry-run
SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-imagenes-productos.py --doc FOTOS-KITS.md
```

Cada kit tiene su carpeta en `imagenes-productos/<handle>/`. Basta con
dejar ahí las fotos **con el nombre exacto** que pide la lista (el script
ignora los nombres que no reconoce y no sube nada que falte).

## Por qué fotos reales y no IA

Un kit se vende por **lo que trae**. La foto que más vende es el kit
completo extendido sobre una mesa, con cada pieza visible y contable. La
IA no puede hacerla sin inventar piezas, y una pieza inventada en la foto
es un reclamo seguro.

## Cómo tomar las 4 fotos (celular, sin equipo especial)

1. **Fondo:** mesa de madera o una tela lisa oscura. Nada de fondo
   blanco: la tienda es oscura y el blanco se ve pegado.
2. **Luz:** junto a una ventana, de día, **sin flash**.
3. **Encuadre cuadrado** (en la cámara del celular: formato 1:1).
4. **Formato:** `.jpg`. La resolución del celular basta.

| Toma | Qué debe verse |
|---|---|
| `-1-kit-completo.jpg` | **La principal.** Todo el kit extendido desde arriba: caña (armada o en sus 2 tramos), carrete, hilos, caja y accesorios en fila. Que se pueda contar cada pieza |
| `-2-cana-carrete.jpg` | El carrete montado en la caña, de lado, mostrando que es un equipo armado |
| `-3-accesorios.jpg` | Acercamiento de los accesorios (plomos, anzuelos, destorcedores, señuelos) dentro o junto a la caja |
| `-4-en-mano.jpg` | Una mano sosteniendo la caña con el carrete, para dar escala |

---

## 1. Kit Listo para Pescar Okuma Revenger 7'0" — Todo Terreno — $1,549

- **handle:** `kit-listo-para-pescar-okuma-revenger-7-todo-terreno`
- **Existencia:** 2 kits. Apartar **2 juegos** de estas piezas:

| Cant. por kit | Pieza | Total a apartar (2 kits) |
|---|---|---|
| 1 | Caña de Pescar Okuma Revenger Spinning 7'0" (2.10m) | **2** |
| 1 | Carrete Gimbel JL4000 Spinning | **2** |
| 2 | Hilo Araty 0.35mm 100m Natural | **4** |
| 1 | Caja Organizadora Storm 16STORGDL | **2** |
| 1 | Cucharilla Gimbel Rosa 4006070-2 | **2** |
| 1 | Señuelo Gimbel 4007040 | **2** |
| 1 | Anzuelo Mustad 2330DT Sea Kirby #11 | **2** |
| 10 | Plomo Gimbel Bola 8.0mm | **20** |
| 5 | Plomo Gimbel Tipo Bala 10g | **10** |
| 10 | Destorcedor Gimbel 5620N con Seguro #5 | **20** |
| 2 | Flotador Gimbel Esfera 1 1/4" 32mm Mod. 1010 | **4** |

```imagenes
kit-listo-para-pescar-okuma-revenger-7-todo-terreno-1-kit-completo.jpg | REAL | Kit Listo para Pescar Okuma Revenger 7'0" — Todo Terreno: todo lo que incluye, extendido sobre una mesa
kit-listo-para-pescar-okuma-revenger-7-todo-terreno-2-cana-carrete.jpg | REAL | Caña y carrete del kit armados, vista lateral
kit-listo-para-pescar-okuma-revenger-7-todo-terreno-3-accesorios.jpg | REAL | Accesorios incluidos en el kit: plomos, anzuelos, destorcedores y señuelos
kit-listo-para-pescar-okuma-revenger-7-todo-terreno-4-en-mano.jpg | REAL | Caña con carrete del kit en la mano, para apreciar su tamaño
```

## 2. Kit Listo para Pescar Shimano Clarus 5'8" + IX R 1000 — Finesse — $1,599

- **handle:** `kit-listo-para-pescar-shimano-clarus-finesse`
- **Existencia:** 2 kits. Apartar **2 juegos** de estas piezas:

| Cant. por kit | Pieza | Total a apartar (2 kits) |
|---|---|---|
| 1 | Caña de Pescar Shimano Clarus Spinning 5'8" | **2** |
| 1 | Carrete Shimano IX R 1000 Spinning | **2** |
| 2 | Hilo Araty 0.25mm 100m Natural | **4** |
| 1 | Cucharilla Blue Fox Whiptail Deep Runner #0 Blanco | **2** |
| 1 | Cucharilla Gimbel Rosa 4006070-2 | **2** |
| 1 | Anzuelo Mustad 2330DT Sea Kirby #13 | **2** |
| 10 | Plomo Gimbel con Ranura 7mm 1.8g | **20** |
| 10 | Destorcedor Gimbel 5610N Sin Seguro #9 | **20** |

```imagenes
kit-listo-para-pescar-shimano-clarus-finesse-1-kit-completo.jpg | REAL | Kit Listo para Pescar Shimano Clarus 5'8" + IX R 1000 — Finesse: todo lo que incluye, extendido sobre una mesa
kit-listo-para-pescar-shimano-clarus-finesse-2-cana-carrete.jpg | REAL | Caña y carrete del kit armados, vista lateral
kit-listo-para-pescar-shimano-clarus-finesse-3-accesorios.jpg | REAL | Accesorios incluidos en el kit: plomos, anzuelos, destorcedores y señuelos
kit-listo-para-pescar-shimano-clarus-finesse-4-en-mano.jpg | REAL | Caña con carrete del kit en la mano, para apreciar su tamaño
```

## 3. Kit Listo para Pescar Blue Fox Tolten 8'0" — Mar y Costa — $1,349

- **handle:** `kit-listo-para-pescar-blue-fox-tolten-8-mar-y-costa`
- **Existencia:** 2 kits. Apartar **2 juegos** de estas piezas:

| Cant. por kit | Pieza | Total a apartar (2 kits) |
|---|---|---|
| 1 | Caña de Pescar Blue Fox Tolten Spinning 8'0" (2.40m) | **2** |
| 1 | Carrete Gimbel S500 Spinning | **2** |
| 2 | Hilo Araty 0.40mm 100m Natural | **4** |
| 1 | Caja Organizadora Storm 16STORDSOL | **2** |
| 1 | Líder con Destorcedor Gimbel 6kg 70cm WL04-206 | **2** |
| 1 | Anzuelo Mustad 94151-NI Live Bait #1/0 | **2** |
| 5 | Plomo Gimbel Pera 1/2 Oz | **10** |
| 5 | Plomo Gimbel Tipo Bala 15g | **10** |
| 5 | Destorcedor Gimbel 5630 Triple #1/0 | **10** |
| 5 | Destorcedor Gimbel 5620N con Seguro #4/0 | **10** |

```imagenes
kit-listo-para-pescar-blue-fox-tolten-8-mar-y-costa-1-kit-completo.jpg | REAL | Kit Listo para Pescar Blue Fox Tolten 8'0" — Mar y Costa: todo lo que incluye, extendido sobre una mesa
kit-listo-para-pescar-blue-fox-tolten-8-mar-y-costa-2-cana-carrete.jpg | REAL | Caña y carrete del kit armados, vista lateral
kit-listo-para-pescar-blue-fox-tolten-8-mar-y-costa-3-accesorios.jpg | REAL | Accesorios incluidos en el kit: plomos, anzuelos, destorcedores y señuelos
kit-listo-para-pescar-blue-fox-tolten-8-mar-y-costa-4-en-mano.jpg | REAL | Caña con carrete del kit en la mano, para apreciar su tamaño
```

## 4. Kit Listo para Pescar Blue Fox Fresh 7'0" — Agua Dulce — $1,199

- **handle:** `kit-listo-para-pescar-blue-fox-fresh-7-agua-dulce`
- **Existencia:** 2 kits. Apartar **2 juegos** de estas piezas:

| Cant. por kit | Pieza | Total a apartar (2 kits) |
|---|---|---|
| 1 | Caña de Pescar Blue Fox Fresh Spinning 7'0" (2.10m) | **2** |
| 1 | Carrete Gimbel AFR230 Spinning | **2** |
| 2 | Hilo Araty 0.20mm 100m Natural | **4** |
| 2 | Flotador Gimbel Antena 4g SU7045 | **4** |
| 2 | Flotador Gimbel Esfera 3/4" 19mm Mod. 1010 | **4** |
| 1 | Anzuelo Mustad 2330DT Sea Kirby #9 | **2** |
| 10 | Plomo Gimbel Bola 6.0mm | **20** |
| 8 | Plomo Gimbel con Ranura 6mm 1.2g | **16** |
| 10 | Destorcedor Gimbel 5610N Sin Seguro #9 | **20** |
| 1 | Cucharilla Gimbel Rosa 4006070-2 | **2** |

```imagenes
kit-listo-para-pescar-blue-fox-fresh-7-agua-dulce-1-kit-completo.jpg | REAL | Kit Listo para Pescar Blue Fox Fresh 7'0" — Agua Dulce: todo lo que incluye, extendido sobre una mesa
kit-listo-para-pescar-blue-fox-fresh-7-agua-dulce-2-cana-carrete.jpg | REAL | Caña y carrete del kit armados, vista lateral
kit-listo-para-pescar-blue-fox-fresh-7-agua-dulce-3-accesorios.jpg | REAL | Accesorios incluidos en el kit: plomos, anzuelos, destorcedores y señuelos
kit-listo-para-pescar-blue-fox-fresh-7-agua-dulce-4-en-mano.jpg | REAL | Caña con carrete del kit en la mano, para apreciar su tamaño
```
