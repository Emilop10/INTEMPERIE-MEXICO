#!/usr/bin/env python3
"""
Genera la carta de bienvenida que se incluye en cada envío.

Uso:
    pip install reportlab   # si hace falta, no persiste entre contenedores
    python3 scripts/generar-carta-bienvenida.py

No toca Shopify ni Meta -- es generación local pura, sin token.

Produce dos archivos en materiales-impresos/:
  - carta-bienvenida.pdf            media carta (5.5" x 8.5"), la pieza
                                     de referencia
  - carta-bienvenida-imprimible.pdf carta horizontal (11" x 8.5") con dos
                                     copias lado a lado -- se imprime y se
                                     corta a la mitad, así que 50 cartas
                                     son 25 hojas

El texto es intencional, no un placeholder: reutiliza promesas que ya
viven en el sitio ("cada pieza verificada antes de llegar a tus manos" ->
"revisamos cada pieza con nuestras propias manos") para que la carta
suene a la misma marca que el comprador ya vio antes de comprar, no a un
tono nuevo inventado para el papel. Ver la sección de PENDIENTES.md sobre
esta carta para el razonamiento completo de cada decisión de redacción.

Si el texto necesita cambiar, se edita CONTENIDO más abajo y se vuelve a
correr el script -- no se edita el PDF a mano.
"""

import os

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, FrameBreak,
    Paragraph, Spacer, Image, HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle

AQUI = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(AQUI, "assets")
SALIDA_DIR = os.path.join(os.path.dirname(AQUI), "materiales-impresos")

LOGO = os.path.join(ASSETS, "logo-intemperie.png")

# Paleta de marca -- design-system/intemperie-mexico/MASTER.md
VERDE = HexColor("#234D3B")
TEXTO = HexColor("#1D1D1F")
TEXTO_MUTED = HexColor("#6E6E73")

# Tamaño de la tarjeta: media carta, vertical.
TARJETA_ANCHO = 5.5 * inch
TARJETA_ALTO = 8.5 * inch
MARGEN = 0.5 * inch

CONTENIDO = {
    "titulo": "Bienvenido a la familia<br/>Intemperie México",
    "parrafos": [
        "Hay un momento que conocemos bien: cuando por fin tienes en las "
        "manos el equipo que llevabas tiempo esperando, y todo lo demás "
        "—el trabajo, el ruido, las prisas— se queda atrás. Ese momento "
        "es la razón por la que existimos.",

        "No somos una bodega gigante ni un número en una lista de "
        "pedidos. Somos un equipo pequeño que ama el outdoor tanto como "
        "tú, y que revisó con sus propias manos cada pieza de tu pedido "
        "antes de empacarla, pensando en el río, el campo o el lugar "
        "donde la vas a usar.",

        "Si algo no llega como esperabas, escríbenos — de verdad "
        "queremos saberlo: <b>WhatsApp +52 777 327 7340</b> · "
        "<b>ventas@intemperiemexico.com</b>",

        "Y si esto que tienes en las manos te hace sentir que valió la "
        "pena, nos ayudarías muchísimo con una reseña. Para un negocio "
        "como el nuestro, cada una es la diferencia entre que alguien "
        "más se anime a vivir el outdoor con nosotros, o no.",

        "Gracias por dejarnos ser parte de tu próxima salida.",
    ],
    "firma": ["Atentamente,", "E.L.C.", "CEO, Intemperie México"],
    "instagram": "@intemperiemexico",
}


