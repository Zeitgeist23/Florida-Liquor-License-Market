import "server-only";

import { listMarketIntelligence, saveMarketIntelligence, type MarketIntelligenceRecord } from "@/lib/market-intelligence-store";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type IdentityCandidate = {
  id: string;
  business_name: string;
  legal_entity_name: string | null;
  county: string;
  city: string | null;
  business_type: string | null;
  license_type: string | null;
  license_number: string | null;
  address: string | null;
  established_year: number | null;
  square_feet: number | null;
  seats: number | null;
  employees: number | null;
  monthly_rent: number | null;
  gross_revenue: number | null;
  sde_cash_flow: number | null;
  operating_days: string[] | null;
  keywords: string[];
  source_urls: string[];
  source_record_reference: string | null;
  active: boolean;
};

export type IdentityFacts = {
  listing_reference: string;
  established_year: number | null;
  square_feet: number | null;
  seats: number | null;
  employees: number | null;
  monthly_rent: number | null;
  operating_days: string[] | null;
  keywords: string[];
  notes: string | null;
};

export type IdentitySignal = {
  label: string;
  weight: number;
  detail: string;
};

export type IdentityResolutionResult = {
  candidate_id: string;
  candidate_name: string;
  score: number;
  confidence: number;
  band: "near-certain" | "strong" | "probable" | "speculative" | "weak";
  matched_signals: IdentitySignal[];
  contradictions: IdentitySignal[];
  margin_to_runner_up?: number;
};

