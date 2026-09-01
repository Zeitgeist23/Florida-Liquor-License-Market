import { NextResponse } from "next/server";

import { getExchangeMarket } from "@/lib/exchange-store";
import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const listingRef = new URL(request.url).searchParams.get("listingRef")?.trim().toUpperCase() || "";
    if (!/^FLLM-[A-Z0-9-]+$/.test(listingRef)) {
      return NextResponse.json({ error: "Invalid listing reference." }, { status: 400 });
    }
    const seller = await getApprovedSubmissionByPublicRef(listingRef);
    if (!seller) return NextResponse.json({ enabled: false, bestBid: null, bidCount: 0, askingPrice: null });
    const market = await getExchangeMarket(listingRef);
    return NextResponse.json({
      enabled: true,
      askingPrice: seller.approvedAskingPrice ?? seller.askingPrice,
      bestBid: market.bestBid,
      bidCount: market.bidCount,
    });
  } catch (error) {
    console.error("FLLM Exchange market quote failed", error);
    return NextResponse.json({ enabled: false, bestBid: null, bidCount: 0, askingPrice: null }, { status: 200 });
  }
}
