# TOLI workshop — CONTROLLED PRODUCTION PLACEMENT

Date: 20 October 2026. This section supersedes the former isolated-only placement status. The approved isolated report is preserved at [isolated-report.md](../tools/3d/toli-workshop/reference/production-placement/isolated-report.md). Source reconstruction approval remains unchanged.

## Placement and protected systems

The homepage order is Hero → four-panel SectionStack (Services, Components, Journey, Trust) → **INSIDE TOLI.** → Editorial Gallery → existing remaining content. Facility is a sibling after the completed stack, inside JourneyProvider, in ordinary document flow. It has no sticky positioning, snap points, synthetic scroll distance, wheel interception or tour sequence. Stack and Facility document boundaries were equal in browser measurements; Gallery remains the next sibling.

The lightweight Facility shell and scoped stylesheet reserve the stage before loading. Desktop section measurements were approximately 91–93% of a 1000px viewport; short and mobile screens use content-driven height and normal scrolling instead of clipping controls. The stage uses bounded viewport sizing. Heading, copy and controls adapt to both site themes while the architectural environment stays graphite.

The task baseline was captured before edits. Of the original 315 protected files, 312 remain identical; the three authorized integration points are `src/pages/Index.tsx`, `src/components/journey/JourneyProvider.tsx` and `src/lib/vehicle-scene.ts`. Separately, **84 Hero/Navbar/Gallery/Service Request/AI-related source files** match their task-baseline SHA-256 hashes. Hero, Navbar, navbar car, Hero cars, Gallery, Service Request and TOLI AI source were not edited. Existing uncommitted repository work was preserved; comparisons use the captured baseline, not Git HEAD.

Exact hashes and changed-file lists: [audit.json](../tools/3d/toli-workshop/reference/production-placement/audit.json). Focused owner diffs are beside that audit.

## Approved asset

The authoritative registry remains `src/lib/workshop/asset.ts`. Runtime path: `public/models/toli-workshop-web-v2.glb`, served beneath the configured Vite base. Size: **4,076,400 bytes**; 47,255 asset triangles, 88,459 exported vertices, 18 meshes/materials and eight embedded images. No source or runtime asset was changed.

- Blender source SHA-256: `c6d3bf1b6e64e67f493cae7c965e28506119079546943e704c66fbd316a66b13`
- Approved export and runtime-copy SHA-256: `b2461de9d4a12014e7cfbfaf692363f42a6bdf7018b75cd8e7bb7ec929f7dc98`

The scene represents the photo-documented workshop configuration. Customer copy adds no dimensions, capacities, certifications, operational statistics or diagnostic claims.

## Shared renderer and lifecycle

**JourneyProvider retains ownership of the existing below-fold vehicle renderer.** The production workshop client never constructs a WebGLRenderer. The existing vehicle controller exposes a small exclusive renderer loan. Borrowing cancels vehicle frames, detaches vehicle rotation input and moves the existing canvas into Facility. Vehicle resize, quality and theme callbacks cannot mutate the borrowed renderer. Returning restores renderer settings, current vehicle-theme exposure, the current quality-policy pixel ratio and the vehicle viewport. Service selection, process selection and inspection state stay with their existing owner.

The workshop retains one parsed scene, geometry, materials and textures through ordinary entry/exit. It pauses and returns the renderer when offscreen or behind an overlay. It does not dispose/recreate the owner on handoff. The production owner is authoritative for visibility; the isolated preview retains its own IntersectionObserver. This removes competing visibility gates, which had produced a blank frame during a full-page capture/resize stress case before correction.

Demand scheduling coalesces invalidations and has no idle loop. Initial readiness, direct camera changes, resize and resume can request a frame. Document visibility cancels pending work. On unmount, client observers, controls, handlers, owned environment, shadow target, model resources and pending work are released; the parent alone disposes its renderer. Late parse completion disposes its detached model. Failed downloads remain cached failures and are not retried indefinitely.

## Lazy loading and network

A **400px prewarm margin** is registered only after the real four-panel stack has mounted. This prevents the short Suspense placeholder from falsely putting Facility near Hero. The lazy boundary imports `src/lib/workshop/production.ts`; that module prewarms the authoritative asset byte cache. The parsed scene is created only when Facility becomes useful and can borrow the owner. If a user jumps directly down the page, the same owner is initialized through an existing below-fold vehicle dock.

Final Hero check: Facility `waiting`, **zero canvases and zero additional GLB requests**. Approaching Facility requests the workshop. Five complete scroll/theme/Service Request/AI cycles produced **zero additional GLB requests** within the same document. Development reloads and separate failure/reduced-motion documents have independent caches and are excluded from that lifecycle comparison.

Evidence: [hero-network.json](../tools/3d/toli-workshop/reference/production-placement/hero-network.json), [network-stress.json](../tools/3d/toli-workshop/reference/production-placement/network-stress.json), and the approach record beside them. The registry occurs in one lazy `production-*.js` chunk; the development preview HTML and fault fixtures are not production entries. The built runtime asset matches the approved export.

