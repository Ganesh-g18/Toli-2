import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import GalleryImage from './GalleryImage';
import { X } from "lucide-react";
import { galleryImages as images, galleryCounter } from '@/lib/gallery-images';
import './gallery-editorial.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [viewed,setViewed]=useState(0);
  const gallery=useRef<HTMLElement>(null);
  const [near,setNear]=useState(false);
  useEffect(()=>{
   if(typeof IntersectionObserver==='undefined'){setNear(true);return;}
   const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setNear(true);observer.disconnect();}},{rootMargin:'600px'});
   const node=gallery.current,main=node?.closest('.phase9-experience');
   // Suspense initially reserves a short stack placeholder. Measuring Gallery then can
   // falsely place it near Hero and start every photo before the real stack mounts.
   const ready=()=>!main||!!main.querySelector('[data-section-stack]');
   let registration:MutationObserver|undefined;
   if(node){if(ready())observer.observe(node);else{registration=new MutationObserver(()=>{if(ready()){registration?.disconnect();observer.observe(node);}});registration.observe(main!,{childList:true,subtree:true});}}
   return()=>{registration?.disconnect();observer.disconnect();};
  },[]);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);
  const openLightbox = useCallback((index: number) => {setViewed(index);setSelectedImage(index);}, []);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      setSelectedImage((prev) => {
        if (prev === null) return null;
        const next=direction==='prev'?(prev>0?prev-1:images.length-1):(prev<images.length-1?prev+1:0);
        return next;
      });
    },
    []
  );

  useEffect(()=>{if(selectedImage!==null)setViewed(selectedImage);},[selectedImage]);
  const lightboxOpen=selectedImage!==null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const trigger=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    const previousGutter=document.documentElement.style.scrollbarGutter;
    document.documentElement.style.scrollbarGutter='stable';

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
      document.documentElement.style.scrollbarGutter=previousGutter;
      if(trigger?.isConnected)trigger.focus({preventScroll:true});
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn, true);
    };
  }, [closeLightbox, navigateImage, lightboxOpen]);

  return (
    <section ref={gallery} id="gallery" className="journey-section journey-gallery editorial-gallery" data-journey-section="gallery" aria-labelledby="gallery-title">
      <header className="editorial-heading"><div><p>WORK FROM THE WORKSHOP</p><h2 id="gallery-title">WORKSHOP <span>GALLERY</span></h2></div><span className="editorial-counter" aria-label={`Last opened photo ${viewed+1} of ${images.length}`}>{galleryCounter(viewed,images.length)}</span></header>
      <div className="editorial-groups" aria-label="Workshop photographs">
       {[0,1,2,3].map(group=><div className={`editorial-group editorial-group-${group+1}`} key={group}>
        {images.slice(group*4,group*4+4).map((image,slot)=>{
         const index=group*4+slot;
         return <figure className={`editorial-figure editorial-slot-${slot+1}`} key={image.src}>
          <button type="button" className="editorial-photo" aria-label={`View ${image.alt}`} onClick={()=>openLightbox(index)}>
           <GalleryImage key={image.src} src={near?image.src:undefined} srcSet={near?image.srcSet:undefined} sizes={image.sizes} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async"/>
           <span className="editorial-photo-number" aria-hidden="true">{String(index+1).padStart(2,'0')} ↗</span>
          </button>
          <figcaption>{image.caption}</figcaption>
         </figure>;
        })}
       </div>)}
      </div>

      {/* Lightbox */}
        {selectedImage !== null && createPortal(
          <div
            id="lightbox-dialog"
            className="fixed inset-0 z-[110] animate-in fade-in duration-200 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
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
            <GalleryImage key={images[selectedImage].src}
              width={images[selectedImage].width} height={images[selectedImage].height}
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
              {galleryCounter(selectedImage,images.length)}
            </div>
          </div>, document.body
        )}
    </section>
  );
};

export default Gallery;
