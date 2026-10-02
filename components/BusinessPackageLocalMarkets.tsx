import { countySlug, floridaCounties } from "@/data/florida-counties";
import type { BusinessQuotaListing } from "@/lib/business-quota-listings";

export default function BusinessPackageLocalMarkets({
  listings,
  label = "Primary markets in current inventory",
}: {
  listings: readonly BusinessQuotaListing[];
  label?: string;
}) {
  const cities = Array.from(
    new Set(
      listings.flatMap((listing) =>
        floridaCounties.find((county) => county.slug === countySlug(listing.county))?.primaryCities ?? [],
      ),
    ),
  ).slice(0, 14);

  if (!cities.length) return null;

  return (
    <p className="business-package-local-markets">
      <strong>{label}:</strong>{" "}
      {cities.map((city, index) => (
        <span key={city}>
          <span className="business-package-local-market-city">{city}</span>
          {index < cities.length - 1 ? <span className="business-package-local-market-separator"> · </span> : null}
        </span>
      ))}
    </p>
  );
}
