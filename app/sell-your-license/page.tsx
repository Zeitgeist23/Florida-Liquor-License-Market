import type { Metadata } from "next";
import Link from "next/link";

import ListYourLicenseMockup from "@/components/ListYourLicenseMockup";
import "@/app/resources/forms/abt-forms.css";
import "@/app/sell-your-license-preview/list-your-license-preview.css";
import "./seller-card-readability.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/sell-your-license`;

const onlineListingFaq = {
  question: "Can I list a Florida liquor license for sale online?",
  answer:
    "Yes. Florida liquor-license owners can list a quota license for sale online through Florida Liquor License Market. FLLM offers self-directed marketplace listings and separate broker-assisted options for sellers who want additional transaction support.",
};

export const metadata: Metadata = {
  title: "List Your Florida Liquor License for Sale | FLLM",
  description:
    "List a Florida quota liquor license for sale online through Florida Liquor License Market. Choose a $14.95 Standard self-directed listing, a $24.95 Featured self-directed listing, or request broker-assisted transaction support.",
  alternates: {
    canonical: canonicalUrl,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "List Your Florida Liquor License for Sale | FLLM",
    description:
      "List a Florida liquor license for sale online with a Standard or Featured self-directed marketplace listing, or request separate broker-assisted transaction support.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SellYourLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "List Your Florida Liquor License for Sale",
      url: canonicalUrl,
      description:
        "List and advertise a Florida quota liquor license for sale online through Florida Liquor License Market.",
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: onlineListingFaq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: onlineListingFaq.answer,
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "List Your License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

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

      <section
        aria-label="Online Florida liquor license marketplace"
        style={{
          background: "#f7f5ef",
          borderTop: "1px solid #e6dfd2",
          padding: "58px 20px 62px",
          color: "#071d33",
        }}
      >
        <div style={{ width: "min(960px, 100%)", margin: "0 auto" }}>
          <strong
            style={{
              display: "block",
              color: "#c88708",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: ".09em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Online Florida Marketplace
          </strong>
          <h2 style={{ margin: "0 0 15px", color: "#071d33", fontSize: "clamp(29px,4vw,40px)", lineHeight: 1.12 }}>
            List a Florida liquor license for sale online
          </h2>
          <p style={{ margin: "0 0 13px", color: "#4d6070", fontSize: 17, lineHeight: 1.78 }}>
            Florida Liquor License Market gives Florida license owners a direct way to advertise a quota liquor license for sale online. A self-directed listing lets the owner set the asking price, publish marketplace details, receive buyer inquiries and manage the transaction. Sellers who want additional help can separately request broker-assisted support.
          </p>
          <p style={{ margin: "0 0 28px", color: "#4d6070", fontSize: 17, lineHeight: 1.78 }}>
            The online Florida liquor license marketplace is designed for transferable quota-license opportunities, including 4COP-family and 3PS-family licenses, with market information organized by county and license type so buyers can find current opportunities across Florida.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 12,
              marginBottom: 30,
            }}
          >
            <Link
              href="/sell-your-license?method=self#listing-options"
              style={{
                display: "flex",
                minHeight: 50,
                alignItems: "center",
                justifyContent: "center",
                padding: "0 18px",
                borderRadius: 8,
                background: "#eda91a",
                color: "#061728",
                fontWeight: 900,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              List Your License Online
            </Link>
            <Link
              href="/listings"
              style={{
                display: "flex",
                minHeight: 50,
                alignItems: "center",
                justifyContent: "center",
                padding: "0 18px",
                borderRadius: 8,
                border: "1px solid #173652",
                background: "#fff",
                color: "#071d33",
                fontWeight: 850,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              View Florida Marketplace Listings
            </Link>
          </div>

          <details
            style={{
              borderTop: "1px solid #d9d1c4",
              borderBottom: "1px solid #d9d1c4",
              padding: "17px 0",
            }}
          >
            <summary style={{ cursor: "pointer", color: "#071d33", fontSize: 18, fontWeight: 900 }}>
              {onlineListingFaq.question}
            </summary>
            <p style={{ margin: "13px 0 0", color: "#536373", lineHeight: 1.72 }}>
              {onlineListingFaq.answer}
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
