import { createPortal } from "react-dom";
import JourneyTrim from "@/components/journey/JourneyTrim";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  .map(([, src],index) => {

    return {
      src,
      alt: `Toli Motors gallery image ${index+1}`,
    };
  });

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();

  const INITIAL_COUNT = 5;
  const visibleImages = showAll ? images : images.slice(0, INITIAL_COUNT);
  const hasMore = images.length > INITIAL_COUNT;

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

  const lightboxOpen=selectedImage!==null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const trigger=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;

    // Focus the close button when lightbox opens
    closeBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if(event.key==='Tab'){
        const controls=Array.from(document.querySelectorAll<HTMLElement>('#lightbox-dialog button'));
        const first=controls[0],last=controls.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
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
      document.body.style.overflow = previousOverflow;
      if(trigger?.isConnected)trigger.focus({preventScroll:true});
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn, true);
    };
  }, [closeLightbox, navigateImage, lightboxOpen]);

  return (
    <section id="gallery" className="journey-section journey-gallery section-padding luxury-section bg-secondary/35" data-journey-section="gallery" aria-labelledby="gallery-title">
      <JourneyTrim number="08" label="INSIDE TOLI" motif="frame" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 id="gallery-title" className="luxury-heading text-3xl min-[360px]:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            WORKSHOP <span className="text-primary">GALLERY</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Explore existing workshop and service imagery from Toli Motors.
          </p>
        </div>

        <div
          className={isMobile ? "grid grid-cols-1 gap-3" : "grid grid-cols-3 lg:grid-cols-4 gap-4"}
        >
          <div className={isMobile ? "grid grid-cols-1 gap-3" : "contents"}>
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className={`gallery-item cinematic-card premium-interactive media-frame relative overflow-hidden rounded-lg cursor-pointer group focus-visible:ring-offset-4 ${
                  !isMobile && index === 0 ? "col-span-2 row-span-2" : ""
                }`}
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
                className={`media-zoom w-full object-cover ${isMobile ? "h-52 min-[360px]:h-64" : "h-full aspect-square"}`}
                loading="lazy"
                decoding="async"
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
        </div>

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
        {selectedImage !== null && createPortal(
          <div
            id="lightbox-dialog"
            className="fixed inset-0 z-[2147483647] animate-in fade-in duration-200 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
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
          </div>, document.body
        )}
    </section>
  );
};

export default Gallery;
