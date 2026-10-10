# Folio — Library Management System

A complete, multi-page **frontend-only demonstration application**, built with HTML, CSS and vanilla JavaScript. Folio provides a shared, persistent workspace for cataloguing, circulation, members, digital resources, operations and administration.

**No backend, real database, external API, payment gateway, build step, npm installation or Node.js runtime is required to use the application.** All changes are saved in the current browser. No live site has been deployed as part of this ZIP delivery.

## Start here

1. Extract the ZIP.
2. Open `library-management-system/index.html` in a modern desktop browser.
3. Sign in with the credentials below.

Some browsers isolate or restrict storage for `file://` pages. If sign-in does not carry across pages, serve the extracted folder using a basic static file server. For example, if Python is available:

```sh
cd library-management-system
python3 -m http.server 8000
```

Then open `http://localhost:8000`. On Windows, `py -m http.server 8000` may be the available command. A local static server serves files only; it is not an application backend. VS Code Live Server is another option. Do not open several copies of the app on the same origin while testing unrelated data.

## Demo credentials

| Purpose | Value |
| --- | --- |
| Login email | `fbur@gmail.com` |
| Login password | `fbur&brothers` |
| Initial SQL Vault password | `Vault@2026!` |

The login password is in `assets/js/config.js`. The SQL Vault password can be changed in Settings. Profile edits do not alter the login credentials.

Remembered sessions use LocalStorage; temporary sessions use SessionStorage. Internal pages redirect to login when no session exists, and login redirects an existing session to the dashboard.

**These are simulated client-side gates, not secure authentication.** Anyone with browser developer tools can inspect or bypass them. Never put real member, employee, financial or confidential data into this demo.

## Experience and design

- Coordinated dark and light glass themes with immediate, persistent theme selection.
- Responsive sidebar, desktop collapse, mobile drawer, keyboard focus styles and native dialog focus containment.
- Searchable, sortable tables with filters and 25/50/100-row pagination.
- Categorized global search across titles, copies, authors, publishers, members, reservations, loans, staff and digital resources. `Ctrl/Cmd + K` focuses it.
- Readable status badges, friendly validation, confirmations, toast feedback and reduced-motion support.
- Local SVG icons and charts. No fonts, charts, icons or export libraries are fetched from a CDN.
- Selectively animated cards, modal entrances, loading states and interactive controls.

## Modules and workflows

