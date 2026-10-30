# TOLI 3D Stage 2 staging report

21 October 2026. **Isolated implementation only. PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.**

The current user explicitly authorized Stage2 while physical testing remains outstanding. This supersedes the earlier plan's sequencing recommendation for isolated implementation only, not its production approval gate.

## Routes / startup / architecture

Production-equivalent local preview: **http://127.0.0.1:8153/Toli-2/#/3d-production-preview**. Standard View: `#/classic`. Existing `#/3d-experience` and traditional root `#/` retained. HashRouter/base unchanged; no redirect/release-default flag/deploy/workflow change. Index's module boundary is now lazy; its source, Hero, Navbar and production Inside TOLI are unchanged.

StagingEntry eagerly supplies only the lightweight shell/error boundary; StagingPreview and existing SpatialExperience load lazily. No duplicate spatial site or classic implementation. The official1483×352 RGBA image is imported unchanged on pale backing, with native Standard View access, status text and indeterminate copy. No fake percentages/minimum splash duration. The shell remains until model prepare/render reports ready and a subsequent animation-frame boundary publishes staging readiness. Navigation exists before that handoff. No Vehicle requirement for useful-frame readiness.

Existing classic global CSS remains in main entry to protect cascade/root appearance; this Stage2 does not claim minimal possible CSS. Classic's full JS/page is lazy, as measured in network evidence. No traditional homepage mounts behind3D.

## Implementation matrix

| Requirement | Previous state | Implementation | Evidence / status |
|---|---|---|---|
| Isolated routes | Root/experiment only | /3d-production-preview + /classic, root unchanged | Routing tests, browser Standard visit/return; IMPLEMENTED |
| Shell/Classic lazy | Eager Index | Lazy Index + eager small recovery shell | Initial network: no Index chunk until Standard click; IMPLEMENTED |
| Capability | Renderer exceptions only | Check required WebGL2/observers; real Three context creation catches errors, no extra probe | Unit unavailable-WebGL and DEV browser recovery; IMPLEMENTED |
| Readiness | Submitted real model frame | Existing prepare/render + staged handoff frame | Actual workshop visible before shell removal; IMPLEMENTED |
| Recovery | No explicit staging retry | Route chunk/render boundary, Standard View and fresh lazy/scene attempt | Boundary test; browser failed-workshop→Retry→ready; IMPLEMENTED |
| Failed downloads | Legacy failed URL stays failed | New staged byte cache evicts rejected promises; explicit Retry also invalidates corrupt bytes | First fail/HTTPfail→new successful request tests; IMPLEMENTED without altering old cache |
| Asset version | Stable replica URL | Separate content-hash staged copy and release manifest | Copy/hash equality + actual versioned network fetch; IMPLEMENTED |
| Vehicle retry | Legacy template failures cached | Staging-only retry-safe template wrapper; existing adapter/model reused | Explicit retry and isolation tests; IMPLEMENTED, legacy loader unchanged |
| Renderer ownership | Existing one-scene disposal | Opt-in scene options, same one renderer, unmount on Standard | Ten real-browser round trips0/1 staging canvases; scheduler tests ten cycles; IMPLEMENTED |
| Logical state | Local resets on route unmount | Provider above route transition owns service, Journey step, last spatial destination | Premium Detailing retained on ten browser cycles; IMPLEMENTED |
| Canonical Request | Shared existing flow | Same App provider/form/hook; no new booking code | Browser Premium Detailing preselection, close/no send; IMPLEMENTED |
| Locations/history | Existing document-query adapter | Retained same adapter with staging hash; raw pushState preserves owner | Unit direct Services/Vehicle/Reception + popstate same owner; IMPLEMENTED |
| Theme | Shared document/store | Same ownership; no new theme store | Automated roundtrip, existing theme regression; implementation preserved |
| Responsive | Existing spatial layout | Restrained Standard link + shell; no geometry/camera redesign | Five mobile healthy/recovery sweeps; other evidence below |
| Android | Unverified | No simulated pass | REQUIRED, UNVERIFIED |

