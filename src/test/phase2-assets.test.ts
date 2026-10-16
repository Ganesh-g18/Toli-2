import {readFileSync,existsSync,statSync} from 'node:fs';
import {expect,it} from 'vitest';
it('restores the exact original image variants and the navbar implementation',()=>{
 for(const [path,bytes] of Object.entries({
  'src/assets/hero/toli-sports-campaign-960.webp':90322,
  'src/assets/hero/toli-sports-campaign-1440.webp':175648,
  'src/assets/navigation/toli-performance-campaign-420.webp':24008,
  'src/assets/navigation/toli-performance-campaign-840.webp':67184,
  'src/assets/navigation/toli-campaign-rim-front.webp':10160,
  'src/assets/navigation/toli-campaign-rim-rear.webp':8040,
  'src/assets/ba-placeholder.svg':978
 }))expect(statSync(path).size).toBe(bytes);
 expect(existsSync('src/components/journey/NavbarPerformanceCar.tsx')).toBe(true);
});
it('keeps responsive/reduced-motion behavior without bringing back hero interaction or overlays',()=>{
 const css=readFileSync('src/components/journey/navbar-performance-car.css','utf8');
 expect(css).toContain('prefers-reduced-motion:reduce');expect(css).toContain('max-width:767px');expect(css).toContain('animation-play-state:paused');
 const hero=readFileSync('src/components/Hero.tsx','utf8');expect(hero).toContain('960w');expect(hero).toContain('1440w');expect(hero).not.toMatch(/data-scene-dock|hero-studio-grid|VEHICLE \/ SPORTS GT|hero-inspection/);
});
