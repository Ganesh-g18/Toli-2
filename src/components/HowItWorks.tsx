import { useEffect, useRef } from "react";
import { CalendarCheck, Car, Wrench, CircleCheckBig } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const steps = [
  {
    icon: CalendarCheck,
    number: "01",
    title: "Book a Service",
    description: "Call us, WhatsApp, or fill the enquiry form. Pick a date that works for you.",
  },
  {
    icon: Car,
    number: "02",
    title: "We Pick Up",
    description: "Our team arrives at your doorstep, picks up the car, and takes it to our workshop.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Expert Service",
    description: "Your car gets certified care with genuine parts. We handle everything.",
  },
  {
    icon: CircleCheckBig,
    number: "04",
    title: "Delivered Ready",
    description: "We deliver your car back — clean, serviced, and road-ready. You pay only when satisfied.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    let raf: number;
    let lineAnim: ReturnType<typeof animate> | null = null;
    let cardAnim: ReturnType<typeof animate> | null = null;
    let numberAnim: ReturnType<typeof animate> | null = null;
    let iconAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const line = timeline.querySelector<HTMLElement>(".timeline-line-fill");
      if (line) line.style.height = "";
      const cards = section.querySelectorAll<HTMLElement>(".step-card");
      const numbers = section.querySelectorAll<HTMLElement>(".step-number");
      const icons = section.querySelectorAll<HTMLElement>(".step-icon");

      cards.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      numbers.forEach((el) => { el.style.transform = ""; });
      icons.forEach((el) => { el.style.transform = ""; });

      if (line) {
        lineAnim = animate(line, {
          height: ["0%", "100%"],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (cards.length) {
        cardAnim = animate(cards, {
          opacity: [0, 1],
          translateX: [-30, 0],
          duration: 1000,
          ease: "linear",
          delay: stagger(150, { from: "first" }),
          autoplay: false,
        });
      }
      if (numbers.length) {
        numberAnim = animate(numbers, {
          scale: [0, 1],
          rotate: ["-90deg", "0deg"],
          duration: 1000,
          ease: "linear",
          delay: stagger(150, { from: "first" }),
          autoplay: false,
        });
      }
      if (icons.length) {
        iconAnim = animate(icons, {
          scale: [0, 1.2, 1],
          duration: 1000,
          ease: "linear",
          delay: stagger(150, { from: "first" }),
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

        if (lineAnim) try { lineAnim.seek(progress * lineAnim.duration); } catch {}
        if (cardAnim) try { cardAnim.seek(progress * cardAnim.duration); } catch {}
        if (numberAnim) try { numberAnim.seek(progress * numberAnim.duration); } catch {}
        if (iconAnim) try { iconAnim.seek(progress * iconAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [lineAnim, cardAnim, numberAnim, iconAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);

  return (
    <section className="section-padding luxury-section">
      <div className="max-w-6xl mx-auto">
        <Reveal variant="fade" className="text-center mb-16">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">
            Simple Process
          </p>
          <h2
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            HOW IT WORKS
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Getting your car serviced has never been this easy. Four simple steps.
          </p>
        </Reveal>

        <div ref={sectionRef} className="relative">
          {/* Desktop: horizontal timeline */}
          <div ref={timelineRef} className="hidden lg:block relative">
            {/* Connecting line */}
            <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-border">
              <div className="timeline-line-fill absolute inset-0 bg-gradient-to-r from-primary/60 via-primary to-primary/60 origin-left" style={{ height: "0%" }} />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className="step-number relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-xl font-display font-bold text-primary">
                    {step.number}
                  </div>
                  <div className="step-card">
                    <div className="step-icon mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg tracking-wider mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div ref={timelineRef} className="lg:hidden relative pl-12">
            {/* Connecting line */}
            <div className="absolute top-0 bottom-0 left-[22px] w-[2px] bg-border">
              <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-primary/60 via-primary to-primary/60 origin-top" style={{ height: "0%" }} />
            </div>

            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="step-number absolute -left-12 top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-background text-base font-display font-bold text-primary z-10">
                    {step.number}
                  </div>
                  <div className="step-card">
                    <div className="step-icon mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl tracking-wider mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
