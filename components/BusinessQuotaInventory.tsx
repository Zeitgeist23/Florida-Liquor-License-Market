"use client";

import { useMemo, useState } from "react";

import {
  BUSINESS_LISTING_DISPLAY_LIMIT,
  type BusinessQuotaCategory,
  type BusinessQuotaListing,
} from "@/lib/business-quota-listings";
import BusinessQuotaListingCard from "./BusinessQuotaListingCard";
import ListingsHoverSelect, {
  type ListingsHoverSelectOption,
} from "./ListingsHoverSelect";

const listingTypeOptions: readonly ListingsHoverSelectOption[] = [
  { value: "quota", label: "All Quota Liquor Licenses" },
  { value: "4COP Quota", label: "4COP Quota Liquor Licenses" },
  { value: "3PS Quota / Package Store", label: "3PS Quota / Package Store Licenses" },
  { value: "businesses", label: "Businesses w/ Quota Licenses" },
  { value: "businesses-sfs", label: "Businesses w/ 4COP SFS / SRX Licenses" },
];

const businessCategoryClassNames: Record<BusinessQuotaCategory, string> = {
  Bar: "bar",
  "Cocktail Lounge": "cocktail-lounge",
  Nightclub: "nightclub",
  Restaurant: "restaurant",
  "Bowling Alley": "bowling-alley",
  "Liquor Store": "liquor-store",
  Marina: "marina",
  "Gentlemen's Club": "gentlemens-club",
  "Hotel / Motel": "hotel-motel",
  "Country Club": "country-club",
  "Other Hospitality": "other-hospitality",
};

const businessTypeOptions: readonly ListingsHoverSelectOption[] = [
  { value: "all", label: "All Business Types" },
  ...(
    [
      "Bar",
      "Cocktail Lounge",
      "Nightclub",
      "Restaurant",
      "Liquor Store",
      "Marina",
      "Gentlemen's Club",
      "Hotel / Motel",
      "Country Club",
      "Bowling Alley",
      "Other Hospitality",
    ] as const
  ).map((category) => ({
    value: category,
    label: category,
    badgeClassName:
      `business-quota-category business-quota-category--title business-quota-category--${businessCategoryClassNames[category]} business-filter-type-badge`,
  })),
];

const priceOptions: readonly ListingsHoverSelectOption[] = [
  { value: "all", label: "All Prices" },
  { value: "under150", label: "Under $150,000" },
  { value: "150to350", label: "$150,000–$350,000" },
  { value: "350to500", label: "$350,000–$500,000" },
  { value: "500to1m", label: "$500,000–$1 Million" },
  { value: "over1m", label: "Over $1 Million" },
];

function priceMatches(price: number, range: string) {
  return (
    range === "all" ||
    (range === "under150" && price < 150000) ||
    (range === "150to350" && price >= 150000 && price < 350000) ||
    (range === "350to500" && price >= 350000 && price <= 500000) ||
    (range === "500to1m" && price > 500000 && price <= 1000000) ||
    (range === "over1m" && price > 1000000)
  );
}

export default function BusinessQuotaInventory({
  listings,
}: {
  listings: BusinessQuotaListing[];
}) {
  const [county, setCounty] = useState("all");
  const [price, setPrice] = useState("all");
  const [businessType, setBusinessType] = useState("all");

  const countyOptions = useMemo<readonly ListingsHoverSelectOption[]>(
    () => [
      { value: "all", label: "All Florida Counties" },
      ...Array.from(new Set(listings.map((listing) => listing.county)))
        .sort()
        .map((name) => ({ value: name, label: name })),
    ],
    [listings],
  );

  const filtered = useMemo(
    () =>
      listings.filter(
        (listing) =>
          (businessType === "all" || listing.businessCategory === businessType) &&
          (county === "all" || listing.county === county) &&
          priceMatches(listing.packagePriceNumber, price),
      ),
    [businessType, county, listings, price],
  );

  const visibleListings = useMemo(
    () => filtered.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT),
    [filtered],
  );

  function changeListingType(value: string) {
    if (value === "businesses") return;

    if (value === "quota") {
      window.location.assign("/listings");
      return;
    }

    const params = new URLSearchParams({ type: value });
    window.location.assign(`/listings?${params.toString()}`);
  }

  function clearFilters() {
    setCounty("all");
    setPrice("all");
    setBusinessType("all");
  }

  return (
    <>
      <div className="business-quota-heading">
        <div><span>Current Business Inventory</span><h2>Businesses That Include a Quota License</h2></div>
        <strong>
          {visibleListings.length}
          {filtered.length > BUSINESS_LISTING_DISPLAY_LIMIT ? ` of ${filtered.length}` : ""} Active Package
          {filtered.length === 1 ? "" : "s"}
        </strong>
      </div>

      <div className="business-quota-filter-bar results-page">
        <form className="results-filters" onSubmit={(event) => event.preventDefault()}>
          <label>
            <span>County</span>
            <ListingsHoverSelect ariaLabel="Filter business listings by Florida county" value={county} options={countyOptions} onChange={setCounty} />
          </label>
          <label>
            <span>Listing Type</span>
            <ListingsHoverSelect ariaLabel="Select listing inventory" value="businesses" options={listingTypeOptions} onChange={changeListingType} />
          </label>
          <label>
            <span>Price Range</span>
            <ListingsHoverSelect ariaLabel="Filter business listings by package price" value={price} options={priceOptions} onChange={setPrice} />
          </label>
          <label className="business-type-filter">
            <span>Business Type</span>
            <ListingsHoverSelect
              ariaLabel="Filter business listings by business type"
              value={businessType}
              options={businessTypeOptions}
              onChange={setBusinessType}
            />
          </label>
          <button className="btn btn-gold" type="button" onClick={() => window.location.assign("/market-data/heat-map")}>Heat Map</button>
        </form>
      </div>

      <div className="business-quota-separation-note">
        <strong>Looking for a license without a business?</strong>
        <span>FLLM keeps separately purchasable quota licenses in the dedicated standalone inventory.</span>
        <button type="button" onClick={() => window.location.assign("/listings")}>Browse standalone quota licenses ›</button>
      </div>

      {filtered.length ? (
        <div className="business-quota-grid">
          {visibleListings.map((listing) => <BusinessQuotaListingCard key={`${listing.listingReference}-${listing.county}-${listing.businessCategory}-${listing.packagePriceNumber}`} listing={listing} />)}
        </div>
      ) : (
        <div className="business-quota-no-results">
          <strong>No business packages match these filters.</strong>
          <button type="button" onClick={clearFilters}>Clear all filters</button>
        </div>
      )}
    </>
  );
}
