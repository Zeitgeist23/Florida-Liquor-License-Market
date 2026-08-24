import { NextResponse } from "next/server";

import {
  createFormalLicenseAppraisalOrder,
} from "@/lib/formal-license-appraisal";
import {
  isValidFloridaRetailLicenseNumber,
  validateFloridaRetailLicenseIdentity,
} from "@/lib/license-fee-lookup";
import {
  attachCheckoutSession,
  getSubmissionByCheckoutSession,
  markCheckoutFailed,
} from "@/lib/listing-submission-store";
import { createFormalLicenseAppraisalCheckoutSession } from "@/lib/stripe-formal-license-appraisal-checkout";

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
  ordering_party?: string;
  intended_use?: string;
  institution_name?: string;
  effective_date?: string;
  notes?: string;
  terms_accepted?: boolean | string;
  lender_disclosure_accepted?: boolean | string;
};

function accepted(value: boolean | string | undefined) {
  return value === true || value === "true" || value === "Accepted";
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error || "Unknown error");
}

function isTransientFetchFailure(error: unknown) {
  return /fetch failed|failed to fetch|networkerror|econnreset|etimedout|socket hang up/i.test(errorMessage(error));
}

async function retryTransient<T>(task: () => Promise<T>, label: string): Promise<T> {
  try {
    return await task();
  } catch (error) {
    if (!isTransientFetchFailure(error)) throw error;
    console.warn(`${label} failed on first attempt; retrying once`, error);
    await new Promise((resolve) => setTimeout(resolve, 350));
    return task();
  }
}

export async function POST(request: Request) {
  let orderId: string | null = null;

  try {
    const body = (await request.json()) as RequestBody;
    if (!accepted(body.terms_accepted) || !accepted(body.lender_disclosure_accepted)) {
      return NextResponse.json(
        { error: "Please acknowledge the formal appraisal scope and lender-acceptance disclosure." },
        { status: 400 },
      );
    }

    const licenseNumber = (body.license_number ?? "").trim();
    const county = (body.county ?? "").trim();
    const licenseType = (body.license_type ?? "").trim();
    if (!licenseNumber || !county || !licenseType) {
      return NextResponse.json(
        { error: "Please complete the license number, county and license type before continuing." },
        { status: 400 },
      );
    }
    if (!isValidFloridaRetailLicenseNumber(licenseNumber)) {
      return NextResponse.json(
        { error: "Enter a valid Florida DBPR license number before continuing." },
        { status: 400 },
      );
    }

    let identity: Awaited<ReturnType<typeof validateFloridaRetailLicenseIdentity>> | null = null;
    try {
      identity = await retryTransient(
        () => validateFloridaRetailLicenseIdentity(licenseNumber, county, licenseType),
        "DBPR formal appraisal license verification",
      );
    } catch (verificationError) {
      // DBPR's public CSV is an external research source and is occasionally
      // unreachable from the checkout function. Do not prevent a customer from
      // paying for an appraisal when that source is temporarily unavailable;
      // the subject-license verification remains part of the paid assignment.
      console.warn(
        "DBPR formal appraisal verification unavailable; continuing to checkout for manual verification",
        verificationError,
      );
    }
    if (identity?.status === "not_found") {
      return NextResponse.json(
        { error: "That license number was not found in DBPR’s current public retail beverage records." },
        { status: 400 },
      );
    }
    if (identity?.status === "mismatch" && identity.record) {
      const expectedType = identity.expectedLicenseType ?? `DBPR series ${identity.record.series}`;
      return NextResponse.json(
        {
          error: `DBPR records show ${identity.record.licenseNumber} in ${identity.record.county} County as ${expectedType}, not ${county} as ${licenseType}. Please correct the subject-license details.`,
        },
        { status: 409 },
      );
    }

    const order = await retryTransient(
      () => createFormalLicenseAppraisalOrder({
        fullName: body.name ?? "",
        email: body.email ?? "",
        phone: body.phone ?? "",
        county,
        licenseType,
        licenseNumber,
        currentHolderOfRecord: body.current_holder_of_record,
        orderingParty: body.ordering_party ?? "",
        intendedUse: body.intended_use ?? "",
        institutionName: body.institution_name,
        effectiveDate: body.effective_date,
        notes: body.notes,
      }),
      "Formal appraisal order save",
    );
    orderId = order.id;

    const checkout = await retryTransient(
      () => createFormalLicenseAppraisalCheckoutSession(order, request.url),
      "Stripe formal appraisal checkout",
    );
    try {
      await retryTransient(
        () => attachCheckoutSession(order.id, checkout.id),
        "Formal appraisal checkout session attachment",
      );
    } catch (attachError) {
      console.error("Could not attach formal appraisal checkout session before redirect", attachError);
    }

    return NextResponse.json({
      ok: true,
      orderReference: order.submissionRef,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    const rawMessage = errorMessage(error);
    if (orderId) {
      try {
        await markCheckoutFailed(orderId, rawMessage);
      } catch (markError) {
        console.error("Could not mark formal appraisal checkout as failed", markError);
      }
    }
    const message = isTransientFetchFailure(error)
      ? "Secure formal-appraisal checkout could not be reached. Please try again in a moment."
      : rawMessage || "Unable to create the formal appraisal order.";
    console.error("Formal license appraisal checkout failed", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const sessionId = new URL(request.url).searchParams.get("session_id");
    if (!sessionId) return NextResponse.json( { error: "Missing checkout session." }, { status: 400 });
    const submission = await getSubmissionByCheckoutSession(sessionId);
    if (!submission) return NextResponse.json( { status: "processing" });
    return NextResponse.json(
      status: submission.status,
      orderReference: submission.submissionRef,
      paymentEmailStatus: submission.paymentEmailStatus,
    });
  } catch (error) {
    console.error("Could not read formal appraisal order status", error);
    return NextResponse.json({ status: "processing" });
  }
}
