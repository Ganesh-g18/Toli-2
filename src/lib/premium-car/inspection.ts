import * as THREE from 'three';
export type InspectionPart='leftDoor'|'rightDoor'|'hood'|'mirrors';
export type InspectionAction=InspectionPart|'reset'|'rotate';
export type InspectionState=Record<InspectionPart,boolean>;
export const closedInspection=():InspectionState=>({leftDoor:false,rightDoor:false,hood:false,mirrors:false});
export type HingeSettings=Record<'leftDoor'|'rightDoor'|'hood'|'leftMirror'|'rightMirror',{axis:'x'|'y'|'z';angle:number}>;
export function createInspection(parts:Record<'leftDoor'|'rightDoor'|'hood'|'leftMirror'|'rightMirror',THREE.Group>,hinges?:HingeSettings){
 let target=closedInspection();const values:Record<InspectionPart,number>={leftDoor:0,rightDoor:0,hood:0,mirrors:0};
 return {parts,read:()=>({...target}),command(action:InspectionAction){if(action==='reset')target=closedInspection();else if(action!=='rotate')target[action]=!target[action];return {...target};},
 update(dt:number,reduced=false){let moving=false;const blend=1-Math.exp(-Math.min(64,dt)/(reduced?45:125));
  for(const key of Object.keys(values) as InspectionPart[]){const goal=target[key]?1:0;values[key]+=(goal-values[key])*blend;if(Math.abs(values[key]-goal)<.0005)values[key]=goal;else moving=true;}
  const settings=hinges??{leftDoor:{axis:'y',angle:58},rightDoor:{axis:'y',angle:-58},hood:{axis:'z',angle:42},leftMirror:{axis:'y',angle:-58},rightMirror:{axis:'y',angle:58}};
  for(const key of Object.keys(parts) as (keyof typeof parts)[]){const h=settings[key];parts[key].rotation[h.axis]=values[key.includes('Mirror')?'mirrors':key as InspectionPart]*THREE.MathUtils.degToRad(h.angle);}
  return moving;
 }};
}
/** Split triangles against a rectangular region, preserving interpolated normals and UVs.
 * The remainder really loses the panel; no closed shell is left behind a moving duplicate. */
export function extractRegion(source:THREE.BufferGeometry,min:THREE.Vector3,max:THREE.Vector3){
 type V={p:THREE.Vector3;n:THREE.Vector3;uv:THREE.Vector2};
 const inside:V[][]=[],outside:V[][]=[],p=source.getAttribute('position'),n=source.getAttribute('normal'),uv=source.getAttribute('uv'),idx=source.index;
 const planes:[number,number,number][]=[[0,min.x,1],[0,max.x,-1],[1,min.y,1],[1,max.y,-1],[2,min.z,1],[2,max.z,-1]];
 const clip=(polygon:V[],axis:number,bound:number,sign:number)=>{
  const yes:V[]=[],no:V[]=[];
  for(let i=0;i<polygon.length;i++){const a=polygon[i],b=polygon[(i+1)%polygon.length],da=(a.p.getComponent(axis)-bound)*sign,db=(b.p.getComponent(axis)-bound)*sign;
   (da>=0?yes:no).push(a);
   if((da>=0)!==(db>=0)){const t=da/(da-db),v={p:a.p.clone().lerp(b.p,t),n:a.n.clone().lerp(b.n,t).normalize(),uv:a.uv.clone().lerp(b.uv,t)};yes.push(v);no.push(v);}
  }return {yes,no};
 };
 for(let i=0;i<(idx?.count??p.count);i+=3){let poly:V[]=Array.from({length:3},(_,j)=>{const k=idx?idx.getX(i+j):i+j;return {p:new THREE.Vector3().fromBufferAttribute(p,k),n:new THREE.Vector3().fromBufferAttribute(n,k),uv:uv?new THREE.Vector2(uv.getX(k),uv.getY(k)):new THREE.Vector2()};});
  for(const [axis,bound,sign] of planes){if(poly.length<3)break;const next=clip(poly,axis,bound,sign);if(next.no.length>=3)outside.push(next.no);poly=next.yes;}
  if(poly.length>=3)inside.push(poly);
 }
 const geometry=(polys:V[][])=>{const pos:number[]=[],norm:number[]=[],tex:number[]=[];
  for(const poly of polys)for(let j=1;j<poly.length-1;j++){
   const tri=[poly[0],poly[j],poly[j+1]];if(tri[1].p.clone().sub(tri[0].p).cross(tri[2].p.clone().sub(tri[0].p)).lengthSq()<1e-16)continue;
   for(const v of tri){pos.push(...v.p.toArray());norm.push(...v.n.toArray());tex.push(...v.uv.toArray());}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(norm,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(tex,2));return g;
 };
 return {panel:geometry(inside),rest:geometry(outside)};
}
