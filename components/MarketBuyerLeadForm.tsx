"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const businessTypes = [
  "Restaurant",
  "Restaurant / Bar",
  "Bar",
  "Cocktail Lounge",
  "Nightclub",
  "Gentlemen's Club",
  "Liquor Store",
  "Convenience Store",
  "Marina",
  "Hotel / Motel",
  "Country Club",
  "Bowling Alley",
  "Other Hospitality",
] as const;

const licenseTypes = [
  "4COP Quota",
  "3PS Quota / Package Store",
  "4COP SFS/SRX",
  "2COP Beer & Wine",
] as const;

const financingOptions = ["Any", "Cash", "SBA", "Seller Financing", "Other"] as const;

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)})${digits.slice(3)}`;
  return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function moneyDisplay(value: string) { const digits = value.replace(/[^0-9]/g, ""); return digits ? "$" + Number(digits).toLocaleString("en-US") : ""; }

function cleanMoney(value: string) {
  return value.replace(/[^0-9,]/g, "");
}

type Props = {
  listingReference: string;
  listingTitle: string;
  county: string;
  businessType: string;
  licenseType: string;
  askingPrice: string;
  listingUrl: string;
  horizontalMarketView?: boolean;
};

export default function MarketBuyerLeadForm({
  listingReference,
  listingTitle,
  county,
  businessType,
  licenseType,
  askingPrice,
  listingUrl,
  horizontalMarketView = false,
}: Props) {
  const initialBusinessType = businessTypes.includes(businessType as (typeof businessTypes)[number])
    ? businessType
    : "Other Hospitality";
  const initialLicenseType = licenseTypes.includes(licenseType as (typeof licenseTypes)[number])
    ? licenseType
    : "4COP Quota";

  const [open, setOpen] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<SubmitState>("idle");
  const [inquiryError, setInquiryError] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [currentMatches, setCurrentMatches] = useState(0);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([initialBusinessType]);
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<string[]>([initialLicenseType]);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([county]);
  const [countyToAdd, setCountyToAdd] = useState("");
  const [selectedFinancing, setSelectedFinancing] = useState<string[]>(["Any"]);
  const [maxPurchasePrice, setMaxPurchasePrice] = useState("");
  const [minGrossRevenue, setMinGrossRevenue] = useState("");
  const [minSde, setMinSde] = useState("");
  const [minEbitda, setMinEbitda] = useState("");
  const [consent, setConsent] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [extraCriteria, setExtraCriteria] = useState<string[]>([]);
  const [realEstate, setRealEstate] = useState("Either");
  const [leaseYears, setLeaseYears] = useState("Any");
  const [monthlyRent, setMonthlyRent] = useState("Any");
  const [availableCash, setAvailableCash] = useState("250000");
  const [financialTab, setFinancialTab] = useState("Asking Price");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState<{total:number;results:{reference:string;county:string;businessType:string;licenseType:string;price:string;href:string;source:string}[]} | null>(null);

  const availableCounties = useMemo(
    () => counties.filter((item) => !selectedCounties.includes(item)),
    [selectedCounties],
  );

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function toggleValue(value: string, values: string[], setValues: (next: string[]) => void) {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function toggleFinancing(value: string) {
    if (value === "Any") {
      setSelectedFinancing(["Any"]);
      return;
    }
    setSelectedFinancing((current) => {
      const withoutAny = current.filter((item) => item !== "Any");
      const next = withoutAny.includes(value)
        ? withoutAny.filter((item) => item !== value)
        : [...withoutAny, value];
      return next.length ? next : ["Any"];
    });
  }

  function addCounty() {
    if (!countyToAdd || selectedCounties.includes(countyToAdd)) return;
    setSelectedCounties((current) => [...current, countyToAdd]);
    setCountyToAdd("");
  }

  function toggleAllCounties() {
    setSelectedCounties((current) => current.length === counties.length ? [county] : [...counties]);
    setCountyToAdd("");
  }

  async function findMatches() {
    setSearching(true); setSearchError(""); setSearchResults(null); setAdvancedOpen(false);
    try {
      const response = await fetch("/api/market-buyer-search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({businessTypes:selectedBusinessTypes,licenseTypes:selectedLicenseTypes,counties:selectedCounties,maxPurchasePrice,minGrossRevenue,minSde,minEbitda,financingPreferences:selectedFinancing})});
      const data = await response.json();
      if(!response.ok) throw new Error(data.error||"Search unavailable.");
      setSearchResults(data);
    } catch(e) {setSearchError(e instanceof Error?e.message:"Search unavailable.");}
    finally {setSearching(false);}
  }

  async function submitSpecificInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquiryStatus("submitting");
    setInquiryError("");
    try {
      const form = new FormData(event.currentTarget);
      form.set("inquiry_type", "Business Market Opportunity Inquiry");
      form.set("listing_reference", listingReference);
      form.set("listing_requested", listingTitle);
      form.set("listing_county", county);
      form.set("preferred_county", county);
      form.set("license_type", licenseType);
      form.set("asking_price", askingPrice);
      form.set("listing_url", listingUrl);
      form.set("listing_status", "Independent FLLM Market View — no broker representation");
      const response = await fetch("/api/inquiry", { method: "POST", body: form });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to submit inquiry.");
      }
      setInquiryStatus("sent");
    } catch (error) {
      setInquiryError(error instanceof Error ? error.message : "Unable to submit inquiry.");
      setInquiryStatus("error");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    if (!selectedBusinessTypes.length) {
      setError("Select at least one business type.");
      setStatus("error");
      return;
    }
    if (!selectedLicenseTypes.length) {
      setError("Select at least one liquor-license type.");
      setStatus("error");
      return;
    }
    if (!selectedCounties.length) {
      setError("Select at least one Florida county.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/business-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(formData.get("first_name") || "").trim(),
          lastName: String(formData.get("last_name") || "").trim(),
          email,
          phone,
          businessTypes: selectedBusinessTypes,
          licenseTypes: selectedLicenseTypes,
          counties: selectedCounties,
          maxPurchasePrice,
          minGrossRevenue,
          minSde,
          minEbitda,
          financingPreferences: selectedFinancing,
          notes: [String(formData.get("buyer_notes") || "").trim(), `Real estate: ${realEstate}; Lease years: ${leaseYears}; Max rent: ${monthlyRent}; Available cash: ${availableCash}; Other: ${extraCriteria.join(", ")}`].filter(Boolean).join(" | "),
          consent,
          sourceMarketViewRef: listingReference,
          sourceMarketViewUrl: listingUrl,
        }),
      });

      const payload = (await response.json()) as { error?: string; currentMatches?: number };
      if (!response.ok) throw new Error(payload.error || "Unable to create buyer alert.");

      setSubmittedEmail(email);
      setCurrentMatches(payload.currentMatches ?? 0);
      setStatus("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to create buyer alert.");
      setStatus("error");
    }
  }

  return (
    <>
      {horizontalMarketView ? (
        <section id="specific-market-inquiry" className="fllm-capture" aria-labelledby="fllm-capture-title">
          <div className="fllm-capture-kicker">FLORIDA LIQUOR LICENSE MARKET</div>
          <h2 id="fllm-capture-title">REQUEST INFORMATION ABOUT THIS OPPORTUNITY</h2>
          <p className="fllm-capture-description">Tell us what you’re looking for and we’ll help match you with relevant<br className="fllm-capture-wide" /> Florida business and liquor-license opportunities.</p>
          <div className="fllm-capture-feature fllm-capture-feature--lt"><span className="fllm-capture-feature-icon">▤</span><strong>EXPERT GUIDANCE</strong><span>Get matched with<br/>relevant opportunities</span></div>
          <div className="fllm-capture-feature fllm-capture-feature--lb"><span className="fllm-capture-feature-icon">◎</span><strong>SAVE TIME</strong><span>Let us find the best<br/>matches for you</span></div>
          <div className="fllm-capture-feature fllm-capture-feature--rt"><span className="fllm-capture-feature-icon">♧</span><strong>RELEVANT MATCHES</strong><span>Opportunities based<br/>on your criteria</span></div>
          <div className="fllm-capture-feature fllm-capture-feature--rb"><span className="fllm-capture-feature-icon">▥</span><strong>CONFIDENTIAL<br/>&amp; SECURE</strong><span>Your information<br/>stays private</span></div>
          {inquiryStatus === "sent" ? <div className="fllm-capture-success" role="status">Thank you. FLLM received your inquiry and will follow up about relevant market information.</div> : (
            <form className="fllm-capture-form" onSubmit={submitSpecificInquiry}>
              <div className="fllm-capture-row">
                <label>Name<input name="name" placeholder="♟   Your full name" autoComplete="name" maxLength={160} required /></label>
                <label>Email<input name="email" type="email" placeholder="✉   you@example.com" autoComplete="email" maxLength={254} required /></label>
                <label>Phone<input name="phone" type="tel" placeholder="☎   (555) 123-4567" autoComplete="tel" maxLength={60}/></label>
              </div>
              <label className="fllm-capture-county">County<select name="county" defaultValue={county}>{counties.map((item)=><option key={item} value={item}>{item}</option>)}</select></label>
              <label className="fllm-capture-message">Message<textarea name="message" rows={4} maxLength={5000} placeholder="Tell us about what you’re looking for..." required /></label>
              <button className="fllm-capture-submit" type="submit" disabled={inquiryStatus==="submitting"}>➤ &nbsp; {inquiryStatus==="submitting"?"Sending inquiry…":"Submit Buyer Inquiry"} &nbsp; →</button>
              {inquiryStatus==="error"&&<p className="fllm-capture-error" role="alert">{inquiryError}</p>}
            </form>
          )}
          <div className="fllm-capture-or"><span>OR</span></div>
          <button className="fllm-capture-advanced" type="button" onClick={()=>{setStatus("idle");setError("");setOpen(true);}}>⌕ &nbsp; Advanced Search Options</button>
          <p className="fllm-capture-advanced-note">Open the full Buyer Match Dashboard for more filters and options.</p>
          <div className="fllm-capture-preview" aria-hidden="true"><strong>Buyer Match Dashboard</strong><div className="fllm-capture-preview-body"><span>▥<br/>☑<br/>☑<br/>☑</span><span>━━━━━━<br/>━━━━<br/>━━━━━━<br/>━━━━</span><span>FL</span></div></div>
          <div className="fllm-capture-preview-callout">More filters<br/>More opportunities<br/>Same powerful data</div>
          <div className="fllm-capture-foot"><span>◆ &nbsp; Independent Market View</span><span>✓ &nbsp; No Broker-Authorized Listing Required</span><span>♟ &nbsp; Real Opportunities. Real Businesses.</span></div>
        </section>
      ) : (
      <section id="specific-market-inquiry" className="business-market-specific-inquiry" aria-labelledby="business-market-inquiry-title">
        <span className="business-market-form-eyebrow">{horizontalMarketView ? "FLLM Buyer Inquiry" : "Specific Business + License Inquiry"}</span>
        <h2 id="business-market-inquiry-title">{horizontalMarketView ? "Request Information About This Market Opportunity" : "Interested in This Business + Liquor License?"}</h2>
        <p>{horizontalMarketView ? `Interested in ${county} ${businessType.toLowerCase()} opportunities with ${licenseType} licenses? Ask FLLM about independent license-market information and relevant buyer opportunities.` : `Ask FLLM about this observed ${businessType.toLowerCase()} and ${licenseType} opportunity in ${county}. Your inquiry will be linked to this Market View.`}</p>
        <div className="business-market-specific-inquiry-context">
          <span>{county}</span><span>{licenseType}</span>{!horizontalMarketView && <span>{askingPrice}</span>}
        </div>
        {inquiryStatus === "sent" ? (
          <div role="status" className="business-market-specific-inquiry-result">Thank you. FLLM received your inquiry and will follow up regarding available market information and next steps.</div>
        ) : (
          <form onSubmit={submitSpecificInquiry} className={`business-market-specific-inquiry-form${horizontalMarketView ? " business-market-specific-inquiry-form--horizontal" : ""}`}>
            <div className="business-market-inquiry-field">
              <label htmlFor="market-contact-name">Your name</label>
              <input id="market-contact-name" name="name" required maxLength={160} autoComplete="name" placeholder="Full name" />
            </div>
            <div className="business-market-inquiry-field">
              <label htmlFor="market-contact-email">Email address</label>
              <input id="market-contact-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" />
            </div>
            <div className="business-market-inquiry-field">
              <label htmlFor="market-contact-phone">Phone (optional)</label>
              <input id="market-contact-phone" name="phone" type="tel" maxLength={60} autoComplete="tel" placeholder="(555) 555-5555" />
            </div>
            <div className="business-market-inquiry-field business-market-inquiry-field--message">
              <label htmlFor="market-contact-message">What would you like to know?</label>
              <textarea id="market-contact-message" name="message" required maxLength={5000} rows={3} defaultValue={horizontalMarketView ? `I'm interested in ${businessType.toLowerCase()} and ${licenseType} opportunities in ${county}. Please contact me about available market information and possible next steps.` : `I'm interested in the ${businessType} with a ${licenseType} license in ${county}. Please contact me about this Market View and any available next steps.`} />
            </div>
            <button type="submit" disabled={inquiryStatus === "submitting"}>{inquiryStatus === "submitting" ? "Sending inquiry…" : horizontalMarketView ? "Request Information →" : "Request Info About This Opportunity →"}</button>
            {inquiryStatus === "error" && <p className="business-market-specific-inquiry-error" role="alert">{inquiryError}</p>}
          </form>
        )}
        <small>FLLM provides independent market information and buyer matching. This is not an authorized seller or broker listing; FLLM cannot guarantee that the business is available or arrange contact with its seller.</small>
      </section>
      )}
      {!horizontalMarketView && <section className="business-market-alert-card" aria-labelledby="buyer-alert-title">
        <span className="business-market-form-eyebrow">FLLM Buyer Alerts</span>
        <h2 id="buyer-alert-title">Get New Opportunities Like This</h2>
        <p>
          Save your acquisition criteria and receive email alerts for matching FLLM Market Views
          and authorized Featured Broker Listings.
        </p>
        <div className="business-market-alert-summary">
          <div><span>Business</span><strong>{businessType}</strong></div>
          <div><span>License</span><strong>{licenseType}</strong></div>
          <div><span>County</span><strong>{county}</strong></div>
        </div>
        <button type="button" onClick={() => { setStatus("idle"); setError(""); setOpen(true); }}>
          Create Buyer Alert
        </button>
        <small>
          Customize business type, license type, counties, purchase price, gross sales,
          SDE / cash flow, EBITDA and financing preference.
        </small>
      </section>}

      {open ? (
        <div className="business-market-alert-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setOpen(false);
        }}>
          <div className="business-market-alert-modal" role="dialog" aria-modal="true" aria-labelledby="buyer-alert-modal-title">
            <button className="business-market-alert-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close buyer alert form">×</button>

            {status === "sent" ? (
              <div className="business-market-alert-modal-success" role="status">
                <span className="business-market-form-eyebrow">Buyer Alert Active</span>
                <h2 id="buyer-alert-modal-title">Your Business + Liquor License Buyer Alert is active.</h2>
                <p>
                  Confirmation was emailed to <strong>{submittedEmail}</strong>.
                  {currentMatches > 0
                    ? ` FLLM found ${currentMatches} current published match${currentMatches === 1 ? "" : "es"} under your saved criteria.`
                    : " FLLM will email you when a new published opportunity matches your criteria."}
                </p>
                <div className="business-market-alert-modal-success-actions">
                  <button type="button" onClick={() => setOpen(false)}>Close</button>
                  <button type="button" className="secondary" onClick={() => setStatus("idle")}>Create Another Alert</button>
                </div>
              </div>
            ) : (
              <form className="fllm-match" onSubmit={submit}>
                <header className="fllm-match-top">
                  <div className="fllm-match-title"><b>FLLM BUYER MATCH DASHBOARD</b><h2 id="buyer-alert-modal-title">Request Market Match Criteria</h2><p>Set your requirements and get matched with relevant Florida business and liquor-license opportunities based on our independent market data.<br/>This is an Independent Market View. FLLM provides market information and buyer matching, not a broker-authorized listing.</p></div>
                  <div className="fllm-match-right"><div className="fllm-match-metrics"><div className="green"><strong>—</strong><span>Active Listings<br/>Data pending</span></div><div className="blue"><strong>—</strong><span>New This Month<br/>Data pending</span></div><div className="red"><strong>—</strong><span>Price Reductions<br/>Data pending</span></div><div className="blue"><strong>🔔</strong><span>Buyer Alerts<br/>Available</span></div></div><div className="fllm-match-actions"><button type="button" onClick={()=>setAdvancedOpen(true)}>▣ &nbsp; Save Search</button><button type="button" onClick={()=>{setSelectedBusinessTypes([initialBusinessType]);setSelectedLicenseTypes([initialLicenseType]);setSelectedCounties([county]);setMaxPurchasePrice("");setMinGrossRevenue("");setMinSde("");setMinEbitda("");setExtraCriteria([]);setSelectedFinancing(["Any"]);setRealEstate("Either");}}>⟳ &nbsp; Reset</button><button type="button" className="gold" onClick={findMatches} disabled={searching}>{searching?"Searching Listings…":"Find Matching Opportunities →"}</button></div></div>
                </header>
                <div className="fllm-match-columns">
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">📍</span><div><h3>1. BUSINESS &amp; LOCATION</h3><p>Select business type(s) and target location(s)</p></div></header>
                    <div className="fllm-match-body"><h4>Business categories <small>(select one or more)</small></h4><div className="fllm-match-checks two">{["Bar","Cocktail Lounge","Restaurant","Gentlemen's Club","Nightclub","Marina","Liquor Store","Hotel / Motel","Convenience Store","Other Hospitality"].map(item=><label key={item}><input type="checkbox" checked={selectedBusinessTypes.includes(item)} onChange={()=>toggleValue(item,selectedBusinessTypes,setSelectedBusinessTypes)}/>{item==="Bar"?"Bar / Tavern":item}</label>)}</div>
                      <div className="fllm-match-line"/><h4>Target counties <small>(select one or more)</small></h4>
                      <div className="fllm-match-selected">{selectedCounties.map(item=><button type="button" key={item} onClick={()=>setSelectedCounties(selectedCounties.filter(v=>v!==item))}>{item} ×</button>)}<select aria-label="Select county to add" value={countyToAdd} onChange={e=>setCountyToAdd(e.target.value)}><option value="">⌄</option>{availableCounties.map(c=><option key={c}>{c}</option>)}</select></div><button type="button" className="fllm-match-add" onClick={addCounty}>＋ Add a county</button>
                    </div>
                  </section>
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">🍸</span><div><h3>2. LIQUOR LICENSE TYPE</h3><p>Select license type(s)</p></div></header>
                    <div className="fllm-match-body"><h4>License classes <small>(select one or more)</small></h4><div className="fllm-match-checks">{[["4COP Quota","4COP Quota"],["3PS Quota / Package Store","3PS Quota / Package Store"],["4COP SFS/SRX","4COP SFS/SRX"],["2COP Beer & Wine","2COP Beer & Wine"]].map(([id,label])=><label key={id}><input type="checkbox" checked={selectedLicenseTypes.includes(id)} onChange={()=>toggleValue(id,selectedLicenseTypes,setSelectedLicenseTypes)}/>{label}</label>)}</div><div className="fllm-match-line"/><h4>License Ownership Preference</h4><div className="fllm-match-checks">{["Transferable license required","License with business package","Standalone license only","Either"].map(item=><label key={item}><input type="checkbox" checked={extraCriteria.includes(item)} onChange={()=>toggleValue(item,extraCriteria,setExtraCriteria)}/>{item}</label>)}</div><div className="fllm-match-line"/><p className="fllm-match-note">Quota licenses may have independently estimated asset values. SFS/SRX and 2COP are location-specific and have no separate quota-license valuation.</p></div>
                  </section>
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">📊</span><div><h3>3. FINANCIAL REQUIREMENTS</h3><p>Set your target financial criteria</p></div></header>
                    <div className="fllm-match-body financial"><div className="fllm-match-tabs">{["Asking Price","Revenue","SDE / Cash Flow","EBITDA"].map(t=><button type="button" className={financialTab===t?"active":""} onClick={()=>setFinancialTab(t)} key={t}>{t}</button>)}</div>{[
                      {label:"Maximum purchase price ($)",value:maxPurchasePrice,set:setMaxPurchasePrice,max:5000000,defaultVal:"1000000"},
                      {label:"Minimum gross annual revenue ($)",value:minGrossRevenue,set:setMinGrossRevenue,max:10000000,defaultVal:"500000"},
                      {label:"Minimum SDE / cash flow ($)",value:minSde,set:setMinSde,max:5000000,defaultVal:"250000"},
                      {label:"Minimum EBITDA ($)",value:minEbitda,set:setMinEbitda,max:5000000,defaultVal:"250000"},
                      {label:"Available cash / down payment ($)",value:availableCash,set:setAvailableCash,max:2000000,defaultVal:"250000"}
                    ].map(item=><div className="fllm-match-range" key={item.label}><label>{item.label}</label><div className="fllm-match-slider-row"><div><input type="range" min="0" max={item.max} step="25000" value={Number((item.value === "" ? item.defaultVal : item.value).replace(/,/g,""))||0} onChange={e=>item.set(e.target.value)}/><div className="fllm-match-endpoints"><span>$0</span><span>${item.max.toLocaleString()}</span></div></div><input aria-label={item.label} inputMode="numeric" value={moneyDisplay(item.value)} placeholder={"$"+Number(item.defaultVal).toLocaleString("en-US")} onChange={e=>item.set(e.target.value.replace(/[^0-9]/g,""))}/></div></div>)}</div>
                  </section>
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">📄</span><div><h3>4. DEAL STRUCTURE &amp; OTHER</h3><p>Select your preferred structure and other criteria</p></div></header>
                    <div className="fllm-match-body"><div className="fllm-match-split"><div><h4>Financing preferences <small>(select one or more)</small></h4><div className="fllm-match-checks">{["SBA 7(a) Eligible","Seller Financing","Cash Purchase","Conventional Financing","Alternative Financing"].map(item=><label key={item}><input type="checkbox" checked={selectedFinancing.includes(item)} onChange={()=>toggleFinancing(item)}/>{item}</label>)}</div></div><div><h4>Real estate preference</h4><div className="fllm-match-checks">{["Either","Real estate included","Real estate available separately","Lease only"].map(item=><label key={item}><input type="radio" name="real_estate" checked={realEstate===item} onChange={()=>setRealEstate(item)}/>{item}</label>)}</div></div></div><div className="fllm-match-line"/><div className="fllm-match-split"><div><h4>Lease requirements</h4><label className="fllm-match-select-label">Minimum years remaining<select value={leaseYears} onChange={e=>setLeaseYears(e.target.value)}>{["Any","1","2","3","5","10+"].map(x=><option key={x}>{x}</option>)}</select></label><label className="fllm-match-select-label">Maximum monthly rent<select value={monthlyRent} onChange={e=>setMonthlyRent(e.target.value)}>{["Any","$2,500","$5,000","$10,000","$20,000","$50,000+"].map(x=><option key={x}>{x}</option>)}</select></label></div><div><h4>Other preferences</h4><div className="fllm-match-checks">{["Waterfront / Beachfront","Absentee owner preferred","Turnkey operation","Established business only","Franchise","Outdoor seating"].map(item=><label key={item}><input type="checkbox" checked={extraCriteria.includes(item)} onChange={()=>toggleValue(item,extraCriteria,setExtraCriteria)}/>{item}</label>)}</div></div></div></div>
                  </section>
                </div>
                <div className="fllm-match-bottom"><div><b>◎ &nbsp; GET MATCHED WITH OPPORTUNITIES</b><p>Our team will match your criteria with relevant Florida businesses and liquor-license opportunities<br/> from our independent market data and notify you of new matches.</p></div><button type="button" className="gold" onClick={findMatches} disabled={searching}>{searching?"Searching Listings…":"Find Matching Opportunities →"}</button><div className="fllm-match-benefits"><span>⌕<small>Independent<br/>Market View</small></span><span>⬟<small>Confidential<br/>&amp; Secure</small></span><span>♟<small>Get Notified<br/>of New Matches</small></span><span>▥<small>Data-Driven<br/>Insights</small></span></div></div>
                {searchError&&<p className="fllm-match-search-error" role="alert">{searchError}</p>}
                {searchResults&&<section className="fllm-match-results" aria-live="polite"><div className="fllm-match-results-header"><h3>{searchResults.total} Matching Opportunities</h3><button type="button" onClick={()=>setSearchResults(null)}>Close Results ×</button></div>{searchResults.total===0?<p>No current published records meet all selected criteria. Try broadening a county, license type or financial threshold.</p>:<div className="fllm-match-result-grid">{searchResults.results.map(item=><a key={item.reference} href={item.href}><b>{item.businessType} · {item.licenseType}</b><span>{item.county} · {item.price}</span><small>{item.source} · {item.reference} ↗</small></a>)}</div>}{searchResults.total>searchResults.results.length&&<p>Showing the first {searchResults.results.length} matching records.</p>}<button type="button" className="fllm-match-save-results" onClick={()=>setAdvancedOpen(true)}>Save Search and Receive Buyer Alerts →</button></section>}
                <p className="fllm-match-disclaimer">Independent Market View. FLLM provides independent market information and buyer matching. This is not an authorized seller or broker listing.</p>
                {advancedOpen&&<div className="fllm-match-contact"><h3>Save Your Buyer Match Criteria</h3><p>Provide your contact details to receive matching opportunities and alerts.</p><div className="fllm-match-contact-grid"><label>Full Name<input value={buyerName} onChange={e=>setBuyerName(e.target.value)} required placeholder="Full name"/></label><label>Email<input type="email" value={buyerEmail} onChange={e=>setBuyerEmail(e.target.value)} required placeholder="Email address"/></label><label>Phone<input type="tel" value={phone} onChange={e=>setPhone(formatPhoneNumber(e.target.value))} required placeholder="Phone number"/></label></div><input type="hidden" name="first_name" value={buyerName.trim().split(/\s+/)[0]||""}/><input type="hidden" name="last_name" value={buyerName.trim().split(/\s+/).slice(1).join(" ")||"-"}/><input type="hidden" name="email" value={buyerEmail}/><label className="fllm-match-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/> I agree to receive matching opportunity emails. I can unsubscribe at any time.</label><textarea name="buyer_notes" placeholder="Any other preferences (optional)" rows={2}/>{error&&<p role="alert">{error}</p>}<div className="fllm-match-contact-buttons"><button type="button" onClick={()=>setAdvancedOpen(false)}>Back to Criteria</button><button className="gold" type="submit" disabled={status==="submitting"}>{status==="submitting"?"Saving…":"Save Search & Activate Buyer Alerts →"}</button></div></div>}
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
