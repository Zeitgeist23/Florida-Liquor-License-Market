import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import InteractiveLawCards from "@/components/InteractiveLawCards";
import "../forms/abt-forms.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/florida-liquor-license-laws`;

export const metadata: Metadata = {
  title: "Florida Liquor License Laws | Quota Statutes & ABT Rules | FLLM",
  description:
    "Florida quota liquor license laws cited by FLLM, including quota limits, transfers, applications, local ordinances, package-store restrictions, and ABT administrative rules.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const statutes = [
  {
    citation: "F.S. § 561.20",
    title: "Limitation upon number of licenses issued",
    summary:
      "The core quota-license statute. It generally limits licenses under section 565.02(1)(a)-(f) to one for each 7,500 county residents and governs population-based creation of additional quota licenses.",
    href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.20.html",
  },
  {
    citation: "F.S. § 561.32",
    title: "Transfer of licenses; change of officers or directors; transfer of interest",
    summary:
      "Governs transfers of alcoholic-beverage licenses and changes in ownership or financial interests, and includes transfer-fee provisions used in quota-license transactions.",
    href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.32.html",
  },
  {
    citation: "F.S. § 561.17",
    title: "License and registration applications; approved person",
    summary:
      "Contains core application requirements, including applicant and ownership disclosures and premises-related requirements used by the Division of Alcoholic Beverages and Tobacco.",
    href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.17.html",
  },
  {
    citation: "F.S. § 562.45",
    title: "Beverage Law penalties and local ordinances",
    summary:
      "Addresses Beverage Law enforcement and local ordinances. FLLM cites it when discussing local regulation and location issues affecting alcoholic-beverage premises.",
    href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0562/Sections/0562.45.html",
  },
  {
    citation: "F.S. § 565.04",
    title: "Package store restrictions",
    summary:
      "Sets statutory restrictions for package-store premises and merchandise and is relevant to 3PS-family liquor-store operations.",
    href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0565/Sections/0565.04.html",
  },
];

const abtRules = [
  {
    citation: "F.A.C. Rule 61A-5.010",
    title: "Applications; Transfer Fee",
    summary:
      "Administrative rule addressing alcoholic-beverage license applications and transfer-fee procedures.",
    href: "https://flrules.org/gateway/ruleno.asp?id=61A-5.010",
  },
  {
    citation: "F.A.C. Rule 61A-5.0105",
    title: "Selection of Applicants for Quota Alcoholic Beverage Licenses by Public Drawing",
    summary:
      "Administrative rule governing the public drawing process for newly available quota alcoholic-beverage licenses.",
    href: "https://flrules.org/gateway/ruleno.asp?id=61A-5.0105",
  },
];

const officialSources = [
  {
    citation: "Official Division Index",
    title: "DBPR / ABT Statutes & Rules",
    summary: "Official Division statutes and rules index.",
    href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/statutes-and-rules/",
  },
  {
    citation: "Florida Administrative Code",
    title: "Division 61A",
    summary: "Browse ABT administrative rule chapters.",
    href: "https://flrules.org/gateway/organization.asp?divid=247",
  },
  {
    citation: "Florida Statutes",
    title: "Chapter 561 — Beverage Law: Administration",
    summary: "Open the full official chapter.",
    href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/0561.html",
  },
];

