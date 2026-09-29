import "server-only";

import { emailShell, sendFllmEmail } from "@/lib/fllm-email";
import { supabaseServiceSettings } from "@/lib/supabase-settings";
import { brokerFeaturedOwnerOutreachProtection } from "@/lib/owner-outreach-protection";

export type OwnerProspect = {
  id: string;
  business_name: string | null;
  legal_entity_name: string | null;
  owner_name: string | null;
  owner_email: string | null;
  owner_phone: string | null;
  website_url: string | null;
  business_type: string;
  county: string | null;
  city: string | null;
  license_type: string | null;
  license_number: string | null;
  source_platform: string | null;
  source_url: string | null;
  listing_title: string | null;
  listing_url: string | null;
  broker_name: string | null;
  brokerage: string | null;
  identification_confidence: number | null;
  research_status: string;
  research_run_id: string | null;
  research_result: Record<string, unknown>;
  source_urls: string[];
  ownership_notes: string | null;
  status: string;
  do_not_contact: boolean;
  last_contacted_at: string | null;
  next_contact_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OwnerMessage = {
  id: string;
  prospect_id: string;
  subject_line: string;
  body_text: string;
  body_html: string;
  status: string;
  sent_at: string | null;
  provider_message_id: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
};

const SITE_URL = "https://www.floridaliquorlicensemarket.com";

function settings() {
  return supabaseServiceSettings("Owner outreach database is unavailable.");
}
function headers(extra: HeadersInit = {}): HeadersInit {
  const { key } = settings();
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...extra };
}
function endpoint(path: string) {
  const { url } = settings();
  return `${url}/rest/v1/${path}`;
}
async function rest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(endpoint(path), { cache: "no-store", ...init, headers: headers(init?.headers || {}) });
  if (!response.ok) throw new Error(`Owner outreach database error: ${response.status} ${await response.text()}`);
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
function escapeHtml(value: string | null | undefined) {
  return (value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function ownerGreeting(name?: string | null) {
  const cleaned = (name || "").trim();
  return cleaned ? `Dear ${escapeHtml(cleaned)},` : "Hello,";
}
function businessLabel(p: OwnerProspect) {
  return p.business_name?.trim() || p.legal_entity_name?.trim() || "your business";
}

export async function listOwnerOutreachData() {
  const [allProspects, allMessages] = await Promise.all([
    rest<OwnerProspect[]>("owner_outreach_prospects?select=*&order=created_at.desc&limit=1000"),
    rest<OwnerMessage[]>("owner_outreach_messages?select=*&order=created_at.desc&limit=1000"),
  ]);
  const protectedIds = new Set(
    allProspects
      .filter((prospect) => brokerFeaturedOwnerOutreachProtection(prospect))
      .map((prospect) => prospect.id),
  );
  const prospects = allProspects.filter((prospect) => !protectedIds.has(prospect.id));
  const messages = allMessages.filter((message) => !protectedIds.has(message.prospect_id));
  return { prospects, messages };
}

export async function createOwnerProspect(input: Partial<OwnerProspect>) {
  const protection = brokerFeaturedOwnerOutreachProtection(input);
  if (protection) {
    throw new Error(
      `Owner outreach is blocked for ${protection.listingReference}. This is an FLLM broker featured listing represented by ${protection.brokerName}; use the broker relationship instead.`,
    );
  }

  const row = {
    business_name: input.business_name?.trim() || null,
    legal_entity_name: input.legal_entity_name?.trim() || null,
    owner_name: input.owner_name?.trim() || null,
    owner_email: input.owner_email?.trim().toLowerCase() || null,
    owner_phone: input.owner_phone?.trim() || null,
    website_url: input.website_url?.trim() || null,
    business_type: input.business_type?.trim() || "Restaurant",
    county: input.county?.trim() || null,
    city: input.city?.trim() || null,
    license_type: input.license_type?.trim() || null,
    license_number: input.license_number?.trim() || null,
    source_platform: input.source_platform?.trim() || null,
    source_url: input.source_url?.trim() || null,
    listing_title: input.listing_title?.trim() || null,
    listing_url: input.listing_url?.trim() || null,
    broker_name: input.broker_name?.trim() || null,
    brokerage: input.brokerage?.trim() || null,
    identification_confidence: input.identification_confidence ?? null,
    research_status: input.research_status || "new",
    research_run_id: input.research_run_id || null,
    research_result: input.research_result || {},
    source_urls: input.source_urls || [],
    ownership_notes: input.ownership_notes?.trim() || null,
    status: input.status || "new",
    do_not_contact: Boolean(input.do_not_contact),
    notes: input.notes?.trim() || null,
    updated_at: new Date().toISOString(),
  };
  const rows = await rest<OwnerProspect[]>("owner_outreach_prospects", {
    method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(row),
  });
  return rows[0];
}

export async function updateOwnerProspect(id: string, patch: Partial<OwnerProspect>) {
  const currentRows = await rest<OwnerProspect[]>(
    `owner_outreach_prospects?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
  );
  const current = currentRows[0];
  if (!current) throw new Error("Owner prospect not found.");

  const merged = { ...current, ...patch };
  const protection = brokerFeaturedOwnerOutreachProtection(merged);
  const allowed: Record<string, unknown> = {};
  for (const key of [
    "business_name","legal_entity_name","owner_name","owner_email","owner_phone","website_url","business_type","county","city",
    "license_type","license_number","source_platform","source_url","listing_title","listing_url","broker_name","brokerage",
    "identification_confidence","research_status","research_run_id","research_result","source_urls","ownership_notes","status",
    "do_not_contact","last_contacted_at","next_contact_at","notes",
  ] as const) {
    if (patch[key] !== undefined) allowed[key] = patch[key];
  }

  if (protection) {
    allowed.do_not_contact = true;
    allowed.status = "invalid";
    const protectedNote =
      `OWNER OUTREACH BLOCKED — ${protection.listingReference} is an FLLM broker featured listing represented by ${protection.brokerName}. Do not contact the owner directly from the FLLM owner-outreach system.`;
    const existingNotes = String(patch.notes ?? current.notes ?? "").trim();
    allowed.notes = existingNotes.includes("OWNER OUTREACH BLOCKED")
      ? existingNotes
      : [existingNotes, protectedNote].filter(Boolean).join("\n");
  }

  allowed.updated_at = new Date().toISOString();
  const rows = await rest<OwnerProspect[]>(`owner_outreach_prospects?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(allowed),
  });
  return rows[0];
}

export function buildOwnerOutreachMessage(prospect: OwnerProspect) {
  const business = businessLabel(prospect);
  const type = prospect.business_type?.trim().toLowerCase() || "hospitality business";
  const unsubscribe = `${SITE_URL}/api/owner-outreach/unsubscribe?id=${encodeURIComponent(prospect.id)}&email=${encodeURIComponent(prospect.owner_email || "")}`;
  const subject = prospect.business_type === "Restaurant"
    ? "Florida Restaurant & Liquor License Marketing Opportunities"
    : prospect.business_type === "Bar"
      ? "Florida Bar & Liquor License Marketing Opportunities"
      : prospect.business_type === "Liquor Store"
        ? "Florida Liquor Store & Liquor License Marketing Opportunities"
        : "Florida Business & Liquor License Marketing Opportunities";
  const greetingText = prospect.owner_name?.trim() ? `Dear ${prospect.owner_name.trim()},` : "Hello,";

  const text = `${greetingText}

Florida Liquor License Market (FLLM) is expanding its marketplace for Florida restaurants, bars, liquor stores, hospitality businesses, and business packages offered with liquor licenses.

FLLM provides dedicated listing pages for business owners and brokers seeking targeted exposure to buyers specifically searching for Florida businesses with 4COP, 4COP SFS/SRX, 3PS, 2COP, and other alcoholic-beverage license classifications.

Featured business listings are supported by FLLM's liquor-license market data, county-level market information, search-engine visibility, buyer inquiries, and direct exposure through FloridaLiquorLicenseMarket.com.

If ${business} or any affiliated ${type} operation is considering a future sale, recapitalization, or marketing of a business or liquor-license-related asset, FLLM would welcome the opportunity to provide information about its listing and marketing services.

There is no obligation to list. This correspondence is simply an introduction to the FLLM platform and the services available to Florida business owners and their brokers.

Florida Liquor License Market
(407) 589-5522
listings@floridaliquorlicensemarket.com
www.floridaliquorlicensemarket.com

No more FLLM owner outreach:
${unsubscribe}`;

  const content = `
    <p style="margin:0 0 18px;font-size:16px;"><strong>${ownerGreeting(prospect.owner_name)}</strong></p>
    <p style="margin:0 0 18px;">Florida Liquor License Market (FLLM) is expanding its marketplace for Florida restaurants, bars, liquor stores, hospitality businesses, and business packages offered with liquor licenses.</p>
    <p style="margin:0 0 18px;">FLLM provides dedicated listing pages for business owners and brokers seeking targeted exposure to buyers specifically searching for Florida businesses with 4COP, 4COP SFS/SRX, 3PS, 2COP, and other alcoholic-beverage license classifications.</p>
    <p style="margin:0 0 18px;">Featured business listings are supported by FLLM's liquor-license market data, county-level market information, search-engine visibility, buyer inquiries, and direct exposure through <strong>FloridaLiquorLicenseMarket.com</strong>.</p>
    <p style="margin:0 0 18px;">If <strong>${escapeHtml(business)}</strong> or any affiliated ${escapeHtml(type)} operation is considering a future sale, recapitalization, or marketing of a business or liquor-license-related asset, FLLM would welcome the opportunity to provide information about its listing and marketing services.</p>
    <p style="margin:0 0 18px;">There is no obligation to list. This correspondence is simply an introduction to the FLLM platform and the services available to Florida business owners and their brokers.</p>
    <p style="margin:18px 0 0;font-size:11px;color:#6f7880;">This is a business-development message from Florida Liquor License Market. <a href="${unsubscribe}" style="color:#6f7880;">No more FLLM owner outreach</a>.</p>`;

  return { subject, text, html: emailShell(content) };
}

export async function createOwnerMessage(prospectId: string) {
  const prospects = await rest<OwnerProspect[]>(`owner_outreach_prospects?select=*&id=eq.${encodeURIComponent(prospectId)}&limit=1`);
  const prospect = prospects[0];
  if (!prospect) throw new Error("Owner prospect not found.");
  const protection = brokerFeaturedOwnerOutreachProtection(prospect);
  if (protection) {
    throw new Error(
      `Owner email drafting is disabled for ${protection.listingReference}; this is an FLLM broker featured listing.`,
    );
  }
  const built = buildOwnerOutreachMessage(prospect);
  const rows = await rest<OwnerMessage[]>("owner_outreach_messages", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      prospect_id: prospect.id,
      subject_line: built.subject,
      body_text: built.text,
      body_html: built.html,
      status: "draft",
      updated_at: new Date().toISOString(),
    }),
  });
  await updateOwnerProspect(prospect.id, { status: "draft_ready" });
  return rows[0];
}

