export const dynamic = "force-dynamic";

const INVESTMENT_PAGE_STYLES = `<style id="fllm-investment-official-shell-v1">
  .investment-page .seller-trust{display:flex!important;align-items:center!important}
  .investment-page .seller-trust>img{align-self:center!important;margin-top:0!important;margin-bottom:0!important}

  .fllm-static-official-header{position:relative;z-index:10000;border-bottom:1px solid rgba(246,167,0,.58);background:#020b12;color:#fff;font-family:Arial,Helvetica,sans-serif}
  .fllm-static-header-shell{width:min(1240px,calc(100% - 40px));min-height:108px;margin:0 auto;display:flex;align-items:center;gap:18px}
  .fllm-static-brand{flex:0 0 184px;display:flex;align-items:center;text-decoration:none}
  .fllm-static-brand img{display:block;width:168.7125px;height:68.5075px;object-fit:contain}
  .fllm-static-nav{display:flex;align-items:center;justify-content:center;gap:34px;flex:1 1 auto}
  .fllm-static-nav-item{position:relative;display:flex;align-items:center;padding:16px 0}
  .fllm-static-nav-trigger{display:inline-flex;align-items:center;gap:5px;border:0;background:transparent;color:#fff;font:600 10px/1 Arial,Helvetica,sans-serif;text-transform:uppercase;cursor:pointer;padding:0;white-space:nowrap;transition:transform .16s ease,color .16s ease}
  .fllm-static-nav-trigger:after{content:"▾";font-size:8px;color:#98a9b5}
  .fllm-static-nav-item:hover>.fllm-static-nav-trigger,.fllm-static-nav-item:focus-within>.fllm-static-nav-trigger,.fllm-static-nav-item.is-open>.fllm-static-nav-trigger{color:#f6a700;transform:scale(1.03)}
  .fllm-static-menu{position:absolute;top:calc(100% - 2px);left:50%;display:none;width:310px;padding:8px;transform:translateX(-50%);border:1px solid #f6a700;border-radius:7px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);z-index:10020}
  .fllm-static-nav-item:hover>.fllm-static-menu,.fllm-static-nav-item:focus-within>.fllm-static-menu,.fllm-static-nav-item.is-open>.fllm-static-menu{display:grid;gap:4px}
  .fllm-static-menu:before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
  .fllm-static-menu a{display:block;padding:12px 15px;border-radius:5px;color:#fff!important;text-decoration:none;font-size:14px;font-weight:700;line-height:1.25}
  .fllm-static-menu a:hover,.fllm-static-menu a:focus{background:rgba(246,167,0,.10);color:#f6a700!important;outline:none}
  .fllm-static-finance-menu{width:350px}.fllm-static-market-menu{width:390px}.fllm-static-resources-menu{width:420px}.fllm-static-license-menu{width:365px}
  .fllm-static-actions{display:flex;align-items:center;gap:12px;flex:0 0 auto}
  .fllm-static-actions a{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 16px;border-radius:5px;text-decoration:none;text-transform:uppercase;font-size:11px;font-weight:900;white-space:nowrap;transition:transform .16s ease,filter .16s ease,box-shadow .16s ease}
  .fllm-static-contact{border:1px solid #f6a700;color:#f6a700!important;background:rgba(2,11,18,.72)}
  .fllm-static-contact:hover{background:linear-gradient(145deg,#ffc13b,#e69a00);color:#07101a!important;box-shadow:0 0 18px rgba(241,166,0,.45)}
  .fllm-static-list{border:1px solid #ffc12d;color:#07101a!important;background:linear-gradient(145deg,#ffbd21,#ef9000);box-shadow:inset 0 1px rgba(255,255,255,.35),0 8px 25px rgba(246,167,0,.14)}
  .fllm-static-list:hover{filter:brightness(1.08);transform:translateY(-1px)}
  .fllm-static-mobile-toggle{display:none;margin-left:auto;border:1px solid #f6a700;border-radius:5px;background:#061728;color:#f6a700;font-size:22px;line-height:1;padding:9px 11px}

  .fllm-static-official-footer{border-top:1px solid rgba(246,167,0,.62);background:linear-gradient(90deg,#071f36 0%,#0d3558 50%,#071f36 100%);color:#fff;font-family:Arial,Helvetica,sans-serif}
  .fllm-static-footer-main{width:min(1240px,calc(100% - 40px));min-height:112px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:28px}
  .fllm-static-footer-brand{display:flex;align-items:center;gap:16px}.fllm-static-footer-brand img{width:130px;height:auto;display:block}.fllm-static-footer-brand span{font-size:15px}
  .fllm-static-footer-nav{display:flex;flex-wrap:wrap;gap:26px}.fllm-static-footer-nav a{color:#fff!important;text-decoration:none;font-size:12px;font-weight:800}.fllm-static-footer-nav a:hover{color:#f6a700!important}
  .fllm-static-footer-national{border-top:1px solid rgba(255,255,255,.18);min-height:52px;display:flex;align-items:center;justify-content:center;padding:0 20px;text-align:center;background:#0b2e4d}
  .fllm-static-footer-national span{margin-right:8px;color:#d8e3ec;font-size:12px}.fllm-static-footer-national a{color:#fff!important;text-decoration:none;font-size:12px;font-weight:900}.fllm-static-footer-national a:hover{color:#f6a700!important}

  @media(max-width:1050px){.fllm-static-header-shell{min-height:92px}.fllm-static-brand{flex-basis:155px}.fllm-static-brand img{width:145px;height:auto}.fllm-static-nav{gap:18px}.fllm-static-actions a{padding:0 12px;font-size:10px}}
  @media(max-width:860px){.fllm-static-header-shell{flex-wrap:wrap;padding:12px 0}.fllm-static-mobile-toggle{display:block}.fllm-static-nav,.fllm-static-actions{display:none;width:100%}.fllm-static-official-header.is-open .fllm-static-nav,.fllm-static-official-header.is-open .fllm-static-actions{display:flex}.fllm-static-nav{flex-direction:column;align-items:stretch;gap:0}.fllm-static-nav-item{display:block;padding:0}.fllm-static-nav-trigger{width:100%;justify-content:space-between;padding:13px 0;text-align:left}.fllm-static-menu{position:static;width:100%!important;transform:none;border:0;border-radius:0;box-shadow:none;padding:0 0 8px 12px}.fllm-static-menu:before{display:none}.fllm-static-actions{padding-top:8px}.fllm-static-footer-main{flex-direction:column;align-items:flex-start;padding:24px 0}.fllm-static-footer-nav{gap:16px}}
</style>`;

