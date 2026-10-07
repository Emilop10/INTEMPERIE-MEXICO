# Graph Report - scripts  (2026-10-07)

## Corpus Check
- 16 files · ~38,571 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ttf 3)

## Summary
- 201 nodes · 459 edges · 12 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e0d0510`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- conciliar-inventario.py
- deploy-shopify.py
- Deploy del tema a Shopify
- meta-ads.py
- json
- fotos-kits.py
- sys
- instalar-entorno.sh
- verificar-herramental.sh
- generar-carta-bienvenida.py
- prueba-tarjetas-coleccion.py
- cargar-imagenes-productos.py

## God Nodes (most connected - your core abstractions)
1. `main()` - 14 edges
2. `main()` - 11 edges
3. `api_request()` - 11 edges
4. `main()` - 10 edges
5. `main()` - 10 edges
6. `main()` - 10 edges
7. `main()` - 8 edges
8. `tarjeta()` - 8 edges
9. `main()` - 8 edges
10. `cmd_crear_campania()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `parsear_documento()` --calls--> `re`  [EXTRACTED]
  cargar-fichas-tecnicas.py →   _Bridges community 4 → community 13_
- `main()` --calls--> `sys`  [EXTRACTED]
  cargar-fichas-tecnicas.py →   _Bridges community 4 → community 6_
- `main()` --calls--> `argparse`  [EXTRACTED]
  cargar-imagenes-productos.py →   _Bridges community 13 → community 12_
- `api_get()` --calls--> `json`  [EXTRACTED]
  conciliar-inventario.py →   _Bridges community 0 → community 4_
- `normalize_name()` --calls--> `re`  [EXTRACTED]
  conciliar-inventario.py →   _Bridges community 0 → community 13_

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "conciliar-inventario.py"
Cohesion: 0.15
Nodes (10): api_get(), build_barcode_map(), build_sku_map(), build_title_index(), fetch_all_products(), find_by_name(), main(), next_page_url() (+2 more)

### Community 1 - "deploy-shopify.py"
Cohesion: 0.19
Nodes (10): all_theme_keys(), api_request(), git(), keys_from_git(), main(), orden_de_subida(), read_local(), read_remote() (+2 more)

### Community 2 - "Deploy del tema a Shopify"
Cohesion: 0.25
Nodes (7): Automatico en cada push, Deploy del tema a Shopify, Detalles que costaron tiempo (no repetirlos), Por que existe esto, Que NO sube (a proposito), Renovar el token, Uso rapido

### Community 3 - "meta-ads.py"
Cohesion: 0.20
Nodes (15): api_request(), cmd_activar(), cmd_activos(), cmd_crear_campania(), cmd_listar(), cmd_pausar(), cmd_presupuesto(), cmd_reporte() (+7 more)

### Community 4 - "json"
Cohesion: 0.14
Nodes (17): api(), catalogo_por_handle(), leer_metafield(), main(), parsear_documento(), api(), buscar(), main() (+9 more)

### Community 5 - "fotos-kits.py"
Cohesion: 0.19
Nodes (11): api(), bajar(), corto(), datos_pieza(), enderezar(), envolver(), fuente(), main() (+3 more)

### Community 6 - "sys"
Cohesion: 0.42
Nodes (6): aplicar(), es_prohibido(), gql(), main(), resolver_canal(), traer_productos()

### Community 8 - "instalar-entorno.sh"
Cohesion: 0.39
Nodes (7): bien(), falla(), MERCADOS, omite(), paso(), PLUGINS, instalar-entorno.sh script

### Community 10 - "verificar-herramental.sh"
Cohesion: 0.83
Nodes (3): instalar_de(), marketplace_de(), verificar-herramental.sh script

### Community 11 - "generar-carta-bienvenida.py"
Cohesion: 0.14
Nodes (6): construir_story(), estilos(), generar_hoja_imprimible(), generar_tarjeta_unica(), main(), registrar_fuentes()

### Community 12 - "prueba-tarjetas-coleccion.py"
Cohesion: 0.33
Nodes (5): armar_repro(), bajar(), buscar_chrome(), main(), medir()

### Community 13 - "cargar-imagenes-productos.py"
Cohesion: 0.13
Nodes (13): api(), catalogo_por_handle(), crear_carpetas(), dimensiones(), graphql(), main(), multipart(), parsear_documento() (+5 more)

## Knowledge Gaps
- **8 isolated node(s):** `MERCADOS`, `PLUGINS`, `Por que existe esto`, `Uso rapido`, `Automatico en cada push` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 66 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `cargar-imagenes-productos.py` to `prueba-tarjetas-coleccion.py`, `json`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `MERCADOS`, `PLUGINS`, `Por que existe esto` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `json` be split into smaller, more focused modules?**
  _Cohesion score 0.14015151515151514 - nodes in this community are weakly interconnected._
- **Why does `main()` connect `generar-carta-bienvenida.py` to `cargar-imagenes-productos.py`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Should `generar-carta-bienvenida.py` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Why does `api_request()` connect `meta-ads.py` to `json`, `sys`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `cargar-imagenes-productos.py` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._