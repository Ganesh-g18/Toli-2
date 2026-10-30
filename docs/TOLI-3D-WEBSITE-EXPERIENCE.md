# TOLI Motors — spatial website experiment

Date: 2026-10-20. This is an isolated review prototype, not a production replacement.

## VISION

The existing workshop becomes a place-based navigation environment. Users choose physical locations through in-scene markers or a semantic location menu. There is no long scrolling homepage beneath it, no wheel-to-chapter mapping, no WASD, audio, physics engine or gaming HUD.

## ARCHITECTURE

The application remains its existing React / HashRouter / Three.js stack. `src/App.tsx` adds exactly one lazy import and one isolated route. All experiment code and styles live in `src/experimental/spatial/`. No framework, dependency, package upgrade, production component edit or new backend.

`SpatialExperience.tsx` owns semantic navigation, URL state, loading/error presentation and overlay pause state. `scene.ts` owns exactly one Three.js renderer, one workshop instance and an optional retained vehicle in that same scene. `locations.ts` owns eight authored destinations. `Content.tsx` adapts existing verified site modules; `ContentBoundary.tsx` prevents a failed deferred information chunk from removing the shell/navigation.

## EXPERIMENTAL ROUTE

`/Toli-2/#/3d-experience`

Local production review: `http://127.0.0.1:8139/Toli-2/#/3d-experience`.

Deep link example: `/Toli-2/?workshopLocation=services#/3d-experience`.

The destination is an outer query parameter, deliberately outside HashRouter's own search key. The existing PageTransition remounts routes when its search changes. This choice keeps that production component untouched and avoids destroying/reloading the workshop on each destination. Native Back/Forward updates destination state without reloading the scene; browser Back from Reception to Gallery was exercised and retained one canvas. Invalid/missing values safely resolve to Overview.

## RENDERER

Exactly one renderer constructor in the experiment. The existing homepage scenes do not mount on this route. No workshop + vehicle + effects renderer split, no hidden fallback canvas. Local runtime instrumentation observed one WebGL2 context and one canvas through repeated navigation, vehicle loading, themes and context restoration. Renderer, controls/listeners, observers and parsed owned GPU resources dispose on unmount. Existing byte/template caches are reused rather than creating unlimited URL caches.

## WORKSHOP

Approved runtime asset: `public/models/toli-workshop-web-v2.glb`, 4,076,400 bytes.

SHA-256: `b2461de9d4a12014e7cfbfaf692363f42a6bdf7018b75cd8e7bb7ec929f7dc98`.

Approved architecture/materials, export and Blender source are unchanged. Runtime lighting uses the established RoomEnvironment, neutral key, cool fill and hemisphere recipe without recoloring the building. Exposure remains .95. Real red structure and embedded materials supply the TOLI identity; no neon or expensive postprocessing.

## SPATIAL MAP

The model's reception/glazing bounds are approximately x 2.38–6.08, z -5.71–-1.70. Rear booth begins around z -27.19. Guided camera positions remain within x -0.2–0.89, y 1.8–1.9, z -18–-5.36 in the actual open central lane. Every interpolated position is inside this corridor; none passes into reception or the rear booth. The vehicle is placed in the right-hand bay at (5,0,-18), rotated to align its length down the bay. No invented rooms or structural modifications.

## DESTINATIONS

| Location | Physical association | Content |
|---|---|---|
| Overview | Central lane | Establishes roof, red structure, service floor and rear booth |
| Services | Left service-bay work surfaces | Existing nine-service directory |
| Vehicle | Right-hand service bay | Existing original preproduction sedan and enquiry action |
| Service journey | Reception approach | Existing four-step HowItWorks module |
| Why TOLI | Left workshop wall/work area | Existing WhyUs content |
| Gallery | Left workshop information/display point | Existing real-photo Gallery and lightbox |
| Reception | Existing glazed front office | Existing contact details and canonical request |
| TOLI AI | Reception help point | Existing deterministic local assistant |

Gallery, Why TOLI and help are information points, not claims that new physical rooms, signs or display installations exist in the photographed workshop.

## CAMERA SYSTEM

Eight authored views with position, target, FOV, orbit limit and anchor. Standard destination travel is 1.1 seconds with smoothstep easing. Position interpolates within the clear central lane; orientation uses quaternion slerp to avoid abrupt direction flips when looking from one side of the workshop to the other. No physics dependency. Initial Overview has a short 1.4m establishing approach; deep links go to their requested view. Reduced motion cuts immediately. No perpetual auto-rotation.

Portrait framing uses a wider FOV and a downward asymmetric view offset to keep the floor/service area visible above the information surface. The approved model stays intact. Every destination has an Overview return through the persistent controls and information close button.

## HOTSPOTS

Restrained red-and-white markers project actual authored world anchors into semantic HTML buttons. Names reveal on hover/focus; the full location menu is always available, so spatial hunting is optional. A fine leader connects the selected physical point to a steel-toned information surface. Markers outside the visible frustum are hidden. Text remains HTML. There is no raycast-based occlusion system; some markers can be visible through transparent/overlapping objects. This remains a prototype limitation.

## SERVICES

Imports `src/lib/service-catalog.ts` directly. All nine services remain in their existing order, with Automobile Services selected initially. Selection preserves existing descriptions and prompts, survives destination switching, and passes the selected canonical service title to the existing request-dialog provider.

## VEHICLE EXPERIENCE

