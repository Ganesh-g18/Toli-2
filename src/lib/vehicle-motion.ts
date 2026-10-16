/** Software feedback is immediate; camera and light changes carry more weight. */
export const motion = { micro: 140, ui: 220, reveal: 520, camera: 360, component: 200, easing: 'cubic-bezier(.22,.9,.28,1)' };
export const dampBlend = (elapsed: number, duration: number) => 1 - Math.exp(-Math.min(Math.max(elapsed, 0), 40) / duration);
/** A manual workflow preview expires on meaningful native scrolling in either direction. */
export const retainStep = (chosenAt: number, current: number) => Math.abs(current - chosenAt) < 64;
