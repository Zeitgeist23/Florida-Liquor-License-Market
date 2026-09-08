import type { ReactNode } from "react";

export default function ExchangeBoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .hero-shell {
          position: relative;
          aspect-ratio: 560 / 192;
          background: #020b14 url('/assets/fllm-exchange-board-header-approved.svg?v=1') center / 100% 100% no-repeat !important;
        }
        .hero-shell img {
          position: absolute;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          opacity: 0;
        }
      `}</style>
      {children}
    </>
  );
}
