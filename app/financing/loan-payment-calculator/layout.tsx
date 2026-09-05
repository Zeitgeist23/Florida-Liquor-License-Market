import type { ReactNode } from "react";

export default function LoanCalculatorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <style>{`
        .loan-calculator-page .fllm-loan-calculator__header h1{
          margin:7px 0 10px;
          color:#fff;
          font-size:clamp(27px,3.2vw,42px);
          line-height:1.08;
        }
        .loan-calculator-page .fllm-loan-calculator__rate-compare h2{
          margin:0 0 9px;
          color:#fff;
          font-size:14px;
          line-height:1.25;
        }
        .loan-calculator-page .fllm-loan-calculator__section-heading h2{
          margin:5px 0 0;
          color:#fff;
          font-size:23px;
          line-height:1.2;
        }
        @media(max-width:620px){
          .loan-calculator-page .fllm-loan-calculator__section-heading h2{font-size:20px}
        }
      `}</style>
    </>
  );
}