| Area | Included functionality |
| --- | --- |
| Dashboard | 12 calculated KPIs; circulation, issues/returns, collection mix, membership growth, popular categories, return punctuality and acquisition expenditure charts; recent loans, expected returns, books, members, logs, overdue alerts, reservations and inventory alerts; quick actions. |
| Books | Create, view, edit, archive and safe deletion; ISBN uniqueness; multiple authors; publisher/category/language/year/availability filtering; derived physical-copy totals; borrowing history and cover placeholders/custom image URLs. |
| Catalog metadata | Categories and parent categories, authors, publishers and shelf records; reference-safe deletion and archive workflows; associated title views. |
| Physical copies | Separate accession/barcode records; single and bulk creation; condition/status/location editing; shelf capacity validation; copy history. Moving a copy updates its rack from the chosen shelf. |
| Members | Registration, editing, validation, unique emails/cards, renewal, suspension, reactivation, archival, profile details, loans, reservations, fines, payment history and account activity. |
| Circulation | Member/copy lookup, issue, return and renewal. Status, membership expiry, type-specific borrowing limits/duration, fines, copy eligibility, reservation holds and renewal policy are checked. |
| Returns and overdue | Current-date overdue calculations, returned/lost/damaged/repair conditions, fine accrual and member contact details; duplicate returns blocked. Lost copies incur replacement cost; damaged copies incur 25%. |
| Reservations | Duplicate/limit prevention, FIFO queue positions, ready-for-pickup allocation, expiry, cancellation, reserved-copy issue and fulfillment. Invalid members are skipped when allocating copies. |
| Fines and payments | Accrued overdue fines, manual penalties, partial/full simulated payment, no overpayment, reasoned waiver, receipt view and print. Financial history is retained. |
| Library cards | Automatically assigned demo card numbers, member initials, status/expiry, decorative barcode, view, renewal, suspension and print. |
| Acquisitions | Request, approval, ordering, rejection/cancellation, partial/final receipt; existing or proposed titles; new physical copies; receipt ledger, budget expenditure and duplicate-receipt prevention. |
| Purchase orders | Multiple title/quantity/price lines; fixed tax/discount amounts; calculated totals; draft, submit, approve and order workflow; linked acquisition per line; partial/completed receipt state; print. |
| Suppliers and budgets | Supplier CRUD/archive, order/spending summaries, budget allocation, receipt-derived spending, subscription renewal costs, remaining funds, utilization charts and warnings. |
| Inventory | Non-book assets and consumables, minimum-stock alerts, adjustment reasons, movement history, damage/disposal/archive statuses. General inventory is separate from book copies. |
| Digital library | Search, category filters, detail views, bookmarks, recent reads, reading-session history and an original bundled HTML sample for reading/download. Restricted resources cannot be opened. |
| E-resources | Synthetic subscription management, derived expiry state, renewal action, license fields and budget association. Renewal uses 30 days per requested month and records the configured renewal charge. |
| Reading/study rooms | Searchable seat/room inventory, availability, member booking, capacity checks, overlap prevention, editable/cancellable future bookings and searchable/exportable history. |
| Staff and departments | Synthetic staff records, shifts, department relationships and reference-safe management. |
| Attendance | Daily records, check-in/out validation, duplicate staff/date protection, working hours, date filtering and filtered attendance percentage. Leave/absence count in the displayed denominator. |
| Events | Event list, CRUD, capacity validation, unique demo registrations, attendee list, present marking and cancellation. |
| Announcements | Draft, local publish, archive and read state; audience/department and publish/expiry fields. Current published announcements appear on the dashboard. |
| Notifications | Persistent unread counts, individual/all-read actions, clear, type/status filters and operation-generated notifications. |
| Reports | 19 selectable datasets, date/category filters, grouping, summary cards, charts, sortable/paginated records, CSV/XLSX and print. Category filters only match records with a title/category relationship. |
| Analytics | Collection/member growth, circulation, borrowing frequency, popular titles, repeat borrowers, overdue rate, average duration, reservation fulfillment, fine collection, budget utilization and digital usage. |
| Activity logs | Bounded actor/action/module/timestamp history, search, filtering and export. Default actor is Demo Administrator. |
| Profile/settings | Editable profile display, session info, theme, sidebar, notification preferences, rules, currency, dates, page size, backup and confirmed reset. |
| SQL Vault | Password prompt, line-numbered highlighted editor, five saved examples, session history, results/messages tabs, loading state and simulated errors. |

Archive linked records instead of deleting them. Safe deletion blocks referenced records, including historical references. Active members with outstanding loans cannot be archived. Active/reserved copy states can only be changed through their dedicated circulation/reservation workflows.

## SQL Vault contract

The Vault is a **closed, text-pattern simulator**. It recognizes only the five documented examples:

```sql
SELECT * FROM books;
SELECT * FROM members WHERE status = 'Active';
SELECT * FROM circulation WHERE status = 'Overdue';
UPDATE book_copies SET status = 'Available';
DELETE FROM notifications;
```

Outputs are predetermined example rows, not selections from application records. Timing and affected-row counts are simulated. Unrecognized text produces a simulated error. Destructive-looking text never mutates application data. The simulator uses no `eval`, `Function`, SQL engine, database library or network call. It always displays:

**SIMULATED RESULT — NO DATABASE QUERY EXECUTED**

## Data architecture

`storage.js` owns persistence and transactions; `domain.js` owns the operational rules. Pages share schema definitions, components and data. The full state is stored in one versioned, namespaced snapshot to keep multi-record changes atomic:

- `folio_library_data`: relational arrays, settings, version and revision.
- `folio_library_theme`: appearance preference.
- `folio_library_sidebar`: desktop collapse preference.
- `folio_library_session`: remembered session in LocalStorage or temporary session in SessionStorage.
- `folio_library_vault` / `folio_library_queryHistory`: session-only SQL playground state.

A transaction clones the current snapshot, validates and updates the linked records, serializes once and commits only if saving succeeds. Stale tab revisions are detected before writing. Storage events refresh other open tabs. This is useful demo coordination, not a real concurrent database transaction protocol; simultaneous writes in different tabs can still race.

