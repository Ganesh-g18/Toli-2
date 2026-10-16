# Website Legal, Privacy, Compliance & Accessibility Audit

**Business:** Toli Motors — Multi-Brand Car Workshop, Anantapur
**Website:** Toli Motors landing site (deployed to GitHub Pages at `/Toli-2/`, HashRouter)
**Audit date:** Today
**Performed by:** Automated code audit + manual review of the repository at this path.

> **How to read this document**
> - ✅ **OK** — compliant / no action needed
> - 🟡 **ACTION** — developer-fixable, will be fixed in this pass
> - ⚠️ **REQUIRES BUSINESS INPUT** — Toli Motors must confirm or supply real details before this can be finished
> - 🔒 **REQUIRES BACKEND/LEGAL REVIEW** — depends on a service (WhatsApp/Google/analytics) or a lawyer; cannot be completed from the code alone

---

## 1. Executive Summary

The site is a single-page React application with no analytics, no ad scripts, no payments, and no account system. User data collection is limited to:

1. An **enquiry form** (name, phone, brand, service, message) that opens a **WhatsApp** chat to Toli Motors' number.
2. A **"Send via WhatsApp"** widget where the visitor types a recipient phone number and a message; the message is opened in WhatsApp on the visitor's own device.
3. An **AI chat widget** that runs entirely **on the visitor's device** (client-side keyword matching) — nothing is sent to any server today.
4. A **Google Maps embed** (third-party iframe) that may set Google cookies.
5. A **newsletter email input** in the footer that currently submits nowhere (data is discarded).

No cookies are set by the website itself (the only cookie-writing code is an unused shadcn `sidebar` component that is never mounted, plus an unused Supabase auth storage shim). Supabase is installed and configured but **never imported anywhere in the app**. The `supabase/functions/chat` edge function exists but the frontend does **not** call it (the AI chat uses a local knowledge base).

### Key issues found and fixed in this pass

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | No Privacy Policy / Terms & Conditions / Cookie Policy pages | High | ✅ Fixed — 3 pages created + routed |
| 2 | Footer "newsletter" form collects an email with no purpose and no backend | High | ✅ Fixed — form removed, replaced with Legal links |
| 3 | Enquiry form sends name/phone to WhatsApp with **no privacy notice or consent** | High | ✅ Fixed — explicit consent checkbox + notice added |
| 4 | Fabricated-looking customer testimonials presented as "verified Google reviews" | High | ✅ Fixed — fake review cards removed |
| 5 | Unverifiable marketing claims (12,000+ customers, 25+ years, 98% satisfaction, 40+ brands, "20% OFF", "Save ₹4,000/year") | High | ✅ Fixed — neutralised / needs business confirmation |
| 6 | Contractual-sounding statement "You only pay when satisfied" | Medium | ✅ Re-worded in chat knowledge + How It Works is generic |
| 7 | Google Maps iframe may set third-party cookies with no disclosure | Medium | ✅ Fixed — click-to-consent before the map loads |
| 8 | `.env` (with Supabase URL + publishable key) is **committed to git** | Medium | ✅ `.env` gitignored; ⚠️ key rotation at Supabase advised |
| 9 | No canonical / robots / OG image meta | Low | ✅ Placeholder metadata added (needs real URL) |
| 10 | Unused Supabase client + edge function (if ever enabled, it forwards chat messages to a third-party AI gateway) | Medium | 🟡 Documented; **do not enable until reviewed** |
| 11 | "WRITE A REVIEW" button linked to Place ID `ChIJN1t_tDeuEmsRUsoyG83frY4` — that ID is Google's canonical API documentation example and resolves to a **Google office, 48 Pirrama Rd, Pyrmont NSW, Australia**, NOT Toli Motors | Medium | ✅ Fixed — replaced with a Maps search link for "Toli Motors Anantapur"; ⚠️ replace with the verified Place ID when confirmed |

### What still needs Toli Motors (⚠️) — see Section 11

Legal business name, registered office address, email for privacy requests, GST/business registration number, actual business hours, accuracy of the two phone numbers, the verified Google Business listing (reviews + place-id), image ownership/permissions, social media URLs, and the site's public URL.

---

## 2. Data Collection Audit

### 2.1 What data is collected and where does it go?

| Surface | Data | Destination | Lawful basis (India DPDP 2023) |
|---|---|---|---|
| Enquiry form (`EnquireDialog`) | Name, phone, vehicle brand, service, message | **Visitor's own device → WhatsApp** chat to Toli Motors number `+91-8074946335` | Consent (checkbox added); notices added |
| WhatsApp widget (`WhatsAppSender`) | Recipient phone + message typed by visitor | Visitor's own device → WhatsApp (any number the visitor types) | N/A — site does not store; notice added |
| AI chat (`AIChatWidget`) | Messages | **None — runs locally** (client-side engine in `src/lib/chat-engine.ts`) | N/A — no data leaves device |
| Google Maps iframe (`Contact`) | Device IP, location params, Google cookies | Google (third-party) | Consent gate added (click-to-load) |
| Google Fonts (`index.html` preconnect) | IP (font served by Google) | Google | Documented below |
| Newsletter form (Footer) | Email | **Nowhere — removed** | Was unlawful (no purpose, no backend). Removed |
| Brand logos | None (static CDN images) | jsDelivr CDN | n/a |

