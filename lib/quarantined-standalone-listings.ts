// Quarantined 2026-10-24: these legacy records lack a recorded source URL.
// Preserve the original records and identifiers for investigation; do not display
// them as active standalone inventory or accept offers based on these references.
// Restoration requires recorded source evidence and a deliberate code review.
export const QUARANTINED_STANDALONE_REFS = new Set<string>([
  "FLLM-001",
  "FLLM-002",
  "FLLM-003",
  "FLLM-004",
  "FLLM-005",
  "FLLM-006",
  "FLLM-007",
  "FLLM-008",
  "FLLM-009",
  "FLLM-010",
  "FLLM-011",
  "FLLM-012",
  "FLLM-013",
  "FLLM-014",
  "FLLM-015",
  "FLLM-016",
  "FLLM-017",
  "FLLM-018",
  "BBS-2480551",
  "BBS-2543123",
  "BBS-2543069",
  "BBS-2543061",
  "BBS-2542988",
  "BBS-2542920",
  "BBS-2446163",
  "BBS-2480485",
  "BBS-2479984",
  "BBS-2453778"
]);

export function isQuarantinedStandaloneRef(ref: string | null | undefined): boolean {
  return Boolean(ref && QUARANTINED_STANDALONE_REFS.has(ref.trim().toUpperCase()));
}
