import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {demandFrames} from './lifecycle';
import {sceneQuality,sceneDpr} from '../vehicle-policy';
import {bindWorkshopDrag} from './drag';
import {workshopUrl} from './asset';
import {workshopFrameReady} from './readiness';
export type WorkshopPreset='overview'|'interior'|'reception';
export type WorkshopMetrics={paused?:boolean;observedVisible?:boolean;state:string;preset:WorkshopPreset;dpr:number;drawCalls:number;triangles:number;textures:number;geometries:number;frames:number;pending:boolean;visible:boolean;loadMs?:number;decodeMs?:number;initMs?:number;renderCpuMs?:number;transferBytes?:number;encodedBytes?:number;resourceMs?:number;reducedMotion?:boolean;bounds?:number[][]};
// Cache bytes only, never GPU objects. Failed URLs stay failed; no automatic retry loop.
const downloads=new Map<string,Promise<ArrayBuffer>>();
export function loadWorkshopBytes(url:string) {
  if(!downloads.has(url))downloads.set(url,fetch(url).then(r=>{if(!r.ok)throw new Error('Workshop unavailable');return r.arrayBuffer();}));
  return downloads.get(url)!;
}
export function disposeWorkshop(root:THREE.Object3D) {
  const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>(),images=new Set<{close?:()=>void}>();
  root.traverse(o=>{if(o instanceof THREE.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const v of Object.values(m))if(v instanceof THREE.Texture)textures.add(v);}}});
  geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>{if(t.image)images.add(t.image);t.dispose();});images.forEach(i=>i.close?.());root.clear();
}

/** Restore caller-owned renderer state when switching back to another scene. */
export function preserveRendererSettings(renderer:THREE.WebGLRenderer) {
  const viewport=renderer.getViewport?.(new THREE.Vector4()),scissor=renderer.getScissor?.(new THREE.Vector4()),scissorTest=renderer.getScissorTest?.();
  const color=renderer.outputColorSpace,tone=renderer.toneMapping,exposure=renderer.toneMappingExposure,dpr=renderer.getPixelRatio(),size=renderer.getSize(new THREE.Vector2()),shadow=renderer.shadowMap.enabled,shadowType=renderer.shadowMap.type;
  return ()=>{renderer.outputColorSpace=color;renderer.toneMapping=tone;renderer.toneMappingExposure=exposure;renderer.shadowMap.enabled=shadow;renderer.shadowMap.type=shadowType;renderer.setPixelRatio(dpr);renderer.setSize(size.x,size.y,false);if(viewport)renderer.setViewport(viewport);if(scissor)renderer.setScissor(scissor);if(scissorTest!==undefined)renderer.setScissorTest(scissorTest);};
}

