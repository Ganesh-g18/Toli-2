import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReveal } from "@/hooks/use-reveal";
import { useSectionEntrance } from "@/hooks/use-section-entrance";

let notify: IntersectionObserverCallback;
const observe = vi.fn();
const disconnect = vi.fn();
const unobserve = vi.fn();
function environment(reduced = false) {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { notify = callback; }
    observe = observe; disconnect = disconnect; unobserve = unobserve;
  });
}
afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks(); });
describe("motion accessibility and lifecycle", () => {
  it("shows content immediately under reduced motion", () => {
    environment(true);
    const node = document.createElement("div");
    renderHook(() => { const ref = useReveal(); ref.current = node; return ref; });
    expect(node.classList.contains("motion-visible")).toBe(true);
    expect(observe).not.toHaveBeenCalled();
  });
  it("keeps revealed content visible when React updates its class", () => {
    environment();
    const node = document.createElement("div");
    const { rerender } = renderHook(() => { const ref = useReveal(); ref.current = node; return ref; });
    act(() => notify([{ isIntersecting: true, target: node } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
    node.className = "updated-layout";
    rerender();
    expect(node.classList.contains("motion-visible")).toBe(true);
  });
  it("does not animate a section when reduced motion is requested", () => {
    environment(true);
    const root = document.createElement("section");
    const item = document.createElement("article"); item.className = "card"; root.append(item);
    item.animate = vi.fn();
    const { unmount } = renderHook(() => useSectionEntrance({ current: root }, ".card", "depth"));
    act(() => notify([{ isIntersecting: true, target: item } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(item.animate).not.toHaveBeenCalled();
    expect(root.classList.contains("section-illuminated")).toBe(true);
    unmount();
  });
  it("cancels native entrances on unmount", () => {
    environment();
    const root = document.createElement("div");
    const item = document.createElement("article"); item.className = "card"; root.append(item);
    const cancel = vi.fn();
    item.animate = vi.fn(() => ({ cancel } as unknown as Animation));
    const { unmount } = renderHook(() => useSectionEntrance({ current: root }, ".card"));
    act(() => notify([{ isIntersecting: true, target: item } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(item.animate).toHaveBeenCalledOnce();
    unmount(); expect(cancel).toHaveBeenCalledOnce(); expect(disconnect).toHaveBeenCalled();
  });
});
