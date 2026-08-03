import { NextResponse } from "next/server";

import { notifyFllmOfBuyerOffer } from "@/lib/fllm-email";
import { createBuyerLead } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function value(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    if (value(formData, "_honey")) {
      return NextResponse.json({ ok: true });
    }
    if (!formData.get("non_binding_acknowledgment")) {
      return NextResponse.json({ error: "Please accept the offer acknowledgment." }, { status: 400 });
    }

    const lead = await createBuyerLead({
      fullName: value(formData, "name"),
      email: value(formData, "email"),
      phone: value(formData, "phone"),
      listingReference: value(formData, "listing_reference"),
      listingRequested: value(formData, "listing_requested"),
      offerAmountText: value(formData, "offer_amount"),
      purchaseMethod: value(formData, "purchase_method"),
      targetClosing: value(formData, "target_closing"),
      proofOfFunds: value(formData, "proof_of_funds"),
      offerExpiration: value(formData, "offer_expiration"),
      contingencies: value(formData, "contingencies"),
      message: value(formData, "message"),
    });

    try {
      await notifyFllmOfBuyerOffer(lead);
    } catch (notificationError) {
      console.error("Buyer lead notification failed", notificationError);
    }

    return NextResponse.json({ ok: true, leadReference: lead.submissionRef });
  } catch (error) {
    console.error("Buyer offer capture failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit offer." },
      { status: 500 }
    );
  }
}
