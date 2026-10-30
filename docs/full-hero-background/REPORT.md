# Full-Hero workshop background coverage

Verified project: `/home/thunder/shared/tolimotors-main1/toli-static-website`.
Preview: http://127.0.0.1:8190/Toli-2/
Production preview: http://127.0.0.1:8200/Toli-2/
No deployment performed.

## Background coverage

Top PASS. Bottom PASS. Left PASS. Right PASS. All four corners PASS.

The environment was formerly inside the content grid, covering only the car row: 1228.41×345.59px at a 1440px viewport, and 344×240px at a 390px viewport. It is now a direct child of the Hero section with position:absolute, inset:0, width/height:100%, z-index:0 and pointer-events:none. Foreground content remains in its existing isolated grid above it. The environment no longer inherits the centered content width or car-row clipping.

Every measured environment rectangle exactly equals its Hero rectangle, including the complete lower content area. The rendered ceiling reaches the top corners, the service-bay structures continue along both edges, and the perspective floor reaches the bottom corners behind the cards, slogan, actions and contact strip. The fixed numbered rail sits above the environmental layer with its original contrast and interaction styling.

## Workshop detailing and continuity

Recomposed the existing project-native illustrative environment into one continuous room: upper industrial ceiling panels and receding trusses; suspended neutral LED fixtures; side walls with grey/red columns; distant rear shutters; asymmetrical side tool cabinets, workbench and lift structures; a central open service lane; continuous low-contrast perspective flooring and restrained red lane guides.

There are no repeated image tiles or pasted floor sections. The desktop SVG uses cover with preserved proportions and top anchoring, so ultrawide layouts keep the ceiling visible without stretching the structures. A separately proportioned mobile SVG keeps the ceiling, edge columns, compact side equipment and long foreground floor visible in portrait. Both assets fill the full environment with architectural/floor detail rather than relying on a gradient to hide gaps.

The genuine existing TOLI workshop photo remains a softly integrated, central supporting layer capped at 960px wide, rather than stretching the low-resolution photo over the entire section. Static localized white illumination keeps branding and copy readable. Steel-grey structure and restrained TOLI red share one neutral overhead lighting treatment. All environment additions remain explicitly labeled ILLUSTRATIVE WORKSHOP SETTING, not an exact architectural replica or machinery inventory.

## Hero car and foreground protection

Original vehicle assets, HeroVehicleLineup component, responsive picture/source set, car frame, scale, position rules, original contact-shadow artwork, CSS reveal animation, reduced-motion behavior and all interactions are unchanged. No camera or geometry changes, no vehicle substitution and no new renderer.

Before/after geometry at 390×900 and 1440×900 is identical for the car, heading, service cards and complete Hero. See geometry-preservation.json and before-layout.json. The only Hero component change moves the existing decorative environment outside the content grid. All approved copy, logo, cards and actions remain in their previous layout.

## Responsive visual QA

Both dark and light themes captured and inspected at:
- 320×900, 360×900, 390×900, 412×900, 430×900.
- Tablet portrait 768×1024 and landscape 1024×768.
- 1366×768 and 1440×900.
- 1920×1080 and 2560×1440.
- Ultrawide 3440×1440.
- Phone landscape 844×390.

All 26 theme/viewport combinations have full environmental coverage, zero horizontal overflow and loaded Hero images. Before screenshots are before-390.png and before-1440.png. The dark-*.png and light-*.png files show the entire Hero at each size, including the upper and lower corners. layouts.json records actual rendered measurements. Source/CSS inspection was supported by browser screenshots, not used as the sole coverage gate.

All six chapter controls were clicked and their matching selected states awaited after scrolling. Production header Book Service opened the existing Service request dialog. No submission was sent. production.json confirms the built background uses absolute positioning with inset 0, pointer-events none, a loaded car image and no console warnings/errors.

## Performance

Desktop environment SVG: 16,010 bytes raw / 1,921-byte local gzip estimate (previous decorative SVG: 12,222 bytes raw).
Mobile environment SVG: 10,290 bytes raw / 1,484-byte local gzip estimate.
Only the matching CSS background is selected on an initial viewport load; resizing across the mobile breakpoint can request the other asset. Existing photo and vehicle image bytes are unchanged. No additional model, renderer, JavaScript dependency, continuous animation, expensive blur or saturation filter was introduced. The new SVGs are static and need no motion exception. Gzip sizes are estimates, not measured transfers; no LCP/FPS improvement is claimed. See performance.json.

## Modified files and protection

- src/components/Hero.tsx — reparent existing environment layer directly to Hero.
- src/components/journey/hero-caption.css — replace car-row background treatment with full-section coverage rules.
- src/assets/hero/workshop-depth.svg — continuous desktop environment.
- src/assets/hero/workshop-depth-mobile.svg — new portrait environment.
- src/test/hero-reference.test.tsx — guard the environment's section-level parent so the nested-panel bug does not recur.
- src/test/fixtures/separation-protected.json — refresh only the authorized Hero component checksum; all other protected entries retained.
- docs/full-hero-background/ — evidence and report.

Navbar, official logo, enlarged silver navigation car, Hero car artwork/animation, Gallery, Service Request, TOLI AI and other website implementation remain unchanged. The independent 3D website has all 1,573 audited files unchanged with no additions/removals. Dependencies and generated build outputs are excluded from the audit. See protection.json.

## Validation

Production build PASS (existing utility/bundle-size advisories remain).
TypeScript app, node and QA configurations PASS.
Lint PASS.
Relevant automated tests PASS: 51 tests in 5 files covering Hero, reference Hero, vehicle lineup, navbar motion and workshop protection.
Responsive browser QA PASS: all 26 combinations.
Production console warning/error entries: none.

## Final status

FULL HERO BACKGROUND COVERAGE = PASS
WORKSHOP VISUAL CONTINUITY = PASS
HERO CAR PRESERVATION = PASS
RESPONSIVE COVERAGE = PASS
STATIC WEBSITE REGRESSION = PASS
3D WEBSITE PROTECTION = PASS
