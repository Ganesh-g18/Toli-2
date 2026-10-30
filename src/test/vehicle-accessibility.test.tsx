import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor, cleanup, act } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { JourneyProvider } from "@/components/journey/JourneyProvider";
import Services from "@/components/Services";
import VehicleStudio from "@/components/VehicleStudio";
const scene=vi.hoisted(()=>({dispose:vi.fn(),select:vi.fn()}));
const create=vi.hoisted(()=>vi.fn());
vi.mock('@/lib/vehicle-scene',()=>({createVehicleScene:create}));
let reduced:boolean, near:IntersectionObserverCallback, changes: (()=>void)[];
beforeEach(()=>{
  reduced=false;changes=[];create.mockReset();scene.dispose.mockReset();scene.select.mockReset();
  create.mockImplementation(options=>{options.ready();return scene;});
  vi.stubGlobal('innerWidth',1024);
  vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockReturnValue({top:100,bottom:500,left:0,right:600,width:600,height:400} as DOMRect);
  vi.stubGlobal('ResizeObserver',class{observe(){}unobserve(){}disconnect(){}});
  vi.stubGlobal('matchMedia',(query:string)=>({get matches(){return query.includes('no-preference')?!reduced:query.includes('reduce')?reduced:true;},addEventListener:(_type:string,listener:()=>void)=>changes.push(listener),removeEventListener:vi.fn()}));
  vi.stubGlobal('IntersectionObserver',class{constructor(cb:IntersectionObserverCallback,options?:IntersectionObserverInit){if(options?.rootMargin==='160px')near=cb;}observe(){}unobserve(){}disconnect(){}});
});
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllGlobals();});
it('keeps service controls usable and loads 3D on capable phones',async()=>{
  vi.stubGlobal('innerWidth',390);render(<MemoryRouter><JourneyProvider><VehicleStudio/></JourneyProvider></MemoryRouter>);near([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver);
  fireEvent.click(screen.getByRole('button',{name:'03 Battery Services'}));
  expect(screen.getByText('Amaron battery repair, replacement and maintenance. Ask which option is appropriate for your vehicle.')).toBeVisible();
  await waitFor(()=>expect(create).toHaveBeenCalledOnce());expect(screen.getByRole('link',{name:/View service details/})).toHaveAttribute('href','#/#services');
});
it('retains a running scene when reduced motion changes and preserves keyboard service access',async()=>{
  const {container}=render(<MemoryRouter><JourneyProvider><VehicleStudio/></JourneyProvider></MemoryRouter>);near([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver);
  await waitFor(()=>expect(create).toHaveBeenCalledOnce());
  act(()=>{reduced=true;changes.forEach(change=>change());});expect(scene.dispose).not.toHaveBeenCalled();expect(create).toHaveBeenCalledOnce();
  expect(container.querySelector('.journey-root')).toHaveAttribute('data-scene-state','ready');
  fireEvent.click(screen.getByRole('button',{name:'02 Spare Parts & Repairs'}));
  expect(screen.getByText("Discuss a repair or a replacement part for your vehicle. Ask our team about suitability and availability.")).toBeVisible();
});

it('synchronizes keyboard service-card selection with the recurring vehicle and studio controls',async()=>{
  const {container}=render(<MemoryRouter><JourneyProvider><VehicleStudio/><Services/></JourneyProvider></MemoryRouter>);
  near([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver);
  await waitFor(()=>expect(create).toHaveBeenCalledOnce());
  fireEvent.focus(screen.getByRole('button',{name:'Explore Battery Services'}));
  expect(scene.select).toHaveBeenLastCalledWith(2);
  expect(screen.getByRole('button',{name:'03 Battery Services'})).toHaveAttribute('aria-pressed','true');
  expect(container.querySelector('#service-battery-services')).toHaveAttribute('data-active','true');
  fireEvent.click(screen.getByRole('button',{name:'02 Spare Parts & Repairs'}));
  expect(scene.select).toHaveBeenLastCalledWith(1);expect(container.querySelector('#service-spare-parts-repairs')).toHaveAttribute('data-active','true');
});

it('keeps phone loading neutral and service controls semantic without Technical UI',()=>{
 vi.stubGlobal('innerWidth',390);const {container}=render(<MemoryRouter><JourneyProvider><VehicleStudio/><Services/></JourneyProvider></MemoryRouter>);
 fireEvent.click(screen.getByRole('button',{name:'Explore Battery Services'}));
 expect(screen.queryByRole('button',{name:'Technical'})).toBeNull();
 expect(container.querySelector('.journey-static')).toBeNull();expect(container.querySelectorAll('.vehicle-stage-loading')).toHaveLength(2);
 expect(screen.getByRole('button',{name:'03 Battery Services'})).toHaveAttribute('aria-pressed','true');
});
