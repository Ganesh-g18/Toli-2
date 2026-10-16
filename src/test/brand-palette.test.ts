import { expect,it } from 'vitest';
import { applyBrandPalette,brandPalette,brandRed3D } from '@/lib/brand-palette';
import { vehicleTheme } from '@/lib/vehicle-theme';
function luminance(hex:string){const values=hex.slice(1).match(/../g)!.map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return values[0]*.2126+values[1]*.7152+values[2]*.0722;}
function contrast(a:string,b:string){const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
it('shares the performance red across CSS actions and 3D accents',()=>{const root=document.createElement('div');applyBrandPalette(root);expect(root.style.getPropertyValue('--brand-red')).toBe(brandPalette.red);expect(brandRed3D).toBe(Number.parseInt(brandPalette.red.slice(1),16));for(const field of ['caliper','componentEmission','caliperEmission','scan','accent'] as const)expect(vehicleTheme[field]).toBe(brandRed3D);});
it('keeps CTA text, focus, error and informational red accessible against graphite',()=>{for(const color of [brandPalette.red,brandPalette.hover,brandPalette.active])expect(contrast('#ffffff',color)).toBeGreaterThanOrEqual(4.5);for(const color of [brandPalette.text,brandPalette.error])expect(contrast(color,'#1b1d21')).toBeGreaterThanOrEqual(4.5);expect(contrast(brandPalette.focus,'#121418')).toBeGreaterThanOrEqual(3);});
it('keeps warm silver copy accessible on the red environmental surfaces',()=>{for(const background of [brandPalette.dark,brandPalette.deep])expect(contrast('#f4e2df',background)).toBeGreaterThanOrEqual(4.5);});

it('reserves vivid decorative red for highlights and keeps body copy on burgundy',()=>{expect(luminance(brandPalette.bright)).toBeGreaterThan(luminance(brandPalette.red));for(const background of [brandPalette.dark,brandPalette.deep])for(const text of ['#fff7f0','#f4e2df','#ead1cd'])expect(contrast(text,background)).toBeGreaterThanOrEqual(4.5);});

it('keeps supporting silver and focus readable on the faded-red card family',()=>{for(const background of [brandPalette['faded-dark'],brandPalette['faded-raised'],brandPalette['faded-hover']]){expect(contrast(brandPalette.text,background)).toBeGreaterThanOrEqual(4.5);expect(contrast('#e5e0df',background)).toBeGreaterThanOrEqual(4.5);expect(contrast(brandPalette.focus,background)).toBeGreaterThanOrEqual(3);}});
