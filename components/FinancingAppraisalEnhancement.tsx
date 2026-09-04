"use client";

import { useEffect } from "react";

const PROMO_HTML = `
  <div class="fllm-finance-appraisal-inner">
    <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal Florida quota liquor license appraisal report" />
    <div>
      <span>Professional License Valuation</span>
      <h2>Need a lender-ready value?</h2>
      <p>Order a formal FLLM liquor license appraisal supported by county market evidence, comparable listings and regulatory research.</p>
      <a href="/florida-liquor-license-appraisal#order-form">Order Appraisal — $495</a>
    </div>
  </div>`;

function syncLegacyPrice(root: ParentNode = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    if (node.nodeValue?.includes("$995")) {
      node.nodeValue = node.nodeValue.replaceAll("$995", "$495");
    }
  }
}

export default function FinancingAppraisalEnhancement() {
  useEffect(() => {
    syncLegacyPrice();

    if (window.location.pathname === "/how-to-finance-florida-liquor-license") {
      const intro = document.querySelector(".finance-guide-page .seo-market-intro");
      if (intro && !document.getElementById("fllm-finance-appraisal-promo")) {
        const section = document.createElement("section");
        section.id = "fllm-finance-appraisal-promo";
        section.className = "fllm-finance-appraisal-promo";
        section.innerHTML = PROMO_HTML;
        intro.parentNode?.insertBefore(section, intro);
      }
    }

    const observer = new MutationObserver(() => syncLegacyPrice());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <style jsx global>{`
      .fllm-finance-appraisal-promo {
        padding: 28px 20px;
        background: #f7f7f5;
      }
      .fllm-finance-appraisal-inner {
        width: min(1180px, 100%);
        margin: 0 auto;
        display: grid;
        grid-template-columns: 190px 1fr;
        gap: 26px;
        align-items: center;
        padding: 24px;
        border: 1px solid rgba(246, 167, 0, .46);
        border-radius: 14px;
        background: linear-gradient(145deg, #0a2237, #04111c);
        box-shadow: 0 14px 30px rgba(2, 11, 18, .16);
      }
      .fllm-finance-appraisal-inner img {
        display: block;
        width: 100%;
        border: 1px solid rgba(246, 167, 0, .48);
        border-radius: 8px;
        box-shadow: 0 10px 24px rgba(0, 0, 0, .28);
      }
      .fllm-finance-appraisal-inner span {
        display: block;
        margin-bottom: 6px;
        color: #f6a700;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .fllm-finance-appraisal-inner h2 {
        margin: 0 0 9px;
        color: #fff;
        font: 700 28px/1.15 Georgia, "Times New Roman", serif;
      }
      .fllm-finance-appraisal-inner p {
        max-width: 720px;
        margin: 0 0 15px;
        color: #d7e0e7;
        font-size: 14px;
        line-height: 1.65;
      }
      .fllm-finance-appraisal-inner a {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        padding: 0 16px;
        border: 1px solid #f6a700;
        border-radius: 5px;
        color: #07111a;
        background: linear-gradient(145deg, #ffbd21, #ef9000);
        font-size: 11px;
        font-weight: 900;
        text-decoration: none;
        text-transform: uppercase;
      }
      @media (max-width: 760px) {
        .fllm-finance-appraisal-inner {
          grid-template-columns: 92px 1fr;
          gap: 14px;
          padding: 16px;
        }
        .fllm-finance-appraisal-inner h2 { font-size: 21px; }
        .fllm-finance-appraisal-inner p { font-size: 12px; }
      }
    `}</style>
  );
}
