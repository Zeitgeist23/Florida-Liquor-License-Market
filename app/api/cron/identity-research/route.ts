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

function batchSize() {
  const parsed = Number(process.env.IDENTITY_RESEARCH_BATCH_SIZE || "4");
  if (!Number.isFinite(parsed)) return 4;
  return Math.max(1, Math.min(6, Math.round(parsed)));
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (process.env.IDENTITY_RESEARCH_ENABLED === "false") {
    return NextResponse.json({
      ok: true,
      enabled: false,
      researched: 0,
      message: "Automated identity research is disabled by IDENTITY_RESEARCH_ENABLED.",
      ran_at: new Date().toISOString(),
    });
  }

  if (!process.env.TAVILY_API_KEY?.trim()) {
    return NextResponse.json({
      ok: true,
      enabled: false,
      researched: 0,
      message: "TAVILY_API_KEY is not configured.",
      ran_at: new Date().toISOString(),
    });
  }

  try {
    const limit = batchSize();
    const results = await researchScheduledIdentityBatch(limit);
    return NextResponse.json({
      ok: true,
      enabled: true,
      batch_size: limit,
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
