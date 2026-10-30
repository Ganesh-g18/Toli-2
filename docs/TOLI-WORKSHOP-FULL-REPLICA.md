# TOLI workshop full replica

21 October 2026. Scope: later four-opening facade selected by the user; photo-supported architectural replica and isolated experiment. Traditional production website remains primary. This is a visual/spatial reconstruction, not a measured digital twin.

## Reference inventory and photo analysis

All 16 original photographs are recorded with hashes, dimensions, direction, architecture, fixed equipment, furniture, signage, lighting, floor, walls, service equipment, reception, storage, openings, mezzanine, booth, workbench, temporary objects and uncertainties in `tools/3d/toli-workshop/reference/replica/reference-inventory.json`. The pre-model category/priority audit is `TOLI-WORKSHOP-REPLICA-GAP-AUDIT.md`.

P02–P05 establish the later four-opening frontage. P10/P13 show a different, older two-opening configuration and are retained as historical evidence rather than mixed into the new facade. P11/P12/P14/P15 provide the clearest interior views, dated 2024 where visible. Continuity between that interior and the later facade is **unverified**. No new rooms or current floor plan are claimed. P01/P06–P09 reveal roof/lighting fragments through temporary event contents. P16 is an office corner without a reliable floor-plan locator; it is not transposed into an invented room.

## Strategy and confidence map

The approved source and v2 GLB remain rollback assets. New edits are in `tools/3d/toli-workshop/source/toli-workshop-replica.blend`; the independent candidate is `tools/3d/toli-workshop/exports/toli-workshop-replica-candidate.glb`. Rebuild starts from the approved master and saves only the new source; do not run legacy non-idempotent scripts against either master.

| Confidence | Evidence |
|---|---|
| High | Four visible facade openings, white piers/red shutters, separate right TOLI panel, pitched shed, red structural rhythm, lane-to-booth topology, red/cream/glass landmarks |
| Medium | Relative facade proportions, frame spacing, fixture suspension, office/desk footprint, cabinet, stair/deck relation, material scale |
| Low / estimated | Absolute dimensions, hidden booth depth/interior, obstructed workbench contents, exact upper landing, later interior continuity |
| Proposed interface | Separate display/terminal collection; deliberately excluded from architectural reference renders |

## Architecture, floor and structure

The new frontage has four divisions, one raised entry, three ribbed red shutters, white piers, a taller sign band and a thin canopy. Obsolete two-opening frontage, grille shadow panel and duplicated canopy are removed only in the new source. TOLI-owned logo/text are separate objects; third-party advertising remains neutral and makes no authorization claim. The central lane, frame hierarchy, floor datum, roof, bay organization and interior envelope remain based on the existing camera-fitted reconstruction. The facade-to-lane threshold is conservatively aligned with the retained aisle.

Unequal slab modules and pale joints remain, with a slightly darker color derivative and independent roughness/normal maps. No oil, random cracks, fabricated dirt or customer plates are added. Original maps remain unchanged. Red steel, wall cladding and yellow bay lines retain shared materials. The small enclosure/conduit on the nearest right frame follows P15; it has no invented machinery labels or capabilities.

## Roof and lighting

The pitched corrugated roof, truss silhouette, skylight rhythm and distinctive angular suspended fixtures remain recognizable. Thin suspension lines supplement the existing fixtures. Emission is restrained; no bloom, fog, depth-of-field masking or live lamp per tube. Exact suspension spacing and hidden connections remain estimates.

## Reception and office

P14 supports a glazed gray/red enclosure, opening/pull, brown floor, ceiling fan/lights, dark upper cabinet and rear desk with visible leg space. The old bulky room-wide counter is replaced with a compact desk and legs; the new desk footprint is a medium-confidence silhouette, not proof of the current reception layout. Stair visibility through glazing remains. Identifiable people, QR codes, personal belongings, temporary boxes and customer-car reflections are excluded.

## Service bays, workbench and fixed equipment

