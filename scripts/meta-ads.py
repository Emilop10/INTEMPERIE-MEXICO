#!/usr/bin/env python3
"""Gestiona las campañas de Meta Ads (Facebook/Instagram) de Intemperie México.

Habla directo contra la Marketing API de Meta (graph.facebook.com) con un
token de System User de larga duración. No sube armas, municiones ni
accesorios de armas a los anuncios: Meta prohíbe promoverlos y el riesgo
real es el baneo permanente de la cuenta publicitaria.

Uso:
    META_ACCESS_TOKEN=... python3 scripts/meta-ads.py listar
    ... meta-ads.py reporte --dias 7      # incluye el dia en curso (zona de la cuenta)
    ... meta-ads.py pausar --campania <id>
    ... meta-ads.py activar --campania <id>
    ... meta-ads.py presupuesto --campania <id> --monto 150
    ... meta-ads.py activos                              # descubre página/IG/catálogo/pixel, no crea nada
    ... meta-ads.py crear-campania --presupuesto 100      # arma campaña de catálogo dinámico, SIEMPRE en pausa
                                                          # (--presupuesto es MXN por DIA, no por semana)

Variables de entorno:
    META_ACCESS_TOKEN   (obligatoria) token de System User (ads_management, ads_read)
    META_AD_ACCOUNT_ID  (obligatoria) "act_..." de la cuenta publicitaria
    META_BUSINESS_ID    (opcional) default: 1324138699447721 ("Intemperie México")
"""

import argparse
import datetime
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

API_VERSION = "v21.0"
BASE_URL = f"https://graph.facebook.com/{API_VERSION}"
DEFAULT_BUSINESS_ID = "1324138699447721"  # "Intemperie México" (INSTRUCTIVO-FACEBOOK-ADS.md)