const styles = `
  .laws-page{min-height:100vh;background:#06131e;color:#eef4f7}
  .laws-page .abt-header-wrap{background:#020b12;border-bottom-color:rgba(246,167,0,.58)}
  .laws-hero{padding:58px 0 62px;border-bottom:1px solid rgba(246,167,0,.4);background:linear-gradient(120deg,#0b2b43,#04131f 65%,#020a10)}
  .laws-breadcrumbs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;color:#91a2af;font-size:10px;text-transform:uppercase}
  .laws-breadcrumbs strong,.laws-breadcrumbs a:hover{color:#f6a700}
  .laws-eyebrow{display:block;color:#f6a700;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
  .laws-hero h1{max-width:900px;margin:10px 0 16px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(46px,6vw,76px);line-height:1}
  .laws-hero p{max-width:850px;margin:0;color:#c8d6dd;font-size:16px;line-height:1.72}
  .laws-section{padding:60px 0}
  .laws-section.alt{border-top:1px solid #233c4e;border-bottom:1px solid #233c4e;background:#04101a}
  .laws-heading{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,470px);gap:38px;align-items:end;margin-bottom:26px}
  .laws-heading span{display:block;color:#f6a700;font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
  .laws-heading h2{margin:8px 0 0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(28px,4vw,42px)}
  .laws-heading p{margin:0;color:#aebfc9;font-size:13px;line-height:1.65}
  .laws-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
  .law-card{display:flex;flex-direction:column;min-height:245px;padding:22px;border:1px solid #38566a;border-top:3px solid #f6a700;border-radius:8px;background:linear-gradient(145deg,#0a2639,#04131f)}
  .law-card-button{width:100%;appearance:none;text-align:left;color:inherit;font:inherit;cursor:pointer;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease}
  .law-card-button:hover{transform:translateY(-4px);border-color:#f6a700;background:linear-gradient(145deg,#0c3048,#051923);box-shadow:0 16px 34px rgba(0,0,0,.34),0 0 0 1px rgba(246,167,0,.18)}
  .law-card-button:focus-visible{outline:3px solid #f6a700;outline-offset:3px}
  .law-card b{color:#f6a700;font-size:12px;letter-spacing:.04em}
  .law-card h3{margin:12px 0 9px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.18}
  .law-card p{margin:0;color:#b9c9d2;font-size:13px;line-height:1.65}
  .law-card-action{margin-top:auto;padding-top:18px;color:#f6a700;font-size:11px;font-weight:900;text-transform:uppercase}
  .official-source-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
  .official-source-card{display:flex;flex-direction:column;min-height:142px;padding:18px;border:1px solid #36566a;border-radius:7px;background:#071a27;color:inherit;appearance:none;text-align:left;font:inherit;cursor:pointer;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease}
  .official-source-card:hover{transform:translateY(-4px);border-color:#f6a700;background:linear-gradient(145deg,#0b2b40,#071a27);box-shadow:0 14px 30px rgba(0,0,0,.32),0 0 0 1px rgba(246,167,0,.16)}
  .official-source-card:focus-visible{outline:3px solid #f6a700;outline-offset:3px}
  .official-source-card b{color:#f6a700;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
  .official-source-card h3{margin:6px 0 7px;color:#fff;font-size:16px;line-height:1.18}
  .official-source-card p{margin:0;color:#9fb2bd;font-size:11px;line-height:1.5}
  .official-source-action{margin-top:auto;padding-top:12px;color:#f6a700;font-size:10px;font-weight:900;text-transform:uppercase}
  .laws-notice{margin:0 auto 64px;padding:22px 24px;border-left:4px solid #f6a700;background:rgba(246,167,0,.055)}
  .laws-notice strong{color:#f6a700;font-size:12px;text-transform:uppercase}.laws-notice p{margin:8px 0 0;color:#9fb0ba;font-size:12px;line-height:1.65}
  .law-modal-backdrop{position:fixed;inset:0;z-index:10080;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(0,7,13,.84);backdrop-filter:blur(5px)}
  .law-modal{display:flex;flex-direction:column;width:min(1180px,96vw);height:min(850px,92vh);overflow:hidden;border:1px solid #f6a700;border-radius:10px;background:#06131e;box-shadow:0 28px 90px rgba(0,0,0,.65)}
  .law-modal-header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:14px 18px;border-bottom:1px solid rgba(246,167,0,.45);background:linear-gradient(180deg,#09243a,#04121e)}
  .law-modal-brand{display:flex;align-items:center;gap:13px;min-width:0}.law-modal-brand img{width:auto;height:46px;display:block}.law-modal-brand span{display:block;color:#fff;font-weight:900}.law-modal-brand small{display:block;margin-top:3px;color:#f6a700;font-size:10px;font-weight:800;text-transform:uppercase}
  .law-modal-close{flex:0 0 auto;width:40px;height:40px;border:1px solid #f6a700;border-radius:50%;background:#06131e;color:#fff;font-size:28px;line-height:1;cursor:pointer}.law-modal-close:hover,.law-modal-close:focus-visible{background:#f6a700;color:#06131e;outline:none}
  .law-modal-titlebar{padding:16px 20px;border-bottom:1px solid #294657;background:#071b29}.law-modal-titlebar>span{color:#f6a700;font-size:11px;font-weight:900;text-transform:uppercase}.law-modal-titlebar h2{margin:5px 0 5px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(22px,3vw,32px);line-height:1.1}.law-modal-titlebar p{max-width:950px;margin:0;color:#aebfc9;font-size:12px;line-height:1.5}
  .law-modal-frame-wrap{flex:1;min-height:0;background:#fff}.law-modal-frame{display:block;width:100%;height:100%;border:0;background:#fff}
  .law-modal-footer{display:flex;justify-content:space-between;gap:18px;padding:10px 18px;border-top:1px solid rgba(246,167,0,.35);background:#030c13;color:#8fa4b0;font-size:10px}
  @media(max-width:820px){.laws-heading,.laws-grid,.official-source-grid{grid-template-columns:1fr}.laws-heading{gap:8px}.law-modal-backdrop{padding:8px}.law-modal{width:100%;height:94vh}.law-modal-brand img{height:36px}.law-modal-footer{display:block}.law-modal-footer span{display:block}.law-modal-footer span+span{margin-top:4px}}
`;

