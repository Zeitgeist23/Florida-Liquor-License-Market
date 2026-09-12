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
  .fllm-financing-appraisal-card {
    display:grid;
    grid-template-columns:150px 1fr;
    gap:18px;
    align-items:center;
    margin:22px 0 18px;
    padding:18px;
    border:1px solid rgba(241,166,0,.58);
    border-radius:10px;
    background:linear-gradient(145deg,#0a2237,#04111c);
    box-shadow:0 12px 28px rgba(0,0,0,.2);
  }
  .fllm-financing-appraisal-card img {display:block;width:100%;border:1px solid rgba(241,166,0,.45);border-radius:7px;box-shadow:0 8px 18px rgba(0,0,0,.28)}
  .fllm-financing-appraisal-card span {display:block;margin-bottom:5px;color:#f6a700;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
  .fllm-financing-appraisal-card h2 {margin:0 0 8px;color:#fff;font-size:24px;line-height:1.15}
  .fllm-financing-appraisal-card p {margin:0 0 13px;color:#d5e0e8;font-size:13px;line-height:1.6}
  .fllm-financing-appraisal-card a {display:inline-flex;align-items:center;min-height:42px;padding:0 15px;border:1px solid #f6a700;border-radius:5px;color:#07111a;background:linear-gradient(145deg,#ffbd21,#ef9000);font-size:11px;font-weight:900;text-decoration:none;text-transform:uppercase}
  .fllm-financing-calculator-link {display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;margin:18px 0;padding:17px 18px;border:1px solid rgba(124,239,255,.35);border-radius:10px;background:linear-gradient(145deg,#09222b,#03151d);box-shadow:0 12px 28px rgba(0,0,0,.18),0 0 28px rgba(70,210,229,.08)}
  .fllm-financing-calculator-link span {display:block;margin-bottom:4px;color:#7cefff;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
  .fllm-financing-calculator-link h2 {margin:0 0 5px;color:#fff;font-size:22px}
  .fllm-financing-calculator-link p {margin:0;color:#c9d8de;font-size:12px;line-height:1.55}
  .fllm-financing-calculator-link a {display:inline-flex;align-items:center;min-height:42px;padding:0 15px;border:1px solid #7cefff;border-radius:6px;color:#062027;background:linear-gradient(180deg,#8af4ff,#49d5e5);font-size:11px;font-weight:900;text-decoration:none;text-transform:uppercase;white-space:nowrap}
  .fllm-financing-seo-cluster {margin:24px 0;padding:24px;border:1px solid rgba(246,167,0,.34);border-radius:12px;background:linear-gradient(145deg,#071c2e,#04111c);color:#fff}
  .fllm-financing-seo-cluster > span {display:block;color:#f6a700;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
  .fllm-financing-seo-cluster h2 {margin:7px 0 8px;color:#fff;font-size:25px;line-height:1.15}
  .fllm-financing-seo-cluster > p {margin:0;color:#c8d5de;font-size:13px;line-height:1.65}
  .fllm-financing-seo-links {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:18px}
  .fllm-financing-seo-links a {display:block;padding:14px 15px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:rgba(255,255,255,.035);color:#fff;text-decoration:none}
  .fllm-financing-seo-links strong {display:block;margin-bottom:4px;color:#f6b51f;font-size:13px}
  .fllm-financing-seo-links small {display:block;color:#b9c8d3;font-size:11px;line-height:1.5}
  @media(max-width:760px){
    .fllm-financing-appraisal-card{grid-template-columns:92px 1fr;gap:12px;padding:14px}
    .fllm-financing-appraisal-card h2{font-size:20px}
    .fllm-financing-calculator-link{grid-template-columns:1fr}
    .fllm-financing-seo-links{grid-template-columns:1fr}
  }
</style>`;

const APPRAISAL_CARD = `<section class="fllm-financing-appraisal-card" aria-label="FLLM formal liquor license appraisal">
  <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal Florida quota liquor license appraisal report" />
  <div>
    <span>Professional License Valuation</span>
    <h2>Need a lender-ready value?</h2>
    <p>Order a formal FLLM liquor license appraisal supported by county market evidence, comparable listings and regulatory research. The one-time appraisal fee is $495.</p>
    <a href="/florida-liquor-license-appraisal#order-form">Order Appraisal — $495</a>
  </div>
</section>`;

const CALCULATOR_LINK = `<section class="fllm-financing-calculator-link" aria-label="Florida liquor license loan payment calculator">
  <div>
    <span>Interactive Financing Tool</span>
    <h2>Estimate a liquor-license loan payment</h2>
    <p>Model purchase or refinance payments, compare interest rates and review loan and Section 197 amortization schedules on the dedicated calculator page.</p>
  </div>
  <a href="/financing/loan-payment-calculator">Open Loan Calculator</a>
</section>`;

const FINANCING_SEO_CLUSTER = `<section class="fllm-financing-seo-cluster" aria-label="Florida liquor license financing resources">
  <span>Florida Liquor License Financing Resources</span>
  <h2>Plan the purchase, financing and valuation together</h2>
  <p>FLLM connects financing research directly to current Florida liquor licenses for sale, county market data and appraisal resources so buyers can evaluate the license, the required equity and the proposed debt service in one workflow.</p>
  <div class="fllm-financing-seo-links">
    <a href="/listings"><strong>Florida Liquor Licenses for Sale</strong><small>Browse current 4COP and 3PS inventory by county and asking price.</small></a>
    <a href="/finance-a-license"><strong>Finance a Florida Liquor License</strong><small>Review purchase financing, refinance paths and common underwriting considerations.</small></a>
    <a href="/how-to-finance-florida-liquor-license"><strong>How to Finance a Florida Liquor License</strong><small>Use the detailed FLLM guide to understand collateral value, structure and lender review.</small></a>
    <a href="/florida-liquor-license-appraisal"><strong>Florida Liquor License Appraisal</strong><small>Establish a supported market value before structuring a purchase or refinance.</small></a>
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
    '<meta name="description" content="Explore Florida liquor license financing for qualifying 4COP and 3PS purchases and refinances. Review private lenders, payments, appraisal and underwriting considerations."/>'
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\/>/,
    '<meta property="og:title" content="Florida Liquor License Financing | 4COP &amp; 3PS"/>'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\/>/,
    '<meta property="og:description" content="Financing resources for qualifying Florida 4COP and 3PS liquor-license purchases and refinances."/>'
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\/>/,
    '<meta name="twitter:title" content="Florida Liquor License Financing | 4COP &amp; 3PS"/>'
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\/>/,
    '<meta name="twitter:description" content="Financing resources for qualifying Florida 4COP and 3PS liquor-license purchases and refinances."/>'
  );
  html = html.replace(
    "<h1>Florida Liquor License Financing for 4COP &amp; 3PS Licenses</h1>",
    "<h1>Florida Liquor License Financing for 4COP &amp; 3PS Licenses</h1>"
  );
  html = html.replace(
    "<h1>Private Financing for Florida Quota Licenses</h1>",
    "<h1>Florida Liquor License Financing for 4COP &amp; 3PS Licenses</h1>"
  );
  html = html.replace(
    "<p>Explore private financing for the purchase or refinance of a Florida 4COP or 3PS quota liquor license. Specialized private lenders may consider license value, county, down payment or equity, transaction structure, and borrower qualifications.</p>",
    "<p>Explore Florida liquor license financing for the purchase or refinance of qualifying 4COP and 3PS quota licenses. Specialized private lenders may evaluate license value, county, down payment or equity, transaction structure, collateral and borrower qualifications.</p>"
  );
  html = html.replace(
    "<p>For buyers acquiring a Florida quota liquor license and current owners considering a refinance, specialized private lenders may evaluate license value, county, down payment or equity, transaction structure, and borrower qualifications.</p>",
    "<p>Explore Florida liquor license financing for the purchase or refinance of qualifying 4COP and 3PS quota licenses. Specialized private lenders may evaluate license value, county, down payment or equity, transaction structure, collateral and borrower qualifications.</p>"
  );

  html = html.replace(
    '<div class="seller-intro financing-intro">',
    '<div class="seller-intro financing-intro" id="how-to-finance">'
  );
  html = html.replace(
    '<article><h2>Access to Private Lenders</h2>',
    '<article id="private-lenders"><h2>Access to Private Lenders</h2>'
  );
  if (!html.includes("fllm-financing-appraisal-card")) {
    html = html.replace('<div class="seller-trust">', `${APPRAISAL_CARD}${CALCULATOR_LINK}${FINANCING_SEO_CLUSTER}<div class="seller-trust">`);
  }
  html = html.replace(
    '<form class="seller-form financing-form">',
    '<form class="seller-form financing-form" id="request-financing">'
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
