import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "Florida Mobile Liquor License & Mobile Bar License | FLLM",
  description:
    "Does Florida have a mobile liquor license? Learn how Florida mobile bars, catered events, and the 13CT caterer license work, including the 51% food rule, statewide event use, and alcohol-storage restrictions.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/license-types/mobile-bars-catered-events",
  },
  openGraph: {
    title: "Florida Mobile Liquor License & Mobile Bar License | FLLM",
    description:
      "A plain-English guide to Florida mobile bars, catered events, and the 13CT caterer alcoholic-beverage license.",
    type: "article",
    url: "https://www.floridaliquorlicensemarket.com/license-types/mobile-bars-catered-events",
  },
};

export default function Page() {
  return (
    <LicenseTypeExplainerPage
      code="13CT"
      title="Florida Mobile Liquor License & Mobile Bar License"
      eyebrow="Catering, Events & Mobile Alcohol Service in Florida"
      imageSrc="https://images.pexels.com/photos/18853331/pexels-photo-18853331.jpeg?auto=compress&dpr=1&h=1000&w=1800"
      imageAlt="Elegant catered event bar representing Florida mobile bar and 13CT caterer alcohol service"
      definition="Florida does not issue a general roaming ‘mobile liquor license’ that lets a bar truck, trailer, or portable bar travel from place to place and sell alcohol anywhere. The principal statewide full-liquor caterer license is the 13CT. A qualifying caterer licensed under Chapter 509 may sell or serve beer, wine, and liquor for consumption at a catered event where the licensee is also providing prepared food."
      plainEnglish="The license follows the qualified catering operation and the catered event—not the trailer itself. If a company wants to sell alcohol at weddings, corporate events, private parties, or other catered functions, the 13CT structure is the key Florida license to understand. A bartending service where the host owns the alcohol is a different model and should not be confused with a 13CT retail sale."
      sells={[
        "Beer for consumption at a catered event",
        "Wine for consumption at a catered event",
        "Distilled spirits for consumption at a catered event",
        "Alcohol by the drink when the licensed caterer is also providing prepared food",
        "Service at catered events in any Florida county, including multiple concurrent events when the licensee can properly staff and document them",
      ]}
      businesses={[
        "Licensed food caterers serving weddings and private events",
        "Corporate-event and convention caterers",
        "Full-service event companies operating a mobile or portable bar as part of a qualifying catering operation",
        "Wedding caterers offering beer, wine, and cocktail service",
        "Chapter 509 caterers that need statewide catered-event alcohol privileges",
      ]}
      doesNot={[
        "Create a general roaming liquor license for a stand-alone bar truck or trailer",
        "Allow the licensee to store alcoholic beverages for future catered events",
        "Authorize package-store sales or ordinary off-premises retail sales",
        "Allow a pure bartending company to sell alcohol merely because it owns a mobile bar setup",
        "Replace venue rules, local zoning, event approvals, age restrictions, or other applicable state and local requirements",
      ]}
      requirementCards={[
        {
          label: "Food & nonalcoholic revenue",
          value: "At least 51% at each catered event",
          detail:
            "The 13CT caterer must derive at least 51% of gross food-and-beverage revenue at each catered event from the sale of food and nonalcoholic beverages.",
          href: "/resources/florida-liquor-license-laws",
          linkLabel: "Review Florida licensing rules inside FLLM ›",
        },
        {
          label: "Qualifying business",
          value: "Chapter 509 caterer + prepared food",
          detail:
            "The license is for a caterer licensed by Florida's Division of Hotels and Restaurants. Alcohol service must occur at a catered event where the licensee is also providing prepared food.",
          href: "/resources/florida-liquor-license-system",
          linkLabel: "See how Florida licensing works ›",
        },
        {
          label: "Geographic use",
          value: "Any Florida county",
          detail:
            "DBPR guidance states that a 13CT license may operate in any Florida county and may support multiple concurrent catered events, subject to the licensee's event-level compliance obligations.",
          href: "/resources/florida-liquor-license-types",
          linkLabel: "Compare Florida license types ›",
        },
        {
          label: "Alcohol storage",
          value: "Not permitted",
          detail:
            "A 13CT license does not authorize storage of alcoholic beverages for catered events. Alcohol must be purchased through a licensed vendor, and unused product is subject to Florida's catered-event rules.",
          href: "/resources/forms",
          linkLabel: "Open the FLLM ABT Forms Center ›",
        },
      ]}
      requirementsText="Florida's 13CT caterer license is a specialized statewide event license. The application is made on DBPR ABT-6011. Current DBPR event procedures also require the catered-event documentation prescribed for 13CT operations, including the event form and supporting contract/records."
      requirementsCaution="The phrase ‘mobile liquor license’ can be misleading. Before structuring a mobile bar business, determine who purchases and owns the alcohol, who is actually selling or charging for it, whether the operator is a qualified Chapter 509 caterer, whether prepared food is being provided, and what rules apply at the specific venue and event."
      officialResources={[
        {
          href: "/resources/forms",
          label: "FLLM Florida ABT Forms Center",
          description:
            "Find Florida alcoholic-beverage application resources, including the caterer application framework and related event documentation.",
        },
        {
          href: "/resources/florida-liquor-license-types",
          label: "FLLM Florida Liquor License Types Guide",
          description:
            "Compare 13CT with 4COP quota, 3PS, 2COP, and special restaurant license categories.",
        },
        {
          href: "/resources/florida-liquor-license-laws",
          label: "FLLM Florida Liquor License Laws",
          description:
            "Review FLLM's plain-English explanations of Florida alcoholic-beverage licensing rules and statutory distinctions.",
        },
      ]}
      quotaNote="A 13CT is a specialty caterer license, not a county quota license. It is not the same kind of transferable private-market asset as a 4COP quota or 3PS-family quota license. Its value is the operating privilege available to a qualifying caterer for compliant catered events."
      keyPoint="For a mobile bar concept, the trailer, cart, or portable bar is only equipment. The important legal questions are who owns and sells the alcohol, whether the operator qualifies as a Chapter 509 caterer, whether prepared food is provided, and whether the event satisfies the 13CT requirements."
      officialLabel="Florida Caterer Alcoholic Beverage License (13CT)"
      officialHref="/resources/florida-liquor-license-types"
      relatedHref="/resources/florida-liquor-license-types"
      relatedLabel="Compare All Florida License Types"
      ruleUpdateLinks={[
        {
          href: "/resources/florida-liquor-license-laws",
          label: "Florida liquor-license laws",
          description:
            "Review FLLM's current statutory and regulatory explanations before structuring an event alcohol-service model.",
        },
        {
          href: "/license-types/4cop-sfs-restaurant",
          label: "Compare 13CT with a 4COP-SFS / SRX restaurant license",
          description:
            "See how a fixed qualifying restaurant license differs from statewide catered-event privileges.",
        },
        {
          href: "/license-types/2cop-beer-wine",
          label: "Compare 13CT with a 2COP beer-and-wine license",
          description:
            "Understand the difference between ordinary beer-and-wine premises licensing and catered-event full-liquor service.",
        },
      ]}
      researchLinks={[
        {
          href: "/resources/florida-liquor-license-system",
          label: "How Florida Liquor Licensing Works",
          description:
            "Start with FLLM's overview of quota, non-quota, and specialty alcoholic-beverage licenses.",
        },
        {
          href: "/resources/forms",
          label: "Florida ABT Forms Center",
          description:
            "Review the forms and application resources used in Florida alcoholic-beverage licensing.",
        },
        {
          href: "/license-types/4cop-quota",
          label: "Compare With 4COP Quota",
          description:
            "See when a fixed-location full-liquor business may need a transferable county quota license instead.",
        },
      ]}
    />
  );
}
