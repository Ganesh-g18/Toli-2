# TOLI MOTORS — 3D CAR QUALITY REFINEMENT REPORT

18 October 2026. Same original TOLI Atelier Sportback source pipeline; no downloaded vehicle, paid service or manufacturer geometry.

**Activation decision: NOT ACTIVATED.** Seven model revisions were generated and rendered. The result is improved, but the premium realistic visual gate still fails. The requested production-quality endpoint remains incomplete. No registry flag, scene integration or quality test was changed to force acceptance.

The previous report is retained at `docs/original-car/PREVIOUS-CANDIDATE-REPORT.md`, its original renders remain in `docs/original-car/`, and its source snapshot is in `tools/3d/archive/generate-toli-sportback-v1.mjs`.

## Previous Candidate

The existing report, generation source, actual GLB, prior three-angle renders and shared renderer/loader/registry architecture were inspected first.

The main model defects were almost flat end fascias, razor-like hood/fender joins, body-width shaping parameterized relative to the wheel-cutout boundary (which pinched reflections), zero-thickness spoke surfaces, a bright disc-dominated wheel face, rectangular lamp overlays, very thin pillars and glass with a milky appearance.

The rendering defects were independent: the bright floor, oversized red influence, high/distant camera and lack of contact/cast shadows made it harder to read physical volume. Changing studio lighting alone would not have fixed the fascia or surface geometry.

### Defect classification

| Area | Previous weakness | Refinement / remaining observation |
| --- | --- | --- |
| Silhouette | Box-like lower body and weak end transitions | Rounded shoulders, tapered end volumes; overall still too generic/stylized for approval |
| Proportions | Long straight flanks, insufficient distinction at ends | Original 2.86m wheelbase retained, ends reshaped; front/rear mass distribution needs further design refinement |
| Body surface | Wheel openings compressed the surface field | Width now evaluated at physical height; shoulder gets denser/nonuniform sampling |
| Front fascia | Flat rectangle, sticker-like elements | Compound curved skin with actual optical/intake openings and recessed assemblies; face still lacks convincing production sophistication |
| Rear design | Repeated front grille treatment | Separate rear plate recess, diffuser, hatch boundary and rear optical treatment |
| Roofline | Greenhouse did not merge convincingly into body | Wider C-/A-pillar surfaces; overall roof-to-quarter flow still needs refinement |
| Windows | Too broad/milky with weak framing | Smaller rear side glass, dielectric smoked material and differentiated reflection strength |
| Pillars | Tubes suggested wire framing | Painted A-/C-pillar surfaces and flat B-pillar strip added |
| Wheel arches | Trim did not follow the exact cutout | Trim/inner liners follow the same lower-boundary function; highlight/edge refinement still needed |
| Wheels | Thin radial surfaces over a bright disc | Beveled extruded split spokes, rim barrel and hub; metal separation is clearer |
| Tires | Sparse/angular cross-section | Denser rounded shoulder and sidewall profile, retained tread channels |
| Brakes | Disc dominated wheel visually | Smaller, darker/rougher rotor; dimensional beveled red caliper |
| Lights | Glowing rectangles | Recessed shaped housing, projector volumes, restrained curved light guide and seal; not approved as finished production optics |
| Mirrors | Floating capsule impression | Two-tone tapered superelliptic housing, stalk retained; mirror face/attachment still needs refinement |
| Interior | Simplified cushion/headrest forms | Existing lightweight seats/dash/console retained; no claim of a detailed realistic cabin |
| Panel details | Gaps and highlight breaks | Existing independent panel hierarchy retained; subtle seams remain, with visible reflection unevenness at some boundaries |
| Materials | Similar-looking finishes, overbright glass/discs | Graphite clearcoat, rubber, glazing, steel, alloy and trim remain distinct |
| Normals | Separate panel recomputation caused discontinuities | Parametric derivative normals preserved through batching/export; numerical validation passes, but does not prove reflection continuity |
| Reflections | Harsh square hotspot and broken highlights | Long softbox environment cards and roughness tuning; residual highlight waviness remains a visual blocker |
| Ground contact | No convincing contact in first studio | Four tire contact falloffs plus real cast shadow; measured tire minima remain Y≈0 |
| Camera | High/distant view weakened volume | 34° lens, front camera approximately 34° around the car, lower eye height and larger framing |
| Lighting | Bright/red floor overpowered body | Neutral key/fill, reduced red influence, dark floor and softer VSM cast shadows |

