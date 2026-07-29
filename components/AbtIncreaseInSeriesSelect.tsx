"use client";

import { useEffect } from "react";

type EnhancedField = {
  label: HTMLLabelElement;
  wrapper: HTMLDivElement;
  select: HTMLSelectElement;
  checkbox: HTMLInputElement;
  sync: () => void;
};

function normalizedText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default function AbtIncreaseInSeriesSelect() {
  useEffect(() => {
    const enhanced = new Map<HTMLInputElement, EnhancedField>();

    function removeDisconnectedFields() {
      enhanced.forEach((field, checkbox) => {
        if (checkbox.isConnected && field.label.isConnected) return;
        field.wrapper.remove();
        enhanced.delete(checkbox);
      });
    }

    function enhanceFields() {
      removeDisconnectedFields();

      document.querySelectorAll<HTMLLabelElement>("label.abt-checkbox-field").forEach((label) => {
        const strong = label.querySelector("strong");
        if (normalizedText(strong?.textContent || "") !== "increase in series") return;

        const checkbox = label.querySelector<HTMLInputElement>('input[type="checkbox"]');
        if (!checkbox) return;

        const existing = enhanced.get(checkbox);
        if (existing) {
          existing.sync();
          return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "abt-field abt-increase-series-select";
        wrapper.dataset.abtIncreaseSeriesSelect = "true";

        const heading = document.createElement("span");
        const title = document.createElement("strong");
        title.textContent = "Increase in Series";
        heading.appendChild(title);

        const select = document.createElement("select");
        select.setAttribute("aria-label", "Increase in Series");
        select.innerHTML = [
          '<option value="no">No</option>',
          '<option value="yes">Yes — Increase the license series</option>',
        ].join("");

        const sync = () => {
          select.value = checkbox.checked ? "yes" : "no";
        };

        select.addEventListener("change", () => {
          const shouldBeChecked = select.value === "yes";
          if (checkbox.checked !== shouldBeChecked) checkbox.click();
          window.requestAnimationFrame(sync);
        });
        checkbox.addEventListener("change", sync);

        wrapper.append(heading, select);
        label.style.display = "none";
        label.insertAdjacentElement("afterend", wrapper);
        enhanced.set(checkbox, { label, wrapper, select, checkbox, sync });
        sync();
      });
    }

    enhanceFields();
    const observer = new MutationObserver(enhanceFields);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      enhanced.forEach((field) => {
        field.checkbox.removeEventListener("change", field.sync);
        field.label.style.removeProperty("display");
        field.wrapper.remove();
      });
      enhanced.clear();
    };
  }, []);

  return null;
}
