# Default selection fix

## Services Default
Before: 05 Vehicle Inspection. After: 01 Automobile Services.
The shared JourneyProvider initializes the actual service index once from a valid restored selection, otherwise index 0 in the canonical service catalog. The list, selected number, detail, request context and general vehicle state share that index. No visual-only override was added.

## Journey Default
Before: scroll could select 02 Prepare your request or later steps. After: 01 Choose a service.
The selected step initializes to index 0. Scroll progress no longer overwrites it or discards explicit choices. The renderer uses the chosen step while retaining section progress for presentation. The global page chapter rail still follows scrolling; it is separate from local service/step selection.

## Explicit Preselection
Preserved: YES. Existing Service Request return state retains a valid service index, technical mode and component focus. Existing service request links/query handling remain untouched. Invalid restored service indices fall back to 0. No existing homepage URL mechanism for explicit Journey-step preselection was found; none was invented.

## User Interaction
Service switching: PASS (01 → 05 Vehicle Inspection → 03 Battery Services).
Journey switching: PASS (01 → 02 Prepare your request → 03 Send in WhatsApp).
Selection persistence during interaction: PASS, including section exit/re-entry and scrolling. Ten focused tests cover synchronized defaults, later choices, scroll persistence, valid/invalid restoration and shared 3D initialization.

## 3D Vehicle
Preserved: YES. The actual existing R7 vehicle rendered in the browser, including mobile. Shared lazy loading, canvas, model, camera, lighting and renderer source are unchanged. Service 01 uses general vehicle presentation.

## Hero
Modified: NO.

## Navbar
Modified: NO. All 77 files in the existing protected-file manifest retain their recorded hashes. The vehicle asset hash is unchanged. See verification.json.

## Validation
Starting baseline: 322 tests / 45 files.
Build: PASS.
TypeScript: PASS (tsc -b).
Lint: PASS.
Tests: 332 PASS / 46 files, including 10 new focused tests.
Build retains existing tooling warnings; production browser console recorded no warnings/errors during checks.

## Visual Verification
Services starts at 01: YES.
Journey starts at 01: YES.
Actually opened the production preview and checked desktop 1024×900, tablet 768×1024 and mobile 390×844 in dark/light themes. Checked normal refresh, hard refresh, direct Journey entry and later-option switching. No horizontal page overflow was observed. Mobile retains its navigation booking action. Captures and validation logs are in default-selections/.

## Scope
Production change: src/components/journey/JourneyProvider.tsx only.
Added regression coverage: src/test/default-selections.test.tsx.
Added this report and verification evidence. No CSS or unrelated section redesign.
