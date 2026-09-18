import type { ReactNode } from "react";

// The route now renders through the shared FeaturedThirdPartyBusinessListingPage
// component. Keep this layout intentionally neutral so future template behavior
// is controlled in one place rather than by listing-specific DOM rewrites.
export default function AntezzaListingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
