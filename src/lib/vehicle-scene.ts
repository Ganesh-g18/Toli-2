import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {buildWheels} from './premium-car/wheels';
import {roundedCase} from './service-components';
import type {InspectionAction,InspectionState} from './premium-car/inspection';
import {GT_DIMENSIONS,GT_AXLES} from './premium-car/design';
import {createStudioRadiance,prefilterStudioEnvironment,createContactFalloff} from './premium-car/studio-environment';
import {createFloorReflection} from './premium-car/floor-reflection';
import {loadVehicleModel} from './vehicle-model/load';
import type {ImportedVehicle} from './vehicle-model/adapter';
import type {SolidModelState} from './vehicle-model/contract';
import {closedInspection} from './premium-car/inspection';
import { createExecutiveShell, createExecutiveCabin, createExecutiveRoof } from './executive-sedan-geometry';
import { getTheme,subscribeTheme } from './site-theme';
import { createVehicleRotation, rotationChapter, rotationDegrees } from './vehicle-rotation';
import { vehicleLighting, vehicleTheme as theme } from "./vehicle-theme";
import { createHeroDrive } from "./hero-drive";
import { heroReveal } from "./hero-policy";
import { dampBlend, motion } from "./vehicle-motion";
import * as THREE from "three";
import { journeyPose, type JourneyChapter, type JourneyPose } from "./journey";
import { subscribeDepth } from "./depth-channel";
import { performanceDecision, sceneDpr, storyPose, storyProgress, type SceneQuality } from "./vehicle-policy";

export type VehicleScene = { quality?(value:"desktop"|"tablet"):void; motion?():void; inspect?(action:InspectionAction):InspectionState; select(index: number): void; technical?(enabled:boolean):void; focus?(enabled:boolean):void; dispose(): void; present?(host:HTMLElement,surface:HTMLElement,chapter:JourneyChapter,progress:number):void; pause?():void; pointer?(point:{x:number;y:number}):void };
type Options = { host: HTMLElement; surface: HTMLElement; quality: Exclude<SceneQuality, "fallback">; ready(): void; failed(): void; managed?: boolean; skipHeroIntro?:boolean; inspectionChanged?(state:InspectionState):void;solidChanged?(state:SolidModelState):void };

