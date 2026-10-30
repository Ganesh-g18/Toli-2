# AUTHORED CONTROL-CAGE / SUBDIVISION MODEL

Candidate: **TOLI Meridian M1-B**, body-only. Review date: 2026-10-18.

**PRODUCTION QUALITY: FAIL. ACTIVATION: NO.** Actual Blender renders were produced and inspected. The targeted shoulder/roof correction did not resolve the over-rounded silhouette and hood/cowl reflection waviness. The explicit Milestone 1 stop condition applies: no detailing, GLB export or website integration.

## Previous Approach

Status: **QUALITY CEILING REACHED — PROTOTYPE / REFERENCE ONLY.**

The legacy procedural model and rejected R8 remain intact. Their lofted/disconnected surface fields, projected fascia skins, pinched transitions and inconsistent reflective continuity were not a suitable base for further detail. Neither asset was overwritten or activated. The preceding full report is archived at [CONTROL-CAGE-PREVIOUS-REPORT.md](original-car/CONTROL-CAGE-PREVIOUS-REPORT.md); its render evidence remains available.

## New Modeling Architecture

Control cage: explicit authored section/vertex coordinates in [body-cage.json](../tools/3d/toli-control-cage/source/body-cage.json), assembled as a single connected quad body with connected end caps. No legacy body generator or projected fascia is reused. This is authored numeric mesh data, not a human-sculpted or imported CAD body.

Subdivision: editable Catmull–Clark, viewport level 2 / render level 3. Symmetry: Y-axis Mirror with merged centreline, preceding subdivision. No destructive application.

Topology strategy: 32 longitudinal stations with nine architectural rows for rocker/arch boundary, arch return, shoulder, sill, upper greenhouse/hood and centreline. Explicit close sections support wheel openings and ends. This is a new method, but the regular strip layout still propagates excessive arch density through upper surfaces and stretches some transitions. All-quad topology does not establish automotive surfacing quality.

Source file: [toli-meridian-milestone1.blend](../tools/3d/toli-control-cage/source/toli-meridian-milestone1.blend). Source, scripts, renders and empty exports directory remain outside public/browser source. [Reproduction instructions and verified toolchain](../tools/3d/toli-control-cage/README.md).

Export: **NOT CREATED**, because the body gate failed. No full vehicle hierarchy is claimed. Four separately labelled wheel envelopes are proportion references, not finished wheels. The lower body is open at the rocker/arch boundary; liners/underbody are not completed.

## Milestone 1 — Body

**FAIL.** M1-A was rendered, followed by a targeted M1-B authored shoulder/roof correction under identical cameras and lights. M1-A coordinate data and partial renders are preserved in the candidate folder. The correction lowered the crown approximately 40 mm and tightened the shoulder control points. It does not justify proceeding.

| Region | Rendered finding |
|---|---|
| Proportions | Plausible road-car length/wheelbase relationship; adequate starting blockout, not a premium finished silhouette. Axles X −1.42/+1.40 m; reference tire diameter 0.70 m. |
| Silhouette | Too soft and generic; massing remains inflated in three-quarter views. |
| Hood | Connected to fenders, but visibly wavy reflective flow and a swollen leading transition. |
| Fenders | Continuous mesh rather than detached fields; insufficient controlled crown/shoulder tension. |
| Wheel arches | Built into lower body topology, with visible guide clearance; lips/returns remain uneven and unrefined. |
| Side | Restrained continuous volume; shoulder lacks premium definition and lower-body finish. |
| Roof | Integrated basic sportback arc; crown and greenhouse transitions remain too rounded. No actual glass yet. |
| Rear quarter | Connected into roof and shoulder, but under-resolved rear volume and end transition. |
| Reflection flow | Neutral strips expose waviness at hood/cowl and insufficiently controlled broad transitions. FAIL. |

### Actual fixed-camera evidence

All final M1-B images: 960×640, Blender Cycles CPU, level-3 body subdivision, fixed studio. Reference wheel cylinders are intentionally visible. Diagnostic material and red-rim-disabled view prevent beauty lighting from concealing faults.

- [01 Front ortho](../tools/3d/toli-control-cage/renders/milestone-1/01_FRONT_ORTHO.png)
- [02 Side ortho](../tools/3d/toli-control-cage/renders/milestone-1/02_SIDE_ORTHO.png)
- [03 Rear ortho](../tools/3d/toli-control-cage/renders/milestone-1/03_REAR_ORTHO.png)
- [04 Front three-quarter](../tools/3d/toli-control-cage/renders/milestone-1/04_FRONT_3Q.png)
- [05 Rear three-quarter](../tools/3d/toli-control-cage/renders/milestone-1/05_REAR_3Q.png)
- [06 Front close](../tools/3d/toli-control-cage/renders/milestone-1/06_FRONT_CLOSE.png)
- [07 Neutral reflection test](../tools/3d/toli-control-cage/renders/milestone-1/07_REFLECTION_TEST.png)

