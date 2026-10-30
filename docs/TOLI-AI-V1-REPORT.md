# TOLI AI V1 REPORT

## Cost
AI API cost: ₹0. Cloud AI: NONE. API keys: NONE. External AI requests: NONE.
No model, dependency, account, database or telemetry was added.

## Architecture
UI: existing AIChatWidget repurposed as the lightweight floating launcher; lazy
ToliAIPanel uses the existing Radix dialog dependency for focus trapping, Escape
and modal semantics. Mounted outside the section stack in Index.
Intent engine: src/ai/intents.ts normalizes punctuation/case, applies four common
typo aliases and ordered word/phrase rules. src/ai/assistant.ts exposes the pure
answer(message, context) interface independently of React.
Knowledge source: current src/lib/service-catalog.ts descriptions; contact and
location transcribed from the existing Contact.tsx. No hours/prices invented.
Conversation state: component memory, capped at about 100 messages, 500 characters
per user message; small last-service context. Reopening preserves the conversation
within the mounted page; refresh/navigation away clears it.

## Supported Intents
GREETING, SERVICES_OVERVIEW, AUTOMOBILE_SERVICE, REPAIR, SPARE_PARTS, BATTERY,
DETAILING, VEHICLE_INSPECTION, CONSULTATION, INSTALLATION, DOORSTEP_PICKUP, AMC,
BOOK_SERVICE, CONTACT, LOCATION, HELP, UNKNOWN.

## Service Integration
Uses existing ServiceRequestDialogContext.open with the verified catalogue title
and launcher as return-focus target. The assistant closes before the canonical
Service Request popup opens. Browser verification confirmed Battery Services is
selected in step 03, while nonlinear steps remain available. No second booking
form or submission path. A request never claims a confirmed booking.

## Unknown Query Handling
Unsupported questions and unavailable business facts get a truthful fallback
explaining the service-only scope and suggesting supported topics/contact.
No internet lookup, generated answer or general knowledge fallback.

## Safety
Starting problems explicitly have several possible causes. Replies reuse service
information, provide no mechanical repair instructions and state that the
assistant cannot diagnose. Brake/steering/smoke/overheating queries include general
professional-inspection guidance. No invented confidence or diagnostic status.

## Privacy
Conversation text exists only in page memory. No localStorage/sessionStorage,
external persistence, telemetry, AI credentials or message network requests.
Choosing Request Service opens the existing form; assistant conversation text is
not copied into it. Existing form submission remains a separate user action.

## Performance
Initial bundle impact: lightweight launcher and scoped CSS only; no new runtime
dependency. Panel and intent engine are lazy loaded on first open. Production
panel chunk: 7.37 kB / 3.46 kB gzip. Build main bundle: 536.26 kB / 162.80 kB gzip;
chunk reorganization means this is not an isolated feature-size measurement.
Network requests: first open loads a same-origin JS chunk; subsequent messages
are synchronous local computation without requests. Offline use assumes that
chunk and the site's other required assets are already available locally.
No timers pretending to think and no additional WebGL scene.

## Files Changed
- src/ai/types.ts
- src/ai/knowledge.ts
- src/ai/intents.ts
- src/ai/assistant.ts
- src/components/AIChatWidget.tsx
- src/components/ToliAI/ToliAIPanel.tsx
- src/components/ToliAI/toli-ai.css
- src/pages/Index.tsx
- src/test/toli-ai.test.tsx
- docs/TOLI-AI-V1-REPORT.md

Hero, Hero slots, Navbar/car/logo and section-stack source were not edited.

## Tests
Build: PASS (existing bundle-size, Tailwind ambiguity and Browserslist notices).
TypeScript: PASS. Lint: PASS.
Tests: 299 tests across 41 files pass; 29 focused assistant cases cover all intents,
typos, unknown facts, cautious starting guidance, short context, zero fetches,
request handoff, lazy panel and focus return. Existing tests preserved.

## Visual QA
PASS for inspected desktop/mobile views and interactions; physical mobile
keyboard verification remains UNVERIFIED.
Inspected production at 1440×900, 390×844 and compact 320×460. Verified graphite/red
panel in dark and light site themes, readable text, quick actions, scrollable
history, input, unknown reply, request action and preselection, close/Escape and
focus return. No observed production console errors or horizontal overflow.
VisualViewport resize/offset handling keeps the panel within the visible area;
quick actions collapse in very short viewports to leave room for history/input.
Real hardware keyboard behavior still requires device QA.
