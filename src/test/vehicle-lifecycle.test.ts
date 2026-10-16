import {importedFixture} from './fixtures/imported-vehicle';
import {adaptVehicleModel} from '@/lib/vehicle-model/adapter';
import {loadVehicleModel} from '@/lib/vehicle-model/load';
vi.mock('@/lib/vehicle-model/load',()=>({loadVehicleModel:vi.fn()}));
import { beforeEach, afterEach, it, expect, vi } from "vitest";
import * as THREE from "three";
import { drivePose } from "@/lib/hero-drive";
import { createVehicleScene } from "@/lib/vehicle-scene";

const renderer=vi.hoisted(()=>({ render:vi.fn(),dispose:vi.fn(),forceContextLoss:vi.fn(),setSize:vi.fn(),setPixelRatio:vi.fn(),setClearColor:vi.fn(),debug:{},info:{render:{triangles:1,calls:1}} }));
vi.mock('three',async importOriginal=>({...await importOriginal<typeof import('three')>(),WebGLRenderer:vi.fn(function(){return renderer;})}));
vi.mock('@/lib/premium-car/studio-environment',async original=>({...await original<typeof import('@/lib/premium-car/studio-environment')>(),prefilterStudioEnvironment:(_renderer:unknown,source:THREE.Texture)=>({texture:source,dispose:vi.fn()})}));
let frames: Map<number,FrameRequestCallback>, index:number;
let resizeCallback:ResizeObserverCallback;
let intersectionCallback: IntersectionObserverCallback;
let disconnect: ReturnType<typeof vi.fn>;
beforeEach(()=>{
  vi.mocked(loadVehicleModel).mockRejectedValue(new Error('No approved asset'));
  frames=new Map();index=0;disconnect=vi.fn();renderer.render.mockReset();renderer.dispose.mockClear();renderer.forceContextLoss.mockClear();
  vi.stubGlobal('requestAnimationFrame',(cb:FrameRequestCallback)=>{frames.set(++index,cb);return index;});
  vi.stubGlobal('cancelAnimationFrame',(id:number)=>frames.delete(id));
  vi.stubGlobal('ResizeObserver',class{constructor(cb:ResizeObserverCallback){resizeCallback=cb;} observe(){} unobserve(){} disconnect(){disconnect();}});
  vi.stubGlobal('IntersectionObserver',class{constructor(cb:IntersectionObserverCallback){intersectionCallback=cb;} observe(){} disconnect(){disconnect();}});
  vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockImplementation(()=>({}) as never);
});
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals();document.body.innerHTML='';});
function setup(managed=false,skipHeroIntro=false,dock?:string) {
  const surface=document.createElement('section'),host=document.createElement('div');surface.append(host);document.body.append(surface);if(dock)host.dataset.sceneDock=dock;
  Object.defineProperties(host,{clientWidth:{value:600,configurable:true},clientHeight:{value:400,configurable:true}});
  vi.spyOn(surface,'getBoundingClientRect').mockReturnValue({top:300,height:500} as DOMRect);
  const ready=vi.fn(),failed=vi.fn();const scene=createVehicleScene({host,surface,quality:'desktop',ready,failed,managed,skipHeroIntro});
  return {surface,host,scene,ready,failed};
}
function visible(value=true){intersectionCallback([{isIntersecting:value} as IntersectionObserverEntry],{} as IntersectionObserver);}
function step(time=16){const [id,cb]=[...frames.entries()][0]??[];if(cb){frames.delete(id);cb(time);}}
it('retains fallback when WebGL2 cannot initialize',()=>{
  vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
  const {host,ready,failed,scene}=setup();expect(failed).toHaveBeenCalledOnce();expect(ready).not.toHaveBeenCalled();expect(host.querySelector('canvas')).toBeNull();scene.dispose();
});
it('renders on demand, pauses offscreen, and disposes shared GPU resources once',()=>{
  const geometry=vi.spyOn(THREE.BufferGeometry.prototype,'dispose');const materials=vi.spyOn(THREE.Material.prototype,'dispose');
  const {host,scene,ready}=setup();expect(frames.size).toBe(0);visible();step();expect(ready).toHaveBeenCalledOnce();expect(host.querySelector('canvas')).not.toBeNull();
  visible(false);expect(frames.size).toBe(0);scene.select(2);expect(frames.size).toBe(0);
  scene.dispose();scene.dispose();expect(renderer.dispose).toHaveBeenCalledOnce();expect(renderer.forceContextLoss).toHaveBeenCalledOnce();
  expect(geometry).toHaveBeenCalled();expect(materials).toHaveBeenCalled();expect(disconnect).toHaveBeenCalledTimes(2);expect(host.querySelector('canvas')).toBeNull();
});
it('isolates render failure, stops frames and removes the canvas',()=>{
  renderer.render.mockImplementation(()=>{throw new Error('GPU failure');});const {host,failed,scene}=setup();visible();step();
  expect(failed).toHaveBeenCalledOnce();expect(frames.size).toBe(0);expect(host.querySelector('canvas')).toBeNull();scene.select(1);expect(frames.size).toBe(0);
});
it('falls back on context loss without trying to restart a broken scene',()=>{
  const {host,failed}=setup();visible();step();host.querySelector('canvas')!.dispatchEvent(new Event('webglcontextlost',{cancelable:true}));
  expect(failed).toHaveBeenCalledOnce();expect(frames.size).toBe(0);expect(host.querySelector('canvas')).toBeNull();
});

