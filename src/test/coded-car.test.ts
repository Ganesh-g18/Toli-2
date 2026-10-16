import {GT_DIMENSIONS,BODY_STATIONS,stationAt} from '@/lib/premium-car/design';
import * as THREE from 'three';
import {expect,it,vi} from 'vitest';
import {createCodedVehicle} from '@/lib/premium-car';
import {archFloor,canopySurface,cabinAt,bodyAtX,wheelWell,bodySamples,sculptedBody} from '@/lib/premium-car/surfaces';
it.each([false,true])('builds finite original geometry with floor contact and real, shared wheel assemblies (compact=%s)',compact=>{
 const environment=new THREE.Texture(),car=createCodedVehicle(environment,compact),bounds=new THREE.Box3().setFromObject(car.root);
 expect(bounds.min.y).toBeGreaterThan(.005);expect(bounds.min.y).toBeLessThan(.025);expect(bounds.max.x-bounds.min.x).toBeGreaterThan(4.9);expect(bounds.max.y).toBeGreaterThan(1.45);
 expect(car.wheels).toHaveLength(4);const first=car.wheels[0].roll.getObjectByName('sculpted-tire') as THREE.Mesh;
 expect((car.wheels[1].roll.getObjectByName('sculpted-tire') as THREE.Mesh).geometry).toBe(first.geometry);
 for(const {roll,steer} of car.wheels){expect(steer.getObjectByName('fixed-red-caliper')?.parent).toBe(steer);expect(roll.getObjectByName('turbine-spokes')).toBeDefined();expect(roll.getObjectByName('brake-disc')).toBeDefined();}
 let triangles=0,meshes=0;car.root.traverse(node=>{if(!(node instanceof THREE.Mesh))return;meshes++;const p=node.geometry.getAttribute('position'),n=node.geometry.getAttribute('normal');triangles+=(node.geometry.index?.count??p.count)/3;for(let i=0;i<p.count;i++){expect(Number.isFinite(p.getX(i)+p.getY(i)+p.getZ(i))).toBe(true);expect(Number.isFinite(n.getX(i)+n.getY(i)+n.getZ(i))).toBe(true);}});
 expect(meshes).toBeLessThan(60);expect(triangles).toBeLessThan(100000);expect(archFloor(1.57)).toBeGreaterThan(.94);expect(archFloor(0)).toBe(.28);
 const dispose=vi.spyOn(first.geometry,'dispose'),env=vi.spyOn(environment,'dispose');car.dispose();car.dispose();expect(dispose).toHaveBeenCalledOnce();expect(env).not.toHaveBeenCalled();
});
it('keeps automotive materials restrained and uses no bitmap material maps',()=>{
 const car=createCodedVehicle(new THREE.Texture());
 const paint=[...car.materials].find(m=>m.name==='Gunmetal paint') as THREE.MeshPhysicalMaterial;
 expect(paint.metalness).toBeGreaterThan(.4);expect(paint.metalness).toBeLessThan(.8);expect(paint.clearcoat).toBeGreaterThan(.75);expect(paint.clearcoatRoughness).toBeLessThan(paint.roughness);expect(paint.ior).toBe(1.5);expect(paint.roughnessMap).toBeInstanceOf(THREE.DataTexture);
 const glass=[...car.materials].find(m=>m.name==='Glass')!;expect(glass.opacity).toBeGreaterThan(.3);expect(glass.opacity).toBeLessThan(.8);
 for(const m of car.materials){expect(m.map).toBeNull();expect(m.normalMap).toBeNull();}car.dispose();
});

