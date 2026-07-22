import { availableListings, type Listing } from "@/data/listings";

export const dynamic = "force-dynamic";

type CarouselListing = Pick<Listing, "county" | "type" | "priceLabel" | "sourceRef"> & {
  mapUrl: string;
};

function floridaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

function seedFromString(value: string) {
  let seed = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    seed ^= value.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}

function seededRandom(seed: number) {
  return () => {
    seed += 0x6d2b79f5;
    let result = seed;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function selectDailyCarouselListings(dateKey: string) {
  const shuffled = availableListings.map((listing) => ({
    county: listing.county,
    type: listing.type,
    priceLabel: listing.priceLabel,
    sourceRef: listing.sourceRef,
    mapUrl: `/api/county-map?county=${encodeURIComponent(listing.county)}`,
  }));
  const random = seededRandom(seedFromString(`fllm-home-carousel-${dateKey}`));

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.slice(0, Math.min(10, shuffled.length));
}

function replaceSection(
  html: string,
  startMarker: string,
  endMarker: string,
  transform: (section: string) => string,
) {
  const start = html.indexOf(startMarker);
  if (start < 0) return html;

  const end = html.indexOf(endMarker, start);
  if (end < 0) return html;

  return `${html.slice(0, start)}${transform(html.slice(start, end))}${html.slice(end)}`;
}

function updateServerRenderedTransactions(html: string) {
  return replaceSection(html, "Recent Florida Transactions", "Florida Market Insights", (section) => {
    const replacements: Array<[string, string]> = [
      ["$965,000", "$575,000"],
      ["Brevard County", "Miami-Dade County"],
      ["2COP Quota", "4COP Quota"],
      ["Broward County", "Lee County"],
      ["3PS License", "4COP Quota"],
      ["$615,000", "$425,000"],
      ["Hillsborough County", "St. Johns County"],
      ["$495,000", "$425,000"],
      ["Collier County", "Sarasota County"],
      ["3COP License", "3PS Quota / Package Store"],
      ["$330,000", "$340,000"],
      ["$585,000", "$495,000"],
    ];

    return replacements.reduce((updated, [from, to]) => updated.replace(from, to), section);
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function listingHref(listing: Pick<Listing, "county" | "type" | "sourceRef">) {
  const description = encodeURIComponent(`${listing.county} ${listing.type}`);
  const reference = encodeURIComponent(listing.sourceRef ?? "");
  return `/contact?listing=${description}&ref=${reference}`;
}

function renderListingCard(listing: CarouselListing) {
  const county = escapeHtml(listing.county);
  const type = escapeHtml(listing.type);
  const price = escapeHtml(listing.priceLabel);
  const mapUrl = escapeHtml(listing.mapUrl);
  const href = escapeHtml(listingHref(listing));

  return `<article class="listing-card" data-homepage-available-card="true">
    <a class="homepage-carousel-card-link" href="${href}" aria-label="View ${county} ${type} listing">
      <div class="listing-photo homepage-county-map-panel">
        <img class="homepage-county-map" src="${mapUrl}" alt="Florida map with ${county} highlighted" loading="lazy"/>
        <span>${type}</span>
      </div>
      <div class="listing-body">
        <p>● ${county}</p>
        <h3>${price}</h3>
        <div class="listing-facts"><span>${type}</span><span>Available</span></div>
      </div>
    </a>
  </article>`;
}

function replaceDivContentsByClass(html: string, className: string, contents: string) {
  const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const openingPattern = new RegExp(`<div\\b[^>]*class="[^"]*\\b${escapedClass}\\b[^"]*"[^>]*>`, "i");
  const openingMatch = openingPattern.exec(html);
  if (!openingMatch) return html;

  const contentStart = openingMatch.index + openingMatch[0].length;
  const divPattern = /<div\b[^>]*>|<\/div\s*>/gi;
  divPattern.lastIndex = contentStart;
  let depth = 1;
  let token: RegExpExecArray | null;

  while ((token = divPattern.exec(html))) {
    if (/^<\/div/i.test(token[0])) depth -= 1;
    else depth += 1;

    if (depth === 0) {
      return `${html.slice(0, contentStart)}${contents}${html.slice(token.index)}`;
    }
  }

  return html;
}

function renderServerRenderedAvailableListings(html: string, carouselListings: CarouselListing[]) {
  return replaceSection(html, "Featured Florida Liquor Licenses", "Video Briefing", (section) =>
    replaceDivContentsByClass(
      section,
      "listing-grid",
      carouselListings.map(renderListingCard).join(""),
    ),
  );
}

export async function GET(request: Request) {
  try {
    const dailyKey = floridaDateKey();
    const carouselListings = selectDailyCarouselListings(dailyKey);
    const sourceUrl = new URL("/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Static homepage returned ${sourceResponse.status}`);
    }

    const sourceHtml = await sourceResponse.text();
    let enhancedHtml = renderServerRenderedAvailableListings(
      updateServerRenderedTransactions(sourceHtml),
      carouselListings,
    );

    const carouselStyle = `<style id="homepage-available-carousel-styles">
      .homepage-carousel-card-link{display:block;height:100%;color:inherit;text-decoration:none}
      .homepage-carousel-card-link:focus-visible{outline:3px solid #f6a700;outline-offset:-3px}
      .homepage-county-map-panel{background:#061728}
      .homepage-county-map-panel .homepage-county-map{width:100%;height:100%;object-fit:contain;object-position:center;display:block}
    </style>`;
    if (!enhancedHtml.includes('id="homepage-available-carousel-styles"')) {
      enhancedHtml = enhancedHtml.replace("</head>", `${carouselStyle}</head>`);
    }

    const inventoryData = JSON.stringify(carouselListings).replaceAll("<", "\\u003c");
    const inventoryScript = `<script id="homepage-available-listings-data">window.__FLLM_AVAILABLE_LISTINGS__=${inventoryData};window.__FLLM_AVAILABLE_LISTINGS_DATE__=${JSON.stringify(dailyKey)};</script>`;
    if (!enhancedHtml.includes('id="homepage-available-listings-data"')) {
      enhancedHtml = enhancedHtml.replace("</body>", `${inventoryScript}</body>`);
    }

    const scriptTags = [
      '<script defer src="/assets/market-map-modal.js"></script>',
      '<script defer src="/assets/recent-transactions.js"></script>',
      '<script defer src="/assets/completed-sales-logo-size.js"></script>',
      '<script defer src="/assets/market-insights-popup-size.js"></script>',
      '<script defer src="/assets/homepage-listing-search.js"></script>',
      '<script defer src="/assets/market-data-dropdown.js"></script>',
      '<script defer src="/assets/resources-dropdown.js"></script>',
      '<script defer src="/assets/header-menu-coordinator.js"></script>',
      '<script defer src="/assets/featured-sold-status.js"></script>',
      '<script defer src="/assets/newscast-screen-logo-v3.js"></script>',
    ];

    const tagsToAdd = scriptTags.filter((tag) => !enhancedHtml.includes(tag)).join("");
    if (tagsToAdd) enhancedHtml = enhancedHtml.replace("</body>", `${tagsToAdd}</body>`);

    return new Response(enhancedHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Homepage enhancement failed", error);
    return Response.redirect(new URL("/index.html", request.url), 307);
  }
}
