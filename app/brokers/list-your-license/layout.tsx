import type { ReactNode } from "react";
import BrokerHeroSelectionFix from "./BrokerHeroSelectionFix";

export default function BrokerListYourLicenseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BrokerHeroSelectionFix />
      {children}
    </>
  );
}
