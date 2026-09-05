import type { Metadata } from "next";
import Script from "next/script";

import AbtDemographicSelects from "@/components/AbtDemographicSelects";
import AbtIncreaseInSeriesSelect from "@/components/AbtIncreaseInSeriesSelect";
import AbtMoralCharacterQuestion from "@/components/AbtMoralCharacterQuestion";
import BrokerAssistanceNavigationEnhancement from "@/components/BrokerAssistanceNavigationEnhancement";
import FinancingAppraisalEnhancement from "@/components/FinancingAppraisalEnhancement";
import LicenseTypeLogoScale from "@/components/LicenseTypeLogoScale";
import ListYourLicenseLinkFix from "@/components/ListYourLicenseLinkFix";
import NationalMarketplaceFooterLink from "@/components/NationalMarketplaceFooterLink";
import SeoAuthorityEnhancements from "@/components/SeoAuthorityEnhancements";

import "./globals.css";
import "./buyer-guide-theme.css";
import "./buyer-guide-buttons.css";
import "./buyer-guide-logo.css";
import "./seller-guide-theme.css";
import "./listings-header-fix.css";
import "./quota-cost-snapshot-fix.css";
import "./license-types-navy-refresh.css";
import "./news-editorial-readability.css";
import "./news-source-readability.css";
import "./seo-authority-enhancements.css";
import "./broker-choice-buttons.css";
import "./listings/[slug]/exchange-panel.css";
import "./lawrence-moore-premium-badge.css";

/* One authoritative listing-card presentation across every FLLM route. */
import "./listings/listings-premium.css";
import "./listings/listings-header-position.css";
import "./listings/listings-map-size.css";
import "./listings/listings-county-links.css";
import "./listings/listings-navy-refresh.css";
import "./listings/listings-card-gold-borders.css";
import "./listings/listings-title-highlight.css";
import "./listings/listings-regression-fix.css";
import "./listings/listings-filter-depth.css";
import "./listings/listings-logo-3pct-lock.css";
import "./listings/listings-conversion-cards.css";
import "./listings/listings-card-overlap-fix.css";
import "./listings/listings-masthead-darker.css";
import "./listings/listings-mobile-header-fix.css";
import "./listings/listings-focused-card.css";
import "./listings/listings-seo-footer.css";
import "./listings/listings-view-button-edge-fix.css";

const GOOGLE_ANALYTICS_ID = "G-PKP8PXCDWF";
const siteUrl = "https://www.floridaliquorlicensemarket.com";

const marketplaceDescription =
  "Florida Liquor License Market is a specialized statewide marketplace where sellers can request full-service broker-assisted representation through FLLM itself or choose a self-directed listing, with market data, financing and valuation resources for Florida liquor-license transactions.";

const globalStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Florida Liquor License Market",
    url: siteUrl,
    logo: `${siteUrl}/assets/brand-sharp.svg`,
    description: marketplaceDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Florida Liquor License Market",
    url: siteUrl,
    description: marketplaceDescription,
    publisher: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#full-service-broker-representation`,
    name: "Full-Service Florida Liquor License Broker-Assisted Representation",
    serviceType: "Florida liquor license broker-assisted representation",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "State", name: "Florida" },
    url: `${siteUrl}/sell-your-license`,
    description:
      "Florida liquor-license sellers can request full-service broker-assisted representation through FLLM itself. Depending on the written brokerage agreement, services may include pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, due-diligence coordination, document organization and transaction coordination.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Florida Liquor License Market",
  description: marketplaceDescription,
  applicationName: "Florida Liquor License Market",
  openGraph: {
    type: "website",
    siteName: "Florida Liquor License Market",
    url: siteUrl,
    description: marketplaceDescription,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData).replaceAll("<", "\\u003c") }}
        />
        <AbtIncreaseInSeriesSelect />
        <AbtDemographicSelects />
        <AbtMoralCharacterQuestion />
        <BrokerAssistanceNavigationEnhancement />
        <ListYourLicenseLinkFix />
        <LicenseTypeLogoScale />
        <FinancingAppraisalEnhancement />
        {children}
        <SeoAuthorityEnhancements />
        <NationalMarketplaceFooterLink />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
