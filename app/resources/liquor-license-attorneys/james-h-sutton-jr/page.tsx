import type { Metadata } from "next";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";
import "../liquor-license-attorneys.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/resources/liquor-license-attorneys/james-h-sutton-jr`;

export const metadata: Metadata = {
  title: "James H. Sutton, Jr., CPA, Esq. | Florida Tax & Liquor License Attorney | FLLM",
  description: "FLLM profile for James H. Sutton, Jr., CPA, Esq. of Moffa, Sutton & Donnini, P.A., including Florida sales-tax disputes, FDOR matters, and liquor-license related tax and closing issues.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: canonicalUrl,
    title: "James H. Sutton, Jr., CPA, Esq. | FLLM Attorney Profile",
    description: "Florida tax attorney profile covering sales-and-use-tax disputes, FDOR matters, and liquor-license related tax and closing issues.",
    siteName: "Florida Liquor License Market",
  },
};

export default function JamesSuttonProfilePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonicalUrl,
    mainEntity: {
      "@type": "Person",
      name: "James H. Sutton, Jr., CPA, Esq.",
      jobTitle: "Attorney and CPA",
      worksFor: { "@type": "LegalService", name: "Law Offices of Moffa, Sutton & Donnini, P.A.", url: "https://www.floridasalestax.com/" },
      telephone: "+1-813-775-2131",
      url: "https://www.floridasalestax.com/staff-profiles/james-h-sutton-jr-cpa-esq-/",
      knowsAbout: ["Florida sales and use tax", "Florida Department of Revenue disputes", "administrative tax litigation", "liquor license tax and closing issues"],
    },
  };

  return (
    <main style={{background:"#061522",color:"#f4f7fa",minHeight:"100vh"}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replaceAll("<","\\u003c")}} />
      <div className="abt-header-wrap"><FormsSiteHeader /></div>
      <section className="page-shell" style={{padding:"44px 20px 28px"}}>
        <nav style={{fontSize:14,marginBottom:22}}><a href="/resources/liquor-license-attorneys" style={{color:"#f6a700"}}>Florida Liquor License Attorney Directory</a> <span>›</span> James H. Sutton, Jr.</nav>
        <span style={{color:"#f6a700",fontWeight:800,textTransform:"uppercase",letterSpacing:".08em"}}>FLLM Attorney Directory Profile</span>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,5vw,64px)",margin:"10px 0 8px"}}>James H. Sutton, Jr., CPA, Esq.</h1>
        <p style={{fontSize:20,margin:"0 0 6px"}}><strong>Law Offices of Moffa, Sutton & Donnini, P.A.</strong></p>
        <p style={{opacity:.86,fontSize:17}}>Tampa · Statewide Florida tax matters</p>
      </section>

      <section className="page-shell" style={{display:"grid",gridTemplateColumns:"minmax(0,2fr) minmax(280px,1fr)",gap:28,padding:"0 20px 48px"}}>
        <article style={{background:"#0b263a",border:"1px solid #8f6a00",borderRadius:10,padding:28}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:32,marginTop:0}}>Florida Tax, FDOR, and Liquor-License Related Matters</h2>
          <p>James H. Sutton, Jr., CPA, Esq. is listed in the FLLM attorney directory based on publicly available information concerning his Florida tax practice. His published practice information includes Florida sales-and-use-tax audit defense and protests, petitions for reconsideration and Division of Administrative Hearings litigation, FDOR collections, registration denials, refunds, and voluntary disclosures.</p>
          <p>For liquor-license transactions, tax issues can affect closing, lien clearance, seller obligations, and transfer timing. Users should confirm directly with counsel whether a particular liquor-license matter falls within the attorney&apos;s current scope of representation.</p>
          <h3 style={{color:"#f6a700",fontSize:22}}>Published practice focus</h3>
          <ul style={{lineHeight:1.8}}>
            <li>Florida sales-and-use-tax audit defense and protests</li>
            <li>Petitions for reconsideration and DOAH litigation</li>
            <li>FDOR collections, registration denials, refunds, and voluntary disclosures</li>
            <li>Tax-clearance and related issues that may arise in Florida liquor-license transactions</li>
          </ul>
          <h3 style={{color:"#f6a700",fontSize:22}}>FLLM resource</h3>
          <p><a href="/resources/fdor-assessment-disputes" style={{color:"#f6a700",fontWeight:700}}>Florida DOR Assessment Disputes: Informal Protest vs. DOAH →</a></p>
        </article>

        <aside style={{display:"grid",gap:18,alignContent:"start"}}>
          <div style={{background:"#0b263a",border:"1px solid #8f6a00",borderRadius:10,padding:22}}>
            <strong style={{display:"block",color:"#f6a700",textTransform:"uppercase",letterSpacing:".06em",marginBottom:10}}>Contact</strong>
            <a href="tel:+18137752131" style={{display:"block",fontSize:22,color:"#fff",fontWeight:800,marginBottom:14}}>813-775-2131</a>
            <a href="https://www.floridasalestax.com/staff-profiles/james-h-sutton-jr-cpa-esq-/" target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#f6a700",color:"#061522",padding:"12px 16px",fontWeight:800,borderRadius:4}}>Visit Firm Profile ↗</a>
          </div>
          <div style={{background:"#0b263a",border:"1px solid #8f6a00",borderRadius:10,padding:22}}>
            <strong style={{display:"block",color:"#f6a700",marginBottom:8}}>Independent verification</strong>
            <p style={{marginTop:0}}>Verify current eligibility, disciplinary history, scope of practice, conflicts, fees, and engagement terms directly before retaining counsel.</p>
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
