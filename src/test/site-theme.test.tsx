import { afterEach,beforeEach,expect,it,vi } from 'vitest';
import { cleanup,fireEvent,render,screen } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle';
import { applyTheme,getTheme,initializeTheme,preferredTheme,setTheme,THEME_KEY } from '@/lib/site-theme';
let dispose=()=>{};
beforeEach(()=>{const values=new Map<string,string>();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>values.set(key,value),removeItem:(key:string)=>values.delete(key),clear:()=>values.clear()}});document.documentElement.dataset.theme='dark';});
afterEach(()=>{dispose();cleanup();window.localStorage.clear();delete document.documentElement.dataset.theme;document.documentElement.classList.remove('theme-changing');vi.restoreAllMocks();});
it('resolves system preference only when no valid explicit choice exists',()=>{
 vi.spyOn(window,'matchMedia').mockReturnValue({matches:true,addEventListener(){},removeEventListener(){}} as unknown as MediaQueryList);
 expect(preferredTheme()).toBe('dark');window.localStorage.setItem(THEME_KEY,'light');expect(preferredTheme()).toBe('light');window.localStorage.setItem(THEME_KEY,'invalid');expect(preferredTheme()).toBe('dark');
});
it('switches both directions with an action-based accessible name and persists for initialization',()=>{
 render(<ThemeToggle/>);fireEvent.click(screen.getByRole('button',{name:'Switch to light theme'}));expect(getTheme()).toBe('light');expect(document.documentElement.style.colorScheme).toBe('light');expect(window.localStorage.getItem(THEME_KEY)).toBe('light');
 fireEvent.click(screen.getByRole('button',{name:'Switch to dark theme'}));expect(getTheme()).toBe('dark');expect(document.documentElement).toHaveClass('dark');expect(window.localStorage.getItem(THEME_KEY)).toBe('dark');applyTheme('light');dispose=initializeTheme();expect(getTheme()).toBe('dark');
});
it('follows system changes until the user chooses explicitly and removes its listener',()=>{
 let change=()=>{};const remove=vi.fn();const media={matches:false,addEventListener:(_name:string,fn:()=>void)=>{change=fn;},removeEventListener:remove};vi.spyOn(window,'matchMedia').mockReturnValue(media as unknown as MediaQueryList);
 dispose=initializeTheme();expect(getTheme()).toBe('light');media.matches=true;change();expect(getTheme()).toBe('dark');setTheme('light');change();expect(getTheme()).toBe('light');dispose();expect(remove).toHaveBeenCalled();dispose=()=>{};
});
it('keeps switching functional if local storage is unavailable',()=>{vi.spyOn(window.localStorage,'getItem').mockImplementation(()=>{throw new Error('blocked');});vi.spyOn(window.localStorage,'setItem').mockImplementation(()=>{throw new Error('blocked');});dispose=initializeTheme();expect(()=>setTheme('dark')).not.toThrow();expect(getTheme()).toBe('dark');});
it('updates existing browser color metadata',()=>{const meta=document.createElement('meta');meta.name='theme-color';document.head.append(meta);applyTheme('light');expect(meta.content).toBe('#f4f1eb');applyTheme('dark');expect(meta.content).toBe('#303237');meta.remove();});
