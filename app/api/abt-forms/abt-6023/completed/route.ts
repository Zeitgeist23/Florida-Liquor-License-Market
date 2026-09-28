import { NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Completed6023Input = {
  requestorName?: string;
  mailingAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
  email?: string;
  telephone?: string;
  telephoneExt?: string;
  contactPerson?: string;
  contactTelephone?: string;
  contactTelephoneExt?: string;
  contactEmail?: string;
  licenseNumber?: string;
  ownerName?: string;
  businessName?: string;
  checkNumber?: string;
  lienAccountNumber?: string;
  checklistApplication?: boolean;
  checklistFee?: boolean;
};

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const black = rgb(0, 0, 0);
const darkBlue = rgb(0.03, 0.12, 0.2);
const lightBlue = rgb(0.92, 0.96, 0.99);
const gray = rgb(0.35, 0.38, 0.42);

function clean(value: unknown, max = 220) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, max)
    : "";
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
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

function drawWrapped(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = size * 1.35,
  color = black,
) {
  const lines = wrapText(text, font, size, maxWidth);
  lines.forEach((line, index) => {
    page.drawText(line, { x, y: y - index * lineHeight, size, font, color });
  });
  return y - Math.max(0, lines.length - 1) * lineHeight;
}

function drawRule(page: PDFPage, y: number, x1 = 54, x2 = 558, thickness = 0.8) {
  page.drawLine({
    start: { x: x1, y },
    end: { x: x2, y },
    thickness,
    color: black,
  });
}

function drawLabel(page: PDFPage, label: string, font: PDFFont, x: number, y: number) {
  page.drawText(label, { x, y, size: 8.3, font, color: black });
}

function drawValueBox(
  page: PDFPage,
  value: string,
  font: PDFFont,
  x: number,
  y: number,
  width: number,
  height = 19,
  fontSize = 9.5,
) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderColor: rgb(0.32, 0.38, 0.43),
    borderWidth: 0.75,
    color: rgb(1, 1, 1),
  });
  const clipped = value.length > 120 ? value.slice(0, 120) : value;
  const lines = wrapText(clipped, font, fontSize, width - 10).slice(0, 2);
  lines.forEach((line, index) => {
    page.drawText(line, {
      x: x + 5,
      y: y + height - 13 - index * 9.5,
      size: fontSize,
      font,
      color: black,
    });
  });
}

function drawCheck(
  page: PDFPage,
  checked: boolean,
  label: string,
  font: PDFFont,
  bold: PDFFont,
  x: number,
  y: number,
  maxWidth: number,
) {
  const size = 10;
  page.drawRectangle({
    x,
    y: y - 1,
    width: size,
    height: size,
    borderColor: black,
    borderWidth: 0.8,
    color: rgb(1, 1, 1),
  });
  if (checked) {
    page.drawText("X", {
      x: x + 1.6,
      y: y + 0.2,
      size: 8.5,
      font: bold,
      color: black,
    });
  }
  drawWrapped(page, label, font, 8.7, x + 16, y + 1, maxWidth - 16, 11);
}

