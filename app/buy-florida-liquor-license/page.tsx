import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buy a Florida Liquor License | 4COP & 3PS Licenses for Sale",
  description:
    "Buy a Florida liquor license. Browse current 4COP and 3PS licenses for sale by county, compare market values, review financing options, and learn Florida transfer requirements.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/buy-florida-liquor-license",
  },
};

export default function BuyFloridaLiquorLicensePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#061728", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px" }}>
        <Link href="/" style={{ color: "#e7b84b", textDecoration: "none", fontWeight: 700 }}>Florida Liquor License Market</Link>
        <p style={{ marginTop: 42, color: "#e7b84b", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2 }}>Florida Buyer Guide & Marketplace</p>
        <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1, maxWidth: 850, margin: "14px 0 22px" }}>Buy a Florida Liquor License</h1>
        <p style={{ maxWidth: 820, fontSize: 20, lineHeight: 1.65, color: "#d4dde5" }}>
          Browse Florida liquor licenses for sale and compare current 4COP and 3PS inventory by county, asking price and availability. Use FLLM market data, valuation tools, financing resources and transfer guides before you buy.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
          <Link href="/listings" style={{ background: "#e7b84b", color: "#061728", padding: "14px 20px", textDecoration: "none", fontWeight: 900, borderRadius: 4 }}>Browse Licenses for Sale</Link>
          <Link href="/florida-4cop-liquor-license-for-sale" style={{ border: "1px solid #e7b84b", color: "#fff", padding: "14px 20px", textDecoration: "none", fontWeight: 800, borderRadius: 4 }}>4COP Licenses</Link>
          <Link href="/florida-3ps-liquor-license-for-sale" style={{ border: "1px solid #e7b84b", color: "#fff", padding: "14px 20px", textDecoration: "none", fontWeight: 800, borderRadius: 4 }}>3PS Licenses</Link>
        </div>
      </section>

      <section style={{ background: "#fff", color: "#102235" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
          <h2 style={{ fontSize: 36, marginTop: 0 }}>How to buy a Florida liquor license</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 900 }}>
            Start with the Florida county where the license will be used, then identify the license privileges the business needs. Compare current listings and asking prices, verify the specific license and seller, review transfer requirements and transaction terms, and confirm the proposed premises and zoning before closing.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginTop: 30 }}>
            <Link href="/counties" style={{ padding: 22, border: "1px solid #d9dee3", color: "#102235", textDecoration: "none" }}><strong>1. Choose the county</strong><br /><span>Compare Florida county markets and inventory.</span></Link>
            <Link href="/resources/florida-liquor-license-types" style={{ padding: 22, border: "1px solid #d9dee3", color: "#102235", textDecoration: "none" }}><strong>2. Choose the license type</strong><br /><span>Compare 4COP, 3PS and other license privileges.</span></Link>
            <Link href="/listings" style={{ padding: 22, border: "1px solid #d9dee3", color: "#102235", textDecoration: "none" }}><strong>3. Compare listings</strong><br /><span>Review current asking prices and availability.</span></Link>
            <Link href="/dbpr-abt-6002" style={{ padding: 22, border: "1px solid #d9dee3", color: "#102235", textDecoration: "none" }}><strong>4. Review the transfer</strong><br /><span>Use FLLM's ABT-6002 transfer resources.</span></Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: 36 }}>Compare price, financing and transfer resources</h2>
        <p style={{ color: "#d4dde5", fontSize: 18, lineHeight: 1.7, maxWidth: 900 }}>
          Florida quota liquor licenses do not have one statewide market value. Pricing varies by county, license type, supply, demand, seller terms and market conditions. Compare the license you are considering with current county inventory and verify transaction-specific requirements before closing.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          <Link href="/florida-liquor-license-value" style={{ color: "#e7b84b", fontWeight: 800 }}>Estimate License Value</Link>
          <Link href="/financing" style={{ color: "#e7b84b", fontWeight: 800 }}>Explore Financing</Link>
          <Link href="/resources/forms" style={{ color: "#e7b84b", fontWeight: 800 }}>Florida ABT Forms</Link>
          <Link href="/counties" style={{ color: "#e7b84b", fontWeight: 800 }}>Browse All 67 Counties</Link>
        </div>
      </section>
    </main>
  );
}
