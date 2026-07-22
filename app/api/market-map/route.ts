const inventoryPrices: Record<string, { asking: number[]; sold: number[] }> = {
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
  Volusia: { asking: [599000], sold: [] },
};

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

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function combinedAverage(prices: { asking: number[]; sold: number[] }) {
  return average([...prices.asking, ...prices.sold]);
}

function priceColor(price?: number) {
  if (price === undefined || Number.isNaN(price)) return "#e3e7e9";
  if (price >= 600000) return "#ec341f";
  if (price >= 450000) return "#ff7b00";
  if (price >= 300000) return "#f4aa00";
  if (price >= 200000) return "#7faf2d";
  return "#3b8b35";
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function pathMarkup(name: string, path: string) {
  const prices = inventoryPrices[name];
  const hasSold = Boolean(prices?.sold.length);
  const fill = priceColor(prices ? combinedAverage(prices) : undefined);
  const stroke = hasSold ? "#071a2b" : prices ? "#ffffff" : "#aeb8bf";
  const strokeWidth = hasSold ? "1.7" : prices ? "0.95" : "0.55";
  const dash = hasSold ? ' stroke-dasharray="2.4 1.3"' : "";

  let title = `${name} County — no disclosed inventory price`;
  if (prices) {
    const details = [`combined average ${money(combinedAverage(prices))}`];
    if (prices.asking.length) details.push(`asking average ${money(average(prices.asking))}`);
    if (prices.sold.length) details.push(`sold average ${money(average(prices.sold))}`);
    title = `${name} County — ${details.join("; ")}`;
  }

  return `<path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${dash}><title>${escapeXml(title)}</title></path>`;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const geometryUrl = new URL("/assets/FloridaCountyMap-B1wEtUus.js", request.url);
    const geometryResponse = await fetch(geometryUrl, { cache: "force-cache" });

    if (!geometryResponse.ok) {
      throw new Error(`County geometry returned ${geometryResponse.status}`);
    }

    const source = await geometryResponse.text();
    const countyPattern = /\{id:`([^`]*)`,name:`([^`]*)`,path:`([^`]*)`\}/g;
    const paths: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = countyPattern.exec(source))) {
      paths.push(pathMarkup(match[2], match[3]));
    }

    if (paths.length < 60) {
      throw new Error(`Only ${paths.length} county paths were found`);
    }

    paths.push(pathMarkup("Monroe", monroePath));

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="135 10 295 275" role="img" aria-labelledby="title description">
  <title id="title">Florida liquor license asking and sold price map</title>
  <desc id="description">Florida counties colored by the average disclosed asking and sold prices shown in current marketplace inventory. Dashed outlines indicate a sold price is included.</desc>
  <g stroke-linejoin="round" stroke-linecap="round">${paths.join("")}</g>
</svg>`;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Market map generation failed", error);
    return new Response("Market map unavailable", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
