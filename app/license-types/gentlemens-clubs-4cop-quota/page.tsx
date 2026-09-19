import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "Florida 4COP Liquor Licenses for Gentlemen's Clubs | FLLM",
  description:
    "Learn how Florida 4COP quota liquor licenses are used by gentlemen's clubs and adult-entertainment venues, including full-liquor privileges, local zoning, school-distance rules, and license transfer considerations.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/license-types/gentlemens-clubs-4cop-quota",
  },
  openGraph: {
    title: "Florida 4COP Liquor Licenses for Gentlemen's Clubs | FLLM",
    description:
      "A plain-English guide to the role of Florida 4COP quota liquor licenses in gentlemen's clubs and adult-entertainment venue transactions.",
    type: "article",
    url: "https://www.floridaliquorlicensemarket.com/license-types/gentlemens-clubs-4cop-quota",
  },
};

export default function Page() {
  return (
    <LicenseTypeExplainerPage
      code="4COP Quota"
      title="4COP Quota Liquor Licenses for Gentlemen's Clubs in Florida"
      eyebrow="Adult Entertainment · Nightclubs · Full Liquor"
      imageSrc="https://images.pexels.com/photos/18675118/pexels-photo-18675118/free-photo-of-interior-of-a-bar.jpeg?auto=compress&dpr=1&h=1000&w=1800"
      imageAlt="Upscale bar and lounge interior representing Florida nightlife businesses that may use a 4COP quota liquor license"
      definition="A Florida 4COP quota license is a county-specific full-liquor quota license that may authorize beer, wine, and distilled spirits for consumption on the licensed premises. Gentlemen's clubs, adult cabarets, nightclubs, cocktail lounges, and other nightlife businesses may use a 4COP quota license when full-liquor service is part of the approved operation. The liquor license itself does not authorize adult-entertainment use at a particular property."
      plainEnglish="A gentlemen's club may need two different sets of approvals working together: alcoholic-beverage authority for full liquor and separate land-use, adult-entertainment, occupancy, and local operating approvals for the premises. A transferable 4COP quota license can be a valuable asset in the transaction, but buying the license does not guarantee that a particular site can lawfully operate as an adult-entertainment venue."
      sells={[
        "Beer for consumption on the licensed premises",
        "Wine for consumption on the licensed premises",
        "Distilled spirits / full liquor by the drink",
        "Alcoholic beverages in an approved nightclub, cabaret, lounge, or similar premises configuration",
        "Package sales within the privileges approved for the quota-license series and premises",
      ]}
      businesses={[
        "Gentlemen's clubs and adult cabarets where the proposed use is independently permitted",
        "Adult-entertainment venues with full-liquor service",
        "Nightclubs and late-night entertainment venues",
        "Cocktail lounges and bars",
        "Hospitality and entertainment businesses that need a transferable county quota license rather than a restaurant-only special license",
      ]}
      doesNot={[
        "Grant adult-entertainment zoning or a local adult-use permit",
        "Override state or local location, distance, occupancy, signage, hours, or operating restrictions",
        "Guarantee that a proposed property can be used as a gentlemen's club or adult cabaret",
        "Replace DBPR approval for a license transfer, change of ownership, change of location, or change of series",
        "Override Florida's separate age and employment restrictions applicable to adult-entertainment establishments",
      ]}
      requirementCards={[
        {
          label: "Alcohol authority",
          value: "Full liquor on premises",
          detail:
            "A quota license in the 4COP consumption-on-premises series can provide the beer, wine, and distilled-spirits authority commonly needed by nightlife and adult-entertainment venues. The exact licensed premises and privileges remain subject to DBPR approval.",
          href: "/license-types/4cop-quota",
          linkLabel: "Read the FLLM 4COP quota guide ›",
        },
        {
          label: "Adult-use approval",
          value: "Separate from the 4COP",
          detail:
            "The alcoholic-beverage license does not create the right to operate an adult-entertainment use. County and municipal zoning, adult-entertainment ordinances, permitting, occupancy, fire, building, and other premises rules must be checked independently.",
          href: "/resources/florida-liquor-license-laws",
          linkLabel: "Review Florida licensing rules ›",
        },
        {
          label: "School-distance rule",
          value: "State restriction may apply",
          detail:
            "Florida Statute 847.0134 imposes a 2,500-foot school-location restriction in the circumstances defined by that statute, subject to its exceptions and local-government approval procedure. Local governments may impose additional location rules.",
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0847/Sections/0847.0134.html",
          linkLabel: "Read Florida Statute 847.0134 ›",
        },
        {
          label: "Workers & performers",
          value: "Under 21 prohibited",
          detail:
            "Florida Statute 787.30 prohibits a person younger than 21 from performing or working in an adult-entertainment establishment, subject to the statute's definitions and provisions.",
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0787/Sections/0787.30.html",
          linkLabel: "Read Florida Statute 787.30 ›",
        },
      ]}
      requirementsText="For a gentlemen's-club or adult-entertainment transaction, treat the liquor license and the site's adult-use entitlement as related but legally distinct issues. Confirm the quota license's county, ownership, series, status, premises history, and transfer requirements with DBPR, then separately verify the proposed property's zoning and adult-entertainment approvals with the applicable county or municipality."
      requirementsCaution="Do not purchase a 4COP quota license on the assumption that it makes a location eligible for adult entertainment. Florida law, local zoning, distance requirements, adult-use ordinances, building and fire rules, and the exact facts of the proposed operation can materially affect whether the business may operate at a particular site."
      officialResources={[
        {
          href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/faqs/",
          label: "DBPR Quota License FAQ",
          description:
            "Florida DBPR explains how quota licenses are created, acquired, and priced in the private market.",
        },
        {
          href: "https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf",
          label: "DBPR Alcoholic Beverage License Types",
          description:
            "Review Florida's official alcoholic-beverage license categories and consumption-on-premises license structure.",
        },
        {
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.20.html",
          label: "Florida Statute 561.20 — Quota Limit",
          description:
            "Read the Florida quota-license population rule, including the general one-license-per-7,500-residents limitation.",
        },
        {
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0847/Sections/0847.0134.html",
          label: "Florida Statute 847.0134 — Adult Entertainment Location",
          description:
            "Review the state school-distance restriction applicable in the circumstances defined by the statute.",
        },
        {
          href: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0787/Sections/0787.30.html",
          label: "Florida Statute 787.30 — Under-21 Employment",
          description:
            "Review Florida's current restriction on persons younger than 21 working or performing in adult-entertainment establishments.",
        },
      ]}
      quotaNote="Florida generally limits quota licenses to one license for each 7,500 county residents under section 561.20, subject to the statutory system and exceptions. Because a 4COP quota license is county-specific and privately transferable subject to approval, it can represent a significant separate asset when an adult-entertainment business, nightclub, or related operation is sold."
      keyPoint="When a third-party broker offers a gentlemen's-club business with its 4COP quota license included, FLLM classifies the offering as a business package rather than a standalone license. The package appears in the separate Businesses With Quota Licenses inventory and does not affect standalone license counts, asking-price ranges, medians, heat maps, or comparables."
      seriesClarification="A 4COP quota license is the full-liquor consumption-on-premises series commonly associated with bars, nightclubs, lounges, and similar operations. It should not be confused with a 4COP-SFS / SRX special restaurant license, which depends on statutory restaurant qualifications and is not the same transferable county quota asset."
      investmentNote="A qualified buyer may acquire a transferable quota license without immediately operating the adult-entertainment business itself. If the license will not immediately be placed into an approved operating location, Florida's inactive or escrow procedures, renewal obligations, qualification requirements, and active-operation rules must still be addressed."
      officialLabel="Beer, Wine and Liquor Consumption on Premises (4COP) — Quota"
      officialHref="https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf"
      relatedHref="/brokers/list-your-license"
      relatedLabel="List a 4COP Quota License"
      ruleUpdateLinks={[
        {
          href: "/florida-4cop-liquor-license-for-sale",
          label: "Florida 4COP quota licenses for sale",
          description:
            "Browse current 4COP quota inventory and compare disclosed asking prices across Florida county markets.",
        },
        {
          href: "/counties",
          label: "Compare Florida county license markets",
          description:
            "Explore county-specific quota-license information, current inventory, valuation data, and local market context.",
        },
        {
          href: "/resources/florida-liquor-license-laws",
          label: "Florida liquor-license laws",
          description:
            "Review FLLM's plain-English explanations of quota licensing, premises rules, transfers, and current Florida beverage-law issues.",
        },
      ]}
      researchLinks={[
        {
          href: "/brokers/list-your-license",
          label: "Featured Listings for Florida Brokers",
          description:
            "A broker can market a client's quota license on FLLM while retaining the underlying client relationship and receiving buyer inquiries directly.",
        },
        {
          href: "/transaction-services",
          label: "Florida Liquor License Transaction Services",
          description:
            "See FLLM resources for license transfers, closings, due diligence, valuation, and transaction support.",
        },
        {
          href: "/license-types/4cop-sfs-restaurant",
          label: "Compare 4COP Quota With 4COP-SFS / SRX",
          description:
            "Understand why a transferable quota license is structurally different from Florida's qualification-based special restaurant license.",
        },
      ]}
    />
  );
}
