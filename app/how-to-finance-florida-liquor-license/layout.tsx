import type { ReactNode } from "react";
import FinanceGuideBehaviorFixes from "./FinanceGuideBehaviorFixes";
import "./lining-numerals.css";
import "./financing-snapshot-cards.css";
import "./financing-terms-cards.css";
import "./finance-guide-link-cards.css";
import "./faq-open-gold.css";

export default function HowToFinanceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="finance-guide-lining-numerals">
      {children}
      <FinanceGuideBehaviorFixes />
    </div>
  );
}
