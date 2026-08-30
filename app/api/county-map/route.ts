import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

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
    const matchedTarget = FLORIDA_COUNTY_PATHS.some(
      (entry) => normalizeCounty(entry.name) === target,
    );
    const paths = FLORIDA_COUNTY_PATHS.map((entry) =>
      countyPath(entry.name, entry.path, target),
    );

    if (paths.length < 60) {
      throw new Error(`Only ${paths.length} county paths were found`);
    }

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
