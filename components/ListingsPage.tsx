"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Listing } from "@/data/listings";
import HeaderNavMenus from "./HeaderNavMenus";
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
  { value: "all", label: "All License Types" },
  { value: "4COP Quota", label: "4COP Quota" },
  { value: "3PS Quota / Package Store", label: "3PS Quota / Package Store" },
];

const priceOptions: readonly ListingsHoverSelectOption[] = [
  { value: "all", label: "All Prices" },
  { value: "under150", label: "Under $150,000" },
  { value: "150to350", label: "$150,000–$350,000" },
  { value: "350to500", label: "$350,000–$500,000" },
  { value: "500to1m", label: "$500,000–$1 Million" },
  { value: "over1m", label: "Over $1 Million" },
];

const statusOptions: readonly ListingsHoverSelectOption[] = [
  { value: "all", label: "Available & Sold" },
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
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
    label: "Pricing & value guide",
    href: "/florida-liquor-license-value",
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
  focusReference?: string | null;
};

export default function ListingsPage({
  initialListings,
  focusReference = null,
}: ListingsPageProps) {
  const [county, setCounty] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [status, setStatus] = useState("available");
  const [visibleCount, setVisibleCount] = useState(LISTINGS_PAGE_SIZE);
  const focusedCardRef = useRef<HTMLElement | null>(null);

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
        (left, right) =>
          Number(Boolean(right.featuredUntil)) -
          Number(Boolean(left.featuredUntil)),
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
          (type === "all" || listing.type === type) &&
          priceMatches(listing.price, price) &&
          (status === "all" ||
            (status === "available"
              ? Boolean(listing.sourceRef)
              : !listing.sourceRef)),
      ),
    [county, type, price, status, orderedMarketplaceListings],
  );

  const visibleListings = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  useEffect(() => {
    setVisibleCount(LISTINGS_PAGE_SIZE);
  }, [county, type, price, status]);

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
    setType("all");
    setPrice("all");
    setStatus("available");
  }

  return (
    <main className="results-page">
      <header className="results-header page-shell">
        <Link
          className="seller-brand"
          href="/"
          aria-label="Florida Liquor License Market home"
        >
          <img
            src="/assets/brand-sharp.svg"
            alt="Florida Liquor License Market"
          />
        </Link>
        <HeaderNavMenus
          className="primary-nav listings-primary-nav"
          showContactLink
        />
      </header>
      <section className="results-intro">
        <div className="page-shell">
          <span>Florida Marketplace Inventory</span>
          <h1>
            Florida Liquor Licenses{" "}
            <span className="listings-title-gold">for Sale</span>
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
              <span>License Type</span>
              <ListingsHoverSelect
                ariaLabel="Filter listings by license type"
                value={type}
                options={licenseTypeOptions}
                onChange={setType}
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
            <label>
              <span>Status</span>
              <ListingsHoverSelect
                ariaLabel="Filter listings by availability"
                value={status}
                options={statusOptions}
                onChange={setStatus}
              />
            </label>
            <button className="btn btn-gold" type="submit">
              Apply Filters
            </button>
          </form>
          <div className="inventory-disclaimer">
            Listings are for liquor-license interests only unless expressly
            stated otherwise. Businesses and real estate are not included.{" "}
            <Link href="/florida-4cop-liquor-license-for-sale">
              Florida 4COP licenses for sale
            </Link>{" "}
            ·{" "}
            <Link href="/florida-3ps-liquor-license-for-sale">
              Florida 3PS licenses for sale
            </Link>{" "}
            · <Link href="/counties">All 67 county markets</Link>.
          </div>
          <div className="results-summary">
            <span>
              Showing <strong>{Math.min(visibleCount, filtered.length)}</strong> of{" "}
              <strong>{filtered.length}</strong> matching listing
              {filtered.length === 1 ? "" : "s"}
            </span>
            <button type="button" onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
          {filtered.length ? (
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
                Try broadening the county, price range, license type, or status.
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
