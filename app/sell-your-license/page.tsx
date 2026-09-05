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
    "Yes. Florida Liquor License Market gives sellers two primary paths: full-service broker-assisted representation under a separate written brokerage agreement, or a self-directed online marketplace listing for sellers who prefer to manage the transaction themselves.",
};

const fullServiceFaq = {
  question: "Does FLLM offer full-service broker-assisted representation?",
  answer:
    "Yes. Sellers who want professional representation can request a broker consultation through FLLM. Depending on the written engagement, full-service broker-assisted representation may include pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, transaction coordination, document organization, and coordination with the legal, licensing, financing, escrow or closing professionals involved in the transaction.",
};

export const metadata: Metadata = {
  title: "Sell Your Florida Liquor License | Full-Service or Self-Directed | FLLM",
  description:
    "Sell a Florida liquor license through FLLM with full-service broker-assisted representation for pricing, marketing, buyer communications, negotiation and transaction coordination, or choose a self-directed online marketplace listing.",
  alternates: {
    canonical: canonicalUrl,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Sell Your Florida Liquor License | Full-Service or Self-Directed | FLLM",
    description:
      "Choose full-service broker-assisted representation or a self-directed Florida liquor-license marketplace listing based on the level of professional help you want.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SellYourLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Sell Your Florida Liquor License",
      url: canonicalUrl,
      description:
        "Sell a Florida liquor license through FLLM using full-service broker-assisted representation or a self-directed online marketplace listing.",
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [onlineListingFaq, fullServiceFaq].map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Sell Your License", item: canonicalUrl },
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
        aria-label="Full-service broker-assisted representation"
        style={{
          background: "#071d33",
          borderTop: "1px solid rgba(237,169,26,.3)",
          borderBottom: "1px solid rgba(237,169,26,.3)",
          padding: "54px 20px",
          color: "#eef3f7",
        }}
      >
        <div
          style={{
            width: "min(1120px, 100%)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.2fr) minmax(280px,.8fr)",
            gap: 30,
            alignItems: "center",
          }}
        >
          <div>
            <strong
              style={{
                display: "block",
                color: "#eda91a",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: ".09em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Full-Service Broker-Assisted Representation
            </strong>
            <h2 style={{ margin: "0 0 12px", color: "#fff", fontSize: "clamp(30px,4vw,42px)", lineHeight: 1.1 }}>
              Want professional help from pricing strategy through transaction coordination?
            </h2>
            <p style={{ margin: "0 0 13px", color: "#c5d1da", fontSize: 17, lineHeight: 1.75, maxWidth: 790 }}>
              FLLM is not limited to self-service listings. Sellers who want hands-on professional representation can request a broker consultation. Depending on the written brokerage agreement, services may include market positioning and pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, transaction coordination, document organization, and coordination with the professionals involved in the transfer and closing.
            </p>
            <p style={{ margin: 0, color: "#aebdca", lineHeight: 1.7, maxWidth: 790 }}>
              Representation, exclusivity, scope of services and compensation are established only in a separate written brokerage agreement. Selecting the broker-assisted path on FLLM is a request for contact and does not by itself create a brokerage relationship.
            </p>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <Link
              href="/sell-your-license#listing-options"
              style={{
                display: "flex",
                minHeight: 50,
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px",
                borderRadius: 8,
                background: "#eda91a",
                color: "#061728",
                fontWeight: 900,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Request Full-Service Broker Representation
            </Link>
            <Link
              href="/florida-liquor-license-broker"
              style={{
                display: "flex",
                minHeight: 48,
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.3)",
                color: "#fff",
                fontWeight: 850,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Review Broker Services
            </Link>
          </div>
        </div>
      </section>

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
              Self-Directed Marketplace Alternative
            </strong>
            <h2 style={{ margin: "0 0 8px", color: "#071d33", fontSize: 27 }}>
              Prefer to manage the transaction yourself? Add 30 days of priority placement for $24.95
            </h2>
            <p style={{ margin: 0, color: "#536373", lineHeight: 1.65, maxWidth: 760 }}>
              Featured self-directed listings are designed for experienced sellers who want marketplace exposure while retaining direct control of buyer communications, negotiation and transaction management. They receive a Featured badge and priority placement for the first 30 days after publication, with no FLLM commission on the sale.
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
              Create Featured Self-Directed Listing — $24.95
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
              Learn how to sell a Florida liquor license before you choose a selling path
            </h2>
            <p style={{ margin: 0, color: "#bdcbd6", lineHeight: 1.65 }}>
              Review FLLM&apos;s 7-step seller guide covering value, full-service broker representation, self-directed listings, buyer due diligence, negotiation, ABT-6002 transfer preparation and closing.
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
            Sell a Florida liquor license online with the level of service you choose
          </h2>
          <p style={{ margin: "0 0 13px", color: "#4d6070", fontSize: 17, lineHeight: 1.78 }}>
            Florida Liquor License Market combines specialized statewide marketplace exposure with two distinct seller paths. Sellers who want professional representation can request full-service broker-assisted help with pricing strategy, marketing, buyer communications, negotiation and transaction coordination under a written brokerage agreement. Sellers who prefer direct control can instead choose a self-directed online marketplace listing.
          </p>
          <p style={{ margin: "0 0 28px", color: "#4d6070", fontSize: 17, lineHeight: 1.78 }}>
            FLLM is designed for transferable Florida quota-license opportunities, including 4COP-family and 3PS-family licenses, with market information organized by county and license type so buyers and sellers can evaluate opportunities across Florida.
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
              href="/sell-your-license#listing-options"
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
              Compare Full-Service & Self-Directed Options
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

          {[fullServiceFaq, onlineListingFaq].map((faq) => (
            <details
              key={faq.question}
              style={{
                borderTop: "1px solid #d9d1c4",
                borderBottom: "1px solid #d9d1c4",
                padding: "17px 0",
              }}
            >
              <summary style={{ cursor: "pointer", color: "#071d33", fontSize: 18, fontWeight: 900 }}>
                {faq.question}
              </summary>
              <p style={{ margin: "13px 0 0", color: "#536373", lineHeight: 1.72 }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}