async function messageWithProspect(messageId: string) {
  const messages = await rest<OwnerMessage[]>(`owner_outreach_messages?select=*&id=eq.${encodeURIComponent(messageId)}&limit=1`);
  const message = messages[0];
  if (!message) throw new Error("Owner outreach message not found.");
  const prospects = await rest<OwnerProspect[]>(`owner_outreach_prospects?select=*&id=eq.${encodeURIComponent(message.prospect_id)}&limit=1`);
  const prospect = prospects[0];
  if (!prospect) throw new Error("Owner prospect not found.");
  return { message, prospect };
}

export async function regenerateOwnerMessage(messageId: string) {
  const { message, prospect } = await messageWithProspect(messageId);
  const protection = brokerFeaturedOwnerOutreachProtection(prospect);
  if (protection) {
    throw new Error(
      `Owner email drafting is disabled for ${protection.listingReference}; this is an FLLM broker featured listing.`,
    );
  }
  const built = buildOwnerOutreachMessage(prospect);
  const rows = await rest<OwnerMessage[]>(`owner_outreach_messages?id=eq.${encodeURIComponent(message.id)}`, {
    method: "PATCH", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ subject_line: built.subject, body_text: built.text, body_html: built.html, status: "draft", error_message: null, updated_at: new Date().toISOString() }),
  });
  return rows[0];
}

