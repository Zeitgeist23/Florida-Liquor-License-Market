import { promises as fs } from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SCALE = 612 / 1020;

export async function GET() {
  const sourcePath = path.join(process.cwd(), "public", "fllm-fillable-dr835.pdf");
  const sourceBytes = await fs.readFile(sourcePath);
  const pdfDoc = await PDFDocument.load(sourceBytes);
  const form = pdfDoc.getForm();

  // Section 1 taxpayer name/address field:
  // - true multiline entry
  // - room for four lines (entity, DBA, street, city/state/ZIP)
  // - slightly smaller text so longer addresses fit comfortably on each line
  const taxpayerField = form.getTextField("taxpayer_name_and_address");
  taxpayerField.enableMultiline();
  taxpayerField.setFontSize(6.5);

  const x = 61 * SCALE;
  const y = (1320 - 326) * SCALE;
  const width = (478 - 61) * SCALE;
  const height = (326 - 229) * SCALE;

  for (const widget of taxpayerField.acroField.getWidgets()) {
    widget.setRectangle({ x, y, width, height });
  }

  const output = await pdfDoc.save({ useObjectStreams: false });

  return new Response(output, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="fllm-fillable-dr835.pdf"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
