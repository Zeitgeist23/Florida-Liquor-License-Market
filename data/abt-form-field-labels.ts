function normalizeLabel(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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
  "abt-6022": ABT_6022_LABELS,
};

export function getFriendlyAbtFieldLabel(formId: string, label: string) {
  const formLabels = LABELS_BY_FORM[formId];
  if (!formLabels) return label;

  return formLabels[normalizeLabel(label)] || label;
}
