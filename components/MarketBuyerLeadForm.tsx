"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "saved" | "error";

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
  dashboardOnly?: boolean;
};

function LeaseHoverSelect({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(v:string)=>void}) {
  const [expanded,setExpanded]=useState(false);
  return <div className="fllm-match-select-label fllm-lease-hover-field">
    <span>{label}</span>
    <div className="fllm-lease-hover-picker" onMouseEnter={()=>setExpanded(true)} onMouseLeave={()=>setExpanded(false)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setExpanded(false)}} onKeyDown={e=>{if(e.key==="Escape")setExpanded(false)}}>
      <button type="button" className="fllm-lease-hover-trigger" aria-haspopup="listbox" aria-expanded={expanded} aria-label={label} onFocus={()=>setExpanded(true)} onClick={()=>setExpanded(v=>!v)}>{value}<span aria-hidden="true">⌄</span></button>
      {expanded&&<div className="fllm-lease-hover-options" role="listbox" aria-label={label}>{options.map(option=><button key={option} type="button" role="option" aria-selected={value===option} onClick={()=>{onChange(option);setExpanded(false)}}>{option}</button>)}</div>}
    </div>
  </div>;
}

export default function MarketBuyerLeadForm({
  listingReference,
  listingTitle,
  county,
  businessType,
  licenseType,
  askingPrice,
  listingUrl,
  horizontalMarketView = false,
  dashboardOnly = false,
}: Props) {
  const initialBusinessType = businessTypes.includes(businessType as (typeof businessTypes)[number])
    ? businessType
    : "Other Hospitality";
  const initialLicenseType = licenseTypes.includes(licenseType as (typeof licenseTypes)[number])
    ? licenseType
    : "4COP Quota";

  const [open, setOpen] = useState(dashboardOnly);
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
  const [countyMenuOpen, setCountyMenuOpen] = useState(false);
  const [selectedFinancing, setSelectedFinancing] = useState<string[]>(["Any"]);
  const [maxPurchasePrice, setMaxPurchasePrice] = useState("");
  const [minGrossRevenue, setMinGrossRevenue] = useState("");
  const [minSde, setMinSde] = useState("");
  const [minEbitda, setMinEbitda] = useState("");
  const [consent, setConsent] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const buyerContactRef = useRef<HTMLDivElement | null>(null);
  const buyerNameRef = useRef<HTMLInputElement | null>(null);
  const openBuyerContact = () => { setAdvancedOpen(true); };
  useEffect(() => {
    if (!open || !advancedOpen || status === "sent") return;
    const panel = buyerContactRef.current;
    if (!panel) return;
    const scrollHost = panel.closest(".business-market-alert-modal");
    if (scrollHost) {
      scrollHost.scrollTo({top: panel.getBoundingClientRect().top - scrollHost.getBoundingClientRect().top + scrollHost.scrollTop - 18, behavior:"smooth"});
    } else panel.scrollIntoView({behavior:"smooth",block:"start"});
    buyerNameRef.current?.focus({preventScroll:true});
  }, [open, advancedOpen, status]);

  const [extraCriteria, setExtraCriteria] = useState<string[]>([]);
  const [realEstate, setRealEstate] = useState("Either");
  const [franchise, setFranchise] = useState<"Either"|"Yes"|"No">("Either");
  const [leaseYears, setLeaseYears] = useState("Any");
  const [monthlyRent, setMonthlyRent] = useState("Any");
  const [availableCash, setAvailableCash] = useState("");
  const [financialTab, setFinancialTab] = useState("Asking Price");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [inventoryCount, setInventoryCount] = useState<number | null>(null);
  const [potentialCount, setPotentialCount] = useState(0);
  const [liveCountLoading, setLiveCountLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [resultSort, setResultSort] = useState<"businessType"|"licenseType"|"county"|"price"|"estimatedLicenseValue"|"grossRevenue"|"sdeCashFlow"|"ebitda">("county");
  const [resultSortDescending, setResultSortDescending] = useState(false);
  const searchSequence = useRef(0);
  const searchController = useRef<AbortController | null>(null);
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState<{total:number;potentialCount?:number;inventoryMode?:"standalone";diagnostics?:{leaseCriteriaUnverified?:number;eligibleBeforeEarnings:number;missingRevenue?:number;missingEarnings:number;belowRevenueMinimum?:number;belowEarningsMinimum:number};sbaModel?:{prime:number;primeAsOf:string;rateSourceStatus:"current"|"stale"|"fallback";rateBasis:string;source:string;rateSensitivityPlusMinus:number;maximumVariableRateOver350k:number};results:{reference:string;county:string;businessType:string;licenseType:string;price:string;href:string;source:string;matchStatus?:string;financialNote?:string;grossRevenue?:number|null;sdeCashFlow?:number|null;ebitda?:number|null;estimatedLicenseValue?:number|null;licenseValueBasis?:string;sbaStatus?:string;sbaModeledDscr?:number|null;sbaEarningsBasis?:string|null;sbaNote?:string|null;sbaModeledInterestRate?:number|null;franchiseStatus?:"Yes"|"No"|"Unknown";cashMatchStatus?:string;estimatedBuyerLiquidityRequired?:number|null;businessAttributeStatus?:string}[]} | null>(null);

  // Hero pill toggles and dashboard checkboxes use the same React filter state.
  useEffect(() => {
    if (!dashboardOnly) return;
    const onToggle = (event: Event) => {
      const detail = (event as CustomEvent<{ kind?: string; value?: string }>).detail;
      if (!detail || typeof detail.value !== "string") return;
      const toggle = (current: string[]) => current.includes(detail.value!)
        ? current.filter(item => item !== detail.value)
        : [...current, detail.value!];
      if (detail.kind === "business") setSelectedBusinessTypes(toggle);
      else if (detail.kind === "license") setSelectedLicenseTypes(toggle);
      else return;
      searchSequence.current += 1;
      searchController.current?.abort();
      setSearching(false);
      setSearchResults(null);
      setSearchError("");
    };
    window.addEventListener("fllm:buyer-filter-toggle", onToggle);
    return () => window.removeEventListener("fllm:buyer-filter-toggle", onToggle);
  }, [dashboardOnly]);

  useEffect(() => {
    if (!dashboardOnly) return;
    window.dispatchEvent(new CustomEvent("fllm:buyer-filter-state", {
      detail: { businessTypes: selectedBusinessTypes, licenseTypes: selectedLicenseTypes }
    }));
  }, [dashboardOnly, selectedBusinessTypes, selectedLicenseTypes]);

  const formatResultMoney = (value?: number|null) => typeof value==="number"&&Number.isFinite(value) ? "$"+value.toLocaleString("en-US",{maximumFractionDigits:0}) : "—";
  const sortedResults = useMemo(() => [...(searchResults?.results ?? [])].sort((a,b) => {
    const priceNumber = (value: string) => Number(value.replace(/[^\d.]/g, "")) || 0;
    const comparison = (a.matchStatus==="verified"?0:1)-(b.matchStatus==="verified"?0:1);
    if (comparison !== 0) return comparison;
    const financialSort = resultSort==="estimatedLicenseValue" || resultSort==="grossRevenue" || resultSort==="sdeCashFlow" || resultSort==="ebitda";
    if (financialSort) {
      const key = resultSort as "estimatedLicenseValue"|"grossRevenue"|"sdeCashFlow"|"ebitda";
      const av=a[key], bv=b[key];
      const aMissing=typeof av!=="number" || !Number.isFinite(av);
      const bMissing=typeof bv!=="number" || !Number.isFinite(bv);
      if(aMissing!==bMissing) return aMissing?1:-1;
      if(aMissing&&bMissing) return a.county.localeCompare(b.county);
      const difference=(av as number)-(bv as number);
      return resultSortDescending ? -difference : difference;
    }
    const secondary = resultSort === "price" ? priceNumber(a.price)-priceNumber(b.price) : a[resultSort].localeCompare(b[resultSort]);
    return resultSortDescending ? -secondary : secondary;
  }), [searchResults, resultSort, resultSortDescending]);
  const sortResults = (field: "businessType"|"licenseType"|"county"|"price"|"estimatedLicenseValue"|"grossRevenue"|"sdeCashFlow"|"ebitda") => {
    if (resultSort === field) setResultSortDescending(previous => !previous);
    else { setResultSort(field); setResultSortDescending(false); }
  };
  const availableCounties = useMemo(
    () => counties.filter((item) => !selectedCounties.includes(item)),
    [selectedCounties],
  );

  // A search result snapshot must never outlive changes to its search criteria.
  useEffect(() => {
    searchSequence.current += 1;
    searchController.current?.abort();
    setSearching(false);
    setSearchResults(null);
    setSearchError("");
  }, [selectedBusinessTypes, selectedLicenseTypes, selectedCounties, maxPurchasePrice, minGrossRevenue, minSde, minEbitda, selectedFinancing, realEstate, leaseYears, monthlyRent, availableCash, extraCriteria, franchise]);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLiveCountLoading(true);
    fetch("/api/market-buyer-search", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        businessTypes: selectedBusinessTypes, licenseTypes: selectedLicenseTypes,
        counties: selectedCounties, maxPurchasePrice, minGrossRevenue,
        minSde, minEbitda, financingPreferences: selectedFinancing, realEstate, leaseYears, monthlyRent, availableCash, extraCriteria, franchise
      })
    }).then(async response => {
      if (!response.ok) throw new Error("Matching inventory unavailable");
      return response.json();
    }).then(data => {
      if (!controller.signal.aborted) setInventoryCount(typeof data.total === "number" ? data.total : null);
      if (!controller.signal.aborted) setPotentialCount(typeof data.potentialCount === "number" ? data.potentialCount : 0);
    }).catch(() => {
      if (!controller.signal.aborted) setInventoryCount(null);
    }).finally(() => {
      if (!controller.signal.aborted) setLiveCountLoading(false);
    });
    return () => controller.abort();
  }, [open, selectedBusinessTypes, selectedLicenseTypes, selectedCounties, maxPurchasePrice, minGrossRevenue, minSde, minEbitda, selectedFinancing, realEstate, leaseYears, monthlyRent,availableCash,extraCriteria,franchise]);

  useEffect(() => {
    if (!open || dashboardOnly) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open, dashboardOnly]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !dashboardOnly) setOpen(false);
    }
    if (open && !dashboardOnly) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, dashboardOnly]);

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
    if (countyToAdd === "__ALL__") { setSelectedCounties([...counties]); setCountyToAdd(""); return; }
    if (!countyToAdd || selectedCounties.includes(countyToAdd)) return;
    setSelectedCounties((current) => [...current, countyToAdd]);
    setCountyToAdd("");
  }

  function toggleAllCounties() {
    setSelectedCounties((current) => current.length === counties.length ? [county] : [...counties]);
    setCountyToAdd("");
  }

  async function findMatches() {
    if ((!selectedBusinessTypes.length && !extraCriteria.includes("Standalone license only")) || !selectedLicenseTypes.length || !selectedCounties.length) {
      setSearchError("Select at least one license class and county (and a business category for operating-business searches).");
      setSearchResults(null);
      return;
    }
    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;
    const sequence = ++searchSequence.current;
    setSearching(true); setSearchError(""); setSearchResults(null); setAdvancedOpen(false);
    try {
      const response = await fetch("/api/market-buyer-search",{
        method:"POST",headers:{"Content-Type":"application/json"},signal:controller.signal,
        body:JSON.stringify({businessTypes:selectedBusinessTypes,licenseTypes:selectedLicenseTypes,counties:selectedCounties,maxPurchasePrice,minGrossRevenue,minSde,minEbitda,financingPreferences:selectedFinancing,realEstate,leaseYears,monthlyRent,availableCash,extraCriteria,franchise})
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error||"Search unavailable.");
      if (controller.signal.aborted || sequence !== searchSequence.current) return;
      setSearchResults(data);
      window.requestAnimationFrame(() => {
        if (sequence === searchSequence.current) document.getElementById("fllm-live-search-results")?.scrollIntoView({behavior:"smooth",block:"start"});
      });
    } catch(e) {
      if (!controller.signal.aborted && sequence === searchSequence.current)
        setSearchError(e instanceof Error?e.message:"Search unavailable.");
    } finally {
      if (sequence === searchSequence.current) { setSearching(false); searchController.current = null; }
    }
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
        if (data.leadSaved) {
          setInquiryStatus("saved");
          return;
        }
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
          financingPreferences: selectedFinancing.includes("Any") ? ["Any"] : [...new Set(selectedFinancing.map(v=>v==="SBA 7(a) Eligible"?"SBA":v==="Cash Purchase"?"Cash":v==="Seller Financing"?"Seller Financing":"Other"))],
          realEstate,leaseYears,monthlyRent,availableCash,extraCriteria,franchise,
          notes: [String(formData.get("buyer_notes") || "").trim(), `Franchise: ${franchise}; Real estate: ${realEstate}; Lease years: ${leaseYears}; Max rent: ${monthlyRent}; Available cash: ${availableCash}; Other: ${extraCriteria.join(", ")}`].filter(Boolean).join(" | "),
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
      {!dashboardOnly && (horizontalMarketView ? (
        <section id="specific-market-inquiry" className="fllm-capture" aria-labelledby="fllm-capture-title">
          <div className="fllm-capture-kicker">FLORIDA LIQUOR LICENSE MARKET</div>
          <h2 id="fllm-capture-title">REQUEST INFORMATION ABOUT THIS BUSINESS</h2>
          <p className="fllm-capture-description">Ask FLLM about this {county} {businessType.toLowerCase()} + {licenseType} business (ref. {listingReference}). We provide independent market information and can discuss relevant options; we do not represent the seller or broker.</p>
          <div className="fllm-capture-feature fllm-capture-feature--lt"><span className="fllm-capture-feature-icon">▤</span><strong>EXPERT GUIDANCE</strong><span>Get matched with<br/>relevant businesses</span></div>
          <div className="fllm-capture-feature fllm-capture-feature--lb"><span className="fllm-capture-feature-icon">◎</span><strong>SAVE TIME</strong><span>Let us find the best<br/>matches for you</span></div>
          <div className="fllm-capture-feature fllm-capture-feature--rt"><span className="fllm-capture-feature-icon">♧</span><strong>RELEVANT MATCHES</strong><span>Businesses based<br/>on your criteria</span></div>
          <div className="fllm-capture-feature fllm-capture-feature--rb"><span className="fllm-capture-feature-icon">▥</span><strong>CONFIDENTIAL<br/>&amp; SECURE</strong><span>Your information<br/>stays private</span></div>
          {inquiryStatus === "sent" || inquiryStatus === "saved" ? <div className="fllm-capture-success" role="status">{inquiryStatus === "saved" ? "Your inquiry was saved securely, but email notification is delayed. FLLM can review your saved inquiry." : "Thank you. FLLM received your inquiry and will follow up about relevant market information."}</div> : (
            <form className="fllm-capture-form" onSubmit={submitSpecificInquiry}>
              <div className="fllm-capture-row">
                <label>Name<input name="name" placeholder="♟   Your full name" autoComplete="name" maxLength={160} required /></label>
                <label>Email<input name="email" type="email" placeholder="✉   you@example.com" autoComplete="email" maxLength={254} required /></label>
                <label>Phone<input name="phone" type="tel" placeholder="(xxx)xxx-xxxx" autoComplete="tel" maxLength={60}/></label>
              </div>
              <label className="fllm-capture-county">County<select name="county" defaultValue={county}>{counties.map((item)=><option key={item} value={item}>{item}</option>)}</select></label>
              <label className="fllm-capture-message">Message<textarea name="message" rows={4} maxLength={5000} placeholder={`Inquire about this ${businessType.toLowerCase()} with a ${licenseType} license.`} required /></label>
              <button className="fllm-capture-submit" type="submit" disabled={inquiryStatus==="submitting"}>➤ &nbsp; {inquiryStatus==="submitting"?"Sending inquiry…":"Submit Buyer Inquiry"} &nbsp; →</button>
              {inquiryStatus==="error"&&<p className="fllm-capture-error" role="alert">{inquiryError}</p>}
            </form>
          )}
          <div className="fllm-capture-or"><span>OR</span></div>
          <button className="fllm-capture-advanced" type="button" onClick={()=>{setStatus("idle");setError("");setOpen(true);}}>⌕ &nbsp; Advanced Search Options</button>
          <p className="fllm-capture-advanced-note">Open the full Business Match Dashboard for more filters and options.</p>
          <div className="fllm-capture-preview" aria-hidden="true"><strong>Business Match Dashboard</strong><div className="fllm-capture-preview-body"><span>▥<br/>☑<br/>☑<br/>☑</span><span>━━━━━━<br/>━━━━<br/>━━━━━━<br/>━━━━</span><span>FL</span></div></div>
          <div className="fllm-capture-preview-callout">More filters<br/>More businesses<br/>Same powerful data</div>
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
        {inquiryStatus === "sent" || inquiryStatus === "saved" ? (
          <div role="status" className="business-market-specific-inquiry-result">{inquiryStatus === "saved" ? "Your inquiry was saved securely, but the email notification is delayed. FLLM can review the saved inquiry." : "Thank you. FLLM received your inquiry and will follow up regarding available market information and next steps."}</div>
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
      ))}
      {!dashboardOnly && !horizontalMarketView && <section className="business-market-alert-card" aria-labelledby="buyer-alert-title">
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
        <div className={`business-market-alert-modal-backdrop${dashboardOnly ? " business-market-alert-modal-backdrop--inline" : ""}`} role={dashboardOnly ? undefined : "presentation"} onMouseDown={(event) => {
          if (event.currentTarget === event.target) setOpen(false);
        }}>
          <div className={`business-market-alert-modal${dashboardOnly ? " business-market-alert-modal--inline" : ""}`} role={dashboardOnly ? "region" : "dialog"} aria-modal={dashboardOnly ? undefined : true} aria-labelledby="buyer-alert-modal-title">
            {!dashboardOnly && <button className="business-market-alert-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close buyer alert form">×</button>}

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
                {dashboardOnly ? null : <header className="fllm-match-top"><div className="fllm-match-title"><b>FLLM BUSINESS MATCH DASHBOARD</b><h2 id="buyer-alert-modal-title">Request Business Match Criteria</h2><p>Find Florida businesses for sale with liquor licenses that match your criteria.</p><p className="fllm-match-subline">Independent Market View · Business Matching · Buyer Alerts</p></div>
                  <div className="fllm-match-right"><div className="fllm-match-metrics"><div className="green"><strong>{searchResults === null ? "—" : searchResults.total.toLocaleString()}</strong><span>{searchResults === null ? "Search to see matches" : "Confirmed Business Matches"}</span></div></div><div className="fllm-match-actions"><button type="button" className="fllm-control-button" onClick={openBuyerContact}>♧ &nbsp; Activate Buyer Alerts</button><button type="button" className="fllm-control-button" onClick={()=>{searchSequence.current+=1;searchController.current?.abort();setSearching(false);setSelectedBusinessTypes([]);setSelectedLicenseTypes([]);setSelectedCounties([]);setMaxPurchasePrice("");setMinGrossRevenue("");setMinSde("");setMinEbitda("");setExtraCriteria([]);setFranchise("Either");setSelectedFinancing(["Any"]);setRealEstate("Either");setLeaseYears("Any");setMonthlyRent("Any");setAvailableCash("");setFinancialTab("Asking Price");setCountyToAdd("");setSearchResults(null);setSearchError("");setInventoryCount(null);setPotentialCount(0);setAdvancedOpen(false);setConsent(false);setStatus("idle");setError("");}}>⟳ &nbsp; Reset Filters</button><button type="button" className="gold" onClick={findMatches} disabled={searching}>{searching?"Searching Listings…":"Find Matching Businesses →"}</button></div></div>
                </header>}
                {searchError&&<p className="fllm-match-search-error" role="alert">{searchError}</p>}
                {searchResults&&<section id="fllm-live-search-results" className="fllm-match-results" aria-live="polite"><div className="fllm-match-results-header"><h3><span className="fllm-match-count-confirmed">{searchResults.total}</span> {searchResults.inventoryMode==="standalone"?"Standalone Licenses":"Confirmed"} · <span className="fllm-match-count-potential">{searchResults.potentialCount||0}</span> Potential Businesses</h3><button type="button" onClick={()=>setSearchResults(null)}>Close Results ×</button></div>{searchResults.diagnostics&&<p className="fllm-match-coverage">Search coverage: {searchResults.diagnostics.eligibleBeforeEarnings} listings meet the location, category, license, price and financing filters. {searchResults.diagnostics.leaseCriteriaUnverified||0} lack one or more requested lease terms. {searchResults.diagnostics.missingRevenue||0} lack disclosed revenue; {searchResults.diagnostics.missingEarnings} lack disclosed earnings data; {searchResults.diagnostics.belowEarningsMinimum} have earnings below the selected minimum. {searchResults.inventoryMode==="standalone"?"Standalone licenses have no operating-business revenue, franchise, lease or SBA classification.":"Potential matches may have undisclosed financial, lease, property or business-attribute information and are not verified to satisfy every selected requirement."} SBA cash screening estimates 10% buyer equity, 5% of asking price in transaction costs, and three months of disclosed rent as a working-capital cushion. Actual requirements may be higher.</p>}{searchResults.sbaModel&&<p className="fllm-match-coverage">SBA preliminary screen: {searchResults.sbaModel.rateSourceStatus!=="current"?"Reference rate awaiting refresh or stale; using last verified observation. ":""}Federal Reserve prime {(searchResults.sbaModel.prime*100).toFixed(2)}% as of {searchResults.sbaModel.primeAsOf}; SBA variable-rate ceiling for loans over $350,000 {(searchResults.sbaModel.maximumVariableRateOver350k*100).toFixed(2)}%. Other loan sizes use their applicable SBA caps. Estimated payments use a 10-year term and 10% equity; modeled interest-rate sensitivity is ±1 percentage point. <a href={searchResults.sbaModel.source} target="_blank" rel="noopener noreferrer">Prime-rate source ↗</a>. Not an SBA or lender approval.</p>}{searchResults.results.length===0?<p>No confirmed or potential listings meet the selected location, license, price and available financial criteria. Try broadening the criteria.</p>:<div className="fllm-match-table-scroll" role="region" aria-label="Matching businesses table" tabIndex={0}><table className="fllm-match-table"><thead><tr>{([["businessType","Business Type"],["licenseType","License Type"],["county","County"],["price","Biz + License Price"],["estimatedLicenseValue","FLLM Est. License Value"]] as const).map(([key,label])=><th key={key} scope="col"><button type="button" onClick={()=>sortResults(key)} aria-label={`Sort by ${label}`} aria-sort={undefined}>{label} <span aria-hidden="true">{resultSort===key?(resultSortDescending?"▼":"▲"):"↕"}</span></button></th>)}{([["grossRevenue","Revenue"],["sdeCashFlow","SDE / Cash Flow"],["ebitda","EBITDA"]] as const).map(([key,label])=><th key={key} scope="col"><button type="button" onClick={()=>sortResults(key)} aria-label={`Sort by ${label}`}>{label} <span aria-hidden="true">{resultSort===key?(resultSortDescending?"▼":"▲"):"↕"}</span></button></th>)}<th scope="col">Franchise</th><th scope="col">SBA 7(a)</th><th scope="col">Market View</th></tr></thead><tbody>{sortedResults.map(item=><tr key={item.reference} className={item.matchStatus==="verified"?"fllm-match-confirmed":"fllm-match-potential"} tabIndex={0} role="link" aria-label={`Open ${item.businessType} listing in ${item.county}`} onClick={()=>window.open(item.href,"_blank","noopener,noreferrer")} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();window.open(item.href,"_blank","noopener,noreferrer");}}}><td><span className={`business-market-category-badge business-market-category-badge--${item.businessType.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`}>{item.businessType}</span></td><td><span className={`fllm-match-license-pill${item.licenseType==="4COP Quota"?" fllm-match-license-pill--quota":""}`}>{item.licenseType}</span></td><td>{item.county}</td><td className="fllm-match-price">{item.price}</td><td className="fllm-match-est-license" title={item.licenseValueBasis?.startsWith("statewide")?"FLLM statewide benchmark estimate used because no priced county comparables were available. For 3PS, this reflects the 4COP-based proxy discount. Not a county valuation or formal appraisal.":"FLLM county market-based estimated quota-license component. For 3PS, a 4COP-based proxy may be used where 3PS comparables are unavailable. Not a formal appraisal or separately available license."}>{formatResultMoney(item.estimatedLicenseValue)}</td><td className="fllm-match-financial">{formatResultMoney(item.grossRevenue)}</td><td className="fllm-match-financial">{formatResultMoney(item.sdeCashFlow)}</td><td className="fllm-match-financial">{formatResultMoney(item.ebitda)}</td><td>{item.franchiseStatus||"Unknown"}</td><td title={item.sbaNote||"No SBA financing determination"}>{item.sbaStatus==="advertised"?"SBA eligible — Advertised":item.sbaStatus==="potential"?`Potential SBA Eligible · ${item.sbaModeledDscr?.toFixed(2)}× est. DSCR`:item.sbaStatus==="advertised_not_eligible"?"SBA not eligible — Advertised":"Unverified"}{item.cashMatchStatus==="potential"&&<small style={{display:"block"}}>Indicative liquidity required: {formatResultMoney(item.estimatedBuyerLiquidityRequired)}; lender review required</small>}{item.businessAttributeStatus==="unverified"&&<small style={{display:"block"}}>Selected attributes not verified</small>}{item.sbaStatus==="potential"&&<small style={{display:"block"}}>{item.sbaEarningsBasis}; {typeof item.sbaModeledInterestRate==="number"?(item.sbaModeledInterestRate*100).toFixed(2)+"% modeled rate; ":""}lender review required</small>}</td><td><a className="fllm-match-row-link" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.businessType} in ${item.county}, ${item.reference}`}>View Listing ↗</a>{item.matchStatus==="verified"&&<small className="fllm-match-verified">✓ Disclosed search criteria match</small>}</td></tr>)}</tbody></table></div>}{searchResults.total+(searchResults.potentialCount||0)>searchResults.results.length&&<p>Showing the first {searchResults.results.length} matching records.</p>}<button type="button" className="fllm-match-save-results" onClick={openBuyerContact}>Save Search and Receive Buyer Alerts →</button></section>}
                <div className="fllm-match-columns">
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">📍</span><div><h3>1. BUSINESS &amp; LOCATION</h3><p>Select business types &amp; counties</p></div></header>
                    <div className="fllm-match-body"><h4>Business categories <small>(select one or more)</small></h4><div className="fllm-match-checks two">{["Bar","Cocktail Lounge","Restaurant","Gentlemen's Club","Nightclub","Marina","Liquor Store","Hotel / Motel","Convenience Store","Other Hospitality"].map(item=><label key={item}><input type="checkbox" checked={selectedBusinessTypes.includes(item)} onChange={()=>toggleValue(item,selectedBusinessTypes,setSelectedBusinessTypes)}/>{item==="Bar"?"Bar / Tavern":item}</label>)}</div>
                      <div className="fllm-match-line"/><h4>Franchise</h4><div className="fllm-match-checks fllm-match-franchise-horizontal">{(["Either","Yes","No"] as const).map(choice=><label key={choice}><input type="radio" name="fllm_franchise" checked={franchise===choice} onChange={()=>setFranchise(choice)}/>{choice}</label>)}</div><p className="fllm-match-note fllm-match-franchise-note">Yes = confirmed franchise · No = confirmed independent · Either = includes unknown</p><div className="fllm-match-line"/><h4>Target counties <small>(select one or more)</small></h4>
                      <div className="fllm-match-selected">{selectedCounties.length===counties.length?<button type="button" onClick={()=>setSelectedCounties([county])}>All 67 Florida Counties ×</button>:selectedCounties.map(item=><button type="button" key={item} onClick={()=>setSelectedCounties(selectedCounties.filter(v=>v!==item))}>{item} ×</button>)}<div className="fllm-county-hover-picker" onMouseEnter={()=>setCountyMenuOpen(true)} onMouseLeave={()=>setCountyMenuOpen(false)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setCountyMenuOpen(false);}} onKeyDown={e=>{if(e.key==="Escape")setCountyMenuOpen(false);}}>
<button type="button" className="fllm-county-hover-trigger" aria-label="Choose county" aria-haspopup="listbox" aria-expanded={countyMenuOpen} onClick={()=>setCountyMenuOpen(v=>!v)} onFocus={()=>setCountyMenuOpen(true)}>Choose county… <span aria-hidden="true">⌄</span></button>
{countyMenuOpen&&<div className="fllm-county-hover-options" role="listbox" aria-label="Florida counties"><button type="button" role="option" aria-selected={selectedCounties.length===counties.length} onClick={()=>{setSelectedCounties([...counties]);setCountyToAdd("");setCountyMenuOpen(false);}}>ALL COUNTIES — Statewide (67)</button>{counties.map(c=><button type="button" role="option" aria-selected={selectedCounties.includes(c)} key={c} onClick={()=>{setSelectedCounties(current=>current.length===counties.length?[c]:current.includes(c)?current:[...current,c]);setCountyToAdd("");setCountyMenuOpen(false);}}>{selectedCounties.includes(c)?"✓  ":""}{c}</button>)}</div>}</div></div><div className="fllm-match-county-actions"><button type="button" className="fllm-match-add" onClick={addCounty}>＋ Add a county</button><button type="button" className="fllm-match-add" onClick={toggleAllCounties}>{selectedCounties.length===counties.length?"Select Current County":"Select All 67 Counties"}</button></div>
                    </div>
                  </section>
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">🍸</span><div><h3>2. LIQUOR LICENSE</h3><p>Select license type(s)</p></div></header>
                    <div className="fllm-match-body"><h4>License classes <small>(select one or more)</small></h4><div className="fllm-match-checks">{[["4COP Quota","4COP Quota"],["3PS Quota / Package Store","3PS Quota / Package Store"],["4COP SFS/SRX","4COP SFS/SRX"],["2COP Beer & Wine","2COP Beer & Wine"]].map(([id,label])=><label key={id}><input type="checkbox" checked={selectedLicenseTypes.includes(id)} onChange={()=>toggleValue(id,selectedLicenseTypes,setSelectedLicenseTypes)}/>{label}</label>)}</div><div className="fllm-match-line"/><h4>License Ownership Preference</h4><div className="fllm-match-checks">{["Transferable license required","License with business package","Standalone license only","Either"].map(item=><label key={item}><input type="radio" name="fllm_license_ownership" checked={item==="Either"?!extraCriteria.some(v=>["Transferable license required","License with business package","Standalone license only"].includes(v)):extraCriteria.includes(item)} onChange={()=>setExtraCriteria(current=>[...current.filter(v=>!["Transferable license required","License with business package","Standalone license only","Either"].includes(v)),...(item==="Either"?[]:[item])])}/>{item}</label>)}</div><div className="fllm-license-search-notes" aria-label="License search notes"><strong>License Search Notes</strong><ul><li><span aria-hidden="true">✓</span><span><b>Standalone:</b> Searches license-only inventory.</span></li><li><span aria-hidden="true">✓</span><span><b>Business + License:</b> Searches operating businesses.</span></li><li><span aria-hidden="true">ⓘ</span><span><b>SFS/SRX &amp; 2COP:</b> Location-specific; no separate quota-license valuation.</span></li></ul></div></div>
                  </section>
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">📊</span><div><h3>3. FINANCIAL METRICS</h3><p>Set your target financial criteria <span className="fllm-financial-help" tabIndex={0} role="note" aria-label="Financial matching explanation">ⓘ<span className="fllm-financial-help-tip" role="tooltip">SDE, Cash Flow &amp; EBITDA are interchangeable for matching only. If both earnings minimums are set, the higher minimum applies. Listing figures retain their original labels.</span></span></p></div></header>
                    <div className="fllm-match-body financial"><div className="fllm-match-tabs">{["Asking Price","Revenue","SDE / Cash Flow","EBITDA"].map(t=><button type="button" className={financialTab===t?"active":""} aria-pressed={financialTab===t} onClick={()=>{setFinancialTab(t);const index=["Asking Price","Revenue","SDE / Cash Flow","EBITDA"].indexOf(t);const row=document.querySelectorAll(".business-market-alert-modal .fllm-match-body.financial .fllm-match-range")[index];row?.querySelector<HTMLInputElement>('input[aria-label]')?.focus({preventScroll:true});}} key={t}>{t}</button>)}</div>{[
                      {label:"Maximum purchase price",value:maxPurchasePrice,set:setMaxPurchasePrice,max:5000000,defaultVal:"1000000"},
                      {label:"Minimum gross annual revenue",value:minGrossRevenue,set:setMinGrossRevenue,max:10000000,defaultVal:"500000"},
                      {label:"Minimum SDE / cash flow",value:minSde,set:setMinSde,max:5000000,defaultVal:"250000"},
                      {label:"Minimum EBITDA",value:minEbitda,set:setMinEbitda,max:5000000,defaultVal:"250000"},
                      {label:"Available cash / down payment",value:availableCash,set:setAvailableCash,max:2000000,defaultVal:"250000"}
                    ].map(item=><div className={`fllm-match-range${Number(item.value.replace(/,/g,""))>0?" fllm-match-range--active":""}`} key={item.label} data-financial-filter={item.label}><label>{item.label} <small className="fllm-match-filter-state">{Number(item.value.replace(/,/g,""))>0?"● Active":"No restriction"}</small></label><div className="fllm-match-slider-row"><div><input type="range" min="0" max={item.max} step="25000" value={Number(item.value.replace(/,/g,""))||0} onChange={e=>item.set(e.target.value)}/><div className="fllm-match-endpoints"><span>$0</span><span>${item.max.toLocaleString()}</span></div></div><input aria-label={item.label} inputMode="numeric" value={moneyDisplay(item.value)} placeholder="No restriction" onChange={e=>item.set(e.target.value.replace(/[^0-9]/g,""))}/></div></div>)}</div>
                  </section>
                  <section className="fllm-match-panel">
                    <header><span className="symbol" aria-hidden="true">📄</span><div><h3>4. DEAL STRUCTURE &amp; OTHER</h3><p>Select your preferred structure &amp; other criteria</p></div></header>
                    <div className="fllm-match-body"><div className="fllm-match-split"><div><h4 title="SBA and source-advertised seller financing are screened instantly. Conventional and alternative financing are not searchable until verified source data is available.">Financing preferences <small>(select one or more)</small></h4><div className="fllm-match-checks">{["SBA 7(a) Eligible","Seller Financing","Cash Purchase","Conventional Financing","Alternative Financing"].map(item=><label key={item}><input type="checkbox" checked={selectedFinancing.includes(item)} onChange={()=>toggleFinancing(item)}/>{item}</label>)}</div></div><div><h4>Real estate preference</h4><div className="fllm-match-checks">{["Either","Real estate included","Real estate available separately","Lease only"].map(item=><label key={item}><input type="radio" name="real_estate" checked={realEstate===item} onChange={()=>setRealEstate(item)}/>{item}</label>)}</div></div></div><div className="fllm-match-line"/><div className="fllm-match-split"><div><h4>Lease requirements</h4><LeaseHoverSelect label="Minimum years remaining" value={leaseYears} onChange={setLeaseYears} options={["Any","1","2","3","5","10+"]}/><LeaseHoverSelect label="Maximum monthly rent" value={monthlyRent} onChange={setMonthlyRent} options={["Any","$2,500","$5,000","$10,000","$20,000","$50,000"]}/></div><div><h4 title="Only source-confirmed Yes attributes count as verified; unknown traits appear as potential matches.">Other preferences</h4><div className="fllm-match-checks">{["Waterfront / Beachfront","Absentee owner preferred","Turnkey operation","Established business only","Outdoor seating"].map(item=><label key={item}><input type="checkbox" checked={extraCriteria.includes(item)} onChange={()=>toggleValue(item,extraCriteria,setExtraCriteria)}/>{item}</label>)}</div></div></div></div>
                  </section>
                </div>
                {dashboardOnly && <div className="fllm-match-bottom-actions"><div className="fllm-match-right"><div className="fllm-match-metrics"><div className="green"><span className="fllm-match-inline-label">Matches</span><strong>{searchResults === null ? "—" : searchResults.total.toLocaleString()}</strong><span className="fllm-match-inline-status">{searchResults === null ? "Search to see matches" : "Confirmed"}</span></div></div><div className="fllm-match-actions"><button type="button" className="fllm-control-button" onClick={openBuyerContact}>♧ &nbsp; Activate Buyer Alerts</button><button type="button" className="fllm-control-button" onClick={()=>{searchSequence.current+=1;searchController.current?.abort();setSearching(false);setSelectedBusinessTypes([]);setSelectedLicenseTypes([]);setSelectedCounties([]);setMaxPurchasePrice("");setMinGrossRevenue("");setMinSde("");setMinEbitda("");setExtraCriteria([]);setFranchise("Either");setSelectedFinancing(["Any"]);setRealEstate("Either");setLeaseYears("Any");setMonthlyRent("Any");setAvailableCash("");setFinancialTab("Asking Price");setCountyToAdd("");setSearchResults(null);setSearchError("");setInventoryCount(null);setPotentialCount(0);setAdvancedOpen(false);setConsent(false);setStatus("idle");setError("");}}>⟳ &nbsp; Reset Filters</button><button type="button" className="gold" onClick={findMatches} disabled={searching}>{searching?"Searching Listings…":"Find Matching Businesses →"}</button></div></div></div>}
                {advancedOpen&&<div className="fllm-match-contact" ref={buyerContactRef}><h3>Save Your Buyer Match Criteria</h3><p>Provide your contact details to receive matching opportunities and alerts.</p><div className="fllm-match-contact-grid"><label>Full Name<input ref={buyerNameRef} value={buyerName} onChange={e=>setBuyerName(e.target.value)} required placeholder="Full name"/></label><label>Email<input type="email" value={buyerEmail} onChange={e=>setBuyerEmail(e.target.value)} required placeholder="Email address"/></label><label>Phone<input type="tel" value={phone} onChange={e=>setPhone(formatPhoneNumber(e.target.value))} required placeholder="Phone number"/></label></div><input type="hidden" name="first_name" value={buyerName.trim().split(/\s+/)[0]||""}/><input type="hidden" name="last_name" value={buyerName.trim().split(/\s+/).slice(1).join(" ")||"-"}/><input type="hidden" name="email" value={buyerEmail}/><label className="fllm-match-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/> I agree to receive matching opportunity emails. I can unsubscribe at any time.</label><textarea name="buyer_notes" placeholder="Any other preferences (optional)" rows={2}/>{error&&<p role="alert">{error}</p>}<div className="fllm-match-contact-buttons"><button type="button" onClick={()=>setAdvancedOpen(false)}>Back to Criteria</button><button className="gold" type="submit" disabled={status==="submitting"}>{status==="submitting"?"Saving…":"Save Search & Activate Buyer Alerts →"}</button></div></div>}
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
