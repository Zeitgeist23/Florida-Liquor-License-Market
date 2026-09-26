import { countySlug, getCountyBySlug } from "@/data/florida-counties";
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
        getCountyBySlug(countySlug(listing.county))?.primaryCities ?? [],
      ),
    ),
  ).slice(0, 14);

  if (!cities.length) return null;

  return (
    <p className="business-package-local-markets">
      <strong>{label}:</strong> {cities.join(" · ")}
    </p>
  );
}
