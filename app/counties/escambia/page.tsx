import type { Metadata } from "next";
import Link from "next/link";
import CountyPage from "../[slug]/page";

export const metadata: Metadata = {
  title: "Escambia County Liquor License for Sale | 4COP & 3PS | FLLM",
  description:
    "Browse Escambia County liquor licenses for sale, including current 4COP and 3PS quota-license opportunities, asking prices, Pensacola market data, financing and appraisal resources.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/counties/escambia",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/counties/escambia",
    title: "Escambia County Liquor License for Sale | 4COP & 3PS | FLLM",
    description:
      "Browse Escambia County liquor licenses for sale, including current 4COP and 3PS quota-license opportunities, asking prices, Pensacola market data, financing and appraisal resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function EscambiaCountyPage() {
  const countyPage = await CountyPage({ params: Promise.resolve({ slug: "escambia" }) });

  return (
    <>
      {countyPage}
      <section
        aria-labelledby="escambia-market-focus"
        style={{
          background: "linear-gradient(145deg,#061b2b,#03111d)",
          color: "#e8eef2",
          borderTop: "1px solid rgba(246,167,0,.45)",
          borderBottom: "1px solid rgba(246,167,0,.35)",
          padding: "42px 20px",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <span
            style={{
              display: "block",
              marginBottom: 8,
              color: "#f6a700",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Escambia County Market Focus
          </span>
          <h2
            id="escambia-market-focus"
            style={{
              margin: "0 0 14px",
              color: "#fff",
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: "clamp(30px,4vw,44px)",
              lineHeight: 1.08,
            }}
          >
            Escambia County Liquor Licenses for Sale
          </h2>
          <p style={{ maxWidth: 930, margin: "0 0 18px", lineHeight: 1.7, color: "#d3dde4" }}>
            Florida Liquor License Market tracks current Escambia County 4COP and 3PS quota-license opportunities and provides county-level market context for buyers, sellers and brokers. Quota licenses remain county-specific, and any transfer, change of series, premises use or relocation remains subject to applicable DBPR, local zoning and other regulatory requirements.
          </p>
          <p style={{ maxWidth: 930, margin: "0 0 22px", lineHeight: 1.7, color: "#d3dde4" }}>
            FLLM&apos;s current Escambia County marketplace includes a premium third-party broker listing represented by Lawrence Moore of GAI: Gibson and Associates, Inc. FLLM preserves the broker as the primary transaction contact and uses the county market page to direct qualified buyer interest to the broker&apos;s listing rather than competing with it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/listings/fllm-022"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                padding: "0 18px",
                borderRadius: 5,
                background: "linear-gradient(145deg,#ffc32d,#ed9200)",
                color: "#07131d",
                fontWeight: 900,
                textDecoration: "none",
              }}
            >
              View Escambia County 4COP Broker Listing
            </Link>
            <Link
              href="/financing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                padding: "0 18px",
                border: "1px solid #f6a700",
                borderRadius: 5,
                color: "#fff",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Explore License Financing
            </Link>
            <Link
              href="/florida-liquor-license-appraisal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                padding: "0 18px",
                border: "1px solid #f6a700",
                borderRadius: 5,
                color: "#fff",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Order a License Appraisal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
