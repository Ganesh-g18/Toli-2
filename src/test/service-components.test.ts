import * as THREE from 'three';
import {expect,it} from 'vitest';
import {roundedCase} from '@/lib/service-components';
import {buildWheels} from '@/lib/premium-car/wheels';
import {carMaterials} from '@/lib/premium-car/materials';
it('builds a rounded enclosure with finite smooth normals at the intended scale',()=>{
 const g=roundedCase(.52,.30,.42,.02);g.computeBoundingBox();const size=g.boundingBox!.getSize(new THREE.Vector3());expect(size.y).toBeCloseTo(.30,5);expect(size.x).toBeLessThan(.54);expect(size.z).toBeLessThan(.44);
 const p=g.getAttribute('position'),n=g.getAttribute('normal');for(let i=0;i<p.count;i++){expect(Number.isFinite(p.getX(i)+p.getY(i)+p.getZ(i))).toBe(true);expect(Math.hypot(n.getX(i),n.getY(i),n.getZ(i))).toBeCloseTo(1,4);}g.dispose();
});
it('shares shaped tires and drilled rotors while keeping calipers stationary',()=>{
 const materials=carMaterials(new THREE.Texture()),owned=new Set<THREE.BufferGeometry>(),factory=buildWheels(materials,g=>{owned.add(g);return g;}),a=factory.create(1.6,.96,1.02),b=factory.create(-1.6,.96,1.02);
 const tyre=a.roll.getObjectByName('sculpted-tire') as THREE.Mesh,rotor=a.roll.getObjectByName('brake-disc') as THREE.Mesh;
 expect(rotor.geometry).toBeInstanceOf(THREE.ExtrudeGeometry);expect((rotor.geometry as THREE.ExtrudeGeometry).parameters.shapes).toBeInstanceOf(THREE.Shape);
 expect(((rotor.geometry as THREE.ExtrudeGeometry).parameters.shapes as THREE.Shape).holes).toHaveLength(17);
 expect((b.roll.getObjectByName('sculpted-tire') as THREE.Mesh).geometry).toBe(tyre.geometry);expect(materials.rubber.metalness).toBe(0);expect(materials.rubber.roughness).toBeGreaterThan(.85);
 a.roll.rotation.z=1;expect(a.steer.getObjectByName('fixed-red-caliper')!.parent).toBe(a.steer);expect(a.steer.getObjectByName('fixed-red-caliper')!.rotation.z).toBeCloseTo(-.2);
 owned.forEach(g=>g.dispose());Object.values(materials).forEach(m=>m.dispose());materials.paint.roughnessMap!.dispose();
});
