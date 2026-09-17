#!/usr/bin/env python3
"""
Sube a Shopify las imagenes listadas en IMAGENES-CAMPANA-PENDIENTES.md.

Uso:
    python3 scripts/cargar-imagenes-productos.py --dry-run
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-imagenes-productos.py

Variables de entorno:
    SHOPIFY_ADMIN_TOKEN  (obligatoria salvo en --dry-run) token con write_products
    SHOPIFY_STORE        dominio myshopify (default: wfuxvx-yn.myshopify.com)

Ver INSTRUCTIVO-CREDENCIALES-SHOPIFY.md si falta el token.

Fuente de datos: IMAGENES-CAMPANA-PENDIENTES.md. Cada producto es un bloque
`## N. Titulo` con una linea `- **handle:** `x`` y un bloque ```imagenes con
un renglon por foto:

    nombre-archivo.jpg | TIPO | texto alternativo

Se parsea de ahi a proposito, igual que cargar-fichas-tecnicas.py: asi el
documento que revisa el dueno y lo que se sube no se pueden desincronizar.

Idempotente: el nombre del archivo se guarda dentro del `alt` como sufijo
`[archivo]`, y antes de subir se leen las imagenes que el producto ya tiene.
Si el archivo ya esta arriba, se salta. Nunca borra nada.
"""

import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

API_VERSION = "2024-10"
DOC = "IMAGENES-CAMPANA-PENDIENTES.md"
CARPETA = "imagenes-productos"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAX_BYTES = 20 * 1024 * 1024        # limite duro de Shopify por imagen
AVISO_BYTES = 1024 * 1024           # lo que pide el documento
LADO_ESPERADO = 2048


def api(method, path, token, store, body=None):
    url = f"https://{store}/admin/api/{API_VERSION}{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-Shopify-Access-Token", token)
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read() or "{}")
    except urllib.error.HTTPError as e:
        detalle = e.read().decode("utf-8", "replace")[:400]
        raise SystemExit(f"\nHTTP {e.code} en {method} {path}\n  {detalle}\n")


def parsear_documento(ruta):
    """-> [(handle, titulo, [(archivo, tipo, alt), ...]), ...] en orden."""
    texto = open(ruta, encoding="utf-8").read()
    productos = []
    # cada bloque empieza en "## <numero>. <titulo>"
    partes = re.split(r"^## (\d+)\.\s*(.+)$", texto, flags=re.M)
    for i in range(1, len(partes), 3):
        titulo, cuerpo = partes[i + 1].strip(), partes[i + 2]
        mh = re.search(r"\*\*handle:\*\*\s*`([^`]+)`", cuerpo)
        mb = re.search(r"```imagenes\n(.*?)```", cuerpo, re.S)
        if not (mh and mb):
            continue
        fotos = []
        for linea in mb.group(1).strip().split("\n"):
            campos = [c.strip() for c in linea.split("|")]
            if len(campos) != 3:
                raise SystemExit(f"Renglon mal formado en {titulo}:\n  {linea}")
            fotos.append(tuple(campos))
        productos.append((mh.group(1), titulo, fotos))
    return productos


def catalogo_por_handle(token, store):
    """Mapa handle -> id, paginando todo el catalogo."""
    mapa, url = {}, f"/products.json?limit=250&fields=id,handle"
    while url:
        full = f"https://{store}/admin/api/{API_VERSION}{url}"
        req = urllib.request.Request(full)
        req.add_header("X-Shopify-Access-Token", token)
        with urllib.request.urlopen(req) as r:
            datos = json.loads(r.read())
            enlace = r.headers.get("Link", "")
        for p in datos.get("products", []):
            mapa[p["handle"]] = p["id"]
        m = re.search(r'<[^>]*(/products\.json[^>]*)>;\s*rel="next"', enlace)
        url = m.group(1) if m else None
    return mapa


