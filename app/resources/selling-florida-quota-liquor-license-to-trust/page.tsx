import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "@/app/resources/forms/abt-forms.css";
import "@/app/florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/selling-florida-quota-liquor-license-to-trust`;

export const metadata: Metadata = {
  title: "Selling a Florida Quota Liquor License to a Trust | Seller Due Diligence | FLLM",
  description:
    "FLLM explains what sellers should verify when a Florida quota liquor license purchase contract names a trust as buyer, including trustee authority, indirect interests, assignment clauses, ABT-6002 transfer issues and closing risk.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license trust purchaser",
    "selling Florida liquor license to a trust",
    "Florida quota liquor license trust",
    "ABT-6002 trust purchaser",
    "Florida liquor license beneficial ownership",
    "Florida liquor license assignment clause",
    "Florida liquor license seller due diligence",
    "Florida liquor license trustee authority",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Selling a Florida Quota Liquor License to a Trust",
    description:
      "A seller-side FLLM guide to trust purchasers, trustee authority, indirect interests, assignment clauses and DABT transfer diligence.",
    siteName: "Florida Liquor License Market",
  },
};

const statute56117 = "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.17.html";
const statute56132 = "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.32.html";
const statute7361017 = "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&StatuteYear=2026&URL=0700-0799/0736/0736PartXContentsIndex.html";
const dbprTransfer = "https://www.myfloridalicense.com/CheckListDetail.asp?XACT_DEFN_ID=13356&clientCode=4008&xactCode=1060";

const cases = [
  {
    name: "House v. Cotton",
    cite: "52 So. 2d 340 (Fla. 1951)",
    summary: "The Florida Supreme Court recognized that a quota liquor license can have substantial pecuniary value and property-like qualities even though the state retains regulatory control over the license privilege.",
    href: "https://law.justia.com/cases/florida/supreme-court/1951/52-so-2d-340-0.html",
  },
  {
    name: "Harnish v. Carbonell",
    cite: "328 So. 2d 489 (Fla. 3d DCA 1976)",
    summary: "The Third District enforced a trust agreement requiring reassignment and retransfer of an alcoholic-beverage license, illustrating that private agreements involving a trust and later license transfer can create enforceable obligations.",
    href: "https://law.justia.com/cases/florida/district-courts-of-appeal/1976/328-so-2d-489.html",
  },
  {
    name: "Wright v. Cade",
    cite: "349 So. 2d 833 (Fla. 1st DCA 1977)",
    summary: "The First District distinguished a statutory Beverage Department transfer from a transfer of private property rights and held that the regulatory transfer did not itself vest private title in the purchaser.",
    href: "https://law.justia.com/cases/florida/district-courts-of-appeal/1977/349-so-2d-833.html",
  },
  {
    name: "Howard v. Metcalf",
    cite: "487 So. 2d 43 (Fla. 2d DCA 1986)",
    summary: "The Second District stated that the Division's transfer of a liquor license does not itself transfer private property rights or vest title in the purchaser.",
    href: "https://law.justia.com/cases/florida/district-courts-of-appeal/1986/487-so-2d-43.html",
  },
  {
    name: "Walling Enterprises, Inc. v. Mathias",
    cite: "636 So. 2d 1294 (Fla. 1994)",
    summary: "The Florida Supreme Court described a liquor license as a regulated general intangible with property-like characteristics rather than ordinary tangible property.",
    href: "https://law.justia.com/cases/florida/supreme-court/1994/81126-0.html",
  },
];

const faq = [
  {
    q: "Is it improper for a trust to be named as the buyer of a Florida quota liquor license?",
    a: "No. A trust purchaser is not inherently improper. The seller should verify the trustee's authority, the exact trust identity, the proposed DABT transferee, any assignment or substitution rights, and the persons or entities whose direct or indirect interests may matter under Florida Beverage Law.",
  },
  {
    q: "What should a seller ask for when the purchaser is a trust?",
    a: "A seller may consider requesting a certification of trust under section 736.1017, together with transaction-specific excerpts if appropriate, to verify the trust's existence, current trustee, trustee powers, revocability, cotrustee authority and manner of taking title.",
  },
  {
    q: "Does naming a trust in the purchase contract mean the trust will automatically become the DABT licensee?",
    a: "No. A private contract and DABT's regulatory transfer process are separate. The purchaser's transfer application must satisfy the Beverage Law and Division requirements, and Florida appellate cases distinguish regulatory transfer status from private property rights.",
  },
  {
    q: "Why should a seller review assignment language carefully?",
    a: "Broad language such as buyer and/or assigns, nominee provisions or unrestricted substitution rights may allow a different person or entity to become the ultimate transaction party. That may be acceptable, but the seller should understand and negotiate those rights before signing.",
  },
];

export default function SellingQuotaLicenseToTrustPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Selling a Florida Quota Liquor License to a Trust: Seller Due Diligence",
      description: metadata.description,
      mainEntityOfPage: canonicalUrl,
      datePublished: "2026-09-10",
      dateModified: "2026-09-10",
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <main className="seo-market-page trust-buyer-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <style>{`
        .trust-buyer-page{background:#06131e;color:#eef3f6}
        .trust-buyer-page .seo-market-hero{background:linear-gradient(120deg,#0b2b43,#04131f 66%,#020a10)}
        .trust-buyer-page .seo-market-hero h1{max-width:970px}
        .trust-answer{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(280px,.8fr);gap:18px;margin-top:24px}
        .trust-answer-main,.trust-answer-side,.trust-law-card,.trust-risk-card,.trust-case-card,.trust-check-card{border:1px solid rgba(237,169,26,.30);border-radius:12px;background:linear-gradient(145deg,#0a2237,#04111c)}
        .trust-answer-main{padding:27px;border-top:4px solid #eda91a}.trust-answer-main h2{margin:7px 0 12px;color:#fff;font-size:clamp(28px,3.5vw,42px);line-height:1.1}.trust-answer-main p{margin:0;color:#c4d1da;line-height:1.72}.trust-answer-side{padding:22px}.trust-answer-side strong{display:block;color:#eda91a;font-size:12px;text-transform:uppercase;letter-spacing:.08em}.trust-answer-side p{margin:9px 0 0;color:#b9c7d1;line-height:1.65}
        .trust-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px}.trust-law-card,.trust-risk-card{padding:22px}.trust-law-card span,.trust-risk-card span,.trust-case-card span{display:block;color:#eda91a;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.trust-law-card h3,.trust-risk-card h3,.trust-case-card h3{margin:8px 0 9px;color:#fff;font-size:21px;line-height:1.2}.trust-law-card p,.trust-risk-card p,.trust-case-card p{margin:0;color:#b8c6d0;line-height:1.68}.trust-law-card a,.trust-case-card a{display:inline-block;margin-top:14px;color:#eda91a;font-weight:900;text-decoration:none}
        .trust-warning{margin-top:24px;padding:24px;border:1px solid #eda91a;border-left:5px solid #eda91a;border-radius:10px;background:#071b2d}.trust-warning span{color:#eda91a;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.trust-warning h2{margin:8px 0 10px;color:#fff;font-size:30px}.trust-warning p{margin:0;color:#c6d2da;line-height:1.72}.trust-warning p+p{margin-top:11px}
        .trust-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px}.trust-check-card{padding:19px;position:relative;padding-left:52px}.trust-check-card b{position:absolute;left:18px;top:18px;display:grid;width:25px;height:25px;place-items:center;border-radius:50%;background:#eda91a;color:#06131e}.trust-check-card strong{display:block;color:#fff;font-size:15px}.trust-check-card p{margin:6px 0 0;color:#aebdca;font-size:13px;line-height:1.6}
        .trust-case-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin-top:22px}.trust-case-card{padding:20px}.trust-case-card small{display:block;margin-top:5px;color:#8397a7}.trust-case-card:last-child{grid-column:1/-1}
        .trust-contract-list{display:grid;gap:10px;margin-top:18px;padding:0;list-style:none}.trust-contract-list li{padding:15px 17px;border:1px solid rgba(255,255,255,.09);border-radius:9px;background:#071d33;color:#c8d3dc;line-height:1.62}.trust-contract-list strong{color:#fff}
        .trust-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.trust-links a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:1px solid rgba(237,169,26,.5);border-radius:8px;color:#eda91a;font-weight:900;text-decoration:none}.trust-links a:hover{background:#eda91a;color:#06131e}
        .trust-note{margin-top:22px;padding:16px 18px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#aebdca;font-size:12px;line-height:1.7}
        @media(max-width:820px){.trust-answer,.trust-grid,.trust-checklist,.trust-case-grid{grid-template-columns:1fr}.trust-case-card:last-child{grid-column:auto}}
      `}</style>

      <div className="abt-header-wrap"><FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" /></div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/resources">Resources</Link><span>›</span><strong>Trust Purchaser Due Diligence</strong></div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida quota license seller due diligence</span>
              <h1>Selling a Florida Quota Liquor License to a Trust</h1>
              <p>
                A trust named as purchaser is not automatically a problem. But before a seller signs or closes, the seller should know who the trustee is, whether the trustee can bind the trust, who is expected to file the DABT transfer application, whether the buyer can assign the contract, and whether undisclosed direct or indirect interests could affect the transaction.
              </p>
              <div className="seo-market-actions">
                <a className="seo-market-button seo-market-button-gold" href="#seller-checklist">Seller Checklist</a>
                <Link className="seo-market-button seo-market-button-dark" href="/dbpr-abt-6002">ABT-6002 Guide</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/resources/liquor-license-attorneys">Find an Attorney</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <div className="trust-answer">
            <article className="trust-answer-main">
              <span className="seo-market-section-kicker">FLLM Quick Answer</span>
              <h2>Trust purchaser? Verify the structure before signing.</h2>
              <p>
                Florida law does not make a trust purchaser inherently suspect. The risk is uncertainty. The contract may name a trust while a trustee signs, another person funds the acquisition, an assignee is intended to become the ultimate purchaser, or a different person or entity is expected to apply to DABT. Sellers should understand that structure before becoming contractually bound.
              </p>
            </article>
            <aside className="trust-answer-side">
              <strong>Important distinction</strong>
              <p>
                The name on the purchase agreement, the person with private economic rights, and the person or entity ultimately approved by DABT are related questions—but they are not always the same legal question.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Florida Law</span><h2>Three statutes sellers should understand</h2></div></div>
          <div className="trust-grid">
            <article className="trust-law-card">
              <span>Florida Trust Code</span><h3>§ 736.1017 — Certification of trust</h3>
              <p>
                Instead of demanding the entire trust instrument, a transaction counterparty can receive a certification identifying the trust, its date, the settlor, current trustee, trustee powers, revocability, cotrustee signing authority and the manner of taking title. The statute also permits a recipient to require excerpts that designate the trustee and confer the power relevant to the pending transaction.
              </p>
              <a href={statute7361017} target="_blank" rel="noreferrer">Official Florida Trust Code ↗</a>
            </article>
            <article className="trust-law-card">
              <span>Florida Beverage Law</span><h3>§ 561.17 — Direct and indirect interests</h3>
              <p>
                The alcoholic-beverage application reaches persons, officers, shareholders and directors of the legal or business entity that have a direct or indirect interest in the business seeking the license. A trust structure therefore should not be treated as a substitute for required ownership or interest disclosures.
              </p>
              <a href={statute56117} target="_blank" rel="noreferrer">Read § 561.17 ↗</a>
            </article>
            <article className="trust-law-card">
              <span>Florida Beverage Law</span><h3>§ 561.32 — Transfer approval</h3>
              <p>
                A Florida alcoholic-beverage license is not transferable except as provided by statute. In a qualifying sale, the purchaser's application must be approved by the Division under the statutory transfer process. A private purchase agreement alone does not complete the regulatory transfer.
              </p>
              <a href={statute56132} target="_blank" rel="noreferrer">Read § 561.32 ↗</a>
            </article>
            <article className="trust-law-card">
              <span>DBPR / DABT</span><h3>ABT-6002 — Transfer of ownership</h3>
              <p>
                DBPR identifies ABT-6002 as the application used to transfer ownership of an existing alcoholic-beverage license. Sellers should know before closing who is expected to be the transferee and whether the transaction documents match the contemplated regulatory filing.
              </p>
              <a href={dbprTransfer} target="_blank" rel="noreferrer">Official DBPR transfer checklist ↗</a>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Contract Review</span><h2>Clauses that deserve special attention</h2></div></div>
          <ul className="trust-contract-list">
            <li><strong>“Buyer and/or assigns.”</strong> Understand whether the buyer can assign the agreement freely, only to an affiliate, or only with seller consent.</li>
            <li><strong>Nominee or substitution provisions.</strong> Determine whether the named trust may direct the seller to transfer contractual rights or closing documents to a different person or entity.</li>
            <li><strong>DABT approval contingency.</strong> State what happens if the contemplated transferee is not approved or if a different transferee is later proposed.</li>
            <li><strong>Trustee capacity and signature.</strong> The agreement should make clear who is signing and in what trustee capacity rather than relying only on an abbreviated trust name.</li>
            <li><strong>Deposit and funding source.</strong> Know who is actually funding the deposit and purchase price, particularly when financing, seller financing or third-party capital is involved.</li>
            <li><strong>Specific-performance language.</strong> A quota license can have significant independent value. Sellers should understand any clause that could permit a purchaser to seek specific performance rather than merely return of a deposit.</li>
            <li><strong>Seller cooperation obligations.</strong> Review whether the seller must cooperate with assignments, substitutions, later DABT applications, escrow arrangements or transfers to parties not identified when the contract is signed.</li>
          </ul>

          <div className="trust-warning">
            <span>FLLM seller caution</span>
            <h2>The trust name may not tell the whole transaction story.</h2>
            <p>
              A revocable trust can have a settlor, trustee, beneficiaries, persons holding a power to revoke, trust directors and other participants. Not every person connected with a trust is automatically a DABT applicant, and the Beverage Law has its own rules for direct and indirect interests. The point of seller diligence is to identify the actual structure—not to assume that every trust purchaser is problematic or that every beneficiary must be disclosed.
            </p>
          </div>
        </div>
      </section>

      <section className="seo-market-counties" id="seller-checklist">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Before You Sign</span><h2>Seller due-diligence checklist for a trust purchaser</h2></div></div>
          <div className="trust-checklist">
            {[
              ["Exact trust identity", "Confirm the complete trust name and date rather than relying on a shorthand name."],
              ["Current trustee", "Identify the currently acting trustee and the individual who will sign the agreement."],
              ["Certification of trust", "Request a current certification under § 736.1017 and relevant authority excerpts when appropriate."],
              ["Signing authority", "Determine whether one trustee may sign or whether cotrustee approval is required."],
              ["Trust powers", "Confirm that the trustee has authority to enter the contemplated purchase transaction."],
              ["Revocability", "Know whether the trust is revocable and who holds any power to revoke it."],
              ["Assignment rights", "Read every assignment, nominee, substitution and affiliate-transfer provision."],
              ["Ultimate DABT transferee", "Identify the person or entity expected to submit the ABT-6002 transfer application."],
              ["Direct / indirect interests", "Require the buyer to address persons or entities whose interests may matter under the Beverage Law."],
              ["Funding source", "Understand who is providing the deposit, equity and financing for the purchase."],
              ["DABT record and alerts", "Review the current license record, liens, alerts, pending applications and transfer history."],
              ["Closing contingency", "State what happens if DABT approval, lender approval, lien releases or other closing conditions are not satisfied."],
            ].map(([title, copy], index) => (
              <article className="trust-check-card" key={title}><b>{index + 1}</b><strong>{title}</strong><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Florida Case Law</span><h2>Why private contract rights and DABT transfer status should be kept separate</h2></div></div>
          <div className="trust-case-grid">
            {cases.map((item) => (
              <article className="trust-case-card" key={item.cite}>
                <span>Florida decision</span><h3>{item.name}</h3><small>{item.cite}</small><p>{item.summary}</p><a href={item.href} target="_blank" rel="noreferrer">Read published opinion ↗</a>
              </article>
            ))}
          </div>
          <div className="trust-links">
            <Link href="/resources/florida-liquor-license-property-or-privilege">Property or Privilege Guide</Link>
            <Link href="/florida-liquor-license-court-decisions">Florida Liquor License Case Law</Link>
            <Link href="/resources/florida-division-alcoholic-beverages-tobacco">DABT Title-Risk Guide</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Financing & Closing</span><h2>Why purchaser identity matters to lenders and closing parties</h2></div></div>
          <div className="trust-grid">
            <article className="trust-risk-card"><span>Purchase financing</span><h3>Lenders underwrite a specific borrower and collateral structure</h3><p>A late change from a trust purchaser to an individual, LLC or other entity can require new underwriting, guarantees, documentation or approval and may delay closing.</p></article>
            <article className="trust-risk-card"><span>Seller financing</span><h3>Know who owes the debt</h3><p>If the seller is taking a note or retaining a security interest in the quota license, the obligor, guarantors, collateral owner and contemplated DABT transferee should be consistent with the financing documents.</p></article>
            <article className="trust-risk-card"><span>Transfer filing</span><h3>Private contract and regulatory filing should align</h3><p>A mismatch between the named purchaser, actual funding party and proposed transferee can create additional questions during transfer preparation and lender diligence.</p></article>
            <article className="trust-risk-card"><span>Closing protection</span><h3>Resolve identity issues before the closing table</h3><p>The safest time to clarify trustee authority, assignment rights and the ultimate transferee is before the seller becomes obligated to close—not after the deposit is paid and a transfer application is underway.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Related FLLM Resources</span><h2>Seller and transfer resources</h2></div></div>
          <div className="trust-links">
            <Link href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</Link>
            <Link href="/dbpr-abt-6002">ABT-6002 Transfer Guide</Link>
            <Link href="/transaction-services">FLLM Transaction Services</Link>
            <Link href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</Link>
            <Link href="/resources/liquor-license-attorneys">Liquor License Attorneys</Link>
            <Link href="/florida-liquor-license-appraisal">Liquor License Appraisal</Link>
          </div>
          <p className="trust-note">
            FLLM provides market and educational information, not legal advice. Trust authority, contract enforceability, beneficial interests, assignment rights and DABT qualification are fact-specific. Sellers should obtain Florida legal advice before signing a transaction document when purchaser identity or authority is unclear.
          </p>
        </div>
      </section>
    </main>
  );
}
