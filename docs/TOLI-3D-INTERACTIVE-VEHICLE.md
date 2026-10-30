# Interactive primary vehicle — final evidence, 23 October 2026

Candidate **toli-eae3a1c9fcfd44e187e0056c**. Local implementation and production-equivalent validation pass. Physical Android validation is REQUIRED. Production migration is NOT AUTHORIZED.

## Vehicle asset audit

Original procedural authoring provenance: `tools/3d/generate-toli-sportback.mjs`; frozen R7 runtime `public/models/vehicles/toli-preproduction-sedan.glb` remains unchanged. New actual editable source: `tools/3d/vehicle-interactive/source/toli-primary-interactive.gltf`, generated losslessly by `tools/3d/vehicle-interactive/build.py`. Source SHA256 `c661145398b0b3924b0a7969739d5bc77357f2b6a0ee147640b50a93c412ad75`.

New runtime `public/models/vehicles/toli-primary-interactive.6829988a38b3d4b56f1b82d7a31b2dd56d17a51dfdff75013e7bdcdf418acf2f.glb`; full fingerprint is its SHA256. Explicit source/runtime/pivot/rollback descriptor: `src/experimental/spatial/vehicle-release.json`.

Actual hierarchy: `VehicleRoot` owns Body, Glass, Interior, Hood, Door_L/R, Headlight_1/-1, taillights and wheel assemblies. Each front door already had a real skin and side glass. Front handles were batched with Body: 144 triangles per front handle were reassigned to the corresponding door, while 288 rear-handle triangles remain static. Mirrors now belong to their door assemblies. Explicit source hinge origins replace the former zero origins. All original closed-pose world-space triangles match the baseline within the test's 1 micrometre quantization; geometry was not replaced with boxes. Rear doors are batched into static Body/glass and are NOT supported.

Existing simple seats, dashboard, steering and console remain. Thin original door skins use local double-sided materials to avoid disappearing inner faces; this is not a newly detailed interior.

## Headlights

Click either actual primary headlight to toggle both. OFF restores the original neutral lens/projector appearance. ON uses restrained warm-white emissive optics and two bounded, shadow-free SpotLights reaching the floor ahead. Front OFF/ON floor pixels show a small real illumination difference (mean absolute RGB difference approximately 2.10, max24 in the inspected floor region). No bloom, extra renderer, postprocessing, dynamic shadows or new render pass. Two lights exist once and have zero intensity when OFF, preventing light-count churn. Secondary lamps remain untouched.

## Doors

Only front left and front right are supported, independently. Local pivots `[0.884,1,0.93]` / `[0.884,1,-0.93]`; opposite 58 degree swings, 650ms smoothstep animation. Repeated actions retarget from the current angle. Source mirrors, handles and glass move with each assembly. Closed, halfway and fully open front/three-quarter evidence is retained. Swept visible bounds and inspection show no workshop/cart/secondary collision: approximately 11cm lateral secondary clearance and 12cm conservative cart clearance; door lower edges remain approximately 20.5cm above the floor. Camera, primary position and scale are unchanged.

## Interaction and state

Actual primary-mesh raycasting handles mouse/pointer clicks. Phone-size assistance consists of two tightly bounded, invisible door volumes expanded only12mm; they follow the real hinges and respect opaque occlusion. These are not screen-wide hotspots. They have no rendered surfaces or draw calls, but the renderer may allocate their small geometry buffers. No separate headlight or door network assets.

A tap must stay within8px and700ms; excursions remain disqualifying even after returning to the start. Existing drag intent, vertical scroll and pinch ownership remain. Real semantic buttons send commands to ONE scene controller; React mirrors its state rather than owning another animation. Enter/keyboard, visible focus, labels and aria-pressed are verified. Minimum targets44px; narrow320px layout measured51.8px. Reduced motion makes transitions immediate, verified by controller/scene tests; the browser's reduced-motion preference was not manually changed.

Default headlights OFF, both doors CLOSED. Vehicle exit, context loss and disposal reset immediately. Resize within Vehicle preserves state. Ten normal-development reentries and ten final-package reentries reset correctly. Standard View removes the spatial canvas; returning to 3D restores one canvas with three false states. Enhancement setup failure leaves the static primary and workshop available; existing whole-model retry remains intact. Missing assemblies do not break workshop service interaction.

## Responsive evidence

430,412,390,360,320 portrait and844x390 landscape are **EMULATED**, not physical Android. Actual pointer mesh/assisted-door selection and lights worked across all five widths; native controls/keyboard also worked. No horizontal overflow. Approved lower strip/portrait sheet, secondary, chapter/navigation, detailing cart and camera composition remain. Drag starting on the car does not toggle a control. Landscape preserves state and both mesh actions work. See `browser/int-mobile-*.jpg`, `int-landscape.jpg` and gesture JSON. The430 file named `int-mobile-430-on-open.jpg` shows a door-open state with lights OFF; its filename is historical, not a combined-state claim. Final package combined state is `browser/int-packaged-combined.jpg`.

## Performance and vehicle metrics

| State | Complete Vehicle draw calls |
| --- | ---: |
| Closed / lights OFF |100|
| Lights ON |100|
| One front door open |100|
| Both doors open |100|
| Both doors + headlights |100|

