import { cleanup, render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ServiceRequestDialogProvider from '@/components/ServiceRequestDialog';
import ServiceRequestLink from '@/components/ServiceRequestLink';
import ToliAIPanel from '@/components/ToliAI/ToliAIPanel';
import AssistantBoundary from '@/components/ToliAI/AssistantBoundary';
import OffersStrip from '@/components/OffersStrip';
vi.mock('@/hooks/use-mobile',()=>({useIsMobile:()=>false}));
vi.mock('animejs',()=>({animate:()=>({pause:vi.fn()}),stagger:()=>0}));
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllGlobals();});
function viewport(){const visual=Object.assign(new EventTarget(),{height:700,offsetTop:0});vi.stubGlobal('visualViewport',visual);return {visual,add:vi.spyOn(visual,'addEventListener'),remove:vi.spyOn(visual,'removeEventListener')};}
it('subscribes to viewport changes only while Service Request is open, cleaning each cycle',()=>{
 vi.spyOn(window,'scrollTo').mockImplementation(()=>{});const {add,remove}=viewport();render(<MemoryRouter><ServiceRequestDialogProvider><ServiceRequestLink><button>Request</button></ServiceRequestLink></ServiceRequestDialogProvider></MemoryRouter>);
 expect(add).not.toHaveBeenCalled();
 for(let i=0;i<2;i++){fireEvent.click(screen.getByRole('button',{name:'Request'}));expect(add.mock.calls.filter(([name])=>name==='resize')).toHaveLength(i+1);fireEvent.click(screen.getByRole('button',{name:'Close Service Request'}));expect(remove.mock.calls.filter(([name])=>name==='resize')).toHaveLength(i+1);}
});
it('removes assistant viewport listeners while the mounted panel is closed',()=>{
 const {add,remove}=viewport();const props={onClose:vi.fn(),onReturnFocus:vi.fn(),onRequest:vi.fn()};const view=render(<ToliAIPanel {...props} open={false}/>);expect(add).not.toHaveBeenCalled();
 view.rerender(<ToliAIPanel {...props} open/>);expect(add.mock.calls.filter(([name])=>name==='resize')).toHaveLength(1);
 view.rerender(<ToliAIPanel {...props} open={false}/>);expect(remove.mock.calls.filter(([name])=>name==='resize')).toHaveLength(1);
});
it('contains an optional assistant failure without unmounting the rest of the site',()=>{
 vi.spyOn(console,'error').mockImplementation(()=>{});const close=vi.fn();function Broken(){throw Error('Chunk unavailable');return null;}
 render(<><h1>Workshop website</h1><AssistantBoundary onClose={close}><Broken/></AssistantBoundary></>);
 expect(screen.getByRole('heading')).toHaveTextContent('Workshop website');expect(screen.getByRole('alert')).toHaveTextContent('could not load');fireEvent.click(screen.getByRole('button',{name:'Close'}));expect(close).toHaveBeenCalled();
});
it('does not keep an Offers animation frame alive when offscreen or paused',()=>{
 let intersect:IntersectionObserverCallback=()=>{};let id=0;const frames=new Map<number,FrameRequestCallback>();
 vi.stubGlobal('requestAnimationFrame',(cb:FrameRequestCallback)=>{frames.set(++id,cb);return id;});vi.stubGlobal('cancelAnimationFrame',(key:number)=>frames.delete(key));
 vi.stubGlobal('IntersectionObserver',class{constructor(cb:IntersectionObserverCallback){intersect=cb;}observe(){}disconnect(){}});
 const view=render(<OffersStrip/>);act(()=>{for(const [key,cb] of [...frames]){frames.delete(key);cb(16);}});expect(frames.size).toBe(0);
 act(()=>intersect([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver));expect(frames.size).toBeGreaterThan(0);
 act(()=>intersect([{isIntersecting:false} as IntersectionObserverEntry],{} as IntersectionObserver));
 // A final active-card update may have been scheduled; flush it, then no loop remains.
 act(()=>{for(const [key,cb] of [...frames]){frames.delete(key);cb(32);}});expect(frames.size).toBe(0);view.unmount();expect(frames.size).toBe(0);
});
