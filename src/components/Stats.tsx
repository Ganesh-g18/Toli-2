import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const stats = [
  { value: 12000, suffix: "+", label: "Happy Customers" },
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Brands Serviced" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (prefersReducedMotion()) {
          setN(to);
          return;
        }
        const obj = { value: 0 };
        animRef.current = animate(obj, {
          value: to,
          duration: 2200,
          ease: "outExpo",
          onUpdate: () => setN(Math.floor(obj.value)),
        });
      } else {
        if (animRef.current) {
          try { animRef.current.pause(); } catch {}
          animRef.current = null;
        }
        setN(0);
      }
    }, { rootMargin: "0px 0px -50px 0px" });

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (animRef.current) try { animRef.current.pause(); } catch {}
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    let raf: number;
    let anim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const items = section.querySelectorAll<HTMLElement>(".stat-item");
      items.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      if (items.length) {
        anim = animate(items, {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.95, 1],
          duration: 1000,
          ease: "linear",
          delay: stagger(100, { from: "first" }),
          autoplay: false,
        });
      }
    };

    setup();

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - rect.top / (vh + rect.height);
        const progress = Math.min(Math.max(raw, 0), 1);
        if (anim) try { anim.seek(progress * anim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      if (anim) try { anim.pause(); } catch {}
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden border-y border-border bg-[radial-gradient(circle_at_85%_20%,hsl(var(--performance-red)/0.07),transparent_28rem),linear-gradient(135deg,hsl(var(--premium-white)),hsl(var(--luxury-gray)),hsl(var(--premium-white)))] text-foreground">
      <Reveal
        variant="fade"
        className="max-w-7xl mx-auto grid grid-cols-1 min-[320px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="stat-item"
            style={{ "--motion-delay": `${Math.min(i * 55, 220)}ms` } as React.CSSProperties}
          >
            <div className="font-display text-4xl min-[360px]:text-5xl sm:text-6xl tracking-wider drop-shadow-[0_10px_28px_rgba(0,0,0,0.24)]">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm uppercase tracking-widest opacity-90">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default Stats;