The existing original preproduction sedan is loaded only on first Vehicle navigation through `loadVehicleModel`, then retained in the same scene. Runtime audit observed one 4,268,888-byte vehicle resource entry and no second context. No manufacturer branding, diagnostic readings or telemetry. This prototype offers a spatial vehicle view and enquiry action; the full production component/hinge exploration controls have not been reproduced here. Its existing preproduction visual-approval status remains unchanged. Contact-shadow/grounding and final vehicle framing merit further design review.

## JOURNEY

Reuses the actual HowItWorks component through a scoped JourneyContext adapter; its four titles/descriptions are not duplicated. Default is Choose a service. The display presents the existing selector and description while its production dock/section framing is scoped out only inside this experiment. No second vehicle renderer is mounted by that component.

## WHY TOLI

Reuses the existing WhyUs module and its content. This task adds no ratings, business age, guarantees, certifications or inferred claims. Reuse is content provenance, not an independent audit of those existing business statements.

## RECEPTION

The camera approaches the existing red/glass office from the central lane. Contact/address content comes from existing local knowledge. Request Service remains reachable from header, mobile bottom control, Reception and relevant service information. No appointment-confirmation claim.

## SERVICE REQUEST

Uses the unchanged global ServiceRequestDialogProvider and its lazy four-step form: Details, Vehicle, Service, Review. No duplicate validation, submission, draft or WhatsApp logic. The workshop stays behind the existing modal and scene rendering pauses while it is open. A development diagnostic capture verified frame count stayed at 63 and paused=true during the request dialog. Browser QA opened/closed the canonical form on desktop, mobile and the controlled asset-failure path. No external WhatsApp message was sent.

## GALLERY

Reuses Gallery, GalleryImage, gallery-images data, original captions/metadata and the existing lightbox. Gallery module/photos are deferred until Gallery is visited; native lazy loading remains. No gallery image request was present in the initial route resource sample. Existing image sizing/rows are scoped to the compact display, without altering the production Gallery styles or source.

Actual browser QA verified next/previous, arrow key navigation, Escape and return focus. A discovered portal event-bubbling defect was fixed in the new experiment: Escape inside a lightbox must not also close the surrounding location. The added regression test requires Gallery to remain open and the photo trigger to regain focus.

## TOLI AI

Reuses the unchanged ToliAIPanel, local assistant and AssistantBoundary, loaded on first use. Quick-question response and close were exercised. There is no external AI API, key, cloud inference, telemetry or query charge. Its local JS module downloads on first opening; “no AI network request” means no remote inference/backend call. Existing site font loading remains external and is not new AI traffic.

## DESKTOP UX

Persistent minimal identity, theme, Help and Request actions. Overview introduces the space; Locations is the reliable alternative to marker discovery. Information uses a single compact steel directory surface, not a sequence of website cards or vertical sections. Horizontal deliberate drag gives a bounded look around the authored camera, rather than free walking. Wheel does not force location changes.

## MOBILE UX

Real fullscreen 3D remains. Bottom Overview / Locations / Request controls, a native scrolling location sheet, portrait camera framing and native scrolling information surfaces. Header Request stays accessible. Canvas touch-action is `pan-y pinch-zoom`; the existing deliberate-horizontal-intent drag helper gives vertical/diagonal gestures and multiple pointers priority. No global touch-action:none, joystick or scroll-jacking. Mobile QA here means browser viewport/click inspection, not physical-device touch verification.

## ACCESSIBILITY

Semantic main, headings, buttons, select, navigation, Radix location dialog, existing request dialog, existing Gallery lightbox and AI dialog. All destinations are reachable without looking for markers. Keyboard-only Tab/Tab/Enter selected Services in the browser. Location activation focuses its information heading; camera frame updates do not steal focus. Escape closes the location surface or the relevant nested dialog, with lightbox focus restoration explicitly tested. Native controls and information stay available after workshop failure. Full screen-reader and physical assistive-device testing remains unverified.

## REDUCED MOTION

Keeps workshop geometry, disables camera travel through a zero-duration transition and removes the experiment's decorative animation via the media query. Unit coverage checks immediate authored positioning and no queued idle frames. A local matchMedia fixture verified a 390px Reception deep link with real geometry; it is a simulated preference, not a physical-device/system-settings test.

## PERFORMANCE

Measured findings only:

- Final production loopback workshop transfer: 4,076,400 encoded bytes, 159.1ms ResourceTiming duration in one local sample. This is not an Internet download benchmark.
- Initial sample: one context, one workshop GLB entry, no vehicle GLB and no Gallery image requests. After repeated destinations, vehicle, themes, request, AI, Gallery and context recovery: still one context, one canvas and exactly two GLB resource entries (one per asset), with no failed local resources in the captured final run.
- Final warm production startup sample contained long tasks of 53, 57, 380, 93 and 452ms. An earlier colder shader startup showed a 1,592ms long task. Browser shader/cache state differs, so these are not a claimed before/after optimization benchmark.
- Development-only desktop sample: first model frame 929.4ms after scene creation, parse 117.8ms, last render CPU submission .6ms, 14 draw calls and 46,259 visible triangles. Culling/view affect these counts; .6ms is not GPU time or a frame-rate guarantee.
- Development frame/request counts stayed at 63 across separate settled samples and while the canonical request dialog was open. A further repeat cycle retained 76 geometries and 9 textures with one context; this is a bounded GPU-resource sample, not a full heap leak proof. No permanent scene loop; short-lived UI/focus work can still schedule global RAF callbacks, so global instrumented RAF totals are not a scene-only counter.
- DPR caps: 1.5 desktop; 1.25 compact/memory-constrained. Environment cube resolution 256 desktop / 128 compact or <=4GB. No shadow pass, bloom, DOF, SSR, physics or per-frame React camera state. Vectors/quaternions are reused during travel.

