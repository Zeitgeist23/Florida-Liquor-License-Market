import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const form = getAbtForm("abt-6023");
  if (!form) {
    return Response.json({ error: "ABT-6023 is not configured." }, { status: 404 });
  }

  const requestUrl = new URL(request.url);
  const download = requestUrl.searchParams.get("download") === "1";

  try {
    const upstream = await fetch(form.officialPdfUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/pdf,*/*;q=0.8",
        "User-Agent": "FloridaLiquorLicenseMarket/1.0",
      },
    });

    if (!upstream.ok) {
      throw new Error(`DBPR returned ${upstream.status}`);
    }

    const pdfBytes = await upstream.arrayBuffer();
    const signature = new Uint8Array(pdfBytes, 0, Math.min(pdfBytes.byteLength, 5));
    const startsWithPdf =
      signature.length >= 5 &&
      signature[0] === 0x25 &&
      signature[1] === 0x50 &&
      signature[2] === 0x44 &&
      signature[3] === 0x46 &&
      signature[4] === 0x2d;

    if (!startsWithPdf) {
      throw new Error("DBPR response was not a PDF");
    }

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="ABT-6023.pdf"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error("Could not proxy official ABT-6023 PDF", error);

    // If DBPR temporarily blocks server-side retrieval, let the browser open the
    // official public PDF directly rather than leaving a broken embedded viewer.
    return Response.redirect(form.officialPdfUrl, 307);
  }
}
