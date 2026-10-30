# Stage 4 — physical Android gate, 26 October 2026

PHYSICAL ANDROID VALIDATION = USER TEST REQUIRED

## Release identity and LAN handoff

Current frozen candidate: `toli-d1a6a58438300e8f8a8438cb`.
Rollback: `toli-e3ffeea3da3a0c90eb769413`.
Both canonical package validators passed again during Stage 4. No rebuild or runtime change was made.

Open on an Android phone on the same Wi-Fi network:

http://192.168.1.14:8187/Toli-2/?workshopLocation=vehicle#/3d-production-preview

The LAN listener serves only the frozen `release-artifacts/toli-d1a6a58438300e8f8a8438cb` package, not a development server or a mutable release-dist. It checks each served file against its startup hash and sends the release ID in an HTTP header. No source directories or directory listings are served. Keep this computer awake and connected to the same network. Host access to the LAN URL succeeded; phone-to-host reachability still requires the phone test.

Package contents: 165 files total, including 130 current application files, the retained previous-release dependencies and release metadata. The exact contents, sizes and hashes are recorded in `tools/release-audit/centered-android/release-candidate.json` and the protected snapshot. The traditional entry policy is unchanged.

Workshop SHA-256:
`0f7497aed3a2e5950b3c7f35cfd1a7fc02052479604dfd754baa93a8677bc1e3`
5,179,488 bytes; includes the existing grey car and detailing equipment.

Primary vehicle SHA-256:
`e451f1bf00138918a99e8a18b701c1fa89a1a4ca229d41562f9820b7b44dfe99`
4,276,644 bytes.

The index, manifest and both GLBs returned HTTP 200 via the LAN interface and matched the frozen package bytes exactly. This is a host HTTP check, not physical Android evidence.

## Physical device

No authorized Android connection is available. No adb executable was found on PATH or in the checked Android SDK locations; no adb debugging server was listening on port 5037; the host USB inventory showed no Android phone. No device connector was available. No pairing, installation or debugging authorization was attempted.

Device model: unavailable. Android version: unavailable. Browser: unavailable. DPR: unavailable. Devices tested: zero. TalkBack: UNVERIFIED.

## Walking, interactions and mobile status

All physical-device checks below remain UNVERIFIED:

- Entry/exit and reset; forward/backward/strafe; touch look direction; acceleration, braking and collision sliding; full front → left → rear → right → front loop.
- Red/grey car, trolley, columns and open panels collision behavior.
- Headlights, left door, right door, bonnet and boot toggled ten full on/off or open/close cycles each; all openings active; 360° inspection; drag/tap separation.
- Portrait, landscape, repeated orientation changes, safe-area layout, control accessibility, no horizontal overflow or gesture conflict, page scrolling and background/foreground recovery.
- Physical reduced-motion behavior, TalkBack and Standard View return.

Prior desktop/mobile-emulation checks passed as documented in TOLI-3D-CENTERED-HUMAN-WALK.md. Those results are not promoted to physical-device PASS.

## Performance

No physical startup measurement, FPS, device temperature, latency, GPU count or ten-minute stability result exists. Sustained use, context loss, repeated downloads, progressive slowdown and stuck movement after switching apps remain UNVERIFIED on Android.

The previous desktop 1280×720 observations were 97 draw calls, 98 initially allocated geometries, 11 textures and one WebGL context. They are desktop baseline observations only. No new performance claims are made in Stage 4.

## Regression and protection

No application source or asset changed; no speculative physical-device fix was made. The established baseline remains: build PASS, application/Node/QA TypeScript PASS, lint PASS, 585 tests across 71 files PASS. These full checks were not rerun because Stage 4 changed only audit/documentation and started a static LAN server. Current and rollback package validation were rerun and passed. All captured source/public/package hashes remained unchanged through the Stage 4 documentation pass; see protection.json.

Approved grounded positions remain red `[-0.8484, 0, -14.9897]`, grey `[5, 0, -18]`. Homepage, Hero, Navbar, logo, workshop/car geometry, detailing, Service Request, Gallery, TOLI AI, Standard View and rollback remain untouched.

## Manual test record — fill only after testing

Device model / Android / browser version / DPR if measured:

Start time / finish time (at least 10 minutes):

1. Open the URL above on the same Wi-Fi. Confirm the red car is centered, grey is at the side, and both are grounded.
2. Enter Walk Around. Hold each movement direction, then release. Drag in all four look directions. Check stopping and absence of unintended panel activation.
3. Complete front → left → rear → right → front. Try approaching each car, doors, trolley and columns without crossing solids. Stay within the permitted walking area; boundary limits are intentional.
4. Toggle headlights, left door, right door, bonnet and boot ten full cycles each. Open everything together and complete a 360° inspection. Repeat the loop with panels open.
5. Repeat Walk Around entry/exit and mode changes. Check Reset View, Locations, semantic controls and Standard View return.
6. Test portrait and landscape repeatedly, safe areas and overflow. Background the browser while moving, then return; movement must stop and controls must recover.
7. Continue walking, orbiting and opening panels for at least 10 minutes. Record observed heat, latency, slowdown, reloads or context loss. Record numerical measurements only when actual instrumentation supplies them.
8. Test TalkBack/reduced motion if available; otherwise mark UNVERIFIED. Report any failure with action sequence, orientation, screenshot/video and approximate elapsed time.

Results / failures / evidence paths:

## Final statuses

CENTERED SHOWROOM = PASS (unchanged verified desktop/emulation baseline)

HUMAN WALK AROUND = PASS (unchanged verified desktop/emulation baseline)

VEHICLE INTERACTIONS = PASS (unchanged verified desktop/emulation baseline)

PHYSICAL ANDROID VALIDATION = USER TEST REQUIRED

PRODUCTION MIGRATION = NOT AUTHORIZED

A physical PASS only unlocks the final migration audit; it does not authorize deployment.