it('closes the roof to the side-glass boundary and keeps fender lookup on the body profile',()=>{
 const roof=canopySurface(.26,.62,32,true),p=roof.getAttribute('position');
 for(let row=0;row<=32;row++)for(const col of [0,12]){
  const edge=cabinAt(.26+.36*row/32,col===0?-1:1,.003),i=row*13+col;
  expect(p.getX(i)).toBeCloseTo(edge.x,5);expect(p.getY(i)).toBeCloseTo(edge.y,5);expect(p.getZ(i)).toBeCloseTo(edge.z,5);
 }
 for(const x of [-2,-1.55,0,1.57,2])expect(bodyAtX(x).x).toBeCloseTo(x,5);
 roof.dispose();
});
it('includes rear cabin volumes beneath the backlight',()=>{
 const car=createCodedVehicle(new THREE.Texture());let rear=false,shelf=false;
 car.root.traverse(n=>{rear ||= n.name.includes('rear-seat-back');shelf ||= n.name.includes('rear-parcel-shelf');});
 expect(rear).toBe(true);expect(shelf).toBe(true);car.dispose();
});

it('matches roof and glass normals across both canopy seams',()=>{
 for(const t of [.26,.62]){
  const a=canopySurface(Math.max(0,t-.1),t,8),b=canopySurface(t,Math.min(1,t+.1),8,true);
  const an=a.getAttribute('normal'),bn=b.getAttribute('normal');
  for(let j=0;j<13;j++){
   const av=new THREE.Vector3().fromBufferAttribute(an,8*25+j*2),bv=new THREE.Vector3().fromBufferAttribute(bn,j);
   expect(av.dot(bv)).toBeGreaterThan(.99999);expect(av.y).toBeGreaterThan(0);
  }
  a.dispose();b.dispose();
 }
});
it.each([-1,1])('encloses both wheel wells with a recessed tire-clear liner on side %s',side=>{
 for(const axle of [-1.55,1.57]){
  const {tunnel,backing}=wheelWell(axle,side),p=tunnel.getAttribute('position');
  for(let i=0;i<p.count;i++){
   expect(Math.hypot(p.getX(i)-axle,p.getY(i)-.46)).toBeCloseTo(.478,5);
   expect(Math.abs(p.getZ(i))).toBeGreaterThanOrEqual(.759);expect(Math.abs(p.getZ(i))).toBeLessThan(1.08);
  }
  // Backing sits inward of the tire's inner sidewall, never over its visible face.
  const q=backing.getAttribute('position');for(let i=0;i<q.count;i++)expect(q.getZ(i)).toBeCloseTo(side*.76,5);
  expect(backing.index!.count).toBe(32*3);tunnel.dispose();backing.dispose();
 }
});

it('defines a symmetric sports-GT shell from physical stations with adaptive axle sampling',()=>{
 expect(BODY_STATIONS.length).toBeGreaterThan(12);
 expect(GT_DIMENSIONS.frontAxle-GT_DIMENSIONS.rearAxle).toBeCloseTo(GT_DIMENSIONS.wheelbase);
 expect(stationAt(GT_DIMENSIONS.rearAxle).halfWidth).toBeGreaterThan(stationAt(0).halfWidth);
 for(const station of BODY_STATIONS){const actual=stationAt(station.x);expect(actual.halfWidth).toBeCloseTo(station.halfWidth,7);expect(actual.shoulder).toBeCloseTo(station.shoulder,7);}
 const samples=bodySamples(72);for(let i=1;i<samples.length;i++)expect(samples[i]-samples[i-1]).toBeGreaterThan(1e-6);
 const g=sculptedBody(72),p=g.getAttribute('position'),n=g.getAttribute('normal'),columns=p.count/samples.length;
 for(let row=0;row<samples.length;row++)for(let j=0;j<columns-1;j++){
  const a=row*columns+j,b=row*columns+columns-2-j;
  expect(p.getX(a)).toBeCloseTo(p.getX(b),5);expect(p.getY(a)).toBeCloseTo(p.getY(b),5);expect(p.getZ(a)).toBeCloseTo(-p.getZ(b),5);
  expect(Math.hypot(n.getX(a),n.getY(a),n.getZ(a))).toBeCloseTo(1,4);
 }
 g.dispose();
});
it('uses two coupe doors and one flush handle per side',()=>{
 const car=createCodedVehicle(new THREE.Texture());let names='';car.root.traverse(n=>{names+='/'+n.name;});
 expect(names.match(/flush-door-handle/g)).toHaveLength(2);expect(names.match(/door-shutline/g)).toHaveLength(4);car.dispose();
});
