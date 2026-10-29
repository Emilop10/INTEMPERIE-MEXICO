#!/usr/bin/env python3
"""
Prueba de anuncios que abren WhatsApp (24 oct, MANUAL §126).

La ronda de foto fija a la tienda trajo visitas pero no carritos (§124):
para compras de $1,000+ el público de 45–65 quiere preguntar antes de
pagar. Esta campaña manda al chat de WhatsApp Business de la tienda, que
contesta el dueño de 9:00 a 22:00 (guion en GUIA-VENTAS-WHATSAPP.md).

Qué crea (--aplicar), todo EN PAUSA (el clasificador de la sesión no deja
encender; lo enciende el dueño):
  - Campaña OUTCOME_ENGAGEMENT, presupuesto en el conjunto.
  - Conjunto con destino WHATSAPP, optimizado a conversaciones:
    $400 totales del 26 al 30 oct, solo de 9:00 a 21:00 hora de la cuenta
    (los horarios exigen presupuesto total). Hombres 35–65, México,
    Facebook en celular (feed, historias y reels).
  - Baja el tope de la cuenta a lo gastado + $400, para que la prueba no
    pueda pasarse aunque se toque el presupuesto.
Anuncios:
  --anuncios-foto  (24 oct, el dueño pidió arrancar ya, sin esperar los
                   videos): 3 anuncios de foto en el conjunto, EN PAUSA, y
                   mueve el inicio del conjunto a hoy. El lunes se agregan
                   los videos y se pausan estos.

Cortes (§126): a los $150 con menos de 5 conversaciones, pausar; a los
$400 con 0 ventas, pausar.

Uso:
    python3 scripts/campana-whatsapp-oct24.py              # ensayo
    python3 scripts/campana-whatsapp-oct24.py --aplicar    # crea en pausa
    python3 scripts/campana-whatsapp-oct24.py --anuncios-foto
    python3 scripts/campana-whatsapp-oct24.py --anuncios-video   # 29 oct: videos del dueño
"""

import importlib.util
import json
import os
import sys
from datetime import datetime, timedelta, timezone

_ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "campana-kits-oct19.py")
_spec = importlib.util.spec_from_file_location("kits", _ruta)
kits = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(kits)

NOMBRE_CAMPANIA = "IMX | WhatsApp | Kits y combos | Oct24"
NOMBRE_CONJUNTO = "IMX | WhatsApp | Hombres 35-65 | 9:00-21:00 | Oct24"
TOPE_PRUEBA = 400                       # pesos, total de la prueba
INICIO = "2026-10-26T09:00:00-0600"
FIN = "2026-10-30T21:00:00-0600"
# adset_schedule va en minutos desde la medianoche, hora de la cuenta; días 0=domingo.
# Meta solo acepta horas cerradas. El dueño contesta hasta las 22:00 (24 oct): 21:00 le deja una hora.
HORARIO = [{"start_minute": 9 * 60, "end_minute": 21 * 60, "days": [0, 1, 2, 3, 4, 5, 6],
            "timezone_type": "ADVERTISER"}]  # hora de la cuenta, no la de quien ve el anuncio


CONJUNTO = "120250719524550175"
CIERRE = ("Envío gratis a todo México · Llega en 2 a 7 días hábiles · Paga con tarjeta, a meses o en efectivo en OXXO. "
          "Somos tienda de pesca en Cuernavaca: te contesta una persona, de 9 a 10 de la noche.")
