# Changelog

## 2026-10-12 — Phase 2: layered cinematic display

- Build on Phase 1 with a layered hero chassis, complete artwork plane, reflection, raised technical frame, foreground corners, and elevated Quick Actions.
- Coordinate the short frame/artwork/HUD/action intro; keep controls usable throughout and preserve all approved hero bytes and proportions.
- Extend the existing depth hook with time-based damping, bounded mouse interaction, pointer-aware lighting, smooth neutral return, and shared offscreen/window cleanup.
- Add raised icon, heading, copy and accent planes to service cards; retain readable content and remove the redundant grid fade that hid partially visible mobile cards.
- Add restrained pointer reflection/depth to the existing primary CTA and improve button elevation, compression and ghost-action contrast.
- Extend the existing section entrance hook with intentional depth, media, scale and directional variants; avoid animating a parent and its descendants twice.
- Illuminate existing technical section dividers once; retain native scrolling.
- Refine the header backdrop and active-line transforms; support mobile-menu Escape dismissal and focus return.
- Repair the pre-existing footer section-link behavior for ordinary pointer/keyboard activation without changing route configuration or existing href values.
- Flatten hero depth below 1024px, reject touch/pen tracking, simplify mobile lighting, and keep the action dock below the complete artwork.
- Preserve reduced-motion/focus safeguards, cancel preference-sensitive motion, release settled animation frames, and share global listeners/visibility observation across selected surfaces.
- Add damping/clamp/idle/cleanup/touch/preference regression tests and a reduced-motion section-entrance test.
- CSS/DOM 3D selected; no WebGL, particle library, dependencies, or new image assets added.

Validation: production build and TypeScript pass; 8 tests pass in 3 files; ESLint remains at the Phase 1 baseline of 11 errors and 7 warnings. All 11 requested responsive sizes pass overflow/artwork/action bounds checks, with a separate floating-control collision pass. Production browser checks include mouse depth and neutral return, the CTA plane, mobile menu keyboard behavior, booking/enquiry, gallery expansion/lightbox, local support chat, footer activation and legal routes. Final inspected production console contains no errors. Physical-device frame rates, OS-level reduced-motion toggles, outbound calls/messages, and legacy direct/modified-click footer section URLs remain outside this verification/repair.

## 2026-10-12 — Cinematic depth and motion upgrade

- Preserve the approved hero artwork, image formats, native aspect ratio, branding, content, routes and existing contact destinations.
- Add bounded desktop pointer perspective to the hero and service cards with event-driven updates and preference-aware cleanup.
- Replace section-wide scroll-seeking animations with restrained, finite viewport entrances using native Web Animations and IntersectionObserver.
- Add consistent technical heading accents, Quick Action elevation and finite frame lighting.
- Move mobile Quick Actions below the artwork, increase targets to 44px and simplify decorative effects.
- Use the compact navigation menu on tablets; keep collapsed links out of keyboard navigation.
- Release route entrance transforms so fixed navigation remains attached to the viewport.
- Make booking dialogs scroll within short screens.
- Animate existing 75-point and 21+ indicators once; expose final values to assistive technology.
- Respect live reduced-motion changes; fix revealed-content visibility after responsive class updates.
- Fix four baseline TypeScript errors in touched components and add three lifecycle/accessibility regression tests.
- No dependencies added or removed; no WebGL assets introduced.

Validation: production build passes, TypeScript passes, 4 tests pass. ESLint retains 11 pre-existing errors and 7 warnings (baseline: 56 errors, 7 warnings). Browser overflow checks passed at widths 320, 360, 390, 412, 430, 768, 1024, 1280, 1440, 1600 and 1920. Production console showed no errors during the tested interactions. Physical-device performance and browser-level reduced-motion emulation remain outside this verification.

## PHASE 3 — Procedural vehicle service experience (2026-10-12)

- Selected direct Three.js for a single imperative, on-demand scene. Added `three@0.180.0` and development typings `@types/three@0.180.0`; no Fiber, Drei, postprocessing or additional motion packages.
- Audited Phase 2 before installing: build/TypeScript passed, 8 tests passed, lint baseline 11 errors/7 warnings. No vehicle/model assets found in the repository.
- Added an original generic procedural technical vehicle (Path B) in a compact service studio immediately below the approved hero. Approved PNG/WebP/AVIF artwork hashes remain unchanged. Mobile/reduced-motion/data-saving visitors receive a static SVG/DOM presentation (Path D).
- Shared low-complexity wheel/disc geometry and materials, custom beveled body/cabin, battery zone, floor grid and restrained technical ring. No external models, textures, particles, manufacturer marks, shadow maps or postprocessing.
- Hemisphere fill, directional key/rim and restrained red point light; controlled camera framing adapts to narrow tablet panels.
- Reused the Phase 2 depth hook's damped normalized pointer position through a shared subscription channel. No additional mousemove handler or React state updates per frame.
- Native scroll drives modest entry, slight rotation/key-light sweep, selected wheel/battery separation and reassembly at exit. No pinned scrolling, looping spin or scroll library.
- HTML/keyboard/touch controls reuse four actual service descriptions from a shared catalog. Existing service cards receive stable fragment targets and safe scroll offsets. Canvas remains decorative, unfocusable and pointer-transparent.
- Deferred dynamic renderer import near the studio, after hero image decoding, with a crossfade after first successful render. No loading screen.
- Clamp desktop DPR to 1.5 and tablet DPR to 1. Tablet receives fewer ring details, lower wheel geometry and one fewer light. Measured active-frame stalls trigger detail/DPR reduction or complete fallback. Rendering stops when settled, offscreen or document-hidden.
- Catch initialization/render/resize/shader failure and context loss, preserve all HTML, cancel frames/listeners/observers and dispose shared geometry/materials/renderer/GPU context on teardown. No custom textures or render targets are allocated.
- Fixed legacy footer direct/new-tab section links by allowlisting and normalizing existing fragments to the existing homepage route. Unknown and legal routes remain unchanged. Lazy sections are observed briefly until present.
- Added a missing screen-reader description to the existing enquiry dialog after interaction QA exposed a Radix warning.
- Added 12 meaningful tests covering quality, reduced-motion live changes, phone service access, scroll reassembly, pointer subscriptions, missing WebGL, render/context failure, cleanup and legacy lazy section links.

