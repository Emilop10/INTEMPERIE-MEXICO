# Deploy del tema a Shopify

## Por que existe esto

El repo **no** tiene conectada la integracion nativa de Shopify con GitHub, asi
que nada desplegaba automaticamente. El 7 de agosto de 2026 eso costo una tarde
entera: se hicieron tres commits corrigiendo la barra deslizable de la franja de
subcategorias, la tienda siguio sirviendo la version de tres commits atras, y el
sintoma parecia un problema de CSS o de cache del navegador. No lo era — los
archivos nunca habian llegado a la tienda.

## Uso rapido

```bash
export SHOPIFY_ADMIN_TOKEN=shpat_...      # token Admin API con write_themes
python3 scripts/deploy-shopify.py         # sube lo cambiado en git
```

Opciones:

| Comando | Que hace |
|---|---|
| `deploy-shopify.py` | Sube lo cambiado en el ultimo commit + working tree |
| `deploy-shopify.py --since origin/main` | Todo lo cambiado desde ese ref |
| `deploy-shopify.py --all` | El tema completo |
| `deploy-shopify.py assets/x.css` | Solo los archivos indicados |
| `deploy-shopify.py --dry-run` | Muestra que haria, sin subir nada |

El script descarga cada archivo de la tienda y compara el contenido antes de
subirlo, asi que correrlo dos veces seguidas no hace nada la segunda vez.

## Automatico en cada push

`.github/workflows/deploy-shopify.yml` corre el script en cada push que toque
`tema-shopify/`. Para que funcione hace falta **un paso manual, una sola vez**:

1. GitHub → repo → **Settings → Secrets and variables → Actions**
2. **New repository secret**
3. Nombre: `SHOPIFY_ADMIN_TOKEN` · Valor: el token `shpat_...`

Sin ese secret el workflow falla con "Falta SHOPIFY_ADMIN_TOKEN".

## Que NO sube (a proposito)

`config/settings_data.json` guarda lo que se edita en el personalizador de
Shopify. Subirlo desde el repo pisaria los cambios hechos en el admin, asi que
esta excluido. Si de verdad hace falta, existe `--include-settings`.

## Detalles que costaron tiempo (no repetirlos)

- **El campo `checksum` de la API no es el MD5 del contenido.** Comparar contra
  el marca como distintos ~60 archivos que son byte a byte identicos. Por eso el
  script descarga y compara el contenido real.
- **Guardar solo assets no invalida el cache de pagina del storefront.** Los
  visitantes siguen recibiendo HTML viejo, con las URLs de assets anteriores.
  Un cambio real en un `.liquid` si fuerza la regeneracion.
- **Verificar con `curl` sin `User-Agent` enganna.** Shopify sirve una variante
  de cache distinta al trafico que parece bot: devuelve versiones viejas aunque
  los navegadores reales ya reciban las nuevas. Al verificar, mandar siempre un
  User-Agent de navegador.

## Renovar el token

Si el token deja de servir (se publica una version nueva de la app, o cambian
los scopes), el procedimiento completo esta en `INSTRUCTIVO-APP-SHOPIFY.md`.
