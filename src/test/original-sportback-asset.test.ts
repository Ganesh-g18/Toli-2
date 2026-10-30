import {readFileSync} from 'node:fs';
import {expect,it} from 'vitest';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {ACTIVE_VEHICLE_MODEL} from '@/lib/vehicle-model/contract';
import {vehicleRegistry} from '@/lib/vehicle-model/registry';
const path='public/models/toli-sportback/toli-atelier-sportback.glb';
const audit=JSON.parse(readFileSync(path.replace('.glb','.audit.json'),'utf8'));
it('parses the actual original GLB and verifies its dimensional assembly hierarchy',async()=>{
 const bytes=readFileSync(path),buffer=new ArrayBuffer(bytes.byteLength);new Uint8Array(buffer).set(bytes);
 const gltf=await new GLTFLoader().parseAsync(buffer,'');
 const root=gltf.scene.getObjectByName('VehicleRoot');expect(root).toBeDefined();
 for(const name of ['Body','Glass','Interior','Hood','Door_L','Door_R','Mirror_L','Mirror_R','Wheel_FL','Wheel_FR','Wheel_RL','Wheel_RR','Brake_FL','Brake_FR','Brake_RL','Brake_RR','Underhood'])expect(root!.getObjectByName(name)).toBeDefined();
 let meshes=0,triangles=0;const materials=new Set();root!.traverse(node=>{if(node instanceof THREE.Mesh){meshes++;triangles+=(node.geometry.index?.count??node.geometry.attributes.position.count)/3;materials.add(node.material);expect([...node.geometry.attributes.position.array].every(Number.isFinite)).toBe(true);}});
 expect(meshes).toBe(audit.meshes);expect(triangles).toBe(audit.triangles);expect(materials.size).toBe(audit.materials);expect(bytes.byteLength).toBe(audit.bytes);
 const bounds=new THREE.Box3().setFromObject(root!),size=bounds.getSize(new THREE.Vector3());expect(size.x).toBeGreaterThan(4.7);expect(size.x).toBeLessThan(5.1);expect(size.y).toBeGreaterThan(1.4);expect(bounds.min.y).toBeCloseTo(0,4);
 for(const tag of ['FL','FR','RL','RR']){const wheel=root!.getObjectByName('Wheel_'+tag)!;expect(new THREE.Box3().setFromObject(wheel).min.y).toBeCloseTo(0,4);}
});
it('activates the original only under the explicit temporary override, never in Hero or Navbar',()=>{
 expect(ACTIVE_VEHICLE_MODEL?.url).toBe('models/vehicles/toli-preproduction-sedan.glb');expect(vehicleRegistry.sedan.status).toBe('preproduction');
 const hero=readFileSync('src/components/Hero.tsx','utf8'),nav=readFileSync('src/components/Navbar.tsx','utf8');
 for(const source of [hero,nav]){expect(source).not.toContain('toli-atelier');expect(source).not.toContain('generate-toli-sportback');}
});
it('retains valid shading normals and distinct paint, rubber and glazing properties',async()=>{
 const bytes=readFileSync(path),buffer=new ArrayBuffer(bytes.byteLength);new Uint8Array(buffer).set(bytes);
 const {scene}=await new GLTFLoader().parseAsync(buffer,'');let vertices=0;const materials=new Map<string,THREE.MeshStandardMaterial>();
 scene.traverse(node=>{if(!(node instanceof THREE.Mesh))return;const normal=node.geometry.getAttribute('normal');expect(normal.count).toBe(node.geometry.getAttribute('position').count);vertices+=normal.count;
  for(let i=0;i<normal.count;i++){const length=Math.hypot(normal.getX(i),normal.getY(i),normal.getZ(i));if(!Number.isFinite(length)||Math.abs(length-1)>.02)throw new Error(`Invalid shading normal in ${node.name}`);}
  for(const material of Array.isArray(node.material)?node.material:[node.material])materials.set(material.name,material);
 });
 expect(vertices).toBe(audit.vertices);const rubber=materials.get('Tire_rubber')??materials.get('Tire rubber');const paint=materials.get('Graphite_metallic_clearcoat')??materials.get('Graphite metallic clearcoat');const glass=materials.get('Smoked_automotive_glass')??materials.get('Smoked automotive glass');
 expect(rubber).toBeDefined();expect(rubber!.metalness).toBe(0);expect(rubber!.roughness).toBeGreaterThan(.85);expect(paint!.metalness).toBeGreaterThan(.5);expect(paint).toBeInstanceOf(THREE.MeshPhysicalMaterial);expect(glass!.transparent).toBe(true);expect(glass!.opacity).toBeGreaterThan(.5);expect(glass!.opacity).toBeLessThan(1);
});
