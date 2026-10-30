import {createInspection,extractRegion} from './inspection';
import {GT_DIMENSIONS as D,GT_AXLES} from './design';
import {frontBumper,intakeBack,intakeWalls,bumperX} from './fascia';
import * as THREE from 'three';
import { mergeGeometries,mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { carMaterials } from './materials';
import {buildWheels,type CarWheel} from './wheels';
import {sculptedBody,canopySurface,sideGlass,cabinAt,bodyAtX,bodyTopHeight,wheelWell,curvedRibbon,lightBlade,gridSurface} from './surfaces';
export type CodedVehicle={root:THREE.Group;wheels:CarWheel[];materials:Set<THREE.MeshStandardMaterial>;inspection:ReturnType<typeof createInspection>;dispose():void};
/** An original closed 3D GT, entirely authored in code. No model/image/network input. */
export function createCodedVehicle(environment:THREE.Texture,compact=false):CodedVehicle{
 const root=new THREE.Group();root.name='toli-coded-grand-tourer';
 const geometries=new Set<THREE.BufferGeometry>(),m=carMaterials(environment),materials=new Set<THREE.MeshStandardMaterial>(Object.values(m));
 const geo=(g:THREE.BufferGeometry)=>{geometries.add(g);return g;};
 const staticParts=new THREE.Group();staticParts.name='sculpted-coachwork';root.add(staticParts);
 const mesh=(name:string,g:THREE.BufferGeometry,material:THREE.Material,parent:THREE.Object3D=staticParts)=>{const n=new THREE.Mesh(geo(g),material);n.name=name;parent.add(n);return n;};
 const line=(name:string,points:number[][],material:THREE.Material,radius=.005)=>mesh(name,curvedRibbon(points.map(p=>new THREE.Vector3(...p as [number,number,number])),radius,24),material);
 const pivot=(name:string,position:number[])=>{const g=new THREE.Group();g.name=name;g.position.fromArray(position);root.add(g);return g;};
 const parts={leftDoor:pivot('LeftDoor',[D.doorFront,.5,.78]),rightDoor:pivot('RightDoor',[D.doorFront,.5,-.78]),hood:pivot('Hood',[1.12,bodyTopHeight(1.12,0),0]),leftMirror:pivot('LeftMirror',[.72,1.21,.75]),rightMirror:pivot('RightMirror',[.72,1.21,-.75])};
 const inspection=createInspection(parts);
 parts.leftDoor.userData.inspectionPart='leftDoor';parts.rightDoor.userData.inspectionPart='rightDoor';parts.hood.userData.inspectionPart='hood';parts.leftMirror.userData.inspectionPart=parts.rightMirror.userData.inspectionPart='mirrors';
 const movingMesh=(name:string,g:THREE.BufferGeometry,material:THREE.Material,parent:THREE.Group)=>{const n=mesh(name,g,material,root);parent.attach(n);return n;};
 let shell=sculptedBody(compact?72:112);
 const cut=(min:number[],max:number[])=>{const result=extractRegion(shell,new THREE.Vector3().fromArray(min),new THREE.Vector3().fromArray(max));shell.dispose();shell=result.rest;return result.panel;};
 const bonnet=cut([1.12,.93,-.70],[2.25,1.5,.70]);movingMesh('hinged-bonnet-skin',bonnet,m.paint,parts.hood);movingMesh('bonnet-inner-lining',bonnet.clone().translate(0,-.014,0),m.trim,parts.hood);
 for(const side of [-1,1]){const door=side>0?parts.leftDoor:parts.rightDoor;
  movingMesh('hinged-door-skin',cut([D.doorRear,.33,side>0?.78:-1.3],[D.doorFront,1.4,side>0?1.3:-.78]),m.paint,door);
  const inner=movingMesh('door-inner-panel',new THREE.BoxGeometry(1.60,.54,.025).translate(-.14,.69,side*.795),m.trim,door);
  for(const x of [D.doorRear+.025,D.doorFront-.025])movingMesh('door-edge-return',new THREE.BoxGeometry(.035,.72,.16).translate(x,.70,side*.88),m.trim,door);
  inner.name='door-inner-panel';
 }
 // Remove the old solid deck inside the passenger cell, exposing the existing seats.
 cut([D.doorRear,.60,-.78],[D.doorFront,1.4,.78]).dispose();
 mesh('sculpted-body-with-open-wheel-arches',shell,m.paint);
 const bay=mesh('illustrative-under-hood-bay',new THREE.BoxGeometry(1.12,.15,1.34),m.intake);bay.position.set(1.68,.81,0);
 const cover=mesh('generic-drive-cover',new THREE.BoxGeometry(.65,.09,.74),m.trim);cover.position.set(1.65,.915,0);
 for(const z of [-.49,.49]){const region=mesh('generic-service-reservoir',new THREE.CylinderGeometry(.075,.075,.10,12),m.interior);region.position.set(1.45,.94,z);}
 const cabinFloor=mesh('cabin-dark-floor',new THREE.BoxGeometry(1.8,.08,1.5),m.interior);cabinFloor.position.set(-.12,.57,0);

 for(const x of [1.12,-1.72])line(x>0?'hood-shutline':'rear-deck-shutline',Array.from({length:17},(_,i)=>{const z=-.68+i/16*1.36;return [x,bodyTopHeight(x,z/bodyAtX(x).y)+.001,z];}),m.trim,.0025);
 mesh('flowing-paint-roof',canopySurface(.26,.62,32,true),m.paint);
 mesh('curved-windshield',canopySurface(.62,1,32),m.glass);
 mesh('rear-glass',canopySurface(0,.26,24),m.glass);
 for(const side of [-1,1]){
  const door=side>0?parts.leftDoor:parts.rightDoor,glassSource=sideGlass(side),splitGlass=extractRegion(glassSource,new THREE.Vector3(D.doorRear,0,-2),new THREE.Vector3(D.doorFront,2,2));glassSource.dispose();
  mesh('fixed-quarter-glass',splitGlass.rest,m.glass);movingMesh('shaped-side-glass',splitGlass.panel,m.glass,door);
  for(const t of [.03,.27,.61,.97]){const p=cabinAt(t,1);line(t===.61?'a-pillar':'window-pillar',[[p.x,1.13,side*.77],[p.x,p.y,side*p.z]],t===.27?m.paint:m.trim,t===.27?.024:.014);}
  line('upper-window-surround',Array.from({length:24},(_,i)=>{const p=cabinAt(i/23,1,.007);return [p.x,p.y,side*p.z];}),m.trim,.012);
  line('window-beltline',[[-1.65,1.13,side*.77],[-.6,1.135,side*.78],[.45,1.13,side*.78],[1.20,1.135,side*.73]],m.machined,.005);
  // Fine shut lines and a subtle lower concave channel; they follow actual body surfaces.
  for(const x of [D.doorRear,D.doorFront])line('door-shutline',[[x,1.1,side*.95],[x+.025,.94,side*.991],[x+.01,.65,side*.985],[x-.08,.34,side*.965]],m.trim,.003);
  for(const x of [D.handleX]){const handle=line('flush-door-handle',[[x-.07,1.045,side*.989],[x+.07,1.045,side*.989]],m.machined,.009);door.attach(handle);}
  line('restrained-side-skirt',[[-1.03,.27,side*.98],[-.5,.245,side*1.01],[.65,.25,side*1.01],[1.04,.31,side*1.01]],m.trim,.036);
  for(const axle of GT_AXLES){
   const arch=Array.from({length:33},(_,i)=>{const a=i/32*Math.PI;return [axle+D.archRadius*Math.cos(a),D.axleHeight+D.archRadius*Math.sin(a),side*bodyAtX(axle+D.archRadius*Math.cos(a)).y*.985];});
   line('wheel-arch-return',arch,m.paint,.017);
   const well=wheelWell(axle,side);mesh('recessed-wheel-well-liner',well.tunnel,m.intake);mesh('wheel-well-inner-backing',well.backing,m.intake);
  }
  const stalk=line('mirror-stalk',[[.72,1.21,side*.75],[.72,1.24,side*.95]],m.trim,.015);stalk.name='aero-mirror-stalk';
  const mirror=mesh('sculpted-mirror-housing',new THREE.SphereGeometry(1,24,12),m.paint);mirror.scale.set(.145,.055,.075);mirror.position.set(.72,1.27,side*1.02);
  const reflect=mesh('mirror-glass',new THREE.SphereGeometry(1,16,8),m.mirror);reflect.scale.set(.006,.036,.057);reflect.position.set(.605,1.27,side*1.02);
  const mirrorPivot=side>0?parts.leftMirror:parts.rightMirror;mirrorPivot.attach(stalk);mirrorPivot.attach(mirror);mirrorPivot.attach(reflect);door.attach(mirrorPivot);
  for(const rear of [false,true]){
   const housing=mesh(rear?'rear-lamp-housing':'headlamp-housing',lightBlade(side,rear),m.trim);housing.scale.set(1,1.035,1.01);
   const reflector=mesh('inner-lamp-reflector',lightBlade(side,rear,.014),m.reflector);reflector.position.x=rear?-.016:.016;
   const light=mesh(rear?'thin-red-signature':'curved-white-led',lightBlade(side,rear,.007),rear?m.tail:m.led);light.scale.set(1.003,.995,1);light.position.x=rear?-.028:.028;
   // Lens sits just in front of the emitting tube; not a floating rectangle.
   const lens=mesh('lamp-lens',lightBlade(side,rear,.025),m.lens);lens.position.x=rear?-.034:.034;lens.scale.y=1.006;
  }
 }
 // Front and rear apertures are swept profiles, rather than a box grille.
 const fascia=(rear:boolean)=>{
    const shape=new THREE.Shape();shape.moveTo(-.67,.49);shape.quadraticCurveTo(-.7,.46,-.64,.40);shape.lineTo(.64,.40);shape.quadraticCurveTo(.70,.46,.67,.49);shape.quadraticCurveTo(0,.57,-.67,.49);
  const g=new THREE.ExtrudeGeometry(shape,{depth:.018,bevelEnabled:true,bevelSegments:2,bevelSize:.018,bevelThickness:.01,steps:1});g.rotateY(Math.PI/2);if(rear){const intake=mesh('rear-diffuser',g,m.trim);intake.position.x=-2.53;}else{
   g.dispose();
   mesh('recessed-intake-back',intakeBack(),m.intake);mesh('intake-return-walls',intakeWalls(),m.trim);
   for(let z=-.56;z<.6;z+=.14)line('recessed-grille-vane',[[bumperX(.405,z)-.06,.405,z],[bumperX(.515,z)-.06,.515,z]],m.trim,.006);
  }
  line(rear?'rear-lower-lip':'front-splitter',[[rear?-2.50:2.49,.34,-.81],[rear?-2.56:2.59,.32,0],[rear?-2.50:2.49,.34,.81]],m.trim,.025);
  for(const z of [-.70,.70])line('technical-side-opening',[.58,.67,.74].map(y=>{const v=(y-.28)/.605;return [rear?-2.49:2.49+(.065+.06*Math.sin(v*Math.PI))*(1-(z/.78)**2),y,z];}),m.trim,.014);
 };
 fascia(false);fascia(true);
 mesh('compound-curved-front-bumper',frontBumper(),m.paint);

 const floor=mesh('closed-dark-underbody',new THREE.BoxGeometry(4.45,.09,1.65),m.trim);floor.position.y=.30;
 // Interior is deliberately modest, but windows reveal actual volumes instead of an empty shell.
 const interior=new THREE.Group();interior.name='interior';staticParts.add(interior);
 for(const z of [-.36,.36]){
  const seatSurface=gridSurface(Array.from({length:13},(_,i)=>{
   const t=i/12,y=.91+t*.46,width=.17-.025*t+.025*Math.sin(t*Math.PI);
   return Array.from({length:13},(_,j)=>{const u=-1+j/6;return [-.30-.18*t+.055*u*u,y,z+u*width];});
  }));
  mesh('front-seat-back',seatSurface,m.interior,interior);
  const cushion=mesh('seat-cushion',new THREE.SphereGeometry(1,16,8),m.interior,interior);cushion.position.set(-.22,.89,z);cushion.scale.set(.29,.07,.20);
  const head=mesh('headrest',new THREE.CapsuleGeometry(.10,.06,4,10),m.interior,interior);head.position.set(-.43,1.43,z);head.scale.set(.7,1,1);
 }
 // Rear cabin volumes remain low enough to sit under the sloping backlight.
 for(const z of [-.35,.35]){
  const back=mesh('rear-seat-back',new THREE.CapsuleGeometry(.14,.15,4,12),m.interior,interior);back.position.set(-1.04,1.12,z);back.scale.set(.75,1,1);back.rotation.z=-.12;
  const base=mesh('rear-seat-cushion',new THREE.SphereGeometry(1,16,8),m.interior,interior);base.position.set(-.89,.88,z);base.scale.set(.23,.065,.20);
 }
 const shelf=mesh('rear-parcel-shelf',new THREE.BoxGeometry(.35,.035,1.10),m.interior,interior);shelf.position.set(-1.30,1.08,0);
 const dash=mesh('dashboard',new THREE.CapsuleGeometry(.105,1.03,4,16),m.interior,interior);dash.rotation.x=Math.PI/2;dash.position.set(.64,1.10,0);
 const console=mesh('center-console',new THREE.CapsuleGeometry(.08,.65,4,12),m.trim,interior);console.rotation.z=Math.PI/2;console.position.set(.05,.84,0);
 const steering=mesh('unbadged-steering-wheel',new THREE.TorusGeometry(.135,.018,6,32),m.trim,interior);steering.rotation.y=Math.PI/2;steering.rotation.z=-.25;steering.position.set(.33,1.22,.36);
 interior.scale.y=.85;interior.position.y=.10;
 const factory=buildWheels(m,geo),wheels:CarWheel[]=[];for(const x of GT_AXLES)for(const z of [-D.track/2,D.track/2]){const wheel=factory.create(x,z);root.add(wheel.steer);wheels.push(wheel);}
 // Window seals are split at the same door boundaries, so no trim floats across an open door.
 for(const child of [...staticParts.children])if(child instanceof THREE.Mesh&&['upper-window-surround','window-beltline'].includes(child.name)){
  const pos=child.geometry.getAttribute('position'),side=pos.getZ(0)>0?1:-1,door=side>0?parts.leftDoor:parts.rightDoor;
  const split=extractRegion(child.geometry,new THREE.Vector3(D.doorRear,0,-2),new THREE.Vector3(D.doorFront,2,2));
  if(geometries.delete(child.geometry))child.geometry.dispose();child.geometry=geo(split.rest);movingMesh('door-window-seal',split.panel,child.material as THREE.Material,door);
 }
 // Merge static surfaces per material and attribute layout. Wheel pivots stay separate.
 staticParts.updateMatrixWorld(true);
 const buckets=new Map<string,THREE.Mesh[]>();staticParts.traverse(n=>{if(n instanceof THREE.Mesh){const key=(Array.isArray(n.material)?n.material[0]:n.material).uuid+Object.keys(n.geometry.attributes).sort().join();const list=buckets.get(key)??[];list.push(n);buckets.set(key,list);}});
 const merged=new THREE.Group();merged.name='batched-coachwork';
 for(const list of buckets.values()){
  const copies=list.map(n=>(n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone()).applyMatrix4(n.matrixWorld)),raw=mergeGeometries(copies),geometry=raw?mergeVertices(raw,1e-5):null;raw?.dispose();copies.forEach(g=>g.dispose());
  if(geometry){const part=new THREE.Mesh(geo(geometry),list[0].material);part.name=list.map(n=>n.name).join('/');merged.add(part);}else throw new Error('Incompatible generated surfaces');
 }
 for(const list of buckets.values())for(const n of list)if(geometries.delete(n.geometry))n.geometry.dispose();
 staticParts.clear();root.remove(staticParts);root.add(merged);
 // Merge compatible details in each hinge's local space; nested mirror pivots stay separate.
 for(const group of [parts.leftDoor,parts.rightDoor,parts.hood]){
  const buckets=new Map<THREE.Material,THREE.Mesh[]>();for(const n of group.children)if(n instanceof THREE.Mesh&&!Array.isArray(n.material)){const list=buckets.get(n.material)??[];list.push(n);buckets.set(n.material,list);}
  for(const [material,list] of buckets)if(list.length>1){group.updateMatrixWorld(true);const inverse=group.matrixWorld.clone().invert(),copies=list.map(n=>(n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone()).applyMatrix4(inverse.clone().multiply(n.matrixWorld))),raw=mergeGeometries(copies)!,joined=mergeVertices(raw,1e-5);raw.dispose();copies.forEach(g=>g.dispose());
   const combined=new THREE.Mesh(geo(joined),material);combined.name=list.map(n=>n.name).join('/');
   for(const n of list){group.remove(n);if(geometries.delete(n.geometry))n.geometry.dispose();}group.add(combined);
  }
 }
 let disposed=false;return {root,wheels,materials,inspection,dispose(){if(disposed)return;disposed=true;geometries.forEach(g=>g.dispose());const textures=new Set<THREE.Texture>();materials.forEach(material=>{for(const [key,value] of Object.entries(material))if(key!=='envMap'&&value instanceof THREE.Texture)textures.add(value);material.dispose();});textures.forEach(texture=>texture.dispose());root.clear();}};
}
