import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonical = `${siteUrl}/resources/florida-liquor-license-system`;

export const metadata: Metadata = {
  title: "How Florida Liquor Licenses Work | Quota, 4COP & 3PS Guide",
  description:
    "Learn how Florida liquor licensing works, including quota licenses, 4COP and 3PS series, county limits, transfers, inactive or escrow status, and investment ownership.",
  alternates: { canonical },
};

const cardStyle = {
  padding: "28px",
  border: "1px solid rgba(246,167,0,.42)",
  borderTop: "3px solid #f6a700",
  borderRadius: "11px",
  background: "radial-gradient(circle at 20% 0%,rgba(255,255,255,.075),transparent 38%),linear-gradient(145deg,#173f5e 0%,#10334e 52%,#0a263c 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.08),inset 0 -8px 18px rgba(0,0,0,.15),0 3px 0 rgba(116,79,12,.56),0 15px 30px rgba(0,0,0,.22)",
} as const;

const paragraphStyle = {
  margin: "0 0 14px",
  color: "#e1eaf0",
  fontSize: "17.5px",
  lineHeight: 1.75,
} as const;

const headingStyle = {
  margin: "0 0 12px",
  color: "#ffffff",
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "30px",
  lineHeight: 1.1,
} as const;

export default function FloridaLiquorLicenseSystemPage() {
  return (
    <main style={{ minHeight: "100vh", color: "#eef3f7", background: "#07131e" }}>
      <style>{`
        .resource-card,.resource-feature-box,.resource-inner-note{position:relative;isolation:isolate;overflow:hidden;transform:translateY(0);transition:transform .2s ease,border-color .2s ease,background .2s ease,box-shadow .2s ease,filter .2s ease}
        .resource-card::after,.resource-feature-box::after{content:"";position:absolute;left:9%;right:9%;bottom:-8px;height:14px;z-index:-1;border-radius:50%;background:rgba(0,0,0,.34);filter:blur(8px)}
        .resource-card:hover,.resource-card:focus-within,.resource-feature-box:hover,.resource-feature-box:focus-within{transform:translateY(-5px) scale(1.01);border-color:#ffc13b!important;background:radial-gradient(circle at 20% 0%,rgba(112,220,255,.2),transparent 42%),linear-gradient(145deg,#205675 0%,#174661 52%,#10334d 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),inset 0 0 30px rgba(112,220,255,.075),0 4px 0 rgba(158,108,10,.66),0 22px 42px rgba(0,0,0,.31),0 0 22px rgba(112,220,255,.18),0 0 16px rgba(246,167,0,.14)!important;filter:brightness(1.06)}
        .resource-inner-note:hover,.resource-inner-note:focus-within{transform:translateY(-3px);border-color:#ffc13b!important;background:rgba(112,220,255,.1)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 12px 24px rgba(0,0,0,.24),0 0 18px rgba(112,220,255,.14)!important}
        .active-operation-list li::marker{color:#70dcff;font-size:1.08em}
        .active-operation-note{border-color:rgba(111,151,177,.72)!important;border-left:5px solid #4aa9c8!important;background:radial-gradient(circle at 14% 0%,rgba(112,220,255,.07),transparent 40%),linear-gradient(145deg,#173f59 0%,#12364f 52%,#0b2940 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -8px 18px rgba(0,0,0,.15),0 3px 0 rgba(37,104,131,.5),0 14px 28px rgba(0,0,0,.24)!important}
        .active-operation-note::after{content:"";position:absolute;left:8%;right:8%;bottom:-9px;height:16px;z-index:-1;border-radius:50%;background:rgba(0,0,0,.38);filter:blur(9px)}
        .active-operation-note:hover,.active-operation-note:focus-within{transform:translateY(-4px) scale(1.005);border-color:#70dcff!important;background:radial-gradient(circle at 14% 0%,rgba(112,220,255,.12),transparent 42%),linear-gradient(145deg,#1b4964 0%,#153d56 52%,#0d2d44 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 0 22px rgba(112,220,255,.045),0 4px 0 rgba(42,121,151,.58),0 20px 36px rgba(0,0,0,.3),0 0 14px rgba(112,220,255,.12)!important;filter:brightness(1.025)}
        .resource-card>strong{font-size:18px;line-height:1.4}
        .resource-card a{display:inline-block;font-size:16.5px;line-height:1.45;text-decoration:none}
        .resource-card a:hover{text-decoration:underline}
        .license-series-card{border-color:rgba(112,220,255,.62)!important;border-top:4px solid #70dcff!important;background:radial-gradient(circle at 18% 0%,rgba(112,220,255,.15),transparent 40%),linear-gradient(145deg,#194866 0%,#123a56 52%,#0b2a43 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.13),inset 0 -10px 22px rgba(0,0,0,.17),0 4px 0 rgba(35,124,157,.66),0 19px 38px rgba(0,0,0,.28),0 0 19px rgba(112,220,255,.09)!important}
        .license-series-card:hover,.license-series-card:focus-within{border-color:#9ce8ff!important;background:radial-gradient(circle at 18% 0%,rgba(112,220,255,.28),transparent 43%),linear-gradient(145deg,#225d7e 0%,#184963 52%,#10334d 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.17),inset 0 0 34px rgba(112,220,255,.1),0 5px 0 rgba(38,137,173,.75),0 25px 46px rgba(0,0,0,.34),0 0 30px rgba(112,220,255,.26)!important}
        .license-series-card h3{color:#70dcff!important;text-shadow:0 0 14px rgba(112,220,255,.18)}
        .license-system-route main section article.license-series-card{border-color:rgba(112,220,255,.62)!important;border-top:4px solid #70dcff!important;background:radial-gradient(circle at 18% 0%,rgba(112,220,255,.15),transparent 40%),linear-gradient(145deg,#194866 0%,#123a56 52%,#0b2a43 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.13),inset 0 -10px 22px rgba(0,0,0,.17),0 4px 0 rgba(35,124,157,.66),0 19px 38px rgba(0,0,0,.28),0 0 19px rgba(112,220,255,.09)!important}
        .license-system-route main section article.license-series-card:hover,.license-system-route main section article.license-series-card:focus-within{transform:translateY(-5px) scale(1.01)!important;border-color:#9ce8ff!important;background:radial-gradient(circle at 18% 0%,rgba(112,220,255,.28),transparent 43%),linear-gradient(145deg,#225d7e 0%,#184963 52%,#10334d 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.17),inset 0 0 34px rgba(112,220,255,.1),0 5px 0 rgba(38,137,173,.75),0 25px 46px rgba(0,0,0,.34),0 0 30px rgba(112,220,255,.26)!important}
        .license-system-route main section article.license-series-card h3{color:#70dcff!important;text-shadow:0 0 14px rgba(112,220,255,.18)!important}
        .series-change-panel{border:1px solid rgba(112,220,255,.5)!important;border-left:5px solid #70dcff!important;background:radial-gradient(circle at 16% 0%,rgba(112,220,255,.08),transparent 38%),linear-gradient(145deg,#123a54 0%,#0e3048 55%,#09243a 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -8px 18px rgba(0,0,0,.15),0 3px 0 rgba(35,116,147,.48),0 16px 30px rgba(0,0,0,.25)!important}
        .series-change-panel:hover,.series-change-panel:focus-within{border-color:#8ee5ff!important;transform:translateY(-4px) scale(1.004);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 0 24px rgba(112,220,255,.045),0 4px 0 rgba(43,133,166,.55),0 21px 38px rgba(0,0,0,.3),0 0 15px rgba(112,220,255,.12)!important;filter:brightness(1.025)}
        .series-change-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:22px}
        .series-change-item{padding:21px 22px;border:1px solid rgba(139,171,191,.42);border-radius:9px;background:linear-gradient(145deg,rgba(34,79,105,.72),rgba(12,43,64,.84));box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 9px 18px rgba(0,0,0,.16);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease,background .2s ease}
        .series-change-item:hover,.series-change-item:focus-within{transform:translateY(-3px);border-color:#70dcff;background:linear-gradient(145deg,rgba(42,96,124,.78),rgba(15,50,72,.9));box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 14px 24px rgba(0,0,0,.22),0 0 12px rgba(112,220,255,.1)}
        .series-change-item h3{margin:0 0 9px;color:#70dcff;font-size:20px;line-height:1.25}
        .series-change-item p{margin:0;color:#e1eaf0;font-size:16.5px;line-height:1.65}
        @media(max-width:850px){.series-change-grid{grid-template-columns:1fr}}
        @media(max-width:700px){.resource-card,.resource-feature-box{transform:none!important}.resource-card:hover,.resource-card:focus-within,.resource-feature-box:hover,.resource-feature-box:focus-within{transform:translateY(-3px)!important}}
      `}</style>
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section
        style={{
          borderBottom: "1px solid rgba(246,167,0,.35)",
          background: "linear-gradient(135deg,#061728,#0a2136)",
        }}
      >
        <div className="page-shell" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
          <nav style={{ marginBottom: "26px", color: "#9eb0bd", fontSize: "13px" }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: "#d8e2e9" }}>Home</Link>
            <span> &nbsp;›&nbsp; </span>
            <Link href="/resources/florida-liquor-license-types" style={{ color: "#d8e2e9" }}>License Types</Link>
            <span> &nbsp;›&nbsp; How Florida Licensing Works</span>
          </nav>
          <span style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>
            Florida liquor licensing explained
          </span>
          <h1 style={{ maxWidth: "940px", margin: "10px 0 18px", color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(40px,6vw,68px)", lineHeight: 1.02 }}>
            How the Florida Liquor License System Works
          </h1>
          <p style={{ ...paragraphStyle, maxWidth: "930px", fontSize: "19px", lineHeight: 1.75 }}>
            Florida does not have one generic liquor license. Different license series determine what alcoholic beverages may be sold, whether consumption is on or off the premises, and whether the license is part of Florida&apos;s county quota system. For buyers, the most important distinction is between licenses that can generally be applied for and full-liquor quota licenses that are limited in number and commonly bought from an existing owner.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "24px" }}>
            <Link href="/listings" className="btn btn-gold">Browse Quota Licenses</Link>
            <Link href="/resources/florida-liquor-license-types" className="btn btn-outline">Compare License Types</Link>
          </div>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "44px", paddingBottom: "22px" }}>
        <span style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Start here</span>
        <h2 style={{ ...headingStyle, fontSize: "38px", marginTop: "8px" }}>Three broad paths to alcoholic-beverage privileges</h2>
        <p style={{ ...paragraphStyle, maxWidth: "1180px" }}>
          The practical question is not simply whether a business needs a liquor license. It is whether the proposed operation needs beer and wine only, qualifies for a special full-liquor exception, or needs a transferable full-liquor quota license.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "15px", marginTop: "24px" }}>
          <article className="resource-card" style={cardStyle}>
            <strong style={{ color: "#f6a700" }}>1. Beer and wine</strong>
            <h3 style={{ ...headingStyle, fontSize: "23px", marginTop: "8px" }}>Non-quota retail licenses</h3>
            <p style={paragraphStyle}>Series such as 1APS, 2APS, 1COP and 2COP are not full-liquor quota licenses. Qualified applicants generally apply for the appropriate package-sales or consumption-on-premises privilege, subject to state and local requirements.</p>
            <Link href="/license-types/2cop-beer-wine" style={{ color: "#f6a700", fontWeight: 900 }}>See 2COP explained →</Link>
          </article>
          <article className="resource-card" style={cardStyle}>
            <strong style={{ color: "#f6a700" }}>2. Special full liquor</strong>
            <h3 style={{ ...headingStyle, fontSize: "23px", marginTop: "8px" }}>Qualification-based exceptions</h3>
            <p style={paragraphStyle}>Certain restaurants, hotels, clubs and other qualifying facilities may obtain full-liquor privileges under statutory exceptions. A 4COP-SFS / SRX restaurant license is qualification-based and is not the same transferable asset as a quota license.</p>
            <Link href="/license-types/4cop-sfs-restaurant" style={{ color: "#f6a700", fontWeight: 900 }}>See 4COP-SFS explained →</Link>
          </article>
          <article className="resource-card" style={cardStyle}>
            <strong style={{ color: "#f6a700" }}>3. Full-liquor quota</strong>
            <h3 style={{ ...headingStyle, fontSize: "23px", marginTop: "8px" }}>County-limited transferable licenses</h3>
            <p style={paragraphStyle}>Quota licenses are the scarce full-liquor licenses used for package stores and for many bars, lounges, nightclubs and full-liquor hospitality concepts. Existing licenses are commonly purchased from current license holders.</p>
            <Link href="/listings" style={{ color: "#f6a700", fontWeight: 900 }}>View current quota inventory →</Link>
          </article>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <div className="resource-feature-box" style={{ padding: "32px", border: "1px solid #806322", borderTop: "4px solid #f6a700", borderRadius: "11px", background: "radial-gradient(circle at 18% 0%,rgba(255,255,255,.07),transparent 38%),linear-gradient(135deg,#0c2639,#07131e)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.07),inset 0 -8px 18px rgba(0,0,0,.14),0 3px 0 rgba(116,79,12,.55),0 16px 32px rgba(0,0,0,.23)" }}>
          <div style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" }}>Florida&apos;s quota formula</div>
          <h2 style={{ ...headingStyle, marginTop: "9px" }}>One quota license for each 7,500 county residents</h2>
          <p style={paragraphStyle}>Florida law generally limits the number of quota alcoholic-beverage licenses in each county to one for every 7,500 residents. New quota availability is generally created as county population increases. Because supply is restricted by county while buyer demand varies, existing quota licenses can have substantial private-market value. <a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&amp;URL=0500-0599/0561/Sections/0561.20.html" target="_blank" rel="noreferrer" style={{ color: "#70dcff", fontWeight: 400, textDecoration: "none" }}>Fla. Stat. § 561.20(1)</a>.</p>
          <p style={paragraphStyle}>Quota licenses are county-specific. Owning a quota license in one Florida county does not make that license freely usable in another county.</p>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <span style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Important terminology</span>
        <h2 style={{ ...headingStyle, fontSize: "38px", marginTop: "8px" }}>“Quota” is the scarce license interest; 4COP and 3PS describe the approved series or use</h2>
        <p style={{ ...paragraphStyle, maxWidth: "950px" }}>This distinction resolves the common confusion between “4COP quota,” “4COP,” and “3PS quota.” They are related terms, but they do not describe exactly the same thing.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px", marginTop: "22px" }}>
          <article className="resource-card license-series-card" style={cardStyle}>
            <h3 style={{ ...headingStyle, fontSize: "26px" }}><span style={{ color: "#70dcff", textShadow: "0 0 14px rgba(112,220,255,.18)" }}>4COP quota</span></h3>
            <p style={paragraphStyle}>A 4COP-family quota series is used when the county quota license is approved for full-liquor consumption-on-premises privileges. In everyday marketplace language, people often say they are “buying a 4COP.” More precisely, they are buying a county quota-license interest that is held or operated in the applicable consumption-on-premises series.</p>
            <p style={paragraphStyle}><strong style={{ color: "#fff" }}>Do not confuse it with 4COP-SFS / SRX.</strong> The special restaurant license is qualification-based and is not the same transferable quota asset.</p>
            <Link href="/license-types/4cop-quota" style={{ color: "#f6a700", fontWeight: 900 }}>Read the 4COP quota guide →</Link>
          </article>
          <article className="resource-card license-series-card" style={cardStyle}>
            <h3 style={{ ...headingStyle, fontSize: "26px" }}><span style={{ color: "#70dcff", textShadow: "0 0 14px rgba(112,220,255,.18)" }}>3PS quota</span></h3>
            <p style={paragraphStyle}>A 3PS-family quota series is used when the quota license is approved for package sales of sealed beer, wine and spirits for consumption away from the licensed premises, such as at a liquor store.</p>
            <p style={paragraphStyle}>Florida provides a formal change-in-series-or-type process. A quota license may therefore be approved in a package-sales series or a consumption-on-premises series depending on the proposed use and regulatory approvals. A change is not automatic.</p>
            <Link href="/license-types/3ps-package-store" style={{ color: "#f6a700", fontWeight: 900 }}>Read the 3PS quota guide →</Link>
          </article>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <div className="resource-feature-box series-change-panel" style={{ padding: "32px", borderRadius: "11px" }}>
          <span style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Changing the approved series</span>
          <h2 style={{ ...headingStyle, marginTop: "9px", fontSize: "34px" }}>A 4COP quota can become a 3PS quota—and a 3PS quota can become a 4COP quota</h2>
          <p style={{ ...paragraphStyle, maxWidth: "1120px" }}>
            The underlying asset remains the same county-limited quota license. What changes is the series under which ABT authorizes it to operate. A change does not create another quota license, move the license to another county, or become effective merely because the owner requests it; the Florida Division of Alcoholic Beverages and Tobacco must approve the new series first.
          </p>

          <div className="series-change-grid">
            <article className="series-change-item">
              <h3>Privileges after conversion</h3>
              <p><strong style={{ color: "#fff" }}>4COP quota:</strong> beer, wine and spirits for consumption on the licensed premises, with package-sale privileges when approved.</p>
              <p style={{ marginTop: "13px" }}><strong style={{ color: "#fff" }}>3PS quota:</strong> sealed beer, wine and spirits for consumption away from the licensed premises; on-premises consumption is not authorized.</p>
            </article>
            <article className="series-change-item">
              <h3>Qualifications and approvals</h3>
              <p>The licensee and disclosed interested parties must remain qualified under Florida law. If the converted license will operate at a location, ABT may require the premises sketch and applicable zoning, sales-tax, health, ownership, fingerprint and contract disclosures shown in the application packet.</p>
            </article>
            <article className="series-change-item">
              <h3>Restrictions and conditions</h3>
              <p>The license remains tied to its county and may be used only with the privileges ABT approves. Local zoning, distance, hours, package-sale and premises rules still apply. The applicable annual state license tax also changes; an off-premises-only vendor pays 75% of the corresponding consumption-on-premises state license tax.</p>
            </article>
          </div>

          <div style={{ marginTop: "21px", paddingTop: "18px", borderTop: "1px solid rgba(112,220,255,.22)", color: "#e1eaf0", fontSize: "16.5px", lineHeight: 1.7 }}>
            <strong style={{ color: "#f6a700" }}>Form used:</strong> DBPR ABT-6014, Change of Location/Change in Series or Type Application. The form asks whether the request is a change, increase or decrease in series and identifies the requested series and type/class. Approval should be obtained before operating under the new privileges.{" "}
            <a href="https://www2.myfloridalicense.com/abt/forms/documents/abt-6014.pdf" target="_blank" rel="noreferrer" style={{ color: "#70dcff", fontWeight: 400, textDecoration: "none" }}>Open official ABT-6014</a>
            <span style={{ color: "#91aabd" }}> · </span>
            <a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/forms-and-publications/" target="_blank" rel="noreferrer" style={{ color: "#70dcff", fontWeight: 400, textDecoration: "none" }}>ABT forms and instructions</a>
            <span style={{ color: "#91aabd" }}> · </span>
            <a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&amp;URL=0500-0599/0561/Sections/0561.15.html" target="_blank" rel="noreferrer" style={{ color: "#70dcff", fontWeight: 400, textDecoration: "none" }}>Fla. Stat. § 561.15</a>
            <span style={{ color: "#91aabd" }}> · </span>
            <a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&amp;URL=0500-0599/0565/Sections/0565.02.html" target="_blank" rel="noreferrer" style={{ color: "#70dcff", fontWeight: 400, textDecoration: "none" }}>Fla. Stat. § 565.02</a>
          </div>
        </div>
      </section>

      <section id="investment-ownership" className="page-shell" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <div className="resource-feature-box" style={{ padding: "32px", border: "1px solid #7a632e", borderLeft: "5px solid #f6a700", borderRadius: "11px", background: "radial-gradient(circle at 18% 0%,rgba(255,255,255,.07),transparent 38%),linear-gradient(135deg,#0c2639,#071723)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.07),inset 0 -8px 18px rgba(0,0,0,.14),0 3px 0 rgba(116,79,12,.55),0 16px 32px rgba(0,0,0,.23)" }}>
          <span style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Investment ownership</span>
          <h2 style={{ ...headingStyle, marginTop: "9px" }}>A quota license can be purchased without immediately operating a bar, restaurant or liquor store</h2>
          <p style={paragraphStyle}>An eligible purchaser can acquire a transferable Florida quota license even when no operating location is ready. Florida provides inactive and escrow procedures for quota licenses that are not currently assigned to an operating location. While inactive, the license cannot be used to sell alcoholic beverages.</p>
          <p style={paragraphStyle}>That means a buyer may purchase a 4COP-family or 3PS-family quota license as an investment asset, keep it in the required inactive or escrow status, and later sell it or seek approval to activate it at a qualifying location.</p>
          <div className="resource-inner-note active-operation-note" style={{ marginTop: "20px", padding: "22px 24px", border: "1px solid rgba(246,167,0,.42)", borderRadius: "9px", background: "rgba(246,167,0,.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.05),0 8px 18px rgba(0,0,0,.16)", color: "#e5edf2", fontSize: "16.5px", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 10px" }}><strong style={{ color: "#f6a700" }}>Important:</strong> inactive ownership remains regulated. For a quota license issued after September 30, 1988:</p>
            <ul className="active-operation-list" style={{ margin: "0 0 10px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "7px" }}>The licensed premises generally must be open to the public for bona fide retail sales of authorized alcoholic beverages during regular and reasonable business hours.</li>
              <li style={{ marginBottom: "7px" }}>The minimum operating schedule is at least 8 hours per day on at least 210 days during a 12-month period, beginning 6 months after acquisition.</li>
              <li style={{ marginBottom: "7px" }}>The licensee must notify ABT in writing of inactive periods and place the license in inactive status.</li>
              <li style={{ marginBottom: "7px" }}>A one-time waiver or extension of up to 12 months is available upon written request.</li>
              <li style={{ marginBottom: "7px" }}>Limited additional extensions may apply for qualifying physical damage, relocation construction or remodeling, or specified government or court restrictions.</li>
              <li>The owner must remain qualified, keep the license renewed and in the correct status, and obtain all required approvals before activating or transferring it.</li>
            </ul>
            <p style={{ margin: "0" }}><a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&amp;URL=0500-0599/0561/Sections/0561.29.html" target="_blank" rel="noreferrer" style={{ color: "#70dcff", fontWeight: 400, textDecoration: "none" }}>Fla. Stat. § 561.29(1)(i)</a>. Investment ownership is not the same as simply renting the license to an unrelated operator.</p>
          </div>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "30px", paddingBottom: "46px" }}>
        <span style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Purchase process</span>
        <h2 style={{ ...headingStyle, fontSize: "38px", marginTop: "8px" }}>What happens when an existing quota license is purchased?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "15px", marginTop: "22px" }}>
          <article className="resource-card" style={cardStyle}><strong style={{ color: "#f6a700" }}>1. Identify</strong><p style={{ ...paragraphStyle, marginTop: "10px" }}>Confirm the county, exact license record, series, status, asking price and intended use.</p></article>
          <article className="resource-card" style={cardStyle}><strong style={{ color: "#f6a700" }}>2. Contract and diligence</strong><p style={{ ...paragraphStyle, marginTop: "10px" }}>The parties document the purchase, investigate the license and transaction, address transfer documents and fees, and close under their agreement.</p></article>
          <article className="resource-card" style={cardStyle}><strong style={{ color: "#f6a700" }}>3. Transfer and status</strong><p style={{ ...paragraphStyle, marginTop: "10px" }}>The buyer must qualify and complete the applicable state transfer process. If no location is ready, the license may need to remain inactive or in escrow until later activation.</p></article>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(246,167,0,.3)", background: "#06131e" }}>
        <div className="page-shell" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
          <h2 style={{ ...headingStyle, fontSize: "27px" }}>Continue learning</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <Link href="/resources/florida-liquor-license-types" className="btn btn-outline">Compare License Types</Link>
            <Link href="/how-to-buy-florida-liquor-license" className="btn btn-outline">How to Buy</Link>
            <Link href="/florida-liquor-license-value" className="btn btn-outline">License Value Estimator</Link>
            <Link href="/listings" className="btn btn-gold">Current Listings</Link>
          </div>
        </div>
      </section>

      <div className="page-shell" style={{ paddingTop: "22px", paddingBottom: "40px", color: "#b7c5cf", fontSize: "14.5px", lineHeight: 1.7 }}>
        Florida Liquor License Market provides marketplace and educational information, not legal or licensing advice. Eligibility, ownership, transferability, active-operation requirements, inactive status, zoning, premises approval and license privileges are determined by applicable law and the Florida Division of Alcoholic Beverages and Tobacco.
      </div>
    </main>
  );
}
