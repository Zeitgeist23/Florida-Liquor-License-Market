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

const SITE_URL = "https://www.floridaliquorlicensemarket.com";
const LANDING_URL = `${SITE_URL}/brokers/list-your-license`;
const FEMALE_SAMPLE_URL = `${SITE_URL}/brokers/sample-featured-listing`;
const MALE_SAMPLE_URL = `${SITE_URL}/brokers/sample-featured-listing-male`;

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

function templateIdentity(mode: BrokerTemplateMode) {
  if (mode === "female") {
    return {
      name: "Emma Brooks",
      portrait: `${SITE_URL}/assets/brokers/fllm-sample-female-ai.jpg`,
      sampleUrl: FEMALE_SAMPLE_URL,
      label: "Sample female broker presentation",
    };
  }
  if (mode === "male") {
    return {
      name: "Alex Morgan",
      portrait: `${SITE_URL}/assets/brokers/fllm-sample-male-ai.jpg`,
      sampleUrl: MALE_SAMPLE_URL,
      label: "Sample male broker presentation",
    };
  }
  return {
    name: "Independent Listing Broker",
    portrait: `${SITE_URL}/assets/brokers/fllm-featured-broker-sample-sharp.webp`,
    sampleUrl: FEMALE_SAMPLE_URL,
    label: "Sample broker presentation",
  };
}

function listingLeadIn(prospect: BrokerProspect) {
  const title = prospect.listing_title?.trim();
  if (prospect.listing_kind === "business_with_license") {
    return title
      ? `I noticed your listing, “${title},” includes a Florida quota liquor license. FLLM can give the liquor-license component its own specialized marketplace exposure while you remain the listing broker for the complete business package.`
      : "I noticed you market Florida businesses that include quota liquor licenses. FLLM can give the liquor-license component its own specialized marketplace exposure while you remain the listing broker for the complete business package.";
  }
  if (prospect.listing_kind === "license_only") {
    return title
      ? `I noticed your liquor-license listing, “${title}.” FLLM provides an additional Florida liquor-license-specific marketing channel while you remain the listing broker and transaction contact.`
      : "I noticed you market Florida quota liquor licenses. FLLM provides an additional liquor-license-specific marketing channel while you remain the listing broker and transaction contact.";
  }
  return "FLLM provides Florida brokers with an additional liquor-license-specific marketing channel while the originating broker remains the listing representative and transaction contact.";
}

function buildSubject(prospect: BrokerProspect) {
  const county = prospect.county?.replace(/ County$/i, "").trim();
  if (prospect.listing_kind === "business_with_license") {
    return county
      ? `${county} liquor-license exposure for your client business listing`
      : "Liquor-license exposure for your client business listings";
  }
  return county
    ? `${county} liquor-license marketplace exposure for your client`
    : "Florida liquor-license marketplace exposure for your client listings";
}

