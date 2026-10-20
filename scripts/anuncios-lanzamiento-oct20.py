#!/usr/bin/env python3
"""
Anuncios del lanzamiento (20 oct, MANUAL §106): los 5 kits bajaron 10% hasta
el 31 oct, así que los anuncios con precios y ahorros viejos quedan mal.

Qué hace (--aplicar):
  - En el conjunto de PROSPECCIÓN (120250632214070175) crea 3 anuncios
    nuevos, EN PAUSA, con precios leídos de Shopify y el mensaje de
    lanzamiento: tundra-lanz, revenger-lanz y carrusel-lanz. Con
    --pausar-viejos pausa los 3 con precios desactualizados (tundra-valor,
    revenger-presa-rio, carrusel-kits). combo-999 se queda (no cambió).
  - En el conjunto de RETARGETING (120250648101560175) agrega lanzamiento-rt.
    (La campaña de retargeting sigue en pausa hasta que el dueño la encienda.)
  Pausar y crear anuncios no reinicia el aprendizaje del conjunto.

El 1 nov, la tarea programada restaura precios y vuelve a los anuncios
anteriores (scripts/precios-lanzamiento-oct20.json).
"""

import importlib.util
import json
import os
import sys

_ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "campana-kits-oct19.py")
_spec = importlib.util.spec_from_file_location("kits", _ruta)
kits = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(kits)

CONJUNTO_PROSPECCION = "120250632214070175"
CONJUNTO_RETARGETING = "120250648101560175"
VIEJOS_A_PAUSAR = {"tundra-valor": "120250632214760175", "revenger-presa-rio": "120250632215950175",
                   "carrusel-kits": "120250632219580175"}
LANZ = "Lanzamiento: todos los kits listos para pescar con 10% menos hasta el 31 de octubre."
UTM = "utm_source=facebook&utm_medium=paid&utm_campaign=lanzamiento-oct20&utm_content="


def textos(pr):
    t, r = pr["tundra"], pr["revenger"]
    comun = "Envío gratis a todo México · Llega en 2 a 7 días hábiles"
    pago = "Paga con tarjeta, a meses sin intereses con tarjetas participantes, o en efectivo en OXXO y 7-Eleven."
    return [
        {"clave": "tundra-lanz", "producto": "tundra", "conjunto": CONJUNTO_PROSPECCION,
         "mensaje": (f"{LANZ}\n\nCaña, carrete, hilo y los accesorios que se acaban primero, elegidos para trabajar "
                     f"juntos. Hoy {kits.pesos(t['precio'])}: ahorras {kits.pesos(t['ahorro'])} frente a comprarlo por pieza.\n\n{comun}. {pago}"),
         "titulo": f"{t['corto']} · {kits.pesos(t['precio'])}",
         "descripcion": f"Ahorras {kits.pesos(t['ahorro'])} · Envío gratis"},
        {"clave": "revenger-lanz", "producto": "revenger", "conjunto": CONJUNTO_PROSPECCION,
         "mensaje": ("Para los que pescan en presa y río.\n\n"
                     "Lo abres y te vas a pescar: caña Okuma, carrete, hilo, caja, señuelos, anzuelos y plomos. "
                     f"No falta nada.\n\n{LANZ} Hoy {kits.pesos(r['precio'])}.\n\n{comun} · Garantía de compra: si algo llega mal, lo resolvemos."),
         "titulo": f"{r['corto']} · Todo terreno",
         "descripcion": f"{kits.pesos(r['precio'])} · Ahorras {kits.pesos(r['ahorro'])}"},
        {"clave": "carrusel-lanz", "producto": None, "conjunto": CONJUNTO_PROSPECCION,
         "mensaje": (f"{LANZ}\n\nElige tu kit y sal a pescar. Caña, carrete, hilo y accesorios elegidos para trabajar "
                     f"juntos, desde {kits.pesos(min(x['precio'] for x in pr.values()))}.\n\n{comun} · Pago en OXXO o meses sin intereses.")},
        {"clave": "lanzamiento-rt", "producto": "revenger", "conjunto": CONJUNTO_RETARGETING,
         "mensaje": (f"¿Lo viste y no te decidiste? {LANZ}\n\n{comun} · Paga a meses, con PayPal o en efectivo en OXXO "
                     "(eliges Mercado Pago al pagar) · 7 días para cambios · Si algo llega mal, lo resolvemos."),
         "titulo": "Kits listos para pescar · 10% menos",
         "descripcion": "Hasta el 31 de octubre · Envío gratis"},
    ]


