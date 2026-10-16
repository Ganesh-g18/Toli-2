import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import SectionStack from '@/components/journey/SectionStack';
import { stackFits, stackCovered } from '@/lib/section-stack';
import { navigateExperience } from '@/lib/experience-navigation';
import { activeNavigation } from '@/lib/navigation-state';

afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllGlobals();});
it('enables sticky only when the complete content fits beneath navigation',()=>{
 expect(stackFits(700,900,76,1440)).toBe(true);
 expect(stackFits(900,900,76,1440)).toBe(false);
 expect(stackFits(500,600,100,1024)).toBe(false);
 expect(stackFits(400,844,76,390)).toBe(false);
 expect(stackFits(0,900,76,1440)).toBe(false);
});
it('derives covering directly from position in either scroll direction, including jumps',()=>{
 expect(stackCovered(650,84,true)).toBe(false);
 expect(stackCovered(84,84,true)).toBe(true);
 expect(stackCovered(-2000,84,true)).toBe(true);
 expect(stackCovered(500,84,true)).toBe(false);
 expect(stackCovered(84,84,false)).toBe(false);
});
it('ignores a covered sticky chapter when updating the existing navigation rail',()=>{
 const {container}=render(<><section id="services"/><section id="trust"/></>);
 container.querySelector('#services')!.setAttribute('inert','');
 expect(activeNavigation([{id:'services',top:76},{id:'trust',top:-300}])).toBe('trust');
 container.querySelector('#services')!.removeAttribute('inert');
 expect(activeNavigation([{id:'services',top:76},{id:'trust',top:900}])).toBe('services');
});
it('keeps the extracted component panel under the unchanged Services navigation entry',()=>{
 const {container}=render(<><section id="hero"/><section id="services"/><section id="components"/></>);
 container.querySelector('#services')!.setAttribute('inert','');
 vi.spyOn(container.querySelector('#components')!,'getBoundingClientRect').mockReturnValue({top:84,bottom:760} as DOMRect);
 expect(activeNavigation([{id:'hero',top:-1000},{id:'services',top:76}])).toBe('services');
});
it('retains semantic section order and safely uses normal flow without ResizeObserver',()=>{
 vi.stubGlobal('ResizeObserver',undefined);
 const {container}=render(<SectionStack><section id="services"/><section id="components"/><section id="process"/><section id="trust"/></SectionStack>);
 expect([...container.querySelector('[data-section-stack]')!.children].map(p=>p.id)).toEqual(['services','components','process','trust']);
 expect(container.querySelector('[inert]')).toBeNull();
});
it('navigates to the natural stack anchor even when the target is visually stuck or covered',()=>{
 vi.stubGlobal('matchMedia',()=>({matches:true}));
 const scroll=vi.spyOn(window,'scrollTo').mockImplementation(()=>{});
 render(<section id="services" data-stack-document-top="1600" style={{'--stack-top':'76px'} as React.CSSProperties}/>);
 expect(navigateExperience('services')).toBe(true);
 expect(scroll).toHaveBeenCalledWith({top:1524,behavior:'auto'});
});
it('keeps Hero, Gallery, booking and Footer outside the homepage stack',()=>{
 const source=readFileSync('src/pages/Index.tsx','utf8');
 const stack=source.split('<SectionStack>')[1].split('</SectionStack>')[0];
 expect(stack.indexOf('<Services')).toBeLessThan(stack.indexOf('<ComponentExperience'));
 expect(stack.indexOf('<ComponentExperience')).toBeLessThan(stack.indexOf('<HowItWorks'));
 expect(stack.indexOf('<HowItWorks')).toBeLessThan(stack.indexOf('<TrustChapter'));
 for(const excluded of ['Hero','ExperienceNavigation','Gallery','CtaBanner','Contact','Footer'])expect(stack).not.toContain(`<${excluded}`);
});
it('limits depth motion, preserves normal flow on phones and isolates stack layers below navigation',()=>{
 const css=readFileSync('src/components/journey/section-stack.css','utf8');
 expect(css).toContain('isolation:isolate');expect(css).toContain('z-index:0');
 expect(css).toContain('@media(prefers-reduced-motion:reduce)');
 expect(css).toContain('@media(max-width:767px)');
 expect(css).not.toMatch(/scroll-snap|rotate[XY]|perspective|filter:|overflow:hidden/);
});