## Refinement

**Silhouette / Body:** same longitudinal station/surface pipeline. Width is now a function of absolute body height; the wheel-cutout parameter no longer distorts the body shaping. Rounded shoulder/tuck and end-plane curvature replace the sharp slab transitions. The fascia mesh is triangulated around real holes and adaptively tessellated in its parameter domain to reduce long flat diagonals. Extra samples are concentrated toward the shoulder rather than uniformly subdividing the whole asset.

**Front / Rear:** removed the old rectangular overlays and repeated front/rear grille. Added compound fascia surfaces with actual openings. The front has a tapered low radiator aperture, guide vanes, side air channels and shaped optical recesses; rear has its own diffuser/plate recess/hatch boundary. Light housings and guides conform to the fascia field. A rendered clearance defect at the upper front optics was corrected by revising the nose-height stations.

**Windows / Pillars:** retained the practical sportback greenhouse, narrowed rear side glass and added structural A-/C-pillar surfaces. B-pillars are flat strips rather than round rods. Glazing is smoked, dielectric, partially transparent and less reflective than the paint.

**Wheels / Tires / Brakes:** replaced flat spoke patches with beveled extruded split spokes. Rounded the tire section with more profile stations, retained actual sidewall/tread volume, reduced rotor radius/brightness and replaced capsule calipers with beveled dimensional forms. All four wheel groups remain distinct.

**Interior:** lightweight existing seats, rear seating, dashboard, steering silhouette and console retained. It still shows simplified forms from close/opposite-side views; interior realism is not claimed as complete.

**Mirrors / Lights:** two-tone mirror shell and existing mounting stalk; optical housings, projector volumes and curved light guides. These are geometric improvements, not a passed quality certification.

**Materials / Normals:** gunmetal paint now has metalness .65, roughness .27, clearcoat .9 and clearcoat roughness .22. Rubber remains metalness 0 / roughness .94. Glass opacity .75, metalness 0 and lower environment intensity; alloy and rotor have distinct metal/roughness values. Parametric normals are calculated from surface derivatives and retained through material batching. The actual parsed GLB is checked for finite, approximately unit-length normals.

### Render-led iteration log

1. Rounded body shoulder/tuck/end volumes; physical-height surfacing; exact cutout/liner alignment. Render showed a better silhouette but an unfinished face and excessive studio red.
2. Dimensional spokes/calipers/profiled tires, distinct front/rear assemblies, shaped optics and moderated studio red. Render exposed wheel-disc dominance and seam-highlight issues.
3. Preserved parametric normals, stronger pillars, darker rotor, differentiated glass/paint and undertray. Front and side views inspected.
4. Actual pierced fascia skins and recessed optical/intake assemblies. Front/rear inspected; long triangulation diagonals were visible.
5. Adaptive fascia tessellation, two-tone mirror shells and VSM floor shadows. Render revealed that upper front optic openings crossed the original fascia boundary.
6. Corrected the nose stations/optical clearance; rendered front, side and rear.
7. Removed the artificial narrow shoulder bump, concentrated body sampling near the shoulder and moderated clearcoat sharpness. Final three-angle, stepped rotation and mobile renders inspected.

This is seven controlled revisions of the existing script, not seven independently claimed quality passes. No high-quality result was decimated away: source surfaces remain reproducible before batching; no lossy geometry compression or LOD reduction was applied.

## Actual Asset Metrics

