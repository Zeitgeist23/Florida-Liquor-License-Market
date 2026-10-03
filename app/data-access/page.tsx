import type { Metadata } from "next";
import Link from "next/link";

import { FllmPageShell, FllmSectionHeading, FllmCard, FllmCardGrid, FllmButton } from "@/components/FllmDesignSystem";
import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/data-access`;

export const metadata: Metadata = {
  title: "Premium Florida Liquor License Data Access | FLLM",
  description:
    "Request paid access to FLLM historical Florida liquor-license datasets, county market analytics, financing records, ownership histories, business-for-sale lifecycle data and research exports.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Premium Florida Liquor License Data Access | FLLM",
    description:
      "Public market insights remain available on FLLM. Downloadable historical datasets, bulk exports and advanced analytics are premium data products.",
    siteName: "Florida Liquor License Market",
  },
};

export default function DataAccessPage() {
  return (
    <FllmPageShell className="county-market-page">
      <section className="county-hero">
        <div className="county-shell county-hero-grid">
          <div>
            <div className="county-breadcrumbs">
              <Link href="/">Home</Link><span>›</span><Link href="/research">Research</Link><span>›</span><strong>Premium Data Access</strong>
            </div>
            <span className="county-kicker">FLLM Premium Market Intelligence</span>
            <h1>Florida Liquor License Data Access</h1>
            <p>
              FLLM publishes selected market insights publicly. Downloadable historical datasets, bulk market exports,
              financing intelligence, ownership histories and advanced analytics are premium data products.
            </p>
            <div className="county-hero-actions">
              <Link className="county-button county-button-gold" href="/contact?inquiry=premium-data-access">Request Paid Data Access</Link>
              <Link className="county-button county-button-dark" href="/florida-liquor-license-market-index">View Public Market Index</Link>
            </div>
          </div>
          <aside className="county-map-card">
            <span>Premium Data Scope</span>
            <strong>Historical, source-traceable Florida market intelligence</strong>
            <p>Designed for lenders, appraisers, attorneys, brokers, investors, researchers and institutional users.</p>
          </aside>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Public Insights · Premium Datasets"
            title="FLLM does not provide its underlying historical dataset as a free download"
            copy={<p>Headline statistics and selected charts may be publicly available. Structured exports and deeper historical records require paid access.</p>}
          />
          <FllmCardGrid columns={3}>
            <FllmCard eyebrow="Market History" title="Historical asking-price and inventory data" variant="gold">
              <p>County and license-type observations, first-seen and last-seen dates, price changes, median trends, dispersion and archived market snapshots.</p>
            </FllmCard>
            <FllmCard eyebrow="Capital Markets" title="Financing, lenders and ownership" variant="gold">
              <p>Documented lender activity, recorded lien events, ownership changes, license transfers and operator classifications where supportable.</p>
            </FllmCard>
            <FllmCard eyebrow="Business Market" title="Licensed-business lifecycle analytics" variant="gold">
              <p>Restaurants, bars, nightclubs, liquor stores and other licensed businesses, including observable days on market, broker/brokerage data and legal-filing overlays.</p>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Available by Request"
            title="Paid access can be scoped to the research need"
            copy={<p>FLLM can provide county-level, license-type, lender, ownership, transaction or business-market datasets without releasing the entire database.</p>}
          />
          <FllmCardGrid columns={3}>
            <FllmCard eyebrow="Professional" title="County or license-type export">
              <p>Targeted historical data for a defined county, license class or market segment.</p>
            </FllmCard>
            <FllmCard eyebrow="Research" title="Multi-market historical dataset">
              <p>Broader historical exports for analysis across counties, license types and time periods.</p>
            </FllmCard>
            <FllmCard eyebrow="Institutional" title="Custom and recurring data access">
              <p>Custom extracts, recurring deliveries and advanced analytics for lenders, appraisal firms, law firms and institutional users.</p>
            </FllmCard>
          </FllmCardGrid>
          <div className="fllm-ui-actions">
            <FllmButton href="/contact?inquiry=premium-data-access">Request Pricing & Data Access</FllmButton>
            <FllmButton href="/research" variant="outline">Return to Research Center</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
