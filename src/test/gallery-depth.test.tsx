import { render,screen,fireEvent,cleanup } from '@testing-library/react';
import { afterEach,it,expect,vi } from 'vitest';
import Gallery from '@/components/Gallery';
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
it('keeps image preview above section depth contexts and restores the page after Escape',()=>{
 vi.stubGlobal('IntersectionObserver',class{observe(){}unobserve(){}disconnect(){}});
 const {container}=render(<Gallery/>);const trigger=screen.getByRole('button',{name:/^View Toli Motors gallery image 1:/});trigger.focus();fireEvent.click(trigger);
 const dialog=screen.getByRole('dialog',{name:'Workshop image preview'});
 expect(dialog.parentElement).toBe(document.body);expect(container.contains(dialog)).toBe(false);expect(document.body.style.overflow).toBe('hidden');
 fireEvent.keyDown(window,{key:'Escape'});expect(screen.queryByRole('dialog')).toBeNull();expect(document.body.style.overflow).toBe('');expect(trigger).toHaveFocus();
});
it('contains keyboard focus, retains it during image navigation and returns it after closing',()=>{
 vi.stubGlobal('IntersectionObserver',class{observe(){}unobserve(){}disconnect(){}});
 render(<Gallery/>);const trigger=screen.getAllByRole('button',{name:/^View Toli Motors gallery image/})[0];trigger.focus();fireEvent.click(trigger);
 const dialog=screen.getByRole('dialog'),controls=Array.from(dialog.querySelectorAll('button'));const first=controls[0],last=controls.at(-1)!;
 last.focus();fireEvent.keyDown(window,{key:'Tab'});expect(first).toHaveFocus();fireEvent.keyDown(window,{key:'Tab',shiftKey:true});expect(last).toHaveFocus();
 const close=screen.getByRole('button',{name:'Close image preview'});close.focus();fireEvent.keyDown(window,{key:'ArrowRight'});expect(close).toHaveFocus();fireEvent.keyDown(window,{key:'Escape'});expect(trigger).toHaveFocus();
});
it('restores scrollbar reservation and body state after rapid previews and unmount',()=>{
 document.documentElement.style.scrollbarGutter='auto';document.body.style.overflow='auto';
 const {unmount}=render(<Gallery/>);const trigger=screen.getByRole('button',{name:/^View Toli Motors gallery image 1:/});
 for(let i=0;i<3;i++){trigger.focus();fireEvent.click(trigger);expect(document.documentElement.style.scrollbarGutter).toBe('stable');fireEvent.keyDown(window,{key:'Escape'});expect(document.body.style.overflow).toBe('auto');expect(document.documentElement.style.scrollbarGutter).toBe('auto');}
 fireEvent.click(trigger);unmount();expect(document.body.style.overflow).toBe('auto');expect(document.documentElement.style.scrollbarGutter).toBe('auto');document.body.style.overflow='';document.documentElement.style.scrollbarGutter='';
});
it('keeps a failed optional photo slot usable without retrying or fake photography',()=>{
 const {container}=render(<Gallery/>);const photo=container.querySelector('.editorial-photo img')!;fireEvent.error(photo);
 expect(screen.getByText('Photo unavailable')).toBeVisible();expect(container.querySelectorAll('.editorial-photo')).toHaveLength(16);
 fireEvent.click(screen.getByRole('button',{name:/^View Toli Motors gallery image 1:/}));fireEvent.error(document.querySelector('#lightbox-dialog img')!);
 expect(document.querySelector('#lightbox-dialog')).toHaveTextContent('Photo unavailable');fireEvent.keyDown(window,{key:'ArrowRight'});expect(document.querySelector('#lightbox-dialog img')).not.toBeNull();
});
