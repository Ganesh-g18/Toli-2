export type SceneQuality = "desktop" | "tablet" | "fallback";
/** Unknown device signals remain eligible. Save Data lowers GPU cost, not presentation type. */
export function sceneQuality(width: number, _reduced: boolean, saveData = false, capableMobile = true): SceneQuality {
  return width < 768 && !capableMobile ? "fallback" : saveData || width < 1024 ? "tablet" : "desktop";
}
export const sceneDpr = (quality: SceneQuality, dpr: number) => Math.min(Math.max(dpr || 1, 1), quality === "desktop" ? 1.5 : 1);
export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
/** Native section passage; no pinned area or synthetic scroll. */
export function storyProgress(top: number, height: number, viewport: number) {
  return clamp01((viewport - top) / (viewport + height));
}
export function storyPose(progress: number) {
  const p = clamp01(progress);
  const entry = clamp01(p / .3);
  const exit = clamp01((p - .68) / .25);
  return { entry, separation: Math.sin(clamp01((p - .22) / .56) * Math.PI) * (1 - exit), exit };
}
/** Measure active frame intervals after warmup, then downgrade once or stop. */
export function performanceDecision(samples: number[], downgraded: boolean): "keep" | "lower" | "fallback" {
  if (samples.length < 24) return "keep";
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  return mean > 65 ? "fallback" : mean > 30 && !downgraded ? "lower" : "keep";
}
