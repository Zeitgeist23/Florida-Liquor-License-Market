export const dynamic = "force-dynamic";

const BUY_MARKER = 'data-live-buy-dropdown="true"';
const SELL_MARKER = 'data-live-sell-dropdown="true"';
const LICENSE_TYPES_MARKER = 'data-live-license-types-dropdown="true"';
const MARKET_DATA_MARKER = 'data-live-market-data-dropdown="true"';
const RESOURCES_MARKER = 'data-live-resources-dropdown="true"';

const buyMenuMarkup = `<div class="live-nav-dropdown live-buy-dropdown" data-live-buy-dropdown="true">
  <button class="live-nav-trigger" type="button" aria-haspopup="true">
    <span>Buy</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-nav-menu live-buy-menu">
    <a href="/buy-florida-liquor-license">Buy a Florida Liquor License</a>
    <a href="/listings">Florida Liquor Licenses for Sale</a>
    <a href="/license-alerts">Get a License Alert</a>
    <a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a>
    <a href="/counties">Florida County Markets</a>
  </div>
</div>`;

const sellMenuMarkup = `<div class="live-nav-dropdown live-sell-dropdown" data-live-sell-dropdown="true">
  <button class="live-nav-trigger" type="button" aria-haspopup="true">
    <span>Sell</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-nav-menu live-sell-menu">
    <a href="/brokers/advertise-client-liquor-license">BROKERS — See Featured Listing Example</a>
    <a href="/brokers/list-your-license">BROKERS — List a Client License</a>
    <a href="/sell-your-license">Sell Your License</a>
    <a href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</a>
    <a href="/florida-liquor-license-value">Get a License Valuation</a>
  </div>
</div>`;

const licenseTypesMenuMarkup = `<div class="live-nav-dropdown live-license-types-dropdown" data-live-license-types-dropdown="true">
  <button class="live-nav-trigger" type="button" aria-haspopup="true">
    <span>License Types</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-nav-menu live-license-types-menu">
    <a href="/resources/florida-liquor-license-types">Types of Florida Liquor Licenses</a>
    <a href="/license-types/4cop-quota">4COP Quota License</a>
    <a href="/license-types/3ps-package-store">3PS Quota / Package Store</a>
    <a href="/license-types/2cop-beer-wine">2COP Beer &amp; Wine</a>
    <a href="/license-types/4cop-sfs-restaurant">SRX / 4COP-SFS Restaurant</a>
    <a href="/license-types/mobile-bars-catered-events">Mobile Liquor License</a>
    <a href="/resources/florida-liquor-license-types#population-rule-title">Quota License Requirements</a>
  </div>
</div>`;

const marketDataMenuMarkup = `<div class="live-nav-dropdown live-market-data-dropdown" data-live-market-data-dropdown="true">
  <button class="live-nav-trigger" type="button" aria-haspopup="true">
    <span>Market Data</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-nav-menu live-market-data-menu">
    <a href="/market-data/exchange-board"><span>FLLM Exchange Board</span><b>EXCHANGE</b></a>
    <a href="/counties"><span>Florida Market Data by County</span></a>
    <a href="/florida-liquor-license-value"><span>Florida Liquor License Value Estimator</span><b>VALUE</b></a>
    <a href="/florida-quota-liquor-license-cost"><span>Florida Liquor License Cost by County</span></a>
    <a href="/listings?status=sold"><span>Recent Florida Transactions</span><b>SALES</b></a>
    <a href="/#market-data"><span>Florida Market Insights</span></a>
    <a href="/florida-liquor-license-lottery"><span>Quota Lottery Entry</span><b>LOTTERY</b></a>
    <a href="/florida-liquor-license-news"><span>News &amp; Insights</span></a>
    <a href="/#market-data"><span>Florida Market Heat Map</span><b>MAP</b></a>
  </div>
</div>`;

