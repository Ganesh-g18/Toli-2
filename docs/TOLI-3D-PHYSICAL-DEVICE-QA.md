> **24 October2026 — bonnet/boot/360 successor:** exact candidate **`toli-03ea962c2a2df6ceb9b08c5e`** supersedes the earlier interactive vehicle for new validation. Previous `toli-eae3a1c9fcfd44e187e0056c` is rollback only. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** Earlier device handoffs and physical sections below are historical. New bonnet/boot,360drag/pinch/orientation and lifecycle need real Android testing. [Current source/package report](TOLI-3D-VEHICLE-OPENINGS-360.md).

# INTERACTIVE VEHICLE PHYSICAL ANDROID VALIDATION

24 October 2026. **FINAL INTERACTIVE VEHICLE ANDROID VALIDATION = USER TEST REQUIRED.** This is the current handoff; all older LAN links and release-specific physical sections below are historical. No physical Android is connected or controllable through available tools. USB inventory contains hubs, keyboard/receiver and Bluetooth, no phone; adb is not installed. No emulator or desktop test is counted as physical evidence.

## Exact release and Android handoff

- Identity: **`toli-eae3a1c9fcfd44e187e0056c`**, fresh canonical validation PASS.
- Canonical directory: `/home/thunder/shared/tolimotors-main1/tolimotors-main/release-dist` (not a development build).
- Interactive primary: **4,285,876 bytes**, SHA256 `6829988a38b3d4b56f1b82d7a31b2dd56d17a51dfdff75013e7bdcdf418acf2f`.
- Rollback only: **`toli-bbf42d50026777e1b6b7b424`**; not the test candidate.
- Fresh route/interface inspection: Wi-Fi `wlp2s0`, **192.168.1.14/24**, port **8173**, bound specifically to that private address.

**FULL ANDROID URL: http://192.168.1.14:8173/Toli-2/?workshopLocation=vehicle#/3d-production-preview**

The host fetched HTTP200 entry, manifest and fingerprinted primary from this LAN endpoint; every byte matches the frozen canonical package. Host reachability is verified; phone reachability is UNVERIFIED. Preview server session10129 is running. Keep computer awake and phone on the same trusted Wi-Fi. No public tunnel, deployment, DNS, router-forwarding or firewall change. Stop the temporary server after testing; restarting requires fresh IP detection, port availability and exact candidate validation, without rebuilding. The local helper is `/tmp/toli-interactive-android-server.py`; it refuses a different candidate and directory listing.

## Device record and physical result

Phones tested **0**. Manufacturer/model, Android version, browser/version, resolution and DPR: **UNVERIFIED**. Physical screenshots/traces: **NONE**. Do not infer device details, touch reliability, smoothness or heating from desktop evidence. Physical evidence, if supplied later, must identify its actual device/orientation/origin and remain separate from emulated images.

All rows below are **NOT TESTED**. Zero counts mean not performed, not failed. Record actual successes / attempts and expected/actual details; use the existing semantic buttons when a far-side mesh is not reasonably reachable, but report mesh and semantic results separately.

| Physical check | Required procedure | Result |
|---|---|---|
| First load/default | Official logo, shell, workshop, primary, secondary, detailing; no black/blank/freeze/crash. Lights OFF; both front doors CLOSED. | NOT TESTED |
| Headlights | Tap each left/right real lens; either toggles both ON/OFF. Warm-white optics and restrained floor illumination; no flicker/black lens/neon/GPU artifacts. | NOT TESTED;0/10 deliberate reliability taps |
| Left front door | Tap closed/open panel; correct58° hinge, moving mirror/handle, aligned close, no clipping/detachment;650ms movement. | NOT TESTED;0/10 taps |
| Right front door | Same open/close/hinge/parts/animation checks independently. | NOT TESTED;0/10 taps |
| Rapid/combined | Rapid open-close-open-close mid-motion; both doors together; lights+both doors. No random angle, accumulating animation or state mismatch. | NOT TESTED |
| Unsupported rear | Rear doors intentionally static; do not report as broken features. | NOT A FEATURE |
| Gestures/targets | Repeated camera drags from body, door and headlight; no accidental toggles beyond threshold. Assess precision and false activations from unrelated body taps. | NOT TESTED |
| Semantic controls | Headlights, Front left door, Front right door; verify UI→3D and mesh→UI synchronization. | NOT TESTED |
| Portrait/landscape | Approved sheet/lower strip, both cars, detailing and accessible controls; touch mapping after resize. Rotate with door open. | NOT TESTED |
| Rotations | Five complete portrait→landscape→portrait cycles; canvas/camera/UI/hit testing/animation stable. | NOT TESTED;0/5 |
| Vehicle exit/reentry | Lights+doors active→Services→Vehicle resets; ten reentries, one of each object and no duplicated lights/doors/mirrors/handles. | NOT TESTED;0/10 |
| Standard View | Lights+door active→Standard→3D resets; five complete cycles, one active spatial canvas, no progressive slowdown. | NOT TESTED;0/5 |
| Background/history | Lights+one door active; background briefly/return multiple times; Android Back/Forward across destinations. | NOT TESTED |
| Locations | Overview, Services, Vehicle, Journey, Why TOLI, Gallery, Reception, TOLI AI. | NOT TESTED;0/8 |
| Services | All nine selections reachable, especially04 Premium Detailing. | NOT TESTED;0/9 |
| Request | Premium Detailing→canonical01 YOUR DETAILS /02 VEHICLE /03 SERVICE /04 REVIEW; preselection, navigation, keyboard/scroll; close. **DO NOT SUBMIT.** | NOT TESTED;submission NO |
| Gallery/AI | Gallery image open/close; AI open/type/local response/close. External inference must be checked with physical network evidence where available. | NOT TESTED |
| Sustained use | Approximately10min, substantial Vehicle interaction plus Services/Gallery/Reception/AI/Standard. Approximately20 light toggles,20 left and20 right door actions. No automation substituted for physical actions. | NOT TESTED;0minutes;0/20 each |
| Stability/thermal | Observe slowdown, corruption, crash, context loss, degraded touch and perceived heating. Heating is subjective unless instrumented. | NOT ASSESSED |
| TalkBack | Three Vehicle controls, Locations, Request and Standard View. | UNVERIFIED |
| Physical tablet | Separate actual hardware if available. | UNVERIFIED |

## Physical performance and defects

**PHYSICAL PERFORMANCE TIMING = UNMEASURED.** Closed/lights ON/door animation/both doors+lights subjective categories: **NOT ASSESSED**, not SMOOTH. Lights OFF-versus-ON difference: NOT ASSESSED. No FPS, temperature or physical GPU claim. Prior desktop100draw-call/one-context measurements remain desktop baseline only.

P0/P1/P2/P3 = **NOT ASSESSED**. No physical defect evidence, fix or same-device retest. A real issue must record device, orientation, destination, state, exact action, expected, actual, frequency and severity. Reproduce, make the smallest justified fix, retest SAME phone, then full regression/canonical preparation/new identity/retention validation and physical retest. No redesign or feature expansion.

## Regression, freeze and next gate

No application, asset, geometry, camera, lighting, touch, config, tests or package changes. Only the three requested reports and new validation evidence changed. Retained verified baseline: **485 tests /66 files PASS**, production build/application TS/node TS/QA TS/lint PASS. Not rerun without source changes; fresh canonical/host checks are separate. Protection before/after details: `tools/release-audit/interactive-vehicle-android/protection.json`; host evidence: `host-verification.json`. Traditional homepage/Hero/Navbar/logo/Hero vehicles/Inside TOLI, workshop architecture/detailing/secondary and both release packages remain protected.

FINAL INTERACTIVE VEHICLE ANDROID VALIDATION = USER TEST REQUIRED

PRODUCTION MIGRATION = NOT PERFORMED

NEXT GATE = FINAL PRODUCTION MIGRATION AUDIT, **only after genuine final-candidate physical PASS/PASS AFTER FIXES**. This handoff does not clear or authorize migration.

---

> **23 October 2026 — Interactive primary vehicle successor:** candidate **`toli-eae3a1c9fcfd44e187e0056c`** adds paired headlights and two independent front doors; workshop/camera unchanged. **485 tests /66 files PASS. PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** Emulated phone checks are not physical evidence. Previous `toli-bbf42d50026777e1b6b7b424` retained. See [interactive vehicle audit](TOLI-3D-INTERACTIVE-VEHICLE.md).

> **23 October 2026 — Vehicle composition successor:** current candidate **`toli-bbf42d50026777e1b6b7b424`**, unchanged workshopSHA256 `0f7497aed3a2e5950b3c7f35cfd1a7fc02052479604dfd754baa93a8677bc1e3`; camera/Vehicle panel updated. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** Prior candidate/phone handoffs below are historical; no phone tested.468tests/65files PASS. [Current composition report](TOLI-3D-VEHICLE-COMPOSITION.md).

> **New source-owned detailing+cars revision — 22 October2026.** Current exact release **`toli-ff21133adc182b072b14c15e`**, model5,179,488bytes/SHA256 `0f7497aed3a2e5950b3c7f35cfd1a7fc02052479604dfd754baa93a8677bc1e3`. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** Earlier e937detailing-only identities/LAN checks below are historical and do not clear this revised profile. No phone tested. Current automated baseline467tests/65files PASS. [Source, parity and release report](TOLI-3D-DETAILING-CARS.md).

# DETAILING RELEASE PHYSICAL ANDROID VALIDATION

22 October2026. **FINAL DETAILING ANDROID VALIDATION = USER TEST REQUIRED.** This section supersedes every older LAN URL/candidate-specific physical record below. No real Android connection is available; desktop readiness does not clear any phone check.

