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
      className="premium-interactive fixed bg-primary text-primary-foreground border border-white/35 rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
      style={{ bottom: "152px", right: "14px", zIndex: 2147483647 }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>,
    document.body
  );
};

export default BackToTop;
