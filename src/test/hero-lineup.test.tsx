import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import HeroVehicleLineup from '@/components/journey/HeroVehicleLineup';
import { heroVehicleAssets, heroVehicleSlots, type HeroVehicleAssets } from '@/lib/hero-vehicle-assets';

afterEach(cleanup);
const supplied = Object.fromEntries(heroVehicleSlots.map(slot => [slot, {
 src:`/${slot}.webp`, srcSet:`/${slot}.webp 960w`, width:960, height:500,
 provenance:'Original project artwork; reviewed source record',
}])) as HeroVehicleAssets;
it('keeps the approved campaign when the requested classes are missing', () => {
 const { container } = render(<HeroVehicleLineup fallback={<span>Approved campaign</span>}/>);
 expect(screen.getByText('Approved campaign')).toBeInTheDocument();
 expect(container.querySelector('img')).toBeNull();
 expect(Object.values(heroVehicleAssets)).toEqual([null,null,null]);
});
it('does not expose a partial or undocumented lineup', () => {
 for (const assets of [{...supplied,'hero-sedan':null}, {...supplied,'hero-suv':{...supplied['hero-suv']!,provenance:''}}]) {
  const view=render(<HeroVehicleLineup assets={assets} fallback={<span>Approved campaign</span>}/>);
  expect(view.container.querySelector('.hero-vehicle-lineup')).toBeNull();view.unmount();
 }
});
it('renders distinct reserved classes with dimensions only for a complete documented set', () => {
 const {container}=render(<HeroVehicleLineup assets={supplied} fallback={<span>Approved campaign</span>}/>);
 expect(screen.queryByText('Approved campaign')).toBeNull();
 expect(container.querySelectorAll('img')).toHaveLength(3);
 for(const slot of heroVehicleSlots){
  const img=container.querySelector(`.${slot} img`)!;
  expect(img).toHaveAttribute('src',`/${slot}.webp`);
  expect(img).toHaveAttribute('width','960');expect(img).toHaveAttribute('height','500');
 }
 expect(container.querySelector('.hero-supercar img')).toHaveAttribute('fetchpriority','high');
 expect(container.querySelector('canvas')).toBeNull();
});