Validation: production build and TypeScript pass; 20/20 tests pass across 6 files. ESLint remains 11 pre-existing errors and 7 warnings, with no new findings. Final production booking and service interactions show no console errors/warnings. Browser viewport/layout checks covered 320×568, 360×800, 390×844, 412×915, 430×932, 768×1024, 1024×900, 1280×900, 1440×900, 1600×900 and 1920×1080; no horizontal overflow or clipped new service labels. Desktop/tablet rendering, phone fallback, keyboard selection, static-view disposal, booking, legal navigation and footer activation inspected.

Payload: lazy scene/Three chunk 515.33 kB minified / 132.86 kB gzip; main JS 292.77 kB / 92.65 kB gzip versus Phase 2 281.61 kB / 89.07 kB. Additional JS approximately 526.49 kB minified / 136.44 kB gzip on enhanced devices. CSS increases 5.38 kB minified / 1.12 kB gzip. No model or texture payload. Approximately 4,912 rendered mesh triangles / 80 draw calls on desktop, 2,512 / 56 on tablet. Vite's lazy-chunk size warning is retained and documented. Physical-device FPS, battery use and live OS reduced-motion settings were not measured; fallback/lifecycle tests use mocked GPU boundaries rather than a physical GPU fault.


## PHASE 4 — FULL WEBSITE 3D EXPERIENCE (2026-10-13)

- Replaced the studio-only ownership model with one shared renderer/canvas/resource set across studio, services, process and final booking docks. Native scrolling remains primary; GPU rendering pauses in quiet sections and hidden tabs, with observer/frame/pointer/resource cleanup on teardown.
- Added a cached native-scroll chapter timeline: arrival, inspection, parts, pickup, service, ready and completion. The actual four-step business workflow remains unchanged. Reused the original procedural vehicle, bounded wheel/brake/battery separation and an illustrative scan plane; no new models, textures, dependencies or postprocessing.
- Synchronized HTML studio/service/process controls and captions with the shared scene. Kept content, routes, artwork and business information in HTML. Added consistent technical trims, layered cards/media, instrument depth and restrained transitions across all sections; quiet forms/contact/footer remain usable without motion.
- Phones use the recurring original SVG and service-specific highlights with no WebGL; reduced motion freezes camera/parts/parallax/scan and preference changes dispose enhancement. Retained deferred loading, static-view/failure fallbacks, automatic quality reduction and DPR caps.
- Corrected physical-order active navigation, tablet process/Call Now overlap, footer floating-action overlap and gallery depth containment by portalling its lightbox to the body.
- Added ten tests for chapters, dock selection, service mapping, shared input cleanup, navigation, timeline/reduced-motion behavior, gallery portal/focus cleanup, one-canvas resource reuse and keyboard service synchronization.

Validation: production build and TypeScript pass; 30/30 tests across 9 files. ESLint remains the baseline 11 errors and 7 warnings. Final production service/process and desktop/mobile booking checks show no console errors or warnings. Full-page native scroll QA covers all 11 requested viewport sizes from 320×568 through 1920×1080 plus 1024×768 landscape; final measurements find no horizontal overflow, extra canvas, clipped new controls or CTA/floating-action collisions. Hero artwork and package manifests remain unchanged from Phase 3.

Payload comparison against Phase 3: main JS 298.83/94.82 kB minified/gzip (+6.06/+2.17); lazy scene/Three 516.20/133.25 (+0.87/+0.39); CSS 171.43/29.35 (+16.22/+3.87). Existing lazy section chunks also changed; these are individual bundle deltas. Shared scene uses 9 geometries/11 materials, approximately 4,912 triangles/80 draw calls on desktop and 2,512/56 on tablet, with no texture/model payload. Existing large lazy-chunk/toolchain warnings remain.

Delivered: full Phase 4 report, seven desktop/mobile screenshots and sampled full-page walkthrough. Limitations: browser emulation instead of physical-device FPS/battery/OS preference testing; GPU failure boundaries are mocked; walkthrough is sampled screenshots rather than real-time recording. Existing review/photo placeholders and business claims are preserved, not verified. No deployment or commit performed. All Phase 1/2/3 changelog history preserved byte-for-byte.


## PHASE 5 — CINEMATIC REFINEMENT & PRODUCTION OPTIMIZATION (2026-10-13)

