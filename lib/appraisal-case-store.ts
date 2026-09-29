import "server-only";

import { randomBytes } from "node:crypto";

export type AppraisalStatus =
  | "INTAKE"
  | "DBPR_VERIFIED"
  | "LIEN_RESEARCH"
  | "MARKET_RESEARCH"
  | "VALUATION"
  | "REVIEW"
  | "APPROVED"
  | "ISSUED";

export type AppraisalReviewStatus = "pending" | "ready" | "approved" | "changes_required";

export type AppraisalComparable = {
  reference: string;
  county: string;
  licenseType: string;
  price: number;
  sourceName?: string | null;
  sourceUrl?: string | null;
  tier: "A" | "B" | "C" | "D";
  evidenceType: "verified_transaction" | "active_asking_price" | "historical_listing" | "supplemental_market";
  included: boolean;
  note?: string | null;
};

export type AppraisalCase = {
  id: string;
  caseRef: string;
  orderRef: string | null;
  methodologyVersion: string;
  status: AppraisalStatus;
  clientName: string | null;
  intendedUse: string | null;
  institutionName: string | null;
  effectiveDate: string | null;
  licenseNumber: string;
  licenseType: string | null;
  ownerName: string | null;
  dba: string | null;
  county: string | null;
  city: string | null;
  series: string | null;
  modifier: string | null;
  primaryStatus: string | null;
  secondaryStatus: string | null;
  expirationDate: string | null;
  dbprVerifiedAt: string | null;
  dbprSnapshot: Record<string, unknown>;
  marketSnapshot: Record<string, unknown>;
  comparables: AppraisalComparable[];
  automatedValue: number | null;
  automatedValueBasis: string | null;
  reviewerAdjustment: number;
  adjustmentReason: string | null;
  finalValue: number | null;
  reviewerNotes: string | null;
  reviewStatus: AppraisalReviewStatus;
  approvedAt: string | null;
  issuedAt: string | null;
  revision: number;
  issuedSnapshot: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
};

