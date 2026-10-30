# PRODUCTION ASSET PATH

Audit date: 2026-10-18. Scope: existing TOLI MOTORS repository and publicly accessible asset listings. **Decision D — NO SUITABLE FREE/PROJECT-OWNED ASSET FOUND within the audited sources. PROFESSIONAL 3D VEHICLE ASSET REQUIRED.** This is not a claim that no suitable free asset exists anywhere.

No production candidate has passed license + visual + technical gates. No acquisition, purchase, new modeling, export, preview integration or activation was performed.

## Modeling Experiments

Procedural: **FAILED — QUALITY CEILING**. Control Cage Milestone 1: **FAILED — QUALITY GATE**. Both are preserved as reference. Detached/procedural surface construction failed the original visual gate; the new cage remained inflated and wavy through the hood/cowl reflections. Current automated vehicle authoring is stopped. No additional cage, vertex revision, detail pass or production GLB is authorized by this strategy.

The previous milestone report is retained at [CONTROL-CAGE-MILESTONE-1-REPORT.md](original-car/CONTROL-CAGE-MILESTONE-1-REPORT.md), including seven actual failed-study renders and measured metrics.

## Repository Asset Audit

Fresh recursive scan: **59 directories, zero scan errors, four asset files, zero archives**. Scanned the complete working repository including dot-directories, public, tools, source, docs and generated dist. Excluded only `.git` object/history internals and `node_modules` dependency packages. No private/unrelated user directories were searched. No symlink-mounted external asset library was identified. The immediate project parent contains only this checkout. Machine-readable inventory, SHA256 and GLB header counts: [repository-assets.json](../tools/3d/asset-audit/repository-assets.json).

| Local file | Bytes | Classification | Finding |
|---|---:|---|---|
| `public/models/toli-sportback/toli-atelier-sportback.glb` | 4,268,888 | FAILED PROTOTYPE | Original procedural R7; 192,105 triangles, 58 meshes, 12 materials, zero textures. |
| `dist/models/toli-sportback/toli-atelier-sportback.glb` | 4,268,888 | FAILED PROTOTYPE | Identical SHA256 to public R7; generated build copy, not another candidate. |
| `tools/3d/experiments/toli-body-fascia-r8.glb` | 4,293,704 | FAILED PROTOTYPE | Rejected procedural refinement; 193,064 triangles, 58 meshes, 12 materials, zero textures. |
| `tools/3d/toli-control-cage/source/toli-meridian-milestone1.blend` | 667,828 | FAILED PROTOTYPE | Editable failed M1-B cage/studio; not a finished vehicle. |

No `.gltf`, `.fbx`, `.obj`, `.usdz`, `.dae` or project archives found. The scan also checks `.blend1`, `.3ds`, `.c4d`, `.max`, `.ma`, `.mb`, `.stl`, `.ply`, `.3mf` and common archive extensions. No UNKNOWN file or PRODUCTION CANDIDATE was discovered. No standalone NON-VEHICLE model was found in those formats. Website images, SVGs and diagnostic render PNGs are visual/reference assets rather than editable vehicle geometry; Hero/Navbar artwork is not a 3D acquisition source. Existing coded below-fold geometry is a PROTOTYPE implementation, not a professional imported model.

Project registry and `public/models/README.md` still describe missing professional assets. `ACTIVE_VEHICLE_MODEL` remains null. This chat has no attached artifacts, and the enabled capabilities expose no connected project-owned storage or asset-library session. No account connection or private-storage search was attempted; absence of an exposed connector does not establish absence of user-owned models elsewhere.

Reproduce inventory from repository root:

```sh
python3 tools/3d/asset-audit/audit_assets.py --root . --output tools/3d/asset-audit/repository-assets.json
```

## Available Tooling

| Tool | Actual availability / limits |
|---|---|
| Blender | Portable official **4.5.3 LTS** at `/tmp/blender-4.5.3-linux-x64/blender`; executed `--version` this audit. Not on PATH; temporary location may disappear. Existing install from prior task, no new software installed. |
| Import/export | Existing Blender glTF workflow and Three.js `GLTFLoader` / `GLTFExporter` files available. Format-specific fidelity still needs testing against any purchased source; 3ds Max/Maya source history cannot be assumed editable in Blender. |
| Mesh optimization | Installed `meshoptimizer` JavaScript encoder, decoder and simplifier initialize successfully and report supported. No `gltfpack` or glTF Transform CLI on PATH. Not run on any candidate. |
| Draco | Three.js bundles decoder WASM/JS and encoder JS. Files present; standalone `draco_encoder` absent. Encoding not exercised in this audit. |
| Textures | Installed Sharp **0.35.4** loads; libvips **8.18.6** with WebP/AVIF codecs. ImageMagick `convert` and FFmpeg on PATH. No `toktx` or `basisu` executable found; no KTX2 pipeline claimed ready. |
| Inspection | Python GLB JSON/header/mesh/accessor inspection runs successfully; existing Blender audit/render scripts available. No dedicated Khronos validator CLI found on PATH. |
| Rendering | Existing Blender Cycles CPU studio already produced actual renders in the preceding milestone. No new model render needed for this audit because no source passed prequalification. GPU availability/performance not claimed. |
| Commercial tools | No 3ds Max/Maya/CAD conversion executable established. No large tool installation performed. |