- Preserved the Phase 4 single shared renderer/timeline/native-scroll architecture, approved hero assets, actual services/process, routes and prior work.
- Refined camera choreography with weighted 360 ms camera and 200 ms component damping, bounded look-at targets, gentler arrival/parts/completion poses and no repeated car entry translation between managed docks. Process previews expire on meaningful scrolling in either direction and cannot send a process chapter to another dock.
- Improved original body/roof profile, corrected roof/glass bevel intersection, added a dark sill, open shared metallic rims and slimmer spokes to reveal the existing brake assembly. Reduced wheel separation and retained controlled battery presentation.
- Tuned silver/glass/alloy/red materials and restrained emission; retained MeshStandardMaterial without new environment maps or physical-material cost. Refined existing key/fill/rim/accent light colors/intensities/exposure, lower scan opacity and quieter floor contrast.
- Added inexpensive shared-geometry contact-shadow discs. Replaced 24 separate floor-tick meshes with one disposed InstancedMesh. Retained on-demand idle/offscreen/hidden rendering, deferred loading, fallback/disposal, automatic downgrade and DPR caps.
- Evolved services/explorer into neutral software-style panels with explicit selected module/view state, reusable service readout and shared Solid/Technical illustration controls. Selective existing-material wireframe and matching phone SVG style add no second scene or duplicate body mesh. Responsive SVG component brackets are illustrative annotations, not projected telemetry.
- Standardized technology surface/radius/border/depth/motion aliases, reused existing motion durations/easing, reduced section entrance travel and simplified tilted ornaments, media offsets and stacked glows. Hero artwork stays unchanged; booking composition and CTA hierarchy settle cleanly.
- Refined phone modules/descriptions, 44 px style/explore targets, stacked lightweight vehicle state and desktop studio action allowance. Reduced motion retains static composition and all semantic controls. No false diagnostic/AI/digital-twin/telemetry claims or invented metrics introduced.
- Added five tests for weighted/clamped damping, forward/reverse preview expiry, stale-target replacement/idle, technical material reuse/solid completion and shared semantic phone controls. Corrected TypeScript test-query options found during validation.

Validation: production build and TypeScript pass; 35 tests pass in 10 files. ESLint remains 11 existing errors and 7 warnings. Final production console has no inspected errors/warnings. Full-page native responsive passes visit all 17 sections at all 11 established sizes, 320×568 through 1920×1080, with no final horizontal overflow, clipped content controls or floating-action collisions. Service/process keyboard feedback, fast end/home recovery, static-view removal/re-enable, desktop/phone booking, mobile menu Escape, gallery layering and idle/tablet rendering checked. After the final roof-only correction, the whole 1024 px page and affected vehicle states were recaptured.

Measured solid rendering: desktop 5,844 triangles/61 draws vs Phase 4 4,912/80; tablet 3,188/60 vs 2,512/56. Scan adds 2 triangles/1 draw. Low tier observed at 5,556/60; automatic DPR/detail reduction preserved. Eleven shared geometries/fifteen registered materials, no texture/model/shadow-map payload. Geometry increase is a deliberate quality tradeoff; physical FPS gains are not claimed.

Payload: main JS 301.23/95.52 kB minified/gzip (+2.40/+0.70); lazy scene/Three 521.20/134.62 (+5.00/+1.37); total 23 JS chunks 1,189.26/355.58 (+7.76/+2.18); CSS 181.38/31.04 (+9.95/+1.69). No dependencies or assets added; package manifests and approved artwork hashes unchanged. Existing toolchain/lazy chunk warnings remain.

Delivered: detailed report including technology claim safety, 12 desktop/mobile screenshots and updated 20-second sampled walkthrough. Physical-device FPS/battery/thermal behavior remains unverified; precise long-task/frame tracing was unavailable through the permitted browser interface. Mocked preference/GPU tests and browser emulation do not constitute physical testing. Stylized illustration/abstract connectors, existing placeholders/claims, baseline lint and large lazy chunk remain documented limitations. No deployment or commit. All Phase 1–4 changelog history preserved byte-for-byte.


## PHASE 6 — CINEMATIC 3D CAR HERO & PRODUCTION HARDENING (2026-10-13)

- Replaced the image-first primary hero on supported desktop/tablet with the existing original vehicle in a dark automotive studio and immediately usable semantic headline/actions. Kept approved PNG/WebP/AVIF artwork byte-for-byte as progressive loading/static/failure/mobile/reduced-motion fallback, plus the original SVG safety net for failed poster loading.
- Added the hero as a fifth dock/chapter of the same shared renderer/canvas/car/resource set. Preserved native-scroll service/part/process/booking continuity, controlled camera interpolation, technical mode and one-canvas cleanup rather than adding another model viewer.
- Added a finite 1,900 ms active-frame desktop / 900 ms medium-low reveal: restrained light/rim progression, small approach/turn, lower three-quarter target and soft one-time headlight activation. No constant spin, particles, bloom, mirror pass or new geometry/material/texture assets. The car gently scales to 1.13 in the hero and settles to the existing journey scale.
- Preserved on-demand settling, offscreen/hidden pauses, DPR/quality policy and failure disposal. Added generation-aware deferred loading/retry, live data-saving teardown and safe handling of missing decode APIs. Stale failures cannot overwrite the latest preference; route teardown prevents late initialization.
- Reflowed the responsive hero explicitly: horizontal desktop, compact stacked tablet, copy/actions plus approved artwork on phone; no phone GPU import. Reduced motion keeps static composition. Suppressed duplicate hero SVG during live/poster transition; show it only as image-failure insurance.
- Fixed legacy hero/booking hidden-overflow focus offsets using non-scrolling clipping, reset inherited hero spacing/perspective, preserved small camera pointer response, and removed unnecessary CTA blur. Replaced the final Call Now link/button nesting with one semantic telephone link.
- Resolved 11 lint errors with eight documented defensive catches, equivalent type aliases and const timer. Retained seven generated mixed-export compatibility APIs via narrow explained react-refresh exceptions. Final lint is zero errors and zero warnings, without disabling rules globally.
- Removed unconfigured literal site-URL metadata placeholders. Added validated optional VITE_SITE_URL canonical/OG/Twitter URLs and homepage sitemap, plus factual AutoRepair structured data from existing contact details. Verified configured output in a temporary example-domain build; no production domain/ratings/prices/reviews were invented.
- Added eleven tests for immediate hero/poster/booking, phone/reduced-motion policy, module rejection, technical/static controls, pending teardown, image failure, stale preference retry, finite quality reveal, public URL validation and hero/journey resource reuse.

