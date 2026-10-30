import {expect,it,vi} from 'vitest';
import {PerspectiveCamera} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
it('supports touch rotation and bounded pinch zoom with the actual inspection control implementation',()=>{
 const canvas=document.createElement('canvas');document.body.append(canvas);Object.defineProperties(canvas,{clientWidth:{value:390},clientHeight:{value:540}});canvas.setPointerCapture=vi.fn();canvas.releasePointerCapture=vi.fn();
 const camera=new PerspectiveCamera(38,390/540,.05,250);camera.position.set(10,7,18);const controls=new OrbitControls(camera,canvas);controls.enableDamping=false;controls.enablePan=false;controls.minDistance=8;controls.maxDistance=30;controls.update();const before=camera.position.clone();
 const event=(name:string,id:number,x:number,y:number)=>{const e=new Event(name,{bubbles:true,cancelable:true});Object.assign(e,{pointerId:id,pointerType:'touch',clientX:x,clientY:y,pageX:x,pageY:y,button:0});canvas.dispatchEvent(e);};
 event('pointerdown',1,120,250);event('pointermove',1,180,250);event('pointerup',1,180,250);expect(camera.position.distanceTo(before)).toBeGreaterThan(.1);
 const distance=camera.position.distanceTo(controls.target);event('pointerdown',2,100,220);event('pointerdown',3,200,220);event('pointermove',3,290,220);event('pointerup',3,290,220);event('pointerup',2,100,220);expect(camera.position.distanceTo(controls.target)).toBeLessThan(distance);expect(camera.position.distanceTo(controls.target)).toBeGreaterThanOrEqual(8);controls.dispose();canvas.remove();
});
