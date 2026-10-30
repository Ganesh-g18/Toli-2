# TOLI Atelier Sportback — candidate, NOT production-approved

Original unbranded surface-modeled vehicle created for this project, not downloaded from a manufacturer, marketplace or AI service. No badges, external textures or third-party model geometry. The source and output are delivered for TOLI project use under the project's applicable ownership/licensing arrangements; Three.js tooling remains under its own existing license.

**Visual gate: FAIL.** Do not mark this model `reviewedForProject`, add it to the live registry, or activate it in `ACTIVE_VEHICLE_MODEL` yet. Broad body surfaces, fascia, transitions and optical detailing require further modeling. The project explicitly requires withholding a visually inadequate model.

Rebuild from repository root:

```sh
node tools/3d/generate-toli-sportback.mjs
```

Source: `tools/3d/generate-toli-sportback.mjs`. Offline parametric surface lofts/trimmed panels, lathed tires, swept-spoke wheels, basic interior and PBR materials; exported as glTF 2.0 binary with clearcoat. No generation code enters the application bundle. Blender/bpy were not available in the inspected environment; the workflow uses the installed Three.js geometry/export tooling offline, not the website's schematic runtime car.

Runtime-format candidate: `toli-atelier-sportback.glb`. Measurements: adjacent `.audit.json`. Metres, Y up, +X forward; tire ground Y=0. Body approximately 4.87m long, 1.51m high; width including mirrors 2.21m. Four axles/wheel hubs at X ±1.43, Y .35, Z ±.875. One reusable asset, four wheels; no alternate branded versions.

Hierarchy: VehicleRoot → Body, Glass, Interior, Hood, Door_L, Door_R, Mirror_L, Mirror_R, Wheel_FL/FR/RL/RR, Brake_FL/FR/RL/RR, Headlight_±1, Taillight_±1, Underhood (BatteryConcept). Assemblies remain separately targetable; material batching is confined to named groups. Future component mapping must use exact parsed hierarchy paths. A battery volume is a generic authored concept, not a customer-specific location.

QA viewer: start the existing Vite development server and open `/Toli-2/tools/3d/preview.html`. This is an isolated authoring tool, not a website route or permanent application canvas. Its renderer is independent only for asset inspection. Buttons show front ¾, side and rear ¾. It does not change Hero or Navbar. No paid tool/download is required.

Optimization: material batching and indexed geometry retain the authored triangle surfaces without polygon decimation or LOD reduction. Vertices are welded at a 1e-5 tolerance; the complete pre-batching authored surfaces remain in the source. Current refinement contains 192,105 triangles, 125,334 summed mesh vertices, 58 meshes, 12 PBR materials and zero textures. At 4,268,888 bytes it is heavier than the first candidate because body/bumper curvature and dimensional details were added. Do not treat this as mobile performance approval. The complete authored surfaces remain in the source before batching; the original rejected source is retained under tools/3d/archive.

Refinement adds physical-height-based body shaping, continuous parametric normals, wider structural pillars, pierced bumper skins with recessed optical/intake assemblies, extruded split spokes, profiled tires, caliper volumes and two-tone mirror shells. The studio viewer now uses reflection cards, controlled red influence, VSM shadows, contact falloff and a stepped 360-degree inspection control. These improvements do not override the failed visual gate.

See `docs/ORIGINAL-3D-CAR-REPORT.md` for the rejection, validation evidence and integration limitations.


Final focused body study: revision 8 was also visually rejected. Its reproducible source and GLB are retained outside the runtime/public asset tree in `tools/3d/experiments/`. The canonical source/GLB here remain the exact retained revision 7 (4,268,888 bytes). The current projected-loft construction has reached its quality ceiling; use an authored shared quad control cage/subdivision workflow rather than further minor profile changes. See the final body report for the five required renders and direct comparisons.
