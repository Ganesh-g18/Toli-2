# TOLI 3D production migration architecture plan

Date: 21 October 2026. Scope: repository audit and future implementation design only.

**3D PRODUCTION MIGRATION ARCHITECTURE = READY** as a documented design, conditional on the gates below. **PHYSICAL ANDROID VALIDATION = STILL REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** No optional harness was added: it would modify routing before the outstanding physical gate and is unnecessary to resolve the architectural decisions.

## CURRENT STATE

Approved experimental route: `/Toli-2/#/3d-experience`. Traditional `/Toli-2/#/` remains primary. Branded runtime `public/models/toli-workshop-replica.glb`:4,268,456 bytes, SHA256 `b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`;46,411 triangles,85,785 vertices,29 meshes,21 materials,9 textures. Historical desktop observations:19 initial/90 Vehicle draw calls; comparable updated warm useful-frame median UNMEASURED; actual Android performance UNVERIFIED. Replica, integration and official branding gates passed locally. Final branded physical gate remains USER TEST REQUIRED.

Official source `src/assets/big-transparent.png`1483×352 transparent RGBA, SHA256 `4809ffd3bde9be888071d5b4c3e90a0f58e627cc2a07f20c49e625a38b1cf590`. Preserve exact artwork, colors, aspect and alpha; pale backing is acceptable, pixel alteration is not. No source/GLB/vehicle/camera/material changes in this task.

Retained automated baseline:414 tests/56 files; build, both TypeScript checks, QA configurations and lint PASS. This documentation task did not rerun those checks or modify tests.

## MIGRATION GOAL

Future ownership tree:

```text
Static HTML + lightweight React shell (official logo/status/Standard View)
  shared theme + canonical Request provider + route/error policy
    exactly one active experience
      Spatial route -> one renderer -> workshop -> optional Vehicle
      Standard route -> existing traditional Index, loaded on intent
    shared services / Journey / Gallery / verified content / local AI
```

Keep the physical workshop as the 3D interface, with native Locations, Help and Request shortcuts. Do not mount the traditional homepage behind it. This is a reversible entry policy, not deleting Index or copying spatial code into the homepage.

## ROUTING ARCHITECTURE — ACTUAL AUDIT

| Concern | Current implementation and consequence |
|---|---|
| Entry | `index.html` loads `src/main.tsx`, which initializes theme/palette/section links, imports global and journey CSS, then mounts App. `#root` has no useful pre-JavaScript content today. |
| Router | `src/App.tsx`: React Router `HashRouter`; `/` renders eagerly imported Index; `/3d-experience` is lazy SpatialExperience; `/enquire-now` is the lazy canonical direct request page; three policy routes; `*` renders NotFound. |
| Base | `vite.config.ts` sets `/Toli-2/`; model resolvers use `import.meta.env.BASE_URL`. HashRouter routes do not include that physical base. |
| Hosting | `.github/workflows/deploy.yml` builds with Node20/npm ci and uploads `dist` to GitHub Pages on push to main. This is repository configuration, not proof of current deployed contents or cache headers. Do not push/deploy this plan. |
| Refresh | Fragment is not sent to server; `/Toli-2/` is the document request. Correct base-hosted index must exist. Path routes such as `/Toli-2/3d-experience` are not equivalent and are not promised to work. |
| Spatial deep links | `locations.ts` stores `workshopLocation` in the document query, before the hash: `/Toli-2/?workshopLocation=vehicle#/3d-experience`. Invalid/missing values normalize to Overview. |
| History | Spatial uses `history.pushState` and listens to `popstate`; internal destinations update the same mounted scene. React Router does not receive every raw pushState as a routed navigation. |
| Route transitions | `PageTransition.tsx` keys its subtree by router pathname+search. Moving destination state into router search without addressing this would remount the spatial experience and lose resources/state. |
| 404 | NotFound logs a console error, shows a semantic404 and home Link. Hash404 is client-rendered; it does not produce a server HTTP404. |
| Legacy section links | `section-links.ts` normalizes `#services` to `#/#services` and observes DOM for traditional section IDs. These assume Index at root. |

### Proposed future route contract — not implemented

Keep HashRouter and `/Toli-2/`. Do not require host rewrites or HistoryRouter.

| Future URL | Contract |
|---|---|
| `/Toli-2/#/` | Entry policy: classic-primary today; future3d-primary only with explicit release authorization. |
| `/Toli-2/#/classic` | Explicit traditional Index, regardless of default mode. Customer wording **Standard View**. |
| `/Toli-2/#/3d-experience` | Stable explicit3D entry, regardless of session preference; retain experimental bookmarks. |
| `/Toli-2/?workshopLocation=services#/3d-experience` | Existing destination contract retained; do not invent a second scheme now. Vehicle/Reception similarly supported. |
| `/Toli-2/#/enquire-now?service=service-premium-detailing` | Existing canonical direct service-request page; distinct hash-router query, not document destination query. |
| Policy and unknown routes | Preserve policies/catch-all. Unknown routes must not be silently redirected to3D. |

