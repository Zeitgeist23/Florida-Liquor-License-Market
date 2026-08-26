export type ApprovedBrokerRecipient = {
  name: string;
  firm: string;
  email: string;
};

export const APPROVED_BROKER_RECIPIENTS: readonly ApprovedBrokerRecipient[] = [
  {
    name: "Andy Fischer",
    firm: "Murphy Business",
    email: "a.fischer@murphybusiness.com",
  },
  {
    name: "Raquel Afriat",
    firm: "VR Business Brokers",
    email: "raquel@vrmiamicenter.com",
  },
  {
    name: "Omar Ojeda",
    firm: "United Real Estate Miami",
    email: "omarealtor@gmail.com",
  },
  {
    name: "Denise Houghtaling",
    firm: "Southern Country Business Advisors",
    email: "denise@denisesellsbusinesses.com",
  },
  {
    name: "Carey Sobel",
    firm: "Boss Group International",
    email: "careys@bossgi.com",
  },
  {
    name: "Richard Murray",
    firm: "Transworld Business Brokers",
    email: "rmurray@tworld.com",
  },
  {
    name: "J.R. DesAmours",
    firm: "Business Exit Advisors",
    email: "jrdesamours@myexitplan.com",
  },
  {
    name: "Mitchell Weinberger",
    firm: "Sunbelt Business Brokers",
    email: "mitchw@sunbeltnetwork.com",
  },
];

export const APPROVED_BROKERS_AWAITING_VERIFIED_EMAIL = [
  "Alex Rodriguez-Torres",
  "Del Ogorelkoff",
  "Ittiwat Suntron",
  "Alex Merturi",
  "Aquiles Solano Jr.",
  "Alvaro Gonzalez",
  "Robert MacKilligan",
] as const;

export const EXCLUDED_BROKER_ENTITIES = [
  "Florida Liquor License Sales",
  "Beverage License Specialists",
  "The Florida Liquor License Exchange",
  "Liquor License Professionals",
  "Liquor License FL / Liquor License Locators",
  "Licensing Solutions, Inc.",
  "BeverageLicense.com",
  "Florida Liquor Licenses / Florida Business Investments",
  "Beverage License Consultants",
  "LiquorLicense.com - Miami",
  "Jason Long",
  "Barry Rosayn",
] as const;
