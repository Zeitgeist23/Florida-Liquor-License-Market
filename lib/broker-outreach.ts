import "server-only";

import { emailShell, sendFllmEmail } from "@/lib/fllm-email";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type BrokerTemplateMode = "female" | "male" | "neutral";
export type BrokerListingKind = "license_only" | "business_with_license" | "unknown";

export type BrokerProspect = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  brokerage: string | null;
  website_url: string | null;
  source_platform: string | null;
  source_url: string | null;
  listing_title: string | null;
  listing_url: string | null;
  county: string | null;
  license_type: string | null;
  listing_kind: BrokerListingKind;
  languages: string[];
  outreach_template: BrokerTemplateMode;
  template_basis: string;
  status: string;
  do_not_contact: boolean;
  last_contacted_at: string | null;
  next_contact_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type BrokerCampaign = {
  id: string;
  campaign_week: string;
  name: string;
  subject_line: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type BrokerMessage = {
  id: string;
  campaign_id: string | null;
  prospect_id: string;
  template_mode: BrokerTemplateMode;
  subject_line: string;
  body_text: string;
  body_html: string;
  status: string;
  generated_at: string;
  sent_at: string | null;
  provider_message_id: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
};

export type QuickBrokerOutreachInput = {
  full_name: string;
  email: string;
  phone?: string | null;
  brokerage?: string | null;
  website_url?: string | null;
  source_platform?: string | null;
  source_url?: string | null;
  listing_title?: string | null;
  listing_url?: string | null;
  county?: string | null;
  license_type: string;
  listing_kind: "license_only" | "business_with_license";
  languages?: string[];
  notes?: string | null;
  force?: boolean;
};

const SITE_URL = "https://www.floridaliquorlicensemarket.com";
const LANDING_URL = `${SITE_URL}/brokers/list-your-license`;
function settings() {
  return supabaseServiceSettings("Broker outreach database is unavailable.");
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
    throw new Error(`Broker outreach database error: ${response.status} ${await response.text()}`);
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function firstName(value: string) {
  return value.trim().split(/\s+/)[0] || "there";
}

function mondayOfWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d.toISOString().slice(0, 10);
}

function listingLeadIn(prospect: BrokerProspect) {
  const title = prospect.listing_title?.trim();
  const titleText = title ? ` “${title}”` : "";

  if (prospect.listing_kind === "business_with_license") {
    return `Florida Liquor License Market noticed that you listed a client’s business for sale${titleText} that includes a Florida quota liquor license. We invite you to give the liquor-license component additional specialized exposure through the Florida Liquor License Market online network while you remain the listing broker for the complete business package.`;
  }

  if (prospect.listing_kind === "license_only") {
    return `Florida Liquor License Market noticed that you listed a client’s Florida quota liquor license for sale${titleText}. We invite you to gain additional exposure by adding the listing to the Florida Liquor License Market online network while you remain the listing broker and transaction contact.`;
  }

  return "Florida Liquor License Market provides independent brokers with an additional specialized marketing channel for Florida quota liquor-license inventory while the originating broker remains the listing representative and transaction contact.";
}

function buildSubject(prospect: BrokerProspect) {
  const county = prospect.county?.replace(/ County$/i, "").trim();
  if (prospect.listing_kind === "business_with_license") {
    return county
      ? `Additional liquor-license exposure for your ${county} business listing`
      : "Additional liquor-license exposure for your client business listing";
  }
  return county
    ? `Additional exposure for your ${county} quota liquor license listing`
    : "Additional exposure for your client quota liquor license listing";
}

export function buildBrokerOutreachMessage(prospect: BrokerProspect) {
  const hello = firstName(prospect.full_name);
  const intro = listingLeadIn(prospect);
  const sourceLink = prospect.listing_url || prospect.source_url;
  const unsubscribe = `${SITE_URL}/api/broker-outreach/unsubscribe?id=${encodeURIComponent(prospect.id)}&email=${encodeURIComponent(prospect.email || "")}`;
  const subject = buildSubject(prospect);

  const text = `Hello ${hello},

${intro}

FLLM gives independent Florida brokers an additional marketing channel without replacing the broker relationship.

✓ Increase statewide exposure and buyer traffic
✓ You remain the broker and client relationship owner
✓ Buyer inquiries route directly to your designated contact
✓ FLLM does not take a share of your broker commission
✓ Quota Liquor License Only listings supported
✓ Quota Liquor License + Business Package listings supported
✓ Featured listings include 30-day priority exposure and listing-specific SEO work by FLLM; search placement is not guaranteed

Standard Listing: $14.95 one time
Featured Listing: $24.95 one time

Broker listing program:
${LANDING_URL}
${sourceLink ? `
Listing referenced for this outreach:
${sourceLink}
` : ""}

Florida Liquor License Market
listings@floridaliquorlicensemarket.com

No more FLLM broker emails:
${unsubscribe}`;

  const content = `
    <p style="margin:0 0 16px;font-size:16px;">Hello ${escapeHtml(hello)},</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#26323a;">${escapeHtml(intro)}</p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:720px;border-collapse:separate;border-spacing:0;border:1px solid #b67a00;border-radius:10px;overflow:hidden;background:#061827;color:#ffffff;">
      <tr>
        <td style="padding:24px 26px 22px;border-bottom:1px solid rgba(246,167,0,.55);background:linear-gradient(135deg,#03131f 0%,#08243b 100%);">
          <div style="font:900 11px/1.2 Arial,Helvetica,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#f6a700;">Independent Broker Marketplace</div>
          <div style="margin-top:9px;font:700 31px/1.12 Georgia,'Times New Roman',serif;color:#ffffff;">Add Your Client’s Florida Liquor License to FLLM</div>
          <div style="margin-top:12px;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#dce7ee;">More exposure without giving up the broker relationship. Use FLLM as an additional marketing channel while keeping your client, transaction contact role and commission structure intact.</div>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:16px;border-collapse:collapse;">
            <tr>
              <td style="padding:4px 0;color:#eef4f8;font-size:14px;font-weight:700;"><span style="color:#f6a700;font-weight:900;">✓</span>&nbsp;&nbsp;Quota Liquor License Only</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#eef4f8;font-size:14px;font-weight:700;"><span style="color:#f6a700;font-weight:900;">✓</span>&nbsp;&nbsp;Quota Liquor License + Business Package</td>
            </tr>
          </table>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:18px;border-collapse:separate;border-spacing:8px 0;">
            <tr>
              <td width="50%" valign="top" style="padding:13px 14px;border:1px solid #36536a;border-radius:7px;background:#0d2941;">
                <div style="font-size:14px;font-weight:800;color:#ffffff;">Standard</div>
                <div style="margin-top:4px;font:700 23px/1 Georgia,'Times New Roman',serif;color:#f6a700;">$14.95</div>
                <div style="margin-top:6px;font-size:11px;line-height:1.4;color:#c6d3dc;">One-time marketplace listing</div>
              </td>
              <td width="50%" valign="top" style="padding:13px 14px;border:1px solid #36536a;border-radius:7px;background:#0d2941;">
                <div style="font-size:14px;font-weight:800;color:#ffffff;">Featured</div>
                <div style="margin-top:4px;font:700 23px/1 Georgia,'Times New Roman',serif;color:#f6a700;">$24.95</div>
                <div style="margin-top:6px;font-size:11px;line-height:1.4;color:#c6d3dc;">30-day priority + FLLM listing SEO</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:24px 20px 20px;background:#f7f7f4;color:#071827;">
          <div style="margin:0 6px 15px;font:700 25px/1.15 Georgia,'Times New Roman',serif;color:#071827;">Built for Florida Brokers</div>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:8px;">
            <tr>
              <td width="50%" valign="top" style="padding:15px 16px;border:1px solid #d6dee3;border-radius:8px;background:#ffffff;font-size:13px;line-height:1.45;font-weight:700;"><span style="color:#f6a700;font-size:16px;">✓</span>&nbsp;&nbsp;Increase statewide exposure and buyer traffic</td>
              <td width="50%" valign="top" style="padding:15px 16px;border:1px solid #d6dee3;border-radius:8px;background:#ffffff;font-size:13px;line-height:1.45;font-weight:700;"><span style="color:#f6a700;font-size:16px;">✓</span>&nbsp;&nbsp;You remain the broker and client relationship owner</td>
            </tr>
            <tr>
              <td width="50%" valign="top" style="padding:15px 16px;border:1px solid #d6dee3;border-radius:8px;background:#ffffff;font-size:13px;line-height:1.45;font-weight:700;"><span style="color:#f6a700;font-size:16px;">✓</span>&nbsp;&nbsp;Buyer inquiries route directly to your designated contact</td>
              <td width="50%" valign="top" style="padding:15px 16px;border:1px solid #d6dee3;border-radius:8px;background:#ffffff;font-size:13px;line-height:1.45;font-weight:700;"><span style="color:#f6a700;font-size:16px;">✓</span>&nbsp;&nbsp;FLLM does not take a share of your broker commission</td>
            </tr>
            <tr>
              <td width="50%" valign="top" style="padding:15px 16px;border:1px solid #d6dee3;border-radius:8px;background:#ffffff;font-size:13px;line-height:1.45;font-weight:700;"><span style="color:#f6a700;font-size:16px;">✓</span>&nbsp;&nbsp;List license-only or business + liquor-license packages</td>
              <td width="50%" valign="top" style="padding:15px 16px;border:1px solid #d6dee3;border-radius:8px;background:#ffffff;font-size:13px;line-height:1.45;font-weight:700;"><span style="color:#f6a700;font-size:16px;">✓</span>&nbsp;&nbsp;Featured listings add priority exposure and FLLM listing SEO</td>
            </tr>
          </table>

          <div style="padding:20px 8px 4px;text-align:center;">
            <a href="${LANDING_URL}" style="display:inline-block;padding:13px 20px;border:1px solid #f6a700;border-radius:5px;background:#f6a700;color:#071827;text-decoration:none;font-size:13px;font-weight:900;text-transform:uppercase;">View the FLLM Broker Listing Program</a>
          </div>
        </td>
      </tr>
    </table>

    ${sourceLink ? `<p style="max-width:720px;margin:18px 0 0;font-size:12px;line-height:1.55;color:#66727a;">Listing referenced for this outreach: <a href="${escapeHtml(sourceLink)}" style="color:#0645ad;">${escapeHtml(sourceLink)}</a></p>` : ""}

    <p style="max-width:720px;margin:18px 0 0;font-size:12px;line-height:1.55;color:#66727a;">Featured listing SEO is intended to support search visibility; search-engine rankings and AI citations are not guaranteed.</p>
    <p style="max-width:720px;margin:20px 0 0;font-size:11px;line-height:1.5;color:#7b858b;">This is a broker-outreach message from Florida Liquor License Market. <a href="${unsubscribe}" style="color:#7b858b;">No more FLLM broker emails</a>.</p>`;

  return { subject, text, html: emailShell(content) };
}

export async function listBrokerOutreachData() {
  const [prospects, campaigns, messages] = await Promise.all([
    rest<BrokerProspect[]>("broker_outreach_prospects?select=*&order=created_at.desc&limit=1000"),
    rest<BrokerCampaign[]>("broker_outreach_campaigns?select=*&order=campaign_week.desc&limit=100"),
    rest<BrokerMessage[]>("broker_outreach_messages?select=*&order=created_at.desc&limit=1000"),
  ]);
  return { prospects, campaigns, messages };
}

export async function createBrokerProspect(input: Partial<BrokerProspect> & { full_name: string }) {
  const row = {
    full_name: input.full_name.trim(),
    email: input.email?.trim().toLowerCase() || null,
    phone: input.phone?.trim() || null,
    brokerage: input.brokerage?.trim() || null,
    website_url: input.website_url?.trim() || null,
    source_platform: input.source_platform?.trim() || null,
    source_url: input.source_url?.trim() || null,
    listing_title: input.listing_title?.trim() || null,
    listing_url: input.listing_url?.trim() || null,
    county: input.county?.trim() || null,
    license_type: input.license_type?.trim() || null,
    listing_kind: input.listing_kind || "unknown",
    languages: input.languages || [],
    outreach_template: input.outreach_template || "neutral",
    template_basis: input.template_basis || "manual",
    status: input.status || "new",
    do_not_contact: Boolean(input.do_not_contact),
    notes: input.notes?.trim() || null,
    updated_at: new Date().toISOString(),
  };
  const rows = await rest<BrokerProspect[]>("broker_outreach_prospects", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(row),
  });
  return rows[0];
}

