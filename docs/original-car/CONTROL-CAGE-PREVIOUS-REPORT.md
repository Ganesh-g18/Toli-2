# BODY + FASCIA FINAL REFINEMENT

18 October 2026. TOLI Atelier Sportback — one focused revision-8 study, continuing the best revision-7 source. No manufacturer model, logo, downloaded geometry or paid generation service.

**NOT ACTIVATED. The focused visual gate still fails. CURRENT PROCEDURAL MODELING APPROACH HAS REACHED ITS QUALITY CEILING.** No revisions 9–12 or cosmetic follow-up iterations were made. The retained canonical model/source remain revision 7, also inactive. The failed study is preserved separately, outside the production asset tree.

Previous findings and the 318-test starting baseline are preserved in `docs/original-car/REVISION-7-REPORT.md`.

## Revision 7 Problems

Inspected the previous report, generation script, actual GLB, saved pass1–5 images, final revision-7 front/side/rear images and the existing shared renderer/loader contract before editing. The prior report described seven generated revisions; a separate saved revision-6 render was not retained in those files. No missing render was fabricated.

Observed blockers:

- The hood crown and side shoulder used unrelated transverse equations. Their positional join did not establish a coherent highlight-flow constraint.
- Short longitudinal interpolation spans and compressed local shape controls produced visible reflection variations at panel transitions.
- Front and rear were separate projected end skins with embedded openings. Their attachment to the hood/fenders/hatch read as assembled pieces.
- The front had too much undifferentiated face volume, with optics and intake appearing inserted rather than shaped into a body.
- Side proportions were broadly road-car-like, but the long doors/quarters remained visually slab-like; the greenhouse-to-body seating was weak.
- The rear quarter, hatch edge and rear fascia did not resolve into one finished automotive volume.
- Numerical unit normals and higher triangle counts had already passed without resolving these visual defects.

## New Revision

This was a focused surface/proportion/fascia study, not another detail pass. Wheels, tires, brakes, mirror construction and interior were carried forward. No badges, lettering, screws, vents or decorative material detail were added.

| Area | Revision-8 work and actual result |
| --- | --- |
| Silhouette | Smoothed longitudinal width/height fields and revised end shaping while retaining the wheelbase/stance. The profile reads more continuously, but becomes too round and bulky at the ends. |
| Hood | Replaced its independent crown formula with a cubic transverse profile joined to the side-section tangent. Broad crown flow is smoother, but the leading-edge/end-skin treatment produces an unacceptable raised/pinched lip. |
| Fenders | Shared side-section family runs through the front wheel/door/quarter regions. This improves broad highlight flow; it does not produce the controlled arch tension of a finished automotive surface. |
| Shoulder | One continuous upper-body profile replaces the narrow local shaping functions. The visible main side highlight is calmer. |
| Side body | Controlled rocker tuck/concavity comes from the same cubic section. Long flanks still lack sufficiently deliberate automotive surface hierarchy. |
| Greenhouse | Windshield/rear-glass ends and window bases are seated against the actual body-crown field. This reduces the cabin-on-top impression; A-/C-pillar transitions still need topology-level integration. |
| Front fascia | Added compound face shaping around the optical region and an attempted shared rounded leading edge. It still reads as an attached end panel and introduces visible attachment defects. |
| Headlights | Retained the existing optical geometry, adjusted opening outline and added return surfaces. The surrounding body still does not wrap convincingly around the housing. |
| Grille/intakes | Reused the existing macro intake, added approximately 70mm return depth and recessed its backing/vanes. The close render exposes incomplete enclosure/attachment; this is a failed construction result, not an approved deep intake. |
| Front bumper | Attempted a coherent body-to-face roll and lower treatment through the shared end field. Pinching and an over-rounded leading edge remain major failures. |
| Rear quarter | Smoother width field and seated rear glazing help the broad volume. The quarter/hatch/fascia junction still concentrates highlights and looks assembled. |
| Rear fascia | Same shared end-field approach, with return geometry at the lower opening. Upper attachment and hatch transition remain unresolved. |
| Taillights | Existing original assemblies retained with adjusted outlines/return depth. Their integration is still insufficient for approval. |
| Panel gaps | Existing subtle separation/hierarchy retained; no thick decorative seam drawing added. The serious artifacts are surface joins, not a lack of small panel detail. |
| Reflection flow | Broad side flow improves, but the neutral-strip test exposes pinched front/hatch joins and abrupt transitions. Overall FAIL. |

The study uses a common cubic side/crown section family and continuous longitudinal fields. The hood/shoulder profiles share a designed first-derivative direction, but the complete car still lacks a shared control topology. Adding this mathematical relationship did not solve trim boundaries, end-skin attachment or curvature flow around openings.

No global subdivision increase was used. Existing wheels and most density were retained. Failed leading-edge/enclosure results were not disguised with darker lighting or more decoration.

## Revision 7 vs New Revision

