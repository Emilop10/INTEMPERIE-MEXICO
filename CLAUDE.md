# Instrucciones maestras del proyecto Intemperie México

Claude Code lee este archivo al iniciar cualquier sesión, en la Mac del dueño
o en la nube. Lo que dice aquí es obligatorio y está por encima de cualquier
costumbre de trabajo.

## Regla de cierre: al terminar CADA tarea (orden del dueño, 22 oct 2026)

No hay tarea terminada hasta que se cumplen los tres pasos, en este orden:

1. **Documentar en `MANUAL-PROYECTO.md`.** Qué se pidió, qué se hizo, con qué
   resultado (números, IDs, enlaces) y qué quedó pendiente. Si es tema nuevo,
   abre una sección nueva con el número siguiente y agrégala al índice; si
   continúa una sección abierta, agrégale una entrada. Actualiza la línea
   "Última actualización".
2. **Actualizar `PENDIENTES.md`** cuando la tarea cambie algo que la próxima
   sesión deba saber: algo que quedó a medias, una decisión del dueño, una
   fecha, un riesgo. Si no cambió nada de eso, no hace falta.
3. **`git commit` y `git push`** a la rama `claude/intemperie-mexico-audit-n3yxbs`
   (es la rama principal del proyecto). Antes, siempre
   `git pull --rebase origin claude/intemperie-mexico-audit-n3yxbs`: la sesión
   de la Mac y la de la nube escriben en el mismo repositorio.

Al reportar al dueño, di en una línea en qué sección del manual quedó y que
ya está subido.

## Pull automático (desde el 22 oct 2026)

`.claude/settings.json` corre `.claude/hooks/auto-pull.sh` al abrir la
sesión y antes de cada mensaje del dueño: trae lo último de la rama sin
pedirlo. Si el gancho avisa que no pudo (sin red o con conflicto), haz el
pull a mano antes de escribir. El push sigue siendo tuyo al cerrar cada
tarea. Detalle en MANUAL §122.

## Lo que nunca va al repositorio

Tokens, secretos y contraseñas (`shpat_…`, `shpss_…`, `EAA…`), ni datos
personales de clientes (teléfonos, direcciones, correos). Esos van en
variables de entorno o en archivos temporales fuera del repo.

## Dónde empezar

1. `PENDIENTES.md`: el bloque "Arranque de la próxima sesión".
2. Si la sesión corre en la Mac del dueño: `ARRANQUE-LOCAL-MAC.md`.
3. `MANUAL-PROYECTO.md`: las últimas secciones.
