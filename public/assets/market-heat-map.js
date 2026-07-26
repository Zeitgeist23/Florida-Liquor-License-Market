(() => {
  const STYLE_ID = "fllm-market-heat-map-styles-v1";
  const BACKDROP_CLASS = "fllm-heat-map-backdrop";
  const MODAL_CLASS = "fllm-heat-map-modal";
  const BODY_CLASS = "fllm-heat-map-open";
  const SVG_NS = "http://www.w3.org/2000/svg";

  const countyOrder = [
    "Okaloosa", "Glades", "DeSoto", "Dixie", "Martin", "Hardee", "Bay", "Flagler", "Orange", "Walton",
    "Pasco", "St. Lucie", "Washington", "Sumter", "Palm Beach", "Alachua", "Lafayette", "Okeechobee",
    "Hernando", "Charlotte", "Lee", "Lake", "Suwannee", "Levy", "Nassau", "Madison", "Columbia",
    "Calhoun", "Citrus", "Franklin", "Gadsden", "Gulf", "Jefferson", "Pinellas", "Clay", "Santa Rosa",
    "Seminole", "Volusia", "St. Johns", "Osceola", "Sarasota", "Gilchrist", "Hendry", "Highlands",
    "Indian River", "Manatee", "Union", "Duval", "Wakulla", "Jackson", "Leon", "Escambia", "Miami-Dade",
    "Bradford", "Taylor", "Broward", "Polk", "Brevard", "Hamilton", "Collier", "Baker", "Liberty", "Holmes",
    "Putnam", "Marion", "Hillsborough",
  ];

  const monroePath = [
    "M365.128,230.762L386.572,230.693L386.572,248.312L383.988,250.604L380.242,250.741L376.754,248.894L372.491,247.833L369.133,245.369L366.549,242.184L364.999,238.276L363.449,234.436L365.128,230.762Z",
    "M386.572,248.312L390.059,250.878L389.155,253.612L385.538,252.964L382.955,250.741Z",
    "M382.18,253.373L379.338,255.458L376.367,256.585L374.946,255.115L378.175,252.759Z",
    "M373.654,257.408L369.778,259.638L366.678,260.978L364.87,259.492L368.616,257.226Z",
    "M362.932,262.018L359.315,264.229L355.827,265.417L354.277,263.745L358.153,261.482Z",
    "M352.21,266.403L348.206,268.256L344.718,269.147L343.297,267.39L347.56,265.602Z",
    "M341.101,270.074L336.967,272.027L333.35,272.849L332.058,271.061L336.451,269.147Z",
    "M329.733,273.633L325.858,275.527L321.983,276.201L320.95,274.339L325.083,272.544Z",
  ].join("");

  let backdrop = null;
  let modal = null;
  let tooltip = null;
  let previousFocus = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS}{overflow:hidden!important}
      .${BACKDROP_CLASS}{position:fixed;inset:0;z-index:13998;background:radial-gradient(circle at 50% 18%,rgba(17,43,64,.56),rgba(2,10,17,.94) 64%);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
      .${MODAL_CLASS}{position:fixed;top:50%;left:50%;z-index:13999;width:min(94vw,1120px);height:min(90vh,900px);transform:translate(-50%,-50%);display:flex;flex-direction:column;overflow:hidden;border:1px solid #c38b18;border-radius:8px;background:#050708;color:#f6f3ea;box-shadow:0 34px 100px rgba(0,0,0,.8);font-family:Arial,Helvetica,sans-serif}
      .fllm-heat-map-header{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:18px 22px 16px;border-bottom:1px solid #a97513;background:linear-gradient(135deg,#071a2b,#0d304b)}
      .fllm-heat-map-brand{display:flex;align-items:center;gap:18px;min-width:0}.fllm-heat-map-brand img{width:170px;height:68px;object-fit:contain;object-position:left center}
      .fllm-heat-map-kicker{display:block;margin-bottom:5px;color:#f1a600;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
      .fllm-heat-map-header h2{margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(25px,3.3vw,38px);line-height:1.05}
      .fllm-heat-map-header p{margin:7px 0 0;color:#d4dde3;font-size:13px;line-height:1.45}
      .fllm-heat-map-close{flex:0 0 42px;width:42px;height:42px;display:grid;place-items:center;border:1px solid #d89400;border-radius:4px;background:#090b0c;color:#f1a600;cursor:pointer;font:700 28px/1 Arial,sans-serif}.fllm-heat-map-close:hover,.fllm-heat-map-close:focus-visible{background:#f1a600;color:#07101a;outline:none}
      .fllm-heat-map-content{min-height:0;flex:1;display:grid;grid-template-columns:230px minmax(0,1fr);gap:18px;padding:18px;background:radial-gradient(circle at 50% 0%,#111719,#080b0c 55%,#030405)}
      .fllm-heat-map-legend{align-self:start;padding:18px;border:1px solid #775d23;border-radius:6px;background:linear-gradient(145deg,#111516,#080a0b);box-shadow:0 12px 30px rgba(0,0,0,.34)}
      .fllm-heat-map-legend h3{margin:0 0 6px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:18px}.fllm-heat-map-legend p{margin:0 0 16px;color:#bfc7cb;font-size:11px;line-height:1.45}
      .fllm-heat-map-legend ul{display:grid;gap:9px;margin:0;padding:0;list-style:none}.fllm-heat-map-legend li{display:flex;align-items:center;gap:10px;color:#ecece8;font-size:11px;font-weight:800}.fllm-heat-map-legend i{width:25px;height:14px;flex:0 0 25px;border:1px solid rgba(255,255,255,.42);border-radius:2px}
      .fllm-heat-map-note{display:block;margin-top:17px;padding-top:14px;border-top:1px solid #3b4145;color:#929da3;font-size:10px;line-height:1.45}
      .fllm-heat-map-canvas{position:relative;min-width:0;min-height:0;display:grid;place-items:center;overflow:hidden;border:1px solid #775d23;border-radius:6px;background:radial-gradient(circle at 52% 45%,#18364d 0%,#0a1b29 50%,#03101a 100%)}
      .fllm-heat-map-loading{display:grid;place-items:center;min-height:300px;padding:30px;color:#d7dde0;font-weight:800;text-align:center}
      .fllm-heat-map-svg{display:block;width:100%;height:100%;max-height:650px;overflow:visible;padding:14px}.fllm-heat-map-svg>rect{fill:transparent!important}.fllm-heat-map-svg path{cursor:default;transition:filter .14s ease,opacity .14s ease,stroke-width .14s ease}.fllm-heat-map-svg path:hover,.fllm-heat-map-svg path:focus{filter:brightness(1.15) drop-shadow(0 2px 3px rgba(0,0,0,.55));stroke:#fff!important;stroke-width:1.7!important;outline:none}
      .fllm-heat-map-tooltip{position:fixed;z-index:14001;min-width:190px;max-width:260px;pointer-events:none;padding:11px 13px;border:1px solid #d29200;border-radius:4px;background:rgba(4,9,12,.97);color:#fff;box-shadow:0 14px 34px rgba(0,0,0,.55);transform:translate(14px,14px);font-size:12px;line-height:1.4}.fllm-heat-map-tooltip[hidden]{display:none}.fllm-heat-map-tooltip strong{display:block;margin-bottom:4px;color:#f1a600;font-family:Georgia,'Times New Roman',serif;font-size:16px}.fllm-heat-map-tooltip span{display:block;color:#eef1f2}.fllm-heat-map-tooltip small{display:block;margin-top:3px;color:#aeb8bd;font-size:10px}
      .fllm-heat-map-footer{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:13px 20px;border-top:1px solid #a97513;background:#020405;color:#bfc7cb;font-size:11px}.fllm-heat-map-footer a{color:#f1a600;font-weight:900;text-decoration:none}.fllm-heat-map-footer a:hover{color:#fff}
      @media(max-width:760px){.${MODAL_CLASS}{width:97vw;height:94vh}.fllm-heat-map-header{padding:13px}.fllm-heat-map-brand{gap:10px}.fllm-heat-map-brand img{width:105px;height:50px}.fllm-heat-map-header h2{font-size:21px}.fllm-heat-map-header p{font-size:10px}.fllm-heat-map-content{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);padding:10px;gap:10px}.fllm-heat-map-legend{padding:12px}.fllm-heat-map-legend p,.fllm-heat-map-note{display:none}.fllm-heat-map-legend ul{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.fllm-heat-map-legend li{font-size:9px;gap:5px}.fllm-heat-map-legend i{width:18px;height:11px;flex-basis:18px}.fllm-heat-map-footer{align-items:flex-start;flex-direction:column;padding:10px 14px}}
    `;
    document.head.appendChild(style);
  }

  function money(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }

  function countyKey(name) {
    return String(name || "").replace(/\s+County$/i, "").trim();
  }

  function aggregateListings(listings) {
    const counties = new Map();
    listings.forEach((listing) => {
      const key = countyKey(listing.county);
      if (!key) return;
      const current = counties.get(key) || { count: 0, highestPrice: null };
      current.count += 1;
      if (Number.isFinite(listing.price)) current.highestPrice = current.highestPrice === null ? listing.price : Math.max(current.highestPrice, listing.price);
      counties.set(key, current);
    });
    return counties;
  }

  function priceColor(data) {
    if (!data || data.count === 0) return "#27333a";
    if (data.highestPrice === null) return "#6f7f8b";
    if (data.highestPrice >= 750000) return "#e74227";
    if (data.highestPrice >= 600000) return "#f47b20";
    if (data.highestPrice >= 450000) return "#f2ad1f";
    if (data.highestPrice >= 300000) return "#a9a62f";
    return "#3f8d43";
  }

  function tooltipCopy(county, data) {
    const count = data?.count || 0;
    return {
      title: `${county} County`,
      count: `${count} license${count === 1 ? "" : "s"} currently for sale`,
      price: count === 0 ? "No current listings" : data.highestPrice === null ? "Highest asking price: undisclosed" : `Highest asking price: ${money(data.highestPrice)}`,
    };
  }

  function moveTooltip(event) {
    if (!tooltip || tooltip.hidden) return;
    const padding = 18;
    const width = tooltip.offsetWidth || 220;
    const height = tooltip.offsetHeight || 80;
    let left = event.clientX;
    let top = event.clientY;
    if (left + width + 28 > window.innerWidth) left = Math.max(padding, left - width - 28);
    if (top + height + 28 > window.innerHeight) top = Math.max(padding, top - height - 28);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function showTooltip(county, data, event) {
    if (!tooltip) return;
    const copy = tooltipCopy(county, data);
    tooltip.innerHTML = `<strong>${copy.title}</strong><span>${copy.count}</span><small>${copy.price}</small>`;
    tooltip.hidden = false;
    moveTooltip(event);
  }

  function hideTooltip() {
    if (tooltip) tooltip.hidden = true;
  }

  function stylePath(path, county, countyData) {
    const data = countyData.get(county) || { count: 0, highestPrice: null };
    path.querySelector("title")?.remove();
    path.setAttribute("fill", priceColor(data));
    path.setAttribute("stroke", "#e7edf0");
    path.setAttribute("stroke-width", data.count ? "0.9" : "0.55");
    path.setAttribute("data-heat-map-county", county);
    path.setAttribute("tabindex", "0");
    const title = document.createElementNS(SVG_NS, "title");
    const copy = tooltipCopy(county, data);
    title.textContent = `${copy.title} — ${copy.count}; ${copy.price}`;
    path.prepend(title);
    path.addEventListener("pointerenter", (event) => showTooltip(county, data, event));
    path.addEventListener("pointermove", moveTooltip);
    path.addEventListener("pointerleave", hideTooltip);
    path.addEventListener("focus", () => {
      const rect = path.getBoundingClientRect();
      showTooltip(county, data, { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
    });
    path.addEventListener("blur", hideTooltip);
  }

  function prepareMap(source, countyData) {
    const svg = source.cloneNode(true);
    if (!(svg instanceof SVGSVGElement)) return null;
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("viewBox", "135 10 295 275");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Florida counties colored by the highest current liquor license asking price");
    svg.classList.add("fllm-heat-map-svg");
    const paths = Array.from(svg.querySelectorAll("g > path"));
    paths.slice(0, countyOrder.length).forEach((path, index) => stylePath(path, countyOrder[index], countyData));
    const countyGroup = svg.querySelector("g");
    if (countyGroup) {
      let monroe = countyGroup.querySelector('[data-market-county="Monroe"], [data-heat-map-county="Monroe"]');
      if (!(monroe instanceof SVGPathElement)) {
        monroe = document.createElementNS(SVG_NS, "path");
        monroe.setAttribute("d", monroePath);
        countyGroup.appendChild(monroe);
      }
      stylePath(monroe, "Monroe", countyData);
    }
    return svg;
  }

  function findSourceMap() {
    return document.querySelector(".florida-map-art svg.florida-county-map, svg.florida-county-map");
  }

  function closeMarketDataMenu() {
    const menu = document.getElementById("market-data-header-menu");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");
    const trigger = Array.from(document.querySelectorAll(".primary-nav a")).find((link) => /^market data$/i.test(normalizedText(link)));
    trigger?.setAttribute("aria-expanded", "false");
  }

  function closeModal() {
    if (!modal) return;
    hideTooltip();
    tooltip?.remove();
    modal.remove();
    backdrop?.remove();
    document.body.classList.remove(BODY_CLASS);
    modal = null;
    backdrop = null;
    tooltip = null;
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  }

  function buildModal(trigger) {
    installStyles();
    closeMarketDataMenu();
    previousFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
    backdrop = document.createElement("div");
    backdrop.className = BACKDROP_CLASS;
    backdrop.addEventListener("click", closeModal);
    modal = document.createElement("section");
    modal.className = MODAL_CLASS;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "fllm-heat-map-title");
    modal.innerHTML = `
      <header class="fllm-heat-map-header"><div class="fllm-heat-map-brand"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /><div><span class="fllm-heat-map-kicker">Florida Market Data</span><h2 id="fllm-heat-map-title">Current License Price Heat Map</h2><p>Each county is colored by its highest disclosed asking price. Hover over a county for live inventory details.</p></div></div><button class="fllm-heat-map-close" type="button" aria-label="Close Florida license price heat map">×</button></header>
      <div class="fllm-heat-map-content"><aside class="fllm-heat-map-legend"><h3>Highest Asking Price</h3><p>Based on current available marketplace listings.</p><ul><li><i style="background:#e74227"></i>$750,000+</li><li><i style="background:#f47b20"></i>$600,000–$749,999</li><li><i style="background:#f2ad1f"></i>$450,000–$599,999</li><li><i style="background:#a9a62f"></i>$300,000–$449,999</li><li><i style="background:#3f8d43"></i>Under $300,000</li><li><i style="background:#6f7f8b"></i>Price undisclosed</li><li><i style="background:#27333a"></i>No current listings</li></ul><small class="fllm-heat-map-note">Inventory counts reflect the active listings currently displayed by Florida Liquor License Market. Prices and availability remain subject to confirmation.</small></aside><div class="fllm-heat-map-canvas"><div class="fllm-heat-map-loading">Loading current county inventory…</div></div></div>
      <footer class="fllm-heat-map-footer"><span>Hover over any county to see its name, active listing count, and highest asking price.</span><a href="/listings">Open Full Listings Page ›</a></footer>`;
    tooltip = document.createElement("div");
    tooltip.className = "fllm-heat-map-tooltip";
    tooltip.hidden = true;
    modal.querySelector(".fllm-heat-map-close")?.addEventListener("click", closeModal);
    document.body.append(backdrop, modal, tooltip);
    document.body.classList.add(BODY_CLASS);
    modal.querySelector(".fllm-heat-map-close")?.focus();
  }

  async function openHeatMap(trigger) {
    if (modal) return;
    buildModal(trigger);
    const canvas = modal?.querySelector(".fllm-heat-map-canvas");
    if (!canvas) return;
    try {
      const response = await fetch("/api/market-insights-listings", { cache: "no-store" });
      if (!response.ok) throw new Error(`Listings returned ${response.status}`);
      const payload = await response.json();
      const listings = Array.isArray(payload.listings) ? payload.listings : [];
      const source = findSourceMap();
      if (!(source instanceof SVGSVGElement)) throw new Error("Florida county map was not found");
      const map = prepareMap(source, aggregateListings(listings));
      if (!map) throw new Error("Florida county map could not be prepared");
      canvas.replaceChildren(map);
    } catch (error) {
      console.error("Florida license heat map failed", error);
      canvas.innerHTML = '<div class="fllm-heat-map-loading">The live heat map could not be loaded. Please open the full listings page to view current inventory.</div>';
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const option = target.closest("#market-data-header-menu button");
    if (!(option instanceof HTMLButtonElement) || !/^heat map$/i.test(normalizedText(option))) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openHeatMap(option);
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  window.addEventListener("fllm:open-heat-map", (event) => openHeatMap(event.target));
  window.FLLMHeatMap = { open: openHeatMap, close: closeModal };
})();
