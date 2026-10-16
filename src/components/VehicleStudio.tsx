import { ArrowUpRight } from 'lucide-react';
import { useDepth } from '@/hooks/use-depth';
import { services, serviceId } from '@/lib/service-catalog';
import { useJourney } from '@/components/journey/journey-context';
import ServiceReadout from '@/components/journey/ServiceReadout';
import JourneyDock from '@/components/journey/JourneyDock';
const choices=[4,1,2,3];
const VehicleStudio=()=>{
  const surface=useDepth<HTMLElement>(.8);const {selected,choose,state}=useJourney();const service=services[selected];
  return <section ref={surface} className="vehicle-studio depth-surface journey-section journey-studio" data-journey-section="studio" data-scene-state={state} aria-labelledby="vehicle-studio-title">
    <div className="vehicle-studio-inner"><div className="vehicle-studio-heading"><div><p className="vehicle-kicker">01 / SERVICE · REPAIR · CARE</p><h2 id="vehicle-studio-title">A closer look at car care.</h2></div><p>Explore our services through an illustrative 3D vehicle.</p></div>
    <div className="vehicle-studio-layout"><JourneyDock mode="studio" label="TOLI / SERVICE EXPLORER"/><div className="vehicle-service-panel"><p className="vehicle-kicker">EXPLORE YOUR CAR’S CARE</p><div className="vehicle-choices" role="group" aria-label="Explore existing services">{choices.map((index,i)=>{const item=services[index];return <button key={item.title} type="button" aria-pressed={selected===index} aria-controls="vehicle-service-description" onClick={()=>choose(index)}><span className="vehicle-choice-number">0{i+1}</span><item.icon size={18}/><span>{item.title}</span><span className="vehicle-choice-dot" aria-hidden="true"/></button>;})}</div>
    <ServiceReadout/><div id="vehicle-service-description" className="vehicle-service-description" aria-live="polite" aria-atomic="true"><h3>{service.title}</h3><p>{service.desc}</p><a href="#/#services" onClick={event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const card=document.getElementById(serviceId(service.title));if(card){event.preventDefault();card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});card.focus({preventScroll:true});}}}>View service details <ArrowUpRight size={16}/></a></div>
    </div></div></div></section>;
};
export default VehicleStudio;
