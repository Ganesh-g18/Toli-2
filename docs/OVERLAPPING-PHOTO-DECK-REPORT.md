# TOLI MOTORS — OVERLAPPING PHOTO DECK REPORT

## Previous Gallery
Previous layout: responsive grid, five initial images and SEE MORE expansion.
Number of images: 16 existing WebP/AVIF photographs.
Existing lightbox: portal above the page, previous/next, arrow keys, Escape,
focus containment and return. These behaviours are preserved.

## New Gallery
Deck architecture: logical ordered image buttons inside one local isolated deck.
One dominant print with up to three upcoming prints behind it; no thumbnails,
grid, timer, carousel or new dependency. Counter uses the actual array length.
Sticky strategy: CSS sticky stage within a normal-height wrapper, after the
existing main section stack. The stage sits below the measured navbar.
Scroll progression: clamped absolute scroll position, not wheel-event increments.
Each interval is 100–190px on desktop or 100–140px on phones; 15 intervals for
16 photos, approximately 2,700px desktop or 2,026px at 390×844, plus stage height.
Active-photo behavior: rises slightly left/up, shrinks subtly and fades only
near the end. The counter changes when the next print becomes dominant.
Upcoming-photo behavior: small offsets, scale and opacity differences, graphite
frames and layered shadows. Background frames adopt the active aspect ratio so
portrait photos cannot overwhelm a landscape foreground photo. Images use
contain sizing and keep their natural colour.
Exit behavior: the sticky stage is bounded by the wrapper. Gallery bottom meets
Service Request top without an extra spacer or overlaid last photo.

## Content
Images reused: all 16 original files, once each; no photographs added or edited.
Image order: alternates exterior, workshop, reception, event and office views.
The exact ordered filenames and intrinsic dimensions are in
src/lib/gallery-images.ts. First images: gallery-1, gallery-6, gallery-5, the
8.16.55 AM event photo, the 8.09.20 AM exterior, gallery-2, gallery-7.
Categories: omitted; the old data had no reliable categories.
Captions: new factual descriptions of visible scenes, based on visual inspection.
No repair-result, certification, timing or customer-satisfaction claims. Descriptive
alt text includes sequence position and the visible scene.

## Motion
Translation: up/left capped at 7% of the print dimensions on desktop; reduced on
phones. Background offsets are small percentages of the print, not page width.
Scale: exiting print 1→0.965; background layers down to 0.925. Smaller scale
changes on mobile. No spring, bounce or offscreen throwing.
Rotation: below 1 degree; no rotation on phones.
Opacity: foreground remains opaque until the last 30% of its exit.
Reduced motion: no pinning/runway, rotation, translation or scale animation;
all 16 large photos appear sequentially with captions and accessible triggers.
Lightbox entrance animation is disabled. Automated fallback tests pass; OS-level
reduced-motion browser emulation was unavailable in the connected controls.

## Responsive
1920: PASS
1600: PASS
1440: PASS
1366: PASS
1280: PASS
1024: PASS
768: PASS
430: FIXED / PASS
412: FIXED / PASS
390: FIXED / PASS
360: FIXED / PASS
320: FIXED / PASS

Actual production screenshots inspected at all 12 requested widths. Mobile
inherited section padding was removed; background print framing and scale were
simplified. No measured horizontal overflow. Active photos remain large and
natural in aspect; title/counter remain readable. Caption instructions reserve
space for the existing floating assistant. Short laptop screens use a smaller
print to preserve the full photograph and caption within the available height.

## Accessibility
DOM order: all 16 photos remain in the declared logical sequence.
Keyboard: only the active print is tabbable in motion mode; focus follows the
active print if a focused print changes during scroll. All triggers are tabbable
in the reduced-motion sequential layout. Page Up/Down remain native.
Lightbox: preserved above navbar, deck, stack and vehicle canvas.
Focus: arrow navigation, Escape, containment and return verified in tests and
production. Deck updates pause while its lightbox is open, preventing scrollbar
removal from changing the underlying active photo.
Reduced motion: covered by focused automated tests; physical system-setting QA
is UNVERIFIED.

## Performance
Image loading: no image sources assigned before Gallery approaches (600px
observer margin). Then active/nearby images only; native lazy loading and async
decoding retained. Reduced motion loads the sequential images lazily.
Scroll handling: passive scroll listener schedules one animation frame. React
updates only on active-index changes. Unchanged clamped progress skips writes.
Measurements are cached and refreshed on resize/layout changes. No wheel/touch
interception or scroll prevention; no autoplay, timers or WebGL.
GPU transforms: transform and opacity; no animated blur, top or left movement.
Layout stability: reserved stage/runway plus original image width/height data.
No asset-loading-dependent changes to the main page layout.

## Integration
Hero unchanged: PASS, checksum verified.
Navbar unchanged: PASS, checksum verified.
Website stack unchanged: PASS, checksum verified; Gallery remains outside it.
TOLI AI unaffected: PASS, source unchanged; opened and used above Gallery.
Service Request unaffected: PASS, source unchanged; clean entry after last photo.
Shared vehicle canvas: no canvas over Gallery observed in production inspection.

## Files Changed
- src/components/Gallery.tsx
- src/components/gallery-deck.css
- src/lib/gallery-deck.ts
- src/lib/gallery-images.ts
- src/test/gallery-deck.test.tsx
- src/test/gallery-depth.test.tsx
- src/test/gallery-visibility.test.tsx
- docs/OVERLAPPING-PHOTO-DECK-REPORT.md

## Validation
Build: PASS; existing bundle-size, Browserslist and Tailwind notices remain.
TypeScript: PASS.
Lint: PASS.
Tests: PASS — 303 tests across 42 files. Existing Gallery tests adapted for the
intentional removal of SEE MORE and expanded descriptive alt text. New tests
cover direct/reverse position calculation, counters, all original assets once,
logical DOM order, descriptive alts, intrinsic dimensions, initial image-loading
gate and reduced-motion access. Production console: no observed errors.

## Visual Acceptance
PASS for the rendered desktop/tablet/mobile deck and inspected interactions.
Production preview: http://127.0.0.1:8103/Toli-2/.
Inspected all 12 requested viewport widths, dominant foreground print with
upcoming edges, natural colours and restrained framing; dark and light theme;
lightbox next/arrow/Escape/focus return; native wheel-style scrolling and Page
Up/Down, final-photo release into Service Request, reverse progression, End/Home
fast jumps (16/16 and 01/16), and TOLI AI usability above the deck.
At the mobile exit, Gallery bottom equalled Service Request top; last print
released naturally without covering the next section.

Physical touch/trackpad hardware and direct scrollbar dragging: UNVERIFIED.
The connected browser rejected scrollbar coordinates outside its content surface.
Absolute-position calculations and direct-jump tests pass, but this is not claimed
as a physical scrollbar-drag test. OS-level reduced-motion rendering remains
UNVERIFIED; the sequential fallback passes automated tests.