## Camera, lighting, glass and quality

The three validated views are Overview, Inside and Reception. Production opens in Inside so the central lane, trusses, red structure and workshop depth are visible immediately; the isolated preview keeps its approved Overview default. Overview fits actual transformed geometry with a margin; portrait framing preserves the useful horizontal field of view. Inside and Reception retain the isolated QA camera positions and bounded orbit/distance limits. Production Overview adds a restrained horizontal orbit limit. Presets are instant, including reduced motion. There is no autoplay or idle drift.

Lighting retains the neutral hemisphere, key/fill, RoomEnvironment, AgX exposure and graphite background from isolated approval. Embedded textures and reception glazing are unchanged. Reception was inspected in the shared renderer at desktop, tablet and mobile sizes; the glazed reception structure, opacity and depth remain coherent.

The scene reuses the existing `sceneQuality` / `sceneDpr` policy: a maximum DPR of 1.5 for desktop, 1 for standard/mobile/weak-hardware/Save Data. Hardware concurrency and available device memory only lower cost. One 1024px shadow map is used in desktop quality; lower quality disables dynamic shadows while retaining the actual model, embedded textures and environment. No screenshot or schematic substitution is made for mobile or reduced motion. Observed browser DPR was 1; high-DPR physical hardware was not measured.

## Interaction and accessibility

Desktop supports bounded horizontal drag, presets, rotate buttons and deliberate zoom buttons. Production disconnects OrbitControls' wheel and touch interception. `touch-action: pan-y pinch-zoom` reserves vertical scrolling and native pinch for the browser. Horizontal orbit engages only after at least 10px of horizontal motion with a 1.5:1 horizontal intent threshold. Vertical/diagonal intent is released; multiple pointers cancel orbit. Model pinch zoom is deliberately not enabled; explicit zoom controls remain available.

Focused touch-handler tests dispatch cancelable touch-pointer sequences for vertical flicks, reversed motion, diagonals, horizontal intent and multiple pointers. Native browser scrolling over the canvas and mouse drag are checked separately. **These tests do not constitute physical-phone finger testing.** The available browser control surface does not expose native touch injection, CPU throttling or network throttling; those checks are not claimed.

The section has a named heading, concise description, native keyboard buttons, meaningful labels, pressed-state presets and visible focus indicators. The canvas is supplementary and excluded from the focus order. A keyboard bypass scrolls/focuses Gallery while preventing a HashRouter navigation; it does not trap focus. Loading preserves dimensions and uses “Preparing workshop” without fabricated percentages. A real local 503 fixture showed the unavailable-state copy, disabled controls and preserved page/vehicle operation without retries or renderer disposal. An unavailable shared renderer also resolves to the same stable fallback instead of an indefinite loading state; that path has a focused regression test.

## Browser QA and performance evidence

Actual rendered viewport checks covered **1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360 and 320px**, plus 1366×600 short desktop and 844×390 landscape. All three views were exercised at each size: **42 view checks**. Recorded horizontal overflow was zero and canvas count was one. Browser screenshots and measurements are in [browser evidence](../tools/3d/toli-workshop/reference/production-placement/browser/viewport-metrics.json). Wide viewport screenshots from this browser surface can be limited to the physical panel width; recorded DOM viewport sizes and framing calculations accompany them. Full-document capture can temporarily change layout, so normal viewport captures are used for final visual evidence.

Sampled workshop draw calls: **14–19**. Rendered triangles: 46,259–47,315 depending on view; transparent material passes account for the small difference from the asset triangle count. Sampled settled CPU submissions during responsive view changes were approximately **0.5–2.5ms**; this is CPU submission time, not GPU frame time or an FPS benchmark. A first-render shader/setup submission of **331.6ms** was observed and is not hidden by the settled figures. No context is recreated during subsequent handoffs.

A local cold-transfer sample reported 4,076,700 transferred bytes including response overhead, 4,076,400 encoded asset bytes and about 1,627ms resource duration; decode was about 323ms and scene initialization about 1,059ms from controller creation. Other samples were cached/revalidated. These are local-server measurements, not WAN predictions. A separate cached sample decoded in about 219ms and initialized in about 540ms.

Idle frame count stayed **7 → 7** between observations. Offscreen state reported `paused: true`, `pending: false`, `visible: false`. Shared renderer counters first showed workshop resources alone (18 geometries/11 textures), then **77 geometries/12 textures** once the retained vehicle had also been drawn; the latter plateaued over the remaining stress cycles. These are shared renderer counters, not a workshop-only allocation total or complete GPU memory measurement.

Reduced-motion browser QA uses an explicitly local, development-only matchMedia fixture. It reported `reducedMotion: true` with the real Interior scene and no pending/idle animation. It does not change the operating system setting or emulate physical-device GPU behavior.

## Existing systems and stress checks

Services initially remains **01 Automobile Services** and Journey **01 Choose a service**. Changing Services to Battery, entering Facility and returning restored the imported vehicle (`toli-atelier-r7`) in the vehicle dock with Battery still selected. Journey step 02 likewise survived the handoff, after which both defaults were restored for the delivered page.

