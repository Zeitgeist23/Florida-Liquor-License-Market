"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Header from "./Header";
import { listings } from "@/data/listings";
import {
  UsersIcon,
  UserIcon,
  ChartIcon,
  BankIcon,
  MapIcon,
  ShieldIcon,
  SearchIcon,
  TagIcon,
  ArrowIcon,
  LockIcon
} from "./Icons";

export default function HomePage() {
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

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    requestAnimationFrame(() => {
      document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <>
      <Header />

      <main id="top">
        <section className="hero">
          <div className="heroBackdrop" aria-hidden="true">
            <div className="sunsetGlow" />
            <div className="cityScene">
              <span className="tower tower1" />
              <span className="tower tower2" />
              <span className="tower tower3" />
              <span className="tower tower4" />
              <span className="tower tower5" />
              <span className="tower tower6" />
              <span className="waterReflection" />
            </div>
            <div className="barScene">
              <span className="pendant pendant1" />
              <span className="pendant pendant2" />
              <span className="pendant pendant3" />
              <span className="barShelves" />
              <span className="barCounter" />
            </div>
            <div className="heroShade" />
          </div>

          <div className="heroInner">
            <h1>
              <span className="whiteLine">Buy &amp; Sell</span>
              <span className="goldLine">Florida Liquor Licenses</span>
            </h1>

            <div className="confidential">
              <span className="rule" />
              <span><ShieldIcon /> Confidential Inquiries</span>
              <span className="rule" />
            </div>

            <div className="audiences">
              <span><UsersIcon /> Buyers</span>
              <span><UserIcon /> Sellers</span>
              <span><ChartIcon /> Investors</span>
              <span><BankIcon /> Financing Solutions</span>
              <span><MapIcon /> Across Florida</span>
            </div>

            <p className="trustText">
              Trusted by Florida restaurant owners, hospitality groups, investors and brokers.
              <br />
              Serving buyers and sellers in all 67 Florida counties.
            </p>

            <form className="searchPanel" onSubmit={submitSearch}>
              <div className="searchHeading"><SearchIcon /> Find a Florida Liquor License</div>

              <div className="searchGrid">
                <select value={county} onChange={(e) => setCounty(e.target.value)} aria-label="County">
                  <option value="">Select County</option>
                  {[...new Set(listings.map((item) => item.county))].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select value={type} onChange={(e) => setType(e.target.value)} aria-label="License type">
                  <option value="">Select License Type</option>
                  {[...new Set(listings.map((item) => item.type))].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Price range">
                  <option value="">Price Range</option>
                  <option value="under350">Under $350,000</option>
                  <option value="350to500">$350,000–$500,000</option>
                  <option value="over500">Over $500,000</option>
                </select>

                <button type="submit">Search Listings <span>›</span></button>
              </div>

              <div className="searchBenefits">
                <span><ShieldIcon /> Confidential Listings</span>
                <span><UserIcon /> Professional Representation</span>
                <span><MapIcon /> Statewide Coverage</span>
                <span><LockIcon /> Discreet. Secure. Trusted.</span>
              </div>
            </form>
          </div>
        </section>

        <section className="actionGrid container">
          <a className="actionCard dark" href="#featured">
            <SearchIcon />
            <div><strong>Browse <em>Featured</em> Licenses</strong><p>Search featured listings by county, license type, and price.</p></div>
            <ArrowIcon />
          </a>
          <a className="actionCard gold" id="sell" href="#contact">
            <TagIcon />
            <div><strong>Sell Your License</strong><p>List your license with confidential marketing and professional representation.</p></div>
            <ArrowIcon />
          </a>
          <a className="actionCard dark" id="financing" href="#contact">
            <BankIcon />
            <div><strong>Explore Financing</strong><p>Connect with financing sources and capital partners.</p></div>
            <ArrowIcon />
          </a>
          <a className="actionCard light" id="invest" href="#contact">
            <ChartIcon />
            <div><strong>Investment Opportunities</strong><p>Discover opportunities in Florida&apos;s hospitality market.</p></div>
            <ArrowIcon />
          </a>
        </section>

        <section className="stats container">
          <div><strong>248+</strong><span>Active Listings</span><small>Across Florida</small></div>
          <div><strong>1,250+</strong><span>Registered Buyers</span><small>Ready to Buy</small></div>
          <div><strong>75+</strong><span>Financing Partners</span><small>Lenders &amp; Capital Sources</small></div>
          <div><strong>420+</strong><span>Registered Investors</span><small>Seeking Opportunities</small></div>
          <div><strong>67</strong><span>Florida Counties</span><small>Statewide Coverage</small></div>
        </section>

        <section className="featured container" id="featured">
          <div className="sectionHeading">
            <h2>Featured Florida Liquor Licenses</h2>
            <a href="#contact">View All Listings →</a>
          </div>

          <div className="listingGrid">
            {results.map((item) => (
              <article className="listingCard" key={item.id}>
                <div className="listingPhoto">
                  <Image src={item.image} alt={`${item.type} in ${item.county}`} width={500} height={280} />
                  <span>{item.type}</span>
                </div>
                <div className="listingBody">
                  <small>📍 {item.county}</small>
                  <strong>${item.price.toLocaleString()}</strong>
                  <p>★ {item.use} &nbsp;&nbsp; ⇄ Transferable</p>
                </div>
              </article>
            ))}
          </div>

          {results.length === 0 && <p className="noResults">No listings match those filters.</p>}
        </section>

        <section className="insights container" id="market-data">
          <article>
            <div className="miniHeading"><h3>Recent Florida Transactions</h3><a href="#contact">View All →</a></div>
            <table>
              <thead><tr><th>County</th><th>License Type</th><th>Sale Price</th></tr></thead>
              <tbody>
                <tr><td>Palm Beach</td><td>4COP Quota</td><td>$965,000</td></tr>
                <tr><td>Brevard</td><td>2COP Quota</td><td>$585,000</td></tr>
                <tr><td>Broward</td><td>3PS License</td><td>$615,000</td></tr>
                <tr><td>Hillsborough</td><td>4COP Quota</td><td>$495,000</td></tr>
              </tbody>
            </table>
          </article>

          <article>
            <div className="miniHeading"><h3>Florida Market Insights</h3><a href="#contact">View All →</a></div>
            <div className="mapCard">
              <div className="floridaShape">FL</div>
              <div>
                <b>Average 4COP quota price by county</b>
                <p><span className="dot d1" /> $600K+</p>
                <p><span className="dot d2" /> $450K–$600K</p>
                <p><span className="dot d3" /> $300K–$450K</p>
                <p><span className="dot d4" /> $200K–$300K</p>
              </div>
            </div>
          </article>

          <article>
            <div className="miniHeading"><h3>Financing Spotlight</h3><a href="#contact">View All →</a></div>
            <ul className="financeList">
              <li><BankIcon /><div><b>Acquisition Financing</b><span>Finance your next liquor license with competitive terms.</span></div></li>
              <li><ChartIcon /><div><b>Refinance Existing Debt</b><span>Explore lower rates and flexible structures.</span></div></li>
              <li><UsersIcon /><div><b>Private Capital Introductions</b><span>Connect with private lenders and investors.</span></div></li>
            </ul>
          </article>
        </section>

        <section className="cta container" id="contact">
          <div>
            <strong>Ready to Buy, Sell, Finance, or Invest in a Liquor License?</strong>
            <span>Join Florida&apos;s trusted marketplace for liquor license transactions.</span>
          </div>
          <a href="mailto:info@floridaliquorlicensemarket.com">Get Started Today →</a>
        </section>
      </main>

      <footer className="siteFooter" id="resources">
        <div className="container footerGrid">
          <div>
            <Image src="/images/logo.png" alt="Florida Liquor License Market" width={180} height={70} />
            <p>Florida&apos;s Marketplace for Buying, Selling &amp; Financing Liquor Licenses.</p>
            <b>Buy · Sell · Finance · Invest</b>
          </div>
          <div><h4>Marketplace</h4><a href="#featured">Browse Licenses</a><a href="#sell">Sell Your License</a><a href="#financing">Financing Solutions</a></div>
          <div><h4>Company</h4><a href="#contact">About Us</a><a href="#contact">Our Process</a><a href="#contact">Contact Us</a></div>
          <div><h4>Resources</h4><a href="#market-data">Market Data</a><a href="#contact">FAQ</a><a href="#contact">Documents</a></div>
        </div>
      </footer>
    </>
  );
}
