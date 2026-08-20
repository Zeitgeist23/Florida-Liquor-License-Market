import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/buy-florida-liquor-license`;

export const metadata: Metadata = {
  title: "Buy a Florida Liquor License | 4COP & 3PS Licenses for Sale",
  description:
    "Buy a Florida liquor license with current 4COP and 3PS listings, county market data, pricing guidance, financing resources and DBPR transfer information.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const cardStyle = {
  padding: 22,
  border: "1px solid rgba(233,171,35,.32)",
  borderRadius: 12,
  background: "#0a2134",
} as const;

export default function BuyFloridaLiquorLicensePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#061522",
        color: "#eef5f8",
        fontFamily: "Arial,Helvetica,sans-serif",
      }}
    >
      <header
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "24px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          borderBottom: "1px solid rgba(233,171,35,.35)",
        }}
      >
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 900 }}>
          Florida Liquor License Market
        </Link>
        <Link
          href="/listings"
          style={{
            color: "#071019",
            background: "#f0ab18",
            padding: "11px 16px",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 900,
          }}
        >
          Browse Licenses
        </Link>
      </header>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 20px 54px" }}>
        <p style={{ margin: 0, color: "#f0ab18", fontWeight: 900, letterSpacing: ".08em" }}>
          FLORIDA LIQUOR LICENSE BUYER HUB
        </p>
        <h1
          style={{
            margin: "14px 0 18px",
            maxWidth: 900,
            fontFamily: "Georgia,'Times New Roman',serif",
            fontSize: "clamp(42px,6vw,72px)",
            lineHeight: 1,
          }}
        >
          Buy a Florida Liquor License
        </h1>
        <p style={{ maxWidth: 860, color: "#c9d5dc", fontSize: 18, lineHeight: 1.7 }}>
          Browse Florida liquor licenses for sale and compare 4COP and 3PS inventory, county markets,
          asking prices, financing resources and transfer information.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
          <Link href="/listings" style={{ color: "#071019", background: "#f0ab18", padding: "13px 18px", borderRadius: 6, textDecoration: "none", fontWeight: 900 }}>
            Browse Current Listings
          </Link>
          <Link href="/counties" style={{ color: "#fff", border: "1px solid #496377", padding: "13px 18px", borderRadius: 6, textDecoration: "none", fontWeight: 800 }}>
            Compare County Markets
          </Link>
          <Link href="/florida-liquor-license-value" style={{ color: "#fff", border: "1px solid #496377", padding: "13px 18px", borderRadius: 6, textDecoration: "none", fontWeight: 800 }}>
            Estimate License Value
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "10px 20px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          <article style={cardStyle}>
            <h2 style={{ marginTop: 0, color: "#fff" }}>Choose the county</h2>
            <p style={{ color: "#c5d2da", lineHeight: 1.65 }}>
              Florida quota-license markets are county-specific. Start with the county where the license will be used.
            </p>
            <Link href="/counties" style={{ color: "#f0ab18", fontWeight: 900 }}>Browse counties</Link>
          </article>
          <article style={cardStyle}>
            <h2 style={{ marginTop: 0, color: "#fff" }}>Choose the license type</h2>
            <p style={{ color: "#c5d2da", lineHeight: 1.65 }}>
              Compare 4COP quota and 3PS package-store privileges before comparing asking prices.
            </p>
            <Link href="/resources/florida-liquor-license-types" style={{ color: "#f0ab18", fontWeight: 900 }}>Review license types</Link>
          </article>
          <article style={cardStyle}>
            <h2 style={{ marginTop: 0, color: "#fff" }}>Prepare for transfer</h2>
            <p style={{ color: "#c5d2da", lineHeight: 1.65 }}>
              Verify the subject license, seller, status and applicable DBPR transfer requirements before closing.
            </p>
            <Link href="/dbpr-abt-6002" style={{ color: "#f0ab18", fontWeight: 900 }}>Review ABT-6002</Link>
          </article>
          <article style={cardStyle}>
            <h2 style={{ marginTop: 0, color: "#fff" }}>Explore financing</h2>
            <p style={{ color: "#c5d2da", lineHeight: 1.65 }}>
              Review available financing resources if the transaction will not be completed entirely with cash.
            </p>
            <Link href="/financing" style={{ color: "#f0ab18", fontWeight: 900 }}>Explore financing</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
