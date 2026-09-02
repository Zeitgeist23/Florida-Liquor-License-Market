import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./florida-department-of-revenue.css";

export const metadata: Metadata = {
  title: "Florida Department of Revenue Forms and Tax Clearance | FLLM",
  description:
    "Access Florida Department of Revenue Form DR-835, tax-clearance requests, certificates of compliance, and alcoholic-beverage license approval guidance.",
};

const clearanceRequestUrl = "https://taxapp.floridarevenue.com/TaxClearanceLetter/";

export default function FloridaDepartmentOfRevenueResourcesPage() {
  return (
    <main className="fdor-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="fdor-hero">
        <div className="page-shell">
          <nav className="fdor-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <b>Florida Department of Revenue (FDOR)</b>
          </nav>
          <span className="fdor-eyebrow">Official tax forms and transaction resources</span>
          <h1>Florida Department of Revenue Forms and Tax Clearance</h1>
          <p>
            Locate the Florida Department of Revenue power-of-attorney form, request a Tax
            Clearance Letter or Certificate of Compliance, and review the separate FDOR approval
            process used with alcoholic-beverage license applications.
          </p>
          <div className="fdor-hero-actions">
            <a className="btn btn-gold" href="#fdor-forms">View Forms and Requests</a>
            <a
              className="btn btn-outline"
              href="https://floridarevenue.com/taxes/compliance/Pages/ablicenseapproval.aspx"
              target="_blank"
              rel="noreferrer"
            >
              Official FDOR Beverage Approval ↗
            </a>
          </div>
        </div>
      </section>

      <section className="fdor-intro page-shell" aria-labelledby="fdor-intro-heading">
        <div>
          <span>Choose the correct resource</span>
          <h2 id="fdor-intro-heading">Tax clearance and license approval are related—but different</h2>
        </div>
        <p>
          A representative may need DR-835 to receive confidential tax information. A seller may
          request a Certificate of Compliance when selling a business. FDOR approval of an
          alcoholic-beverage license application follows its own submission process.
        </p>
      </section>

      <section className="fdor-resource-grid page-shell" id="fdor-forms" aria-label="FDOR forms and requests">
        <article className="fdor-resource-card fdor-card-featured">
          <div className="fdor-card-label">
            <span>DR-835</span>
            <small>Power of Attorney</small>
          </div>
          <h2>Power of Attorney and Declaration of Representative</h2>
          <p>
            Used when a taxpayer authorizes an attorney, CPA, enrolled agent, or other qualified
            representative to act before FDOR or receive confidential Florida tax information.
          </p>
          <ul>
            <li>Browser-compatible text fields and checkboxes</li>
            <li>66 interactive fields across the official four-page form</li>
            <li>Can be completed, saved, downloaded, and printed</li>
          </ul>
          <div className="fdor-card-actions">
            <a
              className="btn btn-gold"
                  href="/api/fdor/dr835/pdf?v=complete-2"
              target="_blank"
              rel="noreferrer"
            >
              Open FLLM Fillable DR-835 ↗
            </a>
            <a
              className="fdor-text-link"
              href="https://www.floridarevenue.com/Forms_library/current/dr835.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View the official FDOR form and instructions ↗
            </a>
            <small className="fdor-browser-note">
              FLLM added standard PDF fields to the official FDOR artwork because the state’s
              Adobe-only fillable file does not display in most browser PDF viewers.
            </small>
          </div>
        </article>

        <article className="fdor-resource-card">
          <div className="fdor-card-label">
            <span>Online request</span>
            <small>Business transactions</small>
          </div>
          <h2>Request a Certificate of Compliance</h2>
          <p>
            A seller may request this certificate as evidence that FDOR has not issued a notice of
            intent to audit and that the account has no currently outstanding liabilities.
          </p>
          <div className="fdor-use-note">
            <strong>Most relevant when:</strong>
            <span>A business or business interest is being bought or sold.</span>
          </div>
          <a
            className="btn btn-gold"
            href={clearanceRequestUrl}
            target="_blank"
            rel="noreferrer"
          >
            Request Certificate Online ↗
          </a>
        </article>

        <article className="fdor-resource-card">
          <div className="fdor-card-label">
            <span>Online request</span>
            <small>Account standing</small>
          </div>
          <h2>Request a Tax Clearance Letter</h2>
          <p>
            This letter reports the current status of an FDOR account. The official request system
            identifies it principally for taxpayers applying for certain grants or loans.
          </p>
          <div className="fdor-use-note">
            <strong>Important distinction:</strong>
            <span>Select the request type that matches the intended use on the FDOR form.</span>
          </div>
          <a
            className="btn btn-gold"
            href={clearanceRequestUrl}
            target="_blank"
            rel="noreferrer"
          >
            Request Clearance Letter Online ↗
          </a>
        </article>
      </section>

      <section className="fdor-process page-shell" aria-labelledby="fdor-process-heading">
        <div className="fdor-process-copy">
          <span>Alcoholic-beverage applications</span>
          <h2 id="fdor-process-heading">Obtain FDOR approval for the license application</h2>
          <p>
            FDOR states that an alcoholic-beverage license applicant must first be registered for
            sales and use tax. Registered applicants with a business partner number and sales-tax
            certificate number may send FDOR a completed and signed license application for review.
          </p>
          <a
            className="btn btn-outline"
            href="https://floridarevenue.com/taxes/compliance/Pages/ablicenseapproval.aspx"
            target="_blank"
            rel="noreferrer"
          >
            Read Official Beverage-Approval Instructions ↗
          </a>
        </div>
        <div className="fdor-process-steps">
          <div>
            <b>1</b>
            <span>Register for Florida sales and use tax when required.</span>
          </div>
          <div>
            <b>2</b>
            <span>Complete and sign the applicable alcoholic-beverage license application.</span>
          </div>
          <div>
            <b>3</b>
            <span>Follow FDOR’s current submission and local-service-center instructions.</span>
          </div>
        </div>
      </section>

      <section className="fdor-hardcopy page-shell" aria-labelledby="fdor-hardcopy-heading">
        <div>
          <span>Hardcopy clearance requests</span>
          <h2 id="fdor-hardcopy-heading">Information FDOR says to include</h2>
          <p>
            If the online request is not used, FDOR’s published instructions say the signed request
            should include the requester’s contact information and readable identification,
            business information and tax-identification number, and DR-835 when a qualified
            representative is making the request.
          </p>
        </div>
        <div className="fdor-mailing-card">
          <strong>Florida Department of Revenue</strong>
          <span>PO Box 8045</span>
          <span>Tallahassee, Florida 32314-8045</span>
          <span className="fdor-contact-line">
            <b>Taxpayer Assistance:</b>
            <a href="tel:+18504886800">850-488-6800</a>
          </span>
          <small>Tax-clearance request fax: 850-922-5254</small>
          <a
            href="https://floridarevenue.com/taxes/compliance/Pages/tax_clearance.aspx"
            target="_blank"
            rel="noreferrer"
          >
            Verify current instructions with FDOR ↗
          </a>
        </div>
      </section>

      <section className="fdor-disclosure page-shell" aria-label="FDOR resources disclaimer">
        <strong>Important tax-clearance disclosure</strong>
        <p>
          Florida Liquor License Market is not the Florida Department of Revenue and does not
          provide tax or legal advice. FLLM links to official state resources for convenience.
          Requirements depend on the transaction, taxpayer, application type, and current agency
          procedures. A Tax Clearance Letter or Certificate of Compliance does not replace FDOR
          approval of an alcoholic-beverage license application, the applicable ABT application, or
          professional review. Confirm the current form, submission method, and required supporting
          documents directly with FDOR before filing.
        </p>
        <small>Official resource links reviewed September 2, 2026.</small>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="/">Return to Florida Liquor License Market</a>
        </div>
      </footer>
    </main>
  );
}

