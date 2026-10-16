import type { ReactNode } from 'react';

import { heroVehicleSlots, heroVehicleAssets, type HeroVehicleAssets } from '@/lib/hero-vehicle-assets';

export default function HeroVehicleLineup({ fallback, assets = heroVehicleAssets }: {
 fallback: ReactNode;
 assets?: HeroVehicleAssets;
}) {
 const ready = heroVehicleSlots.every(slot => {
  const asset = assets[slot];
  return asset && asset.src && asset.srcSet && asset.width > 0 && asset.height > 0 && asset.provenance.trim();
 });
 if (!ready) return <>{fallback}</>;
 return <div className="hero-vehicle-lineup" aria-hidden="true">
  {heroVehicleSlots.map(slot => {
   const asset = assets[slot]!;
   return <picture key={slot} className={`hero-lineup-slot ${slot}`}>
    <source srcSet={asset.srcSet} sizes={slot === 'hero-supercar' ? '(max-width:767px) 80vw, 50vw' : '(max-width:767px) 62vw, 36vw'}/>
    <img src={asset.src} alt="" width={asset.width} height={asset.height} decoding="async" {...{fetchpriority:slot === 'hero-supercar' ? 'high' : 'auto'}}/>
   </picture>;
  })}
 </div>;
}
