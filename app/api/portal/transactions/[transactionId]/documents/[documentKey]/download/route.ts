import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { downloadPortalDocument } from "@/lib/portal-document-workflow";
import {
  getPortalTransaction,
  getPortalUserFromSession,
  PORTAL_SESSION_COOKIE,
} from "@/lib/transaction-portal-store";

export async function GET(
  request: Request,
  context: { params: Promise<{ transactionId: string; documentKey: string }> }
) {
  try {
    const cookieStore = await cookies();
    const user = await getPortalUserFromSession(cookieStore.get(PORTAL_SESSION_COOKIE)?.value);
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const { transactionId, documentKey } = await context.params;
    const transaction = await getPortalTransaction(user.id, transactionId);
    if (!transaction) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    const versionId = new URL(request.url).searchParams.get("version") || undefined;
    const stored = await downloadPortalDocument(user.id, transaction, documentKey, versionId);
    if (!stored) return NextResponse.json({ error: "No PDF has been uploaded." }, { status: 404 });
    return new Response(Buffer.from(stored.bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${stored.version.fileName.replace(/["\\]/g, "_")}"`,
        "Content-Length": String(stored.bytes.length),
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not download the project PDF.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
