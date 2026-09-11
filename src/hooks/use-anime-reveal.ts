import { useEffect, useRef } from "react";
import { animate, stagger, type AnimationParams } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

type AnimeRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  animation?: AnimationParams;
  staggerChildren?: number;
};

/**
 * Hook that triggers anime.js animations when an element scrolls into view.
 */
export function useAnimeReveal<T extends HTMLElement = HTMLDivElement>(
  options?: AnimeRevealOptions
) {
  const ref = useRef<T>(null);
  const { threshold = 0.12, rootMargin = "0px 0px -7% 0px", animation, staggerChildren } = options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = node.querySelectorAll<HTMLElement>("[data-anime-child]");
            const hasChildren = targets.length > 0 && staggerChildren;

            if (hasChildren) {
              animate(targets, {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 600,
                ease: "outExpo",
                delay: stagger(staggerChildren ?? 80),
                ...animation,
              });
            } else {
              animate(node, {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 700,
                ease: "outExpo",
                ...animation,
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animation, staggerChildren, threshold, rootMargin]);

  return ref;
}
