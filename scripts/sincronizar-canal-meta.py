#!/usr/bin/env python3
"""Deja el canal "Facebook & Instagram" de Shopify con los productos correctos.

Por que existe
--------------
Meta prohibe anunciar armas, municiones y accesorios que modifiquen su
funcion. El riesgo no es que rechacen un anuncio: es el baneo permanente de
la cuenta publicitaria y del Business Manager completo. La unica forma
confiable de que un producto prohibido no llegue a los anuncios es que no
este publicado al canal que alimenta el catalogo de Meta.

Ese estado se hizo a mano el 12 de agosto de 2026 desde el admin de Shopify
(publicar todo, luego excluir 59). Funciono, pero no se sostiene solo: cada
producto nuevo que se agrega a una coleccion prohibida entra publicado por
defecto. Este script vuelve a dejar el canal correcto en un comando, asi que
se puede correr cada vez que cambie el catalogo.

Es idempotente: solo toca los productos cuyo estado difiere del deseado.
Correrlo dos veces seguidas no hace nada la segunda vez.

Uso:
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/sincronizar-canal-meta.py --dry-run
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/sincronizar-canal-meta.py

Variables de entorno:
    SHOPIFY_ADMIN_TOKEN  (obligatoria) token Admin API con read_products y
                         write_publications
    SHOPIFY_STORE        dominio myshopify (default: wfuxvx-yn.myshopify.com)
"""

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

API_VERSION = "2024-01"

# Colecciones cuyos productos NO se publican al canal de Meta.
#
# Son los nombres de las colecciones de nivel superior, no de las
# subcolecciones: "Calibre 4.5mm", "Airsoft 6mm", etc. cuelgan de estas y
# quedan cubiertas por pertenencia. Ojo con "Miras y Binoculares": esa NO
# entra aqui porque los binoculares y monoculares si son anunciables — la
# prohibida es solo su subcoleccion "Miras Telescopicas".
COLECCIONES_PROHIBIDAS = {
    "Rifles y Pistolas de Aire",
    "Diábolos y Municiones",
    "Miras Telescópicas",
}

# Canal "Facebook & Instagram" de esta tienda. Si se reinstala la app, el
# id cambia — el script lo vuelve a resolver por nombre y avisa.
CANAL_META = "Facebook & Instagram"


def gql(query, token, store, variables=None):
    url = f"https://{store}/admin/api/{API_VERSION}/graphql.json"
    body = json.dumps({"query": query, "variables": variables or {}}).encode()
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("X-Shopify-Access-Token", token)
    req.add_header("Content-Type", "application/json")
    for intento in range(5):
        try:
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read())
            if "errors" in data:
                print(f"Error GraphQL: {json.dumps(data['errors'])[:500]}", file=sys.stderr)
                sys.exit(1)
            return data["data"]
        except urllib.error.HTTPError as e:
            if e.code == 429:  # throttle: backoff y reintento
                time.sleep(2 * (intento + 1))
                continue
            print(f"Error HTTP {e.code}: {e.read().decode()[:500]}", file=sys.stderr)
            sys.exit(1)
    print("Se agotaron los reintentos contra la API de Shopify", file=sys.stderr)
    sys.exit(1)


def resolver_canal(token, store):
    data = gql("{ publications(first: 30) { edges { node { id name } } } }", token, store)
    for edge in data["publications"]["edges"]:
        if edge["node"]["name"] == CANAL_META:
            return edge["node"]["id"]
    print(
        f'No existe el canal "{CANAL_META}" en esta tienda.\n'
        "Si se desinstalo la app de Facebook & Instagram, hay que reinstalarla\n"
        "antes de correr este script (ver INSTRUCTIVO-FACEBOOK-ADS.md).",
        file=sys.stderr,
    )
    sys.exit(1)


