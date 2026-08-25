#!/usr/bin/env python3
"""
Carga el metafield `custom.especificaciones` (ficha tecnica) en los productos
del conjunto de Meta, leyendo los datos de FICHAS-TECNICAS-PENDIENTES.md.

Uso:
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-fichas-tecnicas.py --dry-run
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-fichas-tecnicas.py

Variables de entorno:
    SHOPIFY_ADMIN_TOKEN  (obligatoria) token Admin API con write_products
    SHOPIFY_STORE        dominio myshopify (default: wfuxvx-yn.myshopify.com)

Ver INSTRUCTIVO-CREDENCIALES-SHOPIFY.md si falta el token.

El metafield es de tipo `list.single_line_text_field`, asi que el `value`
va como un ARRAY JSON de strings, una entrada por renglon de la ficha —
no como un texto con saltos de linea. El tema (snippets/ficha-tecnica.liquid)
parte cada renglon en el primer ':' para pintar una tabla de dos columnas.

Fuente de datos: FICHAS-TECNICAS-PENDIENTES.md. Cada producto es un bloque
`### Titulo` + linea con `/products/handle` + un bloque ``` con las lineas.
Se parsea de ahi a proposito, en vez de duplicar los datos aqui: asi el
documento que revisa el dueno y lo que se sube no se pueden desincronizar.
"""

import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

API_VERSION = "2024-10"
NAMESPACE = "custom"
KEY = "especificaciones"
METAFIELD_TYPE = "list.single_line_text_field"
DOC = "FICHAS-TECNICAS-PENDIENTES.md"


def api(method, path, token, store, body=None):
    url = f"https://{store}/admin/api/{API_VERSION}{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-Shopify-Access-Token", token)
    req.add_header("Content-Type", "application/json")
    for intento in range(5):
        try:
            with urllib.request.urlopen(req) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            # 429 = limite de tasa de Shopify. Respeta Retry-After y reintenta.
            if e.code == 429 and intento < 4:
                espera = float(e.headers.get("Retry-After", 2))
                time.sleep(espera)
                continue
            raise RuntimeError(f"{method} {path} -> {e.code}: {e.read().decode()[:300]}")
    raise RuntimeError(f"{method} {path}: agotados los reintentos")


def parsear_documento(ruta):
    """Devuelve [(handle, titulo, [lineas]), ...] desde el .md."""
    texto = open(ruta, encoding="utf-8").read()
    # Cada bloque: ### Titulo ... `/products/handle` ... ```lineas```
    patron = re.compile(
        r"^### (?P<titulo>.+?)\n"          # encabezado del producto
        r"(?:(?!^###).)*?"                  # lo que haya en medio (nota opcional)
        r"`/products/(?P<handle>[a-z0-9\-]+)`\n"
        r"(?:(?!^###).)*?"
        r"```\n(?P<cuerpo>.*?)```",
        re.S | re.M,
    )
    items = []
    for m in patron.finditer(texto):
        lineas = [l.strip() for l in m.group("cuerpo").splitlines() if l.strip()]
        # Nunca se sube un dato marcado como faltante.
        lineas = [l for l in lineas if "[FALTA]" not in l]
        if lineas:
            items.append((m.group("handle"), m.group("titulo").strip(), lineas))
    return items


def catalogo_por_handle(token, store):
    """{handle: product_id} de todo el catalogo, paginado."""
    mapa = {}
    url = f"/products.json?limit=250&fields=id,handle"
    while url:
        full = f"https://{store}/admin/api/{API_VERSION}{url}"
        req = urllib.request.Request(full)
        req.add_header("X-Shopify-Access-Token", token)
        with urllib.request.urlopen(req) as r:
            datos = json.loads(r.read().decode())
            link = r.headers.get("Link", "")
        for p in datos["products"]:
            mapa[p["handle"]] = p["id"]
        sig = re.search(r'<[^>]*[?&](page_info=[^>&]+)[^>]*>;\s*rel="next"', link)
        url = f"/products.json?limit=250&fields=id,handle&{sig.group(1)}" if sig else None
    return mapa


def leer_metafield(token, store, product_id):
    r = api("GET", f"/products/{product_id}/metafields.json", token, store)
    for mf in r.get("metafields", []):
        if mf["namespace"] == NAMESPACE and mf["key"] == KEY:
            return mf
    return None


def main():
    dry = "--dry-run" in sys.argv
    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not token:
        sys.exit("Falta SHOPIFY_ADMIN_TOKEN. Ver INSTRUCTIVO-CREDENCIALES-SHOPIFY.md")
    store = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")

    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    items = parsear_documento(os.path.join(raiz, DOC))
    print(f"{len(items)} productos con ficha en {DOC}")

    print("Descargando catalogo...")
    mapa = catalogo_por_handle(token, store)
    print(f"{len(mapa)} productos en la tienda\n")

    faltantes = [h for h, _, _ in items if h not in mapa]
    if faltantes:
        print(f"!! {len(faltantes)} handles NO existen en la tienda; se omiten:")
        for h in faltantes:
            print("   ", h)
        print()

    escritos = nuevos = actualizados = iguales = errores = 0
    for handle, titulo, lineas in items:
        pid = mapa.get(handle)
        if not pid:
            continue

        actual = leer_metafield(token, store, pid)
        if actual and json.loads(actual["value"]) == lineas:
            print(f"  = {titulo[:52]:54} sin cambios")
            iguales += 1
            continue

        etiqueta = "actualiza" if actual else "crea"
        if dry:
            print(f"  {etiqueta:9} {titulo[:52]:54} ({len(lineas)} lineas)")
            continue

        cuerpo = {
            "metafield": {
                "namespace": NAMESPACE,
                "key": KEY,
                "type": METAFIELD_TYPE,
                "value": json.dumps(lineas, ensure_ascii=False),
            }
        }
        try:
            api("POST", f"/products/{pid}/metafields.json", token, store, cuerpo)
        except RuntimeError as e:
            print(f"  ERROR {titulo[:48]}: {e}")
            errores += 1
            continue

        # Relectura de verificacion: no se da por bueno lo que no se confirma.
        verif = leer_metafield(token, store, pid)
        if not verif or json.loads(verif["value"]) != lineas:
            print(f"  ERROR {titulo[:48]}: no verifico tras escribir")
            errores += 1
            continue

        print(f"  OK {etiqueta:9} {titulo[:52]:54} ({len(lineas)} lineas)")
        escritos += 1
        if actual:
            actualizados += 1
        else:
            nuevos += 1
        time.sleep(0.55)  # 2 llamadas por producto, holgado bajo el limite REST

    print()
    if dry:
        print("DRY-RUN: no se escribio nada.")
    else:
        print(f"Escritos y verificados: {escritos} ({nuevos} nuevos, {actualizados} actualizados)")
    print(f"Sin cambios: {iguales} | Errores: {errores} | Handles inexistentes: {len(faltantes)}")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())
