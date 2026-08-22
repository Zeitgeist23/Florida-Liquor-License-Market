import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "@/app/resources/forms/abt-forms.css";
import "@/app/florida-liquor-license-news/news-insights.css";
import "@/app/florida-liquor-license-news/news-mobile-readability.css";
import "@/app/florida-liquor-license-news/[slug]/article.css";
import "./property-privilege.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/florida-liquor-license-property-or-privilege`;

export const metadata: Metadata = {
  title: "Is a Florida Liquor License Property or a Privilege? | FLLM",
  description:
    "Understand why Florida liquor licenses can be treated as regulatory privileges while quota licenses also have transferable economic and property-like characteristics in private transactions.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license property",
    "Florida liquor license privilege",
    "Florida quota liquor license property rights",
    "Florida liquor license transfer law",
    "Florida liquor license lien",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Is a Florida Liquor License Property or a Privilege?",
    description:
      "FLLM explains the difference between regulatory use rights and the economic, transferable characteristics of Florida quota liquor licenses.",
    siteName: "Florida Liquor License Market",
  },
};

export default function FloridaLiquorLicensePropertyOrPrivilegePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Is a Florida Liquor License Property or a Privilege?",
      description:
        "An FLLM legal and market explainer on the regulatory privilege and private economic characteristics of Florida liquor licenses.",
      mainEntityOfPage: canonicalUrl,
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${siteUrl}/resources` },
        { "@type": "ListItem", position: 3, name: "Property or Privilege", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="news-insights-page news-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap news-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="news-article-hero">
        <div className="page-shell news-article-shell">
          <nav className="news-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/resources/liquor-license-attorneys">Legal Resources</Link><span>›</span><strong>Property or Privilege</strong>
          </nav>
          <span className="news-eyebrow">Florida Beverage Law Explainer</span>
          <h1>Is a Florida Liquor License Property or a Privilege?</h1>
          <p className="news-article-deck">
            In Florida, the answer depends on the legal context. The state-granted right to operate under a license is regulatory, while quota licenses can also carry substantial transferable economic value and property-like characteristics in private transactions.
          </p>
        </div>
      </section>

      <article className="page-shell news-article-shell news-article-body">
        <p className="news-article-intro">
          Florida cases and statutes use the words “license,” “privilege,” “property,” “interest,” and “transfer” in different legal settings. The most useful way to understand the issue is to separate the government&apos;s power to authorize alcoholic-beverage activity from the private economic interests that can arise around a scarce quota license.
        </p>

        <section className="property-privilege-summary" aria-label="Regulatory privilege and private economic interest comparison">
          <article className="property-privilege-card">
            <span>Regulatory relationship with the state</span>
            <h2>License as a privilege</h2>
            <p>
              Florida administrative-law authorities treat a government-issued occupational or regulatory license as permission to engage in regulated activity. Jimerson Birr&apos;s alcoholic-beverage licensing overview makes this point while discussing DBPR licensing, disciplinary proceedings, administrative hearings, and judicial review.
            </p>
          </article>
          <article className="property-privilege-card">
            <span>Private transaction and economic context</span>
            <h2>Quota license with property-like characteristics</h2>
            <p>
              Florida quota liquor licenses are scarce, transferable subject to Beverage Law requirements, and may be encumbered by liens or security interests. Florida courts have long recognized that these characteristics can give a liquor license substantial economic value and qualities associated with property.
            </p>
          </article>
        </section>

        <section className="news-article-section">
          <h2>What the Jimerson Birr article is saying</h2>
          <p>
            Jimerson Birr&apos;s published overview states that an occupational license is a privilege granted by the state or its subdivisions and is not a property right protected by substantive due process. The page cites <em>Ammons v. Okeechobee County</em>, a case concerning an occupational licensing context, and then explains the DBPR process for alcoholic-beverage licensing, discipline, administrative hearings, and appeals.
          </p>
          <p>
            That proposition addresses the holder&apos;s relationship with government: possessing or applying for a license does not eliminate the state&apos;s regulatory authority or transform the permission to engage in regulated activity into an unrestricted constitutional property right.
          </p>
        </section>

        <section className="news-article-section">
          <h2>What Florida liquor-license law says about private economic interests</h2>
          <p>
            Florida Beverage Law separately recognizes transactions and security interests involving alcoholic-beverage licenses. Section 561.32 governs transfers and requires Division approval for a purchaser in a qualifying transfer. The same statute recognizes judicial enforcement of liens, while section 561.65 expressly addresses mortgages, liens, and security interests in spirituous alcoholic-beverage licenses.
          </p>
          <p>
            Florida appellate decisions such as <em>House v. Cotton</em> and <em>Walling Enterprises v. Mathias</em> are commonly cited for the distinction between a liquor license as a regulatory privilege against the state and its valuable, transferable, property-like characteristics in private commercial settings.
          </p>
        </section>

        <section className="property-law-callout">
          <span>FLLM practical framework</span>
          <h2>In many contexts, both concepts can be true at the same time.</h2>
          <p>
            The right to exercise alcoholic-beverage privileges remains subject to Florida&apos;s regulatory system. At the same time, a scarce quota license can be bought and sold through an approved transfer, can support liens or security interests, and can have substantial independent economic value. The legal question therefore depends on what right is being discussed and against whom it is being asserted.
          </p>
        </section>

        <section className="news-article-section">
          <h2>How the Park Street Trust findings fit into the analysis</h2>
          <p>
            In the St. Johns County Park Street Trust matter, the circuit court described the quota liquor license as involving two distinct interests: a property interest and the use rights associated with the license. The trial court concluded that the property interest could have value independent of the regulatory right to operate under the license.
          </p>
          <p>
            That trial-court formulation does not necessarily contradict the Jimerson Birr article because the two sources address different legal relationships. Jimerson&apos;s overview focuses on governmental licensure and administrative rights, while the Park Street findings addressed private contract and specific-performance claims involving a quota license. The Park Street ruling is a circuit-court decision, not statewide appellate precedent.
          </p>
        </section>

        <section className="news-article-section">
          <h2>A key transfer-law caution</h2>
          <p>
            The distinction between economic ownership concepts and regulatory use rights should not be read to bypass Florida transfer law. Section 561.32 states that Beverage Law licenses are not transferable except as provided by statute and requires Division approval of the purchaser in a qualifying transfer. Transaction documents should therefore distinguish contractual or security interests from the regulatory steps required to complete a transfer or exercise license privileges.
          </p>
        </section>

        <section className="news-article-section" aria-labelledby="sources-heading">
          <h2 id="sources-heading">Primary sources and related FLLM material</h2>
          <div className="property-source-grid">
            <a href="https://www.jimersonfirm.com/services/administrative-law-licensing/alcoholic-beverage-and-tobacco-licenses/" target="_blank" rel="noopener noreferrer">
              <span>Attorney resource</span>
              <strong>Jimerson Birr — Alcoholic Beverage and Tobacco Licenses</strong>
              <small>DBPR licensing, discipline, administrative hearings, and judicial review.</small>
            </a>
            <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0561%2FSections%2F0561.32.html" target="_blank" rel="noopener noreferrer">
              <span>Florida Statutes</span>
              <strong>Section 561.32 — Transfer of licenses</strong>
              <small>Transfer procedure, purchaser approval, liens, and security interests.</small>
            </a>
            <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0500-0599%2F0561%2FSections%2F0561.65.html" target="_blank" rel="noopener noreferrer">
              <span>Florida Statutes</span>
              <strong>Section 561.65 — Mortgagee&apos;s interest in license</strong>
              <small>Statutory treatment of liens and security interests in spirituous beverage licenses.</small>
            </a>
            <Link href="/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings">
              <span>FLLM court reader</span>
              <strong>Park Street Trust quota-license findings</strong>
              <small>Read the complete findings and FLLM&apos;s neutral transaction-focused summary.</small>
            </Link>
          </div>
        </section>

        <div className="property-note">
          <strong>Legal-information notice:</strong> This page is a general educational overview, not legal advice. The characterization of a license or license-related interest can depend on the statute, remedy, procedural posture, parties, and type of claim. Parties to a transaction or dispute should obtain advice from qualified Florida counsel.
        </div>

        <div className="news-article-actions">
          <Link href="/resources/liquor-license-attorneys">Find Florida Liquor License Attorneys</Link>
          <Link href="/resources/liquor-license-attorneys#litigation-appeals">Litigation &amp; Appeals Attorneys</Link>
          <Link href="/florida-liquor-license-news">Florida Liquor License News</Link>
        </div>
      </article>

      <section className="news-final-cta">
        <div className="page-shell">
          <div>
            <span>Florida Liquor License Legal Resources</span>
            <h2>Match the legal issue to the right type of counsel</h2>
            <p>Use FLLM&apos;s independent attorney directory to compare licensing, transaction, litigation, and appellate practices.</p>
          </div>
          <div className="news-final-actions">
            <Link href="/resources/liquor-license-attorneys">Browse Attorneys</Link>
            <Link href="/resources/liquor-license-attorneys/apply">Join the Directory</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
