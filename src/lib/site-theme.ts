export type SiteTheme = 'dark' | 'light';
export const THEME_KEY = 'toli-theme';
export const THEME_EVENT = 'toli-theme-change';
export function storedTheme(): SiteTheme | undefined {
 try {const value=window.localStorage.getItem(THEME_KEY);return value==='dark'||value==='light'?value:undefined;} catch {return undefined;}
}
export function preferredTheme(): SiteTheme {return storedTheme()??(window.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light');}
export function getTheme(): SiteTheme {return document.documentElement.dataset.theme==='light'?'light':'dark';}
export function applyTheme(theme:SiteTheme) {
 const root=document.documentElement;root.dataset.theme=theme;root.classList.toggle('dark',theme==='dark');root.style.colorScheme=theme;
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#303237':'#f4f1eb');
 window.dispatchEvent(new Event(THEME_EVENT));
}
let transitionTimer:ReturnType<typeof setTimeout>|undefined;
let explicit:SiteTheme|undefined;
export function setTheme(theme:SiteTheme) {
 explicit=theme;try {window.localStorage.setItem(THEME_KEY,theme);} catch {/* An unavailable store must not prevent switching. */}
 const root=document.documentElement;root.classList.add('theme-changing');applyTheme(theme);
 clearTimeout(transitionTimer);transitionTimer=setTimeout(()=>root.classList.remove('theme-changing'),280);
}
export function subscribeTheme(listener:()=>void) {window.addEventListener(THEME_EVENT,listener);return()=>window.removeEventListener(THEME_EVENT,listener);}
export function initializeTheme() {
 explicit=storedTheme();applyTheme(preferredTheme());
 const media=window.matchMedia?.('(prefers-color-scheme: dark)');
 const update=()=>{if(!explicit)applyTheme(media?.matches?'dark':'light');};
 const storage=(event:StorageEvent)=>{if(event.key===THEME_KEY||event.key===null){explicit=storedTheme();applyTheme(preferredTheme());}};
 media?.addEventListener('change',update);window.addEventListener('storage',storage);
 return()=>{media?.removeEventListener('change',update);window.removeEventListener('storage',storage);clearTimeout(transitionTimer);document.documentElement.classList.remove('theme-changing');};
}
