import type { Metadata } from "next";
import Script from "next/script";

import AbtDemographicSelects from "@/components/AbtDemographicSelects";
import AbtIncreaseInSeriesSelect from "@/components/AbtIncreaseInSeriesSelect";
import AbtMoralCharacterQuestion from "@/components/AbtMoralCharacterQuestion";
import LicenseTypeLogoScale from "@/components/LicenseTypeLogoScale";
import NationalMarketplaceFooterLink from "@/components/NationalMarketplaceFooterLink";

import "./globals.css";
import "./buyer-guide-theme.css";
import "./buyer-guide-buttons.css";
import "./buyer-guide-logo.css";
import "./seller-guide-theme.css";
import "./listings-header-fix.css";
import "./quota-cost-snapshot-fix.css";
import "./license-types-navy-refresh.css";

const GOOGLE_ANALYTICS_ID = "G-PKP8PXCDWF";

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
        <AbtIncreaseInSeriesSelect />
        <AbtDemographicSelects />
        <AbtMoralCharacterQuestion />
        <LicenseTypeLogoScale />
        {children}
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
