# Approved car restoration and Phase 2 status

Starting baseline: 214 passing tests across 33 files, production build, TypeScript and lint passing. The worktree contained extensive earlier modifications; no reset or broad checkout was used.

## Recovery evidence

The removed assets were untracked by Git, so Git history could not restore them. The original navbar source, stylesheet, four WebPs and comparison placeholder were recovered directly from /home/thunder/shared/tolimotors-main5.zip. The restored navbar asset sizes match the pre-removal inventory: 24,008 / 67,184 / 10,160 / 8,040 bytes. No different artwork was sourced or generated.

The original hero PNG remains at /home/thunder/.codex/generated_images/01a12fbd-4f09-78a1-8df7-aacb87695025/exec-516aabe4-59ae-4504-a8d1-c4fa2071c580.png. The recorded original conversion was recovered from this chat's tool history: sharp trim threshold 12, resize width 960/1440, WebP quality 88 and alphaQuality 100. Reapplying that exact recipe restored 90,322-byte 960×412 and 175,648-byte 1440×618 images. Built content hashes CNdIqmap and B1mrHanK match the previous approved build.

## Restored active visuals

- Hero.tsx: one original responsive sports-car picture and approved positioning, framing, finite entrance and restrained floor glow. The wrapper has no scene dock or WebGL canvas. High fetch priority is restored; no new explicit preload was added.
- ExperienceNavigation.tsx / NavbarPerformanceCar.tsx: original red car, separate rim layers, speed trails, highlight mask, CSS movement, hidden-document pause, reduced-motion behavior and responsive reduction/hiding. Phase 1 identity remains 11px without a background panel; BOOK, focus and keyboard menu behavior remain.
- Services.tsx: approved general vehicle overview, wheel/brake and battery scene, fallback and zone choices restored. Service selection, explanations and primary request action precede the visual in DOM/mobile order. Generic overview is explicitly orientation, not a depiction or diagnosis of the selected service.
- JourneyDock.tsx: original vehicle SVG fallback restored for process/completion. Existing ready/live CSS hides fallback while the one shared WebGL scene is visible. Phase 2 truthful journey copy remains independent of the visual.
- BeforeAfter.tsx: original placeholder-car SVG and comparison implementation recovered. Cards remain visible without entrance animation, clearly labelled placeholders. Neutral comparison titles avoid implying the unsupported named repairs are verified work examples. No real before/after photographs are claimed.

## Preserved work

All nine service names/IDs, explanations, When to ask / What to share guidance, request context, CTA hierarchy and availability qualifications remain. The request journey still describes choosing a service, preparing a request, sending the WhatsApp draft and discussing next steps. No date picker, automatic booking, certification, pickup guarantee or diagnostic data was added.

Phase 1 visibility, skip link/main landmark, readable typography, mobile BOOK, focus targets, optional step states, full private phone review, consent, combobox reopening, gallery focus behavior and shared-renderer lifecycle are preserved. Workshop/gallery photographs and branding assets were not changed.

Retired createCodedVehicle, unmounted VehicleStudio, older hero artwork and duplicate rendering approaches remain unused. Major model/material/camera upgrades remain deferred to Phase 3.

## QA boundary

Browser URL security restrictions previously blocked the local preview. No bypass or alternate browser route was attempted. Rendered appearance and production-console checks remain UNVERIFIED for 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 412, 390, 360 and 320. Automated DOM, lifecycle and responsive/reduced-motion rule checks are not claimed as visual passes.

## Final validation

Production build PASS; TypeScript project checks PASS; lint PASS; full test suite 217 passing tests / 33 files (starting baseline 214 / 33). Restoration coverage replaces car-removal expectations and adds original navbar visibility-listener cleanup/pausing and hero no-WebGL checks with and without a configured model. Existing bundle-size, Browserslist and React Router test warnings remain. No rendered viewport or production-console pass is claimed.