Validation: production build and application/config TypeScript pass; 46 tests pass across 12 files. ESLint 0 errors/0 warnings. Final inspected production console is clear. All eleven established viewports pass full-page checks through 17 sections; the entire set was repeated after the hero focus fix, and targeted final CTA checks/full 320/390/1024 passes were repeated after semantic/clipping refinements. Keyboard/dialog/menu/fallback/technical/reverse-scroll/legal cleanup checked. Hero/booking internal scroll offsets are 0; legal/static mode removes the canvas. All Phase 1–5 history preserved byte-for-byte.

Payload vs Phase 5: main JS 299.16/95.13 kB minified/gzip; lazy scene/Three 521.88/134.92; all 24 JS chunks 1189.13/356.12; CSS 188.72/32.42. Total JS delta -0.13/+0.54 kB. No dependencies/assets added. Same solid render budget: desktop 5,844 triangles/61 draws, tablet 3,188/60, low 5,556/60; scan adds 2/1. Eleven shared geometries/fifteen registered materials; no texture/reflection/shadow-map payload. Existing lazy-chunk/toolchain notices remain.

Opt-in local performance sample (caches not cleared, before final focus/poster refinements): LCP 424 ms, CLS 0, max observed event duration 160 ms, 8 recorded long tasks across load/booking interactions. This is not Lighthouse, field CWV or INP. Audit instrumentation is excluded from normal builds. Physical-device FPS/battery/thermal behavior remains unverified; hardware preferences/faults and formal screen-reader certification remain outside this verification.

Delivered: detailed Phase 6 report, 12 desktop/mobile screenshots and 22-second sampled fallback/reveal/scroll walkthrough. Samples are editorial pacing, not real-time loading/FPS evidence. Remaining limits include stylized non-diagnostic vehicle, native inline handoff, existing placeholders/claims, deployment URL/social-preview follow-up, large lazy chunk and PNG legacy fallback. No deployment/commit/backend changes.


## PHASE 7 — DARK GRAY + RED AUTOMOTIVE TECHNOLOGY THEME

- Centralized charcoal, graphite, metallic panel, silver typography, red action/selection, focus and error roles in src/theme.css. Existing HSL/Tailwind and journey APIs resolve through semantic aliases; renderer colors live in src/lib/vehicle-theme.ts. Migrated legacy explicit journey/SVG/scene colors without rebuilding the architecture.
- Refined the live cinematic hero into a neutral dark studio with restrained red floor accents, gray grid, white headlights and a readable gunmetal vehicle. Body finish changes to metalness .62/roughness .30; existing cool white key/rim/hemisphere and red point lights remain. No additional lights, geometries, textures, shadow maps or post-processing.
- Applied graphite panels, gray borders, silver headings, controlled red selection edges and readable technical metadata across services, car-part readouts, process, about, trust, gallery, coverage, reviews, booking and footer. Technical wireframe/component states retain the same shared selection and camera motion.
- Dark navigation uses white labels and red active underlines. Primary actions stay red; secondary buttons and support shortcuts use graphite surfaces. Original transparent logo and selected dark brand logos get reversible display filters; brand names match the existing list.
- Dark inputs, bright placeholders/focus rings, warm error treatment and the existing error/consent semantics preserve form clarity. Floating support shortcuts yield while enquiry dialogs are open, preventing phone submit-button overlap.
- Mobile/tablet layouts and reduced-motion/low-quality fallback policies remain intact. Approved artwork assets are unchanged; the fallback is integrated using a reversible brightness/contrast treatment and dark framing.
- Production build, both TypeScript checks and all 46 tests pass; ESLint 0 errors/0 warnings. Inspected production console is clear. All eleven viewports were inspected through all 17 sections; final 320/390/1024 full-page passes repeated after secondary-button refinements. Solid-background text samples report no final contrast failures; gradient/canvas presentation reviewed separately.

Payload vs Phase 6: main JS 299.52/95.08 kB minified/gzip; lazy scene 522.40/135.16; all 24 JS chunks 1190.05/356.27; CSS 206.53/34.40. Dependencies and all 31 source assets are unchanged. Desktop solid hero remains 5,844 triangles/61 draws, one canvas, idle after settling.

Delivered: 21 desktop/mobile screenshots, a 24-second sampled full-page walkthrough and detailed report/review bundle. The video is an editorial sequence of actual captured states, not a real-time recording or FPS/loading benchmark. Physical-device FPS/battery/thermal behavior remains unverified. Formal accessibility certification, real OS reduced-motion appearance, GPU hardware faults and public deployment checks remain outside this verification; existing content placeholders, large lazy chunk and CDN/logo dependencies remain. Phase 1–6 changelog history preserved byte-for-byte.


## PHASE 8 — CINEMATIC MOVING 3D CAR HERO

