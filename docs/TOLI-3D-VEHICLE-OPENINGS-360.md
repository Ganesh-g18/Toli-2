# Bonnet, boot and full vehicle inspection — 24 October 2026

Current canonical candidate: **toli-03ea962c2a2df6ceb9b08c5e**. Previous verified candidate `toli-eae3a1c9fcfd44e187e0056c` retained as rollback. Local implementation/desktop/emulated validation PASS; **physical Android REQUIRED; production migration NOT AUTHORIZED**.

## Vehicle geometry audit

BONNET = READY in the audited original: separate `VehicleRoot/Hood/Hood outer skin`. Existing neutral Underhood engine cover and generic battery case are retained, without added branding/specification/detail. Originally a thin exterior skin with no modeled thickness; local double-sided material makes its existing backside visible, rather than adding decorative mechanics. Source now has an explicit rear hinge at `[.895,1.08,0]`, near the windscreen base.

BOOT = REQUIRES SAFE SEPARATION before this task; READY after. Connected body deck component held rear deck and cabin sill. Exactly **3,360 original deck triangles** behind the existing seam at sourceX−1.46 moved into `Boot/Boot outer skin`; cabin sill, bumpers, fixed rear glass, rear lamps, roof, pillars and rear doors remain static. No duplicated outer panel, invented hatch glass movement or whole-body rotation. Existing panel shape/materials/normals/alignment remain. Hinge `[-1.46,1.095,0]` at the upper forward edge of the rear deck. The luggage area was absent: only a plain neutral five-sided tray was added,20vertices/10triangles, using existing upholstery material. No fake luxury cargo area. Both moving skins use local double-sided rendering; they remain intentionally thin illustrative panels.

New actual editable source: `tools/3d/vehicle-openings/source/toli-primary-openings.gltf`; reproducible builder `tools/3d/vehicle-openings/build.py`; actual export under `exports/`. Descriptor `src/experimental/spatial/vehicle-release.json` links new source SHA, runtime and explicit prior interactive rollback. Prior interactive source, authoring record and GLB remain byte-identical. Builder reads that frozen authoring record and repacks live buffers/16-bit indices; it does not overwrite the rollback.

New runtime: `models/vehicles/toli-primary-openings.1abe2f61e8bf465d35b5c362af015d86496aba09667a94d73208a4e27506537a.glb`. SHA256 is the full fingerprint in the filename. A regression hashes every closed world-space original triangle at1µm quantization against the original vehicle, excluding only the explicitly added neutral tray. All original surfaces match. Nine seam vertices were duplicated for safe ownership; no exterior triangles added/deleted.

## Bonnet / boot / existing interactions

Bonnet: **58° /750ms**, Z axis at the real windscreen-side hinge. Boot: **−65° /750ms**, opposing rear-deck hinge. Restrained smoothstep, reversible from current angle, immediate reduced-motion state. Actual visible mesh click opens and closes each; semantic Bonnet/Boot buttons mirror the same controller. Rear boot click/close was checked in the source and packaged route; portrait mesh taps worked at all five widths. No broad invisible bonnet/boot hotspot was added.

Engine bay and simple existing cabin preserved. Front/rear/side inspection and world bounds show no obvious windshield/roof/workshop/secondary collision. Bonnet open visible boundsX4.1645–5.8355/Y.9740–2.3654/Z−19.8775–−18.8914; bootX4.1598–5.8402/Y.9829–1.9470. These are model-space/world-space desktop checks, not physical-device collision evidence. See `geometry-audit.json` for exact boxes.

Front-left/right doors retain independent58°/650ms hinges, handles and mirrors. Rear doors remain intentionally unsupported. Paired headlights retain warm-white optics/two bounded shadow-free lights. One shared state owns all five actions; real part tags use the existing occlusion-aware raycaster and8px/700ms tap gate. Existing12mm front-door assistance is retained. A drag from a part does not activate it; no new panel download or extra vehicle state engine.

## 360 view and accessibility