Startup stalling remains a material issue for a 3D-first site. No claim of acceptable integrated-GPU/low-end-phone performance is made. The existing application entry/CSS is shared and the eager Index module is left untouched; deeper bundle separation may help a future phase but would expand production scope. No long-duration heap or real-device thermal/battery benchmark was performed.

## FAILURE RECOVERY

Asset failure is cached by the existing bounded byte loader; no retry storm. Controlled unavailable state retains Locations, Services, Gallery, Request and Help rather than pretending geometry loaded. The asset-failure browser fixture opened the canonical request successfully. Deferred content has a local error boundary. Context loss pauses and shows restoring state; restoration reuses the same renderer and parsed model, rebuilding its PMREM environment once. Actual WEBGL_lose_context / restore events were exercised through local QA controls; no production code intentionally loses a context. Visibility, resize and zero-size recovery are event-driven and have focused tests. Scene pauses for menus, request, AI, Gallery lightbox, hidden page and nonintersection.

## VISUAL QA

Actual production-build captures, not unit-test-only approval. Exact measured viewport widths: 1920,1600,1440,1366,1280,1024,768,430,412,390,360,320; also 1366x500 and 740x360. Every final capture recorded a ready scene, a nonzero canvas, zero document horizontal overflow, and fitted navigation/information bounds. Full-page screenshots were used for wide captures after detecting that viewport-only screenshots crop to the in-app pane. Geometry, spacing, readability and controls were manually reviewed in contact sheets and individual views.

Evidence directory: `tools/release-audit/spatial/browser/`.

Required screenshots: `desktop-overview.png`, `desktop-services.png`, `desktop-reception.png`, `desktop-gallery.png`, `mobile-overview.png`, `mobile-services.png`, `mobile-reception.png`. Additional vehicle, Journey, Why TOLI, request, AI, light theme, context recovery, reduced motion and asset-failure captures are retained. `responsive-layouts.json` records actual sizes/bounds; `responsive-review.jpg` and `scene-review.jpg` aid visual review.

## AUTOMATED QA