In future3d-primary mode, root can render SpatialExperience directly without redirecting the browser. Root destination links may use the same document query; explicit3D links remain stable. Centralize URL parsing/building in one adapter: accept only known destination IDs; preserve unrelated legitimate query parameters/base; normalize malformed destination with replaceState, not an extra history entry. On Standard View entry remove `workshopLocation` from its visible URL and retain last spatial destination in session memory. Explicit3D route/deep links take priority over the session's default-view preference.

Compatibility rule: legacy root section URLs `#/#services`, `#/#gallery`, etc. must continue selecting Standard View and its exact section rather than becoming a3D Overview. Extend the section-link adapter and classic anchors (`#/classic#services`) together during the authorized implementation. Audit hardcoded `pathname==='/'` assumptions such as `AIChatWidget` (currently hidden on other paths); simply adding `/classic` would hide the classic assistant. Direct Request back/home behavior must also use the experience adapter instead of assuming `/` is always classic.

Back/Forward within3D navigates the existing scene, does not re-key the renderer or fetch the GLB. Native Links handle cross-experience navigation. Add `hashchange`/router coordination through one URL adapter rather than competing listeners. Destination updates must be idempotent and close Locations with correct focus. Refresh at Vehicle: shell -> workshop prepared/rendered -> restore destination -> deferred Vehicle import/load; Request/Locations remain usable meanwhile. A refresh naturally creates a new renderer and may revalidate assets; do not promise zero network across document reloads.

## 3D PRIMARY ARCHITECTURE / CLASSIC FALLBACK / USER CHOICE

Future entry policy states: `classic-primary`, `3d-staging`, `3d-primary`, validated at build time with default `classic-primary`; unknown/missing values fail closed to classic-primary. This is a proposal, no flag exists yet. Staging keeps root traditional while exercising production-equivalent shell/recovery at explicit3D route. No remote flag service.

Standard View appears as a native accessible link in the loading shell, normal3D header/menu and recovery. Keep it visually restrained during healthy use; it is not an error indicator. Classic provides **3D Shop** return action. Explicit Standard View choice may store only `standard` in sessionStorage; explicit3D choice clears/replaces it. Storage failure must not prevent either action. No device-classification/localStorage bad-device flag. Default choice may persist only for the tab session; never permanently lock out3D after one visit or transient failure.

Root honors explicit session choice; direct `/classic` and `/3d-experience` always resolve as requested. Automatic failures show a recovery state with Standard View/Retry rather than silently changing location. User decides when to continue. Standard View can load without initializing a spatial renderer. Existing traditional Hero/Facility may use their own current3D features: Standard View is not inherently a WebGL-free site. Before calling it a robust WebGL fallback, verify all those components' static/lightweight fallbacks and prevent automatic heavy/WebGL initialization in an explicit graphics-unavailable session. Keep real business content usable without WebGL; do not redesign traditional production as part of this plan.

## CAPABILITY DETECTION / REDUCED MOTION / PERFORMANCE

Attempt required API availability before scene start: WebGL2 context creation needed by the current Three renderer; dynamic import, ResizeObserver, IntersectionObserver and relevant core APIs used by scene code. If a required observer is unavailable, use a small supported fallback or offer Standard View; avoid a complicated benchmark. Prefer observing the real renderer's creation success so there is no second probe context. Failed initialization and real resource/parse/render failures are evidence; phone names, UA lists, price, core counts and absent optional deviceMemory signals are not eligibility gates.

Reduced motion preserves the workshop and vehicle: retain immediate camera transitions and reduced entrance motion (`transitionDuration` already returns0). It does not select classic or remove geometry. Treat save-data/network hints as optional user-sensitive loading choices, not permanent exclusion. Slow startup alone never forces a downgrade.

Preserve current bounded DPR and demand rendering as provisional defaults, not newly certified budgets: existing resize cap1.25 narrow/low-memory, otherwise1.5; environment128/256; antialiasing selected at context creation. Android evidence is required before changing DPR, AA-on-rotation, contact shadow, environment resolution, camera/framing, touch thresholds or introducing automatic performance adaptation. Do not drop identity-defining architecture or swap back to generic v2.

Provisional asset ceilings already used in replica pipeline:6MiB,65k triangles,120k vertices,30 batches,10 images,40MiB estimated texture memory. Current model is within them; these are review bounds, not phone usability proof. Preserve deferred Vehicle (~90 draw calls in historical view); do not preload it to hide a hitch. Measure updated useful-frame medians with consistent build/cache/viewport/device methodology when tooling exists; UNMEASURED is valid until then. No telemetry/analytics introduced.

## FAILURE FALLBACK / ERROR BOUNDARIES / NETWORK FAILURE

