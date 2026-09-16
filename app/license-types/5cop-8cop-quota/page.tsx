import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "Florida 5COP–8COP Quota Liquor Licenses | FLLM",
  description:
    "Understand Florida 5COP, 6COP, 7COP and 8COP quota liquor licenses, the county-population bands that determine the series, current state license fees, privileges and how they relate to 4COP and 3PS quota licenses.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/license-types/5cop-8cop-quota",
  },
};

export default function Page() {
  return (
    <LicenseTypeExplainerPage
      code="5COP–8COP Quota"
      title="Florida 5COP–8COP Quota Liquor Licenses"
      eyebrow="Quota Full Liquor · Consumption on Premises · Population-Based Series"
      imageSrc="https://images.pexels.com/photos/18675118/pexels-photo-18675118/free-photo-of-interior-of-a-bar.jpeg?auto=compress&dpr=1&h=1000&w=1800"
      imageAlt="Florida bar and lounge interior representing businesses that may use a 5COP, 6COP, 7COP or 8COP quota liquor license"
      definition="Florida 5COP, 6COP, 7COP and 8COP quota licenses are the lower-population-county series of Florida's full-liquor quota consumption-on-premises license. They authorize beer, wine and liquor by the drink and in sealed containers for consumption on or off the licensed premises, subject to the approved license, premises and applicable law."
      plainEnglish="The number is not a ranking of how powerful the license is. For quota consumption-on-premises licenses, 4COP through 8COP describe the county-population band used for the state license tax. A 5COP in an eligible county generally carries the same basic full-liquor quota privileges as a 4COP; the series and annual state fee differ because the county population falls into a different statutory bracket."
      sells={[
        "Beer",
        "Wine",
        "Distilled spirits / liquor",
        "Alcoholic beverages by the drink for on-premises consumption",
        "Sealed-container package sales within the approved quota-license privileges",
      ]}
      businesses={[
        "Bars and taverns",
        "Cocktail lounges",
        "Nightclubs and entertainment venues",
        "Restaurants using a transferable quota license",
        "Other approved full-liquor hospitality concepts in qualifying counties",
      ]}
      doesNot={[
        "Create broader privileges merely because the series number is higher or lower",
        "Allow the license to move freely from one county to another",
        "Replace zoning, premises, building, fire or local-use approvals",
        "Mean every license labeled 5COP–8COP is a quota license; specialty license classes can use the same population-based COP series labels",
      ]}
      requirementCards={[
        {
          label: "5COP quota series",
          value: "$1,560 annual state fee",
          detail:
            "Used for quota consumption-on-premises vendors in counties with population over 75,000 and not over 100,000, based on the latest population estimate used by Florida law.",
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=LEWD+AND+LASCIVIOUS&URL=0500-0599%2F0565%2FSections%2F0565.02.html",
          linkLabel: "Florida Statutes §565.02 ›",
        },
        {
          label: "6COP quota series",
          value: "$1,300 annual state fee",
          detail:
            "Used for quota consumption-on-premises vendors in counties with population over 50,000 and not over 75,000.",
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=LEWD+AND+LASCIVIOUS&URL=0500-0599%2F0565%2FSections%2F0565.02.html",
          linkLabel: "Florida Statutes §565.02 ›",
        },
        {
          label: "7COP quota series",
          value: "$858 annual state fee",
          detail:
            "Used for quota consumption-on-premises vendors in counties with population over 25,000 and not over 50,000.",
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=LEWD+AND+LASCIVIOUS&URL=0500-0599%2F0565%2FSections%2F0565.02.html",
          linkLabel: "Florida Statutes §565.02 ›",
        },
        {
          label: "8COP quota series",
          value: "$624 annual state fee",
          detail:
            "Used for quota consumption-on-premises vendors in counties with population of 25,000 or less.",
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=LEWD+AND+LASCIVIOUS&URL=0500-0599%2F0565%2FSections%2F0565.02.html",
          linkLabel: "Florida Statutes §565.02 ›",
        },
      ]}
      requirementsText="The 5COP–8COP series are population-based versions of the quota consumption-on-premises license. The series identifies the statutory county-population bracket and associated state license tax; it is not a ladder of increasingly broad alcoholic-beverage privileges. Florida's current DBPR license-type chart groups 8COP / 7COP / 6COP / 5COP / 4COP together as quota beverage licenses for beer, wine and liquor sold by the drink or in sealed containers for consumption on or off the licensed premises."
      requirementsCaution="Verify both the series and the license class. Florida also uses 4COP–8COP population-based series labels for certain specialty licenses. A license described simply as “5COP,” “6COP,” “7COP” or “8COP” should not be assumed to be a transferable quota license unless the DBPR record confirms the quota class and status."
      officialResources={[
        {
          href: "https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf",
          label: "DBPR / ABT Licenses and Permits for Alcoholic Beverages",
          description:
            "Official Division chart listing quota 8COP / 7COP / 6COP / 5COP / 4COP privileges, fees and statutory references.",
        },
        {
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=LEWD+AND+LASCIVIOUS&URL=0500-0599%2F0565%2FSections%2F0565.02.html",
          label: "Florida Statutes §565.02 — License Fees",
          description:
            "Official statute setting the county-population brackets and state license taxes for consumption-on-premises full-liquor vendors.",
        },
        {
          href: "https://www.leg.state.fl.us/Statutes/index.cfm/Ch0713/index.cfm?App_mode=Display_Statute&Search_String=&URL=0500-0599%2F0561%2FSections%2F0561.20.html",
          label: "Florida Statutes §561.20 — Quota Limitation",
          description:
            "Official quota statute establishing the general county population limitation for quota licenses.",
        },
        {
          href: "/resources/florida-liquor-license-system",
          label: "FLLM Guide to Florida's Quota-License System",
          description:
            "Understand quota status, county limits, series designations, inactive ownership and how quota licenses are transferred and used.",
        },
      ]}
      quotaNote="The word “quota” remains the key asset characteristic. Florida generally limits quota licenses to one for each 7,500 county residents, subject to the statutory system and exceptions. The 5COP–8COP series does not create a separate statewide pool of licenses; it identifies how a county-specific quota consumption-on-premises license is classified for the applicable population band."
      keyPoint="A 5COP, 6COP, 7COP or 8COP quota license is not a lesser version of a 4COP quota license in terms of the basic beer, wine and liquor privileges described by DBPR. The different series primarily reflects the population bracket and state fee. Always confirm the license class because specialty licenses can also use 4COP–8COP labels."
      seriesClarification="A quota license may be approved in a package-sales series or a consumption-on-premises series depending on intended use and regulatory approval. Within the consumption-on-premises family, 4COP through 8COP correspond to county-population brackets under section 565.02. Changes in license series or type require the appropriate DBPR process; they should not be treated as automatic merely because ownership changes or a business relocates."
      investmentNote="An eligible purchaser can own a transferable quota license even when no operating premises is immediately ready, subject to Florida's inactive or escrow procedures, renewal obligations and qualification rules. A license cannot be used to sell alcoholic beverages while inactive. Buyers should verify the exact county, series, class, status and any active-operation requirements before relying on a license record."
      officialLabel="Quota 8COP / 7COP / 6COP / 5COP / 4COP — Beer, Wine and Liquor Consumption on Premises"
      officialHref="https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf"
      relatedHref="/listings"
      relatedLabel="Browse Florida Quota Licenses for Sale"
      researchLinks={[
        {
          href: "/license-types/4cop-quota",
          label: "Compare With 4COP Quota",
          description:
            "See the same quota consumption-on-premises license family as it applies in counties above 100,000 population.",
        },
        {
          href: "/license-types/3ps-package-store",
          label: "Compare With 3PS Package Store",
          description:
            "Compare consumption-on-premises quota privileges with the package-sales quota series used for liquor stores.",
        },
        {
          href: "/florida-quota-liquor-license-cost",
          label: "Florida Liquor License Cost by County",
          description:
            "Review FLLM county-market pricing and cost information for Florida quota liquor licenses.",
        },
      ]}
    />
  );
}
