import vehicles from '@/assets/hero/workshop-three-cars-960.webp';
import vehiclesLarge from '@/assets/hero/workshop-three-cars-1600.webp';

/** One transparent, coherently lit composition; no renderer or model-specific claims. */
export default function HeroVehicleLineup() {
 return <picture className="hero-three-cars" aria-hidden="true">
  <source srcSet={`${vehicles} 960w, ${vehiclesLarge} 1600w`} sizes="(max-width:767px) 260vw, 86vw"/>
  <img src={vehicles} alt="" width="1600" height="372" decoding="async" {...{fetchpriority:'high'}}/>
 </picture>;
}
