import type { ReactNode } from "react";

import Rule61A5010MandatoryTransfer from "@/components/Rule61A5010MandatoryTransfer";

export default function FloridaLiquorLicenseLawsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <Rule61A5010MandatoryTransfer context="laws" />
    </>
  );
}
