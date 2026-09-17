# imagenes-productos/

Una **subcarpeta por producto**, nombrada con su handle de Shopify. Cada
una trae un `LEEME.md` con la lista exacta de tomas que le corresponden.

```
imagenes-productos/
  binocular-kampak-vision-nocturna-digital/
    LEEME.md
    binocular-kampak-vision-nocturna-digital-1-hero.jpg
    binocular-kampak-vision-nocturna-digital-2-escala.jpg
  hilo-araty-0-70mm-1000m-natural/
    LEEME.md
    ...
```

Las carpetas **no se crean a mano** — se generan del documento, para que
no se puedan desincronizar del encargo:

```bash
python3 scripts/cargar-imagenes-productos.py --crear-carpetas
```

## Mientras generas varias versiones

Déjalas todas en la subcarpeta del producto con el nombre que quieras
(`pantalla-version-a.jpg`, `hero-v2.jpg`, lo que sea). El ensayo las
reporta como **extras** y **no las sube**:

```
? extra   pantalla-version-a.jpg  (no esta en el documento, NO se sube)
```

Cuando decidas cuál es la buena, **renómbrala** al nombre exacto que pide
el `LEEME.md` y ya entra. Si de plano quieres subirlas todas, existe
`--incluir-extras`, pero lo normal es quedarse con una por toma.

## Subir

```bash
python3 scripts/cargar-imagenes-productos.py --dry-run            # revisa, no sube
SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-imagenes-productos.py
```

El ensayo avisa si una imagen no es cuadrada, si está por debajo de
2048 px o si pesa más de 1 MB. Nunca borra nada y salta lo que ya subió,
así que se puede correr las veces que haga falta.

## Qué se versiona

Sólo la **estructura**: este README y el `LEEME.md` de cada subcarpeta.
Las imágenes no (`.gitignore`): son pesadas y la copia buena vive en
Shopify una vez subida.

Detalle de cada toma, especificaciones y prompts en
[`IMAGENES-CAMPANA-PENDIENTES.md`](../IMAGENES-CAMPANA-PENDIENTES.md).
