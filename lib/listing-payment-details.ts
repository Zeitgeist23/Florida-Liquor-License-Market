export type ListingPaymentDetails = {
  tier: "standard" | "featured";
  tierLabel: "Standard Listing" | "Featured Listing";
  amount: 14.95 | 24.95;
  amountLabel: "$14.95" | "$24.95";
};

export function listingPaymentDetails(
  message: string | null | undefined,
): ListingPaymentDetails {
  if (message?.includes("Listing option: Featured Broker Listing")) {
    return {
      tier: "featured",
      tierLabel: "Featured Listing",
      amount: 24.95,
      amountLabel: "$24.95",
    };
  }

  return {
    tier: "standard",
    tierLabel: "Standard Listing",
    amount: 14.95,
    amountLabel: "$14.95",
  };
}
