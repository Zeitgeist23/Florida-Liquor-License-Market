"use client";

import { useEffect } from "react";

const validPriceRanges = new Set(["under150", "150to350", "350to500", "500to1m", "over1m"]);
const validLicenseTypes = new Set(["4COP Quota", "3PS Quota / Package Store"]);
const validStatuses = new Set(["available", "sold"]);

function setSelectValue(select: HTMLSelectElement, value: string) {
  const hasOption = Array.from(select.options).some((option) => option.value === value);
  if (!hasOption) return;

  const valueSetter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
  if (valueSetter) valueSetter.call(select, value);
  else select.value = value;

  select.dispatchEvent(new Event("input", { bubbles: true }));
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

export default function ListingsQueryFilterEnhancement() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCounty = params.get("county");
    const requestedType = params.get("type");
    const requestedPrice = params.get("price");
    const requestedStatus = params.get("status");

    if (!requestedCounty && !requestedType && !requestedPrice && !requestedStatus) return;

    const form = document.querySelector(".results-filters");
    if (!(form instanceof HTMLFormElement)) return;

    const labels = Array.from(form.querySelectorAll("label"));
    const selectFor = (labelName: string) => {
      const label = labels.find((candidate) => (candidate.querySelector("span")?.textContent || "").trim() === labelName);
      const select = label?.querySelector("select");
      return select instanceof HTMLSelectElement ? select : null;
    };

    const countySelect = selectFor("County");
    const typeSelect = selectFor("License Type");
    const priceSelect = selectFor("Price Range");
    const statusSelect = selectFor("Status");

    if (requestedCounty && countySelect) setSelectValue(countySelect, requestedCounty);
    if (requestedType && validLicenseTypes.has(requestedType) && typeSelect) setSelectValue(typeSelect, requestedType);
    if (requestedPrice && validPriceRanges.has(requestedPrice) && priceSelect) setSelectValue(priceSelect, requestedPrice);
    if (requestedStatus && validStatuses.has(requestedStatus) && statusSelect) setSelectValue(statusSelect, requestedStatus);
  }, []);

  return null;
}
