import { NextResponse } from "next/server";
import { sendFllmEmail } from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("k") !== "91c7-fllm-mail") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const env = {
    clientId: Boolean(process.env.GOOGLE_CLIENT_ID),
    clientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    refreshToken: Boolean(process.env.GOOGLE_REFRESH_TOKEN),
    sender: process.env.GOOGLE_SENDER_EMAIL || null,
  };

  try {
    const result = await sendFllmEmail({
      to: "jwigg023@gmail.com",
      subject: "FLLM mail diagnostic — no action required",
      text: "One-time FLLM production mail diagnostic.",
      html: "<p>One-time FLLM production mail diagnostic.</p>",
    });
    return NextResponse.json({ ok: true, env, result });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      env,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
