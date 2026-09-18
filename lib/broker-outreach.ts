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

export const THIRD_PARTY_BROKER_EMAIL_STANDARD = Object.freeze({
  status: "LOCKED / OFFICIAL",
  version: "v1",
  approvedDate: "2026-09-18",
  purpose: "Third-party broker listing outreach",
  senderEmail: "listings@floridaliquorlicensemarket.com",
  signatureDepartment: "Client Services",
  siteUrl: "https://www.floridaliquorlicensemarket.com",
  brokerLandingPath: "/brokers/list-your-license",
  listingsPath: "/listings",
  heroImagePath: "/assets/hero-bar-clean.png",
  deliveryMethod: "sendFllmEmail production transport",
  layoutOrder: [
    "personalized introduction",
    "locked broker-page hero",
    "Built for Florida Brokers six-card section",
    "referenced listing link",
    "broker listing program link",
    "marketplace listings link",
    "Featured SEO disclosure",
    "broker outreach unsubscribe line",
    "official FLLM Client Services corporate signature",
  ],
} as const);

const SITE_URL = THIRD_PARTY_BROKER_EMAIL_STANDARD.siteUrl;
const LANDING_URL = `${SITE_URL}${THIRD_PARTY_BROKER_EMAIL_STANDARD.brokerLandingPath}`;
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

/**
 * OFFICIAL LOCKED FLLM THIRD-PARTY BROKER LISTING EMAIL — v1
 *
 * This function is the canonical reusable template for outreach to third-party
 * brokers marketing either (a) a quota liquor license only or (b) a business
 * package that includes a 4COP Quota or 3PS-family quota liquor license.
 *
 * Preserve the approved content order, hero image, pricing presentation,
 * benefit cards, link placement, disclosures, corporate signature and
 * production delivery method unless the user explicitly approves a new
 * template version.
 */
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

Browse FLLM marketplace listings:
${SITE_URL}/listings
${sourceLink ? `
Listing referenced for this outreach:
${sourceLink}
` : ""}

Florida Liquor License Market
listings@floridaliquorlicensemarket.com

