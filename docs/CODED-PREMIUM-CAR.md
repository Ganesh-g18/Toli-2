> CURRENT: the car-removal requirement was cancelled. The approved hero image and animated navbar car are restored; the image hero has no scene dock or WebGL work. Phase 2 service/content improvements remain. See CAR-RESTORATION.md.

# TOLI vehicle presentation

## Current hero: fixed cinematic presentation

The hero has no inspection toolbar, preview/helper labels, part buttons, reset, mode switch or manual rotation. Its pointer-depth hook and inspection React state/exposure were removed. The vehicle stage keeps the existing front-three-quarter cinematic pose and optional finite entry; pointer/touch input cannot change its orientation or parts. Controls/listeners and manual inertia remain only for useful below-fold component inspection. Readable copy and Explore Services sit directly under the vehicle stage with no vacant toolbar row.

The licensed professional model is still not supplied; the existing elegant image remains a static fallback. No new model was generated or substituted. The imported-model adapter, geometry/material work, shared service components and reusable part controllers remain intact. Earlier descriptions of hero configurator controls are history, not active behavior.

## Hero simplification and shared component audit

The hero no longer offers Solid/Technical or renders the technical SVG/shell. Shared Technical state remains usable only in service/component sections. Imported-model part controls and the existing static fallback are retained; a suitable licensed professional hero asset is still required. The shared wheel/brake and battery presentations were refined without adding renderers. See [3D-VISUAL-AUDIT.md](3D-VISUAL-AUDIT.md) for inventory, classifications, implementation and outstanding visual checks. Earlier references below to a hero mode switch are historical.

## Active direction: licensed imported model required

The procedural builder is retired from normal Solid rendering. No suitable professionally modeled, project-licensed vehicle is installed. The asynchronous imported-model adapter and explicit node/pivot contract are prepared; Solid currently uses the safe static poster with disabled part controls. Technical remains available in the existing single renderer. See [VEHICLE-MODEL.md](VEHICLE-MODEL.md) for the asset search, missing deliverable, contract, source/license requirements, material handling and exact remaining checks. All sections below are implementation history, not claims about an installed imported model.

## Current hero: articulated Solid inspection

This section supersedes the campaign-only Solid direction below. The existing single Three.js canvas now presents live Solid and Technical inspection; the transparent sports-GT image is a loading/failure poster only. There is no image flipping, stretching or fake 360° interaction.

The headline and car occupy separate CSS grid rows, replacing their competing absolute positions. The car retains a substantial dedicated stage below the complete two-line headline. Supporting copy is 15–17 px with a 430 px maximum width, normal letter spacing and 1.65 line height. The disclaimer is 12 px desktop / 11 px mobile in the primary text color. Controls sit in a separate row, horizontally scrollable on narrow screens. Navbar and booking components were not modified.

`premium-car/inspection.ts` clips the real shell triangles into independent bonnet and two door skins, preserving interpolated normals and UVs. Removed surfaces are absent from the fixed body. The old central passenger-cell deck is cut away to expose seats and a dark cabin floor. Door assemblies include their side glass, flush handles, split window seals, inner panel and edge returns. Mirror housings, stalks and reflective surfaces form separate pivots attached to their respective doors. Hinge groups are kept out of static batching. Compatible details are merged within each hinge and vertices welded using position/normal/UV attributes, preserving deliberate boundaries and the existing geometry budget.

The bonnet rotates 42° about its rear/cowl hinge; left/right doors rotate outward 58° about their front hinges; both mirrors fold 58° at their mounting pivots. The bonnet has an inner lining and reveals a simplified dark bay, generic drive cover and reservoirs. These are illustrative service geometry, not a customer's actual engine or diagnostics. Geometry is generated once per scene; damping changes transforms, without React updates on every animation frame.

Semantic buttons issue commands to the same authoritative state used by the model and receive returned state/callbacks, including mesh taps. Controls expose open/close or fold/unfold labels and aria-pressed; unavailable/Technical part controls are disabled. A 45° rotation step provides keyboard inspection, alongside horizontal pointer/touch drag and the existing vertical-scroll gesture intent. Short raycast taps toggle actual door/bonnet/mirror meshes. Dragging retains open parts. Reset damps yaw back to the initial front-three-quarter direction, closes both doors/bonnet and unfolds mirrors. Part targets survive mode switches and are restored after quality/viewport scene recreation. Reduced motion removes inertia and uses shorter restrained part transitions. No second renderer or canvas is added.

Code tests cover clipped-area conservation, real hinge origins/angles, mirror parenting, door interior presence, part persistence during yaw rotation, reset, reduced-motion settling, gradual keyboard rotation, UI labels/pressed states, mode switching and both rendering tiers under the unchanged mesh/triangle thresholds. All existing service-request, theme, fallback and lifecycle tests remain in the suite.

