# Right-side vehicle visibility and composition

23 October 2026. **RIGHT-SIDE VEHICLE COMPOSITION = PASS** for actual source, desktop/emulated review, automated regression and canonical package parity. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.**

## Occlusion diagnosis

The prior `toli-ff21133adc182b072b14c15e` Vehicle UI covered much of the charcoal sedan's front/wheel area: at 1024×720 its panel occupied roughly X679–997/Y265–559. Geometry occlusion was separate: an existing red structural column obscures a narrow part of its front/side, and the primary naturally overlaps its rear. Camera framing centered the primary tightly, pushing the environmental sedan toward that panel. Portrait adds ordinary right-edge cropping; short landscape gives only a small vertical safe zone between header, content and navigation. No safe-area device measurements are inferred from desktop emulation.

Evidence compares real runtime UI, not a screenshot-specific hidden panel. `browser/before-vehicle-ui.jpg` is the previous exact candidate's source capture; `comp-camera-only.jpg`/`comp-lateral.jpg`, where available, document trials. A camera-only correction exposed more side but left panel/column overlap; only then was the Vehicle-specific panel moved. No panel hiding, temporary opacity change or model movement for capture.

## Composition changes in actual source

Vehicle desktop camera: `[7,2,-23.4]` → `[7.3,2.4,-24.8]`; target `[5,.85,-18]` → `[4.2,.65,-18]`; FOV52° →54°. Portrait position/FOV remains `[7,2,-26]`/72°; target X5 →4.6, retaining existing vertical offset. No fisheye, new camera system, unfinished exterior exposure or changes to other destination poses.

`cameraViewLift` reuses the existing view-offset mechanism: portrait remains22%; Vehicle only, height≤560 and aspect>1.6, lifts by20%. This short/wide rule works on resize and rotation, independent of device names, reduced motion and model loading. Other desktop destinations retain zero offset. No per-phone coordinate table. Drag resets from the active responsive pose target, preventing an initial portrait-to-desktop target jump.

Camera-only trials could not cleanly separate the sedan from persistent UI, so wide-screen Vehicle information now uses a lower strip: at1024×720 X236–996/Y510–626, with the same semantic aside/header/content/buttons, solid readable surfaces, same text and focus order. Header and CTA have full44px targets; minor header padding cleanup keeps the Overview target inside the border. Portrait retains its existing sheet. Other destination panels are untouched. Short landscape keeps navigation and header available, while lifting the composition above the strip. Extreme notched-device safe areas still require real hardware review.

**Primary vehicle, secondary vehicle, detailing station, all workshop geometry, materials, lighting, floor contact and placements are unchanged.** Two cars total. The detailing station retains trolley, polisher, cloths, four bottles, reel and inspection light. Charcoal remains charcoal; no added lights, new car, badging or showroom appearance.

LEFT detailing → CENTER silver primary → RIGHT deeper charcoal secondary. Primary remains larger and dominant. The column still naturally obscures a narrow strip; the secondary's roofline, side, front and wheel are now legible above the panel. Whole-car exposure is not required or claimed.

## Desktop, mobile and accessibility

Normal development route inspected with real UI: Overview, Vehicle, Locations and Services. Overview/Services camera and layout are unchanged; secondary stays an environmental object, with no new interaction. All8 Locations and9 Services remain available. Vehicle Request activated with Enter; canonical dialog opened; closing restored focus to its initiating CTA, with no submission. Aside semantics, labeling, DOM order, keyboard navigation and native44px targets are retained. Standard View remains reachable in staged UI.

430/412/390/360/320×844 portrait and844×390 landscape are **EMULATED**, not physical Android. Zero horizontal overflow and one canvas throughout. Primary, navigation and detailing identity take priority; secondary roof/side/wheel are partially visible at430–360 and more cropped at320. At320 some detailing equipment also meets the left edge, while its trolley/light/bottles identify the station. No forced ultra-wide portrait lens. Landscape shows the three zones above the lower strip; lower caster area may sit behind its edge. UI remains readable and navigation is separate. Screenshots include actual panels and controls. The existing local review tool's right close pose is model-quality evidence only, not proof of UI clearance.

Actual3D remains under reduced motion: same geometry/loader/render owner, immediate existing camera transition, same framing rule. No static-image substitution. Physical touch, browser chrome/notch safe areas, TalkBack and thermal/GPU behavior remain unverified.

## Source and asset freeze