Maximum tested100, versus previous98: the two separated front handles add two calls. Startup remains26 calls with primary deferred. One spatial renderer/context. Final complete Vehicle reports261,905 rendered triangles,99 resident geometries and11 textures; resident geometry includes handle splits and tiny non-rendered tap helpers. Raw QA CPU timing is not a physical GPU/FPS benchmark. Standalone model-review overlay98 is a different scene, not the complete experience measurement.

| Runtime asset | Before | After |
| --- | ---: | ---: |
| Bytes |4,268,888|4,285,876|
| Triangles |192,105|192,105|
| Vertices |125,334|125,334|
| Meshes |58|60|
| Materials |12|12|
| Textures |0|0|

## Workshop and protection

Workshop runtime remains5,179,488bytes /63,744triangles /104,796vertices /36meshes /28materials /9textures, SHA256 `0f7497aed3a2e5950b3c7f35cfd1a7fc02052479604dfd754baa93a8677bc1e3`. Workshop editable Blend SHA256 `cbf77ff81be15bf15f5422a44733359c71d848857c79f0546571a65705eef3ea` is unchanged. All704 prior workshop objects, detailing station, secondary vehicle, logo, traditional root, Hero/Navbar and original vehicle rollback remain protected. Primary desktop camera/FOV54 and existing portrait camera policy remain unchanged.

Exact existing-file audit:512 checked,501 unchanged,11 intentional integration/test/packaging/review changes,0 missing,0 unexpected. Full paths and before/after hashes are in `protection.json` / `before.json`; newly added source, controller, controls, tests and evidence are separate additions.

## Network, parity and regression

Fresh canonical package browser trace: startup1 workshop request /0 primary; after Vehicle, ten reentries, Standard View and return:1 workshop and1 interactive-primary request total,0 duplicate GLB requests,0 failed requests. No separate secondary/door/headlight downloads. Trace frozen before independent parity downloads. Production console warnings/errors: empty.

Development: `http://127.0.0.1:8170/Toli-2/?workshopLocation=vehicle#/3d-experience`.
Package: `http://127.0.0.1:8172/Toli-2/?workshopLocation=vehicle#/3d-production-preview`.
Both workshop and new primary served bytes match public originals exactly in both hosts. Normal-development behavior was checked before canonical packaging; final package repeated real headlight/door clicks, keyboard, ten resets and Standard View recovery.

Production build PASS. Application TypeScript PASS. Node TypeScript PASS. QA/review TypeScript PASS. Lint PASS with zero warnings. Full tests **485 PASS /66 files**. New coverage includes source/closed-triangle identity, independent hinges, rapid retarget, reduced motion, paired optics, failure fallback, material/helper cleanup, raycast occlusion/drag suppression, semantic state, ten lifecycle cycles and explicit release retention.

## Release

New exact identity **toli-eae3a1c9fcfd44e187e0056c**. Canonical release validation PASS. Previous **toli-bbf42d50026777e1b6b7b424** retained under current-plus-one policy; archived historical validation PASS. Explicit primary pin/hash/bytes are included alongside workshop/logo retention, with legacy candidates supported. No deployment, production entry migration or remote publication occurred.

INTERACTIVE HEADLIGHTS = PASS

INTERACTIVE DOORS = PASS (two supported front doors)

INTERACTIVE VEHICLE = PASS

PHYSICAL ANDROID VALIDATION = REQUIRED

PRODUCTION MIGRATION = NOT AUTHORIZED


## Physical Android gate — 24 October 2026

FINAL INTERACTIVE VEHICLE ANDROID VALIDATION = USER TEST REQUIRED. No real Android device is connected/available;0 phones tested. Exact candidate `toli-eae3a1c9fcfd44e187e0056c` canonical validation and LAN HTTP entry/manifest/4,285,876-byte primary identity PASS. Current trusted-Wi-Fi handoff: **http://192.168.1.14:8173/Toli-2/?workshopLocation=vehicle#/3d-production-preview**. Phone reachability and every physical functional/performance result remain UNVERIFIED/NOT TESTED; timing UNMEASURED, TalkBack/tablet UNVERIFIED, P0–P3 NOT ASSESSED. No source/package fixes or fresh regression run; retain485tests/66files baseline. See the first section of [physical QA](TOLI-3D-PHYSICAL-DEVICE-QA.md) for the full real-phone checklist. No production migration/deployment. Next final production migration audit remains conditional on genuine physical PASS.


24 October2026 physical-gate freeze audit: **1,546 existing protected files checked;1,546 unchanged;0 changed/missing**, including all171 actual release-dist files (current/retained inventory plus metadata). Evidence: `tools/release-audit/interactive-vehicle-android/protection.json`. No application/package modifications.


## Bonnet/boot/360 successor — 24 October2026

Current new candidate `toli-03ea962c2a2df6ceb9b08c5e`; this earlier eae candidate remains rollback. New real bonnet/boot and full bounded primary orbit are documented in [the current report](TOLI-3D-VEHICLE-OPENINGS-360.md). Physical Android REQUIRED again; no migration authorized.
