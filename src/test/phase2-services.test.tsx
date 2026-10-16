import {cleanup,render,screen,fireEvent,within} from '@testing-library/react';
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {services} from '@/lib/service-catalog';
import {JourneyProvider} from '@/components/journey/JourneyProvider';
import Services from '@/components/Services';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import CtaBanner from '@/components/CtaBanner';
import ServiceRequestDialogProvider from '@/components/ServiceRequestDialog';
import {resetRequestDrafts} from '@/lib/service-request';
beforeEach(()=>{
 resetRequestDrafts();vi.spyOn(window,'scrollTo').mockImplementation(()=>{});
 vi.stubGlobal('ResizeObserver',class{observe(){}unobserve(){}disconnect(){}});
 vi.stubGlobal('IntersectionObserver',class{observe(){}unobserve(){}disconnect(){}});
});
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllGlobals();});
const mount=()=>render(<MemoryRouter><ServiceRequestDialogProvider><JourneyProvider><Hero/><Services/><HowItWorks/><CtaBanner/></JourneyProvider></ServiceRequestDialogProvider></MemoryRouter>);
it.each(services)('explains $title and carries it into the one shared service request',service=>{
 mount();fireEvent.click(screen.getByRole('button',{name:`Explore ${service.title}`}));
 const details=document.getElementById('selected-service-module')!;
 expect(within(details).getByRole('heading',{name:service.title})).toBeVisible();expect(within(details).getByText(service.desc)).toBeVisible();expect(within(details).getByText(service.when)).toBeVisible();expect(within(details).getByText(service.ask)).toBeVisible();
 fireEvent.click(within(details).getByRole('button',{name:'Request this service ↗'}));
 const dialog=screen.getByRole('dialog');fireEvent.click(within(dialog).getByRole('button',{name:/^03 Service:/}));expect(within(dialog).getByLabelText('Service Needed')).toHaveValue(service.title);
});
it('keeps the customer information before an optional component in DOM order',()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Explore Battery Services'}));
 const selector=document.querySelector('.matrix-selector')!,details=document.getElementById('selected-service-module')!,visual=document.getElementById('vehicle-component-view')!;
 expect(selector.compareDocumentPosition(details)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();expect(details.compareDocumentPosition(visual)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
 expect(details.querySelector('.module-actions')!.firstElementChild).toHaveTextContent('Request this service');expect(visual.querySelector('[data-scene-dock]')).not.toBeNull();
});
it('keeps the approved overview and gives specific components useful explanations',()=>{
 mount();expect(document.querySelector('#vehicle-component-view [data-scene-dock]')).not.toBeNull();
 fireEvent.click(screen.getByRole('button',{name:'Explore Spare Parts & Repairs'}));expect(document.querySelector('#vehicle-component-view [data-scene-dock]')).not.toBeNull();
 fireEvent.click(screen.getByRole('button',{name:'Explore Consultation'}));expect(document.querySelector('#vehicle-component-view [data-scene-dock]')).not.toBeNull();expect(screen.getByText(/Vehicle overview for orientation/)).toBeVisible();
});
it('restores car visuals while keeping the actual enquiry journey understandable',()=>{
 mount();expect(document.querySelectorAll('#hero picture img')).toHaveLength(1);expect(document.querySelector('#hero [data-scene-dock],#hero [data-scene-dock]')).toBeNull();
 expect(document.querySelector('#process [data-scene-dock]')).not.toBeNull();expect(document.querySelector('#booking [data-scene-dock]')).not.toBeNull();
 fireEvent.click(screen.getByRole('button',{name:'Explore step: Send in WhatsApp'}));expect(screen.getByText(/Opening the draft does not confirm delivery/)).toBeVisible();
 fireEvent.click(screen.getByRole('button',{name:'Explore step: Discuss next steps'}));expect(screen.getByText(/Ask about pickup availability if needed/)).toBeVisible();
 expect(document.querySelector('#services')!.textContent).not.toMatch(/all brands|75-point|certified|guaranteed/i);
});
