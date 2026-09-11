import { NextResponse } from "next/server";

import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";

function cleanField(value: string | null | undefined) {
  const cleaned = (value ?? "").trim().replace(/\s+/g, " ");
  return cleaned || null;
}

function messageField(message: string, labels: string[]) {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = message.match(new RegExp(`${escaped}\\s*([^\\n]+)`, "i"));
    if (match?.[1]) return cleanField(match[1]);
  }
  return null;
}

function selfDirectedSellerDetails(messageValue: string | null | undefined) {
  const message = messageValue ?? "";
  const contactPreference = messageField(message, [
    "Preferred buyer contact method:",
    "Preferred contact method:",
  ]);

  return {
    contactPreference,
    negotiable: /\bnegotiable\b/i.test(message),
    licenseOnly: /license only|not tied to the sale of a business|no business purchase required|no business or real estate/i.test(message),
    sellerFinancing: /seller financing/i.test(message),
    buyerQualification: /proof of funds|financial qualification/i.test(message),
    noBroker: /no broker(?: solicitation)?|for sale by owner/i.test(message),
    directBuyersOnly: /principals?\s*\/\s*direct buyers? only|direct buyers? only|principals? only/i.test(message),
    transferApproval: /DBPR|ABT approval|transfer to a qualified buyer/i.test(message),
  };
}

export async function GET(request: Request) {
  try {
    const listingRef = new URL(request.url).searchParams.get("listingRef")?.trim().toUpperCase() || "";
    if (!/^FLLM-[A-Z0-9-]+$/.test(listingRef)) {
      return NextResponse.json({ error: "Invalid listing reference." }, { status: 400 });
    }
    const seller = await getApprovedSubmissionByPublicRef(listingRef);
    if (!seller) return NextResponse.json({ enabled: false, askingPrice: null });

    return NextResponse.json({
      enabled: true,
      askingPrice: seller.approvedAskingPrice ?? seller.askingPrice,
      sellerDetails: {
        saleMethod: "FLLM Self-Directed Seller",
        licenseStatus: cleanField(seller.licenseStatus),
        preferredTiming: cleanField(seller.preferredTiming),
        ...selfDirectedSellerDetails(seller.message),
      },
    });
  } catch (error) {
    console.error("FLLM Exchange market quote failed", error);
    return NextResponse.json({ enabled: false, askingPrice: null }, { status: 200 });
  }
}