ANUNCIOS_FOTO = [
    {"clave": "kit-incluye-wa", "handle": "kit-listo-para-pescar-okuma-revenger-7-todo-terreno", "posicion": 3,
     "mensaje": ("¿Quieres salir a pescar y no sabes qué equipo comprar? Armamos kits listos para pescar: caña Okuma, "
                 "carrete, hilo, caja, señuelos, anzuelos y plomos. Lo abres y te vas a pescar.\n\n"
                 "Escríbenos por WhatsApp, cuéntanos dónde pescas y te decimos cuál te conviene.\n\n" + CIERRE),
     "titulo": "Kits listos para pescar", "descripcion": "Pregúntanos por WhatsApp"},
    {"clave": "cual-kit-wa", "handle": "kit-listo-para-pescar-okuma-revenger-7-todo-terreno", "posicion": 1,
     "mensaje": ("¿Presa, río o mar? Tenemos un kit para cada uno: Okuma Revenger para presa y río, Blue Fox Tolten "
                 "para mar y costa, y Blue Fox Fresh si vas empezando.\n\n"
                 "¿No sabes cuál? Mándanos mensaje por WhatsApp y te ayudamos a escoger.\n\n" + CIERRE),
     "titulo": "¿Cuál kit es para ti?", "descripcion": "Te ayudamos por WhatsApp"},
    {"clave": "combo-999-wa", "handle": "combo-okuma-boundary-70-spinning", "posicion": 1,
     "mensaje": ("Caña y carrete Okuma por $999, con envío gratis a todo México.\n\n"
                 "Escríbenos por WhatsApp y te lo apartamos. Pocas piezas.\n\n" + CIERRE),
     "titulo": "Caña + carrete Okuma · $999", "descripcion": "Envío gratis · Pregunta por WhatsApp"},
]


def anuncios_foto(cuenta, token):
    shop = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not shop:
        sys.exit("❌ Falta SHOPIFY_ADMIN_TOKEN (para leer las fotos de las fichas)")
    ids = {}
    for a in ANUNCIOS_FOTO:
        imgs = kits.shopify(f"products.json?handle={a['handle']}&fields=images", shop)["products"][0]["images"]
        url = next(i["src"] for i in imgs if i["position"] == a["posicion"]).split("?")[0]
        hash_ = kits.subir_imagen(cuenta, token, url, f"imx-{a['clave']}")
        link_data = {"image_hash": hash_, "link": "https://api.whatsapp.com/send", "message": a["mensaje"],
                     "name": a["titulo"], "description": a["descripcion"],
                     "call_to_action": {"type": "WHATSAPP_MESSAGE", "value": {"app_destination": "WHATSAPP"}}}
        creativo = kits.meta("POST", f"/{cuenta}/adcreatives", token, {
            "name": f"IMX | {a['clave']} | Oct24",
            "object_story_spec": json.dumps({"page_id": kits.PAGE_ID, "link_data": link_data})})["id"]
        ids[a["clave"]] = kits.meta("POST", f"/{cuenta}/ads", token, {
            "name": f"IMX | {a['clave']} | Oct24", "adset_id": CONJUNTO,
            # En PAUSA: el clasificador de la sesión no deja encender; lo enciende el dueño o la Mac.
            "creative": json.dumps({"creative_id": creativo}), "status": "PAUSED"})["id"]
        print(f"  ✓ {a['clave']}: anuncio {ids[a['clave']]}")
    inicio = (datetime.now(timezone(timedelta(hours=-6))) + timedelta(minutes=10)).strftime("%Y-%m-%dT%H:%M:00-0600")
    kits.meta("POST", f"/{CONJUNTO}", token, {"start_time": inicio})
    print(json.dumps({"anuncios": ids, "inicio_conjunto": inicio}, indent=1))


# Los videos no prometen "te contesta una persona": desde el 27 oct también
# contesta el respondedor automático (MANUAL §128-§129).
CIERRE_VIDEO = ("Envío gratis a todo México · Llega en 2 a 7 días hábiles · Paga con tarjeta, a meses o en efectivo en OXXO. "
                "Somos tienda de pesca en Cuernavaca; te contestamos de 9 a 10 de la noche.")
ANUNCIOS_VIDEO = {"emiliano-video-wa": "120250811297920175", "caja-video-wa": "120250811299970175",
                  "cual-video-wa": "120250811301280175", "combo-video-wa": "120250811303420175"}