const OFFICIAL_HEADER = `<header class="fllm-static-official-header" id="fllm-static-official-header">
  <div class="fllm-static-header-shell">
    <a class="fllm-static-brand" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></a>
    <button class="fllm-static-mobile-toggle" id="fllm-static-mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav class="fllm-static-nav" aria-label="Primary navigation">
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Buy</button><div class="fllm-static-menu"><a href="/buy-florida-liquor-license">Buy a Florida Liquor License</a><a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a><a href="/counties">Florida County Markets</a><a href="/listings">View Listings</a><a href="/license-alerts">Get a License Alert</a><a href="/exchange">FLLM Exchange — Confidential Florida License Offers</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Sell</button><div class="fllm-static-menu"><a href="/brokers/list-your-license">BROKERS — Advertise a Client License</a><a href="/sell-your-license">Sell Your License</a><a href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</a><a href="/florida-liquor-license-value">Get a License Valuation</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Finance</button><div class="fllm-static-menu fllm-static-finance-menu"><a href="/how-to-finance-florida-liquor-license">How to Finance a Florida Liquor License</a><a href="/financing/loan-payment-calculator">Loan Payment Calculator</a><a href="/private-liquor-license-lenders">Private Lenders</a><a href="/financing#request-financing">Request Financing</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Invest</button><div class="fllm-static-menu"><a href="/investment-opportunities">Investment Opportunities</a><a href="/resources/florida-liquor-license-system">Quota License Ownership &amp; Investing</a><a href="/self-directed-ira-liquor-license-lending">Self-Directed IRA Lending</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Market Data</button><div class="fllm-static-menu fllm-static-market-menu"><a href="/market-data/exchange-board">FLLM Exchange Board</a><a href="/counties">Florida Market Data by County</a><a href="/florida-liquor-license-value">Florida Liquor License Value Estimator</a><a href="/florida-quota-liquor-license-cost">Florida Liquor License Cost by County</a><a href="/listings?status=sold">Recent Florida Transactions</a><a href="/florida-quota-liquor-license-market-report">Florida Market Insights</a><a href="/florida-liquor-license-lottery">Quota Lottery Entry</a><a href="/florida-liquor-license-news">News &amp; Insights</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">License Types</button><div class="fllm-static-menu fllm-static-license-menu"><a href="/resources/florida-liquor-license-system">How Florida Liquor Licensing Works</a><a href="/resources/florida-liquor-license-types">Types of Florida Liquor Licenses</a><a href="/license-types/4cop-quota">4COP Quota License</a><a href="/license-types/3ps-package-store">3PS Quota / Package Store</a><a href="/license-types/2cop-beer-wine">2COP Beer &amp; Wine</a><a href="/license-types/4cop-sfs-restaurant">SRX / 4COP-SFS Restaurant</a><a href="/license-types/mobile-bars-catered-events">Mobile Liquor License</a></div></div>
      <div class="fllm-static-nav-item"><button class="fllm-static-nav-trigger" type="button">Resources</button><div class="fllm-static-menu fllm-static-resources-menu"><a href="/free-guide">Free Buyer’s &amp; Seller’s Guide</a><a href="/resources">View All Resources</a><a href="/resources/application-center">Alcohol License Application Center</a><a href="/license-lookup">Florida Liquor License Lookup</a><a href="/florida-liquor-license-value">Florida Liquor License Value Estimator</a><a href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</a><a href="/resources/florida-division-alcoholic-beverages-tobacco">Florida Division of Alcoholic Beverages &amp; Tobacco</a><a href="/resources/forms">Florida ABT Forms</a><a href="/resources/florida-department-of-revenue">Florida Department of Revenue (FDOR)</a><a href="/dbpr-abt-6002">ABT-6002 Transfer Guide</a></div></div>
    </nav>
    <div class="fllm-static-actions"><a class="fllm-static-contact" href="/contact">☎ Contact Us</a><a class="fllm-static-list" href="/sell-your-license">List Your License</a></div>
  </div>
</header>`;

