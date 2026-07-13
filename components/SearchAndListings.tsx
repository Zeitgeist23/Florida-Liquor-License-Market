"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { listings } from "@/data/listings";
import { SearchIcon, ShieldIcon, UserIcon, MapIcon, LockIcon } from "./Icons";

export default function SearchAndListings() {
  const [county, setCounty] = useState("");
  const [type, setType] = useState("");
  const [range, setRange] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = useMemo(() => listings.filter((item) => {
    const countyMatch = !county || item.county === county;
    const typeMatch = !type || item.type === type;
    let rangeMatch = true;
    if (range === "under350") rangeMatch = item.price < 350000;
    if (range === "350to500") rangeMatch = item.price >= 350000 && item.price <= 500000;
    if (range === "over500") rangeMatch = item.price > 500000;
    return countyMatch && typeMatch && rangeMatch;
  }), [county, type, range]);

  const results = submitted ? filtered : listings;

  return <>
    <form className="searchPanel" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); document.getElementById("featured")?.scrollIntoView({behavior:"smooth"}); }}>
      <div className="searchHeading"><SearchIcon/> Find a Florida Liquor License</div>
      <div className="searchGrid">
        <select value={county} onChange={(e)=>setCounty(e.target.value)} aria-label="County"><option value="">Select County</option>{[...new Set(listings.map(x=>x.county))].map(x=><option key={x}>{x}</option>)}</select>
        <select value={type} onChange={(e)=>setType(e.target.value)} aria-label="License type"><option value="">Select License Type</option>{[...new Set(listings.map(x=>x.type))].map(x=><option key={x}>{x}</option>)}</select>
        <select value={range} onChange={(e)=>setRange(e.target.value)} aria-label="Price range"><option value="">Price Range</option><option value="under350">Under $350,000</option><option value="350to500">$350,000–$500,000</option><option value="over500">Over $500,000</option></select>
        <button type="submit">Search Listings <span>›</span></button>
      </div>
      <div className="searchBenefits"><span><ShieldIcon/>Confidential Listings</span><span><UserIcon/>Professional Representation</span><span><MapIcon/>Statewide Coverage</span><span><LockIcon/>Discreet. Secure. Trusted.</span></div>
    </form>

    <section className="featured container" id="featured">
      <div className="sectionHeading"><h2>Featured Florida Liquor Licenses</h2><a href="#contact">View All Listings →</a></div>
      <div className="listingGrid">
        {results.map((item)=><article className="listingCard" key={item.id}>
          <div className="listingPhoto"><Image src={item.image} alt={`${item.type} in ${item.county}`} width={500} height={280}/><span>{item.type}</span></div>
          <div className="listingBody"><small>📍 {item.county}</small><strong>${item.price.toLocaleString()}</strong><p>★ {item.use} &nbsp;&nbsp; ⇄ Transferable</p></div>
        </article>)}
      </div>
      {results.length===0 && <p className="noResults">No listings match those filters.</p>}
    </section>
  </>;
}