function addFooter(page: PDFPage, font: PDFFont, pageNumber: number) {
  page.drawText("DBPR ABT-6023 - Request for Alcoholic Beverage License Lien Search", {
    x: 54,
    y: 25,
    size: 7,
    font,
    color: gray,
  });
  page.drawText(`Page ${pageNumber} of 2`, {
    x: 505,
    y: 25,
    size: 7,
    font,
    color: gray,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Completed6023Input;
    const values = {
      requestorName: clean(body.requestorName, 160),
      mailingAddress: clean(body.mailingAddress, 220),
      city: clean(body.city, 100),
      state: clean(body.state, 2).toUpperCase(),
      zip: clean(body.zip, 18),
      email: clean(body.email, 160),
      telephone: clean(body.telephone, 40),
      telephoneExt: clean(body.telephoneExt, 15),
      contactPerson: clean(body.contactPerson, 160),
      contactTelephone: clean(body.contactTelephone, 40),
      contactTelephoneExt: clean(body.contactTelephoneExt, 15),
      contactEmail: clean(body.contactEmail, 160),
      licenseNumber: clean(body.licenseNumber, 60).toUpperCase(),
      ownerName: clean(body.ownerName, 180),
      businessName: clean(body.businessName, 180),
      checkNumber: clean(body.checkNumber, 80),
      lienAccountNumber: clean(body.lienAccountNumber, 80),
      checklistApplication: Boolean(body.checklistApplication),
      checklistFee: Boolean(body.checklistFee),
    };

    if (!values.licenseNumber) {
      return NextResponse.json(
        { error: "License number is required to generate ABT-6023." },
        { status: 400 },
      );
    }

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

    const page1 = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page1.drawText("STATE OF FLORIDA", {
      x: 54,
      y: 744,
      size: 10,
      font: bold,
      color: darkBlue,
    });
    page1.drawText("DEPARTMENT OF BUSINESS AND PROFESSIONAL REGULATION", {
      x: 54,
      y: 727,
      size: 10,
      font: bold,
      color: darkBlue,
    });
    page1.drawText("DIVISION OF ALCOHOLIC BEVERAGES AND TOBACCO", {
      x: 54,
      y: 710,
      size: 10,
      font: bold,
      color: darkBlue,
    });
    page1.drawText("DBPR ABT-6023", {
      x: 440,
      y: 744,
      size: 11,
      font: bold,
      color: black,
    });
    page1.drawText("02/2013", {
      x: 490,
      y: 727,
      size: 8,
      font,
      color: gray,
    });

    page1.drawRectangle({
      x: 54,
      y: 652,
      width: 504,
      height: 42,
      color: lightBlue,
      borderColor: darkBlue,
      borderWidth: 1,
    });
    page1.drawText("REQUEST FOR ALCOHOLIC BEVERAGE LICENSE LIEN SEARCH", {
      x: 72,
      y: 668,
      size: 14,
      font: bold,
      color: darkBlue,
    });

    let y = 625;
    y = drawWrapped(
      page1,
      "If you have any questions or need assistance in completing this request, please contact the Division of Alcoholic Beverages & Tobacco (AB&T) at (850) 488-8284. Please send your completed request by mail to:",
      font,
      9,
      54,
      y,
      504,
      12,
    );
    y -= 34;
    page1.drawText("Department of Business and Professional Regulation", { x: 86, y, size: 9, font: bold });
    page1.drawText("2601 Blair Stone Road", { x: 86, y: y - 14, size: 9, font });
    page1.drawText("Tallahassee, FL 32399-1021", { x: 86, y: y - 28, size: 9, font });

    y -= 70;
    page1.drawText("GENERAL INSTRUCTIONS", { x: 54, y, size: 10, font: bold, color: darkBlue });
    drawRule(page1, y - 5);
    y -= 24;
    drawWrapped(page1, "Please complete all information. All questions are applicable.", font, 9, 54, y, 504, 12);

    y -= 50;
    page1.drawText("REQUEST REQUIREMENTS", { x: 54, y, size: 10, font: bold, color: darkBlue });
    drawRule(page1, y - 5);
    y -= 24;
    drawWrapped(
      page1,
      "The request must be accompanied by a check in the amount of $20.00. Make checks payable to the Division of Alcoholic Beverages & Tobacco.",
      font,
      9,
      54,
      y,
      504,
      12,
    );

    y -= 62;
    page1.drawText("REQUEST CHECKLIST", { x: 54, y, size: 10, font: bold, color: darkBlue });
    drawRule(page1, y - 5);
    y -= 30;
    drawCheck(
      page1,
      values.checklistApplication,
      "Complete DBPR ABT-6023 Application for Alcoholic Beverage License Lien Search",
      font,
      bold,
      70,
      y,
      470,
    );
    y -= 42;
    drawCheck(
      page1,
      values.checklistFee,
      "Pay $20.00 fee (make check payable to the Division of Alcoholic Beverages & Tobacco)",
      font,
      bold,
      70,
      y,
      470,
    );
    addFooter(page1, font, 1);

    const page2 = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page2.drawText("STATE OF FLORIDA", { x: 54, y: 750, size: 10, font: bold, color: darkBlue });
    page2.drawText("DEPARTMENT OF BUSINESS AND PROFESSIONAL REGULATION", { x: 54, y: 733, size: 10, font: bold, color: darkBlue });
    page2.drawText("DBPR Form ABT-6023", { x: 438, y: 750, size: 10, font: bold });
    page2.drawText("02/2013", { x: 493, y: 733, size: 8, font, color: gray });
    page2.drawText("Division of Alcoholic Beverages and Tobacco", {
      x: 54,
      y: 708,
      size: 11,
      font: bold,
      color: darkBlue,
    });
    page2.drawText("Request for Alcoholic Beverage License Lien Search", {
      x: 54,
      y: 691,
      size: 13,
      font: bold,
      color: darkBlue,
    });

    page2.drawRectangle({
      x: 54,
      y: 646,
      width: 504,
      height: 28,
      color: darkBlue,
    });
    page2.drawText("SECTION 1 - REQUESTOR INFORMATION", {
      x: 64,
      y: 656,
      size: 10,
      font: bold,
      color: rgb(1, 1, 1),
    });

    drawLabel(page2, "Name of Requestor:", bold, 54, 628);
    drawValueBox(page2, values.requestorName, font, 150, 615, 408);

    drawLabel(page2, "Mailing Address:", bold, 54, 592);
    drawValueBox(page2, values.mailingAddress, font, 150, 579, 408);

    drawLabel(page2, "City:", bold, 54, 555);
    drawValueBox(page2, values.city, font, 90, 542, 235);
    drawLabel(page2, "State:", bold, 335, 555);
    drawValueBox(page2, values.state, font, 374, 542, 54);
    drawLabel(page2, "Zip Code:", bold, 438, 555);
    drawValueBox(page2, values.zip, font, 489, 542, 69);

    drawLabel(page2, "E-mail Address:", bold, 54, 518);
    drawValueBox(page2, values.email, font, 132, 505, 248);
    drawLabel(page2, "Telephone Number:", bold, 390, 518);
    drawValueBox(page2, values.telephone, font, 483, 505, 75, 19, 8.5);

    drawLabel(page2, "Ext.:", bold, 432, 486);
    drawValueBox(page2, values.telephoneExt, font, 461, 473, 97, 19, 8.5);

    drawLabel(page2, "Contact Person (if applicable):", bold, 54, 449);
    drawValueBox(page2, values.contactPerson, font, 191, 436, 367);

    drawLabel(page2, "Contact Telephone:", bold, 54, 412);
    drawValueBox(page2, values.contactTelephone, font, 148, 399, 165);
    drawLabel(page2, "Ext.:", bold, 326, 412);
    drawValueBox(page2, values.contactTelephoneExt, font, 355, 399, 60);
    drawLabel(page2, "Contact E-mail Address:", bold, 54, 376);
    drawValueBox(page2, values.contactEmail, font, 169, 363, 389);

    page2.drawRectangle({
      x: 54,
      y: 318,
      width: 504,
      height: 28,
      color: darkBlue,
    });
    page2.drawText("SECTION 2 - LICENSE INFORMATION", {
      x: 64,
      y: 328,
      size: 10,
      font: bold,
      color: rgb(1, 1, 1),
    });

    drawLabel(page2, "License number to be researched:", bold, 54, 296);
    drawValueBox(page2, values.licenseNumber, font, 216, 283, 342);

    drawLabel(page2, "Owner Name:", bold, 54, 259);
    drawValueBox(page2, values.ownerName, font, 122, 246, 436);

    drawLabel(page2, "Business Name (DBA):", bold, 54, 222);
    drawValueBox(page2, values.businessName, font, 166, 209, 392);

    page2.drawRectangle({
      x: 54,
      y: 164,
      width: 504,
      height: 28,
      color: darkBlue,
    });
    page2.drawText("SECTION 3 - PAYMENT INFORMATION", {
      x: 64,
      y: 174,
      size: 10,
      font: bold,
      color: rgb(1, 1, 1),
    });

    drawLabel(page2, "Check/Money Order Number:", bold, 54, 142);
    drawValueBox(page2, values.checkNumber, font, 190, 129, 368);

    drawLabel(page2, "Lien Account Number (If Applicable):", bold, 54, 105);
    drawValueBox(page2, values.lienAccountNumber, font, 225, 92, 333);

    page2.drawRectangle({
      x: 402,
      y: 48,
      width: 156,
      height: 28,
      borderColor: rgb(0.55, 0.55, 0.55),
      borderWidth: 0.7,
      color: rgb(0.97, 0.97, 0.97),
    });
    page2.drawText("DABT Received / Date Stamp", {
      x: 418,
      y: 59,
      size: 7.8,
      font: bold,
      color: gray,
    });

    addFooter(page2, font, 2);

    const bytes = await pdf.save({ useObjectStreams: false });
    const filename = `DBPR-ABT-6023-${values.licenseNumber.replace(/[^A-Z0-9-]/g, "-")}-completed.pdf`;
    const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Form-Source": "DBPR ABT-6023 (02/2013)",
        "X-FLLM-Official-Source":
          "https://www2.myfloridalicense.com/abt/documents/LienSearchRequestForm.pdf",
      },
    });
  } catch (error) {
    console.error("Could not generate completed ABT-6023", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The completed ABT-6023 could not be generated.",
      },
      { status: 500 },
    );
  }
}
