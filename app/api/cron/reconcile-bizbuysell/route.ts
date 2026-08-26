import { NextRequest, NextResponse } from "next/server";
import { reconcileBizBuySellInventory } from "@/lib/bizbuysell-inventory-discovery";
import { publishDiscoveredListings } from "@/lib/discovered-listing-store";
import {
  beginDiscoveryRun,
  finishDiscoveryRun,
  recordDiscoveryCandidates
} from "@/lib/listing-discovery-log";

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

  const runId = await beginDiscoveryRun("bizbuysell-inventory-reconciliation");
  try {
    const tavilyApiKey = process.env.TAVILY_API_KEY?.trim();
    if (!tavilyApiKey) {
      const response = { enabled: false, message: "TAVILY_API_KEY is not configured." };
      await finishDiscoveryRun(runId, "succeeded", response);
      return NextResponse.json(response);
    }
    if (process.env.AUTO_DISCOVERY_ENABLED === "false") {
      const response = { enabled: false, message: "Automatic public-web discovery is disabled." };
      await finishDiscoveryRun(runId, "succeeded", response);
      return NextResponse.json(response);
    }

    const result = await reconcileBizBuySellInventory(tavilyApiKey);
    const publish = await publishDiscoveredListings(result.qualifiedListings);
    await recordDiscoveryCandidates(runId, result.reviewCandidates);

    const response = {
      enabled: true,
      countyBatch: result.countyBatch,
      searchedCounties: result.searchedCounties,
      searchResults: result.searchResults,
      qualified: result.qualifiedListings.length,
      inserted: publish.inserted,
      refreshedExisting: publish.refreshedExisting,
      priceUpdated: publish.priceUpdated,
      statusUpdated: publish.statusUpdated,
      skippedDuplicateCandidate: publish.skippedDuplicateCandidate,
      manualReviewCandidates: result.manualReviewCandidates,
      rejectedResults: result.rejectedResults,
      failedCounties: result.failedCounties,
      databaseConfigured: publish.databaseConfigured
    };

    await finishDiscoveryRun(runId, "succeeded", response);
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await finishDiscoveryRun(runId, "failed", {}, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
