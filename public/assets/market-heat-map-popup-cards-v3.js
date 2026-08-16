(() => {
  const STYLE_ID = "fllm-heat-map-popup-cards-v4-styles";
  const CARD_SELECTOR = ".fllm-county-listing-card";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const STATUS_TEXT = "Transferable/Available";

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .fllm-heat-map-modal{width:90vw!important;height:90vh!important;max-width:none!important;max-height:none!important}
      .fllm-county-listings-dialog{height:min(88vh,900px)!important;max-height:88vh!important}
      .fllm-county-listings-grid{
        flex:1 1 auto!important;
        min-height:0!important;
        overflow-y:auto!important;
        overflow-x:hidden!important;
        grid-template-columns:repeat(auto-fill,minmax(290px,400px))!important;
        grid-auto-rows:max-content!important;
        justify-content:start!important;
        align-content:start!important;
        align-items:start!important;
        overscroll-behavior:contain!important;
      }
      .fllm-county-listing-card{
        display:flex!important;
        flex-direction:column!important;
        align-self:start!important;
        width:100%!important;
        max-width:400px!important;
        height:auto!important;
        min-height:0!important;
        max-height:none!important;
        min-width:0!important;
        overflow:hidden!important;
        box-sizing:border-box!important;
      }
      .fllm-county-listing-map{
        width:100%!important;
        height:190px!important;
        min-height:190px!important;
        max-height:190px!important;
        display:grid!important;
        place-items:center!important;
        flex:0 0 190px!important;
        overflow:hidden!important;
        padding:10px!important;
        box-sizing:border-box!important;
        background:#061728!important;
      }
      .fllm-county-listing-map img{display:none!important}
      .fllm-county-listing-map-svg{
        display:block!important;
        width:auto!important;
        height:100%!important;
        max-width:100%!important;
        max-height:100%!important;
        min-width:0!important;
        min-height:0!important;
        margin:auto!important;
        overflow:visible!important;
      }
      .fllm-county-listing-body{
        display:flex!important;
        flex:0 0 auto!important;
        flex-direction:column!important;
        min-width:0!important;
        min-height:230px!important;
        height:auto!important;
        max-height:none!important;
        overflow:visible!important;
        box-sizing:border-box!important;
      }
      .fllm-county-listing-location,
      .fllm-county-listing-price,
      .fllm-county-listing-facts,
      .fllm-county-listing-reference,
      .fllm-county-listing-actions{
        flex-shrink:0!important;
        visibility:visible!important;
        opacity:1!important;
      }
      .fllm-county-listing-facts{
        display:grid!important;
        grid-template-columns:minmax(0,1fr)!important;
        align-content:center!important;
        gap:4px!important;
        min-height:58px!important;
        overflow:visible!important;
      }
      .fllm-county-listing-type,.fllm-county-listing-status{
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
      .fllm-county-listing-type{color:#35424c!important;font-size:12px!important;font-weight:800!important}
      .fllm-county-listing-status{color:#58c94f!important;font-size:11px!important;font-weight:800!important}
      .fllm-county-listing-reference{display:block!important;min-height:26px!important}
      .fllm-county-listing-actions{display:grid!important;margin-top:auto!important;padding-top:14px!important}
      @media(max-width:760px){
        .fllm-county-listings-dialog{height:92vh!important;max-height:92vh!important}
        .fllm-county-listings-grid{grid-template-columns:minmax(0,1fr)!important;justify-content:stretch!important}
        .fllm-county-listing-card{max-width:none!important}
        .fllm-county-listing-map{height:175px!important;min-height:175px!important;max-height:175px!important;flex-basis:175px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeCounty(value) {
    return String(value || "").replace(/^\s*●\s*/, "").replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
  }

  function cardCounty(card) {
    return normalizeCounty(card.querySelector(".fllm-county-listing-location")?.textContent || "");
  }

  function deriveType(card) {
    const inquiry = card.querySelector('a[href*="/contact?listing="]');
    if (!(inquiry instanceof HTMLAnchorElement)) return "4COP Liquor License";
    try {
      const url = new URL(inquiry.href, window.location.origin);
      const description = url.searchParams.get("listing")?.trim() || "";
      const location = card.querySelector(".fllm-county-listing-location")?.textContent?.replace(/^\s*●\s*/, "").trim() || "";
      if (location && description.toLowerCase().startsWith(location.toLowerCase())) return description.slice(location.length).trim() || "4COP Liquor License";
      const countyEnd = description.toLowerCase().indexOf(" county ");
      if (countyEnd >= 0) return description.slice(countyEnd + " county ".length).trim() || "4COP Liquor License";
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

  function buildCountyMap(card) {
    const frame = card.querySelector(".fllm-county-listing-map");
    const source = document.querySelector(".fllm-heat-map-canvas .fllm-heat-map-svg");
    if (!(frame instanceof HTMLElement) || !(source instanceof SVGSVGElement)) return false;

    const selected = cardCounty(card);
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", source.getAttribute("viewBox") || "135 10 295 275");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${card.querySelector(".fllm-county-listing-location")?.textContent?.replace(/^\s*●\s*/, "").trim() || "Florida county"} highlighted on Florida map`);
    svg.classList.add("fllm-county-listing-map-svg");

    const viewBox = (svg.getAttribute("viewBox") || "135 10 295 275").split(/\s+/).map(Number);
    const background = document.createElementNS(SVG_NS, "rect");
    background.setAttribute("x", String(viewBox[0] || 135));
    background.setAttribute("y", String(viewBox[1] || 10));
    background.setAttribute("width", String(viewBox[2] || 295));
    background.setAttribute("height", String(viewBox[3] || 275));
    background.setAttribute("fill", "#061728");
    svg.appendChild(background);

    const group = document.createElementNS(SVG_NS, "g");
    source.querySelectorAll("path[data-heat-map-county]").forEach((sourcePath) => {
      const path = sourcePath.cloneNode(false);
      const active = normalizeCounty(sourcePath.getAttribute("data-heat-map-county")) === selected;
      path.removeAttribute("tabindex");
      path.removeAttribute("role");
      path.removeAttribute("aria-label");
      path.removeAttribute("filter");
      path.setAttribute("fill", active ? "#f5a400" : "#dce4ea");
      path.setAttribute("stroke", active ? "#ffd76a" : "#71869a");
      path.setAttribute("stroke-width", active ? "1.8" : "0.75");
      path.setAttribute("pointer-events", "none");
      group.appendChild(path);
    });
    svg.appendChild(group);
    frame.replaceChildren(svg);
    frame.dataset.fllmPopupMap = "ready";
    return true;
  }

  function normalizeCard(card) {
    if (!(card instanceof Element)) return;
    normalizeFacts(card);
    if (card.querySelector(".fllm-county-listing-map-svg")) return;
    buildCountyMap(card);
  }

  function normalizeCards(root = document) {
    if (root instanceof Element && root.matches(CARD_SELECTOR)) normalizeCard(root);
    root.querySelectorAll?.(CARD_SELECTOR).forEach(normalizeCard);
  }

  normalizeCards();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) normalizeCards(node);
    }));
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

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

})();