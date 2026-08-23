import { buildFloridaMarketIndex, csvEscape } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function value(amount: number | null) {
  return amount === null ? "" : amount;
}

export async function GET() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const snapshot = buildFloridaMarketIndex(listings);

  const rows: Array<Array<string | number | null>> = [
    [
      "County",
      "Primary Cities",
      "2024 Population",
      "Active Listings",
      "4COP Active",
      "3PS Active",
      "Disclosed Asking Prices",
      "Median Asking Price",
      "Lowest Asking Price",
      "Highest Asking Price",
      "4COP Median Ask",
      "3PS Median Ask",
      "2026 New Quota Licenses",
      "Snapshot Generated At",
    ],
    ...snapshot.countyRows.map((row) => [
      row.county,
      row.cities.join(" | "),
      row.population,
      row.activeListings,
      row.fourCopCount,
      row.threePsCount,
      row.all.count,
      value(row.all.median),
      value(row.all.low),
      value(row.all.high),
      value(row.fourCop.median),
      value(row.threePs.median),
      row.quotaDrawingLicenses,
      snapshot.generatedAt,
    ]),
  ];

  const csv = rows.map((row) => row.map((cell) => csvEscape(cell)).join(",")).join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fllm-florida-liquor-license-market-index-${snapshot.generatedAt.slice(0, 10)}.csv"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
