# TOLI MOTORS — TEMPORARY 3D VEHICLE IMPLEMENTATION

Implementation date: 2026-10-18. **Actual original GLB visibly rendered below Hero: YES.**

This temporary integration is explicitly authorized by the user's change of direction. It does **not** reverse the previous professional visual-quality failures. Internal status: **PRE-PRODUCTION**. Professional replacement remains recommended, not a blocker for this task. No acquisition search, licensing audit or modeling revision was performed.

## Selected Model

Source: retained revision 7, `tools/3d/generate-toli-sportback.mjs` and `public/models/toli-sportback/toli-atelier-sportback.glb`.

Why selected: the saved R7/R8 front/side/rear comparison shows R7 has fewer fascia/leading-edge pinches than R8. Both have wheels, glazing, lights, interior and materials; R7 is the better complete presentation. The control-cage M1-B remains an unfinished body with reference wheel envelopes and inferior overall readiness. The older inline executive sedan is simpler and lacks the retained asset's complete semantic hierarchy. Newest was not automatically selected. Existing comparison and failed-study renders remain unchanged.

Status: **PRE-PRODUCTION** in the registry. No customer-facing prototype/failure/asset-status text was added. Original/unbranded illustrative project vehicle; no manufacturer representation or diagnostic claim.

## Export

A separate, byte-identical temporary web copy was created; no source or previous GLB was regenerated or overwritten.

| Metric | Measured value |
|---|---:|
| GLB path | `public/models/vehicles/toli-preproduction-sedan.glb` |
| File size | 4,268,888 bytes |
| Triangles | 192,105 |
| Vertices (summed mesh positions) | 125,334 |
| Meshes | 58 |
| Materials | 12 |
| Textures | 0 |
| Source bounds | 4.8703 × 1.5054 × 2.2096 m |
| Ground | Tire minimum Y ≈ 0 |
| Orientation | +X forward, +Y up |
| SHA256 | `48d75e3d6643100001fec28def90c96dc4ffe0d120bb7696fc83a1c6903c554c` |

The actual GLB is parsed/adapted in tests. Finite shading/geometry, dimensions, four wheels, materials and exact mapped node existence are verified. Source and copy checksum equality is tested without a large byte-array matcher.

## Website Integration

Component Experience: **ACTIVE**, real imported asset. Services: selection functionality preserved; the service/component experience uses the same existing scene. The service-choice list itself stays intact rather than receiving a second canvas. Journey and booking docks also reuse that canvas through the established timeline.

Shared renderer: one existing `createVehicleScene` / WebGLRenderer, moved between inline below-fold docks. No new permanent renderer or scene framework.

Lazy loading: Hero frames are explicitly excluded from scene initialization and the near observer excludes Hero docks. Existing delayed scene import and viewport approach remain. GLB fetch starts when the eligible below-fold stage becomes active, not merely because the homepage opens.

Caching: one retained GLTF template promise per URL, including failed promises. Download/parse reused across repeated visits and remounts. Each scene receives independent cloned geometry/material resources so scene disposal cannot destroy cached template geometry/materials. Current asset has zero texture files. This small page-lifetime cache intentionally remains until page unload; it is not an infinite retry mechanism.

Components: exact real wheel/brake paths are recorded. Existing actual door/hood/mirror nodes are resolved by the adapter. Component selection keeps the complete imported car rather than inventing exploded battery geometry or fake mesh mappings. No new health percentages, fault codes or diagnostic data.

## Visual Presentation

Camera: low front three-quarter with a roughly 30° view direction and 34° vertical FOV. Every frame fits all eight corners of the actual rotated model bounds with padding, so manual rotation and narrow screens retain bumpers/wheels. Imported-model camera ignores the old component explosion/focus zoom.

Lighting: retained neutral/silver studio key, graphite fill, restrained red rim/environment and existing dark/light theme response. Body remains graphite; wheels, rubber, brake metal, calipers, glazing, lenses and interior retain distinct materials. Existing adapter adds environment/clearcoat tuning; no body redesign.

