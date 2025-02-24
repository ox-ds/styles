import { getFluid } from './fluid'; // Import fluid scaling utility

export interface Shadows {
  [key: string]: string;
}

export const shadows: Shadows = {
  xs: "0 0 0 rgba(0,0,0,0.1)",
  sm: "0 0 0 rgba(0,0,0,0.1)",
  md: "0 0 0 rgba(0,0,0,0.1)",
  lg: "0 0 0 rgba(0,0,0,0.1)",
  xl: "0 0 0 rgba(0,0,0,0.1)",
  overlay: "0 0 0 rgba(0,0,0,0.1)",
  inset: "0 0 0 rgba(0,0,0,0.1)",
  focus: "0 0 0 rgba(0,0,0,0.1)"
};

export function setShadows(newShadows: Partial<Shadows> = {}): void {
  Object.assign(shadows, newShadows);
}

export function getFluidShadow(shadow: string, options?: { min?: number; max?: number }): string {
  const parts = shadow.split(' ').map(part => part.trim());
  if (parts.length < 4) throw new Error(`Invalid shadow format: ${shadow}`);

  const [hOffset, vOffset, blur, color] = parts;
  const hBasePx = parseInt(hOffset.replace('px', '')) || 0;
  const vBasePx = parseInt(vOffset.replace('px', '')) || 0;

  const fluidVOffset = getFluid(vBasePx, options?.min, options?.max, 0.125); // ScaleFactor 0.125 for 360px–1440px
  return `${hOffset} ${fluidVOffset} ${blur} ${color}`;
}