## Release and trusted-LAN handoff

- Exact frozen identity: **`toli-e937dc7ab7a9566dd6d5d221`**. Fresh canonical package validation PASS. No build/reassembly or source/model change.
- Served directory: `/home/thunder/shared/tolimotors-main1/tolimotors-main/release-dist/`.
- Package:122current +33retained +2metadata = **157files /33,696,938bytes**.
- New detailing model: **4,594,732bytes**, SHA256 `966a399bad66c0003f7b196052c92382188629db16c1ec47c86c3175fcf5f9bd`; served immutable `models/staging/toli-workshop-detailing.966a399bad66c0003f7b196052c92382188629db16c1ec47c86c3175fcf5f9bd.glb`.
- Fresh default-route/address inspection: trusted Wi-Fi `wlp2s0`, **192.168.1.14/24**, available port **8164**. Preview binds specifically to this private IPv4. Foreground server session **69585** stays running for testing.

**FULL ANDROID URL: http://192.168.1.14:8164/Toli-2/#/3d-production-preview**

Open on the same trusted Wi-Fi; keep this computer awake and preview running. Phone reachability is **UNVERIFIED**. Host HTTP200 manifest, entry HTML and fingerprinted GLB all match exact package bytes. Fresh desktop LAN Vehicle sanity visibly confirms trolley, polisher, three folded cloths, four generic bottles, wound reel and neutral light, with car dominant and station grounded. One staging canvas, ready state and empty warning/error console. This is **desktop-only** readiness, not an Android PASS or phone screenshot. Evidence: `tools/release-audit/detailing-android/host-verification.json`, `desktop-readiness.json` and `desktop-readiness.jpg`.

No public tunnel, hosting, DNS/router forwarding/global firewall change or deployment. If unreachable, first check IP/awake/server/guest isolation. Do not disable firewall globally. Stop session69585 with Ctrl+C when done. Restart only after redetecting IP/checking port and verifying this exact candidate; from project run (replace IP if changed):

```sh
npm run release:validate
npm run preview -- --outDir release-dist --host 192.168.1.14 --port 8164 --strictPort
```

Do not rebuild to restart this gate. Stop if identity/bytes/checksum differ. Production root remains traditional; Standard `#/classic` and original `#/3d-experience` remain intact.

## Device / physical evidence

Physical phones tested: **0**; no supported Android tool/debugger exposed, `adb` not installed. Manufacturer/model, Android, browser/version, screen resolution, orientation and native/effective DPR: **UNVERIFIED**. Instrumentation **UNAVAILABLE**. No device identifiers or personal information collected. Physical screenshots/traces: none. If actual captures become available, store separately under `tools/release-audit/detailing-android/physical/`, recording device alias/orientation/destination and physical origin; never put desktop images there.

All functional rows are currently **NOT TESTED**. Record actual PASS / FAIL / NOT TESTED with technical device information and notes. Prefer representative lower-end and mid-range hardware when available. These are instructions for the human phone tester, not completed results.

## Complete detailing-candidate phone checklist

| Area | Required real-phone procedure | Current result |
|---|---|---|
| Cold first load | Fresh navigation where practical: shell, official logo, recognizable workshop, usable navigation. Note blank/black screen, prolonged freeze, crash, loading failure or WebGL error. No invented timing. | NOT TESTED |
| Station objects | Vehicle composition: identify trolley, polisher, cloths, four bottles, reel and inspection light where reasonably visible. Equipment left; car center/right and dominant. | NOT TESTED |
| Composition/contact | Believable scale/floor contact, no floating/clipped station, car/workshop intersections or blocked silhouette. Check UI/camera targets, Locations, service/bottom/Request controls remain reachable. | NOT TESTED |
| Materials/light | Graphite/gunmetal/steel/dark plastic/restrained red. No unexpected black materials, transparency artifacts, flicker, severe aliasing, broken lighting, overexposure/bloom or neon-looking inspection light. | NOT TESTED |
| All nine Services | Automobile Services; Spare Parts & Repairs; Battery Services; Premium Detailing; Vehicle Inspection; Consultation; Installation; Doorstep Pickup; AMC Plans. Check touch, readability and scroll. | NOT TESTED;0/9 |
| Premium Detailing | Select04 in existing Services; equipment remains environmental, with no separate service state. | NOT TESTED |
| Persistence | Select04 → Vehicle → Journey → Overview → Services:04 remains selected. | NOT TESTED |
| Canonical Request | Open with04selected:01 YOUR DETAILS /02 VEHICLE /03 SERVICE /04 REVIEW, Premium Detailing preselected. Clickable steps/Back/Continue, keyboard open/close, scrolling, manual brand/model, close/focus/draft restoration. Temporary non-sensitive values only. **DO NOT SUBMIT/SEND**. | NOT TESTED; submissionNO |
| Vehicle first load | Deferred Vehicle appears with workshop/station retained. Observe camera/touch/UI response without fake FPS. | NOT TESTED |
| Vehicle reentries | Complete at least **FIVE leave/return cycles**: e.g. Vehicle→Services→Vehicle→Gallery→Vehicle→Reception→Vehicle→Overview→Vehicle, then another leave/return to ensure five reentries. No duplicate car/station, increasing hitch, black canvas, lost textures or lighting. | NOT TESTED;0/5 |
| All eight Locations | Touch Overview, Services, Vehicle, Journey, Why TOLI, Gallery, Reception and TOLI AI. Each reachable. | NOT TESTED;0/8 |
| Touch/camera | Tap, short/long drag, vertical/browser/pinch gestures, Locations, service controls, bottom sheets/modals: no accidental activation, scroll trap, UI interference or behind-modal camera motion. | NOT TESTED |
| Gallery | Open photos, navigate where supported, close/reopen/touch; camera isolated and interaction restored. | NOT TESTED |
| Reception | Camera, official branding, Request entry and touch targets; open/close Request safely. | NOT TESTED |
| Local TOLI AI | Safe website-supported factual prompts; input/keyboard/local response/close/restoration. Confirm no external inference only where real network instrumentation permits. Existing engine unchanged; physical request trace UNVERIFIED. | NOT TESTED |
| Journey | Choose a service; Prepare your request; Send in WhatsApp; Discuss next steps. Touch/readability; no actual WhatsApp send. | NOT TESTED |
| Why TOLI | Readability, camera, touch and navigation. | NOT TESTED |
| Standard View | 3D→Standard traditional site→3D SHOP: revised workshop/station returns. | NOT TESTED |
| Five mode cycles | **FIVE** complete3D→Standard→3Dcycles: no blank/duplicate workshop/station/progressive slowdown/lost touch. | NOT TESTED;0/5 |
| Portrait | Vehicle/station purpose visible, secondary to car, controls readable/reachable, safe areas and no overflow. | NOT TESTED |
| Landscape | Vehicle/station, Services, Locations, Gallery, Request and AI without critical overlap/inaccessible controls. | NOT TESTED |
| Five rotation cycles | **FIVE** portrait→landscape→portraitcycles without refresh; canvas/camera/station/touch/modals correct. | NOT TESTED;0/5 |
| Background recovery | While Vehicle/station active, background briefly then return several times. Car/props/textures/canvas/touch restored. Note discarded-tab reload separately. | NOT TESTED |
| Back/Forward | Several destinations, Android/browserBack/Forward: correct state/camera/car/props/Premium Detailing selection. | NOT TESTED |
| Vehicle refresh | Shell→workshop→restored Vehicle destination→deferred car; station intact. | NOT TESTED |
| Ten-minute sustained use | Approximately **10minutes**, meaningful time in heaviest Vehicle composition, also Services/Gallery/Reception/AI/Standard/3D. Record actual duration, crash/context loss/corruption/touch degradation/progressive slowdown. | NOT TESTED;0minutes |
| Subjective comparison | Overview versus Vehicle+station: SMOOTH / MOSTLY SMOOTH / NOTICEABLE HITCHES / POOR. Record perceived heating/slowdown as **SUBJECTIVE USER OBSERVATION** only. No invented FPS/temp. | UNAVAILABLE |
| Physical performance | Genuine instrumentation only: cold/warm useful frame, DPR/GPU/renderer/long tasks where available. | **UNMEASURED** |
| TalkBack | Actual phone shell, Locations, Services, Request, Gallery, AI and Standard View if available. | **UNVERIFIED** |
| Physical tablet | Separate actual tablet test if available; emulation does not count. | **UNVERIFIED** |

No artificial GPU failure, new props/effects or speculative optimization. Ordinary usage only. If a real problem occurs, reproduce and record device/Android/browser/orientation/destination/action/expected/actual/reproduction rate/severityP0–P3. Physical defects **P0/P1/P2/P3 = NOT ASSESSED**, not zero defects. No fixes or same-device retest occurred.

For a reproduced performance issue investigate DPR, shadows/light/contact shadow, material/geometry/overdraw first. Preserve recognizable cart/polisher/bottles/cloths/reel/light. Where justified simplify invisible/small geometry, segments, share materials, batch, local shadow/light contribution, then quality bounds. Retest SAME phone. Any application/model fix requires full build/bothTS/QA/lint/tests and canonical release:prepare/retention validation/new exact identity; the current ID cannot represent a changed package.

## Regression / freeze / rollback

Documentation/evidence/local preview only. No application/model changes; no fresh full regression necessary or run. **Retained completed baseline:463tests /64files PASS**, production build/bothTypeScript/QA/zero-warning lint PASS, packaged console clean from detailing implementation. Fresh package validation and current desktop LAN sanity are separate checks.

