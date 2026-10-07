import { NextRequest, NextResponse } from "next/server";

import { notifyMatchingBusinessBuyerAlerts } from "@/lib/business-buyer-alert-notifications";

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
