import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import LicenseAlertForm from "@/components/LicenseAlertForm";
import "@/app/resources/forms/abt-forms.css";
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

const reasons = [
  {
    number: "01",
    title: "Watch the counties that matter",
    copy: "Florida quota licenses are county-specific. Choose one county, several counties, or all 67.",
  },
  {
    number: "02",
    title: "Follow 4COP, 3PS, or both",
    copy: "Track the quota-license privileges that fit your business or acquisition plan.",
  },
  {
    number: "03",
    title: "Set an optional price ceiling",
    copy: "Filter alerts by your maximum asking price, or leave it open to see every matching FLLM listing.",
  },
  {
    number: "04",
    title: "Know when inventory appears",
    copy: "Instead of repeatedly checking the marketplace, receive an email when FLLM publishes a matching listing.",
  },
] as const;

export default async function LicenseAlertsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = first(params.status);

  return (
    <main className="license-alert-page">
      <div className="abt-header-wrap license-alert-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" />
      </div>

      <section className="license-alert-hero">
        <div className="page-shell license-alert-hero-inner">
          <div className="license-alert-hero-copy">
            <span className="license-alert-kicker">FLLM Buyer Service</span>
            <h1>
              Get notified when the <em>right Florida liquor license</em> is listed.
            </h1>
            <p>
              Choose your counties, license type and optional price ceiling. FLLM will email you when a new marketplace listing matches your preferences.
            </p>

            <div className="license-alert-benefits" aria-label="License alert benefits">
              <span>✓ County-specific alerts</span>
              <span>✓ 4COP &amp; 3PS matching</span>
              <span>✓ Optional price ceiling</span>
              <span>✓ No password required</span>
            </div>

            <div className="license-alert-hero-actions">
              <Link className="license-alert-secondary-cta" href="/listings">
                Browse Current Licenses <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="license-alert-form-shell" id="create-alert">
            <LicenseAlertForm />
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

      <section className="license-alert-reasons">
        <div className="page-shell">
          <div className="license-alert-section-heading">
            <div>
              <span>Why use FLLM License Alerts?</span>
              <h2>Stop refreshing the marketplace manually.</h2>
            </div>
            <p>
              Desirable quota-license inventory can appear irregularly. Create one focused watch and let FLLM check new marketplace listings against the criteria you choose.
            </p>
          </div>

          <div className="license-alert-reason-grid">
            {reasons.map((reason) => (
              <article key={reason.number}>
                <span>{reason.number}</span>
                <strong>{reason.title}</strong>
                <p>{reason.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="license-alert-market-cta">
        <div className="page-shell">
          <div>
            <span>Already shopping?</span>
            <h2>See what is available in Florida now.</h2>
            <p>Browse active FLLM listings by county, license type and asking price.</p>
          </div>
          <Link href="/listings">View Current Listings <span aria-hidden="true">→</span></Link>
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
