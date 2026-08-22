import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "@/app/resources/forms/abt-forms.css";

const originalSource = "https://www.jimersonfirm.com/services/administrative-law-licensing/alcoholic-beverage-and-tobacco-licenses/";

export const metadata: Metadata = {
  title: "Alcoholic Beverage and Tobacco Licenses Overview | FLLM",
  description:
    "FLLM summary of Jimerson Birr's published overview of Florida alcoholic-beverage and tobacco licensing, DBPR procedures, renewal requirements, discipline, and appeals.",
};

export default function AlcoholicBeverageLicensesOverviewPage() {
  return (
    <main className="attorney-resource-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="attorney-resource-hero">
        <div className="page-shell attorney-resource-shell">
          <nav className="attorney-resource-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span>›</span>
            <a href="/resources/liquor-license-attorneys">Liquor License Attorneys</a><span>›</span>
            <b>Published Resource</b>
          </nav>
          <span className="attorney-resource-eyebrow">FLLM attorney resource reader</span>
          <h1>Alcoholic Beverage and Tobacco Licenses Overview</h1>
          <p>
            A Florida-focused summary of the published Jimerson Birr resource covering DBPR licensing, alcoholic-beverage license categories, renewal obligations, disciplinary matters, and administrative review.
          </p>
        </div>
      </section>

      <article className="page-shell attorney-resource-shell attorney-resource-body">
        <aside className="attorney-resource-source-card">
          <div>
            <span>Original publisher</span>
            <strong>Jimerson Birr, P.A.</strong>
            <p>This FLLM page summarizes the firm&apos;s published resource and keeps the main reading experience inside FLLM. It does not reproduce the full article.</p>
          </div>
          <a href={originalSource} target="_blank" rel="noopener noreferrer">View Original Firm Resource ↗</a>
        </aside>

        <section>
          <h2>Florida licensing framework</h2>
          <p>
            The Jimerson Birr overview explains that Florida professional and occupational licensing is administered through state agencies including the Department of Business and Professional Regulation. For alcoholic beverages and tobacco, the relevant regulatory framework includes Florida Beverage Law and rules administered through the Division of Alcoholic Beverages and Tobacco.
          </p>
          <p>
            The resource distinguishes common alcoholic-beverage licensing categories such as vendors, distributors, and manufacturers. Retail vendors sell to consumers, distributors operate at the wholesale level, and manufacturers produce alcoholic beverages subject to the applicable state licensing structure.
          </p>
        </section>

        <section>
          <h2>Applications, renewals, and continuing compliance</h2>
          <p>
            The published overview describes DBPR&apos;s application-review process and emphasizes that renewal deadlines matter. It also lists licensing considerations that can vary by license type, including fees, good-moral-character requirements, and criminal-history restrictions for certain alcoholic-beverage licenses.
          </p>
          <p>
            For buyers, sellers, and lenders, the practical point is that a license&apos;s current status should be verified directly with DBPR and ABT before a transaction closes. A marketable license interest and regulatory authority to operate should be reviewed as separate due-diligence questions.
          </p>
        </section>

        <section>
          <h2>Discipline and adverse licensing decisions</h2>
          <p>
            The Jimerson Birr resource also discusses conduct that can lead to disciplinary action and explains that adverse DBPR licensing decisions can be challenged through Florida&apos;s administrative process. Depending on the matter, that can involve an administrative hearing, a recommended order, a final agency order, and judicial review.
          </p>
          <p>
            Transaction participants should identify pending enforcement or administrative matters early because they can affect timing, transferability, financing, and closing conditions even before a final order is entered.
          </p>
        </section>

        <section className="attorney-resource-takeaway">
          <span>FLLM transaction takeaway</span>
          <h2>Use published legal resources as context, not as a substitute for transaction-specific advice</h2>
          <p>
            The firm resource is useful background for understanding Florida&apos;s licensing system. For an actual purchase, sale, financing, renewal, enforcement matter, or appeal, users should confirm current agency requirements and consult qualified counsel about the specific facts.
          </p>
        </section>

        <div className="attorney-resource-actions">
          <a href="/resources/liquor-license-attorneys">← Back to Attorney Directory</a>
          <a href={originalSource} target="_blank" rel="noopener noreferrer">Original Jimerson Birr Resource ↗</a>
        </div>
      </article>

      <style>{`
        .attorney-resource-page{min-height:100vh;background:#fff;color:#0b1725}
        .attorney-resource-page .abt-header-wrap{background:#020b12;border-bottom:1px solid rgba(246,167,0,.55)}
        .attorney-resource-shell{max-width:1120px}
        .attorney-resource-hero{padding:46px 0 54px;background:radial-gradient(circle at 88% 16%,rgba(246,167,0,.12),transparent 28%),linear-gradient(135deg,#061728 0%,#03111e 68%,#020b13 100%);color:#fff}
        .attorney-resource-breadcrumbs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;color:rgba(255,255,255,.68);font-size:12px}
        .attorney-resource-breadcrumbs a{color:#fff}.attorney-resource-breadcrumbs b{color:#f6a700}
        .attorney-resource-eyebrow{display:block;color:#f6a700;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .attorney-resource-hero h1{max-width:980px;margin:10px 0 14px;font:700 clamp(38px,5vw,62px)/1.02 Georgia,"Times New Roman",serif;letter-spacing:-.035em}
        .attorney-resource-hero p{max-width:900px;margin:0;color:rgba(255,255,255,.8);font-size:18px;line-height:1.7}
        .attorney-resource-body{padding-top:46px;padding-bottom:70px}
        .attorney-resource-body>section,.attorney-resource-source-card,.attorney-resource-actions{max-width:920px;margin-left:auto;margin-right:auto}
        .attorney-resource-source-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;margin-bottom:36px;padding:22px 24px;border:1px solid #d8d1c4;border-left:4px solid #f6a700;border-radius:8px;background:#f8f5ee}
        .attorney-resource-source-card span,.attorney-resource-takeaway>span{display:block;color:#8b6000;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .attorney-resource-source-card strong{display:block;margin-top:5px;font-size:22px}.attorney-resource-source-card p{margin:7px 0 0;color:#5d6873;font-size:14px;line-height:1.6}
        .attorney-resource-source-card a{display:inline-flex;min-height:44px;align-items:center;padding:0 16px;border:1px solid #f6a700;border-radius:5px;background:#f6a700;color:#061728;font-size:12px;font-weight:900;text-decoration:none}
        .attorney-resource-body section{margin-top:36px}.attorney-resource-body section h2{margin:0 0 14px;font-size:34px;line-height:1.12;letter-spacing:-.025em}.attorney-resource-body section p{margin:0 0 16px;color:#53606c;font-size:17.5px;line-height:1.78}
        .attorney-resource-takeaway{padding:24px 26px;border-left:4px solid #f6a700;background:#f5f2ea}.attorney-resource-takeaway h2{margin-top:7px!important}
        .attorney-resource-actions{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;margin-top:38px;padding-top:22px;border-top:1px solid #dde2e6}.attorney-resource-actions a{color:#765300;font-size:13px;font-weight:900;text-decoration:none}
        @media(max-width:720px){.attorney-resource-source-card{grid-template-columns:1fr}.attorney-resource-source-card a{justify-content:center}.attorney-resource-hero p{font-size:17px}.attorney-resource-body section p{font-size:16.5px}.attorney-resource-body section h2{font-size:29px}}
      `}</style>
    </main>
  );
}