No more FLLM broker emails:
${unsubscribe}`;

  const content = `
    <style>
      @media only screen and (max-width:680px) {
        .fllm-hero-grid,.fllm-benefit-grid { width:100% !important; }
        .fllm-hero-grid td,.fllm-benefit-grid td { display:block !important; width:100% !important; box-sizing:border-box !important; }
        .fllm-hero-copy { padding-right:0 !important; }
        .fllm-price-card { margin-top:18px !important; }
      }
      .fllm-btn-primary,.fllm-btn-secondary,.fllm-btn-program,.fllm-price-option,.fllm-benefit-card {
        transition:all .18s ease-in-out !important;
      }
      .fllm-btn-primary:hover,.fllm-btn-program:hover {
        background:#ffbf24 !important;
        box-shadow:0 8px 20px rgba(246,167,0,.35) !important;
        transform:translateY(-1px) !important;
      }
      .fllm-btn-secondary:hover {
        background:#f6a700 !important;
        color:#071827 !important;
        box-shadow:0 8px 20px rgba(246,167,0,.28) !important;
        transform:translateY(-1px) !important;
      }
      .fllm-price-option:hover {
        border-color:#f6a700 !important;
        background:#17344a !important;
        box-shadow:0 0 0 1px rgba(246,167,0,.22),0 10px 24px rgba(0,0,0,.18) !important;
      }
      .fllm-benefit-card:hover {
        border-color:#f6a700 !important;
        box-shadow:0 10px 22px rgba(0,0,0,.08) !important;
        transform:translateY(-1px) !important;
      }

    </style>

    <p style="margin:0 0 16px;font-size:16px;">Hello ${escapeHtml(hello)},</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#26323a;">${escapeHtml(intro)}</p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:900px;border-collapse:separate;border-spacing:0;border:1px solid rgba(246,167,0,.78);background:#020b12;overflow:hidden;">
      <tr>
        <td background="${SITE_URL}/assets/hero-bar-clean.png" style="padding:0;background-color:#020b12;background-image:linear-gradient(90deg,rgba(2,11,18,.99) 0%,rgba(3,15,25,.96) 44%,rgba(3,15,25,.76) 68%,rgba(2,11,18,.88) 100%),url('${SITE_URL}/assets/hero-bar-clean.png');background-position:center;background-size:cover;">
          <table class="fllm-hero-grid" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            <tr>
              <td colspan="2" style="padding:20px 28px 0;color:#b9c7d0;font-size:10px;line-height:1.4;">
                <a href="${SITE_URL}/" style="color:#b9c7d0;text-decoration:none;">Home</a>
                <span style="color:#f6a700;"> &nbsp;›&nbsp; </span>
                <a href="${SITE_URL}/florida-liquor-license-broker" style="color:#b9c7d0;text-decoration:none;">Broker Services</a>
                <span style="color:#f6a700;"> &nbsp;›&nbsp; </span>
                <strong style="color:#ffffff;">List a Client License</strong>
              </td>
            </tr>
            <tr>
              <td class="fllm-hero-copy" width="66%" valign="middle" style="padding:30px 22px 32px 28px;">
                <div style="color:#f6a700;font-size:11px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;">Independent Broker Marketplace</div>
                <div style="margin-top:12px;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:42px;line-height:1.03;font-weight:500;letter-spacing:-.02em;">Add Your Client’s Florida Liquor License to FLLM</div>
                <div style="margin-top:18px;color:#e1e8ed;font-size:17px;line-height:1.6;">Reach buyers searching Florida’s specialized quota-license market while you remain the listing representative and transaction contact.</div>

                <div style="margin-top:16px;color:#e7eef3;font-size:13px;font-weight:700;line-height:1.7;">
                  <div><span style="color:#f6a700;font-weight:900;">✓</span>&nbsp;&nbsp;Quota Liquor License Only</div>
                  <div><span style="color:#f6a700;font-weight:900;">✓</span>&nbsp;&nbsp;Quota Liquor License + Business Package</div>
                </div>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:23px;border-collapse:separate;border-spacing:0;">
                  <tr>
                    <td style="padding-right:10px;">
                      <a class="fllm-btn-primary" href="${LANDING_URL}#broker-listing-form" class="fllm-btn-primary" style="display:inline-block;padding:14px 18px;border:1px solid #d28c00;border-top:2px solid #ffe08a;border-bottom:3px solid #a96900;border-radius:6px;background:#f6a700;color:#07131d;text-decoration:none;font-size:11px;font-weight:900;text-transform:uppercase;box-shadow:0 5px 0 #8b5900,0 8px 16px rgba(0,0,0,.20);">Choose a Listing Option</a>
                    </td>
                    <td>
                      <a class="fllm-btn-secondary" href="${SITE_URL}/listings" class="fllm-btn-secondary" style="display:inline-block;padding:13px 18px;border:1px solid #f6a700;border-top:2px solid #ffd86d;border-bottom:3px solid #8f5c00;border-radius:6px;background:#071827;color:#f6a700;text-decoration:none;font-size:11px;font-weight:900;text-transform:uppercase;box-shadow:0 5px 0 #07101a,0 8px 16px rgba(0,0,0,.24);">View Marketplace Listings</a>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:15px;color:#bfcbd3;font-size:10.5px;letter-spacing:.02em;">Listings from $14.95 · No share of your commission · Statewide exposure</div>
              </td>

              <td width="34%" valign="middle" style="padding:28px 28px 28px 6px;">
                <table class="fllm-price-card" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:0;border:1px solid #d28f00;border-radius:12px;background:#071c2d;">
                  <tr><td style="padding:24px 20px;">
                    <div style="color:#f6a700;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">Choose Your Exposure</div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:15px;border-collapse:separate;border-spacing:0 8px;">
                      <tr><td class="fllm-price-option" style="padding:12px 13px;border:1px solid #3d5d75;border-top:1px solid #557995;border-bottom:2px solid #06111a;border-radius:7px;background:#11283a;box-shadow:0 4px 10px rgba(0,0,0,.18);">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                          <td style="color:#fff;font-size:13px;font-weight:700;">Standard</td>
                          <td align="right" style="color:#f6a700;font-family:Georgia,'Times New Roman',serif;font-size:22px;">$14.95</td>
                        </tr></table>
                        <div style="margin-top:5px;color:#d8e1e7;font-size:10px;line-height:1.35;">Marketplace listing · Select Standard ↓</div>
                      </td></tr>
                      <tr><td class="fllm-price-option" style="padding:12px 13px;border:1px solid #3d5d75;border-top:1px solid #557995;border-bottom:2px solid #06111a;border-radius:7px;background:#11283a;box-shadow:0 4px 10px rgba(0,0,0,.18);">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                          <td style="color:#fff;font-size:13px;font-weight:700;">Featured</td>
                          <td align="right" style="color:#f6a700;font-family:Georgia,'Times New Roman',serif;font-size:22px;">$24.95</td>
                        </tr></table>
                        <div style="margin-top:5px;color:#d8e1e7;font-size:10px;line-height:1.35;">30-day priority + FLLM listing SEO · Select Featured ↓</div>
                      </td></tr>
                    </table>

                    <div style="margin-top:15px;padding-top:15px;border-top:1px solid #2c4050;color:#e9eef2;font-size:12px;line-height:1.9;">
                      <div><span style="color:#f6a700;font-weight:900;">✓</span>&nbsp;&nbsp;One-time fee</div>
                      <div><span style="color:#f6a700;font-weight:900;">✓</span>&nbsp;&nbsp;No recurring charge</div>
                      <div><span style="color:#f6a700;font-weight:900;">✓</span>&nbsp;&nbsp;No FLLM commission</div>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:34px 28px 30px;background:#f7f7f4;color:#071827;">
          <div style="color:#f6a700;font-size:11px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;">Built for Florida Brokers</div>
          <div style="margin-top:8px;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.12;font-weight:500;color:#071827;">More exposure without giving up the broker relationship</div>
          <div style="margin-top:12px;color:#52616c;font-size:15px;line-height:1.65;">Use FLLM as an additional marketing channel while keeping your client, transaction contact role and commission structure intact.</div>

          <table class="fllm-benefit-grid" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;border-collapse:separate;border-spacing:7px;">
            <tr>
              <td class="fllm-benefit-card" width="33.33%" valign="top" style="padding:18px 16px;border:1px solid #cfd7dc;border-top:2px solid #ffffff;border-bottom:2px solid #c2cbd1;border-radius:10px;background:#ffffff;box-shadow:0 6px 14px rgba(7,24,39,.10);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding-right:10px;"><span style="display:inline-block;width:27px;height:27px;line-height:27px;text-align:center;border-radius:50%;background:#f6a700;color:#071827;font-weight:900;">✓</span></td><td style="color:#233543;font-size:13px;font-weight:700;line-height:1.45;">Increase statewide exposure and buyer traffic</td></tr></table>
              </td>
              <td class="fllm-benefit-card" width="33.33%" valign="top" style="padding:18px 16px;border:1px solid #cfd7dc;border-top:2px solid #ffffff;border-bottom:2px solid #c2cbd1;border-radius:10px;background:#ffffff;box-shadow:0 6px 14px rgba(7,24,39,.10);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding-right:10px;"><span style="display:inline-block;width:27px;height:27px;line-height:27px;text-align:center;border-radius:50%;background:#f6a700;color:#071827;font-weight:900;">✓</span></td><td style="color:#233543;font-size:13px;font-weight:700;line-height:1.45;">You remain the broker and client relationship owner</td></tr></table>
              </td>
              <td class="fllm-benefit-card" width="33.33%" valign="top" style="padding:18px 16px;border:1px solid #cfd7dc;border-top:2px solid #ffffff;border-bottom:2px solid #c2cbd1;border-radius:10px;background:#ffffff;box-shadow:0 6px 14px rgba(7,24,39,.10);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding-right:10px;"><span style="display:inline-block;width:27px;height:27px;line-height:27px;text-align:center;border-radius:50%;background:#f6a700;color:#071827;font-weight:900;">✓</span></td><td style="color:#233543;font-size:13px;font-weight:700;line-height:1.45;">Buyer inquiries route directly to your designated contact</td></tr></table>
              </td>
            </tr>
            <tr>
              <td class="fllm-benefit-card" width="33.33%" valign="top" style="padding:18px 16px;border:1px solid #cfd7dc;border-top:2px solid #ffffff;border-bottom:2px solid #c2cbd1;border-radius:10px;background:#ffffff;box-shadow:0 6px 14px rgba(7,24,39,.10);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding-right:10px;"><span style="display:inline-block;width:27px;height:27px;line-height:27px;text-align:center;border-radius:50%;background:#f6a700;color:#071827;font-weight:900;">✓</span></td><td style="color:#233543;font-size:13px;font-weight:700;line-height:1.45;">FLLM does not take a share of your broker commission</td></tr></table>
              </td>
              <td class="fllm-benefit-card" width="33.33%" valign="top" style="padding:18px 16px;border:1px solid #cfd7dc;border-top:2px solid #ffffff;border-bottom:2px solid #c2cbd1;border-radius:10px;background:#ffffff;box-shadow:0 6px 14px rgba(7,24,39,.10);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding-right:10px;"><span style="display:inline-block;width:27px;height:27px;line-height:27px;text-align:center;border-radius:50%;background:#f6a700;color:#071827;font-weight:900;">✓</span></td><td style="color:#233543;font-size:13px;font-weight:700;line-height:1.45;">List license-only or business + liquor-license packages</td></tr></table>
              </td>
              <td class="fllm-benefit-card" width="33.33%" valign="top" style="padding:18px 16px;border:1px solid #cfd7dc;border-top:2px solid #ffffff;border-bottom:2px solid #c2cbd1;border-radius:10px;background:#ffffff;box-shadow:0 6px 14px rgba(7,24,39,.10);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding-right:10px;"><span style="display:inline-block;width:27px;height:27px;line-height:27px;text-align:center;border-radius:50%;background:#f6a700;color:#071827;font-weight:900;">✓</span></td><td style="color:#233543;font-size:13px;font-weight:700;line-height:1.45;">Featured listings add priority exposure and FLLM listing SEO</td></tr></table>
              </td>
            </tr>
          </table>

          <div style="margin-top:22px;text-align:center;">
            <a class="fllm-btn-program" href="${LANDING_URL}" class="fllm-btn-program" style="display:inline-block;padding:13px 20px;border:1px solid #d28c00;border-top:2px solid #ffe08a;border-bottom:3px solid #a96900;border-radius:6px;background:#f6a700;color:#071827;text-decoration:none;font-size:11px;font-weight:900;text-transform:uppercase;box-shadow:0 5px 0 #8b5900,0 8px 16px rgba(0,0,0,.18);">View the FLLM Broker Listing Program</a>
          </div>

        </td>
      </tr>
    </table>

    ${sourceLink ? `<p style="max-width:900px;margin:12px 0 0;font-size:12px;line-height:1.55;color:#66727a;">Listing referenced for this outreach: <a href="${escapeHtml(sourceLink)}" style="color:#0645ad;font-weight:700;">View the current listing</a></p>` : ""}
    <p style="max-width:900px;margin:7px 0 0;font-size:12px;line-height:1.75;">
      <a href="${LANDING_URL}" style="color:#0645ad;font-weight:700;text-decoration:underline;">Visit the FLLM Broker Listing Program</a><br>
      <a href="${SITE_URL}/listings" style="color:#0645ad;font-weight:700;text-decoration:underline;">Browse FLLM Marketplace Listings</a>
    </p>
    <p style="max-width:900px;margin:15px 0 0;font-size:12px;line-height:1.55;color:#66727a;">Featured listing SEO is intended to support search visibility; search-engine rankings and AI citations are not guaranteed.</p>
    <p style="max-width:900px;margin:18px 0 16px;font-size:11px;line-height:1.5;color:#7b858b;">This is a broker-outreach message from Florida Liquor License Market. <a href="${unsubscribe}" style="color:#7b858b;">No more FLLM broker emails</a>.</p>