Editable `tools/3d/toli-workshop/source/toli-workshop-detailing-cars.blend` remains9,582,798bytes/SHA256 `cbf77ff81be15bf15f5422a44733359c71d848857c79f0546571a65705eef3ea`. Binary header and embedded object-name inspection identifies50 secondary and83 detailing parts; exact hash matches the previously fully audited Blender revision. No new Blender export was needed; portable Blender from the previous temporary session is no longer present. Prior full source comparison/clearance evidence remains applicable to identical bytes. Model/source export/runtime descriptor and all old rollback versions are unchanged.

Active runtime: `models/toli-workshop-detailing-cars.0f7497aed3a2e5950b3c7f35cfd1a7fc02052479604dfd754baa93a8677bc1e3.glb`.

| Metric | Before | After |
|---|---:|---:|
| GLB bytes |5,179,488|5,179,488|
| Triangles |63,744|63,744|
| Vertices |104,796|104,796|
| Meshes/primitives |36/36|36/36|
| Materials |28|28|
| Textures/images |9/9|9/9|

Fresh normal-source diagnostics: workshop+secondary **26calls**, primary idle, one context; complete intended Vehicle **98calls**, versus97 previously. The modest framing change exposes one additional existing batch; no geometry/material/texture growth. Primary bounds remain X3.895–6.105/Y0–1.505/Z−20.435–−15.565. One renderer/canvas/context owner, no iframe or additional application viewer. No DPR/environment/shadow/lighting/quality modification. Diagnostic timings under desktop QA load are raw evidence, not a performance benchmark or phone result.

Startup loads the integrated workshop+secondary model; original primary still loads only on Vehicle intent. Package trace: 18 local startup responses, workshop once, primary0before intent/1after, no separate secondary request and no repeat GLBs on reentry. Production warning/error console empty. Network scope is the local server browser interval before independent byte checks; no external inference integration was introduced. Existing deterministic AI contracts remain covered by regression.

## Source/package parity and release

Normal source: http://127.0.0.1:8170/Toli-2/?workshopLocation=vehicle#/3d-experience

Canonical packaged preview: http://127.0.0.1:8171/Toli-2/?workshopLocation=vehicle#/3d-production-preview

Development visual review preceded packaging. Packaged desktop and landscape inspected with actual UI/Standard View and the same composition; served GLB bytes/checksum identical to source/public. Fresh source code, not a QA-viewer-only or release-dist patch. Staging adds its existing recovery/Standard controls without changing the shared camera/layout. Console clean, one canvas; Vehicle→Overview→Vehicle retains models. Served manifest matches exact package.

New identity **`toli-bbf42d50026777e1b6b7b424`**, canonical `release:prepare`, independently validated. Previous **`toli-ff21133adc182b072b14c15e`** retained under current+one-previous Stage3B policy and full prebuilt rollback archive validated. No deployment, upload, remote job or production cutover. Package:124current files +34retained assets +2metadata =160files/38,898,640bytes. Exact inventory totals in `release-summary.txt`. Original pre-detailing/detailing-only/detailing+cars sources/models remain unchanged. Older full packages may age out of the bounded managed archive by established policy.

## Regression and protection

Production build, app/node TypeScript, all existing QA configurations plus review modules, lint and **468tests/65files PASS**. Added one mathematical framing regression checks secondary bounds above the landscape panel and limits the lift to intended views; collision-path test now uses the actual destination. One old exact camera-X assertion was intentionally updated7→7.3; its existing wall/lane bounds remain. Initial full run467pass/1old-coordinate failure is retained separately; final full suite passes. No timeout or behavioral assertion weakening. Final build includes the small header padding correction.

Protection: **505 existing files checked, 500 unchanged,5 intentional changes,0 unexpected/missing**. Only3 runtime files (locations, framing, Vehicle-scoped CSS) and2 affected test files changed. New evidence/reports are additive. Model Blender/export/public GLB, primary asset/materials/placement, architecture/logo, traditional production root/Hero/Navbar/navbar artwork/Hero vehicles/InsideTOLI, dependencies/configuration/release scripts/workflows are byte-unchanged. The approved3D camera changes are isolated to Vehicle.

## Final gate

**RIGHT-SIDE VEHICLE COMPOSITION = PASS**

**PHYSICAL ANDROID VALIDATION = REQUIRED** for this new exact candidate. No device/TalkBack/physical tablet, rotation/background/sustained-use result or phone performance claim.

**PRODUCTION MIGRATION = NOT AUTHORIZED**
