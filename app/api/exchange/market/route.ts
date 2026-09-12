import { NextResponse } from "next/server";

import { getApprovedSubmissionByPublicRef } from "@/lib/listing-submission-store";
import { publicListingReference } from "@/lib/public-listing-reference";

export const dynamic = "force-dynamic";

const ALLOWED_LICENSE_STATUSES = new Set([
  "Active and current",
  "Inactive",
  "In escrow (DBPR/ABT)",
  "Transfer pending",
  "Not sure",
]);

const ALLOWED_SALE_TIMINGS = new Set([
  "Immediately",
  "Within 30 days",
  "Within 31–60 days",
  "Within 31-60 days",
  "Within 61–90 days",
  "Within 61-90 days",
  "Flexible",
]);

function cleanField(value: string | null | undefined) {
  const cleaned = (value ?? "").trim().replace(/\s+/g, " ");
  return cleaned || null;
}

function allowedField(
  value: string | null | undefined,
  allowed: Set<string>,
) {
  const cleaned = cleanField(value);
  if (!cleaned) return null;
  return allowed.has(cleaned) ? cleaned.replace("31-60", "31–60").replace("61-90", "61–90") : null;
}

function contactPreferenceFromMessage(messageValue: string | null | undefined) {
  const message = messageValue ?? "";
  const match = message.match(
    /Preferred (?:buyer )?contact method:\s*(Either phone or email|Phone|Email)\b/i,
  );
  if (!match?.[1]) return null;
  const value = match[1].toLowerCase();
  if (value === "phone") return "Phone";
  if (value === "email") return "Email";
  return "Either phone or email";
}

/**
 * Locked self-directed listing detail schema.
 * Public self-directed ads may only expose the same seller-detail choices used by
 * the approved FLLM-975102 template. Free-form seller notes remain private and
 * cannot create new public-facing seller-detail rows.
 */
function selfDirectedSellerDetails(messageValue: string | null | undefined) {
  const message = messageValue ?? "";

  return {
    contactPreference: contactPreferenceFromMessage(message),
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

    const licenseType = seller.approvedLicenseType || seller.licenseType;
    const reference = publicListingReference(seller);
    const lockedLicenseStatus = allowedField(seller.licenseStatus, ALLOWED_LICENSE_STATUSES);
    const lockedPreferredTiming = allowedField(seller.preferredTiming, ALLOWED_SALE_TIMINGS);

    return NextResponse.json({
      enabled: true,
      askingPrice: seller.approvedAskingPrice ?? seller.askingPrice,
      listing: {
        reference,
        title: cleanField(seller.listingTitle) || `${seller.county} ${licenseType}`,
        county: cleanField(seller.county),
        licenseType: cleanField(licenseType),
        status: lockedLicenseStatus,
        url: cleanField(seller.liveListingUrl) || `/listings/${reference}`,
      },
      sellerDetails: {
        saleMethod: "FLLM Self-Directed Seller",
        licenseStatus: lockedLicenseStatus,
        preferredTiming: lockedPreferredTiming,
        ...selfDirectedSellerDetails(seller.message),
      },
    });
  } catch (error) {
    console.error("FLLM Exchange market quote failed", error);
    return NextResponse.json({ enabled: false, askingPrice: null }, { status: 200 });
  }
}
