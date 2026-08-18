export const dynamic = "force-dynamic";

const MENU_MARKER = 'data-live-buy-dropdown="true"';

const menuMarkup = `<div class="live-buy-dropdown" data-live-buy-dropdown="true">
  <button class="live-buy-trigger" type="button" aria-haspopup="true">
    <span>Buy</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"/>
  </button>
  <div class="live-buy-menu">
    <a href="/listings">View Listings</a>
    <a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a>
  </div>
</div>`;

const styles = `<style id="live-buy-dropdown-styles">
.primary-nav .live-buy-dropdown{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
.primary-nav .live-buy-trigger{display:inline-flex;align-items:center;gap:5px;margin:0;padding:0;border:0;background:transparent;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap;cursor:pointer}
.primary-nav .live-buy-trigger:hover,.primary-nav .live-buy-trigger:focus-visible{color:#f6a700;outline:none}
.primary-nav .live-buy-menu{position:absolute;top:100%;left:50%;z-index:10050;display:none;width:310px;transform:translateX(-50%);padding:6px;border:1px solid #f6a700;border-radius:6px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48)}
.primary-nav .live-buy-dropdown:hover .live-buy-menu,.primary-nav .live-buy-dropdown:focus-within .live-buy-menu{display:grid;gap:4px}
.primary-nav .live-buy-menu a{display:block;width:100%;padding:12px 13px;border-radius:4px;color:#fff;text-decoration:none;text-transform:none;white-space:normal;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em}
.primary-nav .live-buy-menu a:hover,.primary-nav .live-buy-menu a:focus-visible{background:#f6a700;color:#061728;outline:none}
@media(max-width:820px){.primary-nav .live-buy-dropdown{width:100%;justify-content:center}.primary-nav .live-buy-trigger{width:100%;justify-content:center;padding:12px}.primary-nav .live-buy-menu{top:100%;width:min(310px,calc(100vw - 24px))}}
</style>`;

const installScript = `<script id="live-buy-dropdown-installer">
(function(){
  function install(){
    var nav=document.querySelector('.site-header .primary-nav');
    if(!nav||nav.querySelector('.live-buy-dropdown'))return;
    var links=Array.prototype.slice.call(nav.children);
    var buy=links.find(function(el){return el.tagName==='A'&&el.textContent.replace(/\\s+/g,' ').trim().toLowerCase()==='buy';});
    if(!buy)return;
    var wrap=document.createElement('div');
    wrap.className='live-buy-dropdown';
    wrap.setAttribute('data-live-buy-dropdown','true');
    wrap.innerHTML='<button class="live-buy-trigger" type="button" aria-haspopup="true"><span>Buy</span><img class="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true"></button><div class="live-buy-menu"><a href="/listings">View Listings</a><a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a></div>';
    buy.replaceWith(wrap);
  }
  function start(){install();requestAnimationFrame(install);setTimeout(install,100);setTimeout(install,500);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
</script>`;

function injectServerMenu(html: string) {
  if (html.includes(MENU_MARKER)) return html;

  const buyLinkPattern = /<a\b[^>]*href="\/listings"[^>]*>\s*<span>Buy<\/span>\s*<img\b[^>]*class="[^"]*\bnav-chevron\b[^"]*"[^>]*\/?>(?:\s*)<\/a>/i;
  return html.replace(buyLinkPattern, menuMarkup);
}

export async function GET(request: Request) {
  const sourceUrl = new URL("/api/homepage", request.url);
  sourceUrl.searchParams.set("buy-menu-source", "1");

  const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
  const sourceHtml = await sourceResponse.text();

  if (!sourceResponse.ok) {
    return new Response(sourceHtml, {
      status: sourceResponse.status,
      headers: { "Content-Type": sourceResponse.headers.get("content-type") ?? "text/html; charset=utf-8" },
    });
  }

  let html = injectServerMenu(sourceHtml);
  if (!html.includes('id="live-buy-dropdown-styles"')) html = html.replace("</head>", `${styles}</head>`);
  if (!html.includes('id="live-buy-dropdown-installer"')) html = html.replace("</body>", `${installScript}</body>`);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
