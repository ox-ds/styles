import { size } from './size';
import { getFluid } from './fluid'; // Import fluid scaling utility

export interface Radius {
  [key: string]: string;
}

export const radius: Radius = {
  xs: size[1],  // "2px"
  sm: size[2],  // "4px"
  md: size[3],  // "8px"
  lg: size[4],  // "12px"
  xl: size[7],  // "32px"
  full: size[9999]  // "9999px"
};

export function setRadius(newRadius: Partial<Radius> = {}): void {
  Object.assign(radius, newRadius);
}

export function getFluidRadius(radiusKey: string, minPx?: number, maxPx?: number): string {
    const basePx = parseInt(radius[radiusKey].replace('px', '')) || 2;  // Default to 2px if invalid
    return getFluid(basePx, minPx, maxPx, 0.0625);  // Use 0.0625vw for radius (mobile 360px to desktop 1440px)
  }