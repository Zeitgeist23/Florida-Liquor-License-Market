(() => {
  const STYLE_ID = "fllm-heat-map-popup-cards-v1-styles";
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
        grid-template-columns:repeat(auto-fit,minmax(290px,1fr))!important;
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
        position:relative!important;
        width:100%!important;
        height:auto!important;
        min-height:0!important;
        max-height:none!important;
        aspect-ratio:560 / 300!important;
        display:block!important;
        flex:0 0 auto!important;
        overflow:hidden!important;
        padding:0!important;
        box-sizing:border-box!important;
        background:#061728!important;
      }
      .fllm-county-listing-map img,
      .fllm-county-listing-map .fllm-county-listing-map-svg{
        display:block!important;
        width:100%!important;
        height:100%!important;
        min-width:0!important;
        min-height:0!important;
        max-width:none!important;
        max-height:none!important;
        margin:0!important;
        padding:0!important;
        object-fit:contain!important;
        object-position:center!important;
        overflow:hidden!important;
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
      }
    `;
    document.head.appendChild(style);
  }

  function deriveType(card) {
    const inquiry = card.querySelector('a[href*="/contact?listing="]');
    if (!(inquiry instanceof HTMLAnchorElement)) return "4COP Liquor License";

    try {
      const url = new URL(inquiry.href, window.location.origin);
      const description = url.searchParams.get("listing")?.trim() || "";
      const location = card.querySelector(".fllm-county-listing-location")?.textContent
        ?.replace(/^\s*●\s*/, "")
        .trim() || "";

      if (location && description.toLowerCase().startsWith(location.toLowerCase())) {
        return description.slice(location.length).trim() || "4COP Liquor License";
      }

      const countyEnd = description.toLowerCase().indexOf(" county ");
      if (countyEnd >= 0) {
        return description.slice(countyEnd + " county ".length).trim() || "4COP Liquor License";
      }

      return description || "4COP Liquor License";
    } catch {
      return "4COP Liquor License";
    }
  }

  function normalizeFacts(card) {
    const facts = card.querySelector(".fllm-county-listing-facts");
    if (!(facts instanceof HTMLElement)) return;

    const spans = Array.from(facts.querySelectorAll(":scope > span"));
    let status = spans.find((span) => /transferable|available/i.test(span.textContent || ""));
    let type = spans.find((span) => span !== status);

    if (!type) {
      type = document.createElement("span");
      facts.prepend(type);
    }
    type.className = "fllm-county-listing-type";
    if (!(type.textContent || "").trim()) type.textContent = deriveType(card);

    if (!status) {
      status = document.createElement("span");
      facts.append(status);
    }
    status.className = "fllm-county-listing-status";
    status.textContent = STATUS_TEXT;
  }

  async function renderInlineCountyMap(card) {
    const frame = card.querySelector(".fllm-county-listing-map");
    if (!(frame instanceof HTMLElement)) return;
    if (frame.dataset.fllmInlineMap === "ready" || frame.dataset.fllmInlineMap === "loading") return;

    const image = frame.querySelector("img");
    if (!(image instanceof HTMLImageElement)) return;

    frame.dataset.fllmInlineMap = "loading";
    const source = image.currentSrc || image.src;

    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) throw new Error(`County map returned ${response.status}`);

      const markup = await response.text();
      const parsed = new DOMParser().parseFromString(markup, "image/svg+xml");
      if (parsed.querySelector("parsererror")) throw new Error("County map SVG could not be parsed");

      const parsedSvg = parsed.documentElement;
      if (!parsedSvg || parsedSvg.localName.toLowerCase() !== "svg") {
        throw new Error("County map response did not contain an SVG");
      }

      const svg = document.importNode(parsedSvg, true);
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.removeAttribute("style");
      svg.setAttribute("viewBox", svg.getAttribute("viewBox") || "0 0 560 300");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", image.alt || "Florida county liquor license map");
      svg.classList.add("fllm-county-listing-map-svg");

      frame.replaceChildren(svg);
      frame.dataset.fllmInlineMap = "ready";
    } catch (error) {
      console.error("County listing map could not be normalized", error);
      image.removeAttribute("width");
      image.removeAttribute("height");
      image.loading = "eager";
      image.decoding = "async";
      image.draggable = false;
      frame.dataset.fllmInlineMap = "fallback";
    }
  }

  function normalizeCard(card) {
    if (!(card instanceof Element)) return;
    normalizeFacts(card);
    void renderInlineCountyMap(card);
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