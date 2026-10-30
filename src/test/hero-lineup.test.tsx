import {cleanup,render} from '@testing-library/react';
import {afterEach,expect,it} from 'vitest';
import HeroVehicleLineup from '@/components/journey/HeroVehicleLineup';
import small from '@/assets/hero/workshop-three-cars-960.webp';
import large from '@/assets/hero/workshop-three-cars-1600.webp';
afterEach(cleanup);
it('loads the responsive three-car group with priority and no old campaign or renderer',()=>{
 const {container}=render(<HeroVehicleLineup/>);
 expect(container.querySelector('img')).toHaveAttribute('src',small);
 expect(container.querySelector('source')).toHaveAttribute('srcset',`${small} 960w, ${large} 1600w`);
 expect(container.querySelector('img')).toHaveAttribute('fetchpriority','high');
 expect(container.querySelector('.hero-campaign-graphic,canvas')).toBeNull();
});
