import type { Metadata } from "next";
import LockedFeaturedBrokerPreview from "@/components/LockedFeaturedBrokerPreview";

export const metadata: Metadata = {
  title: "Sample Featured Broker Listing | FLLM",
  description: "Fictitious Featured broker listing detail-page example for Florida Liquor License Market.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <LockedFeaturedBrokerPreview brokerMode="female" />
      <style>{`
        a[aria-label="Florida Liquor License Market home"] {
          position: relative;
          left: -25px;
          top: -15px;
        }
        img[src*="county-map?county=St%20Lucie%20County"] {
          transform: scale(1.55);
          transform-origin: center center;
          clip-path: inset(17.75% 17.75% 17.75% 17.75%);
        }
        [class*="countyCard"] {
          align-self: start !important;
          height: fit-content !important;
          min-height: 0 !important;
        }
        @media (max-width: 800px) {
          header[class*="header"] {
            min-height: 96px !important;
            height: auto !important;
            padding: 12px 18px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
          a[aria-label="Florida Liquor License Market home"] {
            position: static !important;
            left: auto !important;
            top: auto !important;
            width: 65% !important;
            max-width: 300px !important;
            margin: 0 auto !important;
            justify-content: center !important;
          }
          a[aria-label="Florida Liquor License Market home"] img {
            width: 100% !important;
            max-height: 72px !important;
            height: auto !important;
            object-fit: contain !important;
          }
          header[class*="header"] nav {
            display: none !important;
          }
          aside[class*="rail"] {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          [class*="breadcrumb"] {
            font-size: 12px !important;
          }
          [class*="heroCopy"] > p {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }
          [class*="detailGrid"] span {
            font-size: 10px !important;
          }
          [class*="detailGrid"] strong {
            font-size: 13px !important;
          }
          [class*="highlights"] {
            padding: 8px 9px !important;
          }
          [class*="highlights"] h3 {
            margin: 0 0 7px !important;
            padding: 0 0 0 4px !important;
            border: 0 !important;
            font-size: 18px !important;
          }
          [class*="highlightGrid"] {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            border: 1px solid rgba(201,143,22,.48) !important;
          }
          [class*="highlightGrid"] > div {
            height: 88px !important;
            min-height: 88px !important;
            padding: 8px !important;
            border-right: 1px solid rgba(201,143,22,.42) !important;
          }
          [class*="highlightGrid"] > div:nth-child(2) {
            border-right: 1px solid rgba(201,143,22,.42) !important;
          }
          [class*="highlightGrid"] > div:last-child {
            border-right: 0 !important;
          }
          [class*="highlightGrid"] b {
            font-size: 25px !important;
            line-height: 1 !important;
          }
          [class*="highlightGrid"] span {
            font-size: 10px !important;
            line-height: 1.35 !important;
          }
          [class*="countyCard"] p {
            font-size: 12px !important;
            line-height: 1.5 !important;
          }
          [class*="panel"] p {
            font-size: 15px !important;
            line-height: 1.55 !important;
            margin-bottom: 12px !important;
          }
          [class*="panel"] li {
            font-size: 14px !important;
            line-height: 1.45 !important;
            margin: 6px 0 !important;
          }
          [class*="panel"] h4 {
            font-size: 20px !important;
            margin: 10px 0 7px !important;
          }
          [class*="panel"] small {
            font-size: 12px !important;
            line-height: 1.45 !important;
          }
          [class*="marketStats"] span {
            font-size: 11px !important;
            line-height: 1.35 !important;
          }
          [class*="marketStats"] b,
          [class*="market"] a {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          [class*="railKicker"] {
            font-size: 12px !important;
          }
          [class*="brokerCard"] h3 {
            font-size: 16px !important;
          }
          [class*="contactLine"] {
            font-size: 14px !important;
            line-height: 1.45 !important;
          }
          [class*="inquiryCard"] input,
          [class*="inquiryCard"] textarea {
            font-size: 15px !important;
          }
          [class*="inquiryCard"] small {
            font-size: 12px !important;
            line-height: 1.45 !important;
          }
          [class*="appraisalCard"],
          [class*="financeCard"] {
            width: 100% !important;
          }
          [class*="appraisalCard"] > img {
            height: 280px !important;
            object-fit: cover !important;
          }
          [class*="appraisalCopy"] {
            padding: 20px 18px 22px !important;
          }
          [class*="financeCard"] {
            padding: 22px 18px !important;
          }
          [class*="appraisalCopy"] > span,
          [class*="financeCard"] > span {
            font-size: 12px !important;
            line-height: 1.35 !important;
          }
          [class*="appraisalCopy"] h3,
          [class*="financeCard"] h3 {
            font-size: 32px !important;
            line-height: 1.05 !important;
            margin: 8px 0 14px !important;
          }
          [class*="appraisalCopy"] p,
          [class*="financeCard"] p {
            font-size: 15px !important;
            line-height: 1.55 !important;
            margin-bottom: 16px !important;
          }
          [class*="appraisalCopy"] a,
          [class*="financeCard"] a {
            min-height: 54px !important;
            font-size: 14px !important;
          }
          [class*="appraisalCopy"] b {
            font-size: 13px !important;
            line-height: 1.45 !important;
            margin-top: 14px !important;
          }
          [class*="financeCard"] small {
            font-size: 13px !important;
            line-height: 1.5 !important;
            margin-top: 14px !important;
          }
          [class*="disclaimer"] {
            font-size: 13px !important;
            line-height: 1.5 !important;
            padding: 14px !important;
          }
        }
      `}</style>
    </>
  );
}
