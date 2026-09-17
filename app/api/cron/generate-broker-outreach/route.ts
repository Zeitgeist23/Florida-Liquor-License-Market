import { NextRequest, NextResponse } from "next/server";

import { generateWeeklyBrokerCampaign } from "@/lib/broker-outreach";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

function authorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await generateWeeklyBrokerCampaign(false);
    return NextResponse.json({
      campaign: result.campaign,
      drafts: result.messages.length,
      created: result.created,
      note: "Drafts only. No broker outreach email is sent by the weekly cron.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
