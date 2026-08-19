import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EMAIL = "chenna_raja@yahoo.com";
const IMPORT_TOKEN = "fllm-6c91e7d4-bb2a-4f81-a36b-7e2f4d11b8e3";

function headers(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function endpoint(pathAndQuery: string) {
  return `${process.env.SUPABASE_URL}/rest/v1/${pathAndQuery}`;
}

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("token") !== IMPORT_TOKEN) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const existingResponse = await fetch(
    endpoint(`listing_submissions?email=eq.${encodeURIComponent(EMAIL)}&select=id,submission_ref,email&order=created_at.desc&limit=1`),
    { headers: headers(), cache: "no-store" },
  );

  if (!existingResponse.ok) {
    return NextResponse.json(
      { error: `Could not check existing lead: ${existingResponse.status} ${await existingResponse.text()}` },
      { status: 500 },
    );
  }

  const existing = (await existingResponse.json()) as Array<{ id: string; submission_ref: string; email: string }>;
  if (existing[0]) {
    return NextResponse.json({ ok: true, alreadyExists: true, leadReference: existing[0].submission_ref });
  }

  const submissionRef = `FLLM-BUYER-INQUIRY-20260818-${randomBytes(4).toString("hex").toUpperCase()}`;
  const createdAt = "2026-08-18T18:49:00.000Z";
  const row = {
    submission_ref: submissionRef,
    full_name: "chenna",
    first_name: "chenna",
    email: EMAIL,
    phone: "15105054674",
    county: "Hernando County",
    license_type: "3PS / 4COP Quota",
    asking_price: null,
    asking_price_text: null,
    license_status: "Buyer inquiry",
    preferred_timing: null,
    message: JSON.stringify({
      kind: "contact_inquiry",
      inquiryType: "General Inquiry",
      notes: "Hi There, what is the current market price for Hernando 3ps/4cop license please. Thanks chenna",
    }),
    status: "pending_payment",
    payment_email_status: "pending",
    approval_email_status: "pending",
    listing_title: "Hernando County 3PS/4COP market price inquiry",
    created_at: createdAt,
    updated_at: createdAt,
  };

  const insertResponse = await fetch(endpoint("listing_submissions"), {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!insertResponse.ok) {
    return NextResponse.json(
      { error: `Could not add lead: ${insertResponse.status} ${await insertResponse.text()}` },
      { status: 500 },
    );
  }

  const inserted = (await insertResponse.json()) as Array<{ id: string; submission_ref: string }>;
  return NextResponse.json({ ok: true, alreadyExists: false, leadReference: inserted[0]?.submission_ref ?? submissionRef });
}
