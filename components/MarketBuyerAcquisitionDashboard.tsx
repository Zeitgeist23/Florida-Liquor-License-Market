"use client";
import { FormEvent, useState } from "react";

type Props={listingReference:string;listingUrl:string;county:string;businessType:string;licenseType:string};
const categories=["Bar","Restaurant","Restaurant / Bar","Cocktail Lounge","Nightclub","Liquor Store","Convenience Store","Gentlemen's Club","Marina","Hotel / Motel","Country Club","Other Hospitality"];
const licenses=["4COP Quota","3PS Quota / Package Store","4COP SFS/SRX","2COP Beer & Wine"];
const finance=["SBA 7(a) Eligible","Seller Financing","Cash Purchase","Conventional Financing","Alternative Financing"];
const extras=["Established business only","Absentee owner preferred","Turnkey operation","Waterfront / Beachfront","Outdoor seating","Franchise"];
export default function MarketBuyerAcquisitionDashboard({listingReference,listingUrl,county,businessType,licenseType}:Props){
 const [types,setTypes]=useState<string[]>([businessType]);
 const [lic,setLic]=useState<string[]>([licenseType]);
 const [areas,setAreas]=useState<string[]>([county]);
 const [extraCounty,setExtraCounty]=useState("");
 const [fin,setFin]=useState<string[]>([]);
 const [other,setOther]=useState<string[]>([]);
 const [property,setProperty]=useState("Any");
 const [lease,setLease]=useState("Any");
 const [rent,setRent]=useState("");
 const [budget,setBudget]=useState("");
 const [revenue,setRevenue]=useState("");
 const [sde,setSde]=useState("");
 const [ebitda,setEbitda]=useState("");
 const [cash,setCash]=useState("");
 const [showContact,setShowContact]=useState(false);
 const [ownership,setOwnership]=useState("License with business package");
 const [financeTab,setFinanceTab]=useState("Asking Price");
 const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
 const [feedback,setFeedback]=useState("");
 const [matches,setMatches]=useState<number|null>(null);
 const [consent,setConsent]=useState(false);
 const toggle=(item:string,current:string[],set:(x:string[])=>void)=>set(current.includes(item)?current.filter(x=>x!==item):[...current,item]);
 const reset=()=>{setTypes([businessType]);setLic([licenseType]);setAreas([county]);setFin([]);setOther([]);setProperty("Any");setLease("Any");setRent("");setBudget("");setRevenue("");setSde("");setEbitda("");setCash("");setExtraCounty("");setOwnership("License with business package");setFinanceTab("Asking Price");setShowContact(false);setStatus("idle");setFeedback("");setMatches(null)};
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setStatus("sending");setFeedback("");
  const fd=new FormData(event.currentTarget);
  const name=String(fd.get("fullName")||"").trim().split(/\s+/);
  const notes=[
   "Independent Market View buyer requirements (not a seller-authorized inquiry).",
   "Real estate: "+property,"Lease: "+lease,"Maximum monthly rent: "+(rent||"Any"),
   "Available cash / down payment: "+(cash||"Not specified"),
   "Financing selected: "+(fin.join(", ")||"Any"),
   "Additional preferences: "+(other.join(", ")||"None"),"License ownership: "+ownership,
   "Buyer comments: "+String(fd.get("comments")||""),
  ].join("\n");
  try{
   const response=await fetch("/api/business-alerts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
    firstName:name[0]||"",lastName:name.slice(1).join(" "),email:String(fd.get("email")||""),phone:String(fd.get("phone")||""),
    businessTypes:types,licenseTypes:lic,counties:areas,
    maxPurchasePrice:budget,minGrossRevenue:revenue,minSde:sde,minEbitda:ebitda,
    financingPreferences:fin.includes("Cash Purchase")&&fin.length===1?["Cash"]:fin.includes("Seller Financing")?["Seller Financing"]:fin.includes("SBA 7(a) Eligible")?["SBA"]:["Any"],
    notes,consent,sourceMarketViewRef:listingReference,sourceMarketViewUrl:listingUrl
   })});
   const data=await response.json();
   if(!response.ok)throw new Error(data.error||"Unable to save buyer profile.");
   setMatches(data.currentMatches??0);setStatus("sent");setFeedback("Buyer profile saved and matching alerts activated. Your criteria will be used for FLLM opportunity notifications.");
  }catch(e){setStatus("error");setFeedback(e instanceof Error?e.message:"Unable to save profile.");}
 }
 const check=(label:string,items:string[],set:(x:string[])=>void)=><label className="buyer-terminal-choice" key={label}><input type="checkbox" checked={items.includes(label)} onChange={()=>toggle(label,items,set)}/><span>{label}</span></label>;
 const field=(label:string,val:string,set:(x:string)=>void)=><label className="buyer-terminal-field"><span>{label}</span><div className="buyer-terminal-range"><input type="range" min="0" max="5000000" step="5000" value={Number(val)||0} onChange={e=>set(e.target.value)}/><input type="number" min="0" value={val} onChange={e=>set(e.target.value)} placeholder="Any"/></div></label>;
 return <section className="buyer-terminal" id="specific-market-inquiry" aria-label="FLLM Buyer Acquisition Dashboard">
  <header className="buyer-terminal-header buyer-terminal-header--approved">
    <div className="buyer-terminal-intro"><span className="buyer-terminal-eyebrow">FLLM BUYER MATCH DASHBOARD</span><h2>Request Market Match Criteria</h2><p>Set your requirements and get matched with relevant Florida business and liquor-license opportunities based on our independent market data. This is an Independent Market View, not a broker-authorized listing.</p></div>
    <div className="buyer-terminal-command"><div className="buyer-terminal-kpis"><div className="buyer-terminal-kpi buyer-terminal-kpi--green"><strong>—</strong><span>Active Listings</span></div><div className="buyer-terminal-kpi buyer-terminal-kpi--cyan"><strong>—</strong><span>New This Month</span></div><div className="buyer-terminal-kpi buyer-terminal-kpi--red"><strong>—</strong><span>Price Reductions</span></div><div className="buyer-terminal-kpi buyer-terminal-kpi--alerts"><strong>♧</strong><span>Buyer Alerts<br/>Available</span></div></div><div className="buyer-terminal-top-actions"><button type="button" onClick={()=>setShowContact(true)}>▣ Save Search</button><button type="button" onClick={reset}>↻ Reset</button><button type="button" className="buyer-terminal-submit" onClick={()=>setShowContact(true)}>Find Matching Opportunities →</button></div></div>
  </header>
  <form onSubmit={submit}>
   <div className="buyer-terminal-grid">
    <section className="buyer-terminal-panel"><h3>⌖ 1. BUSINESS & LOCATION</h3><h4>Business categories</h4><div className="buyer-terminal-check-grid">{categories.map(t=>check(t,types,setTypes))}</div><h4>Target counties</h4><div className="buyer-terminal-county">{areas.map(a=><button type="button" key={a} onClick={()=>setAreas(areas.filter(x=>x!==a))}>{a} ×</button>)}</div><div className="buyer-terminal-inline"><select value={extraCounty} onChange={e=>setExtraCounty(e.target.value)}><option value="">Add a county</option>{["Miami-Dade","Broward","Palm Beach","Martin","St. Lucie","Pinellas","Hillsborough","Orange","Lee","Collier","Sarasota","Duval","St. Johns","Volusia"].map(c=><option key={c} value={c+" County"}>{c}</option>)}</select><button type="button" onClick={()=>{if(extraCounty&&!areas.includes(extraCounty))setAreas([...areas,extraCounty]);setExtraCounty("")}}>Add</button></div></section>
    <section className="buyer-terminal-panel"><h3>⚑ 2. LIQUOR LICENSE TYPE</h3><h4>License classes</h4><div className="buyer-terminal-check-grid buyer-terminal-check-grid--single">{licenses.map(t=>check(t,lic,setLic))}</div><h4>License ownership preference</h4><div className="buyer-terminal-ownership">{["Transferable license required","License with business package","Standalone license only","Either"].map(v=><label className="buyer-terminal-choice" key={v}><input type="radio" name="licenseOwnership" checked={ownership===v} onChange={()=>setOwnership(v)}/><span>{v}</span></label>)}</div><p className="buyer-terminal-footnote">Quota licenses may have independently estimated asset values. SFS/SRX and 2COP are location-specific and have no separate quota-license valuation.</p></section>
    <section className="buyer-terminal-panel"><h3>▥ 3. FINANCIAL REQUIREMENTS</h3><div className="buyer-terminal-finance-tabs">{["Asking Price","Revenue","SDE / Cash Flow","EBITDA"].map(t=><button key={t} type="button" aria-pressed={financeTab===t} onClick={()=>setFinanceTab(t)} className={financeTab===t?"is-active":""}>{t}</button>)}</div>{field("Maximum purchase price ($)",budget,setBudget)}{field("Minimum gross annual revenue ($)",revenue,setRevenue)}{field("Minimum SDE / cash flow ($)",sde,setSde)}{field("Minimum EBITDA ($)",ebitda,setEbitda)}{field("Available cash / down payment ($)",cash,setCash)}</section>
    <section className="buyer-terminal-panel"><h3>▤ 4. DEAL STRUCTURE & OTHER</h3><div className="buyer-terminal-dealgrid"><div><h4>Financing preferences</h4><div className="buyer-terminal-check-grid buyer-terminal-check-grid--single">{finance.map(t=>check(t,fin,setFin))}</div></div><div><h4>Real estate preference</h4><div className="buyer-terminal-ownership">{["Any","Real estate included","Real estate available separately","Leased premises only"].map(v=><label className="buyer-terminal-choice" key={v}><input type="radio" name="property" checked={property===v} onChange={()=>setProperty(v)}/><span>{v}</span></label>)}</div></div><div><h4>Lease requirements</h4><select value={lease} onChange={e=>setLease(e.target.value)}>{["Any","3+ years remaining","5+ years remaining","10+ years remaining","Renewal options required"].map(x=><option key={x}>{x}</option>)}</select>{field("Maximum monthly rent ($)",rent,setRent)}</div><div><h4>Other preferences</h4><div className="buyer-terminal-check-grid buyer-terminal-check-grid--single">{extras.map(t=>check(t,other,setOther))}</div></div></div></section>
   </div>
   <div className="buyer-terminal-matchbar"><div><strong>◎ GET MATCHED WITH OPPORTUNITIES</strong><p>Save buyer requirements and receive alerts about relevant business and license opportunities.</p></div><button type="button" className="buyer-terminal-submit" onClick={()=>setShowContact(true)}>Find Matching Opportunities →</button><div className="buyer-terminal-match-features"><span>⌕ Independent Market View</span><span>◈ Confidential & Secure</span><span>♧ New Match Alerts</span><span>▥ Data-Driven Insights</span></div></div>{showContact && <div className="buyer-terminal-contact"><h3>BUYER CONTACT & MATCH ALERTS</h3><div className="buyer-terminal-contact-grid"><label>Full name<input name="fullName" autoComplete="name" placeholder="Full name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="Email" required/></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Phone" required/></label><label>Additional requirements<input name="comments" placeholder="Optional comments"/></label></div><label className="buyer-terminal-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/>I agree to receive FLLM email alerts for matching business and license opportunities.</label><div className="buyer-terminal-actions"><button type="button" className="buyer-terminal-reset" onClick={reset}>Reset Criteria</button><button type="submit" disabled={status==="sending"} className="buyer-terminal-submit">{status==="sending"?"Saving buyer profile…":"Save Requirements & Find Matches →"}</button></div>{feedback&&<p role="status" className={status==="error"?"buyer-terminal-feedback-error":"buyer-terminal-feedback"}>{feedback}{status==="sent"&&matches!==null?` Current published matches: ${matches}.`:""}</p>}<p className="buyer-terminal-notice">Independent FLLM Market View: this is not a broker-authorized business listing. Matching indicates market relevance, not seller authorization, SBA approval, verified financing terms or guaranteed access to a specific business.</p></div>}
  </form>
 </section>;
}
