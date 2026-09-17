import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CONTACT_PAGE_STYLES = `<style id="contact-page-enhancements-v3">
  .contact-careers-entry{display:inline-flex;align-items:center;gap:8px;width:fit-content;margin-top:12px;color:#d7e2ea;font-size:14px;line-height:1.4;text-decoration:none}
  .contact-careers-entry strong{color:#f5a400;font-weight:800}
  .contact-careers-entry:hover strong,.contact-careers-entry:focus-visible strong{text-decoration:underline}
  .contact-license-context{margin:2px 0 20px;padding:18px;border:1px solid rgba(246,167,0,.72);border-left:4px solid #f6a700;border-radius:6px;color:#f8fafc;background:linear-gradient(145deg,rgba(10,34,55,.98),rgba(4,18,30,.98));box-shadow:0 12px 30px rgba(0,0,0,.22)}
  .contact-license-context-heading>span{display:block;margin-bottom:6px;color:#f6a700;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
  .contact-license-context-heading h3{margin:0;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:22px;line-height:1.2}
  .contact-license-context-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:15px}
  .contact-license-context-grid>div{min-width:0;padding:10px 11px;border:1px solid rgba(255,255,255,.12);border-radius:4px;background:rgba(2,11,18,.62)}
  .contact-license-context-grid span{display:block;margin-bottom:5px;color:#aebbc5;font-size:9px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}
  .contact-license-context-grid strong{display:block;color:#fff;font-size:13px;line-height:1.35;overflow-wrap:anywhere}
  .contact-license-context p{margin:14px 0 0;color:#cbd5dc;font-size:12px;line-height:1.55}
  .contact-license-context>a{display:inline-flex;margin-top:11px;color:#f6a700;font-size:11px;font-weight:900;text-decoration:none}
  .contact-license-context>a:hover,.contact-license-context>a:focus-visible{text-decoration:underline}
  @media(max-width:620px){.contact-license-context-grid{grid-template-columns:1fr}.contact-license-context-heading h3{font-size:19px}}
</style>`;

const CONTACT_CONTEXT_SCRIPT = '<script src="/assets/contact-listing-context.js?v=4" defer></script>';
const OFFICIAL_SHELL_STYLES = '<link rel="stylesheet" href="/assets/contact-official-shell.css?v=13"/>';
const OFFICIAL_SHELL_SCRIPT = '<script src="/assets/contact-official-shell.js?v=10" defer></script>';