def registrar_fuentes():
    fonts = ASSETS + "/fonts"
    pdfmetrics.registerFont(TTFont("InstrumentSans", f"{fonts}/InstrumentSans-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("InstrumentSans-Bold", f"{fonts}/InstrumentSans-Bold.ttf"))
    pdfmetrics.registerFont(TTFont("InstrumentSans-Italic", f"{fonts}/InstrumentSans-Italic.ttf"))


def estilos():
    return {
        "titulo": ParagraphStyle(
            "titulo", fontName="InstrumentSans-Bold", fontSize=20, leading=25,
            textColor=VERDE, alignment=TA_CENTER, spaceAfter=18,
        ),
        "cuerpo": ParagraphStyle(
            "cuerpo", fontName="InstrumentSans", fontSize=10, leading=14.2,
            textColor=TEXTO, alignment=TA_CENTER, spaceAfter=9,
        ),
        "firma_nombre": ParagraphStyle(
            "firma_nombre", fontName="InstrumentSans-Bold", fontSize=13, leading=16,
            textColor=TEXTO, alignment=TA_CENTER,
        ),
        "firma_cargo": ParagraphStyle(
            "firma_cargo", fontName="InstrumentSans", fontSize=9.5, leading=13,
            textColor=TEXTO_MUTED, alignment=TA_CENTER,
        ),
        "instagram": ParagraphStyle(
            "instagram", fontName="InstrumentSans", fontSize=9, leading=12,
            textColor=TEXTO_MUTED, alignment=TA_CENTER, spaceBefore=8,
        ),
    }


def construir_story():
    """La lista de flowables de UNA carta. Se reutiliza tal cual para la
    tarjeta de referencia y, dos veces, para la hoja imprimible."""
    s = estilos()
    story = []
    story.append(Spacer(1, 0.08 * inch))
    story.append(HRFlowable(width="30%", thickness=1.4, color=VERDE, hAlign="CENTER"))
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph(CONTENIDO["titulo"], s["titulo"]))
    story.append(Spacer(1, 0.08 * inch))
    for p in CONTENIDO["parrafos"]:
        story.append(Paragraph(p, s["cuerpo"]))
    story.append(Spacer(1, 0.08 * inch))
    for i, linea in enumerate(CONTENIDO["firma"]):
        estilo = s["firma_nombre"] if i == 1 else s["firma_cargo"]
        story.append(Paragraph(linea, estilo))
    story.append(Spacer(1, 0.08 * inch))
    story.append(HRFlowable(width="20%", thickness=0.8, color=VERDE, hAlign="CENTER"))
    story.append(Spacer(1, 0.08 * inch))
    story.append(Image(LOGO, width=0.62 * inch, height=0.62 * inch, hAlign="CENTER"))
    story.append(Paragraph(CONTENIDO["instagram"], s["instagram"]))
    return story


def generar_tarjeta_unica():
    """La pieza de referencia: una sola tarjeta, media carta vertical."""
    salida = os.path.join(SALIDA_DIR, "carta-bienvenida.pdf")
    frame = Frame(
        MARGEN, MARGEN,
        TARJETA_ANCHO - 2 * MARGEN, TARJETA_ALTO - 2 * MARGEN,
        id="unica",
    )
    doc = BaseDocTemplate(
        salida, pagesize=(TARJETA_ANCHO, TARJETA_ALTO),
        topMargin=0, bottomMargin=0, leftMargin=0, rightMargin=0,
    )
    doc.addPageTemplates([PageTemplate(id="unica", frames=[frame])])
    doc.build(construir_story())
    return salida


def generar_hoja_imprimible():
    """Carta horizontal (11x8.5) con DOS copias lado a lado -- imprimir y
    cortar por la mitad. Dos frames del mismo tamaño que la tarjeta única,
    uno junto al otro, con el mismo contenido repetido."""
    salida = os.path.join(SALIDA_DIR, "carta-bienvenida-imprimible.pdf")
    ancho_hoja, alto_hoja = letter[1], letter[0]  # 11 x 8.5, landscape

    frame_izq = Frame(
        MARGEN, MARGEN, TARJETA_ANCHO - 2 * MARGEN, TARJETA_ALTO - 2 * MARGEN,
        id="izq",
    )
    frame_der = Frame(
        TARJETA_ANCHO + MARGEN, MARGEN,
        TARJETA_ANCHO - 2 * MARGEN, TARJETA_ALTO - 2 * MARGEN,
        id="der",
    )

    doc = BaseDocTemplate(
        salida, pagesize=(ancho_hoja, alto_hoja),
        topMargin=0, bottomMargin=0, leftMargin=0, rightMargin=0,
    )
    doc.addPageTemplates([PageTemplate(id="dos", frames=[frame_izq, frame_der])])

    story = construir_story() + [FrameBreak()] + construir_story()
    doc.build(story)
    return salida


def main():
    os.makedirs(SALIDA_DIR, exist_ok=True)
    registrar_fuentes()
    a = generar_tarjeta_unica()
    b = generar_hoja_imprimible()
    print(f"Generado: {a}")
    print(f"Generado: {b}  (linea de corte justo a la mitad, en 5.5\")")


if __name__ == "__main__":
    main()
