import { resetRequestDrafts } from '@/lib/service-request';
import { render,screen,fireEvent,waitFor,cleanup,act } from '@testing-library/react';
import { beforeEach,afterEach,it,expect,vi } from 'vitest';
import Hero from '@/components/Hero';
import ServiceRequest from '@/pages/ServiceRequest';
import VehicleStudio from '@/components/VehicleStudio';
import { JourneyProvider } from '@/components/journey/JourneyProvider';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
const model=vi.hoisted(()=>({active:true}));
vi.mock('@/lib/vehicle-model/contract',()=>({get ACTIVE_VEHICLE_MODEL(){return model.active?{}:null;}}));
const loader=vi.hoisted(()=>vi.fn());
const scene=vi.hoisted(()=>({select:vi.fn(),technical:vi.fn(),present:vi.fn(),dispose:vi.fn(),pause:vi.fn(),inspect:vi.fn()}));
vi.mock('@/lib/load-vehicle-scene',()=>({loadVehicleScene:loader}));
let preferences:(()=>void)[]=[];
let reduced=false,near:IntersectionObserverCallback;
beforeEach(()=>{
 model.active=true;resetRequestDrafts();vi.spyOn(window,'scrollTo').mockImplementation(()=>{});reduced=false;preferences=[];loader.mockReset();Object.values(scene).forEach(fn=>fn.mockReset());
 vi.stubGlobal('innerWidth',1024);
 vi.stubGlobal('matchMedia',(q:string)=>({get matches(){return q.includes('reduce')?reduced:true;},addEventListener:(_event:string,fn:()=>void)=>{if(q.includes('prefers-reduced-motion'))preferences.push(fn);},removeEventListener:vi.fn()}));
 vi.stubGlobal('ResizeObserver',class{observe(){}unobserve(){}disconnect(){}});
 vi.stubGlobal('IntersectionObserver',class{constructor(cb:IntersectionObserverCallback,opts?:IntersectionObserverInit){if(opts?.rootMargin==='160px')near=cb;}observe(){}unobserve(){}disconnect(){}});
 vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockReturnValue({top:100,bottom:600,left:0,right:600,width:600,height:500} as DOMRect);
 loader.mockResolvedValue({createVehicleScene:options=>{options.solidChanged?.('ready');options.ready();return scene;}});
});
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllGlobals();});
const mount=(studio=false)=>render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}><Routes><Route path="/" element={<JourneyProvider><Hero/>{studio&&<VehicleStudio/>}</JourneyProvider>}/><Route path="/enquire-now" element={<ServiceRequest/>}/></Routes></MemoryRouter>);
const approach=()=>near([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver);
it('makes headline and enquiry usable before deferred scene loading completes',async()=>{
 let resolve:(value:unknown)=>void;loader.mockReturnValue(new Promise(r=>resolve=r));const {container}=mount(true);approach();
 expect(screen.getByRole('heading',{level:1})).toHaveTextContent('Expert car care.');expect(container.querySelector('#hero img')).toBeVisible();
 await waitFor(()=>expect(loader).toHaveBeenCalledOnce());fireEvent.click(screen.getByRole('link',{name:'Service Enquiry'}));expect(await screen.findByRole('heading',{name:'Service request.'})).toBeVisible();
 resolve!({createVehicleScene:options=>{options.solidChanged?.('ready');options.ready();return scene;}});await Promise.resolve();await Promise.resolve();expect(scene.present).not.toHaveBeenCalled();
});
it('keeps the image hero usable for a phone without sufficient capability',()=>{
 vi.stubGlobal('innerWidth',390);vi.spyOn(navigator,'hardwareConcurrency','get').mockReturnValue(2);const {container}=mount(true);approach();
 expect(container.querySelector('#hero img')).toBeVisible();expect(loader).not.toHaveBeenCalled();expect(screen.getByRole('button',{name:/Explore Services/})).toBeEnabled();
});
it('keeps the image hero usable and controls when the renderer module rejects',async()=>{
 loader.mockRejectedValue(new Error('chunk unavailable'));const {container}=mount(true);approach();await waitFor(()=>expect(container.querySelector('.journey-root')).toHaveAttribute('data-scene-state','fallback'));
 expect(container.querySelector('.journey-static svg')).not.toBeNull();expect(container.querySelector('#hero img')).toBeVisible();expect(screen.getByRole('link',{name:'Service Enquiry'})).toBeEnabled();
});
it('keeps one solid scene without exposing a schematic-mode switch',async()=>{
 const {container}=mount(true);approach();await waitFor(()=>expect(loader).toHaveBeenCalledOnce());
 expect(screen.queryByRole('button',{name:'Technical'})).toBeNull();expect(scene.technical).toHaveBeenLastCalledWith(false);expect(container.querySelector('.journey-static')).toBeNull();
 expect(screen.queryByRole('button',{name:/lightweight|optional 3D|static vehicle/i})).toBeNull();expect(scene.dispose).not.toHaveBeenCalled();
});
it('does not initialize a deferred service scene after route teardown',async()=>{
 let resolve:(value:unknown)=>void;const create=vi.fn();loader.mockReturnValue(new Promise(r=>resolve=r));const mounted=mount(true);approach();await waitFor(()=>expect(loader).toHaveBeenCalledOnce());mounted.unmount();
 resolve!({createVehicleScene:create});await Promise.resolve();await Promise.resolve();expect(create).not.toHaveBeenCalled();
});

it('keeps one pending import across motion changes and uses fallback on actual failure',async()=>{
 let reject:(reason:Error)=>void;loader.mockImplementationOnce(()=>new Promise((_resolve,r)=>reject=r));const {container}=mount(true);approach();await waitFor(()=>expect(loader).toHaveBeenCalledOnce());
 act(()=>{reduced=true;preferences.forEach(fn=>fn());reduced=false;preferences.forEach(fn=>fn());});reject!(new Error('obsolete chunk failure'));
 await waitFor(()=>expect(container.querySelector('.journey-root')).toHaveAttribute('data-scene-state','fallback'));expect(loader).toHaveBeenCalledOnce();
});

it('supports eligible mobile with a below-fold tablet scene while preserving booking',async()=>{
 vi.stubGlobal('innerWidth',390);vi.spyOn(navigator,'hardwareConcurrency','get').mockReturnValue(8);Object.defineProperty(navigator,'deviceMemory',{value:8,configurable:true});
 const create=vi.fn(options=>{options.solidChanged?.('ready');options.ready();return scene;});loader.mockResolvedValue({createVehicleScene:create});const {container}=mount(true);approach();
 await waitFor(()=>expect(create).toHaveBeenCalled());expect(create.mock.calls[0][0]).toMatchObject({quality:'tablet',skipHeroIntro:true});expect(container.querySelector('#hero picture')).not.toBeNull();expect(screen.getByRole('link',{name:'Service Enquiry'})).toBeEnabled();delete (navigator as Navigator & {deviceMemory?:number}).deviceMemory;
});
it('enters the existing service chapter through the secondary HTML action',()=>{
 const scroll=vi.fn();const target=document.createElement('section');target.id='services';target.scrollIntoView=scroll;document.body.append(target);mount();fireEvent.click(screen.getByRole('button',{name:/Explore Services/}));expect(scroll).toHaveBeenCalledWith({behavior:'smooth'});target.remove();
});

it('keeps the reduced-motion cinematic entry skipped without exposing manual inspection',async()=>{
 reduced=true;const create=vi.fn(options=>{options.solidChanged?.('ready');options.ready();return scene;});loader.mockResolvedValue({createVehicleScene:create});mount(true);approach();
 await waitFor(()=>expect(create).toHaveBeenCalled());expect(create.mock.calls[0][0]).toMatchObject({skipHeroIntro:true});expect(screen.queryByText(/lightweight/i)).toBeNull();
});

it('retains the technical chapter label without a duplicate hero booking action',()=>{
 mount();expect(screen.queryByRole('link',{name:/Book Service/})).toBeNull();expect(screen.getByText('01 / EXPLORE YOUR CAR’S CARE')).toBeVisible();expect(screen.queryByText(/Illustrative (scene|vehicle)/)).toBeNull();expect(screen.queryByText('VEHICLE / SPORTS GT')).toBeNull();expect(document.querySelector('.hero-studio-grid')).toBeNull();
});

it('has one hero image presentation without a mode switch or technical fallback mesh',()=>{
 const {container}=mount(),hero=container.querySelector('#hero')!;
 expect(hero.querySelectorAll('picture')).toHaveLength(1);expect(hero.querySelectorAll('img')).toHaveLength(1);expect(hero.querySelector('canvas,svg:not(.lucide)')).toBeNull();
 expect(hero.querySelector('[aria-label="Hero vehicle illustration style"]')).toBeNull();expect(hero.querySelector('.journey-static svg')).toBeNull();
 expect(screen.queryByRole('button',{name:'Solid'})).toBeNull();expect(screen.queryByRole('button',{name:'Technical'})).toBeNull();
 expect(hero.querySelector('.hero-visual')).not.toBeNull();expect(hero.querySelector('[data-scene-dock]')).toBeNull();
});

it('has no configurator labels, toolbar, focus targets or part handlers in the hero',()=>{
 const {container}=mount();const hero=container.querySelector('#hero')!;
 expect(hero.querySelector('.hero-inspection-controls')).toBeNull();expect(hero.querySelector('[aria-label="Vehicle inspection controls"]')).toBeNull();
 expect(hero.textContent).not.toMatch(/360°|Vehicle preview|drag for|left door|right door|bonnet|mirrors|reset view/i);
 expect(screen.queryByRole('button',{name:/Open left door|Open bonnet|Fold mirrors|Rotate vehicle|Reset vehicle/})).toBeNull();
 fireEvent.pointerDown(hero);fireEvent.pointerMove(hero);fireEvent.pointerUp(hero);expect(scene.inspect).not.toHaveBeenCalled();
});
it('keeps the cinematic hero free of inspection UI after a rendering preference changes',async()=>{
 const {container}=mount(true);approach();await waitFor(()=>expect(loader).toHaveBeenCalledOnce());
 act(()=>{reduced=true;preferences.forEach(fn=>fn());});expect(loader).toHaveBeenCalledOnce();expect(scene.dispose).not.toHaveBeenCalled();
 expect(container.querySelector('.hero-inspection-controls')).toBeNull();expect(screen.queryByRole('button',{name:/Rotate vehicle|Reset vehicle|Open bonnet/})).toBeNull();
});

it('keeps image and booking available without configurator controls when the licensed asset is missing',async()=>{
 loader.mockResolvedValue({createVehicleScene:options=>{options.solidChanged?.('unavailable');options.ready();return scene;}});
 const {container}=mount(true);approach();await waitFor(()=>expect(container.querySelector('.journey-root')).toHaveAttribute('data-solid-state','unavailable'));
 expect(container.querySelector('#hero img')).toBeVisible();expect(screen.queryByRole('button',{name:'Open left door'})).toBeNull();expect(screen.queryByRole('button',{name:'Rotate vehicle 45 degrees'})).toBeNull();expect(screen.getByRole('link',{name:'Service Enquiry'})).toBeEnabled();
 expect(container.querySelector('#hero .vehicle-view-switch')).toBeNull();expect(screen.queryByRole('button',{name:'Rotate vehicle 45 degrees'})).toBeNull();
});

it.each([false,true])('does not load Three.js for the image hero, configured model=%s',async active=>{
 model.active=active;mount();approach();await act(async()=>{await new Promise(resolve=>setTimeout(resolve,250));});expect(loader).not.toHaveBeenCalled();expect(screen.getByRole('button',{name:/Explore Services/})).toBeEnabled();
});

it.each([1920,1600,1440,1366,1280,1024,768,430,412,390,360,320])('uses the normal 3D path without schematic loading at width %s',async width=>{
 vi.stubGlobal('innerWidth',width);const {container}=mount(true);approach();
 expect(container.querySelector('.journey-static')).toBeNull();
 await waitFor(()=>expect(loader).toHaveBeenCalledOnce());
 expect(container.querySelector('.journey-root')).toHaveAttribute('data-scene-state','ready');expect(container.querySelector('.journey-static')).toBeNull();
});
it('reserves the schematic for a severe known low-resource phone',async()=>{
 vi.stubGlobal('innerWidth',390);vi.spyOn(navigator,'hardwareConcurrency','get').mockReturnValue(2);Object.defineProperty(navigator,'deviceMemory',{value:2,configurable:true});
 const {container}=mount(true);approach();await waitFor(()=>expect(container.querySelector('.journey-root')).toHaveAttribute('data-scene-state','fallback'));expect(container.querySelector('.journey-static svg')).not.toBeNull();expect(loader).not.toHaveBeenCalled();
 delete (navigator as Navigator & {deviceMemory?:number}).deviceMemory;
});