The red frames, lower white/gray panels, bases, bay lines and booth relationship are retained. A small photo-supported column enclosure/conduit is added. The left bench is explicitly low-confidence inherited geometry because parked vehicles obscure the real work zone; no detailed invented tool wall, machinery or one-service-per-bay claim is made. All nine services remain a directory, not nine fabricated physical departments.

## Paint booth

The visible cream shell, paired red doors, rounded windows, jamb/handle silhouette and floor relationship are retained. P11/P15 do not reveal enough to reconstruct hidden ventilation, mechanisms, rear wall or interior fittings. These remain omitted/simplified.

## Mezzanine and stairs

The red-supported glazed office/deck, straight stair, landing and guardrail relationship follow the older clear interior references. Storage contents, exact landing dimensions and continuity with the later exterior remain estimates. P16 does not justify another invented office.

## Materials and signage

Packed optimized local maps; normal/roughness remain lossless, color derivatives use 1K JPEG. The existing owned 500px TOLI emblem is separate, with plain TOLI text. No third-party logo, authorization banner, vehicle advertisement, people or customer-car photograph is baked into the model. Proposed interface furniture is one vertex-color material, partitioned by destination to keep object targets without excessive batches.

## Object interaction map

| Object | Destination / action | Evidence status |
|---|---|---|
| Service-frame bases and attached directory | Services / nine-item catalog / existing Request flow | Frames photographed; directory proposed |
| Original illustrative vehicle in right bay | Vehicle / discuss vehicle | Existing original asset, not a photographed customer car |
| Process display on reception side | Journey / existing step selection and Request | Proposed installation |
| Wall information point | Why TOLI / service guidance | Proposed installation |
| Photo display | Gallery / original accessible lightbox | Proposed installation |
| Rear reception desk/glazing | Reception / canonical Service Request | Architectural silhouette medium confidence |
| Small reception help terminal | TOLI AI / existing local guidance | Proposed installation |

Locations remains the native-button alternative to every 3D target. Pointer taps are distinguished from drags, cancellation and secondary touch pointers. The nearest visible wall blocks a target behind it. Hover uses a small disposable material copy; shared source materials remain intact. The helper is covered by regression tests, including transparent-glass fallback and opaque occlusion. A physical object may first move the camera and open its semantic information; existing explicit Request/AI buttons perform the next action. No invisible automatic submission.

## Missing reference angles

- Later entry: uninterrupted wide image from the four-opening entrance showing lane, roof and reception together; resolves era continuity.
- Reception: unoccupied doorway-wide and opposite corner images showing complete desk, door and stair foot/top.
- Left workbench: unobstructed photographs along the perimeter without parked cars.
- Booth: clear front plus side/rear and open-door interior; hidden mechanisms remain excluded.
- Mezzanine: stair foot, landing and entire deck perimeter in one wide view.
- Fixed electrical equipment: close-up and wide locator image per fixture; P16 alone cannot locate its office.

Physical-device validation remains **USER TEST REQUIRED**. Existing LAN results do not validate the new model.

## Validation and final gates

**WORKSHOP REPLICA = PASS. REPLICA WEBSITE INTEGRATION = PASS. PHYSICAL DEVICE VALIDATION = USER TEST REQUIRED.** Gates are separate records: `reference/replica/visual-gate.json` and `integration-gate.json`. PASS concerns architectural recognition and local browser/automated operation, not photorealism, verified current floor-plan continuity or a survey.


## Published isolated integration

Final runtime: `public/models/toli-workshop-replica.glb`. The first candidate was copied into public only after the independent visual gate. Experimental loading uses `src/experimental/spatial/replica-asset.ts`; production continues using its unchanged v2 asset/loader. Homepage routing, Hero, Navbar and production Inside TOLI are untouched. Nothing was deployed.

