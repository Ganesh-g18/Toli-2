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
  const { threshold = 0.12, rootMargin = "0px 0px -7% 0px", once = true } = options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.classList.add("motion-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            (entry.target as HTMLElement).style.willChange = "auto";
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("motion-visible");
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return ref;
}
