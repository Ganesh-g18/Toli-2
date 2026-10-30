import type { NodePath } from './contract';
import {temporaryVehicle} from './preproduction';

/** Visual classes only; independent of the customer's request brand/model. */
export const vehicleClasses = ['suv', 'sedan', 'coupe', 'supercar'] as const;
export type VehicleClass = typeof vehicleClasses[number];
export type ReviewedVehicleAsset = {
  url: string;
  format: 'glb' | 'gltf';
  source: string;
  license: string;
  licenseEvidence: string;
  /** Human review of proportions, geometry, materials and reuse rights is mandatory. */
  reviewedForProject: true;
  camera: { position: readonly [number, number, number]; target: readonly [number, number, number]; fov: number };
  normalization: { targetLength: number; yaw: number };
  /** Exact inspected hierarchy paths, never guessed coordinates or shared class mappings. */
  components: Partial<Record<'wheels' | 'brakes' | 'battery', readonly NodePath[]>>;
  audit: {
    bytes: number; meshes: number; materials: number; triangles: number;
    textures: number; largestTexture: readonly [number, number] | null;
  };
};
export type VehicleRegistryEntry = {
  id: VehicleClass;
  label: string;
} & (
  | { status: 'asset-required'; asset: null }
  | { status: 'reviewed' | 'preproduction'; asset: ReviewedVehicleAsset }
);

// Only the original sedan is temporarily supplied; other classes remain acquisition slots.
export const vehicleRegistry: Readonly<Record<VehicleClass, VehicleRegistryEntry>> = {
  suv: { id: 'suv', label: 'SUV', status: 'asset-required', asset: null },
  sedan: { id: 'sedan', label: 'Sedan', status: 'preproduction', asset: {...temporaryVehicle,format:'glb'} },
  coupe: { id: 'coupe', label: 'Coupe', status: 'asset-required', asset: null },
  supercar: { id: 'supercar', label: 'Supercar', status: 'asset-required', asset: null },
};

/** Fail before fetching or rendering; never substitute another class or the coded sedan. */
export function requireVehicleAsset(id: VehicleClass): ReviewedVehicleAsset {
  const entry: VehicleRegistryEntry = vehicleRegistry[id];
  if (entry.status === 'asset-required') throw new Error(`${id.toUpperCase()} 3D ASSET REQUIRED`);
  return entry.asset;
}
