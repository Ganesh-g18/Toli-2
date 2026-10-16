import { render,screen,fireEvent,cleanup,within,waitFor } from '@testing-library/react';
import { beforeEach,afterEach,it,expect,vi } from 'vitest';
import { MemoryRouter,Routes,Route,useLocation,useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CtaBanner from '@/components/CtaBanner';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Footer from '@/components/Footer';
import ExperienceNavigation from '@/components/journey/ExperienceNavigation';
import { JourneyProvider } from '@/components/journey/JourneyProvider';
import ServiceRequest from '@/pages/ServiceRequest';
import ServiceRequestDialogProvider from '@/components/ServiceRequestDialog';
import { takeRequestReturn,resetRequestDrafts,SERVICE_REQUEST_ROUTE,serviceRequestDestination,requestServiceFromSearch } from '@/lib/service-request';
function Location(){const location=useLocation(),navigate=useNavigate();return <><output data-testid="location">{location.pathname}{location.search}</output><button onClick={()=>navigate(-1)}>Test browser Back</button></>;}
beforeEach(()=>{resetRequestDrafts();vi.spyOn(window,'scrollTo').mockImplementation(()=>{});vi.stubGlobal('matchMedia',()=>({matches:false,addEventListener(){},removeEventListener(){}}));vi.stubGlobal('ResizeObserver',class{observe(){}unobserve(){}disconnect(){}});vi.stubGlobal('IntersectionObserver',class{observe(){}unobserve(){}disconnect(){}});});
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllGlobals();});
const mount=(path='/')=>render(<MemoryRouter initialEntries={[path]}><ServiceRequestDialogProvider><Location/><Routes><Route path="/" element={<JourneyProvider><ExperienceNavigation/><Hero/><Services/><CtaBanner/><Footer/></JourneyProvider>}/><Route path={SERVICE_REQUEST_ROUTE} element={<ServiceRequest/>}/><Route path="/privacy-policy" element={<PrivacyPolicy/>}/></Routes></ServiceRequestDialogProvider></MemoryRouter>);
const advanceToService=()=>{fireEvent.change(screen.getByLabelText('Name *'),{target:{value:'QA Example'}});fireEvent.change(screen.getByLabelText('Phone Number *'),{target:{value:'9990000000'}});fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));};
it.each(['Book Service ↗','Service Enquiry','Request this service ↗','ENQUIRE NOW ↗'])('opens the same popup for %s without navigating or removing the homepage',async name=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Explore Battery Services'}));const specific=name==='Request this service ↗'||name==='ENQUIRE NOW ↗';const trigger=screen.getByRole('button',{name});fireEvent.click(trigger);
 expect(screen.getByRole('dialog',{name:'Service request.'})).toHaveAttribute('aria-modal','true');expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/);expect(document.getElementById('hero')).not.toBeNull();expect(screen.getByRole('heading',{name:'Your details'})).toBeVisible();expect(screen.getByLabelText('Name *')).toHaveFocus();advanceToService();expect(screen.getByLabelText('Service Needed')).toHaveValue(specific?'Battery Services':'');fireEvent.click(screen.getByRole('button',{name:'Close Service Request'}));await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());expect(trigger).toHaveFocus();
});
it('preserves call, WhatsApp, chapter navigation and absence of invented footer booking links',()=>{
 mount();expect(within(screen.getByRole('contentinfo')).queryByRole('button',{name:/Book Service|Enquire Now|Request Service/i})).toBeNull();expect(screen.getByRole('link',{name:'Call Us'})).toHaveAttribute('href','tel:+918074946335');expect(screen.getByRole('link',{name:'WhatsApp'})).toHaveAttribute('href',expect.stringContaining('https://wa.me/918074946335'));
});
it('keeps safe canonical direct URLs and rejects fabricated services',()=>{expect(serviceRequestDestination('Fake diagnostics')).toBe(SERVICE_REQUEST_ROUTE);expect(requestServiceFromSearch(new URLSearchParams('service=fake-brakes'))).toBeUndefined();});
it('preserves the manually selected draft after close/reopen, starting at Step 01',async()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));advanceToService();fireEvent.click(screen.getByRole('button',{name:'Battery Services'}));fireEvent.change(screen.getByLabelText('Message'),{target:{value:'Keep this request'}});fireEvent.click(screen.getByRole('button',{name:'Close Service Request'}));await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));expect(screen.getByLabelText('Name *')).toHaveValue('QA Example');expect(screen.getByRole('heading',{name:'Your details'})).toBeVisible();advanceToService();expect(screen.getByLabelText('Service Needed')).toHaveValue('Battery Services');expect(screen.getByLabelText('Message')).toHaveValue('Keep this request');
});
it('restores a popup draft and review after legal-policy history Back',async()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));advanceToService();fireEvent.click(screen.getByRole('button',{name:'Battery Services'}));fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));fireEvent.click(screen.getByRole('link',{name:'Privacy Policy'}));expect(await screen.findByRole('heading',{name:'Privacy Policy',level:1})).toBeVisible();fireEvent.click(screen.getByRole('button',{name:'Test browser Back'}));expect(await screen.findByRole('dialog',{name:'Service request.'})).toBeVisible();expect(document.querySelector('.request-review')).toHaveTextContent('Battery Services');
});
it('keeps the direct URL refresh-safe with the identical shared steps and service context',()=>{
 mount(serviceRequestDestination('Battery Services'));expect(screen.queryByRole('dialog')).toBeNull();expect(screen.getByRole('heading',{name:'Service request.'})).toBeVisible();advanceToService();expect(screen.getByLabelText('Service Needed')).toHaveValue('Battery Services');
});
it('clears a completed handoff draft only on explicit Done and starts the next request fresh',async()=>{
 vi.spyOn(window,'open').mockReturnValue({} as Window);mount();fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));advanceToService();fireEvent.click(screen.getByRole('button',{name:'Battery Services'}));fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));fireEvent.click(screen.getByRole('checkbox'));fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(screen.getByText('Your request is ready in WhatsApp.')).toBeVisible();fireEvent.click(screen.getByRole('button',{name:'Done'}));await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));expect(screen.getByLabelText('Name *')).toHaveValue('');
});