**Still visually unverified:** browser security previously blocked access and was not bypassed. Inspect 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360 and 320 widths in both themes. Confirm headline clearance, readable lower copy, car scale/contact, controls without overflow, full-circle framing with parts open, door/glass/seal joins, hinge and mirror clearance, bonnet bay/lid overlap, tap hit regions, mobile scrolling and the Solid/Technical transition. Production browser console cleanliness is unverified. Passing geometry/state tests does not establish configurator-level realism or visual QA.

## Historical campaign-only presentation

The cinematic Solid hero now uses the original unbranded `toli-sports-campaign-960.webp` / `toli-sports-campaign-1440.webp` transparent graphic. This supersedes the earlier code-only hero direction described in the history below. Its front three-quarter view, gunmetal paint, smoked glass, detailed wheels and subtle red reflected illumination are baked into a single image. It cannot rotate; no flip, stretch or fake image-based 360° interaction is provided.

`Hero.tsx` renders the decorative responsive picture immediately with empty alt text, high fetch priority and fixed intrinsic proportions. The headline/navigation do not wait for WebGL. The asset is approximately 90 KB at 960 px or 176 KB at 1440 px, preserves alpha and has no image card or theme inversion. Existing themed atmosphere/technical floor remains; a restrained red floor-light ellipse accompanies the image. Entry fades over 3 px once, then stays still. Reduced motion disables entry and transitions; there is no pointer parallax or continuous body drift.

Solid hides and disables pointer input on the hero canvas and pauses its renderer after presentation. Technical switches to the genuine existing Three.js inspection. Its static technical SVG remains available while loading or if GPU support fails. Switching modes re-presents the active dock; studio/service chapters continue using the shared interactive renderer. No navigation, form, booking backend or navbar artwork changes were made. No Lightweight View was introduced.

Asset provenance, exact prompt and preparation details are in `src/assets/hero/CAMPAIGN-ASSET.md`. The source and optimized derivatives were inspected as files. Live browser layout, all responsive widths, both theme compositions and production console remain visually unverified under the previously reported browser security restriction. Human checks should confirm the image's front angle and panel/wheel anatomy, alpha edges against cream and burgundy, tire contact, mobile crop, headline clearance, and a usable Technical transition with mouse/touch rotation. Passing tests cannot establish those visual acceptance criteria.

## Historical code-generated model implementation

The active Solid vehicle is generated entirely by the project's existing Three.js stack. It has no GLB/GLTF input, car photograph, raster material map or remote asset request. No dependencies were added. The previous imported asset, loader, credits and optimization script were removed from the application; a copy of that previous implementation is retained in the task outputs outside the project.

## Current Solid model: station-defined two-door sports GT

This section supersedes the earlier sedan-style shape descriptions below. `src/lib/premium-car/design.ts` is the source for the sports GT's major dimensions, named body stations and cabin stations. The vehicle is entirely code-generated; no car image, downloaded model, third-party geometry, badge or new dependency was introduced.

Seventeen physical longitudinal stations define the tail, rear bumper/deck, rear axle/haunch, long coupe door, cowl, hood, front axle and nose. Cubic Hermite interpolation operates in longitudinal distance and shares station derivatives between adjacent spans. Each section has a curved crown, shoulder, convex side and tucked rocker; the main shell is one indexed BufferGeometry, not overlapping primitive bodies. Station widths create fuller rear haunches. Uniform samples are supplemented at every authored station and at wheel-opening arc angles; the same design is used at desktop and compact sampling levels.

The faster cabin profile has a lower crown, curved side glass and the existing closed roof with shared canopy normals. One flush handle per side and two long door boundaries replace the previous four-door visual language. Front seat backs are custom sampled, bolstered surfaces; the modest rear seats and parcel shelf remain as cabin depth. Existing layered front/rear lamps, recessed front intake, mirrored details, underbody, four lined wheel openings, curved tires, turbine spokes, brakes and fixed calipers are retained.

The major envelope remains compatible with the existing camera and service anchors: 4.96-unit station span (fascia/lips extend slightly), maximum authored body width 2.17, 3.12 wheelbase, 1.91 wheel-center track, approximately .45 rolling radius and 1.46 roof target. Wheel placement, contact-shadow placement and rolling-angle conversion now consume shared design values. The approximately 30° initial camera, manual rotation, movement lifecycle, Solid/Technical mode, navbar and booking system are unchanged.

Material settings were retained: gunmetal pigment plus moderate metallic response and clearcoat, original prefiltered HDR studio reflections, separate smoked glass/lenses, matte rubber and distinct wheel/brake/interior materials. No claim is made that these settings alone establish realism. The minor glass curvature change modifies the real surface, not an animated fake reflection.

