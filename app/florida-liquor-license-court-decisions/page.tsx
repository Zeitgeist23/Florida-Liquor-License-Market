import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "@/app/resources/forms/abt-forms.css";
import "@/app/florida-liquor-license-news/news-insights.css";
import "@/app/florida-liquor-license-news/news-mobile-readability.css";
import "./court-decisions-hub.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-court-decisions`;

export const metadata: Metadata = {
  title: "Florida Liquor License Court Decisions & Case Law | FLLM",
  description:
    "Selected Florida liquor license court decisions on transfers, contracts, property interests, liens, security interests, revocation, and quota-license disputes.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license court decisions",
    "Florida liquor license case law",
    "Florida quota liquor license cases",
    "Florida liquor license property rights",
    "Florida liquor license liens",
    "Florida liquor license transfer cases",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Court Decisions & Case Law",
    description:
      "An FLLM research hub covering selected Florida appellate decisions and a recent circuit-court matter involving liquor-license rights and transactions.",
    siteName: "Florida Liquor License Market",
  },
};

type CaseEntry = {
  name: string;
  citation: string;
  court: string;
  year: string;
  topic: string;
  summary: string;
  transactionNote: string;
  href: string;
};

const appellateCases: CaseEntry[] = [
  {
    name: "House v. Cotton",
    citation: "52 So. 2d 340 (Fla. 1951)",
    court: "Florida Supreme Court",
    year: "1951",
    topic: "Contracts · Transfer obligations",
    summary:
      "The Court held that a lease covenant requiring reassignment of a liquor license could be enforced. It explained that, although a liquor license may be a privilege in the regulatory relationship with government, Florida's quota limits and transferability give it the quality of property and substantial pecuniary value.",
    transactionNote:
      "The decision remains a foundational Florida authority when contracts separately address the economic value of a license and the regulatory approval required for its transfer.",
    href: "https://law.justia.com/cases/florida/supreme-court/1951/52-so-2d-340-0.html",
  },
  {
    name: "Kline v. State Beverage Department",
    citation: "77 So. 2d 872 (Fla. 1955)",
    court: "Florida Supreme Court",
    year: "1955",
    topic: "Revocation · Notice and hearing",
    summary:
      "The Court discussed the procedural protection ordinarily owed before revocation of an issued liquor license, including notice, an opportunity to be heard, and the reasons for revocation. It nevertheless declined extraordinary interim relief because unresolved transfer and licensing questions remained for the trial court.",
    transactionNote:
      "The case illustrates why regulatory status, approved ownership, and procedural posture must be checked rather than assuming that private possession of a license resolves the holder's rights against the state.",
    href: "https://law.justia.com/cases/florida/supreme-court/1955/77-so-2d-872-0.html",
  },
  {
    name: "Skaggs-Albertson's v. ABC Liquors, Inc.",
    citation: "363 So. 2d 1082 (Fla. 1978)",
    court: "Florida Supreme Court",
    year: "1978",
    topic: "Location rules · Competitive standing",
    summary:
      "In a dispute involving alcoholic-beverage store location restrictions, the Court recognized the regulated and property-like characteristics of a liquor license when addressing whether an affected competitor could challenge an allegedly unlawful licensing decision.",
    transactionNote:
      "A license's value is tied not only to the certificate but also to location, local restrictions, quota scarcity, and the regulatory conditions governing where it may be used.",
    href: "https://law.justia.com/cases/florida/supreme-court/1978/52560-0.html",
  },
  {
    name: "United States v. McGurn",
    citation: "596 So. 2d 1038 (Fla. 1992)",
    court: "Florida Supreme Court",
    year: "1992",
    topic: "Security interests · Perfection",
    summary:
      "Answering a certified question, the Court held that timely recording of a security interest in a spirituous alcoholic-beverage license with the Division under section 561.65 was sufficient under Florida law; duplicate UCC filing with the Secretary of State was not required for the issue presented.",
    transactionNote:
      "Lenders and buyers should investigate the Division's lien records and the current requirements of section 561.65 rather than relying only on an ordinary UCC search.",
    href: "https://law.justia.com/cases/florida/supreme-court/1992/77390-0.html",
  },
  {
    name: "Walling Enterprises, Inc. v. Mathias",
    citation: "636 So. 2d 1294 (Fla. 1994)",
    court: "Florida Supreme Court",
    year: "1994",
    topic: "Landlord liens · General intangibles",
    summary:
      "The Court held that a liquor license is a general intangible and is not tangible property kept on leased premises for purposes of Florida's statutory landlord's lien. The paper certificate displayed at the premises is not the license itself.",
    transactionNote:
      "The decision separates a properly created license lien or security interest from a landlord's general claim for rent and reinforces the need to identify the exact type and source of every claimed encumbrance.",
    href: "https://law.justia.com/cases/florida/supreme-court/1994/81126-0.html",
  },
  {
    name: "Flanigan's Enterprises, Inc. v. Barnett Bank",
    citation: "639 So. 2d 617 (Fla. 1994)",
    court: "Florida Supreme Court",
    year: "1994",
    topic: "Landlord claims · Encumbered property",
    summary:
      "Applying Walling, the Court concluded that no statutory landlord's lien had attached to the liquor license. Because the asserted landlord's lien did not encumber the license, the challenged disposition did not violate the statute governing disposition of encumbered personal property.",
    transactionNote:
      "The ruling shows that notice of a creditor's claim is not the same as a valid, perfected interest in the license; the legal basis, filing method, and priority of each claim matter.",
    href: "https://law.justia.com/cases/florida/supreme-court/1994/81563-0.html",
  },
];

