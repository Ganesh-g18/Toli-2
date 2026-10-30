# TOLI red primary and horizontal orbit correction

Candidate: `toli-fe6c9d00893267c51ecb78e5`. Previous retained: `toli-03ea962c2a2df6ceb9b08c5e`.

## Red paint
Only the primary paint material changed to TOLI deep red automotive paint: base #921824, roughness 0.30, metalness 0.45, clearcoat 0.55, clearcoat roughness 0.22, unchanged zero emission. Body, both supported front-door exteriors, bonnet, boot and painted mirror caps match. Distinct glass, optics, tires, wheels, brakes, chrome, trim, seals, cabin, engine and cargo materials remain unchanged. Headlights retain warm-white illumination. The secondary car remains charcoal.

The editable glTF and fingerprinted GLB are in tools/3d/vehicle-red and public/models/vehicles. All geometry BIN bytes remain identical to the silver revision. A spatial-only post-import helper restores the baked paint after the shared legacy adapter's bonnet tuning; the shared adapter itself is unchanged. Silver editable source, export, descriptor and runtime remain available for rollback.

## Rotation root cause and input QA
The shared mouse/touch pointer path applied -deltaX to azimuth. It now applies +deltaX at the same 0.007 sensitivity. No scene mirroring, camera composition changes or vehicle rotation workaround was introduced. From front, a 20px left drag changes azimuth 0 to -0.14; right returns to zero. Repeated left drags reached -7 radians and reverse drags returned to zero, passing a complete rotation each way without component toggles. Native browser mouse dragging was exercised with short and long travel; physical touch feel remains unverified.

Vertical behavior and bounds are unchanged and tested separately. Wheel up moved radius to 3.1, down to 3.5. Automated touch pointer tests verify matching horizontal signs and outward-pinch closer/inward-pinch farther. Native two-finger gestures were not available in this desktop browser. Eight-pixel tap/drag discrimination remains intact for all five actions.

## Interactive and visual QA
Headlights, both front doors, bonnet and boot were exercised in development and the canonical package, including all-open inspection. Front, front-left, left, rear-left, rear, rear-right, right and front-right images record the final red paint. Engine/cargo/inner trim remain appropriately neutral. Existing workshop columns can obscure portions at some orbit angles; geometry and approved FOV54 composition are unchanged. Presets still represent actual vehicle sides. Exiting orbit restores authored camera; leaving Vehicle or Standard/3D switching resets components and mode. Existing reduced-motion tests pass.

## Responsive QA — EMULATED
430, 412, 390, 360 and 320px widths plus 844x390 landscape were checked in development. Canonical package portrait and landscape parity was checked. No horizontal overflow; controls retain at least 44px targets. Short left/right drags preserved all-open state. Actual mesh taps at 430 and 320 closed all five actions deliberately. These are desktop browser viewport emulation and native mouse checks, supplemented by synthetic touch handler tests; they are not physical Android or manual pinch certification.

## Performance and parity
Vehicle: 192,115 triangles, 125,363 vertices, 62 meshes, 12 materials, zero textures before and after. GLB 4,276,640 to 4,276,644 bytes: four JSON bytes only. Authored closed/all-open draw calls 101 before/after; orbit front/left/rear/right 88/88/87/86 unchanged. One renderer/context. No new material clones or render passes. No physical FPS claim.

Source http://127.0.0.1:8176/Toli-2/?workshopLocation=vehicle#/3d-experience and package http://127.0.0.1:8177/Toli-2/?workshopLocation=vehicle#/3d-production-preview match. Independent HTTP comparison verified workshop and primary GLB SHA/bytes. Package browser trace loaded each GLB once, with no failing requests; captured console warnings/errors are empty.

## Regression and protection
Production build, application TypeScript, node TypeScript, QA TypeScript and lint PASS. Complete suite: 516 tests across 68 files PASS, including 14 new focused tests. Evidence is tools/release-audit/vehicle-red (regression logs, metrics, source-package-parity, browser images/input/reset results, package network/console).

Scoped protection audit: 1,051 existing non-release-output files checked, 1,047 unchanged, four intentional modifications (scene.ts, vehicle-orbit.ts, vehicle-release.json, staging/release.json), no unexpected changes or missing files. Baseline-method.txt documents four preimages reconstructed from exact task-start reads/frozen descriptor; this is not a pristine Git baseline. Traditional homepage, Hero, Navbar, official logo, Hero vehicles, Inside TOLI, workshop architecture, detailing, secondary geometry and default camera are unchanged. All 173 previous candidate package files match baseline. Canonical release validation passes for current and retained previous packages.

PRIMARY TOLI RED PAINT = PASS
360° ROTATION DIRECTION FIX = PASS
INTERACTIVE VEHICLE = PASS
PHYSICAL ANDROID VALIDATION = REQUIRED
PRODUCTION MIGRATION = NOT AUTHORIZED
