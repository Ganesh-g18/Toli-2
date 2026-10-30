# Hero three-vehicle asset audit — 2026-10-16

HERO SUV ASSET REQUIRED
HERO SEDAN ASSET REQUIRED
HERO SUPERCAR ASSET REQUIRED

Inspected repository raster/vector/model inventory and existing campaign provenance.
The active sports-campaign cutout and older luxury-GT cutout both show two-door
GT proportions. Neither supplies a four-door sedan, tall road SUV or a distinct
low-cabin supercar. The active campaign has documented original image-generation
provenance in CAMPAIGN-ASSET.md. This does not make it three different classes.
The hero-approved artwork is a workshop advertisement with text, people and
partially obscured vehicles; gallery/workshop photos are not matching studio
cutouts. Brand/logo assets and the protected navbar artwork are unsuitable.
No qualifying three-car set with confirmed reuse evidence was found.

HeroVehicleLineup reserves hero-suv, hero-sedan and hero-supercar positions.
Its manifest remains null; no broken URLs, empty visible placeholders, new image
requests or duplicate GTs are introduced. The approved single-car composition
remains visible until the complete set is reviewed and supplied. Headline,
height, theme, navigation and section stack are unchanged.

Required delivery: three original/unbranded transparent WebP/AVIF cutouts with
responsive variants, intrinsic dimensions, and a provenance/license evidence
record per asset. Use one camera height and perspective, neutral/silver key,
gunmetal paint, red environmental rim/bounce and baked contact shadows on a
shared ground plane. Trim consistently and inspect the finished composition at
1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360 and 320px before
activation. CSS slots are provisional art direction, not proof of matching
perspective or visual acceptance. No WebGL is introduced.

Three-car visual acceptance: pending assets; cannot be marked PASS.

Validation of the prepared architecture: production build, TypeScript and lint
passed; full suite 270 tests across 40 files passed. Production browser fallback
inspected at 1440px and 320px, with overflow measurements at all 12 requested
widths: no horizontal overflow, one approved image, no visible empty slots.
Production console reported no errors. Navbar/car and section-stack checksums
unchanged. These checks validate the fallback only; they do not validate a
three-car photographic composition that is not yet present.