Actual saved renders, with matching front/side/rear cameras and the same final-lighting setup. The validation toolbar differs because close-up/diagnostic views were added; it is not part of the website.

| View | Concrete visible comparison |
| --- | --- |
| Front 3/4 | The hood-to-side sweep is broader/smoother, but the new hood leading edge pinches into an obvious lip and the bumper still looks detached. This is not a net production-quality improvement. |
| Side | Shoulder flow and cabin seating are visibly more continuous. The body remains slab-like and the new rounded end mass is too blunt. Wheel geometry/scale were intentionally unchanged. |
| Rear 3/4 | Rear-glass seating and broad quarter flow improve; the hatch/end-panel boundary develops concentrated highlights and still looks separate. Neither version looks finished enough. |

![Revision 7 versus focused revision 8](original-car/final-body/06_COMPARISON.jpg)

Comparison viewer: `tools/3d/body-comparison.html`. Baseline images are retained under `docs/original-car/final-body/revision-7/`.

## Required Render Results

All five are actual browser renders of the new study, not code-based judgments or generated mockups.

| Required render | Result | Evidence |
| --- | --- | --- |
| 01_FRONT_3Q | **FAIL** | Blunt front mass, leading-edge pinching, attached-panel appearance |
| 02_SIDE | **FAIL** | Improved continuity but insufficiently sculpted body/end proportions |
| 03_REAR_3Q | **FAIL** | Unresolved quarter/hatch/fascia integration |
| 04_FRONT_CLOSE | **FAIL** | Clear leading-edge artifacts and intake enclosure/attachment defects |
| 05_REFLECTION_TEST | **FAIL** | Neutral strips expose concentrated/pinched highlights and curvature breaks |

![01 Front three-quarter](original-car/final-body/01_FRONT_3Q.jpg)

![02 Side](original-car/final-body/02_SIDE.jpg)

![03 Rear three-quarter](original-car/final-body/03_REAR_3Q.jpg)

![04 Front close](original-car/final-body/04_FRONT_CLOSE.jpg)

![05 Neutral reflection test](original-car/final-body/05_REFLECTION_TEST.jpg)

The reflection mode temporarily replaces only the paint with medium reflective grey, uses neutral strip sources and removes the red rim influence. The normal final mode retains graphite metallic paint. It does not modify the exported asset or production materials.

## Quality Ceiling

**YES — CURRENT PROCEDURAL MODELING APPROACH HAS REACHED ITS QUALITY CEILING.**

This conclusion applies to this implementation, not to all procedural or scripted automotive modeling.

The limiting factors are **surface/topology construction and fascia attachment**:

1. Independent longitudinal/section fields and separate projected end skins can be positionally aligned without establishing controlled curvature across the entire car.
2. Trimmed triangulated openings are projected onto a different field from the hood/fender surfaces. They do not provide coherent support-edge flow around lenses, wheel arches and intake returns.
3. The leading-edge roll introduces a locally steep/clamped mapping; visible pinches persist despite numerically valid normals. More triangles would only sample that poor surface more finely.
4. Panel segmentation and an independently shaped greenhouse cannot be made into an automotive control surface merely by blending a few height/width values.
5. Fascia cavity depth exposes the lack of explicit shared return/attachment topology. It is not primarily a paint or lighting problem.

**Not the main limitation:** material variety, lack of decorative parts, GLB format, renderer validity or insufficient global subdivision. Neutral lighting made the underlying construction failure clear. Blender was not part of this source workflow, so this is not a diagnosis of a failed Blender modifier setup. The next step is authored control topology rather than more scalar profile changes.

### Recommended next modeling strategy

Use an **authored quad control cage with Catmull–Clark subdivision**, supported by curve/profile guides and a reproducible Blender export pipeline:

- Establish side/plan/front silhouette and wheelbase guides for the same original design.
- Create a coherent body cage with deliberate shared edge flow through hood, fenders, doors and rear quarter. Use a small number of well-controlled spans, with support loops at arches, cowl and body breaks.
- Build front/rear fascias and optical/intake returns into compatible topology. Do not project independent polygons onto an unrelated end field.
- Judge one continuous body under neutral reflection strips before splitting the hood/doors/hatch. Then introduce restrained panel gaps without destroying the established tangents/curvature.
- Seat the greenhouse against explicit sill/A-/C-pillar cage boundaries. Reuse the existing wheel/brake assemblies and hierarchy where useful.
- Preserve a `.blend` source, cage/modifier settings and a script-driven GLB export. Produce a web derivative only after the body passes visual review.

Curve/profile modeling remains useful as a guide, but the attempted cross-section refinement demonstrates that extending the current field/projection method is insufficient. A full pipeline rewrite was **not** performed automatically; the justification and proposed construction change are recorded here first, as requested. No revision 9, 10, 11 or 12 was produced.

## Activation Decision