it('reuses one renderer, canvas and geometry set between full-site scene docks',()=>{
  const {scene,host,surface}=setup(true);const other=document.createElement('div');surface.append(other);
  Object.defineProperties(other,{clientWidth:{value:480},clientHeight:{value:320}});
  scene.present?.(host,surface,'parts',.5);step();const canvas=host.querySelector('canvas');expect(canvas).not.toBeNull();
  const dispose=vi.spyOn(THREE.BufferGeometry.prototype,'dispose');
  scene.present?.(other,surface,'completion',.6);step(32);
  expect(host.querySelector('canvas')).toBeNull();expect(other.querySelector('canvas')).toBe(canvas);expect(surface.querySelectorAll('canvas')).toHaveLength(1);
  expect(dispose).not.toHaveBeenCalled();expect(renderer.dispose).not.toHaveBeenCalled();
  scene.pause?.();expect(frames.size).toBe(0);scene.select(2);expect(frames.size).toBe(0);scene.dispose();expect(renderer.dispose).toHaveBeenCalledOnce();
});

it('settles to idle and replaces stale chapter targets during rapid reverse transitions',()=>{
 const {scene,host,surface}=setup(true);
 scene.present?.(host,surface,'parts',.85);step();
 scene.present?.(host,surface,'completion',.9);step(32);
 scene.present?.(host,surface,'inspection',.3);
 for(let t=48;t<8000&&frames.size;t+=16)step(t);
 expect(frames.size).toBe(0);expect(host.dataset.rendering).toBe('idle');
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;
 const car=world.children.find(o=>o instanceof THREE.Group)!;
 expect(car.rotation.y).toBeCloseTo(.12,2);expect(host.querySelectorAll('canvas')).toHaveLength(1);
 const count=renderer.render.mock.calls.length;scene.select(2);expect(frames.size).toBe(1);step(9000);expect(renderer.render.mock.calls.length).toBe(count+1);scene.dispose();
});
it('keeps paint opaque through focus and completion without duplicating geometry',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'parts',.5);step();
 const dispose=vi.spyOn(THREE.BufferGeometry.prototype,'dispose');scene.technical?.(true);step(32);
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;const body=world.getObjectByName("vehicle-body")!.children.find(o=>o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial) as THREE.Mesh;
 expect((body.material as THREE.MeshStandardMaterial).wireframe).toBe(false);expect(world.getObjectByName("technical-sedan-outline")).toBeUndefined();expect((body.material as THREE.MeshStandardMaterial).opacity).toBe(1);expect((body.material as THREE.MeshStandardMaterial).transparent).toBe(false);expect(dispose).not.toHaveBeenCalled();
 scene.present?.(host,surface,'completion',.8);step(48);expect((body.material as THREE.MeshStandardMaterial).wireframe).toBe(false);scene.dispose();
});
it('finishes the finite hero reveal and carries the same canvas into and back from the journey',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);step();
 for(let t=32;t<10000&&frames.size;t+=16)step(t);
 expect(host.dataset.intro).toBe('settled');expect(host.dataset.rendering).toBe('idle');const canvas=host.querySelector('canvas');
 const other=document.createElement('div');surface.append(other);Object.defineProperties(other,{clientWidth:{value:600,configurable:true},clientHeight:{value:400,configurable:true}});
 scene.present?.(other,surface,'parts',.4);step(11000);expect(other.querySelector('canvas')).toBe(canvas);
 scene.present?.(host,surface,'hero',.5);step(11016);expect(host.querySelector('canvas')).toBe(canvas);expect(host.dataset.intro).toBe('settled');scene.dispose();
});
it('rolls all four wheels around Z, keeps calipers fixed, and steers only front wheels',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);
 for(let t=16;t<1700;t+=16)step(t);
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;
 const roots=['front-left','front-right','rear-left','rear-right'].map(name=>world.getObjectByName(name+'-steering')!);
 const angles=roots.map(root=>root.getObjectByName('wheel-roll')!.rotation.z);
 expect(angles[0]).toBeLessThan(-.1);angles.forEach(a=>expect(a).toBeCloseTo(angles[0]));
 roots.forEach(root=>expect(root.getObjectByName('fixed-caliper')!.rotation.z).toBe(0));
 expect(roots[0].rotation.y).not.toBe(0);expect(roots[2].rotation.y).toBe(0);scene.dispose();
});
it('interrupts a fast hero-to-service transition and returns settled without recreating resources',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.2);step();step(32);
 const canvas=host.querySelector('canvas');scene.present?.(host,surface,'parts',.8);step(48);expect(host.dataset.driveState).toBe('scroll-transition');
 scene.present?.(host,surface,'hero',.3);step(64);expect(host.dataset.driveState).toBe('settled');expect(host.querySelector('canvas')).toBe(canvas);scene.dispose();
});
it('does not start an entrance after first loading directly into the service journey',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'parts',.8);step();scene.present?.(host,surface,'hero',.3);step(32);
 expect(host.dataset.driveState).toBe('settled');expect(host.dataset.driveVelocity).toBe('0.000');scene.dispose();
});
it('pauses active driving while hidden and resumes without a wall-time jump',()=>{
 const {scene,host,surface}=setup(true);let hidden=false;vi.spyOn(document,'hidden','get').mockImplementation(()=>hidden);
 scene.present?.(host,surface,'hero',.3);for(let t=16;t<1000;t+=16)step(t);
 const angle=Number(host.dataset.wheelAngle);hidden=true;document.dispatchEvent(new Event('visibilitychange'));expect(frames.size).toBe(0);
 hidden=false;document.dispatchEvent(new Event('visibilitychange'));expect(frames.size).toBe(1);step(60000);
 expect(Math.abs(Number(host.dataset.wheelAngle)-angle)).toBeLessThan(.15);expect(host.dataset.driveState).toBe('accelerating');scene.dispose();
});
it('stops full driving when the active-frame quality policy downgrades the scene',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);
 for(let t=16;t<2500;t+=40)step(t);
 const lowWorld=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;expect((lowWorld.getObjectByName('sedan-sculpted-shell') as THREE.Mesh).geometry.getAttribute('position').count).toBeLessThan(300);
 expect(host.dataset.quality).toBe('low');expect(host.dataset.driveState).toBe('settled');expect(host.dataset.driveVelocity).toBe('0.000');scene.dispose();
});
it('resolves an offscreen entrance to a stable hero when it returns',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);step();scene.pause?.();expect(frames.size).toBe(0);expect(host.dataset.driveState).toBe('offscreen');
 scene.present?.(host,surface,'hero',.3);step(50000);expect(host.dataset.driveState).toBe('settled');expect(host.dataset.intro).toBe('settled');scene.dispose();
});
it('holds the cinematic camera against pointer input during driving and restores it after settling',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);scene.pointer?.({x:1,y:1});
 for(let t=16;t<1600;t+=16)step(t);
 const camera=renderer.render.mock.calls.at(-1)![1] as THREE.Camera;const during=camera.position.x;
 for(let t=1600;t<8500&&frames.size;t+=16)step(t);
 expect(host.dataset.driveState).toBe('settled');expect(host.dataset.rendering).toBe('idle');expect(camera.position.x).toBeLessThan(during);scene.dispose();
});

