"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Listing } from "@/data/listings";
import MarketplaceListingCard from "./MarketplaceListingCard";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const faqLinks = [
  {
    question: "Where can I find Florida liquor licenses for sale?",
    label: "Florida license guide",
    href: "/resources/florida-liquor-license-types",
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
    question: "Does a liquor-license listing include a restaurant or real estate?",
    label: "License types guide",
    href: "/resources/florida-liquor-license-types",
  },
];

function priceMatches(price: number | null, range: string) {
  if (range === "all") return true;
  if (price === null) return false;
  return (range === "under150" && price < 150000) ||
    (range === "150to350" && price >= 150000 && price < 350000) ||
    (range === "350to500" && price >= 350000 && price <= 500000) ||
    (range === "500to1m" && price > 500000 && price <= 1000000) ||
    (range === "over1m" && price > 1000000);
}

function listingIdentity(listing: Pick<Listing, "county" | "type" | "price" | "priceLabel">) {
  return `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

type ListingsPageProps = {
  initialListings: Listing[];
  focusReference?: string | null;
};

export default function ListingsPage({ initialListings, focusReference = null }: ListingsPageProps) {
  const [county, setCounty] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [status, setStatus] = useState("available");
  const focusedCardRef = useRef<HTMLElement | null>(null);

  const normalizedFocusReference = focusReference?.trim().toLowerCase() || "";
  const focusListing = useMemo(
    () => normalizedFocusReference
      ? initialListings.find((listing) => listing.sourceRef?.trim().toLowerCase() === normalizedFocusReference)
      : undefined,
    [initialListings, normalizedFocusReference]
  );
  const focusIdentity = focusListing ? listingIdentity(focusListing) : "";

  const marketplaceListings = useMemo(() => Array.from(
    new Map(initialListings.map((listing) => [
      listingIdentity(listing),
      listing,
    ])).values()
  ), [initialListings]);

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
    () => marketplaceListings.filter((listing) => Boolean(listing.sourceRef)).length,
    [marketplaceListings]
  );

  const filtered = useMemo(() => orderedMarketplaceListings.filter((listing) =>
    (county === "all" || listing.county === county) &&
    (type === "all" || listing.type === type) &&
    priceMatches(listing.price, price) &&
    (status === "all" || (status === "available" ? Boolean(listing.sourceRef) : !listing.sourceRef))
  ), [county, type, price, status, orderedMarketplaceListings]);

  useEffect(() => {
    if (!focusIdentity || !focusedCardRef.current) return;

    const timeout = window.setTimeout(() => {
      focusedCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [focusIdentity]);

  function clearFilters() {
    setCounty("all");
    setType("all");
    setPrice("all");
    setStatus("available");
  }

  return (
    <main className="results-page">
      <header className="results-header page-shell">
        <Link className="seller-brand" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav aria-label="Listings navigation"><Link href="/">Home</Link><Link href="/listings">Florida Liquor Licenses for Sale</Link><Link href="/counties">Counties</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact Us</Link></nav>
      </header>
      <section className="results-intro"><div className="page-shell"><span>Florida Marketplace Inventory</span><h1>Florida Liquor Licenses <span className="listings-title-gold">for Sale</span></h1><p className="listings-seo-intro">Browse {availableCount} current Florida liquor licenses for sale. Filter by county, license type, asking price, and availability.</p></div></section>
      <section className="results-content"><div className="page-shell">
        <form className="results-filters" onSubmit={(event) => event.preventDefault()}>
          <label><span>County</span><select value={county} onChange={(event) => setCounty(event.target.value)}><option value="all">All Florida Counties</option>{counties.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
          <label><span>License Type</span><select value={type} onChange={(event) => setType(event.target.value)}><option value="all">All License Types</option><option value="4COP Quota">4COP Quota</option><option value="3PS Quota / Package Store">3PS Quota / Package Store</option></select></label>
          <label><span>Price Range</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option value="all">All Prices</option><option value="under150">Under $150,000</option><option value="150to350">$150,000–$350,000</option><option value="350to500">$350,000–$500,000</option><option value="500to1m">$500,000–$1 Million</option><option value="over1m">Over $1 Million</option></select></label>
          <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Available &amp; Sold</option><option value="available">Available</option><option value="sold">Sold</option></select></label>
          <button className="btn btn-gold" type="submit">Apply Filters</button>
        </form>
        <div className="inventory-disclaimer">Listings are for liquor-license interests only unless expressly stated otherwise. Businesses and real estate are not included. <Link href="/florida-4cop-liquor-license-for-sale">Florida 4COP licenses for sale</Link> · <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS licenses for sale</Link> · <Link href="/counties">All 67 county markets</Link>.</div>
        <div className="results-summary"><strong>{filtered.length}</strong> matching listing{filtered.length === 1 ? "" : "s"}<button type="button" onClick={clearFilters}>Clear all filters</button></div>
        {filtered.length ? (
          <div className="results-grid">
            {filtered.map((listing) => {
              const isFocused = Boolean(focusIdentity) && listingIdentity(listing) === focusIdentity;
              return (
                <MarketplaceListingCard
                  listing={listing}
                  focused={isFocused}
                  cardRef={isFocused ? focusedCardRef : undefined}
                  key={listing.sourceRef ?? `${listing.county}-${listing.type}-${listing.priceLabel}`}
                />
              );
            })}
          </div>
        ) : <div className="no-results"><strong>No listings match all filters.</strong><p>Try broadening the county, price range, license type, or status.</p><button className="btn btn-gold" type="button" onClick={clearFilters}>View All Listings</button></div>}
      </div></section>

      <section className="listings-seo-footer">
        <div className="page-shell">
          <div className="listings-seo-guide">
            <span>Florida Buyer Guide</span>
            <h2>Buying a Florida Liquor License</h2>
            <p>Florida quota liquor licenses are limited by county and may be transferred only subject to applicable state and local requirements. Buyers should first identify the privilege they need, then compare current inventory in the county where the license will be used. Full-liquor concepts can review <Link href="/florida-4cop-liquor-license-for-sale">Florida 4COP liquor licenses for sale</Link>, while package-store buyers can review <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS liquor licenses for sale</Link>.</p>
            <p>Asking prices vary by county, supply, license category, seller terms, and market conditions. Use the <Link href="/counties">Florida county directory</Link> to compare local inventory, and confirm license status, liens, transfer requirements, zoning, premises eligibility, and transaction terms before closing.</p>
          </div>
          <div className="listings-seo-faq">
            <span>FLLM Buyer Resources</span>
            <h2>Florida Liquor License Guides</h2>
            <div className="listings-seo-faq-grid">
              {faqLinks.map((item) => (
                <Link className="listings-seo-faq-card" href={item.href} key={item.question}>
                  <span className="listings-seo-faq-copy">
                    <small>{item.label}</small>
                    <strong>{item.question}</strong>
                  </span>
                  <span className="listings-seo-faq-arrow" aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
