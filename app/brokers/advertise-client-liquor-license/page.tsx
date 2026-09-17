import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import type { Listing } from "@/data/listings";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/brokers/advertise-client-liquor-license`;
const antezzaUrl = "/listings/fllm-antezza";
const featuredHref = "/brokers/list-your-license#featured-listing-option";

export const metadata: Metadata = {
  title: "Advertise a Client Liquor License | $24.95 Featured Broker Listing | FLLM",
  description:
    "See the FLLM $24.95 Featured independent-broker listing card and dedicated broker detail page before advertising a client's Florida liquor license.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    siteName: "Florida Liquor License Market",
    title: "Featured Broker Liquor License Advertising | FLLM",
    description:
      "See exactly what a $24.95 Featured broker listing looks like on Florida Liquor License Market.",
  },
};

const featuredExample: Listing = {
  county: "Pinellas County",
  type: "4COP Quota",
  price: 495000,
  priceLabel: "$495,000",
  sourceRef: "FLLM-ANTEZZA",
  sourceName: "Florida Liquor License Market",
  featuredUntil: "2026-10-16",
  publishedAt: "2026-09-16",
  licenseStatus: "Available / Broker confirmation required",
  note: "Featured independent broker listing represented by Alessandro Antezza of SUNSHINEAGLE LLC.",
  image: "/assets/license-market/license-04.png",
};

const benefits = [
  ["Featured marketplace card", "Priority placement and the FLLM Featured Listing badge for the first 30 days."],
  ["Dedicated broker detail page", "A polished listing page built around the license, county, asking price and your broker identity."],
  ["Broker contact stays visible", "Your name, brokerage, phone, email and website remain part of the buyer experience."],
  ["Buyer inquiries route to you", "You remain the independent listing broker and transaction contact."],
  ["No commission share", "The $24.95 charge is a one-time advertising fee. FLLM does not take part of your commission."],
  ["Florida-specific exposure", "Your listing appears inside a marketplace focused specifically on Florida liquor licenses."],
];

const steps = [
  ["Choose Featured", "Select the $24.95 Featured independent-broker listing."],
  ["Submit the listing", "Provide county, license type, asking price, broker contact and package details."],
  ["FLLM reviews it", "FLLM checks the submission for marketplace fit and presentation."],
  ["Go live", "Approved listings receive the Featured card and dedicated broker detail page."],
];

export default function AdvertiseClientLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Advertise a Client’s Florida Liquor License on FLLM",
      url: canonicalUrl,
      description: "FLLM broker advertising page showing the $24.95 Featured listing format.",
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "FLLM Featured Independent Broker Listing",
      serviceType: "Florida liquor license marketplace advertising",
      provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      areaServed: { "@type": "State", name: "Florida" },
      offers: { "@type": "Offer", price: "24.95", priceCurrency: "USD", url: `${siteUrl}${featuredHref}` },
    },
  ];

  return (
    <main className="broker-featured-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .broker-featured-page{--gold:#f1a600;--gold2:#ffc13b;--cyan:#69d6ff;--navy:#071927;--navy2:#0b2942;--panel:#0b2130;background:#061522;color:#fff;min-height:100vh;overflow-x:hidden}
        .broker-featured-page *{box-sizing:border-box}
        .bf-header{position:relative;z-index:50;border-bottom:1px solid rgba(241,166,0,.55);background:#020d16}
        .bf-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .bf-hero{padding:58px 0 62px;background:radial-gradient(circle at 86% 22%,rgba(105,214,255,.08),transparent 29%),linear-gradient(135deg,#061725 0%,#0a2943 100%);border-bottom:1px solid rgba(241,166,0,.38)}
        .bf-hero-grid{display:grid;grid-template-columns:minmax(0,1.18fr) minmax(300px,.62fr);gap:54px;align-items:center}
        .bf-eyebrow{display:block;margin-bottom:10px;color:var(--gold);font-size:12px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .bf-hero h1{max-width:760px;margin:0;color:#fff;font:700 clamp(38px,4.7vw,58px)/1.02 Georgia,"Times New Roman",serif;letter-spacing:-.025em}
        .bf-hero p{max-width:750px;margin:19px 0 0;color:#d5e0e7;font-size:17px;line-height:1.68}
        .bf-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:27px}
        .bf-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:5px;font-size:12px;font-weight:900;letter-spacing:.02em;text-decoration:none;text-transform:uppercase;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,filter .18s ease}
        .bf-btn.gold{border:1px solid #ffd468;background:linear-gradient(145deg,#ffd56b,#ffc13b 42%,#e59a00);color:#06111b;box-shadow:inset 0 1px 0 rgba(255,255,255,.48),0 7px 15px rgba(0,0,0,.28)}
        .bf-btn.outline{border:1px solid rgba(241,166,0,.85);background:#071a2b;color:#fff}
        .bf-btn:hover,.bf-btn:focus-visible{transform:translateY(-2px);border-color:#ffe29a;box-shadow:0 10px 22px rgba(0,0,0,.34),0 0 16px rgba(241,166,0,.18);outline:none;filter:brightness(1.04)}
        .bf-price-card{padding:26px 28px;border:1px solid rgba(241,166,0,.75);border-radius:9px;background:linear-gradient(145deg,#123d63 0%,#0b2947 60%,#071a2b 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 18px 42px rgba(0,0,0,.3)}
        .bf-price-card>span{color:var(--cyan);font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .bf-price-card strong{display:block;margin:9px 0 2px;color:#fff;font:700 45px/1 Georgia,"Times New Roman",serif}
        .bf-price-card b{display:block;color:var(--gold2);font-size:13px}
        .bf-price-card ul{margin:20px 0 0;padding:18px 0 0 18px;border-top:1px solid rgba(255,255,255,.11);color:#d9e4ea;font-size:13px;line-height:1.8}
        .bf-section{padding:62px 0;background:#0b2942}
        .bf-section.alt{background:#071927}
        .bf-section.black{background:#05090d}
        .bf-heading{max-width:800px;margin-bottom:27px}
        .bf-heading span{color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .bf-heading h2{margin:8px 0 10px;color:#fff;font:700 clamp(29px,3.4vw,42px)/1.08 Georgia,"Times New Roman",serif}
        .bf-heading p{margin:0;color:#c9d6df;font-size:15px;line-height:1.7}
        .bf-benefits{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .bf-benefit{padding:20px;border:1px solid rgba(105,214,255,.28);border-radius:7px;background:linear-gradient(145deg,#0b2130,#061018);box-shadow:0 10px 24px rgba(0,0,0,.2);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
        .bf-benefit:hover{transform:translateY(-3px);border-color:rgba(217,242,255,.7);box-shadow:0 17px 30px rgba(0,0,0,.3)}
        .bf-benefit strong{display:block;color:#fff;font:700 20px/1.18 Georgia,"Times New Roman",serif}
        .bf-benefit p{margin:9px 0 0;color:#cbd8e0;font-size:13px;line-height:1.62}
        .bf-demo-grid{display:grid;grid-template-columns:minmax(320px,400px) minmax(0,1fr);gap:38px;align-items:start}
        .bf-card-stage{padding:16px;border:1px solid rgba(241,166,0,.55);border-radius:9px;background:#061421;box-shadow:0 18px 42px rgba(0,0,0,.3)}
        .bf-card-stage .result-card{margin:0!important;width:100%!important;max-width:none!important}
        .bf-demo-copy{padding:26px 28px;border:1px solid rgba(241,166,0,.42);border-radius:8px;background:linear-gradient(145deg,#10334f,#091f32)}
        .bf-demo-copy h3{margin:0 0 12px;color:#fff;font:700 29px/1.13 Georgia,"Times New Roman",serif}
        .bf-demo-copy p{margin:0 0 13px;color:#d2dde4;font-size:15px;line-height:1.7}
        .bf-demo-copy ul{margin:0 0 21px;padding-left:18px;color:#e7eef2;font-size:14px;line-height:1.78}
        .bf-browser{overflow:hidden;border:1px solid rgba(241,166,0,.65);border-radius:9px;background:#020b12;box-shadow:0 20px 48px rgba(0,0,0,.38)}
        .bf-browser-top{display:flex;align-items:center;gap:7px;height:40px;padding:0 12px;border-bottom:1px solid rgba(255,255,255,.08);background:#081a29}
        .bf-dot{width:8px;height:8px;border-radius:50%;background:#587080}
        .bf-address{flex:1;margin-left:7px;padding:6px 9px;border:1px solid rgba(255,255,255,.08);border-radius:4px;background:#03131f;color:#8ea3b0;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .bf-browser iframe{display:block;width:100%;height:610px;border:0;background:#081d31}
        .bf-caption{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:14px;color:#aebfc9;font-size:12px;line-height:1.5}
        .bf-caption a{color:var(--gold2);font-weight:900;text-decoration:none}
        .bf-proof{display:grid;grid-template-columns:.9fr 1.1fr;gap:30px;align-items:center;padding:28px;border:1px solid rgba(105,214,255,.3);border-radius:9px;background:linear-gradient(145deg,#0a2236,#06131f);box-shadow:0 14px 34px rgba(0,0,0,.25)}
        .bf-proof-badge{padding:25px;border:1px solid rgba(241,166,0,.62);border-radius:8px;background:#102f49}
        .bf-proof-badge span{display:block;color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .bf-proof-badge strong{display:block;margin:8px 0 5px;color:#fff;font:700 34px/1.05 Georgia,"Times New Roman",serif}
        .bf-proof-badge small{color:#b9c9d3;font-size:12px;line-height:1.55}
        .bf-proof-copy h3{margin:0 0 10px;color:#fff;font:700 29px/1.13 Georgia,"Times New Roman",serif}
        .bf-proof-copy p{margin:0 0 11px;color:#d0dce4;font-size:14px;line-height:1.7}
        .bf-proof-copy em{display:block;color:#8fa4b2;font-size:11px;line-height:1.55;font-style:normal}
        .bf-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}
        .bf-step{padding:20px;border:1px solid rgba(241,166,0,.38);border-radius:7px;background:linear-gradient(145deg,#12364e,#0a2438)}
        .bf-step b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--gold);color:#07101a;font-size:12px}
        .bf-step h3{margin:13px 0 7px;color:#fff;font-size:17px}
        .bf-step p{margin:0;color:#cbd7de;font-size:13px;line-height:1.6}
        .bf-final{padding:50px 0;background:linear-gradient(135deg,#0a2943,#0e3a59);border-top:1px solid rgba(241,166,0,.34)}
        .bf-final-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}
        .bf-final h2{margin:6px 0 8px;font:700 clamp(28px,3.5vw,40px)/1.08 Georgia,"Times New Roman",serif}
        .bf-final p{max-width:680px;margin:0;color:#d3dee5;font-size:14px;line-height:1.65}
        .bf-footer{border-top:1px solid rgba(241,166,0,.5);background:#020b12;color:#d3dee5}
        .bf-footer-grid{display:grid;grid-template-columns:minmax(230px,1.3fr) repeat(3,minmax(150px,.7fr));gap:34px;padding:40px 0 30px}
        .bf-footer-brand img{display:block;width:215px;height:auto;margin-bottom:13px}
        .bf-footer-brand p{max-width:290px;margin:0;color:#9fb0bc;font-size:12px;line-height:1.6}
        .bf-footer strong{display:block;margin-bottom:11px;color:#fff;font-size:11px;letter-spacing:.05em;text-transform:uppercase}
        .bf-footer a{display:block;width:fit-content;margin:7px 0;color:#aebdc7;font-size:12px;text-decoration:none}
        .bf-footer a:hover{color:var(--gold2)}
        .bf-legal{padding:15px 0 18px;border-top:1px solid rgba(255,255,255,.07);color:#7f919e;font-size:10px;line-height:1.55}
        @media(max-width:920px){.bf-hero-grid,.bf-demo-grid,.bf-proof{grid-template-columns:1fr}.bf-benefits{grid-template-columns:repeat(2,minmax(0,1fr))}.bf-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.bf-footer-grid{grid-template-columns:1fr 1fr}.bf-browser iframe{height:560px}}
        @media(max-width:620px){.bf-shell{width:min(100% - 26px,1180px)}.bf-hero{padding:42px 0 46px}.bf-hero h1{font-size:38px}.bf-section{padding:48px 0}.bf-benefits,.bf-steps,.bf-footer-grid{grid-template-columns:1fr}.bf-final-inner{align-items:flex-start;flex-direction:column}.bf-browser iframe{height:500px}.bf-caption{align-items:flex-start;flex-direction:column}.bf-price-card{padding:22px}.bf-demo-copy{padding:22px}}
      `}</style>

      <div className="bf-header">
        <FormsSiteHeader primaryActionHref={featuredHref} primaryActionLabel="List Client License" />
      </div>

      <section className="bf-hero">
        <div className="bf-shell bf-hero-grid">
          <div>
            <span className="bf-eyebrow">Featured independent broker advertising</span>
            <h1>Give Your Client’s Liquor License a Premium FLLM Listing</h1>
            <p>
              For <strong>$24.95 one time</strong>, an approved Featured broker listing receives priority marketplace placement and a dedicated FLLM detail page while you remain the independent listing broker and transaction contact.
            </p>
            <div className="bf-actions">
              <Link className="bf-btn gold" href={featuredHref}>Feature My Client’s License — $24.95</Link>
              <Link className="bf-btn outline" href={antezzaUrl}>See the Live Example</Link>
            </div>
          </div>

          <aside className="bf-price-card">
            <span>Featured broker listing</span>
            <strong>$24.95</strong>
            <b>One-time listing fee</b>
            <ul>
              <li>30-day Featured priority placement</li>
              <li>Dedicated FLLM listing detail page</li>
              <li>Broker identity and contact information</li>
              <li>No recurring fee</li>
              <li>No FLLM share of your commission</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="bf-section">
        <div className="bf-shell">
          <div className="bf-heading">
            <span>What the $24.95 includes</span>
            <h2>A polished liquor-license ad built around your client’s listing</h2>
            <p>The Featured product is designed to make the license easy to understand while keeping the independent broker clearly identified.</p>
          </div>
          <div className="bf-benefits">
            {benefits.map(([title, copy]) => (
              <article className="bf-benefit" key={title}>
                <strong>{title}</strong>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bf-section alt">
        <div className="bf-shell">
          <div className="bf-heading">
            <span>Actual marketplace presentation</span>
            <h2>See the Featured card buyers can encounter on FLLM</h2>
            <p>This example uses the live Pinellas County Featured broker listing format.</p>
          </div>
          <div className="bf-demo-grid">
            <div className="bf-card-stage results-page">
              <MarketplaceListingCard listing={featuredExample} />
            </div>
            <div className="bf-demo-copy">
              <h3>Designed to promote the license without replacing the broker</h3>
              <p>The marketplace card introduces the opportunity. The dedicated detail page carries the buyer into the full listing presentation.</p>
              <ul>
                <li>County and license type are immediately visible</li>
                <li>Asking price is prominent</li>
                <li>Featured status distinguishes the listing</li>
                <li>The detail page identifies the independent broker</li>
                <li>Buyer contact options remain tied to the listing</li>
              </ul>
              <Link className="bf-btn outline" href={antezzaUrl}>Open the Live Featured Listing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bf-section black">
        <div className="bf-shell">
          <div className="bf-heading">
            <span>Dedicated broker detail page</span>
            <h2>The full listing page is part of the Featured presentation</h2>
            <p>The live example below shows the actual FLLM-ANTEZZA page used for a Pinellas County 4COP quota license sold with an associated business.</p>
          </div>
          <div className="bf-browser">
            <div className="bf-browser-top">
              <i className="bf-dot"/><i className="bf-dot"/><i className="bf-dot"/>
              <div className="bf-address">floridaliquorlicensemarket.com/listings/fllm-antezza</div>
            </div>
            <iframe title="Live FLLM Featured broker listing example" src={antezzaUrl} loading="lazy" />
          </div>
          <div className="bf-caption">
            <span>Live FLLM listing example. Availability, pricing and search visibility can change.</span>
            <Link href={antezzaUrl}>Open full page →</Link>
          </div>
        </div>
      </section>

      <section className="bf-section alt">
        <div className="bf-shell">
          <div className="bf-heading">
            <span>Real Google visibility example</span>
            <h2>A Featured FLLM broker listing has already appeared in Google’s buyer results</h2>
            <p>This is evidence from the live Antezza listing, not a promise of future placement.</p>
          </div>
          <div className="bf-proof">
            <div className="bf-proof-badge">
              <span>Observed September 17, 2026</span>
              <strong>Page 1 + AI Overview</strong>
              <small>Non-personalized Google search observed for a Pinellas County buyer query.</small>
            </div>
            <div className="bf-proof-copy">
              <h3>Google surfaced the actual $495,000 Featured Pinellas listing</h3>
              <p>For the search <strong>“florida liquor license for sale in pinellas county”</strong>, the FLLM-ANTEZZA page appeared on page 1 and was also linked inside Google’s AI Overview.</p>
              <p>The Google result identified the listing as <strong>“Pinellas County 4COP Quota Liquor License for Sale”</strong> and showed the $495,000 asking price and business-purchase-required context.</p>
              <em>Search rankings, snippets and AI Overview citations are controlled by Google and may change at any time. FLLM does not guarantee search placement.</em>
            </div>
          </div>
        </div>
      </section>

      <section className="bf-section">
        <div className="bf-shell">
          <div className="bf-heading">
            <span>How it works</span>
            <h2>From submission to Featured listing in four steps</h2>
          </div>
          <div className="bf-steps">
            {steps.map(([title, copy], index) => (
              <article className="bf-step" key={title}>
                <b>{index + 1}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bf-final">
        <div className="bf-shell bf-final-inner">
          <div>
            <span className="bf-eyebrow">Ready to advertise a client license?</span>
            <h2>Build the next Featured broker listing on FLLM</h2>
            <p>You keep the client relationship, broker identity and commission. FLLM provides the marketplace presentation and exposure.</p>
          </div>
          <Link className="bf-btn gold" href={featuredHref}>Feature My Client’s License — $24.95</Link>
        </div>
      </section>

      <footer className="bf-footer">
        <div className="bf-shell bf-footer-grid">
          <div className="bf-footer-brand">
            <Image src="/assets/brand-footer.svg" alt="Florida Liquor License Market" width={215} height={78} />
            <p>Florida’s specialized marketplace for buying, selling, financing and researching liquor licenses.</p>
          </div>
          <div><strong>Marketplace</strong><Link href="/listings">Liquor Licenses for Sale</Link><Link href="/counties">County Markets</Link><Link href="/sell-your-license">Sell Your License</Link></div>
          <div><strong>Broker Resources</strong><Link href="/brokers/list-your-license">List a Client License</Link><Link href="/florida-liquor-license-broker">Broker Services</Link><Link href="/contact">Contact FLLM</Link></div>
          <div><strong>Market Data</strong><Link href="/market-data">Market Data</Link><Link href="/florida-quota-liquor-license-market-report">Market Report</Link><Link href="/resources">Resources</Link></div>
        </div>
        <div className="bf-shell bf-legal">Independent broker marketplace listings are advertising services only. FLLM does not guarantee publication, availability, search ranking, transfer approval or closing.</div>
      </footer>
    </main>
  );
}
