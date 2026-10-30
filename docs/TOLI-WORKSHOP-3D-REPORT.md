# FINAL EVIDENCE-DRIVEN REFINEMENT

19 October 2026 · existing TOLI workshop reconstruction · offline source/asset task

**VISUAL QUALITY = PASS. READY FOR ISOLATED WEBSITE INTEGRATION.** No production or development website integration occurred. This decision concerns the recognizable architectural reconstruction, not survey accuracy or real-device performance.

## Source and preservation

- Authoritative editable successor: `tools/3d/toli-workshop/source/toli-workshop-evidence.blend`.
- Continued from `source/toli-workshop-refined.blend`; no scene restart or return to the older candidate. Original refined source remains byte-identical.
- New material-batched derivative: `source/toli-workshop-evidence-web-v2.blend`. Edit the individual objects in the authoritative successor for future architecture changes.
- Old `exports/toli-workshop-web.glb` remains deliberately stale and unchanged. New v2 has a separate filename.
- Editable source: 6,691,383 bytes; SHA-256 `c6d3bf1b6e64e67f493cae7c965e28506119079546943e704c66fbd316a66b13`.
- Earlier report archived at `reference/evidence-final/previous-report.md`; ordered intermediate views under `renders/evidence-stages/` are iteration evidence, not the final set.

## Photo analysis and spatial constraints

All **16 original-resolution photographs** were inspected again before new geometry changes. P13 AVIF was decoded losslessly for viewing; original files/hashes remain unchanged. Photo IDs/hashes are in `reference/inventory.json`. The photo-by-photo analysis, overlapping-landmark relationship map, confidence table and perspective inputs are in `docs/TOLI-WORKSHOP-SPATIAL-CONSTRAINTS.md`.

The most important new conclusions were:

1. P02–05 show a different four-opening frontage. P10/P13 show two main workshop gates plus a narrower left shopfront under one fascia. This pass consistently uses the dated **2024 configuration**, matching P10/P12/P14; it does not silently combine both eras.
2. Red frame tops in P12/P15 are nearly collinear parallel to the side-wall rails. Their paired posts run along the workshop, not across its width. Existing frame assemblies were rigidly rotated around the retained aisle-side anchors.
3. Shared two-view analysis supports shorter paired spans and closer repeated spacing than the inherited model. The first aisle post remains anchored; no separate geometry is fitted for each photo.
4. Reception has an end-facing doorway, side glazing showing an external stair, and a glazed upper lane-facing wall beneath a continuous red mezzanine edge. The earlier opaque lane wall was rejected after reverse-view inspection.
5. P16 has no reliable overlapping landmark proving a separate room location. It contributes material evidence only; no hidden room is invented. Event photographs corroborate roof/fixture/deck construction but do not override the dated floor-plan evidence.

## Geometry corrections

**Facade:** reduced only the upper envelope above the service frames; shortened the generic tall sign band, retained the pitched shed behind a flat fascia, restored the narrow left frontage, adjusted the two main openings/piers, and retained a thin corrugated canopy. Separate neutral removable signage preserves architecture without reproducing third-party advertising. Sign-band/clear-opening ratio is approximately 0.777. No extra floor was added.

**Reception:** rotated/reused the existing front glazing onto the workshop-facing end, corrected the side-glass/stair relationship, reduced estimated depth, moved the assembly slightly toward the entrance to clear the corrected first frame, and changed the lane face to a grey dado plus shared glazing/red mullions. Retained major supported silhouettes: counter, dark cabinet, white ceiling, simple fan/diffusers and scaled wood floor. No hidden furniture, paperwork, screens or occupants.

**Mezzanine/stairs:** deck follows the corrected reception footprint; red fascia wraps the visible perimeter, supports meet the deck, old lane-side rail gap is closed, and stair-side landing gap is retained. Existing straight external flight is narrowed and moved beside the glazed face. Side/orientation is MEDIUM confidence; exact width/top landing is LOW and conservatively represented.

**Service frames:** shared estimated pair span 2.645 and anchor spacing 6.156 in root presentation units, replacing 3.8/7.0. Post height/section and first aisle anchor remain fixed. No hydraulic mechanism or unsupported machinery was added.

**Paint booth/lane:** preserved supported booth front dimensions and conservative hidden depth; adjusted booth/lane relative offsets and rounded door-window proportions. Estimated lane centre −0.922 and booth centre −1.198 are coherent with entrance centre about −1.3 in root coordinates. Rear-left opening is actual open geometry rather than a flat daylight placeholder; no unseen exterior building is added.

## Perspective and camera calibration

