/** Synthetic hierarchy fixture only. This is never a production vehicle asset or visual substitute. */
import * as THREE from 'three';
import type {VehicleModelManifest} from '@/lib/vehicle-model/contract';
export function importedFixture(){
 const root=new THREE.Group(),material=new THREE.MeshStandardMaterial({color:0x888888});
 const mesh=(name:string,size:number[],position:number[])=>{const n:THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>=new THREE.Mesh(new THREE.BoxGeometry(...size as [number,number,number]),material);n.name=name;n.position.fromArray(position);root.add(n);return n;};
 mesh('Artist_Body',[4.8,.6,2],[0,.8,0]);
 const defs={leftDoor:[.7,.5,.8],rightDoor:[.7,.5,-.8],hood:[1.1,1.1,0],leftMirror:[.7,1.2,.8],rightMirror:[.7,1.2,-.8]} as const;
 const parts=Object.fromEntries(Object.entries(defs).map(([key,pivot])=>{mesh(`Artist_${key}`,[.3,.2,.1],[...pivot]);return [key,{nodes:[[`Artist_${key}`]],pivot:[...pivot],axis:key==='hood'?'z':'y',angle:key==='rightDoor'||key==='leftMirror'?-58:key==='hood'?42:58}];})) as unknown as VehicleModelManifest['parts'];
 const wheels=[[-1.5,.45,-.9],[-1.5,.45,.9],[1.5,.45,-.9],[1.5,.45,.9]].map((pivot,i)=>{const tire=mesh(`Artist_Wheel_${i}`,[.8,.9,.25],pivot);tire.geometry.dispose();tire.geometry=new THREE.CylinderGeometry(.45,.45,.25,64).rotateX(Math.PI/2);mesh(`Artist_Caliper_${i}`,[.1,.2,.1],pivot);return {nodes:[[`Artist_Wheel_${i}`]],calipers:[[`Artist_Caliper_${i}`]],pivot:pivot as THREE.Vector3Tuple,front:i>=2,spinAxis:'z' as const};});
 mesh('Artist_Glass',[1,.1,1],[0,1.3,0]);
 const manifest:VehicleModelManifest={url:'test-only.glb',source:'synthetic unit-test fixture',license:'TEST-ONLY',licenseEvidence:'not a production model',reviewedForProject:true,yaw:0,targetLength:4.8,rollingRadius:.45,parts,wheels,reflection:[['Artist_Body']],materials:{paint:[['Artist_Body']],glass:[['Artist_Glass']],rubber:wheels.map(w=>w.nodes[0])}};
 return {root,manifest};
}
