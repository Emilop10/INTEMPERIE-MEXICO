#!/usr/bin/env python3
"""
Crea los combos propuestos en COMBOS-NUEVOS-PENDIENTES.md.

Uso:
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/crear-combos.py --dry-run
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/crear-combos.py

Variables de entorno:
    SHOPIFY_ADMIN_TOKEN  (obligatoria) token con write_products y write_inventory
    SHOPIFY_STORE        dominio myshopify (default: wfuxvx-yn.myshopify.com)

Ver INSTRUCTIVO-CREDENCIALES-SHOPIFY.md si falta el token.

Los crea en estado BORRADOR (`draft`) a proposito: un combo es un producto
vendible con precio, y el precio/stock son decision del dueno. En borrador
no es visible para clientes y se puede ajustar o borrar sin consecuencias.
Publicarlo es un cambio de un clic en el admin.

`product_type: "Combos"` hace que entre solo a la coleccion automatica
`combos` (smart collection con la regla `type equals Combos`) — no hay que
agregarlo a mano.

⚠️ AVISO DE SOBREVENTA: Shopify NO descuenta el stock de los componentes
cuando se vende un combo. Si la misma cana esta publicada suelta y dentro
de un combo, se pueden vender las dos y solo haber una. Por eso la
cantidad de cada combo se fija al MINIMO de sus componentes, y aun asi
hay que descontar a mano al vender.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request

API_VERSION = "2024-10"

COMBOS = [
    {
        "titulo": "Combo Okuma Revenger 8'0\" (2.40m) — Caña + Carrete",
        "precio": "999.00",
        "vendor": "Okuma",
        "tags": "combos, okuma, pesca",
        "componentes": [
            "cana-de-pescar-okuma-revenger-spinning-80-2-40m",
            "carrete-okuma-revenger-rv-80-spinning",
        ],
        "descripcion": (
            "<p>Combo listo para pescar de la l&iacute;nea Revenger de Okuma: ca&ntilde;a y "
            "carrete de la misma familia, pensados para trabajar juntos.</p>"
            "<p><strong>Incluye:</strong></p><ul>"
            "<li>Ca&ntilde;a de Pescar Okuma Revenger Spinning 8'0\" (2.40m) &mdash; 2 piezas, acci&oacute;n medium</li>"
            "<li>Carrete Okuma Revenger RV-80 Spinning &mdash; relaci&oacute;n 4.8:1, arrastre m&aacute;ximo 12 kg, alarma de pique</li>"
            "</ul><p>Ideal para pesca general en agua dulce y salada ligera.</p>"
        ),
        "especificaciones": [
            "Longitud de la caña: 2.40 m (8 pies)",
            "Secciones: 2",
            "Acción: medium",
            "Relación de transmisión del carrete: 4.8:1",
            "Arrastre máximo: 12 kg",
            "Uso recomendado: pesca general, spinning",
        ],
    },
    {
        "titulo": "Combo Blue Fox Power Boat 6'4\" (1.95m) — Caña + Carrete",
        "precio": "1049.00",
        "vendor": "Blue Fox",
        "tags": "combos, blue fox, pesca",
        "componentes": [
            "cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m",
            "carrete-blue-fox-ranco-3000sp-spinning",
        ],
        "descripcion": (
            "<p>Combo Blue Fox para pesca desde embarcaci&oacute;n: ca&ntilde;a r&iacute;gida de "
            "acci&oacute;n heavy con carrete de cuerpo de grafito, ambos de la misma marca.</p>"
            "<p><strong>Incluye:</strong></p><ul>"
            "<li>Ca&ntilde;a de Pescar Blue Fox Power Boat Spinning 6'4\" (1.95m) &mdash; fibra de vidrio, mango EVA, acci&oacute;n heavy</li>"
            "<li>Carrete Blue Fox Ranco 3000SP Spinning &mdash; relaci&oacute;n 5.1:1, 4 baleros, freno delantero, alarma de pique</li>"
            "</ul><p>Pensado para peces grandes sin sacrificar comodidad.</p>"
        ),
        "especificaciones": [
            "Longitud de la caña: 1.95 m",
            "Material: fibra de vidrio",
            "Mango: EVA",
            "Secciones: 2",
            "Acción: heavy",
            "Relación de transmisión del carrete: 5.1:1",
            "Baleros: 4",
            "Uso recomendado: pesca en bote/embarcación",
        ],
    },
    {
        "titulo": "Combo Rapala Corux 240 (7'10\") — Caña + Carrete + Caja",
        "precio": "1499.00",
        "vendor": "Rapala",
        "tags": "combos, rapala, pesca",
        "componentes": [
            "cana-de-pescar-rapala-corux-240-710",
            "carrete-gimbel-jl4000-spinning",
            "caja-rapala-utility-box-chica",
        ],
        "descripcion": (
            "<p>Equipo completo para empezar: ca&ntilde;a de carbono, carrete de 4+1 baleros "
            "y caja herm&eacute;tica para guardar se&ntilde;uelos.</p>"
            "<p><strong>Incluye:</strong></p><ul>"
            "<li>Ca&ntilde;a de Pescar Rapala Corux 240 (7'10\") &mdash; carbono, mango de corcho, 2 piezas, acci&oacute;n media</li>"
            "<li>Carrete Gimbel JL4000 Spinning &mdash; relaci&oacute;n 5.0:1, 4+1 baleros, 280 g</li>"
            "<li>Caja Rapala Utility Box Chica &mdash; sellada e impermeable, espuma ranurada</li>"
            "</ul><p>Ideal para pesca desde orilla, playa o laguna.</p>"
        ),
        "especificaciones": [
            "Longitud de la caña: 2.40 m",
            "Material: carbono",
            "Mango: corcho",
            "Secciones: 2",
            "Acción: media",
            "Relación de transmisión del carrete: 5.0:1",
            "Baleros: 4+1",
            "Caja: 12 x 10 x 5 cm aprox., cierre hermético",
            "Uso recomendado: agua dulce, orilla y playa",
        ],
    },
]


def api(method, path, token, store, body=None):
    url = f"https://{store}/admin/api/{API_VERSION}{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-Shopify-Access-Token", token)
    req.add_header("Content-Type", "application/json")
    for intento in range(5):
        try:
            with urllib.request.urlopen(req) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429 and intento < 4:
                time.sleep(float(e.headers.get("Retry-After", 2)))
                continue
            raise RuntimeError(f"{method} {path} -> {e.code}: {e.read().decode()[:300]}")
    raise RuntimeError(f"{method} {path}: agotados los reintentos")


def buscar(handle, token, store):
    r = api("GET", f"/products.json?handle={handle}", token, store)
    ps = r.get("products", [])
    return ps[0] if ps else None


def main():
    dry = "--dry-run" in sys.argv
    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not token:
        sys.exit("Falta SHOPIFY_ADMIN_TOKEN. Ver INSTRUCTIVO-CREDENCIALES-SHOPIFY.md")
    store = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")

    shop = api("GET", "/shop.json", token, store)
    location_id = shop["shop"]["primary_location_id"]

    creados = 0
    for combo in COMBOS:
        print(f"\n=== {combo['titulo']} ===")

        # Resolver componentes: imagenes y stock disponible.
        imagenes, stocks, faltan = [], [], []
        for h in combo["componentes"]:
            p = buscar(h, token, store)
            if not p:
                faltan.append(h)
                continue
            if p["images"]:
                imagenes.append(p["images"][0]["src"])
            v = p["variants"][0]
            stocks.append(v.get("inventory_quantity") or 0)
            print(f"   componente: {h[:44]:46} ${v['price']:>8}  qty={v.get('inventory_quantity')}")

        if faltan:
            print(f"   !! componentes no encontrados, se omite el combo: {faltan}")
            continue

        # El combo no puede exceder el minimo de sus componentes.
        cantidad = min(stocks) if stocks else 0
        suma = sum(float(buscar(h, token, store)["variants"][0]["price"]) for h in combo["componentes"])
        ahorro = suma - float(combo["precio"])
        print(f"   suma de partes: ${suma:,.2f}  ->  combo ${float(combo['precio']):,.2f}  (ahorro ${ahorro:,.2f})")
        print(f"   cantidad posible con el stock actual: {cantidad}")

        if dry:
            print("   DRY-RUN: no se crea")
            continue

        cuerpo = {
            "product": {
                "title": combo["titulo"],
                "body_html": combo["descripcion"],
                "vendor": combo["vendor"],
                "product_type": "Combos",
                "tags": combo["tags"],
                "status": "draft",  # no visible al publico hasta que el dueno lo publique
                "images": [{"src": src} for src in imagenes],
                "variants": [
                    {
                        "price": combo["precio"],
                        "inventory_management": "shopify",
                        "inventory_policy": "deny",
                        "requires_shipping": True,
                    }
                ],
            }
        }
        nuevo = api("POST", "/products.json", token, store, cuerpo)["product"]
        pid, vid = nuevo["id"], nuevo["variants"][0]["id"]
        inv_item = nuevo["variants"][0]["inventory_item_id"]
        print(f"   creado id={pid} handle={nuevo['handle']} status={nuevo['status']}")

        # El stock no se puede fijar al crear: va aparte por inventory_levels.
        api(
            "POST",
            "/inventory_levels/set.json",
            token,
            store,
            {"location_id": location_id, "inventory_item_id": inv_item, "available": cantidad},
        )
        print(f"   stock fijado en {cantidad}")

        # Ficha tecnica del combo, mismo metafield que el resto del catalogo.
        api(
            "POST",
            f"/products/{pid}/metafields.json",
            token,
            store,
            {
                "metafield": {
                    "namespace": "custom",
                    "key": "especificaciones",
                    "type": "list.single_line_text_field",
                    "value": json.dumps(combo["especificaciones"], ensure_ascii=False),
                }
            },
        )
        print(f"   ficha tecnica cargada ({len(combo['especificaciones'])} lineas)")
        creados += 1
        time.sleep(0.6)

    print()
    if dry:
        print("DRY-RUN: no se creo nada.")
    else:
        print(f"Combos creados: {creados} (en BORRADOR — hay que publicarlos desde el admin)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
