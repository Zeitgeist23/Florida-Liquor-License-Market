"use client";

import { useMemo, useState } from "react";

type Listing = {
  county: string;
  type: string;
  price: number;
  priceLabel: string;
  image: string;
};

const listings: Listing[] = [
  { county: "Miami-Dade County", type: "4COP Quota", price: 495000, priceLabel: "$495,000", image: "/assets/listing-miami.png" },
  { county: "Palm Beach County", type: "4COP Quota", price: 575000, priceLabel: "$575,000", image: "/assets/listing-palm-beach.png" },
  { county: "Sarasota County", type: "3PS Quota / Package Store", price: 340000, priceLabel: "$340,000", image: "/assets/listing-sarasota.png" },
  { county: "Lee County", type: "4COP Quota", price: 425000, priceLabel: "$425,000", image: "/assets/listing-lee.png" },
];

const transactions = [
  ["Palm Beach County", "4COP Quota", "$965,000"],
  ["Brevard County", "4COP Quota", "$585,000"],
  ["Broward County", "3PS Quota / Package Store", "$615,000"],
  ["Hillsborough County", "4COP Quota", "$495,000"],
  ["Collier County", "3PS Quota / Package Store", "$330,000"],
];

const serviceCards = [
  { icon: "/assets/service-browse.png", title: <>Browse <em>Featured</em> Licenses</>, copy: "Search featured listings by county, license type, and price.", href: "#featured", tone: "navy" },
  { icon: "/assets/service-sell.png", title: <>Sell Your License</>, copy: "List your license with confidential marketing and expert representation.", href: "#sell", tone: "gold" },
  { icon: "/assets/service-financing.png", title: <>Explore <em>Financing</em></>, copy: "Connect with financing sources and capital partners.", href: "#financing", tone: "navy" },
  { icon: "/assets/service-investment.png", title: <>Investment Opportunities</>, copy: "Discover Lending Opportunities in Florida's Liquor License Market", href: "#market-data", tone: "light" },
];