Repeated downward/upward jumps, reversals, view changes, theme changes and five complete overlay cycles kept one canvas, the same retained scenes and stable post-warmup resource counts. Gallery remained the following section, photographs stayed interactive and its lightbox opened above the scene, including arrow-key navigation and Escape. AI opened above mobile Facility and paused workshop work. Header Book Service opened the existing Service Request modal above Facility; Escape closed it and returned focus to Book Service. No Gallery, Service Request or AI source adjustment was needed.

Console checks distinguish the two pre-existing development React Router future-flag warnings from integration failures. No new normal-path shader/context, missing-texture, React lifecycle or ResizeObserver errors were observed. The deliberately injected 503 is confined to the failure fixture. The final built-site preview at port 8132 was inspected after all implementation changes: its console recorded zero warnings and errors. A repeated full-page capture/resize followed by normal re-entry rendered Reception correctly after the visibility fix.

## Validation and reproducibility

Run from the project root:

```
python3 tools/3d/workshop-preview/production-checks.py
```

This runs production build, application TypeScript, Node TypeScript, both workshop QA configuration checks, lint and the full test suite. It also checks approved runtime bytes, the lazy production bundle, exclusion of the isolated preview entry, original protected files and the frozen subsystem hash audit. The historical `checks.py` retains the earlier isolated-only contract and is not the production-placement runner.

| Check | Result | Seconds |
| --- | --- | --- |
| build | PASS | 8.8 |
| typescript-app | PASS | 10.96 |
| typescript-node | PASS | 1.66 |
| typescript-preview-config | PASS | 1.33 |
| lint | PASS | 4.97 |
| tests | PASS — 369 tests / 51 files | 53.13 |

All **369 tests across 51 files** pass. The initial CPU-loaded run timed out in one unchanged geometry test; the complete suite was rerun successfully without weakening its timeout or assertions. Build still emits the existing Browserslist-age, ambiguous Tailwind-utility and large-chunk notices seen in the isolated baseline. The built production browser console contains **zero warnings and zero errors**. The workshop lazy chunk is approximately 30.9kB (9.2kB gzip), in addition to already-shared 3D dependencies. Full logs and exact durations are saved in `reference/production-placement/regression-*`.

Focused tests cover placement order/outside-stack boundaries, lazy loading/no startup import, a single renderer constructor, owner borrowing/reuse, offscreen pause/resume, fallback/no retry, accessible controls/bypass, exact approved bytes, resource disposal and scroll-priority gesture handling. The two obsolete isolation expectations were intentionally narrowed to the authorized integration points; all other original file-hash guards and valid isolated tests remain.

## Files and remaining limitations

Important additions: `src/components/workshop/Facility.tsx`, `facility.css`, `src/lib/workshop/production.ts`, `drag.ts`, two focused test files and local QA configuration/check runner. Modified integration points: Index, JourneyProvider, vehicle-scene, workshop scene and the two superseded isolation expectations in workshop.test.ts. The approved Blender/export/runtime assets are unchanged.

**PHYSICAL DEVICE PERFORMANCE = UNVERIFIED.** Physical-phone touch feel and high-DPR GPU/memory behavior remain unverified. Native touch injection and CPU/network throttling were unavailable in the supplied browser tooling. No physical-hardware, sustained GPU timing or WAN performance pass is claimed. Native page scrolling remains authoritative by design; model pinch is not enabled.

CONTROLLED PRODUCTION PLACEMENT = PASS

WORKSHOP EXPERIENCE APPROVED

Approval covers the documented rendered-browser, lifecycle and synthetic gesture checks. Physical-phone GPU performance and physical touch feel remain explicitly unverified.


## FINAL RELEASE AUDIT — 2026-10-20

**BROWSER RELEASE READINESS = PASS. PHYSICAL DEVICE VALIDATION = UNVERIFIED.** No production source, design, camera, lighting, approved GLB, Hero or Navbar changes were made. This audit adds local-only profiling tools, evidence and documentation. No optimization was justified by a reproducible lifecycle defect. Cold-start hitches remain a measured limitation, especially for untested slower phones.

### Evidence and method

Evidence: `tools/3d/toli-workshop/reference/release-audit/`; browser snapshots and screenshots in its `browser/` directory. `release.config.ts` transforms only served QA modules to add phase marks; `release-audit-runtime.js` records WebGL CPU-call durations, PerformanceObserver long tasks, resource timings and lifecycle counts. Neither is imported by production. Run with the existing Vite binary and `--config tools/3d/workshop-preview/release.config.ts --host 127.0.0.1 --port 8133`; `?audit=frames` profiles GL calls and `?audit=lifecycle` tracks listeners/observers. Expand “Local release audit” and explicitly capture a snapshot. Instrumentation adds overhead; these are CPU wall/submission times, not GPU timings or FPS. Shader/driver caches were not forcibly cleared.

### First setup and first useful frame

