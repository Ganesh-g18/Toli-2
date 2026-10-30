import { expect, it } from 'vitest';
import { createExecutiveShell, createExecutiveCabin, createExecutiveRoof } from '@/lib/executive-sedan-geometry';

it('keeps body and cabin centered, finite and inside the established camera envelope at every quality',()=>{
 for(const count of [12,20,32,64])for(const geometry of [createExecutiveShell(count),createExecutiveCabin(count),createExecutiveRoof()]){
  const positions=geometry.getAttribute('position'),normals=geometry.getAttribute('normal');
  for(let i=0;i<positions.count;i++)for(const value of [positions.getX(i),positions.getY(i),positions.getZ(i),normals.getX(i),normals.getY(i),normals.getZ(i)])expect(Number.isFinite(value)).toBe(true);
  geometry.computeBoundingBox();const bounds=geometry.boundingBox!;
  expect(bounds.min.x).toBeGreaterThan(-2.5);expect(bounds.max.x).toBeLessThan(2.5);
  expect(bounds.max.y).toBeLessThan(1.8);expect(bounds.min.y).toBeGreaterThan(.6);
  expect(bounds.max.z).toBeLessThan(1.1);expect(bounds.min.z).toBeCloseTo(-bounds.max.z,5);
  geometry.dispose();
 }
});
it('preserves the long four-door greenhouse and paint roof above the hood at low quality',()=>{
 const shell=createExecutiveShell(20),cabin=createExecutiveCabin(20),roof=createExecutiveRoof();
 for(const g of [shell,cabin,roof])g.computeBoundingBox();
 expect(cabin.boundingBox!.max.x-cabin.boundingBox!.min.x).toBeGreaterThan(2.5);
 expect(cabin.boundingBox!.max.y-shell.boundingBox!.max.y).toBeGreaterThan(.4);
 expect(roof.boundingBox!.max.y).toBeGreaterThan(cabin.boundingBox!.max.y);
 for(const g of [shell,cabin,roof])g.dispose();
});
