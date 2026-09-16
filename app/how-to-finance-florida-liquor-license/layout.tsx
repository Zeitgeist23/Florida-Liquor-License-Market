import type { ReactNode } from "react";
import "./lining-numerals.css";
import "./financing-snapshot-cards.css";
import "./rates-terms-card-hover.css";

export default function HowToFinanceLayout({ children }: { children: ReactNode }) {
  return <div className="finance-guide-lining-numerals">{children}</div>;
}