export default function FloridaLiquorLicenseLawsPage() {
  return (
    <main className="laws-page">
      <style>{styles}</style>
      <div className="abt-header-wrap"><FormsSiteHeader /></div>

      <section className="laws-hero">
        <div className="page-shell">
          <nav className="laws-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/resources/forms">Resources</Link><span>›</span><strong>Florida Liquor License Laws</strong>
          </nav>
          <span className="laws-eyebrow">Florida Statutes · ABT Rules · Official Sources</span>
          <h1>Florida Liquor License Laws</h1>
          <p>{"A centralized reference to the Florida statutes cited across FLLM for quota liquor licenses, together with key Division of Alcoholic Beverages and Tobacco administrative rules."}</p>
        </div>
      </section>

      <section className="laws-section alt">
        <div className="page-shell">
          <div className="laws-heading">
            <div><span>Florida Statutes Cited by FLLM</span><h2>Quota liquor license statutes</h2></div>
            <p>{"Hover over any statute card and click it to open the official statute inside an FLLM viewer without leaving the website."}</p>
          </div>
          <InteractiveLawCards
            items={statutes}
            actionLabel="View Statute in FLLM"
            sourceName="Official Florida Legislature statute"
          />
        </div>
      </section>

      <section className="laws-section">
        <div className="page-shell">
          <div className="laws-heading">
            <div><span>Division of Alcoholic Beverages and Tobacco</span><h2>ABT administrative rules</h2></div>
            <p>{"Florida alcoholic-beverage administrative rules are published in Division 61A of the Florida Administrative Code. These cards open the official rule inside the same FLLM viewer."}</p>
          </div>
          <InteractiveLawCards
            items={abtRules}
            actionLabel="View Rule in FLLM"
            sourceName="Official Florida Administrative Code rule"
          />
          <InteractiveLawCards
            items={officialSources}
            actionLabel="Open in FLLM"
            sourceName="Official Florida government source"
            variant="compact"
          />
        </div>
      </section>

      <section className="laws-notice page-shell">
        <strong>Legal reference, not legal advice</strong>
        <p>{"Statutes, administrative rules, agency forms, and interpretations can change. Confirm the current official source and obtain qualified legal or licensing advice for a specific transaction, applicant, or premises."}</p>
      </section>
    </main>
  );
}
