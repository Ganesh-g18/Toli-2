# Reference-inspired Hero — static website

Target: `/home/thunder/shared/tolimotors-main1/toli-static-website`.
Development: http://127.0.0.1:8190/Toli-2/
Production preview: http://127.0.0.1:8200/Toli-2/
No deployment performed.

## Reference fidelity

Inspected both supplied originals:
- /home/thunder/Downloads/WhatsApp Image 2026-10-29 at 7.04.20 PM.jpeg (wide advertisement)
- /home/thunder/Downloads/WhatsApp Image 2026-10-29 at 7.03.17 PM.jpeg (vertical advertisement)

Translated the hierarchy into HTML and scoped CSS: a pearl-white/silver industrial surface, large official identity, spaced MULTI BRAND CAR WORKSHOP subtitle, approved telephone contacts, a central vehicle against genuine workshop photography, four red-band service panels, the approved slogan and a red location strip. Restrained angular edge details echo the posters. The Hero stays bright in both themes; the rest of the site retains its existing theme behavior. No complete poster is embedded as a background.

Desktop: four cards in one row beneath the original car. Mobile: branding and phone links, vehicle, readable two-column cards, slogan and contact strip. The original care heading and navigation actions remain available. The Hero can grow vertically rather than clipping content into the poster aspect ratio.

Deliberate differences: the existing official horizontal logo is used without recreating or recoloring it; the existing GT remains the sole focal car; genuine project photography replaces the advertisement's workshop montage; existing vector icons replace the reference card photographs; two mobile card columns replace four tiny columns; extra existing site controls remain. Exact poster matching is PARTIAL, not claimed. Telugu lettering, GSTIN and conflicting business details are omitted until explicitly approved.

Before evidence: before-1440.png and before-390.png (the immediately preceding approved layout, copied from the previous task's captures). After evidence: dark-*.png and light-*.png for every checked width; production-desktop.png confirms the built app.

## Existing Hero car

Original assets preserved byte-for-byte:
- src/assets/hero/toli-sports-campaign-960.webp
- src/assets/hero/toli-sports-campaign-1440.webp

The existing HeroVehicleLineup wrapper still renders its original responsive picture fallback because the three reserved replacement assets remain unpopulated. This is the existing image-based Hero with CSS campaign-entry reveal, not the separate interactive WebGL showroom. That mechanism, srcset, fetch priority, decoding, object-fit, object-position, animation and reduced-motion rules are retained. No vehicle was generated or substituted and no second renderer was introduced. The containing grid is recomposed; the mobile visual frame is 84% wide so the unchanged existing wide picture inset fits within the viewport. Full car visibility verified at every measured width.

## Branding and claims

Official artwork: src/assets/big-transparent.png, reused unchanged. Navbar artwork and silver car remain untouched.
Subtitle: MULTI BRAND CAR WORKSHOP.
Slogan: Your Car, Our Care. Drive with Confidence. Red emphasis on the final phrase.
Palette: pearl white, clean white, silver, graphite, black, deep red and TOLI red. No neon effects.

Pending business confirmation (not published as new facts): approved Telugu spelling; GSTIN; 98856 36888; Rudrampeta Bypass / opposite ISUZU D-Mart address; cashless insurance availability. Existing project data supports the displayed 99083 03888 / 80749 46335 links and Ram Nagar / Kovur Nagar address. The request supplying image paths did not confirm the separate business-data question.

## Four service cards

1. Insurance claim enquiries — Ask our team about eligibility; opens Consultation. Does not promise cashless availability or insurance partnerships.
2. Electrical & Mechanical — opens Automobile Services.
3. Denting & Painting — opens Spare Parts & Repairs.
4. Complete Vehicle Inspection — opens Vehicle Inspection.

Shield, wrench, paintbrush and checklist are existing-library SVG icons; silver surfaces, red information bands, thin red borders and rounded corners echo the reference. All cards use the existing ServiceRequestLink architecture, preserving popup behavior and canonical /enquire-now fallback. Desktop clicks, mobile activation, keyboard Enter and mobile-menu Request Service all opened the existing Service request dialog. No request was submitted during QA. The existing header Book Service opened the same dialog in the production preview.

## Responsive and accessibility

Both themes measured and captured at 320, 360, 390, 412, 430, 768, 1024, 1280, 1440 and 1920px. No horizontal overflow in all 20 combinations. The built app also passed tablet portrait 768×1024, tablet landscape 1024×768 and laptop 1280×800 checks (orientations.json and production PNGs). No car picture frame extends beyond the viewport. Branding, service labels and slogan remain readable and separate from the vehicle. layouts.json records geometry, loaded image state and the four-card count.

Semantic heading, real links, labeled service controls, decorative image alternatives, visible focus outlines, native keyboard activation and existing reduced-motion behavior are preserved. All six numbered buttons clicked successfully and selected the matching section after smooth scroll completed; actions.json records the results. Existing TOLI AI floating control is retained in its original position.

Performance: no new library or renderer; one existing 95,996-byte responsive workshop image added to the Hero; the official logo is already used by the navbar and is reused from cache. Car assets unchanged. Reference posters are not shipped as site assets.

## Protection

Changed implementation files:
- src/components/Hero.tsx
- src/components/journey/hero-caption.css (replaces the previous caption-only layout with scoped reference Hero styling)
- src/test/hero-reference.test.tsx (new regression coverage)
- src/test/hero.test.tsx (vehicle count now scoped to the vehicle frame, allowing branding and workshop images)
- src/test/fixtures/separation-protected.json (only the authorized Hero component checksum refreshed; all other protected entries retained)

QA evidence is under docs/reference-hero. Source checksums confirm no existing implementation outside the two Hero files changed; the intentionally affected tests and one Hero checksum are updated. No image, navbar, Gallery, theme or service-request file changed. Navbar component, red gradient, silver-car animation and logo pill are intact. Independent 3D project: all 1,573 audited files unchanged; no additions/deletions. Build artifacts and dependencies are excluded from checksum comparisons. See protection.json.

## Validation

Production build PASS (existing utility/bundle-size advisories remain).
TypeScript app, node and QA configurations PASS.
Lint PASS.
Focused Hero/navbar tests: 8 PASS, including original vehicle preservation, service destinations and unconfirmed-claim protection.
Production console warning/error capture: empty (production-console.json).
Full regression suite PASS: all 385 tests across 54 files (tests.log).

## Final status

REFERENCE-INSPIRED HERO = PASS
EXISTING HERO CAR PRESERVATION = PASS
DESKTOP REFERENCE FIDELITY = PARTIAL (documented adaptations and unconfirmed details)
MOBILE REFERENCE FIDELITY = PARTIAL (documented adaptations and unconfirmed details)
STATIC WEBSITE FUNCTIONALITY = PASS
3D WEBSITE PROTECTION = PASS
