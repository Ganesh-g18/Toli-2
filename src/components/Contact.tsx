import { useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

// Replace with your exact Google Maps embed URL
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.305!2d77.5855!3d14.6819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQwJzU0LjgiTiA3N8KwMzUnMDcuOCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=Toli+Motors+Anantapur+Andhra+Pradesh";

const Contact = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Anime.js scroll-linked reveal for contact cards
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const grid = gridRef.current;
    if (!grid) return;

    let raf: number;
    let cardAnim: ReturnType<typeof animate> | null = null;
    let iconAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const cards = grid.querySelectorAll<HTMLElement>(".contact-card");
      const icons = grid.querySelectorAll<HTMLElement>(".contact-icon");
      cards.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      icons.forEach((el) => { el.style.transform = ""; });

      if (cards.length) {
        cardAnim = animate(cards, {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.95, 1],
          duration: 1000,
          ease: "linear",
          delay: stagger(120, { from: "first" }),
          autoplay: false,
        });
      }
      if (icons.length) {
        iconAnim = animate(icons, {
          scale: [0, 1],
          rotate: ["-20deg", "0deg"],
          duration: 1000,
          ease: "linear",
          delay: stagger(120, { from: "first" }),
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
    <section id="contact" className="section-padding luxury-section bg-card/80">
      <div className="max-w-5xl mx-auto">
        <Reveal variant="fade" className="text-center mb-12">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">Get In Touch</p>
          <h2
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl mb-4 text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            CONTACT US
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ready to give your car the care it deserves? Reach out today.
          </p>
        </Reveal>

        <Reveal variant="fade" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10">
          <div ref={gridRef} className="contents">
            <a
              href="tel:+918074946335"
              className="contact-card cinematic-card premium-interactive flex flex-col items-center gap-3 luxury-panel rounded-xl p-5 min-[360px]:p-6 sm:p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <Phone className="contact-icon icon-luxury w-11 h-11 rounded-full bg-primary/10 p-2.5 text-primary" />
              <span className="font-display text-xl">CALL US</span>
              <span className="text-muted-foreground text-sm">+91-8074946335</span>
              <span className="text-muted-foreground text-sm">+91-9908303888</span>
            </a>

            <a
              href="mailto:tolimotorsatp@gmail.com"
              className="contact-card cinematic-card premium-interactive flex flex-col items-center gap-3 luxury-panel rounded-xl p-5 min-[360px]:p-6 sm:p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              style={{ "--motion-delay": "70ms" } as React.CSSProperties}
            >
              <Mail className="contact-icon icon-luxury w-11 h-11 rounded-full bg-primary/10 p-2.5 text-primary" />
              <span className="font-display text-xl">EMAIL US</span>
              <span className="text-muted-foreground text-sm">tolimotorsatp@gmail.com</span>
            </a>

            <div
              className="contact-card flex flex-col items-center gap-3 luxury-panel rounded-xl p-5 min-[360px]:p-6 sm:p-8"
              style={{ "--motion-delay": "140ms" } as React.CSSProperties}
            >
              <MapPin className="contact-icon icon-luxury w-11 h-11 rounded-full bg-primary/10 p-2.5 text-primary" />
              <span className="font-display text-xl">VISIT US</span>
              <span className="text-muted-foreground text-sm text-center">
                Kamalanagar, Anantapur,<br />Andhra Pradesh 515001
              </span>
            </div>
          </div>
        </Reveal>

        {/* Google Map */}
        <Reveal variant="fade-up" className="mb-6">
          <div className="cinematic-card luxury-panel rounded-2xl overflow-hidden">
            <div className="aspect-[16/9] w-full bg-muted">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Toli Motors location on Google Maps"
                className="w-full h-full"
              />
            </div>
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg tracking-wider">TOLI MOTORS</p>
                <p className="text-sm text-muted-foreground">Kamalanagar, Anantapur, Andhra Pradesh 515001</p>
              </div>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-background font-display text-sm tracking-wider hover:border-primary hover:text-primary transition-all"
              >
                <Navigation className="w-4 h-4" />
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
