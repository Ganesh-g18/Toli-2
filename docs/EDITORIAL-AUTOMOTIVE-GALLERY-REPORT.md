# TOLI MOTORS — EDITORIAL AUTOMOTIVE GALLERY REPORT

## Existing Assets
Image count: 16, all reused once. No asset files changed.
Image dimensions: eight 1440×1080, one 1434×1080, two 1728×1296,
one 1728×1301 and four 810×1080 portraits. All photographs were inspected in
an inventory/contact sheet before choosing the composition.
Existing metadata: visually audited scene captions, descriptive alt text and
intrinsic dimensions. No structured dates/times or verified service outcomes;
none invented. Original embedded timestamps remain part of the photographs.
Existing lightbox: full image, cyclic previous/next, arrows, Escape, focus
containment/return and body portal retained.

## Removed
Overlapping deck: removed.
Sticky progression: removed, including runway and resize measurement.
Card rotation: removed, together with offsets, scaling/fading and hidden cards.
Scroll reveal: removed, including scroll listener, animation frame scheduling,
active-photo calculation and the obsolete progression tests.
The Gallery now uses normal page flow. No pinning or one-photo-at-a-time control.

## Editorial Architecture
Feature image: gallery-6.webp, 1728×1296, showing vehicles and service bays.
Chosen for resolution, clear workshop environment and strong automotive subject.
It spans seven of twelve desktop columns and two rows, about 58% of the spread.
Secondary image: gallery-4.avif, 1728×1301, the TOLI workshop entrance.
Detail images: reception/glass partition and office desk; no invented tool or
repair close-ups. Smaller crops use inspected focal positions.
Additional groups: wide exterior plus portrait event photograph, a workshop/group
pair, a reversed 5/7-column pair and 3/9-column pair, then alternating wider
exteriors and narrow portrait panels. All 16 remain naturally discoverable.
Desktop grid structure: four deliberately composed groups, 12-column internal
CSS Grid with varied spans and 16px gaps. Gallery uses approximately 91% of the
viewport width; the unchanged global chapter rail has reserved space on the left.
The rail is main-site navigation, not Gallery photo navigation, and was not edited.
Counter: actual image count, displaying the last opened/navigated photo number.
Every photograph also has a small sequence number and a semantic lightbox button.
Captions sit below photographs, preserving the image area.

## Responsive
1920: PASS
1600: PASS
1440: PASS
1366: PASS
1280: PASS
1024: FIXED / PASS
768: FIXED / PASS
430: PASS
412: PASS
390: PASS
360: PASS
320: PASS

Production screenshots inspected at all 12 widths. Desktop uses the full
asymmetric spread. Tablets simplify to a large full-width feature and supporting
pairs; unnecessary feature letterboxing was fixed with native 4:3 framing.
Phones use a full-width vertical sequence with native image ratios and compact
heading/counter. No small mosaic tiles. No measured horizontal overflow.
No Gallery sticky height, empty viewport or special release remains.

## Photography
Natural colors: retained; no red filter, duotone or heavy desaturation.
Cropping: main feature preserved with contain; supporting desktop editorial panels
use cover and inspected focal points. Portrait groups use contain to keep people
visible. All mobile photographs keep native aspect and natural colours.
Image quality: original existing WebP/AVIF sources; the 1728px service-bay photo
occupies the feature slot, lower-resolution portraits use smaller desktop slots.
Lazy loading: sources gated until Gallery approaches by 600px, then native lazy
loading and async decoding. No Gallery images requested at initial Hero entry
through this component's source assignment. No new library or external image.
Dimensions/aspect ratios reserve layout before image loading.
Light theme uses existing warm/light surfaces, charcoal captions and red accents;
no fixed dark card background is introduced around every photograph.

## Accessibility
Alt text: factual scene descriptions, never filenames.
DOM order: logical numbered editorial sequence, shared exactly by the lightbox.
Keyboard: every photo button reachable in ordinary DOM order, with visible focus.
No hidden focusable photos or scroll-dependent tab order.
Lightbox: correct source from feature, secondary, reception and office slots;
next/previous, arrows, Escape and focus containment preserved.
Focus: returns to the exact originating image button after closing, including
when another image was visited in the lightbox.
Reduced motion: layout is static; optional 1.01 hover zoom only runs when motion
is permitted. Lightbox entrance animations are disabled for reduced motion.

## Integration
Hero unchanged: PASS, checksum verified.
Navbar unchanged: PASS, checksum verified; navbar car/logo untouched.
Website stack unchanged: PASS, checksum verified. Gallery stays after Trust and
outside the stack; global chapter rail retained.
TOLI AI unaffected: PASS, checksum verified; opened above the final editorial row.
Service Request unaffected: PASS, checksum verified. Browser measurement confirmed
Gallery bottom and Service Request top coincide; only normal section padding
separates the final photographs from the next content.
Footer unchanged: PASS, checksum verified.
Shared canvas: no vehicle canvas covering Gallery observed during inspection.

## Files Changed
- src/components/Gallery.tsx
- src/components/gallery-editorial.css (new)
- src/components/gallery-deck.css (removed)
- src/lib/gallery-images.ts
- src/lib/gallery-deck.ts (removed)
- src/test/gallery-editorial.test.tsx (replaces gallery-deck.test.tsx)
- src/test/gallery-deck.test.tsx (removed)
- src/test/gallery-visibility.test.tsx
- docs/EDITORIAL-AUTOMOTIVE-GALLERY-REPORT.md

Old deck reports are historical records, not active implementation instructions.

## Validation
Build: PASS. Existing bundle-size, Browserslist and Tailwind notices remain.
TypeScript: PASS.
Lint: PASS.
Tests: PASS — 307 tests across 42 files (previous baseline: 303).
Focused Gallery suite: 14 passing cases. Tests preserve mount/location, all assets
once, logical order, intrinsic dimensions, useful alts, lazy-loading gate,
reduced-motion accessibility, lightbox source/sequence/Escape/focus from all four
first-spread slot types, and the existing focus-containment checks.
Production console: no observed errors.

## Visual Acceptance
PASS — actual production render inspected, not inferred from source.
Checked screenshots at 1920,1600,1440,1366,1280,1024,768,430,412,390,360,320;
first feature spread, subsequent wide/portrait groups, lower reversed composition,
final row and Service Request entry. Inspected dark and light themes and final
corrected tablet framing. Opened feature, secondary and detail lightboxes,
verified correct full image, arrow navigation, Escape and origin focus return.
Verified TOLI AI opens above Gallery. Browser measurements found no horizontal
overflow and no gap/overlap at the Gallery/Service Request boundary.
The result is image-dense with a clear primary photograph and varied supporting
sizes; photography retains its natural colour and all content scrolls normally.