def main():
    aplicar = "--aplicar" in sys.argv
    token, cuenta, shop = (os.environ.get(k) for k in ("META_ACCESS_TOKEN", "META_AD_ACCOUNT_ID", "SHOPIFY_ADMIN_TOKEN"))
    if not (token and cuenta and shop):
        sys.exit("❌ Faltan META_ACCESS_TOKEN, META_AD_ACCOUNT_ID o SHOPIFY_ADMIN_TOKEN")
    pr = kits.cargar_productos(shop)
    for k, x in pr.items():
        print(f"  {x['corto']:<26} {kits.pesos(x['precio']):>7}  ahorro {kits.pesos(x['ahorro']) if x['ahorro'] else '—':>5}")
    anuncios = textos(pr)
    for a in anuncios:
        print(f"\n— {a['clave']} ({'prospección' if a['conjunto'] == CONJUNTO_PROSPECCION else 'retargeting'})")
        print("  " + a["mensaje"].replace("\n", "\n  "))
        if a["producto"]:
            print(f"  Título: {a['titulo']}  |  Descripción: {a['descripcion']}")
    if not aplicar:
        print("\nEnsayo: no se creó ni pausó nada. Agrega --aplicar.")
        return

    hashes = {k: kits.subir_imagen(cuenta, token, x["portada"], f"imx-{k}-oct19") for k, x in pr.items()}
    apagadas = ["image_brightness_and_contrast", "image_touchups", "image_background_gen",
                "image_uncrop", "image_templates", "add_text_overlay", "text_optimizations",
                "enhance_cta", "inline_comment", "description_automation", "media_type_automation",
                "product_extensions", "site_extensions", "video_auto_crop", "adapt_to_placement"]
    libertad = json.dumps({"creative_features_spec": {f: {"enroll_status": "OPT_OUT"} for f in apagadas}})
    ids = {}
    for a in anuncios:
        if a["producto"]:
            x = pr[a["producto"]]
            link = x["url"].replace("utm_campaign=kits-oct19&utm_content=" + a["producto"], "utm_campaign=lanzamiento-oct20&utm_content=" + a["clave"])
            link_data = {"image_hash": hashes[a["producto"]], "link": link, "message": a["mensaje"],
                         "name": a["titulo"], "description": a["descripcion"],
                         "call_to_action": {"type": "SHOP_NOW", "value": {"link": link}}}
        else:
            link_data = {"message": a["mensaje"], "link": "https://intemperiemexico.com/collections/combos?" + UTM + "carrusel-lanz",
                         "multi_share_end_card": False,
                         "child_attachments": [{**kits.tarjeta(x), "image_hash": hashes[k],
                                                "call_to_action": {"type": "SHOP_NOW", "value": {"link": x["url"]}}}
                                               for k, x in pr.items()]}
        creativo = kits.meta("POST", f"/{cuenta}/adcreatives", token, {
            "name": f"IMX | {a['clave']} | Oct20",
            "object_story_spec": json.dumps({"page_id": kits.PAGE_ID, "instagram_user_id": kits.INSTAGRAM_ID, "link_data": link_data}),
            "degrees_of_freedom_spec": libertad})["id"]
        anuncio = kits.meta("POST", f"/{cuenta}/ads", token, {
            "name": f"IMX | {a['clave']} | Oct20", "adset_id": a["conjunto"],
            # En PAUSA: el clasificador de la sesión no deja crear anuncios activos
            # ni encenderlos (gasto real). Los enciende el dueño en el Administrador.
            "creative": json.dumps({"creative_id": creativo}), "status": "PAUSED"})["id"]
        ids[a["clave"]] = anuncio
        print(f"  ✓ {a['clave']}: anuncio {anuncio}")
    if "--pausar-viejos" in sys.argv:
        for clave, aid in VIEJOS_A_PAUSAR.items():
            kits.meta("POST", f"/{aid}", token, {"status": "PAUSED"})
            print(f"  ⏸ {clave} ({aid}) pausado: precios viejos")
    else:
        print("  Los anuncios viejos siguen activos; cuando el dueño encienda los nuevos, "
              "pausarlos con --pausar-viejos (o a mano).")
    print(json.dumps(ids, indent=1))


if __name__ == "__main__":
    main()
