export type FllmMarketingIdentity = {
  full_name?: string | null;
  broker_name?: string | null;
  owner_name?: string | null;
  brokerage?: string | null;
  email?: string | null;
  phone?: string | null;
};

function normalizeText(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizePhone(value?: string | null) {
  return (value || "").replace(/\D/g, "");
}

const BLOCKED_NAMES = new Set<string>([]);

const BLOCKED_BROKERAGES = new Set<string>([]);

const BLOCKED_PHONES = new Set<string>([]);

export function isFllmMarketingExcluded(input: FllmMarketingIdentity) {
  const names = [
    input.full_name,
    input.broker_name,
    input.owner_name,
  ].map(normalizeText).filter(Boolean);

  if (names.some((name) => BLOCKED_NAMES.has(name))) return true;

  const brokerage = normalizeText(input.brokerage);
  if (brokerage && BLOCKED_BROKERAGES.has(brokerage)) return true;

  const phone = normalizePhone(input.phone);
  if (phone && BLOCKED_PHONES.has(phone)) return true;

  return false;
}

export const FLLM_MARKETING_EXCLUSION_REASON =
  "FLLM internal do-not-market / do-not-contact exclusion.";
