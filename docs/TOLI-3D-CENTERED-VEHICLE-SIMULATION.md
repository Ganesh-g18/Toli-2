# Centered vehicle simulation — 25 October 2026

Current candidate: **toli-192890d4a5ba433505da05b1**. Retained previous candidate: **toli-fe6c9d00893267c51ecb78e5**. Local implementation and candidate only; no production migration/deployment.

## Simulation design
The same red primary stays at [5, 0, -18], grounded in the real workshop. The scene captures its closed bounds before creating/animating the opening controls. Their center [5, 0.7526504632714146, -18] becomes the stable orbit target; opening any panel cannot recalculate or shift it. Vehicle entry activates inspection automatically. Default is a lane-facing front three-quarter view, azimuth -30 degrees, elevation 0.22 radians, FOV54. Aspect-aware distance fits the closed body without distorting it; a modest vertical framing lift clears the bottom controls.

The actual workshop, lights, floor contact and detailing geometry remain. A camera-facing architectural cutaway prevents foreground walls/uprights blocking the primary while inspecting. This clips architectural rendering only in Vehicle, with full architecture restored outside Vehicle. It excludes floor, lane markings, primary, detailing and secondary materials. It introduces no geometry or extra draw pass. Picking now respects the same clipping planes, preventing invisible columns intercepting visible door taps. This is a rendering treatment, not a rebuilt workshop or a replacement studio.

The four existing charcoal-car meshes are temporarily translated [-3, 0, 6] farther down the lane during simulation. Their original positions return exactly on exit. They remain the same geometry/materials and keep their floor height; no duplicate or deleted car. Detailing remains fixed and peripheral.

## Centering
At desktop 1280x800, projected closed-bounds midpoint percentages (x,y): front (50,50.36), left (50,45.11), rear (50,50.36), right (50,45.11), front three-quarter (44.65,51.64). Perspective makes the quarter silhouette asymmetric; the closed reference target stays fixed. Its horizontal deviation is approximately 5.35% of the viewport, without dramatic drift. Eight headings and all-open views were inspected. The target remains identical through opening each panel, presets and resets.

## Orbit and controls
The corrected +deltaX horizontal mapping is preserved for mouse and touch. Native desktop short left drag measured -0.14 radians and its reverse returned to the start; repeated longer drags traversed more than one full turn each way without toggles. Vertical range -0.04 to 0.42 radians, camera height at least 0.55; no under-floor/upside-down inspection. Zoom is a bounded fit-distance multiplier 0.78–1.35. Wheel up goes closer/down farther; automated touch tests verify outward-pinch closer/inward-pinch farther. Physical touch/pinch feel is not certified.

The compact bottom strip supplies five real component buttons, Front/Left/Rear/Right/three-quarter views and Reset Vehicle. Reset closes all four openings, turns headlights off and restores the centered default. Deliberate native mesh clicks exercised all five actions from appropriate angles. Dragging across components suppresses toggling. Existing door geometry, hinges, 58-degree/650ms motion, bonnet/boot behavior and warm-white optics remain. Approved #921824 paint parameters and vehicle asset are unchanged. All-open 360 inspection works; narrow portrait can use wider zoom to see the extended doors without reducing the default closed car's prominence.

## Responsive, accessibility and lifecycle
Phone checks are **EMULATED**, not physical: 430/412/390/360/320 portrait and 844x390 landscape. Screenshots and DOM measurements record no horizontal overflow. Final camera/action targets are at least 44px in both dimensions, including the tightened 320px row. Portrait prioritizes the primary; landscape uses one low control strip. Native keyboard Space/Enter exercised toggles/reset; real buttons, accessible names, pressed action states and existing visible focus are retained. Automated reduced-motion scene tests cover immediate transitions and usable manual inspection. No browser-setting or physical reduced-motion claim.

Leaving Vehicle resets all components and orbit state and restores contextual staging/cutaway. Reentry reuses the one deferred vehicle and returns to centered defaults. Actual canonical Standard View transition has zero spatial-owned canvases; return has exactly one and all five states false. Destination restoration is retained. Orbit and presets do not write browser history. The source lifecycle tests also cover repeated exits/disposal/context recovery and one renderer/model owner.

## Performance and protection
Default draw calls 101 before, **100 after** (closed and all-open). Current front/left/rear/right/quarter views: 100/92/84/82/100. View-dependent culling changes counts; no additional geometry/pass is introduced. Vehicle geometry stays 192,115 triangles, 125,363 vertices, 62 meshes, 12 materials, zero textures. Same 4,276,644-byte fingerprinted red GLB; one primary instance, renderer and WebGL context. Deferred startup requests workshop only, with primary requested at Vehicle entry. The recorded package browser session, including Standard return, fetched one workshop and one primary GLB, without failures; caches supply reentry. No physical FPS or memory certification.

A true task-start scoped SHA baseline checked **1,059 existing files** under src/public/tools/3d/tools/release/.github and root files: **1,048 unchanged**, eleven intentional edits, no missing/unexpected files. Six existing spatial runtime files and five intentionally affected test files changed; new helper/test/evidence/documents are additions. The staging asset descriptor remains unchanged because assets are identical. Traditional homepage, Hero, Navbar, official logo, Hero vehicles, traditional Inside TOLI, workshop/detailing/secondary/primary geometry, approved paint and component geometry remain unchanged. All **174 previous candidate files** match their task-start hashes. Audit scope and hashes are recorded in protection.json and previous-retention.json; this does not claim a clean Git checkout.

## Source, package and regression
Development: http://127.0.0.1:8178/Toli-2/?workshopLocation=vehicle&debugSpatial=1#/3d-experience

Canonical package: http://127.0.0.1:8179/Toli-2/?workshopLocation=vehicle#/3d-production-preview

Source tested first, then package. Independent HTTP byte/SHA checks match the workshop and primary assets. Actual packaged centered framing, controls, drag discrimination, keyboard reset, responsive layouts and Standard disposal/reentry were exercised. Captured package warnings/errors are empty.

Production build (including final canonical clean build), application TypeScript, node TypeScript, QA TypeScript and lint PASS. Complete suite **554 tests / 69 files PASS** (baseline516/68). New tests cover 35 viewport/preset projection cases, cutaway hit testing, secondary transform restoration and automatic scene entry/stable target/reset. Existing meaningful interaction, input direction, pinch, tap suppression, lifecycle, context recovery and reduced-motion tests remain. One test requiring an obsolete source-code literal was updated to the new deferred-entry branch. Logs and all evidence: tools/release-audit/vehicle-simulation.

Canonical validation passes for current and retained previous packages. Physical Android validation must use this exact new identity, including orbit, touch/pinch, framing, control reachability, lifecycle and real performance. Earlier device results do not certify it.

CENTERED VEHICLE SIMULATION = PASS
360° INSPECTION = PASS
INTERACTIVE COMPONENTS = PASS
PHYSICAL ANDROID VALIDATION = REQUIRED
PRODUCTION MIGRATION = NOT AUTHORIZED
