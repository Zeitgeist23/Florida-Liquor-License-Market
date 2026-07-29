"use client";

import { useEffect } from "react";

import { ABT_LICENSE_SERIES_OPTIONS } from "@/data/abt-license-series-options";

type CheckboxDropdownConfig = {
  matches: string[];
  title: string;
  yesLabel: string;
  ariaLabel: string;
};

type EnhancedCheckboxField = {
  label: HTMLLabelElement;
  wrapper: HTMLDivElement;
  select: HTMLSelectElement;
  checkbox: HTMLInputElement;
  sync: () => void;
  handleSelectChange: () => void;
};

type EnhancedTextField = {
  label: HTMLLabelElement;
  wrapper: HTMLDivElement;
  select: HTMLSelectElement;
  input: HTMLInputElement;
  sync: () => void;
  handleSelectChange: () => void;
  handleInputChange: () => void;
};

const CHECKBOX_DROPDOWN_CONFIGS: CheckboxDropdownConfig[] = [
  {
    matches: ["increase in series"],
    title: "Increase in Series",
    yesLabel: "Yes — Increase the license series",
    ariaLabel: "Increase in Series",
  },
  {
    matches: [
      "change of officer stockholder amended corporate name",
      "change of officer stockholder member amended corporate name",
      "change officer stockholder amended corporate name",
    ],
    title: "Change of Officer, Stockholder, Member, or Corporate Name",
    yesLabel: "Yes — Change officer, stockholder, member, or corporate name",
    ariaLabel: "Change of Officer, Stockholder, Member, or Corporate Name",
  },
  {
    matches: ["pipes only", "pipes"],
    title: "Pipes Only",
    yesLabel: "Yes — Request a pipes-only retail tobacco permit",
    ariaLabel: "Pipes Only",
  },
  {
    matches: ["over the counter"],
    title: "Over the Counter",
    yesLabel: "Yes — Sell retail tobacco products over the counter",
    ariaLabel: "Over the Counter",
  },
  {
    matches: ["vending machine"],
    title: "Vending Machine",
    yesLabel: "Yes — Sell retail tobacco products through a vending machine",
    ariaLabel: "Vending Machine",
  },
];

const CHILD_LICENSE_SERIES = Array.from(
  new Set(ABT_LICENSE_SERIES_OPTIONS.map((option) => option.series))
);

function normalizedText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getCheckboxDropdownConfig(labelText: string) {
  const normalized = normalizedText(labelText);
  return CHECKBOX_DROPDOWN_CONFIGS.find((config) => config.matches.includes(normalized)) || null;
}

function setReactInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  if (setter) setter.call(input, value);
  else input.value = value;

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function createFieldWrapper(titleText: string, ariaLabel: string) {
  const wrapper = document.createElement("div");
  wrapper.className = "abt-field abt-checkbox-select";
  wrapper.dataset.abtGuidedSelect = "true";

  const heading = document.createElement("span");
  const title = document.createElement("strong");
  title.textContent = titleText;
  heading.appendChild(title);

  const select = document.createElement("select");
  select.setAttribute("aria-label", ariaLabel);
  wrapper.append(heading, select);

  return { wrapper, select };
}

function addOption(select: HTMLSelectElement, value: string, label: string) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  select.appendChild(option);
}

function ensureCurrentOption(select: HTMLSelectElement, value: string) {
  if (!value || Array.from(select.options).some((option) => option.value === value)) return;
  addOption(select, value, `${value} — Current saved value`);
}

function cleanOfficialYesNoOptionLabel(label: string) {
  const compact = label.trim().replace(/[_\s-]+/g, "");
  if (/^yes\d*$/i.test(compact)) return "Yes";
  if (/^no\d*$/i.test(compact)) return "No";
  return label;
}

function cleanOfficialDropdownOptionLabels() {
  document.querySelectorAll<HTMLOptionElement>(".abt-workspace select option").forEach((option) => {
    const currentLabel = option.textContent || "";
    const cleanedLabel = cleanOfficialYesNoOptionLabel(currentLabel);
    if (cleanedLabel !== currentLabel) option.textContent = cleanedLabel;
  });
}

