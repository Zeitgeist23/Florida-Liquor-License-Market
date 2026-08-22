import { NextResponse } from "next/server";

import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FALLBACK_PDF_URL =
  "https://www2.myfloridalicense.com/abt/forms/documents/abt-6033QuotaLicenseDrawingEntryFormoriginal.pdf";

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
  Accept: "application/pdf,application/octet-stream;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Referer:
    "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/forms-and-publications/",
};

function looksLikePdf(bytes: Uint8Array) {
  return bytes.length >= 5
    && bytes[0] === 0x25
    && bytes[1] === 0x50
    && bytes[2] === 0x44
    && bytes[3] === 0x46
    && bytes[4] === 0x2d;
}

export async function GET(request: Request) {
  const form = getAbtForm("abt-6033");
  if (!form) {
    return NextResponse.json({ error: "ABT-6033 is not configured." }, { status: 404 });
  }

  const candidateUrls = Array.from(new Set([form.officialPdfUrl, FALLBACK_PDF_URL]));
  let lastError = "No DBPR source was attempted.";

  for (const sourceUrl of candidateUrls) {
    try {
      const response = await fetch(sourceUrl, {
        cache: "no-store",
        redirect: "follow",
        headers: REQUEST_HEADERS,
      });

      if (!response.ok) {
        lastError = `DBPR returned ${response.status} for ${sourceUrl}`;
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const contentType = response.headers.get("content-type") || "";

      if (!looksLikePdf(bytes) && !contentType.toLowerCase().includes("pdf")) {
        lastError = `DBPR returned a non-PDF response for ${sourceUrl}`;
        continue;
      }

      const download = new URL(request.url).searchParams.get("download") === "1";

      return new Response(arrayBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Length": String(bytes.byteLength),
          "Content-Disposition": `${download ? "attachment" : "inline"}; filename="ABT-6033-official.pdf"`,
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          "X-Content-Type-Options": "nosniff",
          "X-FLLM-Official-Source": sourceUrl,
          "X-FLLM-Last-Verified": form.lastVerified,
        },
      });
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  console.error("Could not load the current DBPR ABT-6033", lastError);
  return NextResponse.json(
    {
      error:
        "The current DBPR ABT-6033 could not be loaded through FLLM at this moment. Please use the official PDF viewer link below.",
    },
    { status: 503 }
  );
}