The desk/glazing, frame bases, proposed wall displays, lower-wall Journey placard and small help terminal carry destination metadata. The existing original vehicle receives a parent destination tag only after its deferred load. Native Locations covers all eight destinations. Services keeps the exact nine-item catalog. Journey keeps its step selection. Why TOLI retains service guidance without blanket guarantees. Gallery remains deferred with its existing keyboard lightbox. Reception/Services/Journey/Vehicle/AI reuse the canonical Service Request context, draft and preselection callbacks. No test enquiry or external message was sent.

Redundant floating destination markers, their projection loop and marker styles are removed. The welcome is smaller. Reception's semantic display is 280px wide on desktop and placed aside, leaving the desk/glazing visible. Mobile retains an accessible lower sheet. The proposed Journey board was found to obscure glazing in close view; it is now a small placard on the opaque gray lower wall. The helper allows the visible terminal/desk to be selected through transparent glass, with Reception as a glass fallback; an opaque wall still blocks a hidden target. Hover copies are restored/disposed; secondary pointers, drags, cancellation and paused scenes do not activate targets.

## Reference comparisons and final source revision

Eight 1000×750, 20-sample Cycles views: `tools/3d/toli-workshop/renders/replica/01-exterior.png`, `03-central-lane.png`, `04-reverse-central-lane.png`, `05-reception.png`, `06-workshop-left.png`, `07-workshop-right.png`, `08-paint-booth.png`, `09-mezzanine.png`. View 07 also exposes the roof, trusses and suspended geometric lighting. These are architecture views with the separately named proposed-interface collection hidden.

Whole-frame photo/render pairs and 50% overlays: `renders/replica/comparisons/`. Independent actual-GLB browser/photo pairs and overlays: `renders/replica/browser-comparisons/`. Independent browser captures: `tools/release-audit/replica/browser/01-exterior.jpg` through `09-mezzanine.jpg`. Frames are letterboxed, not warped. Lenses/intrinsics are unknown, so these are architectural comparisons, not pixel-registration or survey claims. Facade P04, lane P11, reverse/mezzanine P12, reception P14 and service/booth P15 are explicitly identified.

The final source revision only relocates/resizes the **proposed** Journey placard. `reference/replica/display-revision.json` compares the previous reviewed `.blend1` with the final source: every reconstructed object's evaluated world geometry at 1e-5 precision, material assignment and every packed image is unchanged. Reference renders therefore remain applicable; their original source hash is retained in `comparisons.json`. The final actual GLB was independently checked with proposed displays visible before public replacement; `final-independent-reception.jpg` shows the unobstructed desk. No claim is made that old renders were recomputed from a different hash.

## Camera and renderer

Exactly one renderer/context owns workshop, deferred vehicle and object interactions. The existing authored central-lane/rear-bay paths remain; added boards sit on the perimeter and the terminal stays in reception. The moved placard stays below glazing. No full physics engine, second context or continuously running render loop is introduced. Compile/upload preparation, resize, offscreen/hidden/modal pause, failure fallback and context restoration remain. Camera views were inspected at all destinations; new installations do not cross authored transit positions. Reduced motion retains all architecture and changes the movement duration to zero.

## Accessibility and browser/mobile QA

Locations exposes eight native buttons; Request remains accessible from navigation, including mobile. Keyboard Enter selection, heading focus, Gallery Escape/focus return and canonical Request preselection were checked. Original Gallery image loading was rechecked: all 16 images decoded; the first early screenshot was taken before some lazy images completed. A direct physical service-directory tap opened Services and Battery Services preselection in the canonical dialog. Direct final taps also opened Gallery, Why TOLI, Reception through glazing, Journey from the lower placard and TOLI AI from the visible help terminal. Vehicle parent-tag picking and lifecycle are tested; its actual model is rendered in the same scene.

Final desktop captures cover all eight destinations at 1280×800. Phone-size captures cover Overview, Services, Vehicle and Reception at 390×844. Additional Reception checks at 320×568, 768×1024 and 844×390 report zero horizontal overflow and one canvas. Mobile Request opens the existing dialog. Major architecture is retained, DPR is bounded to 1.25 on mobile/low-memory and 1.5 otherwise, and environment-map size remains bounded. No actual Android/iPhone/tablet was connected: **physical device validation remains USER TEST REQUIRED**; previous LAN evidence does not approve this model.

