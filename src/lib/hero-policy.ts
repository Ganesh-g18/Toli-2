import { clamp01 } from './vehicle-policy';
/** Finite reveal on active frames; no timeline progresses while hidden/offscreen. */
export function heroReveal(elapsed:number, reducedQuality=false) {
 const p=clamp01(elapsed/(reducedQuality?900:1900));
 const body=Math.max(0,(p-.16)/.84);
 const ease=body*body*(3-2*body);
 return {progress:p,light:.24+.76*ease,dolly:.65*(1-ease),turn:.13*(ease-1),headlights:clamp01((p-.1)/.32),settled:p===1};
}
