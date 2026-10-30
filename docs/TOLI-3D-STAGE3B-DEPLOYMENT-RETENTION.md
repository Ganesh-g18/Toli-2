# TOLI 3D Stage 3B deployment retention

21 October 2026. **STAGE 3B DEPLOYMENT RETENTION = PASS** for the authorized local preparation, non-deploying candidate workflow and simulations. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.**

No remote workflow, deployment, upload, push, rollback, production credential, DNS, hosting or remote branch operation occurred.

## Current workflow and root cause

The actual `.github/workflows/deploy.yml` runs on push to main, uses Node20/npm ci, runs `npm run build`, uploads `dist` with upload-pages-artifact@v3, then uses deploy-pages@v4. The build script is `vite build`; output is `dist`; base is `/Toli-2/`; routing uses HashRouter.

The separate Stage 3 assembler did not control the uploaded directory. Publishing new raw dist could therefore delete old hashed lazy dependencies needed by open tabs. The live workflow is **byte-unchanged**, as Stage 3B section5 requires. The new manual candidate workflow prepares and archives the safe directory without activating production publishing. A future authorized publishing job must consume the pinned validated candidate artifact or this same preparation/output, rather than rebuilding raw dist independently.

The four authoritative Stage 3, migration plan, checklist and physical QA documents informed this work. Their earlier results remain historical evidence; desktop proof is not relabeled as phone evidence.

## Canonical release command

```sh
npm run release:prepare -- --previous /absolute/path/to/previous-verified-schema2-package
```

One command performs:

1. Validate the required complete previous package.
2. Build production into a fresh private temporary directory with Vite's emitted dependency manifest.
3. Validate the actual graph, current inventory, base, entry, workshop and logo.
4. Exclude non-runtime provenance documents from the safe output.
5. Assemble current plus bounded previous dependencies.
6. Validate every package file, size, checksum, manifest identity, entry reference and summary.
7. Preserve complete prebuilt current/previous archives and revalidate.

It does not use stale local dist or release-dist as current build input. Missing history stops before building. Explicit `--bootstrap` is the only first local/CI seed option; it cannot protect an unprovided previous public release. Stage 3 schema1 packages are rejected by this pipeline. The legacy `pack.mjs` is unchanged solely for historical compatibility/tests and is not the canonical release command.

Optional trusted local arguments are `--out`, `--archive-root` and `--config`. CI uses the normal production config and fixed output. The source guard preserves today's traditional root; no3D-primary switch was introduced.

## Current output and safe output

Raw build output remains `dist/`. The future publishable preparation directory is **`release-dist/`**. Validate it with:

```sh
npm run release:validate
```

The package is assembled and validated in a sibling temporary directory before local replacement. This is not a remote atomic-hosting claim. On a preparation failure the command exits nonzero and CI stops. An earlier valid output can remain; callers must not publish it as if the failed run succeeded.

Generated outputs are ignored by Git and lint without excluding application or tool source. No dependencies were added or installed.

## Release manifest and inventory

Normal Build B identity: **`toli-73b9da574a7cc0a9559c841f`**.

- Current files: **121**.
- Retained dependencies: **53**.
- Metadata files: **2**.
- Total: **176 files / 29,962,551 bytes**.

`release-candidate.json` schema2 records the content-derived current identity, base, classic-primary entry policy, index entry, current and retained path→size/SHA256 maps, previous snapshot and graph-derived retention paths. The identity binds current entry bytes and the emitted inventory. `release-summary.txt` records the human summary, including its own contribution to the exact total size.

Current dependencies include entry and lazy JS, shared modules, CSS, images, official logo, workshop, Vehicle dependencies, Gallery dependencies, HTML/404 and required static assets. Four existing public provenance documents are omitted only from the safe output: model README files, sportback review-status.json and sportback audit.json. They are not runtime graph dependencies; their source copies remain unchanged. Vite's private manifest is consumed and removed. The temporary release-build.json is not published.

