export type NewsArticle = {
  slug: string;
  eyebrow: string;
  title: string;
  date: string;
  publishedDate?: string;
  reviewedDate?: string;
  summary: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  officialSourceUrl: string;
  officialSourceLabel: string;
  sourceType?: "official" | "publisher";
  sourceNote?: string;
  relatedLinks?: Array<{
    href: string;
    label: string;
    description: string;
  }>;
  video?: {
    embedUrl: string;
    title: string;
    provider: string;
  };
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "eleventh-circuit-florida-adult-live-performance-law-liquor-licenses",
    eyebrow: "Court Decision & Beverage-Law Enforcement",
    title: "Eleventh Circuit clears the way for Florida to enforce its adult live performance law",
    date: "August 4, 2026",
    publishedDate: "2026-08-04",
    reviewedDate: "2026-08-29",
    summary:
      "The en banc Eleventh Circuit vacated the preliminary injunction in HM Florida-ORL, LLC v. Griffin, allowing enforcement of Florida's 2023 Protection of Children Act while the litigation continues.",
    intro:
      "On August 4, 2026, the full U.S. Court of Appeals for the Eleventh Circuit issued an 8-5 decision in HM Florida-ORL, LLC v. Griffin. The court concluded that the Orlando restaurant challenging Florida's Protection of Children Act was unlikely to succeed on its facial overbreadth and vagueness claims and vacated the preliminary injunction that had blocked enforcement.",
    sections: [
      {
        heading: "What the Eleventh Circuit decided",
        paragraphs: [
          "The ruling concerns a preliminary injunction, not a final judgment after trial. The en banc court held that Hamburger Mary's had not shown the likelihood of success required for preliminary relief and sent the case back for further proceedings.",
          "The court's decision permits Florida to enforce the 2023 law during the continuing litigation. The law does not prohibit every drag performance; it regulates knowingly admitting a child to an 'adult live performance' as that term is defined in section 827.11, Florida Statutes."
        ]
      },
      {
        heading: "Why this is a liquor-license development",
        paragraphs: [
          "Chapter 2023-94 amended Florida's Beverage Law to authorize the Division of Alcoholic Beverages and Tobacco to suspend or revoke a beverage license, or impose a fine, when the Division finds sufficient cause that a licensed premises admitted a child to an adult live performance in violation of section 827.11.",
          "The statute specifies a $5,000 fine for a first violation and $10,000 for a second or later violation. It also characterizes a violation as an immediate, serious danger for purposes of emergency agency action under section 120.60(6)."
        ],
        bullets: [
          "Decision: HM Florida-ORL, LLC v. Secretary of the Florida Department of Business and Professional Regulation, No. 23-12160.",
          "Court and date: U.S. Court of Appeals for the Eleventh Circuit, en banc, August 4, 2026.",
          "Current posture: preliminary injunction vacated; litigation continues.",
          "Statutory sources: sections 561.29(1)(l) and 827.11, Florida Statutes."
        ]
      },
      {
        heading: "FLLM compliance and transaction takeaway",
        paragraphs: [
          "License holders should review the statutory definition, current agency guidance, and event-specific facts with qualified counsel. Buyers and lenders should also ask whether a licensed premises has any pending administrative complaint, emergency suspension, fine, or related litigation before closing.",
          "FLLM tracks this decision because it connects constitutional litigation, venue operations, and the regulatory status of valuable Florida beverage licenses."
        ]
      }
    ],
    officialSourceUrl:
      "https://caselaw.findlaw.com/court/us-11th-circuit/294891.html",
    officialSourceLabel: "Eleventh Circuit opinion — No. 23-12160",
    sourceType: "publisher",
    sourceNote:
      "FLLM's summary is based on the August 4, 2026 en banc opinion and official Florida legislative materials. Original reporting highlighted by the user included WKMG News 6 / ClickOrlando and Florida Phoenix coverage.",
    relatedLinks: [
      {
        href: "/florida-liquor-license-court-decisions",
        label: "Florida Liquor License Court Decisions",
        description: "Read the case in FLLM's selective case-law research hub."
      },
      {
        href: "/resources/florida-liquor-license-laws#current-developments",
        label: "Florida Liquor License Laws",
        description: "Review the Beverage Law penalty provision and related official sources."
      },
      {
        href: "/resources/liquor-license-attorneys#litigation-appeals",
        label: "Litigation and Appeals Attorneys",
        description: "Find Florida counsel by relevant practice area."
      }
    ]
  },
  {
    slug: "orlando-special-food-service-liquor-license-hb-1447-hb-1647",
    eyebrow: "Orlando Local Licensing Law",
    title: "Orlando's special food service liquor-license zones: HB 1447 and HB 1647 explained",
    date: "Reviewed August 29, 2026",
    publishedDate: "2026-08-29",
    reviewedDate: "2026-08-29",
    summary:
      "Florida local laws enacted in 2018 and 2021 created and expanded Orlando zones where qualifying smaller restaurants can seek special full-liquor restaurant licenses.",
    intro:
      "A search result describing a 'new' Orlando restaurant liquor-license law refers to legislation enacted several years ago. Florida HB 1447 became Chapter 2018-187, and HB 1647 became Chapter 2021-265. Together, the local acts created and expanded Orlando areas where a smaller bona fide restaurant may qualify for a special alcoholic-beverage license under criteria tailored to the designated zones.",
    sections: [
      {
        heading: "What the Orlando local acts changed",
        paragraphs: [
          "Chapter 2018-187 created a Downtown Restaurant Area exception. Chapter 2021-265 added Orlando Main Street Small Restaurant Incentive Areas and became effective June 29, 2021.",
          "For restaurants within the covered areas, the local framework uses a minimum of 1,800 square feet of contiguous space, capacity to serve meals to at least 80 persons at one time, and a requirement to derive at least 51 percent of gross food-and-beverage revenue from food and nonalcoholic beverages during the applicable operating periods."
        ]
      },
      {
        heading: "How the local rule differs from current statewide SFS law",
        paragraphs: [
          "Current section 561.20(2)(a)4., Florida Statutes, generally requires a bona fide food service establishment to have at least 2,000 square feet of service area, capacity to serve meals to 120 persons, at least 120 physical seats during operating hours, and the 51 percent food-and-nonalcoholic-beverage revenue mix.",
          "The City of Orlando identifies eligible downtown and Main Street districts and publishes local application guidance. A restaurant should confirm that its exact address lies in a qualifying area and that it satisfies both state and local requirements before relying on the special-license path."
        ]
      },
      {
        heading: "Why the special-zone rules matter to the market",
        paragraphs: [
          "A qualifying Orlando restaurant may be able to serve full liquor without acquiring a transferable Orange County quota license. That can change site selection, acquisition economics, and demand for quota inventory.",
          "The special license is qualification-based and should not be valued as though it were a freely transferable 4COP quota asset. FLLM keeps the local-law explanation connected to the Orange County market page, the 4COP-SFS guide, the statewide laws library, and current news coverage."
        ]
      }
    ],
    officialSourceUrl: "https://www.flsenate.gov/Session/Bill/2021/1647",
    officialSourceLabel: "Florida Legislature — HB 1647 (2021), Chapter 2021-265",
    sourceType: "official",
    sourceNote:
      "FLLM verified the historical legislation against Florida Senate bill records and current City of Orlando guidance. The Global Law Experts article supplied useful background but is not described here as a newly enacted 2026 law.",
    relatedLinks: [
      {
        href: "/license-types/4cop-sfs-restaurant",
        label: "4COP-SFS Restaurant License Guide",
        description: "Compare the special restaurant path with a quota license."
      },
      {
        href: "/counties/orange",
        label: "Orange County Liquor License Market",
        description: "See county inventory, market context, and valuation resources."
      },
      {
        href: "/resources/florida-liquor-license-laws#current-developments",
        label: "Florida Liquor License Laws",
        description: "Open the official Orlando acts and statewide SFS statute."
      }
    ]
  },
  {
    slug: "florida-2cop-beer-wine-license-statewide-access-market-context",
    eyebrow: "Industry Commentary & License Access",
    title: "Florida's 2COP beer-and-wine license offers statewide access without a county quota",
    date: "December 18, 2025",
    publishedDate: "2025-12-18",
    reviewedDate: "2026-08-29",
    summary:
      "A Tallahassee Democrat opinion highlighted the 2COP license as an innovation tool; Florida DBPR confirms beer-and-wine licenses are not numerically restricted like county quota liquor licenses.",
    intro:
      "A December 2025 Tallahassee Democrat opinion argued that Florida's beer-and-wine licensing framework can support restaurant and beverage innovation. The policy argument is commentary, but its central licensing distinction is confirmed by Florida DBPR: beer-and-wine licenses are not subject to the numerical county quota that constrains full-liquor quota licenses.",
    sections: [
      {
        heading: "What a 2COP license authorizes",
        paragraphs: [
          "Florida DBPR describes 2COP as a beer-and-wine consumption-on-premises license. It authorizes malt and vinous beverages for on-premises consumption, and sealed package sales may also be allowed where local ordinances permit.",
          "A 2COP does not authorize distilled spirits. A business that needs vodka, rum, whiskey, tequila, or other spirituous beverages must evaluate an appropriate full-liquor license category."
        ]
      },
      {
        heading: "The market-transparency distinction",
        paragraphs: [
          "DBPR's licensing FAQ states that there is no numerical restriction on licenses issued to sell beer and wine. By contrast, ordinary full-liquor quota licenses are limited by county population and generally must be acquired from an existing owner or through the state's quota drawing.",
          "That distinction affects cost, timing, transferability, and asset value. A 2COP is an operating privilege obtained through the licensing process; it is not the same scarce, county-specific market asset as a 4COP or 3PS quota license."
        ]
      },
      {
        heading: "FLLM market takeaway",
        paragraphs: [
          "Businesses should identify the beverages they actually need to sell before shopping for a quota license. A restaurant, cafe, taproom, or wine-focused concept that does not require spirits may avoid the cost and scarcity associated with a quota asset by using the appropriate beer-and-wine license.",
          "FLLM links the commentary to the official 2COP guide and laws library so readers can separate the underlying regulation from the publisher's policy argument."
        ]
      }
    ],
    officialSourceUrl:
      "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/faqs/",
    officialSourceLabel: "Florida DBPR / ABT licensing FAQ",
    sourceType: "official",
    sourceNote:
      "The Tallahassee Democrat item is an opinion article, not an official legal source. FLLM used DBPR's current licensing pages to verify the regulatory distinction and presents the opinion only as industry commentary.",
    relatedLinks: [
      {
        href: "/license-types/2cop-beer-wine",
        label: "Florida 2COP Beer & Wine License",
        description: "Review privileges, limitations, and the official application source."
      },
      {
        href: "/license-types/4cop-quota",
        label: "Florida 4COP Quota License",
        description: "Compare a beer-and-wine privilege with a county quota asset."
      },
      {
        href: "/resources/florida-liquor-license-laws#current-developments",
        label: "Florida Liquor License Laws",
        description: "Read the official statutory and DBPR framework."
      }
    ]
  },
  {
    slug: "florida-alcohol-licensing-reform-small-restaurants-sfs",
    eyebrow: "Legislation & Licensing Reform",
    title: "Florida's alcohol licensing reform opened the door to more small restaurants",
    date: "October 12, 2023",
    publishedDate: "2023-10-12",
    summary:
      "The University of Miami Business Law Review examined Florida's 2023 special food service licensing reform, which reduced the size and seating thresholds for qualifying restaurants while retaining the 51% food-and-nonalcoholic-beverage revenue requirement.",
    intro:
      "The University of Miami Business Law Review published an analysis of Florida's 2023 reform to the special food service licensing requirements. The change lowered the minimum service area and seating thresholds for qualifying restaurants, making full-liquor service potentially accessible to more restaurant concepts without requiring the purchase of a quota license on the open market.",
    sections: [
      {
        heading: "What changed in 2023",
        paragraphs: [
          "Before the reform, the special food service framework generally required a restaurant to have at least 2,500 square feet of service area and capacity to serve 150 persons at one time. The 2023 change reduced those thresholds to 2,000 square feet of service area and the ability to serve 120 persons at one time, with at least 120 physical seats available during operating hours.",
          "The reform did not eliminate the food-sales requirement. Qualifying restaurants must still derive at least 51 percent of gross food and beverage revenue from food and nonalcoholic beverages during the applicable operating periods."
        ]
      },
      {
        heading: "Why the reform matters to restaurants and quota-license buyers",
        paragraphs: [
          "For smaller restaurants, the lower size and seating thresholds can create a path to full-liquor service through a special food service license rather than purchasing a county quota license. That can materially change the economics of opening, expanding or acquiring a restaurant.",
          "For the quota-license market, the distinction matters because a restaurant that qualifies for a special food service license may not need to compete for a transferable 4COP quota license. Buyers should therefore determine early whether the business model qualifies for a special restaurant license before valuing or purchasing a quota license."
        ],
        bullets: [
          "Confirm the restaurant's service-area measurement and physical seating count.",
          "Model the 51 percent food and nonalcoholic beverage revenue requirement.",
          "Compare the special food service route with the cost and flexibility of a transferable quota license.",
          "Verify current DBPR / ABT requirements before signing a lease or license purchase agreement."
        ]
      },
      {
        heading: "Current Florida law",
        paragraphs: [
          "The 2026 Florida Statutes continue to state the 2,000-square-foot, 120-person and 120-seat requirements for the special restaurant license, together with the 51 percent food and nonalcoholic beverage revenue test. The current provision appears in section 561.20(2)(a)4., Florida Statutes.",
          "Because licensing statutes and administrative requirements can change, restaurant owners and buyers should confirm the current statute and DBPR / ABT guidance at the time of application or transaction."
        ]
      },
      {
        heading: "FLLM market takeaway",
        paragraphs: [
          "The 2023 reform is important market context because not every restaurant that wants to sell spirits needs a scarce county quota license. FLLM treats special food service eligibility and quota-license availability as separate paths that should be evaluated against the buyer's concept, premises, operating model and long-term transfer needs."
        ]
      }
    ],
    officialSourceUrl:
      "https://business-law-review.law.miami.edu/floridas-game-changing-alcohol-licensing-reform-a-win-for-small-restaurants/",
    officialSourceLabel: "University of Miami Business Law Review",
    sourceType: "publisher",
    sourceNote:
      "Original analysis by Frances Rodriguez, published October 12, 2023 by the University of Miami Business Law Review. FLLM provides its own market-focused summary and does not reproduce the publisher's article."
  },
  {
    slug: "orlando-venue-liquor-license-suspension-drag-show",
    eyebrow: "Enforcement & Current Events",
    title: "Officials move to suspend Orlando venue's liquor license after drag show attended by children",
    date: "February 3, 2023",
    publishedDate: "2023-02-03",
    summary:
      "WKMG News 6 / ClickOrlando reported that Florida officials moved to suspend an Orlando performing arts venue's liquor license after a December 2022 drag show attended by children.",
    intro:
      "WKMG News 6 / ClickOrlando reported that an Orlando performing arts venue faced the loss of its liquor license after Florida officials took administrative action tied to a December 2022 event. FLLM presents the original station video alongside its own regulatory and market summary so readers can stay inside the FLLM news experience.",
    sections: [
      {
        heading: "What happened",
        paragraphs: [
          "According to WKMG News 6 / ClickOrlando, state officials moved against the venue's alcoholic-beverage license after the December 2022 show. The matter illustrates how alleged conduct at licensed premises can lead to an administrative licensing dispute in addition to any other legal issues that may be raised.",
          "The underlying allegations, defenses and procedural posture should be evaluated from the agency record and the parties' filings. FLLM does not treat a licensing complaint or proposed suspension as a final adjudication unless the agency record shows that result."
        ]
      },
      {
        heading: "Why it matters to Florida license holders",
        paragraphs: [
          "A Florida alcoholic-beverage license is not only a marketable business asset; it is also subject to continuing regulatory oversight. Enforcement matters can affect operations, transfers, financing, due diligence and the value a buyer or lender assigns to a license-related transaction.",
          "For buyers and lenders, the practical takeaway is to review the current DBPR / ABT license record and any known administrative matters before closing or funding a transaction."
        ],
        bullets: [
          "Check the current DBPR / ABT license status before a transaction closes.",
          "Ask whether any administrative complaint, suspension, revocation or other enforcement matter is pending.",
          "Distinguish allegations and proposed agency action from a final agency order.",
          "Use original reporting and agency records to verify material facts."
        ]
      }
    ],
    officialSourceUrl:
      "https://www.clickorlando.com/video/news/2023/02/04/officials-move-to-suspend-orlando-venues-liquor-license-after-drag-show-attended-by-children/",
    officialSourceLabel: "WKMG News 6 / ClickOrlando",
    sourceType: "publisher",
    sourceNote:
      "Original reporting and video are credited to WKMG News 6 / ClickOrlando. FLLM provides its own summary and does not reproduce the publisher's article.",
    video: {
      embedUrl: "https://www.youtube-nocookie.com/embed/kFBjJpE5iNo",
      title: "WKMG News 6 report on Orlando venue liquor-license suspension action",
      provider: "WKMG News 6 / ClickOrlando"
    }
  },
  {
    slug: "knights-pub-liquor-license-suspended-covid-19",
    eyebrow: "Enforcement & Current Events",
    title: "Knight's Pub liquor license suspended after COVID-19 outbreak",
    date: "June 23, 2020",
    publishedDate: "2020-06-23",
    summary:
      "FOX 35 Orlando reported that Florida regulators suspended the alcohol license of Knight's Pub near the University of Central Florida after employees and customers tested positive for COVID-19 and officials cited reopening-guideline violations.",
    intro:
      "FOX 35 Orlando reported in June 2020 that the Department of Business and Professional Regulation suspended Knight's Pub's alcoholic-beverage license amid a COVID-19 outbreak tied to the popular bar near the University of Central Florida. FLLM provides a market and regulatory summary of the reported enforcement action while crediting the original FOX 35 reporting.",
    sections: [
      {
        heading: "What FOX 35 reported",
        paragraphs: [
          "FOX 35 reported that DBPR suspended the Knight's Pub liquor license after 13 employees and at least 28 customers tested positive for coronavirus. The station also reported that a state document cited alleged violations of reopening requirements, including serving alcoholic beverages to patrons who were not seated and concerns about social distancing.",
          "The suspension occurred during Florida's 2020 COVID-19 emergency period, when bars and restaurants were operating under temporary public-health and reopening restrictions that differed substantially from ordinary licensing conditions."
        ]
      },
      {
        heading: "Why the enforcement action matters to license holders",
        paragraphs: [
          "The Knight's Pub matter is an example of how an alcoholic-beverage license can be affected by emergency orders and operating-rule enforcement in addition to the ordinary transfer, renewal and compliance rules that govern Florida licensees.",
          "For buyers, sellers and lenders reviewing a liquor-license transaction, historical enforcement matters can be relevant to due diligence even when the particular emergency rule that triggered the action is no longer in effect."
        ],
        bullets: [
          "Confirm the current DBPR / ABT status of a license before closing.",
          "Review known administrative complaints, suspensions or other enforcement history when material to the transaction.",
          "Distinguish temporary emergency-era operating rules from current Florida alcoholic-beverage law.",
          "Use the agency record and original reporting to verify the facts of a historical enforcement matter."
        ]
      },
      {
        heading: "FLLM market takeaway",
        paragraphs: [
          "A quota liquor license may have substantial private-market value, but that value exists within a regulated licensing system. Operational compliance, pending agency action and license status can all affect transaction timing, lender review and buyer confidence."
        ]
      }
    ],
    officialSourceUrl:
      "https://www.fox35orlando.com/news/knights-pub-gets-liquor-license-suspended-after-employees-customers-test-positive-for-covid-19",
    officialSourceLabel: "FOX 35 Orlando",
    sourceType: "publisher",
    sourceNote:
      "Original reporting was published by FOX 35 Orlando and updated June 23, 2020. FLLM provides its own summary and regulatory context and does not reproduce the publisher's article."
  },
  {
    slug: "florida-quota-drawing-season-what-applicants-should-watch-next",
    eyebrow: "2026 Quota Drawing",
    title: "Florida Announces 63 Quota Liquor Licenses Across 30 Counties for the 2026 Drawing",
    date: "August 19, 2026",
    publishedDate: "2026-08-19",
    reviewedDate: "2026-08-25",
    summary:
      "Florida DBPR announced 63 quota beverage licenses across 30 counties for the 2026 drawing. Entries close September 30, 2026 at 5 p.m. EDT.",
    intro:
      "Florida's Department of Business and Professional Regulation announced on August 19, 2026 that 63 quota beverage licenses are available across 30 counties for the 2026 drawing entry period. The official notice states that the entry period began August 17, and DBPR will accept entries through September 30, 2026 at 5 p.m. EDT.",
    sections: [
      {
        heading: "What Florida announced for the 2026 quota drawing",
        paragraphs: [
          "DBPR says the 2026 entry period makes 63 quota beverage licenses available across 30 Florida counties. The annual process awards selected entrants the opportunity to apply for a newly available license in the county entered.",
          "Selection is not the same as license issuance. A selected entrant must still submit the required application, qualify under Florida law and complete the Division's licensing process."
        ],
        bullets: [
          "Official press release date: August 19, 2026.",
          "Entry deadline: September 30, 2026 at 5 p.m. EDT.",
          "Available licenses: 63 across 30 counties.",
          "Drawing date: to be announced by DBPR after the entry period closes.",
          "Selection gives an entrant the right to apply; it does not itself issue a license."
        ]
      },
      {
        heading: "2026 licenses available by county",
        paragraphs: [
          "The official 2026 notice identifies the following county allocations. The allocations total 63 licenses in 30 counties."
        ],
        bullets: [
          "5 licenses each: Dade and Polk.",
          "4 licenses each: Broward and Osceola.",
          "3 licenses each: Brevard, Duval, Hillsborough, Lake, Orange and St. Johns.",
          "2 licenses each: Charlotte, Lee, Manatee, Marion, Palm Beach, Pasco and Volusia.",
          "1 license each: Alachua, Collier, Flagler, Franklin, Jackson, Leon, Okaloosa, Santa Rosa, Sarasota, St. Lucie, Sumter, Suwannee and Walton."
        ]
      },
      {
        heading: "What applicants should do before the deadline",
        paragraphs: [
          "Applicants should use DBPR's current online portal and instructions, choose the county carefully and retain proof of submission. The official notice lists a $100 nonrefundable entry fee for each county-specific entry.",
          "Because entry rules, forms and filing systems can change, applicants should verify the current DBPR materials immediately before filing rather than relying on a prior-year drawing guide."
        ],
        bullets: [
          "Review the current ABT-6033 entry form and DBPR instructions.",
          "Confirm the applicant name, entity information and selected county before filing.",
          "Verify the $100 fee and online filing route.",
          "Submit before 5 p.m. EDT on September 30, 2026.",
          "Keep the completed entry and payment confirmation."
        ]
      },
      {
        heading: "Why the 2026 drawing matters to the Florida liquor-license market",
        paragraphs: [
          "New quota licenses add supply at the county level. The effect is not uniform statewide: a county receiving five new licenses may experience a different market response than a county receiving one, while counties absent from the notice receive no new drawing supply from this entry period.",
          "FLLM tracks the drawing alongside current listings, county asking-price data and DBPR records. Drawing availability is market context, not a substitute for a license appraisal, legal review or transaction-specific due diligence."
        ]
      }
    ],
    officialSourceUrl:
      "https://www2.myfloridalicense.com/florida-dbpr-announces-quota-beverage-licenses-2026-entry-period/",
    officialSourceLabel: "Florida DBPR press release — August 19, 2026"
  },
  {
    slug: "2025-florida-quota-drawing-results-posted",
    eyebrow: "Quota Drawing",
    title: "2025 Florida quota drawing results are posted",
    date: "May 6, 2026",
    publishedDate: "2026-05-06",
    summary:
      "Florida DBPR reports that the public drawing for the 2025 quota alcoholic beverage license entry period was held May 6, 2026.",
    intro:
      "Florida DBPR reports that the public drawing for the 2025 quota alcoholic beverage license entry period was held on May 6, 2026, covering counties across the state where quota licenses were available.",
    sections: [
      {
        heading: "What the posted results mean",
        paragraphs: [
          "The drawing results identify the outcome of the public selection process. A drawing result should not be treated as a substitute for the licensing steps, deadlines and other requirements that may follow under DBPR procedures.",
          "Applicants should review the official DBPR material for their county and confirm the next required action directly with the Division."
        ]
      },
      {
        heading: "Market context",
        paragraphs: [
          "Quota drawing results matter to market participants because newly issued quota licenses can affect future license supply within a county.",
          "FLLM treats drawing information as one component of county-level market research alongside active and inactive license records, current listings and transaction evidence."
        ]
      }
    ],
    officialSourceUrl:
      "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/",
    officialSourceLabel: "Florida DBPR / ABT quota license information"
  },
  {
    slug: "online-account-requirement-abt-licensees-applicants",
    eyebrow: "DBPR Update",
    title: "Online account requirement for ABT licensees and applicants",
    date: "Reviewed August 24, 2026",
    reviewedDate: "2026-08-24",
    summary:
      "DBPR says Alcoholic Beverages and Tobacco licensees, permit holders and applicants must create and maintain an account in the Division's online system.",
    intro:
      "Florida DBPR states that Alcoholic Beverages and Tobacco licensees, permit holders and applicants must create and maintain an account in the Division's online system.",
    sections: [
      {
        heading: "Why the account requirement matters",
        paragraphs: [
          "The online account is part of the Division's licensing and applicant workflow. Licensees and applicants should keep their account information current and should confirm the Division's present online procedures before filing or responding to a licensing matter.",
          "For transactions involving an existing license, the requirement is another reason to identify early who will be responsible for the regulatory filings and communications with DBPR."
        ]
      },
      {
        heading: "Practical takeaway",
        bullets: [
          "Confirm that the appropriate licensee or applicant has access to the current DBPR online system.",
          "Verify contact and account information before a filing deadline.",
          "Use current DBPR instructions for transfers, renewals and other license actions."
        ],
        paragraphs: []
      }
    ],
    officialSourceUrl:
      "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/faqs/",
    officialSourceLabel: "Florida DBPR / ABT FAQs"
  },
  {
    slug: "quota-drawing-procedures-current-abt-rulemaking",
    eyebrow: "Rulemaking Watch",
    title: "Quota drawing procedures are part of current ABT rulemaking notices",
    date: "Reviewed August 24, 2026",
    reviewedDate: "2026-08-24",
    summary:
      "The Division's News & Notices page includes rulemaking activity addressing quota drawing entry procedures and related beverage-license rules.",
    intro:
      "Florida ABT's News & Notices page includes current rulemaking activity addressing quota drawing entry procedures and related alcoholic-beverage licensing rules.",
    sections: [
      {
        heading: "Why rulemaking deserves attention",
        paragraphs: [
          "Rulemaking can affect the procedures that applicants and licensees are expected to follow. Market participants should therefore verify the current rule, notice and filing requirements rather than relying on older instructions.",
          "For quota drawing applicants, the official drawing announcement and current ABT forms remain the controlling sources for the applicable entry period."
        ]
      },
      {
        heading: "FLLM monitoring approach",
        paragraphs: [
          "FLLM follows DBPR and ABT notices because regulatory changes can affect application timing, transfer procedures and the information that buyers, sellers and lenders should request during due diligence."
        ]
      }
    ],
    officialSourceUrl:
      "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/news-and-notices/",
    officialSourceLabel: "Florida DBPR / ABT News & Notices"
  },
  {
    slug: "track-active-inactive-florida-quota-license-lists",
    eyebrow: "License Data",
    title: "Track active and inactive Florida quota license lists",
    date: "Reviewed August 24, 2026",
    reviewedDate: "2026-08-24",
    summary:
      "DBPR publishes downloadable active and inactive quota-license listings that help market participants follow statewide license-status data.",
    intro:
      "Florida DBPR publishes downloadable active and inactive quota-license listings that can help owners, buyers, lenders and other market participants follow statewide license-status information.",
    sections: [
      {
        heading: "How the lists can be used",
        paragraphs: [
          "The lists are useful for identifying license records, county distribution and status information within DBPR's public data. They can also support broader county-level supply analysis when the date and status filter are clearly identified.",
          "A public status listing should not, by itself, be treated as proof of clear title, seller authority, transferability or the absence of liens or other claims. Those issues require separate due diligence."
        ]
      },
      {
        heading: "FLLM public-record context",
        paragraphs: [
          "FLLM uses DBPR public-record data to help users locate license records and compare county-level market information. Users should confirm material transaction information directly with DBPR and qualified professionals before relying on it for a closing or credit decision."
        ]
      }
    ],
    officialSourceUrl:
      "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/",
    officialSourceLabel: "Florida DBPR / ABT quota license information"
  }
];

export function getNewsArticle(slug: string) {
  return NEWS_ARTICLES.find((article) => article.slug === slug) ?? null;
}
