import { runDueLicenseReminders } from "@/lib/license-renewal-reminders";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (process.env.CRON_SECRET && request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json(await runDueLicenseReminders());
}
