# Graph Report - scripts  (2026-08-18)

## Corpus Check
- 7 files · ~7,355 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 75 nodes · 126 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec9b9993`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- conciliar-inventario.py
- deploy-shopify.py
- Deploy del tema a Shopify
- main
- sincronizar-canal-meta.py
- vincular-codigo-b1.py
- api_request
- meta-ads.py
- _resolve_business_assets
- rebuild-mapa-3d.py

## God Nodes (most connected - your core abstractions)
1. `api_request()` - 9 edges
2. `main()` - 9 edges
3. `main()` - 8 edges
4. `main()` - 7 edges
5. `Deploy del tema a Shopify` - 7 edges
6. `cmd_activar()` - 6 edges
7. `keys_from_git()` - 5 edges
8. `cmd_reporte()` - 5 edges
9. `cmd_pausar()` - 5 edges
10. `_resolve_business_assets()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `main()` --indirect_call--> `cmd_listar()`  [INFERRED]
  meta-ads.py → meta-ads.py  _Bridges community 6 → community 3_
- `main()` --indirect_call--> `cmd_reporte()`  [INFERRED]
  meta-ads.py → meta-ads.py  _Bridges community 7 → community 3_
- `main()` --indirect_call--> `cmd_activos()`  [INFERRED]
  meta-ads.py → meta-ads.py  _Bridges community 8 → community 3_
- `cmd_reporte()` --calls--> `api_request()`  [EXTRACTED]
  meta-ads.py → meta-ads.py  _Bridges community 6 → community 7_
- `_resolve_business_assets()` --calls--> `api_request()`  [EXTRACTED]
  meta-ads.py → meta-ads.py  _Bridges community 6 → community 8_

## Import Cycles
- None detected.

## Communities (10 total, 1 thin omitted)

### Community 0 - "conciliar-inventario.py"
Cohesion: 0.23
Nodes (14): api_get(), build_barcode_map(), build_sku_map(), build_title_index(), fetch_all_products(), find_by_name(), main(), next_page_url() (+6 more)

### Community 1 - "deploy-shopify.py"
Cohesion: 0.25
Nodes (13): all_theme_keys(), api_request(), git(), keys_from_git(), main(), Claves de tema cambiadas segun git (commit indicado + working tree)., Texto -> (str, payload). Binario -> (bytes, payload con attachment)., Contenido actual en la tienda, o None si el archivo no existe alli. (+5 more)

### Community 2 - "Deploy del tema a Shopify"
Cohesion: 0.25
Nodes (7): Automatico en cada push, Deploy del tema a Shopify, Detalles que costaron tiempo (no repetirlos), Por que existe esto, Que NO sube (a proposito), Renovar el token, Uso rapido

### Community 3 - "main"
Cohesion: 0.38
Nodes (7): cmd_crear_campania(), cmd_pausar(), cmd_presupuesto(), main(), Pausar la campaña basta para detener la entrega y el gasto. No hace falta tocar…, _require(), require_env()

### Community 4 - "sincronizar-canal-meta.py"
Cohesion: 0.50
Nodes (7): aplicar(), es_prohibido(), gql(), main(), Prohibido por coleccion O por nombre. La red de colecciones sola NO alcanza, y…, resolver_canal(), traer_productos()

### Community 5 - "vincular-codigo-b1.py"
Cohesion: 0.52
Nodes (6): actualizar_barcode(), api_request(), fetch_all_products(), leer_conteo(), main(), next_page_url()

### Community 6 - "api_request"
Cohesion: 0.40
Nodes (6): api_request(), cmd_activar(), cmd_listar(), _hijos_de_campania(), Devuelve (conjuntos, anuncios) de una campaña., Activa la campaña Y sus conjuntos y anuncios. Activar solo la campaña no…

### Community 7 - "meta-ads.py"
Cohesion: 0.83
Nodes (3): cmd_reporte(), _hace_dias(), _hoy()

### Community 8 - "_resolve_business_assets"
Cohesion: 0.67
Nodes (3): cmd_activos(), Descubre página, cuenta de Instagram, catálogo y pixel del negocio. Solo…, _resolve_business_assets()

## Knowledge Gaps
- **6 isolated node(s):** `Por que existe esto`, `Uso rapido`, `Automatico en cada push`, `Que NO sube (a proposito)`, `Detalles que costaron tiempo (no repetirlos)` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api_request()` connect `api_request` to `_resolve_business_assets`, `main`, `meta-ads.py`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `cmd_activar()` connect `api_request` to `main`, `meta-ads.py`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `main()` (e.g. with `cmd_activar()` and `cmd_activos()`) actually correct?**
  _`main()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Por que existe esto`, `Uso rapido`, `Automatico en cada push` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._