| Phase | First trace (ms) | Expanded-query trace (ms) |
| --- | ---: | ---: |
| Workshop synchronous setup | 294.1 | 267.4 |
| Environment (included in setup) | 200.5 | 188.5 |
| GLB parse, asynchronous wall time | 176.2 | 193.5 |
| Scene insertion, bounds and fit points | 5.9 | 6.8 |
| Camera initialization | 0.2 | 0.2 |
| First **ready/model** render | 166.7 | 195.1 |

Loading-background renders precede the first ready frame and are not counted as the useful model frame. In the expanded trace, environment shader info/status queries cost 149.2 ms (program info log 83.0, shader info log 54.3, program parameter 11.9); shader source calls 5.5 ms. First model render: program info log 98.9 ms, shader info log 22.5 ms, program parameter 3.2 ms, texture uploads (`texSubImage2D`) 47.0 ms, buffer uploads 2.7 ms, shader source 4.6 ms. Approximately 15.9 ms of this render remains outside the wrapped calls. Compile/link entry calls themselves returned quickly; synchronization in later queries is measured, not proof that compilation itself was free. This identifies material/shader initialization and texture upload contributions without assigning all time to GLB size. Renderer setup outside environment accounts for roughly 79–94 ms, not independently attributed. No separate shadow-initialization attribution was obtained at this quality/viewport; do not extrapolate to every device quality tier.

The earlier 331.6 ms submission was not reproduced exactly. Another interaction run measured 228.9 ms for the first ready render and 100.8 ms for the first Overview render (newly visible resources); subsequent measured renders were 0.6–1.7 ms, median 0.8 ms. This is a cold-view cost, not sustained smoothness evidence. Observed draw counts across tested views were 14–19. No FPS or GPU duration is claimed.

**LONG-TASK PROFILE = AVAILABLE.** Expanded trace records an 834 ms combined first-owner startup task overlapping existing vehicle initialization and workshop setup, and a 199 ms task overlapping the 195.1 ms first model render. The interaction trace records a 103 ms task overlapping the cold Overview render, plus other page/UI tasks of 50–232 ms; those cannot all be attributed to the workshop. Parsing is asynchronous wall time and must not be summed as exclusive CPU time. Raw traces preserve task boundaries. Idle snapshots stay at 17 → 17 frames; reduced-motion snapshots at 4 → 4. Interactions, resize, theme, scroll return and overlay close generate demand frames; offscreen/overlay/hidden states gate them. Cold preparation remains observable, but no stuck state or recurring first-frame work appeared on normal reentry.

### Prewarm and network

Approximately **400 px**, unchanged. No expensive workshop work was moved into Hero. Hero snapshot contains zero workshop requests, marks or contexts. Approaching Facility requests the approved asset; loading remains intentional even on rapid jumps. The local traces do not establish that 400 px covers every real network or phone. No global preload or custom cache was added. In the ten-cycle stress document there is exactly one workshop resource entry throughout reentry, ten themes, five modal cycles and five AI cycles. Cache revalidation on a later document returned only 300 transfer bytes for the 4,076,400-byte encoded asset (server conditional request evidence is in `network.jsonl`); no repeated model transfer within that document. Separate fresh failure/reduced-motion documents intentionally initiate separate loads and are not counted as lifecycle duplicates.

### Stress, resource and cleanup results

PASS: ten top/Facility entry-exit cycles, ten dark/light toggles, five Service Request cycles, five AI cycles, six preset changes, and three bidirectional horizontal drag pairs. No duplicate workshop scene, controls, context or asset request appeared. Fully warmed workshop baseline → after cycles: **18 geometries → 18; 11 textures → 11; one context → one; seven controls → seven**. Workshop listener registration set stayed seven (section click; canvas pointerdown/move/up/cancel; document visibilitychange; canvas contextlost); workshop observers stayed two (unobserved IntersectionObserver, one active ResizeObserver). Vehicle listener count stayed three. These are targeted native-registration counts, excluding once/signal listeners, not a JS heap or universal event-dispatcher leak proof. Three controls’ change listener has paired removal by source review. No heap snapshots/forced collection were available.

Geometry counts are shared renderer counters: visiting previously unseen vehicle components can legitimately upload more geometry (a separate regression document reached 100 after vehicle views). Do not mistake cross-document/first-visibility resource counts for a workshop leak; the comparable warmed ten-cycle sequence stayed flat. Lifecycle tracking stores numeric weak identities rather than retaining DOM nodes. Source cleanup pairs four pointer removals, controls change removal/disposal, visibility/context listener removal, observer disconnect, geometry/material/bitmap disposal and renderer-loan release. Wheel/keyboard OrbitControls listeners are disconnected in the scroll-safe production path. Actual unmount collection was not heap-profiled.

Page visibility: local QA fixture exercised visible → hidden → visible onscreen and offscreen. Onscreen hidden had `pending=false`, `visible=false`; restored offscreen had `paused=true`, `pending=false`, canvas returned to `journey-webgl`. No extra loop/context appeared. These are simulated visibility events, **not actual phone background tests**. Idle and reduced-motion snapshots remained stationary between captures.

