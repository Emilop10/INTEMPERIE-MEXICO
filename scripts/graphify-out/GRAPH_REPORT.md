# Graph Report - scripts  (2026-09-04)

## Corpus Check
- 9 files · ~9,348 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 89 nodes · 147 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `44c2b880`
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
- rebuild-mapa-3d.py

## God Nodes (most connected - your core abstractions)
1. `api_request()` - 9 edges
2. `main()` - 9 edges
3. `main()` - 8 edges
4. `main()` - 8 edges
5. `Deploy del tema a Shopify` - 7 edges
6. `cmd_activar()` - 6 edges
7. `main()` - 5 edges
8. `keys_from_git()` - 5 edges
9. `cmd_reporte()` - 5 edges
10. `cmd_pausar()` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (9 total, 1 thin omitted)

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

## Knowledge Gaps
- **6 isolated node(s):** `Por que existe esto`, `Uso rapido`, `Automatico en cada push`, `Que NO sube (a proposito)`, `Detalles que costaron tiempo (no repetirlos)` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 23 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 7 inferred relationships involving `main()` (e.g. with `cmd_activar()` and `cmd_activos()`) actually correct?**
  _`main()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Por que existe esto`, `Uso rapido`, `Automatico en cada push` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._