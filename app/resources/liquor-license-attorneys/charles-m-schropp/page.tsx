import type { Metadata } from "next";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";
import "../liquor-license-attorneys.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/liquor-license-attorneys/charles-m-schropp`;

export const metadata: Metadata = {
  title: "Charles M. Schropp | Florida Liquor License Litigation & Appeals Attorney | FLLM",
  description: "FLLM profile for Charles M. Schropp of Schropp Law Firm, P.A., including Florida liquor-license litigation, civil appeals, appellate briefing, and issue-preservation matters.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: canonicalUrl,
    title: "Charles M. Schropp | FLLM Attorney Profile",
    description: "Florida litigation and appellate attorney profile covering liquor-license disputes, civil appeals, briefing, and issue preservation.",
    siteName: "Florida Liquor License Market",
  },
};

export default function CharlesSchroppProfilePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonicalUrl,
    mainEntity: {
      "@type": "Person",
      name: "Charles M. Schropp",
      jobTitle: "Attorney",
      worksFor: { "@type": "LegalService", name: "Schropp Law Firm, P.A.", url: "https://www.schropplaw.com/" },
      telephone: "+1-813-418-3320",
      url: "https://www.schropplaw.com/attorney-profiles/charles-m-schropp/",
      knowsAbout: ["Florida liquor license litigation", "civil appeals", "appellate briefing", "issue preservation", "Florida appellate practice"],
    },
  };

  return (
    <main style={{background:"#061522",color:"#f4f7fa",minHeight:"100vh"}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replaceAll("<","\\u003c")}} />
      <div className="abt-header-wrap"><FormsSiteHeader /></div>
      <section className="page-shell" style={{padding:"44px 20px 28px"}}>
        <nav style={{fontSize:14,marginBottom:22}}><a href="/resources/liquor-license-attorneys" style={{color:"#f6a700"}}>Florida Liquor License Attorney Directory</a> <span>›</span> Charles M. Schropp</nav>
        <span style={{color:"#f6a700",fontWeight:800,textTransform:"uppercase",letterSpacing:".08em"}}>FLLM Attorney Directory Profile</span>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,5vw,64px)",margin:"10px 0 8px"}}>Charles M. Schropp</h1>
        <p style={{fontSize:20,margin:"0 0 6px"}}><strong>Schropp Law Firm, P.A.</strong></p>
        <p style={{opacity:.86,fontSize:17}}>Tampa · Statewide appellate matters</p>
      </section>

      <section className="page-shell" style={{display:"grid",gridTemplateColumns:"minmax(0,2fr) minmax(280px,1fr)",gap:28,padding:"0 20px 48px"}}>
        <article style={{background:"#0b263a",border:"1px solid #8f6a00",borderRadius:10,padding:28}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:32,marginTop:0}}>Florida Liquor-License Litigation &amp; Appeals</h2>
          <p>Charles M. Schropp is listed in the FLLM attorney directory based on publicly available information concerning his litigation and appellate practice. His FLLM directory profile identifies Florida liquor-license litigation and appellate matters, civil litigation and appeals statewide, appellate briefing, issue framing, and preservation strategy.</p>
          <p>Liquor-license disputes may involve purchase agreements, transfer rights, ownership claims, liens, specific performance, injunctive relief, trial-court rulings, or administrative decisions. Users should confirm directly with counsel whether a specific dispute or appeal falls within the attorney&apos;s current practice.</p>
          <h3 style={{color:"#f6a700",fontSize:22}}>Published practice focus</h3>
          <ul style={{lineHeight:1.8}}>
            <li>Florida liquor-license litigation and appellate matters</li>
            <li>Civil litigation and appeals statewide throughout Florida</li>
            <li>Appellate briefing, issue framing, and preservation strategy</li>
            <li>Review of trial-court and administrative records for appellate issues</li>
          </ul>
          <h3 style={{color:"#f6a700",fontSize:22}}>Related FLLM research</h3>
          <p><a href="/florida-liquor-license-court-decisions" style={{color:"#f6a700",fontWeight:700}}>Florida Liquor License Court Decisions &amp; Case Law →</a></p>
          <p><a href="/resources/florida-liquor-license-property-or-privilege" style={{color:"#f6a700",fontWeight:700}}>Is a Florida Liquor License Property or a Privilege? →</a></p>
        </article>

        <aside style={{display:"grid",gap:18,alignContent:"start"}}>
          <div style={{background:"#0b263a",border:"1px solid #8f6a00",borderRadius:10,padding:22}}>
            <strong style={{display:"block",color:"#f6a700",textTransform:"uppercase",letterSpacing:".06em",marginBottom:10}}>Contact</strong>
            <a href="tel:+18134183320" style={{display:"block",fontSize:22,color:"#fff",fontWeight:800,marginBottom:14}}>813-418-3320</a>
            <a href="https://www.schropplaw.com/attorney-profiles/charles-m-schropp/" target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#f6a700",color:"#061522",padding:"12px 16px",fontWeight:800,borderRadius:4}}>Visit Firm Profile ↗</a>
          </div>
          <div style={{background:"#0b263a",border:"1px solid #8f6a00",borderRadius:10,padding:22}}>
            <strong style={{display:"block",color:"#f6a700",marginBottom:8}}>Independent verification</strong>
            <p style={{marginTop:0}}>Verify current eligibility, disciplinary history, relevant appellate experience, conflicts, fees, and engagement terms directly before retaining counsel.</p>
            <a href="https://www.floridabar.org/directories/find-mbr/" target="_blank" rel="noreferrer" style={{color:"#f6a700",fontWeight:700}}>Florida Bar Member Search ↗</a>
          </div>
        </aside>
      </section>

      <section className="page-shell" style={{padding:"0 20px 50px"}}>
        <div style={{borderTop:"1px solid #7a5a00",paddingTop:18,fontSize:13,opacity:.78}}>Florida Liquor License Market is not a law firm and does not provide legal advice. Inclusion in the FLLM directory is informational only and is not an endorsement, ranking, referral, specialty certification, or guarantee.</div>
      </section>
    </main>
  );
}
