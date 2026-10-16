import * as THREE from 'three';
import {GT_DIMENSIONS as D,GT_AXLES,BODY_STATIONS,CABIN_STATIONS,stationAt} from './design';
export const bodyAtX=(x:number)=>{const p=stationAt(x);return new THREE.Vector3(p.x,p.halfWidth,p.shoulder);};
export const bodyAt=(t:number)=>bodyAtX((THREE.MathUtils.clamp(t,0,1)-.5)*D.length);
export const archFloor=(x:number)=>Math.max(.28,...GT_AXLES.map(axle=>Math.abs(x-axle)<=D.archRadius+1e-7?D.axleHeight+Math.sqrt(Math.max(0,D.archRadius**2-(x-axle)**2)):.28));
/** Indexed, smoothly shaded surfaces generated once. +X is the original concept's nose. */
export function gridSurface(rows:number[][][],closed=false,capEnd=true,capStart=true){
 const n=rows[0].length,positions=rows.flat(2),indices:number[]=[];
 for(let i=0;i<rows.length-1;i++)for(let j=0;j<(closed?n:n-1);j++){const a=i*n+j,b=i*n+(j+1)%n,c=a+n,d=b+n;indices.push(a,b,c,b,d,c);}
 if(closed)for(let j=1;j<n-1;j++){if(capStart)indices.push(0,j+1,j);const last=(rows.length-1)*n;if(capEnd)indices.push(last,last+j,last+j+1);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.setAttribute('uv',new THREE.Float32BufferAttribute(rows.flatMap((row,i)=>row.flatMap((_,j)=>[i/(rows.length-1),j/(n-1)])),2));g.computeVertexNormals();return g;
}
export function bodyTopHeight(x:number,z:number){
 const station=stationAt(x),top=station.shoulder;
 return top+station.crown*(1-(z/.95)**2)+(x>.95?.016*Math.exp(-Math.pow((Math.abs(z)-.43)/.06,2)):0);
}
export function bodySamples(segments:number){
 const values=Array.from({length:segments+1},(_,i)=>(i/segments-.5)*D.length);
 // Arc-angle samples concentrate vertices where wheel openings change direction fastest.
 for(const axle of GT_AXLES)for(let i=0;i<=24;i++)values.push(axle+D.archRadius*Math.cos(i/24*Math.PI));
 for(const station of BODY_STATIONS)values.push(station.x);
 return [...new Set(values.map(x=>Math.round(x*1e7)/1e7))].sort((a,b)=>a-b);
}
export function sculptedBody(segments=100){
 return gridSurface(bodySamples(segments).map(x=>{const p=bodyAtX(x),w=p.y,top=p.z,hem=archFloor(x)>.28?archFloor(x):stationAt(x).rocker,depth=top-.025-hem;
 // Real cutouts clear each tire. The shoulder rolls into a convex door and tucked sill.
 const sideCurve=new THREE.CatmullRomCurve3([
  new THREE.Vector3(-.82,hem,0),new THREE.Vector3(-.97,hem+.018,0),
  new THREE.Vector3(-1,hem+depth*.25,0),new THREE.Vector3(-1.005,hem+depth*.6,0),new THREE.Vector3(-.99,hem+depth*.85,0)
 ],false,'centripetal');
 const sideA=Array.from({length:9},(_,j)=>{const q=sideCurve.getPoint(j/8);return [q.x,q.y];});
 const topRow=[-.95,-.82,-.66,-.5,-.43,-.36,-.18,0,.18,.36,.43,.5,.66,.82,.95].map(z=>[z,top+stationAt(x).crown*(1-(z/.95)**2)+(x>.95?.016*Math.exp(-Math.pow((Math.abs(z)-.43)/.06,2)):0)]);
 const sideB=sideA.slice().reverse().map(([z,y])=>[-z,y]);
 return [...sideA,...topRow,...sideB,[0,hem]].map(([z,y])=>[x+(x>2.12?.07*(x-2.12)/.36*(1-z*z):x< -2.15?-.045*(-2.15-x)/.33*(1-z*z):0),y,z*w]);
 }),true,false);
}
const canopy=new THREE.CatmullRomCurve3(CABIN_STATIONS.map(([x,w,y])=>new THREE.Vector3(x,w,y)),false,'centripetal');
export function cabinAt(t:number,z:number,lift=0){const p=canopy.getPoint(t),crown=(1-z*z)*.035;return new THREE.Vector3(p.x,p.z+crown+lift,p.y*z);}
/** Derivatives use the complete canopy, so separate glass/roof patches share edge normals. */
export function cabinNormal(t:number,z:number){
 const e=.0001,along=cabinAt(Math.min(1,t+e),z).sub(cabinAt(Math.max(0,t-e),z));
 const across=cabinAt(t,z+e).sub(cabinAt(t,z-e));
 return across.cross(along).normalize();
}
export function canopySurface(from:number,to:number,segments:number,roof=false){
 const columns=roof?13:25;
 const g=gridSurface(Array.from({length:segments+1},(_,i)=>{const t=from+(to-from)*i/segments;return Array.from({length:columns},(_,j)=>cabinAt(t,-1+2*j/(columns-1),roof?.003:0).toArray());}));
 const normals=g.getAttribute('normal');
 for(let i=0;i<=segments;i++)for(let j=0;j<columns;j++){
  const n=cabinNormal(from+(to-from)*i/segments,-1+2*j/(columns-1));normals.setXYZ(i*columns+j,n.x,n.y,n.z);
 }
 return g;
}
/** A recessed arch tunnel and inner backing; tire outer radius is approximately .45. */
export function wheelWell(axle:number,side:number){
 const radius=D.linerRadius;
 const tunnel=gridSurface(Array.from({length:33},(_,i)=>{
  const a=i/32*Math.PI,x=axle+radius*Math.cos(a),y=D.axleHeight+radius*Math.sin(a);
  const outer=bodyAtX(x).y*.975;
  return [[x,y,side*D.linerInner],[x,y,side*outer]];
 }));
 const positions=[axle,D.axleHeight,side*D.linerInner],indices:number[]=[];
 for(let i=0;i<=32;i++){const a=i/32*Math.PI;positions.push(axle+radius*Math.cos(a),D.axleHeight+radius*Math.sin(a),side*D.linerInner);if(i<32)indices.push(0,i+1,i+2);}
 const backing=new THREE.BufferGeometry();backing.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));backing.setIndex(indices);backing.setAttribute('uv',new THREE.Float32BufferAttribute(Array.from({length:34},()=>[0,0]).flat(),2));backing.computeVertexNormals();
 return {tunnel,backing};
}
export function sideGlass(side:number,segments=40){
 return gridSurface(Array.from({length:segments+1},(_,i)=>{const t=i/segments,p=cabinAt(t,1),base=D.beltHeight;return Array.from({length:9},(_,j)=>{const q=j/8;return [p.x,base+(p.y-base)*q,side*(.77+(p.z-.77)*q+.009*Math.sin(Math.PI*q)*Math.sin(Math.PI*t))];});}));
}
export function curvedRibbon(points:THREE.Vector3[],radius=.008,segments=40){return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),segments,radius,5,false);}
/** Swept housing/lens: a shallow closed profile following the nose's plan curvature. */
export function lightBlade(side:number,rear=false,radius=.023){
 const points=Array.from({length:13},(_,i)=>{const t=i/12;return new THREE.Vector3(rear?-2.45+.06*t:2.49-.13*t,(rear?.94:.90)+.025*t,side*(.28+.59*t));});
 return curvedRibbon(points,radius,24);
}
