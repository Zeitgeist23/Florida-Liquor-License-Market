import "server-only";

const TINYFISH_AGENT_URL = "https://agent.tinyfish.ai/v1/automation/run";
const TINYFISH_AGENT_ASYNC_URL = "https://agent.tinyfish.ai/v1/automation/run-async";
const TINYFISH_RUN_URL = "https://agent.tinyfish.ai/v1/runs";
const FLORIDA_UCC_SEARCH_URL = "https://floridaucc.com/search";

export function tinyFishConfigured() {
  return Boolean(process.env.TINYFISH_API_KEY);
}

function parseJsonCandidate(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  const unfenced = trimmed
    .replace(/^\`\`\`(?:json)?\s*/i, "")
    .replace(/\s*\`\`\`$/, "");
  try {
    return JSON.parse(unfenced);
  } catch {
    const first = unfenced.indexOf("{");
    const last = unfenced.lastIndexOf("}");
    if (first >= 0 && last > first) {
      try {
        return JSON.parse(unfenced.slice(first, last + 1));
      } catch {
        return { raw_text: trimmed };
      }
    }
    return { raw_text: trimmed };
  }
}

export type TinyFishUccSearchResult = {
  debtorName: string;
  completed: boolean;
  payload: unknown;
  rawStatus: string | null;
  error: string | null;
};

export async function searchFloridaUccDebtor(
  debtorName: string,
): Promise<TinyFishUccSearchResult> {
  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) {
    return {
      debtorName,
      completed: false,
      payload: {},
      rawStatus: null,
      error: "TINYFISH_API_KEY is not configured.",
    };
  }

  const goal = `
Use only the public Florida Secured Transaction Registry search at floridaucc.com.
Search the exact debtor name: "${debtorName}".
This is a single-record appraisal due-diligence search, not bulk crawling.
Do not purchase reports, submit payments, or modify any public record.
Return ONLY JSON with this shape:
{
  "searched_name": "",
  "search_method": "exact debtor name",
  "filings": [
    {
      "filing_number": "",
      "filing_date": "",
      "status": "",
      "debtor_names": [],
      "secured_parties": [],
      "collateral_summary": "",
      "source_url": ""
    }
  ],
  "source_urls": [],
  "notes": "",
  "blocked_reason": ""
}
If no filings are displayed, return an empty filings array and explain that the result is only the public UCC search, not an ABT-6023 license-lien certification.
If the site blocks or prevents completion, return an empty filings array and put the reason in blocked_reason.
`.trim();

  try {
    const response = await fetch(TINYFISH_AGENT_URL, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: FLORIDA_UCC_SEARCH_URL,
        goal,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(100_000),
    });

    const text = await response.text();
    if (!response.ok) {
      return {
        debtorName,
        completed: false,
        payload: { response_text: text.slice(0, 12000) },
        rawStatus: null,
        error: `TinyFish returned HTTP ${response.status}.`,
      };
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      data = { result: text };
    }

    const rawStatus = typeof data.status === "string" ? data.status : null;
    const result = "result" in data ? data.result : data;
    const payload = parseJsonCandidate(result);
    const completed = rawStatus ? rawStatus.toUpperCase() === "COMPLETED" : true;

    return {
      debtorName,
      completed,
      payload,
      rawStatus,
      error:
        typeof data.error === "string" && data.error
          ? data.error
          : completed
            ? null
            : "TinyFish did not complete the UCC search.",
    };
  } catch (error) {
    return {
      debtorName,
      completed: false,
      payload: {},
      rawStatus: null,
      error: error instanceof Error ? error.message : "TinyFish UCC search failed.",
    };
  }
}

export function countReportedUccFilings(payload: unknown) {
  if (!payload || typeof payload !== "object") return 0;
  const filings = (payload as { filings?: unknown }).filings;
  return Array.isArray(filings) ? filings.length : 0;
}


export type TinyFishAsyncRun = {
  debtorName: string;
  runId: string | null;
  error: string | null;
};

export async function startFloridaUccDebtorSearch(
  debtorName: string,
): Promise<TinyFishAsyncRun> {
  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) {
    return { debtorName, runId: null, error: "TINYFISH_API_KEY is not configured." };
  }

  const goal = `
Use only the public Florida Secured Transaction Registry search at floridaucc.com.
Search the exact debtor name: "${debtorName}".
This is a single-record appraisal due-diligence search, not bulk crawling.
Do not purchase reports, submit payments, or modify any public record.
Return ONLY JSON with this shape:
{
  "searched_name": "",
  "search_method": "exact debtor name",
  "filings": [
    {
      "filing_number": "",
      "filing_date": "",
      "status": "",
      "debtor_names": [],
      "secured_parties": [],
      "collateral_summary": "",
      "source_url": ""
    }
  ],
  "source_urls": [],
  "notes": "",
  "blocked_reason": ""
}
If no filings are displayed, return an empty filings array and explain that the result is only the public UCC search, not an ABT-6023 license-lien certification.
If the site blocks or prevents completion, return an empty filings array and put the reason in blocked_reason.
`.trim();

  try {
    const response = await fetch(TINYFISH_AGENT_ASYNC_URL, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: FLORIDA_UCC_SEARCH_URL,
        goal,
        agent_config: { max_duration_seconds: 300 },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    const text = await response.text();
    if (!response.ok) {
      return {
        debtorName,
        runId: null,
        error: `TinyFish returned HTTP ${response.status}: ${text.slice(0, 600)}`,
      };
    }
    const data = JSON.parse(text) as { run_id?: string | null; error?: unknown };
    return {
      debtorName,
      runId: data.run_id || null,
      error: data.run_id ? null : "TinyFish did not return a run ID.",
    };
  } catch (error) {
    return {
      debtorName,
      runId: null,
      error: error instanceof Error ? error.message : "Could not start TinyFish UCC search.",
    };
  }
}

export async function getTinyFishRun(runId: string) {
  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) throw new Error("TINYFISH_API_KEY is not configured.");

  const response = await fetch(`${TINYFISH_RUN_URL}/${encodeURIComponent(runId)}`, {
    headers: { "X-API-Key": apiKey },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`TinyFish run lookup returned HTTP ${response.status}: ${text.slice(0, 600)}`);
  }
  const data = JSON.parse(text) as {
    run_id: string;
    status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED";
    result?: unknown;
    error?: unknown;
  };
  return {
    runId: data.run_id,
    status: data.status,
    result: parseJsonCandidate(data.result),
    error: data.error ?? null,
  };
}
