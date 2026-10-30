# Dark Garage Hero — reference-driven treatment

Target verified: `/home/thunder/shared/tolimotors-main1/toli-static-website`.
Development preview: http://127.0.0.1:8190/Toli-2/
Production preview: http://127.0.0.1:8200/Toli-2/
No production deployment performed.

## 1. Reference matching

Reference image successfully inspected: YES.
Authoritative shared image: https://chatgpt.com/s/m_6ae4a5872a6081918d946476d8e9acc6 — Dark Garage Hero: Toli Motors.
The browser rendered the actual generated image (1672×941 source, displayed as a 480px-wide preview). Its appearance was inspected, rather than inferred from its title. reference-inspected.png records that image; reference-comparison.png places it beside the implemented desktop Hero. A source/artwork audit and reference-checklist.md were completed before implementation.

Reference structure: red navbar; dense dark ceiling; white industrial fixtures and integrated red strips; large central identity; several vehicles within a photoreal service-bay montage; four dark photograph cards; small lower slogan and location line.

Implemented: preserves the existing red navbar and cinematic full-Hero structure while adding graphite/charcoal room materials, silver structural highlights, integrated red lighting, genuine TOLI roof photography, dark service panels, white/red slogan and dark contact strip. Mobile retains the approved vertical layout, compact two-column cards and portrait environment rather than shrinking the desktop room.

Fidelity is PARTIAL. Deliberate remaining differences:
- The protected existing GT is larger and differently positioned than the reference montage. It is not replaced and no reference vehicles are added.
- The original approved horizontal black/red logo is retained on a neutral contrast surface; the reference has a different stacked emblem and red/silver wordmark. No recoloring or recreation of the official art was performed.
- Genuine TOLI photography and retained illustrative room geometry differ from the reference's photoreal generated facility. Cabinet/lift detailing remains partly illustrative.
- Existing vector service icons remain instead of copying unapproved reference card photographs.
- The approved large slogan, existing care heading and functional website controls require more vertical space than the advertisement.
- Unconfirmed Telugu lettering, GSTIN, alternate phone/address and cashless promises are not published.

Three focused visual review passes:
1. Structure — pass-1-structure.png: compared hierarchy and retained car/card/branding proportions. No foreground movement introduced.
2. Materials and lighting — pass-2-materials.png: reviewed graphite depth, metal equipment, red beam/column lighting and floor bounce. Moved the supporting genuine photo toward the ceiling, reduced fixture halo intensity and restrained the red bounce.
3. Fine detail — pass-3-desktop.png and pass-3-mobile.png: reduced dominant wire-line contrast, checked typography, neutral logo contrast surface, card borders, crop, caption readability and mobile controls. Final responsive screenshots cover both themes.

No exact pixel-match or overall fidelity PASS is claimed.

## 2. Hero background

The existing full-section environment remains position:absolute with inset:0 behind the content. All 26 measured theme/viewport combinations have identical Hero/environment bounds, no exposed page strips and no horizontal overflow.

Existing roof panels, trusses, structural columns, service-bay frames, rear shutters, cabinets, workbench, trolley, lift structures and perspective floor geometry are preserved in the dark SVG variants. Theme-specific material definitions provide deep graphite, charcoal, gunmetal, structural grey and silver. Red strips follow existing beams/columns instead of floating independently. Static red light pools and neutral floor bounce remain restrained; no mirrored car or artificial replacement shadow is added. Original contact-shadow artwork remains on the car asset.

The genuine project workshop photo supports the central roof/wall depth in dark mode, capped at 960px wide with an edge mask. The environment is still labeled ILLUSTRATIVE WORKSHOP SETTING. New architectural lighting is static, without blur filters, video or another renderer.

## 3. Hero car

Original asset preserved: YES. Position/scale preserved: YES. Animation preserved: YES. Existing behavior preserved: YES.

The actual existing Hero uses HeroVehicleLineup with its approved responsive picture fallback and CSS campaign-entry reveal. It has no manual vehicle-inspection controls or WebGL vehicle interaction in the static Hero; none were invented or silently removed. The independent interactive showroom is untouched.

Hero.tsx, HeroVehicleLineup.tsx, hero-vehicle-assets.ts, both original car images and existing motion/renderer code are byte-identical to the baseline. The dark styles target only the environment and approved HTML foreground surfaces. At 390×900 and 1440×900, before/after bounds for the car, heading, service cards, complete Hero and navbar are exactly unchanged (geometry-preservation.json). Car images loaded at every checked size. Existing reduced-motion behavior passed relevant tests.

## 4. Branding