There are no screenshots, reports, logs, Blender sources, source directories or temporary A/B directories in the package. Production emitted **zero source maps**; no source-map policy changed. Validation rejects unsafe paths/symlinks, known development artifacts, internal `/home/thunder/` paths and the GPU injector. The actual package passed these checks.

## Retention policy

The policy is **current plus the immediately previous distinct release's current immutable dependency inventory**. Retention comes from actual Vite output records and the declared full-SHA workshop URL, checked against size and checksum inventory. It does not guess from filename patterns. Unit tests use unhashed fixture names to verify this distinction.

B retains A dependencies. C retains B's current dependencies and drops B's inherited A files. Old index/404 HTML never replaces current entry HTML. This window lasts while a release is immediately previous; a second distinct update can retire A's assets. It is a release-count window, not a calendar guarantee.

Shared identical paths are reused once. Name/content collisions fail. Stable model URLs cannot silently change bytes beneath an old tab; they must be versioned first. An unchanged current identity stops with a reuse-prebuilt message rather than advancing the retention window artificially.

The managed archive registry keeps two complete packages and removes older registry-owned IDs after successful preparation. External previous inputs are read-only and are never pruned. Temporary test/evidence folders are separate engineering records, not additional served history.

## Build A → Build B test

Both builds used the actual canonical npm command:

- A: **`toli-ecd69213c507813d1b3ea9ba`**, explicit local bootstrap and the existing trusted changed-hash Vite test config.
- B: **`toli-73b9da574a7cc0a9559c841f`**, normal production config, previous input A.

A's config adds a harmless global JS marker to force genuinely different Rollup output hashes. It is an intentional local simulation of an older release, not a claim about a previously deployed public artifact. Its bytes are intentionally retained in the simulation package. The current B entry uses normal bundles. Neither package includes a GPU injector or customer debug controls. First public adoption must use exact approved public history instead of this synthetic A.

Logs are `candidate-a.log`, `candidate-b.log` and `candidate-repeat.log`. B's default output is the real `release-dist`, not a separately hand-built test directory.

## Old-tab test

A stayed open with Premium Detailing selected while the simulated server switched to prepared B. A then successfully loaded its old:

- Gallery, including the actual16 photographs.
- Canonical Service Request.
- Local TOLI AI.
- Standard View/Index and return to3D.
- Vehicle dependencies.

Requests closed without sending. Old chunk URLs returned200 and their bytes match the A inventory retained by B. Standard had zero staging canvases; return had one. Independent HTTP verification checks the old Gallery, Request, AI, Classic and Vehicle URLs through the B server. Saved screenshots, DOM observations and request logs accompany the report.

## Fresh-visitor test

A fresh B document loads `/Toli-2/assets/index-Bye3XmDL.js`, not A's index-DDPqIc89.js. Served HTML matches B's current entry checksum. The served release-candidate.json identifies B, and the fingerprinted workshop has the required bytes/checksum.

Published release metadata is an inspectable artifact. The app retains its existing bundled staging release.json; no runtime metadata fetch or customer interface was added. The unchanged workshop bytes are shared between A/B, so release identity is established through the entry and inventory rather than an invented model change.

## Workshop and logo identity

Current fingerprint:

`models/staging/toli-workshop-replica.b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225.glb`

**4,268,456 bytes**, SHA256:

`b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`

Current validation pins the approved descriptor. Explicit historical validation can verify a previous package's own fingerprint, bytes and hash and retain that older fingerprint. A separate temporary unit fixture proves this. The architectural `toli-workshop-web-v2.glb` is not treated as the previous web release by default.

The authoritative replica, editable blend, older approved model and Vehicle assets are unchanged. Official big-transparent.png remains1483×352 RGBA, SHA256 `4809ffd3bde9be888071d5b4c3e90a0f58e627cc2a07f20c49e625a38b1cf590`.

## Chunk failure and reload safety

Blocking retained A Gallery JS while B is current produced finite Gallery recovery with Standard View and explicit Reload current release. The workshop stayed usable.

