import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Asking Prices",
  description:
    "Active Florida liquor license asking prices, county price discovery and current marketplace inventory.",
  alternates: {
    canonical:
      "https://www.floridaliquorlicensemarket.com/market-data/exchange-board",
  },
  robots: { index: true, follow: true },
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
    .slice(0, 4);

  const boardListings = listings.slice(0, 5);
  const tickerOne = listings.slice(0, 10);
  const tickerTwo = listings.slice(10, 20).length
    ? listings.slice(10, 20)
    : listings.slice(0, 10);

  const highest = listings[0]?.price ?? null;
  const lowest = listings.length
    ? listings[listings.length - 1]?.price ?? null
    : null;
  const countyCount = new Set(listings.map((listing) => listing.county)).size;

  return (
    <main className="exchange-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .exchange-page{min-height:100vh;background:#031321;color:#edf6fb;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}
        .exchange-header{background:#020d18;border-bottom:1px solid rgba(246,167,0,.55);position:relative;z-index:20}
        .hero-shell{position:relative;min-height:260px;aspect-ratio:auto;background:#020b14;border-bottom:1px solid rgba(42,184,243,.35);overflow:hidden}
        .hero-shell img{display:block;position:absolute!important;inset:0;width:100%!important;height:100%!important;aspect-ratio:auto;object-fit:cover!important;object-position:center 48%;opacity:.58!important}
        .hero-shell:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,11,20,.72),rgba(2,11,20,.08) 38%,rgba(2,11,20,.08) 62%,rgba(2,11,20,.72)),linear-gradient(180deg,rgba(2,11,20,.08),rgba(2,11,20,.72))}
        .hero-copy{position:absolute;z-index:2;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;text-align:center;text-shadow:0 3px 18px #000}
        .hero-copy strong{color:#fff;font:700 clamp(30px,4.2vw,64px)/1 Georgia,serif;letter-spacing:.07em}
        .hero-copy span{margin-top:12px;padding:8px 15px;border-top:1px solid rgba(246,181,31,.8);border-bottom:1px solid rgba(246,181,31,.8);color:#f6b51f;font-size:clamp(11px,1.4vw,18px);font-weight:900;letter-spacing:.16em;text-transform:uppercase}
        .ticker-shell{background:#03111e;border-bottom:1px solid rgba(44,188,248,.35)}
        .ticker-line{overflow:hidden;white-space:nowrap;border-top:1px solid rgba(66,190,242,.24)}
        .ticker-track{display:flex;width:max-content;animation:fllmTicker 52s linear infinite}
        .ticker-line:nth-child(2) .ticker-track{animation-duration:64s;animation-direction:reverse}
        .ticker-item{display:inline-flex;align-items:center;gap:9px;min-height:40px;padding:0 18px;border-right:1px solid rgba(255,255,255,.14);color:#fff;text-decoration:none}
        .ticker-item b{font-size:12px;color:#dbe9f1}.ticker-item span{font-size:13px;font-weight:900;color:#64dfff}.ticker-item strong{font-size:13px;color:#49e17b}.ticker-item em{font-size:10px;color:#49e17b;font-style:normal;font-weight:900}
        .exchange-content{width:min(1400px,calc(100% - 28px));margin:14px auto 0}
        .market-grid{display:grid;grid-template-columns:.9fr 1.45fr .9fr;gap:12px}
        .panel{min-width:0;border:1px solid #176a90;background:linear-gradient(180deg,#071f34,#041321);box-shadow:inset 0 0 30px rgba(0,132,196,.06)}
        .panel-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:14px 14px 9px}
        .panel-heading strong{display:block;color:#f6b51f;font-size:18px;line-height:1.04;letter-spacing:.035em}.panel-heading small{display:block;color:#d8e5ec;font-size:9px;line-height:1.25;letter-spacing:.06em;text-transform:uppercase}
        .heatmap-wrap{padding:0 12px 8px}.heatmap-wrap img{display:block;width:100%;height:auto;background:#04101c}
        .gold-button{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 19px;border:1px solid #f6c145;border-radius:4px;background:linear-gradient(180deg,#ffd764,#eba315);color:#06111b;text-decoration:none;font-size:10px;font-weight:950;text-transform:uppercase}
        .panel-action{padding:0 14px 14px}
        .board-title{text-align:center;padding:14px 14px 10px}.board-title h1{margin:0;color:#dff5ff;font:700 30px/1.1 Georgia,serif;letter-spacing:.02em}.board-title p{margin:5px 0 0;color:#54d9ff;font-size:10px;font-weight:900;letter-spacing:.12em}
        .board-table{margin:0 10px 11px;border-top:1px solid rgba(255,255,255,.09)}
        .board-head,.board-row{display:grid;grid-template-columns:1.12fr .82fr 1fr .76fr;gap:10px;align-items:center;padding:10px 10px;border-bottom:1px solid rgba(255,255,255,.09)}
        .board-head{color:#abc0cd;font-size:8px;font-weight:900;text-transform:uppercase}.board-row{color:#fff;text-decoration:none;font-size:12px}.board-row strong{color:#56d9ff}.board-row em{color:#45e17a;font-size:9px;font-style:normal;font-weight:950}
        .snapshot-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:0 12px 12px}.snapshot-grid div{padding:12px 7px;border:1px solid rgba(72,186,236,.36);background:#061728;text-align:center}.snapshot-grid strong{display:block;color:#63dcff;font-size:21px}.snapshot-grid span{display:block;margin-top:4px;color:#d5e2e9;font-size:8px;text-transform:uppercase}
        .newest-box{margin-top:10px}.newest-list{padding:0 12px 8px}.newest-list a{display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:7px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#fff;text-decoration:none;font-size:9px}.newest-list b{padding:2px 4px;border-radius:2px;background:#f6b51f;color:#06111b;font-size:7px}.newest-list i{color:#b7c7d0;font-style:normal}.newest-list strong{color:#59d8ff}
        .news-section{margin-top:12px;border:1px solid #176a90;background:#041321;overflow:hidden}.news-section img{display:block;width:100%;height:auto;max-height:420px;object-fit:cover}.news-bar{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:18px;padding:10px 14px;border-top:1px solid rgba(52,184,239,.28);background:#04111d}.news-bar b{font-size:13px;color:#fff}.news-bar span{text-align:center;color:#d0dce4;font-size:10px}.news-bar em{color:#f6b51f;font-style:normal;font-weight:900}
        .action-grid{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid #176a90}.action-card{padding:18px 14px 16px;text-align:center;border-right:1px solid #176a90;border-bottom:1px solid #176a90;background:#07192b}.action-card h2{margin:6px 0;color:#f6b51f;font-size:15px}.action-card p{min-height:34px;max-width:210px;margin:0 auto;color:#d6e2e8;font-size:10px;line-height:1.45}.action-card .gold-button{margin-top:11px}
        .transparency-band{padding:24px 18px 26px;border:1px solid rgba(246,181,31,.32);background:linear-gradient(rgba(3,17,29,.56),rgba(3,17,29,.70)),url('/assets/hero-skyline-clean.png') center 62%/cover no-repeat;text-align:center}.transparency-band h2{margin:0;color:#f6b51f;font-size:18px;letter-spacing:.055em}.transparency-values{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:720px;margin:17px auto 0}.transparency-values div{padding:12px 10px;background:rgba(3,20,34,.76);border:1px solid rgba(68,188,241,.22)}.transparency-values strong{display:block;color:#fff;font-size:10px}.transparency-values span{display:block;margin-top:4px;color:#b8cbd7;font-size:9px}
        .disclosure{padding:16px 18px 24px;color:#91a8b6;font-size:9px;line-height:1.55;border-top:1px solid rgba(255,255,255,.06)}
        @keyframes fllmTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(max-width:1000px){.market-grid{grid-template-columns:1fr 1.3fr}.market-grid>aside{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:12px}.action-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:700px){.hero-shell{min-height:210px}.hero-copy{padding:20px}.exchange-content{width:min(100% - 16px,680px)}.market-grid{grid-template-columns:1fr}.market-grid>aside{grid-column:auto;display:block}.board-head,.board-row{grid-template-columns:1fr .72fr 1fr}.board-head span:last-child,.board-row em{display:none}.news-bar{grid-template-columns:1fr;align-items:start}.news-bar span{text-align:left}.action-grid{grid-template-columns:1fr}.transparency-values{grid-template-columns:1fr}}
      `}} />

      <div className="exchange-header">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="List Your License"
        />
      </div>

      <section className="hero-shell" aria-label="FLLM Exchange trading floor">
        <img
          src="/assets/market-report-studio.png"
          alt="FLLM Florida liquor license market studio"
        />
        <div className="hero-copy">
          <strong>FLLM EXCHANGE</strong>
          <span>Florida Liquor Licenses Trade Here</span>
        </div>
      </section>

      <section className="ticker-shell" aria-label="Active Florida liquor license asking prices">
        <div className="ticker-line"><div className="ticker-track">
          {[...tickerOne, ...tickerOne].map((listing, index) => (
            <Link className="ticker-item" href={listingPageHref(listing)} key={`a-${listing.sourceRef}-${index}`}>
              <b>{shortCounty(listing.county)}</b>
              <span>{shortType(listing.type)}</span>
              <strong>{money(listing.price, listing.priceLabel)}</strong>
              <em>▲</em>
            </Link>
          ))}
        </div></div>
        <div className="ticker-line"><div className="ticker-track">
          {[...tickerTwo, ...tickerTwo].map((listing, index) => (
            <Link className="ticker-item" href={listingPageHref(listing)} key={`b-${listing.sourceRef}-${index}`}>
              <b>{shortCounty(listing.county)}</b>
              <span>{shortType(listing.type)}</span>
              <strong>{money(listing.price, listing.priceLabel)}</strong>
              <em>▲</em>
            </Link>
          ))}
        </div></div>
      </section>

      <div className="exchange-content">
        <section className="market-grid">
          <article className="panel">
            <div className="panel-heading">
              <div><strong>FLORIDA MARKET<br/>HEAT MAP</strong></div>
              <small>ACTIVE 4COP &amp; 3PS<br/>LISTINGS BY COUNTY</small>
            </div>
            <div className="heatmap-wrap">
              <img src="/assets/fllm-exchange-heatmap.svg" alt="Florida liquor license market heat map" />
            </div>
            <div className="panel-action">
              <Link className="gold-button" href="/?open=heat-map">Explore County Markets</Link>
            </div>
          </article>

          <article className="panel">
            <div className="board-title">
              <h1>FLLM EXCHANGE BOARD</h1>
              <p>ACTIVE FLORIDA LIQUOR LICENSE ASKING PRICES</p>
            </div>
            <div className="board-table">
              <div className="board-head">
                <span>County</span><span>License Type</span><span>Asking Price</span><span>Status</span>
              </div>
              {boardListings.map((listing) => (
                <Link className="board-row" href={listingPageHref(listing)} key={listing.sourceRef}>
                  <span>{shortCounty(listing.county)}</span>
                  <span>{shortType(listing.type)}</span>
                  <strong>{money(listing.price, listing.priceLabel)}</strong>
                  <em>AVAILABLE</em>
                </Link>
              ))}
            </div>
            <div className="panel-action" style={{textAlign:"center"}}>
              <Link className="gold-button" href="/listings">View All Listings</Link>
            </div>
          </article>

          <aside>
            <article className="panel">
              <div className="panel-heading">
                <div><strong>MARKET<br/>SNAPSHOT</strong></div>
                <small>FLORIDA LIQUOR LICENSE<br/>MARKET</small>
              </div>
              <div className="snapshot-grid">
                <div><strong>{listings.length}</strong><span>Active Listings</span></div>
                <div><strong>{countyCount}</strong><span>Counties</span></div>
                <div><strong>{money(highest,"—")}</strong><span>Highest Ask</span></div>
                <div><strong>{money(lowest,"—")}</strong><span>Lowest Ask</span></div>
              </div>
            </article>

            <article className="panel newest-box">
              <div className="panel-heading"><div><strong>NEWEST TO<br/>MARKET</strong></div></div>
              <div className="newest-list">
                {newest.map((listing) => (
                  <Link href={listingPageHref(listing)} key={listing.sourceRef}>
                    <b>NEW</b>
                    <span>{shortCounty(listing.county)} County</span>
                    <i>{shortType(listing.type)}</i>
                    <strong>{money(listing.price, listing.priceLabel)}</strong>
                  </Link>
                ))}
              </div>
              <div className="panel-action" style={{textAlign:"center"}}>
                <Link className="gold-button" href="/listings">View Newest Listings</Link>
              </div>
            </article>
          </aside>
        </section>

        <section className="news-section" aria-label="FLLM News market updates">
          <img src="/assets/market-report-studio.png" alt="FLLM Market News studio with Florida liquor license market update screens" />
          <div className="news-bar">
            <b>FLLM NEWS</b>
            <span>EXPERTS. INSIGHTS. <em>A MORE TRANSPARENT MARKET.</em></span>
            <Link className="gold-button" href="/florida-liquor-license-news">Watch Market Updates</Link>
          </div>
        </section>

        <section className="action-grid">
          <article className="action-card"><h2>FOR BUYERS</h2><p>Find available liquor licenses by county and license type.</p><Link className="gold-button" href="/listings">Browse Licenses</Link></article>
          <article className="action-card"><h2>FOR SELLERS</h2><p>List your Florida liquor license and reach qualified buyers.</p><Link className="gold-button" href="/sell-your-license">List Your License</Link></article>
          <article className="action-card"><h2>FOR BROKERS</h2><p>Market your client inventory while remaining the listing representative.</p><Link className="gold-button" href="/brokers/list-your-license">Broker Options</Link></article>
          <article className="action-card"><h2>MARKET DATA</h2><p>Explore pricing, trends and county market information.</p><Link className="gold-button" href="/#market-data">View Market Data</Link></article>
        </section>

        <section className="transparency-band">
          <h2>ADDING TRANSPARENCY TO THE FLORIDA LIQUOR LICENSE MARKET</h2>
          <div className="transparency-values">
            <div><strong>MORE INFORMATION</strong><span>Listings, asking prices and county market context.</span></div>
            <div><strong>MORE OPPORTUNITY</strong><span>A statewide view for buyers, sellers, brokers and lenders.</span></div>
            <div><strong>A MORE TRANSPARENT MARKET</strong><span>Organized public information in a fragmented private market.</span></div>
          </div>
        </section>

        <section className="disclosure">
          Market data shown reflects active asking prices and marketplace information. Asking prices are not completed sale prices, appraisals or guarantees of value.
        </section>
      </div>
    </main>
  );
}
