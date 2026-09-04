export const dynamic = "force-dynamic";

const menuStyles = `<style id="home-list-license-menu-styles">
.site-header,.site-header .header-actions{overflow:visible!important}
.header-actions .home-list-license-wrap{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
.header-actions .home-list-license-wrap::after{content:"";position:absolute;top:100%;right:0;width:100%;height:10px}
.header-actions .home-list-license-trigger{appearance:none;-webkit-appearance:none;font-family:inherit;cursor:default}
.header-actions .home-list-license-menu{position:absolute;top:calc(100% + 7px);right:0;z-index:50000;display:none;width:290px;padding:6px;border:1px solid #f6a700;border-radius:7px;background:#061728;box-shadow:0 18px 42px rgba(0,0,0,.42)}
.header-actions .home-list-license-wrap:hover .home-list-license-menu,.header-actions .home-list-license-wrap:focus-within .home-list-license-menu{display:grid;gap:2px}
.header-actions .home-list-license-menu a{display:block;width:100%;padding:11px 12px;border-radius:4px;color:#f6a700!important;font:800 13.5px/1.25 Arial,Helvetica,sans-serif;text-decoration:none!important;text-transform:none!important;white-space:nowrap}
.header-actions .home-list-license-menu a:hover,.header-actions .home-list-license-menu a:focus-visible{background:#f6a700;color:#061728!important;outline:none}
@media(max-width:899px){.header-actions .home-list-license-menu{right:50%;width:min(290px,calc(100vw - 28px));transform:translateX(50%)}.header-actions .home-list-license-menu a{white-space:normal}}
</style>`;

const installerScript = `<script id="home-list-license-menu-installer">
(function(){
  var SELF='/sell-your-license?method=self#listing-options';
  var HELP='/sell-your-license#broker-assistance';
  var BROKER='/brokers/list-your-license';

  function text(el){return (el&&el.textContent||'').replace(/\\s+/g,' ').trim().toLowerCase();}

  function makeLink(label,href){
    var a=document.createElement('a');
    a.href=href;
    a.textContent=label;
    a.setAttribute('role','menuitem');
    return a;
  }

  function install(){
    var actions=document.querySelector('.site-header .header-actions');
    if(!actions)return;

    if(actions.querySelector('.home-list-license-wrap'))return;

    var oldLink=Array.prototype.find.call(actions.querySelectorAll('a'),function(a){
      return text(a)==='list your license';
    });
    if(!oldLink)return;

    var wrap=document.createElement('div');
    wrap.className='home-list-license-wrap';

    var button=document.createElement('button');
    button.type='button';
    button.className='btn btn-gold home-list-license-trigger';
    button.textContent='List Your License';
    button.setAttribute('aria-haspopup','menu');
    button.setAttribute('aria-label','List your license options');

    var menu=document.createElement('div');
    menu.className='home-list-license-menu';
    menu.setAttribute('role','menu');
    menu.setAttribute('aria-label','List your license options');
    menu.appendChild(makeLink('Self-Directed Seller',SELF));
    menu.appendChild(makeLink('Request Broker Help',HELP));
    menu.appendChild(makeLink('For Brokers — List a Client License',BROKER));

    wrap.appendChild(button);
    wrap.appendChild(menu);
    oldLink.replaceWith(wrap);
  }

  function start(){
    install();
    setTimeout(install,100);
    setTimeout(install,500);
    setTimeout(install,1200);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();

  window.addEventListener('load',start);
  window.addEventListener('pageshow',start);

  new MutationObserver(function(){install();}).observe(document.documentElement,{childList:true,subtree:true});
})();
</script>`;

function injectEnhancement(html: string) {
  let updated = html;
  if (!updated.includes('id="home-list-license-menu-styles"')) {
    updated = updated.replace("</head>", `${menuStyles}</head>`);
  }
  if (!updated.includes('id="home-list-license-menu-installer"')) {
    updated = updated.replace("</body>", `${installerScript}</body>`);
  }
  return updated;
}

export async function GET(request: Request) {
  const sourceUrl = new URL("/api/homepage-with-buy-menu", request.url);
  sourceUrl.searchParams.set("home-list-menu-source", "1");

  const response = await fetch(sourceUrl, { cache: "no-store" });
  const sourceHtml = await response.text();

  if (!response.ok) {
    return new Response(sourceHtml, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "text/html; charset=utf-8",
      },
    });
  }

  return new Response(injectEnhancement(sourceHtml), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
