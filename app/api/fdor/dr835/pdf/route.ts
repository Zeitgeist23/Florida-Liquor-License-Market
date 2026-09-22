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
  taxpayer_telephone: { x: 482, y: 615.2, width: 91, height: 7.8 },
  taxpayer_fax: { x: 474, y: 595.6, width: 99, height: 9 },
  representative_1_telephone: { x: 482, y: 545.4, width: 91, height: 10.2 },
  representative_1_fax: { x: 474, y: 524.4, width: 99, height: 10.2 },
  representative_1_cell: { x: 482, y: 505.2, width: 91, height: 10.2 },
  representative_2_telephone: { x: 482, y: 486, width: 91, height: 10.2 },
  representative_2_fax: { x: 474, y: 468.6, width: 99, height: 10.2 },
  representative_2_cell: { x: 482, y: 442.2, width: 91, height: 10.2 },
  representative_3_telephone: { x: 482, y: 419.4, width: 91, height: 10.2 },
  representative_3_fax: { x: 474, y: 398.4, width: 99, height: 10.2 },
  representative_3_cell: { x: 482, y: 378.6, width: 91, height: 10.2 },
  reemployment_agent_number: { x: 492, y: 211.2, width: 81, height: 7.2 },
  reemployment_federal_id: { x: 492, y: 192.2, width: 81, height: 7.2 },
  reemployment_telephone: { x: 492, y: 173.2, width: 81, height: 7.2 },
};

const CHECKBOX_LAYOUT: Record<string, FieldRectangle> = {
  mail_type_primary: { x: 294, y: 153, width: 7.8, height: 7.8 },
  mail_type_reporting: { x: 351, y: 153, width: 7.8, height: 7.8 },
  mail_type_rate: { x: 414.6, y: 153, width: 7.8, height: 7.8 },
  mail_type_claim: { x: 460.2, y: 153, width: 7.8, height: 7.8 },
};

const CHECKBOX_MASKS: FieldRectangle[] = [
  { x: 289, y: 151.5, width: 18.8, height: 10.8 },
  { x: 346, y: 151.5, width: 17.2, height: 10.8 },
  { x: 409.6, y: 151.5, width: 16.6, height: 10.8 },
  { x: 455.2, y: 151.5, width: 15.6, height: 10.8 },
];

const CONTACT_FIELD_NAMES = Object.keys(FIELD_LAYOUT).filter(
  (name) => name.endsWith("_telephone") || name.endsWith("_fax") || name.endsWith("_cell"),
);

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

  // The source PDF contains printed phone-format lines and punctuation beneath
  // these widgets. Mask the complete entry area before drawing wider widgets so
  // no old left edge, parenthesis, slash, or field fragment remains visible.
  for (const name of CONTACT_FIELD_NAMES) {
    const rectangle = FIELD_LAYOUT[name];
    firstPage.drawRectangle({
      x: rectangle.x - 6,
      y: rectangle.y - 6,
      width: rectangle.width + 7,
      height: rectangle.height + 12,
      color: rgb(1, 1, 1),
    });
  }

  // Remove the printed checkbox outlines and their tiny reference numbers;
  // the interactive checkbox widgets are redrawn over these clean areas.
  for (const rectangle of CHECKBOX_MASKS) {
    firstPage.drawRectangle({
      ...rectangle,
      color: rgb(1, 1, 1),
    });
  }

  // Cover the old lower-positioned Section 4 widgets before placing the
  // corrected, vertically centered replacements.
  for (const rectangle of [
    { x: 485, y: 202.5, width: 88, height: 17.5 },
    { x: 485, y: 183.5, width: 88, height: 17.5 },
    { x: 485, y: 164, width: 88, height: 18 },
  ]) {
    firstPage.drawRectangle({ ...rectangle, color: rgb(1, 1, 1) });
  }

  // Restore the representative-row dividers up to the aligned cell-phone
  // widgets after masking the source phone-format artwork.
  for (const y of [505.2, 442.2, 378.6]) {
    firstPage.drawLine({
      start: { x: 420.6, y },
      end: { x: 482, y },
      thickness: 0.6,
      color: rgb(0.08, 0.08, 0.08),
    });
  }

  for (const [name, rectangle] of Object.entries(FIELD_LAYOUT)) {
    const field = form.getTextField(name);
    const acroField = (field as unknown as { acroField: AcroTextField }).acroField;
    for (const widget of acroField.getWidgets()) widget.setRectangle(rectangle);
    acroField.setDefaultAppearance("/Helv 7 Tf .05 .08 .11 rg");
    field.setFontSize(7);
    if (name !== "taxpayer_name_and_address") field.updateAppearances(helvetica);
  }

  for (const [name, rectangle] of Object.entries(CHECKBOX_LAYOUT)) {
    const field = form.getCheckBox(name);
    const acroField = (field as unknown as { acroField: AcroTextField }).acroField;
    for (const widget of acroField.getWidgets()) widget.setRectangle(rectangle);
    field.updateAppearances();
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
