"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { countySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  marketplaceListingDescriptionParts,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { listingPageHref } from "@/lib/listing-page-urls";
import FloridaCountyMap from "./FloridaCountyMap";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

function priceMatches(price: number | null, range: string) {
  if (range === "all") return true;
  if (price === null) return false;
  return (range === "under150" && price < 150000) ||
    (range === "150to350" && price >= 150000 && price < 350000) ||
    (range === "350to500" && price >= 350000 && price <= 500000) ||
    (range === "500to1m" && price > 500000 && price <= 1000000) ||
    (range === "over1m" && price > 1000000);
}

function ListingDescription({ listing }: { listing: Listing }) {
  const description = marketplaceListingDescriptionParts({
    county: listing.county,
    licenseType: listing.type,
    licenseStatus: listing.licenseStatus,
    preferredTiming: listing.preferredTiming,
  });

  return (
    <div className="result-description">
      <p>{description.license}</p>
      <p>{description.county}</p>
      {description.cities && <p className="result-cities">{description.cities}</p>}
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
        <nav aria-label="Listings navigation"><Link href="/">Home</Link><Link href="/florida-liquor-licenses-for-sale">Licenses for Sale</Link><Link href="/counties">Counties</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact Us</Link></nav>
      </header>
      <section className="results-intro"><div className="page-shell"><span>Florida Marketplace Inventory</span><h1>Florida Liquor Licenses <span className="listings-title-gold">for Sale</span></h1><p>Browse current transferable 4COP and 3PS quota liquor licenses across Florida.<br />Filter by county, license type, asking price, and availability.</p></div></section>
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
        {filtered.length ? <div className="results-grid">{filtered.map((listing) => <article className="result-card" key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
          <div className="result-photo"><FloridaCountyMap county={listing.county} /><span className="result-type-badge">{listing.type}</span></div>
          <div className="result-body"><p>● <Link className="result-county-link" href={`/counties/${countySlug(listing.county)}`}>{listing.county}</Link></p><h2>{listing.sourceRef ? <Link href={listingPageHref(listing)} aria-label={`View ${listing.type} listing in ${listing.county}`} style={{ color: "inherit", textDecoration: "none" }}>{listing.priceLabel}</Link> : listing.priceLabel}</h2><div className="result-facts"><span>{listing.type}</span><span>{listing.licenseStatus ? `${sellerReportedStatusLabel(listing.licenseStatus)} / Available` : "Available / Status to confirm"}</span></div>
          {listing.sourceRef ? <><ListingDescription listing={listing} /><div className="result-actions"><Link className="btn btn-gold" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Inquire</Link><Link className="btn offer-button" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Submit an Offer</Link></div></> : <div className="result-actions"><span className="sold-status">SOLD</span></div>}
          </div></article>)}</div> : <div className="no-results"><strong>No listings match all filters.</strong><p>Try broadening the county, price range, license type, or status.</p><button className="btn btn-gold" type="button" onClick={clearFilters}>View All Listings</button></div>}
      </div></section>
    </main>
  );
}
