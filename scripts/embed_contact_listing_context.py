from pathlib import Path


CONTACT_HTML = Path("public/contact/index.html")
ASSETS = '<link rel="stylesheet" href="/assets/contact-listing-context.css?v=1"/><script src="/assets/contact-listing-context.js?v=2" defer></script>'


def main() -> None:
    html = CONTACT_HTML.read_text(encoding="utf-8")

    if "contact-listing-context.js?v=2" in html and "contact-listing-context.css?v=1" in html:
        print("Static contact page already contains the selected-license assets.")
        return

    html = html.replace(
        '<script src="/assets/contact-listing-context.js?v=1" defer></script>',
        '<script src="/assets/contact-listing-context.js?v=2" defer></script>',
    )

    if "contact-listing-context.css?v=1" not in html:
        if "</head>" not in html:
            raise SystemExit("The static contact page has no closing head tag.")
        html = html.replace("</head>", f"{ASSETS}</head>", 1)
    elif "contact-listing-context.js?v=2" not in html:
        html = html.replace("</head>", '<script src="/assets/contact-listing-context.js?v=2" defer></script></head>', 1)

    CONTACT_HTML.write_text(html, encoding="utf-8")
    print("Embedded the selected-license context assets in the static contact page.")


if __name__ == "__main__":
    main()
