from __future__ import annotations

import base64
import shutil
from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import BooleanObject, DictionaryObject, NameObject, TextStringObject
from reportlab.lib import colors
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "pdfs" / "dr835-official.pdf"
OUTPUT = ROOT / "output" / "pdf" / "fllm-fillable-dr835.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "forms" / "fllm-fillable-dr835.pdf"
GENERATED_MODULE = ROOT / "lib" / "generated" / "fllm-dr835-base64.ts"

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
SOURCE_IMAGE_WIDTH = 1020
SOURCE_IMAGE_HEIGHT = 1320
SCALE = PAGE_WIDTH / SOURCE_IMAGE_WIDTH

FIELD_FILL = colors.Color(1.0, 0.985, 0.88)
FIELD_BORDER = colors.Color(0.72, 0.53, 0.15)
FIELD_TEXT = colors.Color(0.05, 0.08, 0.11)


def rect(px_left: float, px_top: float, px_right: float, px_bottom: float):
    return (
        px_left * SCALE,
        (SOURCE_IMAGE_HEIGHT - px_bottom) * SCALE,
        (px_right - px_left) * SCALE,
        (px_bottom - px_top) * SCALE,
    )


def add_text_field(
    form,
    name: str,
    px_left: float,
    px_top: float,
    px_right: float,
    px_bottom: float,
    *,
    font_size: float = 8,
    multiline: bool = False,
):
    x, y, width, height = rect(px_left, px_top, px_right, px_bottom)
    flags = 4096 if multiline else 0
    form.textfield(
        name=name,
        x=x,
        y=y,
        width=width,
        height=height,
        borderStyle="solid",
        borderWidth=0.45,
        borderColor=FIELD_BORDER,
        fillColor=FIELD_FILL,
        textColor=FIELD_TEXT,
        fontName="Helvetica",
        fontSize=font_size,
        fieldFlags=flags,
        forceBorder=True,
    )


def add_checkbox(form, name: str, px_left: float, px_top: float, size_px: float = 14):
    x, y, width, _ = rect(px_left, px_top, px_left + size_px, px_top + size_px)
    form.checkbox(
        name=name,
        x=x,
        y=y,
        size=width,
        buttonStyle="check",
        borderStyle="solid",
        borderWidth=0.7,
        borderColor=FIELD_BORDER,
        fillColor=FIELD_FILL,
        textColor=FIELD_TEXT,
        checked=False,
        forceBorder=True,
    )


def page_one_fields(form):
    # Section 1 - Taxpayer information
    add_text_field(form, "taxpayer_name_and_address", 65, 232, 472, 324, multiline=True)
    add_text_field(form, "federal_identification_numbers", 484, 232, 695, 260)
    add_text_field(form, "florida_tax_registration_numbers", 707, 232, 955, 260)
    add_text_field(form, "taxpayer_contact_person", 484, 278, 695, 324)
    add_text_field(form, "taxpayer_telephone", 808, 279, 955, 292)
    add_text_field(form, "taxpayer_fax", 790, 309, 955, 324)

    # Section 2 - Representatives
    representative_rows = [
        ("representative_1", 382, 478),
        ("representative_2", 487, 583),
        ("representative_3", 592, 689),
    ]
    for prefix, top, bottom in representative_rows:
        add_text_field(form, f"{prefix}_name_firm_address", 66, top + 13, 694, bottom - 34, multiline=True)
        add_text_field(form, f"{prefix}_email", 122, bottom - 29, 694, bottom - 7)
        add_text_field(form, f"{prefix}_telephone", 804, top + 14, 955, top + 31)
        add_text_field(form, f"{prefix}_fax", 790, top + 47, 955, top + 64)
        add_text_field(form, f"{prefix}_cell", 806, top + 81, 955, bottom - 7)

    # Section 3 - Tax matters
    tax_rows = [(774, 801), (805, 832)]
    for index, (top, bottom) in enumerate(tax_rows, start=1):
        add_text_field(form, f"tax_matter_{index}_tax_type", 63, top, 482, bottom)
        add_text_field(form, f"tax_matter_{index}_years_periods", 488, top, 654, bottom)
        add_text_field(form, f"tax_matter_{index}_description", 662, top, 955, bottom)

    # Section 4 - Reemployment tax agent
    add_text_field(form, "reemployment_agent_name", 66, 961, 658, 980)
    add_text_field(form, "reemployment_agent_number", 808, 961, 955, 980)
    add_text_field(form, "reemployment_firm_name", 66, 994, 658, 1012)
    add_text_field(form, "reemployment_federal_id", 801, 994, 955, 1012)
    add_text_field(form, "reemployment_address", 66, 1027, 695, 1044)
    add_text_field(form, "reemployment_telephone", 806, 1027, 955, 1044)
    add_checkbox(form, "mail_type_primary", 490, 1052, 13)
    add_checkbox(form, "mail_type_reporting", 585, 1052, 13)
    add_checkbox(form, "mail_type_rate", 691, 1052, 13)
    add_checkbox(form, "mail_type_claim", 767, 1052, 13)

    # Section 5 - Acts authorized
    add_text_field(form, "refund_warrant_representative", 438, 1196, 937, 1217)
    add_checkbox(form, "authorize_refund_warrant_receipt", 944, 1201, 14)
    add_text_field(form, "specific_limitations", 61, 1243, 953, 1291, multiline=True)


