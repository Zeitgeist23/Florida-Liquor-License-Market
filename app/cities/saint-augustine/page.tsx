import type { Metadata } from "next";
import Link from "next/link";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";
import {
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../../fllm-official-template.css";

const siteUrl="https://www.floridaliquorlicensemarket.com";
const canonicalUrl=`${siteUrl}/cities/saint-augustine`;
const county="St. Johns County";
const heroPhoto="https://ak7.picdn.net/shutterstock/videos/8711167/thumb/1.jpg";

export const dynamic="force-dynamic";
export const revalidate=0;

export const metadata:Metadata={
  title:"Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description:"Saint Augustine liquor-license market data for St. Johns County. Compare business-package inventory and standalone 4COP and 3PS quota-license inventory.",
  alternates:{canonical:canonicalUrl},
  robots:{index:true,follow:true},
};

function ck(v:string){return v.replace(/\s+County$/i,"").trim();}
function hc(n:number){if(n>=21)return"#b850e5";if(n>=11)return"#8757e8";if(n>=6)return"#6877e8";if(n>=3)return"#20a9d1";if(n>=1)return"#168dbc";return"#173650";}

function MapBlock({counts,rows,title,id}:{counts:Map<string,number>;rows:{value:number;label:string}[];title:string;id:string}){
  return <div className="mapBlock">
    <svg className="flMap" viewBox="90 -8 390 302" role="img" aria-label="Florida county map with St. Johns County highlighted">
      <defs><filter id={id} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {FLORIDA_COUNTY_PATHS.map(p=>{const k=ck(p.name),a=k==="St. Johns",n=counts.get(k)||0;return <path key={p.id} d={p.path} fill={a?"#22d1e3":hc(n)} stroke={a?"#d9feff":"#7794aa"} strokeWidth={a?1.8:.7} filter={a?`url(#${id})`:undefined}/>;})}
      <g transform="translate(365 64)"><path d="M0 -12C7 -12 12 -7 12 0C12 8 0 20 0 20S-12 8-12 0C-12-7-7-12 0-12Z" fill="#ef334e" stroke="#fff" strokeWidth="2.3"/><circle r="4" fill="#fff"/></g>
    </svg>
    <div className="tip"><strong>St. Johns County</strong>{rows.map(r=><span key={r.label}><b>{r.value}</b>{r.label}</span>)}</div>
    <div className="legend"><strong>{title}</strong>
      <span><i style={{background:"#173650"}}/>0 listings</span>
      <span><i style={{background:"#168dbc"}}/>1–2 listings</span>
      <span><i style={{background:"#20a9d1"}}/>3–5 listings</span>
      <span><i style={{background:"#6877e8"}}/>6–10 listings</span>
      <span><i style={{background:"#8757e8"}}/>11–20 listings</span>
      <span><i style={{background:"#b850e5"}}/>21+ listings</span>
    </div>
  </div>
}

function Card({value,label,icon,href}:{value:number;label:string;icon:string;href:string}){
  return <Link className="card" href={href}><span className="ic">{icon}</span><span className="num">{value}</span><span className="lab">{label}</span><span className="arr">›</span></Link>
}

export default async function Page(){
  const standalone=getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const q=businessQuotaListings.filter(x=>x.county===county).length;
  const s=businessSfsListings.filter(x=>x.county===county).length;
  const b=business2copListings.filter(x=>x.county===county).length;
  const c4=standalone.filter(x=>x.county===county&&x.type==="4COP Quota").length;
  const p3=standalone.filter(x=>x.county===county&&x.type==="3PS Quota / Package Store").length;

  const bc=new Map<string,number>();
  for(const x of [...businessQuotaListings,...businessSfsListings,...business2copListings]){const k=ck(x.county);bc.set(k,(bc.get(k)||0)+1);}
  const lc=new Map<string,number>();
  for(const x of standalone){if(x.type!=="4COP Quota"&&x.type!=="3PS Quota / Package Store")continue;const k=ck(x.county);lc.set(k,(lc.get(k)||0)+1);}

  return <main className="page">
    <style>{`
      *{box-sizing:border-box}.page{margin:0;background:#061a2a;color:#fff;font-family:Arial,sans-serif;min-height:100vh}.frame{width:1122px;max-width:100%;margin:0 auto;background:linear-gradient(#061a2a,#082238 60%,#061a2a)}
      .hdr{height:68px;background:#031522;border-bottom:1px solid #9b7100;display:grid;grid-template-columns:160px 1fr 250px;align-items:center;padding:0 30px}.logo img{width:140px;display:block}.nav{display:flex;justify-content:center;gap:29px}.nav a{color:#fff;text-decoration:none;font-size:8px;font-weight:800;text-transform:uppercase}.nav a:after{content:"⌄";margin-left:4px;color:#b5c3cc}.acts{display:flex;gap:12px;justify-content:flex-end}.acts a{height:34px;display:flex;align-items:center;padding:0 14px;border-radius:5px;font-size:8px;font-weight:900;text-transform:uppercase;text-decoration:none}.contact{border:1px solid #e39b00;color:#f5aa00}.list{background:linear-gradient(145deg,#f8b72f,#e99a00 58%,#cf7800);border:1px solid #ffbd2e;color:#07101a}
      .hero{height:373px;position:relative;overflow:hidden}.photo{position:absolute;right:0;top:0;width:64%;height:100%;background:url("${heroPhoto}") center/cover no-repeat}.fade{position:absolute;inset:0;background:linear-gradient(90deg,#061a2a 0%,#061a2a 36%,rgba(6,26,42,.96) 43%,rgba(6,26,42,.58) 55%,rgba(6,26,42,.08) 72%,transparent 100%)}.hcopy{position:absolute;left:40px;top:29px;width:460px;z-index:2}.k{color:#f5aa00;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:9px}.hcopy h1{font-family:Georgia,serif;font-size:51px;line-height:.99;letter-spacing:-.02em;margin:0 0 18px}.hcopy p{font-size:10px;line-height:1.55;margin:0 0 16px;max-width:450px}.loc{font-size:9px;font-weight:700}.loc b{color:#f5aa00;font-size:15px;margin-right:7px}.city{position:absolute;right:35px;bottom:24px;z-index:2;text-align:center;font:italic 27px Georgia,serif;text-shadow:0 2px 7px #000}.city small{display:block;font:700 7px Arial,sans-serif;letter-spacing:.26em;text-transform:uppercase;margin-top:5px}
      .content{padding:17px 24px 0}.panel{height:403px;border:1px solid #c78e00;border-radius:10px;background:linear-gradient(135deg,#082338,#071d2f);display:grid;grid-template-columns:54% 46%;overflow:hidden}.panel+ .panel{height:378px;margin-top:18px}.copy{padding:27px 33px 24px}.copy h2{font-family:Georgia,serif;font-size:34px;line-height:1.03;margin:0 0 13px}.copy p{font-size:10px;line-height:1.55;color:#dcebf4;margin:0 0 15px;max-width:500px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:14px}.cards.two{grid-template-columns:repeat(2,1fr);max-width:520px}.card{height:110px;border:1px solid #16d5e8;border-radius:7px;background:linear-gradient(145deg,#082a40,#061c2c);display:grid;grid-template-columns:40px 1fr 10px;grid-template-rows:auto auto;gap:0 8px;align-items:center;padding:0 10px;text-decoration:none;box-shadow:0 0 16px rgba(22,213,232,.13)}.ic{grid-row:1/3;width:33px;height:33px;border:2px solid #16d5e8;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#16d5e8;font-size:14px}.num{align-self:end;font:700 30px/.95 Georgia,serif;color:#fff}.lab{align-self:start;color:#fff;font-size:7px;line-height:1.18;margin-top:5px}.arr{grid-row:1/3;grid-column:3;color:#fff;font-size:18px}.gold{display:inline-flex;height:38px;align-items:center;padding:0 18px;margin-top:18px;border:1px solid #ffbd2e;border-radius:5px;background:linear-gradient(145deg,#f8b72f,#e99a00 58%,#cf7800);color:#07101a!important;text-decoration:none;font-size:8px;font-weight:900;text-transform:uppercase}
      .mapBlock{position:relative;height:100%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 64% 48%,rgba(22,213,232,.12),transparent 40%)}.flMap{width:430px;max-width:92%;height:auto;filter:drop-shadow(0 8px 18px rgba(0,0,0,.35));transform:translate(10px,0)}.tip{position:absolute;right:8px;top:20px;min-width:155px;padding:9px 10px;border:1px solid #16d5e8;border-radius:7px;background:rgba(3,25,41,.97);box-shadow:0 0 16px rgba(22,213,232,.18)}.tip strong{display:block;font:700 14px/1.1 Georgia,serif;margin-bottom:6px}.tip span{display:block;font-size:7px;line-height:1.75;white-space:nowrap}.tip b{display:inline-block;width:23px;font-size:11px}.legend{position:absolute;left:33px;bottom:28px;min-width:145px;padding:10px 11px;border:1px solid #a47600;border-radius:7px;background:rgba(4,25,40,.94)}.legend strong{display:block;color:#f5aa00;font-size:7px;line-height:1.2;text-transform:uppercase;margin-bottom:7px}.legend span{display:flex;align-items:center;gap:6px;font-size:7px;line-height:1.55}.legend i{width:18px;height:11px;border:1px solid rgba(255,255,255,.3);border-radius:2px}
      .intel{height:92px;margin-top:18px;border:1px solid #9e7400;border-radius:8px;background:#092236;display:grid;grid-template-columns:1.05fr 1.45fr auto;gap:20px;align-items:center;padding:0 28px}.ileft{display:flex;align-items:center;gap:14px}.bars{font-size:30px;color:#25c8e3}.ileft strong{font:700 18px Georgia,serif}.intel p{font-size:8px;line-height:1.5;color:#d2e5ef;margin:0}.outline{height:36px;display:inline-flex;align-items:center;padding:0 16px;border:1px solid #d99500;border-radius:5px;color:#f5aa00!important;text-decoration:none;text-transform:uppercase;font-size:8px;font-weight:900}.foot{height:50px}
      @media(max-width:1122px){.frame{width:100%}}@media(max-width:760px){.hdr{grid-template-columns:150px 1fr;padding:0 14px}.nav{display:none}.hero{min-height:430px;height:auto}.photo{width:100%;opacity:.45}.fade{background:linear-gradient(90deg,rgba(6,26,42,.98),rgba(6,26,42,.72))}.hcopy{left:24px;top:30px;width:70%}.panel,.panel+ .panel{height:auto;grid-template-columns:1fr}.mapBlock{height:360px}.intel{height:auto;min-height:110px;grid-template-columns:1fr;padding:18px 22px}}
    `}</style>
    <div className="frame">
      <header className="hdr"><Link className="logo" href="/"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market"/></Link><nav className="nav"><Link href="/buy-florida-liquor-license">Buy</Link><Link href="/sell-your-license">Sell</Link><Link href="/financing">Finance</Link><Link href="/investment-opportunities">Invest</Link><Link href="/market-data">Market Data</Link><Link href="/resources/florida-liquor-license-types">License Types</Link><Link href="/resources">Resources</Link></nav><div className="acts"><Link className="contact" href="/contact">✉ Contact Us</Link><Link className="list" href="/sell-your-license#listing-options">List Your License</Link></div></header>
      <section className="hero"><div className="photo"/><div className="fade"/><div className="hcopy"><span className="k">Florida Market Data</span><h1>Saint Augustine<br/>Liquor License<br/>Market Data</h1><p>Explore current marketplace inventory and key market data for liquor license business packages and standalone quota licenses in Saint Augustine, Florida, located in St. Johns County. Compare listings, view county-level insights, and make more informed buying or selling decisions.</p><div className="loc"><b>●</b>Serving Saint Augustine, Florida in St. Johns County.</div></div><div className="city">Saint Augustine<small>Florida · America&apos;s Oldest City</small></div></section>
      <div className="content">
        <section className="panel"><div className="copy"><span className="k">Business Market Overview</span><h2>Businesses on the Market<br/>in Saint Augustine</h2><p>View current business acquisition opportunities with liquor licenses in Saint Augustine and throughout St. Johns County. These listings include operating businesses with existing liquor licenses and associated transaction assets where applicable.</p><div className="cards"><Card value={q} label="Businesses with Quota Licenses" icon="▣" href="/listings?type=businesses&county=St.+Johns+County#business-package-results"/><Card value={s} label="Businesses with 4COP SFS/SRX Licenses" icon="♨" href="/listings?type=businesses-sfs&county=St.+Johns+County#business-package-results"/><Card value={b} label="Businesses with 2COP Beer & Wine Only Licenses" icon="⌁" href="/listings?type=businesses-2cop&county=St.+Johns+County#business-package-results"/></div><Link className="gold" href="/listings?county=St.+Johns+County#business-package-results">View All Saint Augustine Business Listings&nbsp;&nbsp;›</Link></div><MapBlock counts={bc} rows={[{value:q,label:"Businesses w/ Quota"},{value:s,label:"Businesses w/ 4COP"},{value:b,label:"Businesses w/ 2COP"}]} title="Business Listings By County" id="businessGlow"/></section>
        <section className="panel"><div className="copy"><span className="k">Quota License Market Overview</span><h2>Standalone Quota Liquor<br/>Licenses in Saint Augustine</h2><p>Track available standalone quota liquor licenses in Saint Augustine and St. Johns County, including 4COP and 3PS license types. Compare current inventory, view market activity, and explore opportunities across Florida.</p><div className="cards two"><Card value={c4} label="4COP Quota Licenses" icon="▤" href="/listings?county=St.+Johns+County&type=4COP+Quota#listing-results"/><Card value={p3} label="3PS Quota Licenses" icon="▤" href="/listings?county=St.+Johns+County&type=3PS+Quota+%2F+Package+Store#listing-results"/></div><Link className="gold" href="/counties/st-johns">View All Quota License Listings&nbsp;&nbsp;›</Link></div><MapBlock counts={lc} rows={[{value:c4,label:"4COP Quota Licenses"},{value:p3,label:"3PS Quota Licenses"}]} title="Quota License Listings By County" id="licenseGlow"/></section>
        <section className="intel"><div className="ileft"><span className="bars">▥</span><div><span className="k">Market Intelligence</span><strong>St. Johns County at a Glance</strong></div></div><p>Saint Augustine&apos;s unique blend of historic charm, strong tourism, and growing population make it an attractive market for hospitality investment. Explore current listings and monitor market activity to find the right opportunity in St. Johns County.</p><Link className="outline" href="/counties/st-johns">View County Insights&nbsp;&nbsp;›</Link></section><div className="foot"/>
      </div>
    </div>
  </main>
}