The initial matrix recorded before implementation is retained as `implementation-matrix-before.md` alongside this report's evidence.

## Capability / recovery / failures

No UA, manufacturer, model, price, width/FPS/load-time eligibility threshold. Reduced motion is not a fallback condition. Required ResizeObserver/IntersectionObserver checked before scene import; actual renderer still creates its own sole WebGL2 context and reports real creation failure. Shader-program callback is scoped to staging options so non-throwing program failure becomes controlled recovery.

Workshop HTTP/fetch/parse/prepare/render failure ends staging loading; failing scene unmounts/disposes. Retry resets lazy component identity/scene and explicitly forgets staged bytes to allow a fresh fetch; no retry timer/storm or full document reload for normal model retry. Route chunk failure has its own outer boundary; browser module failures may still require a full refresh if the browser caches a rejected module response. That browser-level limitation is not claimed solved by React state reset.

Existing experimental/production workshop cache and legacy Vehicle loader are frozen. Staging uses a URL-deduplicated successful byte cache that removes rejection, and a staging Vehicle template cache with rejection eviction. GPU scene clones remain disposable and never stored in byte cache. No duplicate-download retries on navigation alone. Staged optional Vehicle retry reuses the existing renderer/workshop. Successful templates reuse the approved adapter; the underlying vehicle asset is unchanged.

DEV-only fixtures: `?stageFailure=webgl`, `workshop-once`, `vehicle-once`, before `#/3d-production-preview`. They are guarded by `import.meta.env.DEV`; normal production builds do not activate these parameters. Browser fixture workshop-once showed branded recovery then successful Retry without reload. Recovery mobile screenshots use the DEV WebGL fixture. Separate QA profile config injects reduced-motion/context/performance fixtures only in `/tmp/toli-stage2-profile`; it is not a package build/deployment entry. No normal customer debug controls.

Context loss retains existing scene/restore preparation. QA desktop loss→restore returned ready with exactly1observed context and1canvas; draw calls19. Unit test rejected restoration exits to failed instead of infinite recovering. While restoring, Standard and explicit Retry are available; no arbitrary timeout or automatic slow-device rejection. Real physical GPU/driver recovery remains unverified.

## Renderer / lifecycle / state

No extra renderer for Vehicle/logo/Gallery. Staging owner is marked on its canvas for DOM assertions, not customer diagnostic UI. Standard unmount removes the staging canvas and disposes RAF/observers/listeners/GPU objects through the existing scene lifecycle. Standard's own traditional features are unchanged; “zero” means zero active **staging** owner, not a claim that the classic implementation never uses WebGL.

Real-browser ten-cycle result: each Standard visit0staging canvases; each return1; selected service remained index3/Premium Detailing. Network log recorded one staged workshop download across those SPA cycles, with successful bytes reused. Automated scene-scheduler test creates/disposes10real scene instances with mocked WebGL renderer: pending scheduled frames0after each dispose, renderer constructors/disposals10/10. Separate React test asserts owner count0/1and retained logical service/theme. These prove active ownership and scheduler cleanup; they do not measure real driver memory/GC. No physical memory/thermal claim.

StageSessionProvider remains above PageTransition, storing service index, Journey step and last destination only. Canonical service-keyed requestDrafts remain the original in-memory Map. No form/customer data added to browser storage. Explicit view choice stores only standard/3d in sessionStorage, guarded against storage denial. Both explicit routes remain usable without storage. Root always remains traditional, so no new root preference/default policy is introduced. The planned primary-mode flag and emergency rollout policy remain future work.

Standard return uses the existing document query (`workshopLocation`) plus staging hash through a coordinated replaceState/HashRouter navigation; it does not reload the document. Destination transitions continue through the existing scene instance. Deep links use `/Toli-2/?workshopLocation=vehicle#/3d-production-preview` (similarly Services/Reception), not router query. Refresh initializes shell/workshop first and restores Vehicle on intent. Legacy traditional links and section adapter remain untouched; eventual root-primary compatibility mapping is still Stage3 work.

