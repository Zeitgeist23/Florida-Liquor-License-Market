import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import InvestmentLenderForm from "./InvestmentLenderForm";

import "../fllm-official-template.css";
import "./investment-opportunities.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/investment-opportunities`;

export const metadata: Metadata = {
  title: "Private Liquor License Lending Opportunities | Florida Liquor License Market",
  description:
    "Learn about privately negotiated Florida quota-license lending opportunities, collateral, risks, and lender-interest submissions.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Private Liquor License Lending Opportunities | Florida Liquor License Market",
    description:
      "Learn about privately negotiated Florida quota-license lending opportunities, collateral, risks, and lender-interest submissions.",
    siteName: "Florida Liquor License Market",
  },
};

export default function InvestmentOpportunitiesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Florida Liquor License Private Lending Opportunities",
    url: canonicalUrl,
    provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    areaServed: { "@type": "State", name: "Florida" },
    description:
      "Educational information and lender-interest intake for privately negotiated Florida quota liquor-license loans.",
  };

  return (
    <main className="investment-native-page fllm-official-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="investment-native-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="investment-native-hero">
        <div className="investment-native-shell investment-native-grid">
          <div className="investment-native-copy">
            <span>Private Quota-License Lending</span>
            <h1>Put Private Capital to Work</h1>
            <p>
              Individuals may use eligible personal funds to make privately negotiated loans for qualified Florida quota-license purchases. Funding may come from checking, savings, or money-market accounts. A properly structured self-directed IRA may also make private loans through its custodian, subject to federal tax rules and prohibited-transaction restrictions.
            </p>

            <div className="investment-native-rate">
              <strong>10%–12%</strong>
              <span>Indicative annual note-rate range for opportunities presented through our network. This is not a promised return; every loan is separately negotiated and subject to borrower, collateral, documentation, and market risk.</span>
            </div>

            <div className="investment-native-details">
              <article><h2>How the Loan Is Secured</h2><p>A lender may receive a lien or security interest in an eligible 4COP quota license. To be enforceable against the license, the interest must be properly documented and recorded with Florida&apos;s Division of Alcoholic Beverages and Tobacco within the required period.</p></article>
              <article><h2>Interest Payments</h2><p>The promissory note establishes the interest rate, payment schedule, maturity, default provisions, and other terms. Payments and principal are obligations of the borrower and are not guaranteed by Florida Liquor License Market.</p></article>
              <article><h2>What Happens After Default</h2><p>If a borrower defaults, a properly perfected lien may be enforced through a judicial foreclosure proceeding. The purchaser at a foreclosure sale must be legally qualified and authorized to hold or operate under the license, or must transfer it to a qualified person.</p></article>
              <article><h2>A Nonphysical Form of Collateral</h2><p>A quota license is an intangible regulatory asset, so it is not exposed to physical damage like a building. It can still decline in market value, be affected by liens, legal disputes, suspension or revocation, regulatory action, transfer restrictions, and foreclosure costs or delays.</p></article>
            </div>

            <div className="investment-native-risk">
              <strong>Important Investment and IRA Risks</strong>
              <p>Private loans can result in delayed payments or loss of principal and interest. A lien does not assure repayment or recovery of the full loan balance. Self-directed IRA investors should use a qualified custodian and consult independent tax and legal advisers before investing; transactions involving the IRA owner or another disqualified person can cause serious tax consequences.</p>
            </div>

            <div className="investment-native-trust">
              <img src="/assets/hero-trusted-shield.png" alt="" aria-hidden="true" />
              <span><strong>Opportunity matching—not investment advice</strong><small>Florida Liquor License Market introduces interested private lenders to potential transactions but does not guarantee performance or provide individualized legal, tax, or investment advice.</small></span>
            </div>

            <p className="investment-native-sources">Educational references: <a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0561%2FSections%2F0561.65.html" target="_blank" rel="noreferrer">Florida Statute §561.65</a>, <a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/forms-and-publications/" target="_blank" rel="noreferrer">DBPR lien forms</a>, and <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-prohibited-transactions" target="_blank" rel="noreferrer">IRS prohibited-transaction guidance</a>.</p>
          </div>

          <InvestmentLenderForm />
        </div>
      </section>

      <section className="investment-native-resources">
        <div className="investment-native-shell investment-native-resources-grid">
          <article><span>Retirement-Account Lending</span><h2>Self-Directed IRA Lending</h2><p>Review the structure, custodian considerations, prohibited-transaction issues and Florida beverage-law disclosures that can apply to an IRA-owned private note.</p><Link href="/self-directed-ira-liquor-license-lending">Review IRA Lending Guide →</Link></article>
          <article><span>Borrower Side</span><h2>Florida Liquor License Financing</h2><p>Explore purchase and refinance options, lender considerations, appraisal resources and the FLLM loan-payment calculator.</p><Link href="/financing">Explore Financing →</Link></article>
          <article><span>Risk & Documentation</span><h2>Private-Lending Disclosure</h2><p>Review FLLM&apos;s educational disclosure regarding lender risk, collateral, repayment, documentation and independent professional review.</p><Link href="/private-lending-disclosure">Read Disclosure →</Link></article>
        </div>
      </section>

      <footer className="investment-native-footer">
        <div className="investment-native-shell investment-native-footer-main">
          <div className="investment-native-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="investment-native-footer-national">
          <span>Looking for a liquor license outside Florida?</span>
          <a href="https://www.liquorlicensemarket.com/">Visit Liquor License Market — The National Marketplace.</a>
        </div>
      </footer>
    </main>
  );
}