const resourcesMenuMarkup = `<div class="live-nav-dropdown live-resources-dropdown" data-live-resources-dropdown="true">
  <button class="live-nav-trigger" type="button" aria-haspopup="true">
    <span>Resources</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-nav-menu live-resources-menu">
    <a href="/free-guide"><span>Free Buyer’s &amp; Seller’s Guide</span><b>FREE PDF</b></a>
    <a href="/resources/florida-division-alcoholic-beverages-tobacco"><span>Florida Division of Alcoholic Beverages &amp; Tobacco</span><b>DABT</b></a>
    <a href="/resources/florida-department-of-revenue"><span>Florida Department of Revenue</span><b>FDOR</b></a>
    <a href="/license-lookup"><span>Florida Liquor License Lookup</span><b>LOOKUP</b></a>
    <a href="/resources/forms"><span>Florida ABT Forms</span></a>
    <a href="/resources/florida-liquor-license-laws"><span>Florida Liquor License Laws</span></a>
    <a href="/florida-liquor-license-value"><span>Florida Liquor License Value Estimator</span><b>VALUE</b></a>
    <a href="/resources/license-fees"><span>License Fees &amp; Annual Renewals</span></a>
    <a href="/resources/liquor-license-attorneys"><span>Liquor License Attorneys</span></a>
    <a href="/resources/application-center"><span>Alcohol License Application Center</span></a>
    <a href="/resources/quota-transfer-fee-calculator"><span>Quota License Transfer Fee Calculator</span></a>
    <a href="/resources"><span>View All Resources</span></a>
    <a class="live-resource-transaction" href="/transaction-services"><span>FLLM Transaction Services</span><small>Valuation · Financing · ABT Transfer Support · Closing Resources · Professional Referrals</small><em>Explore →</em></a>
  </div>
</div>`;

