# Four-vehicle asset audit — 2026-10-16

## Result: asset acquisition required

No suitable professional vehicle assets are available in the repository. Stop condition applies to all four classes. No substitute models, downloads, new selector or runtime model switching have been implemented.

| Type | Asset | Format | Size | Source/license | Quality | Status |
| --- | --- | --- | --- | --- | --- | --- |
| SUV | None | N/A | N/A | No evidence supplied | Unassessable | SUV 3D ASSET REQUIRED |
| Sedan | None | N/A | N/A | No evidence supplied | Unassessable | SEDAN 3D ASSET REQUIRED |
| Coupe | None | N/A | N/A | No evidence supplied | Unassessable | COUPE 3D ASSET REQUIRED |
| Supercar | None | N/A | N/A | No evidence supplied | Unassessable | SUPERCAR 3D ASSET REQUIRED |

## Inventory and search scope

Searched `public/`, `src/assets/` and the complete repository for `.glb`, `.gltf`, `.fbx`, `.obj`, case-insensitively, excluding dependencies, Git internals and generated build output. Additional top-level `assets/`, `models/`, `3d/`, `static/` directories are absent. No matching files were found.

- `public/models/` contains a README only, not a vehicle asset.
- `src/lib/vehicle-model/contract.ts` has `ACTIVE_VEHICLE_MODEL = null`.
- `src/lib/vehicle-model/load.ts` has a GLTFLoader entry point, but no approved source model.
- `src/lib/vehicle-model/adapter.ts` is an older sports-GT adapter requiring four wheel/caliper mappings and five movable assemblies. It cannot safely accept arbitrary vehicle classes without model inspection and adaptation.
- `src/lib/premium-car/`, `src/lib/executive-sedan-geometry.ts` and `src/lib/vehicle-scene.ts` build the current below-fold sedan in code. This is not an eligible professional asset for this request.
- `src/test/fixtures/imported-vehicle.ts` is synthetic test geometry, not a licensed production model.
- Hero and navbar raster artwork are excluded from the requested library and were untouched.

No production model meshes, material counts, texture counts/resolutions, triangle counts, asset sizes or hierarchy/component mappings can be measured for any of the requested classes. They are N/A, not zero-cost assets.

## Prepared architecture

`src/lib/vehicle-model/registry.ts` reserves four distinct class IDs, truthful labels and explicit unavailable states. Its reviewed-asset contract reserves source/license evidence, per-model camera/framing, normalization, measured performance data and optional inspected component paths. No model paths, camera coordinates, performance statistics or component locations have been fabricated.

`requireVehicleAsset` rejects each missing class before any fetch. The registry has no runtime Three.js import, fetch, loader, renderer or startup side effects. It is deliberately not connected to UI or application startup. Service Request customer brand/model state is independent.

Existing renderer lifecycle, below-fold lazy scene initialization, theme handling, reduced-motion behavior, offscreen pause and disposal remain unchanged. No new renderer, loading flash, model preload or model cache was added. Demand loading/caching/switching for these classes is deferred until actual assets exist; it has not been claimed as implemented or visually tested.

## Per-class review gate

For each class, supply a distinct professional GLB (preferred) or GLTF with dependencies and reuse evidence. Establish original/unbranded design or appropriate rights; a filename or format is insufficient. Review actual geometry and PBR materials, inspect exact hierarchy paths, measure file/mesh/material/triangle/texture budgets, and set normalization from actual bounds and tire contact. Frame each class independently.

Do not require wheels, brakes or battery focus when the real model does not support reliable mappings. The full vehicle must remain available without invented component highlights. Integrate verified assets into the one shared renderer on demand, with bounded mobile residency and isolated model-load errors. Do not silently substitute classes. Add runtime lifecycle/switching 