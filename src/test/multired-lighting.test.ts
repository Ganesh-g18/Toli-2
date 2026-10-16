import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {expect,it} from 'vitest';
import {brandPalette} from '@/lib/brand-palette';
const sheet=postcss.parse(readFileSync('src/dark-system.css','utf8'));
function tokens(mobile=false){
 const values=new Map(Object.entries(brandPalette).map(([key,value])=>[key==='red'?'--brand-red':`--brand-red-${key}`,String(value)]));
 sheet.walkRules(rule=>{
  if(![':root',':root[data-theme=dark]'].includes(rule.selector))return;
  if(rule.parent?.type==='atrule'&&!mobile)return;
  rule.walkDecls(decl=>{values.set(decl.prop,decl.value);});
 });return values;
}
function expand(value:string,values:Map<string,string>,depth=0):string {
 if(depth>16)throw new Error('Cyclic theme role');
 return value.replace(/var\((--[\w-]+)\)/g,(_match,name)=>{const next=values.get(name);if(!next)throw new Error(`Missing theme role ${name}`);return expand(next,values,depth+1);});
}
function layers(value:string){let depth=0,count=1;for(const c of value){if(c==='(')depth++;else if(c===')')depth--;else if(c===','&&depth===0)count++;}return count;}
it.each([false,true])('composes independent same-section red regions, mobile=%s',mobile=>{
 const values=tokens(mobile);
 for(const role of ['--environment-entry','--environment-technical','--environment-request']){
  const value=expand(values.get(role)!,values);
  expect(value).toContain(brandPalette.wine);expect(value).toContain(brandPalette['primary-deep']);
  expect(value.includes(brandPalette.faded)||value.includes(brandPalette.dusty)).toBe(true);
  expect(layers(value)).toBeGreaterThanOrEqual(mobile?3:4);
 }
 const hero=expand(values.get('--environment-entry')!,values);expect(hero).toContain(brandPalette.bright);expect(hero.match(/radial-gradient/g)!.length).toBeGreaterThanOrEqual(2);
});
it('reduces mobile lighting layers without flattening the hero into one gradient',()=>{
 const desktop=tokens(),mobile=tokens(true);
 const a=expand(desktop.get('--environment-entry')!,desktop),b=expand(mobile.get('--environment-entry')!,mobile);
 expect(layers(b)).toBeLessThan(layers(a));expect(layers(b)).toBeGreaterThanOrEqual(3);
 expect(mobile.get('--studio-softbox')).toBe('none');
});

it.each([false,true])('keeps studio lighting within the desktop/mobile layer budget, mobile=%s',mobile=>{
 const values=tokens(mobile);
 for(const role of ['--environment-entry','--environment-technical','--environment-component','--environment-request','--environment-form']){
  const value=expand(values.get(role)!,values),count=layers(value);
  expect(count).toBeGreaterThanOrEqual(mobile?3:4);expect(count).toBeLessThanOrEqual(mobile?5:7);
  expect(value).not.toContain('blur(');expect(value).not.toContain('url(');
 }
});

// Structural checks support rendered QA; they are not a claim of visual acceptance.
it.each([false,true])('mixes neutral material and red light within each major studio, mobile=%s',mobile=>{
 const values=tokens(mobile);
 for(const role of ['--environment-entry','--environment-technical','--environment-component','--environment-request','--environment-form','--environment-journey','--environment-gallery']){
  const value=expand(values.get(role)!,values);
  for(const grey of ['--studio-charcoal','--studio-graphite','--studio-gunmetal','--studio-steel'])expect(value).toContain(values.get(grey));
  expect(value).toContain(brandPalette.wine);expect(value).toContain(brandPalette['primary-deep']);
  expect(value.includes(brandPalette.faded)||value.includes(brandPalette.dusty)).toBe(true);
  expect(value).not.toContain('url(');expect(value).not.toContain('blur(');
 }
});
