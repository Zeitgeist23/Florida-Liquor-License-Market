"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Listing } from "@/data/listings";
import type {
  BusinessQuotaCategory,
  BusinessQuotaListing,
} from "@/lib/business-quota-listings";
import BusinessQuotaListingCard from "./BusinessQuotaListingCard";
import FormsSiteHeader from "./FormsSiteHeader";
import ListingsHoverSelect, {
  type ListingsHoverSelectOption,
} from "./ListingsHoverSelect";
import MarketplaceListingCard from "./MarketplaceListingCard";

const counties =
  `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(
    ",",
  );

const countyOptions: readonly ListingsHoverSelectOption[] = [
  { value: "all", label: "All Florida Counties" },
  ...counties.map((name) => ({ value: name, label: name })),
];

const licenseTypeOptions: readonly ListingsHoverSelectOption[] = [
  { value: "quota", label: "All Quota Liquor Licenses" },
  { value: "4COP Quota", label: "4COP Quota Liquor Licenses" },
  { value: "3PS Quota / Package Store", label: "3PS Quota / Package Store Licenses" },
  { value: "businesses", label: "Businesses w/ Quota Licenses" },
  { value: "businesses-sfs", label: "Businesses w/ 4COP SFS / SRX Licenses" },
  { value: "businesses-2cop", label: "Businesses with 2COP Beer & Wine Licenses" },
];

const priceOptions: readonly ListingsHoverSelectOption[] = [
  { value: "all", label: "All Prices" },
  { value: "under150", label: "Under $150,000" },
  { value: "150to350", label: "$150,000–$350,000" },
  { value: "350to500", label: "$350,000–$500,000" },
  { value: "500to1m", label: "$500,000–$1 Million" },
  { value: "over1m", label: "Over $1 Million" },
];

const availabilityOptions: readonly ListingsHoverSelectOption[] = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "all", label: "All" },
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

const businessCategoryOrder: readonly BusinessQuotaCategory[] = [
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
];

const LISTINGS_PAGE_SIZE = 24;

const faqLinks = [
  {
    question: "How do I buy a Florida liquor license?",
    label: "Step-by-step buyer guide",
    href: "/how-to-buy-florida-liquor-license",
  },
  {
    question: "What is a Florida 4COP quota liquor license?",
    label: "4COP buyer guide",
    href: "/florida-4cop-liquor-license-for-sale",
  },
  {
    question: "What is a Florida 3PS liquor license?",
    label: "3PS buyer guide",
    href: "/florida-3ps-liquor-license-for-sale",
  },
  {
    question: "What does a Florida liquor license cost?",
    label: "Cost and pricing guide",
    href: "/florida-quota-liquor-license-cost",
  },
  {
    question: "Can I search Florida liquor licenses by county?",
    label: "County market guide",
    href: "/counties",
  },
  {
    question:
      "Does a liquor-license listing include a restaurant or real estate?",
    label: "License types guide",
    href: "/resources/florida-liquor-license-types",
  },
];

function priceMatches(price: number | null, range: string) {
  if (range === "all") return true;
  if (price === null) return false;
  return (
    (range === "under150" && price < 150000) ||
    (range === "150to350" && price >= 150000 && price < 350000) ||
    (range === "350to500" && price >= 350000 && price <= 500000) ||
    (range === "500to1m" && price > 500000 && price <= 1000000) ||
    (range === "over1m" && price > 1000000)
  );
}

function listingIdentity(
  listing: Pick<
    Listing,
    "county" | "type" | "price" | "priceLabel" | "sourceRef"
  >,
) {
  const reference = listing.sourceRef?.trim().toLowerCase();
  return reference
    ? `reference:${reference}`
    : `market:${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

type ListingsPageProps = {
  initialListings: Listing[];
  businessListings: BusinessQuotaListing[];
  businessSfsListings: BusinessQuotaListing[];
  business2copListings: BusinessQuotaListing[];
  focusReference?: string | null;
};

export default function ListingsPage({
  initialListings,
  businessListings,
  businessSfsListings,
  business2copListings,
  focusReference = null,
}: ListingsPageProps) {
  const [county, setCounty] = useState("all");
  const [type, setType] = useState("quota");
  const [price, setPrice] = useState("all");
  const [status, setStatus] = useState("available");
  const [businessType, setBusinessType] = useState("all");
  const [visibleCount, setVisibleCount] = useState(LISTINGS_PAGE_SIZE);
  const focusedCardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get("type");
    const requestedStatus = params.get("status");

    if (requestedType === "all") {
      setType("quota");
    } else if (
      requestedType &&
      ["quota", "4COP Quota", "3PS Quota / Package Store", "businesses", "businesses-sfs", "businesses-2cop"].includes(requestedType)
    ) {
      setType(requestedType);
    }
    if (requestedStatus && ["available", "sold", "all"].includes(requestedStatus)) {
      setStatus(requestedStatus);
    }
  }, []);

  const normalizedFocusReference = focusReference?.trim().toLowerCase() || "";
  const focusListing = useMemo(
    () =>
      normalizedFocusReference
        ? initialListings.find(
            (listing) =>
              listing.sourceRef?.trim().toLowerCase() ===
              normalizedFocusReference,
          )
        : undefined,
    [initialListings, normalizedFocusReference],
  );
  const focusIdentity = focusListing ? listingIdentity(focusListing) : "";

  const marketplaceListings = useMemo(
    () =>
      Array.from(
        new Map(
          initialListings.map((listing) => [listingIdentity(listing), listing]),
        ).values(),
      ).sort(
        (left, right) => {
          const featuredOrder =
            Number(Boolean(right.featuredUntil)) -
            Number(Boolean(left.featuredUntil));
          if (featuredOrder !== 0) return featuredOrder;

          const leftPublished = left.publishedAt
            ? new Date(left.publishedAt).getTime()
            : 0;
          const rightPublished = right.publishedAt
            ? new Date(right.publishedAt).getTime()
            : 0;
          return rightPublished - leftPublished;
        },
      ),
    [initialListings],
  );

  const orderedMarketplaceListings = useMemo(() => {
    if (!focusIdentity) return marketplaceListings;

    const selected: Listing[] = [];
    const remaining: Listing[] = [];
    for (const listing of marketplaceListings) {
      if (listingIdentity(listing) === focusIdentity) selected.push(listing);
      else remaining.push(listing);
    }
    return [...selected, ...remaining];
  }, [focusIdentity, marketplaceListings]);

  const availableCount = useMemo(
    () =>
      marketplaceListings.filter((listing) => Boolean(listing.sourceRef))
        .length,
    [marketplaceListings],
  );

  const filtered = useMemo(
    () =>
      orderedMarketplaceListings.filter(
        (listing) =>
          (county === "all" || listing.county === county) &&
          (type === "quota" || listing.type === type) &&
          priceMatches(listing.price, price) &&
          (status === "all" ||
            (status === "available"
              ? Boolean(listing.sourceRef)
              : !listing.sourceRef)),
      ),
    [county, type, price, status, orderedMarketplaceListings],
  );

  const showingQuotaBusinessListings = type === "businesses";
  const showingSfsBusinessListings = type === "businesses-sfs";
  const showing2copBusinessListings = type === "businesses-2cop";
  const showingBusinessListings = showingQuotaBusinessListings || showingSfsBusinessListings || showing2copBusinessListings;
  const activeBusinessListings = showing2copBusinessListings ? business2copListings : showingSfsBusinessListings ? businessSfsListings : businessListings;
  const businessTypeOptions = useMemo<readonly ListingsHoverSelectOption[]>(() => {
    const activeCategories = new Set(
      activeBusinessListings.map((listing) => listing.businessCategory),
    );

    return [
      { value: "all", label: "All Business Types" },
      ...businessCategoryOrder
        .filter((category) => activeCategories.has(category))
        .map((category) => ({
          value: category,
          label: category,
          badgeClassName:
            `business-quota-category business-quota-category--title business-quota-category--${businessCategoryClassNames[category]} business-filter-type-badge`,
        })),
    ];
  }, [activeBusinessListings]);

  const filteredBusinessListings = useMemo(
    () =>
      activeBusinessListings.filter(
        (listing) =>
          status !== "sold" &&
          (businessType === "all" || listing.businessCategory === businessType) &&
          (county === "all" || listing.county === county) &&
          priceMatches(listing.packagePriceNumber, price),
      ),
    [activeBusinessListings, businessType, county, price, status],
  );

  const visibleListings = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  useEffect(() => {
    setVisibleCount(LISTINGS_PAGE_SIZE);
  }, [businessType, county, type, price, status]);

  useEffect(() => {
    if (!focusIdentity) return;

    const revealSelectedListing = () => {
      focusedCardRef.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    };

    const frame = window.requestAnimationFrame(revealSelectedListing);
    const retry = window.setTimeout(revealSelectedListing, 650);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retry);
    };
  }, [focusIdentity, filtered.length]);

  function clearFilters() {
    setCounty("all");
    setType("quota");
    setPrice("all");
    setStatus("available");
    setBusinessType("all");
  }

  function changeListingType(value: string) {
    setBusinessType("all");
    setType(value);
  }

  return (
    <main className="results-page fllm-official-page" data-fllm-template="county-v1">
      <div className="listings-header-band"><FormsSiteHeader /></div>
      <section className="results-intro">
        <div className="page-shell">
          <div
            className="listings-hero-copy-transition"
            key={showingBusinessListings ? "businesses" : "licenses"}
          >
            {showingBusinessListings ? (
              <>
                <h1>
                  {showingSfsBusinessListings
                    ? "Florida Businesses With 4COP SFS / SRX Liquor Licenses"
                    : showing2copBusinessListings
                      ? "Florida Businesses With 2COP Beer & Wine Licenses"
                    : "Florida Businesses With Quota Liquor Licenses"}{" "}
                  <span>for Sale</span>
                </h1>
                <p className="listings-seo-intro">
                  {showingSfsBusinessListings
                    ? "Browse Florida restaurant businesses operating with location-specific 4COP SFS / SRX full-liquor privileges. These are business acquisitions, not sales of independently transferable quota licenses."
                    : showing2copBusinessListings
                      ? "Browse Florida restaurants and other operating businesses offered with a 2COP beer-and-wine license. These are business acquisitions, not standalone quota-license sales."
                    : "Browse Florida hospitality businesses for sale with included 4COP and 3PS quota liquor licenses, including asset sales, established operating businesses, restaurants, bars, lounges, cocktail lounges, nightclubs, country clubs, and gentlemen's clubs."}
                </p>
              </>
            ) : (
              <>
                <h1>
                  Florida Liquor Licenses{" "}
                  <span>for Sale</span>
                </h1>
                <p className="listings-seo-intro">
                  Browse {availableCount} current Florida liquor licenses for sale
                  across the statewide marketplace. Compare transferable{" "}
                  <Link href="/florida-4cop-liquor-license-for-sale">
                    4COP quota liquor licenses
                  </Link>{" "}
                  and{" "}
                  <Link href="/florida-3ps-liquor-license-for-sale">
                    3PS package-store licenses
                  </Link>
                  , then filter current inventory by county, license type, asking
                  price, and availability. Buyers can also use the{" "}
                  <Link href="/counties">Florida county market directory</Link> to
                  review county-specific inventory and pricing before opening an
                  individual listing for details.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="results-content">
        <div className="page-shell">
          <form
            className="results-filters"
            onSubmit={(event) => event.preventDefault()}
          >
            <label>
              <span>County</span>
              <ListingsHoverSelect
                ariaLabel="Filter listings by Florida county"
                value={county}
                options={countyOptions}
                onChange={setCounty}
              />
            </label>
            <label>
              <span>Listing Type</span>
              <ListingsHoverSelect
                ariaLabel="Filter by listing type"
                value={type}
                options={licenseTypeOptions}
                onChange={changeListingType}
              />
            </label>
            <label>
              <span>Price Range</span>
              <ListingsHoverSelect
                ariaLabel="Filter listings by asking price"
                value={price}
                options={priceOptions}
                onChange={setPrice}
              />
            </label>
            {showingBusinessListings ? (
              <label className="business-type-filter">
                <span>Business Type</span>
                <ListingsHoverSelect
                  ariaLabel="Filter business listings by business type"
                  value={businessType}
                  options={businessTypeOptions}
                  onChange={setBusinessType}
                />
              </label>
            ) : (
              <label>
                <span>Availability</span>
                <ListingsHoverSelect
                  ariaLabel="Filter listings by availability"
                  value={status}
                  options={availabilityOptions}
                  onChange={setStatus}
                />
              </label>
            )}
            <button className="btn btn-gold" type="submit">
              Apply Filters
            </button>
          </form>
          <div className="inventory-disclaimer">
            {showingBusinessListings ? (
              <>
                {showingSfsBusinessListings
                  ? "These listings are restaurant-business acquisitions involving location-specific 4COP SFS / SRX privileges—not sales of transferable quota licenses. Confirm the premises, food-service qualifications, license status, ownership-change requirements, and transaction terms. "
                  : showing2copBusinessListings
                    ? "These are operating businesses with a beer-and-wine license, not standalone quota-license assets. Confirm the license status, premises, approvals, included assets, and purchase terms. "
                  : "These listings are business acquisition packages that include a quota liquor license. Confirm the assets, premises, real estate, license allocation, and transaction terms included in each sale. "}
                <Link href={showing2copBusinessListings ? "/license-types/2cop-beer-wine" : showingSfsBusinessListings ? "/license-types/4cop-sfs-restaurant" : "/businesses-with-quota-licenses"}>
                  {showingSfsBusinessListings
                    ? "Review Florida 4COP SFS / SRX restaurant licensing"
                    : showing2copBusinessListings
                      ? "Review Florida 2COP beer-and-wine licensing"
                    : "View the dedicated business inventory guide"}
                </Link>.
              </>
            ) : (
              <>
                Listings are for liquor-license interests only unless expressly
                stated otherwise. Businesses and real estate are not included.{" "}
                <Link href="/florida-4cop-liquor-license-for-sale">
                  Florida 4COP licenses for sale
                </Link>{" "}
                ·{" "}
                <Link href="/florida-3ps-liquor-license-for-sale">
                  Florida 3PS licenses for sale
                </Link>{" "}
                · <Link href="/businesses-with-quota-licenses">Businesses With Quota Licenses</Link>{" "}
                · <Link href="/counties">All 67 county markets</Link>{" "}
                ·{" "}
                <Link href="/counties/miami-dade">
                  Miami-Dade County liquor licenses for sale
                </Link>.
              </>
            )}
          </div>
          <div className="results-summary">
            <span>
              {showingBusinessListings ? (
                <>
                  Showing <strong>{filteredBusinessListings.length}</strong> of{" "}
                  <strong>{activeBusinessListings.length}</strong> available business
                  {activeBusinessListings.length === 1 ? " package" : " packages"}
                </>
              ) : (
                <>
                  Showing <strong>{Math.min(visibleCount, filtered.length)}</strong> of{" "}
                  <strong>{filtered.length}</strong>{" "}
                  {status === "available"
                    ? "available license"
                    : status === "sold"
                      ? "sold license"
                      : "license"}
                  {filtered.length === 1 ? "" : "s"}
                </>
              )}
            </span>
            <span className="results-summary-actions">
              <time className="inventory-last-updated" dateTime="2026-09-25">
                Updated Sep. 25, 2026
              </time>
              <button type="button" onClick={clearFilters}>
                Clear all filters
              </button>
            </span>
          </div>
          {showingBusinessListings ? (
            filteredBusinessListings.length ? (
              <div className="business-quota-grid listings-business-grid">
                {filteredBusinessListings.map((listing) => (
                  <BusinessQuotaListingCard
                    key={listing.listingReference}
                    listing={listing}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <strong>{activeBusinessListings.length ? "No business packages match all filters." : "No published businesses in this category yet."}</strong>
                <p>{activeBusinessListings.length ? "Try broadening the county, price range, or availability." : "Seller listings appear here after approval and publication."}</p>
                <button className="btn btn-gold" type="button" onClick={clearFilters}>
                  View All Listings
                </button>
              </div>
            )
          ) : filtered.length ? (
            <>
              <div className="results-grid">
                {visibleListings.map((listing) => {
                  const isFocused =
                    Boolean(focusIdentity) &&
                    listingIdentity(listing) === focusIdentity;
                  return (
                    <MarketplaceListingCard
                      listing={listing}
                      focused={isFocused}
                      cardRef={isFocused ? focusedCardRef : undefined}
                      key={
                        listing.sourceRef ??
                        `${listing.county}-${listing.type}-${listing.priceLabel}`
                      }
                    />
                  );
                })}
              </div>
              {visibleCount < filtered.length ? (
                <div className="listings-load-more">
                  <button
                    className="btn btn-gold"
                    type="button"
                    onClick={() =>
                      setVisibleCount((current) => current + LISTINGS_PAGE_SIZE)
                    }
                  >
                    Show More Licenses
                  </button>
                  <small>
                    {filtered.length - visibleCount} additional listing
                    {filtered.length - visibleCount === 1 ? "" : "s"}
                  </small>
                </div>
              ) : null}
            </>
          ) : (
            <div className="no-results">
              <strong>No listings match all filters.</strong>
              <p>
                Try broadening the county, price range, listing type, or status.
              </p>
              <button
                className="btn btn-gold"
                type="button"
                onClick={clearFilters}
              >
                View All Listings
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="listings-seo-footer">
        <div className="page-shell">
          <div className="listings-seo-guide">
            <span>Florida Buyer Guide</span>
            <h2>Buying a Florida Liquor License</h2>
            <p>
              Florida quota liquor licenses are limited by county and may be
              transferred only subject to applicable state and local
              requirements.{" "}
              <Link href="/how-to-buy-florida-liquor-license">
                Read the step-by-step guide to buying a Florida liquor license
              </Link>
              , then identify the privilege you need and compare current
              inventory in the county where the license will be used.
              Full-liquor concepts can review{" "}
              <Link href="/florida-4cop-liquor-license-for-sale">
                Florida 4COP liquor licenses for sale
              </Link>
              , while package-store buyers can review{" "}
              <Link href="/florida-3ps-liquor-license-for-sale">
                Florida 3PS liquor licenses for sale
              </Link>
              .
            </p>
            <p>
              Asking prices vary by county, supply, license category, seller
              terms, and market conditions. Use the{" "}
              <Link href="/counties">Florida county directory</Link> to compare
              local inventory, and confirm license status, liens, transfer
              requirements, zoning, premises eligibility, and transaction terms
              before closing.
            </p>
          </div>
          <div className="listings-seo-faq">
            <span>FLLM Buyer Resources</span>
            <h2>Florida Liquor License Guides</h2>
            <div className="listings-seo-faq-grid">
              {faqLinks.map((item) => (
                <Link
                  className="listings-seo-faq-card"
                  href={item.href}
                  key={item.question}
                >
                  <span className="listings-seo-faq-copy">
                    <small>{item.label}</small>
                    <strong>{item.question}</strong>
                  </span>
                  <span className="listings-seo-faq-arrow" aria-hidden="true">
                    ›
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
