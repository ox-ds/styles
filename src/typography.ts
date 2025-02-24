import { getFluid } from './fluid';

export type FontSizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type LineHeightKey = 'tight' | 'normal' | 'loose';
export type FontFamilyKey = 'sans' | 'serif' | 'mono';

export interface Typography {
  fontSizes: { [key in FontSizeKey]: number };
  lineHeights: { [key in LineHeightKey]: number };
  fontFamilies: { [key in FontFamilyKey]: string };
  base: number;
}

export const typography: Typography = {
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24, xxl: 32 },
  lineHeights: { tight: 19.2, normal: 24, loose: 28.8 },
  fontFamilies: {
    sans: "'Arial', 'Helvetica', sans-serif",
    serif: "'Times New Roman', serif",
    mono: "'Courier New', monospace"
  },
  base: 16
};

export function setTypography(newTypography: Partial<Typography> = {}): void {
  Object.assign(typography, newTypography);
}

export function getFluidFontSize(
  sizeKey: FontSizeKey,
  lineHeightKey: LineHeightKey,
  options?: { min?: number; max?: number }
): string {
  const basePx = typography.fontSizes[sizeKey] || 12;
  const baseLineHeightPx = typography.lineHeights[lineHeightKey] || 19.2;
  const minPx = options?.min ?? basePx * 0.5;
  const maxPx = options?.max ?? Math.min(basePx * 2, baseLineHeightPx / 1.2);
  const fluidClampPx = getFluid(basePx, { 
    type: 'fontSize', 
    minPx, 
    maxPx, 
    scaleFactor: 0.125
  });
  return fluidClampPx
    .replace(/(\d*\.?\d+)px/g, (match, p1) => `${(parseFloat(p1) / typography.base).toFixed(3)}rem`);
}

export function getFluidLineHeight(heightKey: LineHeightKey, options?: { min?: number; max?: number }): string {
  const basePx = typography.lineHeights[heightKey] || 19.2;
  const minPx = options?.min ?? basePx * 0.8;
  const maxPx = options?.max ?? Math.min(basePx * 1.2, 64);
  const fluidClampPx = getFluid(basePx, { 
    type: 'lineHeight', 
    minPx, 
    maxPx, 
    scaleFactor: 0.125
  });
  return fluidClampPx
    .replace(/(\d*\.?\d+)px/g, (match, p1) => `${(parseFloat(p1) / typography.base).toFixed(1)}rem`);
}