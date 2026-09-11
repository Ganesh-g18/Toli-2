import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import EnquireDialog from "@/components/EnquireDialog";
import { Phone, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.webp";
import toliLogo from "@/assets/toli-logo-combined.webp";
import { useIsMobile } from "@/hooks/use-mobile";
import { animate, createTimeline, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const Hero = () => {
  const isMobile = useIsMobile();
  const layerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Anime.js entrance animation - replays on scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let animations: ReturnType<typeof animate>[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play animations
          const turbulence = document.querySelector<SVGFEOffsetElement>("feTurbulence");
          const displacement = document.querySelector<SVGFEOffsetElement>("feDisplacementMap");
          if (turbulence && displacement) {
            animations.push(
              animate([turbulence, displacement], {
                baseFrequency: 0.04,
                scale: 12,
                alternate: true,
                loop: true,
                duration: 4000,
                ease: "inOutSine",
              })
            );
          }

          const tl = createTimeline({ defaults: { ease: "outExpo" } });

          const heroMedia = document.querySelector<HTMLElement>(".hero-media");
          if (heroMedia) {
            tl.add(heroMedia, {
              scale: [1.08, 1],
              opacity: [0, 1],
              duration: 1800,
            }, 0);
          }

          const heroLines = document.querySelectorAll<HTMLElement>(".hero-line");
          if (heroLines.length) {
            tl.add(heroLines, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 1200,
              delay: stagger(150),
            }, 300);
          }

          const cinematicCard = heroRef.current?.querySelector<HTMLElement>(".cinematic-card");
          if (cinematicCard) {
            tl.add(cinematicCard, {
              scale: [0.92, 1],
              opacity: [0, 1],
              duration: 1100,
            }, 500);
          }

          const floats = document.querySelectorAll<HTMLElement>(".hero-float");
          if (floats.length) {
            tl.add(floats, {
              scale: [0.5, 1],
              opacity: [0, 1],
              duration: 1600,
              delay: stagger(250),
            }, 200);
          }

          animations.push(tl);
        } else {
          // Pause animations when out of view
          animations.forEach((a) => {
            try { a.pause(); } catch {}
          });
          animations = [];
        }
      },
      { threshold: 0.15 }
    );

    const heroEl = heroRef.current?.closest("section");
    if (heroEl) observer.observe(heroEl);

    return () => {
      observer.disconnect();
      animations.forEach((a) => { try { a.pause(); } catch {} });
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || prefersReducedMotion()) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 6;
        const y = (event.clientY / window.innerHeight - 0.5) * 5;
        layerRef.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); if (frame) cancelAnimationFrame(frame); };
  }, [isMobile]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* SVG Turbulence Filter Animation */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="hero-turbulence">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <img src={heroBg} alt="Toli Motors automotive workshop" width={1920} height={1080} fetchPriority="high" decoding="async" className="hero-media absolute inset-0 w-full h-full object-cover" style={{ filter: "url(#hero-turbulence)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/92 to-white/58" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-white/5" />
      <div className="hero-gradient-motion absolute inset-[-5%] bg-[radial-gradient(circle_at_25%_30%,hsl(var(--primary)/0.13),transparent_35%),radial-gradient(circle_at_80%_70%,hsl(var(--primary)/0.09),transparent_32%)]" />
      <div ref={layerRef} className="absolute inset-0 transition-transform duration-1000 ease-out will-change-transform">
        <div aria-hidden className="hero-float absolute -top-20 -left-20 w-64 h-64 sm:-top-32 sm:-left-32 sm:w-[28rem] sm:h-[28rem] rounded-full bg-primary/18 blur-3xl" />
        <div aria-hidden className="hero-float absolute -bottom-24 right-0 w-72 h-72 sm:-bottom-40 sm:w-[32rem] sm:h-[32rem] rounded-full bg-white/45 blur-3xl [animation-delay:-4s]" />
      </div>

      <div data-hero-motion className="relative z-10 w-full max-w-7xl mx-auto px-4 min-[360px]:px-5 sm:px-8 lg:px-[55px] py-20 sm:py-24 lg:py-16">
        {isMobile ? (
          <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center pt-10 pb-16">
            <p className="hero-line text-primary font-medium tracking-[0.18em] uppercase text-xs mb-4" style={{ "--hero-delay": "60ms" } as React.CSSProperties}>Multi-Brand Car Workshop — Anantapur</p>
            <div className="hero-line" style={{ "--hero-delay": "150ms" } as React.CSSProperties}>
              <img src={toliLogo} alt="Toli Motors" className="brand-logo mb-5 w-full max-w-[15rem] h-auto" />
              <h1 className="font-display text-4xl min-[360px]:text-5xl leading-[0.95] text-foreground">Professional care for the car you love.</h1>
              <p className="mt-5 text-sm min-[360px]:text-base leading-relaxed text-muted-foreground max-w-md">Expert automobile services, genuine spare parts, and reliable repairs — all under one roof.</p>
            </div>
            <div className="hero-line mt-7 flex flex-col gap-3" style={{ "--hero-delay": "280ms" } as React.CSSProperties}>
              <EnquireDialog><Button size="lg" className="luxury-button group w-full h-12 font-display tracking-wider">ENQUIRE NOW<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Button></EnquireDialog>
              <a href="tel:+918074946335" className="luxury-button flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-background/65 backdrop-blur text-foreground hover:border-primary hover:text-primary"><Phone className="w-4 h-4" /><span className="font-display tracking-wider">+91-8074946335</span></a>
              <p className="text-center text-xs text-muted-foreground">Mon – Sat · 9:00 AM – 8:00 PM</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-12 items-center">
            <div className="col-span-7">
              <p className="hero-line luxury-kicker text-primary font-medium uppercase text-sm mb-4" style={{ "--hero-delay": "60ms" } as React.CSSProperties}>Multi-Brand Car Workshop — Anantapur</p>
              <div className="hero-line" style={{ "--hero-delay": "150ms" } as React.CSSProperties}><img src={toliLogo} alt="Toli Motors" className="brand-logo mb-6 max-w-md w-full h-auto" /><h1 className="luxury-heading font-display text-7xl mb-6 text-foreground">Professional care<br />for the car you love.</h1></div>
              <p className="hero-line text-muted-foreground text-lg max-w-xl mb-10" style={{ "--hero-delay": "260ms" } as React.CSSProperties}>Expert automobile services, genuine spare parts, and reliable repairs — all under one roof.</p>
            </div>
            <div className="hero-line col-span-5 flex flex-col items-stretch gap-5 pl-6" style={{ "--hero-delay": "340ms" } as React.CSSProperties}>
              <div className="cinematic-card luxury-panel luxury-glass relative rounded-2xl p-8 overflow-hidden">
                <div aria-hidden className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/18 blur-3xl" />
                <p className="relative text-xs uppercase tracking-[0.25em] text-primary font-medium mb-2">Get a quick quote</p>
                <h3 className="relative font-display text-3xl text-foreground mb-5 leading-tight">Book your service today</h3>
                <EnquireDialog><Button size="lg" className="luxury-button group relative w-full h-12 font-display text-lg tracking-wider shadow-lg shadow-primary/30">ENQUIRE NOW<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Button></EnquireDialog>
                <a href="tel:+918074946335" className="luxury-button relative mt-4 group flex items-center gap-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur p-4"><span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground"><Phone className="w-5 h-5" /></span><span className="flex flex-col text-left"><span className="text-xs uppercase tracking-widest text-muted-foreground">Call us directly</span><span className="font-display text-xl tracking-wider text-foreground">+91-8074946335</span></span></a>
                <p className="relative mt-4 text-xs text-muted-foreground text-center">Mon – Sat · 9:00 AM – 8:00 PM · Anantapur</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isMobile && <div className="hero-line absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ "--hero-delay": "620ms" } as React.CSSProperties}><div className="w-6 h-10 rounded-full border-2 border-foreground/40 flex items-start justify-center p-1.5"><span className="scroll-cue w-1 h-2 rounded-full bg-primary" /></div></div>}
    </section>
  );
};

export default Hero;
