export const dynamic = "force-dynamic";

const BUY_MARKER = 'data-live-buy-dropdown="true"';
const SELL_MARKER = 'data-live-sell-dropdown="true"';
const LICENSE_TYPES_MARKER = 'data-live-license-types-dropdown="true"';

const buyMenuMarkup = `<div class="live-nav-dropdown live-buy-dropdown" data-live-buy-dropdown="true">
  <button class="live-nav-trigger" type="button" aria-haspopup="true">
    <span>Buy</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-nav-menu live-buy-menu">
    <a href="/listings">View Listings</a>
    <a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a>
  </div>
</div>`;

const sellMenuMarkup = `<div class="live-nav-dropdown live-sell-dropdown" data-live-sell-dropdown="true">
  <button class="live-nav-trigger" type="button" aria-haspopup="true">
    <span>Sell</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-nav-menu live-sell-menu">
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
    <a href="/resources/florida-liquor-license-types">Florida Liquor License Types</a>
    <a href="/license-types/4cop-quota">4COP Quota License</a>
    <a href="/license-types/3ps-package-store">3PS Quota / Package Store</a>
    <a href="/license-types/2cop-beer-wine">2COP Beer &amp; Wine</a>
    <a href="/license-types/4cop-sfs-restaurant">SRX / 4COP-SFS Restaurant</a>
    <a href="/resources/florida-liquor-license-types#population-rule-title">Quota License Requirements</a>
  </div>
</div>`;

const styles = `<style id="live-nav-dropdown-styles">
.primary-nav .live-nav-dropdown{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
.primary-nav .live-nav-trigger{display:inline-flex;align-items:center;gap:5px;margin:0;padding:0;border:0;background:transparent;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap;cursor:pointer}
.primary-nav .live-nav-trigger:hover,.primary-nav .live-nav-trigger:focus-visible{color:#f6a700;outline:none}
.primary-nav .live-nav-menu{position:absolute;top:100%;left:50%;z-index:10050;display:none;width:310px;transform:translateX(-50%);padding:6px;border:1px solid #f6a700;border-radius:6px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48)}
.primary-nav .live-sell-menu{width:330px}
.primary-nav .live-license-types-menu{width:320px}
.primary-nav .live-nav-dropdown:hover .live-nav-menu,.primary-nav .live-nav-dropdown:focus-within .live-nav-menu,.primary-nav .live-nav-dropdown.is-open .live-nav-menu{display:grid;gap:4px}
.primary-nav .live-nav-menu a{display:block;width:100%;padding:12px 13px;border-radius:4px;color:#fff;text-decoration:none;text-transform:none;white-space:normal;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em}
.primary-nav .live-nav-menu a:hover,.primary-nav .live-nav-menu a:focus-visible{background:#f6a700;color:#061728;outline:none}
@media(max-width:820px){.primary-nav .live-nav-dropdown{width:100%;justify-content:center}.primary-nav .live-nav-trigger{width:100%;justify-content:center;padding:12px}.primary-nav .live-nav-menu,.primary-nav .live-sell-menu,.primary-nav .live-license-types-menu{top:100%;width:min(330px,calc(100vw - 24px))}}
</style>`;

