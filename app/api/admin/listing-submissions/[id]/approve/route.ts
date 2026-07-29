import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sendListingApprovedEmail } from "@/lib/fllm-email";
import {
  approveListingSubmission,
  claimApprovalEmail,
  finishApprovalEmail,
  getSubmissionById,
} from "@/lib/listing-submission-store";
import { upsertMarketplaceListings } from "@/lib/listing-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ApprovalBody = {
  title?: string;
  licenseType?: "4COP Quota" | "3PS Quota / Package Store";
  askingPrice?: number | null;
};

function siteOrigin(requestUrl: string) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    new URL(requestUrl).origin
  ).replace(/\/$/, "");
}

function priceLabel(price: number | null) {
  if (price === null) return "Price Undisclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function countyLabel(county: string) {
  const cleaned = county.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as ApprovalBody;
    const submission = await getSubmissionById(id);
    if (!submission) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }
    if (submission.status !== "paid" && submission.status !== "approved") {
      return NextResponse.json(
        { error: "This submission cannot be published until Stripe payment is confirmed." },
        { status: 409 }
      );
    }

    const licenseType = body.licenseType;
    if (licenseType !== "4COP Quota" && licenseType !== "3PS Quota / Package Store") {
      return NextResponse.json({ error: "Select an approved license type." }, { status: 400 });
    }

    const askingPrice =
      body.askingPrice === null || body.askingPrice === undefined
        ? submission.askingPrice
        : Math.round(Number(body.askingPrice));
    if (askingPrice !== null && (!Number.isFinite(askingPrice) || askingPrice < 0)) {
      return NextResponse.json({ error: "Enter a valid asking price." }, { status: 400 });
    }

    const defaultTitle = `${countyLabel(submission.county)} ${licenseType} Liquor License (${submission.submissionRef})`;
    const title = (body.title || defaultTitle).trim();
    if (!title) return NextResponse.json({ error: "A listing title is required." }, { status: 400 });

    const liveListingUrl = `${siteOrigin(request.url)}/listings/${submission.submissionRef.toLowerCase()}`;

    await upsertMarketplaceListings([
      {
        county: countyLabel(submission.county),
        type: licenseType,
        price: askingPrice,
        priceLabel: priceLabel(askingPrice),
        sourceRef: submission.submissionRef,
        sourceName: "Florida Liquor License Market",
        note: submission.message ?? undefined,
        image: "/assets/license-market/license-01.png",
      },
    ]);

    const approved = await approveListingSubmission({
      id: submission.id,
      title,
      licenseType,
      askingPrice,
      liveListingUrl,
    });

    const claimed = await claimApprovalEmail(approved.id);
    if (claimed) {
      try {
        await sendListingApprovedEmail(claimed);
        await finishApprovalEmail(claimed.id, true);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Approval email failed.";
        await finishApprovalEmail(claimed.id, false, message);
        console.error("Approved listing email failed", error);
      }
    }

    const refreshed = await getSubmissionById(approved.id);
    return NextResponse.json({ submission: refreshed ?? approved });
  } catch (error) {
    console.error("Listing approval failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Listing approval failed." },
      { status: 500 }
    );
  }
}
