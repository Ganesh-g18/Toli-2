# TOLI MOTORS PERFORMANCE OPTIMIZATION

## Baseline

Measured from the existing production build before changes; no synthetic scores are inferred. Sizes below are file bytes, with local gzip estimates reported separately, not observed network transfer.

| Resource | Before | After |
| --- | ---: | ---: |
| Entry JS plus HTML module preloads | 475,149 B | 436,367 B |
| Same set, locally gzipped | 155,335 B | 142,310 B |
| Main application chunk | 296,102 B | 257,320 B |
| All emitted CSS | 287,463 B | 287,481 B |
| Existing GLB | 4,268,888 B | 4,268,888 B |
| All 16 original Gallery photos | 2,998,789 B | 2,998,789 B, preserved |
| All 16 480px derivative files | not present | 602,934 B |

Initial JS reduction: 38,782 bytes (8.2%). Gzip reduction: 13,025 bytes (8.4%). The 480px image set is 79.9% smaller than the originals as files. Actual image delivery depends on viewport, DPR and browser choice; this is not a measured full-page transfer reduction.

GLB metrics parsed from its actual accessor/mesh tables: 58 meshes, 12 materials, 125,334 primitive vertices, 191,805 indexed triangles, zero image textures. Generated studio radiance is 256×128 half-float RGBA and contact falloff 64×64 RGBA; neither is a downloaded model texture.

Renderer baseline: one shared renderer after entering the below-fold experience. Existing WebGL rendering was already demand-driven, not a permanent idle loop. Hero cold-load DOM after this change: zero canvases, zero Gallery photo sources, no request form mounted. See cold-load.json. Initial request count, complete network waterfall and exact heap usage are UNVERIFIED: the available browser API did not expose Resource Timing or network tracing. No FPS, LCP, INP, CLS or memory improvement is claimed.

Hero/Navbar image file formats, dimensions and byte sizes are recorded in major-images.json. Gallery original and derivative dimensions/sizes are in images.json.

## Problems Found

- **HIGH — eager form and route code:** the popup provider and direct request route pulled the full form, validation and vehicle datasets into homepage startup. Legal routes were eager as well.
- **HIGH — premature Gallery proximity:** the short Suspense stack placeholder could temporarily put Gallery near Hero. Its observer could then permanently enable photo sources before the real stack mounted. Confirmed during the cold-load audit; fixed and regression-tested.
- **HIGH — weak-device car exclusion:** capability policy selected a schematic fallback on known weak phones. Slow active-frame policy could also destroy the renderer while the real asset was still loading. Weak hardware now lowers quality; only genuine failures use fallback.
- **MEDIUM — oversized thumbnails:** Gallery slots used the full 810–1728px photographs even on small phones. All original photos remain available to the lightbox.
- **MEDIUM — repeated layout measurement:** stack and timeline observers measured synchronously for each resize/mutation burst.
- **MEDIUM — redundant buffer work:** every quality notification called setPixelRatio even when its effective value was unchanged.
- **LOW / residual:** the Three.js lazy chunk remains large, the car remains geometrically substantial, and shared CSS is large. Geometry decimation, dependency rewrites and CSS removal were avoided without evidence of safe visual equivalence.

## Changes Made

| Problem | Change and reason | Visible effect | Risk / protection |
| --- | --- | --- | --- |
| Eager form/routes | Lazy-load form internals and request/legal routes; keep popup shell and navigation immediate | Same existing flow, brief accessible loading status on first open | Async focus and draft/route tests; close remains available while loading |
| Late close focus callback | A closing dialog does not restore focus over a newly opened dialog | Stable rapid reopen behavior | Existing focus-return tests retained |
| Startup Gallery measurement | Register proximity observation after the real homepage stack mounts | Photos still load near Gallery, rather than prematurely at Hero | Regression test plus actual cold-load and arrival checks |
| Oversized Gallery delivery | Add 480/960px WebP derivatives, srcset and sizes matching existing editorial spans | Same photos/layout; full originals in lightbox | Originals untouched; all 16 photos and lightbox keyboard/focus tests retained |
| Device exclusion | CPU/RAM/data-saving signals select compact rendering on phones or laptops | Same actual car; restrained lower rendering cost | No UA sniffing, no customer-facing tier label |
| Slow-frame fallback | Downgrade once instead of removing a slow/loading car; ignore long scheduling gaps as quality evidence | Car remains available through slow rendering | Sustained slow-frame regression test |
| Drawing-buffer work | Skip unchanged effective quality/DPR notifications | None | Buffer-reuse regression test |
| Observer bursts | Coalesce stack/timeline observer measurements through one pending animation frame | Same native sticky transitions | Pending frame cancellation and stack regression tests |
| Asset loading | Expose template prewarming through the existing shared promise cache | No additional renderer; asset loads/parses once | Cache prewarm/remount test; no eager Hero prewarm |

