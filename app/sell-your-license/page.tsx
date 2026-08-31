import type { Metadata } from "next";
import Link from "next/link";

import ListYourLicenseMockup from "@/components/ListYourLicenseMockup";
import "@/app/resources/forms/abt-forms.css";
import "@/app/sell-your-license-preview/list-your-license-preview.css";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License for Sale | FLLM",
  description:
    "List a Florida quota liquor license for sale through Florida Liquor License Market. Choose a self-directed marketplace listing or request broker-assisted transaction support.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/sell-your-license",
    title: "List Your Florida Liquor License for Sale | FLLM",
    description:
      "Create a self-directed Florida liquor-license listing or request broker-assisted transaction support.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SellYourLicensePage() {
  return (
    <>
      <ListYourLicenseMockup />
      <section
        aria-label="Florida liquor license seller guide"
        style={{
          background: "#071d33",
          borderTop: "1px solid rgba(237,169,26,.28)",
          padding: "30px 20px",
          color: "#eef3f7",
        }}
      >
        <div
          style={{
            width: "min(1120px, 100%)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) auto",
            gap: 24,
            alignItems: "center",
          }}
        >
          <div>
            <strong style={{ display: "block", color: "#eda91a", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
              Seller Education
            </strong>
            <h2 style={{ margin: "0 0 8px", color: "#fff", fontSize: 25 }}>
              Learn how to sell a Florida liquor license before you list
            </h2>
            <p style={{ margin: 0, color: "#bdcbd6", lineHeight: 1.65 }}>
              Review FLLM&apos;s 7-step seller guide covering value, listing strategy, buyer due diligence, negotiation, ABT-6002 transfer preparation and closing.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link
              href="/how-to-sell-florida-liquor-license"
              style={{
                display: "inline-flex",
                minHeight: 44,
                alignItems: "center",
                padding: "0 18px",
                borderRadius: 7,
                background: "#eda91a",
                color: "#061728",
                fontWeight: 900,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              How to Sell a Florida Liquor License
            </Link>
            <Link
              href="/free-guide"
              style={{
                display: "inline-flex",
                minHeight: 44,
                alignItems: "center",
                padding: "0 18px",
                borderRadius: 7,
                border: "1px solid rgba(255,255,255,.35)",
                color: "#fff",
                fontWeight: 800,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Download Free Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
