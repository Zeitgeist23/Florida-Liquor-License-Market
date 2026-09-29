import "server-only";

import { getTinyFishRun, tinyFishConfigured } from "@/lib/tinyfish-ucc-search";

const TINYFISH_AGENT_ASYNC_URL = "https://agent.tinyfish.ai/v1/automation/run-async";

export type OwnerResearchResult = {
  confidence?: number;
  business_name?: string;
  legal_entity_name?: string;
  business_type?: string;
  city?: string;
  county?: string;
  owner_name?: string;
  owner_email?: string;
  owner_phone?: string;
  website_url?: string;
  license_type?: string;
  license_number?: string;
  license_modifier?: string;
  quota_status?: "quota" | "non_quota" | "uncertain";
  broker_name?: string;
  brokerage?: string;
  source_urls?: string[];
  ownership_notes?: string;
  candidates?: Array<{ business_name?: string; confidence?: number; reason?: string }>;
  blocked_reason?: string;
  [key: string]: unknown;
};

export { tinyFishConfigured };

export async function startOwnerResearch(input: {
  sourceUrl: string;
  listingTitle?: string | null;
  county?: string | null;
  businessType?: string | null;
  licenseType?: string | null;
}) {
  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) throw new Error("TINYFISH_API_KEY is not configured.");

  const sourceUrl = input.sourceUrl.trim();
  if (!/^https?:\/\//i.test(sourceUrl)) throw new Error("A public source listing URL is required.");

  const goal = `
Research this single Florida business-for-sale listing using public sources only.

Source listing: ${sourceUrl}
Listing title: ${input.listingTitle || "not provided"}
County: ${input.county || "not provided"}
Business type: ${input.businessType || "not provided"}
Advertised license type: ${input.licenseType || "not provided"}

Goal:
1. Identify the most likely real business behind the confidential or partially confidential listing.
2. Treat identification as uncertain unless corroborated by multiple independent clues.
3. Verify the business/entity and ownership through public records such as Florida Sunbiz, official Florida DBPR/ABT records, county property records, the business website, USPTO filings, and other reputable public sources.
4. Verify the alcoholic-beverage license classification carefully. A 4COP-SFS/SRX is NOT a transferable 4COP Quota license merely because the rank says 4COP.
5. Find only publicly available business/professional contact details for an owner or authorized member. Do not seek private residential contact data.
6. Do not contact anyone and do not submit forms or payments.

Return ONLY JSON:
{
  "confidence": 0,
  "business_name": "",
  "legal_entity_name": "",
  "business_type": "",
  "city": "",
  "county": "",
  "owner_name": "",
  "owner_email": "",
  "owner_phone": "",
  "website_url": "",
  "license_type": "",
  "license_number": "",
  "license_modifier": "",
  "quota_status": "quota|non_quota|uncertain",
  "broker_name": "",
  "brokerage": "",
  "source_urls": [],
  "ownership_notes": "",
  "candidates": [
    {"business_name":"","confidence":0,"reason":""}
  ],
  "blocked_reason": ""
}

Confidence should reflect the identification match, not the reliability of the individual sources.
If the evidence does not support one clear business, leave business_name blank and return candidates instead.
`.trim();

  const response = await fetch(TINYFISH_AGENT_ASYNC_URL, {
    method: "POST",
    headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      url: sourceUrl,
      goal,
      browser_profile: "stealth",
      agent_config: { max_duration_seconds: 300 },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });

  const text = await response.text();
  if (!response.ok) throw new Error(`TinyFish returned HTTP ${response.status}: ${text.slice(0, 700)}`);
  const data = JSON.parse(text) as { run_id?: string | null; error?: unknown };
  if (!data.run_id) throw new Error("TinyFish did not return a research run ID.");
  return { runId: data.run_id };
}

export async function collectOwnerResearch(runId: string) {
  const run = await getTinyFishRun(runId);
  return {
    ...run,
    result: run.result && typeof run.result === "object" ? run.result as OwnerResearchResult : {},
  };
}
