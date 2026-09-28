import "server-only";

export type UccStatus =
  | "not_run"
  | "running"
  | "no_filings_reported"
  | "filings_found"
  | "error"
  | "configuration_required";

export type AbtLienStatus =
  | "not_requested"
  | "ready_to_request"
  | "requested"
  | "clear"
  | "lien_found"
  | "inconclusive";

export type ReviewStatus = "pending" | "reviewed" | "needs_follow_up";

export type AppraisalLienSearch = {
  id: string;
  appraisalRef: string | null;
  licenseNumber: string;
  ownerName: string | null;
  dba: string | null;
  county: string | null;
  series: string | null;
  dbprPrimaryStatus: string | null;
  dbprSecondaryStatus: string | null;
  uccStatus: UccStatus;
  uccDebtorNames: string[];
  uccSearchedAt: string | null;
  uccResult: Record<string, unknown>;
  abtStatus: AbtLienStatus;
  abtRequestedAt: string | null;
  abtReceivedAt: string | null;
  abtResultSummary: string | null;
  reviewStatus: ReviewStatus;
  reviewedAt: string | null;
  reviewerNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

type Row = {
  id: string;
  appraisal_ref: string | null;
  license_number: string;
  owner_name: string | null;
  dba: string | null;
  county: string | null;
  series: string | null;
  dbpr_primary_status: string | null;
  dbpr_secondary_status: string | null;
  ucc_status: UccStatus;
  ucc_debtor_names: string[] | null;
  ucc_searched_at: string | null;
  ucc_result: Record<string, unknown> | null;
  abt_status: AbtLienStatus;
  abt_requested_at: string | null;
  abt_received_at: string | null;
  abt_result_summary: string | null;
  review_status: ReviewStatus;
  reviewed_at: string | null;
  reviewer_notes: string | null;
  created_at: string;
  updated_at: string;
};

function requireDatabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("The appraisal lien-search database is not configured.");
  }
}

function endpoint(path: string) {
  requireDatabase();
  return `${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/${path}`;
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function toItem(row: Row): AppraisalLienSearch {
  return {
    id: row.id,
    appraisalRef: row.appraisal_ref,
    licenseNumber: row.license_number,
    ownerName: row.owner_name,
    dba: row.dba,
    county: row.county,
    series: row.series,
    dbprPrimaryStatus: row.dbpr_primary_status,
    dbprSecondaryStatus: row.dbpr_secondary_status,
    uccStatus: row.ucc_status,
    uccDebtorNames: row.ucc_debtor_names || [],
    uccSearchedAt: row.ucc_searched_at,
    uccResult: row.ucc_result || {},
    abtStatus: row.abt_status,
    abtRequestedAt: row.abt_requested_at,
    abtReceivedAt: row.abt_received_at,
    abtResultSummary: row.abt_result_summary,
    reviewStatus: row.review_status,
    reviewedAt: row.reviewed_at,
    reviewerNotes: row.reviewer_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listAppraisalLienSearches(limit = 50) {
  const safeLimit = Math.max(1, Math.min(100, Math.round(limit)));
  const response = await fetch(
    endpoint(`appraisal_lien_searches?select=*&order=created_at.desc&limit=${safeLimit}`),
    { headers: headers(), cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error(`Could not load lien searches: ${response.status} ${await response.text()}`);
  }
  return ((await response.json()) as Row[]).map(toItem);
}

export async function createAppraisalLienSearch(input: {
  appraisalRef?: string | null;
  licenseNumber: string;
  ownerName?: string | null;
  dba?: string | null;
  county?: string | null;
  series?: string | null;
  dbprPrimaryStatus?: string | null;
  dbprSecondaryStatus?: string | null;
  uccDebtorNames?: string[];
  uccStatus?: UccStatus;
  abtStatus?: AbtLienStatus;
}) {
  const now = new Date().toISOString();
  const row = {
    appraisal_ref: input.appraisalRef || null,
    license_number: input.licenseNumber,
    owner_name: input.ownerName || null,
    dba: input.dba || null,
    county: input.county || null,
    series: input.series || null,
    dbpr_primary_status: input.dbprPrimaryStatus || null,
    dbpr_secondary_status: input.dbprSecondaryStatus || null,
    ucc_debtor_names: input.uccDebtorNames || [],
    ucc_status: input.uccStatus || "not_run",
    abt_status: input.abtStatus || "ready_to_request",
    updated_at: now,
  };
  const response = await fetch(endpoint("appraisal_lien_searches"), {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not create lien search: ${response.status} ${await response.text()}`);
  }
  const rows = (await response.json()) as Row[];
  if (!rows[0]) throw new Error("The lien-search record was not returned.");
  return toItem(rows[0]);
}

export async function updateAppraisalLienSearch(
  id: string,
  values: {
    uccStatus?: UccStatus;
    uccDebtorNames?: string[];
    uccSearchedAt?: string | null;
    uccResult?: Record<string, unknown>;
    abtStatus?: AbtLienStatus;
    abtRequestedAt?: string | null;
    abtReceivedAt?: string | null;
    abtResultSummary?: string | null;
    reviewStatus?: ReviewStatus;
    reviewedAt?: string | null;
    reviewerNotes?: string | null;
  },
) {
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (values.uccStatus !== undefined) patch.ucc_status = values.uccStatus;
  if (values.uccDebtorNames !== undefined) patch.ucc_debtor_names = values.uccDebtorNames;
  if (values.uccSearchedAt !== undefined) patch.ucc_searched_at = values.uccSearchedAt;
  if (values.uccResult !== undefined) patch.ucc_result = values.uccResult;
  if (values.abtStatus !== undefined) patch.abt_status = values.abtStatus;
  if (values.abtRequestedAt !== undefined) patch.abt_requested_at = values.abtRequestedAt;
  if (values.abtReceivedAt !== undefined) patch.abt_received_at = values.abtReceivedAt;
  if (values.abtResultSummary !== undefined) patch.abt_result_summary = values.abtResultSummary;
  if (values.reviewStatus !== undefined) patch.review_status = values.reviewStatus;
  if (values.reviewedAt !== undefined) patch.reviewed_at = values.reviewedAt;
  if (values.reviewerNotes !== undefined) patch.reviewer_notes = values.reviewerNotes;

  const response = await fetch(
    endpoint(`appraisal_lien_searches?id=eq.${encodeURIComponent(id)}`),
    {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify(patch),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`Could not update lien search: ${response.status} ${await response.text()}`);
  }
  const rows = (await response.json()) as Row[];
  if (!rows[0]) throw new Error("The updated lien-search record was not returned.");
  return toItem(rows[0]);
}
