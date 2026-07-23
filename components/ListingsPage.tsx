"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { listings } from "@/data/listings";
import { additionalListings } from "@/data/additional-listings";
import FloridaCountyMap from "./FloridaCountyMap";

const normalizedListings = [...listings, ...additionalListings].map((listing) =>
  listing.sourceRef === "FLLM-030"
    ? { ...listing, price: 200000, priceLabel: "$200,000" }
    : listing
);

const marketplaceListings = Array.from(
  new Map(
    normalizedListings.map((listing) => [
      `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`,
      listing,
    ])
  ).values()
);

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const countyDescriptions: Record<string, string> = {
  "Broward County": "Broward County anchors South Florida around Fort Lauderdale, known for its beaches, boating canals, and lively dining and nightlife scene.",
  "Sarasota County": "Sarasota County is a Gulf Coast destination known for white-sand beaches, a strong arts and cultural scene, and highly rated schools.",
  "Miami-Dade County": "Miami-Dade County is Florida's most populous county, anchored by Miami, a major hub for international finance, tourism, and culture.",
  "Pinellas County": "Pinellas County sits on the Tampa Bay peninsula and includes St. Petersburg and Clearwater, known for its Gulf beaches and dense population.",
  "Collier County": "Collier County in Southwest Florida is home to Naples, known for upscale communities, golf courses, and access to the Everglades.",
  "Palm Beach County": "Palm Beach County stretches along the southeast coast around West Palm Beach, known for affluent communities and winter tourism.",
  "Orange County": "Orange County in Central Florida is anchored by Orlando, home to major theme parks and a booming tourism-driven economy.",
  "Monroe County": "Monroe County is Florida's southernmost county, encompassing the Florida Keys and a major destination for boating, diving, and tourism.",
  "Hillsborough County": "Hillsborough County in the Tampa Bay area is anchored by Tampa, a growing hub for business, healthcare, and tourism.",
  "DeSoto County": "DeSoto County is a rural south-central Florida county known for agriculture, cattle ranching, and citrus groves.",
  "Seminole County": "Seminole County is a Central Florida suburban county north of Orlando, known for strong schools and lakeside communities.",
  "Charlotte County": "Charlotte County on the southwest Gulf Coast is home to Punta Gorda, known for boating, fishing, and a growing retiree population.",
  "Lee County": "Lee County in Southwest Florida includes Fort Myers and Cape Coral, known for its beaches and rapid population growth.",
  "St. Lucie County": "St. Lucie County on the Treasure Coast is home to Port St. Lucie, known for spring training baseball and coastal living.",
  "Leon County": "Leon County in North Florida is home to Tallahassee, the state capital, anchored by state government and two major universities.",
  "Bay County": "Bay County in the Panhandle is home to Panama City, known for its Gulf beaches and tourism-driven economy.",
  "St. Johns County": "St. Johns County in northeast Florida is home to historic St. Augustine, known for top-ranked schools and coastal tourism.",
  "Pasco County": "Pasco County in the Tampa Bay area is known for rapid suburban growth, natural springs, and family-friendly communities.",
  "Volusia County": "Volusia County in east-central Florida is home to Daytona Beach, known for motorsports and beach tourism.",
  "Martin County": "Martin County on the Treasure Coast is known for low-density development, a strong boating culture, and a protected coastline.",
  "Lake County": "Lake County in Central Florida, northwest of Orlando, is known for its chain of lakes and fast-growing suburban communities.",
  "Escambia County": "Escambia County is the westernmost Panhandle county, home to Pensacola, known for naval aviation history and Gulf beaches.",
  "Osceola County": "Osceola County is a fast-growing Central Florida market south of Orlando, anchored by Kissimmee and the tourism corridor.",
  "Santa Rosa County": "Santa Rosa County in Northwest Florida includes Gulf Breeze, Navarre, and rapidly growing communities near Pensacola.",
  "Duval County": "Duval County is anchored by Jacksonville, Florida's largest city by land area and a major port, finance, and logistics market.",
  "Polk County": "Polk County in Central Florida sits between Tampa and Orlando, anchored by Lakeland and known for its citrus industry and chain of lakes.",
  "Manatee County": "Manatee County on Florida's Gulf Coast is home to Bradenton, known for its beaches, boating culture, and growing suburban communities.",
  "Marion County": "Marion County in North Central Florida is anchored by Ocala, known as the horse capital of the world for its thoroughbred farms.",
  "Brevard County": "Brevard County on Florida's Space Coast is home to Kennedy Space Center, known for its aerospace industry and Atlantic beaches.",
};