| Comparison | Approach | Native-frame RMS |
| --- | --- | --- |
| A / P10 exterior | Approximate full common-fascia/ground anchors; corrected initial signboard-edge mistake | 19.07 px |
| B / P11 lane/booth | Fixed shell/front dimensions; bounded camera fit plus booth/lane offsets | 9.03 px |
| C / P14 reception | Level standing-height view; door width, sill and rear ceiling/depth checked together | Manual proportional check |
| D / P12 frame/deck context | Shared two-view frame-spacing fit plus rigid camera | 11.35 px |
| E / P15 frame/booth context | Same shared geometry, separate rigid camera | 9.39 px |

These are approximate manually picked architectural controls, not exact registration, measured metres or independent proof of accuracy. P12 uses a 20 mm/36 mm sensor assumption and P15 about 28 mm. Camera-height bound contacts expose remaining scale/pose ambiguity. Rejected trials are documented: wrong facade edge, across-width frames, reverse camera behind the booth, and the poor 76.19-pixel constrained fit with inherited frame distances. No reference image was warped/cropped, and hidden booth geometry was not stretched to rescue a camera. Final poses/exposures are in `reference/evidence-final/camera-analysis.json`.

## Surfaces, material scale and recognition

Smaller unequal slab modules, narrow worn joints, restrained broad tonal variation and shared roughness maps replace the overly regular checker floor. An initial cloudy-floor trial was reduced after inspection. Corrugated wall ribs are narrower/vertical; roof ribs follow the slope. Office board scale is reduced. Painted steel/metal roughness varies subtly without random bending, damage or generalized grunge. Pale low wall areas are represented as flush inserts with thin jambs; exact opening construction remains estimated.

High-value retained details are the angular suspended fixtures, red frames, grey low wall divisions, long lane/yellow bay guides, reception counter/cabinet, glazing/red sill, connected mezzanine/rail/stair and distinctive cream/red booth. No hundreds of tools or decorative clutter. Architecture mode is sufficient; no temporary festival layer is needed. No identifiable people, photographed vehicles/plates, event banner or source-photo pixels are embedded.

## Confidence and remaining uncertainty

| Confidence | Areas |
| --- | --- |
| HIGH | Reference-era opening count, pitched/corrugated shed hierarchy, longitudinal frame direction, lane-to-booth topology, major red/cream/glass landmarks |
| MEDIUM | Relative facade/roof proportions, frame spacing, reception planes/depth, deck placement, stair side/orientation, booth width/offset, material module scale |
| LOW | Absolute survey dimensions, exact landing/width, hidden booth depth/interior, rear jamb width, exact low wall-panel type and hidden office details |

**BLOCKING MISSING REFERENCE: none for this documented configuration.** Absolute measurements and unseen booth depth are NON-BLOCKING ESTIMATES. Current facade-version selection is a future scope decision; P16 room remains omitted. `docs/TOLI-WORKSHOP-MISSING-PHOTOS.md` now lists optional accuracy upgrades, not a broad new photo request.

## Ten final validation renders and overlays

All ten **1000×750, 16-sample denoised Cycles** final renders were manually inspected after the last geometry correction. No DOF, bloom or fog hides errors; exterior exposure is restrained to retain the light fascia. Only view 10 deliberately removes roof/near wall as a labeled inspection cutaway.

| View | Inspection finding |
| --- | --- |
| `01-exterior.png` | Shorter fascia/shed silhouette, narrow left frontage and two main openings agree with the dated facade. Neutral sign artwork intentionally differs. |
| `02-entrance.png` | Corrected gate, lane transition and interior depth remain coherent; no pier crossing. |
| `03-central-lane.png` | Rear booth/lane offsets and anchored foreground post align with P11; shared shorter frame pairs preserve bay rhythm. |
| `04-reverse-central-lane.png` | P12 frame order, front reception/deck/stair topology recognizable; full-frame fit supersedes rejected obstructed and wide-camera trials. |
| `05-reception.png` | End-facing doorway, side glazing/stair, dado/sill, back counter/cabinet and white ceiling agree with P14; furniture reduced to major silhouettes. |
| `06-workshop-left.png` | Consistent booth/rear-left opening and floor scale; no fabricated hidden rear room. |
| `07-workshop-right.png` | Shared frame direction/span/spacing agree with P15; wall/roof scale coherent. |
| `08-paint-booth.png` | Cream surround/red leaves and rounded dark windows recognizable; hidden depth remains conservative. |
| `09-mezzanine.png` | Continuous red fascia, supports, glazing and external stair visually connected; exact landing remains estimated. |
| `10-wide-overview.png` | Labeled cutaway confirms coherent lane/bay/office/booth placement without disconnected additions. |

Final views: `tools/3d/toli-workshop/renders/evidence-final/`. Five full REFERENCE / MODEL / 50/50 OVERLAY sheets: `reference/evidence-final/comparisons/` (A exterior, B lane, C reception, D mezzanine context, E booth context). D/E use full contextual photographs; there is no matching unoccluded close-up for every inspection camera. Comparison metadata records uniform display resizing/padding and original/render hashes.