With current B Gallery permanently blocked, **three completed document loads produced three503 Gallery responses and three finite recovery states**, each with the workshop ready and one canvas. Every reload was explicitly requested. There was no automatic reload loop, retry storm or blank application. Unblocking and explicitly reloading restored B Gallery.

The authoritative permanent-failure evidence waits for each completed navigation and workshop readiness. Earlier rapid helper observations are retained separately and do not establish that result. Existing browser-module failure recovery and truthful draft-loss copy are unchanged.

## Fail-closed tests

Eight actual command-line validations against isolated complete copies all exited1 with clear errors:

- Missing current JS.
- Missing required retained Gallery JS.
- Wrong workshop descriptor.
- Missing fingerprinted workshop.
- Stale A manifest over B assets.
- Missing current entry.
- Missing release manifest.
- Corrupt retained chunk.

Temporary copies were removed. Real models and packages were not corrupted. Unit tests additionally cover missing private build metadata, inventory/identity/path constraints, wrong source model descriptor, historical model retention, bounded history, unchanged-build handling and prebuilt archives. No baseline assertions were weakened.

## Clean build and reproducibility

Canonical preparation always creates a fresh temporary build directory, including when dist/release-dist already exists. The genuinely changed A output could not have come from stale normal dist.

Normal B and a second preparation from equivalent inputs produced identical inventories for **all176 files**, including metadata, and the same release identity. There are no timestamps or temporary source paths in package identity. `reproducibility-final.json` records the comparison.

## Rollback package

The complete previous package is preserved at:

`release-artifacts/toli-ecd69213c507813d1b3ea9ba`

Its identity is A and its entry policy is classic-primary. Current B is separately archived. Every previous archive file was compared with the complete A input; bytes are identical. No rebuilding or rollback activation occurred.

The procedure is ready: select the pinned complete artifact, validate it with `node tools/release/validate.mjs PACKAGE --historical`, verify identity/base/root/request/routes, then publish that exact artifact only under separate deployment authorization. This locally verified A is a simulated predecessor, not evidence of actual public provenance. Before a real3D-primary cutover, preserve an independently verified known-good traditional-primary public artifact.

## Package size and duplication

| Measurement | Files | Bytes |
|---|---:|---:|
| Raw normal dist | 125 | 28,603,525 |
| Current sanitized runtime inventory | 121 | 28,596,718 |
| Retained A dependencies | 53 | 1,302,622 |
| Metadata | 2 | 63,211 |
| Safe package | 176 | 29,962,551 |

Safe minus raw dist is **1,359,026 bytes**, accounting for6,807 excluded provenance bytes plus metadata and retained dependencies. The package reuses59 shared previous paths and has **zero unnecessary retained-content duplicates against current content**.

Independent archive copies are deliberate prebuilt rollback artifacts, not extra generations in the served package. Managed archives are bounded to current/previous. Existing current model aliases needed by separate current routes are preserved rather than rewritten unsafely.

## CI validation

New `.github/workflows/release-candidate.yml` is **workflow_dispatch only**, with contents:read/actions:read. It has no Pages write, id-token write, push trigger or deployment action.

It requires exact previous run/artifact inputs or explicit bootstrap, downloads that one artifact, runs tests/both TypeScript checks/QA/lint/tool syntax, invokes the canonical command, validates `release-dist`, and archives deterministic candidate/rollback artifacts. Configured artifact storage is90days. Missing/expired/corrupt history stops the job without a bootstrap fallback.

Workflow YAML parsed successfully with the installed yaml library. Contract tests verify its trigger, permissions, safe upload target and lack of deployment activation. Equivalent local commands passed. **No remote workflow, download, upload or deployment was executed.** CI is configured for Node20; local checks used the installed runtime. This report does not claim a remote CI pass.

## Cache assumptions and publish order

No custom hosting cache-header rules were found. Conceptually, immutable hashes should be long-lived and HTML/release metadata should revalidate. Actual GitHub Pages headers were not measured or invented. Local server revalidation is test scaffolding, not public-host evidence. There is no global cache disable, service worker or offline guarantee.