Available tooling can convert and optimize a strong source; it cannot establish or repair professional automotive surfacing automatically.

## Candidate Requirements

One realistic, original/unbranded premium four-door sedan/sportback. No manufacturer badges or recognizable copied design signature. Professional silhouette, hood/fender continuity, arch returns, greenhouse, original integrated front/rear fascia, dimensional lights, seated wheels, convincing glass and clean neutral-strip reflection flow. A blank or inflated body does not pass because its topology is dense.

Prefer separately editable body, glass, wheels/tires, brakes, lights and restrained interior, with stable names, real scale and usable UV/material organization. Preserve the high-quality source and provenance. An excellent heavy source may qualify for optimization; source quality and derivative web quality are separate decisions.

Mandatory evidence: specific asset identity and creator, license/version or signed grant, commercial permission, modification/optimization permission, permission to deliver an optimized model/texture derivative to anonymous browsers/CDNs, attribution terms and third-party content exceptions. Render-only rights are insufficient for a downloadable runtime GLB. Do not treat obscured URLs or compression as a licensing solution. No ripped/game/configurator/manufacturer/unknown-mirror files.

## Candidates Evaluated

These are screening results, not full rendered approval. No paid source or unverified-license asset was downloaded. Public listings are evidence of advertised terms, not proof of geometry or third-party clearance.

### Innerscene — Graphite four-door sedan