Floor: existing contact falloff shadows and faint shared-geometry reflection. Tire shadow positions update from real imported wheel contacts. No second rendering pass or renderer. The established section background provides the floor environment.

Interaction: horizontal mouse/touch vehicle rotation; no continuous auto-spin. Existing six-pixel intent threshold, vertical-gesture cancellation and `touch-action: pan-y` preserve page scrolling. Side and rear-quarter views were inspected through real pointer rotation. Rotation settles to idle.

Wide desktop stage: new CSS is scoped only to `.component-chapter .journey-dock-services`, with a 350–490 px stage above 1024 px. Mobile dimensions are unchanged. No shared Hero/Nav CSS was edited.

## Network Validation

Real browser inspection of the production build used a temporary local HTTP recording proxy; its GLB request log is retained in [evidence](original-car/preproduction-integration/).

- Initial Hero: **0 temporary GLB requests**, 0 below-fold canvases.
- Near Component Experience: **1 GET** to `/Toli-2/models/vehicles/toli-preproduction-sedan.glb`; actual loaded geometry rendered.
- Return trips through component/Journey/booking/Gallery and viewport/theme changes: **no additional GLB requests** in that page session.
- Normal path: **no GLB 404 or loader error**.
- Controlled missing-asset fixture: exactly **1 deliberate 404**, fallback visible, 0 remaining canvas, no retry loop. This test failure is separate from the successful normal path.

No browser automation package/browser was installed. An optional separate headless QA attempt could not start because its browser binary was unavailable; actual verification used the existing in-app browser instead. Temporary proxy/test servers are QA infrastructure, not production source or additional WebGL renderers.

## Performance

DPR: existing cap 1.5 desktop / 1 tablet-mobile. Save Data lowers cost. No unsupported device-class benchmarks are claimed.

Offscreen rendering: existing timeline pauses the scene at Gallery/reading content; `data-rendering=paused` inspected. Service Request opening pauses it and adds no canvas to the dialog. Returning resumes the same canvas.

Render loop: demand-driven; settles to `idle` after changes/rotation. Reduced motion keeps actual GLB geometry and settles immediately. Controlled reduced-motion evidence used the unchanged production app with its JS `matchMedia` signal forced by a temporary HTTP fixture; native OS/CSS preference switching was not emulated. Existing reduced-motion/lifecycle tests remain passing.

Cleanup: renderer, scene clones, observers, listeners, frames, contact textures and transient floor resources retain existing disposal paths. Late model arrival after teardown disposes its clone. Genuine GLB failure calls the existing fallback/teardown path. Cache-owned template buffers are not disposed by an active scene. No unmounted update or console spam observed in the normal browser session.

## Responsive

Actual browser layout snapshots were captured at all requested widths, with complete vehicle framing and no horizontal page overflow. Desktop stage enlargement was additionally checked on the final build. See `responsive.json` and `component-*.jpg` in the evidence directory.

| Width | Actual 3D | Complete car / overflow |
|---:|---|---|
| 1920 | YES | Fits / none |
| 1600 | YES | Fits / none |
| 1440 | YES | Fits / none |
| 1366 | YES | Fits / none |
| 1280 | YES | Fits / none |
| 1024 | YES | Fits / none |
| 768 | YES | Fits / none |
| 430 | YES | Fits / none |
| 412 | YES | Fits / none |
| 390 | YES | Fits / none |
| 360 | YES | Fits / none |
| 320 | YES | Fits / none |

These are browser viewport checks, not a physical-device performance certification. Eligible small screens retain 3D. The pre-existing explicit severe low-resource hardware fallback remains; width or reduced motion alone does not select it.

## Hero Protection

Files modified: **NONE**. Visual changes: **NO**. Hero cars: **UNCHANGED**. Height, lighting, assets, loading strategy, controls and responsive rules: unchanged. Before/after source and asset hashes match; actual Hero appearance inspected and initial GLB absence recorded. No model is presented in Hero by the shared provider.

## Navbar Protection

