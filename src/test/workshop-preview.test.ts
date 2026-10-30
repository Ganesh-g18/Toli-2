import {beforeEach,expect,it,vi} from 'vitest';
const m=vi.hoisted(()=>({failure:false,disposed:vi.fn(),lost:vi.fn(),sceneDisposed:vi.fn(),preset:vi.fn()}));
vi.mock('three',()=>({WebGLRenderer:vi.fn(function({canvas}:{canvas:HTMLCanvasElement}){return {domElement:canvas,dispose:m.disposed,forceContextLoss:m.lost};})}));
vi.mock('@/lib/workshop/scene',()=>({createWorkshopScene:vi.fn((_r:unknown,_host:HTMLElement,_metrics:unknown,state:(s:string)=>void)=>{Promise.resolve().then(()=>state(m.failure?'failed':'ready'));return {dispose:m.sceneDisposed,preset:m.preset,turn:vi.fn(),zoom:vi.fn(),pause:vi.fn(),metrics:()=>({state:'ready'})};})}));
import {mountWorkshopPreview} from '@/lib/workshop/preview';
beforeEach(()=>{vi.clearAllMocks();m.failure=false;document.body.innerHTML='<main><div id="workshop-stage"></div><p id="workshop-status"></p><pre id="workshop-debug"></pre><button id="workshop-open" data-action="open">Open</button><button data-action="close">Close</button><button data-action="interior">Interior</button></main>';});
it('mounts the isolated preview without a homepage scene and exposes keyboard controls',async()=>{
 const root=document.querySelector('main')!;const stop=mountWorkshopPreview(root);await Promise.resolve();expect(root.querySelectorAll('canvas')).toHaveLength(1);expect(root.querySelector('#workshop-status')?.textContent).toContain('ready');(root.querySelector('[data-action=interior]') as HTMLButtonElement).click();expect(m.preset).toHaveBeenCalledWith('interior');stop();expect(root.querySelector('canvas')).toBeNull();
});
it('shows a restrained load failure and releases the renderer without automatic retries',async()=>{
 m.failure=true;const stop=mountWorkshopPreview(document.querySelector('main')!);await Promise.resolve();expect(document.querySelector('#workshop-status')?.textContent).toContain('unavailable');expect(document.querySelector('canvas')).toBeNull();expect(JSON.parse(document.querySelector('#workshop-debug')!.textContent!).state).toBe('failed');expect(m.disposed).toHaveBeenCalledOnce();expect((document.querySelector('#workshop-open') as HTMLButtonElement).disabled).toBe(true);stop();
});
it('survives repeated setup/cleanup without accumulating canvas, renderer or click listeners',()=>{
 const root=document.querySelector('main')!;const first=mountWorkshopPreview(root);first();first();expect(m.disposed).toHaveBeenCalledOnce();const second=mountWorkshopPreview(root);expect(root.querySelectorAll('canvas')).toHaveLength(1);second();expect(root.querySelectorAll('canvas')).toHaveLength(0);expect(m.disposed).toHaveBeenCalledTimes(2);expect(m.sceneDisposed).toHaveBeenCalledTimes(2);expect(window.__workshopPreview).toBeUndefined();
});
