import type { ReactNode } from "react";

import BrokerListingLinkFix from "./BrokerListingLinkFix";
import LicenseTypeLinks from "./LicenseTypeLinks";
import "../third-party-business-listing-standard.css";

// OFFICIAL LOCKED REFERENCE: FLLM-ANTEZZA is the canonical FLLM layout for
// featured third-party broker listings where the liquor license is sold only
// with an operating business. Future qualifying listings should inherit the
// shared standard stylesheet and mirror this page's structure/interactions.
export default function AntezzaListingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BrokerListingLinkFix />
      <LicenseTypeLinks />
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const root = document.querySelector('[data-featured-broker-listing="FLLM-ANTEZZA"]');
              const sellerDetails = root?.querySelector('.marketplace-listing-seller-details');
              if (!sellerDetails) return;
              sellerDetails.querySelectorAll('p').forEach((paragraph) => {
                paragraph.childNodes.forEach((node) => {
                  if (node.nodeType === Node.TEXT_NODE && node.textContent?.includes('The The total asking price')) {
                    node.textContent = node.textContent.replace('The The total asking price', 'The total asking price');
                  }
                });
              });
            })();
          `,
        }}
      />
    </>
  );
}
