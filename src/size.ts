import { getFluid } from './fluid';

// Defines valid size keys for type safety
export type SizeKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Size {
  [key: number]: number;
}

// The core size map—everything in our design system starts here
export const size: Record<SizeKey, number> = {
  1: 2,
  2: 4,
  3: 8,
  4: 12,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  11: 80,
  12: 96,
};

// Updates the size map at runtime if we need to tweak things
export function setSize(newSize: Partial<Record<SizeKey, number>> = {}): void {
  Object.assign(size, newSize);
}

// Gets a fluid size—scales smoothly from half to double base, capped at 96px
export function getFluidSize(sizeKey: SizeKey, minPx?: number, maxPx?: number): string {
  const basePx = size[sizeKey] || 2;
  const min = minPx ?? basePx * 0.5;
  const max = maxPx ?? Math.min(basePx * 2, 96);
  return getFluid(basePx, { type: 'size', minPx: min, maxPx: max });
}