it('allows immediate closing of an untouched popup and preserves history across internal steps',async()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));fireEvent.click(screen.getByRole('button',{name:'Close Service Request'}));await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));advanceToService();expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/);expect(screen.getByRole('heading',{name:'Select service'})).toBeVisible();
});
it('supports Escape closing with focus returned to the original CTA',async()=>{
 mount();const trigger=screen.getByRole('button',{name:'Book Service ↗'});fireEvent.click(trigger);fireEvent.keyDown(screen.getByRole('dialog'),{key:'Escape'});await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());expect(trigger).toHaveFocus();
});
it('prevents a second handoff after the original synchronous result',async()=>{
 const popup=vi.spyOn(window,'open').mockReturnValue({} as Window);mount();fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));advanceToService();fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));fireEvent.click(screen.getByRole('checkbox'));const form=document.querySelector('.request-form')!;fireEvent.submit(form);fireEvent.submit(form);expect(popup).toHaveBeenCalledOnce();expect(screen.getByText('Your request is ready in WhatsApp.')).toBeVisible();
});

it('opens the shared generic popup from the navigation menu service action',()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));fireEvent.click(screen.getByRole('button',{name:'Request Service ↗'}));expect(screen.getByRole('dialog',{name:'Service request.'})).toBeVisible();expect(screen.getByRole('heading',{name:'Your details'})).toBeVisible();
});
it('makes the background inert and restores the exact scroll position after closing',async()=>{
 vi.stubGlobal('scrollY',842);mount();const trigger=screen.getByRole('button',{name:'Book Service ↗'});fireEvent.click(trigger);expect(document.querySelector('[data-service-request-background]')).toHaveAttribute('aria-hidden','true');expect(document.body).toHaveAttribute('data-scroll-locked');expect(document.querySelector('[data-service-request-background]')).toHaveAttribute('inert');expect(screen.getByLabelText('Name *')).toHaveFocus();fireEvent.click(screen.getByRole('button',{name:'Close Service Request'}));await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());expect(trigger).toHaveFocus();expect(window.scrollTo).toHaveBeenLastCalledWith({left:0,top:842,behavior:'instant'});
});