it('resizes an active entrance without resetting its timeline or duplicating the canvas',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);for(let t=16;t<1400;t+=16)step(t);
 const progress=Number(host.dataset.driveProgress),canvas=host.querySelector('canvas');
 Object.defineProperties(host,{clientWidth:{value:800,configurable:true},clientHeight:{value:420,configurable:true}});resizeCallback([],{} as ResizeObserver);step(1408);
 expect(renderer.setSize).toHaveBeenLastCalledWith(800,420,false);expect(Number(host.dataset.driveProgress)).toBeGreaterThan(progress);expect(host.querySelector('canvas')).toBe(canvas);expect(host.dataset.driveState).toBe('tracking');scene.dispose();
});

it('restores a settled hero immediately after a quality-triggered renderer recreation',()=>{
 const {scene,host,surface}=setup(true,true);scene.present?.(host,surface,'hero',.3);step();
 expect(host.dataset.driveState).toBe('settled');expect(host.dataset.driveVelocity).toBe('0.000');expect(host.dataset.rendering).toBe('idle');scene.dispose();
});

it('tracks with the camera and keeps travel and wheel radius aligned without hero floor guides',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);step();
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene,car=world.children[0] as THREE.Group;
 const camera=renderer.render.mock.calls.at(-1)![1] as THREE.Camera,heading=car.rotation.y,firstEye=camera.position.x;
 for(let t=32;t<1700;t+=16)step(t);
 expect(car.rotation.y).toBeCloseTo(heading,10);expect(camera.position.x).toBeLessThan(firstEye);
 expect(car.position.z/car.position.x).toBeCloseTo(-Math.tan(heading),10);
 expect(world.getObjectByName('technical-studio-guides')).toBeUndefined();
 const roll=world.getObjectByName('front-right-steering')!.getObjectByName('wheel-roll')!;
 expect(-roll.rotation.z*.5*car.scale.x).toBeCloseTo(drivePose(1696).distance,8);scene.dispose();
});
it('uses a low four-door sedan shell and batches body and wheel trim without losing component hierarchy',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'hero',.3);step();
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;
 const shell=world.getObjectByName('sedan-sculpted-shell') as THREE.Mesh;
 shell.geometry.computeBoundingBox();const bounds=shell.geometry.boundingBox!;
 expect(bounds.max.x-bounds.min.x).toBeCloseTo(4.66,1);
 const roof=world.getObjectByName('painted-executive-roof') as THREE.Mesh;roof.geometry.computeBoundingBox();expect(roof.geometry.boundingBox!.max.y).toBeLessThan(1.8);
 expect(world.getObjectByName('front-left-steering')!.position.x-world.getObjectByName('rear-left-steering')!.position.x).toBeCloseTo(3.2);
 const body=world.getObjectByName('vehicle-body')!;expect(body.children.filter(o=>o instanceof THREE.Mesh).length).toBeLessThan(12);
 expect(body.children.some(o=>o.name.includes('flush-door-handle'))).toBe(true);
 const positions=shell.geometry.getAttribute('position');for(let i=0;i<positions.count;i++)expect(Number.isFinite(positions.getY(i))).toBe(true);
 scene.dispose();
});
it('uses a bounded predefined component camera and returns to the whole vehicle without recreating resources',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'parts',.5);scene.select(1);
 for(let t=16;t<8000&&frames.size;t+=16)step(t);
 const camera=renderer.render.mock.calls.at(-1)![1] as THREE.Camera;const before=camera.position.length();
 scene.focus?.(true);for(let t=9000;t<16000&&frames.size;t+=16)step(t);
 expect(camera.position.length()).toBeLessThan(before);expect(host.dataset.componentView).toBe('wheel');expect(host.querySelectorAll('canvas')).toHaveLength(1);expect(host.dataset.rendering).toBe('idle');
 scene.focus?.(false);for(let t=17000;t<24000&&frames.size;t+=16)step(t);
 expect(host.dataset.componentView).toBe('vehicle');expect(camera.position.length()).toBeCloseTo(before,1);scene.dispose();
});
it('keeps the solid vehicle settled without a technical scan',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'parts',.5);scene.technical?.(true);step();expect(host.dataset.scanState).toBe('solid');
 for(let t=32;t<8000&&frames.size;t+=16)step(t);
 expect(host.dataset.scanState).toBe('solid');expect(host.dataset.rendering).toBe('idle');const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;expect(world.getObjectByName('sedan-sculpted-shell')).toBeDefined();scene.dispose();
});
it('introduces the solid vehicle without a scan on forward or reverse scroll',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'parts',.4);step();expect(host.dataset.scanState).toBe('solid');
 for(let t=32;t<8000&&frames.size;t+=16)step(t);expect(host.dataset.scanState).toBe('solid');
 scene.present?.(host,surface,'hero',.3);step(9000);scene.present?.(host,surface,'parts',.4);step(9016);expect(host.dataset.scanState).toBe('solid');scene.dispose();
});
it('separates the rim and tyre for parts inspection while retaining the disc and caliper at the vehicle axle',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'parts',.5);scene.select(1);scene.focus?.(true);
 for(let t=16;t<8000&&frames.size;t+=16)step(t);
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene,root=world.getObjectByName('front-right-steering')!,roll=root.getObjectByName('wheel-roll')!;
 expect(root.position.z).toBeCloseTo(.96);expect(roll.position.z).toBeGreaterThan(.3);expect(root.getObjectByName('fixed-caliper')!.position.z).toBe(0);
 const disc=roll.getObjectByName('brake-disc')!;expect(disc.position.z+roll.position.z).toBeCloseTo(.025);scene.dispose();
});
function pointer(node:HTMLElement,type:string,x:number,y=50,touch=false){const e=new MouseEvent(type,{bubbles:true,clientX:x,clientY:y,button:0,cancelable:true});Object.defineProperty(e,'pointerId',{value:1});Object.defineProperty(e,'pointerType',{value:touch?'touch':'mouse'});node.dispatchEvent(e);}
it('preserves component drag, Technical orientation and pointer cleanup outside the hero',()=>{
 const {host,surface,scene}=setup(true,true);scene.present(host,surface,'parts',.5);step();expect(host.dataset.rotateReady).toBe('true');pointer(host,'pointerdown',0);pointer(host,'pointermove',700);step(32);expect(Number(host.dataset.rotation)).toBeGreaterThan(180);const yaw=host.dataset.rotation;scene.technical(true);step(48);expect(host.dataset.rotation).toBe(yaw);pointer(host,'pointercancel',700);expect(host.dataset.dragging).toBe('false');scene.present(host,surface,'service',.5);step(64);expect(host.dataset.rotateReady).toBe('false');scene.dispose();
});
it('keeps vertical scrolling intent and horizontal inspection in component sections',()=>{
 const {host,surface,scene}=setup(true,true);scene.present(host,surface,'parts',.5);step();pointer(host,'pointerdown',50,50,true);pointer(host,'pointermove',53,80,true);expect(host.dataset.dragging).toBe('false');
 pointer(host,'pointerdown',50,50,true);pointer(host,'pointermove',100,53,true);expect(host.dataset.dragging).toBe('true');scene.dispose();
});

