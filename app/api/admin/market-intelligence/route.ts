import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listMarketIntelligence, saveMarketIntelligence } from "@/lib/market-intelligence-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const records = await listMarketIntelligence();
    return NextResponse.json({ records });
  } catch (error) {
    console.error("Could not load FLLM market intelligence", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load market intelligence." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const confidence = body.identification_confidence;
    if (confidence !== null && confidence !== undefined && confidence !== "") {
      const n = Number(confidence);
      if (!Number.isFinite(n) || n < 0 || n > 100) {
        return NextResponse.json({ error: "Identification confidence must be between 0 and 100." }, { status: 400 });
      }
      body.identification_confidence = n;
    } else {
      body.identification_confidence = null;
    }

    for (const key of ["asking_price", "gross_revenue", "sde_cash_flow", "fllm_est_license_value"]) {
      body[key] = body[key] === "" || body[key] === undefined ? null : Number(body[key]);
      if (body[key] !== null && !Number.isFinite(body[key])) {
        return NextResponse.json({ error: `${key} must be numeric.` }, { status: 400 });
      }
    }

    await saveMarketIntelligence(body);
    return NextResponse.json({ records: await listMarketIntelligence() });
  } catch (error) {
    console.error("Could not save FLLM market intelligence", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save market intelligence." },
      { status: 500 },
    );
  }
}
