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
  "Alachua County": "Alachua County is anchored by Gainesville and the University of Florida, with a diverse economy supported by education, healthcare, research, and hospitality.",
  "Bay County": "Bay County in the Panhandle is home to Panama City and Panama City Beach, with a strong tourism, dining, and hospitality market.",
  "Brevard County": "Brevard County on Florida's Space Coast is home to Kennedy Space Center, aerospace employers, growing communities, and Atlantic beaches.",
  "Broward County": "Broward County anchors South Florida around Fort Lauderdale, known for its beaches, boating canals, dense population, dining, and nightlife.",
  "Charlotte County": "Charlotte County on the southwest Gulf Coast is home to Punta Gorda, with a growing population and strong boating, fishing, and hospitality activity.",
  "Citrus County": "Citrus County on Florida's Nature Coast is known for Crystal River, natural springs, waterfront recreation, and growing residential communities.",
  "Clay County": "Clay County lies southwest of Jacksonville and includes fast-growing suburban communities supported by military, retail, dining, and residential development.",
  "Collier County": "Collier County in Southwest Florida is home to Naples, known for affluent communities, golf, luxury tourism, dining, and access to the Everglades.",
  "DeSoto County": "DeSoto County is a rural south-central Florida market centered on Arcadia, with agriculture, cattle ranching, local commerce, and regional travel activity.",
  "Duval County": "Duval County is anchored by Jacksonville, a major port, finance, logistics, healthcare, sports, dining, and entertainment market.",
  "Escambia County": "Escambia County is the westernmost Panhandle county and home to Pensacola, with military, tourism, education, dining, and Gulf Coast activity.",
  "Hernando County": "Hernando County is a growing Nature Coast market north of Tampa, known for suburban development, springs, recreation, and expanding retail and dining demand.",
  "Hillsborough County": "Hillsborough County is anchored by Tampa, one of Florida's largest business, tourism, healthcare, sports, dining, and entertainment markets.",
  "Indian River County": "Indian River County on the Treasure Coast is centered on Vero Beach, with affluent coastal communities, tourism, boating, retail, and hospitality activity.",
  "Lake County": "Lake County in Central Florida, northwest of Orlando, is known for its chain of lakes, fast-growing communities, tourism, recreation, and suburban development.",
  "Lee County": "Lee County in Southwest Florida includes Fort Myers and Cape Coral, with rapid population growth, beaches, boating, tourism, and a large hospitality market.",
  "Leon County": "Leon County is home to Tallahassee, the state capital, with an economy supported by government, universities, healthcare, dining, and regional commerce.",
  "Manatee County": "Manatee County on Florida's Gulf Coast is home to Bradenton, with beaches, boating, tourism, residential growth, and expanding dining demand.",
  "Marion County": "Marion County is anchored by Ocala, known for horse farms, logistics, healthcare, residential growth, tourism, and regional commerce.",
  "Martin County": "Martin County on the Treasure Coast is known for boating, affluent coastal communities, protected shorelines, tourism, and a strong local dining market.",
  "Miami-Dade County": "Miami-Dade County is Florida's most populous county and a major international center for tourism, finance, trade, culture, dining, and nightlife.",
  "Monroe County": "Monroe County encompasses the Florida Keys, one of the state's strongest tourism, boating, fishing, dining, and hospitality markets.",
  "Okaloosa County": "Okaloosa County includes Destin and Fort Walton Beach, with major military installations, Gulf tourism, boating, dining, and hospitality activity.",
  "Orange County": "Orange County is anchored by Orlando, one of the world's leading tourism destinations and a major market for hotels, restaurants, entertainment, and conventions.",
  "Osceola County": "Osceola County is a fast-growing Central Florida market south of Orlando, anchored by Kissimmee and the region's tourism and hospitality corridor.",
  "Palm Beach County": "Palm Beach County stretches along Florida's southeast coast and features affluent communities, tourism, boating, dining, retail, and year-round population growth.",
  "Pasco County": "Pasco County is a rapidly growing Tampa Bay market with expanding suburban communities, retail centers, recreation, restaurants, and hospitality demand.",
  "Pinellas County": "Pinellas County includes St. Petersburg and Clearwater, with dense coastal communities, Gulf beaches, tourism, arts, dining, and nightlife.",
  "Polk County": "Polk County sits between Tampa and Orlando and is anchored by Lakeland, with logistics, manufacturing, tourism, residential growth, and regional commerce.",
  "Santa Rosa County": "Santa Rosa County includes Gulf Breeze, Navarre, and growing communities near Pensacola, supported by military, tourism, beaches, and residential development.",
  "Sarasota County": "Sarasota County is a Gulf Coast destination known for white-sand beaches, arts, culture, affluent communities, tourism, and a strong dining market.",
  "Seminole County": "Seminole County is a prosperous suburban market north of Orlando, known for strong schools, lakeside communities, retail, dining, and population growth.",
  "St. Johns County": "St. Johns County is home to historic St. Augustine and fast-growing coastal communities, with strong tourism, hospitality, schools, and residential development.",
  "St. Lucie County": "St. Lucie County on the Treasure Coast is home to Port St. Lucie, with rapid residential growth, coastal recreation, healthcare, retail, and hospitality activity.",
  "Volusia County": "Volusia County is home to Daytona Beach, with motorsports, Atlantic beaches, tourism, universities, dining, and growing residential communities.",
};

function countyDescription(county: string) {
  return countyDescriptions[county] ?? `${county} offers a mix of local commerce, residential communities, tourism, dining, and hospitality activity within Florida.`;
}

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
          {listing.sourceRef ? <><small>{countyDescription(listing.county)}</small><div className="result-actions"><Link className="btn btn-gold" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Inquire</Link><Link className="btn offer-button" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Submit an Offer</Link></div></> : <div className="result-actions"><span className="sold-status">SOLD</span></div>}
          </div></article>)}</div> : <div className="no-results"><strong>No listings match all filters.</strong><p>Try broadening the county, price range, license type, or status.</p><button className="btn btn-gold" type="button" onClick={clearFilters}>View All Listings</button></div>}
      </div></section>
    </main>
  );
}
