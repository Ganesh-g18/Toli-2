> **Stage 3B follow-up:** deployment preparation and the manual candidate workflow now pass locally. See [Stage 3B report](TOLI-3D-STAGE3B-DEPLOYMENT-RETENTION.md). The original Stage 3 results below are historical. The live Pages workflow remains unchanged; physical Android validation is required and production migration is not authorized.

# TOLI 3D Stage 3 release candidate

21 October 2026. **STAGE 3 RELEASE CANDIDATE = PARTIAL. PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.**

All completed automated/desktop checks below pass on the hardened isolated experience. The remaining engineering blocker is **production deployment retention integration**: the local assembler and A→B browser simulation pass, but the unchanged Pages workflow still publishes plain `dist`, not the retained package. Do not describe public/open-tab deployment safety as complete. This task does not change the deployment trigger/policy, publish, redirect root, or make 3D primary.

## Release identity

- Route: `/Toli-2/#/3d-production-preview`; Standard: `#/classic`; original `#/3d-experience` preserved; root traditional.
- Final local package: `/tmp/toli-stage3/package-final`, **toli-c31024f8c85771f3a04c505d**. Its `release-candidate.json` hashes every current emitted file separately from retained ancestors. No cloud/database/analytics/external API dependency.
- Current inventory: 125 files; retained normal-A fingerprinted files: 33. Exact inventories in `tools/release-audit/stage3/manifest-final.json`. Identity covers actual emitted content, not an arbitrary label/timestamp. It is artifact identity, not an invented Git commit.
- Authoritative replica **4,268,456 bytes**, SHA256 `b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`. Staged full-SHA filename is identical. Editable source, older approved workshop, official1483×352 RGBA PNG and Vehicle assets unchanged.

## Open Stage 2 checks / GPU program recovery

**Shader/program check: locally VERIFIED.** Audited installed Three WebGLProgram `onFirstUse`: failed `LINK_STATUS` invokes `renderer.debug.onShaderError` when diagnostics are enabled; `compileAsync` waits for readiness/completion and is not itself a reliable exception for every link failure. The staging hook is installed before environment preparation. Found and fixed a real readiness race: synchronous shader-error notification could otherwise be followed by preparation/frame code announcing ready. Preparation liveness and post-render publication now stop after fatal failure.

Dedicated QA-only Vite config wraps one actual WebGL2 `shaderSource` submission with invalid GLSL syntax. Native compile status failed1, native link status failed1, real Three program-error callback fired1 (`browser/gpu-final-hook.json`). This is neither a React throw nor a manually invoked callback. It exercised a required environment/renderer program during initialization. Branded semantic recovery stayed alive, failed canvas was removed, Standard/Retry remained, failure heading received focus. Explicit keyboard Retry constructed a new renderer/context and succeeded with one live canvas. Earlier full audit shows2 cumulative context constructions, not2 live owners (`gpu-retry.json`).

Production build has no injector, query gate or debug button; injection and counters exist only under the explicitly selected QA config/runtime. GLB/material artwork was not corrupted. Unit tests also exercise callbacks during compile and first render and forbid later ready. Limitations: this proves this desktop browser/Three error path, not all shader sources, real phone driver failure, hardware hang, OOM, or compiler behavior on every GPU. Exact deterministic compile/link failure is verified; physical GPU behavior is UNVERIFIED.

## Cross-deployment / retention / manifest

Normal Build A `toli-68405d5e058c14c75baa7b7f` opened in a real browser and selected Premium Detailing. Build B `toli-ffc2561289f95c41841ea9dd` was separately built with a QA-only harmless JS marker to force genuinely changed Rollup hashes. The first attempt used a minified-away comment and produced identical hashes; rejected as invalid simulation, then rebuilt with actual changed bytes. No claimed pass from identical A/B. B assembled with A retained53 old fingerprinted files; document served B while A's existing session remained alive.