The injected missing-model fixture still exposes Locations and opens canonical Request from Services. Actual context loss/restoration returned to the workshop using one context. The reduced-motion fixture kept real geometry. Normal production browser QA logged no warnings or errors; injected failures are separate intentional cases. Browser connection timeouts interrupted one final tap attempt; the connection recovered and the actual help/placard/gallery/information/enclosure taps were subsequently verified. No interrupted attempt is counted as a pass.

## Model statistics and budget

| Metric | Approved v2 | Final replica |
|---|---:|---:|
| GLB bytes | 4,076,400 | 4,141,272 |
| Triangles | 47,255 | 48,521 |
| Exported vertices | 88,459 | 87,983 |
| Meshes/primitives | 18 | 29 |
| Materials | 18 | 21 |
| Embedded images | 8 | 9 |
| Estimated RGBA8 texture MiB + mipmaps | 30.667 | 31.938 |

The pre-model budget remains ≤65k triangles, ≤120k exported vertices, ≤30 primitive batches, ≤10 images, ≤40MiB estimated textures and ≤6MiB GLB. All pass; the cap was not raised. An early 33-batch candidate was rejected and optimized using shared vertex-color proposed-display furniture rather than dropping architecture. The final model is +2.68% triangles and +1.59% file size. No exported cameras/lights or runtime compression decoder. Independent actual-file validation checks internal textures, decoded images, finite transforms/attributes, unit normals, valid indices, dimensions/floor datum and successful Blender reimport. Estimated texture memory is not measured GPU residency.

## Performance comparison

Three warm local production samples per model, same browser, no throttling. Original comparison alternated old/new; final replica samples were repeated after the placard/picking fix. These are loopback observations with warm browser/shader caches, not physical hardware or a cold-network benchmark.

| Metric | Approved | Final replica |
|---|---:|---:|
| Navigation → first useful-frame opportunity, median ms | 1016.00 | 1146.90 |
| Scene start → useful frame, median ms | 728.10 | 765.60 |
| Longest startup task, median ms | 169.00 | 191.00 |
| Initial Overview draw calls | 14 | 17 |
| Vehicle draw calls | 80 | 90 |
| Overview after retaining vehicle | 76 | 79 |
| Initial uploaded geometries / textures | 15 / 9 | 20 / 10 |
| Vehicle uploaded geometries / textures | 77 / 10 | 88 / 11 |
| WebGL contexts | 1 | 1 |

Useful-frame median increases **130.9ms / 12.88%**; initial cost increases three draw calls and one texture. Vehicle adds ten calls. This is a modest local regression, explicitly accepted within the declared model budget for the replica/object partitions, not described as unchanged performance. Longest sampled startup task ranges: old 144–253ms, final 156–218ms. Resource counts are observed after those specific views, not universal object totals. Gallery/vehicle remain deferred. The exploratory 5735ms replica observation while checks were active is preserved in `production-all-destinations.json` and excluded from comparable warm samples. Raw samples, final vehicle/warmed snapshots and methodology: `tools/release-audit/replica/browser/` and `performance-comparison.json`.

## Production protection

All **349 pre-task protected paths** were checked. All **16 original photos** are byte-identical. Existing-file changes are limited to the experimental spatial implementation and its existing test file; new runtime asset/helpers/test and review tools are separate additions. No unexpected changed or missing protected path. The existing unrelated dirty working tree is preserved.

| Protected area | Changed by this task |
|---|---|
| Traditional homepage / Hero / hero vehicles | NO |
| Navbar / navbar vehicle / logo assets | NO |
| Production Inside TOLI | NO |
| Approved evidence source / v2 GLB | NO |
| Existing original vehicle assets | NO |
| Package files / application routing | NO |

`reference/replica/protection.json`, `before.json` and source/export provenance contain exact hashes. The new asset is loaded only by the isolated route; no homepage model preload or automatic redirect was added.

