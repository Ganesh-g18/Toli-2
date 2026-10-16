import { useEffect, useRef, type ReactNode } from 'react';
import { stackCovered, stackFits } from '@/lib/section-stack';
import './section-stack.css';

export default function SectionStack({children}:{children:ReactNode}) {
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=root.current;if(!node||typeof ResizeObserver==='undefined')return;
  let frame=0,disposed=false;
  let panels:HTMLElement[]=[],positions:number[]=[],tops:number[]=[],fits:boolean[]=[];
  const tick=()=>{
   frame=0;if(disposed)return;
   panels.forEach((panel,i)=>{
    const covered=i<panels.length-1&&stackCovered(positions[i+1]-scrollY,tops[i+1],fits[i]);
    panel.dataset.stackCovered=String(covered);
    panel.toggleAttribute('inert',covered);
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(tick);};
  const measure=()=>{
   panels=Array.from(node.children).filter((e):e is HTMLElement=>e instanceof HTMLElement&&e.tagName==='SECTION');
   // Measure normal-flow bounds together, before enabling sticky or depth transforms.
   node.dataset.measuring='true';
   const nav=document.querySelector<HTMLElement>('.experience-navigation');
   const navHeight=nav?.getBoundingClientRect().height??64;
   const bounds=panels.map(panel=>panel.getBoundingClientRect());
   positions=bounds.map(b=>b.top+scrollY);
   tops=panels.map((_,i)=>navHeight+12+i*8);
   fits=bounds.map((b,i)=>stackFits(b.height,innerHeight,tops[i],innerWidth));
   node.style.setProperty('--stack-nav-height',`${navHeight}px`);
   panels.forEach((panel,i)=>{
    panel.dataset.stackPanel=String(i+1);
    panel.dataset.stackSticky=String(fits[i]);
    panel.dataset.stackDocumentTop=String(positions[i]);
    panel.style.setProperty('--stack-top',`${tops[i]}px`);
    panel.style.setProperty('--stack-layer',String(i+1));
   });
   delete node.dataset.measuring;schedule();
  };
  const resize=new ResizeObserver(measure);resize.observe(node);
  const registration=new MutationObserver(()=>{Array.from(node.children).forEach(p=>resize.observe(p));measure();});
  registration.observe(node,{childList:true,subtree:true});
  Array.from(node.children).forEach(p=>resize.observe(p));
  window.addEventListener('resize',measure);window.addEventListener('scroll',schedule,{passive:true});
  measure();
  return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();registration.disconnect();window.removeEventListener('resize',measure);window.removeEventListener('scroll',schedule);panels.forEach(panel=>panel.removeAttribute('inert'));};
 },[]);
 return <div className="section-stack" ref={root} data-section-stack>{children}</div>;
}
