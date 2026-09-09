import type { Metadata } from "next";

import AttorneyDirectory from "@/components/AttorneyDirectory";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./liquor-license-attorneys.css";
import "./attorney-practice-types.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/liquor-license-attorneys`;

export const metadata: Metadata = {
  title: "Florida Liquor License Attorney & Lawyer Directory | FLLM",
  description:
    "Find a Florida liquor license attorney or lawyer for DBPR/ABT licensing, quota-license purchases and sales, transfers, closings, liens, litigation, appeals, and beverage-law matters.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Attorney & Lawyer Directory",
    description:
      "Compare Florida liquor license attorneys and lawyers for licensing, transfers, purchases and sales, closings, litigation, appeals, liens, and DBPR/ABT matters.",
    siteName: "Florida Liquor License Market",
  },
};

const faqItems = [
  {
    question: "How do I find a Florida liquor license attorney?",
    answer:
      "Use the FLLM directory to compare Florida attorneys whose published practices include alcoholic-beverage licensing, quota-license purchases and sales, DBPR or ABT proceedings, transfers, closings, litigation, or appeals. Verify the attorney's current Florida Bar eligibility, relevant experience, conflicts, fees, and engagement terms before hiring counsel.",
  },
  {
    question: "What does a Florida liquor license attorney do?",
    answer:
      "A Florida liquor license attorney may assist with DBPR or ABT applications, quota-license purchases and sales, purchase agreements, due diligence, liens and tax-clearance issues, escrow and closings, regulatory compliance, administrative proceedings, civil litigation, or appeals. The exact scope depends on the lawyer's practice and the client's matter.",
  },
  {
    question: "How do I find a Florida liquor license lawyer?",
    answer:
      "Use the FLLM directory to compare Florida lawyers whose published practices include alcoholic-beverage licensing, DBPR or ABT matters, license transfers and closings, contract disputes, civil litigation, or appeals. Confirm directly that a lawyer handles your specific matter, practices in the relevant location, has no conflict, and is currently eligible to practice through The Florida Bar.",
  },
  {
    question: "How much does a Florida liquor license attorney cost?",
    answer:
      "There is no standard statewide fee. Legal fees depend on the work involved, the attorney's billing structure, the complexity of the transaction or dispute, and whether the matter involves licensing, a closing, litigation, or an appeal. Ask for the fee structure and engagement terms before retaining counsel.",
  },
  {
    question: "What does a Florida liquor license litigation attorney handle?",
    answer:
      "Depending on the attorney's practice and the dispute, liquor-license litigation can involve purchase agreements, ownership and transfer disputes, liens, specific-performance claims, injunctions, administrative matters, enforcement disputes, and other civil claims involving alcoholic-beverage licenses. Users should confirm the attorney's actual experience with the specific issue before hiring counsel.",
  },
  {
    question: "When might a Florida liquor license appeal attorney be needed?",
    answer:
      "An appellate attorney may be needed when a party seeks review of a trial-court ruling or an appealable administrative decision involving a liquor license. Appellate work can include issue preservation, standards of review, briefing, record analysis, and oral argument. Deadlines and available review procedures depend on the case posture.",
  },
  {
    question: "Does FLLM recommend or certify the attorneys in this directory?",
    answer:
      "No. Florida Liquor License Market provides an informational directory only. Inclusion and practice-focus labels are not endorsements, rankings, referrals, or Florida Bar specialty certifications. Users should independently verify credentials, experience, fees, conflicts, and engagement terms.",
  },
] as const;

const publishedResources = [
  {
    publisher: "Godfrey Legal · B.F. Godfrey, P.A.",
    title: "Orlando Liquor License Lawyer — Obtaining a Florida Liquor License",
    location: "Orlando, Florida",
    summary:
      "Godfrey Legal's liquor-licensing overview discusses the Florida licensing process and the role legal counsel can play when a business is applying for authority to sell alcoholic beverages.",
    href: "https://godfreylegal.com/orlando-commercial-real-estate-lawyer/liquor-licensing/",
  },
  {
    publisher: "Jimerson Birr, P.A.",
    title: "Alcoholic Beverage and Tobacco Licenses Overview",
    location: "Florida statewide administrative-law practice",
    summary:
      "Jimerson Birr's published overview discusses alcoholic-beverage licensing, DBPR administrative matters, license defense, and judicial review of adverse agency decisions.",
    href: "https://www.jimersonfirm.com/services/administrative-law-licensing/alcoholic-beverage-and-tobacco-licenses/",
  },
] as const;

export default function FloridaLiquorLicenseAttorneysPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Liquor License Attorney and Lawyer Directory",
      headline: "Find a Florida Liquor License Attorney",
      url: canonicalUrl,
      description:
        "An independent directory to find a Florida liquor license attorney or lawyer for DBPR/ABT licensing, quota-license purchases and sales, transfers, closings, litigation, appeals, liens, escrow, and related beverage-law matters.",
      dateModified: "2026-09-04",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
      about: [
        { "@type": "Thing", name: "Florida liquor license attorney" },
        { "@type": "Thing", name: "Florida liquor license lawyer" },
        { "@type": "Thing", name: "Florida alcoholic beverage law" },
        { "@type": "Thing", name: "Florida liquor license transfers" },
        { "@type": "Thing", name: "Florida liquor license litigation" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${siteUrl}/resources` },
        { "@type": "ListItem", position: 3, name: "Florida Liquor License Attorney Directory", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="attorney-directory-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="attorney-hero">
        <div className="page-shell">
          <nav className="attorney-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span>›</span><b>Florida Liquor License Attorney Directory</b>
          </nav>
          <span className="attorney-eyebrow">Resources · Independent legal directory</span>
          <h1>Florida Liquor License Attorney &amp; Lawyer Directory</h1>
          <p>
            Find a <strong>Florida liquor license attorney</strong> or <strong>Florida liquor license lawyer</strong> whose published practice includes alcoholic-beverage licensing, quota-license purchases and sales, DBPR / ABT applications and proceedings, transfers, purchase agreements, escrow and closings, liens and tax-clearance issues, civil litigation, or appeals involving Florida liquor licenses.
          </p>
          <div className="attorney-hero-actions">
            <a className="btn btn-gold" href="#attorney-directory">Browse Attorneys</a>
            <a className="btn btn-outline" href="#litigation-appeals">Litigation &amp; Appeals</a>
            <a className="btn btn-outline" href="#published-resources">Published Resources</a>
            <a className="btn btn-outline attorney-join-button" href="/resources/liquor-license-attorneys/apply">Join the Attorney Directory</a>
            <a className="btn btn-outline" href="https://www.floridabar.org/directories/find-mbr/" target="_blank" rel="noreferrer">Verify with The Florida Bar</a>
          </div>
        </div>
      </section>

      <section className="attorney-intro page-shell" aria-labelledby="directory-heading">
        <div>
          <span>Before choosing counsel</span>
          <h2 id="directory-heading">Compare Florida liquor license attorneys by licensing, transaction, and litigation experience</h2>
        </div>
        <p>
          A Florida liquor license attorney may be needed for different stages of a matter: applying for or transferring a license, documenting a purchase or sale, reviewing liens and tax-clearance issues, coordinating escrow and closing, responding to DBPR / ABT action, or handling litigation and appeals. Confirm that the attorney regularly handles the specific work you need, ask about availability and fees, and verify current Florida Bar status before retaining counsel.
        </p>
      </section>

      <section className="attorney-practice-types page-shell" aria-label="Attorney practice focus categories">
        <article><span>01</span><strong>Licensing &amp; Regulatory</strong><p>ABT applications, permitting, compliance, administrative matters, and beverage-law guidance.</p></article>
        <article><span>02</span><strong>Transactions &amp; Transfers</strong><p>Purchase agreements, due diligence, transfers, acquisitions, and transaction structuring.</p></article>
        <article><span>03</span><strong>Liens / Tax / Closing</strong><p>Escrow, lien review, tax-clearance issues, closing coordination, and title-related diligence.</p></article>
        <article><span>04</span><strong>Litigation &amp; Appeals</strong><p>Liquor-license disputes, civil litigation, trial-level issue preservation, briefing, and appeals.</p></article>
      </section>

      <section className="attorney-litigation-focus page-shell" id="litigation-appeals" aria-labelledby="litigation-heading">
        <div className="attorney-litigation-heading">
          <span>Litigation &amp; Appeals</span>
          <h2 id="litigation-heading">Florida Liquor License Litigation &amp; Appeals Attorneys</h2>
          <p>Florida liquor-license disputes can involve valuable transferable license rights, purchase contracts, ownership claims, liens, closing obligations, administrative action, and appellate review. The directory identifies attorneys whose published practices may be relevant to those disputes so users can compare counsel and verify experience directly.</p>
        </div>
        <div className="attorney-litigation-grid">
          <article><strong>Contract &amp; Ownership Disputes</strong><p>Purchase agreements, competing claims, transfer obligations, title issues, and specific-performance litigation.</p></article>
          <article><strong>DBPR / ABT Disputes</strong><p>Administrative and regulatory matters involving alcoholic-beverage licenses, enforcement, licensing decisions, and related proceedings.</p></article>
          <article><strong>Trial &amp; Injunctive Relief</strong><p>Civil litigation, temporary or permanent relief, evidentiary issues, and preservation of issues for review.</p></article>
          <article><strong>Florida Appeals</strong><p>Record review, appellate strategy, standards of review, briefing, oral argument, and post-judgment appellate work.</p></article>
        </div>
        <a className="attorney-litigation-directory-link" href="#attorney-directory">Compare attorneys in the directory ↓</a>
        <a className="attorney-litigation-directory-link" href="/florida-liquor-license-court-decisions">Browse FLLM&apos;s Florida liquor-license court decisions &amp; case law ›</a>
        <a className="attorney-litigation-directory-link" href="/resources/florida-liquor-license-property-or-privilege">Read FLLM explainer: Is a Florida liquor license property or a privilege? ›</a>
      </section>

      <AttorneyDirectory />

      <section className="attorney-published-resources page-shell" id="published-resources" aria-labelledby="published-resources-heading">
        <div className="attorney-published-resources-heading">
          <span>Published Florida liquor-license resources</span>
          <h2 id="published-resources-heading">Articles from Florida law firms</h2>
          <p>FLLM links to selected public articles from Florida law firms when the material is directly relevant to alcoholic-beverage licensing, regulatory disputes, transactions, or appeals. These links are provided for research and do not constitute an endorsement of the publisher or legal advice.</p>
        </div>
        <div className="attorney-published-resources-grid">
          {publishedResources.map((resource) => (
            <article key={resource.href}>
              <span>{resource.publisher}</span><h3>{resource.title}</h3><small>{resource.location}</small><p>{resource.summary}</p>
              <a href={resource.href} target="_blank" rel="noreferrer">Read original article <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="attorney-faq page-shell" aria-labelledby="attorney-faq-heading">
        <div className="attorney-faq-heading">
          <span>Questions about Florida liquor license attorneys and lawyers</span>
          <h2 id="attorney-faq-heading">Licensing, transfers, closings, litigation, appeals, and attorney selection</h2>
        </div>
        <div className="attorney-faq-grid">
          {faqItems.map((item) => (<article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>))}
        </div>
      </section>

      <section className="attorney-official-resources page-shell" aria-labelledby="official-resources-heading">
        <div>
          <span>Independent verification</span>
          <h2 id="official-resources-heading">Check an attorney before hiring</h2>
          <p>Confirm current Florida Bar eligibility, disciplinary history, relevant experience, scope of work, and fees directly. You may also use The Florida Bar’s lawyer-referral service if you want another option.</p>
        </div>
        <div className="attorney-official-links">
          <a href="https://www.floridabar.org/directories/find-mbr/" target="_blank" rel="noreferrer"><strong>Florida Bar Member Search</strong><small>Verify membership and eligibility</small></a>
          <a href="https://www.floridabar.org/public/lrs/" target="_blank" rel="noreferrer"><strong>Florida Bar Lawyer Referral Service</strong><small>800-342-8011</small></a>
        </div>
      </section>

      <section className="attorney-disclosure page-shell" aria-label="Directory disclaimer">
        <strong>Important directory disclosure</strong>
        <p>Florida Liquor License Market is not a law firm and does not provide legal advice. This directory is provided for general informational purposes only. Inclusion, omission, alphabetical ordering, and practice-focus labels do not constitute an endorsement, ranking, certification, referral, guarantee, or representation that an attorney is Board Certified or a specialist in liquor-license law. No attorney-client relationship is created by using this page or contacting a listed attorney. Attorney descriptions summarize publicly available firm information and FLLM directory categories and may change. Verify all credentials, services, fees, conflicts, and engagement terms independently before retaining counsel. Any future sponsored placement will be clearly identified.</p>
        <small>Directory information last reviewed September 4, 2026.</small>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell"><img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" /><span>Florida’s marketplace for buying, selling and financing liquor licenses.</span><a href="/">Return to Florida Liquor License Market</a></div>
      </footer>
    </main>
  );
}
