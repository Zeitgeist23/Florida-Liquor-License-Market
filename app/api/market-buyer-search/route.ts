import { NextResponse } from "next/server";
import { getApprovedMarketFinancials } from "@/lib/market-intelligence-store";
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
    const eligible=businessQuotaListingRecords.filter(x=>x.publicationStatus==="published" && passesBusinessMarketSourcePolicy(x)
      && (types.length===0||types.includes(x.businessCategory))
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
    const thresholds=[{minimum:minRevenue,field:"grossRevenueNumber"},{minimum:minSde,field:"sdeNumber"},{minimum:minEbitda,field:"ebitdaNumber"}] as const;
    const tested=eligible.map(x=>{
      const enriched=approved.get(x.listingReference);
      const values={grossRevenueNumber:enriched?.gross ?? x.grossRevenueNumber,sdeNumber:enriched?.sde ?? x.sdeNumber,ebitdaNumber:x.ebitdaNumber};
      const active=thresholds.filter(t=>t.minimum!==null);
      const disclosed=active.filter(t=>typeof values[t.field]==="number");
      const fails=disclosed.some(t=>(values[t.field] as number)<(t.minimum as number));
      const unknown=active.some(t=>typeof values[t.field]!=="number");
      return {x,matchStatus:fails?"excluded":unknown?"financials_unverified":"verified"};
    }).filter(v=>v.matchStatus!=="excluded");
    const verified=tested.filter(v=>v.matchStatus==="verified");
    const potential=tested.filter(v=>v.matchStatus==="financials_unverified");
    const ordered=[...verified,...potential];
    return NextResponse.json({
      total:verified.length,potentialCount:potential.length,shown:ordered.length,
      results:ordered.slice(0,30).map(({x,matchStatus})=>({
        reference:x.listingReference,county:x.county,businessType:x.businessCategory,
        licenseType:x.licenseType,price:x.packagePrice,
        href:x.listingTier==="market"?businessMarketRecordHref(x):x.href,
        source:x.listingTier==="market"?"Independent Market View":"Featured Listing",
        matchStatus,financialNote:matchStatus==="financials_unverified"?"Financial criteria not verified — revenue, SDE or EBITDA not disclosed":"All available financial criteria verified"
      }))
    },{headers:{"Cache-Control":"no-store"}});

  } catch {return NextResponse.json({error:"Unable to search listings."},{status:400});}
}