- Audited the existing positive-X-facing vehicle: four centered wheel groups, XY-plane torus tires/hubs (Z axle), cylinder discs baked onto Z, separate caliper boxes, existing body/light meshes, floor/grid/contact shade and shared camera. No separate suspension strut geometry was present.
- Added a deterministic finite driving model: entering, accelerating, tracking, decelerating, settling and settled. Nominal active timeline is 3.8 seconds desktop / 2.584 seconds tablet, followed by bounded weighted pose convergence. No physics engine, video/GIF hero, audio, replay button or continuous spin.
- Corrected hierarchy with a body suspension pivot and independent steering/rolling groups. All four tires, hubs, spokes and discs roll around local Z; calipers remain fixed relative to their steering group. Front wheels alone receive a small steering cue. Tire travel uses the displayed world radius (.5 local radius × vehicle scale). A restrained machined spoke highlight improves rolling readability without adding geometry.
- Shared acceleration/deceleration distance drives wheel rotation, heading-aligned approach and floor movement. Camera orbit creates the side-to-front-quarter tracking view without spinning the vehicle. Body pitch, a small vertical offset and a short damped rebound create visual weight transfer. Contact shading follows the vehicle's X/Z position and heading.
- Reused the floor grid and added twelve sparse desktop-only instanced floor accents from the existing box geometry. Three depth rates provide parallax; accents disappear as speed reaches zero. Existing key/accent lights move across the gunmetal finish; headlights remain cool white and rear LEDs use a separate restrained braking material. No extra lights, textures, shadow maps, real-time reflections or post-processing.
- HTML headline/actions remain immediately available. Optional view controls wait for the driving sequence to finish; a decorative scene-state label is truthful and does not show speed/RPM/health scores. Static view remains available. Pointer input is held neutral during driving and eased back afterward.
- Interrupts on departure/offscreen; reverse scrolling returns settled without replay. The same scene/canvas continues into services, parts, process and booking. Provider memory prevents preference/quality/static-toggle recreation from replaying the entrance. Hidden documents pause/reset frame timing; active delta is clamped to 48 ms.
- Phones, reduced motion and data saving retain the approved fallback. Tablet uses shorter movement, smaller distance, lower geometry/light budget and no added parallax instances. Performance downgrade cancels full driving. WebGL/module/image-failure policies remain intact.
- Fixed a live tablet endpoint rounding issue that could otherwise keep the visually stopped scene in settling; added exact-clock-cap regression coverage. Added 17 meaningful state/lifecycle/hierarchy/heading/radius tests, retaining all previous 46 tests.

Validation: production build and both TypeScript checks pass; 63 tests pass across 13 files; ESLint 0 errors/0 warnings; inspected production console clear. All eleven responsive sizes cover all 17 sections without horizontal overflow, duplicate canvases or measured solid-background text contrast failures. Four wide desktop sizes and tablet reached all finite stages and idle with projected vehicle bounds inside the canvas. Immediate navigation, reverse scrolling, booking during acceleration, static restoration and mobile booking were checked in the browser.

Payload vs Phase 7: main JS 299.71/95.15 kB minified/gzip; lazy scene 526.26/136.79; all 24 JS chunks 1194.10/358.04; CSS 207.50/34.51. No dependencies or source assets changed. Desktop active driving peaks at 5,988 triangles/62 draws; settled is the existing 5,844/61, with no scheduled idle loop. Tablet is 3,188/60. Eleven registered shared geometries; seventeen materials including two small new roles.

Delivered: sampled normal-production load/drive/settle/shared-journey recording, thirteen screenshots, detailed 43-topic report and review bundle. Capture intervals are sampled/edited, not a continuous real-time or FPS benchmark. Opt-in projected bounds instrumentation is excluded from the final normal build. Physical-device FPS/battery/thermal behavior remains unverified. Existing stylized geometry, approximate contact shading, native inline dock handoff and deployment/content/toolchain limitations remain. Phase 1–7 changelog bytes preserved.


## PHASE 8 ADDENDUM — ORIGINAL FUTURISTIC SEDAN

- Replace the original body slab with an interpolated sedan shell, longer wheelbase, lower fastback roof, smoked glass, four-door lines, flush handles, technical intake and thin segmented white LEDs.
- Refine aero wheels while retaining axle rotation, separate steering, fixed calipers and existing finite driving behavior. Recess the illustrative conventional battery during normal driving.
- Replace whole-body wireframe with subdued paint, sparse technical outlines and service scanning; preserve factual service selection and the one-canvas journey.
- Match the phone SVG to the sedan identity, retain approved desktop artwork fallback, and batch trim/spokes to reduce desktop settled draw calls from 61 to 48.
- Add 64/32/20-section high/medium/low body detail; keep on-demand rendering, phone/reduced fallbacks, bounded reveal and disposal.
- Verify production build, both TypeScript projects, lint, 65 tests, all 17 page sections at ten widths, and six-width moving-scene framing. Updated actual-capture walkthrough and review report delivered. Physical device FPS, battery and thermal measurements remain unverified.


## PHASE 9 — FUTURISTIC EXPERIENCE REDESIGN

- Audit the current sedan walkthrough, production entry, changelog and architecture; classify features to keep, transform, remove, merge or reimagine.
- Replace the conventional main page sequence with six native-scroll experience chapters: entry, vehicle interface, service journey, Toli Motors/trust, request and contact, followed by the footer.
- Recompose the hero around large full-width typography, a free-standing larger sedan, edge controls and direct booking; keep the finite driving/reduced-motion/fallback architecture.
- Merge the vehicle studio and nine service cards into one accessible service matrix and selected module. Add sedan-associated DOM zone selection, shared component-focus state and predefined closer wheel/battery views.
- Refine parts separation so tyre/rim move outward while brake disc/caliper remain at the axle. Add one finite automatic inspection scan returning to solid, without reverse-scroll replay or constant scanning.
- Replace duplicated process timelines with one selected-step vehicle presentation and live description using the existing four business steps; retain chosen previews through canvas handoff and release them on meaningful scrolling.
- Consolidate business/workshop/brands/coverage/gallery/comparisons/reviews/offers into four native trust disclosures; preserve media, controls, factual copy and legacy deep links. Merge direct WhatsApp messaging into Contact.
- Replace the generic CTA with a truthful request console carrying explicit service selection into an editable enquiry topic. Refresh automatically filled topics on reopening while preserving manual edits; retain fields, consent, validation and explicit submission.
- Add minimal chapter/menu navigation, Escape/focus return, discoverable booking at phone sizes, and support shortcuts behind an explicit Help control.
- Reimagine phone layouts around a horizontal selector, matching static sedan/component view and one information panel; keep phones/reduced-motion/data saving free of WebGL. Disable generic section fades in the new experience and retain static readable compositions.
- Correct trust/footer heading hierarchy; preserve HTML business content, semantic controls, live descriptions, focus, touch targets, gallery portal and legal cleanup.
- Reuse one renderer and existing geometry/material/light resources. No dependencies, model textures, reflections, shadow maps, postprocessing or image asset changes. Desktop stays 7,988 triangles/48 draws and tablet 4,280/47; default 1024 document is about 48% shorter.
- Validate production build, both TypeScript projects, 79 tests across 14 files, zero-error/zero-warning lint, clear production console, all eleven full responsive journeys and six-width moving-sedan framing.
- Deliver seventeen screenshots, a complete sampled walkthrough, the 32-topic report, source/evidence/validation review bundle. Physical-device FPS/battery/thermal/OS preference and formal accessibility certification remain unverified; existing content/deployment/toolchain limitations remain. No commit, deployment or external submission.


