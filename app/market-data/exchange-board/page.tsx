import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Asking Prices",
  description: "Live Florida liquor license asking prices, county inventory and FLLM market resources.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/market-data/exchange-board" },
  robots: { index: true, follow: true },
};

function money(value: number | null, fallback = "Price Undisclosed") {
  if (value === null) return fallback;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function shortCounty(county: string) { return county.replace(/\s+County$/i, ""); }
function shortType(type: string) { return type.startsWith("4COP") ? "4COP" : "3PS"; }

const marketTools = [
  ["List Your License", "Reach qualified buyers on Florida's largest marketplace.", "/sell-your-license", "/assets/service-sell.png", "LIST YOUR LICENSE"],
  ["Seller Self-Directed Listing", "List your license directly. Full control. More exposure.", "/sell-your-license", "/assets/hero-skyline-clean.png", "GET STARTED"],
  ["Market Data", "Live market data, historical trends, and pricing insights.", "/florida-liquor-license-market-index", "/assets/hero-bar-clean.png", "VIEW MARKET DATA"],
  ["County Heat Maps", "Explore license availability and market activity by county.", "/counties", "/assets/florida-map-clean.png", "VIEW COUNTY MAPS"],
  ["Appraisals & Valuation", "Get a professional liquor-license valuation.", "/florida-liquor-license-appraisal", "/assets/fllm-formal-appraisal-preview-v1.webp", "GET A VALUATION"],
  ["License Types", "Learn about 4COP, 3PS and more.", "/resources/florida-liquor-license-types", "/assets/license-types-4cop.svg", "BROWSE LICENSE TYPES"],
  ["Financing a License", "Explore financing options and connect with lenders.", "/financing", "/assets/service-financing.png", "VIEW FINANCING"],
  ["FLLM News", "Market trends, analysis, and industry updates.", "/florida-liquor-license-news", "/assets/market-report-studio.png", "VIEW NEWS"],
  ["Featured Broker Listings", "Hand-selected broker opportunities.", "/listings", "/assets/service-browse.png", "VIEW BROKER LISTINGS"],
  ["Attorney Directory", "Find experienced Florida liquor-license attorneys.", "/resources/liquor-license-attorneys", "/assets/james-h-sutton.jpg", "FIND AN ATTORNEY"],
  ["Resources & Guides", "Regulations, transfer process, FAQs and education.", "/resources", "/assets/fllm-buyers-sellers-guide-cover.jpg", "VIEW RESOURCES"],
  ["Investment Opportunities", "Explore high-growth markets and investment insights.", "/investment-opportunities", "/assets/service-investment.png", "VIEW OPPORTUNITIES"],
] as const;

const listingArtwork = [
  "/assets/fllm-exchange-board-hero-approved.jpg",
  "/assets/hero-skyline-clean.png",
  "/assets/market-report-studio.png",
  "/assets/fllm-formal-appraisal-preview-v1.webp",
] as const;

export default async function ExchangeBoardPage() {
  const rawListings = await getMarketplaceListings();
  const listings = getVisibleAvailableMarketplaceListings(rawListings)
    .filter((listing) => listing.price !== null && (listing.type.startsWith("4COP") || listing.type.startsWith("3PS")))
    .sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

  const newest = [...listings].sort((a, b) => {
    const left = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const right = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return right - left;
  }).slice(0, 4);
  const boardListings = listings.slice(0, 10);
  const featured = newest.length >= 4 ? newest : listings.slice(0, 4);
  const tickerOne = listings.slice(0, Math.min(16, listings.length));
  const tickerTwo = listings.slice(16, 32).length ? listings.slice(16, 32) : [...tickerOne].reverse();
  const prices = listings.map((listing) => listing.price).filter((price): price is number => price !== null);
  const fourCopPrices = listings.filter((listing) => listing.type.startsWith("4COP")).map((listing) => listing.price).filter((price): price is number => price !== null);
  const average = prices.length ? prices.reduce((total, price) => total + price, 0) / prices.length : null;
  const averageFourCop = fourCopPrices.length ? fourCopPrices.reduce((total, price) => total + price, 0) / fourCopPrices.length : null;
  const lowest = prices.length ? Math.min(...prices) : null;
  const countyCount = new Set(listings.map((listing) => listing.county)).size;

  return (
    <main className="exchange-page">
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--ex-bg:#02111e;--ex-panel:#061c2f;--ex-line:#176a90;--ex-blue:#55d9ff;--ex-gold:#f6b51f;--ex-green:#42e27b}
        *{box-sizing:border-box}.exchange-page{min-height:100vh;margin:0;background:var(--ex-bg);color:#f4f8fb;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}.exchange-page a{color:inherit}.exchange-header{position:relative;z-index:20;background:#020d18;border-bottom:1px solid rgba(246,181,31,.58)}
        .approved-hero{position:relative;width:100%;aspect-ratio:1024/221;overflow:hidden;background:#020b14;border-bottom:1px solid rgba(50,190,244,.42)}.approved-hero img{position:absolute!important;left:0!important;top:-6.74vw!important;width:100%!important;height:auto!important;max-width:none!important;opacity:1!important}
        .ticker-shell{position:relative;z-index:4;background:#031421;border-bottom:1px solid #155470}.ticker-line{height:29px;overflow:hidden;white-space:nowrap;border-top:1px solid rgba(70,197,246,.25)}.ticker-track{display:flex;width:max-content;animation:exchangeTicker 58s linear infinite}.ticker-line:nth-child(2) .ticker-track{animation-duration:71s;animation-direction:reverse}.ticker-item{display:inline-flex;align-items:center;gap:8px;height:28px;padding:0 17px;border-right:1px solid rgba(255,255,255,.17);text-decoration:none}.ticker-item b{font-size:10px;color:#dbe8ef}.ticker-item span{font-size:11px;font-weight:950;color:#5cddff}.ticker-item strong{font-size:11px;color:#46e384}.ticker-item em{font-size:9px;color:#46e384;font-style:normal}
        .exchange-content{width:min(1400px,calc(100% - 26px));margin:11px auto 0}.market-grid{display:grid;grid-template-columns:.88fr 1.42fr .88fr;gap:11px}.panel{min-width:0;border:1px solid var(--ex-line);background:linear-gradient(180deg,#082238,#041421);box-shadow:inset 0 0 28px rgba(0,140,205,.05)}.panel-heading{display:flex;justify-content:space-between;gap:10px;padding:13px 13px 8px}.panel-heading strong{display:block;color:var(--ex-gold);font-size:17px;line-height:1.05;letter-spacing:.025em}.panel-heading small{color:#d2e1e9;font-size:8px;line-height:1.25;letter-spacing:.06em}.heatmap-wrap{padding:0 11px 8px}.heatmap-wrap img{display:block;width:100%;height:244px;object-fit:cover;object-position:center;background:#020f1b}.gold-button{display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 17px;border:1px solid #ffd054;border-radius:4px;background:linear-gradient(180deg,#ffd45c,#eda514);color:#07121a!important;text-decoration:none;font-size:9px;font-weight:950;text-transform:uppercase}.panel-action{padding:0 12px 12px;text-align:center}
        .board-title{text-align:center;padding:13px 12px 8px}.board-title h1{margin:0;color:#eaf8ff;font:700 29px/1.05 Georgia,serif;letter-spacing:.025em}.board-title p{margin:5px 0 0;color:var(--ex-blue);font-size:9px;font-weight:900;letter-spacing:.12em}.board-table{margin:0 10px 10px;border-top:1px solid rgba(255,255,255,.1)}.board-head,.board-row{display:grid;grid-template-columns:1.1fr .82fr 1fr .72fr;gap:8px;align-items:center;padding:6px 9px;border-bottom:1px solid rgba(255,255,255,.09)}.board-head{color:#adc2ce;font-size:7px;font-weight:900;text-transform:uppercase}.board-row{color:#fff;text-decoration:none;font-size:10px}.board-row:hover{background:rgba(67,196,247,.07)}.board-row strong{color:var(--ex-blue)}.board-row em{color:var(--ex-green);font-size:7px;font-style:normal;font-weight:950}
        .snapshot-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:0 11px 11px}.snapshot-grid div{padding:10px 5px;border:1px solid rgba(69,190,240,.39);background:#061728;text-align:center}.snapshot-grid strong{display:block;color:var(--ex-blue);font-size:20px}.snapshot-grid span{display:block;margin-top:4px;color:#e0e9ee;font-size:7px;text-transform:uppercase}.newest-box{margin-top:10px}.newest-list{padding:0 11px 8px}.newest-list a{display:grid;grid-template-columns:auto 1fr auto auto;gap:6px;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.08);text-decoration:none;font-size:8px}.newest-list b{padding:2px 4px;border-radius:2px;background:var(--ex-gold);color:#07111b}.newest-list i{color:#b9c8d0;font-style:normal}.newest-list strong{color:var(--ex-blue)}
        .service-strip{display:grid;grid-template-columns:repeat(5,1fr);margin-top:10px;border:1px solid var(--ex-line);background:#031421}.service-strip a{display:flex;align-items:center;justify-content:center;gap:10px;min-height:58px;padding:10px;border-right:1px solid rgba(255,255,255,.15);text-decoration:none}.service-strip a:last-child{border-right:0}.service-strip i{font-size:25px;font-style:normal}.service-strip span{max-width:92px;font-size:9px;font-weight:850;line-height:1.25;text-transform:uppercase}.service-strip a:hover{background:#09243a;color:var(--ex-gold)}
        .news-block{display:grid;grid-template-columns:1fr 2.1fr .95fr;margin-top:10px;border:1px solid var(--ex-line);background:#041523;overflow:hidden}.news-copy{padding:15px}.news-copy h2{margin:0;color:var(--ex-gold);font-size:19px}.news-copy p{color:#d8e4ea;font-size:10px;line-height:1.45}.news-copy a{margin-top:6px}.news-image{position:relative;min-height:230px;overflow:hidden}.news-image img{position:absolute;width:100%;height:100%;object-fit:cover}.headlines{padding:14px 12px}.headlines h3{margin:0 0 10px;color:#fff;font-size:10px}.headlines a{display:block;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1);color:#dce8ed;text-decoration:none;font-size:8px;line-height:1.35}
        .section-heading{display:flex;align-items:center;justify-content:space-between;padding:9px 2px 7px;color:var(--ex-gold)}.section-heading h2{margin:0;font-size:14px;letter-spacing:.02em}.section-heading a,.section-heading span{color:var(--ex-blue);font-size:8px;text-decoration:none}.featured-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.listing-card{overflow:hidden;border:1px solid var(--ex-line);background:#061a2c}.listing-photo{height:105px;overflow:hidden}.listing-photo img{display:block;width:100%;height:100%;object-fit:cover}.listing-info{padding:9px 10px 10px}.listing-info span{display:block;color:#e5edf1;font-size:9px}.listing-info b{display:block;margin:3px 0;color:var(--ex-blue);font-size:17px}.listing-info em{color:var(--ex-green);font-size:8px;font-style:normal}.listing-info a{display:flex;margin-top:7px;min-height:29px;border:1px solid #dba81f;align-items:center;justify-content:center;color:var(--ex-gold);font-size:8px;font-weight:900;text-decoration:none}
        .tools-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:7px}.tool-card{overflow:hidden;border:1px solid var(--ex-line);background:#061a2c}.tool-card img{display:block;width:100%;height:78px;object-fit:cover}.tool-card div{padding:7px}.tool-card b{display:block;color:#fff;font-size:9px}.tool-card p{min-height:36px;margin:4px 0;color:#cddbe2;font-size:7px;line-height:1.3}.tool-card a{display:flex;min-height:27px;align-items:center;justify-content:center;border:1px solid #dba81f;color:var(--ex-gold);font-size:7px;font-weight:900;text-decoration:none}
        .bid-grid{display:grid;grid-template-columns:1.45fr 1fr;margin-top:10px;border:1px solid #c89e24;background:#031421}.bid-form,.bid-explainer{padding:13px}.bid-form{border-right:1px solid #c89e24}.bid-title{display:flex;justify-content:space-between;gap:12px}.bid-title strong{color:var(--ex-gold);font-size:9px;text-transform:uppercase}.bid-title h2{margin:2px 0;color:#fff;font-size:13px}.bid-title p{max-width:430px;margin:0;color:#d3dee5;font-size:7px;line-height:1.4}.bid-fields{display:grid;grid-template-columns:145px 1fr 1fr;gap:8px;margin-top:10px}.ask-box{grid-row:span 2;padding:8px;background:#071b2c}.ask-box small{display:block;color:#f5f8fa;font-size:7px}.ask-box b{display:block;margin-top:5px;color:#fff;font-size:18px}.bid-fields label{display:grid;gap:3px;color:#fff;font-size:7px}.bid-fields input{height:25px;padding:0 7px;border:1px solid #9cacb7;background:#f7f8fa;color:#111;font-size:8px}.bid-submit{grid-column:2/4;height:31px;border:0;border-radius:3px;background:linear-gradient(#159be0,#0770ae);color:#fff;font-size:9px;font-weight:900}.bid-explainer h3{margin:0 0 8px;color:var(--ex-gold);font-size:11px}.bid-explainer p,.bid-explainer li{color:#d7e2e8;font-size:8px;line-height:1.4}.bid-explainer ul{margin:8px 0;padding-left:18px}.confidential{padding-top:7px;border-top:1px solid #b28d24;color:var(--ex-gold);text-align:center;font-size:8px;font-weight:900}
        .exchange-footer{display:grid;grid-template-columns:1.25fr .9fr 1.1fr;gap:20px;align-items:center;min-height:72px;margin-top:0;padding:9px 16px;background:linear-gradient(90deg,#01101f,#02192d 58%,#01101f)}.footer-brand{display:flex;align-items:center;gap:16px}.footer-brand img{width:128px;height:auto}.footer-brand span{color:#dce5ea;font-size:8px;line-height:1.4}.footer-links{display:flex;justify-content:center;gap:12px}.footer-links a{color:#e9eef1;font-size:8px;text-decoration:none}.footer-right{text-align:right}.socials{display:flex;justify-content:flex-end;gap:8px}.socials span{display:grid;width:24px;height:24px;place-items:center;border-radius:4px;background:#087bc3;font-size:12px;font-weight:900}.socials span:nth-child(2){background:#020307}.socials span:nth-child(3){background:#e90017}.footer-right small{display:block;margin-top:8px;color:#d2dce1;font-size:7px}
        @keyframes exchangeTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(prefers-reduced-motion:reduce){.ticker-track{animation-play-state:paused}}
        @media(max-width:1000px){.market-grid{grid-template-columns:1fr 1.3fr}.market-grid>aside{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:10px}.tools-grid{grid-template-columns:repeat(4,1fr)}.news-block{grid-template-columns:1fr 1.6fr}.headlines{display:none}.featured-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:700px){.ticker-line{height:27px}.ticker-item{height:26px}.exchange-content{width:calc(100% - 12px)}.market-grid{grid-template-columns:1fr}.market-grid>aside{grid-column:auto;display:block}.board-head,.board-row{grid-template-columns:1fr .65fr 1fr}.board-head span:last-child,.board-row em{display:none}.service-strip{grid-template-columns:1fr 1fr}.service-strip a:last-child{grid-column:1/-1}.news-block{grid-template-columns:1fr}.news-image{min-height:210px}.featured-grid{grid-template-columns:1fr 1fr}.tools-grid{grid-template-columns:1fr 1fr}.bid-grid{grid-template-columns:1fr}.bid-form{border-right:0;border-bottom:1px solid #c89e24}.bid-fields{grid-template-columns:1fr 1fr}.ask-box{grid-column:1/-1;grid-row:auto}.bid-submit{grid-column:1/-1}.exchange-footer{grid-template-columns:1fr;text-align:center}.footer-brand{justify-content:center}.footer-links{flex-wrap:wrap}.socials{justify-content:center}.footer-right{text-align:center}}
      ` }} />

      <div className="exchange-header"><FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" /></div>
      <section className="approved-hero" aria-label="FLLM Exchange trading floor"><img src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1" alt="FLLM Exchange trading floor" /></section>
      <section className="ticker-shell" aria-label="Live Florida liquor license asking prices">
        {[tickerOne, tickerTwo].map((ticker, row) => <div className="ticker-line" key={`ticker-${row}`}><div className="ticker-track">{[...ticker, ...ticker].map((listing, index) => <Link className="ticker-item" href={listingPageHref(listing)} key={`${row}-${listing.sourceRef}-${index}`}><b>{shortCounty(listing.county)}</b><span>{shortType(listing.type)}</span><strong>{money(listing.price, listing.priceLabel)}</strong><em>▲</em></Link>)}</div></div>)}
      </section>

      <div className="exchange-content">
        <section className="market-grid">
          <article className="panel"><div className="panel-heading"><strong>FLORIDA MARKET<br />HEAT MAP</strong><small>ACTIVE 4COP &amp; 3PS<br />LISTINGS BY COUNTY</small></div><div className="heatmap-wrap"><img src="/assets/fllm-exchange-heatmap.svg" alt="Florida liquor license market heat map" /></div><div className="panel-action"><Link className="gold-button" href="/counties">View Full Market Data</Link></div></article>
          <article className="panel"><div className="board-title"><h1>FLLM EXCHANGE BOARD</h1><p>ACTIVE FLORIDA LIQUOR LICENSE ASKING PRICES</p></div><div className="board-table"><div className="board-head"><span>County</span><span>License Type</span><span>Asking Price</span><span>Status</span></div>{boardListings.map((listing) => <Link className="board-row" href={listingPageHref(listing)} key={listing.sourceRef}><span>{shortCounty(listing.county)}</span><span>{shortType(listing.type)}</span><strong>{money(listing.price, listing.priceLabel)}</strong><em>AVAILABLE</em></Link>)}</div><div className="panel-action"><Link className="gold-button" href="/listings">View All Listings →</Link></div></article>
          <aside><article className="panel"><div className="panel-heading"><strong>MARKET<br />SNAPSHOT</strong><small>FLORIDA LIQUOR LICENSE<br />MARKET</small></div><div className="snapshot-grid"><div><strong>{listings.length}</strong><span>Active Listings</span></div><div><strong>{countyCount}</strong><span>Counties</span></div><div><strong>{money(average, "—")}</strong><span>Average Asking Price</span></div><div><strong>{money(averageFourCop, "—")}</strong><span>Average 4COP Ask</span></div></div><div className="panel-action"><Link className="gold-button" href="/florida-liquor-license-market-index">View Market Analysis</Link></div></article><article className="panel newest-box"><div className="panel-heading"><strong>NEWEST TO<br />MARKET</strong></div><div className="newest-list">{newest.map((listing) => <Link href={listingPageHref(listing)} key={listing.sourceRef}><b>NEW</b><span>{shortCounty(listing.county)}</span><i>{shortType(listing.type)}</i><strong>{money(listing.price, listing.priceLabel)}</strong></Link>)}</div><div className="panel-action"><Link className="gold-button" href="/listings">View Newest Listings</Link></div></article></aside>
        </section>

        <nav className="service-strip" aria-label="Exchange services"><Link href="/listings"><i>⌕</i><span>Browse Active Listings</span></Link><Link href="/sell-your-license"><i>▤</i><span>List Your License</span></Link><Link href="/florida-liquor-license-appraisal"><i>▥</i><span>Get a Valuation</span></Link><Link href="/financing"><i>▰</i><span>Explore Financing</span></Link><Link href="/resources/liquor-license-attorneys"><i>⚖</i><span>Find a License Attorney</span></Link></nav>
        <section className="news-block"><div className="news-copy"><h2>FLLM NEWS BROADCAST</h2><p>Expert analysis. Market trends. Legislative updates. Insights that drive the Florida liquor license market.</p><Link className="gold-button" href="/florida-liquor-license-news">Watch All Episodes →</Link></div><div className="news-image"><img src="/assets/market-report-studio.png" alt="FLLM News broadcast studio" /></div><aside className="headlines"><h3>LATEST HEADLINES</h3><Link href="/florida-liquor-license-news">Florida Liquor License Prices Show Strong Market Activity</Link><Link href="/florida-liquor-license-news">New Legislation Could Impact License Transfers</Link><Link href="/florida-liquor-license-news">South Florida Leads New Listings</Link></aside></section>

        <div className="section-heading"><h2>FEATURED LICENSE LISTINGS</h2><Link href="/listings">VIEW ALL LISTINGS →</Link></div>
        <section className="featured-grid">{featured.map((listing, index) => <article className="listing-card" key={`featured-${listing.sourceRef}`}><div className="listing-photo"><img src={listingArtwork[index % listingArtwork.length]} alt="" /></div><div className="listing-info"><span>{shortType(listing.type)} {listing.type.startsWith("4COP") ? "Quota" : "Liquor Store"}</span><span>{listing.county}</span><b>{money(listing.price, listing.priceLabel)}</b><em>● Available &nbsp; # {listing.sourceRef}</em><Link href={listingPageHref(listing)}>VIEW LISTING →</Link></div></article>)}</section>

        <div className="section-heading"><h2>MARKET TOOLS &amp; RESOURCES</h2><span>EVERYTHING YOU NEED TO BUY, SELL AND INVEST IN FLORIDA LIQUOR LICENSES.</span></div>
        <section className="tools-grid">{marketTools.map(([title, description, href, image, action]) => <article className="tool-card" key={title}><img src={image} alt="" /><div><b>{title}</b><p>{description}</p><Link href={href}>{action} →</Link></div></article>)}</section>

        <section className="bid-grid"><div className="bid-form"><div className="bid-title"><div><strong>FLLM EXCHANGE</strong><h2>Confidential Bid / Ask Exchange</h2></div><p>Submit a confidential buyer bid. Buyer bids, bid counts, and bid/ask spreads are not displayed publicly. The seller can accept or counter through a secure FLLM link.</p></div><div className="bid-fields"><div className="ask-box"><small>SELLER ASK</small><b>{money(lowest, "—")}</b></div><label>Buyer Name<input type="text" aria-label="Buyer name" /></label><label>Email<input type="email" aria-label="Email" /></label><label>Phone<input type="tel" aria-label="Phone" /></label><label>Bid Price<input type="text" aria-label="Bid price" /></label><button className="bid-submit" type="button">Submit Buyer Bid</button></div></div><aside className="bid-explainer"><h3>🤝 &nbsp; What is the FLLM Private Bid / Ask Exchange?</h3><p>The FLLM Private Bid / Ask Exchange is a confidential, direct discovery and negotiation tool for Florida liquor license opportunities.</p><ul><li>Buyers can submit confidential bids on available licenses.</li><li>Bids and bid/ask spreads are not displayed publicly.</li><li>Sellers can review, accept, reject, or counter offers through secure FLLM links.</li><li>Price matches are not binding and final terms are separately accepted.</li></ul><div className="confidential">CONFIDENTIAL. SECURE. SERIOUS OPPORTUNITIES.</div></aside></section>
      </div>

      <footer className="exchange-footer"><div className="footer-brand"><img src="/assets/brand-footer-transparent.png" alt="Florida Liquor License Market" /><span>A MORE TRANSPARENT MARKET.<br />A STRONGER FLORIDA.</span></div><nav className="footer-links"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/faq">FAQ</Link></nav><div className="footer-right"><div className="socials"><span>in</span><span>𝕏</span><span>▶</span></div><small>© 2026 Florida Liquor License Market. All rights reserved.</small></div></footer>
    </main>
  );
}
