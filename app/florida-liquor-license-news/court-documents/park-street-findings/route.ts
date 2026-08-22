import { PARK_STREET_FINDINGS_PAGES } from "@/data/court-documents/park-street-findings";

export const runtime = "nodejs";

function ascii(value: string) {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ");
}

function pdfEscape(value: string) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapLine(line: string, max = 100) {
  const output: string[] = [];
  let remaining = ascii(line).replace(/\t/g, "    ").replace(/\s+$/g, "");
  if (!remaining) return [""];

  while (remaining.length > max) {
    let cut = remaining.lastIndexOf(" ", max);
    if (cut < 20) cut = max;
    output.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut).trimStart();
  }
  output.push(remaining);
  return output;
}

function pageContent(source: string, pageNumber: number, pageCount: number) {
  const lines = source.split(/\r?\n/).flatMap((line) => wrapLine(line));
  const fontSize = lines.length > 70 ? 6.3 : 6.8;
  const leading = lines.length > 70 ? 7.8 : 8.5;
  const body = lines
    .map((line) => `(${pdfEscape(line)}) Tj T*`)
    .join("\n");

  return [
    "q",
    "0.024 0.090 0.157 rg",
    "0 748 612 44 re f",
    "Q",
    "BT",
    "/F2 8.5 Tf",
    "0.965 0.654 0 rg",
    "40 769 Td",
    "(FLORIDA LIQUOR LICENSE MARKET - COURT DECISIONS & LITIGATION) Tj",
    "ET",
    "BT",
    `/F1 ${fontSize} Tf`,
    "0.08 0.12 0.16 rg",
    `42 724 Td`,
    `${leading} TL`,
    body,
    "ET",
    "BT",
    "/F2 7 Tf",
    "0.35 0.39 0.43 rg",
    "42 30 Td",
    `(FLLM READER COPY   |   PAGE ${pageNumber} OF ${pageCount}) Tj`,
    "ET",
  ].join("\n");
}

function buildPdf() {
  const pages = [...PARK_STREET_FINDINGS_PAGES];
  const objects: string[] = [];
  const pageIds = pages.map((_, index) => 5 + index * 2);

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Count ${pages.length} /Kids [ ${pageIds
    .map((id) => `${id} 0 R`)
    .join(" ")} ] >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  pages.forEach((page, index) => {
    const pageId = 5 + index * 2;
    const contentId = pageId + 1;
    const content = pageContent(page, index + 1, pages.length);
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });

  let pdf = "%PDF-1.4\n%FLLM\n";
  const offsets: number[] = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";
  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return new TextEncoder().encode(pdf);
}

export async function GET(request: Request) {
  const bytes = buildPdf();
  const download = new URL(request.url).searchParams.get("download") === "1";

  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(bytes.byteLength),
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="FLLM-Park-Street-Trust-Findings.pdf"`,
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