def page_two_fields(form):
    # Repeated identifying information
    add_text_field(form, "page_2_taxpayer_names", 180, 137, 468, 157)
    add_text_field(form, "page_2_florida_tax_registration_number", 694, 113, 956, 135)
    add_text_field(form, "page_2_federal_identification_number", 694, 138, 956, 158)

    # Sections 6 and 7
    add_checkbox(form, "notices_to_taxpayer_and_representative", 850, 247, 15)
    add_checkbox(form, "notices_to_taxpayer_only", 850, 274, 15)
    add_checkbox(form, "revoke_prior_power_of_attorney", 850, 401, 15)

    # Section 8 - Taxpayer signatures
    add_text_field(form, "taxpayer_1_signature", 61, 570, 493, 594, font_size=8)
    add_text_field(form, "taxpayer_1_signature_date", 527, 570, 724, 594, font_size=8)
    add_text_field(form, "taxpayer_1_title", 756, 570, 958, 594, font_size=8)
    add_text_field(form, "taxpayer_1_print_name", 61, 614, 493, 638, font_size=8)
    add_text_field(form, "taxpayer_2_signature", 61, 658, 493, 682, font_size=8)
    add_text_field(form, "taxpayer_2_signature_date", 527, 658, 724, 682, font_size=8)
    add_text_field(form, "taxpayer_2_title", 756, 658, 958, 682, font_size=8)
    add_text_field(form, "taxpayer_2_print_name", 61, 702, 493, 726, font_size=8)

    # Part II - Declaration of representative
    representative_rows = [(1108, 1134), (1139, 1165), (1170, 1195)]
    for index, (top, bottom) in enumerate(representative_rows, start=1):
        add_text_field(form, f"declaration_{index}_designation", 62, top, 184, bottom, font_size=7)
        add_text_field(form, f"declaration_{index}_jurisdiction", 190, top, 326, bottom, font_size=7)
        add_text_field(form, f"declaration_{index}_signature", 332, top, 792, bottom, font_size=7)
        add_text_field(form, f"declaration_{index}_date", 800, top, 956, bottom, font_size=7)


def build_overlay(page_index: int) -> PdfReader:
    stream = BytesIO()
    pdf = canvas.Canvas(stream, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))
    pdf.setTitle("FLLM Browser-Compatible Fillable DR-835")
    form = pdf.acroForm

    if page_index == 0:
        page_one_fields(form)
    elif page_index == 1:
        page_two_fields(form)

    pdf.showPage()
    pdf.save()
    stream.seek(0)
    return PdfReader(stream)


def create_fillable_pdf():
    if not SOURCE.exists():
        raise FileNotFoundError(f"Official source PDF not found: {SOURCE}")

    source_reader = PdfReader(SOURCE)
    writer = PdfWriter()

    for page_index, source_page in enumerate(source_reader.pages):
        if page_index < 2:
            overlay_page = build_overlay(page_index).pages[0]
            source_page.merge_page(overlay_page)
        writer.add_page(source_page)

    writer.reattach_fields()
    acroform = writer.root_object.get("/AcroForm")
    if acroform is None:
        acroform = DictionaryObject()
        writer.root_object[NameObject("/AcroForm")] = acroform
    helvetica = writer._add_object(
        DictionaryObject(
            {
                NameObject("/Type"): NameObject("/Font"),
                NameObject("/Subtype"): NameObject("/Type1"),
                NameObject("/BaseFont"): NameObject("/Helvetica"),
                NameObject("/Encoding"): NameObject("/WinAnsiEncoding"),
            }
        )
    )
    zapf_dingbats = writer._add_object(
        DictionaryObject(
            {
                NameObject("/Type"): NameObject("/Font"),
                NameObject("/Subtype"): NameObject("/Type1"),
                NameObject("/BaseFont"): NameObject("/ZapfDingbats"),
            }
        )
    )
    acroform[NameObject("/DR")] = DictionaryObject(
        {
            NameObject("/Font"): DictionaryObject(
                {
                    NameObject("/Helv"): helvetica,
                    NameObject("/ZaDb"): zapf_dingbats,
                }
            )
        }
    )
    acroform[NameObject("/DA")] = TextStringObject("/Helv 0 Tf 0 g")
    acroform[NameObject("/NeedAppearances")] = BooleanObject(False)

    writer.add_metadata(
        {
            "/Title": "FLLM Browser-Compatible Fillable DR-835",
            "/Subject": "Florida Department of Revenue Power of Attorney and Declaration of Representative",
            "/Author": "Florida Department of Revenue; browser-compatible fields added by Florida Liquor License Market",
            "/Keywords": "DR-835, Florida Department of Revenue, fillable form, power of attorney",
        }
    )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("wb") as stream:
        writer.write(stream)
    shutil.copyfile(OUTPUT, PUBLIC_OUTPUT)
    encoded = base64.b64encode(OUTPUT.read_bytes()).decode("ascii")
    chunks = [encoded[index : index + 120] for index in range(0, len(encoded), 120)]
    GENERATED_MODULE.parent.mkdir(parents=True, exist_ok=True)
    GENERATED_MODULE.write_text(
        "// Generated by scripts/create_fillable_dr835.py. Do not edit manually.\n"
        "export const FLLM_DR835_BASE64 = [\n"
        + "".join(f'  "{chunk}",\n' for chunk in chunks)
        + '].join("");\n',
        encoding="utf-8",
    )


if __name__ == "__main__":
    create_fillable_pdf()
    print(OUTPUT)
    print(PUBLIC_OUTPUT)
    print(GENERATED_MODULE)

