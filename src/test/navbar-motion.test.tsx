import NavbarPerformanceCar from '@/components/journey/NavbarPerformanceCar';
import {act,cleanup,render,screen,fireEvent} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import ExperienceNavigation from '@/components/journey/ExperienceNavigation';
afterEach(cleanup);
it('keeps the header identity and logo with one approved vehicle artwork',()=>{
 const {container}=render(<MemoryRouter><ExperienceNavigation/></MemoryRouter>);
 expect(screen.getByRole('img',{name:'Toli Motors'})).toBeVisible();
 expect(screen.getByText('ANANTAPUR / SERVICE · REPAIR · CARE')).toBeVisible();
 expect(container.querySelectorAll('.navbar-performance-car')).toHaveLength(1);expect(container.querySelectorAll('.nav-wheel')).toHaveLength(2);
 expect(container.querySelectorAll('.nav-campaign-body')).toHaveLength(1);
});
it('keeps booking, theme and menu request access with the restored car animation',()=>{
 render(<MemoryRouter><ExperienceNavigation/></MemoryRouter>);
 expect(screen.getByRole('link',{name:'Book Service ↗'})).toHaveAttribute('href','/enquire-now');
 expect(document.querySelector('.theme-toggle')).not.toBeNull();fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));
 expect(screen.getByRole('link',{name:'Request Service ↗'})).toHaveAttribute('href','/enquire-now');
});

it('pauses the original decorative motion while the document is hidden',()=>{
 const descriptor=Object.getOwnPropertyDescriptor(document,'hidden');
 try{Object.defineProperty(document,'hidden',{configurable:true,value:true});const {container}=render(<NavbarPerformanceCar/>);expect(container.firstElementChild).toHaveAttribute('data-motion-paused','true');Object.defineProperty(document,'hidden',{configurable:true,value:false});act(()=>document.dispatchEvent(new Event('visibilitychange')));expect(container.firstElementChild).toHaveAttribute('data-motion-paused','false');}
 finally{if(descriptor)Object.defineProperty(document,'hidden',descriptor);else delete (document as unknown as {hidden?:boolean}).hidden;}
});
it('cleans up the navbar visibility listener on unmount',()=>{
 const add=vi.spyOn(document,'addEventListener'),remove=vi.spyOn(document,'removeEventListener');const {unmount}=render(<NavbarPerformanceCar/>);const listener=add.mock.calls.find(([type])=>type==='visibilitychange')?.[1];expect(listener).toBeDefined();unmount();expect(remove).toHaveBeenCalledWith('visibilitychange',listener);vi.restoreAllMocks();
});
