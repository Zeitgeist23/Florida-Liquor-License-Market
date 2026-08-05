# Official DBPR quota inventory

FLLM calculates county quota-license supply from DBPR's public retail alcoholic-beverage license CSV:

`https://www2.myfloridalicense.com/sto/file_download/extracts/bd4006lic.csv`

## Counting rules

- Count distinct license numbers by location county.
- Include full-liquor population-quota series `4COP`, `5COP`, `6COP`, `7COP`, and `8COP`.
- Include rows whose class modifier is blank (DBPR's quota representation) or explicitly `QUOTA`.
- Exclude specialty modifiers such as `SFS`, `S`, `SBX`, `SAL`, and other non-quota classifications.
- Report active/temporary, escrow, delinquent, and restricted/pending records separately.
- Treat the current DBPR extract total as existing inventory. DBPR states that this extract excludes null-and-void, revoked, and transferred records.

The result is cached for 12 hours. The existing daily Vercel cron at `/api/cron/update-listings` refreshes the calculation after DBPR's morning update.

## Public endpoint

- Statewide: `/api/quota-inventory`
- County name: `/api/quota-inventory?county=Broward`
- DBPR county code: `/api/quota-inventory?county=16`

Every county market page displays the official count and the DBPR source date. If DBPR is temporarily unavailable, the county page continues to load and displays a temporary-data notice.
