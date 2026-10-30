import * as THREE from 'three';

/** Original executive concept surfaces. +X is the nose; all cross-sections mirror in Z. */
const sections=[[-2.32,.76,1.035,.65],[-2.16,.9,1.15,.68],[-1.85,.96,1.215,.8],[-1.6,.985,1.24,1.015],[-1.3,.97,1.255,.82],[-.95,.95,1.26,.64],[-.35,.94,1.26,.625],[.4,.955,1.27,.63],[1.12,.985,1.245,.8],[1.6,1.005,1.225,1.015],[1.88,.965,1.17,.82],[2.15,.89,1.095,.68],[2.35,.78,1.045,.69]];
const profile=new THREE.CatmullRomCurve3(sections.map(([x,w,top])=>new THREE.Vector3(x,w,top)),false,'centripetal');
const underside=new THREE.CatmullRomCurve3(sections.map(([x,,,bottom])=>new THREE.Vector3(x,bottom,0)),false,'centripetal');
const cabin=new THREE.CatmullRomCurve3([[-1.49,.7,1.275],[-1.25,.675,1.49],[-.95,.645,1.68],[-.62,.625,1.745],[.25,.625,1.73],[.62,.655,1.59],[1.13,.71,1.285]].map(([x,w,y])=>new THREE.Vector3(x,w,y)),false,'centripetal');

function surface(rows:number[][][],cap=true) {
 const width=rows[0].length,positions=rows.flat(2),indices:number[]=[];
 for(let i=0;i<rows.length-1;i++)for(let j=0;j<(cap?width:width-1);j++){
  const a=i*width+j,b=i*width+(j+1)%width,c=a+width,d=b+width;indices.push(a,b,c,b,d,c);
 }
 if(cap)for(let j=1;j<width-1;j++){indices.push(0,j+1,j);const last=(rows.length-1)*width;indices.push(last,last+j,last+j+1);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
export function createExecutiveShell(count=64) {
 return surface(Array.from({length:count+1},(_,i)=>{
  const p=profile.getPoint(i/count),bottom=underside.getPoint(i/count).y,{x}=p,w=p.y,top=p.z;
  // A soft crown, distinct shoulder and tucked lower sill; the raised underside clears each tire.
  return [[-.82,bottom],[-.96,bottom+.045],[-1,bottom+.1],[-1,top-.2],[-.985,top-.12],[-.95,top-.055],[-.87,top-.012],[-.7,top+.015],[-.37,top+.032],[0,top+.038],[.37,top+.032],[.7,top+.015],[.87,top-.012],[.95,top-.055],[.985,top-.12],[1,top-.2],[1,bottom+.1],[.96,bottom+.045],[.82,bottom],[0,bottom]].map(([z,y])=>[x,y,z*w]);
 }));
}
export function createExecutiveCabin(count=32) {
 return surface(Array.from({length:count+1},(_,i)=>{
  const p=cabin.getPoint(i/count),x=p.x,w=p.y,top=p.z;
  return [[-1,1.25],[-1,Math.max(1.26,top-.12)],[-.9,top-.025],[-.57,top+.003],[0,top+.013],[.57,top+.003],[.9,top-.025],[1,Math.max(1.26,top-.12)],[1,1.25],[0,1.245]].map(([z,y])=>[x,y,z*w]);
 }));
}
export function createExecutiveRoof(count=18) {
 return surface(Array.from({length:count+1},(_,i)=>{
  const p=cabin.getPoint(.25+i/count*.43),x=p.x,w=p.y,top=p.z;
  return [[-.86,top-.006],[-.56,top+.017],[0,top+.027],[.56,top+.017],[.86,top-.006]].map(([z,y])=>[x,y,z*w]);
 }),false);
}
