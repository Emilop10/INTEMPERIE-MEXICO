#!/usr/bin/env bash
#
# instalar-entorno.sh — rearma el entorno de trabajo de Intemperie México
# en un contenedor nuevo.
#
# POR QUÉ EXISTE
# El entorno remoto es efímero: cuando el contenedor se recicla se lleva
# todo lo instalado. Ya pasó tres veces —openpyxl, playwright y Graphify—
# y la regla que salió de ahí es que LO ÚNICO QUE SOBREVIVE ES LO QUE
# ESTÁ EN EL REPOSITORIO. Este script es esa regla, ejecutable.
#
# Es idempotente: comprueba antes de instalar y omite lo que ya esté, así
# que se puede correr las veces que haga falta sin romper nada.
#
#   bash scripts/instalar-entorno.sh
#
# NOTA: los plugins y agentes NO se guardan en el repositorio. Viven en
# ~/.claude/, que es del contenedor. Lo que el repositorio guarda es la
# receta para volver a ponerlos.

set -uo pipefail   # sin -e a propósito: un fallo no debe abortar el resto

ok=0; omitidos=0; fallos=0
paso()   { printf '\n\033[1m── %s\033[0m\n' "$1"; }
bien()   { printf '  ✅ %s\n' "$1"; ok=$((ok+1)); }
omite()  { printf '  ⏭️  %s (ya estaba)\n' "$1"; omitidos=$((omitidos+1)); }
falla()  { printf '  ❌ %s\n' "$1"; fallos=$((fallos+1)); }

# ─────────────────────────────────────────────────────────────────────
# 1. Marketplaces de plugins
#
# ⚠️ TRAMPA DE NOMBRES: el nombre del marketplace NO es el del repo. Lo
# declara el propio marketplace.json, y para instalar hay que usar ESE.
#   Hainrixz/the-architect  →  soyenriquerocha
#   Hainrixz/claude-ads     →  tododeia-claude-ads
# ─────────────────────────────────────────────────────────────────────
paso "Marketplaces"
declare -a MERCADOS=(
  "Hainrixz/the-architect|soyenriquerocha"
  "nextlevelbuilder/ui-ux-pro-max-skill|ui-ux-pro-max-skill"
  "anthropics/claude-plugins-official|claude-plugins-official"
  "coreyhaines31/marketingskills|marketingskills"
  "Hainrixz/claude-seo-ai|claude-seo-ai"
  "Hainrixz/claude-ads|tododeia-claude-ads"
)
lista_mercados="$(claude plugin marketplace list 2>/dev/null || true)"
for entrada in "${MERCADOS[@]}"; do
  repo="${entrada%%|*}"; nombre="${entrada##*|}"
  if grep -qx "  > ${nombre}" <<<"$lista_mercados"; then
    omite "$nombre"
  elif claude plugin marketplace add "$repo" >/dev/null 2>&1; then
    bien "$nombre  ($repo)"
  else
    falla "$nombre  ($repo)"
  fi
done

# ─────────────────────────────────────────────────────────────────────
# 2. Plugins
# ─────────────────────────────────────────────────────────────────────
paso "Plugins"
declare -a PLUGINS=(
  the-architect@soyenriquerocha
  ui-ux-pro-max@ui-ux-pro-max-skill
  superpowers@claude-plugins-official
  frontend-design@claude-plugins-official
  playwright@claude-plugins-official
  ralph-loop@claude-plugins-official
  context7@claude-plugins-official
  marketing-skills@marketingskills
  claude-seo-ai@claude-seo-ai
  claude-ads@tododeia-claude-ads
)
lista_plugins="$(claude plugin list 2>/dev/null || true)"
for p in "${PLUGINS[@]}"; do
  if grep -qF "> ${p}" <<<"$lista_plugins"; then
    omite "$p"
  elif claude plugin install "$p" >/dev/null 2>&1; then
    bien "$p"
  else
    falla "$p"
  fi
done

# ─────────────────────────────────────────────────────────────────────
# 3. The Agency — 273 agentes en ~/.claude/agents/
#
# No es un plugin: son archivos .md que install.sh copia. El único código
# que corre es ese script, y lo que hace es copiar.
# ─────────────────────────────────────────────────────────────────────
paso "Agentes (The Agency)"
DIR_AGENTES="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/agents"
n_agentes=$(ls "$DIR_AGENTES"/*.md 2>/dev/null | wc -l)
if [[ "$n_agentes" -ge 273 ]]; then
  omite "$n_agentes agentes en $DIR_AGENTES"
else
  tmp="$(mktemp -d)"
  if git clone --depth 1 https://github.com/msitarzewski/agency-agents.git "$tmp/agency-agents" >/dev/null 2>&1 \
     && (cd "$tmp/agency-agents" && ./scripts/install.sh --tool claude-code --no-interactive >/dev/null 2>&1); then
    bien "$(ls "$DIR_AGENTES"/*.md 2>/dev/null | wc -l) agentes instalados"
  else
    falla "The Agency (clone o install.sh)"
  fi
  rm -rf "$tmp"
fi

# ─────────────────────────────────────────────────────────────────────
# 4. Graphify
#
# ⚠️ TRAMPA DE NOMBRE: el paquete es `graphifyy`, con doble y. El
# `graphify` de npm es un generador de grafos aleatorios en jQuery, sin
# relación. Detalle en SKILLS-USADAS.md.
# ─────────────────────────────────────────────────────────────────────
paso "Graphify"
if command -v graphify >/dev/null 2>&1; then
  omite "graphify ($(command -v graphify))"
else
  if command -v uv >/dev/null 2>&1 && uv tool install graphifyy >/dev/null 2>&1; then
    bien "graphifyy"
  else
    falla "graphifyy — probar: pip install graphifyy"
  fi
fi
# `graphify install` copia la skill a la config de Claude. Es barato y no
# hay forma limpia de comprobar si ya está, así que se corre siempre.
if command -v graphify >/dev/null 2>&1; then
  graphify install >/dev/null 2>&1 && bien "skill /graphify copiada" || falla "graphify install"
fi

# ─────────────────────────────────────────────────────────────────────
# 5. Librerías de Python
#
# openpyxl y requests NO son opcionales: sin ellas no corre
# scripts/conciliar-inventario.py, que es el proceso mensual del dueño.
# ─────────────────────────────────────────────────────────────────────
paso "Python"
for mod in openpyxl requests scrapling; do
  if python3 -c "import $mod" >/dev/null 2>&1; then
    omite "$mod"
  elif pip install --quiet "$mod" >/dev/null 2>&1; then
    bien "$mod"
  else
    falla "$mod"
  fi
done

# ─────────────────────────────────────────────────────────────────────
paso "Resumen"
printf '  instalados: %d · omitidos: %d · fallos: %d\n' "$ok" "$omitidos" "$fallos"
if [[ "$fallos" -gt 0 ]]; then
  printf '\n  ⚠️  Hubo fallos. Corre el comando suelto para ver el error real:\n'
  printf '      claude plugin install <nombre>@<marketplace>\n'
fi
printf '\n  ℹ️  Los plugins recién instalados NO se cargan en una sesión que\n'
printf '      ya está corriendo. Reinicia la sesión para verlos en el menú.\n'
printf '\n  ⚠️  Esto NO instala credenciales. El token de Shopify se saca\n'
printf '      cada vez con INSTRUCTIVO-CREDENCIALES-SHOPIFY.md, y nunca\n'
printf '      se guarda en el repositorio.\n'

exit $(( fallos > 0 ? 1 : 0 ))
