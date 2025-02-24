import { getFluid } from './fluid'; // Import fluid scaling utility

export interface Size {
  [key: number]: string;
}

export const size: Size = {
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
  12: "96px",
  9999: "9999px",
};

export function setSize(newSize: Partial<Size> = {}): void {
  Object.assign(size, newSize);
}

export function getFluidSize(sizeKey: number, minPx?: number, maxPx?: number): string {
  const basePx = parseInt(size[sizeKey].replace('px', '')) || 2;  // Default to 2px if invalid
  return getFluid(basePx, minPx, maxPx);
}