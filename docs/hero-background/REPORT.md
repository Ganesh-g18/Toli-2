# Hero workshop background — realism and detail pass

Verified target: `/home/thunder/shared/tolimotors-main1/toli-static-website`.
Preview: http://127.0.0.1:8190/Toli-2/
Production preview: http://127.0.0.1:8200/Toli-2/
No deployment performed.

## Background

Retained the approved reference-inspired Hero composition. The existing genuine TOLI workshop photograph (gallery-2.webp.960.webp) already shows roof trusses, industrial panel walls, red columns and perspective floor lines. Its crop now favors the ceiling and its opacity is raised from .35 to .46 on desktop (.39 on mobile). The former saturation filter is removed. Restrained edge and top fades keep the scene integrated with the pearl-white Hero.

A new project-native decorative SVG adds illustrative roof beams, receding ceiling lattice, service-bay columns, distant shutter rhythm, neutral overhead fixtures, restrained red structural accents, left cabinets/workbench/inspection trolley and right lift/storage silhouettes. Geometry stays at the side edges; the central car area remains open. It is visibly labeled ILLUSTRATIVE WORKSHOP SETTING and makes no machinery-ownership or exact-replica claim.

Floor: low-contrast perspective lines, subtle red bay guides and a gentle epoxy/concrete gradient. The car retains its original contact-shadow artwork. No mirrored car, extra car shadow or displaced geometry was added. Neutral overhead highlights, side illumination and rear atmospheric depth use static gradients without blur filters, bloom, fog or neon.

Depth order: genuine photograph/background gradients; decorative architectural/equipment layer; soft integration gradients; unchanged existing car above the environmental layer. Mobile crops the wide decorative layer to its central ceiling region, removing dense peripheral equipment while keeping the genuine workshop atmosphere.

## Existing Hero car and content

Hero.tsx, HeroVehicleLineup.tsx, vehicle asset registry, both campaign images and all original motion/style definitions are byte-identical to the start of this task. The existing Hero is a responsive picture with CSS reveal, not the independent WebGL showroom. No car geometry, camera, position, responsive frame, handler or rendering mechanism changed.

Measured desktop (1440×900) and mobile (390×900) before/after: exact same bounding rectangles for car, heading, cards and entire Hero. See before-layout.json and after-layout.json. Hero height is unchanged. Branding, slogan, service cards, subtitle, contact strip and numbered controls remain in their approved layout.

## Visual evidence and responsive QA

Before screenshots: before-1440.png and before-390.png.
After full Hero: dark-*.png and light-*.png.
Detail crops: background-detail.png, left-bay.png, right-bay.png, ceiling.png and floor-contact.png.

Both themes checked at 320, 360, 390, 412, 430, 768, 1024, 1280, 1440 and 1920px. All 20 layouts have no horizontal overflow and all existing Hero images are loaded. Extra checks: tablet portrait 768×1024, tablet landscape 1024×768 and phone landscape 844×390, with no horizontal overflow. Measurements are recorded in layouts.json and orientations.json.

The previous desktop/mobile advertisements were already inspected in the immediately preceding reference Hero task. This pass preserves their pearl-white/red/grey palette, open central vehicle emphasis, industrial workshop context and lower service-card hierarchy. The genuine workshop photo was inspected again before editing. Background detail is now more visible than in the previous washed-out treatment. Deliberate limitation: equipment and supplemental architecture remain restrained vector illustration; this is not a photoreal architectural reconstruction or an exact survey of the facility.

## Performance and network

Added one static SVG asset: 12,222 bytes raw; see performance.json for local gzip estimate. Existing 95,996-byte workshop image and all vehicle images remain unchanged. One additional image resource; no JavaScript, libraries, renderer, model, animation or scroll-linked effects added. The removed image saturation filter reduces the filter work in this layer. Existing reduced-motion behavior remains unchanged; all new decoration is static.

assets.json records the existing logo, photo and responsive car assets plus the new CSS image resource. Built production CSS references the hashed SVG asset; it was successfully retrieved with zero failures. The existing photo also loaded, and the production Hero contains zero canvas elements. Production warning/error console entries are empty (production-console.json).

Limitations: no LCP, FPS or device timing benchmark is claimed because timing APIs were not exposed in the browser inspection scope. The asset-export tool duration in production-asset.json is an artifact export operation, not a page-load measurement. Visual and source checks show no new continuous rendering work.

## Protection and files

Changed existing implementation: src/components/journey/hero-caption.css (background-specific selectors only).
New asset: src/assets/hero/workshop-depth.svg.
QA evidence: docs/hero-background/.

All other existing static files, including Hero.tsx, official logo, navbar, enlarged silver navigation car, vehicle assets, Gallery, Service Request, TOLI AI, tests and checksum fixtures remain unchanged. Independent 3D website: all 1,573 audited files unchanged, with no additions or removals. Audit excludes dependencies and generated build outputs; see protection.json.

## Validation

Production build PASS (existing bundle-size/utility advisories remain).
TypeScript app, node and QA configurations PASS.
Lint PASS.
Relevant regression tests PASS: 51 tests in 5 files (Hero, reference Hero, vehicle lineup, navbar motion and workshop protection). The full 385-test suite passed in the preceding composition task; this CSS/SVG-only pass ran the relevant suite rather than claiming another full-suite run.
Responsive QA PASS. Production console and asset retrieval PASS.

## Final status

DETAILED HERO BACKGROUND = PASS
WORKSHOP REALISM = PARTIAL — genuine photo with clearly illustrative supplemental architecture/equipment
EXISTING HERO CAR = PRESERVED
REFERENCE VISUAL CONSISTENCY = PASS
RESPONSIVE DESIGN = PASS
STATIC WEBSITE REGRESSION = PASS
3D WEBSITE PROTECTION = PASS
