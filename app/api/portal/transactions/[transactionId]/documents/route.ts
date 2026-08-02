import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { listPortalDocuments } from "@/lib/portal-document-workflow";
import {
  getPortalTransaction,
  getPortalUserFromSession,
  PORTAL_SESSION_COOKIE,
} from "@/lib/transaction-portal-store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ transactionId: string }> }
) {
  try {
    const cookieStore = await cookies();
    const user = await getPortalUserFromSession(cookieStore.get(PORTAL_SESSION_COOKIE)?.value);
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const { transactionId } = await context.params;
    const transaction = await getPortalTransaction(user.id, transactionId);
    if (!transaction) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    const documents = await listPortalDocuments(user.id, transaction);
    return NextResponse.json({ documents, transaction });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load project documents.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
