# Actual-project detailing and right-side cars

22 October2026. **ACTUAL PROJECT 3D DETAILING + RIGHT-SIDE CARS = PASS** for local source/runtime integration, desktop/emulated review, regression and canonical packaging. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.**

## Source-of-truth audit and correction

The earlier detailing revision was present in real project files: `tools/3d/toli-workshop/source/toli-workshop-detailing.blend` (83equipment objects), `exports/toli-workshop-detailing.glb`, the public966a… fingerprint, both explicit3D source routes and release-dist `toli-e937dc7ab7a9566dd6d5d221`. Fresh normal Vite development inspection before changes fetched that actual public model and displayed the equipment. It was not release-dist-only; see `source-audit.json` and before screenshot/resource inventory. This finding does not dismiss the user's mismatch: different views did resolve different models.

Found stale **standalone replica review viewer** loading `tools/3d/toli-workshop/exports/toli-workshop-replica-candidate.glb`. Corrected its current-model option to use the source website adapter; label now says Current workshop revision. The traditional homepage/Inside TOLI intentionally load their independent originalv2 model and remain unchanged under the explicit protection requirement. Root is not the full3D experimental route.

The adapter `src/experimental/spatial/replica-asset.ts` now reads `src/experimental/staging/release.json`, the same descriptor staging already consumed. No duplicated hardcoded active filename in the viewer/experiment. `tools/release/inventory.mjs` keeps the exact canonical packaging pin, updated through the same registration script and verified by existing sealing tests. No runtime fallback to release-dist.

Current editable source: **`tools/3d/toli-workshop/source/toli-workshop-detailing-cars.blend`**, 9582798bytes, SHA256 `cbf77ff81be15bf15f5422a44733359c71d848857c79f0546571a65705eef3ea`. It contains the unchanged detailing station plus the optimized environmental sedan; the original primary car remains its separate deferred runtime asset. `source/current-workshop.json` links source/export/public runtime and checksums. All704 earlier source objects remain unchanged, with50new editable secondary parts. Source comparison also checks tire contact/bounds/clearance. This does not replace the original source with a generated package.

Current source export: `tools/3d/toli-workshop/exports/toli-workshop-detailing-cars.glb`. Active public runtime: **`public/models/toli-workshop-detailing-cars.0f7497aed3a2e5950b3c7f35cfd1a7fc02052479604dfd754baa93a8677bc1e3.glb`**, 5179488bytes, SHA256 `0f7497aed3a2e5950b3c7f35cfd1a7fc02052479604dfd754baa93a8677bc1e3`. Both source3D routes and the corrected existing viewer resolve it directly from public. Runtime prefix comparison and regression preserve all detailing-only architectural/equipment geometry, image buffers, nodes, accessors and material definitions exactly.

## Left / center / right composition

LEFT: existing graphite three-shelf cart/casters, DA polisher and cable, three folded microfiber cloths, four generic bottles, wound reel and neutral inspection light. No third-party labels/certifications/chemical claims. This is the same detailing geometry, not a duplicate installation.

CENTER: original silver primary presentation car, original placement `[5,0,-18]`/camera/lighting and deferred loader. It remains dominant when Vehicle is entered. No primary geometry/material or camera changes.

RIGHT: **one additional charcoal sedan; two cars total with the primary**. Existing registry has one usable original temporary preproduction sedan and no suitable distinct SUV. The separate sportback was visually rejected, and no external/branded model was acquired. Quality over count: no invented SUV, badge, customer plates, specifications, pricing, service history or obvious row of identical full-detail copies. The secondary uses an exterior-only original asset variant, opaque smoked glazing, charcoal paint, shared rubber/metal/optics, tiny changed yaw and reduced geometry. It is environmental/non-interactive and adds no independent state.

Secondary center Three`[1.95,.015,-16.8]`, yawπ/2−.02. Conservative actual bounds: X≈0.857–3.065, source depth≈14.348–19.217, minimum height.015m. At least0.83m gap from primary's minimumX3.895 and0.135m from the conservative column near edgeX3.20. Central circulation stays open to its left; no wall/equipment/car intersection. Existing floor layout and painted lanes are unchanged. Small tire contact patches reuse the rubber batch; no new textures/lights/shadow pass. Cameras/transit, DPR, global lighting and touch thresholds stay unchanged.

