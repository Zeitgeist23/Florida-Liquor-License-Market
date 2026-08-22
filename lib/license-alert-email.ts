import "server-only";

import type { LicenseAlert } from "@/lib/license-alert-store";
import { sendFllmEmail } from "@/lib/fllm-email";

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

function formatMoney(value: number | null) {
  if (value === null) return "No price disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function criteriaText(alert: LicenseAlert) {
  const counties = alert.counties.length === 67 ? "All Florida counties" : alert.counties.join(", ");
  const types = alert.license_types.join(" and ");
  const maxPrice = alert.max_price === null ? "Any asking price" : `Up to ${formatMoney(alert.max_price)}`;
  return { counties, types, maxPrice };
}

function emailShell(content: string, unsubscribeToken: string) {
  const origin = siteUrl();
  const unsubscribeUrl = `${origin}/api/license-alerts/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0b1f3a;">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d9dfeb;border-radius:14px;overflow:hidden;">
      <div style="padding:22px 28px;background:#071a3a;color:#ffffff;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;">Florida Liquor License Market</div>
        <div style="margin-top:4px;color:#d3a43a;font-size:13px;letter-spacing:.03em;">LICENSE ALERTS</div>
      </div>
      <div style="padding:28px;font-size:16px;line-height:1.55;">${content}</div>
      <div style="padding:18px 28px;background:#f8f9fc;border-top:1px solid #e4e8ef;font-size:12px;line-height:1.5;color:#5a6574;">
        You received this email because you created an FLLM License Alert. <a href="${unsubscribeUrl}" style="color:#071a3a;">Unsubscribe from this alert</a>.
      </div>
    </div>
  </body></html>`;
}

export async function sendLicenseAlertConfirmation(alert: LicenseAlert) {
  const criteria = criteriaText(alert);
  const name = alert.first_name ? ` ${escapeHtml(alert.first_name)}` : "";
  const html = emailShell(`
    <p style="margin-top:0;">Hello${name},</p>
    <p>Your FLLM License Alert is active. We’ll email you when a new listing matches the preferences below.</p>
    <div style="margin:20px 0;padding:18px;border:1px solid #e1e6ee;border-radius:10px;background:#fbfcfe;">
      <strong>Counties:</strong> ${escapeHtml(criteria.counties)}<br>
      <strong>License types:</strong> ${escapeHtml(criteria.types)}<br>
      <strong>Price preference:</strong> ${escapeHtml(criteria.maxPrice)}
    </div>
    <p style="margin-bottom:0;">You can continue browsing current inventory at <a href="${siteUrl()}/listings" style="color:#9a6700;font-weight:700;">Florida Liquor Licenses for Sale</a>.</p>
  `, alert.unsubscribe_token);

  const text = `Your FLLM License Alert is active.\n\nCounties: ${criteria.counties}\nLicense types: ${criteria.types}\nPrice preference: ${criteria.maxPrice}\n\nCurrent listings: ${siteUrl()}/listings`;

  return sendFllmEmail({
    to: alert.email,
    subject: "Your FLLM License Alert Is Active",
    text,
    html,
  });
}

export async function sendMatchingLicenseAlert(input: {
  alert: LicenseAlert;
  listing: {
    county: string;
    type: "4COP Quota" | "3PS Quota / Package Store";
    price: number | null;
    priceLabel: string;
    sourceRef: string;
    url: string;
  };
}) {
  const { alert, listing } = input;
  const html = emailShell(`
    <p style="margin-top:0;font-size:13px;font-weight:700;letter-spacing:.08em;color:#9a6700;">NEW MATCH</p>
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:#071a3a;">A license matching your alert is now available</h1>
    <div style="margin:20px 0;padding:20px;border:1px solid #d9dfeb;border-radius:10px;">
      <strong style="font-size:19px;">${escapeHtml(listing.type)}</strong><br>
      <span>${escapeHtml(listing.county)}</span><br>
      <span style="display:inline-block;margin-top:8px;font-size:20px;font-weight:700;color:#9a6700;">${escapeHtml(listing.priceLabel || formatMoney(listing.price))}</span>
    </div>
    <p><a href="${escapeHtml(listing.url)}" style="display:inline-block;padding:12px 18px;background:#c58b16;color:#071a3a;text-decoration:none;font-weight:700;border-radius:7px;">View License Listing</a></p>
    <p style="margin-bottom:0;color:#5a6574;font-size:13px;">Availability, price, license status, and transferability remain subject to confirmation and applicable state requirements.</p>
  `, alert.unsubscribe_token);

  const text = `New FLLM License Alert match\n\n${listing.type}\n${listing.county}\n${listing.priceLabel || formatMoney(listing.price)}\n\nView listing: ${listing.url}`;

  return sendFllmEmail({
    to: alert.email,
    subject: `New ${listing.type} Available — ${listing.county}`,
    text,
    html,
  });
}
