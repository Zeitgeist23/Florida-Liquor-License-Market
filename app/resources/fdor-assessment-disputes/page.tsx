import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";
import "../florida-department-of-revenue/florida-department-of-revenue.css";

const suttonProfile = "https://www.floridasalestax.com/staff-profiles/james-h-sutton-jr-cpa-esq-/";
const suttonPhoto = "https://www.floridasalestax.com/cms/thumbnails/34/415x415/images/James-Sutton-Low-Res.1402260810550.jpg";

export const metadata: Metadata = {
  title: "Florida DOR Assessment Disputes: Informal Protest vs. DOAH | FLLM",
  description:
    "FLLM guide to Florida Department of Revenue assessment disputes, including informal protest, formal administrative proceedings, DOAH, deadlines, records, and liquor-license transaction implications.",
};

export default function FdorAssessmentDisputesPage() {
  return (
    <main className="fdor-page">
      <div className="abt-header-wrap"><FormsSiteHeader /></div>

      <section className="fdor-hero">
        <div className="page-shell">
          <nav className="fdor-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/resources/florida-department-of-revenue">FDOR Resources</Link><span>›</span>
            <b>Assessment Disputes</b>
          </nav>
          <span className="fdor-eyebrow">FLLM Florida tax dispute guide</span>
          <h1>Don&apos;t Fight the DOR Without Knowing Which Track to Take</h1>
          <p>
            Florida tax disputes can follow more than one procedural path. This FLLM guide explains
            the difference between an informal protest with the Florida Department of Revenue and a
            formal administrative challenge that may proceed through the Division of Administrative Hearings.
          </p>
          <div className="fdor-hero-actions">
            <a className="btn btn-gold" href="#informal-protest">The Informal Protest</a>
            <a className="btn btn-outline" href="#formal-appeal">The Formal Appeal</a>
            <a className="btn btn-outline" href="#tax-counsel-profile">Tax Counsel Profile</a>
            <Link className="btn btn-outline" href="/resources/florida-department-of-revenue">Back to FDOR Hub</Link>
          </div>
        </div>
      </section>

      <section className="fdor-intro page-shell">
        <div>
          <span>Two different tracks</span>
          <h2>Choose the process that fits the assessment, deadline, and issues</h2>
        </div>
        <p>
          A proposed Florida tax assessment is not the same thing as a final, unchangeable outcome.
          The available procedure depends on the notice, tax type, factual dispute, legal issue, and
          timing. An informal protest may resolve the matter without formal litigation, while a formal
          administrative challenge provides a structured record and evidentiary process when the dispute requires it.
        </p>
      </section>

      <section id="informal-protest" className="fdor-process page-shell" style={{scrollMarginTop:"120px"}}>
        <div className="fdor-process-copy">
          <span>Track One</span>
          <h2>The Informal Protest</h2>
          <p>
            An informal protest asks FDOR to reconsider a proposed assessment before the dispute moves
            into a formal administrative proceeding. This is often the first opportunity to correct
            factual mistakes, challenge computations, explain classification issues, and present records
            that may not have been fully considered during the audit.
          </p>
          <p>
            The strength of the protest usually comes from the record. Organize the assessment by issue,
            identify the exact dollars in dispute, attach supporting documentation, and explain why the
            agency&apos;s treatment should be changed. A well-prepared protest can narrow the case even if it
            does not fully resolve it.
          </p>
        </div>
        <div className="fdor-process-steps">
          <div><b>1</b><span>Read the proposed assessment and deadline immediately.</span></div>
          <div><b>2</b><span>Separate factual, computational, classification, and legal issues.</span></div>
          <div><b>3</b><span>Support each disputed item with records and a clear explanation.</span></div>
          <div><b>4</b><span>Preserve proof of filing, correspondence, workpapers, and agency responses.</span></div>
        </div>
      </section>

      <section id="formal-appeal" className="fdor-hardcopy page-shell" style={{scrollMarginTop:"120px"}}>
        <div className="fdor-hardcopy-copy">
          <span>Track Two</span>
          <h2>The Formal Appeal: Division of Administrative Hearings</h2>
          <p>
            When the stakes are higher, the facts remain contested, or the dispute turns on significant
            legal questions, a formal administrative proceeding may be appropriate. Depending on the
            case posture, the process can involve a petition, agency counsel, discovery, settlement
            discussions, presentation of evidence, and a hearing before an administrative law judge.
          </p>
          <div className="fdor-clean-title-guide">
            <article>
              <span>Formal record</span>
              <h3>Evidence matters</h3>
              <p>
                Formal proceedings are governed by procedural requirements. Documents, witnesses,
                preservation of objections, and a clear evidentiary record can become central to the outcome.
              </p>
            </article>
            <article>
              <span>Settlement and hearing</span>
              <h3>Not every formal case goes to trial</h3>
              <p>
                Formal filing does not eliminate the possibility of settlement. Many disputes are narrowed
                or resolved before a full evidentiary hearing, but the formal process creates a structured path
                if agreement cannot be reached.
              </p>
            </article>
          </div>
        </div>
        <div className="fdor-mailing-card">
          <strong>Deadline warning</strong>
          <span>
            Assessment notices may contain short, legally significant response periods. Confirm the
            deadline from the notice itself and current Florida law. Do not assume that requesting an
            informal conference automatically preserves every formal remedy.
          </span>
          <small>Educational overview only; not legal or tax advice.</small>
        </div>
      </section>

      <section id="tax-counsel-profile" className="page-shell" style={{scrollMarginTop:"120px", paddingTop:"34px", paddingBottom:"38px"}}>
        <div style={{display:"grid", gridTemplateColumns:"minmax(220px,320px) minmax(0,1fr)", gap:"34px", alignItems:"stretch", border:"1px solid #334b5d", borderRadius:"10px", overflow:"hidden", background:"linear-gradient(145deg,#0a2033,#050f19)", boxShadow:"0 20px 48px rgba(0,0,0,.24)"}}>
          <div style={{background:"#eef1f4", minHeight:"320px"}}>
            <img src={suttonPhoto} alt="James H. Sutton, Jr., CPA, Esq." style={{display:"block", width:"100%", height:"100%", minHeight:"320px", objectFit:"cover", objectPosition:"center top"}} />
          </div>
          <div style={{padding:"28px 30px 30px"}}>
            <span style={{display:"block", color:"#f6a700", fontSize:"11px", fontWeight:900, letterSpacing:".12em", textTransform:"uppercase"}}>Florida tax counsel profile</span>
            <h2 style={{margin:"8px 0 4px", color:"#fff", fontFamily:"Georgia, 'Times New Roman', serif", fontSize:"clamp(28px,4vw,42px)", lineHeight:1.08}}>James H. Sutton, Jr., CPA, Esq.</h2>
            <strong style={{display:"block", color:"#f6a700", fontSize:"14px", marginBottom:"16px"}}>Shareholder · Law Offices of Moffa, Sutton &amp; Donnini, P.A.</strong>
            <p style={{margin:"0 0 14px", color:"#c8d2d9", fontSize:"14px", lineHeight:1.75}}>
              Mr. Sutton is a Florida State and Local Tax attorney and CPA whose published practice focuses heavily on Florida sales-and-use-tax controversy. His firm profile states that he has more than 30 years of professional tax experience and represents businesses and individuals in disputes involving the Florida Department of Revenue.
            </p>
            <p style={{margin:"0 0 18px", color:"#c8d2d9", fontSize:"14px", lineHeight:1.75}}>
              Published practice areas include audit defense, protests, petitions for reconsideration, Division of Administrative Hearings litigation, circuit-court litigation, collections, registration denials, voluntary disclosure, refunds, and related Florida sales-tax matters.
            </p>
            <div style={{display:"flex", flexWrap:"wrap", gap:"10px", marginBottom:"14px"}} data-nosnippet="">
              <a className="btn btn-gold" href="tel:+18137752131">Call 813-775-2131</a>
              <a className="btn btn-outline" href={suttonProfile} target="_blank" rel="noreferrer">View Firm Profile ↗</a>
              <Link className="btn btn-outline" href="/resources/liquor-license-attorneys">FLLM Lawyer Directory</Link>
            </div>
            <small style={{display:"block", color:"#8fa0ac", lineHeight:1.6}}>
              Profile information and portrait are drawn from the attorney&apos;s public firm profile. Inclusion is informational only and is not an FLLM endorsement or referral.
            </small>
          </div>
        </div>
      </section>

      <section className="fdor-process page-shell">
        <div className="fdor-process-copy">
          <span>Liquor-license transactions</span>
          <h2>Why an FDOR dispute can affect a 4COP or 3PS transaction</h2>
          <p>
            An unresolved assessment can affect tax-clearance diligence, successor-liability analysis,
            escrow requirements, lender underwriting, payoff conditions, and closing timing. The tax dispute
            and the liquor-license transaction are related workstreams, but resolving one does not automatically
            resolve the other.
          </p>
        </div>
        <div className="fdor-process-steps">
          <div><b>A</b><span>Review current FDOR account standing and open assessments.</span></div>
          <div><b>B</b><span>Coordinate clearance, payoff, escrow, or release requirements with closing.</span></div>
          <div><b>C</b><span>Confirm DBPR/ABT transfer requirements separately.</span></div>
        </div>
      </section>

      <section className="fdor-disclosure page-shell">
        <strong>FLLM educational resource</strong>
        <p>
          Florida Liquor License Market is not the Florida Department of Revenue and does not provide legal
          or tax advice. Procedures vary by tax type, notice, procedural posture, and current law. Review the
          actual assessment notice and obtain qualified professional advice when appropriate.
        </p>
      </section>
    </main>
  );
}
