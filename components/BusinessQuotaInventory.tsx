"use client";

import { useMemo, useState } from "react";

import type { BusinessQuotaListing } from "@/lib/business-quota-listings";
import BusinessQuotaListingCard from "./BusinessQuotaListingCard";
import ListingsHoverSelect, {
  type ListingsHoverSelectOption,
} from "./ListingsHoverSelect";

const listingTypeOptions: readonly ListingsHoverSelectOption[] = [
  { value: "all", label: "All Listings" },
  { value: "quota", label: "Quota Licenses" },
  { value: "4COP Quota", label: "4COP Quota" },
  { value: "3PS Quota / Package Store", label: "3PS Quota / Package Store" },
  { value: "businesses", label: "Businesses w/ Quota Licenses" },
  { value: "businesses-sfs", label: "Businesses w/ 4COP SFS / SRX Licenses" },
];

const availabilityOptions: readonly ListingsHoverSelectOption[] = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "all", label: "All" },
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
  const [availability, setAvailability] = useState("available");

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
          availability !== "sold" &&
          (county === "all" || listing.county === county) &&
          priceMatches(listing.packagePriceNumber, price),
      ),
    [availability, county, listings, price],
  );

  function changeListingType(value: string) {
    if (value === "businesses") return;

    const params = new URLSearchParams();
    if (value !== "all") params.set("type", value);
    const query = params.toString();
    window.location.assign(`/listings${query ? `?${query}` : ""}`);
  }

  function clearFilters() {
    setCounty("all");
    setPrice("all");
    setAvailability("available");
  }

  return (
    <>
      <div className="business-quota-heading">
        <div><span>Current Business Inventory</span><h2>Businesses That Include a Quota License</h2></div>
        <strong>{filtered.length} Active Package{filtered.length === 1 ? "" : "s"}</strong>
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
          <label>
            <span>Availability</span>
            <ListingsHoverSelect ariaLabel="Filter business listings by availability" value={availability} options={availabilityOptions} onChange={setAvailability} />
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
          {filtered.map((listing) => <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />)}
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
