import type { Metadata } from "next";
import Link from "next/link";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/counties/hillsborough`;

export const metadata: Metadata = {
  title: "Tampa Liquor License for Sale | Hillsborough 4COP & 3PS",
  description:
    "Find Tampa liquor licenses for sale in Hillsborough County. Compare current 4COP and 3PS quota-license listings, asking prices, county market data, financing and license values on FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Tampa Liquor License for Sale | Hillsborough 4COP & 3PS",
    description:
      "Compare Tampa-area 4COP and 3PS liquor licenses for sale in Hillsborough County, including current inventory, asking prices, market data and buyer resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function HillsboroughCountyPage() {
  const countyPage = await CountyPage({ params: Promise.resolve({ slug: "hillsborough" }) });

  return (
    <>
      <section
        aria-label="Tampa liquor license market overview"
        style={{
          background: "#061728",
          borderBottom: "1px solid rgba(246,167,0,.35)",
          color: "#dce6ee",
          padding: "14px 20px",
        }}
      >
        <div style={{ width: "min(1180px, calc(100% - 20px))", margin: "0 auto", lineHeight: 1.6 }}>
          <strong style={{ color: "#f6a700" }}>Tampa liquor licenses for sale</strong>{" "}
          are part of the Hillsborough County quota-license market. Buyers searching for a Tampa 4COP or 3PS license can compare active Hillsborough County inventory, disclosed asking prices and market data on this page. Quota licenses remain county-specific, so a Tampa location must use an eligible Hillsborough County license and satisfy applicable premises and transfer requirements.{" "}
          <Link href="/florida-4cop-liquor-license-for-sale" style={{ color: "#f6b51f", fontWeight: 800 }}>4COP market</Link>{" · "}
          <Link href="/florida-3ps-liquor-license-for-sale" style={{ color: "#f6b51f", fontWeight: 800 }}>3PS market</Link>{" · "}
          <Link href="/financing" style={{ color: "#f6b51f", fontWeight: 800 }}>Financing</Link>
        </div>
      </section>
      {countyPage}
    </>
  );
}
