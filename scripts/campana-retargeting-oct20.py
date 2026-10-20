#!/usr/bin/env python3
"""
Retargeting con OTRA oferta (20 oct, MANUAL §105): a quien ya vio un producto
y no compró no se le repite el mismo anuncio (eso ya se probó en la v5-RT:
44 vistas, 0 carritos). Se le contestan las objeciones y se le ofrece la
entrada de $999.

Qué construye (en PAUSA; se enciende a mano):
  - Campaña de ventas aparte de la de prospección (para no mover su
    aprendizaje), presupuesto $20/día en el conjunto (mínimo que acepta Meta).
  - Un conjunto: público "Vieron producto 30 días (pixel)" ya existente
    (120250344355530175), México, 18-65+, todos, Facebook e Instagram,
    optimizado a COMPRA.
  - 2 anuncios: "objeciones" (envío, pagos, cambios, garantía, WhatsApp) con
    la foto del kit Revenger, y "combo $999" con la foto del combo.

Comparte el tope de la cuenta con la ronda del 19 oct ($1,200 en total).
Reutiliza las funciones de campana-kits-oct19.py.

Uso:
    META_ACCESS_TOKEN=... META_AD_ACCOUNT_ID=act_... SHOPIFY_ADMIN_TOKEN=... \\
        python3 scripts/campana-retargeting-oct20.py            # ensayo
        python3 scripts/campana-retargeting-oct20.py --aplicar  # crea, en pausa
"""

import importlib.util
import json
import os
import sys

_ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "campana-kits-oct19.py")
_spec = importlib.util.spec_from_file_location("kits", _ruta)
kits = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(kits)

PUBLICO_VIERON_30D = "120250344355530175"
PRESUPUESTO_DIARIO = 2000  # centavos MXN: Meta exige > $18.59 por conjunto
UTM = "utm_source=facebook&utm_medium=paid&utm_campaign=retargeting-oct20&utm_content="


def textos(pr):
    r, c = pr["revenger"], pr["combo245"]
    return [
        {
            "clave": "objeciones", "producto": "revenger",
            "link": "https://intemperiemexico.com/collections/combos?" + UTM + "objeciones",
            "mensaje": ("¿Lo viste y te quedaste con dudas? Te las contestamos:\n\n"
                        "• Envío gratis a todo México, llega en 2 a 7 días hábiles.\n"
                        "• Pagas con tarjeta a meses sin intereses (tarjetas participantes), con PayPal, "
                        "o en efectivo en OXXO y 7-Eleven eligiendo Mercado Pago al pagar.\n"
                        "• 7 días para cambios o devoluciones.\n"
                        "• Si algo llega mal, lo resolvemos.\n"
                        "• ¿Preguntas? Escríbenos por WhatsApp antes de pagar."),
            "titulo": "Kits y combos listos para pescar",
            "descripcion": f"Desde {kits.pesos(c['precio'])} · Envío gratis",
        },
        {
            "clave": "combo-999-rt", "producto": "combo245",
            "link": c["url"].replace("utm_campaign=kits-oct19&utm_content=combo245", "utm_campaign=retargeting-oct20&utm_content=combo-999-rt"),
            "mensaje": (f"Si el kit completo te pareció mucho, empieza por aquí: caña y carrete Okuma, "
                        f"armados para trabajar juntos, por {kits.pesos(c['precio'])} con envío gratis a todo México.\n\n"
                        "Llega en 2 a 7 días hábiles. Paga a meses, con PayPal o en efectivo en OXXO."),
            "titulo": f"{c['corto']} · {kits.pesos(c['precio'])}",
            "descripcion": "Envío gratis a todo México",
        },
    ]


