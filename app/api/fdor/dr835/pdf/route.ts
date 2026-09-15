import { promises as fs } from "fs";
import { join } from "path";
import { PDFDocument } from "pdf-lib";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const sourcePath = join(process.cwd(), "public", "fllm-fillable-dr835.pdf");
  const sourceBytes = await fs.readFile(sourcePath);
  const pdfDoc = await PDFDocument.load(sourceBytes);
  const form = pdfDoc.getForm();

  // Section 1 taxpayer name/address field:
  // allow four clean lines and reduce the fixed type size so longer
  // entity/DBA/address lines fit comfortably within the existing box.
  const taxpayerField = form.getTextField("taxpayer_name_and_address");
  taxpayerField.enableMultiline();
  taxpayerField.setFontSize(6.5);

  const output = await pdfDoc.save({ useObjectStreams: false });

  return new Response(Buffer.from(output), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="fllm-fillable-dr835.pdf"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
