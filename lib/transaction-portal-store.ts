import "server-only";

import {
  createHash,
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

import { retryableFetch } from "@/lib/retryable-fetch";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export const PORTAL_SESSION_COOKIE = "fllm_portal_session";
export const PORTAL_SESSION_SECONDS = 60 * 60 * 24 * 30;

type PortalUserRow = {
  id: string;
  email: string;
  full_name: string;
  password_hash: string;
  created_at: string;
};

type PortalSessionRow = {
  user_id: string;
  expires_at: string;
};

type PortalTransactionRow = {
  id: string;
  reference: string;
  transaction_name: string;
  participant_role: string;
  county: string;
  license_type: string;
  license_number: string | null;
  financed_purchase: boolean;
  representative_assistance: boolean;
  status: string;
  created_at: string;
  updated_at: string;
};

export type PortalUser = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
};

export type PortalTransaction = {
  id: string;
  reference: string;
  transactionName: string;
  participantRole: string;
  county: string;
  licenseType: string;
  licenseNumber: string | null;
  financedPurchase: boolean;
  representativeAssistance: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePortalTransactionInput = {
  transactionName: string;
  participantRole: string;
  county: string;
  licenseType: string;
  licenseNumber?: string;
  financedPurchase: boolean;
  representativeAssistance: boolean;
};

function settings() {
  return supabaseServiceSettings("The secure transaction portal database has not been activated.");
}

function endpoint(pathAndQuery: string) {
  return `${settings().url}/rest/v1/${pathAndQuery}`;
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const { key } = settings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeEmail(value: unknown) {
  return clean(value, 254).toLowerCase();
}

function validateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 64);
  return `scrypt:${salt.toString("hex")}:${derived.toString("hex")}`;
}

