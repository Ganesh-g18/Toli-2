# Navbar refinement — larger silver car and brand caption

Verified target: `/home/thunder/shared/tolimotors-main1/toli-static-website`. The active traditional Index renders ExperienceNavigation; the preview serves the same edited source at http://127.0.0.1:8190/Toli-2/.

## Size and composition

The existing silver car maximum width is **185px → 218px (+17.84%)**. Artwork, proportions, wheel layers and animation keyframes are unchanged. The internal artwork slot is now 64px tall rather than 60px; the actual navbar remains **64px desktop / 56px mobile**. Its position stays centered in the same identity slot. The solid vehicle silhouette fits vertically; transparent fringe can overflow rather than being cropped. The lower fade was removed to retain the enlarged silhouette. No WebGL, dependency or new artwork was added.

The exact caption is **Your Car, Our Care. Drive with Confidence.** A shared BrandCaption component owns this text. On wide desktops (1280px and above), it sits closely beside the larger car in two readable lines, with 11px warm-white type, medium weight, restrained tracking and a subtle shadow. This associated placement avoids reducing the larger car or increasing navbar height to stack a caption beneath it. It has no background rectangle.

Below 1280px, the caption moves into the upper Hero eyebrow group under the existing location label. Its font remains 11px, including 320px screens. Only one caption is visible at each tested size. The car remains proportionally sized where the center slot has space; it yields on small tablet/mobile layouts to preserve functional actions. HELP remains available from the mobile menu. The exact `ANANTAPUR / SERVICE · REPAIR · CARE` label stays in the Hero and was not reintroduced into the navbar.

## Files changed

All paths below are inside the verified static project:

- `src/components/journey/BrandCaption.tsx` — new shared caption component.
- `src/components/journey/ExperienceNavigation.tsx` — caption beside car.
- `src/components/journey/navbar-performance-car.css` — proportional enlargement, slot clearance and narrow-slot guard.
- `src/components/journey/NavbarPerformanceCar.tsx` — responsive image size hint updated to 218px.
- `src/components/journey/navbar-brand.css` — caption typography and responsive placement.
- `src/components/Hero.tsx` — upper eyebrow group contains the responsive caption; heading and car implementation unchanged.
- `src/test/navbar-motion.test.tsx` — caption placement assertions alongside existing motion/function tests.
- `src/test/fixtures/separation-protected.json` — only four deliberately changed protected component/style entries rebaselined. Existing asset hashes remain intact.
- `docs/navbar-refinement/` — this report, evidence, comparison and checks.

## Validation and evidence

- `npm run typecheck`: PASS (app, config, QA).
- `npm run lint`: PASS.
- `npm test`: PASS, **382 tests / 53 files**. No tests removed.
- `npm run build`: PASS (15.01 seconds). Existing Browserslist/class ambiguity/chunk-size advisories remain.
- Freshly loaded production output contains the caption; production console has zero errors.

Both themes were checked at **320, 360, 390, 412, 430, 768, 1024, 1280 and 1440px**. All 18 combinations have no horizontal overflow, no car/control or caption/control overlap, one visible caption, and the location label only in Hero. Measurements and full screenshots are in `responsive.json` and `{dark,light}-WIDTH.png`. Wide desktop car width measured 218px. The solid silhouette stays inside the 64px navbar. Caption clearance and position before the Hero heading were checked; see the recorded bounding rectangles. Temporary viewport overrides were reset after QA.

Visual evidence:

- `dark-1440.png` and `light-1440.png`: larger silver car with associated navbar caption.
- `dark-1280.png` and `light-1280.png`: narrow desktop composition.
- `dark-1024.png` / `light-1024.png`: car retained, caption in upper Hero.
- `dark-768.png` / `light-768.png`: tablet action priority.
- `dark-320.png` / `light-320.png`: readable caption and functional actions at the narrowest width.
- Corresponding 360, 390, 412 and 430px screenshots are also included.

Desktop Book Service opens the existing form and HELP opens/closes. At 320px MENU opens and Request Service opens the same complete four-step form. Theme switching works. Existing form, Gallery, Hero and navigation regression tests pass. Reduced-motion and hidden-document pause handling remain unchanged. No external enquiry was submitted.

## Protection

The before/after source comparison in `protection.json` confirms **all 1,573 recorded 3D-project files unchanged**, with zero added or removed files. Every preexisting static artwork asset is byte-identical, including official logo, Hero cars and silver navbar car. No lockfile, backend/form, Gallery, Hero heading, camera or lighting implementation changed. The red gradient and logo pill remain unchanged.

Development: http://127.0.0.1:8190/Toli-2/

Production preview: http://127.0.0.1:8200/Toli-2/

NAVBAR CAR ENLARGEMENT = PASS

BRAND CAPTION = PASS

RESPONSIVE NAVBAR = PASS

EXISTING FUNCTIONALITY = PRESERVED

3D SHOWROOM PROJECT = UNCHANGED
