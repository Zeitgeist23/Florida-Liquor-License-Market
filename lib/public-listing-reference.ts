type ListingReferenceSource = {
  submissionRef: string;
  liveListingRef?: string | null;
};

export function isPrivateSubmissionReference(value: string | null | undefined) {
  return /^FLLM-PAID-/i.test(value?.trim() ?? "");
}

function stableNumericToken(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return String(100000 + ((hash >>> 0) % 900000));
}

export function publicListingReference(source: ListingReferenceSource) {
  const existing = source.liveListingRef?.trim().toUpperCase();
  if (existing && !isPrivateSubmissionReference(existing)) return existing;

  return `FLLM-${stableNumericToken(source.submissionRef.trim().toUpperCase())}`;
}
