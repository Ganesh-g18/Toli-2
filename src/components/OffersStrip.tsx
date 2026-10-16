import { useRef, useEffect, useState, useCallback, PointerEvent as RPointerEvent } from "react";
import { Tag, Percent, Gift, Wrench, Sparkles, Calendar, Pause, Play } from "lucide-react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-mobile";

const offers = [
  { icon: Percent, title: "First Visit Offer", desc: "Ask about current discounts" },
  { icon: Gift, title: "Doorstep Pickup & Drop", desc: "Within Anantapur" },
  { icon: Wrench, title: "75-Point Health Check", desc: "On every service" },
  { icon: Sparkles, title: "Premium Detailing", desc: "Ask about availability" },
  { icon: Calendar, title: "AMC Plans", desc: "Ask about annual savings" },
  { icon: Tag, title: "Battery Services", desc: "Amaron care & exchange" },
];

const OffersStrip = () => {
  const loop = [...offers, ...offers, ...offers];
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const rafRef = useRef<number | null>(null);
  const autoRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const focusRafRef = useRef<number | null>(null);
  const dragState = useRef({
    dragging: false,
    moved: false,
    startX: 0,
    startScroll: 0,
    velocity: 0,
    lastX: 0,
    lastT: 0,
    pointerId: 0,
  });
  const [paused, setPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (prefersReducedMotion()) setReduceMotion(true);
  }, []);

  // Color-cycling animation for offer icons - replays on scroll.
  // Desktop marquee only: the phone chips keep a static, legible tint, and any
  // inline background the marquee left behind is cleared when we switch over.
  useEffect(() => {
    const section = document.getElementById("offers");
    if (isMobile) {
      section?.querySelectorAll<HTMLElement>(".offer-icon-circle").forEach((el) => {
        el.style.background = "";
      });
      return;
    }
    if (prefersReducedMotion()) return;

    let anim: ReturnType<typeof animate> | null = null;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const icons = section.querySelectorAll<HTMLElement>(".offer-icon-circle");
          if (icons.length) {
            anim = animate(icons, {
              background: [
                "hsl(355, 83%, 41%)",
                "hsl(351, 100%, 34%)",
                "hsl(210, 17%, 96%)",
                "hsl(355, 83%, 41%)",
              ],
              duration: 5000,
              delay: stagger(600, { from: "first" }),
              loop: true,
              alternate: true,
              ease: "inOutSine",
            });
          }
        } else {
          if (anim) {
            try { anim.pause(); } catch { /* Optional browser capability/storage may be unavailable; retain the usable fallback. */ }
            anim = null;
          }
          const icons = section.querySelectorAll<HTMLElement>(".offer-icon-circle");
          icons.forEach((el) => { el.style.background = ""; });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (anim) try { anim.pause(); } catch { /* Optional browser capability/storage may be unavailable; retain the usable fallback. */ }
    };
  }, [isMobile]);

  // Compute which card's center is closest to viewport center -> "active"
  const updateActive = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let bestIdx = -1;
    let bestDist = Infinity;
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    setActiveIndex(bestIdx);
  }, []);

  const scheduleActive = useCallback(() => {
    if (focusRafRef.current) return;
    focusRafRef.current = requestAnimationFrame(() => {
      focusRafRef.current = null;
      updateActive();
    });
  }, [updateActive]);

  // Auto-scroll loop (desktop marquee only — phones use native swipe)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || isMobile) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused && !manualPaused && !reduceMotion && !dragState.current.dragging && el) {
        el.scrollLeft += (dt / 1000) * 35;
        const max = el.scrollWidth / 3;
        if (el.scrollLeft >= max * 2) el.scrollLeft -= max;
        scheduleActive();
      }
      autoRef.current = requestAnimationFrame(tick);
    };
    autoRef.current = requestAnimationFrame(tick);
    return () => {
      if (autoRef.current) cancelAnimationFrame(autoRef.current);
    };
  }, [paused, manualPaused, reduceMotion, scheduleActive, isMobile]);

  const normalizeScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth / 3;
    if (el.scrollLeft < max * 0.5) el.scrollLeft += max;
    else if (el.scrollLeft > max * 1.5) el.scrollLeft -= max;
  }, []);

  const snapToNearest = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let bestEl: HTMLElement | null = null;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c) => {
      const child = c as HTMLElement;
      const r = child.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        bestEl = child;
      }
    });
    if (bestEl) {
      const r = (bestEl as HTMLElement).getBoundingClientRect();
      const delta = r.left + r.width / 2 - center;
      el.scrollBy({ left: delta, behavior: "smooth" });
    }
  }, []);

  // Momentum
  const startMomentum = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const decay = 0.94;
    const step = () => {
      const v = dragState.current.velocity;
      if (Math.abs(v) < 0.15 || dragState.current.dragging) {
        rafRef.current = null;
        normalizeScroll();
        snapToNearest();
        scheduleActive();
        return;
      }
      el.scrollLeft -= v;
      dragState.current.velocity *= decay;
      normalizeScroll();
      scheduleActive();
      rafRef.current = requestAnimationFrame(step);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  }, [normalizeScroll, snapToNearest, scheduleActive]);

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      setPaused(false);
    }, 1800);
  }, []);

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    setPaused(true);
    dragState.current.dragging = true;
    dragState.current.moved = false;
    dragState.current.startX = e.clientX;
    dragState.current.startScroll = el.scrollLeft;
    dragState.current.lastX = e.clientX;
    dragState.current.lastT = performance.now();
    dragState.current.velocity = 0;
    dragState.current.pointerId = e.pointerId;
    setIsDragging(true);
    try { (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId); } catch { /* Optional browser capability/storage may be unavailable; retain the usable fallback. */ }
  };

  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;
    const now = performance.now();
    const dt = now - dragState.current.lastT;
    if (dt > 0) {
      dragState.current.velocity = ((e.clientX - dragState.current.lastX) / dt) * 16;
    }
    dragState.current.lastX = e.clientX;
    dragState.current.lastT = now;
    scheduleActive();
  };

  const endDrag = (e: RPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    setIsDragging(false);
    try { (e.currentTarget as HTMLDivElement).releasePointerCapture(dragState.current.pointerId); } catch { /* Optional browser capability/storage may be unavailable; retain the usable fallback. */ }
    if (Math.abs(dragState.current.velocity) > 0.5) {
      startMomentum();
    } else {
      normalizeScroll();
      snapToNearest();
      scheduleActive();
    }
    scheduleResume();
  };

  // Init
  useEffect(() => {
    const el = trackRef.current;
    // The desktop marquee is seamless because it starts mid-way through 3
    // copies; the phone strip holds a single list, so it must start at 0 —
    // otherwise it opens on a chip sliced in half.
    if (!el) return;
    if (isMobile) el.scrollLeft = 0;
    else el.scrollLeft = el.scrollWidth / 3;
    requestAnimationFrame(updateActive);
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (focusRafRef.current) cancelAnimationFrame(focusRafRef.current);
    };
  }, [updateActive, isMobile]);

  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    setPaused(true);
  };
  const handleMouseLeave = () => {
    if (!dragState.current.dragging) scheduleResume();
  };
  const handleFocus = () => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    setPaused(true);
  };
  const handleBlur = () => {
    if (!dragState.current.dragging && !manualPaused) scheduleResume();
  };
  const toggleManualPause = () => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    const next = !manualPaused;
    setManualPaused(next);
    if (!next) setPaused(false);
  };

  return (
    <section
      id="offers" data-journey-section="offers"
      aria-label="Current offers"
      className="journey-offers relative border-y border-border/70 bg-gradient-to-r from-background via-secondary/55 to-background shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden pt-14 sm:pt-16"
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      onFocus={isMobile ? undefined : handleFocus}
      onBlur={isMobile ? undefined : handleBlur}
    >
      {/* Desktop only: soft edge masks + a pause control for the auto-scrolling
          marquee. Neither exists on mobile — the phone layout is a plain
          swipeable strip, so no offer text is ever cut off or half-faded. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 min-[360px]:w-16 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 hidden md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 min-[360px]:w-16 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 hidden md:block" />

      {!reduceMotion && !isMobile && (
        <button
          type="button"
          onClick={toggleManualPause}
          aria-label={manualPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          aria-pressed={manualPaused}
          className="absolute top-5 right-4 z-20 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {manualPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>
      )}

      <div
        ref={trackRef}
        onPointerDown={isMobile ? undefined : onPointerDown}
        onPointerMove={isMobile ? undefined : onPointerMove}
        onPointerUp={isMobile ? undefined : endDrag}
        onPointerCancel={isMobile ? undefined : endDrag}
        onScroll={scheduleActive}
        className={
          isMobile
            ? "flex snap-x snap-proximity gap-2 py-3 pl-4 pr-6 scroll-pl-4 whitespace-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide select-none"
            : `flex gap-3 sm:gap-4 py-5 sm:py-6 whitespace-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`
        }
        style={{
          // Phones: let the browser pan the strip natively (a "pan-y" lock would
          // block horizontal swiping). Pointer-drag momentum is desktop only.
          touchAction: isMobile ? "auto" : "pan-y",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          willChange: "scroll-position",
        }}
      >
        {(isMobile ? offers : loop).map((o, i) => {
          const isActive = i === activeIndex;
          const isNear = Math.abs(i - activeIndex) === 1;
          return (
            <div
              key={i}
              className={
                isMobile
                  ? // Phone chip: single line, own rounded card, snapped into
                    // place while swiping — always fully readable, never clipped.
                    "snap-start shrink-0 flex items-center gap-2 rounded-xl border border-border/80 bg-background/85 pl-2.5 pr-3.5 py-2 shadow-sm backdrop-blur-md"
                  : `shrink-0 flex items-center gap-2 min-[360px]:gap-3 px-3 min-[360px]:px-5 py-3 rounded-full border backdrop-blur-md shadow-sm transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform
                ${isActive
                  ? "scale-[1.04] opacity-100 border-primary/50 bg-background/90 shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                  : isNear
                    ? "scale-[0.99] opacity-90 border-border bg-background/70 hover:opacity-100 hover:scale-100 hover:shadow-md hover:shadow-primary/10"
                    : "scale-[0.97] opacity-75 border-border bg-background/60 hover:opacity-100 hover:scale-100"
                }`
              }
              style={isMobile ? undefined : { transformOrigin: "center" }}
            >
              <span
                className={`offer-icon-circle inline-flex items-center justify-center shrink-0 rounded-full transition-all duration-[420ms] ${
                  isMobile
                    ? "w-7 h-7 bg-primary/[0.12] text-primary"
                    : `w-8 h-8 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/40"
                          : "bg-primary/80 text-primary-foreground"
                      }`
                }`}
              >
                <o.icon className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </span>
              <span className={`font-display tracking-wider text-foreground ${isMobile ? "text-[13px]" : ""}`}>{o.title}</span>
              <span className={`${isMobile ? "hidden" : "hidden min-[360px]:inline"} text-sm text-muted-foreground`}>— {o.desc}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OffersStrip;
