import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Mesh,type Group,type Texture} from 'three';
import {ACTIVE_VEHICLE_MODEL,type VehicleModelManifest} from './contract';
import {adaptVehicleModel,disposeModel} from './adapter';
// One bounded template per URL, including failed promises: no retry/download loop.
// Templates belong to this page cache; each renderer owns independent disposable clones.
const templates=new Map<string,Promise<Group>>();
export function vehicleAssetUrl(url:string){return /^https?:/.test(url)?url:`${import.meta.env.BASE_URL}${url.replace(/^\//,'')}`;}
/** Fetch/parse the shared template near the stage, without allocating a renderer or cloned GPU resources. */
export function prewarmVehicleModel(manifest:VehicleModelManifest|null=ACTIVE_VEHICLE_MODEL){
 if(!manifest||!manifest.reviewedForProject||!manifest.source||!manifest.license||!manifest.licenseEvidence)return Promise.reject(new Error('Asset rights review is incomplete'));
 const url=vehicleAssetUrl(manifest.url);
 if(!templates.has(url))templates.set(url,new GLTFLoader().loadAsync(url).then(g=>g.scene));
 return templates.get(url)!;
}
export async function loadVehicleModel(environment:Texture,manifest:VehicleModelManifest|null=ACTIVE_VEHICLE_MODEL){
 if(!manifest)throw new Error('A reviewed, licensed vehicle GLB/GLTF asset is required');
 if(!manifest.reviewedForProject||!manifest.source||!manifest.license||!manifest.licenseEvidence)throw new Error('Asset rights review is incomplete');
 const template=await prewarmVehicleModel(manifest);
 const source=template.clone(true);
 // Adapter reparents and tunes materials. Never mutate/dispose cached template resources.
 const geometries=new Map(),materials=new Map();
 source.traverse(node=>{if(node instanceof Mesh){if(!geometries.has(node.geometry))geometries.set(node.geometry,node.geometry.clone());node.geometry=geometries.get(node.geometry);const copy=(m:import('three').Material)=>{if(!materials.has(m))materials.set(m,m.clone());return materials.get(m);};node.material=Array.isArray(node.material)?node.material.map(copy):copy(node.material);}});
 try{return adaptVehicleModel(source,manifest,environment);}catch(error){disposeModel(source,environment);throw error;}
}
