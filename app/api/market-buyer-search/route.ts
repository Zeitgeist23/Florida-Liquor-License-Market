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
    const matching=eligible.filter(x=>{
      const enriched=approved.get(x.listingReference);
      const gross=enriched?.gross ?? x.grossRevenueNumber;
      const sde=enriched?.sde ?? x.sdeNumber;
      const ebitda=x.ebitdaNumber;
      return (minRevenue===null || (typeof gross==="number" && gross>=minRevenue))
        && (minSde===null || (typeof sde==="number" && sde>=minSde))
        && (minEbitda===null || (typeof ebitda==="number" && ebitda>=minEbitda));
    });
    return NextResponse.json({
      total:matching.length,potentialCount:0,shown:matching.length,
      results:matching.slice(0,30).map(x=>({
        reference:x.listingReference,county:x.county,businessType:x.businessCategory,
        licenseType:x.licenseType,price:x.packagePrice,
        href:x.listingTier==="market"?businessMarketRecordHref(x):x.href,
        source:x.listingTier==="market"?"Independent Market View":"Featured Listing",
        matchStatus:"verified",financialNote:"All selected financial thresholds satisfied"
      }))
    },{headers:{"Cache-Control":"no-store"}});

  } catch {return NextResponse.json({error:"Unable to search listings."},{status:400});}
}