import {afterEach,expect,it,vi} from 'vitest';
import * as THREE from 'three';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {workshopAsset,workshopUrl} from '@/lib/workshop/asset';
import {demandFrames} from '@/lib/workshop/lifecycle';
import {disposeWorkshop,loadWorkshopBytes,preserveRendererSettings} from '@/lib/workshop/scene';
afterEach(()=>vi.unstubAllGlobals());
it('registers only the exact approved v2 with an identical runtime copy',()=>{
 const approved=readFileSync(workshopAsset.source),runtime=readFileSync('public/'+workshopAsset.url);
 expect(runtime.equals(approved)).toBe(true);expect(runtime.length).toBe(workshopAsset.bytes);expect(createHash('sha256').update(runtime).digest('hex')).toBe(workshopAsset.sha256);expect(workshopUrl()).toContain('models/toli-workshop-web-v2.glb');
});
it('preserves approved artwork, traditional components and retained public assets during project separation',()=>{
 const baseline=JSON.parse(readFileSync('src/test/fixtures/separation-protected.json','utf8')) as Record<string,string>;
 for(const [file,hash] of Object.entries(baseline))expect(createHash('sha256').update(readFileSync(file)).digest('hex'),file).toBe(hash);
});
it('keeps workshop imports/preloads out of the frozen Hero/Navbar and application startup',()=>{
 for(const p of ['src/App.tsx','src/components/Hero.tsx','src/components/Navbar.tsx'])expect(readFileSync(p,'utf8')).not.toMatch(/workshop\/|workshop-web-v2/);
});
it('gates the standalone tool before importing its runtime and does not add a production route',()=>{
 const html=readFileSync('tools/3d/workshop-preview.html','utf8');expect(html).toMatch(/if\(import.meta.env.DEV\)/);expect(html).toMatch(/await import/);expect(readFileSync('vite.config.ts','utf8')).not.toContain('workshop-preview');
});
it('injects renderer ownership into the scene rather than creating a second renderer there',()=>{
 const scene=readFileSync('src/lib/workshop/scene.ts','utf8');expect(scene).not.toContain('new THREE.WebGLRenderer');expect(scene).not.toMatch(/prewarmVehicle|from.*Hero|createVehicleScene\(/);expect(scene).not.toMatch(/autoRotate\s*=\s*true|enableDamping\s*=\s*true/);
});
it('coalesces invalidations, settles idle and refuses offscreen frames',()=>{
 let callback:FrameRequestCallback=()=>{},allowed=true;const request=vi.fn((cb:FrameRequestCallback)=>{callback=cb;return 7;}),cancel=vi.fn(),draw=vi.fn();const f=demandFrames(draw,()=>allowed,request,cancel);
 f.invalidate();f.invalidate();expect(request).toHaveBeenCalledOnce();callback(0);expect(draw).toHaveBeenCalledOnce();expect(f.pending()).toBe(false);expect(request).toHaveBeenCalledOnce();allowed=false;f.invalidate();expect(request).toHaveBeenCalledOnce();
});
it('cancels a pending frame and is safe under repeated unmount',()=>{
 const cancel=vi.fn(),request=vi.fn(()=>9),draw=vi.fn();const f=demandFrames(draw,()=>true,request,cancel);f.invalidate();f.dispose();f.dispose();f.invalidate();expect(cancel).toHaveBeenCalledExactlyOnceWith(9);expect(request).toHaveBeenCalledOnce();expect(draw).not.toHaveBeenCalled();
});
it('keeps reduced-motion architecture available rather than branching to a substitute',()=>{
 const source=readFileSync('src/lib/workshop/scene.ts','utf8');expect(source).toContain('parseAsync(bytes');expect(source).not.toMatch(/if\s*\([^)]*reducedMotion|if\s*\([^)]*prefers-reduced-motion/);expect(source).not.toContain('autoRotate=true');
});
it('shares one download across repeated entry and caches a permanent failure without retry loops',async()=>{
 const fetch=vi.fn().mockResolvedValueOnce({ok:true,arrayBuffer:async()=>new ArrayBuffer(16)}).mockResolvedValueOnce({ok:false});vi.stubGlobal('fetch',fetch);
 const first=loadWorkshopBytes('/test-workshop-good.glb');expect(loadWorkshopBytes('/test-workshop-good.glb')).toBe(first);await first;expect(fetch).toHaveBeenCalledOnce();
 await expect(loadWorkshopBytes('/test-workshop-fail.glb')).rejects.toThrow('unavailable');await expect(loadWorkshopBytes('/test-workshop-fail.glb')).rejects.toThrow('unavailable');expect(fetch).toHaveBeenCalledTimes(2);
});
it('disposes shared geometry/material/texture/ImageBitmap exactly once and clears scene references',()=>{
 const geometry=new THREE.BoxGeometry(),texture=new THREE.Texture(),close=vi.fn();texture.image={close};const material=new THREE.MeshStandardMaterial({map:texture});const root=new THREE.Group();root.add(new THREE.Mesh(geometry,material),new THREE.Mesh(geometry,material));const gd=vi.spyOn(geometry,'dispose'),md=vi.spyOn(material,'dispose'),td=vi.spyOn(texture,'dispose');disposeWorkshop(root);disposeWorkshop(root);expect(gd).toHaveBeenCalledOnce();expect(md).toHaveBeenCalledOnce();expect(td).toHaveBeenCalledOnce();expect(close).toHaveBeenCalledOnce();expect(root.children).toHaveLength(0);
});

it('restores caller-owned renderer settings without disposing or creating a context',()=>{
 const owner={outputColorSpace:THREE.SRGBColorSpace,toneMapping:THREE.ACESFilmicToneMapping,toneMappingExposure:1.2,shadowMap:{enabled:false,type:THREE.PCFShadowMap},getPixelRatio:()=>1.5,getSize:(v:THREE.Vector2)=>v.set(900,600),setPixelRatio:vi.fn(),setSize:vi.fn()};const restore=preserveRendererSettings(owner as unknown as THREE.WebGLRenderer);owner.toneMappingExposure=.7;owner.shadowMap.enabled=true;restore();expect(owner.toneMappingExposure).toBe(1.2);expect(owner.shadowMap.enabled).toBe(false);expect(owner.setPixelRatio).toHaveBeenCalledWith(1.5);expect(owner.setSize).toHaveBeenCalledWith(900,600,false);
});
