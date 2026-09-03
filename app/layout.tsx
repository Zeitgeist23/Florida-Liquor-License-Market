import type { Metadata } from "next";
import Script from "next/script";

import AbtDemographicSelects from "@/components/AbtDemographicSelects";
import AbtIncreaseInSeriesSelect from "@/components/AbtIncreaseInSeriesSelect";
import AbtMoralCharacterQuestion from "@/components/AbtMoralCharacterQuestion";
import BrokerAssistanceNavigationEnhancement from "@/components/BrokerAssistanceNavigationEnhancement";
import LicenseTypeLogoScale from "@/components/LicenseTypeLogoScale";
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

const GOOGLE_ANALYTICS_ID = "G-PKP8PXCDWF";
const siteUrl = "https://www.floridaliquorlicensemarket.com";

const globalStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Florida Liquor License Market",
    url: siteUrl,
    logo: `${siteUrl}/assets/brand-sharp.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Florida Liquor License Market",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://www.floridaliquorlicensemarket.com"),
  title: "Florida Liquor License Market",
  description:
    "Florida's marketplace for buying, selling, financing, and investing in liquor licenses.",
  applicationName: "Florida Liquor License Market",
  openGraph: {
    type: "website",
    siteName: "Florida Liquor License Market",
    url: "https://www.floridaliquorlicensemarket.com",
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
        <LicenseTypeLogoScale />
        {children}
        <SeoAuthorityEnhancements />
        <NationalMarketplaceFooterLink />

        <Script src="/assets/fllm-exchange-listing.js?v=3" strategy="afterInteractive" />
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
