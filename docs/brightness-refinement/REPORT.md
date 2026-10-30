# Static website brightness and Hero caption refinement

## Verified target

`/home/thunder/shared/tolimotors-main1/toli-static-website` is the independent static project. Its App renders traditional Index, which owns ExperienceNavigation and Hero. Runtime changes were checked at http://127.0.0.1:8190/Toli-2/. The separate 3D project was never edited.

## Hero hierarchy and layout

The navbar no longer renders the brand caption. Hero DOM order is now:

1. `ANANTAPUR / SERVICE · REPAIR · CARE`
2. Existing `Expert car care. You can trust.` heading
3. `Your Car, Our Care. Drive with Confidence.`
4. Existing description and CTA actions

The caption is 20px desktop / 15px mobile, medium weight, without a background box. Only `Drive with Confidence.` is emphasized, using accessible deep red in light theme and pale performance-red/silver in dark theme. It is visible at every supported tested width.

The caption uses the existing vehicle row's clear upper-left area, below the heading and clear of the rendered car and actions. It does not add a grid track or alter vehicle transforms. The former eyebrow row's minimum geometry is retained on narrower screens to avoid shifting the vehicle. Hero height, heading vertical geometry, image-frame vertical position/height and CTA vertical positions match the recorded baseline in all 18 responsive comparisons. Seventeen cases also match all horizontal measurements exactly. The first wide dark baseline has a 10px content-width difference while the scrollbar settled; this is recorded in `geometry-comparison.json`, rather than treated as a deliberate layout change. Hero geometry/camera styles, artwork, vehicle positions and animation implementations were not edited.

## Brighter navbar

The same layered red navbar now runs through `#921824 → #D91F31 → #F5253B`, with richer red returns, restrained top lighting and depth. Its 64px desktop / 56px mobile height is unchanged. The 218px silver-car artwork, animation and responsive behavior are unchanged. Official logo artwork and neutral logo pill remain untouched. HELP, theme toggle, Book Service and MENU retain their existing structure and handlers. Neither the location label nor brand caption is rendered inside the navbar.

A slightly deeper translucent control landing retains white-text contrast against the brighter gradient. Book Service keeps its neutral silver-white surface and burgundy text.

## Theme changes

Light surfaces now use pearl white, warm-white highlights, light silver and steel-grey neutrals instead of the heavier cream/red-grey base. Existing cards gain subtle neutral gradients, soft elevation and restrained red edges. The selected-service feature panel deliberately retains a red surface for its fixed white copy; its lighter burgundy gradient was checked separately.

Dark surfaces are lifted from near-black into charcoal, graphite and gunmetal. Neutral softbox/floor lighting is brighter and the heavy Hero copy-shadow overlay is reduced. Red remains localized to performance accents and burgundy depth; no neon effects, colored blue/purple lighting, image filters or new layers of UI were added.

Principal updated roles:

| Role | Before | After |
|---|---|---|
| Dark neutral surface lightness (HSL) | 10 / 14.7 / 19.2 / 25.1 / 29.6% | 17 / 22 / 27 / 30 / 33% |
| Studio charcoal | `#17181c` | `#2a2d32` |
| Studio graphite | `#2d2f35` | `#373b41` |
| Gunmetal | `#3b3e45` | `#494e56` |
| Steel highlight | `#70747c` | `#858b94` |
| Light primary / panel | Warm cream roles | Pearl 97% / white 100% |
| Caption accent | Small shared silver copy | Light `#b4142d`, dark `#ffd0d6` |

The existing accessible action-red palette remains unchanged. The brighter navbar/lighting colors are decorative roles rather than an untested replacement for white-on-red CTA colors. Original Hero image highlights are preserved; their surrounding neutral/red environment is brighter, without changing image bytes or 3D materials.

## Contrast and accessibility

`contrast.json` records:

- Shared primary, secondary, muted and caption text against the five theme surfaces: minimum **5.44:1 dark**, **5.57:1 light**.
- White navbar controls on a conservative bright-gradient/control composite: **6.34:1**.
- White selected-service text on its light-theme red gradient: minimum **6.03:1**.

The relevant palette tests also pass. Major sections were visually inspected in both themes, including a corrected light-theme selected-service exception identified during QA. Semantic state, pressed indicators, borders, arrows and labels remain; red is not the sole state signal. Keyboard navigation still exposes a visible 2px focus outline. Existing reduced-motion and hidden-document motion pause behavior is unchanged and regression tests pass.

## Responsive and visual evidence

Dark and light themes were checked at **320, 360, 390, 412, 430, 768, 1024, 1280 and 1440px** (18 combinations). The caption follows the heading, stays clear of CTA buttons and the visible vehicles, and remains readable. No horizontal overflow was found. Navbar car/control separation is preserved. Temporary viewport overrides were reset.

Hero screenshots were captured before editing and after editing. Services and Request surface comparisons use a temporary local preview of the exact prior `themes.css`, `dark-system.css` and `brand-environments.css` bytes, verified against the pre-edit checksums. That isolated comparison preview retained the current navbar/component shell and was used only to compare section surfaces; it was stopped and its tab closed after capture. No project was reverted or changed for those comparisons.

Evidence files:

- `comparison-dark-1440.png`, `comparison-light-1440.png`: original versus final Hero/navbar.
- `comparison-{dark,light}-services.png`: prior versus final Services surfaces.
- `comparison-{dark,light}-request.png`: prior versus final Request surfaces.
- `after-{dark,light}-WIDTH.png`: final responsive Hero checks.
- `before-geometry.json`, `after-geometry.json`, `geometry-comparison.json`: measured layout protection.
- `contrast.json`, `theme-readability.json`: role values and contrast calculations.
- `production-console.json`: zero captured errors in the final production preview.

## Functional validation

- `npm run typecheck`: PASS, app/config/QA.
- `npm run lint`: PASS.
- Focused caption, motion and palette tests: **19 passed**.
- Final complete suite: **382 passed in 53 files**.
- Final `npm run build`: PASS (22.05 seconds).
- Existing Browserslist, utility-ambiguity and large-chunk advisories remain; no build errors.
- Development and final built-site previews load correctly.
- Book Service and Request this service open the existing complete four-step request form.
- Gallery opens/closes in production. Existing Service Request and local TOLI AI regression tests pass.
- No enquiry was sent and no external backend action was performed.

Development preview: http://127.0.0.1:8190/Toli-2/

Production preview: http://127.0.0.1:8200/Toli-2/

## Files changed and protection

All modified runtime files are inside the static project:

- `src/components/Hero.tsx`
- `src/components/journey/ExperienceNavigation.tsx`
- `src/components/journey/BrandCaption.tsx`
- `src/components/journey/navbar-brand.css`
- `src/themes.css`
- `src/dark-system.css`
- `src/brand-environments.css`

Affected regression files:

- `src/test/navbar-motion.test.tsx`: caption removed from navigation; exact copy and highlighted phrase follow Hero heading.
- `src/test/fixtures/separation-protected.json`: only intentionally changed protected component entries rebaselined; original asset guards remain intact.

Reports, logs and screenshots are in `docs/brightness-refinement/`.

`protection.json` confirms all existing static assets/public files are byte-identical. Official logo, silver navbar car, Hero artwork, Gallery structure, Service Request implementation, TOLI AI, camera/lighting code, navigation handlers, dependencies and lockfile are unchanged. All **1,573 recorded 3D-project files remain unchanged**, with zero additions or removals. No poster-inspired redesign or deployment was performed.

## Final status

HERO BRAND CAPTION = PASS

BRIGHTER RED NAVBAR = PASS

BRIGHTER WEBSITE THEME = PASS

RESPONSIVE DESIGN = PASS

EXISTING FUNCTIONALITY = PRESERVED

3D SHOWROOM PROTECTION = PASS
