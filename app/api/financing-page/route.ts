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
  .fllm-financing-lien-card {margin:24px 0;padding:24px;border:1px solid rgba(124,239,255,.35);border-radius:12px;background:linear-gradient(145deg,#09222b,#03151d);color:#fff;box-shadow:0 12px 28px rgba(0,0,0,.18)}
  .fllm-financing-lien-card > span {display:block;color:#7cefff;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
  .fllm-financing-lien-card h2 {margin:7px 0 8px;color:#fff;font-size:25px;line-height:1.15}
  .fllm-financing-lien-card > p {margin:0;color:#c8d5de;font-size:13px;line-height:1.65}
  .fllm-financing-lien-points {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:18px 0}
  .fllm-financing-lien-points div {padding:13px 14px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:rgba(255,255,255,.035);color:#c8d5de;font-size:12px;line-height:1.5}
  .fllm-financing-lien-points strong {display:block;margin-bottom:3px;color:#7cefff;font-size:13px}
  .fllm-financing-lien-card > a {display:inline-flex;align-items:center;min-height:42px;padding:0 15px;border:1px solid #7cefff;border-radius:6px;color:#062027;background:linear-gradient(180deg,#8af4ff,#49d5e5);font-size:11px;font-weight:900;text-decoration:none;text-transform:uppercase}
  @media(max-width:760px){
    .fllm-financing-appraisal-card{grid-template-columns:92px 1fr;gap:12px;padding:14px}
    .fllm-financing-appraisal-card h2{font-size:20px}
    .fllm-financing-calculator-link{grid-template-columns:1fr}
    .fllm-financing-seo-links{grid-template-columns:1fr}
    .fllm-financing-lien-points{grid-template-columns:1fr}
  }
</style>`;

const OFFICIAL_FINANCING_SHELL_STYLES = `<style id="fllm-official-financing-shell-v1">
  .fllm-static-official-header{position:relative;z-index:10000;border-bottom:1px solid rgba(246,167,0,.58);background:#020b12;color:#fff;font-family:Arial,Helvetica,sans-serif}
  .fllm-static-header-shell{width:min(1240px,calc(100% - 40px));min-height:108px;margin:0 auto;display:flex;align-items:center;gap:18px}
  .fllm-static-brand{flex:0 0 184px;display:flex;align-items:center;text-decoration:none}.fllm-static-brand img{display:block;width:168.7125px;height:68.5075px;object-fit:contain}
  .fllm-static-nav{display:flex;align-items:center;justify-content:center;gap:34px;flex:1 1 auto}.fllm-static-nav-item{position:relative;display:flex;align-items:center;padding:16px 0}.fllm-static-nav-trigger{border:0;background:transparent;color:#fff;font:600 10px/1 Arial,Helvetica,sans-serif;text-transform:uppercase;cursor:pointer;padding:0;white-space:nowrap}.fllm-static-nav-item:hover>.fllm-static-nav-trigger,.fllm-static-nav-item:focus-within>.fllm-static-nav-trigger{color:#f6a700}
  .fllm-static-menu{position:absolute;top:calc(100% - 2px);left:50%;display:none;width:310px;padding:8px;transform:translateX(-50%);border:1px solid #f6a700;border-radius:7px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48);z-index:10020}.fllm-static-nav-item:hover>.fllm-static-menu,.fllm-static-nav-item:focus-within>.fllm-static-menu,.fllm-static-nav-item.is-open>.fllm-static-menu{display:grid;gap:4px}.fllm-static-menu:before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}.fllm-static-menu a{display:block;padding:12px 15px;border-radius:5px;color:#fff;text-decoration:none;font-size:14px;font-weight:700;line-height:1.25}.fllm-static-menu a:hover,.fllm-static-menu a:focus{background:rgba(246,167,0,.10);color:#f6a700;outline:none}.fllm-static-finance-menu{width:350px}.fllm-static-market-menu{width:370px}.fllm-static-resources-menu{width:390px}
  .fllm-static-actions{display:flex;align-items:center;gap:12px;flex:0 0 auto}.fllm-static-actions a{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 16px;border-radius:5px;text-decoration:none;text-transform:uppercase;font-size:11px;font-weight:900;white-space:nowrap;transition:transform .16s ease,filter .16s ease,box-shadow .16s ease}.fllm-static-contact{border:1px solid #f6a700;color:#f6a700;background:rgba(2,11,18,.72)}.fllm-static-contact:hover{background:linear-gradient(145deg,#ffc13b,#e69a00);color:#07101a;box-shadow:0 0 18px rgba(241,166,0,.45)}.fllm-static-list{border:1px solid #ffc12d;color:#07101a;background:linear-gradient(145deg,#ffbd21,#ef9000);box-shadow:inset 0 1px rgba(255,255,255,.35),0 8px 25px rgba(246,167,0,.14)}.fllm-static-list:hover{filter:brightness(1.08);transform:translateY(-1px)}
  .fllm-static-mobile-toggle{display:none;margin-left:auto;border:1px solid #f6a700;border-radius:5px;background:#061728;color:#f6a700;font-size:22px;line-height:1;padding:9px 11px}
  .fllm-static-official-footer{border-top:1px solid rgba(246,167,0,.55);background:#0d3558;color:#fff;font-family:Arial,Helvetica,sans-serif}.fllm-static-footer-main{width:min(1240px,calc(100% - 40px));min-height:112px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:28px}.fllm-static-footer-brand{display:flex;align-items:center;gap:16px}.fllm-static-footer-brand img{width:130px;height:auto;display:block}.fllm-static-footer-brand span{font-size:15px}.fllm-static-footer-nav{display:flex;flex-wrap:wrap;gap:26px}.fllm-static-footer-nav a{color:#fff;text-decoration:none;font-weight:800}.fllm-static-footer-nav a:hover{color:#f6a700}.fllm-static-footer-national{border-top:1px solid rgba(255,255,255,.18);min-height:52px;display:flex;align-items:center;justify-content:center;padding:0 20px;text-align:center}.fllm-static-footer-national a{color:#fff;text-decoration:none;font-weight:900}.fllm-static-footer-national a:hover{color:#f6a700}
  @media(max-width:1050px){.fllm-static-header-shell{min-height:92px}.fllm-static-brand{flex-basis:155px}.fllm-static-brand img{width:145px;height:auto}.fllm-static-nav{gap:18px}.fllm-static-actions a{padding:0 12px;font-size:10px}}
  @media(max-width:860px){.fllm-static-header-shell{flex-wrap:wrap;padding:12px 0}.fllm-static-mobile-toggle{display:block}.fllm-static-nav,.fllm-static-actions{display:none;width:100%}.fllm-static-official-header.is-open .fllm-static-nav,.fllm-static-official-header.is-open .fllm-static-actions{display:flex}.fllm-static-nav{flex-direction:column;align-items:stretch;gap:0}.fllm-static-nav-item{display:block;padding:0}.fllm-static-nav-trigger{width:100%;padding:13px 0;text-align:left}.fllm-static-menu{position:static;width:100%!important;transform:none;border:0;border-radius:0;box-shadow:none;padding:0 0 8px 12px}.fllm-static-menu:before{display:none}.fllm-static-actions{padding-top:8px}.fllm-static-footer-main{flex-direction:column;align-items:flex-start;padding:24px 0}.fllm-static-footer-nav{gap:16px}}
</style>`;

const OFFICIAL_FINANCING_HEADER = `<header class="fllm-static-official-header" id="fllm-static-official-header">
  <div class="fllm-static-header-shell">
    <a class="fllm-static-brand" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></a>
    <button class="fllm-static-mobile-toggle" id="fllm-static-mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav class="fllm-static-nav" aria-label="Primary navigation">
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Buy</button><div class="fllm-static-menu"><a href="/buy-florida-liquor-license">Buy a Florida Liquor License</a><a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a><a href="/counties">Florida County Markets</a><a href="/listings">View Listings</a><a href="/license-alerts">Get a License Alert</a><a href="/exchange">FLLM Exchange — Confidential Florida License Offers</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Sell</button><div class="fllm-static-menu"><a href="/brokers/list-your-license">BROKERS — Advertise a Client License</a><a href="/sell-your-license">Sell Your License</a><a href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</a><a href="/florida-liquor-license-value">Get a License Valuation</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Finance</button><div class="fllm-static-menu fllm-static-finance-menu"><a href="/how-to-finance-florida-liquor-license">How to Finance a Florida Liquor License</a><a href="/financing/loan-payment-calculator">Loan Payment Calculator</a><a href="/private-liquor-license-lenders">Private Lenders</a><a href="/financing#request-financing">Request Financing</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Invest</button><div class="fllm-static-menu"><a href="/investment-opportunities">Investment Opportunities</a><a href="/resources/florida-liquor-license-system">Quota License Ownership &amp; Investing</a><a href="/self-directed-ira-liquor-license-lending">Self-Directed IRA Lending</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Market Data</button><div class="fllm-static-menu fllm-static-market-menu"><a href="/market-data/exchange-board"><span style="color:#39cfee;font-weight:900;text-shadow:0 0 8px rgba(57,207,238,.14)">FLLM Exchange</span><span style="color:#fff"> Board</span></a><a href="/counties">Florida Market Data by County</a><a href="/florida-liquor-license-value">Florida Liquor License Value Estimator</a><a href="/florida-quota-liquor-license-cost">Florida Liquor License Cost by County</a><a href="/florida-quota-liquor-license-market-report">Florida Liquor License Market Insights</a><a href="/florida-liquor-license-news">Florida Liquor License News</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">License Types</button><div class="fllm-static-menu"><a href="/resources/florida-liquor-license-system">How Florida Liquor Licensing Works</a><a href="/resources/florida-liquor-license-types">Types of Florida Liquor Licenses</a><a href="/license-types/4cop-quota">4COP Quota License</a><a href="/license-types/3ps-package-store">3PS Quota / Package Store</a><a href="/license-types/2cop-beer-wine">2COP Beer &amp; Wine</a><a href="/license-types/4cop-sfs-restaurant">SRX / 4COP-SFS Restaurant</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Resources</button><div class="fllm-static-menu fllm-static-resources-menu"><a href="/free-guide">Free Buyer’s &amp; Seller’s Guide</a><a href="/resources">View All Resources</a><a href="/resources/application-center">Alcohol License Application Center</a><a href="/license-lookup">Florida Liquor License Lookup</a><a href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</a><a href="/resources/forms">Florida ABT Forms</a><a href="/resources/florida-department-of-revenue">Florida Department of Revenue (FDOR)</a><a href="/dbpr-abt-6002">ABT-6002 Transfer Guide</a></div></div>
    </nav>
    <div class="fllm-static-actions"><a class="fllm-static-contact" href="/contact">☎ Contact Us</a><a class="fllm-static-list" href="/sell-your-license">List Your License</a></div>
  </div>
</header>`;

const OFFICIAL_FINANCING_FOOTER = `<footer class="fllm-static-official-footer">
  <div class="fllm-static-footer-main">
    <div class="fllm-static-footer-brand"><a href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></a><span>© Florida Liquor License Market</span></div>
    <nav class="fllm-static-footer-nav" aria-label="Footer navigation"><a href="/">Home</a><a href="/florida-4cop-liquor-license-for-sale">4COP</a><a href="/florida-3ps-liquor-license-for-sale">3PS</a><a href="/listings">Listings</a><a href="/contact">Contact</a></nav>
  </div>
  <div class="fllm-static-footer-national"><a href="https://liquorlicensemarket.com/">Looking for a liquor license outside Florida? Visit Liquor License Market — The National Marketplace.</a></div>
</footer>`;

const OFFICIAL_FINANCING_MENU_SCRIPT = `<script id="fllm-static-official-menu-script">(function(){var h=document.getElementById('fllm-static-official-header');var t=document.getElementById('fllm-static-mobile-toggle');if(t&&h){t.addEventListener('click',function(){var open=h.classList.toggle('is-open');t.setAttribute('aria-expanded',open?'true':'false');});}document.querySelectorAll('.fllm-static-nav-trigger').forEach(function(b){b.addEventListener('click',function(e){if(window.innerWidth>860)return;var item=b.closest('.fllm-static-nav-item');if(!item)return;e.preventDefault();item.classList.toggle('is-open');});});})();</script>`;

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
    <a href="/sba-7a-liquor-license-business-financing#quota-license-lien-perfection"><strong>SBA Collateral &amp; Lien Controls</strong><small>Coordinate SBA underwriting with Florida license-specific diligence, recording and servicing controls.</small></a>
  </div>
</section>`;

const LIEN_CONTROL_CARD = `<section class="fllm-financing-lien-card" aria-label="Florida quota liquor license lien perfection">
  <span>Florida License Collateral Controls</span>
  <h2>Financing does not end at underwriting</h2>
  <p>A lender taking a Florida spirituous alcoholic-beverage license as collateral should build Division filing and servicing controls into the closing process.</p>
  <div class="fllm-financing-lien-points">
    <div><strong>ABT-6023 search</strong>Order the official Division lien search and reconcile existing interests before funding.</div>
    <div><strong>90-day recording</strong>Record the qualifying license lien or security interest with the Division using ABT-6022 within the statutory period.</div>
    <div><strong>Five-year duration</strong>Calendar expiration five years after recordation and the six-month renewal window.</div>
    <div><strong>Separate collateral filings</strong>Use the additional UCC, mortgage or asset filings lender counsel determines are appropriate for non-license collateral.</div>
  </div>
  <a href="/how-to-finance-florida-liquor-license#lien-perfection">Review the Lien Perfection Guide</a>
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
    /<header class="seller-header page-shell">[\s\S]*?<\/header>/,
    OFFICIAL_FINANCING_HEADER
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
    html = html.replace('<div class="seller-trust">', `${APPRAISAL_CARD}${CALCULATOR_LINK}${FINANCING_SEO_CLUSTER}${LIEN_CONTROL_CARD}<div class="seller-trust">`);
  }
  html = html.replace(
    '<form class="seller-form financing-form">',
    '<form class="seller-form financing-form" id="request-financing">'
  );
  if (!html.includes('class="fllm-static-official-footer"')) {
    html = html.replace("</body>", `${OFFICIAL_FINANCING_FOOTER}${OFFICIAL_FINANCING_MENU_SCRIPT}</body>`);
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
      html = html.replace("</head>", `${FINANCING_PAGE_STYLES}${OFFICIAL_FINANCING_SHELL_STYLES}</head>`);
    } else if (!html.includes('id="fllm-official-financing-shell-v1"')) {
      html = html.replace("</head>", `${OFFICIAL_FINANCING_SHELL_STYLES}</head>`);
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
