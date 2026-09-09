import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./florida-department-of-revenue.css";

const suttonProfile = "https://www.floridasalestax.com/staff-profiles/james-h-sutton-jr-cpa-esq-/";
const suttonPhoto = "https://www.floridasalestax.com/cms/thumbnails/34/415x415/images/James-Sutton-Low-Res.1402260810550.jpg";

export const metadata: Metadata = {
  title: "Florida Department of Revenue Forms, Tax Clearance and Disputes | FLLM",
  description:
    "FLLM guides to Florida Department of Revenue DR-835, Certificates of Compliance, Tax Clearance Letters, alcoholic-beverage application approval, and FDOR assessment disputes.",
};

export default function FloridaDepartmentOfRevenueResourcesPage() {
  return (
    <main className="fdor-page">
      <div className="abt-header-wrap"><FormsSiteHeader /></div>

      <section className="fdor-hero">
        <div className="page-shell">
          <nav className="fdor-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><b>Florida Department of Revenue (FDOR)</b>
          </nav>
          <span className="fdor-eyebrow">FLLM Florida tax and transaction resources</span>
          <h1>Florida Department of Revenue Forms, Tax Clearance and Disputes</h1>
          <p>
            Use FLLM&apos;s Florida Department of Revenue resource center to understand DR-835,
            Certificates of Compliance, Tax Clearance Letters, alcoholic-beverage application approval,
            and the two principal tracks for challenging an FDOR assessment—without leaving the FLLM site.
          </p>
          <div className="fdor-hero-actions">
            <a className="btn btn-gold" href="#fdor-forms">Forms and Transaction Guides</a>
            <a className="btn btn-outline" href="#fdor-assessment-disputes">Read Assessment Dispute Article</a>
            <Link className="btn btn-outline" href="/resources/fdor-beverage-license-approval">Beverage Approval Guide</Link>
          </div>
        </div>
      </section>

      <section className="fdor-intro page-shell" aria-labelledby="fdor-intro-heading">
        <div>
          <span>Keep the research inside FLLM</span>
          <h2 id="fdor-intro-heading">Tax clearance, license approval and assessment disputes are separate issues</h2>
        </div>
        <p>
          A liquor-license transaction can involve several distinct FDOR questions. The correct document
          or procedure depends on whether you are authorizing a representative, documenting tax standing,
          obtaining approval for an alcoholic-beverage application, or disputing an assessment. FLLM now
          separates those subjects into dedicated internal guides.
        </p>
      </section>

      <section className="fdor-resource-grid page-shell" id="fdor-forms" aria-label="FDOR forms and FLLM guides">
        <article className="fdor-resource-card fdor-card-featured">
          <div className="fdor-card-label"><span>DR-835</span><small>Power of Attorney</small></div>
          <h2>Power of Attorney and Declaration of Representative</h2>
          <p>
            Use FLLM&apos;s browser-compatible version of Florida Form DR-835 when a taxpayer authorizes
            an attorney, CPA, enrolled agent, or other qualified representative to act before FDOR or
            receive confidential Florida tax information.
          </p>
          <ul>
            <li>Browser-compatible text fields and checkboxes.</li>
            <li>66 interactive fields across the four-page form.</li>
            <li>Can be completed, saved, downloaded, and printed.</li>
          </ul>
          <div className="fdor-card-actions">
            <a className="btn btn-gold" href="/api/fdor/dr835/pdf?v=complete-3" target="_blank" rel="noreferrer">
              Open FLLM Fillable DR-835 ↗
            </a>
          </div>
        </article>

        <article className="fdor-resource-card">
          <div className="fdor-card-label"><span>Seller document</span><small>Business transactions</small></div>
          <h2>Certificate of Compliance</h2>
          <p>
            Learn how the certificate is used in business and liquor-license transactions, what it can
            help establish, what it does not guarantee, and how it fits into buyer and lender diligence.
          </p>
          <Link className="btn btn-gold" href="/resources/fdor-certificate-of-compliance">Read FLLM Certificate Guide</Link>
        </article>

        <article className="fdor-resource-card">
          <div className="fdor-card-label"><span>Account status</span><small>Loans and closings</small></div>
          <h2>Tax Clearance Letter</h2>
          <p>
            Review how a Tax Clearance Letter can be used in acquisition, refinance, lender underwriting,
            and closing diligence involving a 4COP Quota or 3PS license.
          </p>
          <Link className="btn btn-gold" href="/resources/fdor-tax-clearance-letter">Read FLLM Clearance Guide</Link>
        </article>
      </section>

      <section className="fdor-process page-shell" aria-labelledby="fdor-process-heading">
        <div className="fdor-process-copy">
          <span>Alcoholic-beverage applications</span>
          <h2 id="fdor-process-heading">How FDOR approval fits with DBPR/ABT</h2>
          <p>
            FDOR&apos;s tax-registration review is a separate workstream from DBPR/ABT&apos;s alcoholic-beverage
            licensing process. FLLM&apos;s internal guide explains the sequence, the records that should match,
            and how unresolved tax issues can affect transaction timing.
          </p>
          <Link className="btn btn-outline" href="/resources/fdor-beverage-license-approval">Read FLLM Beverage Approval Guide</Link>
        </div>
        <div className="fdor-process-steps">
          <div><b>1</b><span>Confirm Florida tax registration and account information.</span></div>
          <div><b>2</b><span>Keep entity, ownership, address, and application information consistent.</span></div>
          <div><b>3</b><span>Complete the FDOR and DBPR/ABT workstreams as separate approvals.</span></div>
        </div>
      </section>

      <section
        id="fdor-assessment-disputes"
        className="page-shell"
        aria-labelledby="fdor-assessment-disputes-heading"
        style={{ scrollMarginTop: "120px", paddingTop: "58px", paddingBottom: "58px" }}
      >
        <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "34px", border: "1px solid #415b6d", borderTop: "4px solid #f6a700", borderRadius: "8px", background: "#0a1d2c" }}>
          <span className="fdor-eyebrow">FLLM editorial — FDOR assessment disputes</span>
          <h2 id="fdor-assessment-disputes-heading" style={{ margin: "9px 0 14px", color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(31px, 4vw, 46px)", lineHeight: 1.08 }}>
            Don&apos;t Fight the DOR Without Knowing Which Track to Take
          </h2>
          <p style={{ margin: 0, color: "#d5dee4", fontSize: "18px", lineHeight: 1.75 }}>
            Florida gives taxpayers more than one route for challenging an assessment. The first is an
            informal protest directly with the Florida Department of Revenue. The second is the formal
            administrative process, which can ultimately involve the Division of Administrative Hearings.
            Understanding which track fits the notice, deadline, facts, legal issues, and dollar exposure can
            make the difference between a manageable dispute and an unnecessarily expensive one.
          </p>

          <div className="fdor-resource-grid" style={{ marginTop: "30px", paddingBottom: 0 }}>
            <article className="fdor-resource-card">
              <div className="fdor-card-label"><span>Track 1</span><small>FDOR review</small></div>
              <h2>The Informal Protest</h2>
              <p>
                An informal protest asks FDOR to reconsider a proposed assessment before the case moves into
                a formal administrative proceeding. It can be the most efficient place to identify audit
                errors, present missing records, challenge calculations, explain classification issues, and
                narrow the dispute.
              </p>
              <p>
                A strong protest does more than ask for reconsideration. It organizes the assessment by issue,
                identifies the exact amounts in dispute, supports each position with records, and explains why
                the agency&apos;s treatment should be changed. Even when the matter is not fully resolved, this step
                can materially reduce the issues that remain.
              </p>
              <ul>
                <li>Read the proposed assessment and response deadline immediately.</li>
                <li>Separate factual, computational, classification, and legal issues.</li>
                <li>Attach records that directly support each disputed item.</li>
                <li>Keep proof of filing, correspondence, workpapers, and agency responses.</li>
              </ul>
            </article>

            <article className="fdor-resource-card">
              <div className="fdor-card-label"><span>Track 2</span><small>Formal proceeding</small></div>
              <h2>The Formal Appeal: Division of Administrative Hearings</h2>
              <p>
                When the stakes are higher, the facts remain contested, or the dispute turns on significant
                legal questions, the formal administrative track provides a structured process for developing
                the record. Depending on the posture of the case, that can involve a petition, agency counsel,
                discovery, settlement discussions, presentation of evidence, and a hearing before an
                administrative law judge.
              </p>
              <p>
                Formal filing does not mean every case goes to a full hearing. Many disputes can still be
                narrowed or resolved through settlement. But if agreement cannot be reached, the formal process
                provides the evidentiary framework necessary to present the case fully.
              </p>
              <ul>
                <li>Formal proceedings use procedural rules and filing requirements.</li>
                <li>Documents, witnesses, objections, and preservation of the record become more important.</li>
                <li>Do not assume an informal conference automatically preserves every formal remedy.</li>
                <li>Professional representation may be appropriate where exposure or legal complexity is significant.</li>
              </ul>
            </article>
          </div>

          <div className="fdor-use-note" style={{ marginTop: "24px" }}>
            <strong>Deadline warning</strong>
            <span>
              Assessment notices can carry short, legally significant response periods. Confirm the exact
              deadline from the notice itself and current Florida law. Missing a deadline can materially limit
              the available challenge.
            </span>
          </div>

          <h3 style={{ margin: "28px 0 10px", color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "27px" }}>
            Why this matters in a liquor-license transaction
          </h3>
          <p style={{ margin: 0, color: "#d5dee4", fontSize: "17px", lineHeight: 1.75 }}>
            An unresolved FDOR assessment can affect successor-liability review, tax-clearance diligence,
            escrow requirements, lender underwriting, payoff conditions, and closing timing. Buyers, sellers,
            lenders, and closing professionals should treat the tax dispute and the liquor-license transaction
            as related workstreams, while recognizing that resolving one does not automatically resolve the other.
          </p>

          <div className="fdor-hero-actions" style={{ marginTop: "26px" }}>
            <Link className="btn btn-gold" href="/resources/fdor-assessment-disputes">Open the Dedicated FLLM Dispute Guide</Link>
          </div>
        </div>
      </section>

      <section className="fdor-hardcopy page-shell" aria-labelledby="fdor-hardcopy-heading">
        <div className="fdor-hardcopy-copy">
          <span>Transaction diligence</span>
          <h2 id="fdor-hardcopy-heading">Build a clean closing file around the tax records</h2>
          <p>
            When a 4COP Quota or 3PS license is bought, sold, financed, or refinanced, review the relevant
            FDOR records together with DBPR/ABT license status, registered ownership and county, UCC and lien
            searches, payoff or release documents, escrow conditions, and required transfer or location approvals.
          </p>
          <div className="fdor-clean-title-guide">
            <article>
              <span>Seller-side document</span>
              <h3>Certificate of Compliance</h3>
              <p>Use the FLLM guide to understand how the certificate fits into seller good-standing and successor-liability diligence.</p>
              <Link className="fdor-text-link" href="/resources/fdor-certificate-of-compliance">Open Certificate Guide</Link>
            </article>
            <article>
              <span>Account-status document</span>
              <h3>Tax Clearance Letter</h3>
              <p>Use the FLLM guide to understand how a clearance letter can fit into acquisition and refinance underwriting.</p>
              <Link className="fdor-text-link" href="/resources/fdor-tax-clearance-letter">Open Clearance Guide</Link>
            </article>
          </div>
        </div>
        <div style={{display:"grid", gap:"18px", alignContent:"start"}}>
          <div className="fdor-mailing-card">
            <strong>FLLM FDOR Resource Center</strong>
            <span>DR-835 Power of Attorney</span>
            <span>Certificate of Compliance</span>
            <span>Tax Clearance Letter</span>
            <span>Beverage-License Approval</span>
            <span>Assessment Disputes and DOAH</span>
            <small>Use the internal FLLM guides above before leaving the marketplace for filing or professional advice.</small>
          </div>

          <aside style={{border:"1px solid #415b6d", borderTop:"3px solid #f6a700", borderRadius:"8px", overflow:"hidden", background:"#081722"}} aria-label="Florida tax counsel profile">
            <div style={{display:"grid", gridTemplateColumns:"118px minmax(0,1fr)", gap:"16px", alignItems:"stretch"}}>
              <img src={suttonPhoto} alt="James H. Sutton, Jr., CPA, Esq." style={{display:"block", width:"118px", height:"154px", objectFit:"cover", objectPosition:"center top", background:"#eef1f4"}} />
              <div style={{padding:"16px 16px 12px 0"}}>
                <span style={{display:"block", color:"#f6a700", fontSize:"10px", fontWeight:900, letterSpacing:".1em", textTransform:"uppercase"}}>Florida tax controversy counsel</span>
                <h3 style={{margin:"5px 0 3px", color:"#fff", fontFamily:"Georgia, 'Times New Roman', serif", fontSize:"22px", lineHeight:1.08}}>James H. Sutton, Jr., CPA, Esq.</h3>
                <strong style={{display:"block", color:"#f6a700", fontSize:"12px", lineHeight:1.35}}>Law Offices of Moffa, Sutton &amp; Donnini, P.A.</strong>
                <small style={{display:"block", marginTop:"4px", color:"#9dadb8"}}>Tampa · Statewide Florida tax matters</small>
              </div>
            </div>
            <div style={{padding:"14px 16px 16px"}}>
              <p style={{margin:"0 0 12px", color:"#c8d2d9", fontSize:"13px", lineHeight:1.6}}>
                Mr. Sutton is a Florida State and Local Tax attorney and CPA whose published practice focuses heavily on Florida sales-and-use-tax controversy, including FDOR audits, protests, petitions for reconsideration, administrative hearings, collections, refunds, and related disputes.
              </p>
              <div style={{display:"flex", flexWrap:"wrap", gap:"8px"}} data-nosnippet="">
                <a className="btn btn-gold" href="tel:+18137752131">Call 813-775-2131</a>
                <a className="btn btn-outline" href={suttonProfile} target="_blank" rel="noreferrer">View Attorney Profile ↗</a>
                <Link className="btn btn-outline" href="/resources/liquor-license-attorneys">Lawyer Directory</Link>
              </div>
              <small style={{display:"block", marginTop:"10px", color:"#7f929f", lineHeight:1.45}}>Profile information is drawn from the attorney&apos;s public firm profile. Inclusion is informational only and is not an endorsement or referral.</small>
            </div>
          </aside>
        </div>
      </section>

      <section className="fdor-disclosure page-shell" aria-label="FDOR resources disclaimer">
        <strong>Important FDOR resource disclosure</strong>
        <p>
          Florida Liquor License Market is not the Florida Department of Revenue and does not provide tax or
          legal advice. FLLM&apos;s pages are educational transaction resources designed to explain the issues in
          plain language and keep the research workflow inside FLLM. Filing requirements depend on the taxpayer,
          transaction, notice, application type, and current agency procedures. Confirm current requirements before filing.
        </p>
        <small>FLLM resource architecture updated September 9, 2026.</small>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida&apos;s marketplace for buying, selling and financing liquor licenses.</span>
          <Link href="/">Return to Florida Liquor License Market</Link>
        </div>
      </footer>
    </main>
  );
}
