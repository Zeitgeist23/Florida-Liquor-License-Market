import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  listPortalDocuments,
  updatePortalDocument,
  uploadPortalDocument,
} from "@/lib/portal-document-workflow";
import {
  getPortalTransaction,
  getPortalUserFromSession,
  PORTAL_SESSION_COOKIE,
} from "@/lib/transaction-portal-store";

async function contextFor(params: Promise<{ transactionId: string; documentKey: string }>) {
  const cookieStore = await cookies();
  const user = await getPortalUserFromSession(cookieStore.get(PORTAL_SESSION_COOKIE)?.value);
  if (!user) return null;
  const { transactionId, documentKey } = await params;
  const transaction = await getPortalTransaction(user.id, transactionId);
  if (!transaction) return null;
  return { user, transaction, documentKey };
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ transactionId: string; documentKey: string }> }
) {
  try {
    const resolved = await contextFor(context.params);
    if (!resolved) return NextResponse.json({ error: "Project not found or sign-in required." }, { status: 404 });
    const documents = await listPortalDocuments(resolved.user.id, resolved.transaction);
    const document = documents.find((candidate) => candidate.documentKey === resolved.documentKey);
    if (!document) return NextResponse.json({ error: "Project document not found." }, { status: 404 });
    return NextResponse.json({ document, transaction: resolved.transaction });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load the project document.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ transactionId: string; documentKey: string }> }
) {
  try {
    const resolved = await contextFor(context.params);
    if (!resolved) return NextResponse.json({ error: "Project not found or sign-in required." }, { status: 404 });
    const body = (await request.json()) as Record<string, unknown>;
    const result = await updatePortalDocument(
      resolved.user.id,
      resolved.user.email,
      resolved.transaction,
      resolved.documentKey,
      body
    );
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update the project document.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ transactionId: string; documentKey: string }> }
) {
  try {
    const resolved = await contextFor(context.params);
    if (!resolved) return NextResponse.json({ error: "Project not found or sign-in required." }, { status: 404 });
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a PDF to upload." }, { status: 400 });
    const result = await uploadPortalDocument(
      resolved.user.id,
      resolved.user.email,
      resolved.transaction,
      resolved.documentKey,
      {
        bytes: new Uint8Array(await file.arrayBuffer()),
        fileName: file.name,
        mimeType: file.type,
      }
    );
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not upload the project PDF.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
