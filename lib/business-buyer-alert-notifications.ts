import "server-only";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

import {
  businessMarketRecordHref,
  businessQuotaListingRecords,
  passesBusinessMarketSourcePolicy,
  type BusinessQuotaListing,
} from "@/lib/business-quota-listings";
import {
  activeBusinessBuyerAlerts,
  markBusinessBuyerAlertNotified,
  type BusinessBuyerAlert,
} from "@/lib/business-buyer-alert-store";
import { sendFllmEmail } from "@/lib/fllm-email";

type AlertPropertyRow = {listing_reference:string;property_status:string|null;monthly_rent:number|null;lease_expiration_date:string|null;real_estate_also_separately_offered:boolean;duplicate_of:string|null;seller_financing_offered:boolean|null;seller_financing_evidence_url:string|null;seller_down_payment:number|null;verified_attributes:Record<string,boolean>|null;sba_advertised_status:string|null;sba_evidence_url:string|null};
async function primeRate(){
  const {url,key}=supabaseServiceSettings("SBA rate unavailable");
  const response=await fetch(`${url}/rest/v1/sba_prime_rate_cache?series_id=eq.DPRIME&select=annual_rate,observation_date&limit=1`,{headers:{apikey:key,Authorization:`Bearer ${key}`},cache:"no-store"});
  if(!response.ok){console.error("SBA rate cache unavailable; using dated fallback");return .07;}
  const rows=await response.json() as Array<{annual_rate:number|string;observation_date:string}>;
  const n=Number(rows[0]?.annual_rate);
  if(!Number.isFinite(n)||n<.01||n>.25){console.error("SBA rate cache missing/invalid; using dated fallback");return .07;}
  return n;
}
async function propertyFacts(){
  const {url,key}=supabaseServiceSettings("Buyer matching property database unavailable");
  const res=await fetch(`${url}/rest/v1/business_property_terms?select=listing_reference,property_status,monthly_rent,lease_expiration_date,real_estate_also_separately_offered,duplicate_of,seller_financing_offered,seller_financing_evidence_url,seller_down_payment,verified_attributes,sba_advertised_status,sba_evidence_url&limit=1000`,{headers:{apikey:key,Authorization:`Bearer ${key}`},cache:"no-store"});
  if(!res.ok)throw new Error(`Buyer-alert property lookup failed: ${res.status}`);
  return new Map((await res.json() as AlertPropertyRow[]).map(x=>[x.listing_reference,x]));
}
function advancedMatches(alert:BusinessBuyerAlert, listing:BusinessQuotaListing, fact:AlertPropertyRow|undefined, prime:number){
  if(fact?.duplicate_of)return false;
  const e=alert.extra_criteria||[];
  if(e.includes("Standalone license only"))return false;
  if(e.includes("Transferable license required")&&listing.licenseClass!=="quota")return false;
  if(e.some(x=>["Waterfront / Beachfront","Absentee owner preferred","Turnkey operation","Established business only","Franchise","Outdoor seating"].includes(x)&&fact?.verified_attributes?.[x]!==true))return false;
  const prop=alert.real_estate;
  if(prop==="Lease only"&&fact?.property_status!=="lease_only")return false;
  if(prop==="Real estate included"&&fact?.property_status!=="included")return false;
  if(prop==="Real estate available separately"&&fact?.property_status!=="available_separately"&&!fact?.real_estate_also_separately_offered)return false;
  const rent=Number((alert.monthly_rent||"").replace(/[^0-9.]/g,""));
  if(alert.monthly_rent&&alert.monthly_rent!=="Any"&&(!fact?.monthly_rent||Number(fact.monthly_rent)>rent))return false;
  const years=Number((alert.lease_years||"").replace(/[^0-9.]/g,""));
  if(alert.lease_years&&alert.lease_years!=="Any"){
    if(!fact?.lease_expiration_date)return false;
    const expire=new Date(fact.lease_expiration_date+"T23:59:59Z").getTime();
    if(!Number.isFinite(expire)||(expire-Date.now())/31556952000<years)return false;
  }
  if(alert.financing_preferences.includes("SBA")){
    if(fact?.sba_advertised_status==="not_eligible"&&fact.sba_evidence_url)return false;
    if(!(fact?.sba_advertised_status==="eligible"&&fact.sba_evidence_url)){
      const income=listing.ebitdaNumber&&listing.ebitdaNumber>0?listing.ebitdaNumber:listing.sdeNumber;
      const loan=listing.packagePriceNumber*.90;
      if(!income||loan<=0||loan>5_000_000)return false;
      const spread=loan<=50000?.065:loan<=250000?.06:loan<=350000?.045:.03;
      const rate=(prime+spread)/12,annual=12*loan*rate/(1-Math.pow(1+rate,-120));
      if(income/annual<1.25)return false;
    }
  }
  if(alert.financing_preferences.includes("Seller Financing")&&!(fact?.seller_financing_offered&&fact.seller_financing_evidence_url))return false;
  if(alert.available_cash!==undefined&&alert.available_cash!==null){
    if(alert.financing_preferences.includes("Cash")&&alert.available_cash<listing.packagePriceNumber)return false;
    if(alert.financing_preferences.includes("Seller Financing")&&(!fact?.seller_down_payment||alert.available_cash<fact.seller_down_payment))return false;
    if(alert.financing_preferences.includes("SBA")&&alert.available_cash<listing.packagePriceNumber*.10)return false;
  }
  return true;
}

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    "https://www.floridaliquorlicensemarket.com"
  ).replace(/\/$/, "");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value: number | null | undefined) {
  if (value === null || value === undefined) return "No minimum";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function publishedBusinessAlertInventory() {
  return businessQuotaListingRecords.filter((listing) =>
    listing.publicationStatus === "published" &&
    (listing.listingTier !== "market" || passesBusinessMarketSourcePolicy(listing))
  );
}

function minimumMatches(minimum: number | null, disclosed: number | undefined) {
  if (minimum === null) return true;
  return typeof disclosed === "number" && Number.isFinite(disclosed) && disclosed >= minimum;
}

export function businessListingMatchesAlert(
  alert: BusinessBuyerAlert,
  listing: BusinessQuotaListing,
) {
  if (!alert.business_types.includes(listing.businessCategory)) return false;
  if (!alert.license_types.includes(listing.licenseType)) return false;
  if (!alert.counties.includes(listing.county)) return false;
  if (alert.max_purchase_price !== null && listing.packagePriceNumber > alert.max_purchase_price) return false;
  if (!minimumMatches(alert.min_gross_revenue, listing.grossRevenueNumber)) return false;
  if (!minimumMatches(alert.min_sde, listing.sdeNumber)) return false;
  if (!minimumMatches(alert.min_ebitda, listing.ebitdaNumber)) return false;
  return true;
}

function absoluteListingUrl(listing: BusinessQuotaListing) {
  return `${siteUrl()}${businessMarketRecordHref(listing)}`;
}

export async function currentBusinessAlertMatches(alert: BusinessBuyerAlert) {
  const [facts,prime]=await Promise.all([propertyFacts(),primeRate()]);
  return publishedBusinessAlertInventory()
    .filter((listing) => businessListingMatchesAlert(alert, listing) && advancedMatches(alert, listing, facts.get(listing.listingReference),prime))
    .map((listing) => ({ listing, url: absoluteListingUrl(listing) }));
}

function criteriaHtml(alert: BusinessBuyerAlert) {
  return `<div style="margin:18px 0;padding:16px;border:1px solid #d9dfeb;border-radius:10px;background:#fbfcfe;line-height:1.65">
    <strong>Business types:</strong> ${escapeHtml(alert.business_types.join(", "))}<br>
    <strong>License types:</strong> ${escapeHtml(alert.license_types.join(", "))}<br>
    <strong>Counties:</strong> ${escapeHtml(alert.counties.join(", "))}<br>
    <strong>Maximum purchase price:</strong> ${escapeHtml(money(alert.max_purchase_price))}<br>
    <strong>Minimum gross sales:</strong> ${escapeHtml(money(alert.min_gross_revenue))}<br>
    <strong>Minimum SDE / Cash Flow:</strong> ${escapeHtml(money(alert.min_sde))}<br>
    <strong>Minimum EBITDA:</strong> ${escapeHtml(money(alert.min_ebitda))}<br>
    <strong>Financing preference:</strong> ${escapeHtml(alert.financing_preferences.join(", "))}
  </div>`;
}

function card(item: { listing: BusinessQuotaListing; url: string }) {
  const { listing, url } = item;
  const metrics = [
    typeof listing.grossRevenueNumber === "number" ? `<br><strong>Gross sales:</strong> ${money(listing.grossRevenueNumber)}` : "",
    typeof listing.sdeNumber === "number" ? `<br><strong>SDE / Cash Flow:</strong> ${money(listing.sdeNumber)}` : "",
    typeof listing.ebitdaNumber === "number" ? `<br><strong>EBITDA:</strong> ${money(listing.ebitdaNumber)}` : "",
  ].join("");
  return `<div style="margin:14px 0;padding:17px;border:1px solid #d9dfeb;border-radius:10px">
    <strong style="font-size:18px">${escapeHtml(listing.businessCategory)} · ${escapeHtml(listing.county)}</strong><br>
    ${escapeHtml(listing.licenseType)}<br>
    <span style="display:inline-block;margin-top:7px;font-size:19px;font-weight:700;color:#9a6700">${escapeHtml(listing.packagePrice)}</span>
    ${metrics}
    <p style="margin:12px 0 0"><a href="${escapeHtml(url)}" style="color:#0645ad;font-weight:700">View FLLM page →</a></p>
  </div>`;
}

function shell(alert: BusinessBuyerAlert, body: string) {
  const unsubscribe = `${siteUrl()}/api/business-alerts/unsubscribe?token=${encodeURIComponent(alert.unsubscribe_token)}`;
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0b1f3a">
    <div style="max-width:720px;margin:0 auto;background:#fff;border:1px solid #d9dfeb;border-radius:14px;overflow:hidden">
      <div style="padding:22px 28px;background:#071a3a;color:#fff">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700">Florida Liquor License Market</div>
        <div style="margin-top:4px;color:#d3a43a;font-size:13px">BUSINESS + LIQUOR LICENSE BUYER ALERT</div>
      </div>
      <div style="padding:28px;font-size:15px;line-height:1.6">${body}</div>
      <div style="padding:18px 28px;background:#f8f9fc;border-top:1px solid #e4e8ef;font-size:12px;color:#5a6574">
        You received this email because you created an FLLM buyer alert.
        <a href="${unsubscribe}" style="color:#071a3a">Unsubscribe</a>.
      </div>
    </div>
  </body></html>`;
}

export async function sendBusinessBuyerAlertConfirmation(
  alert: BusinessBuyerAlert,
  matches: Array<{ listing: BusinessQuotaListing; url: string }>,
) {
  const current = matches.length
    ? `<h2 style="font-family:Georgia,'Times New Roman',serif">Current matching opportunities</h2>
       <p>FLLM currently has ${matches.length} published ${matches.length === 1 ? "opportunity" : "opportunities"} matching your criteria.</p>
       ${matches.slice(0, 12).map(card).join("")}
       ${matches.length > 12 ? `<p>Plus ${matches.length - 12} additional current matches.</p>` : ""}`
    : "<p>There are no current published matches under all of your criteria. FLLM will email you when a new matching opportunity is published.</p>";

  const html = shell(alert, `<p>Hello ${escapeHtml(alert.first_name || "there")},</p>
    <p>Your FLLM Business + Liquor License Buyer Alert is active. FLLM will watch published Market Views and authorized Featured Broker Listings for matching opportunities.</p>
    ${criteriaHtml(alert)}
    ${current}
    <p style="color:#5a6574;font-size:13px">FLLM Market Views are market-intelligence pages and do not mean FLLM represents the observed business.</p>`);

  const text = `Your FLLM Business + Liquor License Buyer Alert is active.
Business types: ${alert.business_types.join(", ")}
License types: ${alert.license_types.join(", ")}
Counties: ${alert.counties.join(", ")}
Current matching opportunities: ${matches.length}`;

  return sendFllmEmail({
    to: alert.email,
    subject: "Your FLLM Business + Liquor License Buyer Alert Is Active",
    text,
    html,
  });
}

export async function notifyFllmOfBusinessBuyerAlert(
  alert: BusinessBuyerAlert,
  matchCount: number,
) {
  const to =
    process.env.FLLM_CONTACT_INQUIRY_EMAIL ||
    process.env.GOOGLE_SENDER_EMAIL ||
    "listings@floridaliquorlicensemarket.com";
  const name = `${alert.first_name} ${alert.last_name}`.trim();
  const html = `<h1>New Business + Liquor License Buyer Alert</h1>
    <p><strong>${escapeHtml(name)}</strong><br>${escapeHtml(alert.email)}<br>${escapeHtml(alert.phone)}<br>${escapeHtml(alert.submission_ref)}</p>
    ${criteriaHtml(alert)}
    <p><strong>Current matches:</strong> ${matchCount}</p>`;
  const text = `New Business + Liquor License Buyer Alert
${name}
${alert.email}
${alert.phone}
${alert.submission_ref}
Current matches: ${matchCount}`;
  return sendFllmEmail({
    to,
    replyTo: alert.email,
    subject: `Business Buyer Alert Lead — ${name} — ${alert.submission_ref}`,
    text,
    html,
  });
}

export async function activateBusinessBuyerAlert(alert: BusinessBuyerAlert) {
  const matches = await currentBusinessAlertMatches(alert);
  await sendBusinessBuyerAlertConfirmation(alert, matches);
  if (matches.length) {
    await markBusinessBuyerAlertNotified(
      alert,
      matches.map(({ listing }) => listing.listingReference),
    );
  }
  try {
    await notifyFllmOfBusinessBuyerAlert(alert, matches.length);
  } catch (error) {
    console.error("Business buyer alert admin notification failed", error);
  }
  return { currentMatches: matches.length };
}

export async function notifyMatchingBusinessBuyerAlerts() {
  const alerts = await activeBusinessBuyerAlerts();
  let matchedAlerts = 0;
  let sentEmails = 0;
  let matchedListings = 0;
  let failed = 0;

  for (const alert of alerts) {
    const matches = (await currentBusinessAlertMatches(alert)).filter(
      ({ listing }) => !alert.notified_listing_refs.includes(listing.listingReference),
    );
    if (!matches.length) continue;
    matchedAlerts += 1;
    matchedListings += matches.length;
    try {
      const html = shell(alert, `<h1 style="font-family:Georgia,'Times New Roman',serif">New business + liquor-license matches</h1>
        ${matches.map(card).join("")}
        <p style="color:#5a6574;font-size:13px">Availability, financial information, asking price, license status and transaction terms should be independently confirmed. Market Views do not imply FLLM representation of the observed business.</p>`);
      const text = `New FLLM Business + Liquor License matches

${matches.map(({ listing, url }) => `${listing.businessCategory} · ${listing.county}
${listing.licenseType}
${listing.packagePrice}
${url}`).join("\n\n")}`;
      await sendFllmEmail({
        to: alert.email,
        subject: matches.length === 1
          ? `New ${matches[0].listing.businessCategory} Opportunity — ${matches[0].listing.county}`
          : `${matches.length} New FLLM Business + Liquor License Matches`,
        text,
        html,
      });
      await markBusinessBuyerAlertNotified(
        alert,
        matches.map(({ listing }) => listing.listingReference),
      );
      sentEmails += 1;
    } catch (error) {
      failed += 1;
      console.error("Business buyer alert email failed", { alertId: alert.id, error });
    }
  }

  return { alerts: alerts.length, matchedAlerts, matchedListings, sentEmails, failed };
}
