# Premium Detailing 3D station

22 October2026. **PREMIUM DETAILING 3D STATION = PASS** for local model, desktop/responsive browser and automated checks. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** No phone evidence is inferred.

## Equipment and placement

Added a compact graphite three-shelf cart with four casters, a motor/grip/backing-plate/foam-pad dual-action polisher and short cable, three folded microfiber cloths, four generic bottles including two triggers, a wound cable reel with mounting bracket and a neutral inspection lamp on a tripod. Metallic/gray surfaces dominate, with a thin restrained red cart accent. Shared vertex-colored satin metal, rubber/plastic/textile and low-emission neutral diffuser materials: three new groups, no textures. No chemical/certification labels, third-party brands or new business claims.

Cart center is world X6.75 / Z−19.30, on the left in the unchanged Vehicle camera's front-three-quarter view. Equipment stands outside the original car bounds; shelves support the tools, caster tires and stand meet the floor with small contact patches. Car remains dominant and unmoved. Station does not obstruct Services/Locations or the open central lane. No new point/directional light or shadow-map pass; existing global lighting, DPR, camera, touch and reduced-motion behavior are unchanged. Equipment remains actual3D in reduced motion.

## Source, runtime and rollback

New editable source: `tools/3d/toli-workshop/source/toli-workshop-detailing.blend` (7,167,394bytes). Original `toli-workshop-replica.blend` remains byte-identical. Source comparison proves all621 existing objects' transforms/geometry/material assignments/metadata unchanged;83 proposed equipment parts added. Retained packed images are identical; Blender drops one unused historical logo-removebg-preview datablock on saving the separate successor. Authoritative official PNG and all original runtime images are unchanged.

New source scripts: `add_detailing.py` saves a separate source/props export; `merge_detailing.py` appends only the props to approved runtime. Runtime base binary, nodes, meshes, materials, images, accessors and views are exact unchanged prefixes, verified independently and by regression tests. Reproduction documented in `tools/3d/toli-workshop/reference/detailing/README.md`.

Versioned runtime: `models/staging/toli-workshop-detailing.966a399bad66c0003f7b196052c92382188629db16c1ec47c86c3175fcf5f9bd.glb`; SHA256 `966a399bad66c0003f7b196052c92382188629db16c1ec47c86c3175fcf5f9bd`. Both isolated experiment and production-equivalent staging reference it. Stable original `public/models/toli-workshop-replica.glb` and its b9ce… staged fingerprint remain intact as rollback, along with old source and complete previous package. Traditional Inside TOLI continues using its own original v2 model. No stable binary URL is overwritten.

## Visual evidence and accessibility

Actual application front-three-quarter view at1280×720 plus complete1024×720 review capture, local review front/close-up, five portrait widths430/412/390/360/320×844 and844×390landscape inspected/captured. One canvas and zero horizontal page overflow at all requested widths; cart, polisher silhouette, bottles, cloths, reel and light remain recognizable at the appropriate scale. At320 the small equipment is intentionally secondary; close-up is the detailed object evidence. Existing landscape information board still overlays part of the car as in the prior layout; it was not redesigned. Source car placement/camera geometry are unchanged.

Browser captures in `tools/release-audit/detailing/browser/` are desktop/emulated evidence, never physical Android screenshots. The local-only review tool has three explicit inspection poses; those do not enter application camera paths or production build. The five-width loop's initial helper applied to a different active tab; those readings were rejected and each actual430/412/390/360/320width was subsequently observed and captured separately.

Equipment is environmental only: no extra interaction target, bottle handlers, destination or service store. Existing native Locations/all eight destinations and Services04 Premium Detailing remain the semantic equivalent. Browser Request check selected04, opened the same canonical four-step form and observed Premium Detailing checked/in Service Needed; closed without sending. Existing persistence, draft, reduced-motion and owner regressions pass unchanged.

## Performance comparison

| Metric | Approved rollback | New detailing revision |
|---|---:|---:|
| GLB bytes |4,268,456|4,594,732|
| Triangles |46,411|50,651|
| Exported vertices |85,785|92,534|
| Meshes/primitives |29/29|32/32|
| Materials |21|24|
| Textures/images |9/9|9/9|
| Settled workshop draw calls |19|22|
| Settled Vehicle draw calls |90|93|

Before19/90 are retained approved baseline observations; after22/93 are fresh actual scene diagnostics, not estimates from mesh counts. Additive cost326,276bytes,4,240triangles,6,749vertices and three batches.32total export primitives exceed the earlier replica review's30primitive target by two, but measured visible cost remains exactly three added calls, within the requested restrained increment. Geometry stays below65k triangles/120k vertices/6MiB. No quality reduction or original architecture removal to offset it.

Fresh development Overview reports one context owner, one canvas, Vehicle idle and only the new fingerprinted workshop in the observed GLB inventory. Vehicle action then loads the unchanged car. Existing scene/cache/owner code is untouched; full regression preserves dedup/deferred-load contracts. Packaged HTTP trace proves exactly one new workshop200 at startup, no eager car, then exactly one Vehicle200 after intent and no duplicate GLB request on Overview→Vehicle reentry. Packaged document has one canvas, zero horizontal overflow and empty warning/error console. No new physical timing, FPS, memory plateau or thermal claim.

## Regression

Production build, app/node TypeScript, QA configurations including the new review module, zero-warning lint and **463tests/64files PASS**. Existing460/63 baseline retained with three asset-integrity tests. These prove architectural/image byte preservation and rollback identity, versioned hash/budget binding, and absence of new light/interaction/state nodes. Updated only two staged tests intentionally pinned to the superseded model identity/export; assertions remain exact.

