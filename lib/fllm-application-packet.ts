import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";

import { ABT_FORMS_DISCLAIMER, type AbtFormDefinition } from "@/data/abt-forms";

export type ApplicationPacketInput = {
  applicantName: string;
  businessName: string;
  county: string;
  licenseNumber: string;
  licenseSeries: string;
  email: string;
  phone: string;
  preparationPurpose: string;
  notes: string;
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

function cleanText(value: string, maxLength = 240) {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x20-\x7E\n]/g, "")
    .trim()
    .slice(0, maxLength);
}

function isPdf(bytes: Uint8Array) {
  return bytes.length > 5 && String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
}

async function fetchOfficialForm(form: AbtFormDefinition) {
  const candidates = [`/abt-forms/${form.id}.pdf`, form.officialPdfUrl];
  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: "no-store", redirect: "follow" });
      if (!response.ok) continue;
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (isPdf(bytes)) return bytes;
    } catch {
      // Try the verified official DBPR source after the bundled copy.
    }
  }
  throw new Error("The current official form could not be loaded. Use the official DBPR form link and try the packet again shortly.");
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = cleanText(text, 2_000).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) line = candidate;
    else {
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
  lines.forEach((line, index) => page.drawText(line, {
    x: options.x,
    y: options.y - index * lineHeight,
    size: options.size,
    font: options.font,
    color: options.color,
  }));
  return options.y - lines.length * lineHeight;
}

function drawFooter(page: PDFPage, regular: PDFFont, pageLabel: string) {
  page.drawLine({ start: { x: 48, y: 39 }, end: { x: 564, y: 39 }, thickness: 0.6, color: GOLD });
  page.drawText("Florida Liquor License Market | floridaliquorlicensemarket.com", { x: 48, y: 24, size: 7.5, font: regular, color: MUTED });
  page.drawText(pageLabel, { x: 500, y: 24, size: 7.5, font: regular, color: MUTED });
}