it('uses restrained physical gunmetal paint and closed, attached light fixtures',()=>{const {scene,host,surface}=setup(true,true);scene.present(host,surface,'hero',.5);step();const world=renderer.render.mock.calls[0][0] as THREE.Scene;const shell=world.getObjectByName('sedan-sculpted-shell') as THREE.Mesh;const paint=shell.material as THREE.MeshPhysicalMaterial;expect(paint.isMeshPhysicalMaterial).toBe(true);expect(paint.metalness).toBe(.76);expect(paint.roughness).toBe(.28);expect(paint.clearcoat).toBe(.8);expect(shell.geometry.index?.count).toBeGreaterThan(0);const body=world.getObjectByName('vehicle-body');expect(body?.children.some(child=>child.name.includes('headlight-housing'))).toBe(true);scene.dispose();});

it('updates the studio theme in place without resetting orientation, camera or geometry',()=>{
 document.documentElement.dataset.theme='dark';const {scene,host,surface}=setup(true,true);scene.present?.(host,surface,'hero',.3);for(let t=16;t<8000&&frames.size;t+=16)step(t);
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene,car=world.children.find(o=>o instanceof THREE.Group)!,camera=renderer.render.mock.calls.at(-1)![1] as THREE.Camera;
 const yaw=car.rotation.y,position=camera.position.clone(),canvas=host.querySelector('canvas'),shell=world.getObjectByName('sedan-sculpted-shell') as THREE.Mesh,geometry=shell.geometry;
 document.documentElement.dataset.theme='light';window.dispatchEvent(new Event('toli-theme-change'));step(9000);
 expect(host.dataset.theme).toBe('light');expect(car.rotation.y).toBeCloseTo(yaw,4);expect(camera.position.distanceTo(position)).toBeLessThan(.001);expect(shell.geometry).toBe(geometry);expect(host.querySelector('canvas')).toBe(canvas);expect(renderer.dispose).not.toHaveBeenCalled();scene.dispose();delete document.documentElement.dataset.theme;
});
it('keeps every assembled body detail above the undertray when batching curved trim',()=>{
 const {scene,host,surface}=setup(true,true);scene.present(host,surface,'hero',.5);step();
 const world=renderer.render.mock.calls[0][0] as THREE.Scene;world.updateMatrixWorld(true);
 world.getObjectByName('vehicle-body')!.traverse(object=>{if(object instanceof THREE.Mesh){const bounds=new THREE.Box3().setFromObject(object);expect(bounds.min.y).toBeGreaterThan(.55);}});
 scene.dispose();
});

