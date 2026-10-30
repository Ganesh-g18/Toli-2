# Requested physical car-position swap

The user requested exchanging the two cars and explicitly selected **Recenter on red in its new bay** for the opening camera.

Candidate: `toli-e3ffeea3da3a0c90eb769413`. Retained previous: `toli-ac5606593db19031c64d2032`. Production remains protected; no production migration was authorized or performed. Physical Android validation remains REQUIRED.

## Placement and camera

Red primary root is now `[1.1607834517955782, 0, -14.782865524291992]`, the previous grey vehicle's ground-center position. Grey's aggregate center is now `[5, .7699267934, -18]`, in the previous red bay. Grey retains its original grounding, dimensions, geometry and charcoal materials. The primary's approved red material, real hinges and all components are unchanged. Neither car moves during orbit or walking; no new vehicle is added.

Default presentation, all five camera presets and 360° use the red-only target `[1.1607834517955782, .7526504632714146, -14.782865524291992]`. Opening framing is recentered as explicitly requested. Grey is environmental and non-interactive. Existing outside-Vehicle authored workshop poses are restored by the established context policy.

## Navigation and interactions

Standing walk start, focus, front/left/rear/right viewpoints and bounded floor were moved to the new bay. Supported floor: x=−1.7…4.1, z=−21.2…−9.7, with existing .22m personal-space margin, 1.62m eye height and .85m/s speed. Existing world-space columns, actual grey mesh bounds and detailing collision remain authoritative. No physics library or visible geometry was added.

Both source and package completed front→left→rear→right→front with headlights, both front doors, bonnet and boot open. Full source presets target the relocated red vehicle. Packaged 360° drag, all component controls and reset were verified. All-open geometry audit confirms no car intersection and about .893m lateral separation. A browser focus pause cancelled one source guided walk safely; resuming the viewpoint control completed the route. The audit also checks closed and all-open routes against actual transformed GLB bounds.

## Responsive and resources

Source and package checked at 430, 412, 390, 360, 320 ×844 and 844×390 landscape. Red remains the inspection focus and no horizontal overflow was observed. Grey may be cropped in the recentered view. One renderer/context, primary and workshop are preserved. No asset binaries or vehicle geometry were changed. Package loop retained one canvas and one control group. No production console warning/error was observed.

## Validation and protection

Production build, app/node TypeScript, QA TypeScript, lint and release validation PASS. Complete suite: **582 tests / 71 files PASS**, 135.53s. Results are recorded in `tools/release-audit/car-swap/`. Position-dependent tests were updated to assert the new bay and measure drag direction relative to the actual orbit target instead of the old x=5 origin. The first full run exposed those stale expectations; the final full rerun preserves the assertions at the new location.

Exact protected-file audit: **1,194 checked, 1,183 unchanged, 11 intentional changes, zero missing; all 165 retained-package files unchanged**. Previous-candidate retention, source/package asset parity, geometry clearance, source/preset diagnostics, packaged walking loop, responsive screenshots and console/network evidence are retained in that folder. The new canonical release and previous package validators pass.

Physical Android touch, orientation, focus recovery and GPU performance remain a required release gate. Emulation does not close it.
