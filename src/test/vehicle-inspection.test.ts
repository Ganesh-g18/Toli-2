import * as THREE from 'three';
import {expect,it} from 'vitest';
import {createCodedVehicle} from '@/lib/premium-car';
import {closedInspection,extractRegion} from '@/lib/premium-car/inspection';
import {createVehicleRotation} from '@/lib/vehicle-rotation';
const settle=(car:ReturnType<typeof createCodedVehicle>,reduced=false)=>{for(let i=0;i<160;i++)car.inspection.update(16,reduced);};
it('opens real door and bonnet skins around fixed hinge origins, then resets all assemblies',()=>{
 const car=createCodedVehicle(new THREE.Texture()),{inspection}=car,{parts}=inspection;
 expect(inspection.read()).toEqual(closedInspection());
 const hinge=parts.leftDoor.position.clone();
 for(const key of ['leftDoor','rightDoor','hood','mirrors'] as const)inspection.command(key);
 expect(inspection.update(16)).toBe(true);expect(parts.leftDoor.rotation.y).toBeGreaterThan(0);expect(parts.leftDoor.rotation.y).toBeLessThan(1);
 settle(car);expect(parts.leftDoor.rotation.y).toBeCloseTo(THREE.MathUtils.degToRad(58));expect(parts.rightDoor.rotation.y).toBeCloseTo(-THREE.MathUtils.degToRad(58));expect(parts.hood.rotation.z).toBeCloseTo(THREE.MathUtils.degToRad(42));
 expect(parts.leftMirror.parent).toBe(parts.leftDoor);expect(parts.rightMirror.parent).toBe(parts.rightDoor);expect(parts.leftDoor.position).toEqual(hinge);
 expect(parts.leftMirror.rotation.y).toBeCloseTo(-THREE.MathUtils.degToRad(58));
 expect(parts.hood.getObjectByName('hinged-bonnet-skin')).toBeDefined();expect(parts.leftDoor.children.some(n=>n.name.includes('door-inner-panel'))).toBe(true);
 const rotation=createVehicleRotation();rotation.begin();rotation.drag(1300,16);rotation.end(true);expect(rotation.read().yaw).toBeGreaterThan(Math.PI*2);expect(inspection.read().leftDoor).toBe(true);
 inspection.command('reset');settle(car,true);expect(inspection.read()).toEqual(closedInspection());expect(parts.hood.rotation.z).toBe(0);expect(parts.leftDoor.rotation.y).toBe(0);expect(parts.leftMirror.rotation.y).toBeCloseTo(0);car.dispose();
});
it('clips actual panel area out of the body without duplicating or losing surface area',()=>{
 const source=new THREE.PlaneGeometry(4,2),{panel,rest}=extractRegion(source,new THREE.Vector3(-1,-2,-1),new THREE.Vector3(1,2,1));
 const area=(g:THREE.BufferGeometry)=>{const p=g.getAttribute('position'),idx=g.index;let sum=0;for(let i=0;i<(idx?.count??p.count);i+=3){const v=[0,1,2].map(j=>new THREE.Vector3().fromBufferAttribute(p,idx?idx.getX(i+j):i+j));sum+=v[1].sub(v[0]).cross(v[2].sub(v[0])).length()/2;}return sum;};
 expect(area(panel)).toBeCloseTo(4);expect(area(rest)).toBeCloseTo(4);expect(area(panel)+area(rest)).toBeCloseTo(area(source));source.dispose();panel.dispose();rest.dispose();
});
it('returns gradually to the initial orientation and supports keyboard-sized 45-degree steps',()=>{
 const r=createVehicleRotation();r.begin();r.drag(400,16);r.end(true);r.reset();const before=Math.abs(r.read().yaw);r.advance(16);expect(Math.abs(r.read().yaw)).toBeLessThan(before);expect(r.read().yaw).not.toBe(0);
 for(let i=0;i<200;i++)r.advance(16);expect(r.read().yaw).toBe(0);r.turn();for(let i=0;i<200;i++)r.advance(16,true);expect(r.read().yaw).toBeCloseTo(Math.PI/4);
});
