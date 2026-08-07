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

function optimizeFinancingHtml(input: string): string {
  let html = input;

  html = html.replace(
    /<title>[^<]*<\/title>/,
    "<title>Florida Liquor License Financing | Purchase &amp; Refinance</title>"
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"\/>/,
    '<meta name="description" content="Explore private financing for Florida quota liquor-license purchases and refinances. Financing is available as a supporting service for qualifying 4COP and 3PS transactions."/>'
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\/>/,
    '<meta property="og:title" content="Florida Liquor License Financing | Purchase &amp; Refinance"/>'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\/>/,
    '<meta property="og:description" content="Private financing for qualifying Florida quota liquor-license purchases and refinances."/>'
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\/>/,
    '<meta name="twitter:title" content="Florida Liquor License Financing | Purchase &amp; Refinance"/>'
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\/>/,
    '<meta name="twitter:description" content="Private financing for qualifying Florida quota liquor-license purchases and refinances."/>'
  );
  html = html.replace(
    "<h1>Florida Liquor License Financing for 4COP &amp; 3PS Licenses</h1>",
    "<h1>Private Financing for Florida Quota Licenses</h1>"
  );
  html = html.replace(
    "<p>Explore private financing for the purchase or refinance of a Florida 4COP or 3PS quota liquor license. Specialized private lenders may consider license value, county, down payment or equity, transaction structure, and borrower qualifications.</p>",
    "<p>For buyers acquiring a Florida quota liquor license and current owners considering a refinance, specialized private lenders may evaluate license value, county, down payment or equity, transaction structure, and borrower qualifications.</p>"
  );

  return html;
}

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/financing/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Financing page source returned ${sourceResponse.status}`);
    }

    let html = optimizeFinancingHtml(await sourceResponse.text());
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
