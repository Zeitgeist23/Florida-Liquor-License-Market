# Florida Liquor License Search Sources

Last verified: July 24, 2026

This document is the human-readable companion to `data/florida-liquor-license-search-sources.json`. It records the public sources used to discover, compare, and verify Florida liquor licenses offered for sale.

## Primary listing marketplaces

1. **BizBuySell**  
   Main use: individual Florida liquor-license asset listings and county-level result pages.  
   Search: `https://www.bizbuysell.com/florida/liquor-store-business-assets-for-sale/`

2. **BizQuest**  
   Main use: individual 4COP/3PS asset listings and statewide Florida asset-sale pages.  
   Search: `https://www.bizquest.com/liquor-stores-asset-sales-in-florida/`

3. **LiquorLicense.com**  
   Main use: county-by-county Florida 4COP/3PS inventory.  
   Search: `https://www.liquorlicense.com/florida/types/4cop-3ps`

4. **Liquor License Marketplace**  
   Main use: secondary specialty inventory search. This inventory appears to overlap substantially with LiquorLicense.com and should be treated as a likely syndicated source.  
   Search: `https://liquorlicensemarketplace.com/florida/types/4cop-3ps/`

5. **Liquor License Auctioneers**  
   Main use: Florida auction and fixed-price 4COP/3PS listings. Confirm whether advertised prices include auction fees.  
   Search: `https://liquorlicenseauctioneers.com/florida/types/4cop-3ps`

6. **Florida Liquor License Sales**  
   Main use: Florida county listing pages and broker inventory.  
   Search: `https://www.floridaliquorlicensesales.com/florida`

7. **BusinessesForSale.com**  
   Main use: supplemental business-marketplace listings.  
   Search: `https://us.businessesforsale.com/us/search/liquor-licenses-for-sale-in-florida`

## Supplemental broker and inquiry sources

8. **FloridaLiquorLicenses.com / Florida Business Investments**  
   Main use: buyer and seller inquiry source; public inventory may not be fully itemized.  
   Site: `https://floridaliquorlicenses.com/`

9. **Liquor License FL**  
   Main use: Florida availability monitoring and broker inquiry. Listings may also be syndicated to BizBuySell or BizQuest.  
   Site: `https://www.liquorlicensefl.com/buy.php`

## Official verification sources

10. **Florida DBPR Division of Alcoholic Beverages and Tobacco — Research License Data**  
    Main use: verify license number, county, series, holder, status, and other licensing information. This is not a sale marketplace.  
    Site: `https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/research-license-data/`

11. **Florida DBPR Division of Alcoholic Beverages and Tobacco — Public Records Downloads**  
    Main use: statewide market research and verification using official licensee files and daily activity reports.  
    Site: `https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/public-records/`

## General discovery channels

12. **Google Search**  
    Suggested searches:  
    - `Florida 4COP 3PS liquor license for sale`  
    - `site:bizbuysell.com Florida 4COP liquor license`  
    - `site:bizquest.com Florida quota liquor license`  
    - `"4COP/3PS" "County" Florida`

13. **Bing Search**  
    Use the same search patterns as Google because each engine indexes some listings that the other may miss.

14. **FloridaLiquorLicenseMarket.com seller submissions**  
    Main use: first-party listings submitted directly through the website.  
    Page: `https://www.floridaliquorlicensemarket.com/list-your-license`

## Review and deduplication rules

- Never treat county, license type, and price as a sufficient unique identifier.
- Prefer the source's stable listing ID or canonical URL.
- Compare the county, license type, seller or broker, asking price, wording, and license number when available.
- Assume a high duplicate risk between BizBuySell, BizQuest, LiquorLicense.com, Liquor License Marketplace, and broker-owned websites.
- A changed asking price may represent a repriced existing listing rather than a new license.
- Confirm that the listing is still active, available, and not under contract or in escrow before publication.
- Use DBPR records to verify the underlying license whenever a license number or holder name is available.
- Do not scrape restricted third-party sites without permission. Only use automated feeds or APIs that authorize retrieval and republication.

## Suggested review order

1. BizBuySell
2. BizQuest
3. LiquorLicense.com
4. Liquor License Auctioneers
5. Florida Liquor License Sales
6. BusinessesForSale.com
7. Supplemental broker sites
8. Google and Bing discovery searches
9. DBPR verification
10. First-party seller submissions
