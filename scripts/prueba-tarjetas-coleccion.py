#!/usr/bin/env python3
"""Prueba de regresion: ninguna tarjeta de producto debe salirse de su columna.

Por que existe
--------------
El 15 de septiembre de 2026 los titulos de las tarjetas se encimaban entre
columnas en movil, pero SOLO en los productos con precio rebajado. La causa
estaba en el precio, no en el titulo: `white-space: nowrap` se habia aplicado
a `.price` y `.price__container`, que en un producto rebajado contienen DOS
precios. La cadena entera se volvia irrompible, el ancho minimo de contenido
de `.card__information` se disparaba, y la tarjeta dejaba de caber en su
columna. Detalle completo en la seccion 61 del manual.

Esta prueba mide de verdad, con un navegador: descarga la coleccion en vivo,
le sustituye el `brand-tokens.css` por el del repositorio (para poder validar
un cambio ANTES de desplegarlo) y comprueba que el borde derecho de
`.card__information` y de `.price` no rebase el de su propio `<li>`.

Uso
---
    python3 scripts/prueba-tarjetas-coleccion.py
    python3 scripts/prueba-tarjetas-coleccion.py --coleccion binoculares

Sale con codigo 0 si todo cabe, 1 si algo se desborda.
No necesita ningun token: solo lee el sitio publico.
"""

import argparse
import os
import re
import shutil
import sys
import tempfile
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TIENDA = "https://intemperiemexico.com"
CHROME_POSIBLES = [
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/opt/pw-browsers/chromium/chrome-linux/chrome",
]
UA_MOVIL = ("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
            "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")
TOLERANCIA = 0.5  # px, por redondeo subpixel
ANCHOS = (430, 390, 360)

JS_MEDIR = """() => [...document.querySelectorAll('#product-grid > li.grid__item')].map((li, i) => {
  const cont = li.querySelector('.card > .card__content');
  const info = cont && cont.querySelector('.card__information');
  const pr   = cont && cont.querySelector('.price');
  const h3   = cont && cont.querySelector('.card__heading');
  const R = e => { if (!e) return null; const r = e.getBoundingClientRect();
                   return {x: +r.x.toFixed(1), w: +r.width.toFixed(1), der: +(r.x + r.width).toFixed(1)}; };
  return {i, titulo: (h3 ? h3.textContent.trim() : '').slice(0, 34),
          oferta: !!li.querySelector('.price--on-sale'),
          li: R(li), info: R(info), precio: R(pr), h3: R(h3)};
})"""


def buscar_chrome():
    for p in CHROME_POSIBLES:
        if os.path.exists(p):
            return p
    raise SystemExit("No encontre el Chromium de Playwright. Revisa PLAYWRIGHT_BROWSERS_PATH.")


def bajar(url, destino):
    req = urllib.request.Request(url, headers={"User-Agent": UA_MOVIL})
    with urllib.request.urlopen(req) as r, open(destino, "wb") as f:
        f.write(r.read())


def armar_repro(coleccion, dir_tmp):
    """Descarga la coleccion y sus CSS, y sustituye brand-tokens.css por el del repo."""
    html_path = os.path.join(dir_tmp, "pagina.html")
    bajar(f"{TIENDA}/collections/{coleccion}", html_path)
    html = open(html_path, encoding="utf-8").read()

    for nombre in sorted(set(re.findall(r'/cdn/shop/t/\d+/assets/([a-z0-9\-]+\.css)\?', html))):
        try:
            bajar(f"{TIENDA}/cdn/shop/t/5/assets/{nombre}", os.path.join(dir_tmp, nombre))
        except Exception:
            open(os.path.join(dir_tmp, nombre), "w").close()

    # EL PUNTO DE LA PRUEBA: el CSS de marca sale del repositorio, no de produccion,
    # para poder validar un arreglo antes de desplegarlo.
    shutil.copy(os.path.join(RAIZ, "tema-shopify/assets/brand-tokens.css"),
                os.path.join(dir_tmp, "brand-tokens.css"))

    html = re.sub(r'href="//intemperiemexico\.com/cdn/shop/t/\d+/assets/([a-z0-9\-]+\.css)\?[^"]*"',
                  r'href="\1"', html)
    # fuera todo lo externo: la prueba corre sin red
    html = re.sub(r'<script[^>]*src="[^"]*"[^>]*>\s*</script>', '', html)
    html = re.sub(r'<link[^>]*href="https?://[^"]*"[^>]*>', '', html)
    open(html_path, "w", encoding="utf-8").write(html)
    return html_path


def medir(pagina, ancho, chrome):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        nav = pw.chromium.launch(executable_path=chrome, args=["--no-sandbox"])
        pg = nav.new_page(viewport={"width": ancho, "height": 900},
                          device_scale_factor=2, is_mobile=True, has_touch=True)
        pg.route("**/*", lambda r: r.abort() if r.request.url.startswith("http") else r.continue_())
        pg.goto(f"file://{pagina}", wait_until="load")
        pg.wait_for_timeout(500)
        datos = pg.evaluate(JS_MEDIR)
        nav.close()
    return datos


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--coleccion", default="combos")
    args = ap.parse_args()

    chrome = buscar_chrome()
    dir_tmp = tempfile.mkdtemp(prefix="prueba-tarjetas-")
    try:
        pagina = armar_repro(args.coleccion, dir_tmp)
        fallos = 0
        for ancho in ANCHOS:
            datos = medir(pagina, ancho, chrome)
            if not datos:
                raise SystemExit(f"No encontre tarjetas en /collections/{args.coleccion}")
            print(f"\n=== viewport {ancho}px ===")
            print(f"{'#':<2} {'of':<3} {'titulo':<34} {'col.der':>8} {'info.der':>9} {'precio.der':>11} {'h3.w':>7}")
            for r in datos:
                lim, marca = r["li"]["der"], ""
                for campo in ("info", "precio"):
                    if r[campo] and r[campo]["der"] > lim + TOLERANCIA:
                        marca = f"  <-- SE SALE {r[campo]['der'] - lim:.1f}px"
                        fallos += 1
                print(f"{r['i']:<2} {'SI' if r['oferta'] else '.':<3} {r['titulo']:<34} {lim:>8} "
                      f"{r['info']['der'] if r['info'] else '-':>9} "
                      f"{r['precio']['der'] if r['precio'] else '-':>11} "
                      f"{r['h3']['w'] if r['h3'] else '-':>7}{marca}")

        print("\n" + "=" * 60)
        if fallos:
            print(f"FALLA: {fallos} desbordes de columna")
            return 1
        print(f"OK: /collections/{args.coleccion} — ninguna tarjeta se sale de su columna")
        return 0
    finally:
        shutil.rmtree(dir_tmp, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
