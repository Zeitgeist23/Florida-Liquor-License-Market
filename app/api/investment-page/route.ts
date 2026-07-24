export const dynamic = "force-dynamic";

const INVESTMENT_PAGE_STYLES = `<style id="investment-logo-match-contact-v5">
  .contact-page.investment-page > .seller-header {
    align-items: center !important;
  }
  .contact-page.investment-page > .seller-header > .seller-brand {
    align-self: stretch !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    transform: translateY(11px) !important;
  }
  .contact-page.investment-page > .seller-header > .seller-brand img {
    display: block !important;
    width: 71.25% !important;
    height: auto !important;
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .investment-page .seller-trust {
    display: flex !important;
    align-items: center !important;
  }
  .investment-page .seller-trust > img {
    align-self: center !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
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
    html = html.replace(
      '<main class="seller-page investment-page">',
      '<main class="seller-page contact-page investment-page">',
    );

    if (!html.includes('id="investment-logo-match-contact-v5"')) {
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
