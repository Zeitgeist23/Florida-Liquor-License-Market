export const dynamic = "force-dynamic";

const SELF_DIRECTED_PATH = "/sell-your-license?method=self#listing-options";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";
const BROKER_LISTING_PATH = "/brokers/list-your-license";

const marker = 'data-home-list-license-menu="true"';

const menuMarkup = `<div class="home-list-license-wrap" data-home-list-license-menu="true">
  <button class="btn btn-gold home-list-license-trigger" type="button" aria-haspopup="menu" aria-label="List your license options">List Your License</button>
  <div class="home-list-license-menu" role="menu" aria-label="List your license options">
    <a href="${SELF_DIRECTED_PATH}" role="menuitem">Self-Directed Seller</a>
    <a href="${BROKER_ASSISTANCE_PATH}" role="menuitem">Request Broker Help</a>
    <a href="${BROKER_LISTING_PATH}" role="menuitem">Broker Listing</a>
  </div>
</div>`;

const menuStyles = `<style id="home-list-license-menu-styles">
.site-header,.site-header .header-actions{overflow:visible!important}
.header-actions .home-list-license-wrap{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
.header-actions .home-list-license-wrap::after{content:"";position:absolute;top:100%;right:0;width:100%;height:10px}
.header-actions .home-list-license-trigger{appearance:none;-webkit-appearance:none;font-family:inherit;cursor:default}
.header-actions .home-list-license-menu{position:absolute;top:calc(100% + 7px);right:0;z-index:50000;display:none;width:230px;padding:6px;border:1px solid #f6a700;border-radius:7px;background:#061728;box-shadow:0 18px 42px rgba(0,0,0,.42)}
.header-actions .home-list-license-wrap:hover .home-list-license-menu,.header-actions .home-list-license-wrap:focus-within .home-list-license-menu{display:grid;gap:2px}
.header-actions .home-list-license-menu a{display:block;width:100%;padding:11px 12px;border-radius:4px;color:#f6a700!important;font:800 13.5px/1.25 Arial,Helvetica,sans-serif;text-decoration:none!important;text-transform:none!important;white-space:normal}
.header-actions .home-list-license-menu a:hover,.header-actions .home-list-license-menu a:focus-visible{background:#f6a700;color:#061728!important;outline:none}
@media(max-width:899px){.header-actions .home-list-license-menu{right:50%;width:min(230px,calc(100vw - 28px));transform:translateX(50%)}}
</style>`;

function injectListLicenseMenu(html: string) {
  let updated = html;

  if (!updated.includes(marker)) {
    // Remove the homepage header's existing direct List Your License link and
    // replace it with a non-navigating trigger plus the three listing paths.
    // Do not depend on the link's current href because the upstream homepage
    // renderer may rewrite #sell to /sell-your-license.
    const buttonPattern = /<a\b(?=[^>]*class="[^"]*\bbtn\b[^"]*\bbtn-gold\b[^"]*")[^>]*>\s*List Your License\s*<\/a>/i;
    updated = updated.replace(buttonPattern, menuMarkup);
  }

  if (!updated.includes('id="home-list-license-menu-styles"')) {
    updated = updated.replace("</head>", `${menuStyles}</head>`);
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

  return new Response(injectListLicenseMenu(sourceHtml), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
