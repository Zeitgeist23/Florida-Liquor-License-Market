import type { ReactNode } from "react";
import FinanceGuideBehaviorFixes from "./FinanceGuideBehaviorFixes";
import "./lining-numerals.css";
import "./financing-snapshot-cards.css";
import "./rates-terms-card-hover.css";
import "./finance-guide-link-cards.css";
import "./finance-guide-table-hover.css";
import "./faq-open-gold.css";
import "./disclaimer-contrast.css";

export default function HowToFinanceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="finance-guide-lining-numerals">
      {children}
      <FinanceGuideBehaviorFixes />
    </div>
  );
}
