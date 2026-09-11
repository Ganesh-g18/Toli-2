import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import EnquireDialog from "@/components/EnquireDialog";
import Reveal from "@/components/motion/Reveal";
import { Phone } from "lucide-react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const CtaBanner = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Anime.js scroll-linked reveal for CTA card
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const card = cardRef.current;
    if (!card) return;

    let raf: number;
    let tlAnim: ReturnType<typeof animate> | null = null;
    let elementsAnim: ReturnType<typeof animate> | null = null;
    let blursAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      card.style.opacity = "";
      card.style.transform = "";
      const elements = card.querySelectorAll<HTMLElement>(".cta-animate");
      elements.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });

      tlAnim = animate(card, {
        scale: [0.92, 1],
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        ease: "linear",
        autoplay: false,
      });

      if (elements.length) {
        elementsAnim = animate(elements, {
          opacity: [0, 1],
          translateY: [20, 0],
          rotateX: [-15, 0],
          duration: 1000,
          ease: "linear",
          delay: stagger(100, { from: "first" }),
          autoplay: false,
        });
      }

      const blurs = card.querySelectorAll<HTMLElement>(".cta-blur");
      if (blurs.length) {
        blursAnim = animate(blurs, {
          scale: [0.5, 1],
          opacity: [0, 0.6],
          duration: 1000,
          ease: "linear",
          delay: stagger(150),
          autoplay: false,
        });
      }
    };

    setup();

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - rect.top / (vh + rect.height);
        const progress = Math.min(Math.max(raw, 0), 1);
        if (tlAnim) try { tlAnim.seek(progress * tlAnim.duration); } catch {}
        if (elementsAnim) try { elementsAnim.seek(progress * elementsAnim.duration); } catch {}
        if (blursAnim) try { blursAnim.seek(progress * blursAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [tlAnim, elementsAnim, blursAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);

  return (
    <section className="px-4 sm:px-6 py-16 md:py-20">
      <Reveal
        variant="scale"
        className="cinematic-card luxury-cta relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden p-5 min-[360px]:p-7 sm:p-10 md:p-16"
      >
        <div ref={cardRef} className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl cta-blur" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl cta-blur" />

          <div className="relative">
            <p className="cta-animate uppercase tracking-widest text-sm opacity-90 mb-2 text-reveal">Ready when you are</p>
            <h2
              className="cta-animate font-display text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl leading-none text-reveal"
              style={{ "--motion-delay": "80ms" } as React.CSSProperties}
            >
              BOOK YOUR SERVICE TODAY
            </h2>
            <p className="cta-animate mt-3 max-w-xl opacity-90">
              Get a free 30-point inspection and a transparent quote. Doorstep pickup available across Anantapur.
            </p>
          </div>
          <div className="cta-animate flex w-full flex-col min-[360px]:flex-row flex-wrap gap-3 md:w-auto">
            <EnquireDialog>
              <Button
                size="lg"
                className="luxury-button w-full min-[360px]:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg tracking-wider"
              >
                ENQUIRE NOW
              </Button>
            </EnquireDialog>
            <a href="tel:+918074946335" className="w-full min-[360px]:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="luxury-button w-full bg-white border-primary/45 text-primary hover:bg-primary hover:text-primary-foreground font-display text-lg tracking-wider gap-2"
              >
                <Phone className="w-5 h-5" /> CALL NOW
              </Button>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CtaBanner;
