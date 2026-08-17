from pathlib import Path


PAGE = Path("app/listings/[slug]/page.tsx")


def main() -> None:
    text = PAGE.read_text(encoding="utf-8")
    old = '  const inquiryHref = `/contact?listing=${encodeURIComponent(`${selected.county} ${selected.type}`)}&ref=${encodeURIComponent(selectedReference)}`;\n'
    new = '''  const inquiryParams = new URLSearchParams({
    source: "specific-license",
    listing: `${selectedReference} — ${selected.county} — ${selected.type} — ${selected.priceLabel}`,
    ref: selectedReference,
    county: selected.county,
    license_type: selected.type,
    asking_price: selected.priceLabel,
    listing_status: statusLabel,
    listing_url: canonicalPath,
  });
  const inquiryHref = `/contact?${inquiryParams.toString()}`;
'''

    if new in text:
        print("Specific-license inquiry parameters are already present.")
        return
    if old not in text:
        raise SystemExit("Could not find the current inquiryHref line.")

    PAGE.write_text(text.replace(old, new, 1), encoding="utf-8")
    print("Added complete selected-license context to the inquiry URL.")


if __name__ == "__main__":
    main()
