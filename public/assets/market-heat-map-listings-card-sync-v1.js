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
    const text = cleanText(card.querySelector(".fllm-county-listing-reference")?.textContent);
    const match = text.match(/(?:listing\s+reference\s*:\s*)?(.+)$/i);
    return cleanText(match?.[1] || "");
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
