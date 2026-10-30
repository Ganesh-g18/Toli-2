# Imported sports-GT integration — asset required

## Current status

There is **no approved production GLB/GLTF car installed**. The project was searched recursively for GLB, glTF, FBX and OBJ files, excluding dependencies, Git internals and generated distribution output. The requested public/source asset locations contain no vehicle model. The active manifest is deliberately `null`.

The normal Solid path no longer calls the procedural vehicle generator. The existing transparent campaign image is only a static fallback/loading poster, with no fake rotation or moving parts. The hero has no part/rotation/reset controls at all; they are not re-enabled when a model arrives. Its presentation is cinematic and fixed. The adapter retains reusable part controllers for dedicated experiences. Technical remains the existing separate 3D service illustration in the same renderer, outside the hero only. The hero has no mode switch and cannot enter Technical mode. Headline spacing, enlarged supporting copy, navbar and service-request flows are retained.

## Archived model inspection

A broader search of this chat's saved outputs found `outputs/toli-coded-car/previous-imported-implementation/public/models/toli-grand-tourer.glb` (2,965,428 bytes), with Car Concept CC-BY-4.0 attribution and trademark exclusions. This file is outside the current project, and was not duplicated or activated.

Its GLB JSON contains 56 meshes and no animation clips. `BodyHood`, `BodyDoorRColor1` and `BodyDoorLColor1` retain transform/group nodes but no exterior mesh reference of their own. The consolidated `Paint 1 Carmine` mesh is attached under `BodyRearPanelsColor1` (22,338 position entries), rather than independent painted door and bonnet skins. Interior, window, handle and mirror child nodes remain, which alone would not make the actual outer panels open. Reusing this optimized file as-is risks moving inner pieces while the exterior stays closed. It needs an unmerged original source, rights/trademark re-review and full quality/hierarchy inspection before it can be considered a candidate. The archived render was reviewed as historical evidence, not current visual QA.

## Source and license search

No model or questionable download was introduced. Candidates were screened, rather than treating a downloadable GLB as proof of quality or rights:

