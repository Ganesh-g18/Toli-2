# Fixed red vehicle and optional workshop Walk Around

Candidate: `toli-3d0be34850a66263ebdf174b`. Previous retained: `toli-192890d4a5ba433505da05b1`. Candidate only; production migration is not authorized. Physical Android validation is REQUIRED.

## Center vehicle

The approved red primary remains fixed at `[5, 0, -18]`. The camera moves; neither the car nor workshop rotates to simulate walking. Entry, Return to Vehicle and Reset restore the approved centered front three-quarter presentation (54° FOV). Approved geometry, paint (#921824, roughness .30, metalness .45, clearcoat .55), hinges and lighting are unchanged.

## Walk Around and navigation

Walk Around deliberately enters a separate camera controller; Return to Vehicle exits it. Standing eye height is 1.62m above the workshop floor, at 0.85m/s with restrained damping. WASD/arrows move forward/back and strafe. Drag looks without pointer lock. Semantic movement and look buttons and optional guided viewpoints support keyboard and touch use. Guided routes physically traverse collision-checked floor paths rather than teleporting. Manual input cancels a guided path.

The bounded floor is x=2.15…7.9, z=-24.4…-12.8, with .22m personal clearance. Front, left, rear, right and detailing viewpoints are reachable. Walk FOV is 65°, or 80° on narrow portrait screens; height remains fixed. No jump, crouch, flight, sprint, avatar or game HUD is introduced. Locations and all existing semantic destinations remain available.

## Collision and interactions

The closed primary body, actual detailing and secondary mesh bounds, structural columns and floor boundary constrain movement. Reception, walls and unfinished areas are excluded by the supported floor envelope. Secondary car remains environmental only. Non-rendered proxies add no visible scene geometry.

Opening volumes use current component bounds plus requested open endpoint bounds. Live volumes follow animation. A panel cannot open into the observer: the polite message asks them to step back. Doors retain 58°/650ms behavior; bonnet/boot retain existing hinges and timing. A route requested while a panel is still closing can be temporarily blocked; retry after closure or use manual movement.

Headlights, both front doors, bonnet and boot remain operable. Physical mesh picking/hover is limited to 3.2m in Walk Around; semantic controls remain available independently for accessibility. Far mesh activation was rejected, medium headlights toggled, and close headlights/bonnet worked. Native left-door mesh activation was also verified. Rear doors remain unsupported.

## 360°, reset and accessibility

Authored presentation, orbit and walk have exclusive input ownership. 360° drag direction, bounded zoom and existing pinch behavior are preserved. Switching modes preserves component state; Reset closes everything, turns lights off and restores authored presentation. Vehicle exit disposes walk inputs and resets state. Visible focus, semantic buttons, live status, keyboard look controls and reduced-motion behavior are retained. Reduced motion removes unnecessary camera easing without removing the environment or manual walking.

## Desktop and emulated mobile evidence

Source route `#/3d-experience` was verified first, then canonical package `#/3d-production-preview`. Ten full live source cycles completed front→left→rear→right→front→return. The final immutable package completed another full loop with one canvas and one controls group. Native W/A/S/D, arrows, drag look, component controls, mode transitions and reset were checked.

Source mobile viewport checks: 430, 412, 390, 360 and 320 ×844, plus 844×390 landscape. Every source width exercised all four movement controls and drag look. Package checks repeated the same widths and landscape with forward control. No horizontal overflow; movement controls meet 44px height and width (smallest source width about 54.8px). Portrait and landscape controls stay compact at the bottom, with safe-area offsets. These are desktop-browser viewport emulation and automated touch-pointer checks, not physical Android touch evidence.

Explicit native collision attempts stopped before primary body, open left/right doors, bonnet, boot, column, detailing trolley, side/front/rear boundaries. The rear boundary prevented approach into the secondary/reception region. Screenshots include all sides, quarter angles, open components, headlights, all-open state, detailing, environmental secondary car and responsive views. See `tools/release-audit/vehicle-walk/browser/`.

## Performance and lifecycle

One renderer/context, workshop and primary vehicle. No new external assets or visible geometry. Default draw calls remain 100; route-arrival snapshots span 80–100. Completed source cycles stabilize at 101 cached geometries and 11 textures. Fifty arrival CPU render samples had median 2.7ms and maximum 3.9ms; these are CPU snapshots, not continuous GPU/FPS measurements. Full loops were inspected for jitter and progressive slowdown; no slowdown observed. DOM projection is skipped during Vehicle movement and development diagnostics are throttled to 4Hz, avoiding per-frame React state/layout work. Production has no diagnostic per-frame callback updates.

Standard View while walking removed the spatial canvas (zero remaining); returning to 3D created one fresh canvas and centered default with all parts closed. Tests verify blur/hidden/pause/disposal clear held keys, pointer state and movement. The in-app browser kept document.hidden=false during a tab-switch attempt, so that attempt did NOT validate real OS background/foreground behavior. Physical-device background/foreground and stuck-key behavior remain a release gate.

Package console warnings/errors: zero. Server log before independent parity requests: no HTTP errors; workshop and primary GLBs each requested once across the observed session including Standard View return (browser cache retained). Initial startup deferred the primary asset. Source/package workshop and primary bytes and SHA-256 match exactly.

## Regression, protection and release

Production build, app/node TypeScript, QA TypeScript and lint PASS. Full final suite: **582 tests / 71 files PASS**, 133.74s Vitest duration. Final canonical build PASS (7.02s). Current and previous release validation PASS.

Exact baseline audit: **1,061 core files checked; 1,054 unchanged; seven intentionally changed; zero missing**. The seven existing changes are scene integration, SpatialExperience, VehicleControls, spatial.css, object-interactions and two related tests. Four new source/test files implement/test walking. All **172** baseline files in the previous retained package match their original hashes. Primary/workshop assets, editable geometry/materials, logo, secondary/detailing, traditional homepage, Hero, Navbar and Inside TOLI remain protected. Evidence: `tools/release-audit/vehicle-walk/`.

Canonical release preparation retained the previous package. Both package validators pass. No production migration or deployment was performed.

## Physical Android gate

Validate this exact candidate on real Android: hold/tap movement; one-finger look and component taps; gesture conflicts; full loop and open-panel collision; 360↔walk switching; all five portrait widths as applicable; real orientation/browser bars/safe areas; keyboard if available; background while moving/held input and foreground recovery; Standard View disposal/re-entry; 10 repeated cycles; real GPU frame pacing, memory and thermal behavior. Record device/OS/browser, candidate ID, results, console and evidence. Emulation does not close this gate.

CENTERED RED VEHICLE = PASS
SHOWROOM WALK-AROUND = PASS
VEHICLE INTERACTIONS = PASS
360° INSPECTION = PASS
PHYSICAL ANDROID VALIDATION = REQUIRED
PRODUCTION MIGRATION = NOT AUTHORIZED
