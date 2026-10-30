import {ACTIVE_VEHICLE_MODEL,type SolidModelState} from '@/lib/vehicle-model/contract';
import {closedInspection} from '@/lib/premium-car/inspection-state';
import { useServiceRequestDialog } from '@/components/service-request-dialog-context';
import type { RequestReturnState } from '@/lib/service-request';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { JourneyContext } from './journey-context';
import { observeJourney, type JourneyFrame } from '@/lib/journey-timeline';
import { chapterFor, sceneService } from '@/lib/journey';
import { sceneQuality } from '@/lib/vehicle-policy';
import { subscribePageDepth } from '@/lib/depth-channel';
import { loadVehicleScene } from "@/lib/load-vehicle-scene";
import { services } from '@/lib/service-catalog';
import type { VehicleScene } from '@/lib/vehicle-scene';


export function JourneyProvider({children,skipHeroIntro=false,restoreState}:{children:ReactNode;skipHeroIntro?:boolean;restoreState?:RequestReturnState}) {
  const [solidState,setSolidState]=useState<SolidModelState>(ACTIVE_VEHICLE_MODEL?'loading':'unavailable');
  const inspectionRef=useRef(closedInspection());
  const popup=useServiceRequestDialog();
  const obscured=useRef(popup?.isOpen??false);obscured.current=popup?.isOpen??false;
  const resumeScene=useRef<()=>void>();
  const root=useRef<HTMLDivElement>(null),controller=useRef<VehicleScene>();
  const heroStarted=useRef(skipHeroIntro);
  const [selected,setSelected]=useState(()=>{const index=restoreState?.selected;return typeof index==='number'&&Number.isInteger(index)&&index>=0&&index<services.length?index:0;});
  const selection=useRef(selected),chosenStep=useRef(0),active=useRef<JourneyFrame>(null),technicalRef=useRef(restoreState?.technical??false);
  const focusRef=useRef(restoreState?.componentFocus??false);
  const [hasSelection,setHasSelection]=useState(restoreState?.hasSelection??false),[componentFocus,setFocus]=useState(restoreState?.componentFocus??false);
  const setComponentFocus=(value:boolean)=>{focusRef.current=value;setFocus(value);controller.current?.focus?.(value);};
  const [technical,setTechnical]=useState(restoreState?.technical??false),[state,setState]=useState('static'),[processStep,setProcessStep]=useState(0);
  const choose=(index:number)=>{selection.current=index;setSelected(index);setHasSelection(true);if(index!==1&&index!==2)setComponentFocus(false);controller.current?.select(sceneService(index));};
  const toggleTechnical=()=>{technicalRef.current=!technicalRef.current;setTechnical(technicalRef.current);controller.current?.technical?.(active.current?.mode==='hero'?false:technicalRef.current);resumeScene.current?.();};
  const chooseStep=(index:number)=>{chosenStep.current=index;setProcessStep(index);const f=active.current;if(f?.mode==='process'){root.current!.dataset.sceneChapter=chapterFor('process',f.progress,index);controller.current?.present?.(f.host,f.surface,chapterFor('process',f.progress,index),f.progress);}};
  useEffect(()=>{
    const node=root.current;if(!node)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)'),screen=matchMedia('(min-width: 768px)'),desktop=matchMedia('(min-width: 1024px)');
    let cancelled=false,pending=false,failed=false,near=false,timer=0;
    const generation=0;
    let facility:ReturnType<typeof import('@/lib/workshop/production')['mountWorkshopClient']>|undefined;
    let facilityPending=false,facilityNear=false;
    let facilityHost=node.querySelector<HTMLElement>('[data-facility-host]');
    let workshopDebug:ReturnType<typeof import('@/lib/workshop/debug')['workshopDebug']>|undefined;
    if(import.meta.env.DEV&&new URLSearchParams(location.search).get('debugWorkshop')==='1')void import('@/lib/workshop/debug').then(m=>{if(cancelled||!facilityHost)return;workshopDebug=m.workshopDebug(facilityHost);workshopDebug.update('FACILITY_REGISTER',{asset:'idle',active:false,observed:facilityObserved,owner:'none',context:'not acquired',viewport:[facilityHost.clientWidth,facilityHost.clientHeight],camera:false,requested:0,rendered:0,lastRender:null});});
    const facilityVisible=()=>{if(!facilityHost)return false;const r=facilityHost.getBoundingClientRect();return r.top<innerHeight*.8&&r.bottom>innerHeight*.2;};
    const overlay=()=>obscured.current||!!document.querySelector('[role="dialog"][aria-modal="true"],.toli-ai-launcher[aria-expanded="true"]');
    const prewarm=()=>{if(cancelled||facilityPending||!facilityHost)return;facilityPending=true;workshopDebug?.update('PREWARM',{asset:'loading'});
      void import('@/lib/workshop/production').then(module=>{if(cancelled)return;facility=module.mountWorkshopClient(facilityHost);void module.prewarmWorkshop().catch(()=>{});present(active.current);}).catch(()=>{if(!cancelled){facilityHost.closest<HTMLElement>('[data-facility]')!.dataset.facility='failed';facilityHost.querySelector('[data-facility-status]')!.textContent='The workshop view is unavailable. Explore our photographs below.';}});
    };

    const quality=()=>sceneQuality(innerWidth,reduced.matches,(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData, !(navigator.hardwareConcurrency<=4 || ((navigator as Navigator & {deviceMemory?:number}).deviceMemory??8)<=4));
    const needsScene=(f:JourneyFrame)=>!!f&&f.mode!=='hero';
    const setLive=(f:JourneyFrame)=>node.querySelectorAll<HTMLElement>('.journey-dock').forEach(d=>d.dataset.live=String(d===f?.host.parentElement));
    const present=(f:JourneyFrame)=>{
      active.current=f;
      if(overlay()){facility?.pause();controller.current?.pause?.();return;}
      if(facilityNear&&facilityVisible()){
        setLive(null);controller.current?.pause?.();if(controller.current)facility?.activate(controller.current);else start();return;
      }
      facility?.pause();
      if(!f){setLive(null);controller.current?.pause?.();return;}
      if(!needsScene(f)){node.dataset.sceneChapter=f.chapter;setLive(null);controller.current?.pause?.();return;}
      setLive(f);
      let chapter=f.chapter;
      if(f.mode==='process'){
        chapter=chapterFor('process',f.progress,chosenStep.current);
      }
      node.dataset.sceneChapter=chapter;
      controller.current?.present?.(f.host,f.surface,chapter,f.progress);
      controller.current?.technical?.(f.mode==='hero'?false:technicalRef.current);
      start();
    };
    const start=()=>{
      if(obscured.current||cancelled||pending||failed||!near||(!needsScene(active.current)&&!facilityVisible())||document.hidden||controller.current)return;
      if(quality()==='fallback'){setState('fallback');return;}
      const ticket=generation;pending=true;setState('loading');timer=window.setTimeout(async()=>{
        try{
          if(obscured.current||cancelled||ticket!==generation||(!needsScene(active.current)&&!facilityVisible())||quality()==='fallback')return;
          const {createVehicleScene}=await loadVehicleScene();
          const fallbackHost=node.querySelector<HTMLElement>('[data-scene-dock]:not([data-scene-dock=hero])');
          const f=(needsScene(active.current)?active.current:null)??(facilityVisible()&&fallbackHost?{host:fallbackHost,surface:fallbackHost.closest<HTMLElement>('[data-journey-section]')!,mode:'services' as const,chapter:'arrival' as const,progress:0}:null);if(obscured.current||cancelled||ticket!==generation||!f||!needsScene(f)||quality()==='fallback')return;
          controller.current=createVehicleScene({host:f.host,surface:f.surface,quality:quality() as 'desktop'|'tablet',managed:true,skipHeroIntro:heroStarted.current||reduced.matches||innerWidth<768,ready:()=>{if(!cancelled)setState('ready');},solidChanged:next=>{setSolidState(next);if(next==='ready'){const restored={...inspectionRef.current};for(const part of Object.keys(restored) as (keyof typeof inspectionRef.current)[])if(restored[part])controller.current?.inspect?.(part);}},inspectionChanged:next=>{inspectionRef.current=next;},failed:()=>{failed=true;if(!cancelled)setState('fallback');}});
          const restoredParts={...inspectionRef.current};for(const part of Object.keys(restoredParts) as (keyof typeof inspectionRef.current)[])if(restoredParts[part])controller.current.inspect?.(part);
          heroStarted.current=true;controller.current.select(sceneService(selection.current));controller.current.focus?.(focusRef.current);present(active.current);
        }catch{if(!cancelled&&ticket===generation){failed=true;setState('fallback');}}finally{pending=false;start();}
      },180);
    };
    resumeScene.current=()=>present(active.current);
    const nearObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){near=true;start();}},{rootMargin:'160px'});
    // Lazy sections arrive later; timeline registration is independent of initial GPU readiness.
    const facilityObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){facilityNear=true;near=true;prewarm();present(active.current);}}, {rootMargin:'400px'});
    let facilityObserved=false;
    const observeFacility=()=>{facilityHost??=node.querySelector<HTMLElement>('[data-facility-host]');if(!facilityObserved&&facilityHost&&node.querySelector('[data-section-stack]')){facilityObserved=true;workshopDebug?.update('FACILITY_REGISTER',{observed:true});facilityObserver.observe(facilityHost);}};
    const blockedObserver=new MutationObserver(()=>present(active.current));blockedObserver.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-expanded','aria-modal']});
    const observeDocks=()=>{observeFacility();node.querySelectorAll('[data-scene-dock]:not([data-scene-dock=hero])').forEach(d=>nearObserver.observe(d));};observeDocks();
    const registration=new MutationObserver(observeDocks);registration.observe(node,{childList:true,subtree:true});
    const stopTimeline=observeJourney(node,present);
    const unsubscribe=subscribePageDepth((surface,point)=>{if(!obscured.current&&active.current?.mode!=='hero'&&surface.closest('[data-journey-section]')===active.current?.surface)controller.current?.pointer?.(point);});
    // Quality and motion changes update the shared renderer; never replace it with a loading fallback.
    const preferences=()=>{const next=quality();if(next!=='fallback')controller.current?.quality?.(next);present(active.current);};
    const motionPreference=()=>{controller.current?.motion?.();present(active.current);};
    const connection=(navigator as Navigator & {connection?:{addEventListener?(name:string,fn:()=>void):void;removeEventListener?(name:string,fn:()=>void):void}}).connection;
    connection?.addEventListener?.('change',preferences);
    const contextRestored=()=>queueMicrotask(()=>{if(!cancelled)present(active.current);});node.addEventListener('webglcontextrestored',contextRestored,true);
    const wake=()=>{present(active.current);if(!document.hidden)start();};document.addEventListener('visibilitychange',wake);
    reduced.addEventListener('change',motionPreference);[screen,desktop].forEach(q=>q.addEventListener('change',preferences));
    return ()=>{connection?.removeEventListener?.('change',preferences);cancelled=true;facility?.dispose();workshopDebug?.dispose();node.removeEventListener('webglcontextrestored',contextRestored,true);facilityObserver.disconnect();blockedObserver.disconnect();clearTimeout(timer);stopTimeline();unsubscribe();registration.disconnect();nearObserver.disconnect();document.removeEventListener('visibilitychange',wake);reduced.removeEventListener('change',motionPreference);[screen,desktop].forEach(q=>q.removeEventListener('change',preferences));controller.current?.dispose();controller.current=undefined;};
  },[]);
  useEffect(()=>{resumeScene.current?.();},[popup?.isOpen]);
  return <JourneyContext.Provider value={{solidState,selected,choose,hasSelection,componentFocus,setComponentFocus,technical,toggleTechnical,state,processStep,chooseStep}}><div ref={root} className="journey-root" data-scene-state={state} data-solid-state={solidState} data-technical={technical}>{children}</div></JourneyContext.Provider>;
}
