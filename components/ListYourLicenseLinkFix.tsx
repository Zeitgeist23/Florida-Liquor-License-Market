"use client";

import { useEffect } from "react";

const TARGET_PATH = "/sell-your-license";

export default function ListYourLicenseLinkFix() {
  useEffect(() => {
    const updateLinks = () => {
      document
        .querySelectorAll<HTMLAnchorElement>('a[href="#sell"]')
        .forEach((link) => {
          const label = link.textContent?.trim().toLowerCase() ?? "";
          if (label.includes("sell") || label.includes("list your license")) {
            link.setAttribute("href", TARGET_PATH);
          }
        });
    };

    updateLinks();

    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["href"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