Official artwork remains the same file, colors, aspect ratio and transparency. The neutral CSS surface behind it provides contrast without altering the pixels. Subtitle remains MULTI BRAND CAR WORKSHOP. ANANTAPUR / SERVICE · REPAIR · CARE remains inside the Hero. The exact slogan remains Your Car, Our Care. Drive with Confidence., with pearl-white main text and bright-red emphasis. No slogan was moved into the navbar.

Telugu text remains omitted because the exact spelling has not been explicitly confirmed. Approved existing phone/address data is retained; reference-provided alternate business details and GSTIN are not guessed.

## 5. Service cards and actions

All four actions are preserved: Insurance claim enquiries; Electrical & Mechanical; Denting & Painting; Complete Vehicle Inspection. Dark treatment uses graphite label panels, metallic upper surfaces, thin red borders, red icons, pearl-white typography and restrained shadows. No eligibility, insurer relationship or cashless availability promise is added.

Keyboard Enter opened the shared request from Electrical & Mechanical. The selected Automobile Services topic remained selected and populated after switching from light to dark inside the popup. The other three card actions opened the same dialog. All six chapter buttons selected their matching section after scroll completion. Production header Book Service opened the existing Service request dialog; the 390px production mobile menu also opened Request Service. No form submission was sent. See actions.json, mobile-navigation.json and production.json.

## 6. Responsiveness and themes

Both themes captured and inspected at:
320×900, 360×900, 390×900, 412×900, 430×900;
768×1024 and 1024×768;
1366×768, 1440×900, 1920×1080, 2560×1440;
ultrawide 3440×1440 and phone landscape 844×390.

All 26 layouts: complete background coverage, no horizontal overflow and loaded Hero images. Dark mode uses desktop/mobile dark material variants. Light mode still uses the original light SVGs and all original light selectors/assets; screenshots show the existing bright design retained. A light choice survived page reload. Theme resolution, local preference storage and system-preference behavior are unchanged; site-theme.ts was not edited. The default remains the existing stored/system preference rather than forcibly overriding the user's choice.

Navbar red gradient, official pill, enlarged silver car and navigation actions remain unchanged. Dark inactive chapter styling and active red styling remain the existing implementation, with navigation above the background. New dark-theme focus outlines remain visible.

## 7. Performance and network

Dark desktop SVG: 16,692 bytes raw / 1,967-byte local gzip estimate.
Dark mobile SVG: 10,892 bytes raw / 1,524-byte local gzip estimate.
A matching dark environment replaces the light environment resource when dark is selected. Switching viewport/theme can fetch the corresponding variant. The original photo, logo and vehicle images are reused. No duplicate vehicle, new library, model, background video, extra canvas renderer or continuous animation was added. Gzip figures are local estimates, not measured transfers; LCP/FPS were not benchmarked.

The production background's hashed dark SVG was observed as a loaded CSS image resource. The car image loaded, the Hero contains zero canvases, header booking works, and production warning/error console capture is empty. See production.json and performance.json.

## 8. Regression

Production build PASS (existing utility/bundle-size advisories remain).
TypeScript app, node and QA configurations PASS.
Lint PASS.
Relevant automated tests PASS: 56 tests in 6 files, covering Hero, reference Hero, vehicle lineup, navbar motion, workshop protection and site theme.
Desktop/mobile visual checks PASS for usability/coverage; reference fidelity remains PARTIAL.

## 9. Protection and modified files

Changed existing implementation:
- src/components/journey/hero-caption.css — appended dark-only Hero treatment.

New assets:
- src/assets/hero/workshop-depth-dark.svg
- src/assets/hero/workshop-depth-mobile-dark.svg

Evidence: docs/dark-garage-hero/.

No other existing static files changed. Hero component, car source/assets, navbar, official artwork, light environment files, theme logic, Service Request, Gallery, TOLI AI, tests and checksum fixtures remain unchanged.
Independent 3D website: all 1,573 audited files unchanged, no additions/removals.
Original project: all 3,128 audited files unchanged, no additions/removals.
The checksum audit excludes dependencies and generated build outputs. See protection.json.

## Final status

DARK GARAGE HERO RECREATION = PARTIAL
REFERENCE VISUAL FIDELITY = PARTIAL — actual reference inspected; differences documented above
FULL BACKGROUND COVERAGE = PASS
EXISTING WORKSHOP DETAILING = PRESERVED
EXISTING HERO CAR = PRESERVED
NAVBAR = PRESERVED
RESPONSIVE DESIGN = PASS
STATIC WEBSITE REGRESSION = PASS
3D WEBSITE PROTECTION = PASS
PRODUCTION DEPLOYMENT = NOT PERFORMED