The existing workflow uploads a complete Pages artifact before deployment. Repository configuration does not prove atomic directory/CDN visibility. The safest future order is: prepare and validate the complete package, preserve the prebuilt rollback artifact, upload the whole verified package, then activate it. Do not copy/delete loose live files while changing HTML.

An in-place host would require dependencies to exist before new entry HTML and old dependencies to survive the window. This report does not invent that hosting capability. Actual host headers, atomic visibility, artifact expiry and rollback deployment remain separate rehearsal gates.

## Base path and HashRouter

The packaged `/Toli-2/` base works with `#/3d-production-preview`, `#/classic`/return and original `#/3d-experience`. Root still displays the traditional Expert car care Hero with zero staging canvases.

B's Services, Vehicle, Journey, Why TOLI, Gallery, Reception, Help and Overview were visited; each had one staging canvas. No route/entry policy or application runtime code changed.

## Runtime regression and performance

A temporary local HTML injection, outside the package, counted real deduplicated WebGL getContext results: one staging context initially; zero connected staging contexts/canvases in Standard; one on return, with two cumulative constructions. This is ownership evidence, not GPU driver memory/GC certification. The final normal document has no audit node.

Actual workshop503 → explicit Retry →200 recovered on a fresh owner. Vehicle503 → Retry →200 retained the workshop's one context. Source cache/recovery code is unchanged. Expected injected diagnostics are separated from the final healthy document's empty warning/error console.

Application runtime bytes did not materially change, so no speculative optimization or new full performance pass was performed. Stage3's126.5ms shell/993.5ms useful frame/19 draw calls/one context remain prior desktop references, not new Stage3B timings or Android measurements. DPR, lighting, cameras, geometry, form, service, theme and AI behavior are unchanged.

## Production protection and files changed

**417 existing files checked:412 byte-unchanged, five intentional tooling/test changes, zero unexpected changes.** The live deployment workflow hash is unchanged.

Existing changes are package.json (two release commands, build unchanged), .gitignore (generated outputs), eslint.config.js (generated-output ignores only), tools/release/README.md and the freeze test's exact authorized package hash. The original315-file guard remains; package changes are pinned rather than skipped.

New implementation files are four release MJS modules, the manual candidate workflow, one14-test file and an exact package-hash fixture. Other changes are reports/evidence. The lockfile, Vite config, entry HTML, all application runtime/public assets/editable models and legacy pack.mjs are unchanged. Hero, Navbar/logo/vehicles, production Inside TOLI, workshop and Vehicle design remain frozen.

## Full regression

- Production build: PASS,9.37s.
- Application TypeScript: PASS,17.78s.
- Node TypeScript: PASS,2.45s.
- QA configurations: PASS,3.27s.
- Lint: PASS,8.83s, zero warnings.
- Complete tests: **460 tests across63 files PASS**,129.85s wall time; Vitest127.07s.

The446/62 baseline is preserved with14 additional packaging tests. Additional tool syntax, YAML parsing, actual canonical A/B/repeat and CLI corruption checks passed. Existing build-size/Tailwind advisories were not suppressed.

## Remaining limitations and physical status

First public adoption must use exact approved previous public history, not synthetic local A. Actual GitHub artifact retrieval/expiry, public host cache/atomic visibility and rollback deployment were not executed. The live workflow deliberately remains unchanged; candidate preparation is ready but production activation is not authorized. Current+previous retention does not promise indefinite survival for old tabs.

Android, TalkBack, physical tablet, GPU/driver and sustained use remain **UNVERIFIED**; physical timings are **UNMEASURED**. No new LAN handoff was prepared or old IP/server assumed active. The local inspection preview is loopback-only at `http://127.0.0.1:8159/Toli-2/#/3d-production-preview`, session40663, serving actual release-dist without instrumentation after QA. Other preview servers were not stopped.

**STAGE 3B DEPLOYMENT RETENTION = PASS**

**PHYSICAL ANDROID VALIDATION = REQUIRED**

**PRODUCTION MIGRATION = NOT AUTHORIZED**
