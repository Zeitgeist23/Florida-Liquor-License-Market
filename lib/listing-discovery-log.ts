import "server-only";

import type { DiscoveryCandidate } from "@/lib/listing-discovery";

type RunStatus = "running" | "succeeded" | "failed";

type RunRow = {
  id: string;
};

function databaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra
  };
}

async function safeRequest(url: string, init: RequestInit): Promise<Response | null> {
  try {
    const response = await fetch(url, { ...init, cache: "no-store" });
    if (!response.ok) {
      console.warn(`Discovery log request failed: ${response.status} ${await response.text()}`);
      return null;
    }
    return response;
  } catch (error) {
    console.warn("Discovery log request failed", error);
    return null;
  }
}

export async function beginDiscoveryRun(jobName: string): Promise<string | null> {
  if (!databaseConfigured()) return null;

  const response = await safeRequest(
    `${process.env.SUPABASE_URL}/rest/v1/listing_discovery_runs`,
    {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ job_name: jobName, status: "running" satisfies RunStatus })
    }
  );
  if (!response) return null;

  const rows = (await response.json()) as RunRow[];
  return rows[0]?.id ?? null;
}

export async function finishDiscoveryRun(
  runId: string | null,
  status: Exclude<RunStatus, "running">,
  summary: Record<string, unknown>,
  error?: string
): Promise<void> {
  if (!runId || !databaseConfigured()) return;

  await safeRequest(
    `${process.env.SUPABASE_URL}/rest/v1/listing_discovery_runs?id=eq.${encodeURIComponent(runId)}`,
    {
      method: "PATCH",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify({
        status,
        completed_at: new Date().toISOString(),
        summary,
        error_text: error ?? null
      })
    }
  );
}

export async function recordDiscoveryCandidates(
  runId: string | null,
  candidates: DiscoveryCandidate[]
): Promise<void> {
  if (!databaseConfigured() || candidates.length === 0) return;

  const now = new Date().toISOString();
  await safeRequest(
    `${process.env.SUPABASE_URL}/rest/v1/listing_discovery_candidates?on_conflict=source_url`,
    {
      method: "POST",
      headers: headers({ Prefer: "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify(candidates.map((candidate) => ({
        source_url: candidate.sourceUrl,
        source_id: candidate.sourceId,
        source_name: candidate.sourceName,
        title: candidate.title,
        reason: candidate.reason,
        relevance_score: candidate.score,
        county: candidate.county,
        license_type: candidate.licenseType,
        price: candidate.price,
        last_seen_at: now,
        last_run_id: runId
      })))
    }
  );
}