it('captures homepage vehicle preferences only when legal navigation actually leaves the page',async()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Explore Battery Services'}));fireEvent.click(screen.getByRole('button',{name:'Inspect component'}));fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));expect(takeRequestReturn()).toBeUndefined();advanceToService();fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));fireEvent.click(screen.getByRole('link',{name:'Privacy Policy'}));expect(await screen.findByRole('heading',{name:'Privacy Policy',level:1})).toBeVisible();expect(takeRequestReturn()).toMatchObject({state:{selected:2,componentFocus:true,hasSelection:true}});
});

it('closes the popup before its source menu on Escape and restores focus to the menu request action',async()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));const trigger=screen.getByRole('button',{name:'Request Service ↗'});fireEvent.click(trigger);fireEvent.keyDown(screen.getByRole('dialog'),{key:'Escape'});await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());expect(trigger).toHaveFocus();expect(screen.getByRole('button',{name:'Close navigation menu'})).toHaveAttribute('aria-expanded','true');
});

it('starts fresh from every CTA after Done ends a completed request session',async()=>{
 vi.spyOn(window,'open').mockReturnValue({} as Window);mount();fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));advanceToService();fireEvent.click(screen.getByRole('button',{name:'Close Service Request'}));await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());fireEvent.click(screen.getByRole('button',{name:'Explore Battery Services'}));fireEvent.click(screen.getByRole('button',{name:'Request this service ↗'}));advanceToService();fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));fireEvent.click(screen.getByRole('checkbox'));fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));fireEvent.click(screen.getByRole('button',{name:'Done'}));await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));expect(screen.getByLabelText('Name *')).toHaveValue('');
});

it('uses the supplied transparent asset in the header and popup without adding a popup renderer',()=>{mount();expect(within(screen.getByRole('navigation',{name:'Main navigation'})).getByRole('img',{name:'Toli Motors'})).toHaveAttribute('src',expect.stringContaining('big-transparent.png'));fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));const dialog=screen.getByRole('dialog');expect(within(dialog).getByRole('img',{name:'Toli Motors'})).toHaveAttribute('src',expect.stringContaining('big-transparent.png'));expect(dialog.querySelector('canvas')).toBeNull();});

it('switches themes inside an open enquiry without resetting its step, brand, model or review',()=>{
 document.documentElement.dataset.theme='dark';mount();fireEvent.click(screen.getByRole('button',{name:'Book Service ↗'}));
 fireEvent.click(screen.getByRole('button',{name:/^02 Vehicle:/}));fireEvent.change(screen.getByRole('combobox',{name:'Vehicle Brand'}),{target:{value:'Hyundai'}});fireEvent.change(screen.getByRole('combobox',{name:'Vehicle Model (optional)'}),{target:{value:'Creta'}});
 const dialog=screen.getByRole('dialog');fireEvent.click(within(dialog).getByRole('button',{name:'Switch to light theme'}));expect(document.documentElement).toHaveAttribute('data-theme','light');expect(screen.getByRole('heading',{name:'Your vehicle'})).toBeVisible();expect(screen.getByRole('combobox',{name:'Vehicle Brand'})).toHaveValue('Hyundai');expect(screen.getByRole('combobox',{name:'Vehicle Model (optional)'})).toHaveValue('Creta');
 fireEvent.click(screen.getByRole('button',{name:/^04 Review:/}));expect(document.querySelector('.request-review')).toHaveTextContent('Hyundai');expect(document.querySelector('.request-review')).toHaveTextContent('Creta');fireEvent.click(within(dialog).getByRole('button',{name:'Switch to dark theme'}));expect(document.querySelector('.request-review')).toHaveTextContent('Creta');window.localStorage?.removeItem('toli-theme');delete document.documentElement.dataset.theme;
});
