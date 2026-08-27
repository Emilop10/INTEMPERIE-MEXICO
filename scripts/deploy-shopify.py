#!/usr/bin/env python3
"""Sube archivos del tema de `tema-shopify/` al tema publicado de la tienda.

Existe porque el repo no tiene conectada la integracion nativa de Shopify con
GitHub, asi que nada desplegaba solo: los cambios se quedaban en el repo y la
tienda seguia sirviendo una version vieja (nos costo una tarde descubrirlo).

Que archivos sube
-----------------
Por defecto, los que git reporta como cambiados (ultimo commit + lo que este
sin commitear). Antes de subir cada uno, descarga el que la tienda ya tiene y
compara el contenido exacto: si son iguales, lo omite. Esa confirmacion es
necesaria porque el campo `checksum` de la API de Shopify NO es el MD5 del
contenido y no sirve para decidir si algo cambio.

Uso:
    SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/deploy-shopify.py
    ... deploy-shopify.py --since origin/main      # todo lo cambiado desde un ref
    ... deploy-shopify.py --all                    # el tema completo
    ... deploy-shopify.py assets/brand-experience.css   # archivos concretos
    ... deploy-shopify.py --dry-run                # solo mostrar que haria

Variables de entorno:
    SHOPIFY_ADMIN_TOKEN  (obligatoria) token Admin API con scope write_themes
    SHOPIFY_STORE        dominio myshopify (default: wfuxvx-yn.myshopify.com)
    SHOPIFY_THEME_ID     id del tema (default: el que tenga role == "main")
"""

import base64
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API_VERSION = "2024-10"
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THEME_DIR = os.path.join(REPO_ROOT, "tema-shopify")

# Carpetas que Shopify reconoce como parte de un tema. Cualquier otra cosa
# dentro de tema-shopify/ (por ejemplo graphify-out/) se ignora.
THEME_FOLDERS = ("assets", "config", "layout", "locales", "sections", "snippets", "templates")

# Los edita el personalizador de Shopify. Subirlos desde el repo pisaria los
# cambios hechos en el admin, asi que se excluyen salvo --include-settings.
CUSTOMIZER_OWNED = ("config/settings_data.json",)

TEXT_EXTENSIONS = (".liquid", ".css", ".js", ".json", ".svg", ".md", ".txt", ".map")


def api_request(method, path, token, store, body=None, params=None):
    url = f"https://{store}/admin/api/{API_VERSION}{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-Shopify-Access-Token", token)
    req.add_header("Content-Type", "application/json")

    for attempt in range(5):
        try:
            with urllib.request.urlopen(req) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                return None
            # 429 = limite de llamadas. La API REST admite 2/seg, un backoff
            # corto basta para reencauzar.
            if exc.code == 429 and attempt < 4:
                time.sleep(2 ** attempt)
                continue
            raise RuntimeError(f"{method} {path} -> HTTP {exc.code}: {exc.read().decode()[:300]}") from exc
    raise RuntimeError(f"{method} {path} agoto los reintentos")


def resolve_theme(token, store):
    for theme in api_request("GET", "/themes.json", token, store)["themes"]:
        if theme["role"] == "main":
            return theme["id"], theme["name"]
    raise RuntimeError("La tienda no tiene ningun tema publicado (role == main)")


def git(*args):
    result = subprocess.run(
        ["git", "-C", REPO_ROOT, *args], capture_output=True, text=True, check=False
    )
    return result.stdout.splitlines() if result.returncode == 0 else []


def theme_key(repo_path):
    """`tema-shopify/assets/x.css` -> `assets/x.css`, o None si no es del tema."""
    prefix = "tema-shopify/"
    if not repo_path.startswith(prefix):
        return None
    key = repo_path[len(prefix):]
    return key if key.split("/")[0] in THEME_FOLDERS and key.count("/") == 1 else None


def keys_from_git(since):
    """Claves de tema cambiadas segun git (commit indicado + working tree)."""
    changed = set()
    changed.update(git("diff", "--name-only", f"{since}..HEAD"))
    changed.update(git("diff", "--name-only", "HEAD"))       # sin stage
    changed.update(git("diff", "--name-only", "--cached"))   # en stage
    changed.update(git("ls-files", "--others", "--exclude-standard"))

    keys = {}
    for repo_path in changed:
        key = theme_key(repo_path)
        if key:
            path = os.path.join(REPO_ROOT, repo_path)
            if os.path.isfile(path):
                keys[key] = path
    return keys


def all_theme_keys():
    keys = {}
    for folder in THEME_FOLDERS:
        base = os.path.join(THEME_DIR, folder)
        if not os.path.isdir(base):
            continue
        for name in sorted(os.listdir(base)):
            path = os.path.join(base, name)
            if os.path.isfile(path):
                keys[f"{folder}/{name}"] = path
    return keys


