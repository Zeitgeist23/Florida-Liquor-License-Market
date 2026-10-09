import { NextResponse } from "next/server";
import featuredFinancialManifest from "@/data/featured-listing-financials.generated.json";

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
    const body = await request.json() as {businessTypes?:string[];licenseTypes?:string[];counties?:string[];maxPurchasePrice?:string;minGrossRevenue?:string;minSde?:string;minEbitda?:string;financingPreferences?:string[]};
    const selected = (value: unknown): string[] => Array.isArray(value) ? value.filter((v):v is string => typeof v==="string").slice(0,100) : [];
    const types=selected(body.businessTypes), licenses=selected(body.licenseTypes), counties=selected(body.counties);
    const amount=(value:unknown)=>{if(!value)return null;const n=Number(String(value).replace(/[^\d.]/g,""));return Number.isFinite(n)&&n>0?n:null;};
    const maxPrice=amount(body.maxPurchasePrice),minRevenue=amount(body.minGrossRevenue),minSde=amount(body.minSde),minEbitda=amount(body.minEbitda);
    const earningsMinimum = Math.max(minSde ?? 0, minEbitda ?? 0);
    const eligible=businessQuotaListingRecords.filter(x=>x.publicationStatus==="published" && passesBusinessMarketSourcePolicy(x)
      && (types.length===0||types.includes(x.businessCategory)||(types.includes("Bar")&&x.businessCategory==="Cocktail Lounge"))
      && (licenses.length===0||licenses.includes(x.licenseType))
      && (counties.length===0||counties.includes(x.county))
      && (maxPrice===null||(x.packagePriceNumber>0&&x.packagePriceNumber<=maxPrice))
      && (!selected(body.financingPreferences).includes("Seller Financing")||x.sellerFinancingAvailable===true));
    let approved = new Map<string, { gross: number | null; sde: number | null }>();
    try {
      approved = await getApprovedMarketFinancials(eligible.map(x => x.listingReference));
    } catch (error) {
      console.error("Financial lookup unavailable", error);
    }
    const diagnostics={eligibleBeforeEarnings:eligible.length,missingEarnings:0,belowEarningsMinimum:0};
    let observed = new Map<string,{gross:number|null;sde:number|null;ebitda:number|null}>();
    try {
      observed = await getSourcedObservedFinancials(eligible.filter(x=>x.listingTier==="market").map(x=>x.listingReference));
    } catch(error) {
      console.error("Sourced market observation financial lookup unavailable",error);
    }
    const matching=eligible.filter(x=>{
      const enriched=approved.get(x.listingReference);
      const displayed=x.featured ? featuredFinancials[x.listingReference] : undefined;
      const sourced=observed.get(x.listingReference);
      const gross=displayed?.gross ?? x.grossRevenueNumber ?? enriched?.gross ?? sourced?.gross;
      const sde=displayed?.sde ?? x.sdeNumber ?? enriched?.sde ?? sourced?.sde;
      const ebitda=displayed?.ebitda ?? x.ebitdaNumber ?? sourced?.ebitda;
      const earnings = [sde, ebitda].filter((v): v is number => typeof v === "number" && Number.isFinite(v));
      if(earningsMinimum>0 && earnings.length===0) diagnostics.missingEarnings++;
      else if(earningsMinimum>0 && !earnings.some(value=>value>=earningsMinimum)) diagnostics.belowEarningsMinimum++;
      return (minRevenue===null || (typeof gross==="number" && gross>=minRevenue))
        && (earningsMinimum===0 || earnings.some(value=>value>=earningsMinimum));
    });
    return NextResponse.json({
      total:matching.length,potentialCount:0,shown:matching.length,diagnostics,
      results:matching.slice(0,30).map(x=>({
        reference:x.listingReference,county:x.county,businessType:x.businessCategory,
        licenseType:x.licenseType,price:x.packagePrice,
        href:x.listingTier==="market"?businessMarketRecordHref(x):x.href,
        source:x.listingTier==="market"?"Independent Market View":"Featured Listing",
        matchStatus:"verified",financialNote:"A disclosed SDE, cash-flow, or EBITDA figure meets the earnings-search minimum; these metrics are not accounting equivalents"
      }))
    },{headers:{"Cache-Control":"no-store"}});

  } catch {return NextResponse.json({error:"Unable to search listings."},{status:400});}
}