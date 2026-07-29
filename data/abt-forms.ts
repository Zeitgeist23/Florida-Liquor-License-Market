export type AbtFormDefinition = {
  id: string;
  formNumber: string;
  title: string;
  shortTitle: string;
  description: string;
  useCases: string[];
  officialPdfUrl: string;
  lastVerified: string;
  featured?: boolean;
};

export const ABT_FORMS: AbtFormDefinition[] = [
  {
    id: "abt-6002",
    formNumber: "DBPR ABT-6002",
    title: "Application for Transfer of Ownership",
    shortTitle: "Transfer of Ownership",
    description:
      "Prepare the official application used to transfer ownership of an existing Florida alcoholic beverage license.",
    useCases: ["Existing license transfer", "Buyer and seller information", "Ownership and interested-party disclosures"],
    officialPdfUrl:
      "https://www2.myfloridalicense.com/abt/forms/documents/abt-6002formonly.pdf",
    lastVerified: "July 29, 2026",
    featured: true,
  },
  {
    id: "abt-6022",
    formNumber: "DBPR ABT-6022",
    title: "Application for Lien / Mortgagee’s Interest",
    shortTitle: "Lien / Mortgagee’s Interest",
    description:
      "Prepare the official form used to record a lien, assignment, assumption, renewal, or extension involving a spirituous alcoholic beverage license.",
    useCases: ["License-secured financing", "Lien recording", "Assignment, assumption, renewal, or extension"],
    officialPdfUrl:
      "https://www2.myfloridalicense.com/abt/forms/documents/abt6022.pdf",
    lastVerified: "July 29, 2026",
  },
  {
    id: "abt-6027",
    formNumber: "DBPR ABT-6027",
    title: "Application for Inactive Status or Waiver of Active Operation Requirements",
    shortTitle: "Inactive Status / Waiver",
    description:
      "Prepare the official application for inactive status or an available waiver of quota-license active-operation requirements.",
    useCases: ["Inactive quota license", "Automatic waiver request", "Conditional waiver request"],
    officialPdfUrl:
      "https://www2.myfloridalicense.com/abt/forms/licensing/ABT-6027.pdf",
    lastVerified: "July 29, 2026",
  },
  {
    id: "abt-6014",
    formNumber: "DBPR ABT-6014",
    title: "Change of Location / Change in Series or Type Application",
    shortTitle: "Location / Series / Type Change",
    description:
      "Prepare the official application for approval of a license-location change or a change in license series or type.",
    useCases: ["Change licensed location", "Change license series", "Change license type"],
    officialPdfUrl:
      "https://www2.myfloridalicense.com/abt/forms/documents/abt-6014.pdf",
    lastVerified: "July 29, 2026",
  },
  {
    id: "abt-6004",
    formNumber: "DBPR ABT-6004",
    title: "Change of Officer / Stockholder / Amended Corporate Name Application",
    shortTitle: "Officer / Stockholder Change",
    description:
      "Prepare the official application used to report changes in officers, directors, members, stockholders, or an amended entity name.",
    useCases: ["Officer or director change", "Member or stockholder change", "Amended corporate or entity name"],
    officialPdfUrl:
      "https://www2.myfloridalicense.com/abt/forms/documents/AppPackforChangeofOfficer-Stockholder.pdf",
    lastVerified: "July 29, 2026",
  },
  {
    id: "abt-6009",
    formNumber: "DBPR ABT-6009",
    title: "Change of Business Name or Change of Mailing Address Application",
    shortTitle: "Business Name / Mailing Address",
    description:
      "Prepare the official application used to change the business name or mailing address on an existing license or permit.",
    useCases: ["Business-name change", "Mailing-address change", "Existing license or permit update"],
    officialPdfUrl:
      "https://www2.myfloridalicense.com/abt/forms/documents/abt-6009.pdf",
    lastVerified: "July 29, 2026",
  },
  {
    id: "abt-6001",
    formNumber: "DBPR ABT-6001",
    title: "Application for New Alcoholic Beverage License",
    shortTitle: "New Alcoholic Beverage License",
    description:
      "Prepare the official application for a new Florida wholesale or retail alcoholic beverage license and applicable tobacco permit.",
    useCases: ["New alcoholic beverage license", "New retail or wholesale application", "Not for transfer of an existing license"],
    officialPdfUrl:
      "https://www2.myfloridalicense.com/abt/forms/documents/abt-6001formonly.pdf",
    lastVerified: "July 29, 2026",
  },
];

export function getAbtForm(id: string) {
  return ABT_FORMS.find((form) => form.id === id) ?? null;
}

export const ABT_FORMS_DISCLAIMER =
  "Florida Liquor License Market is not affiliated with or endorsed by the Florida Department of Business and Professional Regulation or the Division of Alcoholic Beverages and Tobacco. This form-preparation tool is provided for informational and administrative convenience and does not constitute legal advice. Users remain responsible for verifying filing requirements, signing the application, and submitting all required fees and supporting documents.";
