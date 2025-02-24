import { getFluid } from './fluid'; // Grabs our fluid scaling helper

// Defines valid spacing keys for type safety
export type SpacingKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// Our spacing steps in pixels (just numbers, no "px" yet)
export interface Spacing {
  [key: number]: number; // Relaxed to number, typed by SpacingKey in usage
}

// Core spacing values—our go-to gaps and paddings
export const spacing: Record<SpacingKey, number> = {
  0: 0,   // No space at all
  1: 2,   // Teeny tiny gap
  2: 4,   // Small step up
  3: 8,   // Nice and snug
  4: 12,  // Comfy spacing
  5: 20,  // Room to breathe
  6: 24,  // Chill distance
  7: 32,  // Solid separation
  8: 40,  // Big vibes
  9: 48,  // Extra roomy
  10: 64, // Wide open
  11: 80, // Super spacious
  12: 96  // Max chill
};

// Updates spacing at runtime if we need a custom tweak
export function setSpacing(newSpacing: Partial<Record<SpacingKey, number>> = {}): void {
  Object.assign(spacing, newSpacing);
}

// Gets a fluid spacing value—scales from half to double base, capped at 96px
export function getFluidSpacing(spacingKey: SpacingKey, minPx?: number, maxPx?: number): string {
  const basePx = spacing[spacingKey] || 0; // Fallback to 0 if something’s off
  const min = minPx ?? basePx * 0.5; // Half base for small screens
  const max = maxPx ?? Math.min(basePx * 2, 96); // Double base, capped at 96px
  return getFluid(basePx, { type: 'spacing', minPx: min, maxPx: max }); // 0.125 scale by default
}