A then first-loaded its own Gallery, ServiceRequestSteps, TOLI AI and Classic/Index chunks successfully (HTTP200); Gallery displayed16 actual photos, canonical form opened and closed without sending, AI local panel opened/closed, Standard rendered, staging return worked. Old module filenames are preserved with byte-integrity checks. A console warning/error snapshot is empty. Source-side changed-hash fixture belongs only to the local B build; final normal candidate is not that fixture build.

`tools/release/pack.mjs` copies current document/entry/current files, merges missing old Vite hash-named assets and full-SHA staged GLBs, rejects corrupt old files/name collisions/incompatible metadata, emits release identity/current/retained/ancestor inventory. Transitive A→B→C test proves old hashes survive another update without copying old HTML. Inputs/output must be separate; output cannot already exist. Failure exits nonzero; never publish a partially assembled directory. All supplied old fingerprinted assets are retained, **no automatic pruning**; decide an explicit open-tab/rollback retention window before later cleanup. Missing required previous package must block future release assembly. Full prior package and metadata are necessary; a first empty local seed does not protect tabs from an unprovided earlier public release.

**Cross-deployment check: local package/browser PASS; hosting pipeline OPEN.** Existing workflow/trigger/default entry/release policy are frozen. `tools/release/README.md` records the precise remaining integration: retrieve an exact prior deployed artifact, assemble with it, upload assembled output, fail closed on missing/expired required history, and rehearse rollback. Current workflow still uploads plain `dist`; this is why the Stage3 outcome is PARTIAL. Actual GitHub Pages headers/artifact retrieval/retention/rollback are unverified. No public deployment was performed.

Actual Vite output uses `/Toli-2/`, hash-named `assets/index-*.js`, `ClassicView-*`, `Gallery-*`, `ServiceRequestSteps-*`, `ToliAIPanel-*` and shared modules/CSS. Imported logo/photos are fingerprinted. Authoritative public model paths remain stable; staging explicitly resolves the fingerprinted replica through BASE_URL. Vehicle's unchanged stable public path is not claimed independently versioned: a later binary revision must receive a new versioned URL before promising cross-version binary coexistence. The source release.json binds workshop/logo; assembled release-candidate.json adds actual build identity. Neither alters source artwork.

Local simulation server explicitly revalidates HTML and ordinary files (max-age0/must-revalidate); this is test scaffolding, not a production host policy recommendation or global caching disable. Hash retention, not cache disabling, solves old module availability. Browser module maps may retain failed imports. No service worker/offline-first guarantee.

## Chunk failure recovery

After another fresh A document booted, server deterministically returned503 for A Gallery JS while B was current. Nearest staged ChunkBoundary displayed “Gallery could not open,” focused its heading, and offered Standard View and **Reload current release**. Workshop stayed ready with1canvas and usable Locations; no infinite spinner/automatic reload loop. Unblock then explicit reload loaded B's different Gallery chunk and restored Gallery destination (`chunk-failure.*`, `chunk-reload-success.jpg`, request log).

Staged optional Gallery/Journey content, AI, Service Request modal and `/classic` have the same scoped reload recovery. Four unit cases verify containment, focused semantic alert, close where relevant, native Standard link and explicit reload choice. Route shell also offers reload after lazy/render boundary failure, alongside fresh3D retry. Model failures use actual remount/cache retry; browser module failures honestly offer a document reload. Copy explicitly warns that unsent in-tab drafts clear on reload, matching existing draft lifetime. No customer auto-reload or background loop. Production root's form/error behavior is unchanged; request boundary is conditional on staged/classic routes. Direct canonical page retains its existing architecture and is not misrepresented as newly hardened.

## Retry cache / failure restoration / slow request

Normal final artifact, server-blocked real workshop URL:503 → finite shell → unblock → keyboard Try3Dagain → one new4268456-byte200 fetch and ready, no reload. Staged byte cache rejection eviction/HTTP retry/dedup and corrupt-byte explicit eviction tests pass. Successful bytes remain reusable between Standard round trips.

