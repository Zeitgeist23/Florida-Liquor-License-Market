import "server-only";

import { listMarketIntelligence, saveMarketIntelligence, type MarketIntelligenceRecord } from "@/lib/market-intelligence-store";
import { runIdentityResolution } from "@/lib/identity-resolution-engine";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

type TavilyResult = {
  title?: string;
  url?: string;
  content?: string;
  raw_content?: string | null;
  score?: number;
};

type TavilyResponse = { results?: TavilyResult[] };

type WebEvidenceRow = {
  id?: string;
  listing_reference: string;
  query: string;
  url: string;
  title: string | null;
  snippet: string | null;
  raw_text: string | null;
  source_domain: string | null;
  candidate_name: string | null;
  tavily_score: number | null;
};

function settings() {
  return supabaseServiceSettings("FLLM web identity research is unavailable.");
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

function endpoint(path: string) {
  const { url } = settings();
  return `${url}/rest/v1/${path}`;
}

async function rest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(endpoint(path), {
    cache: "no-store",
    ...init,
    headers: headers(init?.headers || {}),
  });
  if (!response.ok) {
    throw new Error(`Identity web research database error: ${response.status} ${await response.text()}`);
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

function clean(value?: string | null) {
  return (value || "").replace(/\s+/g, " ").trim();
}

function hostname(value?: string | null) {
  try {
    return new URL(value || "").hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function money(value: number | null) {
  return value ? `$${Math.round(value).toLocaleString("en-US")}` : "";
}

function exactNumbers(record: MarketIntelligenceRecord) {
  const values = [
    record.asking_price,
    record.gross_revenue,
    record.sde_cash_flow,
  ].filter((x): x is number => typeof x === "number" && x > 0);
  return values.map(money).filter(Boolean);
}

async function factsFor(listingReference: string) {
  const rows = await rest<Array<{
    established_year: number | null;
    square_feet: number | null;
    seats: number | null;
    employees: number | null;
    monthly_rent: number | null;
    operating_days: string[] | null;
    keywords: string[] | null;
    notes: string | null;
  }>>(
    `market_intelligence_identity_facts?listing_reference=eq.${encodeURIComponent(listingReference)}&select=*`,
  );
  return rows[0] || null;
}

function quote(value: string) {
  return value.includes(" ") ? `"${value}"` : value;
}

function buildQueries(record: MarketIntelligenceRecord, facts: Awaited<ReturnType<typeof factsFor>>) {
  const geography = [record.city, record.county, "Florida"].filter(Boolean).join(" ");
  const base = [
    record.business_type,
    record.license_type,
    geography,
  ].filter(Boolean).join(" ");

  const numerics = [
    facts?.square_feet ? `${facts.square_feet} SF` : "",
    facts?.seats ? `${facts.seats} seats` : "",
    facts?.monthly_rent ? `rent ${money(facts.monthly_rent)}` : "",
    ...exactNumbers(record),
  ].filter(Boolean);

  const keywordSlice = (facts?.keywords || []).slice(0, 5).join(" ");
  const title = clean(record.source_listing_title);
  const queries = new Set<string>();

  if (title) queries.add(`${quote(title)} ${geography}`);
  queries.add(`${base} ${numerics.slice(0, 3).join(" ")}`.trim());
  if (keywordSlice) queries.add(`${geography} ${record.business_type} ${keywordSlice} ${numerics.slice(0, 2).join(" ")}`.trim());
  if (record.license_number) queries.add(`"${record.license_number}" Florida business`);
  if (record.business_name) {
    queries.add(`"${record.business_name}" ${geography} ${record.license_type || ""}`.trim());
  }

  return Array.from(queries).filter((q) => q.length >= 12).slice(0, 5);
}

async function tavilySearch(apiKey: string, query: string): Promise<TavilyResult[]> {
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      search_depth: "advanced",
      max_results: 10,
      topic: "general",
      include_answer: false,
      include_raw_content: "text",
      include_images: false,
      country: "united states",
      auto_parameters: false,
      safe_search: true,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) throw new Error(`Tavily search returned ${response.status}`);
  const body = await response.json() as TavilyResponse;
  return Array.isArray(body.results) ? body.results : [];
}

const genericTitle = /business for sale|restaurant for sale|bar for sale|liquor license|bizbuysell|bizquest|loopnet|tripadvisor|yelp|facebook|instagram|menu|home page|official site/i;

function candidateFromTitle(title?: string | null) {
  const value = clean(title);
  if (!value || genericTitle.test(value)) return null;
  const segment = value
    .split(/\s+[|–—-]\s+/)[0]
    .replace(/^(welcome to|official site of)\s+/i, "")
    .replace(/\s+(restaurant|bar|grill|cafe|lounge|liquors?|tavern|pub)\s+(in|near)\s+.+$/i, "")
    .trim();
  if (segment.length < 3 || segment.length > 90) return null;
  if (segment.split(/\s+/).length > 10) return null;
  return segment;
}

function occurrenceScore(text: string, name: string) {
  const hay = text.toLowerCase();
  const needle = name.toLowerCase();
  if (!needle || needle.length < 4) return 0;
  let score = 0;
  let pos = hay.indexOf(needle);
  while (pos >= 0) {
    score += 1;
    pos = hay.indexOf(needle, pos + needle.length);
  }
  return score;
}

async function upsertEvidence(runId: string, rows: WebEvidenceRow[]) {
  if (!rows.length) return;
  const payload = rows.map((r) => ({
    ...r,
    research_run_id: runId,
    raw_text: r.raw_text?.slice(0, 12000) || null,
    snippet: r.snippet?.slice(0, 3000) || null,
  }));
  await rest("identity_web_evidence?on_conflict=listing_reference,url", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(payload),
  });
}

async function createRun(listingReference: string, queries: string[]) {
  const rows = await rest<Array<{ id: string }>>("identity_web_research_runs", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      listing_reference: listingReference,
      status: "running",
      queries,
      started_at: new Date().toISOString(),
    }),
  });
  return rows[0]?.id;
}