const OFFICIAL_FOOTER = `<footer class="fllm-static-official-footer">
  <div class="fllm-static-footer-main">
    <div class="fllm-static-footer-brand"><a href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></a><span>© Florida Liquor License Market</span></div>
    <nav class="fllm-static-footer-nav" aria-label="Footer navigation"><a href="/">Home</a><a href="/florida-4cop-liquor-license-for-sale">4COP</a><a href="/florida-3ps-liquor-license-for-sale">3PS</a><a href="/listings">Listings</a><a href="/contact">Contact</a></nav>
  </div>
  <div class="fllm-static-footer-national"><span>Looking for a liquor license outside Florida?</span><a href="https://www.liquorlicensemarket.com/">Visit Liquor License Market — The National Marketplace.</a></div>
</footer>`;

const OFFICIAL_BEHAVIOR = `<script id="fllm-investment-official-shell-script-v1">(function(){
  var header=document.getElementById('fllm-static-official-header');
  var mobile=document.getElementById('fllm-static-mobile-toggle');
  if(mobile&&header){mobile.addEventListener('click',function(){var open=header.classList.toggle('is-open');mobile.setAttribute('aria-expanded',open?'true':'false')})}
  document.querySelectorAll('.fllm-static-nav-item>.fllm-static-nav-trigger').forEach(function(button){button.addEventListener('click',function(event){event.preventDefault();var item=button.parentElement;document.querySelectorAll('.fllm-static-nav-item.is-open').forEach(function(other){if(other!==item)other.classList.remove('is-open')});item&&item.classList.toggle('is-open')})});
  document.addEventListener('pointerdown',function(event){if(!event.target.closest('.fllm-static-nav-item'))document.querySelectorAll('.fllm-static-nav-item.is-open').forEach(function(item){item.classList.remove('is-open')})});
})();</script>`;

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/investment-opportunities/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) throw new Error(`Investment page source returned ${sourceResponse.status}`);

    let html = await sourceResponse.text();
    html = html.replace('<main class="seller-page investment-page">','<main class="seller-page contact-page investment-page">');

    html = html.replace(/<header class="seller-header page-shell">[\s\S]*?<\/header>/, OFFICIAL_HEADER);

    if (!html.includes('id="fllm-investment-official-shell-v1"')) {
      html = html.replace("</head>", `${INVESTMENT_PAGE_STYLES}</head>`);
    }

    if (!html.includes('class="fllm-static-official-footer"')) {
      html = html.replace("</main>", `</main>${OFFICIAL_FOOTER}${OFFICIAL_BEHAVIOR}`);
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