Direct Vehicle restore with real sedan URL503: workshop ready,1canvas, optional unavailable message/Tryvehicleagain; Locations and Standard still available. Unblock→keyboard retry→one new actual sedan200 fetch, vehicle completes on same workshop owner. No permanently cached rejected template. Legacy loader remains frozen; staging wrapper owns the safe retry. See `vehicle-restore-failure.*`, `vehicle-retry.*`, `network-summary.json`.

Normal workshop response held8seconds by local server: shell/status/native Standard remained, no arbitrary downgrade, eventual ready with1canvas. One browser wait helper ended before the deliberately slow response; subsequent observed ready saved as `slow-success.json`, not counted as an immediate failed-load pass. No full offline support claimed. Full uncached application boot without network cannot be guaranteed.

## Lazy boundaries / network

Final normal cold startup: **18 local responses including HTML and favicon**, exactly1fingerprinted replica4268456bytes; zero v2 workshop, Vehicle GLB, Classic/Index, Gallery payload, Request internals or AI panel. Independent LAN desktop startup also18responses. `initial-network.json` is scoped separately from later activity; full access logs preserve all events.

Final first Vehicle action: one Vehicle wrapper, existing adapter/shared modules, one sedan request; group5responses includes repeat official logo on Services. Standard first entry group38responses loads its existing modules; actual request implementation first intent adds1ServiceRequestSteps response after shared modules are already warm. In retained A-on-B session: Gallery18responses (CSS+JS+16photos), Request3(shared textarea/CSS+Steps), AI1, Standard35. These group counts include observed module/resource events, not a fixed budget across caches. Twenty-cycle QA session had1workshop request and1Vehicle request across later destination stress. Return to3D reused successful bytes. Retry network exact503→200 sequences saved.

AI remains the same local deterministic engine. No external inference/API/key/cloud/database/telemetry added; no such endpoint in scoped source/network observation. Existing font/Maps-consent/WhatsApp handoff are separate features; no claim of zero external services. No real WhatsApp submission/send during QA.

## Lifecycle / destination stress

20real-browser Standard round trips: each Standard0staging canvases; each return1canvas, active owner1. At final:21scene constructions/20disposals,1active. Cumulative context constructions naturally21, not21live contexts. Geometry17/textures10 stable at all20Services samples. No monotonic active scene/canvas/geometry/texture growth. Automated actual scene-scheduler test uses20create/dispose cycles and verifies zero pending owned RAF after each dispose;21/20React ownership test preserves state/theme. Do not infer real-driver memory/GC/thermal plateau from these counters.

QA add/remove listener proxy totals are preserved but **not live-listener counts** (duplicate/no-op removals can make a difference negative); do not claim a listener heap plateau from them. Source teardown and scheduler assertions verify owned removal; real retained JS/GPU heap remains unmeasured. No forceContextLoss/forced GC in normal navigation. Async late result disposal and original lifecycle regression remain.

24destination transitions: three rounds Services→Vehicle→Gallery→Reception→TOLI AI→Journey→Why TOLI→Overview; each1canvas, semantic location/focus matches, one retained scene owner. Vehicle downloaded once in that session. Browser helper dispatch timed out once; fresh accessibility controls completed the visits. Failed automation attempts themselves are not counted as passed.

## State / request draft / navigation

Premium Detailing retained across20Standard cycles. Exact Services→Vehicle→Standard→3D→Reception→Request test uncovered Reception's general-request argument, despite retained selection. Small **staging-only** correction passes the selected service from controlled stage state into the canonical form. Original experiment and traditional Reception contract unchanged; no new form/backend/state store. New unit and final normal-browser screenshot prove Premium Detailing preselection in one form, no submission.

Canonical service-keyed draft test enters a local QA name, closes, switches Standard→3D, reopens same service: one modal/form, restored draft, no stale modal or handoff. Refresh clears in-memory draft by existing contract; no localStorage customer data added. Existing shared theme unit roundtrip/previous baseline preserved; no theme source change. Storage choice contains only view preference.