const OFFICIAL_HEADER = `<header class="site-header forms-site-header page-shell fllm-official-contact-header">
  <a class="brand-lockup" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market"/></a>
  <button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  <nav class="primary-nav" aria-label="Primary navigation">
    <div class="native-nav-dropdown" data-nav-menu="buy"><button class="native-nav-trigger" type="button" aria-haspopup="menu" aria-expanded="false"><span>Buy</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/></button><div class="native-nav-menu native-nav-menu-standard native-nav-buy-menu" role="menu" aria-label="Buy menu"><a href="/buy-florida-liquor-license" role="menuitem">Buy a Florida Liquor License</a><a href="/listings" role="menuitem">View Listings</a><a href="/how-to-buy-florida-liquor-license" role="menuitem">How to Buy a Florida Liquor License</a><a href="/counties" role="menuitem">Florida County Markets</a><a href="/license-alerts" role="menuitem">Get a License Alert</a><a href="/exchange" role="menuitem">FLLM Exchange — Confidential Florida License Offers</a></div></div>
    <div class="native-nav-dropdown" data-nav-menu="sell"><button class="native-nav-trigger" type="button" aria-haspopup="menu" aria-expanded="false"><span>Sell</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/></button><div class="native-nav-menu native-nav-menu-standard native-nav-sell-menu" role="menu" aria-label="Sell menu"><a href="/brokers/list-your-license" role="menuitem">BROKERS — List a Client License</a><a href="/sell-your-license" role="menuitem">Sell Your License</a><a href="/how-to-sell-florida-liquor-license" role="menuitem">How to Sell a Florida Liquor License</a><a href="/florida-liquor-license-value" role="menuitem">Get a License Valuation</a></div></div>
    <div class="native-nav-dropdown" data-nav-menu="finance"><button class="native-nav-trigger" type="button" aria-haspopup="menu" aria-expanded="false"><span>Finance</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/></button><div class="native-nav-menu native-nav-menu-standard native-nav-finance-menu" role="menu" aria-label="Finance menu"><a href="/how-to-finance-florida-liquor-license" role="menuitem">How to Finance a Florida Liquor License</a><a href="/financing/loan-payment-calculator" role="menuitem">Loan Payment Calculator</a><a href="/private-liquor-license-lenders" role="menuitem">Private Lenders</a><a href="/financing#request-financing" role="menuitem">Request Financing</a></div></div>
    <div class="native-nav-dropdown" data-nav-menu="invest"><button class="native-nav-trigger" type="button" aria-haspopup="menu" aria-expanded="false"><span>Invest</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/></button><div class="native-nav-menu native-nav-menu-standard" role="menu" aria-label="Invest menu"><a href="/investment-opportunities" role="menuitem">Investment Opportunities</a><a href="/resources/florida-liquor-license-system" role="menuitem">Quota License Ownership &amp; Investing</a><a href="/self-directed-ira-liquor-license-lending" role="menuitem">Self-Directed IRA Lending</a></div></div>
    <div class="native-nav-dropdown" data-nav-menu="market-data"><button class="native-nav-trigger" type="button" aria-haspopup="menu" aria-expanded="false"><span>Market Data</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/></button><div class="native-nav-menu native-nav-menu-standard native-nav-market-menu" role="menu" aria-label="Market Data menu"><a href="/market-data/exchange-board"><span class="native-market-label">FLLM Exchange Board</span><span class="native-market-badge">EXCHANGE</span></a><a href="/counties"><span class="native-market-label">Florida Market Data by County</span></a><a href="/florida-liquor-license-value"><span class="native-market-label">Florida Liquor License Value Estimator</span><span class="native-market-badge">VALUE</span></a><a href="/florida-quota-liquor-license-cost"><span class="native-market-label">Florida Liquor License Cost by County</span></a><a href="/listings?status=sold"><span class="native-market-label">Recent Florida Transactions</span><span class="native-market-badge">SALES</span></a><a href="/florida-quota-liquor-license-market-report"><span class="native-market-label">Florida Market Insights</span></a><a href="/florida-liquor-license-lottery"><span class="native-market-label">Quota Lottery Entry</span><span class="native-market-badge">LOTTERY</span></a><a href="/florida-liquor-license-news"><span class="native-market-label">News &amp; Insights</span></a><a href="/#market-data"><span class="native-market-label">Florida Market Heat Map</span><span class="native-market-badge">MAP</span></a></div></div>
    <div class="native-nav-dropdown native-nav-license-types" data-nav-menu="license-types"><button class="native-nav-trigger" type="button" aria-haspopup="menu" aria-expanded="false"><span>License Types</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/></button><div class="native-nav-menu native-license-types-menu" role="menu" aria-label="License Types menu"><div class="native-license-types-column"><strong>Start Here</strong><a href="/resources/florida-liquor-license-system">How Florida Liquor Licensing Works</a><a href="/resources/florida-liquor-license-types">Types of Florida Liquor Licenses</a><a href="/resources/florida-liquor-license-types#population-rule-title">Quota License Requirements</a></div><div class="native-license-types-column"><strong>Quota Licenses</strong><a href="/license-types/4cop-quota">4COP Quota License</a><a href="/license-types/3ps-package-store">3PS Quota / Package Store</a><a href="/resources/florida-liquor-license-types#five-to-eight-cop">5COP-8COP Quota Licenses</a></div><div class="native-license-types-column"><strong>Other License Types</strong><a href="/license-types/2cop-beer-wine">2COP Beer &amp; Wine</a><a href="/license-types/4cop-sfs-restaurant">SRX / 4COP-SFS Restaurant</a><a href="/license-types/mobile-bars-catered-events">Mobile Liquor License</a></div></div></div>
    <div class="native-nav-dropdown" data-nav-menu="resources"><button class="native-nav-trigger" type="button" aria-haspopup="menu" aria-expanded="false"><span>Resources</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/></button><div class="native-nav-menu native-nav-menu-standard native-nav-resources-menu" role="menu" aria-label="Resources menu"><a href="/free-guide">Free Buyer’s &amp; Seller’s Guide</a><a href="/resources">View All Resources</a><a href="/resources/application-center">Alcohol License Application Center</a><a href="https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup" target="_blank" rel="noopener noreferrer">Florida Liquor License Lookup</a><a href="/florida-liquor-license-value">Florida Liquor License Value Estimator</a><a href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</a><a href="/resources/florida-division-alcoholic-beverages-tobacco">Florida Division of Alcoholic Beverages &amp; Tobacco</a><a href="/resources/forms">Florida ABT Forms</a><a href="/resources/license-fees">License Fees &amp; Annual Renewals</a><a href="/resources/quota-transfer-fee-calculator">Quota License Transfer Fee Calculator</a><a href="/resources/florida-department-of-revenue">Florida Department of Revenue (FDOR)</a><a href="/resources/liquor-license-attorneys">Liquor License Attorneys</a><a href="/dbpr-abt-6002">ABT-6002 Transfer Guide</a><a href="/transaction-services">FLLM Transaction Services</a><a href="/florida-liquor-license-court-decisions">Court Decisions &amp; Case Law</a></div></div>
  </nav>
  <div class="header-actions"><a class="btn btn-outline fllm-header-contact-cta" href="/contact"><span class="contact-phone" aria-hidden="true">☎</span>Contact Us</a><div class="fllm-contact-list-wrap"><a class="btn btn-gold fllm-header-list-cta" href="/sell-your-license#listing-options">List Your License</a><div class="fllm-contact-list-menu" aria-label="List your license options"><a href="/sell-your-license?method=self#listing-options">Self-Directed Seller</a><a href="/sell-your-license#broker-assistance">Request Broker Help</a><a href="/brokers/list-your-license">For Brokers — List a Client License</a></div></div></div>
</header>`;