## Shared systems / accessibility

Shared nine-entry service catalog and HowItWorks component/four Journey definitions reused. App-level canonical ServiceRequestDialogProvider/Steps/useServiceRequestForm unchanged: Premium Detailing preselection observed on SERVICE step and dialog closed without sending. Standard uses the same provider. Approved Gallery dataset and local deterministic AI reused/lazy; no external inference/API key/database/telemetry added. Existing theme initializer/store/event unchanged. AIChatWidget's visibility now also allows `/classic`; root behavior unchanged.

Shell uses named section, real logo alt text, status heading and native links/buttons. Standard/Retry keyboard focus verified by tests. Existing Locations names/all8choices, Request Radix focus/inert behavior, Gallery dialog focus and reduced-motion camera semantics retained. QA reduced-motion fixture produced actual workshop geometry,1context/1canvas and19draw calls; no switch to Standard. TalkBack/physical keyboard/screen reader remain UNVERIFIED.

## Network / versioning / security

An earlier clean production-preview capture recorded18requests before small module refactors; the final artifact capture records17requests: versioned workshop200/4,268,456bytes, official PNG and required shell/spatial/Three/shared chunks. No Index/Classic chunk, Vehicle GLB, Gallery image payload, ServiceRequestSteps or ToliAIPanel initially. The Index chunk first appears on actual Standard View intent. Gallery/Request/Vehicle remain deferred. Local-only server log plus browser resource inventory support these findings; no inference/analytics endpoints were added. Final network artifacts are distinguished from later feature visits in the saved logs.

Release manifest `src/experimental/staging/release.json` binds schema1, workshop path/full SHA256/bytes, official logo hash/dimensions. Staged filename embeds full SHA256. Authoritative runtime/source preserved; no global cache policy disable. A future replica revision must generate a new staged filename/manifest pair; exact copy integrity is audited. Full automated release packaging, Vehicle fingerprinting, previous-release asset retention and public host headers remain Stage3/release tasks. No unsupported claim about GitHub Pages cache headers or offline support.

No production-primary flag, cloud service, deployment workflow, router/DNS/firewall/public tunnel change. No absolute filesystem/LAN URLs in new runtime code. QA files live under tools, no production import; profile flags/fixtures must remain off in an actual customer deployment.

## Performance / remaining measurement limits

Initial network isolation and unchanged model/draw-call observations establish that staging does not load two entire experiences. Historical/current QA initial calls19, context count1; Vehicle uses same scene. Timing comparison methodology is same-build/same-viewport warm reloads, measuring visible shell paint and useful workshop handoff; no manual stopwatch estimates or physical metrics substituted. Comparable medians are reported only if the recorded QA samples complete; otherwise UNMEASURED. The reduced-motion raw2423.2msready observation is a single instrumented desktop sample, not a normal warm-start median.

Browser automation experienced intermittent command timeouts/kernel resets during later checks. Saved completed evidence remains valid; failed commands are not counted as passed. Test run logs under concurrent profiling also had existing5second test timeouts; retained, not hidden or relaxed. Final sequential regression result and any remaining incomplete browser checks are recorded below.

## Protection / tests / files

Protection compares363pre-task source/public/editable-source/dependency/workflow/entry files. Seven existing files intentionally changed: App routing/lazy import/provider; AIChatWidget classic path; spatial Experience/Content/scene opt-in staging controls; workshop protection test; spatial scene tests. All other baseline files match. Full paths and new files are in `protection.json`.

Production homepage behavior unchanged; Index source unchanged; Hero/Navbar/Navbar logo/navbar vehicle/Hero vehicle assets/production Inside TOLI/approved old workshop/authoritative branded GLB/editable source/official PNG/vehicle assets unchanged. Root route still Index. Branded GLB before/after4,268,456bytes, SHA256 `b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`; staged copy identical.