export function buildBrokerOutreachMessage(prospect: BrokerProspect) {
  const mode = prospect.outreach_template || "neutral";
  const sample = templateIdentity(mode);
  const hello = firstName(prospect.full_name);
  const intro = listingLeadIn(prospect);
  const sourceLink = prospect.listing_url || prospect.source_url;
  const unsubscribe = `${SITE_URL}/api/broker-outreach/unsubscribe?id=${encodeURIComponent(prospect.id)}&email=${encodeURIComponent(prospect.email || "")}`;
  const subject = buildSubject(prospect);
  const brokerPageShot = `${SITE_URL}/assets/brokers/fllm-featured-broker-preview.jpg`;

  const text = `Hi ${hello},\n\n${intro}\n\nFLLM is Florida’s specialized marketplace for 4COP and 3PS quota liquor licenses. A broker-submitted Featured listing is $24.95 one time and can include your name, brokerage, contact information, buyer inquiry routing, county market context, financing and appraisal links, a full broker-branded detail page, 30-day priority placement, and listing-specific SEO work by FLLM. Search placement is not guaranteed. FLLM does not take any part of your commission.\n\nFeatured listing example: ${sample.sampleUrl}\nBroker listing program: ${LANDING_URL}\n${sourceLink ? `Your current listing: ${sourceLink}\n` : ""}\nOne recent FLLM Featured Pinellas listing appeared on page 1 of Google and was cited in a Google AI Overview for a relevant buyer search. Search visibility changes over time and is not guaranteed.\n\nIf you have another client license or a business package with a quota license attached, FLLM can provide an additional license-focused marketing surface while you keep the client relationship.\n\nFlorida Liquor License Market\n${LANDING_URL}\n\nNo more FLLM broker emails: ${unsubscribe}`;

  const content = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(hello)},</p>
    <p style="margin:0 0 18px;">${escapeHtml(intro)}</p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;border:1px solid #d29b18;background:#061b2b;color:#ffffff;border-collapse:separate;border-spacing:0;border-radius:10px;overflow:hidden;">
      <tr>
        <td style="padding:22px 24px;border-bottom:1px solid #9e7214;">
          <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#f2ad19;font-weight:800;">FLLM Featured Broker Listing</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.12;font-weight:700;margin-top:7px;">Show your client’s liquor license in a broker-branded marketplace page</div>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            <tr>
              <td width="118" valign="top" style="padding-right:18px;">
                <img src="${sample.portrait}" width="110" alt="${escapeHtml(sample.label)}" style="display:block;width:110px;height:110px;object-fit:cover;border:1px solid #d29b18;border-radius:8px;">
              </td>
              <td valign="top">
                <div style="font-size:10px;letter-spacing:.09em;color:#f2ad19;font-weight:800;text-transform:uppercase;">Sample listing broker</div>
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;margin-top:4px;">${escapeHtml(sample.name)}</div>
                <div style="font-size:13px;line-height:1.55;color:#cbd7df;margin-top:8px;">The sample shows how the broker identity, phone, email, website, inquiry form and license details are presented on a Featured third-party broker listing.</div>
              </td>
            </tr>
          </table>
          <div style="margin-top:18px;padding:14px 16px;background:#0c2a42;border:1px solid #34566f;border-radius:7px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td><strong style="font-size:16px;">Featured listing</strong><div style="font-size:12px;color:#cbd7df;margin-top:3px;">30-day priority + Featured badge + FLLM listing SEO</div></td>
              <td align="right"><strong style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#f6a700;">$24.95</strong><div style="font-size:11px;color:#cbd7df;">one time</div></td>
            </tr></table>
          </div>
          <div style="margin-top:16px;font-size:14px;line-height:1.7;color:#e7edf1;">✓ Broker remains the representative<br>✓ Buyer inquiries route to the broker<br>✓ No FLLM commission share<br>✓ License-only and business + quota-license packages supported</div>
        </td>
      </tr>
    </table>

    <div style="margin:20px 0 0;">
      <a href="${sample.sampleUrl}" style="display:inline-block;padding:12px 18px;background:#f5aa14;color:#071421;text-decoration:none;font-weight:800;border-radius:5px;margin-right:8px;">View the Featured listing example</a>
      <a href="${LANDING_URL}" style="display:inline-block;padding:11px 17px;border:1px solid #b47e08;color:#8a5c00;text-decoration:none;font-weight:800;border-radius:5px;">See the broker listing program</a>
    </div>

    <div style="margin:24px 0;padding:16px 18px;border-left:4px solid #f5aa14;background:#f6f8f9;">
      <strong>Recent Google visibility example</strong>
      <p style="margin:7px 0 0;font-size:14px;line-height:1.6;color:#29343b;">A recent FLLM Featured Pinellas listing appeared on page 1 of Google and was cited in a Google AI Overview for a relevant buyer search. Search rankings and AI citations can change and are not guaranteed.</p>
    </div>

    <p style="margin:0 0 17px;">If you have another client license — or a business for sale with a quota license attached — FLLM can provide an additional license-focused marketing surface without replacing you as the broker.</p>
    ${sourceLink ? `<p style="margin:0 0 17px;font-size:13px;color:#66727a;">Listing referenced for this outreach: <a href="${escapeHtml(sourceLink)}" style="color:#0645ad;">${escapeHtml(sourceLink)}</a></p>` : ""}
    <p style="margin:0 0 17px;"><a href="${LANDING_URL}" style="color:#0645ad;font-weight:700;">FloridaLiquorLicenseMarket.com/brokers/list-your-license</a></p>
    <p style="margin:22px 0 0;font-size:11px;color:#7b858b;">This is a broker-outreach message from Florida Liquor License Market. <a href="${unsubscribe}" style="color:#7b858b;">No more FLLM broker emails</a>.</p>`;

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