## Final regression

- Production build: **PASS**, exit 0 (9.06s).
- TypeScript app: **PASS**, exit 0 (9.63s).
- TypeScript node: **PASS**, exit 0 (4.35s).
- QA/preview TypeScript configurations: **PASS**, exit 0 (1.79s).
- Lint: **PASS**, exit 0 (27.67s).
- Complete test suite: **PASS**, exit 0 (117.50s).

**414 tests across 56 files pass**, up from the 408/55 baseline. Six meaningful interaction checks were added; existing assertions were not weakened or deleted. Early simultaneous-render runs had timeouts, retained in the first-run/timing logs. The final complete run uses one worker after rendering, without increasing test timeouts. The normal Vite build still reports the existing >500kB GLTFLoader chunk warning; it was not suppressed. Browser console QA is separate and clean. Profiling instrumentation and failure controls exist only in the QA build configuration, not normal production.

## Final decision

WORKSHOP REPLICA = PASS — recognizable, photo-supported architecture with explicit estimates and later/older-era uncertainty.

REPLICA WEBSITE INTEGRATION = PASS — isolated object navigation plus accessible semantic content/request paths; measured local cost increase disclosed.

PHYSICAL DEVICE VALIDATION = USER TEST REQUIRED.


## Clean local review

An uninstrumented production preview was smoke-checked at `http://127.0.0.1:8150/Toli-2/#/3d-experience`: real workshop geometry visible, ready state reached, no browser warnings/errors. `tools/release-audit/replica/browser/clean-production-overview.jpg` and `clean-production-console.json` record that check. This is a local review URL, not a deployment. Temporary QA servers were stopped; the clean local preview remains available for review.

## OFFICIAL TOLI MOTORS BRANDING

21 October 2026. This branding revision supersedes earlier replica hashes/statistics for the current experimental asset. **OFFICIAL TOLI MOTORS LOGO INTEGRATION = PASS** for local desktop/browser QA; physical Android validation remains USER TEST REQUIRED on this updated version. No production migration.

### Authoritative artwork and variants

`src/assets/big-transparent.png`: 1483×352 RGBA PNG, transparent background; SHA256 `4809ffd3bde9be888071d5b4c3e90a0f58e627cc2a07f20c49e625a38b1cf590`. The gear/monogram, black TOLI lettering and red MOTORS artwork are retained together. No recoloring, redraw, cropping, inversion, hue shift, filtering or distortion. The GLB embedded image decodes pixel-for-pixel identically to the source, including alpha (`integrity.json`). Native artwork aspect ratio1483:352 is used for every physical plaque and responsive HTML image. White/pale backing ensures black details remain readable without modifying the artwork.

Other discovered variants are inventoried with dimensions/mode/hashes in `tools/release-audit/replica-branding/logo-assets.json`: root `toli logo big-transparent.png`1483×352; `toli-logo-combined.png`1483×352 and WebP800×190; square `logo-removebg-preview.png`500×500 RGBA; `logo.png`1024×1024 RGB; `logo.webp`400×400 RGB; `logo-text.png`424×70 RGBA. They are not substituted for the authoritative artwork. Existing Navbar logo implementation/assets remain untouched.

### Sixteen-photo branding audit

Source filenames/IDs map to `tools/3d/toli-workshop/reference/replica/reference-inventory.json`; refreshed visual contact sheet is `reference-contact-sheet.jpg` in this branding evidence folder. Photo perspective proportions are approximate, not surveyed dimensions.

