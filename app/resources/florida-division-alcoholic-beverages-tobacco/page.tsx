import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./dabt.css";

const canonicalUrl =
  "https://www.floridaliquorlicensemarket.com/resources/florida-division-alcoholic-beverages-tobacco";

export const metadata: Metadata = {
  title: "Florida DABT Liquor License Guide | DBPR, ABT-6001 & ABT-6002 | FLLM",
  description:
    "Understand Florida's Division of Alcoholic Beverages & Tobacco (DABT), DBPR licensing, quota drawings, ABT-6001, ABT-6002, transfer approvals, moral-character review and FLLM transaction resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Division of Alcoholic Beverages & Tobacco (DABT) | FLLM",
    description:
      "Plain-language guidance to DABT's role in Florida liquor-license issuance, quota drawings, ownership transfers and regulatory approval.",
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
          <span className="dabt-eyebrow">Florida licensing authority · plain-language FLLM guide</span>
          <h1>Florida Division of Alcoholic Beverages &amp; Tobacco (DABT)</h1>
          <p>
            DABT is the division of Florida&apos;s Department of Business and Professional Regulation
            (DBPR) that licenses and regulates alcoholic-beverage businesses and licensees. For buyers,
            sellers and applicants, DABT is the agency that ultimately reviews and approves the
            applicable liquor-license application or ownership-transfer request.
          </p>
          <div className="dabt-hero-actions">
            <a className="btn btn-gold" href="#approval-process">See the approval process</a>
            <a className="btn btn-outline" href={officialDabtUrl} target="_blank" rel="noreferrer">
              Official DABT website ↗
            </a>
          </div>
        </div>
      </section>

      <section className="dabt-intro page-shell">
        <div>
          <span className="dabt-eyebrow">DBPR and DABT</span>
          <h2>Who DABT is—and where it fits</h2>
        </div>
        <p>
          DBPR is Florida&apos;s Department of Business and Professional Regulation. DABT is the DBPR
          division responsible for alcoholic-beverage and tobacco licensing, licensing records,
          regulatory compliance and enforcement. FLLM is not the licensing agency; FLLM provides
          market information, transaction tools and preparation resources while DABT makes the
          regulatory licensing decision.
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
            the regulatory approval of the license transfer. The exact supporting package depends on the
            transaction, applicant, premises and current agency requirements.
          </p>
          <Link className="btn btn-gold" href="/transaction-services">Explore FLLM Transaction Services</Link>
        </div>
        <ol className="dabt-steps">
          <li><b>1</b><span><strong>Purchase terms</strong>Buyer and seller agree on price, closing conditions and the license being transferred.</span></li>
          <li><b>2</b><span><strong>ABT-6002</strong>The proposed buyer submits the ownership-transfer application and required supporting information.</span></li>
          <li><b>3</b><span><strong>Background review</strong>Fingerprinting, ownership disclosures and moral-character information are reviewed when applicable.</span></li>
          <li><b>4</b><span><strong>Premises and agency requirements</strong>Zoning, location, tax, fee and other supporting requirements are addressed as applicable.</span></li>
          <li><b>5</b><span><strong>DABT review</strong>The Division evaluates the application and any deficiencies or additional documentation.</span></li>
          <li><b>6</b><span><strong>Approval and issuance</strong>After approval, the licensing record can reflect the approved transaction and licensee.</span></li>
        </ol>
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
        <strong>Important regulatory disclosure</strong>
        <p>
          Florida Liquor License Market is not DBPR or DABT and does not determine licensing
          eligibility or approve license applications. Forms, fees, procedures and statutory
          requirements can change. Confirm the current form, filing instructions and applicant
          requirements with DABT and appropriate professional advisers before filing or closing.
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
