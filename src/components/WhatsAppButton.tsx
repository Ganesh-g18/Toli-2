import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MessageCircle } from "lucide-react";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const WhatsAppButton = () => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const btn = btnRef.current;
    const pulse = pulseRef.current;
    if (!btn) return;

    animate(btn, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 200,
      ease: "outQuad",
      delay: 100,
    });

    if (pulse) {
      animate(pulse, {
        scale: [1, 1.8],
        opacity: [0.5, 0],
        duration: 2000,
        ease: "outQuad",
        loop: true,
        delay: 500,
      });
    }
  }, []);

  return createPortal(
    <a
      ref={btnRef}
      href="https://wa.me/918074946335?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="premium-interactive fixed bg-primary hover:bg-primary/90 text-primary-foreground border border-white/35 shadow-primary/25 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 active:scale-95"
      style={{ bottom: "12px", right: "12px", zIndex: 2147483647 }}
      aria-label="Chat on WhatsApp"
    >
      <span ref={pulseRef} className="absolute inset-0 rounded-full bg-primary/30 pointer-events-none" />
      <MessageCircle className="w-7 h-7 relative z-10" />
    </a>,
    document.body
  );
};

export default WhatsAppButton;