## PHASE 9 UPDATE — SEDAN SYSTEM ENTRY / IMMEDIATE BOOKING

- Preserved futuristic entry and connected service matrix, components, journey, trust and request.
- Existing hero booking dialog is the red primary action. Explore Services enters the existing native service chapter. Persistent navigation booking has red treatment.
- Removed artwork picture/imports, image decoding dependency and obsolete poster CSS. Original approved source assets remain intact.
- Immediate SVG sedan yields to successful WebGL and preserves entry on failures, reduced motion, data saving and unknown/limited mobile capability.
- Eligible phones (reported >=4 CPU threads and >=4GB memory) use the existing tablet scene with settled entry drive. Existing adaptive performance fallback retained. No new dependencies or GPU effects.
- Phone layout keeps both hero actions visible at all eleven established sizes, including 320x568. Optional lightweight view is accessible on mobile.
- Validation: 82 tests in 14 files, production build, both type checks and lint pass. Keyboard booking opens the original dialog; secondary enters services. Lightweight mode shows SVG with zero canvases. No enquiry submitted.
- Evidence/report: chat outputs/phase9-entry-update. Responsive emulation is not a physical-device performance, LCP or CLS benchmark.


## PHASE 9 CTA UPDATE — BOTTOM-LEFT BOOKING

- Positioned the existing hero Book Service dialog trigger above the bottom-left technical label. Kept persistent navigation booking. Desktop button is 170x48px with restrained hover/arrow response and white keyboard focus outline.
- Moved supporting desktop description sideways to provide clearance within the approved hero height; headline, sedan, camera, geometry, animations, chapter rail and service journey retained.
- Mobile booking uses normal flex flow beneath the vehicle/message, with a full-width 48px touch target above the technical label.
- Native browser checks at all eleven supported targets: no CTA overlap with headline, vehicle stage, chapter rail, description, captions or other actions; no horizontal overflow. Both hero actions remain usable. Enter opens the existing booking dialog. No enquiry submitted.
- Production build, application/configuration TypeScript checks, 82 tests in 14 files and lint pass. Evidence in chat outputs/hero-booking-corner.


## PHASE 9 BOOKING — SHARED TRIGGER AND INPUT VERIFICATION

- Audited routes, navigation, hero, services, process, final request, footer and existing enquiry form. Actual booking entry is EnquireDialog's ENQUIRE NOW modal; explicit validated submission opens WhatsApp at +91 8074946335. No booking route or new endpoint.
- Added BookServiceAction as the shared header/hero/mobile Book Service implementation, reusing EnquireDialog and applying the same explicit selected service topic. Existing enquiry and selected-service request controls retain their clearly labelled dialog actions.
- Reported dead-button failure did not reproduce in the current preview before modification. No input interception found: button owned sampled padding/center/corner hit targets and canvas pointer-events remained none. No CSS, geometry, animation or hero positioning changes.
- Verified native pointer activation from button padding and header at all eleven sizes. Modal opens, focuses the form, and Escape restores the clicked trigger. Phone layouts need one pointer activation; physical touch hardware was not tested.
- Verified Tab/Enter/Space, Solid/Technical independence, settled drive preserved, matching selected topic across header/hero/service/final request, and clean production console. No request submitted.
- Added two desktop/mobile behavior tests with actual modal, topic, form-focus and close-focus assertions. All 84 tests, production build, both TypeScript checks and lint pass. Evidence/report: chat outputs/booking-wiring.


## FUTURISTIC ENQUIRE NOW / SERVICE REQUEST EXPERIENCE

- Previous architecture: EnquireDialog modal shared by Book Service, Service Enquiry, service-specific request and final ENQUIRE NOW. No enquiry route or backend submission API; validated form opened a WhatsApp draft at +91 8074946335, then closed with a redirect toast.
- Redesigned the same modal as a graphite service console with simplified sticky Toli header/back navigation, large Service Request presentation, stationary sedan system on the left and grouped request interface on the right. No second page, route or modal.
- Reused VehicleIllustration, the existing original sedan SVG, with honest battery/wheel highlights for mapped service topics. No new GPU context, car model, driving animation, renderer or asset.
- Kept one short form: name and phone required; vehicle brand, editable service topic and message optional; existing consent gate and field limits preserved. Four visual groups, no wizard.
- Added nine accessible service buttons from the existing catalog; free-text topic remains available. Contact readiness, optional brand, service topic and consent/handoff status reflect actual form state. No diagnostic claims or decorative phone-number exposure.
- Preserved WhatsApp endpoint and draft content. No fake sending progress or delivery confirmation: successful popup opening now shows the real next step, review/send in WhatsApp. Draft remains editable in memory.
- Added inline icon/text/ARIA field validation, first-error focus and clear blocked/failed-popup recovery that retains all fields.
- Mobile stacks a compact static sedan, small status grid and full-width form; 48px submit target. Sticky back action, scrollable modal and dynamic viewport height keep the form reachable. No sticky submit overlay.
- Accessibility: unique IDs, conventional labels, name/tel autofill, tel/numeric input, field descriptions, native HTML choices, modal focus containment/restore, keyboard-only completion. Reduced motion removes dialog/UI transitions; sedan is static in every mode. Form works with zero canvases.
- Performance: no dependencies added. Main JS gzip 91.35 to 92.80kB; CSS gzip 38.21 to 39.83kB. Deferred scene remains 531.81kB/138.97kB gzip. No new GPU rendering or persistent animation.
- Tests: 84 prior tests preserved, ten enquiry cases added; 94 tests/15 files pass. Production build, application/configuration TypeScript checks and lint pass. Production warning/error console empty.
- QA: eleven established viewports, no modal horizontal/field overflow; native service choices, missing/invalid input, back/focus restore, full keyboard flow, mobile and 390x500 short viewport. Manual valid-submit checks used an isolated opt-in local draft preview; real normal-build handoff and blocked/exception cases tested with popup mocks. No test enquiry delivered.
- Screenshots: desktop initial/selected/progress/review/validation/preview confirmation, mobile initial/form/selected/preview confirmation, production console and all-size captures. Report/evidence in chat outputs/futuristic-enquiry.
- Limitations: no backend or delivery acknowledgement exists. Physical phone keyboard/autofill, OS reduced-motion and hardware failure were not directly tested; SVG independence, media CSS, viewport emulation and unit tests cover applicable behavior. Existing large deferred scene chunk advisory remains.


