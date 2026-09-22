# Graph Report - scripts  (2026-09-22)

## Corpus Check
- 14 files · ~35,733 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ttf 3)

## Summary
- 169 nodes · 305 edges · 12 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `404fd6bf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- conciliar-inventario.py
- deploy-shopify.py
- Deploy del tema a Shopify
- meta-ads.py
- sincronizar-canal-meta.py
- vincular-codigo-b1.py
- cargar-fichas-tecnicas.py
- instalar-entorno.sh
- verificar-herramental.sh
- generar-carta-bienvenida.py
- prueba-tarjetas-coleccion.py
- cargar-imagenes-productos.py

## God Nodes (most connected - your core abstractions)
1. `api_request()` - 9 edges
2. `main()` - 9 edges
3. `main()` - 8 edges
4. `main()` - 8 edges
5. `main()` - 7 edges
6. `Deploy del tema a Shopify` - 7 edges
7. `cmd_activar()` - 6 edges
8. `main()` - 5 edges
9. `keys_from_git()` - 5 edges
10. `construir_story()` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "conciliar-inventario.py"
Cohesion: 0.14
Nodes (20): api_get(), build_barcode_map(), build_sku_map(), build_title_index(), fetch_all_products(), find_by_name(), main(), next_page_url() (+12 more)

### Community 1 - "deploy-shopify.py"
Cohesion: 0.18
Nodes (17): all_theme_keys(), api_request(), git(), keys_from_git(), main(), orden_de_subida(), Claves de tema cambiadas segun git (commit indicado + working tree)., Texto -> (str, payload). Binario -> (bytes, payload con attachment). (+9 more)

### Community 2 - "Deploy del tema a Shopify"
Cohesion: 0.25
Nodes (7): Automatico en cada push, Deploy del tema a Shopify, Detalles que costaron tiempo (no repetirlos), Por que existe esto, Que NO sube (a proposito), Renovar el token, Uso rapido

### Community 3 - "meta-ads.py"
Cohesion: 0.20
Nodes (21): datetime, api_request(), cmd_activar(), cmd_activos(), cmd_crear_campania(), cmd_listar(), cmd_pausar(), cmd_presupuesto() (+13 more)

### Community 4 - "sincronizar-canal-meta.py"
Cohesion: 0.21
Nodes (14): os, re, compact(), main(), Regenera los datos del mapa 3D del codigo a partir del grafo de Graphify. El…, aplicar(), es_prohibido(), gql() (+6 more)

### Community 5 - "vincular-codigo-b1.py"
Cohesion: 0.36
Nodes (8): openpyxl, actualizar_barcode(), api_request(), fetch_all_products(), leer_conteo(), main(), next_page_url(), Guarda el "Codigo B1" del POS en el campo `barcode` de cada producto de…

### Community 6 - "cargar-fichas-tecnicas.py"
Cohesion: 0.19
Nodes (15): api(), catalogo_por_handle(), leer_metafield(), main(), parsear_documento(), Carga el metafield `custom.especificaciones` (ficha tecnica) en los productos…, Devuelve [(handle, titulo, [lineas]), ...] desde el .md., {handle: product_id} de todo el catalogo, paginado. (+7 more)

### Community 8 - "instalar-entorno.sh"
Cohesion: 0.39
Nodes (7): bien(), falla(), MERCADOS, omite(), paso(), PLUGINS, instalar-entorno.sh script

### Community 10 - "verificar-herramental.sh"
Cohesion: 0.83
Nodes (3): instalar_de(), marketplace_de(), verificar-herramental.sh script

### Community 11 - "generar-carta-bienvenida.py"
Cohesion: 0.14
Nodes (18): construir_story(), estilos(), generar_hoja_imprimible(), generar_tarjeta_unica(), main(), La lista de flowables de UNA carta. Se reutiliza tal cual para la tarjeta de…, La pieza de referencia: una sola tarjeta, media carta vertical., Carta horizontal (11x8.5) con DOS copias lado a lado -- imprimir y cortar por… (+10 more)

### Community 12 - "prueba-tarjetas-coleccion.py"
Cohesion: 0.23
Nodes (11): argparse, armar_repro(), bajar(), buscar_chrome(), main(), medir(), Prueba de regresion: ninguna tarjeta de producto debe salirse de su columna.…, Descarga la coleccion y sus CSS, y sustituye brand-tokens.css por el del repo. (+3 more)

### Community 13 - "cargar-imagenes-productos.py"
Cohesion: 0.19
Nodes (14): base64, api(), catalogo_por_handle(), crear_carpetas(), dimensiones(), main(), parsear_documento(), Mapa handle -> id, paginando todo el catalogo. (+6 more)

## Knowledge Gaps
- **8 isolated node(s):** `MERCADOS`, `PLUGINS`, `Por que existe esto`, `Uso rapido`, `Automatico en cada push` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 61 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 7 inferred relationships involving `main()` (e.g. with `cmd_activar()` and `cmd_activos()`) actually correct?**
  _`main()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `MERCADOS`, `PLUGINS`, `Por que existe esto` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `conciliar-inventario.py` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `generar-carta-bienvenida.py` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._