### Scroll, mobile and failure paths

Rapid top → Facility, top → Gallery, Gallery → Facility and reverse transitions passed; native scrollbar drag and wheel direction reversal were exercised. No persistent black/stale frame, canvas covering Gallery, active offscreen workshop, or stuck loader was observed. Transient subframe flashes cannot be excluded by discrete browser observations.

320×844 and 844×390 landscape: PASS for heading/text, model framing, buttons, AI launcher, Gallery transition and scrollability. Browser client widths were 310/834 after its 10px scrollbar; horizontal overflow was **0 px** at both requested viewport widths. Short landscape keeps controls below the model, with normal vertical scrolling. Vertical wheel input beginning on canvas scrolls the page. CSS/pointer review confirms `pan-y pinch-zoom`, horizontal-intent threshold, vertical/diagonal release and multi-pointer cancellation; no blanket `touch-action:none`. Native touch injection, actual finger feel, pinch and phone GPU performance are UNVERIFIED.

Failure fixture locally returned 503: stable unavailable message, disabled controls, Gallery lightbox usable, shared context one, no retry storm on return. Normal URL restored afterward. Missing-WebGL fixture created zero contexts and retained a structural fallback (no hidden replacement renderer). Reduced-motion fixture retained real 3D and buttons with one shared context and no idle frames; this overrides matchMedia locally and is not a physical OS accessibility test. Light theme, mobile and presets reuse the shared renderer. Forced failure can produce the expected network error; it is not included in the clean production-console baseline.

**CPU THROTTLING = UNAVAILABLE. NETWORK THROTTLING = UNAVAILABLE.** Browser capabilities advertise viewport/visibility only, with no throttle or native touch API. Host inspection found no existing ADB executable and no identifiable Android phone in USB inventory. No cloud service or file upload was used. **PHYSICAL DEVICE = UNVERIFIED.** Follow the separate phone checklist; heat observations must remain qualitative.

### Existing systems, production and frozen files

Services starts at 01 Automobile Services; Journey at 01 Choose a service. Selected Battery Services and Prepare your request remained `aria-pressed=true` after Facility ownership and return. Gallery/lightbox opens/closes without canvas interception. Service Request remains above 3D, locks scroll (`data-scroll-locked=1`), accepts keyboard focus within its dialog, closes with Escape and returns focus to Book Service. Existing focus-trap tests pass; no real enquiry was sent. AI opens/closes above the scene and remains separate from 3D. Repeated overlay cycles pause/resume through the existing ownership gate.

Fresh **uninstrumented production** tab, after Facility, Service Request and AI: **zero warnings/errors** (`browser/production-console.json`). Development-only React Router future-flag warnings were observed on the instrumented Vite server and were not hidden or misreported as production warnings. Build warnings remain the existing Browserslist age, Tailwind ambiguous class and large shared-loader chunk warnings.

Fresh regression: build PASS; app TypeScript PASS; node TypeScript PASS; isolated/production/new release QA configuration TypeScript PASS; lint PASS; **369 tests / 51 files PASS**. No valid tests removed or weakened, no new production logic/tests added. `release-checks.py` preserves the historical placement audit and verifies the original frozen subsystem hashes, every captured production source hash, approved source/export/runtime asset hashes, lazy production asset registration and absence of isolated preview HTML. No production source file changed during this audit; **Hero, Navbar, navbar car, Hero cars, Gallery, Service Request and TOLI AI changed: NO**. QA runtime is outside production entry points. Full command output and timings are stored in `regression.json` and its logs.

Phone checklist: `docs/TOLI-WORKSHOP-PHYSICAL-DEVICE-QA.md`.

**INSIDE TOLI = RELEASE READY** (browser audit). **PHYSICAL PHONE VALIDATION STILL RECOMMENDED.**


## PRODUCTION VISIBILITY DEFECT — investigation 2026-10-20

**Reported disappearance: NOT REPRODUCED as a persistent failure. No runtime fix claimed.** The user report remains valid input; the available browser evidence does not establish its cause. Do not interpret this investigation as proof that the reported device/session cannot fail.

### Reproduction

Opened the actual production homepage `http://127.0.0.1:8132/Toli-2/` and scrolled normally through Hero, Services, Components, Journey and Trust into Inside TOLI. At first entry the stage briefly showed “Preparing workshop”; after loading settled, actual roof trusses, red columns/doors, floor and yellow bay lines were visible. Also inspected `http://127.0.0.1:8130/Toli-2/`, including the user's existing long-lived tab without reloading it: recognizable workshop geometry was visible there too. The persistent blank condition has not been isolated. Requested clarification about waiting, return scrolling and device/browser while continuing independent checks.

MODEL INITIALLY VISIBLE: **NO during the normal loading state; YES once settled.** This is not evidence of a permanent loading failure. No loading screenshot is being mislabeled as a post-fix pass.

### Root cause and fix

