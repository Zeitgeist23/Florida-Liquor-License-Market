import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import type { Listing } from "@/data/listings";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/brokers/advertise-client-liquor-license`;
const antezzaUrl = "/listings/fllm-antezza";

export const metadata: Metadata = {
  title: "Advertise a Client Liquor License | $24.95 Featured Broker Listing | FLLM",
  description:
    "See exactly how a $24.95 Featured independent-broker listing appears on Florida Liquor License Market, including the marketplace card and full broker detail page.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    siteName: "Florida Liquor License Market",
    title: "Advertise Your Client’s Florida Liquor License on FLLM",
    description:
      "Preview the $24.95 Featured broker listing card and full detail page before submitting a client liquor license.",
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
  note: "Independent broker listing represented by Alessandro Antezza · SUNSHINEAGLE LLC · info@sunshineagle.com · (941) 416-4580. License availability and transaction terms subject to broker confirmation.",
  image: "/assets/license-market/license-04.png",
};

const benefits = [
  ["Featured marketplace card", "A cyan Featured Listing badge and priority marketplace placement for 30 days."],
  ["Full broker detail page", "A dedicated FLLM page presenting the license, county, asking price, package details and broker information."],
  ["Your identity stays visible", "Your name, brokerage, phone, email and broker website can appear on the listing detail page."],
  ["Buyer inquiries reach you", "The listing can route buyer interest to the independent listing broker while FLLM also tracks marketplace inquiry activity."],
  ["No commission share", "The $24.95 Featured charge is a one-time advertising fee. FLLM does not take part of your brokerage commission."],
  ["Specialized exposure", "Your client’s license appears inside a Florida-specific liquor-license marketplace with county and license-type context."],
];

const steps = [
  ["Choose Featured", "Select the $24.95 Featured independent-broker option."],
  ["Submit the client listing", "Provide the county, license series, asking price, broker contact and any business-package information."],
  ["FLLM reviews the submission", "We review authority, accuracy, marketplace fit and the information needed to build the listing."],
  ["Your listing goes live", "Approved listings receive the Featured card and a dedicated broker detail page modeled on the format shown below."],
];

export default function AdvertiseClientLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Advertise Your Client’s Florida Liquor License on FLLM",
      url: canonicalUrl,
      description:
        "Broker marketing page showing the FLLM $24.95 Featured independent-broker marketplace card and dedicated liquor-license detail page.",
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "FLLM Featured Independent Broker Listing",
      serviceType: "Florida liquor license marketplace advertising",
      provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      areaServed: { "@type": "State", name: "Florida" },
      audience: { "@type": "Audience", audienceType: "Florida business and liquor license brokers" },
      offers: {
        "@type": "Offer",
        name: "Featured Broker Listing",
        price: "24.95",
        priceCurrency: "USD",
        url: `${siteUrl}/brokers/list-your-license#featured-listing-option`,
      },
    },
  ];

  return (
    <main className="broker-promo-page fllm-official-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <style>{`
        .broker-promo-page{--promo-gold:#f1a600;--promo-cyan:#69d6ff;--promo-deep:#03131f;--promo-navy:#0a2947;--promo-card:#0b2130;background:#081d31;color:#fff;min-height:100vh;overflow-x:clip}
        .broker-promo-header{position:relative;z-index:10050;border-bottom:1px solid rgba(241,166,0,.56);background:#020c14}
        .broker-promo-shell{width:min(1240px,calc(100% - 40px));margin:0 auto}
        .broker-promo-hero{position:relative;overflow:hidden;padding:72px 0 76px;background:radial-gradient(circle at 82% 25%,rgba(241,166,0,.17),transparent 32%),linear-gradient(135deg,#03131f 0%,#061f35 56%,#123a56 100%);border-bottom:1px solid rgba(241,166,0,.5)}
        .broker-promo-hero-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(320px,.65fr);gap:52px;align-items:center}
        .broker-promo-kicker{display:block;color:var(--promo-gold);font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .broker-promo-hero h1{max-width:820px;margin:10px 0 18px;font:700 clamp(43px,5.3vw,70px)/.98 Georgia,"Times New Roman",serif;color:#fff}
        .broker-promo-hero p{max-width:780px;margin:0;color:#d7e2e9;font-size:17px;line-height:1.72}
        .broker-promo-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
        .broker-promo-button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:11px 18px;border-radius:5px;font-size:12px;font-weight:900;letter-spacing:.02em;text-transform:uppercase;text-decoration:none;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,filter .18s ease}
        .broker-promo-button.gold{border:1px solid #ffd468;background:linear-gradient(145deg,#ffd56b 0%,#ffc13b 42%,#e69a00 100%);color:#07101a;box-shadow:inset 0 1px 0 rgba(255,255,255,.48),0 7px 15px rgba(0,0,0,.3)}
        .broker-promo-button.outline{border:1px solid var(--promo-gold);background:#071a2b;color:#fff}
        .broker-promo-button:hover,.broker-promo-button:focus-visible{transform:translateY(-2px) scale(1.03);border-color:#ffe29a;box-shadow:0 10px 20px rgba(0,0,0,.38),0 0 18px rgba(241,166,0,.25);outline:none;filter:brightness(1.05)}
        .broker-promo-price{padding:26px;border:1px solid rgba(241,166,0,.78);border-radius:10px;background:linear-gradient(145deg,#123d65 0%,#0b2947 62%,#071a2b 100%);box-shadow:inset 0 1px 0 rgba(255,221,145,.28),0 20px 48px rgba(0,0,0,.34)}
        .broker-promo-price>span{display:block;color:var(--promo-cyan);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .broker-promo-price strong{display:block;margin:10px 0 2px;color:#fff;font:700 48px/1 Georgia,"Times New Roman",serif}
        .broker-promo-price b{display:block;color:var(--promo-gold);font-size:14px}
        .broker-promo-price ul{margin:22px 0 0;padding:18px 0 0 18px;border-top:1px solid rgba(255,255,255,.1);color:#d8e3ea;font-size:13px;line-height:1.8}
        .broker-promo-section{padding:70px 0;background:#0d3152}
        .broker-promo-section.deep{background:#071927}
        .broker-promo-heading{max-width:880px;margin-bottom:28px}
        .broker-promo-heading>span{color:var(--promo-gold);font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .broker-promo-heading h2{margin:8px 0 10px;color:#fff;font:700 clamp(31px,4vw,48px)/1.05 Georgia,"Times New Roman",serif}
        .broker-promo-heading p{margin:0;color:#cbd8e1;font-size:15px;line-height:1.72}
        .broker-promo-benefits{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .broker-promo-benefit{padding:22px;border:1px solid rgba(88,200,238,.38);border-radius:7px;background:linear-gradient(145deg,#0b2130,#061018);box-shadow:0 12px 28px rgba(0,0,0,.18);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
        .broker-promo-benefit:hover{transform:translateY(-4px);border-color:#d9f2ff;box-shadow:0 20px 38px rgba(0,0,0,.32),0 0 0 1px rgba(105,214,255,.12)}
        .broker-promo-benefit strong{display:block;color:#fff;font:700 21px/1.15 Georgia,"Times New Roman",serif}
        .broker-promo-benefit p{margin:10px 0 0;color:#d1dde5;font-size:14px;line-height:1.65}
        .broker-promo-card-stage{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:42px;align-items:start}
        .broker-promo-card-wrap{position:relative;padding:18px;border:1px solid rgba(241,166,0,.62);border-radius:10px;background:#061728;box-shadow:0 22px 50px rgba(0,0,0,.3)}
        .broker-promo-card-wrap .result-card{margin:0!important;width:100%!important;max-width:none!important}
        .broker-promo-card-notes{padding:26px;border-left:3px solid var(--promo-gold);background:#123d65;color:#eef4f7}
        .broker-promo-card-notes h3{margin:0 0 13px;font:700 27px/1.12 Georgia,"Times New Roman",serif}
        .broker-promo-card-notes p{margin:0 0 14px;color:#d3dfe6;font-size:15px;line-height:1.72}
        .broker-promo-card-notes ul{margin:0;padding-left:18px;color:#e9eff3;font-size:14px;line-height:1.8}
        .broker-promo-browser{overflow:hidden;border:1px solid rgba(241,166,0,.72);border-radius:10px;background:#020b12;box-shadow:0 24px 58px rgba(0,0,0,.38)}
        .broker-promo-browser-bar{display:flex;align-items:center;gap:8px;height:44px;padding:0 14px;border-bottom:1px solid rgba(255,255,255,.08);background:#081a29}
        .broker-promo-browser-dot{width:9px;height:9px;border-radius:999px;background:#5d7181}
        .broker-promo-browser-address{flex:1;margin-left:7px;padding:7px 10px;border:1px solid rgba(255,255,255,.09);border-radius:5px;background:#03131f;color:#93a6b4;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .broker-promo-browser iframe{display:block;width:100%;height:760px;border:0;background:#081d31}
        .broker-promo-preview-caption{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:15px;color:#aebec9;font-size:12px;line-height:1.55}
        .broker-promo-preview-caption a{color:var(--promo-gold);font-weight:900;text-decoration:none}
        .broker-promo-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
        .broker-promo-step{padding:22px;border:1px solid rgba(241,166,0,.42);border-radius:8px;background:linear-gradient(145deg,#123b58,#0b2940)}
        .broker-promo-step b{display:grid;place-items:center;width:31px;height:31px;border-radius:999px;background:var(--promo-gold);color:#07101a;font-size:13px}
        .broker-promo-step h3{margin:15px 0 8px;color:#fff;font-size:18px}
        .broker-promo-step p{margin:0;color:#cbd8df;font-size:13px;line-height:1.65}
        .broker-promo-final{padding:58px 0;border-top:1px solid rgba(241,166,0,.36);background:linear-gradient(135deg,#071f36,#0f4166)}
        .broker-promo-final-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}
        .broker-promo-final h2{margin:6px 0 8px;font:700 clamp(30px,4vw,44px)/1.05 Georgia,"Times New Roman",serif}
        .broker-promo-final p{max-width:710px;margin:0;color:#d3dee5;line-height:1.65}
        .broker-promo-footer{margin:0;border-top:1px solid rgba(246,167,0,.55);background:linear-gradient(180deg,#03131f 0%,#020b12 100%);color:#d5e0e7}
        .broker-promo-footer-grid{display:grid;grid-template-columns:minmax(240px,1.35fr) repeat(3,minmax(155px,.75fr));gap:38px;padding-top:42px;padding-bottom:34px}
        .broker-promo-footer-brand img{display:block;width:230px;max-width:100%;height:auto;margin-bottom:16px}
        .broker-promo-footer-brand p{max-width:300px;margin:0 0 10px;color:#aebec8;font-size:13px;line-height:1.6}
        .broker-promo-footer-brand b{color:#f6a700;font-size:12px}
        .broker-promo-footer-grid>div>strong{display:block;margin-bottom:13px;color:#fff;font-size:12px;text-transform:uppercase;letter-spacing:.05em}
        .broker-promo-footer-grid>div:not(.broker-promo-footer-brand) a{display:block;width:fit-content;margin:8px 0;color:#aebec8;font-size:12px;line-height:1.35;text-decoration:none}
        .broker-promo-footer-grid a:hover{color:#f6a700!important}
        .broker-promo-footer-legal{padding:18px 0;border-top:1px solid rgba(255,255,255,.08);color:#8395a1;font-size:10px;line-height:1.55}
        .broker-promo-footer-legal a{color:#b9c7cf}
        .broker-promo-copyright{padding:15px 0 20px;border-top:1px solid rgba(255,255,255,.05);color:#738590;font-size:10px}
        @media(max-width:980px){.broker-promo-hero-grid,.broker-promo-card-stage{grid-template-columns:1fr}.broker-promo-benefits{grid-template-columns:repeat(2,minmax(0,1fr))}.broker-promo-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.broker-promo-footer-grid{grid-template-columns:1fr 1fr}.broker-promo-browser iframe{height:680px}}
        @media(max-width:650px){.broker-promo-shell{width:min(1240px,calc(100% - 24px))}.broker-promo-hero{padding:50px 0 54px}.broker-promo-benefits,.broker-promo-steps,.broker-promo-footer-grid{grid-template-columns:1fr}.broker-promo-final-inner{align-items:flex-start;flex-direction:column}.broker-promo-browser iframe{height:600px}.broker-promo-preview-caption{align-items:flex-start;flex-direction:column}.broker-promo-button{width:100%}}
      `}</style>

      <div className="broker-promo-header">
        <FormsSiteHeader primaryActionHref="/brokers/list-your-license#featured-listing-option" primaryActionLabel="List a Client License" />
      </div>

      <section className="broker-promo-hero">
        <div className="broker-promo-shell broker-promo-hero-grid">
          <div>
            <span className="broker-promo-kicker">Featured Independent Broker Advertising</span>
            <h1>Show Your Client’s Florida Liquor License to FLLM Buyers</h1>
            <p>
              For <strong>$24.95 one time</strong>, an approved Featured broker listing receives a priority marketplace card and a dedicated FLLM detail page while you remain the independent listing broker and transaction contact.
            </p>
            <div className="broker-promo-actions">
              <Link className="broker-promo-button gold" href="/brokers/list-your-license#featured-listing-option">Feature My Client’s License — $24.95</Link>
              <a className="broker-promo-button outline" href="#featured-example">See the Live Example</a>
            </div>
          </div>
          <aside className="broker-promo-price">
            <span>Featured Broker Listing</span>
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

      <section className="broker-promo-section">
        <div className="broker-promo-shell">
          <div className="broker-promo-heading">
            <span>What the $24.95 Includes</span>
            <h2>A liquor-license-specific ad, not a generic business listing</h2>
            <p>The Featured presentation is designed to make the license, county, price and independent broker immediately clear to buyers.</p>
          </div>
          <div className="broker-promo-benefits">
            {benefits.map(([title, copy]) => (
              <article className="broker-promo-benefit" key={title}>
                <strong>{title}</strong><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-promo-section deep" id="featured-example">
        <div className="broker-promo-shell">
          <div className="broker-promo-heading">
            <span>Actual FLLM Marketplace Card</span>
            <h2>This is what a Featured broker listing looks like in the marketplace</h2>
            <p>The example below uses the actual FLLM marketplace listing-card component and the live Pinellas County Featured listing data.</p>
          </div>
          <div className="broker-promo-card-stage">
            <div className="broker-promo-card-wrap">
              <MarketplaceListingCard listing={featuredExample} actionLabel="View License" />
            </div>
            <aside className="broker-promo-card-notes">
              <h3>The card gets the buyer to the important information quickly.</h3>
              <p>The marketplace card keeps the presentation clean and consistent with FLLM’s county inventory while signaling that the listing receives Featured exposure.</p>
              <ul>
                <li>Featured Listing badge</li>
                <li>County and license series</li>
                <li>Displayed license asking price</li>
                <li>Availability status</li>
                <li>Business-purchase condition when applicable</li>
                <li>Direct path to the dedicated detail page</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="broker-promo-section">
        <div className="broker-promo-shell">
          <div className="broker-promo-heading">
            <span>Full Featured Detail Page</span>
            <h2>Then the buyer sees the complete broker listing</h2>
            <p>This live preview displays the Alessandro Antezza Featured listing—the approved FLLM design standard for third-party broker licenses offered with an operating business.</p>
          </div>
          <div className="broker-promo-browser">
            <div className="broker-promo-browser-bar" aria-hidden="true">
              <span className="broker-promo-browser-dot" /><span className="broker-promo-browser-dot" /><span className="broker-promo-browser-dot" />
              <span className="broker-promo-browser-address">floridaliquorlicensemarket.com/listings/fllm-antezza</span>
            </div>
            <iframe src={antezzaUrl} title="Live FLLM Featured broker listing detail page example" loading="lazy" />
          </div>
          <div className="broker-promo-preview-caption">
            <span>The preview is the live FLLM listing page, not a static mockup. Listing details vary by client and transaction.</span>
            <Link href={antezzaUrl}>Open the live example in a full page →</Link>
          </div>
        </div>
      </section>

      <section className="broker-promo-section deep">
        <div className="broker-promo-shell">
          <div className="broker-promo-heading">
            <span>You Stay the Broker</span>
            <h2>FLLM provides marketplace exposure without replacing your client relationship</h2>
            <p>Your Featured page can identify you as the independent listing broker, present your business contact information and direct buyers to your brokerage website. FLLM’s role for this product is marketplace advertising—not taking over your representation.</p>
          </div>
          <div className="broker-promo-steps">
            {steps.map(([title, copy], index) => (
              <article className="broker-promo-step" key={title}><b>{index + 1}</b><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-promo-final">
        <div className="broker-promo-shell broker-promo-final-inner">
          <div>
            <span className="broker-promo-kicker">Ready to Advertise a Client License?</span>
            <h2>Put your client’s license in front of FLLM buyers for $24.95.</h2>
            <p>Submit the listing once. You remain the broker. FLLM builds the marketplace presentation and provides the Featured exposure.</p>
          </div>
          <Link className="broker-promo-button gold" href="/brokers/list-your-license#featured-listing-option">Feature My Client’s License — $24.95</Link>
        </div>
      </section>

      <footer className="broker-promo-footer" id="resources">
        <div className="broker-promo-shell broker-promo-footer-grid">
          <div className="broker-promo-footer-brand">
            <Image src="/assets/brand-footer.svg" alt="Florida Liquor License Market" width={230} height={84} />
            <p>Florida’s marketplace for buying, selling &amp; financing liquor licenses.</p>
            <b>Buy · Sell · Finance · Invest</b>
          </div>
          <div><strong>Marketplace</strong><Link href="/listings">Browse Licenses</Link><Link href="/sell-your-license">Sell Your License</Link><Link href="/brokers/list-your-license">For Brokers</Link><Link href="/financing">Financing Solutions</Link><Link href="/investment-opportunities">Investment Opportunities</Link></div>
          <div><strong>Resources</strong><Link href="/free-guide">Free Buyer’s &amp; Seller’s Guide</Link><Link href="/resources">Resource Center</Link><Link href="/resources/application-center">Application Center</Link><Link href="/resources/forms">Florida ABT Forms</Link><Link href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</Link></div>
          <div><strong>Market Data</strong><Link href="/counties">County Markets</Link><Link href="/florida-liquor-license-value">License Value Estimator</Link><Link href="/florida-quota-liquor-license-market-report">Market Insights</Link><Link href="/florida-liquor-license-news">News &amp; Insights</Link><Link href="/contact">Contact Us</Link></div>
        </div>
        <div className="broker-promo-shell broker-promo-footer-legal">Featured independent-broker listings are advertising services. FLLM does not guarantee publication, availability, price, transfer approval, transaction terms or closing. Brokers and their clients remain responsible for legal, tax, licensing and transaction advice. See our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms-of-use">Terms of Use</Link>.</div>
        <div className="broker-promo-shell broker-promo-copyright">© 2026 Florida Liquor License Market. All rights reserved.</div>
      </footer>
    </main>
  );
}