it('settles the imported hero at the fixed front-side angle and ignores pointer/inspection input',async()=>{
 const fixture=importedFixture();vi.mocked(loadVehicleModel).mockResolvedValue(adaptVehicleModel(fixture.root,fixture.manifest,new THREE.Texture()));
 const {host,surface,scene}=setup(true,true);await Promise.resolve();scene.present(host,surface,'hero',.3);for(let t=16;t<8000&&frames.size;t+=16)step(t);
 expect(Number(host.dataset.heroViewAngle)).toBeGreaterThan(25);expect(Number(host.dataset.heroViewAngle)).toBeLessThan(35);expect(host.dataset.model).toBe('licensed-imported-sports-gt');expect(host.dataset.rotateReady).toBe('false');
 const yaw=host.dataset.rotation;pointer(host,'pointerdown',50);pointer(host,'pointermove',500);pointer(host,'pointerup',500);scene.pointer?.({x:1,y:1});scene.inspect?.('rotate');scene.inspect?.('leftDoor');
 for(let t=8016;t<12000&&frames.size;t+=16)step(t);expect(host.dataset.rotation).toBe(yaw);expect(host.dataset.dragging).not.toBe('true');scene.dispose();
});

it('keeps the existing solid 3D vehicle when no optional imported asset exists',async()=>{
 const {host,surface,scene,failed}=setup(true,true);await Promise.resolve();await Promise.resolve();expect(host.dataset.model).toBe('existing-coded-sedan');
 scene.present?.(host,surface,'parts',.3);scene.technical?.(true);step();expect(renderer.render).toHaveBeenCalled();expect(host.querySelector('canvas')).not.toBeNull();expect(failed).not.toHaveBeenCalled();scene.dispose();
});

