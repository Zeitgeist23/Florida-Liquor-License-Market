import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";

import { ABT_FORMS_DISCLAIMER, getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PacketRequest = {
  formId?: string;
  applicantName?: string;
  businessName?: string;
  county?: string;
  licenseNumber?: string;
  licenseSeries?: string;
  email?: string;
  phone?: string;
  preparationPurpose?: string;
  notes?: string;
  confirmed?: boolean;
};

const NAVY = rgb(0.025, 0.09, 0.145);
const NAVY_LIGHT = rgb(0.045, 0.145, 0.225);
const GOLD = rgb(0.965, 0.655, 0.035);
const GOLD_LIGHT = rgb(1, 0.79, 0.24);
const WHITE = rgb(0.98, 0.985, 0.99);
const MUTED = rgb(0.68, 0.75, 0.8);
const INK = rgb(0.08, 0.12, 0.16);
const PAPER = rgb(0.965, 0.97, 0.975);

const FORM_CHECKLISTS: Record<string, string[]> = {
  "abt-6001": [
    "Confirm the requested license series and business activity.",
    "Prepare applicant ownership and interested-party information.",
    "Gather location, right-of-occupancy and premises information.",
    "Review fingerprint, fee and supporting-document requirements.",
  ],
  "abt-6002": [
    "Identify the existing license, county, seller and proposed applicant.",
    "Confirm the purchase, escrow and proposed-location information.",
    "Prepare applicant ownership and interested-party disclosures.",
    "Review fingerprint, fee, clearance and supporting-document requirements.",
  ],
  "abt-6014": [
    "Identify the current license number, series, type and location.",
    "Identify the requested location, series or license-type change.",
    "Gather premises, zoning and right-of-occupancy materials if applicable.",
    "Review additional approvals and attachments required for the change.",
  ],
  "abt-6027": [
    "Identify the quota license and its current operating status.",
    "Select inactive status, automatic waiver or conditional waiver.",
    "Prepare the explanation and documentation supporting the request.",
    "Review dates, initials, signatures and continuing renewal requirements.",
  ],
  "abt-6022": [
    "Identify the spirituous alcoholic beverage license and license owner.",
    "Identify the lender, mortgagee, assignee or secured party.",
    "Attach the executed note, security agreement or related instrument.",
    "Confirm execution dates and applicable recording deadlines.",
  ],
  "abt-6023": [
    "Identify the license number, series, county and current owner.",
    "Identify the requesting party and return-delivery information.",
    "Confirm the requested scope of the ABT lien search.",
    "Retain the completed search response with the transaction file.",
  ],
  "abt-6004": [
    "Identify the licensed entity and existing license information.",
    "List each officer, director, member or stockholder change.",
    "Prepare ownership, fingerprint and personal-history materials.",
    "Confirm entity records and amended-name documentation if applicable.",
  ],
  "abt-6009": [
    "Identify the existing license or permit and licensed entity.",
    "Enter the requested business-name or mailing-address change.",
    "Confirm that the request does not change the licensed location.",
    "Review authorization, signature and entity-document requirements.",
  ],
  "abt-6033": [
    "Confirm that the annual drawing entry period is open.",
    "Confirm the eligible county and applicant or entity information.",
    "Prepare the entry fee and any required payment information.",
    "Review the current official drawing notice before submission.",
  ],
};

function cleanText(value: unknown, maxLength = 240) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x20-\x7E\n]/g, "")
    .trim()
    .slice(0, maxLength);
}

function isPdf(bytes: Uint8Array) {
  return bytes.length > 5
    && bytes[0] === 0x25
    && bytes[1] === 0x50
    && bytes[2] === 0x44
    && bytes[3] === 0x46
    && bytes[4] === 0x2d;
}

