import { motion } from "@/lib/vehicle-motion";
import { useEffect, useRef, type RefObject } from "react";

type EntranceVariant = "gentle" | "depth" | "media" | "scale" | "directional";
const entrances: Record<EntranceVariant, string> = {
  gentle: "translateY(18px)",
  depth: "perspective(1400px) translateY(18px) translateZ(-16px) rotateX(2deg)",
  media: "translateY(20px) scale(.965)",
  scale: "translateY(12px) scale(.975)",
  directional: "translateX(-22px)",
};

/** Intentional entrance vocabulary; once per item, with final readable styles underneath. */
export function useSectionEntrance(ref: RefObject<HTMLElement>, selector: string, variant: EntranceVariant = "gentle") {
  const completed = useRef(new WeakSet<Element>());
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    // Phase 9 uses camera/component transitions; factual content stays immediately readable.
    if(root.closest(".phase9-experience")){root.classList.add("section-illuminated");return;}
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(selector));
    // Parent and icon/text should not get competing entrances at the same time.
    const nodes = candidates.filter(node => !candidates.some(parent => parent !== node && parent.contains(node)));
    const animations = new Set<Animation>();
    const stop = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) root.classList.add("section-illuminated");
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        completed.current.add(entry.target);
        observer.unobserve(entry.target);
        if (query.matches || !entry.target.animate) return;
        const mobile = matchMedia("(max-width: 1023px)").matches;
        const animation = entry.target.animate([
          { opacity: .35, transform: mobile ? "translateY(10px)" : entrances[variant] },
          { opacity: 1, transform: "none" },
        ], { duration: mobile ? motion.ui + motion.micro : motion.reveal, delay: mobile ? 0 : Math.min(nodes.indexOf(entry.target as HTMLElement) * 55, 180), easing: motion.easing });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: .08 });
    if (query.matches || nodes.some(node => completed.current.has(node))) root.classList.add("section-illuminated");
    nodes.forEach(node => { if (!completed.current.has(node)) observer.observe(node); });
    query.addEventListener("change", stop);
    return () => { observer.disconnect(); stop(); query.removeEventListener("change", stop); };
  });
}
