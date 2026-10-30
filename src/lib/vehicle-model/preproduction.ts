import type {VehicleModelManifest} from './contract';
/** Temporary original R7. User-authorized integration; NOT professional visual approval. */
export const temporaryVehicle = {
 id:'toli-atelier-r7', status:'preproduction' as const,
 url:'models/vehicles/toli-preproduction-sedan.glb',
 source:'tools/3d/generate-toli-sportback.mjs — retained revision 7',
 license:'Original TOLI project asset', licenseEvidence:'docs/ORIGINAL-3D-CAR-REPORT.md',
 reviewedForProject:true as const,
 camera:{position:[7.4,2.0,4.3] as const,target:[0,.72,0] as const,fov:34},
 normalization:{targetLength:4.87,yaw:0},
 components:{wheels:['FL','FR','RL','RR'].map(tag=>['VehicleRoot','Wheel_'+tag]),brakes:['FL','FR','RL','RR'].map(tag=>['VehicleRoot','Brake_'+tag])},
 audit:{bytes:4268888,triangles:192105,vertices:125334,meshes:58,materials:12,textures:0,largestTexture:null},
};
const path=(name:string)=>[['VehicleRoot',name]];
export const temporaryVehicleManifest:VehicleModelManifest={
 ...temporaryVehicle,yaw:0,targetLength:4.87,rollingRadius:.35,
 parts:{
 leftDoor:{nodes:path('Door_L'),pivot:[.80,1.0,.85],axis:'y',angle:58},
 rightDoor:{nodes:path('Door_R'),pivot:[.80,1.0,-.85],axis:'y',angle:-58},
 hood:{nodes:path('Hood'),pivot:[.895,1.08,0],axis:'z',angle:42},
 leftMirror:{nodes:path('Mirror_L'),pivot:[.61,1.07,.85],axis:'y',angle:-45},
 rightMirror:{nodes:path('Mirror_R'),pivot:[.61,1.07,-.85],axis:'y',angle:45},
 },
 wheels:([{tag:'FL',x:1.43,z:.875},{tag:'FR',x:1.43,z:-.875},{tag:'RL',x:-1.43,z:.875},{tag:'RR',x:-1.43,z:-.875}]).map(w=>({nodes:path('Wheel_'+w.tag),calipers:path('Brake_'+w.tag),pivot:[w.x,.35,w.z],front:w.x>0,spinAxis:'z'})),
 reflection:[...path('Body'),...path('Hood')],
 materials:{paint:path('Hood'),glass:path('Glass'),rubber:['FL','FR','RL','RR'].map(tag=>['VehicleRoot','Wheel_'+tag,'Tire_'+tag])},
};
