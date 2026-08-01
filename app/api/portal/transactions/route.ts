import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  createPortalTransaction,
  getPortalUserFromSession,
  listPortalTransactions,
  PORTAL_SESSION_COOKIE,
} from "@/lib/transaction-portal-store";

async function authenticatedUser() {
  const cookieStore = await cookies();
  return getPortalUserFromSession(cookieStore.get(PORTAL_SESSION_COOKIE)?.value);
}

export async function GET() {
  try {
    const user = await authenticatedUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const transactions = await listPortalTransactions(user.id);
    return NextResponse.json({ transactions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load transactions.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await authenticatedUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const body = (await request.json()) as Record<string, unknown>;
    const transaction = await createPortalTransaction(user.id, {
      transactionName: String(body.transactionName ?? ""),
      participantRole: String(body.participantRole ?? ""),
      county: String(body.county ?? ""),
      licenseType: String(body.licenseType ?? ""),
      licenseNumber: String(body.licenseNumber ?? ""),
      financedPurchase: body.financedPurchase === true,
      representativeAssistance: body.representativeAssistance === true,
    });
    return NextResponse.json({ transaction }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create the transaction.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


