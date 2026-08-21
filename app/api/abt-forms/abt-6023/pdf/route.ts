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
  maxLength?: number;
  fontSize?: number;
  alignment?: TextAlignment;
};

type CheckboxPlacement = {
  name: string;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const CHECKBOX_FIELDS: CheckboxPlacement[] = [
  {
    name: "ABT6023 Checklist - Complete application",
    pageIndex: 0,
    x: 193.5,
    y: 446.5,
    width: 9.5,
    height: 9.5,
  },
  {
    name: "ABT6023 Checklist - Pay $20 fee",
    pageIndex: 0,
    x: 193.5,
    y: 425.5,
    width: 9.5,
    height: 9.5,
  },
];

const TEXT_FIELDS: TextPlacement[] = [
  { name: "Name of Requestor", pageIndex: 1, x: 154, y: 548, width: 345, height: 15, maxLength: 100, alignment: TextAlignment.Left },
  { name: "Mailing Address", pageIndex: 1, x: 150, y: 527, width: 349, height: 15, maxLength: 120, alignment: TextAlignment.Left },
  { name: "City", pageIndex: 1, x: 96, y: 506, width: 258, height: 15, maxLength: 60, alignment: TextAlignment.Left },
  { name: "State", pageIndex: 1, x: 382, y: 506, width: 28, height: 15, maxLength: 2, alignment: TextAlignment.Center },
  { name: "Zip Code", pageIndex: 1, x: 447, y: 506, width: 52, height: 15, maxLength: 10, alignment: TextAlignment.Center },
  { name: "Requestor E-mail Address", pageIndex: 1, x: 126, y: 485, width: 226, height: 15, maxLength: 100, alignment: TextAlignment.Left },
  { name: "Requestor Telephone Number", pageIndex: 1, x: 417, y: 485, width: 82, height: 15, maxLength: 20, alignment: TextAlignment.Left },
  { name: "Requestor Telephone Extension", pageIndex: 1, x: 431, y: 471, width: 38, height: 12, maxLength: 8, alignment: TextAlignment.Left, fontSize: 9 },
  { name: "Contact Person", pageIndex: 1, x: 202, y: 458, width: 297, height: 15, maxLength: 100, alignment: TextAlignment.Left },
  { name: "Contact Telephone Number", pageIndex: 1, x: 127, y: 437, width: 108, height: 15, maxLength: 20, alignment: TextAlignment.Left },
  { name: "Contact Telephone Extension", pageIndex: 1, x: 196, y: 423, width: 38, height: 12, maxLength: 8, alignment: TextAlignment.Left, fontSize: 9 },
  { name: "Contact E-mail Address", pageIndex: 1, x: 319, y: 437, width: 180, height: 15, maxLength: 100, alignment: TextAlignment.Left },
  { name: "License number to be researched", pageIndex: 1, x: 228, y: 388, width: 271, height: 15, maxLength: 40, alignment: TextAlignment.Left },
  { name: "Owner Name", pageIndex: 1, x: 126, y: 367, width: 373, height: 15, maxLength: 100, alignment: TextAlignment.Left },
  { name: "Business Name DBA", pageIndex: 1, x: 161, y: 346, width: 338, height: 15, maxLength: 120, alignment: TextAlignment.Left },
  { name: "Check Money Order Number", pageIndex: 1, x: 205, y: 293, width: 294, height: 15, maxLength: 40, alignment: TextAlignment.Left },
  { name: "Lien Account Number If Applicable", pageIndex: 1, x: 244, y: 272, width: 255, height: 15, maxLength: 50, alignment: TextAlignment.Left },
];

async function getOfficialPdfBytes(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "FloridaLiquorLicenseMarket/1.0",
      Accept: "application/pdf",
    },
  });

  if (!response.ok) {
    throw new Error(`DBPR returned HTTP ${response.status}`);
  }

  return new Uint8Array(await response.arrayBuffer());
}

async function addInteractiveFields(sourceBytes: Uint8Array) {
  const pdfDocument = await PDFDocument.load(sourceBytes);
  const pdfForm = pdfDocument.getForm();
  const pages = pdfDocument.getPages();

  for (const field of CHECKBOX_FIELDS) {
    const page = pages[field.pageIndex];
    if (!page) continue;

    const checkbox = pdfForm.createCheckBox(field.name);
    checkbox.addToPage(page, {
      x: field.x,
      y: field.y,
      width: field.width,
      height: field.height,
      borderWidth: 0,
      textColor: rgb(0, 0, 0),
    });
  }

  for (const field of TEXT_FIELDS) {
    const page = pages[field.pageIndex];
    if (!page) continue;

    const textField = pdfForm.createTextField(field.name);
    if (field.maxLength) textField.setMaxLength(field.maxLength);
    textField.setAlignment(field.alignment ?? TextAlignment.Left);
    textField.addToPage(page, {
      x: field.x,
      y: field.y,
      width: field.width,
      height: field.height,
      borderWidth: 0,
      textColor: rgb(0, 0, 0),
    });
    textField.setFontSize(field.fontSize ?? 10);
  }

  return pdfDocument.save({ useObjectStreams: false });
}

export async function GET(request: Request) {
  const form = getAbtForm("abt-6023");
  if (!form) {
    return NextResponse.json({ error: "ABT-6023 is not configured." }, { status: 404 });
  }

  try {
    const sourceBytes = await getOfficialPdfBytes(form.officialPdfUrl);
    const pdfBytes = await addInteractiveFields(sourceBytes);
    const body = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer;
    const download = new URL(request.url).searchParams.get("download") === "1";

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="ABT-6023-interactive.pdf"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error("Could not build interactive ABT-6023", error);
    return NextResponse.json(
      { error: "The interactive ABT-6023 form could not be loaded at this moment." },
      { status: 503 }
    );
  }
}