Fresh protection audit: **628 existing protected files checked,628unchanged, zero changed/missing/unexpected additions**, including all157candidate files. Scope:src/public/workflows/release tools/editable Blender scenes/3D scripts and review files/root config and manifests/release-dist. Evidence: `tools/release-audit/detailing-android/before.json` and `protection.json`. Only three requested reports and new QA evidence changed/added.

Production homepage/Hero/Navbar/Navbar logo/Hero vehicles/traditional Inside TOLI/official PNG/Vehicle model and placement are unchanged. Workshop/props/source/camera/DPR/lighting/shadows/touch are frozen. Pre-detailing rollback GLB4,268,456bytes/SHA256 b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225 and original source6,491,638bytes/SHA256 b22fc938a7726323fa763720648befa86987c85ca61795a015d58cc375b65a38 freshly verified intact. Previous complete candidate archive remains available; no overwrite/delete/rollback activation.

No physical timing, smoothness/heating observation, screenshot, TalkBack/tablet, GPU/background/rotation or sustained-use result exists. Phone LAN reachability and every physical functional row remain open.

**FINAL DETAILING ANDROID VALIDATION = USER TEST REQUIRED**

**PRODUCTION MIGRATION = NOT PERFORMED**

**NEXT GATE = FINAL PRODUCTION MIGRATION AUDIT**, contingent on genuine final-candidate Android PASS/PASS AFTER FIXES. This handoff does not clear that gate or authorize root/deployment change.

---

> **22 October2026 — detailing revision supersedes the prior candidate.** Current release **`toli-e937dc7ab7a9566dd6d5d221`**, new workshop4,594,732bytes/SHA256 `966a399bad66c0003f7b196052c92382188629db16c1ec47c86c3175fcf5f9bd`. **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** Earlier identity `toli-73b9da574a7cc0a9559c841f` and its LAN URL below are historical and must not clear this revised model. [Detailing station report](TOLI-3D-DETAILING-STATION.md). All physical items remain unchecked; no phone tested. Retained/current automated baseline is now463tests/64files PASS.

# FINAL 3D MIGRATION RELEASE-CANDIDATE ANDROID VALIDATION

22 October 2026. **FINAL PHYSICAL ANDROID VALIDATION = USER TEST REQUIRED.** This section supersedes all older candidate identities, LAN URLs and baseline counts below for this gate. Historical records remain evidence of their original scope only.

## Frozen release candidate

- Exact identity: **`toli-73b9da574a7cc0a9559c841f`**. Fresh `npm run release:validate`: PASS before serving and after documentation updates.
- Served directory: `/home/thunder/shared/tolimotors-main1/tolimotors-main/release-dist/`, unchanged; no rebuild or reassembly.
- Package: **121 current + 53 retained + 2 metadata = 176 files, 29,962,551 bytes**.
- Authoritative replica and served fingerprinted replica: **4,268,456 bytes**, SHA256 `b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`.
- Runtime, official logo, Vehicle, workshop/source, camera, DPR, shadows and touch thresholds remain frozen. Production root remains traditional; `#/classic` and `#/3d-experience` remain unchanged.

## Android handoff — current LAN

**FULL ANDROID URL: http://192.168.1.14:8160/Toli-2/#/3d-production-preview**

Fresh address/default-route inspection: Wi-Fi `wlp2s0`, **192.168.1.14/24**; port **8160**. Preview binds specifically to this private IPv4, not all interfaces. Session **3628** stays running for testing. Host HTTP requests returned200 for the manifest, entry HTML and fingerprinted replica; served HTML/model match the exact package bytes. This is host readiness only: **another-device reachability remains UNVERIFIED**. No browser emulation or desktop timing substitutes for a phone result.

Use the same trusted Wi-Fi, keep this computer awake and the preview running. No public tunnel, router forwarding, DNS, hosting, firewall or production configuration change. If unreachable, check current computer IP, preview and guest/client isolation; do not disable global firewall. Stop session3628 with Ctrl+C after testing. For a later restart, first redetect IP, check port availability, validate this exact package identity and only then run from the project (replace IP if changed):

```sh
npm run preview -- --outDir release-dist --host 192.168.1.14 --port 8160 --strictPort
```

Do not run a new build to restart this gate. If identity differs, stop rather than validating a different candidate.

## Device and current physical result

Available genuine Android connection/debugger: **NONE**; `adb` is not installed and no supported Android device tool is exposed. Physical phones tested: **0**. Physical tablets tested: **0**. Device manufacturer/model, Android, browser/version, orientation and native/effective DPR: **UNVERIFIED**. Remote instrumentation: **UNAVAILABLE**. No pairing/device identifiers collected.

**All physical functional rows below are NOT TESTED.** Record PASS / FAIL / NOT TESTED plus a non-identifying device alias and notes for each device. Prefer representative older/lower-end and mid-range hardware when available. A desktop responsive screenshot never clears these rows.

## Complete phone checklist

| Area | Required physical procedure | Current result |
|---|---|---|
| First load | Open the exact URL from a fresh tab; shell and official logo appear, loading understandable, Standard View available, recognizable workshop and usable navigation; no prolonged blank white/black screen or endless loading. Note actual startup hitch. | NOT TESTED |
| Branding | Shell, Reception, Services and facade **only where actually visible**: correct aspect, no clipping, mirroring, distortion, wrong filter or undue blur. Approved interior poses may not show facade; do not claim it seen. | NOT TESTED |
| Overview | Usable camera/composition, discoverable navigation, no major clipping, lighting defect or severe z-fighting. | NOT TESTED |
| All eight Locations | Touch Overview; Services; Vehicle; Journey; Why TOLI; Gallery; Reception; TOLI AI. Each reachable with correct content/camera and controls. | NOT TESTED |
| All nine Services | Automobile Services; Spare Parts & Repairs; Battery Services; Premium Detailing; Vehicle Inspection; Consultation; Installation; Doorstep Pickup; AMC Plans. Check selection, touch targets, readability and scrolling. | NOT TESTED |
| Premium Detailing persistence | Select04 Premium Detailing → Vehicle → Journey → Services: Premium Detailing remains selected. | NOT TESTED |
| Request canonical flow | With Premium Detailing selected, open Request Service. Check01 YOUR DETAILS /02 VEHICLE /03 SERVICE /04 REVIEW; correct preselection, validation, clickable steps, Back/Continue, brand/model and review. Use temporary non-sensitive values only; **do not submit/send**. | NOT TESTED |
| Request keyboard/touch | Focus fields, open/close phone keyboard, scroll while keyboard visible, Back/Continue, close/reopen same-session draft, focus/scene restoration. Existing refresh clears in-memory drafts. | NOT TESTED |
| Vehicle first load | Observe actual deferred first load: workshop retained, contained loading, complete grounded Vehicle, usable camera and responsive touch. | NOT TESTED |
| Vehicle five reentries | Leave/return at least **FIVE times**; record completed count. No duplicate cars, progressive hitch, black scene, camera corruption or lost touch. | NOT TESTED; 0/5 |
| Journey | Choose a service; Prepare your request; Send in WhatsApp; Discuss next steps. Touch/readability correct; **do not actually send**. | NOT TESTED |
| Why TOLI | Readable correct content, usable camera/navigation, no clipping or invented/broken content. | NOT TESTED |
| Gallery | Open/next/close/reopen/close by touch. No camera movement or unexpected page scroll behind modal; interaction/focus restore. | NOT TESTED |
| Reception | Official branding, composition, touch targets and Request entry; open/close Request and return safely. | NOT TESTED |
| TOLI AI | Several safe factual questions supported by website knowledge; panel/input/keyboard/response/close/focus. Existing local deterministic engine unchanged. Physical network trace/external inference requests UNVERIFIED, not a claimed measured zero. | NOT TESTED |
| Standard View | 3D → Standard: traditional site usable, staging canvas gone/inactive as designed; 3D SHOP returns correctly. | NOT TESTED |
| Five mode cycles | Complete **FIVE** 3D → Standard → 3D cycles. No blank/crash, duplicate canvas, progressive slowdown or lost touch. | NOT TESTED; 0/5 |
| Portrait | Overview, Services, Vehicle, Gallery, Reception: safe areas, reachable bottom controls/sheets, no horizontal overflow. | NOT TESTED |
| Landscape | Camera, Locations, Services, Vehicle, Gallery, Request and AI: no critical overlap or inaccessible controls. | NOT TESTED |
| Five rotation cycles | Complete **FIVE** portrait → landscape → portrait cycles, including Overview/Vehicle and modal interactions. Canvas sizing, camera, touch mapping, bottom controls correct; no refresh required. | NOT TESTED; 0/5 |
| Background/foreground | Background briefly and return several times, including Overview and Vehicle. Scene recovers, touch/navigation/car work; no permanent black frame. Note any ordinary discarded-tab reload separately. | NOT TESTED |
| Browser Back | Navigate destinations then use Android/browser Back where appropriate; logical history without unintended exit from broken handling. | NOT TESTED |
| Refresh | Separately refresh Services and Vehicle; safe restoration through shell/workshop/deferred Vehicle. | NOT TESTED |
| Touch conflicts | Tap, short/long drag, vertical gesture, Locations, bottom sheets, Gallery/Request/AI. No UI activation during camera drag, behind-modal camera movement, scroll trap or stuck/unresponsive touch. | NOT TESTED |
| Pinch/browser gestures | Normal safe browser gestures; no catastrophic conflict. Do not bypass browser restrictions. | NOT TESTED |
| Ten-minute sustained use | Approximately **10 minutes** normal Services/Vehicle/Gallery/Reception/AI use with repeated navigation. Record actual duration, browser warnings, corruption/context loss, progressive slowdown/touch degradation. | NOT TESTED; 0 minutes |
| Subjective smoothness/heating | Record smooth / mostly smooth / noticeable hitch / poor and perceived warmth only as **SUBJECTIVE USER OBSERVATION**. No invented FPS or temperature. | UNAVAILABLE |
| Physical performance | Cold/warm useful frame, DPR, renderer/GPU/long tasks only with genuine instrumentation. No visual estimates. | **UNMEASURED** |
| TalkBack | If actually available, exercise shell/Standard/Locations/Services/Request/Gallery/AI on Android. Desktop keyboard does not count. | **UNVERIFIED** |
| Physical tablet | Shortened separate real-tablet portrait/landscape/navigation/Vehicle/keyboard pass when available. | **UNVERIFIED** |
| Optional connectivity | Only a safe individual-device connectivity toggle, without affecting others: deferred feature failure → restore → retry. Otherwise skip. No router disruption. | NOT TESTED / OPTIONAL |

