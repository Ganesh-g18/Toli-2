export type DepthPoint = { x: number; y: number };
const globalListeners = new Set<(node: HTMLElement, point: DepthPoint) => void>();
export function subscribePageDepth(listener: (node: HTMLElement, point: DepthPoint) => void) {
  globalListeners.add(listener); return () => {globalListeners.delete(listener);};
}
const channels = new WeakMap<HTMLElement, Set<(point: DepthPoint) => void>>();
/** Shares the already-damped DOM lighting position, without another pointer listener. */
export function publishDepth(node: HTMLElement, point: DepthPoint) {
  channels.get(node)?.forEach(listener => listener(point));
  globalListeners.forEach(listener => listener(node, point));
}
export function subscribeDepth(node: HTMLElement, listener: (point: DepthPoint) => void) {
  const subscribers = channels.get(node) ?? new Set();
  channels.set(node, subscribers); subscribers.add(listener);
  return () => { subscribers.delete(listener); if (!subscribers.size) channels.delete(node); };
}
