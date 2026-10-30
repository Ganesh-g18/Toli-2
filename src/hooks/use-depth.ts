import { useEffect, useRef } from "react";
import { publishDepth } from "@/lib/depth-channel";

// One shared observer and set of window listeners for the selected depth surfaces.
type ResetDepth = (immediate?: boolean) => void;
const surfaces = new Map<HTMLElement, ResetDepth>();
let visibilityObserver: IntersectionObserver | undefined;
const settleAll = () => surfaces.forEach(reset => reset());
const clearAll = () => surfaces.forEach(reset => reset(true));
const visibilityChanged = () => { if (document.hidden) clearAll(); };

function registerSurface(node: HTMLElement, reset: ResetDepth) {
  if (surfaces.size === 0) {
    window.addEventListener("scroll", settleAll, { passive: true });
    window.addEventListener("resize", clearAll);
    window.addEventListener("blur", clearAll);
    document.addEventListener("visibilitychange", visibilityChanged);
    if ("IntersectionObserver" in window) {
      visibilityObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (!entry.isIntersecting) surfaces.get(entry.target as HTMLElement)?.(true); });
      });
    }
  }
  surfaces.set(node, reset);
  visibilityObserver?.observe(node);
  return () => {
    visibilityObserver?.unobserve(node);
    surfaces.delete(node);
    if (surfaces.size) return;
    visibilityObserver?.disconnect();
    visibilityObserver = undefined;
    window.removeEventListener("scroll", settleAll);
    window.removeEventListener("resize", clearAll);
    window.removeEventListener("blur", clearAll);
    document.removeEventListener("visibilitychange", visibilityChanged);
  };
}

/** Damped pointer depth and reflected light; frames stop as soon as motion settles. */
export function useDepth<T extends HTMLElement>(strength = 3) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Actual mouse events allow hybrid desktops; touch/pen events never start tracking.
    const query = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const limit = Math.max(0, Math.min(strength, 3));
    const current = { x: 0, y: 0, lightX: 50, lightY: 50 };
    const target = { ...current };
    let frame = 0;
    let previousTime = 0;
    let bounds: DOMRect | null = null;
    let tracking = false;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      tracking = false;
      bounds = null;
      Object.assign(current, { x: 0, y: 0, lightX: 50, lightY: 50 });
      Object.assign(target, current);
      ["--depth-x", "--depth-y", "--light-x", "--light-y"].forEach(name => node.style.removeProperty(name));
      node.classList.remove("depth-active", "depth-tracking");
      publishDepth(node, { x: 0, y: 0 });
    };
    const tick = (time: number) => {
      frame = 0;
      if (!query.matches || document.hidden) { clear(); return; }
      const dt = previousTime ? Math.min(time - previousTime, 32) : 16;
      previousTime = time;
      const damping = 1 - Math.exp(-dt / 85);
      (Object.keys(current) as (keyof typeof current)[]).forEach(key => {
        current[key] += (target[key] - current[key]) * damping;
      });
      node.style.setProperty("--depth-x", `${current.x.toFixed(3)}deg`);
      node.style.setProperty("--depth-y", `${current.y.toFixed(3)}deg`);
      node.style.setProperty("--light-x", `${current.lightX.toFixed(2)}%`);
      node.style.setProperty("--light-y", `${current.lightY.toFixed(2)}%`);
      publishDepth(node, { x: (current.lightX - 50) / 50, y: (current.lightY - 50) / 50 });
      const moving = Math.abs(current.x - target.x) > .006 || Math.abs(current.y - target.y) > .006
        || Math.abs(current.lightX - target.lightX) > .08 || Math.abs(current.lightY - target.lightY) > .08;
      if (moving) frame = requestAnimationFrame(tick);
      else {
        previousTime = 0;
        if (!tracking) clear();
        else node.classList.remove("depth-tracking");
      }
    };
    const schedule = () => {
      node.classList.add("depth-tracking");
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const reset: ResetDepth = (immediate = false) => {
      bounds = null;
      if (immediate || !query.matches) { clear(); return; }
      if (!tracking && !frame) return;
      tracking = false;
      node.classList.remove("depth-active");
      Object.assign(target, { x: 0, y: 0, lightX: 50, lightY: 50 });
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType !== "mouse" || document.hidden) return;
      bounds ??= node.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      tracking = true;
      Object.assign(target, { x: -y * limit, y: x * limit, lightX: (x + 1) * 50, lightY: (y + 1) * 50 });
      node.classList.add("depth-active");
      schedule();
    };
    const leave = () => reset();
    const preferencesChanged = () => clear();
    const unregister = registerSurface(node, reset);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    query.addEventListener("change", preferencesChanged);
    return () => {
      clear(); unregister();
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
      query.removeEventListener("change", preferencesChanged);
    };
  }, [strength]);
  return ref;
}