const styles = `<style id="live-nav-dropdown-styles">
.primary-nav .live-nav-dropdown{position:relative;display:inline-flex;align-items:center;flex:0 0 auto;padding-bottom:12px;margin-bottom:-12px}
.primary-nav .live-nav-trigger{display:inline-flex;align-items:center;gap:5px;margin:0;padding:0;border:0;background:transparent;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap;cursor:pointer}
.primary-nav .live-nav-trigger:hover,.primary-nav .live-nav-trigger:focus-visible,.primary-nav .live-nav-dropdown:focus-within>.live-nav-trigger{color:#f6a700;outline:none}
.primary-nav .live-nav-menu{position:absolute;top:100%;left:50%;z-index:10050;display:none;width:310px;transform:translateX(-50%);padding:10px;border:1px solid #f6a700;border-radius:8px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12)}
.primary-nav .live-sell-menu{width:390px}
.primary-nav .live-license-types-menu{width:320px}
.primary-nav .live-market-data-menu{width:min(540px,calc(100vw - 32px));grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.primary-nav .live-market-data-menu a{justify-content:space-between;gap:10px}
.primary-nav .live-market-data-menu a>span{min-width:0;white-space:normal;overflow-wrap:anywhere}
.primary-nav .live-market-data-menu a>b{flex:0 0 auto;margin-left:auto;color:#f6a700;font-size:9px;font-weight:900;letter-spacing:.08em;white-space:nowrap}
.primary-nav .live-market-data-menu a:last-child{grid-column:1/-1}
.primary-nav .live-resources-menu{left:auto;right:-88px;width:min(930px,calc(100vw - 32px));transform:none;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px 10px;padding:12px}
.primary-nav .live-resources-menu::before{content:"";position:absolute;top:-7px;right:116px;width:12px;height:12px;transform:rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
.primary-nav .live-nav-dropdown:hover>.live-nav-menu,.primary-nav .live-nav-dropdown:focus-within>.live-nav-menu,.primary-nav .live-nav-dropdown.is-open>.live-nav-menu{display:grid;gap:6px}
.primary-nav .live-market-data-dropdown:hover>.live-market-data-menu,.primary-nav .live-market-data-dropdown:focus-within>.live-market-data-menu,.primary-nav .live-market-data-dropdown.is-open>.live-market-data-menu{display:grid;gap:7px}
.primary-nav .live-resources-dropdown:hover>.live-resources-menu,.primary-nav .live-resources-dropdown:focus-within>.live-resources-menu,.primary-nav .live-resources-dropdown.is-open>.live-resources-menu{display:grid;gap:7px 10px}
.primary-nav .live-nav-menu a,.core-nav-header-menu a,.buy-header-menu a{display:flex!important;width:100%!important;min-height:52px!important;align-items:center!important;padding:10px 14px!important;border:1px solid rgba(255,255,255,.07)!important;border-radius:6px!important;background:#081d31!important;color:#fff!important;text-decoration:none!important;text-transform:none!important;white-space:normal!important;font:700 13px/1.25 Arial,Helvetica,sans-serif!important;letter-spacing:.01em!important;box-shadow:none!important}
.primary-nav .live-nav-menu a:hover,.primary-nav .live-nav-menu a:focus-visible,.core-nav-header-menu a:hover,.core-nav-header-menu a:focus-visible,.buy-header-menu a:hover,.buy-header-menu a:focus-visible{border-color:#f6a700!important;background:#0d2841!important;color:#f6a700!important;outline:none!important}
.primary-nav .live-resources-menu a{justify-content:space-between;gap:10px}
.primary-nav .live-resources-menu a>span{min-width:0;white-space:normal;overflow-wrap:anywhere}
.primary-nav .live-resources-menu a>b{flex:0 0 auto;margin-left:auto;color:#f6a700;font-size:9px;font-weight:900;letter-spacing:.08em;white-space:nowrap}
.primary-nav .live-resources-menu .live-resource-transaction{grid-column:1/-1;display:grid!important;grid-template-columns:max-content minmax(0,1fr) max-content;column-gap:22px;align-items:center;min-height:56px!important;border-color:rgba(246,167,0,.34)!important;background:rgba(255,255,255,.035)!important}
.primary-nav .live-resource-transaction small{min-width:0;text-align:center;color:#9fb0bf;font:700 11px/1.35 Arial,Helvetica,sans-serif}
.primary-nav .live-resource-transaction em{justify-self:end;color:#9fb0bf;font:800 10px/1 Arial,Helvetica,sans-serif;font-style:normal;white-space:nowrap}
.primary-nav .live-resource-transaction:hover small,.primary-nav .live-resource-transaction:hover em{color:#f6a700}
@media(max-width:980px){.primary-nav .live-resources-menu{width:min(720px,calc(100vw - 24px));grid-template-columns:repeat(2,minmax(0,1fr));right:-8px}.primary-nav .live-resources-menu::before{right:36px}}
@media(max-width:820px){.primary-nav .live-nav-dropdown{width:100%;justify-content:center;padding-bottom:0;margin-bottom:0}.primary-nav .live-nav-trigger{width:100%;justify-content:center;padding:12px}.primary-nav .live-nav-menu,.primary-nav .live-sell-menu,.primary-nav .live-license-types-menu,.primary-nav .live-market-data-menu,.primary-nav .live-resources-menu{top:100%;right:auto;left:50%;transform:translateX(-50%);width:min(360px,calc(100vw - 24px));grid-template-columns:1fr;max-height:70vh;overflow:auto}.primary-nav .live-market-data-menu a:last-child{grid-column:auto}.primary-nav .live-resources-menu::before{right:auto;left:50%;transform:translateX(-50%) rotate(45deg)}.primary-nav .live-resources-menu .live-resource-transaction{grid-column:auto;display:block!important}.primary-nav .live-resource-transaction small,.primary-nav .live-resource-transaction em{display:block;margin-top:5px;text-align:left}}
</style>`;

const marketDataInnerMarkup = marketDataMenuMarkup
  .replace(' data-live-market-data-dropdown="true"', '')
  .replace(/^<div class="live-nav-dropdown live-market-data-dropdown">|<\/div>$/g, '');
const resourcesInnerMarkup = resourcesMenuMarkup
  .replace(' data-live-resources-dropdown="true"', '')
  .replace(/^<div class="live-nav-dropdown live-resources-dropdown">|<\/div>$/g, '');