`;

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

export async function addAndSendBrokerProspect(input: QuickBrokerOutreachInput) {
  const fullName = input.full_name.trim();
  const email = input.email.trim().toLowerCase();
  const listingKind = input.listing_kind;
  const licenseType = input.license_type.trim();

  if (!fullName) throw new Error("Broker name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("A valid broker email address is required.");
  }
  if (listingKind !== "license_only" && listingKind !== "business_with_license") {
    throw new Error("Listing type must be license-only or business + quota license.");
  }
  if (!licenseType) throw new Error("License type is required.");

  const existingRows = await rest<BrokerProspect[]>(
    `broker_outreach_prospects?select=*&email=eq.${encodeURIComponent(email)}&order=updated_at.desc&limit=1`,
  );
  const existing = existingRows[0];

  if (existing?.do_not_contact || existing?.status === "opted_out") {
    throw new Error("This broker has opted out of FLLM outreach and cannot be emailed.");
  }

  const incomingListing = (input.listing_url || input.source_url || "").trim();
  const existingListing = (existing?.listing_url || existing?.source_url || "").trim();
  const sameListing = incomingListing
    ? incomingListing === existingListing
    : true;

  if (!input.force && existing?.last_contacted_at && sameListing) {
    const lastContact = new Date(existing.last_contacted_at).getTime();
    const duplicateWindowMs = 21 * 24 * 60 * 60 * 1000;
    if (Number.isFinite(lastContact) && Date.now() - lastContact < duplicateWindowMs) {
      throw new Error(
        "This broker was already contacted about the same listing within the last 21 days. Use force only after confirming another send is intended.",
      );
    }
  }

  const common = {
    full_name: fullName,
    email,
    phone: input.phone?.trim() || existing?.phone || null,
    brokerage: input.brokerage?.trim() || existing?.brokerage || null,
    website_url: input.website_url?.trim() || existing?.website_url || null,
    source_platform: input.source_platform?.trim() || existing?.source_platform || null,
    source_url: input.source_url?.trim() || existing?.source_url || null,
    listing_title: input.listing_title?.trim() || existing?.listing_title || null,
    listing_url: input.listing_url?.trim() || existing?.listing_url || null,
    county: input.county?.trim() || existing?.county || null,
    license_type: licenseType,
    listing_kind: listingKind,
    languages: input.languages?.length ? input.languages : existing?.languages || [],
    outreach_template: "neutral" as BrokerTemplateMode,
    template_basis: "automatic",
    notes: input.notes?.trim() || existing?.notes || null,
  };

  const prospect = existing
    ? await updateBrokerProspect(existing.id, common)
    : await createBrokerProspect({
        ...common,
        status: "new",
        do_not_contact: false,
      });

  if (!prospect) throw new Error("Broker prospect could not be saved.");

  const built = buildBrokerOutreachMessage(prospect);
  const now = new Date().toISOString();
  const messageRows = await rest<BrokerMessage[]>("broker_outreach_messages", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      campaign_id: null,
      prospect_id: prospect.id,
      template_mode: "neutral",
      subject_line: built.subject,
      body_text: built.text,
      body_html: built.html,
      status: "draft",
      generated_at: now,
      updated_at: now,
    }),
  });
  const message = messageRows[0];
  if (!message) throw new Error("Broker outreach message could not be created.");

  const sentMessage = await sendBrokerMessage(message.id);
  return {
    prospect,
    message: sentMessage,
    created: !existing,
    duplicate_override: Boolean(input.force),
  };
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
