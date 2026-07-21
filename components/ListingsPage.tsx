"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FloridaCountyMap from "./FloridaCountyMap";

type Listing = {
  county: string;
  type: "4COP Quota" | "3PS Quota / Package Store";
  price: number | null;
  priceLabel: string;
  sourceRef?: string;
  sourceName?: string;
  sourceUrl?: string;
  note?: string;
  image: string;
};

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const listings: Listing[] = [
  { county: "Broward County", type: "4COP Quota", price: 240000, priceLabel: "$240,000", sourceRef: "FLLM-001", image: "/assets/inventory/01.png" },
  { county: "Sarasota County", type: "4COP Quota", price: 540000, priceLabel: "$540,000", sourceRef: "FLLM-002", image: "/assets/license-market/license-01.png" },
  { county: "Miami-Dade County", type: "4COP Quota", price: 495000, priceLabel: "$495,000", image: "/assets/license-market/license-02.png" },
  { county: "Pinellas County", type: "4COP Quota", price: 525000, priceLabel: "$525,000", sourceRef: "FLLM-003", image: "/assets/inventory/04.png" },
  { county: "Collier County", type: "4COP Quota", price: 500000, priceLabel: "$500,000", sourceRef: "FLLM-004", image: "/assets/license-market/license-03.png" },
  { county: "Palm Beach County", type: "4COP Quota", price: 575000, priceLabel: "$575,000", image: "/assets/license-market/license-04.png" },
  { county: "Orange County", type: "4COP Quota", price: 515000, priceLabel: "$515,000", sourceRef: "FLLM-005", image: "/assets/inventory/07.png" },
  { county: "Monroe County", type: "4COP Quota", price: 1200000, priceLabel: "$1,200,000", sourceRef: "FLLM-006", image: "/assets/license-market/license-05.png" },
  { county: "Hillsborough County", type: "4COP Quota", price: 250000, priceLabel: "$250,000", sourceRef: "FLLM-007", image: "/assets/license-market/license-06.png" },
  { county: "Sarasota County", type: "3PS Quota / Package Store", price: 340000, priceLabel: "$340,000", image: "/assets/inventory/10.png" },
  { county: "DeSoto County", type: "4COP Quota", price: 110000, priceLabel: "$110,000", sourceRef: "FLLM-008", image: "/assets/license-market/license-07.png" },
  { county: "Seminole County", type: "4COP Quota", price: 250000, priceLabel: "$250,000", sourceRef: "FLLM-009", image: "/assets/license-market/license-08.png" },
  { county: "Charlotte County", type: "4COP Quota", price: 425000, priceLabel: "$425,000", sourceRef: "FLLM-010", image: "/assets/inventory/13.png" },
  { county: "Lee County", type: "4COP Quota", price: 425000, priceLabel: "$425,000", image: "/assets/license-market/license-09.png" },
  { county: "St. Lucie County", type: "4COP Quota", price: 294995, priceLabel: "$294,995", sourceRef: "FLLM-011", image: "/assets/license-market/license-10.png" },
  { county: "Leon County", type: "4COP Quota", price: 850000, priceLabel: "$850,000", sourceRef: "FLLM-012", image: "/assets/inventory/16.png" },
  { county: "Bay County", type: "4COP Quota", price: 505000, priceLabel: "$505,000", sourceRef: "FLLM-013", image: "/assets/license-market/license-11.png" },
  { county: "St. Johns County", type: "4COP Quota", price: 425000, priceLabel: "$425,000", image: "/assets/license-market/license-12.png" },
  { county: "Pasco County", type: "4COP Quota", price: 315000, priceLabel: "$315,000", sourceRef: "FLLM-014", image: "/assets/inventory/19.png" },
  { county: "Pasco County", type: "4COP Quota", price: 325000, priceLabel: "$325,000", sourceRef: "FLLM-015", image: "/assets/license-market/license-13.png" },
  { county: "Volusia County", type: "4COP Quota", price: 599000, priceLabel: "$599,000", sourceRef: "FLLM-016", image: "/assets/license-market/license-14.png" },
  { county: "Martin County", type: "4COP Quota", price: 600000, priceLabel: "$600,000", sourceRef: "FLLM-017", image: "/assets/inventory/22.png" },
  { county: "St. Lucie County", type: "4COP Quota", price: 300000, priceLabel: "$300,000", sourceRef: "FLLM-018", image: "/assets/license-market/license-15.png" },
  { county: "Hillsborough County", type: "4COP Quota", price: 245000, priceLabel: "$245,000", sourceRef: "FLLM-019", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/hillsborough-county-4cop-quota-liquor-license-for-sale/2479770/", image: "/assets/listing-lee.png" },
  { county: "Lake County", type: "4COP Quota", price: 275000, priceLabel: "$275,000", sourceRef: "FLLM-020", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-liquor-license-lake-county-florida/2463053/", image: "/assets/listing-palm-beach.png" },
  { county: "Pasco County", type: "4COP Quota", price: 325000, priceLabel: "$325,000", sourceRef: "FLLM-021", sourceName: "BusinessesForSale", sourceUrl: "https://us.businessesforsale.com/us/pasco-county-4cop-quota-liquor-license.aspx", image: "/assets/listing-miami.png" },
  { county: "Escambia County", type: "4COP Quota", price: 575000, priceLabel: "$575,000", sourceRef: "FLLM-022", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-liquor-license/2480306/", image: "/assets/listing-sarasota.png" },
  { county: "St. Lucie County", type: "4COP Quota", price: 275000, priceLabel: "$275,000", sourceRef: "FLLM-023", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/st-lucie-county-4cop-3ps-quota-liquor-license-for-sale/2464222/", image: "/assets/listing-lee.png" },
  { county: "Osceola County", type: "4COP Quota", price: null, priceLabel: "Price Undisclosed", sourceRef: "FLLM-024", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/hard-to-find-osceola-county-4cop-3ps-quota-liquor-license-for-sale/2171872/", image: "/assets/listing-miami.png" },
  { county: "Santa Rosa County", type: "4COP Quota", price: 929000, priceLabel: "$929,000", sourceRef: "FLLM-025", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/santa-rosa-quota-liquor-license-3ps-or-4cop/2308270/", image: "/assets/listing-sarasota.png" },
  { county: "Santa Rosa County", type: "4COP Quota", price: 630000, priceLabel: "$630,000", sourceRef: "FLLM-026", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/santa-rosa-county-4cop-3ps-quota-license-for-sale/2361280/", image: "/assets/listing-sarasota.png" },
  { county: "Duval County", type: "4COP Quota", price: 710000, priceLabel: "$710,000", sourceRef: "FLLM-027", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-license-710-000-duval-county/2045722/", image: "/assets/listing-lee.png" },
  { county: "Duval County", type: "4COP Quota", price: 659000, priceLabel: "$659,000", sourceRef: "FLLM-028", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/duval-county-3ps-4cop-quota-liquor-license-for-sale/2518985/", image: "/assets/listing-lee.png" },
  { county: "Miami-Dade County", type: "4COP Quota", price: 195000, priceLabel: "$195,000", sourceRef: "FLLM-029", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/miami-dade-county-4cop-3ps-quota-license-for-sale/2310388/", image: "/assets/listing-miami.png" },
  { county: "Palm Beach County", type: "4COP Quota", price: 225000, priceLabel: "$225,000", sourceRef: "FLLM-030", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/price-reduced-palm-beach-county-liquor-license-for-sale-225-000/2421413/", image: "/assets/listing-palm-beach.png" },
  { county: "Orange County", type: "4COP Quota", price: 550000, priceLabel: "$550,000", sourceRef: "FLLM-031", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/orange-county-full-quota-liquor-license-3ps-4cop/2474326/", image: "/assets/listing-miami.png" },
  { county: "Orange County", type: "4COP Quota", price: 499000, priceLabel: "$499,000", sourceRef: "FLLM-032", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/orange-county-4cop-3ps-quota-liquor-license-for-sale/2293920/", image: "/assets/listing-miami.png" },
  { county: "Hillsborough County", type: "4COP Quota", price: 210000, priceLabel: "$210,000", sourceRef: "FLLM-033", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/hillsborough-county-4cop-3ps-quota-liquor-license-for-sale/2268177/", image: "/assets/listing-lee.png" },
  { county: "Broward County", type: "4COP Quota", price: 215000, priceLabel: "$215,000", sourceRef: "FLLM-034", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/broward-county-4cop-3ps-quota-liquor-license-for-sale/2268168/", image: "/assets/listing-palm-beach.png" },
  { county: "Escambia County", type: "4COP Quota", price: 395000, priceLabel: "$395,000", sourceRef: "FLLM-035", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/escambia-county-quota-liquor-license-now-available/2474361/", image: "/assets/listing-sarasota.png" },
  { county: "Lake County", type: "4COP Quota", price: 200000, priceLabel: "$200,000", sourceRef: "FLLM-036", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/price-reduced-lake-county-4cop-quota-liquor-license-200-000-cash-price/2421414/", image: "/assets/listing-palm-beach.png" },
  { county: "Pinellas County", type: "4COP Quota", price: 505000, priceLabel: "$505,000", sourceRef: "FLLM-037", sourceName: "BizBuySell — Four-License Portfolio", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-licenses-for-sale-throughout-florida/2356535/", note: "Four-license portfolio; primary availability in Pinellas, Hillsborough, and Sarasota counties. Price and availability subject to confirmation.", image: "/assets/listing-miami.png" }
];

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
  "Duval County": "Duval County is anchored by Jacksonville, Florida's largest city by land area and a major port, finance, and logistics market."
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

  const filtered = useMemo(() => listings.filter((listing) =>
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
          {listing.sourceRef ? <><small>{listing.note ?? countyDescriptions[listing.county] ?? "Price and availability subject to confirmation."}</small>{listing.sourceName && listing.sourceUrl ? <small>External listing: <a href={listing.sourceUrl} target="_blank" rel="noreferrer">{listing.sourceName}</a></small> : null}<div className="result-actions"><Link className="btn btn-gold" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Inquire</Link><Link className="btn offer-button" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Submit an Offer</Link></div></> : <div className="result-actions"><span className="sold-status">SOLD</span></div>}
          </div></article>)}</div> : <div className="no-results"><strong>No listings match all filters.</strong><p>Try broadening the county, price range, license type, or status.</p><button className="btn btn-gold" type="button" onClick={clearFilters}>View All Listings</button></div>}
      </div></section>
    </main>
  );
}
