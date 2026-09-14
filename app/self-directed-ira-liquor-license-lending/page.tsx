import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";

import "../fllm-official-template.css";
import "../listings/listings-premium.css";
import "../listings/listings-map-size.css";
import "../listings/listings-county-links.css";
import "../listings/listings-navy-refresh.css";
import "../listings/listings-card-gold-borders.css";
import "../listings/listings-regression-fix.css";
import "../listings/listings-conversion-cards.css";
import "../listings/listings-card-overlap-fix.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";
import "../fllm-market-page-template.css";
import "./market-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/self-directed-ira-liquor-license-lending`;

export const metadata: Metadata = {
  title: "Self-Directed IRA Liquor License Lending | Florida 4COP & 3PS",
  description:
    "Learn how a self-directed IRA may make an unrelated third-party Florida liquor-license loan, including notes, security agreements, chattel mortgages, and lien recording.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Self-Directed IRA Lending for Florida Liquor License Financing",
    description:
      "An educational guide to self-directed IRA private lending, loan documentation, and collateral protection for Florida 4COP and 3PS quota-license transactions.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SelfDirectedIraLiquorLicenseLendingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Self-Directed IRA Lending for Florida Liquor License Financing",
    description:
      "An educational guide to self-directed IRA private lending, security agreements, and collateral protection for unrelated third-party Florida 4COP and 3PS quota-license transactions.",
    datePublished: "2026-08-19",
    dateModified: "2026-09-14",
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: "Florida Liquor License Market" },
    publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Self-Directed IRA Setup Assistance",
    serviceType: "Administrative retirement-account setup and transfer coordination",
    provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    description:
      "Flat-fee administrative assistance identifying possible self-directed IRA custodians or administrators that permit private-note investments, coordinating account setup and transfer or rollover paperwork, and coordinating access to independent attorneys experienced in Florida liquor-license transactions. FLLM does not recommend or select a custodian, attorney, or investment and does not act as custodian, trustee, investment adviser, broker-dealer, tax adviser, or law firm.",
    offers: {
      "@type": "Offer",
      price: "495.00",
      priceCurrency: "USD",
      url: `${canonicalUrl}#ira-setup-assistance`,
    },
  };

  return (
    <main className="seo-market-page fllm-official-page ira-lending-guide-page" data-fllm-template="market-page-v1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData).replaceAll("<", "\\u003c") }}
      />
      

      <FormsSiteHeader />

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/investment-opportunities">Invest</Link><span>›</span><strong>Self-Directed IRA Lending</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Retirement-Account Private Lending</span>
              <h1>Use a Self-Directed IRA to Explore Liquor License Lending</h1>
              <p>
                A conventional custodian-limited IRA generally cannot hold this type of private note unless the account is administered as a self-directed IRA by a custodian or administrator that permits the asset. A self-directed IRA—whether tax-classified as Traditional or Roth—may, subject to custodian acceptance and applicable rules, lend to an unrelated third-party borrower purchasing or refinancing a transferable Florida 4COP Quota or 3PS Florida liquor license. The IRA account, not the owner personally, funds and owns the note, and principal and interest return to the IRA.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/investment-opportunities">View Investment Opportunities</Link>
                <Link className="seo-market-button seo-market-button-dark" href="#ira-setup-assistance">IRA Setup Assistance — $495</Link>
              </div>
            </div>

            <aside className="seo-market-snapshot ira-hero-snapshot" aria-label="Self-directed IRA lending essentials">
              <span>IRA Lending Essentials</span>
              <ul className="ira-hero-points">
                <li>The IRA account owns the private note.</li>
                <li>The borrower must be an unrelated third party.</li>
                <li>Custodian eligibility should be confirmed first.</li>
                <li>Principal and interest return to the IRA.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">The Basic Structure</span>
          <h2>A Self-Directed IRA is the investor — not the account owner personally</h2>
          <div className="ira-grid">
            <article className="ira-card"><h3>Self-Directed IRA required</h3><p>The account must be administered as a self-directed IRA by a custodian or administrator willing to hold private notes. A conventional brokerage or bank IRA should not be assumed to permit this investment.</p></article>
            <article className="ira-card"><h3>Traditional or Roth tax status</h3><p>“Self-directed” describes how the account may hold alternative assets; it is not a separate tax classification. The underlying IRA may be Traditional or Roth, subject to custodian procedures and independent tax and legal review.</p></article>
            <article className="ira-card"><h3>Third-party borrower</h3><p>The borrower should be an unrelated party who is not a disqualified person with respect to the IRA. The transaction must be evaluated for direct and indirect prohibited-transaction concerns.</p></article>
            <article className="ira-card"><h3>Interest returns to the IRA</h3><p>Loan payments are generally directed to the retirement account through the custodian or administrator. The IRA owner should not personally receive the borrower’s interest or principal payments.</p></article>
          </div>

          <div className="ira-platform-note">
            <h3>Why a specialized self-directed custodian may be necessary</h3>
            <p>
              Conventional retail IRA, SEP IRA and brokerage platforms—including standard accounts offered through firms such as Morgan Stanley and Charles Schwab—typically focus on publicly traded securities and firm-approved investments. Conventional bank or affiliated brokerage platforms such as Bank of America/Merrill, Chase and BMO likewise should not be assumed to accept custody of a client-originated private note secured by a Florida liquor license. Some of these institutions offer selected alternative investments or private-credit funds to qualifying clients, but that is different from allowing an IRA or SEP IRA to originate and hold an individually negotiated 4COP Quota or 3PS liquor-license note. Policies, account eligibility and asset-acceptance standards vary and must be confirmed directly with the institution.
            </p>
          </div>
        </div>
      </section>

      <section className="seo-market-guide" id="ira-setup-assistance">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Optional Administrative Service</span>
          <h2>Self-Directed IRA Setup Assistance</h2>
          <p className="ira-setup-lead">
            FLLM charges a flat $495 administrative fee to identify possible self-directed IRA custodians or administrators that state they permit private-note investments, help coordinate account setup and transfer or rollover paperwork from a client’s existing Traditional IRA, and coordinate access to independent attorneys experienced in Florida liquor-license transactions. The client independently evaluates and selects every custodian and attorney. The account and retirement assets are established, held and transferred by the selected providers — not by FLLM.
          </p>

          <div className="ira-setup-service">
            <div>
              <h3>Administrative setup & transfer coordination</h3>
              <p>We help keep the administrative process organized while you remain in control of the custodian, account elections, signatures and every investment decision.</p>
              <ul className="ira-setup-list">
                <li>Identify one or more possible self-directed IRA custodians or administrators that state they permit private-note investments.</li>
                <li>Organize account-opening materials required by the custodian or administrator you independently select.</li>
                <li>Help assemble factual information and supporting documents requested by the selected provider, using information supplied or approved by you.</li>
                <li>Help coordinate transfer or direct-rollover paperwork from an existing Traditional IRA with the existing provider and receiving custodian.</li>
                <li>Track administrative follow-up, missing items and status updates while the self-directed account is opened and funded.</li>
                <li>Prepare an administrative checklist for a future 4COP Quota or 3PS private-note investment request.</li>
                <li>At the client’s request, identify and coordinate communications with independent attorneys experienced in Florida liquor-license transactions. Attorney engagement, legal advice and legal fees are separate and are not included in the $495 FLLM fee unless expressly stated in a written agreement.</li>
              </ul>
            </div>

            <aside className="ira-setup-price" aria-label="Self-Directed IRA Setup Assistance price">
              <span>Flat administrative fee</span>
              <strong>$495</strong>
              <small>One-time fee for custodian identification, account-setup and transfer or rollover coordination, and coordination with independent Florida liquor-license counsel. Attorney fees are separate. This is not an investment-management, brokerage or success fee.</small>
              <a className="seo-market-button seo-market-button-gold" href="https://buy.stripe.com/5kQ4gr5iZ47r9KJ2aNebu03">Pay Securely with Stripe — $495</a>
            </aside>
          </div>

          <div className="ira-admin-boundary">
            <strong>Administrative scope only.</strong> FLLM may identify possible custodians or administrators, coordinate paperwork, and facilitate introductions to independent Florida liquor-license attorneys, but FLLM does not endorse, recommend, select or guarantee any custodian, attorney, account, rollover or investment. FLLM is not a law firm and does not supervise the attorney, establish an attorney-client relationship, include the attorney’s legal fees in the $495 service fee unless expressly agreed in writing, choose tax elections, draft customized legal or loan documents, provide legal, tax or investment advice, handle retirement funds, sign forms, determine prohibited-transaction compliance, or guarantee that a provider will accept a proposed investment. The client independently retains counsel, reviews and approves all elections, and signs all required documents. Any movement of retirement assets is handled by the existing provider and receiving custodian or trustee under their procedures.
          </div>

          <div className="ira-disclosure-grid" aria-label="Investment and registration disclosures">
            <article>
              <strong>No investment advice or securities registration</strong>
              <p>FLLM is not registered as an investment adviser with the SEC or any state securities authority and is not a FINRA-registered broker-dealer. FLLM does not provide investment advice or recommend any borrower, lender, custodian, note or transaction.</p>
            </article>
            <article>
              <strong>Possible loss of capital</strong>
              <p>Private loans connected with liquor-license transactions involve substantial risk. A borrower may default, collateral value and liquidity may decline, enforcement may be delayed or unsuccessful, and an investor may lose some or all principal.</p>
            </article>
            <article>
              <strong>Not FDIC insured or guaranteed</strong>
              <p>A private note is an investment, not a bank deposit. It is not FDIC insured, is not guaranteed by FLLM, any custodian or any government agency, and may lose value.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">How a Transaction Could Work</span><h2>From opportunity to IRA-owned private loan</h2></div></div>
          <ol className="ira-steps">
            <li><strong>Identify an unrelated borrower and transaction.</strong> The borrower may be buying or refinancing a Florida 4COP Quota or 3PS quota liquor license.</li>
            <li><strong>Review the license and loan economics.</strong> Investors should evaluate county-specific license value, requested loan amount, borrower equity, repayment capacity, liens, transaction timing and exit strategy.</li>
            <li><strong>Confirm custodian eligibility before committing funds.</strong> The IRA custodian or administrator must be willing to hold the proposed private-debt investment and complete its own documentation and review process.</li>
            <li><strong>Complete prohibited-transaction review.</strong> The IRA owner should have qualified tax or legal professionals determine whether the borrower, related parties or transaction structure creates a prohibited transaction.</li>
            <li><strong>Document and fund through the IRA.</strong> If approved, the retirement account — not the IRA owner personally — funds the loan, and the note and related documents are titled for the IRA in the form required by the custodian.</li>
            <li><strong>Direct payments back to the IRA.</strong> Principal and interest are paid to the IRA account according to the loan documents and custodian procedures.</li>
          </ol>
        </div>
      </section>

      <section className="seo-market-intro" id="license-backed-collateral-documents">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">License-Backed Loan Documents</span>
          <h2>How a “chattel mortgage” can fit into a Florida quota-license loan</h2>
          <div className="ira-chattel-guide">
            <div>
              <h3>The note creates the debt; the security agreement identifies the collateral.</h3>
              <p>
                A private loan may include a promissory note and a separate security agreement—sometimes traditionally titled a <em>chattel mortgage</em>—that identifies the quota license as collateral and states the borrower&apos;s covenants and the lender&apos;s contractual remedies. The agreement may restrict an unauthorized sale, assignment, lease, additional lien, or other disposition while the loan remains outstanding.
              </p>
              <p>
                A Florida quota liquor license is a regulated <strong>general intangible</strong>, not ordinary physical chattel. The agreement does not give the IRA owner or custodian a right to operate under the license, and signing it does not by itself prove that the lender&apos;s interest was recorded or perfected.
              </p>
              <div className="ira-chattel-links">
                <Link href="/resources/florida-liquor-license-property-or-privilege#chattel-mortgage">Read FLLM&apos;s Complete Chattel-Mortgage Guide</Link>
                <Link href="/resources/forms/abt-6022">Open the ABT-6022 Workspace</Link>
              </div>
            </div>
            <aside className="ira-chattel-example">
              <span>Anonymized illustration</span>
              <h4>A $200,000 IRA-owned private loan</h4>
              <p>
                A properly titled retirement account funds a $200,000 loan to an unrelated borrower purchasing or refinancing a Florida 4COP quota license. The borrower signs the note and security agreement, the custodian holds the investment for the IRA, and payments return to the IRA. Separate Division recording, qualification, priority, and enforcement requirements still apply.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Important IRS Rules</span>
          <h2>This is not the same as taking a loan from your IRA</h2>
          <ul className="ira-rules">
            <li>The IRS states that participant loans are not permitted from IRAs or IRA-based plans.</li>
            <li>Borrowing money from your own IRA can be a prohibited transaction.</li>
            <li>Using IRA assets as security for your personal loan can create adverse tax consequences.</li>
            <li>Lending money or extending credit between a plan or IRA and a disqualified person can be prohibited.</li>
            <li>Direct or indirect use of IRA assets for the benefit of a disqualified person can create prohibited-transaction risk.</li>
            <li>Nonpublicly traded or directly controlled assets can carry increased prohibited-transaction risk and require careful administration.</li>
          </ul>
          <div className="ira-source-links">
            <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-prohibited-transactions" target="_blank" rel="noreferrer">IRS: Prohibited Transactions</a>
            <a href="https://www.irs.gov/retirement-plans/retirement-plans-faqs-regarding-loans" target="_blank" rel="noreferrer">IRS: IRA Loan Rules</a>
            <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/rollovers-of-retirement-plan-and-ira-distributions" target="_blank" rel="noreferrer">IRS: Rollovers & Trustee-to-Trustee Transfers</a>
            <a href="https://www.irs.gov/publications/p590a" target="_blank" rel="noreferrer">IRS Publication 590-A</a>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Illustrative Example</span>
          <h2>A retirement account funds an unrelated buyer’s license purchase</h2>
          <div className="ira-example">
            <h3>Example only — not an offer or promised return</h3>
            <p>
              An unrelated buyer agrees to purchase a transferable Florida quota liquor license and seeks private financing for part of the acquisition. An investor with a self-directed IRA identifies the opportunity, completes independent underwriting and confirms with the IRA custodian and professional advisers that the investment is eligible. If approved, the IRA funds the loan and holds the investment through the custodian. The borrower makes scheduled principal and interest payments back to the IRA under the loan documents. Any collateral package, guarantees, lien rights, perfection steps and enforcement remedies must be documented for the specific transaction and applicable law.
            </p>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Investor Due Diligence</span><h2>Private lending can produce income — and can also lose money</h2></div></div>
          <ul className="ira-rules">
            <li>Verify the exact license, county, status, transferability and market value.</li>
            <li>Review borrower credit, liquidity, equity and repayment capacity.</li>
            <li>Understand whether the loan is secured and what remedies are actually available after default.</li>
            <li>Review existing liens, senior debt and any competing claims.</li>
            <li>Confirm the interest rate, maturity, amortization, balloon terms, fees and prepayment provisions.</li>
            <li>Use independent legal, tax and retirement-account professionals before funding.</li>
          </ul>
          <div className="ira-warning">
            <strong>Important:</strong> FLLM is an information and marketplace platform, not an IRA custodian or trustee, registered investment adviser, FINRA-registered broker-dealer, tax adviser or law firm. Private notes are not FDIC insured or guaranteed and may result in the loss of some or all invested capital. FLLM does not determine IRA eligibility or prohibited-transaction compliance and does not guarantee repayment, return, collateral value or liquidity. Investors and borrowers should obtain independent legal, tax, investment and retirement-account advice before entering any transaction.
          </div>
        </div>
      </section>

      <section className="seo-market-final-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div>
            <span className="seo-market-section-kicker">Explore Private Lending</span>
            <h2>Review opportunities — or get help organizing your IRA setup.</h2>
            <p>Evaluate the license, borrower, collateral structure, loan terms and retirement-account eligibility before committing capital.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/investment-opportunities">View Opportunities</Link>
            <Link className="seo-market-button seo-market-button-dark" href="#ira-setup-assistance">Setup Assistance — $495</Link>
          </div>
        </div>
      </section>
      <footer className="directory-footer">
        <div className="seo-market-shell">
          <div className="directory-footer-brand">
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
      </footer>
    </main>
  );
}
