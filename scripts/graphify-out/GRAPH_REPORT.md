# Graph Report - scripts  (2026-10-20)

## Corpus Check
- 19 files · ~41,874 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ttf 3)

## Summary
- 227 nodes · 534 edges · 14 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1a69d1bd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- conciliar-inventario.py
- deploy-shopify.py
- Deploy del tema a Shopify
- meta-ads.py
- json
- fotos-kits.py
- campana-kits-oct19.py
- crear-kits.py
- instalar-entorno.sh
- prueba-tarjetas-coleccion.py
- verificar-herramental.sh
- generar-carta-bienvenida.py
- sys
- cargar-imagenes-productos.py

## God Nodes (most connected - your core abstractions)
1. `main()` - 14 edges
2. `main()` - 12 edges
3. `api_request()` - 11 edges
4. `main()` - 10 edges
5. `main()` - 10 edges
6. `main()` - 10 edges
7. `main()` - 9 edges
8. `main()` - 8 edges
9. `main()` - 8 edges
10. `tarjeta()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `meta()` --calls--> `json`  [EXTRACTED]
  campana-kits-oct19.py →   _Bridges community 6 → community 4_
- `meta()` --calls--> `sys`  [EXTRACTED]
  campana-kits-oct19.py →   _Bridges community 6 → community 12_
- `subir_imagen()` --calls--> `base64`  [EXTRACTED]
  campana-kits-oct19.py →   _Bridges community 6 → community 1_
- `subir_imagen()` --calls--> `io`  [EXTRACTED]
  campana-kits-oct19.py →   _Bridges community 6 → community 5_
- `main()` --calls--> `json`  [EXTRACTED]
  campana-retargeting-oct20.py →   _Bridges community 12 → community 4_

## Import Cycles
- None detected.

## Communities (14 total, 0 thin omitted)

### Community 0 - "conciliar-inventario.py"
Cohesion: 0.14
Nodes (11): api_get(), build_barcode_map(), build_sku_map(), build_title_index(), fetch_all_products(), find_by_name(), hoja_cambios(), main() (+3 more)

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
Cohesion: 0.16
Nodes (16): api(), catalogo_por_handle(), leer_metafield(), main(), parsear_documento(), api(), buscar(), main() (+8 more)

### Community 5 - "fotos-kits.py"
Cohesion: 0.22
Nodes (11): api(), bajar(), corto(), datos_pieza(), enderezar(), envolver(), fuente(), main() (+3 more)

### Community 6 - "campana-kits-oct19.py"
Cohesion: 0.23
Nodes (8): cargar_productos(), main(), meta(), pesos(), shopify(), subir_imagen(), tarjeta(), textos()

### Community 7 - "crear-kits.py"
Cohesion: 0.42
Nodes (6): api(), main(), cuerpo_html(), tachado(), producto(), revisar_existencias()

### Community 8 - "instalar-entorno.sh"
Cohesion: 0.39
Nodes (7): bien(), falla(), MERCADOS, omite(), paso(), PLUGINS, instalar-entorno.sh script

### Community 9 - "prueba-tarjetas-coleccion.py"
Cohesion: 0.33
Nodes (5): armar_repro(), bajar(), buscar_chrome(), main(), medir()

### Community 10 - "verificar-herramental.sh"
Cohesion: 0.83
Nodes (3): instalar_de(), marketplace_de(), verificar-herramental.sh script

### Community 11 - "generar-carta-bienvenida.py"
Cohesion: 0.14
Nodes (6): construir_story(), estilos(), generar_hoja_imprimible(), generar_tarjeta_unica(), main(), registrar_fuentes()

### Community 12 - "sys"
Cohesion: 0.25
Nodes (8): main(), textos(), aplicar(), es_prohibido(), gql(), main(), resolver_canal(), traer_productos()

### Community 13 - "cargar-imagenes-productos.py"
Cohesion: 0.14
Nodes (13): api(), catalogo_por_handle(), crear_carpetas(), dimensiones(), graphql(), main(), multipart(), parsear_documento() (+5 more)

## Knowledge Gaps
- **8 isolated node(s):** `MERCADOS`, `PLUGINS`, `Por que existe esto`, `Uso rapido`, `Automatico en cada push` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 71 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `cargar-imagenes-productos.py` to `prueba-tarjetas-coleccion.py`, `json`, `deploy-shopify.py`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `MERCADOS`, `PLUGINS`, `Por que existe esto` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `conciliar-inventario.py` be split into smaller, more focused modules?**
  _Cohesion score 0.1422924901185771 - nodes in this community are weakly interconnected._
- **Why does `main()` connect `generar-carta-bienvenida.py` to `cargar-imagenes-productos.py`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `generar-carta-bienvenida.py` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Why does `main()` connect `crear-kits.py` to `sys`, `json`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Should `cargar-imagenes-productos.py` be split into smaller, more focused modules?**
  _Cohesion score 0.13675213675213677 - nodes in this community are weakly interconnected._