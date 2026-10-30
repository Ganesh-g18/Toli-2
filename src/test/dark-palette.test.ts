import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {expect,it} from 'vitest';
const sheet=postcss.parse(readFileSync('src/dark-system.css','utf8'));
const values=new Map<string,string>();sheet.walkRules(':root[data-theme=dark]',rule=>{rule.walkDecls(decl=>{values.set(decl.prop,decl.value);});});
function color(name:string){
 const [h,s,l]=values.get(name)!.split(/\s+/).map(parseFloat);const a=s/100*Math.min(l/100,1-l/100);
 const rgb=[0,8,4].map(n=>{const k=(n+h/30)%12;return l/100-a*Math.max(-1,Math.min(k-3,9-k,1));});
 return {hue:h,saturation:s/100,lightness:l/100,luminance:rgb.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)};
}
it('keeps distinct neutral metal surface depths below light-theme brightness',()=>{
 const surfaces=['--charcoal','--graphite','--panel','--raised','--panel-hover'];
 surfaces.forEach(name=>{const c=color(name);expect(c.hue).toBeGreaterThanOrEqual(210);expect(c.hue).toBeLessThanOrEqual(240);expect(c.saturation).toBeLessThan(.15);});
 const layers=['--charcoal','--graphite','--panel','--raised','--panel-hover'].map(name=>color(name).lightness);
 expect(layers.every(v=>v<.45)).toBe(true);layers.slice(1).forEach((v,i)=>expect(v).toBeGreaterThan(layers[i]));
});
it('keeps meaningful silver text readable across the graphite surfaces',()=>{
 for(const surface of ['--charcoal','--graphite','--panel','--raised','--panel-hover'])for(const text of ['--silver','--silver-secondary','--silver-muted']){
  expect((color(text).luminance+.05)/(color(surface).luminance+.05)).toBeGreaterThanOrEqual(4.5);
 }
});
