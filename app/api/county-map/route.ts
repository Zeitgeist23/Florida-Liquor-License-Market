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

function normalizeCounty(name: string) {
  return name.replace(/ County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function countyPath(name: string, path: string, target: string) {
  const active = normalizeCounty(name) === target;
  const title = active ? `${name} County highlighted` : `${name} County`;

  return `<path d="${path}" fill="${active ? "#f5a400" : "#dce4ea"}" stroke="${active ? "#ffd76a" : "#71869a"}" stroke-width="${active ? "1.8" : "0.75"}"${active ? ' filter="url(#county-glow)"' : ""}><title>${escapeXml(title)}</title></path>`;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const county = url.searchParams.get("county")?.trim();
    if (!county) {
      return new Response("County is required", {
        status: 400,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const target = normalizeCounty(county);
    const geometryUrl = new URL("/assets/FloridaCountyMap-B1wEtUus.js", request.url);
    const geometryResponse = await fetch(geometryUrl, { cache: "force-cache" });
    if (!geometryResponse.ok) {
      throw new Error(`County geometry returned ${geometryResponse.status}`);
    }

    const source = await geometryResponse.text();
    const countyPattern = /\{id:`([^`]*)`,name:`([^`]*)`,path:`([^`]*)`\}/g;
    const paths: string[] = [];
    let matchedTarget = false;
    let match: RegExpExecArray | null;

    while ((match = countyPattern.exec(source))) {
      if (normalizeCounty(match[2]) === target) matchedTarget = true;
      paths.push(countyPath(match[2], match[3], target));
    }

    if (paths.length < 60) {
      throw new Error(`Only ${paths.length} county paths were found`);
    }

    if (target === normalizeCounty("Monroe")) matchedTarget = true;
    paths.push(countyPath("Monroe", monroePath, target));

    const safeCounty = escapeXml(county);
    const description = matchedTarget
      ? `Florida map with ${safeCounty} highlighted in gold.`
      : `Florida county map; ${safeCounty} could not be matched.`;

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="title description">
  <title id="title">${safeCounty} liquor license map</title>
  <desc id="description">${description}</desc>
  <defs>
    <linearGradient id="map-background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#061728"/>
      <stop offset="1" stop-color="#0d2942"/>
    </linearGradient>
    <filter id="county-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="560" height="300" fill="url(#map-background)"/>
  <g stroke-linejoin="round" stroke-linecap="round">${paths.join("")}</g>
</svg>`;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("County map generation failed", error);
    return new Response("County map unavailable", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