it('rejects hero Technical requests while preserving shared service Technical rendering',()=>{
 const {scene,host,surface}=setup(true,true);scene.present?.(host,surface,'parts',.3);scene.technical?.(true);step();
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;expect(world.getObjectByName('technical-sedan-outline')).toBeUndefined();
 scene.present?.(host,surface,'hero',.3);scene.technical?.(true);step(32);expect(world.getObjectByName('technical-sedan-outline')).toBeUndefined();scene.dispose();
});

it('presents refined service geometry without relying on a missing hero asset or a hero mode switch',()=>{
 const {scene,host,surface}=setup(true,true);scene.present?.(host,surface,'parts',.3);scene.focus?.(true);for(let t=16;t<3000&&frames.size;t+=16)step(t);
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;
 expect(world.getObjectByName('vehicle-body')!.visible).toBe(true);expect(world.getObjectByName('rounded-battery-case')).toBeDefined();expect(world.getObjectByName('turbine-spokes')).toBeDefined();
 scene.present?.(host,surface,'hero',.3);step(3016);expect(world.getObjectByName('vehicle-body')!.visible).toBe(false);scene.dispose();
});

it('never binds rotation listeners to the cinematic hero and detaches component listeners on return',()=>{
 const added=vi.spyOn(HTMLElement.prototype,'addEventListener'),removed=vi.spyOn(HTMLElement.prototype,'removeEventListener');
 const {scene,host,surface}=setup(true,true,'hero');scene.present?.(host,surface,'hero',.3);step();
 const types=['pointerdown','pointermove','pointerup','pointercancel','lostpointercapture'];
 expect(added.mock.calls.some((call,i)=>added.mock.contexts[i]===host&&types.includes(call[0]))).toBe(false);
 const parts=document.createElement('div');parts.dataset.sceneDock='services';surface.append(parts);Object.defineProperties(parts,{clientWidth:{value:600},clientHeight:{value:400}});
 scene.present?.(parts,surface,'parts',.3);step(32);expect(parts.dataset.rotateReady).toBe('true');pointer(parts,'pointerdown',20);pointer(parts,'pointermove',120);expect(parts.dataset.dragging).toBe('true');
 scene.present?.(host,surface,'hero',.3);step(48);expect(host.dataset.rotateReady).toBe('false');expect(removed.mock.calls.some((call,i)=>removed.mock.contexts[i]===parts&&call[0]==='pointerdown')).toBe(true);scene.dispose();
});