async function loadOfficialPdf(formId: string, officialPdfUrl: string) {
  try {
    const localPath = path.join(process.cwd(), "public", "abt-forms", `${formId}.pdf`);
    const localBytes = new Uint8Array(await readFile(localPath));
    if (isPdf(localBytes)) return localBytes;
  } catch {
    // Some time-limited forms, such as ABT-6033, are retrieved from DBPR.
  }

  const response = await fetch(officialPdfUrl, {
    cache: "no-store",
    redirect: "follow",
    headers: {
      Accept: "application/pdf,application/octet-stream;q=0.9,*/*;q=0.8",
      "User-Agent": "Mozilla/5.0 FLLM-Application-Center/1.0",
      Referer: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/forms-and-publications/",
    },
  });

  if (!response.ok) throw new Error(`DBPR returned ${response.status}.`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (!isPdf(bytes)) throw new Error("DBPR did not return a PDF.");
  return bytes;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = cleanText(text, 2_000).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawWrappedText(
  page: PDFPage,
  text: string,
  options: { x: number; y: number; width: number; font: PDFFont; size: number; color: ReturnType<typeof rgb>; lineHeight?: number }
) {
  const lineHeight = options.lineHeight ?? options.size * 1.35;
  const lines = wrapText(text, options.font, options.size, options.width);
  lines.forEach((line, index) => {
    page.drawText(line, {
      x: options.x,
      y: options.y - index * lineHeight,
      size: options.size,
      font: options.font,
      color: options.color,
    });
  });
  return options.y - lines.length * lineHeight;
}

function drawPacketFooter(page: PDFPage, regular: PDFFont, pageLabel: string) {
  page.drawLine({ start: { x: 48, y: 39 }, end: { x: 564, y: 39 }, thickness: 0.6, color: GOLD });
  page.drawText("Florida Liquor License Market | floridaliquorlicensemarket.com", {
    x: 48,
    y: 24,
    size: 7.5,
    font: regular,
    color: MUTED,
  });
  page.drawText(pageLabel, { x: 526, y: 24, size: 7.5, font: regular, color: MUTED });
}

function drawBrandSeal(page: PDFPage, bold: PDFFont) {
  page.drawCircle({ x: 520, y: 716, size: 35, color: NAVY, borderColor: GOLD, borderWidth: 2 });
  page.drawCircle({ x: 520, y: 716, size: 28, borderColor: GOLD_LIGHT, borderWidth: 0.7 });
  page.drawText("FLLM", { x: 499, y: 710, size: 13, font: bold, color: GOLD_LIGHT });
}

async function createIntroPages(payload: Required<PacketRequest>, form: NonNullable<ReturnType<typeof getAbtForm>>) {
  const document = await PDFDocument.create();
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const serifBold = await document.embedFont(StandardFonts.TimesRomanBold);
  const cover = document.addPage([612, 792]);

  cover.drawRectangle({ x: 0, y: 0, width: 612, height: 792, color: NAVY });
  cover.drawRectangle({ x: 0, y: 0, width: 13, height: 792, color: GOLD });
  cover.drawRectangle({ x: 48, y: 568, width: 516, height: 1.2, color: GOLD });
  drawBrandSeal(cover, bold);

  cover.drawText("FLORIDA LIQUOR LICENSE MARKET", {
    x: 48,
    y: 728,
    size: 10,
    font: bold,
    color: GOLD_LIGHT,
  });
  cover.drawText("APPLICATION PREPARATION PACKET", {
    x: 48,
    y: 697,
    size: 8.5,
    font: bold,
    color: MUTED,
  });
  drawWrappedText(cover, form.formNumber, { x: 48, y: 650, width: 430, font: serifBold, size: 30, color: WHITE, lineHeight: 34 });
  drawWrappedText(cover, form.title, { x: 48, y: 608, width: 500, font: serifBold, size: 21, color: WHITE, lineHeight: 25 });

  const details = [
    ["Applicant / contact", payload.applicantName || "Not supplied"],
    ["Business / entity", payload.businessName || "Not supplied"],
    ["Florida county", payload.county || "Not supplied"],
    ["License number", payload.licenseNumber || "Not supplied"],
    ["License series / type", payload.licenseSeries || "Not supplied"],
    ["Preparation purpose", payload.preparationPurpose || "Not supplied"],
  ];

  let detailY = 525;
  details.forEach(([label, value], index) => {
    const rowY = detailY - index * 47;
    cover.drawText(label.toUpperCase(), { x: 48, y: rowY, size: 7.5, font: bold, color: GOLD_LIGHT });
    cover.drawText(cleanText(value, 85), { x: 48, y: rowY - 18, size: 12, font: regular, color: WHITE });
    cover.drawLine({ start: { x: 48, y: rowY - 28 }, end: { x: 564, y: rowY - 28 }, thickness: 0.35, color: NAVY_LIGHT });
  });

  cover.drawRectangle({ x: 48, y: 91, width: 516, height: 78, color: NAVY_LIGHT, borderColor: GOLD, borderWidth: 0.7 });
  cover.drawText("OFFICIAL-FORM INTEGRITY", { x: 64, y: 145, size: 8, font: bold, color: GOLD_LIGHT });
  drawWrappedText(
    cover,
    "The official DBPR form follows the FLLM cover and checklist. Government headings, certifications and signature language have not been rebranded or rewritten.",
    { x: 64, y: 126, width: 480, font: regular, size: 9, color: WHITE, lineHeight: 13 }
  );
  drawPacketFooter(cover, regular, "Packet cover");

  const checklistPage = document.addPage([612, 792]);
  checklistPage.drawRectangle({ x: 0, y: 0, width: 612, height: 792, color: PAPER });
  checklistPage.drawRectangle({ x: 0, y: 716, width: 612, height: 76, color: NAVY });
  checklistPage.drawRectangle({ x: 0, y: 716, width: 13, height: 76, color: GOLD });
  checklistPage.drawText("FLLM PREPARATION CHECKLIST", { x: 48, y: 752, size: 9, font: bold, color: GOLD_LIGHT });
  checklistPage.drawText(`${form.formNumber} filing file`, { x: 48, y: 727, size: 19, font: serifBold, color: WHITE });

  checklistPage.drawText("Before filing", { x: 48, y: 682, size: 19, font: serifBold, color: NAVY });
  checklistPage.drawText("Use this page to organize the official application and its supporting documents.", {
    x: 48,
    y: 658,
    size: 9.5,
    font: regular,
    color: INK,
  });

  const checklist = FORM_CHECKLISTS[form.id] ?? form.useCases;
  let checklistY = 619;
  checklist.forEach((item) => {
    checklistPage.drawRectangle({ x: 49, y: checklistY - 2, width: 11, height: 11, borderColor: GOLD, borderWidth: 1 });
    checklistY = drawWrappedText(checklistPage, item, {
      x: 72,
      y: checklistY,
      width: 470,
      font: regular,
      size: 10.5,
      color: INK,
      lineHeight: 14,
    }) - 17;
  });

  checklistPage.drawText("Document index", { x: 48, y: checklistY - 1, size: 19, font: serifBold, color: NAVY });
  checklistY -= 35;
  [
    "Completed official application",
    "Identity, ownership and fingerprint materials, if required",
    "Location, lease, deed, sketch or occupancy materials, if required",
    "Transaction, financing, fee and clearance materials, if required",
    "Additional explanations, approvals or supporting exhibits",
  ].forEach((item, index) => {
    checklistPage.drawText(String(index + 1).padStart(2, "0"), { x: 48, y: checklistY, size: 8, font: bold, color: GOLD });
    checklistPage.drawText(item, { x: 78, y: checklistY, size: 9.5, font: regular, color: INK });
    checklistPage.drawLine({ start: { x: 78, y: checklistY - 7 }, end: { x: 552, y: checklistY - 7 }, thickness: 0.35, color: MUTED });
    checklistY -= 34;
  });

  if (payload.notes) {
    checklistPage.drawText("Preparation notes", { x: 48, y: checklistY - 2, size: 12, font: bold, color: NAVY });
    checklistY = drawWrappedText(checklistPage, payload.notes, { x: 48, y: checklistY - 22, width: 504, font: regular, size: 8.5, color: INK, lineHeight: 11.5 });
  }

  checklistPage.drawRectangle({ x: 48, y: 61, width: 516, height: 73, color: rgb(0.91, 0.925, 0.935), borderColor: GOLD, borderWidth: 0.7 });
  checklistPage.drawText("IMPORTANT", { x: 62, y: 111, size: 7.5, font: bold, color: NAVY });
  drawWrappedText(checklistPage, ABT_FORMS_DISCLAIMER, {
    x: 62,
    y: 95,
    width: 488,
    font: regular,
    size: 7.2,
    color: INK,
    lineHeight: 9.2,
  });
  drawPacketFooter(checklistPage, regular, "Preparation checklist");

  return document;
}

export async function POST(request: Request) {
  let body: PacketRequest;
  try {
    body = await request.json() as PacketRequest;
  } catch {
    return NextResponse.json({ error: "The packet request was not valid." }, { status: 400 });
  }

  const formId = cleanText(body.formId, 30).toLowerCase();
  const form = getAbtForm(formId);
  if (!form) return NextResponse.json({ error: "Please select a supported Florida ABT form." }, { status: 400 });
  if (!body.confirmed) return NextResponse.json({ error: "Please confirm the preparation-packet notice." }, { status: 400 });

  const payload: Required<PacketRequest> = {
    formId,
    applicantName: cleanText(body.applicantName, 90),
    businessName: cleanText(body.businessName, 120),
    county: cleanText(body.county, 80),
    licenseNumber: cleanText(body.licenseNumber, 50),
    licenseSeries: cleanText(body.licenseSeries, 80),
    email: cleanText(body.email, 120),
    phone: cleanText(body.phone, 40),
    preparationPurpose: cleanText(body.preparationPurpose, 120),
    notes: cleanText(body.notes, 700),
    confirmed: true,
  };

  if (!payload.applicantName || !payload.email) {
    return NextResponse.json({ error: "Applicant name and email are required to create the packet." }, { status: 400 });
  }

  try {
    const [officialBytes, introDocument] = await Promise.all([
      loadOfficialPdf(form.id, form.officialPdfUrl),
      createIntroPages(payload, form),
    ]);
    const officialDocument = await PDFDocument.load(officialBytes, { ignoreEncryption: true });
    const introPages = await officialDocument.copyPages(introDocument, introDocument.getPageIndices());
    [...introPages].reverse().forEach((page) => officialDocument.insertPage(0, page));

    officialDocument.setTitle(`FLLM ${form.formNumber} Application Preparation Packet`);
    officialDocument.setAuthor("Florida Liquor License Market");
    officialDocument.setSubject(`${form.title} preparation packet with current official DBPR form`);
    officialDocument.setKeywords(["Florida liquor license", form.formNumber, "DBPR", "FLLM application packet"]);
    officialDocument.setProducer("Florida Liquor License Market Application Center");
    officialDocument.setCreationDate(new Date());

    const bytes = await officialDocument.save({ useObjectStreams: false });
    const responseBody = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    const filename = `FLLM-${form.formNumber.replace(/DBPR\s+/i, "").replace(/[^A-Za-z0-9-]/g, "-")}-Application-Preparation-Packet.pdf`;

    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error(`Could not generate the ${form.formNumber} preparation packet`, error);
    return NextResponse.json(
      { error: "The current official form could not be loaded into the preparation packet. Please try again shortly." },
      { status: 503 }
    );
  }
}