Existing freeze guard is not disabled: original315-file baseline retained; the two explicitly authorized App/AIChatWidget changes are pinned to exact new hashes in `src/test/fixtures/stage2-approved-routing.json`. Every other protected hash still uses the original baseline, and root unchanged/lazy/Standard behavior has new functional tests. Legacy vehicle failure-cache test remains unchanged and passes against the restored original loader. No baseline test deleted or weakened by broad file exclusions.

New meaningful tests cover byte-cache deduplication/failure/retry, staging Vehicle-template retry, route chunk/render boundary containment, root/Standard/staging, capability failure, scene failure Retry, ten view switches/state/theme, canonical preselection, direct destinations/history, reduced-motion policy, scene scheduler ownership, Vehicle retry and failed context restoration. Full build/TS/QA/lint/suite results below are the final source revision; no physical PASS implied.

## Remaining release gates

Physical Android, TalkBack, physical tablet/GPU/driver, real sustained use/thermal behavior unverified. Driver memory plateau/GC not proven by canvas counts alone. Full production rollout flag, root-primary switch, static SEO/noscript generation, consent/metadata refinements, release packaging retention/rollback workflow and broader optional Request failure boundaries remain future architecture tasks. No Stage2 result authorizes those production changes.


## Final results / evidence index

**3D MIGRATION STAGE 2 = PASS** for the isolated implementation and recorded automated/desktop scope. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.**

Final production build13.20s PASS; application TypeScript19.95s PASS; node TypeScript2.86s PASS; QA configurations2.56s PASS (includes Stage2 profiling config); lint9.13s PASS, zero warnings. Full suite **433 tests across60 files PASS** in127.62s (Vitest reported125.30s). Static checks were refreshed after final readiness cancellation; full-suite logs include the final433-test inventory. Relevant logs remain in `final-static/` and `regression/`; `final-validation.json` combines them without claiming a new test run for documentation.

Responsive desktop emulation: healthy Reception and recovery at430/412/390/360/320, all measured no horizontal overflow;844×390landscape and768×1024tablet captured. Found Overview/header overlap in short landscape; fixed only staged CSS top/bottom safe areas and scrolling, with before/after images. Original experiment CSS/cameras unchanged. The shell/recovery share the same responsive layout; loading was observed separately and recovery's longer text was swept at all widths. Locations mobile sheet captured, all8destinations visited with1canvas; actual Back→Reception/Forward→Help recorded. Tablet is EMULATED, not physical. Three direct destination unit cases pass; actual direct Reception browser load and deferred Vehicle restoration/failure fixture were observed.

DEV browser Vehicle-once fixture: optional unavailable state leaves workshop/Request/Locations ready; explicit retry showed Preparing vehicle then complete grounded car with1canvas and stage ready. Image evidence: `vehicle-failure.jpg`, `vehicle-retry-ready.jpg`. Browser theme roundtrip light→Standard light→3D light confirmed; original dark preference restored before delivery. Service preselection/no-send image retained. Some Playwright helper actions timed out; fresh native accessibility inspection/control completed them. Uncompleted commands themselves are not counted as passed.

A Gallery chunk error at11:49:37UTC belonged to an older open document during repeated local dist replacement. The local ContentBoundary contained it; navigation/workshop continued. After final document reload at11:52:31UTC, Gallery rendered the real16-photo dataset correctly. `final-console.json` preserves historical error; `final-healthy-console.json` filters only the recorded final navigation interval and is empty. This is direct evidence supporting the plan's future retained-old-chunk release packaging, not proof that open-tab cross-deployment compatibility is solved. No actual deployment was performed.