const installScript = `<script id="live-nav-dropdown-installer">
(function(){
  function normalized(el){return (el&&el.textContent||'').replace(/\\s+/g,' ').trim().toLowerCase();}
  function makeMenu(type){
    var wrap=document.createElement('div');
    wrap.className='live-nav-dropdown live-'+type+'-dropdown';
    wrap.setAttribute('data-live-'+type+'-dropdown','true');
    if(type==='buy'){
      wrap.innerHTML='<button class="live-nav-trigger" type="button" aria-haspopup="true"><span>Buy</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"></button><div class="live-nav-menu live-buy-menu"><a href="/buy-florida-liquor-license">Buy a Florida Liquor License</a><a href="/listings">Florida Liquor Licenses for Sale</a><a href="/license-alerts">Get a License Alert</a><a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a><a href="/counties">Florida County Markets</a></div>';
    }else if(type==='sell'){
      wrap.innerHTML='<button class="live-nav-trigger" type="button" aria-haspopup="true"><span>Sell</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"></button><div class="live-nav-menu live-sell-menu"><a href="/brokers/advertise-client-liquor-license">BROKERS — See Featured Listing Example</a><a href="/brokers/list-your-license">BROKERS — List a Client License</a><a href="/sell-your-license">Sell Your License</a><a href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</a><a href="/florida-liquor-license-value">Get a License Valuation</a></div>';
    }else if(type==='license-types'){
      wrap.innerHTML='<button class="live-nav-trigger" type="button" aria-haspopup="true"><span>License Types</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"></button><div class="live-nav-menu live-license-types-menu"><a href="/resources/florida-liquor-license-types">Types of Florida Liquor Licenses</a><a href="/license-types/4cop-quota">4COP Quota License</a><a href="/license-types/3ps-package-store">3PS Quota / Package Store</a><a href="/license-types/2cop-beer-wine">2COP Beer &amp; Wine</a><a href="/license-types/4cop-sfs-restaurant">SRX / 4COP-SFS Restaurant</a><a href="/license-types/mobile-bars-catered-events">Mobile Liquor License</a><a href="/resources/florida-liquor-license-types#population-rule-title">Quota License Requirements</a></div>';
    }else if(type==='market-data'){
      wrap.innerHTML=${JSON.stringify(marketDataInnerMarkup)};
    }else{
      wrap.innerHTML=${JSON.stringify(resourcesInnerMarkup)};
    }
    var trigger=wrap.querySelector('.live-nav-trigger');
    if(trigger)trigger.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();wrap.classList.toggle('is-open');});
    return wrap;
  }
  function findPlain(nav,label){return Array.prototype.slice.call(nav.children).find(function(el){return el.tagName==='A'&&normalized(el)===label;});}
  function install(){
    var nav=document.querySelector('.site-header .primary-nav');
    if(!nav)return;
    document.querySelectorAll('.resources-header-menu,.market-data-header-menu').forEach(function(el){el.remove();});
    if(!nav.querySelector('.live-buy-dropdown')){var buy=findPlain(nav,'buy');if(buy)buy.replaceWith(makeMenu('buy'));}
    if(!nav.querySelector('.live-sell-dropdown')){var sell=findPlain(nav,'sell');if(sell)sell.replaceWith(makeMenu('sell'));}
    if(!nav.querySelector('.live-license-types-dropdown')){var license=findPlain(nav,'license types');if(license)license.replaceWith(makeMenu('license-types'));}
    if(!nav.querySelector('.live-market-data-dropdown')){var market=findPlain(nav,'market data');if(market)market.replaceWith(makeMenu('market-data'));}
    if(!nav.querySelector('.live-resources-dropdown')){var resources=findPlain(nav,'resources');if(resources)resources.replaceWith(makeMenu('resources'));}
  }
  document.addEventListener('click',function(e){document.querySelectorAll('.live-nav-dropdown.is-open').forEach(function(w){if(!w.contains(e.target))w.classList.remove('is-open');});});
  function start(){install();requestAnimationFrame(install);setTimeout(install,100);setTimeout(install,500);setTimeout(install,1200);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
</script>`;