function settings() {
  return supabaseServiceSettings("FLLM identity-resolution engine is unavailable.");
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
    throw new Error(`Identity-resolution database error: ${response.status} ${await response.text()}`);
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

function norm(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function words(value?: string | null) {
  return new Set(norm(value).split(" ").filter((x) => x.length > 2));
}

function textSimilarity(a?: string | null, b?: string | null) {
  const aa = words(a);
  const bb = words(b);
  if (!aa.size || !bb.size) return 0;
  let common = 0;
  for (const token of aa) if (bb.has(token)) common += 1;
  return common / Math.max(aa.size, bb.size);
}

function licenseFamily(value?: string | null) {
  const v = norm(value);
  if (!v) return "";
  if (v.includes("3ps")) return "3ps";
  if (v.includes("4cop") && (v.includes("sfs") || v.includes("srx"))) return "4cop-sfs";
  if (v.includes("4cop")) return "4cop-quota";
  if (v.includes("2cop")) return "2cop";
  return v;
}

function pctDelta(a?: number | null, b?: number | null) {
  if (!a || !b) return null;
  return Math.abs(a - b) / Math.max(a, b);
}

function addMatch(out: IdentitySignal[], label: string, weight: number, detail: string) {
  out.push({ label, weight, detail });
  return weight;
}

function addConflict(out: IdentitySignal[], label: string, weight: number, detail: string) {
  out.push({ label, weight: -Math.abs(weight), detail });
  return -Math.abs(weight);
}

function band(confidence: number): IdentityResolutionResult["band"] {
  if (confidence >= 95) return "near-certain";
  if (confidence >= 90) return "strong";
  if (confidence >= 80) return "probable";
  if (confidence >= 65) return "speculative";
  return "weak";
}

function confidenceFromScore(score: number, contradictions: IdentitySignal[]) {
  const hardPenalty = contradictions.some((x) => Math.abs(x.weight) >= 25) ? 8 : 0;
  return Math.max(0, Math.min(99, Math.round(50 + score * 0.9 - hardPenalty)));
}

function candidateText(c: IdentityCandidate) {
  return [
    c.business_name,
    c.legal_entity_name,
    c.business_type,
    c.license_type,
    c.city,
    c.county,
    ...(c.keywords || []),
  ].filter(Boolean).join(" ");
}

function listingText(r: MarketIntelligenceRecord, facts: IdentityFacts | null) {
  return [
    r.source_listing_title,
    r.business_type,
    r.license_type,
    r.city,
    r.county,
    r.identification_basis,
    r.notes,
    ...(facts?.keywords || []),
    facts?.notes,
  ].filter(Boolean).join(" ");
}

export function scoreCandidate(
  listing: MarketIntelligenceRecord,
  candidate: IdentityCandidate,
  facts: IdentityFacts | null,
): IdentityResolutionResult {
  let score = 0;
  const matched: IdentitySignal[] = [];
  const contradictions: IdentitySignal[] = [];

  if (listing.county && candidate.county) {
    if (norm(listing.county) === norm(candidate.county)) {
      score += addMatch(matched, "county", 12, `Exact county: ${listing.county}`);
    } else {
      score += addConflict(contradictions, "county", 35, `${listing.county} vs ${candidate.county}`);
    }
  }

  if (listing.city && candidate.city) {
    if (norm(listing.city) === norm(candidate.city)) {
      score += addMatch(matched, "city", 9, `Exact city: ${listing.city}`);
    } else {
      score += addConflict(contradictions, "city", 8, `${listing.city} vs ${candidate.city}`);
    }
  }

  const lf = licenseFamily(listing.license_type);
  const cf = licenseFamily(candidate.license_type);
  if (lf && cf) {
    if (lf === cf) {
      score += addMatch(matched, "license class", 18, `Matching ${lf}`);
    } else {
      score += addConflict(contradictions, "license class", 30, `${lf} vs ${cf}`);
    }
  }

  if (listing.license_number && candidate.license_number) {
    if (norm(listing.license_number) === norm(candidate.license_number)) {
      score += addMatch(matched, "license number", 45, `Exact license # ${listing.license_number}`);
    } else {
      score += addConflict(contradictions, "license number", 45, "Different license numbers");
    }
  }

  if (listing.business_type && candidate.business_type) {
    const sim = textSimilarity(listing.business_type, candidate.business_type);
    if (sim >= 0.6) score += addMatch(matched, "business type", 10, candidate.business_type);
  }

  if (facts?.established_year && candidate.established_year) {
    const delta = Math.abs(facts.established_year - candidate.established_year);
    if (delta === 0) score += addMatch(matched, "established year", 14, `Exact year ${facts.established_year}`);
    else if (delta <= 1) score += addMatch(matched, "established year", 9, `Within 1 year (${facts.established_year} vs ${candidate.established_year})`);
    else if (delta <= 3) score += addMatch(matched, "established year", 4, `Within 3 years (${facts.established_year} vs ${candidate.established_year})`);
    else if (delta >= 8) score += addConflict(contradictions, "established year", 15, `${facts.established_year} vs ${candidate.established_year}`);
  }

  const numericChecks: Array<[keyof IdentityFacts, keyof IdentityCandidate, string, number]> = [
    ["square_feet", "square_feet", "square feet", 14],
    ["seats", "seats", "seat count", 8],
    ["employees", "employees", "employees", 6],
    ["monthly_rent", "monthly_rent", "monthly rent", 8],
  ];
  for (const [fk, ck, label, maxWeight] of numericChecks) {
    const a = facts?.[fk] as number | null | undefined;
    const b = candidate[ck] as number | null | undefined;
    const d = pctDelta(a, b);
    if (d === null) continue;
    if (d <= 0.03) score += addMatch(matched, label, maxWeight, `${a} vs ${b}`);
    else if (d <= 0.1) score += addMatch(matched, label, Math.round(maxWeight * 0.65), `${a} vs ${b}`);
    else if (d <= 0.2) score += addMatch(matched, label, Math.round(maxWeight * 0.3), `${a} vs ${b}`);
    else if (d >= 0.5) score += addConflict(contradictions, label, Math.round(maxWeight * 0.8), `${a} vs ${b}`);
  }

  const economics: Array<[number | null, number | null, string, number]> = [
    [listing.gross_revenue, candidate.gross_revenue, "gross revenue", 8],
    [listing.sde_cash_flow, candidate.sde_cash_flow, "SDE / cash flow", 8],
  ];
  for (const [a, b, label, maxWeight] of economics) {
    const d = pctDelta(a, b);
    if (d === null) continue;
    if (d <= 0.05) score += addMatch(matched, label, maxWeight, `${a} vs ${b}`);
    else if (d <= 0.15) score += addMatch(matched, label, Math.round(maxWeight * 0.6), `${a} vs ${b}`);
    else if (d >= 0.5) score += addConflict(contradictions, label, Math.round(maxWeight * 0.65), `${a} vs ${b}`);
  }

  if (facts?.operating_days?.length && candidate.operating_days?.length) {
    const a = [...facts.operating_days].map(norm).sort().join("|");
    const b = [...candidate.operating_days].map(norm).sort().join("|");
    if (a === b) score += addMatch(matched, "operating days", 10, facts.operating_days.join(", "));
  }

  const textScore = textSimilarity(listingText(listing, facts), candidateText(candidate));
  if (textScore >= 0.12) {
    const weight = Math.min(14, Math.max(3, Math.round(textScore * 25)));
    score += addMatch(matched, "concept / keyword overlap", weight, `${Math.round(textScore * 100)}% token overlap`);
  }

  const confidence = confidenceFromScore(score, contradictions);
  return {
    candidate_id: candidate.id,
    candidate_name: candidate.business_name,
    score,
    confidence,
    band: band(confidence),
    matched_signals: matched.sort((a, b) => b.weight - a.weight),
    contradictions: contradictions.sort((a, b) => a.weight - b.weight),
  };
}

function extractKeywords(record: MarketIntelligenceRecord) {
  const source = [
    record.business_name,
    record.source_listing_title,
    record.business_type,
    record.license_type,
    record.city,
    record.identification_basis,
  ].filter(Boolean).join(" ");
  return Array.from(words(source)).slice(0, 40);
}

export async function syncKnownIdentitiesToCandidatePool() {
  const records = await listMarketIntelligence();
  const rows = records
    .filter((r) => r.business_name && r.county)
    .map((r) => ({
      business_name: r.business_name!,
      legal_entity_name: r.legal_entity_name,
      county: r.county,
      city: r.city,
      business_type: r.business_type,
      license_type: r.license_type,
      license_number: r.license_number,
      gross_revenue: r.gross_revenue,
      sde_cash_flow: r.sde_cash_flow,
      keywords: extractKeywords(r),
      source_urls: Array.from(new Set([
        ...(r.source_urls || []),
        r.dbpr_url,
        r.sunbiz_url,
        r.property_url,
      ].filter(Boolean) as string[])),
      source_record_reference: r.listing_reference,
      active: r.market_status === "active",
      updated_at: new Date().toISOString(),
    }));

  if (!rows.length) return 0;

  await rest("identity_resolution_candidates?on_conflict=source_record_reference", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  });
  return rows.length;
}

export async function saveIdentityFacts(input: IdentityFacts) {
  await rest("market_intelligence_identity_facts?on_conflict=listing_reference", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ ...input, updated_at: new Date().toISOString() }),
  });
}

