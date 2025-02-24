import { getFluid } from './fluid'; // Import fluid scaling utility

export interface Typography {

  fontSizes: {
    [key: string]: string;
  };

  lineHeights: {
    [key: string]: string;
  };

  fontFamilies: {
    [key: string]: string;
  };

  base: string;
}

export const typography: Typography = {
    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "24px",
      xxl: "32px",
    },
    lineHeights: {
      tight: "19.2px",
      normal: "24px",
      loose: "28.8px",
    },
    fontFamilies: {
      sans: "'Arial', 'Helvetica', sans-serif",
      serif: "'Times New Roman', serif",
      mono: "'Courier New', monospace",
    },
    base: "16px",
  };

export function setTypography(newTypography: Partial<Typography> = {}): void {
  Object.assign(typography, newTypography);
}

export function getFluidFontSize(sizeKey: string, options?: { min?: number; max?: number }): string {
    const basePx = parseInt(typography.fontSizes[sizeKey].replace('px', '')) || 12; // Default to 12px if invalid
    const fluidPx = getFluid(basePx, options?.min, options?.max, 0.125); // ScaleFactor 0.125 for 360px–1440px
    const fluidRem = parseFloat(fluidPx.replace('px', '')) / parseInt(typography.base.replace('px', '')); // Convert back to REM
    return `${fluidRem.toFixed(3)}rem`; // Round to 3 decimals for precision
  }

  export function getFluidLineHeight(heightKey: string, options?: { min?: number; max?: number }): string {
    const basePx = parseFloat(typography.lineHeights[heightKey].replace('px', '')) || 19.2; // Default to 19.2px (1.2 * 16px) if invalid
    const fluidPx = getFluid(basePx, options?.min, options?.max, 0.015); // ScaleFactor 0.015 for line heights (finer scaling)
    const fluidRem = parseFloat(fluidPx.replace('px', '')) / parseInt(typography.base.replace('px', '')); // Convert back to REM
    return `${fluidRem.toFixed(1)}rem`; // Round to 1 decimal for readability
  }