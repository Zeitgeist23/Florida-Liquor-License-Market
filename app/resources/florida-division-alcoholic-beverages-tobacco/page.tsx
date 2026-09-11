import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./dabt.css";

const canonicalUrl =
  "https://www.floridaliquorlicensemarket.com/resources/florida-division-alcoholic-beverages-tobacco";
const officialDabtImage =
  "https://www2.myfloridalicense.com/wp-content/uploads/2017/03/alcohol-beverages-and-tobacco-990x304.jpg";

export const metadata: Metadata = {
  title: "Florida DABT Guide | Lis Pendens, Alerts, Transfers & Quota License Due Diligence | FLLM",
  description:
    "Understand Florida DABT licensing, quota-license transfers, lis pendens under section 48.23, Chief Alerts, Supervisor Alerts, liens, and title due diligence for sales, financing and refinancing.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida DABT liquor license",
    "Florida liquor license lis pendens",
    "Florida liquor license supervisor alert",
    "Florida liquor license chief alert",
    "quota license title search Florida",
    "Florida Statute 48.23 liquor license",
    "Florida liquor license liens",
    "Florida quota license due diligence",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida DABT, Lis Pendens & Quota License Title Due Diligence | FLLM",
    description:
      "FLLM explains DABT records, lis pendens, Chief and Supervisor Alerts, liens and transaction risks affecting Florida quota liquor licenses.",
    images: [{ url: officialDabtImage, width: 990, height: 304, alt: "Alcoholic Beverages and Tobacco - Florida DBPR" }],
  },
};

const officialDabtUrl =
  "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/";
const formsUrl =
  "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/forms-and-publications/";
const quotaUrl =
  "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/";
const contactUrl =
  "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/contact/";
const statute48023 =
  "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0048/Sections/0048.23.html";
const statute56102 =
  "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.02.html";
const statute56132 =
  "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.32.html";
const statute56165 =
  "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.65.html";
const wallingOpinion =
  "https://law.justia.com/cases/florida/supreme-court/1994/81126-0.html";
const hubbardOpinion =
  "https://law.justia.com/cases/florida/district-courts-of-appeal/1964/163-so-2d-307.html";
const verifyLicenseUrl =
  "https://www.myfloridalicense.com/wl11.asp?mode=0&SID=";

