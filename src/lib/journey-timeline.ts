import { chooseDock, chapterFor, type JourneyDockMode, type JourneyChapter } from './journey';
import { storyProgress } from './vehicle-policy';
export type JourneyFrame = {host:HTMLElement;surface:HTMLElement;mode:JourneyDockMode;chapter:JourneyChapter;progress:number}|null;
/** One throttled timeline; cached document bounds, one layout pass after resize/lazy content. */
export function observeJourney(root:HTMLElement, update:(frame:JourneyFrame)=>void) {
  let frame=0,disposed=false,sections:HTMLElement[]=[],docks:HTMLElement[]=[],bounds=new Map<HTMLElement,{top:number;height:number}>();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const measure=()=>{
    sections=Array.from(root.querySelectorAll<HTMLElement>('[data-journey-section]'));
    docks=Array.from(root.querySelectorAll<HTMLElement>('[data-scene-dock]'));
    bounds=new Map([...new Set([...sections,...docks])].map(node=>{const r=node.getBoundingClientRect();return [node,{top:r.top+scrollY,height:r.height}];}));
    schedule();
  };
  const tick=()=>{
    frame=0;if(disposed || document.hidden) return;
    const rects=docks.map(node=>{const r=node.getBoundingClientRect();return node.closest('[inert]')?{top:-10000,height:1,bottom:-9999}:{top:r.top,height:r.height,bottom:r.bottom};});
    let active:HTMLElement|undefined;
    sections.forEach(node=>{
      const b=bounds.get(node)!;const top=node.hasAttribute('data-stack-panel')?node.getBoundingClientRect().top:b.top-scrollY;const visible=top<innerHeight && top+b.height>64;
      node.classList.toggle('journey-in-view',visible);
      if(top<innerHeight*.45 && top+b.height>innerHeight*.45) active=node;
      if(!visible) return;
      const p=storyProgress(top,b.height,innerHeight);
      node.style.setProperty('--journey-p',p.toFixed(3));
      node.style.setProperty('--journey-shift',reduced.matches?'0px':`${((p-.5)*(innerWidth<768?6:18)).toFixed(2)}px`);
      node.style.setProperty('--journey-angle',reduced.matches?'0deg':`${((p-.5)*2).toFixed(2)}deg`);
      node.style.setProperty('--journey-line',`${(p*100).toFixed(1)}%`);
    });
    sections.forEach(node=>node.classList.toggle('journey-current',node===active));
    root.dataset.chapter=active?.dataset.journeySection??'hero';
    const index=chooseDock(rects,innerHeight);
    if(index<0){update(null);return;}
    const host=docks[index],surface=host.closest<HTMLElement>('[data-journey-section]')??host;
    const b=bounds.get(surface)??bounds.get(host)!;
    const progress=storyProgress(b.top-scrollY,b.height,innerHeight),mode=host.dataset.sceneDock as JourneyDockMode;
    update({host,surface,mode,progress,chapter:chapterFor(mode,progress)});
  };
  function schedule(){if(!disposed && !document.hidden && !frame)frame=requestAnimationFrame(tick);}
  const mutation=new MutationObserver(measure);mutation.observe(root,{childList:true,subtree:true});
  const resize=new ResizeObserver(measure);resize.observe(root);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;update(null);}else measure();};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',measure);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',measure);
  measure();
  return ()=>{disposed=true;cancelAnimationFrame(frame);mutation.disconnect();resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',measure);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',measure);};
}