VIDEOS = [
    # (clave, video 9:16 para historias y reels, video 4:5 para feed, texto, título)
    ("emiliano-video-wa", "2591048991406348", "1732276471183975",
     "¿Quieres salir a pescar y no sabes qué equipo comprar? Soy Emiliano, de Intemperie México. Armamos kits con caña, "
     "carrete, hilo y todo lo necesario, listos para usar.\n\nEscríbeme por WhatsApp, cuéntame dónde pescas y te digo "
     "cuál te conviene.\n\n" + CIERRE_VIDEO, "Te ayudo a escoger tu equipo"),
    ("caja-video-wa", "2208557973372286", "1113116031511689",
     "Esto trae el kit: caña Okuma, carrete, hilo, caja, señuelos, anzuelos, plomos y flotadores. Lo abres y te vas a "
     "pescar.\n\n¿Quieres uno? Escríbenos por WhatsApp.\n\n" + CIERRE_VIDEO, "Kits listos para pescar"),
    ("cual-video-wa", "1565343995622771", "1456915719741211",
     "¿Presa, río o mar? Tenemos un kit para cada uno. ¿No sabes cuál? Mándanos mensaje por WhatsApp y te ayudamos a "
     "escoger.\n\n" + CIERRE_VIDEO, "¿Cuál kit es para ti?"),
    ("combo-video-wa", "1678053247332699", "1005190099281055",
     "Caña y carrete Okuma por $999, con envío gratis a todo México.\n\nEscríbenos por WhatsApp y te lo apartamos. "
     "Pocas piezas.\n\n" + CIERRE_VIDEO, "Caña + carrete Okuma · $999"),
]


def miniatura(token, video_id):
    tn = kits.meta("GET", f"/{video_id}/thumbnails", token)["data"]
    return next((t for t in tn if t.get("is_preferred")), tn[0])["uri"]


def creativo_video(cuenta, token, clave, v916, v45, texto, titulo, sufijo="Oct29"):
    cta = {"type": "WHATSAPP_MESSAGE", "value": {"app_destination": "WHATSAPP"}}
    spec = {
        "videos": [{"video_id": v916, "thumbnail_url": miniatura(token, v916), "adlabels": [{"name": "v916"}]},
                   {"video_id": v45, "thumbnail_url": miniatura(token, v45), "adlabels": [{"name": "v45"}]}],
        "bodies": [{"text": texto}], "titles": [{"text": titulo}],
        "link_urls": [{"website_url": "https://api.whatsapp.com/send"}],
        "call_to_action_types": ["WHATSAPP_MESSAGE"], "call_to_actions": [cta],
        "ad_formats": ["SINGLE_VIDEO"], "optimization_type": "PLACEMENT",
        "asset_customization_rules": [
            {"customization_spec": {"publisher_platforms": ["facebook"], "facebook_positions": ["feed"]},
             "video_label": {"name": "v45"}, "priority": 1},
            {"customization_spec": {"publisher_platforms": ["facebook"], "facebook_positions": ["story", "facebook_reels"]},
             "video_label": {"name": "v916"}, "priority": 2},
        ],
    }
    return kits.meta("POST", f"/{cuenta}/adcreatives", token, {
        "name": f"IMX | {clave} | {sufijo}",
        "object_story_spec": json.dumps({"page_id": kits.PAGE_ID}),
        "asset_feed_spec": json.dumps(spec)})["id"]


def corregir_texto_video(cuenta, token):
    """29 oct: cambia el creativo de los 4 anuncios de video (en pausa) por uno
    con CIERRE_VIDEO, sin "te contesta una persona"."""
    for clave, v916, v45, texto, titulo in VIDEOS:
        nuevo = creativo_video(cuenta, token, clave, v916, v45, texto, titulo, "Oct29b")
        kits.meta("POST", f"/{ANUNCIOS_VIDEO[clave]}", token, {"creative": json.dumps({"creative_id": nuevo})})
        print(f"  ✓ {clave}: creativo {nuevo}")


def anuncios_video(cuenta, token):
    """4 anuncios de video (29 oct): un anuncio por concepto, con el video 4:5 en
    el feed y el 9:16 en historias y reels (personalización por ubicación)."""
    ids = {}
    for clave, v916, v45, texto, titulo in VIDEOS:
        creativo = creativo_video(cuenta, token, clave, v916, v45, texto, titulo)
        ids[clave] = kits.meta("POST", f"/{cuenta}/ads", token, {
            "name": f"IMX | {clave} | Oct29", "adset_id": CONJUNTO,
            # En PAUSA: el clasificador de la sesión no deja encender; lo enciende el dueño o la Mac.
            "creative": json.dumps({"creative_id": creativo}), "status": "PAUSED"})["id"]
        print(f"  ✓ {clave}: anuncio {ids[clave]}")
    print(json.dumps(ids, indent=1))


