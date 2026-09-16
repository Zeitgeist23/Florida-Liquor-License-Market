"use client";

import { useEffect } from "react";

const brokerListingUrl =
  "https://sunshineagle.com/deal-listing/upscale-cocktail-lounge-with-4cop-quota-license/?back=https%3A%2F%2Fsunshineagle.com%2Fpremium-listings%2F&source&listing_button_text=Inquire%20About%20This%20Listing&listing_button_color&css_source=7799&json_url=https://sunshineagle.dealrelations.com/listings/upscale-cocktail-lounge-with-4cop-quota-license.json?item_id=5534";

export default function BrokerListingLinkFix() {
  useEffect(() => {
    const link = document.querySelector<HTMLAnchorElement>(
      '.marketplace-listing-aside-broker .marketplace-listing-text-link'
    );

    if (!link) return;

    link.href = brokerListingUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }, []);

  return null;
}