Current facts: Spatial catches scene import/creation, GLB parse/load and render exceptions into `failed`; failed UI offers Locations and critical flows, but has no Retry or explicit Standard View action. `ContentBoundary` protects destination content and resets on destination change; `AssistantBoundary` protects AI. No enclosing App/3D-route boundary was found. ServiceRequestSteps is lazy under Suspense with no dedicated error boundary. GalleryImage renders an unavailable slot on individual image failure. Vehicle loader failure sets optional unavailable state. Context lost shows recovering and restoration re-prepares, but no final unrecoverable-loss policy exists.

| Future state/failure | Proposed action / isolation |
|---|---|
| Shell/application route chunk rejects | Shell-owned React boundary outside route Suspense shows unchanged official logo, native Standard View anchor and reload/retry. Keep boundary module lightweight. If core JS cannot boot, static HTML/noscript contact/standard content remains usable. |
| WebGL/context creation fails | No spinner loop. Branded recovery, **Continue to Standard View**, **Try3D again** only on user gesture; dispose partial renderer safely. |
| Workshop HTTP/parse/required resource fails | Mark failed, stop active startup work, keep Request/Help/Locations; recovery actions above. Do not instantiate a second scene to retry. |
| Fatal shader/program failure | Audit Three error behavior: a shader error may be logged rather than thrown. Add scoped required-program/link failure handling before declaring ready; restore handlers on teardown. Verify against staging injection, no user-facing shader logs. |
| Temporary context loss | Pause frames, accessible restoring status, retain logical state; restore/reprepare the existing renderer. Do not navigate away based on a short elapsed interval. |
| Repeated/unrecoverable context loss | A failed restore/reprepare or explicit user cancel can enter recovery. Record attempted restoration locally only; bounded retry policy must be verified on real hardware. No endless automatic restart loop or permanent ban. A long wait offers choices; time alone does not classify failure. |
| Vehicle error | Workshop/Services/Reception/Request/Locations remain available. Restrained Vehicle unavailable message; scoped optional retry later, no wholesale route failure. |
| Gallery image error | Keep reserved unavailable slot and next/previous/close usable; no fake replacement photo. Chunk errors stay inside destination boundary. |
| Request chunk/form render error | Dedicated provider-dialog boundary retains close/focus and link to canonical `/enquire-now`; direct page gets its own boundary. Both continue using the same form state/hook, never two booking systems. |
| AI error | Existing local boundary closes cleanly; Request/Locations/workshop remain active. |

**Retry gap:** `src/lib/workshop/scene.ts` caches URL->Promise<ArrayBuffer>, including rejected promises, without automatic retry. Merely remounting3D cannot recover that failed URL in the same document. Proposed explicit `retryWorkshop(url)` evicts only a failed entry for that version and starts one deduplicated request. Keep successful byte cache, never cache live GPU objects. Do not append random cache-busting timestamps or retry forever. A rejected lazy import may also need a bounded full reload to recover browser module failure; do not promise React boundary reset alone will refetch it.

Fetch currently has no explicit abort/timeout owner. Introduce a small download-owner API during implementation, accounting for shared consumers: cancel only when no active consumers remain; do not abort a request another view uses. Pending slow network keeps truthful indeterminate status and Standard View/Cancel choices. Do not implement a short arbitrary timeout that auto-downgrades. Confirmed network failures settle to recovery. A user's Cancel/Retry can terminate/restart a stalled operation. No offline/service-worker support is claimed; currently no service-worker registration was found. Offline first load of uncached application cannot be guaranteed.

## LOADING SHELL / FIRST USEFUL FRAME / VISUAL TRANSITION

Current Suspense says “Loading page…” and spatial initialization says “Preparing the workshop…”. Proposed real static HTML/CSS shell includes unchanged official PNG at correct ratio on pale backing, accessible indeterminate status, Standard View and basic contact/request access. Keep shell independent of heavy Index and scene chunks. No fake percentage. “Opening workshop” only when a known parse/preparation stage exists; do not report downloaded bytes as overall readiness.

First useful frame = recognizable loaded workshop + usable semantic navigation, after successful prepare/render and a browser paint opportunity. Current `onState('ready')` follows a renderer submission; strengthen instrumentation in isolated QA to verify model presence and usable controls, not just canvas or submission. No need to wait for Vehicle, all photos, Request form or AI UI. Reveal as soon as ready, with optional restrained opacity transition; zero artificial minimum delay, reduced motion removes movement. Loading/recovery screens never trap users away from business flows. Keep loading status outside renderer lifecycle so it survives crashes.

## SHARED BUSINESS LOGIC / SERVICE REQUEST / GALLERY / TOLI AI / THEME

