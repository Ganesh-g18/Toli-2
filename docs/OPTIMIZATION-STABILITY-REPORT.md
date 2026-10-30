# TOLI MOTORS — OPTIMIZATION & STABILITY REPORT

Date: 18 October 2026. Project: `/home/thunder/shared/tolimotors-main1/tolimotors-main`.

## Executive Summary

Completed a source audit, focused stability fixes, production compilation, full automated checks and browser spot checks. No redesign, new service content, external AI integration, dependency changes or replacement imagery. Existing unrelated working-tree changes were preserved.

The largest improvement is delivery: the eager Journey provider imported a small inspection-state helper from a module containing Three.js. Moving that helper into a dependency-free module reduced the main application JavaScript from 536,463 to 294,905 bytes (45.0%). Three.js remains available in the existing lazy vehicle module. This is deferred delivery, not removal of 3D functionality.

Verified fixes: inactive popup viewport subscriptions, offscreen Offers animation scheduling, repeated renderer sizing, gallery scrollbar reservation and failed-image fallback, repeat section-anchor navigation, assistant failure containment and unused gallery styles.

This is not a blanket production certification. Physical-device testing, heap/GPU profiling, throttled performance metrics and exhaustive combinations of every section at every viewport remain UNVERIFIED.

## Runtime Stability

Closed Service Request and already-loaded AI panels now remove viewport resize/scroll subscriptions. Opening synchronizes the current viewport immediately; unchanged measurements do not trigger state updates. Tests exercise repeated open/close cleanup.

Offers autoplay now stops scheduling frames while offscreen, document-hidden, paused, manually paused or reduced-motion. Its initial measurement frame is cancelled on cleanup. Motion preference changes are observed and cleaned up.

Optional assistant loading/render errors are contained within the assistant. The page remains usable and offers a close action; normal error reporting is retained. During QA the local preview connection stopped, causing an actual lazy-import failure; the fallback worked. After restoring the preview, the assistant loaded and answered normally. A fresh successful preview session showed no captured production console errors. This does not certify every network request under every failure condition.

Long-duration heap growth, browser memory retention and real-device GPU memory: UNVERIFIED. No lifecycle defect requiring a broad architecture rewrite was established.

## Hero

Preserved the current approved typography, transparent vehicle cutout, red/grey environments, header, chapter rail and quick actions. No hero source/layout changes in this pass. Current hero is a responsive image, not a WebGL hero or three independently rendered cars. It has explicit dimensions, responsive sources and high fetch priority. No speculative model requests were introduced.

Hero screenshots were inspected at all twelve requested widths, short desktop and landscape. No horizontal overflow was measured. Mobile uses the existing deliberate vehicle crop and normal document scrolling; short screens require scrolling to lower actions.

LCP identity, cold-cache LCP, CLS, INP and CPU-throttled scores: UNVERIFIED. The optional existing performance-audit observer now records the LCP element identity for future opt-in measurements; normal production does not enable audit collection.

## Scroll Stack

Preserved native sticky stacking, height/fit gating, cached section navigation and accessible covered-panel behavior. No scroll hijacking added. Browser checks exercised chapter navigation and PageDown/PageUp around the service/component area; one lazy canvas was observed. Gallery remains outside the stack in normal document flow.

Fixed repeated clicks on the current canonical section hash: they now navigate again without requiring a hashchange or adding a history entry. Modified clicks, downloads and other destinations remain unaffected. Regression test included.

Exhaustive fast-scroll, scrollbar dragging, reverse scrolling across every expanded Trust panel at every size: UNVERIFIED. Existing stack, timeline and navigation tests pass.

## 3D / WebGL

Kept the single shared lazy renderer, offscreen/hidden pause, reduced-motion policy, DPR caps (desktop 1.5, smaller devices 1), disposal and existing illustrative fallback. Resize now skips zero and unchanged dimensions before calling renderer.setSize. A regression checks repeated observer callbacks and a real size change.

The current imported-model registry intentionally has no approved model URL. Loader rejection occurs before a missing-model network fetch; the existing illustrative scene remains. No new GLB or speculative URL was added. Source audit and existing renderer lifecycle/disposal/context tests pass; browser observed one canvas after entering the vehicle area. Hardware context-loss recovery, sustained GPU usage and physical low-power performance: UNVERIFIED.

## Gallery

All sixteen existing photographs, editorial order, crops, captions and normal-flow grid were retained. Existing near-section source activation, native lazy loading, async decoding and dimensions remain.

New image failure handling provides a stable labeled placeholder instead of a broken image, including inside the preview. Tests confirm advancing from a failed preview to the next image. Lightbox uses the established overlay range instead of an extreme z-index, reserves the scrollbar gutter while locking scrolling, and restores prior inline styles on close/unmount. Browser confirmed image navigation, scroll locking and cleanup; at 1440px the body stayed 1430px wide with and without the dialog. Mobile 390px gallery screenshot was inspected successfully.

