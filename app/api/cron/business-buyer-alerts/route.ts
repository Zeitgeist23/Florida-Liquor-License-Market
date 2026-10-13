import { NextRequest, NextResponse } from "next/server";

import { notifyMatchingBusinessBuyerAlerts, currentBusinessAlertMatches } from "@/lib/business-buyer-alert-notifications";
import { activeBusinessBuyerAlerts, type BusinessBuyerAlert } from "@/lib/business-buyer-alert-store";
import { publishedBusinessAlertInventory } from "@/lib/business-buyer-alert-notifications";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

function authorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if(request.nextUrl.searchParams.get("dry_run")==="1"){
      const alerts=await activeBusinessBuyerAlerts();
      const matched=await Promise.all(alerts.map(async alert=>({reference:alert.submission_ref,matchingCount:(await currentBusinessAlertMatches(alert)).length})));
      let syntheticTest = null;
      if(request.nextUrl.searchParams.get("synthetic")==="1"){
        const target=publishedBusinessAlertInventory().find(x=>x.packagePriceNumber>0);
        if(target){
          const sample:BusinessBuyerAlert={
            id:"synthetic",submission_ref:"TEST-NOT-SAVED",first_name:"Test",last_name:"Only",email:"test@example.invalid",phone:"",
            business_types:[target.businessCategory],license_types:[target.licenseType],counties:[target.county],
            max_purchase_price:target.packagePriceNumber,min_gross_revenue:null,min_sde:null,min_ebitda:null,
            financing_preferences:["Any"],notes:"",source_market_view_ref:"",source_market_view_url:"",
            status:"active",unsubscribe_token:"",notified_listing_refs:[],created_at:"",updated_at:""
          };
          const matches=await currentBusinessAlertMatches(sample);
          syntheticTest={matched:matches.some(x=>x.listing.listingReference===target.listingReference),matchingCount:matches.length};
        }
      }
      return NextResponse.json({ok:true,dryRun:true,emailsSent:0,alertsChecked:matched.length,matched,syntheticTest});
    }
    const result = await notifyMatchingBusinessBuyerAlerts();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Business buyer alert cron failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Business buyer alert scan failed." },
      { status: 500 },
    );
  }
}
