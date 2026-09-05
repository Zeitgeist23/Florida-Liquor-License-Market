import type { ReactNode } from "react";
import "./schedule-hover.css";

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
        .loan-calculator-page .fllm-loan-calculator__payment output{
          font-size:clamp(32px,5vw,58px);
          letter-spacing:.01em;
          line-height:1.02;
          text-shadow:
            0 0 4px rgba(123,237,250,.45),
            0 0 12px rgba(70,210,229,.22);
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
          .loan-calculator-page .fllm-loan-calculator__payment output{font-size:clamp(34px,11vw,50px)}
        }
      `}</style>
    </>
  );
}