No artificial shader/context/GPU failure controls or synthetic stress on phone. Normal usage only. No actual request/WhatsApp message was sent in this gate.

## Physical evidence, defects, fixes and retest

No physical screenshots or traces captured. If actual tooling or user captures become available, store them separately in `tools/release-audit/final-android/physical/` with technical device alias, orientation, destination and explicit physical origin. Representative captures: startup/workshop, Services, Vehicle, Gallery, Reception and landscape. Do not populate this directory with desktop renders.

P0/P1/P2/P3 physical defects: **NOT ASSESSED**, rather than zero defects. No phone was tested. For every actual issue record device, Android, browser/version, orientation, destination, action, expected, actual, reproduction rate and severity. Reproduce first, make only the smallest justified change, retest the SAME device. No speculative runtime/asset/quality/touch changes, no fixes and no same-device retest in this gate.

Any later code fix requires build, both TypeScript checks, QA, lint and all tests; then canonical release preparation with verified previous package, retention verification and recording the new exact release identity before further validation. Never report the old ID for a changed artifact.

## Regression and production protection

Documentation/evidence and local preview invocation only. No application/configuration/test changes; no fresh full regression needed or run. **Retained Stage3B baseline:460 tests /63 files PASS**, production build, both TypeScript checks, QA and zero-warning lint PASS. Logs: `tools/release-audit/stage3b/regression/`. These are prior results, not fresh physical-gate measurements. Fresh package validation and host identity checks passed separately.

Fresh before/after audit: **582 existing protected files checked,582 byte-unchanged, zero missing/changed/unexpected additions**, including **all176 candidate files**. Scope: all src/public, workflows, release tools, editable Blender sources and root application/configuration manifests. Exact records: `tools/release-audit/final-android/before.json` and `protection.json`. Only the two requested QA/checklist documents and new validation evidence are changed/added.

Homepage=NO change; Hero=NO; Navbar=NO; Navbar logo=NO; navbar vehicle=NO; Hero vehicles=NO; production Inside TOLI=NO. Replica/source=NO; official logo=NO; Vehicle model=NO; older approved workshop=NO. Camera/DPR/shadows/touch=NO. Release package=NO. No root migration/deploy/publish/remote workflow/hosting change.

## Remaining unknowns / next gate

Phone LAN reachability, device identity, first load/branding, all destinations/services/state/Request/keyboard, Vehicle/reentries, content/modal/touch/history/refresh, orientations/rotations/background, ten-minute stability/thermal behavior, physical console/network/GPU and TalkBack/tablet remain unverified. There is no new physical timing, subjective observation or physical screenshot evidence.

**FINAL PHYSICAL ANDROID VALIDATION = USER TEST REQUIRED**

**PRODUCTION MIGRATION = NOT PERFORMED**

**NEXT GATE = FINAL PRODUCTION MIGRATION AUDIT**, contingent on a genuine final-candidate physical PASS or PASS AFTER FIXES. This handoff does not clear that gate or authorize deployment/root change.

---

# Stage 3 current physical-device handoff

21 October2026. This section supersedes every older URL/model/count below for the current test. Older sections remain historical evidence.

**STAGE3 RELEASE CANDIDATE = PARTIAL** (deployment retention workflow integration remains open). **PHYSICAL ANDROID VALIDATION = REQUIRED. PRODUCTION MIGRATION = NOT AUTHORIZED.** Local engineering checks in the Stage3 report pass within their documented scope; no physical result is inferred.

## Current candidate / access

**ANDROID URL: http://192.168.1.14:8153/Toli-2/#/3d-production-preview**

LAN IP192.168.1.14, Wi-Fi interfacewlp2s0, port8153: freshly detected21October. Private-only server bound specifically to this address, session12866. Existing loopback8153 untouched. Candidate `/tmp/toli-stage3/package-final`, identity **toli-c31024f8c85771f3a04c505d**. Keep computer awake and phone on same trusted Wi-Fi. Desktop LAN browser ready1canvas/empty warnings/errors and exact replica request are host readiness only; **another-device reachability UNVERIFIED**. No tunnel/router/DNS/firewall/hosting/deploy change. DHCP can change IP.

Replica4,268,456bytes, SHA256 `b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`, full-SHA staged URL. Official1483×352 PNG unchanged. Final package manifest provides current/retained byte identities. All customer flags/QAinjectors absent. Root traditional; `#/classic` Standard; original`#/3d-experience` preserved.

When testing finishes, stop the temporary LAN server withCtrl+C or ask the agent to stop session12866. For restart, first redetectIP/check listener and ensure temporary package still exists, then from project:

```sh
npm run preview -- --outDir /tmp/toli-stage3/package-final --host 192.168.1.14 --port 8153 --strictPort
```

The `/tmp` candidate is temporary; regenerate via tools/release/README.md after cleanup/restart and record new exact identity if build changes. Do not start duplicate listeners. If unreachable check computerIP/awake/server/guest isolation; do not globally disable firewall or expose a public tunnel.

## Actual physical status

Physical devices tested **0**. Supported tool inventory exposes desktop browser only; no genuine Android/debugger. No serial/account/device identifiers collected. Device model/Android/browser/native-effectiveDPR **UNVERIFIED**. **PHYSICAL TIMING = UNMEASURED. TALKBACK = UNVERIFIED. PHYSICAL TABLET = UNVERIFIED.** GPU/driver/background/rotation/sustaineduse **UNVERIFIED**. Current physical duration0minutes. No desktop capture is stored as phone evidence.

Prefer an older/lower-end and a mid-range Android where available; flagship-only success is not broad low-end proof. Record technical model/Android/browser/version and a non-identifying alias, not serial/IMEI/accounts. For each row record PASS / ISSUE / NOT TESTED plus steps/notes. All current rows are **NOT TESTED**.

| Check | Procedure / expected behavior | Current result |
|---|---|---|
| First load | Open exact Android URL, reload and warm return; real workshop and usable controls, no lasting black/blank/crash/freeze. Do not estimate milliseconds. | NOT TESTED |
| Official logo | Shell and Services/Reception: unchanged aspect/colors/alpha, readable/no mirrored/clipped/z-fighting logo. Exterior only if actually visible from a supported view. | NOT TESTED |
| Overview | Recognizable lane/floor/frames/roof/fixtures/reception, native Locations accessible. | NOT TESTED |
| All8Locations | Overview, Services, Vehicle, Service journey, WhyTOLI, Gallery, Reception, TOLI AI; touch/camera/content/focus correct. | NOT TESTED |
| All9Services | Automobile Services; Spare Parts & Repairs; Battery Services; Premium Detailing; Vehicle Inspection; Consultation; Installation; Doorstep Pickup; AMC Plans. | NOT TESTED |
| Premium persistence | Select04PremiumDetailing→Vehicle→Standard→3D→Reception→Request. SERVICE step PremiumDetailing. Close and confirm selection. | NOT TESTED |
| Request / draft | Four clickable steps, Back/Continue, manual brand/model, review/validation, phone keyboard/scroll, close/reopen draft in same session; only one form/modal. **Do not submit/send.** Refresh clears existing in-tab drafts by contract. | NOT TESTED |
| Vehicle first entry | Deferred complete car, grounded position/lighting/framing; note upload/shader hitch without invented timings. | NOT TESTED |
| Vehicle reentry | Vehicle→Overview→Vehicle→Services→Vehicle→Reception→Vehicle; no duplicates/lostcar/increasinghitch. | NOT TESTED |
| Journey | All4steps/contextualRequest readable/reachable; no WhatsApp send. | NOT TESTED |
| WhyTOLI | Content readable with workshop context. | NOT TESTED |
| Gallery | Realphotos, open/next/previous/close/touch; no camera movement behind dialog; returns to photo trigger. | NOT TESTED |
| Reception | Modeledoffice/logo/desk context; Request opens/closes correctly. | NOT TESTED |
| TOLI AI | Normal local service questions, keyboard/panel/close/return focus; no external inference where observable. | NOT TESTED |
| Standard cycles | 3D→StandardView→3D several times: no crash/blank/increasinglyslowreturn/visibleduplicatecanvas. Navigation business content remains usable. | NOT TESTED |
| Portrait / landscape | Overview andVehicle; safeareas/carframing/reachablecontrols/sheets/readabletext/nohorizontaloverflow. | NOT TESTED |
| Rotation | Portrait→landscape→portrait repeatedly atOverview andVehicle; no zero-size/stretched/black scene or lost controls. | NOT TESTED |
| Touch gestures | Tap/shortdrag/longdrag/scroll/pinch/systemgestures; no double/missedactivation, behind-modal movement or scrolltrap. | NOT TESTED |
| Background / foreground | Background about10seconds atOverview thenVehicle, return. Resident scene recovers; normal discarded-tab reload acceptable. | NOT TESTED |
| History | Back/Forward across destinations correct, no needless fullscene replacement where observable. | NOT TESTED |
| Ten-minute sustained use | About10minutes normal destinations,Vehicle,Gallery,Requestclose,AI,Standardcycles. Recordduration; subjectivewarmth/smoothness labeled **SUBJECTIVE**. Stop if uncomfortable; no synthetic torture. | NOT TESTED |
| Physical performance | Actual measurements only if genuine debugger/instrumentation available. Otherwise **PHYSICAL TIMING = UNMEASURED**; subjective observations are not metrics. | NOT TESTED |
| Network / driver | With real debugging only: exact versionedGLB, deferredVehicle, no404storm, no externalAIinference; observe genuine errors during normal use. OtherwiseUNAVAILABLE. | NOT TESTED |
| TalkBack | Actual Android TalkBack navigation/labels/dialogfocus/controls. Desktop keyboard is not substitute. | UNVERIFIED |
| Physical tablet | Separate realtablet portrait/landscape/split-screen/Vehicle/keyboard where available. EMULATED captures not physical evidence. | UNVERIFIED |