export default function FloridaLiquorLicenseCourtDecisionsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Liquor License Court Decisions & Case Law",
      description: metadata.description,
      url: canonicalUrl,
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: appellateCases.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${item.name}, ${item.citation}`,
          url: item.href,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor License News",
          item: `${siteUrl}/florida-liquor-license-news`,
        },
        { "@type": "ListItem", position: 3, name: "Court Decisions & Case Law", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="news-insights-page court-hub-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap news-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="court-hub-hero">
        <div className="page-shell">
          <nav className="news-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-news">News &amp; Research</Link><span>›</span><strong>Court Decisions</strong>
          </nav>
          <div className="court-hub-hero-grid">
            <div>
              <span className="news-eyebrow">FLLM Florida Case Law Research Hub</span>
              <h1>Florida Liquor License Court Decisions &amp; Case Law</h1>
              <p>
                Selected Florida decisions concerning liquor-license transfers, contract rights, regulatory status, liens, security interests, revocation, and the property-like characteristics of quota licenses.
              </p>
              <div className="court-hub-actions">
                <a href="#selected-decisions">Browse Decisions</a>
                <Link href="/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings">Read the Park Street Findings</Link>
              </div>
            </div>
            <aside className="court-hub-summary" aria-label="Court decisions hub summary">
              <span>Research scope</span>
              <strong>{appellateCases.length}</strong>
              <b>selected appellate decisions</b>
              <p>Plus FLLM&apos;s complete reader of a 2025 Florida circuit-court decision involving a quota-license transaction.</p>
              <small>Reviewed August 25, 2026</small>
            </aside>
          </div>
        </div>
      </section>

      <nav className="court-topic-nav" aria-label="Court decision topics">
        <div className="page-shell">
          <a href="#selected-decisions">Selected Decisions</a>
          <a href="#park-street">Recent Trial Decision</a>
          <a href="#legal-framework">Statutory Framework</a>
          <a href="#research-notice">Research Notice</a>
        </div>
      </nav>

      <section className="court-hub-intro page-shell" aria-labelledby="how-to-read-title">
        <div>
          <span>How to use this page</span>
          <h2 id="how-to-read-title">A decision&apos;s meaning depends on the legal context.</h2>
        </div>
        <p>
          Florida decisions may describe a liquor license as a regulatory privilege, a general intangible, or an interest with the quality of property. Those descriptions are not interchangeable. The answer depends on the statute, remedy, parties, procedural posture, and whether the dispute concerns government regulation or private economic rights.
        </p>
      </section>

      <section className="court-case-section" id="selected-decisions" aria-labelledby="selected-decisions-title">
        <div className="page-shell">
          <div className="court-section-heading">
            <div>
              <span>Reported Florida Opinions</span>
              <h2 id="selected-decisions-title">Selected Florida liquor-license decisions</h2>
            </div>
            <p>Each summary identifies the decision&apos;s transaction or regulatory significance and links to the full published opinion.</p>
          </div>

          <div className="court-case-grid">
            {appellateCases.map((item) => (
              <article className="court-case-card" key={item.citation}>
                <div className="court-case-meta">
                  <span>{item.court}</span>
                  <b>{item.year}</b>
                </div>
                <span className="court-case-topic">{item.topic}</span>
                <h3><em>{item.name}</em></h3>
                <strong>{item.citation}</strong>
                <p>{item.summary}</p>
                <div className="court-case-why">
                  <b>Why it matters</b>
                  <p>{item.transactionNote}</p>
                </div>
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Read the full opinion in ${item.name}`}>
                  Read Full Published Opinion <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="court-trial-feature" id="park-street" aria-labelledby="park-street-title">
        <div className="page-shell court-trial-grid">
          <div className="court-trial-number" aria-hidden="true">
            <strong>42</strong>
            <span>page findings</span>
          </div>
          <div>
            <span>2025 Florida Circuit-Court Decision · St. Johns County</span>
            <h2 id="park-street-title">Park Street Trust quota-license findings</h2>
            <p>
              Following a non-jury trial, the Seventh Judicial Circuit addressed a Florida quota-license purchase agreement, specific performance, lis pendens, competing transaction claims, and the distinction the court drew between a property interest and regulatory use rights.
            </p>
            <p className="court-trial-caution">
              This is a trial-court decision, not binding statewide appellate precedent. FLLM provides a neutral transaction-focused summary and the complete filed findings in an on-page reader.
            </p>
            <Link href="/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings">
              Read the Summary and Complete Findings
            </Link>
          </div>
        </div>
      </section>

      <section className="court-framework page-shell" id="legal-framework" aria-labelledby="framework-title">
        <div className="court-section-heading">
          <div>
            <span>Current Legal Framework</span>
            <h2 id="framework-title">Read older decisions alongside current statutes.</h2>
          </div>
          <p>Case holdings should be checked against later decisions, statutory amendments, administrative rules, and the facts of the present matter.</p>
        </div>
        <div className="court-framework-grid">
          <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&amp;URL=0500-0599/0561/Sections/0561.32.html" target="_blank" rel="noopener noreferrer">
            <span>Florida Statutes</span>
            <strong>Section 561.32 — Transfers</strong>
            <p>Transfer limitations, purchaser approval, changes in interests, and related requirements.</p>
          </a>
          <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&amp;Search_String=&amp;URL=0500-0599/0561/Sections/0561.65.html" target="_blank" rel="noopener noreferrer">
            <span>Florida Statutes</span>
            <strong>Section 561.65 — Liens and Security Interests</strong>
            <p>Perfection, recording, lien searches, foreclosure, and Division participation.</p>
          </a>
          <Link href="/resources/florida-liquor-license-laws">
            <span>FLLM Legal Reference</span>
            <strong>Florida Liquor License Laws</strong>
            <p>Centralized access to quota statutes, ABT rules, and official government sources.</p>
          </Link>
          <Link href="/resources/florida-liquor-license-property-or-privilege">
            <span>FLLM Explainer</span>
            <strong>Property or Privilege?</strong>
            <p>How regulatory permission and private economic interests can coexist in different contexts.</p>
          </Link>
        </div>
      </section>

      <section className="court-research-notice page-shell" id="research-notice">
        <strong>Legal research and information notice</strong>
        <p>
          This is a selective educational research collection, not a comprehensive case citator, legal opinion, or substitute for advice from qualified Florida counsel. FLLM does not represent that a cited decision remains controlling for every proposition or factual setting. Review the complete opinion, later history, current statutes and rules, and official court records before relying on any authority.
        </p>
      </section>

      <section className="news-final-cta">
        <div className="page-shell">
          <div>
            <span>Florida Liquor License Legal Resources</span>
            <h2>Continue from case law to transaction due diligence</h2>
            <p>Compare attorneys, review Florida statutes, search public records, and examine current market information.</p>
          </div>
          <div className="news-final-actions">
            <Link href="/resources/liquor-license-attorneys#litigation-appeals">Find Litigation &amp; Appeals Attorneys</Link>
            <Link href="/resources/florida-liquor-license-laws">Review Florida Liquor License Laws</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
