export type NewsArticle = {
  slug: string;
  eyebrow: string;
  title: string;
  date: string;
  publishedDate?: string;
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
  video?: {
    embedUrl: string;
    title: string;
    provider: string;
  };
};

export const NEWS_ARTICLES: NewsArticle[] = [
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
    eyebrow: "FLLM Briefing",
    title: "Florida quota drawing season: what applicants should watch next",
    date: "August 16, 2026",
    publishedDate: "2026-08-16",
    summary:
      "A practical FLLM briefing on the annual Florida quota drawing entry window, eligible counties and the ABT-6033 filing process.",
    intro:
      "Florida's annual quota drawing is one of the most closely watched events in the state's liquor-license market. DBPR states that drawing entries are accepted for 45 days beginning on the third Monday in August when one or more quota licenses are available.",
    sections: [
      {
        heading: "What applicants should confirm first",
        paragraphs: [
          "Before submitting an entry, applicants should confirm the current DBPR notice, the counties for which quota licenses are available, the filing deadline and the current filing instructions.",
          "The drawing process is administrative and county-specific. Applicants should rely on the current DBPR requirements rather than prior-year dates or assumptions about county availability."
        ],
        bullets: [
          "Confirm the current quota-drawing announcement and eligible counties.",
          "Review the current ABT-6033 entry form and instructions.",
          "Verify the filing deadline and required entry fee before submission.",
          "Keep a copy of the completed entry and proof of submission."
        ]
      },
      {
        heading: "Why the drawing matters to the market",
        paragraphs: [
          "New quota licenses can add supply in individual counties, so drawing activity is relevant not only to applicants but also to existing license owners, buyers, lenders and brokers following county-level scarcity.",
          "FLLM tracks drawing developments alongside current listings, county market information and DBPR public records so users can evaluate the drawing in the broader context of the Florida liquor-license market."
        ]
      }
    ],
    officialSourceUrl:
      "https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=17270&clientCode=4087&xactCode=1030",
    officialSourceLabel: "Florida DBPR quota drawing requirements"
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
    date: "Current DBPR notice",
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
    date: "Current rulemaking notice",
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
    date: "Updated by DBPR",
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