Left/right is relative to the Vehicle view; the reverse-facing Overview naturally shows the same objects from the other direction. Existing information boards can overlay parts of the background car in desktop/landscape views. The separate wide inspection pose shows complete placement/clearances; it is not a new application camera or product route.

## Actual development and package parity

NORMAL DEVELOPMENT, standard `npm run dev -- --host 127.0.0.1 --port 8170 --strictPort`:

http://127.0.0.1:8170/Toli-2/?workshopLocation=vehicle#/3d-experience

Development source is independent of release-dist. Before packaging, direct regular experimental route was inspected with station + primary + right-side car, and resource inventory shows the current public0f7497… GLB. Startup reload separately showed only that workshopGLB, primary idle, one context and26drawcalls. Vehicle intent then loads only the unchanged original primary asset.

PACKAGED CANONICAL RELEASE:

http://127.0.0.1:8171/Toli-2/?workshopLocation=vehicle#/3d-production-preview

Served exact `release-dist`, ID **`toli-ff21133adc182b072b14c15e`**. Source/packaged GLB HTTP bytes/checksum match. Packaged model and both cars/station visually match the source; extra staged Standard View/recovery controls retain their existing route-specific behavior. One canvas, ready state, clean packaged warning/error console. Package request trace records startup, deferred Vehicle and reentry without duplicate GLBs or separate secondary requests. Traditional root is still classic-primary.

## Desktop / responsive / services

Captured/inspected actual source Overview, Vehicle/center, existing review tool's left close-up, right sedan and full composition. Simplification initially produced unacceptable front-aperture/light boundaries; the final LOD preserves those small critical surfaces at higher detail rather than uniformly collapsing every part. Final secondary is13,093triangles/four batches; no primary modification. The right-view close camera avoids a foreground column; the column itself never moved.

All430/412/390/360/320×844portrait and844×390landscape checks are **EMULATED**, not physical Android. One staging/spatial canvas and zero horizontal UI overflow at every observed size; primary and station remain legible and the secondary stays present behind/right. At narrow widths/background panels it is naturally partially cropped/occluded, not removed by a device branch. Existing landscape information board overlaps background geometry as before; no layout redesign. Actual3D remains under reduced motion because the model/load path is unconditional; existing reduced-motion regression is retained.

Native Locations still exposes all8 destinations. Services lists all9unchanged. Actual normal-development browser selected04PremiumDetailing, opened canonical Request, checked03Service: PremiumDetailing selected, then closed without submitting. Existing authoritative state, drafts, form/AI implementation and primary loader are untouched. Full regression retains state/persistence/owner/accessibility/local-AI contracts. No secondary picking handlers or new service state. Development console's pre-existing React Router future notices are distinguished from clean production console.

## Geometry / asset comparison

| Metric | Detailing-only | Detailing + environmental sedan |
|---|---:|---:|
| GLB bytes |4,594,732|5,179,488|
| Triangles |50,651|63,744|
| Exported vertices |92,534|104,796|
| Meshes/primitives |32/32|36/36|
| Materials |24|28|
| Textures/images |9/9|9/9|

Additional geometry is13,093triangles/12,262vertices/four shared opaque batches, with no new texture. Whole asset adds584,756bytes. Stays under6MiB/65ktriangles/120kvertices.36primitives is explicitly above the earlier30primitive architectural review target (detailing-only was already32); measured addition is four calls. Do not hide this increase or claim every earlier budget passes.

Source original full sedan GLB is4,268,888bytes, unmodified. Invisible interior/underhood/brakes removed only from the derived secondary. Distance simplification is selective, retaining front aperture and lamp boundaries; no body distortion into another class. Individual secondary export is `exports/secondary-sedan-lod.glb`; it is an authoring artifact merged into the workshop, not a separate startup fetch.

| Draw-call case | Settled calls | Evidence |
|---|---:|---|
| Workshop + detailing, no cars |22|Prior approved detailing baseline|
| Workshop + detailing + primary only |93|Prior approved detailing baseline|
| Current workshop + environmental sedan, primary idle |26|Fresh normal-development Overview diagnostics|
| Complete intended Vehicle view |97|Fresh normal-development Vehicle diagnostics|
| Wider inspection pose |99|Existing local review tool; more architecture in frustum|

