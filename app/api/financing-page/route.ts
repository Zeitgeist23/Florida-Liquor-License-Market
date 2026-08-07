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
  .financing-seo-guide {
    margin-top: 26px;
    padding: 22px 24px;
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 16px;
    background: rgba(7,19,30,.46);
  }
  .financing-seo-guide h2 {
    margin: 0 0 10px;
  }
  .financing-seo-guide p {
    margin: 0 0 14px;
  }
  .financing-seo-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 14px;
  }
  .financing-seo-links a {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>`;

const FINANCING_SEO_SECTION = `<section class="financing-seo-guide" aria-label="Florida liquor license financing guide">
  <h2>Florida Liquor License Financing for 4COP and 3PS Licenses</h2>
  <p>Florida Liquor License Market helps buyers and current license owners explore private financing for transferable Florida quota liquor licenses. Requests may involve a 4COP quota license purchase, a 3PS package-store license purchase, or refinancing of an existing quota license, subject to lender underwriting and transaction-specific terms.</p>
  <p>Financing requests are reviewed by county because quota-license values and market conditions vary across Florida. Buyers can browse current license inventory before requesting financing, and sellers or owners can submit refinance information confidentially.</p>
  <div class="financing-seo-links">
    <a href="/listings">Browse Florida liquor licenses for sale</a>
    <a href="/counties/duval">Duval County liquor licenses</a>
    <a href="/counties/palm-beach">Palm Beach County liquor licenses</a>
    <a href="/counties/hillsborough">Hillsborough County liquor licenses</a>
    <a href="/counties/orange">Orange County liquor licenses</a>
  </div>
</section>`;

function optimizeFinancingHtml(input: string): string {
  let html = input;

  html = html.replace(
    /<title>[^<]*<\/title>/,
    "<title>Florida Liquor License Financing | 4COP &amp; 3PS Loans</title>"
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"\/>/,
    '<meta name="description" content="Explore private financing for Florida 4COP and 3PS quota liquor license purchases and refinances across all 67 counties. Confidential requests subject to lender underwriting."/>'
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\/>/,
    '<meta property="og:title" content="Florida Liquor License Financing | 4COP &amp; 3PS Loans"/>'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\/>/,
    '<meta property="og:description" content="Private financing for Florida 4COP and 3PS quota liquor license purchases and refinances across all 67 counties."/>'
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\/>/,
    '<meta name="twitter:title" content="Florida Liquor License Financing | 4COP &amp; 3PS Loans"/>'
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\/>/,
    '<meta name="twitter:description" content="Private financing for Florida 4COP and 3PS quota liquor license purchases and refinances across all 67 counties."/>'
  );
  html = html.replace(
    "<h1>Private Financing for Quota Licenses</h1>",
    "<h1>Florida Liquor License Financing for 4COP &amp; 3PS Licenses</h1>"
  );
  html = html.replace(
    "<p>Traditional banks generally do not finance a Florida quota liquor license as a stand-alone asset. Purchases and refinances are often funded by specialized private lenders familiar with quota-license values, transfers, and collateral requirements.</p>",
    "<p>Explore private financing for the purchase or refinance of a Florida 4COP or 3PS quota liquor license. Specialized private lenders may consider license value, county, down payment or equity, transaction structure, and borrower qualifications.</p>"
  );

  if (!html.includes("financing-seo-guide")) {
    html = html.replace(
      '<div class="seller-trust">',
      `${FINANCING_SEO_SECTION}<div class="seller-trust">`
    );
  }

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