**Root cause: UNCONFIRMED. Production changes: NONE.** No asset, camera, shader, material, light, transform, culling or shared-owner adjustment was justified by a reproduced failure. No diagnostic lighting/materials or extra renderer were introduced. A source change labeled a fix would be speculative at this point. The next useful input is the exact failing device/browser/session condition, or a local screenshot of the persistent blank stage with its loading/error text.

### Runtime, camera and canvas findings

The live development tab reported ready, canvas under the Facility stage, nonzero drawing buffer and successful model frames; these were checked alongside actual pixels, never used alone as visibility proof. Its measured model bounds were finite: min approximately (-8.28,-0.238,-32.15), max (8.28,6.468,6). Current production camera uses the existing interior pose; floor, doors, columns and ceiling are visibly in front of it. No alternate Overview camera was necessary to reveal the model. No zero root scale/NaN transformation, black-material failure or persistent loading cover was demonstrated.

DOM captures show one canvas owned by Facility, finite nonzero stage/buffer dimensions and a substantial visible intersection. Across verified widths its buffer ranged from 268×502 to 1716×529. Rendered geometry fills the intended stage; it is not hidden by section backgrounds or pseudo-elements in these captures. No viewport/scissor coordinate defect was reproduced. Source review shows the owner reparents the existing canvas, pauses vehicle work while borrowed, sizes the workshop to its own normal-flow host and invalidates on load, activation/resize/preset/interaction. The shared owner remains unchanged; no additional homepage renderer was added. The previous instrumented one-context result remains applicable to identical production code, but this screenshot pass itself counts canvases rather than claiming a fresh GPU-context measurement.

### Why earlier QA could miss a failure

Loaded/ready flags, draw-call counters and passing mocked tests cannot establish visible pixels. They can miss occlusion, bad viewport placement, a transient blank frame or a device-specific state. No exact explanation for the user's reported failure is established. During this investigation a first responsive-capture batch was discarded because the viewport override had targeted a different tab: labels alone were insufficient. The accepted batch verifies actual document client width against every requested width. Earlier reported PASS results must not substitute for reproducing the user's specific failure.

### Actual homepage screenshot validation

Accepted captures are in `tools/release-audit/visibility/browser/`. `visible-layouts.json` includes actual client width, drawing-buffer dimensions, DOM canvas rectangle and current ready state. `matrix.jpg` was visually inspected: recognizable roof structure, red doors/columns, grey floor and yellow lines are present. It is supporting evidence, not an isolated workshop preview.

Production homepage model visibly present at **1920, 1440, 1366, 1024, 768, 430, 390, 360 and 320px**, in both dark and light themes. Client widths were requested width minus the browser's 10px scrollbar. Wide screenshots can be physically cropped by the in-app panel; the visible stage portion contains geometry and full document width is independently recorded. Representative full stage: `browser/1024-dark.png`; mobile: `browser/320-light.png`.

Five native scroll-away into Gallery and upward returns produced visible workshop screenshots (`reentry-1.png` through `reentry-5.png`), with no preset/button action needed on those returns. No persistent blank/stale vehicle frame appeared. Fast normal initial entry resolved after loading. The preceding unchanged-code reduced-motion/failure and lifecycle audits remain evidence for those paths; they were not mislabeled as new native-device tests here. Physical phone performance and the originally reported device condition remain unverified.

### New visibility regression check

Added `tools/release-audit/visibility_check.py`, a local screenshot/DOM check. It rejects wrong actual viewport widths, non-ready states, missing/multiple/zero-sized/offscreen canvas, and screenshots without sufficient structural edge/contrast/red signal inside the canvas crop. **A ready flag plus a blank image fails.** Three negative tests cover ready-but-blank, zero buffer and mislabeled viewport. Twenty-four actual homepage screenshot witnesses pass the check; all were additionally visually inspected. This heuristic can detect a blank stage but is not general object recognition or a replacement for manual screenshot QA. No GPU readback or browser DOM mutation is used by the checker.

Run from the project root:

- `python3 tools/release-audit/visibility_check.py --self-test`
- `python3 tools/release-audit/visibility_check.py tools/release-audit/visibility/browser`
- `python3 tools/release-audit/visibility/checks.py`

Files added/updated are QA scripts, evidence and this report only. Hero, Navbar, navbar car, Hero cars, every captured production source and approved workshop GLB remain unchanged. Existing integration/full-site regression locks are not silently updated. Current screenshots prove **visible geometry on tested browser paths**, not that an unobserved reported defect has been fixed.

Validation for this investigation: production build PASS; app/node TypeScript PASS; all existing preview/production/release QA configurations PASS; lint PASS; **369 tests across 51 files PASS**, plus **3 negative screenshot-check controls PASS** and **24 manually reviewed screenshot witnesses PASS**. Production-preview asset response independently checked: HTTP 200, `glTF` magic, 4,076,400 bytes, approved SHA-256. Fresh production screenshot tab console contains zero warnings/errors. No runtime fix is claimed; the reported persistent failure remains unresolved pending reproducible conditions.


## INTERMITTENT VISIBILITY HARDENING — 2026-10-20

### Outcome and uncertainty

