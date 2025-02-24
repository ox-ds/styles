// Our one-stop shop for fluid scaling across the design system
export function getFluid(basePx: number, options: { minPx?: number; maxPx?: number; scaleFactor?: number; type?: string } = {}): string {
  const { minPx, maxPx, scaleFactor = 0.125, type } = options;
  
  // Set default min to base or 0 if not provided
  const min = minPx ?? Math.max(basePx, 0);
  
  // Default max is 4x base, capped by type if maxPx isn’t custom
  let max = maxPx ?? basePx * 4;
  if (type && maxPx === undefined) {
    if (type === 'size' || type === 'spacing') max = Math.min(max, 96);      // Big stuff caps at 96px
    else if (type === 'gap' || type === 'margin') max = Math.min(max, 48);  // Gaps/margins cap at 48px
    else if (type === 'radius') max = Math.min(max, 32);                    // Radius caps at 32px unless overridden
  }
  
  // Returns a clamp for smooth scaling—think mobile (360px) to desktop (1440px)
  return `clamp(${min}px, ${basePx * scaleFactor}vw, ${max}px)`;
}