Direct Services/Vehicle/Reception loads and refreshes restored correct destination, shell→workshop,1canvas; Overview startup also tested. Actual Back/Forward/Back/Forward Vehicle↔Reception kept1canvas and selected service until a deliberate document refresh. Scene-scheduler/React tests assert owner identity across destination history; refreshed documents naturally create a new owner/cache request. URL query remains before hash. No alternative destination scheme.

## Accessibility / responsive

Failure headings receive focus with semantic status/alert text; native Standard/Retry/Reload controls have visible focus and touch-sized targets. Explicit keyboard model Retry succeeded. Keyboard Locations opens destinations; Gallery opens/next/Escape and returns to its image trigger; AI closes to Help; Request Escape closes and returns to its actual Request button after the close transition (`keyboard.json`). Staged recovery unit tests cover module failure focus and controls. This is a desktop keyboard pass, not TalkBack certification.

Reduced-motion QA retains actual3D geometry,19settled calls,1context/1canvas. No forced Standard fallback or animated splash requirement.

Healthy Reception and failed workshop recovery:430/412/390/360/320 ×844, measured overflow0, healthy1canvas, failed0.844×390landscape and768×1024tablet screenshots saved; tablet is **EMULATED**. No layout redesign/quality/camera/touch threshold changes. Screenshots are desktop emulation, never phone evidence. Additional final normal-customer Overview captures at320×844and844×390 show reachable navigation without the QA audit overlay (`normal-mobile-overview.jpg`, `normal-landscape-overview.jpg`); both visually reviewed. Actual LAN root also renders the unchanged traditional Hero with zero staging canvases (`traditional-root.*`).

## Desktop performance

Same local instrumented Stage3 build/1280×720, warm each route then3normal reloads; DOM-observed shell paint and staged-ready paint opportunity, wait for settled actual draw frame. No concurrent build/test during these samples. Stage3 shell samples159.6/110.7/126.5ms, median**126.5ms**. Staged useful993.5/948.5/1104.1ms, median**993.5ms**. Experiment1177.8/1022.2/999.4ms, median**1022.2ms**. Both19settled draw calls/1context. Compared with Stage2 shell203.2/staging1361.4/experiment1053.6ms using same method, no regression observed. Small sample and cache/host variance: do not claim universal speedup or that additional safety architecture has negative cost. No removed recovery/lazy architecture or model optimization. Physical timing **UNMEASURED**.

## Protection / regression

Fresh before/after hashes: **411 existing files checked**, 10 explicitly authorized existing source/test changes, **401 byte-unchanged**, **ZERO unexpected changes/missing files**. Exact list in `protection.json`. Protected homepage/Index/Hero/Navbar/logo/navbar vehicle/Hero vehicles/production InsideTOLI/older model/replica/source/official PNG/Vehicle assets/package manifests/Vite config/workflow/entryHTML remain unchanged. App changes only wrap explicit Classic recovery; no root redirect. Original315-file freeze guard stays active with exact App/ServiceRequestDialog Stage3 authorized hashes, not broad exclusions.

Final full suite **446tests/62files PASS** (433/60baseline+13meaningful tests, no removed baseline tests). Production build29.51s; TSapp18.68s; TSnode1.82s; QAconfigs2.30s; lint12.19s with0warnings; fulltests136.64s (Vitest132.96s). New final QA instrumentation was additionally rebuilt/typechecked/linted after callback instrumentation; logs retained. Earlier intermediate445pass, lintwarning and red preselection run are not final results. Final desktop LAN customer artifact warning/error console empty; injected503/compiler failures are scoped diagnostics, not healthy-console failures. Build retains pre-existing chunk-size/Tailwind advisory output, not suppressed.

## Physical handoff / unverified physical items

Current Wi-Fi `wlp2s0`:**192.168.1.14**, freshly detected, private-only candidate server port**8153**, session12866. **ANDROID URL: http://192.168.1.14:8153/Toli-2/#/3d-production-preview**. Browser LAN desktop rendered ready1canvas; this does not prove another device reaches it. Normal candidate has no QA controls/injection. Separate existing loopback8153 remains untouched; private LAN listener binds only192.168.1.14. No public tunnel/router/DNS/firewall/hosting/deployment changes.

