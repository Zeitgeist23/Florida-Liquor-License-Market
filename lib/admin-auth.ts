import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "fllm_admin_session";

function adminKey() {
  return process.env.FLLM_ADMIN_KEY ?? "";
}

function adminSecret() {
  return (
    adminKey() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_WEBHOOK_SECRET ||
    process.env.CRON_SECRET ||
    process.env.GOOGLE_REFRESH_TOKEN ||
    process.env.GOOGLE_CLIENT_SECRET ||
    ""
  );
}

function tokenFor(key: string) {
  return createHash("sha256").update(`fllm-admin:${key}`, "utf8").digest("hex");
}

export function configuredAdminToken() {
  const secret = adminSecret();
  return secret ? tokenFor(secret) : "";
}

export function validAdminKey(candidate: string) {
  const expected = adminKey();
  if (!expected || !candidate) return false;
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function isAdminAuthenticated() {
  const expected = configuredAdminToken();
  if (!expected) return false;
  const store = await cookies();
  const candidate = store.get(ADMIN_COOKIE)?.value ?? "";
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}
