# TOLI MOTORS — final full-website release audit

Date: 2026-10-20. Local production build; no external upload or release deployment.

## EXECUTIVE STATUS

**FINAL WEBSITE RELEASE = PASS** for the available browser release gate. **Physical phone validation = UNVERIFIED.** No production source changes were necessary. This is an audit and regression lock, not a redesign or a claim of universal device performance. No P0, P1 or serious unresolved P2 was reproduced. The known cold 3D setup costs remain documented.

Evidence and repeatable checks: `tools/release-audit/full-website/`. `decision.json` contains the measured gate summary; `release-lock.json` freezes the captured source/asset hashes and 369-test/51-file baseline. Historical workshop audit evidence remains untouched.

## PAGE STRUCTURE

Walked forward and backward: Navbar → Hero → Services → Component/Vehicle → Service Journey → Why TOLI/Trust → Inside TOLI → Editorial Gallery → Request/CTA → Contact → Footer. AI remains independent. Inside TOLI is after the four-panel stack, directly before Gallery; no new intervening section.

## ISSUES FOUND

| Priority | Count | Finding / disposition |
| --- | ---: | --- |
| P0 | 0 | No crash or broken core flow reproduced. |
| P1 | 0 | No serious keyboard, dialog or interaction failure reproduced. |
| P2 | 0 | No new serious visible, scroll, renderer or network defect reproduced. |
| P3 | 4 categories | Business-content verification; known cold 3D/large shared loader; external font delivery/cost; duplicate retained vehicle candidate asset. Details below. |
| P4 | Not implemented | Alternative styling, new transitions, speculative geometry/texture reduction, dependency or global refactors. |

One automated UI attempt clicked a covered sticky Services panel and hit Trust. This was a browser locator/scroll ambiguity, not a confirmed CTA defect: native keyboard scrolling into the active panel followed by a visible-coordinate click opened the canonical request dialog with Battery Services. No source fix was warranted.

## CHANGES MADE

**Production source changes: NO.** Added only this report, a local-only production-build audit harness, raw evidence, bundle measurements, validation logs and a source/asset regression lock. No tests deleted, skipped, weakened or artificially added. No public model/source artifacts deleted. The QA server injects observation code into HTTP responses in memory; it does not edit `dist` or application source. `Capture site audit` is absent from the built production HTML/JS.

For future corrections, require a reproduced problem, cause, smallest fix and validation. `python3 tools/release-audit/checks.py` reruns build, app/node/QA TypeScript, lint, tests and frozen-file/asset checks from the project root. The existing 84-file historical protection set and current captured source baseline are enforced. Intentional future production changes require explicit review of the corresponding baseline rather than silently accepting new hashes.

## HERO / NAVBAR PROTECTION

Hero changed: **NO**. Navbar changed: **NO**. Navbar car changed: **NO**. Hero cars changed: **NO**. Approved workshop GLB changed: **NO**, exactly **4,076,400 bytes**, SHA-256 `b2461de9d4a12014e7cfbfaf692363f42a6bdf7018b75cd8e7bb7ec929f7dc98`. No CSS, loading, animation, camera, lighting, logo or responsive navbar edits. Every captured `src` file is unchanged, in addition to the historical frozen-subsystem audit.

## STICKY STACK

Forward wheel/keyboard walkthrough: Services sticks; Components rises; Journey rises; Trust rises; tall content remains scrollable; stack releases before Facility. Reverse scroll and rapid top/bottom returns reconstruct the panels. Covered panels become inert and restore on return. Resize measurements update without reload. The stack uses passive native scroll observations and measured CSS sticky placement, not a wheel-event state machine or mandatory snapping. No reproducible dead-scroll gap, teleport, stuck panel, persistent clipping or wrong renderer placement was observed. Locator clicks into already covered panels are not used as evidence of visible control behavior.

## SERVICES

