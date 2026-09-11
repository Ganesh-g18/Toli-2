import { useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/toli-logo-combined.png";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Offers", href: "#offers" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

// Replace these with your actual social media URLs
const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/tolimotors", label: "Follow us on Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/tolimotors", label: "Follow us on Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@tolimotors", label: "Subscribe on YouTube" },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  // Anime.js scroll-linked reveal for footer content
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const footer = footerRef.current;
    if (!footer) return;

    let raf: number;
    let sectionAnim: ReturnType<typeof animate> | null = null;
    let socialAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const sections = footer.querySelectorAll<HTMLElement>(".footer-section");
      const socialIcons = footer.querySelectorAll<HTMLElement>(".social-icon");
      sections.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      socialIcons.forEach((el) => { el.style.transform = ""; });

      if (sections.length) {
        sectionAnim = animate(sections, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000,
          ease: "linear",
          delay: stagger(100, { from: "first" }),
          autoplay: false,
        });
      }
      if (socialIcons.length) {
        socialAnim = animate(socialIcons, {
          scale: [0, 1],
          rotate: ["-180deg", "0deg"],
          duration: 1000,
          ease: "linear",
          delay: stagger(80, { from: "first" }),
          autoplay: false,
        });
      }
    };

    setup();

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = footer.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - rect.top / (vh + rect.height);
        const progress = Math.min(Math.max(raw, 0), 1);
        if (sectionAnim) try { sectionAnim.seek(progress * sectionAnim.duration); } catch {}
        if (socialAnim) try { socialAnim.seek(progress * socialAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [sectionAnim, socialAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);
  return (
    <footer ref={footerRef} className="bg-secondary/70 border-t border-border">
      <Reveal as="div" variant="fade-up" stagger={55} className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="footer-section md:col-span-1">
          <img src={logo} alt="Toli Motors" className="brand-logo h-12 w-auto mb-4 object-contain" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            A trusted multi-brand car workshop in Anantapur — premium care, genuine parts, fair pricing.
          </p>
          <div className="flex gap-3 mt-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-icon w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="font-display text-lg tracking-wider mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-0.5 inline-block">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="font-display text-lg tracking-wider mb-4">CONTACT</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>
                <a href="tel:+918074946335" className="hover:text-primary block">+91-8074946335</a>
                <a href="tel:+919908303888" className="hover:text-primary block">+91-9908303888</a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <a href="mailto:tolimotorsatp@gmail.com" className="hover:text-primary break-all">tolimotorsatp@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>6-2-806, Ram Nagar, Kovur Nagar,<br />Anantapur, Andhra Pradesh 515004</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="font-display text-lg tracking-wider mb-4">NEWSLETTER</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get service tips and seasonal offers in your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex rounded-md overflow-hidden border border-border focus-within:border-primary transition-colors"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-background px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 text-sm font-display tracking-wider hover:bg-primary/90 transition-colors"
            >
              JOIN
            </button>
          </form>
        </div>
      </Reveal>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="font-display text-xl text-foreground tracking-wider">TOLI MOTORS</span>
          <p>&copy; {new Date().getFullYear()} Toli Motors (Multi-brand Car Workshop). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
