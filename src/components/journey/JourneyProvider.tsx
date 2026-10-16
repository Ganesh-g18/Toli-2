import {ACTIVE_VEHICLE_MODEL,type SolidModelState} from '@/lib/vehicle-model/contract';
import {closedInspection} from '@/lib/premium-car/inspection';
import { useServiceRequestDialog } from '@/components/service-request-dialog-context';
import type { RequestReturnState } from '@/lib/service-request';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { JourneyContext } from './journey-context';
import { observeJourney, type JourneyFrame } from '@/lib/journey-timeline';
import { chapterFor, sceneService } from '@/lib/journey';
import { sceneQuality } from '@/lib/vehicle-policy';
import { subscribePageDepth } from '@/lib/depth-channel';
import { loadVehicleScene } from "@/lib/load-vehicle-scene";
import { retainStep } from '@/lib/vehicle-motion';
import type { VehicleScene } from '@/lib/vehicle-scene';


export function JourneyProvider({children,skipHeroIntro=false,restoreState}:{children:ReactNode;skipHeroIntro?:boolean;restoreState?:RequestReturnState}) {
  const [solidState,setSolidState]=useState<SolidModelState>(ACTIVE_VEHICLE_MODEL?'loading':'unavailable');
  const inspectionRef=useRef(closedInspection());
  const popup=useServiceRequestDialog();
  const obscured=useRef(popup?.isOpen??false);obscured.current=popup?.isOpen??false;
  const resumeScene=useRef<()=>void>();
  const root=useRef<HTMLDivElement>(null),controller=useRef<VehicleScene>();
  const heroStarted=useRef(skipHeroIntro);
  const selection=useRef(restoreState?.selected??4),manualStep=useRef<number>(),active=useRef<JourneyFrame>(null),chosenAt=useRef(0),technicalRef=useRef(restoreState?.technical??false);
  const focusRef=useRef(restoreState?.componentFocus??false);
  const [hasSelection,setHasSelection]=useState(restoreState?.hasSelection??false),[componentFocus,setFocus]=useState(restoreState?.componentFocus??false);
  const setComponentFocus=(value:boolean)=>{focusRef.current=value;setFocus(value);controller.current?.focus?.(value);};
  const [technical,setTechnical]=useState(restoreState?.technical??false),[selected,setSelected]=useState(restoreState?.selected??4),[state,setState]=useState('static'),[processStep,setProcessStep]=useState(0);
  const choose=(index:number)=>{selection.current=index;setSelected(index);setHasSelection(true);if(index!==1&&index!==2)setComponentFocus(false);controller.current?.select(sceneService(index));};
  const toggleTechnical=()=>{technicalRef.current=!technicalRef.current;setTechnical(technicalRef.current);controller.current?.technical?.(active.current?.mode==='hero'?false:technicalRef.current);resumeScene.current?.();};
  const chooseStep=(index:number)=>{manualStep.current=index;chosenAt.current=scrollY;setProcessStep(index);const f=active.current;if(f?.mode==='process'){root.current!.dataset.sceneChapter=chapterFor('process',f.progress,index);controller.current?.present?.(f.host,f.surface,chapterFor('process',f.progress,index),f.progress);}};
  useEffect(()=>{
    const node=root.current;if(!node)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)'),screen=matchMedia('(min-width: 768px)'),desktop=matchMedia('(min-width: 1024px)');
    let cancelled=false,pending=false,failed=false,near=false,timer=0;
    const generation=0;
    const quality=()=>sceneQuality(innerWidth,reduced.matches,(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData, !(navigator.hardwareConcurrency<=2 && ((navigator as Navigator & {deviceMemory?:number}).deviceMemory??4)<=2));
    const needsScene=(f:JourneyFrame)=>!!f&&(f.mode!=='hero'||!!ACTIVE_VEHICLE_MODEL);
    const setLive=(f:JourneyFrame)=>node.querySelectorAll<HTMLElement>('.journey-dock').forEach(d=>d.dataset.live=String(d===f?.host.parentElement));
    const present=(f:JourneyFrame)=>{
      active.current=f;
      if(obscured.current){controller.current?.pause?.();return;}
      if(!f){setLive(null);if(!retainStep(chosenAt.current,scrollY))manualStep.current=undefined;controller.current?.pause?.();return;}
      if(!needsScene(f)){node.dataset.sceneChapter=f.chapter;setLive(null);controller.current?.pause?.();return;}
      setLive(f);
      let chapter=f.chapter;
      if(f.mode==='process'){
        if(!retainStep(chosenAt.current,scrollY))manualStep.current=undefined;
        const step=manualStep.current??Math.min(3,Math.floor(f.progress*4));setProcessStep(previous=>previous===step?previous:step);chapter=chapterFor('process',f.progress,step);
      }else if(!retainStep(chosenAt.current,scrollY))manualStep.current=undefined;
      node.dataset.sceneChapter=chapter;
      controller.current?.present?.(f.host,f.surface,chapter,f.progress);
      controller.current?.technical?.(f.mode==='hero'?false:technicalRef.current);
      start();
    };
    const start=()=>{
      if(obscured.current||cancelled||pending||failed||!near||!needsScene(active.current)||document.hidden||controller.current)return;
      if(quality()==='fallback'){setState('fallback');return;}
      const ticket=generation;pending=true;setState('loading');timer=window.setTimeout(async()=>{
        try{
          if(obscured.current||cancelled||ticket!==generation||!needsScene(active.current)||quality()==='fallback')return;
          const {createVehicleScene}=await loadVehicleScene();
          const f=active.current;if(obscured.current||cancelled||ticket!==generation||!f||!needsScene(f)||quality()==='fallback')return;
          controller.current=createVehicleScene({host:f.host,surface:f.surface,quality:quality() as 'desktop'|'tablet',managed:true,skipHeroIntro:heroStarted.current||reduced.matches||innerWidth<768,ready:()=>{if(!cancelled)setState('ready');},solidChanged:next=>{setSolidState(next);if(next==='ready'){const restored={...inspectionRef.current};for(const part of Object.keys(restored) as (keyof typeof inspectionRef.current)[])if(restored[part])controller.current?.inspect?.(part);}},inspectionChanged:next=>{inspectionRef.current=next;},failed:()=>{failed=true;if(!cancelled)setState('fallback');}});
          const restoredParts={...inspectionRef.current};for(const part of Object.keys(restoredParts) as (keyof typeof inspectionRef.current)[])if(restoredParts[part])controller.current.inspect?.(part);
          heroStarted.current=true;controller.current.select(sceneService(selection.current));controller.current.focus?.(focusRef.current);present(f);
        }catch{if(!cancelled&&ticket===generation){failed=true;setState('fallback');}}finally{pending=false;start();}
      },180);
    };
    resumeScene.current=()=>present(active.current);
    const nearObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){near=true;start();}},{rootMargin:'160px'});
    // Lazy sections arrive later; timeline registration is independent of initial GPU readiness.
    const observeDocks=()=>node.querySelectorAll('[data-scene-dock]').forEach(d=>nearObserver.observe(d));observeDocks();
    const registration=new MutationObserver(observeDocks);registration.observe(node,{childList:true,subtree:true});
    const stopTimeline=observeJourney(node,present);
    const unsubscribe=subscribePageDepth((surface,point)=>{if(!obscured.current&&active.current?.mode!=='hero'&&surface.closest('[data-journey-section]')===active.current?.surface)controller.current?.pointer?.(point);});
    // Quality and motion changes update the shared renderer; never replace it with a loading fallback.
    const preferences=()=>{const next=quality();if(next!=='fallback')controller.current?.quality?.(next);present(active.current);};
    const motionPreference=()=>{controller.current?.motion?.();present(active.current);};
    const connection=(navigator as Navigator & {connection?:{addEventListener?(name:string,fn:()=>void):void;removeEventListener?(name:string,fn:()=>void):void}}).connection;
    connection?.addEventListener?.('change',preferences);
    const wake=()=>{if(!document.hidden)start();};document.addEventListener('visibilitychange',wake);
    reduced.addEventListener('change',motionPreference);[screen,desktop].forEach(q=>q.addEventListener('change',preferences));
    return ()=>{connection?.removeEventListener?.('change',preferences);cancelled=true;clearTimeout(timer);stopTimeline();unsubscribe();registration.disconnect();nearObserver.disconnect();document.removeEventListener('visibilitychange',wake);reduced.removeEventListener('change',motionPreference);[screen,desktop].forEach(q=>q.removeEventListener('change',preferences));controller.current?.dispose();controller.current=undefined;};
  },[]);
  useEffect(()=>{if(popup?.isOpen)controller.current?.pause?.();else resumeScene.current?.();},[popup?.isOpen]);
  return <JourneyContext.Provider value={{solidState,selected,choose,hasSelection,componentFocus,setComponentFocus,technical,toggleTechnical,state,processStep,chooseStep}}><div ref={root} className="journey-root" data-scene-state={state} data-solid-state={solidState} data-technical={technical}>{children}</div></JourneyContext.Provider>;
}
