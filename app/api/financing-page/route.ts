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
  .fllm-financing-appraisal-card img {
    display:block;
    width:100%;
    border:1px solid rgba(241,166,0,.45);
    border-radius:7px;
    box-shadow:0 8px 18px rgba(0,0,0,.28);
  }
  .fllm-financing-appraisal-card span {
    display:block;
    margin-bottom:5px;
    color:#f6a700;
    font-size:10px;
    font-weight:900;
    letter-spacing:.08em;
    text-transform:uppercase;
  }
  .fllm-financing-appraisal-card h2 {
    margin:0 0 8px;
    color:#fff;
    font-size:24px;
    line-height:1.15;
  }
  .fllm-financing-appraisal-card p {
    margin:0 0 13px;
    color:#d5e0e8;
    font-size:13px;
    line-height:1.6;
  }
  .fllm-financing-appraisal-card a {
    display:inline-flex;
    align-items:center;
    min-height:42px;
    padding:0 15px;
    border:1px solid #f6a700;
    border-radius:5px;
    color:#07111a;
    background:linear-gradient(145deg,#ffbd21,#ef9000);
    font-size:11px;
    font-weight:900;
    text-decoration:none;
    text-transform:uppercase;
  }
  @media(max-width:760px){
    .fllm-financing-appraisal-card{grid-template-columns:92px 1fr;gap:12px;padding:14px}
    .fllm-financing-appraisal-card h2{font-size:20px}
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

  html = html.replace(
    '<div class="seller-intro financing-intro">',
    '<div class="seller-intro financing-intro" id="how-to-finance">'
  );
  html = html.replace(
    '<article><h2>Access to Private Lenders</h2>',
    '<article id="private-lenders"><h2>Access to Private Lenders</h2>'
  );
  if (!html.includes("fllm-financing-appraisal-card")) {
    html = html.replace('<div class="seller-trust">', `${APPRAISAL_CARD}<div class="seller-trust">`);
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
