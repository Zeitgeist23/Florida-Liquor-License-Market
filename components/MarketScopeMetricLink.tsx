"use client";

type Props = {
  children: React.ReactNode;
  licenseType?: string;
  category?: string;
  ariaLabel: string;
};

export default function MarketScopeMetricLink({
  children,
  licenseType = "All",
  category = "All",
  ariaLabel,
}: Props) {
  function activate() {
    window.dispatchEvent(
      new CustomEvent("fllm-market-scope-filter", {
        detail: { licenseType, category },
      }),
    );
  }

  return (
    <button
      type="button"
      className="market-scope-metric-link"
      onClick={activate}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
