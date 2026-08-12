"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { countySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  countyListingDescription,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { listingPageHref } from "@/lib/listing-page-urls";
import FloridaCountyMap from "./FloridaCountyMap";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const faqItems = [
  {
    question: "Where can I find Florida liquor licenses for sale?",
    answer: "Florida Liquor License Market organizes current statewide marketplace inventory on this Listings page. Buyers can filter available 4COP quota and 3PS package-store opportunities by county, asking price, license type, and availability, then open individual listing pages for more detail.",
  },
  {
    question: "What is a Florida 4COP quota liquor license?",
    answer: "A 4COP quota license is a county-limited full-liquor license used within its approved privileges for beer, wine, and spirits. It is commonly associated with bars, taverns, cocktail lounges, nightclubs, and full-liquor restaurant concepts, subject to state and local approvals.",
  },
  {
    question: "What is a Florida 3PS liquor license?",
    answer: "A 3PS-family quota license is generally used for package-store sales of sealed beer, wine, and spirits for consumption away from the licensed premises. The exact series designation may vary with county population.",
  },
  {
    question: "What does a Florida liquor license cost?",
    answer: "There is no single statewide market price for transferable quota licenses. Asking prices vary by county, license category, supply, seller terms, transaction structure, and market conditions. Current listings provide a live marketplace snapshot.",
  },
  {
    question: "Can I search Florida liquor licenses by county?",
    answer: "Yes. Florida Liquor License Market provides permanent county pages and listing filters so buyers can focus on the county where the license will be used and compare asking prices and available license types.",
  },
  {
    question: "Does a liquor-license listing include a restaurant or real estate?",
    answer: "Not unless an individual listing expressly says so. Marketplace listings generally describe the liquor-license interest separately from any operating business, leasehold, equipment, inventory, or real estate.",
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

function compactCardDescription(description: string) {
  const clean = description.trim();
  const maxCharacters = 122;
  if (clean.length <= maxCharacters) return clean;

  const tentative = clean.slice(0, maxCharacters + 1);
  const lastSpace = tentative.lastIndexOf(" ");
  const cutoff = lastSpace >= 92 ? lastSpace : maxCharacters;
  const clipped = clean.slice(0, cutoff).replace(/[,:;.!?\s]+$/g, "");
  return `${clipped}…`;
}

function ListingDescription({ listing }: { listing: Listing }) {
  const fullDescription = countyListingDescription(listing.county);
  return (
    <div className="result-description">
      <p title={fullDescription}>{compactCardDescription(fullDescription)}</p>
    </div>
  );
}

export default function ListingsPage({ initialListings }: { initialListings: Listing[] }) {
  const [county, setCounty] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [status, setStatus] = useState("all");

  const marketplaceListings = useMemo(() => Array.from(
    new Map(initialListings.map((listing) => [
      `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`,
      listing,
    ])).values()
  ), [initialListings]);

  const availableCount = useMemo(
    () => marketplaceListings.filter((listing) => Boolean(listing.sourceRef)).length,
    [marketplaceListings]
  );

  const filtered = useMemo(() => marketplaceListings.filter((listing) =>
    (county === "all" || listing.county === county) &&
    (type === "all" || listing.type === type) &&
    priceMatches(listing.price, price) &&
    (status === "all" || (status === "available" ? Boolean(listing.sourceRef) : !listing.sourceRef))
  ), [county, type, price, status, marketplaceListings]);

  function clearFilters() {
    setCounty("all");
    setType("all");
    setPrice("all");
    setStatus("all");
  }

  return (
    <main className="results-page">
      <header className="results-header page-shell">
        <Link className="seller-brand" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav aria-label="Listings navigation"><Link href="/">Home</Link><Link href="/listings">Florida Liquor Licenses for Sale</Link><Link href="/counties">Counties</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact Us</Link></nav>
      </header>
      <section className="results-intro"><div className="page-shell"><span>Florida Marketplace Inventory</span><h1>Florida Liquor Licenses <span className="listings-title-gold">for Sale</span></h1><p className="listings-seo-intro">Browse {availableCount} current available Florida liquor licenses for sale across the state, including transferable 4COP quota and 3PS package-store opportunities. Florida quota licenses are county-specific, so buyers can compare asking prices, availability, and license types before narrowing the search to the county where the license will be used. Use the filters below to search by county, license type, asking-price range, and status, then open an individual listing for details or submit an inquiry. FLLM also maintains dedicated county pages, 4COP and 3PS guides, financing information, and transaction resources to help buyers evaluate current Florida liquor-license inventory.</p></div></section>
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
        {filtered.length ? <div className="results-grid">{filtered.map((listing) => {
          const available = Boolean(listing.sourceRef);
          return <article className={`result-card ${available ? "result-card-available" : "result-card-sold"}`} key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
            <span className="result-type-badge">{listing.type}</span>
            <div className="result-photo"><FloridaCountyMap county={listing.county} enlarged /></div>
            <div className="result-body">
              <p className="result-county-row"><span className="result-pin" aria-hidden="true">●</span><Link className="result-county-link" href={`/counties/${countySlug(listing.county)}`}>{listing.county}</Link></p>
              <h2>{available ? <Link href={listingPageHref(listing)} aria-label={`View ${listing.type} listing in ${listing.county}`} style={{ color: "inherit", textDecoration: "none" }}>{listing.priceLabel}</Link> : listing.priceLabel}</h2>
              <div className="result-facts">
                {available ? <span className="availability-pill" title={listing.licenseStatus ? sellerReportedStatusLabel(listing.licenseStatus) : "Status to confirm"}><span className="availability-dot" aria-hidden="true" />Available</span> : <span className="sold-status-inline">Sold</span>}
              </div>
              <ListingDescription listing={listing} />
              <div className="result-actions">
                {available ? <Link className="btn btn-gold result-view-button" href={listingPageHref(listing)}>View License <span aria-hidden="true">›</span></Link> : <span className="sold-status">SOLD</span>}
              </div>
            </div>
          </article>;
        })}</div> : <div className="no-results"><strong>No listings match all filters.</strong><p>Try broadening the county, price range, license type, or status.</p><button className="btn btn-gold" type="button" onClick={clearFilters}>View All Listings</button></div>}
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
            <span>Marketplace Questions</span>
            <h2>Florida Liquor License FAQs</h2>
            <div className="listings-seo-faq-grid">
              {faqItems.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
