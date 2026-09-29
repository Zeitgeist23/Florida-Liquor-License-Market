import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  APPRAISAL_METHODOLOGY_VERSION,
  classifyQuotaLicense,
} from "@/lib/appraisal-methodology";
import {
  createAppraisalCase,
  listAppraisalCases,
  makeAppraisalCaseRef,
} from "@/lib/appraisal-case-store";
import { canonicalFloridaCountyName } from "@/lib/county-normalization";
import { lookupFloridaRetailLicense } from "@/lib/license-fee-lookup";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function clean(value: unknown, max = 180) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    return NextResponse.json({ cases: await listAppraisalCases(150) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load appraisal cases." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      licenseNumber?: string;
      clientName?: string;
      intendedUse?: string;
      institutionName?: string;
      effectiveDate?: string;
      orderRef?: string;
    };

    const licenseNumber = clean(body.licenseNumber, 40).toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (licenseNumber.length < 5) {
      return NextResponse.json({ error: "Enter a valid Florida DBPR license number." }, { status: 400 });
    }

    const record = await lookupFloridaRetailLicense(licenseNumber);
    if (!record) {
      return NextResponse.json(
        { error: "No matching license was found in the current DBPR alcoholic-beverage extract." },
        { status: 404 },
      );
    }

    const licenseType = classifyQuotaLicense(record.series, record.modifier);
    if (!licenseType) {
      return NextResponse.json(
        {
          error:
            "The current FLLM formal appraisal workflow is limited to transferable Florida quota-series licenses. This record appears to be a special/non-quota classification.",
        },
        { status: 422 },
      );
    }

    const now = new Date().toISOString();
    const appraisalCase = await createAppraisalCase({
      case_ref: makeAppraisalCaseRef(record.licenseNumber),
      order_ref: clean(body.orderRef, 120) || null,
      methodology_version: APPRAISAL_METHODOLOGY_VERSION,
      status: "DBPR_VERIFIED",
      client_name: clean(body.clientName, 180) || null,
      intended_use: clean(body.intendedUse, 180) || null,
      institution_name: clean(body.institutionName, 180) || null,
      effective_date: clean(body.effectiveDate, 20) || null,
      license_number: record.licenseNumber,
      license_type: licenseType,
      owner_name: record.ownerName,
      dba: record.dba,
      county: canonicalFloridaCountyName(record.county),
      city: record.city || null,
      series: record.series,
      modifier: record.modifier || null,
      primary_status: record.primaryStatus,
      secondary_status: record.secondaryStatus,
      expiration_date: record.expirationDate || null,
      dbpr_verified_at: now,
      dbpr_snapshot: {
        ...record,
        canonicalCounty: canonicalFloridaCountyName(record.county),
        verifiedAt: now,
        source: "Florida DBPR alcoholic-beverage public extract",
      },
      review_status: "pending",
    });

    return NextResponse.json({ appraisalCase }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create appraisal case." },
      { status: 500 },
    );
  }
}
