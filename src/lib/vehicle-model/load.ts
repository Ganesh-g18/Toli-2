import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import type {Texture} from 'three';
import {ACTIVE_VEHICLE_MODEL,type VehicleModelManifest} from './contract';
import {adaptVehicleModel,disposeModel} from './adapter';
/** No guessed URL or procedural substitute. Invalid/missing model stays on the safe poster. */
export async function loadVehicleModel(environment:Texture,manifest:VehicleModelManifest|null=ACTIVE_VEHICLE_MODEL){
 if(!manifest)throw new Error('A reviewed, licensed sports-GT GLB/GLTF asset is required');
 if(!manifest.reviewedForProject||!manifest.source||!manifest.license||!manifest.licenseEvidence)throw new Error('Asset rights review is incomplete');
 const url=/^https?:/.test(manifest.url)?manifest.url:`${import.meta.env.BASE_URL}${manifest.url.replace(/^\//,'')}`;
 const gltf=await new GLTFLoader().loadAsync(url);
 try{return adaptVehicleModel(gltf.scene,manifest,environment);}catch(error){disposeModel(gltf.scene,environment);throw error;}
}