Do not ask users to inject shader/context/driver failures on a phone. Failure injection belongs only to the local engineering QA build. If genuine failure occurs during normal use, record action/destination/orientation/symptom/reproduction rate, use Standard/Retry normally, and report it; no crash/memory-pressure torture.

Save actual phone screenshots separately under `tools/release-audit/stage3/physical/` when supplied, with alias/orientation/destination and explicit physical origin. CaptureOverview/Services/Vehicle/Receptionportrait andOverview/Vehiclelandscape. Do not put desktop screenshots there. For issues: recorddevice/OS/browser/steps/expectedactual, reproduce, make smallest evidence-led fix, retest same device and rerun required regression. No physical defect/fix/retest has yet occurred.

Local desktop medians126.5ms shell/993.5ms useful,19calls/1context and446tests/62files are **desktop/automated evidence only**. Full Stage3 report documents local shader/link/retry and A/B retained packaging, but current Pages pipeline still plain dist; release-candidate remainsPARTIAL. Physical testing may inspect this isolated candidate without authorizing cutover. No production migration follows from a later phone pass.

---

# Historical physical QA records

# TOLI 3D experience — Iteration 4 physical-device QA

Date: 21 October 2026. Route: `#/3d-experience`.

**3D EXPERIENCE PHYSICAL VALIDATION = USER TEST REQUIRED.**

No physical phone/tablet was available through the supported tools. Desktop LAN access is verified; it is not evidence of phone connectivity, touch usability or mobile performance. Traditional production remains primary. No deployment or migration is authorized by this report.

## TEST ENVIRONMENT

Existing project `/home/thunder/shared/tolimotors-main1/tolimotors-main`, Vite production build with base `/Toli-2/`. Only the Codex desktop in-app browser is exposed; available tool inventory contains no Android/physical-device debugger. `adb` is not installed. No USB/debugging pairing, device identifiers or personal data were collected.

## LAN ACCESS METHOD

Detected active Wi-Fi interface: `wlp2s0`, IPv4 **192.168.1.14**. Default route uses that interface. A temporary preview is bound specifically to this LAN address, port **8140**, rather than all interfaces. The production networking configuration is unchanged.

**Device URL:** <http://192.168.1.14:8140/Toli-2/#/3d-experience>

The server was started using the existing project runtime:

```sh
cd /home/thunder/shared/tolimotors-main1/tolimotors-main
npm run preview -- --host 192.168.1.14 --port 8140 --strictPort
```

The current agent-started server already occupies this port. Do not start a duplicate. For a later session, run `npm run build` first, then this command; stop a foreground preview with Ctrl+C. Ask the agent to stop the current LAN preview when testing is complete. This is temporary local testing, not production hosting.

Host-side HTTP checks returned200 for `/Toli-2/` and the approved workshop GLB (4,076,400 bytes). One desktop browser smoke check opened the LAN route and rendered recognizable workshop geometry. **Another device reaching the server remains UNVERIFIED.** Keep computer and device on the same trusted Wi-Fi. If access fails, first check the computer's current IP, that the preview is still running, and whether the Wi-Fi uses guest/client isolation. Do not disable the firewall globally or configure router forwarding. No public tunnel, cloud upload, router change or firewall change was performed. DHCP may change the address after reconnection.

## DEVICES ACTUALLY TESTED / DEVICES NOT AVAILABLE / BROWSERS

| Priority | Physical device | Android | Browser/version | Resolution / DPR | Result |
|---|---|---|---|---|---|
| 1 Older/lower-end phone | Not available | Unverified | Unverified | Unverified | NOT TESTED |
| 2 Mid-range phone | Not available | Unverified | Unverified | Unverified | NOT TESTED |
| 3 Stronger phone | Not available | Unverified | Unverified | Unverified | NOT TESTED |
| 4 Android tablet | Not available | Unverified | Unverified | Unverified | NOT TESTED |

Physical devices actually tested: **0**. Desktop-only LAN screenshot: `tools/release-audit/spatial4/desktop-lan-smoke.png`; desktop warning/error console snapshot is empty. Neither is physical-device evidence. Browser-emulated results from Iteration3 remain browser results only. The desktop in-app browser is not an Android device. No remote Android debugging was performed. Record only technical model/OS/browser/resolution/DPR when completing this table; omit serial numbers, account details, IMEI, Wi-Fi identifiers and other personal identifiers.

## COLD START / WARM START / FIRST USEFUL FRAME

Physical results for cold-ish first load, normal reload and warm revisit: **NOT TESTED**. Physical timing: **MEASUREMENT UNAVAILABLE**. First useful frame requires recognizable workshop geometry and usable controls, not merely a canvas/loading screen. Record freezes, blank/black frames, shader hitch, texture pop, layout shift and browser warnings/crashes. Do not estimate milliseconds by eye. Restart browser state only where practical; do not claim a driver-cache reset without evidence.

Historical desktop references remain Iteration3 ~1177ms useful-frame median and ~203ms longest-startup-task median. They are not phone results. Historical ~1.59s shader stall remains cause unconfirmed. This iteration makes no new performance claim.

## TOUCH / CAMERA / ORIENTATION

Physical touch, gesture conflicts, missed/double taps, camera drag, scroll trapping and system gestures: **NOT TESTED**. Inspect Overview, Services, Vehicle, Journey, Gallery and Reception with real touch. Use portrait→landscape→portrait without reload; verify renderer resize, aspect, safe areas, readable sheets, reachable hotspots, full car framing and continued controls. No new desktop viewport sweep was substituted for these checks.

## VEHICLE / GALLERY / RECEPTION / SERVICE REQUEST / TOLI AI

All physical results: **NOT TESTED**. Vehicle must remain deferred and appear in its workshop bay with grounded contact and shared lighting. Observe loading/upload/shader delay without preloading it at initial startup. Operate Gallery/lightbox, including supported touch controls, close it and confirm Gallery is restored. Open Reception's Request; verify all four existing steps, scrolling, keyboard appearance and close restoration. No test requires sending a WhatsApp message or submitting customer data. Open local TOLI AI and close it; no external AI engine is introduced.

## BACKGROUND / FOREGROUND / MOBILE MEMORY PRESSURE

Physical Overview and Vehicle background→foreground recovery: **NOT TESTED**. Background briefly and return; check retained geometry, controls, camera and duplicate model downloads where observable. Ordinary safe multi-app behavior only. A discarded tab reloading normally is acceptable; a resident page should recover. Do not intentionally provoke device crashes or memory exhaustion.

## SUSTAINED USE

Physical duration: **0 minutes**. Responsiveness, heat, throttling, battery-heavy behavior and degradation: **UNVERIFIED**. Use normal site navigation for5–10minutes where practical; do not run GPU torture workloads. Label perceived warmth/lag as subjective unless reliable measurements exist. Stop if use is uncomfortable.

## QUALITY TIER / DPR

Physical DPR and actual selected renderer settings: **UNVERIFIED**. Source audit confirms existing bounds, without changing them:

- Renderer DPR = min(native DPR,1.25) for viewport width<768 or reported device memory≤4GB; otherwise min(native DPR,1.5).
- Environment resolution128 on those same conditions; otherwise256.
- Antialiasing chosen at renderer creation for viewport width≥768. It does not dynamically reconfigure on rotation.
- No shadow-map pass in this isolated scene; existing generated contact shadow remains.
- Camera portrait adaptation uses host width<600, independently of the768 quality threshold.

A wide tablet with no device-memory signal uses the existing1.5/256 branch. These are code rules, not confirmed settings on any device. No adaptive-quality change or user-facing quality label added. Draw calls were not revisited or reduced: there is no real-device evidence justifying it.

## NETWORK / CONSOLE / WEBGL

Physical Wi-Fi load behavior, request counts, duplicates/404/retry storms, console errors, long tasks, GPU state and context recovery: **UNVERIFIED**. No cellular/throttled-network claims. Normal site Wi-Fi is the required first test; optional shaping must be labelled simulated. The static preview serves the unchanged lazy architecture: workshop first, Vehicle on intent, Gallery deferred, local AI. Existing browser baseline one-context/idle/hidden/dialog behavior is covered by regression tests, not a claim about Android drivers.

Mobile screen reader: **UNVERIFIED**. Existing desktop semantic navigation, focus, keyboard and fallback tests remain in the automated baseline. They do not establish TalkBack behavior.

## FAILURES / FIXES MADE / BEFORE AND AFTER

No physical-device problem was observed because no physical device was tested. No runtime, visual, quality-tier, asset, camera or networking source modification was made. No before/after device comparison exists. Changes are limited to QA documentation, a result template, test logs and temporary server invocation. No speculative optimization/refactor, preload, geometry reduction or global quality reduction.

