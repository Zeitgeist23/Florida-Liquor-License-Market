"use client";

import { useEffect } from "react";

const FOUR_COP_HREF = "/license-types/4cop-quota";
const THREE_PS_HREF = "/license-types/3ps-package-store";

function buildLicenseLink(text: string, type: "4cop" | "3ps") {
  const link = document.createElement("a");
  link.className = `antezza-license-type-link antezza-license-type-link--${type}`;
  link.href = type === "3ps" ? THREE_PS_HREF : FOUR_COP_HREF;
  link.textContent = text;
  link.setAttribute(
    "aria-label",
    type === "3ps"
      ? "Learn about Florida 3PS Quota licenses"
      : "Learn about Florida 4COP Quota licenses",
  );
  return link;
}

function installChangeOfSeriesLinks() {
  const root = document.querySelector<HTMLElement>(
    '.results-page[data-featured-broker-listing="FLLM-ANTEZZA"]',
  );
  if (!root) return;

  const paragraph = Array.from(
    root.querySelectorAll<HTMLParagraphElement>(".marketplace-listing-section p"),
  ).find((entry) =>
    (entry.textContent ?? "").includes(
      "A Florida quota license may generally be changed between the 3PS Quota series and the 4COP Quota series",
    ),
  );

  if (!paragraph || paragraph.querySelector(".antezza-license-type-link")) return;

  const source = paragraph.textContent ?? "";
  const pattern = /(4COP\s+Quota|3PS\s+Quota)/g;
  const fragment = document.createDocumentFragment();
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source))) {
    if (match.index > cursor) {
      fragment.appendChild(document.createTextNode(source.slice(cursor, match.index)));
    }

    const isThreePs = /^3PS/i.test(match[0]);
    fragment.appendChild(
      buildLicenseLink(match[0], isThreePs ? "3ps" : "4cop"),
    );
    cursor = match.index + match[0].length;
  }

  if (cursor < source.length) {
    fragment.appendChild(document.createTextNode(source.slice(cursor)));
  }

  paragraph.replaceChildren(fragment);
}

export default function LicenseTypeLinks() {
  useEffect(() => {
    installChangeOfSeriesLinks();
  }, []);

  return null;
}
