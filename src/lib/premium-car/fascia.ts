import * as THREE from 'three';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {gridSurface} from './surfaces';
export const bumperX=(y:number,z:number)=>2.485+(.065+.06*Math.sin((y-.28)/.605*Math.PI))*(1-(z/.78)**2);
export const intakeTop=(z:number)=>.53+.02*(1-(z/.67)**2);
const skinPoint=(y:number,z:number,depth=0)=>[bumperX(y,z)-depth,y,z];
/** Keep the approved outer bumper; open an actual aperture and return its recessed walls. */
export function frontBumper(){
 const patch=(z0:number,z1:number,low:(z:number)=>number,high:(z:number)=>number)=>gridSurface(Array.from({length:13},(_,i)=>Array.from({length:33},(_,j)=>{const z=z0+(z1-z0)*j/32,y=high(z)+(low(z)-high(z))*i/12;return skinPoint(y,z);}))); 
 const parts=[patch(-.78,.78,()=>.28,()=>.39),patch(-.67,.67,intakeTop,()=>.885),patch(-.78,-.67,()=>.39,()=>.885),patch(.67,.78,()=>.39,()=>.885)];
 // Exact surface derivatives keep reflection bands continuous over the four skin patches.
 for(const g of parts){const p=g.getAttribute('position'),n=g.getAttribute('normal');for(let i=0;i<p.count;i++){const y=p.getY(i),z=p.getZ(i),v=(y-.28)/.605,dxdy=.06*Math.cos(v*Math.PI)*Math.PI/.605*(1-(z/.78)**2),dxdz=-(.065+.06*Math.sin(v*Math.PI))*2*z/(.78*.78),normal=new THREE.Vector3(1,-dxdy,-dxdz).normalize();n.setXYZ(i,normal.x,normal.y,normal.z);}}
 const geometry=mergeGeometries(parts)!;parts.forEach(g=>g.dispose());return geometry;
}
export function intakeBack(){return gridSurface(Array.from({length:7},(_,i)=>Array.from({length:25},(_,j)=>{const z=-.67+j/24*1.34,y=intakeTop(z)+(.39-intakeTop(z))*i/6;return skinPoint(y,z,.085);})));
}
export function intakeWalls(){
 const edge=[...Array.from({length:25},(_,j)=>{const z=-.67+j/24*1.34;return [intakeTop(z),z];}),[.39,.67],...Array.from({length:25},(_,j)=>[.39,.67-j/24*1.34]),[intakeTop(-.67),-.67]];
 return gridSurface([edge.map(([y,z])=>skinPoint(y,z)),edge.map(([y,z])=>skinPoint(y,z,.085))],true,false,false);
}