export default function AbtIncreaseInSeriesSelect() {
  useEffect(() => {
    const enhancedCheckboxes = new Map<HTMLInputElement, EnhancedCheckboxField>();
    const enhancedTextFields = new Map<HTMLInputElement, EnhancedTextField>();
    let childLicenseField: EnhancedTextField | null = null;
    let childLicenseCountField: EnhancedTextField | null = null;

    function syncChildLicenseDependency() {
      if (!childLicenseField || !childLicenseCountField) return;

      const childRequested = childLicenseField.select.value !== "";
      childLicenseCountField.select.disabled = !childRequested;

      if (!childRequested && childLicenseCountField.input.value !== "") {
        setReactInputValue(childLicenseCountField.input, "");
      } else if (childRequested && childLicenseCountField.input.value === "") {
        setReactInputValue(childLicenseCountField.input, "1");
      }

      childLicenseCountField.sync();
    }

    function removeDisconnectedFields() {
      enhancedCheckboxes.forEach((field, checkbox) => {
        if (checkbox.isConnected && field.label.isConnected) return;
        field.wrapper.remove();
        enhancedCheckboxes.delete(checkbox);
      });

      enhancedTextFields.forEach((field, input) => {
        if (input.isConnected && field.label.isConnected) return;
        field.wrapper.remove();
        enhancedTextFields.delete(input);
        if (childLicenseField === field) childLicenseField = null;
        if (childLicenseCountField === field) childLicenseCountField = null;
      });
    }

    function enhanceCheckboxFields() {
      document.querySelectorAll<HTMLLabelElement>("label.abt-checkbox-field").forEach((label) => {
        const strong = label.querySelector("strong");
        const config = getCheckboxDropdownConfig(strong?.textContent || "");
        if (!config) return;

        const checkbox = label.querySelector<HTMLInputElement>('input[type="checkbox"]');
        if (!checkbox) return;

        const existing = enhancedCheckboxes.get(checkbox);
        if (existing) {
          existing.sync();
          return;
        }

        const { wrapper, select } = createFieldWrapper(config.title, config.ariaLabel);
        addOption(select, "no", "No");
        addOption(select, "yes", config.yesLabel);

        const sync = () => {
          select.value = checkbox.checked ? "yes" : "no";
        };

        const handleSelectChange = () => {
          const shouldBeChecked = select.value === "yes";
          if (checkbox.checked !== shouldBeChecked) checkbox.click();
          window.requestAnimationFrame(sync);
        };

        select.addEventListener("change", handleSelectChange);
        checkbox.addEventListener("change", sync);

        label.style.display = "none";
        label.insertAdjacentElement("afterend", wrapper);
        enhancedCheckboxes.set(checkbox, { label, wrapper, select, checkbox, sync, handleSelectChange });
        sync();
      });
    }

    function enhanceChildLicenseField(label: HTMLLabelElement, input: HTMLInputElement) {
      if (enhancedTextFields.has(input)) return;

      const { wrapper, select } = createFieldWrapper("Child License Requested", "Child License Requested");
      addOption(select, "", "No child license requested");
      CHILD_LICENSE_SERIES.forEach((series) => addOption(select, series, series));

      const sync = () => {
        ensureCurrentOption(select, input.value);
        select.value = input.value;
      };

      const handleSelectChange = () => {
        setReactInputValue(input, select.value);
        window.requestAnimationFrame(() => {
          sync();
          syncChildLicenseDependency();
        });
      };

      const handleInputChange = () => {
        sync();
        syncChildLicenseDependency();
      };

      select.addEventListener("change", handleSelectChange);
      input.addEventListener("input", handleInputChange);
      input.addEventListener("change", handleInputChange);

      label.style.display = "none";
      label.insertAdjacentElement("afterend", wrapper);
      const enhanced = { label, wrapper, select, input, sync, handleSelectChange, handleInputChange };
      enhancedTextFields.set(input, enhanced);
      childLicenseField = enhanced;
      sync();
    }

    function enhanceChildLicenseCountField(label: HTMLLabelElement, input: HTMLInputElement) {
      if (enhancedTextFields.has(input)) return;

      const { wrapper, select } = createFieldWrapper(
        "Number of Child Licenses Requested",
        "Number of Child Licenses Requested"
      );
      addOption(select, "", "Not applicable");
      for (let count = 1; count <= 50; count += 1) addOption(select, String(count), String(count));

      const sync = () => {
        ensureCurrentOption(select, input.value);
        select.value = input.value;
      };

      const handleSelectChange = () => {
        setReactInputValue(input, select.value);
        window.requestAnimationFrame(sync);
      };

      const handleInputChange = sync;
      select.addEventListener("change", handleSelectChange);
      input.addEventListener("input", handleInputChange);
      input.addEventListener("change", handleInputChange);

      label.style.display = "none";
      label.insertAdjacentElement("afterend", wrapper);
      const enhanced = { label, wrapper, select, input, sync, handleSelectChange, handleInputChange };
      enhancedTextFields.set(input, enhanced);
      childLicenseCountField = enhanced;
      sync();
    }

    function enhanceTextFields() {
      document.querySelectorAll<HTMLLabelElement>("label.abt-field:not(.abt-checkbox-field)").forEach((label) => {
        const strong = label.querySelector("strong");
        const normalized = normalizedText(strong?.textContent || "");
        const input = label.querySelector<HTMLInputElement>('input:not([type="checkbox"])');
        if (!input) return;

        if (normalized === "child license requested") {
          enhanceChildLicenseField(label, input);
        } else if (normalized === "number of child licenses requested") {
          enhanceChildLicenseCountField(label, input);
        }
      });
    }

    function enhanceFields() {
      removeDisconnectedFields();
      enhanceCheckboxFields();
      enhanceTextFields();
      syncChildLicenseDependency();
      cleanOfficialDropdownOptionLabels();
    }

    enhanceFields();
    const observer = new MutationObserver(enhanceFields);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();

      enhancedCheckboxes.forEach((field) => {
        field.select.removeEventListener("change", field.handleSelectChange);
        field.checkbox.removeEventListener("change", field.sync);
        field.label.style.removeProperty("display");
        field.wrapper.remove();
      });
      enhancedCheckboxes.clear();

      enhancedTextFields.forEach((field) => {
        field.select.removeEventListener("change", field.handleSelectChange);
        field.input.removeEventListener("input", field.handleInputChange);
        field.input.removeEventListener("change", field.handleInputChange);
        field.label.style.removeProperty("display");
        field.wrapper.remove();
      });
      enhancedTextFields.clear();
    };
  }, []);

  return null;
}
