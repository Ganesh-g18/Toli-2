import { brandPalette, brandRed3D } from './brand-palette';
/** Renderer palette: neutral gunmetal with cool white key light and a red accent.
 * Kept here rather than scattered through scene construction and animation. */
export const vehicleTheme = {
 body:0x62656c, technicalBody:0x45484f, trim:0x27292f, glass:0x1b1d22,
 rubber:0x111216, alloy:0x666a73, disc:0x65686e, caliper:brandRed3D, battery:0x3c3e45,
 headlight:0xeff2f7, headlightEmission:0xdfe7f2, componentEmission:brandRed3D,
 bodyEmission:0x7b7e86, caliperEmission:brandRed3D, scan:brandRed3D,
 sky:0xf0f1f5, ground:0x26272c, rim:0xdde0e7, key:0xf8f6f2, accent:brandRed3D,
 gridMajor:0x35363c, gridMinor:0x24252a,
 transparentClear:0x000000, contact:0x08090b,
} as const;

/** Exposure tuning is theme-specific; the same geometry and material architecture remain. */
export const vehicleLighting = {
 dark:{key:1.24,fill:1.26,environment:.72,exposure:1.10,ground:Number.parseInt(brandPalette['faded-dark'].slice(1),16),reflection:Number.parseInt(brandPalette['faded-raised'].slice(1),16)},
 light:{key:1.12,fill:1.15,environment:.72,exposure:.94,ground:0x9a9185,reflection:vehicleTheme.alloy},
} as const;
