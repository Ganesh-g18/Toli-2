import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Adds `motion-visible` once the element scrolls into view, then stops observing.
 * Only opacity/transform/clip-path animate, and `will-change` is released on reveal.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);
  const revealed = useRef(false);
  const { threshold = 0.12, rootMargin = "0px 0px -7% 0px", once = true } = options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if(node.closest(".phase9-experience")){node.classList.add("motion-visible");return;}

    if ((once && revealed.current) || prefersReducedMotion() || !("IntersectionObserver" in window)) {
      node.classList.add("motion-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            revealed.current = true;
            (entry.target as HTMLElement).style.willChange = "auto";
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("motion-visible");
          }
        });
      },
      { threshold, rootMargin },
    );

    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const show = () => {
      if (query.matches) { node.classList.add("motion-visible"); observer.disconnect(); }
    };
    query.addEventListener("change", show);
    observer.observe(node);
    return () => { observer.disconnect(); query.removeEventListener("change", show); };
  });

  return ref;
}