def main():
    aplicar = "--aplicar" in sys.argv
    token = os.environ.get("META_ACCESS_TOKEN")
    cuenta = os.environ.get("META_AD_ACCOUNT_ID")
    shop = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not (token and cuenta and shop):
        sys.exit("❌ Faltan META_ACCESS_TOKEN, META_AD_ACCOUNT_ID o SHOPIFY_ADMIN_TOKEN")
    pr = kits.cargar_productos(shop)
    anuncios = textos(pr)
    for a in anuncios:
        print(f"\n— {a['clave']} → {a['link'][:70]}")
        print("  " + a["mensaje"].replace("\n", "\n  "))
        print(f"  Título: {a['titulo']}  |  Descripción: {a['descripcion']}")
    if not aplicar:
        print("\nEnsayo: no se creó nada. Para construir (en pausa), agrega --aplicar.")
        return

    for c in kits.meta("GET", f"/{cuenta}/campaigns", token, {"fields": "id,name"})["data"]:
        if "Retargeting | Oct20" in c["name"]:
            kits.meta("DELETE", f"/{c['id']}", token)
            print(f"  (borrada campaña a medias {c['id']})")

    hashes = {k: kits.subir_imagen(cuenta, token, pr[k]["portada"], f"imx-{k}-oct19") for k in ("revenger", "combo245")}
    camp = kits.meta("POST", f"/{cuenta}/campaigns", token, {
        "name": "IMX | Ventas | Retargeting | Oct20",
        "objective": "OUTCOME_SALES", "status": "PAUSED", "special_ad_categories": "[]",
        # Presupuesto en el conjunto, no en la campaña: Meta exige decirlo.
        "is_adset_budget_sharing_enabled": "false",
    })["id"]
    conjunto = kits.meta("POST", f"/{cuenta}/adsets", token, {
        "name": "IMX | Retargeting vieron producto 30d | Otra oferta | Oct20",
        "campaign_id": camp, "status": "PAUSED",
        "daily_budget": PRESUPUESTO_DIARIO, "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
        "billing_event": "IMPRESSIONS", "optimization_goal": "OFFSITE_CONVERSIONS",
        "promoted_object": json.dumps({"pixel_id": kits.PIXEL_ID, "custom_event_type": "PURCHASE"}),
        "targeting": json.dumps({
            "geo_locations": {"countries": ["MX"]},
            "age_min": 18, "age_max": 65,
            "custom_audiences": [{"id": PUBLICO_VIERON_30D}],
            "publisher_platforms": ["facebook", "instagram"],
            "targeting_automation": {"advantage_audience": 0},
        }),
        "attribution_spec": json.dumps([{"event_type": "CLICK_THROUGH", "window_days": 7},
                                        {"event_type": "VIEW_THROUGH", "window_days": 1}]),
    })["id"]
    apagadas = ["image_brightness_and_contrast", "image_touchups", "image_background_gen",
                "image_uncrop", "image_templates", "add_text_overlay", "text_optimizations",
                "enhance_cta", "inline_comment", "description_automation", "media_type_automation",
                "product_extensions", "site_extensions", "video_auto_crop", "adapt_to_placement"]
    libertad = json.dumps({"creative_features_spec": {f: {"enroll_status": "OPT_OUT"} for f in apagadas}})
    ids = {"campania": camp, "conjunto": conjunto, "anuncios": {}}
    for a in anuncios:
        link_data = {
            "image_hash": hashes[a["producto"]], "link": a["link"],
            "message": a["mensaje"], "name": a["titulo"], "description": a["descripcion"],
            "call_to_action": {"type": "SHOP_NOW", "value": {"link": a["link"]}},
        }
        creativo = kits.meta("POST", f"/{cuenta}/adcreatives", token, {
            "name": f"IMX | {a['clave']} | Oct20",
            "object_story_spec": json.dumps({"page_id": kits.PAGE_ID, "instagram_user_id": kits.INSTAGRAM_ID, "link_data": link_data}),
            "degrees_of_freedom_spec": libertad,
        })["id"]
        anuncio = kits.meta("POST", f"/{cuenta}/ads", token, {
            "name": f"IMX | {a['clave']} | Oct20", "adset_id": conjunto,
            "creative": json.dumps({"creative_id": creativo}), "status": "PAUSED",
        })["id"]
        ids["anuncios"][a["clave"]] = {"creativo": creativo, "anuncio": anuncio}
        print(f"  ✓ {a['clave']}: anuncio {anuncio}")
    print(json.dumps(ids, indent=1))


if __name__ == "__main__":
    main()