| Reference | Physical location / sign type | Proportion / orientation / mounting | Confidence / decision |
|---|---|---|---|
| P01 | Temporary inauguration backdrop; TOLI name partly behind people alongside third-party event branding | Large portrait-observed fabric/printed event wall, upright | HIGH temporary event identity; excluded from permanent replica |
| P02 | Later facade, right owned TOLI white panel, separate from large third-party vehicle advertisement | Near-square owned field; original photo mark above wordmark; front vertical fascia | HIGH location/ownership; MEDIUM dimensions; official horizontal approved asset centered on backed plaque in that field |
| P03 | Same later right facade field, near-frontal | Owned field about one opening width; fascia-mounted | HIGH location; same installation, not another sign |
| P04 | Same later right facade field, frontal | Approximately square white field; upright front-facing | HIGH placement; reference-vs-replica comparison saved |
| P05 | Same later right facade, distant | Same field; small details less readable | HIGH overall placement; LOW small detail |
| P06 | Temporary inauguration event wall, overlapping P01 | Printed event backdrop, upright | HIGH temporary; excluded |
| P07 | Same temporary event installation and third-party lectern | Upright portable/event surfaces | HIGH temporary; no permanent inference |
| P08 | Same temporary event installation | Upright printed backdrop | HIGH temporary; excluded |
| P09 | Same event wall, wider framing | Upright printed backdrop, TOLI text partly occluded | HIGH temporary; excluded |
| P10 | Older two-opening facade, central TOLI-owned sign amid third-party panels | Wide horizontal central panel, front-mounted | MEDIUM small artwork readability; older era not duplicated onto selected later facade |
| P11 | Interior toward booth | No reliably legible TOLI-owned permanent logo | LOW/absent; no invented sign |
| P12 | Reverse interior toward front/reception | No reliably legible TOLI-owned permanent logo | LOW/absent; no invented sign |
| P13 | Close older facade central TOLI sign | Wide horizontal board; mark/wordmark grouped, fascia-mounted | HIGH owned identity; earlier configuration, not an extra current facade sign |
| P14 | Reception glass/gray/red office | No reliable permanent TOLI wall/counter logo | No historical logo claim; small replica plaque/panel identity explicitly proposed website ownership branding |
| P15 | Service frames/booth | Booth plate unreadable; no legible TOLI logo | LOW; do not replace unreadable manufacturer plate with TOLI |
| P16 | Unlocated office, wall art/plaque | Not reliably identifiable as official TOLI sign | LOW; excluded |

The official horizontal file differs from the vertically arranged mark/wordmark photographed on the later fascia. The authoritative artwork is preserved intact rather than rearranged to imitate that lockup. Position/owned field/orientation are reference-supported; exact lockup/proportions are not claimed identical. Third-party advertisements remain neutral.

### Replica integration / material implementation

Removed the previous square `logo-removebg-preview.png` facade graphic and the arbitrary-font `TOLI MOTORS` geometry. Retained the ordinary descriptive workshop subtitle. Installed the official logo on a shallow pale physical backing in the existing right facade field; it has real thickness/offset rather than a floating decal. Original architecture/cameras remain unchanged.

Three modeled logo instances share **one**1483×352 sRGB RGBA texture and one rough nonmetallic Principled material, ordinary lighting, no emission/neon. Transparent artwork is exported with alpha blending; white backing uses the existing pale panel material. Exact planar aspect preserved in world space despite inherited architecture scaling. See `placements.json` for dimensions/centers. Main width3.2 model units; Reception .9; Services .72; absolute building dimensions remain estimated. Texture reuse replaces the earlier square logo image instead of adding another embedded image. Physical geometry remains batched by material; logos have no destination metadata and are not new navigation hotspots.

Reception: one small proposed lane-side opaque-panel ownership plaque, separate from historical photo claims. Browser QA showed the initial desk-mounted position was obscured, so it was moved to the lane-side panel. Services: small pale-backed identity on the existing proposed information board. These physical plaques are subtle and can be small/occluded at approved camera angles. The existing environmental HTML information surfaces overlay those boards, so Services and Reception each also display a restrained116px-wide official image on a pale inset. This keeps branding readable at the actual interaction point without enlarging physical logos or altering camera compositions. The HTML asset is shared by bundler import, with original width/height attributes and automatic aspect-ratio layout. No pixel filters applied. No extra branding added to Gallery/Journey/Why TOLI/Help; optional Help branding omitted to avoid repetition and covering its small interaction target. Their function/content remains intact.

