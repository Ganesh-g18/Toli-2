import VehicleComponentView from './VehicleComponentView';
import { useJourney } from './journey-context';

export default function ComponentExperience() {
 const {componentFocus}=useJourney();
 return <section id="components" className="experience-chapter vehicle-interface component-chapter" data-journey-section="services" data-focus={componentFocus} aria-labelledby="component-title">
  <header className="chapter-heading"><p className="system-label">VEHICLE / COMPONENT EXPLORATION</p><h2 id="component-title">Explore vehicle components.</h2><p>Illustrative components · genuine service information</p></header>
  <VehicleComponentView controls/>
 </section>;
}
