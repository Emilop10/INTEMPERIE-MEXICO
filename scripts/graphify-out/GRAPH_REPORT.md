# Graph Report - scripts  (2026-09-15)

## Corpus Check
- 13 files · ~34,421 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 118 nodes · 188 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `74b2024d`
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
- crear-combos.py
- instalar-entorno.sh
- rebuild-mapa-3d.py
- verificar-herramental.sh
- generar-carta-bienvenida.py
- prueba-tarjetas-coleccion.py

## God Nodes (most connected - your core abstractions)
1. `api_request()` - 9 edges
2. `main()` - 9 edges
3. `main()` - 8 edges
4. `main()` - 8 edges
5. `Deploy del tema a Shopify` - 7 edges
6. `cmd_activar()` - 6 edges
7. `main()` - 5 edges
8. `keys_from_git()` - 5 edges
9. `construir_story()` - 5 edges
10. `instalar-entorno.sh script` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 1 thin omitted)

### Community 0 - "conciliar-inventario.py"
Cohesion: 0.23
Nodes (14): api_get(), build_barcode_map(), build_sku_map(), build_title_index(), fetch_all_products(), find_by_name(), main(), next_page_url() (+6 more)

### Community 1 - "deploy-shopify.py"
Cohesion: 0.22
Nodes (15): all_theme_keys(), api_request(), git(), keys_from_git(), main(), orden_de_subida(), Claves de tema cambiadas segun git (commit indicado + working tree)., Texto -> (str, payload). Binario -> (bytes, payload con attachment). (+7 more)

### Community 2 - "Deploy del tema a Shopify"
Cohesion: 0.25
Nodes (7): Automatico en cada push, Deploy del tema a Shopify, Detalles que costaron tiempo (no repetirlos), Por que existe esto, Que NO sube (a proposito), Renovar el token, Uso rapido

### Community 3 - "meta-ads.py"
Cohesion: 0.23
Nodes (19): api_request(), cmd_activar(), cmd_activos(), cmd_crear_campania(), cmd_listar(), cmd_pausar(), cmd_presupuesto(), cmd_reporte() (+11 more)

### Community 4 - "sincronizar-canal-meta.py"
Cohesion: 0.50
Nodes (7): aplicar(), es_prohibido(), gql(), main(), Prohibido por coleccion O por nombre. La red de colecciones sola NO alcanza, y…, resolver_canal(), traer_productos()

### Community 5 - "vincular-codigo-b1.py"
Cohesion: 0.52
Nodes (6): actualizar_barcode(), api_request(), fetch_all_products(), leer_conteo(), main(), next_page_url()

### Community 6 - "cargar-fichas-tecnicas.py"
Cohesion: 0.43
Nodes (7): api(), catalogo_por_handle(), leer_metafield(), main(), parsear_documento(), Devuelve [(handle, titulo, [lineas]), ...] desde el .md., {handle: product_id} de todo el catalogo, paginado.

### Community 7 - "crear-combos.py"
Cohesion: 1.00
Nodes (3): api(), buscar(), main()

### Community 8 - "instalar-entorno.sh"
Cohesion: 0.39
Nodes (7): bien(), falla(), MERCADOS, omite(), paso(), PLUGINS, instalar-entorno.sh script

### Community 10 - "verificar-herramental.sh"
Cohesion: 0.83
Nodes (3): instalar_de(), marketplace_de(), verificar-herramental.sh script

### Community 11 - "generar-carta-bienvenida.py"
Cohesion: 0.33
Nodes (9): construir_story(), estilos(), generar_hoja_imprimible(), generar_tarjeta_unica(), main(), La lista de flowables de UNA carta. Se reutiliza tal cual para la tarjeta de…, La pieza de referencia: una sola tarjeta, media carta vertical., Carta horizontal (11x8.5) con DOS copias lado a lado -- imprimir y cortar por… (+1 more)

### Community 12 - "prueba-tarjetas-coleccion.py"
Cohesion: 0.48
Nodes (6): armar_repro(), bajar(), buscar_chrome(), main(), medir(), Descarga la coleccion y sus CSS, y sustituye brand-tokens.css por el del repo.

## Knowledge Gaps
- **8 isolated node(s):** `MERCADOS`, `PLUGINS`, `Por que existe esto`, `Uso rapido`, `Automatico en cada push` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 29 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 7 inferred relationships involving `main()` (e.g. with `cmd_activar()` and `cmd_activos()`) actually correct?**
  _`main()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `MERCADOS`, `PLUGINS`, `Por que existe esto` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._