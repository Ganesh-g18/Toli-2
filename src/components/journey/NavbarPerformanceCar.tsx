import { useEffect, useState, type CSSProperties } from 'react';
import artwork from '@/assets/navigation/toli-performance-silver-420.webp';
import artworkLarge from '@/assets/navigation/toli-performance-silver-840.webp';
import rearRim from '@/assets/navigation/toli-campaign-rim-rear.webp';
import frontRim from '@/assets/navigation/toli-campaign-rim-front.webp';
import './navbar-performance-car.css';

/** Silver edit of the existing campaign car; original rim layers and CSS motion are retained. */
export default function NavbarPerformanceCar() {
 const [paused,setPaused]=useState(()=>document.hidden);
 useEffect(()=>{const update=()=>setPaused(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);},[]);
 return <span className="navbar-performance-car" aria-hidden="true" data-motion-paused={paused}>
  <span className="nav-speed-line nav-speed-line-one"/><span className="nav-speed-line nav-speed-line-two"/>
  <span className="nav-road-line"/>
  <span className="nav-campaign-art" style={{'--nav-art-mask':`url("${artwork}")`} as CSSProperties}>
   <img className="nav-campaign-body" src={artwork} srcSet={`${artwork} 420w, ${artworkLarge} 840w`} sizes="218px" width={2123} height={741} alt="" draggable={false}/>
   <span className="nav-wheel nav-wheel-rear"><img className="nav-rim-spin" src={rearRim} width={192} height={192} alt="" draggable={false}/></span>
   <span className="nav-wheel nav-wheel-front"><img className="nav-rim-spin" src={frontRim} width={192} height={192} alt="" draggable={false}/></span>
   <span className="nav-reflection-mask"><span className="nav-reflection-sweep"/></span>
  </span>
 </span>;
}