async function finishRun(id: string, patch: Record<string, unknown>) {
  await rest(`identity_web_research_runs?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ ...patch, completed_at: new Date().toISOString() }),
  });
}

async function knownCandidates(county: string) {
  return rest<Array<{
    business_name: string;
    legal_entity_name: string | null;
    source_record_reference: string | null;
  }>>(
    `identity_resolution_candidates?county=eq.${encodeURIComponent(county)}&active=eq.true&select=business_name,legal_entity_name,source_record_reference&limit=1000`,
  );
}

async function addDiscoveredCandidates(record: MarketIntelligenceRecord, evidence: WebEvidenceRow[]) {
  const discovered = new Map<string, { name: string; urls: string[]; keywords: string[] }>();
  for (const row of evidence) {
    const name = row.candidate_name;
    if (!name) continue;
    const key = name.toLowerCase();
    const existing = discovered.get(key) || { name, urls: [], keywords: [] };
    if (!existing.urls.includes(row.url)) existing.urls.push(row.url);
    const sourceWords = `${row.title || ""} ${row.snippet || ""}`.toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((x) => x.length > 3)
      .slice(0, 30);
    existing.keywords.push(...sourceWords);
    discovered.set(key, existing);
  }

  const rows = Array.from(discovered.values()).slice(0, 20).map((x) => ({
    business_name: x.name,
    county: record.county,
    city: record.city,
    business_type: null,
    license_type: null,
    license_number: null,
    keywords: Array.from(new Set(x.keywords)).slice(0, 40),
    source_urls: x.urls,
    source_record_reference: null,
    active: true,
    updated_at: new Date().toISOString(),
  }));

  if (rows.length) {
    await rest("identity_resolution_candidates", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(rows),
    });
  }
  return rows.length;
}

export async function researchIdentityOnOpenWeb(
  listingReference: string,
  options?: { autoApply?: boolean },
) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) throw new Error("TAVILY_API_KEY is not configured.");

  const records = await listMarketIntelligence();
  const record = records.find((r) => r.listing_reference === listingReference);
  if (!record) throw new Error("Listing reference not found.");

  const facts = await factsFor(listingReference);
  const queries = buildQueries(record, facts);
  const runId = await createRun(listingReference, queries);
  if (!runId) throw new Error("Could not create web-research run.");

  try {
    const settled = await Promise.allSettled(queries.map((query) => tavilySearch(apiKey, query)));
    const resultRows: Array<{ query: string; item: TavilyResult }> = [];
    settled.forEach((result, index) => {
      if (result.status !== "fulfilled") return;
      for (const item of result.value) resultRows.push({ query: queries[index], item });
    });

    const dedup = new Map<string, { query: string; item: TavilyResult }>();
    for (const row of resultRows) {
      const url = clean(row.item.url);
      if (!url) continue;
      if (!dedup.has(url) || (row.item.score || 0) > (dedup.get(url)?.item.score || 0)) dedup.set(url, row);
    }

    const candidates = await knownCandidates(record.county);
    const evidence: WebEvidenceRow[] = [];
    for (const { query, item } of dedup.values()) {
      const url = clean(item.url);
      const text = clean([item.title, item.content, item.raw_content].filter(Boolean).join(" "));
      let candidateName: string | null = null;

      let bestMentions = 0;
      for (const candidate of candidates) {
        const mentions = occurrenceScore(text, candidate.business_name)
          + occurrenceScore(text, candidate.legal_entity_name || "");
        if (mentions > bestMentions) {
          bestMentions = mentions;
          candidateName = candidate.business_name;
        }
      }
      candidateName ||= candidateFromTitle(item.title);

      evidence.push({
        listing_reference: listingReference,
        query,
        url,
        title: clean(item.title) || null,
        snippet: clean(item.content) || null,
        raw_text: clean(item.raw_content) || null,
        source_domain: hostname(url),
        candidate_name: candidateName,
        tavily_score: typeof item.score === "number" ? item.score : null,
      });
    }

    await upsertEvidence(runId, evidence);
    const discoveredCount = await addDiscoveredCandidates(record, evidence);

    const engine = await runIdentityResolution(listingReference, { autoApply: Boolean(options?.autoApply) });
    const best = engine.results?.[0] || null;

    if (record.business_name) {
      const supporting = evidence.filter((e) =>
        occurrenceScore(`${e.title || ""} ${e.snippet || ""} ${e.raw_text || ""}`, record.business_name || "") > 0
      );
      const independentDomains = new Set(supporting.map((e) => e.source_domain).filter(Boolean));
      const current = record.identification_confidence || 0;
      const researchFloor = independentDomains.size >= 4 ? 94
        : independentDomains.size >= 3 ? 92
        : independentDomains.size >= 2 ? 90
        : current;
      if (researchFloor > current) {
        await saveMarketIntelligence({
          listing_reference: listingReference,
          identification_confidence: researchFloor,
          identification_basis: [
            record.identification_basis || "",
            `AUTOMATED OPEN-WEB AUDIT: ${supporting.length} supporting result(s) across ${independentDomains.size} independent domain(s) mentioned the current best-guess identity.`,
          ].filter(Boolean).join(" "),
        });
      }
    }

    await finishRun(runId, {
      status: "completed",
      pages_found: evidence.length,
      candidates_discovered: discoveredCount,
      best_candidate: best?.candidate_name || record.business_name || null,
      best_confidence: best?.confidence || record.identification_confidence || null,
      auto_applied: Boolean(engine.auto_applied),
    });

    return {
      listing_reference: listingReference,
      queries,
      pages_found: evidence.length,
      candidates_discovered: discoveredCount,
      best_candidate: best?.candidate_name || null,
      best_confidence: best?.confidence || null,
      auto_applied: Boolean(engine.auto_applied),
      results: engine.results || [],
      evidence: evidence.slice(0, 20),
    };
  } catch (error) {
    await finishRun(runId, {
      status: "failed",
      error_message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

export async function researchPriorityIdentityQueue(limit = 4) {
  const records = await listMarketIntelligence();
  const targets = records
    .filter((r) => !r.business_name || (r.identification_confidence || 0) < 90)
    .sort((a, b) => (a.identification_confidence || 0) - (b.identification_confidence || 0))
    .slice(0, Math.max(1, Math.min(limit, 6)));

  const output = [];
  for (const target of targets) {
    try {
      output.push(await researchIdentityOnOpenWeb(target.listing_reference, { autoApply: true }));
    } catch (error) {
      output.push({
        listing_reference: target.listing_reference,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return output;
}

export async function researchScheduledIdentityBatch(limit = 3) {
  const records = await listMarketIntelligence();
  const recentRuns = await rest<Array<{ listing_reference: string; started_at: string }>>(
    "identity_web_research_runs?select=listing_reference,started_at&order=started_at.desc&limit=2000",
  );

  const lastRun = new Map<string, number>();
  for (const run of recentRuns) {
    if (lastRun.has(run.listing_reference)) continue;
    const ts = new Date(run.started_at).getTime();
    if (Number.isFinite(ts)) lastRun.set(run.listing_reference, ts);
  }

  const now = Date.now();
  const staleAfterMs = 14 * 24 * 60 * 60 * 1000;
  const targets = records
    .filter((r) => {
      const last = lastRun.get(r.listing_reference) || 0;
      return !r.business_name
        || (r.identification_confidence || 0) < 95
        || now - last > staleAfterMs;
    })
    .sort((a, b) => {
      const aPriority = !a.business_name ? -100 : (a.identification_confidence || 0);
      const bPriority = !b.business_name ? -100 : (b.identification_confidence || 0);
      if (aPriority !== bPriority) return aPriority - bPriority;
      return (lastRun.get(a.listing_reference) || 0) - (lastRun.get(b.listing_reference) || 0);
    })
    .slice(0, Math.max(1, Math.min(limit, 4)));

  const output = [];
  for (const target of targets) {
    try {
      output.push(await researchIdentityOnOpenWeb(target.listing_reference, { autoApply: true }));
    } catch (error) {
      output.push({
        listing_reference: target.listing_reference,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return output;
}

export async function recentWebResearch(listingReference: string) {
  return rest<unknown[]>(
    `identity_web_research_runs?listing_reference=eq.${encodeURIComponent(listingReference)}&select=*&order=started_at.desc&limit=10`,
  );
}
