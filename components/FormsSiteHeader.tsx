"use client";

import Script from "next/script";
import { useState } from "react";

export default function FormsSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header forms-site-header page-shell">
        <a className="brand-lockup" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          ☰
        </button>
        <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          <a href="/listings"><span>Buy</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
          <a href="/sell-your-license"><span>Sell</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
          <a href="/financing"><span>Finance</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
          <a href="/investment-opportunities"><span>Invest</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
          <a href="/#market-data"><span>Market Data</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
          <a href="/resources/forms"><span>Resources</span><img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" /></a>
        </nav>
        <div className="header-actions">
          <a className="btn btn-gold" href="/sell-your-license">List Your License</a>
          <a className="btn btn-outline" href="/contact">
            <span className="contact-phone" aria-hidden="true">☎</span>Contact Us
          </a>
        </div>
      </header>
      <Script src="/assets/resources-dropdown.js?v=8" strategy="afterInteractive" />
    </>
  );
}

