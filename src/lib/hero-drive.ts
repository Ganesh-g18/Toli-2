import { clamp01 } from './vehicle-policy';
export type DriveState = 'entering'|'accelerating'|'tracking'|'decelerating'|'settling'|'settled';
const smooth=(p:number)=>{p=clamp01(p);return p*p*(3-2*p);};
const integral=(p:number)=>{p=clamp01(p);return p*p*p-.5*p*p*p*p;};
export const driveDuration=3800;
/** A visual studio-distance profile, never actual vehicle telemetry.
 * Integrating the same speed curve drives wheels and ground travel. */
export function drivePose(elapsed:number,tablet=false) {
 const rawTime=Math.max(0,elapsed)/(tablet?.68:1);
 const time=rawTime>=driveDuration-1e-6?driveDuration:rawTime, speed=tablet?1.8:2.8;
 const enter=.45,accel=.85,track=.8,brake=1.05,stop=enter+accel+track+brake;
 const t=time/1000;
 let state:DriveState='entering',velocity=0,distance=0,pitch=0,lift=0,braking=0;
 const total=speed*(accel*.5+track+brake*.5);
 if(t>=stop){
  state=t>=3.8?'settled':'settling';distance=total;
  const q=clamp01((t-stop)/(.65));
  const spring=Math.cos(q*Math.PI*3)*Math.exp(-6*q)*(1-smooth(q));
  pitch=-.006*spring;lift=-.004*spring;
 }else if(t>=enter+accel+track){
  state='decelerating';const q=(t-enter-accel-track)/brake;
  velocity=speed*(1-smooth(q));distance=speed*(accel*.5+track+brake*(q-integral(q)));
  pitch=-.014*Math.sin(q*Math.PI)-.006*smooth(q);lift=-.004*smooth(q);braking=Math.sin(q*Math.PI);
 }else if(t>=enter+accel){
  state='tracking';velocity=speed;distance=speed*(accel*.5+t-enter-accel);
 }else if(t>=enter){
  state='accelerating';const q=(t-enter)/accel;
  velocity=speed*smooth(q);distance=speed*accel*integral(q);pitch=.012*Math.sin(q*Math.PI);
 }
 const progress=clamp01(time/driveDuration),travel=distance/total,approach=tablet?.65:1.15;
 return {state,progress,velocity,distance,pitch,lift,braking,carX:approach*(travel-1),ground:distance-approach*travel,
  wheelAngle:-distance/.5,steer:.035*Math.sin(travel*Math.PI)*(1-travel),cameraDolly:.65*(1-travel),cameraTurn:.24*(travel-1),
  lightSweep:state==='settled'?0:Math.sin(travel*Math.PI)*(tablet?.6:1),settled:state==='settled'};
}
/** Active time only: pause does not catch up; interruption preserves stopped wheel orientation. */
export function createHeroDrive(tablet=false) {
 let elapsed=0,interrupted=false;
 const read=()=>{
  const pose=drivePose(elapsed,tablet);
  return interrupted?{...pose,state:'settled' as const,progress:1,velocity:0,pitch:0,lift:0,braking:0,carX:0,ground:0,steer:0,cameraDolly:0,cameraTurn:0,lightSweep:0,settled:true}:pose;
 };
 return {read,advance(delta:number){if(!interrupted)elapsed=Math.min(driveDuration*(tablet?.68:1),elapsed+Math.max(0,Math.min(delta,48)));return read();},interrupt(){interrupted=true;return read();}};
}