## AUTOMATED REGRESSION

No application code changes were needed. The existing full baseline was rerun: production build; application and node TypeScript; QA preview/audit configurations; lint; complete tests. Exact results are in `tools/release-audit/spatial4/regression.json` and sibling logs. Final result: **408 tests across 55 files PASS**. Build12.84s; application TypeScript14.51s; node TypeScript1.50s; QA configurations1.37s; lint8.43s; tests45.46s. All exit codes0.

## PRODUCTION PROTECTION

A SHA256 manifest taken before this iteration covers application source, all public assets, dependency manifests and Vite configuration. Final comparison: `tools/release-audit/spatial4/protection.json`: 348 files checked; **zero changes** to source, public assets, dependency manifests or Vite configuration.

Homepage changed=NO; Hero=NO; Navbar=NO; navbar car=NO; Hero cars=NO; production Inside TOLI=NO; approved workshop GLB=NO; vehicle assets=NO. No `/` redirect or homepage replacement, deployment or migration. Existing broader Vite development configuration is not edited; temporary CLI preview binding provides the requested LAN access.

## PHYSICAL TEST CHECKLIST — COMPLETE ON EACH AVAILABLE DEVICE

Use PASS / ISSUE / NOT TESTED. Copy this section per device and record technical information only.

| Test | Result | Evidence/notes |
|---|---|---|
| Device model, Android, browser/version, resolution, native DPR | NOT TESTED | |
| Same-Wi-Fi device URL opens | NOT TESTED | |
| Cold-ish first load: useful geometry, no blank/black/freeze/pop | NOT TESTED | Timing unavailable unless reliably measured |
| Normal reload and warm revisit | NOT TESTED | |
| Services / Vehicle / Reception tap targets | NOT TESTED | |
| Locations: all eight reachable, escape/close works | NOT TESTED | |
| Gentle horizontal drag; normal vertical/pinch/browser gestures | NOT TESTED | |
| All destination subjects readable, safe areas and car unobscured | NOT TESTED | |
| Portrait→landscape→portrait without reload | NOT TESTED | |
| First deferred Vehicle appearance and interaction | NOT TESTED | |
| Gallery/lightbox controls and restoration | NOT TESTED | |
| Request four steps, keyboard, scroll, close restoration | NOT TESTED | Do not send a real request for QA |
| AI local guidance and close restoration | NOT TESTED | |
| Repeat Overview→Services→Vehicle→Gallery→Reception→Overview several times | NOT TESTED | |
| Repeat Gallery / Request / AI open-close; theme; rotate; return Vehicle | NOT TESTED | |
| Normal interaction5–10minutes: lag, subjective warmth, degradation | NOT TESTED | Record duration |
| Background/foreground from Overview | NOT TESTED | |
| Background/foreground from Vehicle | NOT TESTED | |
| Safe normal multi-app behavior and return | NOT TESTED | Resident recovery or normal discarded-tab reload |
| Native DPR vs bounded renderer DPR (if debugging available) | NOT TESTED | |
| Network/console/WebGL/long tasks (if debugger available) | NOT TESTED | Mark unavailable rather than guess |
| TalkBack if actually exercised | NOT TESTED | Otherwise UNVERIFIED |

Save real Overview, Services, Vehicle and Reception screenshots under `tools/release-audit/spatial4/physical/`, using a non-identifying device alias and destination. Add a note confirming capture came from the physical device. Desktop smoke evidence belongs outside that directory. For an issue, record reproduction, destination/orientation, expected/actual behavior and available screenshot/log. Make the smallest evidence-led fix, retest the same device, then rerun automated/desktop checks if code changed.

## UNVERIFIED ITEMS / FINAL RECOMMENDATION

All physical startup/timing/shader/texture behavior, touch/system gestures, orientation/safe areas, camera/readability, Vehicle performance, sustained use/thermal/battery behavior, background recovery/memory pressure, actual quality/DPR, device network/console/WebGL and mobile screen-reader behavior remain unverified. Other-device LAN reachability is also unverified. No physical screenshot/debug evidence exists.

**3D EXPERIENCE PHYSICAL VALIDATION = USER TEST REQUIRED.**

Open the device URL on a real Android phone first; prioritize an older/lower-end device when available, then mid-range, stronger phone and tablet. Do not call this PASS until representative physical testing succeeds. Keep traditional production primary. Even after a later physical PASS, production migration planning requires separate explicit approval; no migration occurs in this task.

# FULL SHOP REPLICA PHYSICAL VALIDATION

Date: 21 October 2026. This section supersedes the older Iteration 4 URL/model/test counts above for the full replica gate.

**FULL REPLICA PHYSICAL VALIDATION = USER TEST REQUIRED.**

## REPLICA VERSION / LAN URL

Frozen runtime: `public/models/toli-workshop-replica.glb`, 4,141,272 bytes. SHA256 `29656001b62021c32b9c30e369294fc6225d9660e35f9581e6c5ee857b01db63`.
Frozen editable source: `tools/3d/toli-workshop/source/toli-workshop-replica.blend`, SHA256 `216debde4d4042502e19d9816a5e0ec2ebc8df67de23598e6e6e4f1b2ff00bae`.

Actual active Wi-Fi interface `wlp2s0`: **192.168.1.14/24**, verified from address/default-route inspection this gate. Port **8150**.

**PHONE URL: http://192.168.1.14:8150/Toli-2/#/3d-experience**

Temporary existing Vite production preview is bound specifically to that LAN address. The separate loopback preview is untouched. Server session 88669 uses `/tmp/toli-physical-final/preview.mjs`, a temporary Vite API invocation with server-side response logging only; no customer debug UI or project configuration changes. Stop this temporary session with Ctrl+C after testing. To restart without logging: `npm run preview -- --host 192.168.1.14 --port 8150 --strictPort` from the project. Do not start a duplicate listener. DHCP may change the address later. No tunnel, hosting, DNS, router or firewall changes.

## ASSET IDENTITY / CACHE SAFETY — DESKTOP READINESS ONLY

Actual LAN browser asset inventory identifies a fetch of `http://192.168.1.14:8150/Toli-2/models/toli-workshop-replica.glb`. On the single logged browser reload: **one replica request, HTTP304 revalidation, zero response-body bytes**, cached representation 4,141,272 bytes; zero older `toli-workshop-web-v2.glb` requests. Independent host HTTP GET returned **200**, 4,141,272 bytes and the exact frozen SHA256. These are distinct observations: do not describe the host GET as a phone request. The request logger sees Vite's internally base-stripped `/models/...` path; browser inventory records the full `/Toli-2/models/...` URL.

Both HTML and GLB return existing `Cache-Control: no-cache`; the GLB ETag is `W/"4141272-1792551702389"`. Thus normal preview loads revalidate cached bytes; a304 is expected, not an older-model failure. No global cache disable, file rename or production cache change. A new LAN origin and distinct replica filename also separate this from the previous v2 asset. Phone cache correctness still needs phone observation where debugging is available.

Fresh LAN Overview visually confirms the unequal-slab floor, central lane, red structural frames, roof/trusses, suspended geometric fixtures and booth context. Fresh Reception confirms glass/red/gray office, compact rear desk and stair/mezzanine context. Four-opening exterior and owned TOLI facade signage are outside these interior camera views; their identity is supported by the existing independent exterior render/comparison and visual gate, whose source/GLB hashes exactly match this gate. They were not newly viewed on a phone or claimed visible from Overview. Reference limitations remain unchanged: later-facade/interior continuity, obscured bench, booth internals and exact landing dimensions.

Evidence: `tools/release-audit/replica-physical-gate/` contains host HTTP checks, browser asset inventory, single-reload access log, empty desktop warning/error console and desktop LAN Overview/Reception screenshots. **All screenshots in this folder are desktop readiness evidence, never physical-phone evidence.** Earlier filenames containing “physical” in the replica browser folder refer to clicking modeled objects, not testing a phone.

## PHYSICAL DEVICES / ANDROID VERSION / BROWSER / DPR

Physical devices tested: **NO / 0**. Model, Android version, browser/version, resolution, native DPR and actual renderer DPR: **UNVERIFIED**. Supported inventory exposes desktop in-app browser and MCP Apps only, no physical Android connection/debugger. `adb` is not installed. No pairing or device identifiers collected. Remote debugging: **UNAVAILABLE**. Prioritize lower-end/older Android, then mid-range, stronger phone and tablet. Flagship-only success cannot establish low-end support.

## PHYSICAL RESULTS AND REQUIRED PROCEDURE

Use the same trusted Wi-Fi, leave the computer awake and open the exact PHONE URL above. Another-device LAN reachability is still UNVERIFIED. If unreachable, check current IP/server and guest/client isolation; do not disable the firewall globally.

For each row record PASS / ISSUE / NOT TESTED, device alias and notes. All rows below currently **NOT TESTED**.

