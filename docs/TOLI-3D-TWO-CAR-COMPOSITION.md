# Red-center / grey-side release candidate

Date: 2026-10-26 (India). New canonical candidate: `toli-ac5606593db19031c64d2032`. Previous retained: `toli-3d0be34850a66263ebdf174b`. Production migration is NOT AUTHORIZED. Physical Android validation is REQUIRED.

## Red car

World root stays `[5, 0, -18]`, grounded at floor zero. It never translates or spins during walking, orbit, presets or reset. Closed-body target stays `[5, .7526504632714146, -18]`, computed exclusively from the red vehicle. The authored quarter heading is refined from −30° to −20° to show the side vehicle while keeping the primary centered, using the same 54° lens and existing fit/zoom limits. No combined red/grey bounds enter camera calculations.

Paint remains #921824, roughness .30, metalness .45, clearcoat .55. Vehicle geometry, materials and all existing hinges/light implementation are unchanged.

## Grey car

The same four secondary meshes receive an idempotent Vehicle-context offset `[-.8, 0, 2]` from their authored poses, replacing `[-3, 0, 6]`. Their aggregate world bounds are `[.05657686, .015, -17.21729660]` to `[2.26499004, 1.52485359, -12.34843445]`; center `[1.16078345, .76992679, -14.78286552]`. Relative to red: 3.84m toward the default view's right side and 3.22m deeper along workshop Z (approximately 5.01m ground-center separation). Charcoal materials remain unchanged. The grey vehicle has no new interaction tags or controls. Leaving Vehicle restores its exact authored poses.

There are exactly two vehicle instances: existing primary red and existing environmental grey. No asset or visible geometry was added. Architecture, detailing and official logo are unchanged.

## Composition and responsive QA

Development verified first at `#/3d-experience`, then canonical package at `#/3d-production-preview`. Desktop 1042×720 shows a dominant red car and recognizable separated grey car at right/rear. 1280×720 diagnostic framing also keeps the red-only target. Both source and package were checked at 430/412/390/360/320 ×844 and 844×390 landscape. No horizontal overflow. Narrow portrait prioritizes the red car; grey may be cropped. Landscape shows detailing, centered red and full grey front clearly, with compact lower controls. Existing layout and navigation controls are unchanged.

## 360° and walking

Front, left, rear, right and quarter source presets preserve the same red-only target and fixed root. Source orbit drag swept 7.28 radians (>360°) with all parts open; packaged orbit drag and zoom were also exercised. Existing zoom/pinch implementation is untouched. Reset closes all parts, turns headlights off and returns centered quarter presentation.

Source and final package each completed front→left→rear→right→front with headlights and both doors/bonnet/boot open. One canvas and one controls group were present throughout the package loop. Each source stop retained 1.62m eye height. Walk routes remain bounded and avoid the actual staged grey bounds, columns, trolley and red body/openings. A native attempt to back into the grey car stopped at x≈2.493m before its x=2.26499m edge plus .22m clearance.

A first packaged guided walk was safely cancelled on a focus pause (`Walk paused…`); resuming via the viewpoint control completed the loop. This was not a navigation obstruction. No camera-controller changes were made this iteration. Real Android focus, gestures, orientation and GPU behavior still require physical-device evidence.

## Interactions and all-open clearance

Headlights, front-left door, front-right door, bonnet and boot toggled in source and package. All-open state persisted into 360° and walking. Source geometry audit uses actual GLB node transforms/accessor bounds for grey and the actual adapted primary/hinge controls. Closed and all-open collision-free loops pass. All-open primary minX=3.17471112 versus grey maxX=2.26499004: **.89318658m lateral separation**. No door, bonnet or boot intersects grey. Detailing remains peripheral and unmodified.

## Performance and protection

Default draw calls remain **100 before / 100 after**. The primary asset remains 192,115 triangles / 125,363 vertices / 62 meshes / 12 materials, with no geometry change. Source observed render-geometry cache warmed from 97 initial to 101 after inspection; the prior candidate also stabilized at 101. This is existing geometry entering the renderer cache, not new vehicle geometry. One renderer/context, workshop and primary remain. No additional vehicle or network asset was introduced. Package console warnings/errors: zero. Network inventory and source/package byte comparison are recorded separately in the evidence folder.

Task-start hash baseline includes source, public assets, 3D sources and previous candidate. **1,195 files checked, 1,191 unchanged, four intentional changes, zero missing; all 166 previous-candidate files unchanged.** Exactly four existing files intentionally change: vehicle-context, vehicle-orbit and the simulation/scene test expectations. Asset binaries, traditional homepage, Hero, Navbar, Inside TOLI, workshop architecture, detailing, secondary geometry, approved paint and interaction handlers remain unchanged. See `tools/release-audit/two-car/protection.json` for exact counts and retained-package hashes.

## Validation and evidence

Canonical preparation and current/previous release validators PASS. Build, app/node TypeScript, QA TypeScript and lint results are in `tools/release-audit/two-car/regression/`. Full final suite: **582 tests / 71 files PASS**, 152.75s. Full test result is in `tests.log` and `regression.json`. The initial run found the intentionally changed quarter-angle expectation and a filesystem audit timeout under load. The angle expectation was updated; the complete rerun uses one worker and a 15-second test timeout, without weakening audit assertions.

Evidence: `tools/release-audit/two-car/placement-audit.json`, browser screenshots and source diagnostics, all-open source/package walking loops, responsive layouts, native grey collision probe, package network/console and final protection audit.

## Release gates

PHYSICAL ANDROID VALIDATION = REQUIRED for this exact candidate: real touch movement/look/component taps, portrait/landscape/browser bars, full loop and collision, focus/background recovery, repeated modes/lifecycle, real GPU/memory/thermal behavior. Emulation does not satisfy it. No production migration or deployment performed.