Default Vehicle camera/framing remains approved, including desktopFOV54 and existing portrait policy. **360° view** is deliberate; **Exit360° view** restores the authored camera smoothly, preserving current vehicle states. Vehicle exit resets all five actions and360 mode. Standard disposal restores fresh defaults. Context recovery also resets mode/actions and restores authored camera; dedicated regression verifies this within1e−12 position distance.

One existing renderer/context. Unwrapped horizontal azimuth supports multiple full rotations without a rear stop; no workshop rotation. Orbit target `[5,.85,-18]`. Bounded elliptical camera path stays inside side cladding: X within2.4–7.6, Z within−21.5–−14.5; radius parameter3.1–3.5, nominal elevation input.75–.9rad, height capped5.35m. It smoothly rises near verified service-upright caps; no camera penetration through floor/car/walls seen in inspected arcs. This is a deliberately elevated inspection arc in a tight occupied bay, not walking/first-person/satellite navigation or a general physics system. Nearby columns can naturally occlude small portions at intermediate angles.

Horizontal/limited vertical pointer drag, restrained wheel zoom and two-pointer pinch handler. Gesture listeners/touch-action ownership exist only while inspecting and are released on exit/disposal. Four native **Front/Left/Rear/Right** presets follow the orbit arc instead of cutting through the car. Presets become immediate under reduced motion; manual orbit stays usable. Orbit does not update React on every angle in production or add URL/history entries. Existing DPR/AA/lighting strategy remains unchanged. Portrait and short landscape use fitted inspection FOVs for their usable viewport; authored default FOV is unchanged.

Native buttons provide labels, aria-pressed state, keyboard Enter and visible focus; at least44px targets. Keyboard bonnet/boot, enter/exit and rear preset were tested in the package. Automated reduced-motion/controller/preset tests pass; actual browser preference and TalkBack were not manually toggled. Pinch uses real two-pointer event logic and an automated gesture regression; the available browser tool did not provide a physical two-finger Android pinch. No physical touch result is claimed.

## All-open visual and responsive evidence

Actual source: `http://127.0.0.1:8174/Toli-2/?workshopLocation=vehicle#/3d-experience`.
Canonical package: `http://127.0.0.1:8175/Toli-2/?workshopLocation=vehicle#/3d-production-preview`.

Captured/inspected default; bonnet front3/4 and side; boot rear/rear3/4; both doors; all openings+lights; orbitfront/left/rear/right; portrait and landscape with actual UI. Screenshots under `tools/release-audit/vehicle-openings/browser/`. Source diagnostics are existing development-only diagnostics, absent from package images; no hidden panel/model replacement for capture. The existing simple illustrative interior and thin inner skins remain visible; no claim of a newly detailed mechanical vehicle.

**430/412/390/360/320×844 portrait and844×390landscape = EMULATED**. Every portrait width: bonnet and boot mesh actions succeeded; all five states stayed ON/OPEN; zero horizontal overflow; minimum44px controls. Orbit/presets remain usable and the primary stays inspectable above its sheet. Landscape review found overlapping camera buttons; corrected layout now keeps presets separate from the six action buttons, all44px or larger. Rear boot and front bonnet remain above the lower strip. Side views prioritize the primary; environmental secondary/cart may be partially cropped/foreground as the real camera moves around them, without moving their objects. No physical Android/tablet/TalkBack/thermal/FPS claim.

## Performance and metrics

| Actual source view/state | Draw calls |
| --- | ---: |
| Default closed |101|
| Headlights ON |101|
| Bonnet OPEN |101|
| Boot OPEN |101|
| Both front doors OPEN |101|
| All supported openings + lights ON |101|
| 360 front |88|
| 360 left side |88|
| 360 rear |87|
| 360 right side |86|