| Category | Physical procedure / expected result |
|---|---|
| STARTUP | First visit, normal reload, warm revisit: recognizable replica and usable controls; record black/blank frames, freeze, shader/texture hitch. Cold/reload/warm timings **UNMEASURED** unless real instrumentation provides them. |
| OVERVIEW | Workshop dominant; Services, Vehicle, Reception discoverable; Locations reachable; no major obstruction. Confirm lane/red frames/floor/fixtures/reception and facade/signage where visible. |
| SERVICES | Default Automobile Services; exercise all nine: Automobile Services; Spare Parts & Repairs; Battery Services; Premium Detailing; Vehicle Inspection; Consultation; Installation; Doorstep Pickup; AMC Plans. Select several, leave and return; selection persists. |
| SERVICE REQUEST | Selected service reaches canonical Request preselection. Close restores focus/3D/selection. Test four steps, touch targets, keyboard, scroll and combobox. **Do not send a real request.** |
| VEHICLE | First intentional visit remains deferred. Check first-load hitch, full car, scale, floor contact, lighting, framing and drag. Repeat Overview↔Vehicle several times: no duplicates, increasing hitch, missing car or blank scene. |
| JOURNEY | Default Choose a service; test Prepare your request, Send in WhatsApp, Discuss next steps; contextual Request correct. Do not actually send. |
| WHY TOLI | Readable with environment visible; no fabricated statistics or broad unsupported guarantee. |
| GALLERY | Real workshop photos; open/next/previous/close and supported swipe; no camera movement behind lightbox; focus/state restored. |
| RECEPTION | Use the modeled Reception object; recognizable desk/office; Request opens canonical flow and closes correctly. |
| TOLI AI | Use modeled Help point; panel/touch/keyboard/close/focus restored; local guidance; zero external inference requests where observable. |
| LOCATIONS | Test all eight destinations as reliable fallback navigation. |
| TOUCH | Single taps, short/long drags, vertical/pinch/system gestures, sheets and Gallery/Request/AI: no tap/drag confusion, scroll trapping, behind-modal camera motion or double activation. |
| PORTRAIT | Overview, Services, Vehicle, Journey, Gallery, Reception: no horizontal overflow, readable/reachable controls, essential objects not hidden. |
| LANDSCAPE | Without reload: correct renderer/camera/UI, workshop/car/environmental panels/Locations/Request reachable. |
| ROTATION | Overview: portrait→landscape→portrait→landscape→portrait. Repeat at Vehicle. No blank/stretched/zero-size scene, clipping or lost controls. |
| BACKGROUND / FOREGROUND | Briefly background and return at Overview, then Vehicle; scene/camera/controls/car retained or normal discarded-tab reload; no extra resident-page download/freeze. |
| HISTORY | Browser Back/Forward: correct destination/camera, no unnecessary full GLB reload. |
| SUSTAINED USE | About10 minutes normal Overview/Services/Vehicle/Gallery/Reception/AI/Journey use. Record duration; label perceived warmth/responsiveness/frame degradation **SUBJECTIVE**. No synthetic GPU stress. |
| NETWORK | With real remote debugging if available: replica one request per load/revalidation, Vehicle deferred then one download/reused on reentry, Gallery deferred, AI zero external inference; no404/retry loop/duplicates. Otherwise UNAVAILABLE. |
| WEBGL | Observe genuine errors/context loss and recovery if encountered in normal use. Do not inject GPU failures on phone. Context/recovery/errors currently UNVERIFIED. |
| DPR | If debugging permits, record native DPR and renderer cap; existing source cap1.25 on narrow/low-memory branch, otherwise1.5. Actual phone settings UNVERIFIED. |
| ACCESSIBILITY | Existing semantic/focus/keyboard automated baseline preserved. TalkBack only if actually exercised; **MOBILE SCREEN READER = UNVERIFIED**. |

## PHYSICAL EVIDENCE / ISSUES / FIXES / RETEST

No real-device screenshots or traces exist. Capture from the physical phone: Overview, Services, Vehicle, Reception, landscape Overview and landscape Vehicle. Store separately under `tools/release-audit/replica-physical-gate/physical/` when supplied; do not populate it with desktop images. Record only technical model/OS/browser/DPR, no serial numbers/accounts.

For every actual issue record device/browser, destination/state/orientation, action, symptom and repeatable steps; then identify the smallest cause. No physical defect reproduced, no runtime/model/UI/camera/threshold/quality fix made, no physical retest performed. No speculative optimization. Physical sustained use **0 minutes**; thermal/responsiveness unknown. All physical performance metrics **UNMEASURED**; no desktop metrics substituted.

## AUTOMATED REGRESSION

This gate changes documentation/evidence and temporary server invocation only; no application/configuration/test code changed. Last completed frozen baseline in `tools/release-audit/replica/regression.json`: production build PASS; both TypeScript checks PASS; QA configurations PASS; lint PASS; **414 tests across56 files PASS**, all exit0. These are retained prior-run results, **not a new run in this physical gate**. Any subsequent code fix must rerun all six checks and the complete suite without weakening tests.

## PRODUCTION PROTECTION

Fresh before/after SHA256 audit covers366 source/public/editable-source files: zero changed/missing files. Frozen replica and approved older assets match their recorded hashes. Homepage, Hero, Navbar, navbar vehicle, Hero vehicles, production Inside TOLI, all vehicle assets, isolated cameras/interactions/content, dependency and Vite configuration remain unchanged. No production routing change, redirect, migration, deployment or publishing. Evidence: `tools/release-audit/replica-physical-gate/protection.json` and `before.json`.

## UNVERIFIED ITEMS / NEXT GATE

Every physical checklist item above remains unverified, including device LAN connectivity, identity on phone, startup/hitch, service selection/preselection, deferred Vehicle/reentry, all content/object interactions, keyboard/form scrolling, gesture conflicts, both orientations/repeated rotations, background recovery/history, sustained thermal/responsiveness, actual DPR/network/WebGL and TalkBack. Desktop readiness does not clear them.

**FULL REPLICA PHYSICAL VALIDATION = USER TEST REQUIRED.** Return actual device results before considering PASS/PASS AFTER FIXES or production-migration planning. Traditional production stays primary. Even a later PASS does not authorize migration or deployment.


## UPDATED REPLICA — OFFICIAL BRANDING REVISION

21 October 2026: branding pass updated the experimental runtime to4,268,456 bytes, SHA256 `b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`. Previous4,141,272-byte hash/evidence above is historical. Use the same LAN route while its preview is running; browser preview revalidates model caching. Official logo branding is locally validated; physical Android testing has not occurred and must use this updated revision. **FULL REPLICA PHYSICAL VALIDATION = USER TEST REQUIRED.** See the OFFICIAL TOLI MOTORS BRANDING section of `docs/TOLI-WORKSHOP-FULL-REPLICA.md`.

# FINAL BRANDED REPLICA PHYSICAL VALIDATION

21 October 2026. **FINAL BRANDED REPLICA PHYSICAL VALIDATION = USER TEST REQUIRED.** This section supersedes earlier unbranded version/URL results for the final gate. Traditional production remains primary; migration planning is not cleared.

## Release candidate / logo version

Runtime `public/models/toli-workshop-replica.glb`: **4,268,456 bytes**, SHA256 `b9ce5d5fd237c90ff8659c362f8f5111c3cfde691e008cb1b93d62af2bdd6225`. Editable source `tools/3d/toli-workshop/source/toli-workshop-replica.blend` remains frozen; exact hash in this gate's `before.json`. Baseline46,411 triangles,85,785 vertices,29 meshes,21 materials,9 textures. Branding-pass observed draw calls19 initially/90 at Vehicle are historical desktop observations, not new phone measurements.

Official `src/assets/big-transparent.png`,1483×352 transparent RGBA, SHA256 `4809ffd3bde9be888071d5b4c3e90a0f58e627cc2a07f20c49e625a38b1cf590`. Freshly decoded logo from the actual LAN-served GLB is pixel-identical, including transparency. No recoloring/crop/distortion/filter/replacement/recreation. Facade, Reception and Services branding remains frozen.

## Current LAN access

Fresh active-interface/default-route detection: Wi-Fi `wlp2s0`, **192.168.1.14/24**. Existing preview listener verified bound specifically to **192.168.1.14:8150**, separate from loopback listener; reused without changing configuration.

**ANDROID URL: http://192.168.1.14:8150/Toli-2/#/3d-experience**

Use the same trusted Wi-Fi, keep computer awake and preview running. Other-device connectivity remains UNVERIFIED. If unreachable, check current IP/server and guest isolation; do not disable global firewall or use public tunnels/router forwarding. No public hosting/DNS/firewall/router change. Temporary LAN preview session88669 remains running; stop with Ctrl+C when done. Restart with the existing `npm run preview -- --host 192.168.1.14 --port 8150 --strictPort` only after confirming no listener; DHCP can change IP.

## Runtime / cache verification — desktop readiness only

Actual browser reload fetched `/Toli-2/models/toli-workshop-replica.glb`: **one HTTP304 revalidation**, zero response-body bytes, cached representation4,268,456 bytes. Separate host HTTP GET returned200 and the exact bytes/hash above. Server log records base-stripped `/models/...`; browser resource inventory records full LAN URL. No older `toli-workshop-web-v2.glb` request in this reload/sanity interval. Vehicle was first requested only after Vehicle navigation (one304 revalidation). The host GET is separately identified in the log and is not counted as a browser download. No404s observed in this scoped desktop interval.

Existing preview GLB `Cache-Control: no-cache`, ETag `W/"4268456-1792566982199"`: normal revalidation confirms current representation. No global production caching disable, asset rename or permanent diagnostic UI. This does not substitute for observing the phone's requests.

Short desktop sanity completed Overview→Services→Vehicle→Reception: geometry visible, nine Services/default Automobile Services present, Vehicle finished loading, Services/Reception official logos visible and navigation responds. Desktop warning/error console empty. Outer facade is not visible from these approved interior camera compositions; unchanged dedicated branding-pass exterior render/comparison remains the facade visual evidence, tied to this same frozen runtime by checksum. No claim that facade was freshly visible in Overview or tested on Android.

## Physical device / Android / browser / DPR

