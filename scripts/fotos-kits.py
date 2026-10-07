#!/usr/bin/env python3
"""
Fotos de los kits a partir de las fotos que ya tienen sus piezas
(MANUAL §71). Decisión del dueño, 7 oct: no se toman fotos nuevas.

Cada kit recibe:
  1. Una PORTADA armada aquí: las fotos reales de todas las piezas en una
     cuadrícula sobre fondo oscuro, con la cantidad de cada una ("×10").
     No es IA: son las mismas fotos de catálogo, juntas, así que no se
     inventa ninguna pieza y el cliente ve de un vistazo todo lo que trae.
  2. Detrás, la foto principal de cada pieza (por URL del CDN de Shopify,
     sin descargar ni volver a subir el archivo).

Uso:
    python3 scripts/fotos-kits.py --solo-portadas DIR       # arma las portadas en DIR, no sube nada
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/fotos-kits.py   # arma y sube

Las fotos de las piezas se leen del storefront público
(/products/<handle>.js), así que armar las portadas no necesita token.
Subirlas sí (write_products). Idempotente: cada imagen lleva en su `alt`
un sufijo [kit-portada] o [pieza:<handle>]; lo que ya está, se salta.
Nunca borra nada.
"""

import base64
import importlib.util
import io
import json
import os
import sys
import time
import urllib.request

from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(RAIZ, "tema-shopify", "assets")
API_VERSION = "2024-10"
LADO = 2048
FONDO = (12, 14, 13)
VERDE = (87, 181, 138)
BLANCO = (245, 245, 247)
GRIS = (185, 185, 190)

spec = importlib.util.spec_from_file_location("kits", os.path.join(RAIZ, "scripts", "crear-kits.py"))
kits_mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(kits_mod)
KITS = kits_mod.KITS

# Nombres cortos para la etiqueta de cada pieza en la portada
CAMBIOS = [("Caña de Pescar ", "Caña "), ("Caja Organizadora ", "Caja "), ("Spinning", ""), ("Mod. 1010", "")]


def fuente(nombre, tam):
    return ImageFont.truetype(os.path.join(FUENTES, nombre), tam)


def bajar(url):
    if url.startswith("//"):
        url = "https:" + url
    with urllib.request.urlopen(url) as r:
        return r.read()


def datos_pieza(handle):
    with urllib.request.urlopen(f"https://intemperiemexico.com/products/{handle}.js") as r:
        p = json.load(r)
    return {"titulo": p["title"], "imagen": p["images"][0] if p["images"] else None}


def corto(titulo):
    t = titulo
    for a, b in CAMBIOS:
        t = t.replace(a, b)
    return " ".join(t.split())


def envolver(draw, texto, f, ancho, max_lineas=2):
    palabras, lineas, actual = texto.split(), [], ""
    for p in palabras:
        prueba = (actual + " " + p).strip()
        if draw.textlength(prueba, font=f) <= ancho:
            actual = prueba
        else:
            lineas.append(actual)
            actual = p
    lineas.append(actual)
    if len(lineas) > max_lineas:
        lineas = lineas[:max_lineas]
        while draw.textlength(lineas[-1] + "…", font=f) > ancho:
            lineas[-1] = lineas[-1][:-1]
        lineas[-1] += "…"
    return lineas


def recortar_blanco(foto):
    """Quita el margen blanco de la foto de catálogo, para que la pieza
    ocupe la tarjeta (la caña, sobre todo, venía con 80% de blanco)."""
    gris = foto.convert("L").point(lambda v: 255 if v < 238 else 0)
    caja = gris.getbbox()
    if not caja:
        return foto
    x0, y0, x1, y1 = caja
    m = int(max(x1 - x0, y1 - y0) * 0.04)
    return foto.crop((max(0, x0 - m), max(0, y0 - m), min(foto.width, x1 + m), min(foto.height, y1 + m)))


def enderezar(foto):
    """Las cañas vienen fotografiadas en diagonal: dentro de una franja
    ancha quedaban diminutas. Se calcula el eje principal de los pixeles
    oscuros (la caña) y se gira la foto para dejarla horizontal."""
    import math
    g = foto.convert("L")
    pts = [(x, y) for y in range(0, g.height, 3) for x in range(0, g.width, 3) if g.getpixel((x, y)) < 200]
    if len(pts) < 50:
        return foto
    mx = sum(p[0] for p in pts) / len(pts)
    my = sum(p[1] for p in pts) / len(pts)
    sxx = sum((p[0] - mx) ** 2 for p in pts)
    syy = sum((p[1] - my) ** 2 for p in pts)
    sxy = sum((p[0] - mx) * (p[1] - my) for p in pts)
    angulo = 0.5 * math.degrees(math.atan2(2 * sxy, sxx - syy))
    return foto.rotate(angulo, resample=Image.BICUBIC, expand=True, fillcolor=(255, 255, 255))


