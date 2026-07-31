import { featuredCounties, countySlug } from "@/data/florida-counties";
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

function countyHref(listing: Pick<Listing, "county">) {
  return `/counties/${countySlug(listing.county)}`;
}

function renderListingCard(listing: CarouselListing) {
  const county = escapeHtml(listing.county);
  const type = escapeHtml(listing.type);
  const price = escapeHtml(listing.priceLabel);
  const mapUrl = escapeHtml(listing.mapUrl);
  const href = escapeHtml(countyHref(listing));

  return `<article class="listing-card" data-homepage-available-card="true">
    <a class="homepage-carousel-card-link" href="${href}" aria-label="View the ${county} liquor license market page">
      <div class="listing-photo homepage-county-map-panel">
        <img class="homepage-county-map" src="${mapUrl}" alt="Florida map with ${county} highlighted" loading="lazy"/>
        <span>${type}</span>
      </div>
      <div class="listing-body">
        <p>â— ${county}</p>
        <h3>${price}</h3>
        <div class="listing-facts"><span>${type}</span><span class="homepage-available-status">Available</span></div>
        <small class="homepage-county-market-label">View County Market â€º</small>
      </div>
    </a>
  </article>`;
}

function renderCountyDirectorySection() {
  const countyLinks = featuredCounties.map((county) => `
    <a href="/counties/${county.slug}">
      <span><strong>${escapeHtml(county.name)}</strong><small>${escapeHtml(county.primaryCities.join(" Â· "))}</small></span>
      <i>View Market â€º</i>
    </a>`).join("");

  return `<section class="homepage-county-directory" id="homepage-county-directory" aria-labelledby="homepage-county-directory-title">
    <div class="page-shell">
      <div class="homepage-county-directory-heading">
        <div><span>Permanent County Market Pages</span><h2 id="homepage-county-directory-title">Browse Florida Liquor Licenses by County</h2><p>Explore current listings, disclosed asking-price ranges, financing links, and county-specific market guidance.</p></div>
        <a class="homepage-county-directory-all" href="/counties">Browse All 67 Counties â€º</a>
      </div>
      <div class="homepage-county-directory-grid">${countyLinks}</div>
    </div>
  </section>`;
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

function removeSecondHeroTrustIcon(html: string) {
  return html.replace(/<img\b[^>]*class="[^"]*\btrust-icon\b[^"]*"[^>]*>/i, "");
}

function insertCountyDirectory(html: string) {
  if (html.includes('id="homepage-county-directory"')) return html;
  const section = renderCountyDirectorySection();
  const footerIndex = html.search(/<footer\b/i);
  if (footerIndex >= 0) return `${html.slice(0, footerIndex)}${section}${html.slice(footerIndex)}`;
  return html.replace("</body>", `${section}</body>`);
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
    let enhancedHtml = insertCountyDirectory(removeSecondHeroTrustIcon(
      renderServerRenderedAvailableListings(
        updateServerRenderedTransactions(sourceHtml),
        carouselListings,
      ),
    ));

    const carouselStyle = `<style id="homepage-available-carousel-styles-v7">
      .homepage-carousel-card-link{display:block;height:100%;color:inherit;text-decoration:none}
      .homepage-carousel-card-link:focus-visible{outline:3px solid #f6a700;outline-offset:-3px}
      .homepage-county-map-panel{background:#061728}
      .homepage-county-map-panel .homepage-county-map{width:100%;height:100%;object-fit:contain;object-position:center;display:block}
      .market-page .listing-card[data-homepage-available-card="true"] .listing-body .listing-facts .homepage-available-status,
      .market-page .listing-card[data-homepage-available-card="true"] .listing-body .listing-facts .homepage-available-status:first-letter,
      .market-page .listing-card[data-homepage-available-card="true"] .listing-body .listing-facts .homepage-available-status::first-letter{color:#58c94f!important}
      .market-page .listing-card[data-homepage-available-card="true"] .listing-body .listing-facts span:first-child:first-letter,
      .market-page .listing-card[data-homepage-available-card="true"] .listing-body .listing-facts span:first-child::first-letter{color:#000!important}
      .homepage-county-market-label{display:block;margin-top:8px;color:#a96f00;font-size:10px;font-weight:900;text-transform:uppercase}
      .homepage-county-directory{padding:72px 0;border-top:1px solid #806322;border-bottom:1px solid #806322;background:radial-gradient(circle at 50% 0%,#111719,#050708 70%);color:#f5f4ef}
      .homepage-county-directory-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:28px;margin-bottom:24px}
      .homepage-county-directory-heading>div>span{display:block;color:#f1a600;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
      .homepage-county-directory-heading h2{margin:8px 0 8px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(31px,3.6vw,46px);line-height:1.05}
      .homepage-county-directory-heading p{max-width:760px;margin:0;color:#bcc6cb;font-size:13px;line-height:1.6}
      .homepage-county-directory-all{flex:0 0 auto;color:#f1a600;font-size:12px;font-weight:900;text-decoration:none}
      .homepage-county-directory-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .homepage-county-directory-grid>a{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:78px;padding:18px;border:1px solid #775d23;border-radius:4px;background:linear-gradient(145deg,#111516,#080a0b);text-decoration:none}
      .homepage-county-directory-grid>a:hover{border-color:#d29200;transform:translateY(-1px)}
      .homepage-county-directory-grid strong{display:block;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:19px}
      .homepage-county-directory-grid small{display:block;margin-top:4px;color:#9da8ae;font-size:10px}
      .homepage-county-directory-grid i{flex:0 0 auto;color:#f1a600;font-size:10px;font-style:normal;font-weight:900;text-transform:uppercase}
      .hero .trust-line img{display:none!important}
      #market-report-narration-button-v1{display:none!important}
      @media(max-width:720px){.homepage-county-directory{padding:50px 0}.homepage-county-directory-heading{display:block}.homepage-county-directory-all{display:inline-block;margin-top:14px}.homepage-county-directory-grid{grid-template-columns:1fr}.homepage-county-directory-grid>a{align-items:flex-start}}
    </style>`;
    if (!enhancedHtml.includes('id="homepage-available-carousel-styles-v7"')) {
      enhancedHtml = enhancedHtml.replace("</head>", `${carouselStyle}</head>`);
    }

    const inventoryData = JSON.stringify(carouselListings).replaceAll("<", "\\u003c");
    const inventoryScript = `<script id="homepage-available-listings-data">window.__FLLM_AVAILABLE_LISTINGS__=${inventoryData};window.__FLLM_AVAILABLE_LISTINGS_DATE__=${JSON.stringify(dailyKey)};</script>`;
    if (!enhancedHtml.includes('id="homepage-available-listings-data"')) {
      enhancedHtml = enhancedHtml.replace("</body>", `${inventoryScript}</body>`);
    }

    enhancedHtml = enhancedHtml
      .replace(/<script[^>]+market-insights-video-popup-v4\.js[^>]*><\/script>/gi, "")
      .replace(/<script[^>]+market-map-modal\.js[^>]*><\/script>/gi, "")
      .replace(/<script[^>]+market-data-dropdown\.js[^>]*><\/script>/gi, "")
      .replace(/<script[^>]+market-heat-map\.js[^>]*><\/script>/gi, "")
      .replace(/<script[^>]+market-heat-map-fit-v4\.js[^>]*><\/script>/gi, "")
      .replace(/<script[^>]+market-heat-map-modal-size-v1\.js[^>]*><\/script>/gi, "")
      .replace(/<script[^>]+market-heat-map-popup-cards-v[123]\.js[^>]*><\/script>/gi, "")
      .replace(/<script[^>]+market-heat-map-county-links-v1\.js[^>]*><\/script>/gi, "");

    const scriptTags = [
      '<script defer src="/assets/market-map-modal.js?v=4"></script>',
      '<script defer src="/assets/recent-transactions.js"></script>',
      '<script defer src="/assets/completed-sales-logo-size.js"></script>',
      '<script defer src="/assets/market-insights-popup-size.js"></script>',
      '<script defer src="/assets/homepage-listing-search.js"></script>',
      '<script defer src="/assets/market-data-dropdown.js?v=5"></script>',
      '<script defer src="/assets/market-heat-map-fit-v4.js?v=7"></script>',
      '<script defer src="/assets/market-heat-map.js?v=4"></script>',
      '<script defer src="/assets/market-heat-map-popup-cards-v3.js?v=2"></script>',
      '<script defer src="/assets/market-heat-map-county-links-v1.js?v=1"></script>',
      '<script defer src="/assets/resources-dropdown.js?v=7"></script>',
      '<script defer src="/assets/header-menu-coordinator.js"></script>',
      '<script defer src="/assets/featured-sold-status.js?v=4"></script>',
      '<script defer src="/assets/newscast-screen-logo-v10.js?v=3"></script>',
      '<script defer src="/assets/homepage-video-controls-fix-v1.js?v=4"></script>',
      '<script defer src="/assets/homepage-synced-captions-v1.js?v=4"></script>',
      '<script defer src="/assets/homepage-video-scroll-fix-v1.js?v=3"></script>',
    ];

    const tagsToAdd = scriptTags.filter((tag) => !enhancedHtml.includes(tag)).join("");
    if (tagsToAdd) enhancedHtml = enhancedHtml.replace("</body>", `${tagsToAdd}</body>`);

    return new Response(enhancedHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Homepage enhancement failed", error);
    return Response.redirect(new URL("/index.html", request.url), 307);
  }
}

