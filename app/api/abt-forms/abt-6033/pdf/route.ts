import { NextResponse } from "next/server";

import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const form = getAbtForm("abt-6033");
  if (!form) return NextResponse.json({ error: "ABT-6033 is not configured." }, { status: 404 });

  try {
    const response = await fetch(form.officialPdfUrl, {
      cache: "no-store",
      headers: { "User-Agent": "FloridaLiquorLicenseMarket/1.0" },
    });

    if (!response.ok) {
      throw new Error(`DBPR returned ${response.status}`);
    }

    const bytes = await response.arrayBuffer();
    const download = new URL(request.url).searchParams.get("download") === "1";

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="ABT-6033-official.pdf"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error("Could not load the current DBPR ABT-6033", error);
    return NextResponse.json(
      { error: "The current DBPR ABT-6033 could not be loaded. Use the official DBPR entry link on this page." },
      { status: 503 }
    );
  }
}