Both ends, side and both three-quarter views were inspected. The fixed rear three-quarter framing is too tight at the far rear corner; this render is evidence of the failed study, not a final presentation view. A full animated 360° approval inspection was not performed because the body already fails the fixed-view gate.

## Milestone 2 — Fascia + Greenhouse

**NOT STARTED — blocked by M1 FAIL.** Front fascia, rear fascia, headlights, taillights, window recesses/glass and finished pillars are not authored. Body end caps are only blockout surfaces. Do not count their absence as completed fascia work.

## Milestone 3 — Components

**NOT STARTED — blocked by M1 FAIL.** Finished wheels, tires, brakes, mirrors, interior and panel gaps were not built. The four reference cylinders are not vehicle component assemblies.

## Milestone 4 — Materials

**NOT STARTED — blocked by M1 FAIL.** Neutral graphite/metallic diagnostic surfaces and repeatable studio reflections are available for body inspection. Final paint, glass, rubber, metal, light assemblies and trim material tuning are deferred. No production-material PASS is claimed.

## Comparison

Procedural vs Control Cage: the new connected mesh removes the old detached hood/fascia construction, but that structural improvement has not produced a substantially better premium body.

Front three-quarter: more unified volume, still inflated and wavy. Side: coherent but too generic. Rear three-quarter: under-resolved rear quarter/end. Reflection quality: insufficient controlled flow.

**Is improvement immediately obvious? NO — not enough to pass the requested visual gate.** This is a qualitative comparison with existing reference evidence, not a same-lighting final-car A/B claim. The requested formal old/new comparison at Milestone 3/4 was not reached and is deferred. M1-A/M1-B use the same new studio/cameras.

## Asset Metrics

Measured from the saved source using [audit_source.py](../tools/3d/toli-control-cage/scripts/audit_source.py), with results in [render-body-metrics.json](../tools/3d/toli-control-cage/source/render-body-metrics.json). Counts exclude studio and guide meshes unless stated.

| Metric | Actual value |
|---|---:|
| Editable `.blend` source | 667,828 bytes |
| Explicit current cage JSON | 19,770 bytes |
| Half-cage vertices | 302 |
| Half-cage faces | 262 quads; 0 triangles |
| Mirror + level-2 vertices / faces / triangles | 8,517 / 8,384 / 16,768 |
| Mirror + level-3 vertices / faces / triangles | 33,801 / 33,536 / 67,072 |
| Body mesh objects | 1 |
| Body material slots | 1 (paint or diagnostic at render time) |
| File image textures | 0 |
| Evaluated body length / width | 4.873 m / 2.007 m |
| Evaluated body Z bounds | 0.200–1.495 m |
| GLB / GLB size | None / not applicable |

The studio also contains floor, lights, cameras and four guide meshes; these are not export metrics. Source contains paint, diagnostic, guide and floor materials. No web optimization or complete-vehicle counts are claimed.

## Website Integration

Status: **NOT ATTEMPTED.** No GLB export, model registration, shared-renderer preview or activation. Existing model activation stays unchanged. No renderer, preload, runtime import, cache change or fallback change was introduced. Initial Hero loading cannot request this candidate through any added runtime code because none was added. Browser runtime/production-console checks were not repeated for an unchanged website; build/test verification is reported separately.

## Hero Protection

Hero modified: **NO**. Hero cars modified: **NO**. Hero behavior changed: **NO**.

## Navbar Protection

Navbar modified: **NO**. Navbar car modified: **NO**. Navbar behavior changed: **NO**.

Logo pill, Editorial Gallery, Service Request, TOLI AI and main stacked architecture: unchanged. Hash verification: **77/77 protected files unchanged**, plus **6/6 legacy prototype/reference files unchanged**. See [protection-validation.json](../tools/3d/toli-control-cage/source/protection-validation.json). The repository already had extensive prior changes; it was not reset or represented as a clean checkout.

## Validation

Starting baseline: **318 PASSING**.

Build: PASS. TypeScript: PASS (`tsc -b`). Lint: PASS.

Tests: **318 PASS across 44 files** on the full isolated rerun (34.96 s). First run: 317 PASS / 1 geometry-test timeout during concurrent checks, no assertion failure. No test or production source was modified to suppress it.

Source audit: PASS for quad cage, modifier order, symmetry setup and actual evaluated counts. This is structural validation, not a visual-quality pass. Build retains existing Tailwind ambiguity/chunk-size warnings; test runner reports existing React Router/React act/localStorage warnings. No claim of warning-free tooling.

## Final Visual Decision

**PRODUCTION QUALITY: FAIL. ACTIVATION: NO.**

The new authored cage and editable Blender scene exist, with actual diagnostic evidence. This attempt has not achieved the requested production-quality sedan. The next useful work is deliberate topology/surfacing redesign at the hood/cowl/fenders and roof/shoulder transitions, not lights, interior or wheel detail around this body. Milestones 2–5 and final integration remain uncompleted under the explicit stop condition.
