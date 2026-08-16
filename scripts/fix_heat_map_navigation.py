from pathlib import Path


def replace_once(path: Path, old: str, new: str, label: str) -> None:
    text = path.read_text(encoding="utf-8")
    if new in text:
        return
    if old not in text:
        raise SystemExit(f"{label}: expected text not found in {path}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


# Give every heat-map record the canonical individual-listing URL used by the
# main marketplace cards.
api_path = Path("app/api/market-insights-listings/route.ts")
replace_once(
    api_path,
    'import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";\n',
    'import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";\n'
    'import { listingPageHref } from "@/lib/listing-page-urls";\n',
    "market insights href import",
)
replace_once(
    api_path,
    "      sourceRef: listing.sourceRef,\n",
    "      sourceRef: listing.sourceRef,\n      href: listingPageHref(listing),\n",
    "market insights href field",
)

# Load the current card normalizer only after the popup-card script has
# installed its base behavior, eliminating the old/new CSS race.
enhancement_path = Path("components/ListingsHeatMapEnhancement.tsx")
enhancement = enhancement_path.read_text(encoding="utf-8")
old_sync_asset = (
    '  {\n'
    '    id: "fllm-listings-heat-map-listings-card-sync-v1-script",\n'
    '    src: "/assets/market-heat-map-listings-card-sync-v1.js?v=1",\n'
    '  },\n'
)
enhancement = enhancement.replace(old_sync_asset, "", 1)
enhancement = enhancement.replace(
    'src: "/assets/market-heat-map-popup-cards-v3.js?v=2",',
    'src: "/assets/market-heat-map-popup-cards-v3.js?v=3",',
    1,
)
enhancement_path.write_text(enhancement, encoding="utf-8")

# Ensure the static homepage receives the refreshed popup script.
homepage_path = Path("app/api/homepage/route.ts")
homepage = homepage_path.read_text(encoding="utf-8")
homepage = homepage.replace(
    '<script defer src="/assets/market-heat-map-popup-cards-v3.js?v=2"></script>',
    '<script defer src="/assets/market-heat-map-popup-cards-v3.js?v=3"></script>',
    1,
)
homepage_path.write_text(homepage, encoding="utf-8")

# The popup script is already loaded from both entry points. Have it load the
# marketplace-card normalizer after its own styles and observers are installed.
popup_path = Path("public/assets/market-heat-map-popup-cards-v3.js")
popup = popup_path.read_text(encoding="utf-8")
loader = """

  function ensureCurrentMarketplaceCardSync() {
    const assetPath = "/assets/market-heat-map-listings-card-sync-v1.js";
    const existing = Array.from(document.scripts).find((script) => script.src.includes(assetPath));
    if (existing) return;

    const script = document.createElement("script");
    script.src = `${assetPath}?v=2`;
    script.defer = true;
    script.dataset.fllmHeatMapCurrentCardSync = "true";
    document.head.appendChild(script);
  }

  ensureCurrentMarketplaceCardSync();
"""
marker = "\n})();"
if "ensureCurrentMarketplaceCardSync" not in popup:
    if marker not in popup:
        raise SystemExit("popup loader: closing marker not found")
    popup = popup.rsplit(marker, 1)[0] + loader + marker
popup_path.write_text(popup, encoding="utf-8")

# Upgrade the normalizer so View License always resolves the actual source
# reference and the heat-map popup uses the current /listings card design.
sync_path = Path("public/assets/market-heat-map-listings-card-sync-v1.js")
sync = sync_path.read_text(encoding="utf-8")

old_extract = """  function extractReference(card) {
    const text = cleanText(card.querySelector(".fllm-county-listing-reference")?.textContent);
    const match = text.match(/(?:listing\\s+reference\\s*:\\s*)?(.+)$/i);
    return cleanText(match?.[1] || "");
  }
"""
new_extract = """  function extractReference(card) {
    const dataReference = cleanText(card.dataset.listingReference);
    if (dataReference) return dataReference;

    const referenceLink = card.querySelector('a[href*="ref="]');
    if (referenceLink instanceof HTMLAnchorElement) {
      try {
        const value = cleanText(new URL(referenceLink.href, window.location.origin).searchParams.get("ref"));
        if (value) return value;
      } catch {
        // Fall through to the visible listing-reference text.
      }
    }

    const text = cleanText(card.querySelector(".fllm-county-listing-reference")?.textContent);
    const match = text.match(/(?:listing\\s+reference\\s*:\\s*)?(.+)$/i);
    const value = cleanText(match?.[1] || "");
    return /^reference pending$/i.test(value) ? "" : value;
  }
"""
if new_extract not in sync:
    if old_extract not in sync:
        raise SystemExit("sync reference extractor: expected function not found")
    sync = sync.replace(old_extract, new_extract, 1)

old_article = """    const article = document.createElement("article");
    article.className = "result-card result-card-available";
"""
new_article = """    const article = document.createElement("article");
    article.className = "result-card result-card-available";
    article.dataset.listingReference = sourceRef;
    article.dataset.listingHref = href;
    article.dataset.marketplaceListingCard = "true";
"""
if new_article not in sync:
    if old_article not in sync:
        raise SystemExit("sync article marker not found")
    sync = sync.replace(old_article, new_article, 1)

css_marker = """      .fllm-popup-card-shell .result-description p{
        -webkit-line-clamp:2!important;
      }
"""
current_card_css = """      .fllm-popup-card-shell .result-description p{
        -webkit-line-clamp:2!important;
      }
      .fllm-popup-card-shell.results-page .result-card{
        position:relative!important;
        min-height:286px!important;
        display:grid!important;
        grid-template-columns:minmax(0,1.08fr) minmax(150px,.92fr)!important;
        grid-template-rows:1fr!important;
        align-items:stretch!important;
        overflow:hidden!important;
        border:1px solid #9b741d!important;
        border-radius:8px!important;
        color:#f7f4ec!important;
        background:linear-gradient(145deg,#0b263b 0%,#071d2e 56%,#061725 100%)!important;
        box-shadow:0 10px 28px rgba(0,0,0,.28)!important;
        transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease!important;
      }
      .fllm-popup-card-shell.results-page .result-card:hover{
        transform:translateY(-2px)!important;
        border-color:#e3a314!important;
        box-shadow:0 15px 34px rgba(0,0,0,.38),0 0 0 1px rgba(241,166,0,.08)!important;
      }
      .fllm-popup-card-shell.results-page .result-type-badge{
        position:absolute!important;
        top:12px!important;
        right:12px!important;
        z-index:3!important;
        padding:5px 10px!important;
        border:1px solid #d99b10!important;
        border-radius:5px!important;
        color:#f5a900!important;
        background:rgba(4,17,27,.94)!important;
        font:900 9px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.02em!important;
        text-transform:uppercase!important;
      }
      .fllm-popup-card-shell.results-page .result-body{
        grid-column:1!important;
        grid-row:1!important;
        min-width:0!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:flex-start!important;
        padding:20px 10px 18px 18px!important;
      }
      .fllm-popup-card-shell.results-page .result-photo{
        grid-column:2!important;
        grid-row:1!important;
        width:100%!important;
        min-height:286px!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        padding:42px 10px 46px 4px!important;
        overflow:visible!important;
        border:0!important;
        background:transparent!important;
      }
      .fllm-popup-card-shell.results-page .result-photo .florida-county-map,
      .fllm-popup-card-shell.results-page .result-photo svg{
        width:118%!important;
        height:118%!important;
        max-width:215px!important;
        max-height:215px!important;
        object-fit:contain!important;
        filter:drop-shadow(0 8px 14px rgba(0,0,0,.38))!important;
      }
      .fllm-popup-card-shell.results-page .result-county-row{
        width:100%!important;
        margin:27px 0 0!important;
        color:#f6f4ed!important;
        font:700 20px/1.14 Georgia,'Times New Roman',serif!important;
      }
      .fllm-popup-card-shell.results-page .result-pin{
        margin-right:6px!important;
        color:#f1a600!important;
        font:400 15px/1 Arial,Helvetica,sans-serif!important;
      }
      .fllm-popup-card-shell.results-page .result-county-link{
        color:#f6f4ed!important;
        text-decoration:none!important;
      }
      .fllm-popup-card-shell.results-page .result-county-link:hover{color:#f5ae17!important}
      .fllm-popup-card-shell.results-page .result-body>h2{
        margin:8px 0 0!important;
        color:#f3a700!important;
        font:900 30px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.02em!important;
      }
      .fllm-popup-card-shell.results-page .result-facts{
        width:auto!important;
        margin:12px 0 0!important;
        padding:0!important;
        display:block!important;
        border:0!important;
      }
      .fllm-popup-card-shell.results-page .availability-pill{
        display:inline-flex!important;
        align-items:center!important;
        gap:7px!important;
        min-height:29px!important;
        padding:0 11px!important;
        border:1px solid rgba(55,190,92,.72)!important;
        border-radius:999px!important;
        color:#51d56f!important;
        background:rgba(19,86,45,.15)!important;
        font:900 11px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.025em!important;
        text-transform:uppercase!important;
      }
      .fllm-popup-card-shell.results-page .availability-dot{
        width:8px!important;
        height:8px!important;
        display:inline-block!important;
        flex:0 0 8px!important;
        border-radius:50%!important;
        background:#37c85b!important;
        box-shadow:0 0 8px rgba(55,200,91,.38)!important;
      }
      .fllm-popup-card-shell.results-page .result-description{
        width:100%!important;
        min-height:42px!important;
        margin:14px 0 0!important;
        padding:0!important;
        color:#e4e8ea!important;
        font:400 12px/1.46 Arial,Helvetica,sans-serif!important;
      }
      .fllm-popup-card-shell.results-page .result-description p{
        margin:0!important;
        overflow:hidden!important;
        display:-webkit-box!important;
        -webkit-box-orient:vertical!important;
        -webkit-line-clamp:2!important;
        color:#e4e8ea!important;
        font:400 12px/1.46 Arial,Helvetica,sans-serif!important;
      }
      .fllm-popup-card-shell.results-page .result-actions{
        width:min(245px,100%)!important;
        margin:auto 0 0!important;
        padding-top:15px!important;
        display:block!important;
      }
      .fllm-popup-card-shell.results-page .result-view-button{
        width:100%!important;
        min-height:43px!important;
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        gap:13px!important;
        padding:0 16px!important;
        border:1px solid #efaa10!important;
        border-radius:5px!important;
        color:#07131d!important;
        background:linear-gradient(145deg,#ffc13a 0%,#e99b00 100%)!important;
        box-shadow:0 5px 15px rgba(228,148,0,.18)!important;
        font:900 11px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.035em!important;
        text-decoration:none!important;
        text-transform:uppercase!important;
      }
      .fllm-popup-card-shell.results-page .result-view-button:hover{
        color:#03090d!important;
        background:linear-gradient(145deg,#ffd05d 0%,#f1a600 100%)!important;
      }
      .fllm-popup-card-shell.results-page .result-view-button span{
        font-size:19px!important;
        font-weight:400!important;
        line-height:1!important;
      }
      @media(max-width:520px){
        .fllm-popup-card-shell.results-page .result-card{min-height:auto!important;grid-template-columns:1fr!important}
        .fllm-popup-card-shell.results-page .result-body{grid-column:1!important;grid-row:1!important;padding:18px 16px 16px!important}
        .fllm-popup-card-shell.results-page .result-photo{grid-column:1!important;grid-row:2!important;min-height:170px!important;padding:8px 18px 16px!important}
        .fllm-popup-card-shell.results-page .result-actions{width:100%!important;margin-top:14px!important}
      }
"""
if "grid-template-columns:minmax(0,1.08fr)" not in sync:
    if css_marker not in sync:
        raise SystemExit("sync CSS marker not found")
    sync = sync.replace(css_marker, current_card_css, 1)

sync_path.write_text(sync, encoding="utf-8")
