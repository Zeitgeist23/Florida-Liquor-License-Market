import type { Metadata } from "next";

import AttorneyDirectory from "@/components/AttorneyDirectory";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./liquor-license-attorneys.css";
import "./attorney-practice-types.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/liquor-license-attorneys`;
const suttonProfile = "https://www.floridasalestax.com/staff-profiles/james-h-sutton-jr-cpa-esq-/";
const suttonPhoto = "https://www.floridasalestax.com/cms/thumbnails/34/415x415/images/James-Sutton-Low-Res.1402260810550.jpg";

export const metadata: Metadata = {
  title: "Florida Liquor License Attorney & Lawyer Directory | FLLM",
  description:
    "Find a Florida liquor license attorney or lawyer for DBPR/ABT licensing, quota-license purchases and sales, transfers, closings, liens, tax disputes, litigation, appeals, and beverage-law matters.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Attorney & Lawyer Directory",
    description:
      "Compare Florida liquor license attorneys and lawyers for licensing, transfers, purchases and sales, closings, tax controversies, litigation, appeals, liens, and DBPR/ABT matters.",
    siteName: "Florida Liquor License Market",
  },
};

const faqItems = [
  {
    question: "How do I find a Florida liquor license attorney?",
    answer:
      "Use the FLLM directory to compare Florida attorneys whose published practices include alcoholic-beverage licensing, quota-license purchases and sales, DBPR or ABT proceedings, transfers, closings, tax disputes, litigation, or appeals. Verify the attorney's current Florida Bar eligibility, relevant experience, conflicts, fees, and engagement terms before hiring counsel.",
  },
  {
    question: "What does a Florida liquor license attorney do?",
    answer:
      "A Florida liquor license attorney may assist with DBPR or ABT applications, quota-license purchases and sales, purchase agreements, due diligence, liens and tax-clearance issues, escrow and closings, regulatory compliance, administrative proceedings, civil litigation, tax controversy, or appeals. The exact scope depends on the lawyer's practice and the client's matter.",
  },
  {
    question: "How do I find a Florida liquor license lawyer?",
    answer:
      "Use the FLLM directory to compare Florida lawyers whose published practices include alcoholic-beverage licensing, DBPR or ABT matters, license transfers and closings, tax controversy, contract disputes, civil litigation, or appeals. Confirm directly that a lawyer handles your specific matter, practices in the relevant location, has no conflict, and is currently eligible to practice through The Florida Bar.",
  },
  {
    question: "How much does a Florida liquor license attorney cost?",
    answer:
      "There is no standard statewide fee. Legal fees depend on the work involved, the attorney's billing structure, the complexity of the transaction or dispute, and whether the matter involves licensing, a closing, tax controversy, litigation, or an appeal. Ask for the fee structure and engagement terms before retaining counsel.",
  },
  {
    question: "What does a Florida liquor license litigation attorney handle?",
    answer:
      "Depending on the attorney's practice and the dispute, liquor-license litigation can involve purchase agreements, ownership and transfer disputes, liens, specific-performance claims, injunctions, administrative matters, enforcement disputes, tax issues, and other civil claims involving alcoholic-beverage licenses. Users should confirm the attorney's actual experience with the specific issue before hiring counsel.",
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
  {
    publisher: "Law Offices of Moffa, Sutton & Donnini, P.A.",
    title: "James H. Sutton, Jr., CPA, Esq. — Florida Sales and Use Tax Controversy",
    location: "Tampa · Statewide Florida tax matters",
    summary:
      "Mr. Sutton's published practice focuses on Florida sales-and-use-tax controversy, including audits, protests, petitions for reconsideration, administrative hearings, collections, registration denials, refunds, and related disputes with the Florida Department of Revenue.",
    href: suttonProfile,
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
        "An independent directory to find a Florida liquor license attorney or lawyer for DBPR/ABT licensing, quota-license purchases and sales, transfers, closings, tax controversy, litigation, appeals, liens, escrow, and related beverage-law matters.",
      dateModified: "2026-09-09",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
      about: [
        { "@type": "Thing", name: "Florida liquor license attorney" },
        { "@type": "Thing", name: "Florida liquor license lawyer" },
        { "@type": "Thing", name: "Florida alcoholic beverage law" },
        { "@type": "Thing", name: "Florida liquor license transfers" },
        { "@type": "Thing", name: "Florida liquor license litigation" },
        { "@type": "Thing", name: "Florida Department of Revenue tax controversy" },
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
            Find a <strong>Florida liquor license attorney</strong> or <strong>Florida liquor license lawyer</strong> whose published practice includes alcoholic-beverage licensing, quota-license purchases and sales, DBPR / ABT applications and proceedings, transfers, purchase agreements, escrow and closings, liens and tax-clearance issues, Florida Department of Revenue tax disputes, civil litigation, or appeals involving Florida liquor licenses.
          </p>
          <div className="attorney-hero-actions">
            <a className="btn btn-gold" href="#tax-attorney-feature">Browse Attorneys</a>
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
          <h2 id="directory-heading">Compare Florida liquor license attorneys by licensing, transaction, tax, and litigation experience</h2>
        </div>
        <p>
          A Florida liquor license attorney may be needed for different stages of a matter: applying for or transferring a license, documenting a purchase or sale, reviewing liens and tax-clearance issues, coordinating escrow and closing, responding to DBPR / ABT action, handling an FDOR tax dispute, or managing litigation and appeals. Confirm that the attorney regularly handles the specific work you need, ask about availability and fees, and verify current Florida Bar status before retaining counsel.
        </p>
      </section>

      <section className="attorney-practice-types page-shell" aria-label="Attorney practice focus categories">
        <article><span>01</span><strong>Licensing &amp; Regulatory</strong><p>ABT applications, permitting, compliance, administrative matters, and beverage-law guidance.</p></article>
        <article><span>02</span><strong>Transactions &amp; Transfers</strong><p>Purchase agreements, due diligence, transfers, acquisitions, and transaction structuring.</p></article>
        <article><span>03</span><strong>Liens / Tax / Closing</strong><p>FDOR disputes, escrow, lien review, tax-clearance issues, closing coordination, and title-related diligence.</p></article>
        <article><span>04</span><strong>Litigation &amp; Appeals</strong><p>Liquor-license disputes, civil litigation, trial-level issue preservation, briefing, and appeals.</p></article>
      </section>

      <section id="tax-attorney-feature" className="page-shell" style={{scrollMarginTop:"120px", paddingTop:"18px", paddingBottom:"38px"}} aria-labelledby="sutton-directory-heading">
        <div style={{display:"grid", gridTemplateColumns:"minmax(220px,310px) minmax(0,1fr)", gap:"0", border:"1px solid #354b5e", borderRadius:"10px", overflow:"hidden", background:"linear-gradient(145deg,#0a2033,#050f19)", boxShadow:"0 20px 48px rgba(0,0,0,.24)"}}>
          <div style={{background:"#eef1f4", minHeight:"310px"}}>
            <img src={suttonPhoto} alt="James H. Sutton, Jr., CPA, Esq." style={{display:"block", width:"100%", height:"100%", minHeight:"310px", objectFit:"cover", objectPosition:"center top"}} />
          </div>
          <div style={{padding:"28px 30px"}}>
            <span style={{display:"block", color:"#f6a700", fontSize:"11px", fontWeight:900, letterSpacing:".12em", textTransform:"uppercase"}}>Liens / Tax / Closing · FDOR Tax Controversy</span>
            <h2 id="sutton-directory-heading" style={{margin:"8px 0 4px", color:"#fff", fontFamily:"Georgia, 'Times New Roman', serif", fontSize:"clamp(28px,4vw,40px)", lineHeight:1.08}}>James H. Sutton, Jr., CPA, Esq.</h2>
            <strong style={{display:"block", color:"#f6a700", marginBottom:"4px"}}>Law Offices of Moffa, Sutton &amp; Donnini, P.A.</strong>
            <small style={{display:"block", color:"#9dadb8", marginBottom:"16px"}}>Tampa · Statewide Florida tax matters</small>
            <p style={{margin:"0 0 14px", color:"#c8d2d9", fontSize:"14px", lineHeight:1.7}}>
              Mr. Sutton is a Florida State and Local Tax attorney and CPA whose public firm profile states that his practice focuses almost exclusively on Florida sales-and-use-tax controversy. He has more than 30 years of professional tax experience and represents businesses and individuals in disputes involving the Florida Department of Revenue.
            </p>
            <ul style={{display:"grid", gap:"7px", margin:"0 0 18px", paddingLeft:"20px", color:"#e1e7eb", fontSize:"13px", lineHeight:1.6}}>
              <li>Florida sales-and-use-tax audit defense and protests</li>
              <li>Petitions for reconsideration and Division of Administrative Hearings litigation</li>
              <li>Circuit-court litigation, collections, registration denials, refunds, and voluntary disclosures</li>
            </ul>
            <div style={{display:"flex", flexWrap:"wrap", gap:"10px"}} data-nosnippet="">
              <a className="btn btn-gold" href="tel:+18137752131">Call 813-775-2131</a>
              <a className="btn btn-outline" href={suttonProfile} target="_blank" rel="noreferrer">View Attorney Profile ↗</a>
              <a className="btn btn-outline" href="/resources/fdor-assessment-disputes">FLLM FDOR Dispute Guide</a>
            </div>
            <small style={{display:"block", marginTop:"14px", color:"#8294a0", lineHeight:1.55}}>Portrait and profile information are drawn from the attorney&apos;s public firm profile. Inclusion is informational only and is not an endorsement, ranking, or referral.</small>
          </div>
        </div>
      </section>

      <section className="attorney-litigation-focus page-shell" id="litigation-appeals" aria-labelledby="litigation-heading">
        <div className="attorney-litigation-heading">
          <span>Litigation &amp; Appeals</span>
          <h2 id="litigation-heading">Florida Liquor License Litigation &amp; Appeals Attorneys</h2>
          <p>Florida liquor-license disputes can involve valuable transferable license rights, purchase contracts, ownership claims, liens, closing obligations, administrative action, tax disputes, and appellate review. The directory identifies attorneys whose published practices may be relevant to those disputes so users can compare counsel and verify experience directly.</p>
        </div>
        <div className="attorney-litigation-grid">
          <article><strong>Contract &amp; Ownership Disputes</strong><p>Purchase agreements, competing claims, transfer obligations, title issues, and specific-performance litigation.</p></article>
          <article><strong>DBPR / ABT Disputes</strong><p>Administrative and regulatory matters involving alcoholic-beverage licenses, enforcement, licensing decisions, and related proceedings.</p></article>
          <article><strong>Trial &amp; Injunctive Relief</strong><p>Civil litigation, temporary or permanent relief, evidentiary issues, and preservation of issues for review.</p></article>
          <article><strong>Florida Appeals</strong><p>Record review, appellate strategy, standards of review, briefing, oral argument, and post-judgment appellate work.</p></article>
        </div>
        <a className="attorney-litigation-directory-link" href="#attorney-directory">Compare additional attorneys in the directory ↓</a>
        <a className="attorney-litigation-directory-link" href="/florida-liquor-license-court-decisions">Browse FLLM&apos;s Florida liquor-license court decisions &amp; case law ›</a>
        <a className="attorney-litigation-directory-link" href="/resources/florida-liquor-license-property-or-privilege">Read FLLM explainer: Is a Florida liquor license property or a privilege? ›</a>
      </section>

      <AttorneyDirectory />

      <section className="attorney-published-resources page-shell" id="published-resources" aria-labelledby="published-resources-heading">
        <div className="attorney-published-resources-heading">
          <span>Published Florida liquor-license resources</span>
          <h2 id="published-resources-heading">Articles and practice resources from Florida law firms</h2>
          <p>FLLM links to selected public articles and attorney practice resources from Florida law firms when the material is directly relevant to alcoholic-beverage licensing, tax disputes, regulatory proceedings, transactions, or appeals. These links are provided for research and do not constitute an endorsement of the publisher or legal advice.</p>
        </div>
        <div className="attorney-published-resources-grid">
          {publishedResources.map((resource) => (
            <article key={resource.href}>
              <span>{resource.publisher}</span><h3>{resource.title}</h3><small>{resource.location}</small><p>{resource.summary}</p>
              <a href={resource.href} target="_blank" rel="noreferrer">Read original resource <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="attorney-faq page-shell" aria-labelledby="attorney-faq-heading">
        <div className="attorney-faq-heading">
          <span>Questions about Florida liquor license attorneys and lawyers</span>
          <h2 id="attorney-faq-heading">Licensing, transfers, closings, tax disputes, litigation, appeals, and attorney selection</h2>
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
        <small>Directory information last reviewed September 9, 2026.</small>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell"><img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" /><span>Florida’s marketplace for buying, selling and financing liquor licenses.</span><a href="/">Return to Florida Liquor License Market</a></div>
      </footer>
    </main>
  );
}