Warm desktop QA comparison at1280×720, same instrumented build, route warmup then three reloads. Existing experiment useful-frame samples1294.4/994.2/1053.6ms, median1053.6ms. Staging warmed samples1361.4/1107.3/1847.2ms, median1361.4ms. Staging shell paint210.0/203.2/171.9ms, median203.2ms. Both settled19draw calls and1context; QA resource counts17experiment/19staging. Difference307.8ms in this small local sample; ranges overlap. Added shell module/logo requests and an additional visible handoff boundary are real architecture differences, but these samples do not isolate all variance or prove307.8ms causal overhead on phones. No replica optimization undertaken. Early post-rebuild samples and the initial observer-without-childList measurements are retained under explicit instrumentation-incomplete names and excluded from medians. Full methodology/raw samples in `performance-comparison.json` and `browser/`.

Final normal production-preview startup (separate from QA profile) records17local responses with one fingerprinted replica200/4,268,456bytes, no Classic Index, Vehicle, Gallery payload, Request internals or AI panel initially. Initial browser resource inventory and source-local deterministic AI support zero observed external inference requests; not a claim that existing font/consented-map/WhatsApp services never use external network.

### Exact existing files changed

- `src/App.tsx`
- `src/components/AIChatWidget.tsx`
- `src/test/workshop.test.ts`
- `src/test/spatial-scene.test.ts`
- `src/experimental/spatial/SpatialExperience.tsx`
- `src/experimental/spatial/scene.ts`
- `src/experimental/spatial/Content.tsx`

### New implementation/test/tool files

- `public/models/staging/toli-workshop-replica.b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225.glb`
- `src/experimental/staging/ClassicView.tsx`
- `src/experimental/staging/Recovery.tsx`
- `src/experimental/staging/StagingEntry.tsx`
- `src/experimental/staging/StagingPreview.tsx`
- `src/experimental/staging/asset-cache.ts`
- `src/experimental/staging/capabilities.ts`
- `src/experimental/staging/release.json`
- `src/experimental/staging/session-state.ts`
- `src/experimental/staging/session.tsx`
- `src/experimental/staging/staging.css`
- `src/experimental/staging/vehicle.ts`
- `src/test/fixtures/stage2-approved-routing.json`
- `src/test/stage2-boundary.test.tsx`
- `src/test/stage2-cache.test.ts`
- `src/test/stage2-routing.test.tsx`
- `src/test/stage2-vehicle.test.ts`
- `tools/release-audit/stage2/profile-runtime.js`
- `tools/release-audit/stage2/profile.config.ts`

### Documentation and evidence

- `docs/TOLI-3D-STAGE2-STAGING-REPORT.md` (this report).
- `docs/TOLI-3D-PRODUCTION-MIGRATION-PLAN.md` (Stage2 implementation results appended).
- `docs/TOLI-3D-PRODUCTION-MIGRATION-CHECKLIST.md` (only proven items marked).
- `tools/release-audit/stage2/`: exact before/after hashes, validation logs, initial/final network intervals, versioning integrity, local profile config/runtime, comparison samples and browser captures.

Final production protection: homepage behavior NO change; Hero NO; Navbar NO; Navbar logo NO; navbar vehicle NO; Hero vehicles NO; production Inside TOLI NO; old workshop NO; authoritative branded replica/source NO; vehicle assets NO. App and classic AI visibility changes are explicitly reported above, not described as byte-unchanged. New staged copy is additive and byte-identical; no original asset overwritten.

The normal preview remains http://127.0.0.1:8153/Toli-2/#/3d-production-preview while session35046 is running. It is loopback-only. Temporary DEV8154and QA8155servers were distinct and stopped after QA; normal customer build contains no QA instrumentation. Other user preview servers were not stopped or reconfigured. Physical Android/TalkBack/tablet/driver/sustained-use validation remains open, alongside Stage3 packaging/rollback/SEO and production authorization.

Dedicated shader-program failure injection remains unperformed; the staging hook is implemented but its checklist validation remains open. Standard Vite build retains existing chunk-size/Tailwind advisory output; it was not suppressed.
