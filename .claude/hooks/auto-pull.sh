#!/usr/bin/env bash
# Trae lo último de la rama del proyecto antes de que Claude trabaje
# (al abrir la sesión y antes de cada mensaje del dueño). La Mac y la nube
# escriben en el mismo repositorio. Nunca bloquea: sin red, con conflicto
# o en otra rama, no hace nada y deja el repo como estaba.
RAMA=claude/intemperie-mexico-audit-n3yxbs
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" 2>/dev/null || exit 0
[ "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" = "$RAMA" ] || exit 0
GITDIR=$(git rev-parse --git-dir 2>/dev/null) || exit 0
if [ -d "$GITDIR/rebase-merge" ] || [ -d "$GITDIR/rebase-apply" ]; then exit 0; fi
antes=$(git rev-parse HEAD)
if ! GIT_TERMINAL_PROMPT=0 git pull --rebase --autostash -q origin "$RAMA" >/dev/null 2>&1; then
  git rebase --abort >/dev/null 2>&1
  echo "Aviso: no se pudo traer lo último de $RAMA (sin red o con conflicto). Haz git pull a mano antes de escribir en MANUAL o PENDIENTES."
  exit 0
fi
despues=$(git rev-parse HEAD)
if [ "$antes" != "$despues" ]; then
  echo "Repo actualizado con commits de la otra sesión:"
  git log --oneline "$antes..$despues" 2>/dev/null | head -10
fi
exit 0