Normal fresh load and native hard-refresh check both show **01 Automobile Services** selected. Premium Detailing, Vehicle Inspection and Battery Services were exercised; detail text and active selection update. Battery selection remained `aria-pressed=true` after Facility, theme toggle and return. Request this service opens the canonical four-step dialog with the selected service. Existing explicit preselection behavior is preserved by unchanged source and routing tests.

## VEHICLE EXPERIENCE

Actual preproduction vehicle loads with approved materials/camera; component controls remain available. Component → Journey → Trust → Facility and reverse return reuse the homepage owner. The initial “Preparing vehicle view” state resolved to the actual model; it was not mistaken for permanent failure during rapid initial scrolling. No duplicate canvas or persistent stale frame was observed. Existing automated GLB/render failure tests verify the localized lightweight fallback and stopped scheduling. This audit does not change the vehicle, its shader pipeline or fallback contract.

## JOURNEY

Default **01 Choose a service** confirmed after hard refresh. Steps 02 Prepare your request, 03 Send in WhatsApp and 04 Discuss next steps respond. Step 04 remained selected after Facility and a theme change (`aria-pressed=true`). Scroll progress does not overwrite the selected local step in the tested path.

## TRUST

Accordion content remains readable and scrollable; expanding Multi-brand care works. No new authorization/certification claims were inferred from photographed signage. Existing content requiring owner verification is listed under BUSINESS-CLAIM AUDIT. Animated numeric counters may show intermediate values while entering; final values are the existing 75-point and 21+ claims, not newly verified facts.

## INSIDE TOLI

Placement, composition, approved asset and approximately **400px** prewarm unchanged. Fresh Hero capture has no workshop resource request. Facility appears through the shared renderer and hands back correctly; presets/rotate/zoom remain accessible and vertical document scrolling remains possible. Current full-site context evidence is one WebGL2 context. Reduced-motion fixture retains actual workshop 3D. No speculative first-frame optimization or Hero preload was introduced.

The immediately preceding release audit remains applicable because source/asset hashes are identical: warm submissions **0.6–1.7ms**, draw calls **14–19**, first ready/model draws **166.7–228.9ms**, cold Overview **100.8ms**; shader-status/info queries and texture uploads were measured contributors. Those are prior audit measurements, not newly invented full-site FPS/GPU values. Stable comparable workshop resources were 18 geometries/11 textures; shared counters can grow legitimately as previously unseen vehicle geometry uploads. Previous failure/unavailable-owner fixtures verified stable fallback without retry storms or replacement contexts, and freshly rerun tests confirm those contracts.

## GALLERY

All 16 real images loaded successfully by the full-scroll capture. Asymmetrical groups and image proportions remain intact, with reserved dimensions and responsive sources. No new tint, stretching or canvas overlay observed. Hero capture has no Gallery photo resource. Near-section activation plus native lazy loading supplies responsive derivatives; opening a lightbox intentionally requests an original if necessary.

First image → ArrowLeft wraps to **16 / 16**; ArrowRight returns **01 / 16**. Previous/next buttons, Escape, focus containment and return to the originating photo passed. Ten additional open/next/close cycles passed. The existing GalleryImage error fallback reserves its slot; automated tests cover a failed photo and moving to the next image without crashing the page.

## SERVICE REQUEST

Canonical four steps remain Details → Vehicle → Service → Review. Empty Continue reports name/phone errors and focuses the first invalid field. Local QA values progressed through keyboard selection, manual entry, nonlinear editing and Review. Brand/model appear correctly in Review and survive step/theme changes. Changing the brand cleared the incompatible model before a new manual model was entered. Draft remains in memory through the current session; existing tests verify legal-policy Back, close/reopen, blocked handoff and clearing only on explicit Done after handoff.