export async function updateBrokerProspect(id: string, patch: Partial<BrokerProspect>) {
  const allowed: Partial<BrokerProspect> = {};
  for (const key of [
    "full_name","email","phone","brokerage","website_url","source_platform","source_url","listing_title","listing_url","county","license_type","listing_kind","languages","outreach_template","template_basis","status","do_not_contact","last_contacted_at","next_contact_at","notes",
  ] as const) {
    if (patch[key] !== undefined) (allowed as Record<string, unknown>)[key] = patch[key];
  }
  (allowed as Record<string, unknown>).updated_at = new Date().toISOString();
  const rows = await rest<BrokerProspect[]>(`broker_outreach_prospects?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(allowed),
  });
  return rows[0];
}

async function eligibleProspects() {
  const prospects = await rest<BrokerProspect[]>(
    "broker_outreach_prospects?select=*&do_not_contact=eq.false&email=not.is.null&order=created_at.asc&limit=500",
  );
  const now = Date.now();
  return prospects.filter((prospect) => {
    if (!prospect.email) return false;
    if (!["new", "queued", "follow_up"].includes(prospect.status)) return false;
    if (prospect.next_contact_at && new Date(prospect.next_contact_at).getTime() > now) return false;
    return true;
  });
}

export async function generateWeeklyBrokerCampaign(force = false) {
  const week = mondayOfWeek();
  const existing = await rest<BrokerCampaign[]>(
    `broker_outreach_campaigns?select=*&campaign_week=eq.${week}&limit=1`,
  );
  if (existing[0] && !force) {
    const existingMessages = await rest<BrokerMessage[]>(
      `broker_outreach_messages?select=*&campaign_id=eq.${existing[0].id}&order=created_at.asc`,
    );
    return { campaign: existing[0], messages: existingMessages, created: false };
  }

  const prospects = await eligibleProspects();
  const campaignRows = await rest<BrokerCampaign[]>("broker_outreach_campaigns", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      campaign_week: week,
      name: `Broker Outreach — Week of ${week}`,
      subject_line: "FLLM broker listing outreach",
      status: prospects.length ? "draft" : "empty",
      updated_at: new Date().toISOString(),
    }),
  });
  const campaign = campaignRows[0];
  const messages: BrokerMessage[] = [];
  for (const prospect of prospects) {
    const built = buildBrokerOutreachMessage(prospect);
    const rows = await rest<BrokerMessage[]>("broker_outreach_messages", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        campaign_id: campaign.id,
        prospect_id: prospect.id,
        template_mode: prospect.outreach_template || "neutral",
        subject_line: built.subject,
        body_text: built.text,
        body_html: built.html,
        status: "draft",
        updated_at: new Date().toISOString(),
      }),
    });
    if (rows[0]) messages.push(rows[0]);
  }
  return { campaign, messages, created: true };
}

async function messageWithProspect(messageId: string) {
  const messages = await rest<BrokerMessage[]>(
    `broker_outreach_messages?select=*&id=eq.${encodeURIComponent(messageId)}&limit=1`,
  );
  const message = messages[0];
  if (!message) throw new Error("Broker outreach message not found.");
  const prospects = await rest<BrokerProspect[]>(
    `broker_outreach_prospects?select=*&id=eq.${encodeURIComponent(message.prospect_id)}&limit=1`,
  );
  const prospect = prospects[0];
  if (!prospect) throw new Error("Broker prospect not found.");
  return { message, prospect };
}

export async function regenerateBrokerMessage(messageId: string) {
  const { message, prospect } = await messageWithProspect(messageId);
  const built = buildBrokerOutreachMessage(prospect);
  const rows = await rest<BrokerMessage[]>(
    `broker_outreach_messages?id=eq.${encodeURIComponent(message.id)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        template_mode: prospect.outreach_template || "neutral",
        subject_line: built.subject,
        body_text: built.text,
        body_html: built.html,
        status: "draft",
        error_message: null,
        generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    },
  );
  return rows[0];
}

