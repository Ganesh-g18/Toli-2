import {cleanup,render,screen} from '@testing-library/react';
import {afterEach,expect,it} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import Hero from '@/components/Hero';
import poster from '@/assets/hero/workshop-three-cars-960.webp';
import logo from '@/assets/big-transparent.png';
import {serviceRequestDestination} from '@/lib/service-request';
afterEach(cleanup);
it('uses the replacement three-car presentation while preserving official identity',()=>{
 const {container}=render(<MemoryRouter><Hero/></MemoryRouter>);
 expect(container.querySelector('.hero-three-cars img')).toHaveAttribute('src',poster);
 expect(container.querySelector('.hero-reference-brand img')).toHaveAttribute('src',logo);
 expect(screen.getByText('MULTI BRAND CAR WORKSHOP')).toBeVisible();
 expect(container.querySelector('canvas')).toBeNull();
 expect(container.querySelector('#hero-title')?.nextElementSibling).toHaveClass('hero-brand-caption');
 expect(container.querySelector('.hero-corner-info .hero-location-text')).toHaveTextContent('ANANTAPUR / SERVICE · REPAIR · CARE');
 expect(container.querySelectorAll('.hero-corner-info a[href^="tel:"]')).toHaveLength(2);
 expect(container.querySelector('.hero-reference-brand .hero-brand-phones')).toBeNull();
 for(let i=0;i<4;i++) expect(container.querySelectorAll(`.hero-service-photo-${i}`)).toHaveLength(1);
 expect(container.querySelector('.hero-workshop-atmosphere')?.parentElement).toBe(container.querySelector('#hero'));
});
it('gives all four service categories the canonical enquiry destination with existing service context',()=>{
 render(<MemoryRouter><Hero/></MemoryRouter>);
 for(const [label,service] of [['Insurance claim enquiries','Consultation'],['Electrical & Mechanical','Automobile Services'],['Denting & Painting','Spare Parts & Repairs'],['Complete Vehicle Inspection','Vehicle Inspection']]){
  expect(screen.getByRole('link',{name:`Enquire about ${label}`})).toHaveAttribute('href',serviceRequestDestination(service));
 }
});
it('keeps approved contact data and avoids unconfirmed insurance or reference business claims',()=>{
 const {container}=render(<MemoryRouter><Hero/></MemoryRouter>);
 expect(container.textContent).not.toMatch(/cashless insurance claims available|98856|GSTIN|Rudrampeta/i);
 for(const link of screen.getAllByRole('link',{name:'99083 03888'})) expect(link).toHaveAttribute('href','tel:+919908303888');
 expect(screen.getByText(/6-2-806, Ram Nagar/)).toBeVisible();
 expect(container.querySelector('.hero-brand-caption')).toHaveTextContent('YOUR CAR, OUR CARE — DRIVE WITH CONFIDENCE.');
});
