import { NextResponse } from "next/server";
import { sendFllmEmail } from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LeadRow = {
  submission_ref: string;
  full_name: string;
  email: string;
  phone: string | null;
  county: string;
  listing_title: string | null;
  live_listing_ref: string | null;
  created_at: string;
  message: string | null;
};

type Details = {
  kind?: string;
  buyerMessage?: string;
  notification?: { status?: string; providerMessageId?: string; error?: string };
  reconciliation?: { attempts?: number; lastAttemptAt?: string; status?: string };
  followUp?: { status?: string };
  [key: string]: unknown;
};

const DESTINATION = "listings@floridaliquorlicensemarket.com";
const MAX_RETRIES = 3;
const MAX_PER_RUN = 30;
const SUPPRESSED_EMAILS = new Set(["tindesanctis1@gmail.com"]);
const CLOSED_STATUSES = new Set(["completed", "complete", "handled", "contacted", "resolved", "closed", "do not contact", "do_not_contact", "opted out", "opted_out", "referred", "duplicate", "no follow-up"]);
function normalizedEmail(email: string) { return email.trim().toLowerCase(); }


function headers(extra: Record<string, string> = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!key || !process.env.SUPABASE_URL) throw new Error("Supabase service credentials unavailable");
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...extra };
}
function endpoint(path: string) {
  return `${process.env.SUPABASE_URL}/rest/v1/${path}`;
}
function parse(raw: string | null): Details {
  try { return JSON.parse(raw || "{}") as Details; } catch { return {}; }
}
async function saveStatus(row: LeadRow, details: Details, status: "provider_accepted" | "failed", messageId?: string, error?: string) {
  const previous = details.reconciliation || {};
  const next: Details = { ...details,
    reconciliation: {
      attempts: (previous.attempts || 0) + 1,
      lastAttemptAt: new Date().toISOString(),
      status,
    },
  };
  if (status === "failed") next.reconciliationError = (error || "Unspecified mail transport error").slice(0, 400);
  if (messageId) next.reconciliationMessageId = messageId;
  const res = await fetch(endpoint(`listing_submissions?submission_ref=eq.${encodeURIComponent(row.submission_ref)}`), {
    method: "PATCH", headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify({ message: JSON.stringify(next), updated_at: new Date().toISOString() }), cache: "no-store",
  });
  if (!res.ok) throw new Error(`Reconciliation status update failed ${res.status}`);
}

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const since = new Date(Date.now() - 30 * 86400000).toISOString();
    const url = endpoint(`listing_submissions?select=submission_ref,full_name,email,phone,county,listing_title,live_listing_ref,created_at,message&submission_ref=like.FLLM-BUYER-*&created_at=gte.${encodeURIComponent(since)}&order=created_at.asc&limit=500`);
    const response = await fetch(url, { headers: headers(), cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load buyer leads: ${response.status}`);
    const rows = (await response.json()) as LeadRow[];
    // Retry explicitly failed original notifications only. Missing legacy audit data
    // is not proof of failed delivery and must not trigger bulk re-emailing.
    const candidates = rows.filter(row => {
      const d = parse(row.message);
      if (d.kind !== "buyer_inquiry") return false;
      const email = normalizedEmail(row.email);
      if (!email || email === "jwigg023@gmail.com" || SUPPRESSED_EMAILS.has(email)) return false;
      if (CLOSED_STATUSES.has(String(d.followUp?.status || "").trim().toLowerCase())) return false;
      if (d.notification?.status === "provider_accepted" || d.reconciliation?.status === "provider_accepted") return false;
      if ((d.reconciliation?.attempts || 0) >= MAX_RETRIES) return false;
      return d.notification?.status === "failed" || d.reconciliation?.status === "failed";
    });
    // Preserve both submissions in storage, but send only one notice per buyer
    // and listing per run.
    const seen = new Set<string>();
    const actionable = candidates.filter(row => {
      const key = normalizedEmail(row.email) + "|" + (row.live_listing_ref || row.listing_title || row.county).trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, MAX_PER_RUN);
    let accepted = 0, failed = 0;
    for (const row of actionable) {
      const d = parse(row.message);
      const note = String(d.buyerMessage || "No buyer message provided").slice(0, 5000);
      const subject = `FLLM Buyer Inquiry Follow-Up — ${row.live_listing_ref || row.submission_ref}`;
      const text = `Internal FLLM lead follow-up (no outside forwarding)\nLead: ${row.submission_ref}\nBuyer: ${row.full_name}\nEmail: ${row.email}\nPhone: ${row.phone || "Not provided"}\nListing: ${row.listing_title || row.live_listing_ref || "Not provided"}\nSubmitted: ${row.created_at}\nOriginal message: ${note}\nStatus: ${d.followUp?.status || "Follow-up required"}`;
      try {
        const sent = await sendFllmEmail({ to: DESTINATION, subject, text,
          html: `<div style="font-family:Arial,sans-serif;white-space:pre-wrap">${text.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}</div>` });
        await saveStatus(row, d, "provider_accepted", sent?.id);
        accepted++;
      } catch (e) {
        await saveStatus(row, d, "failed", undefined, e instanceof Error ? e.message : "Transport error");
        failed++;
      }
    }
    return NextResponse.json({ ok: true, scanned: rows.length, attempted: actionable.length, providerAccepted: accepted, failed, note: "Provider accepted does not guarantee inbox delivery" });
  } catch (error) {
    console.error("Internal buyer inquiry reconciliation failed", error);
    return NextResponse.json({ error: "Internal buyer inquiry reconciliation failed" }, { status: 500 });
  }
}