Header Book Service, Hero Service Enquiry, active Services Request this service, CTA Enquire Now, navigation Request Service and AI request actions share the existing provider/link architecture; no competing modal added. Header, Hero, service, CTA and menu entry paths were exercised. Modal scroll lock, focus containment, Escape and trigger focus return passed. 320px and short landscape remain usable. No real WhatsApp enquiry was sent and no appointment success was fabricated. Fresh automated tests mock `window.open`, verify the existing destination/payload, blocked/exception retries and intentional handoff wording. Send opens a draft; it does not prove delivery or booking confirmation.

## TOLI AI

Launcher/panel tested above Hero, Services, Facility and Gallery; mobile sheet and desktop panel remain clickable above 3D. Close/focus return and keyboard input work. A price/warranty query correctly replies that verified information is unavailable. Local service intent knowledge comes from the existing service catalog/contact data; no API key, AI fetch, cloud inference or telemetry was found in this assistant implementation or observed request stream. Existing tests forbid network access and cover local intents. Internal failure remains bounded by AssistantBoundary. Business service availability and diagnosis are not inferred from the model.

## FOOTER

Full-page walks reach Contact/Footer in every requested width. Links and contact text wrap without document overflow. Existing phone, email, map and social destinations remain unchanged. Internal policy link targets exist and build; external phone/WhatsApp/social/map availability was not tested by sending, calling or signing in. Map remains consent-gated. No business details invented.

## DARK THEME

Complete rendered walks at all 12 requested widths: graphite, charcoal/gunmetal, silver text and multiple red gradient tones remain visible. No forced recolor or simplification applied. Real photographs retain natural colors; workshop materials remain unchanged.

## LIGHT THEME

Complete rendered walks at all 12 widths retain cream/white, silver/grey, charcoal and TOLI red. Services, Gallery, Facility surrounds, Request, AI and Footer remain readable. Repeated theme changes do not reload the document, reset tested Services/Journey state or create a context. Open-form draft/Review values survived a theme change.

## REDUCED MOTION

A local-only production-response fixture overrides the reduced-motion matchMedia result and activates the existing reduced-motion CSS blocks while disabling no-preference blocks. Full 390px page walk retains all content and actual vehicle/workshop 3D; Reception control works. Source rules cover Hero/Navbar decoration, stack transitions, Gallery hover/lightbox, modal and AI animations. No schematic substitution. This is browser fixture coverage, **not a physical OS accessibility-setting test**. Production source/CSS are unchanged.

## KEYBOARD ACCESSIBILITY

Native Tab traversal recorded **80 focus stops**, reaching Hero, Services, Components, Journey, Trust, Facility, Gallery, Booking, Contact and Footer links before the browser focus boundary. Skip link and navigation precede main content. Visible focus inspected in navigation, form and AI. Keyboard PageDown/Home/End scroll natively; Gallery arrow keys/Escape work. Form combobox ArrowDown/Enter, Continue, invalid-field focus and modal close/focus return tested. Intentional dialog traps remain; no unintended document trap reproduced. Automated semantics/focus tests also pass. No screen reader session or automated full WCAG conformance claim is made.

## RESPONSIVE QA

Actual browser layout/walks in dark **and** light at **1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360, 320px**. Additional **1280×600** short desktop and **844×390** landscape. Native wheel walks and viewport screenshots/DOM measurements recorded in `browser/walk-records.json`; 486 initial scroll-position samples, all **0 horizontal overflow**. An additional reduced-motion walk is recorded separately in the final combined file. Repeated wide → narrow → wide changes required no reload.

Screenshots on the widest CSS overrides can be cropped by the in-app browser's physical panel; full-width DOM overflow measurements and live layout were recorded, but these are not full-monitor 1920px screenshots or a multi-browser device lab. Representative contact sheets and individual captures are retained. No source-only responsive PASS was substituted for browser rendering.

## 320PX

Complete dark/light page walks: heading, text, CTA, controls, model, Gallery, AI launcher and Footer remain reachable; zero horizontal overflow. Request modal and AI sheet screenshots show readable fields/actions within the viewport. Native finger touch and virtual-keyboard behavior remain unverified.

