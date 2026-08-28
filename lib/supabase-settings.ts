import "server-only";

function projectRefFromServiceKey(key: string) {
  try {
    const payload = key.split(".")[1];
    if (!payload) return "";
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const decoded = JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as { ref?: string };
    return typeof decoded.ref === "string" ? decoded.ref.trim() : "";
  } catch {
    return "";
  }
}

export function normalizeSupabaseUrl(rawValue: string, serviceKey: string) {
  const raw = rawValue.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(raw)) {
    try {
      const parsed = new URL(raw);
      if (/^[a-z0-9]{15,}\.supabase\.co$/i.test(parsed.hostname)) {
        return `${parsed.protocol}//${parsed.hostname}`;
      }
    } catch {
      // Recover from a project ref or service-key claim below.
    }
  }

  const directRef = raw.match(/^(?:https?:\/\/)?([a-z0-9]{15,})\.supabase\.co/i)?.[1]
    ?? raw.match(/^([a-z0-9]{15,})$/i)?.[1]
    ?? raw.match(/db\.([a-z0-9]{15,})\.supabase\.co/i)?.[1]
    ?? "";
  const ref = directRef || projectRefFromServiceKey(serviceKey);
  if (ref) return `https://${ref}.supabase.co`;

  throw new Error("The secure FLLM account service could not determine its database endpoint.");
}

export function supabaseServiceSettings(unavailableMessage: string) {
  const rawUrl = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!rawUrl || !key) throw new Error(unavailableMessage);
  return { url: normalizeSupabaseUrl(rawUrl, key), key };
}
