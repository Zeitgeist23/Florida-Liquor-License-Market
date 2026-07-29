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

type EnhancedYesNoQuestion = {
  label: HTMLLabelElement;
  noLabel: HTMLLabelElement | null;
  wrapper: HTMLDivElement;
  yesCheckbox: HTMLInputElement;
  noCheckbox: HTMLInputElement | null;
  yesRadio: HTMLInputElement;
  noRadio: HTMLInputElement;
  sync: () => void;
  handleRadioChange: () => void;
  handleCheckboxChange: () => void;
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

const PENDING_NO_CHOICE_KEY = "fllm-abt6002-pending-no-choice";

function normalizedText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getCheckboxDropdownConfig(labelText: string) {
  const normalized = normalizedText(labelText);
  return CHECKBOX_DROPDOWN_CONFIGS.find((config) => config.matches.includes(normalized)) || null;
}

function isAbt6002Workspace() {
  return window.location.pathname.toLowerCase().includes("/resources/forms/abt-6002");
}

function isStandaloneNo(labelText: string) {
  return normalizedText(labelText) === "no";
}

function isLikelyYesNoQuestion(labelText: string) {
  const normalized = normalizedText(labelText);
  if (!normalized || normalized === "yes" || normalized === "no") return false;
  if (getCheckboxDropdownConfig(labelText)) return false;

  const questionSignals = [
    "if yes",
    "yes no",
    "have you",
    "has the",
    "has applicant",
    "has any",
    "is the",
    "is this",
    "are you",
    "does the",
    "did the",
    "was the",
    "were you",
    "been convicted",
    "convicted of",
    "revocation proceedings",
    "personal relationship",
    "application is for",
    "have any interest",
    "have you ever",
  ];

  return questionSignals.some((signal) => normalized.includes(signal));
}

function setReactInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  if (setter) setter.call(input, value);
  else input.value = value;

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function setReactCheckboxValue(checkbox: HTMLInputElement, checked: boolean) {
  if (checkbox.checked === checked) return;
  checkbox.click();
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

function createYesNoQuestionWrapper(questionText: string, groupName: string) {
  const wrapper = document.createElement("div");
  wrapper.className = "abt-field abt-yes-no-question";
  wrapper.dataset.abtYesNoQuestion = "true";
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", questionText);
  wrapper.style.gridColumn = "1 / -1";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "16px";

  const heading = document.createElement("span");
  const title = document.createElement("strong");
  title.textContent = questionText;
  heading.appendChild(title);

  const options = document.createElement("div");
  options.style.display = "flex";
  options.style.alignItems = "center";
  options.style.gap = "32px";
  options.style.flexWrap = "wrap";

  const yesOption = document.createElement("label");
  yesOption.style.display = "inline-flex";
  yesOption.style.alignItems = "center";
  yesOption.style.gap = "9px";
  yesOption.style.cursor = "pointer";

  const yesRadio = document.createElement("input");
  yesRadio.type = "radio";
  yesRadio.name = groupName;
  yesRadio.value = "yes";
  yesRadio.setAttribute("aria-label", "Yes");
  const yesText = document.createElement("strong");
  yesText.textContent = "Yes";
  yesOption.append(yesRadio, yesText);

  const noOption = document.createElement("label");
  noOption.style.display = "inline-flex";
  noOption.style.alignItems = "center";
  noOption.style.gap = "9px";
  noOption.style.cursor = "pointer";

  const noRadio = document.createElement("input");
  noRadio.type = "radio";
  noRadio.name = groupName;
  noRadio.value = "no";
  noRadio.setAttribute("aria-label", "No");
  const noText = document.createElement("strong");
  noText.textContent = "No";
  noOption.append(noRadio, noText);

  options.append(yesOption, noOption);
  wrapper.append(heading, options);

  return { wrapper, yesRadio, noRadio };
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
    const enhancedYesNoQuestions = new Map<HTMLInputElement, EnhancedYesNoQuestion>();
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

      enhancedYesNoQuestions.forEach((field, checkbox) => {
        if (checkbox.isConnected && field.label.isConnected) return;
        field.wrapper.remove();
        enhancedYesNoQuestions.delete(checkbox);
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
          setReactCheckboxValue(checkbox, shouldBeChecked);
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

    function enhanceYesNoQuestionFields() {
      if (!isAbt6002Workspace()) return;

      const labels = Array.from(document.querySelectorAll<HTMLLabelElement>("label.abt-checkbox-field"));

      labels.forEach((label, index) => {
        if (!label.isConnected || label.style.display === "none") return;

        const strong = label.querySelector("strong");
        const questionText = (strong?.textContent || "").trim();
        if (!questionText || getCheckboxDropdownConfig(questionText) || isStandaloneNo(questionText)) return;

        const yesCheckbox = label.querySelector<HTMLInputElement>('input[type="checkbox"]');
        if (!yesCheckbox) return;

        const existing = enhancedYesNoQuestions.get(yesCheckbox);
        if (existing) {
          existing.sync();
          return;
        }

        const nextLabel = labels[index + 1] || null;
        const nextText = (nextLabel?.querySelector("strong")?.textContent || "").trim();
        const nextNoCheckbox = nextLabel && isStandaloneNo(nextText)
          ? nextLabel.querySelector<HTMLInputElement>('input[type="checkbox"]')
          : null;

        if (!nextNoCheckbox && !isLikelyYesNoQuestion(questionText)) return;

        const groupName = `abt-yes-no-${normalizedText(questionText).slice(0, 50)}-${index}`;
        const { wrapper, yesRadio, noRadio } = createYesNoQuestionWrapper(questionText, groupName);
        const noLabel = nextNoCheckbox ? nextLabel : null;

        const sync = () => {
          if (yesCheckbox.checked) {
            yesRadio.checked = true;
            noRadio.checked = false;
          } else if (nextNoCheckbox?.checked) {
            yesRadio.checked = false;
            noRadio.checked = true;
          } else {
            yesRadio.checked = false;
            noRadio.checked = false;
          }
        };

        const handleRadioChange = () => {
          if (yesRadio.checked) {
            setReactCheckboxValue(yesCheckbox, true);
            if (nextNoCheckbox) setReactCheckboxValue(nextNoCheckbox, false);
            sessionStorage.setItem(PENDING_NO_CHOICE_KEY, "yes");
          } else if (noRadio.checked) {
            setReactCheckboxValue(yesCheckbox, false);
            if (nextNoCheckbox) setReactCheckboxValue(nextNoCheckbox, true);
            sessionStorage.setItem(PENDING_NO_CHOICE_KEY, "no");
          }
          window.requestAnimationFrame(sync);
        };

        const handleCheckboxChange = sync;
        yesRadio.addEventListener("change", handleRadioChange);
        noRadio.addEventListener("change", handleRadioChange);
        yesCheckbox.addEventListener("change", handleCheckboxChange);
        nextNoCheckbox?.addEventListener("change", handleCheckboxChange);

        label.style.display = "none";
        if (noLabel) noLabel.style.display = "none";
        label.insertAdjacentElement("afterend", wrapper);

        enhancedYesNoQuestions.set(yesCheckbox, {
          label,
          noLabel,
          wrapper,
          yesCheckbox,
          noCheckbox: nextNoCheckbox,
          yesRadio,
          noRadio,
          sync,
          handleRadioChange,
          handleCheckboxChange,
        });
        sync();
      });

      const firstVisibleCheckboxLabel = labels.find((label) => label.isConnected && label.style.display !== "none");
      const firstVisibleText = (firstVisibleCheckboxLabel?.querySelector("strong")?.textContent || "").trim();
      if (firstVisibleCheckboxLabel && isStandaloneNo(firstVisibleText)) {
        const noCheckbox = firstVisibleCheckboxLabel.querySelector<HTMLInputElement>('input[type="checkbox"]');
        const pendingChoice = sessionStorage.getItem(PENDING_NO_CHOICE_KEY);
        if (noCheckbox && pendingChoice) {
          setReactCheckboxValue(noCheckbox, pendingChoice === "no");
          firstVisibleCheckboxLabel.style.display = "none";
          sessionStorage.removeItem(PENDING_NO_CHOICE_KEY);
        }
      }
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
      enhanceYesNoQuestionFields();
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

      enhancedYesNoQuestions.forEach((field) => {
        field.yesRadio.removeEventListener("change", field.handleRadioChange);
        field.noRadio.removeEventListener("change", field.handleRadioChange);
        field.yesCheckbox.removeEventListener("change", field.handleCheckboxChange);
        field.noCheckbox?.removeEventListener("change", field.handleCheckboxChange);
        field.label.style.removeProperty("display");
        field.noLabel?.style.removeProperty("display");
        field.wrapper.remove();
      });
      enhancedYesNoQuestions.clear();
    };
  }, []);

  return null;
}