| Domain | Actual shared authority / drift risk / future ownership |
|---|---|
| Services | `src/lib/service-catalog.ts`, imported by classic Services, spatial Content, request and AI knowledge. Preserve nine ordered entries/default Automobile Services; no second list. Spatial `service` selection is local Content state, separate from classic journey state. |
| Journey | `HowItWorks.tsx` owns the four literal step definitions; both experiences reuse the component. Spatial injects JourneyContext with local step state; classic has JourneyProvider. Shared definitions already single-source, but UI/context coupling is heavy. Extract definitions only if future shell/component split needs it, preserve wording/default first step. |
| Request | App-level ServiceRequestDialogProvider, lazy ServiceRequestSteps, `use-service-request-form.ts`, `service-request.ts`, vehicle-brands combobox and enquiry-handoff shared by modal/direct page. Preserve validation, manual brand/optional model, consent/review, service preselection, error retry and focus/visualViewport handling. Current submission is synchronous WhatsApp draft handoff; this path does not call a booking API/database. Do not invent a backend migration. Existing integration modules are not evidence of form API use. |
| Drafts | Module-level `requestDrafts` Map keyed by service; shared during SPA lifetime, not persistent after refresh. Preserve current behavior; no localStorage customer-data persistence added. Keep provider above experience switch. Restore focus to a connected trigger or explicit surviving route control, never a detached mesh/button. |
| Gallery | `lib/gallery-images.ts` single16-photo/metadata/responsive URL collection; both reuse Gallery and GalleryImage. Eager glob produces URL metadata, not proof all image bytes fetch immediately. Keep image/lightbox work deferred and per-image failures local. |
| AI | Both use ToliAIPanel/local engine and `src/ai/knowledge.ts` (services plus contact/address). No external inference request found in those modules. Preserve deterministic ₹0/query/no key/database/cloud/telemetry; WhatsApp external handoff is a separate intentional business action. |
| Verified business content | Contact/address also appear in Contact/static index JSON-LD. These repeated literals can drift. Propose one verified business-content export consumed by classic/spatial/AI and build metadata generator, without guessing hours, guarantees, prices or statistics. Preserve existing distinctions in Why TOLI copy. |
| Theme | `site-theme.ts` and index early script share `toli-theme`; document theme event consumed by3D. Initialize once above routes, keep user preference across both experiences; no separate spatial theme store. |

Future session state owner, above experience routes: selected service, process step and last spatial destination (non-sensitive). Do not retain renderer in this state. Today `SpatialContent` remains mounted between non-Overview destinations, but unmounts at Overview; all spatial state unmounts across classic/route refresh. Cross-view persistence is **not** currently guaranteed. Lift only the intended logical state before promising back/forward or ten-cycle persistence. Canonical request drafts retain their existing service-key contract; do not conflate them with service-panel selection.

## CODE SPLITTING — ACTUAL OPPORTUNITIES

`App.tsx` eagerly imports Index, which imports Hero, Facility, Gallery, AIChatWidget and journey UI. `main.tsx` imports extensive classic CSS. Thus lazy SpatialExperience alone does not give a lightweight3D-first entry. Future: lazy Index behind Standard View/entry policy, move classic-only CSS behind its boundary while testing theme/cascade stability; keep critical shared style/logo/status minimal. Measure emitted entry imports in the final production build rather than inferring network sizes from source.

Spatial dynamically imports scene; Vehicle module loads on destination intent; Gallery/HowItWorks and AI panel lazy; ServiceRequestSteps lazy on modal/direct-page use. Preserve those boundaries. Spatial imports `loadWorkshopBytes`/dispose utilities from the broader traditional workshop scene module; consider extracting neutral cache/dispose functions into a small module after bundle inspection, without duplicating cache ownership. No gratuitous preload of classic/Vehicle/AI/Gallery. Preload only the required current workshop/scene once justified by actual production traces.

## ACCESSIBILITY / SCREEN READER

Locations remains semantic navigation for all eight destinations, with named headings, current-location indication and focus restoration. Each physical object maps to the same native destination action, not a raw geometry requirement. Overview has semantic introduction/quick links; Services has labeled selector/descriptions; Vehicle has illustrative/non-diagnostic text plus request; Journey four accessible step buttons; Why TOLI verified content; Gallery captions/dialog controls; Reception business contact/Request; Help local assistant entry.

Maintain visible keyboard focus, Escape behavior, dialog focus traps/inert background, form errors/labels, Gallery next/previous/close and lightbox focus return. Pause camera/frames behind modal/dialog. Do not use Standard View as an excuse to remove3D semantics. Mobile TalkBack and physical keyboard behavior remain UNVERIFIED until exercised; require real testing. Traditional SkipToMainContent should continue at `/classic`; add equivalent skip-to-navigation/content access to future shell. No forced camera animation for screen-reader users; reduced motion as above.

## SEO / INDEXABLE CONTENT AUDIT

Current static index contains title/description/social tags, robots index/follow and AutoRepair JSON-LD; visible root content is client-rendered. Vite emits canonical/og URL and single-root sitemap only when a valid HTTPS `VITE_SITE_URL` is provided; workflow currently does not set it. `robots.txt` allows crawlers, contains no sitemap URL. No SSR/prerender pipeline found. Hash destinations are not independent server documents and `/classic` hash cannot alone guarantee crawler/no-JS access.

