import { render,screen,fireEvent,cleanup,waitFor } from '@testing-library/react';
import { afterEach,beforeEach,expect,it,vi } from 'vitest';
import { MemoryRouter,Routes,Route } from 'react-router-dom';
import ServiceRequest from '@/pages/ServiceRequest';
import { resetRequestDrafts } from '@/lib/service-request';
let popup:ReturnType<typeof vi.spyOn>;
beforeEach(()=>{resetRequestDrafts();vi.stubGlobal('ResizeObserver',class{observe(){}unobserve(){}disconnect(){}});vi.spyOn(window,'scrollTo').mockImplementation(()=>{});popup=vi.spyOn(window,'open').mockReturnValue({} as Window);});
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllEnvs();vi.unstubAllGlobals();});
const mount=()=>render(<MemoryRouter><Routes><Route path="/" element={<ServiceRequest/>}/></Routes></MemoryRouter>);
const next=()=>fireEvent.click(screen.getByRole('button',{name:'CONTINUE'}));
const contact=()=>{fireEvent.change(screen.getByLabelText('Name *'),{target:{value:'QA Example'}});fireEvent.change(screen.getByLabelText('Phone Number *'),{target:{value:'9990000000'}});next();};
const service=()=>{contact();fireEvent.change(screen.getByLabelText('Vehicle Brand'),{target:{value:'Toyota'}});next();};
const review=()=>{service();fireEvent.click(screen.getByRole('button',{name:'Battery Services'}));fireEvent.change(screen.getByLabelText('Message'),{target:{value:'Test draft & review'}});next();fireEvent.click(screen.getByRole('checkbox'));};
it('preserves original required fields, autofill, optional fields and the four-step grouping',()=>{
 mount();expect(screen.getByLabelText('Name *')).toHaveAttribute('required');expect(screen.getByLabelText('Name *')).toHaveAttribute('autocomplete','name');expect(screen.getByLabelText('Phone Number *')).toHaveAttribute('type','tel');expect(screen.getByLabelText('Phone Number *')).toHaveAttribute('autocomplete','tel-national');contact();expect(screen.getByLabelText('Vehicle Brand')).not.toHaveAttribute('required');next();expect(screen.getByLabelText('Service Needed')).toBeVisible();expect(screen.getByLabelText('Message')).not.toHaveAttribute('required');expect(screen.getAllByRole('button',{pressed:false})).toHaveLength(9);next();expect(screen.getByRole('heading',{name:'Review your request'})).toBeVisible();
});
it('keeps invalid contacts on Step 01 and focuses the first error before advancing',()=>{
 mount();next();expect(screen.getByText('Enter your name.')).toBeVisible();expect(screen.getByLabelText('Name *')).toHaveFocus();expect(screen.queryByLabelText('Vehicle Brand')).toBeNull();fireEvent.change(screen.getByLabelText('Name *'),{target:{value:'QA'}});fireEvent.change(screen.getByLabelText('Phone Number *'),{target:{value:'123'}});next();expect(screen.getByText('Enter a 10-digit mobile number.')).toBeVisible();expect(screen.getByLabelText('Phone Number *')).toHaveFocus();expect(popup).not.toHaveBeenCalled();
});
it('preserves all data through Back, service edits and review without sending',()=>{
 mount();service();fireEvent.click(screen.getByRole('button',{name:'Battery Services'}));expect(screen.getByLabelText('Service Needed')).toHaveValue('Battery Services');fireEvent.change(screen.getByLabelText('Service Needed'),{target:{value:'Custom consultation'}});expect(screen.getByRole('button',{name:'Battery Services'})).toHaveAttribute('aria-pressed','false');fireEvent.change(screen.getByLabelText('Message'),{target:{value:'Please inspect'}});next();expect(document.querySelector('.request-review')).toHaveTextContent('Custom consultation');expect(document.querySelector('.request-review')).toHaveTextContent('+91 9990000000');fireEvent.click(screen.getByRole('button',{name:'Edit contact'}));expect(screen.getByLabelText('Name *')).toHaveValue('QA Example');next();expect(screen.getByLabelText('Vehicle Brand')).toHaveValue('Toyota');next();expect(screen.getByLabelText('Message')).toHaveValue('Please inspect');expect(popup).not.toHaveBeenCalled();
});
it('requires consent at review and associates the validation error',()=>{
 mount();service();next();fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(screen.getByText('Accept the privacy terms to continue.')).toBeVisible();expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid','true');expect(screen.getByRole('checkbox')).toHaveFocus();expect(popup).not.toHaveBeenCalled();
});
it('uses the existing endpoint only at explicit valid review submission and gives truthful confirmation',async()=>{
 mount();review();fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(popup).toHaveBeenCalledOnce();const url=new URL(popup.mock.calls[0][0] as string);expect(url.origin+url.pathname).toBe('https://wa.me/918074946335');expect(url.searchParams.get('text')).toContain('Service: Battery Services');expect(url.searchParams.get('text')).toContain('Test draft & review');expect(screen.getByText('Your request is ready in WhatsApp.')).toBeVisible();expect(screen.getByText(/Delivery and your appointment are not confirmed/)).toBeVisible();await waitFor(()=>expect(document.querySelector('.request-confirmation')).toHaveFocus());expect(screen.queryByRole('button',{name:'SEND VIA WHATSAPP'})).toBeNull();
});
it.each(['blocked','exception'])('retains data at review after %s and permits retry',mode=>{
 if(mode==='blocked')popup.mockReturnValue(null);else popup.mockImplementation(()=>{throw new Error('popup failure');});mount();review();fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(screen.getByRole('alert')).toHaveTextContent('WhatsApp could not open');expect(document.querySelector('.request-review')).toHaveTextContent('Test draft & review');fireEvent.click(screen.getByRole('button',{name:'Edit service'}));expect(screen.getByLabelText('Service Needed')).toHaveValue('Battery Services');next();popup.mockReturnValue({} as Window);fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(screen.getByText('Your request is ready in WhatsApp.')).toBeVisible();expect(popup).toHaveBeenCalledTimes(2);
});
it.each(['reduced motion','WebGL unavailable','mobile'])('keeps the entire step flow renderer-independent for %s',mode=>{
 vi.stubGlobal('matchMedia',()=>({matches:mode==='reduced motion'}));vi.stubGlobal('innerWidth',mode==='mobile'?320:1024);vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockImplementation(()=>{throw new Error('WebGL unavailable');});mount();review();expect(document.querySelector('canvas')).toBeNull();fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(popup).toHaveBeenCalledOnce();
});
it('labels the local QA preview accurately and never opens an external destination',()=>{
 vi.stubEnv('VITE_ENQUIRY_AUDIT','1');mount();review();fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(screen.getByText('Draft preview ready.')).toBeVisible();expect(screen.getByText(/did not open WhatsApp/)).toBeVisible();expect(popup).not.toHaveBeenCalled();
});
it('supports the existing isolated blocked-handoff fixture',()=>{
 vi.stubEnv('VITE_ENQUIRY_AUDIT','1');vi.stubEnv('VITE_ENQUIRY_AUDIT_RESULT','blocked');mount();review();fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(screen.getByRole('alert')).toHaveTextContent('WhatsApp could not open');expect(popup).not.toHaveBeenCalled();
});