/** Renderer ownership stays with the host. No vehicle/Hero imports or material recoloring. */
export function createWorkshopScene(renderer:THREE.WebGLRenderer,host:HTMLElement,onMetrics:(m:WorkshopMetrics)=>void,onState:(s:'loading'|'ready'|'failed')=>void,url=workshopUrl(),scrollSafe=false) {
  let contextLost=false,environmentNeedsRefresh=false;let debug:ReturnType<typeof import('./debug')['workshopDebug']>|undefined;
  const diagnostic=(event:string)=>debug?.update(event,{asset:model?'ready':'loading',active:!paused,owner:renderer.domElement.parentElement===host?'workshop':'other',context:contextLost?'lost':'available',viewport:[host.clientWidth,host.clientHeight],camera:cameraValid(),model:modelValid(),requested,rendered:stats.frames,lastRender,scissor:renderer.getScissor(new THREE.Vector4()).toArray(),scissorTest:renderer.getScissorTest()});
  let requested=0,lastRender:number|null=null,reportedReady=false;
  let disposed=false,visible=true,paused=false,model:THREE.Group|undefined,fitPoints:Float32Array|undefined;
  let restoreRenderer=preserveRendererSettings(renderer);
  const started=performance.now(),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.05,250);
  scene.background=new THREE.Color('#24272b');
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.AgXToneMapping;renderer.toneMappingExposure=.95;
  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;controls.enablePan=false;
  // Keep OrbitControls as the camera solver, without its production wheel/touch interception.
  if(scrollSafe)controls.disconnect();
  const removeDrag=scrollSafe?bindWorkshopDrag(renderer.domElement,()=>!paused&&visible&&!disposed,turn):()=>{};
  const stats:WorkshopMetrics={state:'loading',preset:scrollSafe?'interior':'overview',dpr:1,drawCalls:0,triangles:0,textures:0,geometries:0,frames:0,pending:false,visible:true,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches};
  const box=new THREE.Box3(),center=new THREE.Vector3();
  const environmentScene=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);let environment=pmrem.fromScene(environmentScene,.04);environmentScene.dispose();pmrem.dispose();scene.environment=environment.texture;scene.environmentIntensity=.35;
  const hemisphere=new THREE.HemisphereLight(0xf4f6ff,0x77726b,1.1),key=new THREE.DirectionalLight(0xffffff,2),fill=new THREE.DirectionalLight(0xdce4ef,.75);
  key.position.set(8,18,12);fill.position.set(-8,9,-24);scene.add(hemisphere,key,fill);
  // A single bounded shadow map on desktop; mobile keeps real geometry at lower raster cost.
  key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0003;key.shadow.normalBias=.035;
  Object.assign(key.shadow.camera,{left:-26,right:26,top:26,bottom:-26,near:.5,far:85});key.shadow.camera.updateProjectionMatrix();key.target.position.set(0,0,-14);scene.add(key.target);renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const cameraValid=()=>[...camera.position.toArray(),...controls.target.toArray(),camera.fov,camera.aspect,camera.near,camera.far].every(Number.isFinite)&&camera.aspect>0&&camera.fov>0&&camera.fov<180&&camera.near>0&&camera.far>camera.near;
  const modelValid=()=>!!model&&model.visible&&[...model.position.toArray(),...model.rotation.toArray().slice(0,3),...model.scale.toArray()].every(v=>typeof v==='number'&&Number.isFinite(v))&&model.scale.toArray().every(v=>v!==0);
  const allowed=()=>!disposed&&workshopFrameReady({asset:!!model,active:visible&&!paused,owner:renderer.domElement.parentElement===host,visible:!document.hidden,context:!contextLost&&!renderer.getContext?.().isContextLost(),width:host.clientWidth,height:host.clientHeight,camera:cameraValid(),model:modelValid()});
  const frames=demandFrames(()=>{
    try{if(environmentNeedsRefresh){
      environment.dispose();const room=new RoomEnvironment(),generator=new THREE.PMREMGenerator(renderer);
      try{environment=generator.fromScene(room,.04);scene.environment=environment.texture;environmentNeedsRefresh=false;}finally{room.dispose();generator.dispose();}
      renderer.setViewport(0,0,host.clientWidth,host.clientHeight);renderer.setScissor(0,0,host.clientWidth,host.clientHeight);renderer.setScissorTest(false);
    }const start=performance.now();renderer.render(scene,camera);stats.renderCpuMs=performance.now()-start;stats.frames++;stats.drawCalls=renderer.info.render.calls;stats.triangles=renderer.info.render.triangles;stats.textures=renderer.info.memory.textures;stats.geometries=renderer.info.memory.geometries;stats.pending=false;lastRender=performance.now();if(!reportedReady){reportedReady=true;onState('ready');}diagnostic('FRAME_RENDER');onMetrics({...stats,visible:allowed()});}catch{fail();}
  },allowed);
  const invalidate=()=>{if(allowed()&&!frames.pending()){requested++;diagnostic('FRAME_REQUEST');}frames.invalidate();};
  function fail(){if(disposed)return;stats.state='failed';dispose();onState('failed');}
  function preset(value:WorkshopPreset){
    if(disposed||!model)return;stats.preset=value;
    if(value==='overview'){
      box.getCenter(center);controls.target.copy(center);const direction=new THREE.Vector3(1,.6,1.3).normalize(),right=new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),direction).normalize(),up=new THREE.Vector3().crossVectors(direction,right).normalize();
      const tan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));let distance=0;
      const point=new THREE.Vector3();if(fitPoints)for(let i=0;i<fitPoints.length;i+=3){point.fromArray(fitPoints,i).sub(center);distance=Math.max(distance,point.dot(direction)+Math.max(Math.abs(point.dot(up))/tan,Math.abs(point.dot(right))/(tan*camera.aspect)));}
      camera.position.copy(center).addScaledVector(direction,distance*1.06);controls.minDistance=distance*.65;controls.maxDistance=distance*2;controls.minPolarAngle=.2;controls.maxPolarAngle=Math.PI*.49;controls.minAzimuthAngle=scrollSafe?Math.atan2(direction.x,direction.z)-.5:-Infinity;controls.maxAzimuthAngle=scrollSafe?Math.atan2(direction.x,direction.z)+.5:Infinity;
    }else if(value==='interior'){
      camera.position.set(.88765,1.82119,-5.36492);controls.target.set(-1.1,1.5,-27.5);controls.minDistance=12;controls.maxDistance=23;controls.minPolarAngle=Math.PI/2-.06;controls.maxPolarAngle=Math.PI/2+.06;controls.minAzimuthAngle=-.03;controls.maxAzimuthAngle=.09;
    }else{
      camera.position.set(-.2,1.9,-13);controls.target.set(4.2,2.5,-4.7);controls.minDistance=8.5;controls.maxDistance=11;controls.minPolarAngle=1.35;controls.maxPolarAngle=1.75;controls.minAzimuthAngle=-2.8;controls.maxAzimuthAngle=-2.5;
    }
    controls.update();invalidate();
  }
  let previousWidth=0,previousHeight=0;
  function resize(){
    if(disposed||(scrollSafe&&paused))return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h){frames.pause();diagnostic('VIEWPORT_ZERO');return;}
    const weak=navigator.hardwareConcurrency<=4||((navigator as Navigator & {deviceMemory?:number}).deviceMemory??8)<=4;const quality=sceneQuality(innerWidth,false,(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData,!weak);stats.dpr=sceneDpr(quality,devicePixelRatio);renderer.setPixelRatio(stats.dpr);renderer.setSize(w,h,false);renderer.setViewport(0,0,w,h);renderer.setScissor(0,0,w,h);renderer.setScissorTest(false);camera.aspect=w/h;camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(19))/Math.min(camera.aspect,1)));camera.updateProjectionMatrix();renderer.shadowMap.enabled=quality==='desktop';
    if(model&&stats.preset==='overview'&&(w!==previousWidth||h!==previousHeight))preset('overview');else invalidate();previousWidth=w;previousHeight=h;diagnostic('VIEWPORT_VALID');
  }
  const wake=()=>{diagnostic(document.hidden?'PAGE_HIDDEN':'PAGE_VISIBLE');if(!document.hidden&&!paused)resize();if(allowed())invalidate();else frames.pause();onMetrics({...stats,pending:frames.pending(),visible:allowed(),paused,observedVisible:visible});};
  const intersection=new IntersectionObserver(e=>{visible=e[0].isIntersecting;stats.visible=visible;controls.enabled=visible&&!paused;wake();onMetrics({...stats,pending:frames.pending()});});if(!scrollSafe)intersection.observe(host);
  const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(host);document.addEventListener('visibilitychange',wake);controls.addEventListener('change',invalidate);
  const lost=(e:Event)=>{e.preventDefault();contextLost=true;environmentNeedsRefresh=true;reportedReady=false;frames.pause();onState('loading');diagnostic('CONTEXT_LOST');};const restored=()=>{contextLost=false;diagnostic('CONTEXT_RESTORED');if(!paused)resize();invalidate();};renderer.domElement.addEventListener('webglcontextlost',lost);renderer.domElement.addEventListener('webglcontextrestored',restored);
  function dispose(){
    if(disposed)return;disposed=true;frames.dispose();intersection.disconnect();sizeObserver.disconnect();document.removeEventListener('visibilitychange',wake);renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.domElement.removeEventListener('webglcontextrestored',restored);debug?.dispose();controls.removeEventListener('change',invalidate);controls.dispose();removeDrag();if(model)disposeWorkshop(model);scene.clear();fitPoints=undefined;environment.dispose();key.shadow.map?.dispose();scene.environment=null;if(!scrollSafe||!paused)restoreRenderer();
  }
  if(import.meta.env.DEV&&new URLSearchParams(location.search).get('debugWorkshop')==='1')void import('./debug').then(module=>{if(disposed)return;debug=module.workshopDebug(host);diagnostic('FACILITY_REGISTER');});
  onState('loading');resize();
  loadWorkshopBytes(url).then(async bytes=>{
    if(disposed)return;stats.loadMs=performance.now()-started;const timing=performance.getEntriesByName(new URL(url,location.href).href).slice(-1)[0] as PerformanceResourceTiming|undefined;if(timing){stats.transferBytes=timing.transferSize;stats.encodedBytes=timing.encodedBodySize;stats.resourceMs=timing.duration;}const start=performance.now();const gltf=await new GLTFLoader().parseAsync(bytes,'');stats.decodeMs=performance.now()-start;
    if(disposed){disposeWorkshop(gltf.scene);return;}model=gltf.scene;model.traverse(o=>{if(o instanceof THREE.Mesh){o.castShadow=true;o.receiveShadow=true;}});scene.add(model);model.updateMatrixWorld(true);box.setFromObject(model);let count=0;model.traverse(o=>{if(o instanceof THREE.Mesh)count+=o.geometry.attributes.position.count;});fitPoints=new Float32Array(count*3);let at=0;const point=new THREE.Vector3();model.traverse(o=>{if(o instanceof THREE.Mesh){const positions=o.geometry.attributes.position;for(let i=0;i<positions.count;i++){point.fromBufferAttribute(positions,i).applyMatrix4(o.matrixWorld);point.toArray(fitPoints!,at);at+=3;}}});stats.bounds=[box.min.toArray(),box.max.toArray()];stats.state='ready';stats.initMs=performance.now()-started;resize();preset(scrollSafe?'interior':'overview');diagnostic('LOAD_READY');invalidate();
  }).catch(()=>{if(!disposed)fail();});
  function turn(delta:number){if(!model||disposed||paused)return;const offset=camera.position.clone().sub(controls.target);const spherical=new THREE.Spherical().setFromVector3(offset);spherical.theta=THREE.MathUtils.clamp(spherical.theta+delta,controls.minAzimuthAngle,controls.maxAzimuthAngle);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();invalidate();}
  return {preset,dispose,ensureFrame(){if(!disposed&&!paused){resize();invalidate();}},pause(value:boolean){if(value===paused){if(!value){resize();invalidate();}return;}
    if(scrollSafe){if(value)restoreRenderer();else{restoreRenderer=preserveRendererSettings(renderer);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.AgXToneMapping;renderer.toneMappingExposure=.95;renderer.shadowMap.type=THREE.PCFSoftShadowMap;}}
    paused=value;diagnostic(value?'OWNER_RELEASED':'OWNER_ACQUIRED');controls.enabled=!value&&visible;if(!value)resize();wake();},metrics:()=>({...stats,pending:frames.pending(),visible:allowed(),paused,observedVisible:visible}),turn,zoom(factor:number){if(!model||disposed)return;const offset=camera.position.clone().sub(controls.target);offset.setLength(THREE.MathUtils.clamp(offset.length()*factor,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(offset);controls.update();invalidate();}};
}
