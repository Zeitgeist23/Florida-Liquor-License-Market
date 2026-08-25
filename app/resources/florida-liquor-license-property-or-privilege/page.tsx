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
    "Learn why Florida quota liquor licenses have property-like value, and how lenders record liens or security interests using ABT-6022 under sections 561.32 and 561.65.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license property",
    "Florida liquor license privilege",
    "Florida quota liquor license property rights",
    "Florida liquor license transfer law",
    "Florida liquor license lien",
    "Florida liquor license security interest",
    "ABT-6022",
    "Florida liquor license lien search",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Is a Florida Liquor License Property or a Privilege?",
    description:
      "FLLM explains regulatory use rights, transferable economic value, and the Florida process for recording a lien or security interest in a quota liquor license.",
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
        "An FLLM legal and market explainer on the regulatory privilege, private economic characteristics, and statutory lien-recording process for Florida liquor licenses.",
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is a security interest in a Florida quota liquor license recorded?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Section 561.65 requires the lien or security interest in a spirituous alcoholic-beverage license to be recorded with the Florida Division of Alcoholic Beverages and Tobacco within 90 days after creation. ABT-6022 is the Division form used to record a lien or mortgagee's interest.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a recorded Florida liquor-license lien remain effective?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A lien or security interest filed on or after July 1, 1995 expires five years after recordation unless the lienholder renews it during the six months before expiration.",
          },
        },
        {
          "@type": "Question",
          name: "Is a UCC filing alone enough for a Florida liquor-license security interest?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recording with the Division under section 561.65 is the statutory method for perfecting an interest against the spirituous alcoholic-beverage license. Whether a separate UCC filing is appropriate for other transaction collateral or obligations depends on the documents and legal context.",
          },
        },
        {
          "@type": "Question",
          name: "Is a Florida liquor license loan a chattel mortgage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not in the traditional tangible-property sense. The loan is evidenced by a promissory note, and the lender may receive a contractual security interest through a document titled Security Agreement, Chattel Mortgage, or both. Florida law classifies the quota license itself as a regulated general intangible, not tangible chattel. The interest must be recorded with the Division within 90 days under section 561.65, generally using ABT-6022.",
          },
        },
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

        <section className="property-lien-guide" aria-labelledby="property-lien-guide-title">
          <div className="property-lien-guide-heading">
            <span>Practical lender and seller-financing guide</span>
            <h2 id="property-lien-guide-title">How to record and protect a security interest in a Florida quota liquor license</h2>
            <p>
              Florida uses a specialized statutory recording system for liens and security interests in spirituous alcoholic-beverage licenses. The following is a general roadmap; transaction documents, additional collateral, priority, enforcement, and borrower or lender qualifications may require advice from Florida counsel.
            </p>
          </div>

          <div className="property-chattel-explainer" id="chattel-mortgage">
            <div>
              <span>Document title versus legal classification</span>
              <h3>Is a Florida liquor license loan a “chattel mortgage”?</h3>
              <p>
                <strong>No—not in the traditional tangible-property sense.</strong> A Florida quota liquor-license loan may use an instrument bearing that title, but the document&apos;s title does not change the legal character of the loan or convert the license into physical chattel.
              </p>
              <ol className="property-chattel-legal-sequence">
                <li><strong>The loan is evidenced by a promissory note.</strong> The note states the principal, interest, payment schedule, maturity, default provisions, and repayment obligation.</li>
                <li><strong>The lender receives a contractual security interest in the quota license.</strong> A security agreement connects the borrower&apos;s obligations under the note to the lender&apos;s collateral rights.</li>
                <li><strong>The security document may be titled “Security Agreement/Chattel Mortgage.”</strong> The Advanta–Beachway transaction document reviewed by FLLM used that title. That is evidence of drafting terminology—not a controlling legal classification of the license.</li>
                <li><strong>The license is a regulated general intangible, not tangible chattel.</strong> The Florida Supreme Court made that distinction in <a href="https://law.justia.com/cases/florida/supreme-court/1994/81126-0.html" target="_blank" rel="noopener noreferrer"><em>Walling Enterprises v. Mathias</em></a>. The interest is perfected through Florida&apos;s specialized statutory process by recording with the Division within 90 days under <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&amp;Search_String=&amp;URL=0500-0599%2F0561%2FSections%2F0561.65.html" target="_blank" rel="noopener noreferrer">section 561.65</a>, generally using ABT-6022. See also <a href="https://law.justia.com/cases/florida/supreme-court/1992/77390-0.html" target="_blank" rel="noopener noreferrer"><em>United States v. McGurn</em></a>.</li>
              </ol>
            </div>
            <aside>
              <strong>Regulatory boundary</strong>
              <p>
                The agreement can create contractual collateral rights, but it does not by itself record or perfect the interest, transfer the license, or authorize the lender to sell alcoholic beverages. Recording, enforcement, foreclosure, operation, and transfer remain subject to Florida Beverage Law, Division procedures, and applicable qualification requirements.
              </p>
            </aside>
          </div>

          <div className="property-document-anatomy" aria-label="Anatomy of a Florida liquor license backed loan">
            <article>
              <span>Loan obligation</span>
              <h3>Promissory note</h3>
              <p>States the principal, interest, payment schedule, maturity, balloon terms, late charges, default provisions, and other repayment obligations.</p>
            </article>
            <article>
              <span>Collateral contract</span>
              <h3>Security agreement or chattel mortgage</h3>
              <p>Identifies the license and secured obligations and may restrict an unauthorized sale, assignment, lease, additional lien, or other disposition.</p>
            </article>
            <article>
              <span>Division record</span>
              <h3>ABT-6022 filing</h3>
              <p>Records the lien or mortgagee&apos;s interest with the Division under section 561.65. The security agreement alone is not proof of statutory perfection.</p>
            </article>
            <article>
              <span>Default process</span>
              <h3>Enforcement and approved transfer</h3>
              <p>Collateral remedies must follow the governing documents, judicial procedures where required, and the Division&apos;s qualification and transfer rules.</p>
            </article>
          </div>

          <ol className="property-lien-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Create transaction-specific loan and security documents</h3>
                <p>The promissory note and security agreement should identify the parties, the covered license, the secured obligation, and the agreed remedies. The documents should be dated and executed consistently with the contemplated filing.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Record ABT-6022 within 90 days</h3>
                <p>Section 561.65 requires the party holding the lien or security interest to record it with the Division within 90 days after its creation. DBPR identifies <strong>ABT-6022</strong> as the form for recording a lien or mortgagee&apos;s interest, assignment, assumption, renewal, or extension involving a qualifying spirituous alcoholic-beverage license. The statutory recording fee is <strong>$10</strong>.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Address disclosure and Beverage Law qualifications</h3>
                <p>Section 561.32 treats a person holding a security interest as indirectly interested in the license. The interest must be disclosed to the Division, and the secured party is subject to Beverage Law qualifications as a precondition to enforcement.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Search the Division&apos;s lien records</h3>
                <p>ABT-6023 can be used to request the Division&apos;s search for recorded liens or mortgagee interests. Section 561.65 sets the lien-search fee at <strong>$20</strong>. A transaction may also call for UCC, tax, judgment, litigation, and other public-record searches because an ABT search answers only part of the due-diligence question.</p>
              </div>
            </li>
            <li>
              <span>05</span>
              <div>
                <h3>Evaluate whether other filings are appropriate</h3>
                <p>Division recording under section 561.65 is the statutory method for perfecting an interest against the license. A separate UCC filing may still be appropriate when the security package covers other collateral or when counsel determines that an additional filing is prudent. The correct filing strategy depends on the complete transaction—not only the license.</p>
              </div>
            </li>
            <li>
              <span>06</span>
              <div>
                <h3>Calendar the five-year expiration and enforcement requirements</h3>
                <p>Liens and security interests filed on or after July 1, 1995 expire five years after recordation unless renewed during the six months before expiration. Foreclosure, enforcement, operation, or transfer of the license remains subject to sections 561.32 and 561.65, Division authorization, and applicable qualification requirements.</p>
              </div>
            </li>
          </ol>

          <div className="property-chattel-example">
            <span>Anonymized educational example</span>
            <h3>How a $200,000 license-backed loan could be documented</h3>
            <p>
              An investor or properly titled retirement account funds a $200,000 loan to an unrelated borrower acquiring or refinancing a transferable Florida 4COP quota liquor license. The borrower signs a promissory note and a security agreement—sometimes titled a chattel mortgage—that identifies the license as collateral and restricts unauthorized transfers or additional encumbrances. The lender then takes the separate steps required to record and protect the interest with the Division. The exact documents, lien priority, additional filings, default remedies, and qualification issues must be evaluated for the particular transaction.
            </p>
            <small>This hypothetical is not a loan offer, legal form, investment recommendation, or representation that any particular document or transaction is enforceable.</small>
          </div>

          <div className="property-lien-actions" aria-label="Florida liquor license lien and financing resources">
            <Link href="/resources/forms/abt-6022">
              <span>Record an interest</span>
              <strong>Open FLLM&apos;s ABT-6022 workspace</strong>
              <small>Review, complete, download, and print the current official form.</small>
            </Link>
            <Link href="/resources/forms/abt-6023">
              <span>Check recorded interests</span>
              <strong>Open FLLM&apos;s ABT-6023 lien-search workspace</strong>
              <small>Prepare a request for the Division&apos;s alcoholic-beverage lien records.</small>
            </Link>
            <Link href="/how-to-finance-florida-liquor-license">
              <span>Transaction planning</span>
              <strong>Review the Florida liquor-license financing guide</strong>
              <small>Understand collateral value, underwriting, lenders, rates, and structure.</small>
            </Link>
            <Link href="/florida-liquor-license-court-decisions#selected-decisions">
              <span>Legal context</span>
              <strong>Review Florida lien and security-interest decisions</strong>
              <small>See McGurn, Walling, Flanigan&apos;s, and other selected decisions.</small>
            </Link>
          </div>
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
          <Link href="/florida-liquor-license-court-decisions">Browse Florida Liquor License Court Decisions</Link>
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
