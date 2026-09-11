import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import AnimatedShapes from "@/components/AnimatedShapes";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = sectionRef.current;
    if (!el) return;

    let raf: number;
    let panelAnim: ReturnType<typeof animate> | null = null;
    let kickerAnim: ReturnType<typeof animate> | null = null;
    let headingAnim: ReturnType<typeof animate> | null = null;
    let paraAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const panel = el.querySelector<HTMLElement>(".about-panel");
      const kicker = el.querySelector<HTMLElement>(".about-kicker");
      const heading = el.querySelector<HTMLElement>(".about-heading");
      const paragraphs = el.querySelectorAll<HTMLElement>(".about-paragraph");

      if (panel) { panel.style.opacity = ""; panel.style.transform = ""; }
      if (kicker) { kicker.style.opacity = ""; kicker.style.transform = ""; }
      if (heading) { heading.style.opacity = ""; heading.style.transform = ""; }
      paragraphs.forEach((p) => { p.style.opacity = ""; p.style.transform = ""; });

      if (panel) {
        panelAnim = animate(panel, {
          opacity: [0, 1],
          scale: [0.92, 1],
          translateY: [40, 0],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (kicker) {
        kickerAnim = animate(kicker, {
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (heading) {
        headingAnim = animate(heading, {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.95, 1],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (paragraphs.length) {
        paraAnim = animate(paragraphs, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 1000,
          ease: "linear",
          delay: stagger(100, { start: 200 }),
          autoplay: false,
        });
      }
    };

    setup();

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - rect.top / (vh + rect.height);
        const progress = Math.min(Math.max(raw, 0), 1);
        if (panelAnim) try { panelAnim.seek(progress * panelAnim.duration); } catch {}
        if (kickerAnim) try { kickerAnim.seek(progress * kickerAnim.duration); } catch {}
        if (headingAnim) try { headingAnim.seek(progress * headingAnim.duration); } catch {}
        if (paraAnim) try { paraAnim.seek(progress * paraAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [panelAnim, kickerAnim, headingAnim, paraAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding luxury-section bg-card/80 relative overflow-hidden">
      <AnimatedShapes />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="about-kicker luxury-kicker text-primary font-medium uppercase text-sm mb-3">Who We Are</p>
          <h2 className="about-heading luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl mb-8">
            ABOUT TOLI MOTORS
          </h2>
        </div>

        <div className="about-panel luxury-panel max-w-3xl mx-auto rounded-2xl px-5 py-8 sm:px-10 sm:py-10 text-center">
          <p className="about-paragraph text-muted-foreground text-lg leading-relaxed mb-6">
            Situated in <span className="text-foreground font-medium">Anantapur, Andhra Pradesh</span>, Toli Motors is a trusted multi-brand car workshop built on years of automotive expertise.
          </p>
          <p className="about-paragraph text-muted-foreground text-lg leading-relaxed">
            We strengthen every customer relationship through proactive service, timely delivery, and an unwavering commitment to premium quality — at prices that make sense.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
