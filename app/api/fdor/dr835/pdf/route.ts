import { PDFDocument, StandardFonts } from "pdf-lib";

import { FLLM_DR835_BASE64 } from "@/lib/generated/fllm-dr835-base64";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const sourcePdf = Buffer.from(FLLM_DR835_BASE64, "base64");
  const url = new URL(request.url);

  const requestedDesignation = (url.searchParams.get("designation") || "").trim().toLowerCase();
  const designation = /^[a-f]$/.test(requestedDesignation) ? requestedDesignation : "";
  const jurisdiction = (url.searchParams.get("jurisdiction") || "").trim().slice(0, 80);

  let pdf = sourcePdf;

  // Preserve the standard blank FLLM DR-835 unless a caller explicitly asks
  // for representative-declaration prefills. This keeps the public form
  // neutral while allowing a transaction-specific copy to carry the correct
  // Part II designation and jurisdiction values.
  if (designation || jurisdiction) {
    const document = await PDFDocument.load(sourcePdf);
    const form = document.getForm();

    if (designation) {
      form.getTextField("declaration_1_designation").setText(designation);
    }
    if (jurisdiction) {
      form.getTextField("declaration_1_jurisdiction").setText(jurisdiction);
    }

    const font = await document.embedFont(StandardFonts.Helvetica);
    form.updateFieldAppearances(font);
    pdf = Buffer.from(await document.save());
  }

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="FLLM-Fillable-DR-835.pdf"',
      "Content-Length": String(pdf.byteLength),
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