async function createIntroPages(input: ApplicationPacketInput, form: AbtFormDefinition) {
  const document = await PDFDocument.create();
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const serifBold = await document.embedFont(StandardFonts.TimesRomanBold);
  const cover = document.addPage([612, 792]);
  cover.drawRectangle({ x: 0, y: 0, width: 612, height: 792, color: NAVY });
  cover.drawRectangle({ x: 0, y: 0, width: 13, height: 792, color: GOLD });
  cover.drawLine({ start: { x: 48, y: 568 }, end: { x: 564, y: 568 }, thickness: 1.2, color: GOLD });
  cover.drawCircle({ x: 520, y: 716, size: 35, color: NAVY, borderColor: GOLD, borderWidth: 2 });
  cover.drawCircle({ x: 520, y: 716, size: 28, borderColor: GOLD_LIGHT, borderWidth: 0.7 });
  cover.drawText("FLLM", { x: 499, y: 710, size: 13, font: bold, color: GOLD_LIGHT });
  cover.drawText("FLORIDA LIQUOR LICENSE MARKET", { x: 48, y: 728, size: 10, font: bold, color: GOLD_LIGHT });
  cover.drawText("APPLICATION PREPARATION PACKET", { x: 48, y: 697, size: 8.5, font: bold, color: MUTED });
  drawWrappedText(cover, form.formNumber, { x: 48, y: 650, width: 430, font: serifBold, size: 30, color: WHITE, lineHeight: 34 });
  drawWrappedText(cover, form.title, { x: 48, y: 608, width: 500, font: serifBold, size: 21, color: WHITE, lineHeight: 25 });

  const details = [
    ["Applicant / contact", input.applicantName || "Not supplied"],
    ["Business / entity", input.businessName || "Not supplied"],
    ["Florida county", input.county || "Not supplied"],
    ["License number", input.licenseNumber || "Not supplied"],
    ["License series / type", input.licenseSeries || "Not supplied"],
    ["Preparation purpose", input.preparationPurpose || "Not supplied"],
  ];
  details.forEach(([label, value], index) => {
    const rowY = 525 - index * 47;
    cover.drawText(label.toUpperCase(), { x: 48, y: rowY, size: 7.5, font: bold, color: GOLD_LIGHT });
    cover.drawText(cleanText(value, 85), { x: 48, y: rowY - 18, size: 12, font: regular, color: WHITE });
    cover.drawLine({ start: { x: 48, y: rowY - 28 }, end: { x: 564, y: rowY - 28 }, thickness: 0.35, color: NAVY_LIGHT });
  });
  cover.drawRectangle({ x: 48, y: 91, width: 516, height: 78, color: NAVY_LIGHT, borderColor: GOLD, borderWidth: 0.7 });
  cover.drawText("OFFICIAL-FORM INTEGRITY", { x: 64, y: 145, size: 8, font: bold, color: GOLD_LIGHT });
  drawWrappedText(cover, "The official DBPR form follows the FLLM cover and checklist. Government headings, certifications and signature language have not been rebranded or rewritten.", { x: 64, y: 126, width: 480, font: regular, size: 9, color: WHITE, lineHeight: 13 });
  drawFooter(cover, regular, "Packet cover");

  const checklistPage = document.addPage([612, 792]);
  checklistPage.drawRectangle({ x: 0, y: 0, width: 612, height: 792, color: PAPER });
  checklistPage.drawRectangle({ x: 0, y: 716, width: 612, height: 76, color: NAVY });
  checklistPage.drawRectangle({ x: 0, y: 716, width: 13, height: 76, color: GOLD });
  checklistPage.drawText("FLLM PREPARATION CHECKLIST", { x: 48, y: 752, size: 9, font: bold, color: GOLD_LIGHT });
  checklistPage.drawText(`${form.formNumber} filing file`, { x: 48, y: 727, size: 19, font: serifBold, color: WHITE });
  checklistPage.drawText("Before filing", { x: 48, y: 682, size: 19, font: serifBold, color: NAVY });
  checklistPage.drawText("Use this page to organize the official application and its supporting documents.", { x: 48, y: 658, size: 9.5, font: regular, color: INK });

  let y = 619;
  (FORM_CHECKLISTS[form.id] ?? form.useCases).forEach((item) => {
    checklistPage.drawRectangle({ x: 49, y: y - 2, width: 11, height: 11, borderColor: GOLD, borderWidth: 1 });
    y = drawWrappedText(checklistPage, item, { x: 72, y, width: 470, font: regular, size: 10.5, color: INK, lineHeight: 14 }) - 17;
  });
  checklistPage.drawText("Document index", { x: 48, y: y - 1, size: 19, font: serifBold, color: NAVY });
  y -= 35;
  [
    "Completed official application",
    "Identity, ownership and fingerprint materials, if required",
    "Location, lease, deed, sketch or occupancy materials, if required",
    "Transaction, financing, fee and clearance materials, if required",
    "Additional explanations, approvals or supporting exhibits",
  ].forEach((item, index) => {
    checklistPage.drawText(String(index + 1).padStart(2, "0"), { x: 48, y, size: 8, font: bold, color: GOLD });
    checklistPage.drawText(item, { x: 78, y, size: 9.5, font: regular, color: INK });
    checklistPage.drawLine({ start: { x: 78, y: y - 7 }, end: { x: 552, y: y - 7 }, thickness: 0.35, color: MUTED });
    y -= 34;
  });
  if (input.notes) {
    checklistPage.drawText("Preparation notes", { x: 48, y: y - 2, size: 12, font: bold, color: NAVY });
    drawWrappedText(checklistPage, input.notes, { x: 48, y: y - 22, width: 504, font: regular, size: 8.5, color: INK, lineHeight: 11.5 });
  }
  checklistPage.drawRectangle({ x: 48, y: 61, width: 516, height: 73, color: rgb(0.91, 0.925, 0.935), borderColor: GOLD, borderWidth: 0.7 });
  checklistPage.drawText("IMPORTANT", { x: 62, y: 111, size: 7.5, font: bold, color: NAVY });
  drawWrappedText(checklistPage, ABT_FORMS_DISCLAIMER, { x: 62, y: 95, width: 488, font: regular, size: 7.2, color: INK, lineHeight: 9.2 });
  drawFooter(checklistPage, regular, "Preparation checklist");
  return document;
}

export async function generateFllmApplicationPacket(input: ApplicationPacketInput, form: AbtFormDefinition) {
  const [officialBytes, introDocument] = await Promise.all([fetchOfficialForm(form), createIntroPages(input, form)]);
  const officialDocument = await PDFDocument.load(officialBytes, { ignoreEncryption: true });
  const introPages = await officialDocument.copyPages(introDocument, introDocument.getPageIndices());
  [...introPages].reverse().forEach((page) => officialDocument.insertPage(0, page));
  officialDocument.setTitle(`FLLM ${form.formNumber} Application Preparation Packet`);
  officialDocument.setAuthor("Florida Liquor License Market");
  officialDocument.setSubject(`${form.title} preparation packet with current official DBPR form`);
  officialDocument.setKeywords(["Florida liquor license", form.formNumber, "DBPR", "FLLM application packet"]);
  officialDocument.setProducer("Florida Liquor License Market Application Center");
  const bytes = await officialDocument.save({ useObjectStreams: false });
  const body = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return new Blob([body], { type: "application/pdf" });
}
