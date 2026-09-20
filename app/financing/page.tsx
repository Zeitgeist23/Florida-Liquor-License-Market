import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import FinancingRequestForm from "./FinancingRequestForm";

import "../fllm-official-template.css";
import "../resources/forms/abt-forms.css";
import "./financing-native.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/financing`;

export const metadata: Metadata = {
  title: "Florida Liquor License Financing | 4COP & 3PS Loans",
  description:
    "Explore Florida liquor license financing for qualifying 4COP and 3PS purchases and refinances, including lender diligence, ABT lien searches and lien-perfection controls.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Financing | 4COP & 3PS",
    description:
      "Financing resources for qualifying Florida 4COP and 3PS liquor-license purchases and refinances.",
    siteName: "Florida Liquor License Market",
  },
};

export default function FinancingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Florida Liquor License Financing",
    url: canonicalUrl,
    provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    areaServed: { "@type": "State", name: "Florida" },
    description:
      "Financing resources and lender-introduction requests for qualifying Florida quota liquor-license purchases and refinances.",
  };

  return (
    <main className="financing-native-page fllm-official-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="financing-native-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" />
      </div>

      <section className="financing-native-hero">
        <div className="financing-native-shell financing-native-grid">
          <div className="financing-native-copy">
            <span>Florida Quota License Financing</span>
            <h1>Florida Liquor License Financing for 4COP &amp; 3PS Licenses</h1>
            <p>
              Explore financing for the purchase or refinance of qualifying Florida quota liquor licenses. Specialized private lenders may evaluate license value, county, down payment or equity, transaction structure, collateral and borrower qualifications.
            </p>

            <div className="financing-native-rate">
              <strong>10%–12%</strong>
              <span>Typical indicative interest-rate range offered through the private-lender network, subject to lender underwriting, license value, loan structure and market conditions.</span>
            </div>

            <div className="financing-native-details">
              <article id="private-lenders"><h2>Access to Private Lenders</h2><p>Florida Liquor License Market has access to a network of private lenders that may finance eligible Florida quota-license purchases and refinances.</p></article>
              <article><h2>Purchase Financing</h2><p>Preserve working capital by financing a portion of an eligible quota-license acquisition, subject to lender underwriting and collateral requirements.</p></article>
              <article><h2>Quota-License Refinancing</h2><p>Qualified license owners may be able to refinance an existing quota license or restructure current license-backed debt.</p></article>
              <article><h2>What Lenders Evaluate</h2><p>Typical considerations include county, license type and market value, requested loan amount, down payment or equity, transaction structure and supporting borrower information.</p></article>
            </div>

            <div className="financing-native-trust">
              <img src="/assets/hero-trusted-shield.png" alt="" aria-hidden="true" />
              <span><strong>Private and confidential</strong><small>Your information is shared only as needed to evaluate financing options and make appropriate lender introductions.</small></span>
            </div>
          </div>

          <FinancingRequestForm />
        </div>
      </section>

      <section className="financing-native-resources" aria-label="Florida liquor license financing resources">
        <div className="financing-native-shell financing-native-resources-grid">
          <article className="financing-native-resource-card">
            <span>Interactive Financing Tool</span>
            <h2>Loan Payment Calculator</h2>
            <p>Model purchase or refinance payments, compare interest rates and review amortization schedules.</p>
            <a href="/financing/loan-payment-calculator">Open Loan Calculator →</a>
          </article>
          <article className="financing-native-resource-card">
            <span>Professional License Valuation</span>
            <h2>Liquor License Appraisal</h2>
            <p>Review FLLM appraisal resources supported by county market evidence, comparable listings and regulatory research.</p>
            <a href="/florida-liquor-license-appraisal">Review Appraisal Options →</a>
          </article>
          <article className="financing-native-resource-card">
            <span>Financing Guide</span>
            <h2>How to Finance a Florida Liquor License</h2>
            <p>Review collateral value, transaction structure, private-lender considerations and borrower preparation.</p>
            <a href="/how-to-finance-florida-liquor-license">Read Financing Guide →</a>
          </article>
          <article className="financing-native-resource-card">
            <span>Florida Collateral Controls</span>
            <h2>Lien Search, Recording &amp; Renewal</h2>
            <p>Review ABT-6023 lien diligence, the 90-day ABT-6022 recording period, five-year duration and six-month renewal window.</p>
            <a href="/how-to-finance-florida-liquor-license#lien-perfection">Review Lien Perfection Guide →</a>
          </article>
        </div>
      </section>
    </main>
  );
}