One active renderer/context, no new canvas/iframe or application viewer. Global scene/camera/quality/interaction lifecycle code is byte-unchanged. Startup: one integrated workshop+secondaryGLB; Vehicle GLB remains deferred to intent; no separate secondary model download. Packaged local GET trace:19startup responses (all200),23through Vehicle/reentry (all200);one workshop request,zero primary requests before intent,one after,zero separate secondary requests andzero duplicate model requests. Exact trace is in `package-network.json`; source asset inventory is separate from HTTP request-count evidence. No new external AI service or inference request. Existing deterministic AI regression passes. No Android FPS/timing/thermal/memory-plateau claim.

## Regression and protection

Build, app/node TypeScript, QA configurations (all existing plus changed review modules), zero-warning lint and **467tests/65files PASS**. New four-test file verifies every prior GLB byte/node/material/image prefix and rollback; shared public-path/source-export/authoring SHA mapping and corrected viewer; four opaque batches/no texture/light/interaction; unchanged one-owner/deferred primary architecture and budgets. Original three detailing tests now explicitly target the frozen detailing-only descriptor fixture, preserving those exact assertions. Only current staged model pins update intentionally. Initial focused failure was a test's hardcoded production base while Vitest's base is `/`; it now explicitly stubs the production base for its base-path contract. The initial full run found one historical-retention fixture assuming an active model always creates `models/staging`; explicitly creating that fixture directory resolved it. Integrity assertions were retained, then all467tests/65files passed. No baseline timeout/assertion weakening. Exact commands/results in `regression/regression.json`.

Protection audit: **471 existing files checked;460 unchanged;11 intentional updates;zero unexpected/missing**. Full before/after hashes list exact differences. Existing changes: shared asset adapter/source release descriptor/canonical pin, two staged identity tests, explicit historical fixture directory creation, frozen-detailing-test fixture import, existing replica viewer correction and existing review tool's inspection options. All additions are source/car export/runtime, scripts/authoring descriptor, fixture, four-test file and reports/evidence.

Production homepage/Index/Hero/Navbar/Navbar logo/navbar vehicle/Hero vehicles/traditional InsideTOLI/officialbig-transparent.png/originalprimaryVehicle/camera/global3Dscene/dependencies/Vite/live workflow are unchanged. No redirect/root policy change, deployment/push/upload/DNS/hosting change.

## Rollback / release / physical gate

Preserved actual project sources and models: pre-detailing `toli-workshop-replica.blend` +4,268,456byte b9ce… GLB; detailing-only `toli-workshop-detailing.blend` +4,594,732byte966a… GLB; new `toli-workshop-detailing-cars.blend` + current versioned runtime. No known-good source/model overwritten. Earlier provisional LOD outputs were moved to temporary scratch, never claimed approved rollback.

Canonical `release:prepare` uses previous complete verified `toli-e937dc7ab7a9566dd6d5d221` and fresh production build, producing **`toli-ff21133adc182b072b14c15e`** in `release-dist`. Current+one-previous retention and complete prebuilt archives validate. Previous pre-detailing full package ages out of the managed two-package window by policy; its approved source/model remain frozen. Prior detailing-only full package is preserved byte-identically. Current safe package totals:159files,38,877,238bytes;124current files +33retained asset files +2metadata files. See `release-summary.txt`; nothing was deployed.

**PHYSICAL ANDROID VALIDATION = REQUIRED** for this new exact identity. Older detailing physical handoff does not clear the changed profile. No actual Android, tablet, TalkBack, background/rotation/10minute sustained run. Physical performanceUNMEASURED. Production migration stays NOT AUTHORIZED.

**ACTUAL PROJECT 3D DETAILING + RIGHT-SIDE CARS = PASS**

**PHYSICAL ANDROID VALIDATION = REQUIRED**

**PRODUCTION MIGRATION = NOT AUTHORIZED**


## Vehicle visibility successor — 23 October 2026

Current candidate **`toli-bbf42d50026777e1b6b7b424`** adjusts only Vehicle camera/framing and Vehicle-specific panel layout. Geometry, source and runtime model unchanged; two cars retained. See [composition report](TOLI-3D-VEHICLE-COMPOSITION.md).468tests/65files PASS; physical Android REQUIRED and production migration NOT AUTHORIZED.
