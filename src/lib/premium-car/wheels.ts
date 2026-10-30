import {GT_DIMENSIONS as D} from './design';
import * as THREE from 'three';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type {CarMaterials} from './materials';
export type CarWheel={steer:THREE.Group;roll:THREE.Group;front:boolean};
export function buildWheels(materials:Pick<CarMaterials,'rubber'|'alloy'|'brake'|'machined'|'trim'|'red'>,add:(g:THREE.BufferGeometry)=>THREE.BufferGeometry){
 const profile=[[-.135,.355],[-.145,.395],[-.14,.455],[-.115,.485],[-.075,.49],[.075,.49],[.115,.485],[.14,.455],[.145,.395],[.135,.355]];
 // Smooth the carcass through shoulder and sidewall; preserve the established rolling envelope.
 const carcass=new THREE.CatmullRomCurve3(profile.map(([z,r])=>new THREE.Vector3(r,z,0)),false,'centripetal');
 const tireProfile=Array.from({length:29},(_,i)=>{const p=carcass.getPoint(i/28);return new THREE.Vector2(Math.min(.49,p.x),p.y);});
 const tireBase=new THREE.LatheGeometry(tireProfile,64);tireBase.rotateX(Math.PI/2);
 const beads=[-.132,.132].map(z=>new THREE.TorusGeometry(.421,.0025,4,48).translate(0,0,z));const tire=add(mergeGeometries([tireBase,...beads])!);tireBase.dispose();beads.forEach(g=>g.dispose());
 const barrel=add(new THREE.CylinderGeometry(.358,.358,.235,48,1,true));barrel.rotateX(Math.PI/2);
 const lip=add(new THREE.TorusGeometry(.35,.012,6,64));
 const rotor=new THREE.Shape();rotor.moveTo(.285,0);for(let i=1;i<=64;i++){const a=i/64*Math.PI*2;rotor.lineTo(Math.cos(a)*.285,Math.sin(a)*.285);}rotor.closePath();
 const center=new THREE.Path();center.absarc(0,0,.09,0,Math.PI*2,true);rotor.holes.push(center);
 for(let i=0;i<16;i++){const a=i/16*Math.PI*2,hole=new THREE.Path();hole.absarc(Math.cos(a)*.23,Math.sin(a)*.23,.009,0,Math.PI*2,true);rotor.holes.push(hole);}
 const disc=add(new THREE.ExtrudeGeometry(rotor,{depth:.018,bevelEnabled:false,curveSegments:8}));disc.translate(0,0,-.009);
 const hub=add(new THREE.CylinderGeometry(.071,.071,.05,24));hub.rotateX(Math.PI/2);
 const spokeShape=new THREE.Shape();spokeShape.moveTo(.044,-.03);spokeShape.bezierCurveTo(.13,-.035,.24,-.10,.34,-.078);spokeShape.lineTo(.345,-.044);spokeShape.bezierCurveTo(.23,-.055,.15,.018,.046,.025);spokeShape.closePath();
 const spoke=new THREE.ExtrudeGeometry(spokeShape,{depth:.026,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.004,bevelThickness:.004,curveSegments:8});
 const spokes:THREE.BufferGeometry[]=[];for(let i=0;i<10;i++)spokes.push(spoke.clone().rotateZ(i/10*Math.PI*2));const turbine=add(mergeGeometries(spokes)!);spokes.forEach(g=>g.dispose());spoke.dispose();
 const grooves:THREE.BufferGeometry[]=[];for(let i=0;i<64;i++)for(const side of [-1,1]){const g=new THREE.BoxGeometry(.005,.02,.105);g.translate(0,.49,side*.064);g.rotateZ(i/64*Math.PI*2+.012*side);grooves.push(g);}const tread=add(mergeGeometries(grooves)!);grooves.forEach(g=>g.dispose());
 const caliper=add(new THREE.CapsuleGeometry(.048,.12,4,8));
 return {create(x:number,z:number,scale:number=D.wheelScale):CarWheel{
  const steer=new THREE.Group(),roll=new THREE.Group();steer.name=`coded-${x>0?'front':'rear'}-${z>0?'near':'far'}-steer`;roll.name='coded-wheel-roll';steer.position.set(x,D.axleHeight,z);steer.add(roll);
  const mesh=(name:string,g:THREE.BufferGeometry,m:THREE.Material,parent=roll,offset=0)=>{const n=new THREE.Mesh(g,m);n.name=name;n.position.z=offset;parent.add(n);return n;};
  roll.scale.setScalar(scale);
  const outer=Math.sign(z);mesh('sculpted-tire',tire,materials.rubber);mesh('geometric-tread',tread,materials.rubber);mesh('rim-barrel',barrel,materials.alloy);mesh('brake-disc',disc,materials.brake,roll,outer*.065);mesh('turbine-spokes',turbine,materials.alloy,roll,outer*.12);mesh('machined-rim-lip',lip,materials.machined,roll,outer*.14);mesh('dark-hub',hub,materials.trim,roll,outer*.14);
  const fixed=mesh('fixed-red-caliper',caliper,materials.red,steer,outer*.075);fixed.position.x=.21;fixed.rotation.z=-.2;fixed.scale.setScalar(scale);fixed.position.x*=scale;fixed.position.z*=scale;
  return {steer,roll,front:x>0};
 }};
}