Data is generated on first use only. A deterministic PRNG creates synthetic metadata; operational dates are anchored to that first launch. Overdue status, fine accrual and reservation expiry are reconciled on app entry and mutations using the browser’s current date.

The default quota-adjusted seed currently starts with **approximately 6,800 linked records**, including 650 titles, over 1,200 physical copies, 650 members, over 1,500 historical loans plus active loans, and realistic supporting data. The JSON snapshot is approximately 1.6 MB. Counts can vary slightly with date/policy reconciliation. The larger specification targets were intentionally scaled down to leave safe LocalStorage headroom. No huge images/base64 data are stored.

The application caps serialized snapshots at 2.3 million characters, conservatively leaving room under common UTF-16 storage quotas. Browser storage limits still vary; errors are surfaced and a failed mutation leaves the previous snapshot intact. Browser cleanup/private-mode restrictions can remove or deny LocalStorage. Periodically use **Settings → Backup JSON**. Backup is an export/recovery artifact; an in-app backup-import workflow is not included.

Reset overwrites only Folio-owned data/preferences/session keys. It never calls `localStorage.clear()` and never erases unrelated application storage. Export a backup before confirming reset.

## CSV and XLSX exports

Major modules export either all records or the current filtered selection. Reports export their active selection/grouping; booking histories have dedicated exports. Exports include readable headers and relationship labels.

- CSV: UTF-8 with BOM, quoted/escaped cells, formula-injection neutralization for text cells.
- XLSX: a real OOXML workbook in an uncompressed ZIP container, generated locally by `export.js`; inline string cells preserve Unicode, numeric values remain numeric, the header is bold/frozen and an autofilter is included.
- No server or CDN dependency is needed.

Reports/exports/printing are browser operations, not real financial reporting services.

## Project tree

```text
library-management-system/
├── index.html
├── login.html
├── README.md
├── TESTING.md
├── LICENSE
├── .nojekyll
├── netlify.toml
├── vercel.json
├── pages/
│   ├── dashboard.html
│   ├── books.html
│   ├── book-categories.html
│   ├── authors.html
│   ├── publishers.html
│   ├── book-copies.html
│   ├── members.html
│   ├── member-details.html
│   ├── circulation.html
│   ├── issue-books.html
│   ├── return-books.html
│   ├── renewals.html
│   ├── reservations.html
│   ├── overdue-books.html
│   ├── fines.html
│   ├── payments.html
│   ├── library-cards.html
│   ├── staff.html
│   ├── departments.html
│   ├── attendance.html
│   ├── acquisitions.html
│   ├── purchase-orders.html
│   ├── suppliers.html
│   ├── budgets.html
│   ├── inventory.html
│   ├── shelf-management.html
│   ├── digital-library.html
│   ├── e-resources.html
│   ├── reading-room.html
│   ├── study-rooms.html
│   ├── events.html
│   ├── announcements.html
│   ├── notifications.html
│   ├── reports.html
│   ├── analytics.html
│   ├── activity-logs.html
│   ├── sql-vault.html
│   ├── profile.html
│   └── settings.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   └── app.css
│   ├── images/
│   │   └── favicon.svg
│   └── js/
│       ├── config.js
│       ├── schema.js
│       ├── mock-data.js
│       ├── storage.js
│       ├── domain.js
│       ├── export.js
│       ├── components.js
│       ├── insights.js
│       ├── workflows.js
│       ├── vault.js
│       ├── auth.js
│       └── app.js
├── mock/
│   ├── README.md
│   └── reading-sample.html
└── tests/
    ├── core.test.cjs
    ├── test-results.json
    ├── export-check.csv
    └── export-check.xlsx
```

The requested shared CSS/JS responsibilities are consolidated into cohesive modules instead of creating empty files for every suggested filename. All 39 requested internal HTML pages exist, plus login and entry pages. The digital sample is an additional standalone HTML file.

## GitHub repository and GitHub Pages

1. Create a new repository on GitHub.
2. Upload the **contents** of `library-management-system/` to the repository root, so `index.html` is directly in the publishing directory. Keep all subfolders together.
3. Commit the files to `main`.
4. In the repository’s Pages settings, choose deployment from a branch, select `main` and the repository root, then save.
5. Open the generated Pages URL after its deployment finishes.

The included `.nojekyll` tells Pages to serve the static content directly. No application build is needed. If you prefer Git commands, from the project directory:

```sh
git init
git add .
git commit -m "Add Folio library demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the repository URL with your own. All internal links and asset paths are relative, so a project URL such as `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/` does not require code changes. Each page is a real HTML file, so refresh does not need SPA rewrites.

Official guidance: [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Netlify

For a manual deployment, drag the extracted `library-management-system` folder into Netlify’s file deployment interface. For a Git-connected deployment, choose the folder containing `index.html` as the project base/publish directory, with no build command. `netlify.toml` publishes the current project root. No environment variables or functions are required.

Official guidance: [Create deploys](https://docs.netlify.com/deploy/create-deploys/).

## Vercel

Import the repository, use the **Other** framework preset, set the root to the folder containing `index.html`, and use no build/install command. The output is the project root (`.`). `vercel.json` records these static settings and retains `.html` paths. No environment variables or API routes are needed.

Official guidance: [Configure a build](https://vercel.com/docs/builds/configure-a-build).

## Cloudflare Pages

Create a Pages project from the repository or upload the static files. Use no framework preset, no application build step (an optional `exit 0` command is sufficient if required by the interface), and the folder containing `index.html` as the output directory. No Worker, database binding or secrets are required.

Official guidance: [Static HTML on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

These are publishing instructions; a live provider deployment was not executed or tested during ZIP creation.

## Browser support and troubleshooting

Use a current Chrome, Edge, Firefox or Safari version with JavaScript, LocalStorage, native `dialog`, Blob downloads and SVG enabled. `backdrop-filter` and `color-mix()` enhance the presentation; the UI still has explicit readable surface colors. The app does not support Internet Explorer.

| Symptom | Action |
| --- | --- |
| Login repeats when opening files directly | Serve the complete folder with a local static server; `file://` storage rules vary. |
| Blank page or scripts not found after uploading | Upload the full folder contents and preserve `assets/` and `pages/`; keep `index.html` at the publish root. |
| “Data changed in another tab” | Retry using the refreshed data; avoid simultaneous editing in several tabs. |
| Storage limit or disabled storage | Export a backup, remove unused records if possible, or reset demo data after confirmation. Allow browser site storage. |
| Corrupt or incompatible saved data | Use the recovery screen to download the raw data before resetting. The app will not silently discard it. |
| A record cannot be deleted | It is referenced by a related record or history. Archive it instead. |
| A copy cannot be issued | Check its status/condition, reservation holder, member expiry/status, borrowing limit and fine threshold. |
| Renewal fails | Check renewal count, queue, membership, fines and overdue-renewal settings. |
| A booking fails | Check future time range, overlap, resource maintenance and participant capacity. |
| Export seems absent | Allow browser downloads and check the download folder. All exports are created locally. |
| SQL input is unsupported | Use one of the five saved examples; this intentionally is not a SQL engine. |
| Print styling differs | Use the browser print preview; printer margins and background-graphics settings are browser controlled. |

## Validation and limitations

See `TESTING.md` and `tests/test-results.json` for the exact checks run. Domain tests use Node only as an optional maintainer test runner; end users do not need it.

The implementation was checked through executable domain tests, JavaScript syntax validation, static asset/path checks and actual exported workbook parsing. **Interactive browser tests, visual screenshot review, mobile overflow measurements, native printing and live hosting deployment were not executed in this environment.** Responsive/accessibility behavior is implemented but those browser-specific checks remain unverified.

Additional deliberate demonstration limits:

- Browser-local, single-user state; no cross-device sync, secure accounts, real database or payment processing.
- Reduced initial dataset to respect browser storage quotas.
- Digital records use original synthetic sample content, not full books or live vendor subscriptions.
- Library-card barcodes are decorative; scanner input is simulated with accession/barcode text search.
- Dashboard charts are custom SVG/CSS visualizations. Report filters apply to the selected table’s documented date field; some analytics panels explicitly show whole-collection context.
- Repeat-borrower rate is the share of borrowers with two or more loans in the selected period; it is not a cohort-retention model.
- The SQL Vault supports only its documented sample patterns and never runs arbitrary SQL.
- Records with dependencies are retained through archival; historical financial/circulation records have no generic edit/delete shortcut.

## License

MIT. See `LICENSE`. Original demo content and custom icons are included under the same license.