**Original user-visible persistent/intermittent blank: still not reproduced in the available browser. Original root cause: UNCONFIRMED. Diagnostics and event-driven hardening: READY.** Controlled zero-size, delayed decode, released ownership, hidden completion and context-loss orderings were exercised successfully. A separate context-restoration lighting defect was visibly reproduced and corrected. These are not proof of the user's exact failure environment. Physical-device validation remains UNVERIFIED.

### Confirmed lifecycle gaps and corrections

- Previously the scene published UI `ready` immediately after parse, before the first successful model frame, and its render gate did not require a valid viewport/camera/ownership combination. UI readiness now follows a successful model render. Asset-ready and visibly-rendered remain distinct diagnostic states.
- `workshopFrameReady` is the single render prerequisite gate: parsed model, active/unpaused client, correct canvas parent, visible document, available context, positive finite stage dimensions, finite camera/target/projection parameters and finite nonzero model transform. No model frame is submitted before those conditions converge.
- Idempotent `ensureFrame` refreshes stage sizing/projection and invalidates demand rendering. Activation, retained-lease reactivation, valid ResizeObserver dimensions, asset completion, page-visible return, presets and interaction all converge through this path. Repeated calls coalesce; no polling, autoplay or permanent watchdog was added.
- Full local-canvas viewport/scissor use CSS pixels with origin (0,0); scissor testing is disabled for the workshop. No sticky-stack DOMRect or screen Y conversion is reused. Caller viewport/scissor settings, size, DPR, color/tone mapping and shadow settings are restored on release. DPR policy remains capped, not multiplied twice.
- Provider registration can discover a late Facility host. Bootstrap prefers an eligible below-fold fallback dock over a stale Hero frame. Visibility restoration reevaluates the active client; context-restored reevaluation runs after the renderer's native handlers. This protects different callback orderings without moving prewarm into Hero.
- Transient context loss no longer destroys the shared renderer. Scheduling pauses, same-canvas restoration refreshes dimensions and invalidates. Acquisition waits while the owner explicitly reports transient context loss; a genuinely unavailable owner still produces the existing fallback rather than an endless loading state. Genuine GLB/render failures retain their fallback coverage.
- Visual context-restoration review caught a dark ceiling despite successful draw counters: the cached PMREM render target had lost GPU contents. The workshop regenerates its original RoomEnvironment/PMREM recipe **once**, only on a valid owned post-restoration frame. The vehicle client similarly rebuilds its original studio environment/reflection resources when it next legitimately renders. No lighting values, GLB, materials, camera composition or renderer count changed. Model bytes are not fetched/parsed again for context restoration.

### Files changed

Runtime: `src/lib/workshop/readiness.ts` (new), `scene.ts`, `production.ts`, `src/components/journey/JourneyProvider.tsx`, and `src/lib/vehicle-scene.ts`. DEV diagnostics: `src/lib/workshop/debug.ts` (new). Tests: new `src/test/workshop-visibility.test.ts`; targeted context-restoration coverage in `vehicle-lifecycle.test.ts` and `workshop-production.test.tsx`. The existing frozen-file test explicitly authorizes that changed lifecycle test; no Hero/Navbar hash or unrelated source exemption was added. The old context-loss test now verifies pause/restoration of the same canvas and regeneration of the original lighting; genuine fatal-render and GLB-failure tests remain intact.

`tools/release-audit/hardening/change-audit.json` records the exact seven existing changed files, three new source/test files and unchanged 84-file historical protection set. Historical full-site release locks were preserved, not silently rewritten. The scoped hardening check runner contains the explicit change allowlist.

### Development diagnostics and user-side capture

On the existing development server, open:

`http://127.0.0.1:8130/Toli-2/?debugWorkshop=1`

Reproduce the disappearance, expand **Workshop diagnostics**, then select **Copy Diagnostics** and retain/paste that local JSON with the observed behavior. The overlay is created before prewarm, so observer/registration failures can be captured even when no scene is acquired. It includes asset state, host registration/observer state, active eligibility, actual stage dimensions, owner/context, camera/model validity, frame requests/renders/last timestamp, document visibility and scissor state. A bounded **40-event** ring records registration/prewarm/load, viewport zero/valid, acquisition/release, frame requests/renders, visibility and context transitions. No telemetry, database, network upload, personal form data or URL history is collected. Copy occurs only when clicked and depends on browser clipboard permission.

The debug module is dynamically imported only through `import.meta.env.DEV` plus the explicit query. Production-build checks confirm **no `debugWorkshop`, “Workshop diagnostics” or “Copy Diagnostics” code/UI** in built HTML/JS. Normal customer UI has no statistics or technical labels. Debug output updates an existing text node to avoid triggering the application's child-list observers into a render loop. Mount/disposal reuses one panel per host and removes it on cleanup.

### Controlled ordering and screenshot evidence

