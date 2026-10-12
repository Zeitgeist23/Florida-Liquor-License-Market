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
    const body = await request.json() as {businessTypes?:string[];licenseTypes?:string[];counties?:string[];maxPurchasePrice?:string;minGrossRevenue?:string;minSde?:string;minEbitda?:string;financingPreferences?:string[];realEstate?:string;leaseYears?:string;monthlyRent?:string};
    const selected = (value: unknown): string[] => Array.isArray(value) ? value.filter((v):v is string => typeof v==="string").slice(0,100) : [];
    const types=selected(body.businessTypes), licenses=selected(body.licenseTypes), counties=selected(body.counties);
    const amount=(value:unknown)=>{if(!value)return null;const n=Number(String(value).replace(/[^\d.]/g,""));return Number.isFinite(n)&&n>0?n:null;};
    const maxPrice=amount(body.maxPurchasePrice),minRevenue=amount(body.minGrossRevenue),minSde=amount(body.minSde),minEbitda=amount(body.minEbitda);
    const earningsMinimum = Math.max(minSde ?? 0, minEbitda ?? 0);
    // Undisclosed property arrangements must not be inferred from a business sale.
    const propertyPreference = ["Real estate included","Real estate available separately","Lease only"].includes(body.realEstate ?? "") ? body.realEstate : "Either";
    const propertyStatus = (listing:(typeof businessQuotaListingRecords)[number]) =>
      listing.realEstateStatus==="lease_only" ? "Lease only" :
      listing.realEstateStatus==="available_separately" ? "Real estate available separately" :
      listing.realEstateStatus==="included" || listing.transactionType==="Business + Real Estate Sale" ? "Real estate included" : null;
    const leaseMinYears = body.leaseYears && body.leaseYears !== "Any" ? amount(body.leaseYears) : null;
    const rentMaximum = body.monthlyRent && body.monthlyRent !== "Any" ? amount(body.monthlyRent) : null;
    const today = new Date();
    const remainingYears = (date?: string): number | null => {
      if (!date || !/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) return null;
      const expiration = new Date(date + "T23:59:59Z");
      return Number.isFinite(expiration.getTime()) ? Math.max(0,(expiration.getTime()-today.getTime())/(365.2425*86400000)) : null;
    };
    const leaseMatch = (x:(typeof businessQuotaListingRecords)[number]) => {
      if (leaseMinYears === null && rentMaximum === null) return "match";
      if (x.realEstateStatus === "included" || x.realEstateStatus === "available_separately") return "not_applicable";
      const remaining = remainingYears(x.leaseExpirationDate);
      if ((leaseMinYears !== null && remaining !== null && remaining < leaseMinYears) ||
          (rentMaximum !== null && x.monthlyRentNumber !== undefined && x.monthlyRentNumber > rentMaximum)) return "fail";
      if ((leaseMinYears !== null && remaining === null) ||
          (rentMaximum !== null && x.monthlyRentNumber === undefined)) return "unknown";
      return "match";
    };
    const eligible=businessQuotaListingRecords.filter(x=>x.publicationStatus==="published" && passesBusinessMarketSourcePolicy(x)
      && (types.length===0||types.includes(x.businessCategory)||(types.includes("Bar")&&x.businessCategory==="Cocktail Lounge"))
      && (licenses.length===0||licenses.includes(x.licenseType))
      && (counties.length===0||counties.includes(x.county))
      && (maxPrice===null||(x.packagePriceNumber>0&&x.packagePriceNumber<=maxPrice))
      && (propertyPreference==="Either" || propertyStatus(x)===propertyPreference)
      && leaseMatch(x)!=="fail"
      && (!(selected(body.financingPreferences).length===1 && selected(body.financingPreferences)[0]==="Seller Financing")||x.sellerFinancingAvailable===true));
    let approved = new Map<string, { gross: number | null; sde: number | null }>();
    try {
      approved = await getApprovedMarketFinancials(eligible.map(x => x.listingReference));
    } catch (error) {
      console.error("Financial lookup unavailable", error);
    }
    const diagnostics={leaseCriteriaUnverified:eligible.filter(x=>leaseMatch(x)==="unknown").length,eligibleBeforeEarnings:eligible.length,missingRevenue:0,missingEarnings:0,belowRevenueMinimum:0,belowEarningsMinimum:0};
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
      (missingRevenue||missingEarnings||leaseMatch(x)==="unknown"?potential:confirmed).push(x);
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
      realEstateStatus:propertyStatus(x),
      monthlyRent:x.monthlyRentNumber??null,
      leaseExpirationDate:x.leaseExpirationDate??null,
      leaseYearsRemaining:remainingYears(x.leaseExpirationDate),
      leaseCriteriaStatus:leaseMatch(x),
      href:x.listingTier==="market"?businessMarketRecordHref(x):x.href,
      source:x.listingTier==="market"?"Independent Market View":"Featured Listing",
      matchStatus:status,
      financialNote:leaseMatch(x)==="unknown"?"Potential match — one or more selected lease terms are undisclosed":status==="financials_unverified"?"Potential match — required financial figures are not disclosed":"Disclosed financial figures meet the selected minimums; SDE and EBITDA are not accounting equivalents"
    });
    return NextResponse.json({
      total:confirmed.length,potentialCount:potential.length,shown:Math.min(30,confirmed.length+potential.length),diagnostics,
      results:[...confirmed.map(x=>resultItem(x,"verified")),...potential.map(x=>resultItem(x,"financials_unverified"))].slice(0,30)
    },{headers:{"Cache-Control":"no-store"}});

  } catch {return NextResponse.json({error:"Unable to search listings."},{status:400});}
}