import { promises as fs } from "fs";
import { join } from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type FieldRectangle = { x: number; y: number; width: number; height: number };

type AcroTextField = {
  getWidgets: () => Array<{ setRectangle: (rectangle: FieldRectangle) => void }>;
  setDefaultAppearance: (appearance: string) => void;
};

const FIELD_LAYOUT: Record<string, FieldRectangle> = {
  taxpayer_name_and_address: { x: 40.8, y: 600, width: 240, height: 50.4 },
  taxpayer_contact_person: { x: 290.4, y: 599.4, width: 126.6, height: 11.4 },
  taxpayer_telephone: { x: 507.6, y: 616.8, width: 65.4, height: 7.8 },
  taxpayer_fax: { x: 507.6, y: 597.6, width: 65.4, height: 9 },
  representative_1_telephone: { x: 507.6, y: 544.2, width: 65.4, height: 10.2 },
  representative_1_fax: { x: 507.6, y: 524.4, width: 65.4, height: 10.2 },
  representative_1_cell: { x: 507.6, y: 509.4, width: 65.4, height: 6.6 },
  representative_2_telephone: { x: 507.6, y: 481.2, width: 65.4, height: 10.2 },
  representative_2_fax: { x: 507.6, y: 461.4, width: 65.4, height: 10.2 },
  representative_2_cell: { x: 507.6, y: 446.4, width: 65.4, height: 6.6 },
  representative_3_telephone: { x: 507.6, y: 418.2, width: 65.4, height: 10.2 },
  representative_3_fax: { x: 507.6, y: 398.4, width: 65.4, height: 10.2 },
  representative_3_cell: { x: 507.6, y: 382.8, width: 65.4, height: 7.2 },
};

export async function GET() {
  const sourcePath = join(process.cwd(), "public", "fllm-fillable-dr835.pdf");
  const sourceBytes = await fs.readFile(sourcePath);
  const pdfDoc = await PDFDocument.load(sourceBytes);
  const form = pdfDoc.getForm();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // The original generated overlay baked a field border through this label.
  // Rebuild only this cell so the label and the fillable box are both clean.
  const firstPage = pdfDoc.getPage(0);
  firstPage.drawRectangle({
    x: 289.1,
    y: 598.2,
    width: 128.1,
    height: 31.8,
    color: rgb(1, 1, 1),
  });
  firstPage.drawLine({
    start: { x: 289.1, y: 630 },
    end: { x: 420.6, y: 630 },
    thickness: 0.6,
    color: rgb(0.08, 0.08, 0.08),
  });
  firstPage.drawText("Contact person", {
    x: 291.2,
    y: 617.4,
    size: 6.2,
    font: helvetica,
    color: rgb(0.08, 0.08, 0.08),
  });

  for (const [name, rectangle] of Object.entries(FIELD_LAYOUT)) {
    const field = form.getTextField(name);
    const acroField = (field as unknown as { acroField: AcroTextField }).acroField;
    for (const widget of acroField.getWidgets()) widget.setRectangle(rectangle);
    acroField.setDefaultAppearance("/Helv 7 Tf .05 .08 .11 rg");
    field.setFontSize(7);
    if (name === "taxpayer_contact_person") field.updateAppearances(helvetica);
  }

  // Five seven-point lines fit inside the taxpayer box without clipping.
  form.getTextField("taxpayer_name_and_address").enableMultiline();

  const output = await pdfDoc.save({ useObjectStreams: false });

  return new Response(Buffer.from(output), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="fllm-fillable-dr835.pdf"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
