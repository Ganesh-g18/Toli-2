# TOLI MOTORS — ORIGINAL 3D CAR REPORT

18 October 2026.

**Result: original GLB candidate created and rendered, but NOT activated. Visual quality FAIL against the requested premium target.** The brief explicitly says not to force a visibly inadequate model into production. Integration remains incomplete; this report does not claim the requested final acceptance was achieved.

## Model

- Name: TOLI Atelier Sportback (candidate).
- Vehicle type: original unbranded four-door sports sedan / sportback.
- Creation method: offline authored parametric surface modeling and GLB export using the installed Three.js library. The existing runtime procedural vehicle was not reused or exported as this asset.
- Original/unbranded: yes; no downloaded model, manufacturer badge, paid API, external texture or manufacturer tracing.
- Source script: `tools/3d/generate-toli-sportback.mjs`.
- GLB: `public/models/toli-sportback/toli-atelier-sportback.glb`.
- License/ownership status: newly authored project source/geometry delivered for TOLI project use; no third-party asset licensing dependency. Existing Three.js code/tooling licensing remains applicable to that tooling.
- Local tooling audit: `blender` was not found on PATH or standard inspected binary locations. Python `bpy`, `trimesh`, `numpy`, `scipy` and `pygltflib` were unavailable. Installed Node/Three.js/GLTFExporter provided a working offline model-creation route. No installation or paid service was needed. Lack of Blender is not claimed to make premium modeling impossible; the actual generated result simply did not meet the quality gate.

## Geometry

Actual final exporter audit, independently checked by parsing the binary in the test:

- Triangles: **143,780**.
- Meshes: **56**, reduced from 279 through assembly-local material batching.
- Materials: **12**.
- Bounding box: minimum `[-2.4820621, 0.000000006, -1.1050000]`, maximum `[2.4820621, 1.5053999, 1.1050000]`.
- Dimensions including mirrors: **4.9641 × 1.5054 × 2.2100 metres** (X length / Y height / Z width).
- Origin/orientation: Y up, +X front, tires on Y=0 within floating-point tolerance; predictable authored scale.
- Hierarchy: VehicleRoot contains Body, Glass, Interior, Hood, Door_L, Door_R, Mirror_L, Mirror_R, four Wheel groups, four Brake groups, two Headlight groups, two Taillight groups and Underhood.
- Wheels: four distinct assemblies, thick lathed tire sections, tread channels, rim barrel/lip, original swept split spokes, hubs and bolts.
- Brakes: discs, rotor details and separate stationary red calipers.
- Glass: separate windshield/rear glass, side glass and window trim/pillars.
- Interior: simplified seats/head restraints, rear seating, dashboard, console and steering silhouette.
- Lights: original neutral front lenses and restrained red rear lenses.

The body uses longitudinal lofts, crowned hood/deck surfaces, actual wheel-opening cutouts and separate panels. This establishes dimensional geometry, not premium visual quality. The current model still has overly plain/slab-like body sides and fascia and insufficiently resolved transitions/detail.

## Materials

- Body: graphite metallic physical material, metalness .72, roughness .27, clearcoat .9, clearcoat roughness .16.
- Glass: smoked blue-grey, restrained roughness .23, transparency .66 opacity.
- Tires: dark rubber, metalness 0, roughness .94.
- Wheels: machined silver plus graphite alloy, metallic materials.
- Brakes: rough steel discs and restrained TOLI red calipers.
- Lights: modest neutral-white and red emissive lens materials.

The isolated QA viewer supplies neutral environment/key illumination and red rim lighting. That viewer is not the existing website studio. No claim is made that the candidate's materials have passed the existing scene's lighting or theme review.

## Optimization

- GLB size: **2,987,876 bytes** (approximately 2.85 MiB).
- Textures: **0**; no 8K textures or external image dependencies.
- Compression: no Draco/Meshopt extension; indexed geometry and material-local batching. Intermediate nonindexed batching increased size to 9,052,036 bytes, so vertex reindexing was applied rather than retaining that regression.
- Runtime impact: **no application import, registry activation or normal-page GLB fetch introduced**. No runtime application files changed. The static asset is copied to production output because it lives under public/models, adding 2,987,876 bytes to deployment storage; it is not part of initial application JS.
- Below-fold mobile memory/frame/GPU impact: UNVERIFIED. The model is not production-approved.

## Website Integration

- Services: NOT activated.
- Component Experience: NOT activated.
- Shared renderer: existing single-renderer architecture inspected and left unchanged.
- Loading strategy: existing below-fold lazy scene loader retained; candidate absent from normal runtime path.
- Caching: existing scene instance retention audited; no new GLB cache added for a rejected candidate.
- Offscreen rendering: existing scene behavior unchanged.
- Fallback: existing fallback remains; no new downgrade/upgrade flash introduced.
- Reduced motion: current application behavior unchanged. New-model reduced-motion integration is NOT implemented.
- No vehicle was placed in Gallery, Service Request, TOLI AI, Hero or Navbar.

The correct future integration point remains the existing `loadVehicleModel` → `adaptVehicleModel` path inside `vehicle-scene.ts`. The adapter requires exact real node/hinge/material mappings; the current asset is deliberately not labeled reviewed to bypass that gate. Its existing scene/provider should be reused after visual refinement, with front-door/hood/mirror pivots validated and GLB load/caching success/failure regressions added then. Those unimplemented integration tests are not replaced by mocked claims.

