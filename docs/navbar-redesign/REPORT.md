# TOLI MOTORS red navbar and silver car

Target verified: `/home/thunder/shared/tolimotors-main1/toli-static-website`. Package is `toli-static-website`, root App renders traditional Index, and the active Index uses ExperienceNavigation. The independent 3D project was not edited.

## Navbar

The existing fixed 64px desktop / 56px mobile navbar now uses a horizontal gradient from #64131B through #B51B29 and #D91F31 back to deep burgundy, with restrained white top lighting, a subtle lower shadow and #F5253B edge. The same red surface applies in both themes. Controls have white text and neutral contrast surfaces; Book Service uses a silver-white surface with deep-burgundy text. The unchanged official logo remains on its original neutral pill.

Removed the exact `ANANTAPUR / SERVICE · REPAIR · CARE` rendering from the center slot and removed its obsolete styling. The car occupies that slot without text behind it. The same car has been edited to metallic silver/pearl white as a separate transparent raster asset, without CSS recoloring filters. Original images remain unchanged. Original wheel layers, visibility pause, reduced-motion handling and CSS motion remain. The decorative car is scaled within its existing center position to show its full silhouette; it yields when the slot is too narrow and stays omitted on mobile, as before, to protect logo and action targets. Mobile HELP remains accessible inside MENU.

## Hero

The exact label now occupies the existing eyebrow row before `Expert car care. You can trust.`. It uses restrained spacing and theme-aware text color, with a smaller mobile size. The Hero cars, camera/layout implementation and all original Hero image bytes are unchanged. No additional grid row or absolute overlay was added.

## Files modified

Paths below are relative to the verified static project:

- `src/components/journey/ExperienceNavigation.tsx`: remove center label; name action group.
- `src/components/Hero.tsx`: relocate exact label to existing eyebrow row.
- `src/components/journey/NavbarPerformanceCar.tsx`: use silver image variants; preserve animation layers.
- `src/components/journey/navbar-performance-car.css`: neutral car lighting, full silhouette sizing, obsolete label/filter cleanup.
- `src/components/journey/experience.css`: remove unused navbar-label rules only.
- `src/components/journey/navbar-brand.css` (new): scoped red surface, neutral actions and Hero eyebrow styling.
- `src/main.tsx`: import scoped styling after shared themes.
- `src/test/navbar-motion.test.tsx`: require removal from navbar and exact label before Hero heading.
- `src/test/fixtures/separation-protected.json`: rebaseline only the five intentionally changed protected component/style entries. Original artwork hashes remain unchanged.
- `src/assets/navigation/toli-performance-silver-420.webp` (new).
- `src/assets/navigation/toli-performance-silver-840.webp` (new).
- `docs/navbar-redesign/`: this report, validation logs, protection comparison, layout measurements and screenshots.

## Asset provenance

Built-in imagegen edit, using the original navbar car cutout `src/assets/navigation/toli-performance-campaign-840.webp` as edit target. Output was inspected, then resized/encoded into transparent WebP variants (20,982 and 57,028 bytes). No logo or Hero asset was edited. The original generation output remains in its generated-images location; runtime references only project-local variants.

Final image-edit prompt:

> Use case: precise-object-edit. Edit target: attached existing TOLI navbar sports car cutout. Change ONLY the red painted body and red trailing streaks to premium metallic light silver / pearl white, with graphite shadows and neutral white highlights. Keep exactly the same car, silhouette, perspective facing right, proportions, framing, wheel positions, black dark metallic wheels, dark tinted glass and fine details. No redesign, no new vehicle, no logo, no text. Preserve the transparent background. Keep the same wide composition and isolated edges. Do not add a ground/background or colored glow. This will replace the same car inside an animated navbar.

Saved runtime assets:

- `/home/thunder/shared/tolimotors-main1/toli-static-website/src/assets/navigation/toli-performance-silver-420.webp`
- `/home/thunder/shared/tolimotors-main1/toli-static-website/src/assets/navigation/toli-performance-silver-840.webp`

## Validation

- Development preview: http://127.0.0.1:8190/Toli-2/
- Production preview: http://127.0.0.1:8200/Toli-2/
- `npm run typecheck`: PASS, app/config/QA.
- `npm run lint`: PASS.
- `npm test`: PASS, 382 tests in 53 files. One prior interrupted run was incomplete; `tests-final.log` is the completed result. No test was removed.
- `npm run build`: PASS. Existing Browserslist/class-ambiguity/large-chunk advisories remain; no new build error.
- Relevant navbar/Hero/image tests: 10 passed before the complete suite.
- Fresh production console: no errors (`production-console.json`).

Browser checks covered dark and light themes at 320, 360, 390, 412, 430, 768 (tablet) and 1440 (desktop), 14 combinations. `layout-checks.json` records no horizontal overflow, no logo/action or car/action overlap, loaded Hero images, label clear of the vehicle, label above the heading, and absence of the label in the navbar at every size. Both themes were inspected visually. Full desktop proof is in `dark-desktop-final.png` and `light-desktop-final.png`; per-width screenshots are also retained. This is browser viewport validation, not physical-device certification.

Desktop HELP opens/closes, theme switching works, Book Service opens the existing four-step request, mobile Book Service and MENU work at 320px, mobile MENU retains HELP and Request Service. Production Gallery opens/closes and Enquire Now opens the same request. Existing form/draft/validation and section behavior are covered by the full regression suite. No external service request was submitted.

## Protection

`protection.json` compares source/assets/docs/release sources before and after the change, excluding dependency directories, generated dist/cache and Git internals. All 1,573 recorded files in `toli-3d-website` are identical: zero changed, added or removed. The official logo, Hero images and original navbar images in static are unchanged. No dependencies or lockfile changed. The original unsplit project was not targeted.

## Final status

RED NAVBAR = PASS

SILVER NAVBAR CAR = PASS

NAVBAR TEXT REMOVAL = PASS

HERO TEXT RELOCATION = PASS

STATIC WEBSITE REGRESSION = PASS

3D WEBSITE PROTECTION = PASS
