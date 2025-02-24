import { getFluid } from './fluid'; // Grabs our fluid scaling helper
import { size, SizeKey } from './size';

// Defines valid radius keys for type safety
export type RadiusKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface Radius {
  [key: string]: number;
}

// Radius settings for smooth corners—tied to our size system
export const radius: Record<RadiusKey, number> = {
  xs: size[1],   // Tiny 2px corners
  sm: size[2],   // Small 4px curves
  md: size[3],   // Medium 8px rounds
  lg: size[4],   // Large 12px bends
  xl: size[7],   // Extra-large 32px arcs
  full: 999      // Full circle at 999px
};

// Updates the radius map at runtime if we need custom tweaks
export function setRadius(newRadius: Partial<Record<RadiusKey, number>> = {}): void {
  Object.assign(radius, newRadius);
}

// Gets a fluid radius—scales from half to double base, capped at 32px (static for full)
export function getFluidRadius(radiusKey: RadiusKey, minPx?: number, maxPx?: number): string {
  const basePx = radius[radiusKey] || 2;
  if (radiusKey === 'full') return `${basePx}px`; // Static for full
  const min = minPx ?? basePx * 0.5;
  const max = maxPx ?? Math.min(basePx * 2, 32);
  return getFluid(basePx, { type: 'radius', minPx: min, maxPx: max, scaleFactor: 0.0625 });
}