export const dynamic = "force-dynamic";

const soldFeaturedListings = [
  ["Miami-Dade County", "$495,000"],
  ["Palm Beach County", "$575,000"],
  ["Sarasota County", "$340,000"],
  ["Lee County", "$425,000"],
  ["St. Johns County", "$425,000"],
] as const;

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

function removeServerRenderedSoldFeaturedListings(html: string) {
  return replaceSection(html, "Featured Florida Liquor Licenses", "Video Briefing", (section) => {
    const listingCardPattern = /<article\b[^>]*class="[^"]*\blisting-card\b[^"]*"[^>]*>[\s\S]*?<\/article>/g;
    const carouselArrowPattern = /<button\b[^>]*class="[^"]*\bcarousel-arrow\b[^"]*"[^>]*>[\s\S]*?<\/button>/g;

    const availableOnly = section.replace(listingCardPattern, (card) => {
      const isSold = soldFeaturedListings.some(
        ([county, price]) => card.includes(county) && card.includes(price),
      );
      return isSold ? "" : card;
    });

    const remainingCards = availableOnly.match(/\blisting-card\b/g)?.length ?? 0;
    return remainingCards <= 4
      ? availableOnly.replace(carouselArrowPattern, "")
      : availableOnly;
  });
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
    const correctedHtml = removeServerRenderedSoldFeaturedListings(
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
