import { useEffect, useRef } from "react";
import { Wrench, Car, Battery, MessageSquare, PackageCheck, Truck, Shield, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const services = [
  { icon: Car, title: "Automobile Services", desc: "Comprehensive car servicing with expert diagnostics and reliable repairs for all brands." },
  { icon: Wrench, title: "Spare Parts & Repairs", desc: "Genuine spare parts and professional repair services tailored to your vehicle's needs." },
  { icon: Battery, title: "Battery Services", desc: "Amaron battery repair, replacement, and maintenance to keep you on the road." },
  { icon: Sparkles, title: "Premium Detailing", desc: "Showroom-grade exterior polish and deep interior detailing for a brand-new feel." },
  { icon: Shield, title: "Vehicle Inspection", desc: "Thorough 30-point inspection to keep every component performing at its best." },
  { icon: MessageSquare, title: "Consultation", desc: "Expert advice on vehicle maintenance, upgrades, and cost-effective solutions." },
  { icon: PackageCheck, title: "Installation", desc: "Professional installation of parts and accessories with precision and care." },
  { icon: Truck, title: "Doorstep Pickup", desc: "Convenient pickup and delivery service — we come to you, on time, every time." },
  { icon: Shield, title: "AMC Plans", desc: "Annual maintenance contracts customized to your vehicle's requirements and budget." },
];

const Services = () => {
  const isMobile = useIsMobile();
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
      const cards = grid.querySelectorAll<HTMLElement>(".service-card");
      const icons = grid.querySelectorAll<HTMLElement>(".service-icon");
      const total = cards.length;

      // Reset inline styles
      cards.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      icons.forEach((el) => { el.style.transform = ""; });

      if (cards.length) {
        cardAnim = animate(cards, {
          opacity: [0, 1],
          scale: [0.4, 1],
          rotateX: [25, 0],
          rotateY: [(_, i) => ((i % 2 === 0 ? -1 : 1) * 15), 0],
          translateX: [(_, i) => Math.cos((i / total) * Math.PI * 2) * 180, 0],
          translateY: [(_, i) => Math.sin((i / total) * Math.PI * 2) * 120, 0],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }

      if (icons.length) {
        iconAnim = animate(icons, {
          scale: [0, 1.3, 1],
          rotate: ["-180deg", "0deg"],
          duration: 1000,
          ease: "linear",
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
        // 0 = section bottom at viewport top, 1 = section top at viewport bottom
        const raw = 1 - rect.top / (vh + rect.height);
        const progress = Math.min(Math.max(raw, 0), 1);

        if (cardAnim) {
          try { cardAnim.seek(progress * cardAnim.duration); } catch {}
        }
        if (iconAnim) {
          try { iconAnim.seek(progress * iconAnim.duration); } catch {}
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      if (cardAnim) try { cardAnim.pause(); } catch {}
      if (iconAnim) try { iconAnim.pause(); } catch {}
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-padding luxury-section">
      <div className="max-w-7xl mx-auto">
        <Reveal variant="fade" className="text-center mb-16">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">What We Do</p>
          <h2
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            OUR SERVICES
          </h2>
        </Reveal>

        {isMobile ? (
          <Reveal variant="fade" className="flex flex-col gap-3">
            <div ref={gridRef} className="flex flex-col gap-3">
              {services.map((s, i) => (
                <article
                  key={s.title}
                  className="service-card cinematic-card flex items-start gap-4 luxury-panel rounded-xl p-4"
                  style={{ "--motion-delay": `${Math.min(i * 45, 220)}ms` } as React.CSSProperties}
                >
                  <div className="service-icon flex h-10 w-10 shrink-0 items-center justify-center icon-luxury rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl tracking-wider">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal variant="fade" className="grid grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" } as React.CSSProperties}>
            <div ref={gridRef} className="contents" style={{ transformStyle: "preserve-3d" }}>
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="service-card cinematic-card group relative overflow-hidden luxury-panel rounded-2xl p-7 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                  style={{ "--motion-delay": `${Math.min(i * 55, 220)}ms` } as React.CSSProperties}
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="service-icon inline-flex items-center justify-center w-12 h-12 icon-luxury rounded-xl bg-primary/10 text-primary mb-5 transition-all duration-200 ease-out group-hover:bg-primary/15 group-hover:scale-110 group-hover:-translate-y-0.5">
                      <s.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl tracking-wider mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                    <span className="mt-4 inline-block h-0.5 w-8 bg-primary transition-[width] duration-300 ease-out group-hover:w-12" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Services;