const supportScripts = `<!-- fllm-all-header-hover-menus -->
<script src="/assets/core-nav-dropdowns.js?v=5" defer></script>
<script src="/assets/finance-menu-options.js?v=2" defer></script>
<script src="/assets/lookup-link-override.js?v=1" defer></script>`;

function stripLegacyMenuScripts(html: string) {
  return html
    .replace(/<script\b[^>]*src=["'][^"']*\/assets\/resources-dropdown\.js[^"']*["'][^>]*><\/script>/gi, "")
    .replace(/<script\b[^>]*src=["'][^"']*\/assets\/market-data-dropdown\.js[^"']*["'][^>]*><\/script>/gi, "")
    .replace(/<script\b[^>]*src=["'][^"']*\/assets\/header-menu-coordinator\.js[^"']*["'][^>]*><\/script>/gi, "")
    .replace(/<script\b[^>]*src=["'][^"']*\/assets\/header-menu-hover\.js[^"']*["'][^>]*><\/script>/gi, "");
}

function injectServerMenus(html: string) {
  let updated = stripLegacyMenuScripts(html);
  if (!updated.includes(BUY_MARKER)) {
    const buyLinkPattern = /<a\b[^>]*href="\/listings"[^>]*>\s*<span>Buy<\/span>\s*<img\b[^>]*class="[^"]*\bnav-chevron\b[^"]*"[^>]*\/?>(?:\s*)<\/a>/i;
    updated = updated.replace(buyLinkPattern, buyMenuMarkup);
  }
  if (!updated.includes(SELL_MARKER)) {
    const sellLinkPattern = /<a\b[^>]*href="\/sell-your-license"[^>]*>\s*<span>Sell<\/span>\s*<img\b[^>]*class="[^"]*\bnav-chevron\b[^"]*"[^>]*\/?>(?:\s*)<\/a>/i;
    updated = updated.replace(sellLinkPattern, sellMenuMarkup);
  }
  if (!updated.includes(LICENSE_TYPES_MARKER)) {
    const licenseTypesLinkPattern = /<a\b[^>]*href="\/resources\/florida-liquor-license-types"[^>]*>\s*<span>License Types<\/span>(?:\s*<img\b[^>]*>)?\s*<\/a>/i;
    updated = updated.replace(licenseTypesLinkPattern, licenseTypesMenuMarkup);
  }
  if (!updated.includes(MARKET_DATA_MARKER)) {
    const marketDataLinkPattern = /<a\b[^>]*>\s*<span>Market Data<\/span>(?:\s*<img\b[^>]*class="[^"]*\bnav-chevron\b[^"]*"[^>]*\/?>)?\s*<\/a>/i;
    updated = updated.replace(marketDataLinkPattern, marketDataMenuMarkup);
  }
  if (!updated.includes(RESOURCES_MARKER)) {
    const resourcesLinkPattern = /<a\b[^>]*>\s*<span>Resources<\/span>(?:\s*<img\b[^>]*class="[^"]*\bnav-chevron\b[^"]*"[^>]*\/?>)?\s*<\/a>/i;
    updated = updated.replace(resourcesLinkPattern, resourcesMenuMarkup);
  }
  return updated;
}

export async function GET(request: Request) {
  const sourceUrl = new URL("/api/homepage", request.url);
  sourceUrl.searchParams.set("nav-menu-source", "1");

  const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
  const sourceHtml = await sourceResponse.text();

  if (!sourceResponse.ok) {
    return new Response(sourceHtml, {
      status: sourceResponse.status,
      headers: { "Content-Type": sourceResponse.headers.get("content-type") ?? "text/html; charset=utf-8" },
    });
  }

  let html = injectServerMenus(sourceHtml);
  if (!html.includes('id="live-nav-dropdown-styles"')) html = html.replace("</head>", `${styles}</head>`);
  if (!html.includes('id="live-nav-dropdown-installer"')) html = html.replace("</body>", `${installScript}</body>`);
  if (!html.includes("fllm-all-header-hover-menus")) html = html.replace("</body>", `${supportScripts}</body>`);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
