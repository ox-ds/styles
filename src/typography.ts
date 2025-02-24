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
      xs: "12px",  // 12px / 16px = 0.75rem, extra-small text for captions, mobile density
      sm: "14px", // 14px / 16px = 0.875rem, small text for labels, accessibility
      md: "16px",     // 16px / 16px = 1rem, medium text for body, default readable size
      lg: "18px", // 18px / 16px = 1.125rem, large text for headings, tablets
      xl: "24px",   // 24px / 16px = 1.5rem, extra-large text for titles, desktops
      xxl: "32px",    // 32px / 16px = 2rem, double-extra-large text for hero text, 4K/Ultrawide
    },
    lineHeights: {
      tight: "19.2px", // Compact line height for dense text, mobile
      normal: "24px", // Standard line height for body, accessibility
      loose: "28.8px", // Spacious line height for headings, desktops
    },
    fontFamilies: {
      sans: "'Arial', 'Helvetica', sans-serif", // Sans-serif for modern, readable text
      serif: "'Times New Roman', serif",        // Serif for traditional, formal text
      mono: "'Courier New', monospace",         // Monospace for code, technical content
    },
    base: "16px", // Default base font size for REM calculations, 2025 standard
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