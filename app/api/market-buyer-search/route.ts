import { supabaseServiceSettings } from "@/lib/supabase-settings";
import { NextResponse } from "next/server";
import featuredFinancialManifest from "@/data/featured-listing-financials.generated.json";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

const featuredFinancials = featuredFinancialManifest as Record<string, {gross?:number;sde?:number;ebitda?:number}>;
import { getApprovedMarketFinancials, getSourcedObservedFinancials } from "@/lib/market-intelligence-store";
import { businessQuotaListingRecords, businessMarketRecordHref, passesBusinessMarketSourcePolicy } from "@/lib/business-quota-listings";
export const dynamic = "force-dynamic";
export async function GET() {
 const active = businessQuotaListingRecords.filter(x=>x.publicationStatus==="published" && passesBusinessMarketSourcePolicy(x)).length;
 return NextResponse.json({activeListings:active,newThisMonth:null,priceReductions:null},{headers:{"Cache-Control":"no-store"}});
}
export async function POST(request: Request) {
  try {
    const body = await request.json() as {businessTypes?:string[];licenseTypes?:string[];counties?:string[];maxPurchasePrice?:string;minGrossRevenue?:string;minSde?:string;minEbitda?:string;financingPreferences?:string[];realEstate?:string;leaseYears?:string;monthlyRent?:string;availableCash?:string;extraCriteria?:string[];franchise?:"Yes"|"No"|"Either"};
    const selected = (value: unknown): string[] => Array.isArray(value) ? value.filter((v):v is string => typeof v==="string").slice(0,100) : [];
    const types=selected(body.businessTypes), licenses=selected(body.licenseTypes), counties=selected(body.counties);
    const amount=(value:unknown)=>{if(!value)return null;const n=Number(String(value).replace(/[^\d.]/g,""));return Number.isFinite(n)&&n>0?n:null;};
    const maxPrice=amount(body.maxPurchasePrice),minRevenue=amount(body.minGrossRevenue),minSde=amount(body.minSde),minEbitda=amount(body.minEbitda);
    const earningsMinimum = Math.max(minSde ?? 0, minEbitda ?? 0);

    // Standalone quota licenses are a separate, real inventory, not operating-business packages.
    if(selected(body.extraCriteria).includes("Standalone license only")){
      const cash=amount(body.availableCash);
      const listings=getVisibleAvailableMarketplaceListings(await getMarketplaceListings())
        .filter(x=>(licenses.length===0||licenses.includes(x.type))
          && (counties.length===0||counties.includes(x.county))
          && (maxPrice===null||(typeof x.price==="number"&&x.price<=maxPrice))
          && (cash===null||typeof x.price==="number"&&x.price<=cash));
      const results=listings.slice(0,30).map(x=>({
        reference:x.sourceRef||"",county:x.county,businessType:"Standalone License",
        licenseType:x.type,price:x.priceLabel,href:"/florida-liquor-licenses-for-sale",
        source:"Standalone Quota License Inventory",matchStatus:"verified",
        grossRevenue:null,sdeCashFlow:null,ebitda:null,estimatedLicenseValue:null,
        licenseValueBasis:"unavailable",franchiseStatus:"Unknown" as const,sbaStatus:"unverified",
        financialNote:"Standalone license, not an operating business; business financial and franchise criteria do not apply"
      }));
      return NextResponse.json({total:listings.length,potentialCount:0,shown:results.length,
        diagnostics:{eligibleBeforeEarnings:listings.length,missingRevenue:0,missingEarnings:0,belowEarningsMinimum:0,leaseCriteriaUnverified:0},
        results,inventoryMode:"standalone",sbaModel:null},{headers:{"Cache-Control":"no-store"}});
    }

    type PropertyTerms = {
      listing_reference: string;
      property_status: "included" | "available_separately" | "lease_only" | null;
      monthly_rent: number | null;
      lease_expiration_date: string | null;
      lease_expiration_month: string | null;
      lease_expiration_year: number | null;
      real_estate_also_separately_offered: boolean;
      duplicate_of: string | null;
      seller_financing_offered: boolean | null;
      seller_financing_evidence_url: string | null;
      seller_financing_terms: string | null;
      sba_advertised_status: "eligible" | "not_eligible" | null;
      sba_evidence_url: string | null;
      sba_advertisement_note: string | null;
      seller_down_payment: number | null;
      verified_attributes: Record<string,boolean> | null;
    };
    const termsByRef = new Map<string, PropertyTerms>();
    let propertyDatabaseAvailable = false;
    try {
      const { url, key } = supabaseServiceSettings("Buyer property terms unavailable.");
      const response = await fetch(
        `${url}/rest/v1/business_property_terms?select=listing_reference,property_status,monthly_rent,lease_expiration_date,lease_expiration_month,lease_expiration_year,real_estate_also_separately_offered,duplicate_of,seller_financing_offered,seller_financing_evidence_url,seller_financing_terms,sba_advertised_status,sba_evidence_url,sba_advertisement_note,seller_down_payment,verified_attributes&limit=1000`,
        { cache: "no-store", headers: { apikey: key, Authorization: `Bearer ${key}` } }
      );
      if (!response.ok) throw new Error(`Property terms HTTP ${response.status}`);
      const rows = await response.json() as PropertyTerms[];
      for (const row of rows) termsByRef.set(row.listing_reference, row);
      propertyDatabaseAvailable = true;
    } catch (error) {
      console.error("Buyer property search using registry fallback:", error);
    }
    const terms = (x:(typeof businessQuotaListingRecords)[number]) => termsByRef.get(x.listingReference);
    const propertyCode = (x:(typeof businessQuotaListingRecords)[number]) =>
      propertyDatabaseAvailable && terms(x) ? terms(x)!.property_status : (x.realEstateStatus ?? null);
    const monthlyRentValue = (x:(typeof businessQuotaListingRecords)[number]) => {
      const n = terms(x)?.monthly_rent;
      return propertyDatabaseAvailable && terms(x)
        ? (n === null || n === undefined ? null : Number(n))
        : (x.monthlyRentNumber ?? null);
    };
    const exactExpiry = (x:(typeof businessQuotaListingRecords)[number]) =>
      propertyDatabaseAvailable && terms(x)
        ? terms(x)!.lease_expiration_date
        : (x.leaseExpirationDate ?? null);
    const separateProperty = (x:(typeof businessQuotaListingRecords)[number]) =>
      propertyDatabaseAvailable && terms(x)
        ? terms(x)!.real_estate_also_separately_offered === true
        : x.realEstateAlsoOfferedSeparately === true;
    // Undisclosed property arrangements must not be inferred from a business sale.
    const propertyPreference = ["Real estate included","Real estate available separately","Lease only"].includes(body.realEstate ?? "") ? body.realEstate : "Either";
    const propertyStatus = (listing:(typeof businessQuotaListingRecords)[number]) =>
      propertyCode(listing)==="lease_only" ? "Lease only" :
      propertyCode(listing)==="available_separately" ? "Real estate available separately" :
      propertyCode(listing)==="included" || (!terms(listing) && listing.transactionType==="Business + Real Estate Sale") ? "Real estate included" : null;
    const leaseMinYears = body.leaseYears && body.leaseYears !== "Any" ? amount(body.leaseYears) : null;
    const rentMaximum = body.monthlyRent && body.monthlyRent !== "Any" ? amount(body.monthlyRent) : null;
    const today = new Date();
    const remainingYears = (date?: string): number | null => {
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
      const expiration = new Date(date + "T23:59:59Z");
      return Number.isFinite(expiration.getTime()) ? Math.max(0,(expiration.getTime()-today.getTime())/(365.2425*86400000)) : null;
    };
    const leaseMatch = (x:(typeof businessQuotaListingRecords)[number]) => {
      if (leaseMinYears === null && rentMaximum === null) return "match";
      if (propertyCode(x) === "included" || propertyCode(x) === "available_separately") return "not_applicable";
      const remaining = remainingYears(exactExpiry(x) ?? undefined);
      if ((leaseMinYears !== null && remaining !== null && remaining < leaseMinYears) ||
          (rentMaximum !== null && monthlyRentValue(x) !== null && monthlyRentValue(x)! > rentMaximum)) return "fail";
      if ((leaseMinYears !== null && remaining === null) ||
          (rentMaximum !== null && monthlyRentValue(x) === null)) return "unknown";
      return "match";
    };

    // Indicative initial-acquisition test; broker claims require source evidence.
    // Historical earnings may require significant lender adjustments.
    // Federal Reserve H.15 Bank Prime Loan Rate: 7.00% on 2026-10-08 (latest verified observation).
    // For a loan greater than $350,000, SBA's variable-rate ceiling is prime + 3.00%.
    // Smaller loan tiers have different caps; calculate the spread using the modeled loan amount.
    // This is a dated ceiling-based scenario, NOT a lender quote or a live automatic rate feed.
    const fallbackPrime={rate:0.07,asOf:"2026-10-08"};
    let prime=fallbackPrime.rate,primeAsOf=fallbackPrime.asOf,rateSourceStatus:"current"|"stale"|"fallback"="fallback";
    try {
      const {url,key}=supabaseServiceSettings("SBA rate cache unavailable");
      const response=await fetch(`${url}/rest/v1/sba_prime_rate_cache?series_id=eq.DPRIME&select=annual_rate,observation_date&limit=1`,{cache:"no-store",headers:{apikey:key,Authorization:`Bearer ${key}`}});
      if (!response.ok) throw new Error(`SBA reference rate HTTP ${response.status}`);
      const [row]=await response.json() as Array<{annual_rate:number|string;observation_date:string}>;
      const candidate=Number(row?.annual_rate);
      if (candidate>=0.01&&candidate<=0.25&&/^\d{4}-\d{2}-\d{2}$/.test(row.observation_date)) {
        prime=candidate;primeAsOf=row.observation_date;
        const days=(Date.now()-new Date(primeAsOf+"T00:00:00Z").getTime())/86400000;
        rateSourceStatus=days>=0&&days<=14?"current":"stale";
      }
    }catch(error){console.error("SBA cached prime unavailable; using documented fallback",error);}
    const SBA = { equity:0.10, prime, primeAsOf, rateSourceStatus, source:"https://fred.stlouisfed.org/series/DPRIME", ruleSource:"https://www.sba.gov/sba-lenders/", rateBasis:"SBA variable-rate maximum using prime rate", months:120, floor:1.25, maxLoan:5_000_000 } as const;
    const sbaSpread=(loan:number)=>loan<=50_000?0.065:loan<=250_000?0.06:loan<=350_000?0.045:0.03;
    const sbaRate=(loan:number)=>SBA.prime+sbaSpread(loan);
    const annualPayment=(loan:number,rate:number)=>{const m=rate/12;return 12*loan*m/(1-Math.pow(1+m,-SBA.months));};
    type SbaScreen = {status:"advertised"|"potential"|"advertised_not_eligible"|"unverified";dscr:number|null;earningsBasis:string|null;annualDebtService:number|null};
    const sbaByRef=new Map<string,SbaScreen>();
    const wantsSba=selected(body.financingPreferences).some(v=>v==="SBA 7(a) Eligible"||v==="SBA");
    const screenSba=(x:(typeof businessQuotaListingRecords)[number],sde:number|null,ebitda:number|null):SbaScreen=>{
      const fact=terms(x);
      if(fact?.sba_advertised_status==="not_eligible"&&fact.sba_evidence_url)return {status:"advertised_not_eligible",dscr:null,earningsBasis:null,annualDebtService:null};
      if(fact?.sba_advertised_status==="eligible"&&fact.sba_evidence_url)return {status:"advertised",dscr:null,earningsBasis:null,annualDebtService:null};
      const loan=x.packagePriceNumber*(1-SBA.equity);
      const income=ebitda!==null&&ebitda>0?ebitda:sde!==null&&sde>0?sde:null;
      const basis=ebitda!==null&&ebitda>0?"Reported EBITDA":sde!==null&&sde>0?"Reported SDE (unadjusted proxy)":null;
      if(income===null||!Number.isFinite(loan)||loan<=0||loan>SBA.maxLoan)return {status:"unverified",dscr:null,earningsBasis:null,annualDebtService:null};
      const annual=annualPayment(loan,sbaRate(loan));
      const dscr=income/annual;
      return {status:dscr>=SBA.floor?"potential":"unverified",dscr:Math.round(dscr*100)/100,earningsBasis:basis,annualDebtService:Math.round(annual)};
    };
    const wantsSellerFinancing = selected(body.financingPreferences).includes("Seller Financing");
    const sellerFinancingStatus = (x:(typeof businessQuotaListingRecords)[number]) =>
      terms(x)?.seller_financing_offered === true && !!terms(x)?.seller_financing_evidence_url
        ? "advertised" : terms(x)?.seller_financing_offered === false ? "not_offered" : "undisclosed";
    const extra=selected(body.extraCriteria);
    const cashAvailable=amount(body.availableCash);
    const ownershipRequired=extra.includes("Transferable license required");
    const standaloneOnly=extra.includes("Standalone license only");
    const businessPackageOnly=extra.includes("License with business package");
    const franchiseFilter=body.franchise==="Yes"?true:body.franchise==="No"?false:null;
    const franchiseMatch=(x:(typeof businessQuotaListingRecords)[number])=>franchiseFilter===null||terms(x)?.verified_attributes?.["Franchise"]===franchiseFilter;
    const attributeFilters=extra.filter(v=>["Waterfront / Beachfront","Absentee owner preferred","Turnkey operation","Established business only","Franchise","Outdoor seating"].includes(v));
    const attributes=(x:(typeof businessQuotaListingRecords)[number])=>terms(x)?.verified_attributes||{};
    const attributesFail=(x:(typeof businessQuotaListingRecords)[number])=>attributeFilters.some(v=>attributes(x)[v]===false);
    const attributesUnknown=(x:(typeof businessQuotaListingRecords)[number])=>attributeFilters.some(v=>attributes(x)[v]!==true);
    const cashStatus=(x:(typeof businessQuotaListingRecords)[number])=>{
      if(cashAvailable===null)return "match";
      if(selected(body.financingPreferences).includes("Seller Financing")&&sellerFinancingStatus(x)==="advertised"){
        const down=terms(x)?.seller_down_payment;
        return down===null||down===undefined?"unknown":cashAvailable>=Number(down)?"match":"fail";
      }
      if(wantsSba){
        // Indicative buyer liquidity: 10% acquisition equity + 5% price allowance for transaction costs
        // + three months of disclosed rent for working-capital cushion. Not lender underwriting.
        const required=x.packagePriceNumber*0.15+(monthlyRentValue(x)??0)*3;
        return cashAvailable>=required?"potential":"fail";
      }
      if(selected(body.financingPreferences).includes("Cash Purchase"))return cashAvailable>=x.packagePriceNumber?"match":"fail";
      return "unknown";
    };
    const eligible=businessQuotaListingRecords.filter(x=>x.publicationStatus==="published" && passesBusinessMarketSourcePolicy(x)
      && (types.length===0||types.includes(x.businessCategory)||(types.includes("Bar")&&x.businessCategory==="Cocktail Lounge"))
      && (licenses.length===0||licenses.includes(x.licenseType))
      && (counties.length===0||counties.includes(x.county))
      && (maxPrice===null||(x.packagePriceNumber>0&&x.packagePriceNumber<=maxPrice))
      && (propertyPreference==="Either" || propertyStatus(x)===propertyPreference || (propertyPreference==="Real estate available separately" && separateProperty(x)))
      && !(propertyDatabaseAvailable && terms(x)?.duplicate_of)
      && leaseMatch(x)!=="fail"
      && !standaloneOnly
      && (!businessPackageOnly || x.classification.startsWith("business"))
      && franchiseMatch(x)
      && (!ownershipRequired || x.licenseClass==="quota")
      && !attributesFail(x)
      && cashStatus(x)!=="fail"
      && (!wantsSellerFinancing || sellerFinancingStatus(x)==="advertised"));
    let approved = new Map<string, { gross: number | null; sde: number | null }>();
    try {
      approved = await getApprovedMarketFinancials(eligible.map(x => x.listingReference));
    } catch (error) {
      console.error("Financial lookup unavailable", error);
    }
    const diagnostics={sellerFinancingUndisclosed:eligible.filter(x=>wantsSellerFinancing&&sellerFinancingStatus(x)==="undisclosed").length,propertyDatabaseAvailable,leaseCriteriaUnverified:eligible.filter(x=>leaseMatch(x)==="unknown").length,eligibleBeforeEarnings:eligible.length,missingRevenue:0,missingEarnings:0,belowRevenueMinimum:0,belowEarningsMinimum:0};
    let observed = new Map<string,{gross:number|null;sde:number|null;ebitda:number|null}>();
    try {
      observed = await getSourcedObservedFinancials(eligible.filter(x=>x.listingTier==="market").map(x=>x.listingReference));
    } catch(error) {
      console.error("Sourced market observation financial lookup unavailable",error);
    }
    const financialByRef=new Map<string,{gross:number|null;sde:number|null;ebitda:number|null}>();
    const confirmed:typeof eligible=[];
    const potential:typeof eligible=[];
    for (const x of eligible) {
      const enriched=approved.get(x.listingReference);
      const displayed=x.featured ? featuredFinancials[x.listingReference] : undefined;
      const sourced=observed.get(x.listingReference);
      const gross=displayed?.gross ?? x.grossRevenueNumber ?? enriched?.gross ?? sourced?.gross;
      const sde=displayed?.sde ?? x.sdeNumber ?? enriched?.sde ?? sourced?.sde;
      const ebitda=displayed?.ebitda ?? x.ebitdaNumber ?? sourced?.ebitda;
      financialByRef.set(x.listingReference,{gross:typeof gross==="number"&&Number.isFinite(gross)?gross:null,sde:typeof sde==="number"&&Number.isFinite(sde)?sde:null,ebitda:typeof ebitda==="number"&&Number.isFinite(ebitda)?ebitda:null});
      const earnings=[sde,ebitda].filter((v):v is number=>typeof v==="number"&&Number.isFinite(v));
      const missingRevenue=minRevenue!==null&&(typeof gross!=="number"||!Number.isFinite(gross));
      const missingEarnings=earningsMinimum>0&&earnings.length===0;
      const belowRevenue=minRevenue!==null&&!missingRevenue&&(gross as number)<minRevenue;
      const belowEarnings=earningsMinimum>0&&!missingEarnings&&!earnings.some(v=>v>=earningsMinimum);
      if(missingRevenue) diagnostics.missingRevenue++;
      if(missingEarnings) diagnostics.missingEarnings++;
      if(belowRevenue) diagnostics.belowRevenueMinimum++;
      if(belowEarnings) diagnostics.belowEarningsMinimum++;
      if(belowRevenue||belowEarnings) continue;
      const sba=screenSba(x,typeof sde==="number"&&Number.isFinite(sde)?sde:null,typeof ebitda==="number"&&Number.isFinite(ebitda)?ebitda:null);
      sbaByRef.set(x.listingReference,sba);
      if(wantsSba && !["advertised","potential"].includes(sba.status)) continue;
      (missingRevenue||missingEarnings||leaseMatch(x)==="unknown"||attributesUnknown(x)||cashStatus(x)!=="match"?potential:confirmed).push(x);
    }
    let valuesByReference = new Map<string, {value:number; basis:string}>();
    try {
      const standalone = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
      const valued = withMarketLicenseValues([...confirmed,...potential],standalone);
      valuesByReference = new Map(valued.map(x => {const raw=x.marketMedianLicenseValue||x.allocatedLicenseValue||"";const amount=Number(String(raw).replace(/[^0-9.]/g,""));return [x.listingReference,{value:Number.isFinite(amount)&&amount>0?amount:0,basis:x.licenseValueBasis||"unavailable"}] as const;}));
    } catch(error){console.error("County license valuation lookup unavailable",error);}
    const resultItem=(x:(typeof eligible)[number],status:"verified"|"financials_unverified")=>({
      reference:x.listingReference,county:x.county,businessType:x.businessCategory,
      licenseType:x.licenseType,price:x.packagePrice,
      estimatedLicenseValue:x.licenseClass==="quota" ? (valuesByReference.get(x.listingReference)?.value||null) : null,
      licenseValueBasis:x.licenseClass==="quota" ? (valuesByReference.get(x.listingReference)?.basis||"unavailable") : "unavailable",
      grossRevenue:financialByRef.get(x.listingReference)?.gross??null,
      sdeCashFlow:financialByRef.get(x.listingReference)?.sde??null,
      ebitda:financialByRef.get(x.listingReference)?.ebitda??null,
      franchiseStatus:terms(x)?.verified_attributes?.["Franchise"]===true?"Yes":terms(x)?.verified_attributes?.["Franchise"]===false?"No":"Unknown",
      estimatedBuyerLiquidityRequired: selected(body.financingPreferences).some(v=>v==="SBA 7(a) Eligible"||v==="SBA")?Math.round(x.packagePriceNumber*.15+(monthlyRentValue(x)??0)*3):null,
      cashMatchStatus:cashStatus(x),
      businessAttributeStatus:attributesUnknown(x)?"unverified":"verified",
      sbaStatus:sbaByRef.get(x.listingReference)?.status??"unverified",
      sbaModeledDscr:sbaByRef.get(x.listingReference)?.dscr??null,
      sbaEarningsBasis:sbaByRef.get(x.listingReference)?.earningsBasis??null,
      sbaAnnualDebtService:sbaByRef.get(x.listingReference)?.annualDebtService??null,
      sbaModeledInterestRate:sbaRate(x.packagePriceNumber*(1-SBA.equity)),
      sbaRateSensitivity:{low:sbaRate(x.packagePriceNumber*(1-SBA.equity))-0.01,high:sbaRate(x.packagePriceNumber*(1-SBA.equity))+0.01},
      sbaEvidenceUrl:terms(x)?.sba_evidence_url??null,
      sbaNote:sbaByRef.get(x.listingReference)?.status==="potential"?"FLLM preliminary model; not lender approval. SDE may overstate underwriting cash flow.":terms(x)?.sba_advertisement_note??null,
      sellerFinancingStatus:sellerFinancingStatus(x),
      sellerFinancingEvidenceUrl:terms(x)?.seller_financing_evidence_url??null,
      sellerFinancingTerms:terms(x)?.seller_financing_terms??null,
      realEstateStatus:propertyStatus(x),
      monthlyRent:monthlyRentValue(x),
      leaseExpirationDate:exactExpiry(x),
      leaseYearsRemaining:remainingYears(exactExpiry(x) ?? undefined),
      leaseCriteriaStatus:leaseMatch(x),
      href:x.listingTier==="market"?businessMarketRecordHref(x):x.href,
      source:x.listingTier==="market"?"Independent Market View":"Featured Listing",
      matchStatus:status,
      financialNote:wantsSellerFinancing&&sellerFinancingStatus(x)==="undisclosed"?"Potential match — seller financing is not disclosed in the source advertisement":leaseMatch(x)==="unknown"?"Potential match — one or more selected lease terms are undisclosed":status==="financials_unverified"?"Potential match — required financial figures are not disclosed":"Disclosed financial figures meet the selected minimums; SDE and EBITDA are not accounting equivalents"
    });
    return NextResponse.json({
      total:confirmed.length,potentialCount:potential.length,shown:Math.min(30,confirmed.length+potential.length),diagnostics,
      results:[...confirmed.map(x=>resultItem(x,"verified")),...potential.map(x=>resultItem(x,"financials_unverified"))].sort((a,b)=>wantsSba?(a.sbaStatus==="advertised"?-1:b.sbaStatus==="advertised"?1:0):0).slice(0,30),
      sbaModel:wantsSba?{...SBA,maximumVariableRateOver350k:SBA.prime+0.03,rateSensitivityPlusMinus:0.01,rateVerifiedAsOf:SBA.primeAsOf}:null
    },{headers:{"Cache-Control":"no-store"}});

  } catch {return NextResponse.json({error:"Unable to search listings."},{status:400});}
}