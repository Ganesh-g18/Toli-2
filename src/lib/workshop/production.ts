import type {VehicleScene} from '../vehicle-scene';
import {createWorkshopScene,loadWorkshopBytes,type WorkshopMetrics,type WorkshopPreset} from './scene';
import {workshopUrl} from './asset';
export function prewarmWorkshop(){return loadWorkshopBytes(workshopUrl());}
/** A client of JourneyProvider's renderer. Retain one parsed model across nearby scroll reversals. */
export function mountWorkshopClient(host:HTMLElement){
 const section=host.closest<HTMLElement>('[data-facility]')!;
 const status=section.querySelector<HTMLElement>('[data-facility-status]')!;
 let scene:ReturnType<typeof createWorkshopScene>|undefined;
 let lease:ReturnType<NonNullable<VehicleScene['borrowRenderer']>>;
 let dead=false,failed=false;let debug:ReturnType<typeof import('./debug')['workshopDebug']>|undefined;
 if(import.meta.env.DEV&&new URLSearchParams(location.search).get('debugWorkshop')==='1')void import('./debug').then(m=>{if(dead)return;debug=m.workshopDebug(host);debug.update('FACILITY_REGISTER',{registered:true});debug.update('PREWARM',{asset:'loading',active:!!lease,owner:lease?'workshop':'none'});});
 const state=(s:string)=>{if(dead)return;debug?.update(s==='failed'?'LOAD_ERROR':s==='ready'?'FRAME_VISIBLE':'LOAD_START',{asset:s,active:!!lease});section.dataset.facility=s;status.textContent=s==='failed'?'The workshop view is unavailable. Explore our photographs below.':'Preparing workshop';section.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.disabled=s!=='ready');};
 const metrics=(m:WorkshopMetrics)=>{if(import.meta.env.DEV)section.dataset.workshopMetrics=JSON.stringify(m);};
 const action=(e:Event)=>{const target=(e.target as Element).closest<HTMLButtonElement>('button');if(!scene||!lease||!target||target.disabled)return;
   const preset=target.dataset.workshopPreset as WorkshopPreset|undefined;
   if(preset){scene.preset(preset);section.querySelectorAll('[data-workshop-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));}
   else{const value=target.dataset.workshopAction;if(value==='left'||value==='right')scene.turn(value==='left'?-.12:.12);else scene.zoom(value==='in'?.9:1.1);}
 };
 section.addEventListener('click',action);state('loading');
 function pause(){if(!lease)return;debug?.update('OFFSCREEN',{active:false,owner:'released'});scene?.pause(true);metrics(scene!.metrics());lease.release();lease=undefined;}
 return {
  activate(owner:VehicleScene){
   if(dead||failed)return;if(owner.contextLost?.()){debug?.update('CONTEXT_LOST',{context:'lost'});return;}if(lease){scene?.ensureFrame?.();return;}
   lease=owner.borrowRenderer?.(host);if(!lease){failed=true;state('failed');return;}
   debug?.update('ONSCREEN',{active:true,owner:'workshop'});try{if(!scene)scene=createWorkshopScene(lease.renderer,host,metrics,s=>{state(s);if(s==='failed'){failed=true;lease?.release();lease=undefined;}},workshopUrl(),true);else{host.appendChild(lease.renderer.domElement);scene.pause(false);}}
   catch{failed=true;state('failed');scene?.dispose();lease?.release();lease=undefined;}
  },
  pause,
  dispose(){if(dead)return;pause();dead=true;scene?.dispose();debug?.dispose();section.removeEventListener('click',action);delete section.dataset.workshopMetrics;}
 };
}