function verifyPassword(password: string, encoded: string) {
  const [algorithm, saltHex, hashHex] = encoded.split(":");
  if (algorithm !== "scrypt" || !saltHex || !hashHex) return false;
  try {
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function toUser(row: PortalUserRow): PortalUser {
  return { id: row.id, email: row.email, fullName: row.full_name, createdAt: row.created_at };
}

function toTransaction(row: PortalTransactionRow): PortalTransaction {
  return {
    id: row.id,
    reference: row.reference,
    transactionName: row.transaction_name,
    participantRole: row.participant_role,
    county: row.county,
    licenseType: row.license_type,
    licenseNumber: row.license_number,
    financedPurchase: row.financed_purchase,
    representativeAssistance: row.representative_assistance,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function readRows<T>(pathAndQuery: string): Promise<T[]> {
  const response = await retryableFetch(endpoint(pathAndQuery), { headers: headers(), cache: "no-store" });
  if (!response.ok) throw new Error(`Portal database request failed (${response.status}).`);
  return (await response.json()) as T[];
}

export async function createPortalUser(input: {
  fullName: unknown;
  email: unknown;
  password: unknown;
}) {
  const fullName = clean(input.fullName, 160);
  const email = normalizeEmail(input.email);
  const password = String(input.password ?? "");

  if (fullName.length < 2) throw new Error("Please enter your full name.");
  if (!validateEmail(email)) throw new Error("Please enter a valid email address.");
  if (password.length < 12) throw new Error("Create a password containing at least 12 characters.");
  if (password.length > 128) throw new Error("The password is too long.");

  const response = await fetch(endpoint("portal_users?select=*"), {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify({
      email,
      full_name: fullName,
      password_hash: hashPassword(password),
    }),
    cache: "no-store",
  });

  if (response.status === 409) throw new Error("An account already exists for that email address.");
  if (!response.ok) throw new Error(`Could not create the secure account (${response.status}).`);
  const rows = (await response.json()) as PortalUserRow[];
  if (!rows[0]) throw new Error("The account was not returned by the database.");
  return toUser(rows[0]);
}

export async function authenticatePortalUser(emailValue: unknown, passwordValue: unknown) {
  const email = normalizeEmail(emailValue);
  const password = String(passwordValue ?? "");
  if (!validateEmail(email) || !password) return null;
  const rows = await readRows<PortalUserRow>(
    `portal_users?email=eq.${encodeURIComponent(email)}&select=*&limit=1`
  );
  const row = rows[0];
  if (!row || !verifyPassword(password, row.password_hash)) return null;
  return toUser(row);
}

export async function createPortalSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + PORTAL_SESSION_SECONDS * 1000).toISOString();
  const response = await fetch(endpoint("portal_sessions"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ user_id: userId, token_hash: hashSessionToken(token), expires_at: expiresAt }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not create the secure session (${response.status}).`);
  return token;
}

export async function deletePortalSession(token: string) {
  if (!token) return;
  await fetch(endpoint(`portal_sessions?token_hash=eq.${hashSessionToken(token)}`), {
    method: "DELETE",
    headers: headers(),
    cache: "no-store",
  });
}

export async function getPortalUserFromSession(token: string | undefined) {
  if (!token) return null;
  const sessions = await readRows<PortalSessionRow>(
    `portal_sessions?token_hash=eq.${hashSessionToken(token)}&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&select=user_id,expires_at&limit=1`
  );
  if (!sessions[0]) return null;
  const users = await readRows<PortalUserRow>(
    `portal_users?id=eq.${encodeURIComponent(sessions[0].user_id)}&select=*&limit=1`
  );
  return users[0] ? toUser(users[0]) : null;
}

function makeTransactionReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `FLLM-TX-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function listPortalTransactions(userId: string) {
  const rows = await readRows<PortalTransactionRow>(
    `portal_transactions?user_id=eq.${encodeURIComponent(userId)}&select=*&order=updated_at.desc`
  );
  return rows.map(toTransaction);
}

export async function getPortalTransaction(userId: string, transactionId: string) {
  const rows = await readRows<PortalTransactionRow>(
    `portal_transactions?id=eq.${encodeURIComponent(transactionId)}&user_id=eq.${encodeURIComponent(userId)}&select=*&limit=1`
  );
  return rows[0] ? toTransaction(rows[0]) : null;
}

export async function updatePortalTransactionStatus(
  userId: string,
  transactionId: string,
  status: string
) {
  const response = await fetch(
    endpoint(
      `portal_transactions?id=eq.${encodeURIComponent(transactionId)}&user_id=eq.${encodeURIComponent(userId)}&select=*`
    ),
    {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ status: clean(status, 80), updated_at: new Date().toISOString() }),
      cache: "no-store",
    }
  );
  if (!response.ok) throw new Error(`Could not update the transaction status (${response.status}).`);
  const rows = (await response.json()) as PortalTransactionRow[];
  return rows[0] ? toTransaction(rows[0]) : null;
}

export async function createPortalTransaction(userId: string, input: CreatePortalTransactionInput) {
  const transactionName = clean(input.transactionName, 160);
  const participantRole = clean(input.participantRole, 40);
  const county = clean(input.county, 100);
  const licenseType = clean(input.licenseType, 100);
  const licenseNumber = clean(input.licenseNumber, 80) || null;
  const allowedRoles = new Set(["Buyer", "Seller", "Broker", "Attorney", "Lender", "Lottery Entrant", "Other"]);

  if (!transactionName || !county || !licenseType || !allowedRoles.has(participantRole)) {
    throw new Error("Please complete the transaction name, your role, county, and license type.");
  }

  const response = await fetch(endpoint("portal_transactions?select=*"), {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify({
      id: randomUUID(),
      user_id: userId,
      reference: makeTransactionReference(),
      transaction_name: transactionName,
      participant_role: participantRole,
      county,
      license_type: licenseType,
      license_number: licenseNumber,
      financed_purchase: Boolean(input.financedPurchase),
      representative_assistance: Boolean(input.representativeAssistance),
      status: "Getting started",
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Could not create the transaction workspace (${response.status}).`);
  const rows = (await response.json()) as PortalTransactionRow[];
  if (!rows[0]) throw new Error("The transaction was not returned by the database.");
  return toTransaction(rows[0]);
}


