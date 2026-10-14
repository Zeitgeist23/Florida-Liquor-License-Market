import { NextResponse } from "next/server";
import { supabaseServiceSettings } from "@/lib/supabase-settings";
import { currentBusinessAlertMatches, publishedBusinessAlertInventory } from "@/lib/business-buyer-alert-notifications";
import type { BusinessBuyerAlert } from "@/lib/business-buyer-alert-store";
export const dynamic="force-dynamic";
export const runtime="nodejs";
export async function GET() {
  try {
    const target=publishedBusinessAlertInventory().find(x=>x.packagePriceNumber>0);
    if(!target) return NextResponse.json({ok:false,syntheticMatch:false,reason:"No published inventory"},{status:503});
    const sample:BusinessBuyerAlert={
      id:"in-memory-health",submission_ref:"SYNTHETIC-NOT-SAVED",first_name:"Synthetic",last_name:"Test",
      email:"nobody@example.invalid",phone:"",business_types:[target.businessCategory],
      license_types:[target.licenseType],counties:[target.county],max_purchase_price:target.packagePriceNumber,
      min_gross_revenue:null,min_sde:null,min_ebitda:null,financing_preferences:["Any"],
      notes:"",source_market_view_ref:"",source_market_view_url:"",status:"active",
      unsubscribe_token:"",notified_listing_refs:[],created_at:"",updated_at:""
    };
    const matches=await currentBusinessAlertMatches(sample);
    const {url,key}=supabaseServiceSettings("Rate cache unavailable");
    const response=await fetch(`${url}/rest/v1/sba_prime_rate_cache?series_id=eq.DPRIME&select=observation_date,annual_rate&limit=1`,{cache:"no-store",headers:{apikey:key,Authorization:`Bearer ${key}`}});
    if(!response.ok)throw new Error("Rate lookup failed");
    const rate=(await response.json() as Array<{observation_date:string;annual_rate:number|string}>)[0];
    const ageDays=rate?Math.floor((Date.now()-Date.parse(rate.observation_date+"T00:00:00Z"))/86400000):null;
    const syntheticMatch=matches.some(x=>x.listing.listingReference===target.listingReference);
    const pendingFirstRun=matches.filter(x=>!sample.notified_listing_refs.includes(x.listing.listingReference));
    const alreadyNotified={...sample,notified_listing_refs:pendingFirstRun.map(x=>x.listing.listingReference)};
    const pendingSecondRun=matches.filter(x=>!alreadyNotified.notified_listing_refs.includes(x.listing.listingReference));
    const duplicatePreventionPass=pendingFirstRun.length>0&&pendingSecondRun.length===0;
    return NextResponse.json({ok:syntheticMatch && duplicatePreventionPass && ageDays!==null && ageDays>=0 && ageDays<=14,syntheticMatch,duplicatePreventionPass,firstRunPending:pendingFirstRun.length,secondRunPending:pendingSecondRun.length,rateCacheAvailable:!!rate,rateObservationAgeDays:ageDays,emailsSent:0,recordsCreated:0},{headers:{"Cache-Control":"no-store"}});
  } catch (error) {
    console.error("Buyer matching synthetic smoke check failed",error);
    return NextResponse.json({ok:false,syntheticMatch:false,emailsSent:0,recordsCreated:0},{status:503,headers:{"Cache-Control":"no-store"}});
  }
}
