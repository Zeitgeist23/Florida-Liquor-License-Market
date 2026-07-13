"use client";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <a className="brand" href="#top" aria-label="Florida Liquor License Market home">
          <Image src="/images/logo.png" alt="Florida Liquor License Market" width={200} height={78} priority />
        </a>
        <button className="menuButton" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span/><span/><span/></button>
        <nav className={`primaryNav ${open ? "open" : ""}`}>
          <a href="#featured">Buy</a><a href="#sell">Sell</a><a href="#financing">Finance</a><a href="#invest">Invest</a><a href="#market-data">Market Data</a><a href="#resources">Resources</a>
        </nav>
        <div className="headerActions"><a className="primaryButton" href="#sell">List Your License</a><a className="outlineButton" href="#contact">☎ Contact Us</a></div>
      </div>
    </header>
  );
}