**Physical device available: NO. Devices tested:0.** Tool inventory exposes desktop in-app browser/MCP Apps only, no genuine Android device/debugger; `adb` not installed. Model, Android version, browser/version, native DPR and effective renderer DPR: **UNVERIFIED**. Remote debugging **UNAVAILABLE**. No physical screen-reader test; **MOBILE SCREEN READER = UNVERIFIED**. Existing semantic/focus/navigation automated baseline is preserved, not proof of TalkBack usability.

## Real-phone test procedure / current results

Every physical row below is currently **NOT TESTED**. Use PASS / ISSUE / NOT TESTED with a non-identifying device alias, Android/browser versions and reproducible notes. Prefer older/lower-end Android before stronger devices.

| Area | Required physical check |
|---|---|
| Startup | First visit, reload and warm revisit: recognizable workshop, controls, no blank/black canvas/crash/freeze; record shader/texture hitch. All timings **UNMEASURED**; do not estimate milliseconds. |
| Branding | Inspect Services and Reception logos; facade where accessible. Correct artwork/aspect/orientation, no clipping, z-fighting, excessive brightness/darkness or normal-distance blur. Approved interior poses do not expose exterior; do not mark facade seen unless actually viewed. |
| Overview | Workshop dominant; Services/Vehicle/Reception discoverable; Locations accessible. |
| Services | All nine: Automobile Services; Spare Parts & Repairs; Battery Services; Premium Detailing; Vehicle Inspection; Consultation; Installation; Doorstep Pickup; AMC Plans. Default01 Automobile Services. |
| Service persistence | Select another service→leave→Vehicle→return Services; retain approved state. |
| Request preselection | Select04 Premium Detailing→Request this service→SERVICE step correctly preselected. Close restores scene/focus/selection. **Do not submit.** |
| Vehicle | First appearance deferred; note hitch/completeness, scale/contact/lighting/framing/touch. Repeat Vehicle→Overview→Vehicle→Services→Vehicle→Reception→Vehicle; no duplicates/disappearance/increasing hitch/blank/stale drag. |
| Journey | Choose a service; Prepare your request; Send in WhatsApp; Discuss next steps. Contextual Request works; do not send. |
| Why TOLI | Readable with workshop context; no unsupported statistics/broad guarantees. |
| Gallery | Real photos, several opens, next/previous/close; reliable touch, no behind-lightbox camera movement or corruption. |
| Reception / Request | Modeled Reception recognizable and branding visible. YOUR DETAILS/VEHICLE/SERVICE/REVIEW, scrolling/combobox/phone keyboard/close/focus restored; no submission. |
| TOLI AI | Modeled Help point, several normal website questions; panel/keyboard/close usable. Local guidance only; zero external inference where observable. |
| Locations | All eight destinations reachable without hunting for objects. |
| Touch | Tap, short/long drag, vertical swipe, sheets, Gallery, Request, AI: no gesture conflicts, scroll trapping, camera behind modal, doubles/missed taps or accidental navigation. |
| Orientation | Overview portrait→landscape→portrait, then repeat at Vehicle. No black/zero-size/stretched canvas, lost car, clipped controls, sheet/aspect/camera corruption. |
| Background recovery | Overview background approximately10 seconds→return; repeat at Vehicle. Scene/camera/controls/car correct, no duplicate resident-page load. |
| Sustained use | About10 minutes normal destination cycles. Record duration, responsiveness/touch latency/browser stability/corruption. Label perceived heating **SUBJECTIVE** unless measured. Current duration0 minutes; observations unavailable. |
| DPR | Record native/effective renderer DPR if genuine debugging available. Existing source cap remains1.25 narrow/low-memory branch, otherwise1.5; actual phone use unverified. |
| Network | With real debugging: replica one request/revalidation, Vehicle deferred and one load, Gallery deferred, AI zero external inference; no404/duplicate/retry storm. Otherwise UNAVAILABLE. |
| WebGL | Inspect genuine shader/texture/WebGL/context errors if tools permit; normal recovery only, no deliberate GPU abuse. Errors/recovery **UNVERIFIED**. |
| Accessibility | Test TalkBack only on actual phone; otherwise UNVERIFIED. Desktop semantics remain baseline only. |

## Warm performance / physical evidence

**BRANDED REPLICA WARM USEFUL FRAME = UNMEASURED.** No genuine-device instrumentation is available, so no cold/reload/warm timings or comparable updated median is claimed. Desktop diagnostic firstFrameMs from branding pass is not substituted. No physical performance metrics exist.

No physical screenshots captured. When available save real phone Overview/Services/Vehicle/Reception portrait and Overview/Vehicle landscape to `tools/release-audit/spatial-final/physical/`, noting device alias and confirming real-device origin. Do not put desktop captures there. This gate's desktop-only screenshots and fresh asset/network/console evidence live in `tools/release-audit/spatial-final/branded-gate/desktop/` and sibling JSON files. Branding facade evidence remains `tools/release-audit/replica-branding/facade.png` and `facade-comparison.jpg`; these are desktop/model renders, not phone captures.

## Issues / fixes / retest

No physical defect reproduced because no Android device was tested. No application/model/logo/material/camera/touch/quality/lifecycle changes. No physical retest. If an issue is reported, first record device/Android/browser/DPR/destination/action/symptom/reproduction rate, reproduce on that device, then make the smallest evidence-led correction and retest same device. Preserve replica identity and official artwork.

## Regression / production protection

No application code changed; no fresh regression was necessary or performed. Retained completed branding baseline: production build PASS, both TypeScript checks PASS, QA configurations PASS, lint PASS, **414 tests across56 files PASS**. Exact prior logs: `tools/release-audit/replica-branding/regression/`. Any subsequent application fix requires the complete new regression suite.

Fresh before/after audit checks361 source/public/editable-source/dependency/configuration files: **zero changes**. Homepage/route, Hero, Navbar, Navbar logo, navbar vehicle, Hero vehicles, production Inside TOLI, approved older workshop and all vehicle assets unchanged. Branded `.blend`, runtime GLB and authoritative logo unchanged. No deploy/publish/DNS/redirect/migration. `before.json` and `protection.json` hold exact hashes/results.

## Remaining limitations / decision

Phone reachability and every physical row remain unverified: branding on device, startup/hitches, all destination interactions/state/preselection, Vehicle/reentry, form/keyboard, touch, orientation, background recovery, sustained use, thermal/responsiveness, actual DPR/network/WebGL and mobile screen reader. Facade is not exposed by the approved interior website cameras; dedicated model view is separate evidence. No fabricated device results or physical PASS.

**FINAL BRANDED REPLICA PHYSICAL VALIDATION = USER TEST REQUIRED.** Traditional production remains primary. Do not begin migration or deployment; migration architecture/fallback planning remains a separately approved task after a genuine physical PASS.


24 October2026 physical-gate freeze audit: **1,546 existing protected files checked;1,546 unchanged;0 changed/missing**, including all171 actual release-dist files (current/retained inventory plus metadata). Evidence: `tools/release-audit/interactive-vehicle-android/protection.json`. No application/package modifications.


## Red vehicle successor — 2026-10-24

Candidate `toli-fe6c9d00893267c51ecb78e5` supersedes silver `toli-03ea962c2a2df6ceb9b08c5e`. Horizontal touch mapping changed: physical Android validation must be repeated against this exact candidate. Historical LAN URLs and earlier device evidence do not certify it. Desktop responsive checks are EMULATED. See TOLI-3D-RED-VEHICLE-ORBIT.md. Production migration remains NOT AUTHORIZED.


## Centered simulation successor — 25 October 2026

Candidate `toli-192890d4a5ba433505da05b1` retains `toli-fe6c9d00893267c51ecb78e5`. Physical Android validation remains REQUIRED against this exact candidate: centered framing, touch/pinch, controls, resets, Standard View reentry and performance. Desktop phone checks are EMULATED. See TOLI-3D-CENTERED-VEHICLE-SIMULATION.md. Production migration remains NOT AUTHORIZED.


## Walk Around candidate — 2026-10-25

Current: `toli-3d0be34850a66263ebdf174b`; retained previous: `toli-192890d4a5ba433505da05b1`. Physical Android validation is REQUIRED for this new movement/touch behavior, including real background/foreground, orientation, gesture conflicts and GPU performance. Emulated checks do not satisfy the gate. Production migration is NOT AUTHORIZED. See [Walk Around report](TOLI-3D-WALK-AROUND.md) and `tools/release-audit/vehicle-walk/`.


## Red-center / grey-side candidate — 2026-10-26

Candidate `toli-ac5606593db19031c64d2032`; previous `toli-3d0be34850a66263ebdf174b` retained. Physical Android validation remains REQUIRED, including full all-open walk around the newly placed grey vehicle, 360°, orientation and real touch/GPU behavior. Production migration is NOT AUTHORIZED. See [two-car composition report](TOLI-3D-TWO-CAR-COMPOSITION.md).


## Swapped-car candidate — 2026-10-26

Candidate `toli-e3ffeea3da3a0c90eb769413` physically exchanges red/grey positions and recenters inspection on red at the user’s explicit selection. Previous `toli-ac5606593db19031c64d2032` retained. Physical Android validation remains REQUIRED for new bay navigation, all-open clearance, orientation and real touch/GPU behavior. Production migration remains NOT AUTHORIZED. See [car-swap report](TOLI-3D-CAR-SWAP.md).


### Centered human walk candidate — 26 October 2026

Current candidate `toli-d1a6a58438300e8f8a8438cb`; retained previous `toli-e3ffeea3da3a0c90eb769413`. See [centering and walking report](TOLI-3D-CENTERED-HUMAN-WALK.md). 585 automated tests pass; desktop/mobile emulation completed. Physical Android cold start, touch walking, full loop, app background/foreground and thermal/performance checks remain required on this exact candidate. Production migration is not authorized.
