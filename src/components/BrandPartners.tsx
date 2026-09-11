import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";
import mahindraLogo from "@/assets/brands/mahindra-logo.png";
import kiaLogo from "@/assets/brands/kia-logo.svg";

const CDN = "https://cdn.jsdelivr.net/gh/vehiclespecs/brand-logos@main";

type Brand = { name: string; src: string };

const brands: Brand[] = [
  { name: "Maruti Suzuki", src: `${CDN}/suzuki-logo.svg` },
  { name: "Hyundai", src: `${CDN}/hyundai-logo.svg` },
  { name: "Tata", src: `${CDN}/tata-logo.png` },
  { name: "Toyota", src: `${CDN}/toyota-logo.svg` },
  { name: "Mahindra", src: mahindraLogo },
  { name: "Kia", src: kiaLogo },
  { name: "Honda", src: `${CDN}/honda-logo.png` },
  { name: "MG", src: `${CDN}/mg-logo.png` },
  { name: "Renault", src: `${CDN}/renault-logo.svg` },
  { name: "Nissan", src: `${CDN}/nissan-logo.svg` },
  { name: "Volkswagen", src: `${CDN}/volkswagen-logo.svg` },
  { name: "Skoda", src: `${CDN}/skoda-logo.svg` },
  { name: "Ford", src: `${CDN}/ford-logo.png` },
  { name: "Jeep", src: `${CDN}/jeep-logo.svg` },
  { name: "Citroen", src: `${CDN}/citroen-logo.svg` },
  { name: "Isuzu", src: `${CDN}/isuzu-logo.svg` },
  { name: "Volvo", src: `${CDN}/volvo-logo.svg` },
  { name: "Audi", src: `${CDN}/audi-logo.svg` },
  { name: "BMW", src: `${CDN}/bmw-logo.svg` },
  { name: "Mercedes-Benz", src: `${CDN}/mercedes-benz-logo.svg` },
  { name: "Lexus", src: `${CDN}/lexus-logo.png` },
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
                src={brand.src}
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
