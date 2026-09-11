import { useEffect, useState } from "react";
import { Phone, Wrench, Tag, Info, Image, ShieldCheck, Mail } from "lucide-react";
import logo from "@/assets/toli-logo-combined.png";
import { useIsMobile } from "@/hooks/use-mobile";

const links = [
  { label: "Services", href: "#services", icon: Wrench },
  { label: "Offers", href: "#offers", icon: Tag },
  { label: "About", href: "#about", icon: Info },
  { label: "Gallery", href: "#gallery", icon: Image },
  { label: "Why Us", href: "#why-us", icon: ShieldCheck },
  { label: "Contact", href: "#contact", icon: Mail },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 30);
      const current = links.map((link) => document.querySelector<HTMLElement>(link.href)).filter(Boolean)
        .reverse().find((section) => section!.getBoundingClientRect().top <= 130);
      setActive(current?.id ?? "");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${open ? "bg-white backdrop-blur-2xl border-b border-border" : scrolled ? "bg-white/92 backdrop-blur-2xl border-b border-border shadow-[0_16px_42px_-28px_hsl(220_15%_20%/0.26)]" : "bg-white/78 backdrop-blur-xl border-b border-white/70"}`}>
      <div className="max-w-7xl mx-auto px-3 min-[360px]:px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="premium-interactive flex items-center rounded-md"><img src={logo} alt="Toli Motors" className="brand-logo h-8 min-[360px]:h-9 sm:h-10 w-auto max-w-[180px] object-contain" /></a>
        {!isMobile && <><div className="flex items-center gap-7">{links.map((link) => <a key={link.label} href={link.href} className={`relative text-sm font-medium transition-colors duration-200 group ${active === link.href.slice(1) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>{link.label}<span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-[width] duration-300 ease-out ${active === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"}`} /></a>)}</div><a href="tel:+918074946335" className="luxury-button flex items-center gap-2 rounded-md px-2 py-1 text-sm text-foreground/80 hover:text-primary"><Phone className="w-4 h-4" />+91-8074946335</a></>}
        {isMobile && <div className="flex items-center gap-1"><a href="tel:+918074946335" aria-label="Call Toli Motors" className="premium-interactive p-2 rounded-md"><Phone className="w-5 h-5" /></a><button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" className="relative h-10 w-10 rounded-md premium-interactive"><span className={`absolute left-2.5 top-3 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} /><span className={`absolute left-2.5 top-5 h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} /><span className={`absolute left-2.5 top-7 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} /></button></div>}
      </div>
      <div id="mobile-navigation" className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="px-3 pt-2 pb-4 flex flex-col gap-0.5 bg-gradient-to-b from-white via-white to-secondary/30 border-t border-border/50">
            {links.map((link, index) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: `${index * 40}ms` }}
                  className={`relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ease-out group ${
                    open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  } ${
                    isActive
                      ? "bg-primary/8 text-primary"
                      : "text-foreground/80 hover:bg-secondary/80 hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary" />
                  )}
                  <link.icon className={`w-[18px] h-[18px] transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                  <span className="font-display text-[15px] tracking-wide">{link.label}</span>
                </a>
              );
            })}

            <div className={`mt-3 mx-1 transition-all duration-300 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`} style={{ transitionDelay: `${links.length * 40}ms` }}>
              <a
                href="tel:+918074946335"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm tracking-wider hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                CALL US NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