Maximum in this state matrix101; counts vary with visible workshop batches during continuous orbit. One context. Prior complete Vehicle100; added boot/tray ownership costs one net visible call in the authored view. These measurements are actual renderer counters, not FPS or GPU-time claims. Cold settled Overview at1024×720 measured27 calls, primary idle; historical baseline26 and an early transient1280sample31 are not represented as constant startup cost. Workshop bytes, startup loading owner and authored Overview camera are unchanged. Returning to Overview after loading Vehicle can have different visible retained batches; it is not a cold-start benchmark.

| Primary asset | Before | After |
| --- | ---: | ---: |
| Bytes |4,285,876|4,276,640|
| Triangles |192,105|192,115|
| Vertices |125,334|125,363|
| Meshes |60|62|
| Materials |12|12|
| Textures |0|0|

No higher quality/DPR/postprocessing/shadow passes. No new renderer, context, external model or dependency. Original engine bay, doors, glass, lamps and wheels remain. Wheels/backfaces/glass/mirrors/rear body were visually inspected from both sides and rear within the supported bounds.

## Lifecycle, network and parity

Source browser:20toggles each for headlights/left/right/bonnet/boot, plus multiple full manual rotations. Recorded unwrapped azimuth4.712→19.272radians with all five states unchanged; camera gesture did not trigger parts. Native mobile-size drag and wheel zoom recorded. Unit stress verifies stable object/light counts; this is not a GPU heap/GC plateau certification.

Final exact package: **10/10 Vehicle reentries**, all six states false/one spatial canvas on every return; **5/5 Standard cycles**, zero spatial canvases in Classic and one on return, all openings/lights/mode reset. Source unit tests also cover Services exit, entry/exit360 preserving states, reduced motion, optional enhancement failure isolation and context recovery. No forced destructive physical GPU testing.

Final fresh browser trace: workshop1/primary0at startup, workshop1/primary1after Vehicle, all cycles and interactions. Zero duplicate current workshop/primary requests, zero failed requests, no separate bonnet/boot/secondary downloads. Network trace is frozen before independent parity GETs. Production warning/error console empty. Development React Router future notices are distinguished from production output.

Both hosts serve identical workshop and primary bytes matching source/public SHA and declared sizes. Final served manifest identity matches toli-03ea962c2a2df6ceb9b08c5e. Normal source review preceded canonical packaging. Intermediate14ddcandidate evidence is historical implementation evidence; final-release lifecycle/network files are explicitly labeled final.

## Regression, protection and release

Production build PASS; application TypeScript PASS; Node TypeScript PASS; QA/review TypeScript PASS; lint PASS. Final full suite: **502tests /67files PASS** (see final regression logs). New tests cover both panel states/durations/retarget/reduced motion, actual editable source/rollback, synchronized controls, full orbit/limits/presets/gestures/clearance, state preservation, reset and context recovery. Initial recovery test caught only floating-point equality7.299999999999999versus7.3; now asserts distance below1e−12, retaining the actual camera requirement.

Protected existing source/assets/config/workflow audit: **1,043 checked;1,034 unchanged;9 intentional integration/test changes;0 missing/unexpected**. All traditional homepage/Hero/Navbar/logo/Hero cars/Inside TOLI, workshop source/runtime, detailing, secondary, default camera definitions and previous interactive source/runtime remain unchanged. Canonical release output advances separately under Stage3B policy; previous verified eae package validates, with full archived-file protection evidence. No new package manager/dependency/production route/hosting change.

Final new release: **toli-03ea962c2a2df6ceb9b08c5e**, canonical preparation and independent validation PASS. Previous **toli-eae3a1c9fcfd44e187e0056c** retained. Candidate14ddwas superseded by a small camera context-recovery correction before final handoff; never deployed. Current exact candidate requires NEW physical Android validation. Earlier LAN/phone handoffs do not clear this new behavior.

INTERACTIVE BONNET = PASS

INTERACTIVE BOOT = PASS

360° VEHICLE INSPECTION = PASS

COMPLETE INTERACTIVE VEHICLE = PASS

PHYSICAL ANDROID VALIDATION = REQUIRED

PRODUCTION MIGRATION = NOT AUTHORIZED
