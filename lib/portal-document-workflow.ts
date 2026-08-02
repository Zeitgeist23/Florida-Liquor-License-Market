import "server-only";

import { randomUUID } from "node:crypto";

import type { PortalTransaction } from "@/lib/transaction-portal-store";
import { updatePortalTransactionStatus } from "@/lib/transaction-portal-store";

const BUCKET = "portal-transaction-documents";
const MAX_FILE_SIZE = 20 * 1024 * 1024;
let bucketReady: Promise<void> | null = null;

export const PORTAL_DOCUMENT_STATUSES = [
  "Not started",
  "In progress",
  "Awaiting signatures",
  "Completed",
] as const;

export type PortalDocumentStatus = (typeof PORTAL_DOCUMENT_STATUSES)[number];

export type PortalDocumentDefinition = {
  key: string;
  title: string;
  requiresSignature: boolean;
};

export type PortalDocumentVersion = {
  id: string;
  objectPath: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
};

export type PortalDocumentRecord = {
  transactionId: string;
  documentKey: string;
  title: string;
  requiresSignature: boolean;
  status: PortalDocumentStatus;
  draftData: Record<string, unknown> | null;
  versions: PortalDocumentVersion[];
  history: Array<{
    action: string;
    status: PortalDocumentStatus;
    at: string;
    by: string;
  }>;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  completedBy: string | null;
};

export function documentDefinitions(transaction: PortalTransaction): PortalDocumentDefinition[] {
  const definitions: PortalDocumentDefinition[] = [
    { key: "abt-6002", title: "DBPR/ABT-6002", requiresSignature: true },
    { key: "transfer-fee", title: "Quota License Transfer Fee", requiresSignature: false },
    { key: "fdor-clearance", title: "FDOR Clearance or Compliance Request", requiresSignature: false },
  ];

  if (transaction.representativeAssistance) {
    definitions.push({ key: "dr-835", title: "FDOR Form DR-835", requiresSignature: true });
  }
  if (transaction.financedPurchase) {
    definitions.push({ key: "financing", title: "Financing and License-Lien Documents", requiresSignature: true });
  }
  definitions.push({ key: "closing", title: "Transaction and Closing Documents", requiresSignature: true });
  return definitions;
}

function settings() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("The secure transaction document service is not available.");
  return { url, key };
}

function authHeaders(contentType?: string) {
  const { key } = settings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...(contentType ? { "Content-Type": contentType } : {}),
  };
}

