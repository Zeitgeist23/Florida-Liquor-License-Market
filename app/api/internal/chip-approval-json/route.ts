import { NextRequest, NextResponse } from "next/server";

import { sendFllmEmail } from "@/lib/fllm-email";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TOKEN = "chip-approval-json-76830260";
const TEST_RECIPIENT = "JWigg023@gmail.com";
const DRAFT_ID = "76830260-3fa2-404e-8770-04ea5148ad68";

async function getDraft() {
  const { url, key } = supabaseServiceSettings("Broker outreach database is unavailable.");
  const response = await fetch(
    `${url}/rest/v1/broker_outreach_messages?select=*&id=eq.${DRAFT_ID}&limit=1`,
    {
      cache: "no-store",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Could not load broker outreach draft: ${response.status} ${await response.text()}`);
  }
  const rows = await response.json();
  return rows[0];
}

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const draft = await getDraft();
    if (!draft) {
      return NextResponse.json({ ok: false, error: "Draft not found." }, { status: 404 });
    }

    const result = await sendFllmEmail({
      to: TEST_RECIPIENT,
      subject: `APPROVAL COPY — ${draft.subject_line}`,
      text: draft.body_text,
      html: draft.body_html,
    });

    return NextResponse.json({
      ok: true,
      recipient: TEST_RECIPIENT,
      chipEmailed: false,
      draftId: DRAFT_ID,
      providerMessageId: result.id,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