- Source: [specific asset page](https://www.innerscene.com/tools/library/3d-parts/graphite-four-door-sedan-eed96d12); creator credited **Innerscene — original model**. Format advertised: GLB, 4.8 MB; measured local counts: not available, not downloaded.
- License: specific page identifies **CC0**; [library terms](https://www.innerscene.com/tools/library/terms) confirm commercial copying, modification and distribution without credit. [CC0 deed](https://creativecommons.org/publicdomain/zero/1.0/) supports those permissions but does not grant trademark/patent rights. Commercial: YES; modification: YES; runtime redistribution: YES under the stated dedication; mandatory attribution: NO.
- Visual quality: published three-quarter preview inspected in-browser. Boxy body/cabin and simplified fascia/wheel presentation do not establish the requested premium sports-sedan appearance. **Rejected at initial visual screening.** This is an assessment of the visible preview, not an assertion of hidden topology defects.
- Technical suitability: advertised GLB is potentially inspectable; hierarchy, material/texture counts, editability and performance UNVERIFIED. No isolated validation render or optimization performed after screening rejection. Decision: **do not acquire/use for this brief**.

### Kenney — Car Kit

- Source/creator: [Kenney’s own pack page](https://kenney.nl/assets/car-kit). Specific pack license: **CC0**, linked to the CC0 deed above. Commercial: YES; modification: YES; runtime redistribution: YES under CC0; mandatory attribution: NO. No model files downloaded; exact formats/counts not measured.
- Visual quality: official preview inspected in-browser; deliberately stylized small game vehicles. It does not fit realistic premium automotive presentation. Technical suitability for this brief: unsuitable style; component/texture/mesh metrics not inspected. Decision: **screening rejection**, despite permissive copyright terms.

### SQUIR — Generic Sedan v1 2025 (paid sourcing lead only)

[Specific listing](https://3dexport.com/3d-model-generic-sedan-v1-2025-557501), creator SQUIR. Advertised formats include Blend/FBX/OBJ/Max/Maya; 533,000 polygons, 558,000 vertices, not PBR. Listing says editable smoothing history is retained in Max/Maya; other formats are high-poly exports. Source editability in Blender and web material conversion need verification. These are seller counts, not local measurements. No price quoted or purchase made.

License advertised: Basic/Extended, No AI Training. Commercial use advertised; modification and attribution details not fully resolved. **Runtime GLB permission: UNVERIFIED.** The [marketplace license](https://3dexport.com/basic-license-and-extended-license) describes web/game usage but also restricts exposing reusable model files; the applicable terms need written clarification for anonymous-browser GLB delivery. Visual quality and technical suitability: UNVERIFIED; listing text/polygon count are not approval. Decision: **not recommended for use, not downloaded**; only a vendor/licensing inquiry lead.

Other search results (including generic sedan listings, branded models and AI-generated “CC0” cars) were not promoted to candidates based on search snippets. No broad platform-wide license assumption was made.

## Recommended Path

Selected report status: **NO SUITABLE CANDIDATE FOUND**. Selected decision-tree outcome: **D**. **PROFESSIONAL 3D VEHICLE ASSET REQUIRED.**

Best next acquisition route: a paid professionally authored **source asset with an explicit browser-delivery license**, subject to user-controlled purchase after verification. This is a route recommendation, not endorsement or approval of an unlicensed marketplace item. Prefer a vendor who can supply editable Blender source or demonstrate a lossless Blender import, neutral reflection renders and separable real components. A specifically licensed existing source is preferable to another automated body experiment.

Before spending, obtain a sample/review package and written confirmation covering the exact TOLI website and optimized GLB/texture delivery. The user purchases only after license and visual evidence satisfy the brief. No vendor was contacted on the user's behalf. No budget, price, delivery time or rights guarantee is invented.

If no existing source can meet design and runtime rights requirements, obtain a quote from an experienced automotive artist for an original vehicle, source handoff and appropriate written rights. **Professional manual modeling is a fallback, not outcome E:** this audit has not proved external acquisition is impossible. No more automated body experiments are proposed.

### Vendor / artist handoff brief

Supply an original, unbranded premium sedan/sportback with finished body surfacing, physical glazing/light recesses and separate wheels/tires/brakes. Include editable source, textures and material documentation, component names, scale/axes and a manifest of any third-party content. Provide front/side/rear/front-three-quarter/rear-three-quarter renders plus neutral-strip reflection evidence. Confirm commercial use, modification, optimization, texture conversion and client-side/CDN delivery of the GLB derivative to public website visitors; specify attribution and any source-redistribution limits. Confirm ability to grant those rights. Do not substitute a real manufacturer mesh or AI-generated body without disclosure and review.

### Source → web pipeline after acquisition

1. Preserve original source, receipt/license evidence, creator identity and SHA256 in a private authoring location. Do not publish the full source merely because runtime derivatives are allowed.
2. Import an isolated copy into Blender with automatic script execution disabled for untrusted source. Check scale, normals, hierarchy, texture links, transforms and useful component names.
3. Render front/side/rear/front-three-quarter/rear-three-quarter/reflection views under a fixed neutral studio. Inspect a complete rotation and compare with both failed prototypes at comparable framing/light/resolution. Obvious improvement is required before optimization.
4. Measure source metrics separately from derivative metrics. Remove unseen internals and simplify hidden interior selectively. Protect silhouette, arches, wheels, headlights and glazing; no indiscriminate global decimation.
5. Rebuild web PBR materials where needed, merge only compatible materials, resize/compress textures based on visible detail, then export an optimized GLB without overwriting source. Add Meshopt/Draco or KTX2 only if the chosen runtime and verified tooling support the result.
6. Repeat the same views on the derivative, measure size, triangles, vertices, materials, texture memory/resolution and mobile decode/frame performance. Set a measured device/network budget before approval; no made-up universal triangle limit.
7. Only **LICENSE PASS + VISUAL PASS + TECHNICAL PASS**, followed by an explicit integration task, permits isolated preview in the existing shared below-fold renderer. Primary: Component/Vehicle Experience; secondary: Service Matrix where real hierarchy supports it. No Hero use, initial preload or new permanent renderer. Preserve lazy loading, cache reuse, reduced-motion/mobile behavior, offscreen pause and genuine failure fallback.

## Website Status

3D production model activated: **NO**. No production code/assets changed. No fallback replaced with a failed prototype. Services, Component layout, Journey, Trust, Gallery, Service Request, TOLI AI, Footer and stacked-scroll system unchanged.

## Hero

Modified: **NO**, including assets/cars/height/lighting/behavior/CSS.

## Navbar

Modified: **NO**, including Navbar car, logo pill, HELP+, theme, Book Service and MENU+.

## Validation

Build: prior verified **PASS**, not rerun for documentation/audit-only changes.
TypeScript: prior verified **PASS**, not rerun.
Lint: prior verified **PASS**, not rerun.
Tests: prior verified **318 PASS / 44 files**, not rerun or modified. Current baseline preserved, not represented as a new test execution.

Fresh checks: repository scan PASS (zero errors); GLB JSON counts/header checks PASS; Meshopt initialization PASS; Sharp load PASS; portable Blender version check PASS. **77/77 protected website hashes and 6/6 prototype/reference hashes unchanged**. The failed `.blend` hash is retained in the inventory. See [protection-validation.json](../tools/3d/asset-audit/protection-validation.json).

No browser production-console verification is claimed for this read-only website task. Source-quality renders of a professional replacement and old/new comparison are **NOT PERFORMED: no suitable source obtained**. No asset is falsely marked production-ready.
