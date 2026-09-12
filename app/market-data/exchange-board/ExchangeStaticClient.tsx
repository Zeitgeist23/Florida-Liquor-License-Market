"use client";

import { useState } from "react";
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
  const firstRow = tickerListings.slice(0, Math.min(16, tickerListings.length));
  const secondRow = tickerListings.slice(16, 32).length
    ? tickerListings.slice(16, 32)
    : [...firstRow].reverse();

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
        .approved-page-rest{position:relative;width:100%;aspect-ratio:1024/1201;overflow:hidden;line-height:0;background:#020d18}
        .approved-page-rest>.approved-full-image{position:absolute;top:-32.71484375vw;left:0;display:block;width:100%;max-width:none;height:auto;margin:0;padding:0}
        .approved-footer-cover{position:absolute;z-index:1;bottom:0;left:0;width:15.2%;height:5.56%;background:linear-gradient(90deg,rgb(1 15 32) 0%,rgb(1 20 35) 100%)}
        .approved-footer-logo{position:absolute;z-index:2;bottom:.704%;left:1.75%;width:auto;height:3.9%}
        @keyframes exchangeTickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(prefers-reduced-motion:reduce){.exchange-ticker-track{animation-play-state:paused}}
        @media(max-width:1150px){.exchange-search{display:none}.exchange-live-menu .exchange-logo{flex-basis:185px}.exchange-live-menu .primary-nav{gap:12px}}
        @media(max-width:820px){.exchange-live-menu{height:72px}.exchange-live-menu .exchange-logo{flex-basis:190px}.exchange-menu-toggle{display:block}.exchange-live-menu .primary-nav{display:none;position:absolute;top:72px;left:0;right:0;flex-direction:column;align-items:stretch;padding:10px;background:#06131f;border:1px solid #34495b}.exchange-live-menu .primary-nav.is-open{display:flex}.exchange-live-menu .primary-nav a,.exchange-live-menu .primary-nav button{width:100%;padding:12px;text-align:center}.exchange-live-menu .exchange-actions{display:none}.exchange-live-hero{background-position:center -72px;min-height:172px;aspect-ratio:auto;background-size:auto 244px}}
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

      <section className="approved-page-rest" aria-label="FLLM Exchange Board market information">
        <img className="approved-full-image" src="/assets/fllm-exchange-landing-page-approved-design.png?v=20260912-1" alt="FLLM Exchange Board market information" width={1024} height={1536} />
        <span className="approved-footer-cover" aria-hidden="true" />
        <img className="approved-footer-logo" src="/assets/brand-footer-transparent.png" alt="" aria-hidden="true" />
      </section>
    </main>
  );
}