## UNIFIED SERVICE REQUEST FLOW

- Audit found the existing futuristic Enquire Now experience was EnquireDialog, a modal, with no enquiry route. Moved that same console/form into the one canonical /enquire-now route using the existing HashRouter. Browser URL is #/enquire-now.
- Header and hero Book Service, Service Enquiry, Request this service and final ENQUIRE NOW now use ServiceRequestLink with SERVICE_REQUEST_ROUTE/serviceRequestDestination. All navigate in the same tab; no separate booking/request/enquiry routes or handlers.
- Generic booking/enquiry opens without automatic service preselection, including after a previous generic draft chose a service. Explicit service requests carry a validated existing service ID in the query string. Draft edits for the same service context are preserved; privacy-history return preserves the same draft.
- Removed the obsolete EnquireDialog modal component and open/close state after moving its existing form. No old booking route existed to remove. Existing WhatsApp submission mechanism, fields, validation, consent, handoff/error feedback and stationary sedan remain.
- Homepage design, geometry, camera and service journey retained. Link styling and touch targets match existing CTAs. Browser Back restores source scroll position and homepage selection/mode/3D preference, and skips replaying the hero intro. Query context participates in the existing brief route transition.
- Audited mobile, footer and legal navigation. Mobile equivalents share the same route. Footer and legal header contain no request CTA; none was invented. Call, WhatsApp, Contact, Explore Services and informational chapter/process navigation retain their actions.
- Updated affected modal tests to routing assertions, retained the 94-test baseline, and added nine routing/context/privacy cases. 103 tests across 16 files pass; production build, application/configuration TypeScript checks and lint pass. Production console clean.
- Manual QA: five actual homepage request entry points at desktop and mobile, browser Back after each, generic reset, service-specific Battery Services prefill, keyboard Enter navigation, privacy-history draft retention, required/invalid validation, isolated mobile draft preview and all eleven responsive sizes. No actual enquiry delivered.
- Report, routing table, screenshots and evidence: chat outputs/unified-service-request. Existing large deferred scene chunk advisory remains. Valid handoff and blocked/exception behavior covered by normal-build popup mocks; native valid-submit QA used labelled local preview.

## SERVICE INTAKE BAY

Recomposed the existing /enquire-now route as an open vehicle service intake station. The same five fields, consent, nine catalog services, preselection/drafts and WhatsApp handoff remain. Added one optional managed tablet-quality original sedan scene with on-demand rendering, service/field-driven views, matching SVG fallback, a real form-state progress rail and a privacy-conscious review summary. Replaced the former enclosing form card with graphite surfaces, service-platform markings, overhead lighting and restrained technical connections. Form controls are immediately usable; reduced motion bypasses the renderer and arrival effects.

The current contract opens a WhatsApp draft, so no request ID, delivery acknowledgement, fabricated sending delay or REQUEST RECEIVED state was introduced. Local QA preview and blocked-handoff fixtures never transmit details. Homepage composition and canonical CTA routing remain unchanged.

## MINIMAL PREMIUM SERVICE REQUEST

Simplified the existing /enquire-now page into a calm automotive service desk: original logo/Home and Back actions, restrained introduction, small static matching sedan, one graphite form panel, compact catalog service chips and a simple footer. Removed the enquiry-only managed 3D bay, arrival/scan/camera/connection effects, intake progress/status panels, review gate and their obsolete tests/styles. Homepage 3D and shared booking architecture are preserved.

The five original fields, validation, consent, drafts, service-specific preselection and existing WhatsApp draft success/error behavior remain. No API, route or form was added. Confirmation and blocked-handoff screenshots use explicitly isolated local QA fixtures with no transmission; production still states that WhatsApp delivery is unconfirmed.

## PREMIUM STEP-BY-STEP SERVICE REQUEST POPUP

Previously, service-request CTAs navigated to the calm standalone /enquire-now form. The primary in-app experience now opens one app-wide Radix dialog over the current page, via the existing ServiceRequestLink / BookServiceAction wrappers. Header Book Service, hero Service Enquiry, service-specific Request this service, final Enquire Now and the navigation-menu Request Service action share this control. Call, WhatsApp, Explore Services and chapter navigation retain their separate behavior.

ServiceRequestSteps renders four internal-state groups: Your details (existing name/phone), Vehicle (existing optional brand), Service (existing nine catalog choices, editable topic and message), and Review (summary/Edit controls, consent and actual submit). useServiceRequestForm centralizes fields, validation, session-only drafts and the unchanged WhatsApp draft handoff. Contact validation blocks invalid step advance and focuses the first error; review validates consent and contact again. Specific services are safely preselected while every popup opens at Step 01. Back and close/reopen retain entered values; Done clears the finished service-request session so a new request starts fresh from any CTA. No step routes, new API, fabricated receipt or request ID were introduced.