Automated verification includes station interpolation, symmetric shell sections, finite unit normals, adaptive sample ordering, two-door handle count, both quality tiers under the existing mesh/triangle budget, canopy seams, wheel-well clearance, disposal and existing interaction/form regressions. Production build, TypeScript, lint and the full suite are rerun for this model.

**Visually unverified:** the browser security restriction remains unresolved and was not bypassed. Human inspection is still required at front, front three-quarter, side, rear three-quarter, rear and opposite side; in both themes; and at 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 390, 360 and 320 widths. Specifically inspect body/reflection flow, wheel and well clearance while steering, lower roof versus interior, glass joins, lamp attachment, hood/cowl and rear-deck transitions, panel attachment, floor contact, hotspot alignment and text clearance. Production browser-console cleanliness is also unverified. This is a new authored sports-GT surface model, not a visually approved photorealistic automotive asset.

## Earlier implementation history

## Geometry and materials

- `src/lib/premium-car/surfaces.ts`: smooth indexed body profiles with actual wheel cutouts, flowing canopy/roof, separate windshield/side/rear glass, swept curved lamp profiles and detail ribbons.
- `materials.ts`: shared gunmetal clearcoat paint, smoked glass, matte rubber, machined graphite wheel edges, dark interior and restrained white/red lamps. Uses the existing original studio reflection map.
- `wheels.ts`: shared lathed performance-tire geometry, merged geometric tread, extruded turbine spokes, rim barrel, lip, hub, brake disc and fixed red caliper. Rolling and steering groups are separate; calipers do not roll.
- `index.ts`: coachwork, fascia/intakes, panel seams, handles, mirrors, lower aero, closed underbody, seats/dashboard/steering and static batching. Geometry is generated once per scene lifecycle; compatible static surfaces are merged by material/attribute/index layout. Resource disposal is idempotent and does not dispose the scene-owned environment.

The code is an original generic concept, without manufacturer badges or a deliberately copied production design. +X is the nose. Both axle centers are at Y=.46 with ~.45 overall rolling radius including tread, leaving a small positive floor clearance. The scene's existing contact shadow and technical grid ground the tires.

## Presentation and interactions

The hero camera settles near a measured 30° horizontal offset from the vehicle's nose, on the opposite side from the previous imported presentation: nose toward left-center, visible side extending right. The existing moderate 34° FOV is preserved. The hero scale was increased from 1.42 to 1.62 for this coded model. Existing wide-screen headline clearance and narrow-screen camera fit remain.

`vehicle-scene.ts` owns one renderer/canvas, finite driving state, wheel travel, manual horizontal rotation, damping, chapter migration, component focus and theme lighting. Horizontal interaction can interrupt entry. Vertical touch intent stays available for scrolling. Reduced motion skips entry and inertia while preserving feasible manual viewing. Technical mode crossfades to the existing illustrative service shell; it does not morph incompatible surfaces.

The active hero no longer mounts the raster-car environmental backdrop. The previously generated premium poster remains only behind loading/unsupported/failure states, as requested. Navbar red artwork and its code animation are untouched. No Lightweight View switch or wording is present.

## Maintenance

Change profile control points and shared assembly dimensions together; preserve axle/arch centers, the .45 rolling radius and the camera envelope. Do not regenerate geometry in the animation loop. The compact tier reduces body sampling and DPR while retaining the same design and complete wheels. Severe stalls and WebGL failures still use the existing static fallback strategy.

## Automotive finish refinement

The approved geometry envelope, hero angle, manual rotation and navbar remain intact. Paint now separates gunmetal pigment, a moderate metallic response, subtle static micro-roughness and a smooth clearcoat. Internal paint presets support future variations without adding a visible selector.

`studio-environment.ts` creates original linear half-float HDR radiance with broad neutral softboxes above the horizon and restrained burgundy bounce below it. Three.js PMREM prefilters it once using the existing renderer. No external HDRI or second WebGL context is used. Glass, lamp lenses, reflectors, mirror glass, rubber, wheel edges, brake discs and calipers use distinct material responses. The intake is an open bumper aperture with recessed backing and uncapped walls; thin hood/deck seams and subtle tire beads add definition.

Radial alpha textures soften chassis/tire contact. `floor-reflection.ts` reuses selected coachwork/tire geometry for a faint depth-faded virtual image, rather than a full planar reflection pass. Compact rendering keeps only the coachwork reflection. Shared geometry and environment ownership remain explicit during disposal.

Validation: material/HDR orientation, aperture geometry, contact falloff, reflection ownership and lifecycle regressions are covered by automated tests. Final live visual checks across the requested viewport sizes and both themes could not be completed in the current session because browser security policy blocked access to the local preview. Do not treat earlier screenshots as proof of the final corrected environment orientation.

