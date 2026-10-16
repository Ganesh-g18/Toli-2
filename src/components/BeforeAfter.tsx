import JourneyTrim from "@/components/journey/JourneyTrim";
import { useSectionEntrance } from "@/hooks/use-section-entrance";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import baPlaceholder from "@/assets/ba-placeholder.svg";

const comparisons = [
  {
    title: "Workshop comparison 01",
    subtitle: "Placeholder - real photo coming soon",
    before: baPlaceholder,
    after: baPlaceholder,
  },
  {
    title: "Workshop comparison 02",
    subtitle: "Placeholder - real photo coming soon",
    before: baPlaceholder,
    after: baPlaceholder,
  },
  {
    title: "Workshop comparison 03",
    subtitle: "Placeholder - real photo coming soon",
    before: baPlaceholder,
    after: baPlaceholder,
  },
];

type SliderProps = {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  subtitle: string;
};

const ComparisonSlider = ({ beforeSrc, afterSrc, title, subtitle }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      updatePosition(e.clientX);
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch { /* Optional browser capability/storage may be unavailable; retain the usable fallback. */ }
    },
    [updatePosition]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => updatePosition(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isDragging, updatePosition]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(p - 3, 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(p + 3, 98));
    }
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden luxury-panel group">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Before and after comparison"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* After image (full width) */}
        <img
          src={afterSrc}
          alt={`${title} — After`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeSrc}
            alt={`${title} — Before`}
            className="absolute inset-0 h-full object-cover"
            style={{ width: "100vw", maxWidth: "none" }}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-card shadow-[0_0_12px_rgba(0,0,0,0.4)] z-10"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border-2 border-primary shadow-lg flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-display tracking-wider">
            BEFORE
          </span>
        </div>
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-white text-xs font-display tracking-wider">
            AFTER
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 sm:p-5">
        <h4 className="font-display text-lg tracking-wider">{title}</h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

const BeforeAfter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useSectionEntrance(sectionRef, ".ba-card", "media");
  return (
    <section className="journey-section journey-work section-padding luxury-section" data-journey-section="work">
      <JourneyTrim number="07" label="OUR WORK" motif="parts" />
      <div className="max-w-7xl mx-auto">
        <Reveal variant="fade" className="text-center mb-14">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">
            Our Work
          </p>
          <h3
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            BEFORE & AFTER
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Drag the slider to see the difference. We add real before &amp; after photos here as we
            capture them with customer permission.
          </p>
        </Reveal>

        <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((item) => (
            <div key={item.title} className="ba-card">
              <ComparisonSlider
                beforeSrc={item.before}
                afterSrc={item.after}
                title={item.title}
                subtitle={item.subtitle}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
