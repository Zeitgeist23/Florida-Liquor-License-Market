export const dynamic = "force-dynamic";

const soldFeaturedCounties = [
  "Miami-Dade County",
  "Palm Beach County",
  "Sarasota County",
  "Lee County",
  "St. Johns County",
];

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

function updateServerRenderedFeaturedListings(html: string) {
  let updated = replaceSection(html, "Featured Florida Liquor Licenses", "Video Briefing", (section) => {
    let featured = section;

    soldFeaturedCounties.forEach((county) => {
      const countyIndex = featured.indexOf(county);
      if (countyIndex < 0) return;

      const badge = '<span class="featured-sold-badge" aria-label="Sold listing">SOLD</span> ';
      const preceding = featured.slice(Math.max(0, countyIndex - 140), countyIndex);
      if (!preceding.includes("featured-sold-badge")) {
        featured = `${featured.slice(0, countyIndex)}${badge}${featured.slice(countyIndex)}`;
      }

      const refreshedCountyIndex = featured.indexOf(county);
      const transferableIndex = featured.indexOf("Transferable", refreshedCountyIndex);
      if (transferableIndex >= 0 && transferableIndex - refreshedCountyIndex < 1400) {
        featured = `${featured.slice(0, transferableIndex)}SOLD${featured.slice(transferableIndex + "Transferable".length)}`;
      }
    });

    return featured;
  });

  const styleTag = `<style id="server-featured-sold-styles">
    .featured-sold-badge{display:inline-flex;align-items:center;justify-content:center;margin:0 8px 4px 0;padding:4px 9px;border:1px solid #ffbf2f;border-radius:4px;background:#9f1111;color:#fff;font:900 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 4px 12px rgba(0,0,0,.24)}
  </style>`;

  if (!updated.includes('id="server-featured-sold-styles"')) {
    updated = updated.replace("</head>", `${styleTag}</head>`);
  }

  return updated;
}

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Static homepage returned ${sourceResponse.status}`);
    }

    const sourceHtml = await sourceResponse.text();
    const correctedHtml = updateServerRenderedFeaturedListings(
      updateServerRenderedTransactions(sourceHtml),
    );

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
    ];

    const tagsToAdd = scriptTags.filter((tag) => !correctedHtml.includes(tag)).join("");
    const enhancedHtml = tagsToAdd
      ? correctedHtml.replace("</body>", `${tagsToAdd}</body>`)
      : correctedHtml;

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
