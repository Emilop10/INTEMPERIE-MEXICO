# Prompt para Claude in Chrome: cuentas y llaves del agente de WhatsApp (28 oct)

MANUAL §129, Fase 3. Claude in Chrome navega y llena lo que no es
secreto. **El dueño** inicia sesión, escribe contraseñas y códigos,
escanea el QR con el celular y da el clic final de "crear llave". **Las
llaves no pasan por el chat ni las lee Claude in Chrome:** el dueño las
copia directo a las variables de entorno de claude.ai/code (ver "Después").

```text
Vas a ayudarme a preparar las cuentas para el agente de WhatsApp de mi tienda "Intemperie México".
Son 4 sitios: Anthropic, Resend, Cloudflare y Kapso. Todo es en planes gratis, salvo Anthropic, donde ya tengo créditos.
Correo para todas las cuentas: admin@intemperiemexico.com

REGLAS (NO NEGOCIABLES)
1. Nunca escribas contraseñas ni códigos de verificación. Si una pantalla pide iniciar sesión, crear contraseña,
   verificar el correo o el teléfono, o resolver un captcha, detente y pídeme que lo haga yo. Sigue cuando te diga "listo".
2. Nunca leas, copies, repitas ni escribas en ningún lado una llave, token o secreto (API key, token de Cloudflare, etc.).
   Cuando una pantalla esté a punto de mostrar una llave, DETENTE antes del clic final de "Create": ese clic y la copia los hago yo.
   Si por error ves una llave en pantalla, no la escribas en tus mensajes ni en tus reportes.
3. Nunca agregues tarjetas ni métodos de pago, ni aceptes planes de pago o pruebas gratis que pidan tarjeta.
   Si algo exige tarjeta para seguir, detente y avísame.
4. En Meta/Facebook: usa SOLO el portafolio "Intemperie México". NUNCA elijas ni toques "Alcampo Cuernavaca"
   (es otra empresa, aunque aparezca en las listas).
5. No toques anuncios, campañas, páginas, catálogos ni nada que no esté en estas instrucciones.
6. Si algo no coincide con estas instrucciones, describe exactamente lo que ves y espera.
7. En cada PUNTO DE CONTROL detente y entrégame el reporte con el formato indicado.

BLOQUE 1 — Anthropic (ya tengo cuenta y créditos)
1.1 Abre https://console.anthropic.com. Si pide iniciar sesión, detente (regla 1).
1.2 Confirma el nombre de la organización y el saldo de créditos que se ve.
1.3 Ve a Settings → Limits (o "Spend limits"). Pon el límite de gasto MENSUAL en 100 USD. Guarda.
1.4 Ve a Settings → API Keys → "Create Key". Nombre: agente-whatsapp. Workspace: el que esté por omisión.
1.5 DETENTE antes del clic final de "Create" / "Add" (regla 2).
>>> PUNTO DE CONTROL 1 — REPORTE PARA CLAUDE CODE — ANTHROPIC
- Organización / Saldo de créditos / Límite mensual guardado (texto exacto) / Formulario de llave listo: sí/no

BLOQUE 2 — Resend (correos de aviso)
2.1 Abre https://resend.com/signup. Crea la cuenta con admin@intemperiemexico.com (contraseña y verificación de correo: yo, regla 1).
2.2 Si pregunta por un dominio, OMITE ese paso: no agregues dominios.
2.3 Ve a API Keys → "Create API Key". Nombre: agente-whatsapp. Permiso: "Sending access". Dominio: "All domains".
2.4 DETENTE antes del clic final de "Add" / "Create" (regla 2).
>>> PUNTO DE CONTROL 2 — REPORTE PARA CLAUDE CODE — RESEND
- Cuenta creada con: (correo) / Plan: (texto exacto) / Formulario de llave listo: sí/no

BLOQUE 3 — Cloudflare (servidor gratis)
3.1 Abre https://dash.cloudflare.com/sign-up. Crea la cuenta con admin@intemperiemexico.com (contraseña y verificación: yo).
3.2 Si ofrece "Add a site / Add a domain" o planes de pago, OMÍTELO. No agregues dominios.
3.3 Abre "Workers & Pages". Si pide elegir un subdominio de workers.dev, propón "intemperie" y espera mi "sí" antes de guardarlo.
    Anota el Account ID (aparece en la página de Workers & Pages o en la página principal de la cuenta; no es secreto).
3.4 Ve a tu perfil (ícono arriba a la derecha) → "My Profile" → "API Tokens" → "Create Token".
3.5 Elige la plantilla "Edit Cloudflare Workers" → "Use template".
    Account Resources: Include → la cuenta recién creada. Zone Resources: deja lo que ponga la plantilla.
    No cambies los permisos de la plantilla.
3.6 "Continue to summary". DETENTE antes de "Create Token" (regla 2).
>>> PUNTO DE CONTROL 3 — REPORTE PARA CLAUDE CODE — CLOUDFLARE
- Cuenta / Account ID / Subdominio workers.dev (o "no lo pidió") / Permisos del resumen (texto exacto) / Listo para "Create Token": sí/no

BLOQUE 4 — Kapso (conectar el WhatsApp del negocio). Necesito el celular del negocio en la mano.
4.1 Abre https://kapso.ai y crea la cuenta con admin@intemperiemexico.com (contraseña y verificación: yo).
    Plan: el gratis (Free). Si pide tarjeta, detente (regla 3).
4.2 Si pide crear un proyecto, nómbralo: Intemperie México.
4.3 Ve a "Connected numbers" → "Connect new number" (o "Connect WhatsApp Business") → elige "WhatsApp Business App".
    NO elijas "Display name only" ni ninguna opción que dé un número de Estados Unidos.
4.4 Se abre la ventana de Meta. "Continuar". Si pide iniciar sesión en Facebook, detente (regla 1).
4.5 País: México (+52). Número: 777 327 7340. Revisa que el nombre y la foto sean los de Intemperie México.
4.6 Portafolio: "Intemperie México". NUNCA "Alcampo Cuernavaca" (regla 4).
4.7 Cuenta de WhatsApp: CREA UNA NUEVA llamada "Intemperie México". NO uses la cuenta "Alcampo Cuernavaca".
    Zona horaria: Ciudad de México (America/Mexico_City). Moneda: MXN si la ofrece.
4.8 Cuando aparezca el código QR, DETENTE y dime: "escanea el QR". Yo lo escaneo desde WhatsApp Business
    (Chats → ícono de cámara) y en el celular toco "Continuar" → "Conectar a la plataforma empresarial".
    Si en vez del QR Meta pide un código por SMS o llamada, DETENTE y descríbeme la pantalla: no sigas.
4.9 Si pregunta por los chats anteriores, la decisión ya está tomada: "Compartir todos los chats". Confírmame antes de elegirla
    (no se puede cambiar después).
4.10 Revisa los permisos que muestra Meta y termina ("Confirmar" → "Finalizar").
4.11 Si Meta o Kapso piden agregar un método de pago, OMÍTELO (regla 3).
4.12 En Kapso, abre el número conectado y anota: número mostrado, Phone number ID, WhatsApp Business Account ID (WABA ID)
     y el estado de la conexión. No son secretos.
4.13 Ve a "API Keys" → crear una llave llamada agente-servidor. DETENTE antes del clic final (regla 2).
>>> PUNTO DE CONTROL 4 — REPORTE PARA CLAUDE CODE — KAPSO
- Plan / Proyecto / Portafolio elegido / Cuenta de WhatsApp creada (nombre) / Moneda / Chats compartidos: sí/no
- Número / Phone number ID / WABA ID / Estado de la conexión / Formulario de llave listo: sí/no

Al terminar el punto de control 4, ya acabaste. No configures webhooks ni nada más en Kapso: eso lo hace Claude Code.
```

## Después de cada "DETENTE" de llave (dueño)

En cada uno de los 4 sitios: clic en **Create**, **copiar la llave** y
pegarla de inmediato en claude.ai/code → menú del entorno → **Editar** →
variables de entorno, con estos nombres (una por línea, `NOMBRE=valor`):

| Sitio | Variable |
|---|---|
| Anthropic | `AGENTE_ANTHROPIC_API_KEY` (**no** `ANTHROPIC_API_KEY`: esa la usaría Claude Code y cobraría las sesiones a los créditos) |
| Resend | `RESEND_API_KEY` |
| Cloudflare | `CLOUDFLARE_API_TOKEN` |
| Kapso | `KAPSO_API_KEY` |
| Tu WhatsApp personal, para pruebas | `NUMEROS_PRUEBA` (solo dígitos, con 52) |

Las llaves se muestran una sola vez. Si se pierde una, se borra y se crea
otra. **Guardar cambios**, abrir una sesión nueva en el mismo entorno y
escribir "Sigue con la Fase 3 del agente de WhatsApp", con los 4 reportes
de Chrome pegados (no llevan secretos).