Smallest robust improvement before3D-primary: preserve existing metadata/verified structured data; add meaningful static/noscript business/services/contact content in entry HTML generated from the same authority, no invisible keyword copy. Keep classic native link and verify actual JS-rendering crawler content in release audit. Do not claim SEO parity from a canvas or sitemap. If independent service documents become a business requirement, scope a separate prerender/static-document task; no router/hosting migration justified solely by this plan. Indexable claims must remain accurate; audit existing metadata assertions separately rather than copying them into new guarantees.

## ASSET CACHING

Observed local Vite preview revalidates public GLB with no-cache/ETag; this is not evidence of deployed Pages headers. Imported logo/Gallery URLs are build-fingerprinted; public workshop and Vehicle paths are stable, which can serve stale bytes across releases. No global cache disable.

Proposed production release manifest binds schema/version and SHA256 for workshop/Vehicle, logo and entry build. Preferred: build-generated content-hashed model filenames in published artifact, resolved through BASE_URL from the manifest/module. Editable source/public authoritative files remain unchanged; generate runtime copies in dist at release packaging. Both3D and classic need their respective approved model identities; never substitute replica for v2 globally. Record map of original->published URL. If packaging cannot support hashed filenames, deterministic version query plus verified host/CDN query-cache behavior is a secondary option, not a claim of safety without validation.

Serve/cache hashed binaries/images/chunks as immutable only where host policy permits; HTML/release entry must revalidate. Test actual deployed headers/ETags; GitHub Pages doesn't imply custom-header control in this repository. Keep current+previous release's referenced hashed files in deployment artifact across rollout/rollback so stale HTML/old open tabs don't hit missing chunks. No service worker added. Old assets cleanup only after explicit retention policy, never as part of this planning task. Browser byte cache can be reused after Standard View return, but recreated GPU objects must be fresh.

## LIFECYCLE / MEMORY / MOBILE / TABLET

Spatial owns one WebGLRenderer and one context for workshop, Vehicle and physical signs. No extra logo/Gallery canvas. Existing disposal removes observers/listeners/RAF/geometry/materials/textures/environment/vehicle and canvas. On Standard View switch, unmount/dispose spatial before standard mounts; do not keep it rendering underneath. If traditional has its own renderer lifecycle, ensure spatial releases before that acquires one. At most one **active experience-owned** renderer; actual old context destruction can be asynchronous and must be measured. Do not add forceContextLoss in normal navigation merely to satisfy a counter.

Return to3D: load retained browser/cached bytes if valid, create one fresh scene/context, restore logical state, no retained disposed GPU roots/listeners. Current shared cache retains successful bytes for each URL until document ends; avoid an unbounded map of release URLs. Test10 full3D↔Standard cycles with allocation/retained listeners/canvases/RAF plateaus after settling/GC, no monotonically increasing retained resources. No forced GC assumptions in customer runtime. Failed/unmounted async completions must dispose their results and not update the next route.

One responsive architecture: existing mobile camera, sheet Locations, bounded DPR and touch handlers. Tablet warrants separate portrait/landscape matrix: 600 camera and768 quality/UI breakpoints differ; width alone is not tablet capability. Test touch targets, safe areas, split screen, keyboard viewport, landscape AA/DPR branch, full car framing. Do not finalize changes without real Android evidence. No separate mobile site or tablet UA rules.

## SECURITY

No new keys, network services, telemetry, databases or filesystem access. Current spatial diagnostics require DEV+debugSpatial; performance/enquiry QA are explicit build flags. Production release must assert all audit/profile flags off, no injected QA profile plugin/fixture/debug routes/controls or local source paths in customer UI. Model metadata export extras should expose only intended destinations, not private local paths. Source provenance remains in repository docs, not UI.

Source scan found localhost strings in unused-looking Supabase preview-auth integration allowlist and tests, not spatial asset URLs; verify reachability in production bundle before altering unrelated integrations. Do not claim all repository localhost strings are a leak. Future asset resolver must use BASE_URL, not LAN/loopback URLs. Existing Google font preconnect/consented Maps and WhatsApp are separate current external services, so “no AI cloud inference” does not mean zero external network. Preserve existing consent and handoff safeguards. No public endpoint or debug port added here.

## RELEASE FLAG / STAGED ROLLOUT / ROLLBACK

Proposed build-time `VITE_EXPERIENCE_MODE` enum defaults classic-primary; no remote runtime-config fetch. Future root ExperienceEntry reads it, with explicit route/user choice override described above. The flag alone is **not instant rollback**: changing a compiled flag needs a new build. Exact rapid rollback mechanism is separately prebuilt artifacts:

