import { spacing } from './spacing';
import { getFluid } from './fluid'; // Import fluid scaling utility

export interface GridUnit {
  col: string; // columns
  gap: string; // column-gap
  m: string; // margin
  breakpoint: string; // device breakpoint
}

export interface Grid {
  [key: string]: GridUnit;
}

export const grid: Grid = {
  xs: { col: "2", gap: spacing[2], m: spacing[4], breakpoint: "360px" }, // Small mobile, compact
  sm: { col: "4", gap: spacing[4], m: spacing[6], breakpoint: "480px" }, // Mobile, standard
  md: { col: "8", gap: spacing[6], m: spacing[7], breakpoint: "768px" }, // Tablet, relaxed
  lg: { col: "12", gap: spacing[7], m: spacing[8], breakpoint: "1024px" }, // Desktop, wide
  xl: { col: "16", gap: spacing[9], m: spacing[8], breakpoint: "1440px" }  // Large desktop, max
};

export function setGrid(newGrid: Partial<Grid> = {}): void {
  Object.assign(grid, newGrid);
}

export function getFluidGap(gapPx: string, minPx?: number, maxPx?: number): string {
  const basePx = parseInt(gapPx.replace('px', '')) || 8;  // Default to 8px if invalid
  return getFluid(basePx, minPx, maxPx, 0.125);  // Use 0.125vw for gaps (mobile 360px to desktop 1440px)
}

export function getFluidMargin(marginPx: string, minPx?: number, maxPx?: number): string {
  const basePx = parseInt(marginPx.replace('px', '')) || 8;  // Default to 8px if invalid
  return getFluid(basePx, minPx, maxPx, 0.125);  // Use 0.125vw for margins (mobile 360px to desktop 1440px)
}