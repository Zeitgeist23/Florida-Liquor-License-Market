import { NextResponse } from "next/server";

import { sendFllmEmail } from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TOKEN = "fllm-20260901-7D4F9A";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const env = {
    GOOGLE_CLIENT_ID: Boolean(process.env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    GOOGLE_REFRESH_TOKEN: Boolean(process.env.GOOGLE_REFRESH_TOKEN),
    GOOGLE_SENDER_EMAIL: process.env.GOOGLE_SENDER_EMAIL || null,
  };

  try {
    const result = await sendFllmEmail({
      to: process.env.GOOGLE_SENDER_EMAIL || "listings@floridaliquorlicensemarket.com",
      subject: "FLLM production email health check",
      text: "Automated production email health check. No action required.",
      html: "<p>Automated production email health check. No action required.</p>",
    });
    return NextResponse.json({ ok: true, env, gmailMessageId: result.id });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        env,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
