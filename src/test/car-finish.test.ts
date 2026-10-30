import * as THREE from 'three';
import {expect,it,vi} from 'vitest';
import {carMaterials,PAINT_PRESETS} from '@/lib/premium-car/materials';
import {createStudioRadiance,createContactFalloff} from '@/lib/premium-car/studio-environment';
import {frontBumper,intakeBack,intakeWalls,bumperX} from '@/lib/premium-car/fascia';
import {createCodedVehicle} from '@/lib/premium-car';
import {createFloorReflection} from '@/lib/premium-car/floor-reflection';
it('uses original HDR headroom, broad achromatic highlights and restrained colored bounce',()=>{
 const texture=createStudioRadiance(),data=texture.image.data as Uint16Array;let peak=0,redDominant=0;
 for(let i=0;i<data.length;i+=4){const r=THREE.DataUtils.fromHalfFloat(data[i]),g=THREE.DataUtils.fromHalfFloat(data[i+1]);expect(Number.isFinite(r+g)).toBe(true);peak=Math.max(peak,r);if(r>g*2)redDominant++;}
 expect(peak).toBeGreaterThan(2);expect(peak).toBeLessThan(8);expect(redDominant/data.length*4).toBeLessThan(.25);expect(texture.type).toBe(THREE.HalfFloatType);texture.dispose();
});
it('separates pigment, clearcoat, glass, lenses and rubber and disposes owned roughness maps once',()=>{
 const env=new THREE.Texture(),car=createCodedVehicle(env),paint=[...car.materials].find(m=>m.name==='Gunmetal paint') as THREE.MeshPhysicalMaterial;
 expect(paint.color.getHex()).toBe(PAINT_PRESETS.gunmetal.color);expect(paint.roughness).toBeGreaterThan(paint.clearcoatRoughness);expect(paint.metalness).toBeLessThan(.8);
 const glass=[...car.materials].find(m=>m.name==='Glass')!,lens=[...car.materials].find(m=>m.name==='Lamp lens')!,rubber=[...car.materials].find(m=>m.name==='Performance rubber')!;
 expect(lens.opacity).toBeLessThan(glass.opacity);expect(glass.userData.baseOpacity).toBe(glass.opacity);expect(rubber.metalness).toBe(0);expect(rubber.roughness).toBeGreaterThan(.85);
 const rough=vi.spyOn(paint.roughnessMap!,'dispose'),shared=vi.spyOn(env,'dispose');car.dispose();car.dispose();expect(rough).toHaveBeenCalledOnce();expect(shared).not.toHaveBeenCalled();
});
it('opens the front bumper and places the intake back behind its actual curved skin',()=>{
 const bumper=frontBumper(),back=intakeBack(),walls=intakeWalls(),p=bumper.getAttribute('position'),idx=bumper.index!;
 for(let i=0;i<idx.count;i+=3){let y=0,z=0;for(let j=0;j<3;j++){y+=p.getY(idx.getX(i+j))/3;z+=p.getZ(idx.getX(i+j))/3;}expect(Math.abs(z)<.6&&y>.4&&y<.52).toBe(false);}
 const q=back.getAttribute('position');for(let i=0;i<q.count;i++)expect(bumperX(q.getY(i),q.getZ(i))-q.getX(i)).toBeCloseTo(.085,5);
 // Wall rings stay uncapped, so they cannot silently fill the aperture again.
 expect(walls.index!.count).toBe(walls.getAttribute('position').count/2*6);for(const g of [bumper,back,walls])g.dispose();
});
it('has a continuous soft contact falloff and reuses geometry in the restrained reflection',()=>{
 const texture=createContactFalloff(),data=texture.image.data as Uint8Array;expect(data[3]).toBe(0);expect(data[(32*64+32)*4+3]).toBeGreaterThan(240);texture.dispose();
 const car=createCodedVehicle(new THREE.Texture()),reflection=createFloorReflection(car.root,false),original=new Set<THREE.BufferGeometry>();car.root.traverse(n=>{if(n instanceof THREE.Mesh)original.add(n.geometry);});
 reflection.root.traverse(n=>{if(n instanceof THREE.Mesh)expect(original.has(n.geometry)).toBe(true);});reflection.update(1,false);expect(reflection.root.visible).toBe(true);reflection.update(0,false);expect(reflection.root.visible).toBe(false);reflection.dispose();car.dispose();
});

it('places neutral studio highlights above the horizon and burgundy bounce below it',()=>{
 const texture=createStudioRadiance(),data=texture.image.data as Uint16Array;
 let upperNeutral=0,lowerNeutral=0,upperRed=0,lowerRed=0;
 for(let y=0;y<128;y++)for(let x=0;x<256;x++){
  const i=(y*256+x)*4,r=THREE.DataUtils.fromHalfFloat(data[i]),g=THREE.DataUtils.fromHalfFloat(data[i+1]);
  if(y>=64){upperNeutral+=g;upperRed+=r-g;}else{lowerNeutral+=g;lowerRed+=r-g;}
 }
 expect(upperNeutral).toBeGreaterThan(lowerNeutral*2);expect(lowerRed).toBeGreaterThan(upperRed*2);texture.dispose();
});
