# Large Hero caption refinement

Target verified: `/home/thunder/shared/tolimotors-main1/toli-static-website`, live development preview http://127.0.0.1:8190/Toli-2/ and production preview http://127.0.0.1:8200/Toli-2/.

## Caption

Exact text preserved: Your Car, Our Care. Drive with Confidence.

Before: 20px desktop, 15px mobile. After: responsive clamp typography, 48.096px at 1440px, 64px at 1920px, 42.752px at 1280px, 34.202px at 1024px, 30.72px at 768px, and 22–24.94px at the five requested phone widths. Weight 650 with the second line at 750. Both phrases remain on their own line at all measured widths. Light theme uses theme ink/red for contrast; dark theme uses pearl white and the existing warm accent.

The desktop caption layer extends to the rail at approximately x13–18px. A 48px internal text inset preserves the opening letters, placing visible text immediately beside the 44px rail rather than underneath the button numbers. Its transparent layout region overlaps the rail. It remains in the existing vehicle grid row, moved up 32px within that row; no Hero tracks, vehicle transforms, or height rules were changed. At tablet width the inset is removed and the caption starts at x30px; mobile retains the content inset of x20px. No opaque panel, additional animation, or dependencies were added. Reduced motion explicitly disables caption animation and transitions.

## Numbered navigation

Existing rail z-index 30 stays above caption z-index 3 in the isolated Hero. Caption pointer-events are none. All six buttons passed center-point hit testing. Each button was clicked and its matching aria-current selection was awaited after smooth scrolling: 01 Entry, 02 Services, 03 Journey, 04 Toli Motors, 05 Request, 06 Contact. Active red and neutral inactive styling are preserved. Existing mobile/tablet rail visibility behavior is unchanged.

## Responsive evidence

Both themes inspected at widths 320, 360, 390, 412, 430, 768, 1024, 1280, 1440, 1920 (900px height), plus a short desktop at 1440×740. No horizontal overflow in all 20 measured theme/width combinations. Full wording is visible, the caption is prominent, and the original vehicle silhouette, heading, controls and navbar remain visible. Saved PNGs cover every width in both themes. layouts.json contains final measurements; navigation.json contains actual click results. before-desktop.png records the original caption.

## Protection and changed files

Implementation files:
- src/components/journey/hero-caption.css (new, caption typography/layout and active rail stacking)
- src/components/journey/navbar-brand.css (removed old caption styling; navbar declarations preserved)
- src/main.tsx (imports caption stylesheet)

Hero component, caption text component, official logo, all vehicle assets, service request, Gallery, theme source and navbar components unchanged. Hash comparison against the beginning of this task confirms only the two existing source files above changed, plus the new stylesheet and QA files. All 1573 tracked-by-audit files in the independent 3D project are byte-identical, with no additions or deletions. Generated output and dependencies are excluded from that audit. See protection.json.

## Validation

- Production build PASS (existing bundle-size advisory remains).
- TypeScript app, node and QA configurations PASS.
- Lint PASS.
- All 382 tests in 53 files PASS.
- Production caption verified at 48.096px with final -32px translation.
- Production Book Service opened the existing Service request dialog.
- Production warning/error console entries: none.

## Final status

LARGE HERO CAPTION = PASS
LEFT NAVIGATION OVERLAP = PASS (transparent caption layer beneath rail, text inset for readability)
NUMBERED NAVIGATION FUNCTIONALITY = PASS
RESPONSIVE LAYOUT = PASS
3D WEBSITE PROTECTION = PASS