## Hero Protection

Hero files modified: **NONE**.

Hero assets modified: **NO**.

Hero behavior changed: **NO**.

Recorded SHA-256 hashes before work for Hero-related source/assets, Navbar/logo-related source/assets, Gallery, Service Request, TOLI AI and CSS. Rechecked **77 protected files: zero changes**. Baseline record: `docs/original-car/protected-files.sha256.json`. Hero DOM source, CSS, image sources/priority and interactions were not edited. No new model initializer was attached to Hero.

## Navbar Protection

Navbar files modified: **NONE**.

Navbar car modified: **NO**.

Navbar behavior changed: **NO**.

Logo pill, center identity, HELP+, theme control, booking and menu source/assets remain unchanged, verified by the same hashes. There are zero modifications to application runtime source in this task.

## Responsive

The candidate was inspected in a separate 1280 × 720 asset viewer. The quality rejection stops production activation; the requested live-model responsive matrix is therefore honestly unverified:

| Width | New-model website integration |
| --- | --- |
| 1920 | UNVERIFIED |
| 1600 | UNVERIFIED |
| 1440 | UNVERIFIED |
| 1366 | UNVERIFIED |
| 1280 | UNVERIFIED (asset viewer inspected, not integrated stage) |
| 1024 | UNVERIFIED |
| 768 | UNVERIFIED |
| 430 | UNVERIFIED |
| 412 | UNVERIFIED |
| 390 | UNVERIFIED |
| 360 | UNVERIFIED |
| 320 | UNVERIFIED |

Existing website responsive code was not modified. No physical-mobile or touch performance approval is claimed.

## Validation

- GLB validation: PASS for actual Three.js GLTFLoader binary parse, expected named assemblies, finite positions, metric bounds, four wheel ground-contact bounds, measured mesh/material/triangle/file counts. No Khronos validator executable was available/run; full glTF conformance certification is UNVERIFIED.
- Browser load: PASS in isolated authoring viewer; front ¾, side and rear ¾ rendered. Captured browser error log was empty in that session.
- Build: PASS (production Vite build; final details recorded below).
- TypeScript: PASS.
- Lint: PASS.
- Tests: PASS — **317 tests / 44 files**, 51.29 seconds. Command: `npm test -- --maxWorkers=2 --testTimeout=20000 --hookTimeout=20000`.
- Final production build: `npm run build` — PASS, 11.50 seconds.
- TypeScript command: `node node_modules/typescript/bin/tsc -b`; lint command: `npm run lint` — both PASS.
- Focused binary validation: `node node_modules/vitest/vitest.mjs run src/test/original-sportback-asset.test.ts` — 2 tests PASS.
- Existing Browserslist/Tailwind/large lazy-chunk warnings remain; test harness emits existing jsdom/React diagnostics. No warning suppression was added.
- Test additions verify actual generated binary and that a rejected candidate remains inactive. They do not pretend to prove realism or integration.
- No existing test was removed or rewritten to get this candidate accepted.

## Visual Quality

| View / property | Result |
| --- | --- |
| Front ¾ | FAIL premium target: fascia and front volume remain too simple |
| Side | FAIL premium target: broad planar doors and wheel-arch transitions need refinement |
| Rear ¾ | FAIL premium target: rear fascia lacks believable production detail |
| Materials | Rendered, but premium acceptance FAIL with current surfacing |
| Ground contact | Geometric PASS at Y=0; convincing studio contact shadow UNVERIFIED |
| Lighting | QA viewer rendered; existing website integration UNVERIFIED |
| Overall | **FAIL — do not activate** |

![Front three-quarter candidate](original-car/toli-sportback-front.jpg)

![Side candidate](original-car/toli-sportback-side.jpg)

![Rear three-quarter candidate](original-car/toli-sportback-rear.jpg)

Required further work is automotive surface/fascia refinement, cleaner panel/arch transitions, believable optical assemblies and a stronger contact-shadow presentation. The generated candidate is useful reproducible authoring work, not a claimed professional replacement. Integration and final responsive/performance acceptance remain incomplete.

## Files Created

- `tools/3d/generate-toli-sportback.mjs` — offline original geometry/material authoring and reproducible GLB export.
- `tools/3d/preview.html` — isolated developer asset viewer, not an application route.
- `public/models/toli-sportback/toli-atelier-sportback.glb` — inactive candidate asset.
- `public/models/toli-sportback/toli-atelier-sportback.audit.json` — measured output statistics/bounds.
- `public/models/toli-sportback/README.md` — source, provenance, hierarchy, build instructions and rejection gate.
- `public/models/toli-sportback/review-status.json` — explicit candidate-not-approved / productionEnabled false.
- `src/test/original-sportback-asset.test.ts` — real binary validation and inactive-candidate protection.
- `docs/original-car/protected-files.sha256.json` — pre-change protected file hashes.
- `docs/original-car/toli-sportback-front.jpg` — actual browser render.
- `docs/original-car/toli-sportback-side.jpg` — actual browser render.
- `docs/original-car/toli-sportback-rear.jpg` — actual browser render.
- `docs/ORIGINAL-3D-CAR-REPORT.md` — this report.

## Files Modified

**No pre-existing application source, CSS, image, registry, loader or scene file modified.** Existing project changes from earlier work were preserved. Production build outputs and TypeScript incremental build-info files are regenerated by the requested checks.
