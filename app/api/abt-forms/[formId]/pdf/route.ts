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
    const officialResponse = await fetch(form.officialPdfUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/pdf",
        "User-Agent":
          "FloridaLiquorLicenseMarket/1.0 (+https://www.floridaliquorlicensemarket.com/resources/forms)",
      },
    });

    if (!officialResponse.ok) {
      throw new Error(`Official DBPR form returned ${officialResponse.status}.`);
    }

    const contentType = officialResponse.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("pdf")) {
      throw new Error("The official source did not return a PDF document.");
    }

    const bytes = await officialResponse.arrayBuffer();
    const download = new URL(request.url).searchParams.get("download") === "1";
    const filename = `${form.id.toUpperCase()}-official.pdf`;

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "private, max-age=0, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-FLLM-Official-Source": form.officialPdfUrl,
        "X-FLLM-Last-Verified": form.lastVerified,
      },
    });
  } catch (error) {
    console.error(`Could not retrieve ${form.formNumber}`, error);
    return NextResponse.json(
      {
        error:
          "The current official form could not be loaded at this moment. Please try again shortly.",
      },
      { status: 502 }
    );
  }
}