Local-only timing configuration: `tools/3d/workshop-preview/hardening.config.ts` (server used port 8135). It delays post-parse readiness with `delayWorkshopReady`, can temporarily zero the stage with `workshop-zero-start`, inherits the reduced-motion/failure fixtures, and provides local QA page-visibility/context controls. Those controls are not part of production. Context loss was forced **only in this local QA fixture**, never in the production homepage.

| Scenario | Evidence / result |
| --- | --- |
| Asset/active before valid viewport (A/D) | `zero-recovered.json`: VIEWPORT_ZERO twice, LOAD_READY, no frame until VIEWPORT_VALID, then visible geometry. Screenshot `zero-recovered.png`. |
| Active/viewport before delayed asset (B/C/F) | Four-second delayed readiness converges without a scroll/resize/theme/pointer trigger. `delayed-ready.json/.png`. |
| Asset ready offscreen, later acquisition (E/G) | Native scroll past into Gallery before six-second readiness; `scroll-past-ready-offscreen.json`: asset ready, inactive, zero rendered frames. Return produces frames and geometry: `scroll-past-return.json/.png`. |
| Reload near Facility / scroll restoration (H) | Reload and later legitimate activation render correctly (`reload-facility.png`). Native restored scroll position shifted with lazy stack reflow in this browser; exact coordinate restoration is **not claimed**. Eligibility uses fresh actual geometry, never the old scroll coordinate. |
| Fast entry (I) | Rapid normal homepage scroll reaches a loading state followed by actual geometry. Final uninstrumented production proof: `production-final.png`. |
| Theme / resize during parse (J) | Theme/resize moved Facility offscreen while parsing; no offscreen render. Reactivation reacquires, refreshes size and renders (`ready-offscreen.json`, `theme-resize-ready.json/.png`). |
| Hidden completion | `hidden-completion.json`: asset ready, document hidden, zero requested/rendered frames. Restoring visibility produces geometry (`visibility-restored.json/.png`), without another model download. This is a local visibility simulation, not actual phone backgrounding. |
| Context restoration | Real local WEBGL_lose_context extension events recorded; same canvas resumes, original ceiling/environment lighting restored (`context-restored.json/.png`). Unit tests also verify model parse once and environment regeneration once. |
| Reduced motion during delayed readiness | Actual workshop remains visible on 390px mobile (`reduced-motion.json/.png`). This is a local matchMedia fixture, not an OS setting on a physical phone. |

All evidence paths above are under `tools/release-audit/hardening/browser/`. Accepted final production screenshots were captured on the actual `http://127.0.0.1:8132/Toli-2/` homepage, not the isolated preview. Fresh dark/light views at 1024, 768, 390 and 320px contain recognizable trusses, red columns/doors and floor/bay lines. Eight screenshots pass the retained pixel/DOM witness checker and were visually reviewed. The existing three negative controls (ready-but-blank, zero buffer, mislabeled viewport) remain unchanged and pass. Pixel heuristics remain supporting evidence, not object recognition or a replacement for human visual review.

DPR 1, 1.25, 1.5 and 2 are covered in focused scene tests, including CSS-pixel viewport coordinates and restoring the caller's scissor setting. Native browser-zoom/DPR-device emulation is unavailable; no physical-browser zoom PASS is fabricated. Delayed layout, StrictMode-style cleanup/release, hidden completion and context events are guarded by disposal checks and idempotent registration; actual StrictMode/remount behavior is not claimed as a separate device test.

### Renderer, network and other systems

Fresh local production-build measurement: Hero workshop requests **0**, homepage contexts **1**, workshop resource entries **1** after five Gallery/Facility reentries and repeated theme changes. Existing shared owner reused; no fallback renderer or new WebGL context. Demand rendering remains idle/offscreen/hidden gated. In controlled diagnostic runs, settled frame counts stopped at 3 rather than continuing a loop. No cold-start optimization was attempted; environment work is repeated only after actual context restoration, when old GPU render targets are invalid.

Production screenshot/smoke tab after the final rebuild: **0 warnings / 0 errors**, no diagnostic panel. Services default remains 01 Automobile Services; Journey remains 01 Choose a service. Gallery, Request opening/closing and AI opening/closing were exercised. No service-request or AI source/design changed. Failed asset promises retain the existing no-retry-storm cache policy.

### Validation and hard protection

Final production build PASS; app/node TypeScript PASS; all isolated/production/release/new timing QA configurations PASS; lint PASS; **379 tests across 52 files PASS** (369 baseline plus ten focused tests). No valid tests deleted/skipped. Three negative pixel-check tests PASS; eight production screenshot witnesses PASS. Logs/timings: `tools/release-audit/hardening/regression.json`.

Hero changed **NO**; Navbar changed **NO**; navbar car changed **NO**; Hero cars changed **NO**; workshop GLB changed **NO** (4,076,400 bytes, approved SHA-256). Approved Blender source/export also unchanged. No Gallery, Services/Journey design, Request, AI or Footer edits. Physical-device validation remains **UNVERIFIED**.

**INSIDE TOLI INTERMITTENT VISIBILITY = DIAGNOSTICS READY**

**USER-SIDE FAILURE CAPTURE REQUIRED**
