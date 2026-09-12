"use client";

import { useEffect, useState } from "react";
import HeaderNavMenus from "@/components/HeaderNavMenus";

export type ExchangeTickerListing = {
  county: string;
  href: string;
  price: string;
  type: string;
};

type ExchangeStaticClientProps = {
  tickerListings: ExchangeTickerListing[];
};

export default function ExchangeStaticClient({ tickerListings }: ExchangeStaticClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const firstRow = tickerListings.slice(0, Math.min(16, tickerListings.length));
  const secondRow = tickerListings.slice(16, 32).length
    ? tickerListings.slice(16, 32)
    : [...firstRow].reverse();
  const approvedFeaturedCards = [
    { type: "4COP Quota", county: "Monroe County", price: "$1,300,000", reference: "FL-3021", href: "/listings/fllm-098", artLeft: "-2.15vw" },
    { type: "3PS Liquor Store", county: "Miami-Dade County", price: "$950,000", reference: "FL-1024", href: "/listings?county=Miami-Dade%20County", artLeft: "-26.37vw" },
    { type: "4COP Quota", county: "Broward County", price: "$1,150,000", reference: "FL-2876", href: "/listings?county=Broward%20County", artLeft: "-50.78vw" },
    { type: "3PS Liquor Store", county: "Palm Beach County", price: "$875,000", reference: "FL-119B", href: "/listings?county=Palm%20Beach%20County", artLeft: "-74.7vw" },
  ];
  const liveFeaturedCards = tickerListings.map((listing, index) => {
    const slug = listing.href.match(/\/listings\/([^/?#]+)/)?.[1];
    const publicReference = slug?.toUpperCase().match(/FLLM-\d{3,}/)?.[0];
    return {
      type: listing.type === "3PS" ? "3PS Liquor Store" : listing.type === "4COP" ? "4COP Quota" : listing.type,
      county: / County$/i.test(listing.county) ? listing.county : `${listing.county} County`,
      price: listing.price,
      reference: publicReference ?? `LIVE-${String(index + 1).padStart(3, "0")}`,
      href: listing.href,
      artLeft: "",
    };
  });
  const carouselPool = [
    ...approvedFeaturedCards,
    ...liveFeaturedCards.filter((listing) => !approvedFeaturedCards.some((approved) => approved.county === listing.county && approved.price === listing.price)),
  ];
  const artOffsets = ["-2.15vw", "-26.37vw", "-50.78vw", "-74.7vw"];
  const visibleFeaturedCards = Array.from({ length: Math.min(4, carouselPool.length) }, (_, offset) => ({
    ...carouselPool[(carouselIndex + offset) % carouselPool.length],
    artLeft: artOffsets[offset],
  }));
  const toolCards = [
    { title: "List Your License", description: "Reach qualified buyers on Florida's largest marketplace.", action: "LIST YOUR LICENSE →", href: "/sell-your-license", artLeft: "-2.15vw", artTop: "-99.12vw" },
    { title: "Seller Self-Directed Listing", description: "List your license directly. Full control. More exposure.", action: "GET STARTED →", href: "/sell-your-license", artLeft: "-17.68vw", artTop: "-99.12vw" },
    { title: "Market Data", description: "Live market data, historical trends, and pricing insights.", action: "VIEW MARKET DATA →", href: "/market-data", artLeft: "-33.2vw", artTop: "-99.12vw" },
    { title: "County Heat Maps", description: "Explore license availability and market activity by county.", action: "VIEW COUNTY MAPS →", href: "/counties", artLeft: "-48.83vw", artTop: "-99.12vw" },
    { title: "Appraisals & Valuation", description: "Get a professional liquor license valuation.", action: "GET A VALUATION →", href: "/florida-liquor-license-appraisal", artLeft: "-64.55vw", artTop: "-99.12vw" },
    { title: "License Types", description: "Learn about 4COP, 3PS and more.", action: "BROWSE LICENSE TYPES →", href: "/resources/florida-liquor-license-types", artLeft: "-80.18vw", artTop: "-99.12vw" },
    { title: "Financing a License", description: "Explore financing options and connect with lenders.", action: "VIEW FINANCING →", href: "/financing", artLeft: "-2.15vw", artTop: "-112.7vw" },
    { title: "FLLM News", description: "Market trends, analysis, and industry updates.", action: "VIEW NEWS →", href: "/florida-liquor-license-news", artLeft: "-17.68vw", artTop: "-112.7vw" },
    { title: "Featured Broker Listings", description: "Hand-selected broker opportunities.", action: "VIEW BROKER LISTINGS →", href: "/listings", artLeft: "-33.2vw", artTop: "-112.7vw" },
    { title: "Attorney Directory", description: "Find experienced Florida liquor license attorneys.", action: "FIND AN ATTORNEY →", href: "/resources/liquor-license-attorneys", artLeft: "-48.83vw", artTop: "-112.7vw" },
    { title: "Resources & Guides", description: "Regulations, transfer process, FAQs and educational content.", action: "VIEW RESOURCES →", href: "/resources", artLeft: "-64.55vw", artTop: "-112.7vw" },
    { title: "Investment Opportunities", description: "Explore high-growth markets and investment insights.", action: "VIEW OPPORTUNITIES →", href: "/invest", artLeft: "-80.18vw", artTop: "-112.7vw" },
  ];

  useEffect(() => {
    if (carouselPaused || carouselPool.length <= 4 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rotation = window.setInterval(() => setCarouselIndex((current) => (current + 1) % carouselPool.length), 10000);
    return () => window.clearInterval(rotation);
  }, [carouselPaused, carouselPool.length]);

  return (
    <main className="exchange-static-page">
      <style>{`
        .exchange-static-page{min-height:100vh;margin:0;padding:0;background:#020d18;color:#fff;overflow-x:hidden;font-family:Arial,Helvetica,sans-serif}
        .exchange-live-menu{position:relative;z-index:20;display:flex;align-items:center;width:100%;height:clamp(62px,4.49vw,86px);padding:0 clamp(16px,1.25vw,24px);gap:clamp(12px,1.45vw,28px);background:#020d18;border-bottom:1px solid rgba(246,167,0,.35)}
        .exchange-live-menu .exchange-logo{display:flex;align-items:center;align-self:stretch;flex:0 0 clamp(158px,11.25vw,214px)}
        .exchange-live-menu .exchange-logo img{display:block;width:100%;height:100%;object-fit:contain;object-position:left center}
        .exchange-live-menu .primary-nav{display:flex;flex:1;align-items:center;justify-content:center;gap:clamp(11px,1.18vw,22px);min-width:0}
        .exchange-live-menu .primary-nav .native-nav-trigger,.exchange-live-menu .primary-nav .native-nav-direct-link{font-size:clamp(9px,.58vw,11px)}
        .exchange-live-menu .exchange-actions{display:flex;align-items:center;gap:10px;flex:0 0 auto}
        .exchange-live-menu .exchange-actions a{display:inline-flex;align-items:center;justify-content:center;height:clamp(32px,2.55vw,48px);padding:0 clamp(11px,.85vw,16px);border-radius:5px;text-transform:uppercase;font-size:clamp(9px,.58vw,11px);font-weight:900;white-space:nowrap}
        .exchange-live-menu .list-action{color:#07111b;background:linear-gradient(145deg,#ffd15b,#f0a20b);border:1px solid #ffd464}
        .exchange-live-menu .contact-action{color:#f6b51f;background:#020d18;border:1px solid #f6b51f}
        .exchange-search{display:grid;place-items:center;width:32px;height:42px;color:#fff;font-size:29px;line-height:1;transform:rotate(-18deg)}
        .exchange-menu-toggle{display:none;margin-left:auto;width:44px;height:40px;border:1px solid #f6b51f;border-radius:5px;color:#f6b51f;background:#020d18;font-size:22px}
        .exchange-live-hero{position:relative;width:100%;aspect-ratio:1024/244;overflow:hidden;background-color:#020d18;background-image:url('/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1');background-repeat:no-repeat;background-size:100% auto;background-position:center -4.4921875vw}
        .exchange-tickers{position:relative;z-index:5;width:100%;background:#031421;border-top:1px solid #176387;border-bottom:1px solid #176387}
        .exchange-ticker-row{height:clamp(28px,2.15vw,41px);overflow:hidden;white-space:nowrap;border-bottom:1px solid rgba(52,184,232,.38)}.exchange-ticker-row:last-child{border-bottom:0}
        .exchange-ticker-track{display:flex;width:max-content;min-width:200%;height:100%;animation:exchangeTickerScroll 58s linear infinite}.exchange-ticker-row:nth-child(2) .exchange-ticker-track{animation-duration:71s;animation-direction:reverse}
        .exchange-ticker-item{display:inline-flex;align-items:center;gap:clamp(7px,.64vw,12px);height:100%;padding:0 clamp(13px,1.15vw,22px);border-right:1px solid rgba(255,255,255,.25);color:#fff;text-decoration:none}
        .exchange-ticker-item b{font-size:clamp(10px,.72vw,14px);color:#dce8ef}.exchange-ticker-item span{font-size:clamp(11px,.78vw,15px);font-weight:950;color:#50ddff}.exchange-ticker-item strong{font-size:clamp(11px,.82vw,16px);color:#36e88a}.exchange-ticker-item em{font-size:clamp(9px,.64vw,12px);font-style:normal;color:#36e88a}
        .exchange-ticker-label{font-size:clamp(10px,.72vw,14px)!important;font-weight:950!important;letter-spacing:.01em;color:#16d4ef!important}.exchange-ticker-row:nth-child(2) .exchange-ticker-label{color:#f6b51f!important}
        .exchange-market-html{width:100%;background:#031421;color:#fff}
        .market-panels{display:grid;grid-template-columns:30.5% 44.5% 24%;gap:.75%;min-height:22.95vw;padding:.4vw .7vw;background:#031421}
        .market-panel{min-width:0;overflow:hidden;border:1px solid #17678d;background:linear-gradient(180deg,#082039,#031422)}
        .heat-panel{position:relative;padding:1vw;background:#031422}.heat-panel h2,.snapshot-panel h2{position:relative;z-index:3;margin:0;color:#ffbd22;font-size:clamp(15px,1.55vw,29px);line-height:1.05}.heat-map-art{position:absolute;z-index:1;right:1%;top:7%;width:69%;height:76%;overflow:hidden;background:#031422}.heat-map-art img{display:block;width:100%;height:100%;object-fit:fill;mix-blend-mode:lighten}.heat-map-art::before,.heat-map-art::after{content:'';position:absolute;z-index:2;left:0;background:#031422}.heat-map-art::before{top:0;width:100%;height:16.5%}.heat-map-art::after{top:38%;width:55%;height:62%}.heat-filters{position:relative;z-index:2;display:grid;gap:.32vw;width:31%;margin-top:2.1vw}.heat-filters a{display:flex;align-items:center;min-height:clamp(24px,2.05vw,39px);padding:0 .7vw;border:1px solid #1687be;border-radius:2px;background:#071b2d;color:#e8f2f7;text-decoration:none;font-size:clamp(9px,.75vw,14px);font-weight:700}.heat-filters a:first-child{background:#117db7}.heat-legend{position:absolute;z-index:3;left:1vw;bottom:1vw;width:42%}.heat-legend b{display:block;margin-bottom:.45vw;color:#d7e2e8;font-size:clamp(9px,.75vw,14px)}.heat-scale{display:flex;align-items:center;gap:.4vw;font-size:clamp(8px,.65vw,12px);font-weight:800}.heat-gradient{height:clamp(10px,1.05vw,20px);flex:1;background:linear-gradient(90deg,#0a7dc4,#f7b41d)}
        .board-panel{padding:.55vw 1vw}.board-panel h1{margin:0 0 .5vw;text-align:center;color:#f1f6f8;font:700 clamp(20px,2vw,38px)/1.1 Georgia,'Times New Roman',serif;letter-spacing:.03em}.board-table{border-top:1px solid rgba(255,255,255,.08)}.board-head,.board-row{display:grid;grid-template-columns:1.05fr 1.1fr 1fr .65fr;align-items:center;gap:.5vw;min-height:clamp(20px,1.55vw,30px);padding:0 .45vw;border-bottom:1px solid rgba(255,255,255,.06)}.board-head{background:#0a3454;color:#d3e1e8;font-size:clamp(7px,.64vw,12px);text-transform:uppercase}.board-row{color:#eef5f7;text-decoration:none;font-size:clamp(8px,.72vw,14px)}.board-row strong{color:#f4f4f4}.board-row em{color:#25e884;font-size:.9em;font-style:normal;font-weight:950}.board-action{display:flex;justify-content:center;margin-top:.55vw}.outline-button{display:inline-flex;align-items:center;justify-content:center;min-height:clamp(28px,2.3vw,44px);padding:0 1.7vw;border:2px solid #e4ad1b;border-radius:4px;color:#f6b51f;text-decoration:none;font-size:clamp(9px,.78vw,15px);font-weight:950;text-transform:uppercase}
        .snapshot-panel{padding:1vw}.snapshot-heading{display:flex;justify-content:space-between;gap:1vw}.snapshot-heading small{color:#e2ebef;font-size:clamp(7px,.62vw,12px);font-weight:800;line-height:1.25}.snapshot-stats{display:grid;grid-template-columns:1fr 1fr;gap:.55vw;margin-top:.8vw}.snapshot-stats div{display:grid;place-content:center;min-height:clamp(60px,6.15vw,117px);border:1px solid #17678d;background:#04182a;text-align:center}.snapshot-stats strong{color:#2cc6ff;font-size:clamp(19px,2vw,38px)}.snapshot-stats span{margin-top:.35vw;color:#e5edf1;font-size:clamp(8px,.72vw,14px);font-weight:800;line-height:1.25}.snapshot-panel .board-action{margin-top:1.3vw}
        .exchange-service-strip{display:grid;grid-template-columns:repeat(5,1fr);min-height:4.4vw;border-top:1px solid #17678d;border-bottom:2px solid #b88612;background:#041729}.exchange-service-strip a{display:flex;align-items:center;justify-content:center;gap:1vw;border-right:1px solid #17678d;color:#eef5f8;text-decoration:none}.exchange-service-strip a:last-child{border-right:0}.exchange-service-strip i{font-size:clamp(23px,2.4vw,46px);font-style:normal;line-height:1}.exchange-service-strip span{font-size:clamp(9px,.86vw,16px);font-weight:900;line-height:1.35;text-transform:uppercase}
        .exchange-news-row{display:grid;grid-template-columns:23.5% 53% 23.5%;height:18.7vw;min-height:200px;padding:.45vw .75vw;background:#031421;border-bottom:2px solid #b88612}.news-copy-panel,.news-headlines{border:1px solid #17678d;background:#04182a}.news-copy-panel{padding:1vw}.news-copy-panel h2{margin:0;color:#ffbd22;font-size:clamp(15px,1.55vw,29px)}.news-copy-panel p{margin:1.5vw 0;color:#e5edf1;font-size:clamp(9px,.82vw,16px);line-height:1.45}.news-art-crop{position:relative;overflow:hidden;border-block:1px solid #17678d}.news-art-crop img{position:absolute;left:-44.86%;top:-344%;width:191.4%;max-width:none;height:auto}.news-headlines{padding:.7vw}.news-headlines header{display:flex;justify-content:space-between;gap:.5vw;margin-bottom:.55vw}.news-headlines b{font-size:clamp(9px,.75vw,14px)}.news-headlines header a{color:#28d7ff;font-size:clamp(8px,.65vw,12px);font-weight:900;text-decoration:none}.news-headlines>a{display:grid;grid-template-columns:auto 1fr;gap:.65vw;padding:.42vw 0;border-bottom:1px solid rgba(255,255,255,.08);color:#e8f0f4;text-decoration:none;font-size:clamp(8px,.69vw,13px);line-height:1.25}.news-headlines>a::before{content:'▤';color:#fff;font-size:clamp(15px,1.45vw,28px)}
        .featured-html{position:relative;height:16.9vw;padding:.25vw .75vw .65vw;border-bottom:2px solid #b88612;background:#031421}.featured-heading{display:flex;align-items:center;justify-content:space-between;height:1.65vw;padding:0 .35vw}.featured-heading h2{margin:0;color:#ffbd22;font-size:clamp(14px,1.35vw,26px);line-height:1}.featured-heading a{color:#29d8ff;text-decoration:none;font-size:clamp(8px,.72vw,14px);font-weight:900}.featured-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:.65vw;height:14.1vw}.featured-card{position:relative;overflow:hidden;border:2px solid #17678d;border-radius:5px;background:#031422;color:#fff;animation:featuredCardTurn .8s ease both}.featured-card-art{position:absolute;left:0;top:0;width:100%;bottom:2.75vw;overflow:hidden}.featured-card-art img{position:absolute;top:-81.84vw;width:100vw;max-width:none;height:auto}.featured-card-details{position:absolute;z-index:2;left:44%;right:0;top:3.55vw;bottom:2.65vw;padding:.35vw .65vw .4vw 1.6vw;background:#031422}.featured-card-details b,.featured-card-details span{display:block;font-size:clamp(9px,.86vw,16px);line-height:1.25}.featured-card-details strong{display:block;margin:.25vw 0;color:#20c8ff;font-size:clamp(17px,1.55vw,30px);line-height:1.05}.featured-card-meta{display:flex;align-items:center;gap:.45vw;color:#e5edf1;font-size:clamp(8px,.68vw,13px)}.featured-card-meta em{color:#26e78a;font-style:normal;font-weight:800}.featured-card-meta em::before{content:'●';margin-right:.28vw}.featured-card-meta small{margin-left:auto}.featured-card-button{position:absolute;z-index:3;left:.45vw;right:.45vw;bottom:.4vw;display:flex;align-items:center;justify-content:center;height:2.05vw;min-height:28px;border:2px solid #e4ad1b;border-radius:3px;color:#ffbd22;text-decoration:none;font-size:clamp(10px,.92vw,18px);font-weight:950}.featured-arrow{position:absolute;z-index:4;top:50%;display:grid;place-items:center;width:2.7vw;height:2.7vw;padding:0;border:2px solid #b88612;border-radius:50%;background:#031422;color:#ffbd22;font:inherit;font-size:clamp(20px,2vw,38px);line-height:1;cursor:pointer;transform:translateY(-28%)}.featured-arrow-left{left:.15vw}.featured-arrow-right{right:.15vw}
        .tools-html{height:29.5vw;padding:0 1.25vw .7vw;border-bottom:2px solid #b88612;background:#031421}.tools-heading{display:flex;align-items:center;gap:1.6vw;height:2.2vw;padding:0 .55vw}.tools-heading h2{margin:0;color:#ffbd22;font-size:clamp(15px,1.42vw,27px);line-height:1}.tools-heading p{margin:0;color:#e7edf1;font-size:clamp(8px,.72vw,14px)}.tools-grid{display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(2,12.95vw);gap:.6vw}.tool-card{position:relative;overflow:hidden;border:2px solid #17678d;border-radius:4px;background:#031422;color:#fff}.tool-card-art{position:relative;height:6.65vw;overflow:hidden}.tool-card-art img{position:absolute;width:100vw;max-width:none;height:auto}.tool-card-copy{padding:.35vw .7vw}.tool-card-copy h3{margin:0;color:#f2f5f7;font-size:clamp(10px,.92vw,18px);line-height:1.15}.tool-card-copy p{margin:.18vw 0 0;color:#d7e1e7;font-size:clamp(8px,.72vw,14px);line-height:1.25}.tool-card-link{position:absolute;left:.55vw;right:.55vw;bottom:.35vw;display:flex;align-items:center;justify-content:center;height:2.05vw;min-height:27px;border:2px solid #dca816;border-radius:3px;color:#ffbd22;text-decoration:none;font-size:clamp(8px,.75vw,14px);font-weight:950}
        .exchange-html{display:grid;grid-template-columns:58.5% 41.5%;height:18.2vw;margin:.25vw 1.25vw .55vw;border:2px solid #a98212;border-radius:6px;background:#031421;overflow:hidden}.exchange-bid-side{display:grid;grid-template-columns:17% 1fr;grid-template-rows:auto 1fr;padding:.7vw;border-right:1px solid #a98212}.exchange-bid-heading{grid-column:1/-1;display:grid;grid-template-columns:34% 1fr;gap:1vw;align-items:end;padding:0 .25vw .55vw;border-bottom:1px solid #17678d}.exchange-bid-heading span{display:block;color:#ffbd22;font-size:clamp(8px,.7vw,13px);font-weight:950}.exchange-bid-heading h2{margin:.15vw 0 0;color:#eef4f7;font-size:clamp(14px,1.28vw,24px)}.exchange-bid-heading p{margin:0;color:#d5e0e6;font-size:clamp(7px,.62vw,12px);line-height:1.35}.seller-ask{align-self:start;margin:.9vw .4vw 0;padding:.75vw;border:1px solid #17678d;background:#06182a}.seller-ask span{display:block;color:#ffbd22;font-size:clamp(8px,.66vw,12px);font-weight:900}.seller-ask strong{display:block;margin-top:.35vw;color:#fff;font-size:clamp(17px,1.55vw,30px)}.exchange-bid-form{display:grid;grid-template-columns:1fr 1fr;gap:.35vw 1.2vw;padding:.55vw .7vw 0}.exchange-bid-form h3{grid-column:1/-1;margin:0;color:#edf4f8;font-size:clamp(9px,.78vw,15px)}.exchange-bid-form label{display:grid;gap:.15vw;color:#eef4f7;font-size:clamp(7px,.58vw,11px);font-weight:800}.exchange-bid-form input[type=text],.exchange-bid-form input[type=email],.exchange-bid-form input[type=tel]{width:100%;height:1.6vw;min-height:23px;padding:0 .5vw;border:1px solid #b9c9d2;border-radius:2px;background:#f6f8fa;color:#071421;font:inherit}.exchange-bid-check{grid-column:1/-1!important;display:flex!important;grid-template-columns:none!important;align-items:center;gap:.4vw!important;font-size:clamp(6px,.5vw,10px)!important;font-weight:500!important}.exchange-bid-check input{width:1vw;height:1vw;min-width:12px;min-height:12px}.exchange-bid-form button{grid-column:1/-1;justify-self:center;width:58%;height:2.95vw;min-height:36px;border:1px solid #14a7e8;border-radius:4px;background:linear-gradient(180deg,#159cdd,#0477bf);color:#fff;font-size:clamp(11px,1.05vw,20px);font-weight:800;cursor:pointer}.exchange-bid-status{grid-column:1/-1;margin:0;color:#35e88d;text-align:center;font-size:clamp(7px,.58vw,11px)}.exchange-explainer{position:relative;padding:1.15vw 1.2vw 1vw 9vw}.exchange-handshake-art{position:absolute;left:1.5vw;top:1vw;width:6.2vw;height:5vw;overflow:hidden}.exchange-handshake-art img{position:absolute;left:-60.25vw;top:-126.45vw;width:100vw;max-width:none;height:auto}.exchange-explainer h2{margin:0;color:#ffbd22;font-size:clamp(13px,1.18vw,23px)}.exchange-explainer p{margin:.6vw 0;color:#d9e3e8;font-size:clamp(8px,.72vw,14px);line-height:1.35}.exchange-explainer ul{display:grid;gap:.45vw;margin:.8vw 0 0;padding:0;list-style:none}.exchange-explainer li{position:relative;color:#d9e3e8;font-size:clamp(8px,.7vw,13px);line-height:1.3}.exchange-explainer li::before{content:'✓';position:absolute;left:-2.7vw;top:-.1vw;display:grid;place-items:center;width:1.25vw;height:1.25vw;border-radius:50%;background:#ffbd22;color:#fff;font-weight:950}.exchange-confidence{position:absolute;left:1.2vw;right:1.2vw;bottom:.65vw;margin:0!important;padding-top:.55vw;border-top:1px solid #a98212;color:#ffbd22!important;text-align:center;font-weight:950}
        .approved-page-rest{position:relative;width:100%;aspect-ratio:1024/68;overflow:hidden;line-height:0;background:#020d18}
        .approved-page-rest>.approved-full-image{position:absolute;top:-143.359375vw;left:0;display:block;width:100%;max-width:none;height:auto;margin:0;padding:0}
        .approved-footer-cover{position:absolute;z-index:1;bottom:0;left:0;width:15.2%;height:98.2%;background:linear-gradient(90deg,rgb(1 15 32) 0%,rgb(1 20 35) 100%)}
        .approved-footer-logo{position:absolute;z-index:2;bottom:12.5%;left:1.75%;width:auto;height:68.9%}
        @keyframes exchangeTickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes featuredCardTurn{from{opacity:.55;transform:translateX(1.2%)}to{opacity:1;transform:translateX(0)}}
        @media(prefers-reduced-motion:reduce){.exchange-ticker-track{animation-play-state:paused}.featured-card{animation:none}}
        @media(max-width:1150px){.exchange-search{display:none}.exchange-live-menu .exchange-logo{flex-basis:185px}.exchange-live-menu .primary-nav{gap:12px}}
        @media(max-width:820px){.exchange-live-menu{height:72px}.exchange-live-menu .exchange-logo{flex-basis:190px}.exchange-menu-toggle{display:block}.exchange-live-menu .primary-nav{display:none;position:absolute;top:72px;left:0;right:0;flex-direction:column;align-items:stretch;padding:10px;background:#06131f;border:1px solid #34495b}.exchange-live-menu .primary-nav.is-open{display:flex}.exchange-live-menu .primary-nav a,.exchange-live-menu .primary-nav button{width:100%;padding:12px;text-align:center}.exchange-live-menu .exchange-actions{display:none}.exchange-live-hero{background-position:center -72px;min-height:172px;aspect-ratio:auto;background-size:auto 244px}.market-panels{grid-template-columns:1fr;min-height:0;padding:6px}.market-panel{min-height:320px}.exchange-service-strip{grid-template-columns:1fr 1fr;min-height:0}.exchange-service-strip a{min-height:62px}.exchange-service-strip a:last-child{grid-column:1/-1}.exchange-news-row{grid-template-columns:1fr;height:auto;min-height:0}.news-copy-panel,.news-art-crop,.news-headlines{min-height:220px}.news-art-crop img{left:-44.86%;top:-344%;width:191.4%}.featured-html{height:auto;padding:8px}.featured-heading{height:34px}.featured-cards{display:flex;height:230px;overflow-x:auto;scroll-snap-type:x mandatory}.featured-card{min-width:78vw;scroll-snap-align:start}.featured-card-art{bottom:44px}.featured-card-art img{top:-81.84vw}.featured-card-details{top:62px}.featured-card-button{height:34px}.featured-arrow{display:none}.tools-html{height:auto;padding:8px}.tools-heading{height:auto;align-items:flex-start;flex-direction:column;padding:8px}.tools-grid{grid-template-columns:1fr 1fr;grid-template-rows:repeat(6,210px)}.tool-card-art{height:105px}.exchange-html{grid-template-columns:1fr;height:auto;margin:8px}.exchange-bid-side{grid-template-columns:1fr;grid-template-rows:auto auto auto;border-right:0;border-bottom:1px solid #a98212}.exchange-bid-heading{grid-template-columns:1fr}.exchange-bid-form{grid-template-columns:1fr}.exchange-bid-form h3,.exchange-bid-check,.exchange-bid-form button{grid-column:1}.exchange-bid-form input[type=text],.exchange-bid-form input[type=email],.exchange-bid-form input[type=tel]{height:34px}.exchange-bid-form button{height:42px;margin-bottom:10px}.exchange-explainer{min-height:330px;padding:24px 20px 65px 90px}.approved-page-rest>.approved-full-image{top:-143.359375vw}}
      `}</style>

      <header className="exchange-live-menu">
        <a className="exchange-logo" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </a>
        <button className="exchange-menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>☰</button>
        <HeaderNavMenus className={menuOpen ? "primary-nav is-open" : "primary-nav"} />
        <div className="exchange-actions">
          <a className="list-action" href="/sell-your-license">List Your License</a>
          <a className="contact-action" href="/contact">Contact Us</a>
        </div>
        <a className="exchange-search" href="/listings" aria-label="Search listings">⌕</a>
      </header>

      <section className="exchange-live-hero" aria-label="FLLM Exchange trading floor" />

      <section className="exchange-tickers" aria-label="Live Florida liquor license asking prices">
        {[firstRow, secondRow].map((row, rowIndex) => {
          const label = rowIndex === 0 ? "LIVE MARKET ACTIVITY" : "RECENT LISTINGS:";
          const sequence = [{ county: label, href: "/listings", price: "", type: "" }, ...row];
          return <div className="exchange-ticker-row" key={label}><div className="exchange-ticker-track">{[...sequence, ...sequence].map((listing, index) => <a className="exchange-ticker-item" href={listing.href} key={`${rowIndex}-${listing.county}-${listing.price}-${index}`}><b className={listing.price ? undefined : "exchange-ticker-label"}>{listing.county}</b>{listing.type ? <span>{listing.type}</span> : null}{listing.price ? <strong>{listing.price}</strong> : null}{listing.price ? <em>▲</em> : null}</a>)}</div></div>;
        })}
      </section>

      <section className="exchange-market-html" aria-label="FLLM Exchange market overview">
        <div className="market-panels">
          <article className="market-panel heat-panel">
            <h2>FLORIDA MARKET<br />HEAT MAP</h2>
            <nav className="heat-filters" aria-label="Heat map filters">
              <a href="/counties">ALL LICENSE TYPES</a>
              <a href="/license-types/4cop-quota">4COP QUOTA</a>
              <a href="/license-types/3ps-package-store">3PS</a>
              <a href="/license-types/2cop-beer-wine">2PS</a>
              <a href="/resources/florida-liquor-license-types">COP</a>
              <a href="/counties">COUNTY DATA</a>
            </nav>
            <div className="heat-map-art" aria-hidden="true"><img src="/assets/fllm-exchange-heatmap.svg" alt="" /></div>
            <div className="heat-legend"><b>MARKET ACTIVITY</b><div className="heat-scale"><span>LOW</span><span className="heat-gradient" /><span>HIGH</span></div></div>
          </article>

          <article className="market-panel board-panel">
            <h1>FLLM EXCHANGE BOARD</h1>
            <div className="board-table">
              <div className="board-head"><span>County</span><span>Active Listings</span><span>Last Asking Price</span><span>Status</span></div>
              {[
                ["Miami-Dade", "3PS Liquor Store", "$950,000"],
                ["Monroe", "4COP Quota", "$1,300,000"],
                ["Broward", "3PS Liquor Store", "$875,000"],
                ["Palm Beach", "4COP Quota", "$1,150,000"],
                ["Sarasota", "3PS Liquor Store", "$700,000"],
                ["Orange", "4COP Quota", "$925,000"],
                ["Duval", "3PS Liquor Store", "$850,000"],
                ["Lee", "4COP Quota", "$1,250,000"],
                ["St. Johns", "3PS Liquor Store", "$425,000"],
                ["Hillsborough", "4COP Quota", "$1,625,000"],
              ].map(([county, type, price]) => <a className="board-row" href="/listings" key={`${county}-${type}`}><span>{county}</span><span>{type}</span><strong>{price}</strong><em>AVAILABLE</em></a>)}
            </div>
            <div className="board-action"><a className="outline-button" href="/listings">VIEW ALL LISTINGS&nbsp; →</a></div>
          </article>

          <article className="market-panel snapshot-panel">
            <div className="snapshot-heading"><h2>MARKET<br />SNAPSHOT</h2><small>FLORIDA LIQUOR LICENSE<br />MARKET</small></div>
            <div className="snapshot-stats">
              <div><strong>188</strong><span>ACTIVE LISTINGS</span></div>
              <div><strong>67</strong><span>COUNTIES</span></div>
              <div><strong>$742,500</strong><span>AVG. ASKING PRICE<br />(ALL TYPES)</span></div>
              <div><strong>$1,125,000</strong><span>AVG. LISTING PRICE<br />(4COP TYPES)</span></div>
            </div>
            <div className="board-action"><a className="outline-button" href="/florida-liquor-license-market-index">VIEW MARKET ANALYSIS&nbsp; →</a></div>
          </article>
        </div>

        <nav className="exchange-service-strip" aria-label="FLLM Exchange services">
          <a href="/listings"><i>⌕</i><span>BROWSE<br />ACTIVE LISTINGS</span></a>
          <a href="/sell-your-license"><i>▤</i><span>LIST YOUR<br />LICENSE</span></a>
          <a href="/florida-liquor-license-appraisal"><i>▥</i><span>GET A<br />VALUATION</span></a>
          <a href="/financing"><i>▰</i><span>EXPLORE<br />FINANCING</span></a>
          <a href="/resources/liquor-license-attorneys"><i>⚖</i><span>FIND A<br />LICENSE ATTORNEY</span></a>
        </nav>

        <section className="exchange-news-row">
          <div className="news-copy-panel"><h2>FLLM NEWS BROADCAST</h2><p>Expert analysis. Market trends.<br />Legislative updates. Insights that<br />drive the Florida liquor license market.</p><a className="outline-button" href="/florida-liquor-license-news">WATCH ALL EPISODES&nbsp; →</a></div>
          <div className="news-art-crop" aria-label="FLLM News Network broadcast"><img src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1" alt="FLLM News Network broadcast" /></div>
          <aside className="news-headlines"><header><b>LATEST HEADLINES</b><a href="/florida-liquor-license-news">VIEW ALL NEWS →</a></header><a href="/florida-liquor-license-news">Florida Liquor License Prices Show Strong Growth in 2024<br />Apr. 24, 2024</a><a href="/florida-liquor-license-news">New Legislation Could Impact License Transfers<br />Mar. 18, 2024</a><a href="/florida-liquor-license-news">South Florida Leads in New Listings<br />Mar. 10, 2024</a><a href="/florida-liquor-license-news">Financing Options Expand for License Buyers<br />Mar. 02, 2024</a></aside>
        </section>

        <section className="featured-html" aria-labelledby="featured-listings-title" onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onFocus={() => setCarouselPaused(true)} onBlur={() => setCarouselPaused(false)}>
          <div className="featured-heading"><h2 id="featured-listings-title">FEATURED LICENSE LISTINGS</h2><a href="/listings">VIEW ALL LISTINGS →</a></div>
          <div className="featured-cards">
            {visibleFeaturedCards.map((card, position) => <article className="featured-card" key={`${carouselIndex}-${position}-${card.reference}`}>
              <div className="featured-card-art" aria-hidden="true"><img src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1" alt="" style={{ left: card.artLeft }} /></div>
              <div className="featured-card-details"><b>{card.type}</b><span>{card.county}</span><strong>{card.price}</strong><div className="featured-card-meta"><em>Available</em><small># {card.reference}</small></div></div>
              <a className="featured-card-button" href={card.href}>VIEW LISTING&nbsp; →</a>
            </article>)}
          </div>
          <button className="featured-arrow featured-arrow-left" type="button" aria-label="Previous featured listings" onClick={() => setCarouselIndex((current) => (current - 1 + carouselPool.length) % carouselPool.length)}>‹</button>
          <button className="featured-arrow featured-arrow-right" type="button" aria-label="Next featured listings" onClick={() => setCarouselIndex((current) => (current + 1) % carouselPool.length)}>›</button>
        </section>
      </section>

      <section className="tools-html" aria-labelledby="market-tools-title">
        <header className="tools-heading"><h2 id="market-tools-title">MARKET TOOLS &amp; RESOURCES</h2><p>EVERYTHING YOU NEED TO BUY, SELL, AND INVEST IN FLORIDA LIQUOR LICENSES.</p></header>
        <div className="tools-grid">
          {toolCards.map((tool) => <article className="tool-card" key={tool.title}>
            <div className="tool-card-art" aria-hidden="true"><img src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1" alt="" style={{ left: tool.artLeft, top: tool.artTop }} /></div>
            <div className="tool-card-copy"><h3>{tool.title}</h3><p>{tool.description}</p></div>
            <a className="tool-card-link" href={tool.href}>{tool.action}</a>
          </article>)}
        </div>
      </section>

      <section className="exchange-html" aria-labelledby="private-exchange-title">
        <div className="exchange-bid-side">
          <header className="exchange-bid-heading">
            <div><span>FLLM EXCHANGE</span><h2 id="private-exchange-title">Confidential Bid / Ask Exchange</h2></div>
            <p>Submit a confidential buyer bid. Buyer bids, bid counts, and bid/ask spreads are not displayed publicly. The seller can accept or counter through a secure FLLM link.</p>
          </header>
          <div className="seller-ask"><span>SELLER ASK</span><strong>$505,000</strong></div>
          <form className="exchange-bid-form" onSubmit={(event) => { event.preventDefault(); setBidSubmitted(true); }}>
            <h3>Place a Bid</h3>
            <label>Buyer Name *<input name="buyerName" type="text" placeholder="Enter your name" required /></label>
            <label>Email *<input name="email" type="email" placeholder="Enter your email" required /></label>
            <label>Phone *<input name="phone" type="tel" placeholder="Enter your phone number" required /></label>
            <label>Bid Price *<input name="bidPrice" type="text" inputMode="numeric" placeholder="$ 500,000" required /></label>
            <label className="exchange-bid-check"><input name="acknowledgment" type="checkbox" required /><span>I understand this bid and any FLLM price match are non-binding and final transaction terms are separately accepted.</span></label>
            <button type="submit">Submit Buyer Bid</button>
            {bidSubmitted ? <p className="exchange-bid-status" role="status">Your bid information is ready for confidential FLLM review.</p> : null}
          </form>
        </div>
        <aside className="exchange-explainer">
          <div className="exchange-handshake-art" aria-hidden="true"><img src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1" alt="" /></div>
          <h2>What is the FLLM Private Bid / Ask Exchange?</h2>
          <p>The FLLM Private Bid / Ask Exchange is a confidential, direct discovery and negotiation tool for Florida liquor license opportunities.</p>
          <ul><li>Buyers can submit confidential bids on available licenses.</li><li>Bids do not use and bid/ask spreads are not displayed publicly.</li><li>Sellers can review, accept, reject, or counter offers through secure FLLM links.</li><li>Price matches are not binding and final transaction terms are separately accepted.</li><li>This tool is intended for serious, qualified buyers and sellers.</li></ul>
          <p className="exchange-confidence">CONFIDENTIAL. SECURE. SERIOUS OPPORTUNITIES.</p>
        </aside>
      </section>

      <section className="approved-page-rest" aria-label="FLLM Exchange Board market information">
        <img className="approved-full-image" src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1" alt="FLLM Exchange Board market information" width={1024} height={1536} />
        <span className="approved-footer-cover" aria-hidden="true" />
        <img className="approved-footer-logo" src="/assets/brand-footer-transparent.png" alt="" aria-hidden="true" />
      </section>
    </main>
  );
}
