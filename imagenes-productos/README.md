# imagenes-productos/

Aquí van las imágenes terminadas, con **exactamente** el nombre de archivo
que indica [`IMAGENES-CAMPANA-PENDIENTES.md`](../IMAGENES-CAMPANA-PENDIENTES.md).

Luego:

```bash
python3 scripts/cargar-imagenes-productos.py --dry-run   # revisa, no sube
SHOPIFY_ADMIN_TOKEN=shpat_... python3 scripts/cargar-imagenes-productos.py
```

Los archivos de imagen **no se versionan** (ver `.gitignore`): son pesados y
la copia buena vive en Shopify una vez subida. Este README sí.
