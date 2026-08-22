import { PARK_STREET_FINDINGS_PAGES_01 } from "./park-street-findings-pages-01";
import { PARK_STREET_FINDINGS_PAGES_02 } from "./park-street-findings-pages-02";
import { PARK_STREET_FINDINGS_PAGES_03 } from "./park-street-findings-pages-03";
import { PARK_STREET_FINDINGS_PAGES_04 } from "./park-street-findings-pages-04";
import { PARK_STREET_FINDINGS_PAGES_05 } from "./park-street-findings-pages-05";
import { PARK_STREET_FINDINGS_PAGES_06 } from "./park-street-findings-pages-06";

export const PARK_STREET_FINDINGS_TITLE =
  "Findings of Fact and Analysis of Law Following Non-Jury Trial";

export const PARK_STREET_FINDINGS_CASE =
  "CA24-0884 consolidated with CA21-0298";

export const PARK_STREET_FINDINGS_FILED = "September 26, 2025";

export const PARK_STREET_FINDINGS_PAGES = [
  ...PARK_STREET_FINDINGS_PAGES_01,
  ...PARK_STREET_FINDINGS_PAGES_02,
  ...PARK_STREET_FINDINGS_PAGES_03,
  ...PARK_STREET_FINDINGS_PAGES_04,
  ...PARK_STREET_FINDINGS_PAGES_05,
  ...PARK_STREET_FINDINGS_PAGES_06,
] as const;
