import { NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  evaluateAppraisalQc,
  type QcItem,
} from "@/lib/appraisal-methodology";
import {
  getAppraisalCase,
  latestLienSearchForAppraisal,
  type AppraisalCase,
  type AppraisalComparable,
} from "@/lib/appraisal-case-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const navy = rgb(0.02, 0.10, 0.18);
const gold = rgb(0.78, 0.52, 0.03);
const cyan = rgb(0.05, 0.55, 0.68);
const dark = rgb(0.09, 0.15, 0.20);
const gray = rgb(0.38, 0.43, 0.47);
const light = rgb(0.94, 0.96, 0.97);
const green = rgb(0.11, 0.43, 0.26);
const red = rgb(0.62, 0.15, 0.15);

type LienRow = Record<string, unknown> | null;

function money(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "Not determined";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function dateLabel(value: string | null | undefined) {
  if (!value) return "Not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width) line = next;
    else {
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
  width: number,
  lineHeight = size * 1.35,
  color = dark,
) {
  const lines = wrap(text, font, size, width);
  lines.forEach((line, index) => {
    page.drawText(line, { x, y: y - index * lineHeight, size, font, color });
  });
  return y - Math.max(0, lines.length - 1) * lineHeight;
}

function addHeader(page: PDFPage, bold: PDFFont, font: PDFFont, title: string, caseRef: string) {
  page.drawRectangle({ x: 0, y: 742, width: 612, height: 50, color: navy });
  page.drawText("FLORIDA LIQUOR LICENSE MARKET", {
    x: 42,
    y: 766,
    size: 10,
    font: bold,
    color: rgb(1, 1, 1),
  });
  page.drawText(title, { x: 42, y: 748, size: 8, font, color: rgb(0.82, 0.86, 0.89) });
  page.drawText(caseRef, { x: 430, y: 758, size: 8, font: bold, color: rgb(0.96, 0.70, 0.12) });
}

function addFooter(page: PDFPage, font: PDFFont, pageNo: number, revision: number) {
  page.drawLine({
    start: { x: 42, y: 35 },
    end: { x: 570, y: 35 },
    thickness: 0.7,
    color: rgb(0.75, 0.78, 0.80),
  });
  page.drawText("FLLM Formal Florida Quota Liquor License Appraisal", {
    x: 42,
    y: 20,
    size: 7,
    font,
    color: gray,
  });
  page.drawText(`Revision ${revision} · Page ${pageNo}`, {
    x: 480,
    y: 20,
    size: 7,
    font,
    color: gray,
  });
}

function sectionTitle(page: PDFPage, bold: PDFFont, text: string, y: number) {
  page.drawText(text, { x: 42, y, size: 13, font: bold, color: navy });
  page.drawLine({
    start: { x: 42, y: y - 6 },
    end: { x: 570, y: y - 6 },
    thickness: 1.5,
    color: gold,
  });
  return y - 24;
}

function metric(page: PDFPage, font: PDFFont, bold: PDFFont, label: string, value: string, x: number, y: number, width: number) {
  page.drawRectangle({
    x,
    y: y - 42,
    width,
    height: 42,
    borderColor: rgb(0.80, 0.83, 0.85),
    borderWidth: 0.7,
    color: light,
  });
  page.drawText(label.toUpperCase(), { x: x + 8, y: y - 14, size: 6.8, font: bold, color: gold });
  const display = value.length > 38 ? value.slice(0, 37) + "…" : value;
  page.drawText(display, { x: x + 8, y: y - 31, size: 9, font: bold, color: navy });
}

function lienFilings(lien: LienRow) {
  const result = lien?.ucc_result && typeof lien.ucc_result === "object"
    ? (lien.ucc_result as Record<string, unknown>)
    : {};
  const searches = Array.isArray(result.searches)
    ? (result.searches as Array<Record<string, unknown>>)
    : [];
  return searches.flatMap((search) => {
    const payload = search.payload && typeof search.payload === "object"
      ? (search.payload as Record<string, unknown>)
      : {};
    return Array.isArray(payload.filings)
      ? (payload.filings as Array<Record<string, unknown>>)
      : [];
  });
}

function snapshotCase(appraisalCase: AppraisalCase) {
  const issued = appraisalCase.issuedSnapshot;
  if (
    appraisalCase.status === "ISSUED" &&
    issued &&
    typeof issued.appraisalCase === "object" &&
    issued.appraisalCase
  ) {
    return issued.appraisalCase as unknown as AppraisalCase;
  }
  return appraisalCase;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const storedCase = await getAppraisalCase(id);
    if (!storedCase) return NextResponse.json({ error: "Appraisal case not found." }, { status: 404 });
    if (!["APPROVED", "ISSUED"].includes(storedCase.status)) {
      return NextResponse.json({ error: "Approve the appraisal before generating the formal report." }, { status: 409 });
    }

    const appraisalCase = snapshotCase(storedCase);
    const lienSearch = storedCase.status === "ISSUED"
      && storedCase.issuedSnapshot
      && typeof storedCase.issuedSnapshot.lienSearch === "object"
      ? (storedCase.issuedSnapshot.lienSearch as Record<string, unknown>)
      : await latestLienSearchForAppraisal(storedCase.caseRef);
    const qc = storedCase.status === "ISSUED"
      && storedCase.issuedSnapshot
      && typeof storedCase.issuedSnapshot.qc === "object"
      ? (storedCase.issuedSnapshot.qc as { items?: QcItem[]; passed?: number; total?: number })
      : evaluateAppraisalQc(appraisalCase, lienSearch);

    const pdf = await PDFDocument.create();
    pdf.setTitle(`${appraisalCase.caseRef} Formal Liquor License Appraisal`);
    pdf.setAuthor("Florida Liquor License Market");
    pdf.setSubject("Florida quota liquor license appraisal");
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

    const revision = storedCase.revision || 1;

    const cover = pdf.addPage([612, 792]);
    cover.drawRectangle({ x: 0, y: 0, width: 612, height: 792, color: navy });
    cover.drawRectangle({ x: 0, y: 0, width: 612, height: 15, color: gold });
    cover.drawText("FLORIDA LIQUOR LICENSE MARKET", {
      x: 48,
      y: 690,
      size: 12,
      font: bold,
      color: rgb(1, 1, 1),
    });
    cover.drawText("FORMAL QUOTA LIQUOR LICENSE APPRAISAL", {
      x: 48,
      y: 628,
      size: 25,
      font: bold,
      color: rgb(1, 1, 1),
    });
    cover.drawText(appraisalCase.licenseNumber, {
      x: 48,
      y: 570,
      size: 28,
      font: bold,
      color: rgb(0.96, 0.70, 0.12),
    });
    cover.drawText(appraisalCase.dba || appraisalCase.ownerName || "Subject License", {
      x: 48,
      y: 538,
      size: 16,
      font: bold,
      color: rgb(0.88, 0.92, 0.95),
    });
    cover.drawText(`${appraisalCase.county || "Florida"} · ${appraisalCase.licenseType || appraisalCase.series || ""}`, {
      x: 48,
      y: 514,
      size: 11,
      font,
      color: rgb(0.78, 0.84, 0.88),
    });
    cover.drawText("FINAL OPINION OF VALUE", {
      x: 48,
      y: 430,
      size: 9,
      font: bold,
      color: cyan,
    });
    cover.drawText(money(appraisalCase.finalValue), {
      x: 48,
      y: 390,
      size: 30,
      font: bold,
      color: rgb(1, 1, 1),
    });
    cover.drawText(`Effective date: ${dateLabel(appraisalCase.effectiveDate)}`, {
      x: 48,
      y: 350,
      size: 10,
      font,
      color: rgb(0.80, 0.86, 0.89),
    });
    cover.drawText(`Client: ${appraisalCase.clientName || "Not stated"}`, {
      x: 48,
      y: 330,
      size: 10,
      font,
      color: rgb(0.80, 0.86, 0.89),
    });
    cover.drawText(`Intended use: ${appraisalCase.intendedUse || "Not stated"}`, {
      x: 48,
      y: 310,
      size: 10,
      font,
      color: rgb(0.80, 0.86, 0.89),
    });
    cover.drawText(`Methodology: ${appraisalCase.methodologyVersion}`, {
      x: 48,
      y: 290,
      size: 9,
      font,
      color: rgb(0.68, 0.76, 0.81),
    });
    cover.drawText(appraisalCase.caseRef, {
      x: 48,
      y: 80,
      size: 9,
      font: bold,
      color: rgb(0.96, 0.70, 0.12),
    });

    const p2 = pdf.addPage([612, 792]);
    addHeader(p2, bold, font, "Executive Summary & Subject Identification", appraisalCase.caseRef);
    addFooter(p2, font, 2, revision);
    let y = 715;
    y = sectionTitle(p2, bold, "Executive Summary", y);
    metric(p2, font, bold, "Final Value", money(appraisalCase.finalValue), 42, y, 165);
    metric(p2, font, bold, "Automated Indication", money(appraisalCase.automatedValue), 218, y, 165);
    metric(p2, font, bold, "Reviewer Adjustment", money(appraisalCase.reviewerAdjustment), 394, y, 176);
    y -= 66;
    y = drawWrapped(
      p2,
      appraisalCase.automatedValueBasis || "The indicated value was reconciled from the reviewer-included comparable evidence.",
      font,
      9,
      42,
      y,
      528,
      13,
    );
    y -= 24;
    y = sectionTitle(p2, bold, "Subject License", y);
    metric(p2, font, bold, "License Number", appraisalCase.licenseNumber, 42, y, 165);
    metric(p2, font, bold, "Series", appraisalCase.series || "Not stated", 218, y, 165);
    metric(p2, font, bold, "County", appraisalCase.county || "Not stated", 394, y, 176);
    y -= 58;
    metric(p2, font, bold, "Owner of Record", appraisalCase.ownerName || "Not stated", 42, y, 253);
    metric(p2, font, bold, "DBA", appraisalCase.dba || "Not stated", 306, y, 264);
    y -= 62;
    metric(p2, font, bold, "DBPR Primary Status", appraisalCase.primaryStatus || "Not stated", 42, y, 253);
    metric(p2, font, bold, "DBPR Secondary Status", appraisalCase.secondaryStatus || "Not stated", 306, y, 264);
    y -= 70;
    y = sectionTitle(p2, bold, "Purpose and Intended Use", y);
    y = drawWrapped(
      p2,
      `This appraisal was prepared for ${appraisalCase.clientName || "the identified client"} for ${appraisalCase.intendedUse || "the stated intended use"}. ${appraisalCase.institutionName ? `Institution: ${appraisalCase.institutionName}. ` : ""}The effective date is ${dateLabel(appraisalCase.effectiveDate)}.`,
      font,
      9,
      42,
      y,
      528,
      13,
    );

    const p3 = pdf.addPage([612, 792]);
    addHeader(p3, bold, font, "Regulatory & Encumbrance Research", appraisalCase.caseRef);
    addFooter(p3, font, 3, revision);
    y = 715;
    y = sectionTitle(p3, bold, "DBPR Verification", y);
    y = drawWrapped(
      p3,
      `FLLM verified the subject against the Florida DBPR alcoholic-beverage public extract on ${dateLabel(appraisalCase.dbprVerifiedAt)}. The public record identified ${appraisalCase.ownerName || "the stated owner"} as owner of record, ${appraisalCase.series || "the stated series"} in ${appraisalCase.county || "the stated county"}, with primary status ${appraisalCase.primaryStatus || "not stated"} and secondary status ${appraisalCase.secondaryStatus || "not stated"}.`,
      font,
      9,
      42,
      y,
      528,
      13,
    );
    y -= 28;
    y = sectionTitle(p3, bold, "Lien & Encumbrance Research", y);
    const uccStatus = String(lienSearch?.ucc_status || lienSearch?.uccStatus || "not recorded").replaceAll("_", " ");
    const abtStatus = String(lienSearch?.abt_status || lienSearch?.abtStatus || "not recorded").replaceAll("_", " ");
    metric(p3, font, bold, "Florida UCC", uccStatus.toUpperCase(), 42, y, 253);
    metric(p3, font, bold, "Official ABT-6023", abtStatus.toUpperCase(), 306, y, 264);
    y -= 66;
    const filings = lienFilings(lienSearch);
    if (!filings.length) {
      y = drawWrapped(p3, "No UCC filing detail was retained in the workfile snapshot.", font, 9, 42, y, 528, 13);
    } else {
      p3.drawText("UCC FILINGS IDENTIFIED", { x: 42, y, size: 8, font: bold, color: gold });
      y -= 17;
      for (const filing of filings.slice(0, 10)) {
        const filingNumber = String(filing.filing_number || filing.filingNumber || "Filing");
        const filingDate = String(filing.filing_date || filing.filingDate || "");
        const parties = Array.isArray(filing.secured_parties)
          ? (filing.secured_parties as unknown[]).join(", ")
          : String(filing.secured_party || "");
        p3.drawText(`${filingNumber}${filingDate ? ` · ${filingDate}` : ""}`, {
          x: 48,
          y,
          size: 8.7,
          font: bold,
          color: navy,
        });
        y -= 13;
        y = drawWrapped(p3, `Secured party: ${parties || "Not returned"}`, font, 8.2, 58, y, 500, 11);
        y -= 12;
        if (y < 70) break;
      }
    }
    y -= 18;
    y = drawWrapped(
      p3,
      "UCC research is debtor-level secured-transaction diligence and is not, by itself, an official certification that the alcoholic-beverage license is free of recorded ABT liens. The official ABT-6023 result is tracked separately in the workfile.",
      font,
      8.5,
      42,
      Math.max(y, 105),
      528,
      12,
      gray,
    );

    const p4 = pdf.addPage([612, 792]);
    addHeader(p4, bold, font, "Comparable Evidence & Valuation", appraisalCase.caseRef);
    addFooter(p4, font, 4, revision);
    y = 715;
    y = sectionTitle(p4, bold, "Comparable Evidence", y);
    const included = appraisalCase.comparables.filter((item) => item.included);
    p4.drawText("Tier", { x: 42, y, size: 7.5, font: bold, color: gray });
    p4.drawText("Reference", { x: 75, y, size: 7.5, font: bold, color: gray });
    p4.drawText("County / Type", { x: 210, y, size: 7.5, font: bold, color: gray });
    p4.drawText("Price", { x: 480, y, size: 7.5, font: bold, color: gray });
    y -= 12;
    p4.drawLine({ start: { x: 42, y }, end: { x: 570, y }, thickness: 0.7, color: gray });
    y -= 16;
    included.slice(0, 18).forEach((comp: AppraisalComparable) => {
      p4.drawText(comp.tier, { x: 47, y, size: 8, font: bold, color: gold });
      p4.drawText(comp.reference.slice(0, 22), { x: 75, y, size: 8, font, color: dark });
      const countyType = `${comp.county.replace(/ County$/i, "")} · ${comp.licenseType}`;
      p4.drawText(countyType.slice(0, 43), { x: 210, y, size: 8, font, color: dark });
      p4.drawText(money(comp.price), { x: 480, y, size: 8, font: bold, color: navy });
      y -= 18;
    });
    if (!included.length) {
      p4.drawText("No included comparable evidence.", { x: 42, y, size: 9, font, color: gray });
      y -= 20;
    }
    y -= 20;
    y = sectionTitle(p4, bold, "Valuation Reconciliation", y);
    metric(p4, font, bold, "Automated Indication", money(appraisalCase.automatedValue), 42, y, 165);
    metric(p4, font, bold, "Reviewer Adjustment", money(appraisalCase.reviewerAdjustment), 218, y, 165);
    metric(p4, font, bold, "Final Opinion", money(appraisalCase.finalValue), 394, y, 176);
    y -= 65;
    if (appraisalCase.adjustmentReason) {
      y = drawWrapped(p4, `Adjustment rationale: ${appraisalCase.adjustmentReason}`, font, 9, 42, y, 528, 13);
      y -= 18;
    }
    if (appraisalCase.reviewerNotes) {
      y = drawWrapped(p4, `Reviewer reconciliation: ${appraisalCase.reviewerNotes}`, font, 9, 42, y, 528, 13);
    }

    const p5 = pdf.addPage([612, 792]);
    addHeader(p5, bold, font, "Methodology, Quality Control & Limiting Conditions", appraisalCase.caseRef);
    addFooter(p5, font, 5, revision);
    y = 715;
    y = sectionTitle(p5, bold, `Methodology — ${appraisalCase.methodologyVersion}`, y);
    y = drawWrapped(
      p5,
      "FLLM applies a fixed evidence hierarchy. Tier A is verified closed-transaction evidence when available. Tier B is same-county, same-series active asking-price evidence. Tier C is same-county alternate quota-series evidence. Tier D is statewide same-series supplemental market evidence. The automated indication is the median of reviewer-included comparable prices. The reviewer may apply a supported adjustment; any non-zero adjustment requires a written rationale.",
      font,
      8.8,
      42,
      y,
      528,
      12.5,
    );
    y -= 25;
    y = sectionTitle(p5, bold, "Quality-Control Record", y);
    const qcItems = Array.isArray(qc.items) ? qc.items : [];
    qcItems.forEach((item) => {
      if (y < 220) return;
      const passed = Boolean(item.passed);
      p5.drawText(passed ? "PASS" : "FAIL", {
        x: 42,
        y,
        size: 7.5,
        font: bold,
        color: passed ? green : red,
      });
      p5.drawText(String(item.label || "").slice(0, 60), {
        x: 82,
        y,
        size: 8.2,
        font: bold,
        color: dark,
      });
      y -= 12;
      y = drawWrapped(p5, String(item.detail || ""), font, 7.7, 82, y, 475, 10.5, gray);
      y -= 11;
    });
    y = Math.min(y - 10, 190);
    y = sectionTitle(p5, bold, "Assumptions & Limiting Conditions", y);
    const limits = [
      "This report is a valuation opinion for the stated intended use and effective date; it is not a legal title opinion, tax opinion, or guarantee of transfer approval.",
      "DBPR status, UCC filings, ABT lien records, asking prices and other public records can change after the effective date.",
      "Advertised asking prices are not equivalent to verified closed sale prices. Their use is disclosed and reconciled according to the methodology version shown in this report.",
      "Any lien, litigation, tax, zoning, qualification, ownership or transfer issue should be reviewed by the appropriate legal, regulatory or tax professional.",
    ];
    limits.forEach((limit) => {
      y = drawWrapped(p5, `• ${limit}`, font, 7.8, 48, y, 510, 10.8, gray);
      y -= 9;
    });

    const bytes = await pdf.save({ useObjectStreams: false });
    const filename = `${appraisalCase.caseRef}-Formal-Appraisal-R${revision}.pdf`;
    const body = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not generate appraisal report." },
      { status: 500 },
    );
  }
}
