import {StrictMode} from 'react';
import {render,screen,within,fireEvent,act,cleanup,waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {it,expect,vi,beforeEach,afterEach} from 'vitest';
import {JourneyProvider} from '@/components/journey/JourneyProvider';
import {useJourney} from '@/components/journey/journey-context';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import type {JourneyFrame} from '@/lib/journey-timeline';
import type {RequestReturnState} from '@/lib/service-request';
const timeline=vi.hoisted(()=>({update:undefined as undefined|((f:JourneyFrame)=>void),near:undefined as undefined|IntersectionObserverCallback}));
const scene=vi.hoisted(()=>({select:vi.fn(),focus:vi.fn(),pause:vi.fn(),present:vi.fn(),technical:vi.fn(),dispose:vi.fn()}));
const create=vi.hoisted(()=>vi.fn());
vi.mock('@/lib/journey-timeline',()=>({observeJourney:(_root:HTMLElement,update:(f:JourneyFrame)=>void)=>{timeline.update=update;return ()=>{};}}));
vi.mock('@/lib/load-vehicle-scene',()=>({loadVehicleScene:async()=>({createVehicleScene:create})}));
function SelectionFlag(){return <output aria-label="Explicit selection">{String(useJourney().hasSelection)}</output>;}
const content=<><section data-journey-section="hero"><div data-scene-dock="hero"/></section><Services/><HowItWorks/><SelectionFlag/></>;
const tree=(restoreState?:RequestReturnState)=><MemoryRouter><JourneyProvider restoreState={restoreState}>{content}</JourneyProvider></MemoryRouter>;
let container:HTMLElement;
function mount(restoreState?:RequestReturnState){const result=render(tree(restoreState));container=result.container;return result;}
function progress(value:number,mode:'process'|'services'|'hero'='process'){
 const host=container.querySelector<HTMLElement>(`[data-scene-dock=${mode}]`)!;
 act(()=>timeline.update!({host,surface:host.closest('section')!,mode,chapter:mode==='process'?'service':mode==='hero'?'hero':'parts',progress:value}));
}
beforeEach(()=>{Object.values(scene).forEach(fn=>fn.mockClear());create.mockReset();create.mockImplementation(options=>{options.ready();return scene;});vi.stubGlobal('scrollY',0);vi.stubGlobal('innerWidth',1440);vi.stubGlobal('IntersectionObserver',class{constructor(cb:IntersectionObserverCallback){timeline.near=cb;}observe(){}disconnect(){}});});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
it('defaults the service rail, details, number and request destination to the canonical first service',()=>{
 mount();expect(screen.getByRole('button',{name:'Explore Automobile Services'})).toHaveAttribute('aria-pressed','true');
 const details=within(container.querySelector('#selected-service-module')!);expect(details.getByRole('heading',{name:'Automobile Services'})).toBeVisible();expect(details.getByText('SELECTED SERVICE / 01')).toBeVisible();expect(details.getByRole('link',{name:'Request this service ↗'})).toHaveAttribute('href','/enquire-now?service=service-automobile-services');expect(screen.getByLabelText('Explicit selection')).toHaveTextContent('false');
});
it('allows service 05 and 03 and keeps details and request context synchronized',()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Explore Vehicle Inspection'}));expect(screen.getByRole('heading',{name:'Vehicle Inspection'})).toBeVisible();expect(screen.getByText('SELECTED SERVICE / 05')).toBeVisible();progress(.8,'services');expect(screen.getByRole('button',{name:'Explore Vehicle Inspection'})).toHaveAttribute('aria-pressed','true');
 fireEvent.click(screen.getByRole('button',{name:'Explore Battery Services'}));expect(screen.getByRole('heading',{name:'Battery Services'})).toBeVisible();expect(screen.getByText('SELECTED SERVICE / 03')).toBeVisible();expect(screen.getByRole('link',{name:'Request this service ↗'})).toHaveAttribute('href','/enquire-now?service=service-battery-services');
});
it('starts Journey at step 01 even when first reached at middle or end scroll progress',()=>{
 mount();for(const p of [.3,.55,.95,1]){progress(p);expect(screen.getByRole('button',{name:'Explore step: Choose a service'})).toHaveAttribute('aria-pressed','true');expect(screen.getByRole('heading',{name:'Choose a service'})).toBeVisible();expect(screen.getByText('STEP / 01')).toBeVisible();expect(container.querySelector('.journey-root')).toHaveAttribute('data-scene-chapter','inspection');}
});
it('keeps chosen service and Journey steps across large scroll changes, section exits and re-entry',()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Explore Vehicle Inspection'}));progress(.4);fireEvent.click(screen.getByRole('button',{name:'Explore step: Prepare your request'}));expect(screen.getByRole('heading',{name:'Prepare your request'})).toBeVisible();expect(screen.getByText('STEP / 02')).toBeVisible();
 vi.stubGlobal('scrollY',9000);act(()=>timeline.update!(null));progress(.9,'hero');progress(.05);expect(screen.getByRole('button',{name:'Explore step: Prepare your request'})).toHaveAttribute('aria-pressed','true');expect(screen.getByRole('button',{name:'Explore Vehicle Inspection'})).toHaveAttribute('aria-pressed','true');
 fireEvent.click(screen.getByRole('button',{name:'Explore step: Send in WhatsApp'}));progress(.9);expect(screen.getByRole('heading',{name:'Send in WhatsApp'})).toBeVisible();expect(screen.getByText('STEP / 03')).toBeVisible();
});
it('honors valid explicit return state once without resetting user choices on rerender',()=>{
 const restore={selected:4,hasSelection:true,technical:false,componentFocus:false};const {rerender}=mount(restore);expect(screen.getByRole('heading',{name:'Vehicle Inspection'})).toBeVisible();expect(screen.getByRole('link',{name:'Request this service ↗'})).toHaveAttribute('href','/enquire-now?service=service-vehicle-inspection');fireEvent.click(screen.getByRole('button',{name:'Explore Battery Services'}));rerender(tree({...restore,selected:1}));expect(screen.getByRole('heading',{name:'Battery Services'})).toBeVisible();
});
it.each([-1,9,NaN,1.5])('falls back to the first service for invalid explicit index %s',selected=>{mount({selected,hasSelection:false,technical:false,componentFocus:false});expect(screen.getByRole('heading',{name:'Automobile Services'})).toBeVisible();});
it('retains deferred shared 3D initialization and sends the neutral first service state',async()=>{
 mount();progress(.5,'hero');act(()=>timeline.near!([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver));expect(create).not.toHaveBeenCalled();progress(.6);await waitFor(()=>expect(create).toHaveBeenCalledOnce());expect(scene.select).toHaveBeenLastCalledWith(0);expect(scene.present).toHaveBeenLastCalledWith(expect.any(HTMLElement),expect.any(HTMLElement),'inspection',.6);act(()=>timeline.update!(null));progress(.9);expect(create).toHaveBeenCalledOnce();expect(scene.dispose).not.toHaveBeenCalled();
});

it('does not create duplicate shared renderers under Strict Mode effect replay',async()=>{
 const view=render(<StrictMode>{tree()}</StrictMode>);container=view.container;
 progress(.5,'services');act(()=>timeline.near!([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver));
 await waitFor(()=>expect(create).toHaveBeenCalledOnce());view.unmount();expect(scene.dispose).toHaveBeenCalledOnce();
});
