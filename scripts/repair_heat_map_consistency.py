from pathlib import Path
import re


def main() -> None:
    heat_path = Path("public/assets/market-heat-map.js")
    heat = heat_path.read_text(encoding="utf-8")

    direct_css = r'''
      /* Use the exact current marketplace-card treatment inside every heat-map county dialog. */
      .fllm-county-listings-grid{
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:18px!important;
        align-items:start!important;
        align-content:start!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page{
        width:100%!important;
        min-width:0!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
        background:transparent!important;
        color:inherit!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-card{
        position:relative!important;
        width:100%!important;
        min-height:286px!important;
        margin:0!important;
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
        text-align:left!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-card:hover{
        transform:translateY(-2px)!important;
        border-color:#e3a314!important;
        box-shadow:0 15px 34px rgba(0,0,0,.38),0 0 0 1px rgba(241,166,0,.08)!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-type-badge{
        position:absolute!important;
        top:12px!important;
        right:12px!important;
        left:auto!important;
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
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body{
        grid-column:1!important;
        grid-row:1!important;
        min-width:0!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:flex-start!important;
        padding:20px 10px 18px 18px!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo{
        grid-column:2!important;
        grid-row:1!important;
        width:100%!important;
        height:auto!important;
        min-height:286px!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        padding:42px 10px 46px 4px!important;
        overflow:visible!important;
        border:0!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo .florida-county-map,
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo svg{
        display:block!important;
        width:118%!important;
        height:118%!important;
        max-width:215px!important;
        max-height:215px!important;
        margin:auto!important;
        object-fit:contain!important;
        filter:drop-shadow(0 8px 14px rgba(0,0,0,.38))!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-county-row{
        width:100%!important;
        margin:27px 0 0!important;
        padding:0!important;
        color:#f6f4ed!important;
        background:transparent!important;
        font:700 20px/1.14 Georgia,'Times New Roman',serif!important;
        letter-spacing:normal!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-pin{
        margin-right:6px!important;
        color:#f1a600!important;
        font:400 15px/1 Arial,Helvetica,sans-serif!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-county-link{
        color:#f6f4ed!important;
        font:inherit!important;
        letter-spacing:normal!important;
        text-decoration:none!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-county-link:hover{color:#f5ae17!important}
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body>h2{
        margin:8px 0 0!important;
        padding:0!important;
        color:#f3a700!important;
        background:transparent!important;
        font:900 30px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.02em!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body>h2 a{
        color:inherit!important;
        font:inherit!important;
        letter-spacing:inherit!important;
        text-decoration:none!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-facts{
        width:auto!important;
        min-height:0!important;
        margin:12px 0 0!important;
        padding:0!important;
        display:block!important;
        border:0!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .availability-pill{
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
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .availability-dot{
        width:8px!important;
        height:8px!important;
        display:inline-block!important;
        flex:0 0 8px!important;
        border-radius:50%!important;
        background:#37c85b!important;
        box-shadow:0 0 8px rgba(55,200,91,.38)!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-description{
        width:100%!important;
        min-height:42px!important;
        margin:14px 0 0!important;
        padding:0!important;
        color:#e4e8ea!important;
        background:transparent!important;
        font:400 12px/1.46 Arial,Helvetica,sans-serif!important;
        letter-spacing:normal!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-description p{
        margin:0!important;
        padding:0!important;
        overflow:hidden!important;
        display:-webkit-box!important;
        -webkit-box-orient:vertical!important;
        -webkit-line-clamp:2!important;
        color:#e4e8ea!important;
        background:transparent!important;
        font:400 12px/1.46 Arial,Helvetica,sans-serif!important;
        letter-spacing:normal!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-actions{
        width:min(245px,100%)!important;
        min-height:0!important;
        margin:auto 0 0!important;
        padding-top:15px!important;
        display:block!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-view-button{
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
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-view-button:hover{
        color:#03090d!important;
        background:linear-gradient(145deg,#ffd05d 0%,#f1a600 100%)!important;
        filter:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-view-button span{
        font-size:19px!important;
        font-weight:400!important;
        line-height:1!important;
      }
      @media(max-width:820px){
        .fllm-county-listings-grid{grid-template-columns:1fr!important}
      }
      @media(max-width:520px){
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-card{min-height:auto!important;grid-template-columns:1fr!important}
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body{grid-column:1!important;grid-row:1!important;padding:18px 16px 16px!important}
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo{grid-column:1!important;grid-row:2!important;min-height:170px!important;padding:8px 18px 16px!important}
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-actions{width:100%!important;margin-top:14px!important}
      }
'''

    css_marker = "      @media(max-width:760px){"
    if "Use the exact current marketplace-card treatment inside every heat-map county dialog." not in heat:
        if css_marker not in heat:
            raise RuntimeError("Heat-map CSS insertion marker was not found.")
        heat = heat.replace(css_marker, direct_css + "\n" + css_marker, 1)

    direct_renderer = r'''  function countyPageSlug(value) {
    return String(value || "")
      .replace(/\s+County$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function listingReferenceSlug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function listingReferenceHash(value) {
    let hash = 2166136261;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function directListingHref(listing, displayCounty, type) {
    const supplied = String(listing?.href || "").trim();
    if (/^\/listings\/[^/?#]+/i.test(supplied)) return supplied;

    const reference = String(listing?.sourceRef || "").trim();
    if (!reference) return `/listings?county=${encodeURIComponent(displayCounty)}`;
    if (/^FLLM-PAID-/i.test(reference)) return `/listings/${encodeURIComponent(reference.toUpperCase())}`;

    const refPart = listingReferenceSlug(reference).slice(0, 34) || "listing";
    const typePart = /3PS/i.test(type) ? "3ps-quota" : "4cop-quota";
    return `/listings/${countyPageSlug(displayCounty)}-${typePart}-${refPart}-${listingReferenceHash(reference)}`;
  }

  function renderListingCard(listing, county) {
    const displayCounty = listing.county || `${county} County`;
    const type = listing.type || "Florida Quota Liquor License";
    const priceLabel = listing.priceLabel || (Number.isFinite(listing.price) ? money(listing.price) : "Price Undisclosed");
    const reference = String(listing.sourceRef || "").trim();
    const href = directListingHref(listing, displayCounty, type);
    const mapUrl = `/api/county-map?county=${encodeURIComponent(displayCounty)}`;
    const description = `${displayCounty} ${type} opportunity currently available through Florida Liquor License Market.`;

    return `<div class="fllm-popup-card-shell results-page">
      <article class="result-card result-card-available" data-listing-reference="${escapeHtml(reference)}" data-listing-href="${escapeHtml(href)}" data-marketplace-listing-card="true">
        <span class="result-type-badge">${escapeHtml(type)}</span>
        <div class="result-photo"><img class="florida-county-map" src="${escapeHtml(mapUrl)}" alt="Florida map with ${escapeHtml(displayCounty)} highlighted" /></div>
        <div class="result-body">
          <p class="result-county-row"><span class="result-pin" aria-hidden="true">●</span><a class="result-county-link" href="/counties/${countyPageSlug(displayCounty)}">${escapeHtml(displayCounty)}</a></p>
          <h2><a href="${escapeHtml(href)}" aria-label="View ${escapeHtml(type)} listing in ${escapeHtml(displayCounty)}">${escapeHtml(priceLabel)}</a></h2>
          <div class="result-facts"><span class="availability-pill" title="Available"><span class="availability-dot" aria-hidden="true"></span>Available</span></div>
          <div class="result-description"><p>${escapeHtml(description)}</p></div>
          <div class="result-actions"><a class="btn btn-gold result-view-button" href="${escapeHtml(href)}">View License <span aria-hidden="true">›</span></a></div>
        </div>
      </article>
    </div>`;
  }

  function openCountyListings'''

    renderer_pattern = re.compile(
        r"  function renderListingCard\(listing, county\) \{.*?\n  \}\n\n  function openCountyListings",
        re.S,
    )
    if not renderer_pattern.search(heat):
        raise RuntimeError("Existing heat-map renderer was not found.")
    heat = renderer_pattern.sub(lambda _match: direct_renderer, heat, count=1)
    heat_path.write_text(heat, encoding="utf-8")

    popup_path = Path("public/assets/market-heat-map-popup-cards-v3.js")
    popup = popup_path.read_text(encoding="utf-8")
    popup = re.sub(
        r"\n\s*function ensureCurrentMarketplaceCardSync\(\) \{.*?ensureCurrentMarketplaceCardSync\(\);\n",
        "\n",
        popup,
        count=1,
        flags=re.S,
    )
    popup_path.write_text(popup, encoding="utf-8")

    replacements = {
        Path("components/ListingsHeatMapEnhancement.tsx"): [
            ("/assets/market-heat-map-popup-cards-v3.js?v=3", "/assets/market-heat-map-popup-cards-v3.js?v=4"),
            ("/assets/market-heat-map.js?v=4", "/assets/market-heat-map.js?v=5"),
        ],
        Path("app/api/homepage/route.ts"): [
            ("/assets/market-heat-map-popup-cards-v3.js?v=3", "/assets/market-heat-map-popup-cards-v3.js?v=4"),
            ("/assets/market-heat-map.js?v=4", "/assets/market-heat-map.js?v=5"),
        ],
    }
    for path, pairs in replacements.items():
        text = path.read_text(encoding="utf-8")
        for old, new in pairs:
            text = text.replace(old, new)
        path.write_text(text, encoding="utf-8")

    listings_path = Path("components/ListingsPage.tsx")
    listings = listings_path.read_text(encoding="utf-8")
    old_identity = '''function listingIdentity(listing: Pick<Listing, "county" | "type" | "price" | "priceLabel">) {
  return `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}
'''
    new_identity = '''function listingIdentity(listing: Pick<Listing, "county" | "type" | "price" | "priceLabel" | "sourceRef">) {
  const reference = listing.sourceRef?.trim().toLowerCase();
  return reference
    ? `reference:${reference}`
    : `market:${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}
'''
    if old_identity not in listings:
        raise RuntimeError("Listings identity function was not found.")
    listings = listings.replace(old_identity, new_identity, 1)

    old_scroll = '''  useEffect(() => {
    if (!focusIdentity || !focusedCardRef.current) return;

    const timeout = window.setTimeout(() => {
      focusedCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [focusIdentity]);
'''
    new_scroll = '''  useEffect(() => {
    if (!focusIdentity) return;

    const revealSelectedListing = () => {
      focusedCardRef.current?.scrollIntoView({ behavior: "auto", block: "center" });
    };

    const frame = window.requestAnimationFrame(revealSelectedListing);
    const retry = window.setTimeout(revealSelectedListing, 650);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retry);
    };
  }, [focusIdentity, filtered.length]);
'''
    if old_scroll not in listings:
        raise RuntimeError("Listings focus scroll effect was not found.")
    listings = listings.replace(old_scroll, new_scroll, 1)
    listings_path.write_text(listings, encoding="utf-8")

    cards_css_path = Path("app/listings/listings-conversion-cards.css")
    cards_css = cards_css_path.read_text(encoding="utf-8")
    focused_css = '''

.results-page .result-card-focused {
  border-color: #ffc12e !important;
  box-shadow: 0 0 0 3px rgba(255, 193, 46, .24), 0 18px 42px rgba(0, 0, 0, .42) !important;
}

.results-page .result-card-focused::before {
  content: "Selected License";
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 9px;
  border: 1px solid #ffc12e;
  border-radius: 4px;
  color: #07131d;
  background: #ffc12e;
  font: 900 9px/1 Arial, Helvetica, sans-serif;
  letter-spacing: .045em;
  text-transform: uppercase;
}
'''
    if ".results-page .result-card-focused::before" not in cards_css:
        cards_css += focused_css
    cards_css_path.write_text(cards_css, encoding="utf-8")


if __name__ == "__main__":
    main()
