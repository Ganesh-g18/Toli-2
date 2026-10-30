import Hero from '@/components/Hero';
import NavbarPerformanceCar from '@/components/journey/NavbarPerformanceCar';
import {act,cleanup,render,screen,fireEvent} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import ExperienceNavigation from '@/components/journey/ExperienceNavigation';
afterEach(cleanup);
it('keeps the header identity and logo with one approved vehicle artwork',()=>{
 const {container}=render(<MemoryRouter><ExperienceNavigation/></MemoryRouter>);
 expect(screen.getByRole('img',{name:'Toli Motors'})).toBeVisible();
 expect(screen.queryByText('ANANTAPUR / SERVICE · REPAIR · CARE')).not.toBeInTheDocument();
 expect(container.querySelectorAll('.navbar-performance-car')).toHaveLength(1);expect(container.querySelectorAll('.nav-wheel')).toHaveLength(2);
 expect(container.querySelectorAll('.nav-campaign-body')).toHaveLength(1);
 expect(screen.queryByText(/Your Car, Our Care/)).not.toBeInTheDocument();
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

it('places the exact location label in the Hero before its heading',()=>{
 const {container}=render(<MemoryRouter><Hero/></MemoryRouter>);
 const label=container.querySelector('.hero-location-text')!;
 expect(label).toHaveTextContent('ANANTAPUR / SERVICE · REPAIR · CARE');
 const heading=screen.getByRole('heading',{name:'Expert car care. You can trust.'});
 expect(label.closest('#hero')).not.toBeNull();
 expect(label.compareDocumentPosition(heading)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
 expect(container.querySelectorAll('.hero-location')).toHaveLength(1);
 const caption=container.querySelector('.hero-brand-caption')!;
 expect(caption).toHaveTextContent('YOUR CAR, OUR CARE — DRIVE WITH CONFIDENCE.');
 expect(heading.compareDocumentPosition(caption)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
 expect(caption.querySelector('strong')).toHaveTextContent('DRIVE WITH CONFIDENCE.');
});