Final GLB: `public/models/toli-sportback/toli-atelier-sportback.glb`.

| Metric | Previous candidate | Current refinement |
| --- | ---: | ---: |
| File size | 2,987,876 bytes | **4,268,888 bytes** |
| Triangles | 143,780 | **192,105** |
| Summed mesh vertices | not previously reported | **125,334** |
| Meshes | 56 | **58** |
| Materials | 12 | **12** |
| Textures | 0 | **0** |

Bounds: minimum `[-2.4532747, 0.000000006, -1.1048224]`; maximum `[2.4170456, 1.5053999, 1.1048224]`. Dimensions including mirrors: **4.8703m long × 1.5054m high × 2.2096m wide**. Y up, +X front, authored in metres. Tire minima remain approximately Y=0. The changed length reflects rounded end volumes rather than a random runtime transform.

Hierarchy remains VehicleRoot → Body / Glass / Interior / Hood / Door_L / Door_R / Mirror_L / Mirror_R / four Wheel_* / four Brake_* / Headlight_* / Taillight_* / Underhood. Named groups stay targetable after material-local batching.

The size increase is real. No claim is made that this is already an efficient mobile production budget. There are no added application imports, scene initializers, model requests or cloud services. Candidate files under public/models add deployment storage, not initial JS execution. Normal homepage/Hero initialization is unchanged by source inspection and protected-file hashes; a new network waterfall was not captured in this phase.

## Validation Renders

Actual in-app browser renders from the isolated Vite authoring viewer, not mockups:

| View | Gate result | Observation |
| --- | --- | --- |
| Front 3/4 | **FAIL premium acceptance** | More dimensional face, wheels and shoulders, but frontal mass/fascia still looks too stylized and unresolved |
| Side | **FAIL premium acceptance** | Better pillars/wheel depth and cleaner line; long flanks remain too plain and reflection flow is uneven in places |
| Rear 3/4 | **FAIL premium acceptance** | Dedicated rear design and shaped optics, but hatch/quarter/fascia relationships are not yet convincing enough |
| Materials | **FAIL overall visual gate** | Correctly differentiated PBR properties, yet those properties do not make the underlying body production quality |
| Ground contact | Geometric/visible contact established | Tires meet the floor; contact falloffs and cast shadow visible; final photoreal studio acceptance not asserted |

![Refined front](original-car/refinement/toli-refine-front.jpg)

![Refined side](original-car/refinement/toli-refine-side.jpg)

![Refined rear](original-car/refinement/toli-refine-rear.jpg)

Earlier revision evidence: `docs/original-car/refinement/toli-refine-pass1.jpg` through `toli-refine-pass5.jpg`. Final stepped rotation evidence: `toli-refine-turn-1.jpg` through `toli-refine-turn-8.jpg`.

## Website Preview

**Not attempted in the production shared scene because the standalone gate still fails.** This follows the brief's ordering; no reviewed flag was forged to bypass that gate.

- Shared renderer: existing architecture inspected; unchanged, no second application canvas added.
- Camera: independent authoring studio uses 34° field of view, lower front/rear three-quarter cameras and a side camera. Production camera remains unchanged.
- Lighting: independent PMREM softbox cards, neutral key/fill, restrained red rim/environment, dark floor. Production lighting remains unchanged.
- Ground contact: numerical GLB bounds plus visible tire shadows checked in the studio; production integration UNVERIFIED.
- 360: eight stepped 45° increments inspected in the studio, including opposite side/front/rear. No missing whole assembly observed. Opposite-side views still reveal simplified mirror/interior forms and uneven highlight flow. This is not a passed production 360 interaction test.
- Mobile: standalone front views inspected at **430, 390 and 360 × 844**. Complete car remains framed and readable. Mobile production stage, touch rotation, GPU budget and fallback behavior remain **UNVERIFIED** because the candidate is inactive.
- Reduced motion / caching / fallback: production behavior unchanged. New-model integration acceptance remains unimplemented.

