"use client";

import { useEffect } from "react";

const internalResourceRoutes: Array<[string, string]> = [
  ["https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/", "/resources/official/florida-abt"],
  ["https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=13356&clientCode=4008&xactCode=1060", "/resources/official/transfer-of-ownership"],
  ["https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/", "/resources/official/quota-license-information"],
  ["https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.20.html", "/resources/official/statute-561-20"],
  ["https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.32.html", "/resources/official/statute-561-32"],
  ["https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.15.html", "/resources/official/statute-561-15"],
];

export default function BuyerGuideInternalResourceLinks() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLAnchorElement>(".buy-guide-official a");
    if (!cards.length) return;

    for (const card of cards) {
      const currentHref = card.getAttribute("href") ?? "";
      const match = internalResourceRoutes.find(([external]) => currentHref === external);
      if (!match) continue;
      card.setAttribute("href", match[1]);
      card.removeAttribute("target");
      card.removeAttribute("rel");
    }
  }, []);

  return null;
}
