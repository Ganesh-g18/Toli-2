import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDepth } from "@/hooks/use-depth";

let frames: Map<number, FrameRequestCallback>;
let nextFrame: number;
let time: number;
let query: { matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> };
let preferenceChanged: () => void;
let intersectionChanged: IntersectionObserverCallback;

beforeEach(() => {
  frames = new Map(); nextFrame = 0; time = 0;
  query = { matches: true, addEventListener: vi.fn((_, callback) => { preferenceChanged = callback; }), removeEventListener: vi.fn() };
  vi.stubGlobal("matchMedia", () => query);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++nextFrame, callback); return nextFrame; });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { intersectionChanged = callback; }
    observe() {} unobserve() {} disconnect() {}
  });
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function pointer(node: HTMLElement, type = "mouse") {
  const event = new Event("pointermove");
  Object.assign(event, { pointerType: type, clientX: 500, clientY: -100 });
  act(() => node.dispatchEvent(event));
}
function tick() {
  time += 16;
  const callbacks = [...frames.values()]; frames.clear();
  act(() => callbacks.forEach(callback => callback(time)));
}
function finish() {
  for (let i = 0; frames.size && i < 150; i++) tick();
  expect(frames.size).toBe(0);
}
function surface(strength = 3) {
  const node = document.createElement("article");
  vi.spyOn(node, "getBoundingClientRect").mockReturnValue({ left: 0, top: 0, width: 200, height: 100 } as DOMRect);
  const hook = renderHook(() => { const ref = useDepth<HTMLElement>(strength); ref.current = node; return ref; });
  return { node, ...hook };
}

describe("damped depth safeguards", () => {
  it("damps, clamps, stops when settled, and returns to neutral", () => {
    const { node, unmount } = surface(20);
    pointer(node); tick();
    const first = parseFloat(node.style.getPropertyValue("--depth-y"));
    expect(first).toBeGreaterThan(0); expect(first).toBeLessThan(3);
    finish();
    expect(parseFloat(node.style.getPropertyValue("--depth-y"))).toBeLessThanOrEqual(3);
    expect(node.getBoundingClientRect).toHaveBeenCalledOnce();
    act(() => node.dispatchEvent(new Event("pointerleave")));
    finish();
    expect(node.style.getPropertyValue("--depth-y")).toBe("");
    expect(node.classList.contains("depth-active")).toBe(false);
    unmount();
  });
  it("does not track touch or a disabled desktop/reduced-motion query", () => {
    const { node, unmount } = surface();
    pointer(node, "touch"); expect(frames.size).toBe(0);
    query.matches = false;
    pointer(node); expect(frames.size).toBe(0);
    expect(node.getBoundingClientRect).not.toHaveBeenCalled();
    unmount();
  });
  it("clears immediately on preference changes and offscreen, and cleans up", () => {
    const { node, unmount } = surface();
    pointer(node); tick();
    query.matches = false;
    act(() => preferenceChanged());
    expect(frames.size).toBe(0); expect(node.style.getPropertyValue("--depth-x")).toBe("");
    query.matches = true; pointer(node); tick();
    act(() => intersectionChanged([{ target: node, isIntersecting: false } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(frames.size).toBe(0);
    pointer(node); tick(); unmount();
    expect(frames.size).toBe(0); expect(query.removeEventListener).toHaveBeenCalled();
    pointer(node); expect(frames.size).toBe(0);
  });
});
