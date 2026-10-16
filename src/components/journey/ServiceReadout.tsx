import { useJourney } from './journey-context';
import { services } from '@/lib/service-catalog';
export default function ServiceReadout() {
  const {selected}=useJourney();
  const zone=selected===1?'Wheel & brake illustration':selected===2?'Battery illustration':selected===3?'Body finish illustration':'Whole vehicle illustration';
  return <div className="service-readout"><span className="tech-label">SELECTED SERVICE</span><strong>{services[selected].title}</strong><div><span>VIEW</span><span>{zone}</span></div></div>;
}
