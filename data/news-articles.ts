export type NewsArticle = {
  slug: string;
  eyebrow: string;
  title: string;
  date: string;
  summary: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  officialSourceUrl: string;
  officialSourceLabel: string;
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "florida-quota-drawing-season-what-applicants-should-watch-next",
    eyebrow: "FLLM Briefing",
    title: "Florida quota drawing season: what applicants should watch next",
    date: "August 16, 2026",
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
