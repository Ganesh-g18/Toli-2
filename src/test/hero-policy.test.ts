import { expect,it } from 'vitest';
import { heroReveal } from '@/lib/hero-policy';
import { publicSiteUrl } from '../../seo.config';
it('reveals light and headlights once, then reaches a bounded final composition at each quality',()=>{
 expect(heroReveal(-1)).toMatchObject({progress:0,headlights:0,settled:false});expect(heroReveal(1900)).toMatchObject({light:1,headlights:1,dolly:0,turn:0,settled:true});expect(heroReveal(900,true).settled).toBe(true);
});
it('omits placeholder/unsafe URLs and accepts a configured public HTTPS deployment path',()=>{
 expect(publicSiteUrl('[SITE_URL]')).toBeUndefined();expect(publicSiteUrl('http://localhost:8102/Toli-2/')).toBeUndefined();expect(publicSiteUrl('https://name:pass@example.com')).toBeUndefined();expect(publicSiteUrl('https://example.com/Toli-2')).toBe('https://example.com/Toli-2/');
});
it('establishes headlights before the main body reveal',()=>{
 const early=heroReveal(500);expect(early.headlights).toBeGreaterThan(.4);expect(early.light).toBeLessThan(.35);
});
