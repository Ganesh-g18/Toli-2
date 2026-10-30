# Inside TOLI — physical phone QA

Status: **UNVERIFIED** (2026-10-20). Browser checks are separate from physical phone approval. No accessible Android phone or existing ADB executable was found. Do not use a cloud device farm or upload workshop files.

## Local setup

Use the existing local production preview and its configured `/Toli-2/` base. If an already installed ADB and an authorized USB-connected Android phone are available, forward the existing preview port with `adb reverse tcp:8132 tcp:8132`, then open `http://127.0.0.1:8132/Toli-2/` in phone Chrome. Confirm that the preview is running first. Alternatively use an already approved private LAN connection; do not expose the server publicly. Remove USB forwarding afterward. If remote inspection is already available, use the phone Network panel to confirm GLB requests; otherwise mark network assertions unverified.

Record: date, phone model, OS, browser/version, page build/revision, viewport/orientation, reduced-motion setting, connection, PASS/FAIL/UNVERIFIED and brief observations. Do not record device serials.

## Brief normal-use pass

- [ ] **Initial page:** Hero appears normally; initial scroll is smooth. Network inspection shows no `toli-workshop-web-v2.glb` download while staying at Hero.
- [ ] **Approach:** scroll toward Inside TOLI; intentional loading state, correct model, no large freeze. One workshop fetch near the section; reentry should not transfer another 4.08 MB.
- [ ] **Interaction:** horizontal drag, rotate/zoom buttons and all three presets work. Begin a vertical swipe on the canvas: page still scrolls, without a trap. Diagonal/multi-finger gestures release cleanly. Current policy allows browser-native page pinch (`pan-y pinch-zoom`); pinch is not model zoom. Verify actual browser behavior rather than assuming it.
- [ ] **Performance:** no sustained stutter during brief normal use; idle does not keep visibly animating. Record heat only as a qualitative observation (comfortable/uncomfortably warm); no invented temperatures or scientific thermal claim.
- [ ] **Scroll:** pass Facility into Gallery and return; rapidly reverse both directions. No black/stale frame, misplaced canvas, stuck loading or Gallery interception.
- [ ] **UI:** AI launcher/panel, Service Request and Gallery/lightbox remain usable. Request modal is above the scene; focus/back/Escape where available and close return work. Do not send a real enquiry during QA.
- [ ] **Lifecycle:** background/return with Facility onscreen, then repeat offscreen. Rendering recovers without duplication. Rotate portrait/landscape; controls remain reachable, framing valid and page scrollable.
- [ ] **Themes:** dark and light remain readable; change repeatedly with no model reset or download.
- [ ] **Accessibility:** enable the phone’s reduced-motion setting where supported; actual 3D remains, automatic movement stops and buttons/presets still work.

Record any failure with its step, orientation and a local screenshot. Physical validation passes only after an actual phone completes this checklist; desktop viewport emulation cannot supply that result.
