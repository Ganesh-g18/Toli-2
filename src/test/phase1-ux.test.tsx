import ServiceArea from '@/components/ServiceArea';
import BeforeAfter from '@/components/BeforeAfter';
import SkipToMainContent from '@/components/SkipToMainContent';
import {cleanup,render,screen,fireEvent} from '@testing-library/react';
import {afterEach,it,expect,vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import BrandPartners from '@/components/BrandPartners';
import ServiceRequestSteps from '@/components/ServiceRequestSteps';
import {resetRequestDrafts} from '@/lib/service-request';
import VehicleBrandCombobox from '@/components/VehicleBrandCombobox';
import {useState} from 'react';
afterEach(()=>{cleanup();resetRequestDrafts();vi.unstubAllGlobals();});
it.each([false,true])('keeps brand tiles visible without observers or animations, reduced motion=%s',reduced=>{
 vi.stubGlobal('IntersectionObserver',undefined);
 vi.stubGlobal('matchMedia',()=>({matches:reduced,addEventListener:vi.fn(),removeEventListener:vi.fn()}));
 const {container}=render(<main className="phase9-experience"><BrandPartners/><ServiceArea/><BeforeAfter/></main>);
 const tiles=container.querySelectorAll<HTMLElement>('.brand-logo-item');expect(tiles).toHaveLength(21);
 tiles.forEach(tile=>{expect(tile).toBeVisible();expect(tile.style.opacity).not.toBe('0');});container.querySelectorAll<HTMLElement>('.area-pin,.ba-card').forEach(item=>expect(item).toBeVisible());
});
it('marks blank optional steps honestly and shows the full phone in private Review',()=>{
 vi.stubGlobal('ResizeObserver',class{observe(){}unobserve(){}disconnect(){}});
 render(<MemoryRouter><ServiceRequestSteps onDone={()=>{}}/></MemoryRouter>);
 expect(screen.getByRole('button',{name:'02 Vehicle: Optional, not provided'})).toHaveAttribute('data-complete','false');
 expect(screen.getByRole('button',{name:'03 Service: Optional, not provided'})).toHaveAttribute('data-complete','false');
 fireEvent.change(screen.getByLabelText('Name *'),{target:{value:'QA'}});fireEvent.change(screen.getByLabelText('Phone Number *'),{target:{value:'9990000000'}});
 fireEvent.click(screen.getByRole('button',{name:/^04 Review:/}));expect(screen.getByText('QA · +91 9990000000')).toBeVisible();
 expect(screen.getByText(/vehicle brand and model, service topic and message/)).toBeVisible();
});
it('reopens all brands without changing the selection and makes the chevron respond',()=>{
 function Field(){const [value,setValue]=useState('Toyota');return <VehicleBrandCombobox id="brand" value={value} onChange={setValue}/>;}
 vi.stubGlobal('ResizeObserver',class{observe(){}disconnect(){}});
 const {container}=render(<Field/>);const input=screen.getByRole('combobox');fireEvent.focus(input);
 expect(screen.getByRole('option',{name:'Mahindra'})).toBeVisible();expect(input).toHaveValue('Toyota');
 fireEvent.pointerDown(container.querySelector('.request-dropdown-toggle')!);expect(input).toHaveAttribute('aria-expanded','false');
 fireEvent.pointerDown(container.querySelector('.request-dropdown-toggle')!);expect(input).toHaveAttribute('aria-expanded','true');
 fireEvent.change(input,{target:{value:'mah'}});expect(screen.getByRole('option',{name:'Mahindra'})).toBeVisible();expect(screen.queryByRole('option',{name:'Toyota'})).toBeNull();
});

it('moves skip-link activation to the single main landmark without changing router state',()=>{
 const scroll=vi.fn();const {container}=render(<><SkipToMainContent/><nav><button>Menu</button></nav><main id="main-content" tabIndex={-1}>Content</main></>);
 const main=screen.getByRole('main');main.scrollIntoView=scroll;expect(container.querySelector('a,button')).toBe(screen.getByRole('link',{name:'Skip to main content'}));
 fireEvent.click(screen.getByRole('link',{name:'Skip to main content'}));expect(main).toHaveFocus();expect(screen.getAllByRole('main')).toHaveLength(1);expect(scroll).toHaveBeenCalledWith({block:'start',behavior:'instant'});
});