## Activation Decision

# NOT ACTIVATED

GLB parsing, dimensional checks and automated validation pass; the critical visual gates do not. `ACTIVE_VEHICLE_MODEL` remains null, registry acquisition slots remain unchanged, and `review-status.json` explicitly records candidate-not-approved / productionEnabled false.

The remaining work is automotive design/surface refinement rather than another validity fix: rebalance and sculpt the front/rear forms, improve continuous highlight flow at panel transitions, refine the wheel-arch lip/greenhouse-to-quarter relationship, and improve mirror/optical assembly finish. The current rendering is not being hidden by darkness or declared premium because it has more triangles.

Only after those renders genuinely pass should the exact hierarchy/pivots/material roles be mapped to the existing loader/adapter, tested privately in the existing below-fold shared renderer, profiled, and considered for activation. Production integration remains incomplete.

## Hero Protection

Hero modified: **NO**.

Hero cars modified: **NO**.

Hero behavior changed: **NO**.

No Hero source, CSS, image, lighting, text, dimensions, loading priority or interactions were edited. The recorded protected-file hashes still match.

## Navbar Protection

Navbar modified: **NO**.

Navbar car modified: **NO**.

Navbar behavior changed: **NO**.

Logo pill, center identity, HELP+, theme toggle, booking and menu remain unchanged. **77 protected source/assets/CSS files checked; zero differences.** Gallery, Service Request and TOLI AI were also preserved.

## Validation

Baseline before refinement: **317 passing tests**. No existing test deleted or disabled.

- GLB: actual binary parsed by Three.js GLTFLoader; named assemblies, finite positions, bounds, tire contact and measured counts checked. Numerical normal validity and PBR material separation now have a focused regression. No test claims to establish visual quality.
- Build: **PASS** — `npm run build`, 9.45 seconds.
- TypeScript: **PASS** — `node node_modules/typescript/bin/tsc -b`.
- Lint: **PASS** — `npm run lint`.
- Tests: **PASS — 318 tests / 44 files**, 50.32 seconds; `npm test -- --maxWorkers=2 --testTimeout=20000 --hookTimeout=20000`. The original 317 are retained plus one numerical shading/material regression.
- Browser: actual model renders inspected at 1280 × 720, all eight stepped rotation views, and 430/390/360 × 844. Captured asset-viewer error log was empty in the inspection session.
- Existing build warnings about Browserslist/Tailwind/large lazy chunk and existing jsdom/React test diagnostics remain; no warnings or tests were suppressed.

## Files Changed

- `tools/3d/generate-toli-sportback.mjs` — same pipeline refined: body/normal field, fascia topology, wheels, pillars, mirrors, materials and vertex audit.
- `tools/3d/preview.html` — isolated studio lighting, framing, shadows, responsive controls and stepped rotation. This is developer tooling, not an application route.
- `public/models/toli-sportback/toli-atelier-sportback.glb` — regenerated inactive candidate.
- `public/models/toli-sportback/toli-atelier-sportback.audit.json` — actual regenerated metrics, including vertex count.
- `public/models/toli-sportback/review-status.json` — current rejection reason/revision, activation still false.
- `public/models/toli-sportback/README.md` — current provenance, geometry, generation instructions and inactive status.
- `src/test/original-sportback-asset.test.ts` — retained original two tests; added actual GLB normal/material regression.
- `docs/ORIGINAL-3D-CAR-REPORT.md` — this refinement report.

Created: `tools/3d/archive/generate-toli-sportback-v1.mjs`, its archive README, `docs/original-car/PREVIOUS-CANDIDATE-REPORT.md`, and actual renders under `docs/original-car/refinement/` (front/side/rear, pass1–5, turn1–8, mobile430/390/360).

No application runtime source, Hero/Navbar, registry, loader, scene, Gallery, Service Request or AI files modified. Build outputs and incremental TypeScript build-info files were regenerated by validation.
