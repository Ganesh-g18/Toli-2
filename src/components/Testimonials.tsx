import { useEffect, useRef } from "react";
import { Star, ExternalLink } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

// Google Reviews URL — uses search to find the business. Replace with your direct Place ID URL for better accuracy.
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4";

const testimonials = [
  { name: "Ravi Kumar", location: "Anantapur", text: "Fantastic service! My car runs smoother than ever. Honest pricing and timely delivery.", rating: 5, time: "2 months ago" },
  { name: "Priya Sharma", location: "Hindupur", text: "Toli Motors handled my Hyundai's denting & painting beautifully. Looks brand new.", rating: 5, time: "1 month ago" },
  { name: "Mohan Reddy", location: "Tadipatri", text: "Trusted them with my Innova for 3 years. Genuine parts, expert technicians.", rating: 5, time: "3 weeks ago" },
  { name: "Sunita Iyer", location: "Kadiri", text: "Doorstep pickup made everything effortless. Highly recommended workshop.", rating: 5, time: "1 week ago" },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Testimonials = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Anime.js scroll-linked reveal for testimonial cards
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const grid = gridRef.current;
    if (!grid) return;

    let raf: number;
    let cardAnim: ReturnType<typeof animate> | null = null;
    let starAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const cards = grid.querySelectorAll<HTMLElement>(".testimonial-card");
      const stars = grid.querySelectorAll<HTMLElement>(".star-pop");
      cards.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      stars.forEach((el) => { el.style.transform = ""; });

      if (cards.length) {
        cardAnim = animate(cards, {
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.95, 1],
          duration: 1000,
          ease: "linear",
          delay: stagger(100, { from: "first" }),
          autoplay: false,
        });
      }
      if (stars.length) {
        starAnim = animate(stars, {
          scale: [0, 1.3, 1],
          rotate: ["-30deg", "10deg", "0deg"],
          duration: 1000,
          ease: "linear",
          delay: stagger(60, { from: "first" }),
          autoplay: false,
        });
      }
    };

    setup();

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = grid.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - rect.top / (vh + rect.height);
        const progress = Math.min(Math.max(raw, 0), 1);
        if (cardAnim) try { cardAnim.seek(progress * cardAnim.duration); } catch {}
        if (starAnim) try { starAnim.seek(progress * starAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [cardAnim, starAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);

  return (
    <section className="section-padding luxury-section bg-card/80">
      <div className="max-w-7xl mx-auto">
        <Reveal variant="fade" className="text-center mb-14">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">Testimonials</p>
          <h2
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Verified reviews from our Google Business Profile
          </p>

          <div className="mt-8">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-button group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-border bg-background/80 backdrop-blur font-display text-sm tracking-wider text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <GoogleIcon />
              WRITE A REVIEW
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </Reveal>

        <Reveal variant="fade" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div ref={gridRef} className="contents">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="testimonial-card cinematic-card relative rounded-2xl p-5 min-[360px]:p-6 luxury-panel bg-background/75 backdrop-blur"
                style={{ "--motion-delay": `${Math.min(i * 55, 220)}ms` } as React.CSSProperties}
              >
                <div className="flex items-center gap-1 mb-1 text-primary">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="star-pop w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed my-4">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display text-sm tracking-wider">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location} &middot; {t.time}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-20">
                  <GoogleIcon />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