Full-resolution originals were not recompressed or deleted. Gallery source assets total approximately 2.9 MB; the largest delivered gallery image is 328,756 bytes. Further bandwidth tuning should use a measured quality comparison.

## Service Request

Preserved canonical popup/route integration, nonlinear steps, validation, manual brand/model entry, draft store, consent and WhatsApp draft handoff. No backend or submission contract changed.

Browser exercised required contact details, “mah” search → Mahindra, manual model XUV700 and direct Review navigation; Review displayed both values correctly. Header booking opened the canonical popup. Mobile navigation exposed Request Service and opened the same popup; the 390px popup was visually inspected. Desktop close/reopen retained the contact draft during this session.

Automated tests cover validation, draft restoration, review, navigation and final handoff values. No real WhatsApp message was sent. External delivery and physical software-keyboard behavior: UNVERIFIED.

## TOLI AI

Retained the local rule/knowledge engine and lazy panel; no cloud API, fetch, analytics or storage was introduced for chat. Messages remain in local component state. Browser tested Battery Services and the matching request action appeared. Existing tests verify local answers, handoff, message/state behavior and no request use in the assistant flow. Network-wide packet capture: UNVERIFIED; “zero AI cloud requests” is established by source audit and tests, not an invented network trace.

Viewport subscriptions now exist only while open. New boundary contains chunk/render failure, with a local close action. No new assistant capability was added.

## React

Separated dependency-free inspection state from runtime Three.js operations without changing exported inspection APIs. Avoided broad memoization or state rewrites without evidence. Popup viewport updates deduplicate equal measurements. Existing theme store, form draft ownership and shared scene lifecycle remain.

## CSS

Removed verified-unused `.gallery-item` and `.media-zoom` rules/references while retaining shared before/after and media-frame styles. Added only the image-unavailable placeholder and constrained assistant failure notice/button styling. Approved gradients, lighting, typography and editorial grid remain.

## Bundle — Actual Measurements

Measured production files on disk; gzip values below use Python gzip on final bytes. These are artifact sizes, not browser transfer timings.

| Artifact | Before bytes | After bytes | Final gzip bytes |
| --- | ---: | ---: | ---: |
| Main application JS | 536,463 | 294,905 | 94,539 |
| Lazy vehicle scene JS | 406,876 | 645,971 | 170,903 |
| Main CSS | 287,841 | 287,310 | 48,944 |
| All generated JS combined | 1,207,904 | 1,205,907 | — |
| React/vendor chunk | — | 141,283 | 45,340 |
| Anime.js chunk | — | 36,845 | 14,314 |
| Lazy AI panel | — | 7,436 | 3,483 |

The main chunk reduction is 45.0%. Total generated JS decreases only 1,997 bytes because most savings come from moving Three.js behind the existing lazy boundary. Do not interpret the main number as total-site savings. Existing logo PNG is 333,374 bytes; retained for visual fidelity. No dependencies were blindly removed. Build still warns about the >500 kB lazy vehicle chunk, old Browserslist data and existing ambiguous Tailwind utilities.

## Responsive QA

PASS below means actual hero screenshot inspection plus document-overflow measurement, not every interaction at that width. Desktop/tablet rows use 900px height, except 768 uses 844px; phones use 844px.

| Width | Hero / header / horizontal overflow | Additional checks |
| --- | --- | --- |
| 1920 | PASS | Full-width cinematic composition |
| 1600 | PASS | Header booking visible |
| 1440 | PASS | Contact/vehicle/review flow; gallery dialog; lazy scene; AI |
| 1366 | PASS | Rail and vehicle composition |
| 1280 | PASS | Header and technical labels |
| 1024 | PASS | Rail, car and actions fit |
| 768 | PASS | Existing tablet header, normal layout |
| 430 | PASS | Booking visible as BOOK |
| 412 | PASS | Booking visible as BOOK |
| 390 | PASS | Gallery; mobile menu request; popup screenshot |
| 360 | PASS | Booking accessible as calendar icon |
| 320 | PASS | Calendar booking target remains visible |
| 1366 × 600 | PASS | Short-screen hero continues below fold |
| 844 × 390 | PASS | Landscape hero scrolls naturally |

All tested viewport document widths had no measured horizontal overflow. The complete full-page interaction matrix at every width, real iOS/Android touch, virtual keyboard, browser zoom and safe-area hardware: UNVERIFIED.

## Accessibility

Preserved semantic controls, form labels, step navigation, focus management and reduced-motion policies. Gallery next-image control worked in browser; Escape and focus restoration are covered by tests. Failed photos retain an accessible image description. New failure close action has a comfortable minimum target. Mobile booking retains its accessible Book Service label even where text is visually shortened.

Screen-reader device sessions, full WCAG contrast audit, physical keyboard-only journey and OS reduced-motion browser emulation: UNVERIFIED. No accessibility certification claimed.

