#!/usr/bin/env python3
"""
Sube a Shopify las imágenes de ambiente hechas con IA (Higgsfield, MANUAL §83-§84).

Lee imagenes/imagenes-ia-aprobadas.json: por producto (handle), una lista de
imágenes ya revisadas a mano (marca, color y piezas fieles a la foto real).
La PRIMERA de cada lista queda como portada (posición 1); las demás le siguen
y las fotos que el producto ya tenía quedan detrás, en su mismo orden.
Decisión del dueño, 16 oct: libertad para elegir la portada.

Shopify descarga cada imagen desde la URL de Higgsfield (no se re-sube nada
desde aquí). Idempotente: cada imagen lleva en su `alt` el sufijo
[ia:<n>]; si ya está, se salta. Nunca borra nada.

Uso:
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/subir-imagenes-ia.py            # ensayo, no cambia nada
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/subir-imagenes-ia.py --aplicar  # sube
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LISTA = os.path.join(RAIZ, "imagenes", "imagenes-ia-aprobadas.json")
API_VERSION = "2024-10"
TIENDA = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")


def api(metodo, ruta, token, cuerpo=None):
    url = f"https://{TIENDA}/admin/api/{API_VERSION}/{ruta}"
    datos = json.dumps(cuerpo).encode() if cuerpo is not None else None
    req = urllib.request.Request(url, data=datos, method=metodo, headers={
        "X-Shopify-Access-Token": token, "Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def main():
    aplicar = "--aplicar" in sys.argv
    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not token:
        sys.exit("❌ Falta SHOPIFY_ADMIN_TOKEN")
    lista = json.load(open(LISTA, encoding="utf-8"))
    subidas = saltadas = errores = 0

    for handle, imagenes in lista.items():
        d = api("GET", f"products.json?handle={handle}&fields=id,title,images", token)
        if not d["products"]:
            print(f"❌ No existe {handle}")
            errores += 1
            continue
        p = d["products"][0]
        ya = {i.get("alt") or "" for i in p["images"]}
        print(f"\n{p['title']}  ({len(p['images'])} fotos hoy)")
        for n, img in enumerate(imagenes, start=1):
            marca = f"[ia:{n}]"
            alt = f"{p['title']} — {img['escena']} {marca}"
            if any(marca in a for a in ya):
                print(f"   ⏭️  {n}. {img['escena']} (ya estaba)")
                saltadas += 1
                continue
            print(f"   {'⬆️ ' if aplicar else '· '} posición {n}: {img['escena']}"
                  + ("  ← portada" if n == 1 else ""))
            if not aplicar:
                continue
            try:
                api("POST", f"products/{p['id']}/images.json", token,
                    {"image": {"src": img["url"], "position": n, "alt": alt}})
                subidas += 1
            except urllib.error.HTTPError as e:
                print(f"   ❌ {e.code}: {e.read().decode()[:200]}")
                errores += 1
            time.sleep(0.6)  # límite de la API REST: 2 llamadas por segundo

    modo = "subidas" if aplicar else "por subir (ensayo)"
    print(f"\nImágenes {modo}: {subidas if aplicar else sum(len(v) for v in lista.values()) - saltadas}"
          f" · ya estaban: {saltadas} · errores: {errores}")
    if not aplicar:
        print("Ensayo: no se cambió nada. Para subir, agrega --aplicar.")


if __name__ == "__main__":
    main()