function priceMatches(price: number | null, range: string) {
  if (range === "all") return true;
  if (price === null) return false;
  return (range === "under150" && price < 150000) ||
    (range === "150to350" && price >= 150000 && price < 350000) ||
    (range === "350to500" && price >= 350000 && price <= 500000) ||
    (range === "500to1m" && price > 500000 && price <= 1000000) ||
    (range === "over1m" && price > 1000000);
}

export default function ListingsPage() {
  const [county, setCounty] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => marketplaceListings.filter((listing) =>
    (county === "all" || listing.county === county) &&
    (type === "all" || listing.type === type) &&
    priceMatches(listing.price, price) &&
    (status === "all" || (status === "available" ? Boolean(listing.sourceRef) : !listing.sourceRef))
  ), [county, type, price, status]);

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
        <nav aria-label="Listings navigation"><Link href="/">Home</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact Us</Link></nav>
      </header>
      <section className="results-intro"><div className="page-shell"><span>Florida Marketplace Inventory</span><h1>Search Florida Liquor Licenses</h1><p>Filter marketplace inventory by availability, county, license type, and asking price.</p></div></section>
      <section className="results-content"><div className="page-shell">
        <form className="results-filters" onSubmit={(event) => event.preventDefault()}>
          <label><span>County</span><select value={county} onChange={(event) => setCounty(event.target.value)}><option value="all">All Florida Counties</option>{counties.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
          <label><span>License Type</span><select value={type} onChange={(event) => setType(event.target.value)}><option value="all">All License Types</option><option value="4COP Quota">4COP Quota</option><option value="3PS Quota / Package Store">3PS Quota / Package Store</option></select></label>
          <label><span>Price Range</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option value="all">All Prices</option><option value="under150">Under $150,000</option><option value="150to350">$150,000–$350,000</option><option value="350to500">$350,000–$500,000</option><option value="500to1m">$500,000–$1 Million</option><option value="over1m">Over $1 Million</option></select></label>
          <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Available &amp; Sold</option><option value="available">Available</option><option value="sold">Sold</option></select></label>
          <button className="btn btn-gold" type="submit">Apply Filters</button>
        </form>
        <div className="inventory-disclaimer">Listings are for liquor-license interests only unless expressly stated otherwise. Businesses and real estate are not included.</div>
        <div className="results-summary"><strong>{filtered.length}</strong> matching listing{filtered.length === 1 ? "" : "s"}<button type="button" onClick={clearFilters}>Clear all filters</button></div>
        {filtered.length ? <div className="results-grid">{filtered.map((listing) => <article className="result-card" key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
          <div className="result-photo"><FloridaCountyMap county={listing.county} /><span className="result-type-badge">{listing.type}</span></div>
          <div className="result-body"><p>● {listing.county}</p><h2>{listing.priceLabel}</h2><div className="result-facts"><span>{listing.type}</span><span>Transferable</span></div>
          {listing.sourceRef ? <><small>{listing.note ?? countyDescriptions[listing.county] ?? "Price and availability subject to confirmation."}</small><div className="result-actions"><Link className="btn btn-gold" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Inquire</Link><Link className="btn offer-button" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Submit an Offer</Link></div></> : <div className="result-actions"><span className="sold-status">SOLD</span></div>}
          </div></article>)}</div> : <div className="no-results"><strong>No listings match all filters.</strong><p>Try broadening the county, price range, license type, or status.</p><button className="btn btn-gold" type="button" onClick={clearFilters}>View All Listings</button></div>}
      </div></section>
    </main>
  );
}