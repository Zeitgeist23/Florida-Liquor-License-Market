import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";
import "../florida-department-of-revenue/florida-department-of-revenue.css";

export const metadata: Metadata = {
  title: "Florida FDOR Tax Clearance Letter Guide | FLLM",
  description: "FLLM guide to Florida Department of Revenue Tax Clearance Letters, including account-standing use, lender diligence, liquor-license acquisition and refinance transactions, and closing considerations.",
};

export default function FdorTaxClearanceLetterPage() {
  return <main className="fdor-page">
    <div className="abt-header-wrap"><FormsSiteHeader /></div>
    <section className="fdor-hero"><div className="page-shell">
      <nav className="fdor-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/resources/florida-department-of-revenue">FDOR Resources</Link><span>›</span><b>Tax Clearance Letter</b></nav>
      <span className="fdor-eyebrow">FLLM tax-status guide</span>
      <h1>Florida FDOR Tax Clearance Letter</h1>
      <p>Learn how a Florida Department of Revenue Tax Clearance Letter fits into liquor-license acquisitions, refinances, lender underwriting, and closing diligence.</p>
      <div className="fdor-hero-actions"><a className="btn btn-gold" href="#uses">How It Is Used</a><Link className="btn btn-outline" href="/resources/florida-department-of-revenue">Back to FDOR Hub</Link></div>
    </div></section>
    <section id="uses" className="fdor-intro page-shell" style={{scrollMarginTop:"120px"}}>
      <div><span>Account-status document</span><h2>Why a clearance letter may be requested</h2></div>
      <p>A Tax Clearance Letter reports current FDOR account status. In a liquor-license purchase or refinance, a private lender, commercial bank, attorney, or closing professional may request it as part of underwriting and closing diligence.</p>
    </section>
    <section className="fdor-resource-grid page-shell">
      <article className="fdor-resource-card fdor-card-featured"><div className="fdor-card-label"><span>Acquisition</span><small>Buyer and lender file</small></div><h2>Purchase transactions</h2><ul><li>Helps document current Florida tax standing.</li><li>Can support lender underwriting and closing conditions.</li><li>May be reviewed with a Certificate of Compliance when the transaction calls for both.</li></ul></article>
      <article className="fdor-resource-card"><div className="fdor-card-label"><span>Refinance</span><small>Collateral diligence</small></div><h2>Liquor-license refinance</h2><p>When a 4COP Quota or 3PS license is being refinanced, a lender may want current tax-status evidence before relying on the license as collateral.</p></article>
      <article className="fdor-resource-card"><div className="fdor-card-label"><span>Limits</span><small>Point in time</small></div><h2>It does not end future exposure</h2><p>A clearance letter is not a guarantee against a later audit of prior reporting periods and does not replace DBPR/ABT transfer, location, or ownership approvals.</p></article>
    </section>
    <section className="fdor-disclosure page-shell"><strong>FLLM educational resource</strong><p>Florida Liquor License Market is not FDOR and does not provide tax or legal advice. Confirm current requirements for the transaction and taxpayer before relying on any document.</p></section>
  </main>;
}
