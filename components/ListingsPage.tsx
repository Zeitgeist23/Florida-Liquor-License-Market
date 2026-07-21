"use client";

import { useMemo, useState } from "react";

type Listing = {
  county: string;
  type: string;
  price: number;
  priceLabel: string;
  sourceRef?: string;
  image: string;
};

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const images = [
  "/assets/inventory/01.png", "/assets/license-market/license-01.png", "/assets/license-market/license-02.png",
  "/assets/inventory/04.png", "/assets/license-market/license-03.png", "/assets/license-market/license-04.png",
  "/assets/inventory/07.png", "/assets/license-market/license-05.png", "/assets/license-market/license-06.png",
  "/assets/inventory/10.png", "/assets/license-market/license-07.png", "/assets/license-market/license-08.png",
  "/assets/inventory/13.png", "/assets/license-market/license-09.png", "/assets/license-market/license-10.png",
  "/assets/inventory/16.png", "/assets/license-market/license-11.png", "/assets/license-market/license-12.png",
  "/assets/inventory/19.png", "/assets/license-market/license-13.png", "/assets/license-market/license-14.png",
  "/assets/inventory/22.png", "/assets/license-market/license-15.png", "/assets/listing-lee.png",
  "/assets/listing-palm-beach.png", "/assets/listing-miami.png", "/assets/listing-sarasota.png", "/assets/listing-lee.png"
];

const listings: Listing[] = [
  ["Broward County", "4COP Quota", 240000, "$240,000", "FLLM-001"],
  ["Sarasota County", "4COP Quota", 540000, "$540,000", "FLLM-002"],
  ["Miami-Dade County", "4COP Quota", 495000, "$495,000"],
  ["Pinellas County", "4COP Quota", 525000, "$525,000", "FLLM-003"],
  ["Collier County", "4COP Quota", 500000, "$500,000", "FLLM-004"],
  ["Palm Beach County", "4COP Quota", 575000, "$575,000"],
  ["Orange County", "4COP Quota", 515000, "$515,000", "FLLM-005"],
  ["Monroe County", "4COP Quota", 1200000, "$1,200,000", "FLLM-006"],
  ["Hillsborough County", "4COP Quota", 250000, "$250,000", "FLLM-007"],
  ["Sarasota County", "3PS Quota / Package Store", 340000, "$340,000"],
  ["DeSoto County", "4COP Quota", 110000, "$110,000", "FLLM-008"],
  ["Seminole County", "4COP Quota", 250000, "$250,000", "FLLM-009"],
  ["Charlotte County", "4COP Quota", 425000, "$425,000", "FLLM-010"],
  ["Lee County", "4COP Quota", 425000, "$425,000"],
  ["St. Lucie County", "4COP Quota", 294995, "$294,995", "FLLM-011"],
  ["Leon County", "4COP Quota", 850000, "$850,000", "FLLM-012"],
  ["Bay County", "4COP Quota", 505000, "$505,000", "FLLM-013"],
  ["St. Johns County", "4COP Quota", 425000, "$425,000"],
  ["Pasco County", "4COP Quota", 315000, "$315,000", "FLLM-014"],
  ["Pasco County", "4COP Quota", 325000, "$325,000", "FLLM-015"],
  ["Volusia County", "4COP Quota", 599000, "$599,000", "FLLM-016"],
  ["Martin County", "4COP Quota", 600000, "$600,000", "FLLM-017"],
  ["St. Lucie County", "4COP Quota", 300000, "$300,000", "FLLM-018"],
  ["Hillsborough County", "4COP Quota", 245000, "$245,000", "FLLM-019"],
  ["Lake County", "4COP Quota", 275000, "$275,000", "FLLM-020"],
  ["Pasco County", "4COP Quota", 325000, "$325,000", "FLLM-021"],
  ["Escambia County", "4COP Quota", 575000, "$575,000", "FLLM-022"],
  ["St. Lucie County", "4COP Quota", 275000, "$275,000", "FLLM-023"]
].map(([county, type, price, priceLabel, sourceRef], index) => ({
  county: county as string,
  type: type as string,
  price: price as number,
  priceLabel: priceLabel as string,
  sourceRef: sourceRef as string | undefined,
  image: images[index]
}));

function priceMatches(price: number, range: string) {
  return range === "all" ||
    (range === "under150" && price < 150000) ||
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

  const filtered = useMemo(() => listings.filter((listing) =>
    (county === "all" || listing.county === county) &&
    (type === "all" || listing.type === type) &&
    priceMatches(listing.price, price) &&
    (status === "all" || (status === "available" ? Boolean(listing.sourceRef) : !listing.sourceRef))
  ), [county, type, price, status]);

  function clearFilters() {
    setCounty("all"); setType("all"); setPrice("all"); setStatus("all");
  }

  return (
    <main className="results-page">
      <header className="results-header page-shell">
        <a className="seller-brand" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></a>
        <nav aria-label="Listings navigation"><a href="/">Home</a><a href="/sell-your-license">List Your License</a><a href="/contact">Contact Us</a></nav>
      </header>
      <section className="results-intro"><div className="page-shell"><span>Florida Marketplace Inventory</span><h1>Search Florida Liquor Licenses</h1><p>Filter marketplace inventory by availability, county, license type, and asking price.</p></div></section>
      <section className="results-content"><div className="page-shell">
        <form className="results-filters" onSubmit={(event) => event.preventDefault()}>
          <label><span>County</span><select value={county} onChange={(event) => setCounty(event.target.value)}><option value="all">All Florida Counties</option>{counties.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
          <label><span>License Type</span><select value={type} onChange={(event) => setType(event.target.value)}><option value="all">All License Types</option><option value="4COP Quota">4COP Quota</option><option value="3PS Quota / Package Store">3PS Quota / Package Store</option></select></label>
          <label><span>Price Range</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option value="all">All Prices</option><option value="under150">Under $150,000</option><option value="150to350">$150,000–$350,000</option><option value="350to500">$350,000–$500,000</option><option value="500to1m">$500,000–$1 Million</option><option value="over1m">Over $1 Million</option></select></label>
          <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Available & Sold</option><option value="available">Available</option><option value="sold">Sold</option></select></label>
          <button className="btn btn-gold" type="submit">Apply Filters</button>
        </form>
        <div className="inventory-disclaimer">Listings are for liquor-license interests only unless expressly stated otherwise. Businesses and real estate are not included.</div>
        <div className="results-summary"><strong>{filtered.length}</strong> matching listing{filtered.length === 1 ? "" : "s"}<button type="button" onClick={clearFilters}>Clear all filters</button></div>
        {filtered.length ? <div className="results-grid">{filtered.map((listing) => <article className="result-card" key={`${listing.county}-${listing.price}-${listing.sourceRef ?? "sold"}`}>
          <div className="result-photo"><img src={listing.image} alt={`${listing.county} liquor license listing`} /></div>
          <div className="result-body"><p>● {listing.county}</p><h2>{listing.priceLabel}</h2><div className="result-facts"><span>Quota License</span><span>Transferable</span></div>
          {listing.sourceRef ? <><small>Price and availability subject to confirmation.</small><div className="result-actions"><a className="btn btn-gold" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Inquire</a><a className="btn offer-button" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Submit an Offer</a></div></> : <div className="result-actions"><span className="sold-status">SOLD</span></div>}
          </div></article>)}</div> : <div className="no-results"><strong>No listings match all filters.</strong><p>Try broadening the county, price range, license type, or status.</p><button className="btn btn-gold" type="button" onClick={clearFilters}>View All Listings</button></div>}
      </div></section>
    </main>
  );
}