Temporary artifact/server in `/tmp/toli-stage3`; do not expect it after a restart/temp cleanup. Keep computer awake, use same trusted Wi-Fi. Stop current LAN foreground session withCtrl+C when testing finishes. Restart only if no listener: from project, `npm run preview -- --outDir /tmp/toli-stage3/package-final --host 192.168.1.14 --port 8153 --strictPort`. Redetect IP first. Instructions/checklist in updated physical QA document supersede older URLs.

Android devices tested0; Android/TalkBack/physicaltablet/GPUdriver/backgroundrotation/touch/sustaineduse all**UNVERIFIED**. Physical timing**UNMEASURED**; user-observed smoothness/warmth must be labeled**SUBJECTIVE**. No user should inject artificial GPU failures on phone. Prefer lower-end+mid-range actualAndroid and10min normal use, severalStandard↔3Dcycles. No production migration authorized even after future physical pass.

## Decision

**STAGE 3 RELEASE CANDIDATE = PARTIAL**: local shader failure/retry, retained-package A/B, graceful chunk recovery, lifecycle/state/navigation/accessibility/responsive/regression pass; **current deployment workflow does not consume retained packages**. Exact previous public artifact retrieval/bootstrap, host caching and rollback require a separate authorized release integration/rehearsal. Physical gate remains separate and open. Do not publish the current plain-dist workflow as if this retention issue were already solved.

**PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.**

Final handoff host GET independently verified the package manifest identity and exact replica4268456bytes/SHA; this request is separately labeled in `lan-host-verification.json`, not counted as a phone request or initial18-response browser startup. Temporary loopback QA/simulation/failure servers8156/8157/8158 stopped; private LAN8153 remains running. Existing prior loopback8153 preview was left intact.


## DEPLOYMENT RETENTION HARDENING — STAGE 3B

21 October 2026. **STAGE 3B DEPLOYMENT RETENTION = PASS** within the authorized local and non-deploying candidate scope. The remaining preparation gap now has one canonical command:

```sh
npm run release:prepare -- --previous /absolute/path/to/previous-verified-schema2-package
```

This performs a clean temporary production build, inventories the actual Vite output graph, assembles and validates `release-dist`, and preserves prebuilt current/previous archives. A manually dispatched candidate workflow consumes that exact safe directory, with no deployment job or production activation. Missing history fails closed; explicit bootstrap is a local seed, not protection for an unprovided public release.

New normal B identity `toli-73b9da574a7cc0a9559c841f`: 121 current files, 53 retained dependencies, two metadata files, 176 total files / 29,962,551 bytes. B retains only A's current immutable dependency inventory. C drops inherited A history and retains B's current dependencies. The bounded window lasts while a release is immediately previous. The Stage 3 schema1/unbounded assembler is historical and is not accepted by the canonical pipeline.

Canonical A/B builds, open A lazy loading from B, fresh B entry/manifest/workshop, permanent chunk failure with explicit-only reload, fail-closed CLI cases, repeat-build identity, complete prebuilt classic-primary rollback, base/routes/context ownership and workshop/Vehicle retries all pass. Full regression:460 tests/63 files, build, app/node TypeScript, QA configurations and zero-warning lint pass. No application runtime or protected visual asset changed; 417-file audit reports zero unexpected changes. Details, exact logs and limitations are in the dedicated Stage 3B report.

Under Stage 3B section5 the live Pages workflow stays byte-unchanged. Its future separately authorized publishing job must consume the pinned candidate artifact or this canonical preparation/output, not independently rebuild raw dist. Real public artifact bootstrap/retrieval, host headers/atomic visibility, actual remote CI execution and rollback deployment remain unverified. No deployment, upload, push or rollback occurred. Android/TalkBack/physical tablet/GPU/sustained use remain unverified.