## Files Changed — This Pass Only

| File | Reason |
| --- | --- |
| src/components/ServiceRequestDialog.tsx | Open-only viewport subscriptions and deduplicated measurements |
| src/components/ToliAI/ToliAIPanel.tsx | Same lifecycle fix for mounted hidden AI panel |
| src/components/ToliAI/AssistantBoundary.tsx | Contain optional assistant failure |
| src/components/AIChatWidget.tsx | Apply boundary and restore launcher focus on fallback close |
| src/components/ToliAI/toli-ai.css | Constrain failure notice and close touch target |
| src/components/OffersStrip.tsx | Stop hidden/offscreen/paused/reduced animation scheduling; cleanup initial frame |
| src/lib/vehicle-scene.ts | Avoid repeated identical renderer sizing |
| src/lib/premium-car/inspection-state.ts | Dependency-free inspection state |
| src/lib/premium-car/inspection.ts | Preserve API through imports/re-exports |
| src/components/journey/JourneyProvider.tsx | Avoid eagerly importing Three.js through state helper |
| src/lib/section-links.ts | Repeat-current-hash navigation with cleanup |
| src/components/GalleryImage.tsx | Accessible failed-image fallback |
| src/components/Gallery.tsx | Use fallback, reserve gutter, normalize overlay level |
| src/components/gallery-editorial.css | Style failed-image placeholder |
| src/theme.css | Remove dead gallery selectors |
| src/dark-system.css | Remove dead gallery selectors/variable |
| src/components/journey/journey.css | Remove dead gallery selectors |
| src/components/journey/technology.css | Remove dead gallery selectors |
| src/index.css | Remove unused media-zoom utility |
| src/lib/performance-audit.ts | Opt-in LCP element identity |
| src/test/stability-lifecycle.test.tsx | Four listener/failure/offscreen scheduling regressions |
| src/test/gallery-depth.test.tsx | Two lock/failure regressions |
| src/test/vehicle.test.ts | Repeat-anchor regression |
| src/test/vehicle-lifecycle.test.ts | Renderer resize regression |
| docs/OPTIMIZATION-STABILITY-REPORT.md | This audit and evidence |

Build outputs and TypeScript build-info files were regenerated by validation. The repository already had extensive unrelated modifications/untracked files before this pass; the table does not attribute those to this work.

## Removed Code

Removed inactive viewport subscriptions, needless animation scheduling paths, repeated renderer sizing work and confirmed-unused gallery/media selectors. Moved the inspection state helper rather than deleting shared functionality. No photos, vehicle logic, shared booking utilities, dependencies or business information were removed.

## Validation

- Production: `npm run build` — PASS, final build 10.58 seconds.
- TypeScript: `node node_modules/typescript/bin/tsc -b` — PASS.
- Lint: `npm run lint` — PASS.
- Full suite: `npm test -- --maxWorkers=2 --testTimeout=20000 --hookTimeout=20000` — PASS, **315 tests / 43 files**, 57.30 seconds. Baseline was 307 tests / 42 files.
- Focused regressions: `node node_modules/vitest/vitest.mjs run src/test/stability-lifecycle.test.tsx src/test/gallery-depth.test.tsx src/test/vehicle.test.ts src/test/vehicle-lifecycle.test.ts` — PASS, 54 tests / 4 files.
- Existing test output includes jsdom scrollTo/React act/router diagnostics; these are not claimed as production browser errors.
- Browser: real local production preview in the in-app Chromium browser. Screenshots inspected for all requested hero widths, short desktop, landscape, desktop lightbox, mobile gallery and request popup. No screenshot-based claim is made for unviewed full-page combinations.

## Visual Acceptance

**PASS for inspected views:** approved hero, header, typography, red/grey treatment, editorial gallery and request popup remain recognizable and unchanged in design. Actual browser screenshots established this, alongside source review. **UNVERIFIED for exhaustive site-wide visual acceptance** across every viewport, expanded panel, browser/device and failure combination. No unsupported global PASS is asserted.

## Remaining Work

### BLOCKING

No reproducible code-level blocker remains in the changes; automated checks pass. Full acceptance cannot be claimed until the unverified performance/device/profiling items below are completed.

### IMPORTANT

- Capture cold/throttled LCP/CLS/INP and real-device performance, including font delivery and image transfer waterfall.
- Run sustained heap/GPU profiling, background/foreground and hardware WebGL context-loss checks.
- Complete all-section fast/reverse-scroll and dialog/theme combinations across physical mobile browsers, software keyboards and reduced-motion settings.
- Validate external WhatsApp draft handoff in the deployment environment without sending unintended enquiries.

### OPTIONAL

- Review the existing Browserslist and Tailwind warnings in a separate dependency/style maintenance change.
- Measure further compression of the logo and gallery with visual comparison before replacing approved assets.
