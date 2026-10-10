# Verification report

Verified on 10 October 2026. These checks were run against the delivered source files. No live hosting deployment was performed.

## Executed checks

- **44 / 44 automated core tests passed.** Exact test names and outcomes are in `tests/test-results.json`.
- All 12 shared JavaScript files passed `node --check` syntax validation.
- All 39 requested module HTML files, entry/login pages and the digital sample are present.
- Every literal local `src`/`href` target in the HTML files resolves to an existing file.
- Literal delegated UI action names have corresponding handlers.
- Root login pages preserve the empty relative root, while internal module pages use `../`.
- Seeded data contains approximately 6,797 linked records and 1,587,386 bytes of JSON under the tested date and default rules. Its conservative character budget leaves room for edits.
- Seeded physical-copy loans have valid related records, no overlapping loans, no loan before copy acquisition/member registration, consistent dates and no double-active issue.
- Financial records have nonnegative balances; paid/waived records have no outstanding balance.
- CSV was parsed with Python's CSV parser; Bengali text, quoted commas and formula neutralization were checked.
- XLSX was opened with `openpyxl`; Bengali text, numeric cell type/value, escaped XML text and frozen header were checked. It is a ZIP-based OOXML workbook, not a renamed CSV.
- Source scanning found no `eval()`, `new Function()`, `fetch()` or XMLHttpRequest usage. SQL simulator tests confirmed that both SELECT-like and destructive-looking example strings leave the application snapshot unchanged.

## Core workflow coverage

The executable tests cover:

- Seed referential integrity, physical-copy ownership and quota budget.
- Member registration, duplicate email rejection, suspended/expired membership and membership renewal.
- Issue, duplicate issue rejection, renewal, renewal-limit rejection, return and duplicate-return rejection.
- Reservation duplicate checks, hold allocation, holder-only issue, fulfillment and expiry/release.
- Active-loan deletion/archive protections.
- Overdue return accrual, one overdue fine per loan, partial/full payment, overpayment rejection, receipt creation and reasoned waiver.
- Damaged returns staying unavailable.
- Partial/final acquisition receipt, duplicate receipt rejection, proposed-title creation and derived expenditure.
- Purchase-order workflow and exactly one linked acquisition per line.
- Overlapping and over-capacity room bookings, adjacent slots and cancellation/rebooking.
- Event registration, duplicate attendee rejection and attendance marking.
- Stock adjustments, movement history and negative-stock rejection.
- Referenced category/author deletion protection and shelf-capacity protection.
- Metadata edits for issued copies without releasing their managed status.
- Digital bookmarks/read history and subscription renewal expenditure.
- Stale-tab revision detection, reload persistence and storage-limit rollback.
- Temporary/remembered simulated sessions and invalid credentials.
- Dashboard/report template generation, schema form generation and derived row generation.
- Namespace-scoped reset preserving unrelated storage.
- CSV and XLSX artifact generation.

## How maintainers can rerun the core tests

This is optional. Node is only a development test runner, not an application runtime dependency.

```sh
node tests/core.test.cjs
```

The test runner uses an isolated in-memory browser-storage substitute and Node's VM. It does not use, erase or modify your real browser's LocalStorage. It regenerates the test-results JSON and small export-check files.

## Checks NOT executed here

The environment did not expose the supported browser-control capability. Therefore no interactive browser session, automated click-through, screenshot review or browser console capture was performed. In particular, the following are implemented but **not browser-verified**:

- Redirect behavior across actual browser documents and file:// storage behavior.
- Native dialog focus handling, Escape interactions, keyboard navigation and screen-reader output.
- Exact rendering, contrast and text wrapping in both themes.
- Mobile drawer behavior and measured horizontal overflow at device widths.
- Actual download prompts, native print dialogs and printer margins.
- Animation smoothness or interactive performance on a real mobile device.
- Provider-side GitHub Pages, Netlify, Vercel or Cloudflare deployment.

The core workflow results above should not be described as browser end-to-end tests.

## Recommended browser acceptance pass

1. Open with a static server; sign in, refresh, sign out and try a protected page.
2. Test both temporary and remembered sessions, then toggle the theme and refresh.
3. Review at approximately 1440px, 768px and 390px widths. Confirm tables scroll within their containers and the page itself does not overflow.
4. Register a member; add a title and copies; issue, renew and return one copy. Inspect every linked view.
5. Reserve a title, return a copy and fulfill its hold. Attempt a wrong-member issue.
6. Record a partial fine payment and print its receipt. Test a waiver and an excessive payment.
7. Approve and partially receive an acquisition; complete it and compare copy counts and budget expenditure.
8. Make adjacent and overlapping room bookings, register an event attendee and mark attendance.
9. Filter/search/sort/paginate a large table and export the filtered selection in both formats.
10. Unlock the SQL Vault and run every example plus an unsupported statement. Confirm the simulated-result warning remains visible and library totals do not change.
11. Print a library card and purchase order. Check keyboard-only modal navigation and Escape-to-close.
12. Export a JSON backup, then reset after confirmation. Verify that unrelated site storage remains untouched.

No browser-specific check above is marked as passed merely because the supporting code exists.
