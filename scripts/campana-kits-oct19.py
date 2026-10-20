#!/usr/bin/env python3
"""
Arma la ronda de Meta Ads del 19 oct (MANUAL §104): kits y combos con foto fija.

Qué construye (todo en PAUSA; se enciende a mano con el OK del dueño):
  - Sube al ad account las portadas de ambiente (IA, verificadas) de 5 kits
    y 2 combos Okuma, redimensionadas a 1080×1080 JPEG.
  - Campaña de ventas con presupuesto en la campaña (CBO), $100/día.
  - Un conjunto: hombres de 45 a 65+ en México, Facebook e Instagram,
    optimizado a COMPRA con el pixel.
  - 4 anuncios, 3 ideas: kit Tundra Pro (valor), kit Revenger (para los que
    pescan en presa y río), combo Okuma de $999 (precio de entrada) y un
    carrusel con los 7 productos, cada tarjeta a su ficha.
  - Tope de gasto de la cuenta = gastado hasta hoy + $1,200.

Precios, ahorros y existencias se leen de Shopify al momento: nada va
escrito a mano en los textos.

Uso:
    META_ACCESS_TOKEN=... META_AD_ACCOUNT_ID=act_... SHOPIFY_ADMIN_TOKEN=... \\
        python3 scripts/campana-kits-oct19.py            # ensayo: muestra el plan
        python3 scripts/campana-kits-oct19.py --aplicar  # crea todo, en pausa
"""

import base64
import io
import json
import os
import sys
import urllib.parse
import urllib.request

from PIL import Image

API_VERSION = "v21.0"
BASE_URL = f"https://graph.facebook.com/{API_VERSION}"
TIENDA = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")
PAGE_ID = "924461404093150"
INSTAGRAM_ID = "17841434418853671"
PIXEL_ID = "2011984246408291"
PRESUPUESTO_DIARIO = 10000   # centavos MXN
TOPE_RONDA = 120000          # centavos MXN: $1,200 aprobados por el dueño el 19 oct
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36")

# Orden del carrusel: kits de mayor a menor, combos al final.
PRODUCTOS = [
    ("tundra", "kit-listo-para-pescar-okuma-tundra-pro-7-topaz-pro", "Kit Okuma Tundra Pro 7'"),
    ("clarus", "kit-listo-para-pescar-shimano-clarus-finesse", "Kit Shimano Clarus 5'8\""),
    ("revenger", "kit-listo-para-pescar-okuma-revenger-7-todo-terreno", "Kit Okuma Revenger 7'"),
    ("tolten", "kit-listo-para-pescar-blue-fox-tolten-8-mar-y-costa", "Kit Blue Fox Tolten 8'"),
    ("fresh", "kit-listo-para-pescar-blue-fox-fresh-7-agua-dulce", "Kit Blue Fox Fresh 7'"),
    ("combo245", "combo-okuma-revenger-80-2-45m", "Combo Okuma Revenger 8'"),
    ("boundary", "combo-okuma-boundary-70-spinning", "Combo Okuma Boundary 7'"),
]


def meta(method, path, token, body=None):
    url = f"{BASE_URL}{path}"
    datos = dict(body or {})
    datos["access_token"] = token
    if method == "GET":
        req = urllib.request.Request(url + "?" + urllib.parse.urlencode(datos))
    else:
        req = urllib.request.Request(url, data=urllib.parse.urlencode(datos).encode(), method=method)
    req.add_header("User-Agent", UA)  # sin esto Meta bloquea a urllib (meta-ads.py)
    try:
        with urllib.request.urlopen(req) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"❌ Meta {e.code} en {path}: {e.read().decode()[:400]}")


def shopify(ruta, token):
    req = urllib.request.Request(f"https://{TIENDA}/admin/api/2024-10/{ruta}",
                                 headers={"X-Shopify-Access-Token": token})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def pesos(centavos_o_str):
    return f"${float(centavos_o_str):,.0f}"


def cargar_productos(token):
    """Precio, tachado, ahorro, existencia, portada y URL con UTM, desde Shopify."""
    out = {}
    for clave, handle, corto in PRODUCTOS:
        p = shopify(f"products.json?handle={handle}&fields=id,title,handle,images,variants", token)["products"]
        if not p:
            sys.exit(f"❌ No existe {handle}")
        p = p[0]
        v = p["variants"][0]
        precio = float(v["price"])
        tachado = float(v["compare_at_price"]) if v.get("compare_at_price") else None
        out[clave] = {
            "id": p["id"], "handle": handle, "titulo": p["title"], "corto": corto,
            "precio": precio, "ahorro": (tachado - precio) if tachado else None,
            "existencia": v.get("inventory_quantity") or 0,
            "portada": p["images"][0]["src"],
            "url": (f"https://intemperiemexico.com/products/{handle}"
                    f"?utm_source=facebook&utm_medium=paid&utm_campaign=kits-oct19&utm_content={clave}"),
        }
    return out


