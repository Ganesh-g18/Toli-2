# TOLI workshop reference audit

All 16 source photographs were inspected before modeling, including full-resolution architectural views P11, P12, P14 and P15. No new photo attachments accompanied this brief; these are the existing project Gallery originals. Contact sheets and a per-image inventory with hashes are under tools/3d/toli-workshop/reference/. Source images stay in place and are never used as model textures.

## Evidence policy
OBSERVED means visible in the photographs; ESTIMATED means a modeling hypothesis; UNKNOWN means not supported. No survey, calibrated camera, focal lengths or verified architectural measurements were supplied. Estimated Blender units are plausible metres for presentation only. A single WorkshopReferenceScale root can recalibrate the whole scene from a future measurement.

## Photo inventory

| ID | File | View / useful evidence |
| --- | --- | --- |
| P01 | WhatsApp Image 2026-08-06 2at 8.16.56 AM.webp | Event foreground; roof fragments only. Temporary event banner/people excluded. |
| P02 | WhatsApp Image 2026-08-06 at 8.09.20 AM.webp | Oblique front elevation, newer white/red fascia with central open shutter. Front width and depth not measurable. |
| P03 | WhatsApp Image 2026-08-06 at 8.09.21 2AM.webp | Wide frontal newer facade; overlap 2/4/5, frontage column rhythm. |
| P04 | WhatsApp Image 2026-08-06 at 8.09.21 AM.webp | Frontal newer facade; central entry, closed red shutters, white vertical piers. |
| P05 | WhatsApp Image 2026-08-06 at 8.09.25 2AM.webp | Distant newer elevation; roofline and building outline; no neighborhood reconstruction. |
| P06 | WhatsApp Image 2026-08-06 at 8.16.55 AM.webp | Event; corrugated roof and steel frame above banner only. |
| P07 | WhatsApp Image 2026-08-06 at 8.16.552 AM.webp | Event; upper roof, angular suspended light, glimpse of enclosure left. |
| P08 | WhatsApp Image 2026-08-06 at 8.16.582 AM.webp | Event; roof and storage edge; banner occludes layout. |
| P09 | WhatsApp Image 2026-08-06 at 8.216.56 AM.webp | Event wide; right storage mezzanine, railing, red beam, glass enclosure beneath. Strong overlap reception/reverse lane. |
| P10 | gallery-1.webp | 2024 exterior older sign treatment, pitched shed side and entrance; differs from 2–5. |
| P11 | gallery-2.webp | Central lane toward rear; yellow borders, rectangular stone floor, three red frames at right, trusses/skylights, rear white/red booth. |
| P12 | gallery-3.webp | Reverse lane toward bright front opening; red frames now left, front mezzanine/glass office and stair at end. Overlaps 11/15. |
| P13 | gallery-4.avif | Close older front entry; red shutter, piers, canopy, opening and tiled lane. |
| P14 | gallery-5.webp | Glass reception enclosure; grey lower wall/red cap, doorway, white ceiling, dark cabinetry, external stair seen through left glazing. |
| P15 | gallery-6.webp | Front/right oblique toward rear; red lift-like frames, metal walls, pale lower windows, booth at rear. Vehicles obscure floor contact. |
| P16 | gallery-7.webp | Small office corner; wood panel, corrugated wall, white lower panel; location relative to reception unknown. |

## Zones and confidence

A/B exterior and entrance: OBSERVED pitched steel shed, red shutters and piers, central vehicular entrance, thin canopy. P02–05 share a newer facade treatment; P10/13 show an older one. Their common building identity is plausible but renovation timing/dimensions are UNKNOWN. Do not combine third-party signboards. Candidate uses neutral removable signage surfaces and project name only, without certification claims.

C central lane: OBSERVED in P11/15 toward the rear; rectangular irregular grey stone/slab pattern and two yellow edges. P12 is an opposing view toward the bright entrance. Exact width/depth ESTIMATED from vehicle-size/proportion cues, not measured.