## LANDSCAPE

844×390 complete page walk: content scrolls vertically, controls stay below the Facility model and do not cover it. Short-height Request opens, retains keyboard focus inside, and closes with Escape. Orientation-like resize does not require reload. Actual phone orientation/safe-area behavior remains unverified.

## NETWORK

Fresh Hero: workshop GLB **NO**; Gallery photos **NO**. Initial local requests include main/vendor/CSS, section chunks, Hero/navbar campaign assets and favicon; exact resource entries and transfer sizes are in `hero-network.json`. Vehicle and workshop load later; modal/AI lazy resources arrive on use. Full-scroll capture has 16/16 Gallery photos loaded.

During the comparable stress sequence, resource entries stayed **97 → 97** despite ten full top/bottom returns, ten themes and five modal/AI cycles. Workshop has one resource entry in that document. Responsive image changes and lightbox use can request different variants legitimately. Two repeated URL observations (navbar 420px campaign image and the Gallery AVIF original) are retained in raw timings; no repeated workshop transfer or retry storm. They are not presented as zero duplicates across every image candidate. Local server log contains **zero HTTP 4xx/5xx** in normal audit walks. External font response internals are cross-origin-limited.

## CONSOLE

Normal production audit document, after full walks, themes, Gallery/lightbox, Request, AI, Facility, resize and keyboard: **0 warnings / 0 errors** (`browser/console.json`). Reduced-motion production fixture also clean. Expected prior forced asset-failure errors are isolated QA behavior, not concealed normal-production warnings. Build warnings (Browserslist age, ambiguous Tailwind classes, large loader chunk) remain separate from browser console status.

## WEBGL / RENDERER

Measured **one homepage WebGL2 context** after full site and stress use. Hero startup snapshot has zero shared contexts before lazy ownership begins. Source creates the homepage renderer in vehicle-scene; workshop production receives a renderer loan, while the separate preview constructor is isolated from homepage paths. Theme/mobile/reduced-motion/preset/overlays did not create another observed context. Prior unchanged failure path plus fresh tests cover no-owner/failure behavior. Canvas does not persist over Gallery.

## PERFORMANCE

No FPS or GPU timing invented. Prior workshop cold/warm numbers are retained above; no speculative asset work. Current performance observer supports long tasks and layout-shift entries. Across the instrumented normal document, accumulated layout-shift entry value **excluding recent input = 0.0021133642**. This includes resizing, scripted UI and local QA chrome and is **not a certified standardized CLS/session-window score**. No large unexpected visible load shift was reproduced; Hero/Facility slots and Gallery dimensions remain reserved.

Global RAF counters include React/UI/scroll observations and are not renderer frame counts. Source review confirms demand scheduling, offscreen/hidden gates and paired cancellation; the prior unchanged workshop idle frames remained flat. No permanent extra loop was demonstrated. CPU throttling, network throttling, GPU timers and physical trackpad/finger instrumentation are unavailable; slower-device performance is not extrapolated from desktop.

## MEMORY / LIFECYCLE

Stress: ten top→bottom→top returns, ten theme toggles, ten Gallery open/next/close cycles, five Request and five AI cycles, repeated service/Journey changes and Facility views. Context count one, resource requests flat in comparable stress, no duplicate canvas/controls or stuck overlay observed. Prior workshop-native listener/observer audit stayed flat and remains applicable to identical source. Global heap snapshots, forced collection and total JS heap growth were **not available**; no universal memory-leak-free claim.

QA visible→hidden→visible events were simulated, then restored. This is not actual app backgrounding. Existing owner scheduling gates on document.hidden; no replacement context/loop observed after return. CSS and pointer review: vehicle `pan-y`, Facility `pan-y pinch-zoom` with horizontal-intent and vertical/multi-pointer release; Gallery/Request/AI retain ordinary scrolling. No blanket experience-wide touch-action:none or wheel hijack introduced.