def textos(pr):
    """Los 4 anuncios. Cada cifra sale de `pr` (Shopify), nunca a mano."""
    t, r, c = pr["tundra"], pr["revenger"], pr["combo245"]
    comun = "Envío gratis a todo México · Llega en 2 a 7 días hábiles"
    pago = "Paga con tarjeta, a meses sin intereses con tarjetas participantes, o en efectivo en OXXO y 7-Eleven."
    anuncios = [
        {
            "clave": "tundra-valor", "producto": "tundra",
            "mensaje": (f"Caña, carrete, hilo y los accesorios que se acaban primero, elegidos para trabajar juntos. "
                        f"Ahorras {pesos(t['ahorro'])} frente a comprarlo por pieza.\n\n{comun}. {pago}"),
            "titulo": f"{t['corto']} · {pesos(t['precio'])}",  # ≤ 40 caracteres: Meta recorta más largo
            "descripcion": f"Ahorras {pesos(t['ahorro'])} · Envío gratis",
        },
        {
            "clave": "revenger-presa-rio", "producto": "revenger",
            "mensaje": ("Para los que pescan en presa y río.\n\n"
                        "Lo abres y te vas a pescar: caña Okuma, carrete, hilo, caja, señuelos, anzuelos y plomos. "
                        f"No falta nada.\n\n{comun} · Garantía de compra: si algo llega mal, lo resolvemos."),
            "titulo": f"{r['corto']} · Todo terreno",
            "descripcion": f"{pesos(r['precio'])} · Ahorras {pesos(r['ahorro'])}",
        },
        {
            "clave": "combo-999", "producto": "combo245",
            "mensaje": (f"Caña y carrete Okuma, armados para trabajar juntos, por {pesos(c['precio'])} con envío gratis "
                        f"a todo México.\n\nLlega en 2 a 7 días hábiles. {pago} Si algo llega mal, lo resolvemos."),
            "titulo": f"{c['corto']} · {pesos(c['precio'])}",
            "descripcion": "Envío gratis a todo México",
        },
        {
            "clave": "carrusel-kits", "producto": None,
            "mensaje": ("Elige tu kit y sal a pescar. Caña, carrete, hilo y accesorios elegidos para trabajar juntos, "
                        f"desde {pesos(min(x['precio'] for x in pr.values()))}.\n\n{comun} · Pago en OXXO o meses sin intereses."),
        },
    ]
    return anuncios


def tarjeta(x):
    desc = f"Ahorras {pesos(x['ahorro'])}" if x["ahorro"] else "Envío gratis a todo México"
    return {"name": f"{x['corto']} · {pesos(x['precio'])}", "description": desc, "link": x["url"]}


def subir_imagen(cuenta, token, url, nombre):
    """Descarga la portada, la deja en 1080×1080 JPEG y la sube al ad account."""
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req) as r:
        im = Image.open(io.BytesIO(r.read())).convert("RGB").resize((1080, 1080), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=90)
    res = meta("POST", f"/{cuenta}/adimages", token, {
        "bytes": base64.b64encode(buf.getvalue()).decode(), "name": nombre})
    return list(res["images"].values())[0]["hash"]