function objectUrl(path: string) {
  const { url } = settings();
  return `${url}/storage/v1/object/${BUCKET}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function recordPath(userId: string, transactionId: string, documentKey: string) {
  return `${userId}/${transactionId}/${documentKey}/record.json`;
}

async function initializeBucket() {
  const { url } = settings();
  const response = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: authHeaders("application/json"),
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: false,
      file_size_limit: MAX_FILE_SIZE,
      allowed_mime_types: ["application/json", "application/pdf"],
    }),
    cache: "no-store",
  });
  if (!response.ok && response.status !== 409) {
    throw new Error("Private project document storage could not be initialized.");
  }
}

async function ensureBucket() {
  if (!bucketReady) {
    bucketReady = initializeBucket().catch((error) => {
      bucketReady = null;
      throw error;
    });
  }
  await bucketReady;
}

function blankRecord(
  transactionId: string,
  definition: PortalDocumentDefinition
): PortalDocumentRecord {
  const now = new Date().toISOString();
  return {
    transactionId,
    documentKey: definition.key,
    title: definition.title,
    requiresSignature: definition.requiresSignature,
    status: "Not started",
    draftData: null,
    versions: [],
    history: [],
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    completedBy: null,
  };
}

async function readRecord(
  userId: string,
  transactionId: string,
  definition: PortalDocumentDefinition
) {
  await ensureBucket();
  const response = await fetch(objectUrl(recordPath(userId, transactionId, definition.key)), {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (response.status === 404) return blankRecord(transactionId, definition);
  if (!response.ok) throw new Error("The project document record could not be read.");
  return (await response.json()) as PortalDocumentRecord;
}

async function writeRecord(userId: string, record: PortalDocumentRecord) {
  await ensureBucket();
  const response = await fetch(
    objectUrl(recordPath(userId, record.transactionId, record.documentKey)),
    {
      method: "POST",
      headers: { ...authHeaders("application/json"), "x-upsert": "true" },
      body: JSON.stringify(record),
      cache: "no-store",
    }
  );
  if (!response.ok) throw new Error("The project document record could not be saved.");
  return record;
}

function definitionFor(transaction: PortalTransaction, documentKey: string) {
  return documentDefinitions(transaction).find((definition) => definition.key === documentKey) ?? null;
}

export async function listPortalDocuments(userId: string, transaction: PortalTransaction) {
  return Promise.all(
    documentDefinitions(transaction).map((definition) =>
      readRecord(userId, transaction.id, definition)
    )
  );
}

async function refreshTransactionStatus(userId: string, transaction: PortalTransaction) {
  const documents = await listPortalDocuments(userId, transaction);
  const allComplete = documents.every((document) => document.status === "Completed");
  const hasAwaiting = documents.some((document) => document.status === "Awaiting signatures");
  const hasActivity = documents.some((document) =>
    document.status !== "Not started" || document.versions.length > 0 || document.draftData
  );
  const status = allComplete
    ? "Ready for review/submission"
    : hasAwaiting
      ? "Awaiting signatures"
      : hasActivity
        ? "In progress"
        : "Getting started";
  return updatePortalTransactionStatus(userId, transaction.id, status);
}

export async function updatePortalDocument(
  userId: string,
  userEmail: string,
  transaction: PortalTransaction,
  documentKey: string,
  input: { status?: unknown; draftData?: unknown }
) {
  const definition = definitionFor(transaction, documentKey);
  if (!definition) throw new Error("This document does not belong to the project checklist.");
  const current = await readRecord(userId, transaction.id, definition);
  const status = PORTAL_DOCUMENT_STATUSES.includes(input.status as PortalDocumentStatus)
    ? input.status as PortalDocumentStatus
    : current.status;
  if (status === "Completed" && definition.requiresSignature && current.versions.length === 0) {
    throw new Error("Upload the completed signed PDF before marking this document Completed.");
  }
  if (status === "Completed" && current.status === "Awaiting signatures") {
    const awaitingEntry = [...current.history].reverse().find((entry) => entry.status === "Awaiting signatures");
    const latestUpload = current.versions.at(-1);
    if (awaitingEntry && (!latestUpload || latestUpload.uploadedAt <= awaitingEntry.at)) {
      throw new Error("Upload the signed PDF before changing this document from Awaiting signatures to Completed.");
    }
  }
  const hasDraftData = Object.prototype.hasOwnProperty.call(input, "draftData");
  const draftData = hasDraftData && input.draftData && typeof input.draftData === "object"
    ? input.draftData as Record<string, unknown>
    : hasDraftData
      ? null
      : current.draftData;
  const now = new Date().toISOString();
  const changedStatus = status !== current.status;
  const next: PortalDocumentRecord = {
    ...current,
    status,
    draftData,
    updatedAt: now,
    completedAt: status === "Completed" ? current.completedAt || now : null,
    completedBy: status === "Completed" ? current.completedBy || userEmail : null,
    history: changedStatus
      ? [...current.history, { action: "status", status, at: now, by: userEmail }].slice(-100)
      : current.history,
  };
  await writeRecord(userId, next);
  const transactionResult = await refreshTransactionStatus(userId, transaction);
  return { document: next, transaction: transactionResult };
}

export async function uploadPortalDocument(
  userId: string,
  userEmail: string,
  transaction: PortalTransaction,
  documentKey: string,
  file: { bytes: Uint8Array; fileName: string; mimeType: string }
) {
  const definition = definitionFor(transaction, documentKey);
  if (!definition) throw new Error("This document does not belong to the project checklist.");
  if (!file.bytes.length || file.bytes.length > MAX_FILE_SIZE) {
    throw new Error("The PDF must be smaller than 20 MB.");
  }
  const hasPdfSignature = file.bytes[0] === 0x25
    && file.bytes[1] === 0x50
    && file.bytes[2] === 0x44
    && file.bytes[3] === 0x46;
  if (!hasPdfSignature || !file.fileName.toLowerCase().endsWith(".pdf")) {
    throw new Error("Upload a valid PDF document.");
  }

  const current = await readRecord(userId, transaction.id, definition);
  const now = new Date().toISOString();
  const version: PortalDocumentVersion = {
    id: randomUUID(),
    objectPath: `${userId}/${transaction.id}/${documentKey}/${Date.now()}-${randomUUID()}.pdf`,
    fileName: file.fileName.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 180) || `${documentKey}.pdf`,
    mimeType: "application/pdf",
    size: file.bytes.length,
    uploadedAt: now,
    uploadedBy: userEmail,
  };
  const uploadResponse = await fetch(objectUrl(version.objectPath), {
    method: "POST",
    headers: { ...authHeaders("application/pdf"), "x-upsert": "false" },
    body: Buffer.from(file.bytes),
    cache: "no-store",
  });
  if (!uploadResponse.ok) throw new Error("The PDF could not be stored in the private project workspace.");

  const nextStatus = current.status === "Not started" ? "In progress" : current.status;
  const next: PortalDocumentRecord = {
    ...current,
    status: nextStatus,
    versions: [...current.versions, version],
    history: [...current.history, { action: "upload", status: nextStatus, at: now, by: userEmail }].slice(-100),
    updatedAt: now,
  };
  await writeRecord(userId, next);
  const transactionResult = await refreshTransactionStatus(userId, transaction);
  return { document: next, transaction: transactionResult };
}

export async function downloadPortalDocument(
  userId: string,
  transaction: PortalTransaction,
  documentKey: string,
  versionId?: string
) {
  const definition = definitionFor(transaction, documentKey);
  if (!definition) return null;
  const record = await readRecord(userId, transaction.id, definition);
  const version = versionId
    ? record.versions.find((candidate) => candidate.id === versionId)
    : record.versions.at(-1);
  if (!version) return null;
  const response = await fetch(objectUrl(version.objectPath), {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("The stored project PDF could not be downloaded.");
  return { version, bytes: new Uint8Array(await response.arrayBuffer()) };
}
