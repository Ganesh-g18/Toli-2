import * as THREE from 'three';
import {expect,it,vi} from 'vitest';
import {adaptVehicleModel,resolveNode} from '@/lib/vehicle-model/adapter';
import {loadVehicleModel} from '@/lib/vehicle-model/load';
import {importedFixture} from './fixtures/imported-vehicle';
it('requires a licensed asset instead of producing a procedural fallback',async()=>{
 const fetch=vi.spyOn(globalThis,'fetch');await expect(loadVehicleModel(new THREE.Texture(),null)).rejects.toThrow('licensed');expect(fetch).not.toHaveBeenCalled();fetch.mockRestore();
});
it('rejects missing/ambiguous actual node mappings and unreviewed rights',()=>{
 const {root,manifest}=importedFixture();expect(()=>resolveNode(root,['invented-door'])).toThrow('Missing');manifest.reviewedForProject=false;expect(()=>adaptVehicleModel(root,manifest,new THREE.Texture())).toThrow('review');
});
it('adapts actual mapped nodes, preserves hinges/calipers, isolates materials and resets parts',()=>{
 const {root,manifest}=importedFixture(),env=new THREE.Texture(),left=root.getObjectByName('Artist_leftDoor')!,wheel=root.getObjectByName('Artist_Wheel_0')!,brake=root.getObjectByName('Artist_Caliper_0')!;
 const model=adaptVehicleModel(root,manifest,env);
 expect(left.parent).toBe(model.inspection.parts.leftDoor);expect(wheel.parent).toBe(model.wheels[0].roll);expect(brake.parent).toBe(model.wheels[0].steer);
 const body=root.getObjectByName('Artist_Body') as THREE.Mesh,tyre=wheel as THREE.Mesh;
 expect(body.material).toBeInstanceOf(THREE.MeshPhysicalMaterial);expect(body.material).not.toBe(tyre.material);expect((tyre.material as THREE.MeshStandardMaterial).metalness).toBe(0);
 const hinge=model.inspection.parts.leftDoor.position.clone();for(const part of ['leftDoor','rightDoor','hood','mirrors'] as const)model.inspection.command(part);for(let i=0;i<160;i++)model.inspection.update(16);
 expect(model.inspection.parts.leftDoor.rotation.y).toBeCloseTo(THREE.MathUtils.degToRad(58));expect(model.inspection.parts.leftDoor.position).toEqual(hinge);expect(model.inspection.parts.hood.rotation.z).toBeCloseTo(THREE.MathUtils.degToRad(42));
 model.wheels[0].roll.rotation.z=1;expect(brake.rotation.z).toBeCloseTo(0);expect(new THREE.Box3().setFromObject(model.root,true).min.y).toBeCloseTo(0);
 model.inspection.command('reset');for(let i=0;i<160;i++)model.inspection.update(16,true);expect(model.inspection.parts.hood.rotation.z).toBe(0);
 const shared=vi.spyOn(env,'dispose'),geometry=vi.spyOn((wheel as THREE.Mesh).geometry,'dispose');model.dispose();model.dispose();expect(shared).not.toHaveBeenCalled();expect(geometry).toHaveBeenCalledOnce();
});
