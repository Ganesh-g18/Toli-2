import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let frameId: number | null = null;

    const updateVisibility = () => {
      frameId = null;
      const nextShow = window.scrollY > 400;
      setShow((current) => (current === nextShow ? current : nextShow));
    };

    const onScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!show) return null;

  return createPortal(
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      /* Top of the floating column: 44px on phones, 48px from md up, always
         10px clear of the button below it. */
      className="premium-interactive fixed right-3 bottom-[118px] md:bottom-[144px] z-[2147483647] bg-primary text-primary-foreground border border-white/35 rounded-full w-11 h-11 md:w-12 md:h-12 flex items-center justify-center shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
    >
      <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
    </button>,
    document.body
  );
};

export default BackToTop;