it('keeps typing focus in a field while correcting validation or editing service details',()=>{
 mount();next();screen.getByLabelText('Name *').focus();fireEvent.change(screen.getByLabelText('Name *'),{target:{value:'Q'}});expect(screen.getByLabelText('Name *')).toHaveFocus();fireEvent.change(screen.getByLabelText('Name *'),{target:{value:'QA'}});fireEvent.change(screen.getByLabelText('Phone Number *'),{target:{value:'9990000000'}});next();next();screen.getByLabelText('Message').focus();fireEvent.change(screen.getByLabelText('Message'),{target:{value:'A new detail'}});expect(screen.getByLabelText('Message')).toHaveFocus();
});

const jump=(number:number)=>fireEvent.click(screen.getByRole('button',{name:new RegExp(`^0${number} `)}));
it('allows every direct transition without validating untouched contacts or faking completion',()=>{
 mount();jump(2);expect(screen.getByLabelText('Vehicle Brand')).toBeVisible();jump(1);jump(3);expect(screen.getByLabelText('Service Needed')).toBeVisible();expect(screen.getByRole('button',{name:'01 Details: Incomplete'})).toHaveAttribute('data-complete','false');expect(screen.queryByText('Enter your name.')).toBeNull();jump(2);expect(screen.getByLabelText('Vehicle Brand')).toBeVisible();jump(1);jump(4);expect(screen.getByText(/Incomplete — enter your name/)).toBeVisible();fireEvent.click(screen.getByRole('button',{name:'Edit vehicle'}));expect(screen.getByLabelText('Vehicle Brand')).toBeVisible();jump(4);jump(1);expect(screen.getByLabelText('Name *')).toBeVisible();expect(popup).not.toHaveBeenCalled();
});
it('preserves every field and consent through unusual direct navigation',()=>{
 mount();fireEvent.change(screen.getByLabelText('Name *'),{target:{value:'QA'}});fireEvent.change(screen.getByLabelText('Phone Number *'),{target:{value:'9990000000'}});jump(4);jump(2);fireEvent.change(screen.getByLabelText('Vehicle Brand'),{target:{value:'Toyota'}});jump(3);fireEvent.click(screen.getByRole('button',{name:'Battery Services'}));fireEvent.change(screen.getByLabelText('Message'),{target:{value:'Retained message'}});jump(1);expect(screen.getByLabelText('Name *')).toHaveValue('QA');expect(screen.getByRole('button',{name:'01 Details: Complete'})).toHaveAttribute('data-complete','true');jump(4);fireEvent.click(screen.getByRole('checkbox'));jump(2);expect(screen.getByLabelText('Vehicle Brand')).toHaveValue('Toyota');jump(3);expect(screen.getByLabelText('Message')).toHaveValue('Retained message');expect(screen.getByLabelText('Service Needed')).toHaveValue('Battery Services');jump(4);expect(screen.getByRole('checkbox')).toBeChecked();fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(popup).toHaveBeenCalledOnce();
});
it('routes final validation to the first invalid step and focuses its field',()=>{
 mount();jump(4);fireEvent.click(screen.getByRole('button',{name:'SEND VIA WHATSAPP'}));expect(popup).not.toHaveBeenCalled();expect(screen.getByLabelText('Name *')).toHaveFocus();expect(screen.getByText('Enter your name.')).toBeVisible();expect(screen.getByRole('button',{name:'01 Details: Has errors'})).toHaveAttribute('data-error','true');jump(3);jump(4);fireEvent.click(screen.getByRole('button',{name:'Complete contact'}));expect(screen.getByLabelText('Name *')).toBeVisible();
});
it('exposes semantic step buttons and current-step state without a tab-pattern claim',()=>{
 mount();const target=screen.getByRole('button',{name:'03 Service: Optional, not provided'});expect(target).toHaveAttribute('type','button');target.focus();expect(target).toHaveFocus();fireEvent.click(target);expect(target).toHaveAttribute('aria-current','step');expect(screen.getByRole('heading',{name:'Select service'})).toHaveFocus();expect(screen.queryByRole('tab')).toBeNull();
});
