export const dynamic = "force-dynamic";

const INVESTMENT_PAGE_STYLES = `<style id="investment-logo-match-contact-v1">
  .investment-page > .seller-header > .seller-brand img {
    width: 71.25% !important;
    height: auto !important;
  }
</style>`;

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/investment-opportunities/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Investment page source returned ${sourceResponse.status}`);
    }

    let html = await sourceResponse.text();
    if (!html.includes('id="investment-logo-match-contact-v1"')) {
      html = html.replace("</head>", `${INVESTMENT_PAGE_STYLES}</head>`);
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Investment page enhancement failed", error);
    return Response.redirect(new URL("/investment-opportunities/index.html", request.url), 307);
  }
}
