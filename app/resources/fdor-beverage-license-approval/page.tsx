import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";
import "../florida-department-of-revenue/florida-department-of-revenue.css";

export const metadata: Metadata = {
  title: "Florida FDOR Alcoholic-Beverage License Approval Guide | FLLM",
  description: "FLLM guide to the Florida Department of Revenue approval step for alcoholic-beverage license applications, including sales-tax registration, application review, and how the FDOR step fits with DBPR/ABT transfer work.",
};

export default function FdorBeverageApprovalPage() {
  return <main className="fdor-page">
    <div className="abt-header-wrap"><FormsSiteHeader /></div>
    <section className="fdor-hero"><div className="page-shell">
      <nav className="fdor-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/resources/florida-department-of-revenue">FDOR Resources</Link><span>›</span><b>Beverage License Approval</b></nav>
      <span className="fdor-eyebrow">FLLM application guide</span>
      <h1>FDOR Approval for a Florida Alcoholic-Beverage License Application</h1>
      <p>Understand the Florida Department of Revenue step that sits alongside a DBPR/ABT liquor-license application, including sales-tax registration, account information, application review, and the distinction between FDOR approval and ABT transfer approval.</p>
      <div className="fdor-hero-actions"><a className="btn btn-gold" href="#process">View the Process</a><Link className="btn btn-outline" href="/resources/florida-department-of-revenue">Back to FDOR Hub</Link></div>
    </div></section>
    <section id="process" className="fdor-intro page-shell" style={{scrollMarginTop:"120px"}}>
      <div><span>Separate regulatory step</span><h2>FDOR approval and DBPR/ABT approval are not the same thing</h2></div>
      <p>FDOR addresses Florida tax registration and account standing. DBPR/ABT handles the alcoholic-beverage license application itself. A liquor-license transaction may require both workstreams before the transfer, ownership change, or new location can be completed.</p>
    </section>
    <section className="fdor-process page-shell">
      <div className="fdor-process-copy"><span>Typical sequence</span><h2>How the FDOR step fits into the application</h2><p>Applicants generally need to be properly registered for Florida sales and use tax when required. The application package can then be reviewed for FDOR approval before the alcoholic-beverage application is completed through DBPR/ABT.</p></div>
      <div className="fdor-process-steps">
        <div><b>1</b><span>Confirm Florida sales-and-use-tax registration and account information.</span></div>
        <div><b>2</b><span>Complete the applicable alcoholic-beverage application accurately and consistently.</span></div>
        <div><b>3</b><span>Obtain the required FDOR review or approval for the application package.</span></div>
        <div><b>4</b><span>Continue the DBPR/ABT transfer, ownership, or location process separately.</span></div>
      </div>
    </section>
    <section className="fdor-resource-grid page-shell">
      <article className="fdor-resource-card fdor-card-featured"><div className="fdor-card-label"><span>Consistency</span><small>Application file</small></div><h2>Keep the records aligned</h2><p>Business name, taxpayer information, ownership, address, and application details should be reviewed for consistency across tax and beverage-license records.</p><ul><li>Check legal entity name and FEIN.</li><li>Confirm business address and location information.</li><li>Make sure ownership and responsible-party information match the transaction documents.</li></ul></article>
      <article className="fdor-resource-card"><div className="fdor-card-label"><span>Closing</span><small>Transaction timing</small></div><h2>Do not treat FDOR approval as the closing itself</h2><p>FDOR approval does not replace transfer documents, escrow conditions, lender requirements, or final DBPR/ABT approval.</p></article>
      <article className="fdor-resource-card"><div className="fdor-card-label"><span>Diligence</span><small>Tax standing</small></div><h2>Review open tax issues early</h2><p>Unresolved tax liabilities can affect closing timing, clearance requests, payoff or escrow requirements, and lender underwriting.</p></article>
    </section>
    <section className="fdor-disclosure page-shell"><strong>FLLM educational resource</strong><p>Florida Liquor License Market is not FDOR or DBPR/ABT and does not provide legal or tax advice. Confirm the current agency requirements for the specific application before filing.</p></section>
  </main>;
}