First full parallel run during browser work:461pass/two timing failures (existing coded-car5s timeout and canonical Request lazy readiness). No assertion/timeout weakening. Final full run uses one worker with no concurrent browser/build work; all463pass. Final command details/timings in `regression/regression.json` and logs. QA's first invocation named a nonexistent config; corrected to a temporary explicit project-extended list of all existing QA configs plus the new review tool. Final QA exit0. Existing Vite size/Tailwind/Browserslist advisories retained; development React Router future warnings are not represented as production-console errors.

## Production protection

Fresh before/after audit: **464 existing files checked;459 unchanged;5 intentional changes;zero unexpected/missing**. Exact list/hashes in `protection.json`/`before.json`. Existing changes are replica URL adapter, staged release descriptor, canonical release descriptor pin and two exact staged model tests. Added model source/export/fingerprint, scripts, local-only review tool and three-test file are additive. No package/dependency/lock/config/workflow/root change.

Homepage=NO change; Hero=NO; Navbar=NO; Navbar logo=NO; Hero vehicles=NO; traditional Inside TOLI=NO; official logo=NO; vehicle asset/placement=NO; approved architecture/facade/reception/floor/shutters/trusses/signage=NO. All621 old source objects and original runtime payload preserved. No migration/deploy/upload/push/production activation.

## Release package and physical gate

Canonical `npm run release:prepare -- --previous release-artifacts/toli-73b9da574a7cc0a9559c841f` builds fresh and validates **`release-dist`**. Prior release-dist was first independently validated historically and preserved outside the output; approved previous full archive remains. No pipeline bypass or raw-dist publish. New release identity: **`toli-e937dc7ab7a9566dd6d5d221`**. Previous retained release: **`toli-73b9da574a7cc0a9559c841f`**. Current+one-previous policy remains; no stable GLB collision, original and new fingerprints coexist. New complete current/previous archives are prebuilt and validated. No remote deployment.

Package current files122, retained33, metadata2: **157totalfiles /33,696,938bytes**. Exact summary/inventory in `release-dist/release-summary.txt` and `release-candidate.json`. Production entry remains classic-primary/traditional. Local packaged preview: http://127.0.0.1:8163/Toli-2/?workshopLocation=vehicle#/3d-production-preview . The older release ID and LAN handoff are historical and do not validate this revision.

**PHYSICAL ANDROID VALIDATION = REQUIRED** for this new exact candidate, including station visibility/clearance and previous full phone checklist. No actual Android, TalkBack, tablet, rotations/background or10min sustained hardware test. No inherited phone PASS. Physical QA/checklist banners reset the current gate explicitly. Separate trusted-LAN handoff can be prepared for this revision after this local pass.

**PREMIUM DETAILING 3D STATION = PASS**

**PHYSICAL ANDROID VALIDATION = REQUIRED**

**PRODUCTION MIGRATION = NOT AUTHORIZED**


## DETAILING RELEASE PHYSICAL ANDROID VALIDATION — 22 OCTOBER2026

**FINAL DETAILING ANDROID VALIDATION = USER TEST REQUIRED.** Exact frozen `toli-e937dc7ab7a9566dd6d5d221`, model4,594,732bytes/SHA256 `966a399bad66c0003f7b196052c92382188629db16c1ec47c86c3175fcf5f9bd`, passes fresh package validation and LAN-served byte verification. Newly detectedWi-Fi192.168.1.14, private-only port8164, actual `release-dist`. **PHONE URL: http://192.168.1.14:8164/Toli-2/#/3d-production-preview**. Session69585 remains running; same trustedWi-Fi/computer awake required, phone reachability still unverified.

Fresh desktop sanity sees all six equipment categories and four bottles, one canvas, ready Vehicle and clean console. Desktop-only screenshot/evidence is in `tools/release-audit/detailing-android/`; never phone proof. No real Android/debugger accessible; device/Android/browser/resolution/DPR unverified. Every physical functional item is NOT TESTED, Vehicle/mode/rotationcycles0/5, sustaineduse0minutes, performanceUNMEASURED, subjective smoothness/heating unavailable, TalkBack/tabletUNVERIFIED. P0–P3defects NOT ASSESSED; no fixes/retest or new release. Existing463/64/build/types/QA/lint baseline retained, not rerun for documentation-only gate.

Full current phone checklist is the first section of `TOLI-3D-PHYSICAL-DEVICE-QA.md`. Fresh628-file protection audit:all unchanged, including157candidate files; original rollback source/GLB verified intact. Production stays traditional; no migration/deploy/optimization. **NEXT GATE = FINAL PRODUCTION MIGRATION AUDIT** only after real Android PASS/PASS AFTER FIXES.


## SOURCE-OWNED DETAILING + RIGHT-SIDE CARS SUCCESSOR

22 October2026: superseded for current testing by **`toli-ff21133adc182b072b14c15e`**,5,179,488byte model, now from a separate actual source `toli-workshop-detailing-cars.blend`. All original detailing geometry/source remains rollback. Corrected stale replica-review viewer and unified source mappings; normal npmdev and packaged preview both show the same station plus one optimized environmental sedan (two total with primary). Four added draw calls, no new texture, no production change. Full467/65regressionPASS; physical gate REQUIRED again. See `TOLI-3D-DETAILING-CARS.md`.
