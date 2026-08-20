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
  license_number?: string;
  current_holder_of_record?: string;
  license_status?: string;
  preferred_timing?: string;
  target_price?: string;
  contact_consent?: boolean | string;
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

function cleanInline(value: string | undefined, maxLength: number) {
  return (value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    if (!accepted(body.contact_consent)) {
      return NextResponse.json(
        { error: "Please authorize FLLM to contact you about this market estimate." },
        { status: 400 },
      );
    }

    const estimate = body.estimate ?? {};
    const licenseNumber = cleanInline(body.license_number, 80);
    const currentHolderOfRecord = cleanInline(body.current_holder_of_record, 180);

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

    const enrichedDetails = {
      kind: "valuation_lead",
      licenseNumber: licenseNumber || null,
      currentHolderOfRecord: currentHolderOfRecord || null,
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
    };
    const enrichedMessage = JSON.stringify(enrichedDetails);
    const enrichedLead = {
      ...lead,
      message: enrichedMessage,
      liveListingRef: licenseNumber || lead.liveListingRef,
      listingTitle: currentHolderOfRecord
        ? `${lead.county} ${lead.licenseType} valuation request — ${currentHolderOfRecord}`
        : lead.listingTitle,
    };

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      const patchResponse = await fetch(
        `${supabaseUrl.replace(/\/$/, "")}/rest/v1/listing_submissions?id=eq.${encodeURIComponent(lead.id)}`,
        {
          method: "PATCH",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            message: enrichedMessage,
            live_listing_ref: licenseNumber || null,
            listing_title: enrichedLead.listingTitle,
            updated_at: new Date().toISOString(),
          }),
          cache: "no-store",
        },
      );
      if (!patchResponse.ok) {
        console.error(
          "Could not enrich valuation lead with license identity details",
          patchResponse.status,
          await patchResponse.text(),
        );
      }
    }

    const emailResults = await Promise.allSettled([
      notifyFllmOfValuationLead(enrichedLead),
      sendValuationLeadAcknowledgement(enrichedLead),
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
