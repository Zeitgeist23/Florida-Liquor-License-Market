import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

export const dynamic = "force-dynamic";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/market-data/exchange-board`;

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Asking Prices",
  description:
    "Adding transparency to the Florida liquor license market with active asking prices, county market data, current inventory and featured listings.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "FLLM Exchange Board | Florida Liquor License Asking Prices",
    description:
      "Adding transparency to the Florida liquor license market with active asking prices, county price discovery and current marketplace inventory.",
    siteName: "Florida Liquor License Market",
  },
};

function money(value: number | null, fallback: string) {
  if (value === null) return fallback;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function shortCounty(county: string) {
  return county.replace(/\s+County$/i, "");
}

function shortType(type: string) {
  return type.startsWith("4COP") ? "4COP" : "3PS";
}

const deskPeople = Array.from({ length: 20 }, (_, index) => index);
const smallScreens = Array.from({ length: 18 }, (_, index) => index);

export default async function ExchangeBoardPage() {
  const rawListings = await getMarketplaceListings();
  const listings = getVisibleAvailableMarketplaceListings(rawListings)
    .filter((listing) => listing.price !== null)
    .sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

  const newest = [...listings]
    .sort((a, b) => {
      const left = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const right = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return right - left;
    })
    .slice(0, 4);

  const featured = listings.filter((listing) => {
    if (!listing.featuredUntil) return false;
    return Date.parse(listing.featuredUntil) > Date.now();
  });

  const tickerListings = listings.slice(0, 18);
  const themeListings = [...featured, ...listings.filter((listing) => !featured.includes(listing))].slice(0, 10);
  const boardListings = listings.slice(0, 5);
  const highest = listings[0]?.price ?? null;
  const lowest = listings.length ? listings[listings.length - 1]?.price ?? null : null;
  const activeCounties = new Set(listings.map((listing) => listing.county)).size;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FLLM Exchange Board",
    url: canonicalUrl,
    description:
      "Active Florida liquor license asking prices, county market data and current FLLM marketplace inventory.",
    dateModified: "2026-09-07",
    publisher: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
  };

  return (
    <main className="exchange-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .exchange-page{min-height:100vh;background:#020b14;color:#eef6fb;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}
        .exchange-header{background:#020d18;border-bottom:1px solid rgba(246,167,0,.48);position:relative;z-index:30}
        .exchange-hero{position:relative;min-height:505px;overflow:hidden;background:radial-gradient(circle at 50% 24%,rgba(20,126,211,.38),transparent 30%),linear-gradient(180deg,#071b2f 0,#041321 48%,#010812 100%);border-bottom:1px solid rgba(246,167,0,.5)}
        .exchange-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(52,177,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(52,177,255,.06) 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(180deg,#000,transparent 74%);pointer-events:none}
        .exchange-stage{position:relative;z-index:2;width:min(1380px,96%);margin:0 auto;padding-top:26px}
        .exchange-upper{display:grid;grid-template-columns:1fr 1.45fr 1fr;gap:18px;align-items:stretch}
        .exchange-board-side,.exchange-board-center{border:1px solid rgba(39,181,255,.7);background:linear-gradient(180deg,rgba(8,39,69,.98),rgba(3,17,29,.98));box-shadow:0 0 28px rgba(0,150,255,.15),inset 0 0 22px rgba(0,160,255,.05);min-height:155px}
        .exchange-board-side{display:flex;flex-direction:column;justify-content:center;padding:22px 24px;text-align:center;transform:perspective(900px) rotateY(5deg)}
        .exchange-board-side.right{transform:perspective(900px) rotateY(-5deg)}
        .exchange-board-side strong{font-size:24px;line-height:1.15;color:#fff;letter-spacing:.035em}
        .exchange-board-side span{margin-top:12px;color:#f6b51f;font-size:15px;line-height:1.45;font-weight:900}
        .exchange-board-center{position:relative;overflow:hidden;border-color:#f6b51f;border-radius:50%/18%;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:18px 30px;box-shadow:0 0 32px rgba(246,181,31,.18),inset 0 0 34px rgba(246,181,31,.05)}
        .exchange-board-center:before,.exchange-board-center:after{content:"";position:absolute;left:0;right:0;height:9px;background:linear-gradient(90deg,transparent,#f6b51f,transparent);opacity:.55}
        .exchange-board-center:before{top:14px}.exchange-board-center:after{bottom:14px}
        .exchange-brandline{display:flex;align-items:center;gap:16px}
        .exchange-brandline img{width:78px;height:78px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(246,181,31,.28))}
        .exchange-brandline b{font:700 54px/1 Georgia,serif;color:#f6b51f;letter-spacing:.06em;text-shadow:0 0 18px rgba(246,181,31,.22)}
        .exchange-board-center small{color:#fff;font-size:10px;letter-spacing:.12em;margin-top:2px}
        .exchange-board-center strong{color:#52ddff;font-size:24px;letter-spacing:.35em;margin-top:12px}
        .trade-here{margin:14px auto 0;width:min(880px,90%);padding:9px 18px;text-align:center;border-top:1px solid rgba(246,181,31,.6);border-bottom:1px solid rgba(246,181,31,.6);background:#04111e;color:#f6b51f;font-size:21px;font-weight:950;letter-spacing:.08em}
        .exchange-wall{position:relative;height:215px;margin-top:2px}
        .exchange-wall:before{content:"";position:absolute;left:4%;right:4%;bottom:28px;height:112px;background:linear-gradient(180deg,rgba(2,13,24,.1),rgba(2,8,15,.96));box-shadow:0 -25px 65px rgba(0,125,255,.08)}
        .micro-screens{position:absolute;left:4%;right:4%;top:10px;display:grid;grid-template-columns:repeat(9,1fr);gap:8px;opacity:.92}
        .micro-screen{height:32px;border:1px solid rgba(61,194,255,.4);background:linear-gradient(180deg,#0a3b65,#06233d);box-shadow:0 0 10px rgba(27,174,255,.08)}
        .desk-row{position:absolute;left:2%;right:2%;bottom:0;display:flex;align-items:flex-end;justify-content:space-between;gap:10px}
        .desk-person{position:relative;width:56px;height:118px;flex:0 0 auto}
        .desk-person:before{content:"";position:absolute;left:50%;top:8px;width:28px;height:28px;transform:translateX(-50%);border-radius:50%;background:linear-gradient(180deg,#1d2731,#06090d)}
        .desk-person:after{content:"";position:absolute;left:50%;bottom:0;width:48px;height:78px;transform:translateX(-50%);border-radius:18px 18px 4px 4px;background:linear-gradient(180deg,#132331,#05090e);box-shadow:0 0 12px rgba(0,0,0,.55)}
        .desk-monitor{position:absolute;left:50%;bottom:23px;width:52px;height:30px;transform:translateX(-50%) translateX(26px);border:2px solid #111;background:linear-gradient(180deg,#0b4775,#06243b);box-shadow:0 0 8px rgba(57,184,255,.12);z-index:2}
        .ticker-wrap{background:#03111e;border-bottom:1px solid rgba(54,190,255,.35)}
        .ticker-row{overflow:hidden;white-space:nowrap;border-top:1px solid rgba(54,190,255,.25)}
        .ticker-track{display:flex;width:max-content;animation:exchangeTicker 48s linear infinite}
        .ticker-track.slow{animation-duration:72s}
        .quote{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-right:1px solid rgba(255,255,255,.15);text-decoration:none;color:#fff}
        .quote b{color:#dceeff;font-size:13px}.quote span{color:#65dcff;font-weight:900}.quote strong{color:#49e17b}.quote em{color:#49e17b;font-size:11px;font-style:normal}
        .theme-strip{background:#071522}.theme-item{display:inline-flex;align-items:center;padding:8px 17px;border-right:1px solid rgba(255,255,255,.12);color:#dce7ef;font-size:11px;font-weight:800;letter-spacing:.035em;text-decoration:none}
        .theme-item.gold{color:#f6b51f;font-size:15px}
        .theme-item.cyan{color:#76e4ff}
        .market-section{width:min(1380px,calc(100% - 32px));margin:14px auto 0;display:grid;grid-template-columns:.9fr 1.45fr .9fr;gap:14px}
        .panel{border:1px solid rgba(41,185,246,.48);background:linear-gradient(180deg,#071d31,#041321);box-shadow:inset 0 0 30px rgba(0,128,190,.05)}
        .panel-title{padding:14px 16px 8px}.panel-title b{display:block;color:#f6b51f;font-size:18px;letter-spacing:.04em}.panel-title small{display:block;color:#c9d9e2;margin-top:4px;letter-spacing:.08em;font-size:10px}
        .heat-map-box{padding:0 14px 12px;display:flex;justify-content:center}.heat-map-box img{display:block;width:100%;max-width:330px;height:auto}
        .gold-btn{display:inline-flex;align-items:center;justify-content:center;margin:0 14px 14px;min-height:38px;padding:0 18px;background:linear-gradient(180deg,#ffd65d,#e69a00);border:1px solid #f6b51f;border-radius:5px;color:#07111a;text-decoration:none;font-size:11px;font-weight:950;text-transform:uppercase}
        .board-heading{text-align:center;padding:14px 14px 9px}.board-heading h1{margin:0;color:#dff6ff;font:700 32px/1.1 Georgia,serif}.board-heading p{margin:6px 0 0;color:#4bd4ff;font-size:11px;font-weight:900;letter-spacing:.12em}
        .board-table{margin:5px 12px 12px;border-top:1px solid rgba(255,255,255,.1)}
        .board-head,.board-row{display:grid;grid-template-columns:1.15fr .78fr 1fr .78fr;gap:10px;align-items:center;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.09)}
        .board-head{color:#a9becb;font-size:9px;font-weight:900;text-transform:uppercase}.board-row{color:#fff;text-decoration:none}.board-row strong{color:#51d9ff}.board-row em{color:#47e37c;font-size:10px;font-style:normal;font-weight:900}
        .snapshot{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 12px 12px}.snapshot div{padding:13px 8px;border:1px solid rgba(80,193,242,.33);text-align:center;background:#061728}.snapshot strong{display:block;color:#69ddff;font-size:24px}.snapshot span{display:block;color:#dce7ed;font-size:9px;margin-top:5px;text-transform:uppercase}
        .newest{padding:0 12px 12px}.newest a{display:grid;grid-template-columns:auto 1fr auto auto;gap:7px;align-items:center;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#fff;text-decoration:none;font-size:10px}.newest b{padding:3px 5px;border-radius:3px;background:#f6b51f;color:#06111b;font-size:8px}.newest i{color:#b8c7d1;font-style:normal}.newest strong{color:#69ddff}
        .news-section{width:min(1380px,calc(100% - 32px));margin:14px auto 0;border:1px solid rgba(41,185,246,.48);background:#041321;overflow:hidden}.news-section img{display:block;width:100%;height:auto}.news-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:9px 14px;background:#04111d;border-top:1px solid rgba(54,190,255,.24)}.news-bar b{color:#fff;font-size:14px}.news-bar span{color:#cbdbe4;font-size:11px}.news-bar em{color:#f6b51f;font-style:normal;font-weight:900}
        .action-grid{width:min(1380px,calc(100% - 32px));margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(41,185,246,.4);border-top:1px solid rgba(41,185,246,.4)}
        .action-card{padding:18px 16px;text-align:center;border-right:1px solid rgba(41,185,246,.4);border-bottom:1px solid rgba(41,185,246,.4);background:#061629}.action-card .icon{display:block;color:#f6b51f;font-size:28px}.action-card h2{margin:5px 0;color:#f6b51f;font-size:17px}.action-card p{margin:0 auto;min-height:38px;max-width:220px;color:#d6e1e7;font-size:11px;line-height:1.45}.action-card a{display:inline-flex;margin-top:12px;padding:8px 14px;border-radius:4px;background:linear-gradient(180deg,#ffd65d,#e69a00);color:#08111a;text-decoration:none;font-size:10px;font-weight:950;text-transform:uppercase}
        .transparency-band{position:relative;width:min(1380px,calc(100% - 32px));margin:0 auto 26px;overflow:hidden;border:1px solid rgba(246,181,31,.34);background:linear-gradient(rgba(2,15,27,.44),rgba(2,15,27,.7)),url('/assets/hero-skyline-clean.png') center 62%/cover no-repeat;padding:22px 20px 24px;text-align:center}
        .transparency-band h2{margin:0;color:#f6b51f;font-size:20px;letter-spacing:.05em}.transparency-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:780px;margin:18px auto 0}.transparency-mini div{padding:13px 10px;background:rgba(5,22,38,.78);border:1px solid rgba(68,188,241,.24)}.transparency-mini strong{display:block;color:#fff;font-size:11px}.transparency-mini span{display:block;color:#bcd0dc;font-size:10px;margin-top:4px}
        .market-disclosure{width:min(1380px,calc(100% - 32px));margin:0 auto 28px;padding:12px 14px;border-top:1px solid rgba(255,255,255,.08);color:#9fb3bf;font-size:10px;line-height:1.55}
        .seo-copy{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
        @keyframes exchangeTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(max-width:1000px){.exchange-upper{grid-template-columns:1fr}.exchange-board-side{display:none}.exchange-stage{width:100%;padding-top:14px}.exchange-board-center{margin:0 14px;min-height:130px}.exchange-brandline b{font-size:40px}.trade-here{font-size:16px}.exchange-wall{height:165px}.desk-person{width:44px;height:90px}.desk-person:after{width:38px;height:62px}.desk-monitor{display:none}.micro-screens{grid-template-columns:repeat(6,1fr)}.market-section{grid-template-columns:1fr}.action-grid{grid-template-columns:1fr 1fr}.transparency-mini{grid-template-columns:1fr}}
        @media(max-width:620px){.exchange-board-center{border-radius:26px}.exchange-brandline img{width:58px;height:58px}.exchange-brandline b{font-size:33px}.exchange-board-center strong{font-size:17px;letter-spacing:.22em}.trade-here{font-size:13px}.exchange-wall{height:135px}.desk-person:nth-child(n+11){display:none}.action-grid{grid-template-columns:1fr}.board-head,.board-row{grid-template-columns:1.1fr .7fr 1fr}.board-head span:last-child,.board-row em{display:none}.news-bar{align-items:flex-start;flex-direction:column}.transparency-band h2{font-size:16px}}
      ` }} />

      <div className="exchange-header">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" />
      </div>

      <section className="exchange-hero" aria-label="FLLM Exchange trading floor">
        <div className="exchange-stage">
          <div className="exchange-upper">
            <div className="exchange-board-side">
              <strong>FLORIDA<br/>LIQUOR LICENSES</strong>
              <span>A MORE TRANSPARENT MARKET.</span>
            </div>
            <div className="exchange-board-center">
              <div className="exchange-brandline">
                <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
                <b>FLLM</b>
              </div>
              <small>FLORIDA LIQUOR LICENSE MARKETPLACE</small>
              <strong>EXCHANGE</strong>
            </div>
            <div className="exchange-board-side right">
              <strong>REAL OPPORTUNITY.<br/>REAL INFORMATION.</strong>
              <span>A MORE TRANSPARENT MARKET.</span>
            </div>
          </div>

          <div className="trade-here">FLORIDA LIQUOR LICENSES TRADE HERE</div>

          <div className="exchange-wall" aria-hidden="true">
            <div className="micro-screens">
              {smallScreens.map((screen) => <span className="micro-screen" key={screen} />)}
            </div>
            <div className="desk-row">
              {deskPeople.map((person) => (
                <span className="desk-person" key={person}><i className="desk-monitor" /></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ticker-wrap" aria-label="Florida liquor license asking-price tickers">
        <div className="ticker-row">
          <div className="ticker-track">
            {[...tickerListings, ...tickerListings].map((listing, index) => (
              <Link href={listingPageHref(listing)} className="quote" key={`${listing.sourceRef}-${index}`}>
                <b>{shortCounty(listing.county)}</b>
                <span>{shortType(listing.type)}</span>
                <strong>{money(listing.price, listing.priceLabel)}</strong>
                <em>ASK ▲</em>
              </Link>
            ))}
          </div>
        </div>
        <div className="ticker-row theme-strip">
          <div className="ticker-track slow">
            {[0,1].map((cycle) => (
              <div key={cycle}>
                <span className="theme-item gold">FLLM</span>
                <span className="theme-item">ADDING TRANSPARENCY TO THE FLORIDA LIQUOR LICENSE MARKET</span>
                <span className="theme-item">ACTIVE ASKING PRICES</span>
                <span className="theme-item">COUNTY PRICE DISCOVERY</span>
                <span className="theme-item">MARKET DATA</span>
                <span className="theme-item">NEW LISTINGS</span>
                <span className="theme-item">4COP</span>
                <span className="theme-item">3PS</span>
                <span className="theme-item">FLORIDA LIQUOR LICENSE NEWS</span>
                {themeListings.map((listing,index) => (
                  <Link className="theme-item cyan" href={listingPageHref(listing)} key={`${cycle}-${listing.sourceRef}-${index}`}>
                    {listing.featuredUntil ? "FEATURED · " : ""}{shortCounty(listing.county)} · {shortType(listing.type)} · {money(listing.price, listing.priceLabel)} ASK
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="market-section">
        <article className="panel">
          <div className="panel-title"><b>FLORIDA MARKET HEAT MAP</b><small>ACTIVE ASKING PRICES BY COUNTY</small></div>
          <div className="heat-map-box">
            <img src="/assets/fllm-exchange-heatmap.svg" alt="Florida liquor license asking-price heat map" />
          </div>
          <Link className="gold-btn" href="/?open=heat-map">Explore County Markets</Link>
        </article>

        <article className="panel">
          <div className="board-heading">
            <h1>FLLM Exchange Board</h1>
            <p>ACTIVE FLORIDA LIQUOR LICENSE ASKING PRICES</p>
          </div>
          <div className="board-table">
            <div className="board-head"><span>County</span><span>License Type</span><span>Asking Price</span><span>Status</span></div>
            {boardListings.map((listing) => (
              <Link className="board-row" href={listingPageHref(listing)} key={listing.sourceRef}>
                <span>{shortCounty(listing.county)}</span>
                <span>{shortType(listing.type)}</span>
                <strong>{money(listing.price, listing.priceLabel)}</strong>
                <em>AVAILABLE</em>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center" }}><Link className="gold-btn" href="/listings">View All Listings</Link></div>
        </article>

        <aside>
          <article className="panel" style={{ marginBottom: 12 }}>
            <div className="panel-title"><b>MARKET SNAPSHOT</b><small>FLORIDA LIQUOR LICENSE MARKET</small></div>
            <div className="snapshot">
              <div><strong>{listings.length}</strong><span>Active Listings</span></div>
              <div><strong>{activeCounties}</strong><span>Counties</span></div>
              <div><strong>{money(highest,"—")}</strong><span>Highest Ask</span></div>
              <div><strong>{money(lowest,"—")}</strong><span>Lowest Ask</span></div>
            </div>
          </article>
          <article className="panel">
            <div className="panel-title"><b>NEWEST TO MARKET</b></div>
            <div className="newest">
              {newest.map((listing) => (
                <Link href={listingPageHref(listing)} key={listing.sourceRef}>
                  <b>NEW</b><span>{shortCounty(listing.county)}</span><i>{shortType(listing.type)}</i><strong>{money(listing.price,listing.priceLabel)}</strong>
                </Link>
              ))}
            </div>
            <div style={{ textAlign:"center" }}><Link className="gold-btn" href="/listings">View Newest Listings</Link></div>
          </article>
        </aside>
      </section>

      <section className="news-section" aria-label="FLLM News Florida liquor license market update">
        <img src="/assets/market-report-studio.png" alt="FLLM market reporters discussing Florida liquor license market data with a Florida heat map" />
        <div className="news-bar">
          <b>FLLM NEWS</b>
          <span>EXPERTS. INSIGHTS. <em>A MORE TRANSPARENT MARKET.</em></span>
          <Link className="gold-btn" href="/market-data" style={{ margin:0 }}>Watch Market Updates</Link>
        </div>
      </section>

      <section className="action-grid">
        <article className="action-card"><span className="icon">🛒</span><h2>For Buyers</h2><p>Find available liquor licenses by county and license type.</p><Link href="/listings">Browse Licenses</Link></article>
        <article className="action-card"><span className="icon">🏷</span><h2>For Sellers</h2><p>List your Florida liquor license and reach qualified buyers.</p><Link href="/sell-your-license">List Your License</Link></article>
        <article className="action-card"><span className="icon">👥</span><h2>For Brokers</h2><p>Market your client inventory while remaining the listing representative.</p><Link href="/brokers/list-your-license">Broker Options</Link></article>
        <article className="action-card"><span className="icon">▥</span><h2>Market Data</h2><p>Explore pricing, trends and county market information.</p><Link href="/market-data">View Market Data</Link></article>
      </section>

      <section className="transparency-band">
        <h2>ADDING TRANSPARENCY TO THE FLORIDA LIQUOR LICENSE MARKET</h2>
        <div className="transparency-mini">
          <div><strong>MORE INFORMATION</strong><span>Listings, asking prices and county-level market context.</span></div>
          <div><strong>MORE OPPORTUNITY</strong><span>A statewide view for buyers, sellers, brokers and lenders.</span></div>
          <div><strong>A MORE TRANSPARENT MARKET</strong><span>Organized public information in a fragmented private market.</span></div>
        </div>
      </section>

      <section className="market-disclosure">
        Market data shown reflects active asking prices and marketplace information. Asking prices are not completed sale prices, appraisals or guarantees of value.
      </section>

      <section className="seo-copy">
        <h2>Why the Florida liquor license market needs more transparency</h2>
        <p>Florida quota liquor license sales are fragmented across counties and are frequently marketed through private owners, brokers, attorneys and industry relationships. Unlike residential real estate, there is no single statewide MLS-style system that provides a comprehensive public view of quota liquor licenses offered for sale. FLLM organizes active listings, asking prices, county market information, license types and transaction resources into one statewide marketplace.</p>
      </section>
    </main>
  );
}