Final result: **395 tests across 54 files PASS**. Production build, all TypeScript/QA configurations and lint PASS. Current task baseline was 379 tests / 52 files, after the previous visibility-hardening task (the brief's 369/51 count is older). Added 16 focused tests in two files: route isolation, location validity/history, semantic location menu, selected-service handoff/preservation, fallback, overlay pause/disposal, Gallery nested Escape/focus, zero-size recovery, one-renderer switching, context/environment restoration, bounded asset failure, deferred vehicle retention, hidden completion and reduced motion.

Full production build, app/node TypeScript checks, all existing preview/production/release/hardening QA TypeScript configurations, lint and the complete suite run through `tools/release-audit/spatial/checks.py`. Exact results/logs: `tools/release-audit/spatial/regression.json`. No tests deleted or skipped. One historical hash test narrowly normalizes only the exact two added App lines before comparing the original App hash; the rest of the 315-file historic assertions remain intact. No blanket hash exemption or baseline replacement.

Production-built JS was scanned to confirm debugSpatial / Spatial diagnostics are excluded. Development diagnostics at `?debugSpatial=1#/3d-experience` expose asset, ready state, destination, viewport, context, camera validity, requests/rendered frames, timings/resource counts and pause state. Copy diagnostics is local clipboard only. No telemetry/storage/backend.

## PRODUCTION HOMEPAGE PROTECTION

Existing homepage changed: NO. Hero: NO. Navbar: NO. Navbar car: NO. Hero cars: NO. Production workshop integration: NO. Approved workshop GLB/export/Blender source: NO. Gallery, Services, Component, Journey, Trust, Request, AI and Footer source: NO.

Only existing source edit is the two-line App lazy route registration. The one existing test edit authorizes exactly that addition while preserving historical assertions. All other existing source/dependency/assets match this task's captured baseline; `protection.json` records hashes. No production navbar link promotes the experiment, and no homepage replacement/deployment was performed.

Actual production-root smoke inspection confirmed the original navbar/Hero, Automobile Services default, Choose a service default, component/trust/workshop/Gallery/request/contact/footer structure and working header Book Service dialog. Full existing tests passed; no claim that every physical-device interaction was exhaustively re-certified.

## LIMITATIONS

1. Real-device performance, screen-reader, GPU/thermal and long-duration heap testing remain unverified; local startup shader stalls are observed.
2. Information displays are accessible viewport-anchored directory surfaces with projected world anchors/leader lines, not complete perspective-correct physical display installations. Marker occlusion is not raycast-resolved.
3. Vehicle remains the existing preproduction asset; contact grounding and richer vehicle controls need review.
4. Camera paths stay in the central lane by authored geometry-aware constraints, not a general collision engine. Human motion-comfort approval is still needed.
5. No audio, physical walking, backend changes, new business claims or production replacement.

## RECOMMENDATION

Keep the traditional website primary. The experiment is functional for review and establishes a viable spatial navigation architecture, but it should not be promoted to a full-site replacement until startup/device performance and the degree of environmental information integration receive a further design/performance pass.

**3D EXPERIENCE = PARTIAL**

**REQUIRES ITERATION**


# ITERATION 2 — startup, environmental displays and vehicle presentation

## STARTUP PROFILE / DEVELOPMENT VS PRODUCTION

Audit date: 20 October 2026. Only the isolated `#/3d-experience` changes. Raw local browser evidence and tooling: `tools/release-audit/spatial2/`. Instrumented before/after builds are separate from the normal production output. No audit UI or diagnostic strings were found in normal `dist`.

First useful frame means a successful render containing recognizable workshop geometry, followed by the next browser animation-frame paint opportunity and screenshot confirmation. It is not canvas creation, nor a hardware photon/GPU timestamp. All times below are milliseconds from navigation unless specified.

| Optimized production | Before (three samples) | After (three samples) |
|---|---:|---:|
| First useful paint opportunity | 1213.7 / 677.2 / 1151.3 | 898.5 / 714.1 / 580.1 |
| Median | 1151.3 | 714.1 |
| Median scene initialization to useful frame | 626.2 | 516.3 |
| Median renderer construction | 218.4 | 157.3 |
| Median environment setup | 76.9 | 61.4 |
| Median GLB parse | 86.7 | 85.1 |
| Median first render submission CPU | 171.0 | 11.8 |
| Median longest startup task | 323 | 182 |

Observed median navigation-to-useful improvement: 38%; scene-to-useful: 18%; first render CPU: 93%. These are local observations, not a universal guarantee or a causal allocation of every millisecond. Fresh page/context samples share a browser/driver shader cache that tooling cannot clear. Renderer creation and scheduling vary substantially. After samples 3–5 form the stable comparison; earlier after sample 2 overlapped validation load and is retained but excluded from this comparison.

**Development measured separately:** before 3327.1ms navigation-to-useful (~519ms after scene start); after 4178.1ms (~1262.5ms after scene start). The new DEV sample is slower. Its texture preparation interval was 737.5ms wall time, with scheduling/yield time included; this is not measured GPU upload time. Cold Vite module work dominates the pre-scene interval (~2.8–2.9s). DEV timing is not evidence of a production improvement. No StrictMode removal.

React route-shell/module execution and exact texture decode/GPU execution could not be independently resolved. Scene initialization marks, GLTF parse, renderer construction, environment setup, preparation and render submission are recorded directly. Readiness changes are bounded; heavy destination content remains lazy. No new entry delay or fabricated progress.

## SHADER FINDINGS

The historical 1.59s stall was **not reproduced** in this production baseline. Its exact original cause remains unconfirmed. Current baseline longest tasks reached 448ms, involving renderer/environment setup; first render CPU was 162–184ms. Do not describe the historical issue as conclusively fixed.

The approved workshop has 18 MeshStandard materials. Six program variants were visible at initial rendering; supported preparation warms seven, including the offscreen office floor. Variants include opaque shared materials, textured red steel, mapped floor, shutter, front/back transparent glass, and office floor. Glass is the only transparent workshop material. Shared scene lighting, environment and tone mapping remain. Shadow maps are disabled: no initial shadow-map pass can explain this sample. Wrapped GL calls expose CPU duration only; warm program readiness checks were short (up to about 2.2ms). This cannot identify cold driver GPU shader time or prove a per-material historical culprit.

Embedded images: three 512² PNG roughness, two 1024² PNG normals, three 1024² JPEG color maps. Estimated decoded RGBA8 plus mip storage: 32,156,328 bytes (~30.7MiB), not a measured VRAM allocation. Decode is inside GLTF parse. Observed individual upload CPU calls were generally 3–7ms with a ~23ms outlier; GPU upload execution cannot be separated. See `asset-audit.json` and raw program/material records. Approved GLB is unchanged.

## CHANGES MADE / BEFORE AND AFTER

Workshop bytes begin loading before renderer setup. Environment setup moves into preparation. Installed Three 0.180's supported `compileAsync` prepares the existing renderer; unique textures use `initTexture` across bounded MessageChannel yields. Per-renderer texture caching prevents repeat vehicle upload work and resets on context loss. No extra renderer, invented API, timer delay or watchdog. Loading remains until a successful useful workshop render. Generation/disposal, visibility and modal guards protect preparation; hidden work resumes legitimately. Vehicle readiness follows a successful render. Original first-frame timing remains stable after recovery.

## ENVIRONMENTAL UI

Reusable world-anchor definitions specify destination, surface kind, width, normal and camera-aware visibility. Projected semantic HTML surfaces use gunmetal backing, steel borders, small mount details, thin red edges and bounded ±7° perspective. ResizeObserver refreshes placement without a permanent GPU loop. Mobile uses flat bottom sheets linked to the environmental anchor. This is restrained approximate perspective, not a full physically occluded CSS display installation.

**Services presentation:** one compact nine-service index plus selected description in a workshop service board; Automobile Services remains default. All descriptions come from existing content.

**Journey presentation:** four steps across a process board, with the selected step description below. The actual screenshot review found inherited oversized step labels; local scoped typography was corrected and rechecked. No content changes.

**Why TOLI:** architectural two-column information plate using existing verified copy, without invented statistics.

**Reception presentation:** front-office display with existing address/contact details and canonical Request Service action.

**Gallery presentation:** framed workshop photo contact sheet with deferred existing images; captions, accessible lightbox and Escape/focus restoration retained. Long boards scroll internally.

**Wayfinding:** Overview prioritizes Services, Vehicle and Reception; secondary places remain guaranteed through Locations. Back-facing, distant and destination-irrelevant markers are suppressed. No full raycast occlusion; authored anchors may still need visual tuning.

## VEHICLE PLACEMENT / SCALE / LIGHTING / CAMERA

Same existing preproduction sedan, same asset bytes and materials. Root is [5,0,-18], yaw π/2. Model bounds are approximately 4.87m long, 2.2095m including mirrors, 1.5053m high; these are model proportions, not surveyed workshop dimensions. Bounds minimum Y is grounded at floor zero. A local generated soft contact texture adds body/wheel contact at ~0.022m without a shadow-map pass. It is scene-owned separately and disposes once. The car shares the workshop environment and lighting; no independent showroom rig.

Desktop camera: [7,2,-23.4] looking at [5,.85,-18], FOV52. Mobile: [7,2,-26], same target, FOV72 and portrait view offset. The full car including mirrors fits the tested frustum. Front-quarter view shows workshop context and does not hide behind the front column. Bay travel uses [2.6,2,-24.5] to clear the divider/column, distance-proportioned legs and the existing ~1.1s duration. Rapid changes retarget from current pose. Visibility/modal resume does not jump back to an old origin. These are authored safe paths, not general collision detection.

Vehicle GLB remains deferred and cached. Loading is stated without fake percentages. Injected vehicle 503 produced one attempt and a controlled unavailable message while the workshop remained usable; no replacement car or retry storm. A sample selection-to-settled Vehicle frame was 1115.2ms, including the authored 1.1s camera movement; vehicle network in that sample was 160.8ms. This is not pure asset latency or precise first-photon timing.

## MOBILE

Browser viewport checks: 430, 412, 390, 360, 320 pixels wide at 844px high; landscape 740×360. Actual document widths matched each setting and scroll widths matched, with one canvas. Screenshots inspected: Overview, Services, Vehicle and Reception, all portrait widths and landscape. Environmental content uses scrollable flat bottom sheets; navigation and Request remain reachable. Vehicle is completely visible above the portrait sheet. Canvas retains vertical pan and pinch-zoom gestures with restrained drag thresholds. Physical phone/touch hardware and OS gestures: **UNVERIFIED**.

## ACCESSIBILITY

Semantic location buttons, form controls, descriptions and navigation remain HTML. Keyboard Enter opened a Gallery image; Escape from its Close control dismissed it and restored focus to its originating image button. Request opened with focus on Name; Escape returned to the experience. Browser Back/Forward retained the destination flow without model reload. Focused tests also cover switching during movement/preparation and controlled failure. Reduced-motion matchMedia fixture preserved actual workshop and vehicle with immediate camera positioning; OS-level preference and physical-device behavior were not directly changed. Existing fallback remains covered by the full suite. No external form submission was performed.

## PERFORMANCE / MEMORY

Warm final frame CPU submission: Overview 1.1ms / 76 calls; Services 0.6ms / 13 calls; Vehicle 2.5ms / 80 calls. Medians across captured destination frames were 1.8 / 0.6 / 1.1ms respectively. Transitional frames differ: Vehicle had a 56.6ms maximum during captured preparation/transition work; this is not a stable FPS guarantee. CPU render-call timing excludes GPU completion. Gallery final frame: 12 calls, ~0.5ms. See `submission-summary.json`.

Two bounded browser stress passes each completed 20 destination transitions, 10 Vehicle entries, 10 Gallery opens, 5 Request opens, 5 AI opens and 10 theme toggles after warmup. Baseline/middle/end remained 77 geometries, 10 textures, 10 programs, one context, one canvas; workshop and vehicle each requested once. No obvious monotonic GPU resource growth.

Global add/remove counts are cumulative operations, not a live listener census. Target-classified audit showed no positive change on persistent window/document/canvas targets. Increasing operations were temporary image load/error handlers, form invalid handlers and heading outside-focus handlers; document click removals also increased. Detached-node garbage collection, retained heap and long-duration leaks are **not proven absent**. Do not interpret negative net operation counters as negative live listeners.

Audit hide/show and forced WebGL loss/restore recovered visible workshop on the same renderer/context count. Three resets uploaded geometry statistics after context loss (12 visible geometries after restore versus 77 warmed), so those numbers are not evidence that retained source geometry disappeared. Context restoration prepares retained assets again. Demand rendering remains idle without motion and pauses behind dialogs/visibility; no permanent frame loop added.

## NETWORK

Initial after sample: workshop one request, no vehicle request. Vehicle intent adds one deferred vehicle request. Gallery image URLs are deferred to Gallery. Request and AI remain lazy; stress showed no external inference calls and no GLB retry storm. Existing Google Fonts CSS remains an external resource; this is not a claim of zero external network. Failure fixture vehicleAttempts=1. Normal production warning/error console snapshot is empty.

## VISUAL QA

Evidence: `tools/release-audit/spatial2/browser/`.

Required desktop: `desktop-loading.png`, `clean-desktop-overview.png`, `clean-desktop-services.png`, `clean-desktop-vehicle.png`, `clean-desktop-journey.png`, `clean-desktop-reception.png`, `clean-desktop-gallery.png`.
Required mobile: `mobile-overview.png`, `mobile-services.png`, `mobile-vehicle.png`, `mobile-reception.png`; additional width and landscape captures alongside them.

Loading screenshot uses a documented five-second local response fixture solely to make the real preparing state capturable; benchmark samples exclude it. It subsequently reveals workshop geometry automatically. All other clean destination screenshots use normal production output. Profile-only fixtures and tools never enter normal build output.

Rendered review: workshop geometry stays visible; graphite steel/mount cues and restrained red markers read as workshop displays rather than bright floating cards. Text remains semantic and readable, boards preserve destination context, and the full car has floor contact with no visible floating. Gallery last row is reached by internal scroll. Portrait sheets trade physical perspective for readability. The preproduction car remains stylized and user aesthetic/motion-comfort approval is still needed.

## PRODUCTION PROTECTION / REGRESSION

Baseline SHA audit covers existing source, dependency files and approved runtime assets. Only seven existing files differ: five experimental spatial files and the two existing spatial tests. New helpers/tests are also isolated. Homepage, App, Hero, Navbar, navbar car, Hero cars, production Inside TOLI integration, workshop GLB and vehicle GLB are unchanged. See `protection.json` and `before.json`. No production redirect or replacement.

Production build PASS; application/node TypeScript PASS; QA configurations PASS; lint PASS; **405 tests across 55 files PASS** (baseline395/54). Ten focused tests added. Final rerun followed the Journey typography correction. Exact timings/results are recorded in `regression.json`.

## REMAINING LIMITATIONS / APPROVAL

Physical device UNVERIFIED. Browser shader caches could not be reset; the historical 1.59s stall could not be reproduced or conclusively attributed. Local optimized startup improved, while the DEV sample worsened. GPU execution, true cold-cache behavior, sustained heap/GC, full occlusion and human motion comfort remain unresolved verification limits. No universal startup/FPS claim and no production promotion.

**3D EXPERIENCE ITERATION 2 = PARTIAL — FURTHER ITERATION REQUIRED.**

Ready for the user's visual feedback on this isolated iteration; keep the existing production experience primary. Further acceptance should include physical-device performance and cold-driver startup investigation before a stronger release classification.

# ITERATION 3 — immersion, navigation and content completeness

Audit completed 21 October 2026. Scope: isolated `#/3d-experience`. The traditional website remains primary. No startup pipeline rewrite, extra renderer, approved asset modification or production redirect.

## EXPERIENCE AUDIT

Before code inspection, the optimized route was used in order Overview → Services → Vehicle → Journey → Why TOLI → Gallery → Reception → TOLI AI, followed by random-order navigation. Findings were recorded before changes in `tools/release-audit/spatial3/experience-audit.md`: brand, Services, Request and Locations were clear; Vehicle/Reception had weak physical discovery; Gallery/Why TOLI looked toward a mostly flat wall; × was less explicit than Overview; Journey lacked a contextual request action. Premium Detailing survived the tour. The office cluster and car already had convincing continuity.

## SPATIAL NAVIGATION / OVERVIEW

Three primary aisle direction signs now expose Services, Vehicle/service bay and Reception/front office. They use authored Overview anchors rather than pretending the actual office is directly ahead of the opening camera. Existing destination anchors remain for other views. Secondary destinations stay in Locations and restrained contextual office cues. Labels clamp inside screen edges; this was corrected after portrait screenshot review. The primary entry visibly says Services. Overview remains available in the footer and is now explicitly labelled on each display's exit. Footer orientation names the actual area instead of repeating IN THE WORKSHOP.

## CAMERA CHOREOGRAPHY

All eight viewpoints audited. Full positions, targets, FOV and landmark inventory: `tools/release-audit/spatial3/camera-definitions.txt`; common near/far .05/120. Foreground columns/benches, destination subjects and roof/aisle/reception context remain visible where practical. Why TOLI now looks along the aisle toward the rear booth; Gallery also includes aisle depth and roof/booth context. No other camera position or vehicle camera was changed.

| Destination | Position | Target | Desktop FOV |
|---|---|---|---:|
| Overview | [.88,1.82,-5.36] | [-1.1,1.5,-27.5] | 55 |
| Services | [.1,1.9,-10] | [-4.8,1.4,-20] | 54 |
| Vehicle | [7,2,-23.4] | [5,.85,-18] | 52 |
| Journey | [0,1.85,-8] | [4.2,1.6,-3.6] | 58 |
| Why TOLI | [0,1.9,-14] | [-4,1.6,-22] | 58 |
| Gallery | [0,1.9,-8] | [-4.5,1.7,-15] | 58 |
| Reception | [-.2,1.9,-8] | [4.2,1.5,-3.5] | 58 |
| TOLI AI | [0,1.9,-7] | [4.2,1.5,-3.5] | 58 |

Portrait uses FOV at least72 and the existing view offset; Vehicle's portrait position remains [7,2,-26]. Existing ~1.1s travel and rear-bay waypoint remain. Rapid Services → Vehicle → Gallery → Reception → Overview settled correctly. Navigation now explicitly clears/rebinds the local drag gesture so capture from the previous destination cannot linger. No observed snapping, invalid camera state or clipping on exercised routes. Authored paths are not a general collision engine; arbitrary free walking is unavailable. Reduced motion immediately changes destination and retains real geometry.

## SERVICES

All nine existing catalog entries and Automobile Services default remain exact. Compact semantic select and the chosen description stay on the steel workshop board. Existing state ownership already preserved selection; this was verified across destinations, Locations and theme changes rather than replaced with a second store. Request passes the selected catalog title and actual initiating button to the canonical dialog. Browser verification selected AMC Plans; step03 showed AMC Plans checked and Service Needed populated. Three new focused tests cover contextual request triggers, selection persistence and source-backed trust guidance.

## VEHICLE

Same preproduction asset, placement, plausible dimensions, floor grounding/contact texture and shared workshop lighting as Iteration2. Complete front-quarter composition retained on desktop and portrait. No fake diagnostics, health score, showroom controls or independent spinning. Vehicle remains deferred and its failure remains bounded. Leaving Vehicle resets gesture ownership and returns to ordinary location navigation.

## JOURNEY

Four original steps, default Choose a service, remain in an environmental process board. The selected step has its own red indicator and tinted row, separate from destination numbering. Added Prepare a service request using the existing canonical dialog; no appointment promise or confirmation. Mobile content scrolls inside the sheet to later descriptions/actions.

## WHY TOLI

Production WhyUs contains broad statements such as genuine parts on every job, no hidden costs and industry-grade processes. Existing marketing copy alone does not establish those guarantees. The experimental display now uses existing catalog guidance about service scope, parts/fitment, pickup arrangements and consultation. No new statistics, ratings, certification or manufacturer authorization. Source mapping is saved in `content-verification.md`. Production WhyUs is untouched.

## GALLERY

Existing photos, captions and lightbox remain unchanged. Added a factual TOLI Motors/workshop photographs label. The camera preserves lane depth around the mounted photo sheet. Next/previous keyboard actions, Escape, return to Gallery and focus restoration were exercised. Rendering pauses behind the lightbox. Long photo sheets scroll internally.

## RECEPTION

Actual glass office, stair and red structure remain prominent. Request remains primary, with verified existing address/contact text. The canonical four-step dialog is unchanged. Request now returns focus to the actual Reception button rather than the global header button; browser verification confirmed Reception information as its ancestor after close. Existing overlay dims the scene and pauses rendering. Resuming does not create a permanent loop.

## TOLI AI

Office/help destination remains spatially coherent. Existing local deterministic panel/engine unchanged; no avatar, cloud inference, telemetry or key added. Opening from the information display now restores focus to Open TOLI AI rather than moving it to the header Help control. Browser verification confirmed this behavior.

## MOBILE

430/412/390/360/320 portrait and 740×360 landscape inspected. All eight Locations buttons remain present; scroll width equals viewport width. Locations is now a two-column bottom sheet, with a four-column compact layout in short landscape. Detailed environmental content stays in readable flat bottom sheets with projected connections. Car remains above its portrait sheet; Reception Request is reachable. Edge-constrained labels avoid text extending beyond the screen. No whole-page touch-action:none; existing pan-y/pinch-zoom and horizontal-intent threshold remain unchanged. No precise dragging is required. Physical phone hardware and OS gestures: UNVERIFIED.

## DRAW-CALL INVESTIGATION

Actual per-object callbacks observed submitted render passes, with sums reconciled to renderer.info.render.calls. Saved source and results: `draw-audit.ts`, `draw-breakdown.json` and four `browser/spatial3-before-*.json` exports. The prior 76/13/80 comparison mixed a warmed Overview with a camera-specific Services view:

| View/state | Workshop opaque | Workshop transparent | Vehicle opaque | Vehicle transparent | Contact | Total |
|---|---:|---:|---:|---:|---:|---:|
| Initial Overview, vehicle not loaded | 14 | 0 | 0 | 0 | 0 | 14 |
| Services baseline | 13 | 0 | 0 | 0 | 0 | 13 |
| Vehicle | 16 | 2 | 55 | 6 | 1 | 80 |
| Overview after Vehicle | 14 | 0 | 55 | 6 | 1 | 76 |

The car stays in the same workshop after loading and remains inside the Overview frustum; architectural occlusion does not eliminate GPU submissions. Services' angle excludes it and some workshop material groups. Workshop GLB geometry is already grouped by material, so large shared bounds also affect frustum culling. Transparent double-sided passes contribute to the counts. HTML labels/displays contribute zero WebGL calls. Shadow maps are disabled; environment generation occurs during setup, not as an extra settled-frame scene pass. No evidence of duplicated workshop instances or hidden startup vehicle loading.

**Draw-call optimization performed: NO.** No runtime destructive merging, architecture removal or car-detail reduction was justified by these CPU submission samples. Existing bounded costs were small; reducing a counter would not by itself improve the experience.

## PERFORMANCE / DEVELOPMENT VS PRODUCTION

No artificial cinematic delay or startup changes. The historical Iteration2 714ms median remains historical, not a reproduced universal target. Fresh idle optimized 1280×720 samples on20October:

| | Iteration2 baseline | Iteration3 |
|---|---|---|
| Useful frame samples ms | 1265.2 / 1130.4 / 1095.2 | 1177.3 / 1005.2 / 1179.9 |
| Median navigation to useful frame | 1130.4 | 1177.3 |
| Median scene to useful frame | 879.2 | 891.9 |
| Longest startup tasks per sample | 285 / 208 / 185 | 266 / 203 / 184 |
| Median longest startup task | 208 | 203 |

A ~4.1% navigation median increase with overlapping ranges and ~1.4% scene interval increase does not establish a significant regression or a new optimization win. Different browser/driver/session conditions prevent equating these with the historical714ms sample. First useful frame remains a successful geometry render plus the next paint opportunity, not a photon/GPU timestamp. Temporary raw startup exports did not survive the session restart; observed values are explicitly retained in `startup-observations.json`, separate from the saved draw and resumed browser evidence.

New DEV sample:3976.2ms, scene start3103ms, ~873ms scene-to-useful. Most pre-scene time is Vite/module work; no StrictMode wrapper exists in main.tsx, so StrictMode duplication cannot explain it. Preparation wall time includes task scheduling/texture uploads and driver readiness; prior DEV4180ms variability cannot be attributed solely to shaders. No DEV-driven rewrite or production tradeoff was made.

Same-app return visits already share workshop bytes and cached vehicle template CPU data. The route deliberately reparses workshop bytes and creates/disposes its own renderer on remount; persistent GPU caching would complicate correct ownership. No new persistent renderer/cache added.

## RESOURCE / NETWORK GUARDRAILS

Twenty alternating destination transitions, rapid retargeting and ten theme changes were exercised before continuation. Resumed saved evidence repeats20 alternating transitions and10 themes, with a context recovery between the first6 and remaining14. Before loss, resources remained77 geometries/10textures/10programs; after recovery visible geometry statistics reset, then warm back to77. Same renderer/context count1, one canvas, two GLB resource entries (workshop+deferred vehicle). These are bounded observations, not proof that every heap/GC leak is impossible. Detailed snapshots: `browser/iteration3-resources-*.json`, context recovery and themes exports. No unexpected monotonic resource growth observed.

Workshop loads once per page; vehicle adds one request on selection. Gallery remains deferred; canonical Request/AI internals remain lazy. No external AI inference was observed. Existing Google Fonts networking remains; this is not a zero-network claim. Normal console warnings/errors were empty; deliberate asset failures are excluded from the clean-console assertion. Normal dist contains no Spatial audit UI.

## ACCESSIBILITY / FAILURE RECOVERY

Keyboard-native semantic controls, visible focus, Locations trapping/escape, form focus, contextual restoration, Gallery keyboard/lightbox behavior and fallback retained. New tests verify request returns the actual trigger. Reduced-motion matchMedia fixture preserves rendered workshop/car with immediate camera changes; OS preference and screen-reader hardware not independently exercised.

Workshop503: informative unavailable state, Locations and Request retained; actual canonical dialog opened successfully. Vehicle503: workshop stays visible and unavailable text replaces endless loading. Gallery failure fixture: all16 photos become labelled Photo unavailable placeholders; original captions and controls survive. Context loss: restoring status, then useful geometry on the same renderer. Existing failure caches prevent automatic retry storms. No external form submission performed.

## FIRST-TIME USER WALKTHROUGH

1 Brand:clear TOLI Motors. 2 Interaction:entry invitation and signs clear. 3 Services:primary action and sign. 4 Request:header, Reception, mobile footer and contextual conversion. 5 Locations:consistent footer action. 6 Overview:explicit on every information board plus footer. 7 Gallery:Locations and existing photo controls. 8 AI:Locations, Help and help-point action. 9 Vehicle:grounded inside a service bay, not a separate showroom. 10 Remaining learning:secondary locations use Locations; authored perspective is approximate and motion comfort still needs human/device feedback. All essential navigation works without spatial dragging.

## VISUAL QA

All required captures are in `tools/release-audit/spatial3/browser/`, prefixed `iteration3-`:
- Desktop:desktop-overview.png, desktop-services.png, desktop-vehicle.png, desktop-journey.png, desktop-why-toli.png, desktop-gallery.png, desktop-reception.png, desktop-toli-ai.png.
- Mobile:mobile-overview.png, mobile-services.png, mobile-vehicle.png, mobile-journey.png, mobile-gallery.png, mobile-reception.png.
- Extra:locations-430/412/390/360/320.png, landscape.png, workshop-failure.png, vehicle-failure.png, gallery-failure.png, reduced-motion.png; contact sheets alongside.

Every destination was inspected in rendered output:workshop visible; destination clearly named; steel display treatment integrated; semantic text readable; lane/roof/office/booth context retained; no inventory/game-like UI; no observed overlaps or cropped car. Large content uses internal scrolling rather than hiding navigation. Mobile Overview leaves the workshop as hero. Final evidence uses a separate optimized audit build with a tiny Spatial audit label; normal production has no audit label. Clean production overview is also provided.

## PRODUCTION PROTECTION / REGRESSION

SHA comparison against Iteration3 start:only seven experimental files and the existing spatial-experience test differ. Source count/protection evidence:`before.json` and `protection.json`. Homepage, App, Hero, Navbar, navbar car, Hero cars, production Inside TOLI, approved workshop GLB, vehicle assets and dependency manifests unchanged. No production flow or homepage redirect.

Production build PASS; both TypeScript checks PASS; QA configurations PASS; lint PASS; complete suite **408 tests across55 files PASS**, up from405/55. No baseline test deleted or weakened. Exact final run logs and durations:`regression.json` and sibling logs. No runtime source edits after this run.

## REMAINING LIMITATIONS / FINAL STATUS

Physical device UNVERIFIED. Cold driver cache cannot be reset by available tooling; historical1.59s shader stall remains NOT REPRODUCED/CAUSE UNCONFIRMED. No universal startup/FPS guarantee. Browser/OS motion comfort, long-duration retained heap and full raycast occlusion remain future verification. Environmental HTML uses bounded approximate perspective; authored camera paths are not collision-aware free walking. The vehicle is still the existing stylized preproduction asset. No production promotion is implied.

**3D EXPERIENCE ITERATION 3 = PASS — READY FOR PHYSICAL-DEVICE VALIDATION.**

This is the experimental browser-validation gate only. The traditional production website remains primary.
