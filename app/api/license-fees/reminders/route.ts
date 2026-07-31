import { NextResponse } from "next/server";

import { sendFllmEmail } from "@/lib/fllm-email";
import { lookupFloridaRetailLicense, reminderDateForExpiration } from "@/lib/license-fee-lookup";
import { saveLicenseReminder } from "@/lib/license-reminder-store";

export const runtime = "nodejs";

function validEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value) && value.length <= 254;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      licenseNumber?: string;
      email?: string;
      consent?: boolean;
    };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (body.consent !== true) {
      return NextResponse.json({ error: "Please authorize the requested renewal-reminder email." }, { status: 400 });
    }

    const license = await lookupFloridaRetailLicense(body.licenseNumber ?? "");
    if (!license) {
      return NextResponse.json({ error: "The DBPR license could not be verified." }, { status: 404 });
    }
    const dates = reminderDateForExpiration(license.expirationDate);
    const reminder = await saveLicenseReminder({ email, license, ...dates });

    const reminderDate = formatDate(dates.reminderDate);
    const expirationDate = formatDate(dates.expirationDate);
    const feeText = license.annualFee === null
      ? "DBPR will determine the final amount"
      : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(license.annualFee);
    const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.floridaliquorlicensemarket.com").replace(/\/$/, "");
    const unsubscribeUrl = `${site}/api/license-fees/reminders/unsubscribe?token=${encodeURIComponent(reminder.unsubscribe_token)}`;
    try {
      await sendFllmEmail({
        to: email,
        subject: `FLLM Renewal Reminder Scheduled — ${license.licenseNumber}`,
        text: `Your FLLM Florida liquor-license renewal reminder is scheduled.\n\nLicense: ${license.licenseNumber}\nType: ${license.series}\nCounty: ${license.county}\nPublished annual fee: ${feeText}\nExpiration date: ${expirationDate}\nReminder date: ${reminderDate}\n\nFLLM will email you 30 days before next year’s expiration date. DBPR determines the final amount due and processes payment through its official portal.\n\nCancel this reminder: ${unsubscribeUrl}`,
        html: `<p>Your Florida Liquor License Market renewal reminder is scheduled.</p><p><strong>License:</strong> ${escapeHtml(license.licenseNumber)}<br><strong>Type:</strong> ${escapeHtml(license.series)}<br><strong>County:</strong> ${escapeHtml(license.county)}<br><strong>Published annual fee:</strong> ${escapeHtml(feeText)}<br><strong>Expiration date:</strong> ${escapeHtml(expirationDate)}<br><strong>Reminder date:</strong> ${escapeHtml(reminderDate)}</p><p>FLLM will email you 30 days before next year’s expiration date. DBPR determines the final amount due and processes payment through its official portal.</p><p><a href="${unsubscribeUrl}">Cancel this reminder</a></p>`,
      });
    } catch (emailError) {
      console.error("Reminder acknowledgement email failed", emailError);
    }

    return NextResponse.json({
      success: true,
      reminderDate,
      expirationDate,
      message: `Your FLLM reminder is scheduled for ${reminderDate}.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "The reminder could not be scheduled." },
      { status: 500 }
    );
  }
}