def main():
    aplicar = "--aplicar" in sys.argv
    token = os.environ.get("META_ACCESS_TOKEN")
    cuenta = os.environ.get("META_AD_ACCOUNT_ID")
    shop = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not (token and cuenta and shop):
        sys.exit("❌ Faltan META_ACCESS_TOKEN, META_AD_ACCOUNT_ID o SHOPIFY_ADMIN_TOKEN")

    pr = cargar_productos(shop)
    anuncios = textos(pr)
    print("Productos (de Shopify):")
    for x in pr.values():
        print(f"  {x['corto']:<26} {pesos(x['precio']):>7}  ahorro {pesos(x['ahorro']) if x['ahorro'] else '—':>5}  existencia {x['existencia']}")
    print("\nAnuncios:")
    for a in anuncios:
        print(f"\n— {a['clave']}")
        print("  " + a["mensaje"].replace("\n", "\n  "))
        if a["producto"]:
            print(f"  Título: {a['titulo']}  |  Descripción: {a['descripcion']}")
        else:
            for x in pr.values():
                print(f"  tarjeta: {tarjeta(x)['name']} — {tarjeta(x)['description']}")

    cta = meta("GET", f"/{cuenta}", token, {"fields": "amount_spent,spend_cap"})
    gastado = int(cta["amount_spent"])
    print(f"\nCuenta: gastado {pesos(gastado / 100)}, tope hoy {pesos(int(cta['spend_cap']) / 100)}"
          f" → tope nuevo {pesos((gastado + TOPE_RONDA) / 100)}")
    if not aplicar:
        print("\nEnsayo: no se creó nada. Para construir (en pausa), agrega --aplicar.")
        return

    # Si una corrida anterior se quedó a medias, se borra su campaña (y con
    # ella conjunto y anuncios) para no duplicar nada.
    for c in meta("GET", f"/{cuenta}/campaigns", token, {"fields": "id,name"})["data"]:
        if "Oct19" in c["name"]:
            meta("DELETE", f"/{c['id']}", token)
            print(f"  (borrada campaña a medias {c['id']})")

    print("\nSubiendo imágenes…")
    hashes = {k: subir_imagen(cuenta, token, x["portada"], f"imx-{k}-oct19") for k, x in pr.items()}

    camp = meta("POST", f"/{cuenta}/campaigns", token, {
        "name": "IMX | Ventas | Kits y combos | Foto fija | Oct19",
        "objective": "OUTCOME_SALES", "status": "PAUSED",
        "special_ad_categories": "[]",
        "daily_budget": PRESUPUESTO_DIARIO, "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
    })["id"]
    conjunto = meta("POST", f"/{cuenta}/adsets", token, {
        "name": "IMX | Kits y combos | Compra | Hombres 45+ MX | FB+IG | Oct19",
        "campaign_id": camp, "status": "PAUSED",
        "billing_event": "IMPRESSIONS", "optimization_goal": "OFFSITE_CONVERSIONS",
        "promoted_object": json.dumps({"pixel_id": PIXEL_ID, "custom_event_type": "PURCHASE"}),
        "targeting": json.dumps({
            "geo_locations": {"countries": ["MX"]},
            "age_min": 45, "age_max": 65, "genders": [1],
            "publisher_platforms": ["facebook", "instagram"],
            # Meta exige decidir la "audiencia Advantage". Apagada (0): la
            # edad y el sexo son límites duros, no sugerencias. Los datos de
            # §68 dicen que 45-54 casi no compra; menores de 45 no se abren.
            "targeting_automation": {"advantage_audience": 0},
        }),
        "attribution_spec": json.dumps([{"event_type": "CLICK_THROUGH", "window_days": 7},
                                        {"event_type": "VIEW_THROUGH", "window_days": 1}]),
    })["id"]

    # Sin "mejoras" de Meta: la foto es fiel al producto y así se queda. Desde
    # oct 2026 Meta ya no acepta standard_enhancements en bloque; hay que
    # apagar cada función por su nombre.
    apagadas = ["image_brightness_and_contrast", "image_touchups", "image_background_gen",
                "image_uncrop", "image_templates", "add_text_overlay", "text_optimizations",
                "enhance_cta", "inline_comment", "description_automation", "media_type_automation",
                "product_extensions", "site_extensions",
                "video_auto_crop", "adapt_to_placement"]
    libertad = json.dumps({"creative_features_spec": {f: {"enroll_status": "OPT_OUT"} for f in apagadas}})
    ids = {"campania": camp, "conjunto": conjunto, "anuncios": {}}
    for a in anuncios:
        if a["producto"]:
            x = pr[a["producto"]]
            link_data = {
                "image_hash": hashes[a["producto"]], "link": x["url"],
                "message": a["mensaje"], "name": a["titulo"], "description": a["descripcion"],
                "call_to_action": {"type": "SHOP_NOW", "value": {"link": x["url"]}},
            }
        else:
            link_data = {
                "message": a["mensaje"], "link": "https://intemperiemexico.com/collections/combos?utm_source=facebook&utm_medium=paid&utm_campaign=kits-oct19&utm_content=carrusel",
                "multi_share_end_card": False,
                "child_attachments": [{**tarjeta(x), "image_hash": hashes[k],
                                       "call_to_action": {"type": "SHOP_NOW", "value": {"link": x["url"]}}}
                                      for k, x in pr.items()],
            }
        creativo = meta("POST", f"/{cuenta}/adcreatives", token, {
            "name": f"IMX | {a['clave']} | Oct19",
            "object_story_spec": json.dumps({"page_id": PAGE_ID, "instagram_user_id": INSTAGRAM_ID, "link_data": link_data}),
            "degrees_of_freedom_spec": libertad,
        })["id"]
        anuncio = meta("POST", f"/{cuenta}/ads", token, {
            "name": f"IMX | {a['clave']} | Oct19", "adset_id": conjunto,
            "creative": json.dumps({"creative_id": creativo}), "status": "PAUSED",
        })["id"]
        ids["anuncios"][a["clave"]] = {"creativo": creativo, "anuncio": anuncio}
        print(f"  ✓ {a['clave']}: anuncio {anuncio}")

    # OJO: amount_spent y spend_cap se LEEN en centavos, pero spend_cap se
    # ESCRIBE en pesos (trampa de §56). El 19 oct se posteó en centavos y el
    # tope quedó en $325,283 (100×); lo detectó la sesión local (§107) y se
    # corrigió el 20 oct.
    meta("POST", f"/{cuenta}", token, {"spend_cap": f"{(gastado + TOPE_RONDA) / 100:.2f}"})
    print(f"\nTope de la cuenta: {pesos((gastado + TOPE_RONDA) / 100)}")
    print(json.dumps(ids, indent=1))


if __name__ == "__main__":
    main()
