import { NextRequest, NextResponse } from "next/server";

import { researchScheduledIdentityBatch } from "@/lib/identity-web-research";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

function authorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await researchScheduledIdentityBatch(3);
    return NextResponse.json({
      ok: true,
      researched: results.length,
      results,
      ran_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Automated identity research failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Automated identity research failed." },
      { status: 500 },
    );
  }
}