## ASSETS

Observed runtime requests have no missing local assets. Build imports resolve. Approved workshop export/runtime hashes preserved. Historical Blender, source, preview and audit artifacts retained. Two 4,268,888-byte vehicle GLBs remain in public: canonical preproduction runtime and its original sportback candidate; the original is used by existing preview/protection tests and is not fetched as a second homepage model. Flagged as a retained deployable-copy observation, **not deleted**. No temporary reconstruction file was activated in production.

## BUNDLE FINDINGS

Measured current build bytes (gzip measured locally):

| Chunk | Bytes | Gzip bytes |
| --- | ---: | ---: |
| shared GLTFLoader/Three | 615,093 | 157,728 |
| main CSS | 290,625 | 49,701 |
| main JS | 260,822 | 83,019 |
| vendor | 141,283 | 45,340 |
| animejs | 36,845 | 14,314 |
| vehicle scene | 35,681 | 14,804 |
| workshop production | 30,862 | 9,039 |
| request steps | 25,713 | 9,975 |

Exact file names/all chunks: `bundle.json`. Shared loader is lazy; workshop and form stay split. No entire icon-library chunk identified; named Lucide imports are already handled by Vite tree shaking. No import refactor justified. Existing Google Fonts CSS requests Bebas Neue and Inter 300–700 with swap and preconnects. Cross-origin font body/weight utilization was not profiled deeply enough to prove any requested weight unused. The one observed stylesheet entry alone cannot prove cold internet font delivery; fallback remains readable. Typography and frozen CSS were preserved. No before/after saving claimed.

## BUSINESS-CLAIM AUDIT

Owner evidence/confirmation recommended for existing **over 20 years**, **75-point inspection**, **21+ brands serviced**, **genuine parts**, trained/industry-grade service claims and **100km pickup coverage**. Repository repetition is not independent proof. “Trusted by owners of” brand logos do not establish manufacturer authorization; no new relationship claim added. Reviews array remains intentionally empty rather than fabricated ratings/customer counts. Existing offer/coverage terms and bracketed policy wording deserve business-owner editorial review before public business sign-off. These are flagged content-verification observations under the requested rule, not silently rewritten and not newly certified by this technical audit. AI pricing/hours/warranty/ratings stay guarded by unknown-intent replies.

## AUTOMATED VALIDATION

Fresh completion run: production build **PASS**; app TypeScript **PASS**; node TypeScript **PASS**; isolated/production/release QA configuration TypeScript **PASS**; lint **PASS**; **369 tests PASS across 51 files**. Full command logs/timings in `regression.json`. Frozen Hero/Navbar/subsystem checks, captured source/asset hashes, lazy asset registry and approved runtime copy PASS. No valid test changed. QA-only Python/JS harness adds no production logic or dependency.

## PHYSICAL DEVICE STATUS

**UNVERIFIED.** No actual physical phone used. Previous host check found no existing ADB executable or identifiable Android phone; browser viewport emulation is not phone validation. Use `docs/TOLI-WORKSHOP-PHYSICAL-DEVICE-QA.md` for local USB/private-LAN testing. No cloud device farm, external upload or fabricated heat/temperature data.

## REMAINING LIMITATIONS

Physical GPU/touch/virtual keyboard/thermal feel; native OS reduced motion/backgrounding; multi-browser/screen-reader certification; throttled CPU/network; full-monitor wide screenshot coverage; heap/GPU profiling; business-content verification; live external-link/service availability. Existing cold 3D setup cost and large shared loader remain known observations. No speculative changes to approved systems were made to hide those limits.

## FINAL RELEASE DECISION

Technical browser gate passes with the stated tooling limits and owner content-verification observations. Production source/design/assets remain frozen; complete automated baseline passes; no unresolved reproduced P0/P1/serious P2.

**FINAL WEBSITE RELEASE = PASS**

**TOLI MOTORS WEBSITE = RELEASE READY**
