import type {Vector3Tuple} from 'three';
import {temporaryVehicleManifest} from './preproduction';
/** Paths are exact child-name segments from gltf.scene, mapped after inspecting the actual asset. */
export type NodePath=readonly string[];
export type HingedNode={nodes:readonly NodePath[];pivot:Vector3Tuple;axis:'x'|'y'|'z';angle:number};
export type VehicleModelManifest={
 url:string;source:string;license:string;licenseEvidence:string;reviewedForProject:boolean;
 yaw:number;targetLength:number;rollingRadius:number;
 parts:Record<'leftDoor'|'rightDoor'|'hood'|'leftMirror'|'rightMirror',HingedNode>;
 wheels:readonly {nodes:readonly NodePath[];calipers:readonly NodePath[];pivot:Vector3Tuple;front:boolean;spinAxis:'x'|'y'|'z'}[];
 reflection:readonly NodePath[];
 materials:{paint:readonly NodePath[];glass:readonly NodePath[];rubber:readonly NodePath[]};
};
/** Explicitly authorized temporary below-fold vehicle; professional quality remains unapproved. */
export const ACTIVE_VEHICLE_MODEL:VehicleModelManifest|null=temporaryVehicleManifest;
export type SolidModelState='loading'|'ready'|'unavailable';