async function loadFacts(listingReference: string) {
  const rows = await rest<IdentityFacts[]>(
    `market_intelligence_identity_facts?listing_reference=eq.${encodeURIComponent(listingReference)}&select=*`,
  );
  return rows[0] || null;
}

async function loadCandidates(listing: MarketIntelligenceRecord) {
  const county = encodeURIComponent(listing.county);
  return rest<IdentityCandidate[]>(
    `identity_resolution_candidates?active=eq.true&county=eq.${county}&select=*&limit=1000`,
  );
}

async function persistResults(listingReference: string, results: IdentityResolutionResult[], autoAppliedId?: string) {
  const rows = results.slice(0, 10).map((r) => ({
    listing_reference: listingReference,
    candidate_id: r.candidate_id,
    candidate_name: r.candidate_name,
    score: r.score,
    confidence: r.confidence,
    band: r.band,
    matched_signals: r.matched_signals,
    contradictions: r.contradictions,
    auto_applied: r.candidate_id === autoAppliedId,
  }));
  if (!rows.length) return;
  await rest("identity_resolution_runs", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(rows),
  });
}

export async function runIdentityResolution(listingReference: string, options?: { autoApply?: boolean }) {
  const records = await listMarketIntelligence();
  const listing = records.find((r) => r.listing_reference === listingReference);
  if (!listing) throw new Error("Listing reference not found.");

  await syncKnownIdentitiesToCandidatePool();

  const [facts, candidates] = await Promise.all([
    loadFacts(listingReference),
    loadCandidates(listing),
  ]);

  const results = candidates
    .filter((c) => c.source_record_reference !== listingReference)
    .map((c) => scoreCandidate(listing, c, facts))
    .sort((a, b) => b.confidence - a.confidence || b.score - a.score);

  if (results[0] && results[1]) {
    results[0].margin_to_runner_up = results[0].confidence - results[1].confidence;
  }

  const winner = results[0];
  let autoApplied = false;
  if (
    options?.autoApply &&
    winner &&
    winner.confidence >= 90 &&
    (winner.margin_to_runner_up ?? 100) >= 10 &&
    !winner.contradictions.some((x) => Math.abs(x.weight) >= 25)
  ) {
    const candidate = candidates.find((c) => c.id === winner.candidate_id);
    if (candidate) {
      await saveMarketIntelligence({
        listing_reference: listingReference,
        county: listing.county,
        business_type: listing.business_type,
        business_name: candidate.business_name,
        legal_entity_name: candidate.legal_entity_name,
        city: listing.city || candidate.city,
        license_number: listing.license_number || candidate.license_number,
        license_type: listing.license_type || candidate.license_type,
        identification_confidence: winner.confidence,
        verification_status: winner.confidence >= 95 ? "probable" : "unverified",
        identification_basis: [
          "FLLM IDENTITY ENGINE AUTO-MATCH.",
          ...winner.matched_signals.slice(0, 8).map((s) => `${s.label}: ${s.detail}.`),
          ...winner.contradictions.slice(0, 4).map((s) => `Conflict — ${s.label}: ${s.detail}.`),
        ].join(" "),
      });
      autoApplied = true;
    }
  }

  await persistResults(listingReference, results, autoApplied ? winner?.candidate_id : undefined);

  return {
    listing_reference: listingReference,
    facts,
    result_count: results.length,
    auto_applied: autoApplied,
    results: results.slice(0, 10),
  };
}

export async function recentIdentityRuns(listingReference: string) {
  return rest<unknown[]>(
    `identity_resolution_runs?listing_reference=eq.${encodeURIComponent(listingReference)}&select=*&order=created_at.desc&limit=10`,
  );
}