Open `reference/evidence-final/comparison.html` for the complete local review. `render-manifest.json` binds every view to the inspected source SHA.

## Visual quality decision

YES — convincing empty automotive-workshop architecture with credible material scale and connected construction.

YES — recognizable dated TOLI facade, longitudinal red frame sequence, reception/mezzanine/stair and rear booth/lane relationships beside the supplied references.

**Both answers are YES. VISUAL QUALITY = PASS.** The visible facade silhouette, corrected frame direction/spacing, reception/deck/stair junction, lane/booth relationships and believable architectural material scale now identify the same reference-era place. Differences from cluttered photos are deliberate omission of temporary contents/sign advertising and conservative hidden geometry. This is a manual visual decision, not a test-count or reprojection-score decision. The exact-source approval is in `reference/evidence-final/visual-gate.json`.

## Measured source and new GLB

| Measurement | Editable source | Actual v2 GLB |
| --- | ---: | ---: |
| Bytes | 6,691,383 | 4,076,400 |
| Triangles | 48,742 | 47,255 |
| Vertices | 28,718 | 88,459 |
| Meshes | 518 + 2 editable text | 18 |
| Shared materials | 18 | 18 |
| Texture images | 8 packed | 8 embedded |

v2: `tools/3d/toli-workshop/exports/toli-workshop-web-v2.glb`.
SHA-256: `b2461de9d4a12014e7cfbfaf692363f42a6bdf7018b75cd8e7bb7ec929f7dc98`.

Exported vertices include UV/normal seam duplication and are not directly comparable with editable mesh vertices. Source evaluated geometry increased about 5.45% from 46,222 triangles; no hundreds-of-thousands increase. No geometry decimation. The editable source retains 176 inherited degenerate triangulation artifacts from thin grille/text caps. Derivative-only cleanup removed 748 near-zero-area polygon faces at area threshold 1e-12 before batching; exported triangulation/unused data also resolve differently. Do not subtract these polygon counts directly from source triangles. Source architecture is unchanged by export.

Actual imported Blender bounds: min `[-8.279999732971191, -6.0, -0.23759998381137848]`, max `[8.279999732971191, 32.150001525878906, 6.4679999351501465]` in presentation units. Blender front −Y, rear +Y, up +Z; GLTF up +Y (front +Z/rear −Z). Main floor surface is Z=0; slab/apron underside intentionally extends below zero. Imported bounds exactly match source bounds, with no ground/scale drift.

Independent actual-file validation: GLB header/chunks, finite attributes/transforms, unit normals, valid indices, internal image resources, successful texture decoding and Blender reimport all PASS. 18 primitives/material batches, one BLEND glass material; remaining materials OPAQUE. Materials are double-sided. Eight embedded maps: five 1K and three 512; approximately 23 MiB decoded RGBA8 / 30.67 MiB with estimated mipmaps, not measured GPU use. JPEG quality 92 only for color maps; normal/roughness remain lossless. No exported live lights/cameras or compression decoder.

Actual v2 was rendered from lane/reception cameras after removing source geometry and importing the GLB into the same validation light/world rig. Both 24-sample round-trip renders were inspected: geometry/material assignment, normals, texture scale and glass transparency retained; PASS. `exports/v2-validation.json` and `v2-export-provenance.json` contain exact measurements/hashes. Old GLB remains 2,734,096 bytes /43,954 triangles/67,397 exported vertices with its original hash.

## Website protection and regression

All **315 protected website files unchanged** against the pre-task hash manifest, including Hero, Navbar, navbar car, logos, hero cars and asset loading. All 16 source photographs unchanged. Existing unrelated working-tree changes are preserved; this does not claim a clean Git checkout.

Production integration: **NO**. Development website activation: **NO**. No workshop import, Hero preload, app code, CSS, configuration or public production asset changed by this pass. No new browser/performance claim is made. Physical-device loading, rendering cost and transparent-material behavior remain the next isolated integration task.

Fresh post-model checks:

| Check | Result | Seconds |
| --- | --- | ---: |
| Production build | PASS | 19.41 |
| TypeScript app | PASS | 15.55 |
| TypeScript node | PASS | 1.75 |
| Lint | PASS | 8.79 |
| Complete tests | PASS | 46.49 |

Tests: **340 passing across 46 files**. No weakened/deleted tests. Logs and exact exit codes: `reference/evidence-final/regression*.log` / `regression.json`.

The Blender 4.5.3 runtime was restored from the official download after the user explicitly approved that network exception. Runtime archive checksum was verified. Workshop files/photos were processed locally and not uploaded.

## Next scope

Ready for **ISOLATED WEBSITE INTEGRATION + PERFORMANCE VALIDATION** as a separate authorized task. Do not automatically activate v2, alter Hero/Navbar or treat this visual/asset result as production performance approval.

VISUAL QUALITY = PASS
READY FOR ISOLATED WEBSITE INTEGRATION
