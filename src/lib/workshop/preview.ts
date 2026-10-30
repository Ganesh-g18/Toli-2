import * as THREE from 'three';
import {createWorkshopScene,type WorkshopMetrics} from './scene';
import {workshopAsset,workshopUrl} from './asset';
export function mountWorkshopPreview(root:HTMLElement) {
  if(!import.meta.env.DEV)throw new Error('Workshop inspection is development-only');
  let controller:ReturnType<typeof createWorkshopScene>|undefined,renderer:THREE.WebGLRenderer|undefined,disposed=false,generation=0,contexts=0;
  const stage=root.querySelector<HTMLElement>('#workshop-stage')!,status=root.querySelector<HTMLElement>('#workshop-status')!,debug=root.querySelector<HTMLElement>('#workshop-debug')!,open=root.querySelector<HTMLButtonElement>('#workshop-open')!;
  const metrics=(data:WorkshopMetrics)=>{debug.textContent=JSON.stringify({...data,ownedWebGLContexts:contexts,assetBytes:workshopAsset.bytes,gpuTextureBytes:'not exposed by renderer.info'},null,2);stage.dataset.state=data.state;};
  const close=()=>{generation++;controller?.dispose();controller=undefined;const remaining=renderer?.info?.memory;if(renderer){renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();renderer=undefined;contexts--;}stage.replaceChildren();stage.dataset.state='closed';status.textContent='Preview closed. Graphics resources released.';open.disabled=false;debug.textContent=JSON.stringify({state:'closed',ownedWebGLContexts:contexts,canvasCount:stage.querySelectorAll('canvas').length,pending:false,remainingGeometries:remaining?.geometries,remainingTextures:remaining?.textures},null,2);};
  const start=()=>{
    if(disposed||renderer)return;const ticket=++generation;open.disabled=true;status.textContent='Loading approved workshop…';stage.dataset.state='loading';
    try{
      const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');canvas.tabIndex=-1;stage.append(canvas);
      renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'low-power'});contexts++;
      controller=createWorkshopScene(renderer,stage,metrics,state=>{
        if(ticket!==generation||disposed)return;stage.dataset.state=state;status.textContent=state==='ready'?'Workshop ready. Drag to inspect, or use the buttons.':state==='failed'?'Workshop unavailable. You can return to the website.':'Loading approved workshop…';
        if(state==='failed'){controller?.dispose();const remaining=renderer?.info?.memory;if(renderer){renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();renderer=undefined;contexts--;}open.disabled=true;debug.textContent=JSON.stringify({state:'failed',ownedWebGLContexts:contexts,canvasCount:stage.querySelectorAll('canvas').length,pending:false,remainingGeometries:remaining?.geometries,remainingTextures:remaining?.textures},null,2);}
      },root.dataset.failure==='true'?`${import.meta.env.BASE_URL}models/workshop-unavailable-test.glb`:workshopUrl());
    }catch{close();stage.dataset.state='failed';status.textContent='3D is unavailable in this browser. Return to the website.';open.disabled=true;}
  };
  const actions:Record<string,()=>void>={open:start,close,overview:()=>controller?.preset('overview'),interior:()=>controller?.preset('interior'),reception:()=>controller?.preset('reception'),left:()=>controller?.turn(-.08),right:()=>controller?.turn(.08),in:()=>controller?.zoom(.9),out:()=>controller?.zoom(1.1)};
  const click=(e:Event)=>{const button=(e.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');if(button&&root.contains(button))actions[button.dataset.action!]?.();};root.addEventListener('click',click);
  const dispose=()=>{if(disposed)return;disposed=true;close();root.removeEventListener('click',click);window.removeEventListener('pagehide',dispose);delete window.__workshopPreview;};window.addEventListener('pagehide',dispose);
  window.__workshopPreview={metrics:()=>({...controller?.metrics(),ownedWebGLContexts:contexts,canvasCount:stage.querySelectorAll('canvas').length}),pause:(value:boolean)=>controller?.pause(value)};
  start();return dispose;
}
declare global {interface Window {__workshopPreview?:{metrics:()=>Partial<WorkshopMetrics>&{ownedWebGLContexts:number;canvasCount:number};pause(value:boolean):void}}}
