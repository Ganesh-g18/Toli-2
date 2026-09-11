import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const AnimatedShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let animations: ReturnType<typeof animate>[] = [];
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play polygon morphing
          const polygons = container.querySelectorAll<SVGElement>("polygon.morph-polygon");
          if (polygons.length) {
            animations.push(
              animate(polygons, {
                points: [
                  "64 10 114 35 114 85 64 110 14 85 14 35",
                  "64 5 119 30 119 90 64 115 9 90 9 30",
                  "64 15 109 40 109 80 64 105 19 80 19 40",
                  "64 10 114 35 114 85 64 110 14 85 14 35",
                ],
                duration: 5000,
                loop: true,
                alternate: true,
                ease: "inOutSine",
              })
            );
          }

          // Play hexagon color animation
          const hexagons = container.querySelectorAll<HTMLElement>(".hex-shape");
          if (hexagons.length) {
            animations.push(
              animate(hexagons, {
                background: [
                  "hsla(355, 83%, 41%, 0.08)",
                  "hsla(351, 100%, 34%, 0.12)",
                  "hsla(355, 83%, 41%, 0.05)",
                  "hsla(351, 100%, 34%, 0.08)",
                ],
                scale: [1, 1.05, 1],
                duration: 6000,
                loop: true,
                alternate: true,
                ease: "inOutSine",
              })
            );
          }
        } else {
          // Pause and reset when out of view
          animations.forEach((a) => {
            try { a.pause(); } catch {}
          });
          animations = [];

          const hexagons = container.querySelectorAll<HTMLElement>(".hex-shape");
          hexagons.forEach((el) => {
            el.style.background = "";
            el.style.transform = "";
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      animations.forEach((a) => { try { a.pause(); } catch {} });
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Animated SVG Polygon */}
      <svg
        className="absolute -top-10 -right-10 w-32 h-32 sm:w-48 sm:h-48 opacity-[0.06] text-primary"
        viewBox="0 0 128 128"
      >
        <polygon
          className="morph-polygon"
          fill="currentColor"
          points="64 10 114 35 114 85 64 110 14 85 14 35"
        />
      </svg>

      {/* Animated Hexagonal Shape */}
      <div className="hex-shape absolute top-1/4 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-[2rem] rotate-45 bg-primary/[0.06]" />
      <div className="hex-shape absolute bottom-1/4 -right-20 w-40 h-40 sm:w-56 sm:h-56 rounded-[2.5rem] rotate-12 bg-primary/[0.04]" />

      {/* Second animated polygon */}
      <svg
        className="absolute bottom-20 left-10 w-24 h-24 sm:w-36 sm:h-36 opacity-[0.05] text-primary"
        viewBox="0 0 128 128"
      >
        <polygon
          className="morph-polygon"
          fill="currentColor"
          points="64 10 114 35 114 85 64 110 14 85 14 35"
        />
      </svg>
    </div>
  );
};

export default AnimatedShapes;