def read_local(key, path):
    """Texto -> (str, payload). Binario -> (bytes, payload con attachment)."""
    if key.endswith(TEXT_EXTENSIONS):
        with open(path, "r", encoding="utf-8") as handle:
            content = handle.read()
        return content, {"key": key, "value": content}

    with open(path, "rb") as handle:
        raw = handle.read()
    return raw, {"key": key, "attachment": base64.b64encode(raw).decode()}


def read_remote(key, token, store, theme_id):
    """Contenido actual en la tienda, o None si el archivo no existe alli."""
    result = api_request(
        "GET", f"/themes/{theme_id}/assets.json", token, store,
        params={"asset[key]": key},
    )
    if not result or "asset" not in result:
        return None
    asset = result["asset"]
    if "value" in asset:
        return asset["value"]
    if asset.get("attachment"):
        return base64.b64decode(asset["attachment"])
    return None


def orden_de_subida(item):
    """Ordena la subida para que un *-group.json nunca llegue antes que la
    seccion que referencia.

    Shopify valida los grupos contra las secciones que YA existen en el
    tema y rechaza con HTTP 422 ("Section type 'x' does not refer to an
    existing section file") si el grupo llega primero. Con el orden
    alfabetico simple eso pasa siempre que la seccion nueva va despues
    del grupo en el abecedario: `sections/header-group.json` antes que
    `sections/im-barra-promesas.liquid` (25 ago 2026, barra de promesas).

    Es la misma familia del incidente de `meta-pixel` de la seccion 39
    del manual —una referencia que llega antes que su destino— pero de
    orden, no de omision: los dos archivos iban en el push, solo que en
    la secuencia equivocada.
    """
    key = item[0]
    es_grupo = key.startswith("sections/") and key.endswith("-group.json")
    return (1 if es_grupo else 0, key)


def main():
    argv = [a for a in sys.argv[1:]]
    dry_run = "--dry-run" in argv
    include_settings = "--include-settings" in argv
    deploy_all = "--all" in argv

    since = "HEAD~1"
    if "--since" in argv:
        since = argv[argv.index("--since") + 1]

    explicit = [a for a in argv if not a.startswith("--") and a != since]

    token = os.environ.get("SHOPIFY_ADMIN_TOKEN")
    if not token:
        sys.exit("Falta SHOPIFY_ADMIN_TOKEN. Ver scripts/README-deploy.md")
    store = os.environ.get("SHOPIFY_STORE", "wfuxvx-yn.myshopify.com")

    theme_id = os.environ.get("SHOPIFY_THEME_ID")
    theme_name = "(indicado por SHOPIFY_THEME_ID)"
    if not theme_id:
        theme_id, theme_name = resolve_theme(token, store)
    print(f"Tienda : {store}")
    print(f"Tema   : {theme_id} {theme_name}")

    if explicit:
        candidates = {}
        for item in explicit:
            key = item[len("tema-shopify/"):] if item.startswith("tema-shopify/") else item
            path = os.path.join(THEME_DIR, key)
            if not os.path.isfile(path):
                sys.exit(f"No existe: {path}")
            candidates[key] = path
        origen = "archivos indicados"
    elif deploy_all:
        candidates = all_theme_keys()
        origen = "tema completo"
    else:
        candidates = keys_from_git(since)
        origen = f"cambios de git ({since}..HEAD + working tree)"

    print(f"Origen : {origen}")

    omitidos = [k for k in candidates if k in CUSTOMIZER_OWNED and not include_settings]
    for key in omitidos:
        candidates.pop(key)
    if omitidos:
        print(f"\nOmitidos (los edita el personalizador de Shopify): {', '.join(omitidos)}")
        print("  Usa --include-settings solo si de verdad quieres pisarlos.")

    if not candidates:
        print("\nNo hay archivos del tema entre los cambios.")
        return

    print(f"\nRevisando {len(candidates)} archivo(s) contra la tienda...")
    pending = []
    for key, path in sorted(candidates.items(), key=orden_de_subida):
        local, payload = read_local(key, path)
        remote = read_remote(key, token, store, theme_id)
        if remote == local:
            print(f"  = {key} (ya identico)")
        else:
            print(f"  ~ {key} (difiere)" if remote is not None else f"  + {key} (nuevo)")
            pending.append((key, payload))
        time.sleep(0.55)

    if not pending:
        print("\nNada que subir: la tienda ya coincide con el repo.")
        return

    if dry_run:
        print(f"\n--dry-run: se subirian {len(pending)} archivo(s), no se subio nada.")
        return

    print()
    for key, payload in pending:
        result = api_request(
            "PUT", f"/themes/{theme_id}/assets.json", token, store, body={"asset": payload}
        )
        print(f"  OK {key} ({result['asset']['updated_at']})")
        time.sleep(0.55)

    print(f"\nListo: {len(pending)} archivo(s) subidos al tema publicado.")


if __name__ == "__main__":
    main()
