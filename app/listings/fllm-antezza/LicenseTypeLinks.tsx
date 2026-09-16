"use client";

import { useEffect } from "react";

const FOUR_COP_HREF = "/license-types/4cop-quota";
const THREE_PS_HREF = "/license-types/3ps-package-store";

function buildLicenseLink(text: string) {
  const isThreePs = /^3PS/i.test(text);
  const link = document.createElement("a");
  link.className = `antezza-license-type-link ${isThreePs ? "antezza-license-type-link--3ps" : "antezza-license-type-link--4cop"}`;
  link.href = isThreePs ? THREE_PS_HREF : FOUR_COP_HREF;
  link.textContent = text;
  link.setAttribute(
    "aria-label",
    isThreePs
      ? "Learn about Florida 3PS Quota licenses"
      : "Learn about Florida 4COP Quota licenses",
  );
  return link;
}

function replaceTextNode(node: Text) {
  const value = node.textContent ?? "";
  const pattern = /(4COP\s+[Qq]uota|3PS\s+Quota)/g;
  if (!pattern.test(value)) return;
  pattern.lastIndex = 0;

  const fragment = document.createDocumentFragment();
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value))) {
    if (match.index > cursor) {
      fragment.appendChild(document.createTextNode(value.slice(cursor, match.index)));
    }
    fragment.appendChild(buildLicenseLink(match[0]));
    cursor = match.index + match[0].length;
  }

  if (cursor < value.length) {
    fragment.appendChild(document.createTextNode(value.slice(cursor)));
  }

  node.parentNode?.replaceChild(fragment, node);
}

function replaceSplitHeading(element: HTMLElement | null, suffixPattern: RegExp) {
  if (!element || element.querySelector(".antezza-license-type-link")) return;
  const text = (element.textContent ?? "").trim();
  if (!/^4COP\s+Quota\b/i.test(text)) return;

  const suffix = text.replace(/^4COP\s+Quota\s*/i, "");
  if (!suffixPattern.test(suffix)) return;

  element.replaceChildren(
    buildLicenseLink("4COP Quota"),
    document.createTextNode(suffix ? ` ${suffix}` : ""),
  );
}

function installLicenseTypeLinks() {
  const root = document.querySelector<HTMLElement>(
    '.results-page[data-featured-broker-listing="FLLM-ANTEZZA"]',
  );
  if (!root) return;

  replaceSplitHeading(
    root.querySelector<HTMLElement>(".marketplace-listing-title-type"),
    /^Liquor License$/i,
  );
  replaceSplitHeading(
    root.querySelector<HTMLElement>(".marketplace-listing-heading h2"),
    /^in\s+Pinellas County$/i,
  );

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (
        parent.closest(
          "a,script,style,textarea,button,.antezza-license-type-link,.sunshineagle-disclosure-link",
        )
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return /(4COP\s+[Qq]uota|3PS\s+Quota)/.test(node.textContent ?? "")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  nodes.forEach(replaceTextNode);
}

export default function LicenseTypeLinks() {
  useEffect(() => {
    installLicenseTypeLinks();
  }, []);

  return null;
}