- [Spectral GT RS source repository](https://github.com/JaronKBragg7337/spectral-gt-rs) explicitly describes a procedural Blender asset, so it does not satisfy the new direction even though it offers CC0 terms.
- [Generic Full Sports Car Pack catalog](https://www.cgtrader.com/3d-models/car/sport-car/generic-full-sports-car-pack) advertises separable parts with a commercial royalty-free license. No project purchase/license evidence is supplied, so it was not downloaded or installed.
- [Generic two-door sports-car listing](https://sketchfab.com/3d-models/generic-2-door-v8-sports-car-f531cc981c2d4410816727eea68a0878) could not be inspected through the available page access. Compatible model rights were not verified; texture licensing alone would not establish model rights.
- Other generic CC0 catalog results did not establish professional modeling quality, interior/under-hood completeness and separable mirrors together. They were not substituted just to produce a GLB.

The missing deliverable is a professionally modeled sports-GT asset with verified project-compatible rights, complete geometry and separable components. Source: none installed. License: none adopted. Filename: unset. Actual production node names: unknown until the supplied file is inspected.

## Integration architecture

- `src/lib/vehicle-model/contract.ts`: asset URL, source/license evidence, reviewed status, dimensions, orientation and exact mappings. `ACTIVE_VEHICLE_MODEL = null` prevents guessed requests and placeholder use.
- `load.ts`: asynchronous existing Three.js GLTFLoader; missing license/config, network errors, invalid files and adapter errors reject into the static fallback. It never constructs a procedural replacement. Scene disposal ignores late callbacks and disposes late-loaded GPU resources.
- `adapter.ts`: resolves every original child-name path before changing hierarchy. Missing, ambiguous, empty or multiply assigned moving nodes are rejected. Adds measured hinge/steering/rolling parents with `attach` to preserve world transforms. No source meshes are merged or rebuilt.
- `premium-car/inspection.ts`: shared transform damping and state commands, now accepting asset-specific hinge axes and signed angles. The old procedural builder and clipping helper remain only for legacy regression tests; they are not called by the normal Solid scene.
- `vehicle-scene.ts`: owns the existing renderer, horizontal inspection, cinematic movement, camera and Technical transition. Imported model loading is independent of navigation/headline render. Material/part updates use the actual loaded objects. There is no second canvas.

## Required asset and mapping contract

Review the actual asset before filling the manifest. Do not assume names such as `Door_L` exist. Each `NodePath` is an array of exact child-name segments starting from `gltf.scene`; each segment must identify one child uniquely. Mapped movable groups must contain real meshes. Include all actual door glass/trim/inner-panel nodes in the corresponding door group where the source hierarchy does not already group them.

| Field | Required meaning |
| --- | --- |
| `url` | Base-path-relative local GLB/glTF URL, normally `models/<reviewed-file>.glb`; any external source must separately be approved for project use |
| `source`, `license`, `licenseEvidence`, `reviewedForProject` | Verified original source, exact license, saved proof/requirements and completed project review; a boolean alone is not legal clearance |
| `yaw` | Radians that align the asset's front to world +X; prepare Y-up authored coordinates before handoff |
| `targetLength` | Intended normalized length in approximately metre units, compatible with the current ~5-unit camera envelope |
| `rollingRadius` | Actual rolling radius in the asset's original units, before normalization |
| `parts.leftDoor/rightDoor/hood/leftMirror/rightMirror` | Actual node paths, measured hinge/mount pivot in source-scene coordinates, local rotation axis and signed open/fold angle in degrees |
| `wheels` | Four assemblies: actual rotating tire/rim/rotor node paths, separate stationary-caliper paths, measured center pivot, front/rear flag and local spin axis |
| `materials.paint/glass/rubber` | Exact mesh/group paths for isolated material treatment, not guessed material-name substring matching |
| `reflection` | Small explicit set of actual meshes/groups suitable for the restrained floor approximation; omit costly tiny parts |

The supplied model must already include the complete body, openable door/bonnet surfaces, door interiors, cabin, under-hood geometry, mirrors, lights, wheels, tires and brakes. The adapter does not invent missing professional geometry. Mirrors are parented to their doors while retaining independent fold pivots. Calipers attach to steering groups but not rolling groups. Door, hood and mirror limits must be tuned against the supplied geometry, usually ~50–65°, 35–50° and 45–70° respectively. Record actual approved values, not generic guesses.

The source is uniformly normalized, horizontally centered and grounded from the actual mapped wheel meshes. Tire contact-shadow positions follow the imported steering centers. Normalization and pivot calibration must still be visually confirmed on all four tires and through every open-part combination.

## Materials and optimization

Source polygon geometry, UVs and texture maps remain intact. Materials are cloned by source material and explicit role, preventing a reused tire material from also changing body paint. Standard paint is promoted to physical paint, with controlled gunmetal metallic response and clearcoat; existing physical materials remain physical. Glass stays transparent; rubber stays rough and non-metallic. Other materials, lights and interior geometry remain authored. The original procedural HDR studio environment uses the same renderer and is shared without being disposed by the model.

No geometry decimation or texture conversion was performed because no production asset exists. Inspect draw calls, texture size and geometry cost once one is supplied. The current loader supports normal GLB/glTF loading; compressed assets needing Draco/KTX2/Meshopt decoders must have appropriate bundled decoders configured before activation, rather than silently using remote decoder URLs. Keep all glTF dependencies and license evidence with the deployment. The existing lower DPR/secondary-effect policy remains; capable mobile devices use the same imported asset.

## State, fallback and validation limits

Open/close/fold/reset commands drive the actual adapted pivots. Targets survive mode changes and are restored after scene recreation only after imported loading succeeds. Below-fold component horizontal inspection uses the real scene root, without vertical orbit. The hero rejects pointer, rotate/reset and part commands and never binds the rotation listeners. Reset closes all parts and returns the approved front-three-quarter orientation. Reduced motion uses short restrained transform transitions.

The unit-test hierarchy is explicitly synthetic and test-only, never an installed production vehicle. Tests cover missing asset/no network request, rights guard, exact path validation, real node reparenting, stationary calipers, material-role isolation, grounding, hinge motion/reset and disposal, alongside existing UI, theme, lifecycle and booking regressions.

An actual asset, actual hierarchy documentation, production performance measurement, door/bonnet/mirror collision tuning and visual quality approval remain outstanding. Inspect both themes at widths 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360 and 320, including all six directions and open parts during rotation. Browser visual/console QA remains unverified under the previously reported browser restriction. Do not describe the model integration as visually complete until a reviewed model is installed and those checks pass.
