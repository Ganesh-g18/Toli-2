import JourneyTrim from "@/components/journey/JourneyTrim";
import { useSectionEntrance } from "@/hooks/use-section-entrance";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";

const stats: (
  | { value: number; suffix: string; label: string }
  | { text: string; label: string }
)[] = [
  { value: 75, suffix: "-Point", label: "Inspection" },
  { value: 21, suffix: "+", label: "Car Brands Serviced" },
  { text: "DOORSTEP", label: "Pickup & Drop" },
  { text: "GENUINE", label: "Spare Parts" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const finish = () => { cancelAnimationFrame(frame); setN(to); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (query.matches) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1000, 1);
        setN(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);
    query.addEventListener("change", finish);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); query.removeEventListener("change", finish); };
  }, [to]);

  return <span ref={ref} aria-label={`${to}${suffix}`}><span aria-hidden="true">{n.toLocaleString()}{suffix}</span></span>;
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionEntrance(sectionRef, ".stat-item", "scale");

  return (
    <section ref={sectionRef} className="journey-section journey-trust section-padding relative overflow-hidden border-y border-border bg-[radial-gradient(circle_at_85%_20%,hsl(var(--performance-red)/0.07),transparent_28rem),linear-gradient(135deg,hsl(var(--premium-white)),hsl(var(--luxury-gray)),hsl(var(--premium-white)))] text-foreground" data-journey-section="trust">
      <JourneyTrim number="06" label="CARE IN NUMBERS" motif="ring" />
      <Reveal
        variant="fade"
        className="max-w-7xl mx-auto grid grid-cols-1 min-[320px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-item"
            style={{ "--motion-delay": `${Math.min(i * 55, 220)}ms` } as React.CSSProperties}
          >
            <div className="font-display text-4xl min-[360px]:text-5xl sm:text-6xl tracking-wider drop-shadow-[0_10px_28px_rgba(0,0,0,0.24)]">
              {"text" in s ? (
                <span>{s.text}</span>
              ) : (
                <Counter to={s.value} suffix={s.suffix} />
              )}
            </div>
            <p className="mt-2 text-sm uppercase tracking-widest opacity-90">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default Stats;
