# Prompt para Claude in Chrome — cambiar el token de Meta (15 oct)

MANUAL §80. El token se vio en una captura; se revoca y se genera uno
nuevo con mínimo privilegio. **El token nuevo no pasa por el chat ni lo
lee Claude in Chrome:** el dueño lo copia y lo pega en las variables de
entorno de claude.ai/code (`META_ACCESS_TOKEN=`).

```text
Vas a ayudarme a cambiar el token de acceso de Meta de mi negocio "Intemperie México".
Es un cambio de seguridad: el token actual se vio en una captura de pantalla.

REGLAS (NO NEGOCIABLES)
1. Nunca escribas contraseñas ni códigos. Si algo pide iniciar sesión o verificar identidad,
   detente y pídeme que lo haga yo.
2. NUNCA leas, copies, repitas ni escribas en ningún lado el token nuevo. Cuando aparezca en
   pantalla, no lo transcribas en tus mensajes ni en tus reportes. Lo copio yo.
3. No toques campañas, anuncios, catálogos, pixel, páginas ni pagos.
4. Antes de revocar o generar cualquier cosa, dime exactamente qué vas a hacer y espera mi "sí".
5. Si algo no coincide con estas instrucciones, describe lo que ves y espera.
6. En cada PUNTO DE CONTROL detente y entrégame el reporte con el formato indicado.

BLOQUE 1 — Revisar (solo mirar)
1.1 https://business.facebook.com/settings/system-users (portafolio "Intemperie México").
1.2 Abre el usuario del sistema "Claude Integration".
1.3 Rol, activos asignados (cuenta publicitaria, página, catálogo, pixel) y apps ligadas.
1.4 ¿Hay botón "Revocar tokens"? ¿Qué opciones ofrece?
>>> PUNTO DE CONTROL 1 — REPORTE PARA CLAUDE CODE — META 1
- Portafolio / Usuario y rol / Activos / Apps / Opción para revocar (texto exacto)

BLOQUE 2 — Revocar el token viejo (solo con mi "sí")
2.1 "Revocar tokens" del usuario "Claude Integration" para la app "Claude Integration".
2.2 Mensaje exacto al terminar.
>>> PUNTO DE CONTROL 2 — REPORTE PARA CLAUDE CODE — META 2
- Acción hecha y mensaje exacto

BLOQUE 3 — Preparar el token nuevo (el clic final lo doy yo)
3.1 "Generar nuevo token". App: "Claude Integration". Caducidad: "Nunca".
3.2 Permisos SOLO: ads_management, ads_read, business_management, catalog_management,
    pages_show_list, pages_read_engagement, pages_manage_ads, instagram_basic
3.3 DETENTE antes de "Generar token". Ese clic y la copia del token los hago yo.
>>> PUNTO DE CONTROL 3 — REPORTE PARA CLAUDE CODE — META 3
- App / Caducidad / Permisos marcados / Listo para "Generar token": sí/no

Al terminar el punto de control 3, ya acabaste.
```

## Después del bloque 3 (dueño)

1. Clic en **"Generar token"** y copiarlo. **No mandarlo al chat.**
2. claude.ai/code → menú del entorno → **Editar** → "Variables de
   entorno" → reemplazar el valor de `META_ACCESS_TOKEN=` en la misma
   línea → **Guardar cambios**.
3. En la próxima sesión nueva, Claude verifica con `debug_token` que el
   nuevo sea válido, con los 8 scopes, y que el viejo ya no lo sea.
