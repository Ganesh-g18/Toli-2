import * as THREE from 'three';
/** Rounded, stepped enclosure geometry authored for the illustrative battery component. */
export function roundedCase(width:number,height:number,depth:number,radius:number){
 const x=width/2,z=depth/2,r=Math.min(radius,x,z),shape=new THREE.Shape();
 shape.moveTo(-x+r,-z);shape.lineTo(x-r,-z);shape.quadraticCurveTo(x,-z,x,-z+r);shape.lineTo(x,z-r);shape.quadraticCurveTo(x,z,x-r,z);shape.lineTo(-x+r,z);shape.quadraticCurveTo(-x,z,-x,z-r);shape.lineTo(-x,-z+r);shape.quadraticCurveTo(-x,-z,-x+r,-z);
 const g=new THREE.ExtrudeGeometry(shape,{depth:height-2*r,steps:1,bevelEnabled:true,bevelThickness:r,bevelSize:r*.3,bevelSegments:3,curveSegments:6});
 g.rotateX(-Math.PI/2);g.translate(0,-(height-2*r)/2,0);return g;
}
