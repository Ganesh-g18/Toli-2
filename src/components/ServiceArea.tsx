import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const areas = [
  { name: "Anantapur", primary: true },
  { name: "Hindupur", primary: false },
  { name: "Tadipatri", primary: false },
  { name: "Kadiri", primary: false },
  { name: "Rayadurg", primary: false },
  { name: "Kalyandurg", primary: false },
  { name: "Penukonda", primary: false },
  { name: "Madakasira", primary: false },
  { name: "Gooty", primary: false },
  { name: "Guntakal", primary: false },
  { name: "Bellary", primary: false },
  { name: "Dharmavaram", primary: false },
];

const ServiceArea = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    let raf: number;
    let pinAnim: ReturnType<typeof animate> | null = null;
    let pulseAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const pins = section.querySelectorAll<HTMLElement>(".area-pin");
      const primaryPulse = section.querySelectorAll<HTMLElement>(".primary-pulse");
      pins.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });

      if (pins.length) {
        pinAnim = animate(pins, {
          opacity: [0, 1],
          translateY: [-20, 0],
          scale: [0, 1],
          duration: 1000,
          ease: "linear",
          delay: stagger(60, { from: "first" }),
          autoplay: false,
        });
      }
      if (primaryPulse.length) {
        pulseAnim = animate(primaryPulse, {
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
          duration: 2000,
          ease: "inOutSine",
          loop: true,
          delay: stagger(400, { from: "first" }),
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
        if (pinAnim) try { pinAnim.seek(progress * pinAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [pinAnim, pulseAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);

  return (
    <section className="section-padding luxury-section">
      <div className="max-w-6xl mx-auto">
        <Reveal variant="fade" className="text-center mb-14">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">
            Coverage
          </p>
          <h2
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            WE COME TO YOU
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Doorstep pickup and drop across Anantapur district and surrounding areas.
          </p>
        </Reveal>

        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Map visual */}
          <div className="relative bg-secondary/30 rounded-2xl border border-border p-6 sm:p-8 overflow-hidden">
            {/* Simplified map grid */}
            <div className="absolute inset-0 opacity-[0.04]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 aspect-square max-w-[400px] mx-auto">
              {/* Main hub marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="primary-pulse absolute inset-0 w-16 h-16 -m-2 rounded-full bg-primary/20" style={{ transform: "scale(1)" } as React.CSSProperties} />
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-display text-xs tracking-widest text-primary whitespace-nowrap">
                  ANANTAPUR
                </span>
              </div>

              {/* Surrounding area pins — positioned around the hub */}
              {areas.filter((a) => !a.primary).map((area, i) => {
                const angle = (i / (areas.length - 1)) * Math.PI * 2 - Math.PI / 2;
                const radius = 35 + (i % 3) * 8; // percent
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;

                return (
                  <div
                    key={area.name}
                    className="area-pin absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      opacity: 0,
                    } as React.CSSProperties}
                  >
                    <div className="flex items-center gap-1.5 group">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/60 border-2 border-primary/30 group-hover:bg-primary group-hover:border-primary transition-colors" />
                      <span className="text-[11px] font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                        {area.name}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Decorative rings */}
              <div className="absolute inset-0 border border-border/40 rounded-full" />
              <div className="absolute inset-[15%] border border-border/30 rounded-full" />
              <div className="absolute inset-[30%] border border-border/20 rounded-full" />
            </div>
          </div>

          {/* Area list */}
          <div>
            <Reveal variant="fade">
              <h3 className="font-display text-2xl sm:text-3xl tracking-wider mb-2 text-reveal">
                SERVICE AREAS
              </h3>
              <p className="text-muted-foreground mb-8 text-reveal" style={{ "--motion-delay": "60ms" } as React.CSSProperties}>
                We cover Anantapur and surrounding towns within 100km radius.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {areas.map((area) => (
                <div
                  key={area.name}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border/60 bg-background/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${area.primary ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium ${area.primary ? "text-primary" : ""}`}>
                    {area.name}
                  </span>
                </div>
              ))}
            </div>

            <Reveal variant="fade" className="mt-8">
              <p className="text-sm text-muted-foreground/70 text-reveal">
                Don't see your area?{" "}
                <a href="tel:+918074946335" className="text-primary hover:underline font-medium">
                  Call us
                </a>{" "}
                — we often accommodate requests outside our standard coverage.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
