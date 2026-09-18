import { NextRequest, NextResponse } from "next/server";

import {
  buildBrokerOutreachMessage,
  listBrokerOutreachData,
} from "@/lib/broker-outreach";
import { sendFllmEmail } from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const TEST_TOKEN = "fllm-smoke-9f3d8b8a2e734ae99c6a2e1e";
const TEST_RECIPIENT = "JWigg023@gmail.com";
const SOURCE_BROKER_EMAIL = "lin.floridarealty@gmail.com";

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("token") !== TEST_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { prospects } = await listBrokerOutreachData();
    const prospect = prospects.find(
      (item) => item.email?.toLowerCase() === SOURCE_BROKER_EMAIL,
    );
    if (!prospect) {
      return NextResponse.json(
        { error: "Source broker prospect not found." },
        { status: 404 },
      );
    }

    const built = buildBrokerOutreachMessage(prospect);
    const result = await sendFllmEmail({
      to: TEST_RECIPIENT,
      subject: `[FLLM PRODUCTION TEST] ${built.subject}`,
      text: built.text,
      html: built.html,
    });

    return NextResponse.json({
      ok: true,
      recipient: TEST_RECIPIENT,
      sourceBroker: SOURCE_BROKER_EMAIL,
      providerMessageId: result.id,
      expectedFrom: "listings@floridaliquorlicensemarket.com",
      template: "current broker outreach production template",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