const stats = [
  ["/assets/stat-active-listings.png", "248+", "Active Listings", "Across Florida"],
  ["/assets/stat-registered-buyers.png", "1,250+", "Registered Buyers", "Ready to Buy"],
  ["/assets/stat-financing-partners.png", "75+", "Financing Partners", "Lenders & Capital Sources"],
  ["/assets/stat-registered-investors.png", "420+", "Registered Investors", "Actively Seeking Opportunities"],
  ["/assets/stat-florida-counties.png", "67", "Florida Counties", "Statewide Coverage"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [county, setCounty] = useState("all");
  const [licenseType, setLicenseType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchActive, setSearchActive] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [carouselOffset, setCarouselOffset] = useState(0);

  const filteredListings = useMemo(() => {
    if (!searchActive) return listings;
    return listings.filter((listing) => {
      const countyMatch = county === "all" || listing.county === county;
      const typeMatch = licenseType === "all" || listing.type === licenseType;
      const priceMatch =
        priceRange === "all" ||
        (priceRange === "under350" && listing.price < 350000) ||
        (priceRange === "350to500" && listing.price >= 350000 && listing.price <= 500000) ||
        (priceRange === "over500" && listing.price > 500000);
      return countyMatch && typeMatch && priceMatch;
    });
  }, [county, licenseType, priceRange, searchActive]);

  const orderedListings = useMemo(() => {
    if (filteredListings.length < 2) return filteredListings;
    const offset = ((carouselOffset % filteredListings.length) + filteredListings.length) % filteredListings.length;
    return [...filteredListings.slice(offset), ...filteredListings.slice(0, offset)];
  }, [carouselOffset, filteredListings]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchActive(true);
    setCarouselOffset(0);
    document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleSaved(name: string) {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <main className="market-page">
      <section className="hero" id="top">
        <img className="hero-photo hero-photo-left" src="/assets/hero-skyline-full.png" alt="Miami skyline at sunset" />
        <img className="hero-photo hero-photo-right" src="/assets/hero-bar-full.png" alt="Upscale Florida bar interior" />
        <div className="hero-shade" />

        <header className="site-header page-shell">
          <a className="brand-lockup" href="#top" aria-label="Florida Liquor License Market home">
            <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
          </a>
          <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>☰</button>
          <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
            <a href="#featured"><span>Buy</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
            <a href="#sell"><span>Sell</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
            <a href="#financing"><span>Finance</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
            <a href="#market-data"><span>Invest</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
            <a href="#market-data"><span>Market Data</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
            <a href="#resources"><span>Resources</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
          </nav>
          <div className="header-actions">
            <a className="btn btn-gold" href="#sell">List Your License</a>
            <a className="btn btn-outline" href="mailto:info@floridaliquorlicensemarket.com"><span className="contact-phone" aria-hidden="true">☎</span>Contact Us</a>
          </div>
        </header>

        <div className="hero-content page-shell">
          <h1><span>Buy &amp; Sell</span>Florida Liquor Licenses</h1>
          <p className="confidential"><i /><img className="confidential-icon" src="/assets/hero-confidential-shield.png" alt="" aria-hidden="true" /><strong>Confidential Inquiries</strong><i /></p>
          <div className="audience-row" aria-label="Marketplace audiences">
            <span><img src="/assets/audience-buyers.png" alt="" aria-hidden="true" /><b>Buyers</b></span>
            <span><img src="/assets/audience-sellers.png" alt="" aria-hidden="true" /><b>Sellers</b></span>
            <span><img src="/assets/audience-investors.png" alt="" aria-hidden="true" /><b>Investors</b></span>
            <span><img src="/assets/audience-financing.png" alt="" aria-hidden="true" /><b>Financing Solutions</b></span>
            <span><img src="/assets/audience-florida.png" alt="" aria-hidden="true" /><b>Across Florida</b></span>
          </div>
          <p className="trust-line"><img className="trust-icon" src="/assets/hero-trusted-shield.png" alt="" aria-hidden="true" />Trusted by Florida restaurant owners, hospitality groups, investors and brokers.<br />Serving buyers and sellers in all 67 Florida counties.</p>

          <form className="license-search" onSubmit={submitSearch}>
            <h2><span className="search-heading-icon" aria-hidden="true" /> Find a Florida Liquor License</h2>
            <div className="search-controls">
              <label>
                <span className="sr-only">County</span>
                <img className="search-control-icon" src="/assets/search-county.png" alt="" aria-hidden="true" />
                <select value={county} onChange={(event) => setCounty(event.target.value)}>
                  <option value="all">Select County</option>
                  {listings.map((listing) => <option key={listing.county} value={listing.county}>{listing.county}</option>)}
                </select>
              </label>
              <label>
                <span className="sr-only">License type</span>
                <img className="search-control-icon" src="/assets/search-license.png" alt="" aria-hidden="true" />
                <select value={licenseType} onChange={(event) => setLicenseType(event.target.value)}>
                  <option value="all">Select License Type</option>
                  <option value="4COP Quota">4COP Quota</option>
                  <option value="3PS Quota / Package Store">3PS Quota / Package Store</option>
                </select>
              </label>
              <label>
                <span className="sr-only">Price range</span>
                <img className="search-control-icon" src="/assets/search-price.png" alt="" aria-hidden="true" />
                <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
                  <option value="all">Price Range</option>
                  <option value="under350">Under $350,000</option>
                  <option value="350to500">$350,000–$500,000</option>
                  <option value="over500">Over $500,000</option>
                </select>
              </label>
              <button className="btn btn-gold search-submit" type="submit">Search Listings <img className="search-button-icon" src="/assets/search-submit.png" alt="" aria-hidden="true" /></button>
            </div>
            <div className="search-assurances">
              <span><img src="/assets/assurance-confidential.png" alt="" aria-hidden="true" />Confidential Listings</span>
              <span><img src="/assets/assurance-professional.png" alt="" aria-hidden="true" />Professional Representation</span>
              <span><img src="/assets/assurance-statewide.png" alt="" aria-hidden="true" />Statewide Coverage</span>
              <span><img src="/assets/assurance-secure.png" alt="" aria-hidden="true" />Discreet. Secure. Trusted.</span>
            </div>
          </form>
        </div>
      </section>

      <aside className="video-invite" aria-label="Marketplace overview video">
        <div className="page-shell video-invite-inner">
          <span className="video-invite-kicker">New to the marketplace?</span>
          <a className="video-invite-action" href="#market-report">
            <span className="play-button" aria-hidden="true">▶</span>
            <span><strong>Watch How It Works</strong><small>3 Minutes</small></span>
            <i aria-hidden="true">›</i>
          </a>
        </div>
      </aside>

      <section className="services page-shell" aria-label="Marketplace services">
        {serviceCards.map((card) => (
          <a className={`service-card ${card.tone}`} href={card.href} key={card.copy}>
            <img className="service-icon" src={card.icon} alt="" aria-hidden="true" />
            <span><strong>{card.title}</strong><small>{card.copy}</small></span>
            <i>›</i>
          </a>
        ))}
      </section>

      <section className="stats page-shell" aria-label="Marketplace statistics">
        {stats.map(([icon, value, label, detail]) => (
          <article key={label}>
            <img className="stat-icon" src={icon} alt="" aria-hidden="true" />
            <span><strong>{value}</strong><em>{label}</em><small>{detail}</small></span>
          </article>
        ))}
      </section>

      <section className="market-content" id="featured">
        <div className="page-shell">
          <div className="section-title">
            <h2>Featured Florida Liquor Licenses</h2>
            <button type="button" onClick={() => { setSearchActive(false); setCounty("all"); setLicenseType("all"); setPriceRange("all"); }}>View All Listings ›</button>
          </div>

          {searchActive && (
            <div className="search-result" role="status">
              {filteredListings.length ? `${filteredListings.length} matching license${filteredListings.length === 1 ? "" : "s"} found.` : "No current listings match those filters."}
              <button type="button" onClick={() => setSearchActive(false)}>Clear filters</button>
            </div>
          )}

          <div className="listing-carousel">
            <button className="carousel-arrow previous" type="button" aria-label="Previous listings" onClick={() => setCarouselOffset((value) => value - 1)}>‹</button>
            <div className="listing-grid">
              {orderedListings.map((listing) => (
                <article className="listing-card" key={listing.county}>
                  <div className="listing-photo">
                    <img src={listing.image} alt={`Restaurant or bar interior in ${listing.county}`} />
                    <span>{listing.type}</span>
                    <button type="button" aria-label={`${saved.has(listing.county) ? "Remove" : "Save"} ${listing.county} listing`} aria-pressed={saved.has(listing.county)} onClick={() => toggleSaved(listing.county)}>{saved.has(listing.county) ? "★" : "☆"}</button>
                  </div>
                  <div className="listing-body">
                    <p>● {listing.county}</p>
                    <h3>{listing.priceLabel}</h3>
                    <div><span>★ Restaurant / Bar</span><span>⇄ Transferable</span></div>
                  </div>
                </article>
              ))}
            </div>
            <button className="carousel-arrow next" type="button" aria-label="Next listings" onClick={() => setCarouselOffset((value) => value + 1)}>›</button>
          </div>

          <section className="market-report" id="market-report" aria-labelledby="market-report-title">
            <div className="report-copy">
              <span className="report-eyebrow">Video Briefing · Episode 1</span>
              <h2 id="market-report-title">Florida Liquor License<br /><em>Market Report</em></h2>
              <p>Watch our three-minute introduction to learn how buyers, sellers, financing partners, and investors connect through Florida&apos;s dedicated liquor license marketplace.</p>
              <a className="report-episodes-link" href="#resources">View All Episodes <span aria-hidden="true">›</span></a>
            </div>
            <div className="report-video" role="img" aria-label="Video coming soon: Florida Liquor License Market Report">
              <div className="report-screen">
                <span className="report-live-label">Market Report</span>
                <div className="report-desk" aria-hidden="true">
                  <span className="report-presenter presenter-one" />
                  <span className="report-presenter presenter-two" />
                  <i />
                </div>
                <div className="report-video-message">
                  <span className="report-play" aria-hidden="true">▶</span>
                  <strong>Episode 1 Coming Soon</strong>
                  <small>The video will play here—never automatically.</small>
                </div>
              </div>
            </div>
          </section>

          <section className="insight-grid" id="market-data">
            <article className="info-panel transactions-panel">
              <div className="panel-title"><h2>Recent Florida Transactions</h2><a href="#featured">View All ›</a></div>
              <table>
                <thead><tr><th>County</th><th>License Type</th><th>Sale Price</th></tr></thead>
                <tbody>{transactions.map(([transactionCounty, type, price]) => <tr key={transactionCounty}><td>{transactionCounty}</td><td>{type}</td><td>{price}</td></tr>)}</tbody>
              </table>
              <a className="panel-link" href="#featured">View All Transactions ›</a>
            </article>

            <article className="info-panel map-panel">
              <div className="panel-title"><h2>Florida Market Insights</h2><a href="#market-data">View All ›</a></div>
              <div className="map-content">
                <div><h3>Average 4COP<br />Quota Price<br />by County</h3>
                  <ul><li><i className="range-1" />$600K+</li><li><i className="range-2" />$450K – $600K</li><li><i className="range-3" />$300K – $450K</li><li><i className="range-4" />$200K – $300K</li><li><i className="range-5" />Under $200K</li></ul>
                </div>
                <div className="florida-map-art">
                  <img src="/assets/florida-map-clean.png" alt="Florida average 4COP quota price map by county" />
                </div>
              </div>
              <a className="panel-link" href="#market-data">Explore Market Data ›</a>
            </article>

            <article className="info-panel financing-panel" id="financing">
              <div className="panel-title"><h2>Financing Spotlight</h2><a href="#financing">View All ›</a></div>
              <div className="finance-item"><b>▥</b><span><strong>Acquisition Financing</strong><small>Finance the purchase of your next liquor license with competitive terms and flexible loans.</small></span></div>
              <div className="finance-item"><b>$</b><span><strong>Refinance Existing Debt</strong><small>Lower rates &amp; flexible terms from our lending partners.</small></span></div>
              <div className="finance-item"><b>♧</b><span><strong>Private Capital Introductions</strong><small>Connect with private lenders and investors for your business goals.</small></span></div>
              <a className="panel-link" href="mailto:info@floridaliquorlicensemarket.com?subject=Financing%20options">Explore Financing Options ›</a>
            </article>
          </section>

          <section className="cta" id="sell">
            <img className="cta-icon" src="/assets/cta-shield.png" alt="" aria-hidden="true" /><span><strong>Ready to Buy, Sell, Finance, or Invest in a Liquor License?</strong><small>Join Florida&apos;s most trusted marketplace for liquor license transactions.</small></span>
            <a className="btn btn-gold" href="mailto:info@floridaliquorlicensemarket.com?subject=Florida%20liquor%20license%20inquiry">Get Started Today ›</a>
          </section>
        </div>
      </section>

      <footer id="resources">
        <div className="page-shell footer-grid">
          <div className="footer-brand"><img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" /><p>Florida&apos;s marketplace for buying, selling &amp; financing liquor licenses.</p><b>Buy · Sell · Finance · Invest</b></div>
          <div><strong>Marketplace</strong><a href="#featured">Browse Licenses</a><a href="#sell">Sell Your License</a><a href="#financing">Financing Solutions</a><a href="#market-data">Investment Opportunities</a></div>
          <div><strong>Company</strong><a href="#top">About Us</a><a href="#top">Our Process</a><a href="#top">Testimonials</a><a href="mailto:info@floridaliquorlicensemarket.com">Contact Us</a></div>
          <div><strong>Resources</strong><a href="#market-data">Market Data</a><a href="#market-data">Blog</a><a href="#resources">FAQ</a><a href="#resources">Documents</a></div>
          <div className="social"><strong>Stay Connected</strong><div><a href="#resources" aria-label="LinkedIn">in</a><a href="#resources" aria-label="Facebook">f</a><a href="#resources" aria-label="Instagram">◎</a><a href="#resources" aria-label="YouTube">▶</a><a href="mailto:info@floridaliquorlicensemarket.com" aria-label="Email">✉</a></div><small><a href="/privacy-policy">Privacy Policy</a> &nbsp;|&nbsp; <a href="/terms-of-use">Terms of Use</a>.</small></div>
        </div>
        <div className="page-shell copyright">© 2026 Florida Liquor License Market. All rights reserved.</div>
      </footer>
    </main>
  );
}
