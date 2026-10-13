import { NextRequest, NextResponse } from "next/server";

import { notifyMatchingBusinessBuyerAlerts, currentBusinessAlertMatches } from "@/lib/business-buyer-alert-notifications";
import { activeBusinessBuyerAlerts } from "@/lib/business-buyer-alert-store";

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
      return NextResponse.json({ok:true,dryRun:true,emailsSent:0,alertsChecked:matched.length,matched});
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
