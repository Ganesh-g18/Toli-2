# Motion Polish: Cohesive Animation System

Same design, same content, same colors — significantly more refined motion. The site already has a partial motion layer (scroll reveals via a data-motion observer in the home page, hero line-in animation, card hover, button hover, reduced-motion handling). This plan turns that ad-hoc layer into one consistent, tuned system and extends it to the parts that are currently static.

## What will change

**Motion tokens (single source of truth)**
Define duration and easing variables in the global stylesheet — micro 180ms, UI 300ms, reveal 640ms, hero 860ms, all on `cubic-bezier(0.22, 1, 0.36, 1)` — and rewire every existing animation class to use them so timings stop drifting between components.

**Reusable reveal utility**
Replace the DOM-scanning effect currently living inside the home page with a small shared hook plus a `<Reveal>` wrapper. Sections opt in explicitly (variant: fade-up, fade-side, scale, mask, stagger) instead of being auto-tagged by CSS selector guesswork. This removes the fragile `.grid > div` targeting and makes stagger delays deliberate.

**Hero entrance sequence**
Refine the existing staggered timing into a clear hierarchy: background image (scale 1.04 → 1), eyebrow, logo + heading (clipped upward line reveal), supporting copy, CTA panel, then scroll cue. Movement stays in the 16–30px range. Mobile uses shorter offsets and halved stagger.

**Heading reveals**
Section headings (`WHY CHOOSE US`, `WHAT OUR CUSTOMERS SAY`, services, gallery, contact) get a clipped upward line reveal, kicker first, heading second. Body paragraphs simply fade — not every text node animates.

**Images**
Gallery tiles and the hero media get overflow-clipped containers, reveal from scale ~1.04 to 1, and a slow subtle hover zoom (desktop only).

**Buttons, links, cards, icons**
- Buttons: consistent hover lift (2px) + shadow, snappy pressed state, arrow/icon nudge on hover.
- Nav links: existing underline sweep retimed to the token system; active state unchanged.
- Cards (services, why-us, testimonials, offers): hover lift 3–4px with smooth shadow and border transitions, no excessive float.
- Icons in cards and the back-to-top / WhatsApp / chat floating buttons get short feedback transitions.

**Navigation & overlays**
Mobile menu open/close eased with per-item stagger (already partially there, retimed and reduced on mobile). Navbar scrolled-state transition smoothed. Dialog/lightbox open-close and form inputs (focus ring, invalid state) get consistent short transitions.

**Page transitions**
Add a lightweight route-level fade/translate wrapper around the router outlet so `/` and 404 transition smoothly. No loaders, no delay over ~300ms.

**Mobile & accessibility**
Hover-only effects gated behind `(hover: hover)`. Reduced stagger and travel under 640px. `prefers-reduced-motion: reduce` collapses all transforms to instant opacity, keeping the site fully usable — extended to cover the new utilities, page transition, and hero sequence.

**Performance**
Only `transform` and `opacity` animate. `will-change` applied only during active animation and released after. Observers unobserve on reveal.

## Verification
Run through home + 404 on desktop, tablet, and mobile viewports in the browser, checking hero sequence, scroll reveals, hover states, mobile menu, dialogs, page transition, and the reduced-motion setting; fix any layout shift or conflicting animation found.

## Technical notes
- New: `src/hooks/use-reveal.ts`, `src/components/motion/Reveal.tsx`, `src/components/motion/PageTransition.tsx`.
- Edited: `src/index.css` (tokens + utility classes), `src/pages/Index.tsx` (drop the DOM-scanning effect), `src/App.tsx` (route transition), and per-component class updates across Hero, Navbar, Services, About, Stats, Gallery, WhyUs, Testimonials, CtaBanner, Contact, Footer, OffersStrip, EnquireDialog, floating buttons.
- No new animation dependency; CSS transitions/keyframes plus IntersectionObserver only.
- No changes to colors, fonts, copy, images, layout structure, or backend.