export async function sendOwnerMessage(messageId: string) {
  const { message, prospect } = await messageWithProspect(messageId);
  const protection = brokerFeaturedOwnerOutreachProtection(prospect);
  if (protection) {
    throw new Error(
      `Owner outreach is blocked for ${protection.listingReference}; this FLLM featured listing is controlled through the broker relationship with ${protection.brokerName}.`,
    );
  }
  if (prospect.do_not_contact || prospect.status === "opted_out") throw new Error("This owner has opted out of FLLM outreach.");
  if (!prospect.owner_email) throw new Error("This owner prospect has no public business email address.");
  if (message.status === "sent") return message;

  await rest(`owner_outreach_messages?id=eq.${encodeURIComponent(message.id)}`, {
    method: "PATCH", headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status: "sending", error_message: null, updated_at: new Date().toISOString() }),
  });

  try {
    const result = await sendFllmEmail({
      to: prospect.owner_email,
      subject: message.subject_line,
      text: message.body_text,
      html: message.body_html,
    });
    const now = new Date();
    const next = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const rows = await rest<OwnerMessage[]>(`owner_outreach_messages?id=eq.${encodeURIComponent(message.id)}`, {
      method: "PATCH", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ status: "sent", sent_at: now.toISOString(), provider_message_id: result.id, error_message: null, updated_at: now.toISOString() }),
    });
    await updateOwnerProspect(prospect.id, { status: "contacted", last_contacted_at: now.toISOString(), next_contact_at: next });
    return rows[0];
  } catch (error) {
    await rest(`owner_outreach_messages?id=eq.${encodeURIComponent(message.id)}`, {
      method: "PATCH", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status: "failed", error_message: error instanceof Error ? error.message : String(error), updated_at: new Date().toISOString() }),
    });
    throw error;
  }
}

export async function unsubscribeOwnerProspect(id: string, email: string) {
  const rows = await rest<OwnerProspect[]>(`owner_outreach_prospects?select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
  const prospect = rows[0];
  if (!prospect?.owner_email || prospect.owner_email.toLowerCase() !== email.trim().toLowerCase()) return false;
  await updateOwnerProspect(prospect.id, { do_not_contact: true, status: "opted_out", next_contact_at: null });
  return true;
}