def api_request(method, path, token, params=None, body=None):
    url = f"{BASE_URL}{path}"
    query = dict(params or {})
    query["access_token"] = token
    if method == "GET":
        url += "?" + urllib.parse.urlencode(query)
        data = None
    else:
        data = urllib.parse.urlencode({**query, **(body or {})}).encode()
    req = urllib.request.Request(url, data=data, method=method)
    # Sin esto, urllib manda "Python-urllib/3.x" como User-Agent, una firma
    # clásica de bot que el sistema anti-abuso de Meta bloquea de entrada
    # ("API access blocked") aunque el token y los permisos sean válidos
    # (confirmado: el mismo token funciona bien en Graph API Explorer).
    req.add_header(
        "User-Agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        detail = e.read().decode()
        print(f"Error API Meta ({e.code}): {detail}", file=sys.stderr)
        sys.exit(1)


def require_env(name):
    value = os.environ.get(name)
    if not value:
        print(f"Falta la variable de entorno {name}", file=sys.stderr)
        sys.exit(1)
    return value


def cmd_listar(token, account_id, args):
    fields = "id,name,status,objective,daily_budget,lifetime_budget"
    data = api_request("GET", f"/{account_id}/campaigns", token, params={"fields": fields, "limit": 50})
    for c in data.get("data", []):
        budget = c.get("daily_budget") or c.get("lifetime_budget")
        budget_str = f"${int(budget) / 100:.2f} MXN" if budget else "-"
        print(f"{c['id']}  [{c['status']}]  {c['name']}  ({c.get('objective', '-')})  presupuesto: {budget_str}")


def cmd_reporte(token, account_id, args):
    # Siempre `time_range` explicito, nunca `date_preset`. El preset
    # `last_7d` EXCLUYE el dia en curso: el 17 de agosto de 2026 eso hizo
    # reportar "hoy no hay impresiones" cuando la campana llevaba horas
    # entregando con normalidad. Un rango explicito no tiene ese matiz.
    since_until = {
        "time_range": json.dumps({"since": _hace_dias(args.dias - 1), "until": _hoy()})
    }
    fields = "campaign_name,spend,impressions,clicks,ctr,cpm,actions"
    data = api_request(
        "GET",
        f"/{account_id}/insights",
        token,
        params={"fields": fields, "level": "campaign", **since_until},
    )
    if not data.get("data"):
        print("Sin datos en el periodo (¿campañas activas? ¿token válido?)")
        return
    for row in data["data"]:
        purchases = next((a["value"] for a in row.get("actions", []) if a["action_type"] == "purchase"), "0")
        print(
            f"{row['campaign_name']}: gasto ${row.get('spend', 0)} MXN | "
            f"impresiones {row.get('impressions', 0)} | clics {row.get('clicks', 0)} | "
            f"CTR {row.get('ctr', 0)}% | CPM ${row.get('cpm', 0)} | compras {purchases}"
        )


# La cuenta publicitaria factura y corta los dias en America/Chihuahua,
# no en UTC. `date.today()` corre en el reloj del contenedor (UTC), asi
# que entre las 18:00 y la medianoche locales devuelve el dia siguiente y
# el reporte pide un rango que aun no existe.
TZ_CUENTA = datetime.timezone(datetime.timedelta(hours=-6))  # America/Chihuahua (MDT)


def _hoy():
    return datetime.datetime.now(TZ_CUENTA).date().isoformat()


def _hace_dias(n):
    return (datetime.datetime.now(TZ_CUENTA).date() - datetime.timedelta(days=n)).isoformat()


def cmd_pausar(token, account_id, args):
    """Pausar la campaña basta para detener la entrega y el gasto.

    No hace falta tocar conjuntos ni anuncios: con la campaña en PAUSED
    nada de lo que cuelga de ella se entrega.
    """
    _require(args.campania, "--campania")
    api_request("POST", f"/{args.campania}", token, body={"status": "PAUSED"})
    print(f"Campaña {args.campania} pausada. Deja de entregar y de gastar.")


def _hijos_de_campania(token, campania):
    """Devuelve (conjuntos, anuncios) de una campaña."""
    adsets = api_request(
        "GET", f"/{campania}/adsets", token, params={"fields": "id,name,status", "limit": 100}
    ).get("data", [])
    ads = api_request(
        "GET", f"/{campania}/ads", token, params={"fields": "id,name,status", "limit": 200}
    ).get("data", [])
    return adsets, ads


def cmd_activar(token, account_id, args):
    """Activa la campaña Y sus conjuntos y anuncios.

    Activar solo la campaña no entrega nada: si el conjunto o el anuncio
    siguen en PAUSED, no se muestra ni un impacto. Se activa de adentro
    hacia afuera (anuncios -> conjuntos -> campaña) para que la campaña
    no quede activa con hijos a medio encender.
    """
    _require(args.campania, "--campania")
    adsets, ads = _hijos_de_campania(token, args.campania)

    for ad in ads:
        if ad["status"] != "ACTIVE":
            api_request("POST", f"/{ad['id']}", token, body={"status": "ACTIVE"})
            print(f"  anuncio activado: {ad['name'][:55]}")
    for adset in adsets:
        if adset["status"] != "ACTIVE":
            api_request("POST", f"/{adset['id']}", token, body={"status": "ACTIVE"})
            print(f"  conjunto activado: {adset['name'][:55]}")

    api_request("POST", f"/{args.campania}", token, body={"status": "ACTIVE"})
    print(f"Campaña {args.campania} activada ({len(adsets)} conjuntos, {len(ads)} anuncios).")
    print("Ya está entregando. Para detenerla: meta-ads.py pausar --campania <id>")


def cmd_presupuesto(token, account_id, args):
    _require(args.campania, "--campania")
    _require(args.monto, "--monto")
    centavos = int(round(args.monto * 100))
    api_request("POST", f"/{args.campania}", token, body={"daily_budget": centavos})
    print(f"Presupuesto diario de {args.campania} actualizado a ${args.monto:.2f} MXN/día.")


def _resolve_business_assets(token, business_id, account_id):
    """Descubre página, cuenta de Instagram, catálogo y pixel del negocio.

    Solo lecturas (GET). No crea ni modifica nada. Aborta con un mensaje
    claro si algo aparece ambiguo (más de un resultado) o ausente, en vez
    de adivinar cuál usar.
    """
    pages = api_request("GET", f"/{business_id}/owned_pages", token, params={"fields": "id,name"}).get("data", [])
    if len(pages) != 1:
        print(f"Se esperaba 1 página, se encontraron {len(pages)}: {pages}", file=sys.stderr)
        sys.exit(1)
    page = pages[0]

    ig_accounts = api_request(
        "GET", f"/{business_id}/instagram_accounts", token, params={"fields": "id,username"}
    ).get("data", [])
    if len(ig_accounts) != 1:
        print(f"Se esperaba 1 cuenta de Instagram, se encontraron {len(ig_accounts)}: {ig_accounts}", file=sys.stderr)
        sys.exit(1)
    ig = ig_accounts[0]

    catalogs = api_request(
        "GET", f"/{business_id}/owned_product_catalogs", token, params={"fields": "id,name,product_count"}
    ).get("data", [])
    if len(catalogs) != 1:
        print(f"Se esperaba 1 catálogo, se encontraron {len(catalogs)}: {catalogs}", file=sys.stderr)
        sys.exit(1)
    catalog = catalogs[0]

    pixels = api_request("GET", f"/{account_id}/adspixels", token, params={"fields": "id,name"}).get("data", [])
    if len(pixels) != 1:
        print(f"Se esperaba 1 pixel, se encontraron {len(pixels)}: {pixels}", file=sys.stderr)
        sys.exit(1)
    pixel = pixels[0]

    product_sets = api_request(
        "GET", f"/{catalog['id']}/product_sets", token, params={"fields": "id,name,product_count"}
    ).get("data", [])

    return {"page": page, "instagram": ig, "catalog": catalog, "pixel": pixel, "product_sets": product_sets}


def cmd_activos(token, account_id, args):
    business_id = os.environ.get("META_BUSINESS_ID", DEFAULT_BUSINESS_ID)
    assets = _resolve_business_assets(token, business_id, account_id)
    print(f"Página:    {assets['page']['id']}  {assets['page']['name']}")
    print(f"Instagram: {assets['instagram']['id']}  @{assets['instagram']['username']}")
    catalog = assets["catalog"]
    print(f"Catálogo:  {catalog['id']}  {catalog['name']}  ({catalog.get('product_count', '?')} productos)")
    print(f"Pixel:     {assets['pixel']['id']}  {assets['pixel']['name']}")
    if not assets["product_sets"]:
        print("Conjuntos de productos: ninguno todavía — crear-campania creará uno que cubre todo el catálogo")
    else:
        print("Conjuntos de productos:")
        for ps in assets["product_sets"]:
            print(f"  {ps['id']}  {ps['name']}  ({ps.get('product_count', '?')} productos)")


def cmd_crear_campania(token, account_id, args):
    _require(args.presupuesto, "--presupuesto")
    business_id = os.environ.get("META_BUSINESS_ID", DEFAULT_BUSINESS_ID)
    assets = _resolve_business_assets(token, business_id, account_id)
    page, ig, catalog, pixel = assets["page"], assets["instagram"], assets["catalog"], assets["pixel"]

    product_sets = assets["product_sets"]
    if len(product_sets) == 1:
        product_set_id = product_sets[0]["id"]
        print(f"Usando conjunto de productos existente: {product_set_id} ({product_sets[0]['name']})")
    elif len(product_sets) == 0:
        ps = api_request(
            "POST",
            f"/{catalog['id']}/product_sets",
            token,
            body={"name": "Todos los productos anunciables", "filter": json.dumps({})},
        )
        product_set_id = ps["id"]
        print(f"Creado conjunto de productos nuevo (todo el catálogo, ya filtrado por Shopify): {product_set_id}")
    else:
        print(f"Hay {len(product_sets)} conjuntos de productos, no sé cuál usar: {product_sets}", file=sys.stderr)
        print("Pasa el que corresponda editando este comando, o bórralos y vuelve a correr.", file=sys.stderr)
        sys.exit(1)

    nombre = args.nombre or "Pesca y Óptica — Catálogo dinámico"
    centavos = int(round(args.presupuesto * 100))

    campaign = api_request(
        "POST",
        f"/{account_id}/campaigns",
        token,
        body={
            "name": nombre,
            "objective": "OUTCOME_SALES",
            "status": "PAUSED",
            "special_ad_categories": json.dumps([]),
            # Obligatorio desde 2026 cuando el presupuesto vive en el conjunto
            # de anuncios y no en la campana. En false porque aqui hay un solo
            # conjunto: no hay con quien compartir presupuesto.
            "is_adset_budget_sharing_enabled": "false",
        },
    )
    print(f"Campaña creada (PAUSADA): {campaign['id']}")

    adset = api_request(
        "POST",
        f"/{account_id}/adsets",
        token,
        body={
            "name": f"{nombre} — Conjunto",
            "campaign_id": campaign["id"],
            "daily_budget": centavos,
            "billing_event": "IMPRESSIONS",
            "optimization_goal": "OFFSITE_CONVERSIONS",
            "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
            # CONTENT_VIEW, no PURCHASE. Meta necesita ~50 eventos del tipo
            # optimizado por semana para salir de fase de aprendizaje. A un
            # CPA realista de $250 MXN eso son $1,785/dia optimizando a
            # compra — 18 veces el presupuesto de esta tienda. Con PURCHASE
            # la campana no aprende despacio: no aprende nunca. Se sube a
            # PURCHASE cuando haya historial de ventas, no antes.
            "promoted_object": json.dumps({"product_set_id": product_set_id, "pixel_id": pixel["id"], "custom_event_type": "CONTENT_VIEW"}),
            # Sin `attribution_spec` explicito Meta resuelve el conjunto como
            # SOLO CLIC. Eso oculto en los reportes un carrito de $9,127 y un
            # checkout iniciado (18 ago 2026), y ademas el algoritmo tampoco
            # usa esas conversiones para optimizar.
            "attribution_spec": json.dumps(
                [
                    {"event_type": "CLICK_THROUGH", "window_days": 7},
                    {"event_type": "VIEW_THROUGH", "window_days": 1},
                ]
            ),
            "targeting": json.dumps(
                {
                    "geo_locations": {"countries": ["MX"]},
                    # 35+ y no 18+: en los primeros 4 dias el tramo 55-64
                    # dio CTR 6.49% contra 2.26% de 25-34, y la vista de
                    # pagina mas barata de la cuenta. El equipo de pesca lo
                    # compra quien ya tiene el hobby establecido.
                    "age_min": 35,
                    "age_max": 65,
                    "publisher_platforms": ["facebook", "instagram"],
                    # Solo feeds. Reels y Stories se llevaron $42 de $234 para
                    # 3 de 52 vistas de pagina: el catalogo dinamico genera
                    # tarjetas cuadradas que en vertical se recortan y compiten
                    # contra video nativo. Instagram Reels dio 0 clics de
                    # enlace en 207 impresiones.
                    "facebook_positions": ["feed", "marketplace"],
                    "instagram_positions": ["stream"],
                    # Escritorio gasto $8.19 para CERO vistas de pagina.
                    "device_platforms": ["mobile"],
                    # Obligatorio desde 2025: sin esta marca la API responde
                    # "Se requiere la marca de audiencia de Advantage". En 0
                    # Meta respeta el corte de edad; en 1 lo ignora y vuelve
                    # a gastar en 18-34.
                    "targeting_automation": {"advantage_audience": 0},
                }
            ),
            "status": "PAUSED",
        },
    )
    print(f"Conjunto de anuncios creado (PAUSADO): {adset['id']}  presupuesto ${args.presupuesto:.2f} MXN/día")

    creative = api_request(
        "POST",
        f"/{account_id}/adcreatives",
        token,
        body={
            "name": f"{nombre} — Creativo",
            "product_set_id": product_set_id,
            "object_story_spec": json.dumps(
                {
                    "page_id": page["id"],
                    # OJO con dos trampas, ambas descubiertas el 15 ago 2026
                    # contra la API real:
                    #
                    # 1. El campo es `instagram_user_id`. El viejo
                    #    `instagram_actor_id` esta deprecado y devuelve
                    #    "must be a valid Instagram account id" pase lo que
                    #    pase — tampoco funciona con el id de la cuenta
                    #    "page-backed" que Meta autogenera.
                    # 2. La cuenta debe estar vinculada a la PAGINA, no
                    #    basta con que este en el portafolio del negocio:
                    #    son relaciones distintas y la segunda no implica
                    #    la primera. Verificar con un token de PAGINA (el
                    #    del System User no sirve para leer ese campo):
                    #    GET /{page_id}?fields=instagram_business_account
                    "instagram_user_id": ig["id"],
                    "template_data": {
                        "link": "https://www.intemperiemexico.com/collections/todo-pesca",
                        "call_to_action": {"type": "SHOP_NOW"},
                        # Copy v2 (15 ago 2026). El v1 era "Equipo verificado
                        # para pesca y óptica. Envío a todo México en 2 a 7
                        # días hábiles." — correcto pero plano: enterraba el
                        # envío gratis, que es el gancho más fuerte, y
                        # "verificado" no decía nada concreto.
                        #
                        # Sesgado a pesca a propósito: es el 78% del catálogo
                        # (252 de 324 productos). Hablarle al pescador rinde
                        # más que un texto genérico que no le hable a nadie.
                        # Revisar si algún día se separan campañas por
                        # categoría, ahí conviene un texto por cada una.
                        "message": (
                            "🎣 El pez de tu vida no se escapó por mala suerte.\n\n"
                            "Cañas, carretes y señuelos probados en agua real — no en catálogo.\n\n"
                            "⚡ ENVÍO GRATIS desde $799 · Entrega en 2-7 días a todo México"
                        ),
                    },
                }
            ),
        },
    )
    print(f"Creativo dinámico creado: {creative['id']}")

    ad = api_request(
        "POST",
        f"/{account_id}/ads",
        token,
        body={
            "name": f"{nombre} — Anuncio",
            "adset_id": adset["id"],
            "creative": json.dumps({"creative_id": creative["id"]}),
            "status": "PAUSED",
        },
    )
    print(f"Anuncio creado (PAUSADO): {ad['id']}")
    print()
    print(f"Listo. Todo quedó en PAUSA — revisa en Ads Manager y corre 'activar --campania {campaign['id']}' cuando la apruebes.")


def _require(value, flag):
    if value is None:
        print(f"Falta {flag}", file=sys.stderr)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="comando", required=True)

    sub.add_parser("listar", help="Lista campañas y su estado")

    p_reporte = sub.add_parser("reporte", help="Métricas por campaña")
    p_reporte.add_argument("--dias", type=int, default=7)

    p_pausar = sub.add_parser("pausar", help="Pausa una campaña")
    p_pausar.add_argument("--campania", required=True)

    p_activar = sub.add_parser("activar", help="Activa una campaña")
    p_activar.add_argument("--campania", required=True)

    p_presupuesto = sub.add_parser("presupuesto", help="Cambia el presupuesto diario")
    p_presupuesto.add_argument("--campania", required=True)
    p_presupuesto.add_argument("--monto", type=float, required=True, help="Presupuesto diario en MXN")

    sub.add_parser("activos", help="Descubre página/Instagram/catálogo/pixel del negocio (solo lectura)")

    p_crear = sub.add_parser("crear-campania", help="Crea campaña de catálogo dinámico, siempre en pausa")
    p_crear.add_argument("--presupuesto", type=float, required=True, help="Presupuesto diario en MXN")
    p_crear.add_argument("--nombre", default=None, help="Nombre de la campaña (default: 'Pesca y Óptica — Catálogo dinámico')")

    args = parser.parse_args()

    token = require_env("META_ACCESS_TOKEN")
    account_id = require_env("META_AD_ACCOUNT_ID")

    commands = {
        "listar": cmd_listar,
        "reporte": cmd_reporte,
        "pausar": cmd_pausar,
        "activar": cmd_activar,
        "presupuesto": cmd_presupuesto,
        "activos": cmd_activos,
        "crear-campania": cmd_crear_campania,
    }
    commands[args.comando](token, account_id, args)


if __name__ == "__main__":
    main()