Files modified: **NONE**. Visual changes: **NO**. Navbar car, animation, logo pill, HELP+, theme toggle, Book Service and MENU+: **UNCHANGED**. Actual Book Service opened the existing popup successfully.

## Other Systems

Gallery: **UNCHANGED**, lightbox opens above page; WebGL paused and does not cover Gallery.

Service Request: **UNCHANGED**, actual popup inspected; no WebGL canvas inside it. Draft/submission/routing regression coverage remains passing.

TOLI AI: **UNCHANGED**, launcher/panel remains above the inline scene. Trust, Footer, Services and stacked-scroll architecture unchanged. All nine service options remain available. No messages or form submissions were sent during QA.

Fresh protection verification: **77 protected website files unchanged**, **6 old prototype/reference hashes unchanged**, plus the saved failed Blender source unchanged. Generated `dist` was rebuilt; prior source assets/renders/reports were preserved.

## Validation

Production build: **PASS**.
TypeScript (`tsc -b`): **PASS**.
Lint: **PASS**.
Full tests: **322 PASS / 45 files**.
Starting baseline: **318**. Final count: **322**.

No valid test was deleted. Tests forbidding any activation were intentionally updated for the explicit temporary override, preserving Hero/Nav exclusions and missing-class checks. Four focused tests cover the real separate GLB/mappings, exact copy checksum, one-download cache/resource ownership, cached failure/no retry, base URL and Hero/Nav isolation. Existing shared-renderer, reduced-motion, services, Gallery, Service Request, AI and lifecycle tests continue to pass.

A first large-file matcher was replaced with SHA256 comparison after excessive runtime. Earlier interrupted validation runs were not counted as final results. Final build/test logs are retained with evidence. Existing tooling warnings about Tailwind class ambiguity, chunk size, React Router flags and test `act`/localStorage behavior remain; the normal production browser console had no errors/warnings observed.

## Visual Verification

**Was the actual 3D car visibly rendered in the website? YES.** Actual website screenshots include front three-quarter, rotated side/rear-quarter, both themes, mobile widths, modal/Gallery isolation and controlled fallback/reduced motion. This establishes correct temporary integration; it does not establish professional automotive source quality.

## Production Quality Status

**PRE-PRODUCTION.** Professional replacement still recommended: **YES**. The previous source-quality gate remains failed. The prior acquisition report is preserved at [PRODUCTION-ASSET-PATH-REPORT.md](original-car/PRODUCTION-ASSET-PATH-REPORT.md). The failed control-cage report/source and previous procedural reports/renders remain intact.

Future replacement: provide a new GLB and registry/manifest metadata, normalize/validate camera and exact component paths, recheck rights and source/export visual quality, then use the same shared below-fold renderer. No homepage redesign is necessary.

## Files Created

- `public/models/vehicles/toli-preproduction-sedan.glb`
- `src/lib/vehicle-model/preproduction.ts`
- `src/components/journey/vehicle-presentation.css`
- `src/test/preproduction-vehicle.test.ts`
- `docs/original-car/PRODUCTION-ASSET-PATH-REPORT.md` (previous report preserved)
- `docs/original-car/preproduction-integration/` (browser screenshots, responsive/controlled checks, request logs, protection verification and final validation logs)

## Files Modified

- `src/lib/vehicle-model/contract.ts`
- `src/lib/vehicle-model/registry.ts`
- `src/lib/vehicle-model/load.ts`
- `src/lib/vehicle-scene.ts`
- `src/components/journey/JourneyProvider.tsx`
- `src/components/journey/ComponentExperience.tsx` (scoped presentation stylesheet import)
- `src/test/vehicle-registry.test.ts`
- `src/test/original-sportback-asset.test.ts`
- `src/test/vehicle-lifecycle.test.ts`
- `docs/ORIGINAL-3D-CAR-REPORT.md`

TypeScript's existing generated `.tsbuildinfo` and production `dist` outputs may update during validation; no dependency manifest, Hero/Nav, Gallery, request or AI source was changed by this task.