def dimensiones(ruta):
    """Lado de la imagen sin depender de Pillow, para JPG y PNG."""
    with open(ruta, "rb") as f:
        cab = f.read(32)
        if cab[:8] == b"\x89PNG\r\n\x1a\n":
            return int.from_bytes(cab[16:20], "big"), int.from_bytes(cab[20:24], "big")
        if cab[:2] == b"\xff\xd8":
            f.seek(2)
            while True:
                b = f.read(1)
                if not b:
                    return None
                if b != b"\xff":
                    continue
                marcador = f.read(1)
                while marcador == b"\xff":
                    marcador = f.read(1)
                if marcador[0] in range(0xC0, 0xCF) and marcador[0] not in (0xC4, 0xC8, 0xCC):
                    f.read(3)
                    alto = int.from_bytes(f.read(2), "big")
                    ancho = int.from_bytes(f.read(2), "big")
                    return ancho, alto
                largo = int.from_bytes(f.read(2), "big")
                f.seek(largo - 2, 1)
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="revisa los archivos y no sube nada")
    args = ap.parse_args()

    doc = os.path.join(RAIZ, DOC)
    if not os.path.exists(doc):
        raise SystemExit(f"No encuentro {DOC}")
    productos = parsear_documento(doc)
    print(f"{DOC}: {len(productos)} productos, "
          f"{sum(len(f) for _, _, f in productos)} imagenes listadas\n")

    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    store = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")
    if not token and not args.dry_run:
        raise SystemExit("Falta SHOPIFY_ADMIN_TOKEN. Ver INSTRUCTIVO-CREDENCIALES-SHOPIFY.md")

    mapa = catalogo_por_handle(token, store) if token else {}

    listas = faltantes = ya_estaban = subidas = problemas = 0
    for handle, titulo, fotos in productos:
        print(f"── {titulo}")
        pid = mapa.get(handle)
        if token and not pid:
            print(f"   ⚠ handle no existe en la tienda: {handle}")
            problemas += 1
            continue
        existentes = set()
        if pid:
            for im in api("GET", f"/products/{pid}/images.json", token, store).get("images", []):
                m = re.search(r"\[([^\]]+)\]\s*$", im.get("alt") or "")
                if m:
                    existentes.add(m.group(1))

        for archivo, tipo, alt in fotos:
            ruta = os.path.join(RAIZ, CARPETA, archivo)
            if not os.path.exists(ruta):
                print(f"   · falta      [{tipo:<11}] {archivo}")
                faltantes += 1
                continue
            listas += 1
            tam = os.path.getsize(ruta)
            dim = dimensiones(ruta)
            avisos = []
            if dim and dim[0] != dim[1]:
                avisos.append(f"NO es cuadrada ({dim[0]}x{dim[1]})")
            if dim and dim[0] < LADO_ESPERADO:
                avisos.append(f"menor a {LADO_ESPERADO}px ({dim[0]}px)")
            if tam > AVISO_BYTES:
                avisos.append(f"pesa {tam/1024/1024:.1f} MB")
            if tam > MAX_BYTES:
                print(f"   ✗ {archivo}: excede el limite de Shopify")
                problemas += 1
                continue
            marca = ("  ⚠ " + "; ".join(avisos)) if avisos else ""

            if archivo in existentes:
                print(f"   = ya estaba  {archivo}{marca}")
                ya_estaban += 1
                continue
            if args.dry_run or not token:
                print(f"   + subiria    [{tipo:<11}] {archivo}{marca}")
                continue

            cuerpo = {"image": {
                "attachment": base64.b64encode(open(ruta, "rb").read()).decode(),
                "filename": archivo,
                "alt": f"{alt} [{archivo}]",
            }}
            api("POST", f"/products/{pid}/images.json", token, store, cuerpo)
            print(f"   ✓ subida     {archivo}{marca}")
            subidas += 1
            time.sleep(0.6)   # el limite de Shopify es 2 llamadas/segundo

    print(f"\n{'='*58}")
    print(f"  listas en {CARPETA}/ : {listas}")
    print(f"  faltan por generar   : {faltantes}")
    print(f"  ya estaban en Shopify: {ya_estaban}")
    print(f"  subidas ahora        : {subidas}")
    if problemas:
        print(f"  PROBLEMAS            : {problemas}")
    if args.dry_run or not token:
        print("\n  (ensayo — no se subio nada)")
    return 1 if problemas else 0


if __name__ == "__main__":
    sys.exit(main())
