#!/usr/bin/env python3
"""
Kits "listos para pescar" (MANUAL §69, ANALISIS-ESTRATEGICO-30-SEP.md).

Por qué existen: los combos (caña + carrete) convierten 3.6% de vista a
carrito contra 0.75% de los productos sueltos (p = 0.002), pero los
combos de hoy caen en la zona de $799-$987, donde la tienda regala el
envío y la contribución queda en $78-$155. Un kit sube el ticket y usa
como relleno piezas de baja rotación (plomos, destorcedores, anzuelos,
flotadores, señuelos) que cuestan poco y valen mucho para el cliente.

Reglas de cada kit:
  - contribución >= $300 después de envío ($189) y caja de caña ($48.83)
  - precio fuera de la zona muerta (>= $988)
  - existencia = mínimo de sus componentes, restando lo reservado por
    los combos manuales que ya usan esas piezas

Uso:
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/crear-kits.py            # solo calcula
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/crear-kits.py --crear    # crea BORRADORES

Los crea en BORRADOR (`draft`): no los ve ningún cliente hasta que el
dueño confirme las piezas físicamente, tome la foto del kit y publique.
Es idempotente: si ya existe un producto con el mismo handle, no lo crea
otra vez.

⚠️ Igual que los combos manuales (crear-combos.py): Shopify NO descuenta
los componentes al vender un kit. Hay que descontarlos a mano, o instalar
la app gratuita "Shopify Bundles", que sí los sincroniza.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request

API_VERSION = "2024-10"
ENVIO = 189.00
CAJA_CANA = 48.83
CONTRIBUCION_MINIMA = 300.00

# Piezas que ya están comprometidas en combos manuales publicados
# (PENDIENTES.md, "Componentes de cada combo"). No se cuentan como
# disponibles para los kits.
RESERVADO = {
    "carrete-gimbel-jl4000-spinning": 1,          # Combo Rapala Corux
    "caja-rapala-utility-box-chica": 1,           # Combo Rapala Corux
    "cana-de-pescar-okuma-revenger-spinning-80-2-40m": 1,
    "carrete-okuma-revenger-rv-80-spinning": 1,
    "cana-de-pescar-blue-fox-power-boat-spinning-64-1-95m": 1,
    "carrete-blue-fox-ranco-3000sp-spinning": 1,
    "cana-de-pescar-rapala-corux-240-710": 1,
}

KITS = [
    {
        "handle": "kit-listo-para-pescar-okuma-revenger-7-todo-terreno",
        "titulo": "Kit Listo para Pescar Okuma Revenger 7'0\" — Todo Terreno",
        "precio": "1549.00",
        "vendor": "Okuma",
        "uso": "Pesca general en río, presa y mar ligero (mojarra, lobina, robalo chico).",
        "piezas": [
            ("cana-de-pescar-okuma-revenger-spinning-70-2-10m", 1),
            ("carrete-gimbel-jl4000-spinning", 1),
            ("hilo-araty-0-35mm-100m-natural", 2),
            ("caja-organizadora-storm-16storgdl", 1),
            ("cucharilla-gimbel-rosa-4006070-2", 1),
            ("senuelo-gimbel-4007040", 1),
            ("anzuelo-mustad-2330dt-sea-kirby-11", 1),
            ("plomo-gimbel-bola-8-0mm", 10),
            ("plomo-gimbel-tipo-bala-10g", 5),
            ("destorcedor-gimbel-5620n-con-seguro-5", 10),
            ("flotador-gimbel-esfera-1-1-4-32mm-mod-1010", 2),
        ],
    },
    {
        "handle": "kit-listo-para-pescar-shimano-clarus-finesse",
        "titulo": "Kit Listo para Pescar Shimano Clarus 5'8\" + IX R 1000 — Finesse",
        "precio": "1599.00",
        "vendor": "Shimano",
        "uso": "Pesca ligera y de precisión: lobina, trucha y mojarra con señuelos chicos.",
        "piezas": [
            ("cana-de-pescar-shimano-clarus-spinning-58", 1),
            ("carrete-shimano-ix-r-1000-spinning", 1),
            ("hilo-araty-0-25mm-100m-natural", 2),
            ("cucharilla-blue-fox-whiptail-deep-runner-0-blanco", 1),
            ("cucharilla-gimbel-rosa-4006070-2", 1),
            ("anzuelo-mustad-2330dt-sea-kirby-13", 1),
            ("plomo-gimbel-con-ranura-7mm-1-8g", 10),
            ("destorcedor-gimbel-5610n-sin-seguro-9", 10),
        ],
    },
    {
        "handle": "kit-listo-para-pescar-blue-fox-tolten-8-mar-y-costa",
        "titulo": "Kit Listo para Pescar Blue Fox Tolten 8'0\" — Mar y Costa",
        "precio": "1349.00",
        "vendor": "Blue Fox",
        "uso": "Orilla de mar, escollera y laguna: robalo, corvina, sierra.",
        "piezas": [
            ("cana-blue-fox-tolten-spinning-8-pies-2-40m", 1),
            ("carrete-gimbel-s500-spinning", 1),
            ("hilo-araty-0-40mm-100m-natural", 2),
            ("caja-organizadora-storm-16stordsol", 1),
            ("lider-con-destorcedor-gimbel-6kg-70cm-wl04-206", 1),
            ("anzuelo-mustad-94151-ni-live-bait-1-0", 1),
            ("plomo-gimbel-pera-1-2-oz", 5),
            ("plomo-gimbel-tipo-bala-15g", 5),
            ("destorcedor-gimbel-5630-triple-1-0", 5),
            ("destorcedor-gimbel-5620n-con-seguro-4-0", 5),
        ],
    },
    {
        "handle": "kit-listo-para-pescar-blue-fox-fresh-7-agua-dulce",
        "titulo": "Kit Listo para Pescar Blue Fox Fresh 7'0\" — Agua Dulce",
        "precio": "1199.00",
        "vendor": "Blue Fox",
        "uso": "Para empezar o para regalar: presa, río y lago con carnada o flotador.",
        "piezas": [
            ("cana-de-pescar-blue-fox-fresh-spinning-70-2-10m", 1),
            ("carrete-gimbel-afr230-spinning", 1),
            ("hilo-araty-0-20mm-100m-natural", 2),
            ("flotador-gimbel-antena-4g-su7045", 2),
            ("flotador-gimbel-esfera-3-4-19mm-mod-1010", 2),
            ("anzuelo-mustad-2330dt-sea-kirby-9", 1),
            ("plomo-gimbel-bola-6-0mm", 10),
            ("plomo-gimbel-con-ranura-6mm-1-2g", 8),
            ("destorcedor-gimbel-5610n-sin-seguro-9", 10),
            ("cucharilla-gimbel-rosa-4006070-2", 1),
        ],
    },
]


def api(metodo, ruta, token, tienda, cuerpo=None):
    url = f"https://{tienda}/admin/api/{API_VERSION}/{ruta}"
    datos = json.dumps(cuerpo).encode() if cuerpo is not None else None
    req = urllib.request.Request(url, data=datos, method=metodo, headers={
        "X-Shopify-Access-Token": token, "Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def producto(handle, token, tienda):
    d = api("GET", f"products.json?handle={handle}&fields=id,title,handle,status,variants", token, tienda)
    return d["products"][0] if d["products"] else None


def main():
    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    tienda = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")
    if not token:
        sys.exit("Falta SHOPIFY_ADMIN_TOKEN (ver INSTRUCTIVO-CREDENCIALES-SHOPIFY.md)")
    crear = "--crear" in sys.argv

    # Uso total de cada pieza sumando todos los kits, para no prometer
    # la misma pieza dos veces.
    cache, uso_total, resumen = {}, {}, []
    for kit in KITS:
        for h, q in kit["piezas"]:
            if h not in cache:
                p = producto(h, token, tienda)
                if not p:
                    sys.exit(f"❌ No existe el componente {h} ({kit['titulo']})")
                v = p["variants"][0]
                inv = api("GET", f"inventory_items/{v['inventory_item_id']}.json", token, tienda)["inventory_item"]
                cache[h] = {"titulo": p["title"], "precio": float(v["price"]),
                            "costo": float(inv["cost"] or 0),
                            "stock": max(v["inventory_quantity"], 0) - RESERVADO.get(h, 0)}
                time.sleep(0.3)

    for kit in KITS:
        costo = sum(cache[h]["costo"] * q for h, q in kit["piezas"])
        separado = sum(cache[h]["precio"] * q for h, q in kit["piezas"])
        precio = float(kit["precio"])
        contrib = precio - costo - ENVIO - CAJA_CANA
        existencia = min(cache[h]["stock"] // q for h, q in kit["piezas"])
        kit.update(costo=costo, separado=separado, contrib=contrib, existencia=existencia)
        for h, q in kit["piezas"]:
            uso_total[h] = uso_total.get(h, 0) + q * max(existencia, 0)

    for kit in KITS:
        print(f"\n## {kit['titulo']}")
        for h, q in kit["piezas"]:
            c = cache[h]
            print(f"   {q:>2} × {c['titulo'][:55]:55s} ${c['precio']:>7.2f}  costo ${c['costo']:>7.2f}  disp {c['stock']}")
        print(f"   Precio por separado ${kit['separado']:,.2f} → kit ${float(kit['precio']):,.2f} "
              f"(ahorro ${kit['separado'] - float(kit['precio']):,.2f})")
        print(f"   Costo ${kit['costo']:,.2f} + envío y caja ${ENVIO + CAJA_CANA:,.2f} "
              f"→ contribución ${kit['contrib']:,.2f}  |  equilibrio {float(kit['precio']) / kit['contrib']:.2f}x"
              f"  |  existencia {kit['existencia']}")
        if kit["contrib"] < CONTRIBUCION_MINIMA:
            print(f"   ⚠️ contribución por debajo de ${CONTRIBUCION_MINIMA:.0f}")

    choques = [h for h, u in uso_total.items() if u > cache[h]["stock"]]
    if choques:
        print("\n⚠️ Piezas prometidas a más kits de las que hay:")
        for h in choques:
            print(f"   {h}: se usarían {uso_total[h]}, hay {cache[h]['stock']}")

    if not crear:
        print("\n(solo cálculo; usa --crear para crear los borradores)")
        return

    for kit in KITS:
        if producto(kit["handle"], token, tienda):
            print(f"= ya existe {kit['handle']}, no se toca")
            continue
        incluye = "".join(f"<li>{q} × {cache[h]['titulo']}</li>" for h, q in kit["piezas"])
        cuerpo = {"product": {
            "title": kit["titulo"],
            "handle": kit["handle"],
            "status": "draft",
            "vendor": kit["vendor"],
            "product_type": "Combos",
            "tags": "combos, kits, pesca, listo-para-pescar",
            "body_html": (
                "<p><strong>Todo lo que necesitas para salir a pescar, en una sola compra.</strong> "
                "Caña, carrete, hilo y los accesorios que se acaban primero, elegidos para trabajar juntos.</p>"
                f"<p>{kit['uso']}</p>"
                f"<p><strong>Incluye:</strong></p><ul>{incluye}</ul>"
                f"<p>Por separado suma ${kit['separado']:,.2f}. <strong>Envío gratis a todo México.</strong></p>"
            ),
            "variants": [{
                "price": kit["precio"],
                "compare_at_price": f"{kit['separado']:.2f}",
                "inventory_management": "shopify",
                "inventory_policy": "deny",
                "requires_shipping": True,
                "cost": f"{kit['costo']:.2f}",
            }],
        }}
        p = api("POST", "products.json", token, tienda, cuerpo)["product"]
        v = p["variants"][0]
        loc = api("GET", "locations.json", token, tienda)["locations"][0]["id"]
        api("POST", "inventory_levels/set.json", token, tienda, {
            "location_id": loc, "inventory_item_id": v["inventory_item_id"],
            "available": max(kit["existencia"], 0)})
        print(f"+ creado en BORRADOR: {p['title']} (id {p['id']}, existencia {kit['existencia']})")
        time.sleep(0.6)


if __name__ == "__main__":
    main()
