from pathlib import Path
import re


CONTACT_HTML = Path("public/contact/index.html")
CSS_ASSET = '<link rel="stylesheet" href="/assets/contact-listing-context.css?v=1"/>'
JS_ASSET = '<script src="/assets/contact-listing-context.js?v=3" defer></script>'


def main() -> None:
    html = CONTACT_HTML.read_text(encoding="utf-8")
    original = html

    # Replace any earlier selected-license script version with the stabilized,
    # post-hydration version. Keep exactly one script tag.
    html = re.sub(
        r'<script\s+src="/assets/contact-listing-context\.js\?v=\d+"\s+defer></script>',
        JS_ASSET,
        html,
    )
    if JS_ASSET not in html:
        if "</head>" not in html:
            raise SystemExit("The static contact page has no closing head tag.")
        html = html.replace("</head>", f"{JS_ASSET}</head>", 1)

    if CSS_ASSET not in html:
        if "</head>" not in html:
            raise SystemExit("The static contact page has no closing head tag.")
        html = html.replace("</head>", f"{CSS_ASSET}</head>", 1)

    if html == original:
        print("Static contact page already contains the stabilized selected-license assets.")
        return

    CONTACT_HTML.write_text(html, encoding="utf-8")
    print("Embedded the stabilized selected-license context assets in the static contact page.")


if __name__ == "__main__":
    main()
