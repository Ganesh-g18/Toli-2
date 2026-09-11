import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const CDN = "https://cdn.jsdelivr.net/gh/vehiclespecs/brand-logos@main";

const brands = [
  { name: "Maruti Suzuki", file: "suzuki-logo.svg" },
  { name: "Hyundai", file: "hyundai-logo.svg" },
  { name: "Tata", file: "tata-logo.png" },
  { name: "Toyota", file: "toyota-logo.svg" },
  { name: "Mahindra", file: "mahindra-logo.png" },
  { name: "Kia", file: "kia-logo.svg" },
  { name: "Honda", file: "honda-logo.png" },
  { name: "MG", file: "mg-logo.png" },
  { name: "Renault", file: "renault-logo.svg" },
  { name: "Nissan", file: "nissan-logo.svg" },
  { name: "Volkswagen", file: "volkswagen-logo.svg" },
  { name: "Skoda", file: "skoda-logo.svg" },
  { name: "Ford", file: "ford-logo.png" },
  { name: "Jeep", file: "jeep-logo.svg" },
  { name: "Citroen", file: "citroen-logo.svg" },
  { name: "Isuzu", file: "isuzu-logo.svg" },
  { name: "Volvo", file: "volvo-logo.svg" },
  { name: "Audi", file: "audi-logo.svg" },
  { name: "BMW", file: "bmw-logo.svg" },
  { name: "Mercedes-Benz", file: "mercedes-benz-logo.svg" },
  { name: "Lexus", file: "lexus-logo.png" },
];

const BrandPartners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let raf: number;
    let anim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const logos = container.querySelectorAll<HTMLElement>(".brand-logo-item");
      logos.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      if (logos.length) {
        anim = animate(logos, {
          opacity: [0, 1],
          scale: [0.6, 1],
          duration: 1000,
          ease: "linear",
          delay: stagger(40, { from: "center" }),
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
    <section ref={sectionRef} className="py-12 sm:py-16 border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal variant="fade" className="text-center mb-10">
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Trusted by owners of
          </p>
        </Reveal>

        <div
          ref={containerRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-5 items-center justify-items-center"
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="brand-logo-item flex items-center justify-center h-16 sm:h-20 w-24 sm:w-28 px-3 sm:px-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm transition-all duration-300 cursor-default overflow-hidden"
              style={{ opacity: 0 } as React.CSSProperties}
            >
              <img
                src={`${CDN}/${brand.file}`}
                alt={`${brand.name} logo`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <Reveal variant="fade" className="text-center mt-8">
          <p className="text-xs text-muted-foreground/70">
            And many more multi-brand vehicles serviced with care
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default BrandPartners;
