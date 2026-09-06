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
    <>
      {isBrokerListPage ? (
        <style>{`
          @media (max-width: 820px) {
            .broker-list-site-header {
              position: relative !important;
              min-height: 108px !important;
              height: auto !important;
              padding-top: 10px !important;
              padding-bottom: 10px !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .broker-list-site-header .brand-lockup {
              position: absolute !important;
              left: 50% !important;
              top: 50% !important;
              transform: translate(-50%, -50%) !important;
              flex: 0 0 65% !important;
              width: 65% !important;
              max-width: 300px !important;
              min-width: 0 !important;
              margin: 0 !important;
              justify-content: center !important;
            }
            .broker-list-site-header .brand-lockup img {
              display: block !important;
              width: 100% !important;
              height: auto !important;
              max-height: 92px !important;
              object-fit: contain !important;
              object-position: center center !important;
              transform: none !important;
            }
            .broker-list-site-header .menu-toggle {
              position: absolute !important;
              right: 0 !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              margin: 0 !important;
            }
          }
        `}</style>
      ) : null}

      <header className={`site-header forms-site-header page-shell${isBrokerListPage ? " broker-list-site-header" : ""}`}>
        <a className="brand-lockup" href="/" aria-label="Florida Liquor License Market home">
          <img
            src="/assets/brand-sharp.svg"
            alt="Florida Liquor License Market"
            style={isBrokerListPage ? { transform: "translateX(-30px)" } : undefined}
          />
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
    </>
  );
}
