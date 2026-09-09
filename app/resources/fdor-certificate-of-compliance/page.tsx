import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";
import "../florida-department-of-revenue/florida-department-of-revenue.css";

export const metadata: Metadata = {
  title: "Florida FDOR Certificate of Compliance Guide | FLLM",
  description: "FLLM guide to Florida Department of Revenue Certificates of Compliance for business and liquor-license transactions, including what they show, what they do not show, and how they fit into closing diligence.",
};

export default function FdorCertificateOfCompliancePage() {
  return <main className="fdor-page">
    <div className="abt-header-wrap"><FormsSiteHeader /></div>
    <section className="fdor-hero"><div className="page-shell">
      <nav className="fdor-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/resources/florida-department-of-revenue">FDOR Resources</Link><span>›</span><b>Certificate of Compliance</b></nav>
      <span className="fdor-eyebrow">FLLM transaction guide</span>
      <h1>Florida FDOR Certificate of Compliance</h1>
      <p>Understand what a Florida Department of Revenue Certificate of Compliance is, why it is requested in a business or liquor-license transaction, and how buyers, sellers, lenders, and closing professionals use it during diligence.</p>
      <div className="fdor-hero-actions"><a className="btn btn-gold" href="#how-it-works">How It Works</a><Link className="btn btn-outline" href="/resources/florida-department-of-revenue">Back to FDOR Hub</Link></div>
    </div></section>
    <section id="how-it-works" className="fdor-intro page-shell" style={{scrollMarginTop:"120px"}}>
      <div><span>Seller-side diligence</span><h2>What the certificate is used for</h2></div>
      <p>A seller may request a Certificate of Compliance to provide a current point-in-time statement concerning the account. In a liquor-license or business transaction, it can help the buyer and lender evaluate unresolved Florida tax exposure before closing.</p>
    </section>
    <section className="fdor-resource-grid page-shell">
      <article className="fdor-resource-card fdor-card-featured"><div className="fdor-card-label"><span>Purpose</span><small>Transaction diligence</small></div><h2>What it can help establish</h2><ul><li>Current account standing at the time the certificate is issued.</li><li>Whether additional tax diligence, payoff, or escrow protection may be appropriate.</li><li>A cleaner closing file for buyers, lenders, attorneys, and escrow agents.</li></ul></article>
      <article className="fdor-resource-card"><div className="fdor-card-label"><span>Limits</span><small>Not title insurance</small></div><h2>What it does not guarantee</h2><p>A Certificate of Compliance is not title insurance, does not eliminate every possible tax issue, and does not replace DBPR/ABT approval of a liquor-license transfer.</p></article>
      <article className="fdor-resource-card"><div className="fdor-card-label"><span>Closing</span><small>Best practice</small></div><h2>Use it with the rest of the file</h2><p>Review it together with DBPR/ABT license status, ownership records, UCC and lien searches, payoff or release documents, escrow instructions, and any lender-specific closing conditions.</p></article>
    </section>
    <section className="fdor-disclosure page-shell"><strong>FLLM educational resource</strong><p>Florida Liquor License Market is not FDOR and does not provide tax or legal advice. Requirements vary by transaction and current agency procedure.</p></section>
  </main>;
}
