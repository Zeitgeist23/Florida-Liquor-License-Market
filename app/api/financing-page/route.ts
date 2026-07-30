export const dynamic = "force-dynamic";

const FINANCING_PAGE_STYLES = `<style id="financing-logo-match-investment-v1">
  .financing-page > .seller-header {
    align-items: center !important;
  }
  .financing-page > .seller-header > .seller-brand {
    align-self: stretch !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    transform: translateY(11px) !important;
  }
  .financing-page > .seller-header > .seller-brand img {
    display: block !important;
    width: 71.25% !important;
    height: auto !important;
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
</style>`;

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/financing/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Financing page source returned ${sourceResponse.status}`);
    }

    let html = await sourceResponse.text();
    if (!html.includes('id="financing-logo-match-investment-v1"')) {
      html = html.replace("</head>", `${FINANCING_PAGE_STYLES}</head>`);
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Financing page enhancement failed", error);
    return Response.redirect(new URL("/financing/index.html", request.url), 307);
  }
}
