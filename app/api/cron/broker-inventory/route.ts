import { NextRequest, NextResponse } from "next/server";

import { ingestWsrFloridaInventory } from "@/lib/broker-inventory-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

function authorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const cursorParam = request.nextUrl.searchParams.get("cursor");
    const result = await ingestWsrFloridaInventory({
      batchSize: 60,
      cursor: cursorParam === null ? undefined : Number(cursorParam),
    });
    return NextResponse.json({ ok: true, ...result, ran_at: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Broker inventory ingestion failed." }, { status: 500 });
  }
}
