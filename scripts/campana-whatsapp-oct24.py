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
Los anuncios (con los videos reales del dueño) se agregan después con
--anuncios <video>... cuando existan.

Cortes (§126): a los $150 con menos de 5 conversaciones, pausar; a los
$400 con 0 ventas, pausar.

Uso:
    python3 scripts/campana-whatsapp-oct24.py              # ensayo
    python3 scripts/campana-whatsapp-oct24.py --aplicar    # crea en pausa
"""

import importlib.util
import json
import os
import sys

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


def main():
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
