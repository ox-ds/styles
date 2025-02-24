import { getFluid } from './fluid'; // Import fluid scaling utility

export interface Spacing {
  [key: number]: string;
}

export const spacing: Spacing = {
  0: "0px",
  1: "2px",
  2: "4px",
  3: "8px",
  4: "12px",
  5: "20px",
  6: "24px",
  7: "32px",
  8: "40px",
  9: "48px",
  10: "64px",
  11: "80px",
  12: "96px"
};

export function setSpacing(newSpacing: Partial<Spacing> = {}): void {
  Object.assign(spacing, newSpacing);
}

export function getFluidSpacing(spacingKey: number, minPx?: number, maxPx?: number): string {
  const basePx = parseInt(spacing[spacingKey].replace('px', '')) || 0; // Default to 0px if invalid
  return getFluid(basePx, minPx, maxPx);
}