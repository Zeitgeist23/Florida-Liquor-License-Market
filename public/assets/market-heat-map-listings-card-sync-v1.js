(() => {
  const STYLE_ID = "fllm-heat-map-listings-card-sync-v1-styles";
  const SOURCE_CARD = ".fllm-county-listing-card";

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .fllm-county-listings-grid{
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:18px!important;
        align-items:start!important;
        align-content:start!important;
      }
      .fllm-popup-card-shell.results-page{
        width:100%!important;
        min-width:0!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
        background:transparent!important;
        color:inherit!important;
      }
      .fllm-popup-card-shell .result-card{
        width:100%!important;
        margin:0!important;
      }
      .fllm-popup-card-shell .result-description p{
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
      @media(max-width:820px){
        .fllm-county-listings-grid{grid-template-columns:1fr!important}
      }
    `;
    document.head.appendChild(style);
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function countySlug(value) {
    return cleanText(value)
      .replace(/\s+County$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function slugPart(value) {
    return cleanText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function shortHash(value) {
    let hash = 2166136261;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function listingHref(county, type, sourceRef) {
    const reference = cleanText(sourceRef);
    if (!reference) return "/listings";
    if (/^FLLM-PAID-/i.test(reference)) return `/listings/${encodeURIComponent(reference.toUpperCase())}`;
    const refPart = slugPart(reference).slice(0, 34) || "listing";
    const typePart = /3PS/i.test(type) ? "3ps-quota" : "4cop-quota";
    return `/listings/${countySlug(county)}-${typePart}-${refPart}-${shortHash(reference)}`;
  }

  function extractReference(card) {
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
    const match = text.match(/(?:listing\s+reference\s*:\s*)?(.+)$/i);
    const value = cleanText(match?.[1] || "");
    return /^reference pending$/i.test(value) ? "" : value;
  }

  function cloneMap(card, county) {
    const existingSvg = card.querySelector(".fllm-county-listing-map-svg");
    if (existingSvg instanceof SVGSVGElement) {
      const svg = existingSvg.cloneNode(true);
      if (svg instanceof SVGSVGElement) {
        svg.className.baseVal = "florida-county-map";
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        return svg;
      }
    }

    const originalImage = card.querySelector(".fllm-county-listing-map img");
    const image = document.createElement("img");
    image.className = "florida-county-map";
    image.src = originalImage instanceof HTMLImageElement
      ? originalImage.src
      : `/api/county-map?county=${encodeURIComponent(county)}`;
    image.alt = `Florida map with ${county} highlighted`;
    return image;
  }

  function transformCard(card) {
    if (!(card instanceof HTMLElement) || card.dataset.fllmListingsCardSync === "done") return;
    card.dataset.fllmListingsCardSync = "done";

    const countyRaw = cleanText(card.querySelector(".fllm-county-listing-location")?.textContent)
      .replace(/^●\s*/, "");
    const county = /\bCounty$/i.test(countyRaw) ? countyRaw : `${countyRaw} County`;
    const priceLabel = cleanText(card.querySelector(".fllm-county-listing-price")?.textContent) || "Price Undisclosed";
    const factSpans = Array.from(card.querySelectorAll(".fllm-county-listing-facts span"));
    const type = cleanText(
      factSpans.find((span) => !/transferable|available/i.test(span.textContent || ""))?.textContent,
    ) || "4COP Quota";
    const sourceRef = extractReference(card);
    const href = listingHref(county, type, sourceRef);
    const map = cloneMap(card, county);

    const shell = document.createElement("div");
    shell.className = "results-page fllm-popup-card-shell";

    const article = document.createElement("article");
    article.className = "result-card result-card-available";
    article.dataset.listingReference = sourceRef;
    article.dataset.listingHref = href;
    article.dataset.marketplaceListingCard = "true";

    const badge = document.createElement("span");
    badge.className = "result-type-badge";
    badge.textContent = type;

    const photo = document.createElement("div");
    photo.className = "result-photo";
    photo.appendChild(map);

    const body = document.createElement("div");
    body.className = "result-body";

    const countyRow = document.createElement("p");
    countyRow.className = "result-county-row";
    countyRow.innerHTML = `<span class="result-pin" aria-hidden="true">●</span>`;
    const countyLink = document.createElement("a");
    countyLink.className = "result-county-link";
    countyLink.href = `/counties/${countySlug(county)}`;
    countyLink.textContent = county;
    countyRow.appendChild(countyLink);

    const price = document.createElement("h2");
    const priceLink = document.createElement("a");
    priceLink.href = href;
    priceLink.style.color = "inherit";
    priceLink.style.textDecoration = "none";
    priceLink.setAttribute("aria-label", `View ${type} listing in ${county}`);
    priceLink.textContent = priceLabel;
    price.appendChild(priceLink);

    const facts = document.createElement("div");
    facts.className = "result-facts";
    facts.innerHTML = `<span class="availability-pill" title="Available"><span class="availability-dot" aria-hidden="true"></span>Available</span>`;

    const description = document.createElement("div");
    description.className = "result-description";
    const descriptionText = document.createElement("p");
    descriptionText.textContent = `${county} ${type} opportunity currently available through Florida Liquor License Market.`;
    description.appendChild(descriptionText);

    const actions = document.createElement("div");
    actions.className = "result-actions";
    const view = document.createElement("a");
    view.className = "btn btn-gold result-view-button";
    view.href = href;
    view.innerHTML = `View License <span aria-hidden="true">›</span>`;
    actions.appendChild(view);

    body.append(countyRow, price, facts, description, actions);
    article.append(badge, photo, body);
    shell.appendChild(article);
    card.replaceWith(shell);
  }

  function normalize(root = document) {
    const cards = [];
    if (root instanceof Element && root.matches(SOURCE_CARD)) cards.push(root);
    root.querySelectorAll?.(SOURCE_CARD).forEach((card) => cards.push(card));
    cards.forEach((card) => transformCard(card));
  }

  function schedule(root) {
    window.setTimeout(() => normalize(root), 0);
  }

  schedule(document);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) schedule(node);
    }));
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