Reproducible standalone source operation: `tools/3d/toli-workshop/scripts/apply_official_branding.py`, applied to the current replica source, then existing `export_replica.py`. Do not regenerate the historical/base replica without reapplying this pass. Final runtime and candidate exports match. Embedded-image integrity and GLB structural/round-trip audits passed; final normal/indices/transforms checks are saved separately. Blender emits its existing sampler-sharing warning during export; browser warning/error console is empty.

### Visual / interaction / responsive QA

Saved production-preview Overview, Services, Reception and Vehicle views; no logo stretch/mirroring/backwards text or visible z-fighting. Facade checked with dedicated Blender exterior camera because approved interior website poses do not reveal the outer sign. Comparison uses P04 beside the unchanged-camera exterior render; it is not a registered survey fit. Facade branding is intentionally not duplicated into Overview simply to force visibility.

Browser-responsive Overview/Reception captures at430,412,390,360,320 widths, plus844×390 landscape. Reception logo remains decoded/recognizable, content scrolls in the existing panel, no horizontal page overflow in the measured five-width sweep. Mobile screenshots are desktop browser resizing, **not physical Android evidence**. Locations/Request controls remain available. Panel branding does not cover workshop geometry beyond the existing information surface.

Services/Vehicle/Journey/Why TOLI/Gallery/Reception/TOLI AI destinations were opened successfully after integration; Vehicle reached ready with original grounded bounds. Existing scene/object interaction code, tags, hit thresholds and canonical request handlers are unchanged, and their regression tests pass. Logo surfaces are noninteractive; they add no duplicate navigation. No claim of fresh physical-phone taps or real submission. No real request sent.

### Model statistics / performance

| Metric | Before | After |
|---|---:|---:|
| GLB bytes |4,141,272|4,268,456|
| Triangles |48,521|46,411|
| Exported vertices |87,983|85,785|
| Meshes/primitives |29|29|
| Materials |21|21|
| Embedded images |9|9|
| Initial draw calls |17|19|
| Vehicle draw calls |90|90 observed|

Bytes +127,184 (~3.1%); fewer triangles/vertices result from removing typed logo geometry, not simplifying architecture. Within existing6MiB/65k triangles/120k vertices/30 batches/10 images budget. Initial +2 visible material batches is bounded; no per-logo high-resolution texture duplication. Vehicle observation used the existing DEV-only diagnostic at the recorded viewport, not a controlled identical-viewport benchmark. See raw `overview-diagnostics.json`/`vehicle-diagnostics.json`. Historical warm useful-frame median~1.15s remains **before**; updated comparable warm median **UNMEASURED**. A single development firstFrameMs observation is not a production useful-frame median and is not promoted to one. No physical performance measurements.

### Validation / production protection

Fresh final production build, application TypeScript, node TypeScript, QA configurations and lint PASS. Complete suite: **414 tests /56 files PASS**; no tests weakened. Exact logs/timings: `tools/release-audit/replica-branding/regression/`.

Fresh SHA256 audit permits only experimental Content/CSS, replica runtime and editable replica changes; every other frozen source/public/dependency/configuration/older source file matches. Homepage=unchanged; Hero=unchanged; Navbar=unchanged; Navbar logo=unchanged; Navbar vehicle=unchanged; Hero vehicles=unchanged; production Inside TOLI=unchanged; approved older workshop GLB=unchanged; vehicle assets=unchanged. See `protection.json`. No deployment, redirect or production migration. Updated source/runtime hashes in `revision.json` supersede prior branding-free gate hashes; earlier visual gates remain historical.

### Evidence / remaining gate

`tools/release-audit/replica-branding/`: logo inventory/integrity;16-photo contact sheet; facade render and comparison; desktop/mobile browser captures; responsive dimensions; clean console; placements/model statistics; raw diagnostics; complete regression and protection manifests. Physical Android validation must be repeated on the **updated** runtime hash. **PHYSICAL DEVICE VALIDATION = USER TEST REQUIRED.**
