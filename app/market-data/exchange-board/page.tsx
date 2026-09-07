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
    .slice(0, 5);

  const featured = listings.filter((listing) => {
    if (!listing.featuredUntil) return false;
    return Date.parse(listing.featuredUntil) > Date.now();
  });

  const tickerListings = listings.slice(0, 18);
  const themeListings = [...featured, ...listings.filter((listing) => !featured.includes(listing))].slice(0, 10);
  const boardListings = listings.slice(0, 7);
  const leftBoard = listings.slice(0, 6);
  const rightBoard = listings.slice(6, 12).length ? listings.slice(6, 12) : listings.slice(0, 6);
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
        .exchange-hero{position:relative;overflow:hidden;background:radial-gradient(circle at 50% 12%,rgba(22,126,205,.28),transparent 27%),linear-gradient(180deg,#071b2f 0,#041321 52%,#010812 100%);border-bottom:1px solid rgba(246,167,0,.48)}
        .exchange-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(52,177,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(52,177,255,.045) 1px,transparent 1px);background-size:56px 56px;mask-image:linear-gradient(180deg,#000,transparent 86%);pointer-events:none}
        .exchange-stage{position:relative;z-index:2;width:min(1380px,calc(100% - 32px));margin:0 auto;padding:28px 0 26px}
        .exchange-kicker{text-align:center;color:#62dcff;font-size:10px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}
        .exchange-title{text-align:center;margin:7px 0 4px;color:#f6b51f;font:700 clamp(34px,5vw,62px)/1 Georgia,serif;letter-spacing:.035em}
        .exchange-subtitle{text-align:center;margin:0 auto 22px;max-width:820px;color:#d7e6ef;font-size:13px;line-height:1.55}
        .exchange-upper{display:grid;grid-template-columns:1fr 1.12fr 1fr;gap:14px;align-items:stretch}
        .quote-board,.exchange-center{border:1px solid rgba(45,183,248,.58);background:linear-gradient(180deg,rgba(8,39,69,.98),rgba(3,17,29,.98));box-shadow:0 0 28px rgba(0,150,255,.12),inset 0 0 22px rgba(0,160,255,.04)}
        .quote-board{padding:15px 17px}.quote-board h2{margin:0 0 10px;color:#f6b51f;font-size:14px;letter-spacing:.08em}.quote-board small{display:block;color:#8da7b8;font-size:9px;letter-spacing:.08em;margin-top:3px}
        .hero-quote{display:grid;grid-template-columns:1fr auto auto;gap:13px;align-items:center;padding:9px 0;border-top:1px solid rgba(255,255,255,.09);text-decoration:none;color:#fff}.hero-quote:first-of-type{border-top:0}.hero-quote span{font-size:12px;font-weight:800}.hero-quote b{color:#69ddff;font-size:11px}.hero-quote strong{color:#4ce07e;font-size:13px}
        .exchange-center{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:255px;padding:24px;text-align:center;border-color:rgba(246,181,31,.74)}
        .exchange-center:before,.exchange-center:after{content:"";position:absolute;left:8%;right:8%;height:1px;background:linear-gradient(90deg,transparent,#f6b51f,transparent)}.exchange-center:before{top:17px}.exchange-center:after{bottom:17px}
        .exchange-center .mark{color:#f6b51f;font:700 58px/1 Georgia,serif;letter-spacing:.06em;text-shadow:0 0 18px rgba(246,181,31,.22)}
        .exchange-center .word{margin-top:8px;color:#5bdcff;font-size:24px;font-weight:950;letter-spacing:.36em;padding-left:.36em}
        .exchange-center p{max-width:430px;margin:15px 0 0;color:#c8d8e2;font-size:12px;line-height:1.55}
        .market-status{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;width:100%;margin-top:18px}.market-status div{padding:10px 6px;border:1px solid rgba(80,193,242,.28);background:#061728}.market-status strong{display:block;color:#fff;font-size:17px}.market-status span{display:block;margin-top:3px;color:#8fa8b8;font-size:8px;text-transform:uppercase;letter-spacing:.08em}
        .ticker-wrap{background:#03111e;border-bottom:1px solid rgba(54,190,255,.35)}
        .ticker-row{overflow:hidden;white-space:nowrap;border-top:1px solid rgba(54,190,255,.25)}
        .ticker-track{display:flex;width:max-content;animation:exchangeTicker 48s linear infinite}.ticker-track.slow{animation-duration:72s}
        .quote{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-right:1px solid rgba(255,255,255,.15);text-decoration:none;color:#fff}.quote b{color:#dceeff;font-size:13px}.quote span{color:#65dcff;font-weight:900}.quote strong{color:#49e17b}.quote em{color:#49e17b;font-size:11px;font-style:normal}
        .theme-strip{background:#071522}.theme-item{display:inline-flex;align-items:center;padding:8px 17px;border-right:1px solid rgba(255,255,255,.12);color:#dce7ef;font-size:11px;font-weight:800;letter-spacing:.035em;text-decoration:none}.theme-item.gold{color:#f6b51f;font-size:15px}.theme-item.cyan{color:#76e4ff}
        .market-section{width:min(1380px,calc(100% - 32px));margin:14px auto 0;display:grid;grid-template-columns:.9fr 1.45fr .9fr;gap:14px}
        .panel{border:1px solid rgba(41,185,246,.48);background:linear-gradient(180deg,#071d31,#041321);box-shadow:inset 0 0 30px rgba(0,128,190,.05)}
        .panel-title{padding:14px 16px 8px}.panel-title b{display:block;color:#f6b51f;font-size:18px;letter-spacing:.04em}.panel-title small{display:block;color:#c9d9e2;margin-top:4px;letter-spacing:.08em;font-size:10px}
        .heat-map-box{padding:0 14px 12px;display:flex;justify-content:center}.heat-map-box img{display:block;width:100%;max-width:360px;height:auto}
        .gold-btn{display:inline-flex;align-items:center;justify-content:center;margin:0 14px 14px;min-height:38px;padding:0 18px;background:linear-gradient(180deg,#ffd65d,#e69a00);border:1px solid #f6b51f;border-radius:5px;color:#07111a;text-decoration:none;font-size:11px;font-weight:950;text-transform:uppercase}
        .board-heading{text-align:center;padding:14px 14px 9px}.board-heading h2{margin:0;color:#dff6ff;font:700 32px/1.1 Georgia,serif}.board-heading p{margin:6px 0 0;color:#4bd4ff;font-size:11px;font-weight:900;letter-spacing:.12em}
        .board-table{margin:5px 12px 12px;border-top:1px solid rgba(255,255,255,.1)}
        .board-head,.board-row{display:grid;grid-template-columns:1.15fr .78fr 1fr .78fr;gap:14px;align-items:center;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.09)}
        .board-head{color:#a9becb;font-size:9px;font-weight:900;text-transform:uppercase}.board-row{color:#fff;text-decoration:none;font-size:13px}.board-row strong{color:#51d9ff;font-size:14px}.board-row em{color:#47e37c;font-size:10px;font-style:normal;font-weight:900}
        .snapshot{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 12px 12px}.snapshot div{padding:15px 8px;border:1px solid rgba(80,193,242,.33);text-align:center;background:#061728}.snapshot strong{display:block;color:#69ddff;font-size:23px}.snapshot span{display:block;color:#dce7ed;font-size:9px;margin-top:5px;text-transform:uppercase}
        .newest{padding:0 12px 12px}.newest a{display:grid;grid-template-columns:auto 1fr auto auto;gap:7px;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#fff;text-decoration:none;font-size:10px}.newest b{padding:3px 5px;border-radius:3px;background:#f6b51f;color:#06111b;font-size:8px}.newest i{color:#b8c7d1;font-style:normal}.newest strong{color:#69ddff}
        .news-section{width:min(1380px,calc(100% - 32px));margin:14px auto 0;border:1px solid rgba(41,185,246,.48);background:#041321;overflow:hidden}.news-visual{position:relative;min-height:320px;background:linear-gradient(90deg,rgba(2,13,23,.95),rgba(2,13,23,.18) 46%,rgba(2,13,23,.58)),url('/assets/market-report-studio.png') center/cover no-repeat}.news-copy{position:absolute;left:5%;top:50%;transform:translateY(-50%);max-width:430px;padding:22px;background:rgba(3,17,29,.78);border-left:4px solid #f6b51f}.news-copy small{color:#69ddff;font-size:10px;font-weight:900;letter-spacing:.12em}.news-copy h2{margin:7px 0;color:#fff;font:700 28px/1.1 Georgia,serif}.news-copy p{margin:0;color:#cbd9e1;font-size:12px;line-height:1.6}.news-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 14px;background:#04111d;border-top:1px solid rgba(54,190,255,.24)}.news-bar b{color:#fff;font-size:14px}.news-bar span{color:#cbdbe4;font-size:11px}.news-bar em{color:#f6b51f;font-style:normal;font-weight:900}
        .action-grid{width:min(1380px,calc(100% - 32px));margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(41,185,246,.4);border-top:1px solid rgba(41,185,246,.4)}
        .action-card{padding:20px 16px;text-align:center;border-right:1px solid rgba(41,185,246,.4);border-bottom:1px solid rgba(41,185,246,.4);background:#061629}.action-card .icon{display:block;color:#f6b51f;font-size:26px}.action-card h2{margin:6px 0;color:#f6b51f;font-size:17px}.action-card p{margin:0 auto;min-height:38px;max-width:230px;color:#d6e1e7;font-size:11px;line-height:1.45}.action-card a{display:inline-flex;margin-top:12px;padding:8px 14px;border-radius:4px;background:linear-gradient(180deg,#ffd65d,#e69a00);color:#08111a;text-decoration:none;font-size:10px;font-weight:950;text-transform:uppercase}
        .transparency-band{position:relative;width:min(1380px,calc(100% - 32px));margin:0 auto 18px;overflow:hidden;border:1px solid rgba(246,181,31,.34);background:linear-gradient(rgba(2,15,27,.55),rgba(2,15,27,.78)),url('/assets/hero-skyline-clean.png') center 62%/cover no-repeat;padding:26px 20px 28px;text-align:center}.transparency-band h2{margin:0;color:#f6b51f;font-size:20px;letter-spacing:.05em}.transparency-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:850px;margin:18px auto 0}.transparency-mini div{padding:15px 12px;background:rgba(5,22,38,.82);border:1px solid rgba(68,188,241,.24)}.transparency-mini strong{display:block;color:#fff;font-size:11px}.transparency-mini span{display:block;color:#bcd0dc;font-size:10px;margin-top:4px;line-height:1.45}
        .market-disclosure{width:min(1380px,calc(100% - 32px));margin:0 auto 28px;padding:12px 14px;border-top:1px solid rgba(255,255,255,.08);color:#9fb3bf;font-size:10px;line-height:1.55}
        .seo-copy{width:min(1120px,calc(100% - 32px));margin:10px auto 34px;padding:24px;border:1px solid rgba(41,185,246,.22);background:#04111d}.seo-copy h2{margin:0 0 9px;color:#fff;font:700 25px/1.15 Georgia,serif}.seo-copy p{margin:0;color:#aebfca;font-size:12px;line-height:1.7}
        @keyframes exchangeTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(max-width:1100px){.exchange-upper,.market-section{grid-template-columns:1fr 1fr}.exchange-center{grid-column:1/-1;grid-row:1}.market-section>aside{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:14px}.market-section>aside .panel{margin-bottom:0!important}.action-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:760px){.exchange-stage{width:min(100% - 18px,680px)}.exchange-upper,.market-section{grid-template-columns:1fr}.exchange-center{grid-column:auto}.quote-board{display:none}.exchange-title{font-size:36px}.exchange-center .mark{font-size:45px}.exchange-center .word{font-size:18px}.market-status{grid-template-columns:1fr}.market-section>aside{grid-column:auto;display:block}.market-section>aside .panel{margin-bottom:12px!important}.board-head,.board-row{grid-template-columns:1fr .7fr 1fr}.board-head span:last-child,.board-row em{display:none}.news-visual{min-height:390px}.news-copy{left:18px;right:18px;top:auto;bottom:18px;transform:none}.news-bar{align-items:flex-start;flex-direction:column}.action-grid{grid-template-columns:1fr}.transparency-mini{grid-template-columns:1fr}}
      ` }} />

      <div className="exchange-header">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" />
      </div>

      <section className="exchange-hero" aria-labelledby="exchange-title">
        <div className="exchange-stage">
          <div className="exchange-kicker">Florida Liquor License Market · Statewide Price Discovery</div>
          <h1 className="exchange-title" id="exchange-title">FLLM Exchange Board</h1>
          <p className="exchange-subtitle">Active asking prices, county-level inventory and market information designed to add transparency to Florida’s fragmented quota-license market.</p>

          <div className="exchange-upper">
            <article className="quote-board">
              <h2>FLORIDA ASKING PRICES<small>SELECT ACTIVE LISTINGS</small></h2>
              {leftBoard.map((listing) => (
                <Link className="hero-quote" href={listingPageHref(listing)} key={`left-${listing.sourceRef}`}>
                  <span>{shortCounty(listing.county)}</span>
                  <b>{shortType(listing.type)}</b>
                  <strong>{money(listing.price, listing.priceLabel)}</strong>
                </Link>
              ))}
            </article>

            <article className="exchange-center">
              <div className="mark">FLLM</div>
              <div className="word">EXCHANGE</div>
              <p>Real listings. Real asking prices. One statewide view of the Florida liquor license marketplace.</p>
              <div className="market-status">
                <div><strong>{listings.length}</strong><span>Active Listings</span></div>
                <div><strong>{activeCounties}</strong><span>Counties Represented</span></div>
                <div><strong>{money(highest, "—")}</strong><span>Highest Ask</span></div>
              </div>
            </article>

            <article className="quote-board">
              <h2>COUNTY MARKET BOARD<small>MORE ACTIVE INVENTORY</small></h2>
              {rightBoard.map((listing) => (
                <Link className="hero-quote" href={listingPageHref(listing)} key={`right-${listing.sourceRef}`}>
                  <span>{shortCounty(listing.county)}</span>
                  <b>{shortType(listing.type)}</b>
                  <strong>{money(listing.price, listing.priceLabel)}</strong>
                </Link>
              ))}
            </article>
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
            {[0, 1].map((cycle) => (
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
                {themeListings.map((listing, index) => (
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
          <div className="panel-title"><b>FLORIDA MARKET HEAT MAP</b><small>COUNTY-LEVEL MARKET VIEW</small></div>
          <div className="heat-map-box">
            <img src="/assets/fllm-exchange-heatmap.svg" alt="Florida liquor license market heat map" />
          </div>
          <Link className="gold-btn" href="/?open=heat-map">Explore County Markets</Link>
        </article>

        <article className="panel">
          <div className="board-heading">
            <h2>FLLM Exchange Board</h2>
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
            <div className="panel-title"><b>MARKET SNAPSHOT</b><small>CURRENT FLLM MARKETPLACE INVENTORY</small></div>
            <div className="snapshot">
              <div><strong>{listings.length}</strong><span>Active Listings</span></div>
              <div><strong>{activeCounties}</strong><span>Counties</span></div>
              <div><strong>{money(highest, "—")}</strong><span>Highest Ask</span></div>
              <div><strong>{money(lowest, "—")}</strong><span>Lowest Ask</span></div>
            </div>
          </article>
          <article className="panel">
            <div className="panel-title"><b>NEWEST TO MARKET</b><small>RECENTLY PUBLISHED LISTINGS</small></div>
            <div className="newest">
              {newest.map((listing) => (
                <Link href={listingPageHref(listing)} key={listing.sourceRef}>
                  <b>NEW</b><span>{shortCounty(listing.county)}</span><i>{shortType(listing.type)}</i><strong>{money(listing.price, listing.priceLabel)}</strong>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center" }}><Link className="gold-btn" href="/listings">View Newest Listings</Link></div>
          </article>
        </aside>
      </section>

      <section className="news-section" aria-label="FLLM News Florida liquor license market update">
        <div className="news-visual">
          <div className="news-copy">
            <small>FLLM NEWS · MARKET INTELLIGENCE</small>
            <h2>Experts. Insights. A More Transparent Market.</h2>
            <p>Follow Florida liquor license market developments, county pricing, quota-lottery updates, regulations and transaction trends.</p>
          </div>
        </div>
        <div className="news-bar">
          <b>FLLM NEWS</b>
          <span>FLORIDA LIQUOR LICENSE MARKET UPDATES · <em>ADDING TRANSPARENCY</em></span>
          <Link className="gold-btn" href="/florida-liquor-license-news" style={{ margin: 0 }}>Watch Market Updates</Link>
        </div>
      </section>

      <section className="action-grid">
        <article className="action-card"><span className="icon">⌕</span><h2>For Buyers</h2><p>Find available liquor licenses by county and license type.</p><Link href="/listings">Browse Licenses</Link></article>
        <article className="action-card"><span className="icon">◇</span><h2>For Sellers</h2><p>List your Florida liquor license and reach qualified buyers.</p><Link href="/sell-your-license">List Your License</Link></article>
        <article className="action-card"><span className="icon">◎</span><h2>For Brokers</h2><p>Market client inventory while remaining the listing representative.</p><Link href="/brokers/list-your-license">Broker Options</Link></article>
        <article className="action-card"><span className="icon">▥</span><h2>Market Data</h2><p>Explore pricing, trends and county market information.</p><Link href="/#market-data">View Market Data</Link></article>
      </section>

      <section className="transparency-band">
        <h2>ADDING TRANSPARENCY TO THE FLORIDA LIQUOR LICENSE MARKET</h2>
        <div className="transparency-mini">
          <div><strong>MORE INFORMATION</strong><span>Listings, asking prices and county-level market context in one place.</span></div>
          <div><strong>BETTER PRICE DISCOVERY</strong><span>Compare active inventory across counties and quota-license series.</span></div>
          <div><strong>A MORE TRANSPARENT MARKET</strong><span>Organized public information in a fragmented private market.</span></div>
        </div>
      </section>

      <section className="market-disclosure">
        Market data shown reflects active asking prices and marketplace information. Asking prices are not completed sale prices, appraisals or guarantees of value. Availability and pricing can change without notice.
      </section>

      <section className="seo-copy">
        <h2>Why the Florida liquor license market needs more transparency</h2>
        <p>Florida quota liquor license sales are fragmented across counties and are frequently marketed through private owners, brokers, attorneys and industry relationships. Unlike residential real estate, there is no single statewide MLS-style system that provides a comprehensive public view of quota liquor licenses offered for sale. FLLM organizes active listings, asking prices, county market information, license types and transaction resources into one statewide marketplace.</p>
      </section>
    </main>
  );
}
