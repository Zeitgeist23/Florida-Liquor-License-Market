function normalizeLabel(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function removeAbt6002PdfInternalMarkers(label: string) {
  return label
    .replace(/\brow\s*\d*\b/gi, " ")
    .replace(/\s+\d+\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

const ABT_6002_LABELS: Record<string, string> = {
  "undefined 3": "Retail Alcoholic Beverages",
  "undefined 4": "Beer/Wine/Liquor Wholesaler",
  "undefined 5": "Alcoholic Beverage Importer",
  "undefined 6": "Passenger Waiting Lounge",
  "undefined 7": "Personal Relationship to Transferor - Yes",
  "undefined 8": "Personal Relationship to Transferor - No",
  "yes 4": "Premises Question 1 - Yes: Is the proposed premises movable or able to be moved?",
  "undefined 9": "Premises Question 1 - No: Is the proposed premises movable or able to be moved?",
  "yes 5": "Premises Question 2 - Yes: Is there access through the premises to an area outside your dominion and control?",
  "undefined 10": "Premises Question 2 - No: Is there access through the premises to an area outside your dominion and control?",
  "yes 6": "Premises Question 3 - Yes: Is the business located within a Specialty Center?",
  "undefined 11": "Premises Question 3 - No: Is the business located within a Specialty Center?",
  "yes 7": "Premises Question 4 - Yes: Are there movable vehicles used to sell or serve alcoholic beverages?",
  "undefined 12": "Premises Question 4 - No: Are there movable vehicles used to sell or serve alcoholic beverages?",
  "yes 8": "Premises Question 5 - Yes: Are there more than three separate rooms or enclosures with permanent bars or counters?",
  "undefined 13": "Premises Question 5 - No: Are there more than three separate rooms or enclosures with permanent bars or counters?",
  "undefined 14": "Other Interests 1: Has any undisclosed person or entity loaned money to the business?",
  "undefined 15": "Other Interests 2: Does any undisclosed person or entity derive revenue solely through an exempt or unrelated contractual relationship?",
  "undefined 16": "Other Interests 3: Does any undisclosed person or entity have the right to receive revenue through a contract controlling alcoholic-beverage sales?",
  "undefined 17": "Other Interests 4: Does any undisclosed person or entity have a right to percentage payments from business proceeds under the lease?",
  "undefined 18": "Other Interests 5: Has any undisclosed person or entity guaranteed the lease or loan?",
  "undefined 19": "Other Interests 6: Has any undisclosed person or entity co-signed the lease or loan?",
  "undefined 20": "Other Interests 7: Is there a management contract, franchise agreement, or concession agreement connected with this business?",
  "undefined 21": "Other Interests 8: Has an applicant accepted money, equipment, or anything of value from an industry member under Rule 61A-1.010?",
  "undefined 22": "Quota Transfer Fee - First Year Sales Total",
  "undefined 23": "Quota Transfer Fee - Second Year Sales Total",
  "undefined 24": "Quota Transfer Fee - Third Year Sales Total",
  "undefined 25": "Quota Transfer Fee - Three-Year Sales Total",
  "divided by 3": "Quota Transfer Fee - Three-Year Average",
  "x004": "Quota Transfer Fee - Transfer Fee (Average × 0.004)",
  "state fl": "State",
  "mailing address street or po box": "Mailing Address (Street or P.O. Box)",
  "city 2": "Mailing Address City",
  "state 2": "Mailing Address State",
  "zip code 2": "Mailing Address ZIP Code",
  "email address optional 2": "Contact Email Address (Optional)",
  "mailing address street or po box 2": "Contact Mailing Address (Street or P.O. Box)",
  "city 3": "Contact Mailing Address City",
  "state 3": "Contact Mailing Address State",
  "zip code 3": "Contact Mailing Address ZIP Code",
};

const ABT_6022_LABELS: Record<string, string> = {
  "full name of debtor": "Primary Debtor Full Name",
  "mailing address": "Primary Debtor Mailing Address",
  city: "Primary Debtor City",
  state: "Primary Debtor State",
  "zip code": "Primary Debtor ZIP Code",
  "full name of debtor if more than one": "Additional Debtor Full Name",
  "full name of debtor if more than one person or entity": "Additional Debtor Full Name",
  "mailing address 2": "Additional Debtor Mailing Address",
  "city 2": "Additional Debtor City",
  "state 2": "Additional Debtor State",
  "zip code 2": "Additional Debtor ZIP Code",
  "full name of secured party": "Primary Secured Party/Lender Full Name",
  "full name of secured party lender": "Primary Secured Party/Lender Full Name",
  "mailing address 3": "Primary Secured Party/Lender Mailing Address",
  "city 3": "Primary Secured Party/Lender City",
  "state 3": "Primary Secured Party/Lender State",
  "zip code 3": "Primary Secured Party/Lender ZIP Code",
  "full name of secured party if more than one": "Additional Secured Party/Lender Full Name",
  "full name of secured party lender if more than one": "Additional Secured Party/Lender Full Name",
  "full name of secured party if more than one person or entity": "Additional Secured Party/Lender Full Name",
  "full name of secured party lender if more than one person or entity": "Additional Secured Party/Lender Full Name",
  "mailing address 4": "Additional Secured Party/Lender Mailing Address",
  "city 4": "Additional Secured Party/Lender City",
  "state 4": "Additional Secured Party/Lender State",
  "zip code 4": "Additional Secured Party/Lender ZIP Code",
  "license number": "Alcoholic Beverage License Number",
};

const LABELS_BY_FORM: Record<string, Record<string, string>> = {
  "abt-6002": ABT_6002_LABELS,
  "abt-6022": ABT_6022_LABELS,
};

function getAbt6002Section12FieldLabel(label: string) {
  const compact = label.replace(/[\s_-]+/g, "").toLowerCase();
  const patterns: Array<[RegExp, string]> = [
    [/^firstyearrow(\d+)$/, "First Year Period"],
    [/^amountofsalesrow(\d+)$/, "First Year Sales"],
    [/^secondyearrow(\d+)$/, "Second Year Period"],
    [/^amountofsalesrow(\d+)2$/, "Second Year Sales"],
    [/^thirdyearrow(\d+)$/, "Third Year Period"],
    [/^amountofsalesrow(\d+)3$/, "Third Year Sales"],
  ];

  for (const [pattern, description] of patterns) {
    const match = compact.match(pattern);
    if (match) return `Quota Transfer Fee - ${description} ${match[1]}`;
  }

  return "";
}

export function getFriendlyAbtFieldLabel(formId: string, label: string) {
  const formLabels = LABELS_BY_FORM[formId];
  const mappedLabel = formLabels?.[normalizeLabel(label)];

  if (mappedLabel) return mappedLabel;

  // The official ABT-6002 PDF uses trailing numbers and Row/Row1-style text
  // only as internal field identifiers. They remain in the hidden PDF field
  // names but are removed from every customer-facing guided-form label.
  if (formId === "abt-6002") {
    const section12Label = getAbt6002Section12FieldLabel(label);
    return section12Label || removeAbt6002PdfInternalMarkers(label);
  }

  return label;
}
