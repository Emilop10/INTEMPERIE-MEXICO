#!/usr/bin/env python3
"""Regenera los datos del mapa 3D del codigo a partir del grafo de Graphify.

El mapa (`tema-shopify/graphify-out/intemperie-mapa-codigo-3d.html`) lleva los
datos embebidos en un `var DATA = {...};`. Se construyo a mano, asi que cada vez
que el codigo cambiaba el mapa quedaba desactualizado sin forma practica de
refrescarlo. Este script hace justamente eso: lee `graph.json` (que Graphify
regenera con `graphify update .`) y reescribe solo ese bloque, dejando intacto
el resto del HTML — motor de fisicas, camara, estilos y panel lateral.

Uso:
    graphify update .                        # dentro de tema-shopify/
    python3 scripts/rebuild-mapa-3d.py
"""

import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRAPH_OUT = os.path.join(REPO_ROOT, "tema-shopify", "graphify-out")
GRAPH_JSON = os.path.join(GRAPH_OUT, "graph.json")
MAP_HTML = os.path.join(GRAPH_OUT, "intemperie-mapa-codigo-3d.html")

# El HTML usa claves de una letra para que el blob embebido no infle el archivo.
NODE_KEYS = {"id": "id", "label": "l", "file_type": "t", "community": "c",
             "source_file": "f", "source_location": "loc"}
LINK_KEYS = {"source": "s", "target": "t", "relation": "r"}


def compact(record, mapping):
    out = {}
    for origen, destino in mapping.items():
        if origen in record and record[origen] is not None:
            out[destino] = record[origen]
    return out


def main():
    for path in (GRAPH_JSON, MAP_HTML):
        if not os.path.isfile(path):
            sys.exit(f"No existe: {path}")

    graph = json.load(open(GRAPH_JSON, encoding="utf-8"))
    data = {
        "nodes": [compact(n, NODE_KEYS) for n in graph["nodes"]],
        "links": [compact(e, LINK_KEYS) for e in graph["links"]],
    }

    html = open(MAP_HTML, encoding="utf-8").read()
    pattern = re.compile(r"var DATA = (\{.*?\});\n", re.S)
    match = pattern.search(html)
    if not match:
        sys.exit("No se encontro el bloque `var DATA = {...};` en el HTML.")

    anterior = json.loads(match.group(1))
    blob = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    html = html[: match.start()] + f"var DATA = {blob};\n" + html[match.end():]

    with open(MAP_HTML, "w", encoding="utf-8") as handle:
        handle.write(html)

    print(f"Nodos    : {len(anterior['nodes'])} -> {len(data['nodes'])}")
    print(f"Conexiones: {len(anterior['links'])} -> {len(data['links'])}")
    print(f"Commit del grafo: {graph.get('built_at_commit', '?')}")
    print(f"Actualizado: {os.path.relpath(MAP_HTML, REPO_ROOT)}")


if __name__ == "__main__":
    main()
