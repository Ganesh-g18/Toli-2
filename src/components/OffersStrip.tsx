import { useRef, useEffect, useState, useCallback, PointerEvent as RPointerEvent } from "react";
import { Tag, Percent, Gift, Wrench, Sparkles, Calendar } from "lucide-react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const offers = [
  { icon: Percent, title: "20% OFF", desc: "First-time service" },
  { icon: Gift, title: "Free Pickup & Drop", desc: "Within Anantapur" },
  { icon: Wrench, title: "Free Health Check", desc: "30-point inspection" },
  { icon: Sparkles, title: "Premium Detailing", desc: "Limited slots this month" },
  { icon: Calendar, title: "AMC Combo", desc: "Save up to ₹4,000/year" },
  { icon: Tag, title: "Battery Exchange", desc: "Bonus on Amaron swap" },
];

const OffersStrip = () => {
  const loop = [...offers, ...offers, ...offers];
  const trackRef = useRef<HTMLDivElement>(null);
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
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Color-cycling animation for offer icons - replays on scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let anim: ReturnType<typeof animate> | null = null;
    const section = document.getElementById("offers");
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
            try { anim.pause(); } catch {}
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
      if (anim) try { anim.pause(); } catch {}
    };
  }, []);

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

  // Auto-scroll loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused && !dragState.current.dragging && el) {
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
  }, [paused, scheduleActive]);

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
    try { (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId); } catch {}
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
    try { (e.currentTarget as HTMLDivElement).releasePointerCapture(dragState.current.pointerId); } catch {}
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
    if (el) {
      el.scrollLeft = el.scrollWidth / 3;
      requestAnimationFrame(updateActive);
    }
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (focusRafRef.current) cancelAnimationFrame(focusRafRef.current);
    };
  }, [updateActive]);

  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    setPaused(true);
  };
  const handleMouseLeave = () => {
    if (!dragState.current.dragging) scheduleResume();
  };

  return (
    <section
      id="offers"
      aria-label="Current offers"
      className="relative border-y border-border/70 bg-gradient-to-r from-background via-secondary/55 to-background shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden pt-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 min-[360px]:w-16 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 min-[360px]:w-16 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={scheduleActive}
        className={`flex gap-3 sm:gap-4 py-5 sm:py-6 whitespace-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          willChange: "scroll-position",
        }}
      >
        {loop.map((o, i) => {
          const isActive = i === activeIndex;
          const isNear = Math.abs(i - activeIndex) === 1;
          return (
            <div
              key={i}
              className={`shrink-0 flex items-center gap-2 min-[360px]:gap-3 px-3 min-[360px]:px-5 py-3 rounded-full border backdrop-blur-md shadow-sm transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform
                ${isActive
                  ? "scale-[1.04] opacity-100 border-primary/50 bg-background/90 shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                  : isNear
                    ? "scale-[0.99] opacity-90 border-border bg-background/70 hover:opacity-100 hover:scale-100 hover:shadow-md hover:shadow-primary/10"
                    : "scale-[0.97] opacity-75 border-border bg-background/60 hover:opacity-100 hover:scale-100"
                }`}
              style={{ transformOrigin: "center" }}
            >
              <span
                className={`offer-icon-circle inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-[420ms] ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/40"
                    : "bg-primary/80 text-primary-foreground"
                }`}
              >
                <o.icon className="w-4 h-4" />
              </span>
              <span className="font-display tracking-wider text-foreground">{o.title}</span>
              <span className="hidden min-[360px]:inline text-sm text-muted-foreground">— {o.desc}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OffersStrip;
