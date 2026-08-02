import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type DbprPackageOffice = {
  name: string;
  addressLines: string[];
  phone: string;
};

export type DbprPackageTransaction = {
  reference: string;
  transactionName: string;
  county: string;
  licenseType: string;
  licenseNumber: string | null;
};

function wrapText(text: string, maxCharacters: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function safePdfText(value: string) {
  return value
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "?");
}

export async function createDbprPackageCover(input: {
  transaction: DbprPackageTransaction;
  office: DbprPackageOffice;
  includedTitles: string[];
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const navy = rgb(0.03, 0.1, 0.22);
  const gold = rgb(0.78, 0.52, 0.05);
  let y = 744;
  page.drawText("FLORIDA LIQUOR LICENSE MARKET", { x: 48, y, size: 10, font: bold, color: gold });
  y -= 28;
  page.drawText("DBPR/ABT Submission Package", { x: 48, y, size: 24, font: bold, color: navy });
  y -= 22;
  page.drawText(safePdfText(`Project reference: ${input.transaction.reference}`), { x: 48, y, size: 10, font: regular, color: navy });
  y -= 30;
  const facts = [
    `Transaction: ${input.transaction.transactionName}`,
    `County: ${input.transaction.county}`,
    `License type: ${input.transaction.licenseType}`,
    `License number: ${input.transaction.licenseNumber || "Not provided"}`,
  ];
  facts.forEach((fact) => {
    wrapText(safePdfText(fact), 82).forEach((line) => {
      page.drawText(line, { x: 48, y, size: 11, font: regular, color: navy });
      y -= 18;
    });
  });
  y -= 12;
  page.drawText("Deliver to:", { x: 48, y, size: 12, font: bold, color: navy });
  y -= 19;
  [input.office.name, ...input.office.addressLines, `Phone: ${input.office.phone}`].map(safePdfText).forEach((line) => {
    page.drawText(line, { x: 48, y, size: 10.5, font: regular, color: navy });
    y -= 16;
  });
  y -= 14;
  page.drawText("Documents included in this assembled PDF:", { x: 48, y, size: 12, font: bold, color: navy });
  y -= 20;
  input.includedTitles.forEach((title) => {
    wrapText(safePdfText(`[X] ${title}`), 82).forEach((line) => {
      page.drawText(line, { x: 55, y, size: 10, font: regular, color: navy });
      y -= 15;
    });
  });
  y -= 12;
  const reminders = [
    "Verify every form, attachment, signature, notarization, fingerprint receipt, approval, and fee before delivery.",
    "DBPR currently directs ABT-6002 transfer applications to a district office by mail, hand delivery, or appointment.",
    "This assembled PDF is an administrative convenience. It does not itself file the application or prove agency receipt.",
    "Where DBPR requires an original application or original signature, deliver the required original - not merely a printed copy of an electronic image.",
  ];
  reminders.forEach((reminder) => {
    wrapText(reminder, 86).forEach((line, index) => {
      page.drawText(`${index === 0 ? "- " : "  "}${line}`, { x: 48, y, size: 9.5, font: regular, color: navy });
      y -= 14;
    });
    y -= 5;
  });
  page.drawText(`Prepared ${new Date().toLocaleDateString("en-US")} - Verify office details before delivery`, {
    x: 48,
    y: 40,
    size: 8.5,
    font: regular,
    color: rgb(0.35, 0.39, 0.43),
  });
  return pdf;
}
