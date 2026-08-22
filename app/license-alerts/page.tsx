import type { Metadata } from "next";
import Link from "next/link";

import HeaderNavMenus from "@/components/HeaderNavMenus";
import LicenseAlertForm from "@/components/LicenseAlertForm";
import "./license-alerts.css";

export const metadata: Metadata = {
  title: "Florida Liquor License Alerts | FLLM",
  description:
    "Create a free Florida liquor license alert and receive an email when a matching 4COP quota or 3PS package-store license is listed in the counties you select.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-alerts" },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LicenseAlertsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = first(params.status);

  return (
    <main className="license-alert-page">
      <header className="license-alert-header page-shell">
        <Link className="license-alert-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <HeaderNavMenus className="primary-nav" showContactLink />
      </header>

      <section className="license-alert-hero">
        <div className="page-shell license-alert-hero-inner">
          <div className="license-alert-hero-copy">
            <span className="license-alert-kicker">FLLM Buyer Service</span>
            <h1>Get notified when the <em>right Florida liquor license</em> comes available.</h1>
            <p>Choose the counties and license types you want. FLLM will email you when a new listing matches your preferences.</p>
            <div className="license-alert-benefits">
              <span>✓ County-specific alerts</span>
              <span>✓ 4COP &amp; 3PS matching</span>
              <span>✓ Optional price ceiling</span>
              <span>✓ No password required</span>
            </div>
            <Link className="license-alert-current-link" href="/listings">Browse current Florida liquor licenses for sale →</Link>
          </div>
          <div className="license-alert-hero-card" aria-hidden="true">
            <div className="license-alert-card-top"><span>NEW MATCH</span><small>License Alert</small></div>
            <div className="license-alert-card-body">
              <small>Orange County</small>
              <strong>4COP Quota</strong>
              <b>New listing available</b>
              <div><span>View Listing</span><span>→</span></div>
            </div>
          </div>
        </div>
      </section>

      {status && (
        <div className={`license-alert-status ${status === "unsubscribed" ? "success" : "warning"}`}>
          {status === "unsubscribed"
            ? "You have been unsubscribed from that License Alert."
            : "We could not locate that License Alert. It may already be inactive."}
        </div>
      )}

      <section className="license-alert-form-section">
        <div className="page-shell license-alert-form-layout">
          <div className="license-alert-side-copy">
            <span>Why use License Alerts?</span>
            <h2>Don’t keep checking the marketplace manually.</h2>
            <p>Quota licenses are county-specific and desirable inventory can appear irregularly. A saved alert lets FLLM watch for the combination you care about.</p>
            <ul>
              <li><strong>Target specific counties.</strong> Select one market or several.</li>
              <li><strong>Choose the privilege.</strong> Follow 4COP quota, 3PS package-store, or both.</li>
              <li><strong>Control the price range.</strong> Add an optional maximum asking price.</li>
              <li><strong>Act quickly.</strong> Receive an email when a matching FLLM listing is published.</li>
            </ul>
          </div>
          <LicenseAlertForm />
        </div>
      </section>

      <section className="license-alert-disclaimer">
        <div className="page-shell">
          <strong>Marketplace notice.</strong> License Alerts are informational. Availability, asking price, license status, transferability, liens, zoning, premises eligibility, and state or local approvals should be independently confirmed before a transaction.
        </div>
      </section>
    </main>
  );
}
