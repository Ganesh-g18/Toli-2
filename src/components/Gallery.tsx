import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Reveal from "@/components/motion/Reveal";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const galleryModules = import.meta.glob<string>("/src/assets/gallery/*.{jpg,jpeg,png,webp,avif,gif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const images = Object.entries(galleryModules)
  .sort(([firstPath], [secondPath]) =>
    firstPath.localeCompare(secondPath, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  )
  .filter(([path]) => path.endsWith('.webp'))
  .map(([path, src]) => {
    const filename = path.split("/").pop() ?? "Workshop image";
    const readableName = filename
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return {
      src,
      alt: `${readableName} at Toli Motors`,
    };
  });

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();
  const gridRef = useRef<HTMLDivElement>(null);

  const INITIAL_COUNT = 5;
  const visibleImages = showAll ? images : images.slice(0, INITIAL_COUNT);
  const hasMore = images.length > INITIAL_COUNT;

  // Anime.js scroll-linked reveal for gallery items
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const grid = gridRef.current;
    if (!grid) return;

    let raf: number;
    let anim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const items = grid.querySelectorAll<HTMLElement>(".gallery-item");
      items.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      if (items.length) {
        anim = animate(items, {
          opacity: [0, 1],
          scale: [0.9, 1],
          translateY: [20, 0],
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
        if (anim) try { anim.seek(progress * anim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      if (anim) try { anim.pause(); } catch {}
    };
  }, []);

  // Animate newly revealed items when "See More" is clicked
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!showAll) return;

    const grid = gridRef.current;
    if (!grid) return;

    requestAnimationFrame(() => {
      const items = grid.querySelectorAll<HTMLElement>(".gallery-item");
      const newItems = Array.from(items).slice(INITIAL_COUNT);
      if (newItems.length) {
        animate(newItems, {
          opacity: [0, 1],
          scale: [0.85, 1],
          translateY: [30, 0],
          duration: 700,
          ease: "outExpo",
          delay: stagger(70, { from: "first" }),
        });
      }
    });
  }, [showAll]);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);
  const openLightbox = useCallback((index: number) => setSelectedImage(index), []);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      setSelectedImage((prev) => {
        if (prev === null) return null;
        if (direction === "prev") return prev > 0 ? prev - 1 : images.length - 1;
        return prev < images.length - 1 ? prev + 1 : 0;
      });
    },
    []
  );

  useEffect(() => {
    if (selectedImage === null) return;

    // Focus the close button when lightbox opens
    closeBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateImage("prev");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateImage("next");
      }
    };

    // Trap focus within lightbox
    const onFocusIn = (event: FocusEvent) => {
      const lightbox = document.getElementById("lightbox-dialog");
      if (lightbox && !lightbox.contains(event.target as Node)) {
        event.stopPropagation();
        closeBtnRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn, true);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn, true);
    };
  }, [closeLightbox, navigateImage, selectedImage]);

  return (
    <section id="gallery" className="section-padding luxury-section bg-secondary/35">
      <div className="max-w-7xl mx-auto">
        <Reveal variant="fade" className="text-center mb-14">
          <h2 className="luxury-heading text-3xl min-[360px]:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-reveal">
            OUR <span className="text-primary">WORKSHOP</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Take a look inside our state-of-the-art facility in Anantapur
          </p>
        </Reveal>

        <Reveal
          variant="fade"
          className={isMobile ? "grid grid-cols-1 gap-3" : "grid grid-cols-3 lg:grid-cols-4 gap-4"}
        >
          <div ref={gridRef} className={isMobile ? "grid grid-cols-1 gap-3" : "contents"}>
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className={`gallery-item cinematic-card premium-interactive media-frame relative overflow-hidden rounded-lg cursor-pointer group focus-visible:ring-offset-4 ${
                  !isMobile && index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              style={{ "--motion-delay": `${Math.min(index * 45, 200)}ms` } as React.CSSProperties}
              onClick={() => openLightbox(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`image-reveal media-zoom w-full object-cover ${isMobile ? "h-52 min-[360px]:h-64" : "h-full aspect-square"}`}
                loading="lazy"
                decoding="async"
                onLoad={(event) => event.currentTarget.classList.add("is-loaded")}
                sizes={isMobile ? "100vw" : "(min-width: 1024px) 25vw, 33vw"}
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/35 transition-colors duration-200 flex items-center justify-center">
                <span className="text-foreground opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out font-display text-lg tracking-wider">
                  {isMobile ? "TAP TO VIEW" : "VIEW"}
                </span>
              </div>
              </div>
            ))}
          </div>
        </Reveal>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="luxury-button group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border bg-background/80 backdrop-blur font-display text-sm tracking-wider text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              {showAll ? "SEE LESS" : "SEE MORE"}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
        {selectedImage !== null && (
          <div
            id="lightbox-dialog"
            className="fixed inset-0 z-50 animate-in fade-in duration-200 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Workshop image preview"
          >
            {/* Previous button */}
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Close button */}
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close image preview"
              onClick={closeLightbox}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[85vh] animate-in zoom-in-95 fade-in duration-300 object-contain rounded-lg select-none"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Next button */}
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-border text-sm font-display tracking-wider">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        )}
    </section>
  );
};

export default Gallery;