export default function FloridaDabtResourcePage() {
  return (
    <main className="dabt-page">
      <div className="dabt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="dabt-hero">
        <div className="page-shell">
          <nav className="dabt-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/resources">Resources</Link>
            <span>›</span>
            <b>Florida DABT</b>
          </nav>
          <div className="dabt-hero-grid">
            <div className="dabt-hero-copy">
              <span className="dabt-eyebrow">Florida licensing authority · transaction and title-risk guide</span>
              <h1>Florida Division of Alcoholic Beverages &amp; Tobacco (DABT)</h1>
              <p>
                DABT is the division of Florida&apos;s Department of Business and Professional Regulation
                (DBPR) that licenses and regulates alcoholic-beverage businesses and licensees. For quota-license
                buyers, sellers and lenders, the Division&apos;s records are also an important part of transaction
                diligence—but they are not a substitute for reviewing liens, litigation, recorded notices and the
                private ownership documents behind the license.
              </p>
              <div className="dabt-hero-actions">
                <a className="btn btn-gold" href="#title-risk">Lis Pendens &amp; DABT Alerts</a>
                <a className="btn btn-outline" href={officialDabtUrl} target="_blank" rel="noreferrer">
                  Official DABT website ↗
                </a>
              </div>
            </div>
            <figure className="dabt-hero-visual">
              <a href={officialDabtUrl} target="_blank" rel="noreferrer" aria-label="Open the official Florida DABT website">
                <img
                  src={officialDabtImage}
                  alt="Alcoholic beverages image used by the Florida Division of Alcoholic Beverages and Tobacco"
                  loading="eager"
                />
              </a>
              <figcaption>Official DABT imagery · Florida Department of Business &amp; Professional Regulation</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="dabt-intro page-shell">
        <div>
          <span className="dabt-eyebrow">DBPR and DABT</span>
          <h2>Who DABT is—and where it fits</h2>
        </div>
        <p>
          Section 561.02, Florida Statutes, creates DABT within DBPR and gives the Division primary regulatory
          authority over Florida alcoholic-beverage licensing and enforcement. DABT controls the regulatory
          approval of a license transfer. Courts and private transaction documents, however, can also affect the
          economic or property rights associated with a quota license.
          <a className="dabt-inline-link" href={statute56102} target="_blank" rel="noreferrer"> Read § 561.02 ↗</a>
        </p>
      </section>

      <section className="dabt-card-grid page-shell" aria-label="DABT licensing pathways">
        <article className="dabt-card">
          <span>NEW LICENSE</span>
          <h2>ABT-6001</h2>
          <p>
            DBPR ABT-6001 is the application used to seek a new alcoholic-beverage license or permit.
            It is not the ownership-transfer form for an existing license. New-license applications can
            require zoning approval, background information, fingerprints and other supporting items
            depending on the license and applicant.
          </p>
          <a href={formsUrl} target="_blank" rel="noreferrer">Official forms and instructions ↗</a>
        </article>

        <article className="dabt-card">
          <span>EXISTING LICENSE SALE</span>
          <h2>ABT-6002</h2>
          <p>
            When an existing alcoholic-beverage license is sold, ABT-6002 is the DABT application used
            for a transfer of ownership. The purchase agreement and closing do not by themselves cause
            DABT&apos;s licensing records to change; the proposed buyer must complete the required transfer
            process and obtain agency approval.
          </p>
          <Link href="/dbpr-abt-6002">Open the FLLM ABT-6002 transfer guide →</Link>
        </article>

        <article className="dabt-card">
          <span>QUOTA DRAWING</span>
          <h2>ABT-6033</h2>
          <p>
            Florida&apos;s annual quota-license drawing is a separate path for newly available quota
            licenses. ABT-6033 is the drawing-entry form. A successful entrant receives the opportunity
            to proceed through the state&apos;s licensing process; the drawing is not a substitute for the
            subsequent license application and approval requirements.
          </p>
          <Link href="/florida-liquor-license-lottery">Open the FLLM quota-lottery page →</Link>
        </article>
      </section>

      <section className="dabt-process page-shell" id="approval-process">
        <div className="dabt-process-copy">
          <span className="dabt-eyebrow">Ownership transfer</span>
          <h2>How DABT approval fits into a 4COP Quota or 3PS Quota sale</h2>
          <p>
            A private sale can establish the economic terms between buyer and seller, but DABT controls
            the regulatory approval of the license transfer. Section 561.32 also recognizes judicial enforcement
            of license liens and makes clear that a regulatory transfer can intersect with private creditor and
            ownership rights.
          </p>
          <a className="dabt-inline-link" href={statute56132} target="_blank" rel="noreferrer">Read § 561.32 ↗</a>
          <Link className="btn btn-gold" href="/transaction-services">Explore FLLM Transaction Services</Link>
        </div>
        <ol className="dabt-steps">
          <li><b>1</b><span><strong>Purchase terms</strong>Buyer and seller agree on price, closing conditions and the license being transferred.</span></li>
          <li><b>2</b><span><strong>Title and lien diligence</strong>Review DABT records, recorded liens, litigation, lis pendens notices and the seller&apos;s chain of private ownership documents.</span></li>
          <li><b>3</b><span><strong>ABT-6002</strong>The proposed buyer submits the ownership-transfer application and required supporting information.</span></li>
          <li><b>4</b><span><strong>Background review</strong>Fingerprinting, ownership disclosures and qualification information are reviewed when applicable.</span></li>
          <li><b>5</b><span><strong>DABT review</strong>The Division evaluates the application, its records and any deficiencies or additional documentation.</span></li>
          <li><b>6</b><span><strong>Approval and closing conditions</strong>Parties and lenders coordinate regulatory approval with contractual, lien-release and funding requirements.</span></li>
        </ol>
      </section>

      <section className="dabt-title-risk page-shell" id="title-risk" aria-labelledby="title-risk-heading">
        <div className="dabt-title-risk-heading">
          <span className="dabt-eyebrow">Quota-license title and transaction diligence</span>
          <h2 id="title-risk-heading">Lis pendens, Chief Alerts, Supervisor Alerts and liens</h2>
          <p>
            A DABT license record tells you who the Division recognizes for regulatory purposes and may display
            special qualifications such as liens or internal alerts. It should not be treated as a title-insurance
            policy or a complete determination of private ownership. Buyers and lenders should investigate both
            the Division record and outside records that may affect the license.
          </p>
        </div>

        <div className="dabt-risk-grid">
          <article className="dabt-risk-card">
            <span>COURT NOTICE</span>
            <h3>Lis pendens</h3>
            <p>
              A lis pendens is a recorded notice that litigation is pending concerning identified property.
              Section 48.23 applies to litigation affecting <q>real or personal property involved therein or to be affected thereby</q>.
              In practical terms, it warns later purchasers and lienholders that claimed rights to the identified
              property are being litigated.
            </p>
          </article>
          <article className="dabt-risk-card">
            <span>DBPR SPECIAL QUALIFICATION</span>
            <h3>Supervisor Alert</h3>
            <p>
              Public DBPR license-detail records can display “Supervisor Alert” under Special Qualifications with
              an effective date. FLLM did not locate a public DABT glossary defining the internal reason for every
              Supervisor Alert. It should therefore be treated as a signal to obtain the underlying Division file
              or written clarification before relying on the license in a transaction.
            </p>
          </article>
          <article className="dabt-risk-card">
            <span>DBPR SPECIAL QUALIFICATION</span>
            <h3>Chief Alert</h3>
            <p>
              Public DBPR records also display “Chief Alert” on some alcoholic-beverage licenses. As with a
              Supervisor Alert, the public-facing record does not necessarily reveal the reason for the flag.
              A Chief Alert is not, by itself, proof that another party owns the license or that a lien exists,
              but it warrants additional diligence before a sale, refinance or lender closing.
            </p>
          </article>
          <article className="dabt-risk-card">
            <span>RECORDED SECURITY INTEREST</span>
            <h3>Liens</h3>
            <p>
              Liens are different from alerts. Section 561.65 establishes Florida&apos;s specialized system for
              recording qualifying mortgages, liens and security interests in spirituous alcoholic-beverage
              licenses. A DABT “Liens” notation should prompt a formal lien search and review of releases,
              assignments, priority and payoff requirements.
            </p>
          </article>
        </div>

        <section className="dabt-lis-pendens">
          <div>
            <span className="dabt-eyebrow">Florida Statute § 48.23</span>
            <h2>What a lis pendens does—and when it expires</h2>
            <p>
              Under § 48.23, litigation does not operate as a lis pendens against affected property unless the
              statutory notice is recorded in the official records of the county where the property is located and
              the notice has not expired, been withdrawn or been discharged. The notice identifies the parties,
              case, court, affected property and the relief sought.
            </p>
            <p>
              For an action seeking specific performance or one not founded on a duly recorded instrument, the
              statute protects later purchasers for value when no effective lis pendens remains. Subsection (2)
              states that a notice generally is <q>not effectual for any purpose beyond 1 year from the commencement of the action</q>,
              unless the statutory exception applies or the court timely extends it on reasonable notice and for good cause.
            </p>
            <p>
              The statute also excludes the time an action is pending in an appellate court from that one-year period.
              Because the effect of a lis pendens depends on the pleadings, timing, recording, extension orders and the
              nature of the claimed property interest, transaction parties should have counsel review the actual docket
              and official-record entries rather than relying on a database label alone.
            </p>
            <div className="dabt-source-actions">
              <a href={statute48023} target="_blank" rel="noreferrer">Read the official text of § 48.23 ↗</a>
              <Link href="/resources/florida-liquor-license-laws">FLLM Statutes &amp; Regulations →</Link>
            </div>
          </div>
          <aside>
            <strong>Why this matters for a quota license</strong>
            <p>
              Florida courts describe a liquor license as a regulated general intangible with property-like
              characteristics. Court proceedings have also used lis pendens in disputes and foreclosures involving
              Florida alcoholic-beverage licenses. A recorded notice can therefore become a serious diligence issue
              even though DABT separately controls the regulatory transfer.
            </p>
          </aside>
        </section>

        <section className="dabt-case-strip" aria-label="Cases and source material">
          <a href={wallingOpinion} target="_blank" rel="noreferrer">
            <span>Florida Supreme Court · 1994</span>
            <strong>Walling Enterprises, Inc. v. Mathias</strong>
            <small>Liquor license as a general intangible with property-like characteristics.</small>
          </a>
          <a href={hubbardOpinion} target="_blank" rel="noreferrer">
            <span>Florida Second DCA · 1964</span>
            <strong>Hubbard v. Jebb</strong>
            <small>Dispute involving a lien on a Florida alcoholic-beverage license and a filed lis pendens.</small>
          </a>
          <Link href="/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings">
            <span>Florida Circuit Court · 2025</span>
            <strong>Park Street Trust quota-license findings</strong>
            <small>FLLM reader covering a specific-performance dispute, property rights and lis pendens.</small>
          </Link>
        </section>

        <section className="dabt-transaction-impact">
          <div className="dabt-title-risk-heading">
            <span className="dabt-eyebrow">Sales · financing · refinancing</span>
            <h2>How unresolved title or record issues can affect a transaction</h2>
          </div>
          <div className="dabt-impact-grid">
            <article><b>Sale</b><p>A buyer may refuse to close, require escrow, demand a release or seek legal confirmation if pending litigation, a lis pendens, a lien or an unexplained Division alert creates uncertainty over the license.</p></article>
            <article><b>Financing</b><p>A lender taking the quota license as collateral may require a DABT lien search, payoff evidence, litigation review, appraisal support and confirmation that its security interest can be properly recorded.</p></article>
            <article><b>Refinancing</b><p>An existing alert, lien or lawsuit can delay a refinance while the lender determines priority, payoff amounts, enforceability and whether the borrower has sufficient transferable rights in the collateral.</p></article>
            <article><b>DABT transfer</b><p>The Division&apos;s regulatory approval is a separate step. Private title disputes and court claims do not disappear merely because a transfer application is filed or a public license page names a particular licensee.</p></article>
          </div>
        </section>

        <section className="dabt-diligence-checklist">
          <div>
            <span className="dabt-eyebrow">FLLM transaction checklist</span>
            <h2>Before closing or funding a quota-license transaction</h2>
          </div>
          <ol>
            <li><strong>Verify the public DABT record.</strong> Confirm license number, series, county, status, licensee and Special Qualifications.</li>
            <li><strong>Investigate every alert.</strong> If Chief Alert or Supervisor Alert appears, request the underlying DABT file or written agency clarification.</li>
            <li><strong>Order a DABT lien search.</strong> Review recorded liens, assignments, releases and payoff requirements under § 561.65.</li>
            <li><strong>Search county official records.</strong> Check for lis pendens notices, judgments and recorded documents naming the license or relevant parties.</li>
            <li><strong>Search the court docket.</strong> Read the complaint, operative pleadings, lis pendens, extension or discharge orders, and current case status.</li>
            <li><strong>Review the chain of private ownership.</strong> Compare contracts, bills of sale, assignments, security agreements and closing documents with the DABT record.</li>
            <li><strong>Coordinate lender and closing conditions.</strong> Resolve required releases, subordinations, escrow terms, FDOR issues and DABT transfer documents before funding.</li>
          </ol>
          <div className="dabt-source-actions">
            <a href={verifyLicenseUrl} target="_blank" rel="noreferrer">DBPR Verify a License ↗</a>
            <a href={statute56165} target="_blank" rel="noreferrer">Read § 561.65 ↗</a>
            <Link href="/florida-liquor-license-appraisal">FLLM Appraisal Resources →</Link>
            <Link href="/how-to-finance-florida-liquor-license">FLLM Financing Guide →</Link>
          </div>
        </section>
      </section>

      <section className="dabt-two-column page-shell">
        <article className="dabt-info-panel">
          <span className="dabt-eyebrow">Applicant qualification</span>
          <h2>Florida&apos;s good moral character rule</h2>
          <p>
            Florida law requires alcoholic-beverage license applicants to satisfy statutory character
            and eligibility requirements. Applications can require disclosure of criminal history and
            supporting disposition or mitigation records. Section 561.15, Florida Statutes, contains
            specific age, character and disqualification provisions, including waiting periods tied to
            certain convictions.
          </p>
          <Link href="/resources/florida-liquor-license-laws">Review FLLM&apos;s Florida liquor-license laws →</Link>
          <small>
            This is a general regulatory overview, not legal advice. Eligibility is fact-specific and
            should be confirmed against current law and DABT requirements.
          </small>
        </article>

        <article className="dabt-info-panel">
          <span className="dabt-eyebrow">Quota licenses</span>
          <h2>DABT&apos;s role in newly issued quota licenses</h2>
          <p>
            Florida makes additional quota licenses available under the statutory population-based
            quota system. DABT administers the annual quota drawing and the licensing steps that follow.
            The drawing determines who receives the right to pursue issuance; the applicant still must
            satisfy the applicable licensing requirements before the license is issued.
          </p>
          <a href={quotaUrl} target="_blank" rel="noreferrer">Official quota-license information ↗</a>
        </article>
      </section>

      <section className="dabt-office page-shell">
        <div>
          <span className="dabt-eyebrow">DABT central office</span>
          <h2>Division of Alcoholic Beverages &amp; Tobacco</h2>
          <address>
            2601 Blair Stone Road<br />
            Tallahassee, Florida 32399-0791
          </address>
          <p><strong>Main telephone:</strong> <a href="tel:+18504871395">850-487-1395</a></p>
          <p><strong>Licensing central office:</strong> <a href="tel:+18504883227">850-488-3227</a></p>
          <a href={contactUrl} target="_blank" rel="noreferrer">Verify current DABT contact information ↗</a>
        </div>
        <iframe
          title="Map of Florida Division of Alcoholic Beverages and Tobacco central office"
          src="https://www.google.com/maps?q=2601+Blair+Stone+Road,+Tallahassee,+FL+32399&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="dabt-fllm page-shell">
        <div>
          <span className="dabt-eyebrow">Transaction assistance</span>
          <h2>FLLM helps organize the transaction around the DABT approval process</h2>
          <p>
            Florida Liquor License Market can connect the market and transaction pieces in one place:
            valuation and appraisal resources, buyer and seller workflows, financing, ABT transfer
            preparation resources, FDOR clearance resources, closing tools and qualified professional
            referrals. DABT remains the governmental licensing authority and makes the approval decision.
          </p>
        </div>
        <div className="dabt-fllm-actions">
          <Link className="btn btn-gold" href="/transaction-services">Explore FLLM Transaction Services</Link>
          <Link className="btn btn-outline" href="/resources/forms">Open Florida ABT Forms</Link>
          <a className="btn btn-outline" href={officialDabtUrl} target="_blank" rel="noreferrer">Visit Official DABT Website ↗</a>
        </div>
      </section>

      <section className="dabt-disclosure page-shell">
        <strong>Important regulatory and title disclosure</strong>
        <p>
          Florida Liquor License Market is not DBPR, DABT, a court, a title insurer or a law firm. A public
          DABT record does not determine every private ownership, priority or litigation issue affecting a quota
          license. Statutes, forms, procedures and case law can change. Confirm current official records and obtain
          qualified legal, licensing and lending advice for a specific transaction before closing or funding.
        </p>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida&apos;s marketplace for buying, selling and financing liquor licenses.</span>
          <Link href="/resources">Return to FLLM Resources</Link>
        </div>
      </footer>
    </main>
  );
}