/** One renderer: existing solid code-generated PBR vehicle, shared between below-fold docks. */
export function createVehicleScene({ host, surface, quality, ready, failed, managed=false,skipHeroIntro=false,inspectionChanged,solidChanged }: Options): VehicleScene {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true"); canvas.tabIndex = -1;
  let renderer: THREE.WebGLRenderer | undefined;
  const geometries = new Set<THREE.BufferGeometry>();
  const textures = new Set<THREE.Texture>();
  const materials = new Set<THREE.Material>();
  let frame = 0, disposed = false, visible = false, previous = 0, warmup = 0, downgraded = false;
  let selected = 0, progress = 0, pointer = { x: 0, y: 0 };
  let unsubscribe = () => {};
  let unsubscribeTheme = () => {};
  let lightTheme=getTheme()==='light';
  let resizeObserver: ResizeObserver | undefined, intersection: IntersectionObserver | undefined;
  const samples: number[] = [];
  let lowerBody=()=>{};
  let realistic:ImportedVehicle|undefined;let assetBounds:THREE.Box3|undefined;
  let heroElapsed=0,componentFocus=false,focusBlend=0;
  const drive=createHeroDrive(quality==='tablet');
  if(skipHeroIntro){drive.interrupt();heroElapsed=1900;host.dataset.driveRestored='true';}
  let driveX=0,bodyPitch=0,bodyLift=0,cameraOrbit=0,wheelAngle=0;
  const rotation=createVehicleRotation();let rotationReady=false,inspectionWeight=0;
  const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  if(reduced()){drive.interrupt();heroElapsed=1900;}
  let gesture:{id:number;x:number;y:number;last:number;time:number;horizontal:boolean}|undefined;
  const finishGesture=(inertia=false)=>{const id=gesture?.id;gesture=undefined;host.dataset.dragging='false';if(inertia)rotation.end(reduced());else rotation.cancel();if(id!==undefined&&host.hasPointerCapture?.(id))host.releasePointerCapture(id);schedule();};
  const down=(e:PointerEvent)=>{if(chapter==='hero'||e.button!==0||gesture||!rotationReady)return;rotation.cancel();if(e.pointerType!=='touch')host.setPointerCapture?.(e.pointerId);gesture={id:e.pointerId,x:e.clientX,y:e.clientY,last:e.clientX,time:e.timeStamp,horizontal:false};};
  const move=(e:PointerEvent)=>{if(!gesture||gesture.id!==e.pointerId)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
   if(!gesture.horizontal){if(Math.abs(dy)>6&&Math.abs(dy)>Math.abs(dx)){finishGesture();return;}if(Math.abs(dx)<6||Math.abs(dx)<Math.abs(dy)*1.2)return;gesture.horizontal=true;rotation.begin();host.setPointerCapture?.(e.pointerId);host.dataset.dragging='true';}
   e.preventDefault();rotation.drag(e.clientX-gesture.last,e.timeStamp-gesture.time);gesture.last=e.clientX;gesture.time=e.timeStamp;pointer={x:0,y:0};schedule();};
  const inspect=(action:InspectionAction)=>{if(chapter==='hero')return realistic?.inspection.read()??closedInspection();drive.interrupt();heroElapsed=1900;if(action==='reset')rotation.reset();if(action==='rotate')rotation.turn();const state=realistic?.inspection.command(action)??closedInspection();inspectionChanged?.(state);schedule();return state;};
  const up=(e:PointerEvent)=>{if(gesture?.id===e.pointerId)finishGesture(true);};
  const cancelled=(e:PointerEvent)=>{if(gesture?.id===e.pointerId)finishGesture();};
  let rotationHost:HTMLElement|undefined;
  const bindRotation=(node:HTMLElement,bind:boolean)=>{if(bind&&(node.dataset.sceneDock==='hero'||chapter==='hero'||rotationHost===node))return;if(!bind&&rotationHost!==node)return;rotationHost=bind?node:undefined;const method=bind?'addEventListener':'removeEventListener';node[method]('pointerdown',down);node[method]('pointermove',move);node[method]('pointerup',up);node[method]('pointercancel',cancelled);node[method]('lostpointercapture',cancelled);if(!bind){node.dataset.rotateReady='false';node.dataset.dragging='false';node.parentElement?.removeAttribute('data-inspecting');}};
  let chapter:JourneyChapter = "arrival";
  const cinematic:JourneyPose={turn:0,distance:0,split:0,scan:0,clean:0,targetX:0,targetY:.78,height:1.65,scale:1};
  const current = { progress: 0, selected: [1, 0, 0, 0], x: 0, y: 0 };
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 60);
  // Opt-in QA projection bounds; compiled out of the normal production build.
  const auditCorners=import.meta.env.VITE_PERFORMANCE_AUDIT==='1'?Array.from({length:8},()=>new THREE.Vector3()):undefined;
  const car = new THREE.Group(); scene.add(car);
  const body = new THREE.Group();body.name="vehicle-body";car.add(body);
  const tireShadows:THREE.Mesh[]=[];const shadowRoot=new THREE.Group();scene.add(shadowRoot);

  const geo = <T extends THREE.BufferGeometry>(g: T) => { geometries.add(g); return g; };
  const material = (color: number, metalness = 0, roughness = .6) => {
    const m = new THREE.MeshStandardMaterial({ color, metalness, roughness }); materials.add(m); return m;
  };
  const silver = new THREE.MeshPhysicalMaterial({color:theme.body,metalness:.76,roughness:.28,clearcoat:.8,clearcoatRoughness:.20});materials.add(silver);
  const dark = material(theme.trim, .12, .62);
  const glass = material(theme.glass, .28, .23), rubber = material(theme.rubber, 0, .95);
  const alloy = material(theme.alloy, .72, .34), disc = material(theme.disc, .7, .55);
  const studioSource=createStudioRadiance();textures.add(studioSource);
  let studio:THREE.Texture=studioSource,disposeEnvironment=()=>{};
  let floorReflection:ReturnType<typeof createFloorReflection>|undefined;
  for(const paint of [silver,glass,alloy,disc]){paint.envMap=studio;paint.envMapIntensity=.55;}
  const wheelMarker=material(theme.headlight,.7,.34);
  const red = material(theme.caliper, .35, .42), batteryMaterial = material(theme.battery, 0, .72);
  const rearLight=material(theme.caliper,.1,.45);rearLight.emissive.setHex(theme.caliperEmission);
  const signature=material(theme.headlight,.1,.25);signature.emissive.setHex(theme.headlightEmission);
  const white = material(theme.headlight, .1, .25); white.emissive.setHex(theme.headlightEmission); white.emissiveIntensity = .18;
  const mesh = (geometry: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D, x=0,y=0,z=0) => {
    const m = new THREE.Mesh(geometry, mat); m.position.set(x,y,z); parent.add(m); return m;
  };
  const box = geo(new THREE.BoxGeometry(1,1,1));
  const block = (parent: THREE.Object3D, mat: THREE.Material, size: number[], pos: number[]) => {
    const m=mesh(box,mat,parent,...pos as [number,number,number]);m.scale.set(...size as [number,number,number]);return m;
  };
  // Batch stationary box details by material: detail need not multiply draw calls.
  const batchBlocks=(parent:THREE.Group)=>{
    const buckets=new Map<THREE.Material,THREE.Mesh[]>();
    parent.children.forEach(child=>{if(child instanceof THREE.Mesh&&(child.geometry===box||child.name==='executive-hood-character-line')&&!Array.isArray(child.material)){const list=buckets.get(child.material)??[];list.push(child);buckets.set(child.material,list);}});
    buckets.forEach((blocks,mat)=>{if(blocks.length<2)return;
      const positions:number[]=[],normals:number[]=[],indices:number[]=[];
      blocks.forEach(block=>{block.updateMatrix();const g=block.geometry.clone().applyMatrix4(block.matrix),p=g.getAttribute('position'),n=g.getAttribute('normal'),base=positions.length/3;
        for(let i=0;i<p.count;i++){positions.push(p.getX(i),p.getY(i),p.getZ(i));normals.push(n.getX(i),n.getY(i),n.getZ(i));}
        for(let i=0;i<g.index!.count;i++)indices.push(base+g.index!.getX(i));g.dispose();parent.remove(block);
      });
      const merged=geo(new THREE.BufferGeometry());merged.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));merged.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));merged.setIndex(indices);
      mesh(merged,mat,parent).name=blocks.map(b=>b.name).filter(Boolean).join('/');
    });
  };
  const wheelGroups: { group: THREE.Group; roll:THREE.Group; front:boolean; z: number; brake?:THREE.Mesh }[] = [];
  let battery: THREE.Group;
  const cancel = () => { cancelAnimationFrame(frame);frame=0;previous=0; };
  const dispose = () => {
    if (disposed) return; disposed=true;finishGesture();bindRotation(host,false);cancel();unsubscribe();unsubscribeTheme();resizeObserver?.disconnect();intersection?.disconnect();
    window.removeEventListener("scroll", scroll);document.removeEventListener("visibilitychange", visibility);
    canvas.removeEventListener("webglcontextlost", contextLost);
    floorReflection?.dispose();realistic?.dispose();disposeEnvironment();
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());scene.clear();
    renderer?.dispose();renderer?.forceContextLoss();canvas.remove();
  };
  const fail = () => { dispose(); failed(); };
  const contextLost = (event: Event) => { event.preventDefault();fail(); };
  const schedule = () => { if (!disposed && visible && !document.hidden && !frame) frame=requestAnimationFrame(tick); };
  function scroll() { const bounds=surface.getBoundingClientRect();progress=storyProgress(bounds.top,bounds.height,innerHeight);schedule(); }
  function visibility() { if(document.hidden){finishGesture();cancel();}else {if(!managed)scroll();schedule();} }
  function tick(time: number) {
    frame=0;if(disposed || !visible || document.hidden) { previous=0;return; }
    const elapsed=previous ? time-previous : 16;previous=time;
    const blend=reduced()?1:dampBlend(elapsed,motion.component),cameraBlend=reduced()?1:dampBlend(elapsed,motion.camera);
    current.progress+=(progress-current.progress)*blend;

    current.selected.forEach((value,index)=>current.selected[index]=value+((selected===index?1:0)-value)*blend);
    const pose=storyPose(current.progress);
    const targetPose=journeyPose(chapter,current.progress);
    const isHero=managed&&chapter==='hero';
    if(isHero)heroElapsed+=Math.min(elapsed,48);
    const driving=isHero&&!downgraded?drive.advance(elapsed):drive.read();
    const drivingActive=isHero&&!driving.settled;
    const focusTarget=componentFocus&&chapter==='parts'&&(selected===1||selected===2)?1:0;
    if(!rotation.read().dragging)focusBlend+=(focusTarget-focusBlend)*cameraBlend;
    const inspection=rotationChapter(chapter)&&!drivingActive;
    if(!isHero)inspectionWeight+=((inspection?1:0)-inspectionWeight)*cameraBlend;
    const manualYaw=isHero?0:rotation.advance(elapsed,reduced());
    const pointerWeight=reduced()||isHero||drivingActive||Math.abs(manualYaw)>.001||rotation.read().dragging?0:1;
    if(isHero){current.x=0;current.y=0;}else{current.x+=(pointer.x-current.x)*blend;current.y+=(pointer.y-current.y)*blend;}
    const reveal=heroReveal(heroElapsed,quality==='tablet'||downgraded);
    if(isHero)targetPose.distance+=driving.cameraDolly;
    if(!rotation.read().dragging)cameraOrbit+=((isHero?driving.cameraTurn:0)-cameraOrbit)*cameraBlend;
    if(managed&&chapter==='parts') {
      targetPose.targetX=current.selected[2]*.25+current.selected[0]*.38+focusBlend*(current.selected[1]*1.2+current.selected[2]*.85);
      
      targetPose.distance-=focusBlend*2.1;targetPose.height-=focusBlend*.65;targetPose.turn+=focusBlend*.12;
      targetPose.distance-= .035+current.selected[0]*.32;
      targetPose.targetY=.72+current.selected[2]*.22+focusBlend*(current.selected[2]*.7-current.selected[1]*.2);
    }
    if(!rotation.read().dragging)(Object.keys(cinematic) as (keyof JourneyPose)[]).forEach(k=>cinematic[k]+=(targetPose[k]-cinematic[k])*cameraBlend);
    driveX+=((isHero?driving.carX:0)-driveX)*cameraBlend;
    bodyPitch+=((isHero?driving.pitch:0)-bodyPitch)*blend;
    bodyLift+=((isHero?driving.lift:0)-bodyLift)*blend;
    body.rotation.z=bodyPitch;body.position.y=bodyLift;
    if(realistic){realistic.root.rotation.z=bodyPitch;realistic.root.position.y=bodyLift;}
    car.rotation.y=(managed?cinematic.turn:-.13+pose.entry*.18-pose.exit*.05)+manualYaw*inspectionWeight;
    const headingCos=Math.cos(car.rotation.y),headingSin=Math.sin(car.rotation.y);
    car.position.set(managed?driveX*headingCos:(1-pose.entry)*.5, managed?0:(1-pose.entry)*.08, managed?-driveX*headingSin:-(1-pose.entry)*.8);
    car.scale.setScalar(managed?cinematic.scale:1);
    shadowRoot.position.set(car.position.x,0,car.position.z);shadowRoot.rotation.y=car.rotation.y;shadowRoot.scale.setScalar(car.scale.x);
    if(drivingActive)wheelAngle=driving.wheelAngle/car.scale.x;
    const split=managed?cinematic.split:pose.separation;
    wheelGroups.forEach(({group,roll,front,z,brake})=>{
      roll.rotation.z=wheelAngle;group.rotation.y=isHero&&front?driving.steer:0;
      const separation=split*focusBlend*current.selected[1]*(managed?.6:.42)*(componentFocus&&!front?.25:1);
      group.position.z=z;roll.position.z=Math.sign(z)*separation;
      if(brake)brake.position.z=Math.sign(z)*(.025-separation);
    });
    battery.position.y=.88+split*focusBlend*current.selected[2]*.85;
    battery.position.z=-.15+split*focusBlend*current.selected[2]*.65;
    alloy.emissive.setHex(theme.componentEmission);alloy.emissiveIntensity=chapter==='completion'?0:current.selected[1]*.12;
    batteryMaterial.emissive.setHex(theme.componentEmission);batteryMaterial.emissiveIntensity=chapter==='completion'?0:current.selected[2]*.08;
    silver.emissive.setHex(theme.bodyEmission);silver.emissiveIntensity=current.selected[3]*.14+(managed?cinematic.clean*.045:0);
    red.emissive.setHex(theme.caliperEmission);red.emissiveIntensity= .065+current.selected[0]*.10;
    const fit=Math.max(isHero?1.08:1,(isHero?1.90:1.55)/camera.aspect);
    const dolly=managed?cinematic.distance:(1-pose.entry)*.6+pose.exit*.15;
    const eyeX=(isHero?8.8:6.5)-focusBlend*1.3+current.x*.18*pointerWeight,eyeZ=isHero?eyeX*Math.tan(-Math.PI/6-cinematic.turn)-dolly*.05:3.1+dolly,orbitCos=Math.cos(cameraOrbit),orbitSin=Math.sin(cameraOrbit);
    camera.position.set((eyeX*orbitCos+eyeZ*orbitSin)*fit,.65+((managed?cinematic.height:1.65)-current.y*.12*pointerWeight)*fit,(-eyeX*orbitSin+eyeZ*orbitCos)*fit);
    camera.lookAt(managed?cinematic.targetX+car.position.x*.5:0,managed?cinematic.targetY:.65,managed?car.position.z*.5+focusBlend*current.selected[1]*.65:0);
    key.position.z=isHero?-4.5:4;
    key.position.x=managed?3.4+cinematic.scan*.8+(isHero?driving.lightSweep*2.2:0):3+(pose.entry-pose.exit)*1.2;
    key.intensity=(lightTheme?vehicleLighting.light.key:vehicleLighting.dark.key)*(2.65+(managed?cinematic.clean*.25:0))*(isHero?reveal.light:1);
    fill.intensity=(lightTheme?vehicleLighting.light.fill:vehicleLighting.dark.fill)*(isHero?.55+reveal.light*1.1:1.65);rim.intensity=downgraded?0:isHero?.4+reveal.light*1.8:2.2;
    signature.emissiveIntensity=isHero?.08+Math.min(1,heroElapsed/240)*.36:.26;
    white.emissiveIntensity=isHero?.04+reveal.headlights*.2:.18;
    rearLight.emissiveIntensity=.12+(isHero?driving.braking*.5:0);
    silver.wireframe=false;
    const partsMoving=realistic?.inspection.update(elapsed,reduced())??false;
    // Solid body stays opaque through selection and component focus.
    body.visible=chapter!=='hero'&&!realistic;
    for(const wheel of wheelGroups)wheel.group.visible=body.visible;
    if(realistic)realistic.root.visible=true;
    for(const m of realistic?.materials??[]){if(m.envMap)m.envMapIntensity=Number(m.userData.envStrength??.7)*(lightTheme?.92:1);}
    for(const {steer,roll,front,spinAxis} of realistic?.wheels??[]){roll.rotation[spinAxis]=wheelAngle*(.5/realistic!.rollingRadius);steer.rotation.y=isHero&&front?driving.steer:0;}

    accent.intensity=(lightTheme?.45:1)*(quality==='desktop'?4.2:2.7)*(managed?1-cinematic.clean*.35:1-pose.exit*.35);
    if(isHero)accent.intensity*=.65+reveal.light*.35;
    accent.position.set(-1.2+2.4*current.selected[2],isHero?.65:2.5,isHero?-2.8:2.5-1.5*current.selected[2]);
    try {
      floorReflection?.update(!downgraded&&quality==='desktop'&&(isHero||focusBlend<.01)?(isHero?1:.55):0,lightTheme,lightTheme?vehicleLighting.light.reflection:vehicleLighting.dark.reflection);host.dataset.floorReflection=String(!!floorReflection?.root.visible);
      renderer!.render(scene,camera);
      if(auditCorners&&isHero&&assetBounds){let left=Infinity,right=-Infinity,top=Infinity,bottom=-Infinity;
        auditCorners.forEach((v,i)=>{v.set(i&1?assetBounds!.max.x:assetBounds!.min.x,i&2?assetBounds!.max.y:assetBounds!.min.y,i&4?assetBounds!.max.z:assetBounds!.min.z).applyMatrix4(car.matrixWorld).project(camera);left=Math.min(left,v.x);right=Math.max(right,v.x);top=Math.min(top,v.y);bottom=Math.max(bottom,v.y);});
        host.dataset.frameBounds=JSON.stringify([left,top,right,bottom].map(v=>Math.round(v*1000)/1000));host.dataset.frameFits=String(left>=-1&&top>=-1&&right<=1&&bottom<=1);}
      if (warmup++===0) { host.appendChild(canvas);ready(); }
      // Skip shader warmup; collect only short consecutive active frames (not idle gaps).
      if(warmup>12) samples.push(elapsed);
      if(samples.length===36) {
        const decision=performanceDecision(samples,downgraded);samples.length=0;
        if(decision==='fallback') {fail();return;}
        if(decision==='lower') {downgraded=true;drive.interrupt();floorReflection?.root.removeFromParent();floorReflection?.dispose();floorReflection=undefined;lowerBody();renderer!.setPixelRatio(1);resize();}
      }
      host.dataset.triangles=String(renderer!.info.render.triangles);
      host.dataset.drawCalls=String(renderer!.info.render.calls);
      host.dataset.quality=downgraded?'low':quality;
    } catch { fail();return; }
    const moving=partsMoving||(!isHero&&rotation.read().resetting)||(!isHero&&Math.abs(rotation.read().velocity)>.00001)||(Math.abs(manualYaw)>.001&&Math.abs(inspectionWeight-(inspection?1:0))>.001)||Math.abs(focusBlend-focusTarget)>.001||drivingActive||Math.abs(cameraOrbit-(isHero?driving.cameraTurn:0))>.001||Math.abs(driveX-(isHero?driving.carX:0))>.001||Math.abs(bodyPitch)>.0002||Math.abs(bodyLift)>.0002||(isHero&&!reveal.settled)||Math.abs(progress-current.progress)>.001 || Math.abs(pointer.x-current.x)>.001 || Math.abs(pointer.y-current.y)>.001 || current.selected.some((v,i)=>Math.abs(v-(selected===i?1:0))>.001) || (managed && (Object.keys(cinematic) as (keyof JourneyPose)[]).some(k=>Math.abs(cinematic[k]-targetPose[k])>.001));
    host.dataset.rendering=moving?'active':'idle';
    rotationReady=inspection&&!disposed;host.dataset.rotateReady=String(rotationReady);host.dataset.rotation=rotationDegrees(manualYaw).toFixed(1);host.dataset.theme=lightTheme?'light':'dark';host.parentElement?.setAttribute('data-inspecting',String(Math.abs(manualYaw)>.001));
    host.dataset.intro=drivingActive?'reveal':'settled';
    host.dataset.driveState=isHero?driving.state:'scroll-transition';host.dataset.driveProgress=driving.progress.toFixed(3);
    host.dataset.componentView=focusBlend>.5?(selected===1?'wheel':'battery'):'vehicle';host.dataset.scanState='solid';
    if(isHero)host.dataset.heroViewAngle=(Math.abs(Math.atan2(camera.position.z-car.position.z,camera.position.x-car.position.x)+car.rotation.y)*180/Math.PI).toFixed(1);
    host.dataset.wheelAngle=wheelAngle.toFixed(3);host.dataset.driveVelocity=driving.velocity.toFixed(3);host.dataset.wheelAxis='z';
    if(moving) schedule(); else previous=0;
  }
  function resize() {
    if(disposed || !renderer) return;
    const width=host.clientWidth,height=host.clientHeight;if(!width || !height) return;
    try { renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();if(!managed)scroll();schedule(); } catch { fail(); }
  }
  const fill=new THREE.HemisphereLight(theme.sky,theme.ground,1.8),rim=new THREE.DirectionalLight(theme.rim,2.2);
  const key=new THREE.DirectionalLight(theme.key,3.1), accent=new THREE.PointLight(theme.accent,6,10,2);
  try {
    const context=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'low-power',failIfMajorPerformanceCaveat:true});
    if(!context) throw new Error('WebGL2 unavailable');
    renderer=new THREE.WebGLRenderer({canvas,context,alpha:true,antialias:true});
    renderer.debug.onShaderError=()=> { throw new Error('Shader compilation failed'); };
    renderer.setPixelRatio(sceneDpr(quality,devicePixelRatio));renderer.setClearColor(theme.transparentClear,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
    const environment=prefilterStudioEnvironment(renderer,studioSource);studio=environment.texture;disposeEnvironment=environment.dispose;for(const m of [silver,glass,alloy,disc,wheelMarker])m.envMap=studio;
    canvas.addEventListener('webglcontextlost',contextLost);
    scene.add(fill);key.position.set(3,6,4);scene.add(key);
    if(quality==='desktop') {rim.color.setHex(theme.accent);rim.position.set(-3,2.2,3.6);scene.add(rim);}
    scene.add(accent);
    // Original long-wheelbase sedan: smooth lofted shoulders, recessed wheel arches,
    // four-door glazing and a low fastback roof. All surfaces are procedural.
    const makeShell=(count:number)=>geo(createExecutiveShell(count));
    const shell=makeShell(quality==='desktop'?64:32);
    const shellMesh=mesh(shell,silver,body);shellMesh.name='sedan-sculpted-shell';shellMesh.userData.design='executive-performance-sedan';
    lowerBody=()=>{const old=shellMesh.geometry;shellMesh.geometry=makeShell(12);geometries.delete(old);old.dispose();};
    mesh(geo(createExecutiveCabin(quality==='desktop'?32:20)),glass,body).name='executive-four-door-glazing';
    mesh(geo(createExecutiveRoof()),silver,body).name='painted-executive-roof';
    block(body,dark,[3.95,.1,1.7],[0,.61,0]);
    for(const z of [-.735,.735]) {
      // The B pillar and two flush handles establish four doors from the actual camera.
      block(body,dark,[.055,.4,.04],[-.16,1.45,z*.9]).name='executive-b-pillar';
      for(const x of [-.82,.56])block(body,alloy,[.16,.025,.025],[x,1.16,z*1.28]).name='flush-door-handle';
      for(const x of [-1.18,-.16,1.03])block(body,dark,[.012,.38,.012],[x,.93,z*1.29]).name='door-seam';
      block(body,dark,[3.05,.075,.085],[0,.69,z*1.24]);

      block(body,dark,[.23,.065,.15],[.73,1.36,z*1.18]).name='executive-mirror';
      // Fine shoulder edge and hood crease, with no branded graphic or badge.
      block(body,silver,[2.8,.012,.018],[-.12,1.24,z*1.25]);
      const creasePath=new THREE.CatmullRomCurve3([new THREE.Vector3(1.03,1.292,z*.56),new THREE.Vector3(1.6,1.264,z*.53),new THREE.Vector3(2.16,1.132,z*.47)]);mesh(geo(new THREE.TubeGeometry(creasePath,12,.006,4,false)),silver,body).name='executive-hood-character-line';
    }
    block(body,dark,[.1,.095,1.32],[2.35,.805,0]).name='technical-front-intake';
    block(body,dark,[.16,.035,1.72],[2.3,.69,0]).name='front-splitter';
    block(body,dark,[.15,.09,1.5],[-2.27,.73,0]).name='rear-diffuser';
    for(const z of [-.58,.58]) {
      block(body,red,[.025,.024,.24],[2.36,.705,z]).name='front-aero-accent';
      block(body,red,[.025,.024,.22],[-2.36,.735,z]).name='rear-diffuser-accent';
    }
    for(const z of [-.5,.5]){
      block(body,dark,[.045,.055,.48],[2.36,1.005,z]).name='headlight-housing';
      block(body,signature,[.03,.014,.43],[2.385,1.015,z]).name='white-led-signature';
      block(body,dark,[.07,.16,.1],[2.3,.83,z*1.12]);
      for(let i=0;i<3;i++)block(body,white,[.035,.018,.065],[2.385,.985,z+(.085*(i-1))]).name='segmented-headlight';
      block(body,rearLight,[.035,.022,.35],[-2.36,1.035,z]).name='rear-led-module';
    }
    block(body,dark,[.035,.025,.52],[-2.36,1.035,0]);

    const serviceWheel=buildWheels({rubber,alloy,brake:disc,machined:wheelMarker,trim:dark,red},geo);
    const boltBase=new THREE.CylinderGeometry(.012,.012,.014,8);boltBase.rotateX(Math.PI/2);
    const boltSets=new Map<number,THREE.BufferGeometry>();for(const side of [-1,1]){
      const pieces=Array.from({length:5},(_,i)=>{const a=i/5*Math.PI*2;return boltBase.clone().translate(Math.cos(a)*.052,Math.sin(a)*.052,side*.17);});
      boltSets.set(side,geo(mergeGeometries(pieces)!));pieces.forEach(g=>g.dispose());
    }boltBase.dispose();
    for(const x of [-1.6,1.6])for(const z of [-.96,.96]){
      const built=serviceWheel.create(x,z,1.02),group=built.steer,roll=built.roll;group.position.y=.52;group.name=`${x>0?'front':'rear'}-${z<0?'left':'right'}-steering`;roll.name='wheel-roll';car.add(group);
      const caliper=group.getObjectByName('fixed-red-caliper')!;caliper.name='fixed-caliper';caliper.position.z=0;caliper.rotation.z=0;
      const brake=roll.getObjectByName('brake-disc') as THREE.Mesh;wheelGroups.push({group,roll,front:x>0,z,brake});
      mesh(boltSets.get(Math.sign(z))!,wheelMarker,roll).name='wheel-hub-bolts';
    }
    batchBlocks(body);
    battery=new THREE.Group();battery.name='illustrative-battery-assembly';body.add(battery);battery.position.set(1.2,1.06,-.15);
    mesh(geo(roundedCase(.52,.30,.42,.02)),batteryMaterial,battery).name='rounded-battery-case';
    mesh(geo(roundedCase(.54,.055,.44,.009)),dark,battery,0,.177,0).name='stepped-battery-lid';
    const terminal=geo(new THREE.CylinderGeometry(.028,.034,.045,20));
    for(const x of [-.17,.17]){mesh(terminal,alloy,battery,x,.23,0).name='metal-battery-terminal';mesh(geo(roundedCase(.085,.025,.075,.005)),x>0?red:dark,battery,x,.201,0).name='terminal-base';}
    const strap=geo(new THREE.TorusGeometry(.11,.012,6,24,Math.PI));const handle=mesh(strap,dark,battery,0,.23,0);handle.scale.z=.35;handle.name='battery-carry-handle';
    mesh(geo(roundedCase(.055,.025,.46,.006)),alloy,battery,0,-.165,0).name='battery-hold-down';
    const contactMap=createContactFalloff();textures.add(contactMap);
    const contact=geo(new THREE.PlaneGeometry(1,1));
    const shadow=(x:number,z:number,sx:number,sz:number,opacity:number)=>{
      const m=new THREE.MeshBasicMaterial({color:theme.contact,map:contactMap,transparent:true,opacity,depthWrite:false});materials.add(m);
      const patch=mesh(contact,m,shadowRoot,x,.003,z);patch.rotation.x=-Math.PI/2;patch.scale.set(sx,sz,1);patch.userData.shadowOpacity=opacity;return patch;
    };
    shadow(0,0,5.45,2.65,.31);shadow(0,0,4.5,1.8,.23);
    for(const x of GT_AXLES)for(const z of [-GT_DIMENSIONS.track/2,GT_DIMENSIONS.track/2])tireShadows.push(shadow(x,z,.94,.64,.48));
    // Budget: existing shell and four shared tyre buffers, one basic material, no extra pass.
    floorReflection=createFloorReflection(car,quality==='tablet',m=>m.name==='sedan-sculpted-shell'||m.name==='sculpted-tire');scene.add(floorReflection.root);
    const updateTheme=()=>{
      lightTheme=getTheme()==='light';host.dataset.theme=lightTheme?'light':'dark';
      for(const paint of [silver,glass,alloy,disc])paint.envMapIntensity=lightTheme?vehicleLighting.light.environment:vehicleLighting.dark.environment;
      renderer!.toneMappingExposure=lightTheme?vehicleLighting.light.exposure:vehicleLighting.dark.exposure;
      fill.groundColor.setHex(lightTheme?vehicleLighting.light.ground:vehicleLighting.dark.ground);
      shadowRoot.children.forEach(child=>{const m=(child as THREE.Mesh).material as THREE.MeshBasicMaterial;m.opacity=Number(child.userData.shadowOpacity)*(lightTheme?1.2:1);});
      schedule();
    };
    updateTheme();unsubscribeTheme=subscribeTheme(updateTheme);
    bindRotation(host,true);
    document.addEventListener('visibilitychange',visibility);
    resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
    if(!managed) {
    intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){scroll();schedule();}else {cancel();host.dataset.rendering='paused';}}, {threshold:0});intersection.observe(surface);
    window.addEventListener('scroll',scroll,{passive:true});
    unsubscribe=subscribeDepth(surface,point=>{if(chapter==='hero')return;pointer=point;schedule();});
    }
    resize();
    host.dataset.model='awaiting-licensed-asset';solidChanged?.('loading');
    void loadVehicleModel(studio).then(model=>{
      if(disposed){model.dispose();return;}realistic=model;model.contactPoints.forEach((p,i)=>{const shadow=tireShadows[i];if(shadow){shadow.position.x=p.x;shadow.position.z=p.z;}});assetBounds=new THREE.Box3().setFromObject(model.root);car.add(model.root);
      floorReflection?.root.removeFromParent();floorReflection?.dispose();floorReflection=createFloorReflection(model.root,quality==='tablet',mesh=>model.reflectionMeshes.has(mesh));scene.add(floorReflection.root);host.dataset.model='licensed-imported-sports-gt';solidChanged?.('ready');schedule();
    }).catch(()=>{if(!disposed){host.dataset.model='existing-coded-sedan';solidChanged?.('unavailable');schedule();}});schedule();
  } catch {fail();}
  return {
    inspect,
    focus(value){componentFocus=value;schedule();},
    technical(){schedule();},
    quality(value){quality=value;renderer?.setPixelRatio(sceneDpr(downgraded?"tablet":quality,devicePixelRatio));resize();},
    motion(){drive.interrupt();heroElapsed=1900;finishGesture();schedule();},
    select(index){selected=Math.max(0,Math.min(3,index));schedule();},dispose,
    pointer(point){if(chapter==='hero')return;if(gesture?.horizontal||Math.abs(rotation.read().yaw)>.001)return;pointer=point;schedule();},
    pause(){rotationReady=false;host.dataset.rotateReady='false';finishGesture();if(managed&&chapter==='hero'){drive.interrupt();heroElapsed=1900;}visible=false;cancel();host.dataset.rendering='paused';host.dataset.driveState='offscreen';},
    present(nextHost,nextSurface,nextChapter,nextProgress){
      if(disposed)return;
      if(nextChapter==='hero'&&warmup===0){const entrance=drive.read();driveX=entrance.carX;cameraOrbit=entrance.cameraTurn;current.progress=nextProgress;Object.assign(cinematic,journeyPose('hero',nextProgress));cinematic.distance+=entrance.cameraDolly;}
      if(host!==nextHost){finishGesture();bindRotation(host,false);resizeObserver?.unobserve(host);host.dataset.rendering='paused';host.dataset.driveState='scroll-transition';host.dataset.intro='settled';host=nextHost;surface=nextSurface;resizeObserver?.observe(host);if(warmup>0)host.appendChild(canvas);resize();}
      if(nextChapter!=='hero'){drive.interrupt();heroElapsed=1900;}
      if(chapter!==nextChapter){finishGesture();rotationReady=false;host.dataset.rotateReady='false';}
      chapter=nextChapter;if(chapter==='hero'){bindRotation(host,false);body.visible=false;}else bindRotation(host,true);progress=nextProgress;visible=true;pointer={x:0,y:0};schedule();
    }
  };
}
