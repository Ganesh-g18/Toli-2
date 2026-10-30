# Centered red car and human walk-around — 26 October 2026

Candidate: `toli-d1a6a58438300e8f8a8438cb`.
Retained previous candidate: `toli-e3ffeea3da3a0c90eb769413`.
Both complete-package validators pass. No production migration was performed.

## Red car centering

The approved GLB's yellow floor geometry was inspected as disconnected marking components. Inner longitudinal edges are X −3.0104 and +1.3136. Adjacent cross-bay inner edges are Z −18.0303 and −11.9491. The usable display segment is their rectangle, not the entire building or two-car bounds. The measurements are rounded to 0.0001 presentation units; these are model measurements, not a survey of the real workshop.

- Old grounded root: `[1.1607834517955782, 0, -14.782865524291992]`.
- New grounded root / main-bay center: `[-0.8484, 0, -14.9897]`.
- Translation: `[-2.009183451795578, 0, -0.206834475708008]`. Negative world X is rightward in the opening view. Physical rightward translation is 2.00918 units; the small depth adjustment centers the footprint between adjacent bay marks.
- Closed footprint: X −1.95315…+0.25635, Z −17.42470…−12.55470. Equal lateral clearance to the lane's inner paint edges: 1.05725 each. Equal front/rear clearance to bay marks: 0.60560 each.
- All-open footprint: X −2.69022…+0.99342. Clearance to each lane edge: 0.32018; these paint lines are not collision walls. Continuous walking can use the adjacent clear floor.
- All-open lateral clearance to nearest structural-column proxy: 2.07658; to detailing equipment: 5.19158. No car/equipment intersection.
- Orientation, scale, wheel grounding, paint, asset bytes and opening mechanisms are unchanged.
- `mainDisplayArea` derives the single authoritative `bayPosition`. Default camera, orbit target, reset, guided stops, walk start/boundaries, picking and live opening/body bounds all follow it. The camera now targets the actual red car center.

## Grey car

Grey remains at ground-center `[5, 0, -18]`; mesh bounds center `[5, 0.7699267934076488, -18]`. Its previous side-bay placement and four existing mesh objects were not changed. Closed red/grey lateral separation is 3.63944; all-open separation is 2.90237. No second swap or new vehicle geometry.

## Human walk-around

Standing eye height 1.62, speed 1.35 units/second; approximate metre scale is consistent with the inherited 4.87-unit passenger car. Camera is ground-constrained with no jumping, shake, head bob or flight. Exponential response uses acceleration rate 8/s and braking rate 24/s, analytically integrated across frame rates. Tests compare 30/60/120 Hz, normalized diagonal speed, and braking below 6 cm of travel. Hitch integration caps at 50 ms to prevent large jumps.

W/S move forward/back; A/D strafe relative to horizontal camera heading. Arrows and compact semantic touch controls are alternatives. Drag right/left looks right/left, up/down looks up/down, pitch clamped −0.60…+0.35 radians. Guided paths no longer turn the camera automatically. Look at car is an explicit action. Escape exits walking and restores focus to Walk Around; Exit Walk and Reset View remain keyboard/touch accessible. Default, orbit and walking have exclusive controller ownership.

Collision uses a conservative 0.22-unit horizontal character radius, body and current/reserved opening AABBs, actual grey/detailing bounds, structural-column proxies and inset floor limits excluding walls and major fixtures. Movement substeps are at most 0.035 units; X/Z sliding retains movement along obstacles. No physics dependency was added. The complete front → left → rear → right → front loop passed in actual source and package with all panels open. Human-height walking remains optional.

## Vehicle interactions

Headlights, both doors, bonnet and boot pass semantic-control tests and packaged visual checks. A real bonnet click while walking toggled it; dragging across it did not toggle another action. Picking retains its 3.2-unit distance limit, and opening a panel refuses to intersect the walking character. Full unwrapped orbit exceeded 2π about the stationary red car. Reset returns the centered presentation and closes panels/lights. Existing focused tests cover picking, touch/mouse separation, hinges, input disposal and reduced motion.

## QA and limits

- 585 tests / 71 files pass (baseline 582; three movement regression cases added). Full run 149.62 seconds.
- Production build passes (9.13 seconds); application, Node and QA TypeScript and lint pass.
- Source `#/3d-experience` and packaged `#/3d-production-preview` were independently exercised; identical GLB bytes/hashes verified.
- Desktop: full loop, native mouse direction, W/S direction, physical bonnet pick, drag/tap distinction, reset, >360° orbit, ten repeated walk/orbit cycles, Escape/focus restoration.
- Portrait emulation 430/412/390/360/320 × 844 and 844 × 390 landscape passes on source/package: no horizontal overflow, one canvas, walking controls ≥44px. Screenshots inspected. These are desktop emulations, not physical Android results.
- Standard View removes the spatial canvas; return creates one fresh canvas in presentation mode with all panels closed and lights off.
- Browser blur/visibility input release is covered by automated lifecycle tests. An actual Android app-background/foreground cycle has NOT been performed.
- Fresh matching 1280×720 samples: before/after 97 draw calls, 98 geometries, 11 textures, one context. Single render-CPU observations were 6.1ms before / 5.1ms after; these are observations, not a benchmark claim. Subsequent perspectives warmed three additional existing geometries; repeated mode cycles were stable. Render frames stopped when input/animations stopped.
- Packaged console warnings/errors: none. Package HTTP errors: none.
- Baseline audit: 1,365 files checked; 1,189 unchanged, 11 intentionally edited source/test files. Two release-gate documents outside that baseline were also updated. The 165 removed files belong solely to the older candidate pruned by the established current/previous retention policy. All 171 files of the immediately previous candidate remain unchanged. Traditional homepage/Hero/Navbar, logo, workshop geometry, detailing station and vehicle binaries remain unchanged.

Evidence: `tools/release-audit/human-walk/`, including floor markings, actual asset geometry audit, checks, full test output, candidate build, protected hashes, asset parity, browser input/route/resource observations and screenshots. No remote upload, production activation or real-device approval is claimed.

## Final status

RED CAR EXACT CENTER = PASS (measured model display area, 0.0001-unit precision)

GREY CAR SIDE PLACEMENT = PASS

HUMAN-LIKE WALK AROUND = PASS (desktop and mobile emulation)

360° INSPECTION = PASS

VEHICLE INTERACTIONS = PASS

PHYSICAL ANDROID VALIDATION = REQUIRED

PRODUCTION MIGRATION = NOT AUTHORIZED