type Row = {
  id: string;
  case_ref: string;
  order_ref: string | null;
  methodology_version: string;
  status: AppraisalStatus;
  client_name: string | null;
  intended_use: string | null;
  institution_name: string | null;
  effective_date: string | null;
  license_number: string;
  license_type: string | null;
  owner_name: string | null;
  dba: string | null;
  county: string | null;
  city: string | null;
  series: string | null;
  modifier: string | null;
  primary_status: string | null;
  secondary_status: string | null;
  expiration_date: string | null;
  dbpr_verified_at: string | null;
  dbpr_snapshot: Record<string, unknown> | null;
  market_snapshot: Record<string, unknown> | null;
  comparables: AppraisalComparable[] | null;
  automated_value: number | null;
  automated_value_basis: string | null;
  reviewer_adjustment: number | null;
  adjustment_reason: string | null;
  final_value: number | null;
  reviewer_notes: string | null;
  review_status: AppraisalReviewStatus;
  approved_at: string | null;
  issued_at: string | null;
  revision: number;
  issued_snapshot: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

function requireDatabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("The appraisal workflow database is not configured.");
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

function toCase(row: Row): AppraisalCase {
  return {
    id: row.id,
    caseRef: row.case_ref,
    orderRef: row.order_ref,
    methodologyVersion: row.methodology_version,
    status: row.status,
    clientName: row.client_name,
    intendedUse: row.intended_use,
    institutionName: row.institution_name,
    effectiveDate: row.effective_date,
    licenseNumber: row.license_number,
    licenseType: row.license_type,
    ownerName: row.owner_name,
    dba: row.dba,
    county: row.county,
    city: row.city,
    series: row.series,
    modifier: row.modifier,
    primaryStatus: row.primary_status,
    secondaryStatus: row.secondary_status,
    expirationDate: row.expiration_date,
    dbprVerifiedAt: row.dbpr_verified_at,
    dbprSnapshot: row.dbpr_snapshot || {},
    marketSnapshot: row.market_snapshot || {},
    comparables: row.comparables || [],
    automatedValue: row.automated_value,
    automatedValueBasis: row.automated_value_basis,
    reviewerAdjustment: row.reviewer_adjustment || 0,
    adjustmentReason: row.adjustment_reason,
    finalValue: row.final_value,
    reviewerNotes: row.reviewer_notes,
    reviewStatus: row.review_status,
    approvedAt: row.approved_at,
    issuedAt: row.issued_at,
    revision: row.revision || 0,
    issuedSnapshot: row.issued_snapshot,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function makeAppraisalCaseRef(licenseNumber: string) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const cleanLicense = licenseNumber.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(-12);
  const token = randomBytes(3).toString("hex").toUpperCase();
  return `FLLM-APP-${date}-${cleanLicense}-${token}`;
}

export async function listAppraisalCases(limit = 100) {
  const safeLimit = Math.max(1, Math.min(200, Math.round(limit)));
  const response = await fetch(
    endpoint(`appraisal_cases?select=*&order=created_at.desc&limit=${safeLimit}`),
    { headers: headers(), cache: "no-store" },
  );
  if (!response.ok) throw new Error(`Could not load appraisal cases: ${response.status} ${await response.text()}`);
  return ((await response.json()) as Row[]).map(toCase);
}

export async function getAppraisalCase(id: string) {
  const response = await fetch(
    endpoint(`appraisal_cases?id=eq.${encodeURIComponent(id)}&select=*&limit=1`),
    { headers: headers(), cache: "no-store" },
  );
  if (!response.ok) throw new Error(`Could not load appraisal case: ${response.status} ${await response.text()}`);
  const rows = (await response.json()) as Row[];
  return rows[0] ? toCase(rows[0]) : null;
}

export async function createAppraisalCase(values: Record<string, unknown>) {
  const response = await fetch(endpoint("appraisal_cases"), {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(values),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not create appraisal case: ${response.status} ${await response.text()}`);
  const rows = (await response.json()) as Row[];
  if (!rows[0]) throw new Error("The appraisal case was not returned.");
  const appraisalCase = toCase(rows[0]);
  await addAppraisalEvent(appraisalCase.id, "CASE_CREATED", { caseRef: appraisalCase.caseRef });
  return appraisalCase;
}

export async function updateAppraisalCase(id: string, values: Record<string, unknown>, eventType?: string, eventPayload?: Record<string, unknown>) {
  const patch = { ...values, updated_at: new Date().toISOString() };
  const response = await fetch(
    endpoint(`appraisal_cases?id=eq.${encodeURIComponent(id)}`),
    {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify(patch),
      cache: "no-store",
    },
  );
  if (!response.ok) throw new Error(`Could not update appraisal case: ${response.status} ${await response.text()}`);
  const rows = (await response.json()) as Row[];
  if (!rows[0]) throw new Error("The updated appraisal case was not returned.");
  if (eventType) await addAppraisalEvent(id, eventType, eventPayload || values);
  return toCase(rows[0]);
}

export async function addAppraisalEvent(appraisalCaseId: string, eventType: string, eventPayload: Record<string, unknown> = {}) {
  const response = await fetch(endpoint("appraisal_case_events"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      appraisal_case_id: appraisalCaseId,
      event_type: eventType,
      event_payload: eventPayload,
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(`Could not save appraisal event: ${response.status} ${await response.text()}`);
  }
}

export async function listAppraisalEvents(appraisalCaseId: string, limit = 100) {
  const response = await fetch(
    endpoint(
      `appraisal_case_events?appraisal_case_id=eq.${encodeURIComponent(appraisalCaseId)}&select=*&order=created_at.desc&limit=${Math.max(1, Math.min(limit, 200))}`,
    ),
    { headers: headers(), cache: "no-store" },
  );
  if (!response.ok) throw new Error(`Could not load appraisal events: ${response.status}`);
  return (await response.json()) as Array<{
    id: number;
    appraisal_case_id: string;
    event_type: string;
    event_payload: Record<string, unknown>;
    created_at: string;
  }>;
}

export async function latestLienSearchForAppraisal(caseRef: string) {
  const response = await fetch(
    endpoint(
      `appraisal_lien_searches?appraisal_ref=eq.${encodeURIComponent(caseRef)}&select=*&order=created_at.desc&limit=1`,
    ),
    { headers: headers(), cache: "no-store" },
  );
  if (!response.ok) throw new Error(`Could not load appraisal lien search: ${response.status}`);
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows[0] || null;
}
