import { beforeEach,afterEach,it,expect,vi } from 'vitest';
import { observeJourney } from '@/lib/journey-timeline';
let frames:Map<number,FrameRequestCallback>,id:number,reduced:boolean,change:()=>void;
let resizeStop:ReturnType<typeof vi.fn>;
beforeEach(()=>{
 frames=new Map();id=0;reduced=false;resizeStop=vi.fn();
 vi.stubGlobal('requestAnimationFrame',(cb:FrameRequestCallback)=>{frames.set(++id,cb);return id;});
 vi.stubGlobal('cancelAnimationFrame',(i:number)=>frames.delete(i));
 vi.stubGlobal('innerHeight',900);vi.stubGlobal('innerWidth',1280);
 vi.stubGlobal('matchMedia',()=>({get matches(){return reduced;},addEventListener:(_event:string,cb:()=>void)=>change=cb,removeEventListener:vi.fn()}));
 vi.stubGlobal('ResizeObserver',class{observe(){}disconnect(){resizeStop();}});
});
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals();document.body.innerHTML='';});
function flush(){const [i,cb]=[...frames][0]??[];if(cb){frames.delete(i);cb(16);}}
function setup(){
 const root=document.createElement('main');root.innerHTML='<section data-journey-section="services"><div data-scene-dock="services"></div></section>';document.body.append(root);
 const section=root.firstElementChild as HTMLElement,host=section.firstElementChild as HTMLElement;
 vi.spyOn(section,'getBoundingClientRect').mockReturnValue({top:100,bottom:1100,height:1000} as DOMRect);
 const rect=vi.spyOn(host,'getBoundingClientRect').mockReturnValue({top:150,bottom:550,height:400} as DOMRect);
 const update=vi.fn(),stop=observeJourney(root,update);flush();return {root,section,host,rect,update,stop};
}
it('maps native scroll to a single visible scene and clears camera work outside it',()=>{
 const {root,section,host,rect,update,stop}=setup();expect(update).toHaveBeenLastCalledWith(expect.objectContaining({host,surface:section,chapter:'parts'}));expect(root.dataset.chapter).toBe('services');
 rect.mockReturnValue({top:-700,bottom:-300,height:400} as DOMRect);window.dispatchEvent(new Event('scroll'));flush();expect(update).toHaveBeenLastCalledWith(null);
 stop();const count=update.mock.calls.length;window.dispatchEvent(new Event('scroll'));expect(frames.size).toBe(0);expect(update).toHaveBeenCalledTimes(count);expect(resizeStop).toHaveBeenCalledOnce();
});
it('retains static depth while cancelling scroll parallax after a live reduced-motion change',()=>{
 const {section,stop}=setup();expect(section.style.getPropertyValue('--journey-shift')).not.toBe('0px');reduced=true;change();flush();expect(section.style.getPropertyValue('--journey-shift')).toBe('0px');expect(section.style.getPropertyValue('--journey-angle')).toBe('0deg');stop();
});

it('releases the active vehicle dock when Gallery occupies the viewport',()=>{
 const {root,rect,update,stop}=setup();const gallery=document.createElement('section');gallery.dataset.journeySection='gallery';root.append(gallery);
 vi.spyOn(gallery,'getBoundingClientRect').mockReturnValue({top:100,bottom:1100,height:1000} as DOMRect);
 rect.mockReturnValue({top:-700,bottom:-300,height:400} as DOMRect);window.dispatchEvent(new Event('resize'));flush();
 expect(root.dataset.chapter).toBe('gallery');expect(update).toHaveBeenLastCalledWith(null);stop();
});
