import { useSyncExternalStore } from 'react';
import { Moon,Sun } from 'lucide-react';
import { getTheme,setTheme,subscribeTheme } from '@/lib/site-theme';
export default function ThemeToggle() {
 const theme=useSyncExternalStore(subscribeTheme,getTheme,()=> 'dark' as const);
 const label=theme==='dark'?'Switch to light theme':'Switch to dark theme';
 return <button type="button" className="theme-toggle" aria-label={label} title={label} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={17} aria-hidden="true"/>:<Moon size={17} aria-hidden="true"/>}</button>;
}