1. During an approved release, build and verify a `classic-primary` fallback artifact and the proposed3d-primary artifact from the same tested commit/base/manifest. Record artifact IDs, hashes, asset inventories and deployment SHA; retain an independently known-good traditional release too.
2. Keep all route functionality/canonical Request in both artifacts; bundle retained current/previous hashed assets for open-tab compatibility.
3. A future manually authorized rollback workflow deploys the retained verified classic-primary Pages artifact by pinned ID, without rebuilding source or changing DNS. Current workflow only supports push-main build/deploy; this manual rollback path must be implemented/rehearsed before cutover. If artifact missing/expired, fall back to rebuilding the pinned known-good classic tag: slower, explicit emergency path, never pretend instantaneous.
4. Verify root traditional, `/classic`, direct Request/policies, no spatial startup at root and old asset availability. CDN/browser revalidation may delay visibility; measure it, do not promise zero seconds. Preserve previous artifact until rollback smoke test completes. User preference cannot override an emergency classic-primary default at root into automatic3D; explicit3D route may remain optional unless specifically disabled for a fatal release.

| Stage | Authorized future gate | Current disposition |
|---|---|---|
|0|Traditional production unchanged; plan and freeze artifacts|Current; this task only documents|
|1|Actual branded Android test, preferably lower-end+midrange; issue fixes/retest if any|BLOCKED on real-device results|
|2|Explicitly approved production-equivalent3D staging shell/routing/recovery; traditional root unchanged|Not implemented|
|3|Full automated, lifecycle/memory/failure/SEO/visual/accessibility/real-device release-candidate audit; rollback rehearsal|Not started|
|4|Separate explicit approval, deploy verified3d-primary with `/classic` fallback and release manifest|NOT AUTHORIZED|
|5|Post-deploy actual URL/device checks, request no-send smoke, cache/errors and rollback decision; no new analytics|Not started|

## AUTOMATED TEST PLAN / IMPLEMENTATION ORDER

Future work packages (each reviewable; no execution here):

1. Route/session adapter and shared logical state; lazy classic/code-split audit. Preserve legacy anchors, Request policies and AI classic visibility. Implement enum defaults with tests in isolated staging first.
2. Lightweight HTML/React shell, global/route/optional-flow error boundaries, Standard View/3D Shop navigation. Canonical provider remains above routes, not duplicated.
3. Explicit failed-cache retry/ownership cancellation, real readiness/error signals and bounded recovery. Preserve optional-load isolation, one-renderer lifecycle and reduced motion.
4. Hashed release packaging/retained artifacts and manual rollback workflow. Audit production bundles and actual staging headers; no production route switch yet.
5. Run release checklist below, physical validation on final candidate and explicit go/no-go approval. Do not treat architecture-ready as deployment-ready.

| Test family | Required assertions |
|---|---|
| Routing modes | Default/invalidflag classic; staging root classic;3d-primary root3D; explicit classic/3D; policies/404 unchanged; BASE_URL correct. |
| Legacy/deep link | Both section formats, malformed destinations, Services/Vehicle/Reception refresh, URL query spaces; no render remount on destination-only history. |
| Choice/history/theme | Standard session storage works/denied; explicit3D override; Back/Forward sequence Overview→Services→Vehicle; selected service/process step and shared theme restored. |
| Failure/retry | WebGL unavailable/init exception, GLB404/reject/parse/program error, failed cache explicit retry, retry success/failure, never endless retries; slow pending load offers choice without forced downgrade. |
| Context | Genuine loss/restore simulation in desktop staging; restore-preparation failure/repeated loss recovery; no forced physical GPU abuse. |
| Optional flows | Vehicle fail keeps core operational; Gallery image/chunk fail local; AI failure closes; Request chunk boundary doesn't crash shell. |
| Business | Same service catalog/nine/default; Premium Detailing preselection; same draft validation/brand/manual model/review; blocked WhatsApp preserves data; no real sends in automated QA. |
| One owner |10 full route cycles: one active renderer/RAF owner, no old canvas/listeners/retained scene growth; late async disposal; cached bytes safe reuse. |
| Accessibility | Locations all8, tab/focus/Escape/dialog inert, Gallery controls; reduced motion keeps geometry; actual mobile screen reader separate. |
| Network/security/cache | Workshop once per document/version; Vehicle deferred once; Gallery/AI/Request on intent; no old GLB substitution/404 storm; flags off/no local endpoints; old HTML can fetch retained hashes; offline claims absent. |
| Release | Production build, both TS, QA configs, lint, full suite without weakening414baseline; published artifact hashes/static metadata/rollback smoke. New exact counts recorded after implementation. |

## PHYSICAL DEVICE DEPENDENCIES / MIGRATION BLOCKERS / FINAL RECOMMENDATION

Unresolved release blockers: actual branded Android validation (including touch, orientation, keyboard, background, Vehicle reentry and10min use); updated comparable warm useful-frame measurement if reliable instrumentation exists, otherwise explicitly unmeasured with no performance claim; real TalkBack testing or explicit documented unverified accessibility gate; shell/capability/recovery and route-boundary implementation; failed-cache retry; legacy-route/classic AI assumptions; logical state persistence; classic no-WebGL robustness; fingerprinted GLB packaging and host cache verification;10-cycle memory test; rollback artifact/workflow rehearsal; deployed SEO/content audit; separate migration approval.

