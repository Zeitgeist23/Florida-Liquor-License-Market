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
  padding: "24px",
  border: "1px solid #3f586a",
  borderTop: "3px solid #f6a700",
  borderRadius: "9px",
  background: "#091f31",
} as const;

const paragraphStyle = {
  margin: "0 0 12px",
  color: "#c6d2da",
  fontSize: "15px",
  lineHeight: 1.7,
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
          <nav style={{ marginBottom: "26px", color: "#9eb0bd", fontSize: "11px" }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: "#d8e2e9" }}>Home</Link>
            <span> &nbsp;›&nbsp; </span>
            <Link href="/resources/florida-liquor-license-types" style={{ color: "#d8e2e9" }}>License Types</Link>
            <span> &nbsp;›&nbsp; How Florida Licensing Works</span>
          </nav>
          <span style={{ color: "#f6a700", fontSize: "11px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>
            Florida liquor licensing explained
          </span>
          <h1 style={{ maxWidth: "940px", margin: "10px 0 18px", color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(40px,6vw,68px)", lineHeight: 1.02 }}>
            How the Florida Liquor License System Works
          </h1>
          <p style={{ ...paragraphStyle, maxWidth: "930px", fontSize: "17px" }}>
            Florida does not have one generic liquor license. Different license series determine what alcoholic beverages may be sold, whether consumption is on or off the premises, and whether the license is part of Florida&apos;s county quota system. For buyers, the most important distinction is between licenses that can generally be applied for and full-liquor quota licenses that are limited in number and commonly bought from an existing owner.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "24px" }}>
            <Link href="/listings" className="btn btn-gold">Browse Quota Licenses</Link>
            <Link href="/resources/florida-liquor-license-types" className="btn btn-outline">Compare License Types</Link>
          </div>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "44px", paddingBottom: "22px" }}>
        <span style={{ color: "#f6a700", fontSize: "10px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Start here</span>
        <h2 style={{ ...headingStyle, fontSize: "38px", marginTop: "8px" }}>Three broad paths to alcoholic-beverage privileges</h2>
        <p style={{ ...paragraphStyle, maxWidth: "900px" }}>
          The practical question is not simply whether a business needs a liquor license. It is whether the proposed operation needs beer and wine only, qualifies for a special full-liquor exception, or needs a transferable full-liquor quota license.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "15px", marginTop: "24px" }}>
          <article style={cardStyle}>
            <strong style={{ color: "#f6a700" }}>1. Beer and wine</strong>
            <h3 style={{ ...headingStyle, fontSize: "23px", marginTop: "8px" }}>Non-quota retail licenses</h3>
            <p style={paragraphStyle}>Series such as 1APS, 2APS, 1COP and 2COP are not full-liquor quota licenses. Qualified applicants generally apply for the appropriate package-sales or consumption-on-premises privilege, subject to state and local requirements.</p>
            <Link href="/license-types/2cop-beer-wine" style={{ color: "#f6a700", fontWeight: 900 }}>See 2COP explained →</Link>
          </article>
          <article style={cardStyle}>
            <strong style={{ color: "#f6a700" }}>2. Special full liquor</strong>
            <h3 style={{ ...headingStyle, fontSize: "23px", marginTop: "8px" }}>Qualification-based exceptions</h3>
            <p style={paragraphStyle}>Certain restaurants, hotels, clubs and other qualifying facilities may obtain full-liquor privileges under statutory exceptions. A 4COP-SFS / SRX restaurant license is qualification-based and is not the same transferable asset as a quota license.</p>
            <Link href="/license-types/4cop-sfs-restaurant" style={{ color: "#f6a700", fontWeight: 900 }}>See 4COP-SFS explained →</Link>
          </article>
          <article style={cardStyle}>
            <strong style={{ color: "#f6a700" }}>3. Full-liquor quota</strong>
            <h3 style={{ ...headingStyle, fontSize: "23px", marginTop: "8px" }}>County-limited transferable licenses</h3>
            <p style={paragraphStyle}>Quota licenses are the scarce full-liquor licenses used for package stores and for many bars, lounges, nightclubs and full-liquor hospitality concepts. Existing licenses are commonly purchased from current license holders.</p>
            <Link href="/listings" style={{ color: "#f6a700", fontWeight: 900 }}>View current quota inventory →</Link>
          </article>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <div style={{ padding: "30px", border: "1px solid #806322", borderTop: "4px solid #f6a700", borderRadius: "9px", background: "linear-gradient(135deg,#0c2639,#07131e)" }}>
          <div style={{ color: "#f6a700", fontSize: "13px", fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" }}>Florida&apos;s quota formula</div>
          <h2 style={{ ...headingStyle, marginTop: "9px" }}>One quota license for each 7,500 county residents</h2>
          <p style={paragraphStyle}>Florida&apos;s quota statute generally limits the number of quota alcoholic-beverage licenses in each county to one for every 7,500 residents. New quota availability is generally created as county population increases. Because supply is restricted by county while buyer demand varies, existing quota licenses can have substantial private-market value.</p>
          <p style={paragraphStyle}>Quota licenses are county-specific. Owning a quota license in one Florida county does not make that license freely usable in another county.</p>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <span style={{ color: "#f6a700", fontSize: "10px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Important terminology</span>
        <h2 style={{ ...headingStyle, fontSize: "38px", marginTop: "8px" }}>“Quota” is the scarce license interest; 4COP and 3PS describe the approved series or use</h2>
        <p style={{ ...paragraphStyle, maxWidth: "950px" }}>This distinction resolves the common confusion between “4COP quota,” “4COP,” and “3PS quota.” They are related terms, but they do not describe exactly the same thing.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px", marginTop: "22px" }}>
          <article style={cardStyle}>
            <h3 style={{ ...headingStyle, fontSize: "26px" }}>4COP quota</h3>
            <p style={paragraphStyle}>A 4COP-family quota series is used when the county quota license is approved for full-liquor consumption-on-premises privileges. In everyday marketplace language, people often say they are “buying a 4COP.” More precisely, they are buying a county quota-license interest that is held or operated in the applicable consumption-on-premises series.</p>
            <p style={paragraphStyle}><strong style={{ color: "#fff" }}>Do not confuse it with 4COP-SFS / SRX.</strong> The special restaurant license is qualification-based and is not the same transferable quota asset.</p>
            <Link href="/license-types/4cop-quota" style={{ color: "#f6a700", fontWeight: 900 }}>Read the 4COP quota guide →</Link>
          </article>
          <article style={cardStyle}>
            <h3 style={{ ...headingStyle, fontSize: "26px" }}>3PS quota</h3>
            <p style={paragraphStyle}>A 3PS-family quota series is used when the quota license is approved for package sales of sealed beer, wine and spirits for consumption away from the licensed premises, such as at a liquor store.</p>
            <p style={paragraphStyle}>Florida provides a formal change-in-series-or-type process. A quota license may therefore be approved in a package-sales series or a consumption-on-premises series depending on the proposed use and regulatory approvals. A change is not automatic.</p>
            <Link href="/license-types/3ps-package-store" style={{ color: "#f6a700", fontWeight: 900 }}>Read the 3PS quota guide →</Link>
          </article>
        </div>
      </section>

      <section id="investment-ownership" className="page-shell" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <div style={{ padding: "30px", border: "1px solid #7a632e", borderLeft: "5px solid #f6a700", borderRadius: "10px", background: "linear-gradient(135deg,#0c2639,#071723)" }}>
          <span style={{ color: "#f6a700", fontSize: "10px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Investment ownership</span>
          <h2 style={{ ...headingStyle, marginTop: "9px" }}>A quota license can be purchased without immediately operating a bar, restaurant or liquor store</h2>
          <p style={paragraphStyle}>An eligible purchaser can acquire a transferable Florida quota license even when no operating location is ready. Florida provides inactive and escrow procedures for quota licenses that are not currently assigned to an operating location. While inactive, the license cannot be used to sell alcoholic beverages.</p>
          <p style={paragraphStyle}>That means a buyer may purchase a 4COP-family or 3PS-family quota license as an investment asset, keep it in the required inactive or escrow status, and later sell it or seek approval to activate it at a qualifying location.</p>
          <div style={{ marginTop: "16px", padding: "16px", border: "1px solid rgba(246,167,0,.42)", borderRadius: "7px", background: "rgba(246,167,0,.05)", color: "#d2dce3", fontSize: "13px", lineHeight: 1.65 }}>
            <strong style={{ color: "#fff" }}>Important:</strong> inactive ownership remains regulated. The owner must remain qualified, keep the license properly renewed and in the correct status, comply with Florida&apos;s active-operation rules and any required waiver or extension procedures, and obtain the necessary approvals before activating or transferring the license. Investment ownership is not the same as simply renting the license to an unrelated operator.
          </div>
        </div>
      </section>

      <section className="page-shell" style={{ paddingTop: "30px", paddingBottom: "46px" }}>
        <span style={{ color: "#f6a700", fontSize: "10px", fontWeight: 900, letterSpacing: ".13em", textTransform: "uppercase" }}>Purchase process</span>
        <h2 style={{ ...headingStyle, fontSize: "38px", marginTop: "8px" }}>What happens when an existing quota license is purchased?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "15px", marginTop: "22px" }}>
          <article style={cardStyle}><strong style={{ color: "#f6a700" }}>1. Identify</strong><p style={{ ...paragraphStyle, marginTop: "10px" }}>Confirm the county, exact license record, series, status, asking price and intended use.</p></article>
          <article style={cardStyle}><strong style={{ color: "#f6a700" }}>2. Contract and diligence</strong><p style={{ ...paragraphStyle, marginTop: "10px" }}>The parties document the purchase, investigate the license and transaction, address transfer documents and fees, and close under their agreement.</p></article>
          <article style={cardStyle}><strong style={{ color: "#f6a700" }}>3. Transfer and status</strong><p style={{ ...paragraphStyle, marginTop: "10px" }}>The buyer must qualify and complete the applicable state transfer process. If no location is ready, the license may need to remain inactive or in escrow until later activation.</p></article>
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

      <div className="page-shell" style={{ paddingTop: "20px", paddingBottom: "38px", color: "#91a3b1", fontSize: "12px", lineHeight: 1.65 }}>
        Florida Liquor License Market provides marketplace and educational information, not legal or licensing advice. Eligibility, ownership, transferability, active-operation requirements, inactive status, zoning, premises approval and license privileges are determined by applicable law and the Florida Division of Alcoholic Beverages and Tobacco.
      </div>
    </main>
  );
}
