> HISTORICAL REMOVAL RECORD: the subsequent user requirement cancels the car-removal portion of Phase 2. Approved visuals are restored; the service content, request flow and truthful journey remain. Current inventory and validation are in CAR-RESTORATION.md.

# Phase 2 — service content and decorative vehicle removal

Baseline inspected before editing: build, TypeScript and lint passed; 200 tests / 31 files passed in the preceding Phase 1 run. Existing unrelated worktree changes were preserved.

## Service evidence classification (internal, not customer UI)

“Supported” below means present in project content, not independently verified business capability. Sources: src/lib/service-catalog.ts, src/lib/chat-knowledge.ts, existing request flow and TermsAndConditions.tsx. All nine original titles, icons, ordering and service IDs remain unchanged.

| Service | Supported by existing project information | Unclear / requires owner confirmation |
|---|---|---|
| Automobile Services | Servicing, diagnostics and repairs | Actual scope, supported vehicles; no evidence for all-brand coverage |
| Spare Parts & Repairs | Parts supply and repairs | Stock, fitment, provenance, warranties; universal genuine-parts promise unverified |
| Battery Services | Amaron repair, replacement and maintenance | Vehicle compatibility, stock, eligibility and exact warranty |
| Premium Detailing | Exterior polish and interior detailing | Packages, products, finish guarantees and additional treatments |
| Vehicle Inspection | Vehicle inspection category | Checklist and report format; 75-point claim unverified |
| Consultation | Maintenance, upgrade and repair advice | Consultation scope, availability and fees |
| Installation | Parts/accessory installation | Accepted items, fitment, customer-supplied parts and charges |
| Doorstep Pickup | Pickup/delivery offered as a category | Locations, availability, charges, eligibility and conditions |
| AMC Plans | Annual maintenance plans | Inclusions, duration, eligibility and pricing; priority/discount promises unverified |

Customer descriptions use the supported category and ask customers to confirm details with the team. “When to ask” and “What to share” guide enquiries; they are not diagnoses or guarantees. No services, prices, credentials, response deadlines or workshop procedures were invented.

## Inventory and removal

Active decorative raster cars existed only in Hero.tsx and NavbarPerformanceCar.tsx. Runtime image/picture imports and CSS URLs were inspected across src, public and index.html. Social metadata uses the existing favicon branding asset; no removed car was referenced there.

Deleted after removing runtime consumers:
- src/assets/hero/toli-sports-campaign-960.webp: 90,322 bytes.
- src/assets/hero/toli-sports-campaign-1440.webp: 175,648 bytes.
- src/assets/navigation/toli-performance-campaign-420.webp: 24,008 bytes.
- src/assets/navigation/toli-performance-campaign-840.webp: 67,184 bytes.
- src/assets/navigation/toli-campaign-rim-front.webp: 10,160 bytes.
- src/assets/navigation/toli-campaign-rim-rear.webp: 8,040 bytes.

The decorative SVG car used in BeforeAfter was also removed; the section now honestly states that comparison photographs are unavailable. It was 978 bytes.

Deleted WebP image data: 375,362 bytes; including the SVG placeholder, total removed image data is 376,340 bytes. This is source asset size, not a measured page-load or timing reduction. Responsive image choices meant a visitor would not necessarily download all variants. Dedicated navbar car component, wheel/speed/sweep/mask CSS, visibility listener and hero image fetchpriority/source sets were removed. No explicit car-image preload existed in index.html.

Historical provenance documents retain retired filenames as text, not live image links. Older luxury-GT derivatives and owner-supplied hero-approved/hero-bg sources remain unreferenced historical assets because earlier ownership/provenance documents refer to them. They have no runtime imports and are not shipped in the Vite asset graph. No mass filename-based deletion was performed.

## Retained visualization

- Genuine gallery/workshop photography, logos, brand marks, UI icons: unchanged.
- Wheel/brake and battery service orientation: shared Three.js scene and component-context SVG fallback retained. These are illustrative, not diagnostics.
- Services without a meaningful component mapping: textual explanation/request instead of arbitrary generic car highlighting.
- Process/completion: existing real-time 3D retained and flagged as repeated decorative visualization for Phase 3 review. Decorative SVG vehicle fallbacks replaced with useful request guidance; no empty image containers or replacement car images.
- One renderer, capability policy, DPR caps, quality reduction, visibility pauses and disposal preserved. Hero has no scene dock and performs no WebGL work.

## Request journey and claims

Four stages describe actions the actual flow supports: choose a service, prepare a request, send its draft in WhatsApp, discuss arrangements. No date picker, automatic booking record, guaranteed pickup/delivery or certified care is implied. The final request section and directly related chatbot responses use the same limits.

Removed/softened in touched content: all-brand repairs, certified care, 75-point inspection, showroom/brand-new outcome, universal genuine parts, on-time pickup, default delivery, AMC priority/discount guarantees. Service availability and arrangements are confirmed directly with the team.

OWNER VERIFICATION REQUIRED: hero “genuine parts” wording retained exactly as requested; experience/brand statistics, inspection checklist, certifications, workshop claims, coverage, gallery ownership, review data, legal identity/policies, hours, contact/map/social destinations and warranties remain Phase 4 owner work. No legal placeholders or hours were guessed.

## QA boundary

All requested viewport sizes remain visually UNVERIFIED: 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360, 320. Prior browser URL security policy blocks local preview inspection; no workaround was attempted. Unit tests and static responsive review do not establish rendered visual passes or a clean production console.

## Validation

Full suite: 214 passing tests across 33 files (baseline 200 / 31). Original test cases were retained or updated for intentionally removed visuals; two new files cover all nine service contexts, DOM information ordering, truthful journey, purposeful component fallbacks and removed asset references. Build, TypeScript and lint passed. Existing bundle-size, Browserslist and test React Router warnings remain; production console and rendered viewport checks are unverified.