D/E workshop sides: OBSERVED repeated dark steel columns and wall rails, metal cladding, red lower posts and red lift-like paired frames on one side. Equipment classification is uncertain: represent visible red uprights/cross ties, not invented hydraulic internals. Left benches partly obscured; use limited semi-permanent workbench forms only.

F/G reception/mezzanine: OBSERVED glass partitions above grey dado/red caps, doorway, white office ceiling and dark cabinets in P14. P12/09 support a storage mezzanine above a red-framed enclosure toward the front and an external stair. Alignment/front-right placement ESTIMATED; exact enclosure footprint, rail spacing and stair run UNKNOWN.

H paint booth: OBSERVED rear cream/white rectangular enclosure with red double doors and dark rounded windows in P11/15. Door count/outline supported, exact width/depth ESTIMATED. Booth interior, ventilation and grating UNKNOWN; no fictional ductwork or detailed hidden grating.

I rear workshop: OBSERVED rear corrugated wall, bright side opening adjacent to booth. Obscured rear corners and exact exit route UNKNOWN; neutral closures only.

## Perspective and repeated features
P11/15 share the rear booth, right red frames, corrugated wall rails and paired roof skylights. P12 reverses the direction, with those frames on the left, and links the front glass enclosure to storage above. P09 links the mezzanine railing to the red support beam and glass enclosure. P14 supports the external stair and reception material split. Exterior P13 looks down the same type of slab lane but does not establish calibrated scale.

Strong identity: gabled corrugated roof, dark triangulated trusses and purlins, paired pale roof panels, suspended angular white light strips, tall red frame rhythm, rough grey slab lane/yellow borders, glazed red/grey office, storage railing and rear white/red booth.

Weak identity/hidden regions: exact structural bay count, physical spans, column spacing, office depth, mezzanine footprint, booth interior and rear corners. The small wood-paneled office P16 cannot be confidently placed; omit its hidden room rather than invent a floor plan.

## Permanent versus temporary
Prioritize shell, roof/trusses, columns, rails, floor, lane paint, reception, mezzanine/stair, booth and sparse supported work surfaces. Exclude people, faces, plates, parked vehicles, event backdrops, garlands, balloons, shoes, paperwork, screens, loose boxes and temporary furniture. Storage is represented only by a few unmarked neutral forms if needed for visual scale.

## Scale hypotheses / unresolved dimensions
A centralized JSON holds shell width/depth, eave/ridge heights, entrance widths, lane width, service frame positions, office footprint and mezzanine height. All are ESTIMATED. No dimension in that file is a verified measurement. A front-to-rear reference length and entrance clear width would materially improve calibration. Camera direction is model-relative (front to rear), never a claimed compass bearing.

## Refinement reinspection — 19 October 2026

The existing 16 photographs were re-inspected against the old renders before editing the existing master. P11/P15 support grey lower surfaces with red column bases rather than a continuous red wall band. P14 supplies sufficient evidence for wood flooring, a ceiling fan, side glazing, white ceiling/downlights and dark cabinetry; these no longer require extra photos merely to establish their existence. P12/P14 establish a straight external stair in the front-office zone but still do not show its full junction/footprint unobscured. P02–05 and P10/P13 both support a front fascia concealing the gable, although their different facade eras remain unresolved.

A conservative width factor 0.92 and height factor 0.88 were applied to the existing architecture as an estimated proportion study, retaining depth. This is not a calibrated camera reconstruction or proof of physical scale. No new verified measurement has appeared. Roof/purlin suspension connections, red/grey material division and narrower rear opening were corrected using these observations. Unseen booth interior and the location of P16 remain unknown and unmodeled.

Successor: `source/toli-workshop-refined.blend`; all ten new renders are separate under `renders/refined-final/`. The old GLB is retained unchanged and does not include successor edits. Current same-location visual gate remains failed; consult the updated main report and exact prioritized missing-photo document. The original evidence inventory/hashes remain authoritative.
