import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-marketing-for-brokers`;

export const metadata: Metadata = {
  title: "Florida Liquor License Marketing for Brokers | FLLM",
  description:
    "A Florida liquor license marketing guide for brokers. Learn how to advertise client 4COP quota and 3PS licenses through FLLM while keeping the client relationship and commission.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida Liquor License Marketing for Brokers | FLLM",
    description:
      "How Florida liquor license brokers can market client inventory through a specialized statewide marketplace while remaining the listing representative.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "How can a Florida liquor license broker advertise a client’s license for sale?",
    answer:
      "A broker can submit the client’s Florida quota liquor license to the FLLM marketplace for review. Once approved, the listing can appear in the statewide marketplace and relevant license-type or county market contexts while the submitting broker remains the listing representative and transaction contact.",
  },
  {
    question: "Can brokers advertise 4COP quota licenses on FLLM?",
    answer:
      "Yes. Florida 4COP quota licenses are a core FLLM marketplace category. The broker should accurately identify the county, license series, asking price, client authority and any information needed for review.",
  },
  {
    question: "Can brokers list 3PS package-store licenses on FLLM?",
    answer:
      "Yes. Broker-submitted 3PS-family quota-license inventory can be reviewed for publication on FLLM. The exact series and county should be identified because quota-license designations and market values can differ by county and license type.",
  },
  {
    question: "Does FLLM take part of the broker’s commission?",
    answer:
      "No. Independent broker marketplace listings use a one-time listing-submission fee. FLLM does not seek or receive a share of the submitting broker’s commission for an advertising-only marketplace listing.",
  },
  {
    question: "What is the difference between Standard and Featured broker listings?",
    answer:
      "Standard is the regular marketplace listing. Featured adds the Featured Listing badge and priority marketplace placement for the first 30 days after publication, after which the listing continues as a Standard listing until sold, withdrawn or otherwise removed.",
  },
];

export default function FloridaLiquorLicenseMarketingForBrokersPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Florida Liquor License Marketing for Brokers",
      description:
        "A guide to marketing client 4COP quota and 3PS Florida liquor licenses through a specialized statewide marketplace while the broker remains the listing representative.",
      datePublished: "2026-09-05",
      dateModified: "2026-09-05",
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Florida Liquor License Market" },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor License Broker",
          item: `${siteUrl}/florida-liquor-license-broker`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Marketing for Brokers",
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <main className="seo-market-page broker-marketing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .broker-marketing-page{background:#04111d}
        .broker-marketing-section{padding:68px 20px;background:#061827}
        .broker-marketing-section.alt{background:#04111d}
        .broker-marketing-shell{width:min(1120px,100%);margin:0 auto}
        .broker-marketing-heading{max-width:850px;margin-bottom:28px}
        .broker-marketing-heading>span{color:#eda91a;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .broker-marketing-heading h2{margin:9px 0 12px;color:#fff;font-size:clamp(30px,4vw,43px);line-height:1.1}
        .broker-marketing-heading p{margin:0;color:#bdcad4;font-size:16px;line-height:1.78}
        .broker-marketing-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .broker-marketing-card{padding:24px;border:1px solid rgba(255,255,255,.09);border-radius:13px;background:#071d33}
        .broker-marketing-card b{display:grid;width:38px;height:38px;place-items:center;border-radius:50%;background:#eda91a;color:#061728}
        .broker-marketing-card h3{margin:15px 0 9px;color:#fff;font-size:20px}
        .broker-marketing-card p{margin:0;color:#c4d0da;line-height:1.7}
        .broker-marketing-card a{display:inline-block;margin-top:14px;color:#eda91a;font-weight:900;text-decoration:none}
        .broker-marketing-card a:hover{text-decoration:underline}
        .broker-marketing-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        .broker-marketing-panel{padding:27px;border:1px solid rgba(237,169,26,.3);border-radius:14px;background:linear-gradient(145deg,#0a243a,#05131f)}
        .broker-marketing-panel>span{color:#eda91a;font-size:12px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
        .broker-marketing-panel h3{margin:8px 0 12px;color:#fff;font-size:25px}
        .broker-marketing-panel p{margin:0;color:#c5d1da;line-height:1.75}
        .broker-marketing-panel ul{display:grid;gap:9px;margin:18px 0 0;padding:0;list-style:none}
        .broker-marketing-panel li{position:relative;padding-left:23px;color:#dde5eb;line-height:1.55}
        .broker-marketing-panel li:before{content:"✓";position:absolute;left:0;color:#eda91a;font-weight:900}
        .broker-marketing-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin-top:25px}
        .broker-marketing-links a{display:flex;justify-content:space-between;gap:16px;padding:17px 18px;border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#071d33;color:#fff;font-weight:850;text-decoration:none}
        .broker-marketing-links a:after{content:"→";color:#eda91a}
        .broker-marketing-links a:hover{border-color:#eda91a;color:#eda91a}
        .broker-marketing-note{margin-top:24px;padding:16px 18px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#b8c6d1;font-size:13px;line-height:1.72}
        .broker-marketing-faq{padding:68px 20px;background:#061827}
        .broker-marketing-faq-shell{width:min(900px,100%);margin:0 auto}
        .broker-marketing-faq-shell>span{color:#eda91a;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .broker-marketing-faq h2{margin:8px 0 20px;color:#fff;font-size:36px}
        .broker-marketing-faq details{border-bottom:1px solid rgba(255,255,255,.1)}
        .broker-marketing-faq summary{padding:18px 0;color:#fff;font-weight:850;cursor:pointer}
        .broker-marketing-faq details p{margin:0;padding:0 0 18px;color:#bdcad4;line-height:1.75}
        .broker-marketing-final{padding:62px 20px;text-align:center;background:#071d33;border-top:1px solid rgba(237,169,26,.2)}
        .broker-marketing-final h2{margin:0;color:#fff;font-size:35px}
        .broker-marketing-final p{max-width:760px;margin:12px auto 22px;color:#c0ccd5;line-height:1.72}
        .broker-marketing-final-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
        .broker-marketing-final-actions a{display:inline-flex;min-height:46px;align-items:center;padding:0 19px;border-radius:8px;font-weight:900;text-decoration:none}
        .broker-marketing-final-actions .gold{background:#eda91a;color:#061728}
        .broker-marketing-final-actions .outline{border:1px solid rgba(255,255,255,.3);color:#fff}
        @media(max-width:820px){.broker-marketing-grid{grid-template-columns:1fr}.broker-marketing-two,.broker-marketing-links{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="/brokers/list-your-license"
          primaryActionLabel="List a Client License"
        />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-broker">Broker Services</Link><span>›</span><strong>Marketing for Brokers</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Broker Marketing Guide</span>
              <h1>Florida Liquor License Marketing for Brokers</h1>
              <p>
                A specialized liquor-license marketplace gives Florida brokers another way to expose client inventory without replacing the broker relationship. FLLM lets an independent broker advertise a client&apos;s 4COP quota or 3PS license while the broker remains the identified representative and transaction contact.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/brokers/list-your-license">List a Client&apos;s Florida Liquor License</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/listings">View Marketplace Listings</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="FLLM broker listing advantages">
              <span>Broker Listing Model</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>$14.95</strong><small>Standard one-time listing</small></div>
                <div><strong>$24.95</strong><small>Featured one-time listing</small></div>
                <div><strong>0%</strong><small>FLLM share of broker commission</small></div>
                <div><strong>67</strong><small>Florida county markets</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="broker-marketing-section">
        <div className="broker-marketing-shell">
          <div className="broker-marketing-heading">
            <span>Why a Specialized Marketplace</span>
            <h2>Market the license where buyers are already comparing Florida quota inventory</h2>
            <p>
              A general business-for-sale page can bury the license inside a larger transaction. FLLM is organized around Florida liquor licenses themselves, so buyers can compare inventory by county, license type and asking price before opening an individual listing page.
            </p>
          </div>
          <div className="broker-marketing-grid">
            <article className="broker-marketing-card">
              <b>1</b>
              <h3>Statewide marketplace exposure</h3>
              <p>Approved broker inventory can appear alongside other current Florida liquor licenses for sale, giving buyers a dedicated place to compare opportunities.</p>
              <Link href="/listings">View current listings →</Link>
            </article>
            <article className="broker-marketing-card">
              <b>2</b>
              <h3>License-type context</h3>
              <p>4COP and 3PS buyers can review the broader market around a listing instead of seeing the license in isolation.</p>
              <Link href="/florida-4cop-liquor-license-for-sale">Explore 4COP inventory →</Link>
            </article>
            <article className="broker-marketing-card">
              <b>3</b>
              <h3>County market context</h3>
              <p>Quota-license economics are county-specific. FLLM county pages help place an asking price and available inventory in the correct local market.</p>
              <Link href="/counties">Browse county markets →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="broker-marketing-section alt">
        <div className="broker-marketing-shell">
          <div className="broker-marketing-heading">
            <span>4COP and 3PS Inventory</span>
            <h2>Build the listing around the license buyers are actually searching for</h2>
            <p>
              A broker listing should identify the license series, county, asking price and transaction contact clearly. That gives the listing a better chance of matching the buyer&apos;s actual search intent while keeping the broker&apos;s role unmistakable.
            </p>
          </div>
          <div className="broker-marketing-two">
            <article className="broker-marketing-panel">
              <span>4COP Quota</span>
              <h3>Full-liquor quota inventory</h3>
              <p>4COP quota licenses are among the most actively traded transferable Florida quota-license assets and are valued within their county market.</p>
              <ul>
                <li>Identify the county and exact series</li>
                <li>Use a defensible asking price</li>
                <li>Explain material license status information</li>
                <li>Route buyer inquiries to the listing broker</li>
              </ul>
            </article>
            <article className="broker-marketing-panel">
              <span>3PS Family</span>
              <h3>Package-store quota inventory</h3>
              <p>3PS-family licenses serve the package-store market. The exact series and market value can vary by county, so accurate classification matters.</p>
              <ul>
                <li>Confirm the applicable 3PS-family designation</li>
                <li>Identify the correct county market</li>
                <li>State the asking price and availability clearly</li>
                <li>Keep the broker as the transaction contact</li>
              </ul>
            </article>
          </div>
          <div className="broker-marketing-links">
            <Link href="/florida-4cop-liquor-license-for-sale">Florida 4COP liquor licenses for sale</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS liquor licenses for sale</Link>
            <Link href="/florida-quota-liquor-license-market-report">Florida quota-license market report</Link>
            <Link href="/florida-liquor-license-value">Florida liquor license value tools</Link>
          </div>
        </div>
      </section>

      <section className="broker-marketing-section">
        <div className="broker-marketing-shell">
          <div className="broker-marketing-heading">
            <span>Keep the Relationship</span>
            <h2>FLLM advertising does not replace the independent broker</h2>
            <p>
              The central distinction is representation. An independent broker-submitted FLLM listing is advertising, not a transfer of the client relationship to FLLM. The submitting broker remains responsible for the client, communications, negotiation and transaction unless a separate written agreement expressly provides otherwise.
            </p>
          </div>
          <div className="broker-marketing-two">
            <article className="broker-marketing-panel">
              <span>Standard</span>
              <h3>$14.95 one-time listing</h3>
              <p>Regular marketplace placement for an approved client license. The listing remains active until sold, withdrawn or otherwise removed under FLLM marketplace rules.</p>
            </article>
            <article className="broker-marketing-panel">
              <span>Featured</span>
              <h3>$24.95 with 30-day priority placement</h3>
              <p>Featured adds the Featured Listing badge and priority marketplace placement for the first 30 days, then continues as a Standard listing.</p>
            </article>
          </div>
          <div className="broker-marketing-note">
            Publication is subject to FLLM review for authority, accuracy and marketplace fit. Marketplace exposure does not guarantee a buyer, sale price, transfer approval or closing.
          </div>
        </div>
      </section>

      <section className="broker-marketing-section alt">
        <div className="broker-marketing-shell">
          <div className="broker-marketing-heading">
            <span>Extend the Listing</span>
            <h2>Link the broker&apos;s own website directly to the FLLM listing</h2>
            <p>
              Once a listing is live, the broker can use the free FLLM link kit to create a direct link from the brokerage website or listing page to the current FLLM marketplace detail page. That gives buyers a clean path to the active license information while reinforcing the broker as the transaction contact.
            </p>
          </div>
          <div className="broker-marketing-links">
            <Link href="/brokers/link-to-your-fllm-listing">Open the broker link kit</Link>
            <Link href="/brokers/list-your-license">List a Florida liquor license</Link>
            <Link href="/florida-liquor-license-broker">Review FLLM broker services</Link>
            <Link href="/how-to-sell-florida-liquor-license">How to sell a Florida liquor license</Link>
          </div>
        </div>
      </section>

      <section className="broker-marketing-faq">
        <div className="broker-marketing-faq-shell">
          <span>Broker Marketing FAQ</span>
          <h2>Common questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="broker-marketing-final">
        <h2>Ready to add a client license to the FLLM marketplace?</h2>
        <p>
          Submit the broker, client-authority and license information, choose Standard or Featured exposure, and keep your role as the listing representative and transaction contact.
        </p>
        <div className="broker-marketing-final-actions">
          <Link className="gold" href="/brokers/list-your-license">List a Client&apos;s Florida Liquor License</Link>
          <Link className="outline" href="/listings">View the Marketplace</Link>
        </div>
      </section>
    </main>
  );
}