const OFFICIAL_FOOTER = `<footer class="directory-footer sell-license-page-footer official-directory-footer fllm-official-contact-footer">
  <div class="directory-shell">
    <div class="directory-footer-brand">
      <a href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width="130" height="53"/></a>
      <span>© Florida Liquor License Market</span>
    </div>
    <nav aria-label="Footer navigation">
      <a href="/">Home</a>
      <a href="/florida-4cop-liquor-license-for-sale">4COP</a>
      <a href="/florida-3ps-liquor-license-for-sale">3PS</a>
      <a href="/listings">Listings</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
  <div class="national-marketplace-footer-link" data-national-marketplace-footer-link="true">
    <span>Looking for a liquor license outside Florida?</span>
    <a href="https://liquorlicensemarket.com/" aria-label="Visit Liquor License Market, the national marketplace">Visit Liquor License Market — The National Marketplace.</a>
  </div>
</footer>`;

const CAREERS_ENTRY = '<a class="contact-careers-entry" href="/careers"><span>Interested in joining FLLM?</span><strong>View Careers →</strong></a>';

function applyOfficialShell(html: string) {
  let enhanced = html;
  enhanced = enhanced.replace(/<header class="seller-header page-shell">[\s\S]*?<\/header>/, OFFICIAL_HEADER);
  if (!enhanced.includes('class="fllm-official-contact-footer"')) {
    enhanced = enhanced.replace("</main>", `</main>${OFFICIAL_FOOTER}`);
  }
  if (!enhanced.includes("contact-official-shell.css")) enhanced = enhanced.replace("</head>", `${OFFICIAL_SHELL_STYLES}</head>`);
  if (!enhanced.includes('id="contact-page-enhancements-v3"')) enhanced = enhanced.replace("</head>", `${CONTACT_PAGE_STYLES}</head>`);
  if (!enhanced.includes("contact-listing-context.js")) enhanced = enhanced.replace("</head>", `${CONTACT_CONTEXT_SCRIPT}</head>`);
  if (!enhanced.includes("contact-official-shell.js")) enhanced = enhanced.replace("</body>", `${OFFICIAL_SHELL_SCRIPT}</body>`);
  return enhanced;
}

function addCareersEntryPoint(html: string) {
  if (html.includes('class="contact-careers-entry"')) return html;
  const marker = '<span class="contact-direct-link">Use the secure form to contact us directly.</span>';
  return html.replace(marker, `${marker}${CAREERS_ENTRY}`);
}

async function loadContactSource(request: Request) {
  const sourcePath = path.join(process.cwd(), "public", "contact", "index.html");
  try {
    return await readFile(sourcePath, "utf8");
  } catch (fileError) {
    const sourceUrl = new URL("/contact/index.html", request.url);
    sourceUrl.searchParams.set("fllm_raw", "1");
    const response = await fetch(sourceUrl, {
      cache: "no-store",
      headers: { "x-fllm-contact-source": "1" },
    });
    if (!response.ok) throw fileError;
    return await response.text();
  }
}

function applyCareersMode(html: string) {
  return html
    .replace("<h1>Contact Florida Liquor License Market</h1>", "<h1>Apply to Join Florida Liquor License Market</h1>")
    .replace("Whether you are buying, selling, financing, investing, or simply exploring your options, tell us how we can help. A marketplace representative will follow up directly.", "Tell us about your sales or business-development background, the Florida counties or markets you know best, and how you would like to contribute to the FLLM marketplace.")
    .replace("Use the secure form to contact us directly.", "Use the secure form to submit your FLLM application.")
    .replace("<h2>How Can We Help?</h2>", "<h2>FLLM Careers Application</h2>")
    .replace('name="_subject" value="Florida Liquor License Market — New Contact Inquiry"', 'name="_subject" value="FLLM Careers — Marketplace Representative Application"')
    .replace('<option value="" disabled="" selected="">Select an option</option>', '<option value="" disabled="">Select an option</option><option selected="">Careers / Join FLLM</option>')
    .replace("<span>Preferred County</span>", "<span>Florida County / Market You Know Best</span>")
    .replace("<span>How can we help? *</span>", "<span>Tell us about your sales or business-development background *</span>")
    .replace("Submit Confidential Inquiry", "Submit FLLM Application");
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const careersMode = requestUrl.searchParams.get("careers") === "1";
    let html = applyOfficialShell(await loadContactSource(request));
    html = careersMode ? applyCareersMode(html) : addCareersEntryPoint(html);
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    console.error("Contact page enhancement failed", error);
    return Response.redirect(new URL("/contact/index.html", request.url), 307);
  }
}
