import "/assets/page-B81INvpQ.js?original=1";

const SVG_NS = "http://www.w3.org/2000/svg";

const inventoryPrices = {
  Bay: { asking: [505000], sold: [] },
  Broward: { asking: [240000, 215000], sold: [] },
  Charlotte: { asking: [425000], sold: [] },
  Collier: { asking: [500000], sold: [] },
  DeSoto: { asking: [110000], sold: [] },
  Duval: { asking: [710000, 659000], sold: [] },
  Escambia: { asking: [575000, 395000], sold: [] },
  Hillsborough: { asking: [250000, 245000, 210000], sold: [] },
  Lake: { asking: [275000, 200000], sold: [] },
  Lee: { asking: [], sold: [425000] },
  Leon: { asking: [850000], sold: [] },
  Manatee: { asking: [525000], sold: [] },
  Marion: { asking: [290000], sold: [] },
  Martin: { asking: [600000], sold: [] },
  "Miami-Dade": { asking: [195000], sold: [495000] },
  Monroe: { asking: [1200000], sold: [] },
  Orange: { asking: [515000, 550000, 499000], sold: [] },
  "Palm Beach": { asking: [225000], sold: [575000] },
  Pasco: { asking: [315000, 325000, 325000], sold: [] },
  Pinellas: { asking: [525000, 505000], sold: [] },
  Polk: { asking: [200000, 245000, 209000], sold: [] },
  "Santa Rosa": { asking: [929000, 630000], sold: [] },
  Sarasota: { asking: [540000], sold: [340000] },
  Seminole: { asking: [250000], sold: [] },
  "St. Johns": { asking: [], sold: [425000] },
  "St. Lucie": { asking: [294995, 300000, 275000], sold: [] },
  Volusia: { asking: [599000], sold: [] }
};

const monroePath = [
  "M365.128,230.762L386.572,230.693L386.572,248.312L383.988,250.604L380.242,250.741L376.754,248.894L372.491,247.833L369.133,245.369L366.549,242.184L364.999,238.276L363.449,234.436L365.128,230.762Z",
  "M386.572,248.312L390.059,250.878L389.155,253.612L385.538,252.964L382.955,250.741Z",
  "M382.18,253.373L379.338,255.458L376.367,256.585L374.946,255.115L378.175,252.759Z",
  "M373.654,257.408L369.778,259.638L366.678,260.978L364.87,259.492L368.616,257.226Z",
  "M362.932,262.018L359.315,264.229L355.827,265.417L354.277,263.745L358.153,261.482Z",
  "M352.21,266.403L348.206,268.256L344.718,269.147L343.297,267.39L347.56,265.602Z",
  "M341.101,270.074L336.967,272.027L333.35,272.849L332.058,271.061L336.451,269.147Z",
  "M329.733,273.633L325.858,275.527L321.983,276.201L320.95,274.339L325.083,272.544Z"
].join("");

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function combinedAverage(prices) {
  return average([...prices.asking, ...prices.sold]);
}

function priceColor(price) {
  if (!Number.isFinite(price)) return "#e3e7e9";
  if (price >= 600000) return "#ec341f";
  if (price >= 450000) return "#ff7b00";
  if (price >= 300000) return "#f4aa00";
  if (price >= 200000) return "#7faf2d";
  return "#3b8b35";
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function countyTitle(name, prices) {
  if (!prices) return `${name} County — no disclosed inventory price`;
  const details = [`combined average ${money(combinedAverage(prices))}`];
  if (prices.asking.length) details.push(`asking average ${money(average(prices.asking))}`);
  if (prices.sold.length) details.push(`sold average ${money(average(prices.sold))}`);
  return `${name} County — ${details.join("; ")}`;
}

function styleCounty(path, name) {
  const prices = inventoryPrices[name];
  const hasSold = Boolean(prices?.sold.length);
  const price = prices ? combinedAverage(prices) : undefined;

  path.setAttribute("fill", priceColor(price));
  path.setAttribute("stroke", hasSold ? "#071a2b" : prices ? "#ffffff" : "#aeb8bf");
  path.setAttribute("stroke-width", hasSold ? "1.7" : prices ? "0.95" : "0.55");
  if (hasSold) path.setAttribute("stroke-dasharray", "2.4 1.3");
  path.setAttribute("data-market-county", name);

  const title = document.createElementNS(SVG_NS, "title");
  title.textContent = countyTitle(name, prices);
  path.appendChild(title);
}

function ensureStyles() {
  if (document.getElementById("live-market-map-styles")) return;
  const style = document.createElement("style");
  style.id = "live-market-map-styles";
  style.textContent = `
    .map-panel .florida-map-art .live-market-map{display:block;width:100%;height:100%;overflow:visible}
    .map-panel .florida-map-art .live-market-map path{transition:filter .16s ease,opacity .16s ease}
    .map-panel .florida-map-art .live-market-map path:hover{filter:brightness(1.1) drop-shadow(0 1px 2px rgba(0,0,0,.32));cursor:help}
    .map-panel .market-map-note{display:block;margin-top:7px;color:#64717a;font-size:7px;line-height:1.35}
    @media(max-width:560px){.map-panel .market-map-note{max-width:260px;font-size:8px}}
  `;
  document.head.appendChild(style);
}

async function readCountyGeometry() {
  const response = await fetch("/assets/FloridaCountyMap-B1wEtUus.js", { cache: "force-cache" });
  if (!response.ok) throw new Error("County geometry could not be loaded");
  const source = await response.text();
  const counties = [];
  const pattern = /\{id:`([^`]*)`,name:`([^`]*)`,path:`([^`]*)`\}/g;
  let match;
  while ((match = pattern.exec(source))) {
    counties.push({ id: match[1], name: match[2], path: match[3] });
  }
  if (counties.length < 60) throw new Error("County geometry was incomplete");
  return counties;
}

async function renderMarketMap() {
  const panel = document.querySelector(".map-panel");
  const target = panel?.querySelector(".florida-map-art");
  if (!panel || !target) return false;
  if (target.querySelector(".live-market-map")) return true;

  ensureStyles();
  const counties = await readCountyGeometry();
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "live-market-map");
  svg.setAttribute("viewBox", "135 10 295 275");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Florida county map colored by published asking and sold inventory prices");

  const group = document.createElementNS(SVG_NS, "g");
  counties.forEach((county) => {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", county.path);
    styleCounty(path, county.name);
    group.appendChild(path);
  });

  const monroe = document.createElementNS(SVG_NS, "path");
  monroe.setAttribute("d", monroePath);
  styleCounty(monroe, "Monroe");
  group.appendChild(monroe);
  svg.appendChild(group);
  target.replaceChildren(svg);

  const heading = panel.querySelector(".map-content h3");
  if (heading) heading.innerHTML = "Published Asking &amp; Sold<br>Price by County";

  const legend = panel.querySelector(".map-content > div:first-child");
  if (legend && !legend.querySelector(".market-map-note")) {
    const note = document.createElement("small");
    note.className = "market-map-note";
    note.textContent = "County fill reflects the average disclosed inventory price. A dashed dark outline means a sold price is included; gray means no disclosed price.";
    legend.appendChild(note);
  }
  return true;
}

function scheduleRender() {
  const attempt = () => renderMarketMap().catch((error) => console.error("Market map update failed", error));
  attempt();
  setTimeout(attempt, 250);
  setTimeout(attempt, 900);
  setTimeout(attempt, 1800);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleRender, { once: true });
} else {
  scheduleRender();
}