export async function sendBrokerMessage(messageId: string) {
  const { message, prospect } = await messageWithProspect(messageId);
  if (prospect.do_not_contact) throw new Error("This broker has opted out of outreach.");
  if (!prospect.email) throw new Error("This broker prospect has no email address.");
  if (message.status === "sent") return message;

  await rest(`broker_outreach_messages?id=eq.${encodeURIComponent(message.id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status: "sending", error_message: null, updated_at: new Date().toISOString() }),
  });

  try {
    const result = await sendFllmEmail({
      to: prospect.email,
      subject: message.subject_line,
      text: message.body_text,
      html: message.body_html,
    });
    const now = new Date();
    const next = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString();
    const rows = await rest<BrokerMessage[]>(
      `broker_outreach_messages?id=eq.${encodeURIComponent(message.id)}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          status: "sent",
          sent_at: now.toISOString(),
          provider_message_id: result.id,
          error_message: null,
          updated_at: now.toISOString(),
        }),
      },
    );
    await updateBrokerProspect(prospect.id, {
      status: "contacted",
      last_contacted_at: now.toISOString(),
      next_contact_at: next,
    });
    return rows[0];
  } catch (error) {
    await rest(`broker_outreach_messages?id=eq.${encodeURIComponent(message.id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        status: "failed",
        error_message: error instanceof Error ? error.message : String(error),
        updated_at: new Date().toISOString(),
      }),
    });
    throw error;
  }
}

export async function sendBrokerCampaign(campaignId: string) {
  const messages = await rest<BrokerMessage[]>(
    `broker_outreach_messages?select=*&campaign_id=eq.${encodeURIComponent(campaignId)}&status=in.(draft,failed)&order=created_at.asc`,
  );
  const sent: string[] = [];
  const failed: Array<{ id: string; error: string }> = [];
  for (const message of messages) {
    try {
      await sendBrokerMessage(message.id);
      sent.push(message.id);
    } catch (error) {
      failed.push({ id: message.id, error: error instanceof Error ? error.message : String(error) });
    }
  }
  await rest(`broker_outreach_campaigns?id=eq.${encodeURIComponent(campaignId)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      status: failed.length ? "partial" : "sent",
      updated_at: new Date().toISOString(),
    }),
  });
  return { sent: sent.length, failed };
}

export async function unsubscribeBrokerProspect(id: string, email: string) {
  const prospects = await rest<BrokerProspect[]>(
    `broker_outreach_prospects?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
  );
  const prospect = prospects[0];
  if (!prospect || !prospect.email || prospect.email.toLowerCase() !== email.trim().toLowerCase()) {
    return false;
  }
  await updateBrokerProspect(prospect.id, {
    do_not_contact: true,
    status: "opted_out",
    next_contact_at: null,
  });
  return true;
}
