export const heroVehicleSlots = ['hero-suv', 'hero-sedan', 'hero-supercar'] as const;
export type HeroVehicleSlot = typeof heroVehicleSlots[number];
export interface HeroVehicleImage {
 src: string;
 srcSet: string;
 width: number;
 height: number;
 /** Project provenance/license record, including evidence of reuse rights. */
 provenance: string;
}
export type HeroVehicleAssets = Record<HeroVehicleSlot, HeroVehicleImage | null>;

// Keep the approved campaign until a complete, visually reviewed set is available.
// Never substitute the existing two-door GT for a sedan or supercar.
export const heroVehicleAssets: HeroVehicleAssets = {
 'hero-suv': null,
 'hero-sedan': null,
 'hero-supercar': null,
};

