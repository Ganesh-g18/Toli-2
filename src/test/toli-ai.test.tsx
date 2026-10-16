import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { answer } from '@/ai/assistant';
import AIChatWidget from '@/components/AIChatWidget';
import { ServiceRequestDialogContext } from '@/components/service-request-dialog-context';
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
it.each([
 ['hello','GREETING'],['what services do you provide','SERVICES_OVERVIEW'],['battery problem','BATTERY'],["my car won't start",'BATTERY'],['I need spare parts','SPARE_PARTS'],['I want detailing','DETAILING'],['vehicle inspection','VEHICLE_INSPECTION'],['pickup my car','DOORSTEP_PICKUP'],['AMC','AMC'],['book service','BOOK_SERVICE'],["tell me tomorrow's weather",'UNKNOWN'],['batery','BATTERY'],['detaling','DETAILING'],['servce','AUTOMOBILE_SERVICE'],['inspecion','VEHICLE_INSPECTION'],['car repair','REPAIR'],['I want consultation','CONSULTATION'],['Do you provide installation','INSTALLATION'],['where are you located','LOCATION'],['Contact TOLI','CONTACT'],['help','HELP'],['what do you guys do','SERVICES_OVERVIEW'],['wash my car','DETAILING'],['pick up my car','DOORSTEP_PICKUP'],['check my vehicle','VEHICLE_INSPECTION'],['How much is battery service','UNKNOWN'],['opening hours','UNKNOWN'],
])('recognizes %s', (query,intent)=>expect(answer(query).intent).toBe(intent));
it('uses cautious starting guidance and remembers the service for a request',()=>{
 const result=answer("my car won't start");expect(result.text).toContain('several causes');expect(result.text).not.toMatch(/battery is dead|diagnosis complete/i);
 const followup=answer('How do I request it?',result.context);expect(followup.service).toBe('Battery Services');expect(followup.action).toBe('Request Battery Services');
 expect(answer('book battery service').service).toBe('Battery Services');
 expect(answer('my brakes make noise').text).toContain('professional inspection');
});
it('answers without network or persistence and opens the existing request action',async()=>{
 const fetch=vi.fn(()=>{throw Error('Network forbidden');});vi.stubGlobal('fetch',fetch);
 const open=vi.fn();render(<MemoryRouter><ServiceRequestDialogContext.Provider value={{isOpen:false,open}}><AIChatWidget/></ServiceRequestDialogContext.Provider></MemoryRouter>);
 const launcher=screen.getByRole('button',{name:'TOLI AI'});fireEvent.click(launcher);
 await screen.findByRole('dialog');fireEvent.click(screen.getByRole('button',{name:'Battery Services'}));
 expect(await screen.findByText(/Amaron battery/)).toBeInTheDocument();
 fireEvent.change(screen.getByRole('textbox',{name:'Ask about a service'}),{target:{value:'How do I request it?'}});fireEvent.click(screen.getByRole('button',{name:'Send message'}));
 const actions=screen.getAllByRole('button',{name:'Request Battery Services ↗'});fireEvent.click(actions[actions.length-1]);
 expect(open).toHaveBeenCalledWith('Battery Services',launcher);expect(fetch).not.toHaveBeenCalled();
 await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());fireEvent.click(launcher);await screen.findByRole('dialog');
 fireEvent.click(screen.getByRole('button',{name:'Close TOLI AI'}));await waitFor(()=>expect(launcher).toHaveFocus());
});
