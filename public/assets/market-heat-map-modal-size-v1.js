(() => {
  const STYLE_ID = "fllm-market-heat-map-modal-size-v3";
  const CARD_SELECTOR = ".fllm-county-listing-card";
  const STATUS_TEXT = "Transferable/Available";

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .fllm-heat-map-modal{
        width:90vw!important;
        height:90vh!important;
        max-width:none!important;
        max-height:none!important;
      }
      .fllm-county-listings-grid{
        grid-template-columns:repeat(auto-fit,minmax(280px,1fr))!important;
        align-items:stretch!important;
      }
      .fllm-county-listing-card{
        display:flex!important;
        flex-direction:column!important;
        width:100%!important;
        height:100%!important;
        min-width:0!important;
        overflow:hidden!important;
        box-sizing:border-box!important;
      }
      .fllm-county-listing-map{
        width:100%!important;
        height:auto!important;
        min-height:150px!important;
        max-height:190px!important;
        aspect-ratio:560 / 300!important;
        display:grid!important;
        place-items:center!important;
        flex:0 0 auto!important;
        overflow:hidden!important;
        padding:12px!important;
        box-sizing:border-box!important;
      }
      .fllm-county-listing-map img{
        display:block!important;
        width:auto!important;
        height:auto!important;
        max-width:100%!important;
        max-height:100%!important;
        object-fit:contain!important;
        object-position:center!important;
        flex:none!important;
        margin:auto!important;
      }
      .fllm-county-listing-body{
        display:flex!important;
        flex:1 1 auto!important;
        flex-direction:column!important;
        min-width:0!important;
        box-sizing:border-box!important;
      }
      .fllm-county-listing-facts{
        display:grid!important;
        grid-template-columns:minmax(0,1fr)!important;
        align-content:center!important;
        gap:4px!important;
        min-height:58px!important;
        overflow:visible!important;
      }
      .fllm-county-listing-type,
      .fllm-county-listing-status{
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        visibility:visible!important;
        opacity:1!important;
        overflow:visible!important;
        white-space:normal!important;
        overflow-wrap:anywhere!important;
        text-overflow:clip!important;
        line-height:1.35!important;
      }
      .fllm-county-listing-type{
        color:#35424c!important;
        font-size:12px!important;
        font-weight:800!important;
      }
      .fllm-county-listing-status{
        color:#58c94f!important;
        font-size:11px!important;
        font-weight:800!important;
      }
      .fllm-county-listing-reference{
        min-height:26px!important;
      }
      .fllm-county-listing-actions{
        margin-top:auto!important;
        padding-top:14px!important;
      }
      @media(max-width:760px){
        .fllm-county-listings-grid{
          grid-template-columns:minmax(0,1fr)!important;
        }
        .fllm-county-listing-map{
          min-height:140px!important;
          max-height:175px!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function deriveType(card) {
    const inquiry = card.querySelector('a[href*="/contact?listing="]');
    if (!(inquiry instanceof HTMLAnchorElement)) return "Florida Quota Liquor License";

    try {
      const url = new URL(inquiry.href, window.location.origin);
      const description = url.searchParams.get("listing")?.trim() || "";
      const location = card.querySelector(".fllm-county-listing-location")?.textContent
        ?.replace(/^\s*●\s*/, "")
        .trim() || "";

      if (location && description.toLowerCase().startsWith(location.toLowerCase())) {
        return description.slice(location.length).trim() || "Florida Quota Liquor License";
      }

      const countyEnd = description.toLowerCase().indexOf(" county ");
      if (countyEnd >= 0) {
        return description.slice(countyEnd + " county ".length).trim() || "Florida Quota Liquor License";
      }

      return description || "Florida Quota Liquor License";
    } catch {
      return "Florida Quota Liquor License";
    }
  }

  function normalizeCard(card) {
    if (!(card instanceof Element)) return;

    const mapImage = card.querySelector(".fllm-county-listing-map img");
    if (mapImage instanceof HTMLImageElement) {
      mapImage.removeAttribute("width");
      mapImage.removeAttribute("height");
      mapImage.loading = "lazy";
      mapImage.decoding = "async";
      mapImage.draggable = false;
    }

    const facts = card.querySelector(".fllm-county-listing-facts");
    if (!(facts instanceof HTMLElement)) return;

    const spans = Array.from(facts.querySelectorAll(":scope > span"));
    let status = spans.find((span) => /transferable|available/i.test(span.textContent || ""));
    let type = spans.find((span) => span !== status);

    if (!type) {
      type = document.createElement("span");
      facts.prepend(type);
    }
    type.classList.add("fllm-county-listing-type");
    if (!(type.textContent || "").trim()) type.textContent = deriveType(card);

    if (!status) {
      status = document.createElement("span");
      facts.append(status);
    }
    status.classList.add("fllm-county-listing-status");
    status.textContent = STATUS_TEXT;
  }

  function normalizeCards(root = document) {
    if (root instanceof Element && root.matches(CARD_SELECTOR)) normalizeCard(root);
    root.querySelectorAll?.(CARD_SELECTOR).forEach(normalizeCard);
  }

  normalizeCards();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) normalizeCards(node);
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();