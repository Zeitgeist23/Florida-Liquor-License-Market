import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ formId: string }> }
) {
  const { formId } = await context.params;
  const form = getAbtForm(formId.toLowerCase());

  if (!form) {
    return NextResponse.json({ error: "Unknown Florida ABT form." }, { status: 404 });
  }

  try {
    const localPdfPath = path.join(process.cwd(), "public", "abt-forms", `${form.id}.pdf`);
    const pdfBytes = await readFile(localPdfPath);
    const body = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer;
    const download = new URL(request.url).searchParams.get("download") === "1";
    const filename = `${form.id.toUpperCase()}-official.pdf`;

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error(`Could not read the verified local copy of ${form.formNumber}`, error);
    return NextResponse.json(
      {
        error:
          "The current official form could not be loaded at this moment. Please try again shortly.",
      },
      { status: 503 }
    );
  }
}
