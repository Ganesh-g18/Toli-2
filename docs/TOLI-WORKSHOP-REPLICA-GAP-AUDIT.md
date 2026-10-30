# Photo-to-model gap audit — before replica modeling

21 October 2026. All16 original images re-inspected through original-resolution project contact sheets and key source photos; hashes/complete per-photo fields: `tools/3d/toli-workshop/reference/replica/reference-inventory.json`. Existing source and matched final renders compared. No model edits preceded this audit.

**Authoritative era selection: user selected the later four-opening facade.** The best interior/reception evidence is dated2024; later exterior photographs do not establish a later interior plan. Keep the visible interior conservative, label era uncertainty; do not invent a room extension or remodel the interior based only on frontage width. Dimensions remain estimated, not surveyed.

| Category | Current gap | Priority / confidence | Replica action |
|---|---|---|---|
| Building shell / overall proportions | PARTIALLY ACCURATE; shed recognizable, absolute dimensions estimated | P0 / medium | Preserve interior envelope; fit later frontal facade within estimated width; disclose lack of later cross-section |
| Facade / entrance / shutters / doors | INCORRECT for selected later era: old two-main-opening frontage | P0 / high count, medium proportions | Separate new four-opening facade with white piers, red shutters and canopy; keep main lane opening; retain old source unchanged |
| Roof / trusses / cross-members | PARTIALLY ACCURATE; recognizable silhouette; joints simplified | P0 / high shape, medium spacing | Retain camera-fitted envelope; conservative eave/truss connections only |
| Red structural steel / columns | PARTIALLY ACCURATE; correct frame rhythm; bases clean/simplified | P0 / high silhouette | Retain positions, add evidenced small column enclosure/conduit; no invented lift mechanism |
| Floor / lane / markings | PARTIALLY ACCURATE; current stone too clean/uniform in material response | P0 / high pattern, medium scale | New derivative stone response with unequal rectangular modules/pale joints; no fabricated stains/cracks |
| Reception / glass / office | PARTIALLY ACCURATE; relation recognizable, cabinet/counter simplification | P0 / medium | Darker reference floor/desk response; clear glazing and pull; preserve doorway/stair sightline |
| Counter | UNCERTAIN: reference shows dark rear desk; not evidence of a new front welcome counter | P1 / medium silhouette, low fixed role | Keep dark rear desk as interaction target; do not invent a grand reception counter |
| Mezzanine / stairs / railing | PARTIALLY ACCURATE; 2024 relation supported, later continuity unknown | P0 / medium | Keep geometry; improve simple connection/rail profile only if silhouette supported |
| Paint booth / ventilation | PARTIALLY ACCURATE exterior; UNCERTAIN internals/depth | P0 / high visible face | Retain white box/red paired doors/window silhouette; no duct or unseen internals |
| Service bays / wall fixtures | PARTIALLY ACCURATE | P1 / high frame and lower panels | Supported frame enclosure/control silhouette; no service-per-bay fiction |
| Workbench / tools | UNCERTAIN: much of left area obscured by cars | P1 / low | Mark inherited simple bench as low-confidence placeholder, avoid detailed invented tool wall |
| Storage / fixed equipment | MISSING some visible small details, most contents movable/covered | P1 / medium enclosure, low content | Only small observed frame fixture; omit tarp contents and guessed equipment |
| Lighting / geometric fixtures | PARTIALLY ACCURATE: angular shapes exist; suspension sparse | P0 / medium | Refine suspended support lines and restrained emissive material; no live light per tube |
| Electrical elements | UNCERTAIN placement outside column enclosure | P2 / low | Do not transpose unlocated P16 socket/cable into main workshop |
| Walls / windows / ventilation | PARTIALLY ACCURATE; existing cladding/lower panels good | P1 / medium | Keep understated corrugated response; do not invent fans/windows |
| Signage / branding | INCORRECT facade era; third-party panels intentionally neutral | P0 / high TOLI panel | Separate TOLI-owned panel; third-party art omitted/controllable, no authorization claim |
| Materials / weathering | PARTIALLY ACCURATE; too clean CGI in some views | P1 / medium | Subtle stone/paint roughness, darker reception floor; no damage/oil/cracks |
| Fasteners / trim | MISSING simplified junction cues | P3 / low-medium | Small grouped base/beam connection cues only; geometry cap |
| People / vehicles / loose clutter | TEMPORARY / SHOULD NOT MODEL | excluded | No people, faces, plates, customer-car replicas, festival objects, cardboard or personal belongings |

## Independent validation and budget before modeling

Keep `toli-workshop-evidence.blend`, its v2 derivative and production references byte-identical. Create `toli-workshop-replica.blend`; candidate export stays under tools/exports until visual gate passes. Independent review must precede activation in `#/3d-experience`.

Baseline:47,255triangles,88,459exported vertices,18meshes/materials,8embedded images,4,076,400bytes; estimated textureRGBA8+mips30.7MiB. Initial Overview14calls, warmedOverview76, Vehicle80. Target review budget:≤65k triangles,≤120k exported vertices,≤30 draw batches/material slots,≤10images and≤40MiB estimated textures,≤6MiB GLB. These are engineering caps, not physical-device approval. Interactions share one renderer; additional installations must be distinguished from photographic reconstruction. No 4K/8K maps or tiny-tool geometry.

## Exact missing evidence

- Later facade/interior continuity: need one uninterrupted view from the later central entry showing lane, reception and roof. Later exterior images establish four openings, not current room positions.
- Reception: need unoccupied doorway-wide and opposite corner views showing desk footprint, complete door swing and stair foot/top.
- Workbench/tool zone: need left perimeter photographed along its length without parked vehicles.
- Paint booth: need unobstructed front, side/rear and interior doorway views. Hidden machinery remains omitted.
- Mezzanine: need stair foot, landing and full deck perimeter in one view; storage contents and exact later location remain unproved.
- Electrical/fixed equipment: need close view plus wide locator view for each object. P16 cannot locate a room in the floor plan.
