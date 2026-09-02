import type { Metadata } from "next";
import Link from "next/link";

import ListYourLicenseMockup from "@/components/ListYourLicenseMockup";
import "@/app/resources/forms/abt-forms.css";
import "@/app/sell-your-license-preview/list-your-license-preview.css";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License for Sale | FLLM",
  description:
    "List a Florida quota liquor license for sale through Florida Liquor License Market. Choose a $14.95 Standard self-directed listing, a $24.95 Featured self-directed listing, or request broker-assisted transaction support.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/sell-your-license",
    title: "List Your Florida Liquor License for Sale | FLLM",
    description:
      "Create a Standard or Featured self-directed Florida liquor-license listing or request broker-assisted transaction support.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SellYourLicensePage() {
  return (
    <>
      <ListYourLicenseMockup />

      <section
        aria-label="Featured self-directed listing option"
        style={{
          background: "#fffaf0",
          borderTop: "1px solid rgba(200,137,8,.25)",
          borderBottom: "1px solid rgba(200,137,8,.25)",
          padding: "34px 20px",
          color: "#071d33",
        }}
      >
        <div
          style={{
            width: "min(1120px, 100%)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) auto",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div>
            <strong
              style={{
                display: "inline-flex",
                padding: "5px 9px",
                borderRadius: 999,
                background: "#071d33",
                color: "#eda91a",
                fontSize: 11,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Featured Self-Directed Listing
            </strong>
            <h2 style={{ margin: "0 0 8px", color: "#071d33", fontSize: 27 }}>
              Add 30 days of priority marketplace placement for $24.95
            </h2>
            <p style={{ margin: 0, color: "#536373", lineHeight: 1.65, maxWidth: 760 }}>
              Featured self-directed listings receive a Featured badge and priority placement for the first 30 days after publication. Buyer inquiries still go directly to you, there is no FLLM commission, and the listing continues as a Standard listing after the Featured period.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch" }}>
            <Link
              href="/sell-your-license/featured"
              style={{
                display: "inline-flex",
                minHeight: 46,
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px",
                borderRadius: 7,
                background: "#eda91a",
                color: "#061728",
                fontWeight: 900,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Create Featured Listing — $24.95
            </Link>
            <span style={{ textAlign: "center", fontSize: 12, color: "#677584" }}>
              One-time fee · Secure Stripe checkout
            </span>
          </div>
        </div>
      </section>

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