The existing /enquire-now route remains shareable and refresh-safe, rendering the identical shared step component. Privacy Policy navigation temporarily closes the popup; browser Back resumes the draft and restores the captured homepage selection/technical preferences through the existing return-state utility. Normal popup interaction does not navigate or remount the homepage.

Desktop uses a centered graphite modal (78vw, capped at 1000px, maximum 88dvh), a restrained backdrop and a scrolling content pane with consistently placed actions. Tablet reduces padding; mobile uses a full-screen sheet, compact numbered/segmented progress, safe-area padding and visualViewport sizing for keyboard space. Inputs retain semantic labels, autofill, touch targets, errors and accessible focus. Decorative icons are hidden from screen readers. Radix traps focus and locks body scrolling; the application makes background content inert and restores the exact origin scroll and trigger focus. Escape respects the upper dialog before the underlying menu. Reduced motion disables popup/step translation and scaling.

The homepage renderer pauses while obscured and defers initialization/pointer updates, then resumes its existing selection and preferences. The form contains no WebGL or large vehicle visual. The existing synchronous handoff confirms only that a WhatsApp draft opened, not message delivery or an appointment. QA confirmation/error captures use explicitly isolated no-delivery fixtures.

Validation includes the production build, both TypeScript configurations, full test suite, lint, fresh production console, all four steps at all 11 supported viewports, short phone-height/keyboard-space checks, forward/reverse keyboard trapping, scroll locking/restoration, generic/specific/menu CTA entry, direct URL refresh, review/validation, retained failure data, retry and Done reset. No dependencies were changed.


## DIRECT SERVICE REQUEST STEP NAVIGATION

- Made all four progress targets semantic, keyboard-accessible buttons, including comfortable numbered mobile targets.
- Direct navigation preserves shared draft data without validating untouched fields; Continue validates the current step and final submission validates the full required contract.
- Completion follows actual validity, with current/check/error symbols. Review identifies incomplete contact details and provides direct Complete/Edit actions. Vehicle, service and message remain optional.
- Preserved the popup design, focus trap, scroll lock, reduced motion, shared direct-page fallback and original WhatsApp handoff.


## SEARCHABLE VEHICLE BRAND SELECTOR

- Replaced the native select with one labelled, local searchable combobox supporting known brands and manual entry. Centralized 75 practical passenger brands with locale-aware A–Z ordering and diacritic/punctuation-normalized matching.
- Added keyboard arrows/Enter, active option semantics, constrained scrolling, touchable rows and Escape-to-close-suggestions before closing the modal.
- Preserved shared optional brand state, direct step switching, Review and draft persistence; canonicalized/trimmed brand values and safely encoded custom brand text in the original WhatsApp draft. No model field or dependencies added.


## INDIAN VEHICLE BRANDS AND MODEL

- Curated 35 current Indian-market passenger brands, verified against Indian-market listings and manufacturer/dealer sources. Removed discontinued Abarth and paused Jaguar from suggestions; added currently offered Tesla and McLaren, retained VinFast. Manual entries remain unrestricted. See docs/indian-vehicle-brands.md.
- Added separate optional Vehicle Model text input to shared draft state, Review and the safely encoded original WhatsApp handoff. Older drafts without a model remain compatible.
- Kept the premium combobox, A–Z sorting, normalized local search, keyboard/mobile interaction, direct steps and all existing submission/validation behavior. Brand suggestions do not promise workshop service coverage.


## BRAND-DEPENDENT OPTIONAL VEHICLE MODELS

- Added a researched, centralized Indian passenger-model catalogue spanning current and older vehicles, luxury/EV models and manually entered legacy brands. Source register: docs/indian-vehicle-models.md. Lists are deduplicated and locale-sorted.
- Reused one accessible combobox implementation for Brand and optional Model, with local search, manual entry, keyboard selection, independently scrolling suggestions and a clear-model action. No-brand/custom-brand entry remains usable.
- Brand changes clear the prior model; canonical spelling-only normalization preserves it. Shared draft/navigation and the original optional Model handoff contract remain intact. Review explicitly displays Brand and Model, with Not specified for omitted values. No new fields, API or dependencies.


## TOLI IDENTITY AND MANUAL 360 VEHICLE INSPECTION

- Reused the supplied 1483×352 transparent PNG (333,374 bytes), copied unchanged into the established asset pipeline. Header, footer, legal/header routes and service request branding share the same cached asset with preserved aspect ratio.
- Added restrained gunmetal physical paint clearcoat, graphite wheels and existing white headlights/red rear lights/calipers. No external textures, renderer, library or physics engine.
- Added intent-aware horizontal dragging to the existing shared renderer in settled hero, parts and completion views. Unbounded yaw, bounded time-based inertia, pointer capture/cancel cleanup and retained orientation across Solid/Technical. Added attached headlight housings and tightened front/rear light strips exposed by full-angle inspection. Cinematic chapters blend inspection rotation out; stable floor, attached vehicle components and contact shadows remain.
- Existing lightweight/reduced-motion/data-saving fallback and all popup form behavior are preserved. No 3D viewer added to the popup.


## UNTOUCHED LOGO AND COHERENT TOLI PALETTE

- Sampled the official PNG's dominant opaque red (#BD2226) into a shared UI/Three.js palette; darker CTA states and accessible lighter text/focus/error tones stay in the same red family.
- Removed logo image effects. Added graphite header and localized neutral surface contrast beneath the supplied black/red transparent asset, without changing its pixels.
- Unified vehicle calipers, rear lights, technical accents and lighting around the brand red while preserving gunmetal paint, near-black structure, white lighting, 360° interaction and all enquiry behavior.
