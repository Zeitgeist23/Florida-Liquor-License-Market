import { cancelLicenseReminder } from "@/lib/license-reminder-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  let message = "This reminder could not be found or was already cancelled.";
  if (/^[0-9a-f-]{36}$/i.test(token)) {
    try {
      if (await cancelLicenseReminder(token)) message = "Your FLLM license-renewal reminder has been cancelled.";
    } catch {
      message = "We could not cancel the reminder right now. Please try again later.";
    }
  }
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>FLLM Reminder</title></head><body style="margin:0;background:#07131e;color:#eef3f6;font:16px Arial,sans-serif"><main style="max-width:680px;margin:80px auto;padding:32px;border:1px solid #f6a700;border-radius:8px;background:#0a1d2c"><h1 style="font-family:Georgia,serif">${message}</h1><p><a style="color:#f6a700" href="/resources/license-fees">Return to License Fees</a></p></main></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
