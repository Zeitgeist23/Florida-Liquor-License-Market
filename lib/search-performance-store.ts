import "server-only";

import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type SearchBaseline = {
  throughDate: string;
  clicks: number;
  impressions: number;
  sourceNote: string | null;
};

export type SearchDailyRow = {
  date: string;
  clicks: number;
  impressions: number;
  averagePosition: number | null;
  status: "finalized" | "preliminary" | "manual";
  sourceNote: string | null;
  createdAt: string;
  updatedAt: string;
};

function settings() {
  return supabaseServiceSettings("FLLM search performance database is not configured.");
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const { key } = settings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function request(path: string, init: RequestInit = {}) {
  const { url } = settings();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: headers(init.headers),
    cache: "no-store",
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Search performance request failed (${response.status}).`);
  }
  return response;
}

export async function getSearchPerformance() {
  const [baselineResponse, dailyResponse] = await Promise.all([
    request("search_console_baselines?id=eq.1&select=through_date,clicks,impressions,source_note"),
    request("search_console_daily?select=date,clicks,impressions,average_position,status,source_note,created_at,updated_at&order=date.desc"),
  ]);

  const baselineRows = await baselineResponse.json() as Array<{
    through_date: string;
    clicks: number;
    impressions: number;
    source_note: string | null;
  }>;
  const dailyRows = await dailyResponse.json() as Array<{
    date: string;
    clicks: number;
    impressions: number;
    average_position: number | string | null;
    status: SearchDailyRow["status"];
    source_note: string | null;
    created_at: string;
    updated_at: string;
  }>;

  const rawBaseline = baselineRows[0] ?? null;
  const baseline: SearchBaseline | null = rawBaseline ? {
    throughDate: rawBaseline.through_date,
    clicks: Number(rawBaseline.clicks),
    impressions: Number(rawBaseline.impressions),
    sourceNote: rawBaseline.source_note,
  } : null;

  const daily: SearchDailyRow[] = dailyRows.map((row) => ({
    date: row.date,
    clicks: Number(row.clicks),
    impressions: Number(row.impressions),
    averagePosition: row.average_position === null ? null : Number(row.average_position),
    status: row.status,
    sourceNote: row.source_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  const postBaseline = baseline
    ? daily.filter((row) => row.date > baseline.throughDate)
    : daily;

  const lifetimeClicks = (baseline?.clicks ?? 0) + postBaseline.reduce((sum, row) => sum + row.clicks, 0);
  const lifetimeImpressions = (baseline?.impressions ?? 0) + postBaseline.reduce((sum, row) => sum + row.impressions, 0);
  const lifetimeCtr = lifetimeImpressions ? (lifetimeClicks / lifetimeImpressions) * 100 : 0;

  const finalized = daily.filter((row) => row.status === "finalized");
  const bestClicks = finalized.reduce<SearchDailyRow | null>((best, row) => !best || row.clicks > best.clicks ? row : best, null);
  const bestImpressions = finalized.reduce<SearchDailyRow | null>((best, row) => !best || row.impressions > best.impressions ? row : best, null);

  return { baseline, daily, lifetimeClicks, lifetimeImpressions, lifetimeCtr, bestClicks, bestImpressions };
}

export async function upsertSearchDaily(input: {
  date: string;
  clicks: number;
  impressions: number;
  averagePosition?: number | null;
  status?: SearchDailyRow["status"];
  sourceNote?: string | null;
}) {
  const payload = {
    date: input.date,
    clicks: input.clicks,
    impressions: input.impressions,
    average_position: input.averagePosition ?? null,
    status: input.status ?? "finalized",
    source_note: input.sourceNote ?? null,
    updated_at: new Date().toISOString(),
  };

  await request("search_console_daily?on_conflict=date", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(payload),
  });
}
