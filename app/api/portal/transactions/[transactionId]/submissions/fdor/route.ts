import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { submitProjectToFdor } from "@/lib/portal-agency-submission";
import {
  getPortalTransaction,
  getPortalUserFromSession,
  PORTAL_SESSION_COOKIE,
} from "@/lib/transaction-portal-store";

export async function POST(
  request: Request,
  context: { params: Promise<{ transactionId: string }> }
) {
  try {
    const cookieStore = await cookies();
    const user = await getPortalUserFromSession(cookieStore.get(PORTAL_SESSION_COOKIE)?.value);
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const { transactionId } = await context.params;
    const transaction = await getPortalTransaction(user.id, transactionId);
    if (!transaction) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    const body = (await request.json()) as Record<string, unknown>;
    const result = await submitProjectToFdor({
      user,
      transaction,
      businessPartnerNumber: body.businessPartnerNumber,
      salesTaxCertificateNumber: body.salesTaxCertificateNumber,
      authorizationAccepted: body.authorizationAccepted,
      emailMethodAccepted: body.emailMethodAccepted,
      authorityAccepted: body.authorityAccepted,
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The FDOR transmission could not be completed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