## Continuity and geometry follow-up

The roof now spans the complete canopy width and meets the side-glass boundary; the former 86% width left an open strip on either side. Fender returns now follow the body profile's local width instead of floating on a fixed lateral plane. Side sections interpolate smoothly through the sill, door and shoulder control points. Tire cross-sections use a curved carcass while retaining the established maximum radius and floor clearance. Rear seat backs, cushions and parcel shelf complete the cabin silhouette. The initial camera, wheelbase, paint architecture and navbar graphic remain unchanged.

Realism limitation: this remains an authored parametric concept surface model, not a production automotive CAD/tessellated asset. These changes correct concrete construction defects; they do not establish advertising/configurator photorealism. Full-screen visual approval, six-angle inspection and responsive/theme verification remain outstanding because the browser security policy blocked the local preview in this session. Further geometry refinement must be guided by those views rather than assumed from material settings or passing tests.

## Wheel-well enclosure and canopy normals

The four wheel wells now have curved recessed liners and inner backing surfaces, replacing the narrow dark tube that previously left the cavity unenclosed. Liner radius is .478 against approximately .45 tire radius; the backing sits at lateral ±.76, inward of the tire sidewall. The liners use the existing matte intake material, follow local fender width and are present on both axles and both sides in both rendering tiers. They are merged with compatible static geometry, adding no renderer or animation-loop geometry work.

Roof, windshield and rear-glass normals now derive from the same complete canopy surface rather than independent patch triangulation. This removes a mathematical normal discontinuity at the two material boundaries while preserving the closed roof and current profile. Hood/deck shutlines now sample the actual body crown and width instead of using a fixed height, reducing buried or floating seam segments. Paint, studio radiance, camera, wheel pivots, navbar and service-request code are unchanged in this pass.

Code inspection covers front/rear fascia, both sides, canopy edges, four wells, underbody and existing layered lamps. The approximately 5-unit body, 3.12-unit wheelbase, 1.91-unit wheel-center track and .9-unit tire diameter retain the established long-wheelbase GT proportions. The curved tire, shared dimensional wheels and fixed calipers remain. No new external assets or dependencies were added.

Remaining limits and exact visual checks:

- The parametric body is still not production CAD. Confirm shoulder/fender volume, roof and rear-quarter silhouette, and hood-to-cowl continuity at full-screen scale before claiming configurator quality.
- Inspect front, initial ~30° front three-quarter, side, rear three-quarter, rear and opposite side. Check wheel-well occlusion, steering clearance, panel attachment, lamp depth and mirror placement at each relevant angle.
- Inspect neutral reflection bands across the two canopy boundaries, gunmetal pigment beneath clearcoat, lower red bounce, glass transparency/interior depth and tire versus rim material response in dark and light themes.
- Verify soft tire/chassis contact and the approximate depth-faded floor reflection; the floor implementation is not a physically blurred planar reflection.
- Check widths 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 390, 360 and 320 for car framing, headline clearance and usable drag/controls. Check theme persistence, chapter migration and fallback in a real browser.
- Browser access was previously rejected by security policy; it has not been bypassed. These are outstanding visual checks, not passed QA. Automated tests establish geometry/material/lifecycle invariants and functional regressions only; they cannot establish photorealism or a clean production browser console.

## Hero studio cleanup

Removed the dedicated `VEHICLE / SPORTS GT` label, both loading/ready disclaimer variants, their absolute wrappers and all corresponding stylesheet rules. Those wrappers did not participate in layout, so removing them leaves no reserved text rows; the existing vehicle framing and responsive composition remain intact. Supporting copy retains its final 15–17px size and Explore Services still scrolls to the services section.

Removed the hero CSS perspective grid and the unused decorative horizon-line implementation. Shared Three.js grid, floor ring and ticks now belong to `technical-studio-guides`, which is disabled on entry to the hero and restored for other chapters. Deleted the hero-only instanced motion streak geometry and its update/disposal code. Vehicle materials, contact shadows, reflection helper and subtle campaign floor glow are unchanged. No replacement decoration was added.

Regression coverage checks absent labels/grid markup and guide visibility across hero → parts → hero transitions. Live responsive screenshots and production-console checks remain unverified because the local browser preview is blocked by the previously reported access policy. The existing image fallback remains in place pending a licensed imported vehicle asset.

Validation for this cleanup: production build, TypeScript project checks and lint passed; the full suite passed 191 tests across 28 files. The former moving-hero-grid assertion now checks disabled guides while retaining its camera/travel/wheel assertions. Build advisories about bundle size and outdated browser data remain unchanged.