it('uses contact shadows without CAD grid or floor ring in below-fold chapters',()=>{
 const {scene,host,surface}=setup(true);scene.present?.(host,surface,'parts',.5);step();
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene;
 expect(world.getObjectByName('technical-studio-guides')).toBeUndefined();
 let grids=0;world.traverse(o=>{if(o instanceof THREE.GridHelper)grids++;});expect(grids).toBe(0);
 scene.present?.(host,surface,'completion',.8);step(32);expect(host.querySelectorAll('canvas')).toHaveLength(1);scene.dispose();
});

it('updates quality and motion in place while keeping solid geometry and one canvas',()=>{
 const {scene,host,surface}=setup(true,true);scene.present?.(host,surface,'parts',.4);step();const canvas=host.querySelector('canvas');
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene,shell=world.getObjectByName('sedan-sculpted-shell') as THREE.Mesh,geometry=shell.geometry;
 scene.quality?.('tablet');scene.motion?.();step(32);
 expect(renderer.setPixelRatio).toHaveBeenLastCalledWith(1);expect(shell.geometry).toBe(geometry);expect(host.querySelector('canvas')).toBe(canvas);expect(renderer.dispose).not.toHaveBeenCalled();
 scene.select(1);scene.focus?.(true);for(let t=48;t<4000&&frames.size;t+=16)step(t);
 const paint=shell.material as THREE.MeshPhysicalMaterial;expect(paint.opacity).toBe(1);expect(paint.transparent).toBe(false);expect(paint.depthWrite).toBe(true);scene.dispose();
});

it('renders a static solid 3D vehicle immediately with reduced motion',()=>{
 vi.stubGlobal('matchMedia',()=>({matches:true}));const {scene,host,surface,failed}=setup(true,true);scene.present?.(host,surface,'parts',.4);step();
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene,paint=(world.getObjectByName('sedan-sculpted-shell') as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
 expect(host.querySelector('canvas')).not.toBeNull();expect(paint.opacity).toBe(1);expect(paint.transparent).toBe(false);expect(host.dataset.rendering).toBe('idle');expect(frames.size).toBe(0);expect(failed).not.toHaveBeenCalled();scene.dispose();
});

it('bounds the desktop floor reflection to shared shell/tyre buffers and skips it at tablet quality',()=>{
 const {scene,host,surface}=setup(true,true);scene.present?.(host,surface,'parts',.4);step();
 const world=renderer.render.mock.calls.at(-1)![0] as THREE.Scene,reflection=world.getObjectByName('restrained-floor-reflection')!;
 const originals=new Set<THREE.BufferGeometry>();world.getObjectByName('vehicle-body')!.traverse(o=>{if(o instanceof THREE.Mesh)originals.add(o.geometry);});
 world.traverse(o=>{if(o instanceof THREE.Mesh&&o.name==='sculpted-tire')originals.add(o.geometry);});
 expect(reflection.children).toHaveLength(5);let triangles=0;reflection.children.forEach(o=>{const mesh=o as THREE.Mesh;expect(originals.has(mesh.geometry)).toBe(true);triangles+=(mesh.geometry.index?.count??mesh.geometry.getAttribute('position').count)/3;expect((mesh.material as THREE.MeshBasicMaterial).opacity).toBeLessThan(.05);});
 expect(triangles).toBeLessThan(40000);expect(host.dataset.floorReflection).toBe('true');const canvas=host.querySelector('canvas');scene.quality?.('tablet');step(32);
 expect(reflection.visible).toBe(false);expect(host.dataset.floorReflection).toBe('false');expect(host.querySelector('canvas')).toBe(canvas);expect(renderer.dispose).not.toHaveBeenCalled();scene.dispose();
});
