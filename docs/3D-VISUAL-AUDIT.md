# 3D visual inventory — before this pass

The current project uses plain Three.js, not React Three Fiber. `vehicle-scene.ts` owns the sole WebGLRenderer/canvas and migrates it between JourneyDock hosts. JourneyProvider defers scene loading near the page; Index lazy-loads subsequent chapters. Renderer work is demand-driven and pauses when offscreen/obscured. No per-card WebGL contexts were found.

| Visual | Classification | Decision |
| --- | --- | --- |
| Licensed imported hero sports GT | Missing asset; A quality target | Keep loader/explicit hierarchy adapter, controls and safe poster. No suitable production model is currently configured; do not fabricate one. |
| Existing transparent hero campaign graphic | A as static fallback only | Retain only for loading/unavailable asset; never interactive. |
| Shared service/executive shell | B: illustrative shape, not a photorealistic vehicle | Keep for below-fold service explanation, remove all hero access. Preserve truthful illustrative wording. |
| Shared wheel/brake assembly in component exploration | C: torus tire, box spokes and caliper | Replace with existing original shaped tire/barrel/turbine/brake geometry, add rotor/hub detail and restrained materials. |
| Shared battery/service component | C: undifferentiated boxes | Redesign with a rounded case, stepped lid, terminals, hold-down and differentiated plastic/metal finishes. |
| Existing premium-car wheel geometry | B: suitable detailed illustrative component | Reuse geometry factory only, not the retired procedural vehicle. Preserve rubber/metal material separation. |
| Legacy procedural sports-GT body | Retired, not active | Keep regression/reference code out of the normal hero path. Do not restore it. |
| Technical outline, scan plane, grid, passage accents | D: decorative/explanatory | Restrain emissive outlines/scan presence outside explicit service explanation; maintain reduced-motion and low-detail policy. |
| VehicleIllustration SVGs | D: lightweight service fallback | Keep readable static fallback, never present as professional 3D. |
| Navbar red car graphic | A for its separate intended role | Leave unchanged. |

No new external 3D asset or dependency is needed for these component refinements. The remaining professional hero asset/licensing handoff is documented in VEHICLE-MODEL.md. These classifications come from code and existing asset inspection, not newly completed live visual QA.

## Implemented refinements

- Hero no longer renders Solid/Technical buttons, their group, a Technical label or the technical SVG. Shared preferences remain only for service/component sections. Those sections can render the refined illustrative service shell/components even while the professional hero asset is missing; the hero-only static fallback does not hide them or overlay their SVG fallback on a live canvas. JourneyProvider applies false Technical state whenever the active dock is the hero, and the scene independently rejects hero Technical requests. Hero inspection controls retain the imported-model state/controller and remain disabled while the approved asset is missing. Fallback copy says “Vehicle preview,” without developer failure/mode terminology.
- The service wheel uses the existing detailed original component factory: curved tire carcass/shoulder, barrel, turbine spokes, machined rim edge, hub, rotor and stationary caliper. The rotor is redesigned as an extruded annular disc with a central opening and 16 actual drill holes, rather than a solid cylinder. Hub bolts are batched into one shared mesh per side; four wheel assemblies share their source buffers. Calipers remain outside the rolling hierarchy, and exploded wheel inspection keeps the brake at its axle.
- The battery now has rounded/beveled enclosure surfaces, a stepped dark lid, terminal bases and metal posts, a carry handle and hold-down. Plastic is non-metallic and rough; cast trim, alloy, rotor and rubber retain distinct responses. Battery and caliper selection emission is restrained, and the explanatory outline opacity is reduced. The battery's existing exploded inspection movement remains intentional rather than a new decorative float.
- The existing original HDR studio reflections now also reach brake metal and machined hardware. No CSS inversion, external HDRI, per-card renderer, huge texture or new dependency was introduced. The scene still initializes its shared component buffers once, after the deferred scene import; there are no additional below-fold model/texture downloads. The established chapter modules remain lazy-loaded, and visibility/popup pauses are preserved.

The professional hero model is still missing; see VEHICLE-MODEL.md. This pass does not claim a newly installed photorealistic vehicle. Other service shells remain explicitly illustrative rather than professionally modeled production cars. No external component assets were added, so no new asset license was adopted.

## Validation scope

Hero mode-switch tests were intentionally replaced with tests for a single hero presentation and rejection of hero Technical requests. Shared Technical preference/popup/return-state tests were moved to actual service-section controls, retaining their original purpose. New component tests check rounded geometry, finite normals, shared tire buffers, drilled rotor construction, material separation and stationary calipers. No unrelated coverage or geometry budgets were removed.

Live visual QA remains outstanding under the previously reported browser security restriction: inspect dark/light themes at 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360 and 320 widths. Confirm no hero toggle/empty group, readable headline/copy, car framing, renderer migration, wheel/rotor/caliper clearance, battery silhouette, restrained highlights, mobile scroll/controls and service-request usability. Production browser-console cleanliness and visual quality cannot be inferred from passing automated tests.

Final validation: production build, TypeScript project checks and lint pass. The full suite passes 189 tests across 28 files, up from 185: two component-geometry tests, one hero Technical-boundary test and one missing-asset/service-visibility test were added. Existing hero-toggle expectations were replaced with the intentional single-presentation behavior; shared Technical/popup coverage remains on service controls. Test execution uses two workers to avoid CPU contention without changing assertions or timeouts.


## Cinematic hero follow-up

Removed the entire hero inspection toolbar, preview/360 helper text, semantic buttons/ARIA state and their CSS. Removed the hero pointer-depth hook. The context no longer publishes inspection UI state/commands, and the provider keeps only a non-React shared controller-target ref for scene lifecycle preservation. Grid rows were compacted so supporting copy/Explore Services follow the vehicle without an empty control row.

Rotation listeners are not attached to a hero dock and are detached when the shared canvas returns from a component dock. The scene independently rejects hero part/rotate/reset commands, skips manual yaw/inertia advancement and pointer-driven camera movement there, and never marks the hero rotate-ready. Grab/grabbing selectors exclude hero docks, the cinematic canvas ignores pointer events, and native vertical scrolling remains untouched. Shared component drag/gesture-intent/cleanup logic and model/part controllers remain tested and available outside the hero.

The primary camera and finite entry are unchanged; user input no longer interrupts them. Reduced motion still skips automatic entry. No extra glow/particles or new visual effects were added. The licensed asset remains required and all live visual checks listed above remain outstanding.

Obsolete hero part-button/state-restoration assertions were replaced with absence-of-toolbar/focus-target checks and cinematic preference-change coverage. Hero drag assertions were replaced with fixed-angle/input-rejection tests; drag and vertical-intent coverage now runs in component sections. A listener attachment/migration regression was added. No unrelated booking, theme, geometry, model-adapter or service coverage was removed.