**NOT ACTIVATED.** Standalone critical gates fail, so the website-preview gate is not reached. No attempt was made to force the study into the shared renderer, change `reviewedForProject`, bypass the fallback or downgrade the visual standard.

- Canonical source/GLB: exact retained **revision 7**, still inactive. Its audit matches the saved pre-pass baseline.
- Failed focused revision 8: source and GLB in `tools/3d/experiments/`, outside `public/` and the application import graph.
- `ACTIVE_VEHICLE_MODEL` remains null. Registry and shared renderer remain unchanged.
- No Hero-time GLB initialization, duplicate application canvas or Service Matrix/Component integration was added.
- Reduced-motion, loading, fallback, form, Gallery and AI behavior remain unchanged.
- Production preview, final 360 acceptance, mobile integration and performance approval are not claimed for the failed study.

## Actual Asset Validation / Metrics

Independently parsed the experimental binary with the installed Three.js GLTFLoader and compared counts to the exporter audit. Zero nonfinite positions and zero invalid/nonunit normals were found in that numerical check. This is not a visual PASS or Khronos-validator certification.

| Metric | Retained revision 7 | Failed focused revision 8 |
| --- | ---: | ---: |
| GLB bytes | 4,268,888 | 4,293,704 |
| Triangles | 192,105 | 193,064 |
| Summed mesh vertices | 125,334 | 126,125 |
| Meshes | 58 | 58 |
| Materials | 12 | 12 |
| Textures | 0 | 0 |

R8 bounds: min `[-2.4496684, 0.000000006, -1.1048224]`, max `[2.4387882, 1.5053999, 1.1048224]`. Y up, +X front, metric scale. No lossy optimization was applied after failure; source remains reproducible. No “quality” inference is drawn from these counts.

## Hero

Modified: **NO**.

Behavior changed: **NO**.

Hero source/CSS/height/cars/assets/text/lighting/loading/interactions remain untouched. Recorded protected-file hashes were rechecked.

## Navbar

Modified: **NO**.

Behavior changed: **NO**.

Navbar source/CSS/car/logo/identity/HELP/theme/booking/menu remain untouched. All **77 protected files** match the prior hashes. Gallery, Service Request and TOLI AI were also preserved.

## Validation

Starting baseline: **318 passing tests**. No valid test was deleted, skipped or relaxed.

- Production build: **PASS** — `npm run build`, 9.40 seconds.
- TypeScript: **PASS** — `node node_modules/typescript/bin/tsc -b`.
- Lint: **PASS** — `npm run lint`.
- Full tests: **PASS — 318 tests / 44 files**, 51.05 seconds; `npm test -- --maxWorkers=2 --testTimeout=20000 --hookTimeout=20000`.
- Independent R8 binary parse: **PASS numerical checks**, with counts matching the exporter audit; zero invalid positions/normals. Visual quality remains FAIL.
- Browser: five actual new render views, direct three-angle comparison, and fresh isolated-preview load checked. Status reads “R8 · INACTIVE / visual gate failed”; captured error log was empty in that preview session.
- Production output: experimental R8 assets are absent from `dist`; no application import or registry activation was introduced.
- Protected files: **77 checked, zero changes**. Canonical R7 source matches its saved snapshot byte-for-byte and its regenerated audit matches the pre-pass baseline.
- Existing Browserslist/Tailwind/lazy-chunk build warnings and jsdom/React test diagnostics remain; none were suppressed.

## Files / Reproduction

- `tools/3d/experiments/generate-body-fascia-r8.mjs` — isolated reproducible focused study; run with Node from the project root.
- `tools/3d/experiments/toli-body-fascia-r8.glb` and `.audit.json` — failed study output, outside production assets.
- `tools/3d/experiments/r8-validation.json` — independent parse/count/numerical shading check.
- `tools/3d/experiments/README.md` — rejection, provenance and next-strategy documentation.
- `tools/3d/preview.html` — development-only front-close/neutral-reflection cameras; defaults to R8 study, `?revision=7` shows retained R7.
- `tools/3d/body-comparison.html` — actual baseline/new three-angle comparison.
- `tools/3d/archive/generate-toli-sportback-r7.mjs` — pre-pass source snapshot.
- `docs/original-car/REVISION-7-REPORT.md` — prior report preserved.
- `docs/original-car/final-body/01_FRONT_3Q.jpg` through `05_REFLECTION_TEST.jpg`, `06_COMPARISON.jpg` and `revision-7/` — actual evidence/baseline.
- `public/models/toli-sportback/README.md` and `review-status.json` — document retained R7 and rejected R8/quality ceiling; activation remains false.
- `docs/ORIGINAL-3D-CAR-REPORT.md` — this report.

The canonical generation source was restored byte-for-byte to its pre-pass R7 snapshot; regenerated public model metrics equal the pre-pass baseline. No application runtime source or tests changed in this pass. Existing unrelated working-tree changes were preserved. Build outputs and TypeScript incremental information are regenerated by validation.
