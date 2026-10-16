import * as THREE from 'three';
import {createInspection} from '../premium-car/inspection';
import type {NodePath,VehicleModelManifest} from './contract';
export type ImportedVehicle={root:THREE.Group;wheels:{steer:THREE.Group;roll:THREE.Group;front:boolean;spinAxis:'x'|'y'|'z'}[];rollingRadius:number;contactPoints:THREE.Vector3[];reflectionMeshes:Set<THREE.Mesh>;materials:Set<THREE.MeshStandardMaterial>;inspection:ReturnType<typeof createInspection>;dispose():void};
export function resolveNode(root:THREE.Object3D,path:NodePath){
 if(!path.length)throw new Error('A movable/material node path cannot be empty');
 let node=root;for(const segment of path){const matches=node.children.filter(n=>n.name===segment);if(matches.length!==1)throw new Error(`Missing or ambiguous vehicle node: ${path.join(' / ')}`);node=matches[0];}return node;
}
export function disposeModel(root:THREE.Object3D,environment?:THREE.Texture){
 const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
 root.traverse(n=>{if(n instanceof THREE.Mesh){geometries.add(n.geometry);for(const m of Array.isArray(n.material)?n.material:[n.material])materials.add(m);}});
 for(const m of materials)for(const value of Object.values(m))if(value instanceof THREE.Texture&&value!==environment)textures.add(value);
 geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
}
export function adaptVehicleModel(source:THREE.Group,manifest:VehicleModelManifest,environment:THREE.Texture):ImportedVehicle{
 if(!manifest.reviewedForProject||!manifest.source||!manifest.license||!manifest.licenseEvidence)throw new Error('Vehicle license/source review is required');
 if(!(manifest.targetLength>0&&manifest.rollingRadius>0)||manifest.wheels.length!==4)throw new Error('Vehicle dimensions and four real wheel assemblies are required');
 // Resolve everything before reparenting, since original paths change once hinged.
 const movable=new Map<string,string>();
 const nodes=(paths:readonly NodePath[])=>paths.map(path=>resolveNode(source,path));
 const partEntries=Object.entries(manifest.parts).map(([name,entry])=>({name,entry,nodes:nodes(entry.nodes)}));
 if(['leftDoor','rightDoor','hood','leftMirror','rightMirror'].some(key=>!manifest.parts[key as keyof typeof manifest.parts])||partEntries.length!==5||partEntries.some(e=>!e.nodes.length||!['x','y','z'].includes(e.entry.axis)||!Number.isFinite(e.entry.angle)||Math.abs(e.entry.angle)>75||e.entry.pivot.some(v=>!Number.isFinite(v))))throw new Error('All five actual movable assemblies are required');
 const hasMesh=(node:THREE.Object3D)=>{let found=false;node.traverse(n=>{if(n instanceof THREE.Mesh)found=true;});return found;};
 if(partEntries.some(e=>e.nodes.some(n=>!hasMesh(n))))throw new Error('A mapped moving assembly must contain actual model meshes');
 const wheelEntries=manifest.wheels.map(w=>({...w,nodes:nodes(w.nodes),calipers:nodes(w.calipers)}));
 if(wheelEntries.some(w=>!w.nodes.length||!w.calipers.length||w.nodes.some(n=>!hasMesh(n))||w.calipers.some(n=>!hasMesh(n))||!['x','y','z'].includes(w.spinAxis)))throw new Error('Wheel and stationary brake-caliper mappings are required');
 for(const entry of [...partEntries,...wheelEntries.map((w,i)=>({name:`wheel${i}`,nodes:w.nodes})),...wheelEntries.map((w,i)=>({name:`caliper${i}`,nodes:w.calipers}))])for(const n of entry.nodes){if(movable.has(n.uuid))throw new Error('A node cannot belong to multiple moving assemblies');movable.set(n.uuid,entry.name);}
 const reflectionMeshes=new Set<THREE.Mesh>();for(const node of nodes(manifest.reflection))node.traverse(n=>{if(n instanceof THREE.Mesh)reflectionMeshes.add(n);});
 const roles=Object.fromEntries(Object.entries(manifest.materials).map(([role,paths])=>[role,nodes(paths)])) as Record<'paint'|'glass'|'rubber',THREE.Object3D[]>;
 if(Object.values(roles).some(v=>!v.length))throw new Error('Paint, glass and rubber roles must be explicitly mapped');
 // Isolate roles even when the author reused a material across unrelated meshes.
 const roleOf=new Map<THREE.Object3D,string>();for(const [role,group] of Object.entries(roles))for(const node of group)node.traverse(n=>{if(n instanceof THREE.Mesh){if(roleOf.has(n)&&roleOf.get(n)!==role)throw new Error('Conflicting material role paths');roleOf.set(n,role);}});
 const clones=new Map<string,THREE.Material>(),originals=new Set<THREE.Material>(),materials=new Set<THREE.MeshStandardMaterial>();
 source.traverse(n=>{if(n instanceof THREE.Mesh){const role=roleOf.get(n),clone=(m:THREE.Material)=>{originals.add(m);const key=`${m.uuid}:${role??'original'}`;if(!clones.has(key)){
   let copy=m.clone();if(role==='paint'&&m instanceof THREE.MeshStandardMaterial&&!(m instanceof THREE.MeshPhysicalMaterial)){copy=new THREE.MeshPhysicalMaterial();THREE.MeshStandardMaterial.prototype.copy.call(copy,m);Object.assign(copy,{defines:{STANDARD:'',PHYSICAL:''}});}
   if(copy instanceof THREE.MeshStandardMaterial){
    if(role==='paint'){copy.color.setHex(0x46515f);copy.metalness=.62;copy.roughness=.29;if(copy instanceof THREE.MeshPhysicalMaterial){copy.clearcoat=.88;copy.clearcoatRoughness=.13;}}
    if(role==='glass'){copy.transparent=true;copy.opacity=Math.min(.72,copy.opacity);copy.depthWrite=false;}
    if(role==='rubber'){copy.metalness=0;copy.roughness=Math.max(.85,copy.roughness);}
    copy.envMap=environment;copy.userData.baseOpacity=copy.opacity;copy.userData.envStrength=copy.envMapIntensity;materials.add(copy);
   }clones.set(key,copy);
  }return clones.get(key)!;};n.material=Array.isArray(n.material)?n.material.map(clone):clone(n.material);}});
 originals.forEach(m=>m.dispose());
 const pivot=(name:string,position:THREE.Vector3Tuple,objects:THREE.Object3D[])=>{const g=new THREE.Group();g.name=name;g.position.fromArray(position);source.add(g);for(const node of objects)g.attach(node);return g;};
 const groups=Object.fromEntries(partEntries.map(e=>[e.name,pivot(e.name,e.entry.pivot,e.nodes)])) as Record<'leftDoor'|'rightDoor'|'hood'|'leftMirror'|'rightMirror',THREE.Group>;
 for(const name of ['leftDoor','rightDoor','hood','leftMirror','rightMirror'] as const)groups[name].userData.inspectionPart=name.includes('Mirror')?'mirrors':name;
 groups.leftDoor.attach(groups.leftMirror);groups.rightDoor.attach(groups.rightMirror);
 const wheels=wheelEntries.map((w,i)=>{const steer=pivot(`wheel-steer-${i}`,w.pivot,[...w.nodes,...w.calipers]),roll=new THREE.Group();roll.name=`wheel-roll-${i}`;steer.add(roll);for(const node of w.nodes)roll.attach(node);return {steer,roll,front:w.front,spinAxis:w.spinAxis};});
 const root=new THREE.Group();root.name='licensed-imported-sports-gt';root.add(source);source.rotation.y+=manifest.yaw;source.updateMatrixWorld(true);
 const bounds=new THREE.Box3().setFromObject(source),size=bounds.getSize(new THREE.Vector3());
 if(!Number.isFinite(size.x+size.y+size.z)||size.x<=0||size.y<=0||size.z<=0)throw new Error('Invalid vehicle bounds');
 const scale=manifest.targetLength/size.x;source.scale.multiplyScalar(scale);source.updateMatrixWorld(true);
 const tireBounds=new THREE.Box3();for(const w of wheelEntries)for(const n of w.nodes)tireBounds.union(new THREE.Box3().setFromObject(n,true));
 const scaled=new THREE.Box3().setFromObject(source),center=scaled.getCenter(new THREE.Vector3());source.position.x-=center.x;source.position.z-=center.z;source.position.y-=tireBounds.min.y;
 source.updateMatrixWorld(true);const contactPoints=wheels.map(w=>root.worldToLocal(w.steer.getWorldPosition(new THREE.Vector3())));
 const inspection=createInspection(groups,Object.fromEntries(partEntries.map(e=>[e.name,{axis:e.entry.axis,angle:e.entry.angle}])) as Parameters<typeof createInspection>[1]);let disposed=false;
 return {root,wheels,rollingRadius:manifest.rollingRadius*scale,contactPoints,reflectionMeshes,materials,inspection,dispose(){if(disposed)return;disposed=true;disposeModel(root,environment);root.clear();}};
}