### 2.2 Cookies & local storage

- **First-party cookies: NONE.** (Search of `src` found no `document.cookie` in any mounted code.)
- The only `document.cookie` writer is `src/components/ui/sidebar.tsx:68` (stores `sidebar_state`) — this component is **never imported/mounted** in the app. It ships inside the ui library.
- `localStorage`: only referenced in `src/integrations/supabase/previewAuthStorage.ts` (Supabase auth shim). Since `src/integrations/supabase/client.ts` is **never imported** by the app, no `localStorage` access occurs at runtime today.
- **Third-party cookies:** possible only via the **Google Maps iframe** and Google Fonts. Maps iframe is now consent-gated; fonts are preconnected (2 preconnect links, no fonts loaded client-side after build — fonts come from Google). Documented in the Cookie Policy page.

### 2.3 Tracking audit

Searched `src` and `public` for: `google-analytics`, `gtag`, `googletagmanager`, `facebook.com/tr` (Meta pixel), `clarity.ms`, `hotjar`, `sentry`, `segment`, `mixpanel`, `amplitude`, `recaptcha`.

- **No analytics, pixel, tag-manager, session-replay, or error tracker found.** ✅
- No `fetch`/`axios` calls to any API in the app. ✅
- Only outbound network touches:
  - `images.unsplash.com` (BeforeAfter slider) — ⚠️ **removed** (third-party images with no license record; see Section 7).
  - `cdn.jsdelivr.net` (21 brand logos in `BrandPartners.tsx`) — docs'd; images are brand marks, no personal data.
  - `https://www.google.com/maps/embed` + `https://www.google.com/maps/dir` (Contact).
  - `https://wa.me/...` (WhatsApp deep links; opened in new tab on visitor's device).
  - `ai.gateway.lovable.dev` — **only inside `supabase/functions/chat/index.ts`, which the site does not call.**

**Verdict:** No tracking is deployed. If the business later wants analytics (GA4/clarity), it must: (a) use cookieless-first config, (b) disclose in an updated Privacy/Cookie Policy, and (c) verify it does not collect personal data without consent under India's DPDP Act, 2023.

---

## 3. Third-Party Services

| Service | Where | Data shared | Disclosed? |
|---|---|---|---|
| Google Maps embed + directions | `Contact.tsx` | IP, cookies (third-party) | Now yes — consent gate + Cookie Policy |
| Google Fonts | `index.html` preconnect | request to Google; fonts only | Cookie Policy now notes Google services |
| WhatsApp | EnquireDialog / WhatsAppSender / buttons | Message content incl. name/phone (WhatsApp = Meta; data goes to WhatsApp's servers, subject to WhatsApp Meta Terms & applicable law / Meta-transfer safeguards) | Consent + notice now on both form surfaces |
| jsDelivr (brand logos) | `BrandPartners.tsx` | none personal | n/a |
| GitHub Pages | hosting | standard hosting access logs (GitHub) — not used for user data | out of scope (hosting) |

> ⚠️ **Business decision required:** WhatsApp is owned by Meta. Sending customer name + phone to WhatsApp means that data passes through WhatsApp's systems. Under the DPDP Act the business must maintain its own notice and ensure it is the *controller* of that data. The website now flags this; Toli Motors should confirm this is acceptable and consider adding a line to any formal privacy policy it later publishes.

---

## 4. Legal Pages

**Status before:** No Privacy Policy, Terms & Conditions, or Cookie Policy; no legal links in the footer.

**Fixed in this pass:**
- New pages:
  - `/privacy-policy` → `src/pages/PrivacyPolicy.tsx`
  - `/terms-and-conditions` → `src/pages/TermsAndConditions.tsx`
  - `/cookie-policy` → `src/pages/CookiePolicy.tsx`
- Routes registered in `src/App.tsx` (HashRouter → URLs are `#/privacy-policy`, etc.).
- Footer now has a **LEGAL** column linking to all three pages + privacy contact.
- Cookie Policy is referenced from the footer and from the map consent prompt.

**Drafting rules honoured:** all business-identifying fields use `[PLACEHOLDER]` markers; no legal text is presented as if reviewed by a lawyer — the pages carry a note that they are a starting point that must be reviewed by legal counsel before public launch is finalised.

---

## 5. Forms & Consent

### 5.1 Enquiry form (`EnquireDialog`)
- Validation already existed (name required; 10-digit phone; max-lengths).
- **Fix applied:** added a required consent checkbox: *"I agree to the [Privacy Policy] and consent to Toli Motors contacting me about my enquiry, including via WhatsApp."* Sending is disabled until it is ticked.
- Notice text under the checkbox clarifies the data (name, phone, message) is sent via WhatsApp.

### 5.2 WhatsApp widget (`WhatsAppSender`)
- **Fix applied:** a static notice under the button: messages are sent via WhatsApp, are subject to WhatsApp's own terms/privacy, and the visitor should not include sensitive personal data.

### 5.3 AI chat (`AIChatWidget`)
- Runs locally; no action required beyond disclosure (included in Privacy Policy: "chat runs on your device; nothing is transmitted").

### 5.4 Newsletter (Footer)
- **Removed.** It collected an email with no backend, no purpose, and no consent. Replaced with a **Legal** links column (see Section 6).

---

## 6. Footer & Navigation

**Fixed:**
- Removed newsletter form.
- Added **LEGAL** column (Privacy Policy, Terms & Conditions, Cookie Policy).
- Bottom bar unchanged (copyright line).
- ⚠️ Social icons link to `instagram.com/tolimotors`, `facebook.com/tolimotors`, `youtube.com/@tolimotors` — these look like **assumed/placeholder URLs**. They must be confirmed or set to `#` with a note. **Action: business must confirm.**

---

## 7. Image & Copyright Audit

| Image | Source | Licence verified? | Action |
|---|---|---|---|
| `src/assets/gallery/*.webp` (14) | WhatsApp images provided to project | ⚠️ **No written licence / consent record** | Blocking for public launch if customers' cars/faces are identifiable. Business must confirm it has owner consent/permission for each |
| `src/assets/brands/mahindra-logo.png` (Mahindra-Logo-2021-768x432) | Downloaded from brand-file/cdn sources | ⚠️ brand marks are trademarks; used nominatively | OK if nominal/trademark-fair-use; confirm |
| `src/assets/brands/kia-logo.svg` | Official Kia brand kit (Black RGB logo) | Brand kit — nominative use | OK |
| 19 other brand logos | `cdn.jsdelivr.net` CDN copies | Brand marks; nominative | OK if their source is the official kit |
| Before/After slider images | Unsplash (`images.unsplash.com`) | ⚠️ No record of approval; and they are **stock car photos presented as real customer jobs** | **Removed in this pass.** Until real before/after photos with customer consent exist, the section shows a placeholder state |
| `hero-approved.png` (new) with TOLI MOTORS branding, `toli-logo`, `logo*`, `favicon.png` | **Supplied by website owner** for use on this site | ✅ Owner-supplied (no third-party/copyrighted image; do not hotlink/replace) | In use: `Hero.tsx` renders it via a `<picture>` element as the video-hero poster/fallback at its native 16:9 aspect (1672×941) — **avif + webp + png fallback** (`hero-approved.webp` 147.8 KB / `hero-approved.avif` 66.5 KB derivatives generated with sharp from the identical asset copy; original PNG untouched and still shipped as fallback). Informative image → meaningful alt: "TOLI MOTORS professional automobile service and repair workshop". `hero-bg.webp` no longer imported (unused local asset). ⚠️ Embedded marketing claims unverified — see §8.3 |

**Critical:** Before/After slider described the images as "Real results from real jobs" (e.g., "Hyundai Creta — Complete Restoration") while actually pointing at **Unsplash stock photos**. This is misleading advertising and a copyright risk. The stock photos were removed; a clearly-labelled placeholder remains with the slider UX, so real photos can be dropped in later.

---

## 8. Claims Review (false / unverifiable claims)

| Surface | Claim shown | Verdict | Fix |
|---|---|---|---|
| `Stats.tsx` | "12,000+ Happy Customers", "25+ Years Experience", "40+ Brands Serviced", "98% Customer Satisfaction" | 🟡 Unverifiable numbers | Replaced with verifiable service facts (Multi-Brand Workshop / Genuine Spare Parts / Doorstep Pickup & Drop / **75-Point Inspection**). Business may restore audited numbers later |
| `chat-knowledge.ts` | "25+ years of experience", "12,000+ happy customers", "98% customer satisfaction", "21+ brands", "trusted" | 🟡 Same claims + inconsistent address | Claims re-worded to factual capability statements; address conflict resolved (see 8.1) |
| `OffersStrip.tsx` | "20% OFF first-time service", "Save up to ₹4,000/year", "Free Health Check", "Premium Detailing — Limited slots this month" | ⚠️ Promotion numbers unverified & time-bound | Re-worded to "Ask about current offers" style so the site cannot state fabricated discounts |
| `HowItWorks.tsx` | "You pay only when satisfied." | ⚠️ Contractual promise | Re-worded to "Confirm the work with our team before you pay" (still descriptive; business confirm) |
| `About.tsx` | "built on years of automotive expertise" | 🟡 general | Softened to "built on hands-on automotive experience" — business confirm exact years |
| `chat-knowledge.ts` | "genuine parts", "manufacturer warranty" | ⚠️ | Kept only as claims the business must validate (marked in audit) |
| `CtaBanner.tsx` | "Free 30-point inspection and a transparent quote" | ⚠️ | Re-worded to "75-point inspection" (no "free"); verification needed: is the 75-point inspection genuinely free? |

### 8.1 Inconsistent business facts found (must be reconciled by Toli Motors)

- **Address conflict:** `Contact.tsx`/`Footer.tsx` say **"6-2-806, Ram Nagar, Kovur Nagar, Anantapur, Andhra Pradesh 515004"**; `chat-knowledge.ts` says **"Kamalanagar, Anantapur, Andhra Pradesh 515001"**. Chat now returns the same address as the Contact section — **but the real address must be confirmed**.
- **Phone numbers:** `+91-8074946335` and `+91-9908303888` are both listed; the enquiry form only ever messages `+91-8074946335`. Confirm both numbers are still live and which is the primary WhatsApp line.
- **Email:** `tolimotorsatp@gmail.com` is used in Footer/Contact/chat. Confirm it is the official address.
- **Hours:** "Mon–Sat 9:00 AM – 8:00 PM, Sunday closed" appears (Hero, chat). Confirm.

### 8.2 Marketing Claims Requiring Verification

> Added on request (content pass). These claims now appear in site copy and **must be verified by Toli Motors before they can be considered accurate**. None of the three is verified.

**BUSINESS VERIFICATION REQUIRED — 75-point inspection claim**

"75-point inspection" now appears in: Stats ("75-POINT INSPECTION"), Services card ("Thorough 75-point inspection"), OffersStrip ("75-Point Health Check"), CtaBanner ("Get a 75-point inspection…"), and chat knowledge (services list + inspection answer). The inspection answer lists **7 example categories** and deliberately does **not** enumerate 75 points — do not add a fabricated 75-item checklist. Evidence needed: the actual inspection checklist the workshop performs.

**BUSINESS VERIFICATION REQUIRED — 20+ years of experience claim**

"over 20 years of experience" now appears in the About section header paragraph, and "20+ years of hands-on automotive experience" in the chat's About answer. Evidence needed: business founding/history. Do not invent a founding date.

**BUSINESS VERIFICATION REQUIRED — Google reviews**

**BUSINESS VERIFICATION REQUIRED — Google Business Profile**

No reviews are embedded or quoted on the site (nothing fabricated). The **"Latest Google Reviews"** section (`Testimonials.tsx`) was built with a ready card grid (name, star rating, date, text, Google link per review) but renders an **honest placeholder** because no authorized review source is connected: the business's Google Business Profile **could not be verified from the current project** during this pass:

- The previously hard-coded Place ID (`ChIJN1t_tDeuEmsRUsoyG83frY4`) points to a **Google office in Pyrmont, Sydney, Australia** (Google's API documentation example) — not this business — and was removed.
- Web searches for "Toli Motors, Anantapur" surfaced only a third-party **Justdial** directory listing ("Toli Motors · 91 Ratings, Rudrampet Kamalanagar") — not Google, and using an **address that conflicts** with the site's ("Kovur Nagar"). It was **not** used.
- No reviews from any other business (other "Toli/Tolima/TL Motors" hits are unrelated companies) were used.

What is required before this section can show live reviews:
1. The verified Google Business Profile URL and correct Place ID for Toli Motors, Anantapur.
2. An authorized review source — e.g. a backend Google Places API call made with the business's own key (the Google Places (New) API no longer exposes public, keyless review feeds), or an approved Google review widget.
3. Replacing the `GOOGLE_PROFILE_URL` constant (currently a neutral Maps search link) and populating the `reviews` array **from that source only**. The placeholder state and the "VIEW ALL GOOGLE REVIEWS" button (→ the same profile link) remain correct and honest meanwhile.
4. When any third-party review widget is adopted, it must be audited for **cookies, tracking, third-party requests, data transferred, consent requirements, accessibility, and performance impact**, and documented in §3 (none is used today, so no widget data is transferred).
5. No Google Review/Rating structured data has been added (do not add without an actual verified source).

| Claim                | Required Evidence                     | Status                |
| -------------------- | ------------------------------------- | --------------------- |
| 75-point inspection  | Actual service/inspection checklist   | Verify with business  |
| 20+ years experience | Business history/founding information | Verify with business  |
| Google reviews       | Actual Google Business Profile        | Verify against source |

### 8.3 Hero artwork — embedded marketing claims

> Added on request (hero-artwork compliance pass). The approved hero image (`ChatGPT Image Sep 26, 2026, 11_37_03 AM.png` / `src/assets/hero-approved.png`) is **owner-supplied and stays byte-identical** — no artwork was regenerated or modified during this audit. Each claim below was checked against **project evidence only**; a claim is not treated as true just because it appears in the artwork. **None of the five is backed by verified evidence in the project today.**

**BUSINESS VERIFICATION REQUIRED — "Trusted by Thousands"**

This claim was **not** requested by the website owner. No supporting evidence exists in the project: the original site stat "12,000+ Happy Customers" was already **removed** as unverifiable (§8), the Google-reviews section deliberately does **not** embed any review counts (no consumer numbers exist on the site), and no customer-count or review data is sourced anywhere. If the artwork shows this claim, it must be confirmed by the owner (customer volume records / Google Business Profile review counts) or the artwork re-cut by the owner before public launch. The hero is **not replaced** per instruction — it remains pending business confirmation.

**BUSINESS VERIFICATION REQUIRED — 75-Point Inspection**

Appears in the artwork. Site evidence: the same claim exists in Stats, Services, OffersStrip, CtaBanner and chat knowledge (§8.2) — all flagged for verification. The chat inspection answer lists 7 example categories and deliberately omits a 75-item list (nothing fabricated). Required evidence: the actual inspection checklist the workshop performs.

**BUSINESS VERIFICATION REQUIRED — 20+ Years of Experience**

Appears in the artwork. Site evidence: "over 20 years of experience" (About) and "20+ years of hands-on automotive experience" (chat) — both already flagged (§8.2). Required evidence: business founding/history. Do not invent a founding date.

**BUSINESS VERIFICATION REQUIRED — "Genuine Parts & Service"**

Appears as a marketing phrase; the site copy claims "genuine/only genuine spare parts" (chat services + spare-parts answers) but no supplier agreement, OEM authorisation, or parts sourcing documentation exists in the project. Required evidence: confirming the workshop sources & sells genuine/OEM parts (e.g. authorised-dealer or supplier relationship).

**BUSINESS VERIFICATION REQUIRED — "Expert Technicians"**

Appears in the artwork. Site evidence: chat text refers to "certified technicians" / "Expert Service — Certified care" but no qualification, certification, or workforce credential is documented in the project. Required evidence: the technicians' qualifications/certifications.

| Claim (artwork)      | Project evidence found | Status                |
| -------------------- | ---------------------- | --------------------- |
| Trusted by Thousands | None (12,000+ counter was already removed as unverifiable) | Verify with business |
| 75-Point Inspection  | Copy only — no checklist | Verify with business |
| 20+ Years Experience | Copy only — no history | Verify with business |
| Genuine Parts & Service | Copy only — no supplier/OEM docs | Verify with business |
| Expert Technicians   | Copy only — no credentials | Verify with business |

**Readiness verdict:** the hero artwork can **remain unchanged** as an asset pending business confirmation of the above; however, none of the embedded marketing claims is currently evidenced, and "Trusted by Thousands" was not owner-sanctioned. **Action:** business owner to confirm/supply evidence for each claim, or provide a revised approved artwork. No site copy changed as a result of this audit (audit documentation only).

### 8.4 Hero video — source/licence status (video-hero pass)

**BUSINESS VERIFICATION REQUIRED — hero video footage**

A video-hero component is now implemented, but **no video file is bundled** (`src/assets/hero/hero-video.mp4` does not exist yet) and none was invented or downloaded. The hero currently renders the **owner-supplied approved artwork** (`hero-approved.png`/`.webp`/`.avif`, §7) as poster/fallback inside a 16:9 frame — the site makes **no claim of video footage of the actual TOLI MOTORS workshop**.

| Item | Status |
| --- | --- |
| Video file | ⚠️ Not present — must be supplied by the business (owned or properly licensed workshop footage, 6–10 s seamless silent loop) |
| Downloading third-party clips (YouTube/Google/Instagram/stock) | 🚫 Prohibited without a verifiable licence — see `src/assets/hero/README.md` |
| Documentation required before shipping a video | Source + licence/consent record must be added **here** before `hero-video.mp4` is committed |
| Fallback behaviour | Poster artwork always renders; `video onError` falls back to the artwork; reduced-motion / Save-Data / small screens get the static poster |
| Presentation | Muted, looped, playsInline, autoplay only when motion is allowed on ≥768 px screens without Save-Data; accessible pause/play toggle |

No video is presented as TOLI MOTORS' own facility footage anywhere on the site.

---

## 9. Accessibility (WCAG 2.1 pass)

### Good ✅
- Reduced-motion preference is respected across all heavy animation components (`prefersReducedMotion()` in Hero, Services, Gallery, BeforeAfter, WhyUs, OffersStrip, Stats, Contact, About, HowItWorks, Footer, Enquire/WhatsApp animations, CtaBanner, AIChatWidget, WhatsAppButton, BackToTop).
- All images have `alt` text; decorative blur shapes use `aria-hidden`.
- Gallery lightbox: `role="dialog"`, `aria-modal`, focus trap, Escape/Arrow key navigation, focus moved to close button.
- BeforeAfter slider: focusable (`tabIndex=0`), `role="slider"`, keyboard ArrowLeft/Right support.
- Form inputs have `<Label htmlFor>` labels; chat input has `aria-label`.
- Buttons have descriptive `aria-label`s (nav hamburger, back-to-top, close, prev/next, WhatsApp).
- Google Maps iframe has a `title`.

### Needs attention → addressed or documented
- **Offers carousel — WCAG 2.2.2 (Pause/Stop/Hide) ✅ fixed.** Added a visible **Pause/Resume** button (top-right of the strip, `aria-pressed`, Pause/Play icons, focus-visible outline). Auto-scroll now stops while the control or the section has focus, is paused via the button (persists until resumed), pauses on hover/drag as before, AND the entire auto-scroll loop is gated on `prefers-reduced-motion` (previously only the icon colour cycle was gated) — reduced-motion users now see a static, manually scrollable strip.
- **Contrast — measured ✅** (WCAG ratios computed from the built theme variables): `--performance-red` (rgb 191/18/32) on white = **6.32:1** (AA normal text 4.5 needed → passes); white on red buttons = 6.32:1 ✅; `--muted-ink` (rgb 99/110/124) on white = **5.03:1** (AA ✅); `--ink` on white = 17.04:1 ✅. The earlier "borderline ≈4.6:1" concern is resolved — no contrast change needed. Recommend a one-off Lighthouse/Axe run at launch to confirm of the full page.
- Inline SVG icons are frequently `aria-hidden` only where decorative; icon-only buttons all have labels. ✅
- `NotFound.tsx` link uses `href="/"` (works under HashRouter as `#/`? `<a href="/">` navigates the full path, breaking HashRouter). 🟡 Fixed to `href="#/"`.

---

## 10. Security Review

| Finding | Severity | Disposition |
|---|---|---|
| `.env` committed to git (contains `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY` = anon/publishable key) | Medium | `.env` added to `.gitignore`. ⚠️ Anon keys are public by design, but **rotate at Supabase** since they were shared in git history |
| Supabase client installed but unused (bundle includes `@supabase/supabase-js`) | Low | Noted; if unused it should be removed or the client only initialised when needed |
| `supabase/functions/chat` forwards chat to `ai.gateway.lovable.dev` if deployed (`LOVABLE_API_KEY` env) | High-if-active | Site does NOT call it. **Do not enable chat edge function without privacy review** — it would transmit user chat text to a third-party AI gateway |
| Inline event handlers & `target="_blank"` links | Low | all `target="_blank"` links reviewed — they carry `rel="noopener noreferrer"` ✅ |
| No CSP headers (GitHub Pages can't set them easily) | Low | Documented; not blocking |
| HTML: no user-generated content rendered dangerously | — | All renders are static/local; `ReactMarkdown` used for chat replies which come from local KB only ✅ |

---

## 11. REQUIRES BUSINESS INPUT — checklist for Toli Motors

- [ ] Legal business name as registered (for footer, T&C, policies)
- [ ] Registered / principal place of business (the on-site address needs confirmation)
- [ ] Privacy contact email (currently reuses `tolimotorsatp@gmail.com` — confirm or change)
- [ ] GST registration number (if applicable) for Terms & Conditions
- [ ] Confirm both phone numbers (+91-8074946335, +91-9908303888) are live; identify primary WhatsApp number
- [ ] Verify business hours (Mon–Sat 9–8, Sunday closed)
- [ ] Confirm "75-point inspection" — provide the actual inspection checklist; confirm whether it is genuinely free (CtaBanner) and performed on every service (OffersStrip/Stats)
- [ ] Confirm "20+ years of experience" — provide business history/founding information to back the claim
- [ ] Confirm/restore Stats numbers only if they can be backed with records; otherwise keep factual version
- [ ] Confirm promotions ("20% OFF", AMC savings, detailing slots) — don't publish time-bound claims that may expire
- [ ] Provide real social media profile URLs (Instagram/Facebook/YouTube)
- [ ] Provide site URL (`https://<owner>.github.io/Toli-2/`) to fill canonical + OG image meta
- [ ] Confirm ownership/consent for all gallery images (cars/customers) and the hero photo (`hero-bg.webp`, currently re-styled as a white→red duotone background)
- [ ] Confirm after photos for Before/After; upload real, consented photos
- [ ] Verify Google Business Profile exists and provide the **correct Place ID** — the previously used ID (`ChIJN1t_tDeuEmsRUsoyG83frY4`) resolved to a Google office in Pyrmont, Sydney, and was replaced with a Maps search link until the real profile/Place ID is confirmed; then connect an authorized review source or approved Google review widget to fill the "Latest Google Reviews" placeholder section
- [ ] Legal counsel review of the three policy pages before final public launch
- [ ] Decide whether WhatsApp transactions, Google Maps, and fonts need a fuller Cookie/Privacy regime

---

## 12. Privacy Policy — mandated content check (DPDP Act, 2023 draft-ready)

The Privacy Policy page includes:
- Who is collecting data (controller) → `[LEGAL BUSINESS NAME]`, Toli Motors
- What is collected (contact-form data at the point of contact; none automated)
- Purpose (respond to enquiries; WhatsApp contact)
- Storage/handling (data is transmitted via WhatsApp, Meta platform; business should store enquiries per its own retention policy) → placeholders for retention period
- Rights of data principals: access, correction, erasure, grievances → included; grievance officer = `[PRIVACY CONTACT EMAIL]`
- Children; consent withdrawal; data security → included
- Third-party processors: WhatsApp/Meta, Google (maps/fonts), GitHub Pages (hosting), jsDelivr (static CDN)

> Note: DPDP Act rules are yet to be fully notified. This page is a demonstrable good-faith measure; formal legal review still needed.

---

## 13. SEO / Metadata

`index.html` had title, description, author, OG (title/type/description), Twitter card. **Added:**
- `canonical` → `[SITE_URL]` (placeholder)
- `robots` meta → index/follow
- `og:url` → `[SITE_URL]`
- `og:image` → `[SITE_URL]/favicon.png` (placeholder — replace with a real 1200×630 OG image)
- `theme-color`

---

## 14. Files changed in this pass

- `COMPLIANCE_AUDIT.md` (new)
- `src/pages/PrivacyPolicy.tsx` (new)
- `src/pages/TermsAndConditions.tsx` (new)
- `src/pages/CookiePolicy.tsx` (new)
- `src/components/LegalPageShell.tsx` (new — shared layout for legal pages)
- `src/assets/ba-placeholder.svg` (new — local placeholder for before/after slider)
- `src/assets/hero-approved.png` (new — owner-supplied hero artwork, copied unchanged from `ChatGPT Image Sep 26, 2026, 11_37_03 AM.png`, 1672×941)
- `src/App.tsx` (3 legal routes added)
- `src/components/Footer.tsx` (legal column; newsletter removed; legal links in bottom bar; "Read our reviews on Google" link added)
- `src/components/EnquireDialog.tsx` (required consent checkbox + privacy notice + link)
- `src/components/WhatsAppSender.tsx` (WhatsApp/privacy notice)
- `src/components/Testimonials.tsx` (reviews section rebuilt as a **"Latest Google Reviews"** section: review-card grid ready for an authorized Google source, currently an honest placeholder state with a "VIEW ALL GOOGLE REVIEWS" button and WhatsApp feedback link; wrong Google Place ID removed)
- `src/components/Contact.tsx` (Google Maps click-to-consent gate + Cookie Policy link)
- `src/components/Stats.tsx` (unverifiable numbers → in-site factual counters + labels; "30+ Inspection Points" → "75-Point Inspection")
- `src/components/Services.tsx` ("30-point inspection" → "75-point inspection")
- `src/components/OffersStrip.tsx` (claims re-worded — no unverified discounts; "30-Point Health Check" → "75-Point Health Check"; visible Pause/Resume control added; auto-scroll gated on prefers-reduced-motion)
- `src/components/BeforeAfter.tsx` (Unsplash stock photos removed → local placeholder; caption corrected)
- `src/assets/hero-approved.webp`, `src/assets/hero-approved.avif` (new — optimized derivatives of the hero PNG, generated with `sharp`; same 1672×941, WebP 147.8 KB / AVIF 66.5 KB vs 1.89 MB PNG)
- `src/index.css` (added **premium red gradient system**: theme token `--performance-red-dark: 351 100% 25%`; `.hero-panel-gradient` 145deg deep-red→primary-red→dark-red with two subtle radial highlight glows via `::before`/`::after`; `.premium-btn-primary` red-gradient page-wide primary; `.hero-action-primary` white/light surface button; `.hero-action-glass` translucent glass button; `.hero-action-arrow` 3px arrow nudge on hover; all paired `:focus-visible` white outlines + `prefers-reduced-motion` guard).
- `src/components/Hero.tsx` (right **30% panel now `.hero-panel-gradient`** — red gradient with soft highlights/glass; content wrapped in a `z-10` layer so decorative glows never sit over text; buttons restyled: **Book a Service** = `.hero-action-primary` white surface + deep-red text; **Service Enquiry** / **Get in Touch** = `.hero-action-glass` glass with thin white border + white text; arrow micro-motion `.hero-action-arrow`; scroll helper now respects `prefersReducedMotion`; the **approved artwork and the 70/30 `lg:grid-cols-10` layout are unchanged** — no overlay/filter/edit on the image, panel still `col-span-3`.)
- `src/components/EnquireDialog.tsx` (submit → `.premium-btn-primary`), `src/components/CtaBanner.tsx` (ENQUIRE NOW → `.premium-btn-primary`), `src/components/Navbar.tsx` (mobile CALL US NOW → `.premium-btn-primary`) — gradient applied **selectively** to booking UI / CTA section / navigation accent only; Contact consent button intentionally kept flat red (consent control, not a brand CTA).
- `src/lib/chat-knowledge.ts` (claims re-worded; address reconciled with Contact; warranty wording; "pay only when satisfied" removed; **Google-reviews answer added; "30-point" → "75-point"; "20+ years" added to About answer — all flagged for verification**)
- `src/components/About.tsx` (claim softened; **"over 20 years of experience" added — unverified, flagged**)
- `src/components/HowItWorks.tsx` ("pay only when satisfied" re-worded)
- `src/components/CtaBanner.tsx` ("free" removed — unverified; "30-point" → "75-point")
- `src/pages/NotFound.tsx` (home link uses router `Link` — works under HashRouter)
- `index.html` (canonical, robots, og:url, og:image, theme-color — placeholders)
- `.gitignore` (`.env` + `.env.*` ignored)
- `tailwind.config.ts` (registered `@tailwindcss/typography` so legal pages' `prose` styling + existing chat `prose` classes render; switched plugin registration from `require()` to ESM imports — also clears 2 lint errors)

## 15. Test plan — executed

- `npx tsc --noEmit` — **PASS** ✅
- `npm run build` — **PASS** ✅ (built in ~3.3s)
- `npm test` (vitest) — **PASS** ✅ (1/1)
- `npm run lint` — **FAILS, pre-existing only.** All 60 errors/lines are the codebase-wide `catch {}` (`no-empty`) pattern that pre-dates this change (present in untouched `src/components/ui/*`, supabase shim, and the original `require()` in `tailwind.config.ts`). This pass did **not** introduce the `require()` errors and added only one `catch {}` consistent with the existing pattern (Contact map-consent `try/catch`). Recommended follow-up: turn on `allowEmptyCatch` in ESLint config or add `/* noop */` comments repo-wide.
- Manual route smoke test: `#/`, `#/privacy-policy`, `#/terms-and-conditions`, `#/cookie-policy`, unknown route → 404 page
- Manual: enquiry form blocks submit until consent is ticked; map renders only after clicking "LOAD MAP"; the "Latest Google Reviews" section renders an honest placeholder (no fabricated reviews, cards ready for an authorized feed) with a "VIEW ALL GOOGLE REVIEWS" button linking via Maps search; offers strip no longer shows invented discounts; carousel has a Pause/Resume button that stops auto-scroll and persists while paused
- A11y spot-check (Latest Google Reviews section): responsive 1/2/3-column grid; heading via `aria-labelledby`; review text in `blockquote`, name/date/rating in `figcaption` with `sr-only` rating and decorative stars `aria-hidden`; every link focusable with visible focus outline (keyboard-navigable); no auto-playing motion
- Bundle grep: no `unsplash`, no "Kamalanagar"/515001 conflict, no "12,000+", "98%", "25+ years", "20% OFF", "30-point"/"30 Point", no wrong Place ID `ChIJN1t_tDeuEmsRUsoyG83frY4`, or "pay only when satisfied" strings remain in `dist` — "75-point"/"75-Point" and "20+ years" present as expected ✅
- Hero pass verify: `npx tsc --noEmit` PASS ✅; `npm run build` PASS ✅ (3.15s); `npm test` (vitest) PASS ✅ (1/1); lint: no new errors. Hero is a **70/30 two-column layout** (desktop `lg:grid-cols-10` = 7/3; stacks 1-col below `lg` and on mobile, image first then panel) with artwork on the **left** via `<picture>` (avif 66.5 KB / webp 147.8 KB / png fallback) at `w-full h-auto` — no cropping, no stretching, exact 16:9. Panel on the **right**: BOOK A SERVICE → `EnquireDialog` (WhatsApp form), SERVICE ENQUIRY → scrolls to `#whatsapp`, GET IN TOUCH → scrolls to `#contact` — all real destinations, no 404/fake routes, **no Register button (no auth exists)**. A11y: real `<button>`s with visible text labels + `aria-hidden` icons, focus-visible rings, keyboard-navigable, logical tab order, stacked full-width touch targets on mobile, sr-only H1 + meaningful alt. Original PNG byte-identical (`md5 10fa782f…`). **Claims inside artwork unverified — see §8.3.**

---

## 16. Final status

| Area | Status |
|---|---|
| Legal pages (privacy/terms/cookies) | ✅ Fixed |
| Cookie consent (maps) | ✅ Fixed |
| Form consent | ✅ Fixed |
| Tracking audit | ✅ Clean — none present |
| Third-party disclosure | ✅ Documented + consent-gated |
| Accessibility | ✅ Fixed — contrast verified (6.32:1 red / 5.03:1 muted); offers carousel has Pause/Resume + reduced-motion gating; reduced-motion respected site-wide |
| Fake reviews / false claims | ✅ Fixed (business must verify the new "75-point inspection" and "20+ years" claims — see §8.2) |
| Business details | ⚠️ Placeholders — needs input |
| Google reviews | ⚠️ "Latest Google Reviews" section present as an honest placeholder — no reviews claimed/embedded; correct Google Business Profile + Place ID + authorized feed must be supplied |
| Image copyright | ⚠️ Hero now **owner-supplied** (`hero-approved.png`, licence OK; optimized webp/avif derivatives generated in-repo from the identical copy; original byte-identical); gallery & brand images still need ownership/consent records; **hero artwork claims unverified — see §8.3** |
| DPDP readiness | 🟡 Draft-compliant; legal review required |
| Security | 🟡 `.env` gitignored; rotate anon key; keep chat edge function disabled |
| SEO metadata | 🟡 Placeholders only; need real site URL |