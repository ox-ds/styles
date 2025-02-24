import { getFluid } from './fluid'; // Grabs our fluid scaling helper
import { spacing } from './spacing'; // Pulls in our spacing values

// Defines what makes up a grid unit
export interface GridUnit {
  col: number; // Number of columns
  gap: number; // Space between columns
  m: number;   // Margin around the grid
  breakpoint: number; // Screen width in pixels for this layout
}

// Valid grid sizes for type safety
export type GridKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Our grid setups for different screen sizes
export interface Grid {
  [key: string]: GridUnit; // Relaxed to string, typed by GridKey in usage
}

// Grid layouts—columns, gaps, and margins tied to spacing
export const grid: Record<GridKey, GridUnit> = {
  xs: { col: 2, gap: spacing[2], m: spacing[4], breakpoint: 360 },  // Tiny screens, super compact
  sm: { col: 4, gap: spacing[4], m: spacing[6], breakpoint: 480 },  // Mobile, cozy setup
  md: { col: 8, gap: spacing[6], m: spacing[7], breakpoint: 768 },  // Tablet, room to breathe
  lg: { col: 12, gap: spacing[7], m: spacing[8], breakpoint: 1024 }, // Desktop, wide open
  xl: { col: 16, gap: spacing[9], m: spacing[8], breakpoint: 1440 }  // Big screens, max spread
};

// Updates the grid at runtime if we need a custom layout
export function setGrid(newGrid: Partial<Record<GridKey, GridUnit>> = {}): void {
  Object.assign(grid, newGrid);
}

// Helper for fluid grid values—scales from half to double, capped at 48px
function getFluidGridValue(basePx: number, type: 'gap' | 'margin', minPx?: number, maxPx?: number): string {
  const min = minPx ?? basePx * 0.5;
  const max = maxPx ?? Math.min(basePx * 2, 48);
  return getFluid(basePx, { type, minPx: min, maxPx: max });
}

// Gets a fluid gap—scales from half to double base, capped at 48px
export function getFluidGap(gapPx: number, minPx?: number, maxPx?: number): string {
  return getFluidGridValue(gapPx || 8, 'gap', minPx, maxPx);
}

// Gets a fluid margin—scales from half to double base, capped at 48px
export function getFluidMargin(marginPx: number, minPx?: number, maxPx?: number): string {
  return getFluidGridValue(marginPx || 8, 'margin', minPx, maxPx);
}