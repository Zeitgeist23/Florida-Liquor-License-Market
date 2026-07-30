import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";

import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ABT_6002_CHECKLIST_FIELDS = [
  { name: "ABT6002 Checklist - Complete transfer application", x: 268.49, y: 662.858 },
  { name: "ABT6002 Checklist - Pay temporary license fee", x: 268.49, y: 628.538 },
  { name: "ABT6002 Checklist - Complete ABT-6032 surety bond", x: 268.49, y: 594.218 },
  { name: "ABT6002 Checklist - Submit fingerprint receipt", x: 268.49, y: 559.658 },
  { name: "ABT6002 Checklist - Include arrest disposition", x: 268.49, y: 548.018 },
  { name: "ABT6002 Checklist - Include moral character mitigation", x: 268.49, y: 536.738 },
  { name: "ABT6002 Checklist - Submit right of occupancy", x: 268.49, y: 525.218 },
  { name: "ABT6002 Checklist - Change in series", x: 268.73, y: 490.148 },
  { name: "ABT6002 Checklist - Decrease in series", x: 268.73, y: 478.628 },
  { name: "ABT6002 Checklist - Increase in series", x: 268.73, y: 467.108 },
  { name: "ABT6002 Checklist - Change of location", x: 268.73, y: 455.588 },
  { name: "ABT6002 Checklist - Change of business name", x: 268.73, y: 444.068 },
  {
    name: "ABT6002 Checklist - Change officer stockholder or corporate name",
    x: 268.73,
    y: 432.668,
  },
  {
    name: "ABT6002 Checklist - New retail tobacco dealer permit",
    x: 268.73,
    y: 421.148,
  },
] as const;

async function addAbt6002ChecklistFields(sourceBytes: Uint8Array) {
  const pdfDocument = await PDFDocument.load(sourceBytes);
  const pdfForm = pdfDocument.getForm();
  const checklistPage = pdfDocument.getPages()[4];

  if (!checklistPage) return sourceBytes;

  const existingFieldNames = new Set(pdfForm.getFields().map((field) => field.getName()));

  for (const field of ABT_6002_CHECKLIST_FIELDS) {
    if (existingFieldNames.has(field.name)) continue;

    const checkbox = pdfForm.createCheckBox(field.name);
    checkbox.addToPage(checklistPage, {
      x: field.x - 0.35,
      y: field.y - 0.25,
      width: 10.25,
      height: 10.25,
      borderWidth: 0.75,
      borderColor: rgb(0, 0, 0),
      backgroundColor: rgb(1, 1, 1),
    });
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
    const pdfBytes =
      form.id === "abt-6002"
        ? await addAbt6002ChecklistFields(sourcePdfBytes)
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
        "Cache-Control":
          form.id === "abt-6002"
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
