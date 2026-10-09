import { NextResponse } from "next/server";
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
    const matches=businessQuotaListingRecords.filter(x=>x.publicationStatus==="published" && passesBusinessMarketSourcePolicy(x) && (types.length===0||types.includes(x.businessCategory)) && (licenses.length===0||licenses.includes(x.licenseType)) && (counties.length===0||counties.includes(x.county)) && (maxPrice===null||(x.packagePriceNumber>0&&x.packagePriceNumber<=maxPrice)) && (minRevenue===null||(typeof x.grossRevenueNumber==="number"&&x.grossRevenueNumber>=minRevenue)) && (minSde===null||(typeof x.sdeNumber==="number"&&x.sdeNumber>=minSde)) && (minEbitda===null||(typeof x.ebitdaNumber==="number"&&x.ebitdaNumber>=minEbitda)) && (!selected(body.financingPreferences).includes("Seller Financing")||x.sellerFinancingAvailable===true));
    return NextResponse.json({total:matches.length,results:matches.slice(0,30).map(x=>({reference:x.listingReference,county:x.county,businessType:x.businessCategory,licenseType:x.licenseType,price:x.packagePrice,href:x.listingTier==="market"?businessMarketRecordHref(x):x.href,source:x.listingTier==="market"?"Independent Market View":"Featured Listing"}))},{headers:{"Cache-Control":"no-store"}});
  } catch {return NextResponse.json({error:"Unable to search listings."},{status:400});}
}