const installScript = `<script id="live-nav-dropdown-installer">
(function(){
  function makeMenu(type){
    var wrap=document.createElement('div');
    wrap.className='live-nav-dropdown live-'+type+'-dropdown';
    wrap.setAttribute('data-live-'+type+'-dropdown','true');
    if(type==='buy'){
      wrap.innerHTML='<button class="live-nav-trigger" type="button" aria-haspopup="true"><span>Buy</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"></button><div class="live-nav-menu live-buy-menu"><a href="/listings">View Listings</a><a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a></div>';
    }else if(type==='sell'){
      wrap.innerHTML='<button class="live-nav-trigger" type="button" aria-haspopup="true"><span>Sell</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"></button><div class="live-nav-menu live-sell-menu"><a href="/sell-your-license">Sell Your License</a><a href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</a><a href="/florida-liquor-license-value">Get a License Valuation</a></div>';
    }else{
      wrap.innerHTML='<button class="live-nav-trigger" type="button" aria-haspopup="true"><span>License Types</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"></button><div class="live-nav-menu live-license-types-menu"><a href="/resources/florida-liquor-license-types">Florida Liquor License Types</a><a href="/license-types/4cop-quota">4COP Quota License</a><a href="/license-types/3ps-package-store">3PS Quota / Package Store</a><a href="/license-types/2cop-beer-wine">2COP Beer &amp; Wine</a><a href="/license-types/4cop-sfs-restaurant">SRX / 4COP-SFS Restaurant</a><a href="/resources/florida-liquor-license-types#population-rule-title">Quota License Requirements</a></div>';
    }
    var trigger=wrap.querySelector('.live-nav-trigger');
    trigger.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();wrap.classList.toggle('is-open');});
    return wrap;
  }
  function findPlainLink(nav,label,path){
    return Array.prototype.slice.call(nav.children).find(function(el){
      if(el.tagName!=='A')return false;
      var text=el.textContent.replace(/\\s+/g,' ').trim().toLowerCase();
      var href=el.getAttribute('href')||'';
      return text===label&&href===path;
    });
  }
  function install(){
    var nav=document.querySelector('.site-header .primary-nav');
    if(!nav)return;
    if(!nav.querySelector('.live-buy-dropdown')){var buy=findPlainLink(nav,'buy','/listings');if(buy)buy.replaceWith(makeMenu('buy'));}
    if(!nav.querySelector('.live-sell-dropdown')){var sell=findPlainLink(nav,'sell','/sell-your-license');if(sell)sell.replaceWith(makeMenu('sell'));}
    if(!nav.querySelector('.live-license-types-dropdown')){var license=findPlainLink(nav,'license types','/resources/florida-liquor-license-types');if(license)license.replaceWith(makeMenu('license-types'));}
  }
  document.addEventListener('click',function(e){document.querySelectorAll('.live-nav-dropdown.is-open').forEach(function(w){if(!w.contains(e.target))w.classList.remove('is-open');});});
  function start(){install();requestAnimationFrame(install);setTimeout(install,100);setTimeout(install,500);setTimeout(install,1200);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
</script>`;

const supportScripts = `<!-- fllm-all-header-hover-menus -->
<script src="/assets/core-nav-dropdowns.js?v=1" defer></script>
<script src="/assets/finance-menu-options.js?v=2" defer></script>
<script src="/assets/market-data-dropdown.js?v=12" defer></script>
<script src="/assets/header-menu-coordinator.js?v=4" defer></script>`;

function injectServerMenus(html: string) {
  let updated = html;
  if (!updated.includes(BUY_MARKER)) {
    const buyLinkPattern = /<a\b[^>]*href="\/listings"[^>]*>\s*<span>Buy<\/span>\s*<img\b[^>]*class="[^"]*\bnav-chevron\b[^"]*"[^>]*\/?>(?:\s*)<\/a>/i;
    updated = updated.replace(buyLinkPattern, buyMenuMarkup);
  }
  if (!updated.includes(SELL_MARKER)) {
    const sellLinkPattern = /<a\b[^>]*href="\/sell-your-license"[^>]*>\s*<span>Sell<\/span>\s*<img\b[^>]*class="[^"]*\bnav-chevron\b[^"]*"[^>]*\/?>(?:\s*)<\/a>/i;
    updated = updated.replace(sellLinkPattern, sellMenuMarkup);
  }
  if (!updated.includes(LICENSE_TYPES_MARKER)) {
    const licenseTypesLinkPattern = /<a\b[^>]*href="\/resources\/florida-liquor-license-types"[^>]*>\s*<span>License Types<\/span>\s*<\/a>/i;
    updated = updated.replace(licenseTypesLinkPattern, licenseTypesMenuMarkup);
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
