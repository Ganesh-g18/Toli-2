import { useJourney } from './journey-context';
import { sceneService } from '@/lib/journey';
import VehicleIllustration from './VehicleIllustration';
import type { JourneyDockMode } from '@/lib/journey';
export default function JourneyDock({mode,label}:{mode:JourneyDockMode;label:string}) {
  const {selected,componentFocus,state}=useJourney();
  return <div className={`journey-dock journey-dock-${mode}`} data-component={mode==='completion'?0:sceneService(selected)}>
    <div className="vehicle-stage-label" aria-hidden="true"><span>{label}</span><span>TOLI / CARE</span></div>
    {state==='fallback'?<VehicleIllustration focus={mode==='services'&&componentFocus} technical={false} service={mode==='completion'?4:selected} mode={mode}/>:<div className="vehicle-stage-loading" role="status">Preparing vehicle view</div>}
    <div data-scene-dock={mode} className="journey-webgl" aria-hidden="true"/>
    <div className="vehicle-stage-bottom"><span>{state==='fallback'?'Static fallback · ':''}Illustrative vehicle · not a diagnostic result</span></div>
  </div>;
}
