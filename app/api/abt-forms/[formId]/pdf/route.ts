import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { PDFDocument, rgb, TextAlignment } from "pdf-lib";

import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type TextPlacement = {
  name: string;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type CheckboxPlacement = {
  name: string;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  borderWidth: number;
};

function originalGlyphCheckbox(
  pageIndex: number,
  name: string,
  x: number,
  y: number,
  width = 8.874,
  height = 9.96
): CheckboxPlacement {
  const borderWidth = 0.5;
  return {
    name,
    pageIndex,
    x: x + borderWidth / 2,
    y: y + borderWidth / 2,
    width: width - borderWidth,
    height: height - borderWidth,
    borderWidth,
  };
}

function originalDrawnCheckbox(
  pageIndex: number,
  name: string,
  x: number,
  y: number
): CheckboxPlacement {
  return originalGlyphCheckbox(pageIndex, name, x, y, 9.24, 9.24);
}

const ABT_6002_CHECKLIST_FIELDS: CheckboxPlacement[] = [
  { name: "ABT6002 Checklist - Complete transfer application", pageIndex: 4, x: 268.14, y: 662.608, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Pay temporary license fee", pageIndex: 4, x: 268.14, y: 628.288, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Complete ABT-6032 surety bond", pageIndex: 4, x: 268.14, y: 593.968, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Submit fingerprint receipt", pageIndex: 4, x: 268.14, y: 559.408, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Include arrest disposition", pageIndex: 4, x: 268.14, y: 547.768, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Include moral character mitigation", pageIndex: 4, x: 268.14, y: 536.488, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Submit right of occupancy", pageIndex: 4, x: 268.14, y: 524.968, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Change in series", pageIndex: 4, x: 268.38, y: 489.898, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Decrease in series", pageIndex: 4, x: 268.38, y: 478.378, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Increase in series", pageIndex: 4, x: 268.38, y: 466.858, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Change of location", pageIndex: 4, x: 268.38, y: 455.338, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Change of business name", pageIndex: 4, x: 268.38, y: 443.818, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - Change officer stockholder or corporate name", pageIndex: 4, x: 268.38, y: 432.418, width: 10.25, height: 10.25, borderWidth: 0.75 },
  { name: "ABT6002 Checklist - New retail tobacco dealer permit", pageIndex: 4, x: 268.38, y: 420.898, width: 10.25, height: 10.25, borderWidth: 0.75 },
];

const ABT_6004_FIELDS: CheckboxPlacement[] = [
  originalGlyphCheckbox(3, "ABT6004 Checklist - Complete ABT-6004 application", 216.89, 515.348),
  originalGlyphCheckbox(3, "ABT6004 Checklist - Complete ABT-6032 surety bond", 216.89, 492.428),
  originalGlyphCheckbox(3, "ABT6004 Checklist - Submit right of occupancy", 216.89, 469.388),
  originalGlyphCheckbox(3, "ABT6004 Checklist - Complete change-of-entity application", 216.89, 435.548),
  originalGlyphCheckbox(3, "ABT6004 Checklist - Submit fingerprint receipt", 216.89, 412.508),
  originalGlyphCheckbox(3, "ABT6004 Checklist - Include arrest disposition", 216.89, 400.988),
  originalGlyphCheckbox(3, "ABT6004 Checklist - Include moral character mitigation", 216.89, 389.468),

  originalDrawnCheckbox(4, "ABT6004 - Transaction - Change to related parties", 55.92, 550.66),
  originalDrawnCheckbox(4, "ABT6004 - Transaction - Amend licensed entity name", 55.92, 539.14),
  originalDrawnCheckbox(4, "ABT6004 - Transaction - Conversion or merger", 55.92, 527.62),
  originalDrawnCheckbox(4, "ABT6004 - Transaction - Change mailing address", 55.92, 516.07),
  originalDrawnCheckbox(4, "ABT6004 - Revocation proceeding - Yes", 56.28, 225.41),
  originalDrawnCheckbox(4, "ABT6004 - Revocation proceeding - No", 97.82, 225.41),
  originalDrawnCheckbox(4, "ABT6004 - Personal relationship to former related parties - Yes", 56.28, 190.13),
  originalDrawnCheckbox(4, "ABT6004 - Personal relationship to former related parties - No", 97.82, 190.13),

  originalDrawnCheckbox(5, "ABT6004 - US citizen - Yes", 96.5, 579.34),
  originalDrawnCheckbox(5, "ABT6004 - US citizen - No", 139.1, 579.34),
  originalDrawnCheckbox(5, "ABT6004 - Interest in another alcohol or tobacco business - Yes", 96.5, 475.63),
  originalDrawnCheckbox(5, "ABT6004 - Interest in another alcohol or tobacco business - No", 136.34, 475.63),
  originalDrawnCheckbox(5, "ABT6004 - License or permit refused revoked or suspended - Yes", 96.5, 383.35),
  originalDrawnCheckbox(5, "ABT6004 - License or permit refused revoked or suspended - No", 136.34, 383.35),
  originalDrawnCheckbox(5, "ABT6004 - Felony conviction in past 15 years - Yes", 382.27, 314.33),
  originalDrawnCheckbox(5, "ABT6004 - Felony conviction in past 15 years - No", 422.11, 314.33),
  originalDrawnCheckbox(5, "ABT6004 - Alcohol or tobacco offense in past 5 years - Yes", 215.45, 221.57),
  originalDrawnCheckbox(5, "ABT6004 - Alcohol or tobacco offense in past 5 years - No", 255.29, 221.57),

  originalDrawnCheckbox(6, "ABT6004 - Arrest or notice to appear in past 15 years - Yes", 218.33, 724.8),
  originalDrawnCheckbox(6, "ABT6004 - Arrest or notice to appear in past 15 years - No", 258.17, 724.8),
  originalDrawnCheckbox(6, "ABT6004 - Meets moral character rule - Yes", 96.5, 632.14),
  originalDrawnCheckbox(6, "ABT6004 - Meets moral character rule - No", 136.34, 632.14),
  originalDrawnCheckbox(6, "ABT6004 - Official with state police powers - Yes", 96.5, 609.1),
  originalDrawnCheckbox(6, "ABT6004 - Official with state police powers - No", 136.34, 609.1),

  ...[280.25, 251.45, 216.89, 188.09, 165.02, 141.98, 118.94, 90.14].flatMap(
    (y, index) => [
      originalDrawnCheckbox(8, `ABT6004 Other Interests ${index + 1} - Yes`, 479.02, y),
      originalDrawnCheckbox(8, `ABT6004 Other Interests ${index + 1} - No`, 535.54, y),
    ]
  ),

  originalDrawnCheckbox(9, "ABT6004 Entity felony conviction - Yes", 44.28, 685.06),
  originalDrawnCheckbox(9, "ABT6004 Entity felony conviction - No", 85.82, 685.06),
];

const ABT_6027_INITIALS_FIELDS: TextPlacement[] = [
  { name: "Applicant Initials - License requirement on or before September 30 1988", pageIndex: 1, x: 180.84, y: 314.04, width: 36, height: 12 },
  { name: "Applicant Initials - License requirement after September 30 1988", pageIndex: 1, x: 180.84, y: 243.60, width: 36, height: 12 },
  { name: "Applicant Initials - Inactive status request", pageIndex: 2, x: 180.84, y: 613.20, width: 36, height: 12 },
  { name: "Applicant Initials - Automatic waiver request", pageIndex: 2, x: 180.84, y: 429.36, width: 36, height: 12 },
  { name: "Applicant Initials - Conditional waiver request", pageIndex: 3, x: 180.84, y: 636.84, width: 36, height: 12 },
];

const CHECKBOX_FIELDS_BY_FORM: Partial<Record<string, CheckboxPlacement[]>> = {
  "abt-6002": ABT_6002_CHECKLIST_FIELDS,
  "abt-6004": ABT_6004_FIELDS,
};

const TEXT_FIELDS_BY_FORM: Partial<Record<string, TextPlacement[]>> = {
  "abt-6027": ABT_6027_INITIALS_FIELDS,
};

async function addInteractiveFields(
  sourceBytes: Uint8Array,
  checkboxFields: CheckboxPlacement[],
  textFields: TextPlacement[]
) {
  const pdfDocument = await PDFDocument.load(sourceBytes);
  const pdfForm = pdfDocument.getForm();
  const pages = pdfDocument.getPages();
  const existingFieldNames = new Set(pdfForm.getFields().map((field) => field.getName()));

  for (const field of checkboxFields) {
    if (existingFieldNames.has(field.name)) continue;

    const page = pages[field.pageIndex];
    if (!page) continue;

    const checkbox = pdfForm.createCheckBox(field.name);
    checkbox.addToPage(page, {
      x: field.x,
      y: field.y,
      width: field.width,
      height: field.height,
      borderWidth: field.borderWidth,
      borderColor: rgb(0, 0, 0),
      backgroundColor: rgb(1, 1, 1),
    });
  }

  for (const field of textFields) {
    if (existingFieldNames.has(field.name)) continue;

    const page = pages[field.pageIndex];
    if (!page) continue;

    const textField = pdfForm.createTextField(field.name);
    textField.setMaxLength(10);
    textField.setAlignment(TextAlignment.Center);
    textField.addToPage(page, {
      x: field.x,
      y: field.y,
      width: field.width,
      height: field.height,
      borderWidth: 0,
      textColor: rgb(0, 0, 0),
    });
    textField.setFontSize(10);
  }

  return pdfDocument.save({ useObjectStreams: false });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ formId: string }> }
) {
  const { formId } = await context.params;
  const form = getAbtForm(formId.toLowerCase());

  if (!form) {
    return NextResponse.json({ error: "Unknown Florida ABT form." }, { status: 404 });
  }

  try {
    const localPdfPath = path.join(process.cwd(), "public", "abt-forms", `${form.id}.pdf`);
    const sourcePdfBytes = await readFile(localPdfPath);
    const checkboxFields = CHECKBOX_FIELDS_BY_FORM[form.id] || [];
    const textFields = TEXT_FIELDS_BY_FORM[form.id] || [];
    const hasEnhancements = checkboxFields.length > 0 || textFields.length > 0;
    const pdfBytes = hasEnhancements
      ? await addInteractiveFields(sourcePdfBytes, checkboxFields, textFields)
      : sourcePdfBytes;
    const body = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer;
    const download = new URL(request.url).searchParams.get("download") === "1";
    const filename = `${form.id.toUpperCase()}-official.pdf`;

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": hasEnhancements
          ? "no-store, max-age=0"
          : "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error(`Could not read the verified local copy of ${form.formNumber}`, error);
    return NextResponse.json(
      {
        error:
          "The current official form could not be loaded at this moment. Please try again shortly.",
      },
      { status: 503 }
    );
  }
}