def main():
    if "--corregir-texto-video" in sys.argv:
        return corregir_texto_video(os.environ["META_AD_ACCOUNT_ID"], os.environ["META_ACCESS_TOKEN"])
    if "--anuncios-video" in sys.argv:
        return anuncios_video(os.environ["META_AD_ACCOUNT_ID"], os.environ["META_ACCESS_TOKEN"])
    if "--anuncios-foto" in sys.argv:
        return anuncios_foto(os.environ["META_AD_ACCOUNT_ID"], os.environ["META_ACCESS_TOKEN"])
    aplicar = "--aplicar" in sys.argv
    token, cuenta = os.environ.get("META_ACCESS_TOKEN"), os.environ.get("META_AD_ACCOUNT_ID")
    if not (token and cuenta):
        sys.exit("❌ Faltan META_ACCESS_TOKEN o META_AD_ACCOUNT_ID")
    estado = kits.meta("GET", f"/{cuenta}", token, {"fields": "amount_spent,spend_cap"})
    gastado = int(estado["amount_spent"])          # centavos
    nuevo_tope = f"{(gastado + TOPE_PRUEBA * 100) / 100:.2f}"  # se escribe en pesos
    print(f"Gastado en la cuenta: ${gastado / 100:,.2f}; tope actual ${int(estado['spend_cap']) / 100:,.2f}; "
          f"tope nuevo {nuevo_tope}")
    print(f"Campaña: {NOMBRE_CAMPANIA}\nConjunto: {NOMBRE_CONJUNTO}\n  ${TOPE_PRUEBA} del {INICIO[:10]} al {FIN[:10]}, 9:00–21:00")
    if not aplicar:
        print("\nEnsayo: no se creó nada. Agrega --aplicar.")
        return

    # Si una corrida anterior dejó la campaña sin conjunto, se reutiliza en vez de duplicarla.
    camp = next((c["id"] for c in kits.meta("GET", f"/{cuenta}/campaigns", token, {"fields": "id,name"})["data"]
                 if c["name"] == NOMBRE_CAMPANIA), None)
    if camp and kits.meta("GET", f"/{camp}/adsets", token, {"fields": "id"})["data"]:
        sys.exit(f"La campaña {camp} ya tiene conjunto; no se duplica.")
    camp = camp or kits.meta("POST", f"/{cuenta}/campaigns", token, {
        "name": NOMBRE_CAMPANIA, "objective": "OUTCOME_ENGAGEMENT", "status": "PAUSED",
        "special_ad_categories": "[]", "is_adset_budget_sharing_enabled": "false",
    })["id"]
    conjunto = kits.meta("POST", f"/{cuenta}/adsets", token, {
        "name": NOMBRE_CONJUNTO, "campaign_id": camp, "status": "PAUSED",
        "lifetime_budget": TOPE_PRUEBA * 100, "start_time": INICIO, "end_time": FIN,
        "pacing_type": json.dumps(["day_parting"]), "adset_schedule": json.dumps(HORARIO),
        "bid_strategy": "LOWEST_COST_WITHOUT_CAP", "billing_event": "IMPRESSIONS",
        "destination_type": "WHATSAPP", "optimization_goal": "CONVERSATIONS",
        "promoted_object": json.dumps({"page_id": kits.PAGE_ID}),
        "targeting": json.dumps({
            "geo_locations": {"countries": ["MX"]},
            "genders": [1], "age_min": 35, "age_max": 65,
            "publisher_platforms": ["facebook"],
            "facebook_positions": ["feed", "story", "facebook_reels"],
            "device_platforms": ["mobile"],
            "targeting_automation": {"advantage_audience": 0},
        }),
    })["id"]
    kits.meta("POST", f"/{cuenta}", token, {"spend_cap": nuevo_tope})
    print(json.dumps({"campania": camp, "conjunto": conjunto, "tope_cuenta": nuevo_tope}, indent=1))


if __name__ == "__main__":
    main()
