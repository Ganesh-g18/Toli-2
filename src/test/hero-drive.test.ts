import { it,expect } from 'vitest';
import { createHeroDrive,drivePose } from '@/lib/hero-drive';
it('advances through one finite storyboard and ends with coherent stopped outputs',()=>{
 const times=[0,500,1400,2300,3300,3800];expect(times.map(t=>drivePose(t).state)).toEqual(['entering','accelerating','tracking','decelerating','settling','settled']);
 expect(drivePose(3800)).toMatchObject({velocity:0,pitch:0,lift:0,carX:0,steer:0,cameraDolly:0,cameraTurn:0,lightSweep:0,settled:true});
 expect(drivePose(9000)).toEqual(drivePose(3800));
});
it('builds and removes speed smoothly with matching wheel travel and restrained weight transfer',()=>{
 expect(drivePose(500).velocity).toBeLessThan(drivePose(1100).velocity);
 expect(drivePose(2200).velocity).toBeGreaterThan(drivePose(3000).velocity);
 expect(drivePose(900).pitch).toBeGreaterThan(0);expect(drivePose(2600).pitch).toBeLessThan(0);
 for(let t=0;t<=3800;t+=50){const p=drivePose(t);expect(p.wheelAngle).toBeCloseTo(-p.distance/.5);expect(Math.abs(p.pitch)).toBeLessThan(.021);expect(Math.abs(p.lift)).toBeLessThan(.005);}
});
it('uses equivalent active time at 60 and 120 Hz rather than frame count',()=>{
 const a=createHeroDrive(),b=createHeroDrive();for(let i=0;i<120;i++)a.advance(1000/60);for(let i=0;i<240;i++)b.advance(1000/120);
 expect(a.read().distance).toBeCloseTo(b.read().distance,10);expect(a.read().velocity).toBeCloseTo(b.read().velocity,10);
});
it('clamps a suspended-frame delta and does not catch up several seconds',()=>{
 const drive=createHeroDrive();drive.advance(60000);expect(drive.read().progress).toBeLessThan(.02);expect(drive.read().state).toBe('entering');
});
it('interrupts immediately, freezes wheel orientation and cannot replay on return',()=>{
 const drive=createHeroDrive();for(let i=0;i<100;i++)drive.advance(16);const angle=drive.read().wheelAngle;drive.interrupt();
 expect(drive.read()).toMatchObject({state:'settled',wheelAngle:angle,velocity:0,carX:0,pitch:0,settled:true});
 drive.advance(40000);expect(drive.read().wheelAngle).toBe(angle);expect(drive.read().state).toBe('settled');
});
it('shortens and reduces tablet movement while retaining a finite stop',()=>{
 expect(drivePose(2600,true).settled).toBe(true);expect(drivePose(2000,true).distance).toBeLessThan(drivePose(2500).distance);
 expect(drivePose(0,true).carX).toBe(-.65);
});

it('terminates at the accumulated clock cap at both qualities, including the tablet floating-point boundary',()=>{
 for(const tablet of [false,true]){const drive=createHeroDrive(tablet);for(let i=0;i<300;i++)drive.advance(16);
 expect(drive.read()).toMatchObject({state:'settled',progress:1,velocity:0,settled:true});const angle=drive.read().wheelAngle;drive.advance(48);expect(drive.read().wheelAngle).toBe(angle);}
});
