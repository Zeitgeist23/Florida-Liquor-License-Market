import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import type { Listing } from "@/data/listings";
import "@/app/fllm-official-template.css";

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
  ["Dedicated broker detail page", "A polished page built around the license, county, asking price and broker identity."],
  ["Broker stays visible", "Your name, brokerage, phone, email and website remain part of the buyer experience."],
  ["Buyer inquiries route to you", "You remain the independent listing broker and transaction contact."],
  ["No commission share", "The $24.95 charge is a one-time advertising fee. FLLM does not take part of your commission."],
  ["Florida-specific exposure", "Your listing appears inside a marketplace focused specifically on Florida liquor licenses."],
];

const steps = [
  ["Choose Featured", "Select the $24.95 Featured independent-broker option."],
  ["Submit the listing", "Provide the county, license type, price, broker contact and package details."],
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
    <main className="broker-featured-page fllm-official-page" data-fllm-template="county-v1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .broker-featured-page{--gold:#f1a600;--gold2:#ffc13b;--cyan:#69d6ff;min-height:100vh;overflow-x:clip;background:#0d3152;color:#fff}
        .broker-featured-page *{box-sizing:border-box}
        .broker-featured-page .bf-header-band{border-bottom:1px solid #8a6412;background:#020c14}
        .broker-featured-page .forms-site-header.page-shell{margin-inline:auto}
        .bf-shell{width:min(1240px,calc(100% - 40px));margin:0 auto}
        .bf-hero{padding:58px 0 60px;border-bottom:1px solid rgba(241,166,0,.38);background:radial-gradient(circle at 88% 18%,rgba(105,214,255,.09),transparent 28%),linear-gradient(135deg,#061f35 0%,#0a2947 100%)}
        .bf-hero-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.62fr);gap:54px;align-items:center}
        .bf-eyebrow{display:block;margin-bottom:10px;color:var(--gold);font-size:12px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .bf-hero h1{max-width:760px;margin:0;color:#fff;font:700 clamp(40px,4.8vw,62px)/1.02 Georgia,"Times New Roman",serif;letter-spacing:-.025em}
        .bf-hero p{max-width:760px;margin:18px 0 0;color:#d4e0e8;font-size:17px;line-height:1.68}
        .bf-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:27px}
        .bf-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:7px;font-size:12px;font-weight:900;letter-spacing:.02em;text-decoration:none;text-transform:uppercase;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,filter .18s ease}
        .bf-btn.gold{border:1px solid #ffd468;background:linear-gradient(145deg,#ffd56b,#ffc13b 42%,#e59a00);color:#06111b;box-shadow:inset 0 1px 0 rgba(255,255,255,.48),0 7px 15px rgba(0,0,0,.28)}
        .bf-btn.outline{border:1px solid rgba(241,166,0,.85);background:#071a2b;color:#fff}
        .bf-btn:hover,.bf-btn:focus-visible{transform:translateY(-2px) scale(1.03);border-color:#ffe29a;box-shadow:0 10px 22px rgba(0,0,0,.34),0 0 16px rgba(241,166,0,.18);outline:none;filter:brightness(1.04)}
        .bf-price-card{padding:27px;border:1px solid rgba(241,166,0,.74);border-radius:7px;background:linear-gradient(145deg,#123d65 0%,#0b2947 62%,#071a2b 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 18px 42px rgba(0,0,0,.30)}
        .bf-price-card>span{display:block;color:var(--cyan);font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .bf-price-card strong{display:block;margin:9px 0 2px;color:#fff;font:700 47px/1 Georgia,"Times New Roman",serif}
        .bf-price-card b{display:block;color:var(--gold2);font-size:13px}
        .bf-price-card ul{margin:20px 0 0;padding:18px 0 0 18px;border-top:1px solid rgba(255,255,255,.11);color:#d9e4ea;font-size:13px;line-height:1.8}
        .bf-section{padding:62px 0;background:#0d3152}
        .bf-section.deep{background:#061f35}
        .bf-section.gradient{background:linear-gradient(145deg,#0a2947 0%,#071f35 100%)}
        .bf-heading{max-width:830px;margin-bottom:28px}
        .bf-heading span{color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .bf-heading h2{margin:8px 0 10px;color:#fff;font:700 clamp(30px,3.4vw,44px)/1.08 Georgia,"Times New Roman",serif}
        .bf-heading p{margin:0;color:#c9d6df;font-size:15px;line-height:1.7}
        .bf-benefits{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .bf-benefit{padding:21px;border:1px solid rgba(105,214,255,.27);border-radius:7px;background:linear-gradient(145deg,#123d65 0%,#0b2947 100%);box-shadow:0 10px 24px rgba(0,0,0,.19);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
        .bf-benefit:hover{transform:translateY(-4px);border-color:rgba(241,166,0,.78);box-shadow:0 18px 32px rgba(0,0,0,.30)}
        .bf-benefit strong{display:block;color:#fff;font:700 20px/1.18 Georgia,"Times New Roman",serif}
        .bf-benefit p{margin:9px 0 0;color:#d0dce4;font-size:13px;line-height:1.62}
        .bf-demo-grid{display:grid;grid-template-columns:minmax(330px,410px) minmax(0,1fr);gap:34px;align-items:start}
        .bf-card-stage{height:fit-content;min-height:0;align-self:start;padding:16px;border:1px solid rgba(241,166,0,.56);border-radius:7px;background:#071927;box-shadow:0 18px 42px rgba(0,0,0,.30)}
        .bf-card-stage .results-page{min-height:0!important;height:auto!important;background:transparent!important;padding:0!important;margin:0!important}
        .bf-card-stage .result-card{height:auto!important;min-height:330px!important;margin:0!important;width:100%!important;max-width:none!important}
        .bf-demo-copy{padding:26px 28px;border:1px solid rgba(241,166,0,.46);border-radius:7px;background:linear-gradient(145deg,#123d65,#0b2947)}
        .bf-demo-copy h3{margin:0 0 12px;color:#fff;font:700 29px/1.13 Georgia,"Times New Roman",serif}
        .bf-demo-copy p{margin:0 0 13px;color:#d4dfe6;font-size:15px;line-height:1.7}
        .bf-demo-copy ul{margin:0 0 21px;padding-left:18px;color:#eef3f6;font-size:14px;line-height:1.78}
        .bf-detail-preview{margin-top:28px;padding:18px;border:1px solid rgba(241,166,0,.55);border-radius:7px;background:#071927;box-shadow:0 18px 42px rgba(0,0,0,.28)}
        .bf-detail-bar{display:flex;align-items:center;gap:8px;padding:0 0 14px;margin-bottom:17px;border-bottom:1px solid rgba(255,255,255,.08)}
        .bf-detail-dot{width:8px;height:8px;border-radius:50%;background:#647887}
        .bf-detail-url{margin-left:5px;color:#9aadb9;font-size:11px}
        .bf-detail-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(255px,.72fr);gap:22px;align-items:start}
        .bf-detail-main{padding:22px;border:1px solid rgba(241,166,0,.30);border-radius:7px;background:linear-gradient(145deg,#0d3152,#091f32)}
        .bf-detail-main span{color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .bf-detail-main h3{margin:7px 0 8px;font:700 34px/1.05 Georgia,"Times New Roman",serif}
        .bf-detail-price{margin:0;color:var(--gold2);font:700 29px/1 Georgia,"Times New Roman",serif}
        .bf-detail-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:18px}
        .bf-detail-facts div{padding:12px;border:1px solid rgba(241,166,0,.36);border-radius:7px;background:#0a2947}
        .bf-detail-facts b{display:block;color:#b7c6d1;font-size:10px;text-transform:uppercase;letter-spacing:.05em}
        .bf-detail-facts strong{display:block;margin-top:5px;color:#fff;font-size:13px}
        .bf-broker-preview{padding:20px;border:1px solid rgba(241,166,0,.52);border-radius:7px;background:linear-gradient(145deg,#123d65,#0b2947)}
        .bf-broker-preview>span{color:var(--gold);font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .bf-broker-preview h3{margin:6px 0 14px;font:700 27px/1.06 Georgia,"Times New Roman",serif}
        .bf-broker-photo{display:grid;place-items:center;height:150px;border:1px solid rgba(241,166,0,.42);border-radius:7px;background:linear-gradient(145deg,#d9e3eb,#f7fafc);color:#0a2947;font:700 18px/1.2 Georgia,"Times New Roman",serif;text-align:center}
        .bf-broker-contact{margin-top:12px;padding:12px;border:1px solid rgba(255,255,255,.09);border-radius:7px;background:#071927;color:#dce6ec;font-size:12px;line-height:1.65}
        .bf-broker-contact strong{color:var(--gold2)}
        .bf-proof{display:grid;grid-template-columns:.72fr 1.28fr;gap:28px;align-items:center;padding:28px;border:1px solid rgba(105,214,255,.30);border-radius:7px;background:linear-gradient(145deg,#0a2947,#061f35);box-shadow:0 14px 34px rgba(0,0,0,.24)}
        .bf-proof-badge{padding:24px;border:1px solid rgba(241,166,0,.62);border-radius:7px;background:#123d65}
        .bf-proof-badge span{display:block;color:var(--gold);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .bf-proof-badge strong{display:block;margin:8px 0 5px;color:#fff;font:700 34px/1.05 Georgia,"Times New Roman",serif}
        .bf-proof-badge small{color:#c0ced8;font-size:12px;line-height:1.55}
        .bf-proof-copy h3{margin:0 0 10px;color:#fff;font:700 29px/1.13 Georgia,"Times New Roman",serif}
        .bf-proof-copy p{margin:0 0 11px;color:#d2dde4;font-size:14px;line-height:1.7}
        .bf-proof-copy em{display:block;color:#92a7b4;font-size:11px;line-height:1.55;font-style:normal}
        .bf-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
        .bf-step{padding:20px;border:1px solid rgba(241,166,0,.40);border-radius:7px;background:linear-gradient(145deg,#123d65,#0b2947)}
        .bf-step b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--gold);color:#07101a;font-size:12px}
        .bf-step h3{margin:13px 0 7px;color:#fff;font-size:17px}
        .bf-step p{margin:0;color:#cbd7de;font-size:13px;line-height:1.6}
        .bf-final{padding:50px 0;border-top:1px solid rgba(241,166,0,.36);background:linear-gradient(135deg,#0a2947,#123d65)}
        .bf-final-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}
        .bf-final h2{margin:6px 0 8px;font:700 clamp(28px,3.5vw,40px)/1.08 Georgia,"Times New Roman",serif}
        .bf-final p{max-width:690px;margin:0;color:#d6e0e6;font-size:14px;line-height:1.65}
        .broker-featured-page .fllm-official-license-footer{margin:0;padding:0;border-top:1px solid rgba(246,167,0,.55);background:linear-gradient(180deg,#03131f 0%,#020b12 100%);color:#d5e0e7}
        .broker-featured-page .fllm-official-license-footer .page-shell{width:min(1240px,calc(100% - 40px));margin-inline:auto}
        .broker-featured-page .fllm-official-license-footer .footer-grid{display:grid;grid-template-columns:minmax(240px,1.35fr) repeat(3,minmax(155px,.75fr));gap:38px;padding-top:42px;padding-bottom:34px}
        .broker-featured-page .fllm-official-license-footer .footer-brand img{display:block;width:230px;max-width:100%;height:auto;margin-bottom:16px}
        .broker-featured-page .fllm-official-license-footer .footer-brand p{max-width:300px;margin:0 0 10px;color:#aebec8;font-size:13px;line-height:1.6}
        .broker-featured-page .fllm-official-license-footer .footer-brand b{color:#f6a700;font-size:12px;letter-spacing:.03em}
        .broker-featured-page .fllm-official-license-footer .footer-grid>div>strong{display:block;margin-bottom:13px;color:#fff;font-size:12px;letter-spacing:.05em;text-transform:uppercase}
        .broker-featured-page .fllm-official-license-footer .footer-grid>div:not(.footer-brand) a{display:block;width:fit-content;margin:8px 0;color:#aebec8;font-size:12px;line-height:1.35;text-decoration:none}
        .broker-featured-page .fllm-official-license-footer .footer-grid>div:not(.footer-brand) a:hover,.broker-featured-page .fllm-official-license-footer .footer-grid>div:not(.footer-brand) a:focus-visible{color:#f6a700;outline:none}
        .broker-featured-page .fllm-official-license-footer .footer-legal{padding-top:18px;padding-bottom:18px;border-top:1px solid rgba(255,255,255,.08);color:#8395a1;font-size:10px;line-height:1.55}
        .broker-featured-page .fllm-official-license-footer .footer-legal a{color:#b9c7cf;text-decoration:none}
        .broker-featured-page .fllm-official-license-footer .copyright{padding-top:15px;padding-bottom:20px;border-top:1px solid rgba(255,255,255,.05);color:#738590;font-size:10px}
        @media(max-width:980px){.bf-hero-grid,.bf-demo-grid,.bf-detail-grid,.bf-proof{grid-template-columns:1fr}.bf-benefits{grid-template-columns:repeat(2,minmax(0,1fr))}.bf-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.broker-featured-page .fllm-official-license-footer .footer-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:650px){.bf-shell,.broker-featured-page .fllm-official-license-footer .page-shell{width:min(calc(100% - 24px),1240px)}.bf-hero{padding:42px 0 46px}.bf-hero h1{font-size:40px}.bf-benefits,.bf-steps,.bf-detail-facts{grid-template-columns:1fr}.bf-final-inner{align-items:flex-start;flex-direction:column}.broker-featured-page .fllm-official-license-footer .footer-grid{grid-template-columns:1fr;gap:24px;padding-top:30px}.broker-featured-page .fllm-official-license-footer .footer-brand img{width:210px}}
      `}</style>

      <div className="bf-header-band">
        <FormsSiteHeader />
      </div>

      <section className="bf-hero">
        <div className="bf-shell bf-hero-grid">
          <div>
            <span className="bf-eyebrow">Featured Independent Broker Advertising</span>
            <h1>Show brokers exactly what a $24.95 Featured FLLM listing delivers.</h1>
            <p>
              A Featured listing gives your client a priority marketplace card and a dedicated FLLM detail page while you remain the independent listing broker and transaction contact.
            </p>
            <div className="bf-actions">
              <Link className="bf-btn gold" href={featuredHref}>Feature My Client&apos;s License — $24.95</Link>
              <Link className="bf-btn outline" href={antezzaUrl}>Open the Live Example</Link>
            </div>
          </div>
          <aside className="bf-price-card">
            <span>Featured Broker Listing</span>
            <strong>$24.95</strong>
            <b>One-time listing fee</b>
            <ul>
              <li>30-day Featured priority placement</li>
              <li>Dedicated FLLM detail page</li>
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
            <h2>A broker advertising product built around the liquor license.</h2>
            <p>The Featured format is designed to make the license easy to understand while keeping the broker relationship clear.</p>
          </div>
          <div className="bf-benefits">
            {benefits.map(([title, copy]) => (
              <article className="bf-benefit" key={title}><strong>{title}</strong><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="bf-section deep">
        <div className="bf-shell">
          <div className="bf-heading">
            <span>Featured Marketplace Card</span>
            <h2>The card buyers encounter first.</h2>
            <p>This is the live FLLM marketplace-card format using the Pinellas County Featured broker example.</p>
          </div>
          <div className="bf-demo-grid">
            <div className="bf-card-stage">
              <div className="results-page" style={{ minHeight: 0, background: "transparent", padding: 0 }}>
                <MarketplaceListingCard listing={featuredExample} actionLabel="View License" />
              </div>
            </div>
            <aside className="bf-demo-copy">
              <h3>Designed to promote the license without replacing the broker.</h3>
              <p>The marketplace card introduces the opportunity. The dedicated detail page carries the buyer into the full listing presentation.</p>
              <ul>
                <li>County and license type are immediately visible</li>
                <li>Asking price is prominent</li>
                <li>Featured status distinguishes the listing</li>
                <li>Business-purchase requirements can be disclosed</li>
                <li>The detail page identifies the independent broker</li>
              </ul>
              <Link className="bf-btn outline" href={antezzaUrl}>Open the Live Featured Listing</Link>
            </aside>
          </div>

          <div className="bf-detail-preview" aria-label="Featured broker listing detail page preview">
            <div className="bf-detail-bar"><i className="bf-detail-dot"/><i className="bf-detail-dot"/><i className="bf-detail-dot"/><span className="bf-detail-url">floridaliquorlicensemarket.com/listings/fllm-antezza</span></div>
            <div className="bf-detail-grid">
              <div className="bf-detail-main">
                <span>Third-Party Broker Listing</span>
                <h3>Pinellas County 4COP Quota Liquor License for Sale</h3>
                <p className="bf-detail-price">$495,000</p>
                <div className="bf-detail-facts">
                  <div><b>License Type</b><strong>4COP Quota</strong></div>
                  <div><b>County</b><strong>Pinellas County</strong></div>
                  <div><b>Status</b><strong>Available</strong></div>
                </div>
              </div>
              <aside className="bf-broker-preview">
                <span>Independent Listing Broker</span>
                <h3>Alessandro Antezza</h3>
                <div className="bf-broker-photo">Broker portrait<br/>and identity panel</div>
                <div className="bf-broker-contact"><strong>SUNSHINEAGLE LLC</strong><br/>Phone · Email · Broker website<br/>Buyer inquiry controls</div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="bf-section gradient">
        <div className="bf-shell">
          <div className="bf-heading">
            <span>Observed Google Visibility</span>
            <h2>The live Featured example has already appeared in Google Search.</h2>
            <p>On September 17, 2026, the Antezza Featured listing was observed in a non-personalized Google search for a relevant Pinellas County buyer query.</p>
          </div>
          <div className="bf-proof">
            <div className="bf-proof-badge">
              <span>Observed Search Result</span>
              <strong>Page 1 + AI Overview</strong>
              <small>Query: “florida liquor license for sale in pinellas county”</small>
            </div>
            <div className="bf-proof-copy">
              <h3>Google surfaced the actual Featured listing.</h3>
              <p>The result displayed “Pinellas County 4COP Quota Liquor License for Sale,” the $495,000 asking price and the business-purchase-required context. The same FLLM listing was also linked from Google&apos;s AI Overview.</p>
              <p><Link href={antezzaUrl}>View the live FLLM-ANTEZZA listing →</Link></p>
              <em>Search rankings and AI citations change over time. FLLM does not guarantee any specific Google ranking, placement or AI Overview citation.</em>
            </div>
          </div>
        </div>
      </section>

      <section className="bf-section deep">
        <div className="bf-shell">
          <div className="bf-heading"><span>How It Works</span><h2>Four steps from broker submission to live listing.</h2></div>
          <div className="bf-steps">
            {steps.map(([title, copy], index) => (
              <article className="bf-step" key={title}><b>{index + 1}</b><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="bf-final">
        <div className="bf-shell bf-final-inner">
          <div><span className="bf-eyebrow">Ready to add a client listing?</span><h2>Featured broker advertising is $24.95 one time.</h2><p>Keep the client relationship, keep your commission, and give the license a dedicated FLLM marketplace presentation.</p></div>
          <Link className="bf-btn gold" href={featuredHref}>Feature My Client&apos;s License — $24.95</Link>
        </div>
      </section>

      <footer id="resources" className="fllm-official-license-footer" aria-label="Florida Liquor License Market footer">
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-footer.svg" alt="Florida Liquor License Market" width={230} height={84} />
            </Link>
            <p>Florida&apos;s marketplace for buying, selling &amp; financing liquor licenses.</p>
            <b>Buy · Sell · Finance · Invest</b>
          </div>
          <div>
            <strong>Marketplace</strong>
            <Link href="/listings">Browse Licenses</Link>
            <Link href="/sell-your-license">Sell Your License</Link>
            <Link href="/brokers/list-your-license">For Brokers</Link>
            <Link href="/financing">Financing Solutions</Link>
            <Link href="/investment-opportunities">Investment Opportunities</Link>
          </div>
          <div>
            <strong>Resources</strong>
            <Link href="/free-guide">Free Buyer&apos;s &amp; Seller&apos;s Guide</Link>
            <Link href="/resources">Resource Center</Link>
            <Link href="/resources/application-center">Application Center</Link>
            <Link href="/resources/forms">Florida ABT Forms</Link>
            <Link href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</Link>
          </div>
          <div>
            <strong>Market Data</strong>
            <Link href="/counties">County Markets</Link>
            <Link href="/florida-liquor-license-value">License Value Estimator</Link>
            <Link href="/florida-quota-liquor-license-market-report">Market Insights</Link>
            <Link href="/florida-liquor-license-news">News &amp; Insights</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="page-shell footer-legal">
          Florida Liquor License Market provides marketplace information and transaction resources. Availability, pricing, licensing eligibility and transaction terms should be independently confirmed. See our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms-of-use">Terms of Use</Link>.
        </div>
        <div className="page-shell copyright">© 2026 Florida Liquor License Market. All rights reserved.</div>
      </footer>
    </main>
  );
}
