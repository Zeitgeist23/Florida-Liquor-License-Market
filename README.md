# Florida Liquor License Market — Release 1

Static lead-generation website for FloridaLiquorLicenseMarket.com.

## What works
- Responsive homepage and mobile navigation
- Buyer, seller, financing and professional inquiry paths
- Inquiry form opens a prefilled email addressed to JWigg023@gmail.com
- SEO title and description
- Legal and privacy disclosures

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. In GitHub: Settings → Pages → Deploy from a branch → `main` / root.
4. GitHub will provide a temporary website address.

## Connect the GoDaddy domain
After the GitHub Pages site is live, add `FloridaLiquorLicenseMarket.com` under the repository Pages settings. GitHub will provide the DNS records to enter in GoDaddy.

## Form limitation
Release 1 uses a `mailto:` form, so the visitor's email app opens with a prepared message. A later release can connect Formspree, Basin, Netlify Forms, or a custom server endpoint so submissions are sent without opening an email app.
