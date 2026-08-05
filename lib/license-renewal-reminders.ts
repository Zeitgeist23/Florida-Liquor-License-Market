import "server-only";

import { sendFllmEmail } from "@/lib/fllm-email";
import { dueLicenseReminders, updateLicenseReminder } from "@/lib/license-reminder-store";

export type LicenseRenewalReminderRun = {
  processed: number;
  sent: number;
  failed: number;
};

function money(value: number | null) {
  return value === null
    ? "Confirm with DBPR"
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export async function runDueLicenseReminders(): Promise<LicenseRenewalReminderRun> {
  const reminders = await dueLicenseReminders();
  let sent = 0;
  let failed = 0;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.floridaliquorlicensemarket.com").replace(/\/$/, "");

  for (const reminder of reminders) {
    try {
      await updateLicenseReminder(reminder.id, { status: "sending" }, reminder.objectName);
      const dbprUrl = "https://www.myfloridalicense.com/datamart/mainMenuFLDBPR.do";
      const unsubscribeUrl = `${site}/api/license-fees/reminders/unsubscribe?token=${encodeURIComponent(reminder.unsubscribe_token)}`;

      await sendFllmEmail({
        to: reminder.email,
        subject: `Renewal Reminder: ${reminder.license_number} Expires in 30 Days`,
        text: `This is the FLLM reminder you requested for Florida liquor license ${reminder.license_number}.\n\nType: ${reminder.license_series}\nCounty: ${reminder.county}\nExpiration date: ${reminder.license_expiration_date}\nPublished annual fee: ${money(reminder.annual_fee)}\nPublished half-year fee: ${money(reminder.half_year_fee)}\n\nSign in to the official DBPR portal to confirm the amount due and complete renewal: ${dbprUrl}\n\nFLLM does not collect this government fee. DBPR determines the final balance and processes payment.\n\nCancel reminder: ${unsubscribeUrl}`,
        html: `<p>This is the FLLM reminder you requested for Florida liquor license <strong>${reminder.license_number}</strong>.</p><p><strong>Type:</strong> ${reminder.license_series}<br><strong>County:</strong> ${reminder.county}<br><strong>Expiration date:</strong> ${reminder.license_expiration_date}<br><strong>Published annual fee:</strong> ${money(reminder.annual_fee)}<br><strong>Published half-year fee:</strong> ${money(reminder.half_year_fee)}</p><p><a href="${dbprUrl}" style="display:inline-block;padding:13px 20px;background:#f6a700;color:#07131e;font-weight:bold;text-decoration:none">Continue to Official DBPR Renewal &amp; Payment</a></p><p>FLLM does not collect this government fee. DBPR determines the final balance and processes payment.</p><p><a href="${unsubscribeUrl}">Cancel reminder</a></p>`,
      });

      await updateLicenseReminder(
        reminder.id,
        { status: "sent", sent_at: new Date().toISOString(), last_error: null },
        reminder.objectName
      );
      sent += 1;
    } catch (error) {
      failed += 1;
      await updateLicenseReminder(
        reminder.id,
        {
          status: "failed",
          last_error: error instanceof Error ? error.message.slice(0, 1500) : "Email delivery failed",
        },
        reminder.objectName
      );
    }
  }

  return { processed: reminders.length, sent, failed };
}
