import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {expect,it,vi,afterEach} from 'vitest';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {loadVehicleModel,prewarmVehicleModel,vehicleAssetUrl} from '@/lib/vehicle-model/load';
import {temporaryVehicle,temporaryVehicleManifest} from '@/lib/vehicle-model/preproduction';
import {adaptVehicleModel} from '@/lib/vehicle-model/adapter';
afterEach(()=>vi.restoreAllMocks());
async function actual(){const bytes=readFileSync('public/'+temporaryVehicle.url);const buffer=new ArrayBuffer(bytes.byteLength);new Uint8Array(buffer).set(bytes);return new GLTFLoader().parseAsync(buffer,'');}
it('uses a byte-identical separate export with valid real geometry, materials and mappings',async()=>{
 const hash=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');expect(hash('public/'+temporaryVehicle.url)).toBe(hash('public/models/toli-sportback/toli-atelier-sportback.glb'));
 const {scene}=await actual();const model=adaptVehicleModel(scene,temporaryVehicleManifest,new THREE.Texture());
 const box=new THREE.Box3().setFromObject(model.root);expect(box.min.y).toBeCloseTo(0,4);expect(box.getSize(new THREE.Vector3()).x).toBeCloseTo(4.87,2);expect(model.wheels).toHaveLength(4);expect(model.materials.size).toBeGreaterThan(8);expect(model.reflectionMeshes.size).toBeGreaterThan(0);model.dispose();
});
it('loads and parses once, cloning independent disposable resources for shared scene remounts',async()=>{
 const gltf=await actual();const spy=vi.spyOn(GLTFLoader.prototype,'loadAsync').mockResolvedValue(gltf);
 await prewarmVehicleModel();const env=new THREE.Texture();const [one,two]=await Promise.all([loadVehicleModel(env),loadVehicleModel(env)]);expect(spy).toHaveBeenCalledOnce();expect(one.root).not.toBe(two.root);
 const cached=gltf.scene.getObjectByName('Tire_FL') as THREE.Mesh;const disposal=vi.spyOn(cached.geometry,'dispose');one.dispose();two.dispose();expect(disposal).not.toHaveBeenCalled();
});
it('caches a genuine failure without retries or invented geometry',async()=>{
 const spy=vi.spyOn(GLTFLoader.prototype,'loadAsync').mockRejectedValue(new Error('404 test'));
 const manifest={...temporaryVehicleManifest,url:'test-missing.glb'};
 await expect(loadVehicleModel(new THREE.Texture(),manifest)).rejects.toThrow('404 test');await expect(loadVehicleModel(new THREE.Texture(),manifest)).rejects.toThrow('404 test');expect(spy).toHaveBeenCalledOnce();
});
it('resolves the deployment base and keeps model initialization out of Hero and Navbar',()=>{
 expect(vehicleAssetUrl(temporaryVehicle.url)).toBe(import.meta.env.BASE_URL+temporaryVehicle.url);
 for(const path of ['src/components/Hero.tsx','src/components/Navbar.tsx'])expect(readFileSync(path,'utf8')).not.toMatch(/loadVehicleModel|temporaryVehicle|preproduction-sedan/);
 const provider=readFileSync('src/components/journey/JourneyProvider.tsx','utf8');expect(provider).toContain("!!f&&f.mode!=='hero'");expect(provider).toContain(':not([data-scene-dock=hero])');
});
