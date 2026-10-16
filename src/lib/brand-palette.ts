/** Accessible performance-red actions, brighter decorative light, and burgundy atmosphere.
 * The supplied black/red logo remains an unchanged raster asset. */
export const brandPalette={red:'#e52238',hover:'#cf1d32',active:'#b9182e',text:'#ffccd1',focus:'#ffa9b1',error:'#ffa9b1',bright:'#ff2a3d',dark:'#72191f',deep:'#50171c',muted:'#e5223880',surface:'#e522383d',border:'#e5223899',glow:'#e5223833',faded:'#a84b52','faded-dark':'#70383c','faded-raised':'#824146','faded-hover':'#8b474d','primary-deep':'#a81723','very-dark':'#381316',primary:'#d61e2e',wine:'#57131a',dusty:'#8d444a'} as const;
export const brandRed3D=Number.parseInt(brandPalette.red.slice(1),16);
export function applyBrandPalette(root:HTMLElement) {
 root.style.setProperty('--red','353.2308 78.9474% 51.5686%');
 for(const [name,value] of Object.entries(brandPalette))root.style.setProperty(name==='red'?'--brand-red':`--brand-red-${name}`,value);
}
