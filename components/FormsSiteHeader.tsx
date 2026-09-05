"use client";

import { useState } from "react";
import HeaderNavMenus from "@/components/HeaderNavMenus";

type FormsSiteHeaderProps = {
  primaryActionHref?: string;
  primaryActionLabel?: string;
};

export default function FormsSiteHeader({
  primaryActionHref = "/sell-your-license",
  primaryActionLabel = "List Your License",
}: FormsSiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isBrokerListPage = primaryActionLabel === "List a Client License";

  return (
    <header className="site-header forms-site-header page-shell">
      <a
        className="brand-lockup"
        href="/"
        aria-label="Florida Liquor License Market home"
        style={isBrokerListPage ? { position: "relative", left: "-30px" } : undefined}
      >
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
      <HeaderNavMenus className={menuOpen ? "primary-nav is-open" : "primary-nav"} />
      <div className="header-actions">
        <a className="btn btn-gold" href={primaryActionHref}>{primaryActionLabel}</a>
        <a className="btn btn-outline" href="/contact">
          <span className="contact-phone" aria-hidden="true">☎</span>Contact Us
        </a>
      </div>
    </header>
  );
}
