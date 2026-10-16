import { useEffect, useRef } from 'react';
import { navigateExperience } from '@/lib/experience-navigation';
import { services, serviceId } from '@/lib/service-catalog';
import { useJourney } from '@/components/journey/journey-context';
import VehicleComponentView from '@/components/journey/VehicleComponentView';
import ServiceRequestLink from '@/components/ServiceRequestLink';

export default function Services({separateVehicle=false}:{separateVehicle?:boolean}){
 const {selected,choose,componentFocus,setComponentFocus}=useJourney();
 const selector=useRef<HTMLDivElement>(null);
 useEffect(()=>{const rail=selector.current,item=rail?.querySelector<HTMLElement>('[aria-pressed=true]');if(!rail||!item||rail.scrollWidth<=rail.clientWidth)return;const r=rail.getBoundingClientRect(),b=item.getBoundingClientRect();const delta=b.left<r.left?b.left-r.left:b.right>r.right?b.right-r.right:0;if(delta)rail.scrollTo?.({left:rail.scrollLeft+delta,behavior:'instant'});},[selected]);
 const item=services[selected],supported=selected===1||selected===2;
 return <section id="services" className="journey-section journey-services experience-chapter vehicle-interface" data-journey-section="services" data-experience-chapter="services" data-focus={componentFocus} aria-labelledby="service-matrix-title">
  <header className="chapter-heading"><p className="system-label">02 / SERVICES</p><h2 id="service-matrix-title">Explore your car’s care.</h2><p>Choose a service, read what it involves and ask our team about your vehicle.</p></header>
  <div className={`matrix-stage${separateVehicle?' matrix-stage-discovery':''}`}>
   <div className="matrix-selector">
    <p className="system-label">CHOOSE A SERVICE</p>
    <p className="service-scroll-hint">Swipe or scroll to explore all services →</p><div ref={selector} className="service-matrix" role="group" aria-label="Select a service">{services.map((s,i)=><button id={serviceId(s.title)} key={s.title} type="button" className="service-node" data-active={selected===i} aria-pressed={selected===i} aria-controls="selected-service-module" aria-label={`Explore ${s.title}`} onFocus={()=>choose(i)} onClick={()=>choose(i)}><span className="node-index">{String(i+1).padStart(2,'0')}</span><s.icon size={16}/><span>{s.title}</span><span aria-hidden="true">↗</span></button>)}</div>
   </div>
    <article className="floating-panel selected-service-module" id="selected-service-module" aria-live="polite" aria-atomic="true"><p className="system-label">SELECTED SERVICE / {String(selected+1).padStart(2,'0')}</p><h3>{item.title}</h3><p>{item.desc}</p><p className="service-question"><strong>When to ask</strong>{item.when}</p><p className="service-question"><strong>What to share</strong>{item.ask}</p><div className="module-actions"><ServiceRequestLink defaultService={item.title}><button type="button" className="system-button primary">Request this service ↗</button></ServiceRequestLink>{supported&&<button type="button" className="system-button" onClick={()=>{setComponentFocus(!componentFocus);if(separateVehicle)navigateExperience('components');else if(innerWidth<768)document.getElementById("vehicle-component-view")?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});}}>{componentFocus?'Return to vehicle':'Inspect component'}</button>}</div><small>Service availability and scope are confirmed by our team.</small></article>
   {!separateVehicle&&<VehicleComponentView/>}


  </div>
  <a className="services-trust-link" href="#/#trust" onClick={event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();document.getElementById('trust')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}}>Explore our workshop and approach ↗</a>
 </section>;
}