Do not finalize DPR/AA/environment/contact-shadow/automatic adaptation/camera/touch thresholds until physical observations justify them. Architectural routing/single-source/caching decisions can be designed now; their implementation/release behavior still requires staging evidence. No measured device threshold invented.

Recommendation: retain Stage0/1. Complete real branded Android test, then obtain authorization for Stage2 implementation using this plan/checklist. Planning is ready; application integration is not claimed implemented or production-ready.

## PRODUCTION PROTECTION / TASK FILES

Documentation-only task. No optional harness, route, flag, source, test, asset, build, deployment or workflow changes. Fresh SHA256 before/after audit covers364 source/public/editable-source/dependency/configuration/workflow/entry files with zero changes. Exact evidence: `tools/release-audit/migration-plan/before.json` and `protection.json`. Homepage, Hero, Navbar/logo, navbar vehicle, Hero vehicles, production Inside TOLI, approved older workshop, branded replica/source/official logo and vehicle assets unchanged. Only this plan, companion checklist and audit JSON evidence are created. No fresh regression necessary/performed; retained414/56baseline explicitly distinguished from new results.


## STAGE 2 IMPLEMENTATION RESULTS

21 October2026. Stage2 isolated implementation is explicitly authorized by the current task despite the still-unresolved physical gate. Production root remains traditional; no migration/deploy. Earlier “not implemented” descriptions above are the historical architecture audit, superseded for Stage2 by this section.

Implemented `#/3d-production-preview`, reusable `#/classic` Standard View/3D Shop path, lightweight official-logo shell, lazy Classic import, required capability checks and real renderer catch, route boundaries/retry, staging-only retry-safe workshop/Vehicle caches, fingerprinted identical replica copy/release manifest, existing one-renderer lifecycle, shared logical service/Journey/destination state, canonical Request, existing theme/Gallery/local AI and destination history. Source files/implementation matrix are enumerated in `TOLI-3D-STAGE2-STAGING-REPORT.md`.

Browser evidence: no eager Index/Vehicle/Gallery/Request/AI panel at startup; ten real Standard round trips0/1staging canvases with Premium Detailing retained; canonical preselection without sending; all8Locations, direct Reception/history, reduced-motion geometry, desktop context restore and Vehicle unavailable→Retry→ready. Healthy/recovery five-width sweeps, landscape safe-area correction and emulated tablet complete. Final artifact healthy console clean; one earlier old-tab Gallery chunk failure during local rebuild is preserved as evidence for future retained-chunk packaging.

Warm instrumented desktop medians: shell203.2ms; staged useful1361.4ms versus experiment1053.6ms, both19settled draw calls/1context. Small sample/variance, not phone metrics. Build, both TS, QA configs, zero-warning lint PASS;433tests/60filesPASS. No geometry/logo/camera/vehicle change. Existing protected source differences are App/AI visibility, opt-in spatial plumbing and tests only; exact hash audit in tools/release-audit/stage2.

Stage2 PASS is limited to this isolated implementation. Full release flag/root switch, automated retained-asset packaging, rollback deployment workflow, SEO/noscript and broader Request chunk boundaries remain Stage3/release work. Physical Android/TalkBack/physical tablet/driver/thermal/memory questions remain unverified. No production migration authorization follows from this pass.


## STAGE 3 RELEASE-CANDIDATE RESULTS

21 October2026. **STAGE3 RELEASE CANDIDATE = PARTIAL. PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** Earlier planning/Stage2 historical statements are superseded only by the specific results here. Full evidence/methodology: `TOLI-3D-STAGE3-RELEASE-CANDIDATE.md`.

Closed locally: actual invalid GLSL compilation/linking reaches Three's installed fatal-program callback, semantic recovery and explicit fresh-renderer Retry; guards prevent later prepare/render completion from overriding failed with ready. Test-only injector cannot activate in normal build. Added explicit current-release reload recovery for staged Gallery/Journey/AI/Request and Classic lazy failures, with focused alert/native Standard/close and honest draft-loss wording. No reload loop. Canonical request/state ownership preserved; staged Reception now forwards selected Premium Detailing through Vehicle→Standard→3D, correcting the reproduced gap without changing traditional/experimental form behavior.

Offline release packager `tools/release/pack.mjs` binds actual emitted build identity, merges/checks prior hash assets and staged GLBs transitively without old HTML or automatic pruning. Real A→different-hash B retained53old files; open A successfully loaded Gallery/Request/AI/Standard; blocked A Gallery503 stayed contained then explicit reload reached B. Final normal candidate `toli-c31024f8c85771f3a04c505d` has125current files/33retained normal-A files. This is **local packaging proof**, not a completed hosting pipeline: existing Pages workflow still uploads plain dist. The frozen deployment trigger/policy has not been changed. Prior public artifact bootstrap/retrieval, fail-closed retention integration, expiry/rollback rehearsal and actual host cache headers remain open. Do not publish plain dist assuming retained assets are already enforced.