No feature, service, photograph, animation, input field or theme was removed. No dependency or CSS redesign was performed.

## 3D

- Renderer count: one shared canvas observed after loading; zero at Hero. Same canvas retained across sections, themes and popup cycles.
- Lazy loading: heavy scene module and GLB remain below-fold. Existing 160px approach observer is retained; actual renderer initialization additionally requires an active non-Hero dock. This deliberately conservative gate does not promise the GLB is already parsed before visibility.
- DPR: desktop capped at 1.5, compact at 1.0. Save Data, ≤4 logical cores or reported ≤4GB RAM select compact cost, including laptops. Unknown signals do not exclude the car.
- Render loop: on demand until movement settles. Browser observed `idle`; Gallery observed `paused`. Hidden tabs cancel frames; tests verify resume without another canvas. Slow rendering downgrades cost instead of removing the feature.
- Shadows: existing procedural contact patches, not real-time shadow-map passes. Reflection reuses geometry, with no second renderer or render target; compact/adapted paths reduce decorative reflection cost.
- Materials/lights: current gunmetal paint, glass, lighting and materials retained. Asset geometry/source remains byte-identical.
- Resize: actual dimensions are cached. No renderer resize in the animation tick; redundant quality buffer changes are skipped.
- Caching: one promise/template per asset URL, including failures. Renderer-owned clones remain independently disposable. No retry/download loop.
- Cleanup: observer/listener/frame cleanup, GPU disposal, context-loss fallback and rotation cleanup retained. Strict Mode regression verifies one scene initialization and one final disposal.

## React

State ownership was inspected: service/Journey choices remain in their existing provider; scroll progress is not put into React state every frame. Service/Journey still initialize at 01 and persist after explicit choices. TOLI AI keeps local panel state. No unsupported whole-page render-count reduction is claimed and no blanket memoization was added.

Stack/timeline observer measurement bursts are coalesced. Existing passive scroll listeners/rAF scheduling and cleanup remain. Near-Gallery registration observer disconnects once stack registration completes and on unmount. Request viewport listeners remain active only while open. The underlying form source, local AI engine and field validation remain unchanged.

## Images

Hero: existing high-priority responsive campaign image, dimensions and async decoding retained; source/CSS unchanged. Navbar artwork/rims and visibility pause retained.

Gallery: every original retained. Native lazy loading and async decoding remain, dimensions/aspect ratios remain reserved, and no full-resolution startup preload is introduced. On mobile, actual currentSrc selected the 480px derivative. Lightbox loads the selected original; no all-original preload was added. Width hints follow the existing mobile/tablet/editorial grid, including full-width tablet slots.

Other: image and font delivery audited without changing typography. Existing Google Fonts CSS requests Bebas Neue and Inter weights 300–700 with display=swap. Only one font stylesheet declaration was found; duplicate font network requests remain UNVERIFIED. Lucide imports remain named/tree-shakeable. No dependency rewrite was justified by the emitted bundle.

## Loading

Initial: navigation and Hero remain directly available. Popup launcher/shell and AI launcher remain lightweight. Form internals and legal/request pages now load on demand.

Below-fold: existing split section modules remain. They mount after their imports resolve; this change does not claim every below-fold React module waits for viewport entry. Expensive 3D, photo sources, optional Trust content and AI panel retain their own gates. The Gallery gate now waits for stable stack registration.

Largest final lazy JS chunks:

| File | Bytes | Local gzip bytes |
| --- | ---: | ---: |
| vehicle-scene-BJ9QvKX4.js | 647,041 | 171,362 |
| ServiceRequestSteps-CgH1W707.js | 25,713 | 9,975 |
| OffersStrip-C57rdGqy.js | 11,013 | 3,821 |
| ToliAIPanel-BItFNlCJ.js | 7,436 | 3,481 |
| Footer-CfGKgRzs.js | 6,774 | 2,273 |
| Contact-BNfFSI-I.js | 6,608 | 2,394 |

Vite hashed assets retain ordinary bundler/browser caching semantics. No custom service worker/cache was added and deployment cache headers were not changed or verified.

## CSS / Rendering

Sticky stack order, native scrolling and transform/opacity design remain. Existing blur, shadows, gradients, typography and theme CSS were left intact. No wheel interception, scroll-jacking or blanket will-change was added. Content visibility was evaluated but not applied to sticky/WebGL/modal ancestors because their exact measurements matter. The small emitted CSS-size change comes from generated utilities for loading UI, not a visual redesign.

## Memory / Lifecycle

WebGL: one shared canvas, cached asset promise, explicit disposal, offscreen/hidden pause. No exact heap measurement was available.

