import type { ReactNode } from "react";

import BrokerListingLinkFix from "./BrokerListingLinkFix";
import LicenseTypeLinks from "./LicenseTypeLinks";
import "./featured-detail-badge.css";
import "./card-depth.css";
import "./interactive-effects.css";
import "./license-type-links.css";
import "./business-purchase-accent.css";

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
