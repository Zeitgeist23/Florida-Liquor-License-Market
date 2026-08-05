import { NextRequest, NextResponse } from "next/server";
import {
  beginDiscoveryRun,
  finishDiscoveryRun
} from "@/lib/listing-discovery-log";
import { refreshKnownListings } from "@/lib/listing-refresh";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runId = await beginDiscoveryRun("known-listing-refresh");
  try {
    const tavilyApiKey = process.env.TAVILY_API_KEY?.trim();
    if (!tavilyApiKey) {
      const response = { enabled: false, message: "TAVILY_API_KEY is not configured." };
      await finishDiscoveryRun(runId, "succeeded", response);
      return NextResponse.json(response);
    }

    const result = await refreshKnownListings(tavilyApiKey);
    const response = { enabled: true, ...result };
    await finishDiscoveryRun(runId, "succeeded", response);
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await finishDiscoveryRun(runId, "failed", {}, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