Twenty real Standard cycles0/1staging canvases,1active scene after each return, stable17geometry/10texture samples, one workshop request per session;20scheduler cleanup cycles pass. Listener add/remove proxy counts are not live-listener/heap proof; real driver memory/GC remains unmeasured. Three full8destination rounds, direct/refresh Services/Vehicle/Reception, Back/Forward, canonical drafts/preselection, actual503 workshop/Vehicle retries,8second slow request, keyboard/focus, reduced-motion geometry and responsive healthy/recovery sweeps pass. All desktop/emulation, no phone substitution.

Same-method1280×720warm desktop medians: shell126.5ms, staging useful993.5ms, experiment1022.2ms,19settled calls/1context. Small3sample/host/cache variance; no universal speedup or phone claim. Final build/both TS/QA/zero-warning lint PASS; **446tests/62files PASS**, baseline preserved. Protection411existing files:401unchanged/10explicit hardening changes/zero unexpected. Models/source/logo/vehicle/Hero/Navbar/Index/production InsideTOLI/workflow unchanged.

Private-only handoff freshly detects192.168.1.14:8153, `/Toli-2/#/3d-production-preview`; physical checklist updated. Android/TalkBack/physicaltablet/realGPU/rotation/background/10min use UNVERIFIED; physical timing UNMEASURED. Do not migrate root/deploy/delete Classic/change primary release policy. Release-candidate PARTIAL reflects outstanding deployment-retention integration; physical gate independently remains REQUIRED.


## STAGE 3B — CANONICAL RELEASE PREPARATION

21 October 2026. **STAGE 3B DEPLOYMENT RETENTION = PASS** for local preparation and the non-deploying candidate workflow. Physical validation remains REQUIRED; production migration remains NOT AUTHORIZED.

Canonical command: `npm run release:prepare -- --previous COMPLETE_PREVIOUS_SCHEMA2_PACKAGE`. Stages: validate exact previous package → fresh private temporary Vite production build with emitted dependency manifest → validate current inventory/model/logo/base/entry → assemble bounded retention → validate full safe package → preserve complete prebuilt current and previous artifacts. Future publishable directory is `release-dist`; archives are `release-artifacts/RELEASE_ID`, with a registry. `npm run release:validate` verifies the exact target. Explicit `--bootstrap` is permitted only for an initial local/CI seed and cannot establish protection for an unknown public predecessor.

Retention now follows the actual emitted graph/inventory, not filename guesses: current plus immediately previous distinct release's current immutable dependencies. No old HTML becomes current. C excludes B's inherited A files. Shared identical paths are reused; changed stable model bytes require versioning. Same current identity as previous does not advance the window. Managed archives keep two complete packages; external previous inputs are read-only. Artifact expiry is a separate CI storage limit, configured90days; unavailable/corrupt history fails closed.

The manual-only `.github/workflows/release-candidate.yml` requires exact previous run/artifact or explicit bootstrap, validates source/tests/types/QA/lint/tool syntax, invokes the canonical command, validates `release-dist` and archives deterministic candidate/rollback artifacts. It has read-only permissions and no Pages/deploy action or push trigger. Its configuration and local equivalent commands pass; no remote workflow was run. The current production deploy.yml remains byte-identical and still uploads raw dist, as Stage3B section5 requires. Before any separately approved cutover, wire that publishing job to the pinned verified candidate artifact/output; never rebuild independently after validation. Root policy guard currently permits only classic-primary. An authorized future3D-primary implementation must explicitly update/test that guard and preserve a known-good classic-primary emergency artifact.

Local simulation uses A `toli-ecd69213c507813d1b3ea9ba` and normal B `toli-73b9da574a7cc0a9559c841f`. Open A loads old Gallery/Request/AI/Standard/Vehicle from B; fresh visitor gets B entry and correct fingerprinted model. B package:121 current +53 retained +2 metadata files,29,962,551bytes. Repeated equivalent inputs produce identical inventories. Previous full package survives in prebuilt archive, with no rebuild/activation. Eight CLI corruption cases fail nonzero. Permanent missing Gallery causes finite explicit recovery, not automatic reloads.

Build, both TypeScript checks, QA, zero-warning lint and460tests/63files pass.417 existing files audited:412 unchanged, five authorized tooling/test changes, zero unexpected; all application runtime/assets/live workflow unchanged. Stage3B report records exact measurements and source-map/privacy audit. Actual Pages headers, atomic/CDN visibility, remote artifact retrieval/expiry and real rollback deployment remain future rehearsal gates, not local claims. Physical Android/TalkBack/tablet/GPU/sustained use remain unverified; no new LAN handoff assumed.
