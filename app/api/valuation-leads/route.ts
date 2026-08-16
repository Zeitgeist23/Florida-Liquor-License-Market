import { NextResponse } from "next/server";

import {
  notifyFllmOfValuationLead,
  sendValuationLeadAcknowledgement,
} from "@/lib/fllm-email";
import { createValuationLead } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  county?: string;
  license_type?: string;
  license_status?: string;
  preferred_timing?: string;
  target_price?: string;
  contact_consent?: boolean | string;
  honey?: string;
  estimate?: {
    count?: number;
    low?: number | null;
    median?: number | null;
    high?: number | null;
    typicalLow?: number | null;
    typicalHigh?: number | null;
    confidence?: string;
    generatedAt?: string;
  };
};

function accepted(value: boolean | string | undefined) {
  return value === true || value === "true" || value === "Accepted";
}

function amount(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    if (body.honey) return NextResponse.json({ ok: true });
    if (!accepted(body.contact_consent)) {
      return NextResponse.json(
        { error: "Please authorize FLLM to contact you about this market estimate." },
        { status: 400 },
      );
    }

    const estimate = body.estimate ?? {};
    const lead = await createValuationLead({
      fullName: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      county: body.county ?? "",
      licenseType: body.license_type ?? "",
      licenseStatus: body.license_status ?? "",
      preferredTiming: body.preferred_timing ?? "",
      targetPriceText: body.target_price,
      estimate: {
        count: typeof estimate.count === "number" ? estimate.count : 0,
        low: amount(estimate.low),
        median: amount(estimate.median),
        high: amount(estimate.high),
        typicalLow: amount(estimate.typicalLow),
        typicalHigh: amount(estimate.typicalHigh),
        confidence: estimate.confidence ?? "unavailable",
        generatedAt: estimate.generatedAt ?? new Date().toISOString(),
      },
    });

    const emailResults = await Promise.allSettled([
      notifyFllmOfValuationLead(lead),
      sendValuationLeadAcknowledgement(lead),
    ]);
    emailResults.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(index === 0 ? "Valuation lead notification failed" : "Valuation acknowledgement failed", result.reason);
      }
    });

    return NextResponse.json({ ok: true, leadReference: lead.submissionRef });
  } catch (error) {
    console.error("Valuation lead capture failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit valuation request." },
      { status: 500 },
    );
  }
}
