import { useEffect, useRef } from "react";
import { Users, Award, IndianRupee, ShieldCheck } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const reasons = [
  { icon: Users, title: "Exceptional Staff", desc: "Trained technicians with deep multi-brand expertise." },
  { icon: Award, title: "Premium Quality", desc: "Genuine parts and meticulous workmanship on every job." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Transparent, competitive rates with no hidden costs." },
  { icon: ShieldCheck, title: "High Standards", desc: "Industry-grade processes and quality control." },
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    let raf: number;
    let cardAnim: ReturnType<typeof animate> | null = null;
    let iconAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const cards = grid.querySelectorAll<HTMLElement>(".reason-card");
      const icons = grid.querySelectorAll<HTMLElement>(".reason-icon");
      cards.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      icons.forEach((el) => { el.style.transform = ""; });

      if (cards.length) {
        cardAnim = animate(cards, {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.95, 1],
          duration: 1000,
          ease: "linear",
          delay: stagger(100, { from: "center" }),
          autoplay: false,
        });
      }
      if (icons.length) {
        iconAnim = animate(icons, {
          scale: [0, 1],
          rotate: ["-20deg", "0deg"],
          duration: 1000,
          ease: "linear",
          delay: stagger(100, { from: "center" }),
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
        if (cardAnim) try { cardAnim.seek(progress * cardAnim.duration); } catch {}
        if (iconAnim) try { iconAnim.seek(progress * iconAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [cardAnim, iconAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="section-padding luxury-section">
      <div className="max-w-7xl mx-auto">
        <Reveal variant="fade" className="text-center mb-16">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">The Difference</p>
          <h2
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            WHY CHOOSE US
          </h2>
        </Reveal>

        <Reveal variant="fade" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div ref={gridRef} className="contents">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="reason-card cinematic-card luxury-panel rounded-2xl p-6 text-center"
                style={{ "--motion-delay": `${Math.min(i * 55, 220)}ms` } as React.CSSProperties}
              >
                <div className="reason-icon icon-luxury inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5 transition-transform duration-200 ease-out hover:scale-[1.03]">
                  <r.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyUs;