def traer_productos(token, store, canal_id):
    query = """
    query($cursor: String, $pub: ID!) {
      products(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node {
          id title status
          collections(first: 20) { edges { node { title } } }
          publishedOnPublication(publicationId: $pub)
        } }
      }
    }
    """
    cursor, productos = None, []
    while True:
        data = gql(query, token, store, {"cursor": cursor, "pub": canal_id})
        page = data["products"]
        for edge in page["edges"]:
            nodo = edge["node"]
            productos.append(
                {
                    "gid": nodo["id"],
                    "titulo": nodo["title"],
                    "status": nodo["status"],
                    "colecciones": {c["node"]["title"] for c in nodo["collections"]["edges"]},
                    "publicado": nodo["publishedOnPublication"],
                }
            )
        if not page["pageInfo"]["hasNextPage"]:
            return productos
        cursor = page["pageInfo"]["endCursor"]


def es_prohibido(producto):
    return bool(COLECCIONES_PROHIBIDAS & producto["colecciones"])


MUT_PUBLICAR = """
mutation($id: ID!, $pub: ID!) {
  publishablePublish(id: $id, input: {publicationId: $pub}) {
    userErrors { field message }
  }
}
"""

MUT_DESPUBLICAR = """
mutation($id: ID!, $pub: ID!) {
  publishableUnpublish(id: $id, input: {publicationId: $pub}) {
    userErrors { field message }
  }
}
"""


def aplicar(producto, publicar, token, store, canal_id):
    mutacion = MUT_PUBLICAR if publicar else MUT_DESPUBLICAR
    clave = "publishablePublish" if publicar else "publishableUnpublish"
    data = gql(mutacion, token, store, {"id": producto["gid"], "pub": canal_id})
    errores = data[clave]["userErrors"]
    if errores:
        print(f"  ERROR en {producto['titulo'][:50]}: {errores}", file=sys.stderr)
        return False
    return True


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Muestra que cambiaria, sin tocar nada en Shopify",
    )
    args = parser.parse_args()

    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not token:
        print("Falta la variable de entorno SHOPIFY_ADMIN_TOKEN", file=sys.stderr)
        sys.exit(1)
    store = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")

    print(f"Tienda : {store}")
    canal_id = resolver_canal(token, store)
    print(f"Canal  : {CANAL_META} ({canal_id.split('/')[-1]})")

    productos = traer_productos(token, store, canal_id)
    prohibidos = [p for p in productos if es_prohibido(p)]
    permitidos = [p for p in productos if not es_prohibido(p)]

    # Solo actuamos donde el estado real difiere del deseado.
    a_despublicar = [p for p in prohibidos if p["publicado"]]
    a_publicar = [p for p in permitidos if not p["publicado"]]

    print(f"\n{len(productos)} productos: {len(permitidos)} anunciables, {len(prohibidos)} prohibidos")
    print(f"  Por despublicar (prohibidos que estan en el canal): {len(a_despublicar)}")
    print(f"  Por publicar    (anunciables fuera del canal)     : {len(a_publicar)}")

    if not a_despublicar and not a_publicar:
        print("\nEl canal ya esta correcto. Nada que hacer.")
        return

    if args.dry_run:
        print("\n--dry-run: no se toco nada. Ejemplos de lo que haria:")
        for p in a_despublicar[:10]:
            print(f"  - despublicar: {p['titulo'][:65]}")
        for p in a_publicar[:10]:
            print(f"  + publicar   : {p['titulo'][:65]}")
        return

    # Primero se despublica lo prohibido: si el proceso se corta a medias,
    # el estado intermedio nunca deja un arma expuesta al catalogo de Meta.
    print()
    ok = err = 0
    for p in a_despublicar:
        if aplicar(p, False, token, store, canal_id):
            ok += 1
        else:
            err += 1
        time.sleep(0.2)
    if a_despublicar:
        print(f"Despublicados: {ok} ({err} errores)")

    ok = err = 0
    for p in a_publicar:
        if aplicar(p, True, token, store, canal_id):
            ok += 1
        else:
            err += 1
        time.sleep(0.2)
    if a_publicar:
        print(f"Publicados: {ok} ({err} errores)")

    print("\nListo. El canal quedo sincronizado.")


if __name__ == "__main__":
    main()