def tarjeta(img_bytes, ancho, alto, cantidad, etiqueta, girar=False):
    """Foto de la pieza sobre una tarjeta clara, con cantidad y nombre."""
    t = Image.new("RGB", (ancho, alto), FONDO)
    d = ImageDraw.Draw(t)
    pie = 92
    d.rounded_rectangle([0, 0, ancho - 1, alto - pie - 10], radius=28, fill=(250, 250, 250))
    foto = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    if girar:
        foto = enderezar(recortar_blanco(foto))
    foto = recortar_blanco(foto)
    caja = (ancho - 40, alto - pie - 50)
    foto.thumbnail(caja, Image.LANCZOS)
    t.paste(foto, ((ancho - foto.width) // 2, (alto - pie - 10 - foto.height) // 2))
    if cantidad > 1:
        f = fuente("InstrumentSans-Bold.ttf", 46)
        txt = f"×{cantidad}"
        w = d.textlength(txt, font=f) + 36
        d.rounded_rectangle([ancho - w - 16, 16, ancho - 16, 84], radius=34, fill=VERDE)
        d.text((ancho - w - 16 + 18, 22), txt, font=f, fill=FONDO)
    f = fuente("InstrumentSans-Regular.ttf", 34)
    for i, linea in enumerate(envolver(d, etiqueta, f, ancho - 8)):
        d.text((4, alto - pie + i * 42), linea, font=f, fill=GRIS)
    return t


def portada(kit, piezas):
    lienzo = Image.new("RGB", (LADO, LADO), FONDO)
    d = ImageDraw.Draw(lienzo)
    m = 72
    d.text((m, 60), "TODO LO QUE INCLUYE", font=fuente("InstrumentSans-Bold.ttf", 44), fill=VERDE)
    titulo = kit["titulo"].replace("Kit Listo para Pescar ", "Kit ")
    ft = fuente("InstrumentSans-Bold.ttf", 86)
    for i, linea in enumerate(envolver(d, titulo, ft, LADO - 2 * m)):
        d.text((m, 122 + i * 98), linea, font=ft, fill=BLANCO)
    y = 360
    sep = 28
    # La caña (primera pieza) ocupa todo el ancho: es larga y se perdería en una celda.
    cana, resto = piezas[0], piezas[1:]
    alto_cana = 380
    lienzo.paste(tarjeta(cana["bytes"], LADO - 2 * m, alto_cana, cana["q"], corto(cana["titulo"]), girar=True), (m, y))
    y += alto_cana + sep
    cols = 3 if len(resto) <= 6 else 4
    filas = -(-len(resto) // cols)
    ancho = (LADO - 2 * m - (cols - 1) * sep) // cols
    alto = min(ancho + 60, (LADO - y - 60 - (filas - 1) * sep) // filas)
    for i, p in enumerate(resto):
        x = m + (i % cols) * (ancho + sep)
        yy = y + (i // cols) * (alto + sep)
        lienzo.paste(tarjeta(p["bytes"], ancho, alto, p["q"], corto(p["titulo"])), (x, yy))
    return lienzo


def api(metodo, ruta, token, tienda, cuerpo=None):
    req = urllib.request.Request(
        f"https://{tienda}/admin/api/{API_VERSION}/{ruta}",
        data=json.dumps(cuerpo).encode() if cuerpo is not None else None, method=metodo,
        headers={"X-Shopify-Access-Token": token, "Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def main():
    solo = None
    if "--solo-portadas" in sys.argv:
        solo = sys.argv[sys.argv.index("--solo-portadas") + 1]
        os.makedirs(solo, exist_ok=True)
    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    tienda = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")
    if not solo and not token:
        sys.exit("Falta SHOPIFY_ADMIN_TOKEN (o usa --solo-portadas DIR)")

    for kit in KITS:
        piezas = []
        for h, q in kit["piezas"]:
            info = datos_pieza(h)
            if not info["imagen"]:
                print(f"   ⚠ {h} no tiene foto; queda fuera de la portada")
                continue
            piezas.append({"handle": h, "q": q, "titulo": info["titulo"],
                           "url": "https:" + info["imagen"] if info["imagen"].startswith("//") else info["imagen"],
                           "bytes": bajar(info["imagen"])})
            time.sleep(0.15)
        img = portada(kit, piezas)
        buf = io.BytesIO()
        img.save(buf, "JPEG", quality=88)
        if solo:
            ruta = os.path.join(solo, kit["handle"] + "-portada.jpg")
            open(ruta, "wb").write(buf.getvalue())
            print(f"✓ {ruta}")
            continue

        p = api("GET", f"products.json?handle={kit['handle']}&fields=id,images", token, tienda)["products"]
        if not p:
            print(f"⚠ el kit {kit['handle']} no existe en la tienda; corre crear-kits.py --crear")
            continue
        pid, alts = p[0]["id"], " ".join((im.get("alt") or "") for im in p[0]["images"])
        subidas = 0
        if "[kit-portada]" not in alts:
            api("POST", f"products/{pid}/images.json", token, tienda, {"image": {
                "attachment": base64.b64encode(buf.getvalue()).decode(), "position": 1,
                "filename": kit["handle"] + "-portada.jpg",
                "alt": f"{kit['titulo']}: todo lo que incluye [kit-portada]"}})
            subidas += 1
        for i, pz in enumerate(piezas, start=2):
            marca = f"[pieza:{pz['handle']}]"
            if marca in alts:
                continue
            api("POST", f"products/{pid}/images.json", token, tienda, {"image": {
                "src": pz["url"], "position": i,
                "alt": f"Incluido en el kit: {pz['q']} × {pz['titulo']} {marca}"}})
            subidas += 1
            time.sleep(0.5)
        print(f"✓ {kit['titulo']}: {subidas} imágenes subidas")


if __name__ == "__main__":
    main()
