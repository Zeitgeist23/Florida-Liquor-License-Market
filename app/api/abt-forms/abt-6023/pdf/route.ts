import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const form = getAbtForm("abt-6023");
  if (!form) {
    return NextResponse.json({ error: "ABT-6023 is not configured." }, { status: 404 });
  }

  try {
    const localPdfPath = path.join(
      process.cwd(),
      "public",
      "abt-forms",
      "abt-6023.pdf"
    );
    const pdfBytes = await readFile(localPdfPath);
    const body = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer;
    const download = new URL(request.url).searchParams.get("download") === "1";

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="ABT-6023-interactive.pdf"`,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error("Could not load local ABT-6023 PDF", error);
    return NextResponse.json(
      { error: "The interactive ABT-6023 form could not be loaded at this moment." },
      { status: 503 }
    );
  }
}
