#!/usr/bin/env python3
"""Gestiona las campañas de Meta Ads (Facebook/Instagram) de Intemperie México.

Habla directo contra la Marketing API de Meta (graph.facebook.com) con un
token de System User de larga duración. No sube armas, municiones ni
accesorios de armas a los anuncios: Meta prohíbe promoverlos y el riesgo
real es el baneo permanente de la cuenta publicitaria.

Uso:
    META_ACCESS_TOKEN=... python3 scripts/meta-ads.py listar
    ... meta-ads.py reporte --dias 7
    ... meta-ads.py pausar --campania <id>
    ... meta-ads.py activar --campania <id>
    ... meta-ads.py presupuesto --campania <id> --monto 150

Variables de entorno:
    META_ACCESS_TOKEN   (obligatoria) token de System User (ads_management, ads_read)
    META_AD_ACCOUNT_ID  (obligatoria) "act_..." de la cuenta publicitaria
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

API_VERSION = "v21.0"
BASE_URL = f"https://graph.facebook.com/{API_VERSION}"


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
    since_until = {"date_preset": "last_7d" if args.dias == 7 else "today"}
    if args.dias != 7:
        since_until = {"time_range": json.dumps({"since": _n_days_ago(args.dias), "until": _today()})}
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


def _today():
    import datetime

    return datetime.date.today().isoformat()


def _n_days_ago(n):
    import datetime

    return (datetime.date.today() - datetime.timedelta(days=n)).isoformat()


def cmd_pausar(token, account_id, args):
    _require(args.campania, "--campania")
    api_request("POST", f"/{args.campania}", token, body={"status": "PAUSED"})
    print(f"Campaña {args.campania} pausada.")


def cmd_activar(token, account_id, args):
    _require(args.campania, "--campania")
    api_request("POST", f"/{args.campania}", token, body={"status": "ACTIVE"})
    print(f"Campaña {args.campania} activada.")


def cmd_presupuesto(token, account_id, args):
    _require(args.campania, "--campania")
    _require(args.monto, "--monto")
    centavos = int(round(args.monto * 100))
    api_request("POST", f"/{args.campania}", token, body={"daily_budget": centavos})
    print(f"Presupuesto diario de {args.campania} actualizado a ${args.monto:.2f} MXN/día.")


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

    args = parser.parse_args()

    token = require_env("META_ACCESS_TOKEN")
    account_id = require_env("META_AD_ACCOUNT_ID")

    commands = {
        "listar": cmd_listar,
        "reporte": cmd_reporte,
        "pausar": cmd_pausar,
        "activar": cmd_activar,
        "presupuesto": cmd_presupuesto,
    }
    commands[args.comando](token, account_id, args)


if __name__ == "__main__":
    main()