Lightbox: repeated open/close, next/previous, arrows, Escape and focus management preserved. No full-resolution photo prefetch sweep.

Service Request: lazy form unmounts/reopens with existing draft storage; nonlinear steps, review, optional model and focus/scroll lock preserved. Existing synchronous submission contract is covered by tests; browser QA did not send an enquiry.

TOLI AI: existing on-demand panel remains local. Repeated open/close and a Battery Services reply worked. No cloud AI code was introduced. Full network trace is unavailable; local-only behavior is supported by source and tests.

Theme: switches retained the selected Journey step, service and open request review values. GLB is not reloaded by theme changes. Repeated interaction showed no duplicate canvas or obvious accumulating dialogs; this is not a quantitative memory-leak guarantee.

## Before vs After

The table above and measurements.json contain actual emitted file sizes. The original GLB and original photos remain unchanged. Existing idle/offscreen behavior was already efficient; it is preserved, not reported as a new measured FPS gain. Extra thumbnail variants increase deployed asset storage while reducing the files needed for small slots.

## Low-End QA

| Check | Result / scope |
| --- | --- |
| CPU throttling | UNVERIFIED — unavailable in exposed browser capabilities |
| Network throttling | UNVERIFIED — unavailable in exposed browser capabilities |
| Physical low-end devices | UNVERIFIED — none tested |
| Capability policy | PASS — weak phone/laptop, data saving and DPR tests |
| Mobile viewport emulation | PASS — 430, 412, 390, 360, 320 |
| Desktop/tablet | PASS — 1920, 1600, 1440, 1366, 1280, 1024, 768 |
| Short desktop / landscape | PASS — 1366×600 and 844×390 |
| Dark/light | PASS — all requested widths checked; no horizontal page overflow |
| Rapid full-page scroll / reversals | PASS — repeated native Home/End and wheel scroll reversals; state and canvas preserved |
| Native scrollbar dragging | UNVERIFIED — coordinate drag did not move the scrollbar; not reported as a pass |
| Slow/sticky transitions | PASS in browser checks; no quantitative jank metric |
| Interaction stress | PASS — service/Journey switching, 3D drag, repeated Gallery/request/AI cycles and theme switching |
| Strict Mode / hidden / reduced motion | PASS in focused automated lifecycle coverage; preference emulation not exposed by browser API |
| Production console | PASS — clean final QA tab recorded no warnings/errors |
| CORE WEB VITALS | UNVERIFIED — no Lighthouse or field metrics used |

During iterative rebuilding, an already-open preview briefly referenced replaced chunks; a clean final production tab was used for acceptance. This was not included as a clean-network benchmark. Complete network counts/waterfall, 404 audit under throttling and repeated GLB transfer counts remain UNVERIFIED; cached-load tests verify the single-download architecture.

## Regression Protection

Hero: UNCHANGED VISUALLY; exact source checksum unchanged.
Navbar: UNCHANGED VISUALLY; navigation source, logo and artwork unchanged.
Services: PRESERVED — all nine services, default 01, explicit choices and request context.
3D: PRESERVED — actual model renders on mobile/desktop and drag changed rotation to 92.2° in QA.
Journey: PRESERVED — default 01, later choices and scroll persistence.
Trust: PRESERVED.
Gallery: PRESERVED — all 16 photographs, editorial composition and full-resolution lightbox.
Service Request: PRESERVED — steps, draft, validation, review and canonical route.
TOLI AI: PRESERVED — local assistant and request integration.
Footer: PRESERVED.
Dark/light, touch/keyboard controls, focus management and reduced motion remain.

The prior protected manifest contains intentionally edited implementation files; it is not silently rewritten. Changed entries are recorded in measurements.json. Hero/navigation checksums and the vehicle asset checksum remain verified. No original photograph or theme stylesheet was edited.

## Validation

Build: PASS. TypeScript: PASS. Lint: PASS. Tests: PASS — 340 tests across 46 files.
Starting test count: 332 / 46 files (verified current repository baseline from the preceding full run).
Final test count: 340 / 46 files, including eight additional regressions and intentional async-loading/capability expectation updates. No valid tests deleted.

Existing Browserslist/chunk-size/tooling warnings are retained in logs. An early concurrent check hit geometry timeouts; a later serial run was interrupted by the environment. Final complete results, not those partial runs, are the acceptance basis.

## Visual Acceptance

PASS for the rendered interfaces and viewport checks listed above, with no meaningful visual redesign. Before/after Services captures, final Hero, actual 3D, Gallery/lightbox, request review, AI, Trust and Footer captures are included in this folder. This is not a pixel-diff, physical-device or Core Web Vitals certification. Source protection supplements the browser comparison for the frozen Hero/Navbar.
