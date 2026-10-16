import { clamp01 } from './vehicle-policy';
export type JourneyChapter = 'hero'|'arrival'|'inspection'|'parts'|'pickup'|'service'|'ready'|'completion';
export type JourneyDockMode = 'hero'|'studio'|'services'|'process'|'completion';
export type JourneyPose = { turn:number; distance:number; split:number; scan:number; clean:number; targetX:number; targetY:number; height:number; scale:number };
export function journeyPose(chapter:JourneyChapter, progress:number):JourneyPose {
  const p=clamp01(progress);
  switch(chapter) {
    case 'hero': return {turn:-.22+p*.14,distance:.3+p*.15,split:0,scan:0,clean:0,targetX:0,targetY:.9,height:2.2,scale:1.62};
    case 'arrival': return {turn:-.12+p*.18,distance:.35*(1-p),split:0,scan:0,clean:0,targetX:0,targetY:.78,height:1.65,scale:1};
    case 'inspection': return {turn:.12,distance:0,split:.2,scan:0,clean:0,targetX:0,targetY:.78,height:1.65,scale:1};
    case 'parts': return {turn:.16,distance:-.18,split:.8,scan:0,clean:0,targetX:0,targetY:.72,height:1.65,scale:1};
    case 'pickup': return {turn:-.12,distance:.2,split:0,scan:0,clean:0,targetX:0,targetY:.78,height:1.65,scale:1};
    case 'service': return {turn:.1,distance:0,split:.35,scan:p,clean:0,targetX:0,targetY:.78,height:1.65,scale:1};
    case 'ready': return {turn:-.05,distance:.15,split:0,scan:0,clean:1,targetX:0,targetY:.78,height:1.65,scale:1};
    case 'completion': return {turn:-.08,distance:.28,split:0,scan:0,clean:1,targetX:0,targetY:.78,height:1.65,scale:1};
  }
}
export const sceneService = (index:number) => index===1?1:index===2?2:index===3?3:0;
export function chapterFor(mode:JourneyDockMode, progress:number, step?:number):JourneyChapter {
  if(mode==='hero')return 'hero';
  if(mode==='studio') return progress<.32?'arrival':'inspection';
  if(mode==='services') return progress>.86?'ready':'parts';
  if(mode==='completion') return 'completion';
  return (['inspection','pickup','service','ready'] as JourneyChapter[])[Math.max(0,Math.min(3,step??Math.floor(clamp01(progress)*4)))];
}
export type DockBounds = {top:number;bottom:number;height:number};
/** Pick one visible inline dock; skimming into quiet reading content pauses WebGL. */
export function chooseDock(bounds:DockBounds[],viewport:number) {
  let best=-1,distance=Infinity;
  bounds.forEach((b,index)=>{
    const overlap=Math.min(b.bottom,viewport-64)-Math.max(b.top,64);
    if(overlap<Math.min(60,b.height*.15)) return;
    const d=Math.abs(b.top+b.height/2-viewport*.48);
    if(d<distance){distance=d;best=index;}
  });
  return best;
}
