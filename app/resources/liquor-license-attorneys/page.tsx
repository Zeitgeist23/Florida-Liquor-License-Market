import type { Metadata } from "next";

import AttorneyDirectory from "@/components/AttorneyDirectory";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./liquor-license-attorneys.css";

export const metadata: Metadata = {
  title: "Florida Liquor License Attorneys | Florida Liquor License Market",
  description:
    "Find Florida attorneys whose practices include alcoholic-beverage licensing, liquor-license purchases and sales, transfers, and transaction closings.",
};

export default function FloridaLiquorLicenseAttorneysPage() {
  return (
    <main className="attorney-directory-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="attorney-hero">
        <div className="page-shell">
          <nav className="attorney-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span>›</span><b>Florida Liquor License Attorneys</b>
          </nav>
          <span className="attorney-eyebrow">Resources · Independent legal directory</span>
          <h1>Florida Liquor License Attorneys</h1>
          <p>
            Public contact information for Florida attorneys whose published practices include alcoholic-beverage licensing, regulated transactions, liquor-license purchases and sales, or related closings.
          </p>
          <div className="attorney-hero-actions">
            <a className="btn btn-gold" href="#attorney-directory">Browse Attorneys</a>
            <a
              className="btn btn-outline"
              href="https://www.floridabar.org/directories/find-mbr/"
              target="_blank"
              rel="noreferrer"
            >
              Verify with The Florida Bar
            </a>
          </div>
        </div>
      </section>

      <section className="attorney-intro page-shell" aria-labelledby="directory-heading">
        <div>
          <span>Before choosing counsel</span>
          <h2 id="directory-heading">Compare experience, availability, and fees</h2>
        </div>
        <p>
          Ask whether the attorney handles the specific legal work you need, including due diligence, lien review, escrow, purchase agreements, ABT transfer filings, temporary-license coordination, and the closing itself.
        </p>
      </section>

      <AttorneyDirectory />

      <section className="attorney-official-resources page-shell" aria-labelledby="official-resources-heading">
        <div>
          <span>Independent verification</span>
          <h2 id="official-resources-heading">Check an attorney before hiring</h2>
          <p>
            Confirm current Florida Bar eligibility, disciplinary history, relevant experience, scope of work, and fees directly. You may also use The Florida Bar’s lawyer-referral service if you want another option.
          </p>
        </div>
        <div className="attorney-official-links">
          <a href="https://www.floridabar.org/directories/find-mbr/" target="_blank" rel="noreferrer">
            <strong>Florida Bar Member Search</strong>
            <small>Verify membership and eligibility</small>
          </a>
          <a href="https://www.floridabar.org/public/lrs/" target="_blank" rel="noreferrer">
            <strong>Florida Bar Lawyer Referral Service</strong>
            <small>800-342-8011</small>
          </a>
        </div>
      </section>

      <section className="attorney-disclosure page-shell" aria-label="Directory disclaimer">
        <strong>Important directory disclosure</strong>
        <p>
          Florida Liquor License Market is not a law firm and does not provide legal advice. This directory is provided for general informational purposes only. Inclusion, omission, and alphabetical ordering do not constitute an endorsement, ranking, certification, referral, or guarantee. No attorney-client relationship is created by using this page or contacting a listed attorney. Attorney descriptions summarize publicly available firm information and may change. Verify all credentials, services, fees, conflicts, and engagement terms independently before retaining counsel. Any future sponsored placement will be clearly identified.
        </p>
        <small>Directory information last reviewed July 30, 2026.</small>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="/">Return to Florida Liquor License Market</a>
        </div>
      </footer>
    </main>
  );
}

