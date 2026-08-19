import { countySlug, getCountyBySlug } from "@/data/florida-counties";

/**
 * Convert any reasonable Florida county spelling/format into the one canonical
 * county name used by the marketplace. This keeps listing labels, maps, links,
 * descriptions, dedupe keys, and database rows tied to the same county key.
 */
export function canonicalFloridaCountyName(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return value;

  return getCountyBySlug(countySlug(trimmed))?.name ?? trimmed;
}
