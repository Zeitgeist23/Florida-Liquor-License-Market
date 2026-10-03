# FLLM Market Intelligence Mission

## Mission

Florida Liquor License Market exists to build and maintain the most comprehensive historical market-intelligence database for Florida liquor licenses and licensed-business opportunities across all 67 Florida counties.

FLLM is a data-analytics platform at its core. The marketplace, brokerage, appraisal, financing, research, and transaction-resource functions are designed to feed, improve, interpret, or monetize the underlying market-intelligence asset.

## Core dataset

FLLM should preserve, where supportable and sourced:

- quota-license inventory observed for sale by county and license type
- asking prices, price changes, first-seen dates, last-seen dates, and market status
- county medians, means, standard deviation, quartiles, IQR, and market ranges
- documented closed-sale evidence
- documented consideration when supportable
- recorded financing tied to quota-license purchases or collateral
- private-lender, seller-financing, commercial-bank, credit-union, and SBA-related evidence
- lien releases and satisfactions when documented
- complete licensee / ownership / entity / address / status histories where supportable
- operator classification, including independent, regional chain, national chain, and big-box acquisitions where evidence supports the classification
- business outcome events associated with financed or transferred licenses, including continued operation, closure, resale, relocation, dissolution, bankruptcy, foreclosure, or reopening where documented
- business-package asking prices involving 4COP Quota, 3PS, 4COP SFS / SRX, and 2COP Beer & Wine licenses
- observable days on market, first-seen date, last-seen date, price changes, removals, withdrawals, and observed sale status for businesses for sale
- broker name, brokerage firm, source listing identifier, source publication date, and business category for each observed business opportunity when available
- legal entity identity and public legal / court / lien / bankruptcy / tax / administrative filings associated with observed businesses where supportable
- business-package revenue, SDE/cash flow, FF&E, and estimated license component when available
- provenance for every market observation

## Evidence separation

FLLM must keep these categories separate:

1. Asking price
2. Documented closed-sale consideration
3. Documented loan principal
4. FLLM estimated license value

One category must never be represented as another.

## Historical-record rule

Market observations are historical facts about what FLLM observed at a point in time. New data should append to the historical record rather than overwrite the prior market state.

## Ownership and portability

Supabase is FLLM's operational database, but it must never be the sole custodian of FLLM's historical market-intelligence asset.

FLLM maintains a portable independent archive under `data/market-intelligence/archives/`. Archives are exported in both JSON and CSV with a dated manifest. The export format is intentionally vendor-neutral so the dataset can be restored, analyzed, or migrated without dependence on Supabase.

The FLLM source repository also contains the archive/export logic and documentation necessary to reproduce the dataset structure.

## Archive cadence

- Scheduled archive: weekly
- Additional archive: before material schema changes or migrations
- Retention: permanent unless a record must be removed for a specific legal or data-quality reason
- Each archive contains a manifest with export time and row counts

## Long-term product goal

County pages and business-market pages should evolve into market dashboards showing, where sample size permits:

- current observed inventory
- median asking price
- low/high asking range
- standard deviation
- quartiles and IQR
- historical median trend
- inventory trend
- price reductions
- documented closed sales
- documented financing activity
- lender mix
- ownership concentration and large-chain acquisition activity
- broker and brokerage market activity, inventory counts, and observable days-on-market statistics
- legal-filing and business-outcome overlays for observed businesses for sale
- financing-to-outcome analysis and business survival intervals where the evidence permits
- time-on-market measures

The long-term FLLM asset is the historical dataset and the analytics built from it, not merely the current listings displayed on the website.
