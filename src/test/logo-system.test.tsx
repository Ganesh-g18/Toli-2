import {cleanup,render,screen,fireEvent} from '@testing-library/react';
import {afterEach,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import ToliLogoPill from '@/components/ToliLogoPill';
import ThemeToggle from '@/components/ThemeToggle';
import {applyTheme} from '@/lib/site-theme';
afterEach(()=>{cleanup();document.documentElement.dataset.theme='dark';});
it.each(['navigation','standard','compact'] as const)('preserves supplied artwork and noninteractive semantics for %s size across themes',size=>{
 render(<><ToliLogoPill size={size}/><ThemeToggle/></>);applyTheme('dark');
 const logo=screen.getByRole('img',{name:'Toli Motors'}),pill=logo.parentElement!;
 expect(pill).toHaveClass('toli-logo-pill',`toli-logo-pill-${size}`);expect(pill).not.toHaveAttribute('tabindex');expect(pill).not.toHaveAttribute('role','button');
 expect(logo).toHaveAttribute('width','1483');expect(logo).toHaveAttribute('height','352');expect(logo).toHaveAttribute('src',expect.stringContaining('big-transparent.png'));
 fireEvent.click(screen.getByRole('button',{name:'Switch to light theme'}));expect(document.documentElement).toHaveAttribute('data-theme','light');expect(logo.parentElement).toBe(pill);
 fireEvent.click(screen.getByRole('button',{name:'Switch to dark theme'}));expect(document.documentElement).toHaveAttribute('data-theme','dark');expect(logo.parentElement).toBe(pill);
});
it('keeps the supplied logo bytes unchanged',()=>{
 expect(createHash('sha256').update(readFileSync('src/assets/big-transparent.png')).digest('hex')).toBe('4809ffd3bde9be888071d5b4c3e90a0f58e627cc2a07f20c49e625a38b1cf590');
});
it('routes every existing full-brand presentation through the shared component',()=>{
 for(const file of ['components/journey/ExperienceNavigation.tsx','components/Navbar.tsx','components/Footer.tsx','components/LegalPageShell.tsx','components/ServiceRequestDialog.tsx','pages/ServiceRequest.tsx']){
  const source=readFileSync(`src/${file}`,'utf8');expect(source).toContain('<ToliLogoPill');expect(source).not.toContain('big-transparent.png');expect(source).not.toContain('toli-logo-dock');
 }
});
